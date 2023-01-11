import React, { useState, useEffect } from "react";
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
    Typography,
    Divider,
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FooterBtn, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import EraseIcon from "../../../../images/icons/erase.png"
import DeleteIcon from "../../../../images/icons/trash.png"
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";

function FunctionalStatus({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [functionalStatusId, setFunctionalStatusId] = useState(props.functionalStatusId);

    const radioBoxList = [
        { value: "True", label: "Self Care" },
        { value: "False", label: "Functional Status" }
    ]

    const [activityList, setActivityList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [funcState, setFuncstate] = useState({
        functionalStatusID: 0, encounterID: props.encounterId,
        isSelfcare: "True", activityCode: "", abilityCode: "", evaluationCode: "",
        effectiveDate: new Date().toISOString().split('T')[0],
        resolvedDate: null, //new Date().toISOString().split('T')[0],
        comments: ""
    });

    const functionalStatusRef = useState({ activityRef: "", abilityRef: "", effectiveDateRef: "" })

    const [errorMessages, setErrorMessages] = useState({
        errorIsSelfcare: false, errorActivityCode: false, errorAbilityCode: false, errorEvaluationCode: false, errorEffectiveDate: false, errorResolvedDate: false, errorFDateGreaterThanLDate: false
    });



    const [abilityList, setAbilityList] = useState([]);
    const [evaluationList, setEvaluationList] = useState([]);

    const [functionalStatus, setFunctionalStatus] = useState(true);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
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

    //-------------------------

    useEffect(() => {
        if (showHideDialog) {
            clear();
            getDropdownsData();
            setFSFormData();

            if (props.functionalStatusId > 0) {
                getFunctionalStatusDetail(props.functionalStatusId);
            }
        }

    }, [showHideDialog]);


    const clear = () => {

        setFuncstate(prevState => ({
            ...prevState,
            functionalStatusID: 0, EncounterID: props.encounterId,
            isSelfcare: "True", activityCode: "",
            abilityCode: abilityList.length > 0 ? abilityList[0].value : "",
            evaluationCode: "", comments: "",
            effectiveDate: new Date().toISOString().split('T')[0],
            resolvedDate: ""

        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncstate(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleRadioButtonChange = (e) => {
        const { name, value } = e.target;
        if (value == "True") {
            setFunctionalStatus(true)
        } else {
            setFunctionalStatus(false)
        }
        setFuncstate(prevState => ({
            ...prevState,
            functionalStatusID: 0,
            encounterID: props.encounterId,
            [name]: value,
            activityCode: "",
            abilityCode: "",
            evaluationCode: "",
            effectiveDate: !value ? null : new Date().toISOString().split('T')[0],
            resolvedDate: null,
            comments: ""
        }));
    }

    const handleActivityChange = (name, item) => {
        const { id, value } = item;
        setFuncstate(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const getDropdownsData = e => {

        var params = {
            code: "DDL_List_Item",
            parameters: ['fuctional_ability_code', 'fuctional_evaluation_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data.length > 0) {
                var _abilityList = [];
                var _evalList = [];

                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'fuctional_ability_code':
                            _abilityList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'fuctional_evaluation_code':
                            _evalList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                })

                setAbilityList(_abilityList);
                setEvaluationList(_evalList);

                setFuncstate(prevState => ({
                    ...prevState,
                    functionalStatusID: 0,
                    EncounterID: props.encounterId,
                    isSelfcare: "True",
                    activityCode: "",
                    abilityCode: abilityList.length > 0 ? abilityList[0].value : "",
                    evaluationCode: "",
                    comments: "",
                    effectiveDate: new Date().toISOString().split('T')[0],
                    resolvedDate: null

                }))

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorIsSelfcare: false, errorActivityCode: false, errorAbilityCode: false, errorEvaluationCode: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
                }));

            }
        });
    }

    const setFSFormData = e => {

        let procData = {
            "encounterID": props.encounterId
        }
        PostDataAPI("FunctionalStatus/loadFunctionalStatusForEncounter", procData).then((result) => {

            if (result.success && result.data.length === 0)
                setActivityList([]);
            else if (result.success && result.data.length > 0) {

                setActivityList(
                    result.data.map((item, i) => {
                        return {
                            activityCode: item.activityCode,
                            abilityCode: item.abilityName,
                            functionalStatusID: item.functionalStatusID
                        };
                    }));
            }
            //else {

            //    setFuncstate(prevState => ({
            //        ...prevState,
            //        functionalStatusID: 0, encounterID: props.encounterId,
            //        isSelfcare: "True", activityCode: "", abilityCode: "", evaluationCode: "",
            //        effectiveDate: new Date().toISOString().split('T')[0],
            //        resolvedDate: null,
            //        comments: ""
            //    }));

            //}

            setErrorMessages({
                errorIsSelfcare: false, errorActivityCode: false, errorAbilityCode: false, errorEvaluationCode: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
            });
        })

    }

    const editFunctionalStatus = (item) => {
        setFunctionalStatus(true)
        setFuncstate(prevState => ({
            ...prevState,
            activityCode: ""
        }));
        
        getFunctionalStatusDetail(item.functionalStatusID);

        //setFuncstate(prevState => ({
        //    ...prevState,
        //    activityCode: item.activityCode
        //}));

        //setFuncstate(prevState => ({
        //    ...prevState,
        //    abilityCode: item.abilityCode
        //}));
    }

    const getFunctionalStatusDetail = (id) => {
        let procData = {
            "functionalStatusID": id
        }
        PostDataAPI("FunctionalStatus/getFunctionalStatusByID", procData).then((result) => {

            if (result.success && result.data) {

                setFuncstate({
                    functionalStatusID: result.data.functionalStatusID,
                    encounterID: result.data.encounterID,
                    isSelfcare: result.data.isSelfcare ? "True" : "False",
                    activityCode: result.data.activityCode,
                    abilityCode: result.data.abilityCode,
                    evaluationCode: result.data.evaluationCode,
                    effectiveDate: result.data.effectiveDate ? result.data.effectiveDate.split('T')[0] : "",
                    resolvedDate: result.data.resolvedDate ? result.data.resolvedDate.split('T')[0] : "",
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    comments: result.data.comments,
                });
                // setFunctionalStatus(functionalStatus ? true : false)
            }
            else {

                setFuncstate(prevState => ({
                    ...prevState,
                    functionalStatusID: 0, encounterID: props.encounterId,
                    isSelfcare: "True", activityCode: "", abilityCode: "", evaluationCode: "",
                    effectiveDate: new Date().toISOString().split('T')[0],
                    resolvedDate: null,
                    comments: ""
                }));
                // setFunctionalStatus(true)
            }

            setErrorMessages({
                errorIsSelfcare: false, errorActivityCode: false, errorAbilityCode: false, errorEvaluationCode: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
            });
        })
    }

    const deleteFunctionalStatus = (item) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the functional status?", "confirm", function () {

            PostDataAPI('FunctionalStatus/deleteFunctionalStatus', item, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setFSFormData();
                    setFunctionalStatus(true)
                    setFuncstate(prevState => ({
                        ...prevState,
                        functionalStatusID: 0,
                        EncounterID: props.encounterId,
                        isSelfcare: "True",
                        activityCode: "",
                        abilityCode: abilityList.length > 0 ? abilityList[0].value : "",
                        evaluationCode: "",
                        comments: "",
                        effectiveDate: new Date().toISOString().split('T')[0],
                        resolvedDate: ""

                    }))
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });

    }

    const addAnotherStatus = () => {
        setFunctionalStatus(true);
        setFuncstate(prevState => ({
            ...prevState,
            functionalStatusID: 0, encounterID: props.encounterId,
            isSelfcare: "True", activityCode: "", abilityCode: "", evaluationCode: "",
            effectiveDate: new Date().toISOString().split('T')[0],
            resolvedDate: null,
            comments: ""
        }));
        setErrorMessages({
            errorIsSelfcare: false, errorActivityCode: false, errorAbilityCode: false, errorEvaluationCode: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
        });
    }

    const saveFunctionalStatus = (e) => {
        
        e.preventDefault();

        let errorList = []

        if (funcState.isSelfcare == "True" && (!funcState.effectiveDate || funcState.effectiveDate.trim() == "")) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: true
            }));
            errorList.push(true);
            functionalStatusRef.effectiveDate.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: false
            }));
        }
        if (!funcState.abilityCode || funcState.abilityCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAbilityCode: true
            }));
            errorList.push(true);
            functionalStatusRef.abilityRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAbilityCode: false
            }));
        }
        if (!funcState.activityCode || funcState.activityCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorActivityCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorActivityCode: false
            }));
        }
        if (!funcState.isSelfcare) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIsSelfcare: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIsSelfcare: false
            }));
        }

        if (funcState.isSelfcare == "True" && (!funcState.evaluationCode || funcState.evaluationCode.trim() == "")) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEvaluationCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEvaluationCode: false
            }));
        }

        //if (funcState.isSelfcare == "True" && (!funcState.resolvedDate || funcState.resolvedDate.trim() == "")) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorResolvedDate: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorResolvedDate: false
        //    }));
        //}
        if (funcState.isSelfcare == "True" && (funcState.effectiveDate && funcState.resolvedDate && funcState.effectiveDate > funcState.resolvedDate)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFDateGreaterThanLDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFDateGreaterThanLDate: false
            }));
        }

        let exist = false;
        if (errorList.length < 1 && !funcState.functionalStatusID && funcState.functionalStatusID < 1) {
            activityList.map((item, index) => {
                if (item.activityCode == funcState.activityCode) {
                    exist = true;
                }
            });
        }
        if (exist == true) //&& !window.confirm("Activity already exists, do you want to update it?"))
        {
            ShowActionDialog(true, "OK", "Activity already exists, do you want to update it?", "confirm", function () {
                if (errorList.length < 1) {
                    setIsSaving(true);
                    let method = "FunctionalStatus/addFunctionalStatus";
                    funcState.encounterID = props.encounterId;
                    funcState.isSelfcare = funcState.isSelfcare == "True" ? true : false;
                    funcState.resolvedDate = funcState.resolvedDate === "" ? null : funcState.resolvedDate;

                    PostDataAPI(method, funcState, true).then((result) => {
                        if (result.success == true && result.data != null) {
                            setErrorMessages([]);
                            addAnotherStatus();
                            //getFunctionalStatusDetail(result.data.functionalStatusID);
                            showMessage("Success", "Data saved successfully.", "success", 443000);
                            setIsSaving(false);
                            //handleClose();
                            setFSFormData();
                        }
                        else {
                            showMessage("Error", result.message, "error", 3000);
                            setIsSaving(false);
                            e.preventDefault();
                        }
                    })

                }
                else {
                    e.preventDefault();
                }
            })
        } else {
            if (errorList.length < 1) {
                setIsSaving(true);
                let method = "FunctionalStatus/addFunctionalStatus";
                funcState.encounterID = props.encounterId;
                funcState.isSelfcare = funcState.isSelfcare == "True" ? true : false;
                funcState.resolvedDate = funcState.resolvedDate === "" ? null : funcState.resolvedDate;

                PostDataAPI(method, funcState, true).then((result) => {
                    if (result.success == true && result.data != null) {
                        setErrorMessages([]);
                        addAnotherStatus();
                        //getFunctionalStatusDetail(result.data.functionalStatusID);
                        showMessage("Success", "Data saved successfully.", "success", 3000);
                        setIsSaving(false);
                        //handleClose();
                        setFSFormData();
                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                        setIsSaving(false);
                        e.preventDefault();
                    }
                })

            }
            else {
                e.preventDefault();
            }
        }

    }

    return (
        <>

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                open={showHideDialog}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown>
                <Scrollbars autoHeight autoHeightMax={700} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle className={classes.lableTitleInput}>Functional Status</FormGroupTitle>

                            </div>
                            <Scrollbars autoHeight autoHeightMax={620}
                                style={{ maxHeight: 580, display: "flex", }}>
                                <div className={classes.content}>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <RadioboxField
                                                    id="isSelfcare"
                                                    name="isSelfcare"
                                                    value={funcState.isSelfcare}
                                                    options={radioBoxList}
                                                     Disabled={funcState.functionalStatusID > 0 ? true:false}
                                                    onChange={handleRadioButtonChange}
                                                />

                                                {errorMessages.errorIsSelfcare && (!funcState.isSelfcare == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select selfcare or functional status
                                                </FormHelperText>) : ('')}

                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Activity" size={2} mandatory={true} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>

                                                {
                                                    funcState.functionalStatusID > 0 ?
                                                        (<InputBaseField
                                                            id="activityCode"
                                                            name="activityCode"
                                                            value={funcState.activityCode}
                                                            searchTerm={funcState.activityCode}
                                                            placeholderTitle="Activity Name"
                                                            disabled={funcState.functionalStatusID > 0}
                                                        />)
                                                        :
                                                        (<SearchList
                                                            id="activityCode"
                                                            name="activityCode"
                                                            value={funcState.activityCode}
                                                            searchTerm={funcState.activityCode}
                                                            code="fuctional_activity"
                                                            apiUrl="ddl/loadItems"
                                                            disabled={funcState.functionalStatusID > 0}
                                                            placeholderTitle="Search Activity"
                                                            onChangeValue={(name, item) => handleActivityChange(name, item)}
                                                        />)
                                                }

                                                {errorMessages.errorActivityCode && (!funcState.activityCode || funcState.activityCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select activity
                                                </FormHelperText>) : ('')}

                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Ability" size={2} mandatory={true} />
                                            <Grid item justify="flex-end" xs={9} sm={6} md={6} lg={6} xl={6}>
                                                <SelectField
                                                    id="abilityCode"
                                                    name="abilityCode"
                                                    placeholder="Please Select Ability"
                                                    options={abilityList}
                                                    value={funcState.abilityCode}
                                                    onChange={handleChange}
                                                    inputProps={{ ref: input => functionalStatusRef.abilityRef = input }}
                                                />

                                                {errorMessages.errorAbilityCode && (!funcState.abilityCode || funcState.abilityCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select ability
                                                </FormHelperText>) : ('')}

                                            </Grid>
                                        </Grid>

                                        {functionalStatus ?
                                            <>
                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Evaluation" size={2} mandatory={true} />
                                                    <Grid item alignItems="flex-start" justify="flex-end" xs={9} sm={6} md={6} lg={6} xl={6}>
                                                        <SelectField
                                                            id="evaluationCode"
                                                            name="evaluationCode"
                                                            placeholder="Please Select Evaluation"
                                                            options={evaluationList}
                                                            value={funcState.evaluationCode}
                                                            onChange={handleChange}
                                                        />

                                                        {funcState.isSelfcare == "True" && errorMessages.errorEvaluationCode && (!funcState.evaluationCode || funcState.evaluationCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                            Please eelect evaluation
                                                        </FormHelperText>) : ('')}

                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Effective Date" size={2} mandatory={true} />
                                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <InputBaseField
                                                            type="date"
                                                            id="effectiveDate"
                                                            name="effectiveDate"
                                                            value={funcState.effectiveDate}
                                                            onChange={handleChange}
                                                            inputProps={{ ref: input => functionalStatusRef.effectiveDateRef = input }}
                                                        />

                                                        {funcState.isSelfcare == "True" && errorMessages.errorEffectiveDate && (!funcState.effectiveDate || funcState.effectiveDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select effective date
                                                        </FormHelperText>) : ('')}

                                                    </Grid>
                                                    <Label title="Resolved Date" size={2} />
                                                    <Grid item alignItems="flex-start" justify="flex-end" xs={9} sm={4} md={4} lg={4} xl={4}>
                                                        <InputBaseField
                                                            type="date"
                                                            id="resolvedDate"
                                                            name="resolvedDate"
                                                            value={funcState.resolvedDate}
                                                            onChange={handleChange}
                                                        />

                                                        {/*{funcState.isSelfcare == "True" && errorMessages.errorResolvedDate && (!funcState.resolvedDate || funcState.resolvedDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >*/}
                                                        {/*    Please select resolved date*/}
                                                        {/*</FormHelperText>) : ('')}*/}

                                                        {funcState.isSelfcare == "True" && errorMessages.errorFDateGreaterThanLDate && funcState.effectiveDate > funcState.resolvedDate ?
                                                            (<FormHelperText style={{ color: "red" }} >
                                                                Effective date must be less then resolved date
                                                            </FormHelperText>) : ('')}

                                                    </Grid>

                                                </Grid>

                                            </>
                                            : ""}

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Comments" isTextAreaInput={true} size={2} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10}>
                                                <TextareaField
                                                    rowsMin={5}
                                                    MaxLength="2000"
                                                    id="comments"
                                                    name="comments"
                                                    value={funcState.comments}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/*<Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                        {/*    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />*/}
                                        {/*    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10}>*/}
                                        {/*        <FormGroupTitle></FormGroupTitle>*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />*/}
                                        {/*</Grid>*/}

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Divider className={activityList.length > 0 ? classes.ActionDivider : ""} />
                                            {
                                                activityList.map((item, index) => {
                                                    return (
                                                        <div className={classes.activityList}>
                                                            <FormLabel className={classes.activityLabel}>Activity:</FormLabel>
                                                            <FormLabel className={classes.activityValue} style={{minWidth: "150px"}}>{item.activityCode}</FormLabel>
                                                            <FormLabel className={classes.abilityLabel}>Ability:</FormLabel>
                                                            <FormLabel className={classes.abilityValue} style={{width: "130px"}}>{item.abilityCode}</FormLabel>
                                                            <span className={classes.editdeleteIcon} title={"Edit"} onClick={() => editFunctionalStatus(item)}><img src={EraseIcon} alt="Edit" /></span>
                                                            <span className={classes.editdeleteIcon} title={"Delete"} onClick={() => deleteFunctionalStatus(item)} ><img src={DeleteIcon} alt="Delete" /></span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Grid>

                                        {/* {activityList.length > 0 && <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10}>
                                                <FormGroupTitle></FormGroupTitle>
                                            </Grid>
                                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
                                        </Grid>} */}

                                    </Grid>
                                </div>
                            </Scrollbars>
                        </div>
                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10} style={{ marginLeft: -3 }}>
                                {isSaving ?
                                    <FormBtn id="loadingSave" > Save</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={saveFunctionalStatus}  > Save</FormBtn>
                                }
                                {/* <FormBtn id="reset" onClick={addAnotherStatus}  > Add Another</FormBtn> */}

                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </Grid>
                        </Grid>
                    </div>
                </Scrollbars>
            </Dialog>

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
    )

}

export default withSnackbar(FunctionalStatus)
