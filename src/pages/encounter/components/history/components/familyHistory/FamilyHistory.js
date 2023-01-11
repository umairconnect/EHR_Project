import React, { useState, useEffect } from "react";
import { FormHelperText, Tooltip, InputBase } from "@material-ui/core";
// styles
import useStyles from "./styles";
import "../styles.css";
import { FormLabel, Grid, Typography, Icon, Button } from '@material-ui/core';
import EraseIcon from "../../../../../../images/icons/erase.png";
import DeleteIcon from "../../../../../../images/icons/trash.png";
import AddIcon from '../../../../../../images/icons/add-icon.png';
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
// import { Search as SearchIcon } from "@material-ui/icons";
// import LockIcon from '@material-ui/icons/Lock';
import { FooterBtn, FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements";
import { TextareaField, RadioboxField, CheckboxField, InputBaseFieldNumber } from "../../../../../../components/InputField";
import { SelectField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
//import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { Scrollbars } from 'rc-scrollbars';
import { PostDataAPI } from '../../../../../../Services/APIService';
import SearchList from "../../../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { Empty, Table } from "antd";
import "../../../../../../components/antd.css";
import "../../../../../../components/SearchGrid/antStyle.css";

function FamilyHistory({ handleClose, handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    // handle styles
    var classes = useStyles();
    const [isEditable] = useState(props.isEditable)
    //Ref
    // const [nameRef, setNameRef] = useState();
    const familyHistoryRef = useState({ relationshipRef: "", nameRef: "" });

    const [relationshipCodes, setRelationshipCodes] = useState([]);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [showAddamilyHistory, setShowAddamilyHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [patientId, setPatientId] = useState(props.patientId);
    const [errorMessages, setErrorMessages] = useState({
        errorRelationShip: false, errorName: false, errorDiagnosis: false, errorAge: false
    })
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const [update, setUpdate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditFamilyHistoryId, setIsEditFamilyHistoryId] = useState(0);

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);

    const [columnData, setColumnData] = useState([
        {
            label: '',
            field: 'familyHistoryId',
            width: 270,
            hidden: true
        },
        {
            label: 'Relationship',
            field: 'relationshipCode',
            width: 270
        },
        {
            label: 'Status',
            field: 'status',
            width: 150
        },
        {
            label: 'Diagnosis',
            field: 'diagnosisName',
            width: 270
        },
        {
            label: '',
            field: 'action',
            width: 100
        },
    ]);
    const familyHistoryDialogColumns = [
        {
            title: '',
            dataIndex: 'familyHistoryId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Relationship',
            dataIndex: 'relationshipCode',
            className: "width150",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width150",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        }
    ];
    const [state, setState] = useState({
        familyHistoryId: 0, patientId: parseInt(patientId), noFamilyHistory: false, relationshipCode: "", name: "", isAlive: true,
        age: null, additionalInfo: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(),
        familyHisDiagnosisLst: []
    });

    const [diagnosisState, setDiagnosisState] = useState({
        familyHisDiagnosisId: 0, familyHistoryId: 0, diagnosisCode: "", diagnosisName: "", onsetAge: "",
        isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
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

    const radioBoxList = [
        { value: true, label: "Alive" },
        { value: false, label: "Dead" },
    ];
    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeDiagnosis = e => {

        const { name, value } = e.target;

        setDiagnosisState(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }));
    };

    const handleCheckBoxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    };
    const tableData = {
        columns: columnData,
        rows: rowsData,
    };


    useEffect(() => {

        loadData();
        initialization();

    }, [loading.isSaving, loading.isDeleting]);

    function initialization() {

        var params = {
            code: "DDL_List_Item",
            parameters: ['relationship_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setRelationshipCodes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })

    }

    const loadData = () => {
        setIsLoading(true);

        PostDataAPI("patient/familyHistory/getPatientFamilyHistoryGrid", patientId).then((result) => {
            setIsLoading(false);
            if (result.success) {

                if (result.data.length > 0) {

                    setIsDataExists(true);
                    if (result.data[0].noFamilyHistory === true) {
                        setIsEditFamilyHistoryId(result.data[0].familyHistoryId);
                        setIsEdit(true);
                        setState(prevState => ({
                            ...prevState,
                            noFamilyHistory: true
                        }));
                    }
                }
                else {

                    setIsEditFamilyHistoryId(0);
                    setIsDataExists(false);
                    setIsEdit(false);
                    setState(prevState => ({
                        ...prevState,
                        noFamilyHistory: false
                    }));
                }

                setRowsData(
                    result.data.map((item, i) => {
                        item.action = <div style={{ width: "48px" }}>
                            <Icon> <img src={EraseIcon} className={classes.Icon} onClick={() => editRecord(item.familyHistoryId)} /> </Icon>
                            <Icon> <img src={DeleteIcon} className={classes.Icon} onClick={() => deleteRecord(item.familyHistoryId)} /> </Icon>
                        </div>
                        return { ...item }
                    }));
            }
        });
    };

    function deleteRecord(familyHistoryID) {


        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Family History?", "confirm", function () {

            var data = {
                familyHistoryId: familyHistoryID
            }

            setLoading({ isDeleting: true });

            PostDataAPI("patient/familyHistory/delete", data, true).then((result) => {

                setLoading({ isDeleting: false });

                if (result.success) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setIsEdit(false);
                    setIsEditFamilyHistoryId(0);
                    handleSave();

                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }

            })

        });
    }

    function editRecord(familyHistoryID) {

        setIsEdit(true);
        setIsEditFamilyHistoryId(familyHistoryID);

        PostDataAPI("patient/familyHistory/getPatientFamilyHistory", familyHistoryID, false).then((result) => {

            if (result.success) {

                setState(result.data);

            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }

        })

    }

    function deleteRecordOnEdit() {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Family History?", "confirm", function () {

            var data = {
                familyHistoryId: isEditFamilyHistoryId
            }

            setLoading({ isDeleting: true });

            PostDataAPI("patient/familyHistory/delete", data, true).then((result) => {

                setLoading({ isDeleting: false });

                if (result.success) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setIsEdit(false);
                    setIsEditFamilyHistoryId(0);
                    clearValues();
                    loadData();
                    handleSave();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }

            })

        });
    }

    const handleSearchFamilyHistoryDiagnoses = (name, item) => {

        const { id, value } = item;

        setDiagnosisState(prevState => ({
            ...prevState,
            diagnosisCode: id,
            diagnosisName: value
        }));

        setErrorMessages(prevState => ({
            ...prevState,
            errorDiagnosis: false
        }));
    }

    function addDiagnosis(isCall) {

        let _diagnosisArray = [];



        if (diagnosisValidations()) {
            // Get List

            if (state.familyHisDiagnosisLst) {
                if (state.familyHisDiagnosisLst.length > 0) {


                    state.familyHisDiagnosisLst.map((item, i) => {

                        if (diagnosisState.editIndex === i) {
                        }
                        else {

                            _diagnosisArray.push({
                                familyHisDiagnosisId: item.familyHisDiagnosisId, familyHistoryId: item.familyHistoryId, diagnosisCode: item.diagnosisCode,
                                diagnosisName: item.diagnosisName, onsetAge: parseInt(item.onsetAge) ? parseInt(item.onsetAge) : null, isDeleted: item.isDeleted, createdBy: item.createdBy,
                                updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), editIndex: null
                            });
                        }

                    });
                }
            }

            // New // Update

            _diagnosisArray.unshift({
                familyHisDiagnosisId: diagnosisState.familyHisDiagnosisId, familyHistoryId: diagnosisState.familyHistoryId, diagnosisCode: diagnosisState.diagnosisCode,
                diagnosisName: diagnosisState.diagnosisName, onsetAge: parseInt(diagnosisState.onsetAge) ? parseInt(diagnosisState.onsetAge) : null, isDeleted: diagnosisState.isDeleted, createdBy: diagnosisState.createdBy,
                updatedBy: diagnosisState.updatedBy, createDate: diagnosisState.createDate ? diagnosisState.createDate : new Date(), editIndex: null
            });


            // set State
            setState(prevState => ({
                ...prevState,
                familyHisDiagnosisLst: _diagnosisArray
            }));


            // Clear
            clearDianosisState();


            setTimeout(() => {

                setDiagnosisState(prevState => ({
                    ...prevState,
                    diagnosisCode: '',
                    diagnosisName: '',
                    onsetAge: ''
                }));

            }, 100)
        }

    }

    function diagnosisValidations() {

        if (state.familyHisDiagnosisLst) {
            if (state.familyHisDiagnosisLst.filter(tmprm => tmprm.diagnosisCode === diagnosisState.diagnosisCode
                && tmprm.onsetAge === diagnosisState.onsetAge || tmprm.onsetAge === null && diagnosisState.onsetAge == "") == "") {

                if (diagnosisState.diagnosisCode == "" || diagnosisState.diagnosisCode == null) {
                    showMessage("Error", "Please enter diagnosis", "error", 8000);
                    return false;
                }

            }
            else if (diagnosisState.diagnosisCode == "" || diagnosisState.diagnosisCode == null) {
                showMessage("Error", "Please select diagnosis", "error", 8000);
                return false;
            }
            else {
                showMessage("Error", "Diagnosis on the same age onset already exists", "error", 8000);
                return false;
            }

        }

        return true;
    }

    const clearDianosisState = () => {

        setDiagnosisState({
            familyHisDiagnosisId: 0, familyHistoryId: 0, diagnosisCode: "", diagnosisName: "", onsetAge: "",
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
        })
    }

    const clearFamilyHistoryState = () => {

        setState({
            familyHistoryId: 0, patientId: parseInt(patientId), noFamilyHistory: false, relationshipCode: "", name: "", isAlive: true,
            age: "", additionalInfo: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(),
            familyHisDiagnosisLst: state.familyHisDiagnosisLst ? state.familyHisDiagnosisLst.length > 0 ? state.familyHisDiagnosisLst : [] : []
        });
    }

    const handleDiagnosisEdit = (index) => {

        clearDianosisState();
        //clearFamilyHistoryState();

        setTimeout(() => {

            diagnosesEdit(index);

        }, 100)
    }

    function diagnosesEdit(index) {


        setDiagnosisState(prevState => ({
            ...prevState,
            familyHisDiagnosisId: state.familyHisDiagnosisLst[index].familyHisDiagnosisId,
            familyHistoryId: state.familyHisDiagnosisLst[index].familyHistoryId,
            diagnosisCode: state.familyHisDiagnosisLst[index].diagnosisCode,
            diagnosisName: state.familyHisDiagnosisLst[index].diagnosisName,
            onsetAge: parseInt(state.familyHisDiagnosisLst[index].onsetAge) ? parseInt(state.familyHisDiagnosisLst[index].onsetAge) : null,
            isDeleted: state.familyHisDiagnosisLst[index].isDeleted,
            createdBy: state.familyHisDiagnosisLst[index].createdBy,
            updatedBy: state.familyHisDiagnosisLst[index].updatedBy,
            createDate: state.familyHisDiagnosisLst[index].createDate ? state.familyHisDiagnosisLst[index].createDate : new Date(),
            editIndex: index
        }));
    }

    const clearValues = () => {

        setDiagnosisState({
            familyHisDiagnosisId: 0, familyHistoryId: 0, diagnosisCode: "", diagnosisName: "", onsetAge: "",
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
        });

        setState({
            familyHistoryId: 0, patientId: parseInt(patientId), noFamilyHistory: false, relationshipCode: "", name: "", isAlive: true,
            age: "", additionalInfo: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(),
            familyHisDiagnosisLst: []
        });

    }

    const handleDiagnosisDelete = (index) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm", function () {

            if (state.familyHisDiagnosisLst) {
                if (state.familyHisDiagnosisLst[index].familyHisDiagnosisId > 0) {
                    var data = {
                        familyHisDiagnosisId: state.familyHisDiagnosisLst[index].familyHisDiagnosisId
                    }

                    setLoading({ isDeleting: true });

                    PostDataAPI("patient/familyHistory/deleteDiagnose", data, true).then((result) => {

                        setLoading({ isDeleting: false });

                        if (result.success) {

                            showMessage("Success", "Record deleted successfully.", "success", 2000);



                        }
                        else {
                            showMessage("Error", result.message, "error", 8000);
                        }

                    })
                }
            }

            state.familyHisDiagnosisLst.splice(index, 1);

            setState(prevState => ({
                ...prevState,
                familyHisDiagnosisLst: state.familyHisDiagnosisLst
            }));
        });

    }

    function validateFamilyHistory(errorList) {

        if (state.name === null || state.name == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));
            errorList.push(true);
            familyHistoryRef.nameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: false
            }));
        }
        if (state.relationshipCode === null || state.relationshipCode == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRelationShip: true
            }));
            errorList.push(true);
            familyHistoryRef.relationshipRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRelationShip: false
            }));
        }
        if (state.age && (state.age <= 0 || state.age == "0")) {
            showMessage("Error", "Age should be greater than 0", "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorAge: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAge: false
            }));
        }
        if (state.familyHisDiagnosisLst.length === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDiagnosis: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDiagnosis: false
            }));
        }

    }

    const saveFamilyHistory = () => {

        let errorList = [];


        if (!state.noFamilyHistory)
            validateFamilyHistory(errorList);

        if (errorList.length < 1) {

            let method = "patient/familyHistory/add";

            if (state.familyHistoryId > 0) {

                method = "patient/familyHistory/update";
            }

            HandleFormat();
            setLoading({ isSaving: true });

            PostDataAPI(method, state, true).then((result) => {

                setLoading({ isSaving: false });

                if (result.success == true) {

                    if (state.familyHistoryId < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Family History saved successfully.", "success", 3000);
                            setState(result.data);
                            setIsEdit(false);
                            setIsEditFamilyHistoryId(0);
                        }
                    }
                    else if (state.familyHistoryId > 0) {

                        if (result.success) {
                            setShowAddamilyHistory(false);
                            showMessage("Success", "Family History  updated successfully.", "success", 3000);
                            setIsEdit(false);
                            setIsEditFamilyHistoryId(0);
                        }
                    }

                    handleSave();

                }
                else {

                    showMessage("Error", result.message, "error", 3000);

                }
            })
        }

    }

    function HandleFormat() {
        state.age = state.age ? parseInt(state.age) : null;
    }

    const resetFamilyHistory = () => {

        setState(prevState => ({
            ...prevState,
            familyHistoryId: 0,
            patientId: parseInt(patientId),
            noFamilyHistory: false,
            relationshipCode: "",
            name: "",
            isAlive: true,
            age: "",
            additionalInfo: "",
            isDeleted: false,
            createdBy: 0,
            updatedBy: 0,
            createDate: new Date(),
            familyHisDiagnosisLst: [],
        }));

        setDiagnosisState({
            familyHisDiagnosisId: 0, familyHistoryId: 0, diagnosisCode: "", diagnosisName: "", onsetAge: "",
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), editIndex: null
        });

        setErrorMessages({
            errorRelationShip: false, errorName: false, errorDiagnosis: false
        })

        setIsEdit(false);
        setShowAddamilyHistory(true);
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    return (
        <>
            <Grid container >
                <Scrollbars style={{ height: 575 }}>
                    <Grid item lg={12} container direction="row">
                        <div style={{ paddingRight: "20px", width: "100%" }}>
                            <Grid item lg={12} container direction="row">

                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={0} sm={2} md={3} lg={0}></Grid>
                                    <Grid item xs={12} sm={8} md={5} lg={5} >
                                        <CheckboxField
                                            color="primary"
                                            name="noFamilyHistory"
                                            checked={state.noFamilyHistory ? true : false}
                                            onChange={handleCheckBoxChange}
                                            label="No Known Family History"
                                        />
                                    </Grid>
                                </Grid>

                                {showAddamilyHistory || state.familyHistoryId != 0 || state.noFamilyHistory ?
                                    <>
                                        {!state.noFamilyHistory ?
                                            <>
                                                <Grid container direction="row" lg={12}>
                                                    <FormGroupTitle>Add/Edit Family History</FormGroupTitle>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Relationship" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        {/* <TextField
                                                            id="relationship"
                                                            inputRef={el => { setRelationRef(el) }}
                                                            name="relationshipCode"
                                                            value={state.relationshipCode}
                                                            select
                                                            onChange={handleChange}
                                                            className={classes.familyHistoryBaseInput}
                                                            // variant="filled"
                                                            SelectProps={{
                                                                native: true,
                                                            }}
                                                        >
                                                            <option value=""> Select Relationship </option>
                                                             <MenuItem key="" value="">
                                                                Select Relationship
                                                            </MenuItem>) : ('') 
                                                            {relationshipCodes.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </TextField> */}
                                                        <SelectField
                                                            id="relationship"
                                                            name="relationshipCode"
                                                            value={state.relationshipCode}
                                                            placeholder="Select Relationship"
                                                            options={relationshipCodes}
                                                            onChange={handleChange}
                                                            inputProps={{ ref: input => familyHistoryRef.relationshipRef = input }}
                                                        />
                                                        {errorMessages.errorRelationShip && !state.relationshipCode ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select relationship
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Name" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        <InputBase
                                                            id="name"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={state.name}
                                                            type="text"
                                                            inputProps={{ ref: input => familyHistoryRef.nameRef = input }}
                                                            // inputRef={el => { setNameRef(el) }}
                                                            autoComplete="off"
                                                            className={classes.familyHistoryBaseInput}
                                                            onChange={handleChange}
                                                            {...props}

                                                        />
                                                        {/* <InputBaseField
                                                            id="name"
                                                            name="name"
                                                            InputRef={nameRef}
                                                            value={state.name}
                                                            onChange={handleChange}
                                                        /> */}
                                                        {errorMessages.errorName && !state.name ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter name
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Grid item xs={12} sm={3} md={3} lg={3} ></Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                                        <RadioboxField
                                                            name="isAlive"
                                                            value={state.isAlive ? true : false}
                                                            labelPlacement="end"
                                                            onChange={handleCheckBoxChange}
                                                            options={radioBoxList}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Age" size={3} />
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <InputBaseFieldNumber
                                                            placeholder="Age"
                                                            onChange={handleChange}
                                                            name="age"
                                                            value={state.age}
                                                            MaxLength='6'
                                                            MinValue={0}
                                                            MaxValue={1000}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Diagnosis" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={4} md={4} lg={3}>
                                                        <Tooltip
                                                            arrow={false}
                                                            placement="top-start"
                                                            disableFocusListener
                                                            disableTouchListener
                                                            title={diagnosisState.diagnosisName}>
                                                            <span style={{ width: "100%" }}>
                                                                <SearchList
                                                                    name={diagnosisState.diagnosisCode}
                                                                    value={diagnosisState.diagnosisCode}
                                                                    searchTerm={diagnosisState.diagnosisName}
                                                                    code="diagnosis"
                                                                    apiUrl="ddl/loadItems"
                                                                    onChangeValue={(name, item) => handleSearchFamilyHistoryDiagnoses(name, item)}
                                                                    placeholderTitle="Search Diagnosis"
                                                                />
                                                            </span>
                                                        </Tooltip>
                                                        {errorMessages.errorDiagnosis && state.familyHisDiagnosisLst.length === 0 ? (<FormHelperText style={{ color: "red" }} >
                                                            Please add at least 1 diagnosis
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                    <Label title="Age at Onset" size={2} />
                                                    <Grid item xs={12} sm={2} md={2} lg={2}>
                                                        <InputBaseFieldNumber
                                                            placeholder="Age at Onset"
                                                            onChange={handleChangeDiagnosis}
                                                            name="onsetAge"
                                                            value={diagnosisState.onsetAge}
                                                            MaxLength='6'
                                                            MinValue={0}
                                                            MaxValue={1000}
                                                        />
                                                    </Grid>
                                                    <Grid container xs={1} sm={1} md={1} lg={1}>
                                                        <span className={classes.addNew} title={"Add"}><img src={AddIcon} alt="Add" onClick={() => addDiagnosis(false)} /></span>
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <div >
                                                        {
                                                            state.familyHisDiagnosisLst ?
                                                                state.familyHisDiagnosisLst.map((item, index) => {
                                                                    return (
                                                                        <div className={classes.diagnosisList}>
                                                                            <FormLabel className={classes.diagnosisLabel}>Diagnosis</FormLabel>
                                                                            <FormLabel className={classes.diagnosisValueLabel}>{item.diagnosisName}</FormLabel>
                                                                            <FormLabel className={classes.ageAtOnsetLabel}>Age at Onset</FormLabel>
                                                                            <FormLabel className={classes.ageAtOnsetValueLabel}>{item.onsetAge}</FormLabel>
                                                                            <span className={classes.editdeleteIcon} title={"Edit"} ><img src={EraseIcon} alt="Edit" onClick={() => handleDiagnosisEdit(index)} /></span>
                                                                            <span className={classes.editdeleteIcon} title={"Delete"}><img src={DeleteIcon} alt="Delete" onClick={() => handleDiagnosisDelete(index)} /></span>
                                                                        </div>
                                                                    )
                                                                })
                                                                : null
                                                        }
                                                    </div>
                                                </Grid>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Additional Information" isTextAreaInput={true} size={3} />
                                                    <Grid item xs={12} sm={8} md={8} lg={8} >
                                                        <TextareaField
                                                            rowsMin={5}
                                                            placeholder="Additional Information"
                                                            onChange={handleChange}
                                                            name="additionalInfo"
                                                            value={state.additionalInfo}
                                                            MaxLength="2000"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </>
                                            : <></>}
                                        <Grid container direction="row" justify="flex-end">
                                            <Grid item xs={11} sm={11} md={11} lg={11} >
                                                <Grid container direction="row" justify="flex-end">
                                                    {/* <FormBtn id="resetBtn" onClick={resetFamilyHistory}>Reset</FormBtn> */}
                                                    {isEdit ? <FormBtn id="delete" onClick={() => deleteRecordOnEdit()}>Delete</FormBtn> : null}
                                                    <FormBtn id="save" disabled={ !isEditable}  onClick={saveFamilyHistory}>Save</FormBtn>
                                                    {!state.noFamilyHistory ? <FormBtn id="reset" onClick={resetFamilyHistory}>Add another</FormBtn> : null}

                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1} sm={1} md={1} lg={1} />
                                        </Grid>
                                    </> :
                                    <>
                                        <div className={classes.btnContainer}>
                                            <Typography className={classes.formBtnTitle} > Add/Edit Family History</Typography>
                                        </div>
                                        <div className={classes.addNewBtn}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.addNewButton}
                                                    startIcon={<img src={AddIcon} />}
                                                    disabled={ !isEditable}
                                                    onClick={() => setShowAddamilyHistory(true)}
                                                >
                                                    Add Family History
                                                </Button>
                                            </Grid>
                                        </div>
                                    </>
                                }
                                <LogDialog
                                    code="familyhistory"
                                    id={state.familyHistoryId}
                                    dialogOpenClose={logdialogstate}
                                    onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                                />

                                {
                                    !state.noFamilyHistory ?
                                        <>
                                            <Grid container direction="row" lg={12}>
                                                <FormGroupTitle>Added Family History</FormGroupTitle>
                                                <div className={classes.historyDataTable}>
                                                    <div className="custom-grid">
                                                        <Table
                                                            locale={{
                                                                emptyText: (
                                                                    <Empty
                                                                        image={isLoading && LoadingIcon}
                                                                        description={isLoading ? "Loading..." : "No Record Found"}
                                                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                                    />
                                                                )
                                                            }}
                                                            checkStrictly={true}
                                                            scroll={true}
                                                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                            dataSource={rowsData}
                                                            columns={familyHistoryDialogColumns}
                                                        />
                                                    </div>
                                                    {/* <MDBDataTable
                                                        className="historyDataTable"
                                                        striped
                                                        small
                                                        btn
                                                        searching={false}
                                                        data={tableData}
                                                    /> */}
                                                </div>
                                            </Grid>
                                        </> : null
                                }

                            </Grid>
                        </div>
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <FooterBtn className={classes.footerBtn}>
                        {/* <FormBtn id="save" onClick={handleNext} btnType="next"> Next</FormBtn> */}

                        {state.familyHistoryId != 0 ?
                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </FooterBtn>
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

        </>

    );
}

export default withSnackbar(FamilyHistory)