import React, { useState, useEffect } from "react";

import { Button, Typography, Select, MenuItem } from "@material-ui/core";
import {
    ErrorOutline as ErrorOutlineIcon
} from "@material-ui/icons";

import { Table, Empty } from 'antd';
import { Link } from "react-router-dom";

//custom
import { withSnackbar } from '../../../../components/Message/Alert';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { data as gridCnfg } from '../../../../components/AppointmentGrid/Data/AppointmentData';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

//option images
import CanceledIcon from "../../../../images/icons/canceled.png";
import InRoomIcon from "../../../../images/icons/in-room.png";
// import TentativeIcon from "../../../../images/icons/tentative.png";
// import SeenIcon from "../../../../images/icons/seen.png";
// import InLobbyIcon from "../../../../images/icons/in-lobby.png";
import NoShowIcon from "../../../../images/icons/no-show.png";
// import PendingArrivalIcon from "../../../../images/icons/pending-arrival.png";
import ArrivedIcon from "../../../../images/icons/arrived.png";
import CheckedInIcon from "../../../../images/icons/checked-in.png";
import CheckedInOnlineIcon from "../../../../images/icons/checked-in-online.png";
import ConfirmedIcon from "../../../../images/icons/confirmed.png";
import CompletedIcon from "../../../../images/icons/completed.png";
import InSessionIcon from "../../../../images/icons/in-session.png";
import NotConfirmedIcon from "../../../../images/icons/not-confirmed.png";
import OrphanIcon from "../../../../images/icons/orphan.png";
import ReScheduledIcon from "../../../../images/icons/re-scheduled.png";

import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { formatDate, formatTime, getAgeByDOB } from '../../../../components/Common/Extensions';

//styles
import useStyles from "./styles";
// import 'antd/dist/antd.css';
import "../../../../components/antd.css";
import "../../../../components/SearchGrid/antStyle.css";
import "../../../../components/SearchGrid/style.css";
function Appointments(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isEditable] = useState(props.isEditable)

    const appointmentStatusOptions = [
        {
            image: <img src={ArrivedIcon} alt="arrived" />,
            value: "Arrived",
            label: "Arrived",
        },
        {
            image: <img src={CanceledIcon} alt="arrived" />,
            value: "Canceled",
            label: "Canceled",
        },
        {
            image: <img src={CheckedInIcon} alt="arrived" />,
            value: "Checked-in",
            label: "Checked-in",
        },
        {
            image: <img src={CheckedInOnlineIcon} alt="arrived" />,
            value: "Checked-in Online",
            label: "Checked-in Online",
        },
        {
            image: <img src={ConfirmedIcon} alt="arrived" />,
            value: "Confirmed",
            label: "Confirmed",
        },
        {
            image: <img src={CompletedIcon} alt="arrived" />,
            value: "Completed",
            label: "Completed",
        },
        {
            image: <img src={InRoomIcon} alt="arrived" />,
            value: "In-Room",
            label: "In-Room",
        },
        {
            image: <img src={InSessionIcon} alt="arrived" />,
            value: "In-Session",
            label: "In-Session",
        },
        {
            image: <img src={NotConfirmedIcon} alt="arrived" />,
            value: "Not-Confirmed",
            label: "Not-Confirmed",
        },
        {
            image: <img src={NoShowIcon} alt="arrived" />,
            value: "No-Show",
            label: "No-Show",
        },
        {
            image: <img src={OrphanIcon} alt="arrived" />,
            value: 'Orphan',
            label: 'Orphan'
        },
        {
            image: <img src={ReScheduledIcon} alt="arrived" />,
            value: "Re-Scheduled",
            label: "Re-Scheduled",
        }
    ];
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        // "from_date": null,
        // "to_date": null,
        // "from_time": "08:00",
        // "to_time": "18:00",
        "patientid": props.dataId.toString()
    });
    const handleChange = e => {

        const { name, value } = e.target;
        let data = {
            PatientAppointmentID: name ? parseInt(name) : 0,
            statusCode: value
        };

        PostDataAPI("appointment/updatePatientAppointmentStatus", data, true).then((result) => {

            if (result.success) {

                setIsLoading(false);

                loadGridData(values);

            }
            else {
                console.log(result.message)
                setIsLoading(false);
            }
        })


    };
    const CustomImageSelect = ({ id, name, Value, options, onChange, placeholder, isDisableClearable, ...props }) => {
        return <Select
            id={id}
            disableUnderline
            className={classes.custmBaseInput
            }
            onChange={onChange}
            name={name}
            value={Value}
            {...props}
        >
            {
                placeholder ? (<option value="" > {placeholder}</option>) : ('')
            }
            {
                appointmentStatusOptions.map((option) => (
                    <MenuItem value={option.value}>
                        <span style={{ marginRight: "10px" }}>{option.image}</span>
                        <span style={{ float: "left" }}>
                            {option.label}</span >
                    </MenuItem>
                ))
            }

        </Select >
    }

    const loadGridData = (filtervalues) => {
        filtervalues.loggedinUserId = userInfo.userID;
        setIsLoading(true);
        PostDataAPI("appointment/loadPatientAppointmentGrid", filtervalues).then((result) => {
            setIsLoading(false);

            if (result.success) {
                //setRowsData(result.data);
                setRowsData(
                    result.data.map((item, i) => {
                        // item.key = item[gridCnfg[props.code][0].dataIndex];

                        //item.statusCode = <CustomImageSelect id="select" name={item.patientAppointmentID} placeholder="Select Status" value={item.statusCode} onChange={handleChange} options={appointmentStatusOptions} />
                        item.patientAppointmentDateTime = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                            <span>{formatDate(item.patientAppointmentDateTime.split('T')[0])}</span>
                            <Typography className={classes.appointmentTime}>{formatTime(item.patientAppointmentDateTime)}</Typography>
                        </span>
                        //item.patientAppointmentDateTime = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                        //    <span>{new Date(item.patientAppointmentDateTime).toLocaleDateString()}</span>
                        //    <Typography className={classes.appointmentTime}>{new Date(item.patientAppointmentDateTime).toLocaleTimeString()}</Typography>
                        //</span>

                        item.confirmation = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                            <span><ErrorOutlineIcon style={{ color: "#F2994A", width: "16px", height: "16px", margin: "0px 0px -5px" }} /> Not Confirmed</span>
                            
                            {props.editConfirmation ?
                                <Link style={{ fontSize: "12px", paddingLeft: "15px", color: "#00B4E5" }}>Edit Confirmation</Link>
                                : ''}

                        </span>

                        item.balance = "$ 0"

                        item.deductables = "$ 0"
                        item.action = item.action =
                            props.isEditable ? <Button variant="outlined" className={classes.startEncounterBtn}>
                                <Link to={{
                                    pathname: '/app/encounter',
                                    search: '?id=' + item.userLocationID + '/' + item.patientID + '/' + item.patientAppointmentID,
                                    //search: '?id=' + dataId ,
                                    state: JSON.stringify({
                                        patientId: item.patientID,
                                        appoitmentId: item.patientAppointmentID,
                                        userLocationID: item.userLocationID
                                    })

                                }}>{item.encounterID > 0 ? "View Encounter" : "Start Encounter"}

                                </Link>
                            </Button> :
                                item.encounterID > 0 ?
                                <Button variant="outlined" className={classes.startEncounterBtn}>
                                    <Link to={{
                                        pathname: '/app/encounter',
                                        search: '?id=' + item.userLocationID + '/' + item.patientID + '/' + item.patientAppointmentID,
                                        //search: '?id=' + dataId ,
                                        state: JSON.stringify({
                                            patientId: item.patientID,
                                            appoitmentId: item.patientAppointmentID,
                                            userLocationID: item.userLocationID
                                        })

                                    }}> {"View Encounter"}

                                    </Link>
                                </Button > :
                                <Button variant="outlined" disabled={true} className={classes.startEncounterBtnDisable} >{"Start Encounter"}</Button>
                        //item.action = <Button variant="outlined" className={classes.startEncounterBtn}>
                        //    <Link to={{
                        //        pathname: '/app/encounter',
                        //        search: '?id=' + item.userLocationID + '/' + item.patientID + '/' + item.patientAppointmentID,
                        //        //search: '?id=' + dataId ,
                        //        state: JSON.stringify({
                        //            patientId: item.patientID,
                        //            appoitmentId: item.patientAppointmentID,
                        //            userLocationID: item.userLocationID
                        //        })
                        //
                        //    }}>{item.encounterID > 0 ? "View Encounter" : "Start Encounter"}
                        //
                        //    </Link>
                        //</Button >

                        return { ...item }
                        // return { ...item, clickEvent: e => handleClick(e, item.patientAppointmentID, item.patientName) }
                    }));
            }

        })
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient appointments list"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        debugger;
        console.log(props.isEditable);
        console.log("patient screen appointment list");
        saveAuditLogInfo()
        if (true) {
            loadGridData(values);
        }
    }, []);
    const handleClick = (e, dataId, patientName) => {

        // if (window.event.target.nodeName == "TD" && props.rowClick)
        //     props.rowClick(dataId, patientName);
        // setAppPatientName(patientName);

    };
    return (
        <div className={props.dp == 'true' ? 'dp-table' : ''}>
            <div className="custom-grid">
                <Table
                    // loading={true}

                    locale={{
                        emptyText: (
                            <Empty
                                image={isLoading ? LoadingIcon : "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"}
                                description={isLoading ? "Loading..." : "No Record Found"}
                                imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}

                            />
                        )
                    }}
                    checkStrictly={true}
                    rowClassName={(record, index) => "claimRow"}
                    scroll={true}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                    dataSource={rowsData}
                    columns={gridCnfg["PatientAppointmentIndividual"]}
                // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                />
            </div>
        </div>
    )
}

export default withSnackbar(Appointments)
