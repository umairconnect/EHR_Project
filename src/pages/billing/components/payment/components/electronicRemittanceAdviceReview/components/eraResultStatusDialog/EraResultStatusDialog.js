import React, { useState, useEffect, useRef } from "react";

import {
    Popper,
    Paper,
    FormLabel,
    MobileStepper,
    Button,
    Typography,
    Grid
} from "@material-ui/core"
import {
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
    Notifications as NotificationsIcon,
    Info as InfoIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight
}
    from '@material-ui/icons';
import { Scrollbars } from "rc-scrollbars"
//custom components
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import FindChargeDialog from "../findChargeDialog/FindChargeDialog";
//icons and images
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
//styles
import useStyles from './styles';
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";

import { Popover } from "antd"
function EraResultStatusDialog({ id, open, anchorEl, handleStatusClose, handleIgnoreAnomaly, data, isApplied, ...props }) {

    const classes = useStyles();
    const [lstData, setLstData] = useState([]);
    const [maxSteps, setMaxSteps] = useState(data.data.length);
    const [issetData, setIssetData] = useState(true);
    const [showHideFindChargeDialog, setShowHideFindChargeDialog] = useState(false);

    const closeButtonRef = useRef();

    const [activeStep, setActiveStep] = useState(0);
    //let maxSteps = data.data.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleClose = (event, type) => {
        setIssetData(true);
        setActiveStep(0);
        handleStatusClose(event);
        //handleIgnoreAnomaly(type);

    }
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
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
    const removeWarning = (e) => {
        let event = e;
        ShowActionDialog(true, "Delete", "Are you sure, you want to remove this line?", "confirm", function () {
            setIssetData(false);
            const tempData = [...lstData];
            setLstData(tempData.filter((t, i) => { return i != activeStep }));
            const obj = tempData.filter((t, i) => { return i == activeStep })[0];
            const params = ['' + obj.batchPaymentId, 'is_deleted', 'true'];
            PostDataAPI("billingbatchint/updateAnomalies", params).then((result) => {
                if (result.success) {
                    updateAnamolyCount('Warnings', event);
                }
            })
        });
    }
    const removeError = (e) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to remove this line?", "confirm", function () {
            setIssetData(false);
            const tempData = [...lstData];
            setLstData(tempData.filter((t, i) => { return i != activeStep }));
            const obj = tempData.filter((t, i) => { return i == activeStep })[0];
            const params = ['' + obj.batchPaymentId, 'is_deleted', 'true'];
            PostDataAPI("billingbatchint/updateAnomalies", params).then((result) => {
                if (result.success) {
                    updateAnamolyCount('Errors', e);

                }
            })
        });
    }
    const updateAnamolyCount = (type, e) => {
        if (maxSteps - 1 < activeStep + 1) {
            setActiveStep(activeStep - 1);
        }
        setMaxSteps(maxSteps - 1);
        handleIgnoreAnomaly(type);
        if (maxSteps - 1 == 0) {
            handleClose(e, type);
            // closeButtonRef.current.click();

        }
    }
    const ignoreWarning = (e) => {
        let event = e;
        setIssetData(false);
        const tempData = [...lstData];
        setLstData(tempData.filter((t, i) => { return i != activeStep }));
        const obj = tempData.filter((t, i) => { return i == activeStep })[0];
        const params = ['' + obj.batchPaymentId, 'has_warning', 'false'];
        PostDataAPI("billingbatchint/updateAnomalies", params).then((result) => {
            if (result.success) {
                updateAnamolyCount('Warnings', event);
            }
        })
    }
    const handleFindChargeApplication = (e) => {
        const tempData = [...lstData];
        setLstData(tempData.filter((t, i) => { return i != activeStep }));
        updateAnamolyCount('Errors', e);
        setShowHideFindChargeDialog(false);

    }
    useEffect(() => {
        if (issetData) {
            setLstData(data.data);
            setMaxSteps(data.data.length);
        }
    }, [data.data])
    const popeverContent =
        <Paper className={classes.eraStatusPaper} >
            <div className={classes.box}>
                <div className={classes.header} id="draggable-dialog-title">
                    <span style={{ display: "flex", width: "100%" }}>
                        {
                            data.type == "fullApplied" ?
                                <CheckCircleIcon className={classes.fullAppliedIcon} /> :

                                data.type == "Warning" ?
                                    <WarningIcon id="Warnings" className={classes.warningIcon} /> :

                                    data.type == "Alert" ?
                                        <NotificationsIcon id="Alerts" className={classes.notificationsIcon} /> :

                                        data.type == "Information" ?
                                            <InfoIcon id="Information" className={classes.infoIcon} /> :

                                            data.type == "Error" ?
                                                <ErrorIcon id="Errors" className={classes.errorIcon} /> : null
                        }
                        <FormLabel className={classes.statusTitle}>
                            {
                                data.type == "Warning" ?
                                    <strong>Warning:</strong> :
                                    data.type == "Error" ?
                                        <strong>Error:</strong>
                                        : <strong>Title</strong>

                            }

                        </FormLabel>
                        <span className={classes.crossButton} onClick={handleClose}><img ref={closeButtonRef} onClick={handleClose} src={CloseIcon} /></span>
                    </span>
                </div>
                <div className={classes.content}>
                    <Scrollbars autoHeight autoHeightMax={400} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                        <Grid container direction="column">

                            <div style={{ padding: "10px 10px 0px 15px", minWidth: "100%" }}>
                                <Grid container direction="row">

                                    <FormLabel className={classes.statusTitle}>
                                        {
                                            data.type == "Information" ?
                                                <>{lstData[activeStep]?.information}</> :
                                                data.type == "Alert" ?
                                                    <>{lstData[activeStep]?.alert}</> :
                                                    data.type == "Warning" ?
                                                        <>{lstData[activeStep]?.warning}</> :
                                                        data.type == "Error" ?
                                                            <>{data?.data[activeStep]?.error}</>
                                                            : ""

                                        }

                                    </FormLabel>
                                    {
                                        data.type == "Information" ?
                                            <Grid container direction="row">

                                                {/*<Grid container direction="row">*/}

                                                {/*    <FormLabel className={classes.textTitle}>Patient:</FormLabel>*/}
                                                {/*    <Typography className={classes.textValue}>Jessie , Blane</Typography>*/}

                                                {/*</Grid>*/}

                                                {/*<Grid container direction="row">*/}

                                                {/*    <FormLabel className={classes.textTitle}>Claim ID:</FormLabel>*/}
                                                {/*    <Typography className={classes.textValue}>{lstData[activeStep]?.claimSuperbillId}</Typography>*/}

                                                {/*</Grid>*/}

                                                <Grid container direction="row">

                                                    <FormLabel className={classes.textTitle}>DOS:</FormLabel>
                                                    <Typography className={classes.textValue}>{lstData[activeStep]?.strDosDate}</Typography>

                                                </Grid>

                                                <Grid container direction="row">

                                                    <FormLabel className={classes.textTitle}>Procedure:</FormLabel>
                                                    <Typography className={classes.textValue}>{lstData[activeStep]?.proc}</Typography>

                                                </Grid>

                                                <Grid container direction="row">

                                                    <FormLabel className={classes.textTitle}>Modifiers:</FormLabel>
                                                    <Typography className={classes.textValue}>{lstData[activeStep]?.modifiers}</Typography>

                                                </Grid>

                                                <Grid container direction="row">

                                                    <FormLabel className={classes.textTitle}>Unit:</FormLabel>
                                                    <Typography className={classes.textValue}>{lstData[activeStep]?.unit}</Typography>

                                                </Grid>

                                                <Grid container direction="row">

                                                    <FormLabel className={classes.textTitle}>Billed:</FormLabel>
                                                    <Typography className={classes.textValue}>${lstData[activeStep]?.amount}</Typography>

                                                </Grid>
                                            </Grid> :
                                            data.type == "Alert" ?
                                                <Grid container direction="row">

                                                    {/*<Grid container direction="row">*/}

                                                    {/*    <FormLabel className={classes.textTitle}>Patient:</FormLabel>*/}
                                                    {/*    <Typography className={classes.textValue}>Jessie , Blane</Typography>*/}

                                                    {/*</Grid>*/}

                                                    {/*<Grid container direction="row">*/}

                                                    {/*    <FormLabel className={classes.textTitle}>Claim ID:</FormLabel>*/}
                                                    {/*    <Typography className={classes.textValue}>{lstData[activeStep]?.claimSuperbillId}</Typography>*/}

                                                    {/*</Grid>*/}

                                                    <Grid container direction="row">

                                                        <FormLabel className={classes.textTitle}>DOS:</FormLabel>
                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.strDosDate}</Typography>

                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <FormLabel className={classes.textTitle}>Procedure:</FormLabel>
                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.proc}</Typography>

                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <FormLabel className={classes.textTitle}>Modifiers:</FormLabel>
                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.modifiers}</Typography>

                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <FormLabel className={classes.textTitle}>Unit:</FormLabel>
                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.unit}</Typography>

                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <FormLabel className={classes.textTitle}>Billed:</FormLabel>
                                                        <Typography className={classes.textValue}>${lstData[activeStep]?.amount}</Typography>

                                                    </Grid>
                                                </Grid> :
                                                data.type == "Warning" || data.type == "Error" ?
                                                    <>
                                                        <Grid container direction="row">

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                                                                <Grid container direction="row">
                                                                    {/*<Grid container direction="row">*/}

                                                                    {/*    <FormLabel className={classes.textTitle}>Patient:</FormLabel>*/}
                                                                    {/*    <Typography className={classes.textValue}>{lstData[activeStep]?.patientName}</Typography>*/}

                                                                    {/*</Grid>*/}

                                                                    {/*<Grid container direction="row">*/}

                                                                    {/*    <FormLabel className={classes.textTitle}>Claim ID:</FormLabel>*/}
                                                                    {/*    <Typography className={classes.textValue}>{lstData[activeStep]?.claimSuperbillId}</Typography>*/}

                                                                    {/*</Grid>*/}

                                                                    <Grid container direction="row">

                                                                        <FormLabel className={classes.textTitle}>DOS:</FormLabel>
                                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.strDosDate}</Typography>

                                                                    </Grid>

                                                                    <Grid container direction="row">

                                                                        <FormLabel className={classes.textTitle}>Procedure:</FormLabel>
                                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.proc}</Typography>

                                                                    </Grid>

                                                                    <Grid container direction="row">

                                                                        <FormLabel className={classes.textTitle}>Billed:</FormLabel>
                                                                        <Typography className={classes.textValue}>${lstData[activeStep]?.amount}</Typography>

                                                                    </Grid>

                                                                </Grid>

                                                            </Grid>

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                                                                <Grid container direction="row">

                                                                    <Grid container direction="row">

                                                                        <FormLabel className={classes.textTitle}>Modifiers:</FormLabel>
                                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.modifiers}</Typography>

                                                                    </Grid>

                                                                    <Grid container direction="row">

                                                                        <FormLabel className={classes.textTitle}>Unit:</FormLabel>
                                                                        <Typography className={classes.textValue}>{lstData[activeStep]?.unit}</Typography>

                                                                    </Grid>

                                                                    <Grid container direction="row">
                                                                        {
                                                                            data.type == "Warning" ?
                                                                                <Grid container>
                                                                                    <Button id="ignoreWarning" className={classes.applyBtn} onClick={ignoreWarning} disabled={isApplied}>Apply</Button>
                                                                                    <Button id="removeWarning" className={classes.removeBtn} onClick={removeWarning} disabled={isApplied}>Remove</Button>
                                                                                </Grid>
                                                                                :
                                                                                data.type == "Error" ?
                                                                                    <Grid container>
                                                                                        <Button className={classes.applyBtn} onClick={() => setShowHideFindChargeDialog(true)}>Find Charge</Button>
                                                                                        <Button id="removeError" className={classes.removeBtn} onClick={(event) => removeError(event)}>Remove</Button>
                                                                                    </Grid>
                                                                                    : ""
                                                                        }
                                                                    </Grid>

                                                                </Grid>

                                                            </Grid>

                                                            {
                                                                data.type == "Warning" ?
                                                                    < Grid container direction="row">

                                                                        <p className={classes.warningNote}>
                                                                            The correct payment may have been already applied to this charge.
                                                                            Please verify existing payment before applying payment to this charge
                                                                        </p>

                                                                    </Grid> :
                                                                    ""
                                                            }
                                                        </Grid>


                                                    </>
                                                    : <></>
                                    }

                                </Grid>

                            </div>

                        </Grid>
                    </Scrollbars>
                </div>
                {
                    data.type == "Information" || data.type == "Alert" || data.type == "Warning" || data.type == "Error" ?
                        // || data.type == "Warning" || data.type == "Error" ?
                        <div className={classes.footer}>
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                variant="text"
                                activeStep={activeStep}
                                nextButton={
                                    <Button size="small" className={classes.stepperBtn} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                        Next Item
                                        <KeyboardArrowRight />
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" className={classes.stepperBtn} onClick={handleBack} disabled={activeStep === 0}>
                                        <KeyboardArrowLeft />
                                        Previous Item
                                    </Button>
                                }
                            />
                        </div>
                        : ""}
            </div>
        </Paper >
    return (
        <>
            {/* <Popper className={classes.eraStatusPopper} id={id} open={open} anchorEl={anchorEl} placement={'right-end'} transition> */}

            <Popover
                className={classes.eraStatusPopover}
                getPopupContainer={(container) => container}
                content={popeverContent}
                placement="rightBottom"
                visible={open}
                trigger="click"
            />

            {/* </Popover > */}
            {/* {popeverContent} */}
            {
                showHideFindChargeDialog ?
                    <FindChargeDialog
                        showHideDialog={showHideFindChargeDialog}
                        handleClose={() => setShowHideFindChargeDialog(false)}
                        eraData={lstData[activeStep]}
                        handleFindChargeApplication={handleFindChargeApplication}
                    /> : ""
            }
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

export default withSnackbar(EraResultStatusDialog)