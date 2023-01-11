import React, { useState, useEffect } from "react";
import {
    Dialog,
    Grid,
    Slide,
    FormLabel,
    Typography
} from "@material-ui/core";
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { FormBtn, FormGroupTitle, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import { Scrollbars } from 'rc-scrollbars';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

import useStyles from "./styles";
import { formatDate } from '../../../../../../components/Common/Extensions';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Recncoil({ dialogOpenClose, handleClose, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();

    const [allergiesList, setAllergiesList] = useState([]);

    const [plansObject, setPlansObject] = useState({});
    const [objProvider, setObjProvider] = useState({});

    const [chiefComplaintsList, setChiefComplaintsList] = useState([]);

    const [encountersList, setEncountersList] = useState([]);

    const [immunizationsList, setImmunizationsList] = useState([]);

    const [instructionsList, setInstructionsList] = useState([]);

    const [medicationsList, setMedicationsList] = useState([]);

    const [diagnosisList, setDiagnosisList] = useState([]);

    const [proceduresList, setProceduresList] = useState([]);

    const [resultsList, setResultsList] = useState([]);

    const [vitalsList, setVitalsList] = useState([]);
    const [lstImplantableDevices, setLstImplantableDevices] = useState([]);
    const [lstFunctionalStatus, setLstFunctionalStatus] = useState([]);
    const [lstHealthConcerns, setLstHealthConcerns] = useState([]);

    const handleAllergiesIgnore = (index) => {
        let lstData = allergiesList.filter((item, i) => { return i !== index });
        setAllergiesList(lstData);
    }
    const handleEncountersIgnore = (index) => {
        let lstData = encountersList.filter((item, i) => { return i !== index });
        setEncountersList(lstData);
    }
    const handleImmunizationsIgnore = (index) => {
        let lstData = immunizationsList.filter((item, i) => { return i !== index });
        setImmunizationsList(lstData);
    }
    const handleInstructionsIgnore = (index) => {
        let lstData = instructionsList.filter((item, i) => { return i !== index });
        setInstructionsList(lstData);
    }
    const handleDiagnosisIgnore = (index) => {
        let lstDiagnosis = diagnosisList.filter((item, i) => { return i !== index });
        setDiagnosisList(lstDiagnosis);
    }
    const handleMedicationsIgnore = (index) => {
        let lstMedications = medicationsList.filter((item, i) => { return i !== index });
        setMedicationsList(lstMedications);
    }
    const handleProceduresIgnore = (index) => {
        let lstData = proceduresList.filter((item, i) => { return i !== index });
        setProceduresList(lstData);
    }
    const handleResultsIgnore = (index) => {
        let lstData = resultsList.filter((item, i) => { return i !== index });
        setResultsList(lstData);
    }
    const handleVitalsIgnore = (index) => {
        let lstData = vitalsList.filter((item, i) => { return i !== index });
        setVitalsList(lstData);
    }
    const handleImplantableDevicesIgnore = (index) => {
        let lstData = lstImplantableDevices.filter((item, i) => { return i !== index });
        setLstImplantableDevices(lstData);
    }
    const handleFunctionalStatusIgnore = (index) => {
        let lstData = lstFunctionalStatus.filter((item, i) => { return i !== index });
        setLstFunctionalStatus(lstData);
    }
    const handleHealthConcernsIgnore = (index) => {
        let lstData = lstHealthConcerns.filter((item, i) => { return i !== index });
        setLstHealthConcerns(lstData);
    }

    useEffect(() => {
        setAllergiesList(props?.data?.lstAllergies);
        setPlansObject(props?.data?.objRiskAssessment);
        setChiefComplaintsList(props?.data?.lstChiefComplaints);
        setEncountersList(props?.data?.lstEncounter);
        setImmunizationsList(props?.data?.lstImmunizations);
        setInstructionsList(props?.data?.lstInstructions);
        setMedicationsList(props?.data?.lstMedications);
        setDiagnosisList(props?.data?.lstDiagnosis);
        setProceduresList(props?.data?.lstProcedures);
        setResultsList(props?.data?.lstLabResults);
        setVitalsList(props?.data?.objVitals?.items);
        setLstImplantableDevices(props?.data?.lstImplantableDevices);
        setLstFunctionalStatus(props?.data?.lstFunctionalStatus);
        setLstHealthConcerns(props?.data?.lstHealthConcerns);
        setObjProvider(props?.data?.objProvider);
    }, [props?.data]);
    const SaveImportedReferral = () => {
        let errorList = [];

        //Validate(errorList);
        if (errorList.length < 1) {
            //setIsSaving(true);
            let method = "patientrefferal/SaveImportedReferral";
            var state = {
                objPatient: props?.data?.objPatient,
                objDemographic: props?.data?.objDemographic,
                lstAllergies: allergiesList.filter(item => item.isNew == true),
                lstImmunizations: immunizationsList.filter(item => item.isNew == true),
                lstMedications: medicationsList.filter(item => item.isNew == true),
                lstProcedures: proceduresList.filter(item => item.isNew == true),
                lstDiagnosis: diagnosisList.filter(item => item.isNew == true),
                objRiskAssessment: plansObject,
                //objVitals: vitalsList,
                lstEncounter: encountersList.filter(item => item.isNew == true),
                lstChiefComplaints: chiefComplaintsList,
                lstLabResults: resultsList.filter(item => item.isNew == true),
                objProvider: objProvider
            };
            PostDataAPI(method, state, true).then((result) => {
                //setSaveLoading(false);
                //setIsSaving(false);
                if (result.success == true) {
                    if (result.success) {
                        showMessage("Success", "Patient data imported successfully.", "success", 2000);
                        handleClose();
                        //setState(result.data);
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
    return (
        <Dialog
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            TransitionComponent={Transition}
            open={dialogOpenClose}
            disableEnforceFocus
            // classes={classes.dialogPaper}
            maxWidth={'lg'}
            {...props} >

            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt='close' /></span>
                        <FormGroupTitle>Reconcile</FormGroupTitle>
                    </div>
                    <div className={classes.content}>

                        <Scrollbars style={{ height: 475 }}>
                            <div className={classes.righInnerContent}>
                                <FormLabel className={classes.heading}>Allergies </FormLabel>
                                <ul className={classes.list}>
                                    {allergiesList?.map((item, i) => {
                                        return <li>

                                            <div style={{ display: 'flex' }}>
                                                <FormLabel className={classes.title}>{item.allergyName}</FormLabel>
                                                <Typography className={item.isNew ? classes.colorText : classes.text} >{item?.severityCode}</Typography>
                                            </div>
                                            <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.createDate ? formatDate(item.createDate.split('T')[0]) : ''}</Typography></div>
                                            <div>
                                                {
                                                    item.isNew ?
                                                        <span style={{ display: 'flex' }}>
                                                            <FormBtn id="reset" size="small" onClick={() => { handleAllergiesIgnore(i) }}>Ignore</FormBtn>
                                                        </span>
                                                        : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                }
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                                {plansObject?.additionalInfo != null && plansObject?.additionalInfo != '' ?
                                    <>
                                        <FormLabel className={classes.heading}>Assessment and Plans</FormLabel>
                                        <ul className={classes.list}>
                                            {/*{*/}
                                            {/*    plansObject?.map((item, i) => {*/}

                                            <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{plansObject?.additionalInfo}</FormLabel>
                                                    <Typography className={plansObject?.isNew ? classes.colorText : classes.text}></Typography>
                                                </div>
                                                <div><Typography className={plansObject?.isNew ? classes.colorText1 : classes.text1}></Typography></div>
                                                <div>
                                                    {
                                                        plansObject?.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleDiagnosisIgnore(0) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>

                                            {/*    })*/}                                            {/*}*/}
                                        </ul>
                                    </> : null}
                                <FormLabel className={classes.heading}>Chief Complaints & Visit Reasons </FormLabel>
                                <ul className={classes.list}>
                                    {
                                        chiefComplaintsList?.map((item, i) => {
                                            return <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{item.encounterID}</FormLabel>
                                                    <Typography className={item.isNew ? classes.colorText : classes.text}>{item.cCDetail}</Typography>
                                                </div>
                                                <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.cCVisitReasonCode}</Typography></div>
                                                <div>
                                                    {
                                                        item.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleEncountersIgnore(i) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>
                                        })                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Encounter</FormLabel>
                                <ul className={classes.list}>
                                    {
                                        encountersList?.map((item, i) => {
                                            return <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{/*{item.encounterID}*/}</FormLabel>
                                                    <Typography className={item.isNew ? classes.colorText : classes.text}>{item.providerName + ' | ' + item.locationName}</Typography>
                                                </div>
                                                <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.encDatetime ? formatDate(item.encDatetime.split('T')[0]) : ''}</Typography></div>
                                                <div>
                                                    {
                                                        item.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleEncountersIgnore(i) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>
                                        })                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Immunizations </FormLabel>
                                <ul className={classes.list}>
                                    {immunizationsList?.map((item, i) => {
                                        return <li>

                                            <div style={{ display: 'flex' }}>
                                                <FormLabel className={classes.title}>{item.vaccine}</FormLabel>
                                                <Typography className={item.isNew ? classes.colorText : classes.text} >{props?.data?.objProvider?.firstName + ' ' + props?.data?.objProvider?.lastName}</Typography>
                                            </div>
                                            <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.createDate ? formatDate(item.createDate.split('T')[0]) : ''}</Typography></div>
                                            <div>
                                                {
                                                    item.isNew ?
                                                        <span style={{ display: 'flex' }}>
                                                            <FormBtn id="reset" size="small" onClick={() => { handleImmunizationsIgnore(i) }}>Ignore</FormBtn>
                                                        </span>
                                                        : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                }
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Instructions</FormLabel>
                                <ul className={classes.list}>
                                    {
                                        instructionsList?.map((item, i) => {
                                            return <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{item.icdCode}</FormLabel>
                                                    <Typography className={item.isNew ? classes.colorText : classes.text}>{item.icdName}</Typography>
                                                </div>
                                                <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.diagnosisDate ? formatDate(item.diagnosisDate.split('T')[0]) : ''}</Typography></div>
                                                <div>
                                                    {
                                                        item.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleInstructionsIgnore(i) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>
                                        })                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Medications </FormLabel>
                                <ul className={classes.list}>
                                    {medicationsList?.map((item, i) => {
                                        return <li>

                                            <div style={{ display: 'flex' }}>
                                                <FormLabel className={classes.title}>{item.drugName}</FormLabel>
                                                <Typography className={item.status ? classes.colorText : classes.text} >{item?.maxDailyDose + ' | ' + item?.sigNotes}</Typography>
                                            </div>
                                            <div><Typography className={item.status ? classes.colorText1 : classes.text1}>{item.startTakingDatetime ? formatDate(item.startTakingDatetime.split('T')[0]) : ''}</Typography></div>
                                            <div>
                                                {
                                                    item.isNew ?
                                                        <span style={{ display: 'flex' }}>
                                                            <FormBtn id="reset" size="small" onClick={() => { handleMedicationsIgnore(i) }}>Ignore</FormBtn>
                                                        </span>
                                                        : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                }
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Diagnosis</FormLabel>
                                <ul className={classes.list}>
                                    {
                                        diagnosisList?.map((item, i) => {
                                            return <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{item.icdCode}</FormLabel>
                                                    <Typography className={item.isNew ? classes.colorText : classes.text}>{item.icdName}</Typography>
                                                </div>
                                                <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.diagnosisDate ? formatDate(item.diagnosisDate.split('T')[0]) : ''}</Typography></div>
                                                <div>
                                                    {
                                                        item.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleDiagnosisIgnore(i) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>
                                        })                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Procedures</FormLabel>
                                <ul className={classes.list}>
                                    {proceduresList?.map((item, i) => {
                                        return <li>

                                            <div style={{ display: 'flex' }}>
                                                <FormLabel className={classes.title}>{item.name}</FormLabel>
                                                <Typography className={item.isNew ? classes.colorText : classes.text} >{item?.status}</Typography>
                                            </div>
                                            <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.encounterDate ? formatDate(item.encounterDate.split('T')[0]) : ''}</Typography></div>
                                            <div>
                                                {
                                                    item.isNew ?
                                                        <span style={{ display: 'flex' }}>
                                                            <FormBtn id="reset" size="small" onClick={() => { handleProceduresIgnore(i) }}>Ignore</FormBtn>
                                                        </span>
                                                        : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                }
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                                <FormLabel className={classes.heading}>Results</FormLabel>
                                <ul className={classes.list}>
                                    {
                                        resultsList?.map((item, i) => {
                                            return <li>
                                                <div style={{ display: 'flex' }}>
                                                    <FormLabel className={classes.title}>{item.testName}</FormLabel>
                                                    <Typography className={item.isNew ? classes.colorText : classes.text}>{item.resultValue + ' | ' + item.labName}</Typography>
                                                </div>
                                                <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.resultDate ? formatDate(item.resultDate.split('T')[0]) : ''}</Typography></div>
                                                <div>
                                                    {
                                                        item.isNew ?
                                                            <span style={{ display: 'flex' }}>
                                                                <FormBtn id="reset" size="small" onClick={() => { handleResultsIgnore(i) }}>Ignore</FormBtn>
                                                            </span>
                                                            : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                    }
                                                </div>
                                            </li>
                                        })                                    }
                                </ul>
                                {/*<FormLabel className={classes.heading}>Vitals</FormLabel>*/}
                                {/*<ul className={classes.list}>*/}
                                {/*    {*/}
                                {/*        vitalsList?.map((item, i) => {*/}
                                {/*            return <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FormLabel className={classes.title}>{item.icdCode}</FormLabel>*/}
                                {/*                    <Typography className={classes.text}>{item.icdName}</Typography>*/}
                                {/*                </div>*/}
                                {/*                <div><Typography className={classes.text1}>{item.diagnosisDate ? formatDate(item.diagnosisDate.split('T')[0]) : ''}</Typography></div>*/}
                                {/*                <div>*/}
                                {/*                    {*/}
                                {/*                        item.isNew ?*/}
                                {/*                            <span style={{ display: 'flex' }}>*/}
                                {/*                                <FormBtn id="reset" size="small" onClick={() => { handleDiagnosisIgnore(i) }}>Ignore</FormBtn>*/}
                                {/*                            </span>*/}
                                {/*                            : <Typography className={classes.text2}>cannot be deleted</Typography>*/}
                                {/*                    }*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*        })*/}                                {/*    }*/}
                                {/*</ul>*/}
                                {lstImplantableDevices != null && lstImplantableDevices.length > 0 ?
                                    <>
                                        <FormLabel className={classes.heading}>Implantable Devices</FormLabel>
                                        <ul className={classes.list}>
                                            {lstImplantableDevices?.map((item, i) => {
                                                return <li>

                                                    <div style={{ display: 'flex' }}>
                                                        <FormLabel className={classes.title}>{item.brandName}</FormLabel>
                                                        <Typography className={item.isNew ? classes.colorText : classes.text} >{item?.gmdnPtname}</Typography>
                                                    </div>
                                                    <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.implantDate ? formatDate(item.implantDate.split('T')[0]) : ''}</Typography></div>
                                                    <div>
                                                        {
                                                            item.isNew ?
                                                                <span style={{ display: 'flex' }}>
                                                                    <FormBtn id="reset" size="small" onClick={() => { handleImplantableDevicesIgnore(i) }}>Ignore</FormBtn>
                                                                </span>
                                                                : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                        }
                                                    </div>
                                                </li>
                                            })
                                            }
                                        </ul>
                                    </>
                                    : ''}
                                {lstFunctionalStatus != null && lstFunctionalStatus.length > 0 ?
                                    <>
                                        <FormLabel className={classes.heading}>Functional Status</FormLabel>
                                        <ul className={classes.list}>
                                            {lstFunctionalStatus?.map((item, i) => {
                                                return <li>

                                                    <div style={{ display: 'flex' }}>
                                                        <FormLabel className={classes.title}>{item.type}</FormLabel>
                                                        <Typography className={item.isNew ? classes.colorText : classes.text} >{item?.activityCode}</Typography>
                                                    </div>
                                                    <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.createDate ? formatDate(item.createDate.split('T')[0]) : ''}</Typography></div>
                                                    <div>
                                                        {
                                                            item.isNew ?
                                                                <span style={{ display: 'flex' }}>
                                                                    <FormBtn id="reset" size="small" onClick={() => { handleFunctionalStatusIgnore(i) }}>Ignore</FormBtn>
                                                                </span>
                                                                : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                        }
                                                    </div>
                                                </li>
                                            })
                                            }
                                        </ul>
                                    </>
                                    : ''}
                                {lstHealthConcerns != null && lstHealthConcerns.length > 0 ?
                                    <>
                                        <FormLabel className={classes.heading}>Health Concerns</FormLabel>
                                        <ul className={classes.list}>
                                            {lstHealthConcerns?.map((item, i) => {
                                                return <li>

                                                    <div style={{ display: 'flex' }}>
                                                        <FormLabel className={classes.title}>{item.icdName}</FormLabel>
                                                        <Typography className={item.isNew ? classes.colorText : classes.text} >{item?.notes}</Typography>
                                                    </div>
                                                    <div><Typography className={item.isNew ? classes.colorText1 : classes.text1}>{item.diagnosisDate ? formatDate(item.diagnosisDate.split('T')[0]) : ''}</Typography></div>
                                                    <div>
                                                        {
                                                            item.isNew ?
                                                                <span style={{ display: 'flex' }}>
                                                                    <FormBtn id="reset" size="small" onClick={() => { handleHealthConcernsIgnore(i) }}>Ignore</FormBtn>
                                                                </span>
                                                                : <Typography className={classes.text2}>cannot be deleted</Typography>
                                                        }
                                                    </div>
                                                </li>
                                            })
                                            }
                                        </ul>
                                    </>
                                    : ''}
                            </div>
                        </Scrollbars>

                        {/*<div >*/}
                        {/*    <Grid container alignItems="flex-end" justifyContent="flex-end" direction="row" >*/}
                        {/*        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />*/}
                        {/*        <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>*/}
                        {/*            <Grid container alignItems="flex-end" justifyContent="flex-end" direction="row" >*/}
                        {/*                <FormBtn id="save" size="medium" btnType="html" onClick={SaveImportedReferral}>Save</FormBtn>*/}
                        {/*                */}{/*<FormBtn id="save" size="medium" btnType="xml"> Download XML </FormBtn>*/}
                        {/*                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}
                        {/*</div>*/}


                    </div>
                    <div className={classes.footer}>
                        <Grid container>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.btnCenter}>

                                {/*{isSaving ?*/}
                                {/*    <FormBtn id="loadingSave" > Save</FormBtn>*/}
                                {/*    :*/}
                                <FormBtn id="save" onClick={SaveImportedReferral}> Save</FormBtn>
                                {/*}*/}
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div >

        </Dialog >
    )
}
export default withSnackbar(Recncoil)

