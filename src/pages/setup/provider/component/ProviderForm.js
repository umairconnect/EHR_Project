import React, { useState, useEffect } from "react";
import {
    Grid,
    InputBase,
    FormLabel
} from '@material-ui/core';
import useStyles from "./styles";
//import { AlertMessage, SimpleDialog } from "../../../../components/Message";
import { InputBaseField, InputBaseFieldNumber, TextareaField } from "../../../../components/InputField";
import { ShadowBox, FooterBtn, FormGroupTitle, FormBtn, ErrorMessage, Label } from "../../../../components/UiElements";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { MultiSelectField, SelectField } from "../../../../components/InputField";
import { USAStateListOptions, CountryListOptions, AccountStatusOptions } from "../../../../context/StaticDropDowns";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { withSnackbar } from "../../../../components/Message/Alert";
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";

function ProviderForm(props) {

    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);


    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);
    //console.log("Provider form edit checking " + isFormEditable);


    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [title, setTitle] = useState('Provider');
    const [providerPage, setproviderPage] = React.useState(false);

    const [dialogBoxOpenClose, setDialogBoxOpenClose] = useState(false);
    const [dialogClose, setDialogClose] = useState(false);

    const [previousLocState, setpreviousProviderState] = useState({ previousProvider: "" });
    const [providerFormSpeciality, setProviderFormSpeciality] = useState([]);
    const [providerFormRoles, setProviderFormRoles] = useState([]);
    const [primaryLocations, setPrimaryLocations] = useState([]);
    const [otherLocations, setOtherLocations] = useState([]);
    const [profileImage, setProfileImage] = useState({ file: null, userPhoto: null, userPhotoName: null });

    const [logdialogstate, setLogDialogState] = useState(false);

    const licenseState = [
        {
            label: "test",
            value: 'test'
        }
    ]
    const [state, setState] = useState({
        userID: "", firstName: "", middleName: "", lastName: "", homePhone: "", cellPhone: "", address: "",
        city: "", state: "", country: "USA", zip: "", status: 0, emailAddress: "", photoPath: "",
        isProvider: "", createdBy: 0, createdDate: "", updatedBy: 0, updateDate: "", roleName: "", roleID: 0,
        specializationID: "", primaryLocationID: "", personalNpi: "", primaryLocation: false, specializationName: "",
        providerLocationIds: [], licenseNumber: "",
        licenseExpiry: "",
        licenseStateCode: "",
        licenseDegree: ""
    });

    const providerFormRef = useState({
        lastNameRef: "", firstNameRef: "", specialityRef: "", npiRef: "", primaryLocationRef: "",
        emailAddressRef: "", roleNameRef: ""
    });


    const [errorMessages, setErrorMessages] = useState({
        errorFirstName: false, errorLastName: false, errorNPILength: false,
        errorEmailAddress: false, errorRoleID: false, errorSpecializationID: false,
        errorAccountStatus: false, errorPersonalNpi: false, errorPrimaryLocationID: false,
        errorPhoneLength: false, errorCellLength: false, moveToElementId: ''
    })
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [emailDisabled, setEmailDisabled] = useState(false);
    function uploadSingleFile(e) {
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userPhotoName: e.target.files[0].name
        })
    }

    let user_info = JSON.parse(GetUserInfo());
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    let userId = user_info.user.userID;

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.dataId),
            area: "Provider",
            activity: "Load provider details",
            details: "User viewed provider detail screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {

        if (props.dataId != 0) {
            setEmailDisabled(true)
            saveAuditLogInfo();
        }
        GetDataAPI("user/getAllSpecialities", '').then((result) => {

            if (result.success && result.data != null) {
                setProviderFormSpeciality(
                    result.data.map((item, i) => {
                        return { value: item.specializationID, label: item.name };
                    }));
            }

        })

        var params = {
            code: "role_for_user",
            parameters: [dataId ? dataId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setProviderFormRoles(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }

        })
        params = {
            code: "location_for_user",
            parameters: [userId, dataId ? dataId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                // fill primary location dropdown
                setPrimaryLocations(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));

                // fill other location multiselect
                setOtherLocations(
                    result.data.map((item, i) => {
                        return { value: item.id.toString(), label: item.text1 };
                    }));
            }

        })

        setProviderFormState();


    }, []);

    const getOtherLocationsList = (primaryLocationId) => {

        setOtherLocations([]);

        var params = {
            code: "location_for_user",
            parameters: [userId, dataId ? dataId.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                // fill primary location dropdown
                setPrimaryLocations(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));

                // fill other location multiselect
                setOtherLocations(
                    result.data.filter(item => item.id != primaryLocationId).map((item, i) => {
                        return { value: item.id.toString(), label: item.text1 };
                    }));
            }

        })

    }

    function setProviderFormState() {

        if (dataId > 0 || dataId != "") {

            state.userID = dataId;
            state.firstName = "";
            state.middleName = "";
            state.lastName = "";
            state.address = "";
            state.city = "";
            state.state = "";
            state.zip = "";
            state.country = "";
            state.homePhone = "";
            state.cellPhone = "";
            state.emailAddress = "";
            state.roleName = "";
            state.status = 0;
            state.roleID = 0;
            state.specializationID = "";
            state.personalNpi = "";
            state.specializationName = "";
            state.primaryLocation = false;
            state.primaryLocationID = "";
            state.providerStafflst = [];
            state.createdBy = 0;
            state.createdDate = "";
            state.updatedBy = 0;
            state.providerLocationIds = [];
            state.licenseNumber = "";
            state.licenseExpiry = "";
            state.licenseStateCode = "";
            state.licenseDegree = "";
            //state.updateDate = "";

            //Load Provider
            loadProvider();

        }
        else {
            cleanValuesFields();
        }
    }

    const onClose = onClose => {
        setDialogClose(onClose);
        setDialogBoxOpenClose(false);
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorCellLength: false
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


    const handlePrimaryLocationChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (value || parseInt(value) < 0) {
            getOtherLocationsList(value);
            //Remove from state as well.

            if (state.providerLocationIds && state.providerLocationIds.indexOf(value) > -1) {
                const index = state.providerLocationIds.indexOf(value);
                if (index > -1) {
                    state.providerLocationIds.splice(index, 1);
                }
            }
        }
    }

    const handleMultiSelectChange = (name, selected) => {
        setState(prevState => ({
            ...prevState,
            [name]: selected
        }));
    };

    const handleOpen = e => {

    };

    const handleClose = e => {

    };

    function cleanValuesFields() {
        setState({
            "userID": "",
            "firstName": "",
            "middleName": "",
            "lastName": "",
            "homePhone": "",
            "cellPhone": "",
            "address": "",
            "city": "",
            "state": "",
            "country": "USA",
            "zip": "",
            "emailAddress": "",
            "photoPath": "",
            "isProvider": false,
            "isDeleted": false,
            "createdBy": 0,
            "updatedBy": 0,
            "createdDate": null,
            "roleID": "",
            "status": 1,
            "personalNpi": "",
            "primaryLocation": false,
            "primaryLocationID": "",
            "specializationName": "",
            "providerLocationIds": [],
            "licenseNumber": "",
            "licenseExpiry": "",
            "licenseStateCode": "",
            "licenseDegree": ""
        });
        setProfileImage({ file: null, userPhoto: null, userPhotoName: null });
    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function ResetFormValues() {

        if (dataId > 0 || dataId != "") {
            loadProvider();

        }
        else {

            //document.getElementById("provider-form").reset();
            cleanValuesFields();
        }
    }

    function clear() {
        setProviderFormState();
    }

    function BackToProvider() {
        document.getElementById("btnBackToProvider").click();

    }

    function loadProvider() {

        PostDataAPI("user/getProviderById", parseInt(dataId)).then((result) => {
            if (result.success && result.data != null) {

                // Set data Here
                setState({
                    userID: result.data.userID,
                    firstName: result.data.firstName,
                    middleName: result.data.middleName,
                    lastName: result.data.lastName,
                    address: result.data.address,
                    city: result.data.city,
                    state: result.data.state,
                    zip: result.data.zip,
                    country: result.data.country,
                    homePhone: result.data.homePhone,
                    cellPhone: result.data.cellPhone,
                    emailAddress: result.data.emailAddress,
                    roleID: result.data.roleID,
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    updatedBy: result.data.updatedBy,
                    specializationID: result.data.specializationID,
                    status: result.data.status,
                    personalNpi: result.data.personalNpi,

                    primaryLocationID: result.data.primaryLocationID,
                    specializationName: result.data.specializationName,
                    licenseNumber: result.data.licenseNumber,
                    licenseExpiry: result.data.licenseExpiry ? result.data.licenseExpiry.split('T')[0] : '',
                    licenseStateCode: result.data.licenseStateCode,
                    licenseDegree: result.data.licenseDegree,
                    photoPath: result.data.photoPath,
                    //providerLocationIds: (result.data.providerLocationIds && result.data.providerLocationIds != "") ? result.data.providerLocationIds : []
                    providerLocationIds: (result.data.providerLocationIds != "" && result.data.providerLocationIds != null) ? result.data.providerLocationIds.map(String) : []

                });

                setpreviousProviderState({
                    previousProvider: result.data.firstName + " " + result.data.lastName
                });

                if (result.data.primaryLocationID != "")
                    getOtherLocationsList(result.data.primaryLocationID);


            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    function setMoveToElementId(elementId) {
        if (errorMessages.moveToElementId.length <= 0) {
            errorMessages.moveToElementId = elementId;
        }
    }

    const SaveProvider = e => {
        e.preventDefault();
        let errorList = []
        errorMessages.moveToElementId = '';
        if (!state.firstName || state.firstName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));

            errorList.push(true);
            setMoveToElementId("firstName");
            // providerFormRef.firstNameRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }

        if (!state.lastName || state.lastName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));

            errorList.push(true);
            setMoveToElementId("lastName");
            //providerFormRef.lastNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));

        }
        if (state.roleID === "" || state.roleID === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorRoleID: true
            }));
            setMoveToElementId("roleID");
            errorList.push(true);
            //  providerFormRef.roleNameRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRoleID: false
            }));
        }
        if (!state.emailAddress || state.emailAddress.trim() == "" || validateEmail(state.emailAddress) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmailAddress: true
            }));

            errorList.push(true);
            // providerFormRef.roleNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmailAddress: false
            }));

        }
        if (state.primaryLocationID === "" || state.primaryLocationID === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPrimaryLocationID: true
            }));

            errorList.push(true);
            //providerFormRef.primaryLocationRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrimaryLocationID: false
            }));
        }
        if (state.personalNpi === "" || state.personalNpi === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPersonalNpi: true
            }));

            errorList.push(true);
            // providerFormRef.npiRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPersonalNpi: false
            }));
        }

        if (state.personalNpi.length < 10 && state.personalNpi.length > 0) {
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

        if (state.specializationID === "" || state.specializationID === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecializationID: true
            }));

            errorList.push(true);
            //providerFormRef.specialityRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecializationID: false
            }));
        }
        if (state.status === 0 || state.status === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorAccountStatus: true
            }));

            errorList.push(true);
            //providerFormRef.status.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAccountStatus: false
            }));
        }


        if (state.homePhone != "" && state.homePhone != undefined && state.homePhone.length < 10) {

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

        if (state.cellPhone != "" && state.cellPhone != undefined && state.cellPhone.length < 10) {

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
        const element = document.getElementById(errorMessages.moveToElementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        if (errorList.length < 1) {
            let method = "user/addProvider";
            if (dataId > 0) {
                method = "user/updateProvider";
            }
            //-------------------- To Save File
            const formData = new FormData();

            for (var key in state) {
                if (key == 'providerLocationIds') {
                    var locIds = [];
                    for (var i = 0; i < state.providerLocationIds.length; i++) {
                        formData.append(key + '[' + i + ']', state.providerLocationIds[i]);
                    }
                }
                else if (state[key] != null)
                    formData.append(key, state[key]);
            }

            formData.append("userPhoto", profileImage.userPhoto);
            formData.append("userPhotoName", profileImage.userPhotoName);

            //--------------------
            setIsSaveLoading(true);
            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {

                    setErrorMessages([]);

                    result.data.providerLocationIds = (result.data.providerLocationIds) ? result.data.providerLocationIds.map(String) : [];


                    setState(result.data);

                    if (dataId < 1) {
                        showMessage("Success", "Provider  created successfully.", "success", 3000);
                        setEmailDisabled(true)
                    }
                    else if (dataId > 0) {
                        showMessage("Success", "Provider updated successfully.", "success", 3000);
                        setEmailDisabled(true)
                    }
                    setDataId(result.data.userID);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }
        else {
            //e.preventDefault();
        }
    };
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
    }
    function DeleteProvider() {
        ShowActionDialog(false, "Delete", "Are you sure, you want to delete “" + state.firstName + " " + state.lastName + "” ?", "confirm", function () {
            var data = {
                userID: state.userID
            };
            setIsDeleteLoading(true);
            PostDataAPI('user/deleteProvider', data, true).then((result) => {
                setIsDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Provider deleted successfully.", "success", 2000); setTimeout(() => { BackToProvider(); }, 2000);
                    setDataId(0);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }

    return (
        <>
            <ShadowBox>
                {/* <form id="provider-form" save={SaveProvider}> */}
                <Grid container >

                    <FormGroupTitle>Name</FormGroupTitle>
                    <Grid item lg={12} container direction="row">

                        <Grid item container direction="row" lg={12}>

                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign} >
                                <FormLabel className={classes.lableInput}>First Name<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}
                            <Label title="First Name" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    value={state.firstName}
                                    MaxLength="50"
                                // inputProps={{ ref: input => providerFormRef.firstNameRef = input }}
                                />
                                {errorMessages.errorFirstName && (!state.firstName || state.firstName.trim() == "") ? (<ErrorMessage >
                                    Please enter first name
                                </ErrorMessage>) : ('')}
                            </Grid>
                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Middle Name:</FormLabel>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="middleName"
                                    value={state.middleName}
                                    MaxLength="50"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Last Name<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                id="lastName"
                                placeholder="Last Name"
                                onChange={handleChange}
                                type="text"
                                name="lastName"
                                value={state.lastName}
                                MaxLength="50"
                            // inputProps={{ ref: input => providerFormRef.lastNameRef = input }}
                            />
                            {errorMessages.errorLastName && (!state.lastName || state.lastName.trim() == "") ? (<ErrorMessage >
                                Please enter last name
                            </ErrorMessage>) : ('')}
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container justify="center" direction="row" style={{ position: "absolute", right: "0" }}>

                            <label htmlFor="fileUploadField" className={classes.uploadImageLabel}>
                                {profileImage.file || state.photoPath ?
                                    <img id='profileImgSource' src={profileImage.file != null ? profileImage.file : "." + state.photoPath} alt='' className={classes.uploadImage} />
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

                    </Grid>


                    <FormGroupTitle>Details</FormGroupTitle>


                    <Grid item lg={12} container direction="row">



                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Speciality<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <SelectField
                                id="specializationID"
                                name="specializationID"
                                value={state.specializationID}
                                placeholder="Select Speciality"
                                options={providerFormSpeciality}
                                onChange={handleChange}
                            //inputProps={{ ref: input => providerFormRef.specialityRef = input }}
                            />

                            {errorMessages.errorSpecializationID && !state.specializationID ? (<ErrorMessage >
                                Please select speciality
                            </ErrorMessage>) : ('')}

                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>NPI #<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseFieldNumber
                                placeholder="NPI"
                                onChange={handleNPIChange}
                                type="Number"
                                name="personalNpi"
                                value={state.personalNpi}
                                MaxLength="10"
                            // inputProps={{ ref: input => providerFormRef.npiRef = input }}
                            />

                            {errorMessages.errorPersonalNpi && !state.personalNpi ? (<ErrorMessage >
                                Please enter NPI number
                            </ErrorMessage>) : ('')

                            }
                            {errorMessages.errorNPILength ? (<ErrorMessage >
                                NPI must be 10 digits
                            </ErrorMessage>) : ('')}

                            {/*{state.personalNpi=='0' ? (<ErrorMessage >*/}
                            {/*    Please enter valid NPI number*/}
                            {/*</ErrorMessage>) :null*/}



                        </Grid>


                    </Grid>

                    <Grid item lg={12} container direction="row">


                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Primary Location<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <SelectField
                                id="primaryLocationID"
                                name="primaryLocationID"
                                value={state.primaryLocationID}
                                options={primaryLocations}
                                onChange={handlePrimaryLocationChange}
                                placeholder="Select Location"
                            //inputProps={{ ref: input => providerFormRef.primaryLocationRef = input }}
                            />

                            {errorMessages.errorPrimaryLocationID && !state.primaryLocationID ? (<ErrorMessage >
                                Please select location
                            </ErrorMessage>) : ('')}

                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Other Locations:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <MultiSelectField
                                id={"providerLocationIds"}
                                name="providerLocationIds"
                                onChange={handleMultiSelectChange}
                                placeholder='Select Locations'
                                options={otherLocations}
                                Value={state.providerLocationIds}
                            />
                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                            <Grid item xs={12} sm={4} md={4} lg={4}
                                container
                                direction="row"
                                className={classes.labelAlign}>
                                <FormLabel className={classes.lableInput}>Address:</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={6} >
                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Address"
                                    onChange={handleChange}
                                    name="address"
                                    value={state.address}
                                    MaxLength="2000"
                                />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" display="contents" xs={12} sm={6} md={6} lg={6}>
                            <Grid item xs={12} sm={4} md={4} lg={2}
                                container
                                direction="column"
                                className={classes.ResponsivelabelAlign}
                            >
                                <FormLabel className={classes.CitylableInput}>City:</FormLabel>
                                <FormLabel className={classes.stateLabelInput}>State:</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={6} >
                                <InputBase
                                    className={classes.citybaseInput}
                                    placeholder="City"
                                    onChange={handleChange}
                                    type="text"
                                    name="city"
                                    value={state.city}
                                    inputProps={{ maxLength: "100", autoComplete: "off" }}

                                />
                                <SelectField
                                    id="state"
                                    name="state"
                                    value={state.state}
                                    placeholder="Select State"
                                    options={USAStateListOptions}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">


                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Zip:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                placeholder="Zip Code"
                                onChange={handleZipChange}
                                //type="Number"
                                name="zip"
                                value={state.zip}
                                MaxLength="5"
                                MinLength="1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Country:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <SelectField
                                id="country"
                                name="country"
                                value={state.country}
                                placeholder="Select Country"
                                options={CountryListOptions}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>


                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Home Phone:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                placeholder="(863) 993-2966"
                                onChange={handleHomePhoneChange}
                                name="homePhone"
                                value={state.homePhone}
                                MaxLength="14"
                            />

                            {errorMessages.errorPhoneLength && state.homePhone != "" ? (<ErrorMessage >
                                The phone number is invalid
                            </ErrorMessage>) : ('')}
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Cell #:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                placeholder="(863) 993-2966"
                                onChange={handleCellPhoneChange}
                                name="cellPhone"
                                value={state.cellPhone}
                                MaxLength="14"
                            />
                            {errorMessages.errorCellLength && state.cellPhone != "" ? (<ErrorMessage >
                                The phone number is invalid
                            </ErrorMessage>) : ('')}
                        </Grid>



                    </Grid>

                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Email<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                placeholder="Email Address"
                                onChange={handleChange}
                                type="text"
                                name="emailAddress"
                                value={state.emailAddress}
                                MaxLength="100"
                                IsDisabled={emailDisabled}
                            //inputProps={{ ref: input => providerFormRef.emailAddressRef = input }}
                            />
                            {errorMessages.errorEmailAddress && !validateEmail(state.emailAddress) ? (<ErrorMessage >
                                Please enter valid email
                            </ErrorMessage>) : ('')}
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput} >Account Status<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <SelectField
                                id="status"
                                name="status"
                                value={state.status}
                                placeholder="Select Status"
                                options={AccountStatusOptions}
                                onChange={handleChange}
                            // inputProps={{ ref: input => providerFormRef.status = input }}
                            />
                            {errorMessages.errorAccountStatus && state.status == 0 ? (<ErrorMessage >
                                Please select the account status
                            </ErrorMessage>) : ('')}
                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">


                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Role<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <SelectField
                                id="roleID"
                                name="roleID"
                                value={state.roleID}
                                placeholder="Select Role"
                                options={providerFormRoles}
                                onChange={handleChange}
                            //inputProps={{ ref: input => providerFormRef.roleNameRef = input }}
                            />

                            {errorMessages.errorRoleID && !state.roleID ? (<ErrorMessage >
                                Please select role
                            </ErrorMessage>) : ('')}
                        </Grid>



                    </Grid>

                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >

                        </Grid>
                        <LogDialog
                            code="provider"
                            id={dataId}
                            dialogOpenClose={logdialogstate}
                            onClose={(dialogstate) => setLogDialogState(dialogstate)}
                        />
                        <ActionDialog
                            title={actiondialogprops.actiondialogtitle}
                            message={actiondialogprops.actiondialogmessage}
                            type={actiondialogprops.actiondialogtype}
                            actiondialogOpenClose={actiondialogprops.actiondialogstate}
                            onSubmit={actiondialogprops.OnOk}

                            onCancel={() => setActionDialogProps(prevState => ({
                                ...prevState,
                                actiondialogstate: false,
                            }))
                            }
                        />
                        {/* \nPress Ok to continue and Cancel to stay on the screen. */}
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            <FooterBtn className={classes.footerBtn}>
                                {
                                    isSaveLoading ?
                                        <FormBtn id="loadingSave" size="medium">Save</FormBtn>
                                        : <FormBtn id="save" onClick={SaveProvider} size="medium" disabled={!isFormEditable}>Save</FormBtn>
                                }

                                {dataId != 0 ?
                                    isDeleteLoading ?
                                        <FormBtn id="loadingDelete" className={classes.deleteBtn} size="medium">Delete</FormBtn>
                                        : <FormBtn id="delete" className={classes.deleteBtn} onClick={() => DeleteProvider()} size="medium" disabled={!isFormEditable}>Delete</FormBtn>
                                    : null
                                }
                                <FormBtn id="resetBtn" className={classes.resetBtn} onClick={ResetFormValues} size="medium" > Reset </FormBtn>
                                {dataId != 0 ?
                                    <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                    : null
                                }
                            </FooterBtn>
                        </Grid>
                    </Grid>

                    <FormGroupTitle>Medical License</FormGroupTitle>
                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>Medical License Number<FormLabel className={classes.mandatoryColor}></FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                placeholder="License Number"
                                onChange={handleChange}
                                type="text"
                                name="licenseNumber"
                                value={state.licenseNumber}
                                MaxLength="32"
                            />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput} >Expiration<FormLabel className={classes.mandatoryColor}></FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                onChange={handleChange}
                                type="date"
                                name="licenseExpiry"
                                value={state.licenseExpiry}
                            />

                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}>State<FormLabel className={classes.mandatoryColor}></FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <SelectField
                                placeholder="Select State"
                                onChange={handleChange}
                                name="licenseStateCode"
                                value={state.licenseStateCode}
                                options={USAStateListOptions}
                            ></SelectField>
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}>
                            <FormLabel className={classes.lableInput} >Degree Listed On License<FormLabel className={classes.mandatoryColor}></FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                placeholder="Degree on  License"
                                onChange={handleChange}
                                type="text"
                                name="licenseDegree"
                                value={state.licenseDegree}
                                MaxLength="50"
                            />
                        </Grid>

                    </Grid>
                </Grid>


                {/* </form> */}
            </ShadowBox>

        </>
    );
}

export default withSnackbar(ProviderForm)
