import React, { useState, useEffect } from "react"
import AddIcon from '../../../../../images/icons/add-icon.png';
import useStyles from './styles'
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { withSnackbar } from '../../../../../components/Message/Alert'
import {
    Typography,
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    DialogTitle,
    FormHelperText,
    Input
} from "@material-ui/core"
import { FormBtn, FormGroupTitle, Label, FooterBtn, DraggableComponent } from "../../../../../components/UiElements/UiElements";
import { InputBaseField, InputBaseFieldNumber, TextareaField, SelectField, RadioboxField } from "../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../components/LogDialog/LogDialog";
import { PostDataAPI } from '../../../../../Services/APIService';
import { Scrollbars } from 'rc-scrollbars';

function VitalSignForm({ dialogOpenClose, handleClose, handleSuccess, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [vitalSignId, setVitalSignId] = useState(props.vitId);
    const [dataId, setDataId] = useState(parseInt(props.patId));
    const [encounterId, setEncounterId] = useState(props.encId);
    const [listRowsData, setListRowsData] = useState([]);
    const [painScaleList, setPainScaleList] = useState([]);
    const unitOptions = [
        {
            value: "false",
            label: "Imperial",
            className: 'adjustLabels',
        },
        {
            value: "true",
            label: "Metric",
            className: 'adjustLabels',
        },
    ];
    const [logdialogstate, setLogDialogState] = useState(false);
    const [state, setState] = useState({
        patientVitalId: 0, patientID: dataId, encounterId: "", isMatricUnit: "false", vitalDatetime: "", height: "", heightFt: "",
        heightIns: "", weight: "", bpSystolic: "", pbDiastolic: "", siteCode: "", position: "", temperature: "", tempSourceCode: "", heartBeat: "",
        rhythmCode: "", volumeCode: "", characterCode: "", respitationRate: "", oxSaturation: "", oxSiteCode: "", placeCondition: "",
        headCircum: "", abdomialGirth: "", notes: "", isDeleted: false, createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
        createDate: new Date(), bmi: "", bmiIns: "", vitalPain: ""
    });
    const [errorMessages, setErrorMessages] = useState({
        errorDate: false
    })

    const [siteCodes, setSiteCodes] = useState([]);
    const [positionCodes, setPositionCodes] = useState([]);
    const [tempSourceCodes, setTempSourceCodes] = useState([]);
    const [volumecodes, setVolumecodes] = useState([]);
    const [characterCodes, setCharacterCodes] = useState([]);
    const [conditionControlCodes, setConditionControlCodes] = useState([]);
    const [heartRythmCodes, setHeartRythmCodes] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleHeightChange = (e) => {

        const { name, value } = e.target;
        if (state.isMatricUnit != "true") {
            if (name === "heightFt") {
                var ftHeight = parseFloat(value * 12).toFixed(2);
                setState(prevState => ({
                    ...prevState,
                    ["heightFt"]: value
                }));
                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: ftHeight
                }));
            }
            if (name === "heightIns") {
                var insHeight = parseFloat(value / 12).toFixed(2);
                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: value
                }));
                setState(prevState => ({
                    ...prevState,
                    ["heightFt"]: insHeight
                }));
            }
        } else {
            if (name === "heightFt") {
                var ftHeight = parseFloat(value * 30.48).toFixed(2);
                setState(prevState => ({
                    ...prevState,
                    ["heightFt"]: value
                }));
                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: ftHeight
                }));
            }
            if (name === "heightIns") {
                var insHeight = parseFloat(value / 30.48).toFixed(2);
                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: value
                }));
                setState(prevState => ({
                    ...prevState,
                    ["heightFt"]: insHeight
                }));
            }
        }
    }
    const calculateBMIIns = (bmi) => {
        var bmiIns = "";
        if (bmi < 18.5)
            bmiIns = "Underweight";
        else if (bmi < 25)
            bmiIns = "Normal weight"
        else if (bmi < 30)
            bmiIns = "Overweight"
        else
            bmiIns = "Obesity";

        setState(prevState => ({
            ...prevState,
            "bmiIns": bmiIns
        }));
    }
    const calculateBMI = () => {
        var bmi = "-"

        if (state.heightFt && state.weight && parseFloat(state.heightFt) > 0) {

            let height = parseFloat(state.heightFt) * 12;
            if (state.isMatricUnit == "false") {
                //[weight(lb) / height(in) / height(in)] x 703
                bmi = (parseFloat(state.weight) / (height * height)) * 703;

            } else {
                bmi = (parseFloat(state.weight) / (height * height)) * 10000;
            }
            bmi = bmi.toFixed(2);
        }
        setState(prevState => ({
            ...prevState,
            "bmi": bmi
        }));
        if (bmi != "-")
            calculateBMIIns(bmi);
    }

    const handleTypeChange = (e) => {
        handleChange(e);
        const { value } = e.target;
        if (value == "true") {
            if (state.heightFt && parseFloat(state.heightFt) > 0) {
                var ftHeight = parseFloat(state.heightFt * 30.48).toFixed(2);
                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: ftHeight
                }));
                // setState(prevState => ({
                //     ...prevState,
                //     "height": (parseFloat(state.height) * 2.54).toFixed(2)
                // }));
            }
            if (state.weight && parseFloat(state.weight) > 0)
                setState(prevState => ({
                    ...prevState,
                    "weight": (parseFloat(state.weight) / 2.205).toFixed(2)
                }));
            if (state.temperature && parseFloat(state.temperature) > 0)
                setState(prevState => ({
                    ...prevState,
                    "temperature": ((parseFloat(state.temperature) - 32) * 5 / 9).toFixed(2)
                }));
            if (state.headCircum && parseFloat(state.headCircum) > 0)
                setState(prevState => ({
                    ...prevState,
                    "headCircum": (parseFloat(state.headCircum) * 2.54).toFixed(2)
                }));

            if (state.abdomialGirth && parseFloat(state.abdomialGirth) > 0)
                setState(prevState => ({
                    ...prevState,
                    "abdomialGirth": (parseFloat(state.abdomialGirth) * 2.54).toFixed(2)
                }));
        }
        else {
            if (state.heightFt && parseFloat(state.heightFt) > 0) {
                var ftHeight = parseFloat(state.heightFt * 12).toFixed(2);

                setState(prevState => ({
                    ...prevState,
                    ["heightIns"]: ftHeight
                }));
                // setState(prevState => ({
                //     ...prevState,
                //     "height": (parseFloat(state.height) / 2.54).toFixed(2)
                // }));
            }

            if (state.weight && parseFloat(state.weight) > 0)
                setState(prevState => ({
                    ...prevState,
                    "weight": (parseFloat(state.weight) * 2.205).toFixed(2)
                }));
            if (state.temperature && parseFloat(state.temperature) > 0)
                setState(prevState => ({
                    ...prevState,
                    "temperature": ((state.temperature * 9 / 5) + 32).toFixed(2)
                }));
            if (state.headCircum && parseFloat(state.headCircum) > 0)
                setState(prevState => ({
                    ...prevState,
                    "headCircum": (parseFloat(state.headCircum) / 2.54).toFixed(2)
                }));

            if (state.abdomialGirth && parseFloat(state.abdomialGirth) > 0)
                setState(prevState => ({
                    ...prevState,
                    "abdomialGirth": (parseFloat(state.abdomialGirth) / 2.54).toFixed(2)
                }));
        }
    }

    const handleChangeDecimal = e => {
        const { name, value } = e.target;
        var amount = value;
        var patt = new RegExp("[A-Za-z]");
        var res = patt.test(amount);
        if (res)
            amount = amount.replace(/[^\d.-]/g, '');

        if (!(/^[-+]?\d*\.?\d*$/.test(amount))) {
            setState(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
        else {

            if (amount.length > 4)
                amount = parseFloat(amount).toFixed(2);

            setState(prevState => ({
                ...prevState,
                [name]: amount
            }));
            state[name] = amount;
        }

        if (name == "height" || name == "weight")
            calculateBMI();
    };
    const newVitals = () => {
        setVitalSignId(0);
        clearValues();
        defaultTodayDate();
    }

    useEffect(() => {
        console.log("VitalSignForm.js")
        clearValues();
        initialization();

        if (props.vitId > 0) {
            loadVitals(props.vitId);
        }
        else {
            defaultTodayDate();
        }

        if (dialogOpenClose) {

        }

    }, [dialogOpenClose]);

    function initialization() {

        var params = {
            code: "DDL_List_Item",
            parameters: ['heart_rythm_code', 'site_code', 'position_code', 'temp_source_code', 'volume_code', 'character_code', 'condition_control_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _siteCodes = [];
                var _positionCodes = [];
                var _tempSourceCodes = [];
                var _volumecodes = [];
                var _characterCodes = [];
                var _conditionControlCodes = [];
                var _heartRythmCodes = [];


                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'site_code':
                            _siteCodes.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'position_code':
                            _positionCodes.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'temp_source_code':
                            _tempSourceCodes.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'volume_code':
                            _volumecodes.push({ value: item.text1, label: item.text2 });
                            break;

                        case 'character_code':
                            _characterCodes.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'condition_control_code':
                            _conditionControlCodes.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'heart_rythm_code':
                            _heartRythmCodes.push({ value: item.text1, label: item.text2 });
                            break


                    }
                });

                setSiteCodes(_siteCodes);
                setPositionCodes(_positionCodes);
                setTempSourceCodes(_tempSourceCodes);
                setVolumecodes(_volumecodes);
                setCharacterCodes(_characterCodes);
                setConditionControlCodes(_conditionControlCodes);
                setHeartRythmCodes(_heartRythmCodes);

            }
        })

        var params = {
            code: "vital_sign_pain_codes",
            parameters: [dataId ? dataId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setPainScaleList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }

        })

    }

    const clearValues = () => {
        setErrorMessages({ errorDate: false });

        setState({

            patientVitalId: 0, patientID: dataId, encounterId: "", isMatricUnit: "false", vitalDatetime: "", height: "", weight: "",
            bpSystolic: "", pbDiastolic: "", siteCode: "", position: "", temperature: "", tempSourceCode: "", heartBeat: "", heightFt: "",
            heightIns: "", rhythmCode: "", volumeCode: "", characterCode: "", respitationRate: "", oxSaturation: "", oxSiteCode: "", placeCondition: "",
            headCircum: "", abdomialGirth: "", notes: "", isDeleted: false, createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
            createDate: new Date(), bmi: "", bmiIns: "", vitalPain: ""

        });

    }

    function defaultTodayDate() {

        let currDate = new Date(new Date());

        let month = currDate.getMonth() + 1;

        if (month < 10)
            month = '0' + month;
        let day = currDate.getDate();
        if (day < 10)
            day = '0' + day;

        setState(prevState => ({
            ...prevState,
            vitalDatetime: currDate.getFullYear() + '-' + month + '-' + day + "T" +
                (currDate.getHours() < 10 ? '0' + currDate.getHours() : currDate.getHours()) + ":" +
                (currDate.getMinutes() < 10 ? '0' + currDate.getMinutes() : currDate.getMinutes())

        }));
    }

    const Save = () => {

        let errorList = [];
        validateVital(errorList);

        if (errorList.length < 1) {
            setLoading({ isSaving: true });
            console.log(state);
            if (state.weight == "" && state.height == "" && state.bpSystolic == "" && state.pbDiastolic == "" && state.temperature == "" && state.heartBeat == ""
                && state.respitationRate == "" && state.oxSaturation == "" && state.headCircum == "" && state.abdomialGirth == "" && state.heightFt == "" && state.vitalPain == "") {
                showMessage('Error', "Please enter at least one vital to save", 'error');
                setLoading({ isSaving: false });
            } else {
                state.patientID = dataId;
                state.encounterId = encounterId;
                //state.height = state.height == "" || state.height == null ? null : parseFloat(state.height);
                //state.weight = state.weight == "" || state.weight == null ? null : parseFloat(state.weight);
                state.encounterId = state.encounterId == "" || state.encounterId == null ? null : state.encounterId;
                state.isMatricUnit = state.isMatricUnit == "true" ? true : false;
                state.height = state.heightFt;

                var method = "patient/vital/add";
                if (state.patientVitalId > 0)
                    method = "patient/vital/update";

                PostDataAPI(method, state, true).then((result) => {

                    if (result.success && result.data != null) {

                        if (result.success == true) {
                            setErrorMessages([]);

                            if (result.success === true && result.data != null) {
                                if (state.patientVitalId < 1) {
                                    showMessage("Success", "Patient vital saved successfully.", "success", 3000);
                                    //handleLoadFormatData(result.data);
                                    setState(prevState => ({
                                        ...prevState,
                                        "patientVitalId": result.data.patientVitalId
                                    }));
                                    setVitalSignId(result.data.patientVitalId);
                                    setLoading({ isSaving: false });
                                }
                                else {
                                    setLoading({ isSaving: false });
                                    handleSuccess("Patient vital updated successfully.");
                                    //showMessage("Success", "Patient vital updated successfully.", "success", 3000);

                                    //handleClose();
                                }
                                setState(prevState => ({
                                    ...prevState,
                                    "isMatricUnit": state.isMatricUnit == true ? "true" : "false"
                                }));
                            }
                        }
                        else {
                            showMessage("Error", result.message, "error", 3000);
                            setLoading({ isSaving: false });

                        }
                    }
                })
            }
        }
    }

    function handleLoadFormatData(dataSet) {

        dataSet.isMatricUnit = dataSet.isMatricUnit == true ? "true" : "false";
        dataSet.heightFt = dataSet.height;
        var ftHeight = parseFloat(dataSet.height * 12).toFixed(2);
        dataSet.heightIns = dataSet.height ? ftHeight : "";

    }

    function myClear() {
        setState({

            patientVitalId: 0, patientID: dataId, encounterId: "", isMatricUnit: "false", vitalDatetime: "", height: "", weight: "",
            bpSystolic: "", pbDiastolic: "", siteCode: "", position: "", temperature: "", tempSourceCode: "", heartBeat: "", heightFt: "",
            heightIns: "", rhythmCode: "", volumeCode: "", characterCode: "", respitationRate: "", oxSaturation: "", oxSiteCode: "", placeCondition: "",
            headCircum: "", abdomialGirth: "", notes: "", isDeleted: false, createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
            createDate: new Date(), vitalPain: ""

        });
    }

    function clear() {

        setErrorMessages({ errorDate: false });
        console.info(state)
        if (vitalSignId > 0) {

            loadVitals(vitalSignId);

        }
        else {

            setState({

                patientVitalId: 0, patientID: dataId, encounterId: "", isMatricUnit: "false", vitalDatetime: "", height: "", weight: "",
                bpSystolic: "", pbDiastolic: "", siteCode: "", position: "", temperature: "", tempSourceCode: "", heartBeat: "", heightFt: "",
                heightIns: "", rhythmCode: "", volumeCode: "", characterCode: "", respitationRate: "", oxSaturation: "", oxSiteCode: "", placeCondition: "",
                headCircum: "", abdomialGirth: "", notes: "", isDeleted: false, createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
                createDate: new Date(), vitalPain: ""

            });
            defaultTodayDate()
        }
    }

    function loadVitals(vitalSignId) {
        setState({

            patientVitalId: 0, patientID: dataId, encounterId: "", isMatricUnit: "false", vitalDatetime: "", height: "", weight: "",
            bpSystolic: "", pbDiastolic: "", siteCode: "", position: "", temperature: "", tempSourceCode: "", heartBeat: "", heightFt: "",
            heightIns: "", rhythmCode: "", volumeCode: "", characterCode: "", respitationRate: "", oxSaturation: "", oxSiteCode: "", placeCondition: "",
            headCircum: "", abdomialGirth: "", notes: "", isDeleted: false, createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0,
            createDate: new Date(), vitalPain: ""

        });

        PostDataAPI("patient/vital/getPatientVitals", vitalSignId).then((result) => {

            if (result.success && result.data != null) {
                handleLoadFormatData(result.data);
                setState(result.data);
                calculateBMIIns(parseFloat(result.data.bmi));
            }
        })
    }


    function validateVital(errorList) {

        //SH>validation commented as asked by Abid Ali
        //if (state.heightFt === "0" || state.heightFt <= "0") {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorDate: true
        //    }));
        //    errorList.push(true);
        //    showMessage("Error", "Height should be greater than 0", "error", 3000);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorDate: false
        //    }));
        //}
        //if (state.weight === "0" || state.weight <= "0") {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorDate: true
        //    }));
        //    errorList.push(true);
        //    showMessage("Error", "Weight should be greater than 0", "error", 3000);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorDate: false
        //    }));
        //}

        if (state.vitalDatetime === null || state.vitalDatetime == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDate: true
            }));
            errorList.push(true);
            showMessage("Error", "Please select vital date", "error", 3000);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDate: false
            }));
        }

    }
    function deleteRecord() {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            state.isMatricUnit = state.isMatricUnit == "true" ? true : false;
            setLoading({ isDeleting: true });
            PostDataAPI('patient/vital/delete', state, true).then((result) => {
                setLoading({ isDeleting: false });

                if (result.success == true) {
                    setErrorMessages({});
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setVitalSignId(0)
                    clearValues();
                    handleClose();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        });
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
                classes={{ paper: classes.dialogPaper }}
                open={dialogOpenClose}
                maxWidth={'md'}
                {...props} >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    <Grid lg={12} container direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <FormGroupTitle>Vital Signs</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogcontent}
                >
                    <Scrollbars autoHeight autoHeightMax="95vh" style={{ height: "95vh", maxHeight: "calc(100% - 4px)", display: "flex", }}>

                        <Grid container >

                            <Grid lg={12} container direction="row">
                                <Label title="Unit System" size={2} style={{ paddingTop: "6px" }} />
                                <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <Grid container justify="flex-start" xs={12} sm={12} md={12} lg={12} >
                                        <RadioboxField id="unitSystem" name="isMatricUnit" value={state.isMatricUnit} labelPlacement="end" onChange={handleTypeChange} options={unitOptions} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Date" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={4} >
                                    <InputBaseField
                                        IsDisabled={vitalSignId > 0}
                                        placeholder="Date"
                                        onChange={handleChange}
                                        name="vitalDatetime"
                                        type="datetime-local"
                                        value={state.vitalDatetime}
                                        MaxLength='8'
                                    />

                                </Grid>
                                <Grid container alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    {/* <span className={classes.editBtn} ><img src={AddIcon} onClick={newVitals} alt="Add New" /></span>
                            */}
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Height" size={2} />
                                <Grid container justify="center" xs={12} sm={4} md={4} lg={4} >
                                    <Grid item xs={10} sm={4} md={4} lg={4} >
                                        <InputBaseFieldNumber
                                            type="number"
                                            name="heightFt"
                                            placeholder="Height"
                                            value={state.heightFt}
                                            onChange={handleHeightChange}
                                            MaxLength='6'
                                            MinValue={0}
                                            MaxValue={1000}
                                            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                        />
                                    </Grid>
                                    <Grid container alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                        <FormLabel className={classes.smallLabel}>ft.</FormLabel>
                                        {/* <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('in') : ('cm')} </FormLabel> */}
                                    </Grid>
                                    <Grid item xs={10} sm={4} md={4} lg={4} >
                                        <InputBaseFieldNumber
                                            type="number"
                                            name="heightIns"
                                            placeholder="Height"
                                            value={state.heightIns}
                                            onChange={handleHeightChange}
                                            MaxLength='6'
                                            MinValue={0}
                                            MaxValue={4}
                                            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                        />
                                    </Grid>
                                    <Grid container alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                        {/* <FormLabel className={classes.smallLabel}>in</FormLabel> */}
                                        <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('in') : ('cm')} </FormLabel>
                                    </Grid>
                                </Grid>
                                <Label title="Weight" size={2} />
                                <Grid container justify="center" xs={12} sm={3} md={3} lg={2} >
                                    <Grid item xs={10} sm={10} md={10} lg={10} >
                                        <InputBaseFieldNumber
                                            type="number"
                                            name="weight"
                                            placeholder="Weight"
                                            value={state.weight}
                                            onChange={handleChangeDecimal}
                                            MaxLength='6'
                                            MinValue={0}
                                            MaxValue={1000}
                                            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                        />
                                    </Grid>
                                    <Grid container alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                        <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('lbs') : ('kg')}</FormLabel>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                {/* <Label title="BMI" size={2}/> */}
                                <Grid xs={12} sm={2} md={2} lg={2} container className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}>BMI:</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <FormLabel className={classes.lableInputBold}>{state.bmi}
                                        <FormLabel className={state.bmiIns && state.bmiIns.indexOf("Normal") >= 0 ? classes.smallLabel : classes.mandatorColor}>{state.bmiIns}</FormLabel>
                                    </FormLabel>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Label title="Blood Pressure" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <Grid container style={{ display: "flex" }} justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <InputBaseFieldNumber
                                                placeholder="Systolic"
                                                onChange={handleChange}
                                                name="bpSystolic"
                                                value={state.bpSystolic}
                                                MaxLength='6'
                                                MinValue={0}
                                                MaxValue={1000}
                                                type="number"
                                                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                            />
                                            {/* <FormLabel className={classes.labelDivider}>/</FormLabel> */}
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2} md={2} lg={2} >
                                            
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.labelDivider}>/</FormLabel>
                                    </Grid>
                                </Grid>
                                {/* <FormLabel className={classes.lableInput}>/</FormLabel> */}
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <InputBaseFieldNumber
                                                placeholder="Diastolic"
                                                onChange={handleChange}
                                                name="pbDiastolic"
                                                value={state.pbDiastolic}
                                                MaxLength='6'
                                                MinValue={0}
                                                MaxValue={1000}
                                                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2} md={2} lg={2} >
                                            <FormLabel className={classes.smallLabel}>mmHg</FormLabel>
                                        </Grid> */}
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.smallMiddleLabel}>mmHg</FormLabel>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2}
                                    className={classes.labelAlign}
                                >
                                    <FormLabel className={classes.lableInput}></FormLabel>
                                </Grid>
                                <Grid container alignItems="center" justify="center" xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select site"
                                        name="siteCode"
                                        value={state.siteCode}
                                        onChange={handleChange}
                                        options={siteCodes}
                                        MaxLength='50'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.labelDivider}></FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" justify="center" xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select position"
                                        name="position"
                                        value={state.position}
                                        onChange={handleChange}
                                        options={positionCodes}
                                        MaxLength='20'
                                    />
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Temperature" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} className={classes.pRelative}>
                                    <InputBaseFieldNumber
                                        placeholder={state.isMatricUnit != "true" ? "F" : "C"}
                                        name="temperature"
                                        type="number"
                                        onChange={handleChange}
                                        value={state.temperature}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                    />
                                    {/* <span className={classes.temperatureSymbol}>&#176; F</span> */}
                                    <span className={classes.temperatureSymbol}>{state.isMatricUnit != "true" ? <>&#176; F</> : <>&#176; C</>}</span>
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.labelDivider}></FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select source"
                                        onChange={handleChange}
                                        name="tempSourceCode"
                                        value={state.tempSourceCode}
                                        options={tempSourceCodes}
                                        MaxLength='50'
                                    />
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Heart rate" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseFieldNumber
                                        placeholder="bpm"
                                        onChange={handleChange}
                                        name="heartBeat"
                                        value={state.heartBeat}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.smallMiddleLabel}></FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select rythm"
                                        onChange={handleChange}
                                        name="rhythmCode"
                                        value={state.rhythmCode}
                                        MaxLength='50'
                                        options={heartRythmCodes}
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Grid container alignItems="center" justify="flex-end" xs={12} sm={2} md={2} lg={2}
                                    className={classes.labelAlign}
                                >
                                    <FormLabel className={classes.lableInput}></FormLabel>
                                </Grid>
                                <Grid container alignItems="center" justify="center" xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select volume"
                                        name="volumeCode"
                                        value={state.volumeCode}
                                        onChange={handleChange}
                                        options={volumecodes}
                                        MaxLength='50'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.labelDivider}></FormLabel>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center" justify="center" xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select character"
                                        name="characterCode"
                                        value={state.characterCode}
                                        onChange={handleChange}
                                        options={characterCodes}
                                        MaxLength='50'
                                    />
                                </Grid>

                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Respiration Rate" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseFieldNumber
                                        type="number"
                                        placeholder="%"
                                        onChange={handleChange}
                                        name="respitationRate"
                                        value={state.respitationRate}
                                        MaxLength='5'
                                        MinValue={0}
                                        MaxValue={100}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}

                                    />
                                </Grid>
                                {/*<Grid container alignItems="center" xs={2} sm={2} md={2} lg={2} >*/}
                                {/*    <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('in') : ('cm')}</FormLabel>*/}
                                {/*</Grid>*/}
                                <Grid container justify="flex-start" alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                    <FormLabel className={classes.smallLabel}>bpm</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="O2 Saturation" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseFieldNumber
                                        type="number"
                                        placeholder="%"
                                        onChange={handleChange}
                                        name="oxSaturation"
                                        value={state.oxSaturation}
                                        MaxLength='5'
                                        MinValue={0}
                                        MaxValue={100}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={1} md={1} lg={1} className={classes.seperatorGrid}>
                                    <Grid container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <FormLabel className={classes.smallMiddleLabel}></FormLabel>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        placeholder="Select condition"
                                        onChange={handleChange}
                                        name="placeCondition"
                                        value={state.placeCondition}
                                        options={conditionControlCodes}
                                        MaxLength='50'
                                    />
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Label title="Head Circumference" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseFieldNumber
                                        type="number"
                                        placeholder="Head Circumference"
                                        onChange={handleChange}
                                        name="headCircum"
                                        value={state.headCircum}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                    />
                                </Grid>
                                <Grid container justify="flex-start" alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                    <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('in') : ('cm')}</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Abdominal Girth" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseFieldNumber
                                        type="number"
                                        placeholder="Abdominal Girth"
                                        onChange={handleChange}
                                        name="abdomialGirth"
                                        value={state.abdomialGirth}
                                        MaxLength='6'
                                        MinValue={0}
                                        MaxValue={1000}
                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                    />
                                </Grid>
                                <Grid container alignItems="center" xs={2} sm={2} md={2} lg={2} >
                                    <FormLabel className={classes.smallLabel}>{state.isMatricUnit != "true" ? ('in') : ('cm')}</FormLabel>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Label title="Pain Scale" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        id="vitalPain"
                                        name="vitalPain"
                                        onChange={handleChange}
                                        value={state.vitalPain}
                                        options={painScaleList}
                                        placeholder="Select Pain Scale"
                                    />
                                </Grid>
                                <Grid container alignItems="center" xs={12} sm={4} md={4} lg={3} >
                                    {state.vitalPain == "0" ?
                                        <Typography className={classes.noPainText}>No Pain</Typography> :
                                        state.vitalPain == "1" || state.vitalPain == "2" || state.vitalPain == "3" ?
                                            <Typography className={classes.mildPainText}>Mild</Typography> :
                                            state.vitalPain == "4" || state.vitalPain == "5" || state.vitalPain == "6" ?
                                                <Typography className={classes.moderatePainText}>Moderate</Typography> :
                                                state.vitalPain == "7" || state.vitalPain == "8" || state.vitalPain == "9" || state.vitalPain == "10" ?
                                                    <Typography className={classes.severePainText}>Severe</Typography> : ""
                                    }
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                                        <span className={classes.baseLine}> </span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">

                                <Grid container alignItems="flex-start" justify="flex-end" xs={12} sm={2} md={2} lg={2}
                                    direction="row"
                                >
                                    <FormLabel className={classes.lableInput}>Notes:</FormLabel>
                                </Grid>
                                <Grid container alignItems="center" justify="flex-start" xs={12} sm={7} md={7} lg={7} >
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Notes"
                                        onChange={handleChange}
                                        name="notes"
                                        value={state.notes}
                                        MaxLength='4000'
                                    />

                                </Grid>

                            </Grid>

                            {/* <Grid lg={12} container direction="row">

                            <Grid container alignItems="flex-start" justify="flex-end" xs={12} sm={3} md={3} lg={3}
                                direction="row"
                                className={classes.labelAlignBtn}
                            >
                                <FormLabel className={classes.lableInput}></FormLabel>
                            </Grid>

                            <Grid container alignItems="flex-end" justify="flex-start" xs={12} sm={9} md={9} lg={9} >

                                {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>
                                 :
                                    <FormBtn id={"save"} onClick={Save} size="medium">Save</FormBtn>
                                }
                                {
                                    vitalSignId > 0 ?
                                    loading.isDeleting ? 
                                    <FormBtn id={"loadingDelete"} onClick={() => deleteRecord()} size="medium">
                                        Delete
                                    </FormBtn>
                                 :
                                    <FormBtn id={"delete"} onClick={() => deleteRecord()} size="medium">
                                        Delete
                                    </FormBtn>
                                    : null
                                }
                                <FormBtn id={"resetBtn"} onClick={clear} size="medium" >Reset </FormBtn>
                                {
                                    vitalSignId > 0 ?
                                        <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs">Logs</FormBtn>
                                        : null
                                }
                                <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                            </Grid>

                        </Grid> */}

                        </Grid>

                    </Scrollbars>


                    <Grid container justify="center" direction="row" lg={12}>
                        <Grid item xs={2} sm={2} md={2} lg={2} />
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <FooterBtn className={classes.footerBtn}>

                                {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>
                                    :
                                    <FormBtn id={"save"} onClick={Save} size="medium">Save</FormBtn>
                                }
                                {
                                    vitalSignId > 0 ?
                                        loading.isDeleting ?
                                            <FormBtn id={"loadingDelete"} size="medium">
                                                Delete
                                            </FormBtn>
                                            :
                                            <FormBtn id={"delete"} onClick={() => deleteRecord()} size="medium">
                                                Delete
                                            </FormBtn>
                                        : null
                                }
                                <FormBtn id={"resetBtn"} onClick={clear} size="medium" >Reset </FormBtn>
                                {
                                    vitalSignId > 0 ?
                                        <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                        : null
                                }
                                <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>

                            </FooterBtn>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            {
                logdialogstate ?
                    <LogDialog
                        code="patvitals"
                        id={state.patientVitalId}
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
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}
export default withSnackbar(VitalSignForm)