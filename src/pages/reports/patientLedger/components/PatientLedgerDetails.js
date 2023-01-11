import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../../components/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox } from "../../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../../components/SearchGrid/style.css';
import '../../../../components/antd.css';
import '../../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../../components/Message/Alert';
import { InputBaseField } from "../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { formatCurrency } from "../../../../components/Common/Extensions";

function PatientLedgerDetails({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    let patientDetailsList = [
        {
            visit: "09/11/2021",
            payerName: "Etna",
            diagnosis: "876,026,002",
            price: '--',
            quantity: '--',
            billed: 150,
            allowed: 150,
            adjustment: 0,
            ins1Paid: 0,
            ins2Paid: 0,
            ptPaid: 20,
            insBal: 150,
            ptBal: 20,
            status: "Balance Due",
            type: "Super Bill",
            children: [
                {
                    claimNo: "121235666",
                    codeDescription: "OFFICE O/P EST LOW   20 - 29 Min",
                    mode: "Mods:  25",
                    code: "Dx Ptr: 1:0:0:0",
                    price: 50,
                    quantity: 1,
                    billed: 150,
                    allowed: 150,
                    adjustments: 0,
                    ins1Paid: 0,
                    ins2Paid: 0,
                    ptPaid: 20,
                    insBal: 150,
                    ptBal: 20,
                },
            ]
        },
        {
            visit: "09/11/2021",
            payerName: "Etna",
            diagnosis: "876,026,002",
            price: '--',
            quantity: '--',
            billed: 150,
            allowed: 150,
            adjustment: 0,
            ins1Paid: 0,
            ins2Paid: 0,
            ptPaid: 20,
            insBal: 150,
            ptBal: 20,
            status: "Not Submitted",
            type: "Super Bill",
            children: [
                {
                    claimNo: "121235666",
                    codeDescription: "OFFICE O/P EST LOW   20 - 29 Min",
                    mode: "Mods:  25",
                    code: "Dx Ptr: 1:0:0:0",
                    price: 50,
                    quantity: 1,
                    billed: 150,
                    allowed: 150,
                    adjustments: 0,
                    ins1Paid: 0,
                    ins2Paid: 0,
                    ptPaid: 20,
                    insBal: 150,
                    ptBal: 20,
                },
            ]
        },
    ];
    let list = [
        {
            key: 1,
            payerId: 54654,
            payerName: "Kaiser Permanete",
            zeroToThirtyDays: 0,
            thirtyOneToSixtyDays: 0,
            sixtyOneToNinetyDays: 0,
            ninetyOneToOneTwentyDays: 0,
            oneTwentyToPlusDays: 0,
            total: 0
        },
        {
            key: 2,
            payerId: 46546,
            payerName: "Golden Ins",
            zeroToThirtyDays: 0,
            thirtyOneToSixtyDays: 0,
            sixtyOneToNinetyDays: 0,
            ninetyOneToOneTwentyDays: 0,
            oneTwentyToPlusDays: 0,
            total: 0
        },
        {
            key: 3,
            payerId: 156464,
            payerName: "Healthier Life",
            zeroToThirtyDays: 0,
            thirtyOneToSixtyDays: 0,
            sixtyOneToNinetyDays: 0,
            ninetyOneToOneTwentyDays: 0,
            oneTwentyToPlusDays: 0,
            total: 0
        },
        {
            key: 4,
            payerId: 564654,
            payerName: "New Life Insurance",
            zeroToThirtyDays: 0,
            thirtyOneToSixtyDays: 0,
            sixtyOneToNinetyDays: 0,
            ninetyOneToOneTwentyDays: 0,
            oneTwentyToPlusDays: 0,
            total: 0
        },
    ];
    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalZeroToThirtyDays: "0-0",
        totalThirtyOneToSixtyDays: "0-0",
        totalSixtyOneToNinetyDays: "0-0",
        totalNinetyOneToOneTwentyDays: "0-0",
        totalOneTwentyToPlusDays: "0-30",
        totalAll: "0-120"
    });
    let [totalUnits, settotalUnits] = useState(0.0),
        [totalCharges, setTotalCharges] = useState(0.0),
        [totalInsurancePayments, setTotalInsurancePayments] = useState(0.0),
        [totalPatientPayment, setTotalPatientPayment] = useState(0.0),
        [totalAdjustments, setTotalAdjustments] = useState(0.0);
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [patientRowsData, setPatientRowsData] = useState([]);
    const [patientDetailsRowsData, setPatientDetailsRowsData] = useState([]);

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
        history.push(`/app/proceduredetails?id=${id}`);
    }
    function exportReport() {
        var params = {
            reportName: "procedures",
            Code: state.code == undefined ? "" : state.code,
            Date_From: state.date_from == undefined ? "" : state.date_from,
            Date_To: state.date_to == undefined ? "" : state.date_to
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
    function loadProcedureReports() {
        var params = {
            reportName: "procedures",
            code: state.code == undefined ? "" : state.code,
            date_from: state.date_from == undefined ? "" : state.date_from,
            date_to: state.date_to == undefined ? "" : state.date_to
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
                        item.reportCode = item.column1
                        item.column1 = <LinkS onClick={() => openDetailed(item.reportCode)} style={{ textDecoration: "underline" }}>{item.column1}</LinkS>
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
    // useEffect(() => {
    //     loadProcedureReports();
    // }, [])
    useEffect(() => {
        setIsLoading(true);
        setPatientRowsData(
            list.map((item, i) => {
                return { ...item }
            }))
        setPatientDetailsRowsData(
            patientDetailsList.map((item, i) => {
                item.visit = <LinkS >{item.visit}</LinkS>
                item.dos = <LinkS >{item.dos}</LinkS>
                return { ...item }
            }))
    }, [])
    const backButton = () => {
        history.push('/app/patientledgerreport');
    }
    return (
        <>
            <PageTitle title="Patient Blance/Ledger Details"
                button={<Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Patient Ledger
                </Button>}
            />
            <div style={{ margin: "20px" }}>

                <div className={classes.searchArea}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Grid container lg={12}>
                                <Label title="Patient  Name" size={4} />
                                <Grid item xs={10} sm={8} md={8} lg={8}>
                                    <InputBaseField
                                        id="code"
                                        name="code"
                                        value={state.code}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Grid container lg={12} spacing={2}>
                                <Grid item xs={12} sm={8} md={8} lg={8}>
                                    <Grid container >
                                        <Label title="Date" size={3} />
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            <InputBaseField
                                                type="date"
                                                id="date_from"
                                                name="date_from"
                                                value={state.date_from}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Label title="To" size={1} />
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            <InputBaseField
                                                type="date"
                                                id="date_to"
                                                name="date_to"
                                                value={state.date_to}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={6} md={5} lg={5}>
                                            <FormBtn id={"save"} size="small" btnType="search" onClick={loadProcedureReports}>Search</FormBtn>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={7} lg={7}>
                                            {/* <Button className={classes.gridButton} >Print</Button>| */}
                                            {/* <Button className={classes.divider}>|</Button> */}
                                            <Button className={classes.gridButton} >Export</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.gridArea}>

                    <div className="custom-grid">
                        <Table
                            // rowExpandable={true}
                            expandable={{
                                expandIcon: () => <></>,
                            }}
                            defaultExpandAllRows={true}
                            scroll={true}
                            dataSource={patientRowsData}
                            checkStrictly={true}
                            pagination={false}
                            // pagination={{ defaultPageSize: 5, showSizeChanger: false, pageSizeOptions: [5, 10, 20, 30] }}
                            columns={gridCnfg["PatientLedgerDetailsReportColumns"]}
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
                                patientRowsData && patientRowsData.length > 0 ?
                                    <Table.Summary fixed>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={1} ></Table.Summary.Cell>
                                            <Table.Summary.Cell index={2} >Total:</Table.Summary.Cell>

                                            <Table.Summary.Cell index={3} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalZeroToThirtyDays)}</Typography>
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={4} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalThirtyOneToSixtyDays)}</Typography>
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={5} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalSixtyOneToNinetyDays)}</Typography>
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={6} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalNinetyOneToOneTwentyDays)}</Typography>
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={7} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalOneTwentyToPlusDays)}</Typography>
                                            </Table.Summary.Cell>

                                            <Table.Summary.Cell index={8} >
                                                <Typography className="grid-text">{formatCurrency(stateTotalAmount.totalAll)}</Typography>
                                            </Table.Summary.Cell>

                                        </Table.Summary.Row>
                                    </Table.Summary>
                                    : null
                            )}
                        />
                    </div>
                </div>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                <Grid container direction="row" >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className={classes.tableSection}>
                            <table className={classes.proceduresTable}>
                                <thead>
                                    <tr>
                                        <th>Visit</th>
                                        <th>Payer(s)</th>
                                        <th>Diagnosis</th>
                                        <th className={classes.rightAligned}>Price</th>
                                        <th className={classes.rightAligned}>Qty</th>
                                        <th className={classes.rightAligned}>Billed</th>
                                        <th className={classes.rightAligned}>Allowed</th>
                                        <th className={classes.rightAligned}>Adjmt</th>
                                        <th className={classes.rightAligned}>Ins 1 Paid</th>
                                        <th className={classes.rightAligned}>Ins 2 Paid</th>
                                        <th className={classes.rightAligned}>Pt Paid</th>
                                        <th className={classes.rightAligned}>Ins Bal</th>
                                        <th className={classes.rightAligned}>Pt Bal</th>
                                        <th >Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientDetailsRowsData ?
                                        patientDetailsRowsData?.map((item, i) => {
                                            return <>
                                                <tr key={i} className={classes.mainRow}>
                                                    <td colSpan={1}>{item.visit}</td>
                                                    <td colSpan={1} ><strong>{item.payerName}</strong></td>
                                                    <td colSpan={1} >{item.diagnosis}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{item.price}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{item.quantity}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.billed)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.allowed)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.adjustment)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.ins1Paid)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.ins2Paid)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.ptPaid)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.insBal)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.ptBal)}</td>
                                                    <td colSpan={1} className={classes.balanceDueTd}>{item.status}</td>
                                                    <td colSpan={1} className={classes.balanceDueTd}><LinkS>{item.type}</LinkS></td>
                                                </tr>
                                                {item?.children?.map((child, j) => {
                                                    console.log('child', child)
                                                    return (
                                                        <tr key={j}>
                                                            <td colSpan={2}>{`${child.claimNo}:${child.codeDescription}`}</td>
                                                            <td colSpan={1}>{`${child.mode} ${child.code}`}</td>
                                                            {/* <td colSpan={1}></td> */}
                                                            <td colSpan={1} className={classes.rightAligned}>{child.price}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{child.quantity}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.billed)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.allowed)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.adjustment)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.ins1Paid)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.ins2Paid)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.ptPaid)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.insBal)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.ptBal)}</td>
                                                            <td colSpan={1}></td>
                                                            <td colSpan={1}></td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </>
                                        })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Grid>
                {/* </ShadowBox > */}
            </div >
        </>
    )
}
export default withSnackbar(PatientLedgerDetails)