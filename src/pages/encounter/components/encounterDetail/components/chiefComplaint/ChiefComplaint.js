import React, { useState, useEffect } from "react";
import ChiefComplaintDialog from "../../../chiefComplaint/ChiefComplaintDialog";
import { ListTitle, ListView } from '../subComponents/subComponents';
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

// styles
import useStyles from "./styles";

function ChiefComplaint(props) {

    var classes = useStyles();
    const { showMessage } = props;

    const [chiefComplaintDialog, setChiefComplaintDialog] = useState({ showHide: false });
    const [chiefComplaintRowsData, setChiefComplaintRowsData] = useState([]);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [isDataExist, setIsDataExist] = useState(false);

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        setChiefComplaintDialog({ showHide: false });
        props.updateChiefId(chiefComplaintDialog);
    }

    useEffect(() => {
        if (props.encounterId)
            initialization();
    }, [props.encounterId, chiefComplaintDialog]);

    const initialization = () => {

        loadData();
    }

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.ccDetail) {
                    const strippedString = result.data.hpiDetail != null ? result.data.hpiDetail : "";
                    setChiefComplaintRowsData([{
                        listTitle: result.data.ccDetail, //result.data.chiefComplaintName,
                        hpiDetail: strippedString,
                    }]);
                    setIsDataExist(true);
                }
                else {
                    setChiefComplaintRowsData([]);
                    setIsDataExist(false);
                }


            }
            else if (!result.message && result.message != null) {
                
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const closeChiefComplaintDialog = () => {
        setChiefComplaintDialog({ showHide: false });
        props.updateChiefId(chiefComplaintDialog);
    }
    return (
        <>
            <div className={classes.rightListTitle} >
                <span>Chief Complaint / History of Presenting Illness</span>
            </div>

            <ListTitle title="Chief Complaint" disabled={props.disabled} checkData={isDataExist} onClick={() => setChiefComplaintDialog({ showHide: true })} />

            <ListView noRecordedtitle="No chief complaint recorded yet" disabled={props.disabled} listData={chiefComplaintRowsData} />

            <ListTitle title="HPI" disabled={props.disabled} checkData={isDataExist} onClick={() => setChiefComplaintDialog({ showHide: true })} />

            {chiefComplaintRowsData.length < 1 ? (
                !props.disabled ? <div className={classes.noRecord}>No HPI recorded yet</div> : <div className={classes.DisnoRecord}>No HPI recorded yet</div>) : (
                <ul className={classes.treeView} >
                    {chiefComplaintRowsData.map((item, i) => (
                        <li className={classes.treeViewLi} key={i}>
                            <div className={classes.treeContent}>
                                {!props.disabled ? <>
                                    <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.hpiDetail }}></div>
                                </> : <>
                                    <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.hpiDetail }}></div></>}
                            </div>
                        </li>
                    ))}
                </ul>
            )
            }
            {chiefComplaintDialog.showHide && <ChiefComplaintDialog
                showHideDialog={chiefComplaintDialog.showHide}
                handleClose={closeChiefComplaintDialog}
                encounterId={props.encounterId}
                patientId={props.patientId}
                handleSuccess={handleDialogSuccess}
            />}
        </>

    );
}

export default withSnackbar(ChiefComplaint)