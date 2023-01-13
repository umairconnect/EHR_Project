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
import { PostDataAPI } from '../../../Services/PostDataAPI';
import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList";
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import { Add as AddDeleteIcon } from '@material-ui/icons';


function AuditLogReport({ showMessage, ...props }) {
    const classes = useStyles();
    const options = [
        { value: "Insert", label: "Insert" },
        { value: "Update", label: "Update" },
        { value: "Delete", label: "Delete" },
        { value: "Load", label: "Load" },
    ]
    const [reRender, setReRender] = useState(0);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [locationId, setLocationId] = useState(0);

    const [patientList, setPatientList] = useState([]);
    const [userNameList, setUserNameList] = useState([]);

    const deleteUserNameList = (code) => {

        let updatedList = userNameList.map((item, i) => item.userId == code ? { ...item, isDeleted: true } : item);
        setUserNameList(updatedList);
    }

    const deletePatientList = (code) => {

        let updatedList = patientList.map((item, i) => item.patientId == code ? { ...item, isDeleted: true } : item);
        setPatientList(updatedList);
    }
    const handleSearchUserNameList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (userNameList.filter(r => r.isDeleted == false).some(t => t.userId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    userId: '',
                    userName: '',
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

        const obj = { userId: id, userName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setUserNameList([...userNameList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                userId: '',
                userName: '',
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
    const [stateFilters, setStateFilters] = useState({
        patientId: "", patientName: "", userId: "", userName: "", activity: "", fromDate: addDays(new Date(), -7).toString(),
        toDate: addDays(new Date(), 0).toString()
    });

    const [state, setState] = useState([])

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const handleSearchPatientChange = (item) => {
        const { id, value } = item;
        setStateFilters(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name === "userName") {
            setStateFilters(prevState => ({
                ...prevState,
                [name]: value,
                userId: id
            }));

        }
    }
    const handleReset = () => {
        stateFilters.patientId = '';
        stateFilters.patientName = '';
        stateFilters.userId = '';
        stateFilters.userName = '';
        stateFilters.activity = '';
        stateFilters.fromDate = addDays(new Date(), -7).toString();
        stateFilters.toDate = addDays(new Date(), 0).toString();
        setPatientList(clearFilterLists(patientList))
        setUserNameList(clearFilterLists(userNameList))
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadGrid();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    function exportReport() {
        const onlyUserIds = userNameList.filter(d => d.isDeleted == false).map(d => d.userId).join(",");
        const onlyUserNames = userNameList.filter(d => d.isDeleted == false).map(d => d.userName).join(",");
        const onlyPatientIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatientNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Audit Log",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatientIds + "||" + onlyPatientNames,
            User: userNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyUserIds + "||" + onlyUserNames,
            Activity: stateFilters.activity == "" ? "" : stateFilters.activity,
            date_from: stateFilters.fromDate == "" ? "" : formatDate(stateFilters.fromDate),
            date_to: stateFilters.toDate == "" ? "" : formatDate(stateFilters.toDate),
            is_export: "1"
        }
        if (state.fromDate > state.toDate) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
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

    function loadGrid() {
     
        const onlyUserIds = userNameList.filter(d => d.isDeleted == false).map(d => d.userId).join(",");
        const onlyUserNames = userNameList.filter(d => d.isDeleted == false).map(d => d.userName).join(",");
        const onlyPatientIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatientNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Audit Log",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatientIds + "||" + onlyPatientNames,
            User: userNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyUserIds + "||" + onlyUserNames,
            Activity: stateFilters.activity == "" ? "" : stateFilters.activity,
            date_from: stateFilters.fromDate == "" ? "" : stateFilters.fromDate,
            date_to: stateFilters.toDate == "" ? "" : stateFilters.toDate,
            is_export: "0"
        }
        if (state.fromDate > state.toDate) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);

            if (result.success && result.data != null) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.column2 = formatDateTime(item.column2);
                        return { ...item }
                    }))
            }
        });
    }
    useEffect(() => {
        loadGrid();
    }, [])
    return (
        <>
            <PageTitle title="Audit Log Report" />
            <div style={{ margin: "20px" }}>
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                        <Label title="Patient Name" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <PatientSearchList
                                id="patientId"
                                name={stateFilters.patientName}
                                value={stateFilters.patientId}
                                onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                placeholderTitle="Search Patient"
                                reRender={reRender}
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {patientList ?

                                            patientList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
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
                                            ) : ''
                                        }
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>

                        <Label title="User Name" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SearchList
                                id="userName"
                                name="userName"
                                value={stateFilters.userName}
                                searchTerm={stateFilters.userName}
                                code="providers_staff_search"
                                apiUrl="ddl/loadItems"
                                placeholderTitle="Search User"
                                isUser={true}
                                onChangeValue={(name, item) => handleSearchUserNameList(name, item)}
                                reRender={reRender}
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {userNameList ?

                                            userNameList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.userName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteUserNameList(item.userId)}> <AddDeleteIcon /> </span>
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

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                        <Label title="Activity" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                id="activity"
                                name="activity"
                                value={stateFilters.activity}
                                options={options}
                                placeholder="Select Activity"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Label title="Date From" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="fromDate"
                                        name="fromDate"
                                        value={stateFilters.fromDate}
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
                                        id="toDate"
                                        name="toDate"
                                        value={stateFilters.toDate}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>


                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" onClick={loadGrid}>Search</FormBtn>
                                <FormBtn id="reset" onClick={handleReset}>Clear Filter</FormBtn>
                            </Grid>

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
                            columns={gridCnfg["AuditLogReportColumns"]}
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
export default withSnackbar(AuditLogReport)