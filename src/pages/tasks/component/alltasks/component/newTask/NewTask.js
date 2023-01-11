import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormHelperText,
} from "@material-ui/core";
//components
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import SearchList from "../../../../../../components/SearchList/SearchList"
import { FormGroupTitle, Label, FormBtn, ErrorMessage, DraggableComponent } from '../../../../../../components/UiElements/UiElements';
import { InputBaseField, SelectField, TextareaField } from '../../../../../../components/InputField/InputField';
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import PatientSearchList from "../../../../../../components/PatientSearchList/PatientSearchList"

function NewTask({ dialogOpenClose, handleClose, dataIdEdit, isView, readOnly, readOnlyAssignTo, updateGrid, isViewLabel, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [state, setState] = useState({

        taskId: 0, userId: null, userName: "", patientId: null, patientName: "", taskDateTime: new Date().toISOString(),
        taskName: "", taskDetail: "", remiderDateTime: "", taskStatusCode: "Open", taskTypeCode: "Reminders", isDeleted: false,
        createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), patientName: "", userName: ""
    });


    const [dataId, setDataId] = useState(props.dataId);
    const [loginUser, setLoginUser] = useState({ logInUser: null });
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [errorMessages, setErrorMessages] = useState({ errorTaskDetail: false, errorAssignTo: false, errortaskDateTime: false })
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [taskTypeList, setTaskTypeList] = useState([]);
    const [reRender, setReRender] = useState(0);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    var user = sessionStorage.getItem('user_info');

    useEffect(() => {

        var params = {
            code: "DDL_List_Item",
            parameters: ['task_type_option_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            
            if (result.success && result.data != null) {

                var _taskTypeOptionCode = [];

                result.data.map((item, i) => {

                    if (item.text3 == 'task_type_option_code')
                        _taskTypeOptionCode.push({ value: item.text1, label: item.text2 });

                });

                setTaskTypeList(_taskTypeOptionCode);
            }
        })

        cleanValuesFields();
        loadLoggedInUser();

        if (dataIdEdit > 0)
            loadTaskData();

    }, [dataIdEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name === "userName") {
            setState(prevState => ({
                ...prevState,
                [name]: value,
                userId: id
            }));

        }
        else if (name === "patientName") {
            setState(prevState => ({
                ...prevState,
                [name]: value,
                patientId: id
            }));

        }

    }

    const handleChangePatientId = (item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    const loadTaskData = () => {

        PostDataAPI("task/getTaskById", dataIdEdit).then((result) => {

            if (result.success && result.data != null) {

                result.data = handleFormatData(result.data);
                setState(result.data);

            }
        });
    }

    function handleFormatData(dataSet) {

        dataSet.taskDateTime = dataSet.taskDateTime ? dataSet.taskDateTime.split('T')[0] : null;
        dataSet.taskDetail = dataSet.taskDetail.toString();

        return dataSet;

    }

    const Save = e => {


        let errorList = [];
        if (readOnlyAssignTo === true) {
            if (state.userId == "" || state.userId == undefined || state.patientName == "") {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorAssignTo: true
                }));

                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorAssignTo: false
                }));
            }
        }
        else
            ValidateTask(errorList);

        if (errorList.length < 1) {


            let method = "task/addTask";

            if (state.taskId > 0) {

                method = "task/updateTask";
            }

            //  setSaveLoading(true);

            state.userId = parseFloat(state.userId);
            state.patientId = parseFloat(state.patientId);
            state.taskDateTime = state.taskDateTime == "" ? null : state.taskDateTime;

            if (readOnlyAssignTo)
                state.taskStatusCode = 'Re-assigned';

            setIsSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaveLoading(false);

                if (result.success == true) {
                    setErrorMessages([]);

                    if (state.taskId < 1) {

                        if (result.success && result.data != null) {

                            // if (result.message) {

                            //     showMessage("Alert", result.message, "info", 3000);
                            // }
                            // else
                            showMessage("Success", "Task saved successfully.", "success", 3000);
                            cleanValuesFields();
                            updateGrid();
                            setIsSaveCall(false);
                            setState(result.data);
                            handleClose();
                        }
                    }
                    else if (state.taskId > 0 || state.taskId != "") {

                        if (result.success) {
                            setIsSaveCall(false);
                            showMessage("Success", "Task updated successfully.", "success", 3000);
                            updateGrid();
                            handleClose();
                        }
                    }

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setIsSaveCall(false);
                }
            })

        }

    };

    function ValidateTask(errorList) {


        if (state?.taskDetail?.replace(/\s+/g, "") === "" || state.taskDetail == undefined) {
            // if (state?.taskDetail?.replace(/\s+/g, "") === "" || state.taskDetail == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorTaskDetail: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTaskDetail: false
            }));
        }


        //if (state.userId == "" || state.userId == undefined) {

        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorAssignTo: true
        //    }));

        //    errorList.push(true);

        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorAssignTo: false
        //    }));
        //}

        if (state.taskDateTime == "" || state.taskDateTime == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errortaskDateTime: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errortaskDateTime: false
            }));
        }

    }
    const handleChangeDate = (value) => {

        setDateByValue(value);

    }
    function setDateByValue(decision) {
        switch (decision) {

            case "Year":
                setState(prevState => ({
                    ...prevState,
                    taskDateTime:
                        addMonths(new Date(), 12).toString()
                }));
                break;
            case "Month":
                setState(prevState => ({
                    ...prevState,
                    taskDateTime:
                        addMonths(new Date(), 1).toString()
                }));
                break;
            case "Week":
                setState(prevState => ({
                    ...prevState,
                    taskDateTime:
                        addDays(new Date(), 7).toString()
                }));
                break;
            case "Day":
                setState(prevState => ({
                    ...prevState,
                    taskDateTime:
                        addDays(new Date(), 1).toString()
                }));
                break;
            case "Today":
                setState(prevState => ({
                    ...prevState,
                    taskDateTime:
                        addDays(new Date(), 0).toString()
                }));
                break;

            default:
        }
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

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    function deleteRecord() {

        var data = {
            taskId: parseInt(state.taskId)
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the task?", "confirm", function () {

            setIsDeleteLoading(true)
            PostDataAPI('task/deleteTask', data, true).then((result) => {
                setIsDeleteLoading(false)

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleClose();
                    updateGrid();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })

    }
    // userID: userInfo.userID.toString(),
    function loadLoggedInUser() {


        var params = {
            code: "",
            parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
        }

        // PostDataAPI("user/getUserDecr", "userID=" + userInfo.userID.toString(), false).then((result) => {
        PostDataAPI('user/getUserDecr', params, true).then((result) => {
            if (result.success) {

                setLoginUser(prevState => ({
                    ...prevState,
                    logInUser: result.data
                }))

            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }

        })

    }

    function loadTaskByID() {

        PostDataAPI("task/getTaskById", dataId.dataId ? dataId.dataId : dataId).then((result) => {

            if (result.success && result.data != null) {


                checkSetDafaultDate(result.data);
                setState(result.data);
            }
        })
    }

    function checkSetDafaultDate(dataSet) {
        if (dataSet.taskDateTime != null && dataSet.taskDateTime.trim() != '0001-01-01T00:00:00')
            dataSet.taskDateTime = dataSet.taskDateTime.split('T')[0];
        else
            dataSet.taskDateTime = '';
    }

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
    //

    function assignToUser() {

        if (!readOnly || readOnly && readOnlyAssignTo) {
            setState(prevState => ({
                ...prevState,
                userName: ''
            }));

            setTimeout(function () {

                setState(prevState => ({
                    ...prevState,
                    userName: JSON.parse(user).user.isProvider === true ? userInfo.firstName + ' ' + userInfo.lastName + ' (Provider) ' : userInfo.firstName + ' ' + userInfo.lastName + ' (Staff) ',
                    userId: loginUser.logInUser
                }));

            }, 100);

        }
    }

    function cleanValuesFields() {
        //if (showHide === true) {
        setState({
            taskId: 0, userId: null, userName: "", patientId: null, patientName: "", taskDateTime: new Date().toISOString(),
            taskName: "", taskDetail: "", taskDateTime: "", taskStatusCode: "Open", taskTypeCode: "Reminders", isDeleted: false,
            createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), patientName: "", userName: ""
        });
        //  }

        setErrorMessages({

            errorTaskDetail: false, errorAssignTo: false, errortaskDateTime: false
        })

    }

    function handleClosePopUp() {

        if (dataIdEdit == 0)
            cleanValuesFields();
        else { setErrorMessages({ errorTaskDetail: false, errorAssignTo: false, errortaskDateTime: false }) }

        handleClose();
    }

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}

                {...props} >
                <div className={classes.dialogcontent}>
                    <DialogTitle>
                        <Grid lg={12} container direction="row">

                            <Grid item xs={11} sm={11} md={11} lg={11}
                                container
                                direction="row"
                                id="draggable-dialog-title"
                            >
                                <FormGroupTitle>{isViewLabel}</FormGroupTitle>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} >
                                <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                    <span className={classes.crossButton} onClick={handleClosePopUp}><img src={CloseIcon} /></span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent className={classes.dialogcontent} >
                        <Scrollbars autoHeight autoHeightMax={450} style={{ height: "100%", display: "flex", width: "100%" }}>
                            <Grid container lg={12}>
                                <Label title="Details" size={3} mandatory={true} isTextAreaInput={true} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <TextareaField
                                        name="taskDetail"
                                        id="taskDetail"
                                        value={state.taskDetail}
                                        rowsMin={4}
                                        onChange={handleChange}
                                        placeholder="Task Details"
                                        MaxLength="2000"
                                        disabled={readOnly}
                                    />
                                    {errorMessages.errorTaskDetail ? (<ErrorMessage textArea={true} >
                                        Please enter task details
                                    </ErrorMessage>) : ('')}
                                </Grid>
                                <Label title="Assign to" mandatory={false} size={3} />
                                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                    <SearchList
                                        id="userName"
                                        name="userName"
                                        value={state.userName}
                                        searchTerm={state.userName}
                                        code="providers_staff_search"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search"
                                        isUser={true}
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        isDisabled={readOnlyAssignTo == true ? false : readOnly}
                                    />
                                    {/*{errorMessages.errorAssignTo && !state.userId ? (<ErrorMessage >*/}
                                    {/*    Please enter assign*/}
                                    {/*</ErrorMessage>) : ('')}*/}
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                    <Button className={classes.assignMeBtn} variant="text" color="primary" onClick={assignToUser}>Assign to me</Button>
                                </Grid>
                                <Label style={{lineHeight:"1.4"}} title="Regarding  Patient" size={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <PatientSearchList
                                        id="patientId"
                                        name={state.patientName}
                                        value={state.patientId}
                                        onChangeValue={(value) => handleChangePatientId(value)}
                                        placeholderTitle="Search Patient"
                                        reRender={reRender}
                                        isDisabled={readOnly}
                                    />
                                </Grid>
                                <Label title="Reminder Date" mandatory={true} size={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <InputBaseField
                                        id="taskDateTime"
                                        name="taskDateTime"
                                        type="date"
                                        value={state.taskDateTime}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                    />
                                    {errorMessages.errortaskDateTime && !state.taskDateTime ? (<ErrorMessage >
                                        Please select reminder date
                                    </ErrorMessage>) : ('')}
                                </Grid>

                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}></Grid>

                                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                    <Button className={classes.dateBtn} disabled={readOnly} id="Today" onClick={() => handleChangeDate('Today')} value="Today">Today</Button>
                                    <Button className={classes.dateBtn} disabled={readOnly} id="Day" onClick={() => handleChangeDate('Day')} value="Day">+1 Day</Button>
                                    <Button className={classes.dateBtn} disabled={readOnly} id="Week" onClick={() => handleChangeDate('Week')} value="Week">+1 Week</Button>
                                    <Button className={classes.dateBtn} disabled={readOnly} id="Month" onClick={() => handleChangeDate('Month')} value="Month">+1 Month</Button>
                                    <Button className={classes.dateBtn} disabled={readOnly} id="Year" onClick={() => handleChangeDate('Year')} value="Year">+1 Year</Button>
                                </Grid>

                                <Label title="Author" size={3} />

                                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                    <Typography className={classes.authorName}>{userInfo.firstName + ' ' + userInfo.lastName}</Typography>
                                </Grid>

                                <Label title="Task Type" size={3} />

                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <SelectField
                                        placeholder="Select Task Type"
                                        name="taskTypeCode"
                                        id="taskTypeCode"
                                        value={state.taskTypeCode}
                                        onChange={handleChange}
                                        options={taskTypeList}
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Grid container direction="row" xs={12} sm={3} md={3} lg={3} xl={3} />
                            {isView ?
                                <Grid container direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={9} md={9} lg={9} xl={9}>

                                    {
                                        isSaveLoading ?
                                            <FormBtn id="loadingSave"   >Save </FormBtn>
                                            : <FormBtn id="save" onClick={Save} >Save </FormBtn>
                                    }


                                    {/* <FormBtn id="save" onClick={Save} >Save </FormBtn> */}

                                    {
                                        state.taskId > 0 ?
                                            isDeleteLoading ?
                                                <FormBtn id={"loadingDelete"} size="medium">
                                                    Delete
                                                </FormBtn> :
                                                <FormBtn id={"delete"} onClick={deleteRecord} size="medium">
                                                    Delete
                                                </FormBtn>
                                            : null
                                    }

                                    <FormBtn id="reset" onClick={() => handleClosePopUp()}  > Close </FormBtn>
                                </Grid>
                                : ""
                            }

                        </Grid>
                    </DialogActions>
                </div>
            </Dialog>
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

export default withSnackbar(NewTask)
