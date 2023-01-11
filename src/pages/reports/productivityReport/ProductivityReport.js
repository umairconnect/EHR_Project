import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Card,
    Typography
} from "@material-ui/core";

import CalendarIcon from "../../../images/icons/dashboardCalendarIcon.png";
import ClockIcon from "../../../images/icons/clock-bold.png";
import PageTitle from "../../../components/PageTitle";
import { FormBtn, Label } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import SearchList from "../../../components/SearchList/SearchList";

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, CheckboxField } from "../../../components/InputField/InputField";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { formatDate } from '../../../components/Common/Extensions';
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import { GetUserInfo } from "../../../Services/GetUserInfo";
import { Add as AddDeleteIcon } from '@material-ui/icons';

const ProductivityReport = ({ showMessage, ...props }) => {

    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const [state, setState] = useState({
        fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString(),
        locationId: '', locationName: '', providerId: '', providerName: '', noShow: false
    });
    let [totalAppointments, setTotalAppointments] = useState(0);
    let [totalAppointmentHours, setTotalAppointmentHours] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    let [isFirstTime, setIsFirstTime] = useState(true);

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const [locationList, setlocationList] = useState([]);
    const [providerList, setProviderList] = useState([]);

    const [reRender, setReRender] = useState(0);

    const deleteProviderList = (code) => {

        let updatedList = providerList.map((item, i) => item.providerId == code ? { ...item, isDeleted: true } : item);
        setProviderList(updatedList);
    }

    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
    }

    const handleSearchProviderList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (providerList.filter(r => r.isDeleted == false).some(t => t.providerId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    providerId: '',
                    providerName: '',
                }));
                if (reRender == 1) {
                    setReRender(0);
                } else {
                    setReRender(1);
                }
            }, 100);

            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }
        const obj = { providerId: id, providerName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setProviderList([...providerList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                providerId: '',
                providerName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }

    const handleSearchLocationList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (locationList.filter(r => r.isDeleted == false).some(t => t.locationId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    locationId: '',
                    locationName: '',
                }));
                if (reRender == 1) {
                    setReRender(0);
                } else {
                    setReRender(1);
                }
            }, 100);

            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }
        const obj = { locationId: id, locationName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setlocationList([...locationList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                locationId: '',
                locationName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleCheckBoxChange = (e) => {

        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name == 'locationId') {
            setState(prevState => ({
                ...prevState,
                locationId: value == '' ? '' : id,
                locationName: value
            }));

        }
        else if (name == 'providerId') {
            setState(prevState => ({
                ...prevState,
                providerId: value == '' ? '' : id,
                providerName: value
            }));
        }
    }

    function exportReport() {
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Productivity Report",
            Date_From: state.fromDate == undefined ? '' : formatDate(state.fromDate),
            Date_To: state.toDate == undefined ? "" : formatDate(state.toDate),
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            No_Show: state.noShow + ""
        }
        setIsLoading(true);
        PostDataAPI("reports/getReports", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                window.location.assign("." + result.data);

            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }

    function loadProductivityRecord() {
        var onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        var onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        var onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        var onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Productivity Report",
            Date_From: state.fromDate == undefined ? '' : state.fromDate,
            Date_To: state.toDate == undefined ? "" : state.toDate,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            No_Show: state.noShow + ""
        }
        if (userInfo.isProvider == true && isFirstTime == true) {
            params.Provider = userInfo.loggedInUserID + "||" + userInfo.firstName + " " + userInfo.lastName;
            setProviderList([{ providerId: userInfo.loggedInUserID, providerName: userInfo.firstName + " " + userInfo.lastName, isDeleted: false, patientDoesNotHave: false }])
        }
        setIsFirstTime(false);
        
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                var _totalAppointments = 0;
                let _totalSeconds = 0;
                setRowsData(
                    result.data.map((item, i) => {
                        _totalAppointments += parseInt(item.column3 ? item.column3 : 0);
                        _totalSeconds += new Date('1970-01-01T' + item.column4 + 'Z').getTime() / 1000;
                        return { ...item }
                    }));
                setTotalAppointments(_totalAppointments);
                setTotalAppointmentHours(Math.floor(_totalSeconds / 3600));
            }
        });
    }

    function clearFilter() {
        state.fromDate = addDays(new Date(), -30).toString();
        state.toDate = addDays(new Date(), 0).toString();
        state.locationId = '';
        state.locationName = '';
        state.providerId = '';
        state.providerName = '';
        state.noShow = false;
        setlocationList(clearFilterLists(locationList));
        setProviderList(clearFilterLists(providerList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadProductivityRecord();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    function hoursStringToDecimal(hoursString) {
        const [hoursPart, minutesPart] = hoursString.split(":");
        return Number(hoursPart) + Number(minutesPart) / 60;
    }

    useEffect(() => {
        loadProductivityRecord();
    }, [])

    return (
        <>
            <PageTitle title="Productivity Report" />
            <div style={{ margin: "20px" }}>
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} alignItems="baseline">
                        <Label title="Location" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="locationId"
                                name="locationId"
                                value={state.locationId}
                                searchTerm={state.locationName}
                                code="get_all_active_locations"
                                apiUrl="ddl/loadItems"
                                isUser={true}
                                onChangeValue={(name, item) => handleSearchLocationList(name, item)}
                                placeholderTitle="Search Location"
                                reRender={reRender}
                            />
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {locationList ?

                                            locationList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.locationName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteLocationList(item.locationId)}> <AddDeleteIcon /> </span>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            }
                                            ) : ''
                                        }
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>

                        <Label title="Provider" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="providerId"
                                name="providerId"
                                value={state.providerId}
                                searchTerm={state.providerName}
                                code="get_all_providers_query"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchProviderList(name, item)}
                                placeholderTitle="Search Provider"
                                reRender={reRender}
                            />
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {providerList ?

                                            providerList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.providerName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteProviderList(item.providerId)}> <AddDeleteIcon /> </span>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            }
                                            ) : ''
                                        }
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.customGrid} alignItems="baseline">

                        <Label title="Report From" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <InputBaseField
                                        type="date"
                                        id="date_from"
                                        name="fromDate"
                                        value={state.fromDate}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <Label title="To" size={12} />
                                </Grid>
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <InputBaseField
                                        type="date"
                                        id="date_to"
                                        name="toDate"
                                        value={state.toDate}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3} className={classes.checkbox}>
                            <CheckboxField
                                color="primary"
                                name="noShow"
                                checked={state.noShow}
                                onChange={handleCheckBoxChange}
                                label="Include Rescheduled and No Show appointments"
                            />
                        </Grid>

                    </Grid>




                    <Grid container className={classes.customGrid} >
                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" onClick={loadProductivityRecord}>Search</FormBtn>
                                <FormBtn id="reset" style={{ marginRight: "0" }} onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>
                        </Grid>

                    </Grid>


                </div>
                <div className={classes.cardContainer}>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card className={classes.rootCard}>
                                <img src={CalendarIcon} alt="card-image" />
                                <Typography className={classes.cardTitle}>Total Appointments</Typography>
                                <Typography className={classes.cardCount}>{totalAppointments}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card className={classes.rootCard}>
                                <img src={ClockIcon} alt="card-image" />
                                <Typography className={classes.cardTitle}>Total Appointment Hours</Typography>
                                <Typography className={classes.cardCount}>{totalAppointmentHours}</Typography>
                            </Card>
                        </Grid>
                    </Grid>

                </div>
                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["ProductivityReport"]}
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
            </div>
        </>
    )
}

export default withSnackbar(ProductivityReport)