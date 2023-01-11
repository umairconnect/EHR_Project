import React, { useState, useEffect } from "react"
import {
    Slide,
    Dialog,
    FormLabel,
    Grid,
    Typography,
    Paper,
    Button,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
    ButtonGroup,
    Divider,
    DialogActions
} from "@material-ui/core";
import useStyles from "./styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import Eraser from "../../../../../../images/icons/erase.png"
import DeleteIcon from "../../../../../../images/icons/trash.png";
import { InputBaseField, SelectField, CheckboxField, TextareaField } from "../../../../../../components/InputField/InputField";
import { FormBtn, FormGroupTitle, Label, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LeftTabList from "../leftSideList/LeftTabList";
import SubmitForm from "../submitForm/SubmitForm";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { Scrollbars } from "rc-scrollbars";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { GetDataAPI } from "../../../../../../Services/GetDataAPI";
import ResponsibleParty from '../../../demographics/components/responsibleParty/ResponsibleParty';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function LabOrderPaymentForm({ showHideDialog, isLastStep, handleBack, handleNext, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    const [state, setState] = useState(props.labOrderStatePayment);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [submitFormDialog, setSubmitFormDialog] = useState(false);
    const [labOrderVendors, setLabOrderVendors] = useState([]);
    const [paymentProfileCodes, setPaymentProfileCodes] = useState([]);
    const [primaryProvider, setPrimaryProvider] = useState([]);
    const [orderingProvider, setOrderingProvider] = useState([]);
    const [chartNote, setChartNote] = useState([]);
    const [primaryLocations, setPrimaryLocations] = useState([]);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const [stateSaveAsTemplate, setStateSaveAsTemplate] = useState({

        labOrderTemplateId: 0, locationId: 0, labId: 0, templateName: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), isElab: props.imagingOrder,
        labOrderTemplateTestLst: [],
        LabOrderTemplateDiagnosisLst: []

    })
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);

    const [finalState, setFinalState] = useState({
        labOrderId: 0, patientEncounterId: null, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
        orderingProviderId: null, testTypeCode: "", isElab: props.imagingOrder, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "", recentDiagnoseId: "",
        chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", recentTestName: "", recentTestID: "", recentDiagnoseName: "",
        orderSepcificDatetime: null, performTestOnSpecificDate: false, orderStatus: "Pending", vendorName: "", allOrderTest: false,

        labOrderSpecimen: [],
        labOrderTest: [],
        labOrderDiagnosis: []
    });

    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleRowAction = (e) => {

        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };
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

        setState(props.labOrderStatePayment);
        initialization();

        if (showHideDialog) {
        }

    }, [showHideDialog]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChkboxChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    }
    const handleChkboxChangeDynamic = (e) => {
        const { name, value, id } = e.target;

        if (name === "orderSepcificDatetime")
            state.labOrderTest[id][name] = value;
        else
            state.labOrderTest[id][name] = !state.labOrderTest[id][name];

        setState(prevState => ({
            ...prevState,
            labOrderTest: state.labOrderTest
        }));
    }
    const handleAction = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        setDropDownActionId(e.currentTarget.dataset.id);
    }
    const handleCloseOrderLabSubmitForm = () => {

        setSubmitFormDialog(false);
    }


    function initialization() {

        var params = {
            code: "labOrder_Vendor",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                result.data.push({ text1: "Other", text2: "Other" });
                setLabOrderVendors(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })

        var params = {
            code: "DDL_List_Item",
            parameters: ['payment_profile_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                result.data.map((item, i) => {

                    if (item.text3 == 'payment_profile_code')
                        paymentProfileCodes.push({ value: item.text1, label: item.text2 });

                })

            }
        })

        var params = {
            code: "providers_Staff_Order_Delegation",//"get_providers_by_loggedIn_user",
            parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params, true).then((result) => {

            if (result.success && result.data != null) {

                setPrimaryProvider(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 + ' ' + item.text2 };
                    }));

                setOrderingProvider(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 + ' ' + item.text2 };
                    }));
            }

        })


        var params = {
            code: "labOrderChartNote",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setChartNote(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })
        let user_info = JSON.parse(GetUserInfo());


        let data = {
            userID: user_info.user.userID
        }
        var method = "user/getUserLocations";
        if (user_info.isProvider == false)
            method = "user/getProviderLocations";

        PostDataAPI(method, data).then((result) => {

            if (result.success && result.data != null) {

                setPrimaryLocations(
                    result.data.map((item, i) => {
                        return { value: item.id1, label: item.text1 };
                    }));
            }

        })

        var params = {
            code: "",
            parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
        }

        // GetDataAPI("user/getUserDecr", "userID=" + userInfo.userID, false).then((result) => {
        PostDataAPI('user/getUserDecr', params, true).then((result) => {

            if (result.success) {


                if (userInfo.isProvider == true) {

                    if (state.primaryProviderId == "" || state.primaryProviderId == null) {
                        setState(prevState => ({
                            ...prevState,
                            primaryProviderId: result.data
                        }))

                    }

                }

            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }

        })

    }

    function deleteRowOrderTest(labTestId, index, labOrderTestId) {

        if (state.orderTests.length === 1) {
            if (props.imagingOrder)
                showMessage("Error", "Cannot delete, at least 1 Order Study is compulsory.", "error", 8000);
            else
                showMessage("Error", "Cannot delete, at least 1 Order Test is compulsory.", "error", 8000);
            return;
        }

        let alertMsg = "";
        if (props.imagingOrder == true)
            alertMsg = "Are you sure, you want to delete the Study?";
        else
            alertMsg = "Are you sure, you want to delete the Lab Order Test?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {

            let labOrderTest_Id = state.orderTests[index].labOrderTestId;

            if (labOrderTest_Id > 0) {

                state.orderTests[index].isDeleted = true;

                //var data = {
                //    labOrderTestId: labOrderTestId
                //}
                //PostDataAPI("patient/labOrder/deleteMultipleDiagnoses", data, true).then((result) => {

                //    if (result.success) {
                state.labOrderDiagnosis.filter(tmprm => tmprm.labTestId == labTestId).map((itmm, d) => {
                    let _index = 0;
                    _index = state.labOrderDiagnosis.findIndex(x => x.labTestId === labTestId);
                    state.orderDiagnoses[_index].isDeleted = true;
                    //state.labOrderDiagnosis.splice(_index, 1);
                })

                setState(prevState => ({
                    ...prevState,
                    labOrderDiagnosis: state.labOrderDiagnosis,
                    orderDiagnoses: state.labOrderDiagnosis
                }));

                //    }
                //    else
                //        showMessage("Error", result.message, "error", 8000);
                //})

                //PostDataAPI("patient/labOrder/deleteLabOrderTest", data, true).then((result) => {

                //    if (result.success) {

                //state.orderTests.splice(index, 1);


                if (state.labOrderSpecimen) {
                    state.labOrderSpecimen.filter(tmprm => tmprm.labTestId == labTestId).map((itmmm, y) => {
                        let _index = 0;
                        _index = state.labOrderSpecimen.findIndex(x => x.labTestId === labTestId);
                        state.labOrderSpecimen[_index].isDeleted = true;
                        //state.labOrderSpecimen.splice(_index, 1);
                    })
                }

                setState(prevState => ({
                    ...prevState,
                    orderTests: state.orderTests,
                    labOrderTest: state.orderTests,
                    labOrderDiagnosis: state.labOrderDiagnosis,
                    orderDiagnoses: state.labOrderDiagnosis,
                    labOrderSpecimen: state.labOrderSpecimen
                }));
                //    }
                //    else
                //        showMessage("Error", result.message, "error", 8000);
                //})

            }
            else {

                if (state.labOrderDiagnosis) {
                    state.labOrderDiagnosis.filter(tmprm => tmprm.labTestId == labTestId).map((itmm, d) => {
                        let _index = 0;
                        _index = state.labOrderDiagnosis.findIndex(x => x.labTestId === labTestId);
                        state.labOrderDiagnosis.splice(_index, 1);

                    })
                }

                if (state.labOrderSpecimen) {
                    state.labOrderSpecimen.filter(tmprm => tmprm.labTestId == labTestId).map((itmmm, y) => {
                        let _index = 0;
                        _index = state.labOrderSpecimen.findIndex(x => x.labTestId === labTestId);
                        state.labOrderSpecimen.splice(_index, 1);

                    })

                }

                if (state.orderTests)
                    state.orderTests.splice(index, 1);

                setState(prevState => ({
                    ...prevState,
                    orderTests: state.orderTests,
                    labOrderTest: state.orderTests,
                    labOrderSpecimen: state.labOrderSpecimen,
                    labOrderDiagnosis: state.labOrderDiagnosis,
                    orderDiagnoses: state.labOrderDiagnosis
                }));

            }

        });

    }

    function backForm() {

        handleBack(state);

    }

    function DeleteRecord() {

        let alertMsg = "";
        if (props.imagingOrder === true)
            alertMsg = "Are you sure, you want to delete the Study?";
        else
            alertMsg = "Are you sure, you want to delete the Lab Order?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {

            var data = {
                labOrderId: state.labOrderId
            }
            PostDataAPI("patient/labOrder/delete", data, true).then((result) => {

                if (result.success) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleClose();

                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }

            })

        });
    }

    function saveAsLabOrderTemplate(e) {
        setAnchorEl(anchorEl ? null : e.currentTarget)


        if (state.labId === "" || state.labId === null) {

            if (props.imagingOrder === true)
                showMessage("Error", "Please select Image Order.", "error", 8000);
            else
                showMessage("Error", "Please select Lab Order.", "error", 8000);
            return;
        }

        if (state.orderTests.length === 0) {
            if (props.imagingOrder === true)
                showMessage("Error", "Please select at least 1 study.", "error", 8000);
            else
                showMessage("Error", "Please select at least 1 order test.", "error", 8000);
            return;
        }

        if (state.orderDiagnoses.length === 0) {

            showMessage("Error", "Please select al least 1 order diagnose", "error", 8000);
            return;
        }

        let _labOrderTemplateTest = [];
        let _labOrderTemplateDiagnosis = [];
        stateSaveAsTemplate.labOrderTemplateId = 0;
        stateSaveAsTemplate.locationId = state.locationId ? state.locationId : null;
        stateSaveAsTemplate.labId = state.labId ? parseInt(state.labId) : null;
        stateSaveAsTemplate.templateName = state.orderTests[0] ? state.orderTests[0].testName : "";

        state.orderTests.map((item, i) => {
            _labOrderTemplateTest.push({ labOrderTemplateTestId: 0, labOrderTemplateId: 0, labTestId: parseInt(item.labTestId), createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), isDeleted: false, updateDate: new Date() });
        });

        state.orderDiagnoses.map((itm, i) => {
            _labOrderTemplateDiagnosis.push({ labOrderTemplateDiagnosistId: 0, labOrderTemplateId: 0, diagnosisId: null, icdCode: itm.icdCode, diagnosis: itm.diagnosis, createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(), isDeleted: false, updateDate: new Date() });
        });

        stateSaveAsTemplate.labOrderTemplateTestLst = _labOrderTemplateTest;
        stateSaveAsTemplate.LabOrderTemplateDiagnosisLst = _labOrderTemplateDiagnosis;


        let method = "patient/labOrder/saveLabOrderTemplate";

        setIsSaveCall(true);
        PostDataAPI(method, stateSaveAsTemplate, true).then((result) => {

            if (result.success == true) {


                if (result.success === true && result.data != null) {

                    showMessage("Success", "Template saved successfully.", "success", 3000);
                    setIsSaveCall(false);

                }
                props.templateUpdated();
            }
            else {

                showMessage("Error", result.message, "error", 3000);
                setIsSaveCall(false);

            }
        })

    }

    const SaveLabOrder = () => {
        handleDataFormat();

        let method = "patient/labOrder/add";

        if (state.labOrderId > 0) {

            method = "patient/labOrder/update";

        }
        setIsSaveCall(true);
        setLoading({ isSaving: true });
        PostDataAPI(method, finalState, true).then((result) => {

            if (result.success == true) {

                if (state.labOrderId < 1) {

                    if (result.success === true && result.data != null) {

                        if (props.imagingOrder === true)
                            showMessage("Success", "Imaging Order saved successfully.", "success", 3000);
                        else
                            showMessage("Success", "Lab Order saved successfully.", "success", 3000);

                        handleFormatData(result.data);
                        setState(result.data);
                        setIsSaveCall(false);
                        setLoading({ isSaving: false });


                    }
                }
                else if (state.labOrderId > 0) {

                    if (result.success) {

                        if (props.imagingOrder === true)
                            showMessage("Success", "Imaging Order updated successfully.", "success", 3000);
                        else
                            showMessage("Success", "Lab Order updated successfully.", "success", 3000);

                        handleFormatData(result.data);
                        setState(result.data);
                        setIsSaveCall(false);
                        setLoading({ isSaving: false });


                    }
                }

            }
            else {

                showMessage("Error", result.message, "error", 3000);
                setIsSaveCall(false);
                setLoading({ isSaving: false });
            }
        })


    }

    function handleDataFormat() {

        finalState.labOrderId = state.labOrderId;
        finalState.patientEncounterId = state.patientEncounterId;
        finalState.patientId = parseInt(state.patientId);

        finalState.secondaryInsuranceId = state.secondaryInsuranceId;
        finalState.primaryProviderId = state.primaryProviderId;

        finalState.locationId = state.locationId ? parseInt(state.locationId) : null;
        finalState.primaryInsuranceId = state.primaryInsuranceId;
        finalState.primaryInsuranceId = state.primaryInsuranceId ? parseInt(state.primaryInsuranceId) : null;
        finalState.secondaryInsuranceId = state.secondaryInsuranceId ? parseInt(state.secondaryInsuranceId) : null;
        finalState.primaryProviderId = state.primaryProviderId ? parseInt(state.primaryProviderId) : null;
        finalState.orderingProviderId = state.orderingProviderId ? parseInt(state.orderingProviderId) : null;
        finalState.testTypeCode = state.testTypeCode;
        finalState.isElab = state.isElab;
        finalState.internalNote = state.internalNote;
        finalState.labNote = state.labNote;
        finalState.billToTypeCode = state.billToTypeCode;
        finalState.financialGaurantor = state.financialGaurantor;
        finalState.recentDiagnoseId = state.recentDiagnoseId;
        finalState.chartNote = state.chartNote;
        finalState.isDeleted = state.isDeleted;
        finalState.createdBy = state.createdBy;
        finalState.updatedBy = state.updatedBy;
        finalState.createDate = state.createDate;
        finalState.recentTestName = state.recentTestName;
        finalState.recentTestID = state.recentTestID;
        finalState.recentDiagnoseName = state.recentDiagnoseName;
        finalState.orderSepcificDatetime = state.orderSepcificDatetime ? new Date(state.orderSepcificDatetime) : state.orderSepcificDatetime;
        finalState.performTestOnSpecificDate = state.performTestOnSpecificDate;
        finalState.orderStatus = state.orderStatus;
        finalState.vendorName = state.vendorName;
        finalState.allOrderTest = state.allOrderTest;
        finalState.labId = state.labId == 'Other' ? 0 : parseInt(state.labId);
        finalState.orderStatus = state.orderStatus ? state.orderStatus : 'Pending';
        finalState.labOrderSpecimen = state.labOrderSpecimen;
        finalState.labOrderTest = state.labOrderTest;
        finalState.labOrderDiagnosis = state.labOrderDiagnosis;


    }

    function handleFormatData(dataSet) {
        dataSet.orderTests = dataSet.labOrderTest;
        if (dataSet.orderTests.length > 0) {

            if (dataSet.orderTests[0]) {
                if (dataSet.orderTests[0].labId === null) {
                    dataSet.labId = 'Other';
                    dataSet.vendorName = dataSet.orderTests[0].vendorName;
                }
                else
                    dataSet.labId = dataSet.orderTests[0].labId;
            }

        }

        if (dataSet.labOrderSpecimen) {
            dataSet.labOrderSpecimen.map((item, i) => {

                item.collectionDatetime = item.collectionDatetime ?
                    item.collectionDatetime.split(':')[0] + ':' + item.collectionDatetime.split(':')[1] : new Date().toISOString().split(':')[0]
                    + ':' + new Date().toISOString().split(':')[1]
            });
        }
        dataSet.orderDiagnoses = dataSet.labOrderDiagnosis ? dataSet.labOrderDiagnosis : [];
        dataSet.uniqueOrderDiagnosis = dataSet.labOrderDiagnosis ? dataSet.labOrderDiagnosis : [];

    }
    function getTemplateClick(data) {


        setState(prevState => ({
            ...prevState,
            labId: data.labId,
            orderDiagnoses: data.labOrderTemplateDiagnosisLst,
            labOrderDiagnosis: data.labOrderTemplateDiagnosisLst,
            labOrderTest: data.labOrderTemplateTestLst,
            orderTests: data.labOrderTemplateTestLst
        }))

        handleClose();
    }

    function handleOnNext(newState) {

        handleNext(newState);
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    function deleteSingleDiagnoses(rowindex, labTestId) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnose?", "confirm", function () {

            let diagnoseName = state.orderDiagnoses[rowindex].diagnosis;
            let labOrderDiagnosistSingleId = state.orderDiagnoses[rowindex].labOrderDiagnosistId;

            if (labOrderDiagnosistSingleId > 0)
                state.orderDiagnoses[rowindex].isDeleted = true;
            else
                state.orderDiagnoses.splice(rowindex, 1);

            //state.orderDiagnoses.map((itm, i) => {
            //    if (diagnoseName == itm.diagnosis && itm.labTestId === labTestId)
            //        state.orderDiagnoses.splice(i, 1);
            //});

            setState(prevstate => ({
                ...prevstate,
                orderDiagnoses: state.orderDiagnoses,
            }));

            let isExistsInUnqiue = true;

            state.uniqueOrderDiagnosis.map((itm, i) => {
                if (diagnoseName == itm.diagnosis && itm.labTestId === labTestId)
                    isExistsInUnqiue = false;
            });

            if (!isExistsInUnqiue) {

                state.uniqueOrderDiagnosis = state.orderDiagnoses;
                state.uniqueOrderDiagnosis = [...new Map(state.uniqueOrderDiagnosis.map(o => [o["diagnosis"], o])).values()]; // Removed Repeted Data

                setState(prevState => ({
                    ...prevState,
                    uniqueOrderDiagnosis: state.uniqueOrderDiagnosis
                }));
            }

            //var data = {
            //    labOrderDiagnosistId: labOrderDiagnosistSingleId,
            //    isSingleRecord: true
            //}

            //PostDataAPI("patient/labOrder/deleteMultipleDiagnoses", data, true).then((result) => {

            //    if (result.success) {                   
            //    }
            //    else
            //        showMessage("Error", result.message, "error", 8000);
            //})

        });
    }
    const closeDemographics = () => setDemographicsDialogOpenClose(false)
    return (
        <>
            {/* 
            <Popper style={{ zIndex: 11111 }} id={id} open={open} anchorEl={anchorEl} role={undefined}>
                <Paper>
                    <ClickAwayListener onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">

                            <MenuItem data-id="saveAs" onClick={saveAsLabOrderTemplate}>Save As Template</MenuItem>
                               

                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper> */}

            <div className={classes.box}>

                <div className={classes.header} id="draggable-dialog-title">
                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    <FormGroupTitle>{props.imagingOrder ? "Image Order" : "Lab Order"} {state ? state.labOrderId > 0 ? `# ${state.labOrderId}` : "" : null}</FormGroupTitle>

                </div>

                <Scrollbars autoHeight autoHeightMax={575}>
                    <div className={classes.content}>
                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Label title={props.imagingOrder ? "Image Order" : "Lab Order"} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <SelectField
                                        placeholder={"Select " + props.imagingOrder ? " Image Order" : "Lab Order"}
                                        name="labId"
                                        value={state.labId}
                                        onChange={handleChange}
                                        options={labOrderVendors}
                                        disabled
                                    />

                                </Grid>
                            </Grid>
                            {state.labId == 'Other' ?
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "none" }}>
                                    <Label title={"Select " + props.imagingOrder ? " Image Order Name" : "Lab Order Name"} size={3} />
                                    <Grid item direction="row" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            name="vendorName"
                                            value={state.vendorName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                : null
                            }
                            <div className={classes.orderTest}>
                                <div className={classes.orderTestHeader}>
                                    <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                        {props.imagingOrder ? "Imaging and Diagnoses" : "Order Test(s)"}
                                    </Typography>
                                </div>
                                <div className={classes.orderTestContent}>
                                    {/*<Scrollbars autoHeight autoHeightMax={200} style={{maxHeight: "calc(100% - 64px)"}}>*/}
                                    <ul className={classes.orderList}>
                                        {
                                            state.labOrderTest ?
                                                state.labOrderTest.map((item, k) => (
                                                    item.isDeleted == false ?
                                                        <>
                                                            <li key={item.labTestId}>
                                                                {item.testName}
                                                                <span className={classes.deleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteRowOrderTest(item.labTestId, k, item.labOrderTestId)} /></span>
                                                            </li>

                                                            <table className={classes.labOrderTable} >
                                                                <thead className={classes.labOrderTableHead}>
                                                                    <tr>
                                                                        <td colspan="1" className={classes.labOrderTableHeadLabel}>Order Diagnosis</td>
                                                                        {props.imagingOrder ? <td colspan="1" className={classes.labOrderTableHeadLabel}>Stat</td> : null}
                                                                        {props.imagingOrder ? <td></td> : <td colspan="1" className={classes.labOrderTableHeadLabel}>Specimen</td>}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        state.labOrderDiagnosis ?
                                                                            state.labOrderDiagnosis.filter(tmprm => tmprm.labTestId == state.labOrderTest[k].labTestId).map((diagnosisItem, k) => (
                                                                                //state.labOrderDiagnosis[k].map((diagnosisItem, i) => (
                                                                                diagnosisItem.isDeleted == false ?
                                                                                    <tr>
                                                                                        <td >
                                                                                            <Typography className={classes.labOrderTableLabel} style={{ fontWeight: 700 }}>{"( " + diagnosisItem.icdCode + " )"} - {diagnosisItem.diagnosis}</Typography>
                                                                                        </td>
                                                                                        {
                                                                                            props.imagingOrder ?
                                                                                                <td>
                                                                                                    <Typography className={classes.labOrderTableLabel}>{state.labOrderTest[k] ? state.labOrderTest[k].isStat ? 'Yes' : 'No' : 'No'}</Typography>

                                                                                                </td>

                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            props.imagingOrder ?
                                                                                                <td><span className={classes.deleteDiagnosisIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteSingleDiagnoses(k, diagnosisItem.labTestId)} /></span></td>
                                                                                                :
                                                                                                <td >
                                                                                                    <Typography className={classes.labOrderTableLabel}>{state.labOrderSpecimen ? state.labOrderSpecimen[k] ? state.labOrderSpecimen[k].specimenType : null : null}</Typography>
                                                                                                </td>
                                                                                        }
                                                                                    </tr>
                                                                                    : null
                                                                            ))
                                                                            : null
                                                                    }
                                                                </tbody>
                                                            </table>

                                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: "10px 0px 0px" }}>
                                                                <Grid item xs={12} sm={1} md={1} lg={1} xl={1}></Grid>
                                                                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                                    <CheckboxField
                                                                        id={k}
                                                                        color="primary"
                                                                        name="performTestOnSpecificDate"
                                                                        label={props.imagingOrder ? "Perform studies on specific Date/time." : "Perform Test on specific Date/time"}
                                                                        checked={item.performTestOnSpecificDate ? true : false}
                                                                        onChange={handleChkboxChangeDynamic}
                                                                    />
                                                                </Grid>
                                                                <Label title="Order Date/Time" size={2} />
                                                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                                                    <InputBaseField
                                                                        id={k}
                                                                        placeholder="Date"
                                                                        type="datetime-local"
                                                                        name="orderSepcificDatetime"
                                                                        value={item.orderSepcificDatetime}
                                                                        onChange={handleChkboxChangeDynamic}
                                                                        MaxLength='8'
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : null
                                                ))
                                                : null
                                        }
                                    </ul>
                                    {/*</Scrollbars>*/}
                                </div>
                            </div>

                            {props.imagingOrder === false ? <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Label title="Clinical Notes" size={2} isTextAreaInput={true} />
                                <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Clinical Notes"
                                        onChange={handleChange}
                                        name="internalNote"
                                        value={state.internalNote}
                                        MaxLength="2000"
                                    />
                                </Grid>
                            </Grid> : null}

                            <div className={classes.orderTest}>
                                <div className={classes.customTestHeader}>
                                    <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>Payment</Typography>
                                </div>
                                <div className={classes.orderTestContent}>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Payment Type" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                placeholder="Select Payment Type"
                                                name="billToTypeCode"
                                                value={state.billToTypeCode}
                                                onChange={handleChange}
                                                options={paymentProfileCodes}
                                            />
                                        </Grid>
                                    </Grid>
                                    {state.billToTypeCode == "Insurance" ? <>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Primary Insurance" size={2} />
                                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                <InputBaseField
                                                    name="primaryInsurance"
                                                    value={props.patientState?.primaryInsurance}
                                                    onChange={handleChange}
                                                    disabled={true}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                <span className={classes.listIcon}></span>  {/*<img src={Eraser} className={classes.img} />*/}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Secondary Insurance" size={2} />
                                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                <InputBaseField
                                                    name="secondaryInsurance"
                                                    value={props.patientState?.secondaryInsurance}
                                                    onChange={handleChange}
                                                    disabled={true}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                <span className={classes.listIcon}></span>  {/*<img src={Eraser} className={classes.img} />*/}
                                            </Grid>
                                        </Grid>
                                    </>
                                        : ""}

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Guardian" size={2} />
                                        <Grid container alignItems="center" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <FormLabel onClick={() => setDemographicsDialogOpenClose(true)} className={classes.guarantorName} style={{ color: "#00B4E5" }}>{state.financialGaurantor}</FormLabel>
                                        </Grid>
                                    </Grid>

                                </div>
                            </div>

                            <div className={classes.orderTest}>
                                <div className={classes.customTestHeader}>
                                    <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>Provider</Typography>
                                </div>
                                <div className={classes.orderTestContent}>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Primary Provider" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                placeholder="Select primary provider"
                                                name="primaryProviderId"
                                                value={state.primaryProviderId}
                                                onChange={handleChange}
                                                options={primaryProvider}
                                            />
                                        </Grid>
                                        <Label title="Ordering Provider" size={3} />
                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                            <SelectField
                                                placeholder="Select ordering provider"
                                                name="orderingProviderId"
                                                value={state.orderingProviderId}
                                                onChange={handleChange}
                                                options={orderingProvider}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Location" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                placeholder="Select location"
                                                name="locationId"
                                                value={state.locationId}
                                                onChange={handleChange}
                                                options={primaryLocations}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Lab Notes" size={2} isTextAreaInput={true} />
                                        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                            <TextareaField
                                                rowsMin={5}
                                                placeholder="Lab Notes"
                                                onChange={handleChange}
                                                name="labNote"
                                                value={state.labNote}
                                                MaxLength="2000"
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Chart Note" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <SelectField
                                                placeholder="Select chart note"
                                                name="chartNote"
                                                value={state.chartNote}
                                                onChange={handleChange}
                                                options={chartNote}
                                            />
                                        </Grid>
                                    </Grid> */}
                                    {props.imagingOrder ?
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Chart Notes" size={2} isTextAreaInput={true} />
                                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                                <TextareaField
                                                    rowsMin={5}
                                                    placeholder="chartNotes"
                                                    onChange={handleChange}
                                                    name="chartNotes"
                                                    value={state.chartNotes}
                                                    MaxLength="2000"
                                                />
                                            </Grid>
                                        </Grid> : ""
                                    }
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Scrollbars>
                <div className={classes.footer}>
                    <FormBtn id="save" onClick={backForm} btnType="back"> Back </FormBtn>
                    <FormBtn id="save" className={classes.signBtn} onClick={saveAsLabOrderTemplate}>Save as Template</FormBtn>

                    <div className={classes.footerRight}>
                        <ButtonGroup >
                            {loading.isSaving ? <FormBtn className={classes.signBtn} id={"loadingSave"} size="medium">Saving</FormBtn>
                                :
                                <FormBtn id="save" size="medium" className={classes.signBtn} onClick={SaveLabOrder}>Save</FormBtn>
                            }
                            {/* <Button
                                className={classes.menuBtn}
                                data-id={1}
                                size="small"
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleRowAction}
                                endIcon={<ExpandMoreIcon />}>
                            </Button> */}
                        </ButtonGroup>
                        {state.labOrderId != 0 ? <FormBtn id="delete" onClick={() => DeleteRecord()}>Delete</FormBtn> : ""}
                        <FormBtn id="save" onClick={() => handleOnNext(state)} btnType="next">Next</FormBtn>

                        {state.labOrderId != 0 ?
                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </div>
                </div>
            </div>
            <LogDialog
                code="laborder"
                id={state.labOrderId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />

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
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                fullWidth={true}
            >
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box2}>
                        <div className={classes.header} id="draggable-dialog-title" style={{ cursor: "move" }}>
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Guardian</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={450} >
                            <div className={classes.content2}>
                                <ResponsibleParty dataId={props.labOrderStatePayment.patientId} isEditable={props.isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default withSnackbar(LabOrderPaymentForm)
