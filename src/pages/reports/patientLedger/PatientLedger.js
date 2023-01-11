import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
// components
import { FormBtn, Label, LinkS, ShadowBox } from "../../../components/UiElements/UiElements";
import SearchList from "../../../components/SearchList/SearchList";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { formatCurrency } from '../../../components/Common/Extensions';
import { withSnackbar } from '../../../components/Message/Alert';

import PatientSearchList from "../../../components/PatientSearchList/PatientSearchList"

import { Add as AddDeleteIcon } from '@material-ui/icons';

// styles
import "../../../components/antd.css";
import useStyles from "./style";
//
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import '../../../components/SearchGrid/style.css';
import '../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { PostDataAPI } from '../../../Services/PostDataAPI';
function PatientLedger({ pageChange, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const { showMessage } = props;
    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalZeroToThirtyDays: "0.0",
        totalThirtyOneToSixtyDays: "0.0",
        totalSixtyOneToNinetyDays: "0.0",
        totalNinetyOneToOneTwentyDays: "0.0",
        totalOneTwentyToPlusDays: "0.0",
        totalAll: "0.0"
    });
    const [state, setState] = useState({ patientId: '', patientName: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    const [patientList, setPatientList] = useState([]);

    const [reRender, setReRender] = useState(0);


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
    const handleChangePatientId = (item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    function clearFilter() {
        state.patientId = '';
        state.patientName = '';
        setPatientList(clearFilterLists(patientList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadLedgerReports();
     
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    function printReport() {
        showMessage("Information", "Feature will be added soon.", "info", 2000);
    }
    function search() {
        loadLedgerReports();
    }
    useEffect(() => {
        loadLedgerReports();
    }, [])
    const openDetailed = (id) => {
        history.push(`/app/patientledgerdetailsreport`);
    }

    function exportReport() {
        const onlyCodes = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyValues = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Ledger",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues
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
    function loadLedgerReports() {
        const onlyCodes = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyValues = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Ledger",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {

                var _totalZeroToThirtyDays = 0.0;
                var _totalThirtyOneToSixtyDays = 0.0;
                var _totalSixtyOneToNinetyDays = 0.0;
                var _totalNinetyOneToOneTwentyDays = 0.0;
                var _totalOneTwentyToPlusDays = 0.0;
                var _totalAll = 0.0;
                setRowsData(
                    result.data.map((item, i) => {
                        item.reportCode = item.column1;
                        item.reportDescription = item.column2;
                        //item.column1 = <LinkS onClick={() => openDetailed(item.reportCode, item.reportDescription)} style={{ textDecoration: "underline" }}>{item.column1}</LinkS>
                        _totalZeroToThirtyDays += parseFloat(item.column3);
                        _totalThirtyOneToSixtyDays += parseFloat(item.column4);
                        _totalSixtyOneToNinetyDays += parseFloat(item.column5);
                        _totalNinetyOneToOneTwentyDays += parseFloat(item.column6);
                        _totalOneTwentyToPlusDays += parseFloat(item.column7);
                        _totalAll += parseFloat(item.column8);
                        return { ...item }
                    }));

                setStateTotalAmount(prevState => ({
                    ...prevState,
                    totalZeroToThirtyDays: _totalZeroToThirtyDays,
                    totalThirtyOneToSixtyDays: _totalThirtyOneToSixtyDays,
                    totalSixtyOneToNinetyDays: _totalSixtyOneToNinetyDays,
                    totalNinetyOneToOneTwentyDays: _totalNinetyOneToOneTwentyDays,
                    totalOneTwentyToPlusDays: _totalOneTwentyToPlusDays,
                    totalAll: _totalAll
                }));
            }
        });
    }
    return (
        <>
            <PageTitle title="Patient Balance Ledger" />
            <div style={{ margin: "20px" }}>
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Patient Name" size={4} />

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

                            <Grid container className={classes.customGrid} direction="row" lg={12}>
                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.textRight}>
                                    <FormBtn id="save" btnType="search" onClick={search}>Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>

                                </Grid>
                                <Grid sm={2} md={2} lg={2} />
                            </Grid>

                        </Grid>

                    </Grid>




                </div>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                <div className={classes.gridArea}>
                    <Grid container style={{ justifyContent: "right", marginBottom: "5px" }} >
                        {/* <Button className={classes.gridButton} onClick={printReport}>Print</Button>
                            <Button className={classes.divider}>|</Button> */}
                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>

                    </Grid>

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
                            columns={gridCnfg["PatientLedgerReportColumns"]}
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
                                            <Table.Summary.Cell index={1} ></Table.Summary.Cell>
                                            <Table.Summary.Cell index={2} >Total:</Table.Summary.Cell>

                                            <Table.Summary.Cell index={3} >
                                                {formatCurrency(stateTotalAmount.totalZeroToThirtyDays)}
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={4} >
                                                {formatCurrency(stateTotalAmount.totalThirtyOneToSixtyDays)}
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={5} >
                                                {formatCurrency(stateTotalAmount.totalSixtyOneToNinetyDays)}
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={6} >
                                                {formatCurrency(stateTotalAmount.totalNinetyOneToOneTwentyDays)}
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={7} >
                                                {formatCurrency(stateTotalAmount.totalOneTwentyToPlusDays)}
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={8} >
                                                {formatCurrency(stateTotalAmount.totalAll)}
                                            </Table.Summary.Cell>

                                        </Table.Summary.Row>
                                    </Table.Summary>
                                    : null
                            )}
                        />
                    </div>

                </div>
                {/* </ShadowBox> */}
            </div >
        </>
    )
}
export default withSnackbar(PatientLedger)