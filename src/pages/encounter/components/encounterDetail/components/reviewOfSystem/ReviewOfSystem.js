import React, { useState, useEffect } from "react";
import {ListTitle} from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import ReviewOfSystemDialog from "../../../reviewOfSystem/ReviewOfSystemDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";

function ReviewOfSystem(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [rosRowsData, setROSRowsData] = useState([]); 
    const [reviewOfSystemDialogShowHide, setReviewOfSystemDialogShowHide] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);

    useEffect(() => {
        if (props.encounterId)
            initialization();

    }, [props.encounterId, reviewOfSystemDialogShowHide]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.reviewOfSystem) {
                    // const strippedString = result.data.reviewOfSystem ? result.data.reviewOfSystem.replace(/(<([^>]+)>)/gi, "") : "";
                    const strippedString = result.data.reviewOfSystem != null ? result.data.reviewOfSystem : "";
                    setROSRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                } 
                else {
                    setROSRowsData([]);
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
            <ListTitle title="Review Of System" disabled={props.disabled} checkData={isDataExist} onClick={() => setReviewOfSystemDialogShowHide(true)} />
            {rosRowsData.length < 1 ?(
                !props.disabled ?<div className={classes.noRecord}>No review of system recorded yet</div>:<div className={classes.DisnoRecord}>No review of system recorded yet</div>):(
                        <ul className={classes.treeView} >
                            {rosRowsData.map((item, i) => (
                                <li className={classes.treeViewLi} key={i}>
                                    <div className={classes.treeContent}>
                                        {!props.disabled ?<>
                                        <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{__html: item.listTitle}}></div>
                                        </>:<>
                                        <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{__html: item.listTitle}}></div></>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            <ReviewOfSystemDialog showHideDialog={reviewOfSystemDialogShowHide} handleClose={() => setReviewOfSystemDialogShowHide(false)}
                encounterId={props.encounterId} patientId={props.patientId} />
        </>

    );
}

export default withSnackbar(ReviewOfSystem)