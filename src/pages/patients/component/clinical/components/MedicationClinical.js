import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import MedicationForm from "../../../../patients/component/medication/component/MedicationForm";
import { withSnackbar } from '../../../../../components/Message/Alert'

function MedicationClinical({ patientId, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    const [addHConcern, setAddHConcern] = useState(false);
    const [listActiveMedData, setListActiveMedData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [listActiveDupData, setListActiveDupData] = useState([]);
    const [listPastMedData, setListPastMedData] = useState([]);
    const [showMedicationFrom, setShowMedicationFrom] = useState(false);
    const [medicationId, setMedicationId] = useState(0);
    const [isEditable] = useState(props.isEditable);

    const showMedicationDialog = () => {
        setShowMedicationFrom(true)
    }
    const handleCloseMedicationForm = () => {
        setMedicationId(0);
        setShowMedicationFrom(false);
        loadActiveMedications();
        loadPastMedications();
    }

    const handleDialogSuccess = (message) => {

        showMessage("Success", message, "success", 3000);
        setMedicationId(0);
        setShowMedicationFrom(false);
        loadActiveMedications();
        loadPastMedications();
    }

    const editPatMedication = (item) => {
        setMedicationId(item.medicationId);
        setShowMedicationFrom(true)
        setIsEdit(true);

    }

    const loadActiveMedications = () => {
        //patient/medication/loadActiveMedicationGrid
        PostDataAPI('patient/medication/loadActiveMedicationGrid', parseInt(patientId)).then((result) => {
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
        //patient/medication/loadPastMedicationGrid
        PostDataAPI('patient/medication/loadPastMedicationGrid', parseInt(patientId)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                const lastFour = result.data.slice(-4);
                setListPastMedData(lastFour);

            }
        })
    }

    useEffect(() => {
        console.log(patientId);
        initialization();
    }, []);

    const initialization = () => {
        loadActiveMedications();
        loadPastMedications();
    }

    return (
        <>
            <div className={classes.listTitle}>
                <span>Medication</span>
                <span className={classes.addNew} title="Add Medication "> {isEditable ? <img src={AddIcon} onClick={showMedicationDialog} alt="Add New" />:''}</span>
            </div>


            <div className={classes.advContent}>
                <ul className={classes.ListStyle} >
                    <div className={classes.activeTitleArea}>
                        <span>Active</span>
                    </div>
                    {listActiveMedData.length > 0 ?
                        <>
                            {     
                                listActiveMedData.map((item, i) => (
                                    
                                    (listActiveDupData[item.drugName] > 1) ?
                                        <>
                                            {

                                                <li className={classes.treeViewLi}>
                                                    <div className={classes.treeContent}>
                                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                        <div onClick={() => editPatMedication(item)} className={classes.CustomLabel}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}<span style={{ color: "#F2994A" }}> (Duplicate)</span></div>
                                                    </div>
                                                </li>
                                            }
                                        </>
                                        : <>
                                            {
                                                <li className={classes.treeViewLi}>
                                                    <div className={classes.treeContent}>
                                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                        <div onClick={() => editPatMedication(item)} className={classes.CustomLabel}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}</div>
                                                    </div>
                                                </li>
                                            }
                                        </>
                                ))
                            }
                        </>
                        : <div className={classes.noRecord}>Patient has no active medicines</div>
                    }
                </ul>

                <ul className={classes.ListStyle} >
                    <div className={classes.activeTitleArea}>
                        <span>In Active</span>
                    </div>
                    {listPastMedData.length > 0 ?
                        <>{
                            listPastMedData.map((item, i) => (
                                <li className={classes.treeViewLi}>
                                    <div className={classes.treeContent}>
                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                        <div onClick={() => editPatMedication(item)} className={classes.CustomLabel}>{item.drugName}, SIG: TAKE {item.dispenseQuantity} TABLET Daily, {item.prescribedDatetime} {item.medPresType == "Historic" ? "" : "(" + item.medPresType + ")"}</div>
                                    </div>
                                </li>
                            ))
                        }</>
                        : <div className={classes.noRecord}>Patient has no past medicines</div>
                    }

                </ul>

            </div>
            {
                showMedicationFrom ? (<MedicationForm
                    patientId={patientId}
                    medicationId={medicationId}
                    dialogOpenClose={showMedicationFrom}
                    isEdit={isEdit}
                    handleClose={() => handleCloseMedicationForm()}
                    handleSuccess={() => handleDialogSuccess()}
                    isEditable={isEditable } />)
                    : ('')
            }

        </>
    )

}
export default withSnackbar(MedicationClinical)