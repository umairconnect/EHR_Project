import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { BoxContainer, FooterButton, IconAvatarsSmall } from '../boxContainer/BoxContainer';
import CalendarIcon from '../../../../images/icons/dashboardCalendarIcon.png';
import NoDataShow from '../../../../images/icons/no_data_show.svg';
import { List, Avatar, Badge, Space, Select } from 'antd';
import PatientIcon from '../../../../images/icons/dashboardPatientIcon.png';
import profileWireframes from '../../../../images/icons/profile_wireframes.png';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { formatDate, formatTime, getAgeByDOB } from '../../../../components/Common/Extensions';


// styles
import useStyles from "./styles";
// import 'antd/dist/antd.css';
import "antd/lib/list/style/index.css";
import "antd/lib/avatar/style/index.css";
import "antd/lib/badge/style/index.css";
import "antd/lib/space/style/index.css";
import "antd/lib/dropdown/style/index.css";
import "antd/lib/select/style/index.css";

function TodayAppointments({ showMessage, ...props }) {

  var classes = useStyles();
  const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
  const dateChange = (label, item) => { }
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [data, setData] = useState([
    //{
    //    title: 'Ashton Cox - General Checkup',
    //    dis: 'General Checkup',
    //    telehealth: 'Telehealth',
    //    status: 'Confirmed',
    //    profileimg: PatientIcon,
    //    time: "11:30 AM",
    //    minuts: "30 Mins",
    //}
  ])

  const reloadData = () => {
    var _totalAppointments = 0;
    props.data.map(() => {
      _totalAppointments++;
    })
    setTotalAppointments(_totalAppointments)
    setData(props.data);

    console.log(props.data)
  }

  useEffect(() => {
    reloadData();
  }, [props.isUpdate]);

  return (
    <>
      {/* Today’s Appointments component  */}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <BoxContainer>
          <IconAvatarsSmall title={"Today’s Appointments"} value={totalAppointments} width={"50%"} valuewidth={"35%"} textColor={"#6161ea"} bgColor={"#dde4ff"} imgUrl={CalendarIcon} />
          <div className={classes.daySearchBox}>
            {/* <Select size="large" placeholder="Select Day" defaultValue="today"
              onChange={dateChange}
            // filterOption={(input, option) => showSearch
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            >
              {
                days.map((option, i) => (
                  <option value={option.value} key={i}>{option.title}</option>
                ))
              }
            </Select> */}
          </div>
          {data.length > 0 ?
            <List
              itemLayout="horizontal"
              dataSource={data.slice(0, 5)}
              className={`${classes.todayAppointmentList} ${classes.fontStyle}`}
              renderItem={item => (
                <List.Item
                  actions={[<>{item.appointmentTime}</>, <>{item.duration} Mins</>]}>
                  <List.Item.Meta
                    avatar={<Avatar size={46} src={item.photoPath ? "." + item.photoPath : "./static/media/profile-pic.7e2ec63d.jpg"} />}
                    title={item.patientName}
                    description={<>{item.reasonOfVisit} <Space className={classes.telehealthBadge}><Badge style={{ backgroundColor: '#dde4ff', fontSize: 10, color: "#5F5BFF" }} count={item.examRoom} /></Space></>}
                  />
                  <div className={`${classes.todayAppointmentStatus} ${classes.fontStyle}`}>
                    {item.statusCode === "Completed" ?
                      <span className={classes.confirmedStatus}>{item.statusCode}</span>
                      : <span className={classes.inLobbyStatus}>{item.statusCode}</span>}
                  </div>
                </List.Item>
              )}
            />
            : <> <div className={classes.alignmentImg}>
              <h3>No appointment scheduled for today</h3>
              <img src={NoDataShow} />
              <a className={classes.createAppointment}>Create New Appointment</a>
            </div> </>
          }
          <FooterButton title={"Calender"} linkUrl={'/app/schedule'} />
        </BoxContainer>
      </Grid>
    </>
  );
}
export default TodayAppointments


