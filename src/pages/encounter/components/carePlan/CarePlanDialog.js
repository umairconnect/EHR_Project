import React, { useState, useEffect, useRef } from "react";
import {
    Tooltip,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField, CheckboxField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import EditIcon from '../../../../images/icons/erase.png';
import DeleteIcon from '../../../../images/icons/trash.png';
import AddIcon from '../../../../images/icons/add-icon.png';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { formatDate } from '../../../../components/Common/Extensions';



function CarePlanDialog({ showHideDialog, handleClose, patientId, userLocationId, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const scrollbars = useRef(null);
    const [carePlanStatusList, setCarePlanStatusList] = useState([]);

    const carePlanRef = useState({ carePlanGoalRef: "", carePlanStartDateRef: "", });

    const [defaultAttributes] = useState({
        carePlanId: 0, encounterId: props.encounterId, goal: "", healthConcernType: "Diagnosis",
        startDate: new Date().toISOString().split('T')[0], endDate: null,
        evaluationOutcome: "", patientPriorityCode: "", carePlanTeam: "", status: "",
        careTeamList: [], carePlanInterventionList: [], healthConcernsList: [], patientId: patientId,
        careTeamOption: "Provider"
    });

    const [carePlanState, setCarePlanState] = useState(defaultAttributes);

    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });

    const [healthConcernOption, setHealthConcernOption] = useState(
        [
            { value: "Diagnosis", label: "Diagnosis" },
            { value: "Health_Concerns", label: "Health Concerns" },
            { value: "Vitals", label: "Vitals" }
        ]
    );
    const [healthConcernsList, setHealthConcernsList] = useState([]);
    const [healthConcernDDLOptions] = useState([
        { value: "Allergy", label: "Allergy" },
        { value: "Diagnosis", label: "Diagnosis" },
        { value: "Vitals", label: "Vitals" }
    ]);
    const [carePlanInterventionList, setCarePlanInterventionList] = useState([]);
    const [careTeamList, setCareTeamList] = useState([]);
    const [careTeamOption, setCareTeamOption] = useState([
        { value: "Provider", label: "Provider" },
        { value: "Relative", label: "Relative" }

    ])
    const [addIntervationList, setAddIntervationList] = useState([{ intervationValue: "" }]);

    const init = () => {
        setCarePlanState(defaultAttributes)
        setHealthConcernsList([]);
        setCarePlanInterventionList([]);
        setCareTeamList([]);
    }

    useEffect(() => {
        init();
        if (showHideDialog) {
            //getDiagnosisList();
            getDropdownsDataList();

            if (props.carePlanId > 0)
                setCarePlanFormData();

            setErrorMessages({
                errorCarePlanType: false, errorStatrDate: false, errorInstructions: false
            });


        }

    }, [showHideDialog]);


    const getDropdownsDataList = e => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['care_plan_status']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _statusList = [];
                result.data.map((item, i) => {
                    _statusList.push({ value: item.text1, label: item.text2 });
                });
                setCarePlanStatusList(_statusList);
                setCarePlanState(prevState => ({
                    ...prevState,
                    'status': 'InProgress'//_statusList[0].value
                }));

            }
        });
    }
    const setCarePlanFormData = e => {

        let procData = {
            carePlanId: props.carePlanId
        }

        PostDataAPI("CarePlan/getCarePlanByID", procData).then((result) => {

            if (result.success && result.data) {
                //result.data.status = result.data.status == true ? 'Active' : 'In-Active';
                result.data.startDate = result.data.startDate ? result.data.startDate.split("T")[0] : null;
                result.data.endDate = result.data.endDate ? result.data.endDate.split("T")[0] : null;
                result.data.careTeamOption = "Provider";
                setCarePlanState(result.data);
                setHealthConcernsList(result.data.healthConcernsList);
                setCareTeamList(result.data.careTeamList);
                setCarePlanInterventionList(result.data.carePlanInterventionList);

            }
            else {
                //setCarePlanState({
                //    carePlanId: 0, encounterID: props.encounterId, carePlanType: "", isIntervention: false,
                //    startDate: new Date().toISOString().split('T')[0],
                //    healthStatus: false, patientPriorityCode: "", providerPriorityCode: "", status: "", value: "", instructions: "",
                //    carePlanDiagnosisList: []
                //});

                //setCarePlaneDiagnosisState({
                //    carePlanDiagnosisID: 0, carePlanID: 0, codeType: "SNOMED", code: "", name: ""
                //});
            }
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarePlanState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (true) {

        }
    }

    const handleChangeCode = (e) => {
        
        const { name, value } = e.target;
        if (healthConcernsList.some(obj => obj.healthConcernType == carePlanState.healthConcernType && obj.code == value && obj.isDeleted == false)) {
            showMessage("Error", 'Health concern already selected.', "error", 3000);
            return;
        }
        const selectedText = e.target.options[e.target.selectedIndex].text;
        let _healthConcernsList = [...healthConcernsList];
        _healthConcernsList.push({ 'code': value, 'name': selectedText, 'healthConcernType': carePlanState.healthConcernType, isDeleted: false });
        setHealthConcernsList(_healthConcernsList);
    }
    const handleSearchChangeCode = (name, item) => {
        
        const { id, value } = item;
        if (!value || value == '') {
            return;
        }
        if (healthConcernsList.some(obj => obj.healthConcernType == carePlanState.healthConcernType && obj.code == id && obj.isDeleted == false)) {
            setCarePlanState(prevState => ({
                ...prevState,
                healthConcernTypeCode: id,
                healthConcernTypeName: value
            }));
            showMessage("Error", 'Health concern already selected.', "error", 3000);
            setTimeout(function () {
                setCarePlanState(prevState => ({
                    ...prevState,
                    healthConcernTypeCode: '',
                    healthConcernTypeName: ''
                }));
            }, 100);
            return;
        }
        setCarePlanState(prevState => ({
            ...prevState,
            healthConcernTypeCode: id,
            healthConcernTypeName: value
        }));
        let _healthConcernsList = [...healthConcernsList];
        _healthConcernsList.push({ 'code': id, 'name': value, 'healthConcernType': carePlanState.healthConcernType, isDeleted: false });
        setHealthConcernsList(_healthConcernsList);
        setTimeout(function () {
            setCarePlanState(prevState => ({
                ...prevState,
                healthConcernTypeCode: '',
                healthConcernTypeName: ''
            }));
        }, 100);
    }

    const handleSearchChange = (name, item) => {
        const { id, value } = item;
        if (!value || value == '') {
            return;
        }
        if (careTeamList.some(obj => obj.typeCode == carePlanState.careTeamOption && obj.careTeamName == value && obj.isDeleted == false)) {
            setCarePlanState(prevState => ({
                ...prevState,
                careTeamName: value
            }));
            showMessage("Error", 'Care Team already selected.', "error", 3000);
            setTimeout(function () {
                setCarePlanState(prevState => ({
                    ...prevState,
                    careTeamName: ''
                }));
            }, 100);
            return;
        }
        setCarePlanState(prevState => ({
            ...prevState,
            careTeamName: value
        }));

        let obj = {
            typeCode: carePlanState.careTeamOption,
            userId: parseInt(id),
            careTeamName: value,
            isDeleted: false
            //typeCode : value
        }
        let _careTeamList = [...careTeamList];
        _careTeamList.push(obj);
        setCareTeamList(_careTeamList);

        setTimeout(function () {
            setCarePlanState(prevState => ({
                ...prevState,
                careTeamName: ''
            }));
        }, 100);

    }

    const handleAddIntervention = () => {
        if (carePlanState.intDescription && carePlanState.intDescription.trim().length > 0) {
            if (carePlanInterventionList.some(t => t.description == carePlanState.intDescription && t.isDeleted ==false)) {
                showMessage("Error", 'Care plan intervention already added.', "error", 3000);
                return;
            }
            let _carePlanInterventionList = [...carePlanInterventionList];
            _carePlanInterventionList.push({ 'description': carePlanState.intDescription, isDeleted: false });
            setCarePlanInterventionList(_carePlanInterventionList);
            //carePlanState.carePlanInterventionList.push({ 'description': carePlanState.intDescription });
            setCarePlanState(prevState => ({
                ...prevState,
                ['intDescription']: ''
            }));
        }
    }
    const saveCarePlan = (e) => {

        e.preventDefault();

        let errorList = []

        if (!carePlanState.goal || carePlanState.goal.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGoal: true
            }));
            errorList.push(true);
            carePlanRef.carePlanGoalRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGoal: false
            }));
        }
        if (!carePlanState.startDate || carePlanState.startDate.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatrDate: true
            }));
            errorList.push(true);
            carePlanRef.carePlanStartDateRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatrDate: false
            }));
        }

        if (!healthConcernsList || healthConcernsList.filter(o => o.isDeleted == false).length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernList: true
            }));
            errorList.push(true);
            //carePlanRef.carePlanTypeRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernList: false
            }));
        }

        if (!carePlanInterventionList || carePlanInterventionList.filter(o => o.isDeleted == false).length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInterventionList: true
            }));
            //const scrollHeight = scrollbars.current.getScrollHeight();
            //scrollbars.current.scrollTop(scrollHeight + 10);
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInterventionList: false
            }));
        }

        if (errorList.length < 1) {
            let method = "carePlan/addUpdateCarePlan";

            //carePlanState.carePlanDiagnosisList.push(carePlaneDiagnosisState)
            carePlanState.careTeamList = careTeamList;
            carePlanState.carePlanInterventionList = carePlanInterventionList;
            carePlanState.healthConcernsList = healthConcernsList;

            //carePlanState.status = carePlanState.status == 'Active' ? true : false;
            carePlanState.patientId = parseInt(carePlanState.patientId);

            PostDataAPI(method, carePlanState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);

                    //getEncounterList();
                    handleClose();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    //setIsOpenEncounterDialog(true);
                }
            })

        }
        else {
            e.preventDefault();
        }
    }
    const handleDeleteIntervention = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = carePlanInterventionList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setCarePlanInterventionList(updatedList);
        });
    }
    const handleDeleteHealthConcern = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = healthConcernsList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setHealthConcernsList(updatedList);
        });
    }
    const handleDeleteCareTeam = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = careTeamList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setCareTeamList(updatedList);
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

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}>

            <div className={classes.DialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>Care Plan</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Scrollbars style={{ minHeight: "500px", height: "85%" }} ref={scrollbars} className={classes.CareplanScroll}>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Goal" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            type="text"
                                            id="goal"
                                            name="goal"
                                            value={carePlanState.goal}
                                            onChange={handleChange}
                                            MaxLength="200"
                                            inputProps={{ ref: input => carePlanRef.carePlanGoalRef = input }}
                                        />
                                        {errorMessages.errorGoal && (!carePlanState.goal || carePlanState.goal.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter care plan goal
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Start Date" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={carePlanState.startDate}
                                            onChange={handleChange}
                                            inputProps={{ ref: input => carePlanRef.carePlanStartDateRef = input }}
                                        />

                                        {errorMessages.errorStatrDate && (!carePlanState.startDate || carePlanState.startDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please select date
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                </Grid>


                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.lableTitleInput}>

                                    <FormGroupTitle>Health Concern</FormGroupTitle>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={9} md={9} lg={9} xl={9}>

                                        <RadioboxField
                                            id="healthConcernType"
                                            name="healthConcernType"
                                            labelPlacement="end"
                                            onChange={handleChange}
                                            options={healthConcernOption}
                                            value={carePlanState.healthConcernType}

                                        />

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Search" size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        {carePlanState.healthConcernType == 'Diagnosis' ?
                                            <SearchList
                                                id="healthConcernTypeCode"
                                                name="healthConcernTypeCode"
                                                code={'ICD'}
                                                apiUrl="ddl/loadItems"
                                                searchTerm={carePlanState.healthConcernTypeName}
                                                //searchId={userLocationId}
                                                value={carePlanState.healthConcernTypeName}
                                                onChangeValue={(name, item) => handleSearchChangeCode(name, item)}
                                                placeholderTitle="Search health concern"
                                                reload={true}
                                            /> :
                                            (carePlanState.healthConcernType == 'Health_Concerns' ?
                                                <SelectField
                                                    id="healthConcernTypeCode"
                                                    name="healthConcernTypeCode"
                                                    placeholder={"Search"}
                                                    options={healthConcernDDLOptions}
                                                    value={carePlanState.healthConcernTypeCode}
                                                    onChange={handleChangeCode}

                                                />
                                                :
                                                <SearchList
                                                    id="healthConcernTypeCode"
                                                    name="healthConcernTypeCode"
                                                    code={'all_vitals'}
                                                    apiUrl="ddl/loadItems"
                                                    searchTerm={carePlanState.healthConcernTypeName}
                                                    //searchId={userLocationId}
                                                    value={carePlanState.healthConcernTypeName}
                                                    onChangeValue={(name, item) => handleSearchChangeCode(name, item)}
                                                    placeholderTitle="Search health concern"
                                                    reload={true}
                                                />)
                                        }

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>


                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {errorMessages.errorHealthConcernList && (!healthConcernsList || healthConcernsList.filter(o => o.isDeleted == false).length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                            Please add at least one health concern
                                        </FormHelperText>) : ('')}
                                        <table className={classes.tablelayout}>
                                            <thead>
                                                <tr>
                                                    <th>Description</th>
                                                    <th style={{ textAlign: "right" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    healthConcernsList && healthConcernsList.length > 0 ?
                                                        healthConcernsList.map((item, i) => {
                                                            if (item.isDeleted == true) {
                                                                return '';
                                                            }
                                                            else {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.name}</td>

                                                                        <td style={{ textAlign: "right" }}>

                                                                            <div className={classes.actionIcons} title="Delete">
                                                                                <Tooltip title="Delete">
                                                                                    <img src={DeleteIcon} alt="delete" onClick={() => { handleDeleteHealthConcern(i) }} />
                                                                                </Tooltip>
                                                                            </div>

                                                                        </td>

                                                                    </tr>
                                                                )
                                                            }
                                                        })
                                                        : <tr>
                                                            <td colSpan="2">
                                                                <p style={{ color: "#1d1d1d40", padding: "11px", marginBottom: "0", textAlign: "center" }}>
                                                                    No health concerns
                                                                </p>
                                                            </td>
                                                        </tr>}
                                            </tbody>
                                        </table>
                                    </Grid>

                                </Grid>
                                <br></br>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.lableTitleInput}>

                                    <FormGroupTitle>Intervention</FormGroupTitle>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="Add Interventions" size={3} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <InputBaseField
                                            id="intDescription"
                                            name="intDescription"
                                            value={carePlanState.intDescription}
                                            onChange={handleChange}
                                            placeholder="Add Intervention"
                                            MaxLength="500"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2} className={classes.actionIcons}>
                                        <Tooltip title="Add Intervention">
                                            <img style={{ position: "relative", top: "7px" }} src={AddIcon} alt="Add Intervention" onClick={handleAddIntervention} />
                                        </Tooltip>
                                    </Grid>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {errorMessages.errorInterventionList && (!carePlanInterventionList || carePlanInterventionList.filter(o => o.isDeleted == false).length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                            Please add at least one intervention
                                        </FormHelperText>) : ('')}
                                        <table className={classes.tablelayout}>
                                            <thead>

                                                <tr>
                                                    <th>Intervention</th>
                                                    <th style={{ textAlign: "right" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carePlanInterventionList && carePlanInterventionList.length > 0 ?
                                                    carePlanInterventionList.map((item, i) => {
                                                        if (item.isDeleted == true) {
                                                            return '';
                                                        }
                                                        else {
                                                            return (
                                                                <tr>
                                                                    <td>{item.description}</td>
                                                                    <td style={{ textAlign: "right" }}>

                                                                        <div className={classes.actionIcons} title="Delete">

                                                                            <Tooltip title="Delete">
                                                                                <img src={DeleteIcon} alt="delete" onClick={() => { handleDeleteIntervention(i) }} />
                                                                            </Tooltip>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    }) : <tr>
                                                        <td colSpan="2">
                                                            <p style={{ color: "#1d1d1d40", padding: "11px", marginBottom: "0", textAlign: "center" }}>
                                                                No interventions
                                                            </p>
                                                        </td></tr>}
                                            </tbody>
                                        </table>
                                    </Grid>

                                </Grid>



                                <br></br>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.lableTitleInput}>

                                    <FormGroupTitle>Care Team</FormGroupTitle>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={9} md={9} lg={9} xl={9}>

                                        <RadioboxField
                                            id="careTeamOption"
                                            name="careTeamOption"
                                            labelPlacement="end"
                                            onChange={handleChange}
                                            options={careTeamOption}
                                            value={carePlanState.careTeamOption}

                                        />

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {carePlanState.careTeamOption == "Provider" ?
                                        <>
                                            <Label title="Search" size={3} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <SearchList
                                                    id="careTeamName"
                                                    name="careTeamName"
                                                    code={"providers_by_user_location"}
                                                    apiUrl="ddl/loadItems"
                                                    searchTerm={carePlanState.careTeamName}
                                                    searchId={userLocationId}
                                                    value={carePlanState.careTeamName}
                                                    onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                    placeholderTitle="Search Provider"
                                                    reload={true}
                                                />

                                            </Grid>
                                        </> : <>
                                            <Label title="Search" size={3} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <SearchList
                                                    id="careTeamName"
                                                    name="careTeamName"
                                                    code={"get_patient_contacts"}
                                                    apiUrl="ddl/loadItems"
                                                    searchTerm={carePlanState.careTeamName}
                                                    searchId={patientId}
                                                    value={carePlanState.careTeamName}
                                                    onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                    placeholderTitle="Search Relative"
                                                    reload={true}
                                                />

                                            </Grid>

                                        </>

                                    }

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>


                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <table className={classes.tablelayout}>
                                            <thead>
                                                <tr>
                                                    <th>Care Team</th>
                                                    <th style={{ textAlign: "right" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    careTeamList && careTeamList.length > 0 ?
                                                        careTeamList.map((item, i) => {
                                                            if (item.isDeleted == true) {
                                                                return '';
                                                            }
                                                            else {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.careTeamName}</td>
                                                                        <td style={{ textAlign: "right" }}>

                                                                            <div className={classes.actionIcons} title="Delete">
                                                                                <Tooltip title="Delete">
                                                                                    <img src={DeleteIcon} alt="delete" onClick={() => { handleDeleteCareTeam(i) }} />
                                                                                </Tooltip>
                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }) : <tr>
                                                            <td colSpan="2">
                                                                <p style={{ color: "#1d1d1d40", padding: "11px", marginBottom: "0", textAlign: "center" }}>
                                                                    No care team
                                                                </p>
                                                            </td></tr>}
                                            </tbody>
                                        </table>
                                    </Grid>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Status" size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <SelectField
                                            placeholder="Select Status"
                                            id="status"
                                            name="status"
                                            options={carePlanStatusList}
                                            value={carePlanState.status}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                {carePlanState.status == 'Completed' ?
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="End Date" size={3} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <InputBaseField
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={carePlanState.endDate}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    : ''}
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="Evaluation & Outcome" size={3} style={{ alignItems: "baseline" }} />
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                        <TextareaField
                                            rowsMin={5}
                                            placeholder="Reason Of Visit"
                                            onChange={handleChange}
                                            name="evaluationOutcome"
                                            value={carePlanState.evaluationOutcome}

                                            MaxLength="2000"
                                        />

                                    </Grid>

                                </Grid>
                            </Scrollbars>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid container direction="row" xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid container direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={9} md={9} lg={9} xl={9}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={saveCarePlan}> Save</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>

                </div>
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
        </Dialog>
    )

}
export default withSnackbar(CarePlanDialog)
