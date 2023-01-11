import React, { useState, useEffect } from "react";
//material ui
import {
    Dialog,
    Grid,
    FormLabel,
    Typography
} from "@material-ui/core";
//icons,images
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"

//custom components
import { DraggableComponent, FormBtn, Label } from "../../../../../../../../components/UiElements/UiElements";
import { CheckboxField, InputBaseField } from "../../../../../../../../components/InputField/InputField";

import { withSnackbar } from "../../../../../../../../components/Message/Alert"
//styles
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { formatDate, formatCurrency } from '../../../../../../../../components/Common/Extensions';
import { Link } from "react-router-dom";

function EraReviewDialogDialog({ showHideDialog, handleClose, ...props }) {
    let history = useHistory();
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(props.eraData);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClick = (e, record) => {
        history.push(`/app/eraresult/id=` + state.batchId);
    };
    const markApplied = e => {

        let method = "billingbatchint/markApplied";
        const obj = { batchId: state.batchId };
        PostDataAPI(method, obj, true).then((result) => {

            if (result.success == true) {
                //if (!isUpdate) {
                /*if (result.success && result.data != null) {*/
                showMessage("Success", "Record saved successfully.", "success", 2000);
                handleClose();
                //}
                //}
                //else {
                //    if (result.success) {
                //        showMessage("Success", "Record updated successfully.", "success", 2000);
                //        //setState(result.data);
                //        //handleSave(result.data);
                //        //handleClose();
                //    }
                //}
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    };
    useEffect(() => {
        console.log(formatDate(props.eraData.checkDate));
        if (props.eraData.checkDate)
            props.eraData.checkDate = props.eraData.checkDate.split('T')[0];
        if (props.eraData.scannedEobPath && props.eraData.scannedEobPath == 'null')
            props.eraData.scannedEobPath = '';
        setState(props.eraData);
    }, [showHideDialog])
    return (
        <Dialog
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            open={showHideDialog}
            {...props}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>

                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <FormLabel className={classes.title}>{state.scannedEobPath != 'null' ? state.scannedEobPath : ""}</FormLabel>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>

                        <Grid container direction="row">
                            <div className={classes.inputArea}>

                                <Grid container direction="row">
                                    {/* <Grid item xs={1} sm={1} md={1} lg={1} xl={1} /> */}
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <CheckboxField
                                            id="isApplied"
                                            name="isApplied"
                                            value={state.isApplied}
                                            onChange={handleCheckboxChange}
                                            label="Applied"
                                            IsDisabled={props.eraData.isApplied}
                                            checked={state.isApplied}
                                            color={"primary"}
                                        />
                                    </Grid>
                                </Grid>
                                {state.isApplied ? '' :
                                    <>
                                        <Grid container direction="row">
                                            <Label title="Check Date" size={3} />
                                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                                <InputBaseField
                                                    type="date"
                                                    id="checkDate"
                                                    name="checkDate"
                                                    value={state.checkDate}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>}
                            </div>

                            <div className={classes.informationArea}>
                                {state.isApplied ? '' :
                                    <>
                                        <span style={{ displa: "flex" }}>
                                            <FormLabel className={classes.boldLabel}>Check #:</FormLabel>
                                            <Typography className={classes.labelValue}>{state.payerTraceNo}</Typography>
                                        </span>
                                        <span style={{ displa: "flex" }}>
                                            <FormLabel className={classes.boldLabel}>Amount:</FormLabel>
                                            <Typography className={classes.labelValue}>$ {formatCurrency(state.totalPaid)}</Typography>
                                        </span>
                                        <span style={{ displa: "flex" }}>
                                            <FormLabel className={classes.boldLabel}>Payments:</FormLabel>
                                            <Typography className={classes.labelValue}>1</Typography>
                                        </span>
                                    </>}
                            </div>

                        </Grid>

                    </div>
                    <div className={classes.footer}>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <FormBtn id="save" onClick={markApplied} disabled={!state.isApplied || props.eraData.isApplied}>Save</FormBtn>
                                <Link to={{
                                    pathname: `/app/eraresult/id=${state.batchId}`,
                                    state: state.checkDate
                                }}>
                                    <FormBtn id="save" disabled={state.isApplied}>

                                        Review
                                    </FormBtn>
                                </Link>
                            </Grid>
                            {/*<Button className={classes.saveBtn} >Don’t Submit</Button>*/}
                            {/* </div> */}
                        </Grid>

                    </div>

                </div>

            </div>

        </Dialog >
    )
}
export default withSnackbar(EraReviewDialogDialog)