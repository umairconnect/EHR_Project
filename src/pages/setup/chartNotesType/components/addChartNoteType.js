
import React, { useState, useEffect, useRef } from "react";

import {
    Grid,
    FormHelperText,
    Dialog,
} from '@material-ui/core';
import CloseIcon from "../../../../images/icons/math-plus.png"
import { DraggableComponent, FormGroupTitle, Label, FormBtn } from "../../../../components/UiElements";
import useStyles from "./styles";
import { InputBaseField, SelectField, CheckboxField } from "../../../../components/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'

function AddChartNoteType({ openchartNoteDialog, closechartNoteDialog, handleSaveResponse, handleDelete, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({ errorChartNoteType: false, errorChartNoteFormat:false })
    const [state, setState] = useState({ chartNoteTypeId: 0, type: '', chartNoteFormatCode: '', isDefault: false,isActive:true});

   
    const selectformat = [
        { label: "Detailed", value: "Detailed" },
        { label: "SOAP", value: "SOAP" }
    ]

    const handleChange = e => {

        const { name, value } = e.target;
        if (value.trim() === "" && value !== "") {
            return;
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckedChange = (e) => {
        
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const onDelete = () => {
        handleDelete(state);
    }

    const onSave = () => {
        
        let errorList = []
        if (state.type == undefined || state.type == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNoteType: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNoteType: false
            }));
        }
        if (state.chartNoteFormatCode == undefined || state.chartNoteFormatCode == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNoteFormat: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNoteFormat: false
            }));
        }

        if (errorList.length < 1) {
            setIsLoading(true);
            var method = "chartnotetype/add";
            if (state.chartNoteTypeId > 0) {
                var method = "chartnotetype/update";
            }
            PostDataAPI(method, state, true).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    var message = "Chart note saved successfully.";
                    if (state.chartNoteTypeId > 0) {
                        message = "Chart note updated successfully.";
                    }
                    handleSaveResponse(message);
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        }

    }

    useEffect(() => {
        if (props.chartNoteId != undefined && props.chartNoteId > 0) {
            
            setIsLoading(true);
            PostDataAPI("chartnotetype/get", props.chartNoteId).then((result) => {
                setIsLoading(false);
                
                if (result.success) {
                    setState(result.data);
                } else {

                }
            });
        }
    }, []);

    return (
        <>
            <Dialog
                disableEscapeKeyDown
                open={openchartNoteDialog}
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                onClose={closechartNoteDialog}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>

                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle> {props.chartNoteId > 0?"Edit Note Type":"Add New Note Type" }</FormGroupTitle>
                            <span className={classes.crossButton} onClick={closechartNoteDialog}><img src={CloseIcon} /></span>
                        </div>

                        <div className={classes.content}>
                            <Grid container direction="row">
                                <Label title="Name" size={3} mandatory={true} />
                                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                    <InputBaseField
                                        id="type"
                                        name="type"
                                        onChange={handleChange}
                                        placeholder="Chart Note Name"
                                        value={state.type}
                                        MaxLength={30}
                                    />
                                    {errorMessages.errorChartNoteType && !state.type ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter chart note name
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label title="Format" size={3} mandatory={true} />
                                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                                    <SelectField
                                        options={selectformat}
                                        id= "chartNoteFormatCode"
                                        name="chartNoteFormatCode"
                                        value={state.chartNoteFormatCode}
                                        placeholder="Select Format"
                                        onChange={handleChange}
                                    />
                                    {errorMessages.errorChartNoteFormat && !state.chartNoteFormatCode ? (<FormHelperText style={{ color: "red" }} >
                                        Please select chart note format
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                    <CheckboxField
                                        color="primary"
                                        id="isDefault"
                                        name="isDefault"
                                        label="Default"
                                        checked={state.isDefault}
                                        onChange={handleCheckedChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <CheckboxField
                                        color="primary"
                                        id="isActive"
                                        name="isActive"
                                        label="Active"
                                        checked={state.isActive}
                                        onChange={handleCheckedChange}
                                    />
                                </Grid>
                            </Grid>

                            <div className={classes.footer}>
                                <Grid container direction="row">
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", alignItems: "center", justifyContent: "end" }} >

                                        <FormBtn id="save" disabled={ !props.isEditable} onClick={onSave}>Save</FormBtn>
                                        {props.chartNoteId > 0 ? <FormBtn id="delete" disabled={!props.isEditable} onClick={onDelete}>Delete</FormBtn>:''}
                                        <FormBtn id="reset" onClick={closechartNoteDialog}> Cancel </FormBtn>
                                    </Grid>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </div>

            </Dialog>
        </>
    )

}


export default withSnackbar(AddChartNoteType);