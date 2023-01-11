import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid
} from "@material-ui/core";
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../components/Message/Alert';
import { SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";

function DrugInteractionReport({ showMessage, ...props }) {
    const classes = useStyles();
    const options = [
        { value: "0", label: "Option" },
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ]
    let list = [
        {
            drugInteractionId: 0,
            chartId: "HAJE000001",
            patientName: "Jenny (Jen) Harris",
            dob: "09/12/2021",
            date: "02/12/2014",
            interaction: "Non-Drug Allergy: bananas",
            severity: "High",
            alert: "",
            status: "Active",
        },

    ]
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [locationId, setLocationId] = useState(0);

    const [stateFilters, setStateFilters] = useState({
        severity: "", onset: "", locationId: 0, locationName: "", providerId: 0, providerName: "",
        onSetFromDate: addDays(new Date(), -30).toString(), onSetToDate: addDays(new Date(), 7).toString(),
        status: ""
    });

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSelectListChange = (name, item, val) => {
        const { id, value } = item;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: value == '' ? '' : id.toString(),
            [val]: value,

        }));
    }
    const handleReset = () => {
        setStateFilters({
            severity: "", onset: "", locationId: 0, locationName: "", providerId: 0, providerName: "",
            onSetFromDate: addDays(new Date(), -30).toString(), onSetToDate: addDays(new Date(), 7).toString(),
            status: ""
        });
    }
    useEffect(() => {
        setRowsData(
            list.map((item, i) => {
                return { ...item }
            }))
    }, [])
    return (
        <>
            <PageTitle title="Drug Interaction Report" />
            <div style={{ margin: "20px" }}>
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Label title="Severity" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="severity"
                                name="severity"
                                value={stateFilters.severity}
                                options={options}
                                placeholder="Select Severity"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Label title="Onset" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                id="onset"
                                name="onset"
                                value={stateFilters.onset}
                                options={options}
                                placeholder="Specific Date"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Label title="Onset Date" size={2} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="onSetFromDate"
                                        name="onSetFromDate"
                                        value={stateFilters.onSetFromDate}
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
                                        id="onSetToDate"
                                        name="onSetToDate"
                                        value={stateFilters.onSetToDate}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Label title="Location" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="locationId"
                                name="locationId"
                                value={stateFilters.locationId}
                                searchTerm={stateFilters.locationName}
                                code="login_provider_locations"
                                apiUrl="ddl/loadItems"
                                isUser={true}
                                onChangeValue={(name, item) => handleSelectListChange(name, item)}
                                placeholderTitle="Search Provider"
                            />
                        </Grid>



                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Label title="Provider" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="providerId"
                                name="providerId"
                                value={stateFilters.providerId}
                                searchTerm={stateFilters.providerName}
                                code="providers_by_location"
                                apiUrl="ddl/loadItems"
                                // searchId={locationId}
                                onChangeValue={(name, item) => handleSelectListChange(name, item)}
                                placeholderTitle="Search Provider"
                            />
                        </Grid>

                        <Label title="Status" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                id="status"
                                name="status"
                                value={stateFilters.status}
                                options={options}
                                placeholder="Select Status"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>


                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" >Search</FormBtn>
                                <FormBtn id="reset" onClick={handleReset}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        <Button className={classes.gridButton}  >Print</Button>|
                        <Button className={classes.gridButton}  >Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                            columns={gridCnfg["DrugInteractionReportColumns"]}
                            rowClassName={(record, index) => "claimRow"}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={isLoading && LoadingIcon}
                                        description={isLoading ? "Loading..." : "No Record Found"}
                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                    />
                                )
                            }}
                        />
                    </div>

                </div>
            </div >
        </>
    )
}
export default withSnackbar(DrugInteractionReport)