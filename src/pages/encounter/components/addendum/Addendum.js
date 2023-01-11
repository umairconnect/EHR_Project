/// <reference path="../../../../common/allowedattachments.js" />
import React, { useState, useEffect, useRef } from "react";
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
    IconButton,
    Typography,
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, CheckboxField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FooterBtn, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import EraseIcon from "../../../../images/icons/erase.png"
import DeleteIcon from "../../../../images/icons/trash.png"
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { AttachFile } from '@material-ui/icons';
import { allowedAttachments } from "../../../../common/allowedAttachments";

function Addendum({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();

    const [state, setState] = useState({
        encounterAddendumId: 0, encounterId: props.encounterId, requestDatetime: null, requestedByType: null, requestedTime: null,
        requestedForCode: null, requestDetails: null, statusCode: "Pending", isAppended: false, isDeleted: false, requestedDate: '',
        createDate: new Date().toISOString(), createdBy: 0, updateDate: null, updatedBy: 0, encounterStatus: null
    });
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isSaving, setISaving] = useState(false);
    const [addendumRequestedForCodes, setAddendumRequestedForCodes] = useState([]);
    const [addendumStatus, setAddendumStatus] = useState([]);
    const [allProviders, setAllProviders] = useState([]);
    const [errorMessages, setErrorMessages] = useState({ requestedDateError: false, requestDetailsError: false });
    let saveStatus = "";
    const [popupTitle, setPopupTitle] = useState("Add Addendum");
    const [attachment, setAttachment] = useState({ file: null, fileToSend: null, fileName: null });
    const inputFile = useRef(null);
    const commonAttachments = allowedAttachments();

    var _addendumRequestedForCodes = [];
    var _addendumStatus = [];

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

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

    function clear() {

        setState({
            encounterAddendumId: 0, encounterId: props.encounterId, requestDatetime: null, requestedByType: null, requestedTime: null,
            requestedForCode: null, requestDetails: '', statusCode: "Pending", isAppended: false, isDeleted: false, requestedDate: '',
            createDate: new Date().toISOString(), createdBy: 0, updateDate: null, updatedBy: 0, encounterStatus: null
        });
        saveStatus = "";
        setErrorMessages({ requestedDateError: false, requestDetailsError: false });
        setPopupTitle("Add Addendum");

        if (document.getElementById("uploadFile"))
            document.getElementById("uploadFile").value = '';
        setAttachment({ file: null, fileToSend: null, fileName: null });
    }

    function loadAllProviders() {

        var params = {
            code: "provider_By_Search",
            parameters: [userInfo.userID.toString(), ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setAllProviders(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })
    }

    //-------------------------

    useEffect(() => {

        clear();

        if (showHideDialog) {
            loadAllProviders();

            var params = {
                code: "DDL_List_Item",
                parameters: ['addendum_requested_for_code', 'addendum_status']
            };

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {

                    var _addendumRequestedForCodes = [];
                    var _addendumStatus = [];

                    result.data.map((item, i) => {

                        if (item.text3 == 'addendum_requested_for_code')
                            _addendumRequestedForCodes.push({ value: item.text1, label: item.text2 });

                        if (item.text3 == 'addendum_status')
                            _addendumStatus.push({ value: item.text1, label: item.text2 });

                    });
                    setAddendumRequestedForCodes(_addendumRequestedForCodes);
                    setAddendumStatus(_addendumStatus);
                }
            })

            if (props.encAddendumId > 0) {
                setPopupTitle("View");
                loadData();
            }

        }
    }, [showHideDialog]);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChkboxChange = (e) => {

        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    function Accepted() {
        saveStatus = "accepted";
        Save();

    }
    function Rejected() {

        saveStatus = "rejected";
        Save();

    }

    function Save() {
        
        var validated = true;

        if (state.requestedDate === null || state.requestedDate === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                requestedDateError: true
            }));

            validated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                requestedDateError: false
            }));
        }


        if (state.requestDetails === null || state.requestDetails === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                requestDetailsError: true
            }));

            validated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                requestDetailsError: false
            }));
        }

        if (validated == false)
            return;


        let method = "encounter/addAddendum";

        if (state.encounterAddendumId > 0) {

            method = "encounter/updateAddendum";
        }
        else
            state.RequestDatetime = state.requestedDate ? state.requestedTime ? state.requestedDate + 'T' + state.requestedTime : state.requestedDate : null;
        state.statusCode = saveStatus.toString();

        const formData = new FormData();
        for (var key in state) {
            if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                formData.append(key, state[key]);
        }

        formData.append("formFile", attachment.fileToSend);
        formData.append("fileName", attachment.fileName);


        PostDataAPI(method, formData, true).then((result) => {

            if (result.success == true) {

                if (state.encounterAddendumId < 1) {

                    if (result.success && result.data != null) {

                        showMessage("Success", "Addendum saved successfully.", "success", 3000);

                        updateEncounterAddendumFlag();
                        setState(result.data);
                        setTimeout(function () { handleClose() }, 300);
                    }
                }
                else if (state.encounterAddendumId > 0 || state.encounterAddendumId != "") {

                    if (result.success) {

                        showMessage("Success", "Addendum updated successfully.", "success", 3000);
                        handleClose();
                    }
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);

            }
        })

    }

    function updateEncounterAddendumFlag() {

        var params = {
            code: "",
            parameters: [props.encounterId ? props.encounterId.toString() : "",
            userInfo.userID ? userInfo.userID.toString() : ""]
        }
        PostDataAPI("encounter/updateEncounterAddendumStatus", params).then((result) => {

            if (result.success && result.data != null) {
                props.updateAdd();
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    function deleteRecord() {

        var data = {
            encounterAddendumId: parseInt(state.encounterAddendumId),
            isDeleted: true
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the addendum?", "confirm", function () {

            PostDataAPI('encounter/deleteAddendum', data, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    //handleClose();
                    //updateGrid();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })

    }


    function loadData() {


        PostDataAPI("encounter/getEncounterAddendumByID", parseInt(props.encAddendumId)).then((result) => {

            if (result.success && result.data != null) {

                document.getElementById("uploadFile").value = result.data.documentTitle ? result.data.documentTitle : '';
                result.data.requestedDate = result.data.requestDatetime.split('T')[0];
                result.data.requestedTime = result.data.requestDatetime.split('T')[1];
                setState(result.data);
            }
        });

    }

    function handleFileUpload(e) {
        if (e.target.files == null || e.target.files.length <= 0)
            return;
        const name = e.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        //var ext = e.target.files[0].name.match(/\.(.+)$/)[1];

        switch (ext) {
            case commonAttachments[ext]:
                break;
            default:
                showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg .xlxs", "error", 3000);
                document.getElementById("uploadFile").value = '';
                return;
        }

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const closePopup = () => {
        handleClose();
        if (document.getElementById("uploadFile") != null)
            document.getElementById("uploadFile").value = '';

    }

    return (
        <>

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                open={showHideDialog}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown>
                <Scrollbars autoHeight autoHeightMax={700} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle className={classes.lableTitleInput}>{popupTitle}</FormGroupTitle>

                            </div>
                            <Scrollbars autoHeight autoHeightMax={620}
                                style={{ maxHeight: 580, display: "flex", }}>
                                <div className={classes.content}>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>


                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Requested Date" size={3} mandatory={true} />
                                            <Grid item justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                <InputBaseField
                                                    type="date"
                                                    id="requestedDate"
                                                    name="requestedDate"
                                                    value={state.requestedDate}
                                                    onChange={handleChange}
                                                    IsDisabled={props.encAddendumId > 0}
                                                />
                                                {errorMessages.requestedDateError && !state.requestedDate ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select requested date
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Requested Time" size={3} />
                                            <Grid item justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                <InputBaseField
                                                    type="time"
                                                    id="requestedTime"
                                                    name="requestedTime"
                                                    value={state.requestedTime}
                                                    onChange={handleChange}
                                                    IsDisabled={props.encAddendumId > 0}
                                                />
                                                {errorMessages.requestedTimeError && !state.requestedTime ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select request time
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Requested By" size={3} />
                                            <Grid item justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                <SelectField
                                                    id="requestedByType"
                                                    name="requestedByType"
                                                    placeholder="Please select Provider"
                                                    options={allProviders}
                                                    value={state.requestedByType}
                                                    onChange={handleChange}
                                                    disabled={props.encAddendumId > 0}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Label title="Upload Documents" size={3} />
                                            <Grid item justify="flex-end" xs={12} sm={8} md={8} lg={7} xl={7} >
                                                <span className={classes.btnSpan}>
                                                    <InputBaseField
                                                        id="uploadFile"
                                                        name="uploadFile"
                                                        placeholder="Upload Files"
                                                        value={attachment.fileName}
                                                        IsDisabled={true}
                                                        IsDisabled={props.encAddendumId > 0}
                                                    />
                                                    <IconButton
                                                        className={classes.attachmentBtn}
                                                        color="primary"
                                                        onClick={handleSelectFile}
                                                        disable={props.encAddendumId > 0}>
                                                        <AttachFile />
                                                    </IconButton>

                                                </span>
                                                <form>
                                                    <div>
                                                        <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                                    </div>
                                                </form>
                                            </Grid>

                                        </Grid>
                                        {/*<Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                        {/*    <Label title="Requested For" size={3} />*/}
                                        {/*    <Grid item justify="flex-end" xs={9} sm={7} md={7} lg={6} xl={6}>*/}
                                        {/*        <SelectField*/}
                                        {/*            id="requestedForCode"*/}
                                        {/*            name="requestedForCode"*/}
                                        {/*            placeholder="Requested For"*/}
                                        {/*            options={addendumRequestedForCodes}*/}
                                        {/*            value={state.requestedForCode}*/}
                                        {/*            onChange={handleChange}*/}
                                        {/*        />*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}


                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Request Details" isTextAreaInput={true} size={3} mandatory={true} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={9} md={9} lg={9} xl={9}>
                                                <TextareaField
                                                    rowsMin={5}
                                                    MaxLength="2000"
                                                    id="requestDetails"
                                                    name="requestDetails"
                                                    value={state.requestDetails}
                                                    onChange={handleChange}
                                                    disabled={props.encAddendumId > 0}
                                                />
                                                {errorMessages.requestDetailsError && !state.requestDetails ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter request details
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        {/*<Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                        {/*    <Label title="Status" size={3} />*/}
                                        {/*    <Grid item justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>*/}
                                        {/*        <SelectField*/}
                                        {/*            id="statusCode"*/}
                                        {/*            name="statusCode"*/}
                                        {/*            placeholder="Status"*/}
                                        {/*            options={addendumStatus}*/}
                                        {/*            value={state.statusCode}*/}
                                        {/*            onChange={handleChange}*/}
                                        {/*        />*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid container alignItems='flex-start' justify="center" xs={12} sm={4} md={4} lg={4} xl={4}>*/}
                                        {/*        <CheckboxField*/}
                                        {/*            color="primary"*/}
                                        {/*            name="isAppended"*/}
                                        {/*            label="Appended"*/}
                                        {/*            checked={state.isAppended ? true : false}*/}
                                        {/*            onChange={handleChkboxChange}*/}
                                        {/*        />*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}


                                    </Grid>
                                </div>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {state.encounterAddendumId < 1 ?
                                    isSaving ?
                                        <FormBtn id="loadingSave"> Accept</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={Accepted}> Accept</FormBtn>
                                    : null
                                }
                                {state.encounterAddendumId < 1 ?
                                    isSaving ?
                                        <FormBtn id="loadingSave"> Reject</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={Rejected}> Reject</FormBtn>
                                    : null
                                }
                                {/*{*/}
                                {/*    state.encounterAddendumId > 0 && state.statusCode == "Pending" ?*/}
                                {/*        <FormBtn id={"delete"} onClick={deleteRecord} size="medium">*/}
                                {/*            Delete*/}
                                {/*        </FormBtn>*/}
                                {/*        : null*/}
                                {/*}*/}
                                <FormBtn id="reset" onClick={closePopup}> Close </FormBtn>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
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

export default withSnackbar(Addendum)
