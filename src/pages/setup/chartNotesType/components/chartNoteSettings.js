import React, { useState, useEffect, useRef } from "react";

import {
    Container,
    Button,
    Grid,
    Switch,
    Tooltip
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InputBaseField, SelectField, CheckboxField } from "../../../../components/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import useStyles from "./styles";
import { FormBtn } from "../../../../components/UiElements";

function ChartNoteSetting({ handleSaveResponse, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [chartNoteId, setChartNoteId] = useState(0);
    const [rowsData, setRowData] = useState([]);
    const [chartTypePermission, setChartTypePermission] = useState([]);

    const [expendState, setExpendState] = useState(false)
    const [expendIndex, setExpendIndex] = useState([])

    const save = () => {
        setIsLoading(true);
        PostDataAPI("chartnotecomponent/add", rowsData, true).then((result) => {
            setIsLoading(false);
            if (result.success) {
                handleSaveResponse("Setting saved successfully");
            }

        });

    }
    const loadGridData = () => {
        setIsLoading(true);
        const getParams = ['' + props.chartNoteTypeId];
        PostDataAPI("chartnotecomponent/loadGrid", getParams).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setRowData(
                    result.data.map((item, i) => {
                        item.chartNoteTypeId = props.chartNoteTypeId;
                        return { ...item }
                    }));
                //setRowData(result.data);
                // result.data?.filter(subItems => {return subItems.parentId === item.chartNoteComponentId;})
                //setRowData(
                //    result.data?.filter(item => {
                //        return item.parentId === 0;
                //    }).map((item, i) => {
                //        return {
                //            chartNoteComponentId: item.chartNoteComponentId,
                //            componentCode: item.componentCode,
                //            componentName: item.componentName,
                //            hasMinimizeOption: item.hasMinimizeOption,
                //            hasNoShowOption: item.hasNoShowOption,
                //            isMinimized: false,
                //            isNoShow:false,
                //            isDeleted: item.isDeleted,
                //            parentId: item.parentId,
                //            sortOrder: item.sortOrder,
                //            subItems: result.data?.filter(subItems => {
                //                return subItems.parentId === item.chartNoteComponentId;
                //            })
                //        };
                //    })
                //);
            }
        });

    }
    const handleChange = e => {
        const { name, value } = e.target;
        var _index = name.split('_');
        let status = value == "false" ? true : false;
        let updatedList = null;
        if (_index[1] == "0") {
            updatedList = rowsData.map((item, i) => item.chartNoteComponentId == _index[0] ? { ...item, isMinimized: status } : item);
        } else {
            updatedList = rowsData.map((item, i) => item.chartNoteComponentId == _index[0] ? { ...item, isNoShow: status } : item);
        }
        setRowData(updatedList);
    };

    const expendMore = (e, i) => {
        setExpendIndex(i)
        if (expendState === true && expendIndex == i) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    useEffect(() => {
        setChartNoteId(props.chartNoteTypeId);
        loadGridData();
    }, []);
    return (
        <>
            <div className={classes.settingBox}>
                <Grid container direction="row" alignItems="center" >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <b>Encounter Details</b>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.alignRight}>
                        Section Required
                    </Grid>
                </Grid>
            </div>
            {
                rowsData ?
                    rowsData.filter(item => {
                        return item.parentId === 0;
                    }).map((item, i) => (
                        <div className={classes.settingBox}>

                            <Accordion expanded={expendState && expendIndex === i}>
                                <AccordionSummary
                                    expandIcon={rowsData.filter(subItems => { return subItems.parentId === item.chartNoteComponentId; }).length? <ExpandMoreIcon className={classes.expendIcon} onClick={(e) => expendMore(e, i)} />: ''}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Grid container direction="row" alignItems="center" >
                                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <b>{item.componentName}</b>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.alignRight}>
                                            {item.hasMinimizeOption ? <CheckboxField
                                                color="primary"
                                                id={item.chartNoteComponentId}
                                                name={item.chartNoteComponentId + "_" + 0}
                                                value={item.isMinimized}
                                                checked={item.isMinimized}
                                                onChange={handleChange}
                                                label="Minimize by default"
                                            /> : ''}
                                            {item.hasNoShowOption ? <CheckboxField
                                                color="primary"
                                                id={item.chartNoteComponentId}
                                                name={item.chartNoteComponentId + "_" + 1}
                                                value={item.isNoShow}
                                                checked={item.isNoShow}
                                                onChange={handleChange}
                                                label="Show Section"
                                            /> : ''}

                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <hr></hr>

                                {rowsData.filter(subItems => { return subItems.parentId === item.chartNoteComponentId; }).map((subItem, j) => (
                                    <> <AccordionDetails>
                                        <Grid container direction="row" alignItems="center" >
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                {subItem.componentName}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.alignRight}>
                                                {subItem.hasMinimizeOption ? <CheckboxField
                                                    color="primary"
                                                    id={subItem.chartNoteComponentId}
                                                    name={subItem.chartNoteComponentId}
                                                    value={subItem.isMinimized}
                                                    checked={subItem.isMinimized}
                                                    onChange={handleChange}
                                                    label="Minimize by default"
                                                /> : ''}
                                                {subItem.hasNoShowOption ? <CheckboxField
                                                    color="primary"
                                                    id={subItem.chartNoteComponentId}
                                                    name={subItem.chartNoteComponentId}
                                                    value={subItem.isNoShow}
                                                    checked={subItem.isNoShow}
                                                    onChange={handleChange}
                                                    label="Show Section"
                                                /> : ''}

                                            </Grid>
                                        </Grid>
                                    </AccordionDetails></>
                                ))}
                            </Accordion>
                        </div>
                    ))
                    : null
            }

            <FormBtn id="save" onClick={save} size="medium" disabled={isLoading}>Save</FormBtn>
        </>
    )
}
export default ChartNoteSetting;