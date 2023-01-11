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


function AddDiagnosisDialog({ dialogOpenClose, handleClose, patientId, encounterId, stateDiagnosis, ...props }) {
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
                // style={{
                //     width: "330px", minHeight: "440px", margin: "0px", backgroundColor: "#FFFFFF",
                //     borderRadius: "0px", overflow: "auto"
                // }}
                {...other}
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
    const [chartRowsData, setChartRowsData] = useState([]);
    const [patientRowsData, setPatientRowsData] = useState([]);
    const [resultDiagnosisList, setResultDiagnosisList] = useState([]);

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

        getEncounterDiagnosis();

        if (stateDiagnosis) {
            if (stateDiagnosis.length > 0)
                setResultDiagnosisList(stateDiagnosis);
        }

    }, [dialogOpenClose]);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue == 1) {
            getPatientDiagnosisList(1);
        }
    };

    const getPatientDiagnosisList = (order) => {
        var params = {
            code: "patient_diagnosis",
            parameters: [patientId ? patientId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setPatientRowsData(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2 };
                    }));

                // To Load Already Selected from Encounter Diagnosis

                //if (order == 0)
                //{
                //    setResultDiagnosisList(
                //        result.data.map((item, i) => {
                //            return { icdCode: item.text1, description: item.text2 };
                //        }));
                //}
            }
        });
    }

    const closeDialog = () => {
        handleClose();

    }

    const handleSearchListChange = (name, item) => {
        const { id, value } = item;

        if (value != "") {
            if (resultDiagnosisList.filter(tmprm => tmprm.isDeleted == false).length < 12) {
                setState(prevState => ({
                    ...prevState,
                    [name]: id,
                    "icdName": value
                }));

                var _diagnosisArray = [];

                if (resultDiagnosisList.filter(tmprm => tmprm.icdCode === id && tmprm.description === value && tmprm.isDeleted == false) == "") {

                    if (resultDiagnosisList) {
                        if (resultDiagnosisList.length > 0) {

                            resultDiagnosisList.map((item, i) => {

                                _diagnosisArray.push({
                                    superbillDiagnosisId: item.superbillDiagnosisId, claimSuperbillId: item.claimSuperbillId, icdCode: item.icdCode,
                                    description: item.description, isDeleted: item.isDeleted, createdBy: item.createdBy, updatedBy: item.updatedBy,
                                    createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate, serialNumber: item.serialNumber
                                });
                            });
                        }
                    }

                    _diagnosisArray.push({
                        superbillDiagnosisId: 0, claimSuperbillId: 0, icdCode: id, description: value,
                        isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), serialNumber: resultDiagnosisList.length + 1
                    });

                    setTimeout(() => {

                        setState(prevState => ({
                            ...prevState,
                            icdCode: '',
                            icdName: ''
                        }));

                    }, 100)

                    setResultDiagnosisList(_diagnosisArray);

                }
                else {

                    showMessage("Error", "Diagnose already exists.", "error", 8000);
                    setTimeout(() => {
                        setState(prevState => ({
                            ...prevState,
                            icdCode: '',
                            icdName: ''
                        }));

                    }, 100)
                }
            }
            else {
                showMessage("Error", "A maximum of 12 diagnosis can be added.", "error", 3000);
                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        icdCode: '',
                        icdName: ''
                    }));

                }, 100)
            }
        }
    }
    const [state, setState] = useState({});
    const [filterDataList, setFilterDataList] = useState([]);
    const [recentRowsData, setRecentRowsData] = useState([]);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const getEncounterDiagnosis = () => {
        var params = {
            code: "get_encounter_diagnosis",
            parameters: [encounterId ? encounterId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setChartRowsData(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2 };
                    }));
            }
        });
    }

    const deleteRowDiagnosis = (diagnoseCode, description) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Diagnose?", "confirm", function () {

            resultDiagnosisList.map((item, i) => {

                if (item.icdCode === diagnoseCode && item.description === description)
                    item.isDeleted = true;
            });

            setResultDiagnosisList(resultDiagnosisList);

        });
    }

    const save = () => {
        props.handleSaveDiagnosis(resultDiagnosisList);
        //clearValues();
    };

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
                                            <Tab label="Chart" aria-label="phone" {...a11yProps(0)} />
                                            <Tab label="Patient" aria-label="favorite" {...a11yProps(1)} />
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
                                                            {chartRowsData.map((item, i) => (
                                                                <li key={i} onClick={() => handleSearchListChange("icdCode", item)}>
                                                                    <span className={classes.templatesCode}>{item.id}</span>
                                                                    <div style={{ display: "flex" }}>
                                                                        <span className={classes.templatesDescription}>{item.value}</span>
                                                                        <span className={classes.deleteItemIcon} title="Info"><img src={Info} alt="info" /></span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>}
                                                </>) : ""}
                                        </TabPanel>
                                        <TabPanel value={tabvalue} index={1}>
                                            {/* <div className={classes.listHeader}>
                                                <span className={classes.templatesHeaderCode}>Code</span>
                                                <span className={classes.templatesHeaderDescription}>Description</span>
                                            </div> */}
                                            {tabvalue == 1 ? (
                                                <>
                                                    {loading ?
                                                        <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                        :
                                                        <ul className={classes.templatesList} >
                                                            {patientRowsData.map((item, i) => (
                                                                <li key={i} onClick={() => handleSearchListChange("icdCode", item)}>
                                                                    <span className={classes.templatesCode}>{item.id}</span>
                                                                    <div style={{ display: "flex" }}>
                                                                        <span className={classes.templatesDescription}>{item.value}</span>
                                                                    </div>
                                                                    <span className={classes.deleteItemIcon} title="Info" onClick={() => alert("list item clicked with code : " + item.code)}><img src={Info} alt="info" /></span>
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
                                <FormGroupTitle>Diagnosis</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ height: 450 }}>
                                    <Grid container direction="row" lg={12}>

                                        <Grid container lg={12}>
                                            <FormLabel className={classes.procedureNoteText}>Search for a diagnosis or select from the chart list/patient list</FormLabel>
                                        </Grid>

                                        <Grid container lg={12}>
                                            <Label title="Search Diagnosis" mandatory={true} size={3} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                <SearchList
                                                    name="icdCode"
                                                    value={state.icdCode}
                                                    searchTerm={state.icdName}
                                                    code="ICD"
                                                    apiUrl="ddl/loadItems"
                                                    onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                    placeholderTitle="Search Diagnosis"
                                                />

                                            </Grid>
                                        </Grid>

                                        <Grid container lg={12}>
                                            <FormLabel className={classes.procedureNoteTextHeading}>Diagnosis Search Results:</FormLabel>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <table className={classes.icdCodeTable}>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="1">ICD-10</th>
                                                            <th colSpan="2">Description</th>
                                                            <th colSpan="1"><div style={{ textAlign: 'center' }}>Action</div></th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        resultDiagnosisList ?
                                                            resultDiagnosisList.filter(tmprm => tmprm.isDeleted != true).map((item, i) => {
                                                                return <tr>
                                                                    <td colSpan="1">{item.icdCode}</td>
                                                                    <td colSpan="2">{item.description}</td>
                                                                    <td colSpan="1">
                                                                        <div style={{ textAlign: 'center' }}>
                                                                            <Tooltip title="Delete">
                                                                                <img src={DeleteIcon} alt="delete" onClick={() => deleteRowDiagnosis(item.icdCode, item.description)} />
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
                                <span style={{ display: "flex" }}>
                                    <Typography className={classes.linkText}><span className={classes.unspecified}></span>Unspecified ICD-10 Code(s)</Typography>
                                    <Typography className={classes.linkText} ><span className={classes.ExpiredCod}></span> Expired Code(s)</Typography>
                                </span>
                                <div className={classes.footerRight}>

                                    <FormBtn id="save" onClick={save}> Save</FormBtn>
                                    <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
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

export default withSnackbar(AddDiagnosisDialog)
