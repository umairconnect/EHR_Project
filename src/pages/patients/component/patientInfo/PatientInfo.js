import React, { useState, useEffect } from "react";
import {
    Grid,
    InputBase,
    FormHelperText,
    Container
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import useStyles from "./styles";
import { AlertMessage } from "../../../../components/Message";
import { InputBaseField, CheckboxField, TextareaField, SelectField } from "../../../../components/InputField";
import { ShadowBox, FooterBtn, FormGroupTitle, FormBtn, Label, ShadowBoxMin } from "../../../../components/UiElements";

import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { USAStateListOptions, CountryListOptions, AccountStatusOptions } from "../../../../context/StaticDropDowns";
import { withSnackbar } from "../../../../components/Message/Alert";
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { validDate } from "../../../../components/Common/Extensions";

const SalutationListOptions = [

    {

        value: "1",
        label: "Mr.",
    },
    {
        value: "2",
        label: "Mrs.",
    },
    {
        value: "3",
        label: "Miss",
    },
];
const GenderListOptions = [

    {

        value: "Male",
        label: "Male",
    },
    {
        value: "Female",
        label: "Female",
    },
];

const PrefferedCommunicationListOptions = [

    {
        value: "CellPhone",
        label: "Cell #",
    },
    {
        value: "HomePhone",
        label: "Home Phone",
    },
    {
        value: "WorkPhone",
        label: "Office Phone",
    },
    {
        value: "EmailAddress",
        label: "Email",
    },
    {
        value: "SnailMail",
        label: "Snail Mail",
    },

    {
        value: "TextMessage",
        label: "Text Message",
    },
    {
        value: "Declined",
        label: "Declined",
    },
];

function PatientInfo({ callbackFn, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [title, setTitle] = useState('Patients');
    const [dataId, setDataId] = useState(props.dataId);

    const [patient, setPatient] = useState({
        patientId: 0, primaryProviderID: 0, chartNumber: "", salutation: "", lastName: "", middleName: "",
        firstName: "", birthDate: "", genderCode: "", cellPhone: "", homePhone: "", emailAddress: "", prefferedCommunicationCode: "",
        address: "", city: "", state: "", zipCode: "", country: "10", isDeleted: false, photoPath: "", allowDuplicateEmail: false, isProvider: userInfo.isProvider
    });
    const refPatient = useState({ refLastName: "", refFirstName: "", refBirthDate: "", refEmailAddress: "", });

    const [errorMessages, setErrorMessages] = useState({ errorChartID: false, errorLastName: false, errorFirstName: false, errorDOB: false, errorDOBFuture: false, errorEmail: false, DOBrange: false, errorPhoneLength: false, errorCellLength: false })
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [profileImage, setProfileImage] = useState({ file: null, fileToSend: null, fileName: null });

    //
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    useEffect(() => {
        if (dataId > 0) {
            setIsDisabled(true);
            loadPatient();
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleZipChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

                        const { name, value } = e.target;
                        setPatient(prevState => ({
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
                setPatient(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };

    const handleHomePhoneChange = e => {

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

                        setPatient(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setPatient(prevState => ({
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
                setPatient(prevState => ({
                    ...prevState,
                    [name]: value
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

    const handleCellPhoneChange = e => {

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

                        setPatient(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorCellLength: false
                        }));

                        return;
                    }

                    setPatient(prevState => ({
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
                setPatient(prevState => ({
                    ...prevState,
                    [name]: number
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }

    const handleIsDefaultChange = e => {
        setPatient(prevState => ({
            ...prevState,
            allowDuplicateEmail: !patient.allowDuplicateEmail
        }));
    }

    function uploadSingleFile(e) {
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    function ValidatePatient(errorList) {
        if (validateEmail(patient.emailAddress.trim()) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);
            refPatient.refEmailAddress.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));
        }
        var toDay = toDayDate();
        if (patient.birthDate.trim() === "" || patient.birthDate === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOB: true
            }));

            errorList.push(true);
            //refPatient.refBirthDate.focus();

        }
        else if (patient.birthDate > toDay) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: true
            }));

            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOB: false
            }));
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: false
            }));

        }

        if (patient.lastName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
            // refPatient.refLastName.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }

        if (patient.firstName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));

            errorList.push(true);
            //refPatient.refFirstName.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }

        if (patient.country.trim() === "" || patient.country === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorCountry: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCountry: false
            }));
        }

        if (patient.homePhone != "" && patient.homePhone != undefined && patient.homePhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: false
            }));
        }

        if (patient.cellPhone != "" && patient.cellPhone != undefined && patient.cellPhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorCellLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCellLength: false
            }));
        }
        if (validDate(patient.birthDate)) {
            errorList.push(true);
            showMessage("Error", "Please enter valid date of birth", "error", 2000);
        }
    }

    const Save = e => {
        let errorList = [];
        ValidatePatient(errorList);
        if (errorList.length < 1) {

            let method = "patient/addPatient";
            if (dataId.dataId ? dataId.dataId : dataId > 0)
                method = "patient/updatePatient";
            else { setChartIdPattern(); }

            const formData = new FormData();
            for (var key in patient) {
                if (patient[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, patient[key]);
            }

            formData.append("formFile", profileImage.fileToSend);
            formData.append("fileName", profileImage.fileName);

            setIsSaveCall(true);

            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsSaveCall(false);
                if (result.success == true) {
                    setErrorMessages([]);

                    if (dataId < 1) {

                        if (result.success && result.data != null) {
                            // console.log(result.data)
                            checkSetDafaultDateAndAge(result.data);
                            setPatient(result.data);
                            setIsDisabled(true);
                            showMessage("Success", "Demographic saved successfully.", "success", 2000);
                            setTitle("Edit Patient");

                            setPatient(result.data);
                            setDataId({
                                dataId: result.data.patientId
                            });
                            if (!!callbackFn) {
                                setTimeout(function () {
                                    callbackFn(result.data.patientId);
                                }, 2000);
                            }
                            if (!!props.getPatientInfo) {
                                props.getPatientInfo(result.data.name, result.data.patientId);
                            }
                        }
                    }
                    else if (dataId > 0 || dataId != "") {

                        if (result.success) {
                            setIsDisabled(true);
                            showMessage("Success", "Demographic updated successfully.", "success", 3000);
                        }
                    }

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }

    };

    function deletePatient() {
        patient.IsDeleted = true;
        setIsDeleteLoading(false);
        PostDataAPI('patient/deletePatient', patient, true).then((result) => {
            setIsDeleteLoading(false);
            if (result.success == true) {

                setErrorMessages([]);
                showMessage("Success", "Record deleted successfully.", "success", 3000);
                setDataId({
                    dataId: 0
                });

                setTimeout(() => {
                    backButton();

                }, 1000)
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    function ClearFormValues() {
        if (dataId > 0 || dataId != "") {
            cleanValuesFields();
            loadPatient();
        }
        else {

            // document.getElementById("patient-form").reset();
            cleanValuesFields();
        }
    }

    function loadPatient() {
        PostDataAPI("patient/getPatient", dataId.dataId ? dataId.dataId : dataId).then((result) => {

            if (result.success && result.data != null) {


                if (result.data.photoPath)
                    result.data.photoPath = result.data.photoPath.replace(/\\/g, "/");
                checkNullValues(result);
                checkSetDafaultDateAndAge(result.data);
                setPatient(result.data);
            }
        })
    }

    function checkSetDafaultDateAndAge(dataSet) {
        if (dataSet.birthDate != null && dataSet.birthDate.trim() != '0001-01-01T00:00:00')
            dataSet.birthDate = dataSet.birthDate.split('T')[0];
        else
            dataSet.birthDate = '';
        dataSet.age = getAgeByDOB(dataSet.birthDate);
    }

    function checkNullValues(result) {

        if (result.data.city === "null")
            result.data.city = '';
        if (result.data.homePhone == '-1')
            result.data.homePhone = '';
        if (result.data.middleName === 'null')
            result.data.middleName = '';
    }

    function getAgeByDOB(birthDate) {

        var result = '';
        if (birthDate.trim() != '' && birthDate != undefined) {

            var mdate = birthDate;
            var yearThen = parseInt(mdate.substring(0, 4), 10);
            var monthThen = parseInt(mdate.substring(5, 7), 10);
            var dayThen = parseInt(mdate.substring(8, 10), 10);

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);
            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
            var month_age = Math.floor(day_age / 30);
            day_age = day_age % 30;


            if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
                result = '';
            else if (year_age > 0)
                result = year_age + ' years, ' + month_age + ' months, ' + day_age + ' days';
            else if (year_age === 0 && month_age > 0)
                result = month_age + ' months, ' + day_age + ' days';
            else if (year_age > 0 && month_age === 0)
                result = year_age + ' years, ' + day_age + ' days';
            else if (day_age === 0)
                result = '';
            else
                result = day_age + ' days';
        }
        return result;
    }

    function setChartIdPattern() {
        patient.chartNumber = patient.firstName.slice(0, 2).toUpperCase() + patient.lastName.slice(0, 2).toUpperCase();
    }


    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function cleanValuesFields() {
        setPatient({ patientId: 0, primaryProviderID: 0, chartNumber: "", salutation: "", lastName: "", middleName: "", firstName: "", birthDate: "", genderCode: "", cellPhone: "", homePhone: "", emailAddress: "", prefferedCommunicationCode: "", address: "", city: "", state: "", zipCode: "", country: "10", isDeleted: false, photoPath: "", allowDuplicateEmail: false });
        setErrorMessages({ errorChartID: false, errorLastName: false, errorFirstName: false, errorDOB: false, errorEmail: false, DOBrange: false, errorPhoneLength: false, errorCellLength: false });
        setProfileImage({ file: null, fileToSend: null, fileName: null });

    }

    const backButton = () => {
        document.getElementById("btnIdGetPatients").click();
    }

    function toDayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }


    return (
        <Container maxWidth={false}>
            <ShadowBoxMin shadowSize={3}>

                <form id="patient-form" className={classes.formAlignment}>
                    <Grid container >
                        <FormGroupTitle>Basic Info</FormGroupTitle>
                        <Grid item lg={12} container direction="row">

                            {dataId != 0 ?
                                <Label title="Chart ID" size={2} />
                                :
                                <Grid item xs={12} sm={2} md={2} lg={2} style={{ minHeight: "44px" }}>
                                    &nbsp;
                                </Grid>
                            }
                            {dataId != 0 ?
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Chart ID"
                                        onChange={handleChange}
                                        name="chartNumber"
                                        type="text"
                                        value={patient.chartNumber}
                                        MaxLength="100"
                                        disabled

                                    />
                                    {errorMessages.errorChartID && !patient.chartNumber ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter chart id
                                    </FormHelperText>) : ('')}

                                </Grid>
                                : <Grid item xs={12} sm={4} md={4} lg={3} >
                                    &nbsp;
                                </Grid>
                            }
                            <Grid item xs={12} sm={2} md={2} lg={2} />
                            <Grid className={classes.gridRelative} item xs={12} sm={4} md={4} lg={3} >
                                <label htmlFor="fileUploadField" className={classes.uploadImageLabel}>
                                    {profileImage.file || patient.photoPath ?
                                        <img id='profileImgSource' src={profileImage.file != null ? profileImage.file : "." + patient.photoPath} alt='' className={classes.uploadImage} />
                                        : <div className={classes.uploadImageBox}></div>
                                    }
                                    <AddAPhotoIcon className={classes.uploadImageIcon} />
                                </label>
                                <form>
                                    <div>
                                        <input type="file" id="fileUploadField" className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" />
                                    </div>

                                </form>
                            </Grid>
                            <Grid item lg={1} />
                            <Label title="Title" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField id="select" name="salutation" placeholder="Select Title" value={patient.salutation} onChange={handleChange} options={SalutationListOptions} />
                            </Grid>
                        </Grid>


                        <Grid container direction="row">
                            <Label title="First Name" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    //inputProps={{ ref: input => refPatient.refFirstName = input }}
                                    value={patient.firstName}
                                    MaxLength="50"
                                    disabled={isDisabled}

                                />
                                {errorMessages.errorFirstName && !patient.firstName.trim() != "" ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter first name
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Middle Name" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                    name="middleName"
                                    type="text"
                                    value={patient.middleName}
                                    MaxLength="50"
                                />
                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">
                            <Label title="Last Name" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    name="lastName"
                                    type="text"
                                    // inputProps={{ ref: input => refPatient.refLastName = input }}
                                    value={patient.lastName}
                                    MaxLength="50"
                                    IsDisabled={isDisabled}
                                />
                                {errorMessages.errorLastName && !patient.lastName.trim() != "" ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter last name
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Label title="Gender" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField id="select" name="genderCode" placeholder="Select Gender" value={patient.genderCode} onChange={handleChange} options={GenderListOptions} />
                            </Grid>
                        </Grid>


                        <Grid item lg={12} container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Date of Birth" mandatory={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBase
                                        className={classes.baseInputDate}
                                        placeholder="Date of Birth"
                                        onChange={handleChange}
                                        name="birthDate"
                                        value={patient.birthDate}
                                        type="date"
                                        // onKeyDown={(e) => e.preventDefault()} errorDOBFuture
                                        // inputProps={{ ref: input => refPatient.refBirthDate = input }}
                                        onClose={() => (patient.age = getAgeByDOB(patient.birthDate))}
                                        inputProps={{ max: toDayDate() }}
                                        onkeydown="return false"

                                    />
                                    {errorMessages.errorDOB && !patient.birthDate ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter date of birth
                                    </FormHelperText>) : ('')}
                                    {errorMessages.errorDOBFuture ? (<FormHelperText style={{ color: "red" }} >
                                        You can't select future date of birth
                                        {/* Date of Birth can not be in the future */}
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Age" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Age"
                                        onChange={handleChange}
                                        name="age"
                                        value={patient.age}
                                        maxLength="255"
                                        disabled
                                    />
                                </Grid>

                            </Grid>

                        </Grid>

                        {/* <Grid   item lg={12} container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row"
                            >
                                <Grid item xs={12} sm={3} md={2} lg={2}
                                    container
                                    direction="row"
                                    
                                    
                                </Grid>

                                <Grid item xs={12} sm={4} md={2} lg={2} >
                                    <SelectField id="select" name="genderCode" placeholder="Select Gender" value={patient.genderCode} onChange={handleChange} options={GenderListOptions} />
                                </Grid>

                            </Grid>

                        </Grid> */}
                        <FormGroupTitle>Contact Info</FormGroupTitle>
                        <Grid item lg={12} container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Cell #" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleCellPhoneChange}
                                        name="cellPhone"
                                        value={patient.cellPhone}
                                        MaxLength="14"
                                    />
                                    {errorMessages.errorCellLength && patient.cellPhone != "" ? (<FormHelperText style={{ color: "red" }} >
                                        The phone number is invalid
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="Home Phone" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleHomePhoneChange}
                                        name="homePhone"
                                        value={patient.homePhone}
                                        MaxLength="14"
                                    />
                                    {errorMessages.errorPhoneLength && patient.homePhone != "" ? (<FormHelperText style={{ color: "red" }} >
                                        The phone number is invalid
                                    </FormHelperText>) : ('')}

                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Grid item lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Preferred Communication" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        id="prefferedCommunicationCode"
                                        name="prefferedCommunicationCode"
                                        value={patient.prefferedCommunicationCode}
                                        placeholder="Select Preferred Communication"
                                        onChange={handleChange}
                                        options={PrefferedCommunicationListOptions} />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                >

                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    {/* <SelectField
                                        id="prefferedCommunicationCode"
                                        name="prefferedCommunicationCode"
                                        value={patient.prefferedCommunicationCode}
                                        placeholder="Select Preferred Communication"
                                        onChange={handleChange}
                                        options={PrefferedCommunicationListOptions} /> */}
                                </Grid>

                            </Grid>


                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Grid item lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Email" mandatory={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <InputBase
                                        className={classes.baseInput}
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        name="emailAddress"
                                        value={patient.emailAddress}
                                        inputProps={{ maxLength: 250, ref: input => refPatient.refEmailAddress = input }}
                                    />
                                    {errorMessages.errorEmail && !validateEmail(patient.emailAddress) ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter valid email.
                                    </FormHelperText>) : ('')}
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={2} >
                                </Grid>

                                <Grid item xs={12} sm={5} md={5} lg={3} >
                                    <CheckboxField
                                        color="primary"
                                        name="allowDuplicateEmail"
                                        checked={patient.allowDuplicateEmail}
                                        onChange={handleIsDefaultChange}
                                        label="Allow Duplicate Email"
                                    />

                                </Grid>

                            </Grid>


                        </Grid>

                        <Grid item lg={12} container direction="row">

                            <Grid item lg={12} container direction="row"
                            >
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                                    <Label title="Address" size={4} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <TextareaField
                                            // className={classes.baseInput}
                                            rowsMin={5}
                                            placeholder="Address"
                                            onChange={handleChange}
                                            name="address"
                                            value={patient.address}
                                            MaxLength="4000"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>

                                    <Label title="City" size={2} />


                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <InputBase
                                            className={classes.baseInput}
                                            placeholder="City"
                                            onChange={handleChange}
                                            name="city"
                                            value={patient.city ? patient.city : ''}
                                            inputProps={{ maxLength: 250 }}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={4} ></Grid>
                                    <Label title="State" size={2} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <SelectField
                                            id="select"
                                            name="state"
                                            value={patient.state}
                                            onChange={handleChange}
                                            placeholder="Select State"
                                            options={USAStateListOptions}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Grid item lg={12}
                                    container
                                    direction="row"
                                >
                                    <Label title="Zip Code" size={2} />

                                    <Grid item xs={12} sm={4} md={2} lg={3} >

                                        <InputBaseField
                                            placeholder="Zip Code"
                                            onChange={handleZipChange}
                                            //type="Number"
                                            name="zipCode"
                                            value={patient.zipCode}
                                            MaxLength="5"
                                        />
                                    </Grid>
                                    <Label title="Country" size={2} />
                                    <Grid item xs={12} sm={4} md={2} lg={3} >
                                        <SelectField id="select" name="country" value={patient.country} onChange={handleChange} options={CountryListOptions} />
                                    </Grid>


                                </Grid>


                            </Grid>
                            <Grid container direction="row">
                                <br />
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Grid item xs={2} sm={2} md={2} lg={2} />

                                <Grid item xs={10} sm={10} md={10} lg={10} >

                                    {/* \nPress Ok to continue and Cancel to stay on the screen. */}
                                    <FooterBtn className={classes.footerBtn}>
                                        {
                                            isSaveCall ?
                                                <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>
                                                : <FormBtn id={"save"} onClick={Save} size="medium">Save</FormBtn>

                                        }
                                        {dataId != 0 ?
                                            isDeleteLoading ?
                                                <FormBtn id={"loadingDelete"} size="medium">Delete</FormBtn>
                                                : <FormBtn id={"delete"}
                                                    onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete “" + patient.firstName + ", " + patient.lastName + "”?", "confirm")}
                                                    size="medium">Delete</FormBtn>
                                            : null
                                        }
                                        <FormBtn id={"resetBtn"} onClick={ClearFormValues} size="medium" >Reset </FormBtn>
                                        {dataId != 0 ?
                                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                        }
                                        {/* <FormBtn id={"save"} onClick={() => ShowActionDialog("Action Title","Action Message","warning")} size="medium" >View Log</FormBtn> */}

                                    </FooterBtn>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </form>

                <LogDialog
                    code="patient"
                    id={dataId}
                    dialogOpenClose={logdialogstate}
                    onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                />
                <ActionDialog
                    title={actiondialogprops.actiondialogtitle}
                    message={actiondialogprops.actiondialogmessage}
                    type={actiondialogprops.actiondialogtype}
                    actiondialogOpenClose={actiondialogprops.actiondialogstate}
                    onSubmit={deletePatient}
                    onCancel={() => setActionDialogProps(prevState => ({
                        ...prevState,
                        actiondialogstate: false,
                    }))
                    }
                />
            </ShadowBoxMin>
        </Container >
    );
}
export default withSnackbar(PatientInfo)
