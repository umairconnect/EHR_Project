import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography, Dialog, Divider
} from "@material-ui/core";
// components
import { LinkS, ShadowBox, FormGroupTitle, DraggableComponent } from "../../../../../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../../../../../components/SearchGrid/component/setupData';
import { formatCurrency, formatDate } from '../../../../../../../components/Common/Extensions';
// styles
import "../../../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../../../images/icons/loaderIcon.gif";
import '../../../../../../../components/SearchGrid/style.css';
import '../../../../../../../components/SearchGrid/antStyle.css';
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import Demographics from '../../../../../../patients/component/demographics/Demographics';
import CloseIcon from "../../../../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars"
import { Table, Empty } from "antd";
import { IsEditable } from '../../../../../../../Services/GetUserRolesRights';

function InsuranceDetails({ ...props}) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [patientId, setPatientId] = React.useState();
    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const closeDemographics = () => { setDemographicsDialogOpenClose(false); }
    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }
    const [state, setState] = useState({ headerLabel: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [patientRowsData, setPatientRowsData] = useState([]);
    const [patientDetailsRowsData, setPatientDetailsRowsData] = useState([]);

    function exportReport() {
        var splitedData = props.data.split('/');
        var _payerId = splitedData[0];
        var _payerName = splitedData[1];
        var _days_from = splitedData[2];
        var _days_to = splitedData[3];
        var _headerLabel = splitedData[4];
        var params = {
            reportName: "Account Recievable - Insurance Details",
            Payer_Code: _payerId + "||" + _payerName,
            Days_From: _days_from,
            Days_To: _days_to,
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

    function GetInsuranceDetailData() {
        var splitedData = props.data.split('/');
        var _payerId = splitedData[0];
        var _payerName = splitedData[1];
        var _days_from = splitedData[2];
        var _days_to = splitedData[3];
        var _headerLabel = splitedData[4];
        setState(prevState => ({
            ...prevState,
            headerLabel: _headerLabel
        }));
        var params = {
            reportName: "Account Recievable - Insurance Details",
            Payer_Code: _payerId + "||" + _payerName,
            Days_From: _days_from,
            Days_To: _days_to,
        }
        setIsLoading(true);
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                setPatientDetailsRowsData(
                    result.data.map((item, i) => {
                        item.column6 = <LinkS style={{marginLeft: 0}} onClick={() => handleOpenDemographics(item.column24)}>{item.column6}</LinkS>
                        return { ...item }
                    }))
            }
        });
    }

    useEffect(() => {
        GetInsuranceDetailData();
    }, [])
    return (
        <> <div style={{ margin: "0px 10px" }}>

            <div className={classes.gridArea}>

                <Grid container direction="row" justify="flex-end" style={{ justifyContent: "right", marginBottom: "5px" }}>
                    {/* <Button className={classes.gridButton} >Print</Button>
                    <Button className={classes.divider}>|</Button> */}
                    <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                </Grid>

                <div className="custom-grid">
                    <p>{state.headerLabel}</p>
                </div>

            </div>
            <ShadowBox shadowSize={3} className={classes.shadowBox}>
                <Grid container direction="row" >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className={classes.tableSection}>
                            <table className={classes.proceduresTable}>
                                <thead>
                                    <tr>
                                        <th>Claim ID</th>
                                        <th>Provider</th>
                                        <th>Location</th>
                                        {/* <th>Exan Room</th> */}
                                        <th>DOS</th>
                                        <th>Diagnosis</th>
                                        <th>Patient</th>
                                        <th>DOB</th>
                                        <th className={classes.rightAligned}>Price</th>
                                        <th className={classes.rightAligned}>Qty</th>
                                        <th className={classes.rightAligned}>Billed</th>
                                        <th className={classes.rightAligned}>Allowed</th>
                                        <th className={classes.rightAligned}>Ins Paid</th>
                                        <th className={classes.rightAligned}>Pt Paid</th>
                                        <th className={classes.rightAligned}>Ins Bal</th>
                                        <th className={classes.rightAligned}>Pt Bal</th>
                                        <th>Notes</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientDetailsRowsData ?
                                        patientDetailsRowsData?.map((item, i) => {
                                            return <>
                                                <tr key={i} className={classes.mainRow}>
                                                    <td colSpan={1}>{item.column1}</td>
                                                    <td colSpan={1} >{item.column2}</td>
                                                    <td colSpan={1} >{item.column3}</td>
                                                    {/* <td colSpan={1} >{item.examRoom}</td> */}
                                                    <td colSpan={1} >{item.column4}</td>
                                                    <td colSpan={1} >{item.column5}</td>
                                                    <td colSpan={1}>{item.column6}</td>
                                                    <td colSpan={1} >{formatDate(item.column7)}</td>
                                                    {/* <td colSpan={1} >{item.payerName}</td> */}
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column8)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column9)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column10)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column11)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column12)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column13)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column14)}</td>
                                                    <td colSpan={1} className={classes.rightAligned}>{formatCurrency(item.column15)}</td>
                                                    <td colSpan={1} >{item.column20}</td>
                                                    <td colSpan={1} className={classes.balanceDueTd}>{item.column21}</td>
                                                </tr>
                                                {item?.children?.map((child, j) => {
                                                    return (
                                                        <tr key={j}>
                                                            <td colSpan={1}>{child.column8}</td>
                                                            <td colSpan={3}>{child.column9}</td>
                                                            <td colSpan={1}>{child.column10}</td>
                                                            <td colSpan={2}>{child.column11}</td>
                                                            {/* <td colSpan={1}></td> */}
                                                            <td colSpan={1} className={classes.rightAligned}>{child.column12}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column13)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column14)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column15)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column16)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column17)}</td>
                                                            <td colSpan={1} className={classes.rightAligned}>{formatCurrency(child.column18)}</td>
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
            </ShadowBox >
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

export default InsuranceDetails