import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Typography,
    Icon,
    Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// components
import PageTitle from "../../../../../../components/PageTitle";
import { LinkS, ShadowBox } from "../../../../../../components/UiElements/UiElements";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { data as gridCnfg } from '../../../../../../components/SearchGrid/component/setupData';
import { Table, Empty, Row } from "antd";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
//
import Erase from "../../../../../../images/icons/erase.png"
import Delete from "../../../../../../images/icons/trash.png";
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";

// styles
import useStyles from "./styles";
import '../../../../../../components/SearchGrid/style.css';
import '../../../../../../components/SearchGrid/antStyle.css';
//Dialogs
import AddEobDialog from "./components/addEOBDialog/AddEobDialog"
import ClaimSearchDialog from "./components/claimSearchDialog/ClaimSearchDialog";
import { withSnackbar } from '../../../../../../components/Message/Alert';
import { formatDate } from '../../../../../../components/Common/Extensions';
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

function InsurancePayment({ ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    let history = useHistory()
    let propsData = [];
    let loadRecord = true;

    const [isLoading, setIsLoading] = useState(null);


    if (props.location.pathname != null && props.location.pathname != "" && props.location.pathname.split('=').length > 1) {
        propsData = props.location.pathname.split('=')[1].split('/');
    }
    else
        loadRecord = false;
    let eobId = !loadRecord ? 0 : propsData[0];
    const [eob, setEob] = useState(null);
    const [claimId] = useState(props.location.search.split('=').length > 1 ? props.location.search.split('=')[1] : 0);
    const [showAddEobDialog, setShowAddEobDialog] = useState(loadRecord == false);
    const [showClaimSearchDialog, setShowClaimSearchDialog] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //To Show Action Dialog
    const handleClick = (record) => {

        // let data = `${record.encounterId}/${record.patientId}/${record.claimSuperbillId}/billing`;
        if (!eobId > 0)
            eobId = eob.eobId;
        history.push(`/app/individualinsurancepayment/id=` + eobId + '/' + record.claimSuperbillId);
    };
    const onSave = (val) => {

        if (val.receivingDate)
            val.receivingDate = formatDate(val.receivingDate.split('T')[0]);
        setEob(val);
        eobId = val.eobId;
        setRowsData(val.lstPaymentClaims);
        loadData();
        if (val.lstPaymentClaims)
            calculateTotal(val.lstPaymentClaims);
        //if eob added from claim screen, then add that claim automatically to eob
        if (claimId > 0)
            addClaimToPayment(eobId);
        showMessage("Success", "Record saved successfully.", "success", 3000);
        setShowAddEobDialog(false);
        setShowClaimSearchDialog(false);
    }
    const addClaimToPayment = eobId => {
        var params = { eobId: eobId, claimIds: claimId.toString() };
        PostDataAPI("eob/addClaimsToPayment", params, true).then((result) => {
            if (result.success == true) {
                loadData();
                //if (result.success && result.data != null) {
                //    // showMessage("Success", "Record saved successfully.", "success", 2000);
                //    handleSave(result.data);
                //}
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    };
    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }
    const onDelete = (id) => {
        const data = { eobClaimId: id };
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            PostDataAPI('eob/deleteClaimFromPayment', data, true).then((result) => {
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setTimeout(() => { loadData(); }, 1000);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        });
    }
    const [uploadedFileName, setUploadedFileName] = useState("");
    const loadData = () => {
        setIsLoading(true);
        PostDataAPI("eob/get", eobId).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                setIsLoading(false);

                if (result.data.receivingDate)
                    result.data.receivingDate = formatDate(result.data.receivingDate.split('T')[0]);
                setEob(result.data);
                if (result.data.scannedEobPath !== "null" && result.data.scannedEobPath !== null) {
                    setUploadedFileName(result.data.scannedEobPath.split(/[\\s,]+/).pop());
                }

                setRowsData(
                    result.data.lstPaymentClaims.map((item, i) => {
                        item.action =
                            <Row type="flex" justify="center" align="middle">
                                <Tooltip title="Edit">
                                    <img src={Erase} onClick={() => handleClick(item)} className={classes.Icon} />
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <img src={Delete} onClick={(e) => { e.stopPropagation(); onDelete(item[gridCnfg["InsurancePaymentColumns"][0].dataIndex]) }} className={classes.Icon} />
                                </Tooltip>
                            </Row>
                        return { ...item }
                    }))
                setRowsData(result.data.lstPaymentClaims);
                if (result.data.lstPaymentClaims)
                    calculateTotal(result.data.lstPaymentClaims);
            }
        })
    }
    let [totalBilledAmount, setTotalBilledAmount] = useState(0.0),
        [totalAllowed, setTotalAllowed] = useState(0.0),
        [totalPaid, setTotalPaid] = useState(0.0),
        [totalAdjusted, setTotalAdjusted] = useState(0.0),
        [totalUnpaid, setTotalUnpaid] = useState(0.0),
        [totalBalance, setTotalBalance] = useState(0.0)
        ;
    const calculateTotal = (details) => {
        let tAmount = 0.0,
            tAllowed = 0.0,
            tPaid = 0.0,
            tAdjusted = 0.0,
            tUnpaid = 0.0,
            tEndBalance = 0.0
            ;
        details.forEach((t) => {
            tAmount += parseFloat(t.billed ? t.billed : 0);
            tAllowed += parseFloat(t.allowedAmount ? t.allowedAmount : 0);
            tPaid += parseFloat(t.paidAmount ? t.paidAmount : 0);
            tAdjusted += parseFloat(t.adjustedAmount ? t.adjustedAmount : 0);
            tUnpaid += parseFloat(t.unpaidAmount ? t.unpaidAmount : 0);
            tEndBalance += parseFloat(t.balance ? t.balance : 0);
        });
        setTotalBilledAmount(tAmount);
        //setTotalStartBalance(tStartBalance);
        setTotalAllowed(tAllowed);
        setTotalPaid(tPaid);
        setTotalAdjusted(tAdjusted);
        setTotalUnpaid(tUnpaid);
        //setTotalDeductiblet(tDeductible);
        setTotalBalance(tEndBalance);

    }
    useEffect(() => {
        if (eobId && eobId > 0) {
            loadData();
        }

    }, [showClaimSearchDialog]);

    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const backButton = () => {
        history.push('/app/payment/');
        // history.goBack();
    }
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }
    return (
        <>
            <PageTitle title="Insurance Payment (Batch)"
                button={<Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Payment
                </Button>}
            />
            <div style={{ margin: "0px 10px" }}>
                <ShadowBox shadowSize={3} className={classes.shadowBox}>
                    {/* {!!eob ? */}
                    <div className={classes.searchArea}>

                        <div className={classes.headerContainer}>
                            <div className={classes.insuranceNameContainer}>
                                <Typography className={classes.headerLabel}>Payment From:</Typography>
                                <Typography className={classes.labelValue}>{eob?.payerName}</Typography>
                                <span className={classes.headerBtnContainer}>
                                    <Button className={classes.gridButton} disabled={!!eob} onClick={() => setShowAddEobDialog(true)}>Add EOB</Button>|
                                    <Button className={classes.gridButton} disabled={!eob?.eobId > 0} onClick={() => setShowAddEobDialog(true)}>Edit</Button>|
                                    <Button className={classes.gridButton} onClick={() => OpenCloseLogDialog(true)}>Logs</Button>
                                </span>
                            </div>
                            <div className={classes.headerSubContainer}>

                                <div className={classes.headerSubContainerChild}>
                                    <span>
                                        <Typography className={classes.headerLabel}>Check #:</Typography>
                                        <Typography className={classes.labelValue}>{eob?.payerTraceNo}</Typography>
                                    </span>
                                    <span>
                                        <Typography className={classes.headerLabel}>Amount:</Typography>
                                        <Typography className={classes.labelValue}>{eob ? numberFormat(eob.totalPaid) : '0.00'}</Typography>
                                    </span>

                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}>Payment Type:</Typography>
                                        <Typography className={classes.labelValue}>{eob?.paymentMethodName}</Typography>
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Applied:</Typography>
                                        <Typography className={classes.labelValue}>{eob ? numberFormat(eob.appliedAmount) : '0.00'}</Typography>
                                    </span>

                                </div>

                                <div className={classes.headerSubContainerChild}>

                                    <span>
                                        <Typography className={classes.headerLabel}>Received Date:</Typography>
                                        <Typography className={classes.labelValue}>{eob?.receivingDate}</Typography>
                                    </span>

                                    <span>
                                        <Typography className={classes.headerLabel}>Unapplied :</Typography>
                                        <Typography className={classes.labelValue}>{eob ? numberFormat(eob.unAppliedAmount) : '0.00'}</Typography>
                                    </span>

                                </div>

                            </div>
                            {eob?.scannedEobPath && eob?.scannedEobPath != '' && eob?.scannedEobPath != 'null' ?
                                <div className={classes.headerSubContainer}>

                                    <div className={classes.headerSubContainerChild}>

                                        <span>
                                            <Typography className={classes.headerLabel}>Scanned EOB:</Typography>
                                            <LinkS target={"_blank"} href={"." + eob?.scannedEobPath}>{uploadedFileName}</LinkS>
                                        </span>

                                    </div>
                                </div> : ''}
                        </div>

                    </div>

                    <div className={classes.gridArea}>
                        <div className={classes.gridButtonsArea}>
                            <Button className={classes.gridButton} onClick={() => setShowClaimSearchDialog(true)} disabled={!eob?.eobId > 0}>Add Claim</Button>|
                            <Button className={classes.gridButton} disabled={true}>Account Debit</Button>
                        </div>

                        <div className="custom-grid">
                            <Table
                                scroll={true}
                                dataSource={rowsData}
                                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                columns={gridCnfg["InsurancePaymentColumns"]}
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
                                            <Table.Summary.Cell colSpan={4}></Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}>Total:</Table.Summary.Cell>
                                            <Table.Summary.Cell index={6}>
                                                {numberFormat(totalBilledAmount)}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={8}>
                                                {numberFormat(totalAllowed)}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={9}>
                                                {numberFormat(totalPaid)}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={12}>
                                                {numberFormat(totalAdjusted)}
                                            </Table.Summary.Cell>
                                            {/* <Table.Summary.Cell index={10}>
                                                {numberFormat(totalUnpaid)}
                                            </Table.Summary.Cell> */}
                                            {/* <Table.Summary.Cell index={11}></Table.Summary.Cell> */}

                                            <Table.Summary.Cell index={13}>
                                                {numberFormat(totalBalance)}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                    // : null
                                )}
                            />
                        </div>

                    </div>

                </ShadowBox>
            </div >
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            <LogDialog
                code="billingbatch"
                id={eob?.eobId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />

            {
                showAddEobDialog ?
                    <AddEobDialog
                        showHideDialog={showAddEobDialog}
                        handleClose={() => setShowAddEobDialog(false)}
                        handleSave={(value) => onSave(value)}
                        data={eob}
                        claimId={claimId} />
                    : null
            }
            {
                showClaimSearchDialog ?
                    <ClaimSearchDialog
                        showHideDialog={showClaimSearchDialog}
                        handleClose={() => setShowClaimSearchDialog(false)}
                        handleSave={(value) => onSave(value)}
                        eobId={eob.eobId}
                        data={eob.lstPaymentClaims} />
                    : null
            }
        </>
    )
}
export default withSnackbar(InsurancePayment)