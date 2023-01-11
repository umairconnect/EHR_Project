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

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import { formatDate } from '../../../components/Common/Extensions';

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
import { IsEditable } from '../../../Services/GetUserRolesRights';
import { Add as AddDeleteIcon } from '@material-ui/icons';


function MedicationReport({ showMessage, ...props }) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        rxnorm: '', drugName: '', dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(), locationId: '', locationName: '', providerId: '', providerName: ''
    });
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [patientId, setPatientId] = React.useState();

    const [locationList, setlocationList] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [medicationNameList, setMedicationNameList] = useState([]);

    const [reRender, setReRender] = useState(0);

    const deleteMedicationNameList = (code) => {

        let updatedList = medicationNameList.map((item, i) => item.medicationId == code ? { ...item, isDeleted: true } : item);
        setMedicationNameList(updatedList);
    }


    const deleteProviderList = (code) => {

        let updatedList = providerList.map((item, i) => item.providerId == code ? { ...item, isDeleted: true } : item);
        setProviderList(updatedList);
    }

    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
    }

    const handleSearchMedicationNameList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (medicationNameList.filter(r => r.isDeleted == false).some(t => t.medicationId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    medicationId: '',
                    medicationName: '',
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

        const obj = { medicationId: id, medicationName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setMedicationNameList([...medicationNameList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                medicationId: '',
                medicationName: '',
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

    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const closeDemographics = () => { setDemographicsDialogOpenClose(false); }

    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDrugChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            rxnorm: id,
            drugName: value
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

    function clearFilter() {
        state.rxnorm = '';
        state.drugName = '';
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        state.locationId = '';
        state.locationName = '';
        state.providerId = '';
        state.providerName = '';
        setlocationList(clearFilterLists(locationList));
        setProviderList(clearFilterLists(providerList));
        setMedicationNameList(clearFilterLists(medicationNameList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadMedicineReports();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }

    function loadMedicineReports() {
        const onlyMedIds = medicationNameList.filter(d => d.isDeleted == false).map(d => d.medicationId).join(",");
        const onlyMedNames = medicationNameList.filter(d => d.isDeleted == false).map(d => d.medicationName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Medication Report",
            Medication_Name: medicationNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyMedIds + "||" + onlyMedNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Date_From: state.dateFrom == undefined ? "" : state.dateFrom,
            Date_To: state.dateTo == undefined ? "" : state.dateTo

        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column9)} style={{ textDecoration: "underline" }}>{item.column2}</LinkS>
                        return { ...item }
                    }));
            }
        });
    }

    function exportReport() {
        const onlyMedIds = medicationNameList.filter(d => d.isDeleted == false).map(d => d.medicationId).join(",");
        const onlyMedNames = medicationNameList.filter(d => d.isDeleted == false).map(d => d.medicationName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Medication Report",
            Medication_Name: medicationNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyMedIds + "||" + onlyMedNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Date_From: state.dateFrom == undefined ? "" : formatDate(state.dateFrom),
            Date_To: state.dateTo == undefined ? "" : formatDate(state.dateTo)

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

    useEffect(() => {
        loadMedicineReports();
    }, [])
    return (
        <>
            <PageTitle title="Medication Report" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} alignItems="baseline">
                        <Label title="Medication Name" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                name="rxnorm"
                                value={state.rxnorm}
                                searchTerm={state.drugName}
                                code="drugs"
                                apiUrl="ddl/loadItems"
                                placeholderTitle="Search Medication"
                                onChangeValue={(name, item) => handleSearchMedicationNameList(name, item)}
                                reRender={reRender}
                            />

                            {medicationNameList.length > 0 ?
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>


                                            {medicationNameList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.medicationName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteMedicationNameList(item.medicationId)}> <AddDeleteIcon /> </span>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            }
                                            )}
                                        </ul>
                                    </div>
                                </Grid> : ''
                            }
                        </Grid>

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
                            {locationList.length > 0 ?
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>


                                            {locationList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
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
                                            )}

                                        </ul>
                                    </div>
                                </Grid> : ''}
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} alignItems="baseline">

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
                        <Label title="Prescribed" size={2} />
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
                    </Grid>

                    <Grid container className={classes.customGrid} >

                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" onClick={loadMedicineReports}>Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Button className={classes.gridButton}  >Print</Button>| */}
                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["MedicationReportsColumns"]}
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

export default withSnackbar(MedicationReport)