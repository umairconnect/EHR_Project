import React, { useState,useEffect } from "react";
import { BoxContainer, IconAvatars, FooterButton } from "../../../../dashboard/component/boxContainer/BoxContainer";
import { Grid, Typography } from '@material-ui/core';
import ERAIcon from '../../../../../images/icons/eraBillingDashboardIcon.png';
import RejectedClaimIcon from '../../../../../images/icons/rejectedClaimBillingDashboardIcon.png';
import PendingFollowupIcon from '../../../../../images/icons/pendingFollowupBillingDashboardIcon.png';
import FrequentProcedureIcon from '../../../../../images/icons/frequentProcedureBillingDashboardIcon.png';
//styles
import useStyles from "./styles";
export default function BillingUpdateBox({ ...props }) {
    var classes = useStyles();
    const [state, setState] = useState({});
    const reloadData = () => {
        setState(props.data);
    }

    useEffect(() => {
        reloadData();
    }, [props.isUpdate]);

    return (
        <>
            {/* Messages , Next Appointment, Lab Results, Unsigned Encounters  components  */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Grid container spacing={1} style={{height: "100%"}}>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars title={"ERA to Review"} value={state.text1} bgColor={"#fee0b3"} imgUrl={ERAIcon} IconSize={"43px"} />
                            <Grid container>
                                <MessageStatus title={"Errors"} value={state.text2} />
                                <MessageStatus title={"Warnings"} value={state.text3} />
                            </Grid>
                            <FooterButton title={"View All"} linkUrl={'/app/erareview'} />
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars marginTop={"0.3vw"} marginBottom={"1.3vw"} title={"Rejected Claims"} value={state.text4} bgColor={"#ffe9e9"} imgUrl={RejectedClaimIcon} IconSize={"32px"} />
                            <FooterButton title={"View All"} linkUrl={'/app/billing?isRejectedClaims=true'} />
                            {/* <AppointmentDetails title={"11:30 am"} variant={"body1"} />
                            <AppointmentDetails title={"Ashton Cox"} variant={"h4"} />
                            <AppointmentDetails title={"General Checkup"} variant={"h6"} /> */}
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars marginTop={"0.7vw"} marginBottom={"0.7vw"} title={state.text5 > 0 ? "Pending Follow-Up": "No Pending Follow-Up"} value={state.text5} bgColor={"#dee3ff"} imgUrl={PendingFollowupIcon} IconSize={"32px"} />
                            <FooterButton title={"View All"} linkUrl={'/app/billing?isFollowUps=true'} />
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <BoxContainer>
                            <IconAvatars marginTop={"0.7vw"} marginBottom={"0.7vw"} title={"Frequent Procedures"}  bgColor={"#dcf8d9"} imgUrl={FrequentProcedureIcon} IconSize={"37px"} />
                            <FooterButton title={"View All"} linkUrl={'/app/procedures'} />
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