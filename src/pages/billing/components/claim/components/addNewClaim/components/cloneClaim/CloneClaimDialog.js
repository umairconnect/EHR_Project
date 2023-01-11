import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    FormHelperText,
} from "@material-ui/core"

import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
import { SelectField, InputBaseField } from "../../../../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { CheckboxField } from "../../../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../../../Services/GetUserInfo';

function CloneClaimDialog({ showHideDialog, handleClose, proCodeForNdc, ndcCode, stateNdcCode, claimSuperBillId, ...props }) {
    var classes = useStyles();
    const options = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]
    const { showMessage } = props;
    const [saveLoading, setSaveLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [assignToProviders, setAssignToProviders] = useState([]);
    const [state, setState] = useState({
        selectedclaim: claimSuperBillId, assignTo: 0, icdDx: false, procedure: false, patientVitals: false, showInCalendar: false,
        userId: userInfo.userID.toString()
    });
    const [errorMessages, setErrorMessages] = useState({ errorAssignTo: false });

    useEffect(() => {

        var params = {
            code: "all_providers",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setAssignToProviders(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 + ' ' + item.text2 };
                    }));
            }
        })

    }, [showHideDialog]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const ValidateClaimClone = (errorList) => {

        if (state.assignTo == "" || state.assignTo == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorAssignTo: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAssignTo: false
            }));
        }
    }

    const save = () => {

        let errorList = [];
        ValidateClaimClone(errorList);
        if (errorList.length < 1) {
            let method = "claim/addClaimCloneSuperBill";
            state.assignTo = state.assignTo ? parseInt(state.assignTo) : 0;
            state.selectedclaim = state.selectedclaim ? parseInt(state.selectedclaim) : 0;
            setSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setSaveLoading(false);
                if (result.success == true) {

                    if (result.success && result.data != null) {

                        //showMessage("Success", "Claim Clone saved successfully.", "success", 3000);
                        props.handleClaimCloneSave(result.data);
                    }
                }
                else
                    showMessage("Error", result.message, "error", 3000);
            })
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
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Clone Claim</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" lg={12}>
                                <Label title="Assign To" size={5} mandatory={true} />
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <SelectField
                                        id="assignTo"
                                        name="assignTo"
                                        value={state.assignTo}
                                        onChange={handleChange}
                                        options={assignToProviders}
                                        placeholder="Select Assign To"
                                    />
                                    {errorMessages.errorAssignTo && !state.assignTo ? (<FormHelperText style={{ color: "red" }} >
                                        Please select Assign To
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid container direction="row" lg={12}>
                                <Label title="Clone ICD Diagnosis" size={5} />
                                <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                    <CheckboxField
                                        color="primary"
                                        id="icdDx"
                                        name="icdDx"
                                        value={state.icdDx}
                                        onChange={handleCheckBoxChange}
                                        label="Clone ICD Diagnosis."
                                    />
                                </Grid>
                            </Grid>

                            {/*<Grid container direction="row" lg={12}>*/}
                            {/*    <Label title="Custom Procedures" size={5} />*/}
                            {/*    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>*/}
                            {/*        <CheckboxField*/}
                            {/*            color="primary"*/}
                            {/*            id="procedures"*/}
                            {/*            name="procedures"*/}
                            {/*            value={state.procedures}*/}
                            {/*            onChange={handleCheckBoxChange}*/}
                            {/*            label="Clone Custom Procedures."*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}

                            <Grid container direction="row" lg={12}>
                                <Label title="CPT/HCPCS Codes" size={5} />
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <CheckboxField
                                        color="primary"
                                        id="procedures"
                                        name="procedures"
                                        value={state.procedures}
                                        onChange={handleCheckBoxChange}
                                        label="Clone CPT/HCPCS Procedures."
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Vitals" size={5} />
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <CheckboxField
                                        color="primary"
                                        id="patientVital"
                                        name="patientVital"
                                        value={state.patientVital}
                                        onChange={handleCheckBoxChange}
                                        label="Clone Patient Vitals."
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12}>
                                <Label title="Show in Calendar" size={5} />
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <CheckboxField
                                        color="primary"
                                        id="showInCalendar"
                                        name="showInCalendar"
                                        value={state.showInCalendar}
                                        onChange={handleCheckBoxChange}
                                        label="Show clone in Calendar."
                                    />
                                </Grid>
                            </Grid>


                            <Grid container direction="row" lg={12}>
                                <Grid item xs={12} sm={5} md={5} lg={5} xl={5} />
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <div className={classes.footer}>
                                        {/* <div className={classes.footerRight}> */}
                                        {
                                            saveLoading ?

                                                <FormBtn id="loadingSave" > Clone </FormBtn> :

                                                <FormBtn id="save" onClick={save}> Clone </FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                        {/* </div> */}
                                    </div>
                                </Grid>

                            </Grid>
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
        </>
    )

}
export default withSnackbar(CloneClaimDialog)