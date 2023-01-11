import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import AddIcon from '../../../../../../images/icons/add-icon.png';
import { Add as DelIcon } from '@material-ui/icons';
import Info from "../../../../../../images/icons/info.png"
import Settings from "../../../../../../images/icons/settings.png"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {printReport } from '../../../../../../components/Common/Extensions';

import {
    Button,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    InputBase,
    InputAdornment,
    FormHelperText,
    DialogTitle,
    Divider,
    Chip,
    ButtonGroup,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
} from "@material-ui/core";

import Avatar from '@material-ui/core/Avatar';

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { InputBaseField, InputBaseFieldNumber, CheckboxField, TextareaField, SelectField } from "../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import Scrollbars from "rc-scrollbars";
import SigBuilder from "../sigBuilder/SigBuilder";
import { Alert, AlertTitle } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RxList from "../rxList/RxList";

function MedicineSuammary({ handleClose, handleNext, handleBack, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const pharmaciesList = [
        {
            name: "ScriptDash Pharmacy",
            address: "1400 Tennessee St. San Franscisco, CA(415) 214-8611    Fax (415) 484-7058",
            info: "Retals  | Controled Substances"
        }
    ]
    const [state, setState] = useState(props.summaryInformationState);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [locationInformation, setLocationInformation] = useState([]);
    const [patientInformation, setPatientInformation] = useState([]);
    const [medicationId, setMedicationId] = useState(props.medicationId);
    const [prescribedProvider, setPrescribedProvider] = useState([]);
    const [delegatedProviderList, setDelegatedProviderList] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false, isPrinting: false, isSendRx: false });
    const [errorMessages, setErrorMessages] = useState({
        prescribingProviderId: false
    });

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    userInfo.fullName = userInfo.fullName.replaceAll(',', '');

    //Sig builder
    const [sigBuilderDialogOpenClose, setSigBuilderdialogOpenClose] = useState(false);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    useEffect(() => {


        var params = {
            code: "medication_provider_By_location_Info",
            parameters: [userInfo.userID.toString(), ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setLocationInformation(
                    result.data.map((item, i) => {
                        return { text1: item.text1, text2: item.text2, text3: item.text3, text4: item.text4 };
                    }));
            }

        })

        var params = {
            code: "medication_patient_Info",
            parameters: [state.patientId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPatientInformation(
                    result.data.map((itm, i) => {
                        return { text1: itm.text1, text2: itm.text2, text3: itm.text3, text4: itm.text4, text5: itm.text5, text6: itm.text6, text7: itm.text7, text8: itm.text8  };
                    }));
            }

        })

        var params = {
            code: "all_providers",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPrescribedProvider(
                    result.data.map((itm, i) => {
                        return { value: itm.id, label: itm.text1 + ' ' + itm.text2 };
                    }));
            }

        })

        if (userInfo.isProvider != true) {

             var params = {
            code: "get_providers_by_loggedIn_user",
            parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params, true).then((result) => {

                if (result.success && result.data != null) {

                    setDelegatedProviderList(
                        result.data.map((itm, i) => {
                            return { value: itm.id, label: itm.text1 + ' ' + itm.text2 };
                        }));
                }

            })
        }
        else
        {
           
            state.prescribingProviderId = parseInt(userInfo.loggedInUserID);
        }


    }, []);

    function setSigValues(values) {
        setState(prevState => ({
            ...prevState,
            sigNotes: values
        }));
    }
    //
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));

    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const handleProviderChange = (e) => {
        
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const handleChkboxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    }
    function onChangeSigValues(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            sigNotes: value
        }));
    }
    const handleDropDownButton = (e) => {
        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };
    const handleSave = (e) => {

        //setAnchorEl(anchorEl ? null : e.currentTarget);
        //if (e.currentTarget.dataset.id === 'save')
        Save();
        // onActionclick(dropDownActionId, e.currentTarget.dataset.id, docLink);
    }

    const handleErxClick = (e) => {
        //debugger

        var newmedlist = state.medicationList.map((item) => {

            if (item.MedPresType == 'Draft') {
                return { ...item, MedPresType: 'eRx' }
            }
            return item;

        });
        var newState = state.medicineList = newmedlist;
        Save(newState);


        //showMessage("Information", "Feature will be added soon", "info", 3000)
        // onActionclick(dropDownActionId, e.currentTarget.dataset.id, docLink);
    }
    const handlePrintClick = (e) => {
        SaveAndPrint();
    }

    const handleRxClick = (item) => {
        PostDataAPI("patient/medication/getDraftMedication", item.value).then((result) => {

            if (result.success && result.data != null) {

                var startDate = null;
                if (result.data.medicationList[0].startTakingDatetime) {
                    startDate = result.data.medicationList[0].startTakingDatetime.split('T')[0];
                }
                var stopDate;
                if (result.data.medicationList[0].stopTakingDatetime) {
                    stopDate = result.data.medicationList[0].stopTakingDatetime.split('T')[0];
                }
                var scriptDate;
                if (result.data.medicationList[0].scriptDate) {
                    stopDate = result.data.medicationList[0].scriptDate.split('T')[0];
                }
                var earlietFillDate;
                if (result.data.medicationList[0].earlietFillDate) {
                    earlietFillDate = result.data.medicationList[0].earlietFillDate.split('T')[0];
                }


                setState(prevState => ({
                    ...prevState,
                    sigNotes: result.data.medicationList[0].sigNotes,
                    rxnorm: result.data.medicationList[0].rxnorm,
                    drugName: result.data.medicationList[0].drugName,
                    dispenseQuantity: result.data.medicationList[0].dispenseQuantity,
                    refillNumber: result.data.medicationList[0].refillNumber,
                    appointmentId: result.data.medicationList[0].appointmentId,
                    unitCode: result.data.medicationList[0].unitCode,
                    daysSupply: result.data.medicationList[0].daysSupply,
                    maxDailyDose: result.data.medicationList[0].maxDailyDose,
                    refillAsNeeded: result.data.medicationList[0].refillAsNeeded,
                    brandMedicallyNecessary: result.data.medicationList[0].brandMedicallyNecessary,
                    substitutionAllowed: result.data.medicationList[0].substitutionAllowed,
                    pharmacyNotes: result.data.medicationList[0].pharmacyNotes,
                    dispenseAsWritten: result.data.medicationList[0].dispenseAsWritten,
                    internalNotes: result.data.medicationList[0].internalNotes,
                    //diagnosisId: result.data.diagnosisList[0].diagnosisId,
                    //diagnoseName: result.data.diagnosisList[0].diagnosisName,
                    selectedPharmacy: {
                        id: result.data.selectedPharmacy.id,
                        name: result.data.selectedPharmacy.name,
                        address: result.data.selectedPharmacy.address,
                        info: ""
                    },
                    supervisingProvider: result.data.supervisingProvider,

                    medicationId: result.data.medicationList[0].medicationId,
                    discontinueMedicine: result.data.medicationList[0].discontinueMedicine,
                    medicineComment: result.data.medicationList[0].medicineComment,

                    startTakingDatetime: startDate,
                    stopTakingDatetime: stopDate,
                    scriptDate: scriptDate,
                    earlietFillDate: earlietFillDate,
                    medicationStatusCode: result.data.medicationList[0].medicationStatusCode,

                }));
                setMedicationId(result.data.medicationList[0].medicationId);
                var _medicationList = [];
                _medicationList.push({ rxNorm: result.data.medicationList[0].rxnorm, drugName: result.data.medicationList[0].drugName, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

                setState(prevState => ({
                    ...prevState,
                    medicationList: _medicationList
                }));
                setState(prevState => ({
                    ...prevState,
                    drugName: '',
                    diagnosisId: '',
                    diagnoseName: ''
                }));
                //var _diagnosisList = [];

                //_diagnosisList.push({ diagnosisId: result.data.diagnosisList[0].diagnosisId, diagnosisName: result.data.diagnosisList[0].diagnosisName });
                if (result.data.diagnosisList) {
                    setState(prevState => ({
                        ...prevState,
                        diagnosisList: result.data.diagnosisList
                    }));




                }
                else {

                    setState(prevState => ({
                        ...prevState,
                        sigNotes: result.data.medicationList[0].sigNotes,
                        rxnorm: result.data.medicationList[0].rxnorm,
                        drugName: result.data.medicationList[0].drugName,
                        startTakingDatetime: result.data.medicationList[0].startTakingDatetime,
                    }));

                }


                console.log(state);
            }
        });

        //if (state.medicationList) {
        //    if (state.medicationList.filter(tmprm => tmprm.rxNorm === item.value.toString() && tmprm.drugName === item.label) == "") {
        //        state.medicationList.map((itm, i) => {

        //            _medicationList.push({ rxNorm: itm.rxNorm, drugName: itm.drugName, alert: itm.alert, warning: itm.warning });
        //        });

        //    }
        //    else {

        //        showMessage("Error", "Medicine already exists", "error", 8000);

        //        return;
        //    }

        //}




    }

    function deleteDiagnosisInfo(diagnosisId, rxNorm) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm", function () {


            state.diagnosisListInformation.map((itm, i) => {
                if (diagnosisId == itm.diagnosisId && rxNorm == itm.rxNorm)
                    state.diagnosisListInformation.splice(i, 1);
            });

            setState(prevState => ({
                ...prevState,
                diagnosisListInformation: state.diagnosisListInformation
            }));

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
    const medicationValidations = (validated) => {


        if (state.prescribingProviderId == "" || state.prescribingProviderId == null) {
            setErrorMessages(prevState => ({
                ...prevState,
                prescribingProviderId: true
            }));
            validated = false;
        }


        return validated;

    }

    const SaveAndPrint = () => {
         //debugger
        var validated = true;
        validated = medicationValidations(validated);

        if (validated == false)
            return;

        setLoading({ isPrinting: true });

        var newmedlist = state.medicationList.map((item) => {
            if (item.MedPresType == 'Draft') {
                return { ...item, MedPresType: 'Print' }
            }
            return item;

        });

        var newState = state.medicineList = newmedlist;

        state.diagnosisList = state.diagnosisListInformation;
        var method = "patient/medication/addMedicationOrder";
        if (medicationId > 0) {
            method = "patient/medication/updateDraftMedication";
        }
        else {
            if (state.medicationList != null) {
                state.medicationList.map((itm, i) => {
                    if (itm.medicationID > 0) {
                        method = "patient/medication/updateDraftMedication";
                    }
                });

            }

        }
        if (state.appointmentId != null)
            state.appointmentId = parseInt(state.appointmentId);
        setLoading({ isSaving: true });
        if (newState != null) {

            state.medicationList = newState
        }
         state.medicationList.map((item, i) => {
             item.appointmentId = item.appointmentId ? parseInt(item.appointmentId) : null
             
             item.prescribingProviderId = parseInt(state.prescribingProviderId);
        });
        
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {
                setLoading({ isPrinting: false });
                openMedicationReportPrint(result.data.medicationList[0].medicationPrescriptionId);
                showMessage("Success", "Medication saved successfully.", "success", 3000);
                setLoading({ isSaving: false });
                setTimeout(function () { handleClose(); }, 500);

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isPrinting: false });
                setLoading({ isSaving: false });
            }
        })
    }

    function openMedicationReportPrint(prescriptionId) {
        var reportUrl = "%2freports%2fclinical%2fclinical_patient_prescription&rs:Command=Render&rc:Parameters=false";
        var _prescId = "&prescription_id=" + prescriptionId;
        var _parameters = _prescId;
        printReport(reportUrl, _parameters);
    }

    const Save = (newState) => {

        var validated = true;
        validated = medicationValidations(validated);

        if (validated == false)
            return;

        state.diagnosisList = state.diagnosisListInformation;
        var method = "patient/medication/addMedicationOrder";
        if (medicationId > 0) {
            method = "patient/medication/updateDraftMedication";
        }
        else
        {
            if (state.medicationList != null)
            {
                for(let i = 0 ; i < state.medicationList.length;i++)
                {
                    if (state.medicationList[i].medicationId > 0) {
                        method = "patient/medication/updateDraftMedication"; break;
                    }
                    else if (state.medicationList[i].medicationID > 0) {
                        method = "patient/medication/updateDraftMedication"; break;
                    }
                }

            }

        }
        if (state.appointmentId != null)
            state.appointmentId = parseInt(state.appointmentId);
        setLoading({ isSaving: true });
        if (newState != null) {

            state.medicationList = newState
        }
        state.medicationList.map((item, i) => {
            item.appointmentId = item.appointmentId? parseInt(item.appointmentId):null
            
            item.prescribingProviderId = parseInt(state.prescribingProviderId);
        });
        
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {

                showMessage("Success", "Medication saved successfully.", "success", 3000);
                setLoading({ isSaving: false });
                setTimeout(function () { handleClose(); }, 500);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isSaving: false });
            }
        })
    }

    return (
        <>
            <SigBuilder OpneClose={sigBuilderDialogOpenClose} handleClose={() => setSigBuilderdialogOpenClose(false)} onUpdate={(values) => setSigValues(values)} />

            <div className={classes.DialogContentLeftSide}>
                <RxList onClick={(item) => handleRxClick(item)} />

            </div>
            <div className={classes.DialogContentRightSide}>
                <div className={classes.box}>
                    <div className={classes.header}>
                        <FormGroupTitle>Summary</FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars style={{ height: "580px" }} >

                            <Grid lg={12} container direction="row">
                                <Grid container xs={12} sm={11} md={11} lg={10} >

                                    <ul className={classes.medicineList}>
                                        {
                                            state.medicationList ?

                                                state.medicationList.map((item, i) => {
                                                    return (
                                                        <li>
                                                            <span style={{ display: "block" }}>

                                                                <Typography className={classes.listItemName}><b>Rx: </b>{item.drugName}</Typography>

                                                                <Typography className={classes.listItemheading}><b>Associated Diagnosis:</b></Typography>

                                                                <Typography className={classes.listItemDescription}>
                                                                    {
                                                                        state.diagnosisListInformation ?

                                                                            state.diagnosisListInformation.filter(tmprm => tmprm.rxNorm == item.rxNorm).map((itm, l) => (

                                                                            <span style={{ display: "flex" }}>
                                                                                <Typography className={classes.listItemDescription2}>{itm.diagnosisName}</Typography>
                                                                                <span className={classes.listCrossButton} onClick={() => deleteDiagnosisInfo(itm.diagnosisId, item.rxNorm) }><DelIcon /></span>
                                                                            </span>

                                                                                // <Chip
                                                                                //     classes={{ root: classes.chipRoot }}
                                                                                //     label={itm.diagnosisName}
                                                                                //     size="small"
                                                                                //     onDelete={() => deleteDiagnosisInfo(itm.diagnosisId, item.rxNorm)}
                                                                                //     avatar={<Avatar alt="Natacha" src={AddIcon} />}
                                                                                // />
                                                                            ))
                                                                            : null
                                                                    }
                                                                </Typography>

                                                                <Grid container xs={12} sm={12} md={12} lg={12} direction="row" alignItems="baseline">
                                                                    
                                                                    <Label style={{fontWeight: "bold"}} title="Despense" size={2} />

                                                                    <Grid container xs={12} sm={2} md={2} lg={2} >
                                                                        <Typography className={classes.valueText}>{item.dispenseQuantity ? item.dispenseQuantity : ""} {item.unitCode ? item.unitCode : ""}</Typography>
                                                                    </Grid>

                                                                    <Label style={{fontWeight: "bold"}} title="Refills" size={2} />

                                                                    <Grid container xs={12} sm={2} md={2} lg={2} >
                                                                        <Typography className={classes.valueText}>{item.refillNumber ? item.refillNumber : ""} </Typography>
                                                                    </Grid>

                                                                    <Label style={{fontWeight: "bold"}} title="Script Date" size={2} />

                                                                    <Grid container xs={12} sm={2} md={2} lg={2} >
                                                                        <Typography className={classes.valueText}>{item.scriptDate ? new Date(item.scriptDate.split('T')[0]).toLocaleDateString() : ""}</Typography>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container xs={12} sm={12} md={12} lg={12} >

                                                                    <div style={{ margin: "-20px 0px 0px 35px", }}>
                                                                        <Typography className={classes.valueText}>This one is just test order. take no further action.</Typography>
                                                                        <Alert
                                                                            severity="error"
                                                                            classes={{ root: classes.alertRoot }} >
                                                                            {item.alert ? item.alert : 'No drug and allergy alerts triggered for this medication.'}
                                                                        </Alert>
                                                                        <Alert
                                                                            severity="warning"
                                                                            classes={{ root: classes.alertRoot }} >
                                                                            {item.warning?item.warning:'No active or valid coverage found.'}
                                                                        </Alert>
                                                                    </div>
                                                                </Grid>

                                                            </span>
                                                        </li>
                                                    )
                                                })
                                                : null
                                        }
                                    </ul>



                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                {
                                    state.selectedPharmacy && state.selectedPharmacy.name === "" || state.selectedPharmacy.name === null?
                                        <>
                                            <Grid item xs={2} sm={2} md={2} lg={2} />
                                            <Grid item xs={12} sm={9} md={9} lg={8} >
                                                <span className={classes.smartAddPhBtn} onClick={handleNext}><img src={AddIcon} alt="Add Pharmacy" />Add Pharmacy</span>
                                            </Grid>
                                        </>
                                        :
                                        <>
                                            <Label title="Pharmacy" size={2} />
                                            <Grid item xs={12} sm={9} md={9} lg={8} >
                                                <div className={classes.selectedPharmacy}>
                                                    <FormLabel className={classes.selectedPharmacyName}>{state.selectedPharmacy ? state.selectedPharmacy.name : ""}</FormLabel>
                                                    <Typography className={classes.pharmacyAddress}>
                                                        {state.selectedPharmacy ? state.selectedPharmacy.address : ""}
                                                    </Typography>
                                                    <Button size="small" className={classes.changePharmacyButton} onClick={handleNext}>Change</Button>
                                                    <Typography className={classes.pharmacyInfo}>{state.selectedPharmacy ? state.selectedPharmacy.info : ""}</Typography>
                                                </div>
                                            </Grid>
                                        </>
                                }
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Prescribing Provider" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    {userInfo.isProvider === true ?
                                        <>
                                            <Typography className={classes.valueText}>{userInfo.fullName}</Typography>
                                        </> : <>
                                            <SelectField
                                                placeholder="Select Provider"
                                                id="prescribingProviderId"
                                                name="prescribingProviderId"
                                                onChange={handleProviderChange}
                                                value={state.prescribingProviderId}
                                                options={delegatedProviderList}
                                            />
                                        </>
                                    }
                                    {errorMessages.prescribingProviderId && (!state.prescribingProviderId) ? (<FormHelperText style={{ color: "red" }} >
                                        Please select prescribing provider
                                    </FormHelperText>) : ('')}
                                  {/*  <Typography className={classes.valueText}>{userInfo.isProvider === true ? " " : " "} {userInfo.fullName}</Typography>*/}
                                </Grid>
                                <Label title="Supervising Provider" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Provider"
                                        id="supervisingProvider"
                                        name="supervisingProvider"
                                        onChange={handleChange}
                                        value={state.supervisingProvider}
                                        options={prescribedProvider}
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Prescribing Facility" size={2} />
                                <Grid item xs={12} sm={9} md={9} lg={8} >
                                    <div className={classes.selectedPharmacy}>
                                        <FormLabel className={classes.pharmacyName}>{locationInformation[0] ? locationInformation[0].text1 : ""}</FormLabel>
                                        <Typography className={classes.pharmacyAddress}>
                                            {locationInformation[0] ? locationInformation[0].text2 ? locationInformation[0].text2 : '' + '' + locationInformation[0].text4 ? locationInformation[0].text4 : "" + '' + locationInformation[0].text3 ? +', ' + locationInformation[0].text3 : "" : ""}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Patient" size={2} />
                                <Grid item xs={12} sm={9} md={9} lg={8} >
                                    <div className={classes.selectedPharmacy}>
                                        <FormLabel className={classes.pharmacyName}>{patientInformation[0] ? patientInformation[0].text1 : ""}{patientInformation[0] ? patientInformation[0].text2 ? ', '+patientInformation[0].text2 :"":""}{patientInformation[0] ?patientInformation[0].text3 ? ', ' + patientInformation[0].text3 : "" : ""}</FormLabel>
                                        <Typography className={classes.pharmacyAddress}>
                                            {patientInformation[0] ? patientInformation[0].text4 : ""}{patientInformation[0] ? patientInformation[0].text5 ? ', ' + patientInformation[0].text5 : "" : ""}{patientInformation[0] ? patientInformation[0].text6 ? ', ' + patientInformation[0].text6 : "" : ""}{patientInformation[0] ? patientInformation[0].text7 ? ', ' + patientInformation[0].text7 : "" : ""}{patientInformation[0] ? patientInformation[0].text8 ? ', ' + patientInformation[0].text8 : "" : ""}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>

                        </Scrollbars>

                    </div>
                    <div className={classes.footer}>
                        <Grid lg={12} container direction="row">
                            <Grid item xs={12} sm={11} md={11} lg={11} >
                                <FormBtn id="save" onClick={handleBack} size="medium" btnType="back" >Back</FormBtn>
                                <div className={classes.footerRight}>

                                    {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> :
                                        <FormBtn id="save" size="medium" onClick={handleSave}>Save</FormBtn>
                                    }

                                    {loading.isPrinting ? <FormBtn id={"loadingPrint"} size="medium">Printing</FormBtn> :
                                        <FormBtn id="print" size="medium" onClick={() => handlePrintClick()}>Print</FormBtn>
                                    }


                                    {loading.isSendRx ?
                                        <FormBtn
                                            id={"loadSenderx"}
                                            size="medium"
                                            btnType='erx'
                                        >Sending</FormBtn> :
                                        <FormBtn
                                            id={"senderx"}
                                            size="medium"
                                            btnType='erx'
                                            onClick={() => handleErxClick()}
                                        >Send eRx</FormBtn>
                                    }


                                    <FormBtn id={"reset"} onClick={handleClose} size="medium" >Cancel</FormBtn>
                                    {/*<FormBtn id={"save"} onClick={Save} size="medium">Save</FormBtn> */}


                                    {/* <ButtonGroup >
                                       
                                        <Button
                                            className={classes.menuBtn}
                                            data-id={1}
                                            size="small"
                                            aria-controls={open ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleDropDownButton}
                                            endIcon={<ExpandMoreIcon />}>
                                        </Button>
                                    </ButtonGroup> */}

                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <Popper style={{ zIndex: 111111 }} id={id} open={open} anchorEl={anchorEl} role={undefined}>
                <Paper>
                    <ClickAwayListener onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">

                            {/*<MenuItem data-id="print" onClick={handleDropDownAction}>Print</MenuItem>*/}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
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

export default withSnackbar(MedicineSuammary)
