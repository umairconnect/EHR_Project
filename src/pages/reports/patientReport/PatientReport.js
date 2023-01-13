import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Collapse,
    Tooltip,
    Icon, Dialog, Divider
} from "@material-ui/core";
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, FormGroupTitle, Label, LinkS, ShadowBox, DraggableComponent } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import AddIcon from '../../../images/icons/add-icon.png';
import Delete from "../../../images/icons/trash.png"
import { PostDataAPI } from '../../../Services/PostDataAPI';
import Demographics from '../../patients/component/demographics/Demographics';
import CloseIcon from "../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { Add as AddDeleteIcon } from '@material-ui/icons';
import { formatDate, formatDateTime } from '../../../components/Common/Extensions';
import { IsEditable } from '../../../Services/GetUserRolesRights';

import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
}
    from '@material-ui/icons';
// styles
import useStyles from "./styles";
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import '../../../components/SearchGrid/style.css';

import { withSnackbar } from '../../../components/Message/Alert';
import { InputBaseField, SelectField } from '../../../components/InputField/InputField';
import SearchList from "../../../components/SearchList/SearchList";

function PatientReports({ showMessage, ...props }) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        appointmentFrom: addDays(new Date(), -30).toString(), appointmentTo: addDays(new Date(), 0).toString(), ageFrom: '', ageTo: '', genderCode: '', raceCode: '', ethnicityCode: '',
        langCode: '', demRecordedFrom: '', demRecordedTo: '', prefferedComs: '', prefferedComsFromUpdated: '', prefferedComsToUpdated: '',
        smokingStatus: '', patientStatusCode: "", patientStatusName: '', dynamicParams: '', medicationFromDate: '',
        medicationFromTo: '',
        diagnosisFromDate: '',
        diagnosisFromTo: '',
        allergyFromDate: '',
        allergyFromTo: '',
        labResultRecordedFromDate: '',
        labResultRecordedFromTo: '',
        labResultPerformedFromDate: '',
        labResultPerformedToDate: '',
    });
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const [raceCodes, setRaceCodes] = useState([]);
    const [ethnicityCodes, setEthnicityCodes] = useState([]);
    const [preferredLanguage, setPreferredLanguage] = useState([]);
    const [tobaccoStatusCode, setTobaccoStatusCode] = useState([]);
    const [patientStatusCodes, setPatientStatusCodes] = useState([]);

    const [reRender, setReRender] = useState(0);

    const [activeMedication, setActiveMedication] = useState([]);
    const [activeDiagnosis, setActiveDiagnosis] = useState([]);
    const [activeAllergy, setActiveAllergy] = useState([]);
    const [activeLabResult, setActiveLabResult] = useState([]);

    const deleteActiveMedication = (code) => {
        let updatedList = activeMedication.map((item, i) => item.medicationId == code ? { ...item, isDeleted: true } : item);
        setActiveMedication(updatedList);
    }

    const deleteDiagnosisItem = (code) => {
        let updatedList = activeDiagnosis.map((item, i) => item.icdCode == code ? { ...item, isDeleted: true } : item);
        setActiveDiagnosis(updatedList);
    }

    const deleteActiveAllergy = (code) => {
        let updatedList = activeAllergy.map((item, i) => item.rxnorm == code ? { ...item, isDeleted: true } : item);
        setActiveAllergy(updatedList);
    }

    const deleteaAtiveLabResult = (code) => {
        let updatedList = activeLabResult.map((item, i) => item.labTestId == code ? { ...item, isDeleted: true } : item);
        setActiveLabResult(updatedList);
    }

    const handleSearchActiveMedication = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (activeMedication.filter(r => r.isDeleted == false).some(t => t.medicationId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    medicationId: '',
                    medicationName: '',
                }));
            }, 100);
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }

            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
        }));
        const obj = { medicationId: id, medicationName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveMedication([...activeMedication, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                medicationId: '',
                medicationName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }

    const handleSearchActiveDiagnosisChange = (name, item, isNegative) => {

        const { id, value } = item;

        if (value === '') {
            return;
        }

        if (activeDiagnosis.filter(r => r.isDeleted == false).some(t => t.icdCode == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    icdCode: '',
                    icdName: '',
                }));
            }, 100);
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
        }));
        const obj = { icdCode: id, icdName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveDiagnosis([...activeDiagnosis, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                icdCode: '',
                icdName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }

    const handleSearchActiveAllergy = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (activeAllergy.filter(r => r.isDeleted == false).some(t => t.rxnorm == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    rxnorm: '',
                    allergyName: '',
                }));
            }, 100);
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
        }));
        const obj = { rxnorm: id, allergyName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveAllergy([...activeAllergy, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                rxnorm: '',
                allergyName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }

    const handleSearchActiveLabResult = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }

        if (activeLabResult.filter(r => r.isDeleted == false).some(t => t.labTestId == id)) {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    labTestId: '',
                    labTestName: '',
                }));
            }, 100);
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
        }));
        const obj = { labTestId: id, labTestName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveLabResult([...activeLabResult, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                labTestId: '',
                labTestName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }


    const [patientId, setPatientId] = React.useState();
    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const socialHistoryRef = useState({ tobaccoStatusRef: "", });

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
    ]
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [showSearchFilter, setshowSearchFilter] = useState(false);
    //

    //
    const handleChange = (e) => {
        const { name, value, label } = e.target;
        if (name == 'patientStatusCode') {
            console.log(patientStatusCodes)
            var selectedItem = patientStatusCodes.filter(item => item.value == value)
            setState(prevState => ({
                ...prevState,
                [name]: value,
                patientStatusName: selectedItem ? selectedItem[0].label : ''
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }

    function initialization() {
        var params = {
            code: "DDL_List_Item",
            parameters: ['suffix_code',
                'race_code',
                'ethnicity_code',
                'patient_status_code',
                'preferred_language',
                'tobacco_status_code',
                'gender_identity_code',
                'sexual_orientation_code',
                'epstd_service_code',
                'epstd_ref_cond_code',
                'payment_profile_code',
                'demographics_veteran_code',
                'County_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _tobaccoStatusCode = [];
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
                    if (item.text3 == 'tobacco_status_code')
                        _tobaccoStatusCode.push({ value: item.text1, label: item.text2 });


                });
                setRaceCodes(_raceCodes);
                setEthnicityCodes(_ethnicityCodes);
                setPreferredLanguage(_preferredLanguage);
                setTobaccoStatusCode(_tobaccoStatusCode);
                setPatientStatusCodes(_patientStatusCodes);
            }
        })
    }

    function exportReport() {
        var medFilter = getMedicationFilter();
        var problemFilter = getDiagnosisFilter();
        var allergyFilter = getAllergyFilter();
        var labTestFilter = getLabTestFilter();
        var dynFilter = '<ROOT>' + medFilter + problemFilter + allergyFilter + labTestFilter + '</ROOT>||'

        var medicationFilters = '';
        var prescribedFromDate = state.medicationFromDate == '' ? 'All' : formatDate(state.medicationFromDate);
        var prescribedFromTo = state.medicationFromTo == '' ? 'All' : formatDate(state.medicationFromTo);
        medicationFilters = "From Date: " + prescribedFromDate + ", To Date: " + prescribedFromTo + ", Medications: " + getSelectedMedications();

        var diagnosisFilters = '';
        var diagnosisFromDate = state.diagnosisFromDate == '' ? 'All' : formatDate(state.diagnosisFromDate);
        var diagnosisFromTo = state.diagnosisFromTo == '' ? 'All' : formatDate(state.diagnosisFromTo);
        diagnosisFilters = "From Date: " + diagnosisFromDate + ", To Date: " + diagnosisFromTo + ", Diagnosis: " + getSelectedDiagnosis();

        var allergyFilters = '';
        var allergyFromDate = state.allergyFromDate == '' ? 'All' : formatDate(state.allergyFromDate);
        var allergyFromTo = state.allergyFromTo == '' ? 'All' : formatDate(state.allergyFromTo);
        allergyFilters = "From Date: " + allergyFromDate + ", To Date: " + allergyFromTo + ", Allergies: " + getSelectedAllergies();

        var labResultsFilters = '';
        var labResultRecordedFromDate = state.labResultRecordedFromDate == '' ? 'All' : formatDate(state.labResultRecordedFromDate);
        var labResultRecordedFromTo = state.labResultRecordedFromTo == '' ? 'All' : formatDate(state.labResultRecordedFromTo);
        var labResultPerformedFromDate = state.labResultPerformedFromDate == '' ? 'All' : formatDate(state.labResultPerformedFromDate);
        var labResultPerformedToDate = state.labResultPerformedToDate == '' ? 'All' : formatDate(state.labResultPerformedToDate);
        labResultsFilters = "Recorded From Date: " + labResultRecordedFromDate
            + ",Recored To Date: " + labResultRecordedFromTo
            + ",Performed From Date: " + labResultPerformedFromDate
            + ",Performed To Date: " + labResultPerformedToDate
            + ", Lab Results: " + getSelectedLabResults();
        console.log(dynFilter);
        var params = {
            reportName: "Patient Demographics Report",
            Appointment_From: state.appointmentFrom ? formatDate(state.appointmentFrom) : '',
            Appointment_To: state.appointmentTo ? formatDate(state.appointmentTo) : '',
            Age_From: state.ageFrom ? state.ageFrom : '',
            Age_To: state.ageTo ? state.ageTo : '',
            Gender_Code: state.genderCode ? state.genderCode : '',
            Race_Code: state.raceCode ? state.raceCode : '',
            Ethnicity_Code: state.ethnicityCode ? state.ethnicityCode : '',
            Lang_Code: state.langCode ? state.langCode : '',
            Dem_recorded_From: state.demRecordedFrom ? formatDate(state.demRecordedFrom) : '',
            Dem_Recorded_To: state.demRecordedTo ? formatDate(state.demRecordedTo) : '',
            Preffered_Coms: state.prefferedComs ? state.prefferedComs : '',
            Smoking_Status: state.tobaccoStatusCode ? state.tobaccoStatusCode : '',
            Patient_Status: state.patientStatusCode ? state.patientStatusCode + "||" + state.patientStatusName : '',
            Additional_Filters: dynFilter,
            Medications: medicationFilters,
            Diagnosis: diagnosisFilters,
            Allergies: allergyFilters,
            Lab_Results: labResultsFilters
        }
        if (validateFilters()) {
            setIsLoading(true);
            PostDataAPI("reports/getReports", params).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    window.location.assign("." + result.data);
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        }
    }

    function loadPatientDemographics() {
        var medFilter = getMedicationFilter();
        var problemFilter = getDiagnosisFilter();
        var allergyFilter = getAllergyFilter();
        var labTestFilter = getLabTestFilter();
        var dynFilter = '<ROOT>' + medFilter + problemFilter + allergyFilter + labTestFilter + '</ROOT>||'
        console.log(dynFilter);
        var params = {
            reportName: "Patient Demographics Report",
            Appointment_From: state.appointmentFrom ? state.appointmentFrom : '',
            Appointment_To: state.appointmentTo ? state.appointmentTo : '',
            Age_From: state.ageFrom ? state.ageFrom : '',
            Age_To: state.ageTo ? state.ageTo : '',
            Gender_Code: state.genderCode ? state.genderCode : '',
            Race_Code: state.raceCode ? state.raceCode : '',
            Ethnicity_Code: state.ethnicityCode ? state.ethnicityCode : '',
            Lang_Code: state.langCode ? state.langCode : '',
            Dem_recorded_From: state.demRecordedFrom ? state.demRecordedFrom : '',
            Dem_Recorded_To: state.demRecordedTo ? state.demRecordedTo : '',
            Preffered_Coms: state.prefferedComs ? state.prefferedComs : '',
            Smoking_Status: state.tobaccoStatusCode ? state.tobaccoStatusCode : '',
            Patient_Status: state.patientStatusCode ? state.patientStatusCode + "||" + state.patientStatusName : '',
            Additional_Filters: dynFilter
        }
        if (validateFilters()) {
            setIsLoading(true);
            PostDataAPI("reports/loadReportGrid", params).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    setRowsData(
                        result.data.map((item, i) => {
                            item.column2 = <LinkS onClick={() => handleOpenDemographics(item.column12)} style={{ textDecoration: "underline", marginLeft: "auto" }}>{item.column2}</LinkS>
                            return { ...item }
                        }));
                }
            });
        }
        
    }

    function validateFilters() {
        let isValidFilter = true;
        if (state.appointmentFrom > state.appointmentTo) {
            showMessage("Error", "Appointment From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.demRecordedFrom > state.demRecordedTo) {
            showMessage("Error", "Recorded From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.medicationFromDate > state.medicationFromTo) {
            showMessage("Error", "Medication From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.diagnosisFromDate > state.diagnosisFromTo) {
            showMessage("Error", "Diagnosis From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.allergyFromDate > state.allergyFromTo) {
            showMessage("Error", "Allergy From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.labResultRecordedFromDate > state.labResultRecordedFromTo) {
            showMessage("Error", "Lab Result Recorded From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        if (state.labResultPerformedFromDate > state.labResultPerformedToDate) {
            showMessage("Error", "Lab Result Performed From date cannot be greater than to date", "error", 3000);
            isValidFilter = false;
        }
        return isValidFilter
    }

    function getMedicationFilter() {
        console.log(activeMedication);
        var medFilter = '';
        var prescribedFromDate = state.medicationFromDate == undefined ? '' : state.medicationFromDate;
        var prescribedFromTo = state.medicationFromTo == undefined ? '' : state.medicationFromTo;
        if (activeMedication && activeMedication.length > 0) {
            activeMedication.map((item, index) => {
                if (item.medicationId && item.medicationId.length > 0 && item.isDeleted == false) {
                    medFilter += '<param>'
                    medFilter += '<id>' + item.medicationId + '</id>'
                    medFilter += '<datefrom>' + prescribedFromDate + '</datefrom>'
                    medFilter += '<dateto>' + prescribedFromTo + '</dateto>'
                    medFilter += '<performedfrom></performedfrom><performedto></performedto>'
                    medFilter += '<type>medication</type>'
                    medFilter += '</param>'
                }
            })
        }

        if (medFilter.length <= 0) {
            medFilter = '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>medication</type></param>';
        }
        return medFilter
    }

    function getDiagnosisFilter() {
        console.log(activeDiagnosis);
        var problemFilter = '';
        var diagnosisFromDate = state.diagnosisFromDate == undefined ? '' : state.diagnosisFromDate;
        var diagnosisFromTo = state.diagnosisFromTo == undefined ? '' : state.diagnosisFromTo;
        if (activeDiagnosis && activeDiagnosis.length > 0) {
            activeDiagnosis.map((item, index) => {
                if (item.icdCode && item.icdCode.length > 0 && item.isDeleted == false) {

                    problemFilter += '<param>'
                    problemFilter += '<id>' + item.icdCode + '</id>'
                    problemFilter += '<datefrom>' + diagnosisFromDate + '</datefrom>'
                    problemFilter += '<dateto>' + diagnosisFromTo + '</dateto>'
                    problemFilter += '<performedfrom></performedfrom><performedto></performedto>'
                    problemFilter += '<type>diagnosis</type>'
                    problemFilter += '</param>'
                }
            })
        }
        if (problemFilter.length <= 0) {
            problemFilter = '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>diagnosis</type></param>';
        }
        return problemFilter
    }

    function getAllergyFilter() {
        var allergyFilter = '';
        var allergyFromDate = state.allergyFromDate == undefined ? '' : state.allergyFromDate;
        var allergyFromTo = state.allergyFromTo == undefined ? '' : state.allergyFromTo;
        if (activeAllergy && activeAllergy.length > 0) {
            activeAllergy.map((item, index) => {
                if (item.rxnorm && item.rxnorm.length > 0 && item.isDeleted == false) {

                    allergyFilter += '<param>'
                    allergyFilter += '<id>' + item.rxnorm + '</id>'
                    allergyFilter += '<datefrom>' + allergyFromDate + '</datefrom>'
                    allergyFilter += '<dateto>' + allergyFromTo + '</dateto>'
                    allergyFilter += '<performedfrom></performedfrom><performedto></performedto>'
                    allergyFilter += '<type>allergy</type>'
                    allergyFilter += '</param>'
                }
            })
        }
        if (allergyFilter.length <= 0) {
            allergyFilter = '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>allergy</type></param>';
        }
        return allergyFilter
    }

    function getLabTestFilter() {

        var labTestFilter = '';
        var labResultFromDate = state.labResultRecordedFromDate == undefined ? '' : state.labResultRecordedFromDate;
        var labResultFromTo = state.labResultRecordedFromTo == undefined ? '' : state.labResultRecordedFromTo;
        var labResultPerformedFromDate = state.labResultPerformedFromDate == undefined ? '' : state.labResultPerformedFromDate;
        var labResultPerformedToDate = state.labResultPerformedToDate == undefined ? '' : state.labResultPerformedToDate;
        if (activeLabResult && activeLabResult.length > 0) {
            activeLabResult.map((item, index) => {
                if (item.labTestId && item.labTestId.length > 0 && item.isDeleted == false) {
                    labTestFilter += '<param>'
                    labTestFilter += '<id>' + item.labTestId + '</id>'
                    labTestFilter += '<datefrom>' + labResultFromDate + '</datefrom>'
                    labTestFilter += '<dateto>' + labResultFromTo + '</dateto>'
                    labTestFilter += '<performedfrom>' + labResultPerformedFromDate + '</performedfrom>'
                    labTestFilter += '<performedto>' + labResultPerformedToDate + '</performedto>'
                    labTestFilter += '<type>labresult</type>'
                    labTestFilter += '</param>'
                }
            })
        }
        if (labTestFilter.length <= 0) {
            labTestFilter = '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>labresult</type></param>';
        }
        return labTestFilter
    }

    function clearFilter() {
        state.appointmentFrom = addDays(new Date(), -30).toString();
        state.appointmentTo = addDays(new Date(), 0).toString();
        state.ageFrom = '';
        state.ageTo = '';
        state.genderCode = '';
        state.raceCode = '';
        state.langCode = '';
        state.demRecordedFrom = '';
        state.demRecordedTo = '';
        state.prefferedComs = '';
        state.tobaccoStatusCode = '';
        state.patientStatusCode = '';
        state.dynamic_params = '<ROOT><param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>medication</type></param>'
            + '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>diagnosis</type></param>'
            + '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>allergy</type></param>'
            + '<param><id></id><datefrom></datefrom><dateto></dateto><performedfrom></performedfrom><performedto></performedto><type>labresult</type></param></ROOT>';

        state.medicationId = 0;
        state.medicationName = '';
        state.icdCode = '';
        state.rxnorm = '';
        state.labTestName = '';
        state.medicationFromDate = '';
        state.medicationFromTo = '';

        state.diagnosisFromDate = '';
        state.diagnosisFromTo = '';

        state.allergyFromDate = '';
        state.allergyFromTo = '';

        state.labResultRecordedFromDate = '';
        state.labResultRecordedFromTo = '';
        state.labResultPerformedFromDate = '';
        state.labResultPerformedToDate = '';

        setActiveMedication(clearFilterLists(activeMedication));
        setActiveDiagnosis(clearFilterLists(activeDiagnosis));
        setActiveAllergy(clearFilterLists(activeAllergy));
        setActiveLabResult(clearFilterLists(activeLabResult));
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }
        loadPatientDemographics();
    }

    function getSelectedMedications() {
        var medFilter = '';
        if (activeMedication && activeMedication.length > 0) {
            const newArrayState = activeMedication.filter((item) => { return item.isDeleted == false });
            medFilter = newArrayState.map(item => item.medicationName).join(' | ');
        }
        if (medFilter.length <= 0) {
            medFilter = 'All';
        }
        return medFilter
    }

    function getSelectedDiagnosis() {
        var medFilter = '';
        if (activeDiagnosis && activeDiagnosis.length > 0) {
            const newArrayState = activeDiagnosis.filter((item) => { return item.isDeleted == false });
            medFilter = newArrayState.map(item => item.icdName).join(' | ');
        }

        if (medFilter.length <= 0) {
            medFilter = 'All';
        }
        return medFilter
    }

    function getSelectedAllergies() {
        var medFilter = '';
        if (activeAllergy && activeAllergy.length > 0) {
            const newArrayState = activeAllergy.filter((item) => { return item.isDeleted == false });
            medFilter = newArrayState.map(item => item.icdName).join(' | ');
        }

        if (medFilter.length <= 0) {
            medFilter = 'All';
        }
        return medFilter
    }


    function getSelectedLabResults() {
        var medFilter = '';
        if (activeLabResult && activeLabResult.length > 0) {
            const newArrayState = activeLabResult.filter((item) => { return item.isDeleted == false });
            medFilter = newArrayState.map(item => item.icdName).join(' | ');
        }

        if (medFilter.length <= 0) {
            medFilter = 'All';
        }
        return medFilter
    }

    const clearFilterLists = (_list) =>
    {
        let updatedList = _list.map(obj => {
            obj.isDeleted = true
            return obj;
        });
        return updatedList;
    }


    useEffect(() => {
        initialization();
        loadPatientDemographics();
    }, [])
    return (
        <>
            <PageTitle title="Patient Report" />
            <div style={{ margin: "0px 20px" }}>
                {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}
                <div className={classes.searchArea}>



                    <Grid container className={classes.customGrid} >
                        <Label title="Appointment" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="appointmentFrom"
                                        name="appointmentFrom"
                                        value={state.appointmentFrom}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <Label title="To" size={12} />
                                </Grid>
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="appointmentTo"
                                        name="appointmentTo"
                                        value={state.appointmentTo}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* </Grid> */}
                        {/* 
                        <Grid container className={classes.customGrid} > */}
                        <Label title="Age" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    {/* <Grid item xs={12} sm={3} md={3} lg={3}> */}
                                    <InputBaseField
                                        id="ageFrom"
                                        name="ageFrom"
                                        maxLength="255"
                                        type="number"
                                        value={state.ageFrom}
                                        onChange={handleChange}
                                        placeholder="From"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <Label title="To" size={12} />
                                </Grid>
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <InputBaseField
                                        id="ageTo"
                                        name="ageTo"
                                        type="number"
                                        value={state.ageTo}
                                        onChange={handleChange}
                                        placeholder="To"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>

                    <Grid container className={classes.customGrid} >
                        <Label title="Gender" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField id="select"
                                name="genderCode"
                                placeholder="Select Gender"
                                value={state.genderCode}
                                onChange={handleChange}
                                options={GenderListOptions} />
                        </Grid>

                        <Label title="Race" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                placeholder="Select Race"
                                onChange={handleChange}
                                name="raceCode"
                                value={state.raceCode}
                                options={raceCodes}
                            />
                        </Grid>


                    </Grid>

                    <Grid container className={classes.customGrid} >
                        <Label title="Ethnicity" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                placeholder="Select Ethnicity"
                                onChange={handleChange}
                                name="ethnicityCode"
                                value={state.ethnicityCode}
                                options={ethnicityCodes}
                            />
                        </Grid>

                        <Label title="Preferred Language" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                placeholder="Select Preferred Language"
                                onChange={handleChange}
                                name="langCode"
                                value={state.langCode}
                                options={preferredLanguage}
                            />
                        </Grid>


                    </Grid>

                    <Grid container className={classes.customGrid} >
                        <Label title="Demographic Recorded" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="demRecordedFrom"
                                        name="demRecordedFrom"
                                        value={state.demRecordedFrom}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <Label title="To" size={12} />
                                </Grid>
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="demRecordedTo"
                                        name="demRecordedTo"
                                        value={state.demRecordedTo}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Label title="Preferred Communications" size={2} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                name="prefferedComs"
                                value={state.prefferedComs}
                                placeholder="Select Preferred Communication"
                                onChange={handleChange}
                                options={PrefferedCommunicationListOptions} />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.customGrid} >

                        <Label title="Smoking Status" size={2} />
                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <SelectField
                                id="tobaccoStatus"
                                name="tobaccoStatusCode"
                                value={state.tobaccoStatusCode}
                                placeholder="Select Smoke Status"
                                options={tobaccoStatusCode}
                                onChange={handleChange}
                                inputProps={{ ref: input => socialHistoryRef.tobaccoStatusRef = input }}
                            />
                        </Grid>
                        <Label title="Patient Status" size={2} />
                        <Grid item xs={12} md={4} sm={4} lg={3} >
                            <SelectField
                                onChange={handleChange}
                                id="patientStatusCode"
                                name="patientStatusCode"
                                placeholder="Select Patient Status"
                                value={state.patientStatusCode}
                                options={patientStatusCodes}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.customGrid} alignItems="center" alignContent="center">

                        <span className={classes.searchSpan}>

                            <FormGroupTitle>Filters</FormGroupTitle>
                            <Button
                                size="small"
                                className={classes.collapseBtn}
                                onClick={() => setshowSearchFilter(!showSearchFilter)}
                            >
                                {showSearchFilter ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                            </Button>

                        </span>
                    </Grid>

                    <Collapse collapsedSize={100} in={showSearchFilter} >
                        <Grid container>
                            <Grid item lg={12}>
                                <div className={classes.otherSection}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <span className={classes.addNew} title={"Active Medication"}>
                                                Medication
                                            </span>
                                        </Grid>
                                    </Grid>


                                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                                        <Label title="Medication" size={2} />
                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                            <SearchList
                                                name="medicationId"
                                                value={state.medicationId}
                                                searchTerm={state.medicationName}
                                                code="drugs"
                                                apiUrl="ddl/loadItems"
                                                placeholderTitle="Search Drug"
                                                onChangeValue={(name, item) => handleSearchActiveMedication(name, item)}
                                                reRender={reRender}
                                            />

                                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                                <div className={classes.orderTestContent}>
                                                    <ul className={classes.orderList}>
                                                        {activeMedication ?

                                                            activeMedication.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                                if (item.isDeleted == true) { return '' }
                                                                else {
                                                                    return (
                                                                        <>
                                                                            <li>
                                                                                {item.medicationName}
                                                                                <span className={classes.deleteIcon} onClick={() => deleteActiveMedication(item.medicationId)}> <AddDeleteIcon /> </span>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                }
                                                            }
                                                            ) : ''
                                                        }
                                                    </ul>
                                                </div>
                                            </Grid>

                                        </Grid>

                                        <Label title="Prescribed" size={2} />
                                        <Grid item xs={12} sm={5} md={5} lg={3}>
                                            <Grid container direction="row">
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="medicationFromDate"
                                                        name="medicationFromDate"
                                                        onChange={handleChange}
                                                        value={state.medicationFromDate}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                                    <Label title="To" size={12} />
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="medicationFromTo"
                                                        name="medicationFromTo"
                                                        onChange={handleChange}
                                                        value={state.medicationFromTo}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                    </Grid>


                                    {/* {
                                        activeMedicationList.map((activeMedication, i) => {
                                            return (
                                                <Grid container className={classes.customGrid} >
                                                    <Label title="Medication" size={2} />
                                                    <Grid item xs={12} sm={3} md={3} lg={3}>

                                                        <SearchList
                                                            name="medicationId"
                                                            value={state.medicationId}
                                                            searchTerm={state.medicationName}
                                                            code="drugs"
                                                            apiUrl="ddl/loadItems"
                                                            placeholderTitle="Search Drug"
                                                            onChangeValue={(name, item) => handleMedicationSearchChange(name, item, activeMedication, i)}
                                                            reRender={reRender}
                                                        />

                                                    </Grid>
                                                    <Label title="Prescribed" size={1} />
                                                    <Grid item xs={12} sm={5} md={5} lg={3}>
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="prescribedFromDate"
                                                                    name="prescribedFromDate"
                                                                    value={activeMedication.prescribedFromDate}
                                                                    onChange={(e) => handleMedicationChange(e, i, activeMedication)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                <Label title="To" size={12} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="prescribedFromTo"
                                                                    name="prescribedFromTo"
                                                                    value={activeMedication.prescribedFromTo}
                                                                    onChange={(e) => handleMedicationChange(e, i, activeMedication)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={1} md={1} lg={1}>
                                                        <Tooltip title="Delete" onClick={() => handleRemoveMedication(i)}>
                                                            <Icon> <img src={Delete} className={classes.Icon} alt="delete" /> </Icon>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    } */}
                                </div>

                                <div className={classes.otherSection}>

                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <span className={classes.addNew} title={"Active Problem"}>
                                                Problem
                                            </span>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                                        <Label title="Diagnosis" size={2} />
                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                            <SearchList
                                                name="icdCode"
                                                value={state.icdCode}
                                                searchTerm={state.icdName}
                                                code="ICD"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleSearchActiveDiagnosisChange(name, item)}
                                                placeholderTitle="Search Diagnosis"
                                                reRender={reRender}
                                            />

                                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                                <div className={classes.orderTestContent}>
                                                    <ul className={classes.orderList}>
                                                        {activeDiagnosis ?

                                                            activeDiagnosis.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                                if (item.isDeleted == true) { return '' }
                                                                else {
                                                                    return (
                                                                        <>
                                                                            <li>
                                                                                {item.icdName}
                                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosisItem(item.icdCode)}> <AddDeleteIcon /> </span>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                }
                                                            }
                                                            ) : ''
                                                        }
                                                    </ul>
                                                </div>
                                            </Grid>

                                        </Grid>

                                        <Label title="Diagnosis" size={2} />
                                        <Grid item xs={12} sm={5} md={5} lg={3}>
                                            <Grid container direction="row">
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="diagnosisFromDate"
                                                        name="diagnosisFromDate"
                                                        onChange={handleChange}
                                                        value={state.diagnosisFromDate}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                                    <Label title="To" size={12} />
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="diagnosisFromTo"
                                                        name="diagnosisFromTo"
                                                        onChange={handleChange}
                                                        value={state.diagnosisFromTo}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                    </Grid>




                                    {/* 
                                    {
                                        activeProblemList.map((activeProblem, i) => {
                                            return (
                                                <Grid container className={classes.customGrid} >
                                                    <Label title="Diagnosis" size={2} />
                                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                                        <SearchList
                                                            name="icdCode"
                                                            value={state.icdCode}
                                                            searchTerm={state.icdName}
                                                            code="ICD"
                                                            apiUrl="ddl/loadItems"
                                                            onChangeValue={(name, item) => handleProblemSearchChange(name, item, activeProblem, i)}
                                                            placeholderTitle="Search Diagnosis"
                                                            reRender={reRender}
                                                        />
                                                    </Grid>
                                                    <Label title="Diagnosis" size={1} />
                                                    <Grid item xs={12} sm={5} md={5} lg={3}>
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="diagnosisFromDate"
                                                                    name="diagnosisFromDate"
                                                                    value={activeProblem.diagnosisFromDate}
                                                                    onChange={(e) => handleProblemChange(e, i, activeProblem)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                <Label title="To" size={12} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="diagnosisFromTo"
                                                                    name="diagnosisFromTo"
                                                                    value={activeProblem.diagnosisFromTo}
                                                                    onChange={(e) => handleProblemChange(e, i, activeProblem)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={1} md={1} lg={1}>
                                                        <Tooltip title="Delete" onClick={handleRemoveProblem}>
                                                            <Icon> <img src={Delete} className={classes.Icon} alt="delete" /> </Icon>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    } */}
                                </div>

                                <div className={classes.otherSection}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <span className={classes.addNew} title={"Active Allergy"}>
                                                Allergy
                                            </span>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                                        <Label title="Allergy" size={2} />
                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                            <SearchList
                                                name="rxnorm"
                                                value={state.rxnorm}
                                                searchTerm={state.allergyName}
                                                code="get_all_allergies"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleSearchActiveAllergy(name, item)}
                                                placeholderTitle="Search Diagnosis"
                                                reRender={reRender}
                                            />

                                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                                <div className={classes.orderTestContent}>
                                                    <ul className={classes.orderList}>
                                                        {activeAllergy ?

                                                            activeAllergy.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                                if (item.isDeleted == true) { return '' }
                                                                else {
                                                                    return (
                                                                        <>
                                                                            <li>
                                                                                {item.allergyName}
                                                                                <span className={classes.deleteIcon} onClick={() => deleteActiveAllergy(item.rxnorm)}> <AddDeleteIcon /> </span>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                }
                                                            }
                                                            ) : ''
                                                        }
                                                    </ul>
                                                </div>
                                            </Grid>

                                        </Grid>

                                        <Label title="Recorded" size={2} />
                                        <Grid item xs={12} sm={5} md={5} lg={3}>
                                            <Grid container direction="row">
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="allergyFromDate"
                                                        name="allergyFromDate"
                                                        onChange={handleChange}
                                                        value={state.allergyFromDate}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                                    <Label title="To" size={12} />
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                                    <input
                                                        type="date"
                                                        id="allergyFromTo"
                                                        name="allergyFromTo"
                                                        onChange={handleChange}
                                                        value={state.allergyFromTo}
                                                        className={classes.dateInput}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                    </Grid>

                                    {/* {
                                        activeAllergyList.map((activeAllergy, i) => {
                                            return (
                                                <Grid container className={classes.customGrid} >
                                                    <Label title="Allergy" size={2} />
                                                    <Grid item xs={12} sm={3} md={3} lg={3}>

                                                        <SearchList
                                                            name="rxnorm"
                                                            value={state.rxnorm}
                                                            searchTerm={state.allergyName}
                                                            code="get_all_allergies"
                                                            apiUrl="ddl/loadItems"
                                                            onChangeValue={(name, item) => handleAllergySearchChange(name, item, activeAllergy, i)}
                                                            placeholderTitle="Search Allergy"
                                                            reRender={reRender}
                                                        />
                                                    </Grid>

                                                    <Label title="Recorded" size={1} />
                                                    <Grid item xs={12} sm={5} md={5} lg={3}>
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="allergyFromDate"
                                                                    name="allergyFromDate"
                                                                    value={activeAllergy.allergyFromDate}
                                                                    onChange={(e) => handleAllergyChange(e, i, activeAllergy)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                <Label title="To" size={12} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                                <input
                                                                    type="date"
                                                                    id="allergyFromTo"
                                                                    name="allergyFromTo"
                                                                    value={activeAllergy.allergyFromTo}
                                                                    onChange={(e) => handleAllergyChange(e, i, activeAllergy)}
                                                                    className={classes.dateInput}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={1} md={1} lg={1}>
                                                        <Tooltip title="Delete" onClick={handleRemoveAllergy}>
                                                            <Icon> <img src={Delete} className={classes.Icon} alt="delete" /> </Icon>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    } */}
                                </div>

                                <div className={classes.otherSection}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <span className={classes.addNew} title={"Lab Result"}>
                                                Lab Result
                                            </span>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" lg={12} xl={12} alignItems="flex-start">
                                        <Label title="Lab Result" size={2} />
                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                            <SearchList
                                                id="labTestId"
                                                name="labTestName"
                                                value={state.labTestName}
                                                searchTerm={state.labTestName}
                                                code="lab_tests_components"
                                                elemCode="labTestComponentId"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleSearchActiveLabResult(name, item)}
                                                placeholderTitle="Search Result"
                                                popperWidth={true}
                                                reRender={reRender}
                                            />

                                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                                <div className={classes.orderTestContent}>
                                                    <ul className={classes.orderList}>
                                                        {activeLabResult ?

                                                            activeLabResult.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                                if (item.isDeleted == true) { return '' }
                                                                else {
                                                                    return (
                                                                        <>
                                                                            <li>
                                                                                {item.labTestName}
                                                                                <span className={classes.deleteIcon} onClick={() => deleteaAtiveLabResult(item.labTestId)}> <AddDeleteIcon /> </span>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                }
                                                            }
                                                            ) : ''
                                                        }
                                                    </ul>
                                                </div>
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <Grid container direction="row">
                                                <Grid item xs={12} sm={3} md={3} lg={3} />
                                                <Label title="Recorded" size={2} />
                                                <Grid item xs={12} sm={7} md={7} lg={7}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                                            <input
                                                                type="date"
                                                                id="labResultRecordedFromDate"
                                                                name="labResultRecordedFromDate"
                                                                onChange={handleChange}
                                                                value={state.labResultRecordedFromDate}
                                                                className={classes.dateInput}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                            <Label title="To" size={12} />
                                                        </Grid>
                                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                                            <input
                                                                type="date"
                                                                id="labResultRecordedFromTo"
                                                                name="labResultRecordedFromTo"
                                                                onChange={handleChange}
                                                                value={state.labResultRecordedFromTo}
                                                                className={classes.dateInput}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row">
                                                <Grid item xs={12} sm={3} md={3} lg={3} />
                                                <Label title="Performed" size={2} />

                                                <Grid item xs={12} sm={7} md={7} lg={7}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                                            <input
                                                                type="date"
                                                                id="labResultPerformedFromDate"
                                                                name="labResultPerformedFromDate"
                                                                onChange={handleChange}
                                                                value={state.labResultPerformedFromDate}
                                                                className={classes.dateInput}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                            <Label title="To" size={12} />
                                                        </Grid>
                                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                                            <input
                                                                type="date"
                                                                id="labResultPerformedToDate"
                                                                name="labResultPerformedToDate"
                                                                onChange={handleChange}
                                                                value={state.labResultPerformedToDate}
                                                                className={classes.dateInput}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                        </Grid>


                                    </Grid>


                                </div>
                            </Grid>
                        </Grid>


                    </Collapse>

                    <Grid container className={classes.customGrid} >

                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={5} md={5} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" btnType="search" onClick={loadPatientDemographics} >Search</FormBtn>
                                <FormBtn id="reset" onClick={clearFilter}>Clear Filter</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Button className={classes.gridButton}  >Print</Button>| */}
                        <Button className={classes.gridButton} onClick={exportReport}>Export</Button>
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            dataSource={rowsData}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                            columns={gridCnfg["PatientReportsColumns"]}
                            rowClassName={(record, index) => "claimRow"}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={isLoading && LoadingIcon}
                                        description={isLoading ? "Loading..." : "No Record Found"}
                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                    />
                                )
                            }}
                        />
                    </div>

                </div>

                {/* </ShadowBox> */}
            </div >
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                maxWidth="lg">
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Demographics</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <div className={classes.content}>
                                <Demographics dataId={patientId} insuranceSelect={insuranceTabId} isEditable={isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <Divider />
            </Dialog>
        </>
    )
}

export default withSnackbar(PatientReports)