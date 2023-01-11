import React, { useState, useEffect } from 'react'

import { FormLabel, Grid, Typography, FormHelperText } from '@material-ui/core';
import { FormGroupTitle, Label, FormBtn } from '../../../../../components/UiElements/UiElements';
import { CheckboxField, InputBaseField, SelectField } from '../../../../../components/InputField/InputField';
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { ERROR } from '../../../../../redux/actions/types';
import { USAStateListOptions, CountryListOptions } from "../../../../../context/StaticDropDowns";
import { withSnackbar } from "../../../../../components/Message/Alert";
import moment from 'moment';

function PrescriptionInformation({ handleNext, handleBack, pstate, ...props }) {

    const { showMessage } = props;
    const classes = useStyles();
    const [specialityList, setSpecialityList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [state, setState] = useState({
        firstName: "", middleName: "", lastName: "", primarySpecialtyId: "", secondarySpecialtyId: "", medicalLicenseNumber: "",
        medicalLicenseExpiry: null, licenseIssuingState: "", degreeOnLicense: "", npi: "", deaNumber: "", isAgree: false
    });

    const [errorMessages, setErrorMessages] = useState({
        firstNameError: false, lastNameError: false, primarySpecialtyError: false,
        secondarySpecialtyError: false, medicalLicenseNoError: false, expirationError: false, stateIssuingMedicalLicenseError: false,
        degreeListedOnLicenseError: false, personalNpiError: false, deaError: false, termAndConditionsError: false, expiryDateError: false
    });

    function loadLoginUserInfo() {
        var userInfo = sessionStorage.getItem('user_info');
        var userId = JSON.parse(userInfo).user.userID;
        let data = {
            userID: userId
        }
        PostDataAPI("user/getUserById", data).then((result) => {
            if (result.success && result.data != null) {
                setState(prevState => ({
                    ...prevState,
                    medicalLicenseNumber: result.data.licenseNumber,
                    medicalLicenseExpiry: result.data.licenseExpiry ? result.data.licenseExpiry.split('T')[0] : '',
                    licenseIssuingState: result.data.licenseStateCode,
                    degreeOnLicense: result.data.licenseDegree,
                }));
            }
        })
    }

    useEffect(() => {
        setState({ ...state, ...pstate });
        var params = {
            code: "provider_specilizations",
            parameters: ['']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setSpecialityList(result.data.map((item, i) => {
                    return { label: item.text1, value: item.id };
                }))

            }
        });
        if (pstate.eprescriptionRequestId > 0) {
            setState(prevState => ({
                ...prevState,
                ["isAgree"]: true
            }))
        } else {
            setState(prevState => ({
                ...prevState,
                ["medicalLicenseExpiry"]: ""
            }))
        }

        loadLoginUserInfo();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const expirayDate = new Date(state.medicalLicenseExpiry);
        const today = new Date();
        if (expirayDate > today) {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        } else {
            showMessage('error', "Expiry date should be in future", 3000);
        }
    }
    const handleCheckedChange = (e) => {
        const { name, checked } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: !state.isAgree
        }))
    }
    const handleNextClick = () => {
        let errorList = [];
        ValidateInformation(errorList);
        if (errorList.length < 0) {
            handleNext();
        }
    }
    const ValidateInformation = (errorList) => {

        const today = new Date();
        const expirayDate = new Date(state.medicalLicenseExpiry);

        if (!state.firstName || state.firstName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                firstNameError: true
            }));
            errorList.push(true);
        }
        if (!state.lastName || state.lastName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                lastNameError: true
            }));
            errorList.push(true);
        }
        if (!state.primarySpecialtyId || parseInt(state.primarySpecialtyId) < 1) {
            setErrorMessages(prevState => ({
                ...prevState,
                primarySpecialtyError: true
            }));
            errorList.push(true);
        }
        if (!state.secondarySpecialtyId || parseInt(state.secondarySpecialtyId) < 1) {
            setErrorMessages(prevState => ({
                ...prevState,
                secondarySpecialtyError: true
            }));
            errorList.push(true);
        }
        if (!state.medicalLicenseNumber || state.medicalLicenseNumber.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                medicalLicenseNoError: true
            }));
            errorList.push(true);
        }
        if (!state.medicalLicenseExpiry || state.medicalLicenseExpiry.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                expirationError: true
            }));
            errorList.push(true);
        }
        if (!state.licenseIssuingState || state.licenseIssuingState.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                stateIssuingMedicalLicenseError: true
            }));
            errorList.push(true);
        }
        if (!state.degreeOnLicense || state.degreeOnLicense.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                degreeListedOnLicenseError: true
            }));
            errorList.push(true);
        }
        if (!state.npi || parseInt(state.npi) < 1) {
            setErrorMessages(prevState => ({
                ...prevState,
                personalNpiError: true
            }));
            errorList.push(true);
        }
        if (!state.deaNumber || state.deaNumber.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                deaError: true
            }));
            errorList.push(true);
        }
        if (!state.isAgree || state.isAgree === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                termAndConditionsError: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                termAndConditionsError: false
            }));
        }
        if (expirayDate < today) {
            setErrorMessages(prevState => ({
                ...prevState,
                expiryDateError: true
            }));
            errorList.push(true);
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                expiryDateError: false
            }));
        }

        if (errorList.length > 0)
            return;

        var method = "setup/epresciption/request/add";
        if (state.eprescriptionRequestId > 0)
            method = "setup/epresciption/request/update";

        state.primarySpecialtyId = parseInt(state.primarySpecialtyId);
        state.secondarySpecialtyId = parseInt(state.secondarySpecialtyId);
        state.npi = parseInt(state.npi);

        setIsLoading(true);
        PostDataAPI(method, state, true).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {

                if (result.data.eprescriptionRequestId < 1) {
                    setState(prevState => ({
                        ...prevState,
                        ["eprescriptionRequestId"]: result.data.eprescriptionRequestId
                    }));

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));

                }
                handleNext();
            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }
        })
    }
    const back = () => {
        handleBack(state);
    }
    return (
        <>
            <Grid container direction="row">

                <FormLabel className={classes.noteText}>Processing your e-Prescribing
                    request can take up to a week</FormLabel>

                <FormGroupTitle>1. Personal Info</FormGroupTitle>

                <FormLabel className={classes.noteText}>We need to confirm your full legal name to
                    start the verification process</FormLabel>

                <Grid container direction="row" >

                    <Label title="First Name" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            id="firstName"
                            name="firstName"
                            value={state.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        {errorMessages.firstNameError && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                            Please enter first name
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row" >

                    <Label title="Middle Name" size={2} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            id="middleName"
                            name="middleName"
                            value={state.middleName}
                            onChange={handleChange}
                            placeholder="Middle Name" />
                    </Grid>

                </Grid>

                <Grid container direction="row" >

                    <Label title="Last Name" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <InputBaseField
                            id="lastName"
                            name="lastName"
                            value={state.lastName}
                            onChange={handleChange}
                            placeholder="Last Name" />
                        {errorMessages.lastNameError && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                            Please enter last name
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <FormGroupTitle>2. Add your specialty</FormGroupTitle>

                <FormLabel className={classes.noteText}>Providing the correct specialty will enable us to
                    deliver tailored features and updates for your EHR.</FormLabel>

                <Grid container direction="row" >

                    <Label title="Primary Specialty" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="primarySpecialtyId"
                            name="primarySpecialtyId"
                            value={state.primarySpecialtyId}
                            onChange={handleChange}
                            placeholder="Select Primary Specialty"
                            options={specialityList} />
                        {errorMessages.primarySpecialtyError && !state.primarySpecialtyId ? (<FormHelperText style={{ color: "red" }} >
                            Please select primary specialty
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row">

                    <Label title="Secondary Specialty" size={2} mandatory={true} />

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="secondarySpecialtyId"
                            name="secondarySpecialtyId"
                            value={state.secondarySpecialtyId}
                            onChange={handleChange}
                            placeholder="Select Secondary Specialty"
                            options={specialityList} />
                        {errorMessages.secondarySpecialtyError && !state.secondarySpecialtyId ? (<FormHelperText style={{ color: "red" }} >
                            Please select secondary specialty
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <FormGroupTitle>3. Add your medical credentials for verification</FormGroupTitle>

                <Grid container direction="row" >

                    <Label title="Medical License #" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <InputBaseField
                            id="medicalLicenseNumber"
                            name="medicalLicenseNumber"
                            value={state.medicalLicenseNumber}
                            onChange={handleChange}
                            placeholder="########" />
                        {errorMessages.medicalLicenseNoError && !state.medicalLicenseNumber ? (<FormHelperText style={{ color: "red" }} >
                            Please enter medical license no
                        </FormHelperText>) : ('')}
                    </Grid>

                    <Label title="Expiration" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <InputBaseField
                            type="date"
                            id="medicalLicenseExpiry"
                            name="medicalLicenseExpiry"
                            value={state.medicalLicenseExpiry}
                            onChange={handleChange} />
                        {errorMessages.expirationError && !state.medicalLicenseExpiry ? (<FormHelperText style={{ color: "red" }} >
                            Please enter expiration date
                        </FormHelperText>) : ('')}
                        {errorMessages.expiryDateError ? (<FormHelperText style={{ color: "red" }} >
                            Expiry date should be in future
                        </FormHelperText>) : ('')}
                    </Grid>

                    <Label title="State Issuing  medical License" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <SelectField
                            id="licenseIssuingState"
                            name="licenseIssuingState"
                            value={state.licenseIssuingState}
                            onChange={handleChange}
                            placeholder="Select State"
                            options={USAStateListOptions} />
                        {errorMessages.stateIssuingMedicalLicenseError && !state.licenseIssuingState ? (<FormHelperText style={{ color: "red" }} >
                            Please select medical license
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>

                <Grid container direction="row">

                    <Label title="Degree Listed on License" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <InputBaseField
                            id="degreeOnLicense"
                            name="degreeOnLicense"
                            value={state.degreeOnLicense}
                            onChange={handleChange}
                            placeholder="########" />
                        {errorMessages.degreeListedOnLicenseError && !state.degreeOnLicense ? (<FormHelperText style={{ color: "red" }} >
                            Please enter degree listed on license
                        </FormHelperText>) : ('')}
                    </Grid>

                    <Label title="Personal NPI #" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <InputBaseField
                            id="npi"
                            name="npi"
                            value={state.npi}
                            onChange={handleChange} />
                        {errorMessages.personalNpiError && !state.npi ? (<FormHelperText style={{ color: "red" }} >
                            Please enter personal NPI
                        </FormHelperText>) : ('')}
                    </Grid>

                    <Label title="DEA #" size={2} mandatory={true} />

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <InputBaseField
                            id="deaNumber"
                            name="deaNumber"
                            value={state.deaNumber}
                            onChange={handleChange}
                            placeholder="" />
                        {errorMessages.deaError && !state.deaNumber ? (<FormHelperText style={{ color: "red" }} >
                            Please enter dea
                        </FormHelperText>) : ('')}
                    </Grid>

                </Grid>


                <Typography className={classes.wanringText}>
                    You understand that by checking “I agree” below: (a) you certify that the information you have submitted
                    is accurate and that you are licensed to prescribe medication in the jurisdictions where you practice;
                    and (2) you consent to MCR EHR use of the information you have submitted to verify your identity, licensure
                    and prescriptive authority in accordance with Section 3.3 of your <a> Health Care Provider User Agreement</a>.
                </Typography>

                <FormLabel className={classes.lableInput} {...props}>
                    Aggress to terms and conditions
                    <span className={classes.mandatorColor}>*</span>
                </FormLabel>



                <Grid container direction="row" >
                    <CheckboxField
                        id="isAgree"
                        name="isAgree"
                        color="primary"
                        value={state.isAgree}
                        checked={state.isAgree}
                        label="I agree to the e-Prescribing terms and conditions"
                        onChange={handleCheckedChange} />
                    {errorMessages.termAndConditionsError ? (<FormHelperText style={{ color: "red" }} >
                        Please accept terms and conditions
                    </FormHelperText>) : ('')}
                </Grid>
                <Grid container alignItems="" direction="row" >
                    <FormBtn id="save" size="large" onClick={back} btnType="back">Back</FormBtn>
                    {
                        isLoading ?
                            <FormBtn id="loadingSave" size="large">Verify Medical Credentials</FormBtn>
                            :
                            <FormBtn id="save" size="large" onClick={handleNextClick} disabled={!props.isEditable}>Verify Medical Credentials</FormBtn>
                    }
                </Grid>


            </Grid>
        </>
    )
}
export default withSnackbar(PrescriptionInformation)

