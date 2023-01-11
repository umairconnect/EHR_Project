import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Grid,
    FormLabel,
} from "@material-ui/core";
import { DraggableComponent, FormBtn } from "../../../../../../components/UiElements/UiElements"
import useStyles from './styles'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

export const SignForm = ({ title, message, type, actiondialogOpenClose, onClose, onSubmit, onCancel, isUpdate, handleUpdateGrid, ...props }) => {

    var classes = useStyles();
    const { showMessage } = props;

    const [dataId] = useState(props.dataId);
    const [id] = useState(props.docId);
    const [documentType] = useState(props.docType);
    const [signFormInfo, setSignFormInfo] = useState(props.signFormData);
    let SignFormAData;

    useEffect(() => {
    }, [isUpdate])

    if (props.signFormData[0])
        SignFormAData = props.signFormData[0];

    const handleSubmit = () => {

        SignedToPatientDocument();

    };
    const handleClose = () => {
        onCancel(false);
    };


    const SignedToPatientDocument = () => {
        PostDataAPI("patient/document/get", parseInt(props.docId)).then((result) => {
            if (result.success && result.data != null) {

                let dataSet = result.data;
                var method = "patient/document/update";

                const formData = new FormData();
                dataSet.documentStatusCode = "Signed";
                for (var key in dataSet) {
                    if (dataSet[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                        formData.append(key, dataSet[key]);
                }

                PostDataAPI(method, formData, true, "formData").then((result) => {
                    if (result.success && result.data != null) {
                        handleUpdateGrid();
                        onCancel(false);
                    }
                })

            }
            else if (!result.message) {
                console.log(result.message);
                //showMessage("Error", result.message, "error", 3000);
            }
        });
    }



    return (
        <>
            <Dialog open={actiondialogOpenClose}
                PaperComponent={DraggableComponent}
                // classes={{ paper: classes.dialogPaper }}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown  {...props}>
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    <ErrorOutlineIcon className={classes.UpdateIcon} />
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText className={classes.dialogMessage}>
                        {message}
                    </DialogContentText>
                    <Grid container item lg={12}>
                        <Grid container item direction="row" xs={12} sm={12} md={12} lg={12}>
                            {SignFormAData ? <Grid item container justify="flex-end" xs={12} sm={4} md={4} lg={3} >
                                <FormLabel className={classes.formLabelTitle}>Patient Name:</FormLabel>
                            </Grid> : null}
                            <Grid item container direction="column" xs={12} sm={8} md={8} lg={5} >
                                {SignFormAData ? <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <FormLabel className={classes.lableInput}>{SignFormAData ? SignFormAData.patientName : null}</FormLabel>
                                </Grid> : null}
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <FormLabel className={classes.lableInput}>{SignFormAData && SignFormAData.gender != null ? SignFormAData.gender + " | " : ""}  {SignFormAData && SignFormAData.ageYears != null ? SignFormAData.ageYears + " years | " : ""}   {SignFormAData && SignFormAData.dob != null ? SignFormAData.dob : ""}</FormLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                        {SignFormAData ? <Grid className={classes.customGrid} container item direction="row" xs={12} sm={12} md={12} lg={12}>
                            <Grid container item justify="flex-end" xs={12} sm={4} md={4} lg={3}>
                                <FormLabel className={classes.formLabelTitle}>Document:</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={5} >
                                <Grid container justify="flex-start" >
                                    <FormLabel className={classes.lableInput}>{SignFormAData ? SignFormAData.docName : null}</FormLabel>
                                </Grid>
                            </Grid>
                        </Grid> : null}
                        <Grid container item justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12}>
                            <Grid container xs={12} sm={12} md={12} lg={12} >
                                <FormLabel className={classes.message}>This will finalize the  above document as a legal document and as part of patient’s chart. if a patient is assigned to it.</FormLabel>
                            </Grid>
                        </Grid>
                        <Grid container item justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12}>
                            <Grid container justify="center">
                                <FormLabel className={classes.warningMessage}>This action is not reversible.</FormLabel>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogactions}>
                    <FormBtn id="reset" onClick={handleClose}>
                        Cancel
                    </FormBtn>
                    <FormBtn id="save" btnType="signDocument" onClick={handleSubmit}>
                        Sign Document
                    </FormBtn>

                </DialogActions>
            </Dialog>
        </>
    )
}
