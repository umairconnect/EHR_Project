import React, { useState, useEffect } from "react";
import { Grid, InputBase, FormLabel } from "@material-ui/core";

import useStyles from "./styles";
//import { AlertMessage, SimpleDialog } from "../../../../components/Message";
import {
    InputBaseField,
    TextareaField,
    SelectField,
    MultiSelectField,
    SwitchBoxField,
} from "../../../../components/InputField";
import {
    ShadowBox,
    FooterBtn,
    FormGroupTitle,
    FormBtn,
    Label,
    ErrorMessage,
} from "../../../../components/UiElements";
import { PostDataAPI } from "../../../../Services/PostDataAPI";
import { GetDataAPI } from "../../../../Services/GetDataAPI";
import configData from "../../../../Configuration/config";
import {
    USAStateListOptions,
    CountryListOptions,
    AccountStatusOptions,
} from "../../../../context/StaticDropDowns";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { withSnackbar } from "../../../../components/Message/Alert";
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import EmergencyAllowModal from '../../emergencyAccess/component/AllowEmergencyAccess';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function StaffForm(props) {
    var classes = useStyles();

    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);

    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);
    // console.log("Staff form edit checking " + isFormEditable);

    const [title, setTitle] = useState("Staff");
    const [providerPage, setproviderPage] = React.useState(false);
    const [logdialogstate, setLogDialogState] = useState(false);

    const [dialogBoxOpenClose, setDialogBoxOpenClose] = useState(false);
    const [dialogClose, setDialogClose] = useState(false);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [previousLocState, setpreviousStaffState] = useState({
        previousStaff: "",
    });

    const [allProviders, setAllProviders] = useState([]);
    const [primaryProvider, setPrimaryProvider] = useState([]);
    const [staffFormRoles, setStaffFormRoles] = useState([]);
    const [staffFormLocations, setStaffFormLocations] = useState([]);
    const [profileImage, setProfileImage] = useState({
        file: null,
        userPhoto: null,
        userPhotoName: null,
    });
    const [primaryLocationId, setPrimaryLocationId] = useState(0);

    let APIUrl = configData.ApiUrl;

    const [state, setState] = useState({
        userID: "",
        firstName: "",
        middleName: "",
        lastName: "",
        homePhone: "",
        cellPhone: "",
        address: "",
        city: "",
        state: "",
        country: "USA",
        zip: "",
        status: 1,
        emailAddress: "",
        photoPath: "",
        isProvider: "",
        createdBy: 0,
        createdDate: "",
        updatedBy: 0,
        updateDate: "",
        roleName: "",
        roleID: 0,
        providerID: "",
        primaryLocationID: "",
        allProviderIds: [], //tempProviderList: []
        emergencyAccess: true,
        licenseNumber: "",
        licenseExpiry: "",
        licenseStateCode: "",
        licenseDegree: ""
    });

    const staffFormRef = useState({
        lastNameRef: "",
        firstNameRef: "",
        primaryLocationRef: "",
        primaryProviderRef: "",
        emailAddressRef: "",
        roleNameRef: "",
    });

    const licenseState = [
        {
            label: "test",
            value: 'test'
        }
    ]

    const [emergencyAllowModal, setEmergencyAllowModal] = useState(false);


    const [errorMessages, setErrorMessages] = useState({
        errorFirstName: false,
        errorLastName: false,
        errorEmailAddress: false,
        errorRoleID: false,
        errorProviderID: false,
        errorPrimaryLocationID: false,
        errorPhoneLength: false,
        errorCellLength: false,
        moveToElementId:''
    });
    ///State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false,
        actiondialogtitle: "Title",
        actiondialogmessage: "Message",
        actiondialogtype: "warning",
    });
    const [emailDisabled, setEmailDisabled] = useState(false);

    const showEmergencyAllow = () => {
        setEmergencyAllowModal(true);
    }
    const closeEmergencyAllow = () => {

        setEmergencyAllowModal(false);

        if (state["emergencyAccess"] = true) {
            state["emergencyAccess"] = false
        } else {
            state["emergencyAccess"] = true
        }
    }
    function uploadSingleFile(e) {
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userPhotoName: e.target.files[0].name,
        });
    }

    let user_info = JSON.parse(sessionStorage.getItem("user_info"));
    let userId = user_info.user.userID;

    useEffect(() => {
        if (props.dataId != 0) {
            setEmailDisabled(true);
        }

        var params = {
            code: "role_for_user",
            parameters: [dataId ? dataId.toString() : ""],
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setStaffFormRoles(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    })
                );
            }
        });

        params = {
            code: "location_for_user",
            parameters: [userId, dataId ? dataId.toString() : ""],
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var primaryLocationId = 0;

                setStaffFormLocations(
                    result.data.map((item, i) => {
                        if (item.text2 == "True") primaryLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    })
                );
                if (dataId < 1 && primaryLocationId > 0) {
                    setPrimaryLocationId(primaryLocationId);
                    setState((prevState) => ({
                        ...prevState,
                        primaryLocationID: primaryLocationId,
                    }));
                    getProviderList(primaryLocationId);
                }
            }
        });

        setStaffFormState();
    }, []);

    const getProviderList = (locationID, providerId, allProviderIds) => {
        GetDataAPI("user/getProvidersByLocation", "locationID=" + locationID).then(
            (result) => {
                // fill providers multiselect
                if (result.success && result.data != null) {
                    let primProviderlst = [];
                    let allProviderlst = [];
                    // fill primary provider dropdown
                    //const lstAllProvidersIdsTemp = allProviderIds.filter(t => t != providerId);
                    result.data.map((item, i) => {
                        //if (!allProviderIds || allProviderIds.indexOf(item.id) < 0)
                        primProviderlst.push({
                            value: item.id,
                            label: item.text1 + " " + item.text2,
                        });
                    });

                    // fill other location multiselect

                    result.data.map((item, i) => {
                        if (!providerId || providerId != item.id)
                            allProviderlst.push({
                                value: item.id,
                                label: item.text1 + " " + item.text2,
                            });
                    });
                    setPrimaryProvider(primProviderlst);
                    setAllProviders(allProviderlst);
                }
            }
        );
    };

    const getOtherProvidersList = (locationID, primaryProviderId) => {
        let primProvId = primaryProviderId;

        GetDataAPI("user/getProvidersByLocation", "locationID=" + locationID).then(
            (result) => {
                // fill providers multiselect
                if (result.success && result.data != null) {
                    // fill primary provider dropdown
                    setPrimaryProvider(
                        result.data.map((item, i) => {
                            return { value: item.id, label: item.text1 + " " + item.text2 };
                        })
                    );

                    // fill other location multiselect
                    const lstAllProviders = result.data
                        .filter((item) => item.id != primProvId)
                        .map((item, i) => {
                            return { value: item.id, label: item.text1 + " " + item.text2 };
                        });
                    setAllProviders(lstAllProviders);
                    console.log(lstAllProviders);
                }
            }
        );
    };

    function setStaffFormState() {
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
            state.roleID = 0;
            state.status = 0;
            state.providerID = "";
            state.primaryLocationID = primaryLocationId;
            state.providerStafflst = [];
            state.userLocationlst = [];
            state.createdBy = 0;
            state.createdDate = "";
            state.updatedBy = 0;
            state.allProviderIds = [];
            state.licenseNumber= "";
            state.licenseExpiry = "";
            state.licenseStateCode = "";
            state.licenseDegree = "";
            //state.tempProviderList = [];

            //Load Staff
            loadStaff();
        } else {
            cleanValuesFields();
        }
    }

    const onClose = (onClose) => {
        setDialogClose(onClose);
        setDialogBoxOpenClose(false);
    };

    const handleChecked = e => {
        const { name, checked } = e.target;

        if (checked) {
            state["emergencyAccess"] = true;
            setEmergencyAllowModal(true)
        } else {
            state["emergencyAccess"] = false;
            setEmergencyAllowModal(false)
        }

        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleZipChange = (e) => {
        if (
            e.nativeEvent.data != "e" &&
            e.nativeEvent.data != "+" &&
            e.nativeEvent.data != "-"
        ) {
            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                    if (e.target.value.length <= 5) {
                        const { name, value } = e.target;
                        setState((prevState) => ({
                            ...prevState,
                            [name]: value,
                        }));
                    }
                } else e.preventDefault();
            } else {
                const { name, value } = e.target;
                setState((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else e.preventDefault();
    };

    const handleHomePhoneChange = (e) => {
        if (e.nativeEvent.data != "e") {
            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value
                    .replace(" ", "")
                    .replace("(", "")
                    .replace(")", "")
                    .replace("-", "");
                const { name, value } = e.target;
                if (e.target.value === "" || re.test(e.target.value)) {
                    var cleaned = ("" + e.target.value).replace(/\D/g, "");
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                        var intlCode = match[1] ? "+1 " : "",
                            number = [
                                intlCode,
                                "(",
                                match[2],
                                ") ",
                                match[3],
                                "-",
                                match[4],
                            ].join("");

                        setState((prevState) => ({
                            ...prevState,
                            [name]: number,
                        }));

                        setErrorMessages((prevState) => ({
                            ...prevState,
                            errorPhoneLength: false,
                        }));

                        return;
                    }

                    setState((prevState) => ({
                        ...prevState,
                        [name]: value,
                    }));
                } else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }
                }
            } else {
                const { name, value } = e.target;
                setState((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));

                if (e.target.value != "") {
                    setErrorMessages((prevState) => ({
                        ...prevState,
                        errorPhoneLength: true,
                    }));
                } else {
                    setErrorMessages((prevState) => ({
                        ...prevState,
                        errorPhoneLength: false,
                    }));
                }
            }
        } else e.preventDefault();
    };

    const handleCellPhoneChange = (e) => {
        if (e.nativeEvent.data != "e") {
            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value
                    .replace(" ", "")
                    .replace("(", "")
                    .replace(")", "")
                    .replace("-", "");
                const { name, value } = e.target;
                if (e.target.value === "" || re.test(e.target.value)) {
                    var cleaned = ("" + e.target.value).replace(/\D/g, "");
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                        var intlCode = match[1] ? "+1 " : "",
                            number = [
                                intlCode,
                                "(",
                                match[2],
                                ") ",
                                match[3],
                                "-",
                                match[4],
                            ].join("");

                        setState((prevState) => ({
                            ...prevState,
                            [name]: number,
                        }));

                        setErrorMessages((prevState) => ({
                            ...prevState,
                            errorCellLength: false,
                        }));

                        return;
                    }

                    setState((prevState) => ({
                        ...prevState,
                        [name]: value,
                    }));
                } else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }
                }
            } else {
                const { name, value } = e.target;
                setState((prevState) => ({
                    ...prevState,
                    [name]: number,
                }));

                if (e.target.value != "") {
                    setErrorMessages((prevState) => ({
                        ...prevState,
                        errorCellLength: true,
                    }));
                } else {
                    setErrorMessages((prevState) => ({
                        ...prevState,
                        errorCellLength: false,
                    }));
                }
            }
        } else e.preventDefault();
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (value || parseInt(value) < 0) getProviderList(value);
        else {
            setPrimaryProvider([]);
            setAllProviders([]);
        }
    };

    const handlePrimaryProviderChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (value || parseInt(value) < 0) {
            getOtherProvidersList(state.primaryLocationID, value);
        } else {
            getProviderList(state.primaryLocationID);
        }
    };

    const handleMultiSelectChange = (name, selected) => {
        setState((prevState) => ({
            ...prevState,
            [name]: selected,
        }));

        if (selected.indexOf(state.providerID) >= 0) {
            setState((prevState) => ({
                ...prevState,
                ["providerID"]: "",
            }));
        }
    };

    function cleanValuesFields() {
        setState({
            userID: "",
            firstName: "",
            middleName: "",
            lastName: "",
            homePhone: "",
            cellPhone: "",
            address: "",
            city: "",
            state: "",
            country: "USA",
            zip: "",
            emailAddress: "",
            photoPath: "",
            isProvider: false,
            isDeleted: false,
            createdBy: 0,
            updatedBy: 0,
            createdDate: null,
            roleID: "",
            status: 1,
            providerID: "",
            primaryLocationID: primaryLocationId,
            allProviderIds: [],
            licenseNumber: "",
            licenseExpiry: "",
            licenseStateCode: "",
            licenseDegree: ""

            //tempProviderList: []
        });
        setProfileImage({ file: null, userPhoto: null, userPhotoName: null });
    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase());
        } else {
            return false;
        }
    }

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "Staff",
            activity: "Load staff details",
            details: "User viewed staff detail screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function ResetFormValues() {
        if (dataId > 0 || dataId != "") {
            loadStaff();
            saveAuditLogInfo();
        } else {
            cleanValuesFields();
        }
    }

    function BackToStaff() {
        document.getElementById("btnBackToStaff").click();
    }

    function loadStaff() {
        PostDataAPI("user/getStaffById", parseInt(dataId)).then((result) => {
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
                    status: result.data.status,
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    updatedBy: result.data.updatedBy,
                    providerID: result.data.providerID,
                    primaryLocationID: result.data.primaryLocationID.toString(),
                    photoPath: result.data.photoPath,
                    licenseNumber: result.data.licenseNumber,
                    licenseExpiry: result.data.licenseExpiry ? result.data.licenseExpiry.split('T')[0]:'',
                    licenseStateCode: result.data.licenseStateCode,
                    licenseDegree: result.data.licenseDegree,
                    allProviderIds:
                        result.data.allProviderIds != "" &&
                            result.data.allProviderIds != null
                            ? result.data.allProviderIds.map(String)
                            : [],
                });

                setpreviousStaffState({
                    previousStaff: result.data.firstName + " " + result.data.lastName,
                });

                if (result.data.primaryLocationID && result.data.primaryLocationID > 0)
                    getProviderList(
                        result.data.primaryLocationID,
                        result.data.providerID,
                        result.data.allProviderIds
                            ? result.data.allProviderIds.map(String)
                            : []
                    );
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }

    function setMoveToElementId(elementId) {
        if (errorMessages.moveToElementId.length <= 0) {
            errorMessages.moveToElementId = elementId;
        }
    }

    const SaveStaff = (e) => {
        e.preventDefault();

        let errorList = [];
        let roomsList = [];
        errorMessages.moveToElementId = '';
        if (!state.firstName || state.firstName.trim() == "") {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorFirstName: true,
            }));
            setMoveToElementId('firstName')
            errorList.push(true);
            //   staffFormRef.firstNameRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorFirstName: false,
            }));
        }
        if (!state.lastName || state.lastName.trim() == "") {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorLastName: true,
            }));
            setMoveToElementId('lastName')
            errorList.push(true);
            //  staffFormRef.lastNameRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorLastName: false,
            }));
        }
        if (state.roleID === "" || state.roleID === undefined) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorRoleID: true,
            }));
            setMoveToElementId('roleID')
            errorList.push(true);
            // staffFormRef.roleNameRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorRoleID: false,
            }));
        }

        if (
            !state.emailAddress ||
            state.emailAddress.trim() == "" ||
            validateEmail(state.emailAddress) === false
        ) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorEmailAddress: true,
            }));

            errorList.push(true);
            // staffFormRef.emailAddressRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorEmailAddress: false,
            }));
        }

        if (
            state.primaryLocationID === "" ||
            state.primaryLocationID === undefined
        ) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorPrimaryLocationID: true,
            }));

            errorList.push(true);
            // staffFormRef.primaryLocationRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorPrimaryLocationID: false,
            }));
        }
        if (state.providerID === "" || state.providerID === undefined) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorProviderID: true,
            }));

            errorList.push(true);
            // staffFormRef.primaryProviderRef.focus();
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorProviderID: false,
            }));
        }

        if (
            state.homePhone != "" &&
            state.homePhone != undefined &&
            state.homePhone.length < 10
        ) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorPhoneLength: true,
            }));

            errorList.push(true);
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorPhoneLength: false,
            }));
        }

        if (
            state.cellPhone != "" &&
            state.cellPhone != undefined &&
            state.cellPhone.length < 10
        ) {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorCellLength: true,
            }));

            errorList.push(true);
        } else {
            setErrorMessages((prevState) => ({
                ...prevState,
                errorCellLength: false,
            }));
        }
        const element = document.getElementById(errorMessages.moveToElementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        if (errorList.length < 1) {
            let method = "user/addStaff";
            if (dataId > 0) method = "user/updateStaff";

            //-------------------- To Save File

            const formData = new FormData();
            for (var key in state) {
                if (key == "allProviderIds") {
                    for (var i = 0; i < state.allProviderIds.length; i++) {
                        formData.append(key + "[" + i + "]", state.allProviderIds[i]);
                    }
                } else if (state[key] != null) formData.append(key, state[key]);
            }

            formData.append("userPhoto", profileImage.userPhoto);
            formData.append("userPhotoName", profileImage.userPhotoName);

            //--------------------
            setIsSaveLoading(true);
            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);

                    result.data.allProviderIds = result.data.allProviderIds
                        ? result.data.allProviderIds.map(String)
                        : [];
                    result.data.licenseExpiry = result.data.licenseExpiry?result.data.licenseExpiry.split('T')[0]:'';
                    setState(result.data);

                    if (dataId < 1) {
                        showMessage(
                            "Success",
                            "Staff added successfully.",
                            "success",
                            3000
                        );
                        setEmailDisabled(true);
                    } else if (dataId > 0) {
                        showMessage(
                            "Success",
                            " Staff updated successfully.",
                            "success",
                            3000
                        );
                        setEmailDisabled(true);
                    }
                    setDataId(result.data.userID);
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        } else {
            e.preventDefault();
        }
    };

    function DeleteStaff() {
        state.allProviderIds = [];
        setIsDeleteLoading(true);
        if (state.licenseExpiry == '') {
            state.licenseExpiry = null;
        }
        PostDataAPI("user/deleteStaff", state, true).then((result) => {

            if (result.success == true) {
                setErrorMessages([]);
                showMessage("Success", "Record deleted successfully.", "success", 2000);
                setTimeout(() => {
                    setIsDeleteLoading(false);
                    BackToStaff();
                }, 2000);

                setDataId(0);
            } else {
                setIsDeleteLoading(false);
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }
    const ShowActionDialog = (title, message, type) => {
        setActionDialogProps((prevState) => ({
            ...prevState,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
        }));
    };

    return (
        <>
            <ShadowBox shadowSize={3}>
                {/* <form id="staff-form" Save={SaveStaff}> */}
                <Grid container>
                    <FormGroupTitle>Staff Info</FormGroupTitle>
                    <Grid item lg={12} container direction="row">
                        <Grid item container direction="row" lg={12}>
                            <Label title="First Name" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <InputBaseField
                                    id="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={state.firstName}
                                    MaxLength="50"
                                // inputProps={{ ref: input => staffFormRef.firstNameRef = input }}
                                />
                                {errorMessages.errorFirstName &&
                                    (!state.firstName || state.firstName.trim() == "") ? (
                                    <ErrorMessage>Please enter first name</ErrorMessage>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}
                                >
                                    <FormLabel className={classes.lableInput}>Middle Name:</FormLabel>
                                </Grid> */}
                            <Label title="Middle Name" size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>
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
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Last Name<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}

                        <Label title="Last Name" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="Last Name"
                                onChange={handleChange}
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={state.lastName}
                                MaxLength="50"
                            // inputProps={{ ref: input => staffFormRef.lastNameRef = input }}
                            />
                            {errorMessages.errorLastName &&
                                (!state.lastName || state.lastName.trim() == "") ? (
                                <ErrorMessage>Please enter last name</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            container
                            justify="center"
                            direction="row"
                            style={{ position: "absolute", right: "0" }}
                        >
                            <label
                                htmlFor="fileUploadField"
                                className={classes.uploadImageLabel}
                            >
                                {profileImage.file || state.photoPath ? (
                                    <img
                                        id="profileImgSource"
                                        src={
                                            profileImage.file != null
                                                ? profileImage.file
                                                : "." + state.photoPath
                                        }
                                        alt=""
                                        className={classes.uploadImage}
                                    />
                                ) : (
                                    <div className={classes.uploadImageBox}></div>
                                )}
                                <AddAPhotoIcon className={classes.uploadImageIcon} />
                            </label>
                            <form>
                                <div>
                                    <input
                                        type="file"
                                        id="fileUploadField"
                                        className={classes.inputFile}
                                        onChange={uploadSingleFile}
                                        accept=".png, .jpg, .jpeg"
                                    />
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                    <FormGroupTitle>Detail</FormGroupTitle>
                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Location<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}

                        <Label title="Location" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SelectField
                                id="primaryLocationID"
                                placeholder="Select Location"
                                //disableUnderline
                                //className={classes.baseInput}
                                onChange={handleLocationChange}
                                name="primaryLocationID"
                                value={state.primaryLocationID}
                                options={staffFormLocations}
                            //inputProps={{ ref: input => staffFormRef.primaryLocationRef = input }}
                            ></SelectField>
                            {errorMessages.errorPrimaryLocationID &&
                                !state.primaryLocationID ? (
                                <ErrorMessage>Please select location</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            className={classes.labelAlign}
                        >
                            <FormLabel className={classes.lableInput}></FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3}></Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Primary Provider<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}

                        <Label title="Primary Provider" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SelectField
                                id="providerID"
                                name="providerID"
                                value={state.providerID}
                                options={primaryProvider}
                                onChange={handlePrimaryProviderChange}
                                placeholder="Select Primary Provider"
                            // inputProps={{ ref: input => staffFormRef.primaryProviderRef = input }}
                            />

                            {errorMessages.errorProviderID && !state.providerID ? (
                                <ErrorMessage>Please select provider</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Providers:</FormLabel>
                            </Grid> */}

                        <Label title="Providers" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <MultiSelectField
                                id={"select"}
                                name="allProviderIds"
                                placeholder="Select Providers"
                                onChange={handleMultiSelectChange}
                                options={allProviders}
                                Value={state.allProviderIds}
                            />
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                            {/* <Grid item xs={12} sm={4} md={4} lg={4}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}
                                    alignItems="flex-start">
                                    <FormLabel className={classes.lableInput}>Address:</FormLabel>
                                </Grid> */}

                            <Label title="Address" isTextAreaInput={true} size={4} />

                            <Grid item xs={12} sm={8} md={8} lg={6}>
                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Address"
                                    onChange={handleChange}
                                    type="text"
                                    name="address"
                                    value={state.address}
                                    MaxLength="2000"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            display="contents"
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                md={4}
                                lg={2}
                                container
                                direction="column"
                                className={classes.ResponsivelabelAlign}
                            >
                                <FormLabel className={classes.CitylableInput}>City:</FormLabel>
                                <FormLabel className={classes.stateLabelInput}>
                                    State:
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={6}>
                                <InputBase
                                    className={classes.citybaseInput}
                                    placeholder="City"
                                    onChange={handleChange}
                                    type="text"
                                    name="city"
                                    value={state.city}
                                    inputProps={{ maxLength: 100 }}
                                />
                                <SelectField
                                    id="state"
                                    name="state"
                                    value={state.state}
                                    placeholder="Select state"
                                    options={USAStateListOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Zip:</FormLabel>
                            </Grid> */}
                        <Label title="Zip" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="Zip Code"
                                onChange={handleZipChange}
                                //type="Number"
                                name="zip"
                                value={state.zip}
                                MaxLength="5"
                            />
                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Country:</FormLabel>
                            </Grid> */}
                        <Label title="Country" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SelectField
                                id="country"
                                name="country"
                                value={state.country}
                                options={CountryListOptions}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Home Phone:</FormLabel>
                            </Grid> */}

                        <Label title="Home Phone" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="(863) 993-2966"
                                onChange={handleHomePhoneChange}
                                name="homePhone"
                                value={state.homePhone}
                                MaxLength="14"
                            />
                            {errorMessages.errorPhoneLength && state.homePhone != "" ? (
                                <ErrorMessage>The phone number is invalid</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Cell #:</FormLabel>
                            </Grid> */}
                        <Label title="Cell #" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="(863) 993-2966"
                                onChange={handleCellPhoneChange}
                                name="cellPhone"
                                value={state.cellPhone}
                                MaxLength="14"
                            />
                            {errorMessages.errorCellLength && state.cellPhone != "" ? (
                                <ErrorMessage>The phone number is invalid</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Email<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}

                        <Label title="Email" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="Email Address"
                                onChange={handleChange}
                                type="text"
                                name="emailAddress"
                                value={state.emailAddress}
                                MaxLength="100"
                                IsDisabled={emailDisabled}
                            // inputProps={{ ref: input => staffFormRef.emailAddressRef = input }}
                            />
                            {errorMessages.errorEmailAddress &&
                                !validateEmail(state.emailAddress) ? (
                                <ErrorMessage>Please enter valid email</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Role<FormLabel className={classes.mandatoryColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}
                        <Label title="Role" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SelectField
                                id="roleID"
                                name="roleID"
                                value={state.roleID}
                                onChange={handleChange}
                                placeholder="Select Role"
                                options={staffFormRoles}
                            // inputProps={{ ref: input => staffFormRef.roleNameRef = input }}
                            />

                            {errorMessages.errorRoleID && !state.roleID ? (
                                <ErrorMessage>Please select role</ErrorMessage>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                            >
                                <FormLabel className={classes.lableInput}>Account Status:</FormLabel>
                            </Grid> */}
                        <Label title="Account Status" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SelectField
                                id="status"
                                name="status"
                                value={state.status}
                                onChange={handleChange}
                                options={AccountStatusOptions}
                            />
                        </Grid>

                    </Grid>
                    <Grid item lg={12} container direction="row">
                        <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end">
                            <FormLabel className={classes.lableInput}></FormLabel>
                        </Grid>
                        <LogDialog
                            code="staff"
                            id={dataId}
                            dialogOpenClose={logdialogstate}
                            onClose={(dialogstate) => setLogDialogState(dialogstate)}
                        />
                        <ActionDialog
                            title={actiondialogprops.actiondialogtitle}
                            message={actiondialogprops.actiondialogmessage}
                            type={actiondialogprops.actiondialogtype}
                            actiondialogOpenClose={actiondialogprops.actiondialogstate}
                            onSubmit={DeleteStaff}
                            onCancel={() =>
                                setActionDialogProps((prevState) => ({
                                    ...prevState,
                                    actiondialogstate: false,
                                }))
                            }
                        />
                        {/* Press Ok to continue and Cancel to stay on the screen. */}
                        <Grid item xs={12} sm={6} md={6} lg={4} container direction="row">
                            <FooterBtn className={classes.footerBtn}>
                                {isSaveLoading || isDeleteLoading ? (
                                    <FormBtn id="loadingSave" size="medium">
                                        Save
                                    </FormBtn>
                                ) : (
                                    <FormBtn
                                        id="save"
                                        onClick={SaveStaff}
                                        size="medium"
                                        disabled={!isFormEditable}
                                    >
                                        Save
                                    </FormBtn>
                                )}

                                {dataId != 0 ? (
                                    isDeleteLoading || isSaveLoading ? (
                                        <FormBtn id="loadingDelete" size="medium">
                                            Delete
                                        </FormBtn>
                                    ) : (
                                        <FormBtn
                                            id="delete"
                                            onClick={() =>
                                                ShowActionDialog(
                                                    "Delete",
                                                    "Are you sure, you want to delete “" +
                                                    state.firstName +
                                                    ", " +
                                                    state.lastName +
                                                    "”?",
                                                    "confirm"
                                                )
                                            }
                                            size="medium"
                                            disabled={!isFormEditable}
                                        >
                                            Delete
                                        </FormBtn>
                                    )
                                ) : null}
                                <FormBtn
                                    id="reset"
                                    className={classes.resetBtn}
                                    onClick={ResetFormValues}
                                    size="medium"
                                >
                                    {" "}
                                    Reset{" "}
                                </FormBtn>
                                {dataId != 0 ? (
                                    <FormBtn
                                        id={"save"}
                                        onClick={() => setLogDialogState(true)}
                                        size="medium"
                                        btnType="logs"
                                    >
                                        Logs
                                    </FormBtn>
                                ) : null}
                            </FooterBtn>
                        </Grid>
                    </Grid>

                    <FormGroupTitle>Medical License</FormGroupTitle>

                    <Grid item lg={12} container direction="row">


                        <Label title="Medical License Number" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                placeholder="License Number"
                                onChange={handleChange}
                                type="text"
                                name="licenseNumber"
                                value={state.licenseNumber}
                                MaxLength="32"
                            />

                        </Grid>

                        <Label title="Expiration" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>

                            <InputBaseField
                                onChange={handleChange}
                                type="date"
                                name="licenseExpiry"
                                value={state.licenseExpiry}
                            />

                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">


                        <Label title="State" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>

                            <SelectField
                                placeholder="Select State"
                                onChange={handleChange}
                                name= "licenseStateCode"
                                value={state.licenseStateCode}
                                options={USAStateListOptions}
                            ></SelectField>

                        </Grid>

                        <Label title="Degree Listed On License" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>

                            <InputBaseField
                            placeholder="Degree On License"
                                onChange={handleChange}
                                type="text"
                                name= "licenseDegree"
                                value={state.licenseDegree}
                                MaxLength="50"
                            />

                        </Grid>
                    </Grid>

                </Grid>
                {/* </form> */}
            </ShadowBox>
            {/* <SimpleDialog dialogOpenClose={dialogBoxOpenClose} onClose={onClose} dialogTitle="Message" cancelBtn='Cancel' okBtn='OK'>
                {alertMessageContent}
            </SimpleDialog> */}

            {emergencyAllowModal ?
                <EmergencyAllowModal showEmergencyAllow={showEmergencyAllow} handleClose={closeEmergencyAllow}></EmergencyAllowModal>
                : ''
            }
        </>
    );
}

export default withSnackbar(StaffForm);
