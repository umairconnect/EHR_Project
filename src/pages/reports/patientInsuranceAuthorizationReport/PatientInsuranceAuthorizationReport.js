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



import { Add as AddDeleteIcon } from '@material-ui/icons';


import LoadingIcon from "../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import Demographics from '../../patients/component/demographics/Demographics';
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { formatDate } from '../../../components/Common/Extensions';
import { IsEditable } from '../../../Services/GetUserRolesRights';

function PatientInsuranceAuthorizationReport(props) {
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const { showMessage } = props;
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [patientId, setPatientId] = React.useState();

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

    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const [state, setState] = useState({
        patientId: '', patientName: '', authorizationNumber: '', dateFrom: addDays(new Date(), -30).toString(), dateTo: addDays(new Date(), 0).toString(), status: ''
    });

    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const statusOption = [
        { value: "expired", label: "Expired" },
        { value: "prior", label: "Prior" },
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }

    function exportReport() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Insurance Authorization",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Auth_Num: state.authorizationNumber == undefined ? "" : state.authorizationNumber,
            Date_From: state.dateFrom == undefined ? "" : formatDate(state.dateFrom),
            Date_To: state.dateTo == undefined ? "" : formatDate(state.dateTo),
            Status: state.status
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

    function loadInsuranceAuthReports() {
        const onlyPatIds = patientList.filter(d => d.isDeleted == false).map(d => d.patientId).join(",");
        const onlyPatNames = patientList.filter(d => d.isDeleted == false).map(d => d.patientName).join(",");
        var params = {
            reportName: "Patient Insurance Authorization",
            Patient: patientList.filter(d => d.isDeleted == false).length == 0 ? "" : onlyPatIds + "||" + onlyPatNames,
            Auth_Num: state.authorizationNumber == undefined ? "" : state.authorizationNumber,
            Date_From: state.dateFrom == undefined ? "" : state.dateFrom,
            Date_To: state.dateTo == undefined ? "" : state.dateTo,
            Status: state.status
        }
        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column11)} style={{ textDecoration: "underline", marginLeft: "auto" }}>{item.column2}</LinkS>
                        return { ...item }
                    }));
            }
        });
    }

    function clearFilter() {
        state.patientId = '';
        state.patientName = '';
        state.dateFrom = addDays(new Date(), -30).toString();
        state.dateTo = addDays(new Date(), 0).toString();
        state.authorizationNumber = '';
        state.status = '';
        setPatientList(clearFilterLists(patientList));
        loadInsuranceAuthReports();
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
    }

    const clearFilterLists = (_list) => {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }

    useEffect(() => {
        loadInsuranceAuthReports();
    }, [])
    return (
        <>
            <PageTitle title="Authorizations" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} alignItems="baseline">
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
                                placeholderTitle="Patient Name"
                                reRender={reRender}
                            />

                            {patientList.length > 0 ?
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>


                                            {patientList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
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
                                            )}
                                        </ul>
                                    </div>
                                </Grid>
                                : ''
                            }

                        </Grid>

                        <Label title="Authorization  #" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <InputBaseField
                                id="authorizationNumber"
                                name="authorizationNumber"
                                value={state.authorizationNumber}
                                placeholder="Authorization Code"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} >
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
                        <Label title="Status" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                placeholder="Select Status"
                                onChange={handleChange}
                                name="status"
                                value={state.status}
                                MaxLength='255'
                                options={statusOption}
                            />

                        </Grid>
                    </Grid>

                    <Grid container className={classes.customGrid} >
                        <Grid item xs={4} sm={4} md={4} lg={4} />
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Grid container direction="row" justify="flex-end">
                                <FormBtn id="save" btnType="search" onClick={loadInsuranceAuthReports} >Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter} style={{ marginRight: 0 }}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} />
                    </Grid>
                    {/* 
                        <Grid container className={classes.customGrid} >

                            <Grid item xs={12} sm={7} md={7} lg={7} />

                            <Grid item xs={12} sm={5} md={5} lg={3}>
                                <Grid container direction="row" justify="flex-end" >
                                    <FormBtn id="save" btnType="search" >Search</FormBtn>
                                    <FormBtn id="reset" >Clear Filter</FormBtn>
                                </Grid>

                            </Grid>

                        </Grid> */}
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
                            columns={gridCnfg["PatientInsuranceAuthorizationReportsColumns"]}
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

export default withSnackbar(PatientInsuranceAuthorizationReport)