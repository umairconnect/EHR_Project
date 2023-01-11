import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../images/icons/math-plus.png"
// import Info from "../../../../../images/icons/info.png"
// import Settings from "../../../../../images/icons/settings.png";
// import DeleteIcon from "../../../../../images/icons/trash.png";
import { withSnackbar } from '../../../../../components/Message/Alert'
import {
    // Button,
    Typography,
    Grid,
    Dialog,
    // DialogContent,
    FormLabel,
    InputBase,
    InputAdornment,
    FormHelperText,
    Tabs,
    Tab,
} from "@material-ui/core"
//import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import SigBuilder from "../component/sigBuilder/SigBuilder";
import PatientEducationalM from "../component/educationalmaterial/PatientEducationalM";
import { InputBaseField, CheckboxField, TextareaField, SelectField } from "../../../../../components/InputField/InputField"; //InputBaseFieldNumber
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../components/LogDialog/LogDialog";
import Scrollbars from "rc-scrollbars";
import MedicineSearch from "./medicineSearch/MedicineSearch"
import MedicineInformation from "./medicineInformation/MedicineInformation"
import MedicineSummary from "./medicineSummary/MedicineSummary"
import PharmacySearch from "./pharmacySearch/PharmacySearch"
import { Alert } from "@material-ui/lab"; //AlertTitle
import { Add as AddIcon } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';

function MedicationForm({ dialogOpenClose, handleClose, isEdit, handleSuccess, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [logdialogstate, setLogDialogState] = useState(false);
    //Sig builder
    const [sigBuilderDialogOpenClose, setSigBuilderdialogOpenClose] = useState(false);

    const [favMedicineProviderList, setFavMedicineProviderList] = useState([]);

    //Patient educational material
    const [pEducationalM, setPEducationalM] = useState(false);
    const [isEditable] = useState(props.isEditable);
    const medicationFormRef = useState({
        sigNotesRef: "", prescribeDateRef: "", startDateRef: "",
        dispenseQuantityRef: "", unitRef: ""
    });

    const [medicationId, setMedicationId] = useState(props.medicationId);
    const [patientId] = useState(Number(props.patientId));
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    const patientAppointmentID = props.patientAppointmentId ? props.patientAppointmentId : null
    const encounterID = props.encounterId ? props.encounterId : null

    //dropdown lists
    const [appointmentList, setAppointmentList] = useState([]);
    const [medStatusList, setMedStatusList] = useState([]);
    const [medOrderStatusList, setMedOrderStatusList] = useState([]);
    const [medUnitCodeList, setMedUnitCodeList] = useState([]);
    const [favMedicineList, setFavMedicineList] = useState([]);
    const [draftMedicationList, setDraftMedicationList] = useState([]);
    const [medicationList, setMedicationList] = useState([]);
    const [providerFavouriteMedicinesList, setProviderFavouriteMedicinesList] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    //end dropdown lists

    const [errorMessages, setErrorMessages] = useState({
        drugName: false, sigNotes: false, prescribedDatetime: false, startTakingDatetime: false,
        dispenseQuantity: false, unitCode: false, validStartDate: false
    });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //
    const [medicationListCount, setMedicationListCount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    //Wizard setup
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['New Medical Order', 'Medicine Search', 'Medicine Information', 'Medicine Summary'];
    const handleBack = (newState) => {

        
        if (activeStep === 1) {
            if (state.medicationList.length === 0)
                setIsDisabled(false);
        }

        if (activeStep === 2) {

            if (medicationListCount > 0)
                setMedicationListCount(medicationListCount - 1);
            else
                setActiveStep(activeStep - 1);

        }
        else if (activeStep === 4) {
//debugger
            setState({ ...state, ...newState });

            setActiveStep(activeStep - 1);
        }
        else
            setActiveStep(activeStep - 1);


    };

    const handleNext = (newState) => {

        var _diagnosisList = [];


        if (activeStep === 0) {
            var validated = true;
            validated = medicationValidations(validated);

            if (validated == false)
                return;

            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    rxnorm: '',
                    drugName: ''
                }));
            }, 100);

        }
        else if (activeStep === 1 || activeStep === 2) { setState({ ...state, ...newState }); }

        if (activeStep === 1) {


            //if (newState.medicationList.length === 0) {

            //    showMessage("Error", "Please select at least one medicine", "error", 3000);
            //    return;
            //}


            if (newState.diagnosisList) {

                _diagnosisList = [];

                newState.medicationList.map((item, i) => {

                    if (newState.diagnosisList) {
                        newState.diagnosisList.map((itm, i) => {
                            //var searchItem = 0;
                            //_diagnosisList.map((item, i) => {
                            //    if (item.diagnoseId == itm.diagnoseId) {
                            //        searchItem = 1;
                            //    }
                            //});
                            //if (searchItem != 1) {
                            //debugger
                            if (item.rxNorm == itm.rxnorm)
                            {
                                _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm });
                            }

                            if (itm.rxnorm == undefined)
                            {

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

        if (activeStep === 2) {
            //debugger
            if (newState.medicationList.length === medicationListCount + 1) {
                setActiveStep(activeStep + 1); 


            }
            else
                setMedicationListCount(medicationListCount + 1);


        }
        else if (activeStep === 4) {

        }
        else
            setActiveStep(activeStep + 1);

    }

    const formatDate = (date) => {

        var hours = date.getHours();
        var minutes = date.getMinutes();

        var day = date.getDate();
        var month = (date.getMonth() + 1);
        var year = date.getFullYear();

        minutes = minutes < 10 ? '0' + minutes : minutes;
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;

        var strTime = hours + ':' + minutes;
        return year + "-" + month + "-" + day + "T" + strTime;
    }

    const [state, setState] = useState({
        medicationId: 0, patientId: Number(props.patientId), appointmentId: patientAppointmentID, encounterId: encounterID, medicationTypeCode: "medication", drugName: "", rxnorm: "",
        isPrn: false, sigNotes: "", indication: "", medicationStatusCode: "Active", prescribedDatetime: formatDate(new Date()), startTakingDatetime: null,
        stopTakingDatetime: null, dispenseQuantity: null, unitCode: "", dispensePackage: 0, refillNumber: null, daw: false, pharmacyNotes: "", notes: "", medOrderStatusCode: "",
        daysSupply: 0, createDate: new Date(), createdBy: 0, diagnoseId: "", prescribingProviderId: 0, diagnoseName: "", discontinueMedicine: false, brandMedicallyNecessary: false, substitutionAllowed: false,
        discontinueMedicine: false, medicineComment: "", resourceLink: "", maxDailyDose: 0, scriptDate: formatDate(new Date()), earlietFillDate: formatDate(new Date()),
        refillAsNeeded: false, internalNotes: "", overrideAllergy: "", overrideAllergyComments: "",
        medicationList: [], diagnosisList: [], supervisingProvider: null, selectedPharmacy: { id: 0, name: "", address: "", info: "" }

    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDelete = (e) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the medication?", "confirm", function () {
            var data = {
                medicationId: state.medicationId
            }
            PostDataAPI('patient/medication/deleteMedication', data, true).then((result) => {

                if (result.success == true) {
                    setLoading({ isDeleting: false });
                    handleSuccess("Record deleted successfully.");
                    //showMessage("Success", "Record deleted successfully.", "success", 2000);
                    //setLoading({ isDeleting: false });
                    //setMedicationId(0);
                    //ResetForm();
                    //setTimeout(handleClose, 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setLoading({ isDeleting: false });
                }
            })
        });
    }

    const handleChangeStopTakeingDate = (e) => {

        const { name, value } = e.target;


        if (new Date(value) < new Date(state.startTakingDatetime)) {
            setErrorMessages(prevState => ({
                ...prevState,
                validStartDate: true
            }));

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                validStartDate: false
            }));

        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDrugChange = (name, item) => {

        const { id, value } = item;
        if (id == 0 || value.trim() === "" && value !== "") {
            return;
        }
        var _medicationList = [];

        // To empty Search List

        setState(prevState => ({
            ...prevState,
            rxnorm: id,
            drugName: value
        }));


        // To empty Search List

        //if (state.medicationList) {
        //    if (state.medicationList.filter(tmprm => tmprm.rxNorm === id && tmprm.drugName === value) == "") {
        //        state.medicationList.map((itm, i) => {
        //
        //            _medicationList.push({ rxNorm: itm.rxNorm, drugName: itm.drugName, alert: itm.alert, warning: itm.warning });
        //        });
        //
        //    }
        //    else {
        //
        //        showMessage("Error", "Medicine already exists", "error", 8000);
        //
        //        return;
        //    }
        //
        //}

        _medicationList.push({ rxNorm: id, drugName: value, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

        setState(prevState => ({
            ...prevState,
            medicationList: _medicationList
        }));


        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                rxnorm: '',
                drugName: ''
            }));
        }, 100);

        setIsDisabled(true);
    }

    const handleDiagnosisChange = (name, item) => {

        const { id, value } = item;

        if (id == 0 || value.trim() === "" && value !== "") {
            return;
        }

        var _diagnosisList = [];

        // To empty Search List

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

        if (state.diagnosisList) {
            if (state.diagnosisList.filter(tmprm => tmprm.diagnosisId === id && tmprm.diagnosisName === value) == "") {
                state.diagnosisList.map((itm, i) => {

                    _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName });
                });

            }
            else {

                showMessage("Error", "Diagnosis already exists", "error", 8000);

                return;
            }

        }

        _diagnosisList.push({ diagnosisId: id, diagnosisName: value });

        setState(prevState => ({
            ...prevState,
            diagnosisList: _diagnosisList
        }));


    }

    const handleChkboxChange = e => {

        const { name, checked } = e.target;

        let dateTime = '';
        if (checked === true)
            dateTime = new Date().toISOString().split("T")[0];
        else
            dateTime = '';

        setState(prevState => ({
            ...prevState,
            stopTakingDatetime: dateTime,
            [name]: checked
        }));
    }

    // Previous work
    const handleFavMedChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        var label = e.target.options[e.target.selectedIndex].text;
        setState(prevState => ({
            ...prevState,
            "drugName": label
        }));
    }

    const handleAddToFavorite = () => {
        if (isEditable) {
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
            var data = {
                rxnorm: medItem.rxNorm,
                drugName: medItem.drugName
            }

            PostDataAPI("medication/fav/addFavMedicine", data, true).then((result) => {

                if (result.success) {
                    showMessage("Success", '"' + medItem.drugName + '" added in favorite list.', "success", 2000);
                    LoadFavMedicineList();
                }
                else if (result.message && result.message.trim() != "") {
                    showMessage("Error", result.message, "error", 2000);
                }
            });
        }
    }

    // Previous work

    const handleRadioButtons = (e, newvalue) => {
        setState(prevState => ({
            ...prevState,
            "medicationTypeCode": newvalue
        }));
    }

    const ResetForm = () => {

        if (medicationId > 0 && medicationId != "") {
            state.medicationId = medicationId;
            loadData();
        }
        else {
            setState({
                medicationId: 0,
                patientId: patientId,
                appointmentId: patientAppointmentID,
                encounterId: encounterID,
                medicationTypeCode: "medication",
                drugName: "",
                rxnorm: "",
                isPrn: false,
                sigNotes: "",
                indication: "",
                medicationStatusCode: "Active",
                prescribedDatetime: formatDate(new Date()),
                startTakingDatetime: null,
                stopTakingDatetime: null,
                dispenseQuantity: null,
                unitCode: "",
                dispensePackage: 0,
                refillNumber: null,
                discontinueMedicine: false,
                daw: false,
                pharmacyNotes: "",
                notes: "",
                medOrderStatusCode: "",
                daysSupply: 0,
                discontinueMedicine: false,
                medicineComment: "",
                resourceLink: "",
                maxDailyDose: 0,
                scriptDate: formatDate(new Date()),
                earlietFillDate: formatDate(new Date()),
                refillAsNeeded: false,
                internalNotes: "",
                overrideAllergy: "",
                overrideAllergyComments: "",
                createDate: new Date(),
                createdBy: 0,
                selectedPharmacy: { id: 0, name: "", address: "", info: "" }

            })
        }
    }

    const loadData = () => {
        PostDataAPI("patient/medication/getMedication", medicationId).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);

                var startDate = null;
                if (result.data.medicationList[0].startTakingDatetime) {
                    startDate = result.data.medicationList[0].startTakingDatetime.split('T')[0];
                }
                if (result.data.medicationList[0].stopTakingDatetime) {
                    var stopDate = result.data.medicationList[0].stopTakingDatetime.split('T')[0];
                }
                setState(prevState => ({
                    ...prevState,
                    sigNotes: result.data.medicationList[0].sigNotes,
                    rxnorm: result.data.medicationList[0].rxnorm,
                    meddrugName: result.data.medicationList[0].drugName,
                    discontinueMedicine: result.data.medicationList[0].discontinueMedicine,
                    medicineComment: result.data.medicationList[0].medicineComment,
                    //diagnosisId: result.data.diagnosisList[0].diagnosisId,
                    //diagnoseName: result.data.diagnosisList[0].diagnosisName,
                    startTakingDatetime: startDate,
                    stopTakingDatetime: stopDate,
                    medicationStatusCode: result.data.medicationList[0].medicationStatusCode,

                }));

                var _medicationList = [];
                _medicationList.push({ rxNorm: result.data.medicationList[0].rxnorm, drugName: result.data.medicationList[0].drugName, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });


                setState(prevState => ({
                    ...prevState,
                    medicationList: _medicationList
                }));

                //var _diagnosisList = [];

                setState(prevState => ({
                    ...prevState,
                    rxnorm: '',
                    drugName: '',
                    diagnosisId: '',
                    diagnoseName: ''
                }));
                //_diagnosisList.push({ diagnosisId: result.data.diagnosisList[0].diagnosisId, diagnosisName: result.data.diagnosisList[0].diagnosisName });
                if (result.data.diagnosisList) {
                    setState(prevState => ({
                        ...prevState,
                        diagnosisList: result.data.diagnosisList
                    }));




                }



                console.log(state);
                //state.medicationList=result.data;
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    useEffect(() => {

        console.info(medicationId)
        if (dialogOpenClose) {
            ResetForm();
            LoadDraftMedication()
            var params = {
                code: "patient_appt",
                parameters: [patientId ? patientId.toString() : ""]
            }

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {
                    setAppointmentList(
                        result.data.map((item, i) => {
                            return { value: item.id, label: item.text1 };
                        }));
                }
            });

            console.info(state.appointmentId)
            console.info(state.encounterId)

            params = {
                code: "DDL_List_Item",
                parameters: ['med_order_status_code', 'medication_status_code', 'medication_unit_code']
            };

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {
                    var _medOrderStatusList = [];
                    var _medStatusList = [];
                    var _medUnitCodeList = [];
                    result.data.map((item, i) => {
                        switch (item.text3) {
                            case 'med_order_status_code':
                                _medOrderStatusList.push({ value: item.text1, label: item.text2 });
                                break;
                            case 'medication_status_code':
                                _medStatusList.push({ value: item.text1, label: item.text2 });
                                break;
                            case 'medication_unit_code':
                                _medUnitCodeList.push({ value: item.text1, label: item.text2 });
                                break;
                        }
                    });
                    setMedOrderStatusList(_medOrderStatusList);
                    setMedStatusList(_medStatusList);
                    setMedUnitCodeList(_medUnitCodeList);
                }
            });

            LoadFavMedicineList();
            console.info(draftMedicationList);

            if (isEdit == true) {
                loadData();
            }
        }
    }, [dialogOpenClose]);
    //const LoadEditMedicine = () => {
    //    var params = {
    //        medicationId: medicationId,
    //    }

    //    PostDataAPI("ddl/getMedication", params).then((result) => {

    //        if (result.success && result.data != null) {

    //            setFavMedicineList(
    //                result.data.map((item, i) => {
    //                    return { value: item.id, label: item.text1 };
    //                }));
    //        }
    //    });
    //}
    const LoadFavMedicineList = () => {
        var params = {
            code: "fav_medicines",
            parameters: [userInfo.userID]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setFavMedicineList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));


            }
        });
    }
    const LoadDraftMedication = () => {


        var params = {
            code: "patient_drafted_medicine",
            parameters: [patientId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {


                var list = result.data.map((item, i) => {

                    return { value: item.id, label: item.text1 };
                })
                setDraftMedicationList(list)
            }
        });



    }
    function handlingDateTypes() {

        if (state.appointmentId != null)
            state.appointmentId = parseInt(state.appointmentId);
        if (state.encounterId != null)
            state.encounterId = parseInt(state.encounterId);
        var _diagnosisList = [];
        var _MedicationList = [];

        state.medicationList.map((item, i) => {

            _MedicationList.push({
                rxNorm: item.rxNorm, drugName: item.drugName, alert: item.alert, warning: item.warning, patientId: state.patientId, prescribedDatetime: state.prescribedDatetime, appointmentId: state.appointmentId ? state.appointmentId : null, encounterId: state.encounterId ? state.encounterId : null,
                sigNotes: state.sigNotes, startTakingDatetime: state.startTakingDatetime, stopTakingDatetime: state.stopTakingDatetime, medicationId: state.medicationId ? state.medicationId : 0, patientId: state.patientId ? state.patientId : null,
                discontinueMedicine: state.discontinueMedicine, medicineComment: state.medicineComment, medicationStatusCode: state.medicationStatusCode, selectedPharmacy: { id: 0, name: "", address: "", info: "" }, MedPresType: 'Historic', dispenseQuantity: item.dispenseQuantity, refillNumber: item.refillNumber
            });

            if (state.diagnosisList) {

                state.diagnosisList.map((itm, i) => {

                    _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm });

                });
            }

        });

        if (_diagnosisList.length > 0)
            state.diagnosisList = _diagnosisList;

        if (_MedicationList.length > 0)
            state.medicationList = _MedicationList;

    }

    const medicationValidations = (validated) => {

        if (state.medicationList) {
            if (state.medicationList.length === 0) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    drugName: true
                }));
                validated = false;

            }
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                drugName: true
            }));
            validated = false;
        }


        if (state.startTakingDatetime == "" || state.startTakingDatetime == null) {
            setErrorMessages(prevState => ({
                ...prevState,
                startTakingDatetime: true
            }));
            validated = false;
        }

        if (!state.sigNotes || state.sigNotes.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                sigNotes: true
            }));
            validated = false;

        }

        if (state.startTakingDatetime) {
            if (state.stopTakingDatetime != null) {
                if (new Date(state.stopTakingDatetime) < new Date(state.startTakingDatetime)) {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        validStartDate: true
                    }));
                    validated = false;
                }
            }

        }

        return validated;

    }

    const Save = () => {

        var validated = true;
        validated = medicationValidations(validated);

        if (validated == false)
            return;

        var method = ""
        if (medicationId > 0 && isEdit == true) {
            var method = "patient/medication/updateMedication";
        }
        else {
            var method = "patient/medication/addMedicationOrder";
        }

        handlingDateTypes();
        setLoading({ isSaving: true });
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {
                debugger

                setLoading({ isSaving: false });
                handleSuccess("Medication saved successfully.");
                //showMessage("Success", "Medication saved successfully.", "success", 3000);
                //setLoading({ isSaving: false });
                //setTimeout(function () {  }, 500);
                //handleClose();
            }
            else {
                setLoading({ isSaving: false });
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    function clear() {
        ResetForm();
        setErrorMessages({
            drugName: false, sigNotes: false, prescribedDatetime: false, startTakingDatetime: false,
            dispenseQuantity: false, unitCode: false, validStartDate: false
        });
    }

    function deleteRecord() {
        setLoading({ isDeleting: true });
        PostDataAPI('patient/medication/deleteMedication', state, true).then((result) => {

            if (result.success == true) {
                setErrorMessages([]);

                showMessage("Success", "Record deleted successfully.", "success", 2000);
                setLoading({ isDeleting: false });
                setMedicationId(0);
                ResetForm();
                setTimeout(handleClose, 2000);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isDeleting: false });
            }
        })
    }

    function setSigValues(values) {
        setState(prevState => ({
            ...prevState,
            sigNotes: values
        }));
    }

    function onChangeSigValues(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            sigNotes: value
        }));
    }
    function validatePrescribeDate() {
        let status = true;
        if (state.prescribedDatetime > state.startTakingDatetime && state.prescribedDatetime != '' && state.startTakingDatetime != '')
            status = false;
        return status;
    }
    function validateStartDate() {
        let status = true;
        if (state.startTakingDatetime > state.stopTakingDatetime && state.stopTakingDatetime != '' && state.startTakingDatetime != '')
            status = false;
        return status;
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
    function deleteMedicine(id, rowindex) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the medicine?", "confirm", function () {

            let rxNormItem = state.medicationList[rowindex].rxNorm;

            state.medicationList.map((itm, k) => {
                if (rxNormItem == itm.rxNorm)
                    state.medicationList.splice(k, 1);
            });

            setState(prevState => ({
                ...prevState,
                medicationList: state.medicationList
            }));

            setIsDisabled(false);
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    rxnorm: '',
                    drugName: ''
                }));
            }, 100);

        });
    }

    function deleteDiagnosis(id, rowindex) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm", function () {

            let diagnosisItem = state.diagnosisList[rowindex].diagnosisId;

            state.diagnosisList.map((itm, k) => {
                if (diagnosisItem == itm.diagnosisId && k === rowindex)
                    state.diagnosisList.splice(k, 1);
            });

            setState(prevState => ({
                ...prevState,
                diagnosisList: state.diagnosisList
            }));

        });
    }

    const loadProviderFavMedicine = (rxNorm, drugItemName) => {

        var _medicationList = [];
        //if (state.medicationList) {
        //    if (state.medicationList.filter(tmprm => tmprm.rxNorm === rxNorm.toString() && tmprm.drugName === drugItemName) == "") {
        //        state.medicationList.map((itm, i) => {
        //
        //            _medicationList.push({ rxNorm: itm.rxNorm, drugName: itm.drugName, alert: itm.alert, warning: itm.warning });
        //        });
        //
        //    }
        //    else {
        //
        //        showMessage("Error", "Medicine already exists", "error", 8000);
        //
        //        return;
        //    }
        //
        //}

        _medicationList.push({ rxNorm: rxNorm.toString(), drugName: drugItemName, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

        setState(prevState => ({
            ...prevState,
            medicationList: _medicationList
        }));

        setState(prevState => ({
            ...prevState,
            rxnorm: rxNorm,
            drugName: drugItemName
        }));

        setIsDisabled(true);
    }
    const [tabvalue, setTabValue] = useState(0);
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{
                    width: "255px", height: "440px", margin: "0px", backgroundColor: "#FFFFFF",
                    borderRadius: "0px",
                }}
                {...other}
            >
                {value === index && (
                    <>{children}</>
                )}
            </div>
        );
    }
    const handleRxClick = (item) => {

        PostDataAPI("patient/medication/getDraftMedication", item).then((result) => {

            if (result.success && result.data != null) {
                //debugger
                setState(result.data)
                //var _medicationList = state.medicationList;

                //_medicationList.map((itm, i) => {
                //    debugger
                //    itm.push({ alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });
                //});
                //setState(prevState => ({
                //    ...prevState,
                //    medicationList: _medicationList
                //}));
                setActiveStep(activeStep + 1);
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
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };
    const Form1 = () => {
        return (
            <>
                <div className={classes.DialogContentLeftSide}>
                    <div>
                        <Tabs
                            classes={{ root: classes.tabRoot }}
                            value={tabvalue}
                            onChange={onTabChange}
                            aria-label="icon tabs example"
                            className={classes.Htabs}
                        >
                            <Tab label="Provider Rx" aria-label="favorite" {...a11yProps(0)} />
                            <Tab label="Draft Rx" aria-label="favorite" {...a11yProps(1)} />
                        </Tabs>



                        <div className={classes.content} style={{ paddingTop: "10px" }}>


                            <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                                <FormLabel className={classes.leftHeaderTitle}>Provider Favorite Medications</FormLabel>
                                {tabvalue == 0 ? (
                                    <ul className={classes.rXList}>
                                        {
                                            favMedicineList.map((item) => {
                                                return (
                                                    <li onClick={() => loadProviderFavMedicine(item.value, item.label)}>
                                                        {item.label}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>) : ""
                                }
                            </TabPanel>


                            <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                                {tabvalue == 1 ? (
                                    <ul className={classes.rXList}>
                                        {
                                            draftMedicationList.map((item) => {
                                                return (
                                                    <li onClick={() => handleRxClick(item.value)}>
                                                        {item.label}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>) : ""
                                }
                            </TabPanel>


                        </div>
                        <div className={classes.footer}>
                        </div>
                    </div>
                </div>
                <div className={classes.DialogContentRightSide}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            {isEdit ? <FormGroupTitle>Edit Medication</FormGroupTitle> :
                                <FormGroupTitle>Add Medication</FormGroupTitle>
                            }


                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ height: "600px" }}>
                                <Grid lg={12} container direction="row" alignItems="baseline">

                                    <Label title="Medicine" style={{ alignItems: "baseline" }} size={2} mandatory={true} />
                                    <Grid item xs={12} sm={9} md={9} lg={9} >
                                        <SearchList
                                            name="rxnorm"
                                            value={state.rxnorm}
                                            searchTerm={state.drugName}
                                            code="drugs"
                                            apiUrl="ddl/loadItems"
                                            placeholderTitle="Search Drug"
                                            onChangeValue={(name, item) => handleDrugChange(name, item)}
                                            isDisabled={isDisabled}
                                        />
                                        {errorMessages.drugName && (!state.medicationList || state.medicationList.length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                            Please select at least one medicine
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                                    <Grid item xs={12} sm={9} md={9} lg={9} >
                                        <ul className={classes.medicineList}>
                                            {
                                                state.medicationList ?
                                                    state.medicationList.map((itm, i) => {
                                                        return (
                                                            <li>
                                                                <span style={{ display: "block" }}>
                                                                    <Typography className={classes.listItemName}>{itm.drugName}</Typography>
                                                                    <span className={classes.listCrossButton} onClick={() => deleteMedicine(itm.rxNorm, i)}><AddIcon /></span>

                                                                    <Alert
                                                                        severity="error"
                                                                        classes={{ root: classes.alertRoot }} >
                                                                        Alert : {itm.alert}
                                                                    </Alert>
                                                                    <Alert
                                                                        severity="warning"
                                                                        classes={{ root: classes.alertRoot }} >
                                                                        Unknown - : {itm.warning}
                                                                    </Alert>
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

                                    <Label title="SIG" size={2} mandatory={true} />
                                    <Grid item xs={12} sm={9} md={9} lg={9} >
                                        <InputBase
                                            fullWidth
                                            autoComplete="off"
                                            maxLength="280"
                                            name="signotes"
                                            placeholder="SIG"
                                            value={state.sigNotes}
                                            className={classes.baseInput}
                                            onChange={onChangeSigValues}
                                            inputProps={{ ref: input => medicationFormRef.sigNotesRef = input }}
                                            endAdornment={
                                                <InputAdornment position="center" style={{ cursor: "pointer", marginRight: "12px", color: "#00B4E5" }}>
                                                    <SettingsIcon onClick={() => setSigBuilderdialogOpenClose(true)} />
                                                </InputAdornment>
                                            }
                                        />
                                        {errorMessages.sigNotes && (!state.sigNotes || state.sigNotes.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter SIG notes
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row" style={{ alignItems: "self-start" }}>

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

                                        <div className={classes.orderTestContent}>
                                            <ul className={classes.orderList}>
                                                {
                                                    state.diagnosisList ?
                                                        state.diagnosisList.map((item, j) => (

                                                            <li key={item.diagnosisId}>
                                                                {item.diagnosisName}

                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosis(item.diagnosisId, j)}><AddIcon /></span>

                                                            </li>

                                                        ))
                                                        : null
                                                }
                                            </ul>
                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Start Date" size={2} mandatory={true} />
                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                        <InputBaseField
                                            type="date"
                                            id="startTakingDatetime"
                                            name="startTakingDatetime"
                                            disableUnderline
                                            onChange={handleChange}
                                            value={state.startTakingDatetime}
                                        />
                                        {errorMessages.startTakingDatetime && !state.startTakingDatetime ? (<FormHelperText style={{ color: "red" }} >
                                            Please select start taking date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} />
                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                        <FormLabel className={classes.labeladdfavorite} disabled={ !isEditable} onClick={handleAddToFavorite}>Add to Favorite</FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Stop Date" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                        <InputBaseField
                                            type="date"
                                            id="stopTakingDatetime"
                                            name="stopTakingDatetime"
                                            disableUnderline
                                            onChange={handleChangeStopTakeingDate}
                                            value={state.stopTakingDatetime}
                                        />
                                        {errorMessages.validStartDate ? (<FormHelperText style={{ color: "red" }} >
                                            Stop date should be greater then start date
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} />
                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                        <CheckboxField
                                            color="primary"
                                            onChange={handleChkboxChange}
                                            name="discontinueMedicine"
                                            checked={state.discontinueMedicine}
                                            label="Discontinue Medication"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Medication Comments" size={2} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={9} md={9} lg={9} >
                                        <TextareaField
                                            rowsMin={5}
                                            placeholder="Medication Comments"
                                            onChange={handleChange}
                                            name="medicineComment"
                                            value={state.medicineComment}
                                            MaxLength='4000'
                                        />

                                    </Grid>

                                </Grid>


                                <Grid lg={12} container direction="row">

                                    <Label title="Status" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                        <SelectField
                                            disableUnderline
                                            className={classes.baseInput}
                                            onChange={handleChange}
                                            name="medicationStatusCode"
                                            value={state.medicationStatusCode}
                                            options={medStatusList}
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

                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={11} md={11} lg={11} >

                                    <div className={classes.footerRight}>
                                        {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> :
                                            <FormBtn id={"save"} size="medium" disabled={ !isEditable} onClick={Save}>Save</FormBtn>
                                        }
                                        {isEdit ? <>
                                            <FormBtn id={"delete"} size="medium" disabled={!isEditable}  onClick={handleDelete}>Delete</FormBtn>
                                        </> : <FormBtn id={"save"} size="medium" onClick={handleNext} btnType="order">Order</FormBtn>

                                        }



                                        <FormBtn id={"reset"} onClick={handleClose} size="medium" >Close</FormBtn>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function getStepContent(step) {

        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return Form1();
            case 1:
                return <MedicineSearch handleClose={handleClose} handleBack={handleBack} handleNext={handleNext} patientId={props.patientId} medicationState={state} {...state} />
            case 2:
                return <MedicineInformation handleClose={handleClose} handleBack={handleBack} handleNext={handleNext} patientId={props.patientId} medicationListCount={medicationListCount} medicationInformationState={state} {...state} />
            case 3:
                return <MedicineSummary handleClose={handleClose} handleBack={handleBack} handleNext={handleNext} medicationListCount={medicationListCount} summaryInformationState={state} {...state} />
            case 4:
                return <PharmacySearch handleClose={handleClose} handleBack={handleBack} pharmacyInformationState={state} {...state} />

        }
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

    return (
        <>


            <SigBuilder OpneClose={sigBuilderDialogOpenClose} handleClose={() => setSigBuilderdialogOpenClose(false)} onUpdate={(values) => setSigValues(values)} />


            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                {...props} >
                <Scrollbars style={{ height: 730 }}>
                    <div className={classes.mainContent}>
                        {getStepContent(activeStep)}
                    </div>
                </Scrollbars>
            </Dialog>

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
            {logdialogstate ?
                <LogDialog
                    code="patMedication"
                    id={medicationId}
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
export default withSnackbar(MedicationForm)