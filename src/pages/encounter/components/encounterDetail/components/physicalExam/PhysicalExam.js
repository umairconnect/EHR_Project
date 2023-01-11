import React, { useState, useEffect } from "react";
import {ListTitle} from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import PhysicalExamDialog from "../../../physicalExam/PhysicalExamDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";

function PhysicalExam(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [phyExamRowsData, setPhyExamRowsData] = useState([]);
    const [physicalExamDialogShowHide, setPhysicalExamDialogShowHide] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);

    useEffect(() => {
        if (props.encounterId)
            initialization();

    }, [props.encounterId, physicalExamDialogShowHide]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {
        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.physicalExamInfo) {
                    //const strippedString = result.data.physicalExamInfo ? result.data.physicalExamInfo.replace(/(<([^>]+)>)/gi, "") : "";
                    const strippedString = result.data.physicalExamInfo != null ? result.data.physicalExamInfo : "";
                    setPhyExamRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                }
                else if (result.data.noPhysicalExamInfo) {
                    const strippedString = result.data.noPhysicalExamInfo != null ? result.data.noPhysicalExamInfo : "";
                    setPhyExamRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                }
                else {
                    setPhyExamRowsData([]);
                    setIsDataExist(false);
                }
            }
            else if (!result.message && result.message != null) {
                
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }


    return (
        <>
            <ListTitle title="Physical Exam" disabled={props.disabled} checkData={isDataExist} onClick={() => setPhysicalExamDialogShowHide(true)} />
            {phyExamRowsData.length < 1 ? (
                !props.disabled ? <div className={classes.noRecord}>No physical exam recorded yet</div> : <div className={classes.DisnoRecord}>No physical exam recorded yet</div>) : (
                    <ul className={classes.treeView} >
                        {phyExamRowsData.map((item, i) => (
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
            <PhysicalExamDialog showHideDialog={physicalExamDialogShowHide} handleClose={() => setPhysicalExamDialogShowHide(false)} encounterId={props.encounterId}
            patientId={props.patientId} />
        </>

    );
}

export default withSnackbar(PhysicalExam)