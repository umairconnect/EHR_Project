import React, { useState,useEffect } from "react";
//material ui
import {
    Grid,
    Button
} from "@material-ui/core";
import Chart from "react-google-charts";
// components
import { FormBtn, Label, ShadowBox } from "../../../../../components/UiElements/UiElements";
import { BoxContainer } from "../../../../dashboard/component/boxContainer/BoxContainer";
// styles
import useStyles from "./styles";
import { withSnackbar } from '../../../../../components/Message/Alert';
import { SelectField } from "../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';

function Summary({...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [reRender, setReRender] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(),
        receivableBy: '', daysRange:''
    });
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const receivableBy = [
        { value: "dos", label: "DOS" },
        { value: "billed", label: "Billed" },
        { value: "posted", label: "Posted" },
    ]
    const optionsDaysRange = [
        { value: "0-30 days", label: "0-30 Days" },
        { value: "31-60 days", label: "31-60 Days" },
        { value: "61-90 days", label: "61-90 Days" },
        { value: "90-120 days", label: "90-120 Days" },
        { value: "120+ days", label: "120+ Days" },
    ]

    var [data,setData] = useState([
        ["Period", "Patient", "Insurance"],
        ["0-30 Days", 0, 0],
        ["31-60 Days", 0, 0],
        ["61-90 Days", 0, 0],
        ["91-120 Days", 0, 0],
        ["120+ Days", 0, 0,],
        ["All", 0, 0],
    ]);
    var chartOptions = {
        legend: { position: "bottom" },
        width: '100%',
        height: '100%',
        bar: { groupWidth: "18%" },
        chartArea: {
            right: 5,
            top: 20,
            left: 40,
            width: '100%',
            // height: '100%',
        },
        vAxis: {
            minValue: 0,
            // maxValue: 1200,
        }
        //hAxis: { textPosition: 'none' },

    };
    

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function loadRecievableSummaryChart() {
        const _data = [
            ["Period"],
            ["0-30 Days"],
            ["31-60 Days"],
            ["61-90 Days"],
            ["91-120 Days"],
            ["120+ Days"],
            ["All"],
        ];
        var params = {
            reportName: "Account Recievable - Summary",
            recievable_by: state.receivableBy,
            days_range: state.daysRange,
            Date_From: state.dateFrom,
            Date_To: state.dateTo
        }
        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            
            if (result.success && result.data != null) {
                result.data.map((item, i) => {
                    _data[0].push(capitalizeFirst(item.column1))
                    _data[1].push(parseInt(item.column2))
                    _data[2].push(parseInt(item.column3))
                    _data[3].push(parseInt(item.column4))
                    _data[4].push(parseInt(item.column5))
                    _data[5].push(parseInt(item.column6))
                    _data[6].push(parseInt(item.column7))
                  
                });
                setData(_data);
            }
        });

    }

    function clearFilter() {
        state.receivableBy = ''
        state.daysRange = ''
        state.dateFrom = addDays(new Date(), -30).toString()
        state.dateTo = addDays(new Date(), 0).toString()
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadRecievableSummaryChart();
    }


    useEffect(() => {
        loadRecievableSummaryChart();
    }, [])
    return (
        <div style={{ margin: "0px 10px" }}>
            {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Label title="From" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                <input
                                    type="date"
                                    id="dateFrom"
                                    name="dateFrom"
                                    value={state.dateFrom}
                                    onChange={handleChange}
                                    className={classes.dateInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                <Label title="To" size={12} />
                            </Grid>
                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                <input
                                    type="date"
                                    id="dateTo"
                                    name="dateTo"
                                    value={state.dateTo}
                                    onChange={handleChange}
                                    className={classes.dateInput}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    

                    <Label title="Or" size={2} />
                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="daysRange"
                            name="daysRange"
                            value={state.daysRange}
                            options={optionsDaysRange}
                            onChange={handleChange}
                            placeholder="Days Range"
                        />
                    </Grid>

                    {/*<Label title="Group By" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="groupBy"
                            name="groupBy"
                            value={state.groupBy}
                            options={optionsGroupBy}
                            onChange={handleChange}
                            placeholder="Select Group By"
                        />
                    </Grid>*/}
                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Label title="Aging AR by" size={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="receivableBy"
                            name="receivableBy"
                            value={state.receivableBy}
                            options={receivableBy}
                            onChange={handleChange}
                            placeholder="Select Recievable By"
                        />

                    </Grid>
                    
                </Grid>


                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Grid item xs={12} sm={7} md={7} lg={7} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row" justify="flex-end" >

                            <FormBtn id="save" btnType="search" onClick={loadRecievableSummaryChart}>Search</FormBtn>
                            <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                        </Grid>

                    </Grid>

                </Grid>
              

            </div>
            <ShadowBox shadowSize={3} className={classes.shadowBox}>

                      <Grid container direction="row" justify="flex-end" >
                            {/*<Button className={classes.gridButton} >Export</Button>*/}
                        </Grid>

                <BoxContainer >
                    <Chart
                        width={'100%'}
                        // height={'100%'}
                        height="650px"
                        left={0}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={chartOptions}
                    />
                </BoxContainer>
            </ShadowBox>
        </div >
    )
}

export default withSnackbar(Summary)
