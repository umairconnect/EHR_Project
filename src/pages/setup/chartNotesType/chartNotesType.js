import React, { useState, useEffect, useRef } from "react";

import {
    Container,
    Button,
    Grid,
    Switch,
    Tooltip
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import PageTitle from '../../../components/PageTitle';
import { Table, Row, Empty } from "antd";
import EditIcon from '../../../images/icons/erase.png';
import Delete from "../../../images/icons/trash.png"
import SettingIcon from '../../../images/BtnIcon.png'
import blueTick from "../../../images/icons/blueTick.png";

import { PostDataAPI } from '../../../Services/PostDataAPI';
import { SelectField, CheckboxField } from "../../../components/InputField/InputField";

import AddChartNoteType from './components/addChartNoteType'
import ChartNoteSettings from './components/chartNoteSettings'

import { withSnackbar } from '../../../components/Message/Alert'
import { data as gridCnfg2 } from '../../../components/SearchGrid/component/setupData';
import useStyles from "./styles";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import SummaryOption from './../../../pages/encounter/components/summaryOptions/SummaryOptions';
import { IsEditable } from '../../../Services/GetUserRolesRights';

function ChartNotesType({ ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("ChartNotesType"));
    const [rowsData, setRowData] = useState([]);
    const [chartNoteId, setChartNoteId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const history = useHistory();
    const [providerId, setProviderId] = useState(0);
    const [encounterTypeId, setEncounterTypeId] = useState(0);
    const [encComponents, setEncComponents] = useState([]);
    const [showHideSummaryOptionDialog, setShowHideSummaryOptionDialog] = useState(false);
    const [updateSummaryId, setUpdateSummaryId] = useState(false);
    const [settingPage, setSettingPage] = useState(false);

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

    const [chartNoteDialog, setChartNoteDialog] = useState(false)

    function handleEdit(item) {
        setChartNoteId(item.chartNoteTypeId);
        openchartNoteDialog();
    }
    function handleDelete(item) {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {
            setIsLoading(true);
            var params = {
                chartNoteTypeId: item.chartNoteTypeId
            }
            PostDataAPI("chartnotetype/delete", params, true).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    closechartNoteDialog();
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    loadGridData();
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        });
    }

    const loadGridData = () => {
        setIsLoading(true);
        PostDataAPI("chartnotetype/loadGrid", null).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setRowData(
                    result.data?.map((item, i) => {
                        item.isDefault = item.isDefault ? <img src={blueTick} style={{ marginLeft: "10px" }} /> : ''
                        item.chartNoteType = item.type
                        item.chartNoteformat = item.chartNoteFormatCode
                        item.isActive = item.isActive ? "Active" : "In Active"
                        item.action =
                            <Row type="flex" justify="center" align="middle">
                                <Tooltip title="Edit">
                                    <img src={EditIcon}
                                        className={classes.icons} onClick={() => handleEdit(item)} />
                            </Tooltip>
                            {isEditable ? <Tooltip title="Delete">
                                <img src={Delete}
                                    className={classes.icons}
                                    onClick={() => handleDelete(item)}
                                />
                            </Tooltip>:''}
                                
                                <Tooltip title="Setting">
                                    <img src={SettingIcon}
                                        className={classes.icons}
                                        onClick={() => openEncounterSettingDialog(item)}
                                    />
                                </Tooltip>


                            </Row>
                        return { ...item }
                    }))
            }

        });

    }
    const backTolist = () => {
        setChartNoteId(0);
        setSettingPage(false)
    }
    const openchartNoteDialog = () => {
        setChartNoteDialog(true)
    }
    const closechartNoteDialog = () => {
        setChartNoteId(0);
        setChartNoteDialog(false)
    }
    const handleSaveResponse = (message) => {
        showMessage("Success", message, "success", 2000);
        closechartNoteDialog();
        setSettingPage(false)
        loadGridData();
    }

    function handleSetting(item) {
        setChartNoteId(item.chartNoteTypeId);
        setSettingPage(true)
    }

    const openEncounterSettingDialog = (item) => {
        setChartNoteId(item.chartNoteTypeId);
        setShowHideSummaryOptionDialog(true);
    }
    const closeEncounterSettingDialog = () => {
        setChartNoteId(0);
        setShowHideSummaryOptionDialog(false);
    }

    const saveSummaryOptions = (itemsList) => {
        setEncComponents(itemsList);
        //setShowHideSummaryOptionDialog(false);
    }


    useEffect(() => {
        loadGridData();
    }, []);

    return (
        <>
            {settingPage ?
                <PageTitle title="SOAP Note Display Setting" button={
                    <>
                        <Button
                            size="small"
                            id="btnIdGetPayers"
                            className={classes.newAddBtn}
                            onClick={backTolist}
                            startIcon={< ArrowBackIosIcon />}>
                            Back to List
                        </Button>

                    </>
                }></PageTitle>
                :
                <PageTitle title="Chart Note Type" button={
                    <>
                        <Button
                            size="small"
                            id="btnIdGetPayers"
                            className={classes.newAddBtn}
                            onClick={() => { history.goBack(); }}
                            startIcon={< ArrowBackIosIcon />}>
                            Back to Setup
                        </Button>

                    </>
                }></PageTitle>
            }



            <Container maxWidth={false}>

                <Grid container direction="row" alignItems="baseline">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                        {settingPage ?
                            <p>Customize your chart note view for all patients by modifying the display settings below.</p>
                            : <Button size="small" className={classes.newAddBtn2} onClick={openchartNoteDialog} disabled={!isEditable}>+ Add New </Button>
                        }

                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.textRight}>

                    </Grid>
                </Grid>
                {showHideSummaryOptionDialog ?
                    <SummaryOption
                        showHideDialog={showHideSummaryOptionDialog}
                        handleClose={() => closeEncounterSettingDialog()}
                        saveSummary={(itemorderState, itemLeftList, itemRightList, itemsState) => saveSummaryOptions(itemorderState, itemLeftList, itemRightList, itemsState)}
                        updateSummary={updateSummaryId}
                        providerId={providerId}
                        encounterTypeId={chartNoteId}
                        isEditable={ isEditable}
                        soapComponents={''} /> :
                    ''}
                {
                    settingPage ?
                        <ChartNoteSettings chartNoteTypeId={chartNoteId} handleSaveResponse={handleSaveResponse} /> :
                        <Grid container direction="row" >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="custom-grid">
                                    <Table
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={rowsData}
                                        columns={gridCnfg2["ChartNotesType"]}
                                    />
                                </div>


                            </Grid>
                        </Grid>
                }
                <br></br>
            </Container>
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
            {chartNoteDialog ?
                <AddChartNoteType chartNoteId={chartNoteId} openchartNoteDialog={openchartNoteDialog} closechartNoteDialog={closechartNoteDialog}
                    handleSaveResponse={handleSaveResponse} handleDelete={handleDelete} isEditable={isEditable}></AddChartNoteType> :
                ''}

        </>
    )

}
export default withSnackbar(ChartNotesType);