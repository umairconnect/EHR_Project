import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
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
import PrescriptionInformation from './component/prescriptionInformation/PrescriptionInformation';
import PrescriptionSignUp from './component/prescriptionSignUp/PrescriptionSignUp';
import PrescriptionAuthentication from './component/prescriptionAuthentication/PrescriptionAuthentication';
import { useHistory } from "react-router-dom";
import { IsEditable } from '../../../Services/GetUserRolesRights';
function EnablingEPrescription(props) {
    const history = useHistory();
    var classes = useStyles();
    const [state, setState] = useState({});
    const [infoState, setInfoState] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['PrescriptionSignUp', 'EnableEPrescription', 'PrescriptionInformation', 'PrescriptionAuthentication'];
    const [isEditable] = useState(IsEditable("eRXSettings"));
    const getInfo = (stepInfo) => {
        console.log(stepInfo);
        setInfoState(stepInfo)
    }

    const handleBack = (newState) => {
        setState({ ...state, ...newState });
        setActiveStep(activeStep - 1);
    };
    const handleNext = (newState) => {
        // setState(newState);
        setState({ ...state, ...newState });


        // setActiveStep(activeStep + 1);

        if (infoState.eprescriptionRequestId > 0) {
            setActiveStep(activeStep + 2);
        } else if (infoState.requestStatusCode == "Initiated") {
            setActiveStep(activeStep + 3);
        } else if (infoState.requestStatusCode == "Verified" || infoState.requestStatusCode == "Active") {
            setActiveStep(activeStep + 4);
        } else {
            setActiveStep(activeStep + 1);
        }

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
                return <PrescriptionSignUp handleNext={handleNext} type={props.type} handleBack={handleBack} {...state} getProcessInfo={(infoState) => getInfo(infoState)} isEditable={isEditable}/>
            case 1:
                return <EnableEPrescription handleNext={handleNext} pstate={state} handleBack={handleBack} {...state} isEditable={isEditable}/>
            case 2:
                return <PrescriptionInformation handleNext={handleNext} pstate={state} handleBack={handleBack} {...state} isEditable={isEditable}/>
            case 3:
                return <PrescriptionAuthentication handleNext={handleNext} pstate={state} handleBack={handleBack} {...state} isEditable={isEditable}/>
            default:
                break;
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

export default EnablingEPrescription
