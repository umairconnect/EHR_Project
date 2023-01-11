import React, { useState } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
} from "@material-ui/core"
import AddNewClaim from "../../../billing/components/claim/addNewClaim/AddNewClaim"
import { DraggableComponent } from "../../../../components/UiElements/UiElements";
import CloseIcon from "../../../../images/icons/math-plus.png"
import { FormGroupTitle, FormBtn } from "../../../../components/UiElements/UiElements";
import Scrollbars from "rc-scrollbars";

function SuperBillDialog({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [loading, setLoading] = useState(false);

    console.log(props);
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                {...props} >
                {/* <Scrollbars style={{ height: 730 }}>
                    <div className={classes.DialogContentRightSide}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>{props.claimId == 0 ? "Add New Claim" : "View Claim"}</FormGroupTitle>
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ height: "580px" }}> */}
                <div className={classes.DialogContent}>
                    <AddNewClaim claimId={props.claimId} patientId={props.patientId} dataId={props.encounterId} claimBillId={props.claimId} handleClose={handleClose} />
                </div>
                {/* </Scrollbars>
                            </div> */}

                {/* </div>
                    </div>
                </Scrollbars> */}
            </Dialog>
        </>
    )

}
export default withSnackbar(SuperBillDialog)