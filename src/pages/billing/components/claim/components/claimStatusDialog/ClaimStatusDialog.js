import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    FormLabel,
    Typography,
} from "@material-ui/core"

import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { FormGroupTitle, DraggableComponent, FormBtn } from "../../../../../../components/UiElements/UiElements";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { Done as DoneIcon, Close as CloseMaterialIcon } from '@material-ui/icons';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

import { Scrollbars } from "rc-scrollbars";
function ClaimStatusDialog({ showHideDialog, handleClose, proCodeForNdc, ndcCode, stateNdcCode, dataId, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState({
        claimSubmissionStatusId: null, claimSuperbillId: null, status: '', description: '',
        filePath: '', isFixed: false, strCreateDate: '', strUpdateDate: '', listSubmitStatusClaim: []
    });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [markedFixed, setMarkedFixed] = useState(false);
    const [ispayerRejection, setIspayerRejection] = useState(false);
    useEffect(() => {

        if (dataId > 0)
            loadClaimStatusSubmitted(dataId);
        console.log(dataId);

    }, [showHideDialog]);

    const loadClaimStatusSubmitted = (claimSuperBillId) => {

        PostDataAPI("claim/getSubmittedClaimToMarkFixByQuery", parseFloat(claimSuperBillId)).then((result) => {

            if (result.success && result.data != null) {

                result.data.map((item, i) => {

                    if (item.description.trim() == 'Submitted claim') { setIspayerRejection(true); }
                    if (item.isFixed == false) {
                        setState(item);
                    }
                    else
                        setMarkedFixed(true);

                })

                setState(prevState => ({
                    ...prevState,
                    listSubmitStatusClaim: result.data,
                }));

            }

        });
    }

    const Save = () => {

        state.isFixed = true;
        state.claimSubmissionStatusId = 0;
        state.description = 'Marked as fixed';
        state.status = 'marked_as_fixed';

        PostDataAPI("claim/updatedMarkedFixed", state, true).then((result) => {

            if (result.success === true && result.data != null) {

                if (result.data)
                    showMessage("Success", "Mark as fixed successfully.", "success", 3000);

                setTimeout(() => {
                    handleClose();
                }, 900)
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Claim Status Claim #  | {dataId} </FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 150 }}>
                                <ul className={classes.claimsList}>
                                    {state.listSubmitStatusClaim ?
                                        state.listSubmitStatusClaim.map((item, i) => (<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {i == state.listSubmitStatusClaim.length - 1 ? <span style={{ display: "flex", flexWrap: "wrap", }}>
                                                <Typography className={classes.claimDetailsDateTime}>Last submitted on : {item.strUpdateDate ? item.strUpdateDate : item.strCreateDate ? item.strCreateDate : null}</Typography>
                                            </span> : null}
                                        </Grid>)) : null}
                                    {state.listSubmitStatusClaim ?
                                        state.listSubmitStatusClaim.map((item, i) => (
                                            <Grid container direction="row" lg={12}>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <li>
                                                        {/*<DoneIcon style={{ color: "#1CBA0F" }} /> :*/}
                                                        {/*<CloseMaterialIcon style={{ color: "#F5413D" }} />*/}
                                                        <span>{item.strCreateDate ? item.strCreateDate : null}</span>
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        <span>{item.description ? item.description : null}</span>
                                                    </li>

                                                </Grid>
                                            </Grid>
                                        )) : null
                                    }
                                </ul>
                            </Scrollbars>
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <FormBtn disabled={markedFixed == true || ispayerRejection == true || (state.listSubmitStatusClaim && state.listSubmitStatusClaim.length == 0) ? true : false} id="save" onClick={Save}> Mark as Fixed </FormBtn>
                                {/*<FormBtn disabled={true} id="save" > View Report </FormBtn>*/}
                                <FormBtn id="reset" onClick={handleClose}>Close</FormBtn>
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}
export default withSnackbar(ClaimStatusDialog)