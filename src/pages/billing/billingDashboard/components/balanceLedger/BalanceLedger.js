import React, { useState, useEffect } from "react";
import {
  BoxContainer,
  FooterButton,
} from "../../../../dashboard/component/boxContainer/BoxContainer";
import { Grid, Typography, Paper, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import FaxIcon from "../../../../../images/icons/dashboardFaxIcon.png";
import FolderIcon from "@material-ui/icons/Folder";
import PatientBalanceLedger from "../../../../../images/icons/patientBalanceLedgerBillingDashboardIcon.png";
import InsuranceBalanceLedger from "../../../../../images/icons/insuranceBalanceLedgerBillingDashboardIcon.png";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { formatCurrency } from '../../../../../components/Common/Extensions';
// styles
import useStyles from "./styles";
export default function BalanceLedger(props) {
    var classes = useStyles();
    const [patientLedger, setPatientLedger] = useState([]);
    const [insuranceLedger, setInsuranceLedger] = useState([]);
    const loadPatientBalanceLedgerRecord = () => {
        var params = {
            SPName: "SP_BILLING_DASHBOARD_PATIENT_LEDGER",
            category:"patient"
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {

            if (result.success && result.data != null) {
                setPatientLedger(result.data);
            }
        });
    }

    const loadInsuranceBalanceLedgerRecord = () => {
        var params = {
            SPName: "SP_BILLING_DASHBOARD_PATIENT_LEDGER",
            category: "insurance"
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {

            if (result.success && result.data != null) {
                setInsuranceLedger(result.data);
            }
        });
    }
    useEffect(() => {
        loadPatientBalanceLedgerRecord();
        loadInsuranceBalanceLedgerRecord();
    }, [])

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {/*  item xs={6}> */}
                      <BoxContainer>
                          <IconAvatarsSmall
                              title={"Patient Balance Ledger"}
                              value={''}
                              textColor={"#b96a13"}
                              bgColor={"#f2e3cf"}
                              imgUrl={PatientBalanceLedger}
                          />
                          <Grid
                              container
                              spacing={2}
                              style={{ marginTop: "20px !important", marginBottom: "20px !important", }}>
                              {patientLedger.length > 0 ?
                                  patientLedger.slice(0,3).map((item) => (
                                      <Grid item xs={4}>
                                          <PendingSuperBill
                                              name={item.text1}
                                              days={item.text2+" Days Balance"}
                                              payment={item.text3 == 0? '-':formatCurrency(item.text3)}
                                          />
                                      </Grid>
                                  ))
                                  : <h1 className={classes.noReportFound}>No Patient Balance Ledger Found</h1>}
              </Grid>
              <FooterButton title={"View All"} linkUrl={"/app/patientledgerreport"} />
            </BoxContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {/* item xs={6}> */}
            <BoxContainer>
              <IconAvatarsSmall
                title={"Insurance Balance Ledger"}
                              value={''}
                textColor={"#525a61"}
                bgColor={"#d8d9da"}
                imgUrl={InsuranceBalanceLedger}
              />
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "20px !important",
                  marginBottom: "20px !important",
                }}
                          >
                              {insuranceLedger.length > 0 ?
                                  insuranceLedger.slice(0,3).map((item) => (
                                      <Grid item xs={4}>
                                          <PendingSuperBill
                                              name={item.text1}
                                              days={item.text2 + " Days Balance"}
                                              payment={item.text3 == 0 ? '-' : formatCurrency(item.text3)}
                                          />
                                      </Grid>
                                  ))
                                  : <h1 className={classes.noReportFound}>No Insurance Balance Ledger Found</h1>}
              </Grid>
              <FooterButton title={"View All"} linkUrl={"/app/patientledgerreport"} disabledBtn={true} />
            </BoxContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function PendingSuperBill(props) {
  var classes = useStyles();
  return (
    <Paper className={classes.box}>
      <Typography className={`${classes.name}`}>{props.name}</Typography>
      <Typography className={`${classes.days}`}>{props.days}</Typography>
      <Typography className={`${classes.payment}`}>{props.payment}</Typography>
    </Paper>
  );
}

{
  /* Documents to sign details components */
}
function DocumentsToSign(props) {
  var classes = useStyles();
  return (
    <Paper className={classes.box}>
      <Typography className={`${classes.name} ${classes.fontStyle}`}>
        {props.name}
      </Typography>
      {/* <Typography className={`${classes.genderAge} ${classes.fontStyle}`}>
        {props.gender} / {props.age}
      </Typography> */}
      <Typography className={`${classes.days}`}>{props.days}</Typography>

      <Typography className={`${classes.payment}`}>
        {" "}
        <span>{props.percentage} %</span> - {props.payment}
      </Typography>
    </Paper>
  );
}
function IconAvatarsSmall(props) {
  var classes = useStyles();
  return (
    <div className={classes.smallContainerBox}>
      {/* Icon Circle Box Small components */}
      <Box style={{ display: "flex", alignItems: "center" }}>
        <div
          className={`${classes.iconCircleBox} ${classes.smallBox}`}
          style={{ backgroundColor: props.bgColor }}
        >
          {props.imgUrl ? (
            <img src={props.imgUrl} alt="dashbord icon" />
          ) : (
            <FolderIcon />
          )}
        </div>
        <Typography
          className={`${classes.iconTitle} ${classes.smallIconTitle} ${classes.fontStyle}`}
          variant="h3"
        >
          {props.title}
        </Typography>
      </Box>
      <Typography
        className={`${classes.iconTitle} ${classes.smallIconTitle} ${classes.fontStyle}`}
        variant="h3"
      >
        {props.value ? (
          <>
            <span style={{ color: props.textColor, fontSize: "48px" }}>
              {props.value}
            </span>
          </>
        ) : null}
      </Typography>
    </div>
  );
}
