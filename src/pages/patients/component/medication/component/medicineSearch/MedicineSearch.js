import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../../../images/icons/trash.png";
import {
    Slide,
    Button,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    DialogTitle,
    DialogActions,
    DialogContentText,
    FormHelperText,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import SearchList from "../../../../../../components/SearchList/SearchList";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Alert } from "@material-ui/lab";
import RxList from "../rxList/RxList";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../components/UiElements/UiElements"
import Scrollbars from "rc-scrollbars";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { Add as AddIcon } from '@material-ui/icons';


function MedicineSearch({ handleClose, handleNext, handleBack, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(props.medicationState);
    const [actiondialogOpenClose, setActionDialogOpenClose] = useState(false);
    const [favMedicineList, setFavMedicineList] = useState(props.favMedicineList);
    const [patientId] = useState(props.patientId);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    const [medicationId, setMedicationId] = useState(props.medicationId);

    const handleSearchListChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));

        setState(prevState => ({
            ...prevState,
            "drugName": value
        }));
    }

    const [errorMessages, setErrorMessages] = useState({ drugName: false });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //

    useEffect(() => {

        console.info(props.medicationState)
    }, []);

    const handleRxClick = (item) => {
       
        PostDataAPI("patient/medication/getDraftMedication", item.value).then((result) => {

            if (result.success && result.data != null) {
               
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
            }

        });
        //PostDataAPI("patient/medication/getDraftMedication", item.value).then((result) => {


        //        if (result.success && result.data != null) {

        //            var startDate = null;
        //            if (result.data.medicationList[0].startTakingDatetime) {
        //                startDate = result.data.medicationList[0].startTakingDatetime.split('T')[0];
        //            }
        //            var stopDate;
        //            if (result.data.medicationList[0].stopTakingDatetime) {
        //                stopDate = result.data.medicationList[0].stopTakingDatetime.split('T')[0];
        //            }
        //            var scriptDate;
        //            if (result.data.medicationList[0].scriptDate) {
        //                stopDate = result.data.medicationList[0].scriptDate.split('T')[0];
        //            }
        //            var earlietFillDate;
        //            if (result.data.medicationList[0].earlietFillDate) {
        //                earlietFillDate = result.data.medicationList[0].earlietFillDate.split('T')[0];
        //            }


        //            setState(prevState => ({
        //                ...prevState,
        //                sigNotes: result.data.medicationList[0].sigNotes,
        //                rxnorm: result.data.medicationList[0].rxnorm,
        //                drugName: result.data.medicationList[0].drugName,
        //                dispenseQuantity: result.data.medicationList[0].dispenseQuantity,
        //                refillNumber: result.data.medicationList[0].refillNumber,
        //                appointmentId: result.data.medicationList[0].appointmentId,
        //                unitCode: result.data.medicationList[0].unitCode,
        //                daysSupply: result.data.medicationList[0].daysSupply,
        //                maxDailyDose: result.data.medicationList[0].maxDailyDose,
        //                refillAsNeeded: result.data.medicationList[0].refillAsNeeded,
        //                brandMedicallyNecessary: result.data.medicationList[0].brandMedicallyNecessary,
        //                substitutionAllowed: result.data.medicationList[0].substitutionAllowed,
        //                pharmacyNotes: result.data.medicationList[0].pharmacyNotes,
        //                dispenseAsWritten: result.data.medicationList[0].dispenseAsWritten,
        //                internalNotes: result.data.medicationList[0].internalNotes,
        //                //diagnosisId: result.data.diagnosisList[0].diagnosisId,
        //                //diagnoseName: result.data.diagnosisList[0].diagnosisName,
        //                selectedPharmacy: {
        //                    id: result.data.selectedPharmacy.id,
        //                    name: result.data.selectedPharmacy.name,
        //                    address: result.data.selectedPharmacy.address,
        //                    info: ""
        //                },
        //                supervisingProvider: result.data.supervisingProvider,

        //                medicationId: result.data.medicationList[0].medicationId,
        //                discontinueMedicine: result.data.medicationList[0].discontinueMedicine,
        //                medicineComment: result.data.medicationList[0].medicineComment,

        //                startTakingDatetime: startDate,
        //                stopTakingDatetime: stopDate,
        //                scriptDate: scriptDate,
        //                earlietFillDate: earlietFillDate,
        //                medicationStatusCode: result.data.medicationList[0].medicationStatusCode,

        //            }));
        //            setMedicationId(result.data.medicationList[0].medicationId);
        //            var _medicationList = [];
        //            _medicationList.push({ rxNorm: result.data.medicationList[0].rxnorm, drugName: result.data.medicationList[0].drugName, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

        //            setState(prevState => ({
        //                ...prevState,
        //                medicationList: _medicationList
        //            }));
        //            setState(prevState => ({
        //                ...prevState,
        //                drugName: '',
        //                diagnosisId: '',
        //                diagnoseName: ''
        //            }));
        //            //var _diagnosisList = [];
        //           
        //            //_diagnosisList.push({ diagnosisId: result.data.diagnosisList[0].diagnosisId, diagnosisName: result.data.diagnosisList[0].diagnosisName });
        //            if (result.data.diagnosisList) {
        //                setState(prevState => ({
        //                    ...prevState,
        //                    diagnosisList: result.data.diagnosisList
        //                }));




        //            }
        //            else {

        //                setState(prevState => ({
        //                    ...prevState,
        //                    sigNotes: result.data.medicationList[0].sigNotes,
        //                    rxnorm: result.data.medicationList[0].rxnorm,
        //                    drugName: result.data.medicationList[0].drugName,
        //                    startTakingDatetime: result.data.medicationList[0].startTakingDatetime,
        //                }));

        //            }


        //            console.log(state);
        //        }


        ////if (state.medicationList) {
        ////    if (state.medicationList.filter(tmprm => tmprm.rxNorm === item.value.toString() && tmprm.drugName === item.label) == "") {
        ////        state.medicationList.map((itm, i) => {

        ////            _medicationList.push({ rxNorm: itm.rxNorm, drugName: itm.drugName, alert: itm.alert, warning: itm.warning });
        ////        });

        ////    }
        ////    else {

        ////        showMessage("Error", "Medicine already exists", "error", 8000);

        ////        return;
        ////    }

        ////}
        //});






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

        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                rxnorm: '',
                drugName: ''
            }));
        }, 100);

        // To empty Search List

        if (state.medicationList) {
            if (state.medicationList.filter(tmprm => tmprm.rxNorm === id && tmprm.drugName === value) == "") {
                state.medicationList.map((itm, i) => {

                    _medicationList.push(itm);
                });

            }
            else {

                showMessage("Error", "Medicine already exists", "error", 8000);

                return;
            }

        }

        _medicationList.push({ rxNorm: id, drugName: value, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

        setState(prevState => ({
            ...prevState,
            medicationList: _medicationList
        }));

        //var _diagnosisList = state.diagnosisList;// for previous diagnosis list


        //_diagnosisList.map((subitem, i) => {
        //    debugger
        //    _diagnosisList.push({ diagnosisId: subitem.diagnosisId, diagnosisName: subitem.diagnosisName, rxNorm: id, ishidden: true });
        //});

        //setState(prevState => ({
        //    ...prevState,
        //    diagnosisList: _diagnosisList
        //}));


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

    function deleteMedicine(id, rowindex) {

        //if (state.medicationList.length === 1)
        //{
        //    showMessage("Error", "Cannot delete, at least 1 medicine is mandatory", "error", 8000);
        //    return;
        //}

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
            //debugger
            if (state.medicationList.length == 0)
                setState(prevState => ({
                    ...prevState,
                    medicationList: null
                }));

            debugger
            state.diagnosisList.map((itm, k) => {
                if (rxNormItem == itm.rxnorm)
                    state.diagnosisList.splice(k, 1);
            });

            setState(prevState => ({
                ...prevState,
                _diagnosisList: state.diagnosisList
            }));
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

    function handlingDateTypes() {
        if (state.appointmentId != null)
            state.appointmentId = parseInt(state.appointmentId);

        var _diagnosisList = [];
        var _MedicationList = [];
        state.medicationList.map((item, i) => {
            //debugger
            if (item.medPresType != "Draft") {
                _MedicationList.push({
                    rxNorm: item.rxNorm, drugName: item.drugName, alert: item.alert, warning: item.warning, patientId: state.patientId ? state.patientId : item.patientId, appointmentId: state.appointmentId ? state.appointmentId : null, encounterId: state.encounterId ? state.encounterId : null, prescribedDatetime: state.prescribedDatetime,
                    sigNotes: state.sigNotes ? state.sigNotes : null, startTakingDatetime: state.startTakingDatetime, stopTakingDatetime: state.stopTakingDatetime, medicationId: state.medicationId ? state.medicationId : item.medicationId ? item.medicationId : 0, discontinueMedicine: state.discontinueMedicine, medicineComment: state.medicineComment, medicationStatusCode: state.medicationStatusCode, MedPresType: 'Draft', dispenseQuantity: item.dispenseQuantity, unitCode: item.unitCode, refillNumber: item.refillNumber
                });
            }
            else {
                _MedicationList.push({
                    rxNorm: item.rxNorm, drugName: item.drugName, alert: item.alert, warning: item.warning, patientId: state.patientId ? state.patientId : item.patientId, appointmentId: state.appointmentId ? state.appointmentId : null, encounterId: state.encounterId ? state.encounterId : null, prescribedDatetime: item.prescribedDatetime,
                    sigNotes: item.sigNotes, startTakingDatetime: item.startTakingDatetime, stopTakingDatetime: item.stopTakingDatetime, medicationId: state.medicationId ? state.medicationId : item.medicationId ? item.medicationId : 0, 
                    discontinueMedicine: item.discontinueMedicine, medicineComment: item.medicineComment, medicationStatusCode: item.medicationStatusCode, MedPresType: item.medPresType, dispenseQuantity: item.dispenseQuantity, refillNumber: item.refillNumber, unitCode: item.unitCode
                });
            }


            if (state.diagnosisList) {

                state.diagnosisList.map((itm, i) => {

                    if (_diagnosisList.filter(tmprm => tmprm.diagnosisId == itm.diagnosisId && tmprm.diagnosisName == itm.diagnosisName) == "") {
                        _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm });
                    }
                    else {

                        _diagnosisList.push({ diagnosisId: itm.diagnosisId, diagnosisName: itm.diagnosisName, rxNorm: item.rxNorm, ishidden: true });
                    }

                });
            }

        });

        if (_diagnosisList.length > 0)
            state.diagnosisList = _diagnosisList;

        if (_MedicationList.length > 0)
            state.medicationList = _MedicationList;

    }
    const medicationValidations = (validated) => {

        if (!state.medicationList) {


            setErrorMessages(prevState => ({
                ...prevState,
                drugName: true
            }));
            validated = false;


        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                drugName: false
            }));
            validated = true;
        }

        return validated;

    }

    const Save = () => {

        var validated = true;
        //debugger
        validated = medicationValidations(validated);
        if (validated == false)
            return;

        var method = "patient/medication/addMedicationOrder";
        if (medicationId > 0) {
            method = "patient/medication/updateDraftMedication";
        }
        else {
            if (state.medicationList != null) {
                state.medicationList.map((itm, i) => {
                    if (itm.medicationId > 0) {
                        method = "patient/medication/updateDraftMedication";
                    }
                });

            }

        }
        handlingDateTypes();
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


    return (
        <>
            <div className={classes.DialogContentLeftSide}>
                <RxList onClick={(item) => handleRxClick(item)} patientId={patientId} />
            </div>
            <div className={classes.DialogContentRightSide}>
                <div className={classes.box}>
                    <div className={classes.header}>
                        <FormGroupTitle></FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars style={{ height: "580px" }}>

                            <Grid lg={12} container direction="row">

                                <Label title="Medicine" size={2} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >
                                    <SearchList
                                        name="rxnorm"
                                        value={state.rxnorm}
                                        searchTerm={state.drugName}
                                        code="drugs"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search Drug"
                                        onChangeValue={(name, item) => handleDrugChange(name, item)} />

                                    {errorMessages.drugName && (!state.medicationList || state.medicationList.length === 0) ? (<FormHelperText style={{ color: "red" }} >
                                        Please select at least one medicine
                                    </FormHelperText>) : ('')}

                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid item xs={2} sm={2} md={2} lg={2} />
                                <Grid item xs={9} sm={9} md={9} lg={9}>
                                    <Typography className={classes.medicineSearchNote}>
                                        Create a multiple-medication order by clicking Patient Rx List or Provider Rx List at left,
                                        or by searching for a new  medication above.
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={9} md={9} lg={9} >
                                    <ul className={classes.medicineList}>
                                        {
                                            state.medicationList ?
                                                state.medicationList.map((itm, i) => {
                                                    return (
                                                        <li>
                                                            <div style={{ display: "block" }}>
                                                                <Typography className={classes.listItemName}>{itm.drugName}</Typography>
                                                                <span className={classes.listCrossButton} onClick={() => deleteMedicine(itm.rxNorm, i)}><AddIcon /></span>
                                                                <Alert
                                                                    severity="error"
                                                                    classes={{ root: classes.alertRoot }} >
                                                                    Alert : {itm.alert ? itm.alert : 'No drug and allergy alerts triggered for this medication.'}
                                                                </Alert>
                                                                <Alert
                                                                    severity="warning"
                                                                    classes={{ root: classes.alertRoot }} >
                                                                    Unknown - : {itm.warning ? itm.warning : 'No active or valid coverage found.'}
                                                                </Alert>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                                : null
                                        }
                                    </ul>
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
                                                        item.ishidden ?
                                                            "" : <li key={item.diagnosisId}>
                                                                {item.diagnosisName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosis(item.diagnosisId, j)}><AddIcon /></span>

                                                                {/* <span className={classes.deleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteDiagnosis(item.diagnosisId, j)} /></span> */}
                                                            </li>

                                                    ))
                                                    : null
                                            }
                                        </ul>
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
                                    <FormBtn id={"reset"} onClick={handleClose} size="medium" >Cancel</FormBtn>
                                    {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> :
                                        <FormBtn id={"save"} size="medium" onClick={Save}>Save</FormBtn>
                                    }
                                    <FormBtn id={"save"} size="medium" onClick={() => handleNext(state)} btnType="next">Next</FormBtn>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <Dialog
                PaperComponent={DraggableComponent}
                open={actiondialogOpenClose}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown  {...props}>
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    <ErrorOutlineIcon className={classes.UpdateIcon} />
                    <Typography>Medication already exists on the chart</Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText className={classes.dialogMessage}>
                        The medication you are adding to this prescription already exists
                        on the patient chart, If you want to associate this prescription to
                        one of those medications on the patient chart, click “Use this”,
                        Otherwise click “Add” to add a new medication for this prescription.
                    </DialogContentText>
                    <FormGroupTitle></FormGroupTitle>
                    <div className={classes.selectedPharmacy}>
                        <FormLabel className={classes.selectedPharmacyName}>South Manatee Hospital</FormLabel>
                        <Typography className={classes.pharmacyAddress}>
                            1400 Tennessee St. San Franscisco, CA(415) 214-8611    Fax (415) 484-7058
                        </Typography>
                        <Button size="small" className={classes.changePharmacyButton}>Use this</Button>
                        <Typography className={classes.pharmacyInfo}>Retails  | Controled Substances</Typography>
                    </div>
                    <FormGroupTitle></FormGroupTitle>
                </DialogContent>
                <DialogActions className={classes.dialogactions}>
                    <Grid justify="flex-end" alignItems="flex-end" lg={12} container direction="row">
                        <FormBtn id="reset" onClick={() => setActionDialogOpenClose(false)}>
                            Cancel
                        </FormBtn>
                        <FormBtn id="save" onClick={() => alert("ok")}>
                            Add
                        </FormBtn>

                    </Grid>
                </DialogActions>
            </Dialog>
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
export default withSnackbar(MedicineSearch)
