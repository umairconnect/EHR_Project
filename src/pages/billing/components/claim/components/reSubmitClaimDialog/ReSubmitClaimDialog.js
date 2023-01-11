import React, { useState, useEffect } from "react";
//material ui
import {
    Dialog,
    Button,
    Typography,
    Grid,
} from "@material-ui/core";
//icons,images
import CloseIcon from "../../../../../../images/icons/math-plus.png"

//custom components
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../components/Message/Alert";

function ReSubmitClaimDialog({ showHideDialog, handleClose, handleSubmit, handleDontSubmit, bulkSelectedRows, ...props }) {

    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState({ ids: '', CaimBillingCode: '', claimSubmittedStatusList: [], updateIds: '' });
    const [arrayclaimSubmissionStatus, setArrayclaimSubmissionStatus] = useState([]);

    useEffect(() => {

        if (bulkSelectedRows.length > 0)
            loadSelectedClaims();

    }, [showHideDialog]);

    const loadSelectedClaims = () => {
        var _claimSubmittedStatusList = [];

        bulkSelectedRows.map((item, i) => {
            _claimSubmittedStatusList.push({
                claimSubmissionStatusId: 0, claimSuperbillId: item,
                status: "SUBMITTED_CLAIM", description: "SUBMITTED_CLAIM", filePath: ""
            });
        });
        state.claimSubmittedStatusList = _claimSubmittedStatusList;
    }

    const Save = () => {
        state.ids = bulkSelectedRows.join(", ");
        state.caimBillingCode = "SUBMITTED_CLAIM";
        state.updateIds = arrayclaimSubmissionStatus.join(", ");

        PostDataAPI("claims/submitClaim", state, true).then((result) => {
            if (result.success === true && result.data != null) {
                if (result.data) {
                    showMessage("Success", "Claims re-submit successfully.", "success", 3000);
                    
                    var resultFiles = result.data.split('||');
                    resultFiles.forEach(file => {
                        if (file)
                            download(file);
                    });

                }

                setTimeout(() => {
                    handleClose();
                }, 900)
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const download = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', url);
        document.body.appendChild(link);
        // Start download
        link.click();
    }

    function searchByClaimNumber(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].claimSuperbillId === nameKey) {
                return myArray[i];
            }
        }
    }

    return (
        <Dialog
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={showHideDialog}
            {...props}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>

                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <FormGroupTitle>Submit Claim</FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <div>
                            <Typography className={classes.warningTitle}>Are you sure, you want to submit the selected claim(s)?</Typography>
                        </div>
                        {/* <div>
                            <Typography className={classes.warningText}>Only claim sets to send to insurance, at insurance,
                                denied at insurance, or rejected at clearing house can be re-submitted</Typography>
                        </div> */}
                    </div>
                    <div className={classes.footer}>
                        <Grid container justify="center" >
                            <FormBtn id="save" onClick={Save} >Submit</FormBtn>
                            {/*<Button className={classes.saveBtn} >Don’t Submit</Button>*/}
                            <FormBtn id="reset" onClick={handleClose}>Cancel</FormBtn>
                        </Grid>
                    </div>

                </div>

            </div>

        </Dialog >
    )
}
// export default ReSubmitClaimDialog
export default withSnackbar(ReSubmitClaimDialog)