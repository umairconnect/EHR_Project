
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    FormHelperText,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    FormLabel,
    Button
} from '@material-ui/core';
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import ThumbIcon from "../../../../../../images/icons/thumb.png";
import { FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements";
import { InputBaseField, TextareaField, CheckboxField, SelectField } from "../../../../../../components/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../components/Message/Alert'
import SearchList from "../../../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { Scrollbars } from "rc-scrollbars";


function SubmitForm({ dialogOpenClose, handleClose, labOrderData, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    let statusResult = '';
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [state, setState] = useState(props.labOrderPaymentState);

    const [isSaveCall, setIsSaveCall] = useState(false);
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    const [finalState, setFinalState] = useState({
        labOrderId: 0, patientEncounterId: null, patientId: null, locationId: null, primaryInsuranceId: null, secondaryInsuranceId: null, primaryProviderId: null,
        orderingProviderId: null, testTypeCode: "", isElab: props.imagingOrder, internalNote: "", labNote: "", billToTypeCode: "", financialGaurantor: "", recentDiagnoseId: "",
        chartNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), labId: "", recentTestName: "", recentTestID: "", recentDiagnoseName: "",
        orderSepcificDatetime: null, performTestOnSpecificDate: false, orderStatus: "Pending", vendorName: "", allOrderTest: false,

        labOrderSpecimen: [],
        labOrderTest: [],
        labOrderDiagnosis: []
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

        //console.log(props.labOrderPaymentState);
        setState(props.labOrderPaymentState);


    });

    const checkIfAlreadyExist = () => {

    }

    const SaveLabOrder = () => {
        handleDataFormat();

        // let checkDuplicate;
        // if (labOrderData?.includes(finalState?.labId)) {
        //     checkDuplicate = false;
        //     let res = labOrderData?.map((labOrder) => (
        //         labOrder?.labOrderTest?.map((test) => {
        //             if (finalState?.labOrderTest?.includes(test)) {
        //                 checkDuplicate = true;
        //             } else {
        //                 checkDuplicate = false;
        //             }
        //         })
        //     ))
        //     return checkDuplicate
        // }
        // if (checkDuplicate === false) {
        let method = "patient/labOrder/add";

        if (state.labOrderId > 0) {

            method = "patient/labOrder/update";

        }
        setIsSaveCall(true);
        setLoading({ isSaving: true });
        
        PostDataAPI(method, finalState, true).then((result) => {

            if (result.success == true) {

                if (state.labOrderId < 1) {

                    if (result.success === true && result.data != null) {

                        if (props.imagingOrder === true)
                            showMessage("Success", "Imaging Order saved successfully.", "success", 3000);
                        else
                            showMessage("Success", "Lab Order saved successfully.", "success", 3000);

                        statusResult = 'Submitted'
                        setState(result.data);
                        setIsSaveCall(false);
                        setLoading({ isSaving: false });
                        setTimeout(() => {

                            handleClose();


                        }, 1000)


                    }
                }
                else if (state.labOrderId > 0) {

                    if (result.success) {

                        if (props.imagingOrder === true)
                            showMessage("Success", "Imaging Order updated successfully.", "success", 3000);
                        else
                            showMessage("Success", "Lab Order updated successfully.", "success", 3000);
                        statusResult = 'Updated'
                        setState(result.data);
                        setIsSaveCall(false);
                        setLoading({ isSaving: false });
                        setTimeout(() => {

                            handleClose();


                        }, 1000)
                    }
                }

            }
            else {

                showMessage("Error", result.message, "error", 3000);
                setIsSaveCall(false);
                setLoading({ isSaving: false });

            }
        })
        // }
    }

    function handleDataFormat() {
        finalState.labOrderId = state.labOrderId;
        finalState.patientEncounterId = state.patientEncounterId;
        finalState.patientId = parseInt(state.patientId);

        finalState.secondaryInsuranceId = state.secondaryInsuranceId;
        finalState.primaryProviderId = state.primaryProviderId;

        finalState.locationId = state.locationId ? parseInt(state.locationId) : null;
        finalState.primaryInsuranceId = state.primaryInsuranceId;
        finalState.primaryInsuranceId = state.primaryInsuranceId ? parseInt(state.primaryInsuranceId) : null;
        finalState.secondaryInsuranceId = state.secondaryInsuranceId ? parseInt(state.secondaryInsuranceId) : null;
        finalState.primaryProviderId = state.primaryProviderId ? parseInt(state.primaryProviderId) : null;
        finalState.orderingProviderId = state.orderingProviderId ? parseInt(state.orderingProviderId) : null;
        finalState.testTypeCode = state.testTypeCode;
        finalState.isElab = state.isElab;
        finalState.internalNote = state.internalNote;
        finalState.labNote = state.labNote;
        finalState.billToTypeCode = state.billToTypeCode;
        finalState.financialGaurantor = state.financialGaurantor;
        finalState.recentDiagnoseId = state.recentDiagnoseId;
        finalState.chartNote = state.chartNote;
        finalState.isDeleted = state.isDeleted;
        finalState.createdBy = state.createdBy;
        finalState.updatedBy = state.updatedBy;
        finalState.createDate = state.createDate;
        finalState.recentTestName = state.recentTestName;
        finalState.recentTestID = state.recentTestID;
        finalState.recentDiagnoseName = state.recentDiagnoseName;
        finalState.orderSepcificDatetime = state.orderSepcificDatetime;
        finalState.performTestOnSpecificDate = state.performTestOnSpecificDate;
        finalState.orderStatus = state.orderStatus;
        finalState.vendorName = state.labId == 'Other' ? state.vendorName : "";
        finalState.allOrderTest = state.allOrderTest;
        finalState.labId = state.labId == 'Other' ? 0 : parseInt(state.labId);
        finalState.orderStatus = state.orderStatus ? state.orderStatus : 'Pending';
        finalState.labOrderSpecimen = state.labOrderSpecimen;
        finalState.labOrderTest = state.labOrderTest;
        finalState.labOrderDiagnosis = state.labOrderDiagnosis;
        finalState.labOrderSpecimen.map((item, i) => {
            item.collectionDateTime = item.collectionDateTime ? new Date(item.collectionDateTime) : null
        });

    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }


    return (
        <>
            <div className={classes.box}>
                <div className={classes.header} id="draggable-dialog-title">
                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    {/* <FormGroupTitle>Orders - Vendor Order # {state ? state.labOrderId ? state.labOrderId : state.labId : null}</FormGroupTitle> */}
                    <FormGroupTitle>{props.imagingOrder ? "Image Order" : "Lab Order"}  {state ? state.labOrderId > 0 ? ` # ${state.labOrderId}` : "" : null}</FormGroupTitle>
                </div>

                
                <Scrollbars autoHeight autoHeightMax={600}>
                    <div className={classes.content}>
                        <Grid container >

                            <Grid lg={12} container direction="row">
                                <Grid container xs={3} sm={3} md={3} lg={3} >
                                    <FormLabel className={classes.formLabel}><b>Current Status:</b> {state.orderStatus ? state.orderStatus : "Pending"}</FormLabel>
                                </Grid>
                                <Grid container xs={5} sm={5} md={5} lg={5} >
                                    <FormLabel className={classes.submitLabel}>{statusResult}</FormLabel>
                                    {statusResult == 'Submitted' ?
                                        <span className={classes.thumbIcon} title="Delete"><img src={ThumbIcon} alt="delete" /></span>
                                        : null}
                                </Grid>
                                <Grid container justify="flex-start" xs={4} sm={4} md={4} lg={4} >
                                    {/*<FormLabel className={classes.historyLabel} title="History">View Order History</FormLabel>*/}
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container xs={9} sm={9} md={9} lg={9} >
                                    <FormLabel className={classes.formLabel}><b>Lab: </b>{state.vendorName}</FormLabel>
                                </Grid>
                                <Grid container xs={3} sm={3} md={3} lg={3} >
                                    <FormLabel className={classes.labelInput}></FormLabel>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid container xs={6} sm={12} md={6} lg={6} >
                                    <FormLabel className={classes.formLabelBold}>{props.imagingOrder ? "Studies Ordered and Diagnosis:" : "Tests Ordered and Diagnosis:"}</FormLabel>
                                </Grid>
                                <Grid container xs={12} sm={12} md={12} lg={12} >
                                    <div className={classes.testOrder}>

                                        <ul className={classes.orderList}>
                                            {
                                                state.labOrderTest ?
                                                    state.labOrderTest.map((item, k) => (
                                                        item.isDeleted == false ?
                                                            <li key={item.labTestId} >
                                                                <sapn style={{ fontwight:700 }}>{item.testName}</sapn>
                                                                {state.labOrderDiagnosis ?
                                                                    state.labOrderDiagnosis.map((item2, k) => (
                                                                        item.labTestId == item2.labTestId ?
                                                                            <div key={k}>
                                                                                {item2.icdCode} - {item2.diagnosis}
                                                                            </div> : ""
                                                                    ))
                                                                    : null}
                                                            </li>
                                                            : null
                                                    ))

                                                    : null
                                            }

                                        </ul>

                                    </div>
                                </Grid>
                            </Grid>

                            {/*<Grid lg={12} container direction="row">*/}
                            {/*    <Grid container xs={12} sm={12} md={12} lg={12} >*/}
                            {/*        <FormLabel className={classes.formLabelBold}>{props.imagingOrder ? "Diagnosis for all study in this order" : "Diagnosis for all test in this order"}:</FormLabel>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid container xs={12} sm={12} md={12} lg={12} >*/}
                            {/*        <div className={classes.testOrder}>*/}
                            {/*            <ul className={classes.orderList}>*/}
                            {/*                {*/}
                            {/*                    state.uniqueOrderDiagnosis ?*/}
                            {/*                        state.uniqueOrderDiagnosis.map((item, k) => (*/}

                            {/*                            <li key={k}>*/}
                            {/*                                {item.icdCode} - {item.diagnosis}*/}
                            {/*                            </li>*/}
                            {/*                        ))*/}
                            {/*                        : null*/}
                            {/*                }*/}
                            {/*            </ul>*/}

                            {/*        </div>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </div>
                </Scrollbars>
                <div className={classes.footer}>
                    <div className={classes.footerRight}>
                        {/* <FormBtn id={"reset"} size="medium" onClick={handleClose}>Cancel</FormBtn> */}
                        {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> :
                            <FormBtn id="save" size="medium" onClick={SaveLabOrder} > Finish </FormBtn>}

                        {state.labOrderId != 0 ?
                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                            : null
                        }
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </div>
                </div>
            </div>
            <LogDialog
                code="laborder"
                id={state.labOrderId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
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

    );
}
export default withSnackbar(SubmitForm)