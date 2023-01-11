import React, { useState } from 'react'
//material ui
import {
    Tab,
    Tabs,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PageTitle from '../../../components/PageTitle/PageTitle';
import DefaultFinancialReports from './components/defaultFinancialReports/DefaultFinancialReports';
import useStyles from './styles';

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
function FinancialReports() {
    const classes = useStyles();
    const [tabvalue, setTabValue] = useState(0);
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };
    return (
        <>
            <PageTitle title="Day Sheet" />
            < div className={classes.shadowBox}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> 
                <Tabs
                    classes={{ root: classes.tabRoot }}
                    value={tabvalue}
                    onChange={onTabChange}
                    aria-label="icon tabs example"
                    className={classes.Htabs}
                >
                    <Tab label="Default" aria-label="Default" {...a11yProps(0)} />
                    <Tab className={classes.reimbursementAnalysis} label="Reimbursement Analysis" aria-label="reimbursementAnalysis" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                    {tabvalue === 0 ?
                        <>
                            <DefaultFinancialReports />
                        </> : null}
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                    {tabvalue === 1 ?
                        <DefaultFinancialReports />
                        : null}
                </TabPanel>*/}
                <DefaultFinancialReports />
                {/* </ShadowBox> */}
            </div >
        </>
    )
}

export default FinancialReports