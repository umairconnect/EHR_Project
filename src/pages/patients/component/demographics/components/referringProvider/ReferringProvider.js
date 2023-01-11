import React, { useState, useEffect } from "react";
import {
    Grid,
    FormHelperText,
    FormLabel
} from '@material-ui/core';
import useStyles from "./styles";
import { PostDataAPI, PutDataAPI } from '../../../../../../Services/APIService';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { InputBaseField, InputBaseFieldNumber, TextareaField, SelectField } from "../../../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, FooterBtn, Label } from "../../../../../../components/UiElements";
import { USAStateListOptions, CountryListOptions } from "../../../../../../context/StaticDropDowns";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import SearchList from "../../../../../../components/SearchList/SearchList";

function ReferringProvider(props) {
    var classes = useStyles();

    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);
    const [state, setState] = useState({

        providerRefOrdID: 0, refProviderId: "", PatientId: dataId, primaryCareProvider: "", firstName: "", middleName: "", lastName: "",
        suffix: "", npiNumber: "", qualifierCode: "", qaulifierNumber: "", contactNumber: "", specliaty: "", address: "",
        city: "", zipCode: "", state: "", country: "", phoneNumber: "", email: "", fax: "", referringSourceCode: "",
        referralNumber: "", typeCode: "ref", createDate: "", updatedBy: 0, isDeleted: false
    });

    const referringProviderRef = useState({ lastNameRef: "", firstNameRef: "", specialityRef: "", npiRef: "", });

    const [errorMessages, setErrorMessages] = useState({
        errorHomePhoneLength: false, errorFirstName: false, errorLastName: false, errorSpecialty: false, errorNPI: false, errorNPILength: false,
        errorEmail: false, errorFaxLength: false
    })

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [providerFormSpeciality, setProviderFormSpeciality] = useState([]);
    const [suffixCodes, setSuffixCodes] = useState([]);
    const [referringSourceCodes, setreferringSourceCodes] = useState([]);
    const [referringProvider, setReferringProvider] = useState([]);
    const [logdialogstate, setLogDialogState] = useState(false);

    useEffect(() => {

        initialization();
        cleanValuesFields();
        loadRefProvider();

    }, []);

    const QualifierOptions = [
        {

            value: "State License #",
            label: "State License #",
        },
        {
            value: "Provider UPIN #",
            label: "Provider UPIN #",
        },
        {
            value: "Provider Commercial #",
            label: "Provider Commercial #",
        },
    ];

    function initialization() {

        GetDataAPI("user/getAllSpecialities", '').then((result) => {

            if (result.success && result.data != null) {
                setProviderFormSpeciality(
                    result.data.map((item, i) => {
                        return { value: item.specializationID, label: item.name };
                    }));
            }

        })

        var params = {
            code: "DDL_List_Item",
            parameters: ['suffix_code', 'referring_source_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {


                result.data.map((item, i) => {

                    if (item.text3 == 'suffix_code')
                        suffixCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'referring_source_code')
                        referringSourceCodes.push({ value: item.text1, label: item.text2 });
                })
            }
        })
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRefProviderChange = (name, item) => {


        // const { name, value } = e.target;
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        GetSelectedRefOrdProvider(parseInt(id));
    };

    const SaveRefProvider = () => {

        let errorList = [];
        validateRefProvider(errorList);

        if (errorList.length < 1) {
            setIsSaveCall(true);
            state.patientID = dataId;
            state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;

            let method = "refOrdProvider/addRefOrderProvider";

            if (state.providerRefOrdID > 0) {

                method = "refOrdProvider/updateRefOrdProvider";

            }

            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);


                    if (state.providerRefOrdID < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Referring provider saved successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.refProviderId = result.data.firstName + ' ' + result.data.lastName + ' ( ' + result.data.specialtyName + ' )';
                            setState(result.data);

                        }
                    }
                    else if (state.providerRefOrdID > 0) {

                        if (result.success) {

                            showMessage("Success", "Referring provider updated successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.refProviderId = result.data.firstName + ' ' + result.data.lastName + ' ( ' + result.data.specialtyName + ' )';
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

    function validateRefProvider(errorList) {

        if (state.patientID < 1) {
            showMessage("Error", "Please select a patient", "error", 3000);
            errorList.push(true);
        }
        if (state.npiNumber === null || state.npiNumber == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPI: true
            }));
            errorList.push(true);
            //  referringProviderRef.npiRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPI: false
            }));
        }
        if (state.npiNumber != null && state.npiNumber != "" && state.npiNumber.length < 10) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPILength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPILength: false
            }));
        }

        if (state.specliaty === null || state.specliaty == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecialty: true
            }));
            errorList.push(true);
            // referringProviderRef.specialityRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecialty: false
            }));
        }

        if (state.lastName === null || state.lastName == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
            // referringProviderRef.lastNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }

        if (state.firstName === null || state.firstName == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            errorList.push(true);
            //referringProviderRef.firstNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }



        if (state.phoneNumber != "" && state.phoneNumber != undefined && state.phoneNumber.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhoneLength: false
            }));
        }

        if (state.fax != "" && state.fax != undefined && state.fax.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFaxLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFaxLength: false
            }));
        }


        if (state.email != null && state.email != "" && validateEmail(state.email) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));
        }

    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    const handleFaxChange = e => {

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
                            errorFaxLength: false
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
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorFaxLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorFaxLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();
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
                            errorHomePhoneLength: false
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
                        errorHomePhoneLength: true
                    }));
                }
                else {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorHomePhoneLength: false
                    }));
                }
            }
        }
        else
            e.preventDefault();
    }

    const handleNPIChange = e => {

        if (parseInt(e.target.value.length) >= 0 && e.target.value != "-0") {
            if (e.target.value.length == 0 || e.target.value.length <= 10) {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

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

    function cleanValuesFields() {

        setErrorMessages({
            errorHomePhoneLength: false, errorFirstName: false, errorLastName: false, errorSpecialty: false, errorNPI: false,
            errorEmail: false
        });

        if (state.providerRefOrdID > 0) {
            loadRefProvider();
        }
        else {
            setState({

                providerRefOrdID: 0, refProviderId: "", PatientId: dataId, primaryCareProvider: "", firstName: "", middleName: "", lastName: "",
                suffix: "", npiNumber: "", qualifierCode: "", qaulifierNumber: "", contactNumber: "", specliaty: "", address: "",
                city: "", zipCode: "", state: "", country: "", phoneNumber: "", email: "", fax: "", referringSourceCode: "",
                referralNumber: "", typeCode: "ref", createDate: "", updatedBy: 0, isDeleted: false

            });

        }

    }

    function loadRefProvider() {

        let data = {

            providerRefOrdID: dataId.dataId ? parseInt(dataId.dataId) : parseInt(dataId),
            typeCode: "ref"
        };

        PostDataAPI("refOrdProvider/getRefOrdProvider", data).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
            }
        })
    }

    function GetSelectedRefOrdProvider(id) {

        PostDataAPI("refOrdProvider/getSelectedRefOrdProvider", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {
                result.data.providerRefOrdID = state.providerRefOrdID;
                result.data.createDate = state.createDate;
                result.data.createdBy = state.createdBy;
                result.data.refProviderId = result.data.firstName + ' ' + result.data.lastName;
                setState(result.data);
            }
        })
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <form id="referring-form" className={classes.formAlignment}>
                    <Grid container >
                        <Grid item lg={12} container direction="row">
                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Search Provider:</FormLabel>
                            </Grid>
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SearchList name="refProviderId" value={state.refProviderId} searchTerm={state.refProviderId} code="refferingProvider"
                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleRefProviderChange(name, item)}
                                    placeholderTitle="Search Provider" />
                            </Grid>
                        </Grid>
                        <FormGroupTitle>Referring Provider Info</FormGroupTitle>
                        <Grid item lg={12} container direction="row">
                            <Label title="First Name" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    name="firstName"
                                    value={state.firstName}
                                    MaxLength='100'
                                //inputProps={{ ref: input => referringProviderRef.firstNameRef = input }}
                                />
                                {errorMessages.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter first name
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Middle Name" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                    name="middleName"
                                    value={state.middleName}
                                    MaxLength='100'
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={12} container direction="row">
                            <Label title="Last Name" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    name="lastName"
                                    value={state.lastName}
                                    MaxLength='100'
                                //inputProps={{ ref: input => referringProviderRef.lastNameRef = input }}
                                />
                                {errorMessages.errorLastName && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter last name
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Suffix" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select Suffix"
                                    onChange={handleChange}
                                    name="suffix"
                                    value={state.suffix}
                                    options={suffixCodes}
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Specialty" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select Specialty"
                                    onChange={handleChange}
                                    name="specliaty"
                                    value={state.specliaty}
                                    options={providerFormSpeciality}
                                // inputProps={{ ref: input => referringProviderRef.specialityRef = input }}
                                />
                                {errorMessages.errorSpecialty && !state.specliaty ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter specialty
                                </FormHelperText>) : ('')}

                            </Grid>
                            <Label title="NPI #" size={2} mandatory={true} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseFieldNumber
                                    placeholder="NPI"
                                    onChange={handleNPIChange}
                                    name="npiNumber"
                                    type="Number"
                                    value={state.npiNumber}
                                    MaxLength='10'
                                //inputProps={{ ref: input => referringProviderRef.npiRef = input }}
                                />
                                {errorMessages.errorNPI && !state.npiNumber ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter NPI
                                </FormHelperText>) : ('')}
                                {errorMessages.errorNPILength ? (<FormHelperText style={{ color: "red" }} >
                                    NPI must be 10 digtits
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Qualifier" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select Qualifier"
                                    onChange={handleChange}
                                    name="qualifierCode"
                                    value={state.qualifierCode}
                                    options={QualifierOptions}
                                />
                            </Grid>
                            <Label title="Number" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Number"
                                    onChange={handleChange}
                                    name="qaulifierNumber"
                                    value={state.qaulifierNumber}
                                    MaxLength='50'
                                />
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
                                    MaxLength="3000"
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="City" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="City"
                                    onChange={handleChange}
                                    name="city"
                                    value={state.city}
                                    MaxLength='100'
                                />
                            </Grid>
                            <Label title="State" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select State"
                                    onChange={handleChange}
                                    name="state"
                                    value={state.state}
                                    options={USAStateListOptions}
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Zip Code" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Zip Code"
                                    onChange={handleZipChange}
                                    name="zipCode"
                                    value={state.zipCode}
                                    MaxLength='50'
                                />
                            </Grid>
                            <Label title="Country" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    onChange={handleChange}
                                    name="country"
                                    value={state.country}
                                    options={CountryListOptions}
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Home Phone" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="(863) 993-2966"
                                    onChange={handlePhoneChange}
                                    name="phoneNumber"
                                    value={state.phoneNumber}
                                    MaxLength='14'
                                />
                                {errorMessages.errorHomePhoneLength && state.phoneNumber != "" ? (<FormHelperText style={{ color: "red" }} >
                                    The home phone number is invalid
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Fax #" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="(863) 993-2966"
                                    onChange={handleFaxChange}
                                    name="fax"
                                    value={state.fax}
                                    MaxLength='14'
                                />
                                {errorMessages.errorFaxLength && state.fax != "" ? (<FormHelperText style={{ color: "red" }} >
                                    The fax number is invalid
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Email" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Email"
                                    onChange={handleChange}
                                    name="email"
                                    value={state.email}
                                    MaxLength='50'
                                />
                                {errorMessages.errorEmail && state.email != "" && !validateEmail(state.email) ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid email
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Referring Source" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <SelectField
                                    placeholder="Select Referring Source"
                                    onChange={handleChange}
                                    name="referringSourceCode"
                                    value={state.referringSourceCode}
                                    options={referringSourceCodes}
                                />
                            </Grid>
                            <Label title="Primary Care Physician" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Primary Care Physician"
                                    onChange={handleChange}
                                    name="primaryCareProvider"
                                    value={state.primaryCareProvider}
                                    MaxLength='200'
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Label title="Referral Number" size={2} />
                            <Grid item xs={12} md={4} sm={4} lg={3} >
                                <InputBaseField
                                    placeholder="Referral Number"
                                    onChange={handleChange}
                                    name="referralNumber"
                                    value={state.referralNumber}
                                    MaxLength='40'
                                />
                            </Grid>
                        </Grid>

                        <Grid item lg={12}
                            container
                            direction="row">
                            <Grid item lg={3}
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end">

                            </Grid>
                        </Grid>
                        <Grid item lg={12}
                            container
                            direction="row">
                            <Grid item lg={3}
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end">
                                <br />
                            </Grid>

                            <LogDialog
                                code="ordrefprovider"
                                id={state.providerRefOrdID}
                                dialogOpenClose={logdialogstate}
                                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                            />
                            <Grid container direction="row">
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <FooterBtn className={classes.footerBtn}>
                                        <FormBtn id={"save"} size="medium" disabled={isSaveCall || !props.isEditable} onClick={SaveRefProvider}>Save</FormBtn>
                                        <FormBtn id={"reset"} size="medium" onClick={cleanValuesFields}>Reset </FormBtn>
                                        {dataId != 0 ?
                                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                        }
                                    </FooterBtn>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </ShadowBoxMin>
        </>
    );
}
export default withSnackbar(ReferringProvider)
