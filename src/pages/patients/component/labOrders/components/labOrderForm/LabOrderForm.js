import React, { useState, useEffect } from "react"
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Divider,
    Grid,
    Typography,
    Tab,
    InputBase,
    Tabs,
    Paper,
    ListItem,
    ListItemText,
    Box,
    List,
    Button,
    Avatar,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
    ButtonGroup
} from "@material-ui/core";
import PropTypes from 'prop-types';
import useStyles from "./styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BtnIcon from "../../../../../../images/icons/BtnIcon.png"
import AddIcon from '../../../../../../images/icons/add-icon.png';
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../../../images/icons/trash.png";
import EditIcon from "../../../../../../images/icons/erase.png";
import SettingIcon from "../../../../../../images/icons/darkSetting.png";
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import FavoriteIcon from '@material-ui/icons/StarBorder';
import FavoriteTrueIcon from '@material-ui/icons/Star';
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { InputBaseField, SelectField, TextareaField, CheckboxField, Link } from "../../../../../../components/InputField/InputField";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from "../../../../../../Services/PostDataAPI"
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { FormBtn, FormGroupTitle, Label, LinkS, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import Popover from '@material-ui/core/Popover';
import SearchList from "../../../../../../components/SearchList/SearchList";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LeftTabList from "../leftSideList/LeftTabList";
import LabOrderPaymentForm from "../paymentForm/LabOrderPaymentForm";
import { Scrollbars } from "rc-scrollbars";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { IsEditable } from '../../../../../../Services/GetUserRolesRights';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function LabOrderForm({ showHideDialog, isLastStep, handleBack, handleNext, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;
    const [isEditable] = useState(userdata.isProvider ? true : (props.imagingOrder == true ? IsEditable("imaging") : IsEditable("lab")));
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [labOrderPaymentFormDialog, setLabOrderPaymentFormDialog] = useState(false);
    const [isAddSpecimen, setIsAddSpecimen] = useState(false);
    const [state, setState] = useState(props.labOrderState);
    const [labOrderTestsCount, setLabOrderTestsCount] = useState(0);
    const [orderSpecimen, setOrderSpecimen] = useState({
        labOrderSpecimenId: 0, labOrderTestId: null, specimenType: "", collectionDateTime: "", specimenNote: "", noOfLabels: null, isDeleted: false,
        createdBy: 0, updatedBy: 0, createDate: new Date()
    });
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const labOrderFormRef = useState({ collectionDateTimeRef: "", });

    const [stateSaveAsTemplate, setStateSaveAsTemplate] = useState({

        labOrderTemplateId: 0, locationId: 0, labId: 0, templateName: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), isElab: props.imagingOrder,
        labOrderTemplateTestLst: [],
        LabOrderTemplateDiagnosisLst: []

    })
    const [isSaveCall, setIsSaveCall] = useState(false);
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);

    const [finalState, setFinalState] = useState({
        labOrderId: 0, patientEncounterId: null, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
        orderingProviderId: null, testTypeCode: "", isElab: false, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "", recentDiagnoseId: "",
        chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", recentTestName: "", recentTestID: "", recentDiagnoseName: "",
        orderSepcificDatetime: null, performTestOnSpecificDate: false, orderStatus: "Pending", vendorName: "", allOrderTest: false,

        labOrderSpecimen: [],
        labOrderTest: [],
        labOrderDiagnosis: []
    });


    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showHideTemplateNameDialog, setShowHideTemplateNameDialog] = useState(false);
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

    const [errorMessages, setErrorMessages] = useState({
        errorSpecimenType: false, errorCollectionDateTime: false, errorSpecimenNotes: false
    })
    const [isAddDiagnosis, setIsAddDiagnosis] = useState(false);
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


    //hanlde functions

    useEffect(() => {
        if (props.labOrderState != null) {
            let labOrderTestsIndex = 0;
            while (state.orderTests && state.orderTests.length > 0 && state.orderTests[labOrderTestsIndex].isDeleted) {
                labOrderTestsIndex = labOrderTestsIndex + 1;
            }
            setLabOrderTestsCount(labOrderTestsIndex);
            setState(props.labOrderState);
        }

    }, [showHideDialog, props.labOrderState.labOrderDiagnosis]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name == 'templateName') {
            setStateSaveAsTemplate(prevState => ({
                ...prevState,
                [name]: value
            }));
            if (value && value != '') {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorTemplateName: false
                }));
            }
        }
        else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleChangeTestNote = (e) => {

        const { name, value } = e.target;


        if (state.labOrderTest[labOrderTestsCount]) {
            state.labOrderTest[labOrderTestsCount][name] = value;
        }

        setState(prevState => ({
            ...prevState,
            labOrderTest: state.labOrderTest

        }));

    }

    const handleChangeSpecimenType = (e) => {
        const { name, value } = e.target;
        let val = '';

        if (name === "noOfLabels")
            val = parseInt(value);
        else
            val = value;

        setOrderSpecimen(prevState => ({
            ...prevState,
            [name]: val
        }));

    }

    const handleSearchSpecimenType = (name, item) => {

        const { id, value } = item;

        setOrderSpecimen(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const handleChkboxChange = (e) => {


        const { name, value } = e.target;
        state.labOrderTest[labOrderTestsCount][name] = !state.labOrderTest[labOrderTestsCount][name]

        setState(prevState => ({
            ...prevState,
            labOrderTest: state.labOrderTest

        }));

    }
    const handleAction = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        setDropDownActionId(e.currentTarget.dataset.id);
    }

    function deleteRowOrderTest(index) {

        state.orderTests.splice(index, 1);

        setState(prevState => ({
            ...prevState,
            orderTests: state.orderTests
        }));
    }

    function deleteRowOrderDiagnoses(labTestId, rowindex) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnose?", "confirm", function () {

            let diagnoseName = state.orderDiagnoses[rowindex].diagnosis;
            let labOrderDiagnosistSingleId = state.orderDiagnoses[rowindex].labOrderDiagnosistId;

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

            //state.orderDiagnoses.map((itm, i) => {
            //    if (diagnoseName == itm.diagnosis && itm.labTestId === labTestId)
            //    {
            if (labOrderDiagnosistSingleId > 0)
                state.orderDiagnoses[rowindex].isDeleted = true;
            else
                state.orderDiagnoses.splice(rowindex, 1);

            // }

            // });

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

        });
    }

    function deleteSpecimen(obj, index) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Specimen?", "confirm", function () {

            let labOrderTest_Id = state.labOrderSpecimen[index].labOrderTestId;
            let labOrderSpecimenId = state.labOrderSpecimen[index].labOrderSpecimenId;

            //if (labOrderSpecimenId > 0) {

            //var data = {
            //    labOrderTestId: labOrderTest_Id
            //}
            //PostDataAPI("patient/labOrder/deleteMultipleSpecimens", data, true).then((result) => {

            //    if (result.success) {

            //        showMessage("Success", "Record deleted successfully.", "success", 2000);

            //    }
            //    else {
            //        showMessage("Error", result.message, "error", 8000);
            //    }

            //})

            //}

            if (state.labOrderSpecimen) {

                if (labOrderSpecimenId > 0)
                    state.labOrderSpecimen[index].isDeleted = true;
                else
                    state.labOrderSpecimen.splice(index, 1);

            }

            setState(prevState => ({
                ...prevState,
                labOrderSpecimen: state.labOrderSpecimen,
            }));

        });
    }

    function validateSpeciment(errorList) {

        if (isAddSpecimen) {

            if (orderSpecimen.collectionDateTime === null || orderSpecimen.collectionDateTime == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCollectionDateTime: true
                }));
                errorList.push(true);
                // labOrderFormRef.collectionDateTimeRef.focus();
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCollectionDateTime: false
                }));
            }

            if (orderSpecimen.specimenType === null || orderSpecimen.specimenType == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorSpecimenType: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorSpecimenType: false
                }));
            }

            if (orderSpecimen.specimenNote === null || orderSpecimen.specimenNote == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorSpecimenNotes: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorSpecimenNotes: false
                }));
            }
        }

    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }


    function movedToNextPaymentForm() {

        let labOrderTests_Count;
        labOrderTests_Count = labOrderTestsCount;
        labOrderTests_Count = labOrderTests_Count + 1;
        while (state.orderTests.length !== labOrderTests_Count && state.orderTests[labOrderTests_Count].isDeleted == true) {
            labOrderTests_Count = labOrderTests_Count + 1;
        }
        if (state.orderTests.length === labOrderTests_Count) {

            state.isCallToPaymentForm = true;
            handleNext(state);
            // setLabOrderPaymentFormDialog(true);
            //setLabOrderTestsCount(0);
        }
        else {
            state.isCallToPaymentForm = false;

            setLabOrderPaymentFormDialog(false);

            MapMovedToNextSpecimen();
            //labOrderTests_Count = labOrderTests_Count + 1;

            props.ActiveDiagnosis(labOrderTests_Count);
            setLabOrderTestsCount(labOrderTests_Count);
            if (state.orderTests.length != state.labOrderTest.length) {
                if (!state.labOrderTest[labOrderTests_Count]) {
                    setLabOrderTestAndDiagnoses();
                }
            }
        }
        // End Update LabTestId in Diagnoses 

    }

    function MapMovedToNextSpecimen() {
        let _labOrderSpecimen = [];

        if (state.labOrderSpecimen != null) {

            state.labOrderSpecimen.map((itm, i) => {

                _labOrderSpecimen.push({
                    labOrderSpecimenId: itm.labOrderSpecimenId, labOrderTestId: itm.labOrderTestId, labTestId: itm.labTestId, specimenType: itm.specimenType,
                    collectionDateTime: itm.collectionDatetime ?
                        itm.collectionDatetime.split(':')[0] + ':' + itm.collectionDatetime.split(':')[1] : new Date().toISOString().split(':')[0]
                        + ':' + new Date().toISOString().split(':')[1], specimenNote: itm.specimenNote, noOfLabels: itm.noOfLabels,
                    isDeleted: itm.isDeleted, createDate: itm.createDate
                });

            });

            // set State
            setState(prevState => ({
                ...prevState,
                labOrderSpecimen: _labOrderSpecimen
            }));
        }

    }

    function back() {

        let labOrderTests_Count;

        labOrderTests_Count = labOrderTestsCount;
        labOrderTests_Count = labOrderTests_Count - 1;
        while (labOrderTests_Count >= 0 && state.orderTests[labOrderTests_Count].isDeleted == true) {
            labOrderTests_Count = labOrderTests_Count - 1;
        }

        if (labOrderTests_Count < 0) {
            handleBack(state);
        }
        else {
            setLabOrderTestsCount(
                labOrderTests_Count
            );


            //handleBack(state);
            setLabOrderPaymentFormDialog(false);
        }
        //handleBack(state);
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

    let _orderDiagnosesArray = [];
    const handleSearchOrderDiagnoses = (name, item) => {

        const { id, value } = item;
        var previousResult = [];
        var _orderDiagnosesArray = [];
        let _loopedArray = [];


        setState(prevState => ({
            ...prevState,
            recentDiagnoseId: id,
            recentDiagnoseName: value
        }));

        if (state.labOrderDiagnosis) {

            // if (state.labOrderDiagnosis[labOrderTestsCount]) {


            if (state.labOrderDiagnosis.filter(tmprm => tmprm.labTestId === state.labOrderTest[labOrderTestsCount].labTestId).filter(tmp => tmp.diagnosis == value) == "") {

                if (state.labOrderDiagnosis.length > 0)
                    previousResult = state.labOrderDiagnosis;
                _orderDiagnosesArray.push({
                    labOrderDiagnosistId: 0, labTestId: parseInt(state.labOrderTest[labOrderTestsCount].labTestId), diagnosisId: null,
                    isDeleted: false, icdCode: id, diagnosis: value, isStat: false, isInternalCollection: true, isDeleted: false, createdBy: 0,
                    updatedBy: 0, createDate: new Date()
                });

                state.uniqueOrderDiagnosis.push({
                    labOrderDiagnosistId: 0, labTestId: parseInt(state.labOrderTest[labOrderTestsCount].labTestId), diagnosisId: null,
                    isDeleted: false, icdCode: id, diagnosis: value, isStat: false, isInternalCollection: true, isDeleted: false, createdBy: 0,
                    updatedBy: 0, createDate: new Date()
                });

                //if (state.uniqueOrderDiagnosis.filter(tmp => tmp.diagnosis == value) == "")
                //{
                //    state.uniqueOrderDiagnosis.push({
                //        labOrderDiagnosistId: 0, labTestId: parseInt(state.labOrderTest[labOrderTestsCount].labTestId), diagnosisId: null,
                //        isDeleted: false, icdCode: id, diagnosis: value, isStat: false, isInternalCollection: true
                //    });
                //}

                if (previousResult.length > 0) {
                    previousResult.map((item, i) => {

                        _orderDiagnosesArray.push({
                            labOrderDiagnosistId: item.labOrderDiagnosistId,
                            labOrderTestId: item.labOrderTestId,
                            labTestId: parseInt(item.labTestId), diagnosisId: item.diagnosisId, isDeleted: item.isDeleted,
                            icdCode: item.icdCode, diagnosis: item.diagnosis, isStat: item.isStat,
                            isInternalCollection: item.isInternalCollection, isDeleted: item.isDeleted,
                            createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate, updateDate: item.updateDate
                        });
                    });

                }

                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        labOrderDiagnosis: _orderDiagnosesArray,
                        orderDiagnoses: _orderDiagnosesArray,
                        recentDiagnoseId: '',
                        recentDiagnoseName: ''
                    }));

                }, 100);

            }
            else {
                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        recentDiagnoseId: '',
                        recentDiagnoseName: ''
                    }));

                }, 100);

                showMessage("Error", "Order diagnosis already exists", "error", 8000);
            }

            //}

        }

    }
    const openTemplateNameDialog = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)
        if (state.labId === "" || state.labId === null) {
            showMessage("Error", "Please select " + props.imagingOrder ? "Image Order" : "Lab Order", "error", 8000);
            return;
        }

        if (state.orderTests.length === 0) {
            showMessage("Error", "Please select al least 1 order test", "error", 8000);
            return;
        }

        if (state.orderDiagnoses.length === 0) {

            showMessage("Error", "Please select al least 1 order diagnose", "error", 8000);
            return;
        }
        setShowHideTemplateNameDialog(true);
    }
    function saveAsLabOrderTemplate(e) {
        if (!stateSaveAsTemplate.templateName || stateSaveAsTemplate.templateName == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTemplateName: true
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTemplateName: false
            }));
        }
        if (stateSaveAsTemplate.templateName && stateSaveAsTemplate.templateName != '') {
            let _labOrderTemplateTest = [];
            let _labOrderTemplateDiagnosis = [];
            stateSaveAsTemplate.labOrderTemplateId = 0;
            stateSaveAsTemplate.locationId = state.locationId ? state.locationId : null;
            stateSaveAsTemplate.labId = state.labId ? parseInt(state.labId) : null;
            //stateSaveAsTemplate.templateName = state.orderTests[0] ? state.orderTests[0].testName : "";

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
            setLoading({ isSaving: true });
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
                setLoading({ isSaving: false });
                setShowHideTemplateNameDialog(false);
            })
        }
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

            }
        })


    }

    function handleDataFormat() {


        MapMovedToNextSpecimen();
        setLabOrderTestAndDiagnoses();

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
        finalState.updateDate = state.updateDate;
        finalState.recentTestName = state.recentTestName;
        finalState.recentTestID = state.recentTestID;
        finalState.recentDiagnoseName = state.recentDiagnoseName;
        finalState.orderSepcificDatetime = state.orderSepcificDatetime;
        finalState.performTestOnSpecificDate = state.performTestOnSpecificDate;
        finalState.orderStatus = state.orderStatus;
        finalState.vendorName = state.vendorName;
        finalState.allOrderTest = state.allOrderTest;
        finalState.labId = state.labId == 'Other' ? 0 : parseInt(state.labId);
        finalState.orderStatus = state.orderStatus ? state.orderStatus : 'Pending';
        finalState.labOrderTest = state.labOrderTest;
        finalState.labOrderDiagnosis = state.labOrderDiagnosis;
        state.labOrderSpecimen.map((item, i) => {
            item.noOfLabels = item.noOfLabels ? parseInt(item.noOfLabels) : null;
        })
        finalState.labOrderSpecimen = state.labOrderSpecimen;

        //finalState.labOrderSpecimen.map((item, i) => {
        //    item.collectionDatetime = new Date(item.collectionDatetime) 
        //});

    }

    function setLabOrderTestAndDiagnoses() {


        let _labTestArray = [];
        let _labOrderDiagnosis = [];


        state.orderTests.map((item, i) => {

            _labTestArray.push({
                labOrderTestId: item.labOrderTestId, labOrderId: item.labOrderId, labTestId: parseInt(item.labTestId),
                labId: parseInt(state.labId), isDeleted: item.isDeleted, testName: item.testName, isStat: item.isStat,
                isInternalCollection: item.isInternalCollection, testNote: item.testNote, createdBy: item.createdBy,
                updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(),
                vendorName: state.vendorName
            });
        });


        if (state.orderDiagnoses) {
            state.orderDiagnoses.map((itm, k) => {

                if (_labOrderDiagnosis.filter(tmprm => tmprm.icdCode === itm.icdCode) == "") {

                    _labOrderDiagnosis.push({
                        labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: _labTestArray[0] ? parseInt(_labTestArray[0].labTestId) : null,
                        diagnosisId: null, isDeleted: false, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                        isStat: false, isInternalCollection: false, createdBy: itm.createdBy, updatedBy: itm.updatedBy,
                        createDate: itm.createDate ? itm.createDate : new Date()
                    });
                }

            });

            state.orderDiagnoses.map((im, k) => {

                _labOrderDiagnosis.push({
                    labOrderDiagnosistId: im.labOrderDiagnosistId, labOrderTestId: parseInt(im.labOrderTestId), labTestId: parseInt(im.labTestId),
                    diagnosisId: im.diagnosisId, isDeleted: im.isDeleted, icdCode: im.icdCode, diagnosis: im.diagnosis,
                    isStat: im.isStat ? true : false, isInternalCollection: im.isInternalCollection ? true : false, createdBy: im.createdBy,
                    updatedBy: im.updatedBy, createDate: im.createDate ? im.createDate : new Date()
                });
            });

        }

        // Previous fill

        setState(prevState => ({
            ...prevState,
            labOrderTest: _labTestArray,
            labOrderDiagnosis: _labOrderDiagnosis,
            orderDiagnoses: _labOrderDiagnosis
        }));

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

    function saveLabOrderSpecimen() {
        let _labOrderSpecimenArray = [];
        let errorList = [];



        validateSpeciment(errorList);

        if (errorList.length < 1) {

            // Get List

            if (state.labOrderSpecimen.filter(spe => spe.specimenType == orderSpecimen.specimenType) == "") {
                if (state.labOrderSpecimen) {

                    state.labOrderSpecimen.map((itm, i) => {
                        var colDateTime = itm.collectionDateTime ? itm.collectionDateTime.split(':')[0] + ':' + itm.collectionDateTime.split(':')[1]
                            : new Date().toISOString().split(':')[0] + ':' + new Date().toISOString().split(':')[1];
                        _labOrderSpecimenArray.push({
                            labOrderSpecimenId: itm.labOrderSpecimenId, labOrderTestId: itm.labOrderTestId, labTestId: parseInt(itm.labTestId),
                            specimenType: itm.specimenType, collectionDateTime: colDateTime,
                            specimenNote: itm.specimenNote, noOfLabels: itm.noOfLabels, isDeleted: itm.isDeleted, createDate: itm.createDate
                        });

                    });
                }

                // New 

                if (orderSpecimen != null) {
                    var colDateTime = orderSpecimen.collectionDateTime ? orderSpecimen.collectionDateTime.split(':')[0] + ':' + orderSpecimen.collectionDateTime.split(':')[1]
                        : new Date().toISOString().split(':')[0] + ':' + new Date().toISOString().split(':')[1];
                    _labOrderSpecimenArray.unshift({
                        labOrderSpecimenId: 0, labOrderTestId: 0, labTestId: parseInt(state.labOrderTest[labOrderTestsCount].labTestId), specimenType: orderSpecimen.specimenType,
                        collectionDateTime: colDateTime, specimenNote: orderSpecimen.specimenNote,
                        noOfLabels: orderSpecimen.noOfLabels, isDeleted: orderSpecimen.isDeleted, createDate: new Date()
                    });

                }

                // Clear
                setOrderSpecimen({
                    labOrderSpecimenId: 0, labOrderTestId: null, specimenType: "", collectionDateTime: "", specimenNote: "", noOfLabels: "", isDeleted: false
                })

                // set State
                setState(prevState => ({
                    ...prevState,
                    labOrderSpecimen: _labOrderSpecimenArray
                }));
            }
            else {
                showMessage("Error", "Specimen type " + orderSpecimen.specimenType + " already selected.", "error", 8000);
            }
        }
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

    function formatAMPM(date) {
        var today = new Date(date.split('T')[0]);
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = mm + '/' + dd + '/' + yyyy;

        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours < 10 ? '0' + hours + ':' + minutes + ' ' + ampm : hours + ':' + minutes + ' ' + ampm;
        return today + ' ' + strTime;
    }

    return (
        <>

            <div className={classes.box} >

                <div className={classes.header} id="draggable-dialog-title">
                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    <FormGroupTitle>{props.imagingOrder ? "Image Order" : "Lab Order"} {state ? state.labOrderId > 0 ? `# ${state.labOrderId}` : "" : null}</FormGroupTitle>

                </div>
                <div className={classes.content}>
                    <Scrollbars autoHeight autoHeightMax={575}>
                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingRight: "17px" }}>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={11} md={11} lg={11} xl={11}>
                                    <FormLabel className={classes.lableInput}>Complete test information ({labOrderTestsCount + 1 > state.orderTests.length ? state.orderTests.length : labOrderTestsCount + 1} of {state.orderTests.length})</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={11} md={11} lg={11} xl={11}>
                                    <FormLabel className={classes.lableInput}>{props.imagingOrder ? "Order Study" : "Order Test(s)"}</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justify="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item direction="row" xs={12} sm={1} md={1} lg={1} xl={1}></Grid>
                                <Grid item direction="row" xs={12} sm={4} md={4} lg={4} xl={3}>
                                    <FormLabel className={classes.testName}>{state.orderTests[labOrderTestsCount] ? state.orderTests[labOrderTestsCount].labTestId : null} - {state.orderTests[labOrderTestsCount] ? state.orderTests[labOrderTestsCount].testName : null}</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                {props.imagingOrder ?
                                    <>
                                        <Grid item xs={12} sm={1} md={1} lg={1}></Grid>
                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                            <CheckboxField
                                                color="primary"
                                                name="isStat"
                                                label="STAT"
                                                checked={state.labOrderTest[labOrderTestsCount] ? state.labOrderTest[labOrderTestsCount].isStat ? true : false : false}
                                                onChange={handleChkboxChange}
                                            />
                                        </Grid>
                                    </> :
                                    <>
                                        <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                            <CheckboxField
                                                color="primary"
                                                name="isInternalCollection"
                                                label="Collect at lab"
                                                checked={state.labOrderTest[labOrderTestsCount] ? state.labOrderTest[labOrderTestsCount].isInternalCollection ? true : false : false}
                                                onChange={handleChkboxChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                            <CheckboxField
                                                color="primary"
                                                name="isStat"
                                                label="Stat"
                                                checked={state.labOrderTest[labOrderTestsCount] ? state.labOrderTest[labOrderTestsCount].isStat ? true : false : false}
                                                onChange={handleChkboxChange}
                                            />
                                        </Grid>
                                    </>
                                }
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Label title={props.imagingOrder ? "Study Note" : "Internal Provider Note"} size={3} isTextAreaInput={true} />
                                <Grid item direction="row" xs={12} sm={8} md={8} lg={8} xl={8}>
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder={props.imagingOrder ? "Study Note" : "Internal Provider Note"}
                                        onChange={handleChangeTestNote}
                                        name="testNote"
                                        value={state.labOrderTest[labOrderTestsCount] ? state.labOrderTest[labOrderTestsCount].testNote : null}
                                        MaxLength="2000"
                                    />
                                </Grid>
                            </Grid>

                            <div className={classes.orderTest}>
                                <div className={classes.orderTestHeader}>
                                    <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                        {props.imagingOrder ? "Order Diagnosis" : "Diagnosis"}
                                    </Typography>
                                    <span className={classes.orderTestCheckBox}></span>

                                </div>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {
                                            state.labOrderDiagnosis ?
                                                state.labOrderDiagnosis.filter(tmprm => tmprm.labTestId == state.labOrderTest[labOrderTestsCount].labTestId).map((item, k) => (
                                                    item.isDeleted == false ?
                                                        <li key={item.icdCode} style={{ fontWeight: 700 }}>
                                                            {"( " + item.icdCode + " )"} - {item.diagnosis}
                                                            <span className={classes.deleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteRowOrderDiagnoses(item.labTestId, k)} /></span>
                                                        </li>
                                                        : null
                                                ))

                                                : null
                                        }

                                    </ul>
                                </div>
                                <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {isAddDiagnosis ?
                                        <Grid contaisner direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Add Diagnosis" size={3} mandatory={true} />
                                                <Grid item direction="row" xs={12} sm={6} md={6} lg={6} xl={6}>
                                                    <SearchList name={state.recentDiagnoseId} value={state.recentDiagnoseId} searchTerm={state.recentDiagnoseName} code="diagnosis"
                                                        apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleSearchOrderDiagnoses(name, item)}
                                                        placeholderTitle="Search Diagnosis" reload={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid> : ""}
                                    <span title="Add"><img className={classes.addIcon} src={AddIcon} alt="add" onClick={() => setIsAddDiagnosis(!isAddDiagnosis)} /></span>
                                    <span className={classes.addIconSpan} onClick={() => setIsAddDiagnosis(!isAddDiagnosis)}>
                                        {props.imagingOrder ? "Add a diagnosis for this study only" : "Add a diagnosis for this test only"}
                                    </span>
                                </Grid>
                            </div>
                            {props.imagingOrder ? null :
                                <div className={classes.orderTest}>
                                    <div className={classes.orderTestHeader}>
                                        <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                            Specimen(s)
                                        </Typography>
                                    </div>
                                    <div className={classes.orderTestContent}>
                                        
                                    </div>
                                    <div className={classes.specimenTestContent}>
                                        {state.labOrderSpecimen && state.labOrderSpecimen.length > 0 &&
                                            <>
                                                <table className={classes.specimenTable}>
                                                    {
                                                        state.labOrderSpecimen ?
                                                            state.labOrderSpecimen.length > 0 ?
                                                                <thead className={classes.specimenTableHead}>
                                                                    <th colSpan="1">Type</th>
                                                                    <th colSpan="1">Collection Date</th>
                                                                    <th colSpan="1">Notes</th>
                                                                    <th colSpan="1">Action</th>
                                                                </thead>
                                                                : null
                                                            : null
                                                    }
                                                    <tbody className={classes.specimenTableBody}>
                                                        {
                                                            state.labOrderSpecimen ?

                                                                // state.labOrderSpecimen.map((item, k) => (
                                                                state.labOrderSpecimen.filter(tmprm => tmprm.labTestId == state.labOrderTest[labOrderTestsCount].labTestId).map((item, l) => (
                                                                    <tr>
                                                                        <th colSpan="1" className={classes.specimenTableLabel}>
                                                                            {item.specimenType}
                                                                        </th>
                                                                        <th colSpan="1" className={classes.specimenTableLabel}>
                                                                            {item.collectionDateTime ? formatAMPM(item.collectionDateTime) : ""}

                                                                        </th>
                                                                        <th colSpan="1" className={classes.specimenTableLabel}>
                                                                            {item.specimenNote}
                                                                        </th>
                                                                        <th colSpan="1" className={classes.speicemanTableAction}>
                                                                            <span className={classes.specimenTableDeleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteSpecimen(item, l)} /></span>
                                                                        </th>
                                                                    </tr>
                                                                ))
                                                                : null
                                                        }
                                                    </tbody>
                                                </table>
                                                <FormGroupTitle></FormGroupTitle>
                                            </>
                                        }

                                        {
                                            isAddSpecimen ? <Grid contaisner direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Specimen Type" size={3} mandatory={true} />
                                                    <Grid item direction="row" xs={12} sm={9} md={9} lg={9} xl={9}>
                                                        <SearchList name="specimenType" value={orderSpecimen.specimenType} searchTerm={orderSpecimen.specimenType} code="specimenTypeCode"
                                                            apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleSearchSpecimenType(name, item)}
                                                            placeholderTitle="Search Specimen Type"
                                                        />
                                                        {errorMessages.errorSpecimenType && !orderSpecimen.specimenType ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select specimen type
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>
                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Collection Date/Time" size={3} mandatory={true} />
                                                    <Grid item direction="row" xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <InputBaseField
                                                            placeholder="Date"
                                                            type="datetime-local"
                                                            name="collectionDateTime"
                                                            value={orderSpecimen.collectionDateTime}
                                                            onChange={handleChangeSpecimenType}
                                                            MaxLength='8'
                                                        //inputProps={{ ref: input => labOrderFormRef.collectionDateTimeRef = input }}
                                                        />
                                                        {errorMessages.errorCollectionDateTime && !orderSpecimen.collectionDateTime ?
                                                            (<FormHelperText style={{ color: "red" }} >
                                                                Please select collection date time
                                                            </FormHelperText>) : ('')}
                                                    </Grid>
                                                    <Label title="# of labels" size={2} />
                                                    <Grid item direction="row" xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <InputBaseField
                                                            type="number"
                                                            name="noOfLabels"
                                                            value={orderSpecimen.noOfLabels == 0 || orderSpecimen.noOfLabels == "" ? "" : orderSpecimen.noOfLabels}
                                                            onChange={handleChangeSpecimenType}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Specimen Notes" size={3} mandatory={true} isTextAreaInput={true} />
                                                    <Grid item direction="row" xs={12} sm={9} md={9} lg={9} xl={9}>
                                                        <TextareaField
                                                            rowsMin={5}
                                                            placeholder="Specimen Notes"
                                                            onChange={handleChangeSpecimenType}
                                                            name="specimenNote"
                                                            value={orderSpecimen.specimenNote}
                                                            MaxLength="500"
                                                            inputProps={{ ref: input => labOrderFormRef.specimenNoteRef = input }}
                                                        />
                                                        {errorMessages.errorSpecimenNotes && !orderSpecimen.specimenNote ?
                                                            (<FormHelperText style={{ color: "red" }} >
                                                                Please enter specimen notes
                                                            </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>
                                            </Grid> : ""}

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container direction="row" xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <span title="Add"><img className={classes.addIcon} src={AddIcon} alt="add"
                                                    onClick={() => setIsAddSpecimen(false)} /></span>
                                                <span className={classes.addIconSpan} onClick={() => setIsAddSpecimen(!isAddSpecimen)}>Add a specimen for collection</span>
                                            </Grid>
                                            <Grid container justify="flex-end" direction="row" xs={6} sm={6} md={6} lg={6} xl={6}>
                                                {isAddSpecimen ?
                                                    <FormBtn id="save" onClick={saveLabOrderSpecimen}>Add</FormBtn>
                                                    : ""}
                                            </Grid>
                                        </Grid>
                                    </div>

                                </div>
                            }
                        </Grid>
                    </Scrollbars>
                </div>

                <div className={classes.footer}>
                    <FormBtn id="save" onClick={back} btnType="back"> Back </FormBtn>
                    {loading.isSaving ? <FormBtn className={classes.signBtn} id={"loadingSave"} size="medium">Saving</FormBtn>
                        :
                        <FormBtn id="save" className={classes.signBtn} onClick={openTemplateNameDialog}>Save as Template</FormBtn>
                    }
                    <div className={classes.footerRight}>
                        <ButtonGroup >
                            {loading.isSaving ? <FormBtn className={classes.signBtn} id={"loadingSave"} size="medium">Saving</FormBtn>
                                :
                                <FormBtn id="save" size="medium" className={classes.signBtn} onClick={SaveLabOrder}>Save</FormBtn>
                            }
                            
                        </ButtonGroup>
                        {state.labOrderId != 0 ? <FormBtn id="delete" onClick={() => DeleteRecord()}>Delete</FormBtn> : ""}
                        <FormBtn id="save" onClick={() => movedToNextPaymentForm()} btnType="next">Next</FormBtn>

                        {state.labOrderId != 0 ?
                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                        {/*<FormBtn id="save" >Next</FormBtn>*/}
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
                open={showHideTemplateNameDialog}
                classes={{ paper: classes.tempDialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                maxWidth={"md"}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={() => { setShowHideTemplateNameDialog(false) }}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Template Name</FormGroupTitle>

                        </div>
                        <div className={classes.Templatecontent}>

                            <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Name" size={5} mandatory={true} />

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <InputBaseField
                                        id="templateName"
                                        name="templateName"
                                        value={stateSaveAsTemplate.templateName}
                                        onChange={handleChange}
                                        placeholder={"Template Name"}

                                    />
                                    {errorMessages.errorTemplateName && !stateSaveAsTemplate.templateName ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter template name
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                        </div>
                        <div className={classes.footer}>
                            <Grid container justify="center" >
                                {loading.isSaving ?
                                    <FormBtn id="loadingSave"  > Ok</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={saveAsLabOrderTemplate}> Ok</FormBtn>
                                }
                                <FormBtn id="reset" onClick={() => { setShowHideTemplateNameDialog(false) }}> Close </FormBtn>
                            </Grid>
                        </div>
                    </div>
                </div>

            </Dialog>
        </>
    );
}

export default withSnackbar(LabOrderForm)

