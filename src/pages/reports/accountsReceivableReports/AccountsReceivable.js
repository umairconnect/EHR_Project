import React, { useState } from 'react'
//material ui
import {
    Button,
    Tab,
    Tabs,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';
import PageTitle from '../../../components/PageTitle/PageTitle';
import Summary from './components/summary/Summary';
import useStyles from './styles';
import Insurance from './components/insurance/Insurance';
import Patients from './components/patients/Patients';
import Speciality from './components/speciality/Speciality';
import PatientDetails from "./components/patients/components/patientDetails/PatientDetails";
import InsuranceDetails from "./components/insurance/components/insuranceDetails/InsuranceDetails";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function AccountsReceivable() {
    const classes = useStyles();
    const [tabvalue, setTabValue] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("");
    const [patientPageChange, setPatientPageChange] = useState(0);
    const [insurancePageChange, setInsurancePageChange] = useState(0);
    const [data, setData] = useState('');
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);

        if (newValue === 2) {
            setButtonTitle("");
            setShowButton(false);
            setPatientPageChange(0)
        }
        if (newValue === 1) {
            setButtonTitle("");
            setShowButton(false);
            setInsurancePageChange(0);
        }
        if (newValue === 0) {
            setShowButton(false);
        }

    };
    const insuranceChangePage = (data) => {
        setData(data);
        setShowButton(true);
        setButtonTitle("Back to Insurance");
        setInsurancePageChange(1);
    }
    const openPayerDetails = (payerId) => {
        console.log("Open payer detials");
    }
    const patientChangePage = (data) => {
        setData(data);
        setShowButton(true);
        setButtonTitle("Back to Patient");
        setPatientPageChange(1);
    }
    const backButton = () => {
        setShowButton(false);
        setButtonTitle("");
        setInsurancePageChange(0);
        setPatientPageChange(0);
        // if (patientPageChange === 1) {
        //     setPatientPageChange(0)
        // } else if (insurancePageChange === 1) {
        //     setPatientPageChange(0)
        // }
    }
    return (
        <>
            <PageTitle title="Account Receivable"
                button={showButton && <Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    {buttonTitle}
                </Button>} />
            < div className={classes.shadowBox}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                <Tabs
                    classes={{ root: classes.tabRoot }}
                    value={tabvalue}
                    onChange={onTabChange}
                    aria-label="icon tabs example"
                    className={classes.Htabs}
                >
                    <Tab
                        label="Summary"
                        aria-label="Summary"
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Insurance"
                        aria-label="Insurance"
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Patients"
                        aria-label="Patients"
                        {...a11yProps(2)}
                    />
                </Tabs>
                <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                    <Summary />{/* {tabvalue === 0 ?
                        <></>
                        : null} */}
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                    {insurancePageChange === 1 ?
                        <InsuranceDetails data={data} />
                        : <Insurance pageChange={insuranceChangePage} openPayerDetails={openPayerDetails} />
                    }
                </TabPanel>
                <TabPanel value={tabvalue} index={2}>
                    {patientPageChange === 1 ?
                        <PatientDetails data={data} />
                        : <Patients pageChange={patientChangePage} />
                    }
                </TabPanel>
                <TabPanel value={tabvalue} index={3}>
                    <Speciality />{/* {tabvalue === 1 ?
                        <></>
                        : null} */}
                </TabPanel>
                {/* </ShadowBox> */}
            </div >
        </>
    )
}
export default AccountsReceivable