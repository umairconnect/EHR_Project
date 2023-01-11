import React, { useState, useEffect } from 'react';

//material-ui
import { Container, Grid, Button, Tab, Tabs, InputBase, Dialog, Divider, Link, Typography, CircularProgress, Tooltip, } from "@material-ui/core";
import {
    SearchOutlined as SearchIcon,
}
    from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PropTypes from 'prop-types';
import { Table, Empty, Row } from "antd";
//images
import ReplyMessage from '../../../images/icons/reply-icon.png';
import ForwardMessage from '../../../images/icons/forward-icon.png';
import ArchiveMessage from '../../../images/icons/import-icon.png';
import PrintMessage from '../../../images/icons/message-print.png';
import InEmail from '../../../images/icons/inEmail.png';
import OutEmail from '../../../images/icons/outEmail.png';
import CloseIcon from "../../../images/icons/math-plus.png";
//custom
import { SelectField } from '../../../components/InputField/InputField';
import PageTitle from '../../../components/PageTitle/PageTitle';
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { IsEditable } from '../../../Services/GetUserRolesRights';
import AddNewMessage from './components/addNewMessage/AddNewMessage';
//styles
import useStyles from './styles';
import '../../../components/SearchGrid/style.css';
import '../../../components/SearchGrid/antStyle.css';
import { FormGroupTitle, DraggableComponent, LinkS } from '../../../components/UiElements/UiElements';
import { GetUserInfo } from '../../../Services/GetUserInfo';
import Badge from '@material-ui/core/Badge';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Demographics from '../../patients/component/demographics/Demographics';
import { Scrollbars } from "rc-scrollbars";
import moment from 'moment';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../components/Message/Alert";
import ArchieveIcon from "../../../images/icons/archieveIcon.png";
import { formatDate, formatTime } from '../../../components/Common/Extensions';
import ReactToPrint from "react-to-print";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                // width: "330px",
                height: "450px",
                margin: "0px",
                backgroundColor: "#FFFFFF",
                borderRadius: "0px",
                overflow: "auto"
            }}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const Options = [

    {
        value: "currentMonth",
        label: "Current Month",
    },
    {
        value: "currentWeek",
        label: "Current Week",
    },
    {
        value: "currentYear",
        label: "Current Year",
    },
    {
        value: "showAll",
        label: "Show All",
    }
];
function Messages(props) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [isMessageEditable, setIsMessageEditable] = useState(IsEditable("Messages"));
    const { showMessage } = props;
    const [addNewMessageState, setAddNewMessageState] = useState(false);
    const messagePrint = React.useRef(null);
    const [state, setState] = useState({});
    const [messageState, setMessageState] = useState({ patientName: 'John Doe', message: 'Please Review and respond accordingly.' });
    const [tabvalue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(null);
    const [archiveLoading, setArchiveLoading] = useState(false);
    const [archiveAllLoading, setArchiveAllLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [patentIdOf, setPatentIdOf] = useState();
    const [showMessageBody, setShowMessageBody] = useState(false);
    const [indexNumber, setIndexNumber] = useState(0);
    const [emailMessage, setEmailMessage] = useState([]);
    const [emailType, setEmailType] = useState("")

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [startEndDate, setStartEndDate] = useState({
        start: moment().startOf('month').format('MM/DD/YYYY'),
        end: moment().endOf('month').format('MM/DD/YYYY')
    });
    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
    }
    const addArchieveSelected = () => {
        if (selectedRows.length > 0) {
            archiveAll(selectedRows)
        } else {
            showMessage("Error", "Please select at least one message.", "error", 3000);

        }
    }
    const onTabChange = (e, newValue) => {
        setRowsData([]);
        setTabValue(newValue);
        setShowMessageBody(false)
        loadData(newValue);
    };

    const loadData = (newValue) => {

        if (newValue == undefined)
            newValue = tabvalue;
        if (newValue == 0) {
            loadGridData('inbox');
        } else if (newValue == 1) {
            loadGridData('sent');
        } else if (newValue == 2) {
            loadGridData('archived');
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (e.target.name == "filter") {
            if (e.target.value === "currentWeek") {
                setStartEndDate({
                    start: moment().startOf('week').format('MM/DD/YYYY'),
                    end: moment().endOf('week').format('MM/DD/YYYY')
                })

            }
            if (e.target.value === "currentMonth") {
                setStartEndDate({
                    start: moment().startOf('month').format('MM/DD/YYYY'),
                    end: moment().endOf('month').format('MM/DD/YYYY')
                })

            }
            if (e.target.value === "currentYear") {
                setStartEndDate({
                    start: moment().subtract(1, "year").format('MM/DD/YYYY'),
                    end: moment().subtract(0, 'month').format('MM/DD/YYYY')
                })


            }
            if (e.target.value === "showAll") {
                setStartEndDate({
                    start: '',
                    end: ''
                })
            }
        }

    }

    useEffect(() => {
        loadData();
        getUnreadMessageCount();
    }, [state.value, state.filter]);
    const addNew = () => {
        setEmailType("")
        setEmailMessage([]);
        setAddNewMessageState(true);
    }
    const addReply = () => {
        setEmailType("RE")
        setAddNewMessageState(true)
    }
    const resetFilterBtn = () => {
        setStartEndDate({
            start: moment().subtract(1, 'month').format('MM/DD/YYYY'),
            end: moment().subtract(0, 'month').format('MM/DD/YYYY')
        })
        setState({
            value: "",
            filter: "currentMonth"
        });
        loadData();
    }
    const addFw = () => {
        setEmailType("FW")
        setAddNewMessageState(true)
    }

    const loadGridData = (typeValue) => {
        //console.log(startEndDate.end, startEndDate.start)
        setIsLoading(true);
        var filtervalues = {
            type: typeValue, //type='sent' for sent tab and 'archived' for archived tab
            dateFrom: startEndDate.start,
            dateTo: startEndDate.end,
            filter: state.value
        };
        PostDataAPI("com/emailmessage/loadGrid", filtervalues, true).then((result) => {
            setIsLoading(false);
            if (result.success) {
                //  console.log(result.data)
                setRowsData(
                    result.data.map((item, i) => {
                        item.key = item.messageId
                        item.typeColor = <span className={item.messageTypeCode == "practice" ? classes.deletedLine : classes.activeLine} ></span>
                        item.infoIcon = item.isUrgent ? <ErrorOutlineIcon className={classes.infoIcon} /> : <></>
                        if (typeValue == 'sent')
                            item.to = <div className={classes.PatientFwdText}>
                                {item.to}
                                <span className={classes.fwdText}>{item.messageSubject}</span>
                            </div>
                        else
                            item.from = <div className={classes.PatientFwdText}>
                                {item.messageStatusCode != "read" ? <strong>{item.from}</strong> : item.from}
                                <span className={classes.fwdText}>{item.messageSubject}</span>
                            </div>

                        item.patientName =
                            <Link>
                                <Typography
                                    onClick={() => openDemographics(item.patientId)}
                                    className={classes.linkName}
                                >
                                    {item.patientName}</Typography>
                            </Link>
                        item.action = (typeValue == 'inbox') ? <>
                            {item.isReplied == 1 ? <img className={classes.inOutEmail} src={OutEmail} alt="Replied Message" /> : null}
                            {item.isForwarded == 1 ? <img className={classes.inOutEmail} src={InEmail} alt="Forwarded Message" /> : null}
                            {item.attachmentCount > 0 ? <AttachFileIcon className={classes.attachIcon} /> : null} </>
                            : null;

                        item.recievedDate = item.recievedDate ? <span style={{ display: "flex", flexDirection: "column", lineHeight: "18px" }}>
                            <span>{formatDate(item.recievedDate.split(' ')[0])}</span>
                            <Typography className={classes.timeDisplay}>{formatTime(item.recievedDate)}</Typography>
                        </span> : "";
                        return { ...item }
                        // return { ...item, clickEvent: e => handleClick(e, item.patientAppointmentID, item.patientName) }
                    }));
            }
            else {
                // console.log(result.message);
            }
        })
    }
    const handleRowClick = (e, record) => {
        // console.log(record);
        //setIsLoading(true);
        setShowMessageBody(true)
        var id = record.messageId
        PostDataAPI("com/emailmessage/getAllLinked", id).then((result) => {
            //setIsLoading(false);
            if (result.data && result.data.length > 0) {
                console.log(result.data);
                
                setEmailMessage(

                    result.data.map((item, i) => {
                        return {
                            emailMessageId: item.messageId,
                            messageTypeCode: item.messageTypeCode,
                            patientId: parseInt(item.patientId),
                            from: item.from,
                            to: item.to,
                            createDate: item.createDate,
                            messageSubject: item.messageSubject,
                            messageBody: item.messageBody,
                            isUrgent: item.isUrgent,
                            messageStatusCode: item.messageStatusCode,
                            attachments: item.attachmentsLink,
                            sendTo: item.sendTo,
                            patientName: item.patientName,
                            createdBy: item.createdBy,
                            replyOnMessageId: item.replyOnMessageId,
                            fwOnMessageId: item.fwOnMessageId,
                            linkedType: item.linkedType
                        };
                    }));
                if (tabvalue != 'sent')
                    updateMessageStatus("read", result.data[0]);

                setRowsData(
                    rowsData.map((item, i) => {
                        if (item.emailMessageId == result.data[0].messageId) {
                            item.messageStatusCode = "read"
                        }
                        return { ...item }
                    })
                )
            }
            else {
                setEmailMessage([]);
            }
        });

    };
    const updateMessageStatus = (status, message) => {
        message.messageStatusCode = status;
        PostDataAPI("com/emailmessage/updateStatus", message, true).then((result) => {
            getUnreadMessageCount();
        });
    }
    const openDemographics = (id) => {
        setPatentIdOf(id)
        setDemographicsDialogOpenClose(true);
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const fileNameGet = (fileName) => {
        let getFileName = fileName.replace(/^.*[\\\/]/, '')
        return getFileName
    }
    const handleCloseAddMessage = () => {
        setAddNewMessageState(false);
        loadData();
        getUnreadMessageCount();
    }
    //use it to archive the message.
    const archive = (messageId) => {
        var data = {
            archiveMessageIds: [messageId]
        }
        //  console.log(data)
        ShowActionDialog(true, "Archive", "Are you sure, you want to archive the message?", "confirm", function () {
            setArchiveLoading(true);
            PostDataAPI("com/emailmessage/archive", data, true).then((result) => {
                setArchiveLoading(false);
                if (result.success) {
                    loadData();
                    showMessage("Success", "Message archived successfully.", "success", 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            });
        });
    };

    const archiveAll = (messageId) => {
        var data = {
            archiveMessageIds: messageId
        }

        ShowActionDialog(true, "Archive", "Are you sure, you want to archive selected message(s)?", "confirm", function () {
            setArchiveAllLoading(true);
            PostDataAPI("com/emailmessage/archive", data, true).then((result) => {
                setArchiveAllLoading(false);
                if (result.success) {
                    loadData()
                    showMessage("Success", "Message(s) archived successfully.", "success", 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            });
        });
    };
    const getUnreadMessageCount = () => {
        var params = {
            code: "get_unread_message_count",
            parameters: [userInfo.userID.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                props.UpdateMessageCount(result.data[0].text1);
                setIndexNumber(result.data[0].text1);
            }
        });
    }
    return (
        <>
            <PageTitle title="Messages" />
            <Container maxWidth={false}>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew} disabled={!isMessageEditable}>+ Add New
                    </Button>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addArchieveSelected}
                        disabled={!isMessageEditable}>
                        {archiveAllLoading === true ? <CircularProgress className={classes.circularProgressBar} size={20} /> :
                            <> <img src={ArchieveIcon} alt="icon" style={{ paddingRight: 3 }} />  Archive</>}
                    </Button>
                    <div className={classes.selectBox}>
                        <SelectField
                            id="filter"
                            name="filter"
                            value={state.filter}
                            onChange={handleChange}
                            options={Options}
                        />
                    </div>
                    <div className={classes.searchBox}>
                        <InputBase
                            id="value"
                            name="value"
                            value={state.value}
                            placeholder="Search"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon />}
                            onChange={handleChange}
                        />
                    </div>
                    <Tooltip title="Reset Filter">
                        <Button
                            size="small"
                            className={classes.resetButton}
                            startIcon={<ReplayIcon />}
                            onClick={resetFilterBtn}
                        >
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Tabs
                            classes={{ root: classes.tabRoot }}
                            value={tabvalue}
                            onChange={onTabChange}
                            aria-label="icon tabs example"
                            className={classes.Htabs}
                        >
                            <Tab label="Inbox" icon={<Badge badgeContent={indexNumber > 0 ? indexNumber : null} />} aria-label="inbox" {...a11yProps(0)} />
                            <Tab label="Sent" aria-label="sent" {...a11yProps(1)} />
                            <Tab label="Archived" aria-label="archieved" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                            {tabvalue == 0 ? (
                                <>
                                    <div className="custom-grid">
                                        <Table
                                            onRow={(record, rowIndex) => {
                                                return {
                                                    onClick: (e) => handleRowClick(e, record),
                                                };
                                            }}
                                            scroll={true}
                                            checkStrictly={true}
                                            dataSource={rowsData}
                                            pagination={{ defaultPageSize: 8, showSizeChanger: true, pageSizeOptions: [8, 15, 30] }}
                                            columns={gridCnfg["Messages"]}
                                            rowClassName={(record, index) => "claimRow"}
                                            locale={{
                                                emptyText: (
                                                    <Empty
                                                        image={isLoading && LoadingIcon}
                                                        description={isLoading ? "Loading..." : "No Record Found"}
                                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                    />
                                                )
                                            }}
                                            rowSelection={{ selectedRowKeys: selectedRows, onChange: onSelectChange }}

                                        />
                                    </div>

                                </>) : ""}
                        </TabPanel>

                        <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                            {tabvalue == 1 ? <>
                                <div className="custom-grid">
                                    <Table
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: (e) => handleRowClick(e, record),
                                            };
                                        }}
                                        scroll={true}
                                        dataSource={rowsData}
                                        pagination={{ defaultPageSize: 8, showSizeChanger: true, pageSizeOptions: [8, 15, 30] }}
                                        columns={gridCnfg["Sent"]}
                                        rowClassName={(record, index) => "claimRow"}
                                        locale={{
                                            emptyText: (
                                                <Empty
                                                    image={isLoading && LoadingIcon}
                                                    description={isLoading ? "Loading..." : "No Record Found"}
                                                    imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                />
                                            )
                                        }}
                                        rowSelection={{ selectedRowKeys: selectedRows, onChange: onSelectChange }}

                                    />
                                </div>

                            </>
                                : ""}
                        </TabPanel>

                        <TabPanel value={tabvalue} index={2} className={classes.tabPan}>
                            {tabvalue == 2 ? <>
                                <div className="custom-grid">
                                    <Table
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: (e) => handleRowClick(e, record),
                                            };
                                        }}
                                        scroll={true}
                                        dataSource={rowsData}
                                        pagination={{ defaultPageSize: 8, showSizeChanger: true, pageSizeOptions: [8, 15, 30] }}
                                        columns={gridCnfg["Archieved"]}
                                        rowClassName={(record, index) => "claimRow"}
                                        locale={{
                                            emptyText: (
                                                <Empty
                                                    image={isLoading && LoadingIcon}
                                                    description={isLoading ? "Loading..." : "No Record Found"}
                                                    imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                />
                                            )
                                        }}
                                    // rowSelection={{ selectedRowKeys: selectedRows, onChange: onSelectChange }}

                                    />
                                </div>

                            </>
                                : ""}
                        </TabPanel>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <span className={classes.inPracticeColor}><span></span>In Practice</span>
                                <span className={classes.patientColor}><span></span>Patient</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                        <div className={classes.messageSection} ref={messagePrint}>
                            {
                                !showMessageBody ?
                                    <Typography className={classes.noMessageText}>

                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description={
                                                <span>
                                                    Please select a message to view
                                                </span>
                                            } />
                                    </Typography> :
                                    <>
                                        {emailMessage.map((item, i) => (
                                            <>
                                                {item.linkedType == 'or' ?
                                                    <>
                                                        <div className={classes.messageHeader}>
                                                            <div>
                                                                <Typography className={classes.messageFrom}>
                                                                    <strong>Message From: </strong>{item.from}
                                                                </Typography>
                                                                <Typography className={classes.forwardMessageText}> <strong>Message To: </strong>{item.to}</Typography>
                                                            </div>
                                                            <span>
                                                                <Tooltip title="Reply">
                                                                    <img src={ReplyMessage} disabled={!isMessageEditable} onClick={addReply} alt="icon" className={classes.replyIcon} />
                                                                </Tooltip>
                                                                <Tooltip title="Forward">
                                                                    <img src={ForwardMessage} onClick={addFw} alt="icon" className={classes.forwardIcon} />
                                                                </Tooltip>
                                                                {
                                                                    tabvalue != 2 ?
                                                                        <Tooltip title="Archive">
                                                                            {archiveLoading === true ? <CircularProgress className={classes.circularProgressBar} size={20} /> :
                                                                                <img src={ArchiveMessage} onClick={() => archive(item.emailMessageId)} alt="icon" className={classes.importIcon} />}
                                                                        </Tooltip>
                                                                        : null
                                                                }
                                                                <ReactToPrint
                                                                    trigger={() => <Tooltip title="Print"><img src={PrintMessage} alt="icon" className={classes.printIcon} /></Tooltip>}
                                                                    content={() => messagePrint.current}
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className={classes.messageBody} >
                                                            {/* <Typography className={classes.fwdMessageTitle}>Fwd: Urgent Reminder to call smith john</Typography>
                                            <Typography className={classes.fwdMessagePatientName}>Patient: <span>Smith John</span></Typography>
                                            <Typography className={classes.fwdMessagePatientContact}>+1 (555) 255 25252 </Typography> */}
                                                            {/* <FormGroupTitle /> */}

                                                            <Typography className={classes.forwardMessageText}><strong>Subject:</strong>  {item.messageSubject}</Typography>
                                                            <Typography className={classes.forwardMessageText}><strong>Date:</strong> {moment(item.createDate).format('MM/DD/YYYY hh:mm a')}</Typography>

                                                            <Typography className={classes.forwardMessageText}>
                                                                <strong>Message:</strong>  <span style={{ whiteSpace: "break-spaces" }}>{item.messageBody}</span>
                                                            </Typography>

                                                            {item.attachments.length > 0 ?
                                                                <>
                                                                    <FormGroupTitle />
                                                                    <Typography className={classes.fwdMessageText}>
                                                                        <strong>Attachment:</strong>
                                                                        <ul className={classes.attachmentFiles}>
                                                                            {
                                                                                item.attachments.map((file, index) => (
                                                                                    <li className={classes.attachmentFileItem} key={index}>
                                                                                        <LinkS onClick={file} download={file} href={"." + file}>{fileNameGet(file)}</LinkS>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </Typography>
                                                                </>
                                                                : null}
                                                        </div>
                                                        <div className={classes.messageFooter}>
                                                            <div>
                                                                <LinkS onClick={addReply} disabled={!isMessageEditable}>Reply</LinkS> |
                                                                <LinkS onClick={addFw}>Forward</LinkS> |
                                                                {
                                                                    tabvalue != 2 ?
                                                                       <> <LinkS onClick={() => archive(item.emailMessageId)}>Archieve</LinkS> | </>
                                                                        : null}
                                                                <LinkS onClick={PrintMessage}>Print</LinkS>
                                                            </div>
                                                        </div>

                                                    </> : null}
                                                {item.linkedType == 're' ?
                                                    < div className={classes.forwardMessageSections}>
                                                        <Typography className={classes.forwardMessageText}>----- Reply Message ----</Typography>
                                                        <section>
                                                            <Typography className={classes.forwardMessageText}> <strong>Message From: </strong>{item.from}</Typography>
                                                            <Typography className={classes.forwardMessageText}> <strong>Message To: </strong>{item.to}</Typography>
                                                            {/* <Typography className={classes.forwardMessageText}>Date: 08-30-2021</Typography> */}
                                                        </section>
                                                        {/* <Typography className={classes.forwardMessageText}>To : Smith John</Typography> */}
                                                        <Typography className={classes.forwardMessageText}><strong>Subject:</strong>  {item.messageSubject}</Typography>
                                                        <Typography className={classes.forwardMessageText}><strong>Date:</strong> {moment(item.createDate).format('MM/DD/YYYY hh:mm a')}</Typography>
                                                        <Typography className={classes.forwardMessageText}>
                                                            <strong>Message:</strong> {item.messageBody}
                                                        </Typography>

                                                        {item.attachments.length > 0 ?
                                                            <>
                                                                <FormGroupTitle />
                                                                <Typography className={classes.fwdMessageText}>
                                                                    <strong>Attachment:</strong>
                                                                    <ul className={classes.attachmentFiles}>
                                                                        {
                                                                            item.attachments.map((file, index) => (
                                                                                <li className={classes.attachmentFileItem} key={index}>
                                                                                    <LinkS onClick={file} download={file} href={"." + file}>{fileNameGet(file)}</LinkS>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </Typography>
                                                            </>
                                                            : null}
                                                    </div>
                                                    : null}
                                                {item.linkedType == 'fw' ?
                                                    < div className={classes.forwardMessageSections}>
                                                        <Typography className={classes.forwardMessageText}>----- Forward Message ----</Typography>
                                                        <section>
                                                            <Typography className={classes.forwardMessageText}> <strong>Message From: </strong>{item.from}</Typography>
                                                            <Typography className={classes.forwardMessageText}> <strong>Message To: </strong>{item.to}</Typography>
                                                        </section>
                                                        {/* <Typography className={classes.forwardMessageText}>To : Smith John</Typography> */}
                                                        <Typography className={classes.forwardMessageText}><strong>Subject:</strong>  {item.messageSubject}</Typography>
                                                        <Typography className={classes.forwardMessageText}><strong>Date:</strong> {moment(item.createDate).format('MM/DD/YYYY hh:mm a')}</Typography>
                                                        <Typography className={classes.forwardMessageText}>
                                                            <strong>Message:</strong> {item.messageBody}
                                                        </Typography>

                                                        {item.attachments.length > 0 ?
                                                            <>
                                                                <FormGroupTitle />
                                                                <Typography className={classes.fwdMessageText}>
                                                                    <strong>Attachment:</strong>
                                                                    <ul className={classes.attachmentFiles}>
                                                                        {
                                                                            item.attachments.map((file, index) => (
                                                                                <li className={classes.attachmentFileItem} key={index}>
                                                                                    <LinkS onClick={file} download={file} href={"." + file}>{fileNameGet(file)}</LinkS>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </Typography>
                                                            </>
                                                            : null}
                                                    </div>
                                                    : null}
                                                {/* <div className={classes.gridButtonsArea}>
                                            <Button className={classes.gridButton} >Reply</Button>|
                                            <Button className={classes.gridButton} >Forward</Button>|
                                            <Button className={classes.gridButton} >Archive</Button>|
                                            <Button className={classes.gridButton} >Print</Button>
                                        </div>  */}
                                            </>

                                        ))}

                                    </>
                            }
                        </div>

                    </Grid>
                </Grid>
            </Container >
            {
                addNewMessageState ?
                    <AddNewMessage
                        showHideDialog={addNewMessageState}
                        handleClose={() => handleCloseAddMessage()}
                        message={emailMessage}
                        type={emailType}
                    /> : null
            }
            {
                demographicsDialogOpenClose ?
                    <Dialog
                        classes={{ paper: classes.dialogPaper }}
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={demographicsDialogOpenClose}
                        PaperComponent={DraggableComponent}
                        fullWidth={true}
                    >
                        <Divider />
                        <div className={classes.dialogcontent}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>Demographics</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>

                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ minHeight: 550 }} >
                                        <Demographics dataId={patentIdOf} patientId={patentIdOf} isEditable={isEditable} />
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </Dialog >
                    : null
            }
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )
}

export default withSnackbar(Messages)