import React, { useState, useEffect } from "react";
import {
    Dialog,
    FormLabel,
    Grid,
    Typography,
    FormHelperText,
} from "@material-ui/core";
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import { SelectField } from "../../../../../../components/InputField/InputField";
import { DraggableComponent, FormGroupTitle, Label, FormBtn, } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { InputBaseField } from "../../../../../../components/InputField/InputField";


function ClaimBulkStatusDialog({ showHideDialog, handleClose, stateProcedures, bulkSelectedRows, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    const [state, setState] = useState({ claimStatusCode: '', claimStatusCodeName: '', claimList: [], confirmField: '' });
    const [claimList, setClaimList] = useState({ claimId: 0, patientName: '', dos: '' });

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [claimBillingCode, setClaimBillingCode] = useState([]);
    const [claimStatusCodeGrid, setClaimStatusCodeGrid] = useState([]);
    const [errorMessages, setErrorMessages] = useState({ errorClaimStatusCode: false })
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);

    useEffect(() => {

        var params = {
            code: "DDL_List_Item_Order",
            parameters: ['BILL_STATUS']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _claimBillingCode = [];

                result.data.map((item, i) => {

                    if (item.text3.trim() == 'BILL_STATUS')
                        _claimBillingCode.push({ value: item.text1, label: item.text2 });
                });

                setClaimBillingCode(_claimBillingCode);
            }
        })

        if (bulkSelectedRows.length > 0)
            loadSelectedClaims();


    }, [showHideDialog]);

    const loadSelectedClaims = () => {
        var params = {
            code: "get_claim_bulk_status_info",
            parameters: [bulkSelectedRows.join(", ")]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.length > 0) {

                    var _claimList = [];
                    result.data.map((item, i) => {
                        _claimList.push({ claimId: item.id, patientName: item.text1, dos: item.text2 });
                    });

                    setState(prevState => ({
                        ...prevState,
                        claimList: _claimList
                    }));
                }
            }
        })

    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name == 'claimStatusCode') {
            setState(prevState => ({
                ...prevState,
                "claimStatusCodeName": value.trim().replaceAll("_", " ").replace("_", " ")
            }))
        }
        if (name == 'confirmField') {
            if (value != "") {
                if (/^[a-zA-Z]+$/.test(value)) {
                    value = value.toUpperCase();
                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }))
                }
                else
                    showMessage("Error", "Please enter latters only.", "error", 3000);
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }))
            }
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
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

    const validateBulkStatus = (errorList) => {


        if (state.claimStatusCode == "" || state.claimStatusCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorClaimStatusCode: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorClaimStatusCode: false
            }));
        }

        // if (state.confirmField == "" || state.confirmField == undefined) {
        //     showMessage("Error", "Please enter CONFIRM to continue.", "error", 3000);
        //     errorList.push(true);
        // }
        // else if (state.confirmField != 'CONFIRM') {
        //     showMessage("Error", "Please enter CONFIRM to continue.", "error", 3000);
        //     errorList.push(true);
        // }

    }

    const updateClaimStatus = () => {

        let errorList = [];
        validateBulkStatus(errorList);
        ShowActionDialog(true, "Confirm", "Are you sure, you want to change the status for selected claim(s)?<br>Please note, this action cannot be undone.", "confirm", function () {
            if (errorList.length < 1) {

                var params = {
                    Text1: bulkSelectedRows.join(", "),
                    Text2: state.claimStatusCode.toString(),
                    Text3: userInfo.userID
                };

                PostDataAPI("claim/updateBulkClaimStatus", params).then((result) => {

                    if (result.success == true) {

                        if (result.success === true && result.data != null) {
                            if (result.data)
                                showMessage("Success", "Status updated successfully.", "success", 3000);

                            setTimeout(() => {
                                handleClose();
                            }, 900)

                        }
                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);

                    }
                })
            }
        });


    }

    function alphaOnly(event) {
        var key = event.keyCode;
        return ((key >= 65 && key <= 90) || key == 8);
    };

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'lg'}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Confirm Bulk Status Change</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 200 }}>
                                <Grid container direction="row" lg={12}>

                                    <Grid container lg={12}>
                                        <Label title="Claim Status" size={2} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={5} xl={5}>

                                            <SelectField
                                                id="claimStatusCode"
                                                name="claimStatusCode"
                                                value={state.claimStatusCode}
                                                onChange={handleChange}
                                                label="Select Claim Status"
                                                options={claimBillingCode}
                                                placeholder="Select Claim Status"
                                            />
                                            {errorMessages.errorClaimStatusCode && !state.claimStatusCode ? (<FormHelperText style={{ color: "red" }} >
                                                Please select billing status
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container lg={12}>
                                        <FormLabel className={classes.claimDetails}>
                                            Please confirm bulk status change of {bulkSelectedRows.length} claim(s) to <Typography className={classes.claimStatus}>{state.claimStatusCodeName.toLowerCase()}</Typography>
                                        </FormLabel>
                                    </Grid>


                                    <Grid container direction="row" lg={12}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <table className={classes.claimStatusTable}>
                                                <thead>
                                                    <tr>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Claim #</td>
                                                        <td colSpan="2" className={classes.claimStatusTd}>Patient</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Date of Service</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.claimList ?
                                                        state.claimList.map((item, i) => {
                                                            return <tr>
                                                                <td colSpan="1">{item.claimId}</td>
                                                                <td colSpan="2">{item.patientName}</td>
                                                                <td colSpan="1">{item.dos}</td>
                                                            </tr>
                                                        }) : ""
                                                    }
                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <Grid container justify="center" >
                                <FormBtn id="save" onClick={updateClaimStatus}> Confirm</FormBtn>
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </Grid>
                        </div>
                    </div>

                </div>
            </Dialog >
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
    )
}
export default withSnackbar(ClaimBulkStatusDialog)