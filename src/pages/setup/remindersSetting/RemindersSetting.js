import React, { useState, useEffect } from 'react';
//material ui 
import { Button, Container, FormLabel } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
//router-dom
import { useHistory } from 'react-router-dom';
//custom imports
import PageTitle from "../../../components/PageTitle";
import { withSnackbar } from '../../../components/Message/Alert';
import { FormGroupTitle } from '../../../components/UiElements/UiElements';
import { SwitchBoxField } from '../../../components/InputField/InputField';
//styles
import useStyles from './styles';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../Services/GetDataAPI';

function RemindersSetting({ showMessage, ...props }) {
    var classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        allowExchMsg: false, enableAppointmentReminders: false,
        allowEmailReminders: false, allowSmsReminders: false
    });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
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

    useEffect(() => {
        //get Patient Communication Responce from settings
        GetDataAPI("setup/loadCommSettings").then((result) => {
            if (result.success && result.data != null) {
                setState(result.data);
                isAllChecked(result.data.allowEmailReminders, result.data.allowSmsReminders);
            }
        })
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;

        ShowActionDialog(true, "Update Setting", "Are you sure, you want to change the setting?", "confirm", function () {

            if (name === 'enableAppointmentReminders') {
                if (checked) { state["allowEmailReminders"] = true; state["allowSmsReminders"] = true; }
                else { state["allowEmailReminders"] = false; state["allowSmsReminders"] = false; }
            }
            else { state[name] = checked; }

            saveChanges();
            isAllChecked(state.allowEmailReminders, state.allowSmsReminders);

            setState(prevState => ({
                ...prevState,
                [name]: checked
            }))

        })
    }

    const isAllChecked = (allowEmailReminders, allowSmsReminders) => {

        if (allowEmailReminders == true || allowSmsReminders == true) {
            setState(prevState => ({
                ...prevState,
                enableAppointmentReminders: true
            }))
        }
        else {
            setState(prevState => ({
                ...prevState,
                enableAppointmentReminders: false
            }))
        }
    }

    const saveChanges = () => {

        PostDataAPI("setup/updatePatCommSettings", state, true).then((result) => {
            if (result.success == true) {
                if (result.success && result.data != null) {
                    showMessage("Success", "Setting saved successfully.", "success", 2000);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);

            }

        },
            function () {
                setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
            });
    }

    return (
        <>
            <PageTitle title={"Reminders Setting"} button={<Button
                size="small"
                id="btnIdGetSettings"
                className={classes.newAddBtn}
                onClick={() => {
                    history.goBack();
                }}
                startIcon={< ArrowBackIosIcon />}
            >
                Back to Setup
            </Button>
            } />
            <Container maxWidth={false}>

                <div className={classes.innerContainer}>
                    <FormGroupTitle>Patient Messages</FormGroupTitle>
                    <div className={classes.content}>
                        <FormLabel className={classes.subTitle}>Patient Messages</FormLabel>
                        <span className={classes.checkBoxContent}>
                            <SwitchBoxField
                                name="allowExchMsg"
                                id="allowExchMsg"
                                checked={state.allowExchMsg}
                                onChange={handleChange}
                                label="Check the toggle button on to let patient exchange messages with the provider in your 
                                practice. Patient communication is secured and HIPAA compliant."
                            />
                            {/* <Typography>Check the toggle button on to let patient exchange messages with the provider in your practice. Patient communication is secured and HIPAA compliant.</Typography> */}
                        </span>
                    </div>
                    <FormGroupTitle />
                    <div className={classes.content}>
                        <FormLabel className={classes.subTitle}>Appointment Reminders</FormLabel>
                        <Typography className={classes.noteText}> Three appointment reminders are sent to patients prior to an appointment: 1 week prior
                            (via email). 36-hours prior (via email), and 24-hours prior (via text message), Appointment status
                            emails may be sent even if reminders are turned OFF. Reminders can turn off for specific patients
                            from the patient demographics page.</Typography>
                        <span className={classes.checkBoxContent}>
                            <span className={classes.boldSwitch}>
                                <SwitchBoxField
                                    name="enableAppointmentReminders"
                                    id="enableAppointmentReminders"
                                    checked={state.enableAppointmentReminders}
                                    onChange={handleChange}
                                    label="Enable Appointment Reminders"
                                />
                            </span>
                            <div className={classes.subContent}>
                                <SwitchBoxField
                                    name="allowEmailReminders"
                                    id="allowEmailReminders"
                                    checked={state.allowEmailReminders}
                                    onChange={handleChange}
                                    label="Send Email Reminders"
                                />
                                <SwitchBoxField
                                    name="allowSmsReminders"
                                    id="allowSmsReminders"
                                    checked={state.allowSmsReminders}
                                    onChange={handleChange}
                                    label="Send SMS Reminders"
                                />
                            </div>
                            {/* <Typography>Check the toggle button on to let patient exchange messages with the provider in your practice. Patient communication is secured and HIPAA compliant.</Typography> */}
                        </span>
                    </div>
                </div>

            </Container>

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

export default withSnackbar(RemindersSetting);