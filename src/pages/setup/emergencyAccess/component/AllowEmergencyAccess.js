import React, { useState, useEffect } from 'react'
import useStyles from "./styles";
import {
    Container,
    Grid,
    Button,
    Dialog
} from '@material-ui/core';
import { FormGroupTitle, FormBtn, DraggableComponent, Label } from "../../../../components/UiElements/UiElements";
import CloseIcon from "../../../../images/icons/math-plus.png"
import InfoIcon from "../../../../images/icons/info.svg"


function AllowEmergencyAccess({ showEmergencyAllow, handleClose, changeEmergencyStatus, logoutUser, emergencyAllowModalOff, ...props }) {
    var classes = useStyles();

    const Activatelogout = ()=>{
        changeEmergencyStatus();
        logoutUser();
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                open={showEmergencyAllow}
                classes={{ paper: classes.allowAccessPaper }}
                onClose={handleClose}
            >
                <div className={classes.allowAccessContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            {emergencyAllowModalOff ?
                                <FormGroupTitle>Deactivating Emergency Access Mode</FormGroupTitle>
                                : <FormGroupTitle>Activating Emergency Access Mode</FormGroupTitle>}
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>

                        </div>
                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" lg={12}>
                            <img src={InfoIcon} className={classes.infoIcon} />
                        </Grid>
                        <Grid container direction="row" lg={12}>
                            {emergencyAllowModalOff ?
                                <>
                                    <p className={classes.paragraf}>Your emergency access will be disabled and you will be logged out of the system, are you sure you want to proceed?</p>
                                </> :
                                <>
                                    <p className={classes.paragraf}>You will be logged out of your EHR account and emergency access mode will be available when you log back in. All practice users will be notified when emergency access mode is activated.</p>
                                </>
                            }

                        </Grid>

                        <Grid container direction="row" lg={12}>
                            {emergencyAllowModalOff ?
                                <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "right" }}>
                                        <FormBtn id="reset" onClick={handleClose}>No</FormBtn>
                                        <FormBtn id="noIcon" onClick={Activatelogout}>Yes</FormBtn>
                                    </Grid>
                                </> : <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "right" }}>
                                        <FormBtn id="noIcon" onClick={Activatelogout}>Activate and Logout </FormBtn>
                                        <FormBtn id="reset" onClick={handleClose}>Cancel </FormBtn>
                                    </Grid>
                                </>}

                        </Grid>
                    </div>

                </div>
            </Dialog>
        </>
    )
}

export default AllowEmergencyAccess;

