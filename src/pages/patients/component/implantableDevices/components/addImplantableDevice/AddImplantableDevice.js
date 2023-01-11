import React, { useState, useEffect } from "react";//, useRef 
import {
    // IconButton,
    Dialog,
    Grid,
    Button,
    FormHelperText,
    // Typography,
    FormLabel,
    CircularProgress
} from "@material-ui/core";
// import { AttachFile } from '@material-ui/icons';
import useStyles from "./styles";
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { InputBaseField, SelectField, TextareaField } from "../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
// import SearchList from "../../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../components/Message/Alert';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";

function AddImplantableDevice({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;

    const AccountStatusOptions = [
        {
            value: 1,
            label: "Active",
        },
        {
            value: 2,
            label: "In-Active",
        },
    ];
    // handle styles
    const classes = useStyles();
    const todayDate = new Date().getFullYear() + '-' + String((new Date().getMonth() + 1)).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
    const [isEditable] = useState(props.isEditable)
    const [isSaving, setIsSaving] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [state, setState] = useState({
        patientMedicalEquipmentId: 0, medicalEquipmentId: "", patientId: props.patientId, implantDate: addDays(new Date(), 0).toString(),
        removalDate: null, deviceStatusCode: "1", notes: "", deviceUdi: ""
    });
    function addDays(date, days) {
        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const [errorMessages, setErrorMessages] = useState({ errorDeviceUdi: false, errorImplantDate: false, errorRemovalDate: false })
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [deviceData, setDeviceData] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    useEffect(() => {
        clearValues();
    }, []);

    const loadData = () => {

        PostDataAPI("patient/medicalEquipment/get", parseInt(props.dataId)).then((result) => {

            if (result.success && result.data != null) {
                handleLoadFormatData(result.data);
                setState(result.data);
                //getEquipmentDetail(result.data.medicalEquipmentId);
                setIsValidated(false);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        });

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "deviceUdi") {
            setIsValidated(false);
            setDeviceData('');
        }
        else if (name === "removalDate") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRemovalDate: false
            }));

        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLoadFormatData = (dataSet) => {

        if (dataSet.implantDate != null && dataSet.implantDate.trim() != '0001-01-01T00:00:00')
            dataSet.implantDate = dataSet.implantDate.split('T')[0];
        else
            dataSet.implantDate = '';

        if (dataSet.removalDate != null && dataSet.removalDate.trim() != '0001-01-01T00:00:00')
            dataSet.removalDate = dataSet.removalDate.split('T')[0];
        else
            dataSet.removalDate = '';

        if (dataSet.medicalEquipmentId != null)
            VerifyDeviceUDI(false, dataSet.deviceUdi);
    }


    const clearValues = () => {
        if (props.dataId > 0) {
            loadData();
        }
        else {
            setState({
                patientMedicalEquipmentId: 0, medicalEquipmentId: null, patientId: props.patientId, implantDate: addDays(new Date(), 0).toString(),
                removalDate: "", deviceStatusCode: "1", notes: "", deviceUdi: ""
            });
            setDeviceData('');
        }

        setErrorMessages({ errorDeviceUdi: false, errorImplantDate: false, errorRemovalDateEmpty: false, errorRemovalDate: false });
    }

    const Save = () => {

        if (isValidated === true) {
            let errorList = [];
            //VerifyDeviceUDI(false, state.deviceUdi);

            validateSave(errorList);
            if (errorList.length < 1) {
                state.deviceUdi = state.deviceUdi.trim();
                state.implantDate = state.implantDate == "" ? null : state.implantDate;
                state.removalDate = state.removalDate == "" ? null : state.removalDate;
                state.medicalEquipmentId = state.medicalEquipmentId == "" ? null : state.medicalEquipmentId;
                state.objDeviceData = deviceData;//deviceData?.objDeviceData;
                let method = "patient/medicalEquipment/add";

                if (state.patientMedicalEquipmentId > 0)
                    method = "patient/medicalEquipment/update";
                setIsSaving(true)
                PostDataAPI(method, state, true).then((result) => {
                    setIsSaving(false)
                    if (result.success == true) {
                        setErrorMessages([]);

                        if (state.patientMedicalEquipmentId < 1) {

                            if (result.success === true && result.data != null) {
                                showMessage("Success", "Data saved successfully.", "success", 3000);
                                setTimeout(function () { handleClose() }, 500);

                            }
                        }
                        else if (state.patientMedicalEquipmentId > 0) {

                            if (result.success) {
                                showMessage("Success", "Data updated successfully.", "success", 3000);
                            }
                        }

                    }
                    else {
                        setIsSaveCall(false);
                        showMessage("Error", result.message, "error", 3000);
                    }
                })

                setIsSaveCall(false);
            }
        }
        else {
            if (state.deviceUdi == null || state.deviceUdi == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorDeviceUdi: true
                }))

                if (state.implantDate == null || state.implantDate == "") {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorImplantDate: true
                    }))
                }
                //if (state.removalDate == null || state.removalDate == "") {
                //    setErrorMessages(prevState => ({
                //        ...prevState,
                //        errorRemovalDateEmpty: true
                //    }))
                //}

            }
            else {
                if (deviceData.length == 0)
                    showMessage("Error", "Please first verify UDI.", "error", 3000);
                else
                    showMessage("Error", "Please enter valid UDI.", "error", 3000);
            }
        }
    }

    const validateSave = (errorList) => {

        if (state.deviceUdi === null || state.deviceUdi == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDeviceUdi: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDeviceUdi: false
            }));
        }

        if (state.implantDate === null || state.implantDate == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImplantDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImplantDate: false
            }));
        }
        //if (state.removalDate === null || state.removalDate == "") {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorRemovalDateEmpty: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorRemovalDateEmpty: false
        //    }));
        //}

        if (state.removalDate && state.removalDate < state.implantDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRemovalDate: true
            }));
            errorList.push(true);
        }

    }


    function validateImplantableDevice(errorList) {

        if (state.deviceUdi === null || state.deviceUdi == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDeviceUdi: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDeviceUdi: false
            }));
        }
    }
    const getEquipmentDetail = (id) => {
        GetDataAPI("patient/medicalEquipment/getEquipmentDetail", "id=" + id).then((result) => {

            if (result.success && result.data != null) {
                setDeviceData(result.data);
                setIsValidated(true);
            }
            else {
                setDeviceData('');
                setIsValidated(false);
            }
        })
    }

    function VerifyDeviceUDI(flag, deviceUdi) {
        let errorList = [];

        if (deviceUdi == null || deviceUdi == "")
            validateImplantableDevice(errorList);

        deviceUdi = deviceUdi.trim();

        if (errorList.length < 1) {
            setIsVerify(true)
            GetDataAPI("patient/medicalEquipment/verifyUDI", "id=" + deviceUdi.toString()).then((result) => {
                setIsVerify(false)
                if (result.success && result.data != null) {

                    //setState(prevState => ({
                    //    ...prevState,
                    //    medicalEquipmentId: result.data.medicalEquipmentId
                    //}));

                    setDeviceData(result.data);

                    if (flag == true)
                        showMessage("Success", "UDI verified successfully.", "success", 3000);

                    setIsValidated(true);
                }
                else {
                    //if (flag == true) {
                    //    showMessage("Error", "Please enter valid UDI.", "error", 3000);
                    //    setState(prevState => ({
                    //        ...prevState,
                    //        deviceUdi: null,
                    //        medicalEquipmentId: null
                    //    }));
                    //}
                    //else
                    showMessage("Error", "Please enter valid UDI.", "error", 3000);
                    setDeviceData('');
                }
            })
        }
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
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

    const handleDelete = () => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the implanted device?", "confirm", function () {

            var data = {
                patientMedicalEquipmentId: state.patientMedicalEquipmentId
            }

            PostDataAPI('patient/medicalEquipment/delete', data, true).then((result) => {
                setDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setTimeout(function () { handleClose() }, 500);
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        });
    }


    return (
        <Dialog
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}
        >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>{props.dataId > 0 ? "Edit Implanted Device" : "Add Implantable Device"}</FormGroupTitle>
                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row">
                            <Scrollbars autoHeight autoHeightMax={550}
                                style={{ minHeight: 315 }}>

                                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="UDI" size={3} mandatory={true} />

                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                        <InputBaseField
                                            id="deviceUdi"
                                            name="deviceUdi"
                                            value={state.deviceUdi}
                                            onChange={handleChange}
                                            placeholder={"UDI"}
                                        />
                                        {errorMessages.errorDeviceUdi && !state.deviceUdi ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter UDI
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                        <Grid container alignItems="center" justify="center">
                                            <Button className={classes.verifyBtn} disabled={ !isEditable} onClick={() => VerifyDeviceUDI(true, state.deviceUdi)}>
                                                {isVerify ? <CircularProgress className={classes.circularProgressBar} size={20} /> : null}
                                                Verify
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>

                                {deviceData != '' ?
                                    <>
                                        <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label isTextAreaInput={true} title="Device Identifiers" size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                                <div className={classes.deviceInfoSection}>
                                                    {/* <FormLabel className={classes.deviceInfoTitle}>Device Identifiers:</FormLabel> */}

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Brand Name:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.brandName}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Version/Modal #:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.versionModelNo}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Company Name:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.company}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>MRI Safety Info:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.mriSafetyInfo}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Commercial Distribution Status:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.deviceCommDistributionStatus}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Catalog Number:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.catalogNumber}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Issuing Agency:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.deviceIdIssuingAgency}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Commercial Distribution End Date:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.deviceCommDistributionEndDate}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Device Count:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.deviceCount}</FormLabel>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row">

                                                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right", paddingRight: "10px" }}>
                                                            <FormLabel className={classes.labelTitle}>Labeler D-U-N-S Number:</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.dunsNumber}</FormLabel>
                                                        </Grid>
                                                    </Grid>


                                                    {/* <FormLabel className={classes.deviceInfoTitle}>Description:</FormLabel>

                                                <div className={classes.chargeDetailsArea}>
                                                    <div>
                                                        <FormLabel className={classes.labelTitle}>GMDN PT Name:</FormLabel>
                                                        <FormLabel className={classes.labelTitle}>SNOWMED Description:</FormLabel>
                                                    </div>
                                                    <div>

                                                        <FormLabel className={classes.labelValue}>{deviceData?.objDeviceData?.gudid?.device?.gmdnTerms?.gmdn?.length > 0 ? deviceData?.objDeviceData?.gudid?.device?.gmdnTerms?.gmdn[0].gmdnPTName : ""}</FormLabel>
                                                        <FormLabel className={classes.labelValue}>{deviceData?.objDeviceData?.gudid?.device?.gmdnTerms?.gmdn?.length > 0 ? deviceData?.objDeviceData?.gudid?.device?.gmdnTerms?.gmdn[0].gmdnPTDefinition : ""}</FormLabel>
                                                    </div>
                                                </div>                                         */}

                                                </div>
                                            </Grid>

                                        </Grid>
                                        <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label isTextAreaInput={true} title="Description" size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                                <div className={classes.deviceInfoSection}>

                                                    {/* <FormLabel className={classes.deviceInfoTitle}>Description:</FormLabel> */}

                                                    <div className={classes.chargeDetailsArea}>
                                                        <div>
                                                            <FormLabel className={classes.labelTitle}>GMDN PT Name:</FormLabel>
                                                            <FormLabel className={classes.labelTitle}>SNOWMED Description:</FormLabel>
                                                        </div>
                                                        <div>

                                                            <FormLabel className={classes.labelValue}>{deviceData?.gmdnPtname}</FormLabel>
                                                            <FormLabel className={classes.labelValue}>{deviceData?.snowmedDesc}</FormLabel>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Grid>

                                        </Grid>
                                    </> : null}


                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Implant Date" size={3} mandatory={true} />
                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                        <InputBaseField
                                            type="date"
                                            id="implantDate"
                                            name="implantDate"
                                            value={state.implantDate}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorImplantDate && !state.implantDate ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter implant date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Removal Date" size={3} />
                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                        <InputBaseField
                                            type="date"
                                            id="removalDate"
                                            name="removalDate"
                                            value={state.removalDate}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorRemovalDateEmpty && !state.removalDate ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter Removal Date
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorRemovalDate ? (<FormHelperText style={{ color: "red" }} >
                                            Removal date cannot be earlier than implant date
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Device Status" size={3} />
                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                        <SelectField
                                            id="deviceStatusCode"
                                            name="deviceStatusCode"
                                            value={state.deviceStatusCode}
                                            options={AccountStatusOptions}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Notes" size={3} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            placeholder="Notes"
                                            id="notes"
                                            name="notes"
                                            value={state.notes}
                                            onChange={handleChange}
                                            MaxLength={75}
                                        />
                                    </Grid>
                                </Grid>

                            </Scrollbars>
                        </Grid>
                    </div>
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
                    <LogDialog
                        code="medicalequipment"
                        id={state.patientMedicalEquipmentId}
                        dialogOpenClose={logdialogstate}
                        onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                    />
                    <div className={classes.footer}>
                        <Grid container item direction="row" lg={12}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
                            <Grid container item direction="row" alignItems="center" justify="flex-start" xs={8} sm={8} md={8} lg={8} xl={8}>
                                {isSaving ?
                                    <FormBtn id="loadingSave">Save</FormBtn>
                                    :
                                    <FormBtn id="save" disabled={!isEditable} onClick={Save}> Save</FormBtn>
                                }

                                {state.patientMedicalEquipmentId > 0 ?
                                    <FormBtn id={"delete"} disabled={!isEditable} onClick={handleDelete} size="medium">
                                        Delete
                                    </FormBtn> : null
                                }

                                <FormBtn id="resetBtn" onClick={clearValues}> Reset </FormBtn>

                                {state.patientMedicalEquipmentId > 0 ?
                                    <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                    : null
                                }
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div >

        </Dialog >
    )
}

export default withSnackbar(AddImplantableDevice)