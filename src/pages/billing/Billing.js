import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';

import PageTitle from "../../components/PageTitle/PageTitle";
import BillingDashboard from "./billingDashboard/BillingDashboard";

import TodayAppointments from '../dashboard/component/todayAppointments/TodayAppointments';
import DashboardUpdateBox from '../dashboard/component/dashboardUpdateBox/DashboardUpdateBox';
import PatientsAppointments from '../dashboard/component/patientsAppointments/PatientsAppointments';
import DateRefillBox from '../dashboard/component/dateRefillBox/DateRefillBox';
import BillsSignFaxBox from '../dashboard/component/billsSignFaxBox/BillsSignFaxBox';
// styles
import useStyles from "../dashboard/styles";

// components

import { Typography } from "../../components/Wrappers";

export default function Billing(props) {
  var classes = useStyles();



  return (
    <div className={classes.billingMain}>
      <BillingDashboard />      
    </div>
  );
}

