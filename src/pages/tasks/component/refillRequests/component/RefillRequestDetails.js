import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import {
    Grid,
    FormLabel,
    Typography,
    ButtonGroup,
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
//components
import CloseIcon from "../../../../../images/icons/math-plus.png"
import SearchList from "../../../../../components/SearchList/SearchList"
import TaskGrid from "../../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from '../../../../../components/UiElements/UiElements';
import { InputBaseField, SelectField } from '../../../../../components/InputField/InputField';
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../components/Message/Alert';
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { GetDataAPI } from '../../../../../Services/GetDataAPI';
import PatientInfo from '../../../../patients/component/patientInfo/PatientInfo';
import { Link } from "react-router-dom";

import Demographics from '../../../../patients/component/demographics/Demographics';
import { IsEditable } from '../../../../../Services/GetUserRolesRights';


function RefillRequestDetails({ dialogOpenClose, handleClose, updateGrid, refillStatus, refillCompletedView, ...props }) {

    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [state, setState] = useState({
        medicationRefillRequestId: props.medicationRefillId, patientId: 0, prescribingProvider: 0, refillNumber: 0, pharmacyNotes: "",
        internalNotes: "", overrideAllergy: "", isDenied: false, denyReasonCode: "", statusCode: "Open", isDeleted: false, createDate: new Date().toISOString(),
        createdBy: 0, updateDate: null, updatedBy: 0
    });
    const [dropDownActionId, setDropDownActionId] = useState(0);
    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleRowAction = (e) => {
        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isDisableddAssign, setIsDisableddAssign] = useState(true);
    const [showPatientForm, setShowPatientForm] = useState(false);
    const denyReasonCodeList = [
        { label: "Patient Visit Required", value: "patient_visit_required" },
        { label: "medication substitution required", value: "medication_substitution_required" },
    ]
    //
    const [showPatientDemographicDialog, setShowPatientDemographicDialog] = useState(false);
    //

    const medicineList = [
        { name: "Medicine Name", value: state.drugName },
        { name: "Quantity", value: state.dispenseQuantity },
        { name: "Units", value: state.unitCode },
        { name: "Sig", value: state.sigNotes },
        { name: "Refills", value: state.refillNumberValue },
        { name: "Generics", value: state.substitutionAllowed },
        { name: "Prescribed Date", value: state.prescribedDatetime },
        { name: "Originating Prescriber", value: "" },
        { name: "Patient", value: state.patientName },
        { name: "Gender", value: state.genderCode },
        { name: "DOB", value: state.birthDate },
    ];

    const dispensedList = [

        { name: "Medicine Name", value: state.drugName },
        { name: "Quantity", value: state.dispenseQuantity },
        { name: "Units", value: state.unitCode },
        { name: "Sig", value: state.sigNotes },
        { name: "Refills", value: state.refillNumberValue },
        { name: "Generics", value: state.substitutionAllowed },
        { name: "Prescribed Date", value: state.prescribedDatetime },
        { name: "Pharmacy", value: "" },

    ];

    useEffect(() => {
        clear();

        console.log(refillCompletedView);
        if (props.dataIdEdit > 0)
            loadMedicationRefillData(props.dataIdEdit);
        else if (props.dataIdEdit === 0)
            setIsDisableddAssign(false);

    }, [props.dataIdEdit, props.medicationRefillId]);
    function clear() {

        //setIsDisableddAssign(true);
        setState({

            birthDate: "", createDate: "", createdBy: 0, denyReasonCode: null, dispenseQuantity: "", drugName: "", encRoleID: null, encUserID: null,
            genderCode: "", internalNotes: null, isDenied: null, medicationId: "", medicationRefillRequestId: props.medicationRefillId, originatingPrescriber: "", originatingPrescriberAddressInfo: "",
            patientId: 0, patientName: "", pharmacyAddress: "", pharmacyNotes: "", prescribedDatetime: "", prescribingProvider: "", receiveOnDate: "", refillNumber: "", sigNotes: "",
            statusCode: "Open", substitutionAllowed: "", unitCode: "", updateDate: "", updatedBy: 0, writtenDate: "", chartNumber: "", city: "", state: "", zipCode: "", patientName: ""

        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const handleSearchListChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        serachByPatientInfo(id);


    }


    function serachByPatientInfo(id) {

        var params = {
            code: "patient_info_refill_request",
            parameters: [id ? id.toString() : ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null && result.data.length > 0) {
                let res = result.data ? result.data[0] : null;

                setState(prevState => ({
                    ...prevState,
                    patientName: res.text1,
                    //chartNumber: res.text2,
                    //birthDate: res.text3,
                    //city: res.text4,
                    //state: res.text5,
                    //zipCode: res.text6,
                    patientId: res.id1
                }))
                assignToMedicationByPatientId(res.id1, res.id);
                //if (res.id > 0)
                //    setIsDisableddAssign(false);
                //else
                //setIsDisableddAssign(true);
            }
        })

    }

    function loadMedicationRefillData(id) {

        PostDataAPI("patient/refill/getRefillRequest", parseFloat(id)).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.patientId && result.data.patientId > 0)
                    setIsDisableddAssign(true);
                else
                    setIsDisableddAssign(false);

                if (refillStatus == "Assign To")
                    setIsDisableddAssign(false);

                setState(result.data);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    function assignToMedicationByPatientId(patientId, medicationId) {

        if (medicationId <= 0) {
            showMessage("Success", "Medication refill request not avaiable cannot assign.", "success", 3000);
            return;
        }

        var params = {
            code: "",
            parameters: [medicationId ? medicationId.toString() : "",
            patientId ? patientId.toString() : "",
            userInfo.userID ? userInfo.userID.toString() : "",
            props.dataIdEditTask ? props.dataIdEditTask.toString() : ""]
        }
        PostDataAPI("patient/refill/updatePatientAssignToRefill", params).then((result) => {

            if (result.success && result.data != null) {
                showMessage("Success", "Medication refill request assign to patient successfully.", "success", 3000);
                updateGrid();
                loadMedicationRefillData(medicationId);
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })

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
            //var lastChar = amount.substring(amount.length - 1);
            //if (lastChar == ".") amount = amount + "0";

            if (amount.length > 10)
                amount = parseFloat(amount).toFixed(2);

            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    };

    function Save() {

        if (!state.patientId || state.patientId === 0) {
            showMessage("Error", "Please select patient", "error", 3000);
            return;
        }

        if (state.refillNumber == "" || state.refillNumber == null || state.refillNumber == 0) {
            showMessage("Error", "Please enter number of refill", "error", 3000);
            return;
        }

        var method = "patient/refill/addRefillRequest";
        if (state.medicationRefillRequestId)
            method = "patient/refill/updateRefillRequest";

        state.refillNumber = parseFloat(state.refillNumber);
        state.patientId = parseFloat(state.patientId);
        state.statusCode = 'Completed';

        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {

                showMessage("Success", "Medication refill request saved successfully.", "success", 3000);

                var data = {
                    taskId: parseInt(props.dataIdEditTask),
                    taskStatusCode: 'Completed'
                }
                PostDataAPI("task/updateTaskStatus", data).then((result) => {

                    if (result.success && result.data != null) {

                        updateGrid();
                    }
                });

                handleClose();
            }
            else showMessage("Error", result.message, "error", 3000);
        })
    }

    function SaveDeniedReason(isCondiion) {

        if (!state.patientId || state.patientId === 0) {
            showMessage("Error", "Please select patient", "error", 3000);
            return;
        }

        var method = "patient/refill/addRefillRequest";
        if (props.medicationRefillId > 0)
            method = "patient/refill/updateRefillRequest";

        state.medicationRefillRequestId = props.medicationRefillId;
        state.refillNumber = state.refillNumber ? parseFloat(state.refillNumber) : null;
        state.patientId = parseFloat(state.patientId);
        state.refillNumberValue = state.refillNumberValue ? parseFloat(state.refillNumberValue) : 0;
        state.statusCode = 'Dany';
        if (isCondiion)
            state.denyReasonCode = 'denied_new_script_follow';
        else {
            if (state.denyReasonCode == "" || state.denyReasonCode == null) {
                showMessage("Error", "Please select deny reason", "error", 3000);
                return;
            }
        }
        state.isDenied = true;

        PostDataAPI(method, state, true).then((result) => {

            if (result.success && result.data != null) {

                showMessage("Success", "Medication refill request denied successfully.", "success", 3000);

                var data = {
                    taskId: parseInt(props.dataIdEditTask),
                    taskStatusCode: 'Dany'
                }
                PostDataAPI("task/updateTaskStatus", data).then((result) => {

                    if (result.success && result.data != null) {

                        updateGrid();
                    }
                });

                handleClose();
            }
            else showMessage("Error", result.message, "error", 3000);
        })
    }

    function getAgeByDOB(birthDate) {

        var result = '';
        if (birthDate.trim() != '' && birthDate != undefined) {

            var mdate = birthDate;
            var yearThen = parseInt(mdate.substring(0, 4), 10);
            var monthThen = parseInt(mdate.substring(5, 7), 10);
            var dayThen = parseInt(mdate.substring(8, 10), 10);

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);
            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
            var month_age = Math.floor(day_age / 30);
            day_age = day_age % 30;


            if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
                result = '';
            else if (year_age > 0)
                result = year_age + ' years, ' + month_age + ' months, ' + day_age + ' days';
            else if (year_age === 0 && month_age > 0)
                result = month_age + ' months, ' + day_age + ' days';
            else if (year_age > 0 && month_age === 0)
                result = year_age + ' years, ' + day_age + ' days';
            else if (day_age === 0)
                result = '';
            else
                result = day_age + ' days';
        }
        return result;
    }

    const handleClosePatientForm = () => {
        setShowPatientForm(false);
    }
    const handleClosePatientDemographicsForm = () => {
        setShowPatientDemographicDialog(false);
    }
    return (
        <>{
            showPatientDemographicDialog ?

                <Dialog
                    classes={{ paper: classes.demographicDialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    PaperComponent={DraggableComponent}
                    open={showPatientDemographicDialog}
                    fullWidth={true}
                    maxWidth={"xl"}
                >
                    {/* <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                        <Grid lg={12} container direction="row">

                            <Grid item xs={11} sm={11} md={11} lg={11}
                                container
                                direction="row"
                            >
                                <FormGroupTitle>Demographics</FormGroupTitle>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1} >
                                <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                    <span className={classes.crossButton} onClick={() => handleClosePatientDemographicsForm()}><img src={CloseIcon} /></span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogTitle> */}
                    {/* <Scrollbars style={{ minHeight: "98vh", maxHeight: "100% ", display: "flex", }}> */}
                    <Divider />
                    <DialogContent className={classes.demographicDialogcontent}>
                        <Grid item xs={12} sm={12} md={12} lg={12} container direction="row" style={{ cursor: "move" }} id="draggable-dialog-title" >
                            <span className={classes.crossButton} onClick={() => handleClosePatientDemographicsForm()}><img src={CloseIcon} /></span>
                            <FormGroupTitle>Demographics</FormGroupTitle>

                        </Grid>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <Demographics dataId={state.patientId} isEditable={isEditable} />
                        </Scrollbars>
                    </DialogContent>
                    <Divider />
                    <DialogActions className={classes.demographicDialogactions}>
                        &nbsp;
                        <br />

                        {/* <FormBtn id="reset" onClick={closeDemographics} >Close</FormBtn> */}
                    </DialogActions>
                    {/* </Scrollbars> */}
                </Dialog>

                : ""
        }
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                {...props} >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    <Grid lg={12} container direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <FormGroupTitle>Refill Requests</FormGroupTitle>
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
                    <Scrollbars autoHeight autoHeightMax={600} style={{ maxHeight: "calc(100% - 64px)", display: "flex", height: "100%" }}>
                        <div className={classes.allTasksCard}>
                            <div className={classes.allTasksInnerCard}>
                                <Grid container lg={12} direction="row" justify="start">

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <FormGroupTitle>Refill Requests</FormGroupTitle>
                                    </Grid>

                                    <Label title="Patient" size={1} mandatory={true} />

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
                                        <SearchList
                                            id="patientsearchName"
                                            name="patientName"
                                            value={state.patientName}
                                            searchTerm={state.patientName}
                                            code="patient_Search"
                                            apiUrl="ddl/loadItems"
                                            placeholderTitle="Search Patient"
                                            onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                            isDisabled={isDisableddAssign == true ? true : false}
                                        />

                                        {/* isDisabled={refillStatus == 'Assign To' ? false : true}*/}
                                    </Grid>

                                    <Label title="Vendor Patient Record" size={2} />

                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
                                        <Link onClick={() => setShowPatientDemographicDialog(true)}>
                                            <Typography className={classes.vendorPatientRecordText}>{state.patientName ? state.patientName : ""}</Typography>
                                        </Link>

                                    </Grid>

                                    {/*<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                    {/*    <table className={classes.patientTable}>*/}
                                    {/*        <thead>*/}
                                    {/*            <td colSpan={1}>Patient</td>*/}
                                    {/*            <td colSpan={1}>Chart ID</td>*/}
                                    {/*            <td colSpan={1}>Date of birth</td>*/}
                                    {/*            <td colSpan={1}>City</td>*/}
                                    {/*            <td colSpan={1}>Action</td>*/}
                                    {/*        </thead>*/}
                                    {/*        <tbody>*/}
                                    {/*            <tr>*/}
                                    {/*                <td>{state.patientName ? state.patientName : ""}</td>*/}
                                    {/*                <td>{state.chartNumber ? state.chartNumber : ""}</td>*/}
                                    {/*                <td>{state.birthDate ? state.birthDate : ""}</td>*/}
                                    {/*                <td>{state.city ? state.city : ""} {state.state ? " ," + state.state : ""} {state.zipCode ? " ," + state.zipCode : ""}</td>*/}
                                    {/*                <td><FormBtn size="default" id="reset" onClick={() => assignToMedicationByPatientId()} disabled={isDisableddAssign == true && state.patientId === 0 ? false : true} disabled={refillStatus == 'Assign To' ? false : true}  >Assign</FormBtn></td>*/}
                                    {/*            </tr>*/}
                                    {/*        </tbody>*/}
                                    {/*    </table>*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <FormGroupTitle>Prescribed</FormGroupTitle>
                                    </Grid>

                                    <div className={classes.prescribedArea}>
                                        <div className={classes.medicineInfoArea}>
                                            <ul className={classes.treeView}>
                                                {medicineList.map((item, i) => (
                                                    (<li key={i} style={{ cursor: "default" }}>
                                                        <div className={classes.treeContent}>
                                                            <div className={classes.medicineNameArea}> {item.name} </div>
                                                            <div className={classes.medicineValueArea}>{item.value}</div>
                                                        </div>
                                                    </li>)
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={classes.dispensedInfoArea}>
                                            <ul className={classes.treeView}>
                                                {dispensedList.map((item, i) => (
                                                    (<li key={i} style={{ cursor: "default" }}>
                                                        <div className={classes.treeContent}>
                                                            <div className={classes.medicineNameArea}> {item.name} </div>
                                                            <div className={classes.medicineValueArea}>{item.value}</div>
                                                        </div>
                                                    </li>)
                                                ))}
                                            </ul>

                                            <Grid container lg={12} direction="row" justify="start">
                                                <FormGroupTitle>No drug or allergy alerts triggered for this medicine</FormGroupTitle>
                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="No of refills (including this one)" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                        <InputBaseField
                                                            id="refillNumber"
                                                            name="refillNumber"
                                                            value={state.refillNumber}
                                                            onChange={handleChange}
                                                            placeholder="No. of Refills"
                                                            type="Number"
                                                            MaxLength='6'
                                                            MinValue={0}
                                                            MaxValue={1000}
                                                            IsDisabled={refillCompletedView}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Matching Medication" size={3} />
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                        <InputBaseField
                                                            id="drugName"
                                                            name="drugName"
                                                            value={state.drugName}
                                                            onChange={handleChange}
                                                            placeholder="Medication"
                                                            IsDisabled={refillCompletedView}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Notes to Pharmacy" size={3} />
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                        <InputBaseField
                                                            id="pharmacyNotes"
                                                            name="pharmacyNotes"
                                                            value={state.pharmacyNotes}
                                                            onChange={handleChange}
                                                            placeholder="Notes"
                                                            IsDisabled={refillCompletedView}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Reason for denial" size={3} />
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                        <SelectField
                                                            id="denyReasonCode"
                                                            name="denyReasonCode"
                                                            value={state.denyReasonCode}
                                                            onChange={handleChange}
                                                            options={denyReasonCodeList}
                                                            placeholder="Select Reason"
                                                            Disabled={refillCompletedView}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Refill Approved by" size={3} />
                                                    <Grid container xs={12} sm={5} md={5} lg={5} xl={5} alignItems="stretch">
                                                        <FormLabel className={classes.boldTextHeading}>{userInfo.firstName + ' ' + userInfo.lastName}</FormLabel>
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Patient" size={3} />
                                                    <Grid container xs={12} sm={5} md={5} lg={5} xl={5} alignItems="stretch">
                                                        <span style={{ display: "inline-grid" }}>
                                                            <FormLabel className={classes.boldTextHeading}>{state.patientName}</FormLabel>
                                                            <FormLabel className={classes.patientAgeText}>{state.genderCode ? state.genderCode + " | " : ""} {state.ageBirthDate != null && state.ageBirthDate.trim() != '0001-01-01T00:00:00' ? getAgeByDOB(state.ageBirthDate.split('T')[0]) + " | " : ""} {state.birthDate ? state.birthDate : ""}   </FormLabel>
                                                        </span>
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Written on" size={3} />
                                                    <Grid container xs={12} sm={5} md={5} lg={5} xl={5} alignItems="stretch">
                                                        <FormLabel className={classes.boldTextHeading}>{state.writtenDate}</FormLabel>
                                                    </Grid>
                                                </Grid>

                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>

                                                    <div className={classes.footerArea}>
                                                        <div className={classes.footerAreaLeft}>
                                                            <FormBtn id="reset" size="default" onClick={handleClose} >Cancel</FormBtn>
                                                            {refillStatus != "Completed" ? <ButtonGroup >
                                                                <FormBtn id="save" size="default" className={classes.actionBtn} onClick={() => SaveDeniedReason(false)} disabled={!props.isEditable}>Deny</FormBtn>
                                                                <Button
                                                                    className={classes.menuBtn}
                                                                    data-id={1}
                                                                    size="small"
                                                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                                                    aria-haspopup="true"
                                                                    onClick={handleRowAction}
                                                                    endIcon={<ExpandMore />}>
                                                                </Button>

                                                            </ButtonGroup>
                                                                : null}

                                                        </div>
                                                        <div className={classes.footerAreaRight}>
                                                            {refillStatus != "Completed" && refillStatus != 'Deny' ? <FormBtn id="save" size="default" onClick={Save} disabled={!props.isEditable}>Save</FormBtn> : null}
                                                        </div>

                                                    </div>

                                                </Grid>

                                            </Grid>
                                        </div>
                                    </div>

                                </Grid>
                            </div>
                        </div>
                    </Scrollbars>
                </DialogContent>
            </Dialog>
            {
                showPatientForm ? (<PatientInfo dataId={state.patientId} dialogOpenClose={showPatientForm} handleClose={handleClosePatientForm} />)
                    : ('')
            }
            <Popper style={{ zIndex: 111111 }} id={id} open={open} anchorEl={anchorEl} role={undefined}>
                <Paper>
                    <ClickAwayListener onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>

                        <MenuList autoFocusItem={open} id="menu-list-grow">

                            <MenuItem data-id="deniedNewScript" onClick={() => SaveDeniedReason(true)} > Denied & new script will follow</MenuItem>

                        </MenuList>

                    </ClickAwayListener>
                </Paper>
            </Popper>

        </>
    )
}
export default withSnackbar(RefillRequestDetails)
