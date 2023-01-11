import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import { Grid, Button, Divider, Dialog } from "@material-ui/core"
//components
import TaskGrid from "../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField } from '../../../../components/InputField/InputField';
import LabResultDetails from './component/labResultDetails/LabResultDetails';
import AddResultDialog from './component/addResults/AddResultDialog';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import SearchList from "../../../../components/SearchList/SearchList";
import Demographics from '../../../patients/component/demographics/Demographics';
import CloseIcon from "../../../../images/icons/math-plus.png";

import { Scrollbars } from "rc-scrollbars";

function LabResults({ ...props }) {
    var classes = useStyles();

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);

    const [state, setState] = useState({});
    const [dialogState, setDialogState] = useState(false);
    const [filterValues, setFilterValue] = useState({ taskType: "Lab_Order_Results", status: "", dateFilter: props.isFromDashBoard == true ? "" : "Current", provider: "", providerName: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString(), isFromDashBoard: (props.isFromDashBoard == true).toString() });
    //
    const [resultDialogState, setResultDialogState] = useState(false);
    const [resultDialogStateTitle, setResultDialogStateTitle] = useState("Add Manual Test Result");
    const [isGridUpdate, setIsGridUpdate] = useState(false);
    const gridUpdate = () => setIsGridUpdate(!isGridUpdate);
    const [allTasksSearchList, setAllTasksSearchList] = useState([]);
    const [allStatusList, setAllStatusList] = useState([]);
    const [allProviders, setAllProviders] = useState([]);
    const [labOrderId, setLabOrderId] = useState(0);
    const [locationId, setLocationId] = useState(0);

    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);

    const [dataIdEdit, setDataIdEdit] = useState(0);

    //

    useEffect(() => {
        debugger;
        setIntialValues();

        var params = {
            code: "DDL_List_Item",
            parameters: ['task_type_option_code', 'task_status_option_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _taskTypeOptionCode = [];
                var _taskStatusOptionCode = [];

                result.data.map((item, i) => {

                    if (item.text3 == 'task_type_option_code') {
                        if (item.text1 == "Lab_Order_Results")
                            item.text2 = "Lab/Imaging Results";
                        _taskTypeOptionCode.push({ value: item.text1, label: item.text2 });
                    }

                    if (item.text3 == 'task_status_option_code')
                        _taskStatusOptionCode.push({ value: item.text1, label: item.text2 });


                });
                setAllTasksSearchList(_taskTypeOptionCode);
                setAllStatusList(_taskStatusOptionCode);
            }
        })

    }, []);



    function setIntialValues() {
        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);
        if (primaryLocation[0]) setLocationId(primaryLocation[0].id);
        var loginUser = JSON.parse(sessionStorage.getItem('user_info')).user;
        filterValues.provider = loginUser.loggedInUserID;
        if (loginUser.isProvider === true)
            filterValues.providerName = loginUser.firstName + ' ' + loginUser.lastName + ' (Provider) ';
        else
            filterValues.providerName = loginUser.firstName + ' ' + loginUser.lastName + ' (Staff) ';
        setResultDialogStateTitle("Add Manual Test Result");
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
        setLabOrderId(0);
        id = parseFloat(id);
        // setIsReadOnly(false);

        if (moduleCode === 'Patient') {
            setDataIdEdit(taskId);
            setDemographicsDialogOpenClose(true)
        } else if (action == 'Review') {         
            setLabOrderId(id);
            setResultDialogState(true);
            setResultDialogStateTitle("Review Manual Test Result");
            //setDialogState(true);
        } else if (action == 'Demographics') {

        }
    }



    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const allDateFiltersList = [

        { label: "All", value: "" },
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

    function addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date.toISOString().split('T')[0];
    }

    function addDays(date, days) {

        // date.addDays(days);
        return date.toISOString().split('T')[0];
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

            case "":
                setFilterValue(prevState => ({
                    ...prevState,
                    dateValue: '',
                    dateFilter: dateValue
                }));
                break;
        }

    }

    function resetAllFilters() {
        setFilterValue({
            taskType: "Lab_Order_Results", status: "", dateFilter: props.isFromDashBoard == true ? "" : "Current", provider: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString(), isFromDashBoard: (props.isFromDashBoard == true).toString()
        });
    }


    const handleSearcdhListProviderStaffChange = (name, item) => {

        const { id, value } = item;

        setFilterValue(prevState => ({
            ...prevState,
            provider: id,
            providerName: value
        }))
    }

    const closeResultDialog = () => {
        setResultDialogState(false);
        setResultDialogStateTitle("Add Manual Test Result");
        setLabOrderId(0);
    }
    const gridUpdateS = () => {

        gridUpdate();

    }
    return (
        <>
            {resultDialogState ?
                <AddResultDialog
                    isEditable={props.isEditable}
                    dialogOpenClose={resultDialogState}
                    // dataIdEdit={dataIdEdit}
                    handleClose={() => closeResultDialog()}
                    // isView={isView}
                    // readOnlyAssignTo={readOnlyAssignTo}
                    // readOnly={readOnly}
                    // isViewLabel={isViewLabel}
                    labOrderId={labOrderId}
                    resultDialogStateTitle={resultDialogStateTitle}
                    updateGrid={() => gridUpdateS()}
                />
                : null}
            <div className={classes.allTasksCard}>
                <div className={classes.allTasksInnerCard}>
                    <div className={classes.allTasksFilterArea}>
                        <Grid container lg={12} spacing={1} direction="row" justify="center">
                            <FormGroupTitle>Lab Results </FormGroupTitle>
                        </Grid>
                        <Grid container lg={12} spacing={1} direction="row" justify="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <span className={classes.controlContainer}>
                                    <Button
                                        size="small"
                                        className={classes.newAddBtn2}
                                        onClick={() => setResultDialogState(true)}
                                        disabled={!props.isEditable}
                                    >+ Add New
                                    </Button>

                                </span>
                            </Grid>
                        </Grid>
                        <Grid container lg={12} spacing={1} direction="row" justify="center">
                            <Label title="Filters" size={1} />

                            <Grid item xs={12} sm={3} md={2} lg={2} xl={2} >
                                <SelectField
                                    name="taskType"
                                    id="taskType"
                                    value={filterValues.taskType}
                                    options={allTasksSearchList}
                                    placeholder="Select Filters"
                                    onChange={handleChange}
                                    disabled
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
                                />
                            </Grid>

                            {/*  <Grid item xs={0} sm={0} md={1} lg={1} xl={1} />*/}


                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                <FormBtn id="reset" size="medium" onClick={resetAllFilters}>
                                    Reset Filters
                                </FormBtn >
                            </Grid>

                        </Grid>
                    </div>
                    <TaskGrid
                        code="LabResult"
                        rowClick={getId}
                        apiUrl="task/loadTaskGrid"
                        searchShowHide={false}
                        filterValues={filterValues}
                        actionClick={(taskId, action, id, moduleCode) => handleActionChange(taskId, action, id, moduleCode)}
                        filterByTask={props.filterByTask}
                        update={isGridUpdate}
                    />
                </div>
            </div>

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


            {/*
                dialogState ?
                    <LabResultDetails dialogOpenClose={dialogState} handleClose={() => setDialogState(false)} labOrderId={labOrderId} />
                    : ""  */}
        </>
    )
}

export default LabResults
