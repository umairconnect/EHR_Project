
import React, { useState, useEffect } from "react";
import { FormHelperText } from "@material-ui/core";
// styles
import useStyles from "./styles";
import { Button, FormLabel, Grid, Typography, Icon } from '@material-ui/core';
import EraseIcon from "../../../../../../images/icons/erase.png"
import DeleteIcon from "../../../../../../images/icons/trash.png"
//import CloseIcon from "../../../../../../images/icons/math-plus.png"
import AddIcon from '../../../../../../images/icons/add-icon.png';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import { Search as SearchIcon } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import { CustomLabel, FormBtn, FooterBtn, FormGroupTitle, Label, CustomDivider } from "../../../../../../components/UiElements";
import { InputBaseField, InputBaseFieldNumber, TextareaField, RadioboxField, CheckboxField } from "../../../../../../components/InputField";
import { SelectField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { Scrollbars } from "rc-scrollbars";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

function SocialHistory({ handleClose, handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    // handle styles
    var classes = useStyles();
    const [isEditable] = useState(props.isEditable)
    // const [showAddTobacco, setShowAddTobacco] = useState(false);
    const [tobaccoStatusCode, setTobaccoStatusCode] = useState([]);
    const [drugUsageCode, setDrugUsageCode] = useState([]);
    const [drugUsageDetail, setDrugUsageDetail] = useState([]);
    const [maritalStatusCode, setMaritalStatusCode] = useState([]);
    const [sexualOrientationCodes, setSexualOrientationCodes] = useState([]);
    const [residenceTypeCode, setResidenceTypeCode] = useState([]);
    const [patientId, setPatientId] = useState(props.patientId);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [socialHistoryOccupations, setSocialHistoryOccupations] = useState([]);
    const [socialHistoryIndustries, setSocialHistoryIndustries] = useState([]);
    const [socailHistoryEducations, setCocailHistoryEducations] = useState([]);
    const [caffeineUsageFrequency, setCaffeineUsageFrequency] = useState([]);
    const [alcoholUsageFrequency, setAlcoholUsageFrequency] = useState([]);

    const socialHistoryRef = useState({ tobaccoStatusRef: "", });


    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const [errorMessages, setErrorMessages] = useState({
        errorTobaccooStatus: false,
        errorTobaccooListCount: false,
    })

    const [state, setState] = useState({
        socialHistoryId: 0, patientId: parseInt(patientId), alcoholUsage: false, alcoholUsageFreq: "", name: "", caffeineUsage: false,
        caffeineUsageFreq: "", drugUsageCode: "", drugUsageDetailCode: "", compToAdministerMedicine: "", maritalStatusCode: "", noOfChild: null,
        sexualOrientationCode: "", highestEducationCode: "", industyCode: "", effDateFrom: null, effDateTo: null, occupationCode: "",
        occDateFrom: null, occDateTo: null, residenceTypeCode: "", additionalInfo: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(),
        socialHisTobaccoLst: []
    });


    const [tobaccoHistoryState, setTobaccoHistoryState] = useState({
        socialHisTobaccoId: 0, socialHistoryId: 0, tobaccoStatusCode: "", effDateFrom: "", effDateTo: "",
        isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
    })

    const alcohalList = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    const radioBoxList = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

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

    useEffect(() => {

        initialization();
        loadPatientSocialHistory();

    }, []);

    function initialization() {


        var params = {
            code: "DDL_List_Item",
            parameters: ['tobacco_status_code', 'drug_usage_code', 'drug_usage_detail', 'marital_status_code',
                'sexual_orientation_code', 'residence_type_code', 'social_history_occupation',
                'social_history_industry', 'socail_history_education', 'alcohol_usage_freq', 'caffeine_usage_freq']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _tobaccoStatusCode = [];
                var _drugUsageCode = [];
                var _drugUsageDetail = [];
                var _maritalStatusCode = [];
                var _sexualOrientationCode = [];
                var _residenceTypeCode = [];
                var _socialHistoryOccupations = [];
                var _socialHistoryIndustries = [];
                var _socailHistoryEducations = [];
                var _alcoholUsageFreq = [];
                var _caffeineUsageFreq = [];


                result.data.map((item, i) => {

                    if (item.text3 == 'tobacco_status_code')
                        _tobaccoStatusCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'drug_usage_code')
                        _drugUsageCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'drug_usage_detail')
                        _drugUsageDetail.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'marital_status_code')
                        _maritalStatusCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'sexual_orientation_code')
                        _sexualOrientationCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'residence_type_code')
                        _residenceTypeCode.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'social_history_occupation')
                        _socialHistoryOccupations.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'social_history_industry')
                        _socialHistoryIndustries.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'socail_history_education')
                        _socailHistoryEducations.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'alcohol_usage_freq')
                        _alcoholUsageFreq.push({ value: item.text1, label: item.text2 });

                    if (item.text3 == 'caffeine_usage_freq')
                        _caffeineUsageFreq.push({ value: item.text1, label: item.text2 });

                });

                setTobaccoStatusCode(_tobaccoStatusCode);
                setDrugUsageCode(_drugUsageCode);
                setDrugUsageDetail(_drugUsageDetail);
                setMaritalStatusCode(_maritalStatusCode);
                setSexualOrientationCodes(_sexualOrientationCode);
                setResidenceTypeCode(_residenceTypeCode);
                setSocialHistoryOccupations(_socialHistoryOccupations);
                setSocialHistoryIndustries(_socialHistoryIndustries);
                setCocailHistoryEducations(_socailHistoryEducations);

                setAlcoholUsageFrequency(_alcoholUsageFreq);
                setCaffeineUsageFrequency(_caffeineUsageFreq);

            }
        })


    }

    const handleChangeSocialHistory = e => {
        const { name, value } = e.target;
        setTobaccoHistoryState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeTobacco = e => {
        const { name, value } = e.target;
        setTobaccoHistoryState(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrorMessages(prevState => ({
            ...prevState,
            errorTobaccooListCount: false
        }));


    };

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckBoxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    };


    function validateAddTabacco(errorList) {

        if (tobaccoHistoryState.tobaccoStatusCode === null || tobaccoHistoryState.tobaccoStatusCode == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTobaccooStatus: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTobaccooStatus: false
            }));
        }

    }

    function addTobacco(isCall) {

        const fromDate = new Date(tobaccoHistoryState.effDateFrom);
        const toDate = new Date(tobaccoHistoryState.effDateTo);

        if (state.socialHisTobaccoLst) {

            if (tobaccoHistoryState.tobaccoStatusCode === null || tobaccoHistoryState.tobaccoStatusCode == "") {
                showMessage("Error", "Please select tobacco status", "error", 8000);
                return false;
            }
            if (fromDate > toDate) {
                showMessage("Error", "Tobacco status from date cannot be greater than to date", "error", 3000);
                return;
            }

            if (state.socialHisTobaccoLst.filter(tmprm => tmprm.tobaccoStatusCode === tobaccoHistoryState.tobaccoStatusCode))
            //&& (tmprm.effDateFrom == tobaccoHistoryState.effDateFrom || tmprm.effDateFrom == null && tobaccoHistoryState.effDateFrom == "")
            //&& (tmprm.effDateTo == tobaccoHistoryState.effDateTo || tmprm.effDateTo == null && tobaccoHistoryState.effDateTo == "")) == "") 
            {

                if (state.socialHisTobaccoLst.filter(tmprm => tmprm.effDateFrom == tobaccoHistoryState.effDateFrom + "T00:00:00" && tmprm.effDateTo == tobaccoHistoryState.effDateTo + "T00:00:00"
                    || tmprm.effDateFrom == tobaccoHistoryState.effDateFrom && tmprm.effDateTo == tobaccoHistoryState.effDateTo
                    && tmprm.tobaccoStatusCode == tobaccoHistoryState.tobaccoStatusCode) != "") {

                    //if (tobaccoHistoryState.effDateFrom == null || tobaccoHistoryState.effDateFrom == "" && tobaccoHistoryState.effDateTo == null || tobaccoHistoryState.effDateTo == "") {
                    //    showMessage("Error", "Tobacco status without dates already exists", "error", 8000);
                    //    return;
                    //}
                    //else
                    //{
                    showMessage("Error", "Tobacco status on the same date already exists", "error", 8000);
                    return;
                    //}
                }
                else if (state.socialHisTobaccoLst.filter(tmprm => tmprm.effDateFrom == null && tmprm.effDateTo == null
                    && tobaccoHistoryState.effDateFrom == "" && tobaccoHistoryState.effDateTo == "") != "") {
                    showMessage("Error", "Tobacco status without dates already exists", "error", 8000);
                    return;
                }

                saveTobacco();


            }
            //else {
            //    showMessage("Error", "Tobacco status on the same date already exists", "error", 8000);
            //    return;

            //}

        }
        else {

            if (tobaccoHistoryState.tobaccoStatusCode === null || tobaccoHistoryState.tobaccoStatusCode == "") {
                showMessage("Error", "Please select tobacco status", "error", 8000);
                return false;
            }

            saveTobacco();


        }
    }



    function saveTobacco() {

        let _tobaccoArray = [];

        // Get List

        if (state.socialHisTobaccoLst) {
            if (state.socialHisTobaccoLst.length > 0) {
                state.socialHisTobaccoLst.map((item, i) => {


                    if (tobaccoHistoryState.editIndex === i) {
                    }
                    else {

                        _tobaccoArray.push({
                            socialHisTobaccoId: item.socialHisTobaccoId, socialHistoryId: item.socialHistoryId, tobaccoStatusCode: item.tobaccoStatusCode,
                            effDateFrom: item.effDateFrom ? item.effDateFrom : null, effDateTo: item.effDateTo ? item.effDateTo : null, isDeleted: item.isDeleted, createdBy: item.createdBy,
                            updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), editIndex: item.editIndex
                        });
                    }

                });
            }
        }

        // New // Update


        _tobaccoArray.unshift({
            socialHisTobaccoId: tobaccoHistoryState.socialHisTobaccoId, socialHistoryId: tobaccoHistoryState.socialHistoryId, tobaccoStatusCode: tobaccoHistoryState.tobaccoStatusCode,
            effDateFrom: tobaccoHistoryState.effDateFrom ? tobaccoHistoryState.effDateFrom : null, effDateTo: tobaccoHistoryState.effDateTo ? tobaccoHistoryState.effDateTo : null, isDeleted: tobaccoHistoryState.isDeleted, createdBy: tobaccoHistoryState.createdBy,
            updatedBy: tobaccoHistoryState.updatedBy, createDate: tobaccoHistoryState.createDate ? tobaccoHistoryState.createDate : new Date(), editIndex: null
        });


        // set State
        setState(prevState => ({
            ...prevState,
            socialHisTobaccoLst: _tobaccoArray
        }));

        // Clear
        clearSocialHistoryTobaccoState();

    }

    const clearSocialHistoryTobaccoState = () => {

        setTobaccoHistoryState({
            socialHisTobaccoId: 0, socialHistoryId: 0, tobaccoStatusCode: "", effDateFrom: "", effDateTo: "",
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
        })
    }

    const handleSocialHistoryTobaccoEdit = (index) => {

        // setShowAddTobacco(true);

        clearSocialHistoryTobaccoState();

        tobaccoEdit(index);

    }

    function tobaccoEdit(index) {



        setTobaccoHistoryState(prevState => ({
            ...prevState,
            socialHisTobaccoId: state.socialHisTobaccoLst[index].socialHisTobaccoId,
            socialHistoryId: state.socialHisTobaccoLst[index].socialHistoryId,
            tobaccoStatusCode: state.socialHisTobaccoLst[index].tobaccoStatusCode,
            effDateFrom: state.socialHisTobaccoLst[index].socialHisTobaccoId > 0 ? state.socialHisTobaccoLst[index].effDateFrom != null ? state.socialHisTobaccoLst[index].effDateFrom.split('T')[0] : null : state.socialHisTobaccoLst[index].effDateFrom,
            effDateTo: state.socialHisTobaccoLst[index].socialHisTobaccoId > 0 ? state.socialHisTobaccoLst[index].effDateTo != null ? state.socialHisTobaccoLst[index].effDateTo.split('T')[0] : null : state.socialHisTobaccoLst[index].effDateTo,
            isDeleted: state.socialHisTobaccoLst[index].isDeleted,
            createdBy: state.socialHisTobaccoLst[index].createdBy,
            updatedBy: state.socialHisTobaccoLst[index].updatedBy,
            createDate: state.socialHisTobaccoLst[index].createDate ? state.socialHisTobaccoLst[index].createDate : new Date(),
            editIndex: index
        }));

    }

    const handleToboccoHistoryDelete = (index) => {


        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the tobacco history?", "confirm", function () {




            if (state.socialHisTobaccoLst) {
                if (state.socialHisTobaccoLst[index] ? state.socialHisTobaccoLst[index].socialHisTobaccoId > 0 : false) {
                    var data = {
                        socialHisTobaccoId: state.socialHisTobaccoLst[index].socialHisTobaccoId
                    }

                    PostDataAPI("patient/socialHistory/deleteSocialHisTobacco", data, true).then((result) => {


                        if (result.success) {

                            showMessage("Success", "Record deleted successfully.", "success", 2000);

                        }
                        else {
                            showMessage("Error", result.message, "error", 8000);
                        }

                    })
                }
            }

            state.socialHisTobaccoLst.splice(index, 1);

            setState(prevState => ({
                ...prevState,
                socialHisTobaccoLst: state.socialHisTobaccoLst
            }));
        });

    }

    const saveSocialHistory = () => {

        const industryFromDate = new Date(state.effDateFrom);
        const industryToDate = new Date(state.effDateTo);
        const occupationFromDate = new Date(state.occDateFrom);
        const occupationToDate = new Date(state.occDateTo);

        if (state.effDateFrom != null && state.effDateTo != null && industryFromDate > industryToDate) {
            showMessage("Error", "Industry from date cannot be greater than to date", "error", 3000);
            return;
        } else if (state.occDateFrom != null && state.occDateTo != null && occupationFromDate > occupationToDate) {
            showMessage("Error", "Occupation from date cannot be greater than to date", "error", 3000);
            return;
        }



        let errorList = [];

        validateSocialHistory(errorList);

        if (errorList.length < 1) {

            let method = "patient/socialHistory/add";

            if (state.socialHistoryId > 0) {

                method = "patient/socialHistory/update";

            }

            HandleFormat();
            PostDataAPI(method, state, true).then((result) => {

                //Loading({ isSaving: false });

                if (result.success == true) {


                    if (state.socialHistoryId < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Social History saved successfully.", "success", 3000);
                            setState(result.data);
                        }
                    }
                    else if (state.socialHistoryId > 0) {

                        if (result.success) {

                            showMessage("Success", "Social History  updated successfully.", "success", 3000);

                        }
                    }

                    handleSave();

                }
                else {

                    showMessage("Error", result.message, "error", 3000);

                }
            })
        }
        // setShowAddTobacco(false)

    }

    function HandleFormat() {
        state.noOfChild = state.noOfChild ? parseInt(state.noOfChild) : null;
    }

    function validateSocialHistory(errorList) {

        if (state.socialHisTobaccoLst) {
            if (state.socialHisTobaccoLst.length === 0) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorTobaccooListCount: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorTobaccooListCount: false
                }));
            }

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTobaccooListCount: true
            }));
            errorList.push(true);

        }

    }

    function loadPatientSocialHistory() {

        PostDataAPI("patient/socialHistory/GetPatientSocialHistory", parseInt(patientId)).then((result) => {

            if (result.success && result.data != null) {
                handleLoadFormatData(result.data);
                setState(result.data);
            }
        })
    }


    function handleLoadFormatData(dataSet) {


        if (dataSet.effDateFrom != null && dataSet.effDateFrom != "")
            dataSet.effDateFrom = dataSet.effDateFrom.split('T')[0];
        if (dataSet.effDateTo != null && dataSet.effDateTo != "")
            dataSet.effDateTo = dataSet.effDateTo.split('T')[0];
        if (dataSet.occDateFrom != null && dataSet.occDateFrom != "")
            dataSet.occDateFrom = dataSet.occDateFrom.split('T')[0];
        if (dataSet.occDateTo != null && dataSet.occDateTo != "")
            dataSet.occDateTo = dataSet.occDateTo.split('T')[0];
    }


    function setLastAppointmentFutureDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;

    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    return (
        <>
            <Grid container>
                <Scrollbars style={{ height: 575 }}>
                    <Grid item lg={12} container direction="row">
                        <div style={{ paddingRight: "20px", width: "100%" }}>
                            <FormGroupTitle>Tobacco & Alcohol use</FormGroupTitle>

                            <Grid container direction="row" lg={12}>
                                {/* {showAddTobacco ? */}
                                <>
                                    <Grid item xs={4} sm={4} md={4} lg={4} >
                                        <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                            <Label title="Tobacco Status" size={4} mandatory={true} />
                                            <Grid item xs={8} sm={8} md={8} lg={8} >
                                                <SelectField
                                                    id="tobaccoStatus"
                                                    name="tobaccoStatusCode"
                                                    value={tobaccoHistoryState.tobaccoStatusCode}
                                                    placeholder="Select Tobacco Status"
                                                    options={tobaccoStatusCode}
                                                    onChange={handleChangeTobacco}
                                                    inputProps={{ ref: input => socialHistoryRef.tobaccoStatusRef = input }}
                                                />
                                                {errorMessages.errorTobaccooListCount && (!state.socialHisTobaccoLst || state.socialHisTobaccoLst.length === 0) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please add at least 1 tobacco status
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} >
                                        <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                            <CustomLabel title="From" size={3} />
                                            <Grid item xs={8} sm={8} md={8} lg={8} >
                                                <InputBaseField
                                                    id="tobaccoStatusfrom"
                                                    name="effDateFrom"
                                                    type="date"
                                                    value={tobaccoHistoryState.effDateFrom}
                                                    onChange={handleChangeSocialHistory}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} >
                                        <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                            <CustomLabel title="To" size={2} />
                                            <Grid item xs={8} sm={8} md={8} lg={8} >
                                                <InputBaseField
                                                    id="tobaccoStatusto"
                                                    name="effDateTo"
                                                    type="date"
                                                    value={tobaccoHistoryState.effDateTo}
                                                    onChange={handleChangeSocialHistory}
                                                />
                                            </Grid>
                                            <Grid item xs={1} sm={1} md={1} lg={1} >
                                                <span className={classes.addNew} title={"Add"}>{isEditable ? <img src={AddIcon} alt="Add" onClick={() => addTobacco()} />:''}</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                                {/* //:
                                <>
                                        <Grid item xs={1} sm={1} md={1} lg={1} />
                                        <Grid item xs={4} sm={4} md={4} lg={4} >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.addNewButton}
                                                startIcon={<img src={AddIcon} />}
                                                onClick={() => setShowAddTobacco(true)}
                                            >
                                                Add Tobacco Status
                                            </Button>
                                        </Grid>
                                    </> */}

                            </Grid>
                            {!state.socialHisTobaccoLst ?
                                <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" /> : ""
                            }
                            { state?.socialHisTobaccoLst && state.socialHisTobaccoLst?.length>0 && 
                            <Grid container direction="row" lg={12}>
                                <Grid item lg={1}/>
                                <Grid item lg={10}>
                                <table className={classes.tablelayout}>
                                    <thead>
                                        <tr>
                                            <th>Tobacco Status</th>
                                            <th >From</th>
                                            <th >To</th>
                                            <th style={{textAlign:"center"}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            state.socialHisTobaccoLst.map((item, index) => {
                                                state.tobaccoStatusCodeDisplay = item.tobaccoStatusCode == null ? null : item.tobaccoStatusCode.split('_') ? item.tobaccoStatusCode.split('_').join(' ') : item.tobaccoStatusCode;
                                                return <tr>
                                                    <td>{state.tobaccoStatusCodeDisplay}</td>
                                                    <td >{item.effDateFrom ? new Date(item.effDateFrom).toLocaleDateString("en-US") : ""}</td>
                                                    <td>{item.effDateTo ? new Date(item.effDateTo).toLocaleDateString("en-US") : ""}</td>
                                                    <td>
                                                        {isEditable ? <span className={classes.tobaccoActionBtns}>

                                                            <span className={classes.editdeleteIcon} title={"Edit"}><img src={EraseIcon} alt="Edit" onClick={() => handleSocialHistoryTobaccoEdit(index)} /></span>
                                                            <span className={classes.editdeleteIcon} title={"Delete"}><img src={DeleteIcon} alt="Delete" onClick={() => handleToboccoHistoryDelete(index)} /></span>
                                                        </span> : ''}
                                                       
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                                </Grid>
                                <Grid item lg={1}/>
                            </Grid>
                            }

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />

                            <Grid container direction="row" lg={12}>
                                <Label title="Alcohol Usage" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <RadioboxField
                                        id="alcoholUsage"
                                        name="alcoholUsage"
                                        value={state.alcoholUsage}
                                        options={alcohalList}
                                        labelPlacement="end"
                                        onChange={handleCheckBoxChange}
                                    />
                                </Grid>

                                <Label title="Frequency" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="alcoholUsageFreq"
                                        placeholder="Select frequency"
                                        name="alcoholUsageFreq"
                                        value={state.alcoholUsageFreq}
                                        options={alcoholUsageFrequency}
                                        onChange={handleChange}
                                        Disabled={!state.alcoholUsage}
                                    />
                                    {/* <InputBaseFieldNumber
                                        type="number"
                                        id="alcoholUsageFrequency"
                                        name="alcoholUsageFreq"
                                        value={state.alcoholUsageFreq}
                                        onChange={handleChange}
                                    /> */}
                                </Grid>
                            </Grid>

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />

                            <Grid container direction="row" lg={12}>
                                <Label title="Caffeine Usage" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <RadioboxField
                                        id="caffeineUsage"
                                        name="caffeineUsage"
                                        value={state.caffeineUsage}
                                        options={radioBoxList}
                                        labelPlacement="end"
                                        onChange={handleCheckBoxChange}
                                    />
                                </Grid>

                                <Label title="Frequency" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="caffeineUsageFreq"
                                        placeholder="Select frequency"
                                        name="caffeineUsageFreq"
                                        value={state.caffeineUsageFreq}
                                        options={caffeineUsageFrequency}
                                        onChange={handleChange}
                                        Disabled={!state.caffeineUsage}
                                    />
                                    {/* <InputBaseFieldNumber
                                        type="number"
                                        id="caffineUsageFrequency"
                                        name="caffeineUsageFreq"
                                        value={state.caffeineUsageFreq}
                                        onChange={handleChange}
                                    /> */ }
                                </Grid>
                            </Grid>

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />


                            <Grid container direction="row" lg={12}>
                                <Label title="Drug Usage" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="drugUsage"
                                        placeholder="Select Drug Usage"
                                        name="drugUsageCode"
                                        value={state.drugUsageCode}
                                        options={drugUsageCode}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Drug Use Details" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        Disabled={state.drugUsageCode == "Never"}
                                        id="drugUseDetails"
                                        placeholder="Select Drug Use Details"
                                        name="drugUsageDetailCode"
                                        value={state.drugUsageDetailCode}
                                        options={drugUsageDetail}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Competent to Administrated Meds" isTextAreaInput={true} size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Competent to Administered Meds"
                                        onChange={handleChange}
                                        name="compToAdministerMedicine"
                                        value={state.compToAdministerMedicine}
                                        MaxLength="50"
                                    />
                                </Grid>
                            </Grid>

                            <FormGroupTitle>Marital & Sexual Status</FormGroupTitle>

                            <Grid container direction="row" lg={12}>
                                <Label title="Marital Status" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="meritalStatus"
                                        placeholder="Select Marital Status"
                                        name="maritalStatusCode"
                                        value={state.maritalStatusCode}
                                        options={maritalStatusCode}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Label title="Children" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <InputBaseFieldNumber
                                        type="number"
                                        id="children"
                                        name="noOfChild"
                                        value={state.noOfChild}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Sexual Orientation" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="sexualOrientation"
                                        placeholder="Select Sexual Orientation"
                                        name="sexualOrientationCode"
                                        value={state.sexualOrientationCode}
                                        options={sexualOrientationCodes}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <FormGroupTitle>Personal Info</FormGroupTitle>

                            <Grid container direction="row" lg={12}>
                                <Label title="Highest Education" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="highestEducation"
                                        name="highestEducationCode"
                                        placeholder="Select Highest Education"
                                        value={state.highestEducationCode}
                                        options={socailHistoryEducations}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />

                            <Grid container direction="row" lg={12}>
                                <Label title="Industry" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="industry"
                                        name="industyCode"
                                        placeholder="Select Industry"
                                        value={state.industyCode}
                                        options={socialHistoryIndustries}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Effective From" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <InputBaseField
                                        type="date"
                                        id="effectiveFrom"
                                        name="effDateFrom"
                                        value={state.effDateFrom}
                                        onChange={handleChange}
                                        maxDate={setLastAppointmentFutureDate()}
                                    />
                                </Grid>

                                <Label title="Effective To" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <InputBaseField
                                        type="date"
                                        id="effectiveTo"
                                        name="effDateTo"
                                        value={state.effDateTo}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />

                            <Grid container direction="row" lg={12}>
                                <Label title="Occupation" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="occupation"
                                        placeholder="Select Occupation"
                                        name="occupationCode"
                                        value={state.occupationCode}
                                        options={socialHistoryOccupations}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Effective From" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <InputBaseField
                                        type="date"
                                        id="occDateFrom"
                                        name="occDateFrom"
                                        value={state.occDateFrom}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Label title="Effective To" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <InputBaseField
                                        type="date"
                                        id="occDateTo"
                                        name="occDateTo"
                                        value={state.occDateTo}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" />

                            <Grid container direction="row" lg={12}>
                                <Label title="Residence Type" size={2} />
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <SelectField
                                        id="residenceType"
                                        name="residenceTypeCode"
                                        placeholder="Select Residence Type"
                                        value={state.residenceTypeCode}
                                        options={residenceTypeCode}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12} >
                                <Label title="Additional Info" isTextAreaInput={true} size={2} />
                                <Grid item xs={10} sm={10} md={10} lg={10}>
                                    <TextareaField
                                        rowsMin={5}
                                        name="additionalInfo"
                                        placeholder="Additional Info"
                                        value={state.additionalInfo}
                                        onChange={handleChange}
                                        MaxLength={2000}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <FooterBtn className={classes.footerBtn}>
                        <FormBtn id="save" disabled={ !isEditable} onClick={saveSocialHistory}>Save</FormBtn>
                        {/* <FormBtn id="save" onClick={handleNext} btnType="next"> Next</FormBtn> */}
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>

                    </FooterBtn>
                </Grid>
            </Grid>
            <LogDialog
                code="socialhistory"
                id={state.socialHistoryId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
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

        </>

    );
}

export default withSnackbar(SocialHistory)