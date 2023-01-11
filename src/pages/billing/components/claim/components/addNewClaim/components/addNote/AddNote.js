import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    FormHelperText,
    Tooltip,
} from "@material-ui/core"

import AddIcon from '../../../../../../../../images/icons/add-icon.png';
import EditIcon from '../../../../../../../../images/icons/erase.png';
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import DeleteIcon from '../../../../../../../../images/icons/trash.png';
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
import { SelectField, TextareaField, CheckboxField, InputBaseField } from "../../../../../../../../components/InputField/InputField";
import Scrollbars from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import AddExpectedPaymentDialog from "./components/addExpectedPayment/AddExpectedPaymentDialog";

function AddNote({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [loading, setLoading] = useState(false);
    const [showExpectedPaymentDialog, setShowExpectedPaymentDialog] = useState(false);
    const [state, setState] = useState({
        superbillBillingNotesId: 0, claimSuperbillId: props.claimSuperBillID, notes: "", noteTypeCode: "", isFollowupDate: false,
        followupDate: null, isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString()
    });
    const [errorMessages, setErrorMessages] = useState({ errorNotes: false });
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [notesData, setNotesData] = useState([]);

    const options = [
        { value: "claim_payment", label: "Claim Payment" },
        { value: "claim_rejected", label: "Claim Rejected" },
    ]

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    useEffect(() => {

        loadGrid();

    }, [showHideDialog]);

    const loadGrid = () => {

        var params = {
            code: "",
            parameters: [props.claimSuperBillID ? props.claimSuperBillID.toString() : ""]
        }
        PostDataAPI('billingNotes/loadSuperbillBillingNotesGrid', params, true).then((result) => {

            if (result.success && result.data != null) {


                setNotesData(
                    result.data.map((itm, i) => {
                        return {
                            superbillBillingNotesId: itm.superbillBillingNotesId,
                            claimSuperbillId: itm.claimSuperbillId,
                            strFollowupDate: itm.strFollowupDate,
                            claimSuperbillId: itm.claimSuperbillId,
                            userName: itm.userName,
                            notes: itm.notes,
                            expectedPayment: itm.expectedPayment
                        }
                    }));

            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }

        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const cleanValuesFields = () => {

        setState({
            superbillBillingNotesId: 0, claimSuperbillId: props.claimSuperBillID, notes: "", noteTypeCode: "", isFollowupDate: false,
            followupDate: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString()
        });
    }

    const ValidateNotes = (errorList) => {

        if (state.notes == "" || state.notes == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorNotes: true
            }));

            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNotes: false
            }));
        }
    }

    const handleFormatData = () => {

        state.isFollowupDate = state.isFollowupDate === 'true' ? true : false;
        state.claimSuperbillId = state.claimSuperbillId === 0 ? parseFloat(props.claimSuperBillID) : parseFloat(state.claimSuperbillId);

    }

    const save = () => {

        let errorList = [];
        ValidateNotes(errorList);

        if (errorList.length < 1) {

            let method = state.superbillBillingNotesId < 1 ? "billingNotes/addSuperBillNotes" : "billingNotes/updateSuperBillNotes";
            handleFormatData();
            if (!state.followupDate)
                state.followupDate = null;

            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {

                    if (state.superbillBillingNotesId < 1) {

                        showMessage("Success", "Billing notes saved successfully.", "success", 3000);
                        // cleanValuesFields();

                        setState(prevState => ({
                            ...prevState,
                            "createdBy": result.data.createdBy
                        }));
                        setState(prevState => ({
                            ...prevState,
                            "superbillBillingNotesId": result.data.superbillBillingNotesId
                        }));
                    }
                    else {

                        showMessage("Success", "Billing notes updated successfully.", "success", 3000);
                    }

                    loadGrid();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };


    const editRecord = (billingNotesId) => {

        PostDataAPI('billingNotes/getClaimSuperBillNotesById', parseInt(billingNotesId)).then((result) => {

            if (result.success == true) {
                if (result.data.followupDate)
                    result.data.followupDate = result.data.followupDate.split("T")[0];
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 8000);
            }
        })
    }

    const deleteRecord = (billingNotesId) => {

        var data = {
            superbillBillingNotesId: billingNotesId ? parseInt(billingNotesId) : 0
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Super Bill Note?", "confirm", function () {

            PostDataAPI('billingNotes/deleteClaimSuperBillNotes', data, true).then((result) => {

                if (result.success == true) {
                    setTimeout(function () {
                        showMessage("Success", "Record deleted successfully.", "success", 2000);
                    }, 100);

                    cleanValuesFields();
                    loadGrid();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })
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
    const onSaveExpectedPayment = () => { showMessage("Success", "Record saved successfully.", "success", 3000); }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                {...props} >
                <div className={classes.DialogContentRightSide}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Add Note(s)</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 500 }}>
                                <Grid container direction="row" lg={12}>
                                    <Label title="Note Type" size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                        <SelectField
                                            id="noteTypeCode"
                                            name="noteTypeCode"
                                            options={options}
                                            value={state.noteTypeCode}
                                            onChange={handleChange}
                                            placeholder="Please select note type"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" isTextAreaInput={true} lg={12}>
                                    <Label title="Note(s)" mandatory={true} size={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                        <TextareaField
                                            id="notes"
                                            name="notes"
                                            value={state.notes}
                                            onChange={handleChange}
                                            rowsMin={5}
                                            MaxLength="4000"
                                        />
                                        {errorMessages.errorNotes && !state.notes ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter notes
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                        <span style={{ display: "flex", minWidth: "100%", }}>
                                            <CheckboxField
                                                color="primary"
                                                id="isFollowupDate"
                                                name="isFollowupDate"
                                                checked={state.isFollowupDate}
                                                value={state.isFollowupDate}
                                                onChange={handleChange}
                                                label="Set Next Follow up Date"
                                            />

                                        </span>
                                    </Grid>

                                </Grid>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                        <InputBaseField
                                            type="date"
                                            id="followupDate"
                                            name="followupDate"
                                            value={state.followupDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                </Grid>
                                {
                                    state.superbillBillingNotesId > 0 ?
                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                                <span className={classes.addNote} title={"Expacted Payment Info"} onClick={() => setShowExpectedPaymentDialog(true)}>
                                                    <img src={AddIcon} alt="Expacted Payment Info" /> Expected Payment Info
                                                </span>
                                            </Grid>

                                        </Grid>
                                        : null
                                }
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                        <div>

                                            <FormBtn id="save" onClick={save} > {state.superbillBillingNotesId > 0 ? "Update Note" : "Add Note"} </FormBtn>
                                            <FormBtn id="reset" onClick={cleanValuesFields} > Add Another </FormBtn>
                                        </div>
                                    </Grid>

                                </Grid>
                                <div className={classes.existingTableBox}>
                                    <FormGroupTitle>Existing Note(s)</FormGroupTitle>
                                    <Grid container lg={12} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <table className={classes.icdCodeTable}>
                                                <thead>
                                                    <tr>
                                                        <th>Date/Time</th>
                                                        <th>User</th>
                                                        <th style={{width: "280px"}}>Note Details</th>
                                                        <th>Paid Amount</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {notesData.map((item, i) => (<tr>
                                                        <td>{item.strFollowupDate}</td>
                                                        <td> {item.userName}</td>
                                                        <td>{item.notes}</td>
                                                        <td>{item.expectedPayment != 0 ? item.expectedPayment : ""}</td>
                                                        <td>
                                                            <div className={classes.deleteIcon} title="Delete">
                                                                <Tooltip title="Edit">
                                                                    <img src={EditIcon} alt="edit" onClick={() => editRecord(item.superbillBillingNotesId)} />
                                                                </Tooltip>
                                                                <Tooltip title="Delete">
                                                                    <img src={DeleteIcon} alt="delete" onClick={() => deleteRecord(item.superbillBillingNotesId)} />
                                                                </Tooltip>
                                                            </div>
                                                        </td>

                                                    </tr>))}

                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>

                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
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
            {showExpectedPaymentDialog ?
                <AddExpectedPaymentDialog
                    showHideDialog={showExpectedPaymentDialog}
                    handleClose={() => setShowExpectedPaymentDialog(false)}
                    superbillBillingNotesId={state.superbillBillingNotesId}
                    getResponse={onSaveExpectedPayment}
                />
                : null
            }
        </>
    )

}
export default withSnackbar(AddNote)