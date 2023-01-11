import React, { useState, useEffect } from "react";
import {
    CircularProgress,
    InputBase,
    Button,
    Popover,
    FormControl,
    FormLabel,
    Chip,
    Checkbox,
    FormControlLabel,
    TextField,
    Grid as NewGrid,
    Typography,
    ButtonGroup,
    Paper,
    Popper,
    MenuList,
    MenuItem,
    ClickAwayListener
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { MDBInput, MDBDataTable } from 'mdbreact';
import { data as gridCnfg } from './Data/ClinicalData';
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import { InputBaseField, SelectField } from '../../components/InputField'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import { FormBtn } from '../../components/UiElements/UiElements'
import useStyles from "./styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css'
import { Table, Empty } from 'antd';
import './antStyle.css'
import LoadingIcon from "../../images/icons/loaderIcon.gif";
//
import SearchGridForm from "../SearchPanel/SearchGridForm"
// import './style.css';

import { PostDataAPI } from '../../Services/PostDataAPI';
import { APICall } from '../../Services/APICall';

export default function ReFillRequestGrid({ onChange, actionClick, refillCompletedView, ...props }) {
    // const {searchPanalParams}=props;

    const [rowsData, setRowsData] = useState([]);
    const [action, setAction] = useState("View");
    const [isLoading, setIsLoading] = useState("");
    const [searchdataoptions, setSearchDataOptions] = useState(["", ""]);
    const [values, setValues] = useState({});
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const [sendRxId, setSendRxId] = useState(0);
    const [codeStatus, setCodeStatus] = useState("");
    let taskStatus = "Review";
    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleRowAction = (e) => {

        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if (e.currentTarget.dataset.label === "Completed" || e.currentTarget.dataset.label === "Complete") {
            setIsCompleted(true);
            setCodeStatus("Completed-View");
        }
        else {
            setCodeStatus(e.currentTarget.dataset.label);
            setIsCompleted(false);
        }
        setTaskId(parseInt(e.currentTarget.dataset.link));
        setSendRxId(e.currentTarget.dataset.sendrxid);
    };
    const handleAction = (e) => {

        setAnchorEl(anchorEl ? null : e.currentTarget);
        actionClick(dropDownActionId, taskId, e.currentTarget.dataset.id === 'Completed' ? 'Completed-View' : e.currentTarget.dataset.id, sendRxId);
    }

    //
    var classes = useStyles();
    const [arrChecked] = useState([]);

    const handleCheckBox = (e) => {
        //    alert('clicked ' + e.target.checked);
        if (e.target.checked == true) {
            arrChecked.push(e.target.name)
        }
        else {
            const index = arrChecked.indexOf(e.target.name);
            if (index > -1) {
                arrChecked.splice(index, 1);
            }
        }

        if (onChange)
            onChange(e);
    };
    const handleChange = (e, id) => {

        const { name, value } = e.target;
        setAction(value);
        props.actionClick(id, value);

    }
    useEffect(() => {
        // if (true) {

        props.filterValues.filterByTask = props.filterByTask;
        loadGridData(props.filterValues);
        // };
    }, [props.filterValues, props.update]);

    const loadGridData = (filtervalues) => {
        setIsLoading(true);
        PostDataAPI(props.apiUrl, filtervalues).then((result) => {

            setIsLoading(false);
            if (result.data) {

                setRowsData(
                    result.data.map((item, i) => {

                        if (props.selection == "true")
                            item.check = <MDBInput type="checkbox" name={item[gridCnfg[props.code][0].field]} onChange={handleCheckBox} color="primary" />

                        if (props.dp == "true") {
                            item.dp = <img src={item['photoPath'] ? "." + item['photoPath'] : "./static/media/profile-pic.7e2ec63d.jpg"} alt="" className={classes.userDp} />
                        }

                        item.task = <span style={{ display: "block" }}>
                            <Link><Typography className={classes.linkName}>{item.taskTypeCode}</Typography></Link>
                            <Typography className={classes.nameInfoLabel}>{item.userName}</Typography>
                        </span>

                        //if (item.taskTypeCode == "Lab-Results") {

                        //    item.task = <span style={{ display: "block" }}>
                        //        <Link><Typography className={classes.linkName}>{item.taskTypeCode}</Typography></Link>
                        //        <Typography className={classes.nameInfoLabel}>{item.genderCode} | {getAgeByDOB(item.birthDate)} |  {item.birthDateFormat}</Typography>
                        //    </span>
                        //}
                        //else {
                        item.patientName = <span style={{ display: "block" }}>
                            <Link><Typography className={classes.linkName}>{item.patientName}</Typography></Link>
                            <Typography className={classes.nameInfoLabel}>{item.genderCode ? item.genderCode + " | " : null} {item?.birthDate != "" ? getAgeByDOB(item.birthDate) : ""} {item ? item.birthDateFormat : null}</Typography>
                            {/* <Typography className={classes.nameInfoLabel}>{`${item.genderCode ? item.genderCode : null} | ${item ? item.birthDate ? getAgeByDOB(item.birthDate) : "" : null} | ${item ? item.birthDateFormat : null}`}</Typography> */}
                        </span>

                        //}

                        if (item.taskStatusCode == "Completed")
                            taskStatus = "Completed";
                        else if (item.taskStatusCode == "Dany")
                            taskStatus = "Dany";
                        else if (item.taskStatusCode == "Open")
                            taskStatus = "Review";
                        console.log(taskStatus);
                        item.action = <ButtonGroup >
                            <FormBtn
                                id={"save"}
                                className={classes.actionViewBtn}
                                size="medium"
                                onClick={(medicationRefillRequestId, taskId, taskStatus, sendRxId) => actionClick(item.medicationRefillRequestId, item.taskId, item.taskStatusCode, item.sendRxId)}
                            >{taskStatus}
                            </FormBtn>
                            <Button
                                className={classes.menuBtn}
                                data-id={item.medicationRefillRequestId} //item.medicationRefillRequestId
                                data-link={item.taskId}
                                data-label={taskStatus}
                                data-SendRxId={item.sendRxId}
                                size="small"
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleRowAction}
                                endIcon={<ExpandMoreIcon />}>
                            </Button>
                        </ButtonGroup>

                        // return { ...item, clickEvent: e => handleClick(e, item[gridCnfg[props.code][0].field]) }
                        return ({ ...item })
                    }));
            }

        });
    }
    const handleClick = (e, dataId) => {
        if (props.rowClick)
            props.rowClick(dataId);

    };
    const tableData = {
        columns: gridCnfg[props.code],
        rows: rowsData,

    };
    const onSearchSubmit = (searchvalues) => {
        loadGridData(searchvalues);
    }

    function getAgeByDOB(birthDate) {

        var result = '';
        if (birthDate.trim() != '' && birthDate != undefined) {

            var mdate = birthDate;
            var yearThen = parseInt(mdate.substring(0, 4), 10);
            var monthThen = parseInt(mdate.substring(5, 7), 10);
            var dayThen = parseInt(mdate.substring(8, 10), 10);

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);
            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
            var month_age = Math.floor(day_age / 30);
            day_age = day_age % 30;


            if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
                result = '';
            else if (year_age > 0)
                result = year_age + ' years, ' + month_age + ' months, ' + day_age + ' days';
            else if (year_age === 0 && month_age > 0)
                result = month_age + ' months, ' + day_age + ' days';
            else if (year_age > 0 && month_age === 0)
                result = year_age + ' years, ' + day_age + ' days';
            else if (day_age === 0)
                result = '';
            else
                result = day_age + ' days';
        }
        return result;
    }


    return (
        <>
            {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </ >
            ) : (
                <>
                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                        {
                            props.searchPanelParams ?
                                <>
                                    {/* <SearchGridForm defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit}/> */}
                                    {/*<MDBDataTable
                                        striped
                                        small
                                        btn
                                        searching={false}
                                        data={tableData}
                                    /> */}
                                    <div className="custom-grid">
                                        <Table
                                            // loading={loading}
                                            // locale={locale}
                                            // size={Size}
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
                                        // pagination={{ position: [paginationPosition ? paginationPosition : 'topRight', 'bottomRight'], showSizeChanger: true }}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    {/* <MDBDataTable
                                        striped
                                        small
                                        btn
                                        searching={props.searchShowHide}
                                        data={tableData}
                                       />*/}
                                    <div className="custom-grid">
                                        <Table
                                            // loading={loading}
                                            // locale={locale}
                                            // size={Size}
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
                                        // pagination={{ position: [paginationPosition ? paginationPosition : 'topRight', 'bottomRight'], showSizeChanger: true }}
                                        />
                                    </div>
                                </>
                        }
                    </div>
                    <Popper style={{ zIndex: 900 }} id={id} open={open} anchorEl={anchorEl} role={undefined}>
                        <Paper>
                            <ClickAwayListener onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    {isCompleted == true ? <MenuItem data-id="Completed" onClick={handleAction}>View</MenuItem> : ""}
                                    {isCompleted == false ? codeStatus == 'Dany' ? <>
                                        <MenuItem data-id="Completed-View" onClick={handleAction}>View</MenuItem> </> :
                                        <> <MenuItem data-id="Assign To" onClick={handleAction}>Assign To</MenuItem>
                                        </>
                                        : null
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>
                </>

            )
            }
            {/* paging={false}  info={false} responsive btn fixed striped bordered scrollY entries={5} maxHeight="50vh" hover*/}

        </>
    );
}
