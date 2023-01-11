
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
} from '@material-ui/core';

import { FormBtn, Label, FooterBtn } from "../../../../../../components/UiElements";
import { TextareaField, RadioboxField } from "../../../../../../components/InputField";
import { SelectField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { Scrollbars } from "rc-scrollbars"
function RiskAssessment({ handleClose, handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    // handle styles
    const [isEditable] = useState(props.isEditable)
    var classes = useStyles();
    const [state, setState] = useState({});
    const [dataId, setDataId] = useState(0);
    const [patientId] = useState(props.patientId);

    //dropdown lists
    const [excerciseList, setExerciseList] = useState([]);
    const [exposureList, setExposureList] = useState([]);
    const [seatbeltList, setSeatbeltList] = useState([]);
    //end dropdown lists
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
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
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    //
    const radioBoxList = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const init = () => {
        setState({
            feelSafeAtHome: "Yes", suicideRisk: 'No',
            riskAssessmentId: 0,
            patientId: parseInt(patientId),
            exerciseCode: "",
            eeatbeltCode: "",
            exposureCode: "",
            isSuicideRisk: false,
            safeAtHome: true,
            additionalInfo: "",
            createDate: new Date()
        });
    }

    const resetForm = () => {

        if (parseInt(dataId) > 0) {
            loadData();
        }
        else {
            init();
        }
    }

    useEffect(() => {
        init();
        loadData();

        var params = {
            code: "DDL_List_Item",
            parameters: ['seatbelt_code', 'exercise_code', 'exposure_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var _excerciseList = [];
                var _exposureList = [];
                var _seatbeltList = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'exercise_code':
                            _excerciseList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'exposure_code':
                            _exposureList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'seatbelt_code':
                            _seatbeltList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                })
                setExerciseList(_excerciseList);
                setExposureList(_exposureList);
                setSeatbeltList(_seatbeltList);
            }

        });
    }, []);

    const loadData = () => {
        GetDataAPI("encounter/history/riskassessment/getList", "patientId=" + patientId).then((result) => {
            if (result.success && result.data != null && result.data.length > 0) {
                result.data[0].feelSafeAtHome = result.data[0].safeAtHome ? "Yes" : "No";
                result.data[0].suicideRisk = result.data[0].isSuicideRisk ? "Yes" : "No";
                setState(result.data[0]);
                setDataId(result.data[0].riskAssessmentId);
            }

        })
    }

    const save = () => {

        var method = "encounter/history/riskassessment/add";
        if (dataId > 0)
            method = "encounter/history/riskassessment/update";
        state.safeAtHome = (state.feelSafeAtHome == "Yes");
        state.isSuicideRisk = (state.suicideRisk == "Yes");

        setLoading({ isSaving: true });

        PostDataAPI(method, state, true).then((result) => {

            setLoading({ isSaving: false });

            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.riskAssessmentId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "riskAssessmentId": result.data.riskAssessmentId
                    }));
                }
                showMessage("Success", "Risk Assessment saved successfully.", "success", 3000);
                handleSave();
            }
            else showMessage("Error", result.message, "error", 8000);
        })
    }
    const clear = () => {
        resetForm();
        //setErrorMessages({});
    }
    const deleteRecord = () => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the record?", "confirm", function () {

            setLoading({ isDeleting: true });

            PostDataAPI('encounter/history/riskassessment/delete', state, true).then((result) => {

                setLoading({ isDeleting: false });

                if (result.success == true) {
                    // setErrorMessages({});
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setDataId(0);
                    init();
                    handleSave();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    return (
        <>
            <Grid container >
                <Scrollbars style={{ height: 600 }}>
                    <Grid item lg={12} container direction="row">

                        <Grid container direction="row" lg={12}>
                            <Label title="Exercise" size={3} />
                            <Grid item xs={12} sm={4} md={4} lg={4} >

                                <SelectField
                                    id="exerciseCode"
                                    name="exerciseCode"
                                    value={state.exerciseCode}
                                    placeholder=" Select Exercise"
                                    options={excerciseList}
                                    onChange={handleChange}
                                />

                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>
                            <Label title="Seatbelt" size={3} />
                            <Grid item xs={12} sm={4} md={4} lg={4} >

                                <SelectField
                                    id="seatbeltCode"
                                    name="seatbeltCode"
                                    value={state.seatbeltCode}
                                    placeholder=" Select Seatbelt"
                                    options={seatbeltList}
                                    onChange={handleChange}
                                />

                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>
                            <Label title="Exposure" size={3} />
                            <Grid item xs={12} sm={4} md={4} lg={4}>

                                <SelectField
                                    id="exposureCode"
                                    name="exposureCode"
                                    value={state.exposureCode}
                                    placeholder=" Select Exposure"
                                    options={exposureList}
                                    onChange={handleChange}
                                />

                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>
                            <Label title="Suicide Risk" size={3} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <RadioboxField
                                    name="suicideRisk"
                                    value={state.suicideRisk ? state.suicideRisk : ""}
                                    labelPlacement="end"
                                    onChange={handleChange}
                                    options={radioBoxList} />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>
                            <Label title="Feel Safe at home" size={3} />
                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                <RadioboxField
                                    name="feelSafeAtHome"
                                    value={state.feelSafeAtHome ? state.feelSafeAtHome : ""}
                                    labelPlacement="end"
                                    onChange={handleChange}
                                    options={radioBoxList} />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>
                            <Label title="Additional Information" isTextAreaInput={true} size={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8}>
                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Additional Information"
                                    onChange={handleChange}
                                    name="additionalInfo"
                                    value={state.additionalInfo}
                                    MaxLength="4000"
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid container  direction="row" lg={12}>
                        <Grid container  direction="row" justify="flex-end" xs={12} sm={11} md={11} lg={11}>
                            <div className={classes.footerBtn}>
                                { loading.isSaving ?

                                    <FormBtn id="loadingSave"> Save</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={save}> Save</FormBtn>
                                }
                                {
                                    parseInt(dataId) > 0 ?
                                        loading.isDeleting ?

                                        <FormBtn id="loadingDelete"> Delete</FormBtn>
                                        :
                                        <FormBtn id="delete" onClick={deleteRecord}> Delete</FormBtn>
                                : null
                                }
                                <FormBtn id="save"  onClick={handleNext}> Next</FormBtn>
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>                            
                        </Grid>
                    </Grid> */}
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <FooterBtn className={classes.footerBtn}>
                        {loading.isSaving ?

                            <FormBtn id="loadingSave"> Save</FormBtn>
                            :
                            <FormBtn id="save" disabled={ !isEditable}onClick={save}> Save</FormBtn>
                        }
                        {
                            parseInt(dataId) > 0 ?
                                loading.isDeleting ?

                                    <FormBtn id="loadingDelete"> Delete</FormBtn>
                                    :
                                    <FormBtn id="delete" disabled={!isEditable}  onClick={deleteRecord}> Delete</FormBtn>
                                : null
                        }
                        {/* <FormBtn id="save" onClick={handleNext} btnType="next"> Next</FormBtn> */}
                       
                        {parseInt(dataId) > 0 ?
                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </FooterBtn>
                </Grid>
            </Grid>
            <LogDialog
                code="riskassessment"
                id={state.riskAssessmentId}
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

export default withSnackbar(RiskAssessment)