import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../components/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import SearchList from "../../../components/SearchList/SearchList";

// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField } from "../../../components/InputField/InputField";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import PrintReportDialog from "../components/printReportDialog/PrintReportDialog";
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import { Add as AddDeleteIcon } from '@material-ui/icons';

function Procedures({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();

    let [totalUnits, settotalUnits] = useState(0.0),
        [totalCharges, setTotalCharges] = useState(0.0),
        [totalInsurancePayments, setTotalInsurancePayments] = useState(0.0),
        [totalPatientPayment, setTotalPatientPayment] = useState(0.0),
        [totalAdjustments, setTotalAdjustments] = useState(0.0);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const [state, setState] = useState({ dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString() });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [printDialogShow, setPrintDialogShow] = useState(false);
    const [procedureList, setProcedureList] = useState([]);
    
    const [reRender, setReRender] = useState(0);
    
    const deleteProcedureList = (code) => {

        let updatedList = procedureList.map((item, i) => item.procedureCode == code ? { ...item, isDeleted: true } : item);
        setProcedureList(updatedList);
    }

    const handleSearchProcedureList = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (procedureList.filter(r => r.isDeleted == false).some(t => t.procedureCode == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    procedureCode: '',
                    procedureName: '',
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
       
        const obj = { procedureCode: id, procedureName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setProcedureList([...procedureList, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                procedureCode: '',
                procedureName: '',
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
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function clearFilter() {
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        setProcedureList(clearFilterLists(procedureList));
        state.code = 0;
        state.cptName = "";
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        loadProcedureReports();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    const openDetailed = (id, description) => {
        history.push(`/app/proceduredetails?id=${id},desc=${description}`);
    }
    function exportReport() {
        const onlyCodes = procedureList.filter(d => d.isDeleted == false).map(d => d.procedureCode).join(",");
        const onlyValues = procedureList.filter(d => d.isDeleted == false).map(d => d.procedureName).join(",");
        var params = {
            reportName: "Procedures",
            code: procedureList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
            date_from: state.dateFrom == undefined ? "" : formatDate(state.dateFrom),
            date_to: state.dateTo == undefined ? "" : formatDate(state.dateTo)
        }
        setIsLoading(true);
        PostDataAPI("reports/getReports", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                
                window.location.assign("." + result.data);

            } else {
                showMessage("Error", "Unable to export as no record exists", "error", 3000);
            }
        });

    }
    function loadProcedureReports() {
        const onlyCodes = procedureList.filter(d => d.isDeleted == false).map(d => d.procedureCode).join(",");
        const onlyValues = procedureList.filter(d => d.isDeleted == false).map(d => d.procedureName).join(",");
        var params = {
            reportName: "Procedures",
            code: procedureList == undefined || procedureList.length == 0 ? "" : onlyCodes + "||"+onlyValues,
            date_from: state.dateFrom == undefined ? "" : state.dateFrom,
            date_to: state.dateTo == undefined ? "" : state.dateTo
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {

                var totalUnits = 0.0;
                var totalCharges = 0.0;
                var totalInsurancePayments = 0.0;
                var totalPatientPayment = 0.0;
                var totalAdjustments = 0.0;
                setRowsData(
                    result.data.map((item, i) => {
                        item.reportCode = item.column1;
                        item.reportDescription = item.column2;
                        item.column1 = <LinkS onClick={() => openDetailed(item.reportCode, item.reportDescription)} style={{ textDecoration: "underline" }}>{item.column1}</LinkS>
                        totalUnits += parseFloat(item.column3);
                        totalCharges += parseFloat(item.column4);
                        totalInsurancePayments += parseFloat(item.column5);
                        totalPatientPayment += parseFloat(item.column6);
                        totalAdjustments += parseFloat(item.column7);
                        return { ...item }
                    }));
                settotalUnits(totalUnits);
                setTotalCharges(totalCharges);
                setTotalInsurancePayments(totalInsurancePayments);
                setTotalPatientPayment(totalPatientPayment);
                setTotalAdjustments(totalAdjustments);
            }
        });
    }
    useEffect(() => {
        loadProcedureReports();
    }, [])
    let tableContent =
        <div className={classes.print_dialog_grid}>
            <Table
                scroll={true}
                dataSource={rowsData}
                // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                pagination={false}
                columns={gridCnfg["Procedures"]}
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
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>Total:</Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="right">
                                {numberFormat(totalUnits)}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="right">
                                {numberFormat(totalCharges)}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align="right">
                                {numberFormat(totalInsurancePayments)}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={6} align="right">
                                {numberFormat(totalPatientPayment)}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={7} align="right">
                                {numberFormat(totalAdjustments)}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </div>
    return (
        <>
            <PageTitle title="Product/Procedures" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Procedure" size={4} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        name="code"
                                        value={state.code}
                                        searchTerm={state.cptName}
                                        code="CPT"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchProcedureList(name, item)}
                                        placeholderTitle="Search Procedure"
                                        reRender={reRender}
                                    />

                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <div className={classes.orderTestContent}>
                                            <ul className={classes.orderList}>
                                                {procedureList ?

                                                    procedureList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                        if (item.isDeleted == true) { return '' }
                                                        else {
                                                            return (
                                                                <>
                                                                    <li>
                                                                        {item.procedureName}
                                                                        <span className={classes.deleteIcon} onClick={() => deleteProcedureList(item.procedureCode)}> <AddDeleteIcon /> </span>
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

                                            <InputBaseField
                                                type="date"
                                                id="date_from"
                                                name="dateFrom"
                                                value={state.dateFrom}
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
                                                name="dateTo"
                                                value={state.dateTo}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>



                            </Grid>

                            <Grid container className={classes.customGrid} direction="row" lg={12}>
                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.textRight}>

                                    <FormBtn id="save" btnType="search" onClick={loadProcedureReports}>Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearFilter} style={{ marginRight: "0" }}>Clear Filter</FormBtn>

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
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["Procedures"]}
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
                                        <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="left">Total:</Table.Summary.Cell>
                                        {/* <Table.Summary.Cell colSpan={4}></Table.Summary.Cell> */}
                                        <Table.Summary.Cell index={3} align="right">
                                            {numberFormat(totalUnits)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="right">
                                            {numberFormat(totalCharges)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={5} align="right">
                                            {numberFormat(totalInsurancePayments)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={6} align="right">
                                            {numberFormat(totalPatientPayment)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={7} align="right">
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
            <PrintReportDialog
                title="Procedure Report"
                showHideDialog={printDialogShow}
                handleClose={() => setPrintDialogShow(false)}
                children={tableContent}
            />
        </>
    )
}
export default withSnackbar(Procedures)