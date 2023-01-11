import React, { useState } from 'react';
import PropTypes from 'prop-types';
//material ui
import {
    Container,
    Button,
    Tab,
    Tabs,
    FormLabel,
    Typography,
    Grid,
    Box,
    Card,
    Divider
} from '@material-ui/core';
import Chart from "react-google-charts";
import PageTitle from '../../../components/PageTitle/PageTitle';
import { FormGroupTitle, ShadowBox, ShadowBoxMin } from '../../../components/UiElements/UiElements';
import { BoxContainer } from '../../dashboard/component/boxContainer/BoxContainer'
import { withSnackbar } from '../../../components/Message/Alert';
//styles
import useStyles from './styles';
import Scrollbars from 'rc-scrollbars';
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
const data = [
    ['Period', 'Income Analysis', { role: 'style' }],
    ["Month to Date", 420, 'fill-color: #4572A7; '],
    ["Last Month", 2855, 'fill-color: #82312D; '],
    ["Quarter to Date", 3285, 'fill-color: #654D7D; '],
    ["Last Quarter", 1925, 'fill-color: #305281; '],
    ["Year to Date", 2500, 'fill-color: #2C7C97; '],
];
function BillingSummary({ showMessage, ...props }) {
    const classes = useStyles();
    const [tabvalue, setTabValue] = useState(0);
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };
    var options = {
        legend: { position: "none" },
        width: '100%',
        height: '450px',
        // bar: { groupWidth: "65%" }   ,
        chartArea: {
            right: 5,
            top: 20,
            left: 40,
            width: '100%',
            height: '90%',
        },
        vAxis: {
            maxValue: 1200,

        }
        //hAxis: { textPosition: 'none' },

    };
    const itemsList = [
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
        { performanceIndicator: 'Procedures (A)', thisPeriod: '8', lastPeriod: '19', percentPeriod: "-58.89%" },
    ]
    return (
        <>
            <PageTitle title="Billing Summary" />
            <ShadowBox shadowSize={0} className={classes.shadowBox}>
                <Tabs
                    classes={{ root: classes.tabRoot }}
                    value={tabvalue}
                    onChange={onTabChange}
                    aria-label="icon tabs example"
                    className={classes.Htabs}
                >
                    <Tab label="Month" aria-label="Month" {...a11yProps(0)} />
                    <Tab label="Quarter" aria-label="quarter" {...a11yProps(1)} />
                    <Tab label="Year" aria-label="year" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                    {tabvalue === 0 ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                                    <BoxContainer>
                                        <FormGroupTitle>Income Analysis</FormGroupTitle>
                                        <Chart
                                            width='100%'
                                            height='450px'
                                            left={0}
                                            chartType="ColumnChart"
                                            loader={<div>Loading Chart</div>}
                                            data={data}
                                            options={options}
                                        />
                                    </BoxContainer>
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>FASTEST</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.fastestCardText}>
                                                <p >0 Days</p>
                                            </div>
                                        </Card>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>SLOWEST</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.slowestCardText}>
                                                <p >0 Days</p>
                                            </div>
                                        </Card>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>AVERAGE</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.averageCardText}>
                                                <p >0 Days</p>
                                            </div>
                                        </Card>
                                    </div>
                                    <Scrollbars autoHeight autoHeightMin={280}>
                                        <table className={classes.adjustmentReasonsTable}>
                                            <thead className={classes.adjustmentReasonsTableHeader}>
                                                <td className={classes.amountTd}>Performance Indicator</td>
                                                <td className={classes.reasonCodeTd}>This Period</td>
                                                <td className={classes.actionTd}>Last Period</td>
                                                <td className={classes.actionTd}>% Last</td>
                                            </thead>
                                            <tbody className={classes.adjustmentReasonsTableBody}>
                                                {
                                                    (itemsList && itemsList.length > 0) ? itemsList.map((item, i) => {

                                                        return (
                                                            <tr>
                                                                <td><span>{item.performanceIndicator}</span></td>
                                                                <td><span>{item.thisPeriod}</span></td>
                                                                <td><span>{item.lastPeriod}</span></td>
                                                                <td><span>{item.percentPeriod}</span></td>
                                                            </tr>
                                                        )
                                                    }) : ''
                                                }
                                            </tbody>
                                        </table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </> : null}
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                    {tabvalue === 1 ?
                        <></> : null}
                </TabPanel>
                <TabPanel value={tabvalue} index={2}>
                    {tabvalue === 2 ?
                        <></> : null}
                </TabPanel>
            </ShadowBox>
        </>
    )
}

export default withSnackbar(BillingSummary)