import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography,
    Tooltip,
} from "@material-ui/core";
// components
import PageTitle from "../../../../../../../../components/PageTitle";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { FormBtn, ShadowBox, LinkS } from "../../../../../../../../components/UiElements/UiElements";
import { InputBaseField, SelectField, InputPaymentField } from "../../../../../../../../components/InputField/InputField";
import SearchListField from "../../../../../../../../components/SearchListField/SearchListField";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import DeleteIcon from '../../../../../../../../images/icons/trash.png';
import { withSnackbar } from '../../../../../../../../components/Message/Alert'
import { formatDate, formatCurrency } from '../../../../../../../../components/Common/Extensions';
// styles
import useStyles from "./styles";
import "../../../../styles.css";
//import AdjusmentReasonDialog from '../adjustmentReasonDialog/AdjustmentReasonDialog';
import ClaimPatientProfile from "../../../../../claim/components/addNewClaim/components/claimPatientProfile/ClaimPatientProfile";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { Link, useHistory } from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';
import { VerticalAlignBottom } from "@material-ui/icons";
import AdjustmentReasonDialog from "../adjustmentReasonDialog/AdjustmentReasonDialog";
function IndividualInsurancePayment({ ...props }) {
    const { showMessage } = props;
    const [errorMessages, setErrorMessages] = useState({ errorCode: false, errorname: false })
    const classes = useStyles();
    let history = useHistory()
    let propsData = [];
    let loadRecord = true;

    if (props.location.pathname != null && props.location.pathname != "" && props.location.pathname.split('=').length > 1) {
        propsData = props.location.pathname.split('=')[1].split('/');
    }
    else
        loadRecord = false;
    let eobId = !loadRecord ? 0 : propsData[0];
    let claimId = !loadRecord ? 0 : propsData[1];
    let paymentType = !loadRecord || propsData.length <= 2 ? 'eob' : propsData[2];

    const [state, setState] = useState({});
    const [adjustmentReasonsDialogState, setAdjustmentReasonsDialogState] = useState(false);
    const [adjustmentReasonsIndex, setAdjustmentReasonsIndex] = useState(-1);
    const [editAdjustmentReasons, setEditAdjustmentReasons] = useState({ lstAdjustmentReasons: [] });
    const [saveLoading, setSaveLoading] = useState(false);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const Save = gotoNext => {
        state.claimSuperbillId = parseInt(claimId);
        lstPaymentDetailFiltered.forEach(t => {
            t.allowedAmount = parseFloat(t.allowedAmount);
            t.paidAmount = parseFloat(t.paidAmount);
            t.adjustedAmount = parseFloat(t.adjustedAmount);
            t.unpaidAmount = parseFloat(t.unpaidAmount);
            t.endBalance = parseFloat(t.endBalance);
        });
        state.lstPaymentDetail = lstPaymentDetailFiltered;
        state.receivingDate = new Date(state.receivingDate);
        let method = "eob/savePaymentDetail";
        if (paymentType == "era")
            method = "billingbatchint/savePaymentDetail";
        PostDataAPI(method, state, true).then((result) => {
            if (result.success == true) {
                if (result.success && result.data != null) {

                    if (result.data.receivingDate)
                        result.data.receivingDate = formatDate(result.data.receivingDate.split('T')[0]);
                    setState(result.data);
                    populatePaymentDetail(result.data);
                    showMessage("Success", "Record saved successfully.", "success", 2000);
                    if (gotoNext == true) {
                        let nextIndex = 0;
                        result.data.lstPaymentClaims.forEach((obj, i) => {
                            if (obj.claimSuperbillId == claimId)
                                nextIndex = i + 1;
                        });
                        history.push(`/app/individualinsurancepayment/id=` + eobId + '/' + result.data.lstPaymentClaims[nextIndex].claimSuperbillId);
                    }
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    };
    const HandlePrevious = () => {
        let prevIndex = 0;
        state.lstPaymentClaims.forEach((obj, i) => {
            if (obj.claimSuperbillId == claimId)
                prevIndex = i - 1;
        });
        history.push(`/app/individualinsurancepayment/id=` + eobId + '/' + state.lstPaymentClaims[prevIndex].claimSuperbillId);
    }

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(true);
    let [totalAmount, setTotalAmount] = useState(0.0),
        [totalStartBalance, setTotalStartBalance] = useState(0.0),
        [totalAllowed, setTotalAllowed] = useState(0.0),
        [totalPaid, setTotalPaid] = useState(0.0),
        [totalAdjusted, setTotalAdjusted] = useState(0.0),
        [totalUnpaid, setTotalUnpaid] = useState(0.0),
        [totalDeductible, setTotalDeductiblet] = useState(0.0),
        [totalEndBalance, setTotalEndBalance] = useState(0.0)
        ;
    const handleChangeDynamic = (e, type, maxLength) => {
        const { id, name, value } = e.target;
        let inputId = id.toString();
        let inputValue = value;
        const paymentList = [...lstPaymentDetailFiltered];
        if (type == 'float') {
            // inputValue = !inputValue ? '' : inputValue.toString();
            //const re = /^[0-9\b]+$/;
            // const re = /^(?:\d*\.\,\d{1,2}|\d+)$/;
            // const re = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/;

            if (inputValue.length <= maxLength) {
                inputValue = inputValue === '' ? '0' : inputValue;
                const existingTotalPaid = paymentList.filter((obj, ind) => ind != inputId).reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.paidAmount);
                }, 0)
                if (name == 'paidAmount' && (existingTotalPaid + parseFloat(inputValue)) > state.totalPaid) {
                    e.preventDefault();
                    showMessage("Error", 'Paid amount cannot be greater than eob amount.', "error", 3000);
                    return;
                }
                // if (inputValue.length <= maxLength) {
                paymentList[inputId][name] = inputValue;
                if (name == 'allowedAmount') {
                    if (inputValue > paymentList[inputId]['amount']) {
                        showMessage("Error", 'Allowed amount cannot be greater than billed amount.', "error", 3000);
                        inputValue = paymentList[inputId]['amount'];
                        paymentList[inputId][name] = inputValue;
                    }
                    paymentList[inputId]['adjustedAmount'] = paymentList[inputId]['startBalance'] - inputValue;
                    paymentList[inputId]['lstAdjustmentReasons'] = [{
                        adjustmentReasonId: 0,
                        eobPaymentId: 0,
                        adjAmount: parseFloat(paymentList[inputId]['adjustedAmount']),
                        reasonCode: '1 - Deductible Amount',
                        reasonTitle: '1 - Deductible Amount'
                    }];
                }
                //SH>No Calculation => @Abid
                //paymentList[inputId]['unpaidAmount'] = paymentList[inputId]['startBalance'] - paymentList[inputId]['allowedAmount'];
                //SH>Formula changed to Start - Paid - Adj => @Abid
                paymentList[inputId]['endBalance'] = parseFloat(paymentList[inputId]['startBalance'] - paymentList[inputId]['paidAmount']).toFixed(2) - paymentList[inputId]['adjustedAmount'];
                if (name != 'deductableAmount')
                    paymentList[inputId]['deductableAmount'] = paymentList[inputId]['allowedAmount'] - paymentList[inputId]['paidAmount'];
                // }
            }
            else {
                e.preventDefault();
            }
        }
        else
            paymentList[inputId][name] = value
        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));
        setLstPaymentDetailFiltered(paymentList);
        calculateTotal(paymentList);
    }

    const addUpdateAdjustmentReasons = (index) => {
        const paymentList = [...lstPaymentDetailFiltered];
        if (paymentList[index]['lstAdjustmentReasons'] == null) {
            paymentList[index]['lstAdjustmentReasons'] = [];
        }
        setEditAdjustmentReasons(paymentList[index]['lstAdjustmentReasons'])
        setAdjustmentReasonsIndex(index);
        setAdjustmentReasonsDialogState(true);
    }

    const updateAdjReasons = (index, adjReasonList, totalAdjusted) => {
        const paymentList = [...lstPaymentDetailFiltered];
        paymentList[index]['lstAdjustmentReasons'] = adjReasonList;
        paymentList[index]['adjustedAmount'] = totalAdjusted;
        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));

        setLstPaymentDetailFiltered(paymentList);
        calculateAdjustmentTotal(paymentList);
        paymentList[index]['endBalance'] = parseFloat(paymentList[index]['startBalance'] - paymentList[index]['paidAmount']).toFixed(2) - paymentList[index]['adjustedAmount'];
        calculateTotal(paymentList);
    }
    const onCloseDialog = () => {
        setAdjustmentReasonsDialogState(false)
    }
    const calculateAdjustmentTotal = (details) => {
        let tAdjusted = 0.0;
        details.forEach((t) => {
            if (t.lstAdjustmentReasons != null) {
                t.lstAdjustmentReasons.map((adj, i) => {
                    tAdjusted += parseFloat(adj.adjAmount ? adj.adjAmount : 0);
                });
            }

        });
        setTotalAdjusted(tAdjusted);
    }
    const calculateTotal = (details) => {
        let tAmount = 0.0,
            tStartBalance = 0.0,
            tAllowed = 0.0,
            tPaid = 0.0,
            tAdjusted = 0.0,
            tUnpaid = 0.0,
            tDeductible = 0.0,
            tEndBalance = 0.0
            ;
        details.forEach((t) => {
            tAmount += parseFloat(t.amount ? t.amount : 0);
            tStartBalance += parseFloat(t.startBalance ? t.startBalance : 0);
            tAllowed += parseFloat(t.allowedAmount ? t.allowedAmount : 0);
            tPaid += parseFloat(t.paidAmount ? t.paidAmount : 0);
            tUnpaid += parseFloat(t.unpaidAmount ? t.unpaidAmount : 0);
            tAdjusted += parseFloat(t.adjustedAmount ? t.adjustedAmount : 0);
            tDeductible += parseFloat(t.deductableAmount ? t.deductableAmount : 0);
            tEndBalance += parseFloat(t.endBalance ? t.endBalance : 0);
        });
        setTotalAmount(tAmount);
        setTotalStartBalance(tStartBalance);
        setTotalAllowed(tAllowed);
        setTotalPaid(tPaid);
        setTotalAdjusted(tAdjusted);
        setTotalUnpaid(tUnpaid);
        setTotalDeductiblet(tDeductible);
        setTotalEndBalance(tEndBalance);

    }
    const CustomSelect = ({ id, name, value, options, ...props }) => {
        return (
            <select
                id={id}
                name={name}
                value={value}
                className={classes.tableSelectInput}
                onChange={e => { handleChangeDynamic(e, '') }}
            >
                <option style={{ textAlign: "left" }} value="">Select Status</option>
                {
                    options.map((item, i) => {
                        return (
                            <option style={{ textAlign: "left" }} value={item.value}>{item.label}</option>
                        )
                    }
                    )
                }
            </select>
        )
    }
    const [lstPaymentDetail, setLstPaymentDetail] = useState([]);
    const [lstPaymentDetailFiltered, setLstPaymentDetailFiltered] = useState([]);
    const loadData = () => {

        var obj = { claimsuperbillId: parseInt(claimId), eobId: parseInt(eobId) };
        let method = "eob/getPaymentDetail";
        if (paymentType == "era")
            method = "billingbatchint/getPaymentDetail";
        PostDataAPI(method, obj).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                if (result.data.receivingDate)
                    result.data.receivingDate = formatDate(result.data.receivingDate.split('T')[0]);
                setState(result.data);
                result.data.lstPaymentDetail.forEach(t => {
                    if (t.eobPaymentId == 0) {
                        t.allowedAmount = t.startBalance;
                        t.endBalance = t.allowedAmount;//SH>as EndBalance= Allowed - Paid(paid is 0 at start)
                    }
                });
                populatePaymentDetail(result.data);
                //enable/disable prev and next buttons
                let currentClaimIndex = 0;
                result.data.lstPaymentClaims.forEach((obj, i) => {
                    if (obj.claimSuperbillId == claimId)
                        currentClaimIndex = i;
                });
                setDisablePrev(currentClaimIndex == 0);
                setDisableNext(currentClaimIndex == result.data.lstPaymentClaims?.length - 1);
            }
        })
    }
    const populatePaymentDetail = (data) => {
        setLstPaymentDetail(data.lstPaymentDetail);
        const lstActivePaymentDetail = data.lstPaymentDetail.filter(t => { return t.isDeleted == false });
        calculateTotal(lstActivePaymentDetail);
        setLstPaymentDetailFiltered(lstActivePaymentDetail);
    }
    const ShowAllPayments = () => {
        const originalPaymentList = lstPaymentDetail;
        originalPaymentList.forEach(t => {
            if (t.isDeleted == true) {
                t.allowedAmount = 0;
                t.paidAmount = 0;
                t.adjustedAmount = 0;
                t.unpaidAmount = 0;
                t.endBalance = 0;
            }
        });
        setLstPaymentDetailFiltered(originalPaymentList);
        calculateTotal(lstPaymentDetail);
    }
    const [paymentMethods, setPaymentMethods] = useState([]);
    const getPaymentMethodsDataList = e => {
        var params = {
            code: "get_eob_payment_methods",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPaymentMethods(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }
    const [paymentStatusList, setPaymentStatusList] = useState([]);
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
    const handleDelete = (idToDelete) => {
        const data = { eobPaymentId: idToDelete };
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            //setIsDeleting(true);
            PostDataAPI('eob/deletePayment', data, true).then((result) => {
                //setIsDeleting(false);
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setTimeout(() => { loadData(); }, 1000);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        });
    }
    const paymentClaimStatus = [
        { value: "0", label: "Bill Primary" },
        { value: "1", label: "Bill Secondary" },
        { value: "2", label: "Bill Tertiary" },
        { value: "3", label: "Bill Patient" },
    ]
    const Initilization = () => {
        getPaymentMethodsDataList();
        getPaymentStatusDataList();
    }
    useEffect(() => {
        Initilization();

        if (eobId && eobId > 0) {
            loadData();
        }
    }, [claimId])
    const backButton = () => {
        if (propsData && propsData[2] == "era") {
            history.push('/app/eraresult/id=' + propsData[0]);
        } else {
            history.push('/app/batchinsurancepayment/id=' + eobId);
        }
    }
    const handleSearchListChange = (name, item, index) => {

        const paymentList = [...state.lstPaymentDetail];
        paymentList[index][name] = item.id == '' ? '' : item.id
        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));
    }

    const selectText = (e) => {
        e.target.select()
    }

    const [externalModulesCall, setExternalModulesCall] = useState({ patientAppointmentId: 0, userLocationId: 0 });

    return (
        <>
            <PageTitle title={propsData && propsData[2] == "era" ? "ERA Payment" : "Insurance Payment"}
                button={
                    <Button
                        size="small"
                        id="btnBackToProvider"
                        className={classes.newAddBtn}
                        onClick={backButton}
                        startIcon={< ArrowBackIosIcon />}
                    >{
                            propsData && propsData[2] == "era" ?
                                "Back to ERA Review"
                                : "Back to Insurance Payment"
                        }
                    </Button>}
            />
            <div style={{ margin: "0px 10px" }}>

                <ShadowBox shadowSize={3} className={classes.shadowBox}>
                    <ClaimPatientProfile patientId={state.patientId} dataId={state.patientId} encouID={state.encounterId} getExternalModulesCall={(value) => setExternalModulesCall(value)} />
                    <div className={classes.searchArea}>
                        <div className={classes.headerContainer}>
                            <div className={classes.insuranceNameContainer}>
                                <Typography className={classes.headerLabel}>Payment From:</Typography>
                                <Typography className={classes.labelValue}>{state.payerName}</Typography>
                            </div>
                            <div className={classes.headerSubContainer}>

                                <div className={classes.headerSubContainerChild}>
                                    <span>
                                        <Typography className={classes.headerLabel}>Check #:</Typography>
                                        <Typography className={classes.labelValue}>{state.payerTraceNo}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>Amount:</Typography>
                                        <Typography className={classes.labelValue}>{formatCurrency(state.totalPaid)}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>Claim #:</Typography>
                                        <Typography className={classes.labelValue}>
                                            <Link to={`/app/addclaim?id=${state.encounterId}/${state.patientId}/${state.claimsuperbillId}/billing`}>{state.claimsuperbillId}</Link>
                                        </Typography>
                                    </span>
                                    <span style={{ alignItems: "center" }}>
                                        <Typography className={classes.headerLabel}>Rendering Provider:</Typography>

                                        <Typography className={classes.labelValue}>{state.renderingProvider}</Typography>


                                    </span>

                                    <span style={{ alignItems: "center", marginTop: '10px' }}>
                                        <Typography className={classes.headerLabel}>Next Action:</Typography>
                                        <div className={classes.inputTd}>
                                            <SelectField
                                                name="actionCode"
                                                value={state.actionCode}
                                                onChange={handleChange}
                                                options={paymentClaimStatus}
                                                placeholder="Select Action"
                                            />
                                        </div>
                                    </span>

                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}>Payment Type:</Typography>
                                        <Typography className={classes.labelValue}>{state.paymentMethodName}</Typography>
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Posted Amount :</Typography>
                                        <Typography className={classes.labelValue}>{formatCurrency(state.postedAmount)}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}></Typography>
                                        <Typography className={classes.labelValue}></Typography>
                                    </span>

                                    <span style={{ alignItems: "center" }}>
                                        <Typography className={classes.headerLabel}>TCN:</Typography>
                                        <div className={classes.inputTd}>
                                            <InputBaseField
                                                name="tcnCode"
                                                value={state.tcnCode}
                                                onChange={handleChange}
                                                MaxLength={50}
                                                placeholder={"TCN"}
                                            />
                                        </div>
                                    </span>

                                    <span style={{ alignItems: "center" }}>
                                        <Typography className={classes.headerLabel}>Claim Control #:</Typography>
                                        <div className={classes.inputTd}>
                                            <InputBaseField
                                                name="claimControlNumber"
                                                value={state.claimControlNumber}
                                                onChange={handleChange}
                                                placeholder={"Claim Control #"}
                                            />
                                        </div>
                                    </span>
                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}>Received Date:</Typography>
                                        <Typography className={classes.labelValue}>{state.receivingDate}</Typography>
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Balance Amount :</Typography>
                                        <Typography className={classes.labelValue}>{formatCurrency(state.unPostedAmount)}</Typography>
                                    </span>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={classes.gridArea}>
                        <div className={classes.gridButtonsArea}>
                            <Button startIcon={<RefreshIcon />} className={classes.Btn} onClick={ShowAllPayments}>Show All</Button>
                            {/* <Button startIcon={<RefreshIcon />} className={classes.Btn} onClick={showAdjustmentReasons}>Show All</Button> */}
                            {/*<Button className={classes.gridButton}>Account Debit</Button>|*/}
                            {/*<Button className={classes.gridButton} >Account summary</Button>|*/}
                            {/*<Button className={classes.gridButton} >Notes</Button>|*/}
                            {/*<Button className={classes.gridButton} >Alerts</Button>*/}
                        </div>
                        <Grid container direction="row" lg={12} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <table className={classes.proceduresTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ minWidth: "1px", padding: "0px" }}></th>
                                            <th>DOS</th>
                                            <th>Proc</th>
                                            <th>Amount</th>
                                            <th>Start Balance</th>
                                            <th>Allowed</th>
                                            <th>Paid</th>
                                            <th>Remarks</th>
                                            <th>Adjusted</th>
                                            <th>Adj. Reasons</th>
                                            <th>PR</th>
                                            <th>Code</th>

                                            {/*<th>PR</th>*/}
                                            <th>Status</th>
                                            <th>End Balance</th>
                                            <th style={{ textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lstPaymentDetailFiltered ?
                                            lstPaymentDetailFiltered.map((item, i) => {
                                                return <>
                                                    <tr>
                                                        {(item.eobPaymentId > 0 || item.batchPaymentId > 0 || item.batchPaymentInpId > 0) ? <td className={item.isDeleted ? classes.deletedLine : classes.activeLine}></td> : <td></td>}
                                                        <td>{formatDate(item.dosDate?.split('T')[0])}</td>
                                                        <td >
                                                            <input
                                                                name="proc"
                                                                value={item.proc}
                                                                id={i}
                                                                onChange={handleChangeDynamic}
                                                                className={classes.tableInput}
                                                                disabled={true}
                                                            />
                                                        </td>
                                                        <td >
                                                            <InputPaymentField
                                                                name="amount"
                                                                id={i}
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                                value={item.amount}
                                                                className={classes.tablePaymentInput}

                                                                // onChange={e => { handleChangeDynamic(e, 'float') }}
                                                                IsDisabled={true}
                                                            />
                                                        </td>
                                                        <td >
                                                            <InputPaymentField
                                                                name="startBalance"
                                                                id={i}
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                                value={item.startBalance}
                                                                className={classes.tablePaymentInput}
                                                                // onChange={e => { handleChangeDynamic(e, 'float') }}
                                                                IsDisabled={true}
                                                            />
                                                        </td>
                                                        <td >
                                                            <input
                                                                name="allowedAmount"
                                                                value={item.allowedAmount}
                                                                id={i}
                                                                onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                                                                type="number"
                                                                step="0.1"
                                                                className={classes.tableInput}
                                                                MaxLength="12"
                                                                onFocus={(e) => selectText(e)}
                                                                disabled={state.benefitOrderCode != 'Primary'}
                                                            />
                                                        </td>
                                                        <td >
                                                            <input
                                                                name="paidAmount"
                                                                value={item.paidAmount}
                                                                id={i}
                                                                onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                                                                type="number"
                                                                step="0.1"
                                                                className={classes.tableInput}
                                                                MaxLength="12"
                                                                onFocus={(e) => selectText(e)}
                                                            />
                                                        </td>
                                                        <td >
                                                            <span className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="remarksCode"
                                                                    value={item.remarksCode}
                                                                    searchTerm={item.remarksName}
                                                                    code="get_rarc_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    popperWidth={true}
                                                                    elemCode={i}
                                                                    onChangeValue={(name, item, index) => handleSearchListChange(name, item, index)}
                                                                />
                                                            </span>

                                                        </td>
                                                        <td >
                                                            <input
                                                                name="adjustedAmount"
                                                                value={item.adjustedAmount}
                                                                id={i}
                                                                onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                                                                type="number"
                                                                step="0.1"
                                                                disabled={true}
                                                                className={classes.tableInput}
                                                                MaxLength="12"
                                                                disabled="{disabled}"
                                                            />
                                                        </td>
                                                        <td >
                                                            <span className={classes.subTd}>
                                                                <Link to="#" ><Typography onClick={() => addUpdateAdjustmentReasons(i)} className={classes.linkName}>
                                                                    View</Typography>
                                                                </Link>
                                                            </span>
                                                        </td>
                                                        <td >
                                                            <input
                                                                name="unpaidAmount"
                                                                value={item.unpaidAmount}
                                                                id={i}
                                                                onChange={e => { handleChangeDynamic(e, 'float', 12) }}
                                                                type="number"
                                                                step="0.1"
                                                                className={classes.tableInput}
                                                                MaxLength="12"
                                                                onFocus={(e) => selectText(e)}
                                                            />
                                                        </td>
                                                        <td >
                                                            <span className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="unpaidReasonCode"
                                                                    value={item.unpaidReasonCode}
                                                                    searchTerm={item.unpaidReasonName}
                                                                    code="get_carc_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    popperWidth={true}
                                                                    elemCode={i}
                                                                    onChangeValue={(name, item, index) => handleSearchListChange(name, item, index)}
                                                                />
                                                            </span>

                                                        </td>
                                                        <td className={classes.statusTd}>
                                                            <CustomSelect
                                                                name="statusCode"
                                                                value={item.statusCode}
                                                                id={i}
                                                                options={paymentStatusList}
                                                            />
                                                        </td>
                                                        <td >
                                                            <InputPaymentField
                                                                name="endBalance"
                                                                id={i}
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                                value={item.endBalance}
                                                                className={classes.tablePaymentInput}
                                                                onChange={e => { handleChangeDynamic(e, 'float', 14) }}
                                                                IsDisabled={true}
                                                            />
                                                        </td>
                                                        <td align="center">
                                                            <Tooltip title="Delete">
                                                                <div className={classes.actionTd}>
                                                                    {(item.eobPaymentId > 0 || item.batchPaymentId > 0 || item.batchPaymentInpId > 0) && state.paymentCategoryCode != 'ERA' ?
                                                                        < img className={classes.deleteTd} src={DeleteIcon} alt="delete" onClick={() => handleDelete(item.eobPaymentId)} />
                                                                        : ''
                                                                    }
                                                                </div>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                </>
                                            })
                                            : null}
                                        {lstPaymentDetailFiltered && lstPaymentDetailFiltered.length > 0 ?
                                            <tr>
                                                <td></td>
                                                <td className={classes.tdBold} colSpan="2" style={{ textAlign: "right" }}>
                                                    Totals:
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalAmount)}
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalStartBalance)}
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalAllowed)}
                                                </td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalPaid)}
                                                </td>
                                                <td></td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalAdjusted)}
                                                </td>
                                                <td colSpan="1"></td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalUnpaid)}
                                                </td>
                                                <td colSpan="1"></td>
                                                {/*<td className={classes.tdBold}>*/}
                                                {/*    {numberFormat(totalDeductible)}*/}
                                                {/*</td>*/}
                                                <td colSpan="1"></td>
                                                <td className={classes.tdBold}>
                                                    {formatCurrency(totalEndBalance)}
                                                </td>
                                                <td colSpan="1"></td>

                                            </tr>
                                            : null}
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="flex-start" justify="center" lg={12}>
                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
                            <FormBtn id="save" btnType={"previous"} onClick={HandlePrevious} disabled={disablePrev}>Previous </FormBtn>
                            {
                                saveLoading ?
                                    <FormBtn id="loadingSave" >Save </FormBtn> :
                                    <FormBtn id="save" onClick={Save} disabled={state.paymentCategoryCode == 'ERA'}>Save </FormBtn>
                            }
                            <FormBtn id="save" btnType={"previous"} onClick={() => { Save(true); }} disabled={disableNext || state.paymentCategoryCode == 'ERA'}>Save & Next </FormBtn>

                            {/* </Grid> */}
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
            {adjustmentReasonsDialogState ?
                <AdjustmentReasonDialog
                    showHideDialog={adjustmentReasonsDialogState}
                    handleClose={() => onCloseDialog()}
                    dataIndex={adjustmentReasonsIndex}
                    adjReasonList={editAdjustmentReasons}
                    handleSave={(lineIndex, adjustmentReasonList, totalAdjusted) => updateAdjReasons(lineIndex, adjustmentReasonList, totalAdjusted)}
                    totalAllowAmount={lstPaymentDetailFiltered[adjustmentReasonsIndex].allowedAmount - lstPaymentDetailFiltered[adjustmentReasonsIndex].paidAmount}
                /> : null
            }

        </>
    )
}
export default withSnackbar(IndividualInsurancePayment)