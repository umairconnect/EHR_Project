import React, { useState, useEffect } from "react";
//material ui
import {
    Grid, Button, FormLabel,
    Dialog,
    Divider
} from "@material-ui/core"
//
// components
import PageTitle from "../../../components/PageTitle";
import { Label, FormBtn, LinkS, ShadowBox, DraggableComponent, FormGroupTitle } from "../../../components/UiElements/UiElements"
import { SelectField } from "../../../components/InputField/InputField"
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import SearchList from "../../../components/SearchList/SearchList";

import { Add as AddDeleteIcon } from '@material-ui/icons';

// styles
import "../../../components/antd.css";
import useStyles from "./styles";
import { withSnackbar } from "../../../components/Message/Alert";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";

import '../../../components/SearchGrid/style.css';
import '../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import Demographics from '../../patients/component/demographics/Demographics';
import { formatDate } from '../../../components/Common/Extensions';
import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList"
import { IsEditable } from '../../../Services/GetUserRolesRights';

function TransactionsByAppointment(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [isLoading, setIsLoading] = useState(false);
    const [locationId, setLocationId] = useState(0);
    //const [showSearchFilter, setshowSearchFilter] = useState(true);
    const [rowsData, setRowsData] = useState([{}]);
    const [patients, setPatients] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [patientId, setPatientId] = React.useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [insuranceTabId, setInsuranceTabId] = useState(0);

    const [patientList, setPatientList] = useState([]);
    const [locationList, setlocationList] = useState([]);

    const deletePatientList = (code) => {

        let updatedList = patientList.map((item, i) => item.patientId == code ? { ...item, isDeleted: true } : item);
        setPatientList(updatedList);
    }


    const deleteLocationList = (code) => {

        let updatedList = locationList.map((item, i) => item.locationId == code ? { ...item, isDeleted: true } : item);
        setlocationList(updatedList);
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

    //
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        locationId: 0, locationName: '', patientId: 0, patientName: '',
        dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString()
    });
    //addDays(new Date(), -31).toString()
    //addDays(new Date(), 0).toString()
    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalBill: 0,
        totalAdjustments: 0,
        totalInsPaid: 0,
        totalPtPaid: 0,
    });

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        Initilization();
        loadTransactionByAppointmentData();
    }, []);

    const openPatientDetails = (id) => {

    }

    const handleChangePatientId = (item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }

    const Initilization = () => {

        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);
        if (primaryLocation[0]) setLocationId(primaryLocation[0].id);

        var params = {
            code: "get_all_patients",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPatients(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })

    }

    function exportReport() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocName = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");
     
        var params = {
            reportName: "Transactions by Appointment",
            Date_From: state.dateFrom == undefined ? "" : formatDate(state.dateFrom),
            Date_To: state.dateTo == undefined ? "" : formatDate(state.dateTo),
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocName,
            Room: state.roomID == undefined ? "" : state.roomID.toString()
        }
        if (state.dateFrom > state.dateTo) {
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

    const loadTransactionByAppointmentData = () => {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyLocIds = locationList.filter(d => d.isDeleted == false).map(d => d.locationId).join(",");
        const onlyLocName = locationList.filter(d => d.isDeleted == false).map(d => d.locationName).join(",");

        var params = {
            reportName: "Transactions by Appointment",
            Date_From: state.dateFrom == undefined ? "" : state.dateFrom,
            Date_To: state.dateTo == undefined ? "" : state.dateTo,
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Location: locationList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyLocIds + "||" + onlyLocName,
            Room: state.roomID == undefined ? "" : state.roomID.toString()
        }
        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        setIsLoading(true);
        setRowsData([{}]);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                let _totalBill = 0;
                let _totalAdjustmentAmount = 0;
                let _totalInsPaidAmount = 0;
                let _totalPtPaid = 0;
                setRowsData(
                    result.data.map((item, i) => {
                        item.column1 = item.column1;
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column12)} style={{ textDecoration: "underline" }}>{item.column2}</LinkS>
                        let itemTotalBill = 0;
                        let itemAdjustmentAmount = 0;
                        let itemInsPaidAmount = 0;
                        let itemPtPaid = 0;
                        itemTotalBill += parseFloat(item.column5);
                        itemAdjustmentAmount += parseFloat(item.column6);
                        itemInsPaidAmount += parseFloat(item.column7);
                        itemPtPaid += parseFloat(item.column8);
                        item.children.map((childItem, j) => {
                            itemTotalBill += parseFloat(childItem.column5);
                            itemAdjustmentAmount += parseFloat(childItem.column6);
                            itemInsPaidAmount += parseFloat(childItem.column7);
                            itemPtPaid += parseFloat(childItem.column8);
                            return { ...childItem }
                        });
                        item.totalBilled = "Total: " + itemTotalBill;
                        item.totalAdjustments = itemAdjustmentAmount;
                        item.totalInsurancePaid = itemInsPaidAmount;
                        item.totalPaymentPaid = itemPtPaid;

                        _totalBill += itemTotalBill;
                        _totalAdjustmentAmount += itemAdjustmentAmount;
                        _totalInsPaidAmount += itemInsPaidAmount;
                        _totalPtPaid += itemPtPaid;
                        return { ...item }
                    }))

                setStateTotalAmount(prevState => ({
                    ...prevState,
                    totalBill: _totalBill,
                    totalAdjustments: _totalAdjustmentAmount,
                    totalInsPaid: _totalInsPaidAmount,
                    totalPtPaid: _totalPtPaid,
                }));
            }
        });
    }

    const clearValues = () => {
        state.locationId = '';
        state.locationName = '';
        state.patientId = '';
        state.patientName = '';
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        state.roomID = '';
        setRooms([]);
        setPatientList(clearFilterLists(patientList));
        setlocationList(clearFilterLists(locationList));
        
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadTransactionByAppointmentData();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
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

    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }


    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    return (
        <>
            <PageTitle title="Transactions by Appointment" />

            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                    <Label title="Patient" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3}>

                        <SearchList
                            id="patientId"
                            name="patientId"
                            value={state.patientId}
                            searchTerm={state.patientName}
                            code="patient_Search"
                            apiUrl="ddl/loadItems"
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
                        {/* <PatientSearchList
                            id="patientId"
                            name={state.patientName}
                            value={state.patientId}
                            onChangeValue={(item) => handleChangePatientId(item)}
                            placeholderTitle="Search Patient"
                            reRender={reRender}
                        /> */}
                    </Grid>
                    <Label title="Date From" size={2} />

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

                <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                    <Label title="Location" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3}>
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
                    {/*<Label title="Room" size={2} />
                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="roomID"
                            name="roomID"
                            value={state.roomID}
                            options={rooms}
                            onChange={handleChange}
                            placeholder="Select Room"
                        />
                    </Grid>*/}
                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Grid item xs={12} sm={7} md={7} lg={7} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row" justify="flex-end" >

                            <FormBtn id="save" onClick={loadTransactionByAppointmentData} btnType="search" >Search</FormBtn>
                            <FormBtn id="reset" onClick={clearValues} >Clear Filter</FormBtn>
                            {/* <FormBtn id="reset" onClick={exportReport} >Export</FormBtn> */}

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
                        rowExpandable={true}
                        expandable={{
                            expandIcon: () => <></>,
                        }}
                        defaultExpandAllRows={true}
                        scroll={true}
                        dataSource={rowsData}
                        checkStrictly={true}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                        columns={gridCnfg["TransactionsByAppointmentColumns"]}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={isLoading && LoadingIcon}
                                    description={isLoading ? "Loading..." : "No Record Found"}
                                    imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                />
                            )
                        }}

                        summary={() => (
                            rowsData && rowsData.length > 0 ?
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="center">Total:</Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="right">

                                            {numberFormat(stateTotalAmount.totalBill)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={5} align="right">

                                            {numberFormat(stateTotalAmount.totalAdjustments)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={6} align="right">

                                            {numberFormat(stateTotalAmount.totalInsPaid)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={7} align="right">

                                            {numberFormat(stateTotalAmount.totalPtPaid)}

                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                                : null
                        )}
                    />
                </div>

            </div>

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                maxWidth="md"
            >
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

                {/* </Scrollbars> */}
            </Dialog>

        </>
    );
}
export default withSnackbar(TransactionsByAppointment)

