import React, { useState, useEffect } from "react"
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from 'prop-types';
import useStyles from "./styles"
import BtnIcon from "../../../../../../../../images/icons/BtnIcon.png"
import Info from "../../../../../../../../images/icons/info.png";
import AddIcon from '../../../../../../../../images/icons/add-icon.png';
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../../../../../images/icons/trash.png";
import EditIcon from "../../../../../../../../images/icons/erase.png";
import LoadingIcon from "../../../../../../../../images/icons/loaderIcon.gif";
import FavoriteIcon from '@material-ui/icons/StarBorder';
import FavoriteTrueIcon from '@material-ui/icons/Star';
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { InputBaseField, SelectField, TextareaField } from "../../../../../../../../components/InputField/InputField";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../../../Services/GetUserInfo';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../components/UiElements/UiElements";
import Popover from '@material-ui/core/Popover';

import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import {
    Search as SearchIcon,
    // InfoOutlined as Info
} from "@material-ui/icons";


function AddProcedureDialog({ dialogOpenClose, handleClose, stateProcedures, billingPrfileId, ...props }) {
    // handle styles
    const classes = useStyles();
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                className={classes.tabPanel}

            >
                {value === index && (
                    <>{children}</>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    //


    // handle const data
    const { showMessage } = props;
    const [tabvalue, setTabValue] = useState(0);
    const [encRowsData, setEncRowsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [proceduresList, setProceduresList] = useState([]);
    const [proceduresNDCList, setProceduresNDCList] = useState([]);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

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

    //hanlde functions

    useEffect(() => {

        getChartProcedures();
        if (stateProcedures) {
            if (stateProcedures.length > 0)
                setProceduresList(stateProcedures);
        }
        //else
        //    loadData(parseInt(props.encounterId));

    }, [dialogOpenClose]);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue == 1) {
            getFavtProceduresList();
        }


    };


    const getFavtProceduresList = () => {

        var params = {
            code: "get_encounter_freq_procedures",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setRecentRowsData(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2, extraParam2: item.text2 };
                    }));
            }
        });

    }

    const closeDialog = () => {
        handleClose();
    }
    const handleSearchListChange = (name, item) => {

        const { id, value, extraParam2 } = item;

        setState(prevState => ({
            ...prevState,
            cptCode: id,
            cptName: value
        }));
        PostCPTChangeCode(id, value, extraParam2);
        if (value != "" && billingPrfileId > 0) {
            var params = [billingPrfileId.toString(), id];
            PostDataAPI("billing/profile/getNDCByCPTCode", params).then((result) => {
                if (result.success && result.data && result.data.length > 0) {
                    setProceduresNDCList(prevLst => [...prevLst, result.data[0]]);
                    //PostCPTChangeCode(id, value, extraParam2);
                }
            });
        }
    }
    const PostCPTChangeCode = (id, value, extraParam2) => {

        if (value != "") {
            var _proceduresArray = [];
            let valDesc = value != null ? value.indexOf('-') > 0 ? value.split('-')[1].trim() : "" : null;
            if (proceduresList.filter(tmprm => tmprm.code === id && tmprm.isDeleted === false) == "") {

                if (proceduresList) {
                    if (proceduresList.length > 0) {

                        proceduresList.map((item, i) => {

                            _proceduresArray.push({
                                superbillProcedureId: item.superbillProcedureId, claimSuperbillId: item.claimSuperbillId, code: item.code,
                                revCode: item.revCode, revCodeName: item.revCodeName,
                                description: item.description, m1: item.m1, m2: item.m2, m3: item.m3, m4: item.m4, serviceDateFrom: item.serviceDateFrom,
                                serviceDateTo: item.serviceDateTo, ndcCode: item.ndcCode, dxPointer1: item.dxPointer1, dxPointer2: item.dxPointer2,
                                dxPointer3: item.dxPointer3, dxPointer4: item.dxPointer4, unit: item.unit, price: item.price, billed: item.billed,
                                patientPaid: item.patientPaid, insBalance: item.insBalance, statusCode: item.statusCode, isDeleted: item.isDeleted, eobClaimId: item.eobClaimId,
                                createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate
                            });


                        });
                    }
                }

                let _price = '';
                let procObj = searchFeeScheduleCode(id, "", props.feeSchedulerProcedures);

                if (procObj != undefined)
                    _price = procObj.facilityPrice;
                else
                    _price = '';

                _proceduresArray.push({
                    //proceduralCodeID: 0,
                    superbillProcedureId: 0, claimSuperbillId: 0, code: id,
                    description: extraParam2, m1: '', m2: '', m3: '', m4: '', serviceDateFrom: props.propAppontmentDate ? props.propAppontmentDate : null,
                    serviceDateTo: props.propAppontmentDate ? props.propAppontmentDate : null, ndcCode: '', dxPointer1: '', dxPointer2: '',
                    dxPointer3: '', dxPointer4: '', unit: 1, price: _price, billed: _price, eobClaimId: 0,
                    patientPaid: 0, insBalance: 0, statusCode: '', isDeleted: false, createdBy: 0,
                    updatedBy: 0, createDate: new Date()
                });


                setProceduresList(_proceduresArray);

                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        cptCode: '',
                        cptName: ''
                    }));

                }, 100)

            }
            else {

                showMessage("Error", "Procedure already exists.", "error", 8000);
                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        cptCode: '',
                        cptName: ''
                    }));

                }, 100)
            }
        }
    }

    const [state, setState] = useState({});
    const [filterDataList, setFilterDataList] = useState([]);
    const [recentRowsData, setRecentRowsData] = useState([]);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const getChartProcedures = () => {
        var params = {
            code: "get_encounter_chart_procedures",
            parameters: [props.encounterId ? props.encounterId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setFilterDataList(result.data.map((item, i) => {
                    return { id: item.text1, value: item.text2, extraParam2: item.text2 };
                }));
            }
        });
    }

    const save = () => {

        props.handleSaveProcedures(proceduresList, proceduresNDCList);
        //clearValues();
    };
    function searchFeeScheduleCode(code, m1, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            var feeSchM1 = myArray[i].m1 ? myArray[i].m1 : "";
            if (myArray[i].procedureCode === code && feeSchM1 === m1) {
                return myArray[i];
            }
        }
    }

    const deleteRowOrderTest = (code, description) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Procedure?", "confirm", function () {

            proceduresList.map((item, i) => {

                if (item.code === code && item.description === description)
                    item.isDeleted = true;
            });

            setProceduresList(proceduresList);

        });

    }

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                disableEnforceFocus
                maxWidth={'lg'}
                {...props} >
                <div className={classes.DialogContent}>
                    <div className={classes.DialogContentLeftSide}>
                        <div className={classes.box}>
                            <div className={classes.leftHeader}>
                                <div className={classes.leftSideHeader}>
                                    <Paper square classes={{ root: classes.muiPaper }}>
                                        <Tabs
                                            classes={{ root: classes.tabRoot }}
                                            value={tabvalue}
                                            onChange={onTabChange}
                                            aria-label="icon tabs example"
                                            className={classes.Htabs}
                                        >
                                            <Tab label="Chart" aria-label="chart" {...a11yProps(0)} />
                                            <Tab label="Frequent" aria-label="frequent" {...a11yProps(1)} />
                                        </Tabs>
                                    </Paper>
                                </div>
                                <div className={classes.listHeader}>
                                    <span className={classes.templatesHeaderCode}>Code</span>
                                    <span className={classes.templatesHeaderDescription}>Description</span>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 450, background: "#FFFFFF" }}>
                                    <div className={classes.quickPickHeader}>
                                        <TabPanel value={tabvalue} index={0} className={classes.tabPan}>

                                            {tabvalue == 0 ? (
                                                <>
                                                    {loading ?
                                                        <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                        :
                                                        <ul className={classes.templatesList} >
                                                            {filterDataList.map((item, i) => (
                                                                <li key={i} onClick={() => handleSearchListChange("icdCode", item)}>
                                                                    <span className={classes.templatesCode}>{item.id}</span>
                                                                    <div style={{ display: "flex" }}>
                                                                        <span className={classes.templatesDescription}>{item.value}</span>
                                                                        {/* <span className={classes.deleteItemIcon} title="Info" onClick={() => alert("list item clicked with code : " + item.code)}><img src={Info} alt="info" /></span> */}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>}
                                                </>) : ""}
                                        </TabPanel>
                                        <TabPanel value={tabvalue} index={1}>
                                            {tabvalue == 1 ? (
                                                <>
                                                    {loading ?
                                                        <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                        :
                                                        <ul className={classes.templatesList} >
                                                            {recentRowsData.map((item, i) => (
                                                                <li key={i} onClick={() => handleSearchListChange("icdCode", item)}>
                                                                    <span className={classes.templatesCode}>{item.id}</span>
                                                                    <div style={{ display: "flex" }}>
                                                                        <span className={classes.templatesDescription}>{item.value}</span>
                                                                    </div>
                                                                    {/* <span className={classes.deleteItemIcon} title="Info" onClick={() => alert("list item clicked with code : " + item.code)}><img src={Info} alt="info" /></span> */}
                                                                </li>
                                                            ))}
                                                        </ul>}
                                                </>)
                                                : ""}
                                        </TabPanel>
                                    </div>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className={classes.DialogContentRightSide}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Procedures</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ height: 500 }}>
                                    <Grid container direction="row" lg={12}>

                                        <Grid container lg={12}>
                                            <FormLabel className={classes.procedureNoteText}>Search for a procedure or select from the chart list/frequent list</FormLabel>
                                        </Grid>

                                        <Grid container lg={12}>
                                            <Label title="Procedures" mandatory={true} size={2} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                <SearchList
                                                    name="cptCode"
                                                    value={state.cptCode}
                                                    searchTerm={state.cptName}
                                                    code="CPT"
                                                    apiUrl="ddl/loadItems"
                                                    onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                    placeholderTitle="Search Procedure"
                                                />

                                            </Grid>
                                        </Grid>

                                        <Grid container lg={12}>
                                            <FormLabel className={classes.procedureNoteTextHeading}>Procedure Search Results:</FormLabel>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <table className={classes.icdCodeTable}>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="1">Code</th>
                                                            <th colSpan="2">Description</th>
                                                            <th colSpan="1">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        proceduresList ?
                                                            proceduresList.filter(tmprm => tmprm.isDeleted != true).map(item => {
                                                                return <tr>
                                                                    <td colSpan="1">{item.code}</td>
                                                                    <td colSpan="2">{item.description}</td>
                                                                    <td colSpan="1">
                                                                        <div style={{ textAlign: 'center' }}>
                                                                            <Tooltip title="Delete">
                                                                                <img src={DeleteIcon} alt="delete" onClick={() => deleteRowOrderTest(item.code, item.description)} />
                                                                            </Tooltip>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            })
                                                            : null
                                                    }
                                                </table>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Scrollbars>
                            </div>
                            <div className={classes.footer}>
                                <div className={classes.footerRight}>

                                    <FormBtn id="save" onClick={save}> Save</FormBtn>
                                    <FormBtn id="reset" onClick={closeDialog}>Close </FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>

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
    );
}

export default withSnackbar(AddProcedureDialog)
