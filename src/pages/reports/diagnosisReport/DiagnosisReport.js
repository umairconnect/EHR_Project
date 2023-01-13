import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid, Dialog, Divider
} from "@material-ui/core";
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox, FormGroupTitle, DraggableComponent } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import { InputBaseField, SelectField } from '../../../components/InputField/InputField';

import LoadingIcon from "../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import '../../../components/SearchGrid/style.css';

import { withSnackbar } from '../../../components/Message/Alert';
import SearchList from "../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import Demographics from '../../patients/component/demographics/Demographics';
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import { IsEditable } from '../../../Services/GetUserRolesRights';
import { Add as AddDeleteIcon } from '@material-ui/icons';

function DiagnosisReport({ showMessage, ...props }) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        diagnoseId: '', diagnoseName: '', fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString(), locationId: '', locationName: '', providerId: '', providerName: '',
        status: ''
    });
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const [patientId, setPatientId] = React.useState();
    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);

    const [diagnosisList, setDiagnosisList] = useState([]);
    const [locationList, setlocationList] = useState([]);
    const [providerList, setProviderList] = useState([]);

    const [reRender, setReRender] = useState(0);

    const deleteProviderList = (code) => {

        let updatedList = providerList.map((item, i) => item.providerId == code ? { ...item, isDeleted: true } : item);
        setProviderList(updatedList);
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

    const deleteDiagnosisList = (code) => {

        let updatedList = diagnosisList.map((item, i) => item.diagnosisId == code ? { ...item, isDeleted: true } : item);
        setDiagnosisList(updatedList);
    }


    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
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

    const handleSearchDiagnosisList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (diagnosisList.filter(r => r.isDeleted == false).some(t => t.diagnosisId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    diagnosisId: '',
                    diagnosisName: '',
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

        const obj = { diagnosisId: id, diagnosisName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setDiagnosisList([...diagnosisList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                diagnosisId: '',
                diagnosisName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }


    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const statusOption = [
        { value: "Active", label: "Active" },
        { value: "Resolved", label: "Resolved" },
    ]
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
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
    const handleDiagnosisChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            diagnoseId: id,
            diagnoseName: value
        }));
    }

    function exportReport() {
        const onlyDiagnosisIds = diagnosisList.filter(d => d.isDeleted == false).map(d => d.diagnosisId).join(",");
        const onlyDiagnosisNames = diagnosisList.filter(d => d.isDeleted == false).map(d => d.diagnoseName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Patient Diagnosis Report",
            Diagnosis: diagnosisList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyDiagnosisIds+"||"+onlyDiagnosisNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Date_From: state.fromDate == undefined ? "" : formatDate(state.fromDate),
            Date_To: state.toDate == undefined ? "" : formatDate(state.toDate),
            Status: state.status ? state.status : ''
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

    function loadPatientDiagnosis() {
        const onlyDiagnosisIds = diagnosisList.filter(d => d.isDeleted == false).map(d => d.diagnosisId).join(",");
        const onlyDiagnosisNames = diagnosisList.filter(d => d.isDeleted == false).map(d => d.diagnoseName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Patient Diagnosis Report",
            Diagnosis: diagnosisList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyDiagnosisIds + "||" + onlyDiagnosisNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Date_From: state.fromDate == undefined ? "" : state.fromDate,
            Date_To: state.toDate == undefined ? "" : state.toDate,
            Status: state.status ? state.status : ''
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
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column11)} style={{ textDecoration: "underline" }}>{item.column2}</LinkS>
                        item.column3 = item.column3 ? formatDate(item.column3) : ''
                        item.column10 = item.column10 ? formatDateTime(item.column10) : ''
                        return { ...item }
                    }));
            }
        });
    }

    function clearFilter() {
        state.diagnoseId = '';
        state.diagnoseName = '';
        state.fromDate = addDays(new Date(), -30).toString();
        state.toDate = addDays(new Date(), 0).toString();
        state.locationId = '';
        state.locationName = '';
        state.providerId = '';
        state.providerName = '';
        state.status = '';
        setlocationList(clearFilterLists(locationList));
        setProviderList(clearFilterLists(providerList));
        setDiagnosisList(clearFilterLists(diagnosisList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadPatientDiagnosis();
        
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    useEffect(() => {
        loadPatientDiagnosis();
    }, [])
    return (
        <>
            <PageTitle title="Diagnosis Report" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} alignItems="baseline">
                        <Label title="Diagnosis" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                name={state.diagnoseId}
                                value={state.diagnoseId}
                                searchTerm={state.diagnoseName}
                                code="diagnosis"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchDiagnosisList(name, item)}
                                placeholderTitle="Search Diagnosis"
                                reRender={reRender}
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {diagnosisList ?

                                            diagnosisList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.diagnosisName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosisList(item.diagnosisId)}> <AddDeleteIcon /> </span>
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

                        <Label title="Diagnosed" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
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

                    <Grid container className={classes.customGrid} >

                        <Label title="Status" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="status"
                                name="status"
                                value={state.status}
                                onChange={handleChange}
                                placeholder="Select Status"
                                options={statusOption}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" onClick={loadPatientDiagnosis}>Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Button className={classes.gridButton}  >Print</Button>| */}
                        <Button className={classes.gridButton} onClick={exportReport} >Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["DiagnosisReportsColumns"]}
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
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                maxWidth="md">
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Demographics</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <div className={classes.content}>
                                <Demographics dataId={patientId} insuranceSelect={insuranceTabId} isEditable={isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <Divider />
            </Dialog>
        </>
    )
}

export default withSnackbar(DiagnosisReport)