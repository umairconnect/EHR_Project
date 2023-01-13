import React, { useState, useEffect, useCallback } from "react";


// styles
import useStyles from "./styles";
import { Container, Button, FormControlLabel, FormGroup, Checkbox, Grid, Avatar } from '@material-ui/core';//Tooltip,
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components

import { Calendar, momentLocalizer } from "react-big-calendar"; //, Toolbar
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";



import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./component/calendar-style.css";
import DateIcon from "../../images/icons/date-icon.png";
import TodayIcon from "../../images/icons/today-icon.png";
import ListViewIcon from "../../images/icons/list-view-icon.png";
//import PrinterIcon from "../../images/icons/printer-icon.png";


import PageTitle from "../../components/PageTitle";
import { PostDataAPI } from '../../Services/PostDataAPI';


import Appointment from '../appointment/component/Appointment';
import AppointmentsList from '../appointment/appointmentsList';
import { GetUserInfo } from '../../Services/GetUserInfo';

import Skeleton from '@material-ui/lab/Skeleton';
import { withSnackbar } from '../../components/Message/Alert';
import LeftArrow from "../../images/icons/leftArrow.png";
import RightArrow from "../../images/icons/rightArrow.png";

import AIcon from "../../images/icons/A.png";
import AIconBlue from "../../images/icons/arrived.png";
import CIcon from "../../images/icons/C.png";
import CIconBlue from "../../images/icons/confirmed.png";
import RIcon from "../../images/icons/R.png";
import RIconBlue from "../../images/icons/re-scheduled.png";
import XIcon from "../../images/icons/X.png";
import XIconBlue from "../../images/icons/canceled.png";
import CIIcon from "../../images/icons/CI.png";
import CIIconBlue from "../../images/icons/checked-in.png";
import CIOIcon from "../../images/icons/CIO.png";
import CIOIconBlue from "../../images/icons/checked-in-online.png";
import TickIcon from "../../images/icons/Tick.png";
import TickIconBlue from "../../images/icons/completed.png";
import IRIcon from "../../images/icons/IR.png";
import IRIconBlue from "../../images/icons/in-room.png";
import ISIcon from "../../images/icons/IS.png";
import ISIconBlue from "../../images/icons/in-session.png";
import NCIcon from "../../images/icons/NC.png";
import NCIconBlue from "../../images/icons/not-confirmed.png";
import NSIcon from "../../images/icons/NS.png";
import NSIconBlue from "../../images/icons/no-show.png";
import OIcon from "../../images/icons/O.png";
import OIconBlue from "../../images/icons/orphan.png";

import WalkIcon from "../../images/icons/WalkIn.png";
import WalkIconBlue from "../../images/icons/WalkIn-Blue.png";
import VideoIcon from "../../images/icons/VideoVisit.png";
import VideoIconBlue from "../../images/icons/VideoVisit-Blue.png";
//import CalendarDate from "./component/calendar";
import DateCalendar from "./component/date-calendar";
import { applyCategoryColor } from './component/helper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { IsEditable } from '../../Services/GetUserRolesRights';

moment.locale('ko', {
    week: {
        dow: 1,
        doy: 1,
    },

});
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

let selectedProviders = [];
let selectedLocations = [];
let roomGrouping = [];
let groupRooms;
let objScheduleSlots;

function Schedule(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [title, setTitle] = useState('Schedule');
    const [dataId, setDataId] = useState('');
    const [newAppDate, setNewAppDate] = useState('');
    const [newAppDateTime, setNewAppDateTime] = useState('');
    const [appPatientName, setAppPatientName] = useState('');
    const [newAppSlotTime, setNewAppSlotTime] = useState('');
    const [schedulerEvent, setSchedulerEvent] = useState([]);
    const [schedulerDoctor, setSchedulerDoctor] = useState([]);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [provider, setProviders] = useState([]);
    const [location, setLocation] = useState([]);
    const [dragDrop, setDragDrop] = useState();
    const [schedulerWidth, setSchedulerWidth] = useState(false);
    const [calendarShowHide, setCalendarShowHide] = useState(false);
    const [viewChanging, setViewChanging] = useState('simple');
    const [dView, setDView] = useState('month');

    const [resizeAppointment, setResizeAppointment] = useState();
    const [doctorGroup, setDoctorGroup] = useState([]);
    const [tootipData, setTootipData] = useState({});
    const [tootipShowHide, setTootipShowHide] = useState(false);
    const [defaultDateView, setDefaultDateView] = useState(moment().toDate());//moment().toDate()
    const [openDate, setOpenDate] = useState(false);
    const [currentPage, setCurrentPage] = useState("schedule"); //schedule, appList, app

    const [patientId, setPatientId] = useState(0);
    const [isEditable, setIsEditable] = useState(IsEditable("Schedule"));
    const [scheduleDates, setScheduleDates] = useState({
        startDate: moment(moment().startOf('month').format('YYYY-MM-DD'), "YYYY-MM-DD").add(-7, 'days'),
        endDate: moment(moment().endOf('month').format('YYYY-MM-DD'), "YYYY-MM-DD").add(7, 'days')
    })
    let history = useHistory();

    const dateClick = useCallback((date) => {

        setDefaultDateView(date);
        setScheduleDate(date, dView);

    }, [defaultDateView]);

    const onDateClick = useCallback((date, view) => {
        // console.log(date);
        setDefaultDateView(date);
        setScheduleDate(date, view);

        // let dateCheckIt = moment(date).format('MMM,yyyy')
        // console.log(date)
        // console.log(dateCheckIt)
    }, [defaultDateView]);

    const onViewClick = useCallback((view) => {
        //console.log(view, defaultDateView)

        setScheduleDate(defaultDateView, view);

        debugger

        setDView(view)

    }, [defaultDateView]);

    const setScheduleDate = (date, view) => {
        let startDate = moment(date).format('YYYY-MM-DD');
        let endDate = startDate;

        //getPatientAppointments(date.toISOString())
        debugger

        if (view === "month") {
            startDate = moment(date).startOf('month').format('YYYY-MM-DD');
            endDate = moment(date).endOf('month').format('YYYY-MM-DD');
            startDate = moment(startDate, "YYYY-MM-DD").add(-7, 'days')
            endDate = moment(endDate, "YYYY-MM-DD").add(7, 'days')

        }
        if (view === "week") {
            startDate = moment(date).startOf('isoWeek').format('YYYY-MM-DD');
            endDate = moment(date).endOf('isoWeek').format('YYYY-MM-DD');

        }

        console.log(startDate, endDate)
        if (moment(startDate).isBefore(scheduleDates.startDate) || moment(endDate).isAfter(scheduleDates.endDate)) {

        }
        setScheduleDates({ startDate: startDate, endDate: endDate });
        getSchedulerByFilters(startDate, endDate);

        debugger


        console.log(dView)
    }
    const addNew = () => {
        history.replace(location.pathname, null);
        setDataId('');
        setNewAppDate('');
        setNewAppDateTime('');
        setAppPatientName('');
        setCurrentPage('app');
        setTitle("New Appointment");
    };
    const apptList = () => {
        setCurrentPage('appList')
        setTitle("Appointments");
        //onLoad();

    };
    const backButton = () => {
        loadSchedule();
        history.replace(location.pathname, null);
        setCurrentPage("schedule");
        setTitle("Schedule");
    }

    const appoinetView = (event) => {
        history.replace(location.pathname, null);
        if (!event.isBreak) {
            setDataId(event.id);
            setAppPatientName(event.patientName);
            setCurrentPage('app');
            setTitle("Edit Appointment");
            setTootipShowHide(false);
        }
    }


    function onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    const onEventResize = (data) => {
        setTootipShowHide(false);
        if (!data.event.isBreak) {

            const { start, end } = data;

            let obj = {

                patientAppointmentId: data.event.id,
                startDate: new Date(start),
                endDate: new Date(end),
                userLocationID: data.event.userLocationID,
                duration: data.event.duration,
                startTime: data.event.end.toLocaleTimeString(),
                endTime: end.toLocaleTimeString()

            }

            PostDataAPI("appointment/ReSizePatientAppointment", obj, true).then((result) => {

                if (result.success && result.data != null) {


                    setResizeAppointment(obj);
                }
                else {
                    showMessage("Provider slot", result.message, "info", 3000);
                }

            })


            //setState((state) => {
            //    state.events[0].start = start;
            //    state.events[0].end = end;
            //    return { events: [...state.events] };
            //});
        }
    };



    const onEventDrop = (data) => {
        setTootipShowHide(false);
        if (!data.event.isBreak) {
            let obj = {
                patientAppointmentId: data.event.id,
                AppointmentDatetime: new Date(data.start),
                userLocationID: data.event.userLocationID,
                duration: data.event.duration,
                AppointmentTime: data.event.start.toLocaleTimeString()
            }

            PostDataAPI("appointment/updatePatientAppointmentbyScheduler", obj, true).then((result) => {

                if (result.success && result.data != null) {

                    setDragDrop(obj);
                }
                else {
                    showMessage("Provider slot", result.message, "info", 3000);
                }

            })
        }

    };

    const eventStyleGetter = (event, start, end, isSelected) => {

        var bordercolor = null;
        var textColor = event.bgColor == "yellow" || event.bgColor == "orange" ? "#373a3c" : "white";
        if (event.bgColor == "none" || event.bgColor == "White") {
            textColor = "#11284B";
            bordercolor = "#d3d3d3";
        }
        var bgColor = event.bgColor;
        // console.log(event);
        var style = {}
        if (event.bgColor === "none" || event.bgColor === "White") {
            style = {
                color: "black",
                fontFamily: "Lato",
                fontSize: "10px",
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: '0px',
                border: '0.1px solid' + bordercolor,
                display: 'block'
            };
        }
        else {
            style = {
                color: "black",
                fontFamily: "Lato",
                fontSize: "10px",
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: '0px',
                border: '0px',
                display: 'block'
            };

        }
        return {
            style: style
        };
    }

    useEffect(() => {

        loadSchedule();
        console.log(dragDrop + ":" + resizeAppointment);
    }, [dragDrop, resizeAppointment]);

    const loadSchedule = () => {
        let checkOjb = props.location.state;
        // console.log(checkOjb.patientName);

        if (props.location.state != undefined && checkOjb.new == "new") {
            setPatientId(checkOjb.dataID);
            setAppPatientName(checkOjb.patientName);

            var d1 = new Date();
            setNewAppDate(d1.toDateString("yyyy-MM-dd"));
            setNewAppDateTime(d1);
            setCurrentPage('app');
        }
        if (props.location.state != undefined && props.location.state == "newList") {
            apptList();
        }
        if (props.location.state != undefined && props.location.state == "true") {
            apptList();
        }
        initilization();

    }


    function getPatientAppointments(from_date, to_date) {

        if (!from_date)
            from_date = scheduleDates.startDate;
        if (!to_date)
            to_date = scheduleDates.endDate;

        let obj = {

            providerid: selectedProviders.join(', '),
            locationid: selectedLocations.join(', '),
            IsGrid: '1',
            from_date: from_date,
            to_date: to_date
        };
        obj.loggedinUserId = userInfo.userID;
        PostDataAPI("appointment/loadPatientAppointmentGrid", obj).then((result) => {

            if (result.success && result.data != null) {

                checkSetDafaultDateAndAge(result.data);

                result.data.map((item, i) => {
                    if (item.roomID !== null)
                        roomGrouping.push({ resourceId: item.roomID, resourceTitle: item.examRoom });
                });

                groupRooms = [...new Map(roomGrouping.map(o => [o["resourceId"], o])).values()]; // Removed Repeted Data
                //console.log(result.data);
                setSchedulerEvent(
                    result.data.map((item, i) => {
                        return {
                            // allDay: true,    
                            id: item.patientAppointmentID,
                            title: item.title,
                            start: new Date(item.startDate),
                            end: new Date(item.endDate),
                            bgColor: item.color == "none" || item.color == "" || item.color == "None" ? "White" : item.color,
                            provider: item.providerName,
                            gender: item.gender,
                            notes: item.notes,
                            duration: item.duration,
                            dateTime: item.appointmentDate,
                            status: item.statusCode,
                            reasonOfVisit: item.reasonOfVisit,
                            appointmentTime: item.appointmentTime + '-' + item.appointmentEndTime.trim().replaceAll("AM", " AM").replace("PM", " PM"),
                            locationName: item.locationName,
                            patientName: item.patientName,
                            lastVisit: item.lastAppointmentVisitDate,
                            room: item.examRoom,
                            age: item.age,
                            userLocationID: item.userLocationID,
                            roomID: item.roomID,
                            photoPath: item.photoPath,
                            isBreak: item.isBreak,
                            breakReason: item.breakReason,
                            appointmentTypeCode: item.appointmentTypeCode,
                            resourceId: item.roomID,
                            // desc: ' Patient Name : '+ item.patientName
                            // +'\n Status : '+ item.statusCode
                            // +'\n Gender : '+ item.gender_code
                            // +'\n First Appointment Date : '+ new Date(item.firstAppointmentDate)
                            // +'\n Reason Of Visit : '+ item.reasonOfVisit
                            // +'\n Follow Up Date : '+ new Date(item.followupDate)
                            // +'\n Cell Phone : '+ item.cell_phone
                            // +'\n Notes : '+ item.notes
                            // +'\n Duration : ' + item.duration,

                            //movable: true,
                        };

                    }

                    ));

                setSchedulerDoctor(
                    result.data.map((item, i) => {

                        return {

                            id: item.patientAppointmentID,
                            title: item.title,
                            start: new Date(item.startDate),
                            end: new Date(item.endDate),
                            bgColor: item.color,
                            provider: item.providerName,
                            gender: item.gender,
                            notes: item.notes,
                            duration: item.duration,
                            dateTime: item.patientAppointmentDateTime,
                            status: item.statusCode,
                            reasonOfVisit: item.reasonOfVisit,
                            appointmentTime: item.appointmentTime + '-' + item.appointmentEndTime,
                            locationName: item.locationName,
                            lastVisit: item.lastAppointmentVisitDate,
                            room: item.examRoom,
                            age: item.age,
                            patientName: item.patientName,
                            userLocationID: item.userLocationID,
                            roomID: item.roomID,
                            photoPath: item.photoPath,
                            isBreak: item.isBreak,
                            breakReason: item.breakReason,
                            appointmentTypeCode: item.appointmentTypeCode,
                            resourceId: parseInt(item.userId),

                        };

                    }

                    ));


            }

        })
    }

    function initilization() {

        if (userInfo.isProvider == true) {
            selectedProviders = [];
            selectedLocations = [];

            let data = {
                userID: userInfo.userID
            }

            PostDataAPI("user/getUserLocations", data).then((result) => {
                selectedLocations = [];
                if (result.success && result.data != null) {

                    setLocation(
                        result.data.map((item, i) => {
                            return { value: item.id, label: item.text1, isLocation: true };
                        }));

                    result.data.map((item, i) => {

                        selectedLocations = [...selectedLocations, item.id];

                    });

                    getSchedulerByFilters();

                }
            });
        }
        else { }

        if (userInfo.isProvider == false) {

            selectedProviders = [];
            selectedLocations = [];

            let data = {
                userID: userInfo.userID
            }

            PostDataAPI("user/getStaffProviders", data).then((result) => {

                if (result.success && result.data != null) {

                    setProviders(
                        result.data.map((item, i) => {
                            return { value: item.id, label: item.text1 + ' ' + item.text2, isProvider: true };

                        }));

                    setDoctorGroup(
                        result.data.map((item, i) => {
                            return { resourceId: parseInt(item.id), resourceTitle: item.text1 + ' ' + item.text2 };
                        }));


                    result.data.map((item, i) => {
                        selectedProviders = [...selectedProviders, item.id];
                    });

                    getSchedulerByFilters();

                }



            });

        }
        else { }


    }


    const handleChangeLocations = e => {

        const { name, value } = e.target;
        let isTrue = false;

        location[name].isLocation = !location[name].isLocation;

        setLocation(
            location.map((item, i) => {
                return { value: item.value, label: item.label, isLocation: item.isLocation };
            }));

        if (location[name].isLocation) { selectedLocations = [...selectedLocations, location[name].value]; }
        else {
            let index = selectedLocations.indexOf(location[name].value);
            selectedLocations.splice(index, 1);
        }


        location.map((item, i) => {

            if (item.isLocation == true)
                isTrue = true;
        });

        if (isTrue == false) {
            showMessage("Warning", "You should select at least one location", "info", 3000);

            location[name].isLocation = !location[name].isLocation;

            setLocation(
                location.map((item, i) => {
                    return { value: item.value, label: item.label, isLocation: item.isLocation };
                }));

            if (location[name].isLocation) { selectedLocations = [...selectedLocations, location[name].value]; }
            else {
                let index = selectedLocations.indexOf(location[name].value);
                selectedLocations.splice(index, 1);
            }

        }
        //getPatientAppointments();
        getSchedulerByFilters();

    };

    const handleChangeProviders = e => {
        const { name, value } = e.target;
        let isTrue = false;

        provider[name].isProvider = !provider[name].isProvider;

        setProviders(
            provider.map((item, i) => {
                return { value: item.value, label: item.label, isProvider: item.isProvider };
            }));

        if (provider[name].isProvider) { selectedProviders = [...selectedProviders, provider[name].value]; }
        else {
            let index = selectedProviders.indexOf(provider[name].value);
            selectedProviders.splice(index, 1);
        }


        provider.map((item, i) => {

            if (item.isProvider == true)
                isTrue = true;
        });

        if (isTrue == false) {
            showMessage("Warning", "You should select at least one provider", "info", 3000);

            provider[name].isProvider = !provider[name].isProvider;

            setProviders(
                provider.map((item, i) => {
                    return { value: item.value, label: item.label, isProvider: item.isProvider };
                }));

            if (provider[name].isProvider) { selectedProviders = [...selectedProviders, provider[name].value]; }
            else {
                let index = selectedProviders.indexOf(provider[name].value);
                selectedProviders.splice(index, 1);
            }

        }
        let updatedProviders = provider.filter(item => item.isProvider == true)
        setDoctorGroup(
            updatedProviders.map((item, i) => {
                return { resourceId: parseInt(item.value), resourceTitle: item.label };
            }));
        getSchedulerByFilters();
    };


    const getSchedulerByFilters = (from_date, to_date) => {
        if (!from_date)
            from_date = scheduleDates.startDate;
        if (!to_date)
            to_date = scheduleDates.endDate;

        let obj = {
            ProviderIDs: selectedProviders.join(', '),
            UserLocationIDs: selectedLocations.join(', '),
            fromDate: from_date,
            toDate: to_date
        };
        if (userInfo.isProvider == true) {

            if (obj.UserLocationIDs == '')
                obj.UserLocationIDs = '0';

            PostDataAPI("scheduler/getProvidersScheduleAppointmentSlotsProviders", obj, true).then((result) => {

                if (result.success && result.data != null) {

                    objScheduleSlots = result.data;

                    getPatientAppointments(from_date, to_date);

                    setCalendarShowHide(true);

                }

            })
        }
        else if (userInfo.isProvider == false) {

            if (obj.ProviderIDs == '')
                obj.ProviderIDs = '0';


            PostDataAPI("scheduler/GetProvidersScheduleAppointmentSlotsStaff", obj).then((result) => {

                if (result.success && result.data != null) {

                    objScheduleSlots = result.data;

                    getPatientAppointments(from_date, to_date);

                    setCalendarShowHide(true);

                }

            })

        }
    }


    function checkSetDafaultDateAndAge(dataSet) {

        dataSet.map((item, i) => {
            if (dataSet[i].birthDate != null && dataSet[i].birthDate.trim() != '0001-01-01T00:00:00')
                dataSet[i].birthDate = dataSet[i].birthDate.split('T')[0];
            else
                dataSet[i].birthDate = '';
            dataSet[i].age = getAgeByDOB(dataSet[i].birthDate);
        });

    }

    function getAgeByDOB(birthDate) {

        var result = '';
        if (birthDate.trim() != '' && birthDate != undefined) {

            var mdate = birthDate;
            var yearThen = parseInt(mdate.substring(0, 4), 10);
            var monthThen = parseInt(mdate.substring(5, 7), 10);
            var dayThen = parseInt(mdate.substring(8, 10), 10);

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);
            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
            var month_age = Math.floor(day_age / 30);
            day_age = day_age % 30;


            if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
                result = '';
            else if (year_age > 0)
                result = year_age + ' years, ' + month_age + ' months, ' + day_age + ' days';
            else if (year_age === 0 && month_age > 0)
                result = month_age + ' months, ' + day_age + ' days';
            else if (year_age > 0 && month_age === 0)
                result = year_age + ' years, ' + day_age + ' days';
            else if (day_age === 0)
                result = '';
            else
                result = day_age + ' days';
        }
        return result;
    }
    const getSlotEndDate = (dt) => {
        var duration = 15;//calendar slot duration.
        return new Date(dt.getTime() + duration * 60000);
    }

    const customSlotPropGetter = date => {

        let objDate;
        let objEndDate;
        let resultDate = date;
        let resultEndDate = getSlotEndDate(date);
        var obj = objScheduleSlots.find((element, index) => {
            objDate = new Date(element.scheduleDateTime);
            objEndDate = new Date(element.endDateTime);

            if (objDate !== undefined && resultDate !== undefined && (resultDate.getTime() >= objDate.getTime() && resultDate.getTime() < objEndDate.getTime()
                || resultEndDate.getTime() > objDate.getTime() && resultEndDate.getTime() <= objEndDate.getTime()))
                return objScheduleSlots[index];
        });

        if (obj !== undefined && resultDate !== undefined && (resultDate.getTime() >= objDate.getTime() && resultDate.getTime() <= objEndDate.getTime()
            || resultEndDate.getTime() >= objDate.getTime() && resultEndDate.getTime() <= objEndDate.getTime())) {

            return {
                className: 'available-slot',
            }
        }
        else
            return {
                className: 'not-available-slot',

            }
    }


    const MyCustomHeader = ({ label }) => (
        <div>

            <div>{label}</div>
            {/* Appointments */}
        </div>
    )

    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
                backgroundColor: '#F3F3F3',
            },
        })
    const dateOpenClose = () => {

        debugger

        setOpenDate({ openDate: !openDate })

    }
    const CustomToolbar = (toolbar) => {

        const [activeView, setActiveView] = useState(0);

        const ViewChange = (action, examroom) => {

            if (action === "month") {
                setActiveView(0)
            }

            if (action === "week") {
                setActiveView(1)
            }

            if (action === "today") {
                setActiveView(2)
            }

            if (action === "day") {
                setActiveView(2)
            }



        }

        const setTodayView = (action) => {
            if (action === "day") {
                setActiveView(5)
            }
        }

        const ViewExamTab = (action) => {
            if (action === "day") {
                setActiveView(3)
            }
        }

        const navigate = action => {
            toolbar.onNavigate(action)
        }
        const doctors = action => {
            setViewChanging('doctor')
            setDView(action)
            toolbar.onView(action)
            ViewChange(action)
            setActiveView(4)
        }

        const TodayView = (action) => {
            setViewChanging('simple')
            setDView(action)

            setDefaultDateView(moment().toDate())

            toolbar.onView(action)


            setTodayView(action)

        }

        const view = action => {

            setViewChanging('simple')
            toolbar.onView(action)
            setDView(action)

            ViewChange(action)



        }
        const rooms = (action) => {

            setViewChanging('room')
            setDView(action)

            toolbar.onView(action)

            ViewExamTab(action)
        }
        return (
            <div className='rbc-toolbar'>
                <div className="rbc-btn-group" style={{ visibility: "hidden" }}>
                    <button type="button" onClick={apptList}><img src={ListViewIcon} className={classes.listViewIcon} /> Appt. List</button>
                    <ToggleButton
                        value={schedulerWidth}
                        selected={schedulerWidth}
                        onChange={() => { setSchedulerWidth(!schedulerWidth); }}
                        className={classes.toggleBtn}
                    >
                        {!schedulerWidth ? "Show Filter" : "Hide Filter "}
                    </ToggleButton>
                    <button type="button" onClick={addNew} title="+ Add New" disabled={!isEditable}>+ Add New</button>
                </div>
                <span className="rbc-toolbar-label">
                    <button type="button" onClick={() => navigate('PREV')} title="PREVIOUS"><img className="arrowIcon" src={LeftArrow} alt="PREV" /></button>
                    <span className="schedulerdate" onClick={dateOpenClose} style={{ cursor: "pointer" }}><img className="schedulerdateIcon" src={DateIcon} alt="Date" /> {toolbar.label}</span>
                    <button type="button" onClick={() => navigate('NEXT')} title="NEXT"><img className="arrowIcon" src={RightArrow} alt="NEXT" /></button>
                </span>
                <div className="rbc-btn-group">
                    <button type="button" className={activeView === 5 ? classes.activeView : '' + 'today-btn'} onClick={() => TodayView('day')}><img src={TodayIcon} alter="today" />Today</button>
                    <button type="button" className={activeView === 2 ? classes.activeView : ''} onClick={() => view('day')}>Daily</button>
                    <button type="button" className={activeView === 1 ? classes.activeView : ''} onClick={() => view('week')}>Weekly</button>
                    <button type="button" className={activeView === 0 ? classes.activeView : ''} onClick={() => view('month')}>Monthly</button>
                    <button type="button" className={activeView === 3 ? classes.activeView : ''} onClick={() => rooms('day')}>Exam Rooms</button>
                    {!userInfo.isProvider && provider ? <button className={activeView === 4 ? classes.activeView : ''} type="button" onClick={() => doctors('day')}>Providers</button> : null}
                </div>

            </div>
        )
    }


    const handleSelect = ({ start, end, allDay }) => {


        let d1 = new Date(start);
        let slotEndDate = getSlotEndDate(d1);
        let decision = false;

        if (dView === 'month') {

            objScheduleSlots.map((item, i) => {
                let d2 = new Date(item.scheduleDateTime);


                if (d1.toDateString() == d2.toDateString()) {
                    decision = true;
                    return;
                }
            });

        }
        else {
            objScheduleSlots.map((item, i) => {
                let d2 = new Date(item.scheduleDateTime);
                let endDate = new Date(item.endDateTime);

                if (d1.getTime() >= d2.getTime() && d1.getTime() < endDate.getTime()
                    || slotEndDate.getTime() > d2.getTime() && slotEndDate.getTime() <= endDate.getTime()) {
                    decision = true;
                    return;
                }
            });

        }

        if (decision) {

            setDataId('');
            setAppPatientName('');
            setNewAppDate(d1.toDateString("yyyy-MM-dd"));
            setNewAppDateTime(d1);
            // setNewAppSlotTime((start.getHours()) + ":" + (start.getMinutes() < 10 ? "0" + start.getMinutes() : start.getMinutes()));
            setNewAppSlotTime(start.toLocaleTimeString());
            setCurrentPage('app');
            setTitle("New Appointment");

        }
        else {
            showMessage("Alert", "Provider slot is not available", "info", 3000);
        }
    }

    //   const  EventAgenda = ({ event }) =>{
    //     return <span>
    //       <em style={{ color: '#11284B'}}>{event.title}</em>
    //       <p>{ event.start + event.end}</p>
    //     </span>
    //   }

    const EventTest = ({ event }) => {
        //console.log(event)
        // let tooltipData = event.desc;
        //   <Tooltip classes={{ tooltip: classes.customTooltip }} title={tooltipData} >
        //   <span>{event.title} </span>
        //  </Tooltip>
        // let pAge=tootipData.age.slice(0, 8);
        // let eventAge=pAge.replace(',',''); 
        // console.log(ref.current.innerText)
        // return ReactDOM.findDOMNode(ref.current);
        const ref = React.useRef(null);
        const leaveMouse = (e) => {
            setTootipShowHide(false)
        }
        const onMouse = () => {
            setTootipShowHide(true);
            setTootipData(
                event
            )
        };
        let breakTitle = event.breakReason ? event.breakReason + ' ' + event.appointmentTime : "Break Time" + event.appointmentTime;
        let tootipTitle = event.isBreak ? breakTitle : "View Details";
        let pTitle = event.title.replace(/,/g, ', ');
        return (
            <span className="tooltipBox" title={tootipTitle} ref={ref} >
                {(() => {
                    switch (event.status) {
                        case 'Arrived':
                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={AIconBlue} alt="" />
                                );
                            } else {
                                return (
                                    <img className="status-icon" src={AIcon} alt="" />
                                );
                            }
                        case 'Cancelled':
                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={XIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={XIcon} alt="" />
                                );
                            }
                        case 'Checked-in':
                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={CIIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={CIIcon} alt="" />
                                );
                            }

                        case 'Checked-in Online':
                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={CIOIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={CIOIcon} alt="" />
                                );
                            }
                        case 'Confirmed':
                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={CIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={CIcon} alt="" />
                                );
                            }
                        case 'Completed':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={TickIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={TickIcon} alt="" />
                                );
                            }
                        case 'In-Room':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={IRIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={IRIcon} alt="" />
                                );
                            }
                        case 'In-Session':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={ISIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={ISIcon} alt="" />
                                );
                            }
                        case 'Not-Confirmed':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={NCIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={NCIcon} alt="" />
                                );
                            }
                        case 'No-Show':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={NSIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={NSIcon} alt="" />
                                );
                            }

                        case 'Orphan':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={OIconBlue} alt="" />
                                );
                            }
                            else {
                                return (
                                    <img className="status-icon" src={OIcon} alt="" />
                                );

                            }
                        case 'Re-Scheduled':

                            if (event.bgColor == "White" || event.bgColor == "none") {
                                return (
                                    <img className="status-icon2" src={RIconBlue} alt="" />
                                )
                            }
                            else {
                                return (
                                    <img className="status-icon" src={RIcon} alt="" />
                                )
                            }
                    }
                })()}
                <span onMouseOver={onMouse} onMouseLeave={leaveMouse} className="tootltipTitle">{pTitle}</span>
                {(() => {
                    switch (event.appointmentTypeCode) {
                        case 'Walk-in':
                           
                                return (
                                    <img className="appointment-type-icon" src={WalkIcon} alt="Walk In" />
                                );
                            
                        case 'Video-Visit':

                                return (
                                    <img className="appointment-type-icon" src={VideoIcon} alt="Video Visit" />
                                );
                    }
                })()}
            </span>
        )
        {/* <ul className="desc">
                    <li className="headerTop" >
                        <span className="headerTopLeftSide">
                        <img src={event.photoPath ? "." + event.photoPath :"/static/media/profile-pic.7e2ec63d.jpg"} alt="dp" />
                        </span>
                        <span className="headerTopRightSide">
                            <span className="headerTopTitle">{event.provider}</span>
                            <span className="headerTopTitle">{eventAge} | {event.gender}</span>
                            <span className="headerTopTitle02">Last Visit:  {event.lastVisit}</span>
                        </span>
                    </li>
                    <li className="line"></li>
                    <li>
                        <span className="liTitle">Location:</span>
                        <span className="liValue">{event.locationName}</span>
                    </li>
                    <li>
                        <span className="liTitle">Provider:</span>
                        <span className="liValue">{event.provider}</span>
                    </li>
                    <li>
                        <span className="liTitle">Date:</span>
                        <span className="liValue">{event.dateTime}</span>
                    </li>
                    <li>
                        <span className="liTitle">Time:</span>
                        <span className="liValue">{event.appointmentTime}</span>
                    </li>
                    <li>
                        <span className="liTitle">Visit Reason:</span>
                        <span className="liValue">{event.reasonOfVisit}</span>
                    </li>
                    <li>
                        <span className="liTitle">Duration:</span>
                        <span className="liValue">{event.duration}</span>
                    </li>
                    <li>
                        <span className="liTitle">Status:</span>
                        <span className="liValue">{event.status}</span>
                    </li>
                    <li>
                        <span className="liTitle">Exam Room:</span>
                        <span className="liValue">{event.room}</span>
                    </li>
                    <li>
                        <span className="liTitle">Notes:</span>
                        <span className="liValue">{event.notes}</span>
                    </li>
                    <li className="line"></li>
                    <li>
                        <span className="liTitle">Last Visit:</span>
                        <span className="liValue">{event.lastVisit}</span>
                    </li>
                    <li className="line"></li>
                    <li className="liSubTitle">
                        Insurance
                    </li>
                    <li className="liFooter" >
                        <span className="liFooterTitle">Global Healthcare Insurance</span>
                        <span className="liFooterTitle">Policy #: 1123456</span>
                        <span className="liFooterTopTitle02">Status: <span>Active</span></span>
                    </li>
                    <li className="liFooter" >
                        <span className="liFooterTitle">General Insurance Crop</span>
                        <span className="liFooterTitle">Policy #: 1123456</span>
                        <span className="liFooterTopTitle02">Status: <span>Active</span></span>
                    </li> 

                </ul> */}

    }
    const ageReturn = (age) => {
        if (!age)
            return
        let pAge = age.slice(0, 8);
        let eventAge = pAge.replace(',', '');
        return eventAge;
    }

    const customDayPropGetter = date => {

        let objDate;
        let resultDate = date;
        var obj = objScheduleSlots.find((element, index) => {
            objDate = new Date(element.scheduleDateTime.split('T')[0]);

            if (objDate !== undefined && resultDate !== undefined && objDate.toDateString() === resultDate.toDateString())
                return objScheduleSlots[index]
        });

        if (obj !== undefined && resultDate !== undefined && objDate.toDateString() === resultDate.toDateString()) {
            return {
                className: 'available-slot',
            }
        }
        else
            return {
                className: 'not-available-slot',

            }
    }



    return (
        <>
            <PageTitle title={title} button={

                currentPage != "schedule" ? (<Button
                    size="small"
                    id="btnIdGetPatientAppt"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Schedule
                </Button>
                ) : ""
            } />
            {openDate ? <div style={{ position: "absolute", zIndex: 999999, left: "41.2%", right: "41%", top: "130px" }}><DateCalendar dateClick={dateClick} defaultValue={defaultDateView} isOpen={openDate} /></div> : ""}
            <Container maxWidth={false} className={(schedulerWidth ? 'filterShow' : 'filterHidden')}>
                {currentPage == 'app' ?
                    <Grid container>
                        <Appointment dataId={dataId} patientId={patientId} newAppDate={newAppDate} newAppDateTime={newAppDateTime} newAppSlotTime={newAppSlotTime} appPatientName={appPatientName} isEditable={isEditable} />
                    </Grid>
                    :

                    currentPage == 'appList' ?

                        <AppointmentsList isEditable={isEditable} />

                        :

                        <Grid container>
                            <Grid container className={classes.positionRelative}>
                                <div className="rbc-toolbar">
                                    <span className="rbc-btn-group header-group-btn">
                                        <button type="button" onClick={apptList}><img src={ListViewIcon} className={classes.listViewIcon} /> Appt. List</button>
                                        {/* <button type="button" ><img src={PrinterIcon} className={classes.printerIcon} /> Print</button> */}
                                        <ToggleButton
                                            value={schedulerWidth}
                                            selected={schedulerWidth}
                                            onChange={() => {
                                                setSchedulerWidth(!schedulerWidth);
                                            }}
                                            className={classes.toggleBtn}
                                        >
                                            {!schedulerWidth ? "Show Filter" : "Hide Filter "}
                                        </ToggleButton>
                                        <button type="button" className={classes.toggleBtn} onClick={addNew} title="+ Add New" disabled={!isEditable}>+ Add New</button>

                                    </span>
                                </div>
                                {tootipShowHide ? !tootipData.isBreak ? <>
                                    <span className="tooltipBox">
                                        <ul className="desc">
                                            <li className="headerTop" >
                                                <span className="headerTopLeftSide">
                                                    <Avatar src={tootipData.photoPath ? "." + tootipData.photoPath : "/static/media/profile-pic.7e2ec63d.jpg"} alt={tootipData.patientName} />
                                                </span>
                                                <span className="headerTopRightSide">
                                                    <span className="headerTopTitle">{tootipData.patientName}</span>
                                                    <span className="headerTopTitle">{ageReturn(tootipData.age)} | {tootipData.gender}</span>
                                                    <span className="headerTopTitle02">Last Visit:  {tootipData.lastVisit}</span>
                                                </span>
                                            </li>
                                            <li className="line"></li>
                                            <li>
                                                <span className="liTitle">Location:</span>
                                                <span className="liValue notesValue">{tootipData.locationName}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Provider:</span>
                                                <span className="liValue">{tootipData.provider}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Date:</span>
                                                <span className="liValue">{tootipData.dateTime}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Time:</span>
                                                <span className="liValue">{tootipData.appointmentTime}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Visit Reason:</span>
                                                <span className="liValue">{tootipData.reasonOfVisit}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Duration:</span>
                                                <span className="liValue">{tootipData.duration}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Status:</span>
                                                <span className="liValue">{tootipData.status}</span>
                                            </li>
                                            <li>
                                                <span className="liTitle">Exam Room:</span>
                                                <span className="liValue">{tootipData.room}</span>
                                            </li>
                                            <li className="notesli">
                                                <span className="liTitle">Notes:</span>
                                                <span className="liValue">{tootipData.notes}</span>{/* class name // notesValue */}
                                            </li>
                                            <li className="line"></li>
                                            <li>
                                                <span className="liTitle">Last Visit:</span>
                                                <span className="liValue">{tootipData.lastVisit}</span>
                                            </li>
                                        </ul>
                                    </span>
                                </> : "" : ""}

                                <div className="schedulerLeftSideFilter">
                                    {
                                        userInfo.isProvider && location ?
                                            <div className={classes.filterBox}>
                                                <div className={classes.filterHeader}>
                                                    <span className={classes.filterHeaderTitle}>Locations</span>
                                                    {/* <span className={classes.filterHeaderRight}>
                                                <span className={classes.filterSelectAll}>Select  all</span>
                                                <span>/</span>
                                                <span className={classes.filterNone}>None</span>
                                            </span> */}
                                                </div>
                                                <div className={classes.filterBody}>
                                                    <FormGroup>
                                                        {
                                                            location.map((item, i) => (
                                                                <FormControlLabel
                                                                    key={i}
                                                                    control={
                                                                        <Checkbox

                                                                            //checked={false}
                                                                            name={i.toString()}
                                                                            color="primary"
                                                                            onChange={handleChangeLocations}
                                                                            checked={location[i].isLocation}

                                                                        />
                                                                    }
                                                                    label={item.label}
                                                                />
                                                            ))
                                                        }

                                                    </FormGroup>
                                                </div>
                                            </div>
                                            : null
                                    }
                                    {
                                        !userInfo.isProvider && provider ?
                                            <div className={classes.filterBox}>
                                                <div className={classes.filterHeader}>
                                                    <span className={classes.filterHeaderTitle}>Providers</span>
                                                    {/* <span className={classes.filterHeaderRight}>
                                                        <span className={classes.filterSelectAll}>Select  all</span>
                                                        <span>/</span>
                                                        <span className={classes.filterNone}>None</span>
                                                    </span> */}
                                                </div>
                                                <div className={classes.filterBody}>
                                                    <FormGroup>
                                                        {
                                                            provider ?
                                                                provider.map((item, i) => (
                                                                    <FormControlLabel
                                                                        key={i}
                                                                        control={
                                                                            <Checkbox
                                                                                // checked={false}
                                                                                name={i.toString()}
                                                                                color="primary"
                                                                                onChange={handleChangeProviders}
                                                                                checked={provider[i].isProvider}

                                                                            />
                                                                        }
                                                                        label={item.label}
                                                                    />
                                                                ))
                                                                : null
                                                        }
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            : null
                                    }
                                    {/* <CalendarDate dateClick={dateClick} defaultValue={defaultDateView} /> */}
                                </div>

                            </Grid>
                            {
                                calendarShowHide ?

                                    (() => {
                                        switch (viewChanging) {
                                            case "doctor":
                                                return (

                                                    <span className="fulWidth">
                                                        <DnDCalendar
                                                            resizable
                                                            selectable
                                                            popup
                                                            defaultDate={defaultDateView}
                                                            date={defaultDateView}
                                                            onNavigate={(date, view) => {
                                                                onDateClick(date, view);
                                                                // console.log('#### date=', date, action);
                                                            }}
                                                            onView={(view) => {
                                                                onViewClick(view)
                                                                //console.log('#### view', view);
                                                            }}

                                                            defaultView={'day'}
                                                            events={schedulerDoctor}
                                                            localizer={localizer}
                                                            onEventDrop={onEventDrop}
                                                            onEventResize={onEventResize}
                                                            eventPropGetter={(eventStyleGetter)}
                                                            // onDragStart={console.log}
                                                            onSelectEvent={appoinetView}
                                                            onSelectSlot={handleSelect}
                                                            style={{ minHeight: "750px", maxHeight: "800px", overflow: "auto" }}
                                                            step={7.5}
                                                            //timeslots={1}
                                                            components={{
                                                                timeSlotWrapper: ColoredDateCellWrapper,
                                                                toolbar: CustomToolbar,
                                                                event: EventTest,
                                                            }}
                                                            isAllDay={true}
                                                            allDayAccessor='allDay'
                                                            titleAccessor='title'
                                                            tooltipAccessor={null}//'desc'
                                                            messages={{
                                                                showMore: total => `+${total} more appointments`,
                                                            }}
                                                            dayLayoutAlgorithm='no-overlap'
                                                            dayPropGetter={customDayPropGetter}
                                                            slotPropGetter={customSlotPropGetter}
                                                            resources={doctorGroup}
                                                            resourceIdAccessor="resourceId"
                                                            resourceTitleAccessor="resourceTitle"

                                                        />
                                                    </ span >

                                                )
                                            case "room":
                                                return (


                                                    <>
                                                        <div className="fulWidth">
                                                            <DnDCalendar
                                                                resizable
                                                                selectable
                                                                popup
                                                                defaultDate={defaultDateView}
                                                                date={defaultDateView}
                                                                onNavigate={(date, view) => {
                                                                    onDateClick(date, view);
                                                                    // console.log('#### date=', date, action);
                                                                }}
                                                                onView={(view) => {
                                                                    onViewClick(view)
                                                                    //console.log('#### view', view);
                                                                }}
                                                                defaultView={'day'}
                                                                events={schedulerEvent}
                                                                localizer={localizer}
                                                                onEventDrop={onEventDrop}
                                                                onEventResize={onEventResize}
                                                                eventPropGetter={(eventStyleGetter)}
                                                                //onDragStart={console.log}
                                                                onSelectEvent={appoinetView}
                                                                style={{ minHeight: "750px", maxHeight: "800px", overflow: "auto" }}
                                                                onSelectSlot={handleSelect}
                                                                step={7.5}
                                                                // timeslots={1}
                                                                components={{
                                                                    timeSlotWrapper: ColoredDateCellWrapper,
                                                                    toolbar: CustomToolbar,
                                                                    event: EventTest,
                                                                }}
                                                                isAllDay={true}
                                                                allDayAccessor='allDay'
                                                                titleAccessor='title'
                                                                tooltipAccessor={null}//'desc'
                                                                messages={{
                                                                    showMore: total => `+${total} more appointments`,
                                                                }}
                                                                dayLayoutAlgorithm='no-overlap'
                                                                dayPropGetter={customDayPropGetter}
                                                                slotPropGetter={customSlotPropGetter}
                                                                resources={groupRooms}
                                                                resourceIdAccessor="resourceId"
                                                                resourceTitleAccessor="resourceTitle"


                                                            />

                                                        </div>
                                                    </ >


                                                )
                                            case "simple":
                                                return (

                                                    <div className="fulWidth">
                                                        <DnDCalendar
                                                            resizable
                                                            selectable
                                                            popup
                                                            defaultDate={defaultDateView}
                                                            date={defaultDateView}
                                                            onNavigate={(date, view) => {
                                                                onDateClick(date, view);
                                                                // console.log('#### date=', date, action);
                                                            }}
                                                            onView={(view) => {
                                                                onViewClick(view)
                                                                //console.log('#### view', view);
                                                            }}
                                                            defaultView={dView}
                                                            events={schedulerEvent}
                                                            localizer={localizer}
                                                            onEventDrop={onEventDrop}
                                                            onEventResize={onEventResize}
                                                            eventPropGetter={(eventStyleGetter)}
                                                            //onDragStart={console.log}
                                                            style={{ minHeight: "750px", maxHeight: "800px", overflow: "auto" }}
                                                            onSelectEvent={appoinetView}
                                                            onSelectSlot={handleSelect}
                                                            step={7.5}
                                                            //timeslots= {1}
                                                            components={{
                                                                timeSlotWrapper: ColoredDateCellWrapper,
                                                                toolbar: CustomToolbar,
                                                                event: EventTest,
                                                                // day: { header: MyCustomHeader },
                                                                // week: { header: MyCustomHeader },
                                                                // month: { header: MyCustomHeader },
                                                                // agenda: {
                                                                //     event: EventAgenda
                                                                //   }

                                                            }}
                                                            isAllDay={false}
                                                            allDayAccessor='allDay'
                                                            titleAccessor='title'
                                                            tooltipAccessor={null}//'desc'
                                                            messages={{
                                                                showMore: total => `+${total} more appointments`,
                                                            }}
                                                            dayLayoutAlgorithm='no-overlap'
                                                            dayPropGetter={customDayPropGetter}
                                                            slotPropGetter={customSlotPropGetter}
                                                        // resources=""
                                                        // resourceIdAccessor=""
                                                        // resourceTitleAccessor=""
                                                        //scrollToTime= {moment().set({ h: 10, m: 0 }).toDate()}

                                                        // slotPropGetter={customSlotPropGetter}
                                                        // step= {30}
                                                        // length={8}
                                                        // timeslots= {2}
                                                        // min= {'2021'}
                                                        // max= {schedulerEvent.endOf(new Date(), 'day')}
                                                        // scrollToTime= {schedulerEvent.startOf(new Date(), 'day')}
                                                        //timeslots={35}
                                                        // onDoubleClickEvent={eventClicked}
                                                        // rtl={true}
                                                        // showMultiDayTimes={true}
                                                        // views={['day', 'week', 'month', 'agenda', 'work_week']}
                                                        // views={{ day: true,week: true, month: true,}}

                                                        />
                                                    </ div>

                                                )
                                        }
                                    })()

                                    : <>
                                        <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={30} width="100%" style={{ marginBottom: 10 }} />
                                        <Skeleton className={classes.bgColor} height={660} animation="wave" variant="rect" width="100%"></Skeleton>
                                    </ >
                            }


                        </Grid>
                }

            </Container>
        </>
    );
    function onEventRendered(args) {
        let categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }

        args.element.style.backgroundColor = categoryColor;
    }
}

export default withSnackbar(Schedule)
