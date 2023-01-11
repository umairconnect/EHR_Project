import React, { useState, useEffect, useRef } from "react";
import {
    IconButton,
    Dialog,
    Grid,
    FormHelperText
} from "@material-ui/core";
import { AttachFile } from '@material-ui/icons';
import useStyles from "./styles";
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
import LoadingIcon from "../../../../../../../../images/icons/loaderIcon.gif";
import { InputBaseField, SelectField, TextareaField, InputPaymentField } from "../../../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { InputBaseAdornmentField } from "../../../../../../../../components/InputField/InputField";
import { data as gridCnfg } from '../../../../../../../../components/SearchGrid/component/setupData';
import { Empty, Table } from "antd";
import { formatDate } from '../../../../../../../../components/Common/Extensions';
//
import { PaymentStatusOptions } from "../../../../../../../../context/StaticDropDowns";
function AddEobDialog({ showHideDialog, handleClose, handleSavePayment, screenOrder, patientId, appointmentId, appointmentDate, patientName, eobId, ...props }) {
    const { showMessage } = props;

    // handle styles
    const classes = useStyles();
    const inputFile = useRef(null);

    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const todayDate = new Date().getFullYear() + '-' + String((new Date().getMonth() + 1)).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');

    const defaultAttributes = {
        eobId: 0, payerCode: '', payerName: '', insurancePayerId: '', payerTraceNo: '',
        paymentMethodCode: '', totalPaid: 0, checkDate: todayDate, depositDate: todayDate, scannedEobPath: '',
        paymentCategoryCode: 'patient', paymentDate: todayDate, providerId: 0, providerName: '', paymentType: 'credit',
        appointmentId: null, notes: '', patientName: '', patientId: patientId, lstPaymentDetail: []
    };
    const [state, setState] = useState(defaultAttributes);
    const [errorMessages, setErrorMessages] = useState({
        errorPatientName: false, errorPaymentDate: false,
        errorPaymentMethod: false, errortotalPaid: false,
        errorPayerName: false
    });
    const [paymentClaimId, setPaymentClaimId] = useState(props.claimId);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [lstAppointmentsPayment, setLstAppointmentsPayment] = useState([]);
    const [rowsData, setRowsData] = useState([]);

    const loadClaimByDosDDL = () => {
        setLstAppointmentsPayment([{ value: 0, label: "Unallocated" }]);
        var params = {
            code: "get_claim_cpts_patient",
            parameters: [patientId.toString()]
        };
        setIsLoading(true);
        PostDataAPI("ddl/loadItems", params).then((result) => {
            setIsLoading(false);

            if (result.success && result.data != null) {

                if (result.data.length > 0) {

                    result.data.unshift({ id1: 0, text1: "Unallocated", id: null });
                    setLstAppointmentsPayment(
                        result.data.map((item, i) => {
                            return { value: item.id1, label: item.amount ? item.text1 + ' ($' + numberFormat(item.amount) + ' ) ' : item.text1, claimId: item.id };
                        }));

                    let selectedItem = searchArray(parseInt(paymentClaimId), result.data);
                    if (selectedItem != undefined) {
                        if (paymentClaimId > 0)
                            loadCptsByClaimData(paymentClaimId);
                    }

                }
            }
        })
    }

    const getPaymentMethodsDataList = e => {

        var params = {
            code: "DDL_List_Item_display_Order",
            parameters: ['patient_payment_type', 'patient_payment_method']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _patientPaymentType = [];
                var _patientPaymentMethod = [];

                result.data.map((item, i) => {

                    if (item.text3 == 'patient_payment_type')
                        _patientPaymentType.push({ value: item.text1, label: item.text2 });
                    else if (item.text3 == 'patient_payment_method')
                        _patientPaymentMethod.push({ value: item.text1, label: item.text2 });
                });

                setPaymentTypes(_patientPaymentType);
                setPaymentMethods(_patientPaymentMethod);
            }
        });
    }
    const loadBatchData = () => {
        setIsLoading(true);
        PostDataAPI("eob/get", eobId).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                setIsLoading(false);

                if (result.data.receivingDate)
                    result.data.receivingDate = formatDate(result.data.receivingDate.split('T')[0]);
                if (result.data.paymentDate)
                    result.data.paymentDate = result.data.paymentDate.split('T')[0];
                setState(result.data);
                setState(prevState => ({
                    ...prevState,
                    ['appointmentId']: appointmentId,
                    ['patientName']: patientName,
                }));
                //if (result.data.scannedEobPath !== "null") {
                //    setUploadedFileName(result.data.scannedEobPath.split(/[\\s,]+/).pop());
                //}

            }
        })
    }
    useEffect(() => {
        getPaymentMethodsDataList();
        if (screenOrder == "claimScreen") {
            loadClaimByDosDDL();
        }
        else if (screenOrder == "appointmentList") {
            setLstAppointmentsPayment(
                [{ value: appointmentId, label: appointmentDate }]
            );
            if (eobId > 0)
                loadBatchData();
            setState(prevState => ({
                ...prevState,
                ['appointmentId']: appointmentId,
                ['patientName']: patientName
            }));
        }
        else if (props.data) {

            if (props.data.paymentDate)
                props.data.paymentDate = props.data.paymentDate.split('T')[0];
            setState(props.data);
        }
    }, [showHideDialog]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "appointmentId") {

            if (value != "0") {
                let selectedItem = searchArray(parseInt(value), lstAppointmentsPayment);
                if (selectedItem != undefined) {
                    loadCptsByClaimData(selectedItem.claimId);
                }
            }

        }
        else if (name === "paymentMethodCode") {
            if (state.paymentMethodCode == 'check') { } else {
                setState(prevState => ({
                    ...prevState,
                    payerTraceNo: ''
                }))
            }
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const applyRemainingAmount = (value) => {

        let totalAmount = parseFloat(isNaN(value) ? 0 : value);
        let lstPayment = [];
        if (totalAmount > 0) {
            if (state.lstPaymentDetail) {

                let i = state.lstPaymentDetail.length - 1;

                for (let j = i; j >= 0; j--) {

                    if (totalAmount > 0) {
                        state.lstPaymentDetail[j].paidAmount = state.lstPaymentDetail[j].startBalance >= totalAmount ? totalAmount : state.lstPaymentDetail[j].startBalance;
                        state.lstPaymentDetail[j].endBalance = parseFloat(parseFloat(state.lstPaymentDetail[j].startBalance - state.lstPaymentDetail[j].paidAmount).toFixed(2));
                        totalAmount = totalAmount - state.lstPaymentDetail[j].paidAmount;
                    }
                    else {
                        state.lstPaymentDetail[j].paidAmount = 0.00;
                        state.lstPaymentDetail[j].endBalance = parseFloat(parseFloat(state.lstPaymentDetail[j].startBalance - state.lstPaymentDetail[j].paidAmount).toFixed(2));

                    }

                    if (j === 0) {
                        setState(prevState => ({
                            ...prevState,
                            lstPaymentDetail: state.lstPaymentDetail
                        }));
                        loadData(state.lstPaymentDetail);
                    }
                }

            }

        }
    }
    const handleSearchChange = (name, item, val) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: value,
            [val]: id
        }));
    }
    const loadData = (list) => {

        setRowsData(
            list.map((item, i) => {
                item.strPaidAmount = <span className={classes.posSpan}>
                    <InputPaymentField
                        id="paidAmount"
                        name={i}
                        placeholder="$0.00"
                        value={item.paidAmount}
                        onChange={handleChangeRowsData}
                        MaxLength={15}

                    />
                </span>
                item.strStatusCode = <span className={classes.posSpan}>
                    <SelectField
                        id="statusCode"
                        name={i}
                        value={item.statusCode}
                        onChange={handleChangeRowsData}
                        options={PaymentStatusOptions}

                    />
                </span>

                item.startBalance = numberFormat(item.startBalance.toString().indexOf(',') > 0 ?
                    item.startBalance.replace(',', '') : item.startBalance); // Fixed crashing of 10,000, plus amount
                return { ...item }

            }))

    }
    const handleChangeRowsData = (e) => {
        const { id, name, value } = e.target;

        let stateList = [];

        setState((prevState) => {
            let temp = {
                ...prevState,
                lstPaymentDetail: [...prevState.lstPaymentDetail]
            }

            if (id == "paidAmount") {
                // amount & list Directly proportional
                let balanace = temp.lstPaymentDetail[name]["startBalance"];
                if (parseFloat(value) > parseFloat(balanace.toString().indexOf(',') > 0 ? balanace.replace(',', '') : balanace)) {
                    showMessage("Error", "Amount cannot be greater than end balance", "error", 3000);
                    temp.lstPaymentDetail[name]["paidAmount"] = 0;
                    let _amount = 0;
                    if (temp.lstPaymentDetail) {
                        temp.lstPaymentDetail.map((item, i) => {
                            _amount = _amount + (isNaN(item.paidAmount) ? 0 : parseFloat(item.paidAmount));
                        })
                        setState(prevState => ({
                            ...prevState,
                            totalPaid: isNaN(_amount) ? 0 : parseFloat(_amount)
                        }))
                    }
                }
                else {
                    temp.lstPaymentDetail[name]["paidAmount"] = parseFloat(value);

                    let _amount = 0;
                    if (temp.lstPaymentDetail) {
                        temp.lstPaymentDetail.map((item, i) => {
                            _amount = _amount + (isNaN(item.paidAmount) ? 0 : parseFloat(item.paidAmount));
                        })
                        setState(prevState => ({
                            ...prevState,
                            totalPaid: isNaN(_amount) ? 0 : parseFloat(_amount)
                        }))
                    }
                }
            }
            else if (id == "statusCode")
                temp.lstPaymentDetail[name]["statusCode"] = value;

            stateList = temp.lstPaymentDetail;
            return temp
        })

        loadData(stateList);
    }
    const ValidateSave = (errorList) => {

        if (screenOrder != "claimScreen") {
            if (!state.patientName) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPatientName: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPatientName: false
                }));
            }
        }

        if (!state.paymentDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentDate: false
            }));
        }

        if (!state.paymentMethodCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentMethod: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentMethod: false
            }));
        }

        if (!state.totalPaid) {
            setErrorMessages(prevState => ({
                ...prevState,
                errortotalPaid: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errortotalPaid: false
            }));
        }
        if (state.paymentMethodCode == 'check' && !state.payerTraceNo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerTraceNo: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerTraceNo: false
            }));
        }

    }
    const Save = e => {

        let errorList = [];
        ValidateSave(errorList);
        if (errorList.length < 1) {

            let method = "eob/add";
            let isUpdate = state.eobId > 0;
            if (state.eobId > 0)
                method = "eob/update";

            state.appointmentId = state.appointmentId && state.appointmentId == 0 ? null : state.appointmentId;
            //state.patientId = patientId;
            state.paymentCategoryCode = 'patient';
            let formData = new FormData();
            for (var key in state) {
                if (state[key] && key != "scannedEobPath" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }

            formData.append("formFile", null);
            formData.append("scannedEobPath", null);
            setIsSaving(true);
            PostDataAPI(method, formData, true, 'formData').then((result) => {
                setIsSaving(false);
                if (result.success == true) {
                    //setErrorMessages([]);
                    if (!isUpdate) {
                        if (result.success && result.data != null) {

                            showMessage("Success", "Record saved successfully.", "success", 2000);
                        }
                    }
                    else {
                        if (result.success) {

                            showMessage("Success", "Record updated successfully.", "success", 2000);

                        }
                    }
                    
                    setTimeout(() => {
                        if (screenOrder == "claimScreen") {

                            if (state.appointmentId != null) {

                                let _lstPaymentDetail = [];
                                result.data.claimIds = paymentClaimId.toString();
                                result.data.lstPaymentClaims = null;

                                if (state.lstPaymentDetail) {
                                    state.lstPaymentDetail.map((itm, i) => {

                                        let _paidAmount = itm.statusCode == "1" ? itm.paidAmount : 0.00;
                                        let _applyCredit = itm.statusCode == "2" ? itm.paidAmount : 0.00;

                                        _lstPaymentDetail.push({
                                            claimSuperbillId: parseFloat(itm.claimSuperbillId), dosDate: itm.dosDate, proc: itm.proc,
                                            amount: itm.amount, startBalance: parseFloat(isNaN(itm.startBalance) ? 0.00 : itm.startBalance), paidAmount: parseFloat(isNaN(_paidAmount) ? 0.00 : _paidAmount), applyCredit: parseFloat(isNaN(_applyCredit) ? 0.00 : _applyCredit),
                                            endBalance: parseFloat(isNaN(itm.startBalance) ? 0.00 : itm.startBalance) - parseFloat(isNaN(_paidAmount) ? 0.00 : _paidAmount) - parseFloat(isNaN(_applyCredit) ? 0.00 : _applyCredit),
                                            statusCode: null
                                        });
                                    })
                                }

                                result.data.lstPaymentDetail = _lstPaymentDetail;

                                PostDataAPI('eob/savePatientPaymentDetail', result.data, true).then((result) => {
                                    if (result.success == true) {
                                        if (result.success && result.data != null) {
                                            showMessage("Success", "Record saved successfully.", "success", 2000);
                                            props.handleUnallocated(result.data.totalPaid, parseInt(paymentClaimId));
                                            handleClose();
                                        }
                                    }
                                    else {
                                        // showMessage("Error", result.message, "error", 3000);
                                    }
                                })
                            }
                            else { // unallocated case
                                handleClose();
                            }

                        }
                        else if (screenOrder == "patientPayment") {
                            setState(result.data);
                            handleSavePayment(result.data);
                        }
                        if (screenOrder != "claimScreen" || !state.appointmentid)
                            handleClose();
                    }, 300)
                }
                else {                    
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };
    // Co Payment Section Start
    const loadCptsByClaimData = (id) => {

        PostDataAPI("eob/getCptsForPaymentByClaimID", id).then((result) => {
            if (result.success && result.data != null) {

                if (intiallClaimBalanceExists(result.data)) {

                    state.lstPaymentDetail = [];
                    setState(prevState => ({
                        ...prevState,
                        appointmentId: result.data[0].patientAppointmentId,
                        patientId: result.data[0].patientId,
                        providerId: result.data[0].providerId,
                        providerName: result.data[0].providerName,
                    }))

                    //paymentDate: todayDate
                    setPaymentClaimId(id);
                    setState(prevState => ({
                        ...prevState,
                        lstPaymentDetail: result.data
                    }));
                    loadData(result.data);
                }
            }
        })
    }
    const intiallClaimBalanceExists = (dataSet) => {
        let sumBalance = 0;
        if (dataSet) {
            dataSet.map((item, j) => {
                sumBalance = sumBalance + item.amount;
            })
        }
        return sumBalance > 0 ? true : false;
    }
    // Co Payment Section Closed
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // const re = /^[0-9\b]+$/;
                // const re = /^\d*\.?\d*$/;
                const re = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;

                        if (name == "totalPaid") {
                            if (state.lstPaymentDetail) {
                                for (let k = 0; k < state.lstPaymentDetail.length; k++) {

                                    state.lstPaymentDetail[k].paidAmount = 0.00;
                                }

                                loadData(state.lstPaymentDetail);
                            }

                            applyRemainingAmount(value);
                        }
                        setState(prevState => ({
                            ...prevState,
                            [name]: parseFloat(value)
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {

                if (e.target.value == "" && screenOrder == "claimScreen")
                    clearValues();

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };
    function searchArray(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            let value = myArray[i].value ? myArray[i].value : myArray[i].value;
            if (value === nameKey) {
                return myArray[i];
            }
        }
    }

    const clearValues = () => {
        const paymentList = [...state.lstPaymentDetail];

        state.lstPaymentDetail.map((item, j) => {
            paymentList[j]['paidAmount'] = 0.00;
        })

        setState(prevState => ({
            ...prevState,
            lstPaymentDetail: paymentList
        }));
        loadData(state.lstPaymentDetail);
    }
    return (
        <Dialog
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            classes={{ paper: classes.dialogPaper }}
            PaperComponent={DraggableComponent}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>{screenOrder != "patientPayment" ? "Add Cash" : "Patient Payment"}</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row">
                            {/* <Scrollbars style={{ minHeight: 590 }}> */}
                            <Scrollbars autoHeight autoHeightMax={590} autoHeightMin={415}>

                                <Grid container direction="column">

                                    {screenOrder != "claimScreen" ? <Grid container item itemdirection="row" >

                                        <Label title="Patient" size={3} mandatory={true} />

                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <SearchList
                                                id="patientName"
                                                name="patientName"
                                                code="get_all_patients"
                                                elemCode="patientId"
                                                apiUrl="ddl/loadItems"
                                                searchTerm={state.patientName}
                                                value={state.patientName}
                                                onChangeValue={(name, item, elemCode) => handleSearchChange(name, item, elemCode)}
                                                placeholderTitle="Search Patient Name"
                                                isDisabled={state.eobId > 0 ? true : false}
                                            />
                                            {errorMessages.errorPatientName && !state.patientName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter patient name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid> : null}

                                    {/*<Grid container direction="row" >*/}
                                    {/*    <Label title="Provider" size={5} />*/}
                                    {/*    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>*/}
                                    {/*        <SearchList*/}
                                    {/*            id="providerName"*/}
                                    {/*            name="providerName"*/}
                                    {/*            code="get_all_providers_query"*/}
                                    {/*            elemCode="providerId"*/}
                                    {/*            apiUrl="ddl/loadItems"*/}
                                    {/*            searchTerm={state.providerName}*/}
                                    {/*            value={state.providerName}*/}
                                    {/*            onChangeValue={(name, item, elemCode) => handleSearchChange(name, item, elemCode)}*/}
                                    {/*            placeholderTitle="Select Provider"*/}
                                    {/*        />*/}
                                    {/*    </Grid>*/}
                                    {/*</Grid>*/}

                                    <Grid container direction="row" >
                                        <Label title="Payment Date" size={3} mandatory={true} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <InputBaseField
                                                type="date"
                                                id="paymentDate"
                                                name="paymentDate"
                                                value={state.paymentDate}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorPaymentDate && !state.paymentDate ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter payment date
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    {screenOrder != "patientPayment" ? <Grid container direction="row" >
                                        <Label title="Appointment" size={3} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <SelectField
                                                placeholder="Select Appointemnt"
                                                id="appointmentId"
                                                name="appointmentId"
                                                options={lstAppointmentsPayment}
                                                value={state.appointmentId}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid> : null}

                                    {/*{screenOrder != "patientPayment" && screenOrder != "claimScreen" ? <Grid container direction="row" >*/}
                                    {/*    <Label title="Line Item" size={3} />*/}
                                    {/*    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>*/}
                                    {/*        <SelectField*/}
                                    {/*            placeholder="Select Line Item"*/}
                                    {/*            id="lineItem"*/}
                                    {/*            name="lineItem"*/}
                                    {/*            options={PaymentStatusOptions}*/}
                                    {/*            value={state.lineItem}*/}
                                    {/*            onChange={handleChange}*/}
                                    {/*        />*/}
                                    {/*    </Grid>*/}
                                    {/*</Grid> : null}*/}

                                    <Grid container direction="row">
                                        <Label title="Payment Method" size={3} mandatory={true} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <SelectField
                                                placeholder="Select Payment Method"
                                                id="paymentMethodCode"
                                                name="paymentMethodCode"
                                                options={paymentMethods}
                                                value={state.paymentMethodCode}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorPaymentMethod && !state.paymentMethodCode ? (<FormHelperText style={{ color: "red" }} >
                                                Please select payment method
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    {state.paymentMethodCode == 'check' ? <Grid container item direction="row">
                                        <Label title="Check #" size={3} mandatory={state.paymentMethodCode == 'check'} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <InputBaseField
                                                id="payerTraceNo"
                                                name="payerTraceNo"
                                                placeholder={"###"}
                                                value={state.payerTraceNo}
                                                onChange={handleChange}
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorPayerTraceNo && state.paymentMethodCode == 'check' && !state.payerTraceNo ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter check #
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                        : null}

                                    <Grid container direction="row" >
                                        <Label title="Type" size={3} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <SelectField
                                                id="paymentType"
                                                name="paymentType"
                                                value={state.paymentType}
                                                onChange={handleChange}
                                                options={paymentTypes}
                                                placeholder="Select Type"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row">
                                        <Label title="Notes" isTextAreaInput={true} size={3} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <TextareaField
                                                rowsMin={5}
                                                placeholder="Notes"
                                                id="notes"
                                                name="notes"
                                                value={state.notes}
                                                onChange={handleChange}
                                                MaxLength="2000"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" >
                                        <Label title="Amount" size={3} mandatory={true} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <InputBaseAdornmentField
                                                id="totalPaid"
                                                name="totalPaid"
                                                value={state.totalPaid}
                                                placeholder={"0.00"}
                                                type="number"
                                                onChange={(e) => { handleNumberChange(e, 12) }}
                                                startadornment={<>$</>}
                                            />
                                            {errorMessages.errortotalPaid && !state.totalPaid ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter amount
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    {screenOrder != "patientPayment" && screenOrder != "appointmentList" && state.appointmentId > 0 ? <Grid container direction="row" >
                                        <div className="custom-grid">
                                            <Table
                                                locale={{
                                                    emptyText: (
                                                        <Empty
                                                            image={isLoading && LoadingIcon}
                                                            description={isLoading ? "Loading..." : "No Record Found"}
                                                            imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                        />
                                                    )
                                                }}
                                                checkStrictly={true}
                                                scroll={true}
                                                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                dataSource={rowsData}
                                                columns={gridCnfg["AddCash"]}
                                            />
                                        </div>
                                    </Grid> : null}
                                </Grid>
                            </Scrollbars>
                        </Grid>
                    </div>
                    <div className={classes.footer}>
                        <Grid container justify="center" >
                            {isSaving ?
                                <FormBtn id="loadingSave"  > Save</FormBtn>
                                :
                                <FormBtn id="save" onClick={Save}> Save</FormBtn>
                            }
                            <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                        </Grid>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}
export default withSnackbar(AddEobDialog)