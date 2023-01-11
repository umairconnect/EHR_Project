import React, { useState, useEffect } from "react";
import {
    Grid,
    FormHelperText,
} from '@material-ui/core';
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { InputBaseField, TextareaField, SelectField } from "../../../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, FooterBtn, Label } from "../../../../../../components/UiElements";
import { USAStateListOptions, CountryListOptions } from "../../../../../../context/StaticDropDowns";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

function Employer(props) {
    var classes = useStyles();

    const { showMessage } = props;
    const [dataId, setDataId] = useState(props.dataId);
    const [state, setState] = useState({
        employerID: 0, patientID: dataId, employerName: "", phoneNumber: "", address: "", zipCode: "", city: "",
        state: "", country: "", emailAddress: "", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0
    });

    const employerRef = useState({ nameRef: "", phoneRef: "", emailRef: "", });

    const [errorMessages, setErrorMessages] = useState({
        errorPhoneLength: false, errorEmail: false,
        errorName: false, errorPhone: false, errorEmail: false
    })

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [logdialogstate, setLogDialogState] = useState(false);

    useEffect(() => {

        cleanValuesFields();
        loadPatientEmployer();

    }, []);

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {


                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: number
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }
                else {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: false
                    }));

                }
            }
        }
        else
            e.preventDefault();
    }

    const handleZipChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

                        const { name, value } = e.target;
                        setState(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function cleanValuesFields() {

        setErrorMessages({ errorPhoneLength: false, errorEmail: false });

        setState({

            employerID: 0, patientID: dataId, employerName: "", phoneNumber: "", address: "", zipCode: "", city: "",
            state: "", country: "", emailAddress: "", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0

        });

        if (state.employerID > 0) {
            loadPatientEmployer();
        }

    }

    function loadPatientEmployer() {

        PostDataAPI("employer/getPatientEmployer", dataId.dataId ? dataId.dataId : dataId).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
            }
        })
    }

    const SavePatientEmployer = () => {

        let errorList = [];
        validatePatientEmployer(errorList);

        if (errorList.length < 1) {
            setIsSaveCall(true);
            state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;

            let method = "employer/addPatientEmployer";

            if (state.employerID > 0) {

                method = "employer/updatePatientEmployer";

            }

            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);


                    if (state.employerID < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Patient employer saved successfully.", "success", 3000);
                            setIsSaveCall(false);
                            setState(result.data);

                        }
                    }
                    else if (state.employerID > 0) {

                        if (result.success) {

                            showMessage("Success", "Patient employer updated successfully.", "success", 3000);
                            setIsSaveCall(false);
                            setState(result.data);


                        }
                    }

                }
                else {

                    setIsSaveCall(false);
                    showMessage("Error", result.message, "error", 3000);

                }
            })

            setIsSaveCall(false);
        }

    }

    function validatePatientEmployer(errorList) {

        if (state.patientID < 1) {
            showMessage("Error", "Please select a patient", "error", 3000);
            errorList.push(true);
        }

        if (validateEmail(state.emailAddress) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);
            //employerRef.emailRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));
        }

        if (state.phoneNumber === null || state.phoneNumber === "" || state.phoneNumber === undefined) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: true
            }));

            errorList.push(true);
            // employerRef.phoneRef.focus();

        }
        else {
            if (state.phoneNumber != "" && state.phoneNumber.length < 10) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhoneLength: true
                }));

                errorList.push(true);
                // employerRef.phoneRef.focus();
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhoneLength: false
                }));
            }

        }

        if (state.employerName === null || state.employerName === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));

            errorList.push(true);
            employerRef.nameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: false
            }));
        }

    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    function checkPhoneLength() {
        if (state.phoneNumber === undefined) { return true; }
        else if (state.phoneNumber.length < 10)
            return true;
        else
            return false;
    }


    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <form id="employer-form" className={classes.formAlignment}>
                    <Grid container >
                        <FormGroupTitle>Employer Info</FormGroupTitle>

                        <Grid item lg={12} container direction="row">
                            <Label title=" Name" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Name"
                                    onChange={handleChange}
                                    name="employerName"
                                    value={state.employerName}
                                    MaxLength='255'
                                    inputProps={{ ref: input => employerRef.nameRef = input }}
                                />
                                {errorMessages.errorName && !state.employerName ? (<FormHelperText style={{ color: "red" }} >
                                    please enter name
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Phone #" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="(863) 993-2966"
                                    onChange={handlePhoneChange}
                                    name="phoneNumber"
                                    value={state.phoneNumber}
                                    MaxLength='14'
                                //inputProps={{ ref: input => employerRef.phoneRef = input }}
                                />
                                {errorMessages.errorPhoneLength && checkPhoneLength() ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid phone number
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Email" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Email"
                                    onChange={handleChange}
                                    name="emailAddress"
                                    value={state.emailAddress}
                                    MaxLength='255'
                                //inputProps={{ ref: input => employerRef.emailRef = input }}

                                />
                                {errorMessages.errorEmail && !validateEmail(state.emailAddress) ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid email
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Address" isTextAreaInput={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Address"
                                    onChange={handleChange}
                                    name="address"
                                    value={state.address}
                                    MaxLength="500"
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="City" size={2} mandatory={false} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="City"
                                    onChange={handleChange}
                                    name="city"
                                    value={state.city}
                                    MaxLength='255'
                                />
                            </Grid>
                            <Label title="State" size={2} mandatory={false} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select State"
                                    onChange={handleChange}
                                    name="state"
                                    value={state.state}
                                    MaxLength='255'
                                    options={USAStateListOptions}
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Zip" size={2} mandatory={false} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="12345"
                                    onChange={handleZipChange}
                                    name="zipCode"
                                    value={state.zipCode}
                                    MaxLength="5"
                                    MinLength="1"
                                />
                            </Grid>
                            <Label title="Country" size={2} mandatory={false} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select Country"
                                    onChange={handleChange}
                                    name="country"
                                    value={state.country}
                                    MaxLength='255'
                                    options={CountryListOptions}
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12}
                            container
                            direction="row">
                            {/* <Grid item xs={3} md={3} lg={3} xl={3}  container direction="row" justify="flex-end" alignItems="flex-end">
                                <br />
                            </Grid> */}
                            <FooterBtn className={classes.footerBtn}>
                                <FormBtn id={"save"} size="medium" disabled={isSaveCall} onClick={SavePatientEmployer}>Save</FormBtn>
                                <FormBtn id={"resetBtn"} size="medium" onClick={cleanValuesFields}>Reset </FormBtn>
                                {dataId != 0 ?
                                    <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                    : null
                                }
                            </FooterBtn>
                            <LogDialog
                                code="patientemployer"
                                id={dataId}
                                dialogOpenClose={logdialogstate}
                                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                            />
                        </Grid>

                    </Grid>
                </form>
            </ShadowBoxMin>
        </>
    );
}
export default withSnackbar(Employer)