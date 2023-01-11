import React, { useState, useEffect } from "react";
import {
    Grid,
    FormLabel,
    Dialog,
    Divider,
    Typography,
    FormHelperText,
    Button,
    Tooltip,
    Tab,
    Tabs,
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactToPrint from "react-to-print";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withSnackbar } from "../../../../../../../components/Message/Alert";
import { FormGroupTitle, Label, FormBtn, FooterBtn, DraggableComponent, LinkS } from "../../../../../../../components/UiElements/UiElements";
import { InputBaseField, SelectField, CheckboxField, TextareaField, InputPaymentField } from "../../../../../../../components/InputField/InputField";
import SearchList from "../../../../../../../components/SearchList/SearchList";
import AddIcon from '../../../../../../../images/icons/add-icon.png';
import DeleteIcon from "../../../../../../../images//icons/trash.png";

import useStyles from '../styles';
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../components/ActionDialog/ActionDialog";
import { formatDate, formatCurrency } from '../../../../../../../components/Common/Extensions';
import { IsEditable } from '../../../../../../../Services/GetUserRolesRights';
import LogDialog from "../../../../../../../components/LogDialog/LogDialog";

function TemplateAccordion({ claimSuperBillId, saveBothTabs, ...props }) {

    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const [saveLoading, setSaveLoading] = useState(false);
    const [reRender, setReRender] = useState(0);
    const defaultAttributes = {
        claimSuperbillInstId: 0,
        claimSuperbillId: claimSuperBillId,
        statementCoverFromDate: '',
        statementCoverToDate: '',
        admissionDate: '',
        admissionTime: '',
        admissionType: '',
        admissionSource: '',
        dischargeHour: '',
        patientStatusCode: '',
        delayReasonCode: '',
        ppsDiagnosisGroup: '',
        releaseOfInformation: false,
        assignmentOfBenefits: false,
        providerAcceptAssignment: false,
        noReferralGiven: false,
        patientRefusedReferral: false,
        patientCurrUnderTreatment: false,
        patientReferredToOtherProvider: false,
        principalDiagnosis: '',
        admittingDiagnosis: '',
        poa: '',
        remarks: '',
        lstHealthDetail: []
    };
    const [state, setState] = useState(defaultAttributes);
    const [loadedState, setLoadedState] = useState(defaultAttributes);
    const [healthDetailList, setHealthDetailList] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        errorBillingStatus: false, errorClaimType: false, errorIcdCode: false, errorFeeSchedule: false,
        errorPos: false, errorTos: false, errorIsEmployment: false, errorisAutoAccident: false, errorOtherAccident: false, errorOrderingProvider: false,
        errorReferringProvider: false, errorBillingProfile: false, errorBillingProcedureLength: false, errorBillingDiagnosisLength: false, moveToElementId:''
    });
    const [admissiontype, setAdmissiontype] = useState([]);
    const [admissionsource, setAdmissionsource] = useState([]);
    const [delayReason, setDelayReason] = useState([]);
    const [patientStatus, setPatientStatus] = useState([]);
    const [healthInfoTypes, setHealthInfoTypes] = useState([]);

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    const [releaseInformation, SetReleaseInformation] = useState([
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
    ]);

    const [assignmentBenifits, SetAssignmentBenifits] = useState([
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
    ]);

    const [providerAssignment, SetProviderAssignment] = useState([
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
    ]);

    const [POAOptions, setPOAOptions] = useState([]);
    const [referGiven, setReferGiven] = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const [patientRefusedRefferal, setPatientRefusedRefferal] = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const [patientUnderTreatment, setPatientUnderTreatment] = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const [referToAnotherProvider, setReferToAnotherProvider] = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const createNewHealthInfo = () => {

        setHealthDetailList([...healthDetailList, {
            type: "",
            code: "",
            description: "",
            dateFrom: null,
            dateTo: null,
            amount: "",
            isDeleted: false
        }
        ]);
    }
    const handleCheckedChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleHealthDetailChange = (e, i) => {
        const { id, value, name } = e.target;
        var lst = [...healthDetailList];//[...healthDetailList.filter(o => o.isDeleted != true)];
        lst[i][name] = name == 'amount' ? parseFloat(value) : value;
        if (name == 'type') {
            lst[i]['code'] = '';
            //lst[i]['codeName'] = '';
        }

        setHealthDetailList(lst);
    };
    const handleBoolChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value == 'true' ? true : false
        }));
    }

    const handleSearchChange = (name, item, val) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: id,
            [val]: value
        }));
    }
    const handleDetailSearchChange = (name, item, val) => {
        const { id, value } = item;

        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }

        var lst = [...healthDetailList];
        lst[val][name] = id;
        lst[val]['description'] = value;

        setHealthDetailList(lst);
    }
    const handleHealthDetailNumberChange = (e, index) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
        const { name, value } = e.target;
        let lst = [...healthDetailList];
        lst[index][name] = parseFloat(value);
        setHealthDetailList(lst);
    };
    //const [isInsLoaded, setIsInsLoaded] = useState(false);
    useEffect(() => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['inst_claim_admission_type', 'inst_claim_admission_source'/*, 'inst_claim_delay_reason'*/,
                'inst_claim_patient_status', 'inst_poa', 'inst_health_info_type', 'DELAY_REASON']
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _admissionType = [];
                var _admissionSource = [];
                var _delayReason = [];
                var _patientStatus = [];
                var _poaList = [];
                var _healthInfoTypes = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'inst_claim_admission_type':
                            _admissionType.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'inst_claim_admission_source':
                            _admissionSource.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'inst_claim_patient_status':
                            _patientStatus.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'inst_poa':
                            _poaList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'inst_health_info_type':
                            _healthInfoTypes.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'DELAY_REASON':
                            _delayReason.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });
                setAdmissiontype(_admissionType);
                setAdmissionsource(_admissionSource);
                setDelayReason(_delayReason);
                setPatientStatus(_patientStatus);
                setPOAOptions(_poaList);
                setHealthInfoTypes(_healthInfoTypes);
            }

        })
        if (claimSuperBillId > 0) {
            loadInstClaimData();
        }
    }, []);
    const loadInstClaimData = () => {

        PostDataAPI('claim/getClaimSuperBillInst', claimSuperBillId).then((result) => {
            if (result.success && result.data != null) {
                //result.data = handleFormat(result.data);
                result.data.statementCoverFromDate = result.data.statementCoverFromDate ? result.data.statementCoverFromDate.split("T")[0] : '';
                result.data.statementCoverToDate = result.data.statementCoverToDate ? result.data.statementCoverToDate.split("T")[0] : '';
                result.data.admissionDate = result.data.admissionDate ? result.data.admissionDate.split("T")[0] : '';
                result.data.procedureDate = result.data.procedureDate ? result.data.procedureDate.split("T")[0] : null;
                setState(result.data);
                setLoadedState(result.data);
                if (result.data.lstHealthDetail && result.data.lstHealthDetail.length > 0) {
                    result.data.lstHealthDetail.forEach(item => {
                        item.dateFrom = item.dateFrom ? item.dateFrom.split("T")[0] : null;
                        item.dateTo = item.dateTo ? item.dateTo.split("T")[0] : null;
                    });
                    setHealthDetailList(result.data.lstHealthDetail);
                }
                setState(result.data);
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);

        })

    }
    const DeleteInformationLitem = (listindex) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = healthDetailList.map((item, i) => i == listindex ? { ...item, isDeleted: true } : item);
            setHealthDetailList(updatedList);
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
    const resetForm = () => {
        if (state.claimSuperbillInstId > 0) {
            setState(loadedState);
            if (loadedState.lstHealthDetail && loadedState.lstHealthDetail.length > 0) {
                let lstDetail = loadedState.lstHealthDetail;
                lstDetail.forEach(item => {
                    item.dateFrom = item.dateFrom ? item.dateFrom.split("T")[0] : null;
                    item.dateTo = item.dateTo ? item.dateTo.split("T")[0] : null;
                });
                setHealthDetailList(lstDetail);
            }
        }
        else {
            setState(defaultAttributes);
            setHealthDetailList([]);
        }
    }
    const Save = e => {
        let errorList = [];
        ValidateClaimInst(errorList);
         debugger;
        const element = document.getElementById(errorMessages.moveToElementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            element.focus();
        }
        if (errorList.length < 1) {

            healthDetailList.forEach(item => {
                item.dateFrom = item.dateFrom == '' ? null : item.dateFrom;
                item.dateTo = item.dateTo == '' ? null : item.dateTo;
                item.amount = item.amount == '' ? null : item.amount;
            });
            state.lstHealthDetail = healthDetailList;

            setSaveLoading(true);
            state.claimSuperbillId = parseInt(state.claimSuperbillId);
            state.admissionDate = state.admissionDate == '' ? null : state.admissionDate;
            if (state.claimSuperbillId == '0' || !state.claimSuperbillId > 0) {
                saveBothTabs(state);
            }
            else {
                let method = "claim/addClaimSuperBillInst";

                PostDataAPI(method, state, true).then((result) => {
                    if (result.success == true) {
                        setErrorMessages([]);
                        if (result.success && result.data != null) {
                            showMessage("Success", "Claim info saved successfully.", "success", 3000);
                            result.data.statementCoverFromDate = result.data.statementCoverFromDate ? result.data.statementCoverFromDate.split("T")[0] : '';
                            result.data.statementCoverToDate = result.data.statementCoverToDate ? result.data.statementCoverToDate.split("T")[0] : '';
                            result.data.admissionDate = result.data.admissionDate ? result.data.admissionDate.split("T")[0] : '';
                            result.data.procedureDate = result.data.procedureDate ? result.data.procedureDate.split("T")[0] : null;
                            setState(result.data);
                            setLoadedState(result.data);
                            if (result.data.lstHealthDetail && result.data.lstHealthDetail.length > 0) {
                                result.data.lstHealthDetail.forEach(item => {
                                    item.dateFrom = item.dateFrom ? item.dateFrom.split("T")[0] : null;
                                    item.dateTo = item.dateTo ? item.dateTo.split("T")[0] : null;
                                });
                                setHealthDetailList(result.data.lstHealthDetail);
                            }
                            //setHealthDetailList(result.data.lstHealthDetail);
                        }

                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                    }
                    setSaveLoading(false);
                })
            }
        }

    };
    function setMoveToElementId(elementId) {
       
        if (!errorMessages.moveToElementId) {
            setErrorMessages(prevState => ({
                ...prevState,
                moveToElementId: ''
            }));
        }
        if (errorMessages.moveToElementId.length <= 0) {
            errorMessages.moveToElementId = elementId;
        }
    }
    const ValidateClaimInst = (errorList) => {


        if (!state.statementCoverFromDate) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorStatementCoverFromDate: true
            }));
            errorList.push(true);
            setMoveToElementId('statementCoverFromDate')
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatementCoverFromDate: false
            }));
        }

        if (!state.statementCoverToDate) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorStatementCoverToDate: true
            }));

            errorList.push(true);
            setMoveToElementId('statementCoverToDate')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatementCoverToDate: false
            }));
        }

        if (state.statementCoverFromDate && state.statementCoverToDate && state.statementCoverFromDate > state.statementCoverToDate) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidCoverToDate: true
            }));

            errorList.push(true);
            setMoveToElementId('statementCoverToDate')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidCoverToDate: false
            }));
        }


        if (!state.admissionType) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorAdmissionType: true
            }));

            errorList.push(true);
            setMoveToElementId('admissionType')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAdmissionType: false
            }));
        }
        if (!state.patientStatusCode) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientStatusCode: true
            }));

            errorList.push(true);
            setMoveToElementId('patientStatusCode')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientStatusCode: false
            }));
        }
        if (!state.principalDiagnosis) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPrincipalDiagnosis: true
            }));

            errorList.push(true);
            setMoveToElementId('principalDiagnosisError')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrincipalDiagnosis: false
            }));
        }
        //Health detail list validation
        if (healthDetailList.filter(o => o.isDeleted != true).some(a => !a.code || a.code == '' || !a.type || a.type == '')) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthDetail: true
            }));

            errorList.push(true);
            setMoveToElementId('errorHealthDetailList')

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthDetail: false
            }));
        }

    }

    return (
        <>
            <Grid container direction="row" lg={12} className={classes.formPrintContainer} >

                <FormGroupTitle>Claim Information</FormGroupTitle>

                <Grid container direction="row" lg={12}>
                    <Label title="Statement Cover From Date" size={2} mandatory={true} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            type="date"
                            id="statementCoverFromDate"
                            name="statementCoverFromDate"
                            value={state.statementCoverFromDate}
                            onChange={handleChange}

                        />
                        {errorMessages.errorStatementCoverFromDate && !state.statementCoverFromDate ? (<FormHelperText style={{ color: "red" }} >
                            Please enter statement from date
                        </FormHelperText>) : ('')}
                    </Grid>

                    <Label title="Statement Cover To Date" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            type="date"
                            id="statementCoverToDate"
                            name="statementCoverToDate"
                            value={state.statementCoverToDate}
                            onChange={handleChange}
                        />
                        {errorMessages.errorStatementCoverToDate && !state.statementCoverToDate ? (<FormHelperText style={{ color: "red" }} >
                            Please enter statement to date
                        </FormHelperText>) : ('')}
                        {errorMessages.errorInvalidCoverToDate && state.statementCoverFromDate > state.statementCoverToDate ? (<FormHelperText style={{ color: "red" }} >
                            Statement to date can not be earlier than from date
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Admission Date" size={2} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            type="date"
                            id="admissionDate"
                            name="admissionDate"
                            value={state.admissionDate}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Label title="Admission Hours" size={2} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            type="time"
                            id="admissionTime"
                            name="admissionTime"
                            value={state.admissionTime}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Admission Type" size={2} mandatory={true} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>

                        <SelectField
                            id="admissionType"
                            name="admissionType"
                            options={admissiontype}
                            onChange={handleChange}
                            value={state.admissionType}
                            placeholder="Select Type"
                        />
                        {errorMessages.errorAdmissionType && !state.admissionType ? (<FormHelperText style={{ color: "red" }} >
                            Please select admission type
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Admission Source" size={2} />
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>

                        <SelectField
                            id="admissionSource"
                            name="admissionSource"
                            options={admissionsource}
                            value={state.admissionSource}
                            onChange={handleChange}
                            placeholder="Select Source"
                        />
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Discharge Hour" size={2} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            type="time"
                            id="dischargeHour"
                            name="dischargeHour"
                            value={state.dischargeHour}
                            onChange={handleChange}
                        />
                        {/*<SelectField*/}
                        {/*    id="dischargeHour"*/}
                        {/*    name="dischargeHour"*/}
                        {/*    value={state.dischargeHour}*/}
                        {/*    options={admissionhour}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    placeholder="Select Hours"*/}
                        {/*/>*/}
                    </Grid>

                    <Label title="Patient Status" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>

                        <SelectField
                            id="patientStatusCode"
                            name="patientStatusCode"
                            value={state.patientStatusCode}
                            options={patientStatus}
                            onChange={handleChange}
                            placeholder="Select Status"
                        />
                        {errorMessages.errorPatientStatusCode && !state.patientStatusCode ? (<FormHelperText style={{ color: "red" }} >
                            Please select patient status
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Delay Reason Code" size={2} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="delayReasonCode"
                            name="delayReasonCode"
                            value={state.delayReasonCode}
                            options={delayReason}
                            onChange={handleChange}
                            placeholder="Select Delay Reason"
                        />
                    </Grid>

                    <Label title="PPS Diagnosis Related Group" size={2} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>

                        <InputBaseField
                            type="text"
                            id="ppsDiagnosisGroup"
                            name="ppsDiagnosisGroup"
                            value={state.ppsDiagnosisGroup}
                            onChange={handleChange}
                            MaxLength={200}

                        />

                    </Grid>

                </Grid>

                <FormGroupTitle>Assignment of Benifits</FormGroupTitle>
                <Grid container direction="row" lg={12}>
                    <Label title="Release of Information" size={2} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="releaseOfInformation"
                            name="releaseOfInformation"
                            value={state.releaseOfInformation}
                            options={releaseInformation}
                            onChange={handleBoolChange}
                            placeholder="Select Release of Information"
                        />
                    </Grid>

                    <Label title="Assignment of Benifits" size={2} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>

                        <SelectField
                            id="assignmentOfBenefits"
                            name="assignmentOfBenefits"
                            value={state.assignmentOfBenefits}
                            options={assignmentBenifits}
                            onChange={handleBoolChange}
                            placeholder="Select Assignment Benefit"
                        />

                    </Grid>
                </Grid>

                <Grid container direction="row" lg={12}>
                    <Label title="Provider Accept Assignment" size={2} />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="providerAcceptAssignment"
                            name="providerAcceptAssignment"
                            value={state.providerAcceptAssignment}
                            options={providerAssignment}
                            onChange={handleBoolChange}
                            placeholder="Select Provider Assignment"
                        />
                    </Grid>
                </Grid>
                <FormGroupTitle>EPSDT Certification</FormGroupTitle>
                <Grid container direction="row" lg={12}>
                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <CheckboxField
                            color="primary"
                            id="noReferralGiven"
                            name="noReferralGiven"
                            value={state.noReferralGiven}
                            checked={state.noReferralGiven}
                            options={referGiven}
                            onChange={handleCheckedChange}
                            label="No Referral Given"
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <CheckboxField
                            color="primary"
                            id="patientRefusedReferral"
                            name="patientRefusedReferral"
                            value={state.patientRefusedReferral}
                            checked={state.patientRefusedReferral}
                            options={patientRefusedRefferal}
                            onChange={handleCheckedChange}
                            label="Patient Refused Referral"
                        />
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>
                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <CheckboxField
                            color="primary"
                            id="patientCurrUnderTreatment"
                            name="patientCurrUnderTreatment"
                            value={state.patientCurrUnderTreatment}
                            checked={state.patientCurrUnderTreatment}
                            options={patientUnderTreatment}
                            onChange={handleCheckedChange}
                            label="Patient Currently Under Treatment"
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <CheckboxField
                            color="primary"
                            id="patientReferredToOtherProvider"
                            name="patientReferredToOtherProvider"
                            value={state.patientReferredToOtherProvider}
                            checked={state.patientReferredToOtherProvider}
                            options={referToAnotherProvider}
                            onChange={handleCheckedChange}
                            label="Patient Reffered To Another Provider"
                        />
                    </Grid>
                </Grid>
                <FormGroupTitle>Diagnosis</FormGroupTitle>
                <Grid container direction="row" lg={12}>
                    <Label title="Principal Diagnosis" size={2} mandatory={true} />
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <SearchList
                            id = "principalDiagnosis"
                            name="principalDiagnosis"
                            value={state.principalDiagnosis}
                            searchTerm={state.principalDiagnosisName}
                            code="diagnosis"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) => handleSearchChange(name, item)}
                            placeholderTitle="Search Principal Diagnosis"
                        />
                        {errorMessages.errorPrincipalDiagnosis && !state.principalDiagnosis ? (<FormHelperText id="principalDiagnosisError" style={{ color: "red" }} >
                            Please select principal diagnosis
                        </FormHelperText>) : ('')}
                    </Grid>
                    <Label title="POA" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <SelectField
                            id="pOA"
                            name="pOA"
                            value={state.pOA}
                            options={POAOptions}
                            onChange={handleChange}
                            placeholder="Select POA"
                        />
                    </Grid>

                </Grid>

                <Grid container direction="row" lg={12}>

                    <Label title="Admitting Diagnosis" size={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <SearchList
                            name="admittingDiagnosis"
                            value={state.admittingDiagnosis}
                            searchTerm={state.admittingDiagnosisName}
                            code="diagnosis"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) => handleSearchChange(name, item)}
                            placeholderTitle="Search Admitting Diagnosis"
                        />
                    </Grid>

                </Grid>

                <FormGroupTitle>Procedures</FormGroupTitle>
                <Grid container direction="row" lg={12}>
                    <Label title="Principal Procedure" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <SearchList
                            name="principalProcedure"
                            value={state.principalProcedure}
                            searchTerm={state.principalProcedureName}
                            code="CPT"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) => handleSearchChange(name, item)}
                            placeholderTitle="Search Principal Procedure"
                        />
                        {/*{errorMessages.errorPrincipalDiagnosis && !state.principalDiagnosis ? (<FormHelperText style={{ color: "red" }} >*/}
                        {/*    Please select principal diagnosis*/}
                        {/*</FormHelperText>) : ('')}*/}
                    </Grid>
                    <Label title="Procedure Date" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <InputBaseField
                            type="date"
                            id="procedureDate"
                            name="procedureDate"
                            value={state.procedureDate}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

                <FormGroupTitle>Health Information
                    <span style={{ fontWeight: "500" }}> (External Occurence, Occurence, Occurence Span, Value, Condition and Others) </span>
                </FormGroupTitle>

                <Grid container direction="row" >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {errorMessages.errorHealthDetail && healthDetailList.filter(o => o.isDeleted != true).some(a => !a.code || a.code == '' || !a.type || a.type == '') ? (<FormHelperText id= "errorHealthDetailList" style={{ color: "red" }} >
                            Please select type and code
                        </FormHelperText>) : ('')}
                        <table className={classes.iformationTable}>
                            <thead>
                                <tr align="center">
                                    <th>Type  </th>
                                    <th>Code</th>
                                    <th>Description </th>
                                    <th>Date From </th>
                                    <th>Date To</th>
                                    <th>Amount</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    healthDetailList.map((item, i) => {
                                        if (item.isDeleted == true) { return '' }
                                        else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <SelectField
                                                                id="type"
                                                                name="type"
                                                                value={item.type}
                                                                options={healthInfoTypes}
                                                                onChange={(e) => { handleHealthDetailChange(e, i) }}
                                                                placeholder="Select Type"
                                                            />
                                                        </td>
                                                        <td>
                                                            <SearchList
                                                                id="code"
                                                                name="code"
                                                                elemCode={i}
                                                                value={item.code}
                                                                searchTerm={item.code}
                                                                searchId={item.type}
                                                                code="get_inst_health_info_code"
                                                                apiUrl="ddl/loadItems"
                                                                onChangeValue={(name, item, elemCode) => handleDetailSearchChange(name, item, elemCode)}
                                                                placeholderTitle="Code"
                                                                reRender={reRender}
                                                            />
                                                        </td>
                                                        <td>
                                                            <InputBaseField
                                                                type="text"
                                                                id="description"
                                                                name="description"
                                                                onChange={(e) => { handleHealthDetailChange(e, i) }}
                                                                value={item.description}
                                                                placeholder="Write Description"
                                                                MaxLength={500}
                                                            />
                                                        </td>
                                                        <td>
                                                            <InputBaseField
                                                                type="date"
                                                                id="dateFrom"
                                                                name="dateFrom"
                                                                value={item.dateFrom}
                                                                onChange={(e) => { handleHealthDetailChange(e, i) }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <InputBaseField
                                                                type="date"
                                                                id="dateTo"
                                                                name="dateTo"
                                                                value={item.dateTo}
                                                                onChange={(e) => { handleHealthDetailChange(e, i) }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <InputPaymentField
                                                                id="amount"
                                                                name="amount"
                                                                placeholder="$0.00"
                                                                value={item.amount}
                                                                onChange={(e) => { handleHealthDetailNumberChange(e, i) }}
                                                                MaxLength={8}

                                                            />
                                                        </td>
                                                        {
                                                            isEditable ? <td>
                                                                <img onClick={() => DeleteInformationLitem(i)} id={i} src={DeleteIcon} className={classes.deleteIconIaction} />
                                                            </td> : ""
                                                        }


                                                    </tr>
                                                </>
                                            )
                                        }

                                    })
                                }

                                <tr>
                                    <td colSpan="7">
                                        <Button className={classes.addinformationlist} disabled={!isEditable} onClick={() => createNewHealthInfo()} > <img src={AddIcon} /> &nbsp; Add New</Button>
                                    </td>
                                </tr>

                            </tbody>


                        </table>
                    </Grid>
                </Grid>

                <FormGroupTitle>Remarks </FormGroupTitle>

                <Grid container direction="row" >
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <TextareaField
                            rowsMin={5}
                            placeholder="Remarks"
                            onChange={handleChange}
                            name="remarks"
                            value={state.remarks}
                            MaxLength="2000"
                        />


                    </Grid>
                </Grid>
            </Grid>


            <div className={classes.footer}>
                <FooterBtn className={classes.footerBtn}>
                    {
                        saveLoading ?
                            <FormBtn id="loadingSave" >Save </FormBtn> :
                            <FormBtn id="save" disabled={!isEditable} onClick={Save}>Save </FormBtn>
                    }
                    <FormBtn id={"resetBtn"} size="medium" disabled={!isEditable} onClick={resetForm}>Reset </FormBtn>
                    {claimSuperBillId > 0 ? <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn> : null}
                </FooterBtn>
            </div>
            <LogDialog
                code="claimsuperbill"
                id={claimSuperBillId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}

export default withSnackbar(TemplateAccordion)