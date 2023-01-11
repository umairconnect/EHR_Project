import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import { Grid, Button, Typography, FormLabel, Switch } from "@material-ui/core";
import { DragHandle } from "@material-ui/icons"
//components
import TaskGrid from "../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn } from '../../../../components/UiElements/UiElements';
import { SelectField } from '../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
function Settings(props) {
    var classes = useStyles();
    const [dragId, setDragId] = useState();
    const [boxes, setBoxes] = useState([]);

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        var data = {}
        PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
            if (result) {
                setBoxes(result.data);
            }
        })
    }

    const handleChange = (i, e) => {

        const { name, checked } = e.target;
        let items = [...boxes];
        items[i].isActive = checked;
        // items[i].isActive = !items[i].isActive;
        setBoxes(items);

        var arr = new Array();
        arr.push(items[i]);

        PostDataAPI("task/settings/updateSettings", arr).then((result) => {
            if (result && result.success == false) {
                loadData();
                props.update();
            }
        })
        props.update();
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
        props.update();
        setBoxes(newBoxState);
        //}

        PostDataAPI("task/settings/updateSettings", newBoxState).then((result) => {
            if (result && result.success == false) {
                loadData();
            }
        })
    };
    const CustomTaskSwitch = ({ id, name, checked, value, handleSwitchChange, ...props }) => {
        return <Switch
            focusVisibleClassName={classes.settingSwitchFocusVisible}
            disableRipple
            classes={{
                root: classes.settingSwitchRoot,
                switchBase: classes.settingSwitchBase,
                thumb: classes.settingSwitchThumb,
                track: classes.settingSwitchTrack,
                checked: classes.settingSwitchChecked,
            }}
            name={name}
            id={id}
            checked={checked ? true : false}
            onChange={handleSwitchChange}
            {...props}
        />
    }
    return (
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
                                .map((box, i) =>
                                    <div key={i} className={classes.settingBox}>
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
                                        <CustomTaskSwitch
                                            name={box.taskTypeCode}
                                            id={box.taskTypeCode}
                                            checked={box.isActive}
                                            handleSwitchChange={(e) => handleChange(i, e)}
                                            {...props}
                                        />
                                    </div>
                                ) : null}
                        </div>
                    </Grid>

                </div>
            </div >
        </div >
    )
}

export default Settings
