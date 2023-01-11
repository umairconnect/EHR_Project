import React, { useState, useEffect, useRef } from "react"
import { scroller } from "react-scroll";
import {
    Dialog,
    Slide,
    Grid,
    FormHelperText,
    Typography,
    FormLabel,
    InputBase,
    InputAdornment,
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import { FormBtn, FormGroupTitle, Label, LinkS, ProgressBar, DraggableComponent } from "../../../../../../components/UiElements/UiElements";

import { withSnackbar } from "../../../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { Scrollbars } from 'rc-scrollbars';


import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ImportPatientReferral({ dialogOpenClose, handleClose, updatedData, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    const secAllergies = useRef(null);
    const clinicalModel = useRef(null);
    //
    const Allergies = useRef(null);
    const AssessmentAndPlans = useRef(null);
    const ChiefComplaintAndVisitReasons = useRef(null);
    const Encounters = useRef(null);
    const Immunizations = useRef(null);
    const Instructions = useRef(null);
    const Medications = useRef(null);
    const ProblemList = useRef(null);
    const Procedures = useRef(null);
    const Results = useRef(null);
    const VitalSigns = useRef(null);
    //
    const [filterDataList, setFilterDataList] = useState([
        { value: 0, title: "Allergies" },
        { value: 1, title: "Assessment and Plans" },
        { value: 2, title: "Chief Complaint & Visit Reasons" },
        { value: 3, title: "Encounters" },
        { value: 4, title: "Immunizations" },
        { value: 5, title: "Instructions" },
        { value: 6, title: "Medications" },
        { value: 7, title: "Problem List" },
        { value: 8, title: "Procedures" },
        { value: 9, title: "Results" },
        { value: 10, title: "Vital Signs" },
    ]);
    const [resultsList, setResultList] = useState([
        { value: 1, textComponent: "Color of Urine", result: "Pale (yellow)", standardRange: "-" },
        { value: 0, textComponent: "Protein[mass/volume]Urine by Test strip (mg/dL)", result: "150", standardRange: "-" },
    ]);
    const [vitalsList, setVitalsList] = useState([
        { label: "Height", value: "5ft" },
        { label: "Weight", value: "108lbs" },
        { label: "BMI", value: "20.5" },
        { label: "BP", value: "130/60mmHg" },
        { label: "SpO2", value: "98 %" },
        { label: "HR", value: "83" },
    ]);
    //end drop down list
    const [errorMessages, setErrorMessages] = useState({});
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //handle Serach on Input
    const [searchList, setSearchList] = useState("");
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    // handle styles

    const [state, setState] = useState(props.data);
    const scrollToSection = (section) => {
        switch (section) {
            case 0:
                return Allergies.current?.scrollIntoView({ behavior: 'smooth' });
            case 1:
                return AssessmentAndPlans.current?.scrollIntoView({ behavior: 'smooth' });
            case 2:
                return ChiefComplaintAndVisitReasons.current?.scrollIntoView({ behavior: 'smooth' });
            case 3:
                return Encounters.current?.scrollIntoView({ behavior: 'smooth' });
            case 4:
                return Immunizations.current?.scrollIntoView({ behavior: 'smooth' });
            case 5:
                return Instructions.current?.scrollIntoView({ behavior: 'smooth' });
            case 6:
                return Medications.current?.scrollIntoView({ behavior: 'smooth' });
            case 7:
                return ProblemList.current?.scrollIntoView({ behavior: 'smooth' });
            case 8:
                return Procedures.current?.scrollIntoView({ behavior: 'smooth' });
            case 9:
                return Results.current?.scrollIntoView({ behavior: 'smooth' });
            case 10:
                return VitalSigns.current?.scrollIntoView({ behavior: 'smooth' });
            default:
                return null
        }
        // scroller.scrollTo(20);
        //scroller.scrollTo(secAllergies, {
        //    duration: 800,
        //    delay: 0,
        //    smooth: "easeInOutQuart",
        //});
        // clinicalModel.current.scrollTo({
        //     top: section.current.offsetTop,
        //     behavior: 'smooth'
        // });
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    useEffect(() => {

    }, [dialogOpenClose]);

    const SaveImportedReferral = () => {
        let errorList = [];

        //Validate(errorList);
        if (errorList.length < 1) {
            //setIsSaving(true);
            let method = "patientrefferal/SaveImportedReferral";
            props.data.objPatient.chartNumber = props.data.objPatient.firstName.slice(0, 2).toUpperCase() + props.data.objPatient.lastName.slice(0, 2).toUpperCase();
            PostDataAPI(method, props.data, true).then((result) => {
                //setSaveLoading(false);
                //setIsSaving(false);
                if (result.success == true) {
                    if (result.success) {
                        //setState(result.data);
                        showMessage("Success", "Patient data imported successfully.", "success", 2000);
                        handleClose();
                        //setClinicalSummaryDialogState(true);                        
                    }

                }
                else {
                    // showMessage("Error", result.message, "error", 15000);
                    showMessage("Error", result.message, "error", 3000);

                    //setIsSaving(false);
                }
            })
        }
    }
    function deleteRecord() {
        setLoading({ isDeleting: true });
        PostDataAPI('patient/diagnosis/delete', state, true).then((result) => {
        })
    }
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
        setTimeout(() => { handleClose(); }, 3000);
    }
    return (
        <div>
            <Dialog
                PaperComponent={DraggableComponent}
                disableBackdropClick
                disableEscapeKeyDown
                TransitionComponent={Transition}
                open={dialogOpenClose}
                disableEnforceFocus
                classes={classes.dialogPaper}
                maxWidth={'lg'}
                {...props} >

                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle>Clinical Summary</FormGroupTitle>
                        </div>
                        <div className={classes.content}>

                            <div className={classes.DialogContentLeftSide}>
                                <div className={classes.box}>
                                    <div className={classes.content}>
                                        {/* <div className={classes.quickPickHeader}> */}
                                        {
                                            filterDataList.length <= 0 ?
                                                <img className={classes.loader} src={LoadingIcon} alt="Loading..." />
                                                :
                                                <ul className={classes.templatesList}>
                                                    <Scrollbars style={{ minHeight: 520 }} >

                                                        {filterDataList.map((item, i) => (
                                                            <li key={i} onClick={() => { scrollToSection(item?.value) }}>
                                                                <span >{item.title}</span>
                                                                {/*<a href={`#${item.title}`}>{item.title}</a>*/}
                                                            </li>
                                                        ))}
                                                        {/* {filterDataList.length === 0 && searchList != 0 ? <span className={classes.noRecordFound}><span><SearchIcon /></span>No records found </span> : ""} */}
                                                    </Scrollbars>
                                                </ul>
                                        }
                                        {/* </div> */}
                                    </div>

                                </div>
                            </div>

                            <div className={classes.DialogContentRightSide}>
                                <div className={classes.box}>

                                    <div className={classes.content}>
                                        <Scrollbars style={{ height: 475 }}>
                                            <div className={classes.righInnerContent} ref={clinicalModel}>

                                                {/* <Grid container> */}
                                                <div className={classes.headerSubContainer}>

                                                    <div className={classes.headerSubContainerChild}>
                                                        <span>
                                                            <Typography className={classes.largeHeaderLabel}>Patient Name:</Typography>
                                                            <Typography className={classes.largeLabelValue}>{props?.data?.objPatient?.firstName + ' ' + props?.data?.objPatient?.lastName}</Typography>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={classes.headerSubContainer}>


                                                    <div className={classes.headerSubContainerChild}>
                                                        <span>
                                                            <Typography className={classes.headerLabel}>Race:</Typography>
                                                            <Typography className={classes.labelValue}>{props?.data?.objDemographic?.raceCode}</Typography>
                                                        </span>
                                                        <span>
                                                            <Typography className={classes.headerLabel}>Ethnicity:</Typography>
                                                            <Typography className={classes.labelValue}>{props?.data?.objDemographic?.ethnicityCode}</Typography>
                                                        </span>
                                                        <span>
                                                            <Typography className={classes.headerLabel}>Preferred Language:</Typography>
                                                            <Typography className={classes.labelValue}>{props?.data?.objDemographic?.prefferedCommunicationCode}</Typography>
                                                        </span>

                                                    </div>

                                                    <div className={classes.headerSubContainerChild}>

                                                        <span>
                                                            <Typography className={classes.headerLabel}>Provider:</Typography>
                                                            <Typography className={classes.labelValue}>{state.provider ? state.provider : ""}</Typography>
                                                            {/*.split('T')[0]*/}
                                                        </span>

                                                        <span>
                                                            <Typography className={classes.headerLabel}>Provider Phone:</Typography>
                                                            <Typography className={classes.labelValue}>{state.providerPhone ? state.provider : ""}</Typography>
                                                        </span>
                                                        <span>
                                                            <Typography className={classes.headerLabel}>Provider Address:</Typography>
                                                            <Typography className={classes.labelValue}>{state.address ? state.address : ""}</Typography>
                                                        </span>

                                                    </div>

                                                </div>
                                                <div ref={Allergies}>
                                                    <FormGroupTitle>Allergies</FormGroupTitle>
                                                    <Grid container ref={secAllergies}>
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="25%">Allergy</th>
                                                                        <th width="25%">Date</th>
                                                                        <th width="25%">Reaction Status</th>
                                                                        <th width="25%">Severity Status</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.lstAllergies ?
                                                                        props?.data?.lstAllergies.map((item, i) => {
                                                                            return <tr>
                                                                                <td >{item.allergyName}</td>
                                                                                <td >{item.createDate ? item.createDate.split('T')[0] : ''}</td>
                                                                                <td >{item.allergyStatusCode}</td>
                                                                                <td >{item.severityCode}</td>
                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div ref={AssessmentAndPlans}>
                                                    <FormGroupTitle>Assessment and Plans</FormGroupTitle>
                                                    <div className={classes.headerSubContainer} container id="Assessment and Plans">

                                                        <div className={classes.headerSubContainerChild}>
                                                            <span>
                                                                <Typography className={classes.headerLabel}>Assessment and Plans:</Typography>
                                                                <Typography className={classes.labelValue}>{props?.data?.objRiskAssessment?.additionalInfo ? props?.data?.objRiskAssessment?.additionalInfo : "Not identified"}</Typography>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div ref={ChiefComplaintAndVisitReasons}>
                                                    <FormGroupTitle>Chief Complaints & Visit Reasons</FormGroupTitle>
                                                    <div className={classes.headerSubContainer} container id="Chief Complaint & Visit Reasons">

                                                        <div className={classes.headerSubContainerChild}>
                                                            <span>
                                                                <Typography className={classes.headerLabel}>Chief Complaints & Visit Reasons:</Typography>
                                                                <Typography className={classes.labelValue}>{props?.data?.objChiefComplaint?.cCDetail ? props?.data?.objChiefComplaint.cCDetail : "Not indicated"}</Typography>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div ref={Encounters}>
                                                    <FormGroupTitle>Encounter</FormGroupTitle>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <table className={classes.resultsTable}>
                                                            <thead>
                                                                <tr>
                                                                    <th width="25%">Type</th>
                                                                    <th width="25%">DOS</th>
                                                                    <th width="25%">Performer</th>
                                                                    <th width="25%">Location</th>
                                                                </tr>
                                                            </thead>
                                                            {
                                                                props?.data?.lstEncounters ?
                                                                    props?.data?.lstEncounters.map((item, i) => {
                                                                        return <tr>
                                                                            <td >{item.encounterID}</td>
                                                                            <td >{item.encDatetime ? item.encDatetime.split('T')[0] : ''}</td>
                                                                            <td >{item.providerName}</td>
                                                                            <td >{item.locationName}</td>
                                                                        </tr>
                                                                    })
                                                                    : null
                                                            }
                                                        </table>

                                                    </Grid>
                                                </div>

                                                <div ref={Immunizations}>
                                                    <FormGroupTitle>Immunizations</FormGroupTitle>
                                                    <Grid container id="Immunizations">
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="25%">Name</th>
                                                                        <th width="25%">Status</th>
                                                                        {/*<th width="20%">Source</th>*/}
                                                                        <th width="25%">Date</th>
                                                                        <th width="25%">Provider</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.lstImmunizations ?
                                                                        props?.data?.lstImmunizations.map((item, i) => {
                                                                            return <tr>
                                                                                <td >{item.vaccine}</td>
                                                                                <td >{item.status}</td>
                                                                                {/*<td >{item.vaccine}</td>*/}
                                                                                <td >{item.createDate ? item.createDate.split('T')[0] : ''}</td>
                                                                                <td >{props?.data?.objProvider?.firstName + ' ' + props?.data?.objProvider?.lastName}</td>
                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div ref={Instructions}>
                                                    <FormGroupTitle>Instructions</FormGroupTitle>
                                                    <div className={classes.headerSubContainer} container id="Instructions">
                                                        <div className={classes.headerSubContainerChild}>
                                                            <span>
                                                                <Typography className={classes.allergyHeaderLabel}>Title:</Typography>
                                                                <Typography className={classes.allergyLabelValue}>Instruction excluded/not available</Typography>
                                                            </span>
                                                        </div>
                                                        <div className={classes.headerSubContainerChild}>
                                                            <span>
                                                                <Typography className={classes.allergyHeaderLabel}>Directives:</Typography>
                                                                <Typography className={classes.allergyLabelValue}>N/A</Typography>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div ref={Medications}>
                                                    <FormGroupTitle>Medications</FormGroupTitle>
                                                    <Grid container id="Medications">
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="20%">Drug Name</th>
                                                                        <th width="20%">Date</th>
                                                                        <th width="20%">Directions</th>
                                                                        <th width="20%">Qty</th>
                                                                        <th width="20%">Prescribed by</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.lstMedications ?
                                                                        props?.data?.lstMedications.map((item, i) => {
                                                                            return <tr>
                                                                                <td >{item.drugName}</td>
                                                                                <td >{item.startTakingDatetime ? item.startTakingDatetime.split('T')[0] : ''}</td>
                                                                                <td >{item.sigNotes}</td>
                                                                                <td >{item.maxDailyDose}</td>
                                                                                <td >{props?.data?.objProvider?.firstName + ' ' + props?.data?.objProvider?.lastName}</td>
                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div ref={ProblemList}>
                                                    <FormGroupTitle>Problem List</FormGroupTitle>
                                                    <Grid container id="Problem List">
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="40%">Condition</th>
                                                                        <th width="30%">Date</th>
                                                                        <th width="30%">Status</th>
                                                                        {/*<th width="20%">Health Status</th>*/}
                                                                        {/*<th width="25%">Informant</th>*/}
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.lstDiagnosis ?
                                                                        props?.data?.lstDiagnosis.map((item, i) => {
                                                                            return <tr>
                                                                                <td >{item.snomedCtCode}</td>
                                                                                <td >{item.diagnosisDate ? item.diagnosisDate.split('T')[0] : ''}</td>
                                                                                <td >{item.status}</td>
                                                                                {/*<td >{item.status}</td>*/}
                                                                                {/*<td >{item.status}</td>*/}
                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div ref={Procedures}>
                                                    <FormGroupTitle>Procedures</FormGroupTitle>
                                                    <Grid container id="Procedures">
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="35%">Name</th>
                                                                        <th width="35%">Status</th>
                                                                        <th width="30%">Performed Date</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.lstProcedures ?
                                                                        props?.data?.lstProcedures.map((item, i) => {
                                                                            return <tr>
                                                                                <td >{item.name}</td>
                                                                                <td >{item.status}</td>
                                                                                <td >{item.encounterDate ? item.encounterDate.split('T')[0] : ''}</td>
                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div ref={Results}>
                                                    <FormGroupTitle>Results</FormGroupTitle>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <table className={classes.resultsTable}>
                                                            <thead>
                                                                <tr>
                                                                    <th width="20%">Lab</th>
                                                                    <th width="20%">Location</th>
                                                                    <th width="20%">Test</th>
                                                                    <th width="20%">Value</th>
                                                                    <th width="20%">Date</th>
                                                                </tr>
                                                            </thead>
                                                            {
                                                                props?.data?.lstLabResults ?
                                                                    props?.data?.lstLabResults.map((item, i) => {
                                                                        return <tr>
                                                                            <td >{item.labName}</td>
                                                                            <td >{item.locationName}</td>
                                                                            <td >{item.testName}</td>
                                                                            <td >{item.resultValue}</td>
                                                                            <td >{item.resultDate ? item.resultDate.split('T')[0] : ''}</td>
                                                                        </tr>
                                                                    })
                                                                    : null
                                                            }
                                                        </table>

                                                    </Grid>
                                                </div>

                                                {/*<Grid container justifyContent="flex-end" id="Results">*/}

                                                {/*    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>*/}
                                                {/*        <Typography className={classes.resultText}>Urine Results</Typography>*/}
                                                {/*    </Grid>*/}

                                                {/*    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>*/}
                                                {/*        <Grid container justifyContent='flex-end'>*/}
                                                {/*            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>*/}
                                                {/*                <Typography className={classes.resultTextBold}>Healthcare Labs</Typography>*/}
                                                {/*            </Grid>*/}
                                                {/*            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>*/}
                                                {/*                <Typography className={classes.resultLabel}>Provider : Melvin B. Price   |   10/19/2021</Typography>*/}
                                                {/*            </Grid>*/}
                                                {/*        </Grid>*/}
                                                {/*    </Grid>*/}

                                                {/*</Grid>*/}

                                                {/*<Grid container alignItems="flex-end" justifyContent="space-between" >*/}

                                                {/*    <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>*/}
                                                {/*        <Typography className={classes.resultLabel2}>Patient: John Doe   |   ID:  10/19/2021</Typography>*/}
                                                {/*    </Grid>*/}

                                                {/*    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>*/}
                                                {/*        <Typography className={classes.resultLabel}>Received on: 10/20/2021</Typography>*/}
                                                {/*    </Grid>*/}

                                                {/*</Grid>*/}

                                                {/*<Grid container >*/}
                                                {/*    <Grid item xs={12} sm={12} md={12} lg={12}>*/}
                                                {/*        <table className={classes.resultsTable}>*/}
                                                {/*            <thead>*/}
                                                {/*                <tr>*/}
                                                {/*                    <th colSpan="1">Test Component</th>*/}
                                                {/*                    <th colSpan="2">Result</th>*/}
                                                {/*                    <th colSpan="2">Standard Range</th>*/}
                                                {/*                </tr>*/}
                                                {/*            </thead>*/}
                                                {/*            {*/}
                                                {/*                resultsList ?*/}
                                                {/*                    resultsList.map((item, i) => {*/}
                                                {/*                        return <tr>*/}
                                                {/*                            <td colSpan="1">{item.textComponent}</td>*/}
                                                {/*                            <td colSpan="2">{item.result}</td>*/}
                                                {/*                            <td colSpan="2">*/}
                                                {/*                                <div style={{ textAlign: 'center' }}>*/}
                                                {/*                                    {item.standardRange}*/}
                                                {/*                                </div>*/}
                                                {/*                            </td>*/}
                                                {/*                        </tr>*/}
                                                {/*                    })*/}
                                                {/*                    : null*/}
                                                {/*            }*/}
                                                {/*        </table>*/}

                                                {/*    </Grid>*/}
                                                {/*</Grid>*/}

                                                {/*<Grid container alignItems="flex-end" justifyContent="space-between" >*/}

                                                {/*    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>*/}
                                                {/*        <Typography className={classes.resultText}>RFT</Typography>*/}
                                                {/*    </Grid>*/}

                                                {/*    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>*/}
                                                {/*        <Grid container>*/}
                                                {/*            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>*/}
                                                {/*                <Typography className={classes.resultTextBold}>Healthcare Labs</Typography>*/}
                                                {/*            </Grid>*/}
                                                {/*            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>*/}
                                                {/*                <Typography className={classes.resultLabel}>Provider : Melvin B. Price   |   10/19/2021</Typography>*/}
                                                {/*            </Grid>*/}
                                                {/*        </Grid>*/}
                                                {/*    </Grid>*/}

                                                {/*</Grid>*/}
                                                <div ref={VitalSigns}>
                                                    <FormGroupTitle>Vitals</FormGroupTitle>
                                                    <Grid container id="Vital Signs" >
                                                        {/*<Typography className={classes.resultLabel}><strong>Date:</strong> 02/18/2021</Typography>*/}
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <table className={classes.resultsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="50%">Vitals</th>
                                                                        <th width="50%">Values</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    props?.data?.objVitals?.items ?
                                                                        props?.data?.objVitals?.items.map((item, i) => {
                                                                            return <tr>
                                                                                {Object.keys(item).map(key => (
                                                                                    <>
                                                                                        <td >{key}</td>
                                                                                        <td>{item[key]}</td>
                                                                                    </>
                                                                                ))}

                                                                            </tr>
                                                                        })
                                                                        : null
                                                                }
                                                            </table>

                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                {/* </Grid> */}
                                            </div>

                                        </Scrollbars>

                                    </div>
                                    <div >
                                        <Grid container alignItems="flex-end" justifyContent="flex-end" direction="row" >
                                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                                <Grid container alignItems="flex-end" justifyContent="flex-end" direction="row" >
                                                    <FormBtn id="save" onClick={SaveImportedReferral}> Save</FormBtn>
                                                    {/*<FormBtn id="save" size="medium" btnType="html"> Download HTML </FormBtn>*/}
                                                    {/*<FormBtn id="save" size="medium" btnType="xml"> Download XML </FormBtn>*/}
                                                    <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >

            </Dialog >
        </div >
    )
}

export default withSnackbar(ImportPatientReferral)