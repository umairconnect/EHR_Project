import React, { useState, useEffect } from "react";
import {
    Grid,
    NativeSelect,
} from '@material-ui/core';

import useStyles from "./styles";

import { PostDataAPI, PutDataAPI } from '../../../../Services/APIService';
import { MultiSelectField, InputBaseField } from "../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, ErrorMessage, Label } from "../../../../components/UiElements"
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../../components/Message/Alert"
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function AppointmentProfileForm(props) {
    var classes = useStyles();

    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);
    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [logdialogstate, setLogDialogState] = useState(false);

    const [state, setState] = useState({

        appointmentProfileID: dataId, profileName: "", duration: -1, visitReason: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0,
        consentFormIds: []
    });

    const AppointmentProfileFormRef = useState({ profileNameRef: "", durationRef: "", visitReasonRef: "" });

    const [errorMessages, setErrorMessages] = useState({ errorProfileName: false, errorDuration: false, errorVisitReason: false })
    const [consentForms, setConsentForms] = useState([]);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });


    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleMultiSelectChange = (name, selected) => {
        setState(prevState => ({
            ...prevState,
            [name]: selected
        }));
    };

    useEffect(() => {
        var data = {
            code: "consent_form_for_app_profile",
            parameters: [dataId ? dataId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", data).then((result) => {

            if (result.success && result.data != null) {
                setConsentForms(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
            setFormState();
        })


    }, []);

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "Appointment Profile Form",
            activity: "Load appointment profile form details",
            details: "User viewed appointment profile detail screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function setFormState() {
        if (dataId > 0 || dataId != "") {
            state.appointmentProfileID = dataId;
            state.profileName = "";
            state.duration = -1;
            state.visitReason = "";
            state.consentFormIds = [];

            loadData();
            saveAuditLogInfo();
        }
        else {

            setState({
                appointmentProfileID: 0, profileName: "", duration: -1, visitReason: "", consentFormIds: [], createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
            });

        }
    }

    function loadData() {
        PostDataAPI("setup/getAppointmentProfile", dataId).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);
                setState({
                    profileName: result.data.profileName,
                    duration: result.data.duration,
                    visitReason: result.data.visitReason,
                    consentFormIds: result.data.consentFormIds,
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    appointmentProfileID: result.data.appointmentProfileID
                });


            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }
    function clear() {
        setFormState();
        setErrorMessages({ errorProfileName: false, errorDuration: false, errorVisitReason: false });
    }


    function deleteRecord() {

        setIsDeleteLoading(true);
        PostDataAPI('setup/deleteAppointmentProfile', state, true).then((result) => {

            setIsDeleteLoading(false);
            if (result.success == true) {
                setErrorMessages({ errorProfileName: false, errorDuration: false, errorVisitReason: false });

                //alert("Record deleted successfully.");
                showMessage("Success", "Record deleted successfully.", "success", 2000); setTimeout(() => { BackToSearch(); }, 2000);
                state.appointmentProfileID = result.data.appointmentProfileID

                setDataId(0);

            }
            else {
                //alert(result.message);
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    function save() {
        let success = true;
        if (!state.visitReason || state.visitReason.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVisitReason: true
            }));
            success = false;
            //AppointmentProfileFormRef.visitReasonRef.focus();
        }
        if (!state.duration || parseInt(state.duration) < 1) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDuration: true
            }));
            success = false;
            // AppointmentProfileFormRef.durationRef.focus();
        }
        if (!state.profileName || state.profileName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfileName: true
            }));
            success = false;
            // AppointmentProfileFormRef.profileNameRef.focus();
        }

        if (success == true) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfileName: false
            }));

            let method = "setup/addAppointmentProfile";
            if (dataId > 0)
                method = "setup/updateAppointmentProfile";
            state.duration = parseInt(state.duration);

            setIsSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);

                    //alert("Record saved successfully.");
                    showMessage("Success", "Record saved successfully..", "success", 3000);

                    if (dataId < 1) {
                        state.appointmentProfileID = result.data.appointmentProfileID
                        setDataId(result.data.appointmentProfileID);
                    }
                }
                else {
                    //alert(result.message);

                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    };

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
                    <FormGroupTitle>Name</FormGroupTitle>

                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} md={2} sm={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Profile Name<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Profile Name" size={2} mandatory={true} />
                        <Grid item xs={12} md={4} sm={4} lg={3} >
                            <InputBaseField

                                placeholder="Enter Profile Name"
                                onChange={handleChange}
                                name="profileName"
                                value={state.profileName}
                                MaxLength='100'
                            // inputProps={{ ref: input => AppointmentProfileFormRef.profileNameRef = input }}

                            />
                            {errorMessages.errorProfileName && (!state.profileName || state.profileName.trim() == "") ? (<ErrorMessage >
                                Please enter profile name
                            </ErrorMessage>) : ('')}
                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} md={2} sm={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Duration<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Duration" size={2} mandatory={true} />

                        <Grid item xs={12} md={4} sm={4} lg={3} >

                            <NativeSelect id="select" disableUnderline
                                className={classes.baseInput}
                                onChange={handleChange}
                                name="duration"
                                value={state.duration}
                            // inputProps={{ ref: input => AppointmentProfileFormRef.durationRef = input }}
                            >
                                <option value="-1">Select Duration</option>
                                <option value="10">10 mins</option>
                                <option value="15">15 mins</option>
                                <option value="20">20 mins</option>
                                <option value="25">25 mins</option>
                                <option value="30">30 mins</option>
                                <option value="40">40 mins</option>
                                <option value="50">50 mins</option>
                                <option value="60">60 mins</option>
                            </NativeSelect>
                            {errorMessages.errorDuration && (!state.duration || parseInt(state.duration) < 1) ? (<ErrorMessage >
                                Please select duration
                            </ErrorMessage>) : ('')}
                        </Grid>
                        {/* <Grid item xs={12} md={2} sm={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Visit Reason<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Visit Reason" size={2} mandatory={true} />

                        <Grid item xs={12} md={4} sm={4} lg={3} >
                            <InputBaseField

                                placeholder="Enter Visit Reason"
                                onChange={handleChange}
                                name="visitReason"
                                value={state.visitReason}
                                MaxLength='200'
                            //inputProps={{ ref: input => AppointmentProfileFormRef.visitReasonRef = input }}
                            />
                            {errorMessages.errorVisitReason && (!state.visitReason || state.visitReason.trim() == "") ? (<ErrorMessage >
                                Please enter visit reason
                            </ErrorMessage>) : ('')}
                        </Grid>


                    </Grid>

                    <FormGroupTitle>Patient Forms</FormGroupTitle>

                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} md={2} sm={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}>
                            <FormLabel className={classes.lableInput}>Consent Form:</FormLabel>
                        </Grid> */}
                        <Label title="Consent Form" size={2} />{/* mandatory={true}*/}

                        <Grid item xs={12} md={4} sm={4} lg={3}>
                            <MultiSelectField id={"ConsentForm"} onChange={handleMultiSelectChange} name="consentFormIds"
                                placeholder="Select Consent Form(s)" options={consentForms}
                                Value={state.consentFormIds} />


                        </Grid>

                    </Grid>

                    <Grid item lg={12}
                        container
                        direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                            alignItems="flex-end">

                        </Grid>
                        <LogDialog
                            code="appointmentprofile"
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
                        {/* Press Ok to continue and Cancel to stay on the screen. */}
                        <Grid item lg={10} style={{ marginTop: "10px" }}>

                            {
                                isSaveLoading ?
                                    <FormBtn id={"loadingSave"} size={"medium"}>Save</FormBtn>
                                    : <FormBtn id={"save"} onClick={save} size={"medium"} disabled={!isFormEditable}>Save</FormBtn>
                            }
                            {
                                dataId != 0 ?
                                    isDeleteLoading ?
                                        <FormBtn id={"loadingDelete"} size={"medium"}>Delete</FormBtn>
                                        : <FormBtn id={"delete"} onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete appointment profile? ", "confirm")}
                                            size={"medium"} disabled={!isFormEditable}>Delete</FormBtn>
                                    : null
                            }
                            <FormBtn id={"resetBtn"} onClick={clear} size={"medium"}>Reset</FormBtn>
                            {dataId != 0 ?
                                <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                : null
                            }
                        </Grid>
                    </Grid>

                </Grid>
            </ShadowBoxMin>
        </>
    );
}

export default withSnackbar(AppointmentProfileForm)