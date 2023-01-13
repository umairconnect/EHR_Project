import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography, Dialog,
    Divider
} from "@material-ui/core";
// components
import { FormBtn, Label, LinkS, ShadowBox, DraggableComponent, FormGroupTitle } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { formatCurrency, formatDate } from '../../../../../components/Common/Extensions';

import { withSnackbar } from '../../../../../components/Message/Alert';
import { Add as AddDeleteIcon } from '@material-ui/icons';

// styles
import "../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import { SelectField } from "../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import PatientSearchList from "../../../../../components/PatientSearchList/PatientSearchList";
import Demographics from '../../../../patients/component/demographics/Demographics';
import CloseIcon from "../../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";

function Patients({ pageChange, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [reRender, setReRender] = useState(0);
    const [patientId, setPatientId] = React.useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);

    const [patientList, setPatientList] = useState([]);

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

    const [insuranceTabId, setInsuranceTabId] = useState(0);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalZeroToThirtyDays: "0",
        totalThirtyOneToSixtyDays: "0",
        totalSixtyOneToNinetyDays: "0",
        totalNinetyOneToOneTwentyDays: "0",
        totalOneTwentyToPlusDays: "0-",
        totalAll: "0"
    });
    const [state, setState] = useState({
        patientId: '', patientName: '', dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(),
        receivableBy: '', daysRange: '', submittedStatus: '', patientStatus: 'All'
    });

    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const submittedStatus = [
        { value: "submitted", label: "Submitted" },
        { value: "not-submitted", label: "Not Submitted" }
    ]

    const receivableBy = [
        { value: "dos", label: "DOS" },
        { value: "billed", label: "Billed" },
        { value: "posted", label: "Posted" },
    ]

    const patientStatus = [
        { value: "All", label: "All" },
        { value: "Self-Pay", label: "Self Pay" },
        { value: "Insured", label: "Insured" }
    ]

    const optionsDaysRange = [
        { value: "0-30 days", label: "0-30 Days" },
        { value: "31-60 days", label: "31-60 Days" },
        { value: "61-90 days", label: "61-90 Days" },
        { value: "90-120 days", label: "90-120 Days" },
        { value: "120+ days", label: "120+ Days" },
    ]

    const [billStatusCode, setBillStatusCode] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSearchListChange = (name, item) => {

        if (!item) {
            return
        }

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            patientId: value === '' ? '' : id,
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

    function exportReport() {
        const onlyCodes = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyValues = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Account Recievable - Patients",
            recievable_by: state.receivableBy,
            submission_status: state.submittedStatus,
            days_range: state.daysRange,
            Date_From: formatDate(state.dateFrom),
            Date_To: formatDate(state.dateTo),
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
            patient_status: state.patientStatus
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

    function loadAccountRecievablePatientReports() {
        const onlyCodes = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyValues = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Account Recievable - Patients",
            recievable_by: state.receivableBy,
            submission_status: state.submittedStatus,
            days_range: state.daysRange,
            Date_From: formatDate(state.dateFrom),
            Date_To: formatDate(state.dateTo),
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyCodes + "||" + onlyValues,
            patient_status: state.patientStatus
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
                        _totalZeroToThirtyDays += parseInt(item.column4)
                        _totalThirtyOneToSixtyDays += parseInt(item.column5)
                        _totalSixtyOneToNinetyDays += parseInt(item.column6)
                        _totalNinetyOneToOneTwentyDays += parseInt(item.column7)
                        _totalOneTwentyToPlusDays += parseInt(item.column8)
                        _totalAll += parseInt(item.column9)
                        item.patientName = <LinkS onClick={() => handleOpenDemographics(item.column10)} style={{ textDecoration: "underline" }}>{item.column1}</LinkS>
                        item.zeroToThirtyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column4) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column4))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "/0/30/" + item.column1 + " : 0 - 30 Days") }}>$ {formatCurrency(parseInt(item?.column4))}</LinkS>
                            }
                        </span>
                        item.thirtyOneToSixtyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column5) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column5))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "/31/60/" + item.column1 + " : 31 - 60 Days") }}>$ {formatCurrency(parseInt(item?.column5))}</LinkS>
                            }
                        </span>
                        item.sixtyOneToNinetyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column6) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column6))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "/61/90/" + item.column1 + " : 61 - 90 Days") }}>$ {formatCurrency(parseInt(item?.column6))}</LinkS>
                            }
                        </span>
                        item.ninetyOneToOneTwentyDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column7) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column7))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "/91/120/" + item.column1 + " : 91 - 120 Days") }}>$ {formatCurrency(parseInt(item?.column7))}</LinkS>
                            }
                        </span>
                        item.oneTwentyToPlusDays = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column8) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column8))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "/120//" + item.column1 + " : 120+  Days") }}>$ {formatCurrency(parseInt(item?.column8))}</LinkS>
                            }
                        </span>
                        item.total = <span style={{ display: "flex", alignItems: "center" }}>
                            {
                                parseInt(item?.column9) <= 0 ?
                                    <span>$ {formatCurrency(parseInt(item?.column9))}</span>
                                    :
                                    <LinkS onClick={() => { pageChange(item.column10 + "/" + item.column1 + "///" + item.column1 + " : Total") }}>$ {formatCurrency(parseInt(item?.column9))}</LinkS>
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
        state.patientId = ''
        state.patientName = ''
        state.dateFrom = addDays(new Date(), -30).toString()
        state.dateTo = addDays(new Date(), 0).toString()
        state.daysRange = '';
        state.receivableBy = '';
        state.submittedStatus = '';
        state.patientStatus = 'All';
        setPatientList(clearFilterLists(patientList));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadAccountRecievablePatientReports();
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    const handleSearchPatientChange = (item) => {

        if (!item) {
            return
        }

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    useEffect(() => {
        loadAccountRecievablePatientReports();
        var params = {
            code: "DDL_List_Item_Order",
            parameters: ['BILL_STATUS',]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _BillStatusCodes = [];

                result.data.map((item, i) => {

                    if (item.text3.trim() == 'BILL_STATUS')
                        _BillStatusCodes.push({ value: item.text1, label: item.text2 });
                });

                setBillStatusCode(_BillStatusCodes);
            }
        })
    }, [])
    return (
        <>
            <div style={{ margin: "0px 10px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                        <Label title="Patient" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>

                            <PatientSearchList
                                id={8}
                                name={state.patientName}
                                value={state.patientId}
                                onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                placeholderTitle="Search Patient"
                                reRender={reRender}
                            />

                            {/* <SearchList
                                id="patientId"
                                name="patientId"
                                value={state.patientId}
                                searchTerm={state.patientName}
                                code="patient_Search"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                placeholderTitle="Patient Name"
                                reRender={reRender}
                            /> */}


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
                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Label title="Date" size={2} />

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

                        <Label title="For" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="patientStatus"
                                name="patientStatus"
                                value={state.patientStatus}
                                options={patientStatus}
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>


                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >

                                <FormBtn id="save" btnType="search" onClick={loadAccountRecievablePatientReports}>Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>


                </div>
                <ShadowBox shadowSize={3} className={classes.shadowBox}>
                    <div className={classes.gridArea}>

                        <Grid container direction="row" justify="flex-end" style={{ justifyContent: "right", marginBottom: "5px" }}>
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
                                columns={gridCnfg["AccountReceivablePatientsReportColumns"]}
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
                                                <Table.Summary.Cell index={4} align="left">
                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalZeroToThirtyDays))}</span>
                                                    </span>

                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={5} align="left">

                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalThirtyOneToSixtyDays))}</span>

                                                    </span>

                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={6} align="left">

                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalSixtyOneToNinetyDays))}</span>

                                                    </span>

                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={7} align="left">

                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalNinetyOneToOneTwentyDays))}</span>

                                                    </span>

                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={8} align="left">

                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalOneTwentyToPlusDays))}</span>

                                                    </span>

                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={9} align="left">

                                                    <span style={{ display: "flex", alignItems: "center" }}>
                                                        <span>$ {formatCurrency(parseInt(stateTotalAmount.totalAll))}</span>
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
                                <Demographics dataId={patientId} insuranceSelect={insuranceTabId} isEditable={props.isEditable} />
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

export default withSnackbar(Patients)