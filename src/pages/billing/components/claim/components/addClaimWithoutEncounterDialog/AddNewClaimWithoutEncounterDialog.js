import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    InputBase,
    FormHelperText,
} from "@material-ui/core"

import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import { SelectField, InputBaseField } from "../../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { StateListOptions } from "../../../../../../context/StaticDropDowns";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import PatientSearchList from "../../../../../../components/PatientSearchList/PatientSearchList"

import { validDate } from '../../../../../../components/Common/Extensions';
function AddClaimWithoutEncounterDialog({ showHideDialog, handleClose, proCodeForNdc, ndcCode, stateNdcCode, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const [isFormDirty, setIsFormDity] = useState(false);
    const [reRender, setReRender] = useState(0);

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [locations, setLocations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [formLocations, setFormLocations] = useState([]);
    const [state, setState] = useState({ selectedclaim: 1, patientId: 0, location: 0, examRoom: 0, scheduleTime: "", userId: userInfo.userID });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [errorMessages, setErrorMessages] = useState({
        errorPatient: false, errorLocation: false, errorExamRoom: false,
        errorScheduleTime: false, errorProvider: false
    });
    const [locationId, setLocationId] = useState(0);
    const [searchDisabled, setSearchDisabled] = useState(false);
    let pLocationId = 0;

    const [saveLoading, setSaveLoading] = useState(false);


    useEffect(() => {

        Initialization();

    }, [showHideDialog]);

    const Initialization = () => {

        if (userInfo.isProvider == false) {

            var params = {
                code: "get_all_providers_by_order",
                parameters: [""]
            };

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {

                    setProviders(
                        result.data.map((item, i) => {
                            return { value: item.id, label: item.text1 + ' ' + item.text2 };
                        }));
                }
            })

            getProviderId();
        }
        else if (userInfo.isProvider == true) {
            loadLoggedInProvider();
            getProviderLocations(userInfo.userID, userInfo.isProvider, true);
            setSearchDisabled(true);
        }

    }

    const loadLoggedInProvider = () => {
        setState(prevState => ({
            ...prevState,
            providerId: userInfo.loggedInUserID,
            providerName: userInfo.firstName + ' ' + userInfo.lastName
        }))
    }

    const getUserLocationsByID = userID => {

        let data = {
            userID: userID.toString()
        }

        PostDataAPI("user/getProviderLocations", data).then((result) => {

            if (result.success && result.data != null) {

                // var pLocationId = 0;
                setFormLocations(

                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));
            }

        })
    };

    function setRoomsbyLocation(locationId) {

        PostDataAPI("appointment/getPatientAppointmentRooms", parseInt(locationId)).then((result) => {

            if (result.success && result.data != null) {

                setRooms(
                    result.data.map((item, i) => {
                        return { value: item.roomID, label: item.roomName };
                    }));
            }
        })
    }

    function getProviderLocations(userId, is_Provider, encUID) {

        let data = {
            userID: userId
        }
        var method = "user/getUserLocations";
        if (encUID == false)
            method = "user/getProviderLocations";

        PostDataAPI(method, data).then((result) => {

            if (result.success && result.data != null) {

                setFormLocations(
                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));
                if (pLocationId > 0) {

                    setRoomsbyLocation(pLocationId);
                }
            }
        });
    }

    const handleChangeDoctor = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        setIsFormDity(true);
        getProviderLocations(value, userInfo.isProvider, false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        setIsFormDity(true);
        if (name === "location")
            setRoomsbyLocation(value);
    }

    const handleFormatting = () => {

        state.providerId = state.providerId ? parseFloat(state.providerId) : null;
        state.patientId = state.patientId ? parseFloat(state.patientId) : null;
        state.location = state.location ? parseFloat(state.location) : null;
        state.examRoom = state.examRoom ? parseFloat(state.examRoom) : null;

    }

    const ValidateClaim = (errorList) => {

        if (state.providerId == "" || state.providerId == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorProvider: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProvider: false
            }));
        }

        if (state.patientId == "" || state.patientId == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPatient: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatient: false
            }));
        }

        if (state.location == "" || state.location == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: false
            }));
        }

        if (state.examRoom == "" || state.examRoom == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorExamRoom: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorExamRoom: false
            }));
        }
        if (state.scheduleTime == "" || state.scheduleTime == undefined) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorScheduleTime: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorScheduleTime: false
            }));
        }
        if (validDate(state?.scheduleTime)) {
            errorList.push(true);
            showMessage('Error', 'Please select a valid date', 'error', 3000)
        }

    }

    const Save = e => {

        let errorList = [];
        ValidateClaim(errorList);

        if (errorList.length < 1) {

            let method = "claim/addClaimWithOutEncounter";

            handleFormatting();

            setSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setSaveLoading(false);
                if (result.success && result.data != null) {

                    //showMessage("Success", "Claim with out encounter created successfully.", "success", 3000); //by QA item 916

                    setTimeout(() => {

                        redirectToClaimPage(result.data)

                    }, 500)
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }

    };

    const redirectToClaimPage = (encounterId) => {

        let winLocation = window.location.href.split('billing')[0] + 'addclaim?id=' + encounterId + '/' + state.patientId + '/0/billing';
        window.location.href = winLocation;

    }

    const handleChangePatientId = (item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    const handleSearcdhListChange = (name, item) => {

        const { id, value } = item;

        if (name == "patientId") {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));

        }
        else if (name == "providerId") {
            setState(prevState => ({
                ...prevState,
                providerId: id,
                providerName: value
            }));
            setIsFormDity(true);
            GetUserLocations(id);

        }
        //else if (name == "location") {
        //    setState(prevState => ({
        //        ...prevState,
        //        location: id,
        //        locationName: value
        //    }));
        //}

    }

    const GetUserLocations = (id) => {

        var params = {
            code: "get_user_locations",
            parameters: [id.toString(), ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setLocations(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })
    }

    function toDayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
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

    const getProviderId = () => {
        let userId = 0;
        var params = {
            code: "",
            parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
        }
        PostDataAPI('user/getUserDecr', params, true).then((result) => {
            if (result.success) {
                getUserLocationsByID(result.data);
            }
            else {
                userId = 0;
            }
        })

        return userId;
    }
    const onClose = () => {
        if (isFormDirty) {
            ShowActionDialog(false, "Alert", "You have some unsaved data. Do you want to close this dialog?", "confirm", function () {
                handleClose();
            });
        } else {
            handleClose();
        }
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
                            <FormGroupTitle>New Claim</FormGroupTitle>
                            <span className={classes.crossButton} onClick={onClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>

                            <Grid container direction="row" lg={12}>
                                <Label title="Patient" size={3} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>

                                  

                                    {/* <PatientSearchList
                                        id="patientId"
                                        name={state.patientName}
                                        value={state.patientId}
                                        onChangeValue={(iteapm) => handleChangePatientId(item)}
                                        placeholderTitle="Search Patient"
                                        reRender={reRender}
                                    /> */}

                                    <SearchList
                                        id="patientId"
                                        name="patientId"
                                        value={state.patientId}
                                        searchTerm={state.patientName}
                                        code="patient_Search"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                        placeholderTitle="Patient Name"
                                    />
                                    {errorMessages.errorPatient && !state.patientId ? (<FormHelperText style={{ color: "red" }} >
                                        Please select patient
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            
                            <Grid container direction="row" lg={12}>
                                <Label title="Location" size={3} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <SelectField
                                        id="location"
                                        name="location"
                                        value={state.location}
                                        onChange={handleChange}
                                        options={formLocations}
                                        placeholder="Select Location"
                                    />

                                    {errorMessages.errorLocation && !state.location ? (<FormHelperText style={{ color: "red" }} >
                                        Please select location
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Provider" size={3} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>

                                    {
                                        userInfo.isProvider ? (<InputBaseField
                                            placeholder="Provider Name"
                                            onChange={handleChangeDoctor}
                                            name="providerId"
                                            // value={userInfo.fullName}
                                            value={`${userInfo.firstName} ${userInfo.lastName}`}
                                            MaxLength='255'
                                            disabled
                                        //inputProps={{ ref: input => appointmentRef.providersRef = input }}
                                        />) : (
                                            <SelectField
                                                placeholder="Select Provider"
                                                onChange={handleChangeDoctor}
                                                name="providerId"
                                                value={state.providerId}
                                                MaxLength='255'
                                                options={providers}
                                            />
                                        )
                                    }

                                    {errorMessages.errorProvider && !state.providerId ? (<FormHelperText style={{ color: "red" }} >
                                        Please select provider
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Exam Room" size={3} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <SelectField
                                        id="examRoom"
                                        name="examRoom"
                                        value={state.examRoom}
                                        onChange={handleChange}
                                        options={rooms}
                                        placeholder="Select Exam Room"
                                    />
                                    {errorMessages.errorExamRoom && !state.examRoom ? (<FormHelperText style={{ color: "red" }} >
                                        Please select room
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Schedule Date" size={3} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <InputBaseField
                                        onChange={handleChange}
                                        name="scheduleTime"
                                        value={state.scheduleTime}
                                        MaxLength="255"
                                        type="date"
                                        inputProps={{ max: toDayDate() }}
                                    />
                                    {errorMessages.errorScheduleTime && !state.scheduleTime ? (<FormHelperText style={{ color: "red" }} >
                                        Please select schedule date
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>


                            <Grid container direction="row" lg={12}>
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
                                    <div className={classes.footer}>
                                        <div className={classes.footer}>
                                            {
                                                saveLoading ?

                                                    <FormBtn id="loadingSave" > Save </FormBtn> :

                                                    <FormBtn id="save" onClick={Save}> Save </FormBtn>
                                            }
                                            <FormBtn id="reset" onClick={onClose}> Close </FormBtn>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
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
export default withSnackbar(AddClaimWithoutEncounterDialog)