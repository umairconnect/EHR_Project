import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    FormLabel,
    Dialog,
    Divider
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../../../components/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox, DraggableComponent, FormGroupTitle } from "../../../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { Table, Empty } from "antd";
import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";
import CloseIcon from "../../../../../images/icons/math-plus.png"
import Demographics from '../../../../patients/component/demographics/Demographics';
// styles
import useStyles from "./styles";
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/antd.css';
import '../../../../../components/SearchGrid/antStyle.css';
import SearchList from "../../../../../components/SearchList/SearchList";

import { withSnackbar } from '../../../../../components/Message/Alert';
import { InputBaseField, CheckboxField } from "../../../../../components/InputField/InputField";
import { IsEditable } from '../../../../../Services/GetUserRolesRights';
import { formatDate } from '../../../../../components/Common/Extensions';

function ProcedureDetails({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    let [reportCode, setReportCode] = useState('');
    let [chargesCount, setChargeCount] = useState(0);
    const [insuranceTabId, setInsuranceTabId] = useState(0);

    let [totalUnits, settotalUnits] = useState(0.0),
        [totalCharges, setTotalCharges] = useState(0.0),
        [totalInsurancePayments, setTotalInsurancePayments] = useState(0.0),
        [totalPatientPayment, setTotalPatientPayment] = useState(0.0),
        [totalAdjustments, setTotalAdjustments] = useState(0.0);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const [state, setState] = useState({ payerCode: '', payerName: '', fromDate: addDays(new Date(), -30).toString(), ToDate: addDays(new Date(), 0).toString(), onlySelf: false });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [patientId, setPatientId] = React.useState();

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const backButton = () => {
        history.push('/app/procedures');
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
    const openInsurance = (patientID) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(patientID)
        setInsuranceTabId(3)
    }

    const handleOpenDemographics = (patientID) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(patientID)
        setInsuranceTabId(0)
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    function clearFilter() {
        state.payerCode = '';
        state.payerName = '';
        state.fromDate = addDays(new Date(), -30).toString();
        state.ToDate = addDays(new Date(), 0).toString();
        state.onlySelf = false;
        loadReportDetails();
    }

    function exportReport() {
        var _reportCode;
        if (props.location.search != null && props.location.search != "" && props.location.search.split('=').length > 1) {
            _reportCode = (props.location.search.split('?')[1].split(',')[0].split('=')[1]);
        }
        setIsLoading(true);
        var params = {
            reportName: "Procedure Details",
            Code: _reportCode,
            Date_From: state.fromDate == undefined ? "" : formatDate(state.fromDate),
            Date_To: state.ToDate == undefined ? "" : formatDate(state.ToDate),
            Ins_Code: state.onlySelf == false ? ((state.payerCode == undefined || state.payerCode == 0) ? "" : state.payerCode + "||" + state.payerName) : '',
            only_self: state.onlySelf + ""
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


    function loadReportDetails() {
        var _reportCode;
        var _reportDescription;

        if (props.location.search != null && props.location.search != "" && props.location.search.split('=').length > 1) {
            _reportCode = (props.location.search.split('?')[1].split(',')[0].split('=')[1]);
            _reportDescription = (props.location.search.split('?')[1].split(',')[1].split('=')[1]);
            if (_reportDescription.split('-').length == 1) {
                _reportDescription = _reportCode + " - " + _reportDescription;
            }
            setReportCode(_reportDescription.replaceAll('%20', ' '));
        }
        var params = {
            reportName: "Procedure Details",
            Code: _reportCode,
            Date_From: state.fromDate == undefined ? "" : state.fromDate,
            Date_To: state.ToDate == undefined ? "" : state.ToDate,
            Ins_Code: state.onlySelf == false ? ((state.payerCode == undefined || state.payerCode == 0) ? "" : state.payerCode + "||" + state.payerName) : '',
            only_self: state.onlySelf + ""
        }
        PostDataAPI("reports/loadReportGrid", params).then((result) => {

            if (result.success && result.data != null) {

                var totalUnits = 0.0;
                var totalCharges = 0.0;
                var totalInsurancePayments = 0.0;
                var totalPatientPayment = 0.0;
                var totalAdjustments = 0.0;
                var totalReports = 0;
                setRowsData(
                    result.data.map((item, i) => {
                        item.appointmentId = item.column9
                        item.patientId = item.column10
                        item.payerId = item.column11
                        item.units = item.column4
                        item.charges = item.column5
                        item.insurancePayments = item.column6
                        item.patientPayment = item.column7
                        item.adjustmentPayment = item.column8
                        item.column1 = item.column1
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column10)} style={{ textDecoration: "underline" }}>{item.column2} </LinkS>
                        item.column3 = <LinkS onClick={() => openInsurance(item.column10)} style={{ textDecoration: "underline" }}>{item.column3}</LinkS>
                        totalUnits += parseFloat(item.units);
                        totalCharges += parseFloat(item.charges);
                        totalInsurancePayments += parseFloat(item.insurancePayments);
                        totalPatientPayment += parseFloat(item.patientPayment);
                        totalAdjustments += parseFloat(item.adjustmentPayment);
                        totalReports++;
                        return { ...item }
                    }));
                settotalUnits(totalUnits);
                setTotalCharges(totalCharges);
                setTotalInsurancePayments(totalInsurancePayments);
                setTotalPatientPayment(totalPatientPayment);
                setTotalAdjustments(totalAdjustments);
                setChargeCount(totalReports);
            }
        });
    }
    const handleCheckBoxChange = (e) => {

        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    useEffect(() => {
        if (props.location.search != null && props.location.search != "" && props.location.search.split('=').length > 1) {

            loadReportDetails();
        }

    }, [])
    return (
        <>
            <PageTitle title="Products/Procedures details"
                button={<Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Procedures
                </Button>}
            />
            <div style={{ margin: "20px" }}>
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Insurance" size={4} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        id="payerCode"
                                        name="payerCode"
                                        value={state.payerCode}
                                        elemCode="payerName"
                                        searchTerm={state.payerName}
                                        code="get_payer"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search Insurance"
                                        onChangeValue={(name, item, elemCode) => handlePayerChange(name, item, elemCode)}
                                        isDisabled={state.onlySelf}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Date" size={2} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <InputBaseField
                                                type="date"
                                                id="fromDate"
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
                                                id="ToDate"
                                                name="ToDate"
                                                value={state.ToDate}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>



                        </Grid>
                    </Grid>


                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                      <Grid item xs={2} lg={2} md={2} sm={2} />

                        <Grid item xs={5} lg={5} md={5} sm={5}>
                            <CheckboxField
                                color="primary"
                                name="onlySelf"
                                checked={state.onlySelf}
                                onChange={handleCheckBoxChange}
                                label="Show self only"
                            />
                        </Grid>



                        <Grid item xs={12} sm={3} md={3} lg={3} className={classes.textRight}>

                            <FormBtn id={"save"} size="small" btnType="search" onClick={loadReportDetails}>Search</FormBtn>
                            <FormBtn id="reset" size="small" onClick={clearFilter} style={{marginRight: '0px'}}>Clear Filter</FormBtn>

                        </Grid>
                 

                    </Grid>

                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        <FormLabel className={classes.title}>{"Details for: " + reportCode + " ( " + chargesCount + " Charges ) "}</FormLabel>
                        <Button style={{ float: "right" }} className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>


                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["ProcedureDetails"]}
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
                            summary={() => (
                                // rowsData && rowsData.length > 0 ?
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="right">Total:</Table.Summary.Cell>
                                        {/* <Table.Summary.Cell colSpan={4}></Table.Summary.Cell> */}
                                        <Table.Summary.Cell index={4} align="right">

                                            {numberFormat(totalUnits)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={5} align="right">
                                            {numberFormat(totalCharges)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={6} align="right">
                                            {numberFormat(totalInsurancePayments)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={7} align="right">
                                            {numberFormat(totalPatientPayment)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={8} align="right">
                                            {numberFormat(totalAdjustments)}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                                // : null
                            )}
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
export default withSnackbar(ProcedureDetails)