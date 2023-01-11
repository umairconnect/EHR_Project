import React, { useState,useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import UnderPaidIcon from "../../../../../images/icons/underPaidBillingDashboardIcon.png";
import { useHistory } from "react-router-dom";
import { Progress } from "antd";
import { formatDate, formatCurrency, formatNumber } from '../../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import {
  BoxContainer,
  IconAvatars,
  FooterButton,
} from "../../../../dashboard/component/boxContainer/BoxContainer";

import useStyles from "./styles";
export default function PaymentsUnderPaid({ showMessage, ...props }) {
    var classes = useStyles();
    const [daySheet, setDaySheet] = useState({ column1: "0.00", column2: "0.00", column3: "0.00", column4: "0.00" });
    const [underPaidItemsCount, setUnderPaidItemsCount] = useState(0);
    const reloadData = () => {
        
        setDaySheet(props.data);
        setUnderPaidItemsCount(props.underPaidItemCount);
    }
    
    useEffect(() => {
        reloadData();
    }, [props.isUpdate]);
    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Grid container spacing={1} direction="row" style={{height: "100%"}}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <BoxContainer>
                            <Typography className={classes.heading}>
                                Billing Summary
                            </Typography>
                            <Box className={classes.boxStyle}>
                                <Grid container xs={6} direction="column">
                                    <Grid>
                                        <Typography className={classes.subHeading}>
                                            Debit
                                        </Typography>
                                        <Typography
                                            className={classes.value}
                                            style={{ color: "#EB5757" }}>
                                            ${formatNumber(daySheet.column1)}
                                        </Typography>
                                    </Grid>
                                    <Grid style={{ marginTop: "20px" }}>
                                        <Typography className={classes.subHeading}>
                                            Credit
                                        </Typography>
                                        <Typography
                                            className={classes.value}
                                            style={{ color: "#6FCF97" }}>
                                            ${formatNumber(daySheet.column2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid xs={6} container direction="column">
                                    <Grid>
                                        <Typography className={classes.subHeading}>
                                            PATIENT PAYMENTS
                                        </Typography>
                                        <Typography
                                            className={classes.value}
                                            style={{ color: "#1054AE" }}>
                                            ${formatNumber(daySheet.column4)}
                                        </Typography>
                                    </Grid>
                                    <Grid style={{ marginTop: "20px" }}>
                                        <Typography className={classes.subHeading}>ADJUSTMENTS
                                        </Typography>
                                        <Typography
                                            className={classes.value}
                                            style={{ color: "#F2994A" }}>
                                            ${formatNumber(daySheet.column3)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <BoxContainer>
                            <IconAvatars
                                marginTop={"20px"} marginBottom={"20px"} 
                                title={"Underpaid Items"}
                                value={underPaidItemsCount}
                                bgColor={"#d6f6ff"}
                                imgUrl={UnderPaidIcon}
                                IconSize={"43px"}
                                 />
                            <FooterButton title={"View All"} linkUrl={"/app/underpaiditemreports?isFromDashboard=true"} />
                        </BoxContainer>
                    </Grid>
                </Grid>
            </Grid>
        </>);
}

