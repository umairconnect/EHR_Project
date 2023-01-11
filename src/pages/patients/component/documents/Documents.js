import React, { useState, useEffect, useRef } from "react"
import { useDropzone } from 'react-dropzone'
import useStyles from "./styles";
import Attachment from "../../../../images/icons/attachment.png"
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {
    Button,
    Typography,
    Grid,
    Avatar,

} from "@material-ui/core"
import DocumentGrid from "./component/documentGrid/DocumentGrid"
import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import DocumentForm from "./component/documentForm/DocumentForm";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { SelectField } from "../../../../components/InputField";
import { FormGroupTitle, Label, ShadowBox } from "../../../../components/UiElements/UiElements";
import { GetMaxFileSize } from "../../../../Services/GetConfiguration";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

import LoadingIcon from "../../../../images/icons/loaderIcon.gif";


function Documents(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const typeOptions = [
        {
            value: "Signed",
            label: "Signed",
        },
        {
            value: "Unsigned",
            label: "Unsigned",
        }

    ];
    const [id, setId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [addNewDialogOpenClose, setAddNewDialogOpenClose] = useState(false);
    const [actionType, setActionType] = useState("");
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: '.jpeg, .png, .jpg, .jpeg, .pdf, .doc, .docx, .xlsx, .xls, .csv, .txt'
    });
    const [dataId] = useState(props.dataId);
    const inputFile = useRef(null)
    //
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [state, setState] = useState({ type: "" });
    const [loader, setLoader] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function handleChangebyFilter(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        handleUpdate();
    }

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
            setLoader(true)
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
                formData.append("patientId", dataId);
                formData.append("documentDate", new Date().toISOString());

            }

            PostDataAPI(method, formData, true, "formData").then((result) => {

                if (result.success && result.data != null) {
                    setLoader(false)
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
            entityId: dataId,
            area: "Patient",
            activity: "Load patient details",
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

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    return (
        <>
            {/* <ShadowBox> */}
            <>
                {
                    actionType != "" ?
                        (<DocumentForm
                            id={id}
                            dataId={dataId}
                            actiontype={actionType}
                            dialogOpenClose={addNewDialogOpenClose}
                            // dialogOpenClose={actionType === "New Document" || actionType === "view" || actionType === "ammendment"? true : false}
                            handleClose={() => handleCloseDocumentForm()} />)
                        : ('')
                }
                <FormGroupTitle>Upload Documents</FormGroupTitle>
                <Grid item lg={12} container>
                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div style={{ display: "flex" }}>
                            {/* <Typography className={classes.title}>Add new documents for this patient</Typography> */}
                            <input {...getInputProps()} ref={inputFile} accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" onClick={e => (e.target.value = null)} />
                            <Button
                                component="span"
                                type="file"
                                startIcon={<AttachFileIcon />}
                                disabled={!isEditable}
                                // <Avatar src={<AttachFileIcon />}
                                //     classes={{ root: classes.btnIconRoot }}
                                //     vairent="square"
                                //     className={classes.BtnIcon} />}
                                size="small"
                                className={classes.faxButton}
                                onClick={() => onButtonClick()}
                            > Add Document(s)
                            </Button>
                        </div>
                    </Grid>

                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormGroupTitle></FormGroupTitle>
                    </Grid>

                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container item justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className={classes.dropZone}>
                                <div style={{ width: "100%", height: "100%" }} {...getRootProps({ className: 'dropzone' })}>
                                    {isEditable ? <input {...getInputProps()} accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" /> : ""}
                                  
                                    {/* <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> */}
                                 
                                    {loader ?
                                        <img className={classes.loader} src={LoadingIcon} alt="Loading..." />
                                        : <Typography style={{ textAlign: "center", color: "#919191", fontSize: "14px", fontWeight: 400, padding: "30px" }}>Drop files here to upload</Typography>
                                        }


                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container item justify="center" direction="row" xs={12} sm={9} md={9} lg={9} xl={9}>
                            <FormGroupTitle>Uploaded Documents</FormGroupTitle>
                        </Grid>
                        <Grid container item direction="row" xs={12} sm={3} md={3} lg={3} xl={3}>
                            <Grid container item justify="center" xs={12} sm={5} md={5} lg={5} xl={5}>
                                <Label title="Filter by" size={12} />
                            </Grid>
                            <Grid container item alignItems="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                <SelectField
                                    placeholder="Select Types"
                                    name="type"
                                    value={state.type}
                                    onChange={handleChangebyFilter}
                                    options={typeOptions} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <DocumentGrid
                    ischeckboxes={true}
                    apiUrl="patient/document/getPatientDocuments"
                    isUpdate={update}
                    columnCode="DocumentColumns"
                    dataId={dataId}
                    type={state.type}
                    isEditable = {isEditable}
                    onActionclick={(id, action, url) => handleGridDropDownAction(id, action, url)}
                />

            </>
            {/* </ShadowBox> */}
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