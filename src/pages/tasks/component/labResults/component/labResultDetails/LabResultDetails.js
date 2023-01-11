import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
import {
    Grid,
    FormLabel,
    Typography,
    ButtonGroup,
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Switch,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
//components
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import AddIcon from '../../../../../../images/icons/add-icon.png';
import SearchList from "../../../../../../components/SearchList/SearchList"
import TaskGrid from "../../../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn, LinkS } from '../../../../../../components/UiElements/UiElements';
import { InputBaseField, SelectField, CheckboxField, TextareaField } from '../../../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { Scrollbars } from "rc-scrollbars";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import DiagnosisForm from "../../../../../patients/component/diagnosis/components/DiagnosisForm";
import MedicationForm from "../../../../../patients/component/medication/component/MedicationForm";
import ObservationDetailsDialog from "../observationDetails/ObservationDetailsDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

function LabResultDetails({ dialogOpenClose, handleClose, labOrderId, isReadOnly, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState({});
    const [showObservationDetailsDialog, setShowObservationDetailsDialog] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [showTestDetails, setShowTestDetails] = useState(false);
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [showMedicationFrom, setShowMedicationFrom] = useState(false);
    // const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    // const [dialogOpenClose, setDialogOpenClose] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    }
    const handleSearchListChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleCheckBoxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    };
    useEffect(() => {

        if (labOrderId > 0)
            loadLabDetails(labOrderId);

    }, []);

    function loadLabDetails(id) {

        PostDataAPI("task/labOrderResult/labOrderResultDetails", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {

                result.data = handleFormatData(result.data);
                setState(result.data);
            }
        })

    }
    const handleCloseDiagnossisForm = () => {

        loadLabDetails(labOrderId);
        setShowDiagnosisForm(false);
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        loadLabDetails(labOrderId);
        setShowDiagnosisForm(false);
    }

    const handleCloseMedicationForm = () => {

        loadLabDetails(labOrderId);
        setShowMedicationFrom(false);
    }

    function handleFormatData(data) {

        if (data.labTestComponent) {
            data.labTestComponent.map((item, i) => {

                if (item.resultValue === "null")
                    item.resultValue = '';
                if (item.unitCode == 'null')
                    item.unitCode = '';
                if (item.vendorNote === 'false' || item.vendorNote === 'null')
                    item.vendorNote = '';
                if (item.providerComment === 'null')
                    item.providerComment = '';
                if (item.normalRange === 'null')
                    item.normalRange = '';

            });
        }

        return data;

    }

    return (
        <>
            {
                showObservationDetailsDialog ?
                    <ObservationDetailsDialog showHideDialog={showObservationDetailsDialog} handleClose={() => setShowObservationDetailsDialog(false)} />
                    : ""
            }
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={dialogOpenClose}
                {...props} >
                <DialogTitle>
                    <Grid lg={12} container direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <FormGroupTitle>Result Details</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Scrollbars autoHeight autoHeightMax={560} style={{ display: "flex", width: "100%" }}>
                    <DialogContent className={classes.dialogcontent} >
                        <Scrollbars autoHeight autoHeightMax={543} style={{ display: "flex", width: "100%" }}>
                            {/* <div className={classes.labResultDetailsCard}> */}
                            <div className={classes.labResultDetailsInnerCard}>
                                <Grid container lg={12} direction="row" justify="start">

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <FormGroupTitle>Result Details</FormGroupTitle>
                                    </Grid>

                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid className={classes.gridHeight} container justify="start" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel onClick={() => setShowObservationDetailsDialog(true)} className={classes.labResultLableInput}>Lab:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.labName ? state.labName : null}</Typography>
                                            </Grid>

                                            {/*<Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>*/}
                                            {/*    <FormLabel className={classes.labResultLableInput}>Order #:</FormLabel>*/}
                                            {/*</Grid>*/}
                                            {/*<Grid container xs={12} sm={2} md={2} lg={2} xl={2}>*/}
                                            {/*    <Typography className={classes.valueText}>{state.labOrderId}</Typography>*/}
                                            {/*</Grid>*/}

                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Comments:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.internalNote}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid className={classes.gridHeight} container justify="start" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Order #:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.labOrderId}</Typography>
                                            </Grid>

                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Report Date:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.reportDate ? state.strReportDate + " " : ''} {state.strReportTime}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid className={classes.gridHeight} container justify="start" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Accession #:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.labRefNumber}</Typography>
                                            </Grid>

                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Receive Date:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{state.strReceivedDate ? state.strReceivedDate + " " : ''} {state.strReceivedTime}</Typography>
                                            </Grid>

                                            <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <FormLabel className={classes.labResultLableInput}>Attachment:</FormLabel>
                                            </Grid>
                                            <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <Typography className={classes.valueText}>{<LinkS target={"_blank"} href={"." + state.resultDocument}>{state.resultDocument = state.resultDocument ? state.resultDocument.split('\\')[4] : 'None'}</LinkS>}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid className={classes.gridHeightMargin} container justify="start" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Assign Provider" size={2} />
                                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <SearchList
                                                    id="userId"
                                                    name="userName"
                                                    value={state.userId}
                                                    searchTerm={state.userName}
                                                    code="provider_By_Search"
                                                    apiUrl="ddl/loadItems"
                                                    placeholderTitle="Search Provider"
                                                    isUser={true}
                                                    onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                />
                                            </Grid>
                                            <Label title="Assign Patient" size={2} />
                                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                                <SearchList
                                                    id="patientId"
                                                    name="patientName"
                                                    value={state.patientId}
                                                    searchTerm={state.patientName}
                                                    code="patient_Search"
                                                    apiUrl="ddl/loadItems"
                                                    placeholderTitle="Search Provider"
                                                    onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                <span className={classes.baseLine}> </span>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography
                                                className={classes.linkTextHeading}
                                                onClick={() => setShowOrderDetails(!showOrderDetails)} >
                                                {showOrderDetails ? "Hide Order Details" : "Show Order Details"}
                                            </Typography>
                                        </Grid>
                                        {showOrderDetails ? <>
                                            <Grid container justify="start" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Grid className={classes.gridHeight} container lg={12}>

                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.labResultLableInput}>Requesting Provider:</FormLabel>
                                                    </Grid>
                                                    <Grid container alignItems="center" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <Typography className={classes.valueText}>{state.userName ? state.userName : null}</Typography>
                                                    </Grid>

                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.labResultLableInput}>Account #:</FormLabel>
                                                    </Grid>
                                                    <Grid container alignItems="center" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <Typography className={classes.valueText}>{state.accountNo}</Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Grid container alignItems="center" justify="flex-end" sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.boldHeading}>Vender’s Patient Record:</FormLabel>
                                                    </Grid>
                                                </Grid>

                                                <Grid className={classes.gridHeight} container alignItems="center" lg={12}>

                                                    <Grid container alignItems="center" justify="flex-end" sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.labResultLableInput}>Patient Name:</FormLabel>
                                                    </Grid>
                                                    <Grid container alignItems="center" xs={12} xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <Typography className={classes.valueText}>{state.patientName ? state.patientName : null}</Typography>
                                                    </Grid>

                                                    <Grid container alignItems="center" justify="flex-end" sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.labResultLableInput}>DOB:</FormLabel>
                                                    </Grid>
                                                    <Grid container alignItems="center" xs={12} xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <Typography className={classes.valueText}>{state.birthDate}</Typography>
                                                    </Grid>

                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <FormLabel className={classes.labResultLableInput}>Gender:</FormLabel>
                                                    </Grid>
                                                    <Grid container alignItems="center" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                        <Typography className={classes.valueText}>{state.genderCode}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                            : ""}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                <span className={classes.baseLine}> </span>
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    {
                                        state.labTest ?
                                            state.labTest.map((item, l) => (
                                                <>
                                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>

                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <span style={{ display: "flex", marginBottom: 10 }}>
                                                                <Typography className={classes.linkHemoglobinHeading} >{item.testName}</Typography>
                                                                <Typography onClick={() => setShowTestDetails(!showTestDetails)} className={classes.linkTextHeading} >{showTestDetails ? "Hide Test Details" : "Show Test Details"}</Typography>
                                                            </span>
                                                        </Grid>
                                                        {showTestDetails ? <>
                                                            <div id={l} style={{ width: "100%" }}>
                                                                <Grid className={classes.gridHeight} container xs={12}>
                                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <FormLabel className={classes.boldHeading}>Specimen Info:</FormLabel>
                                                                    </Grid>
                                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2} />
                                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <FormLabel className={classes.boldHeading}>Test Details:</FormLabel>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className={classes.gridHeight} container xs={12}>
                                                                    <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <FormLabel className={classes.labResultLableInput}>Collection:</FormLabel>
                                                                    </Grid>
                                                                    <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <Typography className={classes.valueText}>{state.collection ? state.collection : null}</Typography>
                                                                    </Grid>

                                                                    <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <FormLabel className={classes.labResultLableInput}>Report Date:</FormLabel>
                                                                    </Grid>
                                                                    <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <Typography className={classes.valueText}>{state.reportDate}</Typography>
                                                                    </Grid>

                                                                    <Grid container justify="flex-end" xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <FormLabel className={classes.labResultLableInput}>Received Date:</FormLabel>
                                                                    </Grid>
                                                                    <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                                                        <Typography className={classes.valueText}>{state.receivedDate}</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                {/* <Grid className={classes.gridHeight} container xs={12}>
                                                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} />
                                                                    <Label title="Received Date" size={1} />
                                                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                                        <Typography className={classes.valueText}>{state.receivedDate}</Typography>
                                                                    </Grid>
                                                                </Grid> */}
                                                            </div>
                                                        </> : ""}
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                            <span className={classes.baseLine}> </span>
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        {
                                                            state.labTestComponent ?
                                                                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == item.labOrderTestId).map((itm, l) => (
                                                                    // state.labTestComponent.map((itm, l) => (
                                                                    <>
                                                                        <div className={classes.tableArea}>
                                                                            <div className={classes.tableHead}>
                                                                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                                                                    <FormLabel className={classes.tableLabel} >Observation</FormLabel>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                    <FormLabel className={classes.tableLabel} >Result</FormLabel>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                                                                    <FormLabel className={classes.tableLabel} >Reference/UoM</FormLabel>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                                                                    <FormLabel className={classes.tableLabel} >Date/Status</FormLabel>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                    <FormLabel className={classes.tableLabel} >PHR</FormLabel>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                    <FormControlLabel
                                                                                        classes={{ root: classes.formControlLabelRoot }}
                                                                                        label="Signed"
                                                                                        className={classes.formControlLabel}
                                                                                        control={<Checkbox
                                                                                            color="primary"
                                                                                            labelPlacement="start"
                                                                                            className={classes.labResultBoxBtn}
                                                                                            onChange={handleChange}
                                                                                            name="all"
                                                                                            id="" all
                                                                                            checked={state.all ? true : false}
                                                                                            {...props}

                                                                                        />}
                                                                                    />
                                                                                </Grid>
                                                                            </div>
                                                                            <div className={classes.tableBody}>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={3} md={3} lg={3}>
                                                                                    <Typography className={classes.observationNameText}>{itm.componentName}</Typography>
                                                                                </Grid>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={1} md={1} lg={1}>
                                                                                    <Typography className={classes.resultNameText}>{itm.resultValue}</Typography>
                                                                                </Grid>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={3} md={3} lg={3}>
                                                                                    <Typography className={classes.referenceNameText}>{itm.normalRange}</Typography>
                                                                                </Grid>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={3} md={3} lg={3}>
                                                                                    <Typography className={classes.dateNameText}>{itm.testComponentStatusCode}</Typography>

                                                                                </Grid>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={1} md={1} lg={1}>
                                                                                    <Switch
                                                                                        focusVisibleClassName={classes.focusVisible}
                                                                                        disableRipple
                                                                                        classes={{
                                                                                            root: classes.root,
                                                                                            switchBase: classes.switchBase,
                                                                                            thumb: classes.thumb,
                                                                                            track: classes.track,
                                                                                            checked: classes.checked,
                                                                                        }}
                                                                                        name="item"
                                                                                        id="item"
                                                                                        checked={state.item}
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid container alignItems="flex-start" xs={12} sm={1} md={1} lg={1}>
                                                                                    <Checkbox
                                                                                        className={classes.labResultBoxValueBtn}
                                                                                        color="primary"
                                                                                        name="item"
                                                                                        checked={itm.isSigned ? true : false}
                                                                                        onChange={handleCheckBoxChange}
                                                                                        {...props}

                                                                                    />
                                                                                </Grid>
                                                                            </div>
                                                                        </div>
                                                                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                            <Label title="Comments" size={1} isTextAreaInput={true} />
                                                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                                                <TextareaField
                                                                                    rowsMin={2}
                                                                                    id="providerComment"
                                                                                    name="providerComment"
                                                                                    value={itm.providerComment}
                                                                                    onChange={handleChange}
                                                                                    MaxLength="500"
                                                                                />
                                                                            </Grid>

                                                                        </Grid>
                                                                    </>
                                                                )) : null
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        {
                                                            state.labTestComponent ?
                                                                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == item.labOrderTestId).length > 0 ?
                                                                    <div style={{ display: "flex", width: "100%" }}>
                                                                        <span style={{ display: "flex", width: "70%", float: "left" }}>
                                                                        </span>
                                                                        <span style={{ float: "right", width: "30%", textAlign: "end" }}>
                                                                            <Typography className={classes.linkTextHeading}> Hide Observation Details </Typography>
                                                                        </span>
                                                                    </div>
                                                                    : null
                                                                : null
                                                        }
                                                        <div style={{ display: "flex", width: "100%" }}>
                                                            <span style={{ display: "flex", width: "70%", float: "left" }}>
                                                                <Typography className={classes.generalHeading}> Diagnoses Record Details </Typography>
                                                                {/*   <span title="Add"><img className={classes.labResultAddIconSpan} src={AddIcon} alt="add" /></span>*/}
                                                                {/*      <span className={classes.labResultAddIcon} onClick={() => setShowDiagnosisForm(true)}>Record Diagnoses</span>*/}
                                                            </span>
                                                            <span style={{ float: "right", width: "30%", textAlign: "end" }}>
                                                                {/*      <Typography className={classes.linkTextHeading}> Hide observation details </Typography>*/}
                                                            </span>
                                                        </div>

                                                        <div style={{ width: "100%" }}>
                                                            {
                                                                state.labOrderDiagnosis ?
                                                                    state.labOrderDiagnosis.filter(tmprmm => tmprmm.labTestId == item.labTestId).map((itmmm, j) => (
                                                                        //state.labOrderDiagnosis.map((itm, l) => (
                                                                        <Typography className={classes.diagnosesList}>- {itmmm.icdName}</Typography>
                                                                    ))
                                                                    : null
                                                            }
                                                            <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                                <span className={classes.baseLine}> </span>
                                                            </Typography>

                                                            <span style={{ display: "flex", width: "100%", float: "left", margin: "10px 0px" }}>
                                                                <Typography className={classes.medicationGeneralHeading}>Medication</Typography>
                                                                <span title="Add"><img className={classes.labResultAddIconSpan} src={AddIcon} alt="add" /></span>
                                                                <span className={classes.labResultAddIcon} onClick={() => setShowMedicationFrom(true)} >Add medication</span>
                                                            </span>
                                                            {
                                                                state.labOrderMedication ?
                                                                    state.labOrderMedication.map((item, l) => (
                                                                        <Typography className={classes.diagnosesList}>- {item.drugName}</Typography>
                                                                    ))
                                                                    : null
                                                            }
                                                        </div>

                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                            <span className={classes.baseLine}> </span>
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            )) : null
                                    }
                                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <span style={{ display: "flex" }}>
                                            <Typography className={classes.linkHemoglobinHeading} >Lipid Profile (Fasting)</Typography>
                                            <Typography className={classes.linkTextHeading} >Show test details</Typography>
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                            <span className={classes.baseLine}> </span>
                                        </Typography>
                                    </Grid> */}

                                </Grid>
                            </div>
                            {/* </div> */}
                        </Scrollbars>
                    </DialogContent>
                </Scrollbars>
            </Dialog>
            {
                showDiagnosisForm ? (<DiagnosisForm patientId={state.patientId} diagnosisId={state.diagnosisId} dialogOpenClose={showDiagnosisForm} handleClose={() => handleCloseDiagnossisForm()} handleSuccess={handleDialogSuccess}  />)
                    : ('')
            }
            {
                showMedicationFrom ? (<MedicationForm patientId={state.patientId} medicationId={state.medicationId} dialogOpenClose={showMedicationFrom} handleClose={() => handleCloseMedicationForm()} handleSuccess={handleDialogSuccess} />)
                    : ('')
            }


        </>
    )
}

export default withSnackbar(LabResultDetails)
