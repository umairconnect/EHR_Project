import React, { useState, useEffect } from "react";
//material ui
import { Dialog, Grid, Typography } from "@material-ui/core";
//images
import CloseIcon from "../../../../../images/icons/math-plus.png"
//scrollbar
import { Scrollbars } from 'rc-scrollbars';
//custom components
import { withSnackbar } from '../../../../../components/Message/Alert';
import GenerateQRDAFileDialog2 from '../generateQRDAFileDialog2/GenerateQRDAFileDialog';
import GenerateQRDAFileDialog3 from "../generateQRDAFileDialog3/GenerateQRDAFileDialog";
import GenerateQRDAFileDialog4 from "../generateQRDAFileDialog4/GenerateQRDAFileDialog";
import GenerateQRDAFileDialog5 from "../generateQRDAFileDialog5/GenerateQRDAFileDialog";
import { LinkS, FormGroupTitle, FormBtn, DraggableComponent } from "../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { RadioboxField } from "../../../../../components/InputField/InputField";
function GenerateQRDAIIIFile({ dialogState, handleClose, showMessage, ...props }) {
    const reportingProgramOptions = [

        {
            value: "comprehensivePrimaryCarePlus",
            label: "Comprehensive Primary Care Plus (CPC+)",
            className: 'adjustLabels',
        },
        {
            value: "mipsGroupReporting",
            label: "MIPS Group Reporting",
            className: 'adjustLabels',
        },
        {
            value: "mipsVirtualGroupReporting",
            label: "MIPS Virtual Group Reporting",
            className: 'adjustLabels',
        },
    ];
    // handle styles
    const classes = useStyles();
    // stepper values
    const [state, setState] = useState({});
    const steps = ["1", "2", "3", "4", "5"];
    const [activeStep, setActiveStep] = useState(0);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            icnNo: ''
        }))
    }
    const handleBack = (newState) => {

        if (newState) {
            setState({ ...state, ...newState });
        }
        setActiveStep(activeStep - 1);
    };
    const handleNext = (newState) => {
        console.log("state" + state);
        if (newState) {
            setState({ ...state, ...newState });
        }
        setActiveStep(activeStep + 1);
    }
    function getStepContent(step) {
        const isLastStep = activeStep === steps.length - 1;
        switch (step) {
            case 0:
                return (
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}>
                                <img src={CloseIcon} />
                            </span>
                            <FormGroupTitle>Generate QRDA III File</FormGroupTitle>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: "270px" }}>
                                <Grid
                                    container
                                    direction="row"
                                    style={{ paddingRight: "17px" }}
                                >
                                    <Grid item lg={12}>
                                        <Typography className={classes.noteText}>
                                            You are generating a QRDA Category Ill (QRDA Il) file for group eCQM results.
                                            QRDA Il is an aggregate quality report that contains quality data for a set of
                                            patients for one or more eCQMs. <LinkS>Learn More</LinkS>
                                        </Typography>
                                        <Typography className={classes.title}>SELECT REPORTING PROGRAM</Typography>
                                        <RadioboxField
                                            id="reportingPrograme"
                                            name="reportingPrograme"
                                            labelPlacement="end"
                                            onChange={handleChange}
                                            options={reportingProgramOptions}
                                            value={state.reportingPrograme}
                                        />
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>

                            <div className={classes.footerRight}>
                                <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>
                                <FormBtn id="save" btnType="next" onClick={handleNext}>Next</FormBtn>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return <GenerateQRDAFileDialog2
                    showHideDialog={true}
                    {...state}
                    isLastStep={isLastStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleClose={handleClose}
                />
            case 2:
                return <GenerateQRDAFileDialog3
                    showHideDialog={true}
                    {...state}
                    isLastStep={isLastStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleClose={handleClose}
                />
            case 3:
                return <GenerateQRDAFileDialog4
                    showHideDialog={true}
                    {...state}
                    isLastStep={isLastStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleClose={handleClose}
                />
            case 4:
                return <GenerateQRDAFileDialog5
                    showHideDialog={true}
                    {...state}
                    isLastStep={isLastStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleClose={handleClose}
                />
            // default:
            //     throw new Error('Mis-step!');
        }
    }
    useEffect(() => {

    }, [activeStep])
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogState}
                disableEnforceFocus
                maxWidth={"md"}
                {...props}
            >
                <div className={classes.dialogContent}>
                    {/* <div className={classes.dialogContentRightSide}> */}
                    {getStepContent(activeStep)}
                    {/* </div> */}
                </div>
            </Dialog>
        </>
    );
}

export default withSnackbar(GenerateQRDAIIIFile);
