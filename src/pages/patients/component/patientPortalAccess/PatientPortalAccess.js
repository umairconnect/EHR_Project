import React, { useState,useEffect } from 'react'

//material ui 
import { Grid, Card, Dialog, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
//custom components
import { InputBaseField } from '../../../../components/InputField/InputField';
import ConfirmInvitation from './components/confirmInvitation/ConfirmInvitation';
import { DraggableComponent, FormBtn, FormGroupTitle, Label, LinkS } from '../../../../components/UiElements/UiElements';
//local images
import CloseIcon from '../../../../images/icons/math-plus.png';
import AddIcon from '../../../../images/icons/add-icon.png';
import CheckIcon from '../../../../images/icons/check.png';
import DeleteIcon from '../../../../images/icons/trash.png';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert';

import { formatDate } from '../../../../components/Common/Extensions';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

//scrollbars
import { Scrollbars } from 'rc-scrollbars';
//styles
import useStyles from './styles';
function PatientPortalAccess({ dialogState, handleClose, showMessage, ...props }) {
    const classes = useStyles();
    const [state, setState] = useState({});
    var date = null;
    const [patientId, setPatientId] = useState(props.patientId)
    const [confirmDialogState, setConfirmDialogState] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    useEffect(() => {
   
      if(confirmDialogState == false)
        loadPatientData()
    });
    const loadPatientData = () => {
        
        if (state.name == null) {
            PostDataAPI("patient/getPatient", patientId).then((result) => {
                if (result.success && result.data != null) {
                    //debugger
                    var invitation = state.invitationStatus;
                    setState(result.data);
                    setState(prevState => ({
                        ...prevState,
                        invitationStatus: result.data.invitationStatus ? result.data.invitationStatus:'',
                    }));
                    
                     date = formatDate(result.data.createDate.toString().split('T')[0]);
                    //if (date) {
                    //    var splitedDate = date.toString();
                    //    registeredDate = formatDate(splitedDate.split('T')[0]);
                    //}
                }
            })
        }

    }

    const loadPatientUpdatedData = () => {
        
           PostDataAPI("patient/getPatient", patientId).then((result) => {
                if (result.success && result.data != null) {
                    
                    var invitation = state.invitationStatus;
                    setState(result.data);
                    setState(prevState => ({
                        ...prevState,
                        invitationStatus: result.data.invitationStatus ? result.data.invitationStatus : '',
                    }));
                    
                    date = formatDate((state.createDate).toString().split('T')[0]);
                    //if (date) {
                    //    var splitedDate = date.toString();
                    //    registeredDate = formatDate(splitedDate.split('T')[0]);
                    //}
                    handleClose()
                }
            })
       

    }
  

    const RevokeInvitation = () => {
       
        
            PostDataAPI("patient/RevokeInvitation", state).then((result) => {
                if (result.success && result.data != null) {
                    loadPatientUpdatedData();
                    showMessage("Success", "Access Revoked Successfully.", "success", 8000);
                    
                    
                }
            })
        

    }
    const CancelInvitation = () => {
      
        
        PostDataAPI("patient/RevokeInvitation", state).then((result) => {
            if (result.success && result.data != null) {
                
                showMessage("Success", "Invitation Cancelled Successfully.", "success", 2000);
                loadPatientUpdatedData();
            }
        })


    }
    const handlecloseinvitation = () => {
        setConfirmDialogState(false);
        loadPatientUpdatedData();
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogState}
                fullWidth={true}
                maxWidth="lg"
            >
                {/* <Divider /> */}
                <div className={classes.dialogContent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle>Patient Portal Access</FormGroupTitle>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMax={260} >
                                <Grid
                                    container
                                    direction="row"
                                    style={{ paddingRight: "17px" }}
                                >
                                    <Grid item lg={12}>
                                        <Card className={classes.cardContainer}>
                                            <Grid container className={classes.cardHeader}>
                                                <Grid item sm={4} md={4} lg={4}>
                                                    <Typography className={classes.cardHeading}>Patient</Typography>
                                                </Grid>
                                                <Grid item sm={4} md={4} lg={4}>
                                                    <Typography className={classes.cardHeading}>Status</Typography>
                                                </Grid>
                                                {/*<Grid item sm={4} md={4} lg={4}>*/}
                                                {/*    <Typography className={classes.cardHeading}>Access Code</Typography>*/}
                                                {/*</Grid>*/}
                                            </Grid>

                                            <Grid container direction='column' className={!state.invitationStatus && state.invitationStatus === '' ? classes.cardItem : classes.invitationCardItem} alignItems='center'>

                                                <Grid item lg={12} className={classes.itemHeader} >
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>

                                                    <Grid container alignItems='center' >
                                                        <Grid item sm={4} md={4} lg={4}>
                                                            <Typography className={classes.cardText}>{state.name}</Typography>
                                                        </Grid>
                                                        <Grid item sm={4} md={4} lg={4} className={classes.warningCotainer}>
                                                            {
                                                                !state.invitationStatus && state.invitationStatus === '' ?
                                                                    <>
                                                                        <Typography className={classes.cardText}>Not invited</Typography>
                                                                        <ErrorOutlineIcon />
                                                                    </> :
                                                                    state.invitationStatus && state.invitationStatus === 'pending' ?
                                                                        <>
                                                                            <RemoveCircleOutlineIcon />
                                                                            <Typography className={classes.cardText}>Pending</Typography>
                                                                        </> :
                                                                        state.invitationStatus && state.invitationStatus === 'accepted' ?
                                                                            <>
                                                                                <img src={CheckIcon} alt="check" className={classes.checkIcon} />
                                                                                <Typography className={classes.cardText}>Enrolled</Typography>
                                                                            </> : null
                                                            }
                                                        </Grid>
                                                        {/*<Grid item sm={4} md={4} lg={4} >*/}
                                                        {/*    {*/}
                                                        {/*        state.invitationStatus && state.invitationStatus === 'pending' ?*/}
                                                        {/*            <Typography className={classes.cardText}>3534654fdnksdlf</Typography>*/}
                                                        {/*            : null*/}
                                                        {/*    }*/}
                                                        {/*</Grid>*/}
                                                    </Grid>

                                                    <Grid container alignItems='center' >
                                                        <Grid item sm={4} md={5} lg={4} >
                                                            <Typography className={classes.cardText}>
                                                                {!state.invitationStatus && state.invitationStatus === '' ?
                                                                    'Send Invite Email to:' :
                                                                    state.emailAddress}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item sm={4} md={4} lg={4} >
                                                            {!state.invitationStatus && state.invitationStatus === '' ?
                                                                 <InputBaseField
                                                                    id="inviteEmail"
                                                                    name="inviteEmail"
                                                                    // IsDisabled={true}
                                                                    onChange={handleChange}
                                                                    value={state.emailAddress}
                                                                /> 
                                                          
                                                                :
                                                                <Typography className={classes.cardText}>{formatDate(String(state.createDate).split('T')[0])}</Typography>
                                                            }
                                                           

                                                        </Grid>
                                                        <Grid item sm={4} md={4} lg={4} >
                                                            {

                                                                !state.invitationStatus && state.invitationStatus === '' ?
                                                                    <FormBtn id="save" btnType="none" onClick={() => setConfirmDialogState(true)}>Send invite</FormBtn>
                                                                    : null
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                   

                                                    <Grid container alignItems='center' className={!state.invitationStatus && state.invitationStatus === '' ? classes.noHeight: ''}> 
                                                        <Grid item sm={4} md={4} lg={4}>
                                                            <Typography className={classes.cardText}>
                                                                {!state.invitationStatus && state.invitationStatus === '' ?
                                                                    '' :
                                                                    state.cellPhone ? state.cellPhone :''}
                                                            </Typography>
                                                            <Typography className={classes.cardText}></Typography>
                                                        </Grid>
                                                        {/* <Label title="Walker R. David" size={4} /> */}
                                                        <Grid item sm={4} md={4} lg={4} >
                                                            {
                                                                
                                                                    state.invitationStatus && state.invitationStatus === 'pending' ?
                                                                        <>
                                                                            <LinkS onClick={() => setConfirmDialogState(true)}>Resend invite</LinkS> | <LinkS onClick={CancelInvitation} >Cancel Invite</LinkS>
                                                                        </> :
                                                                        state.invitationStatus && state.invitationStatus === 'accepted' ?
                                                                            <LinkS onClick={RevokeInvitation} >Revoke Access</LinkS> : null
                                                            }

                                                        </Grid>
                                                        <Grid item sm={4} md={4} lg={4} >
                                                            {

                                                                //!state.invitationStatus && state.invitationStatus === '' ?
                                                                //    <FormBtn id="save" btnType="none" onClick={() => setConfirmDialogState(true)}>Send invite</FormBtn>
                                                                //    : null
                                                            }
                                                        </Grid>
                                                    </Grid>

                                                </Grid>

                                            </Grid>

                                            {/*<Grid container className={!state.invitationStatus && state.invitationStatus === '' ? classes.cardItem : classes.invitationCardItem} alignItems='center' >*/}
                                            {/*    <Grid item lg={12} className={classes.itemHeader} >*/}
                                            {/*        <Typography >Other Users</Typography>*/}
                                            {/*    </Grid>*/}
                                            {/*    <Grid item lg={12}>*/}
                                            {/*        {*/}
                                            {/*            state.invitationStatus && state.invitationStatus === 'accepted' ?*/}
                                            {/*                <Grid container alignItems='center' >*/}
                                            {/*                    <Grid item sm={4} md={4} lg={4}>*/}
                                            {/*                        <Typography className={classes.cardText}>Don Carlos</Typography>*/}
                                            {/*                    </Grid>*/}
                                            {/*                    <Grid item sm={4} md={4} lg={4} >*/}
                                            {/*                        <Typography className={classes.cardText}>Child</Typography>*/}
                                            {/*                    </Grid>*/}
                                            {/*                    <Grid item sm={4} md={4} lg={4} >*/}
                                            {/*                        <div className={classes.deleteContainer}>*/}
                                            {/*                            <img src={DeleteIcon} alt="delete" className={classes.deleteIcon} />*/}
                                            {/*                        </div>*/}
                                            {/*                    </Grid>*/}
                                            {/*                </Grid>*/}
                                            {/*                : null*/}
                                            {/*        }*/}
                                            {/*        {state.invitationStatus && state.invitationStatus !== 'accepted' ?*/}
                                            {/*            <Grid container alignItems='flex-start' >*/}

                                            {/*                <Grid item sm={4} md={4} lg={4}>*/}
                                            {/*                    <span className={classes.addNew} title={"Add New "}>*/}
                                            {/*                        <img src={AddIcon} alt="Add New" />Add Users*/}
                                            {/*                    </span>*/}
                                            {/*                </Grid>*/}
                                            {/*                <Grid item sm={8} md={8} lg={8} className={classes.warningCotainer}>*/}
                                            {/*                    <Typography className={classes.cardText}>Invite a family member, caregiver, or guardian to access this paient’s health records</Typography>*/}
                                            {/*                </Grid>*/}
                                            {/*            </Grid> :*/}
                                            {/*            <Grid container alignItems='flex-start' className={classes.addNewContainer}>*/}
                                            {/*                <Grid item lg={12}>*/}
                                            {/*                    <span className={classes.addNew} title={"Add New "}>*/}
                                            {/*                        <img src={AddIcon} alt="Add New" />Add Users*/}
                                            {/*                    </span>*/}
                                            {/*                </Grid>*/}
                                            {/*            </Grid>*/}
                                            {/*        }*/}

                                            {/*    </Grid>*/}
                                            {/*</Grid>*/}

                                        </Card>

                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>

                            <div className={classes.footerRight}>
                                <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>
                               {/* <FormBtn id="save" btnType="done" >Done</FormBtn>*/}     
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <ConfirmInvitation dialogState={confirmDialogState} patientId={patientId} patientState={state} handleClose={handlecloseinvitation} />
        </>
    )
}

export default withSnackbar(PatientPortalAccess)