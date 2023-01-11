import React, { useState, useEffect } from "react";
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper, Switch, FormControlLabel
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../Services/PostDataAPI';



function SummaryOptionsDialog({ soapComponents, showHideDialog, handleClose, ...props }) {
    // handle styles
    const classes = useStyles();
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(props.isEditable);
    const [dragId, setDragId] = useState();
    const [boxes, setBoxes] = useState([]);
    const [encounterTypeId] = useState(0);
    const [encounterType, setEncounterType] = useState(false);
    const handleChange = (e, i) => {
        const { name, checked } = e.target;
        let items = [...boxes];
        items.map((item, index) => {
            if (name == item.componentCode) {
                item.isActive = checked;
                return { ...item }
            }
        })
        setBoxes(items);
    }
    const handleHistoryChange = (e, i) => {
        const { name, checked } = e.target;
        let items = [...boxes];
        items.map((obj, index) => {
            if (name == obj.componentCode) {
                obj.isActive = checked;
                obj.childs.map(item => {
                    item.isActive = checked
                    return { ...item }
                });
                //if (checked == false) {
                //    obj.childs.map(item => {
                //        item.isActive = false
                //        return { ...item }
                //    });
                //} else {
                //    obj.childs.map(item => {
                //        item.isActive = true
                //        return { ...item }
                //    });
                //}
                return { ...obj }
            }
        });
        setBoxes(items);
    }
    const handleHistoryChildChange = (e, i) => {
        const { name, checked } = e.target;
        let items = [...boxes];
        let parentId = 0;
        let atLeastOneIsActive = false;
        items.map((obj, index) => {

            obj.childs.map(item => {
                if (item.componentCode == name) {
                    parentId = item.parentId;
                    item.isActive = checked
                    return { ...item }
                }
            })
            return { ...obj }

        });

        items.map((obj, index) => {
            obj.childs.map(item => {
                if (item.parentId == parentId && item.isActive) {
                    atLeastOneIsActive = true;
                }
            })
        });

        let updatedList = items.map((item, i) => item.encounterComponentId == parentId ? { ...item, isActive: atLeastOneIsActive } : item);
        //let isAtleastOneIsChecked = items.filter(item => item.parentId == componentToUpdate.parentId)
        setBoxes(updatedList);
    }
    //Drag Events
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };
    const handleDrop = (ev) => {
        var dragBoxOrder; var dropBoxOrder;
        const dragBox = boxes.find((box) => box.componentCode === dragId);
        const dropBox = boxes.find((box) => box.componentCode === ev.currentTarget.id);

        if (dragBox != undefined || dragBox != null) { dragBoxOrder = dragBox.order; }
        if (dropBox != undefined || dropBox != null) { dropBoxOrder = dropBox.order; }

        // if ((dragBox.alignment == "left" && dropBox.alignment == "right") || (dragBox.alignment == "right" && dropBox.alignment == "left")) {
        //     if (dragBox.alignment == "left") {
        //         const newList = [...boxes];
        //         let objIndex = newList.findIndex((obj => obj.componentCode == dragBox.componentCode));
        //         newList[objIndex].alignment = "right";
        //         setBoxes(newList);

        //     } else if (dragBox.alignment == "right") {
        //         const newList = [...boxes];
        //         let objIndex = newList.findIndex((obj => obj.componentCode == dragBox.componentCode));
        //         newList[objIndex].alignment = "left";
        //         setBoxes(newList);
        //     }
        // }
        const newBoxState = boxes.map((box, i) => {

            if (box.componentCode === dragId) {
                box.order = dropBoxOrder;
            }
            else if (box.order >= dropBoxOrder && box.order < dragBoxOrder) {

                box.order += 1;
            }
            else if (box.order <= dropBoxOrder && box.order > dragBoxOrder) {

                box.order -= 1;
            }
            return box;
        });
        setBoxes(newBoxState);
    };
    const CustomSwitch = ({ id, name, checked, value, handleSwitchChange, ...props }) => {
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

    const save = () => {
        const obj = { lstUserEncounterComponent: boxes, providerId: parseInt(props.providerId), encounterTypeId: parseInt(props.encounterTypeId) };
        PostDataAPI("encountersetting/add", obj, true).then((result) => {
            if (result.success == true) {
                loadEncounterComponents();
                props.saveSummary(boxes);
            }
            else {
                //showMessage("Error", result.message, "error", 3000);
            }
        })
        handleClose();
    };

    const getEncounterType = e => {
     
        var params = {
            code: "get_encounter_type",
            parameters: [props.encounterTypeId + ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.map(item => {
                    if (item.text1 == "SOAP") {
                        setEncounterType(true);
                    } else {
                        setEncounterType(false);
                    }
                })

            }
        });
    }

    const loadEncounterComponents = () => {
        setIsSaveLoading(true);
        const objData = { providerId: parseInt(props.providerId), encounterTypeId: parseInt(props.encounterTypeId) };
        PostDataAPI("encountersetting/loadData", objData).then((result) => {
            setIsSaveLoading(false);
            if (result.success && result.data != null) {
                setBoxes(result.data);
                //props.saveSummary(result.data);
            }
        });
    }
    useEffect(() => {
        console.log(props.isEditable)
        if (parseInt(props.encounterTypeId) > 0) {
            getEncounterType(props.encounterTypeId);
            loadEncounterComponents();
        }
    }, [props.updateSummary, props.providerId, props.encounterTypeId]);
    return (

        <Dialog
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown>
            {/* <Scrollbars autoHeight style={{ maxHeight: "calc(100% - 64px)" }} > */}
            <div className={classes.DialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        {encounterType ?
                            <FormGroupTitle className={classes.lableTitleInput}>SOAP Note Settings</FormGroupTitle>
                            : <FormGroupTitle className={classes.lableTitleInput}>Encounter Settings</FormGroupTitle>
                        }
                    </div>
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={533} style={{ maxHeight: "calc(100% - 64px)", }}>
                            <Grid container direction="row" className={classes.scrollbarContainer}>
                                {/* <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel className={classes.dialogHeading}>Customize your view of patient summary for all patients by  modifying the display settings below </FormLabel>
                                </Grid> */}
                                <Grid item direction="row" xs={6} sm={6} md={6} lg={6} xl={6} >
                                    {boxes.filter(box => box.alignment == "left")
                                        .sort((a, b) => a.order - b.order)
                                        .map((box, i) =>
                                            <div className={classes.historyBox} draggable={true} id={box.componentCode}
                                                onDragOver={(ev) => ev.preventDefault()} onDragStart={handleDrag} onDrop={handleDrop}>
                                                <div className={classes.innerItemBox}>
                                                    <DragHandleIcon className={classes.dragIcon} />
                                                    <FormLabel className={classes.itemTitle}>{box.componentName}</FormLabel>
                                                    <div className={classes.switchRight}>
                                                        <CustomSwitch
                                                            name={box.componentCode}
                                                            id={box.componentCode}
                                                            checked={(box.isActive || box.childs.some(c => c.isActive)) ? true : false}
                                                            handleSwitchChange={(e) => handleHistoryChange(e, i)}
                                                            {...props}
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    box.childs.map(childItem => {
                                                        return <div className={classes.historyItemBox}>
                                                            <FormLabel className={classes.historyitemTitle}>{childItem.componentName}</FormLabel>
                                                            <div className={classes.switchRight}>
                                                                <CustomSwitch
                                                                    name={childItem.componentCode}
                                                                    id={childItem.componentCode}
                                                                    checked={childItem.isActive}
                                                                    handleSwitchChange={(e) => handleHistoryChildChange(e, i)}
                                                                    {...props}
                                                                />
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        )}
                                </Grid>

                                <Grid item direction="row" xs={6} sm={6} md={6} lg={6} xl={6} >
                                    {boxes.filter(box => box.alignment == "right")
                                        .sort((a, b) => a.order - b.order)
                                        .map((box, i) =>
                                            <div className={classes.historyBox} draggable={true} id={box.componentCode}
                                                onDragOver={(ev) => ev.preventDefault()} onDragStart={handleDrag} onDrop={handleDrop}>
                                                <div className={classes.innerItemBox}>
                                                    <DragHandleIcon className={classes.dragIcon} />
                                                    <FormLabel className={classes.itemTitle}>{box.componentName}</FormLabel>
                                                    <div className={classes.switchRight}>
                                                        <CustomSwitch
                                                            name={box.componentCode}
                                                            id={box.componentCode}
                                                            checked={(box.isActive || box.childs.some(c => c.isActive)) ? true : false}
                                                            handleSwitchChange={(e) => handleHistoryChange(e, i)}
                                                            {...props}
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    box.childs.map(childItem => {
                                                        return <div className={classes.historyItemBox}>
                                                            <FormLabel className={classes.historyitemTitle}>{childItem.componentName}</FormLabel>
                                                            <div className={classes.switchRight}>
                                                                <CustomSwitch
                                                                    name={childItem.componentCode}
                                                                    id={childItem.componentCode}
                                                                    checked={childItem.isActive}
                                                                    handleSwitchChange={(e) => handleHistoryChildChange(e, i)}
                                                                    {...props}
                                                                />
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        )}
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <FormBtn id="save" disabled={!isEditable} onClick={save}>Save</FormBtn>
                            <FormBtn id="reset" onClick={handleClose}>Close</FormBtn>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Scrollbars> */}
        </Dialog>
    )

}
export default withSnackbar(SummaryOptionsDialog)
