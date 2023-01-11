import React, { useState, useEffect } from "react";


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
import CloseIcon from "../../../../../../../images/icons/math-plus.png"
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../components/UiElements";
import { InputBaseField, CheckboxField, CustomSelectField, TextareaField, SelectField, RadioboxField, InputBaseFieldNumber } from "../../../../../../../components/InputField";
import { withSnackbar } from '../../../../../../../components/Message/Alert'

import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import SearchList from "../../../../../../../components/SearchList/SearchList";
import useStyles from "./styles";


function AddScreeningIntervention({ dialogOpenClose, handleClose, ...props }) {

    // handle styles
    var classes = useStyles();

    const { showMessage } = props;
    const [state, setState] = useState({
        screeningResultCode: null, screeningStatusCode: null, startDate: null, endDate: null, Comments: null, ecqm: "The year only"  , Proc: null, encounterId: props.encounterId, patientAppointmentId: props.patientAppointmentId,
    });

    const [interventionData, setInterventionData] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const [errorMessages, setErrorMessages] = useState({
        screeningResultCode: false, screeningStatusCode: false, startDate: false, endDate: false, notes: false, ecqm: false, Proc: false
    });
    const [patientAppointmentId] = useState(props.patientAppointmentId);
    const [encounterId] = useState(props.encounterId);
    const [interventionId, setInterventionId] = useState(props.InterventionId ? props.InterventionId : 0);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [statusList, setStatusList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const ecqmOptions = [
        {
            value: "The year only",
            label: "The year only",
            className: 'adjustLabels',
        },
        {
            value: "All",
            label: "All",
            className: 'adjustLabels',
        },
    ];

    const StatusOptions = [
        {
            value: "Active",
            label: "Active",
        },
        {
            value: "In-Active",
            label: "In-Active",
        }
    ];



    useEffect(() => {
        
        getStatusData();
        getResultData();
        console.info(interventionId)
        if (interventionId > 0)
            loadIntervention();


    }, []);

    const loadIntervention = () => {
        
        
        PostDataAPI('patientscreeningintervention/get', interventionId).then((result) => {
            if (result.success && result.data != null) {
                
                setState(result.data);
                var startDate = null;
                var endDate = null;
                
                if (result.data.startDate) {
                    startDate = result.data.startDate.split('T')[0];
                }
                if (result.data.endDate) {
                    endDate = result.data.endDate.split('T')[0];
                }
                setState(prevState => ({
                    ...prevState,
                endDate :endDate,
                startDate : startDate,
                ScreeningInterventionId : result.data.screeningInterventionId,
                Comments : result.data.comments,
                Proc: result.data.description,
                ecqm: "The year only"
                }));
                console.info(state)
            }


        })
    }

    const clearfields = () => {


        setState(prevState => ({
            screeningResultCode: null, screeningStatusCode: null, startDate: null, endDate: null, Comments: null, ecqm: "The year only" ,Proc: null, encounterId: props.encounterId, patientAppointmentId: props.patientAppointmentId

        }));
        //handleClose();

        setInterventionId(0);
    }

    const resetfields = () => {


        setState(prevState => ({
            screeningResultCode: null, screeningStatusCode: null, startDate: null, endDate: null, Comments: null, ecqm: "The year only", Proc: null, encounterId: props.encounterId, patientAppointmentId: props.patientAppointmentId

        }));
        handleClose();

        setInterventionId(0);
    }

    const InterventionsValidations = (validated) => {


        //if (state.screeningResultCode == "" || state.screeningResultCode == null) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        screeningResultCode: true
        //    }));
        //    validated = false;
        //}


        if (!state.Proc || state.Proc.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                Proc: true
            }));
            validated = false;

        }
      
       

        if (state.screeningStatusCode == "" || state.screeningStatusCode == null) {

            setErrorMessages(prevState => ({
                ...prevState,
                screeningStatusCode: true
            }));
            validated = false;

        }
        
        if (state.ecqm== "" || state.ecqm == null ) {

            setErrorMessages(prevState => ({
                ...prevState,
                ecqm: true
            }));
            validated = false;

        }
       


        return validated;

    }

    const Save = () => {
        console.info(state)

        var validated = true;
        validated = InterventionsValidations(validated);

        if (validated == false)
            return;

        var method = ""
        if (interventionId > 0 ) {
             method = "patientscreeningintervention/update";


        }
        else {
             method = "patientscreeningintervention/AddScreeningIntervention";
        }

        setLoading({ isSaving: true });
        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {


                showMessage("Success", "Screening Intervention saved successfully.", "success", 3000);
                setLoading({ isSaving: false });
                setTimeout(function () { handleClose(); }, 500);

            }
            else {
                setLoading({ isSaving: false });
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    const handleSearchChange = (name, item, val) => {
   
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: value,
            [val]: id,
            procedure:value+"-*"+id
        }));
    }
    const handleSearchResultChange = (name, item, val) => {
        
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            [name]: value,
            [val]: id
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


    };



    const getStatusData = e => {

        var params = {
            code: "screening_status_code",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setStatusList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

                //setChartNotesState(prevState => ({
                //    ...prevState,
                //    ['dischargeDispositionCode']: result.data[0].text1
                //}));
            }
        });
    }

    const Delete =()=> {

        var data = {
            ScreeningInterventionId: interventionId 
        }
       //ShowActionDialog(true, "Delete", "Are you sure, you want to delete this screening intervention?", "confirm", function () {
            setDeleteLoading(true);
            PostDataAPI('patientscreeningintervention/delete', data, true).then((result) => {
                

                if (result.success == true) {
                    //debugger
                    showMessage("Success", "Record deleted successfully.", "success", 10000);
                    setDeleteLoading(false);
                    setTimeout(function () { handleClose(); }, 500);
                  
                    clearfields();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
      //  })


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

    const getResultData = e => {

        var params = {
            code: "screening_result_code",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setResultList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

                //setChartNotesState(prevState => ({
                //    ...prevState,
                //    ['dischargeDispositionCode']: result.data[0].text1
                //}));
            }
        });
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
                            <span className={classes.crossButton} onClick={clearfields}><img src={CloseIcon} /></span>
                            <FormGroupTitle>Screenings/Interventions/Assessments</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container item direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={resetfields}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent className={classes.DialogContent}>
                    <Grid item lg={12} container direction="row">
                        <Label title="eCQM" mandatory={true} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <RadioboxField id="ecqm" name="ecqm" options={ecqmOptions} value={state.ecqm} onChange={handleChange} />
                            {errorMessages.ecqm && !state.mui - 58120 ? (<FormHelperText style={{ color: "red" }} >
                                Please select eCQM
                            </FormHelperText>) : ('')}  
                        </Grid>
                        
                    </Grid>

                    <Grid item lg={12} container direction="row" alignItems="baseline">
                        <Label title="Procedure" mandatory={true} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <SearchList
                                id="Proc"
                                name="Proc"
                                code="Lionic"
                                elemCode="payerCode"
                                apiUrl="ddl/loadItems"
                                searchTerm={state.Proc}
                                onChangeValue={(name, item, elemCode) => handleSearchChange(name, item, elemCode)}
                                placeholderTitle="Search Procedure"
                            />
                            {errorMessages.Proc && !state.Proc ? (<FormHelperText style={{ color: "red" }} >
                                Please select procedure
                            </FormHelperText>) : ('')}

                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row" alignItems="baseline">
                        <Label title="Status" mandatory={true} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <SelectField

                                id="allergyStatus"
                                onChange={handleChange}
                                value={state.screeningStatusCode}
                                name="screeningStatusCode"
                                options={statusList}
                                placeholder="Select Status"

                            />
                            {errorMessages.screeningStatusCode && !state.screeningStatusCode ? (<FormHelperText style={{ color: "red" }} >
                                Please select status
                            </FormHelperText>) : ('')}
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row" alignItems="baseline">
                        <Label title="Result" mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            {/*<SelectField*/}
                            {/*    id="result"*/}
                            {/*    name="screeningResultCode"*/}
                            {/*    value={state.screeningResultCode}*/}
                            {/*    options={resultList}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    placeholder="Select Result"*/}
                            {/*/>*/}
                            <SearchList
                                id="screeningResultCode"
                                name="screeningResultCode"
                                code="SNOMED"
                                elemCode="result"
                                apiUrl="ddl/loadItems"
                                searchTerm={state.screeningResultCode}
                                onChangeValue={(name, item, elemCode) => handleSearchResultChange(name, item, elemCode)}
                                placeholderTitle="Search Result"
                            />
                            {errorMessages.screeningResultCode && !state.screeningResultCode ? (<FormHelperText style={{ color: "red" }} >
                                Please select result
                            </FormHelperText>) : ('')}


                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row" alignItems="baseline">
                        <Label title="Start Date" mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <InputBaseField
                                onChange={handleChange}
                                name="startDate"
                                type="date"
                                MaxLength="255"
                                value={state.startDate}

                            />
                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row" alignItems="baseline">
                        <Label title="End Date" mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <InputBaseField
                                onChange={handleChange}
                                name="endDate"
                                type="date"
                                MaxLength="255"
                                value={state.endDate}

                            />
                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Label title="Comments" isTextAreaInput={true} mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                            <TextareaField
                                rowsMin={5}
                                onChange={handleChange}
                                name="Comments"
                                MaxLength="2000"
                                value={state.Comments}
                            />
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Grid item xs={3} md={3} lg={3} />
                        <Grid container item alignItems="center" justify="end" xs={9} sm={9} md={9} lg={9}>
                            <FormBtn id="save" size="medium" onClick={Save}>Save</FormBtn>
                            {interventionId?<><FormBtn id="delete" size="medium" onClick={Delete}>Delete</FormBtn></>:''}

                            <FormBtn id={"reset"} size="medium" onClick={resetfields}>Close</FormBtn>
                        </Grid>
                        <Grid item alignItems="center" justify="end" xs={1} sm={1} md={1} lg={1} />
                    </Grid>

                </DialogContent>



            </Dialog>
        </>
    )
}
export default withSnackbar(AddScreeningIntervention)