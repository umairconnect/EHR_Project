import React, { useState, useEffect } from "react";
import {
    Dialog,
    FormHelperText,
    Grid,
    MenuItem,
    Select
} from "@material-ui/core";
import useStyles from "./styles";
import CloseIcon from "../../../../images/icons/math-plus.png";
import { InputBaseField, TextareaField, SelectField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert';
import { Scrollbars } from "rc-scrollbars"
import { GetUserInfo } from "../../../../Services/GetUserInfo";

import { formatTimeFull } from "../../../../components/Common/Extensions";

//option images
import CanceledIcon from "../../../../images/icons/canceled.png";
import InRoomIcon from "../../../../images/icons/in-room.png";
// import TentativeIcon from "../../images/icons/tentative.png";
// import SeenIcon from "../../images/icons/seen.png";
// import InLobbyIcon from "../../images/icons/in-lobby.png";
import NoShowIcon from "../../../../images/icons/no-show.png";
// import PendingArrivalIcon from "../../images/icons/pending-arrival.png";
import ArrivedIcon from "../../../../images/icons/arrived.png";
import CheckedInIcon from "../../../../images/icons/checked-in.png";
import CheckedInOnlineIcon from "../../../../images/icons/checked-in-online.png";
import ConfirmedIcon from "../../../../images/icons/confirmed.png";
import CompletedIcon from "../../../../images/icons/completed.png";
import InSessionIcon from "../../../../images/icons/in-session.png";
import NotConfirmedIcon from "../../../../images/icons/not-confirmed.png";
import OrphanIcon from "../../../../images/icons/orphan.png";
import ReScheduledIcon from "../../../../images/icons/re-scheduled.png";

function ConfirmationDialog({ showHideDialog, handleClose, handleSaveClose, ...props }) {

    // handle styles
    const classes = useStyles();
    const { showMessage } = props;

    const [isSaving, setIsSaving] = useState(false);
    const [appointmentId, setAppointmentId] = useState(props.appointmentId);
    const [appointment, setAppointment] = useState({});


    const appointmentStatusOptions = [
        {
            image: <img src={ConfirmedIcon} alt="arrived" />,
            value: "Confirmed",
            label: "Confirmed",
        },
        {
            image: <img src={NotConfirmedIcon} alt="arrived" />,
            value: "Not-Confirmed",
            label: "Not-Confirmed",
        }
    ]


    const [confirmationMethodList, setConfirmationMethodList] = useState([
        { value: '1', label: 'Caregiver responded' },
        { value: '2', label: 'Parent/Guardian responded' },

        { value: '3', label: 'Patient responded' },
        { value: '4', label: 'Custom confirmation method' },

        { value: '5', label: 'Patient responded via voicemail' },
        { value: '6', label: 'Spoke with caregiver' },

        { value: '7', label: 'Spoke with parent/guardian' },
        { value: '8', label: 'Spoke with patient' },

    ]);

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [state, setState] = useState({
        isConfirmed: "", date: new Date().toISOString().split('T')[0], time: formatTimeFull(new Date()),
        confirmationMethod: "", confirmedBy: "", notes: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        errorDate: false, errorTime: false, errorConfirmationMethod: false, errorUpdatedBy: false,
    });

    const init = () => {
        setState({
            isConfirmed: "", date: new Date().toISOString().split('T')[0], time: formatTimeFull(new Date()),
            confirmationMethod: "", confirmedBy: "", notes: "",
        })
        if (props.appointmentId > 0) {
            loadAppointments();
        }

    }



    function loadAppointments() {
        PostDataAPI("appointment/getAppointmentDetailOnlyByID", props.appointmentId).then((result) => {

            if (result.success && result.data != null) {

                var _isConfirmed = "Not-Confirmed";
                if (result.data.isConfirmed) {
                    _isConfirmed = "Confirmed";
                }
                //setAppointment(result.data);
                setState({
                    isConfirmed: _isConfirmed,
                    date: result.data.confirmationDate != null ? result.data.confirmationDate.split('T')[0] : new Date().toISOString().split('T')[0],
                    time: result.data.confirmationDate != null ? formatTimeFull(result.data.confirmationDate) : formatTimeFull(new Date()),
                    confirmationMethod: result.data.confimationMethodCode,
                    notes: result.data.confirmationNotes,
                    confirmedBy: result.data.confirmedByName
                });

            }
        })
    }

    useEffect(() => {
        init();
        if (showHideDialog) {

            setErrorMessages({
                errorCarePlanType: false, errorStatrDate: false, errorInstructions: false
            });

        }

    }, [showHideDialog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const save = (e) => {
        let hasError = false;
        if (!state.isConfirmed || state.isConfirmed.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatus: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatus: false
            }));
        }
        if (!state.date || state.date.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStateDate: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStateDate: false
            }));
        }

        if (!state.time || state.time.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStateTime: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStateTime: false
            }));
        }

        if (!state.confirmationMethod || state.confirmationMethod.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorConfirmationMethod: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorConfirmationMethod: false
            }));
        }
        if (hasError == false) {
            setIsSaving(true);
            var isConfirmed = true;
            if (state.isConfirmed === "Not-Confirmed") {
                isConfirmed = false
            }

            let method = "appointment/updatePatientAppointmentConfirmationStatus";
            var params = {
                isConfirmed: isConfirmed,
                confimationMethodCode: state.confirmationMethod,
                confirmationNotes: state.notes,
                confirmationDate: state.date + "T" + state.time,
                patientAppointmentID: props.appointmentId,
                confirmedBy: parseInt(userInfo.loggedInUserID)
            }
            PostDataAPI(method, params, true).then((result) => {
                setIsSaving(false);

                if (result.success == true) {
                    setErrorMessages([]);

                    showMessage("Success", "Appointment updated successfully", "success", 3000);

                    handleClose(true);




                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }


    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}>

            <div className={classes.DialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>Appointment Confirmation</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row">

                                <Grid container direction="row">
                                    <Label title="Status" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <SelectField
                                            id="isConfirmed"
                                            name="isConfirmed"
                                            placeholder="Select Status"
                                            options={appointmentStatusOptions}
                                            value={state.isConfirmed}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorStatus && (!state.status || state.status.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please select status
                                            </FormHelperText>)
                                            : ('')}
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" >
                                    <Label title="Date" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={state.date}
                                            onChange={handleChange}
                                            disabled="disabled"
                                        />

                                        {errorMessages.errorStateDate && (!state.date || state.date.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please select date
                                            </FormHelperText>)
                                            : ('')}

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" >
                                    <Label title="Time" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={state.time}
                                            onChange={handleChange}
                                            disabled="disabled"
                                        />

                                        {errorMessages.errorStateTime && (!state.time || state.time.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please select time
                                            </FormHelperText>)
                                            : ('')}

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Confirmation Method" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>

                                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}



                                        <SelectField
                                            id="confirmationMethod"
                                            name="confirmationMethod"
                                            placeholder="Search Confirmation Method"
                                            value={state.confirmationMethod}
                                            options={confirmationMethodList}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorConfirmationMethod && (!state.confirmationMethod || state.confirmationMethod.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please select confirmation method
                                            </FormHelperText>)
                                            : ('')}
                                    </Grid>
                                </Grid>
                                {state.confirmedBy != 0 ?
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Confirmed by" size={3} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                            <InputBaseField
                                                id="confirmedBy"
                                                name="confirmedBy"
                                                IsDisabled={true}
                                                placeholder="Search"
                                                value={state.confirmedBy}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    :
                                    null
                                }


                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Notes" isTextAreaInput={true} size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            rowsMin={5}
                                            MaxLength="2000"
                                            id="notes"
                                            name="notes"
                                            value={state.notes}
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                </Grid>

          
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid container direction="row" xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid container direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={9} md={9} lg={9} xl={9}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={() => save()}> Save</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div >

        </Dialog >
    )

}
export default withSnackbar(ConfirmationDialog)
