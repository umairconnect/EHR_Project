import React, { useState, useRef, useEffect } from "react";

import {
    Container,
    Grid,
    FormLabel,
    IconButton,
    Typography,
    FormHelperText,
} from "@material-ui/core";
import { AttachFile } from '@material-ui/icons';

import {
    ToggleButtonGroup,
    ToggleButton,
} from '@material-ui/lab';
import PageTitle from "../../../../../../../components/PageTitle/PageTitle";
// import PageTitle from "../../../../../components/PageTitle";
import { withSnackbar } from "../../../../../../../components/Message/Alert";
import { InputBaseField, RadioboxField, InputPaymentField, TextareaField, SelectField } from "../../../../../../../components/InputField/InputField";
import { FormBtn, FormGroupTitle, Label, LinkS } from "../../../../../../../components/UiElements/UiElements";
import ViewIcon from "../../../../../../../images/icons/view.png";
import {
    USAStateListOptions, CountryListOptions, StatementAddressOptions, StatementMode, CreateStatement, LetterOptions, CardOptions
} from "../../../../../../../context/StaticDropDowns";
import { GetUserInfo } from '../../../../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../../Services/GetDataAPI';
import { IsEditable } from '../../../../../../../Services/GetUserRolesRights';
// import Statement from "./components/statement/Statement";
// import PatientStatementAdditionalSettings from "./components/patientStatementAdditionalSettings/PatientStatementAdditionalSettings";

import useStyles from "./styles";

function PatientStatementSettings({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const inputFile = useRef(null);
    const [tabValue, setTabValue] = useState("statement");
    const defaultAttributes = {
        statementSettingsId: 0, payToAddressOrder: '', returnToAddressOrder: '', isStatementElectronic: true,
        isStatementManual: true, cardTypeCode: '', isReminderLetterTemplate: true, customReminderLetterPath: '',
        isDebtLetterTemplate: true, customDebtLetterPath: '', isFinalNoticeTemplate: true, customFinalNoticePath: '',
        payToFaciltiy: '', payToAddress: '', payToCity: '', payToZip: '', payToStateCode: '', payToCountryCode: '',
        returnToFacility: '', returnToAddress: '', returnToCity: '', returnToZip: '', returnToCountryCode: '',
        returnToStateCode: '', minimumBalance: 0.00, statementDays: 0, dueDays: 0, maxStatement: 0, statementMessage: '', statementLogo: ''
    };
    const [state, setState] = useState(defaultAttributes);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: "" });
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [errorMessages, setErrorMessages] = useState({
        errorCustomReminderLetterPath: false, errorCustomFinalNoticePath: false, patientStatmentValidate: false
    });
    const [disableSection, setDisableSection] = useState(true);
    const [returnToDisableSection, setReturnToDisableSection] = useState(true);
    useEffect(() => {
        getLocationSettings();
    }, []);
    const getLocationSettings = () => {
        GetDataAPI("statementSettings/getLocationSettingsQuery", '').then((result) => {
            if (result.success == true) {
                if (result.data != null) {
                    if (result.data.statementLogo && result.data.statementLogo != 'null')
                        setAttachment({ file: null, userPhoto: result.data.statementLogo.split('\\').pop().split('/').pop(), statementLogo: result.data.statementLogo });

                    if (result.data.payToAddressOrder != "custom")
                        changeLocation('payToAddressOrder', result.data.payToAddressOrder);
                    else
                        setDisableSection(false);

                    if (result.data.returnToAddressOrder != "custom")
                        changeLocation('returnToAddressOrder', result.data.returnToAddressOrder);
                    else
                        setReturnToDisableSection(false);

                    setState(result.data);
                }
            }
            else
                showMessage("Error", result.message, "error", 3000);
        })
    }
    const clearValidations = () => {
        setErrorMessages({ errorCustomReminderLetterPath: false, errorCustomFinalNoticePath: false, patientStatmentValidate: false });
    }
    const handleChange = e => {
        const { name, value } = e.target;

        if (value == "true" || value == true)
            clearValidations();

        setState(prevState => ({
            ...prevState,
            [name]: value == "false" || false ? false : true
        }));

        if (value == true || value == "true") {
            var sName = "";
            if (name == "isReminderLetterTemplate")
                sName = "customReminderLetterPath";
            else if (name == "isDebtLetterTemplate")
                sName = "customDebtLetterPath";
            else if (name == "isFinalNoticeTemplate")
                sName = "customFinalNoticePath";
            if (sName != "") {
                setState(prevState => ({
                    ...prevState,
                    [sName]: ''
                }));
            }
        }
    };
    const handleCommonChange = e => {
        const { name, value } = e.target;

        if (name == 'payToAddressOrder')
            changeLocation(name, value);
        else if (name == 'returnToAddressOrder')
            changeLocation(name, value);

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSelectFile = () => {
        inputFile.current.click();
    };
    function handleFileUpload(e) {
        setAttachment({ file: e.target.files[0] ? e.target.files[0] : null, userPhoto: e.target.files[0] ? e.target.files[0].name : null });
    }
    const handleTabChange = (event, newValue) => {
        if (newValue !== null) {
            setTabValue(newValue);
        }
    };
    const patientStatmentValidate = (errorList) => {

        if (state.isReminderLetterTemplate === false) {
            if (state.customReminderLetterPath == "" || state.customReminderLetterPath == undefined) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomReminderLetterPath: true
                }));

                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomReminderLetterPath: false
                }));
            }
        }

        if (state.isFinalNoticeTemplate === false) {
            if (state.customDebtLetterPath == "" || state.customDebtLetterPath == undefined) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomDebtLetterPath: true
                }));

                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomDebtLetterPath: false
                }));
            }
        }

        if (state.isFinalNoticeTemplate === false) {
            if (state.customFinalNoticePath == "" || state.customFinalNoticePath == undefined) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomFinalNoticePath: true
                }));

                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCustomFinalNoticePath: false
                }));
            }
        }
    }
    const Save = () => {
        let errorList = [];

        if (tabValue === "statement")
            patientStatmentValidate(errorList);
        if (errorList.length < 1) {

            //if (state.payToAddressOrder == "primary" || state.returnToAddressOrder == "facility") {
            //    resetPrimaryState();
            //}
            //if (state.returnToAddressOrder == "primary" || state.returnToAddressOrder == "facility") {
            //    resetFacilityState();
            //}
            let method = "statementSettings/add";
            let isUpdate = state.statementSettingsId > 0;
            if (state.statementSettingsId > 0)
                method = "statementSettings/update";

            let formData = new FormData();
            for (var key in state) {
                if (state[key] && key != "statementLogo" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }

            formData.append("formFile", attachment.file);
            formData.append("statementLogo", attachment.userPhoto);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                //setSaveLoading(false);
                if (result.success == true) {

                    //setErrorMessages([]);
                    if (!isUpdate) {
                        if (result.success && result.data != null) {
                            showMessage("Success", "Record saved successfully.", "success", 2000);
                            if (result.data.payToAddressOrder != "custom")
                                changeLocation('payToAddressOrder', result.data.payToAddressOrder);
                            else
                                setDisableSection(false);

                            if (result.data.returnToAddressOrder != "custom")
                                changeLocation('returnToAddressOrder', result.data.returnToAddressOrder);
                            else
                                setReturnToDisableSection(false);
                            setState(result.data);

                        }
                    }
                    else {
                        if (result.success) {
                            showMessage("Success", "Record updated successfully.", "success", 2000);

                            if (result.data.payToAddressOrder != "custom")
                                changeLocation('payToAddressOrder', result.data.payToAddressOrder);
                            else
                                setDisableSection(false);

                            if (result.data.returnToAddressOrder != "custom")
                                changeLocation('returnToAddressOrder', result.data.returnToAddressOrder);
                            else
                                setReturnToDisableSection(false);
                            setState(result.data);

                        }
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
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
    const changeLocation = (name, value) => {

        if (value == 'primary' || value == 'facility') {

            var params = {
                Text1: value == 'primary' ? '0' : value == 'facility' ? '1' : '0',
                Text2: userInfo.userID.toString(),
                Text3: name == 'payToAddressOrder' ? '1' : name == 'returnToAddressOrder' ? '0' : '0',
            };
            PostDataAPI("statementSettings/getLocationInformation", params).then((result) => {

                if (result.success == true) {

                    if (result.success === true && result.data != null) {
                        if (result.data) {

                            let record = result.data;
                            if (name == 'payToAddressOrder') {
                                setDisableSection(true);
                                setState(prevState => ({
                                    ...prevState,
                                    payToFaciltiy: record.payToFaciltiy,
                                    payToAddress: record.payToAddress,
                                    payToCity: record.payToCity,
                                    payToZip: record.payToZip,
                                    payToStateCode: record.payToStateCode,
                                    payToCountryCode: record.payToCountryCode
                                }));
                            }
                            else if (name == 'returnToAddressOrder') {
                                setReturnToDisableSection(true);
                                setState(prevState => ({
                                    ...prevState,
                                    returnToFacility: record.returnToFacility,
                                    returnToAddress: record.returnToAddress,
                                    returnToCity: record.returnToCity,
                                    returnToZip: record.returnToZip,
                                    returnToCountryCode: record.returnToCountryCode,
                                    returnToStateCode: record.returnToStateCode
                                }));
                            }
                        }

                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }
            })
        }
        else {
            if (name == 'payToAddressOrder') {
                setDisableSection(false);
                resetPrimary();
            }
            else if (name == 'returnToAddressOrder') {
                resetFacility();
                setReturnToDisableSection(false);
            }
        }

    }

    const resetPrimary = () => {
        setState(prevState => ({
            ...prevState,
            payToFaciltiy: '',
            payToAddress: '',
            payToCity: '',
            payToZip: '',
            payToStateCode: '',
            payToCountryCode: ''
        }));
    }
    const resetFacility = () => {
        setState(prevState => ({
            ...prevState,
            returnToFacility: '',
            returnToAddress: '',
            returnToCity: '',
            returnToZip: '',
            returnToCountryCode: '',
            returnToStateCode: ''
        }));
    }
    const resetPrimaryState = () => {

        state.payToFaciltiy = '';
        state.payToAddress = '';
        state.payToCity = '';
        state.payToZip = '';
        state.payToStateCode = '';
        state.payToCountryCode = '';
    }
    const resetFacilityState = () => {

        state.returnToFacility = '';
        state.returnToAddress = '';
        state.returnToCity = '';
        state.returnToZip = '';
        state.returnToCountryCode = '';
        state.returnToStateCode = '';

    }
    const reset = () => {

        if (state.statementSettingsId > 0)
            getLocationSettings();
        else {
            setState({
                statementSettingsId: 0, payToAddressOrder: '', returnToAddressOrder: '', isStatementElectronic: true,
                isStatementManual: true, cardTypeCode: '', isReminderLetterTemplate: true, customReminderLetterPath: '',
                isDebtLetterTemplate: true, customDebtLetterPath: '', isFinalNoticeTemplate: true, customFinalNoticePath: '',
                payToFaciltiy: '', payToAddress: '', payToCity: '', payToZip: '', payToStateCode: '', payToCountryCode: '',
                returnToFacility: '', returnToAddress: '', returnToCity: '', returnToZip: '', returnToCountryCode: '',
                returnToStateCode: '', minimumBalance: 0.00, statementDays: 0, dueDays: 0, maxStatement: 0, statementMessage: '',
                statementLogo: ''
            });
        }
    }
    const handleNumberChange = (e, maxLength) => {
        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
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
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };
    return (
        <>
            <PageTitle title="Patient Statement Settings" />
            <div className={classes.containerArea}>
                <ToggleButtonGroup className={classes.statementToggleBtnGrp} size="large" exclusive value={tabValue} onChange={handleTabChange}>
                    <ToggleButton value={"statement"}>Statement</ToggleButton>
                    <ToggleButton value={"setup"}>Setup</ToggleButton>
                </ToggleButtonGroup>
                <div className={tabValue == "statement" ? `${classes.statementArea}` : `${classes.displayNone}`}>
                    <Grid container >

                        <FormGroupTitle>Statement Setup</FormGroupTitle>

                        <Grid container direction="row">
                            <Label size={2} title="Statement Mode" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <RadioboxField
                                    id="isStatementElectronic"
                                    name="isStatementElectronic"
                                    value={state.isStatementElectronic}
                                    labelPlacement="end"
                                    options={StatementMode}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Label size={2} title="Create Statement" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <RadioboxField
                                    id="isStatementManual"
                                    name="isStatementManual"
                                    value={state.isStatementManual}
                                    labelPlacement="end"
                                    options={CreateStatement}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={2} title="Card Type" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <SelectField
                                    id="cardTypeCode"
                                    name="cardTypeCode"
                                    value={state.cardTypeCode}
                                    options={CardOptions}
                                    onChange={handleCommonChange}
                                    placeholder="Please select"
                                />
                            </Grid>
                        </Grid>

                        <FormGroupTitle>Letter Setup</FormGroupTitle>

                        <Grid container direction="row">
                            <Label size={2} title="Reminder Letter" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <RadioboxField
                                    id="isReminderLetterTemplate"
                                    name="isReminderLetterTemplate"
                                    value={state.isReminderLetterTemplate}
                                    labelPlacement="end"
                                    options={LetterOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                <InputBaseField
                                    id="customReminderLetterPath"
                                    name="customReminderLetterPath"
                                    value={state.customReminderLetterPath}
                                    labelPlacement="end"
                                    options={CreateStatement}
                                    onChange={handleCommonChange}
                                    IsDisabled={state.isReminderLetterTemplate}
                                />
                                {errorMessages.errorCustomReminderLetterPath && !state.customReminderLetterPath ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter reminder letter
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                <img src={ViewIcon} alt="view" className={classes.viewImage} />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={2} title="Debt Letter" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <RadioboxField
                                    id="isDebtLetterTemplate"
                                    name="isDebtLetterTemplate"
                                    value={state.isDebtLetterTemplate}
                                    labelPlacement="end"
                                    options={LetterOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                <InputBaseField
                                    id="customDebtLetterPath"
                                    name="customDebtLetterPath"
                                    value={state.customDebtLetterPath}
                                    labelPlacement="end"
                                    options={CreateStatement}
                                    onChange={handleCommonChange}
                                    IsDisabled={state.isDebtLetterTemplate}
                                />
                                {errorMessages.errorCustomDebtLetterPath && !state.customDebtLetterPath ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter debt letter
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                <img src={ViewIcon} alt="view" className={classes.viewImage} />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={2} title="Final Notice" />
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                <RadioboxField
                                    id="isFinalNoticeTemplate"
                                    name="isFinalNoticeTemplate"
                                    value={state.isFinalNoticeTemplate}
                                    labelPlacement="end"
                                    options={LetterOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                <InputBaseField
                                    id="customFinalNoticePath"
                                    name="customFinalNoticePath"
                                    value={state.customFinalNoticePath}
                                    labelPlacement="end"
                                    options={CreateStatement}
                                    onChange={handleCommonChange}
                                    IsDisabled={state.isFinalNoticeTemplate}
                                />
                                {errorMessages.errorCustomFinalNoticePath && !state.customFinalNoticePath ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter final notice
                                </FormHelperText>) : ('')}
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                <img src={ViewIcon} alt="view" className={classes.viewImage} />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                            <FormBtn id="save" disabled={!isEditable} onClick={Save}>Save</FormBtn>
                            <FormBtn id="resetBtn" disabled={!isEditable} onClick={reset}>Reset</FormBtn>
                        </Grid>

                    </Grid>
                </div>
                <div className={tabValue == "setup" ? `${classes.additionalSettingsArea}` : `${classes.displayNone}`}>
                    <Grid container direction="row" >

                        <FormGroupTitle>Practice Setup</FormGroupTitle>

                        <Grid container direction="row">

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.addressArea}>

                                <Grid container direction="row">
                                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                                        <FormLabel className={classes.customFormTitle}>Pay to Address:</FormLabel>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <RadioboxField
                                            id="payToAddressOrder"
                                            name="payToAddressOrder"
                                            value={state.payToAddressOrder}
                                            labelPlacement="end"
                                            options={StatementAddressOptions}
                                            onChange={handleCommonChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label size={3} title="Facility" />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <InputBaseField
                                            id="payToFaciltiy"
                                            name="payToFaciltiy"
                                            value={state.payToFaciltiy}
                                            onChange={handleCommonChange}
                                            MaxLength="255"
                                            placeholder="Facility"
                                            IsDisabled={disableSection}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label size={3} title="Address" isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            id="payToAddress"
                                            name="payToAddress"
                                            value={state.payToAddress}
                                            onChange={handleCommonChange}
                                            placeholder="Address"
                                            rowsMin={4}
                                            MaxLength="2000"
                                            Disabled={disableSection}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label title="City" size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <InputBaseField
                                                    placeholder="City"
                                                    onChange={handleCommonChange}
                                                    name="payToCity"
                                                    value={state.payToCity}
                                                    MaxLength='255'
                                                    IsDisabled={disableSection}
                                                />
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                                <FormLabel className={classes.cityLableInput} > Zip
                                                    <span className={classes.mandatorColor}></span>:
                                                </FormLabel>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <InputBaseField
                                                    placeholder="Zip"
                                                    id="payToZip"
                                                    name="payToZip"
                                                    value={state.payToZip}
                                                    onChange={handleZipChange}
                                                    IsDisabled={disableSection}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label title="State" size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <SelectField
                                                    placeholder="Select State"
                                                    onChange={handleCommonChange}
                                                    name="payToStateCode"
                                                    value={state.payToStateCode}
                                                    options={USAStateListOptions}
                                                    Disabled={disableSection}
                                                />
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                                <FormLabel className={classes.cityLableInput} > Country
                                                    <span className={classes.mandatorColor}></span>:
                                                </FormLabel>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <SelectField
                                                    onChange={handleCommonChange}
                                                    name="payToCountryCode"
                                                    value={state.payToCountryCode}
                                                    options={CountryListOptions}
                                                    Disabled={disableSection}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.addressArea}>

                                <Grid container direction="row">
                                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                                        <FormLabel className={classes.customFormTitle}>Return to Address:</FormLabel>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <RadioboxField
                                            id="returnToAddressOrder"
                                            name="returnToAddressOrder"
                                            value={state.returnToAddressOrder}
                                            labelPlacement="end"
                                            options={StatementAddressOptions}
                                            onChange={handleCommonChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label size={3} title="Facility" />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <InputBaseField
                                            id="returnToFacility"
                                            name="returnToFacility"
                                            value={state.returnToFacility}
                                            onChange={handleCommonChange}
                                            MaxLength='255'
                                            placeholder="Facility"
                                            IsDisabled={returnToDisableSection}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label size={3} title="Address" isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            rowsMin={5}
                                            placeholder="Address"
                                            onChange={handleCommonChange}
                                            name="returnToAddress"
                                            value={state.returnToAddress}
                                            MaxLength="2000"
                                            Disabled={returnToDisableSection}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label title="City" size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <InputBaseField
                                                    placeholder="City"
                                                    onChange={handleCommonChange}
                                                    name="returnToCity"
                                                    value={state.returnToCity}
                                                    MaxLength='255'
                                                    IsDisabled={returnToDisableSection}
                                                />
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                                <FormLabel className={classes.cityLableInput} > Zip
                                                    <span className={classes.mandatorColor}></span>:
                                                </FormLabel>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <InputBaseField
                                                    placeholder="Zip"
                                                    id="returnToZip"
                                                    name="returnToZip"
                                                    value={state.returnToZip}
                                                    onChange={handleZipChange}
                                                    IsDisabled={returnToDisableSection}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row">
                                    <Label title="State" size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <SelectField
                                                    placeholder="Select State"
                                                    onChange={handleCommonChange}
                                                    name="returnToStateCode"
                                                    value={state.returnToStateCode}
                                                    options={USAStateListOptions}
                                                    Disabled={returnToDisableSection}
                                                />
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                                <FormLabel className={classes.cityLableInput} > Country
                                                    <span className={classes.mandatorColor}></span>:
                                                </FormLabel>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <SelectField
                                                    onChange={handleCommonChange}
                                                    name="returnToCountryCode"
                                                    value={state.returnToCountryCode}
                                                    options={CountryListOptions}
                                                    Disabled={returnToDisableSection}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </Grid>
                        <div className={classes.innerContainer} >

                            <Grid container direction="row">
                                <Label title="Minimum Balance" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputPaymentField
                                        id="minimumBalance"
                                        name="minimumBalance"
                                        value={state.minimumBalance}
                                        onChange={handleCommonChange}
                                        MaxLength={15}
                                    />
                                </Grid>
                                <Label title="Statement Days" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputBaseField
                                        id="statementDays"
                                        name="statementDays"
                                        value={state.statementDays}
                                        onChange={(e) => { handleNumberChange(e, 8) }}
                                        MaxLength={4}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label title="Due Days" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputBaseField
                                        id="dueDays"
                                        name="dueDays"
                                        value={state.dueDays}
                                        onChange={(e) => { handleNumberChange(e, 8) }}
                                        MaxLength={4}
                                    />
                                </Grid>
                                <Label title="Max Statements" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputBaseField
                                        id="maxStatement"
                                        name="maxStatement"
                                        value={state.maxStatement}
                                        onChange={(e) => { handleNumberChange(e, 8) }}
                                        MaxLength={4}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label title="Statement Message" size={2} isTextAreaInput={true} />
                                <Grid item xs={12} sm={10} md={10} lg={8} xl={8}>
                                    <TextareaField
                                        id="statementMessage"
                                        name="statementMessage"
                                        placeholder="Statement Message"
                                        onChange={handleCommonChange}
                                        value={state.statementMessage}
                                        MaxLength="2000"
                                        rowsMin={5}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label title="Statement Logo" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    < InputBaseField
                                        id="userPhoto"
                                        name="userPhoto"
                                        value={attachment.userPhoto}
                                        onChange={handleChange}
                                        IsDisabled={true}
                                        placeholder={"Choose a file"}
                                        endAdornment={
                                            <IconButton
                                                className={classes.attachmentBtn}
                                                color="primary"
                                                onClick={handleSelectFile}>
                                                <AttachFile />
                                            </IconButton>
                                        }
                                    />

                                    {/*}*/}
                                    <form>
                                        <div>
                                            <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                        </div>
                                    </form>
                                </Grid>
                                {attachment.statementLogo ?
                                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                        <Grid container alignItems="flex-end" style={{ height: "42px" }}>

                                            <LinkS target={"_blank"} href={"." + attachment.statementLogo}>{attachment.userPhoto}</LinkS>

                                        </Grid>
                                    </Grid>
                                    : null}
                            </Grid>

                            <Grid container direction="row" justifyContent="flex-start">
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <FormBtn id={"save"} disabled={!isEditable} onClick={Save}>Save</FormBtn>
                                    <FormBtn id="resetBtn" disabled={!isEditable} onClick={reset}>Reset</FormBtn>
                                </Grid>

                            </Grid>

                        </div>


                    </Grid>

                </div >
            </div>
        </>
    )
}

export default withSnackbar(PatientStatementSettings)
