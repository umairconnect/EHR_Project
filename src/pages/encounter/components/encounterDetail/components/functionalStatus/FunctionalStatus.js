import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import FunctionalStatusDialog from "../../../functionalStatus/FunctionalStatusDialog"
// import CognitiveStatusDialog from "../../../cognitiveStatus/CognitiveStatusDialog"
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { FormLabel } from "@material-ui/core"

// styles
import useStyles from "./styles";

function FunctionalStatus(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [functionalStatusId, setFunctionalStatusId] = useState(0);

    const [functionalStatusRowsData, setFunctionalStatusRowsData] = useState([]);//useState([
    //    {activity:"Bathing",ability:"Independent"},
    //    {activity:"Dressing",ability:"Dependent"},
    //    {activity:"Toileting",ability:"Assisted"},
    //    {activity:"Amblution",ability:"Unable"}
    //]);
    const [disabled, setDisabled] = useState(false);
    const [showHideFunctionalStatusDialog, setShowHideFunctionalStatusDialog] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);

    useEffect(() => {
        if (props.encounterId)
            initialization();

    }, [props.encounterId, showHideFunctionalStatusDialog]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        let procData = {
            "encounterID": props.encounterId
        }

        PostDataAPI("FunctionalStatus/loadFunctionalStatusForEncounter", procData).then((result) => {

            if (result.success && result.data.length > 0) {

                setFunctionalStatusRowsData(
                    result.data.map((item, i) => {
                        return {
                            activityCode: item.activityCode,
                            abilityName: item.abilityName,
                            functionalStatusID: item.functionalStatusID
                        };
                    }));

                setIsDataExist(true);

            }
            else {
                setFunctionalStatusRowsData([]);
                setIsDataExist(false);
            }
        })
    }

    const updateFunctionalStatusID = (item) => {
        setFunctionalStatusId(item.functionalStatusID)
        setShowHideFunctionalStatusDialog(true)
    }

    return (
        <>
            <ListTitle title="Functional Status" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHideFunctionalStatusDialog(true)} inlineBlock={props.inlineBlock} />

            {functionalStatusRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No functional status recorded yet</div> : <div className={classes.DisnoRecord}>No functional status recorded yet</div>) :
                <ul className={classes.treeView}>
                    <div className={classes.listHeadingLabel}> <div>Activity</div> <div style={{textAlign: 'right'}}>Ability</div> </div>
                    {functionalStatusRowsData.map((item, i) => (
                        !props.disabled ?
                            (<li key={i} onClick={() => updateFunctionalStatusID(item)}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeLabel}><div> {item.activityCode}</div> <div style={{textAlign: 'right'}}>{item.abilityName}</div></div>
                                </div>
                            </li>)
                            :
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeLabel}> <div>{item.activityCode}</div> <div style={{textAlign: 'right'}}>{item.abilityName}</div></div>
                                </div>
                            </li>)

                    )
                    )}
                </ul>
            }

            <FunctionalStatusDialog showHideDialog={showHideFunctionalStatusDialog} handleClose={() => setShowHideFunctionalStatusDialog(false)}
                encounterId={props.encounterId} functionalStatusId={functionalStatusId} />

        </>

    );
}

export default withSnackbar(FunctionalStatus)