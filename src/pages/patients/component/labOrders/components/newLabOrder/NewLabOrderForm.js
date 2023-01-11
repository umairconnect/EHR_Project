import React, { useState, useEffect } from "react"
import {
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
    FormHelperText,
    Stepper, Step, StepLabel
} from "@material-ui/core";
import useStyles from "./styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../../../images/icons/trash.png";
import { InputBaseField, SelectField, CheckboxField } from "../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LeftTabList from "../leftSideList/LeftTabList";
import LabOrderForm from "../labOrderForm/LabOrderForm";
import LabOrderPaymentForm from "../paymentForm/LabOrderPaymentForm";
import SubmitForm from "../submitForm/SubmitForm";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { Scrollbars } from "rc-scrollbars";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { IsEditable } from '../../../../../../Services/GetUserRolesRights';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
function NewLabOrderForm({ showHideDialog, handleClose, encounterId, labOrderData, ...props }) {

    // handle styles
    const classes = useStyles();
    //

    // stepper values
    const steps = ['New Lab Order', 'Lab Order', 'Payment Form', 'Submit Form'];
    const [activeStep, setActiveStep] = useState(0);
    //
    const [activeDaignosis, setActiveDiagnosis] = useState(-1);
    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;

    // handle const data
    const { showMessage } = props;
    //
    //Left Side Menu Update
    const [isTemplateUpdated, setIsTemplateUpdated] = useState(false);
    const [isEditable] = useState(userdata.isProvider ? true : (props.imagingOrder == true ? IsEditable("imaging") : IsEditable("lab")));

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });


    const [state, setState] = useState({
        labOrderId: 0, patientEncounterId: encounterId, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
        orderingProviderId: null, testTypeCode: "", isElab: props.imagingOrder, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "", recentDiagnoseId: "",
        chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", recentTestName: "", recentTestID: "", recentDiagnoseName: "",
        orderSepcificDatetime: null, performTestOnSpecificDate: false, orderStatus: "Pending", vendorName: "", allOrderTest: false, isCallToPaymentForm: false, allOrderSTAT: false,

        orderTests: [],
        orderDiagnoses: [],
        labOrderSpecimen: [],
        labOrderTest: [],
        labOrderDiagnosis: [],
        uniqueOrderDiagnosis: []
    });
    const [patientState, setPatientState] = useState({});
    const newLabOrdeFormRef = useState({ vendorForOrderRef: "" })
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [finalState, setFinalState] = useState({
        labOrderId: 0, patientEncounterId: encounterId, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
        orderingProviderId: null, testTypeCode: "", isElab: props.imagingOrder, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "", recentDiagnoseId: "",
        chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", recentTestName: "", recentTestID: "", recentDiagnoseName: "",
        orderSepcificDatetime: null, performTestOnSpecificDate: false, orderStatus: "Pending", vendorName: "", allOrderTest: false, allOrderSTAT: false,

        labOrderSpecimen: [],
        labOrderTest: [],
        labOrderDiagnosis: []
    });

    if (state.orderDiagnoses) {
        let _loopedArray = [];

        state.uniqueOrderDiagnosis = state.orderDiagnoses;
        state.uniqueOrderDiagnosis = [...new Map(state.uniqueOrderDiagnosis.map(o => [o["diagnosis"], o])).values()]; // Removed Repeted Data
    }
    const handleNext = (newState) => {
        console.log("state" + state);
        if (newState) {

            state.labOrderSpecimen = newState.labOrderSpecimen ? newState.labOrderSpecimen : state.labOrderSpecimen;
            state.labOrderDiagnosis = newState.labOrderDiagnosis ? newState.labOrderDiagnosis : state.labOrderDiagnosis;
            state.orderDiagnoses = newState.orderDiagnoses ? newState.orderDiagnoses : state.orderDiagnoses;
            state.isCallToPaymentForm = newState.isCallToPaymentForm;
            setState({ ...state, ...newState });
        }

        let errorList = [];
        validateLabOrder(errorList);

        if (activeDaignosis === -1)
            setActiveDiagnosis(0);

        if (errorList.length < 1) {

            MoveNextState();
            setActiveStep(activeStep + 1);

            // setLabOrderFormDialog(true);
        }
        console.log("state" + state);
        // setActiveStep(activeStep + 1);
    };

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    const handleBack = (newState) => {

        if (newState) {
            setState({ ...state, ...newState });
        }
        setActiveStep(activeStep - 1);
    };
    const [showHideTemplateNameDialog, setShowHideTemplateNameDialog] = useState(false);
    function getStepContent(step) {

        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle>{props.imagingOrder ? "Image Order" : "Lab Order"} {state ? state.labOrderId > 0 ? `# ${state.labOrderId}` : "" : null}</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Scrollbars style={{ minHeight: "400px" }}>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingRight: "17px" }}>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={11} md={11} lg={11} xl={11}>
                                        <FormLabel className={classes.lableInput}>
                                            {/*   {props.imagingOrder ?*/}
                                            Select lab, studies and diagnosis for this order
                                            {/*: "Select a Lab Order, test(s) and diagnose(s) for this order"*/}
                                            {/*}*/}
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Lab" size={3} mandatory={true} />
                                    <Grid item direction="row" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <SelectField
                                            placeholder="Select Lab"
                                            name="labId"
                                            value={state.labId}
                                            onChange={handleChange}
                                            options={labOrderVendors}
                                        // inputProps={{ ref: input => newLabOrdeFormRef.vendorForOrderRef = input }}
                                        />
                                        {props.imagingOrder ? errorMessages.errorVendor && !state.labId ? (<FormHelperText style={{ color: "red" }} >
                                            Please select lab  </FormHelperText>) : ('') :
                                            errorMessages.errorVendor && !state.labId ? (<FormHelperText style={{ color: "red" }} >
                                                Please select lab
                                            </FormHelperText>) : ('')
                                        }
                                    </Grid>
                                </Grid>
                                {state.labId == 'Other' ?
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Lab Name" mandatory={true} size={3} />
                                        <Grid item direction="row" xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                                name="vendorName"
                                                value={state.vendorName}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorOtherLab && (!state.vendorName || state.vendorName == undefined) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter lab name  </FormHelperText>) : ('')
                                            }
                                        </Grid>
                                    </Grid>
                                    : null
                                }

                                <div className={classes.orderTest}>
                                    {props.imagingOrder ? <>
                                        <div className={classes.orderTestHeader}>
                                            <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                                {props.imagingOrder ? "Order  Imaging(s)" : "Order Test(s)"}
                                            </Typography>
                                            {/* <div className={classes.orderTestCheckBox}> */}
                                            <CheckboxField
                                                color="primary"
                                                name="allOrderSTAT"
                                                label={"STAT"}
                                                checked={state.allOrderSTAT ? true : false}
                                                onChange={handleChkboxChangeA}
                                            />
                                            {/* </div> */}
                                        </div>
                                    </> :
                                        <div className={classes.orderTestHeader}>
                                            <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                                {props.imagingOrder ? "Order  Imaging(s)" : "Order Test(s)"}
                                            </Typography>
                                            <CheckboxField
                                                color="primary"
                                                name="allOrderTest"
                                                label={"Collect at Lab (All)"}
                                                checked={state.allOrderTest ? true : false}
                                                onChange={handleChkboxChangeA}
                                            />
                                        </div>}
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>
                                            {
                                                state.orderTests ?
                                                    state.orderTests.map((item, k) => (
                                                        item.isDeleted == false ?
                                                            <li key={item.labTestId}>
                                                                <span>{item.testName}</span>
                                                                <span>
                                                                    <span className={classes.editIcon}
                                                                        title="Edit">
                                                                        {props.imagingOrder ?
                                                                            <CheckboxField
                                                                                color="primary"
                                                                                name="isStat"
                                                                                checked={state.orderTests[k] ? state.orderTests[k].isStat ? true : false : false}
                                                                                onChange={() => handleChkboxChange(k)}
                                                                            />
                                                                            :
                                                                            <CheckboxField
                                                                                color="primary"
                                                                                name="isInternalCollection"
                                                                                checked={state.orderTests[k] ? state.orderTests[k].isInternalCollection ? true : false : false}
                                                                                onChange={() => handleChkboxChange(k)}
                                                                            />


                                                                        }
                                                                    </span>
                                                                    <span className={classes.deleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteRowOrderTest(k)} /></span>
                                                                </span>
                                                            </li>
                                                            : null
                                                    ))
                                                    : null
                                            }
                                        </ul>
                                    </div>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        {props.imagingOrder ?
                                            <Label title="Add Study" size={3} mandatory={true} />
                                            :
                                            <Label title="Add Test" size={3} mandatory={true} />
                                        }


                                        <Grid item direction="row" xs={12} sm={9} md={9} lg={9} xl={9}>
                                            <SearchList name={state.recentTestID} value={state.recentTestID} searchTerm={state.recentTestName} code="labOrder_test"
                                                apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleSearchOrderTest(name, item)}
                                                placeholderTitle={props.imagingOrder ? "Search Order Imaging" : "Search Order Test"}
                                            />
                                            {props.imagingOrder ?
                                                errorMessages.errorLabTest && (!state.recentTestID && state.orderTests.filter(tmprm => tmprm.isDeleted == false).length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select study
                                                </FormHelperText>) : ('')
                                                :
                                                errorMessages.errorLabTest && (!state.recentTestID && state.orderTests.filter(tmprm => tmprm.isDeleted == false).length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select order test
                                                </FormHelperText>) : ('')
                                            }
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className={classes.orderTest}>
                                    <div className={classes.orderTestHeader}>
                                        <Typography variant="subtitle1" className={classes.lableInput} gutterBottom>
                                            Order Diagnosis
                                        </Typography>
                                    </div>
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>
                                            {
                                                state.uniqueOrderDiagnosis ?

                                                    state.uniqueOrderDiagnosis.map((item, j) => (
                                                        item.isDeleted == false ?

                                                            <li key={item.icdCode}>
                                                                {"( " + item.icdCode + " )"} - {item.diagnosis}
                                                                <span className={classes.deleteIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteRowOrderDiagnoses(j)} /></span>
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

                                        <Label title="Add Diagnosis" size={3} />

                                        <Grid item direction="row" xs={12} sm={9} md={9} lg={9} xl={9}>
                                            <SearchList name={state.recentDiagnoseId} value={state.recentDiagnoseId} searchTerm={state.recentDiagnoseName} code="diagnosis"
                                                apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleSearchOrderDiagnoses(name, item)}
                                                placeholderTitle="Search Order Diagnosis"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <FormBtn id="save" className={classes.signBtn} onClick={openTemplateNameDialog} disabled={!isEditable}>Save as Template</FormBtn>
                        <div className={classes.footerRight}>
                            <ButtonGroup >
                                {loading.isSaving ?
                                    <FormBtn className={classes.signBtn} id="loadingSave" size="medium">Saving</FormBtn>
                                    :
                                    <FormBtn id="save" className={classes.signBtn} onClick={SaveLabOrder} disabled={!isEditable}>Save</FormBtn>
                                }
                                {/* 
                                <Button
                                    className={classes.menuBtn}
                                    data-id={1}
                                    size="small"
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleRowAction}
                                    endIcon={<ExpandMoreIcon />}>
                                </Button> */}
                            </ButtonGroup>

                            {state.labOrderId != 0 ?
                                loading.isDeleting ?
                                    <FormBtn id={"loadingDelete"} onClick={() => DeleteRecord()}>Delete</FormBtn>
                                    : <FormBtn id={"delete"} onClick={() => DeleteRecord()} disabled={!isEditable}>Delete</FormBtn>
                                : ""
                            }

                            <FormBtn id="save" onClick={handleNext} btnType="next" disabled={!isEditable}>Next</FormBtn>
                            <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            {state.labOrderId != 0 ?
                                <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                : null
                            }
                        </div>
                    </div>
                    <LogDialog
                        code="laborder"
                        id={state.labOrderId}
                        dialogOpenClose={logdialogstate}
                        onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                    />
                </div>;
            case 1:
                return <LabOrderForm templateUpdated={updateTemplate} imagingOrder={props.imagingOrder} ActiveDiagnosis={(activediagnosis) => setActiveDiagnosis(activediagnosis)} labOrderState={state} showHideDialog={true} {...state} isLastStep={isLastStep} handleBack={handleBack} handleNext={handleNext} handleClose={handleClose} />
            // return <BasicFormB {...formValues} activeStep={activeStep} isLastStep={isLastStep} handleBack={handleBack} handleNext={handleNext}/>;
            case 2:
                return <LabOrderPaymentForm templateUpdated={updateTemplate} imagingOrder={props.imagingOrder} labOrderStatePayment={state} {...state} isLastStep={isLastStep} handleBack={handleBack} handleNext={handleNext} handleClose={handleClose} patientState={patientState} />
            case 3:
                return <SubmitForm labOrderData={labOrderData} imagingOrder={props.imagingOrder} labOrderPaymentState={state} handleClose={handleClose} />
            default:
                throw new Error('Mis-step!');
        }
    }
    //

    const [stateSaveAsTemplate, setStateSaveAsTemplate] = useState({});
    const [labOrderVendors, setLabOrderVendors] = useState([]);
    const [dataId, setDataId] = useState(props.dataId);

    let _orderTestsArray = [];
    let _orderDiagnosesArray = [];

    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [labOrderFormDialog, setLabOrderFormDialog] = useState(false);

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
    const [errorMessages, setErrorMessages] = useState({
        errorVendor: false, errorLabTest: false, errorOtherLab: false
    })

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

    useEffect(() => {
        let isDisabled = userdata.isProvider ? true : (props.imagingOrder == true ? IsEditable("imaging") : IsEditable("lab"))
        if (showHideDialog) {
            setActiveStep(0);
        }
        clearValues();
        initialization();
        if (props.dataId > 0) {
            loadPatientInfo();
            loadPatientDefaultLabOrder();
        }

        if (props.labOrderId > 0) {
            loadPatientLabOrder();
        }

    }, [showHideDialog]);

    function loadPatientLabOrder() {
        var data = {
            labOrderId: props.labOrderId
        }

        PostDataAPI("patient/labOrder/getLabOrderDetails", data).then((result) => {
            if (result.success && result.data != null) {
                handleFormatData(result.data);
                if (result.data.orderTests) {
                    if (props.imagingOrder) {
                        result.data.allOrderSTAT = result.data.orderTests.every(t => t.isStat == true);
                    }
                    else {
                        result.data.allOrderTest = result.data.orderTests.every(t => t.isInternalCollection == true);
                    }
                }
                setState(result.data);
            }
        })

    }
    function loadPatientInfo() {
        var data = {
            patientId: parseInt(props.dataId)
        }
        PostDataAPI("patient/labOrder/getPatientInfo", parseInt(props.dataId)).then((result) => {
            if (result.success && result.data != null) {
                //handleFormatData(result.data);
                setPatientState(result.data);
            }
        })
    }

    function loadPatientDefaultLabOrder() {

        PostDataAPI("demographic/getPatientDemographicById", props.dataId).then((result) => {
            if (result.success && result.data != null) {
                setState(prevState => ({
                    ...prevState,
                    'labId': result.data.labID
                }));
            }
        })
    }

    function clearValues() {
        setState({
            labOrderId: 0, patientEncounterId: encounterId, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
            orderingProviderId: null, testTypeCode: "", isElab: props.imagingOrder, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "",
            chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", vendorName: "", recentTestName: "", recentTestID: "",
            orderSepcificDatetime: null, performTestOnSpecificDate: false,
            orderTests: [],
            orderDiagnoses: [],
            labOrderSpecimen: [],
            labOrderTest: [],
            labOrderDiagnosis: []
        });
        setStateSaveAsTemplate({

            labOrderTemplateId: 0, locationId: 0, labId: 0, templateName: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), isElab: props.imagingOrder,
            labOrderTemplateTestLst: [],
            LabOrderTemplateDiagnosisLst: []

        });
        setErrorMessages({ errorVendor: false })
    }

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
            if (name === "labId") {
                if (value != 'Other') {
                    let isExists = searchFromArray(value, labOrderVendors)
                    if (isExists != undefined)
                        state.vendorName = isExists.label;
                }
            }
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleChkboxChangeA = (e) => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));

        state.orderTests.map((itm, k) => {

            if (!state[name]) {

                if (props.imagingOrder === true)
                    state.orderTests[k].isStat = true;
                else
                    state.orderTests[k].isInternalCollection = true;
            }
            else {
                if (props.imagingOrder === true)
                    state.orderTests[k].isStat = false;
                else
                    state.orderTests[k].isInternalCollection = false;

            }

        });

        setState(prevState => ({
            ...prevState,
            orderTests: state.orderTests
        }));

    }

    function handleFormatData(dataSet) {
        dataSet.orderTests = dataSet.labOrderTest;
        if (dataSet.orderTests) {
            if (dataSet.orderTests.length > 0) {

                if (dataSet.orderTests[0]) {
                    if (dataSet.orderTests[0].labId === null) {
                        dataSet.labId = 'Other';
                        dataSet.vendorName = dataSet.orderTests[0].vendorName;
                    }
                    else {
                        dataSet.labId = dataSet.orderTests[0].labId;
                        dataSet.vendorName = dataSet.orderTests[0].vendorName;
                        //dataSet.vendorName = labOrderVendors.find(o => o.value === dataSet.orderTests[0].labId.toString()).label;
                        // dataSet.orderTests[0].vendorName;
                    }
                }

            }
        }
        dataSet.patientId = parseInt(dataId);
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

    function loadVendors() {
        var params = {
            code: "labOrder_Vendor",
            parameters: [dataId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                result.data.push({ text1: "Other", text2: "Other" });
                setLabOrderVendors(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

                setState(prevState => ({
                    ...prevState,
                    financialGaurantor: result.data[0].text3
                }));
            }

        })
    }

    function initialization() {
       
        loadVendors();
        setState(prevState => ({
            ...prevState,
            patientId: dataId
        }));

    }

    const handleSearchOrderTest = (name, item) => {

        const { id, value } = item;
        if (!id)
            return;

        setState(prevState => ({
            ...prevState,
            recentTestID: id,
            recentTestName: value
        }));


        var previousResult = [];
        var _arrayDiagnosis = [];
        var _newRecordArray = [];

        if (state.orderTests && state.orderTests != null) {
            if (state.orderTests.filter(tmprm => tmprm.labTestId == parseInt(id) && tmprm.isDeleted == false) == "") {
                if (state.orderTests.length > 0)
                    previousResult = state.orderTests;
                _orderTestsArray.push({
                    labOrderTestId: item.labOrderTestId, labOrderId: item.labOrderId, labTestId: parseInt(id), testName: value, labId: parseInt(state.labId), isDeleted: item.isDeleted ? true : false,
                    isStat: item.isStat, isInternalCollection: item.isInternalCollection, testNote: item.testNote, orderStatus: item.orderStatus ? item.orderStatus : "Pending",
                    createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), isInternalCollection: false
                });
                if (previousResult.length > 0) {
                    previousResult.map((item, i) => {

                        _orderTestsArray.push({
                            labOrderTestId: item.labOrderTestId, labOrderId: item.labOrderId, labTestId: item.labTestId, testName: item.testName, labId: parseInt(state.labId), isDeleted: item.isDeleted ? true : false, isStat: item.isStat,
                            isInternalCollection: item.isInternalCollection, testNote: item.testNote, orderStatus: item.orderStatus ? item.orderStatus : "Pending",
                            createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(),
                            isInternalCollection: item.isInternalCollection,
                            labOrderTemplateTestId: item.labOrderTemplateTestId
                        });
                    });

                }

                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        orderTests: _orderTestsArray,
                        recentTestID: '',
                        recentTestName: '',
                        allOrderSTAT: false,
                        allOrderTest: false
                    }));

                }, 100)


                if (state.orderDiagnoses) {

                    state.orderDiagnoses.map((itm, i) => {

                        _arrayDiagnosis.push({
                            labOrderDiagnosistId: itm.labOrderDiagnosistId, labOrderTestId: itm.labOrderTestId, labTestId: itm.labTestId,
                            diagnosisId: itm.diagnosisId, isDeleted: item.isDeleted ? true : false, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                            createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(),
                            labOrderTemplateDiagnosistId: itm.labOrderTemplateDiagnosistId
                        });

                    });


                    state.orderDiagnoses.map((itm, i) => {

                        if (_arrayDiagnosis.filter(tmprm => tmprm.icdCode == itm.icdCode && tmprm.labTestId == id) == "") {
                            _arrayDiagnosis.push({
                                labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: parseInt(id), diagnosisId: item.diagnosisId, isDeleted: item.isDeleted ? true : false,
                                icdCode: itm.icdCode, diagnosis: itm.diagnosis, createdBy: item.createdBy, updatedBy: item.updatedBy,
                                createDate: item.createDate ? item.createDate : new Date()
                            });
                        }

                    });
                }


                setState(prevState => ({
                    ...prevState,
                    orderDiagnoses: _arrayDiagnosis,
                    labOrderDiagnosis: _arrayDiagnosis

                }));

            }
            else {
                if (props.imagingOrder === true) {
                    showMessage("Error", "Study already exists.", "error", 8000);
                }

                else {
                    showMessage("Error", "Lab test already exists.", "error", 8000);


                    setTimeout(() => {

                        setState(prevState => ({
                            ...prevState,
                            recentTestID: '',
                            recentTestName: ''
                        }));

                    }, 100)

                }


            }



        }
        else {

            _orderTestsArray.push({
                labOrderTestId: 0, labOrderId: 0, labTestId: parseInt(id), testName: value, labId: parseInt(state.labId), isDeleted: false,
                isStat: false, isInternalCollection: false, testNote: "", orderStatus: "Pending", createdBy: 0, updatedBy: 0,
                createDate: new Date().toISOString(), isInternalCollection: false
            });

            setState(prevState => ({
                ...prevState,
                orderTests: _orderTestsArray,
                recentTestID: '',
                recentTestName: '',
                allOrderSTAT: false,
                allOrderTest: false
            }));

        }
    }

    const handleSearchOrderDiagnoses = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            recentDiagnoseId: id,
            recentDiagnoseName: value
        }));
        if (!value || value == '') {
            return;
        }
        var previousResult = [];
        var _updatedArray = [];
        var _OrderTestsArray = [];

        if (state.orderDiagnoses && state.orderDiagnoses != null) {

            if (state.orderDiagnoses.filter(tmprm => tmprm.diagnosis === value && tmprm.isDeleted === false) == "") {

                if (state.orderDiagnoses.length > 0)
                    previousResult = state.orderDiagnoses;

                if (state.orderTests.length === 0) {
                    _orderDiagnosesArray.push({
                        labOrderDiagnosistId: 0, labTestId: null, diagnosisId: null, isDeleted: false, icdCode: id,
                        diagnosis: value, isStat: false, isInternalCollection: false
                    });
                }

                if (previousResult.length > 0) {
                    previousResult.map((item, i) => {

                        if (item.labOrderDiagnosistId > 0) {
                            _orderDiagnosesArray.push({
                                labOrderDiagnosistId: item.labOrderDiagnosistId, labOrderTestId: item.labOrderTestId, labTestId: parseInt(item.labTestId), diagnosisId: item.diagnosisId, isDeleted: item.isDeleted ? true : false,
                                icdCode: item.icdCode, diagnosis: item.diagnosis, labOrderTemplateDiagnosistId: item.labOrderTemplateDiagnosistId,
                                createdBy: item.createdBy, createDate: item.createDate
                            });
                        }
                        else {
                            _orderDiagnosesArray.push({
                                labOrderDiagnosistId: item.labOrderDiagnosistId, labOrderTestId: item.labOrderTestId, labTestId: parseInt(item.labTestId), diagnosisId: item.diagnosisId, isDeleted: item.isDeleted ? true : false,
                                icdCode: item.icdCode, diagnosis: item.diagnosis, labOrderTemplateDiagnosistId: item.labOrderTemplateDiagnosistId,
                                createdBy: item.createdBy, createDate: item.createDate
                            });
                        }

                    });
                }

                if (state.orderTests) {
                    state.orderTests.map((item, i) => {

                        _orderDiagnosesArray.push({
                            labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: parseInt(item.labTestId), diagnosisId: null, isDeleted: false,
                            icdCode: id, diagnosis: value,
                        });

                    });
                }

                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        orderDiagnoses: _orderDiagnosesArray,
                        recentDiagnoseId: '',
                        recentDiagnoseName: ''
                    }));

                }, 100)

                if (state.labOrderDiagnosis) {
                    if (state.labOrderDiagnosis.length > 0) {
                        setState(prevState => ({
                            ...prevState,
                            labOrderDiagnosis: _orderDiagnosesArray
                        }));
                    }
                }

            }
            else {

                showMessage("Error", "Lab order diagnosis already exists", "error", 8000);

                setTimeout(() => {

                    setState(prevState => ({
                        ...prevState,
                        recentDiagnoseId: '',
                        recentDiagnoseName: ''
                    }));

                }, 100);
            }

        }
    }

    function MoveNextState() {
        let _OrderTestsArray = [];
        let _OrderSpecimeentArray = [];
        let _OrderDiagnosisArray = [];
        let _labOrderSpecimen = [];

        state.orderTests.map((item, i) => {

            if (item.labOrderTestId > 0) {
                _OrderTestsArray.push({
                    labOrderTestId: item.labOrderTestId, labOrderId: item.labOrderId, labTestId: parseInt(item.labTestId),
                    labId: parseInt(state.labId), isDeleted: item.isDeleted ? true : false, testName: item.testName, isStat: item.isStat,
                    isInternalCollection: item.isInternalCollection, testNote: item.testNote, createdBy: item.createdBy,
                    updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(),
                    vendorName: state.vendorName
                });

                if (state.orderDiagnoses) {
                    state.orderDiagnoses.map((itm, k) => {

                        if (item.labTestId == parseInt(itm.labTestId) || itm.labTestId == null) {
                            _OrderDiagnosisArray.push({
                                labOrderDiagnosistId: itm.labOrderDiagnosistId, labOrderTestId: itm.labOrderTestId, labTestId: itm.labTestId ? parseInt(itm.labTestId) : parseInt(item.labTestId),
                                diagnosisId: itm.diagnosisId, isDeleted: itm.isDeleted ? true : false, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                                isStat: itm.isStat, isInternalCollection: itm.isInternalCollection, createdBy: itm.createdBy, updatedBy: itm.updatedBy,
                                createDate: itm.createDate ? itm.createDate : new Date(), isDeleted: itm.isDeleted
                            });

                        }

                    });
                }


            }
            else {

                _OrderTestsArray.push({
                    labOrderTestId: 0, labOrderId: 0, labTestId: parseInt(item.labTestId), labId: parseInt(state.labId),
                    isDeleted: item.isDeleted ? true : false, testName: item.testName, isStat: item.isStat, isInternalCollection: item.isInternalCollection,
                    testNote: "", createdBy: 0, updatedBy: 0, createDate: item.createDate ? item.createDate : new Date(),
                    vendorName: state.vendorName
                });




                if (item.labOrderTestId === undefined || item.labOrderTestId == null || item.labOrderTestId == 0) {

                    if (state.uniqueOrderDiagnosis) {
                        state.uniqueOrderDiagnosis.map((itm, k) => {


                            _OrderDiagnosisArray.push({
                                labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: parseInt(item.labTestId),
                                diagnosisId: null, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                                createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(),
                                isDeleted: itm.isDeleted ? true : false
                            });
                        });

                    }

                }

            }

        });


        //  updated

        if (state.labOrderSpecimen) {
            state.labOrderSpecimen.map((itm, k) => {

                _OrderSpecimeentArray.push({
                    labOrderSpecimenId: itm.labOrderSpecimenId, labOrderTestId: itm.labOrderTestId, labTestId: parseInt(itm.labTestId),
                    specimenType: itm.specimenType, collectionDateTime: itm.collectionDatetime ?
                        itm.collectionDatetime.split(':')[0] + ':' + itm.collectionDatetime.split(':')[1] : new Date().toISOString().split(':')[0]
                        + ':' + new Date().toISOString().split(':')[1],
                    specimenNote: itm.specimenNote, noOfLabels: itm.noOfLabels, isDeleted: itm.isDeleted ? true : false, createDate: itm.createDate
                });

            });
        }


        setState(prevState => ({
            ...prevState,
            labOrderTest: _OrderTestsArray,
            orderTests: _OrderTestsArray,
            labOrderDiagnosis: state.isCallToPaymentForm ? state.labOrderDiagnosis : _OrderDiagnosisArray,
            orderDiagnoses: state.isCallToPaymentForm ? state.labOrderDiagnosis : _OrderDiagnosisArray,
            labOrderSpecimen: _OrderSpecimeentArray
        }));
        // }

    }

    function validateLabOrder(errorList) {
        if (state.orderTests && state.orderTests.filter(tmprm => tmprm.isDeleted == false) != null) {
            if (state.orderTests.filter(tmprm => tmprm.isDeleted == false).length === 0) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorLabTest: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorLabTest: false
                }));
            }
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLabTest: false
            }));
            errorList.push(true);
            if (props.imagingOrder === true)
                showMessage("Error", "Please select at least 1 study", "error", 8000);
            else
                showMessage("Error", "Please select at least 1 test", "error", 8000);
        }

        if (state.labId == 'Other' && state.vendorName == "" || state.vendorName == undefined) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOtherLab: true
            }));
            errorList.push(true);
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOtherLab: false
            }));
        }
        if (state.labId === null || state.labId == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVendor: true
            }));
            errorList.push(true);
            // newLabOrdeFormRef.vendorForOrderRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVendor: false
            }));
        }
    }

    function deleteRowOrderTest(index) {
        let alertMsg = "";
        if (props.imagingOrder === true)
            alertMsg = "Are you sure, you want to delete the Study?";
        else
            alertMsg = "Are you sure, you want to delete the Lab Order Test?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {

            let labTestId = state.orderTests[index].labTestId;
            let labOrderTest_Id = state.orderTests[index].labOrderTestId;
            if (labOrderTest_Id > 0) {
                state.orderTests[index].isDeleted = true;
                setState(prevState => ({
                    ...prevState,
                    orderTests: state.orderTests,
                    labOrderTest: state.orderTests,
                    allOrderSTAT: state.orderTests.filter(t => !t.isDeleted).every(t => t.isStat == true),
                    allOrderTest: state.orderTests.filter(t => !t.isDeleted).every(t => t.isInternalCollection == true)
                }));

                state.orderDiagnoses.filter(tmprm => tmprm.labTestId == labTestId).map((itmm, d) => {
                    let _index = 0;
                    _index = state.orderDiagnoses.findIndex(x => x.labTestId === labTestId);
                    state.orderDiagnoses[_index].isDeleted = true;
                })

                setState(prevState => ({
                    ...prevState,
                    labOrderDiagnosis: state.orderDiagnoses,
                    orderDiagnoses: state.orderDiagnoses
                }));

                if (state.labOrderSpecimen) {

                    state.labOrderSpecimen.filter(tmprm => tmprm.labTestId == labTestId).map((itmmm, y) => {
                        let _index = 0;
                        _index = state.labOrderSpecimen.findIndex(x => x.labTestId === labTestId);
                        state.labOrderSpecimen[_index].isDeleted = true;
                        // state.labOrderSpecimen.splice(_index, 1);
                    })

                    setState(prevState => ({
                        ...prevState,
                        labOrderSpecimen: state.labOrderSpecimen
                    }));
                }
            }
            else {
                if (state.orderTests && state.orderTests != null) {
                    state.orderTests[index].isDeleted = true;
                }

                setState(prevState => ({
                    ...prevState,
                    orderTests: state.orderTests,
                    labOrderTest: state.orderTests,
                    allOrderSTAT: state.orderTests.filter(t => !t.isDeleted).every(t => t.isStat == true),
                    allOrderTest: state.orderTests.filter(t => !t.isDeleted).every(t => t.isInternalCollection == true)
                }));
            }
        });
    }

    function deleteRowOrderDiagnoses(index) {

        let alertMsg = "";
        if (props.imagingOrder === true)
            alertMsg = "Are you sure, you want to delete the lab order diagnosis?";
        else
            alertMsg = "Are you sure, you want to delete the lab order diagnosis?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {



            let diagnoseName = state.orderDiagnoses[index].diagnosis;

            let labOrderTest_Id = state.orderDiagnoses[index].labOrderTestId;

            let labTestId = state.orderDiagnoses[index].labTestId;

            if (labTestId) {
                state.orderDiagnoses.filter(tmprm => tmprm.diagnosis == diagnoseName).map((itmm, d) => {
                    let _index = 0;
                    //let labOrderDiagnosistSingleId = 0;
                    _index = state.orderDiagnoses.findIndex(x => x.diagnosis === itmm.diagnosis);

                    if (itmm.labOrderDiagnosistId > 0)
                        state.orderDiagnoses[_index].isDeleted = true;
                    else
                        state.orderDiagnoses.splice(_index, 1);

                })
            }
            else {

                state.orderDiagnoses.splice(index, 1);
            }

            setState(prevState => ({
                ...prevState,
                orderDiagnoses: state.orderDiagnoses,
            }));

            if (state.labOrderDiagnosis && state.labOrderDiagnosis != null) {
                if (state.labOrderDiagnosis.length > 0) {
                    setState(prevState => ({
                        ...prevState,
                        labOrderDiagnosis: state.orderDiagnoses
                    }));
                }

            }

            state.uniqueOrderDiagnosis = state.orderDiagnoses;
            state.uniqueOrderDiagnosis = [...new Map(state.uniqueOrderDiagnosis.map(o => [o["diagnosis"], o])).values()]; // Removed Repeted Data


            state.orderDiagnoses.map((itmm, d) => {

                if (itmm.isDeleted == true) {
                    state.uniqueOrderDiagnosis.map((itm, k) => {

                        if (itmm.diagnosis === itm.diagnosis && itm.icdCode === itmm.icdCode) {
                            state.uniqueOrderDiagnosis[k].isDeleted = true;
                            state.orderDiagnoses[d].isDeleted = true;

                        }

                    })
                }
            })

            setState(prevState => ({
                ...prevState,
                uniqueOrderDiagnosis: state.uniqueOrderDiagnosis
            }));

        });
    }
    const openTemplateNameDialog = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)

        if (state.labId === "" || state.labId === null) {
            showMessage("Error", "Please select Lab.", "error", 8000);
            return;
        }
        var notDeleteList = state.orderTests.filter(item => item.isDeleted == false)
        if (notDeleteList == 0) {

            if (props.imagingOrder === true)
                showMessage("Error", "Please select at least 1 order imaging", "error", 8000);
            else
                showMessage("Error", "Please select at least 1 order test", "error", 8000);
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
            //stateSaveAsTemplate.labOrderTemplateId = 0;
            stateSaveAsTemplate.locationId = state.locationId ? state.locationId : null;
            stateSaveAsTemplate.labId = state.labId ? parseInt(state.labId) : null;
            //stateSaveAsTemplate.templateName = state.orderTests[0] ? state.orderTests[0].testName : "";
            //init template state
            stateSaveAsTemplate.labOrderTemplateTestLst = [];
            stateSaveAsTemplate.LabOrderTemplateDiagnosisLst = [];

            if (state.orderTests)
                state.orderTests.map((item, i) => {
                    _labOrderTemplateTest.push({
                        labOrderTemplateTestId: item.labOrderTemplateTestId,
                        labOrderTemplateId: stateSaveAsTemplate.labOrderTemplateId,
                        labTestId: parseInt(item.labTestId), createdBy: item.createdBy,
                        updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(),
                        isDeleted: item.isDeleted, updateDate: new Date()
                    });
                });
            if (state.orderDiagnoses)
                state.orderDiagnoses.map((itm, i) => {
                    _labOrderTemplateDiagnosis.push({
                        labOrderTemplateDiagnosistId: itm.labOrderTemplateDiagnosistId,
                        labTestId: itm.labTestId ? itm.labTestId.toString() : "",
                        labOrderTemplateId: stateSaveAsTemplate.labOrderTemplateId,
                        diagnosisId: null, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                        createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(),
                        isDeleted: itm.isDeleted, updateDate: new Date()
                    });
                });

            stateSaveAsTemplate.labOrderTemplateTestLst = _labOrderTemplateTest;
            stateSaveAsTemplate.LabOrderTemplateDiagnosisLst = _labOrderTemplateDiagnosis;
            stateSaveAsTemplate.createdBy = state.createdBy;

            let method = "patient/labOrder/saveLabOrderTemplate";

            if (stateSaveAsTemplate.labOrderTemplateId > 0) {

                method = "patient/labOrder/updateTemplate";

            }
            setIsSaveCall(true);
            PostDataAPI(method, stateSaveAsTemplate, true).then((result) => {
                if (result.success == true) {

                    if (stateSaveAsTemplate.labOrderTemplateId < 1) {
                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Template saved successfully.", "success", 3000);
                            setIsSaveCall(false);


                        }
                    }
                    else if (stateSaveAsTemplate.labOrderTemplateId > 0) {

                        showMessage("Success", "Template updated successfully.", "success", 3000);
                        setIsSaveCall(false);
                    }
                    updateTemplate();
                    setShowHideTemplateNameDialog(false);
                }
                else {

                    showMessage("Error", result.message, "error", 3000);
                    setIsSaveCall(false);

                }
            })
        }
    }

    function getTemplateClick(data, callOrder) {
        console.log(activeStep);
        if (activeStep > 0) {
            ShowActionDialog(true, "Alert", "Are you sure you want to discard the data?", "confirm", function () {
                setActiveStep(0);
                loadTemplate(data, callOrder);
            });

        } else {
            loadTemplate(data, callOrder);
        }
    }

    function loadTemplate(data, callOrder) {

        if (data != null && data != "" && callOrder != 3) {
            clearValues();
        }

        if (callOrder === 1) {
            if (data.call == "Edit") {
                setStateSaveAsTemplate(prevState => ({
                    ...prevState,
                    labOrderTemplateId: data.labOrderTemplateId,
                    templateName: data.templateName
                }));

            }
            else {
                setStateSaveAsTemplate(prevState => ({
                    ...prevState,
                    labOrderTemplateId: 0
                }));
            }
            let isExists = searchFromArray(data.labId + "", labOrderVendors)
            setState(prevState => ({
                ...prevState,
                patientId: parseInt(dataId),
                labId: data.labId,
                vendorName: isExists == undefined ? "" : isExists.label,
                orderDiagnoses: data.labOrderTemplateDiagnosisLst,
                orderTests: data.labOrderTemplateTestLst,
                labOrderDiagnosis: data.labOrderTemplateDiagnosisLst,
                labOrderTest: data.labOrderTemplateTestLst,
                createdBy: data.createdBy
            }))

        }
        else if (callOrder === 2) {
            handleFormatData(data);
            setState(data);
        }
        else if (callOrder === 3) {

            let _labOrderDiagnosis = [];
            if (state.orderDiagnoses)
                state.orderDiagnoses.map((itm, k) => {

                    _labOrderDiagnosis.push({
                        labOrderDiagnosistId: itm.labOrderDiagnosistId, labOrderTestId: itm.labOrderTestId, labTestId: parseInt(itm.labTestId),
                        diagnosisId: itm.diagnosisId, isDeleted: itm.isDeleted, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                        createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(), isDeleted: itm.isDeleted
                    });

                });



            if (activeDaignosis > -1) {

                if (state.labOrderDiagnosis[activeDaignosis]) {
                    if (state.labOrderDiagnosis.filter(tmp => tmp.labTestId === state.labOrderTest[activeDaignosis].labTestId).filter(tmp => tmp.diagnosis == data.value) == "") {

                        _labOrderDiagnosis.push({
                            labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: state.labOrderTest[activeDaignosis] ? parseInt(state.labOrderTest[activeDaignosis].labTestId) : null,
                            diagnosisId: null, isDeleted: false, icdCode: data.id, diagnosis: data.value,
                            createdBy: 0, updatedBy: 0, createDate: new Date()
                        });


                        state.uniqueOrderDiagnosis.push({
                            labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: state.labOrderTest[activeDaignosis] ? parseInt(state.labOrderTest[activeDaignosis].labTestId) : null,
                            diagnosisId: null, isDeleted: false, icdCode: data.id, diagnosis: data.value,
                            createdBy: 0, updatedBy: 0, createDate: new Date()
                        });

                    }
                    else {
                        showMessage("Error", "Lab order diagnosis already exists", "error", 8000);
                    }

                }

            }
            else if (_labOrderDiagnosis) {

                if (_labOrderDiagnosis.filter(tmprm => tmprm.diagnosis === data.value) == "") {
                    _labOrderDiagnosis.push({
                        labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: null,
                        diagnosisId: null, isDeleted: false, icdCode: data.id, diagnosis: data.value,
                        createdBy: 0, updatedBy: 0, createDate: new Date()
                    });
                }
                else {
                    showMessage("Error", "Lab order diagnosis already exists", "error", 8000);
                }

            }

            setState(prevState => ({
                ...prevState,
                orderDiagnoses: _labOrderDiagnosis,
                labOrderDiagnosis: _labOrderDiagnosis
            }))

        }
    }

    function DeleteRecord() {
        let alertMsg = "";
        if (props.imagingOrder === true)
            alertMsg = "Are you sure, you want to delete the Imaging Order?";
        else
            alertMsg = "Are you sure, you want to delete the Lab Order?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {

            var data = {
                labOrderId: state.labOrderId
            }
            setLoading({ isDeleting: true });
            PostDataAPI("patient/labOrder/delete", data, true).then((result) => {

                if (result.success) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleClose();
                    setLoading({ isDeleting: false });
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                    setLoading({ isDeleting: false });
                }

            })

        });
    }

    const SaveLabOrder = () => {
        let errorList = [];
        validateLabOrder(errorList);

        if (errorList.length < 1) {

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
                            //load lab order again
                            loadVendors();
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
        // }
    }
    const deleteLabOrderTemplate = (id) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the template?", "confirm", function () {
            const obj = { labOrderTemplateId: id };
            PostDataAPI("patient/labOrder/deleteLabOrderTemplate", obj, true).then((result) => {
                if (result.success) {
                    updateTemplate();
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                }

            });
        });
    }
    function handleDataFormat() {

        let _OrderTestsArray = [];
        let _OrderSpecimeentArray = [];
        let _OrderDiagnosisArray = [];
        let _labOrderSpecimen = [];

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
        finalState.orderSepcificDatetime = state.orderSepcificDatetime;
        finalState.performTestOnSpecificDate = state.performTestOnSpecificDate;
        finalState.orderStatus = state.orderStatus;
        finalState.vendorName = state.vendorName;
        finalState.allOrderTest = state.allOrderTest;
        finalState.allOrderSTAT = state.allOrderSTAT;
        finalState.labId = state.labId == 'Other' ? 0 : parseInt(state.labId);
        finalState.orderStatus = state.orderStatus ? state.orderStatus : 'Pending';
        finalState.labOrderSpecimen = state.labOrderSpecimen;


        state.orderTests.map((item, i) => {

            if (item.labOrderTestId > 0) {
                _OrderTestsArray.push({
                    labOrderTestId: item.labOrderTestId, labOrderId: item.labOrderId, labTestId: parseInt(item.labTestId),
                    labId: parseInt(state.labId), isDeleted: item.isDeleted, testName: item.testName, isStat: item.isStat,
                    isInternalCollection: item.isInternalCollection, testNote: item.testNote, createdBy: item.createdBy,
                    updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(),
                    vendorName: state.vendorName
                });

                if (state.orderDiagnoses) {
                    if (state.orderDiagnoses.filter(tmprm => tmprm.labTestId === item.labTestId) != "") {

                        state.orderDiagnoses.filter(tmprm => tmprm.labTestId === item.labTestId).map((itm, k) => {

                            _OrderDiagnosisArray.push({
                                labOrderDiagnosistId: itm.labOrderDiagnosistId, labOrderTestId: itm.labOrderTestId, labTestId: itm.labTestId ? parseInt(itm.labTestId) : parseInt(itm.labTestId),
                                diagnosisId: itm.diagnosisId, isDeleted: itm.isDeleted, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                                createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date()
                            });
                        });
                    }
                    else if (state.orderDiagnoses.filter(tmprm => tmprm.labTestId === item.labTestId) == "") {
                        if (state.uniqueOrderDiagnosis) {
                            state.uniqueOrderDiagnosis.map((itm, k) => {


                                _OrderDiagnosisArray.push({
                                    labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: parseInt(item.labTestId),
                                    diagnosisId: null, isDeleted: false, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                                    isStat: false, isInternalCollection: false, createdBy: itm.createdBy, updatedBy: itm.updatedBy,
                                    createDate: itm.createDate ? itm.createDate : new Date()
                                });
                            });

                        }

                    }

                }


            }
            else {

                _OrderTestsArray.push({
                    labOrderTestId: 0, labOrderId: 0, labTestId: parseInt(item.labTestId), labId: parseInt(state.labId),
                    isDeleted: item.isDeleted, testName: item.testName, isStat: false, isInternalCollection: item.isInternalCollection,
                    testNote: "", createdBy: 0, updatedBy: 0, createDate: item.createDate ? item.createDate : new Date(),
                    vendorName: state.vendorName
                });


                if (item.labOrderTestId === undefined || item.labOrderTestId == null) {

                    if (state.uniqueOrderDiagnosis) {
                        state.uniqueOrderDiagnosis.map((itm, k) => {


                            _OrderDiagnosisArray.push({
                                labOrderDiagnosistId: 0, labOrderTestId: 0, labTestId: parseInt(item.labTestId),
                                diagnosisId: null, isDeleted: itm.isDeleted, icdCode: itm.icdCode, diagnosis: itm.diagnosis,
                                isStat: false, isInternalCollection: false, createdBy: itm.createdBy, updatedBy: itm.updatedBy,
                                createDate: itm.createDate ? itm.createDate : new Date()
                            });
                        });

                    }

                }

            }

            finalState.labOrderTest = _OrderTestsArray;
            finalState.labOrderDiagnosis = _OrderDiagnosisArray;
        });

    }

    const handleChkboxChange = (index) => {

        let conditionalFlag = true;

        if (props.imagingOrder === true)
            state.orderTests[index].isStat = !state.orderTests[index].isStat;
        else
            state.orderTests[index].isInternalCollection = !state.orderTests[index].isInternalCollection;

        state.orderTests.filter(t => !t.isDeleted).map((itm, k) => {
            if (props.imagingOrder === true) {
                if (itm.isStat === false)
                    conditionalFlag = false;
            }
            else {
                if (itm.isInternalCollection === false)
                    conditionalFlag = false;
            }
        });

        if (props.imagingOrder === true) {

            if (conditionalFlag === true)
                state.allOrderSTAT = true;
            else
                state.allOrderSTAT = false;
        }
        else {
            if (conditionalFlag === true)
                state.allOrderTest = true;
            else
                state.allOrderTest = false;
        }

        setState(prevState => ({
            ...prevState,
            orderTests: state.orderTests

        }));

    }

    function searchFromArray(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].value === nameKey) {
                return myArray[i];
            }
        }
    }

    const updateTemplate = () => { setIsTemplateUpdated(!isTemplateUpdated) }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'md'}
                {...props} >
                <div className={classes.DialogContent}>
                    <div className={classes.DialogContentLeftSide}>
                        <LeftTabList isUpdate={isTemplateUpdated} handleTemplateClick={(object, callOrder) => getTemplateClick(object, callOrder)} labOrderId={props.labOrderId} imagingOrder={props.imagingOrder} deleteLabOrderTemplate={(templateId) => { deleteLabOrderTemplate(templateId) }} />
                    </div>
                    <div className={classes.DialogContentRightSide}>
                        <>
                            {getStepContent(activeStep)}
                        </>
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

export default withSnackbar(NewLabOrderForm)
