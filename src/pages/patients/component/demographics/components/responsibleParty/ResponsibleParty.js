import React, { useState, useEffect } from "react";
import {
    Grid,
    FormHelperText,
    InputBase
} from '@material-ui/core';
import useStyles from "./styles";
import { PostDataAPI, PutDataAPI } from '../../../../../../Services/APIService';
import { InputBaseField, SelectField } from "../../../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, FooterBtn, Label } from "../../../../../../components/UiElements";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { USAStateListOptions, CountryListOptions } from "../../../../../../context/StaticDropDowns";
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";


function ResponsibleParty(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [dataId, setDataId] = useState(props.dataId);
    const [state, setState] = useState({
        responsiblePartyID: 0, patientId: dataId, name: "", dateOfBirth: "", relationCode: "",
        phoneNumber: "", email: "", address: "", city: "", zipCode: "", state: "",
        country: "USA", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0
    });

    const responsibilityPartyRef = useState({ nameRef: "", relationRef: "", phoneRef: "", emailRef: "", });

    const [errorMessages, setErrorMessages] = useState({
        errorPhoneLength: false, errorEmail: false, errorName: false,
        errorRelationship: false, errorPhone: false, errorEmail: false,
        errorDOBFuture: false,
    })

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [relationshipCodes, setrelationshipCodes] = useState([]);
    const [logdialogstate, setLogDialogState] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {

        initialization();
        cleanValuesFields();
        loadResponsibleParty();

    }, []);

    function initialization() {
        setPageLoading(true)

        var params = {
            code: "DDL_List_Item",
            parameters: ['relationship_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            setPageLoading(false)
            if (result.success && result.data != null) {

                setrelationshipCodes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }

    const handleChange = e => {

        const { name, value } = e.target;

        if (value.trim() === "" && value !== "") {
            return;
        }

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

    function handleLoadFormatData(dataSet) {

        if (dataSet.dateOfBirth != null && dataSet.dateOfBirth != "")
            dataSet.dateOfBirth = dataSet.dateOfBirth.split('T')[0];
    }

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
            responsiblePartyID: 0, patientId: dataId, name: "", dateOfBirth: "", relationCode: "",
            phoneNumber: "", email: "", address: "", city: "", zipCode: "", state: "", country: "USA",
            createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0

        });

        if (state.responsiblePartyID > 0) {
            loadResponsibleParty();
        }

    }

    function loadResponsibleParty() {

        PostDataAPI("patResponsibleParty/getPatientResponsibleParty", dataId.dataId ? dataId.dataId : dataId).then((result) => {

            if (result.success && result.data != null) {
                handleLoadFormatData(result.data);
                setState(result.data);
            }
        })
    }

    const SaveResponsibleParty = () => {

        let errorList = [];
        validateResponsibleParty(errorList);

        if (errorList.length < 1) {
            setIsSaveCall(true);

            state.dateOfBirth = state.dateOfBirth == "" ? null : state.dateOfBirth;
            state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;

            let method = "patResponsibleParty/addPatientResponsibleParty";

            if (state.responsiblePartyID > 0) {

                method = "patResponsibleParty/updatePatientResponsibleParty";

            }

            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);


                    if (state.responsiblePartyID < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Guardian saved successfully.", "success", 3000);
                            setIsSaveCall(false);
                            handleLoadFormatData(result.data);
                            setState(result.data);

                        }
                    }
                    else if (state.responsiblePartyID > 0) {

                        if (result.success) {

                            showMessage("Success", "Guardian updated successfully.", "success", 3000);
                            setIsSaveCall(false);
                            handleLoadFormatData(result.data);
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

    function validateResponsibleParty(errorList) {

        if (state.patientID < 1) {
            showMessage("Error", "Please select a patient", "error", 3000);
            errorList.push(true);
        }

        if (validateEmail(state.email) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);
            //responsibilityPartyRef.emailRef.focus();

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
            // responsibilityPartyRef.phoneRef.focus();

        }
        else {
            if (state.phoneNumber != "" && state.phoneNumber.length < 10) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhoneLength: true
                }));

                errorList.push(true);
                //  responsibilityPartyRef.phoneRef.focus();

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhoneLength: false
                }));
            }

        }
        var toDay = toDayDate();
        if (state.dateOfBirth > toDay) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: true
            }));

            errorList.push(true);
        }
        else {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: false
            }));

        }

        if (state.relationCode === null || state.relationCode === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRelationship: true
            }));

            errorList.push(true);
            // responsibilityPartyRef.relationRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRelationship: false
            }));
        }

        if (state.name === null || state.name === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));

            errorList.push(true);
            //  responsibilityPartyRef.nameRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: false
            }));
        }

    }

    function checkPhoneLength() {
        if (state.phoneNumber === undefined) { return true; }
        else if (state.phoneNumber.length < 10)
            return true;
        else
            return false;
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
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
    const toDayDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    return (
        <>
            <>
                <ShadowBoxMin shadowSize={3} >
                    {pageLoading ? <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> :
                        <form id="responsibleparty-form" className={classes.formAlignment}>
                            <Grid container >
                                <FormGroupTitle>Guardian Info</FormGroupTitle>

                                <Grid item lg={12} container direction="row">
                                    <Label title="Name" size={2} mandatory={true} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        <InputBaseField
                                            placeholder="Name"
                                            onChange={handleChange}
                                            name="name"
                                            value={state.name}
                                            MaxLength='255'
                                        //inputProps={{ ref: input => responsibilityPartyRef.nameRef = input }}
                                        />
                                        {errorMessages.errorName && !state.name ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter name
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Label title="DOB" size={2} mandatory={false} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        {/* <InputBaseField
                                        placeholder="DOB"
                                        onChange={handleChange}
                                        name="dateOfBirth"
                                        type="Date"
                                        value={state.dateOfBirth}
                                        MaxLength="8"

                                    /> */}
                                        <InputBase
                                            className={classes.baseInput}
                                            placeholder="DOB"
                                            onChange={handleChange}
                                            name="dateOfBirth"
                                            type="Date"
                                            value={state.dateOfBirth}
                                            //onKeyDown={(e) => e.preventDefault()}
                                            inputProps={{ max: toDayDate() }}

                                        />
                                        {errorMessages.errorDOBFuture ? (<FormHelperText style={{ color: "red" }} >
                                            You can't select future date of birth

                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid item lg={12} container direction="row">
                                    <Label title="Relation" size={2} mandatory={true} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        <SelectField
                                            placeholder="Select Relation"
                                            onChange={handleChange}
                                            name="relationCode"
                                            value={state.relationCode}
                                            options={relationshipCodes}
                                        //inputProps={{ ref: input => responsibilityPartyRef.relationRef = input }}
                                        />
                                        {errorMessages.errorRelationship && !state.relationCode ? (<FormHelperText style={{ color: "red" }} >
                                            Please select relation
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid item lg={12} container direction="row">
                                    <Label title="Cell #" size={2} mandatory={true} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        <InputBaseField
                                            placeholder="(863) 993-2966"
                                            onChange={handlePhoneChange}
                                            name="phoneNumber"
                                            value={state.phoneNumber}
                                            MaxLength='14'
                                        // inputProps={{ ref: input => responsibilityPartyRef.phoneRef = input }}
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
                                            name="email"
                                            value={state.email}
                                            MaxLength='50'
                                        // inputProps={{ ref: input => responsibilityPartyRef.emailRef = input }}
                                        />
                                        {errorMessages.errorEmail && !validateEmail(state.email) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid email
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                </Grid>

                                <FormGroupTitle>Address</FormGroupTitle>
                                <Grid item lg={12} container direction="row">
                                    <Label title="Address" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3}>
                                        <InputBaseField
                                            placeholder="Address"
                                            onChange={handleChange}
                                            name="address"
                                            value={state.address}
                                            MaxLength='8000'
                                        />
                                    </Grid>

                                    <Label title="City" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3}>
                                        <InputBaseField
                                            placeholder="City"
                                            onChange={handleChange}
                                            name="city"
                                            value={state.city}
                                            MaxLength='100'
                                        />
                                    </Grid>

                                </Grid>
                                <Grid item lg={12} container direction="row">

                                    <Label title="State" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3}>
                                        <SelectField
                                            id="State"
                                            name="state"
                                            value={state.state}
                                            placeholder="Select State"
                                            options={USAStateListOptions}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Label title="Zip Code" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            placeholder="12345"
                                            onChange={handleZipChange}
                                            //type="Number"
                                            name="zipCode"
                                            value={state.zipCode}
                                            MaxLength="5"
                                            MinLength="1"
                                        />
                                    </Grid>

                                </Grid>
                                <Grid item lg={12} container direction="row">



                                    <Label title="Country" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3}>
                                        <SelectField
                                            name="country"
                                            value={state.country}
                                            options={CountryListOptions}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorCountry && !state.country ? (<FormHelperText style={{ color: "red" }} >
                                            Please select country
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid item lg={12}
                                    container
                                    direction="row">
                                    {/*<Grid item lg={3}
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end">
                                    <br />
                                </Grid>*/}

                                    <LogDialog
                                        code="responsibleparty"
                                        id={dataId}
                                        dialogOpenClose={logdialogstate}
                                        onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                                    />

                                    <FooterBtn className={classes.footerBtn}>
                                        <FormBtn id={"save"} size="medium" disabled={isSaveCall || !props.isEditable} onClick={SaveResponsibleParty}>Save</FormBtn>
                                        <FormBtn id={"resetBtn"} size="medium" onClick={cleanValuesFields}>Reset </FormBtn>
                                        {dataId != 0 ?
                                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                        }
                                    </FooterBtn>
                                </Grid>
                            </Grid>
                        </form>}
                </ShadowBoxMin>
            </>
        </>
    );
}
export default withSnackbar(ResponsibleParty)