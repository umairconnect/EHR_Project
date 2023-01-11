import React, { useState, useRef } from "react";

import {
    Grid,
    FormLabel,
    IconButton
} from "@material-ui/core";
import { AttachFile } from '@material-ui/icons';

import { InputBaseField, RadioboxField, InputPaymentField, TextareaField } from "../../../../../../../../../components/InputField/InputField";
import { FormBtn, FormGroupTitle, Label } from "../../../../../../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../../../../../../components/Message/Alert";

import useStyles from "./styles";
function PatientStatementAdditionalSettings(props) {
    const addressOptions = [
        {
            value: "Practice",
            label: "Practice",
        },
        {
            value: "Facility",
            label: "Facility",
        },
        {
            value: "Custom",
            label: "Custom",
        },
    ];
    const classes = useStyles();
    const inputFile = useRef(null);

    const [state, setState] = useState({});
    const [attachment, setAttachment] = useState({ file: null, userFileName: null });

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


    };
    const handleSelectFile = () => {
        inputFile.current.click();
    };
    function handleFileUpload(e) {

        setAttachment({ file: e.target.files[0] ? e.target.files[0] : null, userFileName: e.target.files[0] ? e.target.files[0].name : null });
        // e.target.value = "";
    }
    return (
        <div className={classes.additionalSettingsArea}>
            <Grid container direction="row">

                <FormGroupTitle>Practice Setup</FormGroupTitle>

                <Grid container direction="row">

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.addressArea}>

                        <Grid container direction="row">
                            <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                                <FormLabel className={classes.customFormTitle}>Pay to Address:</FormLabel>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <RadioboxField
                                    id="payAddressStatus"
                                    name="payAddressStatus"
                                    value={state.payAddressStatus}
                                    labelPlacement="end"
                                    options={addressOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={3} title="Facility" />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <InputBaseField
                                    id="payAddressFacility"
                                    name="payAddressFacility"
                                    value={state.payAddressFacility}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={3} title="Address" isTextAreaInput={true} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <TextareaField
                                    id="payAddress"
                                    name="payAddress"
                                    value={state.payAddress}
                                    onChange={handleChange}
                                    placeholderTitle=""
                                    rowsMin={4}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label title="City" size={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="payAddressCity"
                                            name="payAddressCity"
                                            // placeholder="city"
                                            value={state.payAddressCity}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                        <FormLabel className={classes.cityLableInput} > Zip
                                            <span className={classes.mandatorColor}></span>:
                                        </FormLabel>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="payAddressZip"
                                            name="payAddressZip"
                                            value={state.payAddressZip}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label title="State" size={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="payAddressState"
                                            name="payAddressState"
                                            // placeholder="state"
                                            value={state.payAddressState}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                        <FormLabel className={classes.cityLableInput} > Country
                                            <span className={classes.mandatorColor}></span>:
                                        </FormLabel>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="payAddressCountry"
                                            name="payAddressCountry"
                                            value={state.payAddressCountry}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.addressArea}>

                        <Grid container direction="row">
                            <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                                <FormLabel className={classes.customFormTitle}>Return to Address:</FormLabel>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <RadioboxField
                                    id="returnAddressStatus"
                                    name="returnAddressStatus"
                                    value={state.returnAddressStatus}
                                    labelPlacement="end"
                                    options={addressOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={3} title="Facility" />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <InputBaseField
                                    id="returnAddressFacility"
                                    name="returnAddressFacility"
                                    value={state.returnAddressFacility}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label size={3} title="Address" isTextAreaInput={true} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <TextareaField
                                    id="returnAddress"
                                    name="returnAddress"
                                    value={state.returnAddress}
                                    onChange={handleChange}
                                    placeholderTitle=""
                                    rowsMin={4}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label title="City" size={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="returnAddressCity"
                                            name="returnAddressCity"
                                            // placeholder="city"
                                            value={state.returnAddressCity}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                        <FormLabel className={classes.cityLableInput} > Zip
                                            <span className={classes.mandatorColor}></span>:
                                        </FormLabel>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="returnAddressZip"
                                            name="returnAddressZip"
                                            value={state.returnAddressZip}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row">
                            <Label title="State" size={3} />
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="returnAddressState"
                                            name="returnAddressState"
                                            // placeholder="state"
                                            value={state.returnAddressState}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.labelAlign}>
                                        <FormLabel className={classes.cityLableInput} > Country
                                            <span className={classes.mandatorColor}></span>:
                                        </FormLabel>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <InputBaseField
                                            id="returnAddressCountry"
                                            name="returnAddressCountry"
                                            value={state.returnAddressCountry}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
                <div className={classes.innerContainer} >

                    <Grid container direction="row">
                        <Label title="Minimum Balance" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            <InputPaymentField
                                id="minimumBalance"
                                name="minimumBalance"
                                value={state.minimumBalance}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Label title="Statement Days" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            <InputBaseField
                                id="statementDays"
                                name="statementDays"
                                value={state.statementDays}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Label title="Due Days" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            <InputBaseField
                                id="dueDays"
                                name="dueDays"
                                value={state.dueDays}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Label title="Max Statements" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            <InputBaseField
                                id="maxStatements"
                                name="maxStatements"
                                value={state.maxStatements}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Label title="Statement Message" size={2} isTextAreaInput={true} />
                        <Grid item xs={12} sm={10} md={10} lg={8} xl={8}>
                            <TextareaField
                                id="statementMessage"
                                name="statementMessage"
                                placeholder="Reason Of Visit"
                                onChange={handleChange}
                                value={state.statementMessage}
                                MaxLength="2000"
                                rowsMin={5}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Label title="Due Days" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            < InputBaseField
                                id="feeSourceExcelFile"
                                name="feeSourceExcelFile"
                                value={attachment.userFileName}
                                onChange={handleChange}
                                IsDisabled={true}
                                placeholder={"Choose a file"}
                                endAdornment={
                                    <IconButton
                                        className={classes.attachmentBtn}
                                        color="primary"
                                        onClick={handleSelectFile}>
                                        <AttachFile />
                                    </IconButton>
                                }
                            />
                            <form>
                                <div>
                                    <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".xlsx,.xls,.xlsm" />
                                </div>
                            </form>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                            <FormBtn id={"save"}>Save</FormBtn>
                            <FormBtn id="reset">Cancel</FormBtn>
                        </Grid>

                    </Grid>

                </div>


            </Grid>

        </div >
    )
}

export default withSnackbar(PatientStatementAdditionalSettings)