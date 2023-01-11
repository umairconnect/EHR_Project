import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import {
    Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from "./styles";
import PageTitle from '../../../components/PageTitle/PageTitle'
import { ShadowBoxMin } from '../../../components/UiElements/UiElements'//FormBtn, FormGroupTitle,
import "./styles";
// import { FormLabel, Grid, Typography } from '@material-ui/core';
// import { CheckboxField } from '../../../components/InputField/InputField';
import EnableEPrescription from './component/enableEPrescription/EnableEPrescription';
import PrescriptionInformation from './component//prescriptionInformation/PrescriptionInformation';
import ControlledSubstancesSignUp from './component//controlledSubstancesSignUp/ControlledSubstancesSignUp';
import ControlledSubstances from './component//controlledSubstances/ControlledSubstances';
import { useHistory } from "react-router-dom";
function EPrescriptionControlledSubstances() {
    const history = useHistory();
    var classes = useStyles();
    const [state, setState] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['New Lab Order', 'Lab Order', 'Payment Form', 'Submit Form'];
    const handleBack = (newState) => {
        setActiveStep(activeStep - 1);
    };
    const handleNext = (newState) => {
        setActiveStep(activeStep + 1);
    }

    const handleCheckBoxChange = (e) => {

        const { name, checked } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    function getStepContent(step) {

        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return <ControlledSubstancesSignUp handleNext={handleNext} type="epec" handleBack={handleBack} />
            case 1:
                return <EnableEPrescription handleNext={handleNext} handleBack={handleBack} pstate={state} />
            case 2:
                return <PrescriptionInformation handleNext={handleNext} handleBack={handleBack} pstate={state} />
            case 3:
                return <ControlledSubstances handleNext={handleNext} handleBack={handleBack} pstate={state} />
        }
    }

    return (
        <>
            <PageTitle title="Enabling e-Prescription" button={
                <Button
                    size="small"
                    id="btnIdGetPayers"
                    className={classes.newAddBtn}
                    onClick={() => {
                        history.goBack();
                    }}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Setup
                </Button>} />
            <div className={classes.ePrescriptionMainForm}>
                <ShadowBoxMin shadowSize={3}>
                    {
                        getStepContent(activeStep)
                    }
                </ShadowBoxMin>
            </div>
        </>
    )
}

export default EPrescriptionControlledSubstances
