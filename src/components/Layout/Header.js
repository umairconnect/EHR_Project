import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Grid
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon,
  SpaRounded
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
import { useUserDispatch, signOut } from "../../context/UserContext";
import logo from "../../images/logo.png";
import Dp from "../../images/dp.png";
import BellIcon from "../../images/icons/Notification.png";
import TaskIcon from "../../images/icons/task.png";
import LogoutIcon from "../../images/icons/logout.png";
import TaskListIcon from "../../images/icons/task-list-icon.png";
import NotificationListIcon from "../../images/icons/notification-list-icon.png";

const messages = [
  {
    id: 0,
    name: "Pending Appointment Requests",
    message: "3 Appointment Requests",
  },
  {
    id: 1,
    name: "Medical Reports need Attention",
    message: "5 Medical Reports",
  },
  {
    id: 2,
    name: "Medicine Request Approval Pending",
    message: "2 Medicine Requsts",
  },

];
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
    dateTime: "2 mins ago"
  },
  {
    id: 1,
    name: "Appointment Reminder",
    appointmentTime: "11:00 am",
    time: "30mins",
    dateTime: "10 mins ago"
  },
  {
    id: 2,
    name: "Appointment Reminder",
    appointmentTime: "12:00 am",
    time: "30mins",
    dateTime: "20 mins ago"
  },

];

export default function Header(props) {
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

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          <img src={logo} alt="MCR Health logo" className={classes.logotypeImage} />
        </Typography>
        <IconButton
          color="inherit"
          size="small"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          <MenuIcon
            classes={{
              root: classNames(
                classes.headerIcon,
                classes.headerIconCollapse,
              ),
            }}
          />

        </IconButton>
        <div className={classes.grow} >
          <Grid container spacing={1}>
            <Grid item md={6}>
              {/* <div
                className={classNames(classes.search, {
                  [classes.searchFocused]: isSearchOpen,
                })}
              >
                <div
                  className={classNames(classes.searchIcon, {
                    [classes.searchIconOpened]: isSearchOpen,
                  })}
                  onClick={() => setSearchOpen(!isSearchOpen)}
                >
                  <SearchIcon classes={{ root: classes.headerIcon }} />
                </div>
                <InputBase
                  placeholder="Search Appointment/Patients"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div> */}
            </Grid>
            <Grid item md={3}>
              <div className={classes.userBox}>
                <img src={Dp} alt="User DP" className={classes.userDp} />
                <div className={classes.userProfile}>
                  <div className={classes.user}>
                    <span className={classes.userName}>
                      Melvin B. Price
                    </span>
                    <span
                      className={classes.userDetails}
                    >
                      Podiartry Services
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={3} className={classes.centerLine}>
              <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                onClick={e => {
                  setLocationMenu(e.currentTarget);

                }}
                className={classes.locationMenuButton}
              >
                <span className={classes.locationButton}>
                  <LocationOnOutlinedIcon className={classes.locationIcon} />
                  <span className={classes.locationText}> East Mantee Health and Wellness Center</span>
                  <KeyboardArrowDownOutlinedIcon className={classes.downArrowIcon} />
                </span>
              </IconButton>
            </Grid>
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
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <img src={BellIcon} alt="Notification" className={classes.notIcon} />
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
          >
            <img src={TaskIcon} alt="Task" className={classes.TaskIcon} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <img src={LogoutIcon} alt="Logout" className={classes.LogoutIcon} />
        </IconButton>
        <Menu
          id="location-menu"
          open={Boolean(locationMenu)}
          anchorEl={locationMenu}
          onClose={() => setLocationMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {location.map(location => (
            <MenuItem
              key={location.id}
              onClick={() => setLocationMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...location} typographyVariant="inherit" />
            </MenuItem>
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
          {messages.map(message => (
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
                  {message.name}
                </Typography>
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
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
              <span
                className={classes.messageLength}
              >{messages.length}</span>
            </Typography>
          </div>
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >

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
                <Typography size="sm" weight="medium" className={classes.textColor} gutterBottom >
                  {notification.name}
                </Typography>
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {notification.appointmentTime} -  {notification.time}
                </Typography>
              </div>
              <div>
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {notification.dateTime}
                </Typography>
              </div>
            </MenuItem>
          ))}
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
              Melvin B. Price
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://mcr.health/"
            >
              mcr.health
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
