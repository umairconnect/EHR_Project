import React, { useState, useEffect } from 'react';
import { Grid, FormLabel, Typography } from "@material-ui/core";
import { FormGroupTitle, FormBtn } from "../../../../../components/UiElements";
import makeStyles from "./styles";
import { CheckCircle as CheckIcon } from '@material-ui/icons';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';

import {
    Dialog
} from "@material-ui/core";
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { InputBaseField } from '../../../../../components/InputField/InputField';
function ControlledSubstancesSignUp({ handleNext, handleBack, type, ...props }) {
    const classes = makeStyles();
    const [passwordDialogOpenClose, setPasswordDialogOpenClose] = useState(false);
    const [authenticationDialogOpenClose, setAuthenticationDialogOpenClose] = useState(false);
    const [state, setState] = useState({ one: false, two: true, three: false, });

    const handleClosePasswordDialog = () => setPasswordDialogOpenClose(false);
    const handleCloseAuthenticationDialog = () => setAuthenticationDialogOpenClose(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        // init();
        loadData();
    }, []);

    const loadData = () => {
        state.requestTypeCode = type;
        PostDataAPI("setup/epresciption/request/get", state, true).then((result) => {
            if (result.success && result.data != null) {
                setState(result.data);
            }
        })
    }
    const next = () => {
        handleNext(state);
    }

    return (
        <>
            <Grid container lg={12} direction="row">

                <FormGroupTitle>E-Prescription Sign-up complete</FormGroupTitle>

                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormLabel className={classes.noteText}>Processing your e-Prescribing
                        request can take up to a week</FormLabel>
                </Grid>

                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>1. Confirm your DEA number</FormLabel>

                        {
                            state.eprescriptionRequestId > 0 ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>2. Verify your identity with ID.me</FormLabel>

                        {
                            state.requestStatusCode == "Initiated" || state.requestStatusCode == "Verified" || state.requestStatusCode == "Active" ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>3. Request EHR permission for prescribing controlled substances</FormLabel>

                        {
                            state.requestStatusCode == "Verified" || state.requestStatusCode == "Active" ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>

                    <div className={classes.confirmArea}>

                        <FormLabel className={classes.confirmTitle}>4. Confirm EPCS activation.</FormLabel>

                        <Typography className={classes.confirmText}>
                            After clicking the button below, you will enter your password and then continue a new window on ID.me.
                            you will be asked to accept a push notification in the ID.me Authentication app on your phone to
                            complete authentication
                        </Typography>

                        <FormBtn id="save" size="large" onClick={handleNext}>Launch ID.me</FormBtn>

                    </div>

                </Grid>

            </Grid>

            <Dialog
                open={passwordDialogOpenClose}
                onClose={handleClosePasswordDialog}
                disableBackdropClick
                disableEscapeKeyDown  {...props}>
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header}>
                            <span className={classes.crossButton} onClick={handleClosePasswordDialog}><img src={CloseIcon} /></span>
                            <FormGroupTitle >Password Required</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormLabel className={classes.noteText}>Before launching ID.me setup, please
                                    provide your password to continue</FormLabel>
                                <div className={classes.inputArea}>
                                    <InputBaseField
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleChange}
                                        placeholder="Password" />
                                </div>
                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerCenter}>
                                <FormBtn id="save" > Confirm</FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={authenticationDialogOpenClose}
                onClose={handleCloseAuthenticationDialog}
                disableBackdropClick
                disableEscapeKeyDown  {...props}>
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header}>
                            <span className={classes.crossButton} onClick={handleCloseAuthenticationDialog}><img src={CloseIcon} /></span>
                            <FormGroupTitle >Authentication Required</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormLabel className={classes.noteText}>A new browser window will open and take you to ID.me’s
                                    website, You will be redirected back to this window when you are finished</FormLabel>
                                <div className={classes.inputArea}>
                                    <InputBaseField
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleChange}
                                        placeholder="Password" />
                                </div>
                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerCenter}>
                                <FormBtn id="save" > Authenticate with ID.me</FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default ControlledSubstancesSignUp
