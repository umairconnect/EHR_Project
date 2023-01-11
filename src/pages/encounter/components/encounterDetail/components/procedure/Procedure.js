import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import ProcedureDialog from "../../../procedure/ProcedureDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";

function Procedure(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [procedureRowsData, setProcedureRowsData] = useState([]);
    const [procedureDialogShowHide, setProcedureDialogShowHide] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);


    useEffect(() => {
        if (props.encounterId || !procedureDialogShowHide)
            initialization();

    }, [props.encounterId, procedureDialogShowHide]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        let procData = {
            "encounterID": props.encounterId
        }

        PostDataAPI("proceduralCode/loadProceduralCodeGrid", procData).then((result) => {
            if (result.success && result.data.length > 0) {
                setProcedureRowsData(
                    result.data.map((item, i) => {
                        return {
                            listTitle: item.name,
                        };
                    }));
                setIsDataExist(true);
            }
            else {
                setProcedureRowsData([]);
                setIsDataExist(false);
            }
        })
    }

    return (
        <>
            <ListTitle title="Procedure" disabled={props.disabled} checkData={isDataExist} onClick={() => setProcedureDialogShowHide(true)} />

            {procedureRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No procedure recorded yet</div> : <div className={classes.DisnoRecord}>No procedure recorded yet</div>) :
                <ul className={classes.treeView}>
                    {procedureRowsData.map((item, i) => (
                        !props.disabled ?
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.DistreeLabel}> {item.listTitle}</div>
                                </div>
                            </li>)
                            :
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.DistreeLabel}> {item.listTitle}</div>
                                </div>
                            </li>)

                    )
                    )}
                </ul>
            }

            <ProcedureDialog showHideDialog={procedureDialogShowHide} handleClose={() => setProcedureDialogShowHide(false)} encounterId={props.encounterId} patientId={props.patientId} />

        </>

    );
}


export default withSnackbar(Procedure)