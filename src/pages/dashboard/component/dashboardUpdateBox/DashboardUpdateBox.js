import React, { useState, useEffect } from "react"; //, { useState }
import { BoxContainer, IconAvatars, FooterButton } from '../boxContainer/BoxContainer';
import { Grid, Typography } from '@material-ui/core';
import MessageIcon from '../../../../images/icons/dashboardMessageIcon.png';
import noAppointmentIcon from '../../../../images/icons/noAppointment.svg';
import ProfilePic from "../../../../images/profile-pic.jpg";

import PatientIcon from '../../../../images/icons/dashboardPatientIcon.png';
import LabIcon from '../../../../images/icons/dashboardLabIcon.png';
import UnsignedIcon from '../../../../images/icons/dashboardUnsignedIcon.png';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { Link, useHistory } from "react-router-dom";
import { IsEditable } from '../../../../Services/GetUserRolesRights';

// styles
import useStyles from "./styles";
export default function DashboardUpdateBox(props) {
    var classes = useStyles();
    const [upcommingAppointment, setUpcommingAppointment] = useState({ photoPath: '', appointmentTime: '', patientName: '', reasonOfVisit: '' });
    const [state, setState] = useState({ patientMessageCount: 0, providerMessageCount: 0, labResultCount: 0, unsignedEncounterCount: 0 });
    const [moduleAccess, setModuleAccess] = useState({
        isLabResult: false, isMessages: IsEditable("Messages"),
        isClinical: IsEditable("Clinical"),
        isDocumentToSign: false
    })
    const history = useHistory();

    const goToLabResult = () => {
        history.push({
            pathname: '/app/tasks',
            state: {
                name: true,
                isFromDashBoard: true
            }
        });
    }
    function loadLabResultSetting() {
        setModuleAccess(prevState => ({
            ...prevState,
            ['isLabResult']: props.isLabResult,
            ['isRefillRequest']: props.isRefillRequest
        }));
    }
    
    const reloadData = () => {
        if (props.upcommingAppointments != null) {
            props.upcommingAppointments.map((item, i) => {
                setUpcommingAppointment(item);
            })
        }
        setState(props.data);
    }

    useEffect(() => {
        reloadData();
        loadLabResultSetting();
    }, [props.isUpdate]);

    return (
        <>
            {/* Messages , Next Appointment, Lab Results, Unsigned Encounters  components  */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Grid container spacing={1} style={{ height: "100%" }}>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars marginTop={"1vw"} marginBottom={"0.1vw"} title={"New Messages"} value={state.totalMessages} bgColor={"#ccf9d6"} imgUrl={MessageIcon} IconSize={"40px"} />
                            <Grid container>
                                <MessageStatus title={"Patient"} value={state.patientMessageCount} />
                                <MessageStatus title={"Provider"} value={state.providerMessageCount} />
                            </Grid>
                            {moduleAccess.isMessages ? <FooterButton title={"View All"} linkUrl={'/app/messages'} /> : <FooterButton title={"View All"} disabledBtn={true} />}
                           
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars title={props.upcommingAppointments == 0 ? "No Appointment Scheduled" : "Next Appointment"} bgColor={upcommingAppointment.photoPath == '' ? "#EDEDED" : "#c6c4ee"} imgUrl={upcommingAppointment.photoPath == '' ? noAppointmentIcon : "." + upcommingAppointment.photoPath} IconSize={upcommingAppointment.photoPath == '' ? "37px" : "100%"} objectFit="contain" />
                            <AppointmentDetailLink title={upcommingAppointment.appointmentTime} variant={"body1"} />
                            <AppointmentDetails title={upcommingAppointment.patientName} variant={"h4"} />
                            <AppointmentDetails title={upcommingAppointment.reasonOfVisit} variant={"h6"} />
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars title={"Lab Results"} value={state.labResultCount} bgColor={"#d7f5fe"} imgUrl={LabIcon} IconSize={"37px"} />
                            {moduleAccess.isLabResult ? <a  onClick={goToLabResult}>
                                <FooterButton  title={"View All"} />
                            </a> : <FooterButton disabledBtn={true} title={"View All"} />}
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars title={"Unsigned Encounters"} value={state.unsignedEncounterCount} bgColor={"#e7f5f6"} imgUrl={UnsignedIcon} IconSize={"33px"} />
                            {moduleAccess.isClinical ? <FooterButton title={"View All"} linkUrl={'/app/clinical?unsignedEncounters=true'} /> :
                                <FooterButton title={"View All"} disabledBtn={true} />}
                        </BoxContainer>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

{/* Messages Patient, Messages Provider components */ }
function MessageStatus(props) {
    var classes = useStyles();
    return (
        <Typography className={`${classes.subtitle2} ${classes.fontStyle}`} variant="subtitle2">
            {props.title}
            {props.value ?
                <>&nbsp;:&nbsp;{props.value}</>
                : null}
        </Typography>
    );
}


{/* Appointment Time, Name, CheckUp Details components */ }
function AppointmentDetails(props) {
    var classes = useStyles();
    return (
        <Grid container className={classes.subTitleContainer}>
            <Typography className={classes.fontStyle} variant={props.variant}>
                {props.title}
            </Typography>
        </Grid>
    );
}

function AppointmentDetailLink(props) {
    var classes = useStyles();
    return (
        <Grid container className={classes.subTitleContainer}>
            <Typography className={classes.fontStyle} variant={props.variant}>
                <Link to={{
                    pathname: '/app/schedule',
                    search: '',
                    state: "newList",
                }}>{props.title}</Link>
            </Typography>
        </Grid>
    );
}

