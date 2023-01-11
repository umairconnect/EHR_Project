import React, { useState, useEffect } from "react";
import {
    Grid,
    Button
} from '@material-ui/core';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';

import { InputBaseField } from "../../../../components/InputField/InputField";
import { ShadowBoxMin, FormGroupTitle, ErrorMessage, Label, FormBtn } from "../../../../components/UiElements";

//import { AlertMessage, } from "../../../../components/Message/Message";
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function SpecialityForm(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);
    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);
    //console.log("Provider form edit checking " + isFormEditable);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [state, setState] = useState({

        specializationID: dataId, name: "", description: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
    });
    const specialityFormRef = useState({ nameRef: "", });

    const [errorMessages, setErrorMessages] = useState({ errorname: false })
    const [alertMessageOpenClose, setAlertMessageOpenClose] = useState(false);
    const [alertMessageType, setAlertMessageType] = useState('success');
    const [alertMessageContent, setAlertMessageContent] = useState('Message');
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


    useEffect(() => {
        setFormState();
    }, []);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "Speciality form setup",
            activity: "Load speciality form details",
            details: "User viewed speciality form screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function setFormState() {
        if (dataId > 0 || dataId != "") {
            state.specializationID = dataId;
            state.name = "";
            state.description = "";
            loadData();
            saveAuditLogInfo();
        }
        else {

            setState({
                specializationID: 0, name: "", description: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
            });
        }
    }

    function loadData() {
        GetDataAPI("setup/getSpecialization", "id=" + dataId).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
        })

    }
    function clear() {
        setFormState();
        setErrorMessages({ errorname: false });
    }
    function deleteRecord() {

        setIsDeleteLoading(true);
        PostDataAPI('setup/deleteSpecialization', state, true).then((result) => {
            setIsDeleteLoading(false);

            if (result.success == true) {
                setErrorMessages([]);

                showMessage("Success", "Record deleted successfully.", "success", 2000); setTimeout(() => { BackToSearch(); }, 2000);
                state.specializationID = result.data.specializationID

                setDataId(0);

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
        })
    }

    function save() {

        if (state.name === undefined || state.name.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorname: true
            }));
            //specialityFormRef.nameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorname: false
            }));

            let method = "setup/addSpecialization";
            if (dataId > 0)
                method = "setup/updateSpecialization";
            state.duration = parseInt(state.duration);
            setIsSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);

                    showMessage("Success", "Record saved successfully.", "success", 3000);
                    // showMessage('success', "Record saved successfully.");

                    if (dataId < 1) {
                        state.specializationID = result.data.specializationID
                        setDataId(result.data.specializationID);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    // showMessage('error', result.message);
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

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Name<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Name" size={2} mandatory={true} />
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField

                                placeholder="Enter Name"
                                onChange={handleChange}
                                name="name"
                                value={state.name}
                                MaxLength='100'
                            // inputProps={{ ref: input => specialityFormRef.nameRef = input }}
                            />
                            {errorMessages.errorname && (!state.name || state.name.trim() == "") ? (<ErrorMessage >
                                Please enter name
                            </ErrorMessage>) : ('')}
                        </Grid>
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Description:</FormLabel>
                        </Grid> */}
                        <Label title="Description" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField

                                placeholder="Enter Description"
                                onChange={handleChange}
                                name="description"
                                value={state.description}
                                MaxLength='100'
                            />

                        </Grid>

                    </Grid>
                    <Grid item lg={12}
                        container
                        direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end">
                        </Grid>
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
                                    <FormBtn id="loadingSave" size="medium">
                                        Save
                                    </FormBtn>
                                    : <FormBtn id="save" onClick={save} size="medium" disabled={!isFormEditable}>
                                        Save
                                    </FormBtn>
                            }

                            {
                                dataId != 0 ?
                                    isDeleteLoading ?
                                        <FormBtn id="loadingDelete" size="medium">
                                            Delete
                                        </FormBtn> : <FormBtn id="delete" onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete specialisation? ", "confirm")} size="medium" disabled={!isFormEditable}>
                                            Delete
                                        </FormBtn>
                                    : null
                            }
                            <Button className={classes.resetBtn} onClick={clear} size="medium" >Reset </Button>


                        </Grid>
                    </Grid>

                </Grid>
            </ShadowBoxMin>
        </>
    );
}

export default withSnackbar(SpecialityForm)
