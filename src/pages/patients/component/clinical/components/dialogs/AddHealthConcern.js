import React, { useState, useEffect } from "react";
import useStyles from "./../styles";
import CloseIcon from "./../../../../../../images/icons/math-plus.png";

import { FormGroupTitle, Label, FormBtn } from "./../../../../../../components/UiElements/UiElements";

import {
    Dialog,
    Grid,
    FormHelperText
} from "@material-ui/core";

import { TextareaField, SelectField } from "./../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import SearchList from "../../../../../../components/SearchList/SearchList";

function AddHealthConcern({ closeDirectivesDialog, patientId, healthConcernId, healthConcernData, ...props }) {

    const classes = useStyles();
    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable);
    const defaultAttributes = {
        healthConcernsId: 0, patientId: patientId, healthConcernType: '',
        code: '', note: '', EffectiveDate: null, encounterId: 0, isActive: true,
        recordedDate: null, isDeleted: false
    };
    const [state, setState] = useState(defaultAttributes);
    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });
    const [TypeOption, setTypeOption] = useState([
        { value: "Allergy", label: "Allergy" },
        { value: "Diagnosis", label: "Diagnosis" },
        { value: "Vitals", label: "Vitals" }
    ])

    const openDialog = () => {
        //console.log('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name == 'healthConcernType') {
            setState(prevState => ({
                ...prevState,
                code: '',
                name: ''
            }));
        }
    }
    const handleSearchChangeCode = (name, item) => {

        const { id, value } = item;
        if (!value || value == '') {
            return;
        }
        //if (healthConcernsList.some(obj => obj.healthConcernType == carePlanState.healthConcernType && obj.code == id)) {
        //    setCarePlanState(prevState => ({
        //        ...prevState,
        //        healthConcernTypeCode: id,
        //        healthConcernTypeName: value
        //    }));
        //    showMessage("Error", 'Health concern already selected.', "error", 3000);
        //    setTimeout(function () {
        //        setCarePlanState(prevState => ({
        //            ...prevState,
        //            healthConcernTypeCode: '',
        //            healthConcernTypeName: ''
        //        }));
        //    }, 100);
        //    return;
        //}
        setState(prevState => ({
            ...prevState,
            code: id,
            name: value
        }));
        //let _healthConcernsList = [...healthConcernsList];
        //_healthConcernsList.push({ 'code': id, 'name': value, 'healthConcernType': carePlanState.healthConcernType, isDeleted: false });
        //setHealthConcernsList(_healthConcernsList);
        //setTimeout(function () {
        //    setCarePlanState(prevState => ({
        //        ...prevState,
        //        healthConcernTypeCode: '',
        //        healthConcernTypeName: ''
        //    }));
        //}, 100);
    }
    
    const save = (e) => {

        e.preventDefault();

        let errorList = []

        if (!state.healthConcernType || state.healthConcernType.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernType: true
            }));
            errorList.push(true);
            //carePlanRef.carePlanGoalRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernType: false
            }));
        }
        if (!state.code || state.code.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCode: true
            }));
            errorList.push(true);
            //carePlanRef.carePlanStartDateRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCode: false
            }));
        }



        if (errorList.length < 1) {
            if (state.healthConcernsId == 0 && healthConcernData.some(o => o.type == state.healthConcernType && o.value == state.code)) {
                showMessage("Error", "Health concern already exist", "error", 3000);
                return;
            }
            let method = "patienthealthconcerns/add";
            if (state.healthConcernsId > 0)
                method = "patienthealthconcerns/update";

            //carePlanState.carePlanDiagnosisList.push(carePlaneDiagnosisState)
            //carePlanState.careTeamList = careTeamList;
            //carePlanState.carePlanInterventionList = carePlanInterventionList;
            //carePlanState.healthConcernsList = healthConcernsList;

            //carePlanState.status = carePlanState.status == 'Active' ? true : false;
            state.patientId = parseInt(patientId);

            PostDataAPI(method, state, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);

                    closeDirectivesDialog();
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
    useEffect(() => {
        debugger;
        console.log(props.isEditable)
        if (healthConcernId > 0)
            loadData();
    }, []);
    const loadData = () => {
        
        PostDataAPI("patienthealthconcerns/get", healthConcernId).then((result) => {

            if (result.success && result.data != null) {
                
                setState(result.data);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteRecord = () => {

        var data = {
            healthConcernsId: state.healthConcernsId
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the health concern?", "confirm", function () {
            setDeleteLoading(true);
            PostDataAPI('patienthealthconcerns/delete', data, true).then((result) => {
                setDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    closeDirectivesDialog();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })

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
        <>
            <Dialog
                maxWidth="550px"
                draggable
                onClose={closeDirectivesDialog}
                open={openDialog}
                classes={{ paper: classes.dialogPaper }}

            >
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton}><img src={CloseIcon} onClick={closeDirectivesDialog} /></span>
                            {props.isEdit ?
                                <FormGroupTitle className={classes.lableTitleInput}>Edit Health Concern</FormGroupTitle>
                                : <FormGroupTitle className={classes.lableTitleInput}>Add Health Concern</FormGroupTitle>
                            }
                        </div>

                        <div className={classes.content}>

                            <Grid container direction="row" alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Select Type" size={2} mandatory={true} />

                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>

                                    <SelectField
                                        id="healthConcernType"
                                        name="healthConcernType"
                                        value={state.healthConcernType}
                                        placeholder="Select Type"
                                        onChange={handleChange}
                                        options={TypeOption}
                                    />
                                    {errorMessages.errorHealthConcernType && (!state.healthConcernType || state.healthConcernType.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                        Please select health concern type
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Concern" size={2} mandatory={true} />

                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                    {state.healthConcernType == 'Diagnosis' ?
                                        <SearchList
                                            id="code"
                                            name="code"
                                            code={'ICD'}
                                            apiUrl="ddl/loadItems"
                                            searchTerm={state.name}
                                            //searchId={userLocationId}
                                            value={state.name}
                                            onChangeValue={(name, item) => handleSearchChangeCode(name, item)}
                                            placeholderTitle="Search Diagnosis"
                                            reload={true} /> :
                                        (state.healthConcernType == 'Allergy' ?
                                            <SearchList
                                                id="code"
                                                name="code"
                                                code={'get_all_allergies'}
                                                apiUrl="ddl/loadItems"
                                                searchTerm={state.name}
                                                //searchId={userLocationId}
                                                value={state.name}
                                                onChangeValue={(name, item) => handleSearchChangeCode(name, item)}
                                                placeholderTitle="Search Allergy"
                                                reload={true} /> :
                                            <SearchList
                                                id="code"
                                                name="code"
                                                code={'all_vitals'}
                                                apiUrl="ddl/loadItems"
                                                searchTerm={state.name}
                                                //searchId={userLocationId}
                                                value={state.name}
                                                onChangeValue={(name, item) => handleSearchChangeCode(name, item)}
                                                placeholderTitle={!state.healthConcernType || state.healthConcernType == "" ? "" : "Search Vitals"}
                                                reload={true}
                                                isDisabled={!state.healthConcernType || state.healthConcernType == ""} />)
                                    }
                                    {/*<SelectField*/}
                                    {/*    id="code"*/}
                                    {/*    name="code"*/}
                                    {/*    placeholder={"Search"}*/}
                                    {/*    options={state.healthConcernType == 'Diagnosis' ? diagnosisList : (state.healthConcernType == 'Allergy' ? allergiesList : (state.healthConcernType == 'Vitals' ? vitalsList : []))}*/}
                                    {/*    value={state.code}*/}
                                    {/*    onChange={handleChange}*/}
                                    {/*/>*/}
                                    {errorMessages.errorCode && (!state.code || state.code.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                        Please select concern
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Notes" size={2} />

                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>

                                    <TextareaField
                                        rowsMin={12}
                                        placeholder=""
                                        onChange={handleChange}
                                        name="note"
                                        MaxLength="700"
                                        minWidth="650px"
                                        value={state.note}
                                    />



                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="flex-start" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item container direction="row" alignItems="left" justify="left" xs={2} sm={2} md={2} lg={2} xl={2} />
                                <Grid item container direction="row" alignItems="left" justify="left" xs={9} sm={9} md={9} lg={9} xl={9}>
                                    <FormBtn id="save" size="medium" onClick={save} disabled={!isEditable}> Save </FormBtn>
                                    {
                                        healthConcernId > 0 ?
                                            deleteLoading ?
                                                <FormBtn id="loadingDelete" size="medium">Delete</FormBtn> :
                                                <FormBtn id="delete" onClick={() => deleteRecord()} size="medium" disabled={!isEditable}>Delete</FormBtn>
                                            : null
                                    }
                                    <FormBtn id="reset" onClick={closeDirectivesDialog}>Cancel</FormBtn>

                                </Grid>
                            </Grid>


                        </div>

                    </div>
                </div>
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

export default withSnackbar(AddHealthConcern);