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
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import SearchList from "../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../Services/PostDataAPI';



function CognitiveStatusDialog({ showHideDialog, handleClose, ...props }) {


    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const [encounterId, setEncounterId] = useState(props.encounterId);

    const cognitiveStatusRef = useState({ assessmentRef: "", effectiveDateRef: "" })

    const [csState, setCSstate] = useState({
        cognitiveStatusID: 0, encounterID: 0, assessment: "", isNormal: "False",
        effectiveDate: new Date().toISOString().split('T')[0],
        resolvedDate: null,
        comments: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorAssessment: false, errorIsNormal: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
    });

    const radioBoxList = [
        { value: "True", label: "Normal" },
        { value: "False", label: "Abnormal" }
    ]

    useEffect(() => {

        if (showHideDialog) {

            //loadData(props.encounterId);

            setCSFormData();


        }

    }, [showHideDialog]);


    const loadData = (encounterId) => {

        let procData = {
            "encounterID": encounterId
        }

        // PostDataAPI("CognitiveStatus/loadCognitiveStatusGrid", procData).then((result) => {

        //    if (result.success && result.data != null) {

        //setRowsData(
        //    result.data.map((item, i) => {

        //        setCSstate({
        //            cognitiveStatusID: result.data[0].cognitiveStatusID,
        //            encounterID: result.data[0].encounterID,
        //            assessment: result.data[0].assessment,
        //            isNormal: (result.data[0].isNormal) ? "True" : "False",
        //            effectiveDate: new Date(result.data[0].effectiveDate).toISOString().split('T')[0],
        //            resolvedDate: new Date(result.data[0].resolvedDate).toISOString().split('T')[0],
        //            comments : result.data[0].comments

        //        });
        //    }));
        //       }
        //    })

    }

    const setCSFormData = e => {

        let procData = {
            "encounterID": props.encounterId
        }
        PostDataAPI("CognitiveStatus/loadCognitiveStatusForEncounter", procData).then((result) => {

            if (result.success && result.data) {

                setCSstate({
                    cognitiveStatusID: result.data.cognitiveStatusID,
                    encounterID: result.data.encounterID,
                    assessment: result.data.assessment,
                    isNormal: result.data.isNormal ? "True" : "False",
                    effectiveDate: result.data.effectiveDate ? result.data.effectiveDate.split('T')[0] : null, //new Date(result.data.effectiveDate).toISOString().split('T')[0],
                    resolvedDate: result.data.resolvedDate ? result.data.resolvedDate.split('T')[0] : null, //!result.data.resolvedDate ? null : new Date(result.data.resolvedDate).toISOString().split('T')[0],
                    comments: result.data.comments
                });
            }
            else {

                setCSstate(prevState => ({
                    ...prevState,
                    cognitiveStatusID: 0, encounterID: 0, assessment: "", isNormal: "False",
                    effectiveDate: new Date().toISOString().split('T')[0],
                    resolvedDate: null,
                    comments: ""
                }));
            }

            setErrorMessages(prevState => ({
                ...prevState,
                errorAssessment: false, errorIsNormal: false, errorEffectiveDate: false, errorFDateGreaterThanLDate: false, /*errorResolvedDate: false*/
            }));
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCSstate(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleAssessmentChange = (name, item) => {

        const { id, value } = item;

        setCSstate(prevState => ({
            ...prevState,
            "assessment": value
        }));

    }

    const saveCognitiveStatus = (e) => {

        e.preventDefault();

        let errorList = [];

        if (!csState.effectiveDate || csState.effectiveDate.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: true
            }));
            errorList.push(true);
            cognitiveStatusRef.effectiveDateRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: false
            }));
        }

        if (!csState.assessment || csState.assessment.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAssessment: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAssessment: false
            }));
        }

        if (!csState.isNormal || csState.isNormal.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIsNormal: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIsNormal: false
            }));
        }

        //if (!csState.resolvedDate || csState.resolvedDate.trim() == "") {
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
        if (csState.effectiveDate && csState.resolvedDate && csState.effectiveDate > csState.resolvedDate) {
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

        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "CognitiveStatus/addUpdateCognitiveStatus";

            csState.encounterID = props.encounterId;
            csState.isNormal = csState.isNormal == "True" ? true : false;

            PostDataAPI(method, csState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    setCSstate({
                        cognitiveStatusID: result.data.cognitiveStatusID,
                        encounterID: result.data.encounterID,
                        assessment: result.data.assessment,
                        isNormal: result.data.isNormal,
                        effectiveDate: result.data.effectiveDate ? result.data.effectiveDate.split('T')[0] : "", //new Date(result.data.effectiveDate).toISOString().split('T')[0],
                        resolvedDate: result.data.resolvedDate ? result.data.resolvedDate.split('T')[0] : "", //!result.data.resolvedDate ? null : new Date(result.data.resolvedDate).toISOString().split('T')[0],
                        comments: result.data.comments
                    });

                    showMessage("Success", "Data saved successfully.", "success", 3000);
                    setIsSaving(false);
                    handleClose();
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

    return (
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
                            <FormGroupTitle className={classes.lableTitleInput}>Cognitive Status</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Assessment" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <SearchList
                                            id="assessment"
                                            name="assessment"
                                            value={csState.assessment}
                                            searchTerm={csState.assessment}
                                            code="congnitive_assesment"
                                            apiUrl="ddl/loadItems"
                                            placeholderTitle="Search Assessment"
                                            onChangeValue={(name, item) => handleAssessmentChange(name, item)}

                                        />
                                        {errorMessages.errorAssessment && (!csState.assessment || csState.assessment.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please select assessment
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <RadioboxField
                                            id="select"
                                            name="isNormal"
                                            value={csState.isNormal}
                                            options={radioBoxList}
                                            onChange={handleChange}
                                        />

                                        {errorMessages.errorIsNormal && (!csState.isNormal || csState.isNormal.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please select normal or abnormal
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Effective Date" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            type="date"
                                            id="effectiveDate"
                                            name="effectiveDate"
                                            value={csState.effectiveDate}
                                            onChange={handleChange}
                                            inputProps={{ ref: input => cognitiveStatusRef.effectiveDateRef = input }}
                                        />
                                        {errorMessages.errorEffectiveDate && (!csState.effectiveDate || csState.effectiveDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                            Please select effective date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Resolved Date" size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            type="date"
                                            id="resolvedDate"
                                            name="resolvedDate"
                                            value={csState.resolvedDate}
                                            onChange={handleChange}
                                        />
                                        {/*{errorMessages.errorResolvedDate && (!csState.resolvedDate || csState.resolvedDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >*/}
                                        {/*    Please select resolved date*/}
                                        {/*</FormHelperText>) : ('')}*/}

                                        {errorMessages.errorFDateGreaterThanLDate && (csState.resolvedDate && csState.effectiveDate) && csState.effectiveDate > csState.resolvedDate ? (<FormHelperText style={{ color: "red" }} >
                                            Effective date must be less then resolved date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Comments" isTextAreaInput={true} size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            rowsMin={5}
                                            MaxLength="500"
                                            id="comments"
                                            name="comments"
                                            value={csState.comments}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                {/* <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={11} sm={11} md={11} lg={11} xl={11}>
                                        <FormGroupTitle></FormGroupTitle>
                                    </Grid>
                                </Grid> */}

                            </Grid>
                        </div>
                        {/* <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {isSaving ?
                                    <FormBtn id="loadingSave" > Save</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={saveCognitiveStatus}  > Save</FormBtn>
                                }
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>
                        </div> */}
                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                            <Grid item alignItems="flex-start" justify="flex-end" xs={9} sm={9} md={9} lg={9} xl={9}>
                                {isSaving ?
                                    <FormBtn id="loadingSave" > Save</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={saveCognitiveStatus}  > Save</FormBtn>
                                }
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Scrollbars>
        </Dialog>
    )

}
export default withSnackbar(CognitiveStatusDialog)
