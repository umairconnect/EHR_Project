import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useStyles from "./styles";
import { Tab, Tabs, AppBar, Box } from '@material-ui/core';
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../../context/LayoutContext";

import PatientInfo from './patientInfo/PatientInfo';
import Demographics from './demographics/Demographics';
import ClinicalDashboard from './clinical/ClinicalDashboard';
import Immunization from './immunizations/Immunizations'
import Medication from './medication/Medication'
import Allergies from './allergies/Allergies'
import Diagnosis from './diagnosis/Diagnosis'
import Documents from './documents/Documents'
import LabOrders from './labOrders/LabOrders'
import Appointments from './appointments/Appointments'
import ImplantableDevices from './implantableDevices/ImplantableDevices'
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../Services/GetUserInfo';
//import Documents from './documents/Documents'
import Profile from "./Profile/Profile";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function PatientDetails(props) {

    var classes = useStyles();
    const [dataId, setDataId] = useState(props.dataId);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [value, setValue] = useState(0);

    const [patientName, setPatientName] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient details screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    useEffect(() => {
        console.log(props.isEditable)
        saveAuditLogInfo();
        if (isSidebarOpened) {
            toggleSidebar(layoutDispatch);
        }
    }, []);
    return (
        <>
            <div className={classes.flexHeight100}>
                <div style={{background: '#596270'}}>
                    {dataId > 0 ? (
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Clinical Dashboard" {...a11yProps(0)} />
                            <Tab label="Demographics" {...a11yProps(1)} />
                            <Tab label="Appointments" {...a11yProps(2)} />

                            <Tab label="Documents" {...a11yProps(3)} />
                            <Tab label="Diagnosis" {...a11yProps(4)} />
                            <Tab label="Allergies" {...a11yProps(5)} />
                            <Tab label="Medication" {...a11yProps(6)} />
                            <Tab className={classes.hidden} disabled label="Drug Interactions" {...a11yProps(7)} />
                            <Tab className={classes.hidden} disabled label="CQMS" {...a11yProps(8)} />
                            <Tab className={classes.hidden} disabled label="Intake Data" {...a11yProps(9)} />
                            <Tab label="Lab Orders" {...a11yProps(10)} />
                            <Tab label="Immunizations" {...a11yProps(11)} />
                            <Tab className={classes.hidden} disabled label="Growth Chart" {...a11yProps(12)} />
                            <Tab className={classes.hidden} disabled label="Onpatient Access" {...a11yProps(13)} />
                            <Tab className={classes.hidden} disabled label="Education Resource" {...a11yProps(14)} />
                            <Tab className={classes.hidden} disabled label="Communication" {...a11yProps(15)} />
                            <Tab label="Imaging Orders" {...a11yProps(16)} />
                            <Tab label="Implantable Devices" {...a11yProps(17)} />
                        </Tabs>) : ""
                    }
                </div>
                <div className={classes.contentArea}>
                    {dataId > 0 ?
                        <Profile dataId={dataId} getPatientName={(patName) => setPatientName(patName)} isEditable={props.isEditable} /> : ""
                    }
                    <TabPanel value={value} index={0}>
                        {value == 0 ? (<>
                            <ClinicalDashboard patientName={patientName} dataId={dataId} isEditable={props.isEditable}></ClinicalDashboard>
                        </>) : ""}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {value == 1 ? (<>
                            <div className={classes.shadowBoxWidth}>
                                <Demographics dataId={dataId} isEditable={props.isEditable} />

                            </div>
                        </>) : ""}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {value == 2 ? (<>

                            <Appointments editConfirmation={false} patientName={patientName} dataId={dataId} isEditable={props.isEditable} />
                        </>) : ""}
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Documents dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Diagnosis dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>

                        {value == 5 ? (<>
                            <Allergies dataId={dataId} isEditable={props.isEditable} />
                        </>) : ""}
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        {value == 6 ? (<>
                            <Medication dataId={dataId} isEditable={props.isEditable} />
                        </>) : ""}

                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <LabOrders isImaginOrder={false} dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <Immunization dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                    <TabPanel value={value} index={16}>
                        <LabOrders isImaginOrder={true} dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                    <TabPanel value={value} index={17}>
                        <ImplantableDevices dataId={dataId} isEditable={props.isEditable} />
                    </TabPanel>
                </div>
            </div>
        </>
    );
}
