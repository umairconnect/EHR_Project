import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography
} from "@material-ui/core";
// components
import { FormBtn, Label, LinkS, ShadowBox } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { formatCurrency, formatDate } from '../../../../../components/Common/Extensions';
import { withSnackbar } from '../../../../../components/Message/Alert';
import { SelectField } from "../../../../../components/InputField/InputField";
// styles
import "../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/SearchGrid/antStyle.css';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';

import { Add as AddDeleteIcon } from '@material-ui/icons';

import { Table, Empty } from "antd";
function Insurance({ showMessage,pageChange, ...props }) {
    const classes = useStyles();
    const [reRender, setReRender] = useState(0);
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


    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalZeroToThirtyDays: "0",
        totalThirtyOneToSixtyDays: "0",
        totalSixtyOneToNinetyDays: "0",
        totalNinetyOneToOneTwentyDays: "0",
        totalOneTwentyToPlusDays: "0-",
        totalAll: "0"
    });
    const receivableBy = [
        { value: "dos", label: "DOS" },
        { value: "billed", label: "Billed" },
        { value: "posted", label: "Posted" },
    ]
    const optionsDaysRange = [
        { value: "0-30 days", label: "0-30 Days" },
        { value: "31-60 days", label: "31-60 Days" },
        { value: "61-90 days", label: "61-90 Days" },
        { value: "90-120 days", label: "90-120 Days" },
        { value: "120+ days", label: "120+ Days" },
    ]
    const submittedStatus = [
        { value: "submitted", label: "Submitted" },
        { value: "not-submitted", label: "Not Submitted" }
    ]
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        payerId: '', payerName: '', dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(),
        receivableBy: '', daysRange: '', submittedStatus: ''
    });
    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const handleSearchListChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            payerId: value === '' ? '' : id,
            payerName: value
        }));

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function exportReport() {
        const onlyCodes = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyValues = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
        var params = {
            reportName: "Account Recievable - Insurance",
            Payer: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
            recievable_by: state.receivableBy,
            submission_status: state.submittedStatus,
            days_range: state.daysRange,
            Date_From: formatDate(state.dateFrom),
            Date_To: formatDate(state.dateTo)
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

    function loadAccountRecievableInsuranceReports() {
        const onlyCodes = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyValues = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
        var params = {
            reportName: "Account Recievable - Insurance",
            Payer: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
            recievable_by: state.receivableBy,
            submission_status: state.submittedStatus,
            days_range: state.daysRange,
            Date_From: state.dateFrom,
            Date_To: state.dateTo
        }
        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                var _totalZeroToThirtyDays = 0
                var _totalThirtyOneToSixtyDays = 0
                var _totalSixtyOneToNinetyDays = 0
                var _totalNinetyOneToOneTwentyDays = 0
                var _totalOneTwentyToPlusDays = 0
                var _totalAll = 0
                setRowsData(
                    result.data.map((item, i) => {
                        _totalZeroToThirtyDays += parseInt(item.column2)
                        _totalThirtyOneToSixtyDays += parseInt(item.column3)
                        _totalSixtyOneToNinetyDays += parseInt(item.column4)
                        _totalNinetyOneToOneTwentyDays += parseInt(item.column5)
                        _totalOneTwentyToPlusDays += parseInt(item.column6)
                        _totalAll += parseInt(item.column7)
                        item.payer = item.column1
                        item.zeroToThirtyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column2) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column2))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "/0/30/" + item.column1 + " : 0 - 30 Days") }}>$ {formatCurrency(parseInt(item?.column2))}</LinkS>
                            }
                        </span>
                        item.thirtyOneToSixtyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column3) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column3))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "/31/60/" + item.column1 + " : 31 - 60 Days") }}>$ {formatCurrency(parseInt(item?.column3))}</LinkS>
                            }
                        </span>
                        item.sixtyOneToNinetyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column4) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column4))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "/61/90/" + item.column1 + " : 61 - 90 Days") }}>$ {formatCurrency(parseInt(item?.column4))}</LinkS>
                            }
                        </span>
                        item.ninetyOneToOneTwentyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column5) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column5))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "/91/120/" + item.column1 + " : 91 - 120 Days") }}>$ {formatCurrency(parseInt(item?.column5))}</LinkS>
                            }
                        </span>
                        item.oneTwentyToPlusDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column6) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column6))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "/120//" + item.column1 + " : 120+  Days") }}>$ {formatCurrency(parseInt(item?.column6))}</LinkS>
                            }
                        </span>
                        item.total = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column7) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column7))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column8 + "/" + item.column1 + "///" + item.column1 + " : Total") }}>$ {formatCurrency(parseInt(item?.column7))}</LinkS>
                            }
                        </span>
                        return { ...item }
                    }))
                setStateTotalAmount(prevState => ({
                    ...prevState,
                    totalZeroToThirtyDays: _totalZeroToThirtyDays,
                    totalThirtyOneToSixtyDays: _totalThirtyOneToSixtyDays,
                    totalSixtyOneToNinetyDays: _totalSixtyOneToNinetyDays,
                    totalNinetyOneToOneTwentyDays: _totalNinetyOneToOneTwentyDays,
                    totalOneTwentyToPlusDays: _totalOneTwentyToPlusDays,
                    totalAll: _totalAll,
                }));
            }
        });
    }

    function clearFilter() {
        state.payerId = '';
        state.payerName = '';
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        state.receivableBy = '';
        state.daysRange = '';
        state.submittedStatus = '';
        setPayerList(clearFilterLists(payerList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadAccountRecievableInsuranceReports();
    }
    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    useEffect(() => {
        loadAccountRecievableInsuranceReports();
    }, [])
    return (
        <div style={{ margin: "0px 10px" }}>
            {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                    <Label title="Payer" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SearchList
                            id="payerId"
                            name="payerId"
                            value={state.payerId}
                            elemCode="payerName"
                            searchTerm={state.payerName}
                            code="get_payer"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item, elemCode) => handleSearchPayerList(name, item, elemCode)}
                            reRender={reRender}
                            placeholderTitle="Payer Name"
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


                    <Label title="Aging AR by" size={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="receivableBy"
                            name="receivableBy"
                            value={state.receivableBy}
                            options={receivableBy}
                            onChange={handleChange}
                            placeholder="Select Recievable By"
                        />

                    </Grid>

                    {/*<Label title="Group By" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="groupBy"
                            name="groupBy"
                            value={state.groupBy}
                            options={optionsGroupBy}
                            onChange={handleChange}
                            placeholder="Select Group By"
                        />
                    </Grid>*/}
                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Label title="From" size={2} />

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


                    <Label title="Or" size={2} />
                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="daysRange"
                            name="daysRange"
                            value={state.daysRange}
                            options={optionsDaysRange}
                            onChange={handleChange}
                            placeholder="Days Range"
                        />
                    </Grid>

                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>


                    <Label title="Submission Status" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="submittedStatus"
                            name="submittedStatus"
                            options={submittedStatus}
                            value={state.submittedStatus}
                            onChange={handleChange}
                            placeholder="Select Submission Status"
                        />
                    </Grid>

                </Grid>


                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Grid item xs={12} sm={7} md={7} lg={7} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row" justify="flex-end" >

                            <FormBtn id="save" btnType="search" onClick={loadAccountRecievableInsuranceReports}>Search</FormBtn>
                            <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                        </Grid>

                    </Grid>

                </Grid>


            </div>


            <ShadowBox shadowSize={3} className={classes.shadowBox}>
                <div className={classes.gridArea}>

                    <Grid container justify="right" style={{ justifyContent: "right", marginBottom: "5px" }}>
                        {/* <Button className={classes.gridButton} >Print</Button>
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
                            columns={gridCnfg["AccountReceivableInsuranceReportColumns"]}
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
                                            <Table.Summary.Cell index={1} align="center">Total:</Table.Summary.Cell>
                                            <Table.Summary.Cell index={2} align="left">
                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalZeroToThirtyDays))}</span>
                                                    }
                                                </span>

                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={3} align="left">

                                                <span style={{ display: "flex", alignItems: "center" }}>

                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalThirtyOneToSixtyDays))}</span>
                                                    }

                                                </span>

                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={4} align="left">

                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalSixtyOneToNinetyDays))}</span>
                                                    }
                                                </span>

                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={5} align="left">

                                                <span style={{ display: "flex", alignItems: "center" }}>

                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalNinetyOneToOneTwentyDays))}</span>
                                                    }
                                                </span>

                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={6} align="left">

                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalOneTwentyToPlusDays))}</span>
                                                    }
                                                </span>

                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={7} align="left">

                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    {
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalAll))}</span>
                                                    }
                                                </span>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                    : null
                            )}
                        />
                    </div>

                </div>
            </ShadowBox>
        </div >
    )
}
export default withSnackbar(Insurance)