import React, { useState, useEffect } from "react";
import RichTextEditor from 'react-rte';
import {
    Grid,
    FormLabel,
    FormHelperText
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from "./styles";
import { Add as AddIcon } from '@material-ui/icons';

import SearchList from '../../../../components/SearchList/SearchList';
import { InputBaseField, CheckboxField, TextareaField, SelectField } from "../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, Label, ErrorMessage } from "../../../../components/UiElements";
//import { AlertMessage } from "../../../../components/Message";
import { LinkS } from "../../../../components/UiElements";
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
function FormComponent(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [typeList, setTypeList] = useState([{ value: 'Admin', label: 'Admin' }]);
    const [subTypeList, setSubTypeList] = useState([{ value: 'Billing', label: 'Billing' },
    { value: 'Clinical Doc', label: 'Clinical Doc' }, { value: 'Consent', label: 'Consent' }]);
    const [statusList, setStatusList] = useState([{ value: 'Active', label: 'Active' }, { value: 'In Active', label: 'In Active' }]);
    const [versionsList, setVersionsList] = useState([{ value: 'English', label: 'English' }, { value: 'Spanish', label: 'Spanish' }]);

    const [consentForms, setConsentForms] = useState([]);
    const [dataId, setDataId] = useState(props.dataId);
    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);
    const [logdialogstate, setLogDialogState] = useState(false);
    const [isPDFType, setIsPDFType] = useState(true);
    const [forms, setForms] = useState({ Id: 0, Name: "" });
    const [versions, setVersion] = useState({
        FormNames: []
    });
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [state, setState] = useState({

        consentFormID: dataId, name: "", isMandatory: false, isDefaultAssigned: false, formPath: "", fileName: "", formVersionCode: "English", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
    });
    const formConsentRef = useState({ consentFormTitle: "" })
    const [errorMessages, setErrorMessages] = useState({ errorName: false, errorFormStatus: false, errorVersion: false, errorFormType: false, errorFormSubType: false, errorFile: false })


    const [fileUploader, setFileUploader] = useState({ file: null, fileName: null });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const getTypeData = e => {

        var params = {
            code: "form_type",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setTypeList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

                //setChartNotesState(prevState => ({
                //    ...prevState,
                //    ['dischargeDispositionCode']: result.data[0].text1
                //}));
            }
        });
    }

    const getSubTypeData = e => {

        var params = {
            code: "form_sub_type",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setSubTypeList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }
    const getStatusData = e => {

        var params = {
            code: "form_status",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setStatusList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }
    const getVersionsData = e => {

        var params = {
            code: "form_versions",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setVersionsList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }




    function uploadSingleFile(e) {

        let fileName = e.target.files[0].name;
        var ext = e.target.files[0].name.split(".").pop().toLowerCase();
        if (ext == "pdf") {
            setIsPDFType(true)
        }
        else {
            setIsPDFType(false);
            fileName = "";
        }


        setFileUploader({
            file: e.target.files[0],
            fileName: fileName
        })
        setState(prevState => ({
            ...prevState,
            fileName: fileName
        }));
    }



    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIsMandatoryChange = e => {
        setState(prevState => ({
            ...prevState,
            isMandatory: !state.isMandatory
        }));
    }


    const handleIsDefaultChange = e => {
        setState(prevState => ({
            ...prevState,
            isDefaultAssigned: !state.isDefaultAssigned
        }));
    }


    useEffect(() => {
        setFormState();
        //getTypeData();
        //getSubTypeData();
        //getStatusData();
        //getVersionsData();
    }, []);
    const deleteConsentFormItem = (id) => {

        let newId = parseInt(id);



    }
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "Consent Form",
            activity: "Load consent form details",
            details: "User viewed consent detail screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function setFormState() {
        if (dataId > 0 || dataId != "") {
            state.consentFormID = dataId;
            state.name = "";
            state.isMandatory = false;
            state.isDefaultAssigned = false;
            state.fileName = "";
            state.formVersionCode = "English";
            loadData();
            saveAuditLogInfo();
        }
        else {

            setState({
                consentFormID: 0, name: "", formPath: "", fileName: "", isMandatory: false, formVersionCode: "English", isDefaultAssigned: false, createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
            });

        }
    }

    function loadData() {
        PostDataAPI("setup/getConsentForm", dataId).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
                setDataId(
                    result.data.consentFormID
                );
            }
            else if (result.message) {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
        })

    }
    function clear() {
        setFormState();
        setErrorMessages({ errorName: false, errorName: false });
    }
    function deleteRecord() {
        setIsDeleteLoading(true);
        PostDataAPI('setup/deleteConsentForm', state, true).then((result) => {
            setIsDeleteLoading(false);

            if (result.success == true) {
                setErrorMessages([]);
                showMessage("Success", "Record deleted successfully.", "success", 2000); setTimeout(() => { BackToSearch(); }, 2000);
                state.consentFormID = result.data.consentFormID

                setDataId(0);

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
        })
    }

    // function showMessage(type, message) {
    //     setAlertMessageOpenClose(true);
    //     setAlertMessageType(type);
    //     setAlertMessageContent(message);
    // }

    function save() {

        let success = true;
        if (!state.name || state.name.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));
            success = false;
            // formConsentRef.consentFormTitle.focus();
        }

        if (!state.formType || state.formType.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFormType: true
            }));
            success = false;
            // formConsentRef.consentFormTitle.focus();
        }

        if (!state.formSubType || state.formSubType.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFormSubType: true
            }));
            success = false;
            // formConsentRef.consentFormTitle.focus();
        }
        if (!state.formStatus || state.formStatus.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFormStatus: true
            }));
            success = false;
            // formConsentRef.consentFormTitle.focus();
        }
        if (!state.formVersionCode || state.formVersionCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVersion: true
            }));
            success = false;
            // formConsentRef.consentFormTitle.focus();
        }


        if ((!state.formPath || state.formPath.trim() == "") && !fileUploader.file) {
            // setErrorMessages({errorName:,errorFile : true});
            setErrorMessages(prevState => ({
                ...prevState,
                errorFile: true
            }));
            success = false;

        }
        if (state.description == "null")
            state.description = null;

        if (!isPDFType)
            success = false

        if (success == true) {

            setErrorMessages({ errorName: false, errorFile: false });
            setIsPDFType(true);

            let method = "setup/addConsentForm";
            if (dataId > 0)
                method = "setup/updateConsentForm";

            const formData = new FormData();
            for (var key in state) {
                if (key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }
            formData.append("formFile", fileUploader.file);
            formData.append("fileName", fileUploader.fileName);
            setIsSaveLoading(true);
            PostDataAPI(method, formData, true, 'formData').then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);

                    //alert("Record saved successfully.");
                    showMessage("success", "Record saved successfully.", "success", 3000);
                    // showMessage('success', 'Record saved successfully.');

                    if (dataId < 1) {
                        state.consentFormID = result.data.consentFormID
                        setDataId(result.data.consentFormID);
                    }
                }
                else {
                    //alert(result.message);
                    showMessage("Error", result.message, "error", 3000);

                }
            })
        }

    };
    const handleSearcdhListChange = (name, item) => {

        const { id, value } = item;

        setForms(prevState => ({
            ...prevState,
            Id: id,
            Name: value
        }));



        let isExist = versions.FormNames.some(item2 => item2 === value && item2 == false);
        if (!isExist) {
            let _consentFormIds = [...versions.FormNames];

            _consentFormIds.push(value);

            setVersion(prevState => ({
                ...prevState,
                ["FormNames"]: _consentFormIds,
            }));

        }
        else {
            showMessage("Error", "Consent form already exist", "error", 3000);
        }

        setTimeout(function () {
            setForms(prevState => ({
                ...prevState,
                Id: 0,
                Name: ""
            }));
        }, 100);


    }

    function BackToSearch() {
        document.getElementById("btnSearchGrid").click();

    }
    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }

    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <Grid container >
                    {dataId != 0 ? <FormGroupTitle>Edit Form</FormGroupTitle> : <FormGroupTitle>Add New Form</FormGroupTitle>}

                    <Grid item xs={12} sm={12} md={12} lg={12} container direction="row" className={classes.concentForm}>
                        <Grid item lg={12} container direction="row" alignItems="baseline">

                            <Label title="Title" size={2} mandatory={true} />
                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                <InputBaseField
                                    placeholder="Document  Title"
                                    name="name"
                                    value={state.name}
                                    onChange={handleChange}
                                    MaxLength='100'
                                    IsDisabled={!isFormEditable}
                                //inputProps={{ ref: input => formConsentRef.consentFormTitle = input }}
                                />
                                {errorMessages.errorName && (!state.name || state.name.trim() == "") ? (<ErrorMessage >
                                    Please enter title
                                </ErrorMessage>) : ('')}
                            </Grid>

                        </Grid>
                        <Grid item lg={12} container direction="row" alignItems="baseline">
                            <Label title="Type" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField

                                    id="Type"
                                    onChange={handleChange}
                                    value={state.formType}
                                    name="formType"
                                    options={typeList}
                                    placeholder="Select Form Type"

                                />
                                {errorMessages.errorFormType && !state.formType ? (<FormHelperText style={{ color: "red" }} >
                                    Please select form type
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Subtype" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField

                                    id="subType"
                                    onChange={handleChange}
                                    value={state.formSubType}
                                    name="formSubType"
                                    options={subTypeList}
                                    placeholder="Select Subtype"

                                />
                                {errorMessages.errorFormSubType && !state.formSubType ? (<FormHelperText style={{ color: "red" }} >
                                    Please select subtype
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row" alignItems="baseline">
                            <Label title="Status" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField

                                    id="status"
                                    onChange={handleChange}
                                    value={state.formStatus}
                                    name="formStatus"
                                    options={statusList}
                                    placeholder="Select Status"

                                />
                                {errorMessages.errorFormStatus && !state.formStatus ? (<FormHelperText style={{ color: "red" }} >
                                    Please select status
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Version" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField

                                    id="version"
                                    onChange={handleChange}
                                    value={state.formVersionCode}
                                    name="formVersionCode"
                                    options={versionsList}
                                    placeholder="Select Version"

                                />
                                {errorMessages.errorVersion && !state.formVersionCode ? (<FormHelperText style={{ color: "red" }} >
                                    Please select version
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row" alignItems="flex-start">
                            <Label title="Description" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >

                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Description"
                                    onChange={handleChange}
                                    name="description"
                                    value={state.description ? state.description : ""}
                                    MaxLength="2000"
                                />

                                {/*{errorMessages.errorName && (!state.name || state.name.trim() == "") ? (<ErrorMessage >*/}
                                {/*    Please enter title*/}
                                {/*</ErrorMessage>) : ('')}*/}
                            </Grid>

                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">

                            </Grid>
                            <Grid item xs={12} sm={10} md={10} lg={3} >

                                <CheckboxField
                                    color="primary"
                                    name="isDefaultAssigned"
                                    className={classes.checkboxAlign}
                                    checked={state.isDefaultAssigned}
                                    onChange={handleIsDefaultChange}
                                    label="Assign by default on New Appointment"
                                />
                                {/* <FormLabel className={classes.lableInput}>Assign by default on New Appointment</FormLabel> */}

                                <Grid container xs={12} sm={12} md={12} lg={12} >

                                    <CheckboxField
                                        color="primary"
                                        name="isMandatory"
                                        className={classes.checkboxAlign}
                                        checked={state.isMandatory}
                                        onChange={handleIsMandatoryChange}
                                        label="Mandatory"
                                    />
                                    {/* <FormLabel className={classes.lableInput}>Mandatory</FormLabel> */}
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">

                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}
                        container direction="row">


                        <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} alignItems="flex-start">
                            <Grid item container direction="row" xs={12} sm={2} md={2} lg={2} />
                            <Grid item container direction="row" xs={12} sm={2} md={2} lg={2} >
                                <label htmlFor="fileUpload" className={classes.uploadFileBtn}>

                                    <PublishIcon className={classes.uploadFileIcon} alignItems="baseline" /> Upload File

                                </label>
                                <input type="file" id="fileUpload" className={classes.fileUploadInput} onChange={uploadSingleFile} accept="application/pdf" />
                            </Grid>
                            <Grid item container direction="row" xs={12} sm={5} md={5} lg={5} >
                                {
                                    state.fileName != null && state.fileName != "" ? (
                                        <FormLabel className={classes.lableInput}>{state.formPath ? (< LinkS onClick={state.formPath} download={state.fileName} href={"." + state.formPath}>{state.fileName}</LinkS>) : (state.fileName)}</FormLabel>) : ('')

                                }


                            </Grid>

                        </Grid>

                        <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} alignItems="flex-start">
                            <Grid item container direction="row" xs={12} sm={2} md={2} lg={2} />
                            <Grid item container direction="row" xs={12} sm={2} md={2} lg={2} >

                                {errorMessages.errorFile && !fileUploader.file ? (<ErrorMessage >
                                    Please select consent form file
                                </ErrorMessage>) : ('')}
                                {!isPDFType ? (<ErrorMessage >
                                    Only PDF files can be attached
                                </ErrorMessage>) : ('')}
                            </Grid>
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">
                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}>

                            </Grid>
                            <LogDialog
                                code="consentform"
                                id={dataId}
                                dialogOpenClose={logdialogstate}
                                onClose={(dialogstate) => setLogDialogState(dialogstate)}
                            />
                            <ActionDialog
                                title={actiondialogprops.actiondialogtitle}
                                message={actiondialogprops.actiondialogmessage}
                                type={actiondialogprops.actiondialogtype}
                                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                                onSubmit={deleteRecord}
                                onCancel={() => setActionDialogProps(prevState => ({
                                    ...prevState,
                                    actiondialogstate: false,
                                }))
                                }
                            />
                            {/* \nPress Ok to continue and Cancel to stay on the screen. */}
                            <Grid item xs={12} sm={10} md={10} lg={8} style={{ marginTop: "10px" }}>

                                {
                                    isSaveLoading ?
                                        <FormBtn id="loadingSave" className={classes.saveBtn} size="medium">Save</FormBtn>
                                        : <FormBtn id="save" className={classes.saveBtn} onClick={save} size="medium" disabled={!isFormEditable}>Save</FormBtn>
                                }
                                {
                                    dataId != 0 ?
                                        isDeleteLoading ?
                                            <FormBtn id={"loadingDelete"} className={classes.deleteBtn} size="medium">
                                                Delete
                                            </FormBtn> :
                                            <FormBtn id={"delete"} className={classes.deleteBtn} onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete “" + state.name + "”?", "confirm")}
                                                size="medium" disabled={!isFormEditable}>
                                                Delete
                                            </FormBtn>
                                        : null
                                }
                                <FormBtn id={"resetBtn"} className={classes.resetBtn} onClick={clear} size="medium" >Reset </FormBtn>
                                {dataId != 0 ?
                                    <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                    : null
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ShadowBoxMin>
        </>
    );
}

export default withSnackbar(FormComponent)
