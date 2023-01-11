import React, { useState, useRef, useEffect } from "react";
import {
    Dialog,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import useStyles from "./styles"
import { AttachFile, Add } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import CliniCalSummary from "./components/clinicalSummary/ClinicalSummary";
import Reconcile from "./components/reconcoil/Reconcile";
function ImportPatientRefferal({ showHideDialog, handleClose, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const inputFile = useRef(null);

    const [clinicalSummaryDialogState, setClinicalSummaryDialogState] = useState(false);
    const [reconcileDialogState, setReconcileDialogState] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const handleSummaryClose = () => {
        setClinicalSummaryDialogState(false);
        setReconcileDialogState(false);
        handleFileUploadClose();
    }
    const handleFileUploadClose = () => {
        setAttachment({ file: null, userPhoto: null, userFileName: null });
        handleClose(false);
    }
    const [state, setState] = useState({

        translationDocumentId: 0, patientID: parseInt(props.patientId), patientEncounterId: props.encounterId, name: "", documentPath: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(),
    });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    useEffect(() => {

    }, []);


    function handleFileUpload(e) {

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })
    }

    const saveDocument = (e) => {
        //e.preventDefault();
        //e.stopPropagation();
        //setClinicalSummaryDialogState(true);
        ImportReferral();

    }
    const ImportReferral = (e) => {
        let errorList = [];

        //Validate(errorList);
        if (attachment.userPhoto) {
            setIsSaving(true);
            let method = "patientrefferal/importReferral";

            let formData = new FormData();
            console.log(attachment);
            formData.append("formFile", attachment.userPhoto);
            //formData.append("scannedEobPath", attachment.file);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                
                //setSaveLoading(false);
                setIsSaving(false);
                if (result.success == true) {
                    if (result.success && result.data != null) {
                        setState(result.data);
                        if (!result.data.isDataExist) {
                            showMessage("Error", "No data found to import", "error", 3000);
                            return;
                        }
                        if (result.data.isNewPatient) {
                            setClinicalSummaryDialogState(true);
                            setReconcileDialogState(false);
                        }
                        else {
                            setClinicalSummaryDialogState(false);
                            setReconcileDialogState(true);
                        }
                    }

                }
                else {
                    // showMessage("Error", result.message, "error", 15000);
                    showMessage("Error", result.message, "error", 3000);

                    setIsSaving(false);
                }
            })
        }
        else {
            showMessage("Error", 'Please select a file', "error", 3000);
        }
    }


    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                open={showHideDialog}
                disableEnforceFocus
                disableBackdropClick
                disableEscapeKeyDown>
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleFileUploadClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Upload C-CDA</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            <Grid container >
                                <Label title="Upload C-CDA" size={3} />
                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>

                                    <span className={classes.btnSpan}>
                                        <InputBaseField
                                            name="uploadFile"
                                            placeholder="Upload Files"
                                            value={attachment.userFileName}
                                            IsDisabled={true}
                                        />
                                        <IconButton
                                            className={classes.attachmentBtn}
                                            color="primary"
                                            onClick={handleSelectFile}>
                                            <AttachFile />
                                        </IconButton>

                                    </span>
                                    <form>
                                        <div>
                                            <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".xml" />
                                        </div>
                                    </form>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>

                                    {isSaving ?
                                        <FormBtn id="loadingSave" > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={saveDocument}> Ok</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleFileUploadClose}> Close </FormBtn>
                                </Grid>
                            </Grid>
                        </div>

                    </div>
                </div>
            </Dialog>
            <CliniCalSummary
                dialogOpenClose={clinicalSummaryDialogState}
                handleClose={handleSummaryClose}
                data={state}
            />
            <Reconcile
                dialogOpenClose={reconcileDialogState}
                handleClose={handleSummaryClose}
                data={state}
            />
            {actiondialogprops.actiondialogstate ?
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
                : ""}
        </>
    )
}

export default withSnackbar(ImportPatientRefferal)