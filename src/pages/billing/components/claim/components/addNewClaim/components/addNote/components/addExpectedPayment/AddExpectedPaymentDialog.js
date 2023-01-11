import React, { useState, useEffect, } from "react";
import {
    Dialog,
    Grid,
    FormHelperText
} from "@material-ui/core";
import useStyles from "./styles";
import CloseIcon from "../../../../../../../../../../images/icons/math-plus.png"
import { InputBaseField, InputBaseFieldNumber } from "../../../../../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../../../components/UiElements/UiElements";
import { Scrollbars } from "rc-scrollbars";
import { PostDataAPI } from '../../../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../../../../../components/Message/Alert";

function AddExpectedPaymentDialog({ showHideDialog, handleClose, handleSave, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();

    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({ superbillBillingNotesId: props.superbillBillingNotesId });
    const [dataId, setDataId] = useState(0);
    const [errorMessages, setErrorMessages] = useState({ paidAmount: false });
    useEffect(() => {

        if (showHideDialog) {
            load();
        }

    }, [showHideDialog]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const Save = e => {

        if (!state.paidAmount || isNaN(state.paidAmount) || parseFloat(state.paidAmount) <= 0) {

            setErrorMessages(prevState => ({
                ...prevState,
                paidAmount: true
            }));
            return;

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                paidAmount: false
            }));
        }

        state.paidAmount = parseFloat(state.paidAmount);
        state.allowedAmount = (!state.allowedAmount || isNaN(state.allowedAmount)) ? 0 : parseFloat(state.allowedAmount);

        let method = "claim/exppayment/add";
        if (dataId > 0)
            method = "claim/exppayment/update"

        setIsSaving(true);

        PostDataAPI(method, state, true).then((result) => {

            setIsSaving(false);

            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.expPaymentId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "expPaymentId": result.data.expPaymentId
                    }));
                }
                props.getResponse();
                handleClose();
                // showMessage("Success", "Record saved successfully.", "success", 3000);

            }
            else showMessage("Error", result.message, "error", 8000);
        })
    };
    const load = () => {

        PostDataAPI("claim/exppayment/getByBillingNoteId", props.superbillBillingNotesId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.checkDate)
                    result.data.checkDate = result.data.checkDate.split('T')[0];

                setState(result.data);
                setDataId(result.data.expPaymentId);
            }

        })
    }
    const init = () => {
        setState({
            superbillBillingNotesId: props.superbillBillingNotesId
        });
    }
    const resetForm = () => {

        if (parseInt(props.superbillBillingNotesId) > 0) {
            load();
        }
        else {
            init();
        }
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
                        <FormGroupTitle className={classes.lableTitleInput}>Add Expected Payment</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" lg={12} xl={12}>
                            <Scrollbars style={{ minHeight: 320 }}>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Label title="Check #" size={4} />

                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseField
                                            id="checkNumber"
                                            name="checkNumber"
                                            value={state.checkNumber}
                                            onChange={handleChange}
                                            placeholder="Check #"
                                            MaxLength="50"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Check Date" size={4} />
                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseField
                                            type="date"
                                            id="checkDate"
                                            name="checkDate"
                                            value={state.checkDate}
                                            onChange={handleChange}
                                            placeholder={"Date"}
                                        />

                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Paid Amount" mandatory={true} size={4} />
                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseFieldNumber
                                            id="paidAmount"
                                            name="paidAmount"
                                            placeholder={"Amount"}
                                            value={state.paidAmount}
                                            onChange={handleChange}
                                            MaxLength='10'
                                            MinValue="10"
                                        />
                                        {errorMessages.paidAmount && (!state.paidAmount || state.paidAmount <= 0) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter expected paid amount.
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Allowed Amount" size={4} />
                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseFieldNumber
                                            placeholder="Allowed Amount"
                                            id="allowedAmount"
                                            name="allowedAmount"
                                            value={state.allowedAmount}
                                            onChange={handleChange}
                                            MaxLength='10'
                                            MinValue="10"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Reference #" size={4} />
                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseField
                                            id="referenceNumber"
                                            name="referenceNumber"
                                            placeholder={"Reference #"}
                                            value={state.referenceNumber}
                                            onChange={handleChange}
                                            MaxLength="50"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Label title="Insurance Claim #" size={4} />
                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                        <InputBaseField
                                            id="insuranceClaimNumber"
                                            name="insuranceClaimNumber"
                                            value={state.insuranceClaimNumber}
                                            onChange={handleChange}
                                            placeholder={"Claim #"}
                                            MaxLength="100"
                                        />
                                    </Grid>
                                </Grid>

                            </Scrollbars>
                        </Grid>
                    </div>
                    <div className={classes.footer}>
                        <Grid container direction="row" lg={12}>
                            <Grid container direction="row" alignItems="center" justify="flex-end" xs={11} sm={11} md={11} lg={11} xl={11}>
                                <div className={classes.footerRight}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={Save}> Save</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default withSnackbar(AddExpectedPaymentDialog)