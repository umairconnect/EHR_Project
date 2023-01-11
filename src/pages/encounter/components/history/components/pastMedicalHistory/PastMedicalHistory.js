
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import { FormLabel, Grid, Paper } from '@material-ui/core';
import DeleteIcon from "../../../../../../images/icons/trash.png";
import { FormBtn, FormGroupTitle, Label, FooterBtn } from "../../../../../../components/UiElements";
import { InputBaseField, TextareaField, RadioboxField, CheckboxField } from "../../../../../../components/InputField";
import { SelectField } from "../../../../../../components/InputField";
import SearchList from "../../../../../../components/SearchList/SearchList"
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { Scrollbars } from 'rc-scrollbars';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

function PastMedicalHistory({ handleClose,handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    const icdCodeList = [
        { code: "F06.4", desc: "pastMedicalHistoryCheckboxState" },
        { code: "F06.4 1", desc: "pastMedicalHistoryCheckboxState 1" },
    ]
    // handle styles
    var classes = useStyles();
    const [state, setState] = useState({
        icdCode: "",
        icdName: ""
    });
    const [pastMedicalHistoryCheckboxState, setPastMedicalHistoryCheckboxState] = useState([]);
    const [dataId, setDataId] = useState(0);
    const [patientId] = useState(props.patientId);
    const [errorMessages, setErrorMessages] = useState({});
    const [isEditable] = useState(props.isEditable)
    const [histItems, setHistItems] = useState([]);
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
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
    //

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCheckBoxChange = e => {

        const { name, value } = e.target;
        var val = !pastMedicalHistoryCheckboxState[name];

        setPastMedicalHistoryCheckboxState(prevState => ({
            ...prevState,
            [name]: val
        }));
        if (!state.subItems)
            state.subItems = [];

        var lstSubItems = [];
        state.subItems.map((item, i) => {
            if (val == true || item.medHisSubItemId != name)
                lstSubItems.push(item)
        });
        if (val == true) {
            lstSubItems.push({ medHisSubItemId: parseInt(name) });
        }

        setState(prevState => ({
            ...prevState,
            "subItems": lstSubItems
        }));

    }
    const handleDiagnosisChange = (name, item) => {

        const { id, value } = item;

        if (arrayObjectIndexOf(state.diagnosis, value, "icdName") != -1) {

            showMessage("Error", "Diagnosis already exists", "error", 8000);

            setState(prevState => ({
                ...prevState,
                icdCode: id,
                icdName: value
            }));
            setTimeout(() => {

                setState(prevState => ({
                    ...prevState,
                    icdCode: "",
                    icdName: ""
                }));

            }, 100);

            return false;
        }

        var data = {
            icdCode: id,
            icdName: value
        };
        if (!state.diagnosis)
            state.diagnosis = [];

        var lstDiagnosis = state.diagnosis;
        lstDiagnosis.push(data);

        //setState(prevState => ({
        //    ...prevState,
        //    "diagnosis": lstDiagnosis
        //}));

        setState(prevState => ({
            ...prevState,
            icdCode: id,
            icdName: value
        }));
        setTimeout(() => {

            setState(prevState => ({
                ...prevState,
                icdCode: "",
                icdName: ""
            }));

        }, 100);


    }

    const loadSubItems = () => {
        var params = {
            code: "load_med_hist_items",
            parameters: ['']
        };


        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                //{ value: true, label: "Jaundice", id: "jaundice" },
                setHistItems(
                    result.data.map((item, i) => {
                        return { id: item.text1, label: item.text2, value: true };
                    }));
            }
        });
    }

    useEffect(() => {
        init();

        if (patientId > 0)
            loadData(patientId);


    }, []);

    const init = () => {
        setState({
            pastMedHistoryId: 0,
            patientId: parseInt(patientId),
            notes: "",
            subItems: [],
            diagnosis: [],
            createDate: new Date()
        });
    }

    const loadData = (id) => {
        GetDataAPI("encounter/history/medhistory/get", "patientId=" + id).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.surgeryDate)
                    result.data.surgeryDate = result.data.surgeryDate.split('T')[0];

                setState(result.data);
                setDataId(result.data.pastMedHistoryId);
                var subItems = [];
                result.data.subItems.map((item, i) => {
                    subItems[item.medHisSubItemId] = true;
                });
                setPastMedicalHistoryCheckboxState(subItems);
            }
            loadSubItems();
        })
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }


    const save = () => {

        var method = "encounter/history/medhistory/add";
        if (dataId > 0)
            method = "encounter/history/medhistory/update";

        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.pastMedHistoryId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "pastMedHistoryId": result.data.pastMedHistoryId
                    }));
                }
                showMessage("Success", "Medical history saved successfully.", "success", 3000);
                handleSave();
            }
            else showMessage("Error", result.message, "error", 8000);
        })
    }

    const deleteRecord = () => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the record?", "confirm", function () {
            var data = {
                pastMedHistoryId: dataId
            }

            PostDataAPI('encounter/history/medhistory/delete', data, true).then((result) => {

                if (result.success == true) {
                    // setErrorMessages({});
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    clear();
                    handleSave();

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }

    const clear = () => {
        init();
        setDataId(0);
        setPastMedicalHistoryCheckboxState([]);
        setHistItems([]);
        loadSubItems();
    }
    const deleteDiagnosis = (icdCode) => {

        var lstDiagnosis = [];
        state.diagnosis.map((item, i) => {
            if (item.icdCode != icdCode)
                lstDiagnosis.push(item);
        });
        setState(prevState => ({
            ...prevState,
            "diagnosis": lstDiagnosis
        }));
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
                            <Grid container direction="row" lg={12}>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12}>
                                    <Paper className={classes.paperBox}>
                                        {
                                            histItems.map((item, i) => (
                                                <div className={classes.contentPositive}>
                                                    <div className={classes.pCheckBox2}>
                                                        <CheckboxField
                                                            color="primary"
                                                            label={item.label}
                                                            id={item.id}
                                                            name={item.id}
                                                            onChange={handleCheckBoxChange}
                                                            checked={pastMedicalHistoryCheckboxState[item.id]}
                                                        />
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12}>
                                <FormGroupTitle>Diagnosis</FormGroupTitle>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <div className={classes.diagnosisListArea}>
                                        <SearchList
                                            id="icdCode"
                                            name="icdCode"
                                            placeholderTitle="Search Diagnosis"
                                            searchTerm={state.icdName}
                                            value={state.icdCode}
                                            code="diagnosis"
                                            apiUrl="ddl/loadItems"
                                            onChangeValue={(name, item) => handleDiagnosisChange(name, item)}
                                        />
                                        {
                                            (state.diagnosis && state.diagnosis.length > 0) ?
                                                state.diagnosis.map((item, index) => {

                                                    return (
                                                        <div className={classes.diagnosisList}>
                                                            <FormLabel className={classes.diagnosisCode}>{item.icdCode}</FormLabel>
                                                            <FormLabel className={classes.diagnosisDesc}>{item.icdName}</FormLabel>
                                                            <span className={classes.deleteItemIcon} title={"Delete"}><img onClick={() => { deleteDiagnosis(item.icdCode) }} src={DeleteIcon} alt="Delete" /></span>
                                                        </div>
                                                    )
                                                })
                                                : null
                                        }
                                    </div>

                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                {/* <Grid container lg={12}>
                                <Label title="Dictate and  other info" size={3} />
                            </Grid> */}
                                <Label title="Dictate and  other info" isTextAreaInput={true} size={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} >
                                    <TextareaField
                                        rowsMin={5}
                                        MaxLength={2000}
                                        id="notes"
                                        name="notes"
                                        value={state.notes}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <div className={classes.footerBtn}>
                        <FormBtn id="save" disabled={!isEditable} onClick={save}> Save</FormBtn>
                        {
                            dataId > 0 ?
                                <FormBtn id="delete" disabled={!isEditable}  onClick={deleteRecord}> Delete</FormBtn>
                                : null
                        }
                        {/* <FormBtn id="save" onClick={handleNext} btnType="next"> Next</FormBtn> */}
                       
                        {dataId > 0 > 0 ?
                            <FormBtn id={"save"}  onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </div>
                </Grid>
            </Grid>
            <LogDialog
                code="pastmedhistory"
                id={state.pastMedHistoryId}
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

export default withSnackbar(PastMedicalHistory)