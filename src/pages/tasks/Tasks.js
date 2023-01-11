import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useStyles from "./styles";
import { Tab, Tabs, Grid, Typography, FormLabel, Switch } from '@material-ui/core';

import { useLocation } from "react-router-dom";

import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";
import { PostDataAPI } from '../../Services/PostDataAPI';
import { FormGroupTitle } from '../../components/UiElements/UiElements';
import { DragHandle } from "@material-ui/icons"

import PageTitle from "../../components/PageTitle";
import AllTasks from './component/alltasks/AllTasks';
import LabResults from './component/labResults/LabResults';
import RefillRequests from "./component/refillRequests/RefillRequests";
import { SelectField } from "../../components/InputField";
import ControlledSubstancesTasks from "./component/controlledSubstancesTasks/ControlledSubstancesTasks";
import { withStyles } from '@material-ui/core/styles';
import { IsEditable } from '../../Services/GetUserRolesRights';
import Documents from './component/documentsToSign/Documents';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
function Tasks(props) {
    var classes = useStyles();
    const [dataId, setDataId] = useState(1);
    const [settingIndex, setSettingIndex] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [value, setValue] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const location = useLocation();

    //
    const [dragId, setDragId] = useState();
    const [boxes, setBoxes] = useState([]);

    const [state, setState] = useState({});
    //
    const handleChange = (event, newValue) => {
        if (location.state) {
            location.state.name = false;
            location.state.isFromDashBoard = false;
            location.state.myTasks = false;
            location.state.toDocumentSign = false;
            location.state.refilRequest = false;
        }
        setValue(newValue);
        // setIsUpdate(!isUpdate);
    };
    let objUser = JSON.parse(sessionStorage.getItem('user_info'));

    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();
    const [isEditable, setIsEditable] = useState(IsEditable("Tasks"));



    const [taskSettingOptions, setTaskSettingOptions] = useState([{ value: true, label: 'Active' }, { value: false, label: 'Un-Active' }]);

    useEffect(() => {
        loadSettingsData();
        loadData();
        if (isSidebarOpened) {
            toggleSidebar(layoutDispatch);
        }

      
        return () => { setValue('') }
    }, [isUpdate]);

    useEffect(() => {

        if (location.state && location.state.name === true) {

            setValue("labResults");
        }

        if (location.state && location.state.refilRequest === true) {
            setValue("refillRequests")
        }

        if (location.state && location.state.myTasks === true) {
            setValue("myTasks")
        }

        if (location.state && location.state.toDocumentSign === true) {
            setValue("documentToSign")
        }

    });


    const loadData = () => {
        var data = {}
        PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
            if (result) {
                setTasks(result.data);
                let activeTasks = result.data.filter(item => item.isActive);
                if (activeTasks != undefined && activeTasks.length > 0) {
                    if (value == "") {
                        setValue(activeTasks[0].taskTypeCode)
                    } else { setValue(value) }

                } else {
                    setValue("settings")
                }

            }


        })
    }
    //Settings
    const loadSettingsData = () => {
        var data = {}
        PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
            if (result) {
                setBoxes(result.data);
            }
        })
    }
    const handleSettingsChange = (i, e) => {

        const { name, checked } = e.target;
        let items = [...boxes];
        items[i].isActive = checked;
        // items[i].isActive = !items[i].isActive;
        setBoxes(items);

        var arr = new Array();
        arr.push(items[i]);

        PostDataAPI("task/settings/updateSettings", arr).then((result) => {
            if (result && result.success == true) {
                setIsUpdate(!isUpdate);
            }
        })
    }
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };
    const handleDrop = (ev) => {
        var dragBoxOrder; var dropBoxOrder;
        const dragBox = boxes.find((box) => box.taskTypeCode === dragId);
        const dropBox = boxes.find((box) => box.taskTypeCode === ev.currentTarget.id);

        if (dragBox != undefined || dragBox != null) { dragBoxOrder = dragBox.order; }
        if (dropBox != undefined || dropBox != null) { dropBoxOrder = dropBox.order; }

        const newBoxState = boxes.map((box, i) => {

            if (box.taskTypeCode === dragId) {
                box.order = dropBoxOrder;
                // dropBox.order=drag
            }
            else if (box.order >= dropBoxOrder && box.order < dragBoxOrder) {

                box.order += 1;
            }
            else if (box.order <= dropBoxOrder && box.order > dragBoxOrder) {

                box.order -= 1;
            }
            return box;
        });
        // setBoxes(newBoxState);
        //}

        PostDataAPI("task/settings/updateSettings", newBoxState).then((result) => {
            if (result && result.success == true) {
                setIsUpdate(!isUpdate);
                // loadSettingsData();
            }
        })
    };
    //
    const CustomTaskSwitch = ({ id, name, checked, value, handleSwitchChange, ...props }) => {
        return <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            name={name}
            id={id}
            checked={checked ? true : false}
            onChange={handleSwitchChange}
            {...props}
        />
    }
    const IOSSwitch = withStyles((theme) => ({
        root: {
            width: 47,
            height: 22,
            padding: 0,
            zIndex: 1000,
            // left:85,
            // marginTop: 14,
            // margin: "14px 10px 0px 0px"
            margin: "14px 0px 0px 15%",
            "& Mui-disabled": {
                color: '#bdbdbd !important',
            },
            "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.12
            },
            "& .MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track": {
                backgroundColor: "#000"
            },
            "& .MuiSwitch-colorSecondary.Mui-disabled": {
                color: '#bdbdbd'
            }
        },
        switchBase: {
            padding: 1,
            zIndex: 1000,
            transform: 'translateX(-8px)',
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#00B2E3',
                    opacity: 1,
                    border: 'none',
                },
                "&:disabled": {
                    color: '#bdbdbd !important',
                }
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
            },
            "&:disabled": {
                color: '#bdbdbd !important',
            }
        },
        thumb: {
            width: 19,
            height: 19,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: "#C4C4C4",
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
            "&:disabled": {
                backgroundColor: '#000 !important',
                opacity: "0.12 !important",

            }
        },
        checked: {},
        focusVisible: {},
    }))(({ id, name, checked, value, handleSwitchChange, disabled, classes, ...props }) => {
        return (
            <Switch
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                }}
                name={name}
                id={id}
                disabled={disabled}
                checked={checked ? true : false}
                onChange={handleSwitchChange}
                {...props}
            />
        );
    });
    return (
        <>
            {dataId > 0 ?
                <PageTitle title="Tasks" /> : ""
            }

            <div className={classes.taskFlexBox}>
                {dataId > 0 ? (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.taskTabs}
                    >
                        {
                            tasks.filter(task => task.isActive === true).sort((a, b) => a.order - b.order).map((item, i) => {
                                return <Tab value={item.taskTypeCode} key={i} label={item.taskTypeName} {...a11yProps(item.order)} />
                            })
                        }
                        <Tab value="settings" label="Settings" {...a11yProps(settingIndex)} />
                    </Tabs>) : ""
                }
                <div className={classes.taskContentArea}>

                    {
                        tasks.filter(task => task.isActive === true).sort((a, b) => a.order - b.order).map((item, i) => {

                            return (
                                item.taskTypeCode == "allTasks" && value == item.taskTypeCode ?
                                    <TabPanel key={item.order} value={item.order} index={item.order}>
                                        <AllTasks title="All Tasks" dataId={dataId} filterByTask={""} isEditable={isEditable} />
                                    </TabPanel> :
                                    item.taskTypeCode == "myTasks" && value == item.taskTypeCode ?
                                        (<TabPanel key={item.order} value={item.order} index={item.order}>
                                            <AllTasks title="My Tasks" dataId={dataId} filterByTask={"userId"} isEditable={isEditable} />
                                        </TabPanel>) :
                                        item.taskTypeCode == "unassignedTasks" && value == item.taskTypeCode ?
                                            (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                <AllTasks title="Unassigned Tasks" dataId={dataId} filterByTask={"unassigned"} isEditable={isEditable} />
                                            </TabPanel>) :
                                            item.taskTypeCode == "assignedTasks" && value == item.taskTypeCode ?
                                                (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                    <AllTasks title="Assigned Tasks" dataId={dataId} filterByTask={"assigned"} isEditable={isEditable} />
                                                </TabPanel>) :
                                                item.taskTypeCode == "labOrders" && value == item.taskTypeCode ?
                                                    (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                        <AllTasks title="Lab Orders" dataId={dataId} order={"Lab_Orders"} isEditable={isEditable} />
                                                    </TabPanel>) :
                                                    item.taskTypeCode == "labResults" && value == item.taskTypeCode ?
                                                        (<TabPanel key={item.order} value={item.order} index={item.order} >
                                                            <LabResults dataId={dataId} filterByTask={""} isEditable={isEditable} isFromDashBoard={location?.state?.isFromDashBoard} />
                                                        </TabPanel>) :
                                                        item.taskTypeCode == "encounters" && value == item.taskTypeCode ?
                                                            (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                                <AllTasks title="Encounters" dataId={dataId} filterByTask={"encounter"} isEditable={isEditable} />
                                                            </TabPanel>) :
                                                            item.taskTypeCode == "refillRequests" && value == item.taskTypeCode ?
                                                                (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                                    <RefillRequests title="Refill Requests" dataId={dataId} filterByTask={""} isEditable={isEditable} />
                                                                </TabPanel>) :
                                                                item.taskTypeCode == "reminders" && value == item.taskTypeCode ?
                                                                    (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                                        <AllTasks title="Reminders" dataId={dataId} filterByTask={"Reminders"} isEditable={isEditable} />
                                                                    </TabPanel>) :
                                                                    item.taskTypeCode == "ePrescription" && value == item.taskTypeCode ?
                                                                        (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                                            <ControlledSubstancesTasks title="Controlled Substances" dataId={dataId} isEditable={isEditable} />
                                                                        </TabPanel>) : item.taskTypeCode == "documentToSign" && value == item.taskTypeCode ?
                                                                            (<TabPanel key={item.order} value={item.order} index={item.order}>
                                                                                <Documents title="Documents to Sign" dataId={dataId} isEditable={isEditable} />
                                                                            </TabPanel>):""
                            )
                        })
                    }
                    {value == "settings" ?
                        < TabPanel value={settingIndex} index={settingIndex}>
                            <div className={classes.allTasksCard}>
                                <div className={classes.allTasksInnerCard}>
                                    <div className={classes.allTasksFilterArea}>

                                        <Grid container direction="row" justify="center">
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <FormGroupTitle>Settings</FormGroupTitle>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" justify="center">
                                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography className={classes.settingHeading}>Customize Task View</Typography>
                                            </Grid>
                                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography className={classes.settingInfo}>Customize the way you want to view your tasks.
                                                    Show/hide your task tabs or change their display order.</Typography>
                                                {/* <Typography className={classes.settingInfo}>Configure the tab you would like to display
                                for your tasks, You can also reload the tabs.</Typography> */}
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3} direction="row" justify="center">
                                            <div className={classes.settingContainer}>
                                                <div className={classes.settingHeadingBox}>
                                                    <FormLabel className={classes.settingHeadingTitle}>Task Type</FormLabel>
                                                    <FormLabel className={classes.settingHeadingSwitchTitle}>Display as tab</FormLabel>
                                                </div>
                                                {boxes && boxes.length > 0 ? boxes
                                                    .sort((a, b) => a.order - b.order)
                                                    .map((box, i) => {

                                                        if (!box.isAdmin || (box.isAdmin == true && objUser.user.roleName == 'Administrator')) {

                                                            return <div key={i} className={classes.settingBox}>
                                                                <div
                                                                    draggable={true}
                                                                    key={box.taskTypeCode}
                                                                    id={box.taskTypeCode}
                                                                    onMouseDown={handleDrag}
                                                                    onDragStart={handleDrag}
                                                                    onDrop={handleDrop}
                                                                    onDragOver={(ev) => ev.preventDefault()}
                                                                    style={{ display: "flex", cursor: "move" }}
                                                                >
                                                                    <DragHandle className={classes.dragIcon} />
                                                                    <FormLabel className={classes.itemTitle}>{box.taskTypeName}</FormLabel>
                                                                </div>
                                                                <IOSSwitch
                                                                    name={box.taskTypeCode}
                                                                    id={box.taskTypeCode}
                                                                    checked={box.isActive}
                                                                    disabled={!isEditable}
                                                                    // handleSwitchChange={(e) => handleChange(i, e)}
                                                                    handleSwitchChange={(e) => handleSettingsChange(i, e)}
                                                                />


                                                            </div>

                                                        }
                                                    }
                                                    ) : null}
                                            </div>
                                        </Grid>

                                    </div>
                                </div >
                            </div >
                            {/* <Settings dataId={dataId} update={updateTask} /> */}
                        </TabPanel>
                        : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Tasks
