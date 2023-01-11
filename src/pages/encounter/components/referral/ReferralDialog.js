import React, { useState, useEffect, useRef } from "react"
import {
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
    IconButton,
    Typography,

} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandMore as ExpandMoreIcon, AttachFile, CheckBox } from "@material-ui/icons";
import PropTypes from 'prop-types';
import useStyles from "./styles"
import BtnIcon from "../../../../images/icons/BtnIcon.png"
import AddIcon from '../../../../images/icons/add-icon.png';
import EditIcon from '../../../../images/icons/pen.png';
import CloseIcon from "../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../images/icons/trash.png";
// import EditIcon from "../../../../images/icons/erase.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import FavoriteIcon from '@material-ui/icons/StarBorder';
import FavoriteTrueIcon from '@material-ui/icons/Star';
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { CheckboxField, InputBaseField, SelectField, TextareaField } from "../../../../components/InputField/InputField";
import SearchList from "../../../../components/SearchList/SearchList";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import Popover from '@material-ui/core/Popover';
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';


// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "330px", height: "494px", margin: "0px", backgroundColor: "#FFFFFF",
                borderRadius: "0px", overflow: "auto"
            }}
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



function ReferralDialog({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    const optionsList = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" },
    ]

    const [tabvalue, setTabValue] = useState(0);
    const [cheifComplaintList, setCheifComplaintList] = useState([
    ]);
    const [visitTypeList, setVisitTypeList] = useState([]);
    const [historyPresentedByList, setHistoryPresentedByList] = useState([]);
    // const [open, setOopenpen] = useState(false);
    //const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("Please type on ...", 'html'));
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [selectedTemplateText, setSelectedTemplateText] = useState("");
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [dialogvalues, setDialogValues] = useState({ showHideAddTemplate: false });
    const [encRowsData, setEncRowsData] = useState([]);
    const [encFavoirteList, setEncFavoirteList] = useState([]);
    const [ccTemplateId, setCCTemplateId] = useState(0);
    const [ccSubTemplateId, setCCSubTemplateId] = useState(0);
    const [isCCTemplateEdited, setIsCCTemplateEdited] = useState(false);
    const [subItemList, setSubItemList] = useState([{ templateText: "" }]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    //Ref
    const cheifComplaintRef = useState({ complaintRef: "", visitReasonRef: "", historyPresentedByRef: "" });




    const [edit, setEdit] = useState(false);
    //
    const [anchorEl, setAnchorEl] = useState(null);
    // const openAddNew = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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
    //

    const [referralState, setReferralState] = useState({
        encounterID: 0, ccDetail: "", hpiDetail: "", ccVisitReasonCode: "", historyPresentedBy: "", cheifComplaintDetails: ""
    });


    //hanlde functions

    useEffect(() => {

        if (showHideDialog) {

        }

    }, [showHideDialog]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setReferralState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };

    const closeDialog = () => {
        handleClose();
        setAnchorEl(null);

    }
    /////-------/////////
    const inputFile = useRef(null);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const handleSearchChange = (name, item) => {
        const { id, value } = item;

        setReferralState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setReferralState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    function handleFileUpload(e) {

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })
    }

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                // classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                // TransitionComponent={Transition}
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'md'}
                {...props} >
                <Scrollbars autoHeight autoHeightMax={620} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>
                                        <Paper square classes={{ root: classes.muiPaper }}>
                                            <Tabs
                                                classes={{ root: classes.tabRoot }}
                                                value={tabvalue}
                                                onChange={onTabChange}
                                                aria-label="icon tabs example"
                                                className={classes.Htabs}
                                            >
                                                <Tab label="Providers" aria-label="providers" {...a11yProps(0)} />
                                                <Tab label="Templates" aria-label="templates" {...a11yProps(1)} />
                                                <Tab label="Attachments" aria-label="attachments" {...a11yProps(2)} />
                                            </Tabs>
                                        </Paper>
                                    </div>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 495 }}>
                                        <div className={classes.quickPickHeader}>
                                            <TabPanel value={tabvalue} index={0}>
                                                {tabvalue == 0 ? (
                                                    <>
                                                        {loading ?
                                                            <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                            :
                                                            <ul className={classes.providersList}>
                                                                {
                                                                    [{ providerName: "John Doe", providerSpeciality: "Cardialogist" }].map((item, i) => (
                                                                        <li key={i} >
                                                                            <span style={{ display: "flex", width: "100%" }}>
                                                                                <Typography onClick={() => alert(item)} className={classes.providerName}> {item.providerName} </Typography>
                                                                                <Typography className={classes.providerSpeciality}>{item.itemCode}</Typography>
                                                                            </span>
                                                                            <span style={{ display: "flex", width: "100%", paddingTop: 3 }}>
                                                                                <Link><Typography className={classes.providerName} onClick={() => alert(item)}>Fax</Typography></Link>
                                                                                <span style={{ position: 'absolute', right: "20px", paddingTop: "5px" }}><img src={EditIcon} alt="edit" /></span>
                                                                            </span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        }
                                                    </>) : ""}
                                            </TabPanel>
                                            <TabPanel value={tabvalue} index={1}>
                                                {tabvalue == 1 ? (
                                                    <>
                                                        {loading ?
                                                            <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                            :
                                                            <ul className={classes.templateList} >
                                                                {["We are referring {patient} to you for evaluation and treatment",
                                                                    "Reason for referral ?"].map((item, i) => (
                                                                        <li>
                                                                            <FormLabel className={classes.templateName}>
                                                                                {item}
                                                                            </FormLabel>
                                                                        </li>
                                                                    ))}
                                                            </ul>}
                                                    </>)
                                                    : ""}
                                            </TabPanel>
                                            <TabPanel value={tabvalue} index={2}>
                                                {tabvalue == 2 ? (
                                                    <>
                                                        {loading ?
                                                            <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                            :
                                                            <ul className={classes.attachmentList} >
                                                                {[{ value: "diagnosis", label: "Diagnosis" }].map((item, i) => (
                                                                    <li>
                                                                        <CheckboxField
                                                                            id={item.value}
                                                                            name={item.value}
                                                                            color="primary"
                                                                            value={item.value}
                                                                            onChangeValue={handleCheckBoxChange}
                                                                            label={item.label}
                                                                        />
                                                                    </li>
                                                                ))}
                                                            </ul>}
                                                    </>)
                                                    : ""}
                                            </TabPanel>
                                        </div>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" btnType="temp" >Add Template</FormBtn>
                                    {/* {edit ?  */}
                                    <FormBtn id="reset" onClick={() => { setEdit(false) }}>Cancel Edit</FormBtn>
                                    {/* : <FormBtn id="reset" onClick={() => { setEdit(true) }}>Edit Template</FormBtn>} */}

                                    {/* <span className={classes.settingButton} onClick={closeDialog}><img src={BtnIcon} style={{ padding: "5px" }} /></span> */}
                                </div>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>New Referral</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>

                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 505 }}>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="Referral Speciality" size={4} />

                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={6}>

                                                    <SearchList
                                                        id="referralSpeciality"
                                                        name="referralSpeciality"
                                                        code={referralState.referralSpeciality}
                                                        apiUrl="ddl/loadItems"
                                                        searchTerm={referralState.referralSpeciality}
                                                        value={referralState.referralSpeciality}
                                                        onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                        placeholderTitle="Search Provider"
                                                    />
                                                </Grid>

                                                <img className={classes.addNewIcon} src={AddIcon} alt="add" />

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Referral Speciality" size={4} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    <SelectField
                                                        id="referralSpeciality"
                                                        name="referralSpeciality"
                                                        value={referralState.referralSpeciality}
                                                        placeholder="Referral Speciality"
                                                        options={optionsList}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="On Behalf of" size={4} />

                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={6}>

                                                    <SearchList
                                                        id="onBehalfOf"
                                                        name="onBehalfOf"
                                                        code={referralState.onBehalfOf}
                                                        apiUrl="ddl/loadItems"
                                                        searchTerm={referralState.onBehalfOf}
                                                        value={referralState.onBehalfOf}
                                                        onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                        placeholderTitle="Search"
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="Referral For" isTextAreaInput={true} size={4} />

                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={6}>

                                                    <TextareaField
                                                        id="referralFor"
                                                        name="referralFor"
                                                        value={referralState.referralFor}
                                                        onChangeValue={handleChange}
                                                        placeholderTitle=""
                                                        rowsMin={4}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="Sincerely" size={4} />

                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={6}>

                                                    <InputBaseField
                                                        display={true}
                                                        id="sincerely"
                                                        name="sincerely"
                                                        value={referralState.sincerely}
                                                        onChangeValue={handleChange}
                                                        placeholderTitle="Sincerely"
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="Attachment" size={4} />

                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={6}>

                                                    <span className={classes.btnSpan}>
                                                        <InputBaseField
                                                            name="uploadFile"
                                                            placeholder="Upload Files"
                                                            value={attachment.userFileName}
                                                            IsDisabled={true}
                                                        />
                                                        <IconButton
                                                            className={classes.attachmentBtn}
                                                            color="primary"
                                                            onClick={handleSelectFile}>
                                                            <AttachFile />
                                                        </IconButton>

                                                    </span>
                                                    <form>
                                                        <div>
                                                            <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                                        </div>
                                                    </form>
                                                </Grid>
                                            </Grid>


                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Grid container xs={4} sm={4} md={4} lg={4} xl={4} />

                                                <Grid container xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    <CheckboxField
                                                        id="send"
                                                        name="send"
                                                        color="primary"
                                                        value={referralState.send}
                                                        onChangeValue={handleCheckBoxChange}
                                                        label=" Send Medication list, Diagnosis, and Allergies"
                                                    />
                                                </Grid>

                                                <Grid container xs={4} sm={4} md={4} lg={4} xl={4} />

                                                <Grid container xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    <CheckboxField
                                                        id="sendByFax"
                                                        name="sendByFax"
                                                        color="primary"
                                                        value={referralState.sendByFax}
                                                        onChangeValue={handleCheckBoxChange}
                                                        label="Send by Fax"
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <span style={{ padding: "0px 10px 0px 10%" }}>
                                                    <FormLabel className={classes.noteHeading}>NOTE: </FormLabel>
                                                    <Typography className={classes.noteText}>Some document types labeled, such as clinical summary can only
                                                        be sent electronically. Also fax size is limited to 500kb.</Typography>
                                                </span>
                                            </Grid>

                                        </Grid>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    <div className={classes.footerRight}>
                                        {isSaving ?
                                            <FormBtn id="loadingSave" > Save</FormBtn>
                                            :
                                            <FormBtn id="save" btnType="temp" > Send</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}> Preview </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>
            </Dialog >

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

export default withSnackbar(ReferralDialog)
