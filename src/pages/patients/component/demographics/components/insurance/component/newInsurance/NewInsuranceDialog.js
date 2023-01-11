import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { withSnackbar } from '../../../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    FormHelperText, Snackbar, Slide, Divider
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import { InputBaseField, InputBaseFieldNumber, TextareaField, SelectField, RadioboxField, CheckboxField } from "../../../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
import LogDialog from "../../../../../../../../components/LogDialog/LogDialog";
import { InputPaymentField } from "../../../../../../../../components/InputField";
import Eligibility from '../../../eligibility/Eligibility';


function NewInsuranceDialog({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();
    const statusOptions = [
        {
            value: true,
            label: "Active",
            className: 'adjustLabels',
        },
        {
            value: false,
            label: "In Active",
            className: 'adjustLabels',
        },
    ];
    const orderOfBenifit = [
        {
            value: "Primary",
            label: "Primary"
        },
        {
            value: "Secondary",
            label: "Secondary"
        },
        {
            value: "Tertiary",
            label: "Tertiary"
        }
    ];
    const copayTypeOptions = [
        {
            value: true,
            label: "Fixed",
            className: 'adjustLabels',
        },
        {
            value: false,
            label: "Percentage",
            className: 'adjustLabels',
        },
    ];
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //State For Action Dialog
    const [messageProps, setMessageProps] = useState({
        messagePropsState: false, messagePropsTitle: "Title", messagePropsMessage: "Message", messagePropsSeverity: "success", messagePropsDuration: 3000
    });
    const [dataId, setDataId] = useState(props.dataId);
    const [patientId] = useState(props.patientId);
    const startDate = new Date().getFullYear() + '-' + '01' + '-' + '01';
    const endDate = new Date().getFullYear() + '-' + '12' + '-' + '31';
    // console.log(startDate);
    const defaultAttributes = {
        patientInsuranceId: 0, payerId: "0", payerCode: "", patientId: patientId, benefitOrderCode: "", isWorkerCompsation: false, groupId: "",
        effectiveFrom: startDate, effectiveTo: endDate, relationshipToInsuredCode: "Self", isCopayFixed: true, fixedCopay: 0,
        percentageCopay: 0, claimNumber: "", payerName: "", planName: "", insuranceId: '',
        notes: "", isActive: true, isDeleted: false, copay: "", planCode: "", planTypeCode: "", planTypeName: ""
    };

    const [saveLoading, setSaveLoading] = useState(false);


    const [insurance, setInsurance] = useState(defaultAttributes);
    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });
    const [isSaveCall, setIsSaveCall] = useState(false);

    const ClearFormValues = () => {
        if (dataId > 0 || dataId != "") {
            loadInsurance();
        }
        else {
            setInsurance(defaultAttributes);
        }
    };
    const [relationshipCodes, setRelationshipCodes] = useState([]);
    const [checkEligibilityDialogOpenClose, setCheckEligibilityDialogOpenClose] = useState(false);
    const closeEligibility = () => {
        setCheckEligibilityDialogOpenClose(false);
    }
    const openEligibility = () => {
        setCheckEligibilityDialogOpenClose(true);
    }
    useEffect(() => {

        initialization();
        loadInsurance();

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsurance(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;
                        setInsurance(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                setInsurance(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };
    const handlePlanTypeChange = (e) => {
        const { name, value, id } = e.target;
        const selectedText = e.target.options[e.target.selectedIndex].text;
        setInsurance(prevState => ({
            ...prevState,
            [name]: value,
            [id]: selectedText
        }))
    }

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setInsurance(prevState => ({
            ...prevState,
            [name]: value == 'true'
        }))
    }

    const handlePayerChange = (name, item, val) => {
        const { id, value } = item;
        setInsurance(prevState => ({
            ...prevState,
            [name]: id.toString(),
            [val]: value,
            ['planCode']: '',
            ['planName']: ''
        }));
    }
    const handleSearchListChange = (name, item, val) => {
        const { id, value } = item;
        setInsurance(prevState => ({
            ...prevState,
            [name]: id.toString(),
            [val]: value
        }));
    }
    const handleChkboxChange = e => {
        const { name, checked } = e.target;
        setInsurance(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    const loadInsurance = () => {
        if (dataId > 0) {
            PostDataAPI("insurance/get", dataId.dataId ? dataId.dataId : dataId).then((result) => {
                if (result.success && result.data != null) {
                    // Set data Here
                    if (result.data.effectiveFrom)
                        result.data.effectiveFrom = result.data.effectiveFrom.split('T')[0];
                    if (result.data.effectiveTo)
                        result.data.effectiveTo = result.data.effectiveTo.split('T')[0];
                    if (result.data.isCopayFixed)
                        result.data.copay = result.data.fixedCopay;
                    else
                        result.data.copay = result.data.percentageCopay;
                    //result.data.payerId = result.data.payerId.toString();
                    setInsurance(result.data);
                }
            })
        }
        else {
            setInsurance(defaultAttributes);
        }
    }
    const Save = e => {

        let errorList = [];

        ValidateSave(errorList);
        if (errorList.length < 1) {
            setIsSaveCall(true);
            let method = "insurance/add";
            if (dataId.dataId ? dataId.dataId : dataId > 0)
                method = "insurance/update";

            insurance.payerId = parseInt(insurance.payerId);
            insurance.patientId = parseInt(insurance.patientId);
            insurance.groupId = insurance.groupId ? parseInt(insurance.groupId) : 0;
            insurance.fixedCopay = 0;
            insurance.percentageCopay = 0;
            insurance.effectiveFrom = insurance.effectiveFrom ? insurance.effectiveFrom : "0001-01-01";
            insurance.effectiveTo = insurance.effectiveTo ? insurance.effectiveTo : "0001-01-01";
            if (insurance.copay) {
                if (insurance.isCopayFixed && insurance.copay)
                    insurance.fixedCopay = parseFloat(insurance.copay);
                else
                    insurance.percentageCopay = parseFloat(insurance.copay);
            }
            setSaveLoading(true);
            PostDataAPI(method, insurance, true).then((result) => {
                setSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    if (dataId < 1) {
                        if (result.success && result.data != null) {

                            setInsurance(result.data);
                            setIsSaveCall(false);
                            // showMessage("Success", "Insurance saved successfully.", "success", 2000);
                            ShowMessageDialog(true, "Success", "Insurance saved successfully.", "success", 3000)

                            setDataId({
                                dataId: result.data.insuranceId
                            });
                            setTimeout(() => { handleClose(); }, 2000);

                        }
                    }
                    else if (dataId > 0 || dataId != "") {
                        if (result.success) {
                            setIsSaveCall(false);
                            // showMessage("Success", "Insurance updated successfully.", "success", 3000);
                            ShowMessageDialog(true, "Success", "Insurance updated successfully.", "success", 3000)
                            setTimeout(() => { handleClose(); }, 2000);
                        }
                    }
                }
                else {
                    // showMessage("Error", result.message, "error", 15000);
                    ShowMessageDialog(true, "Error", result.message, "error", 3000);

                    setIsSaveCall(false);
                }
            })
        }
    };
    const ValidateSave = (errorList) => {
        if (!insurance.payerName) {
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
        if (!insurance.benefitOrderCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBenefitOrderCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBenefitOrderCode: false
            }));
        }
        if (!insurance.insuranceId) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInsuranceId: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInsuranceId: false
            }));
        }
        if (insurance.effectiveFrom >= insurance.effectiveTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: false
            }));
        }
    }
    const [planTypes, setPlanTypes] = useState([]);
    const getPlanTypeDataList = e => {
        var params = {
            code: "get_payer_plan_types",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPlanTypes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }
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
    const ShowMessageDialog = (state, title, message, severity, duration) => {
        setMessageProps(prevState => ({
            ...prevState,
            messagePropsState: true,
            messagePropsTitle: title,
            messagePropsMessage: message,
            messagePropsSeverity: severity,
            messagePropsDuration: duration
        }));
    }
    const closeMessageDialog = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessageProps(prevState => ({
            ...prevState,
            messagePropsState: false,
        }));
    };
    function initialization() {

        var params = {
            code: "get_releationships_by_patient",
            parameters: [patientId.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setRelationshipCodes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })
        getPlanTypeDataList();

    }
    const deleteRecord = () => {
        props.handleDelete(insurance.patientInsuranceId);
    }
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }
    return (
        <>
            <Dialog
                open={dialogOpenClose}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                maxWidth={'lg'}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>{dataId > 0 ? "Edit Insurance" : "New Insurance"}</FormGroupTitle>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 545 }}>
                                <Grid container item direction="row" lg={12}>
                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Status" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <RadioboxField
                                                id="isActive"
                                                name="isActive"
                                                value={insurance.isActive}
                                                labelPlacement="end"
                                                onChange={handleRadioChange}
                                                options={statusOptions}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Payer Name" mandatory={true} size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SearchList
                                                id="payerCode"
                                                name="payerCode"
                                                value={insurance.payerCode}
                                                elemCode="payerName"
                                                searchTerm={insurance.payerName}
                                                code="get_payer"
                                                apiUrl="ddl/loadItems"
                                                placeholderTitle="Search Payer"

                                                onChangeValue={(name, item, elemCode) => handlePayerChange(name, item, elemCode)}

                                            />
                                            {errorMessages.errorPayerName && !insurance.payerName ? (<FormHelperText style={{ color: "red" }} >
                                                Please select payer name
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Plan Name" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            {insurance.payerCode != '' ?
                                                <SearchList
                                                    id="planName"
                                                    name="planCode"
                                                    value={insurance.planName}
                                                    searchTerm={insurance.planName}
                                                    searchId={insurance.payerCode}
                                                    elemCode="planName"
                                                    code="get_plan_by_payer"
                                                    apiUrl="ddl/loadItems"

                                                    onChangeValue={(name, item, elemCode) => handleSearchListChange(name, item, elemCode)}
                                                />
                                                :
                                                <InputBaseField
                                                    id="planName"
                                                    name="planName"
                                                    IsDisabled={true}
                                                    onChange={handleChange}
                                                />
                                            }
                                        </Grid>
                                        <Label title="Plan Code" size={2} />
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            <InputBaseField
                                                id="planCode"
                                                name="planCode"
                                                value={insurance.planCode}
                                                onChange={handleChange}
                                                IsDisabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Plan Type" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                id="planTypeName"
                                                name="planTypeCode"
                                                value={insurance.planTypeCode}
                                                placeholder="Select Plan Type"
                                                onChange={handlePlanTypeChange}
                                                options={planTypes} />
                                        </Grid>

                                    </Grid>
                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Order Of Benefit" mandatory={true} size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                id="benefitOrderCode"
                                                name="benefitOrderCode"
                                                options={orderOfBenifit}
                                                value={insurance.benefitOrderCode}
                                                placeholder="Select Order"
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorBenefitOrderCode && !insurance.benefitOrderCode ? (<FormHelperText style={{ color: "red" }} >
                                                Please select order
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            <CheckboxField
                                                color="primary"
                                                name="isWorkerCompsation"
                                                label="Worker Compensation"
                                                checked={insurance.isWorkerCompsation ? true : false}
                                                onChange={handleChkboxChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Insurance ID" mandatory={true} size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                                id="insuranceId"
                                                name="insuranceId"
                                                value={insurance.insuranceId}
                                                onChange={handleChange}
                                                placeholder="Insurance ID"
                                                MaxLength={64}
                                            />
                                            {errorMessages.errorInsuranceId && !insurance.insuranceId ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter insurance id
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                        <Label title="Group ID" size={2} />
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            <InputBaseField
                                                id="groupId"
                                                name="groupId"
                                                value={insurance.groupId}
                                                onChange={(e) => { handleNumberChange(e, 8) }}
                                                placeholder="Group ID"

                                                MaxLength={"8"}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Effective From" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                                type="date"
                                                id="effectiveFrom"
                                                name="effectiveFrom"
                                                value={insurance.effectiveFrom}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorEffectiveDate && insurance.effectiveFrom >= insurance.effectiveTo ? (<FormHelperText style={{ color: "red" }} >
                                                From date must be earlier than to date
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                        <Label title="Effective To" size={2} />
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            <InputBaseField
                                                type="date"
                                                id="effectiveTo"
                                                name="effectiveTo"
                                                value={insurance.effectiveTo}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Relationship To Insured" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                id="relationshipToInsuredCode"
                                                name="relationshipToInsuredCode"
                                                options={relationshipCodes}
                                                value={insurance.relationshipToInsuredCode}
                                                onChange={handleChange}
                                                placeholder="Select Relationship"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                        {insurance.patientInsuranceId > 0 ?
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>

                                                <FormBtn
                                                    id={"save"}
                                                    btnType={"eligibility"}
                                                    size="medium"
                                                    onClick={openEligibility}
                                                >Check Eligibility
                                                </FormBtn>

                                            </Grid>
                                            : null
                                        }
                                        {/* <Label title="Claim Number" size={2} />
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            <InputBaseField
                                                id="claimNumber"
                                                name="claimNumber"
                                                value={insurance.claimNumber}
                                                placeholder="Claim Number"
                                                onChange={handleChange}
                                                MaxLength={255}
                                            />
                                        </Grid> */}
                                    </Grid>
                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Copay Type" size={2} />
                                        <Grid container item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                                <RadioboxField
                                                    id="isCopayFixed"
                                                    name="isCopayFixed"
                                                    value={insurance.isCopayFixed}
                                                    labelPlacement="end"
                                                    onChange={handleRadioChange}
                                                    options={copayTypeOptions}
                                                />
                                            </Grid>
                                            <Grid item xs={11} sm={3} md={3} lg={3} xl={3}>

                                                <InputPaymentField
                                                    id="copay"
                                                    name="copay"
                                                    placeholder=""
                                                    value={insurance.copay}
                                                    onChange={handleChange}
                                                    MaxLength={insurance.isCopayFixed ? "15" : "2"}

                                                />
                                            </Grid>
                                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <span style={{ fontSize: "16px", marginLeft: "7px", lineHeight: "34px" }}>{insurance.isCopayFixed ? "$" : "%"}</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12}>
                                        <Label title="Notes" size={2} isTextAreaInput={true} />
                                        <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                            <TextareaField
                                                rowsMin={5}
                                                MaxLength="2000"
                                                id="notes"
                                                name="notes"
                                                placeholder="Notes"
                                                value={insurance.notes}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            {/* <div className={classes.footerRight}> */}
                            <Grid container item direction="row" lg={12}>
                                <Grid container item direction="row" lg={12}>
                                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        {saveLoading ?
                                            <FormBtn id="loadingSave" > Save</FormBtn> :
                                            <FormBtn id="save" onClick={Save} disabled={!props.isEditable}> Save</FormBtn>
                                        }
                                        <FormBtn id="resetBtn" onClick={ClearFormValues}> Reset </FormBtn>
                                        {
                                            insurance.patientInsuranceId > 0 ?
                                                props.deleteLoading ?
                                                    <FormBtn id="loadingDelete" size="medium">Delete</FormBtn> :
                                                    <FormBtn id="delete" onClick={() => deleteRecord()} size="medium" disabled={!props.isEditable}>Delete</FormBtn>
                                                : null
                                        }

                                        {insurance.patientInsuranceId > 0 ?
                                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                        }
                                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    autoHideDuration={messageProps.messagePropsDuration}
                    open={messageProps.messagePropsState}
                    onClose={closeMessageDialog}
                    TransitionComponent={Slide}
                    style={{ zIndex: "9999999" }}
                >
                    <Alert variant="filled" severity={messageProps.messagePropsSeverity}>
                        <AlertTitle>{messageProps.messagePropsTitle}</AlertTitle>
                        {messageProps.messagePropsMessage}
                    </Alert>
                </Snackbar>
            </Dialog>
            <LogDialog
                code="patientinsurance"
                id={insurance.patientInsuranceId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => console.log('delete')}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            {checkEligibilityDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={checkEligibilityDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontentTwo}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Check Eligibility {props.openEligibilityId}</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeEligibility}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Eligibility dataId={props.openEligibilityId} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
        </>
    )

}
export default NewInsuranceDialog