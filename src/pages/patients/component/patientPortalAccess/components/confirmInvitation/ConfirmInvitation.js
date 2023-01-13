import React, { useState,useEffect } from 'react'

//material ui 
import { Grid, Card, Dialog, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
//local images
import CloseIcon from '../../../../../../images/icons/math-plus.png';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
//custom components

import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../components/Message/Alert';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from '../../../../../../components/UiElements/UiElements';

//scrollbars
import { Scrollbars } from 'rc-scrollbars';
//styles
import useStyles from './styles';
import { InputBaseField } from '../../../../../../components/InputField/InputField';
function ConfirmInvitation({ dialogState, handleClose, showMessage, ...props }) {
    const classes = useStyles();
    //debugger
    const [patientId, setPatientId] = useState(props.patientId);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [state, setState] = useState([]);
    const [isdisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        
       setState(props.patientState)
       
    });
    const loadPatientData = () => {
        setIsDisabled(true);
        state.encUserID = userInfo.loggedInUserID;
        PostDataAPI("patient/sendPortalInvitation", state).then((result) => {
            if (result.success && result.data != null) {
                //debugger
                
                    showMessage("Success", "Invitation Email sent successfully.", "success", 3000);
                handleClose();
                setIsDisabled(false);

                
            }
        })
    }
    return (
        <Dialog
            PaperComponent={DraggableComponent}
            // classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogState}
            fullWidth={true}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
        >
            {/* <Divider /> */}
            <div className={classes.dialogContent} >
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle>Confirm Invitation</FormGroupTitle>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={180} autoHeightMax={230} >
                            <Grid
                                container
                                direction="row"
                                alignItems='center'
                                justifyContent='center'
                                className={classes.container}
                            >
                                <Grid item lg={12}>
                                    <ErrorOutlineIcon className={classes.WarningIcon} />
                                    <Typography className={classes.cardText}>By clicking "Invite" you affirm that the patient is authorized to access his record(s).</Typography>
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>
                            <FormBtn id="save" disabled={isdisabled} onClick={loadPatientData} btnType="invite" >Invite</FormBtn>
                            <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default withSnackbar(ConfirmInvitation);