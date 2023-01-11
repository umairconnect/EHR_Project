import React, { useState, useEffect } from "react";
import {
    Button,
    ButtonGroup,
    IconButton,
    FormLabel
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from "react-router-dom";

import SaveIcon from '../../images/icons/saveIcon.png';
import SignIcon from '../../images/icons/signIcon.png';
import PrintIcon from '../../images/icons/printIconBig.png';

import { ActionDialog } from "../../components/ActionDialog/ActionDialog"

import PageTitle from '../../components/PageTitle';
import EncountersList from './components/encountersList/EncountersList';
import Profile from "../patients/component/Profile/Profile";
import EncounterDetail from "./components/encounterDetail/EncounterDetail";

import EditIcon from '../../images/icons/editIcon.png';
import SettingIcon from '../../images/BtnIcon.png'
import Allergies from './components/encounterDetail/components/allergies/Allergies';
import Diagnosis from './components/encounterDetail/components/diagnosis/Diagnosis';
import History from './components/encounterDetail/components/history/History';
import Medication from './components/encounterDetail/components/medication/Medication';
import Immunizations from './components/encounterDetail/components/immunizations/Immunizations';


import ChiefComplaint from './components/encounterDetail/components/chiefComplaint/ChiefComplaint';
import PhysicalExam from './components/encounterDetail/components/physicalExam/PhysicalExam';
import Procedure from './components/encounterDetail/components/procedure/Procedure';
import ReviewOfSystem from './components/encounterDetail/components/reviewOfSystem/ReviewOfSystem';
import HPI from './components/encounterDetail/components/hPI/HPI';
import CarePlan from './components/encounterDetail/components/carePlan/CarePlan';
import CheckoutNotes from './components/encounterDetail/components/checkoutNotes/CheckoutNotes';
import ChartNotes from './components/encounterDetail/components/chartNotes/ChartNotes';
import CognitiveStatus from './components/encounterDetail/components/cognitiveStatus/CognitiveStatus';
import PatientInstructionPlanOfCare from './components/encounterDetail/components/patientInstructionPlanOfCare/PatientInstructionPlanOfCare';
import OfficeTests from './components/encounterDetail/components/officeTests/OfficeTests';
import LabImagingOrder from './components/encounterDetail/components/labimagingorder/LabImagingOrder';
import VitalSigns from './components/encounterDetail/components/vitalSigns/VitalSigns';
import FunctionalStatus from "./components/encounterDetail/components/functionalStatus/FunctionalStatus";
import TranslationDocuments from "./components/encounterDetail/components/translationDocuments/TranslationDocuments";
import Referral from "./components/encounterDetail/components/referral/Referral";
import Addendum from "./components/encounterDetail/components/addendum/Addendum";
import SuperBill from "./components/encounterDetail/components/superBill/SuperBill";
import ScreeningInterventions from './components/encounterDetail/components/screeningInterventions/ScreeningInterventions';
import { GetUserInfo } from '../../Services/GetUserInfo';
import SoapChiefComplaint from "./soapComponents/cheifComplaint/chiefComplaint";
import SoapHealthConcern from "./soapComponents/healthconcern/soapHealthConcern";
import SoapSubjectiveNotes from "./soapComponents/subjectiveNotes/soapSubjectiveNote";
import SoapObjectiveNotes from "./soapComponents/objectiveNotes/soapObjectiveNotes";
import SoapAssessment from "./soapComponents/assessment/soapAssessment";
import SoapPlan from "./soapComponents/plan/soapPlan";
import SoapCaraPlan from "./soapComponents/carePlan/soapCarePlan";
import SoapTranslationDocument from "./soapComponents/translateDocument/soapTranslationDocument"
import QualityOfCare from "./soapComponents/qualityOfCare/qualityOfCare"
import SoapReferral from "./soapComponents/referral/soapReferral"
import SoapSuperBill from "./soapComponents/soapSuperBill/soapSuperBill"
import {printReport } from '../../components/Common/Extensions';

// styles
import useStyles from "./styles";

import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from '../../components/Message/Alert'
import SummaryOptions from "./components/summaryOptions/SummaryOptions";
import { IsEditable } from '../../Services/GetUserRolesRights';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function Encounter(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isLoading, setIsLoading] = useState(false);
    let propsData = [];
    let isNull = false;

    let clinic = '';
    let aapEnc = 0;
    let ulId = props.ulId != undefined ? props.ulId : 0;
    let pId = props.pId != undefined ? props.pId : 0;
    let appId = props.appId != undefined ? props.appId : 0;
    if (props.location != undefined) {
        if (props.location.search != undefined && props.location.search != null && props.location.search != "") {
            propsData = props.location.search.split('=')[1].split('/');
        }
        else {
            isNull = true;
        }
        clinic = !props.location.state ? '' : JSON.parse(props.location.state).clinicalNotes;

        aapEnc = !props.location.encounterId ? 0 : props.location.encounterId;
        ulId = isNull ? 0 : propsData[0];
        pId = isNull ? 0 : propsData[1];
        appId = isNull ? 0 : propsData[2];
    }

    const [providerId, setProviderId] = useState(0);
    const [encounterTypeId, setEncounterTypeId] = useState(0);

    const [isEditable, setIsEditable] = useState(IsEditable("Schedule"));

    const [addendumDialogState, setAddendumDialogState] = useState(false);
    const [userLocationID, setUserLocationID] = useState(ulId);
    const [patientId, setPatientId] = useState(pId);
    const [patientAppointmentId, setPatientAppointmentId] = useState(appId);
    const [signed, setSigned] = useState(false);
    const [expandProfile, setExpandProfile] = useState(true);
    const [encounterId, setEncounterId] = useState(0);
    const [chiefUpdate, setChiefUpdate] = useState();
    const [updateSigned, setUpdateSigned] = useState(0);
    const [updateEncList, setUpdateEncList] = useState(false);
    const [signedCreatedByName, setSignedCreatedByName] = useState([]);
    const [clinicalEncounterId, setClinicalEncounterId] = useState(aapEnc);
    const [updateSummaryId, setUpdateSummaryId] = useState(false);

    const [patientName, setPatientName] = useState('');
    const [openEncounterDialog, setOpenEncounterDialog] = useState(false);

    const [soapComponents, setSoapComponents] = useState(true)
    const [soapComponentSettings, setSoapComponentSettings] = useState([])
    //const [encounterTypeId] = useState(1);

    //SummaryOption Dialog ShowHide State
    const [showHideSummaryOptionDialog, setShowHideSummaryOptionDialog] = useState(false);
    //SummaryOptions states
    const [encComponents, setEncComponents] = useState([]);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const initComponents = () => {
        setEncComponents([
            { name: "Allergies", id: "allergies", order: 1, alignment: "left", isActive: true },
            { name: "Diagnosis", id: "diagnosis", order: 2, alignment: "left", isActive: true },
            { name: "History", id: "history", order: 3, alignment: "left", isActive: true },
            { name: "Medication", id: "medication", order: 4, alignment: "left", isActive: true },
            { name: "Immunization", id: "immunization", order: 5, alignment: "left", isActive: true },
            { name: "Chief Complaint", id: "chiefComplaint", order: 6, alignment: "right", isActive: true },
            { name: "Vitals", id: "vitals", order: 7, alignment: "right", isActive: true },
            { name: "ReviewOfSystem", id: "reviewOfSystem", order: 8, alignment: "right", isActive: true },
            { name: "PhysicalExam", id: "physicalExam", order: 9, alignment: "right", isActive: true },
            { name: "Procedure", id: "procedure", order: 10, alignment: "right", isActive: true },
            { name: "LabOrder", id: "labOrder", order: 11, alignment: "right", isActive: true },
            { name: "CheckoutNotes", id: "checkoutNotes", order: 12, alignment: "right", isActive: true },
            { name: "ChartNotes", id: "chartNotes", order: 13, alignment: "right", isActive: true },
            { name: "CarePlan", id: "carePlan", order: 14, alignment: "right", isActive: true },
            { name: "PatientInstructions", id: "patientInstructions", order: 15, alignment: "right", isActive: true },
            { name: "CognitiveStatus", id: "cognitiveStatus", order: 16, alignment: "right", isActive: true },
            { name: "FunctionalStatus", id: "functionalStatus", order: 17, alignment: "right", isActive: true },
            { name: "TranslationDocuments", id: "translationDocuments", order: 18, alignment: "right", isActive: true },
            { name: "Referral", id: "referral", order: 19, alignment: "right", isActive: true },
            { name: "Addendum", id: "addendum", order: 20, alignment: "right", isActive: true },
            { name: "Super Bill", id: "superBill", order: 21, alignment: "right", isActive: true }
        ]);
    }
    //console.log(signedCreatedByName.createdBy);

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

    function getEncounterType(encounterId) {

        PostDataAPI("encounter/getEncounterById", encounterId).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.encounterType == "SOAP") {
                    setSoapComponents(true);
                } else {
                    setSoapComponents(false);
                }
            }
        })
    }

    const loadSelectedEncounter = (encId, signed, parProviderId, encTypeId) => {
        getEncounterType(encId);
        setEncounterId(encId);
        var objData = { providerId: parseInt(parProviderId), encounterTypeId: parseInt(encTypeId) };
        setIsLoading(true)
        PostDataAPI("encountersetting/loadData", objData).then((result) => {

            if (result.success && result.data != null) {
                setEncComponents(result.data);
            }
            setProviderId(parProviderId);
            setSigned(signed == 1);
            //setEncounterId(encId);
            setEncounterTypeId(encTypeId);
            showSignedAndCreatedBy(encId);
            setIsLoading(false)
        });
        //if (parProviderId != providerId) {
        //    var objData = { providerId: parseInt(providerId), encounterTypeId: parseInt(encTypeId) };
        //    PostDataAPI("encountersetting/loadData", objData).then((result) => {
        //        if (result.success && result.data != null) {
        //           
        //            setEncComponents(result.data);
        //        }
        //        setProviderId(parProviderId);
        //        setSigned(signed == 1);
        //        //setEncounterId(encId);
        //        setEncounterTypeId(encTypeId);
        //        showSignedAndCreatedBy(encId);
        //    });
        //}
        //else {
        //    setSigned(signed == 1);
        //    //setEncounterId(encId);
        //    setEncounterTypeId(encTypeId);
        //    showSignedAndCreatedBy(encId);
        //}

        saveUserAuditLog(encId);
    }

    function saveUserAuditLog(encId) {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(encId),
            area: "Encounter details",
            activity: "Load encounter details",
            details: "User viewed encounter details screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const updateChief = (e) => {
        setChiefUpdate(e);
    }

    const printPatientEncounter = () => {
        var reportUrl = "%2freports%2fclinical%2fclinical_patient_chart_notes&rs:Command=Render&rc:Parameters=false";
        var _patientId = "&patient_id=" + patientId;
        var _encounterId = "&encounter_id=" + encounterId;
        var _parameters = _patientId + _encounterId;
        printReport(reportUrl, _parameters);
    }

    const signEncounter = (e) => {

        ShowActionDialog(true, "Sign", "Are you sure, you want to sign this encounter?", "confirm", function () {

            var param = {
                encounterID: parseInt(encounterId)
            }
            PostDataAPI("encounter/signEncounter", param, true).then((result) => {

                if (result.success) {
                    if (result.message == "Encounter signed successfully") {
                        showMessage("Success", result.message, "success", 2000);
                    }
                    else {
                        showMessage("Warning", result.message, "warning", 2000);
                    }
                    setUpdateSigned(encounterId);
                    updateEncounterlist();
                }
                else {

                    showMessage('Error', result.message, 3000);
                }
            });
        });
    }

    function showSignedAndCreatedBy(patEncounterId) {
        var params = {
            code: "encounter_signedby",
            parameters: [patEncounterId ? patEncounterId.toString() : "", pId ? pId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null && result.data.length > 0) {
                setSignedCreatedByName(result.data[0]);
            }
        })
    }
    const [isUpdate, setIsUpdate] = useState(false);
    const update = () => setIsUpdate(!isUpdate);
    const saveSummaryOptions = (itemsList) => {
        setEncComponents(itemsList);
        setShowHideSummaryOptionDialog(false);
        update();
    }

    const openProfile = () => {
        setExpandProfile(false);
    }

    const updateEncounterlist = () => {
        setUpdateEncList(!updateEncList);
    }
    const getPatientName = (patienName) => { setPatientName(patienName) }
    const getDialogEncounterOpen = (getValue) => {
        setOpenEncounterDialog(getValue)
    }
    const getCloseEncounterDialog = (getValue) => {
        setOpenEncounterDialog(getValue)
    }
    const [collapseToggle, setCollapseToggle] = useState(false);

    const toggleCollapseFun = () => {
        if (collapseToggle === true) {
            setCollapseToggle(false)
        } else {
            setCollapseToggle(true)
        }

    }

    return (
        <>
            {props.claim === undefined && props.claim != true ?
                <PageTitle title="Encounter" button={
                    <Button
                        size="small"
                        className={classes.newAddBtn}
                        startIcon={< ArrowBackIosIcon />}
                    >

                        {clinic != undefined && clinic == "clinical" ? <Link
                            className={classes.btnLink}
                            to={{
                                pathname: '/app/clinical',
                                search: '',
                                state: 'newListclinical',
                            }}>Back to Clinical Notes</Link> :
                            <Link
                                className={classes.btnLink}
                                to={{
                                    pathname: '/app/schedule',
                                    search: '',
                                    state: "newList",
                                }}>Back to Appt. List</Link>
                        }
                    </Button>
                }
                /> : null}

            <div className={classes.container}>
                {openEncounterDialog ?
                    <EncountersList
                        openProfile={openProfile}
                        update={updateEncList}
                        // patientName={''}
                        patientId={patientId}
                        userUpdate={chiefUpdate}
                        updateSigned={updateSigned}
                        onClickList={loadSelectedEncounter}
                        patientAppointmentId={patientAppointmentId}
                        encId={encounterId}
                        patientName={patientName}
                        isOpenEncounterDialog={openEncounterDialog}
                        closeEncounterDialog={getCloseEncounterDialog}
                    />
                    : <EncountersList
                        openProfile={openProfile}
                        update={updateEncList}
                        // patientName={''}
                        patientId={patientId}
                        userUpdate={chiefUpdate}
                        updateSigned={updateSigned}
                        onClickList={loadSelectedEncounter}
                        patientAppointmentId={patientAppointmentId}
                        encId={encounterId}
                        patientName={patientName}

                    />}
                <div className={classes.centent}>

                    {addendumDialogState == true ? <Addendum updateAddendum={updateEncounterlist} encounterId={encounterId} showHideDialog={addendumDialogState} handleClose={() => setAddendumDialogState(false)} /> : null}
                    {expandProfile || !expandProfile ?
                        <Profile isExpand={expandProfile} dataId={patientId} encounterId={encounterId} getPatientName={(patienName) => setPatientName(patienName)} patientAppointmentId={patientAppointmentId} dialogEncounterOpen={getDialogEncounterOpen} isEditable={isEditable} />
                        : null
                    }
                    {(encounterTypeId > 0 && showHideSummaryOptionDialog == true) ? <SummaryOptions
                        saveSummary={(itemorderState, itemLeftList, itemRightList, itemsState) => saveSummaryOptions(itemorderState, itemLeftList, itemRightList, itemsState)}
                        showHideDialog={showHideSummaryOptionDialog}
                        handleClose={() => setShowHideSummaryOptionDialog(false)}
                        updateSummary={updateSummaryId}
                        providerId={providerId}
                        encounterTypeId={encounterTypeId}
                        isEditable={isEditable}
                        soapComponents={soapComponents} />:''}
                   
                    {encounterId > 0 ?
                        <>
                            <div className={classes.cententArea}>
                                <div className={collapseToggle? classes.CollapseLeftToggle : classes.cententLeft}>
                                    <div >
                                        {encComponents.filter(item => item.isActive == true && item.alignment == "left").sort((a, b) => a.order - b.order).map((box) =>
                                            box.componentCode === "allergies" ? <Allergies disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                box.componentCode === "diagnosis" ? <Diagnosis disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                    box.componentCode === "history" ? <History disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                        box.componentCode === "medication" ? <Medication disabled={signed} patientId={patientId} patientAppointmentId={patientAppointmentId} encounterId={encounterId} isEditable={isEditable} /> :
                                                            box.componentCode === "immunization" ? <Immunizations disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable}/> :
                                                                box.componentCode === "chiefComplaint" ?
                                                                    <div className={classes.listSubChild} >
                                                                        <ChiefComplaint disabled={signed} encounterId={encounterId} patientId={patientId} updateChiefId={updateChief}  />
                                                                    </div> :
                                                                    box.componentCode === "vitals" ? <VitalSigns disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                        box.componentCode === "reviewOfSystem" ? <ReviewOfSystem disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                            box.componentCode === "physicalExam" ? <PhysicalExam disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                box.componentCode === "procedure" ? <Procedure disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                    box.componentCode === "labOrder" ? <OfficeTests disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                        box.componentCode === "imagingOrder" ? <LabImagingOrder disabled={signed} encounterId={encounterId} patientId={patientId} imagingOrder={true} /> :
                                                                                        box.componentCode === "checkoutNotes" ? <CheckoutNotes disabled={signed} encounterId={encounterId} patientId={patientId} patientAppointmentId={patientAppointmentId} /> :
                                                                                            box.componentCode === "chartNotes" ? <ChartNotes disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                box.componentCode === "carePlan" ? <CarePlan disabled={signed} encounterId={encounterId} patientId={patientId} userLocationId={ulId} /> :
                                                                                                    box.componentCode === "patientInstructions" ? <PatientInstructionPlanOfCare disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                        box.componentCode === "cognitiveStatus" ? <CognitiveStatus disabled={signed} encounterId={encounterId} /> :
                                                                                                            box.componentCode === "functionalStatus" ? <FunctionalStatus disabled={signed} encounterId={encounterId} /> :
                                                                                                                box.componentCode === "translationDocuments" ? <TranslationDocuments disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                                    box.componentCode === "referral" ? <Referral disabled={signed} encounterId={encounterId} patientId={patientId} isEditable={isEditable} /> :
                                                                                                                        box.componentCode === "superBill" ? <SuperBill disabled={!signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                                            box.componentCode === "addendum" && signed ? <Addendum updateAddendum={updateEncounterlist} disabled={!signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                                                box.componentCode === "allergies_soap" ? <Allergies disabled={signed} patientId={patientId} /> :
                                                                                                                                    box.componentCode === "diagnosis_soap" ? <Diagnosis disabled={signed} patientId={patientId} encounterId={encounterId} /> :
                                                                                                                                        box.componentCode === "history_soap" ? <History disabled={signed} patientId={patientId} /> :
                                                                                                                                            box.componentCode === "medication_soap" ? <Medication disabled={signed} patientId={patientId} patientAppointmentId={patientAppointmentId} encounterId={encounterId} /> :
                                                                                                                                                box.componentCode === "immunization_soap" ? <Immunizations disabled={signed} patientId={patientId} encounterId={encounterId}/>
                                                                                                                                                    : ""
                                        )}
                                    </div>
                                </div>
                                <div className={soapComponents? classes.soapCententRight : classes.cententRight}>
                                    <IconButton onClick={() => setShowHideSummaryOptionDialog(true)} className={classes.settingBtnIcon} ><img src={SettingIcon} /></IconButton>
                                    <ButtonGroup className={classes.headerGroupBtn} color="default" aria-label="contained button group">
                                        {/*   <Button startIcon={<img className={classes.BtnIcon} src={SaveIcon} />}>Save</Button> */}
                                        {signed == false ?
                                            <Button startIcon={<img className={classes.BtnIcon} src={SignIcon} />} onClick={() => signEncounter()}>Sign</Button>
                                            : null
                                        }
                                        <Button startIcon={<img className={classes.BtnIcon} src={PrintIcon} />}
                                            onClick={() => printPatientEncounter()}
                                        >Print</Button>

                                    </ButtonGroup>
                                    <div className={soapComponents? classes.createdByInfoAreaSoap : classes.createdByInfoArea}>
                                        <span style={{ display: "block" }}>
                                            <FormLabel className={classes.createdByHeading}>Note Created by:</FormLabel>
                                            <FormLabel className={classes.createdByText}>{signedCreatedByName ? signedCreatedByName.text2 : ""} </FormLabel>
                                        </span>
                                        <span style={{ display: "block" }}>
                                            <FormLabel className={classes.createdByHeading}>Signed by:</FormLabel>
                                            <FormLabel className={classes.createdByText}>{signedCreatedByName ? signedCreatedByName.text1 : ""} </FormLabel>
                                        </span>
                                    </div>


                                    {encComponents.filter(item => item.alignment == "right" && item.isActive == true).sort((a, b) => a.order - b.order).map((box) =>
                                        box.componentCode === "allergies" ? <Allergies disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                            box.componentCode === "diagnosis" ? <Diagnosis disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                box.componentCode === "history" ? <History disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                    box.componentCode === "medication" ? <Medication disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                        box.componentCode === "immunization" ? <Immunizations disabled={signed} patientId={patientId} encounterId={encounterId} isEditable={isEditable} /> :
                                                            box.componentCode === "chiefComplaint" ?
                                                                <div className={classes.listSubChild} >
                                                                    <ChiefComplaint disabled={signed} encounterId={encounterId} patientId={patientId} updateChiefId={updateChief} />
                                                                </div> :
                                                                box.componentCode === "vitals" ? <VitalSigns disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                    box.componentCode === "reviewOfSystem" ? <ReviewOfSystem disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                        box.componentCode === "physicalExam" ? <PhysicalExam disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                            box.componentCode === "procedure" ? <Procedure disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                box.componentCode === "labOrder" ? <OfficeTests disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                box.componentCode === "imagingOrder" ? <LabImagingOrder disabled={signed} encounterId={encounterId} patientId={patientId} imagingOrder={true} /> :
                                                                                    box.componentCode === "checkoutNotes" ? <CheckoutNotes disabled={signed} encounterId={encounterId} patientId={patientId} patientAppointmentId={patientAppointmentId} /> :
                                                                                        box.componentCode === "chartNotes" ? <ChartNotes disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                            box.componentCode === "carePlan" ? <CarePlan disabled={signed} encounterId={encounterId} patientId={patientId} userLocationId={ulId} /> :
                                                                                                box.componentCode === "patientInstructions" ? <PatientInstructionPlanOfCare disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                    box.componentCode === "cognitiveStatus" ? <CognitiveStatus disabled={signed} encounterId={encounterId} /> :
                                                                                                        box.componentCode === "functionalStatus" ? <FunctionalStatus disabled={signed} encounterId={encounterId} /> :
                                                                                                            box.componentCode === "translationDocuments" ? <TranslationDocuments disabled={signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                                box.componentCode === "referral" ? <Referral disabled={signed} encounterId={encounterId} patientId={patientId} isEditable={isEditable} /> :
                                                                                                                    box.componentCode === "superBill" ? <SuperBill disabled={!signed} encounterId={encounterId} patientId={patientId} /> :
                                                                                                                        box.componentCode === "screeningInterventions" ? <ScreeningInterventions disabled={signed} patientAppointmentId={patientAppointmentId} encounterId={encounterId} /> :
                                                                                                                            box.componentCode === "addendum" && signed ? <Addendum updateAddendum={updateEncounterlist} disabled={!signed} encounterId={encounterId} patientId={patientId} /> : 
                                                                                                                                box.componentCode == "chief_complaint_soap" ? <SoapChiefComplaint isUpdate={isUpdate} disabled={signed} encounterId={encounterId} patientId={patientId} updateChiefId={updateChief} isExpand={true} ></SoapChiefComplaint> :
                                                                                                                                    box.componentCode == "health_concerns_soap" ? <SoapHealthConcern isUpdate={isUpdate} disabled={signed} patientId={patientId} isExpand={true}></SoapHealthConcern> :
                                                                                                                                        box.componentCode == "subjective_soap" ? <SoapSubjectiveNotes isUpdate={isUpdate} disabled={signed} encounterId={encounterId} isExpand={true} subComponent={box.childs}></SoapSubjectiveNotes> :
                                                                                                                                            box.componentCode == "objective_soap" ? <SoapObjectiveNotes isUpdate={isUpdate} encounterId={encounterId} patientAppointmentId={patientAppointmentId} isExpand={true} subComponent={box.childs} patientId={patientId} disabled={signed}></SoapObjectiveNotes> :
                                                                                                                                                box.componentCode == "assessment_soap" ? <SoapAssessment isUpdate={isUpdate} disabled={signed} encounterId={encounterId} patientId={patientId} isExpand={true} subComponent={box.childs}></SoapAssessment> :
                                                                                                                                                    box.componentCode == "plan_soap" ? <SoapPlan isUpdate={isUpdate} encounterId={encounterId} isExpand={true} subComponent={box.childs} disabled={signed} patientId={patientId} patientAppointmentId={patientAppointmentId}></SoapPlan> :
                                                                                                                                                        box.componentCode == "care_plan_soap" ? <SoapCaraPlan isUpdate={isUpdate} disabled={signed} encounterId={encounterId} patientId={patientId} userLocationId={ulId} isExpand={true}></SoapCaraPlan> :
                                                                                                                                                            box.componentCode == "documents_attached_to_encounter_soap" ? <SoapTranslationDocument isUpdate={isUpdate} disabled={signed} encounterId={encounterId} patientId={patientId} isExpand={true}></SoapTranslationDocument> :
                                                                                                                                                                box.componentCode == "quality_of_care_soap" ? <QualityOfCare isUpdate={isUpdate} disabled={signed} encounterId={encounterId} isExpand={true}></QualityOfCare> :
                                                                                                                                                                    box.componentCode == "referral_soap" ? <SoapReferral isUpdate={isUpdate} disabled={signed} encounterId={encounterId} patientId={patientId} isEditable={isEditable} isExpand={true}></SoapReferral> :
                                                                                                                                                                        box.componentCode == "superbill_soap" ? <SoapSuperBill isUpdate={isUpdate} disabled={!signed} encounterId={encounterId} patientId={patientId} isExpand={true}></SoapSuperBill> : ''


                                    
                                    )}

                                        {collapseToggle ?
                                            <ChevronRightIcon className={classes.toggleButton} onClick={toggleCollapseFun} />
                                            :

                                            <ChevronLeftIcon className={classes.toggleButton} onClick={toggleCollapseFun} />
                                        }
                                  

                                </div>
                            </div>
                        </>
                        : ""
                    }
                </div>
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
            </div>
        </>

    );
}
export default withSnackbar(Encounter)
