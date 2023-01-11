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

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from "../../../components/InputField/InputField";
import SearchList from "../../../components/SearchList/SearchList";

function RemittanceReports({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const options = [
        { value: "0", label: "Option" },
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ]
    let list = [
        {
            checkDate: "09/10/2021",
            postedDate: "09/11/2021",
            depositDate: "09/12/2021",
            traceNumber: "ERA-4654654",
            insurance: "Etna Ins",
            numberOfClaims: "1",
            eraPaid: 1780,
            globalAdjustment: 0,
            actualPaid: 0,
            adjustment: 0,
            patientResponsibility: 0,
            paymentMethod: "Check",
        },
        {
            checkDate: "09/10/2021",
            postedDate: "09/11/2021",
            depositDate: "09/12/2021",
            traceNumber: "ERA-4654654",
            insurance: "Etna Ins",
            numberOfClaims: "1",
            eraPaid: 1780,
            globalAdjustment: 0,
            actualPaid: 0,
            adjustment: 0,
            patientResponsibility: 0,
            paymentMethod: "Automated Clearing house",
        },
        {
            checkDate: "09/10/2021",
            postedDate: "09/11/2021",
            depositDate: "09/12/2021",
            traceNumber: "ERA-4654654",
            insurance: "Etna Ins",
            numberOfClaims: "1",
            eraPaid: 1780,
            globalAdjustment: 0,
            actualPaid: 0,
            adjustment: 0,
            patientResponsibility: 0,
            paymentMethod: "Check",
        },
        {
            checkDate: "09/10/2021",
            postedDate: "09/11/2021",
            depositDate: "09/12/2021",
            traceNumber: "ERA-4654654",
            insurance: "Etna Ins",
            numberOfClaims: "1",
            eraPaid: 1780,
            globalAdjustment: 0,
            actualPaid: 0,
            adjustment: 0,
            patientResponsibility: 0,
            paymentMethod: "Automated Clearing house",
        },
        {
            checkDate: "09/10/2021",
            postedDate: "09/11/2021",
            depositDate: "09/12/2021",
            traceNumber: "ERA-4654654",
            insurance: "Etna Ins",
            numberOfClaims: "1",
            eraPaid: 1780,
            globalAdjustment: 0,
            actualPaid: 0,
            adjustment: 0,
            patientResponsibility: 0,
            paymentMethod: "Check",
        },
    ]
    let [totalNumberOfClaims, setTotalNumberOfClaims] = useState(1),
        [totalEraPaid, setTotalEraPaid] = useState(0),
        [totalGlobalAdjustment, setTotalGlobalAdjustment] = useState(0),
        [totalActualPaid, setTotalActualPaid] = useState(0),
        [totalAdjustment, setTotalAdjustment] = useState(0),
        [totalPatientResponsibility, setTotalPatientResponsibility] = useState(0);

        
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({ fromDate: addDays(new Date(), -30).toString(), toDate: addDays(new Date(), 0).toString() });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

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
    const openDetailed = (id) => {
        history.push(`/app/remittancereportsdetails`);
    }
    const handleSearcdhListPatientChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            patientId: id,
            patientName: value
        }));
    }
    const handlePayerChange = (name, item, val) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: value == '' ? '' : id.toString(),
            [val]: value,

        }));
    }

    useEffect(() => {
        setRowsData(
            list.map((item, i) => {
                item.traceNumber = <LinkS onClick={() => openDetailed(item.code)} style={{ textDecoration: "underline", marginLeft: "auto" }}>{item.traceNumber}</LinkS>
                return { ...item }
            }))
    }, [])
    return (
        <>
            <PageTitle title="Remittance Report" />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Label title="EOB/ERA" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="eob"
                                name="eob"
                                value={state.eob}
                                options={options}
                                placeholder="Select EOB/ERA"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Label title="Trace #" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <InputBaseField
                                id="traceNumber"
                                name="traceNumber"
                                value={state.traceNumber}
                                onChange={handleChange}
                                placeholderTitle ="Trace #"
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Label title="Date Type" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="postedDate"
                                name="postedDate"
                                value={state.postedDate}
                                options={options}
                                placeholder="Posted Date"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Label title="From" size={2} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
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

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Label title="Insurance" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="payerCode"
                                name="payerCode"
                                value={state.payerCode}
                                elemCode="payerName"
                                searchTerm={state.payerName}
                                code="get_payer"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item, elemCode) => handlePayerChange(name, item, elemCode)}
                                placeholderTitle="Search Insurance"
                            />
                        </Grid>

                        <Label title="Patient" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SearchList
                                id="patientId"
                                name="patientId"
                                value={state.patientId}
                                searchTerm={state.patientName}
                                code="patient_Search"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                placeholderTitle="Patient Name"
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>


                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" >Search</FormBtn>
                                <FormBtn id="reset" >Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Button className={classes.gridButton}  >Print</Button> */}
                        <Button className={classes.gridButton}  >Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["RemittanceReports"]}
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
                                        <Table.Summary.Cell colSpan={3}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="right">Total:</Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={5} align="left">
                                            {numberFormat(totalNumberOfClaims)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={6} align="left">
                                            {numberFormat(totalEraPaid)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={7} align="left">
                                            {numberFormat(totalGlobalAdjustment)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={8} align="left">
                                            {numberFormat(totalActualPaid)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={9} align="left">
                                            {numberFormat(totalAdjustment)}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={10} align="left">
                                            {numberFormat(totalPatientResponsibility)}
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
        </>
    )
}
export default withSnackbar(RemittanceReports)