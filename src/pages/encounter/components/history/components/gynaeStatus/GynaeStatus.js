
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import { Grid } from '@material-ui/core';
import { FormBtn, FormGroupTitle, Label, CustomLabel, FooterBtn } from "../../../../../../components/UiElements";
import { InputBaseField, TextareaField, RadioboxField } from "../../../../../../components/InputField";
import { SelectField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

function GynaeStatus({ handleClose,handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    // handle styles
    var classes = useStyles();
    const [dataId, setDataId] = useState(0);
    const [isEditable] = useState(props.isEditable)
    const [patientId] = useState(props.patientId);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    const [state, setState] = useState({ obGynGypeCode: "Normal" });

    //dropdown lists
    const [gravidaList, setGravidaList] = useState([]);
    const [paraList, setParaList] = useState([]);
    const [cycleList, setCycleList] = useState([]);
    const [flowList, setFlowList] = useState([]);
    //end dropdown lists
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);

    const radioBoxList = [
        { value: "Normal", label: "Normal" },
        { value: "Pregnant", label: "Pregnant" },
        { value: "Dysmenorrhea", label: "Dysmenorrhea" },
        { value: "Menopause", label: "Menopause" },
    ];
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
    const init = () => {
        setState({
            obGynStatusId: 0,
            patientId: parseInt(patientId),
            obGynGypeCode: "Normal",
            ageAtMenarche: "",
            paraCode: "",
            gravidaCode: "",
            lmpDate: null,
            eddDate: null,
            additionalInfo: "",
            ageAtMenopause: "",
            cycleGode: "",
            flowCode: "",
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
            parameters: ['ob_gyn_gravida', 'ob_gyn_para', 'ob_gyn_cycle', 'ob_gyn_flow']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var _gravidaList = [];
                var _paraList = [];
                var _cycleList = [];
                var _flowList = [];
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'ob_gyn_gravida':
                            _gravidaList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'ob_gyn_para':
                            _paraList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'ob_gyn_cycle':
                            _cycleList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'ob_gyn_flow':
                            _flowList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                })
                setGravidaList(_gravidaList);
                setParaList(_paraList);
                setCycleList(_cycleList);
                setFlowList(_flowList);
            }

        });
    }, []);

    const loadData = () => {
        PostDataAPI("encounter/history/obgenstatus/get", patientId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.lmpDate)
                    result.data.lmpDate = result.data.lmpDate.split('T')[0];

                if (result.data.eddDate)
                    result.data.eddDate = result.data.eddDate.split('T')[0];

                setState(result.data);
                setDataId(result.data.obGynStatusId);
            }

        })
    }

    const save = () => {

        state.ageAtMenarche = (state.ageAtMenarche) ? parseInt(state.ageAtMenarche) : null;
        state.ageAtMenopause = (state.ageAtMenopause) ? parseInt(state.ageAtMenopause) : null;

        var method = "encounter/history/obgenstatus/add";
        if (dataId > 0)
            method = "encounter/history/obgenstatus/update";

        setLoading({ isSaving: true });

        PostDataAPI(method, state, true).then((result) => {

            setLoading({ isSaving: false });

            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.obGynStatusId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "obGynStatusId": result.data.obGynStatusId
                    }));
                }
                showMessage("Success", "Ob and Gyn Status saved successfully.", "success", 3000);
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
            var data = {
                obGynStatusId: dataId
            }

            PostDataAPI('encounter/history/obgenstatus/delete', data, true).then((result) => {

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

    function setTodayDateRange() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    return (
        <>
            <Grid container>
                <Scrollbars style={{ height: 600 }}>
                    <Grid item lg={12} container direction="row">
                        <div style={{ paddingRight: "20px", width: "100%" }}>
                            <Grid container direction="row" lg={12}>
                                <Grid item xs={2} sm={2} md={2} lg={2} ></Grid>
                                <Grid item xs={2} sm={8} md={8} lg={8} >
                                    <RadioboxField
                                        id="obGynGypeCode"
                                        name="obGynGypeCode"
                                        value={state.obGynGypeCode}
                                        options={radioBoxList}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} ></Grid>
                            </Grid>


                            <Grid container direction="row" lg={12}>

                                {state.obGynGypeCode != "Normal" ? <>
                                    <Label title="Age at Menarche" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <InputBaseField
                                            id="ageAtMenarche"
                                            name="ageAtMenarche"
                                            placeholder="Age at Menarche"
                                            value={state.ageAtMenarche}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                                    : ""}
                                {state.obGynGypeCode === "Pregnant" || state.obGynGypeCode === "Dysmenorrhea" ? <>
                                    <Label title="Para" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <SelectField
                                            id="paraCode"
                                            placeholder="Select Para"
                                            name="paraCode"

                                            value={state.paraCode}
                                            options={paraList}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                                    : ""}
                                {state.obGynGypeCode === "Menopause" ? <>
                                    <Label title="Age at Menopause" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <InputBaseField
                                            id="ageAtMenopause"
                                            name="ageAtMenopause"
                                            placeholder="Age at Menopause"
                                            value={state.ageAtMenopause}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                                    : ""}
                            </Grid>



                            {state.obGynGypeCode === "Dysmenorrhea" ?
                                <Grid container direction="row" lg={12}>
                                    <Label title="Flow" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <SelectField
                                            id="flowCode"
                                            name="flowCode"
                                            placeholder="Select Flow"
                                            value={state.flowCode}
                                            options={flowList}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Label title="Cycle" size={2} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <SelectField
                                            id="cycleCode"
                                            name="cycleCode"
                                            placeholder="Select Cycle"
                                            value={state.cycleCode}
                                            options={cycleList}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                : ""}

                            {state.obGynGypeCode === "Pregnant" || state.obGynGypeCode === "Dysmenorrhea" ?
                                <>
                                    <Grid container direction="row" lg={12}>
                                        {state.obGynGypeCode === "Pregnant" || state.obGynGypeCode === "Dysmenorrhea" ?
                                            <>
                                                <CustomLabel title="L.M.P" size={2} />
                                                <Grid item xs={4} sm={4} md={4} lg={4} >
                                                    <InputBaseField
                                                        id="lmpDate"
                                                        name="lmpDate"
                                                        type="date"
                                                        value={state.lmpDate}
                                                        onChange={handleChange}
                                                        max={new Date()}
                                                        inputProps={{ max: setTodayDateRange() }}
                                                    />
                                                </Grid>
                                            </> : ""}
                                        {state.obGynGypeCode === "Pregnant" ?
                                            <><CustomLabel title="EDD" size={2} />
                                                <Grid item xs={4} sm={4} md={4} lg={4} >
                                                    <InputBaseField
                                                        id="eddDate"
                                                        name="eddDate"
                                                        type="date"
                                                        value={state.eddDate}
                                                        onChange={handleChange}
                                                        inputProps={{ min: setTodayDateRange() }}
                                                    />
                                                </Grid>
                                            </> : ""}
                                    </Grid>
                                    {state.obGynGypeCode === "Pregnant" ?
                                        <>
                                            <Grid container direction="row" lg={12}>
                                                <CustomLabel title="Gravida" size={2} />
                                                <Grid item xs={4} sm={4} md={4} lg={4} >
                                                    <SelectField
                                                        id="gravidaCode"
                                                        name="gravidaCode"
                                                        value={state.gravidaCode}
                                                        options={gravidaList}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </>
                                        : ""}
                                </> : ""}

                            <Grid container direction="row" lg={12}>
                                <Label title="Additional Info" isTextAreaInput={true} size={2} />
                                <Grid item xs={8} sm={8} md={8} lg={8}>
                                    <TextareaField
                                        rowsMin={5}
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        value={state.additionalInfo}
                                        onChange={handleChange}
                                        MaxLength="2000"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                {/* <Grid container  direction="row" justify="flex-end" xs={12} sm={10} md={10} lg={10}>
                    <div className={classes.footerBtn}>
                        <FormBtn id="save"  > Save</FormBtn>
                        <FormBtn id="save"  onClick={handleNext}> Next</FormBtn>
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </div>                            
                </Grid> */}
                            </Grid>
                        </div>
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <FooterBtn className={classes.footerBtn}>
                        {loading.isSaving ?

                            <FormBtn id="loadingSave"> Save</FormBtn>
                            :
                            <FormBtn id="save" disabled={ !isEditable}  onClick={save}> Save</FormBtn>
                        }
                        {
                            parseInt(dataId) > 0 ?
                                loading.isDeleting ?

                                    <FormBtn id="loadingDelete" > Delete</FormBtn>
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
                code="obgynstatus"
                id={state.obGynStatusId}
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

export default withSnackbar(GynaeStatus)