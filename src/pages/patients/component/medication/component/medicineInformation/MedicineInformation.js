import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import PatientEducationalM from "../../component/educationalmaterial/PatientEducationalM";
import Info from "../../../../../../images/icons/info.png"
import Settings from "../../../../../../images/icons/settings.png"
import { withSnackbar } from '../../../../../../components/Message/Alert'

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
    Chip
} from "@material-ui/core"
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { InputBaseField, InputBaseFieldNumber, CheckboxField, TextareaField, SelectField } from "../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import Scrollbars from "rc-scrollbars";
import SigBuilder from "../sigBuilder/SigBuilder"
import RxList from "../rxList/RxList";
import { Add as AddIcon } from '@material-ui/icons';

function MedicineInformation({ handleClose, handleNext, handleBack, medicationListCount, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(props.medicationInformationState);
    //Sig builder
    const [sigBuilderDialogOpenClose, setSigBuilderdialogOpenClose] = useState(false);
    const [medicationUnitCodes, setMedicationUnitCodes] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [medicationId, setMedicationId] = useState(props.medicationId);
    const [pEducationalM, setPEducationalM] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        sigNotes: false, dispenseQuantity: false, unitCode: false, refillNumber: false
    });
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    function setSigValues(values) {

        state.medicationList[medicationListCount].sigNotes = values
        setState(prevState => ({
            ...prevState,
            medicationList: state.medicationList
        }));
    }

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
       
        console.info(props.medicationInformationState);

        var params = {
            code: "DDL_List_Item",
            parameters: ['medication_unit_code']
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _medicationUnitCode = [];

                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'medication_unit_code':
                            _medicationUnitCode.push({ value: item.text1, label: capitalizeFirst(item.text2) });
                            break;
                    }
                });

                setMedicationUnitCodes(_medicationUnitCode);
            }

            Intialize();
        })


    }, [isUpdate]);

    const Intialize = () => {
        //debugger
        
        //if (state.sigNotes)

        //    setState(prevState => ({
        //        ...prevState,
        //        sigNotes: props.medicationInformationState[0].sigNotes
        //    }));
        if (!state.sigNotes)

            setState(prevState => ({
                ...prevState,
                sigNotes: state.medicationList[medicationListCount].sigNotes
            }));

      //  state.medicationList[medicationListCount].sigNotes = props.medicationInformationState[medicationListCount].sigNotes

        if (state.refillNumber)
            state.medicationList[medicationListCount].refillNumber = props.medicationInformationState.refillNumber

        setState(prevState => ({
            ...prevState,
            refillNumber: props.medicationInformationState.refillNumber
        }));
        if (state.unitCode)
            state.medicationList[medicationListCount].unitCode = props.medicationInformationState.unitCode

        setState(prevState => ({
            ...prevState,
            unitCode: props.medicationInformationState.unitCode
        }));
        if (state.dispenseQuantity)
            state.medicationList[medicationListCount].dispenseQuantity = props.medicationInformationState.dispenseQuantity

        setState(prevState => ({
            ...prevState,
            dispenseQuantity: props.medicationInformationState.dispenseQuantity
        }));
        if (state.scriptDate)
            state.medicationList[medicationListCount].scriptDate = props.medicationInformationState.scriptDate

        setState(prevState => ({
            ...prevState,
            scriptDate: props.medicationInformationState.scriptDate
        }));
        if (state.earlietFillDate)
            state.medicationList[medicationListCount].earlietFillDate = props.medicationInformationState.earlietFillDate

        setState(prevState => ({
            ...prevState,
            earlietFillDate: props.medicationInformationState.earlietFillDate
        }));

        if (state.daysSupply)
            state.medicationList[medicationListCount].daysSupply = props.medicationInformationState.daysSupply

        setState(prevState => ({
            ...prevState,
            daysSupply: props.medicationInformationState.daysSupply
        }));

        if (state.maxDailyDose)
            state.medicationList[medicationListCount].maxDailyDose = props.medicationInformationState.maxDailyDose

        setState(prevState => ({
            ...prevState,
            maxDailyDose: props.medicationInformationState.maxDailyDose
        }));

        if (state.refillAsNeeded)
            state.medicationList[medicationListCount].refillAsNeeded = props.medicationInformationState.refillAsNeeded

        setState(prevState => ({
            ...prevState,
            refillAsNeeded: props.medicationInformationState.refillAsNeeded
        }));

        if (state.brandMedicallyNecessary)
            state.medicationList[medicationListCount].brandMedicallyNecessary = props.medicationInformationState.brandMedicallyNecessary

        setState(prevState => ({
            ...prevState,
            brandMedicallyNecessary: props.medicationInformationState.brandMedicallyNecessary
        }));
        if (state.substitutionAllowed)
            state.medicationList[medicationListCount].substitutionAllowed = props.medicationInformationState.substitutionAllowed

        setState(prevState => ({
            ...prevState,
            substitutionAllowed: props.medicationInformationState.substitutionAllowed
        }));
        if (state.pharmacyNotes)
            state.medicationList[medicationListCount].pharmacyNotes = props.medicationInformationState.pharmacyNotes

        setState(prevState => ({
            ...prevState,
            pharmacyNotes: props.medicationInformationState.pharmacyNotes
        }));
        if (state.daw)
            state.medicationList[medicationListCount].daw = props.medicationInformationState.daw

        setState(prevState => ({
            ...prevState,
            daw: props.medicationInformationState.daw
        }));
        if (state.internalNotes)
            state.medicationList[medicationListCount].internalNotes = props.medicationInformationState.internalNotes

        setState(prevState => ({
            ...prevState,
            internalNotes: props.medicationInformationState.internalNotes
        }));
        //debugger
        //if (state.medicationList[0].medPresType!=') {
            if (state.diagnosisList)
                state.medicationList[medicationListCount].diagnosisList = props.medicationInformationState.diagnosisList

            setState(prevState => ({
                ...prevState,
                diagnosisList: props.medicationInformationState.diagnosisList
            }));
        //}

    }
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //


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

        if (name === "maxDailyDose" || name === "dispenseQuantity" || name === "refillNumber" || name === "maxDailyDose")
            state.medicationList[medicationListCount][name] = parseFloat(value)
        else
            state.medicationList[medicationListCount][name] = value

        setState(prevState => ({
            ...prevState,
            medicationList: state.medicationList

        }));
    }
    const handleChkboxChange = e => {

        const { name, value } = e.target

        state.medicationList[medicationListCount][name] = !state.medicationList[medicationListCount][name]

        setState(prevState => ({
            ...prevState,
            medicationList: state.medicationList

        }));

    }
    function onChangeSigValues(e) {

        const { name, value } = e.target;

        state.medicationList[medicationListCount][name] = value

        setState(prevState => ({
            ...prevState,
            medicationList: state.medicationList

        }));

    }
    const handleRxClick = (item) => {

        PostDataAPI("patient/medication/getDraftMedication", item.value).then((result) => {

            if (result.success && result.data != null) {

                //debugger
                    setState(result.data)

                    if (state.diagnosisList) {

                         var _diagnosisList = [];

                        state.medicationList.map((item, i) => {

                            if (state.diagnosisList) {
                                state.diagnosisList.map((itm, i) => {
                                    //var searchItem = 0;
                                    //_diagnosisList.map((item, i) => {
                                    //    if (item.diagnoseId == itm.diagnoseId) {
                                    //        searchItem = 1;
                                    //    }
                                    //});
                                    //if (searchItem != 1) {
                                    //debugger
                                    if (item.rxNorm == itm.rxnorm) {
                                        _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm });
                                    }

                                    if (itm.rxnorm == undefined) {

                                        _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm });
                                    }

                                    //}

                                });

                                setState(prevState => ({
                                    ...prevState,
                                    diagnosisListInformation: _diagnosisList
                                }));

                            }

                        });
                    }
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

            var diagnosisListInformation = state.diagnosisListInformation;
            diagnosisListInformation.map((itm,i) => {
                if (diagnosisId == itm.diagnosisId && rxNorm == itm.rxNorm)
                    //debugger
                diagnosisListInformation.splice(i, 1);
                
            });

            setState(prevState => ({
                ...prevState,
                diagnosisListInformation: diagnosisListInformation
            }));

            var diagnosislist = state.diagnosisList;
            diagnosislist.map((itm, i) => {
                if (diagnosisId == itm.diagnosisId && rxNorm == itm.rxNorm)
                    //debugger
                diagnosislist.splice(i, 1);
            });

            setState(prevState => ({
                ...prevState,
                diagnosisList: diagnosislist
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

    const handleChangeDecimal = e => {

        const { name, value } = e.target;
        var amount = value;
        var patt = new RegExp("[A-Za-z]");
        var res = patt.test(amount);
        if (res)
            amount = amount.replace(/[^\d.-]/g, '');

        if (!(/^[-+]?\d*\.?\d*$/.test(amount))) {
            setState(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
        else {
            //var lastChar = amount.substring(amount.length - 1);
            //if (lastChar == ".") amount = amount + "0";

            if (amount.length > 10)
                amount = parseFloat(amount).toFixed(2);


            state.medicationList[medicationListCount][name] = parseFloat(amount)

            setState(prevState => ({
                ...prevState,
                medicationList: state.medicationList
            }));
        }

    };

    const handleDiagnosisChange = (name, item) => {

        const { id, value } = item;

        // To empty Search List
        if ( id==0||value.trim() === "" && value !== "") {
            return;
          }
        var _diagnosisList = [];

        setState(prevState => ({
            ...prevState,
            diagnoseId: id,
            diagnoseName: value
        }));

        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                diagnoseId: '',
                diagnoseName: ''
            }));
        }, 100);

        // To empty Search List
        //debugger
        if (state.diagnosisListInformation) {
            var filter = state.diagnosisListInformation.filter(tmprm => tmprm.diagnosisId === id && tmprm.diagnosisName === value && tmprm.rxNorm===state.medicationList[medicationListCount].rxNorm);
            if (state.diagnosisListInformation.filter(tmprm => tmprm.diagnosisId === id && tmprm.diagnosisName === value && tmprm.rxNorm===state.medicationList[medicationListCount].rxNorm) == "") {
                
                //debugger
                state.diagnosisListInformation.map((itm, i) => {

                    _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: itm.rxNorm});
                });

            }
            else {

                showMessage("Error", "Diagnosis already exists", "error", 8000);

                return;
            }

        }

        _diagnosisList.push({ diagnosisId: id, diagnosisName: value, rxNorm: state.medicationList[medicationListCount].rxNorm  });

        setState(prevState => ({
            ...prevState,
            diagnosisListInformation: _diagnosisList
        }));

    }

    function handleNextStep() {

        if (state.medicationList[medicationListCount]) {
            if (!state.medicationList[medicationListCount].sigNotes && state.medicationList[medicationListCount].sigNotes != "") {
                state.medicationList[medicationListCount].sigNotes = state.sigNotes;

                setState(prevState => ({
                    ...prevState,
                    medicationList: state.medicationList

                }));
            }
        }


        var validated = true;
        validated = medicationValidations(validated);

        if (validated == false)
            return;

        if (medicationListCount + 1 === state.medicationList.length)
            addDataToList();

        handleNext(state);

        clearStepsScreen();

    }
    
    function addDataToList() {

        state.medicationList[medicationListCount].patientId = state.patientId;
        state.medicationList[medicationListCount].prescribedDatetime = state.prescribedDatetime ? new Date(state.prescribedDatetime.split('T')[0]) : new Date();
        // state.medicationList[medicationListCount].sigNotes = state.medicationList[medicationListCount] ? state.medicationList[medicationListCount].sigNotes : '';
        state.medicationList[medicationListCount].startTakingDatetime = state.startTakingDatetime;
        state.medicationList[medicationListCount].stopTakingDatetime = state.stopTakingDatetime;
        state.medicationList[medicationListCount].discontinueMedicine = state.discontinueMedicine;
        state.medicationList[medicationListCount].medicineComment = state.medicineComment;
        state.medicationList[medicationListCount].medicationStatusCode = state.medicationStatusCode;

        state.medicationList[medicationListCount].dispenseQuantity = state.medicationList[medicationListCount].dispenseQuantity ?
            parseFloat(state.medicationList[medicationListCount].dispenseQuantity) : 0;
        state.medicationList[medicationListCount].daysSupply = state.medicationList[medicationListCount].daysSupply ?
            parseFloat(state.medicationList[medicationListCount].daysSupply) : 0;
        state.medicationList[medicationListCount].refillNumber = state.medicationList[medicationListCount].refillNumber ?
            parseFloat(state.medicationList[medicationListCount].refillNumber) : 0;
        state.medicationList[medicationListCount].maxDailyDose = state.medicationList[medicationListCount].maxDailyDose ?
            parseFloat(state.medicationList[medicationListCount].maxDailyDose) : 0;

    }

    const medicationValidations = (validated) => {

        if (!state.medicationList[medicationListCount].sigNotes || state.medicationList[medicationListCount].sigNotes.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                sigNotes: true
            }));
            validated = false;

        }
        if (state.medicationList[medicationListCount].dispenseQuantity == "" || state.medicationList[medicationListCount].dispenseQuantity == null) {
            setErrorMessages(prevState => ({
                ...prevState,
                dispenseQuantity: true
            }));
            validated = false;
        }
        if (state.medicationList[medicationListCount].unitCode == "" || state.medicationList[medicationListCount].unitCode == null) {
            setErrorMessages(prevState => ({
                ...prevState,
                unitCode: true
            }));
            validated = false;
        }
        if (state.medicationList[medicationListCount].refillNumber == "" || state.medicationList[medicationListCount].refillNumber == null) {
            setErrorMessages(prevState => ({
                ...prevState,
                refillNumber: true
            }));
            validated = false;
        }


        return validated;

    }

    const educationalClose = () => {
        setPEducationalM(false)
    }
    const educationalOpen = () => {

        if (state.medicationList) {
            if (state.medicationList.length === 0) {
                showMessage("Error", "Please select drug name first.", "error", 2000)
                return;
            }
        }
        else {
            showMessage("Error", "Please select drug name first.", "error", 2000)
            return;
        }
        var medItem = state.medicationList[0];
        if (medItem.drugName != '' && medItem.drugName != null) {
            setPEducationalM(true)
        } else {
            showMessage("Error", "Please select medicine", "error", 3000);
        }
    }


    const Save = () => {

        var validated = true;
        validated = medicationValidations(validated);

        if (validated == false)
            return;
        var method = "patient/medication/addMedicationOrder";
        if (medicationId > 0) {
            method = "patient/medication/updateDraftMedication";
        }
        else {
            if (state.medicationList != null)
            {
                for (let i = 0; i < state.medicationList.length; i++)
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

        addDataToList();
        setLoading({ isSaving: true });
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

    function addDataToList() {

        var _MedicationList = [];
        state.medicationList.map((item, i) => {
            //debugger
            if (!item.medPresType && !item.MedPresType) {
                if (item.prescribedDatetime) {
                    var presdate = item.prescribedDatetime.toString();
                    if (presdate.includes("T"))
                        presdate = new Date(item.prescribedDatetime.split("T")[0]);
                    else
                        presdate = item.prescribedDatetime
                }
                _MedicationList.push({
                    rxNorm: item.rxNorm, drugName: item.drugName, alert: item.alert, warning: item.warning,
                    appointmentId: state.appointmentId ? state.appointmentId : null, encounterId: state.encounterId ? state.encounterId : null,
                    patientId: state.patientId, prescribedDatetime: presdate,
                    sigNotes: item.sigNotes, medicationID: item.medicationId ? item.medicationId : item.medicationID ? item.medicationID : 0, startTakingDatetime: state.startTakingDatetime, stopTakingDatetime: state.stopTakingDatetime,
                    discontinueMedicine: state.discontinueMedicine, medicineComment: state.medicineComment, medicationStatusCode: state.medicationStatusCode,
                    brandMedicallyNecessary: item.brandMedicallyNecessary, substitutionAllowed: item.substitutionAllowed,
                    daysSupply: item.daysSupply ? parseFloat(item.daysSupply) : 0, daw: item.daw,
                    dispenseQuantity: item.dispenseQuantity ? parseFloat(item.dispenseQuantity) : 0, earlietFillDate: item.earlietFillDate, internalNotes: item.internalNotes,
                    maxDailyDose: item.maxDailyDose ? parseFloat(item.maxDailyDose) : 0, refillNumber: item.refillNumber ? parseFloat(item.refillNumber) : 0,
                    pharmacyNotes: item.pharmacyNotes, refillAsNeeded: item.refillAsNeeded, scriptDate: item.scriptDate, unitCode: item.unitCode, MedPresType: 'Draft'


                });
            }
            else
            {
            
                var presdate= item.prescribedDatetime
                _MedicationList.push({
                    rxNorm: item.rxNorm, drugName: item.drugName, alert: item.alert, warning: item.warning,
                    appointmentId: state.appointmentId ? state.appointmentId : null, encounterId: state.encounterId ? state.encounterId : null,
                    patientId: item.patientId, medicationID: item.medicationId ? item.medicationId : item.medicationID ? item.medicationID:0, prescribedDatetime: presdate,
                    sigNotes: item.sigNotes, startTakingDatetime: item.startTakingDatetime, stopTakingDatetime: item.stopTakingDatetime,
                    discontinueMedicine: item.discontinueMedicine, medicineComment: item.medicineComment, medicationStatusCode: item.medicationStatusCode,
                    brandMedicallyNecessary: item.brandMedicallyNecessary, substitutionAllowed: item.substitutionAllowed,
                    daysSupply: item.daysSupply ? parseFloat(item.daysSupply) : 0, daw: item.daw,
                    dispenseQuantity: item.dispenseQuantity ? parseFloat(item.dispenseQuantity) : 0, earlietFillDate: item.earlietFillDate, internalNotes: item.internalNotes,
                    maxDailyDose: item.maxDailyDose ? parseFloat(item.maxDailyDose) : 0, refillNumber: item.refillNumber ? parseFloat(item.refillNumber) : 0,
                    pharmacyNotes: item.pharmacyNotes, refillAsNeeded: item.refillAsNeeded, scriptDate: item.scriptDate, unitCode: item.unitCode, MedPresType: item.medPresType ? item.medPresType : item.MedPresType ? item.MedPresType:'Draft'


                });
                if (state.patientId == undefined || state.patientId == null)
                    state.patientId = item.patientId
            }
        });

        state.medicationList = _MedicationList;
        
        state.diagnosisList = state.diagnosisListInformation;
    }

    function clearStepsScreen() {
        setErrorMessages({ sigNotes: false, dispenseQuantity: false, unitCode: false, refillNumber: false });
    }

    return (
        <>
            <SigBuilder OpneClose={sigBuilderDialogOpenClose} handleClose={() => setSigBuilderdialogOpenClose(false)} onUpdate={(values) => setSigValues(values)} />

            <div className={classes.DialogContentLeftSide}>
                <RxList onClick={(item) => handleRxClick(item)} patientId={state.patientId} />
            </div>
            <div className={classes.DialogContentRightSide}>
                <div className={classes.box}>
                    <div className={classes.header}>
                        <FormGroupTitle></FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars style={{ height: "580px" }} >

                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Typography className={classes.informationText}>Complete medication information ({medicationListCount + 1} of {state.medicationList.length} )</Typography>
                                </Grid>
                                <Grid item xs={12} sm={11} md={11} lg={11} >
                                    <ul className={classes.medicineList}>

                                        <li>
                                            <span style={{ display: "block" }}>
                                                <Typography className={classes.listItemName}>{state.medicationList[medicationListCount] ? state.medicationList[medicationListCount].drugName : ""}</Typography>
                                                <Typography className={classes.listItemheading}><b>Associated Diagnosis:</b></Typography>
                                                
                                                {
                                                    state.diagnosisListInformation ?
                                                        state.diagnosisListInformation.filter(tmprm => tmprm.rxNorm == state.medicationList[medicationListCount].rxNorm).map((item, l) => (

                                                            <span style={{ display: "flex" }}>
                                                                <Typography className={classes.listItemDescription}>{item.diagnosisName}</Typography>
                                                                <span className={classes.listCrossButton} onClick={() => deleteDiagnosisInfo(item.diagnosisId, state.medicationList[medicationListCount].rxNorm )}><AddIcon /></span>
                                                            </span>

                                                        ))
                                                        : null
                                                }
                                            </span>
                                        </li>
                                    </ul>
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Label title="Associated Diagnosis" size={2} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >
                                    <SearchList
                                        name={state.diagnoseId}
                                        value={state.diagnoseId}
                                        searchTerm={state.diagnoseName}
                                        code="diagnosis"
                                        apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleDiagnosisChange(name, item)}
                                        placeholderTitle="Search Diagnosis"
                                    />
                                </Grid>
                            </Grid>


                            <Grid lg={12} container direction="row">

                                <Label title="SIG" size={2} mandatory={true} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >

                                    {<InputBase
                                        fullWidth
                                        autoComplete="off"
                                        maxLength="280"
                                        name="sigNotes"
                                        placeholder="SIG"
                                        value={state.medicationList[medicationListCount].sigNotes || state.medicationList[medicationListCount].sigNotes == '' ? state.medicationList[medicationListCount].sigNotes : state.sigNotes}
                                        className={classes.baseInput}
                                        onChange={onChangeSigValues}
                                        endAdornment={
                                            <InputAdornment position="center">
                                                <img src={Settings} alt="setting" onClick={() => setSigBuilderdialogOpenClose(true)} style={{position: "relative", left: "-8px"}} />
                                            </InputAdornment>
                                        }
                                    />}

                                    {errorMessages.sigNotes && (!state.medicationList[medicationListCount].sigNotes || state.medicationList[medicationListCount].sigNotes.trim() == "" || state.medicationList[medicationListCount].sigNotes.trim() ==null) ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter SIG notes
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Dispense" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Dispense"
                                        id="dispenseQuantity"
                                        name="dispenseQuantity"
                                        disableUnderline
                                        onChange={handleChange}
                                        value={state.medicationList[medicationListCount].dispenseQuantity ? state.medicationList[medicationListCount].dispenseQuantity : ""}
                                    />
                                    {errorMessages.dispenseQuantity && !state.medicationList[medicationListCount].dispenseQuantity ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter dispense
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Unit" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        id="unitCode"
                                        name="unitCode"
                                        placeholder="Select Unit"
                                        value={state.medicationList[medicationListCount].unitCode ? state.medicationList[medicationListCount].unitCode : ""}
                                        onChange={handleChange}
                                        options={medicationUnitCodes} />
                                    {errorMessages.unitCode && !state.medicationList[medicationListCount].unitCode ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter unit
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Days Supply" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        id="daysSupply"
                                        name="daysSupply"
                                        placeholder="Days Supply"
                                        value={state.medicationList[medicationListCount].daysSupply ? state.medicationList[medicationListCount].daysSupply : ""}
                                        onChange={handleChangeDecimal}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                    />
                                </Grid>
                                <Label title="Refills" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Refills"
                                        id="refillNumber"
                                        name="refillNumber"
                                        disableUnderline
                                        onChange={handleChangeDecimal}
                                        value={state.medicationList[medicationListCount].refillNumber ? state.medicationList[medicationListCount].refillNumber : ""}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                    />
                                    {errorMessages.refillNumber && !state.medicationList[medicationListCount].refillNumber ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter refills
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Max Daily Dose" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Max Daily Dose"
                                        id="maxDailyDose"
                                        name="maxDailyDose"
                                        disableUnderline
                                        onChange={handleChangeDecimal}
                                        value={state.medicationList[medicationListCount].maxDailyDose ? state.medicationList[medicationListCount].maxDailyDose : ""}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Script Date" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Script Date"
                                        type="date"
                                        id="scriptDate"
                                        name="scriptDate"
                                        disableUnderline
                                        onChange={handleChange}
                                        value={state.medicationList[medicationListCount].scriptDate ? state.medicationList[medicationListCount].scriptDate.split('T')[0] : ""}
                                    />
                                </Grid>
                                <Label title="Earliest Fill Date" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Earliest Fill Date"
                                        type="date"
                                        id="earlietFillDate"
                                        name="earlietFillDate"
                                        disableUnderline
                                        onChange={handleChange}
                                        value={state.medicationList[medicationListCount].earlietFillDate ? state.medicationList[medicationListCount].earlietFillDate.split('T')[0] : ""}
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleChkboxChange}
                                        name="refillAsNeeded"
                                        checked={state.medicationList[medicationListCount].refillAsNeeded ? state.medicationList[medicationListCount].refillAsNeeded : false}
                                        label="Refill as needed"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleChkboxChange}
                                        name="daw"
                                        checked={state.medicationList[medicationListCount].daw ? state.medicationList[medicationListCount].daw : false}
                                        label="Dispense as written"
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleChkboxChange}
                                        name="brandMedicallyNecessary"
                                        checked={state.medicationList[medicationListCount].brandMedicallyNecessary ? state.medicationList[medicationListCount].brandMedicallyNecessary : false}
                                        label="Brand Medically Necessary"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleChkboxChange}
                                        name="substitutionAllowed"
                                        checked={state.medicationList[medicationListCount].substitutionAllowed ? state.medicationList[medicationListCount].substitutionAllowed : false}
                                        label="Substitution Allowed"
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Label title="Note to Pharmacy" size={2} isTextAreaInput={true} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Note to Pharmacy"
                                        onChange={handleChange}
                                        name="pharmacyNotes"
                                        value={state.medicationList[medicationListCount].pharmacyNotes ? state.medicationList[medicationListCount].pharmacyNotes : ""}
                                        MaxLength='4000'
                                    />

                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Label title="Internal Rx Comments" size={2} isTextAreaInput={true} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Internal Rx Comments"
                                        onChange={handleChange}
                                        name="internalNotes"
                                        value={state.medicationList[medicationListCount].internalNotes ? state.medicationList[medicationListCount].internalNotes : ""}
                                        MaxLength='4000'
                                    />

                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row" alignItems="baseline">

                                <Label title="Resources" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={4} >
                                    <span style={{ display: "block" }}>
                                        <Typography onClick={educationalOpen} className={classes.linkItem}>Medline Plus Patient Education Material</Typography>

                                    </span>
                                </Grid>
                                {/*<Grid item xs={12} sm={4} md={4} lg={3} >*/}
                                {/*    <Typography onClick={educationalOpen} className={classes.linkItem}>Patient Education Material</Typography>*/}
                                {/*</Grid>*/}

                            </Grid>
                        </Scrollbars>

                    </div>
                    <div className={classes.footer}>
                        <Grid lg={12} container direction="row">
                            <Grid item xs={12} sm={11} md={11} lg={11} >
                                <FormBtn id="save" onClick={handleBack} size="medium" btnType="back">Back</FormBtn>
                                <div className={classes.footerRight}>
                                    <FormBtn id={"reset"} onClick={handleClose} size="medium" >Cancel</FormBtn>
                                    {medicationListCount + 1 === state.medicationList.length ? loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> : <FormBtn id={"save"} size="medium" onClick={Save}>Save</FormBtn> : null}
                                    <FormBtn id={"save"} size="medium" onClick={handleNextStep} btnType="next">Next</FormBtn>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            {pEducationalM ?
                <PatientEducationalM
                    educationalClose={educationalClose}
                    educationalOpen={educationalOpen}
                    code={state.medicationList[0].rxNorm}
                    name={state.medicationList[0].drugName}
                    category='medicine'
                    patientId={props.patientId}
                ></PatientEducationalM> : ''
            }
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
export default withSnackbar(MedicineInformation)
