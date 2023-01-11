import React, { useState, useEffect } from "react";
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import CheckoutNotesDialog from "../../../checkoutNotes/CheckoutNotesDialog";

import { withSnackbar } from "../../../../../../components/Message/Alert"

// styles
import useStyles from "./styles";

function CheckoutNotes(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [showHideCheckoutNotesDialog, setShowHideCheckoutNotesDialog] = useState(false);
    const [conListRowsData, setCONListRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);
    const [conState, setCONState] = useState({
        checkoutNote: "",
        checkoutDatetime: "",
        encounterID: 0
    });

    useEffect(() => {
        if (props.encounterId)
            loadData();

    }, [props.encounterId, showHideCheckoutNotesDialog]);

    const loadData = () => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.checkoutNote) {
                    const strippedString = result.data.checkoutNote != null ? result.data.checkoutNote : "";
                    setCONListRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);

                }
                else {
                    setCONListRowsData([]);
                    setIsDataExist(false);
                }

                // To set data for dialog
                let timeToAssing = "";
                let resultTime = result.data.checkoutDatetime;

                if (!resultTime) {
                    let hours = new Date().getHours();
                    let mints = new Date().getMinutes();

                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (mints < 10) {
                        mints = '0' + mints;
                    }
                    timeToAssing = hours + ':' + mints;
                }
                else {
                    let r1 = resultTime.split('T')[1]
                    let r2 = r1.split(':')

                    let hours = r2[0];
                    let mints = r2[1];

                    timeToAssing = hours + ':' + mints;
                }

                setCONState({
                    checkoutDatetime: timeToAssing,
                    checkoutNote: result.data.checkoutNote != null ? result.data.checkoutNote : "",
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
            <ListTitle title="Checkout Notes" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHideCheckoutNotesDialog(true)} />

            {conListRowsData.length < 1 ? (
                !props.disabled ? <div className={classes.noRecord}>No checkout notes recorded yet</div> : <div className={classes.DisnoRecord}>No checkout notes recorded yet</div>) : (
                <ul className={classes.treeView} >
                    {conListRowsData.map((item, i) => (
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
            <CheckoutNotesDialog showHideDialog={showHideCheckoutNotesDialog} handleClose={() => { setShowHideCheckoutNotesDialog(false); }}
                encounterId={props.encounterId} patientId={props.patientId} coNote={conState.checkoutNote} coTime={conState.checkoutDatetime} patientAppointmentId={props.patientAppointmentId} />

        </>

    );
}

export default withSnackbar(CheckoutNotes)
