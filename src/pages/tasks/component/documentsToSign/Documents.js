import React, { useState, useEffect, useRef } from "react"
import { useDropzone } from 'react-dropzone'
import useStyles from "./styles";

import { Grid, Button, Divider, Dialog } from "@material-ui/core"

import DocumentGrid from "../../../patients/component/documents/component/documentGrid/DocumentGrid";
import DocumentForm from "../../../patients/component/documents/component/documentForm/DocumentForm";
import { FormGroupTitle } from '../../../../components/UiElements/UiElements';


import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetMaxFileSize } from "../../../../Services/GetConfiguration";
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function Documents(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [id, setId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [addNewDialogOpenClose, setAddNewDialogOpenClose] = useState(false);
    const [actionType, setActionType] = useState("");
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: '.jpeg, .png, .jpg, .jpeg, .pdf, .doc, .docx, .xlsx, .xls, .csv, .txt'
    });
    //const [dataId] = useState(props.dataId);
    const inputFile = useRef(null)
    //
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [state, setState] = useState({ type: "" });

    const handleCloseDocumentForm = () => {
        handleUpdate();
        setActionType("");
        setAddNewDialogOpenClose(false);
    }
    //handle Grid Dropdown Action
    const handleGridDropDownAction = (id, action, url) => {

        setActionType(action);

        if (action === "view" || action === "ammendment") {
            setId(id);
            setAddNewDialogOpenClose(true);
        }
        else if (action === "download") {
            url = "." + url;
            //alert("Action type is download : " + url);
            const link = document.createElement('a');
            link.href = url;
            var filename = url.replace(/^.*[\\\/]/, '')
            link.setAttribute('download', filename,);
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            //link.parentNode.removeChild(link);
        }
        else if (action == "print") {
            alert("Action type is called : " + action);
        }
        else if (action === "delete") {

            //if (!window.confirm("Are you sure, you want to delete the document record?"))
            //    return;
            ShowActionDialog("delete", "", "Are you sure, you want to delete the document record?", "confirm", function () {
                var data = {
                    documentId: parseInt(id)
                }

                PostDataAPI('patient/document/delete', data, true).then((result) => {

                    if (result.success == true) {
                        handleUpdate();
                        showMessage("Success", "Record deleted successfully.", "success", 2000);
                    }
                    else {
                        showMessage("Error", result.message, "error", 8000);
                    }
                })
            })
        }
    }
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

    useEffect(() => {
        if (acceptedFiles.length > 0 && fileRejections.length == 0) {
            if (acceptedFiles.length > 10) {
                showMessage("Error", "Maximum 10 files can be uploaded at same time.", "error", 8000);
                return;
            }
            if (!validateFileSize(acceptedFiles)) {
                showMessage("Error", 'Maximum allowed file size is 1000', "error", 2000);
                return;
            }
            var method = "patient/document/uploadMultipleFiles";
            const formData = new FormData();
            for (var key in acceptedFiles) {
                if (acceptedFiles[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, acceptedFiles[key]);
            }

            for (var i = 0; i < acceptedFiles.length; i++) {

                formData.append("FromFiles", acceptedFiles[i]);
                formData.append("fileName", acceptedFiles[i].name);
                formData.append("documentTypeCode", "Uploaded");
                //formData.append("patientId", dataId);
                formData.append("documentDate", new Date().toISOString());

            }

            PostDataAPI(method, formData, true, "formData").then((result) => {

                if (result.success && result.data != null) {

                    if (result.data.length > 0)
                        showMessage("Success", "Document saved successfully.", "success", 3000);
                }
                else showMessage("Error", result.message, "error", 8000);
                handleUpdate();
            })

        }
        if (fileRejections.length > 0) {
            showMessage("Error", `Only following document types are allowed <br> .jpeg, .png, .jpg, .pdf, .doc, .docx, .xlsx, .xls, .csv, .txt`, "error", 8000);
        }
        saveAuditLogInfo();

    }, [acceptedFiles, fileRejections]);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: userInfo.loggedInUserID,
            area: "Provider Documents",
            activity: "Load provider documents",
            details: "User viewed patient document details"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    const validateFileSize = (lstFiles) => {
        if (lstFiles.some(t => t.size > GetMaxFileSize)) {
            return false;

        }
        return true;
    }

    //Rerender grid after data update 
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }
    return (
        <>
            <>
                {
                    actionType != "" ?
                        (<DocumentForm
                            id={id}
                            providerId={parseInt(userInfo.loggedInUserID)}
                            actiontype={actionType}
                            dialogOpenClose={addNewDialogOpenClose}
                            handleClose={() => handleCloseDocumentForm()} />)
                        : ('')
                }

                <div className={classes.allTasksCard}>
                    <div className={classes.allTasksInnerCard}>
                        <div className={classes.allTasksFilterArea}>
                            <Grid container lg={12} spacing={1} direction="row" justify="center">
                                <FormGroupTitle>Documents To Sign</FormGroupTitle>
                            </Grid>
                        </div>

                        <DocumentGrid
                            ischeckboxes={true}
                            apiUrl="patient/document/getProviderDocuments"
                            isUpdate={update}
                            columnCode="DocumentColumns"
                            dataId={parseInt(userInfo.loggedInUserID)}
                            type={state.type}
                            filterBy={'provider'}
                            onActionclick={(id, action, url) => handleGridDropDownAction(id, action, url)}
                        />
                    </div>
                </div>


            </>
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
        </>
    );
}
export default withSnackbar(Documents)