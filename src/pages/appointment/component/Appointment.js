import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    InputBase,
    FormLabel,
    FormHelperText,
    IconButton,
    Dialog,
    Divider
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from "../../../images/icons/math-plus.png";
import PrintIcon from '../../../images/icons/printIconBig.png';
import { Scrollbars } from "rc-scrollbars";
// components
import PatientInfo from '../../patients/component/patientInfo/PatientInfo';
import { Add as AddIcon, ExitToAppSharp } from '@material-ui/icons';

import { Link } from "react-router-dom";
import useStyles from "./styles";
import { InputBaseField, CheckboxField, CustomSelectField, TextareaField, SelectField, RadioboxField, InputBaseFieldNumber } from "../../../components/InputField";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList"
import { ShadowBox, FooterBtn, FormGroupTitle, FormBtn, LinkS, Label, DraggableComponent } from "../../../components/UiElements";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../Services/GetUserInfo';
import { withSnackbar } from '../../../components/Message/Alert';
import SearchList from '../../../components/SearchList/SearchList';
import { formatDateTime, printReport } from '../../../components/Common/Extensions';
import { IsEditable } from "../../../Services/GetUserRolesRights";

const AppointmentTypeListOptions = [
    {
        value: "in-person",
        label: "In Person",
        className: 'adjustLabels',
    },
    {
        value: "tele-helath",
        label: "Telehealth",
        className: 'adjustLabels',
    }
];
const StatusListOptions = [
    {
        value: "Arrived",
        label: "Arrived",
    },

    {
        value: "Canceled",
        label: "Canceled",
    },

    {
        value: "Checked-in",
        label: "Checked-in",
    },
    {
        value: "Checked-in Online",
        label: "Checked-in Online",
    },

    {
        value: "Confirmed",
        label: "Confirmed",
    },

    {
        value: "Completed",
        label: "Completed",
    },
    {
        value: "In-Room",
        label: "In-Room",
    },

    {
        value: "In-Session",
        label: "In-Session",
    },
    {
        value: "Not-Confirmed",
        label: "Not-Confirmed",
    },

    {
        value: "No-Show",
        label: "No-Show",
    },
    {
        value: 'Orphan',
        label: 'Orphan'
    },
    {
        value: "Re-Scheduled",
        label: "Re-Scheduled",
    }
];
const ColorListOptions = [
    {

        value: "orange",
        label: "Orange",

    },
    {

        value: "blue",
        label: "Blue",
    },
    {
        value: "green",
        label: "Green",
    },
    {
        value: "yellow",
        label: "Yellow",
    },
    {
        value: "none",
        label: "None",
    },
];
let editCurrentAppDate;
let editAppointmentSlotTime;
let pLocationId = 0;
let appointmentDate;

function Appointment(props) {

    var classes = useStyles();

    const { showMessage } = props;

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

    const [appointment, setAppointment] = useState({
        patientAppointmentId: 0, appointmentProfileID: null, appointmentTypeCode: "", patientID: props.patientId ? props.patientId : 0, userId: 0, isProvider: false, userLocationID: null, reasonOfVisit: "", appointmentDatetime: null, allowOverlap: false, duration: "10", notes: "", roomID: null, color: "", ismarkDefaultAppType: false, isDefaultProfileType: false, isFollowUp: false, followupDate: null, followupReason: "", recurEveryWeeks: 0, statusCode: null,
        isRecurring: false, isDeleted: false, createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0, firstAppointmentDate: new Date().toISOString(), lastAppointmentDate: null, appointmentTime: null, providerSlotID: 0, patientName: '',
        isMonday: false, isTuesday: false, isWednesday: false, isThursaday: false, isFriday: false, isSaturday: false, isSunday: false, encounterID: 0,
        consentFormIds: []
    });
    const [isScheduleEditable, setIsScheduleEditable] = useState(IsEditable("Schedule"));
    const [consentFormState, setConsentFormState] = useState({ consentFormId: 0, consentFormName: "" });

    const [dataId, setDataId] = useState(props.dataId);
    const [newAppDateTime, setNewAppDateTime] = useState(props.newAppDateTime);
    const [newAppSlotTime, setNewAppSlotTime] = useState(props.newAppSlotTime);
    const [appPatientName, setAppPatientName] = useState(props.appPatientName);
    const [savedOverlapFlag, setSavedOverlapFlag] = useState(true);

    const [reRender, setReRender] = useState(0);
    //console.log(props.appPatientName, props.patientId)
    const appointmentRef = useState({
        providersRef: "", locationRef: "", appointmentDatetimeRef: "",
        availableSlotsRef: "", profileRef: "", durationRef: "", examRoomsRef: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        errorProfile: false, errorType: false, errorVisitReason: false,
        errorAppointmentDate: false, errorDuration: false, errorAppointmentSlot: false, errorTimeSlot: false, errorRoom: false,
        errorLocation: false, errorfollowUpDate: false, errorDaySelect: false, errorfollowupReason: false, errorPatientID: false,
        errorAppointmentSlot: false, errorRLastDate: false, errorRStartDate: false, errorReoccureWeeks: false, errorRecurringDate: false

    })

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [isDeleteCall, setIsDeleteCall] = useState(false);

    const [formLocations, setFormLocations] = useState([]);
    const [appointmentProfiles, setappointmentProfiles] = useState([]);
    const [consentForms, setConsentForms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [providers, setProviders] = useState([]);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [appointmentSlots, setAppointmentSlots] = useState([]);
    const [slotsDuration, setSlotsDuration] = useState([]);
    const [selectedAppDateTime, setSelectedAppDateTime] = useState({ startDateTime: "", endDateTime: "" });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);

    useEffect(() => {
        console.log(props)
        initialization();

    }, []);

    function initialization() {

        loadConsentFormDDL();

        var params = {
            code: "appt_profile_for_appointment",
            parameters: [dataId ? dataId.toString() : ""]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setappointmentProfiles(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        });

        var params = {
            code: "user_default_user_profile",
            parameters: [userInfo.loggedInUserID]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null && result.data.length > 0) {
                setAppointment(prevState => ({
                    ...prevState,
                    appointmentProfileID: result.data[0].id,
                    isDefaultProfileType: true
                }));
                setAppointmentDetails(result.data[0].id + "", appointment.userId);
            }
        });

        if (dataId > 0) {
            appointment.consentFormIds = [];
            loadAppointments();

            saveAuditLogInfo();
        }
        else {
            setAppPatientName('');
            cleanValuesFields();
            setDefaultDateTime();
        }

        if (userInfo.isProvider == true) {
            if (dataId < 1)
                getProviderLocations(userInfo.userID, userInfo.isProvider, true);
        }
        else {
            loadStaffProviders();
        }
    }
    const loadStaffProviders = () => {
        let data = {
            userID: userInfo.userID
        }

        PostDataAPI("user/getStaffProviders", data).then((result) => {

            var primProviderId = 0;

            if (result.success && result.data != null) {

                setProviders(
                    result.data.map((item, i) => {

                        if (item.p1 == "True")
                            primProviderId = item.id;

                        return { value: item.id, label: item.text1 + ' ' + item.text2 };
                    }));

                if (dataId < 1) {
                    if (primProviderId > 0) {
                        setAppointment(prevState => ({
                            ...prevState,
                            userId: parseInt(primProviderId)
                        }));
                    }
                    getUserLocationsByID(primProviderId);
                }
            }

        });
    }
    const loadLocationsList = (userId, encUID) => {
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
                        return { value: item.id, label: item.text1 };
                    }));
            }

        });
    }
    const setDefaultDateTime = () => {
        if (newAppDateTime != null && newAppDateTime != "") {

            let appDate = new Date(newAppDateTime);

            let month = appDate.getMonth() + 1;

            if (month < 10)
                month = '0' + month;
            let day = appDate.getDate();
            if (day < 10)
                day = '0' + day;

            appointmentDate = appDate.getFullYear() + '-' + month + '-' + day;

            setAppointment(prevState => ({
                ...prevState,
                appointmentDatetime: appointmentDate
            }));

            if (parseInt(newAppSlotTime) == "0") {
                setAppointment(prevState => ({
                    ...prevState,
                    appointmentTime: (new Date().getHours()) + ":" + (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes())
                }));
            }
            else {
                setAppointment(prevState => ({
                    ...prevState,
                    appointmentTime: newAppSlotTime
                }));
            }

        }
        else {
            let appDate = new Date();
            let month = appDate.getMonth() + 1;
            if (month < 10)
                month = '0' + month;
            let day = appDate.getDate();
            if (day < 10)
                day = '0' + day;
            appointmentDate = appDate.getFullYear() + '-' + month + '-' + day;
            setAppointment(prevState => ({
                ...prevState,
                appointmentDatetime: new Date().toISOString().split('T')[0]
            }));
        }
    }

    const loadConsentFormDDL = () => {
        var data = {
            code: "consent_form_for_appointment",
            parameters: [dataId ? dataId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", data).then((result) => {

            if (result.success && result.data != null) {

                var arr = new Array();
                setConsentForms(
                    result.data.map((item, i) => {
                        if ((!dataId || dataId < 1) && (item.text3 == "True" || item.text4 == "True") && item.text5 != "In_Active") { arr.push(parseInt(item.text1)); }

                        var filename = item.text6.replace(/^.*[\\\/]/, '')

                        return { id: parseInt(item.text1), value: item.text2, ismandatory: item.text3, default: item.text4, formPath: item.text6, fileName: filename, isReport: item.text7 };
                    }));

                if (arr.length > 0) {
                    setAppointment(prevState => ({
                        ...prevState,
                        consentFormIds: arr
                    }));
                }
            }
        })
    }

    const getUserLocationsByID = userID => {

        let data = {
            userID: userID
        }

        PostDataAPI("user/getProviderLocations", data).then((result) => {

            if (result.success && result.data != null) {

                var pLocationId = 0;
                setFormLocations(

                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));

                if (pLocationId > 0) {
                    setAppointment(prevState => ({
                        ...prevState,
                        userLocationID: pLocationId
                    }));
                }

                if (pLocationId > 0) {

                    setRoomsbyLocation(pLocationId);

                    loadAvailableSlots(new Date(appointment.appointmentDatetime ? appointment.appointmentDatetime : appointmentDate), pLocationId);
                }
            }

        })
    };

    const loadAvailableSlots = (date, userLocationId, providerScheduleSlotList) => {
        if (!providerScheduleSlotList)
            providerScheduleSlotList = appointment.providerScheduleSlotList;
        if (!date)//no need to make a call if date is null.
            return;

        let obj = {
            scheduleDateTime: date,
            userLocationID: parseInt(userLocationId),
            AppointmentId: dataId ? parseInt(dataId) : 0
        };

        PostDataAPI("scheduler/getSlotAppointmentsByDate", obj).then((result) => {

            if (result.success && result.data != null) {

                let slots = [];
                result.data.map((item, i) => {
                    slots.push({ value: item.providerSlotID, label: item.scheduleTime });
                });

                setSlotsDuration(
                    result.data.map((item, i) => {
                        return { value: item.providerSlotID, label: item.slotDuration, slotTime: item.scheduleTime, startDateTime: item.scheduleDateTime, endDateTime: item.endDateTime };
                    }));


                if (providerScheduleSlotList && providerScheduleSlotList.length > 0) {
                    let providerSlotId = providerScheduleSlotList[0].providerSlotID;

                    if (appointmentSlots.some(itm => itm.value == providerSlotId) == false) {
                        slots.push({ value: providerScheduleSlotList[0].providerSlotID, label: providerScheduleSlotList[0].scheduleTime })
                    }
                    if (providerSlotId > 0) {
                        setAppointment(prevState => ({
                            ...prevState,
                            providerSlotID: parseInt(providerSlotId)
                        }));
                    }

                }
                setAppointmentSlots(slots);
                setDefaultAppointmentSlot(result.data);
            }
        });
    }
    const setDefaultAppointmentSlot = (slots) => {
        if (!dataId || dataId == '') {
            const currentTime = new Date().toLocaleTimeString('en-US', {
                // en-US can be set to 'default' to use user's browser settings
                hour: '2-digit',
                minute: '2-digit',
            });
            const currentSlot = slots.filter(t => new Date('1/1/1999 ' + t.scheduleTime) >= new Date('1/1/1999 ' + currentTime));
            if (currentSlot && currentSlot.length > 0) {
                setAppointment(prevState => ({
                    ...prevState,
                    providerSlotID: parseInt(currentSlot[0].providerSlotID),
                    appointmentTime: currentSlot[0].scheduleTime
                }));
                selectedAppDateTime.startDateTime = currentSlot[0].scheduleDateTime;
                selectedAppDateTime.endDateTime = currentSlot[0].endDateTime;
            }
        }
    }
    const handleMultiSelectChange = (name, selected) => {
        setAppointment(prevState => ({
            ...prevState,
            [name]: selected
        }));
    }
    const handleSearchPatientList = (name, item, isNegative) => {
        const { id, value } = item;
        if (value === '') {
            return;
        }

        var data = {
            code: "assigned_consent_form",
            parameters: [id ? id.toString() : ""]
        }
        var assignedforms = consentForms.filter(tmprm => tmprm.isassigned == true)
        if (assignedforms) {
            if (assignedforms.length > 0) {
                assignedforms.map((item, i) => {
                    var itemid = item.id;
                    const index = consentForms.map(object => object.id).indexOf(itemid);
                    if (index > -1) {
                        consentForms.splice(index, 1);
                    }

                    const index2 = appointment.consentFormIds.map(object => object.id).indexOf(itemid);
                    if (index2 > -1) {
                        appointment.consentFormIds.splice(index2, 1);
                    }
                    //setConsentForms((current) =>
                    //    current.filter((itm) => itm.id != itemid)

                    //);
                    // appointment.consentFormIds.pop(item.id)
                });
            }
        }

        PostDataAPI("ddl/loadItems", data).then((result) => {

            if (result.success && result.data != null) {
                var arr = new Array();
                var _consentForms = consentForms
                arr = appointment.consentFormIds
                result.data.map((item, i) => {
                    var itemid = parseInt(item.text1);
                    const index = consentForms.map(object => object.id).indexOf(itemid);
                    if (index > -1) {
                        consentForms.splice(index, 1);
                    }
                    var filename = item.text5.replace(/^.*[\\\/]/, '')
                    if (item.text8 != "True") {
                        if (consentForms.filter(tmprm => tmprm.id === parseInt(item.text1)) == "") {
                            arr.push(parseInt(item.text1));
                            _consentForms.push({ id: parseInt(item.text1), value: item.text2, ismandatory: item.text3, default: item.text4, formPath: item.text5, fileName: filename, isReport: item.text7, isassigned: true });


                        }
                    }

                });
                setConsentForms(_consentForms)


                if (arr.length > 0) {
                    setAppointment(prevState => ({
                        ...prevState,
                        consentFormIds: arr
                    }));
                }
            }
        })
        setAppointment(prevState => ({
            ...prevState,
            patientID: value == '' ? '' : id,
            patientName: value
        }));
    }
    const handleChangePatientId = (item) => {
        // console.log(value)
        const { id, value } = item;
        setAppointment(prevState => ({
            ...prevState,
            patientID: value == '' ? '' : id,
            patientName: value
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));


    };


    const handleChangeStaff = e => {

        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));


        setAppointmentDetails(appointment.profileId, value);

    };

    const handleChangeProfile = e => {
        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));

        setAppointmentDetails(value, appointment.userId);

    };

    const handleChangeAppointmentSlots = e => {
        const { name, value } = e.target;

        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));

        // checkMultipleAppointmentsByPatient(value)

        let durationItem;
        let slotTimeItem;
        slotsDuration.map((item, i) => {

            if (item.value == parseInt(value)) {
                durationItem = item.label;
                slotTimeItem = item.slotTime;
                selectedAppDateTime.startDateTime = item.startDateTime;
                selectedAppDateTime.endDateTime = item.endDateTime;
                return;
            }

        });

        //setAppointment(prevState => ({
        //    ...prevState,
        //    duration: durationItem
        //}));

        setAppointment(prevState => ({
            ...prevState,
            appointmentTime: slotTimeItem
        }));

    };

    const handleChangeDoctor = e => {

        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
        setAppointment(prevState => ({
            ...prevState,
            ['providerSlotID']: 0
        }));
        setAppointmentSlots([]);
        getProviderLocations(value, userInfo.isProvider, false);
        setAppointmentDetails(appointment.profileId, value);
    };

    const handleChangeLocation = e => {


        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
        setAppointment(prevState => ({
            ...prevState,
            ['providerSlotID']: 0
        }));
        setRoomsbyLocation(value);

        if (appointment.appointmentDatetime != "" && appointment.appointmentDatetime != null) {

            loadAvailableSlots(new Date(appointment.appointmentDatetime), value);
        }
        else {
            setAppointmentSlots([]);
        }
    };

    const handleChangeAppointmentDate = e => {

        const { name, value } = e.target;

        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));


        if (parseInt(appointment.userLocationID) > 0)
            loadAvailableSlots(new Date(value), appointment.userLocationID);


        if (appointment.isRecurring) {
            setRecurringDaysStates(value);

            setAppointment(prevState => ({
                ...prevState,
                firstAppointmentDate: value
            }));

        }
    };

    const handleCheckBoxChange = e => {

        const { name, value } = e.target;

        if (name === "allowOverlap") {
            setAppointment(prevState => ({
                ...prevState,
                allowOverlap: !appointment.allowOverlap
            }));
            setSavedOverlapFlag(false);
        }
        else if (name === "isRecurring") {

            setAppointment(prevState => ({
                ...prevState,
                recurEveryWeeks: 1
            }));
            if (!appointment.isRecurring) {
                if (appointment.appointmentDatetime === "" || appointment.appointmentDatetime === null) {
                    showMessage("Error", "Please select appointment date", "error", 3000);
                    return false;
                }

            }

            setAppointment(prevState => ({
                ...prevState,
                isRecurring: !appointment.isRecurring
            }));

            if (!appointment.isRecurring) {
                setAppointment(prevState => ({
                    ...prevState,
                    firstAppointmentDate: appointment.appointmentDatetime
                }));
                var d = new Date(appointment.appointmentDatetime);
                getWeekDayForRecurring(d.getDay(), '');
            }
            else {
                setAppointment(prevState => ({
                    ...prevState,
                    firstAppointmentDate: new Date().toISOString()
                }));
            }
        }
        else if (name === "isFollowUp") {
            setAppointment(prevState => ({
                ...prevState,
                isFollowUp: !appointment.isFollowUp
            }));

        }
        else if (name === "ismarkDefaultAppType") {
            setAppointment(prevState => ({
                ...prevState,
                ismarkDefaultAppType: !appointment.ismarkDefaultAppType
            }));

        }
        else if (name === "isDefaultProfileType") {
            setAppointment(prevState => ({
                ...prevState,
                isDefaultProfileType: !appointment.isDefaultProfileType
            }));

        }


    }

    const handleFollowUpChange = e => {

        const { name, value } = e.target;

        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    function checkForAppointmentSlot() {

        let data = {

            appointmentDatetime: appointment.appointmentDatetime,
            duration: parseInt(appointment.duration),
            appointmentTime: appointment.appointmentTime
        };

        PostDataAPI("appointment/getProviderSlotSchedule", data).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.length > 0) {

                    showMessage("Success", "Provider slot is available", "success", 3000);

                    setAppointment(prevState => ({
                        ...prevState,
                        providerSlotID: result.data[0].providerSlotID
                    }));
                }
                else {
                    setAppointment(prevState => ({
                        ...prevState,
                        providerSlotID: 0
                    }));

                    showMessage("Provider Slot", "Provider slot is not available", "info", 3000);

                }

            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }

        });
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

                var pUserId = 0;

                setFormLocations(
                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));

                if (pLocationId > 0) {
                    setAppointment(prevState => ({
                        ...prevState,
                        userLocationID: parseInt(pLocationId)
                    }));
                }

                if (pLocationId > 0) {

                    setRoomsbyLocation(pLocationId);
                }

                if (!appointmentDate)//no need to make a call if date is null.
                    return;

                let obj = {

                    scheduleDateTime: new Date(appointmentDate),
                    userLocationID: parseInt(pLocationId),
                    AppointmentId: dataId ? parseInt(dataId) : 0
                };

                PostDataAPI("scheduler/getSlotAppointmentsByDate", obj).then((result) => {

                    if (result.success && result.data != null) {

                        if (result.success && result.data != null && result.data.length > 0) {
                            let slotSelectionId = 0;

                            //let match = (newAppSlotTime.split(':')[0] < 10 ? "0" + newAppSlotTime.split(':')[0] : newAppSlotTime.split(':')[0]) + ":" + (newAppSlotTime.split(':')[1]) + ' ' + newAppSlotTime.split(':')[2].split(' ')[1].toLocaleLowerCase();
                            let slotTimeSelection;
                            let slotDuration;
                            let appDate = new Date(newAppDateTime);
                            setAppointmentSlots(
                                result.data.map((item, i) => {

                                    var endDate = new Date(item.endDateTime);
                                    var startDate = new Date(item.scheduleDateTime);

                                    if (appDate >= startDate && appDate < endDate) {
                                        slotSelectionId = item.providerSlotID;
                                        slotTimeSelection = item.scheduleTime;
                                        slotDuration = item.slotDuration;
                                    }

                                    return { value: item.providerSlotID, label: item.scheduleTime };

                                }));
                            setDefaultAppointmentSlot(result.data);

                            setSlotsDuration(
                                result.data.map((item, i) => {

                                    return { value: item.providerSlotID, label: item.scheduleTime, slotTime: item.scheduleTime, startDateTime: item.scheduleDateTime, endDateTime: item.endDateTime };
                                }));

                            if (slotSelectionId > 0) {
                                setAppointment(prevState => ({
                                    ...prevState,
                                    providerSlotID: slotSelectionId
                                }));

                                setAppointment(prevState => ({
                                    ...prevState,
                                    appointmentTime: slotTimeSelection
                                }));

                                setAppointment(prevState => ({
                                    ...prevState,
                                    duration: slotDuration
                                }));

                            }
                        }
                    }

                });
            }

        });

    }

    function getWeekDayForRecurring(day, name) {

        if (name === '' || day > 0) {
            switch (day) {
                case 1 || "":
                    setAppointment(prevState => ({
                        ...prevState,
                        isMonday: !appointment.isMonday
                    }));
                    break;
                case 2:
                    setAppointment(prevState => ({
                        ...prevState,
                        isTuesday: !appointment.isTuesday
                    }));
                    break;
                case 3:
                    setAppointment(prevState => ({
                        ...prevState,
                        isWednesday: !appointment.isWednesday
                    }));
                    break;
                case 4:
                    setAppointment(prevState => ({
                        ...prevState,
                        isThursaday: !appointment.isThursaday
                    }));
                    break;
                case 5:
                    setAppointment(prevState => ({
                        ...prevState,
                        isFriday: !appointment.isFriday
                    }));
                    break;
                case 6:
                    setAppointment(prevState => ({
                        ...prevState,
                        isSaturday: !appointment.isSaturday
                    }));
                    break;
                case 7:
                    setAppointment(prevState => ({
                        ...prevState,
                        isSunday: !appointment.isSunday
                    }));
                    break;
                default:
            }
        }
        else {
            switch (name) {
                case "isMonday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isMonday: !appointment.isMonday
                    }));
                    break;
                case "isTuesday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isTuesday: !appointment.isTuesday
                    }));
                    break;
                case "isWednesday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isWednesday: !appointment.isWednesday
                    }));
                    break;
                case "isThursaday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isThursaday: !appointment.isThursaday
                    }));
                    break;
                case "isFriday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isFriday: !appointment.isFriday
                    }));
                    break;
                case "isSaturday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isSaturday: !appointment.isSaturday
                    }));
                    break;
                case "isSunday":
                    setAppointment(prevState => ({
                        ...prevState,
                        isSunday: !appointment.isSunday
                    }));
                    break;
                default:
            }

        }

    }

    const handleCheckBoxRecurringChange = e => {

        const { name, value } = e.target;

        getWeekDayForRecurring(0, name);
    }

    function setAppointmentDetails(profileId, userId) {
        if (userInfo.isProvider == true)
            userId = userInfo.loggedInUserID;

        let data = {
            UserID: userId.toString(),
            ProfileID: profileId
        }

        PostDataAPI("setup/getAppProfile", data).then((result) => {
            if (result.success && result.data != null) {

                if (!result.data.consentFormIds)
                    result.data.consentFormIds = [];

                consentForms.map((item, i) => {
                    //return { value: item.id, label: item.text1, ismandatory: item.text2, default: item.text3 };
                    if ((item.default == "True" || item.ismandatory == "True" || item.isassigned == true) && result.data.consentFormIds.indexOf(item.id) < 0)
                        result.data.consentFormIds.push(item.id);
                });

                setAppointment(prevState => ({
                    ...prevState,
                    duration: result.data.duration,
                    reasonOfVisit: result.data.visitReason,
                    consentFormIds: result.data.consentFormIds,
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    color: result.data.color ? result.data.color.toLowerCase() : "",
                    ismarkDefaultAppType: result.data.color ? true : false,
                    isDefaultProfileType: result.data.isDefaultProfileType
                }));

            }
        })

    }

    function setRoomsbyLocation(locationId) {

        PostDataAPI("appointment/getPatientAppointmentRooms", parseInt(locationId)).then((result) => {

            if (result.success && result.data != null) {

                setRooms(
                    result.data.map((item, i) => {
                        return { value: item.roomID, label: item.roomName };
                    }));
                if (result.data != null && result.data.length > 0) {
                    setAppointment(prevState => ({
                        ...prevState,
                        roomID: result.data[0].roomID
                    }));
                }
            }
        })
    }

    function setRecurringDaysStates(value) {
        setAppointment(prevState => ({
            ...prevState,
            isMonday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isTuesday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isWednesday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isThursaday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isFriday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isSaturday: false
        }));

        setAppointment(prevState => ({
            ...prevState,
            isSunday: false
        }));

        var d = new Date(value);
        getWeekDayForRecurring(d.getDay(), '');
    }

    function validateAppointment(errorList) {
        if (appointment.reasonOfVisit === null || appointment.reasonOfVisit === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVisitReason: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVisitReason: false
            }));
        }
        if (appointment.roomID === null || appointment.roomID === "" || appointment.roomID === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRoom: true
            }));
            errorList.push(true);
            appointmentRef.examRoomsRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRoom: false
            }));
        }
        if (appointment.duration === null || appointment.duration === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDuration: true
            }));
            errorList.push(true);
            appointmentRef.durationRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDuration: false
            }));
        }
        if (appointment.appointmentProfileID === null || appointment.appointmentProfileID == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfile: true
            }));
            errorList.push(true);
            appointmentRef.profileRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfile: false
            }));
        }
        if (appointment.providerSlotID === null || appointment.providerSlotID === "" || appointment.providerSlotID == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAppointmentSlot: true
            }));
            errorList.push(true);
            appointmentRef.availableSlotsRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAppointmentSlot: false
            }));
        }

        if (appointment.appointmentDatetime === null || appointment.appointmentDatetime === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAppointmentDate: true
            }));
            errorList.push(true);
            //appointmentRef.appointmentDatetimeRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAppointmentDate: false
            }));
        }
        if (appointment.userLocationID === null || appointment.userLocationID == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: true
            }));
            errorList.push(true);
            appointmentRef.locationRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: false
            }));
        }
        if (appointment.patientID === null || appointment.patientID == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientID: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientID: false
            }));
        }
        if (appointment.appointmentTypeCode === null || appointment.appointmentTypeCode === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorType: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorType: false
            }));
        }

        if (appointment.isFollowUp) {
            if (appointment.followupReason === null || appointment.followupReason === "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorfollowupReason: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorfollowupReason: false
                }));
            }

            if (appointment.followupDate === null || appointment.followupDate === "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorfollowUpDate: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorfollowUpDate: false
                }));
            }


        }

        if (appointment.isRecurring) {
            const firstAppDate = new Date(appointment.firstAppointmentDate);
            const lastAppDate = new Date(appointment.lastAppointmentDate);

            if (appointment.firstAppointmentDate === null || appointment.firstAppointmentDate === "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorRStartDate: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorRStartDate: false
                }));
            }

            if (appointment.lastAppointmentDate === null || appointment.lastAppointmentDate === "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorRLastDate: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorRLastDate: false
                }));
            }

            if (appointment.recurEveryWeeks === null || appointment.recurEveryWeeks === "" || appointment.recurEveryWeeks == "0") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorReoccureWeeks: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorReoccureWeeks: false
                }));
            }

            if (appointment.lastAppointmentDate != null) {
                if (firstAppDate > lastAppDate) {
                    showMessage("Error", "Last appointment date cannot be earlier than first appointment", "error", 3000);
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorRecurringDate: true
                    }));
                    errorList.push(true);
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorRecurringDate: false
                    }));
                }

            }


            if (appointment.isMonday === false && appointment.isTuesday === false && appointment.isWednesday === false &&
                appointment.isThursaday === false && appointment.isFriday === false && appointment.isSaturday === false &&
                appointment.isSunday === false) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDaySelect: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDaySelect: false
                }));
            }

        }

    }

    function setFollowUpDateRange() {
        var today = new Date(appointment.appointmentDatetime);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    function setLastAppointmentDateRange() {
        var today = new Date(appointment.firstAppointmentDate);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }


    const Save = () => {
        debugger
        var params = {
            code: "check_duplicate_appointment_patient",
            parameters: [selectedAppDateTime.startDateTime ? selectedAppDateTime.startDateTime.toString() : "",
            selectedAppDateTime.endDateTime ? selectedAppDateTime.endDateTime.toString() : "",
            appointment.patientID ? appointment.patientID.toString() : ""

            ]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null && result.data.length > 0 && appointment.patientAppointmentId < 1) {
                ShowActionDialog(false, "Conflict", "Patient is booked with another provider at selected time <br> Provider :  " + result.data[0].text2 + "<br> Appointment at " + formatDateTime(result.data[0].text3) + "<br> Are you sure you want to book this Appointment ?", "confirm",
                    function () {

                        savedAppointment();

                    })
                //  setCheckDuplicateData(result.data);

            }
            else {
                savedAppointment();
            }

        });

    };

    function savedAppointment() {

        appointment.appointmentProfileID = parseInt(appointment.appointmentProfileID);
        appointment.userLocationID = parseInt(appointment.userLocationID);
        appointment.patientID = parseInt(appointment.patientID);
        appointment.userId = parseInt(appointment.userId);
        appointment.recurEveryWeeks = parseInt(appointment.recurEveryWeeks);
        appointment.roomID = parseInt(appointment.roomID);
        appointment.providerSlotID = parseInt(appointment.providerSlotID);
        appointment.duration = parseInt(appointment.duration);
        appointment.isProvider = userInfo.isProvider;


        let method = "appointment/addPatientAppointment";
        if (dataId.dataId ? dataId.dataId : dataId > 0) {
            method = "appointment/updatePatientAppointment";

            if (appointment.isRecurring) {

                // if (!window.confirm("Changes made in this appointment can effect on its recurring appointment(s)."))
                //     return;

                ShowActionDialog(false, "Appointment", "Changes made in this appointment can effect on its recurring appointment(s).", "confirm", function () {
                    saveData(method, appointment);
                    return;
                })
            } else {
                saveData(method, appointment);

            }

        } else {

            saveData(method, appointment);

        }
    }

    const saveData = (method, appointment) => {
        setIsSaveCall(true);

        PostDataAPI(method, appointment, true).then((result) => {
            setIsSaveCall(false);

            if (result.success == true) {
                setErrorMessages([]);

                if (dataId < 1) {

                    if (result.success && result.data != null) {

                        if (result.message) {

                            showMessage("Alert", result.message, "info", 3000);
                        }
                        else
                            showMessage("Success", "Appointment saved successfully.", "success", 3000);


                        setDataId(result.data.patientAppointmentID);

                        setAppointment(prevState => ({
                            ...prevState,
                            patientAppointmentId: result.data.patientAppointmentID
                        }));

                    }
                }
                else if (dataId > 0 || dataId != "") {

                    if (result.success) {

                        showMessage("Success", "Appointment updated successfully.", "success", 3000);
                    }
                }

            }
            else {

                showMessage("Error", result.message, "error", 3000);

            }
        })
    }

    const [isDeletingApp, setIsDeletingApp] = useState(true)

    function deleteAppointment() {
        if (appointment.encounterID > 0) {
            showMessage("Error", "Encounter exists against this appointment and cannot be deleted", "error", 3000);
            return;
        }

        ShowActionDialog(false, "Delete", "Are you sure  you want to delete this Record?", "confirm", function () {
            setIsDeletingApp(false)
            var data = {
                patientAppointmentID: appointment.patientAppointmentID > 0 ? appointment.patientAppointmentID : dataId
            }
            setIsDeleteCall(true);
            PostDataAPI('appointment/deletePatientAppointment', data, true).then((result) => {
                setIsDeleteCall(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Record deleted successfully.", "success", 3000);
                    setDataId({
                        dataId: 0
                    });
                    setTimeout(() => {
                        backButton();
                        setIsDeletingApp(true)
                    }, 1000)

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setIsDeletingApp(true)
                }
            })
        })


    }

    function ClearFormValues() {


        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }

        if (dataId > 0 || dataId != "") {
            cleanValuesFields(props.appPatientName);
            loadAppointments();
        }
        else {
            cleanValuesFields();
        }
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId.dataId ? dataId.dataId : dataId),
            area: "Patient Appointment",
            activity: "Load patient appointment details",
            details: "User viewed spatient appointment details screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const printConsentForm = (concentForm) => {
        var reportUrl = concentForm.formPath + "&rc:Parameters=false";
        var _patientId = "&patient=" + appointment.patientID;
        var _consentFormId = "&form_id=" + concentForm.id;
        var _parameters = _patientId + _consentFormId;
        printReport(reportUrl, _parameters);
    }

    function loadAppointments() {

        PostDataAPI("appointment/getPatientAppointmentByID", dataId.dataId ? dataId.dataId : dataId).then((result) => {

            if (result.success && result.data != null) {
                editAppointmentSlotTime = result.data.appointmentDatetime.split('T')[1];
                checkSetNullCheckDafaultDate(result.data);
                //result.data.userId = result.data.createdBy;
                loadLocationsList(result.data.userId.toString(), false);
                setRoomsbyLocation(result.data.userLocationID);
                result.data.userLocationID = parseInt(result.data.userLocationID);
                result.data.patientID = parseInt(result.data.patientID);
                result.data.color = result.data.color ? result.data.color.toLowerCase() : "";
                result.data.ismarkDefaultAppType = false; //result.data.color ? true : false;
                result.data.isDefaultProfileType = false;
                result.data.isFollowUp = result.data.followupDate ? true : result.data.followupReason ? true : false;
                editCurrentAppDate = new Date(result.data.appointmentDatetime);
                getAppointmentSlotLoad(result.data.appointmentDatetime, result.data.userLocationID, result.data.providerScheduleSlotList);
                setAppointment(result.data);
                setSavedOverlapFlag(true);
            }
        })
    }

    function getAppointmentSlotLoad(appointmentDatetime, userLocationID, providerScheduleSlotList) {


        loadAvailableSlots(new Date(appointmentDatetime.split('T')[0]), userLocationID, providerScheduleSlotList)
    }

    function checkSetNullCheckDafaultDate(dataSet) {

        if (dataSet.appointmentDatetime != null && dataSet.appointmentDatetime.trim() != '0001-01-01T00:00:00') {
            dataSet.appointmentTime = dataSet.appointmentDatetime.split('T')[1];
            dataSet.appointmentDatetime = dataSet.appointmentDatetime.split('T')[0];

        }
        else { dataSet.appointmentDatetime = new Date().toISOString(); }

        if (dataSet.firstAppointmentDate != null && dataSet.firstAppointmentDate.trim() != '0001-01-01T00:00:00')
            dataSet.firstAppointmentDate = dataSet.firstAppointmentDate.split('T')[0];
        else
            dataSet.firstAppointmentDate = new Date().toISOString();

        if (dataSet.followupDate != null && dataSet.followupDate.trim() != '0001-01-01T00:00:00')
            dataSet.followupDate = dataSet.followupDate.split('T')[0];
        else
            dataSet.followupDate = null;

        if (dataSet.lastAppointmentDate != null && dataSet.lastAppointmentDate.trim() != '0001-01-01T00:00:00')
            dataSet.lastAppointmentDate = dataSet.lastAppointmentDate.split('T')[0];
        else
            dataSet.lastAppointmentDate = null;


    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function cleanValuesFields(patientName) {
        if (patientName) {
            setAppPatientName(patientName);
        }
        else {
            setAppPatientName('');
        }
        setAppointment({
            patientAppointmentId: 0, appointmentProfileID: "", appointmentTypeCode: "in-person", patientID: props.patientId ? props.patientId : 0, userId: 0, isProvider: false, userLocationID: 0, reasonOfVisit: "", appointmentDatetime: "", allowOverlap: false, duration: "10", notes: "", roomID: null, color: "", ismarkDefaultAppType: false, isDefaultProfileType: false, isFollowUp: false, followupDate: null, followupReason: "", recurEveryWeeks: 0, statusCode: null,
            isRecurring: false, isDeleted: false, createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0, firstAppointmentDate: new Date().toISOString(), lastAppointmentDate: null, appointmentTime: '', providerSlotID: 0, patientName: '',
            isMonday: false, isTuesday: false, isWednesday: false, isThursaday: false, isFriday: false, isSaturday: false, isSunday: false,
            consentFormIds: []
        });

        consentForms.map((item, i) => {

            //return { value: item.id, label: item.text1, ismandatory: item.text2, default: item.text3 };
            if (item.default == "True" || item.ismandatory == "True")
                appointment.consentFormIds.push(item.value);
        });
        //consentForms[]
        setErrorMessages({ errorProfile: false, errorType: false, errorVisitReason: false, errorAppointmentDate: false, errorDuration: false, errorAppointmentSlot: false, errorTimeSlot: false, errorRoom: false, errorLocation: false, errorfollowUpdate: false, errorDaySelect: false, errorPatientID: false })
        setAppointmentSlots([]);

    }

    const backButton = () => {
        document.getElementById("btnIdGetPatientAppt").click();
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

    function alertPastDates() {

        // Warning msgs Past App
        let errorList = [];

        validateAppointment(errorList);
        if (errorList.length < 1) {

            let apptDate = new Date(appointment.appointmentDatetime);

            let month = apptDate.getMonth() + 1;
            if (month < 10)
                month = '0' + month;

            let day = apptDate.getDate();
            if (day < 10)
                day = '0' + day;

            let appTime = apptDate.getFullYear() + '-' + month + '-' + day + ' ' + appointment.appointmentTime;

            let convetedDateTime = new Date(appTime);

            let todayDate = new Date();
            if (dataId > 0) {
                if (convetedDateTime < todayDate)
                    ShowActionDialog(true, "Appointment", "Are you sure that you want to edit an appointment that occurred in the past?", "confirm", function () {
                        Save();
                    });
                else
                    Save();

            }
            else {
                if (convetedDateTime < todayDate) {
                    ShowActionDialog(true, "Appointment", "Are you sure you want to make an appointment in the past?", "confirm", function () {
                        Save();
                    });
                }
                else {
                    Save();
                }
            }
            // Warning msgs Past App
        }
    }

    const deleteConsentFormItem = (id) => {

        let newId = parseInt(id);

        let isExist = appointment.consentFormIds.some(item2 => item2 === newId);

        if (isExist) {

            var consentFormsItemList = [...appointment.consentFormIds];

            consentFormsItemList = consentFormsItemList.filter(item => item != newId)

            setAppointment(prevState => ({
                ...prevState,
                ["consentFormIds"]: consentFormsItemList
            }));

        }

    }
    const handleSearcdhListChange = (name, item) => {

        const { id, value } = item;

        setConsentFormState(prevState => ({
            ...prevState,
            consentFormId: id,
            consentFormName: value
        }));


        let newId = parseInt(id);

        let isExist = appointment.consentFormIds.some(item2 => item2 === newId && item2.isDeleted == false);
        if (!isExist) {
            let _consentFormIds = [...appointment.consentFormIds];

            _consentFormIds.push(newId);

            setAppointment(prevState => ({
                ...prevState,
                ["consentFormIds"]: _consentFormIds,
            }));

        }
        else {
            showMessage("Error", "Consent form already exist", "error", 3000);
        }

        setTimeout(function () {
            setConsentFormState(prevState => ({
                ...prevState,
                consentFormId: 0,
                consentFormName: ""
            }));
        }, 100);


    }

    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const openDemographics = () => {
        setDemographicsDialogOpenClose(true);
    }
    const getPatientInfo = (name, id) => {
        setAppPatientName(name)
        setAppointment(prevState => ({
            ...prevState,
            patientID: id
        }));
        setTimeout(function () {
            setDemographicsDialogOpenClose(false);
        }, 1000)
        //console.log('name, id', name, id);
    }

    return (
        <>
            <ShadowBox shadowSize={3} >
                <form id="appointment-form">
                    <Grid container >
                        <FormGroupTitle>Appt.Type</FormGroupTitle>

                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">

                            <Grid item xs={12} sm={12} md={12} lg={10}
                                container
                                direction="row">
                                <Label title="Type" size={2} mandatory={true} />
                                <Grid item xs={12} sm={7} md={7} lg={6} container direction="row" >
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <RadioboxField id="select" name="appointmentTypeCode" value={appointment.appointmentTypeCode} labelPlacement="end" onChange={handleChange} options={AppointmentTypeListOptions} />
                                    </Grid>
                                </Grid>
                                {props.claim === undefined && props.claim != true ?
                                    <Grid item xs={12} sm={3} md={3} lg={2}
                                        container
                                        direction="row" justify="flex-end"
                                        alignItems="flex-start">
                                        {isScheduleEditable ? dataId && isDeletingApp ?
                                            <Link to={{
                                                pathname: '/app/encounter',
                                                search: '?id=' + appointment.userLocationID + '/' + appointment.patientID + '/' + dataId,
                                                //search: '?id=' + dataId ,
                                                state: JSON.stringify({
                                                    patientId: appointment.patientID,
                                                    appoitmentId: dataId,
                                                    userLocationID: appointment.userLocationID
                                                })

                                            }} >
                                                <FormBtn id={"save"} btnType="encounter" size="small">{appointment.encounterID > 0 ? "View Encounter" : "Start Encounter"} </FormBtn>
                                            </Link>
                                            : "":''}

                                    </Grid>
                                    : null}
                            </Grid>

                        </Grid>

                        <FormGroupTitle>Appointment Details</FormGroupTitle>

                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">

                            <Grid item xs={12} sm={6} md={6} lg={5} container direction="row">

                                {/* <Grid item xs={12} sm={4} md={4} lg={4}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}>Provider<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                </Grid> */}
                                <Label title="Provider" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >

                                    {
                                        userInfo.isProvider ? (<InputBaseField
                                            placeholder="Provider Name"
                                            onChange={handleChangeDoctor}
                                            name="userId"
                                            value={`${userInfo.firstName} ${userInfo.lastName}`}
                                            MaxLength='255'
                                            disabled
                                            inputProps={{ ref: input => appointmentRef.providersRef = input }}
                                        />) : (
                                            <SelectField
                                                placeholder="Select Provider"
                                                onChange={handleChangeDoctor}
                                                name="userId"
                                                value={appointment.userId}
                                                MaxLength='255'
                                                options={providers}
                                            />
                                        )
                                    }
                                </Grid>

                                {/* <Grid item xs={12} sm={4} md={4} lg={4}
                                    container
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}>Patient<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                </Grid> */}
                                <Label title="Patient" size={4} mandatory={true} />

                                <Grid item xs={12} sm={8} md={8} lg={7} className={classes.positionR} >
                                    {!demographicsDialogOpenClose ?
                                        <PatientSearchList
                                            id="patientId"
                                            name={appPatientName}
                                            value={appointment.patientID}
                                            onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                            placeholderTitle="Search Patient"
                                            reRender={reRender}
                                        />
                                        : null}
                                    {errorMessages.errorPatientID && !appointment.patientID ? (<FormHelperText style={{ color: "red" }} >
                                        Please select patient
                                    </FormHelperText>) : ('')}

                                    {dataId == 0 ?
                                        <IconButton color="primary" onClick={openDemographics} title="Add New Patient" className={classes.patientAddBtn} aria-label="Add new patient" component="span" disabled={!props.isEditable} >
                                            <AddCircleOutlineIcon style={{ color: props.isEditable ? "#00B4E5" : "#c4c8ca" }} />
                                        </IconButton>
                                        : null}
                                </Grid>
                                <Label title="Date" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7}>
                                    <InputBase
                                        className={classes.baseInput}
                                        placeholder="Appointment Date"
                                        onChange={handleChangeAppointmentDate}
                                        name="appointmentDatetime"
                                        type="Date"
                                        value={appointment.appointmentDatetime}
                                    />
                                    {errorMessages.errorAppointmentDate && !appointment.appointmentDatetime ? (<FormHelperText style={{ color: "red" }} >
                                        Please select appointment date
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Available Slots" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >

                                    <SelectField
                                        placeholder="Select Slots"
                                        onChange={handleChangeAppointmentSlots}
                                        name="providerSlotID"
                                        value={appointment.providerSlotID}
                                        MaxLength='255'
                                        options={appointmentSlots}
                                        inputProps={{ ref: input => appointmentRef.availableSlotsRef = input }}
                                    />
                                    {errorMessages.errorAppointmentSlot && !appointment.providerSlotID ? (<FormHelperText style={{ color: "red" }} >
                                        Please select schedule slot
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Duration" size={4} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <SelectField
                                        placeholder="Duration"
                                        onChange={handleChange}
                                        name="duration"
                                        value={appointment.duration}
                                        MaxLength='255'
                                        options={durations}
                                        inputProps={{ ref: input => appointmentRef.durationRef = input }}
                                    />
                                    {errorMessages.errorDuration && !appointment.duration ? (<FormHelperText style={{ color: "red" }} >
                                        Please select duration
                                    </FormHelperText>) : ('')}

                                </Grid>


                                <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: "right", marginLeft: "17px", }} >
                                    <CheckboxField
                                        color="primary"
                                        name="allowOverlap"
                                        checked={appointment.allowOverlap}
                                        onChange={handleCheckBoxChange}
                                        disabled={(savedOverlapFlag && appointment.allowOverlap)}
                                        label="Overbooking"
                                    />
                                </Grid>
                                <Label title="Visit Reason" isTextAreaInput={true} size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >

                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Visit Reason"
                                        onChange={handleChange}
                                        name="reasonOfVisit"
                                        value={appointment.reasonOfVisit}
                                        MaxLength="2000"
                                    />
                                    {errorMessages.errorVisitReason && !appointment.reasonOfVisit ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter visit reason
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Patient Form(s)" size={4} style={{ alignItems: "baseline", paddingTop: "10px" }} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                    <span className={classes.subTd}>
                                        <SearchList
                                            id="Id"
                                            name="name"
                                            value={consentFormState.consentFormId}
                                            searchTerm={consentFormState.consentFormName}
                                            code="consent_form_for_appointment"
                                            // code="get_payer"
                                            apiUrl="ddl/loadItems"
                                            isUser={false}
                                            onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                            placeholderTitle="Search Consent Form"
                                        />
                                        <ul className={classes.consentFormList}>
                                            {
                                                consentForms ?
                                                    consentForms.map((item, i) => {
                                                        let isSelected = appointment.consentFormIds.some(item2 => item2 === item.id);
                                                        if (isSelected) {
                                                            return <li key={item.id}>
                                                                {item.isReport == "True" ?
                                                                    <LinkS onClick={() => printConsentForm(item)}>
                                                                        {item.value}
                                                                    </LinkS> :
                                                                    <LinkS target={"_blank"} href={"." + item.formPath}>
                                                                        {item.value}
                                                                    </LinkS>}
                                                                {item.ismandatory != "True" && item.isassigned != true ?
                                                                    <span className={classes.deleteIcon} onClick={() => deleteConsentFormItem(item.id)}><AddIcon /></span>
                                                                    : ""
                                                                }
                                                            </li>

                                                        } else { return <></> }
                                                    }) : ""
                                            }

                                        </ul>
                                    </span>

                                </Grid>


                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={5} container direction="row" style={{ maxHeight: "48px", alignItems: "baseline" }}>
                                <Label title="Location" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                    <SelectField
                                        placeholder="Select Location"
                                        onChange={handleChangeLocation}
                                        name="userLocationID"
                                        value={appointment.userLocationID}
                                        MaxLength='255'
                                        options={formLocations}
                                        inputProps={{ ref: input => appointmentRef.locationRef = input }}
                                    />
                                    {errorMessages.errorLocation && !appointment.userLocationID ? (<FormHelperText style={{ color: "red" }} >
                                        Please select location
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Notes" size={4} isTextAreaInput={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Notes"
                                        onChange={handleChange}
                                        name="notes"
                                        value={appointment.notes}
                                        MaxLength="2000"
                                    />
                                </Grid>
                                <Label title="Profile" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >

                                    <SelectField
                                        placeholder="Select Profile"
                                        onChange={handleChangeProfile}
                                        name="appointmentProfileID"
                                        value={appointment.appointmentProfileID}
                                        MaxLength='255'
                                        options={appointmentProfiles}
                                        inputProps={{ ref: input => appointmentRef.profileRef = input }}
                                    />
                                    <CheckboxField
                                        color="primary"
                                        name="isDefaultProfileType"
                                        checked={appointment.isDefaultProfileType}
                                        onChange={handleCheckBoxChange}
                                        label="Default profile"
                                    />
                                    {errorMessages.errorProfile && !appointment.appointmentProfileID ? (<FormHelperText style={{ color: "red" }} >
                                        Please select appointment profile
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Exam Room" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >

                                    <SelectField
                                        placeholder="Select Room"
                                        onChange={handleChange}
                                        name="roomID"
                                        value={appointment.roomID}
                                        MaxLength='255'
                                        options={rooms}
                                        inputProps={{ ref: input => appointmentRef.examRoomsRef = input }}
                                    />
                                    {errorMessages.errorRoom && !appointment.roomID ? (<FormHelperText style={{ color: "red" }} >
                                        Please select room
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Color" size={4} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                    <CustomSelectField
                                        placeholder="Select Color"
                                        onChange={handleChange}
                                        name="color"
                                        value={appointment.color}
                                        MaxLength='255'
                                        options={ColorListOptions}
                                    />
                                    {errorMessages.errorColor && !appointment.color ? (<FormHelperText style={{ color: "red" }} >
                                        Please select color
                                    </FormHelperText>) : ('')}
                                </Grid>

                                <Grid item xs={12} sm={4} md={4} lg={4}
                                    container
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}></FormLabel>
                                </Grid>
                                <Grid className={classes.checkBoxgrid} item xs={12} sm={8} md={8} lg={7} >
                                    <CheckboxField
                                        color="primary"
                                        name="ismarkDefaultAppType"
                                        checked={appointment.ismarkDefaultAppType}
                                        onChange={handleCheckBoxChange}
                                        label="Default for this appointment type"
                                    />
                                </Grid>
                                <Label title="Status" size={4} />
                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                    <SelectField
                                        id="select"
                                        name="statusCode"
                                        placeholder="Select Status"
                                        value={appointment.statusCode}
                                        onChange={handleChange}
                                        options={StatusListOptions} />
                                </Grid>

                            </Grid>


                            <Grid item xs={12} sm={12} md={12} lg={10}
                                container
                                direction="row">

                                <Grid item xs={12} sm={12} md={12} lg={12}
                                    container
                                    direction="row">
                                    <Grid item xs={12} sm={2} md={2} lg={2}
                                        container
                                        direction="row"
                                        className={classes.labelAlign}>
                                        <FormLabel className={classes.lableInput2}>Follow-up:</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={3} container direction="row" >
                                        <Grid item xs={12} sm={7} md={7} lg={7} >
                                            <CheckboxField
                                                color="primary"
                                                name="isFollowUp"
                                                checked={appointment.isFollowUp}
                                                onChange={handleCheckBoxChange}
                                                label=""
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>

                            {appointment.isFollowUp ?
                                <Grid item xs={12} sm={12} md={12} lg={12}
                                    container
                                    direction="row">

                                    <Grid item xs={12} sm={6} md={6} lg={5}
                                        container
                                        direction="row">
                                        {appointment.isFollowUp ?
                                            <Label title="Follow-up Date" size={4} mandatory={true} />
                                            :
                                            <Label title="Follow-up Date" size={4} />
                                        }


                                        <Grid item xs={12} sm={8} md={8} lg={7}>
                                            <InputBaseField
                                                placeholder="Follow-up Date"
                                                onChange={handleFollowUpChange}
                                                name="followupDate"
                                                type="Date"
                                                value={appointment.followupDate}
                                                inputProps={{ min: setFollowUpDateRange() }}
                                            />

                                            {errorMessages.errorfollowUpDate && !appointment.followupDate ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter follow-up Date
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={5} container
                                        direction="row">

                                        <Grid item xs={12} sm={4} md={4} lg={4}
                                            container
                                            direction="row"
                                            className={classes.labelAlign}>
                                            <FormLabel className={classes.lableInput}>Follow-up Reason <FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                        </Grid>

                                        <Grid item xs={12} sm={8} md={8} lg={7} >
                                            <InputBaseField
                                                placeholder="Follow-up Reason"
                                                onChange={handleChange}
                                                name="followupReason"
                                                value={appointment.followupReason}
                                                MaxLength={2000}
                                                type="text"
                                            />
                                            {errorMessages.errorfollowupReason && !appointment.followupReason ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter follow-up Reason
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                </Grid>
                                : ('')
                            }

                            {dataId < 0 || dataId == "" ?
                                <Grid item xs={12} sm={12} md={12} lg={12}
                                    container
                                    direction="row">

                                    <Grid item xs={12} sm={12} md={12} lg={10}
                                        container
                                        direction="row">
                                        <Grid item xs={12} sm={2} md={2} lg={2}
                                            container
                                            direction="row"
                                            className={classes.labelAlign}>
                                            <FormLabel className={classes.lableInput2}>Recurring:</FormLabel>
                                        </Grid>

                                        <Grid item xs={12} sm={10} md={10} lg={10} container direction="row" >
                                            <Grid item xs={12} sm={7} md={7} lg={7} >
                                                <CheckboxField
                                                    color="primary"
                                                    name="isRecurring"
                                                    checked={appointment.isRecurring}
                                                    onChange={handleCheckBoxChange}
                                                    label=""
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Grid>
                                : ('')
                            }

                            {
                                appointment.isRecurring && dataId == "" ?
                                    (
                                        <Grid item xs={12} sm={12} md={12} lg={12}
                                            container
                                            direction="row">
                                            <Grid item xs={12} sm={12} md={12} lg={10}
                                                container
                                                direction="row">
                                                <Grid item xs={12} sm={2} md={2} lg={2}
                                                    container
                                                    direction="row"
                                                    className={classes.labelAlign}>
                                                </Grid>

                                                <Grid item xs={12} sm={10} md={10} lg={10}
                                                    className={classes.labelAlign}>
                                                    <div className={classes.dayBox}>

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isSunday"
                                                            checked={appointment.isSunday}
                                                            label="Sun"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isMonday"
                                                            checked={appointment.isMonday}
                                                            label="Mon"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isTuesday"
                                                            checked={appointment.isTuesday}
                                                            label="Tue"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isWednesday"
                                                            checked={appointment.isWednesday}
                                                            label="Wed"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isThursaday"
                                                            checked={appointment.isThursaday}
                                                            label="Thu"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isFriday"
                                                            checked={appointment.isFriday}
                                                            label="Fri"
                                                        />

                                                        <CheckboxField
                                                            color="primary"
                                                            onChange={handleCheckBoxRecurringChange}
                                                            name="isSaturday"
                                                            checked={appointment.isSaturday}
                                                            label="Sat"
                                                        />
                                                    </div>
                                                    {errorMessages.errorDaySelect ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select at least one appointment recurring day
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    )
                                    : ('')
                            }

                            {
                                appointment.isRecurring && dataId == "" ?
                                    <Grid item xs={12} sm={12} md={12} lg={12}
                                        container
                                        direction="row">

                                        <Grid item xs={12} sm={12} md={12} lg={12}
                                            container
                                            direction="row">
                                            <Grid item xs={12} sm={6} md={6} lg={5} container direction="row">

                                                <Label title="Recurs Every" size={4} mandatory={true} />

                                                {/* <Grid item xs={12} sm={2} md={2} lg={2}> */}
                                                <Grid item xs={12} sm={8} md={8} lg={7} >
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                            <InputBaseFieldNumber
                                                                placeholder="Weeks"
                                                                onChange={handleChange}
                                                                name="recurEveryWeeks"
                                                                value={appointment.recurEveryWeeks}
                                                                MinValue={0}
                                                                MaxValue={1000}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                            <FormLabel className={classes.lableInput} style={{
                                                                marginLeft: "5px"
                                                            }} >Week(s)</FormLabel>

                                                        </Grid>
                                                        {errorMessages.errorReoccureWeeks ? (<FormHelperText style={{
                                                            color: "red",
                                                            paddingTop: "9px"
                                                        }} >
                                                            Please enter re-occure every week
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>


                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    : ('')
                            }

                            {
                                appointment.isRecurring && dataId == "" ?
                                    <Grid item xs={12} sm={12} md={12} lg={12}
                                        container
                                        direction="row">

                                        <Grid item xs={12} sm={6} md={6} lg={5}
                                            container
                                            direction="row">
                                            <Label title="First Appointment" size={4} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={7}>
                                                <InputBaseField
                                                    placeholder="First Appointment"
                                                    onChange={handleChange}
                                                    name="firstAppointmentDate"
                                                    value={appointment.firstAppointmentDate}
                                                    MaxLength={50}
                                                    type="Date"
                                                />
                                                {errorMessages.errorRStartDate && !appointment.firstAppointmentDate ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter first appointment date
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={5} container
                                            direction="row">
                                            <Label title="Last Appointment" size={4} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={7} >
                                                <InputBase
                                                    className={classes.baseInput}
                                                    placeholder="Last Appointment"
                                                    onChange={handleChange}
                                                    name="lastAppointmentDate"
                                                    value={appointment.lastAppointmentDate}
                                                    type="Date"
                                                    inputProps={{ maxLength: 50, min: setLastAppointmentDateRange() }}
                                                />
                                                {errorMessages.errorRLastDate && !appointment.lastAppointmentDate ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter last appointment date
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    : ('')
                            }

                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row">
                                <Grid item xs={12} sm={6} md={6} lg={5} container direction="row">
                                    <Grid item xs={12} sm={4} md={4} lg={4}
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
                                        onSubmit={actiondialogprops.OnOk}
                                        //onSubmit={actiondialogprops.dialogactiontype === true ? Save : deleteAppointment}
                                        onCancel={() => setActionDialogProps(prevState => ({
                                            ...prevState,
                                            actiondialogstate: false,
                                        }))
                                        }
                                    />
                                    <Grid item xs={12} sm={8} md={8} lg={7} >
                                        <FooterBtn className={classes.footerBtn}>
                                            {isSaveCall ?
                                                <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>
                                                : <FormBtn id={"save"} onClick={alertPastDates} size="medium" disabled={!props.isEditable}>Save</FormBtn>
                                            }
                                            {dataId != 0 ?
                                                isDeleteCall ?
                                                    <FormBtn id={"loadingDelete"}
                                                        size="medium">Delete</FormBtn> :
                                                    <FormBtn id={"delete"} onClick={() => deleteAppointment()}
                                                        size="medium" disabled={!props.isEditable}>Delete</FormBtn>
                                                : null
                                            }
                                            <FormBtn id={"resetBtn"} onClick={ClearFormValues} size="medium" >Reset </FormBtn>
                                        </FooterBtn>
                                    </Grid>
                                </Grid>
                            </Grid>




                        </Grid>
                    </Grid>

                </form>
            </ShadowBox>
            {demographicsDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={demographicsDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Add Patient</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <PatientInfo dataId={''} getPatientInfo={(name, id) => getPatientInfo(name, id)} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
        </>
    );
}
export default withSnackbar(Appointment)