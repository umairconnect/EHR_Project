import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Dialog,
    Divider
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox, DraggableComponent, FormGroupTitle } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import { PostDataAPI } from '../../../Services/PostDataAPI';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";
import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList"
import Demographics from '../../patients/component/demographics/Demographics';
import { IsEditable } from '../../../Services/GetUserRolesRights';
import { Add as AddDeleteIcon } from '@material-ui/icons';

function BillingReports({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [reRender, setReRender] = useState(0);

    const [patientList, setPatientList] = useState([]);

    const [payerList, setPayerList] = useState([]);


    const deletePayerList = (code) => {

        let updatedList = payerList.map((item, i) => item.payerId == code ? { ...item, isDeleted: true } : item);
        setPayerList(updatedList);
    }

    const handleSearchPayerList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (payerList.filter(r => r.isDeleted == false).some(t => t.payerId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    payerId: '',
                    payerName: '',
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
        const obj = { payerId: id, payerName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setPayerList([...payerList, obj])

        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                payerId: '',
                payerName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }

    const deletePatientList = (code) => {

        let updatedList = patientList.map((item, i) => item.patientId == code ? { ...item, isDeleted: true } : item);
        setPatientList(updatedList);
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
    const [patientId, setPatientId] = React.useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [insuranceTabId, setInsuranceTabId] = useState(0);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        payerCode: '', payerName: '', patientId: '', patientName: '', fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
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

    const handleSearchPatientChange = (item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    function exportReport() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyPayerIds = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyPayerNames = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
        var params = {
            reportName: "Report Billing",
            Date_From: state.fromDate == undefined ? "" : formatDate(state.fromDate),
            Date_To: state.toDate == undefined ? "" : formatDate(state.toDate),
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Payer: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPayerIds + "||" + onlyPayerNames
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
    function loadReportBilling() {
      
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        const onlyPayerIds = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyPayerNames = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
        var params = {
            reportName: "Report Billing",
            Date_From: state.fromDate == undefined ? "" : state.fromDate,
            Date_To: state.toDate == undefined ? "" : state.toDate,
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Payer: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPayerIds + "||" + onlyPayerNames
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
                        item.column3 = <LinkS onClick={() => handleOpenDemographics(item.column25)} style={{ textDecoration: "underline" }}>{item.column3}</LinkS>
                        return { ...item }
                    }));
            }
        });
    }

    function clearFilter() {
        state.fromDate = addDays(new Date(), -30).toString();
        state.toDate = addDays(new Date(), 0).toString();
        state.patientId = '';
        state.patientName = '';
        state.payerCode = '';
        state.payerName = '';
        setPatientList(clearFilterLists(patientList));
        setPayerList(clearFilterLists(payerList));
        loadReportBilling();
      
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }
    useEffect(() => {
        loadReportBilling();
    }, [])
    return (
        <>
            <PageTitle title="Billing Report" />
            <div style={{ margin: "20px" }}>


                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Payer" size={4} />

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        id="payerCode"
                                        name="payerCode"
                                        value={state.payerCode}
                                        elemCode="payerName"
                                        searchTerm={state.payerName}
                                        code="get_payer"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search Payer"
                                        onChangeValue={(name, item) => handleSearchPayerList(name, item)}
                                        reRender={reRender}
                                    />

                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <div className={classes.orderTestContent}>
                                            <ul className={classes.orderList}>
                                                {payerList ?
                                                    payerList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                        if (item.isDeleted == true) { return '' }
                                                        else {
                                                            return (
                                                                <>
                                                                    <li>
                                                                        {item.payerName}
                                                                        <span className={classes.deleteIcon} onClick={() => deletePayerList(item.payerId)}> <AddDeleteIcon /> </span>
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
                                <Label title="From" size={2} />

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

                            <Grid container className={classes.textRight} direction="row" lg={12} alignItems="baseline">

                                <Grid item xs={12} sm={8} md={8} lg={8} style={{ textAlign: "right" }}>
                                    <FormBtn id="save" btnType="search" onClick={loadReportBilling}>Search</FormBtn>
                                    <FormBtn id="reset" style={{ marginRight: 0 }} onClick={clearFilter}>Clear Filter</FormBtn>
                                </Grid>

                                <Grid item xs={12} sm={3} md={3} lg={3} />
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
                            scroll={{ x: true }}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 15, 20, 30] }}
                            columns={gridCnfg["BillingReports"]}
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
    )
}
export default withSnackbar(BillingReports)