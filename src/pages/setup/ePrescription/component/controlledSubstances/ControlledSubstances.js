import React, { useState } from 'react';
import { Grid, FormLabel } from "@material-ui/core";
import { FormGroupTitle, FormBtn } from "../../../../../components/UiElements";
import makeStyles from "./styles";
import { CheckCircle as CheckIcon } from '@material-ui/icons';
function ControlledSubstances({ handleNext, handleBack, ...props }) {
    const classes = makeStyles();
    const [state, setstate] = useState({ one: true, two: true, three: true, four: true });
    return (
        <>
            <Grid container lg={12} direction="row">

                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormLabel className={classes.noteText}>
                        Electronically send prescriptions for controlled substances
                    </FormLabel>
                </Grid>

                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>1. Confirm you DEA number</FormLabel>

                        {
                            state.one ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>2. Verify your identity with ID.me</FormLabel>

                        {
                            state.two ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>3. Request EHR permissions for prescribing controlled substances</FormLabel>

                        {
                            state.three ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>4. Confirm EPCS activation</FormLabel>

                        {
                            state.four ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.signUpArea}>

                        <FormLabel className={classes.signUpTitle}>EPCS Active</FormLabel>
                        <FormLabel className={classes.signUpText}>EPCS is enabled on <strong>May 22,2021</strong></FormLabel>

                    </div>

                    <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <span style={{ display: "flex", marginTop: "10px" }}>
                            <FormBtn id="save" size="large" onClick={handleBack} btnType="back">Back</FormBtn>
                            <FormBtn id="save" size="large">Mange Access Controls</FormBtn>
                            <FormLabel className={classes.signUpNoteText}>Mange EPCS access and controls for your devices through ID.me</FormLabel>
                        </span>
                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}

export default ControlledSubstances

