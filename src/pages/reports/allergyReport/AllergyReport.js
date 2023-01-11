import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Dialog, Divider
} from "@material-ui/core";
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, FormGroupTitle, DraggableComponent } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { formatDate } from '../../../components/Common/Extensions';

// styles
import useStyles from "./styles";
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import '../../../components/SearchGrid/style.css';

import { withSnackbar } from '../../../components/Message/Alert';
import SearchList from "../../../components/SearchList/SearchList";
import { SelectField } from "../../../components/InputField/InputField";
import PrintReportDialog from "../components/printReportDialog/PrintReportDialog";
import Demographics from '../../patients/component/demographics/Demographics';
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { IsEditable } from '../../../Services/GetUserRolesRights';
import { Add as AddDeleteIcon } from '@material-ui/icons';

function AllergyReport({ showMessage, ...props }) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [patientId, setPatientId] = React.useState();

    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const [state, setState] = useState({
        allergyName: '', allergyOnset: '', fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString(), locationId: '', locationName: '', providerId: '', providerName: '',
        status: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [printDialogShow, setPrintDialogShow] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    const [locationList, setlocationList] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [allergyNameList, setAllergyNameList] = useState([]);


    const [reRender, setReRender] = useState(0);

    const deleteAllergyNameList = (code) => {

        let updatedList = allergyNameList.map((item, i) => item.allergyId == code ? { ...item, isDeleted: true } : item);
        setAllergyNameList(updatedList);
    }

    const deleteProviderList = (code) => {

        let updatedList = providerList.map((item, i) => item.providerId == code ? { ...item, isDeleted: true } : item);
        setProviderList(updatedList);
    }

    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
    }

    const handleSearchAllergyNameList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (allergyNameList.filter(r => r.isDeleted == false).some(t => t.allergyId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    allergyId: '',
                    allergyName: '',
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
        const obj = { allergyId: id, allergyName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setAllergyNameList([...allergyNameList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                allergyId: '',
                allergyName: '',
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

    const [allergyOnsetOptionCodes, setAllergyOnsetOptionCodes] = useState([]);
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const statusOption = [
        { value: "1", label: "Active" },
        { value: "0", label: "In-Active" },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'status') {
            if (value == '1') {
                setState(prevState => ({
                    ...prevState,
                    'statusLabel': 'Active'
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    'statusLabel': 'In-Active'
                }));
            }
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAllergyChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        //  var label = e.target.options[e.target.selectedIndex].text;

        setState(prevState => ({
            ...prevState,
            "allergyName": value
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
        const onlyAllergyIds = allergyNameList.filter(d => d.isDeleted == false).map(d => d.allergyId).join(",");
        const onlyAllergyNames = allergyNameList.filter(d => d.isDeleted == false).map(d => d.allergyName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Allergy Report",
            Allergy_Name: allergyNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyAllergyIds+"||"+onlyAllergyNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Onset: state.allergyOnset == undefined ? "" : state.allergyOnset,
            Date_From: state.allergyOnset == 'Specific_Date' ? state.fromDate == undefined ? "" : formatDate(state.fromDate) : '',
            Date_To: state.allergyOnset == 'Specific_Date' ? state.toDate == undefined ? "" : formatDate(state.toDate) : '',
            Status: state.status == '' ? "" : state.status + "||" + state.statusLabel
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

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }
    function loadAllergyReports() {
        const onlyAllergyIds = allergyNameList.filter(d => d.isDeleted == false).map(d => d.allergyId).join(",");
        const onlyAllergyNames = allergyNameList.filter(d => d.isDeleted == false).map(d => d.allergyName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocNames = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
        const onlyProviderIds = providerList.filter(d => d.isDeleted == false).map(d => d.providerId).join(",");
        const onlyProviderNames = providerList.filter(d => d.isDeleted == false).map(d => d.providerName).join(",");
        var params = {
            reportName: "Allergy Report",
            Allergy_Name: allergyNameList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyAllergyIds + "||" + onlyAllergyNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocNames,
            Provider: providerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyProviderIds + "||" + onlyProviderNames,
            Onset: state.allergyOnset == undefined ? "" : state.allergyOnset,
            Date_From: state.allergyOnset == 'Specific_Date' ? state.fromDate == undefined ? "" : state.fromDate : '',
            Date_To: state.allergyOnset == 'Specific_Date' ? state.toDate == undefined ? "" : state.toDate : '',
            Status: state.status == '' ? "" : state.status + "||" + state.statusLabel
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column8)} style={{ textDecoration: "underline", marginLeft: "auto" }}>{item.column2}</LinkS>
                        return { ...item }
                    }));
            }
        });
    }

    function clearFilter() {
        state.allergyName = '';
        state.allergyOnset = '';
        state.fromDate = addDays(new Date(), -30).toString();
        state.toDate = addDays(new Date(), 0).toString();
        state.locationId = '';
        state.locationName = '';
        state.providerId = '';
        state.providerName = '';
        state.status = '';
        setlocationList(clearFilterLists(locationList));
        setProviderList(clearFilterLists(providerList));
        setAllergyNameList(clearFilterLists(allergyNameList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadAllergyReports();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }


    useEffect(() => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['Allergy_onset_option_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _allergyOnsetOptionCode = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'Allergy_onset_option_code':
                            _allergyOnsetOptionCode.push({ value: item.text1, label: item.text2 });

                    }
                })
                setAllergyOnsetOptionCodes(_allergyOnsetOptionCode);
            }

        });

        loadAllergyReports();

    }, []);
    const tableContent =
        <div className={classes.print_dialog_grid}>
            <Table
                scroll={true}
                dataSource={rowsData}
                // pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                pagination={false}
                columns={gridCnfg["AllergyReportsColumns"]}
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
    return (
        <>
            <PageTitle title="Allergies Report" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} alignItems="baseline" >
                        <Label title="Allergy Name" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                name="rxnorm"
                                value={state.rxnorm}
                                searchTerm={state.allergyName}
                                code="get_all_allergies"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchAllergyNameList(name, item)}
                                placeholderTitle="Search Allergy"
                                reRender={reRender}
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {allergyNameList ?

                                            allergyNameList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.allergyName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteAllergyNameList(item.allergyId)}> <AddDeleteIcon /> </span>
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
                    </Grid>

                    <Grid container className={classes.customGrid} alignItems="baseline" >


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

                        <Label title="Onset" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                name="allergyOnset"
                                value={state.allergyOnset}
                                placeholder=" Select Onset"
                                options={allergyOnsetOptionCodes}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.customGrid} alignItems="flex-start">

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

                        <Label title="Onset From" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="fromDate"
                                        name="fromDate"
                                        disabled={state.allergyOnset == 'Specific_Date' ? false : true}
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
                                        disabled={state.allergyOnset == 'Specific_Date' ? false : true}
                                        value={state.toDate}
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
                                <FormBtn id="save" btnType="search" onClick={loadAllergyReports}>Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>
                    </Grid>

                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Button className={classes.gridButton} onClick={() => setPrintDialogShow(true)}  >Print</Button>| */}
                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["AllergyReportsColumns"]}
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
            <PrintReportDialog
                title="Allergies Report"
                showHideDialog={printDialogShow}
                handleClose={() => setPrintDialogShow(false)}
                children={tableContent}
            />

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

export default withSnackbar(AllergyReport)