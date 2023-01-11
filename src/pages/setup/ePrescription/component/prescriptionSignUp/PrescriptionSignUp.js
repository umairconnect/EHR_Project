import React, { useEffect, useState } from 'react';
import { Grid, FormLabel } from "@material-ui/core";
import { FormGroupTitle, FormBtn } from "../../../../../components/UiElements";
import makeStyles from "./styles";
import { CheckCircle as CheckIcon } from '@material-ui/icons';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import moment from 'moment';
function PrescriptionSignUp({ handleNext, handleBack, type, getProcessInfo, ...props }) {
    const classes = makeStyles();
    const [state, setState] = useState({});
    useEffect(() => {
        // init();
        loadData();
    }, []);

    const loadData = () => {
        state.requestTypeCode = type;
        PostDataAPI("setup/epresciption/request/get", state, true).then((result) => {
            if (result.success && result.data != null) {
                //result.data.requestTypeCode = type;
                if (result.data.medicalLicenseExpiry)
                    result.data.medicalLicenseExpiry = result.data.medicalLicenseExpiry.split('T')[0];
                setState(result.data);
                getProcessInfo(result.data);
            }
        })
    }
    const next = () => {
        handleNext(state);
    }

    return (
        <>
            <Grid item container lg={12} direction="row">

                <FormGroupTitle>E-Prescription Sign-up complete</FormGroupTitle>

                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormLabel className={classes.noteText}>Processing your e-Prescribing
                        request can take up to a week</FormLabel>
                </Grid>

                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                    <div className={classes.headingArea}>

                        <FormLabel className={classes.stepHeading}>1. Add your personal details</FormLabel>

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

                        <FormLabel className={classes.stepHeading}>3. Wait while we verify your medical credentials</FormLabel>

                        {
                            state.requestStatusCode == "Verified" || state.requestStatusCode == "Active" ?
                                <CheckIcon className={classes.clockIconChecked} />
                                :
                                <CheckIcon className={classes.clockIcon} />
                        }
                    </div>
                    {type == "epcs" &&
                        (<>
                            <div className={classes.headingArea}>

                                <FormLabel className={classes.stepHeading}>4. Confirm EPCS activation</FormLabel>

                                {
                                    state.requestStatusCode == "Active" ?
                                        <CheckIcon className={classes.clockIconChecked} />
                                        :
                                        <CheckIcon className={classes.clockIcon} />
                                }
                            </div>
                            {state.requestStatusCode == "Active" ?
                                <div className={classes.csSignUpArea}>

                                    <FormLabel className={classes.csSignUpTitle}>EPCS Active</FormLabel>
                                    <FormLabel className={classes.csSignUpText}>EPCS is enabled on <strong>May 22,2021</strong></FormLabel>

                                </div> :
                                <div className={classes.signUpArea}>
                                    <FormLabel className={classes.signUpText}>E-Prescription Controlled Substances signup is pending</FormLabel>
                                    <CheckIcon className={classes.clockIcon} />
                                </div>

                            }
                        </>
                        )
                    }
                    {type == "erx" &&
                        <div className={state.requestStatusCode == "Active" ? classes.signUpAreaChecked : classes.signUpArea}>
                            {/*on {moment(new Date()).format("Do MMMM YYYY")*/}

                            {
                                state.requestStatusCode == "Active" ?
                                    <>
                                        <FormLabel className={classes.signUpTextChecked}>e-Prescription signup is completed </FormLabel>
                                        <CheckIcon className={classes.clockIconChecked} />
                                    </>
                                    :
                                    <>
                                        <FormLabel className={classes.signUpText}>e-Prescription signup is pending</FormLabel>
                                        <CheckIcon className={classes.clockIcon} />
                                    </>
                            }
                        </div>
                    }
                    {
                        state.requestStatusCode != "Active" ?
                            <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormBtn id="save" size="large" onClick={next} btnType="next" disabled={!props.isEditable}>Next</FormBtn>
                            </Grid>
                            : null
                    }

                </Grid>
            </Grid>
        </>
    )
}

export default PrescriptionSignUp
