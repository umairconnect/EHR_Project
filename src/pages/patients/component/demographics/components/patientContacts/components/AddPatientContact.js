import React, { useState, useEffect } from "react";
import useStyles from "../styles";

import {
    Dialog,
    FormHelperText,
    Grid
} from "@material-ui/core";
import CloseIcon from "../../../../../../../images/icons/math-plus.png"
import { withSnackbar } from '../../../../../../../components/Message/Alert'
import { InputBaseField, SelectField, CheckboxField } from "../../../../../../../components/InputField/InputField";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../components/ActionDialog/ActionDialog";
import { USAStateListOptions, CountryListOptions } from "../../../../../../../context/StaticDropDowns";
import { Scrollbars } from "rc-scrollbars";
function AddPatientContact({ closeAddNew, closeDialog, closeEdit, closeDelete, ...props }) {
    const { showMessage } = props;
    var classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    })
    const [patientId] = useState(props.patientId);
    const [patientDetailState, setPatientDetailState] = useState({});
    const [relationshipCodes, setRelationshipCodes] = useState([]);

    const [state, setState] = useState({
        contactId: 0, patientId: patientId, contactName: "",firstName:"",middleName:"",lastName:"", homePhone: "", cellPhone: "", officePhone: "", officePhoneExt: "",
        primaryContactTypeCode: "", relationshipCode: "", prefferedLanguageId: "", isLegalGuardian: false, isGurantor: false,
        isSameHouseHold: false, isTranslatorRequired: false, isNotifyAdmission: false, address: "", city: "", zipCode: "", state: "",
        country: "USA",
    });

    const [errorMessageStates, setErrorMessageStates] = useState({
        errorContactName: false, errorRelation: false,errorMobilePhone : false
    })

    const options = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const primaryPhoneOptions = [
        { value: "Home Phone", label: "Home Phone" },
        { value: "Work Phone", label: "Work Phone" },
        { value: "Mobile Phone", label: "Mobile Phone" },
    ]

    const handleChange = (e) => {
       
        const { name, value } = e.target

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckedChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const openDialog = () => {
    }
    function toDayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    const onSave = e => {
      
        let errorList = [];
        if (!state.firstName || state.firstName.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }

        if (!state.lastName || state.lastName.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }

        if (!state.relationshipCode || state.relationshipCode.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorRelation: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorRelation: false
            }));
        }
     
        if (!state.cellPhone || state.cellPhone.trim() == "" || state.cellPhone.length < 10) {

            setErrorMessageStates(prevState => ({
                ...prevState,
                errorMobilePhone: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorMobilePhone: false
            }));
        }

        if (state.officePhone != "" && state.officePhone != undefined && state.officePhone.length < 10) {

            setErrorMessageStates(prevState => ({
                ...prevState,
                errorOfficePhone: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorOfficePhone: false
            }));
        }

        if (state.homePhone != "" && state.homePhone != undefined && state.homePhone.length < 10) {

            setErrorMessageStates(prevState => ({
                ...prevState,
                errorHomePhone: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorHomePhone: false
            }));
        }
        if ((state.homePhone == undefined || state.homePhone == "") && state.primaryContactTypeCode == "Home Phone") {
            errorList.push(true);
            showMessage("Error", "Home Phone is missing, You cannot select home phone as the primary phone.", "error", 3000);
            return;
        }
        if ((state.cellPhone == undefined || state.cellPhone == "") && state.primaryContactTypeCode == "Mobile Phone") {
            errorList.push(true);
            showMessage("Error", "Mobile Phone is missing, You cannot select mobile phone as the primary phone.", "error", 3000);
            return;
        }
        if ((state.officePhone == undefined || state.officePhone == "") && state.primaryContactTypeCode == "Work Phone") {
            errorList.push(true);
            showMessage("Error", "Work Phone is missing, You cannot select work phone as the primary phone.", "error", 3000);
            return;
        }

        var toDay = toDayDate();
        if (!state.dateOfBirth || state.dateOfBirth.trim() === "") {

            setErrorMessageStates(prevState => ({
                ...prevState,
                errorDOB: true
            }));

            errorList.push(true);

        }
        else if (state.dateOfBirth > toDay) {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorDOBFuture: true
            }));

            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorDOB: false
            }));
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorDOBFuture: false
            }));

        }

        if (errorList.length < 1) {
            let method = "patientcontact/isGuardianOrGaruntorAlreadyExist";
            PostDataAPI(method, state, true).then((result) => {
                if (result.success && result.data != null) {
                    
                    let message = "";
                    if (state.isGurantor && !state.isLegalGuardian) {
                        message = "Guarantor already exist for "+patientDetailState.name +", Are you sure you want to change the guarantor to " + result.data.contactName + "?";
                    } else if (state.isLegalGuardian && !state.isGurantor) {
                        message = "Guardian already exist for "+patientDetailState.name +", Are you sure you want to change the guardian to " + result.data.contactName + "?";
                    } else {
                        message = "Guardian Or Guarantor already exist for " + patientDetailState.name +" , Are you sure you want to change to " + result.data.contactName + "?";;
                    }
                    ShowActionDialog(false, "Update", message, "confirm", function () {
                        if (state.isGurantor && result.data.isGurantor) {
                            result.data.isGurantor = false;
                        }

                        if (state.isLegalGuardian && result.data.isLegalGuardian) {
                            result.data.isLegalGuardian = false;
                        }

                        method = "patientcontact/update";
                        PostDataAPI(method, result.data, true).then((result) => {
                            if (result.success == true) {
                                addUpdateContact();
                            } else {
                                showMessage("error", result.message, "error", 8000);
                            }
                        });
                    });

                } else {
                    addUpdateContact();
                }
            });
        }

        
       
    }

    function addUpdateContact() {
        let method = "patientcontact/add";
        if (state.contactId > 0) {
            method = "patientcontact/update";
        }

        console.log(state);
        PostDataAPI(method, state, true).then((result) => {
            if (result.success == true) {
                if (state.contactId > 0) {
                    closeEdit()
                } else {
                    closeAddNew();

                }
            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }
        })
    }

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

    const [preferredLanguage, setPreferredLanguage] = useState([]);

    const getPatientDetails = e => {

        PostDataAPI("patient/getPatient", parseInt(props.patientId)).then((result) => {
            if (result.success && result.data != null) {
                setPatientDetailState(result.data);
            }
        })
    }

    useEffect(() => {
        initialization();
        getPatientDetails();
        if (props.dataId != null && props.dataId > -1) {
            loadContactDetails();
        }
    }, []);

    function loadContactDetails() {
        PostDataAPI("patientcontact/get", props.dataId).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.dateOfBirth)
                    result.data.dateOfBirth = result.data.dateOfBirth.split('T')[0];
                setIsEdit(true);
                setState(result.data);
            }
        })
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

    function deleteContact() {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {

            var data = {
                contactId: state.contactId
            }

            PostDataAPI('patientcontact/delete', data, true).then((result) => {
                if (result.success == true) {
                    closeDelete();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        });
    }

    function initialization() {

        var params = {
            code: "DDL_List_Item",
            parameters: ['relationship_code','preferred_language']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _preferredLanguage = [];
                var _relationShipCOde = [];
                result.data.map((item, i) => {
                    if (item.text3 == 'preferred_language')
                        _preferredLanguage.push({ value: item.text1, label: item.text2 });
                    else {
                        _relationShipCOde.push({ value: item.text1, label: item.text2 });
                    }
                });
                setRelationshipCodes(_relationShipCOde);
                setPreferredLanguage(_preferredLanguage);
                
            }
        });
        
    }

    const handleCellPhoneChange = e => {
      
        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value
                    .replace(' ', '')
                    .replace('(', '')
                    .replace(')', '')
                    .replace('-', '')
                    .replace('*', '')
                    .replace('@', '')
                    .replace('#', '')
                    .replace('#', '')
                    .replace('$','');
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

                        setErrorMessageStates(prevState => ({
                            ...prevState,
                            errorMobilePhone: false
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

                    setErrorMessageStates(prevState => ({
                        ...prevState,
                        errorMobilePhone: true
                    }));
                }
                else {
                    setErrorMessageStates(prevState => ({
                        ...prevState,
                        errorMobilePhone: false
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
                e.target.value = e.target.value
                    .replace(' ', '')
                    .replace('(', '')
                    .replace(')', '')
                    .replace('-', '')
                    .replace('*', '')
                    .replace('@', '')
                    .replace('#', '')
                    .replace('#', '')
                    .replace('$', '');
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

                        setErrorMessageStates(prevState => ({
                            ...prevState,
                            errorHomePhone: false
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

                    setErrorMessageStates(prevState => ({
                        ...prevState,
                        errorHomePhone: true
                    }));
                }
                else {
                    setErrorMessageStates(prevState => ({
                        ...prevState,
                        errorHomePhone: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }

    const handlePhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value
                    .replace(' ', '')
                    .replace('(', '')
                    .replace(')', '')
                    .replace('-', '')
                    .replace('*', '')
                    .replace('@', '')
                    .replace('#', '')
                    .replace('#', '')
                    .replace('$', '');
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

                        if (name === "officePhone") {
                            setErrorMessageStates(prevState => ({
                                ...prevState,
                                errorOfficePhone: false
                            }));
                        }

                        if (name === "emergencyContactPhone") {
                            setErrorMessageStates(prevState => ({
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

                    if (name === "officePhone") {
                        setErrorMessageStates(prevState => ({
                            ...prevState,
                            errorOfficePhone: true
                        }));
                    }

                    if (name === "emergencyContactPhone") {
                        setErrorMessageStates(prevState => ({
                            ...prevState,
                            errorEmergencyPhoneLength: true
                        }));
                    }
                }
                else {

                    if (name === "officePhone") {
                        setErrorMessageStates(prevState => ({
                            ...prevState,
                            errorOfficePhone: false
                        }));
                    }

                    if (name === "emergencyContactPhone") {
                        setErrorMessageStates(prevState => ({
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

    function checkHomePhoneLength() {
        if (state.homePhone === undefined) { return true; }
        else if (state.homePhone.length < 10)
            return true;
        else
            return false;
    }
  
    return(
        <>
            <Dialog 
            onClose={closeDialog} 
            open={openDialog} 
            classes={{ paper: classes.dialogPaper }}
            maxWidth="lg"
            PaperComponent={DraggableComponent}
            >
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                            {(props.dataId != null && props.dataId > -1) ? <FormGroupTitle className={classes.lableTitleInput}>Edit Patient Contact</FormGroupTitle> :
                                <FormGroupTitle className={classes.lableTitleInput}>Add Patient Contact</FormGroupTitle>}
                        </div>
                        <Scrollbars style={{ minHeight: 480 }} >
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingRight:"20px"}}>

                                <Grid item xs={12} sm={12} md={12} lg={12}
                                    container
                                    direction="row">
                                    <Label title="First Name" mandatory={true} size={2} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            placeholder="First Name"
                                            onChange={handleChange}
                                            type="text"
                                            name="firstName"
                                            value={state.firstName}
                                            MaxLength="100"

                                        />
                                        {errorMessageStates.errorFirstName && !state.firstName.trim() != "" ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter first name
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Label title="Middle Name" size={2} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4} >
                                        <InputBaseField
                                            placeholder="Middle Name"
                                            onChange={handleChange}
                                            name="middleName"
                                            type="text"
                                            value={state.middleName}
                                            MaxLength="100"
                                        />
                                    </Grid>

                                </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                     
                                    <Label title="Last Name" size={2} mandatory={true} />
                                      
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                            id="lastName"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={state.lastName}
                                            placeholder="Last name"
                                            MaxLength="100"
                                        />
                                        {errorMessageStates.errorLastName && (!state.lastName || state.lastName.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter last name</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>
                                    <Label title="Date of Birth" mandatory={true} size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            placeholder="Date Of Birth"
                                            onChange={handleChange}
                                            name="dateOfBirth"
                                            value={state.dateOfBirth}
                                            MaxLength={50}
                                            type="Date"
                                        />

                                        {errorMessageStates.errorDOB && !state.dateOfBirth ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter date of birth
                                        </FormHelperText>) : ('')}
                                        {errorMessageStates.errorDOBFuture && state.dateOfBirth > toDayDate() ? (<FormHelperText style={{ color: "red" }} >
                                            Date of birth cannot be in future
                                            {/* Date of Birth can not be in the future  */}
                                        </FormHelperText>) : ('')}
                                    </Grid>                                   

                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="Mobile Phone" size={2} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="cellPhone"
                                            name="cellPhone"
                                            onChange={handleCellPhoneChange}
                                            value={state.cellPhone}
                                            placeholder="(863) 993-2966"
                                            MaxLength="14"
                                        />
                                        {errorMessageStates.errorMobilePhone ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter valid mobile phone number</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>

                                    <Label title="Relationship" size={2} mandatory={true} />

                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <SelectField
                                            id="relationship"
                                            name="relationshipCode"
                                            value={state.relationshipCode}
                                            placeholder="Select Relationship"
                                            options={relationshipCodes}
                                            onChange={handleChange}
                                        />
                                        {errorMessageStates.errorRelation && (!state.relationshipCode || state.relationshipCode.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} > Please select relationship</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                     
                                        <Label title="Work Phone" size={2} />
                                    
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                            id="officePhone"
                                            name="officePhone"
                                            onChange={handlePhoneChange}
                                            placeholder="(863) 993-2966"
                                            value={state.officePhone}
                                            MaxLength='14'
                                        />
                                        {errorMessageStates.errorOfficePhone && state.officePhone != "" ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid work phone number
                                        </FormHelperText>) : ('')}
                                        </Grid>

                                        <Label title="Work Phone Ext" size={2} />

                                        <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                            id="officePhoneExt"
                                            name="officePhoneExt"
                                            onChange={handleChange}
                                            placeholder="Extension"
                                            MaxLength='10'
                                            value={state.officePhoneExt}
                                            />
                                        </Grid>

                                     </Grid>


                                     <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                     
                                    <Label title="Home Phone" size={2} />

                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="homePhone"
                                            name="homePhone"
                                            onChange={handleHomePhoneChange}
                                            value={state.homePhone}
                                            placeholder="(863) 993-2966"
                                            MaxLength="14"
                                        />
                                        {errorMessageStates.errorHomePhone && checkHomePhoneLength() ? (<FormHelperText style={{ color: "red" }} >
                                             Please enter valid home phone number
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                        <Label title="Primary Phone Type" size={2} />

                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <SelectField
                                            id="primaryContactTypeCode"
                                            name="primaryContactTypeCode"
                                            value={state.primaryContactTypeCode}
                                            placeholder="Select Primary Contact"
                                            options={primaryPhoneOptions}
                                            onChange={handleChange}
                                        />
                                        </Grid>

                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                     
                                     <Label title="Preferred Language" size={2} />
                              
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <SelectField
                                            placeholder="Select Preferred Language"
                                            onChange={handleChange}
                                            name="prefferedLanguageId"
                                            value={state.prefferedLanguageId}
                                            options={preferredLanguage}
                                        />
                                     </Grid>
                                </Grid>


                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormGroupTitle>Address</FormGroupTitle>

                                    <Grid item lg={12} container direction="row">
                                         <Label title="Address" size={2} />
                                         <Grid item xs={12} sm={10} md={10} lg={10}>
                                            <InputBaseField
                                                placeholder="Address"
                                                onChange={handleChange}
                                                name="address"
                                                value={state.address}
                                                MaxLength='8000'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={12} container direction="row">
                                       
                                        <Label title="City" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <InputBaseField
                                                placeholder="City"
                                                onChange={handleChange}
                                                name="city"
                                                value={state.city}
                                                MaxLength='100'
                                            />
                                        </Grid>

                                        <Label title="State" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <SelectField
                                                id="State"
                                                name="state"
                                                value={state.state}
                                                placeholder="Select State"
                                                options={USAStateListOptions}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid item lg={12} container direction="row">

                                      

                                        <Label title="Zip Code" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} >
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

                                        <Label title="Country" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <SelectField
                                                name="country"
                                                value={state.country}
                                                options={CountryListOptions}
                                                onChange={handleChange}
                                            />
                                            {errorMessageStates.errorCountry && !state.country ? (<FormHelperText style={{ color: "red" }} >
                                                Please select country
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>
                                 
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <hr style={{
                                        height: "1px",
                                        width: "100%",
                                        opacity: "0.3"}}></hr>
                                </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                     
                              
                                                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                        <Grid lg={12}>
                                                            <CheckboxField
                                                                color="primary"
                                                id="isLegalGuardian"
                                                name="isLegalGuardian"
                                                options={options}
                                                value={state.isLegalGuardian}
                                                checked={state.isLegalGuardian}
                                                onChange={handleCheckedChange}
                                                label="Legal Guardian"
                                                            />
                                                        </Grid>

                                                        <Grid lg={12}>
                                                       
                                                            <CheckboxField
                                                                color="primary"
                                                id="isSameHouseHold"
                                                name="isSameHouseHold"
                                                options={options}
                                                value={state.isSameHouseHold}
                                                checked={state.isSameHouseHold}
                                                onChange={handleCheckedChange}
                                                                label="Same House Hold"
                                                            />
                                                        </Grid>

                                                        <Grid lg={12}>
                                                            <CheckboxField
                                                                color="primary"
                                                id="isTranslatorRequired"
                                                name="isTranslatorRequired"
                                                options={options}
                                                value={state.isTranslatorRequired}
                                                checked={state.isTranslatorRequired}
                                                onChange={handleCheckedChange}
                                                                label="Interpreter Needed"
                                                            />
                                                        </Grid>
                                                     </Grid>

                                        
                                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                        <Grid lg={12}>
                                                            <CheckboxField
                                                                color="primary"
                                                id="isGurantor"
                                                name="isGurantor"
                                                options={options}
                                                value={state.isGurantor}
                                                checked={state.isGurantor}
                                                onChange={handleCheckedChange}
                                                                label="Guarantor"
                                                            />
                                                        </Grid>
                                                        <Grid lg={12}>
                                                            <CheckboxField
                                                                color="primary"
                                                id="isNotifyAdmission"
                                                name="isNotifyAdmission"
                                                options={options}
                                                value={state.isNotifyAdmission}
                                                checked={state.isNotifyAdmission}
                                                onChange={handleCheckedChange}
                                                                label="Notify on Admission"
                                                            />
                                                        </Grid>
                                                     </Grid>
 
                                      
                                    </Grid>


                                   

                                </Grid>
                        </Scrollbars>

                            <Grid container item direction="row" lg={12}>

                            <Grid container item direction="row" alignItems="center" justify="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormBtn id="save" onClick={onSave}> Save</FormBtn>
                                {isEdit ? <FormBtn id="delete" onClick={() => deleteContact()}>Delete</FormBtn> : null}
                                <FormBtn id="reset" onClick={closeDialog}> Close  </FormBtn>
                                </Grid>

                                
                        </Grid>
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
                            
                        </div>
                </div>
            </Dialog>
        </>
    )

}
export default withSnackbar(AddPatientContact)