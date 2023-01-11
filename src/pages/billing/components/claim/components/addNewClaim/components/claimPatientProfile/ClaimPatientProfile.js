
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Card, Grid, Typography, Dialog, Divider } from "@material-ui/core";
import { FormGroupTitle, DraggableComponent } from '../../../../../../../../components/UiElements/UiElements';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import ProfileImage from "../../../../../../../../images/profile-pic.jpg"
import VitalSignDialogGrid from "../../../../../../../patients/component/vitalSigns/VitalSigns"
import Demographics from '../../../../../../../patients/component/demographics/Demographics';
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import useStyles from "./styles";
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { IsEditable } from '../../../../../../../../Services/GetUserRolesRights';
function ClaimPatientProfile({ onVitalsClick, onNewAppointmentClick, onNewReferralClick, onFaxClick, onPrintClick, encounterId, encouID, ...props }) {
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const classes = useStyles();
    const [dataId, setDataId] = useState(props.dataId);
    // const [patientAppointmentId, setPatientAppointmentId] = useState(props.patientAppointmentId);
    const [vitalDialogOpenClose, setVitalDialogOpenClose] = useState(false);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    // const [isCloseView, setIsCloseView] = useState(true);
    const [insuranceTabId, setInsuranceTabId] = useState(0);


    const [values, setValues] = useState({
        patientName: "", genderCode: "", birthDate: "", age: "", roomName: "", appointmentDatetime: "", primaryInsurence: "", secondaryInsurence: "",
        locationName: "", photoPath: ""
    });
    useEffect(() => {

        console.log(props);
        if (props.patientId > 0 || encouID > 0)
            loadHeaderSummary(encouID);

    }, [demographicsDialogOpenClose, encouID, props.patientId]);



    function loadHeaderSummary(encouID) {

        var params = {
            id: encouID ? parseInt(encouID) : 0,
            text1: props.patientId ? props.patientId.toString() : ""
        };

        PostDataAPI("claim/getClaimHeaderInformation", params).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                // console.log(result.data)
                setValues(result.data);
                if (!!props.getExternalModulesCall) {
                    props.getExternalModulesCall({
                        patientAppointmentId: result.data.patientAppointmentId,
                        userLocationId: result.data.userLocationId,
                        patientName: result.data.patientName
                    });
                }

                //if (result.data.payerNamePrimary != "" || result.data.payerNameSecondary != "") {

                //    setInsExist();
                //}
            }
            else {
                //showMessage("Error", result.message, "error", 3000);
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
        setInsuranceTabId(0)
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
        setInsuranceTabId(0)
    }

    const openInsurance = () => {
        setDemographicsDialogOpenClose(true);
        setInsuranceTabId(3)
    }
    return (
        <>
            {
                vitalDialogOpenClose ?
                    (<VitalSignDialogGrid dialogOpenClose={vitalDialogOpenClose} dataId={props.dataId} handleClose={closeVitalSignsGridForm} />)
                    : ('')
            }
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                {/* <Collapse in={!isCloseView} collapsedHeight={75} className={classes.collapseArea} > */}
                <Card className={classes.mainCard}>
                    <div className={classes.mainContentArea}>
                        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>

                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} container direction="row" justify="center" alignItems="center" >
                                <img
                                    src={values.photoPath ? "." + values.photoPath : ProfileImage}
                                    alt="User DP"
                                    className={classes.userDp}
                                    onError={(e) => (e.target.onerror = null, e.target.src = ProfileImage)}
                                />
                                {/* <Avatar classes={{ root: classes.customavatarImageRoot }}
                                    src={values.photoPath ? "." + values.photoPath : ProfileImage}
                                    // src={values.photoPath ? "." + values.photoPath : "./static/media/profile-pic.7e2ec63d.jpg"}
                                    alt="ProfileImage"
                                    className={classes.avatarImage} >
                                    {/* <img src={ProfileImage} className={classes.altAvatarImage} /> 
                                </Avatar> */}
                            </Grid>
                            <Grid container item direction="row" xs={10} sm={11} md={11} lg={11} xl={11} className={classes.centerGrid}>

                                <Grid container item direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid container item alignItems="flex-start" justify="flex-start" direction="column" xs={12} sm={12} md={8} lg={8} xl={8} >

                                        <div className={classes.closedViewItemsAera}>

                                            <Typography className={classes.patientName} ><span onClick={() => setDemographicsDialogOpenClose(true)}>{values.patientName}</span></Typography>

                                            <Typography className={classes.Detail}>
                                                {values.genderCode ? `${values.genderCode} |` : ""} {values.age ? `${values.age} |` : ""} {values.birthDate}
                                            </Typography>

                                            {/* <div className={classes.closedViewItemsInnerAera}>
                                                <Typography className={classes.Detail}>
                                                    Appointment: {values.appointmentDatetime ? values.appointmentDatetime + '' : ""} {values.locationName ? ' | ' + values.locationName : ""} {values.roomName ? '- ' + values.roomName + ' | ' : ""}
                                                </Typography>
                                                
                                                <span style={{ display: "flex", marginRight: "5px" }}>
                                                    <Typography className={classes.insuranceLabel}>Primary Ins:</Typography>
                                                    <Typography className={classes.insuranceName}>{values.payerNamePrimary ? values.payerNamePrimary : ""}</Typography>
                                                </span>


                                                <span style={{ display: "flex" }}>
                                                    <Typography className={classes.insuranceLabel}>Secondary Ins:</Typography>
                                                    <Typography className={classes.insuranceName}>{values.payerNameSecondary ? values.payerNameSecondary : ""}</Typography>
                                                </span>

                                            </div> */}
                                        </div>

                                    </Grid>

                                    <Grid className={classes.shiftContent} container item alignItems="center" justify="flex-end" xs={12} sm={12} md={4} lg={4} xl={4} >
                                        {encounterId ?
                                            <Button startIcon={<PeopleIcon />} className={classes.Btn} onClick={openDemographics}>Demographics</Button>
                                            : ""}
                                        <Button startIcon={<FavoriteBorderIcon />} className={classes.Btn} onClick={openVitalSignsGridForm}>Vitals</Button>

                                        <Button className={classes.Btn}>
                                            <Link className={classes.linkItem} to={{
                                                pathname: '/app/schedule',
                                                search: '',
                                                state: {
                                                    new: "new",
                                                    patientName: values.name,
                                                    dataID: dataId
                                                },
                                            }}><AddIcon /> New Appointment</Link>
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid container item alignItems="flex-start" justify="flex-start" direction="column" xs={12} sm={12} md={12} lg={12} xl={12} >

                                        <div className={classes.closedViewDetailsItemsAera}>
                                            <div className={classes.closedViewItemsInnerAera}>
                                                {values.appointmentDatetime ?
                                                    <Typography className={classes.Detail}>
                                                        {`${values.appointmentDatetime ? `Appointment:  ${values.appointmentDatetime}` : ""}
                                                        ${values.locationName ? ' | ' + values.locationName : ""}
                                                        ${values.roomName ? '- ' + values.roomName + ' | ' : ""}`}
                                                    </Typography>
                                                    : null}
                                                {
                                                    !!values.payerNamePrimary &&
                                                    <span style={{ display: "flex", marginRight: "5px" }}>
                                                        <Typography className={classes.insuranceLabel}>Primary Ins:</Typography>
                                                        <Typography onClick={() => openInsurance()} className={classes.insuranceName}>{values.payerNamePrimary ? values.payerNamePrimary : ""}</Typography>
                                                    </span>
                                                }
                                                {!!values.payerNameSecondary &&
                                                    <span style={{ display: "flex" }}>
                                                        <Typography className={classes.insuranceLabel}>Secondary Ins:</Typography>
                                                        <Typography onClick={() => openInsurance()} className={classes.insuranceName}>{values.payerNameSecondary ? values.payerNameSecondary : ""}</Typography>
                                                    </span>
                                                }



                                            </div>
                                        </div>

                                    </Grid>
                                </Grid>

                            </Grid>

                        </Grid>
                    </div>
                </Card>
                {/* </Collapse> */}
            </Grid>
            {demographicsDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={demographicsDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Demographics</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Demographics dataId={props.patientId} insuranceSelect={insuranceTabId} isEditable={isEditable} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
        </>
    );
}

export default withSnackbar(ClaimPatientProfile)