import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { withSnackbar } from '../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    DialogTitle,
    FormHelperText
} from "@material-ui/core"
import { FooterBtn, FormBtn, FormGroupTitle, Label, DraggableComponent } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { InputBaseField, InputBaseFieldNumber, TextareaField, SelectField, RadioboxField, CheckboxField } from "../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../components/LogDialog/LogDialog";
import { Scrollbars } from "rc-scrollbars";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';

function ImmunizationForm({ dialogOpenClose, handleClose, handleSuccess, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const statusOptions = [
        {
            value: "Administrated",
            label: "Administrated",
            className: 'adjustLabels',
        },
        {
            value: "Historical",
            label: "Historical",
            className: 'adjustLabels',
        },
        {
            value: "Refused",
            label: "Refused",
            className: 'adjustLabels',
        },
    ];
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const [logdialogstate, setLogDialogState] = useState(false);
    const [state, setState] = useState({ status: "Administrated" });
    const [imunizationId, setImunizationId] = useState(props.imunizationId);
    const [patientId] = useState(parseInt(props.patientId));
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    //dropdown lists.
    const ImmunizationFormRef = useState({
        vaccineRef: "", doseRef: "", unitRef: "", administratedByRef: "", administratedDateRef: "",
        orderedByRef: "", locationRef: "", manufactureListRef: "", lotNumberRef: "", expirationDateRef: "",
    });
    const [routList, setRoutList] = useState([]);
    const [bodySiteList, setBodySiteList] = useState([]);
    const [fundingSrcList, setFundingSrcList] = useState([]);
    const [refuseReasonList, setRefuseReasonList] = useState([]);
    const [docTypeList, setDocTypeList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const [manufactureList, setManufactureList] = useState([]);

    const [adminByList, setAdminByList] = useState([]);
    const [consentFormList, setConsentFormList] = useState([]);
    const [locationList, setLocationList] = useState([]);

    const [reactionList, setReactionList] = useState([]);
    const [selfpayList, setSelfPayList] = useState([]);
    let userInfo = JSON.parse(GetUserInfo()).user;
    //end dropdown lists

    const [errorMessages, setErrorMessages] = useState({
        vaccine: false,
        dose: false,
        immUnitCode: false,
        admDatetime: false,
        orderedBy: false,
        locationId: false,
        manufacturer: false,
        lotNumber: false,
        refusalDate: false,
        refuseReasonCode: false,
        administratedBy: false,
        expirationDate: false
    });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleTypeChange = (e) => {
        const { name, value } = e.target;
        setErrorMessages({});
        initializeState();

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleVaccineChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "vaccine": value
        }));
    }

    const handleOrderByChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "orderedByName": value
        }));
    }

    const handleAdminByChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "adminByName": value
        }));
    }

    const handleChkboxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    }
    const initializeState = () => {

        setState({
            imunizationId: parseInt(imunizationId) > 0 ? imunizationId : null,
            vaccine: "",
            patientId: patientId,
            encounterId: encounterId,
            scheduleCode: "",
            dose: "",
            immUnitCode: "",
            routeCode: "",
            bodySiteCode: "",
            admDatetime: "",
            orderedBy: "",
            locationId: userInfo.primaryLocationId,
            manufacturer: "",
            lotNumber: "",
            expirationDate: "",
            fundingSource: "",
            fundingProgram: "",
            immDocumentType: "",
            visPresentedDate: "",
            status: "Administrated",
            refusalDate: null,
            refuseReasonCode: "",
            comments: "",
            vaccineType: "",
            consentFormId: null,
            histVaccineSourceCode: "",
            administratedBy: null,
            createDate: new Date(),
            adminByName: "",
            orderedByName: ""
        })
    }

    const resetForm = () => {

        if (imunizationId > 0) {
            loadData();
        }
        else {
            initializeState();
        }
    }

    const loadData = () => {
        PostDataAPI("patient/imunization/get", imunizationId).then((result) => {

            if (result.success && result.data != null) {
                //if (result.data.admDatetime)
                //    result.data.admDatetime = result.data.admDatetime.split('T')[0];
                handleDatesOnLoad(result.data);
                setState(result.data);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }

    useEffect(() => {
        debugger;
        console.log(props);
        resetForm();

        var params = {
            code: "DDL_List_Item",
            parameters: ['vaccine_route_code', 'vaccine_body_site_code', 'vaccine_funding_source',
                'vaccine_refuse_reason_code', 'imm_status_code', 'imm_document_type',
                'medication_unit_code', 'vaccine_source', 'vaccine_manufacturer', 'selfpay_restriction', 'vaccine_reaction_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _routList = [];
                var _bodySrcList = [];
                var _fundingSrcList = [];

                var _refuseReasonList = [];
                var _doctypeList = [];
                var _unitList = [];
                var _sourceList = [];
                var _manufactureList = [];
                var _selfPayList = [];
                var _reactionCodeList = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'vaccine_route_code':
                            _routList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'vaccine_body_site_code':
                            _bodySrcList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'vaccine_funding_source':
                            _fundingSrcList.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'vaccine_refuse_reason_code':
                            _refuseReasonList.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'imm_document_type':
                            _doctypeList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'medication_unit_code':
                            _unitList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'vaccine_source':
                            _sourceList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'vaccine_manufacturer':
                            _manufactureList.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'selfpay_restriction':
                            _selfPayList.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'vaccine_reaction_code':
                            _reactionCodeList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });
                setRoutList(_routList);
                setBodySiteList(_bodySrcList);
                setFundingSrcList(_fundingSrcList);
                setRefuseReasonList(_refuseReasonList);
                setDocTypeList(_doctypeList);
                setUnitList(_unitList);
                setSourceList(_sourceList);
                setManufactureList(_manufactureList);
                setSelfPayList(_selfPayList);
                setReactionList(_reactionCodeList);
            }

            //params = {
            //    code: "imunization_admin_by",
            //    parameters: ['']
            //};
            //PostDataAPI("ddl/loadItems", params).then((result) => {

            //    if (result.success && result.data != null) {
            //        setAdminByList(
            //            result.data.map((item, i) => {
            //                return { value: item.text1, label: item.text2 };
            //            }));
            //    }
            //});
            params = {
                code: "imunization_consent_forms",
                parameters: ['']
            };
            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {
                    setConsentFormList(
                        result.data.map((item, i) => {
                            return { value: item.text1, label: item.text2 };
                        }));
                }
            });
            params = {
                code: "imunization_location",
                parameters: ['']
            };
            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {
                    setLocationList(
                        result.data.map((item, i) => {
                            return { value: item.text1, label: item.text2 };
                        }));
                }
            });

        });
    }, [dialogOpenClose]);

    function handleDatesOnLoad(dataset) {
        dataset.expirationDate = dataset.expirationDate ? dataset.expirationDate.split('T')[0] : "";
        dataset.visPresentedDate = dataset.visPresentedDate ? dataset.visPresentedDate.split('T')[0] : "";
        dataset.refusalDate = dataset.refusalDate ? dataset.refusalDate.split('T')[0] : "";

    }

    const save = () => {
        var validated = true;
        state.dose = isNaN(state.dose) ? null : parseFloat(state.dose);
        state.locationId = isNaN(state.locationId) ? null : parseFloat(state.locationId);
        state.administratedBy = isNaN(state.administratedBy) ? null : parseFloat(state.administratedBy);
        //state.orderedBy = isNaN(state.orderedBy) ? null : parseFloat(state.orderedBy);
        state.consentFormId = isNaN(state.consentFormId) ? null : parseInt(state.consentFormId);

        if (!state.vaccine || state.vaccine.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                vaccine: true
            }));
            validated = false;
        }

        if (state.status.toLowerCase() == "administrated") {

            if (!state.expirationDate || state.expirationDate.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    expirationDate: true
                }));
                validated = false;
                // ImmunizationFormRef.expirationDateRef.focus();
            }
            //if (!state.lotNumber || state.lotNumber.trim() == "") {
            //    setErrorMessages(prevState => ({
            //        ...prevState,
            //        lotNumber: true
            //    }));
            //    validated = false;
            //    //ImmunizationFormRef.lotNumberRef.focus();
            //}
            //if (!state.manufacturer || state.manufacturer.trim() == "") {
            //    setErrorMessages(prevState => ({
            //        ...prevState,
            //        manufacturer: true
            //    }));
            //    validated = false;
            //    // ImmunizationFormRef.manufactureListRef.focus();
            //}
            if (!state.locationId || parseInt(state.locationId) < 1) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    locationId: true
                }));
                validated = false;
                // ImmunizationFormRef.locationRef.focus();
            }
            if (!state.admDatetime || state.admDatetime.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    admDatetime: true
                }));
                validated = false;
                // ImmunizationFormRef.administratedDateRef.focus();
            }
            if (!state.immUnitCode || state.immUnitCode.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    immUnitCode: true
                }));
                validated = false;
                //  ImmunizationFormRef.unitRef.focus();
            }
            if (!state.dose || parseInt(state.dose) < 1) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    dose: true
                }));
                validated = false;
                // ImmunizationFormRef.doseRef.focus();
            }
            if (!state.administratedBy || parseInt(state.administratedBy) < 1) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    administratedBy: true
                }));
                validated = false;
            }
            //if (!state.orderedBy || state.orderedBy.trim() == "") {
            //    setErrorMessages(prevState => ({
            //        ...prevState,
            //        orderedBy: true
            //    }));
            //    validated = false;
            //}
            if (new Date(state.admDatetime ? state.admDatetime.split('T')[0] : null) > new Date(state.expirationDate)) {
                showMessage("Error", "administrated date should be less then expiry date", "error", 8000);
                validated = false;
            }

        }
        else if (state.status.toLowerCase() == "historical") {
            if (!state.admDatetime || state.admDatetime.trim() == "")
                state.admDatetime = null;

            if (!state.histVaccineSourceCode || state.histVaccineSourceCode.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    histVaccineSourceCode: true
                }));
                validated = false;
            }
        }
        else if (state.status.toLowerCase() == "refused") {
            state.admDatetime = new Date();
            if (!state.refuseReasonCode || state.refuseReasonCode.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    refuseReasonCode: true
                }));
                validated = false;
            }
        }

        if (validated == false)
            return;

        var method = "patient/imunization/add";
        if (imunizationId > 0)
            method = "patient/imunization/update";

        state.visPresentedDate = state.visPresentedDate === "" ? null : state.visPresentedDate;
        state.expirationDate = state.expirationDate === "" ? null : state.expirationDate;
        state.refusalDate = state.refusalDate === "" ? null : state.refusalDate;
        state.encounterId = encounterId;


        console.log(state);
        setLoading(true);
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {
                setLoading(false);
                handleSuccess("Immunization saved successfully.");
                //if (imunizationId < 1) {
                //    setImunizationId(result.data.imunizationId);
                //    setState(prevState => ({
                //        ...prevState,
                //        "createdBy": result.data.createdBy
                //    }));
                //    setState(prevState => ({
                //        ...prevState,
                //        "imunizationId": result.data.imunizationId
                //    }));
                //}
                //showMessage("Success", "Immunization saved successfully.", "success", 3000);
                //setTimeout(() => { handleClose() }, 3000);
            }
            else {
                setLoading(false);
                showMessage("Error", result.message, "error", 8000);
            }
        })
    }

    function clear() {
        resetForm();
        setErrorMessages({});
    }
    function deleteRecord() {
        var data = {
            imunizationId: state.imunizationId
        }

        PostDataAPI('patient/imunization/delete', data, true).then((result) => {

            if (result.success == true) {
                setErrorMessages({});
                showMessage("Success", "Record deleted successfully.", "success", 2000);
                setImunizationId(0);
                initializeState();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
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

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: state.status === "Administrated" ? classes.dialogPaper : classes.smallDialogPaper }}
                open={dialogOpenClose}
                {...props} >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    <Grid lg={12} container direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <FormGroupTitle>{imunizationId > 0 ? 'Edit Immunization' : 'New Immunization'}</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogcontent}
                >
                    <Grid lg={12} container direction="row">
                        <Scrollbars autoHeight autoHeightMax={550} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                            <div className={classes.mainContent}>
                                <Grid lg={12} container direction="row">

                                    <Grid lg={12} container direction="row">

                                        <Label title="Status" size={2} />
                                        <Grid container justify="flex-start" alignItems="flex-start" xs={12} sm={7} md={7} lg={5} >
                                            <RadioboxField id="status" name="status" value={state.status} labelPlacement="end" onChange={handleTypeChange} options={statusOptions} />

                                        </Grid>

                                    </Grid>

                                    <Grid lg={12} container direction="row">

                                        <Label title="Vaccine" mandatory={true} size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={3} >
                                            <SearchList name="vaccineCode" value={state.vaccine} searchTerm={state.vaccine} code="vaccines"
                                                apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleVaccineChange(name, item)}
                                                placeholderTitle="Search vaccine" />
                                            {errorMessages.vaccine && (!state.vaccine || state.vaccine.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                Please select vaccine
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    {state.status.toLowerCase() === "administrated" ?
                                        <Grid lg={12} container direction="row">
                                            <Label title="Dose" mandatory={true} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <InputBaseFieldNumber
                                                    MaxLength='3'
                                                    MinValue={0}
                                                    MaxValue={1000}
                                                    name="dose"
                                                    placeholder="Dose"
                                                    value={state.dose}
                                                    type="number"
                                                    onChange={handleChange}
                                                // inputProps={{ ref: input => ImmunizationFormRef.doseRef = input }}
                                                />
                                                {errorMessages.dose && (!state.dose || parseInt(state.dose) < 1) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter dose
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                            <Label title="Unit" mandatory={true} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Unit"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    name="immUnitCode"
                                                    value={state.immUnitCode}
                                                    options={unitList}
                                                //inputProps={{ ref: input => ImmunizationFormRef.unitRef = input }}
                                                />
                                                {errorMessages.immUnitCode && (!state.immUnitCode || state.immUnitCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select unit
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>
                                        : ""
                                    }

                                    {state.status.toLowerCase() === "administrated" ?
                                        <Grid lg={12} container direction="row">
                                            <Label title="Route" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Route"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    name="routeCode"
                                                    value={state.routeCode}
                                                    options={routList}
                                                />
                                            </Grid>
                                            <Label title="Body Site" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Body Site"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.bodySiteCode}
                                                    name="bodySiteCode"
                                                    options={bodySiteList}
                                                />
                                            </Grid>
                                        </Grid>
                                        : ""
                                    }

                                    {state.status.toLowerCase() === "administrated" || state.status.toLowerCase() == "historical" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Administrated By" mandatory={state.status.toLowerCase() == "administrated"} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >

                                                <SearchList name="administratedBy" value={state.administratedBy} searchTerm={state.adminByName} code="imunization_admin_by"
                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleAdminByChange(name, item)}
                                                    placeholderTitle="Search Provider/Staff" />
                                                {errorMessages.administratedBy && (!state.administratedBy || parseInt(state.administratedBy) < 1) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select administrated by
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                            <Label title="Administrated Date" mandatory={state.status.toLowerCase() == "administrated"} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <InputBaseField
                                                    placeholder="Administrated Date"
                                                    onChange={handleChange}
                                                    name="admDatetime"
                                                    value={state.admDatetime}
                                                    MaxLength="20"
                                                    type="datetime-local"
                                                // inputProps={{ ref: input => ImmunizationFormRef.administratedDateRef = input }}
                                                />
                                                {errorMessages.admDatetime && (!state.admDatetime || state.admDatetime.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select administrated date
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>
                                        : ""}
                                    {state.status.toLowerCase() === "refused" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Refusal Reason" mandatory={true} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Refusal Reason"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.refuseReasonCode}
                                                    name="refuseReasonCode"
                                                    options={refuseReasonList}
                                                />
                                                {errorMessages.refuseReasonCode && (!state.refuseReasonCode || state.refuseReasonCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select refusal reason
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>
                                        : ""}

                                    {state.status.toLowerCase() === "refused" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Refusal Date" mandatory={false} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <InputBaseField
                                                    placeholder="Refusal Date"
                                                    disableUnderline
                                                    type="date"
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.refusalDate}
                                                    name="refusalDate"
                                                />
                                                {errorMessages.refusalDate && (!state.refusalDate || state.refusalDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select refusal date
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>
                                        : ""}

                                    <Grid lg={12} container direction="row">

                                        {state.status.toLowerCase() === "administrated" ?
                                            <>
                                                <Label title="Ordered By" size={2} />

                                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                                    <InputBaseField
                                                        name="orderedBy"
                                                        placeholder="Ordered By"
                                                        value={state.orderedBy}
                                                        type="text"
                                                        onChange={handleChange}
                                                    />
                                                    {/*{errorMessages.orderedBy && (!state.orderedBy || parseInt(state.orderedBy) < 1) ? (<FormHelperText style={{ color: "red" }} >*/}
                                                    {/*    Please enter Ordered By*/}
                                                    {/*</FormHelperText>) : ('')}*/}
                                                </Grid>
                                            </> : ""
                                        }
                                        <Label title="Location" mandatory={state.status.toLowerCase() == "administrated"} size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={3} >
                                            <SelectField
                                                placeholder="Select Location"
                                                disableUnderline
                                                className={classes.baseInput}
                                                onChange={handleChange}
                                                value={state.locationId}
                                                name="locationId"
                                                options={locationList}
                                            // inputProps={{ ref: input => ImmunizationFormRef.locationRef = input }}
                                            />
                                            {errorMessages.locationId && (!state.locationId || parseInt(state.locationId) < 1) ? (<FormHelperText style={{ color: "red" }} >
                                                Please select location
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    {state.status.toLowerCase() === "administrated" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Manufacturer" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Manufacturer"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.manufacturer}
                                                    name="manufacturer"
                                                    options={manufactureList}
                                                //inputProps={{ ref: input => ImmunizationFormRef.manufactureListRef = input }}
                                                />

                                            </Grid>
                                            <Label title="Lot #" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <InputBaseField
                                                    placeholder="Lot Number"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.lotNumber}
                                                    name="lotNumber"
                                                    MaxLength={"10"}
                                                // inputProps={{ ref: input => ImmunizationFormRef.lotNumberRef = input }}
                                                />

                                            </Grid>

                                        </Grid>
                                        : ""}
                                    {state.status.toLowerCase() === "administrated" || state.status.toLowerCase() === "historical" ?
                                        <Grid lg={12} container direction="row">
                                            {
                                                state.status.toLowerCase() == "administrated" ?
                                                    <>
                                                        <Label title="Expiry Date" mandatory={true} size={2} />
                                                        <Grid item xs={12} sm={4} md={4} lg={3} >
                                                            <InputBaseField
                                                                placeholder="Expiry Date"
                                                                disableUnderline
                                                                type="date"
                                                                className={classes.baseInput}
                                                                onChange={handleChange}
                                                                value={state.expirationDate}
                                                                name="expirationDate"
                                                            //inputProps={{ ref: input => ImmunizationFormRef.expirationDateRef = input }}
                                                            />
                                                            {errorMessages.expirationDate && (!state.expirationDate || state.expirationDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                                Please select expiry date
                                                            </FormHelperText>) : ('')}
                                                        </Grid>
                                                    </> : null
                                            }
                                            <Label title="Partially Administrated" mandatory={false} size={2} />


                                            <Grid item xs={12} sm={4} md={4} lg={3} >

                                                <CheckboxField
                                                    color="primary"
                                                    name="partiallyAdmin"
                                                    label=""
                                                    checked={state.partiallyAdmin ? true : false}
                                                    onChange={handleChkboxChange}
                                                />

                                            </Grid>
                                        </Grid>
                                        : ""}

                                    {state.status.toLowerCase() == "historical" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Source" mandatory={true} size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Source"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.histVaccineSourceCode}
                                                    name="histVaccineSourceCode"
                                                    options={sourceList}
                                                />
                                                {errorMessages.histVaccineSourceCode && (!state.histVaccineSourceCode || state.histVaccineSourceCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select source
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>
                                        : ""}

                                    {state.status.toLowerCase() === "administrated" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Funding Source" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Funding Source"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.fundingSource}
                                                    name="fundingSource"
                                                    options={fundingSrcList}
                                                />

                                            </Grid>
                                            <Label title="Funding Program" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Funding Program"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.fundingProgram}
                                                    name="fundingProgram"
                                                    options={fundingSrcList}

                                                />
                                            </Grid>

                                        </Grid>
                                        : ""}

                                    {state.status.toLowerCase() === "administrated" ?
                                        <Grid lg={12} container direction="row">

                                            <Label title="Document Type" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <SelectField
                                                    placeholder="Select Document Type"
                                                    disableUnderline
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.immDocumentType}
                                                    name="immDocumentType"
                                                    options={docTypeList}
                                                />

                                            </Grid>
                                            <Label title="VIS Date" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                                <InputBaseField
                                                    placeholder="VIS"
                                                    disableUnderline
                                                    type="date"
                                                    className={classes.baseInput}
                                                    onChange={handleChange}
                                                    value={state.visPresentedDate}
                                                    name="visPresentedDate"
                                                />
                                            </Grid>

                                        </Grid>
                                        : ""}

                                    {state.status.toLowerCase() === "administrated" ?
                                        <>
                                            <Grid lg={12} container direction="row">

                                                <Label title="Consent Form" size={2} />
                                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                                    <SelectField
                                                        placeholder="Select Consent Form"
                                                        className={classes.baseInput}
                                                        onChange={handleChange}
                                                        value={state.consentFormId}
                                                        name="consentFormId"
                                                        options={consentFormList}
                                                    />
                                                </Grid>

                                            </Grid>
                                            <Grid lg={12} container direction="row">
                                                <Label title="Reactions" size={2} />
                                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                                    <SelectField
                                                        placeholder="Select Reactions"
                                                        className={classes.baseInput}
                                                        onChange={handleChange}
                                                        value={state.reactionCode}
                                                        name="reactionCode"
                                                        options={reactionList}
                                                    />
                                                </Grid>
                                                <Label title="Self-pay Restriction" size={2} />
                                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                                    <SelectField
                                                        placeholder="Select Self-pay Restriction"
                                                        className={classes.baseInput}
                                                        onChange={handleChange}
                                                        value={state.selfpayRestriction}
                                                        name="selfpayRestriction"
                                                        options={selfpayList}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </>
                                        : ""}
                                    <Grid lg={12} container direction="row">

                                        <Label title="Comments" isTextAreaInput={true} size={2} />
                                        <Grid item xs={12} sm={8} md={8} lg={8} >
                                            <TextareaField
                                                rowsMin={5}
                                                placeholder="Comments"
                                                onChange={handleChange}
                                                name="comments"
                                                value={state.comments}
                                                MaxLength='500'
                                            />
                                        </Grid>

                                    </Grid>



                                </Grid>
                            </div>
                        </Scrollbars>
                        <Grid lg={12} container direction="row">

                            <Grid container alignItems="center" justify="center" xs={12} sm={12} md={12} lg={12} >
                                <FooterBtn className={classes.footerBtn}>
                                    <FormBtn id={"save"} disabled={!props.isEditable} onClick={save} size="medium">Save</FormBtn>
                                    {
                                        imunizationId > 0 ?
                                            <FormBtn id={"delete"} disabled={!props.isEditable} onClick={() => ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Immunization?", "confirm")} size="medium">
                                                Delete
                                            </FormBtn>
                                            : null
                                    }
                                    <FormBtn id={"resetBtn"} onClick={clear} size="medium" >Reset </FormBtn>
                                    {
                                        imunizationId > 0 ?
                                            <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                    }
                                    <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                                </FooterBtn>
                            </Grid>

                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            {logdialogstate ?
                <LogDialog
                    code="patImmunization"
                    id={imunizationId}
                    dialogOpenClose={logdialogstate}
                    onClose={(dialogstate) => setLogDialogState(dialogstate)}
                />
                : null
            }
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={deleteRecord}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}
export default withSnackbar(ImmunizationForm)