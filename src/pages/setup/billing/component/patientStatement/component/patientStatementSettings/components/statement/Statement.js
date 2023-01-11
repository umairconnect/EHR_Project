import React, { useState } from "react";

import {
    Grid,
} from "@material-ui/core";

import ViewIcon from "../../../../../../../../../images/icons/view.png"
import { InputBaseField, RadioboxField, SelectField } from "../../../../../../../../../components/InputField/InputField";
import { FormBtn, FormGroupTitle, Label } from "../../../../../../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../../../../../../components/Message/Alert";

import useStyles from "./styles";
function Statement(props) {
    const statementMode = [
        {
            value: "Electronic",
            label: "Electronic",
        },
        {
            value: "Printed",
            label: "Printed",
        },
    ];
    const createStatement = [
        {
            value: "Manual",
            label: "Manual",
        },
        {
            value: "Auto",
            label: "Auto",
        }
    ];
    const letterOptions = [
        {
            value: "Template",
            label: "Template",
        },
        {
            value: "Custom",
            label: "Custom",
        }
    ];
    const classes = useStyles();

    const [state, setState] = useState({});

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
       
    };

    return (
        <div className={classes.statementArea}>
            <Grid container >

                <FormGroupTitle>Statement Setup</FormGroupTitle>

                <Grid container direction="row">
                    <Label size={2} title="Statement Mode" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="benefitOrderCode"
                            name="benefitOrderCode"
                            value={state.benefitOrderCode}
                            labelPlacement="end"
                            options={statementMode}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Label size={2} title="Create Statement" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="benefitOrderCode"
                            name="benefitOrderCode"
                            value={state.benefitOrderCode}
                            labelPlacement="end"
                            options={createStatement}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Label size={2} title="Card Type" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <SelectField
                            id="cardType"
                            name="cardType"
                            value={state.cardType}
                            options={statementMode}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* <Label size={2} title="Create Statement" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="benefitOrderCode"
                            name="benefitOrderCode"
                            value={state.benefitOrderCode}
                            labelPlacement="end"
                            options={createStatement}
                            onChange={handleChange}
                        />
                    </Grid> */}
                </Grid>

                <FormGroupTitle>Letter Setup</FormGroupTitle>

                <Grid container direction="row">
                    <Label size={2} title="Reminder Letter" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="reminderLetter"
                            name="reminderLetter"
                            value={state.reminderLetter}
                            labelPlacement="end"
                            options={letterOptions}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                        <InputBaseField
                            id="reminderLetterValue"
                            name="reminderLetterValue"
                            value={state.reminderLetterValue}
                            labelPlacement="end"
                            options={createStatement}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <img src={ViewIcon} alt="view" className={classes.viewImage} />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Label size={2} title="Debt Letter" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="debtLetter"
                            name="debtLetter"
                            value={state.debtLetter}
                            labelPlacement="end"
                            options={letterOptions}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                        <InputBaseField
                            id="debtLetterValue"
                            name="debtLetterValue"
                            value={state.debtLetterValue}
                            labelPlacement="end"
                            options={createStatement}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <img src={ViewIcon} alt="view" className={classes.viewImage} />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Label size={2} title="Final Notice" />
                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                        <RadioboxField
                            id="finalNotice"
                            name="finalNotice"
                            value={state.finalNotice}
                            labelPlacement="end"
                            options={letterOptions}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                        <InputBaseField
                            id="finalNoticeValue"
                            name="finalNoticeValue"
                            value={state.finalNoticeValue}
                            labelPlacement="end"
                            options={createStatement}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <img src={ViewIcon} alt="view" className={classes.viewImage} />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                    <FormBtn id="save">Save</FormBtn>
                    <FormBtn id="reset">Cancel</FormBtn>
                </Grid>

            </Grid>
        </div>
    )
}

export default withSnackbar(Statement)