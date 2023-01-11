import React, { useState, useEffect } from "react";
import useStyles from "./../styles";
import CloseIcon from "./../../../../../../images/icons/math-plus.png";
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import moment from "moment";

import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "./../../../../../../components/UiElements/UiElements";

import {
    Dialog,
    Grid,
    FormHelperText,
} from "@material-ui/core";

import { TextareaField, InputBaseField, CheckboxField } from "./../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';



function AddAdvanceDirectives({ closeDirectivesDialog, initialization, ...props }) {
    const classes = useStyles()
    const { showMessage } = props;
    const [errorMessages, setErrorMessages] = useState({ recordedDate: false, invalidRecordedDate: false });
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false, isLoading: false });
    const [Open, setOpen] = useState()
    const [patientId] = useState(props.patientId);
    const [isEditable] = useState(props.isEditable);
    const [state, setState] = useState({
        advanceDirectiveId: 0,
        patientId: patientId,
        detail: "",
        recordedDate: new Date().toISOString().split('T')[0],
        encounterId: 0,
        createDate: new Date(),
        createdBy: 0
    });
    const closeDialog = () => {
        closeDirectivesDialog()
    }
    const openDialog = () => {
        console.log('')
    }

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    //To Show Action Dialog
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
    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const onSave = () => {
        var validated = true;
        if (!state.detail || state.detail.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                detail: true
            }));
            validated = false;
        }
        if (!state.recordedDate || state.recordedDate.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                recordedDate: true
            }));
            validated = false;
        }
        if (moment(state.recordedDate).isBefore("1753-01-01")) {
            setErrorMessages(prevState => ({
                ...prevState,
                invalidRecordedDate: true
            }));
            validated = false;
        }
        if (validated == false)
            return;
        var showMsg = "Directives saved successfully.";
        var method = "patientadvancedirective/add";
        if (state.advanceDirectiveId > 0) {
            method = "patientadvancedirective/update"
            showMsg = "Directives updated successfully.";
        }
        setLoading({ isSaving: true });
        PostDataAPI(method, state, true).then((result) => {

            if (result.success) {
                showMessage("Success", showMsg, "success", 3000);
                setTimeout(() => {
                    closeDialog();
                    initialization();
                    setLoading({ isSaving: false });
                }, 1000)

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isSaving: false });
            }
        })

    }

    const onDelete = () => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            setLoading({ isDeleting: true });
            PostDataAPI('patientadvancedirective/delete', state, true).then((result) => {
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setTimeout(closeDialog, 1000);
                    initialization();
                    setLoading({ isDeleting: false });
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setLoading({ isDeleting: false });
                }
            });
        });
    }

    function loadAdvanceDirective() {
        var method = "patientadvancedirective/loadDirective";
        setLoading({ isLoading: true });
        PostDataAPI(method, parseInt(props.advanceDirectiveId)).then((result) => {
            setLoading({ isLoading: false });
            if (result.success && result.data != null) {
                result.data.recordedDate = result.data.recordedDate.split('T')[0];
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    useEffect(() => {
        console.log(props.patientId);
        if (props.advanceDirectiveId > 0) {
            loadAdvanceDirective();
        }
    }, []);

    return (
        <>
            <Dialog
                maxWidth="md"
                onClose={closeDirectivesDialog}
                open={openDialog}
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}

            >

                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton}><img src={CloseIcon} onClick={closeDialog} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Advance Directives</FormGroupTitle>
                        </div>



                        <div className={classes.content}>
                            <Grid container direction="row" alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Advance Directives" size={3} mandatory={true} />
                                <Grid item lg={8} sm={8} xs={8} xl={8} >
                                    <TextareaField
                                        rowsMin={12}
                                        placeholder="Advance Directives"
                                        onChange={handleChange}
                                        name="detail"
                                        id="detail"
                                        MaxLength="1000"
                                        value={state.detail}
                                        style={{ minWidth: "570px", height: "550px", marginBottom: "0px" }} />
                                    {errorMessages.detail && (!state.detail || state.detail.trim() == "") ? (<FormHelperText style={{ color: "red", marginTop: "0px", marginBottom: "5px" }} >
                                        Please enter advance directives
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Date Recorded" size={3} mandatory={true} />

                                <Grid item size={9}>
                                    <InputBaseField
                                        type="date"
                                        id="recordedDate"
                                        name="recordedDate"
                                        value={state.recordedDate}
                                        onChange={handleChange}
                                    />
                                    {errorMessages.recordedDate && (!state.recordedDate || state.recordedDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter date recorded
                                    </FormHelperText>) : ('')}
                                    {errorMessages.invalidRecordedDate ? (<FormHelperText style={{ color: "red" }} >
                                        Date cannot be earlier than 01/01/1753
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>
                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item direction="row" xs={2} sm={3} md={3} lg={3} xl={3} />
                                <Grid item direction="row" alignItems="left" justify="left" xs={9} sm={9} md={9} lg={9} xl={9}>
                                    {loading.isSaving ? <FormBtn id="loadingSave" size="medium"> Save </FormBtn> :
                                        <FormBtn id="save" size="medium" disabled={!isEditable} onClick={onSave}> Save </FormBtn>}
                                    {props.advanceDirectiveId > 0 ? < FormBtn id="delete" onClick={onDelete} disabled={loading.isDeleting || !isEditable} >Delete</FormBtn> : ''}
                                    <FormBtn id="reset" onClick={closeDialog} >Cancel</FormBtn>
                                </Grid>

                           </Grid>
                          
                        </div>
                    </div>

                    <ActionDialog
                        title={actiondialogprops.actiondialogtitle}
                        message={actiondialogprops.actiondialogmessage}
                        type={actiondialogprops.actiondialogtype}
                        actiondialogOpenClose={actiondialogprops.actiondialogstate}
                        onSubmit={() => { actiondialogprops.OnOk() }}
                        onCancel={() => setActionDialogProps(prevState => ({
                            ...prevState,
                            actiondialogstate: false,
                        }))
                        }
                    />
                </div>

            </Dialog>
        </>
    )

}
export default withSnackbar(AddAdvanceDirectives)