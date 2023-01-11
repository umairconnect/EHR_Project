import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { formatCurrency, formatDate } from '../../../components/Common/Extensions';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";
import { Add as AddDeleteIcon } from '@material-ui/icons';

function UnderpaidItemReports({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const options = [
        { value: "0", label: "Option" },
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ]

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({ fromDate: addDays(new Date(), -30).toString(), ToDate: addDays(new Date(), 0).toString() });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    

    const [payerList, setPayerList] = useState([]);    

    const [reRender, setReRender] = useState(0);


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

            showMessage("Error", "Payer already selected.", "error", 3000);
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

    function exportReport() {
        const onlyCodes = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyValues = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
       
        var params = {
            reportName: "Underpaid Item Reports",
            Code: state.code == undefined ? "" : state.code,
            Date_From: state.fromDate == undefined ? "" : formatDate(state.fromDate),
            Date_To: state.ToDate == undefined ? "" : formatDate(state.ToDate),
            Ins_Code: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues
        }
        if (state.fromDate > state.ToDate) {
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


    function loadReportUnderPaid() {
        const onlyCodes = payerList.filter(d => d.isDeleted == false).map(d => d.payerId).join(",");
        const onlyValues = payerList.filter(d => d.isDeleted == false).map(d => d.payerName).join(",");
     
        var params = {
            reportName: "Underpaid Item Reports",
            Code: "",
            Date_From: state.fromDate == undefined ? "" : state.fromDate,
            Date_To: state.ToDate == undefined ? "" : state.ToDate,
            Ins_Code: payerList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues
        }
        if (state.fromDate != '' && state.ToDate!='' && state.fromDate > state.ToDate) {
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
        state.code = "";
        state.fromDate = addDays(new Date(), -30).toString();
        state.ToDate = addDays(new Date(), 0).toString();
        state.payerCode = "";
        state.payerName = "";
        setPayerList(clearFilterLists(payerList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadReportUnderPaid();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    useEffect(() => {
        if (props.location != undefined) {
            if (props.location.search != undefined && props.location.search != null && props.location.search != "") {
                setState({ fromDate: '', ToDate: '' });
                state.fromDate = '';
                state.ToDate = '';
            }
        }
        loadReportUnderPaid();
    }, [])
    return (
        <>
            <PageTitle title="Underpaid Item Report" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

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
                                        onChangeValue={(name, item, elemCode) => handleSearchPayerList(name, item, elemCode)}
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
                        </Grid>

                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="DOS From" size={2} />

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
                                                id="ToDate"
                                                name="ToDate"
                                                value={state.ToDate}
                                                onChange={handleChange}
                                                className={classes.dateInput}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Grid>

                            <Grid container className={classes.customGrid} direction="row" lg={12}>
                                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.textRight}>

                                    <FormBtn id="save" btnType="search" onClick={loadReportUnderPaid}>Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>

                                </Grid>
                                <Grid sm={2} md={2} lg={2} />
                            </Grid>

                        </Grid>

                    </Grid>




                    {/* <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Grid container spacing={1}>
                                    <Label title="DOS" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <InputBaseField
                                            type="date"
                                            id="dosFrom"
                                            name="dosFrom"
                                            value={state.dosFrom}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Label title="To" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <InputBaseField
                                            type="date"
                                            id="dosTo"
                                            name="dosTo"
                                            value={state.dosTo}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <Grid container spacing={1}>
                                    <Label title="Codes" size={2} />
                                    <Grid item xs={3} sm={4} md={3} lg={3}>
                                        <InputBaseField
                                            id="codes"
                                            name="codes"
                                            value={state.codes}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Label title="Insurance" size={3} />
                                    <Grid item xs={3} sm={4} md={3} lg={3}>
                                        <InputBaseField
                                            id="insurance"
                                            name="insurance"
                                            value={state.insurance}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <Grid container spacing={1}>
                                    <Label title="Compared By" size={4} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <InputBaseField
                                            type="date"
                                            id="toDate"
                                            name="toDate"
                                            value={state.toDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <span style={{ float: "right" }}>
                                            <FormBtn id={"save"} size="small" btnType="search">Search</FormBtn>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> */}

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
                            columns={gridCnfg["UnderpaidItemReports"]}
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
export default withSnackbar(UnderpaidItemReports)