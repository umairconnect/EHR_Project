import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Divider,
    Grid,
    Tooltip,
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    PersonOutline as AccountIcon,
    Search as SearchIcon,
    Send as SendIcon,
    ChatBubbleOutline as MessageOutline,
    LocationOnOutlined as LocationOnOutlinedIcon,
    KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon,
    LockOpen as ChangePasswordIcon,
    ExitToApp as SignOuticon
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

// context
import { useUserDispatch, signOut, changePassword, useUserState } from "../../context/UserContext";
import logo from "../../images/logo.png";
import Dp from "../../images/dp.png";
import DummyPic from "../../images/dummy-profile-pic.png";
import ProfilePic from "../../images/profile-pic.jpg";
import BellIcon from "../../images/icons/Notification.png";
import TaskIcon from "../../images/icons/task-old.png";
import LogoutIcon from "../../images/icons/logout.png";
import TaskListIcon from "../../images/icons/task-list-icon.png";
import NotificationListIcon from "../../images/icons/notification-list-icon.png";
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import DangerIcon from "../../images/icons/danger.svg";
import rightArrow from "../../images/icons/leftArrow.png";
import MenuOpen from "../../images/icons/MenuOpen.svg";
import MenuClose from "../../images/icons/MenuClose.svg";
import { PostDataAPI } from '../../Services/PostDataAPI';
//Redux
import { connect } from 'react-redux';

const location = [
    {
        id: 0,
        color: "#11284b",
        type: "locationIcon",
        message: "East Mantee Health and Wellness Center"
    },
    {
        id: 1,
        color: "#11284b",
        type: "locationIcon",
        message: "Family Wellness Center ...",
    },
];
const notifications = [
    {
        id: 0,
        name: "Appointment Reminder",
        appointmentTime: "10:00 am",
        time: "30mins",
        dateTime: "2 mins ago",
        patientName: "Ashton Cox - General Checkup",
    },
    {
        id: 1,
        name: "Appointment Reminder",
        appointmentTime: "11:00 am",
        time: "30mins",
        dateTime: "10 mins ago",
        patientName: "Airi Satou -Chiropractic",
    },
    {
        id: 2,
        name: "Appointment Reminder",
        appointmentTime: "12:00 am",
        time: "30mins",
        dateTime: "20 mins ago",
        patientName: "Sarah Smith - Cosmetology",
    },

];

function Header(props) {


    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;
    const [notificationAppointments, setNotificationAppointments] = useState([]);
    const [messages, setMessages] = useState([]);

    var locationlist = JSON.parse(user).userLocations;

    let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);

    //const primaryLocation = locationlist.map((loc) => {
    //    if (loc.Text2 == "True" || loc.Text2 == true)
    //        return loc.text1;
    //});

    var classes = useStyles();
    var layoutState = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [mailMenu, setMailMenu] = useState(null);
    var [isMailsUnread, setIsMailsUnread] = useState(true);
    var [notificationsMenu, setNotificationsMenu] = useState(null);
    var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
    var [locationMenu, setLocationMenu] = useState(null);
    var [profileMenu, setProfileMenu] = useState(null);
    var [isSearchOpen, setSearchOpen] = useState(false);

    var [toggleOnOff, setToggleOnOff] = useState(true);

    const toggleMenu = () => {
        toggleSidebar(layoutDispatch)

        if (toggleOnOff == false) {
            setToggleOnOff(true)
        } else {
            setToggleOnOff(false)
        }
    }

    const getTasksNotifications = () => {
        var params = {
            code: "get_notification_tasks",
            parameters: [userdata.userID.toString() + ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setMessages(result.data);
            }
        })
    }

    const getUpcommingAppointments = () => {
        let params = {
            "loggedinUserId": userdata.userID.toString() + "",
            "date": ''
        }
        PostDataAPI("appointment/loadPatientUpcommingAppointment", params).then((result) => {
            if (result.success && result.data != null) {
                setNotificationAppointments(result.data);
            }
        })
    }

    const goToMyTasks = () => {
    

        props.history.push({
          pathname: '/app/tasks',
          state: {
            myTasks: true,
          }
        });
    
    
        }

    useEffect(() => {
        //getInstantData();
        getUpcommingAppointments();
        getTasksNotifications();
    }, []);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" weight="medium" className={classes.logotype}>
                    <Link to="/"> <img src={logo} alt="MCR Health logo" className={classes.logotypeImage} /></Link>
                </Typography>
                <IconButton
                    color="inherit"
                    size="small"
                    onClick={toggleMenu}
                    className={classNames(
                        classes.headerMenuButtonSandwich,
                        classes.headerMenuButtonCollapse,
                    )}
                >

                    {toggleOnOff ?
                        <img width="20px" src={MenuClose} classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                        />
                        :
                        <img width="20px" src={MenuOpen} classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                        />

                    }

                </IconButton>
                <div className={classes.grow} >
                    <Grid container spacing={1} alignItems="center">

                        <Grid item sm={7} md={7}>
                            <div style={{ alignItems: "center", display: "flex" }}>
                                {userdata.accessId ?
                                    (userdata.currentStatus == 1 ? <><img src={DangerIcon} /> &nbsp; <b style={{ color: "#FD5F5F", paddingRight: "20px" }}>Emergency Access Activated</b></> : '') : ''}

                                {props.progressBarState ?
                                    <img className={classes.loader} src={LoadingIcon} alt="Loading..." />
                                    : ''}
                            </div>
                        </Grid>
                        <Grid item sm={2} md={2} className={classes.centerLine}>

                        </Grid>
                        <Grid item sm={3} md={3}>

                            <div className={classes.userBox}>
                                <img
                                    src={userdata != null && userdata.photoPath != null ? "." + userdata.photoPath : ProfilePic}
                                    alt="User DP"
                                    className={classes.userDp}
                                    onError={(e) => (e.target.onerror = null, e.target.src = ProfilePic)}
                                />
                                <div className={classes.userProfile}>
                                    <div className={classes.user}>
                                        <span className={classes.userName}>
                                            {userdata != null ? userdata.firstName + (userdata.middleName && userdata.middleName.length > 0 ? ' ' + userdata.middleName + ' ' : ' ') + userdata.lastName : "Melvin B. Price Static"}
                                        </span>
                                        <span
                                            className={classes.userDetails}
                                        >
                                            {userdata.isProvider ? userdata.specializationName : userdata.roleName}

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        {/* <Grid item sm={3} md={3} className={classes.centerLine}>
                            <IconButton
                                color="inherit"
                                aria-haspopup="true"
                                aria-controls="mail-menu"
                                // onClick={e => {
                                //     setLocationMenu(e.currentTarget);
                                // }}
                                className={classes.locationMenuButton}
                            >
                                <span className={classes.locationButton}>
                                    <LocationOnOutlinedIcon className={classes.locationIcon} />
                                    <span className={classes.locationText}> {primaryLocation.length > 0 ? primaryLocation[0].text1 : "East Mantee Health and Wellness Center"} </span>
                                    <KeyboardArrowDownOutlinedIcon className={classes.downArrowIcon} />
                                </span>
                            </IconButton>
                        </Grid> */}
                    </Grid>


                </div>

                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    aria-controls="mail-menu"
                    onClick={e => {
                        setNotificationsMenu(e.currentTarget);
                        setIsNotificationsUnread(false);
                    }}
                    className={classes.headerMenuButton}>
                    <Badge
                        badgeContent={isNotificationsUnread ? notificationAppointments.length : null}
                        color="warning">
                        <Tooltip title="Notifications">
                            <img src={BellIcon} alt="Notification" className={classes.notIcon} />
                        </Tooltip>
                    </Badge>
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    aria-controls="mail-menu"
                    onClick={e => {
                        setMailMenu(e.currentTarget);
                        setIsMailsUnread(false);
                    }}
                    className={classes.headerMenuButton}
                >
                    <Badge
                        badgeContent={isMailsUnread ? messages.length : null}
                        color="secondary"
                    > <Tooltip title="Pending Tasks">
                            <img src={TaskIcon} alt="Task" className={classes.TaskIcon} />
                        </Tooltip>
                    </Badge>
                </IconButton>
                <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuButton}
                    aria-controls="profile-menu"
                    onClick={e => setProfileMenu(e.currentTarget)}
                >
                    <Tooltip title="Sign Out">
                        <img src={LogoutIcon} alt="Logout" className={classes.LogoutIcon} />
                    </Tooltip>
                </IconButton>
                <Menu
                    id="location-menu"
                    open={Boolean(locationMenu)}
                    anchorEl={locationMenu}
                    onClose={() => setLocationMenu(null)}
                    className={classes.headerMenu}
                    classes={{ paper: classes.locationMenuOptions }}
                    disableAutoFocusItem
                >
                    {locationlist.map((location, i) => (
                        <div key={i} className={classes.locationMenuOptions}>
                            <LocationOnOutlinedIcon className={classes.MenulocationIcon} />
                            <MenuItem
                                key={location.id}
                                onClick={() => setLocationMenu(null)}
                                className={classes.headerMenuItem}
                            >
                                {/*<Notification {...locationlist} typographyVariant="inherit" /> */}
                                {location.text1}
                            </MenuItem>
                        </div>
                    ))}
                </Menu>
                <Menu
                    id="mail-menu"
                    open={Boolean(mailMenu)}
                    anchorEl={mailMenu}
                    onClose={() => setMailMenu(null)}
                    MenuListProps={{ className: classes.headerMenuList }}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.taskMenu}>
                        <Typography weight="bold" className={classes.taskListTitle}>
                            Pending Tasks
                            <span
                                className={classes.messageLength}
                            >{messages.length}</span>
                        </Typography>
                    </div>
                    {messages.slice(0, 3).map(message => (
                        <MenuItem key={message.id} className={classes.messageNotification}>
                            <div className={classes.messageNotificationSide}>
                                <span className={classes.tIconBg}>
                                    <img src={TaskListIcon} alt="Task" className={classes.TaskIcon} />
                                </span>
                            </div>
                            <div
                                className={classNames(
                                    classes.messageNotificationSide,
                                    classes.messageNotificationBodySide,
                                )}
                            >
                                <Typography size="sm" weight="medium" className={classes.textColor} gutterBottom>
                                    {message.text1}
                                </Typography>
                                <Typography size="sm" color="text" colorBrightness="secondary">
                                    {message.text3}
                                </Typography>
                            </div>
                        </MenuItem>
                    ))}


                    <Link className={classes.noticeViewAll} onClick={goToMyTasks}> View All</Link>

                </Menu>
                <Menu
                    id="notifications-menu"
                    open={Boolean(notificationsMenu)}
                    anchorEl={notificationsMenu}
                    onClose={() => setNotificationsMenu(null)}
                    MenuListProps={{ className: classes.headerMenuList }}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.taskMenu}>
                        <Typography weight="bold" className={classes.taskListTitle}>
                            Notifications
                            {
                                notificationAppointments.length > 0 ?

                                    <span
                                        className={classes.messageLength}
                                    >
                                        {notificationAppointments.length}
                                    </span>
                                    : ''
                            }
                        </Typography>
                    </div>
                    {notificationAppointments.slice(0, 3).map(notification => (
                        <MenuItem
                            key={notification.id}
                            onClick={() => setNotificationsMenu(null)}
                            className={classes.headerMenuItem} >

                            <div className={classes.messageNotificationSide}>
                                <span className={classes.iconBg}>
                                    <img src={NotificationListIcon} alt="Notification Icon" className={classes.notIcon} />
                                </span>
                            </div>
                            <div
                                className={classNames(
                                    classes.messageNotificationSide,
                                    classes.messageNotificationBodySide,
                                )}
                            >
                                <Typography size="sm" color="text" colorBrightness="primary">{notification.patientName}</Typography>
                                <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>

                                    <Typography size="sm" color="text" colorBrightness="secondary">
                                        {notification.appointmentTime}
                                    </Typography>
                                    <Typography size="sm" color="text" colorBrightness="secondary">
                                        {notification.dateTime}
                                    </Typography>
                                </div>
                            </div>
                        </MenuItem>
                    ))}

                    {
                        notificationAppointments.length > 0 ?
                            <Link className={classes.noticeViewAll} to={{
                                pathname: '/app/schedule',
                                search: '',
                                state: "newList",
                            }}> View All</Link> 
                            : <p className={classes.noNotice}>No notification found</p>
                    }


                </Menu>
                <Menu
                    id="profile-menu"
                    open={Boolean(profileMenu)}
                    anchorEl={profileMenu}
                    onClose={() => setProfileMenu(null)}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            {userdata != null ? userdata.firstName + " " + userdata.lastName : "Melvin B. Price Static"}
                        </Typography>

                    </div>
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >

                        <Link className={classes.profileMenuItem} to="/app/updateprofile" onClick={() => setProfileMenu(null)}><AccountIcon className={classes.profileMenuIcon} /> Profile</Link>
                    </MenuItem>
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >
                        <Link className={classes.profileMenuItem} to="/app/changePassword" onClick={() => setProfileMenu(null)}><ChangePasswordIcon className={classes.profileMenuIcon} /> Change Password</Link>
                    </MenuItem>
                    {/* <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >

                        <Link className={classes.profileMenuItem} to="/app/messages" onClick={() => setProfileMenu(null)}><MessageOutline className={classes.profileMenuIcon} /> Messages</Link>
                    </MenuItem> */}
                    <Divider />
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                        dense
                        onClick={() => signOut(userDispatch, props.history)}
                    >
                        <SignOuticon className={classes.profileMenuIcon} /> Sign Out
                    </MenuItem>

                </Menu>
            </Toolbar>
        </AppBar>
    );
}
const mapStateToProps = state => {
    return { progressBarState: state };
};
export default connect(mapStateToProps,
    // { selectState }
)(Header);