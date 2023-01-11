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
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { Scrollbars } from "rc-scrollbars";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";

function TranslationDocumentDialog({ showHideDialog, handleClose, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const inputFile = useRef(null);
    // const [isSaving, setIsSaving] = useState(false);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const [state, setState] = useState({

        translationDocumentId: 0, patientID: parseInt(props.patientId), patientEncounterId: props.encounterId, name: "", documentPath: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(),
    });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, []);

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

    function handleFileUpload(e) {

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })

        saveDocument(e.target.files[0], e.target.files[0].name);
        setAttachment({ file: null, fileToSend: null, fileName: null });
    }

    function saveDocument(photo, filename) {
        var method = "translation/document/add";

        const formData = new FormData();
        for (var key in state) {
            if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                if (key == "name")
                    formData.append(key, filename);
                else
                    formData.append(key, state[key]);
        }

        formData.append("formFile", photo);
        formData.append("fileName", filename);
        formData.append("name", filename);
        setLoading(true);
        PostDataAPI(method, formData, true, "formData").then((result) => {

            if (result.success && result.data != null) {
                // if (state.documentId < 1) {
                setState(result.data);
                props.update();
                setLoading(false);
                showMessage("Success", "Document saved successfully.", "success", 3000);
            }
            else {
                setLoading(false);
                showMessage("Error", result.message, "error", 8000);
            }
        })
    }

    function deleteRecord(id) {
        ShowActionDialog(true, "Delete", "Are you sure you want to delete the selected document ?", "confirm", function () {
            var data = {
                translationDocumentId: parseInt(id)
            }

            PostDataAPI('translation/document/delete', data, true).then((result) => {

                if (result.success == true) {
                    props.update();
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })

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
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Translation Documents</FormGroupTitle>

                        </div>
                        <div className={classes.content}>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

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
                                        <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                    </div>
                                </form>{loading ?
                                    <div style={{ zIndex: "1000", position: "fixed", top: "42%", left: "42%" }}>
                                        <img className={classes.loader} src={LoadingIcon} alt="Loading..." />
                                    </div>
                                    : ''}
                                {props.fileList.length > 0 ?
                                    <Scrollbars style={{ height: 250, }}>
                                        <ul className={classes.attachmentList}>
                                            {
                                                props.fileList.map((item) => {
                                                    return <li>
                                                        <Typography className={classes.fileNameText}>{item.name}</Typography>
                                                        <Add className={classes.attachmentDeleteBtn} onClick={() => deleteRecord(item.translationDocumentId)} />
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </Scrollbars>
                                    : ""}

                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {/* {isSaving ?
                                <FormBtn id="loadingSave" > Save</FormBtn>
                                :
                                <FormBtn id="save" onClick={saveDocument}> Save</FormBtn>
                            } */}
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
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

export default withSnackbar(TranslationDocumentDialog)