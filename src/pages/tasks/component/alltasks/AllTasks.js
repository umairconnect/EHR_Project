import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import {
    Grid, Button,
    Divider,
    Dialog
} from "@material-ui/core"
//components
import TaskGrid from "../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField } from '../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import NewTask from "./component/newTask/NewTask";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from '../../../../components/Message/Alert';
//import LabResultDetails from '../labResults/component/labResultDetails/LabResultDetails';
import LabResultDetails from '../labResults/component/addResults/AddResultDialog';
import RefillRequestDetails from '../refillRequests/component/RefillRequestDetails';
import SearchList from "../../../../components/SearchList/SearchList";
import CloseIcon from "../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import Demographics from '../../../patients/component/demographics/Demographics';

function AllTasks({ ...props }) {

    var classes = useStyles();
    const { showMessage } = props;

    const [allTasksSearchList, setAllTasksSearchList] = useState([]);
    const [allStatusList, setAllStatusList] = useState([]);

    const allDateFiltersList = [

        { label: "Current Month", value: "Current" },
        { label: "Last 7 Days", value: "Last-7-Days" },
        { label: "Due Tomorrow", value: "Due-Tomorrow" },
        { label: "Next 7 Days", value: "Next-7-Days" },
        { label: "Next 30 Days", value: "Next-30-Days" },
        { label: "Next 60 Days", value: "Next-60-Days" },
        { label: "Next 90 Days", value: "Next-90-Days" },
        { label: "Future", value: "Future" }
    ]

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    // It will be dynamic
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [state, setState] = useState({});
    const [dialogState, setDialogState] = useState(false);
    const [isGridUpdate, setIsGridUpdate] = useState(false);
    const [filterValues, setFilterValue] = useState({ taskType: "", status: "", dateFilter: "Current", provider: "", providerName: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString() });
    const [allProviders, setAllProviders] = useState([]);
    const [dataIdEdit, setDataIdEdit] = useState(0);
    const [isView, setIsView] = useState(true);
    const [readOnly, setReadOnly] = useState(false);
    const [readOnlyAssignTo, setReadOnlyAssignTo] = useState(false);
    const [isViewLabel, setIsViewLabel] = useState("Add Reminder");
    const [labOrderId, setLabOrderId] = useState(0);
    const [dialogStateLabResults, setDialogStateLabResults] = useState(false);
    const [dialogStateLabRefills, setDialogStateLabRefills] = useState(false);
    const [dataIdEditTask, setDataIdEditTask] = useState(0);
    const [calledModule, setCalledModule] = useState(false);
    const [refillStatus, setRefillStatus] = useState("");

    const [searchDisabled, setSearchDisabled] = useState(false);
    const [searchDisabledFilter, setSearchDisabledFilter] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);


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

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "dateFilter") {

            selectDateByFilter(value, name);
        }
        else {
            setFilterValue(prevState => ({
                ...prevState,
                [name]: value
            }));

        }
    }

    const handleSelectChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    const getId = dataId => {
    }

    const handleActionChange = (taskId, action, id, moduleCode) => {
        resetIntialValues();
        
        if (moduleCode === 'Reminders' || moduleCode === 'Reminder') {
            setCalledModule(true);
            handleTask(taskId, action);
        }
        else if (moduleCode === 'Lab Order Results' || moduleCode === 'Lab_Order_Results') {
            setCalledModule(false);
            handleLabResults(taskId, action, id);
        }
        else if (moduleCode === 'Re-fill Requests') {
            setCalledModule(false);
            handleRefillRequest(taskId, action, id);
        }
        else if (moduleCode === 'Patient') {
            setDataIdEdit(taskId);
            setDemographicsDialogOpenClose(true)
        }
    }

    useEffect(() => {
        setIntialValues();

        if (props.filterByTask === 'Reminders') {

            filterValues.taskType = "Reminders";

            setSearchDisabledFilter(true);
        }
        var params = {
            code: "DDL_List_Item",
            parameters: ['task_status_option_code'] //'task_type_option_code'
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _taskTypeOptionCode = [];
                var _taskStatusOptionCode = [];

                result.data.map((item, i) => {

                    if (item.text3 == 'task_status_option_code')
                        _taskStatusOptionCode.push({ value: item.text1, label: item.text2 });


                });

                setAllStatusList(_taskStatusOptionCode);

                var data = {}
                PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
                    if (result) {
                        result.data.map((itm, j) => {
                            if (itm.taskTypeCode === 'labResults' || itm.taskTypeCode === 'refillRequests' || itm.taskTypeCode === 'reminders')
                                _taskTypeOptionCode.push({ value: chooseSelectedFilter(itm.taskTypeCode), label: itm.taskTypeName }); //chooseSelectedFilter(itm.taskTypeCode).trim().replaceAll("_", " ").replace("_", " ")
                        })

                        setAllTasksSearchList(_taskTypeOptionCode);
                    }
                })
            }
        })

    }, [filterValues]);

    function resetAllFilters() {
        setFilterValue({
            taskType: "", status: "", dateFilter: "Current", provider: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString()
        });

    }

    function chooseSelectedFilter(val) {
        let str = '';
        switch (val) {
            case 'labResults':
                str = "Lab_Order_Results";
                break;
            case 'refillRequests':
                str = "Re_fill_Requests";
                break;
            case 'reminders':
                str = "Reminders";
                break;
            default:
                str = '';
        }

        return str;
    }

    function selectDateByFilter(dateValue, name) {

        switch (dateValue) {

            case "Current":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 0).toString(),
                    dateFilter: dateValue
                }));
                break;
            case "Last-7-Days":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), -7).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Due-Tomorrow":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 1).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Next-7-Days":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 7).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Next-30-Days":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 30).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Next-60-Days":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 60).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Next-90-Days":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 90).toString(),
                    dateFilter: dateValue
                }));
                break

            case "Future":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 0).toString(),
                    dateFilter: dateValue
                }));
                break;

            case "Today":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: addDays(new Date(), 0).toString(),
                    dateFilter: dateValue
                }));
                break;

            default:
        }

    }


    function setIntialValues() {
        var user = JSON.parse(sessionStorage.getItem('user_info')).user;

        if (filterValues.filterByTask === 'userId') {
            setSearchDisabled(true);
            if (user.isProvider === true)
                filterValues.providerName = user.firstName + ' ' + user.lastName + ' (Provider) ';
            else
                filterValues.providerName = user.firstName + ' ' + user.lastName + ' (Staff) ';
        }
    }

    function taskCompleteStatus(taskId) {

        var data = {
            taskId: parseInt(taskId),
            taskStatusCode: 'Completed'
        }

        PostDataAPI("task/updateTaskStatus", data).then((result) => {

            if (result.success && result.data != null) {

                setDataIdEdit(0);
                gridUpdate();

            }
        });

    }

    function addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date.toISOString().split('T')[0];
    }

    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }


    const onOpenDialog = () => {

        setDataIdEdit(0);
        setCalledModule(true);
        setIsViewLabel("Add Reminder");
        setReadOnly(false);
        setIsView(true);
        setDialogState(true);
        setReadOnlyAssignTo(false);



    };

    function handleTask(taskId, action) {
        
        if (action == 'View' || action == 'Review' || action == 'Completed') {

            setIsViewLabel("View Reminder");
            setDataIdEdit(parseFloat(taskId));
            setReadOnly(true);
            setIsView(false);
            setDialogState(true);


        }
        else if (action == 'Edit') {

            setIsViewLabel("Edit Reminder");
            setDataIdEdit(parseFloat(taskId));
            //loadTaskData(id);
            setReadOnly(false);
            setIsView(true);
            setDialogState(true);


        }
        else if (action == 'Delete') {


            ShowActionDialog(true, "Delete", "Are you sure, you want to delete the task?", "confirm", function () {

                var data = {
                    taskId: parseFloat(taskId)
                }

                PostDataAPI('task/deleteTask', data, true).then((result) => {

                    if (result.success == true) {
                        showMessage("Success", "Record deleted successfully.", "success", 2000);
                        gridUpdate();
                    }
                    else {
                        showMessage("Error", result.message, "error", 8000);
                    }
                })

            });
        }
        else if (action == 'Complete') {

            taskCompleteStatus(parseFloat(taskId));

        }
        else if (action == 'assignedTo') {

            setDataIdEdit(parseFloat(taskId));
            setReadOnly(true);
            setIsView(true);
            setDialogState(true);
            setReadOnlyAssignTo(true);
            setIsViewLabel("Edit Reminder");
        }

    }

    function handleLabResults(taskId, action, id) {
        setLabOrderId(parseFloat(id));
        setDialogStateLabResults(true);
        setIsReadOnly(true);

    }

    function handleRefillRequest(taskId, action, id) {

        if (action == "Review") {
            setDataIdEdit(id);
            setDataIdEditTask(taskId);
            setDialogStateLabRefills(true);
        }
        else if (action == "View") {
            setRefillStatus("Completed");
            setDataIdEdit(id);
            setDataIdEditTask(taskId);
            setDialogStateLabRefills(true);
        }
        else if (action == "Assign To") {
            setRefillStatus(action);
            setDataIdEdit(id);
            setDataIdEditTask(taskId);
            setDialogStateLabRefills(true);
        }


    }

    function resetIntialValues() {
        setLabOrderId(0);
        setDataIdEdit(0);
        setDataIdEditTask(0);
        setReadOnlyAssignTo(false);
        setRefillStatus("");
    }


    const handleSearcdhListProviderStaffChange = (name, item) => {
        
        const { id, value } = item;

        setFilterValue(prevState => ({
            ...prevState,
            provider: id,
            providerName: value
        }))
    }

    //const loadTaskData = (dataIdEdit) => {

    //    PostDataAPI("task/getTaskById", dataIdEdit).then((result) => {

    //        if (result.success && result.data != null) {

    //            handleFormatData(result.data);
    //            setState(result.data);

    //        }
    //    });
    //}

    const gridUpdate = () => setIsGridUpdate(!isGridUpdate);
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    return (
        <>
            {/*<NewTask dialogOpenClose={dialogState} dataIdEdit={dataIdEdit} handleClose={() => setDialogState(false)} isViewLabel={isViewLabel} isView={isView} readOnlyAssignTo={readOnlyAssignTo} readOnly={readOnly} errorMessages={errorMessages} /> */}
            {dialogState ? <NewTask
                dialogOpenClose={dialogState}
                dataIdEdit={dataIdEdit}
                calledModule={calledModule}
                handleClose={() => setDialogState(false)}
                isView={isView}
                readOnlyAssignTo={readOnlyAssignTo}
                readOnly={readOnly}
                isViewLabel={isViewLabel}
                updateGrid={() => gridUpdate()}
            />
                : ""}
            {
                dialogStateLabResults ?
                    <LabResultDetails dialogOpenClose={dialogStateLabResults} handleClose={() => setDialogStateLabResults(false)} labOrderId={labOrderId} isReadOnly={labOrderId} resultDialogStateTitle="Review Manual Test Result" updateGrid={() => gridUpdate()} isEditable={props.isEditable} />
                    : ""}
            {
                dialogStateLabRefills ?
                    <RefillRequestDetails dialogOpenClose={dialogStateLabRefills} handleClose={() => setDialogStateLabRefills(false)} dataIdEdit={dataIdEdit} dataIdEditTask={dataIdEditTask} updateGrid={() => gridUpdate()} refillStatus={refillStatus} isEditable={props.isEditable} />
                    : ""}

            <div className={classes.allTasksCard}>
                <div className={classes.allTasksInnerCard}>
                    <div className={classes.allTasksFilterArea}>
                        <Grid container spacing={1} direction="row" justify="center">
                            <FormGroupTitle>{props.title}</FormGroupTitle>
                        </Grid>
                        <Grid container spacing={3} direction="row" justify="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <span className={classes.controlContainer}>
                                    {
                                        props.filterByTask != "encounter" ? <Button
                                            size="small"
                                            className={classes.newAddBtn2}
                                            onClick={onOpenDialog}
                                            disabled={!props.isEditable}
                                        >+ Add New
                                        </Button> : ""
                                    }

                                </span>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} direction="row" justify="center">
                            <Label title="Filters" size={1} />

                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                <SelectField
                                    name="taskType"
                                    id="taskType"
                                    value={filterValues.taskType}
                                    options={allTasksSearchList}
                                    placeholder="Select Filters"
                                    onChange={handleChange}
                                    Disabled={searchDisabledFilter}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <SelectField
                                    name="status"
                                    id="status"
                                    value={filterValues.status}
                                    options={allStatusList}
                                    placeholder="Select Status"
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <SelectField
                                    name="dateFilter"
                                    id="dateFilter"
                                    value={filterValues.dateFilter}
                                    options={allDateFiltersList}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                                <SearchList
                                    id="provider"
                                    name="provider"
                                    value={filterValues.provider}
                                    searchTerm={filterValues.providerName}
                                    code="providers_staff_search"
                                    apiUrl="ddl/loadItems"
                                    isUser={true}
                                    onChangeValue={(name, item) => handleSearcdhListProviderStaffChange(name, item)}
                                    placeholderTitle="Search Provider / Staff"
                                    isDisabled={searchDisabled}
                                />
                            </Grid>
                            {/*   <Grid item xs={0} sm={0} md={1} lg={1} xl={1} />*/}
                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                <FormBtn id="reset" size="medium" onClick={resetAllFilters}>
                                    Reset Filters
                                </FormBtn >
                            </Grid>

                        </Grid>
                    </div>
                    <TaskGrid
                        code="AllTasks"
                        rowClick={getId}
                        searchShowHide={false}
                        filterValues={filterValues}
                        apiUrl="task/loadTaskGrid"
                        update={isGridUpdate}
                        actionClick={(taskId, action, id, moduleCode) => handleActionChange(taskId, action, id, moduleCode)}
                        filterByTask={props.filterByTask}
                        isEditable={props.isEditable}
                    />
                </div>
            </div>
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
                                        <Demographics dataId={dataIdEdit} />
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </Dialog >
                    : ""}
        </>
    )
}

export default withSnackbar(AllTasks)
