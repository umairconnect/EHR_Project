import React, { useState, useEffect } from "react";

import { Button, Typography, Select, MenuItem, Tooltip, Icon, ListItemAvatar } from "@material-ui/core";

import {
    ErrorOutline as ErrorOutlineIcon
} from "@material-ui/icons";

import { RedoOutlined } from '@ant-design/icons';

import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from "react-router-dom";

import { MDBDataTable } from 'mdbreact';
import { data as gridCnfg } from './Data/AppointmentData';
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import { SelectField } from '../../components/InputField'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { PostDataAPI } from '../../Services/PostDataAPI';
import { GetUserInfo } from '../../Services/GetUserInfo';

import eligibilityImage from "../../images/icons/eligibility.png";
import unLockedEncounter from "../../images/icons/unlocked-encounter.png";
import coPayImage from "../../images/icons/coPayGrey.png";
import coPayGreen from "../../images/icons/check-green.png";
import SearchGridForm from "../SearchPanel/SearchGridForm";

//option images
import CanceledIcon from "../../images/icons/canceled.png";
import InRoomIcon from "../../images/icons/in-room.png";
// import TentativeIcon from "../../images/icons/tentative.png";
// import SeenIcon from "../../images/icons/seen.png";
// import InLobbyIcon from "../../images/icons/in-lobby.png";
import NoShowIcon from "../../images/icons/no-show.png";
// import PendingArrivalIcon from "../../images/icons/pending-arrival.png";
import ArrivedIcon from "../../images/icons/arrived.png";
import CheckedInIcon from "../../images/icons/checked-in.png";
import CheckedInOnlineIcon from "../../images/icons/checked-in-online.png";
import ConfirmedIcon from "../../images/icons/confirmed.png";
import CompletedIcon from "../../images/icons/completed.png";
import InSessionIcon from "../../images/icons/in-session.png";
import NotConfirmedIcon from "../../images/icons/not-confirmed.png";
import OrphanIcon from "../../images/icons/orphan.png";
import ReScheduledIcon from "../../images/icons/re-scheduled.png";

import LoadingIcon from "../../images/icons/loaderIcon.gif";


import { formatDate, formatTime, getAgeByDOB, printReport } from '../../components/Common/Extensions';


import { Table, Empty } from 'antd';

import useStyles from "./styles";
import './style.css';
// import 'antd/dist/antd.css';
import "../antd.css";
import "../SearchGrid/antStyle.css";
import "../SearchGrid/style.css";

export default function Grid({ onChange, selectedView, ...props }) {
    // const {searchPanalParams}=props;
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
        //{
        //    image: <img src={ConfirmedIcon} alt="arrived" />,
        //    value: "Confirmed",
        //    label: "Confirmed",
        //},
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
        //{
        //    image: <img src={NotConfirmedIcon} alt="arrived" />,
        //    value: "Not-Confirmed",
        //    label: "Not-Confirmed",
        //},
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
    ]

    const [rowsData, setRowsData] = useState([]);
    const [isEditable] = useState(props.isEditable);
    const [isLoading, setIsLoading] = useState(false);
    const [searchdataoptions, setSearchDataOptions] = useState(["", ""]);
    const [data, setData] = useState([]);
    const [appPatientName, setAppPatientName] = useState();
    //Seach Panel
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'searchPopver' : undefined;
    const [formdata, setFormData] = useState([]);
    const [chipdata, setChipData] = useState([]);
    // const [defaultvalues,setDefaultValues]=useState({today:"",lastday:""});
    //
    var classes = useStyles();
    const [arrChecked] = useState([]);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);



    const StatusListOptions = [
        {
            value: "Arrived",
            label: "Arrived",
        },

        {
            value: "Canceled",
            label: "Canceled",
        },

        {
            value: "Checked-in",
            label: "Checked-in",
        },
        {
            value: "Checked-in Online",
            label: "Checked-in Online",
        },

        {
            value: "Confirmed",
            label: "Confirmed",
        },

        {
            value: "Completed",
            label: "Completed",
        },
        {
            value: "In-Room",
            label: "In-Room",
        },

        {
            value: "In-Session",
            label: "In-Session",
        },
        {
            value: "Not-Confirmed",
            label: "Not-Confirmed",
        },

        {
            value: "No-Show",
            label: "No-Show",
        },
        {
            value: 'Orphan',
            label: 'Orphan'
        },
        {
            value: "Re-Scheduled",
            label: "Re-Scheduled",
        }
    ];
    const getMonthDate = (value) => {

        let date = new Date();
        let y = date.getFullYear(); let m = date.getMonth()
        if (value) {
            let today = date.getDate();
            let newdate = "";
            if (m < 9) {
                if (today < 9) {
                    newdate = y + `-0${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-0${m + 1}` + `-${date.getDate()}`
                }
            } else {
                if (today < 9) {
                    newdate = y + `-${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-${m + 1}` + `-${date.getDate()}`
                }
            }
            return newdate;
        }
        else {
            let date = new Date(y, m + 1, 0);
            let newdate = "";
            if (m < 9) {
                newdate = y + `-0${m + 1}` + `-${date.getDate()}`
            } else {
                newdate = y + `-${m + 1}` + `-${date.getDate()}`
            }
            return newdate;
        }
        return date;
    }
    const getEndMonthDate = () => {
        var date = new Date();
        date = new Date(date.setDate(date.getDate() + 30))
        return date.toISOString().split('T')[0];
    }

    const getCurrentDate = () => {
        var date = new Date();
        //date = new Date(date.setDate(date.getDate() + 30))
        return date.toISOString().split('T')[0];
    }

    const [values, setValues] = useState({
        "from_date": getCurrentDate(),
        "to_date": getEndMonthDate(),
        "from_time": "08:00",
        "to_time": "18:00",
        "patientName": ""
    });

    const openReportPrintView = () => {

        var reportUrl = "%2freports%2fclinical%2fclinical_appointments_list&rs:Command=Render&rc:Parameters=false";
        var _loggedinUserId = values.userId ? "&user_id=" + values.userId : "&user_id";
        var _from_date = values.from_date ? "&date_from=" + values.from_date : "&date_from:isnull=true";
        var _from_time = values.from_time ? "&time_from=" + values.from_time : "&time_from:isnull=true";
        var _to_date = values.to_date ? "&date_to=" + values.to_date : "&date_to:isnull=true";
        var _to_time = values.to_time ? "&time_to=" + values.to_time : "&time_to:isnull=true";
        var _patientName = values.patientName ? "&patient_name=" + values.patientName : "&patient_name:isnull=true";
        var _patientId = "&patient_id=0";
        var _cellnumber = values.cellnumber ? "&cell_number=" + values.cellnumber : "&cell_number:isnull=true";
        var _status = values.status ? "&status=" + values.status : "&status:isnull=true";
        var _parameters = _loggedinUserId + _from_date + _from_time + _to_date + _to_time + _patientName + _patientId + _cellnumber + _status;

        printReport(reportUrl, _parameters);
    };

    useEffect(() => {
        setSearchDataOptions(SearchPanelData[props.searchPanelParams]);
        if (true) {

            loadGridData(values);
        }
        if (props.isUpdate, props.IsPrintClicked) {
            openReportPrintView();
        }

    }, [props.IsUpdate, props.IsPrintClicked]);

    const CustomImageSelect = ({ id, name, value, options, onChange, placeholder, ...props }) => {
        console.log(value)
        return <Select
            id={id}
            disableUnderline
            onChange={onChange}
            displayEmpty
            name={name}
            value={value}
            className={classes.custmBaseInput}
            {...props}
        >
            <option value=""> Select Status</option>
            {/* {
                placeholder && <option value=""> Select Status</option>
            } */}
            {
                appointmentStatusOptions.map((option, i) => (
                    <MenuItem value={option.value}>
                        <span style={{ marginRight: "10px" }}>
                            {option.image}
                        </span>
                        <span style={{ float: "left" }}>{option.label}</span >
                    </MenuItem>
                ))
            }

        </Select >
    }

    const handleOpenDemographics = (patId) => {
        // if (patId > 0) {
        props.openDemographics(patId);
        // }
    }
    const handleOpenEligibility = (patId) => {
        props.openEligibility(patId);
    }

    const handleOpenConfirmation = (patientAppointmentID) => {
        props.openConfirmation(patientAppointmentID)
    }
    const handleOpenPayment = (patId, apptId, apptDate, patientName, batchId) => {
        props.openPayment(patId, apptId, apptDate, patientName, batchId)
    }
    const loadGridData = (filtervalues) => {
        setValues(prevState => ({
            ...prevState,
            "from_date": filtervalues.from_date,
            "to_date": filtervalues.to_date,
            "from_time": filtervalues.from_time,
            "to_time": filtervalues.to_time,
            "patientName": filtervalues.patientName,
            "cellnumber": filtervalues.cellnumber,
            "loggedinUserId": filtervalues.loggedinUserId,
            "userId": userInfo.loggedInUserID,
            "status": filtervalues.status,
        }));
        values.from_date = filtervalues.from_date;
        values.to_date = filtervalues.to_date;
        values.from_time = filtervalues.from_time;
        values.to_time = filtervalues.to_time;
        values.patientName = filtervalues.patientName;
        values.cellnumber = filtervalues.cellnumber;
        values.loggedinUserId = filtervalues.loggedinUserId;
        values.userId = filtervalues.userId;
        values.status = filtervalues.status;

        filtervalues.loggedinUserId = userInfo.userID;
        setIsLoading(true);
        PostDataAPI(props.apiUrl, filtervalues).then((result) => {
            setIsLoading(false);

            if (result.success) {
                console.log(result.data)
                setRowsData(
                    result.data.map((item, i) => {
                        // item.key = item[gridCnfg[props.code][0].dataIndex];

                        if (item.statusCode == null) { item.statusCode = '' }

                        let confirmationStatus = 'Confirmed';
                        let confirmIconStatus = <img src={ConfirmedIcon} style={{ width: "15px", position: "relative", left: "-3px" }} />;
                        if (!item.isConfirmed) {
                            confirmationStatus = 'Not Confirmed';
                            confirmIconStatus = <img src={NotConfirmedIcon} style={{ width: "15px", position: "relative", left: "-3px" }} />;
                        }
                        item.statusCode = <CustomImageSelect
                            id="select"
                            name={item.patientAppointmentID}
                            placeholder="Select Status"
                            value={item.statusCode}
                            onChange={handleChange}
                            disabled={!isEditable}
                            options={appointmentStatusOptions}
                        />
                        item.isEncounterSign =
                            item.encounterID > 0 ?
                                <span className={classes.singIcon}>
                                    {
                                        item.isEncounterSign ?
                                            <Tooltip title="Signed Encounter"><LockIcon /></Tooltip> :
                                            <Tooltip title="Unsigned Encounter"><Icon className={classes.unSignedEncounterIcon}><img src={unLockedEncounter} /></Icon></Tooltip>
                                    }
                                </span> :
                                <span className={classes.singIcon} onClick={() => handleOpenEligibility(item.patientID)}>
                                    <Tooltip title="Check Eligibility"><RedoOutlined /></Tooltip>
                                </span>



                        item.eligibility =
                            item.eligibility == "1" ?
                                <Tooltip title="Eligible for insurance">
                                    <span className={classes.activeLine} />
                                </Tooltip> :
                                <Tooltip title="Not eligible for insurance">
                                    <span className={classes.deletedLine} />
                                </Tooltip>

                        // <Tooltip title="Eligibility">
                        //     <span className={item.eligibility != "" ? classes.activeLine : classes.deletedLine} />
                        // </Tooltip>
                        item.appointmentDate = item.patientAppointmentDateTime
                        item.apptPatientName = item.patientName
                        item.patientAppointmentDateTime = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                            <span>{formatDate(item.patientAppointmentDateTime.split('T')[0])}</span>
                            <Typography className={classes.appointmentTime}>{formatTime(item.patientAppointmentDateTime)}</Typography>
                        </span>

                        item.copay = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                            {item.batchId > 0 ?
                                <Link to="#" style={{ display: "flex", flexDirection: "column" }} onClick={() => { handleOpenPayment(item.patientID, item.patientAppointmentID, item.appointmentDate, item.apptPatientName, item.batchId) }}>
                                    <span><img src={item.paidAmount > 0 ? coPayGreen : coPayImage} />{item.paidAmount > 0 ? ' $' + item.paidAmount : ''} Paid</span>
                                </Link> :
                                <span><img src={item.paidAmount > 0 ? coPayGreen : coPayImage} />{item.paidAmount > 0 ? ' $' + item.paidAmount : ''} Paid</span>
                            }
                            {/*<span><img src={item.paidAmount > 0 ? coPayGreen : coPayImage} />{item.paidAmount > 0 ? ' $ ' + item.paidAmount : ''} Paid</span>*/}
                            <Link to="#" style={{ display: "flex", flexDirection: "column" }} onClick={() => { handleOpenPayment(item.patientID, item.patientAppointmentID, item.appointmentDate, item.apptPatientName, item.batchId) }}>{item.paidAmount > 0 ? '' : (item.isCopayFixed ? '$' + item.copay + ' due' : item.copay + ' % due')} </Link>
                        </span>
                        // item.copay = <span>$ 0 <img src={coPayImage} /></span>
                        selectedView == "standardView" && (
                            item.confirmation = <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                                <span>{confirmIconStatus} {confirmationStatus}</span>
                                <Link to="#" style={{ fontSize: "12px", paddingLeft: "15px", color: "#00B4E5" }} onClick={() => handleOpenConfirmation(item.patientAppointmentID)}>Edit Confirmation</Link>
                            </span>)

                        // item.balance = "$ 0"

                        // item.deductables = "$ 0"
                        item.fullName = item.patientName
                        item.patientName = <span style={{ display: "block", lineHeight: "18px" }}>
                            <Link to="#" ><Typography onClick={() => handleOpenDemographics(item.patientID)} className={classes.linkName}>
                                {item.patientName}</Typography>
                            </Link>
                            <Typography className={classes.nameInfoLabel}>{item ? item.birthDate ? getAgeByDOB(item.birthDate) !== '' ? + " | " : "" : "" : null} {formatDate(item.birthDate.split('T')[0])}</Typography>
                            {/* <Typography className={classes.nameInfoLabel}>{item.genderCode ? item.genderCode + " | " : null} {item ? item.birthDate ? getAgeByDOB(item.birthDate) + " | " : "" : null} {item ? item.birthDateFormat : null}</Typography> */}
                        </span>

                        item.action =
                            isEditable ? <Button variant="outlined" className={classes.startEncounterBtn} >
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
                                    <Button variant="outlined" className={classes.startEncounterBtn} >
                                        <Link to={{
                                            pathname: '/app/encounter',
                                            search: '?id=' + item.userLocationID + '/' + item.patientID + '/' + item.patientAppointmentID,
                                            //search: '?id=' + dataId ,
                                            state: JSON.stringify({
                                                patientId: item.patientID,
                                                appoitmentId: item.patientAppointmentID,
                                                userLocationID: item.userLocationID
                                            })

                                        }}>View Encounter
                                        </Link>
                                    </Button> :
                                <Button variant="outlined" disabled={true} className={classes.startEncounterBtnDisable} >Start Encounter</Button>
                        return { ...item }
                        // return { ...item, clickEvent: e => handleClick(e, item.patientAppointmentID, item.patientName) }
                    }));
            }
            else {
                console.log(result.message);
            }
        })
    }

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

    const handleClick = (dataId, patientName, patientID) => {

        if (window.event.target.nodeName == "TD" && props.rowClick)
            props.rowClick(dataId, patientName, patientID);
        setAppPatientName(patientName);

    };

    const tableData = {

        columns: gridCnfg[props.code],
        rows: rowsData,

    };
    const onSearchSubmit = (searchvalues) => {
        loadGridData(searchvalues);
    };

    return (
        <>
            {/* {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </ >
            ) : ( */}
            <>
                {/* <SearchPanel setSearchValue={setSearchValue} placeholderTitle="Patient" options={searchdata} /> */}
                {
                    props.searchPanelParams ?
                        <>
                            <SearchGridForm defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit} />
                            <div className={props.dp == 'true' ? 'dp-table' : ''}>
                                <div className="custom-grid">
                                    <Table
                                        // loading={true}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: (e) => handleClick(record.patientAppointmentID, record.fullName, record.patientID)
                                            };
                                        }}
                                        locale={{
                                            emptyText: (
                                                <Empty
                                                    image={isLoading && LoadingIcon}
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
                                        columns={gridCnfg[props.code]}
                                    // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                                    />
                                </div>
                            </div>
                            {/* <div className={"pTable"}>
                                    <MDBDataTable
                                        striped
                                        small
                                        btn
                                        searching={false}
                                        data={tableData}
                                    />
                                </div> */}
                        </>
                        :
                        <></>
                    // <div className={"pTable"}><MDBDataTable
                    //     striped
                    //     small
                    //     btn
                    //     searching={props.searchShowHide}
                    //     data={tableData}
                    // /></div>
                }
            </>

            {/*  )
            } */}
            {/* paging={false}  info={false} responsive btn fixed striped bordered scrollY entries={5} maxHeight="50vh" hover*/}

        </>
    );
}