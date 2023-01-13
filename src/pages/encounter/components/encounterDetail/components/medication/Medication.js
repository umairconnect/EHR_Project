import React, { useState, useEffect } from "react";
import EditIcon from '../../../../../../images/icons/editIcon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AddIcon from "../../../../../../images/icons/add-icon.png";

import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { withSnackbar } from '../../../../../../components/Message/Alert'
import MedicationForm from "../../../../../patients/component/medication/component/MedicationForm";

// styles
import useStyles from "./styles";

function Medication(props) {

    var classes = useStyles();
    // const [disabled, setDisabled] = useState(false);
    const [isEditable] = useState(props.isEditable);
    const [showMedicationFrom, setShowMedicationFrom] = useState(false);
    const [editMedicationFrom, setEditMedicationFrom] = useState(false);

    const [listActiveDupData, setListActiveDupData] = useState([]);
    const [listPastMedData, setListPastMedData] = useState([]);
    const [listActiveMedData, setListActiveMedData] = useState([]);
    const { showMessage } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [medicationId, setMedicationId] = useState(0);
    const [patientId, setPatientId] = useState(props.patientId);
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    const [patientAppointmentId, setPatientAppointmentId] = useState(props.patientAppointmentId);
    useEffect(() => {
        initialization();
    }, []);
    const initialization = (validated) => {
        loadActiveMedications();
        loadPastMedications();
    }

    const editPatMedication = (item) => {
        setMedicationId(item.medicationId);
        setEditMedicationFrom(true)
        setIsEdit(true);
    }

    const showMedicationDialog = () => {
        setShowMedicationFrom(true)
        setMedicationId(0);
    }
    const handleCloseMedicationForm = () => {
        setShowMedicationFrom(false);
        setEditMedicationFrom(false);
        loadActiveMedications();
        loadPastMedications();
    }
    const handleCloseEditMedicationForm = () => {
        setShowMedicationFrom(false);
        setEditMedicationFrom(false);
        loadActiveMedications();
        loadPastMedications();
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        setShowMedicationFrom(false);
        setEditMedicationFrom(false);
        loadActiveMedications();
        loadPastMedications();
    }

    const loadActiveMedications = () => {
        var id = props.isEncounterSpecific ? props.encounterId : patientId;
        var _api = props.isEncounterSpecific ? 'patient/medication/loadActiveMedicationGridByEncId'
            : 'patient/medication/loadActiveMedicationGrid';
        PostDataAPI(_api, parseInt(id)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                let dupList = result.data.map((r) => r.drugName).reduce((acc, curr) => {
                    if (acc[curr]) {

                        acc[curr]++;
                    }
                    else {
                        acc[curr] = 1;
                    }

                    return acc;
                }, {})
                setListActiveDupData(dupList);
                const lastFour = result.data.slice(-4);
                setListActiveMedData(lastFour);

            }
        })
    }

    const loadPastMedications = () => {
        var id = props.isEncounterSpecific ? props.encounterId : patientId;
        var _api = props.isEncounterSpecific ? 'patient/medication/loadPastMedicationGridByEncId'
            : 'patient/medication/loadPastMedicationGrid';
        PostDataAPI(_api, parseInt(id)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                const lastFour = result.data.slice(-4);
                setListPastMedData(lastFour);

            }
        })
    }

    return (
        <>
            <div className={classes.listTitle} >
                <span>Medication</span>
                {!props.disabled ?
                    <span className={classes.addNew} title="Add Medication">{isEditable ? <img src={AddIcon} onClick={showMedicationDialog} alt="Add New" />:''}</span>
                    : ""}
            </div>

            <div className={classes.listSubChild}>

                {props.isEncounterSpecific ?
                    <>
                        <ul className={classes.treeView}>
                            {listActiveMedData.length > 0 ?
                                <>
                                    {
                                        listActiveMedData.map((item, i) => (
                                            (listActiveDupData[item.drugName] > 1) ?
                                                <>
                                                    {
                                                        <li>
                                                            <div className={classes.treeContent}>
                                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}
                                                                    <span style={{ color: "#F2994A" }}> (Duplicate) </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        <li>
                                                            <div className={classes.treeContent}>
                                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}</div>
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                        ))
                                    }
                                </>
                                : ''
                            }
                        </ul>
                        <ul className={classes.treeView}>
                            {listPastMedData.length > 0 ?
                                <>{
                                    listPastMedData.map((item, i) => (
                                        <li className={classes.treeViewLi}>
                                            <div className={classes.treeContent}>
                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"} </div>
                                            </div>
                                        </li>
                                    ))
                                }</>
                                : ''
                            }
                        </ul>
                        {listPastMedData.length <= 0 && listActiveMedData.length <=0 ? <div className={props.disabled ? classes.DisnoRecord : classes.noRecord}>Patient has no medicines</div> :''}
                    </>


                    :

                    <>
                        <div className={classes.activeTitleArea}>
                            <span>Active</span>
                        </div>
                        <ul className={classes.treeView}>
                            {listActiveMedData.length > 0 ?
                                <>
                                    {
                                        listActiveMedData.map((item, i) => (
                                            (listActiveDupData[item.drugName] > 1) ?
                                                <>
                                                    {
                                                        <li>
                                                            <div className={classes.treeContent}>
                                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}
                                                                    <span style={{ color: "#F2994A" }}> (Duplicate) {item.encounterId == encounterId ? ' ✔️  ' : ''}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        <li>
                                                            <div className={classes.treeContent}>
                                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"} {item.encounterId == encounterId ? ' ✔️ ' : ''}</div>
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                        ))
                                    }
                                </>
                                : <div className={props.disabled ? classes.DisnoRecord : classes.noRecord}>Patient has no active medicines</div>
                            }
                        </ul>
                        <div className={classes.activeTitleArea}>
                            <span>In Active</span>
                        </div>
                        <ul className={classes.treeView}>
                            {listPastMedData.length > 0 ?
                                <>{
                                    listPastMedData.map((item, i) => (
                                        <li className={classes.treeViewLi}>
                                            <div className={classes.treeContent}>
                                                <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                                <div onClick={!props.disabled ? () => editPatMedication(item) : ''} className={props.disabled ? classes.DistreeLabel : classes.treeLabel} style={{ cursor: "pointer" }}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"} {item.encounterId == encounterId ? ' ✔️ ' : ''}</div>
                                            </div>
                                        </li>
                                    ))
                                }</>
                                : <div className={props.disabled ? classes.DisnoRecord : classes.noRecord}>Patient has no past medicines</div>
                            }
                        </ul>
                    </>
                }

               
            </div>
            {

                showMedicationFrom ? (<MedicationForm
                    patientId={patientId}
                    medicationId={medicationId}
                    patientAppointmentId={patientAppointmentId}
                    encounterId={encounterId}
                    dialogOpenClose={showMedicationFrom}
                    handleClose={() => handleCloseMedicationForm()}
                    isEditable={ isEditable}
                    handleSuccess={handleDialogSuccess} />)
                    : ('')


            }

            {
                editMedicationFrom ? (<MedicationForm
                    patientId={patientId}
                    medicationId={medicationId}
                    patientAppointmentId={patientAppointmentId}
                    encounterId={encounterId}
                    dialogOpenClose={editPatMedication}
                    isEdit={isEdit}
                    isEditable={isEditable}
                    handleClose={() => handleCloseEditMedicationForm()}
                    handleSuccess={handleDialogSuccess} />)
                    : ('')
            }
        </>

    );
}
export default withSnackbar(Medication)

