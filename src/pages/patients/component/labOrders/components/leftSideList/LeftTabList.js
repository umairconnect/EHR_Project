import React, { useState, useEffect } from "react"
import {
    Slide,
    Tab,
    Tabs,
    Paper,
    Button,
    Avatar,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import useStyles from "./styles"
import EditIcon from "../../../../../../images/icons/erase.png";
import DeleteIcon from '../../../../../../images/icons/trash.png';
import SettingIcon from "../../../../../../images/icons/darkSetting.png";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { Scrollbars } from "rc-scrollbars";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "380px", minHeight: "615px", margin: "0px", backgroundColor: "#F4F4F4", border: "1px solid #E1E1E1",
                borderRadius: "0px 0px 8px 8px", overflow: "auto"
            }}
            {...other}
        >
            {value === index && (

                <Scrollbars style={{ minHeight: "400px" }}>{children}</Scrollbars>
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
function LeftTabList(props) {

    // handle styles
    const classes = useStyles();
    // handle const data
    const { showMessage } = props;
    //
    const [tabvalue, setTabValue] = useState(0);
    const [encRowsData, setEncRowsData] = useState([]);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [labOrderTemplates, setLabOrderTemplates] = useState([]);
    let [recentLabOrders, setRecentLabOrders] = useState([]);
    const [recentDiagnosis, setRecentDiagnosis] = useState([]);
    const [newLabOrderId, setLabOrderId] = useState(props.labOrderId);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    let [recentLabOrdersItems, setRecentLabOrdersItems] = useState([]);

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

    useEffect(() => {


        var paramsTemplate = {
            imagingOrder: props.imagingOrder === true ? "true" : "false",
            userId: userInfo.userID
        }

      
        PostDataAPI("patient/labOrder/getLabOrderTemplates", paramsTemplate).then((result) => {

            if (result.success && result.data != null) {

                setLabOrderTemplates(
                    result.data.map((item, i) => {
                        return { labOrderTemplateId: item.labOrderTemplateId, templateName: item.templateName, testName: item.testName, diagnosis: item.diagnosis, labOrderTemplateDiagnosistId: item.labOrderTemplateDiagnosistId };
                    }));
            }

        })
        var params = {
            code: "recent_Lab_Orders",
            parameters: [props.imagingOrder === true ? "1" : "0", userInfo.userID.toString()]

        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                // as per Qa suggesstion

                result.data.forEach(k => {
                    k.text2.split(',').forEach(i => {

                        if (arrayObjectIndexOf(recentLabOrdersItems, k.id, "id") == -1 || arrayObjectIndexOf(recentLabOrdersItems, k.id, "id") == 0) {
                            recentLabOrdersItems.push({ id: k.id, label: i.trim() })
                        }
                        else if (arrayObjectIndexOf(recentLabOrdersItems, k.id, "id") > 0) {
                            if (recentLabOrdersItems.filter(tmprm => tmprm.id === k.id && tmprm.label.trim() == i.trim()) == "") {

                                recentLabOrdersItems.push({ id: k.id, label: i.trim() })
                            }
                        }

                    });
                })

                // to remove duplicate

                var _recentLabOrdersItems = [];
                recentLabOrdersItems.map((itm, j) => {
                    if (j === 0)
                        _recentLabOrdersItems.push({ id: itm.id, label: itm.label });

                    if (arrayObjectIndexOf(_recentLabOrdersItems, itm.label.trim(), "label") == -1)
                        _recentLabOrdersItems.push({ id: itm.id, label: itm.label });
                })

                setRecentLabOrdersItems(_recentLabOrdersItems);

                //

                setRecentLabOrders(
                    result.data.map((item, i) => {
                        return { id: item.id, value: item.text1, label: item.text2 };
                    }));
            }

        })

        var params = {
            code: "recent_diagnosis",
            parameters: [userInfo.userID]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setRecentDiagnosis(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2 };
                    }));
            }
        });

        // recentLabOrdersItems = [...new Map(recentLabOrdersItems.map(o => [o["id"], o])).values()]; // Removed Repeted Data

    }, [props.isUpdate]);

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    const loadLabOrderTemplate = (id, call) => {


        PostDataAPI("patient/labOrder/getLabOrderTemplate", id).then((result) => {

            if (result.success && result.data != null) {
             
                result.data.call = call
                props.handleTemplateClick(result.data, 1);

            }

        })
    }

    const loadRecentLabOrder = (id, call) => {

        var data = {
            labOrderId: id
        }

        PostDataAPI("patient/labOrder/getLabOrderDetails", data).then((result) => {

            if (result.success && result.data != null) {

                if (call === 'New')
                    result.data.labOrderId = 0;
                props.handleTemplateClick(result.data, 2);
            }

        })

    }

    const loadRecentDiagnosis = (item, call) => {

        props.handleTemplateClick(item, 3);

    }

    //hanlde functions
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
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
                                <Tab label="Templates" aria-label="phone" {...a11yProps(0)} />
                                <Tab label="Recent Order" aria-label="favorite" {...a11yProps(1)} />
                                <Tab label="Diagnosis" aria-label="favorite" {...a11yProps(2)} />
                            </Tabs>
                        </Paper>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.quickPickHeader}>
                        <TabPanel value={tabvalue} index={0} >
                            {tabvalue == 0 ? (
                                <ul className={classes.templateList}>
                                    {labOrderTemplates.map((item, i) => (
                                        <li key={i}>
                                            <div className={classes.listContent} >
                                                <span className={classes.templateListTitle} onClick={() => loadLabOrderTemplate(item.labOrderTemplateId, 'New')}>{item.templateName}</span>
                                                <span className={classes.templatelistContentTitle}> {''}
                                                    <span className={classes.listIcon}></span></span>
                                                <span className={classes.editIcon} title="Edit" onClick={() => loadLabOrderTemplate(item.labOrderTemplateId, 'Edit')} >
                                                    <img alt="Edit" src={EditIcon} />
                                                </span>
                                                <span className={classes.deleteIcon} title="Delete" onClick={() => props.deleteLabOrderTemplate(item.labOrderTemplateId)} >
                                                    <img alt="Delete" src={DeleteIcon} />
                                                </span>

                                                <span className={classes.templatelistContentTitleDx}>{item.diagnosis ? "Dx:" + item.diagnosis : ""}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : ""}
                        </TabPanel>
                        <TabPanel value={tabvalue} index={1} >
                            {tabvalue == 1 ? (
                                <ul className={classes.templateList}>
                                    {recentLabOrders.map((item, i) => (
                                        <li key={i}>
                                            <div className={classes.listContent} >
                                                <span className={classes.templateListTitle} onClick={() => loadRecentLabOrder(item.id, 'New')}>{item.value}</span>
                                                <span className={classes.templatelistContentTitle}> {''}
                                                    <span className={classes.listIcon}></span></span>
                                                <span className={classes.editIcon} title="Edit" onClick={() => loadRecentLabOrder(item.id, 'Edit')} >
                                                    <img alt="Edit" src={EditIcon} />
                                                </span>

                                                {
                                                    recentLabOrdersItems.filter(tmprm => tmprm.id === item.id).map((items, i) => (
                                                        <span className={classes.templatelistContentTitleDx}>{items.label ? "Dx:" + items.label : ""}</span>
                                                    )

                                                    )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : ""}
                        </TabPanel>
                        <TabPanel value={tabvalue} index={2} >
                            {tabvalue == 2 ? (
                                <ul className={classes.templateList}>
                                    {recentDiagnosis.map((item, i) => (
                                        <li key={i} onClick={() => loadRecentDiagnosis(item, 'New')}>
                                            <div className={classes.listContent} onClick={() => loadRecentDiagnosis(item, 'New')}>
                                                <span className={classes.templateListTitle}>{item.value}</span>
                                                {/*<span className={classes.templatelistContentTitle} onClick={() => loadRecentDiagnosis(item, 'New')}> {item.value}*/}
                                                {/*    <span className={classes.listIcon}></span></span>*/}
                                                <span className={classes.templatelistContentTitleDx}>Dx: {item.id}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : ""}
                        </TabPanel>
                    </div>
                </div>
                {/* <div className={classes.footer}>
                    <Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                        className={classes.BtnIcon} src={SettingIcon} />} className={classes.faxButton}>Order Template Settings</Button>
                </div> */}
            </div>
            {/*</div>*/}
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

export default withSnackbar(LeftTabList)
