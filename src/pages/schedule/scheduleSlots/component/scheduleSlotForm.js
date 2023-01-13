import React, { useState, useEffect } from "react";
import {
    Grid,
    FormLabel,
    Button,
    Checkbox

} from '@material-ui/core';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { CheckboxField, SelectField, InputBaseField } from "../../../../components/InputField/InputField";
import { ShadowBoxMin, FormGroupTitle, ErrorMessage, Label } from "../../../../components/UiElements";
import { GetDataAPI } from '../../../../Services/GetDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { withSnackbar } from "../../../../components/Message/Alert";

//import { AlertMessage } from "../../../../components/Message/Message";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";


function ScheduleSlotsForm(props) {

    const { showMessage } = props;
    var classes = useStyles();
    const [dataId, setDataId] = useState(props.dataId);

    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);

    //set isProvider flag

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };


    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();

    const [breakReasons] = useState([
        {
            value: "Lunch",
            label: "Lunch"
        },
        {
            value: "Meeting",
            label: "Meeting"
        }
    ]);
    const [durations] = useState([
        {
            value: "10",
            label: "10 mins"
        },
        {
            value: "15",
            label: "15 mins"
        },
        {
            value: "20",
            label: "20 mins"
        },
        {
            value: "25",
            label: "25 mins"
        },
        {
            value: "30",
            label: "30 mins"
        },
        {
            value: "40",
            label: "40 mins"
        },
        {
            value: "50",
            label: "50 mins"
        },
        {
            value: "60",
            label: "60 mins"
        },
    ]);

    const [state, setState] = useState({
        fromDate: addDays(new Date(), 0).toString(),
        toDate: addDays(new Date(), 31).toString(),
        fromTime: "08:00 am",
        toTime: "18:00 pm",
        isOverbooking: false,
        isBreak: false,
        monday: true,
        tuesday: true,
        wedensday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,

    });
    const scheduleSlotsFormRef = useState({
        providerRef: "", locationRef: "", fromDateRef: "", toDateRef: "",
        fromTimeRef: "", toTimeRef: "", durationRef: "", daysRef: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorFromDate: false, errorToDate: false, errorFromTime: false, errorToTime: false,
        errorProvider: false, errorLocation: false, errorDuration: false, errorBreakReason: false,
        invalidFromDate: false, invalidFromTime: false, timeInPast: false, dateInPast: false, errorDays: false, errorBreakDays: false
    })


    const [locations, setLocations] = useState([]);
    const [providers, setProviders] = useState([]);
    //To default primary location and provider
    const [primaryLocationId, setPrimaryLocationId] = useState(0);
    const [primaryProviderId, setPrimaryProviderId] = useState(0);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        dialogactiontype: null, actiondialogstate: false, actiondialogtitle: "Title",
        actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [confirm, setConfirm] = useState(false);
    //
    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleProviderChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        getUserLocations(value, false);

    };
    const handleCheckBoxChange = e => {
        
        const { name } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    };

    const getUserLocations = (userID, encUID) => {

        let data = {
            userID: userID
        }

        var method = "user/getUserLocations";
        if (!encUID || encUID == false)
            method = "user/getProviderLocations";

        PostDataAPI(method, data).then((result) => {

            if (result.success && result.data != null) {
                var pLocationId = 0;
                setLocations(
                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));

                if (pLocationId > 0) {
                    setState(prevState => ({
                        ...prevState,
                        userLocationID: pLocationId
                    }));
                    setPrimaryLocationId(pLocationId);
                }
                else {
                    setPrimaryLocationId(0);
                }
            }

        })
    };
    const getMonthDate = (value) => {
        if (value) {
            let today = date.getDate();
            let newdate = "";
            if (m <= 9) {
                if (today <= 9) {
                    newdate = y + `-0${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-0${m + 1}` + `-${date.getDate()}`
                }
            } else {
                if (today <= 9) {
                    newdate = y + `-${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-${m + 1}` + `-${date.getDate()}`
                }
            }
            return newdate;
        }
        else {
            let date = new Date(y, m + 1, 0);
            let newdate = "";
            if (m <= 9) {
                newdate = y + `-0${m + 1}` + `-${date.getDate()}`
            } else {
                newdate = y + `-${m + 1}` + `-${date.getDate()}`
            }
            return newdate;
        }
        return date;
    }
    useEffect(() => {

        if (userInfo.isProvider == true) {

            getUserLocations(userInfo.userID, true);
        }
        if (userInfo.isProvider == false) {

            let data = {
                userID: userInfo.userID
            }

            PostDataAPI("user/getStaffProviders", data).then((result) => {

                if (result.success && result.data != null) {


                    var primProviderId = 0;
                    setProviders(
                        result.data.map((item, i) => {
                            if (item.p1 == "True")
                                primProviderId = item.id;

                            return { value: item.id, label: item.text1 + ' ' + item.text2 };
                        }));

                    if (userInfo.isProvider == false && primProviderId > 0) {
                        setState(prevState => ({
                            ...prevState,
                            providerID: primProviderId
                        }));
                        setPrimaryProviderId(primProviderId);
                        getUserLocations(primProviderId, false);
                    }
                    else {
                        setPrimaryProviderId(0);
                    }
                }

            })
        }
        setFormState();

    }, []);

    function setFormState() {

        if (dataId > 0 || dataId != "") {
            state.providerSlotID = dataId;
            state.name = "";
            state.description = "";
            loadData();
        }
        else {

            setState(prevState => ({
                ...prevState,

                slotId: dataId,
                providerID: userInfo.isProvider ? userInfo.userID : 0,
                userLocationID: primaryLocationId,
                fromDate: addDays(new Date(), 0).toString(),
                toDate: addDays(new Date(), 31).toString(),
                // fromDate: new Date(y, m, 1),
                // toDate: new Date(y, m + 1, 0),
                fromTime: "08:00",
                toTime: "18:00",
                duration: 10,
                isOverbooking: false,
                isBreak: false,
                monday: true,
                tuesday: true,
                wedensday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
                breakReason: null,
                isProvider: userInfo.isProvider,

                createdBy: 0,
                createDate:
                    new Date().toISOString(),
                updatedBy: 0
            }
            ));
        }
    }

    function loadData() {
        GetDataAPI("scheduler/getProviderSlot", dataId).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
            }
            else {
                showMessage('Error', result.message, 'error');
            }
        })

    }
    function clear() {
        setFormState();
        setErrorMessages({
            errorFromDate: false, errorToDate: false, errorFromTime: false, errorToTime: false,
            errorProvider: false, errorLocation: false, errorDuration: false, errorBreakReason: false,
            invalidFromDate: false, invalidFromTime: false, errorDays: false, timeInPast: false, dateInPast: false,
        });
    }
    function deleteRecord() {
        // if (!window.confirm("Are you sure, you want to delete this slot."))
        //     return;

        PostDataAPI('scheduler/deleteProviderSlot', state, true).then((result) => {

            if (result.success == true) {
                setErrorMessages([]);

                showMessage('Success', "Record deleted successfully.", 'success');
                state.providerSlotID = result.data.providerSlotID

                setDataId(0);
                BackToSearch();
            }
            else {
                showMessage('Error', result.message, 'error');

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

    function save() {
        var todayDate = toDayDate();

        var success = true;
        if (!state.duration || state.duration === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDuration: true
            }));
            success = false;
            if (scheduleSlotsFormRef.durationRef)
                scheduleSlotsFormRef.durationRef.focus();
        }
        if (!state.toTime || state.toTime.trim() === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorToTime: true
            }));
            success = false;
            if (scheduleSlotsFormRef.toTimeRef)
            scheduleSlotsFormRef.toTimeRef.focus();
        }
        if (!state.fromTime || state.fromTime.trim() === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFromTime: true
            }));
            success = false;
            if (scheduleSlotsFormRef.fromTimeRef)
            scheduleSlotsFormRef.fromTimeRef.focus();
        }
        if (!state.toDate || state.toDate.trim() === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorToDate: true
            }));
            success = false;
            scheduleSlotsFormRef.toDateRef.focus();
        }
        if (!state.fromDate || state.fromDate.trim() === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFromDate: true
            }));
            success = false;
            if (scheduleSlotsFormRef.fromDateRef)
            scheduleSlotsFormRef.fromDateRef.focus();
        }
        if (state.fromDate.trim() > state.toDate.trim() && state.fromDate.trim() != "") {

            setErrorMessages(prevState => ({
                ...prevState,
                invalidFromDate: true
            }));

            success = false;
            if (scheduleSlotsFormRef.fromDateRef)
            scheduleSlotsFormRef.fromDateRef.focus();
        }
        if (state.fromDate.trim() != "" && state.fromDate.trim() < todayDate) {

            setErrorMessages(prevState => ({
                ...prevState,
                dateInPast: true
            }));

            success = false;
            scheduleSlotsFormRef.fromDateRef.focus();
        }
        if (!state.userLocationID || parseInt(state.userLocationID) < 1) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: true
            }));
            success = false;
            if (scheduleSlotsFormRef.locationRef)
            scheduleSlotsFormRef.locationRef.focus();
        }
        if (!state.isProvider && (!state.providerID || parseInt(state.providerID) < 1)) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorProvider: true
            }));
            success = false;
            if (scheduleSlotsFormRef.providerRef)
            scheduleSlotsFormRef.providerRef.focus();
        }

        if (state.isBreak && (!state.breakReason || state.breakReason.trim() === "")) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorBreakReason: true
            }));
            success = false;
        }
        if (!state.monday && !state.tuesday && !state.wedensday && !state.thursday && !state.friday && !state.saturday && !state.sunday) {
            errorMessages.errorDays = true;
            setErrorMessages(prevState => ({
                ...prevState,
                errorDays: true
            }));
            success = false;
        }
        if (state.isBreak && (state.monday && state.tuesday && state.wedensday && state.thursday && state.friday && state.saturday && state.sunday)) {
            showMessage('Error', 'All days and break cannot selected at same time', 'error');
            errorMessages.errorBreakDays = true;
            setErrorMessages(prevState => ({
                ...prevState,
                errorDays: true
            }));
            success = false;
        }
        if (state.fromTime.trim() > state.toTime.trim() || state.fromTime.trim() === state.toTime.trim()) {

            setErrorMessages(prevState => ({
                ...prevState,
                invalidFromTime: true
            }));
            success = false;
        }

        if (success) {
            state.userLocationID = parseInt(state.userLocationID);
            state.providerID = parseInt(state.providerID);

            let method = "scheduler/createProviderSlot";
            if (dataId > 0)
                method = "scheduler/updateProviderSlot";
            state.duration = parseInt(state.duration);

            PostDataAPI("scheduler/validateSchedule", state, true).then((result) => {

                if (result.success == true) {
                    // if (result.message != "" && !window.confirm(result.message))
                    //     return;

                    if (result.message != "") {
                        if (result.message.indexOf('please delete appointment') > 0) {
                            showMessage('Error', result.message, 'error');
                            return;
                        }
                        ShowActionDialog(true, "", result.message, "confirm", function () {
                            PostDataAPI(method, state, true).then((result) => {
                                if (result.success == true) {

                                    setErrorMessages([]);
                                    showMessage('Success', "Schedule created successfully.", 'success');
                                    clear();
                                }
                                else {
                                    showMessage('Error', result.message, 'error');

                                }
                            })
                        });
                    }
                    else {
                        PostDataAPI(method, state, true).then((result) => {
                            if (result.success == true) {

                                setErrorMessages([]);
                                showMessage('Success', "Schedule created successfully.", 'success');
                                clear();
                            }
                            else {
                                showMessage('Error', result.message, 'error');
                            }
                        })
                    }
                }
                else {
                    showMessage('Error', result.message, 'error');

                }
            })
        }
    };
    function DialogConfirm() {
        setConfirm(true);
    }
    function BackToSearch() {
        document.getElementById("btnSearchGrid").click();

    }

    function validateTime() {
        let status = true;
        if ((state.fromTime > state.toTime || state.fromTime == state.toTime) && state.fromTime != '' && state.toTime != '')
            status = false;
        return status;
    }

    function validateDateTime() {
        let status = true;
        if (state.fromDate == state.toDate && state.fromTime == state.toTime)
            status = false;
        return status;
    }

    function validateDate() {
        let status = true;
        if (state.fromDate > state.toDate && state.fromDate != '' && state.toDate != '')
            status = false;
        return status;
    }
    function validatePastDate() {

        let status = true;

        if (state.fromDate < toDayDate())
            status = false;
        return status;
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
    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <Grid container >
                    <FormGroupTitle>Provider Scheduling</FormGroupTitle>
                    <Grid item lg={12} container direction="row">



                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Provider<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Provider" size={2} mandatory={true} />
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            {
                                userInfo.isProvider ? (<InputBaseField
                                    placeholder="Provider Name"
                                    onChange={handleChange}
                                    name="providerName"
                                    value={`${userInfo.firstName.trim()} ${userInfo.lastName.trim()}`}
                                    MaxLength='255'
                                    disabled
                                />) : (
                                    <SelectField
                                        placeholder="Select Provider"
                                        onChange={handleProviderChange}
                                        name="providerID"
                                        value={state.providerID}
                                        MaxLength='255'
                                        options={providers}
                                        inputProps={{ ref: input => scheduleSlotsFormRef.providerRef = input }}
                                    />
                                )
                            }
                            {
                                errorMessages.errorProvider && !userInfo.isProvider && (!state.providerID || state.providerID == "") ? (<ErrorMessage >
                                    Please select Provider
                                </ErrorMessage>) : ('')}
                        </Grid>


                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Location<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Location" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <SelectField

                                placeholder="Select Location"
                                onChange={handleChange}
                                name="userLocationID"
                                value={state.userLocationID}
                                options={locations}
                                inputProps={{ ref: input => scheduleSlotsFormRef.locationRef = input }}
                            />
                            {errorMessages.errorLocation && (!state.userLocationID || parseInt(state.userLocationID) < 1) ? (<ErrorMessage >
                                Please select Location
                            </ErrorMessage>) : ('')}
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} container direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>From Date<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="From Date" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>

                            <InputBaseField
                                placeholder="From Date"
                                onChange={handleChange}
                                name="fromDate"
                                value={state.fromDate}
                                type="date"
                                inputProps={{ ref: input => scheduleSlotsFormRef.fromDateRef = input }}

                            />
                            {errorMessages.errorFromDate && (!state.fromDate || state.fromDate.trim() == "") ? (<ErrorMessage >
                                Please enter From Date
                            </ErrorMessage>) : ('')}
                            {errorMessages.invalidFromDate && !validateDate() ?
                                (<ErrorMessage >
                                    From Date must be less then To Date
                                </ErrorMessage>) : ('')}
                            {errorMessages.dateInPast && !validatePastDate() ?
                                (<ErrorMessage >
                                    From Date cannot be in past.
                                </ErrorMessage>) : ('')}

                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>To Date<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="To Date" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="To Date"
                                onChange={handleChange}
                                name="toDate"
                                value={state.toDate}
                                MaxLength="255"
                                type="date"
                                inputProps={{ ref: input => scheduleSlotsFormRef.toDateRef = input }}

                            />
                            {errorMessages.errorToDate && (!state.toDate || state.toDate.trim() == "") ? (<ErrorMessage >
                                Please enter To Date
                            </ErrorMessage>) : ('')}

                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} container direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>From Time<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="From Time" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                placeholder="From Time"
                                onChange={handleChange}
                                name="fromTime"
                                value={state.fromTime}
                                MaxLength="255"
                                type="time"
                                inputProps={{ ref: input => scheduleSlotsFormRef.fromTimeRef = input }}
                            />
                            {errorMessages.errorFromTime && (!state.fromTime || state.fromTime.trim() == "") ? (<ErrorMessage >
                                Please enter From Time
                            </ErrorMessage>) : ('')}

                            {errorMessages.invalidFromTime && !validateTime() ?
                                (<ErrorMessage >
                                    From Time must be less then To Time
                                </ErrorMessage>) : ('')}

                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>To Time<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="To Time" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>

                            <InputBaseField
                                placeholder="To Time"
                                onChange={handleChange}
                                name="toTime"
                                value={state.toTime}
                                MaxLength="255"
                                type="time"
                                inputProps={{ ref: input => scheduleSlotsFormRef.toTimeRef = input }}
                            />
                            {errorMessages.errorToTime && (!state.toTime || state.toTime.trim() == "") ? (<ErrorMessage >
                                Please enter To Time
                            </ErrorMessage>) : ('')}

                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Duration<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Duration" size={2} mandatory={true} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <SelectField
                                placeholder="Select Duration"
                                onChange={handleChange}
                                name="duration"
                                value={state.duration}
                                options={durations}
                                inputProps={{ ref: input => scheduleSlotsFormRef.durationRef = input }}
                            />
                            {errorMessages.errorDuration && (!state.duration || state.duration == "") ? (<ErrorMessage >
                                Please select Duration.
                            </ErrorMessage>) : ('')}
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >

                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <CheckboxField
                                color="primary"
                                name="isOverbooking"
                                checked={state.isOverbooking}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Overbooking </FormLabel>
                        </Grid>
                    </Grid>



                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                            alignItems="flex-end">
                            <FormLabel className={classes.lableInput}>Days<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid> */}
                        <Label title="Days" size={2} mandatory={true} />


                        <Grid item lg={1} >

                            <Checkbox
                                color="primary"
                                name="sunday"
                                className={classes.checkBoxBtn}
                                checked={state.sunday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Sun</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="monday"
                                checked={state.monday}
                                onChange={handleCheckBoxChange}

                            />
                            <FormLabel className={classes.lableInput}>Mon</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="tuesday"
                                checked={state.tuesday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Tue</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="wedensday"
                                checked={state.wedensday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Wed</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="thursday"
                                checked={state.thursday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Thu</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="friday"
                                checked={state.friday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Fri</FormLabel>
                        </Grid>
                        <Grid item lg={1} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="saturday"
                                checked={state.saturday}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Sat</FormLabel>
                        </Grid>

                    </Grid>
                    {
                        errorMessages.errorDays && (!state.monday && !state.tuesday && !state.wedensday && !state.thursday && !state.friday && !state.saturday && !state.sunday) ? (
                            <Grid item lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}
                                >
                                </Grid>
                                <Grid item lg={8} >

                                    <ErrorMessage >
                                        Select at least one day to generate the schedule.
                                    </ErrorMessage>
                                </Grid>
                            </Grid>
                        ) : ('')
                    }

                    <Grid item lg={12} container direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        />
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <Checkbox
                                className={classes.checkBoxBtn}
                                color="primary"
                                name="isBreak"
                                checked={state.isBreak}
                                onChange={handleCheckBoxChange}
                            />
                            <FormLabel className={classes.lableInput}>Break </FormLabel>
                        </Grid>

                    </Grid>
                    {
                        state.isBreak == true ? (
                            <Grid item lg={12} container direction="row">

                                <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}
                                >
                                    <FormLabel className={classes.lableInput}>Break Reason<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField

                                        placeholder="Select Break Reason"
                                        onChange={handleChange}
                                        name="breakReason"
                                        value={state.breakReason}
                                        MaxLength='255'
                                        options={breakReasons}
                                    />
                                    {errorMessages.errorBreakReason && (!state.breakReason || state.breakReason.trim() == "") ? (<ErrorMessage >
                                        Please select break reason.
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>
                        ) : ('')
                    }


                    <Grid item lg={12}
                        container
                        direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                            alignItems="flex-end">

                        </Grid>
                        <ActionDialog
                            title={actiondialogprops.actiondialogtitle}
                            message={actiondialogprops.actiondialogmessage}
                            type={actiondialogprops.actiondialogtype}
                            actiondialogOpenClose={actiondialogprops.actiondialogstate}
                            onSubmit={() => { actiondialogprops.OnOk(); }}
                            onCancel={() => setActionDialogProps(prevState => ({
                                ...prevState,
                                actiondialogstate: false,
                            }))
                            }
                        />
                        <Grid item lg={5} style={{ marginTop: "10px" }}>


                            <Button id="save" className={classes.saveBtn} onClick={save} size="medium" disabled={!isFormEditable}>
                                Save
                            </Button>
                            {dataId != 0 ?
                                <Button className={classes.deleteBtn} onClick={() => {
                                    ShowActionDialog(false, "Delete Record", "Are you sure  you want to delete this record ?", "confirm");
                                }} size="medium" disabled={!isFormEditable}>
                                    Delete
                                </Button>
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

export default withSnackbar(ScheduleSlotsForm)
