import React, { useState, useEffect } from "react";

import {
    Dialog,
    FormLabel,
    Grid
} from "@material-ui/core"
//custom components
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
//images and icons
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
//
import { StateListOptions } from "../../../../../../../../context/StaticDropDowns";
//styles
import useStyles from "./styles";
import { SelectField } from "../../../../../../../../components/InputField/InputField";
import Scrollbars from "rc-scrollbars";
import { formatDate, formatCurrency } from '../../../../../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
function FindChargeDialog({ showHideDialog, handleClose, eraData, handleFindChargeApplication, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    const [state, setState] = useState(eraData);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const [cptList, setCptList] = useState([]);
    const getCPTList = e => {

        PostDataAPI("billingbatchint/getCPTbyClaim", state.claimSuperbillId).then((result) => {
            if (result.success && result.data != null) {
                setCptList(
                    result.data.map((item, i) => {
                        return { value: item.proc, label: item.cptDetail };
                    }));
            }
        });
    }
    const Save = e => {
        state.proc = state.cptCode;
        PostDataAPI("billingbatchint/updatePayment", state, true).then((result) => {
            if (result.success == true) {
                if (result.success) {
                    showMessage("Success", "Record updated successfully.", "success", 2000);
                    handleFindChargeApplication(e);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    };
    useEffect(() => {
        getCPTList()
    }, []);
    return (

        <Dialog
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}>
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton}><img src={CloseIcon} onClick={handleClose} /></span>
                        <FormGroupTitle>Find Charge</FormGroupTitle>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars style={{ minHeight: 350 }}>
                            <Grid container direction="row">

                                {/*<Grid container direction="row">*/}
                                {/*    <Label title="Search" size={2} />*/}
                                {/*    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>*/}

                                {/*        <SelectField*/}
                                {/*            id="cptCode"*/}
                                {/*            name="cptCode"*/}
                                {/*            value={state.cptCode}*/}
                                {/*            onChange={handleChange}*/}
                                {/*            label="Select Search"*/}
                                {/*            options={StateListOptions}*/}
                                {/*            placeholder= "Select Charge"*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*</Grid>*/}

                                <Grid container direction="row" style={{ paddingLeft: "42px" }}>

                                    <FormGroupTitle>Charge Details from ERA</FormGroupTitle>

                                    <div className={classes.chargeDetailsArea}>

                                        <div>
                                            <FormLabel className={classes.labelTitle}>CPT</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Billed:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Unit:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Allowed:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Paid:</FormLabel>
                                        </div>
                                        <div>

                                            <FormLabel className={classes.labelValue}>{state.proc}</FormLabel>
                                            <FormLabel className={classes.labelValue}>${formatCurrency(state.amount)}</FormLabel>
                                            <FormLabel className={classes.labelValue}>--</FormLabel>
                                            <FormLabel className={classes.labelValue}>${formatCurrency(state.allowedAmount)}</FormLabel>
                                            <FormLabel className={classes.labelValue}>${formatCurrency(state.paidAmount)}</FormLabel>
                                        </div>
                                        <div>
                                            <FormLabel className={classes.labelTitle}>Remarks:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Adjustment:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Adj Reason:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Unpaid:</FormLabel>
                                            <FormLabel className={classes.labelTitle}>Unpaid Reason:</FormLabel>
                                        </div>
                                        <div>

                                            <FormLabel className={classes.labelValue}>{state.remarksCode}</FormLabel>
                                            <FormLabel className={classes.labelValue}>${formatCurrency(state.adjustedAmount)}</FormLabel>
                                            <FormLabel className={classes.labelValue}>{state.adjReasonCode}</FormLabel>
                                            <FormLabel className={classes.labelValue}>${formatCurrency(state.unpaidAmount)}</FormLabel>
                                            <FormLabel className={classes.labelValue}>{state.unpaidReasonCode}</FormLabel>
                                        </div>
                                    </div>

                                    <FormGroupTitle>Select the charge that best matches the ERA Details</FormGroupTitle>

                                    <Grid container direction="row">
                                        <Label title="Selected Charge" size={3} />
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                                            <SelectField
                                                id="cptCode"
                                                name="cptCode"
                                                value={state.cptCode}
                                                onChange={handleChange}
                                                label="Select Search"
                                                options={cptList}
                                                placeholder="Select Charge"
                                            />
                                        </Grid>
                                    </Grid>
                                    <div className={classes.selectedChargeInfoAlignment}>
                                        <Grid container direction="row">
                                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                                <FormLabel className={classes.labelTitle}>Unit:</FormLabel>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                                <FormLabel className={classes.labelValue}>1</FormLabel>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row">
                                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                                <FormLabel className={classes.labelTitle}>Total Inits Paid:</FormLabel>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                                <FormLabel className={classes.labelValue}>1</FormLabel>
                                            </Grid>
                                        </Grid>
                                    </div>

                                </Grid>


                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <FormBtn id="save" onClick={Save}>Save</FormBtn>
                            <FormBtn id="reset" onClick={handleClose}>Cancel</FormBtn>
                        </div>
                    </div>

                </div>
            </div>

        </Dialog>
    )
}

export default withSnackbar(FindChargeDialog)