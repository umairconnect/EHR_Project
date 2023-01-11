
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    FormHelperText,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    FormLabel,
    Button,
} from '@material-ui/core';
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../components/UiElements";
import { InputBaseField, TextareaField, CheckboxField, SelectField } from "../../../../../components/InputField";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../components/Message/Alert'
import SearchList from "../../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../components/LogDialog/LogDialog";

function AllergyForm({ dialogOpenClose, handleClose, handleSuccess, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable);
    const [logdialogstate, setLogDialogState] = useState(false);
    const [allergyId, setAllergyId] = useState(props.allergyId);
    const [patientId] = useState(props.patientId);
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));

    //dropdown lists
    const [typeList, setTypeList] = useState([]);
    const [reactionList, setReactionList] = useState([]);
    const [severityList, setSeverityList] = useState([]);
    const [allergyOnsetOptionCodes, setAllergyOnsetOptionCodes] = useState([]);
    //end dropdown lists
    const [errorMessages, setErrorMessages] = useState({
    });

    const [state, setState] = useState({});
    const allergyRef = useState({ allergyTypeRef: "", });
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const [allergyStatusCodeList, setAllergyStatusCodeList] = useState([]);

    const handleChange = e => {

        const { name, value } = e.target;

        if (name === "allergyOnset") {

            if (value != "Specific_Date") {

                setState(prevState => ({
                    ...prevState,
                    startDatetime: null,
                    endDatetime: null
                }));

            }

        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


    };
    const handleTypeChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        setState(prevState => ({
            ...prevState,
            "rxnorm": ""
        }));
        setState(prevState => ({
            ...prevState,
            "allergyName": ""
        }));
    };
    const handleChkboxChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,

        }));
    }
    const handleAllergyChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        //  var label = e.target.options[e.target.selectedIndex].text;

        setState(prevState => ({
            ...prevState,
            "allergyName": value
        }));
    }
    const init = () => {
        setState({
            allergyId: 0,
            patientId: patientId,
            allergyTypeCode: "specific_drug_allergy",
            rxnorm: "",
            allergyName: "",
            reactionCode: "",
            severityCode: "",
            allergyStatusCode: true,
            allergyStatus: "Active",
            startDatetime: new Date().toISOString().split('T')[0],
            endDatetime: null,
            notes: "",
            createDate: new Date(),
            createdBy: 0
        });
    }

    const ResetForm = () => {

        if (parseInt(allergyId) > 0) {
            state.allergyId = allergyId;
            state.rxnorm = "";
            state.allergyName = "";
            loadData();
        }
        else {
            init();
        }
    }

    const loadData = () => {
        PostDataAPI("patient/allergy/getAllergy", allergyId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.startDatetime)
                    result.data.startDatetime = result.data.startDatetime.split('T')[0];
                if (result.data.endDatetime)
                    result.data.endDatetime = result.data.endDatetime.split('T')[0];
                var _allergyStatus = "Active";
                if (!result.data.allergyStatusCode) {
                    _allergyStatus = "In_Active";
                }
                setState(result.data);
                setState(prevState => ({
                    ...prevState,
                    "allergyStatus": _allergyStatus
                }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    useEffect(() => {
        ResetForm();

        var params = {
            code: "DDL_List_Item",
            parameters: ['severity_code', 'allergy_type_code', 'reaction_code', 'Allergy_onset_option_code', 'allergy_status_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _typeList = [];
                var _sevList = [];
                var _reactionList = [];
                var _allergyOnsetOptionCode = [];

                var _allergyStatusCodeList = [];


                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'allergy_type_code':
                            _typeList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'severity_code':
                            _sevList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'reaction_code':
                            _reactionList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'Allergy_onset_option_code':
                            _allergyOnsetOptionCode.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'allergy_status_code':
                            _allergyStatusCodeList.push({ value: item.text1, label: item.text2 });
                            _allergyStatusCodeList.splice(2, 1);

                    }



                    //  console.info(item)


                })

                console.info(result.data)

                setTypeList(_typeList);
                setSeverityList(_sevList);
                setReactionList(_reactionList);
                setAllergyOnsetOptionCodes(_allergyOnsetOptionCode);
                setAllergyStatusCodeList(_allergyStatusCodeList);
            }

        });
    }, [dialogOpenClose]);

    const Save = () => {

        var validated = true;
        if (state.allergyTypeCode == 'no_known_drug_allergy')
            state.allergyName = "No known Drug Allergy (NKDA)";

        if (!state.allergyName || state.allergyName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                allergyName: true
            }));
            validated = false;
            allergyRef.allergyTypeRef.focus();
        }

        if (state.endDatetime != null && state.endDatetime != "") {
            if (new Date(state.startDatetime ? state.startDatetime : null) > new Date(state.endDatetime)) {
                showMessage("Error", "Observation date should not be greater then end date", "error", 8000);
                validated = false;
            }

        }

        state.allergyStatusCode = state.allergyStatus == 'Active' ? true : false;
        state.encounterId = encounterId;
        if (validated == false)
            return;
        setLoading({ isSaving: true });
        var method = "patient/allergy/addAllergy";
        if (allergyId > 0)
            method = "patient/allergy/updateAllergy";
        console.log(state);
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {
                setLoading({ isSaving: false });
                handleSuccess("Allergy saved successfully.");
                //if (allergyId < 1) {
                //    setAllergyId(result.data.allergyId);
                //    setState(prevState => ({
                //        ...prevState,
                //        "createdBy": result.data.createdBy
                //    }));
                //    setState(prevState => ({
                //        ...prevState,
                //        "allergyId": result.data.allergyId
                //    }));
                //
                //}
                //showMessage("Success", "Allergy saved successfully.", "success", 3000);
                //setLoading({ isSaving: false });
                //setTimeout(handleClose, 3000);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading({ isSaving: false });
            }
        })
    }

    function clear() {
        ResetForm();
        setErrorMessages({});
    }
    function deleteRecord() {
        setLoading({ isDeleting: true });
        PostDataAPI('patient/allergy/deleteAllergy', state, true).then((result) => {
            if (result.success == true) {
                setLoading({ isDeleting: false });
                setErrorMessages({});
                handleSuccess("Record deleted successfully.");
                //showMessage("Success", "Record deleted successfully.", "success", 2000);
                //setAllergyId(0);
                //init();
                //setTimeout(handleClose, 3000);
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
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                classes={{ paper: classes.dialogPaper }}>

                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    <Grid lg={12} container item direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle>{allergyId > 0 ? "Edit Allergy" : "New Allergy"}</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container item direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent className={classes.DialogContent}>
                    <div className={classes.dialogMessage}>
                        <Grid container >
                            <Grid item lg={12} container direction="row">
                                <Label title="Type" mandatory={true} size={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} >
                                    <SelectField
                                        onChange={handleTypeChange}
                                        name="allergyTypeCode"
                                        value={state.allergyTypeCode}
                                        options={typeList}
                                        inputProps={{ ref: input => allergyRef.allergyTypeRef = input }}
                                    />
                                </Grid>
                            </Grid>
                            {
                                state.allergyTypeCode == 'no_known_drug_allergy' ?
                                    ('')
                                    :
                                    (<>

                                        <Grid item lg={12} container direction="row">
                                            {
                                                state.allergyTypeCode == 'specific_drug_allergy' ?
                                                    (<> <Label title="Specific Drug Allergy" mandatory={true} size={3} />
                                                        <Grid item xs={12} sm={8} md={8} lg={8} >
                                                            <SearchList name="rxnorm" value={state.rxnorm} searchTerm={state.allergyName} code="drug_allergies"
                                                                apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleAllergyChange(name, item)}
                                                                placeholderTitle="Search Drug Allergy" />
                                                            {errorMessages.allergyName && (!state.allergyName || state.allergyName.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                                Please select drug allergy
                                                            </FormHelperText>) : ('')}
                                                        </Grid></>)
                                                    :
                                                    state.allergyTypeCode == 'non_drug_allergy' ?
                                                        (<Grid item lg={12} container direction="row">
                                                            <Label title="Allergy Name" mandatory={true} size={3} />
                                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                                <InputBaseField
                                                                    placeholder="Allergy Name"
                                                                    onChange={handleChange}
                                                                    name="allergyName"
                                                                    value={state.allergyName}
                                                                    MaxLength="100"
                                                                />
                                                                {errorMessages.allergyName && (!state.allergyName || state.allergyName.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                                    Please enter allergy name
                                                                </FormHelperText>) : ('')}
                                                            </Grid>
                                                        </Grid>)
                                                        :
                                                        (<> <Label title="Specific Class Allergy" mandatory={true} size={3} />
                                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                                <SearchList name="rxnorm" value={state.rxnorm} searchTerm={state.allergyName} code="class_allergies"
                                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleAllergyChange(name, item)}
                                                                    placeholderTitle="Search Class Allergy" />
                                                                {errorMessages.allergyName && (!state.allergyName || state.allergyName.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                                    Please select class allergy
                                                                </FormHelperText>) : ('')}
                                                            </Grid></>)
                                            }
                                        </Grid>
                                        <Grid item lg={12} container direction="row">
                                            <Label title="Reaction" mandatory={false} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <SelectField
                                                    name="reactionCode"
                                                    value={state.reactionCode}
                                                    placeholder=" Select Reaction"
                                                    options={reactionList}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12} container direction="row">
                                            <Label title="Severity" mandatory={false} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <SelectField
                                                    name="severityCode"
                                                    value={state.severityCode}
                                                    placeholder=" Select Severity"
                                                    options={severityList}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12} container direction="row">
                                            <Label title="Status" mandatory={false} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                {/* <CheckboxField
                                                    color="primary"
                                                    name="allergyStatusCode"
                                                    label="Active"
                                                    checked={state.allergyStatusCode ? true : false}
                                                    onChange={handleChkboxChange}
                                                /> */}


                                                <SelectField
                                                    disableUnderline
                                                    onChange={handleChkboxChange}
                                                    name="allergyStatus"
                                                    value={state.allergyStatus}
                                                    options={allergyStatusCodeList}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item lg={12} container direction="row">
                                            <Label title="Onset" mandatory={false} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <SelectField
                                                    name="allergyOnset"
                                                    value={state.allergyOnset}
                                                    placeholder=" Select Onset"
                                                    options={allergyOnsetOptionCodes}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        {state.allergyOnset === "Specific_Date" ?
                                            <>
                                                <Grid item lg={12} container direction="row">
                                                    <Label title="Observation Date" mandatory={false} size={3} />
                                                    <Grid item xs={12} sm={8} md={8} lg={8} >
                                                        <InputBaseField
                                                            onChange={handleChange}
                                                            name="startDatetime"
                                                            value={state.startDatetime}
                                                            type="date"
                                                            MaxLength="255"

                                                        />
                                                    </Grid>

                                                </Grid>
                                                <Grid item lg={12} container direction="row">
                                                    <Label title="End Date" mandatory={false} size={3} />
                                                    <Grid item xs={12} sm={8} md={8} lg={8} >
                                                        <InputBaseField
                                                            onChange={handleChange}
                                                            name="endDatetime"
                                                            value={state.endDatetime}
                                                            MaxLength="255"
                                                            type="date"

                                                        />

                                                    </Grid>
                                                </Grid>
                                            </> : ""
                                        }
                                        <Grid item lg={12} container direction="row">
                                            <Label title="Notes" isTextAreaInput={true} mandatory={false} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <TextareaField
                                                    rowsMin={5}
                                                    placeholder="Notes"
                                                    onChange={handleChange}
                                                    name="notes"
                                                    value={state.notes}
                                                    MaxLength="2000"
                                                />
                                            </Grid>
                                        </Grid>
                                    </>)
                            }
                            <Grid item lg={12} container direction="row">
                                <Grid container item alignItems="center" justify="center" xs={12} sm={12} md={12} lg={12} >
                                    {loading.isSaving ?
                                        <FormBtn id="loadingSave" disabled={false} size="medium">
                                            Save
                                        </FormBtn>
                                        : <FormBtn id="save" disabled={!isEditable}onClick={Save} size="medium">
                                            Save
                                        </FormBtn>
                                    }
                                    {
                                        allergyId > 0 ?
                                            loading.isDeleting ?
                                                <FormBtn id="loadingDelete" disabled={false} size="medium">
                                                    Delete
                                                </FormBtn>
                                                : <FormBtn id={"delete"} disabled={!isEditable} onClick={() => ShowActionDialog(true, "Delete", "Are you sure, you want to delete the allergy?", "confirm")} size="medium">
                                                    Delete
                                                </FormBtn>
                                            : null
                                    }
                                    <FormBtn id={"resetBtn"} disabled={!isEditable} onClick={clear} size="medium" >Reset </FormBtn>

                                    {
                                        allergyId > 0 ?
                                            <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                    }
                                    <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
            {logdialogstate ?
                <LogDialog
                    code="patAllergy"
                    id={allergyId}
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
export default withSnackbar(AllergyForm)