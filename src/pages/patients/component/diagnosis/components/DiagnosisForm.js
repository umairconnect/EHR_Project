import React, { useState, useEffect } from "react"
import {
    Dialog,
    Slide,
    Grid,
    FormHelperText,
    Typography,
    FormLabel,
    InputBase,
    InputAdornment,
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import useStyles from "./styles"
import CloseIcon from "../../../../../images/icons/math-plus.png"
import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";
import { GetDataAPI } from "../../../../../Services/GetDataAPI"
import { FormBtn, FormGroupTitle, Label, LinkS, ProgressBar, DraggableComponent } from "../../../../../components/UiElements/UiElements";
import { SelectField, RadioboxField, CheckboxField, InputBaseField, TextareaField } from "../../../../../components/InputField/InputField";

import { withSnackbar } from "../../../../../components/Message/Alert";
import SearchList from "../../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../components/LogDialog/LogDialog";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { Scrollbars } from 'rc-scrollbars';

import PatientEducationalM from "./../../medication/component/educationalmaterial/PatientEducationalM";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function DiagnosisForm({ dialogOpenClose, handleClose, handleSuccess, updatedData, ...props }) {

    const { showMessage } = props;
    const [diagnosisId, setDiagnosisId] = useState(props.diagnosisId ? props.diagnosisId : 0);
    const [patientId] = useState(props.patientId);
    const [encounterId] = useState(props.encounterId);
    const [isEditable] = useState(props.isEditable);
    const [logdialogstate, setLogDialogState] = useState(false);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    //drop down list
    const [typeList, setTypeList] = useState([]);
    const [condCtrlList, setCondCtrlList] = useState([]);
    const [degreeList, setDegreeList] = useState([]);

    //end drop down list
    const [errorMessages, setErrorMessages] = useState({});
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //handle Serach on Input
    const [searchList, setSearchList] = useState("");
    const [filterDataList, setFilterDataList] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    //hanlde functions
    const searchOnChange = value => {
        setSearchList(value);
        filterData(value);
    }
    // handle styles
    const classes = useStyles();
    const statusOptions = [
        {
            value: "Active",
            label: "Active",
        },
        {
            value: "Resolved",
            label: "Resolved",
        }

    ];
    const chronicityOptions = [
        {
            value: "Acute",
            label: "Acute",
        },
        {
            value: "Chronic",
            label: "Chronic",
        },
        {
            value: "Unknown",
            label: "Unknown",
        }
    ];

    const [state, setState] = useState({});
    const [recentRowsData, setRecentRowsData] = useState([]);
    //
    //For searching in list of most used codes 
    //const excludeColumns = ["id"];
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setFilterDataList(recentRowsData);
        else {
            const filteredData = recentRowsData.filter(item => {
                return Object.keys(item).some(key =>
                    //excludeColumns.includes(key) ? false :
                    item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setFilterDataList(filteredData);
        }
    }
    //
    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleProblemChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));

        setState(prevState => ({
            ...prevState,
            "icdName": value
        }));

        getDiagnosisDetail(id);
    }
    const getRecentDiagnosis = () => {
        var params = {
            code: "recent_diagnosis",
            parameters: [userInfo.userID]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setRecentRowsData(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2 };
                    }));
                setFilterDataList(result.data.map((item, i) => {
                    return { id: item.text1, value: item.text2 };
                }));
            }
        });
    }

    const getDiagnosisDetail = (code) => {
        var params = {
            code: "diagnosis_detail",
            parameters: [code]
        };

        PostDataAPI("ddl/loadItemDetail", params).then((result) => {
            if (result.success && result.data != null) {

                setState(prevState => ({
                    ...prevState,
                    "snomedCtCode": result.data["snomed_code"]
                }));
                setState(prevState => ({
                    ...prevState,
                    "educationResLink": result.data["education_link"]
                }));
                setState(prevState => ({
                    ...prevState,
                    "icdVersion": result.data["icd_version"]
                }));
            }

        })
    }

    const handleChkboxChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: !state[name]
        }));
    }

    const initializeState = () => {
        setState({
            diagnosisId: parseInt(diagnosisId) > 0 ? diagnosisId : null,
            icdVersion: "",
            icdName: "",
            icdCode: "",
            patientId: patientId,
            createDate: new Date(),
            snomedCtCode: "",
            status: "Active",
            diagnosisDate: null,
            onsetDatetime: null,
            changedDatetime: null,
            notes: "",
            chronicity: "Acute",
            isHealthConcern: false,
            typeCode: "",
            conditionControlCode: "",
            degreeCode: "",
            educationResLink: ""
        })
    }

    const loadData = () => {
        //setting values to empty string instead of undefined
        setState({ chronicity: "", status: "" });
        PostDataAPI("patient/diagnosis/get", diagnosisId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.onsetDatetime)
                    result.data.onsetDatetime = result.data.onsetDatetime.split('T')[0];
                if (result.data.diagnosisDate)
                    result.data.diagnosisDate = result.data.diagnosisDate.split('T')[0];

                setState(result.data);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }
    const resetForm = () => {

        if (diagnosisId > 0) {
            loadData();
        }
        else {
            initializeState();
        }
    }
    useEffect(() => {

        resetForm();
        if (diagnosisId < 1)
            getRecentDiagnosis();

        var params = {
            code: "DDL_List_Item",
            parameters: ['diagnosis_type_code', 'degree_code', 'condition_control_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _typeList = [];
                var _degreeCodeList = [];
                var _condCtrlList = [];


                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'diagnosis_type_code':
                            _typeList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'degree_code':
                            _degreeCodeList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'condition_control_code':
                            _condCtrlList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });
                setTypeList(_typeList);
                setDegreeList(_degreeCodeList);
                setCondCtrlList(_condCtrlList);
            }
        });
    }, [dialogOpenClose]);

    const save = () => {
        var validated = true;

        if (!state.icdName || state.icdName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                icdName: true
            }));
            validated = false;
        }
        if (state.diagnosisDate && state.diagnosisDate.trim() != "" &&
            state.onsetDatetime && state.onsetDatetime.trim() != ""
            && state.diagnosisDate > state.onsetDatetime) {
            setErrorMessages(prevState => ({
                ...prevState,
                validDiagnosisDate: true
            }));
            validated = false;
        }

        if (validated == false)
            return;

        setLoading({ isSaving: true });
        //state.isChronic = (state.chronicity == 'Chronic');
        state.encounterId = props.encounterId;

        var method = "patient/diagnosis/add";
        if (diagnosisId > 0)
            method = "patient/diagnosis/update";

        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {
                setLoading({ isSaving: false });
                handleSuccess("Diagnosis saved successfully.")
                //if (diagnosisId < 1) {
                //    setDiagnosisId(result.data.diagnosisId);
                //    setState(prevState => ({
                //        ...prevState,
                //        "createdBy": result.data.createdBy
                //    }));
                //    setState(prevState => ({
                //        ...prevState,
                //        "diagnosisId": result.data.diagnosisId
                //    }));
                //}
                //showMessage("Success", "Diagnosis saved successfully.", "success", 3000);
                //
                //setTimeout(() => { handleClose(); }, 3000);
            }
            else {
                showMessage("Error", result.message, "error", 8000);
                setLoading({ isSaving: false });
            }
        })
    }
    function clear() {
        resetForm();
        setErrorMessages({});
    }
    function deleteRecord() {
        setLoading({ isDeleting: true });
        PostDataAPI('patient/diagnosis/delete', state, true).then((result) => {

            if (result.success == true) {
                setErrorMessages({});
                showMessage("Success", "Record deleted successfully.", "success", 2000);
                setDiagnosisId(0);
                initializeState();
                setLoading({ isDeleting: false });
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isDeleting: false });
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
        setTimeout(() => { handleClose(); }, 3000);
    }
    function validateDiagnosisDate() {
        let status = true;
        if (state.diagnosisDate != '' && state.onsetDatetime != '' && state.diagnosisDate > state.onsetDatetime)
            status = false;
        return status;
    }

    const [pEducationalM, setPEducationalM] = useState(false);

    const educationalClose = () => {
        setPEducationalM(false)
    }
    const educationalOpen = () => {
        if (state.icdName != '' && state.icdName != null) {
            setPEducationalM(true)
        } else {
            showMessage("Error", "Please select diagnosis", "error", 3000);
        }

    }

    return (
        <>

            {pEducationalM ?
                <PatientEducationalM
                    educationalClose={educationalClose}
                    educationalOpen={educationalOpen}
                    code={state.icdCode}
                    name={state.icdName}
                    category='diagnosis'
                    patientId={props.patientId}
                ></PatientEducationalM> : ''
            }

            <Dialog
                PaperComponent={DraggableComponent}
                disableBackdropClick
                disableEscapeKeyDown
                TransitionComponent={Transition}
                open={dialogOpenClose}
                disableEnforceFocus
                classes={{ paper: diagnosisId > 0 ? classes.smallDialogPaper : classes.dialogPaper }}
                // maxWidth={'md'}
                {...props} >

                <div className={classes.DialogContent}>
                    {diagnosisId > 0 ? "" :
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>
                                        <div style={{ marginBottom: "5px" }}>Most Used</div>

                                        <InputBase
                                            fullWidth
                                            autoComplete="off"
                                            maxLength="20"
                                            name="searchlist"
                                            placeholder="Search"
                                            className={classes.baseInput}
                                            value={searchList}
                                            onChange={e => searchOnChange(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            } />
                                        <div className={classes.listHeader}>
                                            <span className={classes.templatesCode}>Code</span>
                                            <span className={classes.templatesNameTitle}>Description</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes.quickPickHeader}>
                                        <Scrollbars style={{ minHeight: 450 }}>
                                            {
                                                filterDataList.length <= 0 ?
                                                    ""
                                                    :
                                                    <>
                                                        {

                                                            <ul className={classes.templatesList}>
                                                                {filterDataList.map((item, i) => (
                                                                    <li key={i} onClick={() => handleProblemChange("icdCode", item)}>
                                                                        <span className={classes.templatesCode}>{item.id}</span>
                                                                        <div style={{ display: "flex" }}>
                                                                            <span className={classes.templatesDescription}>{item.value}</span>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                                {filterDataList.length === 0 && searchList != 0 ? <span className={classes.noRecordFound}><span><SearchIcon /></span>No records found </span> : ""}
                                                            </ul>

                                                        }
                                                    </>
                                            }
                                        </Scrollbars>
                                    </div>
                                </div>

                            </div>
                        </div>}

                    <div className={classes.DialogContentRightSide}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle>{diagnosisId > 0 ? "Edit Diagnosis" : "Add Diagnosis"}</FormGroupTitle>

                            </div>
                            <div className={classes.content}>
                                <div className={classes.righInnerContent}>
                                    <Scrollbars style={{ height: 490 }}>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <>
                                                    {diagnosisId > 0 ?
                                                        <>
                                                            {/* <Grid item alignItems="flex-start" justify="flex-end" xs={2} sm={2} md={2} lg={3} xl={3}></Grid> */}
                                                            <Label title="Diagnosis" mandatory={true} size={3} />
                                                            <Grid container alignItems="center" justify="flex-start" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                                <FormLabel className={classes.lableInput}>{state.icdName}</FormLabel>
                                                            </Grid>
                                                        </> :
                                                        <>
                                                            <Label title="Diagnosis" mandatory={true} size={3} />
                                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={8} xl={8}>
                                                                <SearchList name="icdCode" value={state.icdCode} searchTerm={state.icdName} code="diagnosis"
                                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleProblemChange(name, item)}
                                                                    placeholderTitle="Search Diagnosis"
                                                                />
                                                                {errorMessages.icdName && (!state.icdName || state.icdName.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                                    Please select diagnosis
                                                                </FormHelperText>) : ('')}
                                                            </Grid>

                                                        </>
                                                    }
                                                </>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Chronicity" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <RadioboxField name="chronicity" value={state.chronicity} labelPlacement="end" onChange={handleChange} options={chronicityOptions} />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={3} md={3} lg={3} xl={3}>
                                                </Grid>
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <CheckboxField
                                                        color="primary"
                                                        onChange={handleChkboxChange}
                                                        name="isHealthConcern"
                                                        checked={state.isHealthConcern ? true : false}
                                                        label="Health Concerns"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={11} sm={11} md={11} lg={11} xl={11}>
                                                <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                    <span className={classes.baseLine}> </span>
                                                </Typography>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="SNOMED  Code" size={3} />
                                                <Grid container alignItems="center" justify="flex-start" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <FormLabel className={classes.lableInput}>{state.snomedCtCode}</FormLabel>
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Type" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <SelectField
                                                        placeholder="Select Type"
                                                        onChange={handleChange}
                                                        name="typeCode"
                                                        value={state.typeCode}
                                                        options={typeList}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Condition Control" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <SelectField
                                                        placeholder="Select Condition Control"
                                                        onChange={handleChange}
                                                        name="conditionControlCode"
                                                        value={state.conditionControlCode}
                                                        options={condCtrlList}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Degree" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                    <SelectField
                                                        placeholder="Select Degree"
                                                        onChange={handleChange}
                                                        name="degreeCode"
                                                        value={state.degreeCode}
                                                        options={degreeList}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Status" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                    <RadioboxField name="status" value={state.status} labelPlacement="end" onChange={handleChange} options={statusOptions} />
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Diagnosis Date" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                    <InputBaseField
                                                        type="date"
                                                        onChange={handleChange}
                                                        name="diagnosisDate"
                                                        value={state.diagnosisDate}
                                                    />
                                                    {errorMessages.validDiagnosisDate && !validateDiagnosisDate() ? (<FormHelperText style={{ color: "red" }} >
                                                        Diagnosis date should be earlier than resolved date
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            {
                                                state.status == "Resolved" ?
                                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Label title="Resolved Date" size={3} />
                                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={5} md={5} lg={4} xl={4}>
                                                            <InputBaseField
                                                                type="date"
                                                                onChange={handleChange}
                                                                name="onsetDatetime"
                                                                value={state.onsetDatetime}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    : null
                                            }
                                            <Grid container direction="row" xs={11} sm={11} md={11} lg={11} xl={11}>
                                                <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                                    <span className={classes.baseLine}> </span>
                                                </Typography>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Comments" isTextAreaInput={true} size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    <TextareaField
                                                        rowsMin={5}
                                                        placeholder="Comments"
                                                        onChange={handleChange}
                                                        name="notes"
                                                        value={state.notes}
                                                        MaxLength='2000'
                                                    />

                                                    <Typography onClick={educationalOpen} className={classes.linkItem}>Educational Resource</Typography>
                                                </Grid>
                                            </Grid>


                                            {/* 
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Grid container alignItems="center" xs={12} sm={3} md={3} lg={3} xl={3}></Grid>
                                                <Grid item alignItems="center" justify="flex-start" xs={12} sm={7} md={7} lg={6} xl={6}>
                                                    {
                                                        state.educationResLink && state.educationResLink.trim() != "" ?
                                                            <div className={classes.linkAlignment}>
                                                                <LinkS target={"_blank"} href={state.educationResLink} >Educational Resource</LinkS>
                                                            </div>
                                                            : null
                                                    }
                                                </Grid>
                                            </Grid> */}

                                        </Grid>
                                    </Scrollbars>
                                </div>

                            </div>
                            <div >
                                <Grid container alignItems="center" justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid item container direction="row" alignItems="center" justify="flex-start" xs={12} sm={3} md={3} lg={3} xl={3}></Grid>
                                    <Grid item container direction="row" alignItems="center" justify="flex-start" xs={12} sm={9} md={9} lg={9} xl={9}>
                                        {loading.isSaving ? <FormBtn id="loadingSave" disabled={false} size="medium"> Save </FormBtn>
                                            : <FormBtn id="save" disabled={ !isEditable} onClick={save} size="medium"> Save </FormBtn>
                                        }
                                        {
                                            diagnosisId > 0 ?
                                                loading.isDeleting ? <FormBtn id="loadingDelete" disabled={false} size="medium" > Save </FormBtn>
                                                    : <FormBtn id={"delete"} disabled={!isEditable} onClick={() => ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm")} size="medium">
                                                        Delete
                                                    </FormBtn>
                                                : null
                                        }
                                        <FormBtn id="resetBtn" onClick={clear}> Reset </FormBtn>

                                        {
                                            diagnosisId > 0 ?
                                                <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                                : null
                                        }
                                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>

                </div>

            </Dialog>
            {logdialogstate ?
                <LogDialog
                    code="patdaignosis"
                    id={diagnosisId}
                    dialogOpenClose={logdialogstate}
                    onClose={(dialogstate) => setLogDialogState(dialogstate)}
                />
                : null
            }
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={deleteRecord}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    );
}

export default withSnackbar(DiagnosisForm)
