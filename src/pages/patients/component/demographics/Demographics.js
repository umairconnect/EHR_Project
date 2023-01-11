import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import PropTypes from 'prop-types';
import { ShadowBox } from "../../../../components/UiElements";
import { Tab, Tabs, AppBar, Box } from '@material-ui/core';

import DemographicDetails from "./components/demographicsDetails/DemographicsDetails";
import ReferringProvider from "./components/referringProvider/ReferringProvider";
import OrderingProvider from "./components/orderingProvider/OrderingProvider";
import ResponsibleParty from "./components/responsibleParty/ResponsibleParty";
import Insurance from "./components/insurance/Insurance";
// import Employer from "./components/employer/Employer";
// import GeneralInformation from "../patientInfo/PatientInfo";
import SendReferral from "./components/sendReferral/SendReferral";
import Authorizations from "./components/authorizations/Authorizations";
import PatientContact from "./components/patientContacts/PatientContact";
import PatientMessage from "./components/patientMsg/patientMsg";
import Eligibility from "./components/eligibility/Eligibility";
import { withSnackbar } from "../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    {children}
                </Box>
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
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function Demographics(props) {
    const { showMessage } = props;
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    let defaultSetTab = props.insuranceSelect ? props.insuranceSelect : 0
    var classes = useStyles();
    const [dataId, setDataId] = useState(isNaN(props.dataId) ? props.dataId : parseInt(props.dataId));
    const [value, setValue] = useState(defaultSetTab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics details"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        saveAuditLogInfo();
    }, []);

    return (
        <>
            <ShadowBox className={classes.shadowBoxWidth}>
                {dataId > 0 ? (<>
                    <AppBar className={classes.tabHeader} position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            className={classes.tabs}
                        >
                            {/* <Tab label="General Information" {...a11yProps(0)} /> */}

                            <Tab label="Demographics" {...a11yProps(0)} />
                            {/*<Tab label="Referring Provider" {...a11yProps(1)} />*/}
                            <Tab label="Referrals" {...a11yProps(1)} />
                            <Tab label="Ordering Provider" {...a11yProps(2)} />
                            {/* <Tab label="Guardian" {...a11yProps(3)} /> */}
                            <Tab label="Insurance" {...a11yProps(3)} />
                            <Tab label="Eligibility" {...a11yProps(4)} />
                            
                            <Tab label="Authorizations" {...a11yProps(5)} />

                            <Tab label="Contacts" {...a11yProps(6)} />

                            <Tab label="Messages" {...a11yProps(7)} />

                            {/* <Tab label="Employer" {...a11yProps(5)} />*/}


                        </Tabs>
                    </AppBar>
                </>) : ""}
                {/* <TabPanel className={classes.tabPanel} value={value} index={0}>
                    {value == 0 ?(<>
                        <GeneralInformation dataId={dataId} /> </>):""}
                </TabPanel>*/}
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    {value == 0 ? (<>
                        <DemographicDetails dataId={dataId} isEditable={props.isEditable} /> </>) : ""}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {value == 1 ? (<>
                        <SendReferral dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>
                {/*<TabPanel value={value} index={1}>*/}
                {/*    {value == 1 ? (<>*/}
                {/*        <ReferringProvider dataId={dataId} isEditable={props.isEditable} /></>) : ""}*/}
                {/*</TabPanel>*/}
                <TabPanel value={value} index={2}>
                    {value == 2 ? (<>
                        <OrderingProvider dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    {value == 3 ? (<>
                        <ResponsibleParty dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel> */}
                <TabPanel value={value} index={3}>
                    {value == 3 ? (<>
                        <Insurance dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {value == 4 ? (<>
                        <Eligibility dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>
                {/* <TabPanel  value={value} index={5}>
                    {value == 5 ?(<>
                        <Employer dataId={dataId} /></>):""} 
                </TabPanel> */}
                
                <TabPanel value={value} index={5}>
                    {value == 5 ? (<>
                        <Authorizations dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>

                <TabPanel value={value} index={6}>
                    {value == 6 ? (<>
                        <PatientContact dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>

                <TabPanel value={value} index={7}>
                    {value == 7 ? (<>
                        <PatientMessage dataId={dataId} isEditable={props.isEditable} /></>) : ""}
                </TabPanel>


            </ShadowBox>

        </>
    );
}

export default withSnackbar(Demographics);