import React, { useEffect, useState } from "react";
//material ui 
import {
    Grid,
    Button,
    Collapse,
    Typography,
    FormControlLabel,
    Checkbox,
    Icon,
} from "@material-ui/core"
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
    Notifications as NotificationsIcon,
    Info as InfoIcon,
    CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon,
    CheckBoxOutlined as CheckBoxOutlinedIcon,
}
    from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
//
import { Table, Empty } from "antd";
//custom components
import { FormGroupTitle } from "../../../../../../../../components/UiElements/UiElements";
import PageTitle from "../../../../../../../../components/PageTitle/PageTitle";
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { data as gridCnfg } from '../../../../../../../../components/SearchGrid/component/setupData';
//icons and images
import DeleteIcon from "../../../../../../../../images/icons/trash.png";
import CheckedIcon from "../../../../../../../../images/icons/checkedbox.png";
import UnCheckedIcon from "../../../../../../../../images/icons/uncheckedbox.png";
import LoadingIcon from "../../../../../../../../images/icons/loaderIcon.gif";
//styles
import useStyles from "./styles";
import '../../../../../../../../components/SearchGrid/style.css';
import '../../../../../../../../components/SearchGrid/antStyle.css';
import EraResultStatusDialog from "../eraResultStatusDialog/EraResultStatusDialog";
import EraActionDialog from "../eraActionDialog/EraActionDialog";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { formatDate, formatCurrency } from '../../../../../../../../components/Common/Extensions';
import { useHistory } from "react-router-dom";
import { Popover } from "antd"
import '../../../../../../../../components/antd.css';

function ElectronicRemittanceAdviceResult({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    let history = useHistory();
    const StatusDialog = EraResultStatusDialog;


    const [isCollapse, setIsCollapse] = useState(true);
    const results = [
        {
            checkNumber: "Sample # EFT",
            status: "",
            patient: "Jassie, Blane",
            claim: "00001",
            account: "1231",
            TCN: "654",
            DOS: "08/02/2021",
            billed: "$ 977.00",
            allowed: "$ 00.00",
            paid: "$ 00.00",
            unapplied: "$ 00.00",
            adjusted: "$ 00.00",
            unpaid: "-$955.00",
            additionalActions: "$ 00.00",
            balance: "$ 00.00",
            action: "",
        }
    ]
    const [eraActionDialogProps, setEraActionDialogProps] = useState({ showHideEraActionDialog: false, actionType: "" });

    const [rowsData, setRowsData] = useState([]);
    const [state, setState] = useState({
        insuranceFromName: "", insuranceByName: "", paymentReceivedDate: "",
        fullyApplied: true, hasWarnings: true, hasAlerts: true, hasInformation: true, hasErrors: true
    });

    const [isLoading, setIsLoading] = useState(false);

    //status popper
    const [open, setOpen] = useState(false);

    //State For Status Dialog
    const [statusProps, setStatusProps] = useState({ type: "", data: {} });
    const [currentTargetIcon, setCurrentTargetIcon] = useState(0);
    const openStatusPopper = (event, type, item) => {
        event.stopPropagation();
        setOpen(true);
        // let eventTarget = event.currentTarget;
        setCurrentTargetIcon(item.batchClaimId);
        const getParams = ['' + item.batchClaimId, type];
        PostDataAPI("billingbatchint/getAnomalies", getParams).then((result) => {
            console.log("result" + result);
            if (result.success && result.data != null && result.data.length > 0) {
                setStatusProps(prevState => ({
                    ...prevState,
                    ["type"]: type,
                    ["data"]: result.data,

                }));
                setOpen(true);
            }
        })

    }
    const closeStatusPopper = (event) => {
        setOpen(false);
    }

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    //To Show Action Dialog
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
    
    const onDelete = (event, id) => {
        event.stopPropagation();
        const data = { Id: id };
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            PostDataAPI('billingbatchint/deleteClaim', data, true).then((result) => {
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setTimeout(() => { loadData(); }, 1000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        });
    };
    let propsData = [];
    let loadRecord = true;
    if (props.location.pathname != null && props.location.pathname != "" && props.location.pathname.split('=').length > 1) {
        propsData = props.location.pathname.split('=')[1].split('/');
    }
    else
        loadRecord = false;
    let eobId = !loadRecord ? 0 : propsData[0];
    const [rowsDataFiltered, setRowsDataFiltered] = useState([]);
    const loadData = () => {
        setIsLoading(true);
        PostDataAPI("billingbatchint/get", eobId).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                // Set data Here
                //if (props.location.state)
                //    result.data.checkDate = props.location.state;
                if (result.data.receivingDate)
                    result.data.receivingDate = result.data.receivingDate.split('T')[0];
                result.data.fullyApplied = false;
                result.data.hasWarnings = true;
                result.data.hasAlerts = true;
                result.data.hasInformation = false;
                result.data.hasErrors = true;
                if (props.location.state)
                    result.data.updatedCheckDate = props.location.state;
                else
                    result.data.updatedCheckDate = result.data.checkDate;
                setState(result.data);
                const lstData = setIcons(result.data.lstPaymentClaims, (result.data.alreadyApplied == true || result.data.isApplied == true));
                setRowsData(lstData);

                setRowsDataFiltered(lstData);
                if (result.data.lstPaymentClaims)
                    calculateTotal(result.data.lstPaymentClaims);
            }
        })
    }
    const handleIgnoreAnomaly = (type) => {
        let updatedData = [...rowsDataFiltered];
        if (type == 'Warnings') {
            updatedData = updatedData.map(obj =>
                obj.batchClaimId == currentTargetIcon ? { ...obj, hasWarnings: false } : obj);
        } else {
            updatedData = updatedData.map(obj =>
                obj.batchClaimId == currentTargetIcon ? { ...obj, hasErrors: false } : obj);
        }
        const lstData = setIcons(updatedData, (state.alreadyApplied == true || state.isApplied == true));

        setRowsDataFiltered(lstData);
        loadData();
    }
    const statusDialogComp = () => (<StatusDialog
        open={open}
        handleStatusClose={(event) => closeStatusPopper(event)}
        data={statusProps}
        handleIgnoreAnomaly={handleIgnoreAnomaly}
    />)
    const setIcons = (lstPaymentClaims, isApplied) => {
        return lstPaymentClaims.map((item, i) => {
            item.key = i;
            item.hasFullyApplied = item.balance <= 0;
            //item.hasInformation = item.information != null && item.information != '';
            item.status =
                <span style={{ display: "flex" }}>
                    {item.isFullyApplied == true ?
                        <CheckCircleIcon id="fullApplied" onClick={(event) => openStatusPopper(event, "fullApplied", item)} className={classes.fullAppliedIcon} />
                        : ""}
                    {item.hasWarnings == true ?
                        <WarningIcon id="Warning" onClick={(event) => openStatusPopper(event, "Warning", item)} className={classes.warningIcon} />
                        : ""}
                    {item.hasAlerts == true ?
                        <NotificationsIcon id="Alert" onClick={(event) => openStatusPopper(event, "Alert", item)} className={classes.notificationsIcon} />
                        : ""}
                    {item.hasInformation == true ?
                        <InfoIcon id="Information" onClick={(event) => openStatusPopper(event, "Information", item)} className={classes.infoIcon} />
                        : ""}
                    {item.hasErrors == true ?
                        <ErrorIcon id="Error" onClick={(event) => openStatusPopper(event, "Error", item)} className={classes.errorIcon} />
                        : ""}
                </span>
            // </Popover>
            item.action = <div >
                {isApplied ? ''
                    : < Icon > <img src={DeleteIcon} onClick={(event) => onDelete(event, item.batchClaimId)} className={classes.Icon} /> </Icon>

                }
            </div>
            return { ...item }
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
    const Save = e => {

        let method = "billingbatchint/savePayment";

        PostDataAPI(method, state, true).then((result) => {

            if (result.success == true) {
                if (result.success) {
                    showMessage("Success", "Record saved successfully.", "success", 2000);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    };
    const ApplyPayment = e => {
        if (rowsDataFiltered.some(t => t.hasErrors)) {
            showMessage("Error", "Please resolve all outstanding error(s) first.", "error", 2000);
            return;
        }

        if (rowsDataFiltered.some(t => t.hasWarnings)) {
            ShowActionDialog(true, "Warning", "ERA contains warning(s), do you want to continue?", "confirm", function () {
                ApplyPaymentAjaxCall();
            });

        }
        else {
            ApplyPaymentAjaxCall();
        }


    };
    const ApplyPaymentAjaxCall = e => {

        let method = "billingbatchint/applyPayment";

        PostDataAPI(method, state, true).then((result) => {

            if (result.success == true) {
                //if (!isUpdate) {
                ///if (result.success && result.data != null) {
                showMessage("Success", "Payment applied successfully.", "success", 2000);
                setTimeout(() => { history.push(`/app/erareview`); }, 2000);


            }

            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    };
    useEffect(() => {
        loadData();
        console.log(props.location.state);
    }, [])

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
        let objFilter = { hasWarnings: state.hasWarnings, hasAlerts: state.hasAlerts, hasErrors: state.hasErrors, fullyApplied: state.fullyApplied, hasInformation: state.hasInformation };
        objFilter[name] = checked;
        filterData(objFilter);
    }
    const filterData = (objFilter) => {

        const lstData = rowsData.filter(t => {
            return objFilter.hasWarnings == t.hasWarnings &&
                objFilter.hasAlerts == t.hasAlerts &&
                objFilter.hasErrors == t.hasErrors &&
                objFilter.fullyApplied == t.hasFullyApplied &&
                objFilter.hasInformation == t.hasInformation

        });
        setRowsDataFiltered(lstData);
    }
    const handleClick = (e, record) => {
        //if (!state.isApplied)
        history.push(`/app/individualinsurancepayment/id=` + record.batchId + '/' + record.claimSuperbillId + '/era');
    };
    const ImageCheckBox = ({ id, name, checked, label, value, color, onChange, IsDisabled, type, ...props }) => {

        const onChangeEvent = (event) => {
            if (onChange)
                onChange(event);
        };

        return (
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={IsDisabled}
                        icon={<img src={UnCheckedIcon} alt="unchecked" />}
                        checkedIcon={<img src={CheckedIcon} alt="checked" />}
                        // color="primary"
                        // iconStyle={{ fill: 'white' }}
                        // checkedIcon={<CheckBoxOutlineBlankOutlinedIcon />}
                        className={classes.customCheckBoxBtn}
                        onChange={onChangeEvent}
                        name={name}
                        id={id}
                        checked={checked}
                        value={value}
                        {...props}

                    />
                }
                label={
                    <>
                        {
                            type == "FullyApplied" ?
                                <CheckCircleIcon style={{ fontSize: 18, margin: "0px 5px 0px 3px", color: "green" }} /> :
                                type == "Warnings" ?
                                    <WarningIcon style={{ fontSize: 18, margin: "0px 5px 0px 3px", color: "#FB9600" }} /> :
                                    type == "Alerts" ?
                                        <NotificationsIcon style={{ fontSize: 18, margin: "0px 5px 0px 3px", color: "#11284B" }} /> :
                                        type == "Information" ?
                                            <InfoIcon style={{ fontSize: 18, margin: "0px 5px 0px 3px", color: "#1054AE" }} /> :
                                            type == "Errors" ?
                                                <ErrorIcon style={{ fontSize: 18, margin: "0px 5px 0px 3pxx", color: "#FD5F5F" }} /> :
                                                ""
                        }
                        {label}
                    </>
                }
            />
        )
    }
    const openEraActionDialog = (action) => {
        setEraActionDialogProps(prevState => ({
            ...prevState,
            "showHideEraActionDialog": true,
            "actionType": action
        }))
    }
    const clsoeEraActionDialog = () => {
        setEraActionDialogProps(prevState => ({
            ...prevState,
            "showHideEraActionDialog": false,
            "actionType": ""
        }))
    }

    const backButton = () => {
        history.push('/app/erareview/');
    }
    return (
        <>
            <PageTitle title="ERA Review" button={
                <Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                > Back to ERA </Button>}
            />
            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} alignItems="center" alignContent="center" direction="row">

                    <span className={classes.searchSpan}>

                        <FormGroupTitle>Payment From {state?.payerName}</FormGroupTitle>
                        <Button
                            size="small"
                            className={classes.collapseBtn}
                            onClick={() => setIsCollapse(!isCollapse)}
                        >
                            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                        </Button>

                    </span>
                </Grid>

                <Collapse in={isCollapse} className={classes.collapseArea}>

                    <Grid container direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>{state?.isApplied || state?.alreadyApplied ? "" :
                            <Typography className={classes.warningText}>This payment has not applied. Please be sure to resolve any outstanding  error.</Typography>
                        }
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {state.batchId > 0 ?
                                <Typography className={classes.paymnetInfoText}>Payment from {state?.payerName} Received on {formatDate(state?.receivingDate)}</Typography>
                                : ''}
                        </Grid>

                        <Grid item className={classes.alignItem} xs={12} sm={12} md={12} lg={12} xl={12}>

                            <span className={classes.alignItem}>
                                <Typography className={classes.boldTitle}>Amount:</Typography>
                                <Typography className={classes.valueText}>$ {formatCurrency(state?.totalPaid)}</Typography>
                            </span>
                            <span className={classes.alignItem}>
                                <Typography className={classes.boldTitle}>Applied:</Typography>
                                <Typography className={classes.valueText}>$ {formatCurrency(state?.appliedAmount)}</Typography>
                            </span>
                            <span className={classes.alignItem}>
                                <Typography className={classes.boldTitle}>Unapplied:</Typography>
                                <Typography className={classes.valueText}>$ {formatCurrency(state?.unAppliedAmount)}</Typography>
                            </span>

                        </Grid>

                        <Grid item className={classes.alignItem} xs={12} sm={12} md={12} lg={12} xl={12}>

                            <div className={classes.infoArea}>
                                {state.fullyAppliedCount > 0 ?
                                    <span >
                                        <CheckCircleIcon style={{ fontSize: 18, margin: "6px 10px 0px 0px", color: "green" }} />
                                        <Typography className={classes.infoLabel}>{2}</Typography>
                                        <Typography className={classes.infoLabel}>Fully Applied</Typography>
                                    </span>
                                    : ''}
                                {state.warningsCount > 0 ?
                                    <span >
                                        <WarningIcon style={{ fontSize: 18, margin: "6px 10px 0px 0px", color: "#FB9600" }} />
                                        <Typography className={classes.infoLabel}>{state.warningsCount}</Typography>
                                        <Typography className={classes.infoLabel}>Warning(s)</Typography>
                                    </span>
                                    : ''}
                                {state.alertsCount > 0 ?
                                    <span >
                                        <NotificationsIcon style={{ fontSize: 18, margin: "6px 10px 0px 0px", color: "#11284B" }} />
                                        <Typography className={classes.infoLabel}>{state.alertsCount}</Typography>
                                        <Typography className={classes.infoLabel}>Alert(s)</Typography>
                                    </span>
                                    : ''}
                                {state.informationsCount > 0 ?
                                    <span >
                                        <InfoIcon style={{ fontSize: 18, margin: "6px 10px 0px 0px", color: "#1054AE" }} />
                                        <Typography className={classes.infoLabel}>{state.informationsCount}</Typography>
                                        <Typography className={classes.infoLabel}>Information</Typography>
                                    </span>
                                    : ''}
                                {state.errorsCount > 0 ?
                                    <span >
                                        <ErrorIcon style={{ fontSize: 18, margin: "6px 10px 0px 0px", color: "#FD5F5F" }} />
                                        <Typography className={classes.infoLabel}>{state.errorsCount}</Typography>
                                        <Typography className={classes.infoLabel}>Error(s)</Typography>
                                    </span>
                                    : ''}
                            </div>

                        </Grid>

                    </Grid>

                </Collapse>
            </div >
            <div className={classes.gridArea}>
                <div className={classes.gridButtonsArea}>
                    <Button className={classes.gridButton} onClick={ApplyPayment} disabled={state.isApplied || state.alreadyApplied}>Apply Payment</Button>|
                    {/*<Button className={classes.gridButton} onClick={Save} disabled={state.isApplied || state.alreadyApplied}>Save and Apply Later</Button>|*/}
                    {/*<Button className={classes.gridButton} onClick={() => openEraActionDialog("RestartERA")}>Restart ERA</Button>|*/}
                    {/*<Button className={classes.gridButton} >View EOB Report</Button>|*/}
                    <Button className={classes.gridButton} disabled>Print</Button>
                </div>

                <div className="custom-grid">
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (e) => handleClick(e, record),
                            };
                        }}
                        scroll={true}
                        dataSource={rowsDataFiltered}
                        pagination={{ pageSize: 5 }}
                        columns={gridCnfg["ERAResultColumns"]}
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
                                    <Table.Summary.Cell index={1}>Total:</Table.Summary.Cell>
                                    <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={7}>$ {formatCurrency(totalBilledAmount)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={8}>$ {formatCurrency(totalAllowed)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={9}>$ {formatCurrency(totalPaid)}</Table.Summary.Cell>
                                    <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={11}>$ {formatCurrency(totalAdjusted)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={12}>$ {formatCurrency(totalUnpaid)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={13}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={13}>$ {formatCurrency(totalBalance)}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                            // : null
                        )}
                    />
                </div>

            </div>
            {open &&
                <EraResultStatusDialog
                    // id={id}
                    open={open}
                    // anchorEl={anchorEl}
                    handleStatusClose={(event) => closeStatusPopper(event)}
                data={statusProps}
                isApplied={(state.isApplied == true || state.alreadyApplied == true)}
                    handleIgnoreAnomaly={handleIgnoreAnomaly}
                />
            }
            <EraActionDialog
                type={eraActionDialogProps.actionType}
                showHideDialog={eraActionDialogProps.showHideEraActionDialog}
                handleClose={clsoeEraActionDialog} />
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
        </>
    )
}

export default withSnackbar(ElectronicRemittanceAdviceResult)
