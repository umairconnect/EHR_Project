import React, { useEffect, useState } from 'react';

import useStyles from "./styles";
import { FormBtn, FormGroupTitle } from '../../../../../components/UiElements/UiElements'
import "./styles";
import { FormLabel, Grid, Typography } from '@material-ui/core';
import { ChevronRight as ChevronRightIcon, Info as InfoIcon } from '@material-ui/icons';
import { withSnackbar } from '../../../../../components/Message/Alert';

// import {snak}
function EnableEPrescription({ handleNext, handleBack, pstate, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(pstate);
    const handleCheckBoxChange = (e) => {

        const { name, checked } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    useEffect(() => {

        if (state.eprescriptionRequestId > 0) {

            setState(prevState => ({
                ...prevState,
                'checkMedLicense': true
            }));
            setState(prevState => ({
                ...prevState,
                'checkNpi': true
            }));
            setState(prevState => ({
                ...prevState,
                'checkDae': true
            }));
        }

    }, []);

    const next = () => {
        handleNext(state);
    }
    const back = () => {
        handleBack(state);
    }

    return (
        <>
            <Grid item container lg={12}>
                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>

                    <FormGroupTitle>How to enable e-Prescription</FormGroupTitle>

                    <span className={classes.noteTextArea}>
                        <Typography className={classes.noteText}>Providers must set up e-Prescribing through their
                            own account to set up a provider with an account,  <a>visit Add Users.</a>
                        </Typography>
                        <Typography className={classes.noteText}>To learn more about the Drug Enforcement Administration’s e-Prescribing
                            mandates, visit our  <a>Knowledge Base.</a>
                        </Typography>
                    </span>

                    <FormGroupTitle>To get started, you will need</FormGroupTitle>

                    <div className={classes.innerArea}>

                        <FormLabel className={classes.subTitle}>1. Your medical credentials</FormLabel>

                        <span style={{ display: "grid", paddingLeft: "25px" }}>
                            <div className={classes.treeContent}>
                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                <div className={classes.DistreeLabel}> State medical license</div>
                            </div>
                            <div className={classes.treeContent}>
                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                <div className={classes.DistreeLabel}> NPI number (personal)</div>
                            </div>
                            <div className={classes.treeContent}>
                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                <div className={classes.DistreeLabel}> DEA number (required for EPCS)</div>
                            </div>
                        </span>

                        <div className={classes.infoArea}>
                            <div className={classes.treeContent}>
                                <div className={classes.infotreeIcon}><InfoIcon /></div>
                                <div className={classes.DistreeLabel}>Please make sure you have above mentioned information available with you before proceeding</div>
                            </div>
                        </div>
                        <div className={classes.divAlignemnt}>
                            <FormLabel className={classes.subTitle}>2. Access to a smartphone for
                                multi-factor authentication.s
                            </FormLabel>

                            <Typography className={classes.noteText}>You will need a smartphone that can
                                receive text messages, download apps, and take photos.
                            </Typography>

                        </div>


                        <div className={classes.divAlignemnt}>
                            <FormLabel className={classes.subTitle}>3.  A valid government ID
                            </FormLabel>

                            <Typography className={classes.noteText}>This includes a driver’s license state ID card,
                                or a passport.
                            </Typography>
                        </div>

                        <FormBtn id="save" size="large" onClick={back} btnType="back">Back</FormBtn>
                        <FormBtn id="save" size="large" onClick={next} btnType="next" disabled={!props.isEditable}>Next</FormBtn>

                    </div>


                </Grid>
            </Grid>
        </>
    )
}

export default withSnackbar(EnableEPrescription)
