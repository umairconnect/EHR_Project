import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    FormHelperText
} from "@material-ui/core"

import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
import { SelectField, InputBaseField } from "../../../../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';

function AddNdcCode({ showHideDialog, handleClose, proCodeForNdc, ndcCode, stateNdcCode, ndcCodeName, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);
    const [medicationUnitCodes, setMedicationUnitCodes] = useState([]);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const [errorMessages, setErrorMessages] = useState({
        errorNDCCode: false, errorQuantity: false, errorUnits: false
    });

    useEffect(() => {

        clearValues();
   
        if (stateNdcCode)
            setState(stateNdcCode);


        var params = {
            code: "DDL_List_Item",
            parameters: ['medication_unit_code']
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _medicationUnitCode = [];

                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'medication_unit_code':
                            _medicationUnitCode.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });

                setMedicationUnitCodes(_medicationUnitCode);
            }

        })

    }, [showHideDialog, proCodeForNdc]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangeDecimal = e => {

        const { name, value } = e.target;
        var amount = value;
        var patt = new RegExp("[A-Za-z]");
        var res = patt.test(amount);
        if (res)
            amount = amount.replace(/[^\d.-]/g, '');

        if (!(/^[-+]?\d*\.?\d*$/.test(amount))) {
            setState(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
        else {
            //var lastChar = amount.substring(amount.length - 1);
            //if (lastChar == ".") amount = amount + "0";

            if (amount.length > 10)
                amount = parseFloat(amount).toFixed(2);

            setState(prevState => ({
                ...prevState,
                [name]: parseFloat(amount)
            }));
        }

    };
    const save = () => {

        let errorList = [];
        ValidateNdc(errorList);
    
        if (errorList.length < 1) {
            state.code = state.code ? state.code : proCodeForNdc;
            props.handleSave(state);
            clearValues();
        }
    };

    const clearValues = () => {

        setState([]);
    }

    const ValidateNdc = (errorList) => {

        if (state.ndcCode == "" || state.ndcCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorNDCCode: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNDCCode: false
            }));
        }

        if (state.quantity == "" || state.quantity == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorQuantity: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorQuantity: false
            }));
        }

        if (state.unitCode == "" || state.unitCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorUnits: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorUnits: false
            }));
        }

    }
    const handleSearcdhListPatientChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            ndcCode: id,
            ndcCodeName: value
        }));


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
                            <FormGroupTitle>Add NDC code</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" lg={12}>
                                <Label title="NDC Code" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                                    <SearchList
                                        id="ndcCode"
                                        name="ndcCode"
                                        value={state.ndcCode ? state.ndcCode : null}
                                        searchTerm={state.ndcCodeName ? state.ndcCodeName : null}
                                        code="get_ndc_code"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                        placeholderTitle="NDC Code"
                                    />
                                    {errorMessages.errorNDCCode && !state.ndcCode ? (<FormHelperText style={{ color: "red" }} >
                                        Please select ndc code
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid container direction="row" lg={12}>
                                <Label title="Quantity" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={4} xl={4}>
                                    <InputBaseField
                                        id="quantity"
                                        name="quantity"
                                        value={state.quantity}
                                        onChange={handleChangeDecimal}
                                        placeholder="Quantity"
                                        MaxLength='5'
                                        MinValue={0}
                                        MaxValue={1000}
                                    />
                                    {errorMessages.errorQuantity && !state.quantity ? (<FormHelperText style={{ color: "red", whiteSpace: "nowrap" }} >
                                        Please enter quantity
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid container direction="row" lg={12}>
                                <Label title="Units" size={4} mandatory={true} />
                                <Grid item xs={12} sm={8} md={8} lg={5} xl={5}>
                                    <SelectField
                                        id="unitCode"
                                        name="unitCode"
                                        value={state.unitCode}
                                        onChange={handleChange}
                                        options={medicationUnitCodes}
                                        placeholder="Select Units"
                                    />
                                    {errorMessages.errorUnits && !state.unitCode ? (<FormHelperText style={{ color: "red" }} >
                                        Please select unit
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" lg={12} jus>
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                    <div className={classes.footer}>
                                        <div className={classes.footerRight}>
                                            <FormBtn id="save" onClick={save} > Save </FormBtn>
                                            <FormBtn id="reset" onClick={handleClose}>Close </FormBtn>
                                        </div>
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
export default withSnackbar(AddNdcCode)