import React, { useState, useEffect } from "react";
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddendumDialog from "../../../addendum/Addendum";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { LinkS } from "../../../../../../components/UiElements/UiElements";
import EditIcon from '../../../../../../images/icons/editIcon.png';
// styles
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

function Addendum(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [addendumRowsData, setAddendumRowsData] = useState([]);
    const [addendumDialogShowHide, setAddendumDialogShowHide] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);
    const [encounterAddendumId, setEncounterAddendumId] = useState(0);


    useEffect(() => {
        if (props.encounterId || !addendumDialogShowHide)
            getAddendumsByEncounterId();

    }, [props.encounterId, addendumDialogShowHide]);

    function getAddendumsByEncounterId() {

        PostDataAPI("encounter/getAddendumListById", parseInt(props.encounterId)).then((result) => {

            if (result.success && result.data != null) {

                setAddendumRowsData(
                    result.data.map((item, i) => {
                        return {
                            encounterAddendumId: item.encounterAddendumId, listDate: item.strRequestDate + ' | ' + item.strRequestTime, listTitle: item.requestDetails,
                            documentTitle: item.documentTitle, documentPath: item.documentPath
                        };
                    }));
            }
        });
    }

    function getAddendumDataPopup(id) {

        setEncounterAddendumId(id);
        setAddendumDialogShowHide(true);
    }

    function closePopUp() {
        props.updateAddendum();
        setEncounterAddendumId(0);
        setAddendumDialogShowHide(false);
    }

    const handleUpdate = () => {
        props.updateAddendum();
    }
    return (
        <>
            <ListTitle title="Addendum" disabled={props.disabled} checkData={isDataExist} onClick={() => setAddendumDialogShowHide(true)} />

            {addendumRowsData ? addendumRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No Addendum Recorded yet</div> : <div className={classes.DisnoRecord}>No Addendum Recorded yet</div>) :
                <ul className={classes.treeView}>

                    {

                        addendumRowsData.map((item, i) => (
                            !props.disabled ?
                                (<li key={i} >
                                    <div className={classes.treeContent}>
                                        <span style={{ display: "flex" }}>
                                            <Typography className={classes.boldHeading}>{`Request Date :  `}</Typography>
                                            <div className={classes.DistreeLabelDate}>{item.listDate}</div>
                                            <span className={classes.editBtn} title={"Edit Addendum"} onClick={() => getAddendumDataPopup(item.encounterAddendumId)}><VisibilityIcon /></span>
                                        </span>
                                        <span title={item.listTitle} style={{ display: "flex" }}>
                                            <Typography className={classes.boldHeading}>{`Details :  `}</Typography>
                                            <div className={classes.DistreeLabel}>{item.listTitle}</div>
                                        </span >
                                        {
                                            item.documentPath ?
                                                <span style={{ display: "flex" }}>
                                                    <Typography className={classes.boldHeading}>{`Attachment :  `}</Typography>
                                                    <LinkS target={"_blank"} href={"." + item.documentPath}>{item.documentTitle}</LinkS>
                                                </span>
                                                : ""

                                        }
                                    </div>
                                </li>)
                                :
                                (<li key={i}>
                                    <div className={classes.treeContent}>
                                        <span style={{ display: "flex" }}>
                                            <Typography className={classes.boldHeading}>{`Requested Date :  `}</Typography>
                                            <div className={classes.DistreeLabelDate}>{item.listDate}</div>
                                            <span className={classes.editBtn} title={"Edit Addendum"} onClick={() => getAddendumDataPopup(item.encounterAddendumId)}><VisibilityIcon /></span>
                                        </span>
                                        <span style={{ display: "flex" }}>
                                            <Typography className={classes.boldHeading}>{`Details :  `}</Typography>
                                            <div className={classes.DistreeLabel}>{item.listTitle}</div>
                                        </span>
                                        {/* <div className={classes.DistreeLabel}><b>Request Date</b> {item.listDate}</div>
                                        <span title={item.listTitle}><div className={classes.DistreeLabel}><b>Details</b> {item.listTitle}</div></span> */}
                                    </div>
                                </li>)

                        )
                        )
                    }
                </ul>
                : null}

            <AddendumDialog updateAdd={() => handleUpdate()} showHideDialog={addendumDialogShowHide} handleClose={() => closePopUp()} encounterId={props.encounterId} patientId={props.patientId} encAddendumId={encounterAddendumId} />

        </>

    );
}


export default withSnackbar(Addendum)
