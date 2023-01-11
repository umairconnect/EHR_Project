import React, { useState, useEffect } from "react";

import {
    Grid,
    Dialog,
    FormHelperText
} from "@material-ui/core";

//Custom imports
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
import { TextareaField, InputBaseField } from "../../../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import useStyles from './styles';

function AddCodeDialog({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ cui: "", lui: "", sui: "", auti: "", sab: "CPT", code: props.customValue, str: "", category:"Custom" });
    const [errorMessages, setErrorMessages] = useState({ errorCode: false, errorStr: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const save = () => {

        let errorList = [];
        ValidateCustomSearch(errorList);


        if (errorList.length < 1) {

            PostDataAPI("feeschedule/ddCustomCPT", state, true).then((result) => {

                if (result.success == true) {

                    if (result.success && result.data != null) {

                        if (result.data)
                        showMessage("Success", "Custom procedure saved successfully.", "success", 3000);
                        props.handleSaveCustom(state);
                        handleClose();
                        clearfilter();
                    }
                }
            })
        }
    }
    const ValidateCustomSearch = (errorList) => {


        if (state.code == "" || state.code == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorCode: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCode: false
            }));
        }

        if (state.str == "" || state.str == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorStr: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStr: false
            }));
        }

    }
    const clearfilter = () => {

        setState({ cui: "", lui: "", sui: "", auti: "", sab: "CPT", code: props.customValue, str: "", category: "Custom" });

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
                            <FormGroupTitle>Add Code</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>

                            <Grid container>
                                <Grid container direction="row">
                                    <Label title="Code" size={3} mandatory={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <InputBaseField
                                            id="code"
                                            name="code"
                                            value={state.code}
                                            onChange={handleChange}
                                            placeholder="Code"
                                        />
                                        {errorMessages.errorCode && !state.code ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter code
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                    <Label title="Description" size={3} isTextAreaInput={true} mandatory={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            id="str"
                                            name="str"
                                            value={state.str}
                                            placeholder="Description"
                                            rowsMin={5}
                                            onChange={handleChange}
                                            MaxLength="2000"
                                        />
                                        {errorMessages.errorStr && !state.str ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter description
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" justify="flex-start" lg={12}>
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <div className={classes.footer}>
                                            {/* <div className={classes.footerRight}> */}
                                            <FormBtn id="save" onClick={save} > Save </FormBtn>
                                            <FormBtn id="reset" onClick={handleClose}>Close </FormBtn>
                                            {/* </div> */}
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </div>

                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default withSnackbar(AddCodeDialog)