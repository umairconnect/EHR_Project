import React, { useState, useEffect } from "react";
import { Grid, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { BoxContainer, IconAvatars, FooterButton } from '../boxContainer/BoxContainer';
import RefillIcon from '../../../../images/icons/dashboardRefillIcon.png';
import { Progress } from 'antd';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import { Link, useHistory } from "react-router-dom";

// styles
import useStyles from "./styles";
import "antd/lib/progress/style/index.css"

export default function DateRefillBox(props) {
  var classes = useStyles();
  const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
  const [state, setState] = useState({ refillRequestCount: "0" });
  const [appointmentWeeklyRecord, setAppointmentWeeklyRecord] = useState({ percentValue: 0, total: "0", physicalTotal: "0", teleHealthTotal: "0" });
  const [appointmentMonthlyRecord, setAppointmentMonthlyRecord] = useState({ percentValue: 0, total: "0", physicalTotal: "0", teleHealthTotal: "0" });
  const [appointmentQuarterlyRecord, setAppointmentQuarterlyRecord] = useState({ percentValue: 0, total: "0", physicalTotal: "0", teleHealthTotal: "0" });
    const [moduleAccess, setModuleAccess] = useState({ isRefillRequest: false })

  const [dateSwitch, setDateSwitch] = useState('Monthly');

  const history = useHistory();

  const handleDateSwitch = (event, newDateSwitch) => {
    if (newDateSwitch !== null) {
      setDateSwitch(newDateSwitch);
    }
  };

    function loadLabResultSetting() {
        setModuleAccess(prevState => ({
            ...prevState,
            ['isRefillRequest']: props.isRefillRequest
        }));
    }
  
  const goToRefillRequests = () => {

    history.push({
      pathname: '/app/tasks',
      state: {
        refilRequest: true,
      }
    });


    }
    const reloadData = () =>
    {
        setState(prevState => ({...prevState,refillRequestCount: props.data.refillRequestCount ? props.data.refillRequestCount : "0"}))
        if (props.data2) {
            props.data2.map((item) => {
              if (item.text1 == 'weekly') {
                setAppointmentWeeklyRecord(prevState => ({
                  ...prevState,
                    percentValue: parseInt(item.text4) / 100 * parseInt(item.text2),
                  total: item.text2,
                  physicalTotal: item.text3,
                  teleHealthTotal: item.text4
                }))
              } else if (item.text1 == 'monthly') {
                setAppointmentMonthlyRecord(prevState => ({
                  ...prevState,
                    percentValue: parseInt(item.text4) / 100 * parseInt(item.text2),
                  total: item.text2,
                  physicalTotal: item.text3,
                  teleHealthTotal: item.text4
                }))
              } else if (item.text1 == 'quarterly') {
                setAppointmentQuarterlyRecord(prevState => ({
                  ...prevState,
                    percentValue: parseInt(item.text4) / 100 * parseInt(item.text2),
                  total: parseInt(item.text2),
                  physicalTotal: item.text3,
                  teleHealthTotal: item.text4
                }))
              }
            })
        }
  }

  useEffect(() => {
      reloadData();
      loadLabResultSetting();
  }, [props.isUpdate]);

  return (
    <>
      {/* Weekly, Monthly, Quarterly  components  */}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
            <BoxContainer>
              <ToggleButtonGroup
                value={dateSwitch}
                exclusive
                onChange={handleDateSwitch}
                aria-label="Switch Date"
                className={`${classes.fontStyle} ${classes.dateSwitch}`}>
                <ToggleButton value="Weekly" aria-label="Weekly">
                  Weekly
                </ToggleButton>
                <ToggleButton value="Monthly" aria-label="Monthly">
                  Monthly
                </ToggleButton>
                <ToggleButton value="Quarterly" aria-label="Quarterly">
                  Quarterly
                </ToggleButton></ToggleButtonGroup>
              {dateSwitch === "Weekly" ? <CircularProgress
                percentValue={appointmentWeeklyRecord.percentValue}
                totalNumber={appointmentWeeklyRecord.total}
                physicalNumber={appointmentWeeklyRecord.physicalTotal}
                telehealthNumber={appointmentWeeklyRecord.teleHealthTotal} /> : null}
              {dateSwitch === "Monthly" ?
                <CircularProgress
                  percentValue={appointmentMonthlyRecord.percentValue}
                  totalNumber={appointmentMonthlyRecord.total}
                  physicalNumber={appointmentMonthlyRecord.physicalTotal}
                  telehealthNumber={appointmentMonthlyRecord.teleHealthTotal} /> : null}
              {dateSwitch === "Quarterly" ?
                <CircularProgress
                  percentValue={appointmentQuarterlyRecord.percentValue}
                  totalNumber={appointmentQuarterlyRecord.total}
                  physicalNumber={appointmentQuarterlyRecord.physicalTotal}
                  telehealthNumber={appointmentQuarterlyRecord.teleHealthTotal} /> : null}
            </BoxContainer>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
            <BoxContainer>
              <IconAvatars marginTop={"35px"} marginBottom={"35px"} title={state.refillRequestCount > 0 ? "Refill Requests": "No Refill Request"} value={state.refillRequestCount} bgColor={"#ffebd3"} imgUrl={RefillIcon} />
                          {moduleAccess.isRefillRequest ? <a onClick={goToRefillRequests}>
                              <FooterButton title={"View All"} />
                          </a> : <FooterButton title={"View All"} disabledBtn={true} />}
             
      
            </BoxContainer>
          </Grid>

        </Grid>
      </Grid>


    </>
  );
}

{/* Circular Progress components */ }
function CircularProgress(props) {
  var classes = useStyles();
  return (
    <Grid container alignItems="center" direction="row" className={classes.progressBox}>
      <Progress type="circle" percent={props.percentValue} width={200} strokeWidth={9} trailColor={"#5BD1D8"} strokeColor="#6161EA" />
      <Grid className={`${classes.progressDetailsBox}`}>
        <Typography className={`${classes.smallTitle} ${classes.fontStyle}`}>
          Total
        </Typography>
        <Typography className={`${classes.totalNumber} ${classes.number} ${classes.fontStyle}`}>
          {props.totalNumber}
        </Typography>
        <Typography className={`${classes.smallTitle} ${classes.fontStyle}`}>
          Physical
        </Typography>
        <Typography className={`${classes.physicalNumber} ${classes.number} ${classes.fontStyle}`}>
          {props.physicalNumber}
        </Typography>
        <Typography className={`${classes.smallTitle} ${classes.fontStyle}`}>
          Telehealth
        </Typography>
        <Typography className={`${classes.telehealthNumber} ${classes.number} ${classes.fontStyle}`}>
          {props.telehealthNumber}
        </Typography>
      </Grid>
    </Grid>
  );
}

{/* Weekly, Monthly, Quarterly Button components */ }
// function DateToggleButtonGroup(props) {
//   var classes = useStyles();

//   const [switchValue, setSwitchValue] = useState(props.defaultSelect);

//   const handleSwitch = (newSwitchValue) => { //event,
//     if (newSwitchValue !== null) {
//       setSwitchValue(newSwitchValue);
//       // props.selectValue(newSwitchValue);
//     }
//   };
//   // props.selectValue(switchValue)
//   return (
//     <ToggleButtonGroup
//       value={switchValue}
//       exclusive
//       onChange={handleSwitch}
//       aria-label="Switch"
//       className={`${classes.fontStyle} ${classes.dateSwitch}`}
//     >
//       <ToggleButton value={props.firstButtonTitle} aria-label={props.firstButtonTitle}>
//         {props.firstButtonTitle}
//       </ToggleButton>
//       <ToggleButton value={props.secondButtonTitle} aria-label={props.secondButtonTitle}>
//         {props.secondButtonTitle}
//       </ToggleButton>
//       <ToggleButton value={props.thirdButtonTitle} aria-label={props.thirdButtonTitle}>
//         {props.thirdButtonTitle}
//       </ToggleButton>

//     </ToggleButtonGroup>
//   );
// }