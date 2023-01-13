import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Add as AddDeleteIcon } from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import LoadingIcon from "../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import { PostDataAPI } from '../../../Services/PostDataAPI';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";

import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList";

function UnmatchedERAs({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const [traceNos, setTraceNos] = useState([]);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({ fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString() });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);


    const [patientList, setPatientList] = useState([]);

    const [insuranceList, setInsuranceList] = useState([]);

    const [reRender, setReRender] = useState(0);

    const deletePatientList = (code) => {

        let updatedList = patientList.map((item, i) => item.patientId == code ? { ...item, isDeleted: true } : item);
        setPatientList(updatedList);
    }

    const deleteInsuranceList = (code) => {

        let updatedList = insuranceList.map((item, i) => item.insuranceId == code ? { ...item, isDeleted: true } : item);
        setInsuranceList(updatedList);
    }

    const handleSearchInsuranceList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (insuranceList.filter(r => r.isDeleted == false).some(t => t.insuranceId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    insuranceId: '',
                    insuranceName: '',
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

        const obj = { insuranceId: id, insuranceName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setInsuranceList([...insuranceList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                insuranceId: '',
                insuranceName: '',
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



    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name == 'patientId') {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));
        }

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlePayerChange = (name, item, val) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id.toString(),
            [val]: value,
        }));
    }

    function exportReport() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyPayerIds = insuranceList.filter(d => d.isDeleted == false).map(d => d.insuranceId).join(",");
        const onlyPayerNames = insuranceList.filter(d => d.isDeleted == false).map(d => d.insuranceName).join(",");
       
        var params = {
            reportName: "Unmatched ERAs",
            Trace_No: state.trace_no == undefined ? "" : state.trace_no,
            Date_From: state.fromDate == undefined ? "" : formatDate(state.fromDate),
            Date_To: state.toDate == undefined ? "" : formatDate(state.toDate),
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Ins_Code: insuranceList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPayerIds + "||" + onlyPayerNames
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


    function loadReportUnmatchedERAs() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyPayerIds = insuranceList.filter(d => d.isDeleted == false).map(d => d.insuranceId).join(",");
        const onlyPayerNames = insuranceList.filter(d => d.isDeleted == false).map(d => d.insuranceName).join(",");
       
        var params = {
            reportName: "Unmatched ERAs",
            Trace_No: state.trace_no == undefined ? "" : state.trace_no,
            Date_From: state.fromDate == undefined ? "" : state.fromDate,
            Date_To: state.toDate == undefined ? "" : state.toDate,
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Ins_Code: insuranceList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPayerIds + "||" + onlyPayerNames
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
                        return { ...item }
                    }));
            }
        });
    }

    function clearFilter() {
        state.trace_no = '';
        state.fromDate = addDays(new Date(), -30).toString();
        state.toDate = addDays(new Date(), 0).toString();
        state.patientId = '';
        state.patientName = '';
        state.payerCode = '';
        state.payerName = ''; 
        setPatientList(clearFilterLists(patientList));
        setInsuranceList(clearFilterLists(insuranceList));

        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadReportUnmatchedERAs();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    const loadAllTraceNos = () => {
        var data = {
            code: "era_trace_no_Search",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", data).then((result) => {

            if (result.success && result.data != null) {
                setTraceNos(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text1 };
                    }));
            }
        })
    }
    useEffect(() => {
        loadAllTraceNos();
        loadReportUnmatchedERAs();
    }, [])
    return (
        <>
            <PageTitle title="Unmatched ERAs" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Trace#" size={4} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SelectField
                                        placeholder="Trace#"
                                        name="trace_no"
                                        value={state.trace_no}
                                        options={traceNos}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>


                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Patient" size={4} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>


                                    <PatientSearchList
                                        id="patientId"
                                        name={state.patientName}
                                        value={state.patientId}
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
                            </Grid>

                        </Grid>

                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Received" size={2} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} sm={5} md={5} lg={5}>

                                            <input
                                                type="date"
                                                id="fromDate"
                                                name="fromDate"
                                                value={state.fromDate}
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
                                                value={state.toDate}
                                                onChange={handleChange}
                                                className={classes.dateInput}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Grid>

                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Insurance" size={2} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        id="payerCode"
                                        name="payerCode"
                                        value={state.payerCode}
                                        elemCode="payerName"
                                        searchTerm={state.payerName}
                                        code="get_payer"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchInsuranceList(name, item)}
                                        placeholderTitle="Search By Insurance"
                                        reRender={reRender}
                                    />

                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <div className={classes.orderTestContent}>
                                            <ul className={classes.orderList}>
                                                {insuranceList ?

                                                    insuranceList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                        if (item.isDeleted == true) { return '' }
                                                        else {
                                                            return (
                                                                <>
                                                                    <li>
                                                                        {item.insuranceName}
                                                                        <span className={classes.deleteIcon} onClick={() => deleteInsuranceList(item.insuranceId)}> <AddDeleteIcon /> </span>
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


                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Grid sm={2} md={2} lg={2} />
                        <Grid item xs={12} sm={8} md={8} lg={8} className={classes.textRight}>

                            <FormBtn id="save" btnType="search" onClick={loadReportUnmatchedERAs}>Search</FormBtn>
                            <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>

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
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 15, 20, 30] }}
                            columns={gridCnfg["UnmatchedEra"]}
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

                {/* </ShadowBox> */}
            </div >
        </>
    )
}
export default withSnackbar(UnmatchedERAs)