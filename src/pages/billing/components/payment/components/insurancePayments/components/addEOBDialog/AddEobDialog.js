import React, { useState, useEffect, useRef } from "react";
import {
    IconButton,
    Dialog,
    Grid,
    FormHelperText
} from "@material-ui/core";
import { AttachFile } from '@material-ui/icons';
import useStyles from "./styles";
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { InputBaseField, SelectField, InputBaseFieldNumber } from "../../../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../../../components/Message/Alert';
function AddEobDialog({ showHideDialog, handleClose, handleSave, claimId, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const inputFile = useRef(null);

    const [isSaving, setIsSaving] = useState(false);
    const todayDate = new Date().getFullYear() + '-' + String((new Date().getMonth() + 1)).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');

    const defaultAttributes = {
        eobId: 0, payerCode: '', payerName: '', insurancePayerId: '', payerTraceNo: '', paymentCategoryCode: 'insurance',
        paymentMethodCode: '', totalPaid: 0, checkDate: todayDate, depositDate: todayDate, scannedEobPath: ''
    };
    const [state, setState] = useState(defaultAttributes);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: "" });
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
    useEffect(() => {
        getPaymentMethodsDataList();
        if (props.data) {
            if (props.data.checkDate)
                props.data.checkDate = props.data.checkDate.split('T')[0];

            if (props.data.depositDate)
                props.data.depositDate = props.data.depositDate.split('T')[0];

            setState(props.data);
            if (props.data.scannedEobPath && props.data.scannedEobPath != 'null' && props.data.scannedEobPath.length > 0)
                setAttachment({ file: null, userPhoto: null, userFileName: props.data.scannedEobPath.split('\\').pop().split('/').pop() });
        }
        if (claimId > 0) {
            getPatientInsuranceByClaimId();
        }

    }, [showHideDialog]);
    const getPatientInsuranceByClaimId = () => {
        //setIsLoading(true);
        PostDataAPI("insurance/getPatientInsuranceByClaimId", claimId).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                //setIsLoading(false);
                
                setState(prevState => ({
                    ...prevState,
                    payerCode: result.data.payerCode,
                    payerName:result.data.payerName
                }))
            }
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePaymentMethodChange = (e) => {
        const { name, value, id } = e.target;
        const selectedText = e.target.options[e.target.selectedIndex].text;
        setState(prevState => ({
            ...prevState,
            [id]: value,
            [name]: selectedText
        }))
    }
    const handleSearchChange = (name, item, val) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: value,
            [val]: id
        }));
    }
    function handleFileUpload(e) {

        setAttachment({ file: null, userPhoto: null, userFileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })
    }
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // const re = /^[0-9\b]+$/;
                // const re = /^\d*\.?\d*$/;
                const re = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;
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
                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: parseFloat(value)
                }));
            }
        }
        else
            e.preventDefault();
    };
    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });
    const ValidateSave = (errorList) => {
        if (!state.payerName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerName: false
            }));
        }

        if (!state.paymentMethodCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentMethodCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPaymentMethodCode: false
            }));
        }

        if (!state.totalPaid > 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTotalPaid: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTotalPaid: false
            }));
        }

        if (state.paymentMethodCode == 'CHECK' && !state.payerTraceNo) {
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

            let formData = new FormData();
            for (var key in state) {
                if (state[key] && key != "scannedEobPath" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }

            formData.append("formFile", attachment.userPhoto);
            formData.append("scannedEobPath", attachment.file);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                //setSaveLoading(false);
                if (result.success == true) {
                    //setErrorMessages([]);
                    if (!isUpdate) {
                        if (result.success && result.data != null) {
                            showMessage("Success", "Record saved successfully.", "success", 2000);
                            setState(result.data);
                            handleSave(result.data);
                            handleClose();
                        }
                    }
                    else {
                        if (result.success) {
                            showMessage("Success", "Record updated successfully.", "success", 2000);
                            setState(result.data);
                            handleSave(result.data);
                            handleClose();
                        }
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };
    return (
        <Dialog
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>Add EOB</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container item direction="row" lg={12} xl={12}>
                            <Scrollbars style={{ minHeight: 415 }}>

                                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="Insurance Payer Name" size={5} mandatory={true} />

                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <SearchList
                                            id="payerName"
                                            name="payerName"
                                            code="get_payer"
                                            elemCode="payerCode"
                                            apiUrl="ddl/loadItems"
                                            searchTerm={state.payerName}
                                            value={state.payerName}
                                            onChangeValue={(name, item, elemCode) => handleSearchChange(name, item, elemCode)}
                                            placeholderTitle="Name"
                                        />
                                        {errorMessages.errorPayerName && !state.payerName ? (<FormHelperText style={{ color: "red" }} >
                                            Please select payer name
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>

                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Insurance Payer Code" size={5} mandatory={true} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            id="payerCode"
                                            name="payerCode"
                                            value={state.payerCode}
                                            onChange={handleChange}
                                            placeholder={"Code"}
                                            IsDisabled={true}
                                        />

                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Payment Type" size={5} mandatory={true} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <SelectField
                                            placeholder="Select Payment Type"
                                            id="paymentMethodCode"
                                            name="paymentMethodName"
                                            options={paymentMethods}
                                            value={state.paymentMethodCode}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        {errorMessages.errorPaymentMethodCode && !state.paymentMethodCode ? (<FormHelperText style={{ color: "red" }} >
                                            Please select payment method
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Check #" size={5} mandatory={state.paymentMethodCode == 'CHECK'} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            id="payerTraceNo"
                                            name="payerTraceNo"
                                            placeholder={"###"}
                                            value={state.payerTraceNo}
                                            onChange={handleChange}
                                            MaxLength={50}
                                        />
                                        {errorMessages.errorPayerTraceNo && state.paymentMethodCode == 'CHECK' && !state.payerTraceNo ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter payer trace no
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>



                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Total Paid" size={5} mandatory={true} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        {/* <InputBaseFieldNumber
                                            type="number"
                                            onChange={(e) => { handleNumberChange(e, 8) }}
                                            name="totalPaid"
                                            value={state.abdomialGirth}
                                            MinValue={0}
                                            MaxValue={8}
                                            placeholder={"0.00"}
                                        /> */}
                                        <InputBaseField
                                            id="totalPaid"
                                            name="totalPaid"
                                            // placeholder={"###"}
                                            type="number"
                                            value={state.totalPaid}
                                            onChange={(e) => { handleNumberChange(e, 12) }}
                                            placeholder={"0.00"}
                                        />
                                        {errorMessages.errorTotalPaid && !state.totalPaid > 0 ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter total paid amount
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Check Date" size={5} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            type="date"
                                            id="checkDate"
                                            name="checkDate"
                                            value={state.checkDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Deposit Date" size={5} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            type="date"
                                            id="depositDate"
                                            name="depositDate"
                                            value={state.depositDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Scanned EOB" size={5} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <span className={classes.btnSpan}>
                                            <InputBaseField
                                                id="value"
                                                name="value"
                                                value={attachment.userFileName}
                                                onChange={handleChange}
                                                IsDisabled={true}
                                                placeholder={"Choose a file"}
                                                endAdornment={
                                                    <IconButton
                                                        className={classes.attachmentBtn}
                                                        color="primary"
                                                        onClick={handleSelectFile}>
                                                        <AttachFile />
                                                    </IconButton>
                                                }
                                            />
                                            {/* <IconButton
                                                className={classes.attachmentBtn}
                                                color="primary"
                                                onClick={handleSelectFile}>
                                                <AttachFile />
                                            </IconButton> */}

                                        </span>
                                        <form>
                                            <div>
                                                <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                            </div>
                                        </form>
                                    </Grid>
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