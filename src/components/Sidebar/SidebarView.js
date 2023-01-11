import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
    Home as HomeIcon,
    ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";


// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

// Icons
import DashboardIcon from "../../images/icons/dashboard.png";
import Icon2 from "../../images/icons/2.png";
import Icon3 from "../../images/icons/3.png";
import Icon4 from "../../images/icons/4.png";
import Icon5 from "../../images/icons/5.png";
import Icon6 from "../../images/icons/6.png";
import Icon7 from "../../images/icons/7.png";

const structure = [
    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <img src={DashboardIcon} alt='icon' /> },
    {
        id: 1,
        label: "Schedule",
        link: "/app/schedule",
        icon: <img src={Icon2} alt='icon' />,
    },
    { id: 2, label: "Clinical", link: "/app/clinical", icon: <img src={Icon3} alt='icon' /> },
    {
        id: 3,
        label: "Billing",
        link: "/app/addclaimwithoutencounter",
        icon: <img src={Icon4} alt='icon' />,
    },
    {
        id: 4,
        label: "Patients",
        link: "/app/patients",
        icon: <img src={Icon5} alt='icon' />,
    },
    { id: 5, label: "Setup", link: "/app/accountSetup", icon: <img src={Icon6} alt='icon' /> },
    { id: 6, label: "Help", link: "/app/help", icon: <img src={Icon7} alt='icon' /> },
    { id: 7, label: "Tasks", link: "/app/tasks", icon: <img src={Icon7} alt='icon' /> },
  
];

function Sidebar({ location }) {
    var classes = useStyles();
    var theme = useTheme();

    // global
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Sidebar);
