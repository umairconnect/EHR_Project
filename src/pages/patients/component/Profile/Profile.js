
import React, { useState, useEffect } from "react";

import {
    FormLabel,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';

import { Link } from "react-router-dom";
import { Avatar, Button, Card, Grid, Typography, Divider } from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';

import ProfileImage from "../../../../images/profile-pic.jpg"
import PhoneIcon from "../../../../images/icons/PhoneIcon.png"
import MailIcon from "../../../../images/icons/MailIcon.png"
import Home from "../../../../images/icons/Home.png"
import FaxIcon from "../../../../images/icons/FaxIcon.png"
import PrintIcon from "../../../../images/icons/PrintIcon.png"
import CloseIcon from "../../../../images/icons/math-plus.png";
import InviteIcon from "../../../../images/icons/invite.png"
import VitalSignDialogGrid from "../../component/vitalSigns/VitalSigns"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { DraggableComponent, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { Scrollbars } from "rc-scrollbars"

import { formatDate, formatTime } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import Demographics from '../demographics/Demographics';
import { withSnackbar } from "../../../../components/Message/Alert";
import PatientPortalAccess from "../patientPortalAccess/PatientPortalAccess";
import { IsEditable } from '../../../../Services/GetUserRolesRights';
import useStyles from "./styles";
function Profile({ onVitalsClick, onNewAppointmentClick, onNewReferralClick, onFaxClick, onPrintClick, encounterId, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isScheduleEditable, setIsScheduleEditable] = useState(IsEditable("Schedule"));
    const [patientPortalDialogState, setPatientPortalDialogState] = useState(false)

    const [dataId, setDataId] = useState(props.dataId);
    const [patientAppointmentId, setPatientAppointmentId] = useState(props.patientAppointmentId);
    const [vitalDialogOpenClose, setVitalDialogOpenClose] = useState(false);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [isCloseView, setIsCloseView] = useState(true);

    const [values, setValues] = useState({
        photoPath: "", name: "", genderCode: "", age: "", dob: "", cellPhone: "", emailAddress: "", address: "",
        cds: "Mammogram Screening for all men aged 40-74 Adult Immunization Schedule Age: 27-40", primaryProvider: "", dateAdded: "01/01/2021",
        lastAppointment: "", nextAppointment: "",
    });

    useEffect(() => {
        console.log(props.isEditable)
        //if (encounterId > 0)
        loadPatientSummary();
    }, [demographicsDialogOpenClose, encounterId]);

    const patientportalclose = () => {
        
        loadPatientSummary();
        setPatientPortalDialogState(false);
      


    }
    const patientportalopen = () => {
        
        setPatientPortalDialogState(true);
        loadPatientSummary();


    }
    function loadPatientSummary() {
        let params = [];
        if (encounterId)
            params = [] = [dataId, encounterId.toString()];
        else
            params = [] = [dataId.toString()];
        PostDataAPI("patient/getPatientSummaryInfo", params).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                setValues(result.data);
                if (props.getPatientName) {
                    props.getPatientName(result.data.name)
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }
    function openVitalSignsGridForm() {
        setVitalDialogOpenClose(true);
    }
    const closeVitalSignsGridForm = () => {
        setVitalDialogOpenClose(false);
    }
    const openDemographics = () => {
        setDemographicsDialogOpenClose(true);
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const handleClick = (value) => {
        alert(`${value} button was clicked`)
    };
    const encounterDialogOpen = () => {

        props.dialogEncounterOpen(true)
    }
    // console.log(props.dataId);
    return (
        <>
            {
                vitalDialogOpenClose ?
                    (<VitalSignDialogGrid dialogOpenClose={vitalDialogOpenClose} dataId={dataId} handleClose={closeVitalSignsGridForm} />)
                    : ('')
            }
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Collapse in={!isCloseView} collapsedHeight={75} className={classes.collapseArea} >
                    <Card className={classes.mainCard}>
                        <div className={classes.mainContentArea}>
                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>

                                {isCloseView ?
                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} container direction="row" justify="center" alignItems="center" >
                                        <Avatar classes={{ root: classes.customavatarImageRoot }}
                                            src={values.photoPath ? "." + values.photoPath : ProfileImage}
                                            alt="ProfileImage"
                                            className={classes.avatarImage} >
                                            <img src={ProfileImage} className={classes.altSmallAvatarImage} />
                                        </Avatar>
                                    </Grid>
                                    :
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} container direction="row" justify="center" alignItems="center" >
                                        <Avatar classes={{ root: classes.avatarImageRoot }}
                                            src={values.photoPath ? "." + values.photoPath : ProfileImage}
                                            alt="ProfileImage"
                                            classname={classes.avatarImage} >
                                            <img src={ProfileImage} className={classes.altLargeAvatarImage} />
                                        </Avatar>
                                    </Grid>

                                }
                                <Grid container direction="row" item xs={10} sm={isCloseView ? 11 : 10} md={isCloseView ? 11 : 10} lg={isCloseView ? 11 : 10} xl={isCloseView ? 11 : 10} className={classes.centerGrid}>

                                    <Grid container direction="row" item alignItems="flex-start" justify="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid container item className={classes.infoContent} alignItems="flex-start" justify="flex-start" direction="column" xs={12} sm={12} md={6} lg={6} xl={6} >

                                            <div className={classes.closedViewItemsAera}>
                                                <div className={classes.patientNameInfoArea}>
                                                    <Typography className={classes.Name}>{values.name}</Typography>

                                                    <Typography className={classes.Detail}>
                                                        {values.genderCode ? `${values.genderCode} |` : ""} {values.age ? `${values.age} Year (s) |` : ""} {values.dob}
                                                    </Typography>
                                                </div>
                                                <div className={classes.closedViewItemsInnerAera}>
                                                    {
                                                        isCloseView ?
                                                            <Grid container item alignItems="flex-start" justify="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                                <>
                                                                    <span>
                                                                        <Avatar classes={{ root: classes.btnIconRoot }} vairent="square" className={classes.BtnIcon} src={PhoneIcon} />
                                                                        {values.cellPhone ?
                                                                            <Typography className={classes.PersonalDetail}>
                                                                                {values.cellPhone}
                                                                            </Typography > :
                                                                            <FormLabel className={classes.missingColor}>Missing </FormLabel>

                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        <Avatar classes={{ root: classes.btnIconRoot }} vairent="square" className={classes.BtnIcon} src={MailIcon} />
                                                                        {values.emailAddress ?
                                                                            <Typography className={classes.PersonalDetail}>
                                                                                {values.emailAddress}
                                                                            </Typography> :
                                                                            <FormLabel className={classes.missingColor}>Missing </FormLabel>
                                                                        }
                                                                    </span>
                                                                </>

                                                            </Grid>
                                                            : ""
                                                    }
                                                </div>
                                            </div>

                                        </Grid>

                                        <Grid className={classes.controlContent} item container alignItems="center" justify="flex-end" xs={12} sm={12} md={6} lg={6} xl={6} >
                                            {encounterId ?
                                                <Button startIcon={<PeopleIcon />} className={classes.Btn} onClick={openDemographics}>Demographics</Button>
                                                : ""}
                                            <Button startIcon={<FavoriteBorderIcon />} className={classes.Btn} onClick={openVitalSignsGridForm}>Vitals</Button>

                                            <Button className={classes.Btn} disabled={!isScheduleEditable}>
                                                <Link className={classes.linkItem} to={{
                                                    pathname: '/app/schedule',
                                                    search: '',
                                                    state: {
                                                        new: "new",
                                                        patientName: values.name,
                                                        dataID: dataId
                                                    },
                                                }} disabled={!isScheduleEditable}><AddIcon /> New Appointment</Link>
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid item orientation="vertical" container flexitem="true" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}> <Divider /></Grid>

                                    {isCloseView ? "" :
                                        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Grid container item justify="flex-start" direction="row" xs={7} sm={12} md={6} lg={6} xl={6} >

                                                <Grid container item alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                    {encounterId ?
                                                        <>
                                                            <FormLabel className={classes.Title}>
                                                                Encounter Date :
                                                            </FormLabel>
                                                            <Typography className={classes.TitleDetail}>
                                                                {values.dateAdded}
                                                            </Typography>
                                                        </>
                                                        :
                                                        <>
                                                            <Avatar classes={{ root: classes.btnIconRoot }} vairent="square" className={classes.BtnIcon} src={PhoneIcon} />
                                                            {values.cellPhone ?
                                                                <Typography className={classes.PersonalDetail}>
                                                                    {values.cellPhone}
                                                                </Typography > :
                                                                <FormLabel className={classes.missingColor}>Missing </FormLabel>

                                                            }
                                                            <Avatar classes={{ root: classes.btnIconRoot }} vairent="square" className={classes.BtnIcon} src={MailIcon} />
                                                            {values.emailAddress ?
                                                                <Typography className={classes.PersonalDetail}>
                                                                    {values.emailAddress}
                                                                </Typography> :
                                                                <FormLabel className={classes.missingColor}>Missing </FormLabel>

                                                            }

                                                        </>
                                                    }

                                                </Grid>

                                                {encounterId ?
                                                    <Grid container item alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <div className={classes.Area}>
                                                            <div className={classes.providerLocationLeftArea}>
                                                                <FormLabel className={classes.Title}>
                                                                    Provider:
                                                                </FormLabel>
                                                                <Typography className={classes.customTitleblack}>
                                                                    {values.primaryProvider}
                                                                </Typography>
                                                            </div>
                                                            <div className={classes.providerLocationRightArea}>
                                                                <FormLabel className={classes.Title}>
                                                                    Location:
                                                                </FormLabel>
                                                                <Typography className={classes.customTitleblack}>
                                                                    {values.locationName}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    :
                                                    <Grid container item alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Grid container direction="row" style={{ flexWrap: "nowrap" }}>
                                                            <Avatar classes={{ root: classes.btnIconRoot }} vairent="square" className={classes.BtnIcon} src={Home} />
                                                            {values.address ?
                                                                <Typography className={classes.PersonalDetail}>
                                                                    {values.address}
                                                                </Typography> :
                                                                <FormLabel className={classes.missingColor}>No address on file </FormLabel>
                                                            }
                                                        </Grid>
                                                    </Grid>}

                                                <Grid container item alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                    {encounterId ?
                                                        <div className={classes.providerLocationArea}>
                                                            <div className={classes.providerLocationLeftArea}>
                                                                <FormLabel className={classes.Title}>
                                                                    Visit Type:
                                                                </FormLabel>
                                                                <Typography className={classes.customTitleblack}>
                                                                    {values.visitTypeName}
                                                                </Typography>
                                                            </div>
                                                            <div className={classes.providerLocationLeftArea}>
                                                                <FormLabel className={classes.Title} isDisabled={true} >
                                                                    Check-In:
                                                                </FormLabel>
                                                                <Typography className={classes.customTitleDetail} style={{ cursor: "pointer" }} onClick={() => encounterDialogOpen()}  >
                                                                    {values.checkInTime}
                                                                </Typography>
                                                            </div>
                                                            <div className={classes.providerLocationLeftArea}>
                                                                <FormLabel className={classes.Title}>
                                                                    Check-out:
                                                                </FormLabel>
                                                                <Typography className={classes.customTitleDetail}>
                                                                    {values.checkOutTime}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        :
                                                        <>

                                                        </>

                                                    }
                                                    <Grid item alignItems="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <FormLabel className={classes.Title}>
                                                            CDS:
                                                        </FormLabel>
                                                        {values?.lstCDSRule?.map(item => (
                                                            <Typography className={classes.TitleDetail}>
                                                                {item.description}
                                                            </Typography>
                                                        ))}

                                                    </Grid>
                                                </Grid>

                                                {encounterId ? "" :
                                                    <Grid container item alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                        <FormLabel className={classes.Title}>
                                                            Primary Provider:
                                                        </FormLabel>
                                                        <Typography className={classes.TitleDetail}>
                                                            {values.primaryProvider}
                                                        </Typography>
                                                    </Grid>}

                                            </Grid>

                                            <Grid className={classes.shiftContent} container item direction="row" justify="flex-end" xs={5} sm={12} md={6} lg={6} xl={6} >

                                                {encounterId ? "" :
                                                    <>
                                                        <Grid className={classes.shiftContent} item container alignItems="center" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                            <FormLabel className={classes.Title}>
                                                                Date Added:
                                                            </FormLabel>
                                                            <Typography className={classes.DateDetail}>
                                                                {values.dateAdded}
                                                            </Typography>
                                                        </Grid>
                                                    </>}

                                                <Grid className={classes.shiftContent} container item alignItems="center" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <ul>
                                                        <li style={{ display: "flex", alignItems: "baseline" }}>
                                                            <FormLabel className={classes.Title}>
                                                                Last Appointment:
                                                            </FormLabel>
                                                            <Typography className={classes.DateDetail}>
                                                                {values.lastAppointment}
                                                            </Typography>
                                                        </li>

                                                        <li style={{ display: "flex", alignItems: "baseline" }}>
                                                            <FormLabel className={classes.Title}>
                                                                Next Appointment:
                                                            </FormLabel>
                                                            <Typography className={classes.DateDetail}>
                                                                {values.nextAppointment}
                                                            </Typography>
                                                        </li>
                                                    </ul>




                                                </Grid>



                                                <Grid className={classes.shiftContent} container item alignItems="center" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                    <Card className={classes.secondaryCard}>

                                                        {!values.invitationStatus?
                                                        <>

                                                            <Button
                                                                startIcon={<img src={InviteIcon} alt="invite-icon" className={classes.groupBtnIcon} />}
                                                                className={classes.cardButton}
                                                                onClick={patientportalopen}>Invite to Patient Portal</Button>

                                                        </>
                                                        
                                                        :
                                                        <>
                                                            <Button
                                                                startIcon={<img src={InviteIcon} alt="invite-icon" className={classes.groupBtnIcon} />}
                                                                className={classes.cardButton}
                                                                onClick={patientportalopen}>Patient Portal Status</Button>

                                                        </>
                                                        }
                                                        {/*<Button disabled startIcon={<AddIcon className={classes.groupBtnIcon} />} className={classes.cardButton}>New Referral</Button>

                                                        <Button disabled startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                                            className={classes.groupBtnIcon} src={FaxIcon} />} className={classes.cardButton}>Fax</Button>

                                                        <Button disabled startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                                            className={classes.groupBtnIcon} src={PrintIcon} />} className={classes.cardButton}>Print</Button>*/}

                                                    </Card>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    }

                                </Grid>

                                <div className={classes.arrowIcon}>
                                    {isCloseView ? <ExpandMoreIcon onClick={() => setIsCloseView(false)} /> : <ExpandLessIcon onClick={() => setIsCloseView(true)} />}
                                </div>

                            </Grid>
                        </div>
                    </Card>
                </Collapse>
            </Grid>

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                fullWidth={true}
            >
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title" style={{ cursor: "move" }}>
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Demographics</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <div className={classes.content}>
                                <Demographics dataId={dataId} isEditable={props.isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <Divider />
                <DialogActions className={classes.dialogactions}>
                    &nbsp;
                    <br />

                    {/* <FormBtn id="reset" onClick={closeDemographics} >Close</FormBtn> */}
                </DialogActions>
                {/* </Scrollbars> */}
            </Dialog>
            {patientPortalDialogState ? <PatientPortalAccess dialogState={patientPortalDialogState} handleClose={patientportalclose} patientId={dataId} />:""}
            

        </>
    );
}
export default withSnackbar(Profile)
