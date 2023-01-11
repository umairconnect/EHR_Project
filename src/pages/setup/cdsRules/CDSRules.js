import React, { useState, useEffect, useRef } from "react";
//material ui
import {
    Container,
    Button,
    Grid,
    Switch,
    Tooltip
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
//custom components
import PageTitle from '../../../components/PageTitle';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import AddCustomCDS from "./dialog/addCustomCDS";
import { formatDate } from '../../../components/Common/Extensions';
import EditIcon from '../../../images/icons/erase.png';
import { data as gridCnfg2 } from '../../../components/SearchGrid/component/setupData';
import { withSnackbar } from "../../../components/Message/Alert";
import { Table, Empty } from 'antd';
import useStyles from "./styles";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { IsEditable } from '../../../Services/GetUserRolesRights';

function CDSRules({ ...props }) {
    const { showMessage } = props;
    const history = useHistory();
    const SwitchHandle = useRef();
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("CDSRules"));
    
    // code for role rights access : start
    const [cdsRuleList, setCdsRuleList] = useState([]);
    const [customRulesList, setCustomRulesList] = useState([]);
    const [systemWideRulesList, setSystemWideRulesList] = useState([]);
    useEffect(() => {
        loadGridData();
    }, []);

    const [AddCustomCdsPage, setAddCustomCdsPage] = useState(false);
    const AddCustomCds = () => {
        setRuleId(0);
        setAddCustomCdsPage(true);
    }
    const backToCds = (reload) => {
        if (reload == true) {
            loadGridData();
        }
        setAddCustomCdsPage(false);
    }
    const [ruleId, setRuleId] = useState(0);
    const loadCDSRule = (ruleId) => {
        setRuleId(ruleId);
        setAddCustomCdsPage(true);
    }

    const loadGridData = (type) => {
        PostDataAPI("cdsrule/loadGrid", null).then((result) => {
            if (type == 'custom') {
                FillCustomGrid(result.data);
            }
            else if (type == 'syswide') {
                FillSystemWideGrid(result.data);
            }
            else {
                FillCustomGrid(result.data);
                FillSystemWideGrid(result.data);
            }
        });

    }
    const FillCustomGrid = (data) => {
        const lstCustom = data.filter(t => t.isCustom == true).map((item, i) => {
            item.releaseDate = item.releaseDate ? formatDate(item.releaseDate) : '';
            item.active = <Switch classes={{
                root: classes.switchroot,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked
            }}
                inputRef={SwitchHandle}
                label="Active" checked={item.isActive}
                onChange={(e) => { handleChange(e, true) }}
                id={item.ruleId}
                disabled={ !isEditable}
            />

            item.action =  <div style={{ textAlign: "left", paddingLeft: "10px" }}><Tooltip title="Edit"><img src={EditIcon} className={classes.editIcon} alt="Edit" onClick={() => { loadCDSRule(item.ruleId) }} /></Tooltip> </div>;
            return { ...item }
        });
        setCustomRulesList(lstCustom);
    }
    const FillSystemWideGrid = (data) => {

        setSystemWideRulesList(
            data.filter(t => !t.isCustom).map((item, i) => {
                item.releaseDate = item.releaseDate ? formatDate(item.releaseDate) : '';
                item.active = <Switch classes={{
                    root: classes.switchroot,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,

                }}
                    inputRef={SwitchHandle}
                    label="Active" checked={item.isActive ? true : false}
                    onChange={(e) => { handleChange(e, false) }}
                    disabled={!isEditable}
                    id={item.ruleId} />
                item.action = <div style={{ textAlign: "center" }}><img src={EditIcon} className={classes.editIcon} alt="Edit" onClick={() => { loadCDSRule(item.ruleId) }} /> </div>;
                return { ...item }
            }));

    }

    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const ShowActionDialog = (id, isChecked, actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback,
            rowId: id,
            isChecked: isChecked
        }));
    }

    const handleChange = (e, isCustom) => {
        const { id, checked } = e.target;

        ShowActionDialog(id, checked, true, "Update CDS Rule", "Are you sure, you want to change the setting?", "confirm", function () {

            saveChanges(id, checked, isCustom);
        }, function () {

        });
    }
    const saveChanges = (id, isActive, isCustom) => {
        let state = { ruleId: parseInt(id), isActive: isActive };
        PostDataAPI("cdsrule/updateCDSStatus", state, true).then((result) => {
            if (result.success == true) {
                
                if (result.success /*&& result.data != null*/) {
                    showMessage("Success", "Setting saved successfully.", "success", 2000);

                    if (isCustom)
                        loadGridData('custom');
                    else
                        loadGridData('syswide');


                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);

            }

        },
            function () {
                setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
            });
    }

    const cancelDialog = (e) => {

        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: false,
        }));
        //let lst = [...customRulesList];
        //lst = lst.map(t => t.ruleId == actiondialogprops.rowId ? {
        //    ...t, active: <Switch classes={{
        //        root: classes.switchroot,
        //        switchBase: classes.switchBase,
        //        thumb: classes.thumb,
        //        track: classes.track,
        //        checked: classes.checked,

        //    }}
        //        inputRef={SwitchHandle}
        //        label="Active"  checked={actiondialogprops.isChecked}
        //        onChange={() => { handleChange(e,) }}
        //        id={actiondialogprops.rowId} />
        //} : t);
        //setCustomRulesList(lst);
        //if (SwitchHandle.current.checked == true) {
        //    console.info("check is true")
        //} else {
        //    console.info("check is fase")
        //}
    }
    const handleClick = (e, record) => {
        if (e.target.id != '' && e.target.id > 0) {
            let lst = [...customRulesList];
            lst = lst.map(t => t.ruleId == record.active.props.id ? {
                ...t, active: <Switch classes={{
                    root: classes.switchroot,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,

                }}
                    inputRef={SwitchHandle}
                    label="Active" defaultChecked={e.target.checked}
                    onChange={handleChange}
                    id={record.ruleId} />
            } : t);
            setCustomRulesList(lst);
        }

        
    };
    return (
        <>
            {AddCustomCdsPage ?
                <PageTitle title="Add New Custom CDS Rule" button={
                    <>
                        <Button
                            size="small"
                            id="btnIdGetPayers"
                            className={classes.newAddBtn}
                            onClick={backToCds}
                            startIcon={< ArrowBackIosIcon />}>
                            Back to List
                        </Button>

                    </>
                }></PageTitle> :
                <PageTitle title="Clinical Decision Support Rules" button={
                    <>
                        <Button
                            size="small"
                            id="btnIdGetPayers"
                            className={classes.newAddBtn}
                            onClick={() => {
                                history.goBack();
                            }}
                            startIcon={< ArrowBackIosIcon />}>
                            Back to Setup
                        </Button>

                    </>
                }></PageTitle>
            }


            {AddCustomCdsPage ?

                <AddCustomCDS backToCds={backToCds} ruleId={ruleId} isEditable={isEditable} />
                :
                <Container maxWidth={false}>

                    <Grid container direction="row" alignItems="baseline">
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button size="small" className={classes.newAddBtn2} disabled={!isEditable} onClick={AddCustomCds}>+ Add New </Button>
                            <h2 className={classes.gridTitle}>Custom CDS rules</h2>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.textRight}>

                        </Grid>
                    </Grid>
                    <Grid container direction="row" >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className={'dp-table'}>
                                <div className="custom-grid">
                                    <Table
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={customRulesList}
                                        columns={gridCnfg2["CDSRules"]}
                                    />
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                    <br></br>

                    <Grid container direction="row" alignItems="baseline">
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <h2 className={classes.gridTitle}>Systemwide CDS rules</h2>
                        </Grid>

                    </Grid>


                    <Grid container direction="row" >

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                            <div className={'dp-table'}>
                                <div className="custom-grid">

                                    <Table
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={systemWideRulesList}
                                        columns={gridCnfg2["SystemWideCDSRuls"]}
                                    />

                                </div>
                            </div>

                        </Grid>
                    </Grid>


                </Container>

            }

            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={cancelDialog}
            />


        </>
    )

}

export default withSnackbar(CDSRules);
