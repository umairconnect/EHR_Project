import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import { Grid, Button } from "@material-ui/core"
//components
import TaskGrid from "../../../../components/TaskGrid/ReFillRequestGrid";
import { FormGroupTitle, Label, FormBtn } from '../../../../components/UiElements/UiElements';
import { SelectField } from '../../../../components/InputField/InputField';
import RefillRequestDetails from './component/RefillRequestDetails';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import SearchList from "../../../../components/SearchList/SearchList";

function RefillRequests({ ...props }) {
    var classes = useStyles();

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);

    const [allTasksSearchList, setAllTasksSearchList] = useState([]);
    const [allStatusList, setAllStatusList] = useState([]);
    const [dataIdEdit, setDataIdEdit] = useState(0);
    const [dataIdEditTask, setDataIdEditTask] = useState(0);
    const [medRequestRefillId, setMedRequestRefillId] = useState(0);
    const [isGridUpdate, setIsGridUpdate] = useState(false);
    const [state, setState] = useState({});
    const [dialogState, setDialogState] = useState(false);
    const [allProviders, setAllProviders] = useState([]);
    const [refillStatus, setRefillStatus] = useState("");
    const [refillCompletedView, setRefillCompletedView] = useState(false);

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const [filterValues, setFilterValue] = useState({ taskType: "Re_fill_Requests", status: "", dateFilter: "Current", provider: "", providerName: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString() });
    const [locationId, setLocationId] = useState(0);




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

    const gridUpdate = () => setIsGridUpdate(!isGridUpdate);

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

    function setIntialValues() {
        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);
        if (primaryLocation[0]) setLocationId(primaryLocation[0].id);
    }

    function resetAllFilters() {
        setFilterValue({
            taskType: "Re_fill_Requests", status: "", dateFilter: "Current", provider: "", userId: userInfo.userID, dateValue: addDays(new Date(), 0).toString()
        });
    }

    useEffect(() => {
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

                    if (item.text3 == 'task_type_option_code')
                        _taskTypeOptionCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'task_status_option_code')
                        _taskStatusOptionCode.push({ value: item.text1, label: item.text2 });


                });
                setAllTasksSearchList(_taskTypeOptionCode);
                setAllStatusList(_taskStatusOptionCode);
            }
        })

    }, []);

    const handleActionChange = (id, taskId, action, sendRxId, statusCode) => {

        setDataIdEdit(0);
        setMedRequestRefillId(0);
        //sendRxId = 0;
        setRefillStatus("");

        if (action == 'Review' || action == 'Assign To' || action == 'Open') {


            setDataIdEdit(sendRxId);
            setDataIdEditTask(taskId);
            setMedRequestRefillId(parseFloat(id));
            setDialogState(true);
            setRefillStatus(action);
            sendRxId = parseFloat(sendRxId);

        }
        else if (action == 'Completed-View') {
            setDataIdEdit(sendRxId);
            setDataIdEditTask(taskId);
            setMedRequestRefillId(parseFloat(id));
            setDialogState(true);
            setRefillStatus("Completed");
            sendRxId = parseFloat(sendRxId);
            setRefillCompletedView(true);
        }
    }

    const handleSearcdhListProviderStaffChange = (name, item) => {

        const { id, value } = item;

        setFilterValue(prevState => ({
            ...prevState,
            provider: id,
            providerName: value
        }))
    }


    return (
        <>
            <div className={classes.allTasksCard}>
                <div className={classes.allTasksInnerCard}>
                    <div className={classes.allTasksFilterArea}>
                        <Grid container lg={12} spacing={3} direction="row" justify="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormGroupTitle>Refill Requests</FormGroupTitle>
                            </Grid>
                            {/* <Grid item xs={12} sm={1} md={1} lg={1} xl={1}> */}
                            {/* <Button
                            size="small"
                            className={classes.newAddBtn2}
                            onClick={() => alert('add new')}
                        >+ Add New
                        </Button> */}
                            {/* </Grid> */}
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
                            {/*      <Grid item xs={0} sm={0} md={1} lg={1} xl={1} />*/}


                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                <FormBtn id="reset" size="medium" onClick={resetAllFilters}>
                                    Reset Filters
                                </FormBtn >
                            </Grid>

                        </Grid>
                    </div>
                    <TaskGrid
                        code="RefillRequests"
                        rowClick={getId}
                        searchShowHide={false}
                        filterValues={filterValues}
                        apiUrl="task/loadTaskGrid"
                        update={isGridUpdate}
                        actionClick={(id, taskId, action, sendRxId) => handleActionChange(id, taskId, action, sendRxId)}
                        filterByTask={props.filterByTask}
                    />

                </div>
            </div>

            <RefillRequestDetails dialogOpenClose={dialogState} handleClose={() => setDialogState(false)} dataIdEdit={dataIdEdit} dataIdEditTask={dataIdEditTask} medicationRefillId={medRequestRefillId} updateGrid={() => gridUpdate()} refillStatus={refillStatus} refillCompletedView={refillCompletedView} />

        </>
    )
}

export default RefillRequests
