import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
//
import PrintIcon from "../../../../../../images/icons/print-icon.png"
// components
import PageTitle from "../../../../../../components/PageTitle";
import { ShadowBox, FormBtn } from "../../../../../../components/UiElements/UiElements";
import { CheckboxField, InputPaymentField } from "../../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import ClaimPatientProfile from "../../../claim/components/addNewClaim/components/claimPatientProfile/ClaimPatientProfile";
import { withSnackbar } from "../../../../../../components/Message/Alert";
//static List
import { AccountStatusOptions } from '../../../../../../context/StaticDropDowns';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
// styles
import useStyles from "./styles";
import "../../styles.css";
import AddPatientPaymentDialog from "./components/addPatientPaymentDialog/AddPatientPaymentDialog";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { formatDate } from '../../../../../../components/Common/Extensions';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function PatientPayment({ ...props }) {

    const { showMessage } = props;
    const classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    let history = useHistory()
    let propsData = [];
    let loadRecord = true;
    const [state, setState] = useState({
        patientId: props.patientId,
        paymentFrom: "",
        paymentType: "",
        paymentDate: "", isPatientOnly: true,
        amount: 0.00, applied: 0.00, unapplied: 0.00, startCredit: 0.00, endCredit: 0.00,
        lstPaymentDetail: []
    });

    if (props.location.pathname != null && props.location.pathname != "" && props.location.pathname.split('=').length > 1) {
        propsData = props.location.pathname.split('=')[1].split('/');
    }
    else
        loadRecord = false;
    let eobId = !loadRecord ? 0 : propsData[0];
    let patId = !loadRecord ? 0 : propsData[1];

    const [saveLoading, setSaveLoading] = useState(false);
    const [showHideAddPatientPaymentDialog, setShowHideAddPatientPaymentDialog] = useState(false);
    const [uniqueClaimsList, setUniqueClaimsList] = useState([]);
    const [eob, setEob] = useState(null);
    const [paymentStatusList, setPaymentStatusList] = useState([]);
    const [mainPatientId, setMainPatientId] = useState(0);
    const [aryCreditApply, setAryCreditApply] = useState([]);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //
    let [TotalAmount, setTotalAmount] = useState(0.0),
        [totalStartBalance, setTotalStartBalance] = useState(0.0),
        [totalPaidAmount, setTotalPaidAmount] = useState(0.0),
        [totalApplyCredit, setTotalApplyCredit] = useState(0.0),
        [totalAdjusted, setTotalAdjusted] = useState(0.0),
        [totalEndBalance, setTotalEndBalance] = useState(0.0)
        ;
    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "isPatientOnly") {
            setState(prevState => ({
                ...prevState,
                [name]: value == "false" ? true : false
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    //To Show Action Dialog
    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }
    const getPaymentStatusDataList = e => {
        var params = {
            code: "get_bill_type",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPaymentStatusList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(eobId),
            area: "Patient Payment",
            activity: "Load patient payment details",
            details: "User viewed payment details contacts screen"
        };

        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        saveAuditLogInfo();
        getPaymentStatusDataList();
        if (eobId && eobId > 0) { loadData(patId ? patId : state.patientId); }
        else
            setShowHideAddPatientPaymentDialog(true);

    }, []);

    const loadData = (patId) => {
        PostDataAPI("eob/get", eobId).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                result.data.patientId = patId;
                if (result.data.paymentDate)
                    result.data.paymentDate = result.data.paymentDate.split('T')[0];
                setEob(result.data);
                onLoad(result.data);
            }
        })
    }
    const onLoad = (data) => {

        // set for patient profile
        setState(prevState => ({
            ...prevState,
            patientid: data.patientId
        }));
        setState(data);

        getpaymentsDetailsByPatient(data.eobId, data.payerTraceNo);

    }
    const getpaymentsDetailsByPatient = (val, payerTraceNo) => {

        PostDataAPI("eob/getPatientPaymentDetail", val).then((result) => {
            if (result.success && result.data != null) {
                //if (result.data.paymentDate)
                //    result.data.paymentDate = formatDate(result.data.paymentDate.split('T')[0]);
                result.data.payerTraceNo = payerTraceNo;
                setEob(result.data);

                setState(prevState => ({
                    ...prevState,
                    lstPaymentDetail: result.data.lstPaymentDetail,
                    paymentMethodName: result.data.paymentMethodName
                }));

                setMainPatientId(result.data.patientId);

                getStartCredit(result.data.patientId, result.data.eobId, result.data.lstPaymentDetail);
                populatePaymentDetail(result.data);


            }
        })
    }

    const getStartCredit = (patId, eobId, paymentDetails) => {
        var params = {
            code: "get_patient_batch_unposted_amount",
            parameters: [patId.toString(), eobId.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                let amountCount = 0.00;
                result.data.map((item, i) => {
                    amountCount = amountCount + item.amount
                });
                setState(prevState => ({
                    ...prevState,
                    startCredit: amountCount,
                    isPatientOnly: true
                }));

                let endCount = 0.00;
                const paymentList = [...paymentDetails];
                paymentList.map((item, j) => {
                    endCount = endCount + parseFloat(paymentList[j]['applyCredit']);
                })

                setState(prevState => ({
                    ...prevState,
                    //endCredit: amountCount - endCount
                    endCredit: amountCount
                }));
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    startCredit: 0.00,
                    endCredit: 0.00,
                    isPatientOnly: true
                }));

            }
        });

    }

    const calculateEndBalance = (_paymentList) => {

        let endCount = 0.00;
        const paymentList = [..._paymentList];

        paymentList.map((item, j) => {

            endCount = endCount + parseFloat(paymentList[j]['applyCredit']);
        })

        setState(prevState => ({
            ...prevState,
            endCredit: state.startCredit - endCount
        }));
    }
    const handleChangeDynamic = (e, type, maxLength) => {

        const { id, name, value } = e.target;
        let inputId = id.toString();
        let inputValue = value;
        const paymentList = [...state.lstPaymentDetail];
        if (type == 'float') {
            // inputValue = !inputValue ? '' : inputValue.toString();
            //const re = /^[0-9\b]+$/;
            // const re = /^(?:\d*\.\d{1,2}|\d+)$/;

            if (parseFloat(isNaN(inputValue) ? 0 : inputValue) > parseFloat(isNaN(paymentList[inputId]['startBalance']) ? 0 : paymentList[inputId]['startBalance'])) {
                showMessage("Error", "Apply amount cannot be greater than end balance.", "error", 3000);
                paymentList[inputId][name] = parseFloat(isNaN(paymentList[inputId][name]) ? 0 : paymentList[inputId][name].toFixed(2));

            }
            else {
                // if ((inputValue === '' || re.test(inputValue))) {
                inputValue = inputValue === '' ? '0' : inputValue;
                const oldValue = paymentList[inputId][name];
                if (inputValue.length <= maxLength) {
                    paymentList[inputId][name] = parseFloat(inputValue);

                    paymentList[inputId]['endBalance'] = parseFloat(isNaN(paymentList[inputId]['startBalance']) ? 0 : paymentList[inputId]['startBalance']) - parseFloat(isNaN(paymentList[inputId]['paidAmount']) ? 0 : paymentList[inputId]['paidAmount'])
                        - parseFloat(isNaN(paymentList[inputId]['applyCredit']) ? 0 : paymentList[inputId]['applyCredit'])
                        - parseFloat(isNaN(paymentList[inputId]['adjustedAmount']) ? 0 : paymentList[inputId]['adjustedAmount']);


                    if (name === 'applyCredit') {
                        let count = 0.00;
                        const paymentList = [...state.lstPaymentDetail];

                        state.lstPaymentDetail.map((item, j) => {
                            count = count + parseFloat(paymentList[j]['applyCredit']);
                        })

                        if (count > state.startCredit) {
                            showMessage("Error", "Apply credit cannot be greater than start credit.", "error", 3000);
                            paymentList[inputId][name] = oldValue;
                            return;
                            paymentList[inputId]['endBalance'] = parseFloat(isNaN(paymentList[inputId]['startBalance']) ? 0 : paymentList[inputId]['startBalance']) - parseFloat(isNaN(paymentList[inputId]['paidAmount']) ? 0 : paymentList[inputId]['paidAmount'])
                                - parseFloat(isNaN(paymentList[inputId]['applyCredit']) ? 0 : paymentList[inputId]['applyCredit'])
                                - parseFloat(isNaN(paymentList[inputId]['adjustedAmount']) ? 0 : paymentList[inputId]['adjustedAmount']);
                        }
                        else {
                            setState(prevState => ({
                                ...prevState,
                                endCredit: state.startCredit - count
                            }));

                        }
                    }

                    if ((parseFloat(isNaN(paymentList[inputId]['paidAmount']) ? 0 : paymentList[inputId]['paidAmount']) +
                        parseFloat(isNaN(paymentList[inputId]['applyCredit']) ? 0 : paymentList[inputId]['applyCredit']) +
                        parseFloat(isNaN(paymentList[inputId]['adjustedAmount']) ? 0 : paymentList[inputId]['adjustedAmount'])) > parseFloat(isNaN(paymentList[inputId]['startBalance']) ? 0 : paymentList[inputId]['startBalance'])) {

                        showMessage("Error", "Apply amount cannot be greater than end balance.", "error", 3000);
                        paymentList[inputId][name] = 0.00;

                        paymentList[inputId]['endBalance'] = parseFloat(isNaN(paymentList[inputId]['startBalance']) ? 0 : paymentList[inputId]['startBalance']) - parseFloat(isNaN(paymentList[inputId]['paidAmount']) ? 0 : paymentList[inputId]['paidAmount'])
                            - parseFloat(isNaN(paymentList[inputId]['applyCredit']) ? 0 : paymentList[inputId]['applyCredit'])
                            - parseFloat(isNaN(paymentList[inputId]['adjustedAmount']) ? 0 : paymentList[inputId]['adjustedAmount']);

                    }

                }

            }
        }
        else {
            paymentList[inputId][name] = value
        }

        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));
        calculateTotal(paymentList);
    }
    const CustomSelect = ({ id, name, value, options, ...props }) => {
        return (
            <select
                id={id}
                name={name}
                value={value}
                className={classes.tableSelect}
                onChange={e => { handleChangeDynamic(e, '') }}
            >
                <option value="">Select Status</option>
                {
                    options.map((item, i) => {
                        return (
                            <option value={item.value} key={i}>{item.label}</option>
                        )
                    }
                    )
                }
            </select>
        )
    }
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    function search(code, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i] === code) {
                return myArray[i];
            }
        }
    }
    const Save = () => {

        if (checkAppliedCredit()) {
            if (eobId === 0) {
                if (uniqueClaimsList.length === 0) {
                    showMessage("Error", "At least 1 claim needs to be existed for this patient.", "error", 3000);
                    return;
                }
            }
            else {
                if (state.lstPaymentClaims) {
                    state.lstPaymentClaims.map((item, i) => {
                        // made Unique Claims & save comma seprated for Save call in existing loop
                        var existsObj = search(item.claimSuperbillId, uniqueClaimsList);
                        if (!existsObj)
                            uniqueClaimsList.push(item.claimSuperbillId);
                    })
                }
            }

            state.claimIds = uniqueClaimsList.join(',');
            state.patientId = state.patientId ? parseInt(state.patientId) : 0;
            state.paymentDate = new Date(state.paymentDate);
            setSaveLoading(true);
            PostDataAPI('eob/savePatientPaymentDetail', state, true).then((result) => {
                if (result.success == true) {
                    if (result.success && result.data != null) {
                        if (result.data.paymentDate)
                            result.data.paymentDate = result.data.paymentDate.split('T')[0];
                        result.data.isPatientOnly = true;
                        setState(result.data);
                        setEob(result.data);

                        //if (aryCreditApply && aryCreditApply.length > 0)
                        //    checkAndSaveCreditApply();

                        let data = `${result.data.eobId}/${result.data.patientId}`;
                        history.push(`/app/patientpayment/id=${data}`);
                        showMessage("Success", "Record saved successfully.", "success", 2000);
                        getStartCredit(result.data.patientId, result.data.eobId, result.data.lstPaymentDetail);
                        calculateEndBalance(result.data.lstPaymentDetail);
                        setSaveLoading(false);
                    }
                }
                else {
                    setSaveLoading(false);
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };

    const checkAndSaveCreditApply = () => {

        let uniqueBatches = [];
        var lstBatchCreditApply = [];
        let countAmount = 0.00;

        aryCreditApply.map((im, j) => {

            if (uniqueBatches.filter(tmprm => tmprm.batchId == im.batchId).length === 0)
                uniqueBatches.push({ "batchId": im.batchId });
        })

        uniqueBatches.map((item, i) => {
            countAmount = 0.00;
            aryCreditApply.filter(tmprm => tmprm.batchId == item.batchId).map((itm, j) => {
                countAmount = countAmount + itm.applyCredit;
            })
            lstBatchCreditApply.push({ "applyCredit": countAmount, "batchId": item.batchId })
        })

        PostDataAPI('eob/updateBatchCreditApply', lstBatchCreditApply, true).then((result) => {
            if (result.success == true) {
                if (result.success && result.data != null) {

                    showMessage("Success", "Credit apply successfully.", "success", 2000);
                }
            }
            else {
                // showMessage("Error", result.message, "error", 3000);
            }
        })


    }

    const checkAppliedCredit = () => {
        let decision = false;
        const paymentList = [...state.lstPaymentDetail];
        let countAmount = 0.00;
        state.lstPaymentDetail.map((item, j) => {
            countAmount = countAmount + (isNaN(paymentList[j]['applyCredit']) ? 0 : parseFloat(paymentList[j]['applyCredit']));
        })

        if (isNaN(state.startCredit) ? 0 : parseFloat(state.startCredit) < countAmount) {
            showMessage("Error", "Applied credit cannot be greater than start credit.", "error", 3000);
            decision = false;
        }
        else
            decision = true;

        return decision;

    }

    const populatePaymentDetail = (data) => {

        const lstActivePaymentDetail = data.lstPaymentDetail.filter(t => { return t.isDeleted == false });
        calculateTotal(lstActivePaymentDetail);

    }
    const calculateTotal = (details) => {

        let tAmount = 0.0,
            tStartBalance = 0.0,
            tPaidAmount = 0.0,
            tAdjustedAmount = 0.0,
            tEndBalance = 0.0,
            tApplyCredit = 0.0
            ;
        details.forEach((t) => {
            tAmount += parseFloat(t.amount ? t.amount : 0);
            tStartBalance += parseFloat(t.startBalance ? t.startBalance : 0);
            tPaidAmount += parseFloat(t.paidAmount ? t.paidAmount : 0);
            tAdjustedAmount += parseFloat(t.adjustedAmount ? t.adjustedAmount : 0);
            tApplyCredit += parseFloat(t.applyCredit ? t.applyCredit : 0);
            tEndBalance += parseFloat(t.endBalance ? t.endBalance : 0);
        });
        setTotalAmount(tAmount);
        setTotalStartBalance(tStartBalance);
        setTotalPaidAmount(tPaidAmount);
        setTotalApplyCredit(tApplyCredit);
        setTotalAdjusted(tAdjustedAmount);
        setTotalEndBalance(tEndBalance);
    }
    const applyRemainingAmount = () => {

        let totalAmount = parseFloat(state.totalPaid);
        let lstPayment = [];
        if (totalAmount > 0)
            cptsBalanceAdjustment(totalAmount);
    }
    const cptsBalanceAdjustment = (totalAmount) => {

        if (state.lstPaymentDetail) {
            let i = state.lstPaymentDetail.length - 1;
            for (let j = i; j >= 0; j--) {

                let adAmt = isNaN(state.lstPaymentDetail[j].adjustedAmount) ? 0 : parseFloat(state.lstPaymentDetail[j].adjustedAmount);
                let crAmt = isNaN(state.lstPaymentDetail[j].applyCredit) ? 0 : parseFloat(state.lstPaymentDetail[j].applyCredit);

                if (totalAmount > 0) {
                    let endBalance = state.lstPaymentDetail[j].startBalance - adAmt - crAmt;

                    state.lstPaymentDetail[j].paidAmount = endBalance >= totalAmount ? totalAmount : endBalance;

                    totalAmount = totalAmount - state.lstPaymentDetail[j].paidAmount;
                }
                else {
                    state.lstPaymentDetail[j].paidAmount = 0.00;
                }

                state.lstPaymentDetail[j].endBalance = parseFloat(parseFloat(state.lstPaymentDetail[j].startBalance)) - state.lstPaymentDetail[j].paidAmount - adAmt - crAmt;

                if (j === 0) {
                    setState(prevState => ({
                        ...prevState,
                        lstPaymentDetail: state.lstPaymentDetail
                    }));
                    calculateTotal(state.lstPaymentDetail);
                }
            }

        }
    }
    const applyCreditAmount = () => {

        var params = {
            code: "get_patient_batch_unposted_amount",
            parameters: [mainPatientId ? mainPatientId.toString() : '', state.eobId ? state.eobId.toString() : '']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                if (state.lstPaymentDetail) {
                    let totalCrBalance = checkCreditAdjustment(result.data);
                    totalCrBalance = parseFloat(totalCrBalance);
                    let i = state.lstPaymentDetail.length - 1;
                    for (let j = i; j >= 0; j--) {

                        let adjustmentAmount = parseFloat(state.lstPaymentDetail[j].startBalance) - parseFloat(state.lstPaymentDetail[j].paidAmount) - parseFloat(state.lstPaymentDetail[j].adjustedAmount) - parseFloat(state.lstPaymentDetail[j].applyCredit);
                        let startBalance = parseFloat(isNaN(state.lstPaymentDetail[j]['startBalance']) ? 0 : state.lstPaymentDetail[j]['startBalance']);

                        if (startBalance > 0) {

                            if (totalCrBalance > adjustmentAmount) {
                                let leftBalance = totalCrBalance - adjustmentAmount;
                                state.lstPaymentDetail[j].applyCredit = state.lstPaymentDetail[j].applyCredit + adjustmentAmount;
                                totalCrBalance = leftBalance;
                                continue;
                            }
                            else if (adjustmentAmount > totalCrBalance) {
                                state.lstPaymentDetail[j].applyCredit = state.lstPaymentDetail[j].applyCredit + totalCrBalance;
                                totalCrBalance = 0;
                                break;
                            }
                        }
                    }

                    setState(prevState => ({
                        ...prevState,
                        lstPaymentDetail: state.lstPaymentDetail,
                        //endCredit: state.startCredit - totalCrBalance
                        endCredit: totalCrBalance
                    }));

                    calculateTotal(state.lstPaymentDetail);

                }
            }
        });
    }

    function checkCreditAdjustment(dataSet) {

        let creditBalance = 0;
        const paymentList = [...state.lstPaymentDetail];

        state.lstPaymentDetail.map((item, j) => {
            paymentList[j]['applyCredit'] = 0.00;
        })

        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));

        if (dataSet) {
            dataSet.map((itm, k) => {
                creditBalance = creditBalance + itm.amount;
            })
        }

        return creditBalance;
    }

    const handleDelete = () => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the payment?", "confirm", function () {
            let method = "eob/deletePatientPaymentBatch";

            PostDataAPI(method, {
                eobId: state.eobId
            }, true).then((result) => {
                if (result.success == true) {

                    showMessage("Success", "Payment deleted successfully.", "success", 3000);
                    setTimeout(function () {

                        history.push(`/app/payment`);

                    }, 200);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }

            })
        });
    }

    function rowHtml(item, i) {
        return (<tr key={i} style={{ display: "" }}>
            <td >{item.claimSuperbillId}</td>
            <td >{item.dosDate ? formatDate(item.dosDate.split('T')[0]) : null}</td>
            <td >{item.proc}</td>
            <td className={classes.amountTd}>{numberFormat(item.amount)}</td>
            <td className={classes.amountTd}>{numberFormat(item.startBalance)}</td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="paidAmount"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.paidAmount}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="paidAmount"
                    value={item.paidAmount}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.statusTd}>
                <CustomSelect
                    name="statusCode"
                    value={item.statusCode}
                    id={i}
                    options={paymentStatusList}
                />
            </td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="applyCredit"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.applyCredit}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="applyCredit"
                    value={item.applyCredit}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="adjustedAmount"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.adjustedAmount}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="adjustedAmount"
                    value={item.adjustedAmount}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.amountTd}>{numberFormat(item.endBalance)}</td>
            {/*<td >*/}
            {/*    < img className={classes.printTd} src={PrintIcon} alt="print" />*/}
            {/*</td>*/}
        </tr>)
    }
    function notVisiblerowHtml(item, i) {
        return (<tr key={i} style={{ display: "none" }}>
            <td >{item.claimSuperbillId}</td>
            <td >{item.dosDate ? formatDate(item.dosDate.split('T')[0]) : null}</td>
            <td >{item.proc}</td>
            <td className={classes.amountTd}>{numberFormat(item.amount)}</td>
            <td className={classes.amountTd}>{numberFormat(item.startBalance)}</td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="paidAmount"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.paidAmount}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="paidAmount"
                    value={item.paidAmount}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.statusTd}>
                <CustomSelect
                    name="statusCode"
                    value={item.statusCode}
                    id={i}
                    options={paymentStatusList}
                />
            </td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="applyCredit"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.applyCredit}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="applyCredit"
                    value={item.applyCredit}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.inputTableTd}>
                {/* <InputPaymentField
                    name="adjustedAmount"
                    id={i}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    value={item.adjustedAmount}
                    className={classes.tablePaymentInput}
                    onChange={e => { handleChangeDynamic(e, 'float', 8) }}
                /> */}
                <input
                    name="adjustedAmount"
                    value={item.adjustedAmount}
                    id={i}
                    onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                    type="number"
                    step="0.1"
                    className={classes.tableInputPayment}
                    MaxLength="12"
                />
            </td>
            <td className={classes.amountTd}>{numberFormat(item.endBalance)}</td>
            {/*<td >*/}
            {/*    < img className={classes.printTd} src={PrintIcon} alt="print" />*/}
            {/*</td>*/}
        </tr>)
    }



    return (
        <>
            <PageTitle title="Patient Payment" button={
                <Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={() => {
                        history.push('/app/payment/');
                    }}
                    startIcon={< ArrowBackIosIcon />}
                > Back to Payments </Button>} />
            <div style={{ margin: "0px 10px" }}>

                <ShadowBox shadowSize={3} className={classes.shadowBox}>
                    <ClaimPatientProfile patientId={patId ? patId : state.patientId} dataId={patId ? patId : state.patientId} encouID={0} />
                    <div className={classes.searchArea}>
                        <div className={classes.headerContainer}>
                            <div className={classes.insuranceNameContainer}>
                                <Typography className={classes.headerLabel}>Payment From:</Typography>
                                <Typography className={classes.labelValue}>{state.patientName}</Typography>
                                <span className={classes.headerBtnContainer}>
                                    <Button className={classes.gridButton} onClick={() => setShowHideAddPatientPaymentDialog(true)}>Edit</Button>
                                    {state.eobId > 0 ? <Button className={classes.gridButton} onClick={handleDelete} >Delete</Button> : null}
                                </span>
                            </div>
                            <div className={classes.headerSubContainer}>

                                <div className={classes.headerSubContainerChild}>
                                    <span>
                                        <Typography className={classes.headerLabel}>Payment Method:</Typography>
                                        <Typography className={classes.labelValue}>{state.paymentMethodName}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>Amount:</Typography>
                                        <Typography className={classes.labelValue}>{state.totalPaid ? numberFormat(state.totalPaid) : 0.00}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>Start Credit:</Typography>
                                        <Typography className={classes.labelValue}>{state.startCredit ? numberFormat(state.startCredit) : 0.00}</Typography>
                                    </span>

                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}>Payment Date:</Typography>
                                        <Typography className={classes.labelValue}>{state.paymentDate ? formatDate(state.paymentDate) : null}</Typography>
                                        {/*.split('T')[0]*/}
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Applied:</Typography>
                                        <Typography className={classes.labelValue}>{state.appliedAmount ? numberFormat(state.appliedAmount) : 0.00}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>End Credit:</Typography>
                                        <Typography className={classes.labelValue}>{state.endCredit ? numberFormat(state.endCredit) : 0.00}</Typography>
                                    </span>

                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}></Typography>
                                        <div className={classes.inputTd}>
                                            <CheckboxField
                                                color="primary"
                                                id="isPatientOnly"
                                                name="isPatientOnly"
                                                value={state.isPatientOnly == true ? true : false}
                                                checked={state.isPatientOnly == true ? true : false}
                                                onChange={handleChange}
                                                label="Show balance due patient only"
                                            />
                                        </div>
                                        <Typography className={classes.labelValue}>
                                        </Typography>
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Unapplied:</Typography>
                                        <Typography className={classes.labelValue}>{state.unAppliedAmount ? numberFormat(state.unAppliedAmount) : 0.00}</Typography>
                                    </span>

                                </div>

                            </div>
                        </div>


                    </div>
                    <div className={classes.gridArea}>
                        <div className={classes.gridButtonsArea}>
                            <Button className={classes.gridButton} onClick={applyRemainingAmount}>Apply Remaining</Button>
                            <Button className={classes.gridButton} onClick={applyCreditAmount}>Apply Credit</Button>
                        </div>
                        <Grid item container direction="row" lg={12} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <table className={classes.proceduresTable}>
                                    <thead>
                                        <tr>
                                            <th >Claim #</th>
                                            <th>DOS</th>
                                            <th >Proc</th>
                                            <th className={classes.amountTd}>Amount</th>
                                            <th className={classes.amountTd}>Start Balance</th>
                                            <th className={classes.amountTd}>Apply Payment</th>
                                            <th className={classes.statusTh}>Status</th>
                                            <th className={classes.amountTd}>Apply Credit</th>
                                            <th className={classes.amountTd}>Adjustments</th>
                                            <th className={classes.amountTd}>Balance</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.lstPaymentDetail ?
                                            state.lstPaymentDetail.map((item, i) => {

                                                // made Unique Claims & save comma seprated for Save call in existing loop
                                                var existsObj = search(item.claimSuperbillId, uniqueClaimsList);
                                                if (!existsObj)
                                                    uniqueClaimsList.push(item.claimSuperbillId);

                                                // made Unique Claims & save comma seprated for Save call in existing loop

                                                return <>
                                                    {state.isPatientOnly == true && item.startBalance > 0 ?
                                                        rowHtml(item, i) :
                                                        state.isPatientOnly == true && item.startBalance == 0 ?
                                                            notVisiblerowHtml(item, i) :
                                                            state.isPatientOnly == false ?
                                                                rowHtml(item, i) :
                                                                null
                                                    }
                                                </>
                                            })
                                            : null}
                                        {state.lstPaymentDetail && state.lstPaymentDetail.length > 0 ?
                                            <tr >
                                                <td className={classes.tdBold} colSpan="1" style={{ textAlign: "right" }}>
                                                    Totals:
                                                </td>
                                                <td colSpan="2"></td>
                                                <td className={classes.tdBold}>
                                                    {isNaN(TotalAmount) || TotalAmount == null ? numberFormat(0) : numberFormat(parseFloat(TotalAmount))}
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {isNaN(totalStartBalance) || totalStartBalance == null ? numberFormat(0) : numberFormat(parseFloat(totalStartBalance))}
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {isNaN(totalPaidAmount) || totalPaidAmount == null ? numberFormat(0) : numberFormat(parseFloat(totalPaidAmount))}
                                                </td>
                                                <td colSpan="1"></td>
                                                <td className={classes.tdBold}>
                                                    {isNaN(totalApplyCredit) || totalApplyCredit == null ? numberFormat(0) : numberFormat(parseFloat(totalApplyCredit))}
                                                </td>

                                                <td className={classes.tdBold}>
                                                    {isNaN(totalAdjusted) || totalAdjusted == null ? numberFormat(0) : numberFormat(parseFloat(totalAdjusted))}
                                                </td>

                                                <td className={classes.tdBold}>
                                                    {isNaN(totalEndBalance) || totalEndBalance == null ? numberFormat(0) : numberFormat(parseFloat(totalEndBalance))}
                                                </td>
                                                <td colSpan="1"></td>
                                            </tr>
                                            : null}
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" className={classes.stickySave} >
                            {
                                saveLoading ?
                                    <FormBtn id="loadingSave" >Save </FormBtn> :
                                    <FormBtn id="save" onClick={Save} >Save </FormBtn>
                            }
                        </Grid>
                    </div>

                </ShadowBox>
            </div >
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            {showHideAddPatientPaymentDialog ?
                <AddPatientPaymentDialog showHideDialog={showHideAddPatientPaymentDialog} handleClose={() => setShowHideAddPatientPaymentDialog(false)} screenOrder="patientPayment" handleSavePayment={(value) => onLoad(value)} data={eob} />
                : null}
        </>
    )
}
export default withSnackbar(PatientPayment)