import React, { useState, useEffect, useRef } from "react";
import {
    Grid,
    FormHelperText
} from "@material-ui/core";

import useStyles from "./styles";

import { InputBaseField, RadioboxField, SelectField } from "../../../../components/InputField/InputField";
import { ShadowBox, FormBtn, LabelnotColun, Label, FooterBtn } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert';
import AddIcon from "../../../../images/icons/add-icon.png";
import { Add as AddDeleteIcon } from '@material-ui/icons';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { formatDate } from '../../../../components/Common/Extensions';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function AddCustomCDS({ backToCds, ruleId, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const inputFile = useRef(null);
    const [isEditable, setIsEditable] = useState(props.isEditable);
    const [stateFilters, setStateFilters] = useState({ condition: '>', negativeCondition: '>' });

    const [isSaving, setIsSaving] = useState(false);
    const defaultAttributes = {
        ruleId: 0, description: '', ageFrom: '', ageTo: '', ageUnit: 'Years',
        genderCode: '', raceCode: '', ethnicityCode: '', genderIdentityCode: '', sexualOrientationCode: '',
        preferredLanguage: '', temperatureFrom: '', temperatureTo: '', pulseFrom: '', pulseTo: '',
        bpSystolicFrom: '', bpSystolicTo: '', bpDiastolicFrom: '', bpDiastolicTo: '', oxygenSaturationFrom: '',
        oxygenSaturationTo: '', heightFrom: '', heightTo: '', weightFrom: '', weightTo: '',
        bmiFrom: '', bmiTo: '', bibliography: '', fundingSource: '', releaseDate: null, careInfo: '',
        visibility: '', isActive: false
    };
    const [state, setState] = useState(defaultAttributes);

    const patientDoesHaveOption = [
        { value: "Years", label: "Age Range in Years" },
        { value: "Months", label: "Age Range in Months" }
    ]

    const [activeDiagnosis, setActiveDiagnosis] = useState([]);
    const [activeDrug, setActiveDrug] = useState([]);
    const [activeAllergy, setActiveAllergy] = useState([]);
    const [labResultList, setLabResultList] = useState([]);

    const [genderIdentityList, setGenderIdentityList] = useState([]);
    const [raceList, setRaceList] = useState([]);
    const [ethniciityList, setEthniciityList] = useState([]);
    const [sexualOrientationList, setSexualOrientationList] = useState([]);
    const [preferredLanguageList, setPreferredLanguageList] = useState([]);
    const GenderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]

    const labResultConditions = [
        { value: ">", label: ">" },
        { value: ">=", label: ">=" },
        { value: "<", label: "<" },
        { value: "<=", label: "<=" },
        { value: "=", label: "=" },
    ]
    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // const re = /^[0-9\b]+$/;
                // const re = /^\d*\.?\d*$/;
                const re = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;
                        setState(prevState => ({
                            ...prevState,
                            [name]: parseFloat(value)
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
                    [name]: value//parseFloat(value)
                }));
            }
        }
        else
            e.preventDefault();
    };
    const [errorMessages, setErrorMessages] = useState({});
    const loadData = () => {
        PostDataAPI("cdsrule/get", ruleId).then((result) => {
            if (result.data.ageUnit == 'Years') {
                result.data.ageFrom_Y = result.data.ageFrom;
                result.data.ageTo_Y = result.data.ageTo;
            }
            else {
                result.data.ageFrom_M = result.data.ageFrom;
                result.data.ageTo_M = result.data.ageTo;
            }


            //result.data.bmiFrom = result.data.bmiFrom == 0 ? '' : result.data.bmiFrom;
            //result.data.bmiTo = result.data.bmiTo == 0 ? '' : result.data.bmiTo;
            //result.data.bpDiastolicFrom = result.data.bpDiastolicFrom == 0 ? '' : result.data.bpDiastolicFrom;
            //result.data.bpDiastolicTo = result.data.bpDiastolicTo == 0 ? '' : result.data.bpDiastolicTo;
            //result.data.bpSystolicFrom = result.data.bpSystolicFrom == 0 ? '' : result.data.bpSystolicFrom;
            //result.data.bpSystolicTo = result.data.bpSystolicTo == 0 ? '' : result.data.bpSystolicTo;
            //result.data.heightFrom = result.data.heightFrom == 0 ? '' : result.data.heightFrom;
            //result.data.heightTo = result.data.heightTo == 0 ? '' : result.data.heightTo;
            //result.data.oxygenSaturationFrom = result.data.oxygenSaturationFrom == 0 ? '' : result.data.oxygenSaturationFrom;
            //result.data.oxygenSaturationTo = result.data.oxygenSaturationTo == 0 ? '' : result.data.oxygenSaturationTo;
            //result.data.pulseFrom = result.data.pulseFrom == 0 ? '' : result.data.pulseFrom;
            //result.data.pulseTo = result.data.pulseTo == 0 ? '' : result.data.pulseTo;
            //result.data.temperatureFrom = result.data.temperatureFrom == 0 ? '' : result.data.temperatureFrom;
            //result.data.temperatureTo = result.data.temperatureTo == 0 ? '' : result.data.temperatureTo;
            //result.data.weightFrom = result.data.weightFrom == 0 ? '' : result.data.weightFrom;
            //result.data.weightTo = result.data.weightTo == 0 ? '' : result.data.weightTo;
            result.data.releaseDate = result.data.releaseDate ? result.data.releaseDate.split("T")[0] : null;
            setState(result.data);
            setActiveDiagnosis(result.data.lstDiagnosis);
            setActiveDrug(result.data.lstActiveDrugs);
            setActiveAllergy(result.data.lstActiveAllergies);
            setLabResultList(result.data.lstLabResults);
        });

    }

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(ruleId),
            area: "CDS Rules setup",
            activity: "Load CDS Rules details",
            details: "User viewed CDS Rules screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        getDDLData();
        if (ruleId > 0) {
            loadData();
            saveAuditLogInfo();
        }

    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name == 'ageUnit') {
            setState(prevState => ({
                ...prevState,
                ['ageFrom_Y']: '',
                ['ageTo_Y']: '',
                ['ageFrom_M']: '',
                ['ageTo_M']: ''
            }));
        }
    }
    const getDDLData = () => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['gender_identity_code', 'race_code', 'ethnicity_code', 'sexual_orientation_code', 'preferred_language', '', '', '']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _genderIdentityList = [];
                var _raceList = [];
                var _ethniciityList = [];
                var _sexualOrientationList = [];
                var _preferredLanguageList = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'gender_identity_code':
                            _genderIdentityList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'race_code':
                            _raceList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'ethnicity_code':
                            _ethniciityList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'sexual_orientation_code':
                            _sexualOrientationList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'preferred_language':
                            _preferredLanguageList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });
                setGenderIdentityList(_genderIdentityList);
                setRaceList(_raceList);
                setEthniciityList(_ethniciityList);
                setSexualOrientationList(_sexualOrientationList);
                setPreferredLanguageList(_preferredLanguageList);
            }
        });
    }

    const handleSearchActiveDiagnosisChange = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (activeDiagnosis.filter(r => r.isDeleted == false).some(t => t.diagnosisCode == id)) {
            setStateFilters(prevState => ({
                ...prevState,
                [name]: id,
                [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
            }));
            setTimeout(function () {
                setStateFilters(prevState => ({
                    ...prevState,
                    activeDiagnosis: '',
                    activeDiagnosisName: '',
                    negativeDiagnosis: '',
                    negativeDiagnosisName: ''
                }));
            }, 100);
            showMessage("Error", 'Record already selected', "error", 3000);


            return;
        }

        setStateFilters(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDiagnosisName' : 'activeDiagnosisName']: value
        }));
        const obj = { diagnosisCode: id, diagnosisName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveDiagnosis([...activeDiagnosis, obj])
        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                activeDiagnosis: '',
                activeDiagnosisName: '',
                negativeDiagnosis: '',
                negativeDiagnosisName: ''
            }));
        }, 100);

        setErrorMessages(prevState => ({
            ...prevState,
            errorPatientAttributes: false
        }));

    }

    const handleSearchActiveDrugChange = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (activeDrug.filter(r => r.isDeleted == false).some(t => t.drugCode == id)) {
            setStateFilters(prevState => ({
                ...prevState,
                [name]: id,
                [isNegative == true ? 'negativeDrugName' : 'drugName']: value
            }));

            showMessage("Error", 'Record already selected', "error", 3000);
            setTimeout(function () {
                setStateFilters(prevState => ({
                    ...prevState,
                    drugCode: '',
                    drugName: '',
                    negativeDrugCode: '',
                    negativeDrugName: ''
                }));
            }, 100);
            return;
        }
        setStateFilters(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeDrugName' : 'drugName']: value
        }));
        const obj = { drugCode: id, drugName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveDrug([...activeDrug, obj]);

        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                drugCode: '',
                drugName: '',
                negativeDrugCode: '',
                negativeDrugName: ''
            }));
        }, 100);
        setErrorMessages(prevState => ({
            ...prevState,
            errorPatientAttributes: false
        }));


    }

    const handleSearchActiveAllergyChange = (name, item, isNegative) => {

        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (activeAllergy.filter(r => r.isDeleted == false).some(t => t.allergyCode == id)) {
            setStateFilters(prevState => ({
                ...prevState,
                [name]: id,
                [isNegative == true ? 'negativeAllergyName' : 'allergyName']: value
            }));
            showMessage("Error", 'Record already selected', "error", 3000);
            setTimeout(function () {
                setStateFilters(prevState => ({
                    ...prevState,
                    allergyCode: '',
                    allergyName: '',
                    negativeAllergyCode: '',
                    negativeAllergyName: ''
                }));
            }, 100);
            return;
        }
        setStateFilters(prevState => ({
            ...prevState,
            [name]: id,
            [isNegative == true ? 'negativeAllergyName' : 'allergyName']: value
        }));
        const obj = { allergyCode: id, allergyName: value, isDeleted: false, patientDoesNotHave: (isNegative == true) }
        setActiveAllergy([...activeAllergy, obj]);

        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                allergyCode: '',
                allergyName: '',
                negativeAllergyCode: '',
                negativeAllergyName: ''
            }));
        }, 100);
        setErrorMessages(prevState => ({
            ...prevState,
            errorPatientAttributes: false
        }));


    }
    const handleSearchLabResultChange = (name, item, isNegative) => {

        const { id, value } = item;

        setStateFilters(prevState => ({
            ...prevState,
            [name]: parseInt(id),
            [isNegative == true ? 'negativeLabResultName' : 'labResultName']: value
        }));

    }
    const handleLabResultValueChange = (e) => {
        const { name, value } = e.target;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: value,
        }));

    }
    const handleAddLabResult = (isNegative) => {
        if (isNegative == true && (!stateFilters.negativeLabTestComponentId || !stateFilters.negativeCondition || !stateFilters.negativeResultValue)) {
            showMessage("Error", 'Please fill lab test criteria', "error", 3000);
            return;
        }
        else if (!isNegative && (!stateFilters.labTestComponentId || !stateFilters.condition || !stateFilters.resultValue)) {
            showMessage("Error", 'Please fill lab test criteria', "error", 3000);
            return;
        }
        if (labResultList.filter(r => r.isDeleted == false).some(t =>
            (t.labTestId == stateFilters.negativeLabTestComponentId &&
                t.condition == stateFilters.negativeCondition && t.resultValue == stateFilters.negativeResultValue) ||
            (t.labTestId == stateFilters.labTestComponentId &&
                t.condition == stateFilters.condition && t.resultValue == stateFilters.resultValue))) {
            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        //const { id, value } = item;
        if (isNegative == true) {
            let obj = { labTestId: stateFilters.negativeLabTestComponentId, condition: stateFilters.negativeCondition, resultValue: stateFilters.negativeResultValue, isDeleted: false, patientDoesNotHave: true, labResultName: stateFilters.negativeLabResultName }
            setLabResultList([...labResultList, obj]);

        }
        else {
            let obj = { labTestId: stateFilters.labTestComponentId, condition: stateFilters.condition, resultValue: stateFilters.resultValue, isDeleted: false, patientDoesNotHave: false, labResultName: stateFilters.labResultName }
            setLabResultList([...labResultList, obj]);

        }
        setErrorMessages(prevState => ({
            ...prevState,
            errorPatientAttributes: false
        }));
        setStateFilters(prevState => ({
            ...prevState,
            ['labTestComponentId']: '',
            ['labResultName']: '',
            ['condition']: '>',
            ['resultValue']: '',
            ['negativeLabTestComponentId']: '',
            ['negativeLabResultName']: '',
            ['negativeCondition']: '>',
            ['negativeResultValue']: ''
        }));

    }

    const deleteDiagnosisItem = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = activeDiagnosis.map((item, i) => item.diagnosisCode == code ? { ...item, isDeleted: true } : item);
            setActiveDiagnosis(updatedList);
        });

    }
    const deleteDrugItem = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = activeDrug.map((item, i) => item.drugCode == code ? { ...item, isDeleted: true } : item);
            setActiveDrug(updatedList);
        });

    }
    const deleteAllergyItem = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = activeAllergy.map((item, i) => item.allergyCode == code ? { ...item, isDeleted: true } : item);
            setActiveAllergy(updatedList);
        });

    }
    const deleteLabResult = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = labResultList.map((item, i) => item.labTestId == code ? { ...item, isDeleted: true } : item);
            setLabResultList(updatedList);
        });

    }
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
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

    const validateSave = (errorList) => {
        if (!state.description || state.description.trim() == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDescription: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDescription: false
            }));
        }

        if (state.temperatureFrom > state.temperatureTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTemperature: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTemperature: false
            }));
        }

        if (state.pulseFrom > state.pulseTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPulse: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPulse: false
            }));
        }

        if (state.bpSystolicFrom > state.bpSystolicTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBpSystolic: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBpSystolic: false
            }));
        }

        if (state.bpDiastolicFrom > state.bpDiastolicTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBpDiastolic: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBpDiastolic: false
            }));
        }

        if (state.oxygenSaturationFrom > state.oxygenSaturationTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOxygenSaturation: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOxygenSaturation: false
            }));
        }

        if (state.heightFrom > state.heightTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHeight: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHeight: false
            }));
        }

        if (state.weightFrom > state.weightTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorWeight: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorWeight: false
            }));
        }

        if (state.bmiFrom > state.bmiTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBMI: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBMI: false
            }));
        }

    }
    const inValidVitalsSection = () => {

        if ((!state.ageFrom > 0 && !state.ageTo > 0) && (!state.genderCode || state.genderCode == '') &&
            (!state.raceCode || state.raceCode == '') && (!state.ethnicityCode || state.ethnicityCode == '') &&
            (!state.genderIdentityCode || state.genderIdentityCode == '') && (!state.sexualOrientationCode || state.sexualOrientationCode == '') &&
            (!state.preferredLanguage || state.preferredLanguage == '') && (!state.temperatureFrom > 0 && !state.temperatureTo > 0) &&
            (!state.pulseFrom > 0 && !state.pulseTo > 0) && (!state.bpSystolicFrom > 0 && !state.bpSystolicTo > 0) &&
            (!state.bpDiastolicFrom > 0 && !state.bpDiastolicTo > 0) && (!state.oxygenSaturationFrom > 0 && !state.oxygenSaturationTo > 0) &&
            (!state.heightFrom > 0 && !state.heightTo > 0) && (!state.weightFrom > 0 && !state.weightTo > 0) &&
            (!state.bmiFrom > 0 && !state.bmiTo > 0)) {
            return true;

        }
        else {
            return false;
        }
    }
    const inValidPatientHasSection = () => {
        if (activeDiagnosis.filter(t => !t.isDeleted && t.patientDoesNotHave == false).length == 0 &&
            activeDrug.filter(t => !t.isDeleted && t.patientDoesNotHave == false).length == 0 &&
            activeAllergy.filter(t => !t.isDeleted && t.patientDoesNotHave == false).length == 0 &&
            labResultList.filter(t => !t.isDeleted && t.patientDoesNotHave == false).length == 0) {
            return true;

        }
        else {
            return false;
        }

    }
    const inValidPatientHasNotSection = () => {

        //[Patient does not have] section must have atleast one value
        if (activeDiagnosis.filter(t => !t.isDeleted && t.patientDoesNotHave == true).length == 0 &&
            activeDrug.filter(t => !t.isDeleted && t.patientDoesNotHave == true).length == 0 &&
            activeAllergy.filter(t => !t.isDeleted && t.patientDoesNotHave == true).length == 0 &&
            labResultList.filter(t => !t.isDeleted && t.patientDoesNotHave == true).length == 0) {
            return true;

        }
        else {
            return false;
        }
    }
    const save = () => {
        if (state.ageUnit == 'Years') {
            state.ageFrom = state.ageFrom_Y;
            state.ageTo = state.ageTo_Y;
        }
        else {
            state.ageFrom = state.ageFrom_M;
            state.ageTo = state.ageTo_M;
        }

        let errorList = [];

        validateSave(errorList);
        if (errorList.length < 1) {
            if (inValidVitalsSection() && inValidPatientHasSection() && inValidPatientHasNotSection()) {
                showMessage("Error", "Please enter at least one value in vitals, patient have or patient doesn't have sections.", "error", 3000);
                return;
            }
            state.ageFrom = state.ageFrom === '' ? null : state.ageFrom;
            state.ageTo = state.ageTo === '' ? null : state.ageTo;
            state.bmiFrom = state.bmiFrom === '' ? null : state.bmiFrom;
            state.bmiTo = state.bmiTo === '' ? null : state.bmiTo;
            state.bpDiastolicFrom = state.bpDiastolicFrom === '' ? null : state.bpDiastolicFrom;
            state.bpDiastolicTo = state.bpDiastolicTo === '' ? null : state.bpDiastolicTo;
            state.bpSystolicFrom = state.bpSystolicFrom === '' ? null : state.bpSystolicFrom;
            state.bpSystolicTo = state.bpSystolicTo === '' ? null : state.bpSystolicTo;
            state.heightFrom = state.heightFrom === '' ? null : state.heightFrom;
            state.heightTo = state.heightTo === '' ? null : state.heightTo;
            state.oxygenSaturationFrom = state.oxygenSaturationFrom === '' ? null : state.oxygenSaturationFrom;
            state.oxygenSaturationTo = state.oxygenSaturationTo === '' ? null : state.oxygenSaturationTo;
            state.pulseFrom = state.pulseFrom === '' ? null : state.pulseFrom;
            state.pulseTo = state.pulseTo === '' ? null : state.pulseTo;
            state.temperatureFrom = state.temperatureFrom === '' ? null : state.temperatureFrom;
            state.temperatureTo = state.temperatureTo === '' ? null : state.temperatureTo;
            state.weightFrom = state.weightFrom === '' ? null : state.weightFrom;
            state.weightTo = state.weightTo === '' ? null : state.weightTo;

            state.lstActiveAllergies = activeAllergy;
            state.lstActiveDrugs = activeDrug;
            state.lstDiagnosis = activeDiagnosis;
            state.lstLabResults = labResultList;

            PostDataAPI("cdsrule/add", state, true).then((result) => {
                if (result.success == true) {
                    if (result.success /*&& result.data != null*/) {
                        showMessage("Success", "CDS Rule saved successfully.", "success", 2000);
                        setTimeout(function () { backToCds(true) }, 2000);

                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }

            });
        }
    }

    return (
        <Grid lg={12} direction="row">
            <div className={classes.box}>

                <div className={classes.content}>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <Label title="Rule Description" size={2} mandatory={true} />
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <InputBaseField
                                id="description"
                                name="description"
                                value={state.description}
                                onChange={handleChange}
                                MaxLength="2000"
                            />
                            {errorMessages.errorDescription && (!state.description || state.description.trim() == '') ? (<FormHelperText style={{ color: "red" }} >
                                Please enter rule description
                            </FormHelperText>) : ('')}
                        </Grid>
                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <Label title="Bibliography" size={2} />
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <InputBaseField
                                id="bibliography"
                                name="bibliography"
                                value={state.bibliography}
                                onChange={handleChange}
                                MaxLength={255}
                            />

                        </Grid>
                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <Label title="Funding Source" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <InputBaseField
                                id="fundingSource"
                                name="fundingSource"
                                value={state.fundingSource}
                                onChange={handleChange}
                                MaxLength={255}
                            />

                        </Grid>

                        <Label title="Release Date" size={2} />

                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                            <InputBaseField
                                type="date"
                                id="releaseDate"
                                name="releaseDate"
                                value={state.releaseDate}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>


                    <hr style={{ opacity: "0.5" }} />

                    <Grid container item direction="row" lg={12} xl={12}>
                        <LabelnotColun size={2} />
                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} className={classes.patientRadiobtn}>
                            <RadioboxField
                                id="select"
                                name="ageUnit"
                                value={state.ageUnit}
                                labelPlacement="end"
                                onChange={handleChange}
                                options={patientDoesHaveOption}
                            />

                        </Grid>
                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <LabelnotColun size={2} />
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Grid container direction="row" lg={12}>
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputBaseField
                                        id="ageFrom_Y"
                                        name="ageFrom_Y"
                                        value={state.ageFrom_Y}
                                        type="number"
                                        onChange={(e) => { handleNumberChange(e, 2) }}
                                        restrictNegative={true}
                                        IsDisabled={state.ageUnit == 'Months'}
                                    />
                                </Grid>

                                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                </Grid>

                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputBaseField
                                        id="ageTo_Y"
                                        name="ageTo_Y"
                                        value={state.ageTo_Y}
                                        onChange={(e) => { handleNumberChange(e, 3) }}
                                        restrictNegative={true}
                                        IsDisabled={state.ageUnit == 'Months'}
                                    />
                                </Grid>

                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <h4 style={{ textAlign: "center", padding: "8px" }}> Years old</h4>
                                </Grid>

                            </Grid>

                        </Grid>



                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Grid container direction="row" lg={12}>
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputBaseField
                                        id="ageFrom_M"
                                        name="ageFrom_M"
                                        value={state.ageFrom_M}
                                        onChange={(e) => { handleNumberChange(e, 2) }}
                                        restrictNegative={true}
                                        IsDisabled={state.ageUnit == 'Years'}
                                    />
                                </Grid>

                                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                </Grid>

                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputBaseField
                                        id="ageTo_M"
                                        name="ageTo_M"
                                        value={state.ageTo_M}
                                        onChange={(e) => { handleNumberChange(e, 3) }}
                                        restrictNegative={true}
                                        IsDisabled={state.ageUnit == 'Years'}
                                    />
                                </Grid>

                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <h4 style={{ textAlign: "center", padding: "8px" }}> Months old</h4>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <br></br>

                    <Grid container row direction="row" lg={12} xl={12}>
                        <Grid item lg={10} xl={10}>
                            <Grid container row direction="row" lg={12} xl={12}>
                                <Label title="Gender" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="genderCode"
                                        name="genderCode"
                                        value={state.genderCode}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={GenderOptions}

                                    />

                                </Grid>

                                <Label title="Race" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="raceCode"
                                        name="raceCode"
                                        value={state.raceCode}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={raceList}

                                    />

                                </Grid>

                                <Label title="Ethnicity" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="ethnicityCode"
                                        name="ethnicityCode"
                                        value={state.ethnicityCode}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={ethniciityList}

                                    />

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={2} xl={2} />

                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <Grid item lg={10} xl={10}>
                            <Grid container row direction="row" lg={12} xl={12}>
                                <Label title="Gender Identity" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="genderIdentityCode"
                                        name="genderIdentityCode"
                                        value={state.genderIdentityCode}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={genderIdentityList}

                                    />

                                </Grid>

                                <Label title="Sexual Orientation" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="sexualOrientationCode"
                                        name="sexualOrientationCode"
                                        value={state.sexualOrientationCode}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={sexualOrientationList}

                                    />

                                </Grid>

                                <Label title="Preferred Language" size={2} />
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                    <SelectField
                                        id="preferredLanguage"
                                        name="preferredLanguage"
                                        value={state.preferredLanguage}
                                        placeholder="Select"
                                        onChange={handleChange}
                                        options={preferredLanguageList}

                                    />

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={2} xl={2} />

                    </Grid>

                    <br></br>
                    <div className={classes.borderContainer}>
                        <Grid container item direction="row" lg={12} xl={12}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container direction="row" lg={12}>
                                    <h4>Temperature</h4>
                                </Grid>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="temperatureFrom"
                                            name="temperatureFrom"
                                            value={state.temperatureFrom}
                                            type="number"
                                            onChange={(e) => { handleNumberChange(e, 5) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="temperatureTo"
                                            name="temperatureTo"
                                            type="number"
                                            value={state.temperatureTo}
                                            onChange={(e) => { handleNumberChange(e, 5) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> f</h4>
                                    </Grid>
                                    {errorMessages.errorTemperature && (state.temperatureFrom > state.temperatureTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent Temperature from and to
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>

                                <Grid container direction="row" lg={12}>
                                    <h4>Pulse</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="pulseFrom"
                                            name="pulseFrom"
                                            value={state.pulseFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="pulseTo"
                                            name="pulseTo"
                                            value={state.pulseTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> bpm</h4>
                                    </Grid>
                                    {errorMessages.errorPulse && (state.pulseFrom > state.pulseTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent Pulse from and to
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container direction="row" lg={12}>
                                    <h4>Blood Pressure - Systolic</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bpSystolicFrom"
                                            name="bpSystolicFrom"
                                            value={state.bpSystolicFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bpSystolicTo"
                                            name="bpSystolicTo"
                                            value={state.bpSystolicTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> </h4>
                                    </Grid>
                                    {errorMessages.errorBpSystolic && (state.bpSystolicFrom > state.bpSystolicTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent BP - Systolic from and to
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>

                                <Grid container direction="row" lg={12}>
                                    <h4>Blood Pressure - Diastolic</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bpDiastolicFrom"
                                            name="bpDiastolicFrom"
                                            value={state.bpDiastolicFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bpDiastolicTo"
                                            name="bpDiastolicTo"
                                            value={state.bpDiastolicTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 ></h4>
                                    </Grid>
                                    {errorMessages.errorBpDiastolic && (state.bpDiastolicFrom > state.bpDiastolicTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent BP - Diastolic from and to
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container item direction="row" lg={12} xl={12}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container direction="row" lg={12}>
                                    <h4>Oxygen Saturation</h4>
                                </Grid>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="oxygenSaturationFrom"
                                            name="oxygenSaturationFrom"
                                            value={state.oxygenSaturationFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="oxygenSaturationTo"
                                            name="oxygenSaturationTo"
                                            value={state.oxygenSaturationTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> %</h4>
                                    </Grid>
                                    {errorMessages.errorOxygenSaturation && (state.oxygenSaturationFrom > state.oxygenSaturationTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent Oxygen Saturation from and to
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>

                                <Grid container direction="row" lg={12}>
                                    <h4>Height</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="heightFrom"
                                            name="heightFrom"
                                            value={state.heightFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="heightTo"
                                            name="heightTo"
                                            value={state.heightTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> on</h4>
                                    </Grid>
                                    {errorMessages.errorHeight && (state.heightFrom > state.heightTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent Height from and to
                                    </FormHelperText>) : ('')}
                                </Grid>

                            </Grid>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container direction="row" lg={12}>
                                    <h4>Weight</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="weightFrom"
                                            name="weightFrom"
                                            value={state.weightFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="weightTo"
                                            name="weightTo"
                                            value={state.weightTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> lbs</h4>
                                    </Grid>
                                    {errorMessages.errorWeight && (state.weightFrom > state.weightTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent Weight from and to
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>

                                <Grid container direction="row" lg={12}>
                                    <h4>BMI</h4>
                                </Grid>

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bmiFrom"
                                            name="bmiFrom"
                                            value={state.bmiFrom}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}> - </h3>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <InputBaseField
                                            id="bmiTo"
                                            name="bmiTo"
                                            value={state.bmiTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <h4 style={{ padding: "8px" }}> in</h4>
                                    </Grid>
                                    {errorMessages.errorBMI && (state.bmiFrom > state.bmiTo) ? (<FormHelperText style={{ color: "red" }} >
                                        Inconsistent BMI from and to
                                    </FormHelperText>) : ('')}

                                </Grid>

                            </Grid>

                        </Grid>
                    </div>

                    <br></br>

                    <Grid container item direction="row" lg={12} xl={12}>
                        <Label className={classes.DoesHaveTitle} title="Patient does have" size={2} />
                    </Grid>
                    <hr style={{ opacity: "0.5" }} />

                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Active Diagnosis (ICD-10)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="activeDiagnosis"
                                name="activeDiagnosis"
                                value={stateFilters.activeDiagnosis}
                                searchTerm={stateFilters.activeDiagnosisName}
                                code="ICD"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveDiagnosisChange(name, item)}
                                placeholderTitle="Active Diagnosis (ICD-10)"
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
                                                                {item.diagnosisName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosisItem(item.diagnosisCode)}> <AddDeleteIcon /> </span>
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

                    </Grid>


                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Active Drug(s)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="drugCode"
                                name="drugCode"
                                value={stateFilters.drugCode}
                                searchTerm={stateFilters.drugName}
                                code="drugs"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveDrugChange(name, item)}
                                placeholderTitle="Active Drug"
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {activeDrug ?

                                            activeDrug.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.drugName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDrugItem(item.drugCode)}> <AddDeleteIcon /> </span>
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
                    </Grid>


                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Active Allergy(s)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="allergyCode"
                                name="allergyCode"
                                value={stateFilters.allergyCode}
                                searchTerm={stateFilters.allergyName}
                                code="get_all_allergies"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveAllergyChange(name, item)}
                                placeholderTitle="Allergy"
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
                                                                <span className={classes.deleteIcon} onClick={() => deleteAllergyItem(item.allergyCode)}> <AddDeleteIcon /> </span>
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
                    </Grid>


                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Lab Result(s)" size={2} />
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.paddingRight5}>
                            <SearchList
                                id="labTestComponentId"
                                name="labTestComponentId"
                                value={stateFilters.labTestComponentId}
                                searchTerm={stateFilters.labResultName}
                                code="lab_tests_components"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchLabResultChange(name, item)}
                                placeholderTitle="Lab Result"
                            />

                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.paddingRight5}>
                            <SelectField
                                id="condition"
                                name="condition"
                                value={stateFilters.condition}
                                placeholder=">"
                                onChange={handleLabResultValueChange}
                                options={labResultConditions}
                            />

                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.paddingRight5}>
                            <InputBaseField
                                id="resultValue"
                                name="resultValue"
                                value={stateFilters.resultValue}
                                onChange={handleLabResultValueChange}
                            />

                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                            <div className={classes.actionimg}>
                                <img src={AddIcon} onClick={() => { handleAddLabResult(false) }} />

                            </div>
                        </Grid>
                        <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                            <Grid item xs={2} sm={2} lg={2} md={2} />
                            <Grid item xs={10} sm={10} lg={10} md={10}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {labResultList ?
                                            labResultList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.labResultName + ' ' + item.condition + ' ' + item.resultValue}
                                                                <span className={classes.deleteIcon} onClick={() => deleteLabResult(item.labTestId)}> <AddDeleteIcon /> </span>
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
                    </Grid>




                    <Grid container item direction="row" lg={12} xl={12}>
                        <Label className={classes.DoesHaveTitle} title="Patient does not have" size={2} />
                    </Grid>
                    <hr style={{ opacity: "0.5" }} />
                    {/*{errorMessages.errorPatientDoesNotHave ?*/}
                    {/*    (<FormHelperText style={{ color: "red" }} >*/}
                    {/*        Please provide atleast one value for this section*/}
                    {/*    </FormHelperText>) : ('')}*/}

                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Diagnosis (ICD-10)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="negativeDiagnosis"
                                name="negativeDiagnosis"
                                value={stateFilters.negativeDiagnosis}
                                searchTerm={stateFilters.negativeDiagnosisName}
                                code="ICD"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveDiagnosisChange(name, item, true)}
                                placeholderTitle="Diagnosis (ICD-10)"
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {activeDiagnosis ?

                                            activeDiagnosis.filter(t => t.patientDoesNotHave == true).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.diagnosisName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDiagnosisItem(item.diagnosisCode)}> <AddDeleteIcon /> </span>
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
                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Drug(s)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="negativeDrugCode"
                                name="negativeDrugCode"
                                value={stateFilters.negativeDrugCode}
                                searchTerm={stateFilters.negativeDrugName}
                                code="drugs"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveDrugChange(name, item, true)}
                                placeholderTitle="Drug"
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {activeDrug ?

                                            activeDrug.filter(t => t.patientDoesNotHave == true).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.drugName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteDrugItem(item.drugCode)}> <AddDeleteIcon /> </span>
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

                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Allergy(s)" size={2} />
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <SearchList
                                id="negativeAllergyCode"
                                name="negativeAllergyCode"
                                value={stateFilters.negativeAllergyCode}
                                searchTerm={stateFilters.negativeAllergyName}
                                code="get_all_allergies"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchActiveAllergyChange(name, item, true)}
                                placeholderTitle="Allergy"
                            />

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {activeAllergy ?
                                            activeAllergy.filter(t => t.patientDoesNotHave == true).map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.allergyName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteAllergyItem(item.allergyCode)}> <AddDeleteIcon /> </span>
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
                    </Grid>

                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Label title="Lab Result(s)" size={2} />
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.paddingRight5}>
                            <SearchList
                                id="negativeLabTestComponentId"
                                name="negativeLabTestComponentId"
                                value={stateFilters.negativeLabTestComponentId}
                                searchTerm={stateFilters.negativeLabResultName}
                                code="lab_tests_components"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchLabResultChange(name, item, true)}
                                placeholderTitle="Lab Result"
                            />

                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.paddingRight5}>
                            <SelectField
                                id="negativeCondition"
                                name="negativeCondition"
                                value={stateFilters.negativeCondition}
                                placeholder=">"
                                onChange={(e) => { handleLabResultValueChange(e, true) }}
                                options={labResultConditions}
                            />

                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                            <InputBaseField
                                id="negativeResultValue"
                                name="negativeResultValue"
                                value={stateFilters.negativeResultValue}
                                onChange={(e) => { handleLabResultValueChange(e, true) }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                            <div className={classes.actionimg}>


                                <img src={AddIcon} onClick={() => { handleAddLabResult(true) }} />

                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" lg={12} xl={12} alignItems="baseline">
                        <Grid item xs={2} sm={2} lg={2} md={2} />
                        <Grid item xs={10} sm={10} lg={10} md={10}>
                            <div className={classes.orderTestContent}>
                                <ul className={classes.orderList}>
                                    {labResultList ?
                                        labResultList.filter(t => t.patientDoesNotHave == true).map((item, i) => {
                                            if (item.isDeleted == true) { return '' }
                                            else {
                                                return (
                                                    <>
                                                        <li>
                                                            {item.labResultName + ' ' + item.condition + ' ' + item.resultValue}
                                                            <span className={classes.deleteIcon} onClick={() => deleteLabResult(item.labTestId)}> <AddDeleteIcon /> </span>
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



                </div>
                {/* <div className={classes.footer}> */}
                <Grid container justifyContent="flex-start">
                    {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2}/> */}
                    <Grid item xs={12} sm={2} md={2} lg={2}
                        container
                        direction="row"
                        className={classes.labelAlign}
                    />
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <FooterBtn className={classes.footerBtn}>
                            {/* <div className={classes.footerRight}> */}
                            {isSaving ?
                                <FormBtn id="loadingSave"  > Save</FormBtn>
                                :
                                <FormBtn id="save" disabled={!isEditable} onClick={save}> Save</FormBtn>
                            }
                            <FormBtn id="resetBtn"> Reset </FormBtn>
                        </FooterBtn>
                        {/* </div> */}
                    </Grid>
                </Grid>
                {/* </div> */}
            </div>
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
        </Grid>

    )
}
export default withSnackbar(AddCustomCDS)