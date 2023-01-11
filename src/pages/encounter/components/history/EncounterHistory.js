import React, { useState, useEffect } from "react"
import {
    Slide,
    Dialog,
    Tab,
    Tabs,
    Avatar,
    Typography
} from "@material-ui/core";
import PropTypes from 'prop-types';
import useStyles from "./styles"
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from "../../../../images/icons/math-plus.png"
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import RiskAssessment from "./components/riskAssessment/RiskAssessment"
import FamilyHistory from "./components/familyHistory/FamilyHistory"
import SocialHistory from "./components/socialHistory/SocialHistory"
import GynaeStatus from "./components/gynaeStatus/GynaeStatus"
import PastMedicalHistory from "./components/pastMedicalHistory/PastMedicalHistory"
import PastSurgicalHistory from "./components/pastSurgicalHistory/PastSurgicalHistory"
import PastHospitalization from "./components/pastHospitalizationHistory/PastHospitalization"
import { PostDataAPI } from '../../../../Services/APIService';
import Scrollbars from "rc-scrollbars";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            // style={{paddingRight:"20px"}}
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



function EncounterHistory({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();
    const [tabStatus, setTabStatus] = useState({ isFamilyRecordExist: false });
    const [isEditable] = useState(props.isEditable);
    //List for LeftSide Menus
    const [menus, setMenus] = useState([
        { id: 0, value: "Social History",recordExist:false },
        { id: 1, value: "Family History", recordExist: false },
        { id: 2, value: "Risk Assessment", recordExist: false },
        { id: 3, value: "OB/GYN Status", recordExist: false },
        { id: 4, value: "Past Medical History", recordExist: false },
        { id: 5, value: "Past Surgical History", recordExist: false },
        { id: 6, value: "Hospitalization History", recordExist: false },
    ])

    // handle const data
    const { showMessage } = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [tabvalue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [patientId] = useState(props.patientId);
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

    const loadPatHistoryData = () => {
        var params = {
            code: "get_pat_history",
            parameters: [props.patientId.toString()]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                const newState = menus.map(obj => {
                    if (obj.id === 0) {
                        return { ...obj, recordExist: result.data[0].text1 == null ? false : true };
                    }
                    if (obj.id === 1) {
                        return { ...obj, recordExist: result.data[0].text2 == null ? false : true };
                    }
                    if (obj.id === 2) {
                        return { ...obj, recordExist: result.data[0].text3 == null ? false : true };
                    }
                    if (obj.id === 3) {
                        return { ...obj, recordExist: result.data[0].text4 == null ? false : true };
                    }
                    if (obj.id === 4) {
                        return { ...obj, recordExist: result.data[0].text5 == null ? false : true };
                    }
                    if (obj.id === 5) {
                        return { ...obj, recordExist: result.data[0].text6 == null ? false : true };
                    }
                    if (obj.id === 6) {
                        return { ...obj, recordExist: result.data[0].text7 == null ? false : true };
                    }
                    return obj;
                });
                setMenus(newState);
            } 
        });
    };

    const handleSave = () => {
        loadPatHistoryData();
    }

    useEffect(() => {
        loadPatHistoryData();
        if (showHideDialog) {
            setLoading(true);
            setLoading(false);
        }

    }, [showHideDialog]);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                TransitionComponent={Transition}
                open={showHideDialog}
                disableEnforceFocus
                {...props} >
                <Scrollbars style={{ height: 675, width: 1060 }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>
                                        <Typography className={classes.listHeading}>
                                            History Sections
                                        </Typography>
                                    </div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes.quickPickHeader}>
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={tabvalue}
                                            onChange={handleChange}
                                            aria-label="Vertical tabs example"
                                            className={classes.Historytabs}>
                                            {
                                                menus.map((item, i) => {
                                                    return <Tab classes={{ wrapper: classes.tabWrapper }} label={item.value} {...a11yProps(i)}
                                                        icon={item.recordExist ? <CheckIcon className={classes.clockIconChecked} />
                                                            : <CheckIcon className={classes.clockIcon} />}
                                                    />
                                                })
                                            }
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                    <FormGroupTitle>{menus[tabvalue].value}</FormGroupTitle>
                                </div>
                                {/* <Scrollbars style={{  height: 500 }}> */}
                                <div className={classes.content}>
                                    <TabPanel value={tabvalue} index={0}>
                                        {tabvalue == 0 ?
                                            (<SocialHistory patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(1)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={1}>
                                        {tabvalue == 1 ?
                                            (<FamilyHistory patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(2)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={2}>
                                        {tabvalue == 2 ?
                                            (<RiskAssessment patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(3)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={3}>
                                        {tabvalue == 3 ?
                                            (<GynaeStatus patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(4)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={4}>
                                        {tabvalue == 4 ?
                                            (<PastMedicalHistory patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(5)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={5}>
                                        {tabvalue == 5 ?
                                            (<PastSurgicalHistory patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(6)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={6}>
                                        {tabvalue == 6 ?
                                            (<PastHospitalization patientId={patientId} encounterId={encounterId} handleClose={handleClose} handleSave={handleSave} handleNext={() => setTabValue(6)} isEditable={isEditable} />)
                                            : ""}
                                    </TabPanel>
                                </div>
                                {/* </Scrollbars> */}
                            </div>
                        </div>
                    </div>
                </Scrollbars>
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

export default withSnackbar(EncounterHistory)
