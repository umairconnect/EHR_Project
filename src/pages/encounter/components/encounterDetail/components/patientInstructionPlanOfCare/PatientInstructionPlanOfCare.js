import React, { useState, useEffect } from "react";
import {ListTitle,ListView} from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import PatientInstructionPlanOfCareDialog from "../../../patientInstructionPlanOfCare/PatientInstructionPlanOfCareDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert"
// styles
import useStyles from "./styles";

function PatientInstructionPlanOfCare(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [showHidePatientInstructionPlanOfCareDialog, setShowHidePatientInstructionPlanOfCareDialog] = useState(false);
    const [planOfCareListRowsData, setPlanOfCareListRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);
    const [planOfCareState, setPlanOfCareState] = useState({
        patientInstruction: "",
        encounterID: 0
    });

    useEffect(() => {
        if (props.encounterId)
            loadData();

    }, [props.encounterId, showHidePatientInstructionPlanOfCareDialog]);

    const loadData = () => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.patientInstruction) {
                    const strippedString = result.data.patientInstruction != null ? result.data.patientInstruction : "";
                    setPlanOfCareListRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                }
                else {
                    setPlanOfCareListRowsData([]);
                    setIsDataExist(false);
                }

                // To set data for dialog
                setPlanOfCareState({
                    patientInstruction: result.data.patientInstruction != null ? result.data.patientInstruction : "",
                    encounterID: !result.data.encounterID ? props.encounterId : result.data.encounterID
                });
            }
            else if (!result.message && result.message != null) {
                
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    return (
        <>

            <ListTitle title="Patient  Instructions (Plan of Care)" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHidePatientInstructionPlanOfCareDialog(true)} />

            {
                planOfCareListRowsData.length < 1 ? (
                    !props.disabled ? <div className={classes.noRecord}>No patient  instructions (plan of care) recorded yet</div> : <div className={classes.DisnoRecord}>No patient Instructions (plan of care) recorded yet</div>) : (
                    <ul className={classes.treeView} >
                        {planOfCareListRowsData.map((item, i) => (
                            <li className={classes.treeViewLi} key={i}>
                                <div className={classes.treeContent}>
                                    {!props.disabled ? <>
                                        <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                    </> : <>
                                            <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div></>}
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }

            <PatientInstructionPlanOfCareDialog showHideDialog={showHidePatientInstructionPlanOfCareDialog} handleClose={() => { setShowHidePatientInstructionPlanOfCareDialog(false); }}
                encounterId={props.encounterId} patientId={props.patientId } patientInstructionPlaneOfCare={planOfCareState.patientInstruction} />
        </>

    );
}
export default withSnackbar(PatientInstructionPlanOfCare)