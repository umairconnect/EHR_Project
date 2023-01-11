import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
//material ui
import {
    Grid,
    Tab,
    Tabs,
    Card,
    Typography,
    Divider,
    Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
// components
import { FormBtn, Label, LinkS, ShadowBox } from "../../../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";

import ImportExport from '@material-ui/icons/ImportExport';

// styles
import useStyles from "./styles";
import '../../../../../components/antd.css';
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../../../components/InputField/InputField";
import SearchList from "../../../../../components/SearchList/SearchList";
import CreditAdjustments from "./creditAdjustments/CreditAdjustments";
import PatientsPayment from "./patientsPayment/PatientsPayment";
import Charges from "./charges/Charges";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { formatDate, formatCurrency } from '../../../../../components/Common/Extensions';

import { Add as AddDeleteIcon } from '@material-ui/icons';

import PatientSearchList from "../../../../../components/PatientSearchList/PatientSearchList"
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
function DefaultFinancialReports({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [tabvalue, setTabValue] = useState(0);

    const [isUpdate, setIsUpdate] = useState(false);
    const [daySheet, setDaySheet] = useState({ column1: "0.00", column2: "0.00", column3: "0.00", column4: "0.00" });
    const [data, setData] = useState([{}]);
    const onTabChange = (e, newValue) => {
        if (newValue == 1 && state.Credits_By == undefined) {
            setState(prevState => ({
                ...prevState,
                ['Credits_By']: 'PostedDate',
                ['CreditByLabel']: 'Posted Date'
            }));
        }
        if (newValue == 3 && state.Charges_By == undefined) {
            setState(prevState => ({
                ...prevState,
                ['Charges_By']: 'DOS',
                ['ChargeByLabel']: 'DOS'
            }));
        }
        setTabValue(newValue);
        setIsUpdate(false)
        search(newValue);
    };


    const [patientList, setPatientList] = useState([]);
    const [locationList, setlocationList] = useState([]);

    const [reRender, setReRender] = useState(0);

    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
    }
    const deletePatientList = (code) => {

        let updatedList = patientList.map((item, i) => item.patientId == code ? { ...item, isDeleted: true } : item);
        setPatientList(updatedList);
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
    const handleSearchPatientList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (patientList.filter(r => r.isDeleted == false).some(t => t.patientId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    patientId: '',
                    patientName: '',
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
        const obj = { patientId: id, patientName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setPatientList([...patientList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                patientId: '',
                patientName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }
    const optionsChargesBy = [
        { value: "PostedDate", label: "Posted Date" },
        { value: "DOS", label: "DOS" },
    ]

    const optionsCreditesBy = [
        { value: "PostedDate", label: "Posted Date" },
        { value: "CheckedDate", label: "Checked Date" },
        { value: "DepositDate", label: "Deposit Date" }
    ]
    const [reasonCodeOptions, setReasonCodeOptions] = useState([]);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(), Credits_By: 'PostedDate', CreditByLabel: 'Posted Date'
        , Charges_By: 'DOS', ChargeByLabel: 'DOS'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    const [searchParamValue, setSearchParamValue] = useState({
        reportName: "", Date_From: "", Date_To: "", Patient: "", Location: "", Room: "", Reason: "",
        Credits_By: "PostedDate", Charges_By: "DOS"
    });

    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleReasongChange = (e) => {

        const { name, value } = e.target;
        if (name == "reasonTitle") {
            var _reasonCode = "";
            reasonCodeOptions.filter(item => item.value == value).map((item, i) => {
                _reasonCode = item.id
            });
            console.log(_reasonCode);
            setState(prevState => ({
                ...prevState,
                [name]: value,
                reasonCode: _reasonCode
            }));
        } else if (name == "Credits_By") {
            var _reasonCode = "";
            optionsCreditesBy.filter(item => item.value == value).map((item, i) => {
                _reasonCode = item.label
            });
            console.log(_reasonCode);
            setState(prevState => ({
                ...prevState,
                [name]: value,
                CreditByLabel: _reasonCode
            }));
        }
        else if (name == "Charges_By") {
            var _reasonCode = "";
            optionsChargesBy.filter(item => item.value == value).map((item, i) => {
                _reasonCode = item.label
            });
            console.log(_reasonCode);
            setState(prevState => ({
                ...prevState,
                [name]: value,
                ChargeByLabel: _reasonCode
            }));
        }
        else if (name == "roomID") {
            var _reasonCode = "";
            rooms.filter(item => item.value == value).map((item, i) => {
                _reasonCode = item.label
            });
            console.log(_reasonCode);
            setState(prevState => ({
                ...prevState,
                [name]: value,
                RoomLabel: _reasonCode
            }));
        }

    }

    function setRoomsbyLocation(locationId) {
        var locId = locationId + "";
        var params = {
            code: "get_location_rooms",
            parameters: [locId]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setRooms(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));


            }
        })
    }

    const handleSearchPatientChange = (item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
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

            if (id > 0) {
                setRoomsbyLocation(id);
            } else {
                setRooms([]);
            }
        }

        else if (name == 'patientId') {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));
        }
    }

    function search(_tabValue) {
        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocName = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");

        var _dateFrom = state.dateFrom == undefined ? "" : state.dateFrom;
        var _dateTo = state.dateTo == undefined ? "" : state.dateTo;
        var _patientId = patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames;
        var _locationId = locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocName;
        var _room = '';//state.roomID == undefined ? "" : state.roomID + "||" + state.RoomLabel;
        var _reasonCode = state.reasonCode == undefined || state.reasonCode == '' ? "" : state.reasonCode + "||" + state.reasonTitle;
        var _creditBy = state.Credits_By == undefined ? "" : state.Credits_By + "||" + state.CreditByLabel;
        var _chargeBy = state.Charges_By == undefined ? "" : state.Charges_By + "||" + state.ChargeByLabel;

        if (_tabValue == 0) {
            searchParamValue.reportName = "Day Sheet"
        }
        else if (_tabValue == 1) {
            searchParamValue.reportName = "Credit & Adjustments"
            searchParamValue.Credits_By = _creditBy

        } else if (_tabValue == 2) {
            searchParamValue.reportName = "Patient Payments"

        }
        else if (_tabValue == 3) {
            searchParamValue.reportName = "Financial Charges"
            searchParamValue.Charges_By = _chargeBy

        }
        searchParamValue.Date_From = _dateFrom
        searchParamValue.Date_To = _dateTo
        searchParamValue.Patient = _patientId
        searchParamValue.Location = _locationId
        searchParamValue.Room = _room
        searchParamValue.Reason = _reasonCode
        loadReportRecord(_tabValue);
    }
    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    function clearFilter() {
        state.patientID = "";
        state.patientName = "";
        state.locationId = "";
        state.locationName = "";
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        state.roomID = "";
        state.roomName = "";
        state.RoomLabel = "";
        state.reasonCode = "";
        state.reasonTitle = "";
        state.Credits_By = "PostedDate";
        state.CreditByLabel = "Posted Date";
        state.Charges_By = "DOS";
        state.ChargeByLabel = "DOS";
        setRooms([]);
        setPatientList(clearFilterLists(patientList))
        setlocationList(clearFilterLists(locationList))

        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        search(tabvalue);
    }
    function exportReport() {
        setIsLoading(true);
        var params = null;
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocName = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");

        var _dateFrom = state.dateFrom == undefined ? "" : state.dateFrom;
        var _dateTo = state.dateTo == undefined ? "" : state.dateTo;
        var _patientId = patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames;
        var _locationId = locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocName;
        var _room = '';//state.roomID == undefined || state.roomID == ''? "" : state.roomID + "||" + state.RoomLabel;
        var _reasonCode = state.reasonCode == undefined || state.reasonCode == '' ? "" : state.reasonCode + "||" + state.reasonTitle;
        var _creditBy = state.Credits_By == undefined ? "" : state.Credits_By + "||" + state.CreditByLabel;
        var _chargeBy = state.Charges_By == undefined ? "" : state.Charges_By + "||" + state.ChargeByLabel;

        if (tabvalue == 0 || tabvalue == 2) {
            params = {
                reportName: tabvalue == 0 ? "Day Sheet" : "Patient Payments",
                Date_From: _dateFrom,
                Date_To: _dateTo,
                Patient: _patientId,
                Location: _locationId,
                Room: _room,
                Reason: _reasonCode
            }
        }
        else if (tabvalue == 1) {
            params = {
                reportName: "Credit & Adjustments",
                Date_From: _dateFrom,
                Date_To: _dateTo,
                Patient: _patientId,
                Location: _locationId,
                Room: _room,
                Reason: _reasonCode,
                Credits_By: _creditBy
            }
        }
        else if (tabvalue == 3) {
            params = {
                reportName: "Financial Charges",
                Date_From: _dateFrom,
                Date_To: _dateTo,
                Patient: _patientId,
                Location: _locationId,
                Room: _room,
                Reason: _reasonCode,
                Charges_By: _chargeBy
            }
        }
        PostDataAPI("reports/getReports", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                window.location.assign("." + result.data);

            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }

    function loadReportRecord(_tabValue) {

        var params = null;
        if (_tabValue == 0 || _tabValue == 2) {
            params = {
                reportName: searchParamValue.reportName,
                Date_From: searchParamValue.Date_From,
                Date_To: searchParamValue.Date_To,
                Patient: searchParamValue.Patient,
                Location: searchParamValue.Location,
                Room: searchParamValue.Room,
                Reason: searchParamValue.Reason
            }
        } else if (_tabValue == 1) {
            params = {
                reportName: searchParamValue.reportName,
                Date_From: searchParamValue.Date_From,
                Date_To: searchParamValue.Date_To,
                Patient: searchParamValue.Patient,
                Location: searchParamValue.Location,
                Room: searchParamValue.Room,
                Reason: searchParamValue.Reason,
                Credits_By: searchParamValue.Credits_By
            }
        } else if (_tabValue == 3) {
            params = {
                reportName: searchParamValue.reportName,
                Date_From: searchParamValue.Date_From,
                Date_To: searchParamValue.Date_To,
                Patient: searchParamValue.Patient,
                Location: searchParamValue.Location,
                Room: searchParamValue.Room,
                Charges_By: searchParamValue.Charges_By
            }
        }


        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                if (_tabValue == 0) {
                    setDaySheet(result.data[0]);
                }
                else {
                    setData(result);
                    setIsUpdate(true);
                    setTimeout(() => {
                        setIsUpdate(false);
                    }, 1000);
                }
            }
        });
    }

    const loadAdjustmentReasonCodeList = () => {
        var data = {
            code: "get_carc_codes",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", data).then((result) => {
            if (result.success && result.data != null) {
                setReasonCodeOptions(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2, label: item.text2 };
                    }));
            }
        })
    }

    useEffect(() => {
        search(0);
        loadAdjustmentReasonCodeList();
        setIsUpdate(true)
    }, [])

    return (
        <>
            <div style={{ margin: "0px 10px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                        <Grid item xs={6} lg={6} md={6} sm={6} >
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Patient" size={4} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        id="patientId"
                                        name="patientId"
                                        value={state.billingStatusId}
                                        searchTerm={state.patientName}
                                        code="patient_Search"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                        placeholderTitle="Search Patient"
                                        reRender={reRender}
                                    />

                                    {/* <PatientSearchList
                                        id="patientId"
                                        name={state.patientName}
                                        value={state.billingStatusId}
                                        onChangeValue={(item) => handleSearchPatientChange(item)}
                                        placeholderTitle="Search Patient"
                                        reRender={reRender}
                                    /> */}
                                    {patientList.length > 0 ?
                                        <Grid item xs={12} sm={12} lg={12} md={12}>
                                            <div className={classes.orderTestContent}>
                                                <ul className={classes.orderList}>
                                               

                                                   { patientList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                        if (item.isDeleted == true) { return '' }
                                                    else {
                                                            return (
                                                    <>
                                                        <li>
                                                            {item.patientName}
                                                            <span className={classes.deleteIcon} onClick={() => deletePatientList(item.patientId)}> <AddDeleteIcon /> </span>
                                                        </li>
                                                    </>
                                                    )
                                                        }
                                                    }
                                                    ) }

                                                </ul>
                                            </div>
                                        </Grid>
                                        : ''}


                                </Grid>
                            </Grid>

                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Location" size={4} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        id="locationId"
                                        name="locationId"
                                        value={state.locationId}
                                        searchTerm={state.locationName}
                                        code="get_all_active_locations"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchLocationList(name, item)}
                                        placeholderTitle="Search Location"
                                        isUser={true}
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

                            </Grid>

                            {(tabvalue != 0 && tabvalue != 3 && tabvalue != 2) ?
                                <>
                                    <Grid container className={classes.customGrid} alignItems="row" lg={12}>
                                        <Label title="Display Credits by" size={4} />
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <SelectField
                                                id="Credits_By"
                                                name="Credits_By"
                                                value={state.Credits_By}
                                                options={optionsCreditesBy}
                                                onChange={e => { handleReasongChange(e) }}
                                                placeholder="Select Credits"
                                            />
                                        </Grid> </Grid>
                                </> : ''
                            }


                            {(tabvalue != 0 && tabvalue != 1 && tabvalue != 2) ?
                                <>
                                    <Grid container className={classes.customGrid} alignItems="row" lg={12}>
                                        <Label title="Display Charges by" size={4} />
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <SelectField
                                                id="Charges_By"
                                                name="Charges_By"
                                                value={state.Charges_By}
                                                options={optionsChargesBy}
                                                onChange={e => { handleReasongChange(e) }}
                                                placeholder="Select Charges by"
                                            />
                                        </Grid></Grid>
                                </> : ''
                            }

                        </Grid>

                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Date From" size={2} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
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
                            </Grid>

                            <Grid container className={classes.customGrid} direction="row" lg={12} >
                                <Label title="Reason" size={2} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SelectField
                                        name="reasonTitle"
                                        value={state.reasonTitle}
                                        onChange={e => { handleReasongChange(e) }}
                                        options={reasonCodeOptions}
                                        placeholder="Select Reason"
                                    />
                                </Grid>
                                {/*<Label title="Room" size={2} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SelectField
                                        id="room"
                                        name="roomID"
                                        value={state.roomID}
                                        options={rooms}
                                        onChange={e => { handleReasongChange(e) }}
                                        placeholder="Select Room"
                                    />
                                </Grid>*/}
                            </Grid>


                            <Grid container className={classes.customGrid} direction="row" lg={12}>
                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.textRight}>

                                    <FormBtn id="save" btnType="search" onClick={() => { search(tabvalue) }}>Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>

                                </Grid>
                                <Grid sm={2} md={2} lg={2} />
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>

                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>
                </div>

                <ShadowBox shadowSize={0} className={classes.shadowBox}>
                    <Tabs
                        classes={{ root: classes.tabRoot }}
                        value={tabvalue}
                        onChange={onTabChange}
                        aria-label="icon tabs example"
                        className={classes.Htabs}
                    >
                        <Tab label="Grand Total" aria-label="Grand Total" {...a11yProps(0)} />
                        <Tab label="Credits & Adjustments" aria-label="Credits & Adjustments" {...a11yProps(1)} />
                        <Tab label="Patients Payment" aria-label="Patients Payment" {...a11yProps(2)} />
                        <Tab label="Charges" aria-label="Charges" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                        {tabvalue === 0 ?
                            <Grid container>
                                <Grid item lg={12}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>DEBIT</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.debitCardText}>
                                                <p >${formatCurrency(daySheet.column1)}</p>
                                            </div>
                                        </Card>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>CREDIT</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.creditCardText}>
                                                <p >${formatCurrency(daySheet.column2)}</p>
                                            </div>
                                        </Card>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>ADJUSTMENTS</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.adjustmentsCardText}>
                                                <p >${formatCurrency(daySheet.column3)}</p>
                                            </div>
                                        </Card>
                                        <Card className={classes.dataCard}>
                                            <Typography className={classes.cardLabel}>PATIENT PAYMENTS</Typography>
                                            <Divider orientation="horizontal" color="#E1E1E1" />
                                            <div className={classes.paymentspaymentCardText}>
                                                <p >${formatCurrency(daySheet.column4)}</p>
                                            </div>
                                        </Card>
                                    </div>
                                </Grid>
                            </Grid>
                            : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={1}>
                        {tabvalue === 1 ?
                            <CreditAdjustments data={data} searchParamValue={searchParamValue} isUpdate={isUpdate} searchCridetia={state} />
                            : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={2}>
                        {tabvalue === 2 ?
                            <PatientsPayment data={data} searchParamValue={searchParamValue} isUpdate={isUpdate} searchCridetia={state} /> : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={3}>
                        {tabvalue === 3 ?
                            <Charges data={data} searchParamValue={searchParamValue} isUpdate={isUpdate} searchCridetia={state} /> : null}
                    </TabPanel>
                </ShadowBox>
            </div >
        </>
    )
}
export default withSnackbar(DefaultFinancialReports)
