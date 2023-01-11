import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import {
    Grid,
    Dialog,
    Typography
} from "@material-ui/core";
import { CheckboxField } from "../../../../../../../../components/InputField/InputField";
// import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
// import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import { FormGroupTitle, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";

function SelectClinical({ dialogOpenClose, handleClose, getClinicalDocuments, ...props }) {
    var classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState(props.selectClinicalstate ? props.selectClinicalstate : defaulAttributes);
    const [defaulAttributes] = useState({
        socialHistory: true, vitalSigns: true, diagnosisHistory: true, assessmentPlan: true,
        medications: true, procedures: true, allergies: true, encounters: true, immunizations: true,
        chiefComplaint: true, laboratoryTest: true, implantableDevices: true, functionalStatus: true,
        congnitiveStatus: true, carePlan: true, healthConcerns: true});
    const getClinicalDocumentsSelection = () => {
        getClinicalDocuments(state);
        handleClose();
    }
    useEffect(() => {

    }, []);
    const closeDialog = () => {
        handleClose();

    }
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const handleSelectAllChange = (checked) => {
        setState(prevState => ({
            ...prevState,
            ['socialHistory']: checked,
            ['vitalSigns']: checked,
            ['diagnosisHistory']: checked,
            ['assessmentPlan']: checked,
            ['medications']: checked,
            ['procedures']: checked,
            ['allergies']: checked,
            ['encounters']: checked,
            ['immunizations']: checked,
            ['chiefComplaint']: checked,
            ['laboratoryTest']: checked,
            ['implantableDevices']: checked,
            ['functionalStatus']: checked,
            ['congnitiveStatus']: checked,
            ['carePlan']: checked,
            ['healthConcerns']: checked
        }))
    }
    return (
        <>
            <Dialog
                open={dialogOpenClose}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                maxWidth={'md'}
            >
                <Scrollbars autoHeight autoHeightMax={700} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle className={classes.lableTitleInput}>Create Clinical Document for Patient</FormGroupTitle>

                            </div>
                            <div className={classes.content}>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.selectContainer}>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography className={classes.selectSections}>Select Sections to include:
                                                <span title="Select All" className={classes.includLink} onClick={() => { handleSelectAllChange(true) }}>Select All</span>
                                                <span title="Select None" className={classes.includLink} onClick={() => { handleSelectAllChange(false) }}>Select None</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="socialHistory"
                                                checked={state?.socialHistory}
                                                onChange={handleChange}
                                                label="Social History (Smoking Status)"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="vitalSigns"
                                                checked={state?.vitalSigns}
                                                onChange={handleChange}
                                                label="Vital Signs (Height, Weight, Blood Pressure, BMI)"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="diagnosisHistory"
                                                checked={state?.diagnosisHistory}
                                                onChange={handleChange}
                                                label="Problems (Diagnosis History)"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="assessmentPlan"
                                                checked={state?.assessmentPlan}
                                                onChange={handleChange}
                                                label="Assessment & Plan (Plan, Schedule visits, Referrals)"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="medications"
                                                checked={state?.medications}
                                                onChange={handleChange}
                                                label="Medications"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="procedures"
                                                checked={state?.procedures}
                                                onChange={handleChange}
                                                label="Procedures"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="allergies"
                                                checked={state?.allergies}
                                                onChange={handleChange}
                                                label="Allergies"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="encounters"
                                                checked={state?.encounters}
                                                onChange={handleChange}
                                                label="Encounters"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="immunizations"
                                                checked={state?.immunizations}
                                                onChange={handleChange}
                                                label="Immunizations"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="chiefComplaint"
                                                checked={state?.chiefComplaint}
                                                onChange={handleChange}
                                                label="Chief Complaint"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="laboratoryTest"
                                                checked={state?.laboratoryTest}
                                                onChange={handleChange}
                                                label="Laboratory Test & Results"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="implantableDevices"
                                                checked={state?.implantableDevices}
                                                onChange={handleChange}
                                                label="Implantable Devices"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="functionalStatus"
                                                checked={state?.functionalStatus}
                                                onChange={handleChange}
                                                label="Functional Status"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="congnitiveStatus"
                                                checked={state?.congnitiveStatus}
                                                onChange={handleChange}
                                                label="Cognitive Status"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="carePlan"
                                                checked={state?.carePlan}
                                                onChange={handleChange}
                                                label="Care Plan"
                                            />
                                        </Grid>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <CheckboxField
                                                color="primary"
                                                name="healthConcerns"
                                                checked={state?.healthConcerns}
                                                onChange={handleChange}
                                                label="Health Concerns"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.selectContainer}>
                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}> &nbsp;</Grid>

                            </Grid>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.selectContainer}>

                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave" btnType="create" > Create </FormBtn>
                                        :
                                        <FormBtn id="save" btnType="create" onClick={getClinicalDocumentsSelection}> Create </FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose} > Cancel </FormBtn>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </ Scrollbars>
            </Dialog>



        </>
    )

}
export default SelectClinical