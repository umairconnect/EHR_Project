import React, { useState, useEffect } from "react";
import {
    Grid,
    InputBase,
    FormHelperText,
} from '@material-ui/core';
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { InputBaseField, CheckboxField, TextareaField, SelectField } from "../../../../../../components/InputField";
import { toDayDate } from "../../../../../../components/Common/Extensions";
import { ShadowBox, FormGroupTitle, FormBtn, FooterBtn, Label, ShadowBoxMin } from "../../../../../../components/UiElements";
import { USAStateListOptions, CountryListOptions } from "../../../../../../context/StaticDropDowns";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import { allowedAttachments } from '../../../../../../common/allowedAttachments';

import moment from "moment";

function DemographicsDetails(props) {
    var classes = useStyles();

    const { showMessage } = props;
    const commonAttachments = allowedAttachments();

    const [maritalStatusCodes, setMaritalStatusCodes] = useState([]);
    const [suffixCodes, setSuffixCodes] = useState([]);
    const [raceCodes, setRaceCodes] = useState([]);
    const [ethnicityCodes, setEthnicityCodes] = useState([]);
    const [preferredLanguage, setPreferredLanguage] = useState([]);
    const [patientStatusCodes, setPatientStatusCodes] = useState([]);
    const [studentStatusCode, setStudentStatusCode] = useState([]);
    const [genderIdentityCodes, setGenderIdentityCodes] = useState([]);
    const [sexualOrientationCodes, setSexualOrientationCodes] = useState([]);
    const [paymentProfileCodes, setPaymentProfileCodes] = useState([]);
    const [epstdServiceCodes, setEpstdServiceCodes] = useState([]);
    const [epstdRefCondCodes, setEpstdRefCondCodes] = useState([]);
    const [demographicsVeteranCodes, setDemographicsVeteranCodes] = useState([]);
    const [countyCodes, setCountyCodes] = useState([]);
    const [profileImage, setProfileImage] = useState({ file: null, fileToSend: null, fileName: null });

    const [isDisabled, setIsDisabled] = useState(false);

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);


    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const [dataId, setDataId] = useState(props.dataId);

    const [state, setState] = useState({

        demographicID: 0, patientID: dataId, chartNumber: "", pharmacyID: null, imageLabID: null, labID: null,
        genderIdentityCode: "", sexualOrientationCode: "", raceCode: "", ethnicityCode: "", patientStatusCode: "",
        emailAddress: "", milZip: "", mailAddress: "", mailCity: "", mailZip: "", mailState: "", mailCountry: "USA", notes: "", maritalStatusCode: "",
        epstdServiceCode: "", epstdRefCondCode: "", emergencyContactName: "", emergencyContactPhone: "", emergencyContactRelation: "",
        suffixCode: "", officeExt: "", declineClinicalSummary: false, medicalHistoryConsent: false, paymentProfileCode: "",
        copay: "", studentStatusCode: "", deathDatetime: "", deathCause: "", preferredCommCode: "", advanceDirectiveDate: "", advanceDirectiveNote: "",
        createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0, veteranStatusCode: "", sexAtBirthCode: "", allowReminderSms: false, allowReminderEmail: false,
        isAllowReminderSms: null,
        isAllowReminderEmail: null

    });

    const [patient, setPatient] = useState({
        patientId: 0, primaryProviderID: 0, chartNumber: "", salutation: "", lastName: "", middleName: "",
        nickName: "",
        ssn: "",
        birthName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
        statusCode: "",
        officePhone: "",
        disableMsg: false,
        altEmail: "",
        firstName: "", birthDate: "", genderCode: "", cellPhone: "", homePhone: "", emailAddress: "", prefferedCommunicationCode: "",
        isDeleted: false, photoPath: "", allowDuplicateEmail: false,
        countyCode: "", IsDeleted: false, createDate: new Date().toISOString(), createdBy: 0, UpdatedBy: 0, updateDate: new Date().toISOString()
    });


    const [empstate, setEmpState] = useState({
        employerID: 0, patientID: dataId, employerName: "", phoneNumber: "", address: "", zipCode: "", city: "",
        state: "", country: "USA", emailAddress: "", createDate: new Date().toISOString(), isDeleted: false, createdBy: 0, updatedBy: 0,
        updateDate: new Date().toISOString()
    });

    const [errorMessages, setErrorMessages] = useState({

        errorOfficePhoneLength: false, errorEmergencyPhoneLength: false, errorCountry: false, errorMailCountry: false, errorSsnLength: false,
        errorDeathDate: false,
        errorChartID: false, errorLastName: false, errorFirstName: false, errorDOB: false, errorDOBFuture: false, errorDOBPast: false, errorEmail: false,
        DOBrange: false, errorPhoneLength: false, errorCellLength: false,
        errorPatPhoneLength: false, errorEmail: false, errorName: false, errorPhone: false, errorEmail: false
    })

    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [primaryProvider, setPrimaryProvider] = useState([]);
    const [patientPharmacy, setPatientPharmacy] = useState([]);
    const [patientDiagnosticImages, setPatientDiagnosticImages] = useState([]);
    const [patientLabs, setPatientLabs] = useState([]);
    let user_info = JSON.parse(sessionStorage.getItem('user_info'));
    let userId = user_info.user.userID;

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

    const SexBirthListOptions = [

        {

            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
        {
            value: "Other",
            label: "Other",
        },
        {
            value: "Unknown",
            label: "Unknown",
        },
        {
            value: "Declined-to-Specify",
            label: "Declined to Specify",
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
            label: "Cell#",
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

    useEffect(() => {
        setPageLoading(true);
        initialization();
        cleanValuesFields();
        loadDemographics();


    }, []);


    function uploadSingleFile(e) {
        //if (e.target.files == null || e.target.files.length <= 0)
        //    return;
        //var ext = e.target.files[0].name.match(/\.(.+)$/)[1];
        if (e.target.files == null || e.target.files.length <= 0)
            return;
        const name = e.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        switch (ext) {
            case commonAttachments[ext]:
                break;
            default:
                showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg", "error", 3000);
                return;
        }
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
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
                result = year_age + ' years, ' + month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
            else if (year_age === 0 && month_age > 0)
                result = month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
            else if (year_age > 0 && month_age === 0)
                result = year_age + (year_age > 1 ? ' years, ' : ' year,') + day_age + (day_age > 1 ? ' days' : ' day');
            else if (day_age === 0)
                result = '';
            else
                result = day_age + (day_age > 1 ? ' days' : ' day');
        }
        return result;
    }

    // function toDayDate() {
    //     var today = new Date();
    //     var dd = String(today.getDate()).padStart(2, '0');
    //     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //     var yyyy = today.getFullYear();

    //     today = yyyy + '-' + mm + '-' + dd;
    //     return today;
    // }
    const [pageLoading, setPageLoading] = useState(false);
    function initialization() {


        var params = {
            code: "patient_Pharmacy",
            parameters: [dataId ? dataId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            // setPageLoading(false)
            if (result.success && result.data != null) {
                setPatientPharmacy(
                    result.data.map((item, i) => {
                        return { value: parseInt(item.id), label: item.text1 };
                    }));
            }

        })

        var params = {
            code: "patient_Labs",
            parameters: [dataId ? dataId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setPatientLabs(
                    result.data.map((item, i) => {
                        return { value: parseInt(item.id), label: item.text1 };
                    }));
            }

        })


        var params = {
            code: "patient_DiagnosticImages",
            parameters: [dataId ? dataId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setPatientDiagnosticImages(
                    result.data.map((item, i) => {
                        return { value: parseInt(item.id), label: item.text1 };
                    }));
            }

        })

        var params = {
            code: "DDL_List_Item",
            parameters: ['marital_status_code', 'suffix_code', 'race_code', 'ethnicity_code', 'preferred_language', 'patient_status_code', 'student_status_code',
                'gender_identity_code', 'sexual_orientation_code', 'epstd_service_code', 'epstd_ref_cond_code', 'payment_profile_code', 'demographics_veteran_code', 'County_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _suffixCodes = [];
                var _raceCodes = [];
                var _ethnicityCodes = [];
                var _preferredLanguage = [];
                var _patientStatusCodes = [];
                var _studentStatusCode = [];
                var _genderIdentityCodes = [];
                var _sexualOrientationCodes = [];
                var _paymentProfileCodes = [];
                var _epstdServiceCodes = [];
                var _epstdRefCondCodes = [];
                var _maritalStatusCodes = [];
                var _demographicsVeteranCode = [];
                var _countyCode = [];

                result.data.map((item, i) => {

                    if (item.text3 == 'suffix_code')
                        _suffixCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'race_code')
                        _raceCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'ethnicity_code')
                        _ethnicityCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'preferred_language')
                        _preferredLanguage.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'patient_status_code')
                        _patientStatusCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'student_status_code')
                        _studentStatusCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'gender_identity_code')
                        _genderIdentityCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'sexual_orientation_code')
                        _sexualOrientationCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'payment_profile_code')
                        _paymentProfileCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'epstd_service_code')
                        _epstdServiceCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'epstd_ref_cond_code')
                        _epstdRefCondCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'marital_status_code')
                        _maritalStatusCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'demographics_veteran_code')
                        _demographicsVeteranCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'County_code')
                        _countyCode.push({ value: item.text1, label: item.text2 });


                });
                setSuffixCodes(_suffixCodes);
                setRaceCodes(_raceCodes);
                setEthnicityCodes(_ethnicityCodes);
                setPreferredLanguage(_preferredLanguage);
                setPatientStatusCodes(_patientStatusCodes);
                setStudentStatusCode(_studentStatusCode);
                setGenderIdentityCodes(_genderIdentityCodes);
                setSexualOrientationCodes(_sexualOrientationCodes);
                setPaymentProfileCodes(_paymentProfileCodes);
                setEpstdServiceCodes(_epstdServiceCodes);
                setEpstdRefCondCodes(_epstdRefCondCodes);
                setMaritalStatusCodes(_maritalStatusCodes);
                setDemographicsVeteranCodes(_demographicsVeteranCode);
                setCountyCodes(_countyCode);
            }
        })

        params = {
            code: "all_providers",
            parameters: []
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPrimaryProvider(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 + ' ' + item.text2 };
                    }));

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


    const handleChangePatient = e => {

        const { name, value } = e.target;
        if (name == 'birthDate') {
            patient.age = getAgeByDOB(value);
            let ageAccount = getAgeByDOB(value);
            if (moment(value).isBefore("1753-01-01")) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDOBPast: true
                }));
            } else {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDOBPast: false
                }));
            }
        }
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleChangeEmployer = e => {

        const { name, value } = e.target;

        setEmpState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeDecimal = e => {

        const { name, value } = e.target;
        var amount = value;
        var patt = new RegExp("[A-Za-z]");
        var res = patt.test(amount);
        if (res)
            amount = amount.replace(/[^\d.-]/g, '');

        if (!(/^[-+]?\d*\.?\d*$/.test(amount))) {
            setState(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
        else {
            //var lastChar = amount.substring(amount.length - 1);
            //if (lastChar == ".") amount = amount + "0";

            if (amount.length > 10)
                amount = parseFloat(amount).toFixed(2);

            setState(prevState => ({
                ...prevState,
                [name]: amount
            }));
        }

    };

    const handleChangeSSN = e => {

        const { name, value } = e.target;

        var patt = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
        var x = value;
        var res = patt.test(x);
        if (!res) {
            x = x
                .match(/\d*/g).join('')
                .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
                .replace(/-*$/g, '');
        }

        let snnValue = x;
        if (x.length == 3 && patient.ssn.length == 11) {
            patient.ssn = patient.ssn.slice(0, -1);
            snnValue = patient.ssn;

            setPatient(prevState => ({
                ...prevState,
                [name]: snnValue
            }));

            setPatient(prevState => ({
                ...prevState,
                ssn: value
            }));

        }
        else if (x.length > 10) {
            snnValue = value.split('-')[0].replace(/\d/g, '*') + '-' + value.split('-')[1].replace(/\d/g, '*') + '-' + value.split('-')[2];

            setPatient(prevState => ({
                ...prevState,
                [name]: snnValue
            }));

            setPatient(prevState => ({
                ...prevState,
                ssn: value
            }));

        }
        else {
            setPatient(prevState => ({
                ...prevState,
                [name]: x
            }));

            setPatient(prevState => ({
                ...prevState,
                ssn: value
            }));
        }
    };

    function handleLoadFormatData(dataSet) {
        if (dataSet.advanceDirectiveDate != null && dataSet.advanceDirectiveDate != "")
            dataSet.advanceDirectiveDate = dataSet.advanceDirectiveDate.split('T')[0];
        if (dataSet.deathDatetime != null && dataSet.deathDatetime != "")
            dataSet.deathDatetime = dataSet.deathDatetime.split('T')[0];
        if (dataSet.copay == 0)
            dataSet.copay = '';
        if (dataSet.patientLst[0]) {
            if (dataSet.patientLst[0].birthDate != null) {
                dataSet.patientLst[0].birthDate = dataSet.patientLst[0].birthDate.split('T')[0];
            }
            if (dataSet.patientLst[0].ssn != null && dataSet.patientLst[0].ssn != "") {
                let splitedValue = dataSet.patientLst[0].ssn.split('-');
                let data1 = splitedValue[0] ? splitedValue[0].replace(/\d/g, '*') : '';
                let data2 = splitedValue[1] ? splitedValue[1].replace(/\d/g, '*') : '';
                let data3 = splitedValue[2] ? splitedValue[2] : '';
                dataSet.patientLst[0].ssnMasking = data1 + '-' + data2 + '-' + data3;
            }
        }
    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function validateSsnLength(object) {

        if (object != null) {
            if (object.length === 11)
                return true;
            else
                return false;
        }

    }



    const handleCheckBoxChange = e => {

        const { name, value } = e.target;

        if (name === "declineClinicalSummary") {
            setState(prevState => ({
                ...prevState,
                declineClinicalSummary: !state.declineClinicalSummary
            }));
        }

        else if (name === "disableMsg") {
            setPatient(prevState => ({
                ...prevState,
                disableMsg: !patient.disableMsg
            }));
        }

        else if (name === "medicalHistoryConsent") {
            setState(prevState => ({
                ...prevState,
                medicalHistoryConsent: !state.medicalHistoryConsent
            }));
        }

        else if (name === "allowReminderSms") {
            setState(prevState => ({
                ...prevState,
                allowReminderSms: !state.allowReminderSms
            }));
        }
        else if (name === "allowReminderEmail") {
            setState(prevState => ({
                ...prevState,
                allowReminderEmail: !state.allowReminderEmail
            }));
        }

    }

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

    const handlePatientZipChange = e => {

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


    const handleEmpPhoneChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

                        const { name, value } = e.target;
                        setEmpState(prevState => ({
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
                setEmpState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
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

                        if (name === "emergencyContactPhone") {
                            setErrorMessages(prevState => ({
                                ...prevState,
                                errorEmergencyPhoneLength: false
                            }));
                        }

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


                    if (name === "emergencyContactPhone") {
                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorEmergencyPhoneLength: true
                        }));
                    }
                }
                else {


                    if (name === "emergencyContactPhone") {
                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorEmergencyPhoneLength: false
                        }));
                    }
                }
            }
        }
        else
            e.preventDefault();
    }

    const handlePatientPhoneChange = e => {

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

                        if (name === "officePhone") {
                            setErrorMessages(prevState => ({
                                ...prevState,
                                errorOfficePhoneLength: false
                            }));
                        }

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

                    if (name === "officePhone") {
                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorOfficePhoneLength: true
                        }));
                    }
                }
                else {

                    if (name === "officePhone") {
                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorOfficePhoneLength: false
                        }));
                    }
                }
            }
        }
        else
            e.preventDefault();
    }

    function checkPhoneLength() {
        if (empstate.phoneNumber === undefined) { return true; }
        else if (empstate.phoneNumber.length < 10)
            return true;
        else
            return false;
    }
    function checkPatientPhoneLength() {
        if (patient.phoneNumber === undefined) { return true; }
        else if (patient.phoneNumber.length < 10)
            return true;
        else
            return false;
    }

    const handleEmployerPhoneChange = e => {

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

                        setEmpState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setEmpState(prevState => ({
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
                setEmpState(prevState => ({
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

    function cleanValuesFields() {

        setState({
            demographicID: 0, patientID: dataId, pharmacyID: "", imageLabID: "", labID: "", genderIdentityCode: "",
            sexualOrientationCode: "", raceCode: "", ethnicityCode: "", patientStatusCode: "",
            emailAddress: "", milZip: "", mailAddress: "", mailCity: "", mailZip: "", mailState: "", mailCountry: "USA", notes: "", maritalStatusCode: "", epstdServiceCode: "",
            epstdRefCondCode: "", emergencyContactName: "", emergencyContactPhone: "", emergencyContactRelation: "", suffixCode: "",
            officeExt: "", declineClinicalSummary: false, medicalHistoryConsent: false, paymentProfileCode: "", copay: "",
            studentStatusCode: "",
            deathDatetime: "", deathCause: "", preferredCommCode: "", advanceDirectiveDate: "", advanceDirectiveNote: "", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
            veteranStatusCode: "", sexAtBirthCode: "", allowReminderSms: false, allowReminderEmail: false, isAllowReminderSms: null, isAllowReminderEmail: null

        });

        // reset patient details
        setPatient({
            patientId: 0, primaryProviderID: 0, chartNumber: "", salutation: "", lastName: "", middleName: "", firstName: "", birthDate: "", genderCode: "",
            cellPhone: "", homePhone: "", emailAddress: "", prefferedCommunicationCode: "",
            ssn: "", ssnMasking: "", address: "", city: "", state: "", zipCode: "", country: "USA", statusCode: "", nickName: "", birthName: "",
            officePhone: "", disableMsg: false, altEmail: "",
            isDeleted: false, photoPath: "", allowDuplicateEmail: false,
            countyCode: "",
        })

        //reset emplyee details
        setEmpState({
            employerName: "", phoneNumber: "", emailAddress: "", address: "", zipCode: "", city: "",
            state: "", country: "",
        })

        //clear error messages
        setErrorMessages({ errorOfficePhoneLength: false, errorEmergencyPhoneLength: false, errorCountry: false, errorMailCountry: false, errorSsnLength: false, errorEmail: false });

        //reload information if patient already exists
        //if (state.demographicID > 0) {
        loadDemographics();
        //}

    }

    const SaveDemographic = () => {

        let errorList = [];
        state.patientID = dataId;
        validateDemographics(errorList);


        if (errorList.length < 1) {
            setIsSaveCall(true);
            handleDeceased();
            state.pharmacyID = parseInt(state.pharmacyID);
            state.labID = parseInt(state.labID);
            state.imageLabID = parseInt(state.imageLabID);
            state.copay = isNaN(state.copay) || state.copay == null || state.copay == "" ? 0 : parseFloat(state.copay);
            state.country = "USA";
            state.advanceDirectiveDate = state.advanceDirectiveDate == "" ? null : state.advanceDirectiveDate;
            state.deathDatetime = state.deathDatetime == "" ? null : state.deathDatetime;
            state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;
            //state.patientLst = [patient];

            //state.employerLst = [empstate];



            const formData = new FormData();

            for (var key in state) {
                if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }

            for (var key in patient) {
                if (patient[key] && key != "fileName" && key != "formFile" && key != "encUserID" && key != "allowReminderSms" && key != "allowReminderEmail") {
                    if (key === 'birthDate')
                        formData.append(key, new Date(patient[key]).toISOString());
                    else if (key === 'createDate')
                        formData.append("patientCreatedDate", new Date(patient[key]).toISOString());
                    else if (key === 'updateDate')
                        formData.append("patientUpdatedDate", patient[key] == '0001-01-01T00:00:00' ? new Date().toISOString() : new Date(patient[key]).toISOString());
                    else if (key === 'createdBy')
                        formData.append("patientCreatedBy", patient[key]);
                    else if (key === 'updatedBy')
                        formData.append("patientUpdatedBy", patient[key]);
                    else
                        formData.append(key, patient[key]);
                }
            }
            for (var key in empstate) {
                if (empstate[key] && key != "fileName" && key != "formFile" && key != "encUserID" && key != "allowReminderSms" && key != "allowReminderEmail")
                    if (key === 'createDate')
                        formData.append("empCreatedDate", new Date(empstate[key]).toISOString());
                    else if (key === 'updateDate')
                        formData.append("empUpdatedDate", empstate[key] == '0001-01-01T00:00:00' ? new Date().toISOString() : new Date(empstate[key]).toISOString());
                    else if (key === 'createdBy')
                        formData.append("empCreatedBy", empstate[key]);
                    else if (key === 'updatedBy')
                        formData.append("empUpdatedBy", empstate[key]);
                    else if (key === 'address') {
                        formData.append("employerAddress", empstate[key]);
                    } else if (key === 'emailAddress') {
                        formData.append("employerEmailAddress", empstate[key]);
                    } else if (key === 'zipCode') {
                        formData.append("employerZipCode", empstate[key]);
                    } else if (key === 'city') {
                        formData.append("employerCity", empstate[key]);
                    } else if (key === 'state') {
                        formData.append("employerState", empstate[key]);
                    } else if (key === 'country') {
                        formData.append("employerCountry", empstate[key]);
                    }
                    else
                        formData.append(key, empstate[key]);
            }

            formData.append("formFile", profileImage.fileToSend);
            formData.append("fileName", profileImage.fileName);

            //state.patientLst = [patient];

            //state.employerLst = [empstate];

            let method = "demographic/addPatientDemographic";

            //if (state.demographicID > 0) {

            //    method = "demographic/updatePatientDemographic";

            //}

            PostDataAPI(method, formData, true, "formData").then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);


                    if (state.demographicID < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Demographic saved successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.copay = result.data.copay == 0 ? '' : result.data.copay;
                            handleLoadFormatData(result.data);
                            setState(result.data);

                            if (result.data.patientLst != null)
                                setPatient(result.data.patientLst[0]);

                            if (result.data.employerLst != null)
                                setEmpState(result.data.employerLst[0]);

                        }
                    }
                    else if (state.demographicID > 0) {

                        if (result.success) {

                            showMessage("Success", "Demographic updated successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.copay = result.data.copay == 0 ? '' : result.data.copay;
                            handleLoadFormatData(result.data);
                            setState(result.data);
                            getPatientCommSettings();

                            if (result.data.patientLst != null)
                                setPatient(result.data.patientLst[0]);

                            if (result.data.employerLst != null)
                                setEmpState(result.data.employerLst[0]);
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

    function validateDemographics(errorList) {
        if (state.patientID < 1) {
            showMessage("Error", "Please select a patient", "error", 3000);
            errorList.push(true);
        }

        if (patient.lastName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
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
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));

        }
        var toDay = toDayDate();
        if (patient.birthDate.trim() === "" || patient.birthDate === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOB: true
            }));

            errorList.push(true);

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
        if (moment(patient.birthDate).isBefore("1753-01-01")) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBPast: true
            }));
            errorList.push(true);
        } else {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBPast: false
            }));
        }

        if (validateEmail(patient.emailAddress.trim()) === false) {
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


        if (patient.country === null || patient.country == "") {
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

        //

        if (patient.homePhone != "" && patient.homePhone != undefined && patient.homePhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPatPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatPhoneLength: false
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

        //if (patient.phoneNumber === null || empstate.phoneNumber === "" || empstate.phoneNumber === undefined) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorPhoneLength: true
        //    }));

        //    errorList.push(true);

        //}
        //else {
        //    if (empstate.phoneNumber != "" && empstate.phoneNumber.length < 10) {

        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorPhoneLength: true
        //        }));

        //        errorList.push(true);

        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorPhoneLength: false
        //        }));
        //    }

        //}


        if (patient.officePhone != "" && patient.officePhone != undefined && patient.officePhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorOfficePhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOfficePhoneLength: false
            }));
        }

        if (state.emergencyContactPhone != "" && state.emergencyContactPhone != undefined && state.emergencyContactPhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorEmergencyPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmergencyPhoneLength: false
            }));
        }

        if (patient.ssn != null && patient.ssn != "" && patient.ssn != undefined) {

            if (patient.ssn.length < 11) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorSsnLength: true
                }));

                errorList.push(true);
            }
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSsnLength: false
            }));
        }

        if (empstate.phoneNumber != "" && patient.phoneNumber != undefined && patient.phoneNumber.length < 10) {

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

        //if (state.altEmail != null && state.altEmail != "" && validateEmail(state.altEmail) === false) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorEmail: true
        //    }));

        //    errorList.push(true);

        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorEmail: false
        //    }));
        //}

        //if (empstate.employerName != "" || empstate.phoneNumber != "" || empstate.emailAddress != "" || empstate.address != "" || empstate.city != "" || empstate.country != "" || empstate.state != "" || empstate.zipCode != "")
        //{


        //    if (empstate.employerName === null || empstate.employerName === "") {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorName: true
        //        }));

        //        errorList.push(true);

        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorName: false
        //        }));
        //    }


        //    if (empstate.phoneNumber === null || empstate.phoneNumber === "" || empstate.phoneNumber === undefined) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorPhoneLength: true
        //        }));

        //        errorList.push(true);

        //    }
        //    else {
        //        if (empstate.phoneNumber != "" && empstate.phoneNumber.length < 10) {

        //            setErrorMessages(prevState => ({
        //                ...prevState,
        //                errorPhoneLength: true
        //            }));

        //            errorList.push(true);

        //        }
        //        else {
        //            setErrorMessages(prevState => ({
        //                ...prevState,
        //                errorPhoneLength: false
        //            }));
        //        }

        //    }

        //    if (validateEmail(empstate.emailAddress) === false) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorEmail: true
        //        }));

        //        errorList.push(true);

        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorEmail: false
        //        }));
        //    }

        //}

        if (state.patientStatusCode === "3") {
            if (state.deathDatetime === null || state.deathDatetime == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDeathDate: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDeathDate: false
                }));
            }

        }

    }

    function loadDemographics() {

        PostDataAPI("demographic/getPatientDemographicById", dataId.dataId ? dataId.dataId : dataId).then((result) => {
            setPageLoading(false)
            if (result.success && result.data != null) {
                handleLoadFormatData(result.data);
                setState(result.data);

                if (result.data.patientLst != null) {
                    result.data.patientLst[0].age = getAgeByDOB(result.data.patientLst[0].birthDate);
                    setPatient(result.data.patientLst[0]);
                }

                if (result.data.employerLst != null)
                    setEmpState(result.data.employerLst[0]);

                getPatientCommSettings();
            }
            else
                getPatientCommSettings();
        })
    }

    function handleDeceased() {

        if (state.patientStatusCode === "3") { }
        else {
            state.deathCause = "";
            state.deathDatetime = "";
        }
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
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
                            errorPatPhoneLength: false
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
                        errorPatPhoneLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPatPhoneLength: false
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

    const backButton = () => {
        document.getElementById("btnIdGetPatients").click();
    }

    function deleteDemoGraphic() {

        var data = {

            demographicID: state.demographicID,
            patientID: state.patientLst ? state.patientLst[0].patientId : 0,
            employerID: state.employerLst ? state.employerLst[0].employerID : 0,
            IsDeleted: true

        }

        PostDataAPI('demographic/delete', data, true).then((result) => {

            if (result.success == true) {

                setErrorMessages([]);
                showMessage("Success", "Record deleted successfully.", "success", 3000);

                setTimeout(() => {
                    backButton();

                }, 1000)

                //setIsSaveCall(true);
                //setDataId({
                //    dataId: 0
                //});
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const getPatientCommSettings = () => {
        GetDataAPI("setup/loadCommSettings").then((result) => {
            if (result.success && result.data != null) {

                setState(prevState => ({
                    ...prevState,
                    isAllowReminderSms: result.data.allowSmsReminders == true ? true : null,
                    isAllowReminderEmail: result.data.allowEmailReminders == true ? true : null
                }));
            }
        })
    }

    return (
        <>
            {/*<div>Demographics Details {dataId}</div>*/}

            <ShadowBoxMin shadowSize={3} >
                {pageLoading ? <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> :
                    <form id="demographic-form" className={classes.formAlignment}>
                        <Grid container >

                            <FormGroupTitle>Patient Info</FormGroupTitle>

                            <Grid item lg={12} container direction="row">

                                {dataId != 0 ?
                                    <Label title="Title" size={2} />
                                    :
                                    <Grid item xs={12} sm={2} md={2} lg={2} style={{ minHeight: "44px" }}>
                                        &nbsp;
                                    </Grid>
                                }
                                {dataId != 0 ?
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <SelectField id="select" name="salutation" placeholder="Select Title" value={patient.salutation} onChange={handleChangePatient} options={SalutationListOptions} />
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
                                            <input type="file" id="fileUploadField" className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                        </div>
                                    </form>
                                </Grid>
                                <Grid item lg={1} />
                                <Label title="Chart ID" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Chart Number"
                                        onChange={handleChange}
                                        name="chartNumber"
                                        value={state.chartNumber}
                                        MaxLength='12'
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row">
                                <Label title="First Name" mandatory={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="First Name"
                                        onChange={handleChangePatient}
                                        type="text"
                                        name="firstName"
                                        value={patient.firstName}
                                        MaxLength="100"
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
                                        onChange={handleChangePatient}
                                        name="middleName"
                                        type="text"
                                        value={patient.middleName}
                                        MaxLength="100"
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
                                        onChange={handleChangePatient}
                                        name="lastName"
                                        type="text"
                                        value={patient.lastName}
                                        MaxLength="100"
                                        IsDisabled={isDisabled}
                                    />
                                    {errorMessages.errorLastName && !patient.lastName.trim() != "" ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter last name
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Gender" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField id="select"
                                        name="genderCode"
                                        placeholder="Select Gender"
                                        value={patient.genderCode}
                                        onChange={handleChangePatient}
                                        options={GenderListOptions} />
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
                                            className={classes.baseInput}
                                            placeholder="Date of Birth"
                                            onChange={handleChangePatient}
                                            name="birthDate"
                                            value={patient.birthDate}
                                            // onKeyDown={(e) => e.preventDefault()}
                                            type="date"
                                            //onClose={() => (patient.age = getAgeByDOB(patient.birthDate))}
                                            inputProps={{ max: toDayDate() }}

                                        />
                                        {errorMessages.errorDOB && !patient.birthDate ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter date of birth
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorDOBFuture ? (<FormHelperText style={{ color: "red" }} >
                                            Date of birth cannot be in future
                                            {/* Date of Birth can not be in the future  */}
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorDOBPast ? (<FormHelperText style={{ color: "red" }} >
                                            Date cannot be earlier than 01/01/1753
                                            {/* Date of Birth can not be in the Past  */}
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                    <Label title="Age" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            placeholder="Age"
                                            onChange={handleChangePatient}
                                            name="age"
                                            value={patient.age}
                                            maxLength="255"
                                            disabled
                                        />
                                    </Grid>

                                </Grid>

                            </Grid>


                            <Grid item lg={12} container direction="row">
                                <Label title="SSN #" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="SSN"
                                        onChange={handleChangeSSN}
                                        name="ssnMasking"
                                        value={patient.ssnMasking}
                                        MaxLength='11'
                                    />
                                    {errorMessages.errorSsnLength && patient.ssnMasking != "" && !validateSsnLength(patient.ssnMasking) ? (<FormHelperText style={{ color: "red" }} >
                                        The SSN is invalid
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Patient Status" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        onChange={handleChange}
                                        name="patientStatusCode"
                                        value={state.patientStatusCode}
                                        options={patientStatusCodes}
                                    />
                                </Grid>
                            </Grid>

                            {
                                state.patientStatusCode === "3" ? <Grid item lg={12} container direction="row">
                                    <Label title="Death Date" size={2} mandatory={true} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        {/* <InputBaseField
                                        placeholder="Death Date"
                                        onChange={handleChange}
                                        name="deathDatetime"
                                        type="Date"
                                        value={state.deathDatetime}
                                        MaxLength='8'
                                    /> */}
                                        <InputBaseField
                                            placeholder="Death Date"
                                            onChange={handleChange}
                                            name="deathDatetime"
                                            type="Date"
                                            value={state.deathDatetime}
                                            inputProps={{ max: toDayDate() }}

                                        />
                                        {errorMessages.errorDeathDate && !state.deathDatetime ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter death date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Label title="Death Cause" isTextAreaInput={true} size={2} />
                                    <Grid item xs={12} md={4} sm={4} lg={3} >
                                        <TextareaField
                                            rowsMin={5}
                                            placeholder="Death Cause"
                                            onChange={handleChange}
                                            name="deathCause"
                                            value={state.deathCause}
                                            MaxLength="500"
                                        />
                                    </Grid>
                                </Grid> : ""}

                            <Grid item lg={12} container direction="row">
                                <Label title="Marital Status" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Marital Status"
                                        onChange={handleChange}
                                        name="maritalStatusCode"
                                        value={state.maritalStatusCode}
                                        options={maritalStatusCodes}
                                    />
                                </Grid>
                                <Label title="Suffix" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Suffix"
                                        onChange={handleChange}
                                        name="suffixCode"
                                        value={state.suffixCode}
                                        options={suffixCodes}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Previous/Birth Name" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Birth Name"
                                        onChange={handleChangePatient}
                                        name="birthName"
                                        value={patient.birthName}
                                        MaxLength='250'
                                    />
                                </Grid>
                                <Label title="Nick Name" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Nick Name"
                                        onChange={handleChangePatient}
                                        name="nickName"
                                        value={patient.nickName}
                                        MaxLength='100'
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Primary Provider" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Primary Provider"
                                        onChange={handleChangePatient}
                                        name="primaryProviderID"
                                        value={patient.primaryProviderID}
                                        options={primaryProvider}
                                    />
                                </Grid>
                            </Grid>

                            <FormGroupTitle>Demographics</FormGroupTitle>

                            <Grid item lg={12} container direction="row">
                                <Label title="Race" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Race"
                                        onChange={handleChange}
                                        name="raceCode"
                                        value={state.raceCode}
                                        options={raceCodes}
                                    />
                                </Grid>
                                <Label title="Ethnicity" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Ethnicity"
                                        onChange={handleChange}
                                        name="ethnicityCode"
                                        value={state.ethnicityCode}
                                        options={ethnicityCodes}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Preferred Language" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Preferred Language"
                                        onChange={handleChange}
                                        name="preferredCommCode"
                                        value={state.preferredCommCode}
                                        options={preferredLanguage}
                                    />
                                </Grid>
                                <Label title="Sexual Orientation" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Sexual Orientation"
                                        onChange={handleChange}
                                        name="sexualOrientationCode"
                                        value={state.sexualOrientationCode}
                                        options={sexualOrientationCodes}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Gender Identity" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Gender Identity"
                                        onChange={handleChange}
                                        name="genderIdentityCode"
                                        value={state.genderIdentityCode}
                                        options={genderIdentityCodes}
                                    />
                                </Grid>
                                <Label title="Legal Sex at Birth" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Legal Sex at Birth"
                                        onChange={handleChange}
                                        name="sexAtBirthCode"
                                        value={state.sexAtBirthCode}
                                        options={SexBirthListOptions}
                                    />
                                </Grid>

                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Student Status" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Student Status"
                                        onChange={handleChange}
                                        name="studentStatusCode"
                                        value={state.studentStatusCode}
                                        options={studentStatusCode}
                                    />
                                </Grid>
                            </Grid>

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
                                            The cell phone is invalid
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
                                        {errorMessages.errorPatPhoneLength && checkPatientPhoneLength() ? (<FormHelperText style={{ color: "red" }} >
                                            The home phone is invalid
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Office Phone" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handlePatientPhoneChange}
                                        name="officePhone"
                                        value={patient.officePhone}
                                        MaxLength='14'
                                    />
                                    {errorMessages.errorOfficePhoneLength && patient.officePhone != "" ? (<FormHelperText style={{ color: "red" }} >
                                        The office phone number is invalid
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Office Extension" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={1} >
                                    <InputBaseField
                                        placeholder="Extension"
                                        onChange={handleChange}
                                        name="officeExt"
                                        value={state.officeExt}
                                        MaxLength='10'
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Email" mandatory={true} size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Email Address"
                                        onChange={handleChangePatient}
                                        name="emailAddress"
                                        value={patient.emailAddress}
                                        inputProps={{ maxLength: 250 }}
                                    />
                                    {errorMessages.errorEmail && !validateEmail(patient.emailAddress) ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter valid email.
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Alternate Email" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Alternate Email"
                                        onChange={handleChangePatient}
                                        name="altEmail"
                                        value={patient.altEmail}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                    {/*errorMessages.errorEmail && state.altEmail != "" && !validateEmail(state.altEmail) ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid email
                                </FormHelperText>) : ('')*/}
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Preferred Communication" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        name="prefferedCommunicationCode"
                                        value={patient.prefferedCommunicationCode}
                                        placeholder="Select Preferred Communication"
                                        onChange={handleChangePatient}
                                        options={PrefferedCommunicationListOptions} />
                                </Grid>
                                <Grid item xs={12} md={4} sm={4} lg={2}  >
                                    <span></span>
                                </Grid>
                                <Grid item xs={12} md={4} sm={4} lg={3}  >
                                    <CheckboxField
                                        color="primary"
                                        name="allowDuplicateEmail"
                                        checked={patient.allowDuplicateEmail}
                                        onChange={handleIsDefaultChange}
                                        label="Allow Duplicate Email"
                                    />

                                </Grid>

                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Grid item xs={2} md={2} sm={2} lg={2}  >
                                    <span></span>
                                </Grid>

                                <Grid xs={12} md={4} sm={4} lg={3} style={{ display: "none" }}>
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleCheckBoxChange}
                                        name="declineClinicalSummary"
                                        checked={state.declineClinicalSummary}
                                        label="Clinical Summary Declined"
                                    />

                                    <CheckboxField
                                        color="primary"
                                        onChange={handleCheckBoxChange}
                                        name="medicalHistoryConsent"
                                        checked={state.medicalHistoryConsent}
                                        label="Medical History Consent"
                                    />
                                </Grid>
                                {state.isAllowReminderSms == true ?
                                    <>
                                        <Grid item xs={12} md={4} sm={4} lg={3} >

                                            <CheckboxField
                                                color="primary"
                                                onChange={handleCheckBoxChange}
                                                name="allowReminderSms"
                                                checked={state.allowReminderSms == null ? false : state.allowReminderSms}
                                                label="Enable Reminder SMS"
                                            />

                                        </Grid>
                                        <Grid item xs={2} md={2} sm={2} lg={2} />
                                    </>
                                    : null}
                                {state.isAllowReminderEmail == true ?
                                    <Grid item xs={12} md={4} sm={4} lg={3} >

                                        <CheckboxField
                                            color="primary"
                                            onChange={handleCheckBoxChange}
                                            name="allowReminderEmail"
                                            checked={state.allowReminderEmail == null ? false : state.allowReminderEmail}
                                            label="Enable Reminder Email"
                                        />

                                    </Grid>
                                    : null}
                            </Grid>


                            <Grid item lg={12} container direction="row" style={{ display: "none" }}>
                                <Label title="Street Address" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={8} >
                                    <InputBaseField
                                        placeholder="Street Address"
                                        onChange={handleChangePatient}
                                        name="address"
                                        value={patient.address}
                                        MaxLength='11'
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row" style={{ display: "none" }}>
                                <Label title="City" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="City"
                                        onChange={handleChangePatient}
                                        name="city"
                                        value={patient.city}
                                        MaxLength='510'
                                    />
                                </Grid>
                                <Label title="State" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        id="state"
                                        name="state"
                                        value={patient.state}
                                        placeholder="Select State"
                                        options={USAStateListOptions}
                                        onChange={handleChangePatient}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row" style={{ display: "none" }}>
                                <Label title="Zip" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Zip Code"
                                        onChange={handleZipChange}
                                        name="zipCode"
                                        value={patient.zipCode}
                                        MaxLength="5"
                                        MinLength="1"
                                    />
                                </Grid>
                                <Label title="Country" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField id="select" name="country" value={patient.country} onChange={handleChangePatient} options={CountryListOptions} />
                                    {errorMessages.errorCountry && !patient.country ? (<FormHelperText style={{ color: "red" }} >
                                        Please select country
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <FormGroupTitle>Address</FormGroupTitle>
                            <Grid item lg={12} container direction="row">
                                <Label title="Address" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <InputBaseField
                                        placeholder="Address"
                                        onChange={handleChangePatient}
                                        name="address"
                                        value={patient.address}
                                        MaxLength='500'
                                    />
                                </Grid>

                                <Label title="City" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <InputBaseField
                                        placeholder="City"
                                        onChange={handleChangePatient}
                                        name="city"
                                        value={patient.city}
                                        MaxLength='250'
                                    />
                                </Grid>

                            </Grid>
                            <Grid item lg={12} container direction="row">

                                <Label title="Zip Code" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Zip Code"
                                        onChange={handlePatientZipChange}
                                        //type="Number"
                                        name="zipCode"
                                        value={patient.zipCode}
                                        MaxLength="5"
                                        MinLength="1"
                                    />
                                </Grid>

                                <Label title="County" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        id="countyCode"
                                        name="countyCode"
                                        value={patient.countyCode}
                                        placeholder="Select County"
                                        options={countyCodes}
                                        onChange={handleChangePatient}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="State" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        id="State"
                                        name="state"
                                        value={patient.state}
                                        placeholder="Select State"
                                        options={USAStateListOptions}
                                        onChange={handleChangePatient}
                                    />
                                </Grid>
                                <Label title="Country" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>

                                    <SelectField
                                        name="country"
                                        value={patient.country}
                                        options={CountryListOptions}
                                        onChange={handleChangePatient}
                                    />
                                    {errorMessages.errorCountry && !state.country ? (<FormHelperText style={{ color: "red" }} >
                                        Please select country
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <FormGroupTitle>Emergency Contact</FormGroupTitle>
                            <Grid item lg={12} container direction="row">
                                <Label title="Contact Name" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Emergency Contact Name"
                                        onChange={handleChange}
                                        name="emergencyContactName"
                                        value={state.emergencyContactName}
                                        MaxLength='250'
                                    />
                                </Grid>
                                <Label title="Contact Phone" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handlePhoneChange}
                                        name="emergencyContactPhone"
                                        value={state.emergencyContactPhone}
                                        MaxLength='14'
                                    />
                                    {errorMessages.errorEmergencyPhoneLength && state.emergencyContactPhone != "" ? (<FormHelperText style={{ color: "red" }} >
                                        The contact phone number is invalid
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Contact Relation" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Emergency Contact Relation"
                                        onChange={handleChange}
                                        name="emergencyContactRelation"
                                        value={state.emergencyContactRelation}
                                        MaxLength='100'
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="EPSDT Services" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        placeholder="Select EPSDT Services"
                                        onChange={handleChange}
                                        name="epstdServiceCode"
                                        value={state.epstdServiceCode}
                                        options={epstdServiceCodes}
                                    />
                                </Grid>
                                <Label title="EPSDT Referral Condition" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Referral Condition"
                                        onChange={handleChange}
                                        name="epstdRefCondCode"
                                        value={state.epstdRefCondCode}
                                        options={epstdRefCondCodes}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Advance Directive Date" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <InputBaseField
                                        placeholder="Select Advance Directive Date"
                                        onChange={handleChange}
                                        name="advanceDirectiveDate"
                                        type="Date"
                                        value={state.advanceDirectiveDate}
                                        MaxLength="8"

                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Notes" isTextAreaInput={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Notes"
                                        onChange={handleChange}
                                        name="notes"
                                        value={state.notes}
                                        MaxLength="4000"
                                    />
                                </Grid>
                                <Label title="Advance Directive Notes" isTextAreaInput={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Advance Directive Notes"
                                        onChange={handleChange}
                                        name="advanceDirectiveNote"
                                        value={state.advanceDirectiveNote}
                                        MaxLength="4000"
                                    />
                                </Grid>
                            </Grid>

                            <FormGroupTitle>Other Details</FormGroupTitle>

                            <Grid item lg={12} container direction="row">
                                <Label title="Preferred Lab" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Preferred Lab"
                                        onChange={handleChange}
                                        name="labID"
                                        value={state.labID}
                                        options={patientLabs}
                                    />
                                </Grid>
                                <Label title="Preferred Diagnostic Imaging" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        placeholder="Select Imaging Lab"
                                        onChange={handleChange}
                                        name="imageLabID"
                                        value={state.imageLabID}
                                        options={patientDiagnosticImages}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Preferred Pharmacy" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        placeholder="Select Preferred Pharmacy"
                                        onChange={handleChange}
                                        name="pharmacyID"
                                        value={state.pharmacyID}
                                        options={patientPharmacy}
                                    />
                                </Grid>
                                <Label title="Veteran Status" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <SelectField
                                        placeholder="Select Veteran Status"
                                        onChange={handleChange}
                                        name="veteranStatusCode"
                                        value={state.veteranStatusCode}
                                        options={demographicsVeteranCodes}
                                    />
                                </Grid>
                            </Grid>

                            <FormGroupTitle>Employer Details</FormGroupTitle>

                            <Grid item lg={12} container direction="row">
                                <Label title=" Name" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Name"
                                        onChange={handleChangeEmployer}
                                        name="employerName"
                                        value={empstate.employerName}
                                        MaxLength='100'
                                    />

                                    {errorMessages.errorName && !empstate.employerName ? (<FormHelperText style={{ color: "red" }} >
                                        please enter name
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Phone #" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleEmployerPhoneChange}
                                        name="phoneNumber"
                                        value={empstate.phoneNumber}
                                        MaxLength='14'
                                    />
                                    {errorMessages.errorPhoneLength && empstate.phoneNumber != "" ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter valid phone number
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Email" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Email"
                                        onChange={handleChangeEmployer}
                                        name="emailAddress"
                                        value={empstate.emailAddress}
                                        MaxLength='100'
                                    />
                                    {errorMessages.errorEmail && !validateEmail(empstate.emailAddress) ? (<FormHelperText style={{ color: "red" }} >
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
                                        onChange={handleChangeEmployer}
                                        name="address"
                                        value={empstate.address}
                                        MaxLength="500"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="City" size={2} mandatory={false} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="City"
                                        onChange={handleChangeEmployer}
                                        name="city"
                                        value={empstate.city}
                                        MaxLength='250'
                                    />
                                </Grid>
                                <Label title="State" size={2} mandatory={false} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select State"
                                        onChange={handleChangeEmployer}
                                        name="state"
                                        value={empstate.state}
                                        options={USAStateListOptions}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Zip Code" size={2} mandatory={false} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Zip Code"
                                        onChange={handleEmpPhoneChange}
                                        name="zipCode"
                                        value={empstate.zipCode}
                                        MaxLength="5"
                                        MinLength="1"
                                    />
                                </Grid>
                                <Label title="Country" size={2} mandatory={false} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        onChange={handleChangeEmployer}
                                        name="country"
                                        value={empstate.country}
                                        options={CountryListOptions}
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
                                <ActionDialog
                                    title={actiondialogprops.actiondialogtitle}
                                    message={actiondialogprops.actiondialogmessage}
                                    type={actiondialogprops.actiondialogtype}
                                    actiondialogOpenClose={actiondialogprops.actiondialogstate}
                                    onSubmit={deleteDemoGraphic}
                                    onCancel={() => setActionDialogProps(prevState => ({
                                        ...prevState,
                                        actiondialogstate: false,
                                    }))
                                    }
                                />


                                <LogDialog
                                    code="demographic"
                                    id={dataId}
                                    dialogOpenClose={logdialogstate}
                                    onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                                />
                                <Grid container direction="row">
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                        <FooterBtn className={classes.footerBtn}>
                                            <FormBtn id={"save"} size="medium" disabled={isSaveCall || !props.isEditable} onClick={SaveDemographic}>Save</FormBtn>
                                            {dataId != 0 ?
                                                <FormBtn id={"delete"}
                                                    onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete this patient?", "confirm")}
                                                    size="medium" disabled={!props.isEditable}>Delete</FormBtn>
                                                : null
                                            }
                                            <FormBtn id={"resetBtn"} size="medium" onClick={cleanValuesFields}>Reset </FormBtn>
                                            {dataId != 0 ?
                                                <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                                : null
                                            }
                                        </FooterBtn>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>}
            </ShadowBoxMin>


        </>
    );
}
export default withSnackbar(DemographicsDetails)
