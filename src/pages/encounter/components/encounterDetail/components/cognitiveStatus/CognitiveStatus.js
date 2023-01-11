import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import CognitiveStatusDialog from "../../../cognitiveStatus/CognitiveStatusDialog"
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";

function CognitiveStatus(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [cognitiveStatusRowsData, setCognitiveStatusRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [showHideCognitiveStatusDialog, setShowHideCognitiveStatusDialog] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);
    const [cognitiveStatusId, setCognitiveStatusId] = useState(0);


    useEffect(() => {
        if (props.encounterId)
            initialization();

    }, [props.encounterId, showHideCognitiveStatusDialog]);

    const initialization = () => {
        loadData();
    }

    const congnitiveItemClick = (id) => {
        setCognitiveStatusId(id);
    }

    const loadData = () => {

        let procData = {
            "encounterID": props.encounterId
        }

        PostDataAPI("CognitiveStatus/loadCognitiveStatusForEncounter", procData).then((result) => {

            if (result.success && result.data) {
                setCognitiveStatusRowsData([{
                    listTitle: result.data.assessment,
                    cognitiveStatusID: result.data.cognitiveStatusID
                }]);
                setIsDataExist(true);
            }
            else {
                setCognitiveStatusRowsData([]);
                setIsDataExist(false);
            }
             
        })
    }
      

    return (
        <>
            <ListTitle title="Cognitive Status" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHideCognitiveStatusDialog(true)} />

            {cognitiveStatusRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No procedure recorded yet</div> : <div className={classes.DisnoRecord}>No procedure recorded yet</div>) :
                <ul className={classes.treeView}>
                    {cognitiveStatusRowsData.map((item, i) => (                       
                                //<li key={i} onClick={() => congnitiveItemClick(item.cognitiveStatusID)}>
                                <li className={classes.treeViewLi} key={i}>
                                <div className={classes.treeContent}>
                                    {
                                         !props.disabled ?
                                         <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                         :
                                         <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                    }
                                </div>
                            </li>

                    )
                    )}
                </ul>
            }

            <CognitiveStatusDialog showHideDialog={showHideCognitiveStatusDialog} handleClose={() => setShowHideCognitiveStatusDialog(false)} encounterId={props.encounterId} cognitiveStatusId={cognitiveStatusId} />
             
        </>

    );
}

export default withSnackbar(CognitiveStatus)