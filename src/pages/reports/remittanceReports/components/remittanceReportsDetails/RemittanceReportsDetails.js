import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    FormLabel
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import { FormBtn, Label, LinkS, ShadowBox } from "../../../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/antd.css';
import '../../../../../components/SearchGrid/antStyle.css';

import { withSnackbar } from '../../../../../components/Message/Alert';
import { InputBaseField } from "../../../../../components/InputField/InputField";

function RemittanceReportsDetails({ showMessage, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    let list = [
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
        {
            number: '001',
            patient: "Jasmine John",
            appointment: "08/05/2021",
            insuranceId: "014523",
            checkDate: "08/05/2021",
            rejected: 0,
            billed: 0,
            adjusted: 0,
            coInsurance: 0,
            patientResponsibility: 0,
            paid: 0,
            notes: "Wayne White",
            units: "1",
            status: "pending",
        },
    ]
    let [totalUnits, settotalUnits] = useState(0.0),
        [totalCharges, setTotalCharges] = useState(0.0),
        [totalInsurancePayments, setTotalInsurancePayments] = useState(0.0),
        [totalPatientPayment, setTotalPatientPayment] = useState(0.0),
        [totalAdjustments, setTotalAdjustments] = useState(0.0);
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const backButton = () => {
        history.push('/app/remittancereports');
    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    useEffect(() => {
        setRowsData(
            list.map((item, i) => {
                item.appointment = <LinkS style={{ textDecoration: "underline" }}>{item.appointment}</LinkS>
                item.patient = <LinkS style={{ textDecoration: "underline" }}>{item.patient}</LinkS>
                item.payer = <LinkS style={{ textDecoration: "underline" }}>{item.payer}</LinkS>
                return { ...item }
            }))
    }, [])
    return (
        <>
            <PageTitle title="Remittance Report details"
                button={<Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Remittance Reports
                </Button>}
            />
            <div style={{ margin: "20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                {/* {!!eob ? */}
                <div className={classes.searchArea}>

                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={8} md={7} lg={5}>
                            <Grid container lg={12}>
                                <Label title="Insurance" size={3} />
                                <Grid item xs={10} sm={8} md={8} lg={8}>
                                    <InputBaseField
                                        id="insurance"
                                        name="insurance"
                                        value={state.insurance}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2} md={1} lg={1}>
                            {/* <span style={{ float: "center", width: "100%" }}> */}
                            < FormBtn id={"save"} size="small" btnType="update" > Update</FormBtn>
                            {/* </span> */}
                        </Grid>
                        <Grid item xs={12} sm={2} md={4} lg={6} />
                    </Grid>

                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        <FormLabel className={classes.title}>Demo 568256996 from Etna Insurance</FormLabel>
                        <FormLabel className={classes.title}>1 Claim (s)</FormLabel>
                    </div>

                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                            columns={gridCnfg["RemittanceReportsDetails"]}
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
                        // summary={() => (
                        //     // rowsData && rowsData.length > 0 ?
                        //     <Table.Summary fixed>
                        //         <Table.Summary.Row>
                        //             <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                        //             <Table.Summary.Cell index={3} align="center">Total:</Table.Summary.Cell>
                        //             {/* <Table.Summary.Cell colSpan={4}></Table.Summary.Cell> */}
                        //             <Table.Summary.Cell index={4} align="left">
                        //                 {numberFormat(totalUnits)}
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={5} align="left">
                        //                 {numberFormat(totalCharges)}
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={6} align="left">
                        //                 {numberFormat(totalInsurancePayments)}
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={7} align="left">
                        //                 {numberFormat(totalPatientPayment)}
                        //             </Table.Summary.Cell>
                        //             <Table.Summary.Cell index={8} align="left">
                        //                 {numberFormat(totalAdjustments)}
                        //             </Table.Summary.Cell>
                        //         </Table.Summary.Row>
                        //     </Table.Summary>
                        //     // : null
                        // )}
                        />
                    </div>

                </div>

                {/* </ShadowBox> */}
            </div >
        </>
    )
}
export default withSnackbar(RemittanceReportsDetails)