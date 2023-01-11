import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Grid, Drawer, IconButton, List
} from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon,
    ChatBubbleOutline as MessageOutline,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { GetUserRolesRights } from '../../Services/GetUserRolesRights';

import { FormBtn, DraggableComponent, FormGroupTitle } from "./../UiElements";
import { useHistory } from "react-router-dom";

import { Scrollbars } from "rc-scrollbars";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

import { useUserDispatch, signOut } from "../../context/UserContext";

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";
import { GetUserInfo } from '../../Services/GetUserInfo';
import { PostDataAPI } from '../../Services/PostDataAPI';
// Icons
import Dashboard from "../../images/icons/dashboard.png";
import Reports from "../../images/icons/reportsIcon.png"
import Schedule from "../../images/icons/Schedule.png";
import Clinical from "../../images/icons/Clinical.png";
import Billing from "../../images/icons/Billing.png";
import Task from "../../images/icons/task.png";
import Setup from "../../images/icons/Setup.png";
import Help from "../../images/icons/Help.png";
import Patients from "../../images/icons/Patient5.png";
import FinancialreportIcon from "../../images/icons/financial_report_icon.svg";
import ClinicalReportsicon from "../../images/icons/Clinical_Reports_icon.svg";
import mixedRepors from "../../images/icons/mixed_repors.svg";




import CloseIcon from "../../images/icons/math-plus.png";


// import Payments from "../../images/icons/payments.png";
// import ClaimTracker from "../../images/icons/claimTracker.png";
// import ERAReview from "../../images/icons/erareview.png";

import Payments from "../../images/icons/paymentsIcon.png";
import ClaimTracker from "../../images/icons/claimIcon.png";
import ERAReview from "../../images/icons/eraReviewIcon.png";
import StatementIcon from "../../images/icons/statementIcon.png";
import SettingsIcon from "../../images/icons/settingsIconLeft.png";
import PatientLedger from "../../pages/reports/patientLedger/PatientLedger";
import InfoIcon from "../../images/icons/info.svg"

function Sidebar({ location, updatMessage }) {


    var classes = useStyles();
    var theme = useTheme();

    let history = useHistory();
    var userDispatch = useUserDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [indexNumber, setIndexNumber] = useState(0);

    const NotificationDialogOpen = () => {
        setModalIsOpen(true)
    }

    const NotificationDialogClose = () => {
        setModalIsOpen(false)
    }


    const Activatelogout = () => {

    }

    const newStructure = [
        //{
        //    id: parseInt(1),
        //    label: 'Reports',
        //    link: "/app/" + 'Reports'.toLowerCase(),
        //    icon: <img src={Dashboard} alt='icon' />,
        //    children: [
        //        //{ label: "Billing Summary", link: "/app/" + 'BillingSummary'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Procedures", link: "/app/" + 'Procedures'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Remittance", link: "/app/" + 'RemittanceReports'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Under paid item", link: "/app/" + 'UnderpaidItemReports'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Day Sheet", link: "/app/" + 'FinancialReports'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Transactions", link: "/app/" + 'TransactionReports'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Account Receivable", link: "/app/" + 'AccountReceivableReports'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Authorization", link: "/app/" + 'AuthorizationReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Medication", link: "/app/" + 'MedicationReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Diagnosis", link: "/app/" + 'DiagnosisReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Allergy", link: "/app/" + 'AllergyReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Drug Interaction", link: "/app/" + 'DrugInterationReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Patient", link: "/app/" + 'PatientReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //        { label: "Balance Ledger", link: "/app/" + 'PatientLedgerReport'.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
        //    ],
        //},
    ];


    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null) {
        user_role_rights_list.map((objright) => {
            if (objright.parentRightId == 0 && objright.permissionCode > 0) {
                // console.log(objright.rightName)
                switch (objright.rightName) {
                    case 'Reports': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: 'Reports',
                                icon: <img src={Reports} alt='icon' />,
                                children: [
                                    {
                                        label: "Financial Reports", icon: <img src={FinancialreportIcon} alt='icon' />, subMenu: []
                                    },
                                    {
                                        label: "Clinical Reports", icon: <img src={ClinicalReportsicon} alt='icon' />, subMenu: []
                                    },
                                    { label: "Other Reports", icon: <img src={mixedRepors} alt='icon' />, subMenu: [] }
                                ],


                            });
                        }
                        break;
                    }
                    case 'Dashboard': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Dashboard} alt='icon' />,
                            });
                        }
                        break;
                    }
                    case 'Schedule': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Schedule} alt='icon' />,

                            });
                        }
                        break;
                    }
                    case 'Clinical': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Clinical} alt='icon' />,

                            });
                        }
                        break;
                    }
                    case 'Tasks': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Task} alt='icon' />,

                            });
                        }
                        break;
                    }
                    case 'Billing': {

                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Billing} alt='icon' />,
                                children: [
                                    { label: "Billing Dashboard", link: "/app/billingdashboard", icon: <img src={ClaimTracker} alt='icon' /> },
                                    { label: "Claims", link: "/app/" + objright.rightName.toLowerCase(), icon: <img src={ClaimTracker} alt='icon' /> },
                                    { label: "Payments", link: "/app/payment", icon: <img src={Payments} alt='icon' /> },
                                    { label: "ERA Review", link: "/app/erareview", icon: <img src={ERAReview} alt='icon' /> },
                                    { label: "Statement", link: "/app/patientstatement", icon: <img src={StatementIcon} alt='icon' /> },
                                    { label: "Settings", link: "/app/patientstatementsettings", icon: <img src={SettingsIcon} alt='icon' /> }
                                ],
                            });
                        }
                        break;
                    }
                    case 'Patients': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Patients} alt='icon' />,

                            });
                        }
                        break;
                    }
                    case 'Setup': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Setup} alt='icon' />,

                            });
                        }
                        break;
                    }
                    case 'Messages': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <MessageOutline />,
                                BadgeValue: indexNumber
                            });
                        }
                        break;
                    }
                    // case 'Help': {
                    //     if (newStructure.label != objright.rightName) {
                    //         newStructure.push({
                    //             id: parseInt(objright.rightId),
                    //             label: objright.rightName,
                    //             link: '.\Documents\EHR_User_Manual_R.pdf',
                    //             icon: <img src={Help} alt='icon' />,

                    //         });
                    //     }
                    //     break;
                    // }
                    case 'BillingSummary': {
                        if (newStructure.label != objright.rightName) {
                            newStructure.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightName,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={Help} alt='icon' />,

                            });
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        });
        user_role_rights_list.map((objright) => {
            if (objright.parentRightId > 0 && objright.permissionCode > 0) {
                if (newStructure.label != objright.rightName) {

                    var headerTab = newStructure.filter(tab => tab.id == parseInt(objright.parentRightId));
                    if (headerTab != null && headerTab.length > 0 && headerTab[0].label == 'Reports') {
                        if (objright.category == 'financial_reports') {
                            headerTab[0].children[0].subMenu.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightLabel,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={ClaimTracker} alt='icon' />,

                            });
                        } else if (objright.category == 'clinical_reports') {
                            headerTab[0].children[1].subMenu.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightLabel,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={ClaimTracker} alt='icon' />,

                            });
                        } else if (objright.category == 'other_reports') {
                            headerTab[0].children[2].subMenu.push({
                                id: parseInt(objright.rightId),
                                label: objright.rightLabel,
                                link: "/app/" + objright.rightName.toLowerCase(),
                                icon: <img src={ClaimTracker} alt='icon' />,

                            });
                        }

                    }

                }
            }
        });
    }

    // global
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(() => {
        //getUnreadMessageCount();
        getInstantData();
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    }, [updatMessage]);
    const getUnreadMessageCount = () => {
        var params = {
            code: "get_unread_message_count",
            parameters: [userInfo.userID.toString()]
        }
        PostDataAPI("ddl/loadItems", params, false, '', false).then((result) => {
            if (result.success && result.data != null) {
                setIndexNumber(result.data[0].text1);
            }
            setTimeout(getUnreadMessageCount, 30000);
        });
    }
    const getInstantData = () => {
        var params = {
            code: "get_instant_data",
            parameters: [userInfo.userID.toString()]
        }
        PostDataAPI("ddl/loadItems", params, false, '', false).then((result) => {
            if (result.success && result.data != null) {
                setIndexNumber(result.data[0].text1);
                if (result.data[0].id != null && userInfo.currentStatus == 1 && result.data[0].id != 1) {

                    console.log("Emergency session turn off by administrator.");
                    setModalIsOpen(true)
                }
                setTimeout(getInstantData, 30000);
            }

        });
    }
    return (
        <>
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
                <div className={isSidebarOpened ? classes.list : classes.CloseMenuList}>
                    <Scrollbars autoHide style={{ height: "-webkit-fill-available" }} >
                        <List className={classes.sidebarList}>
                            {newStructure.map(link => (
                                <SidebarLink
                                    key={link.id}
                                    location={location}
                                    isSidebarOpened={isSidebarOpened}
                                    {...link}
                                />
                            ))}

                            <div className={classes.help}>
                               
                                <a href="./Documents/EHR_User_Manual.pdf" target="_blank"> <img src={Help} alt='icon' /> Help</a>
                            </div>

                        </List>
                    </Scrollbars>
                </div>

            </Drawer>

            <Dialog
                disableEscapeKeyDown
                open={modalIsOpen}
                classes={{ paper: classes.dialogPaper }}
                onClose={NotificationDialogClose}
                PaperComponent={DraggableComponent}
            >
                <div className={classes.allowAccessContent}>
                    <div className={classes.box}>
                        {/* <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Deactivating Emergency Access Mode</FormGroupTitle>
                        </div> */}
                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" lg={12}>
                            <img src={InfoIcon} className={classes.infoIcon} />
                        </Grid>
                        <Grid container direction="row" lg={12}>
                            <p className={classes.paragraf}>Your emergency access has been de-activated.</p>

                        </Grid>

                        <Grid container direction="row" lg={12}>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "right" }}>
                                <FormBtn id="noIcon" onClick={() => signOut(userDispatch, history)}>Ok</FormBtn>
                            </Grid>

                        </Grid>
                    </div>

                </div>



            </Dialog>
        </>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            //setPermanent(false);
            if (isSidebarOpened) {
                toggleSidebar(layoutDispatch);
            }
        } else if (!isSmallScreen && !isPermanent) {
            // setPermanent(true);

        }

    }
}

export default withRouter(Sidebar);
