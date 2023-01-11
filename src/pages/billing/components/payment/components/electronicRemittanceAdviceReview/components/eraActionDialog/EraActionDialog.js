import React, { useState } from "react";
//material ui
import {
    Dialog,
    Typography,
} from "@material-ui/core";
//icons,images
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
//custom components
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { withSnackbar } from "../../../../../../../../components/Message/Alert"

function EraActionDialog({ type, showHideDialog, handleClose, handleSaveAndApplyLater, handleReStartEra, ...props }) {

    const classes = useStyles();
    const { showMessage } = props;

    const [state, setState] = useState({});

    return (
        <Dialog
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            open={showHideDialog}
            {...props}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>

                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">

                        <FormGroupTitle>
                            {
                                type == "SaveAndApplyLater" ?
                                    "Save and Apply Later" :
                                    type == "RestartERA" ?
                                        "Restart ERA" : ""

                            }
                        </FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <div>
                            {
                                type == "SaveAndApplyLater" ?
                                    <Typography className={classes.warningTitle}>Any additional actions will not be applied, and changes to any charge’s status will not be saved.</Typography> :
                                    type == "RestartERA" ?
                                        <Typography className={classes.warningTitle}>The payment on this ERA have not been applied.</Typography>
                                        : ""
                            }
                        </div>
                        <div>
                            {
                                type == "SaveAndApplyLater" ?
                                    <Typography className={classes.warningText}>These changes will only be saved if the payment is applied now.</Typography> :
                                    type == "RestartERA" ?
                                        <Typography className={classes.warningTitle}>By restarting the  ERA,  you will lose all progress  you have made resolving
                                            issues, and all changes to payments and additional actions will be lost.
                                        </Typography>
                                        : ""
                            }

                        </div>
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            {
                                type == "SaveAndApplyLater" ?
                                    <FormBtn id="save"  >Save and Apply Later</FormBtn>
                                    :
                                    type == "RestartERA" ?
                                        <FormBtn id="save"  >Restart ERA</FormBtn>
                                        : ""
                            }
                            <FormBtn id="reset" onClick={handleClose}>Cancel</FormBtn>
                        </div>
                    </div>

                </div>

            </div>

        </Dialog >
    )
}
// export default ReSubmitClaimDialog
export default withSnackbar(EraActionDialog)