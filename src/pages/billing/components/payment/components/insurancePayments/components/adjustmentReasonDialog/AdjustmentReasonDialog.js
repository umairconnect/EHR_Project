import React, { useState, useEffect } from 'react';
import {
    Grid,
    Dialog,
    Button,

} from "@material-ui/core";

import { InputBaseField, SelectField } from '../../../../../../../../components/InputField/InputField';
import { withSnackbar } from '../../../../../../../../components/Message/Alert';
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
import AddIcon from "../../../../../../../../images/icons/add-icon.png";
import DeleteIcon from "../../../../../../../../images/icons/trash.png";
import { FormBtn, DraggableComponent, FormGroupTitle, ErrorMessage } from '../../../../../../../../components/UiElements/UiElements';
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';

import { Scrollbars } from 'rc-scrollbars'
//styles
import useStyles from "./styles";
import { formatDate, formatCurrency } from '../../../../../../../../components/Common/Extensions';
function AdjustmentReasonDialog({ showHideDialog, handleClose, handleSave, ...props }) {

    const [reasonCodeOptions, setReasonCodeOptions] = useState([]);
    const { showMessage } = props;
    const classes = useStyles();
    const [errorMessages, setErrorMessages] = useState({ errorCode: false, errorname: false })

    //component state
    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({ adjAmount: "", reasonCode: "", reasonTitle: "", lstAdjustmentReasons: [] });

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        var _reasonCode = "";
        reasonCodeOptions.filter(item => item.value == value).map((item, i) => {
            _reasonCode = item.id
        });
        console.log(_reasonCode);
        setState(prevState => ({
            ...prevState,
            [name]: value,
            reasonCode: _reasonCode
        }));
    }


    const handleChangeDynamic = (e, maxLength) => {
        const { id, name, value } = e.target;
        let inputId = id.toString();
        let inputValue = value;

        if (inputValue.length <= maxLength) {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
        else {
            e.preventDefault();
        }
    }
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const addNewReason = () => {
        let hasError = false;
        if (!state.adjAmount || state.adjAmount.trim() === "" || state.adjAmount === "0") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAmount: true
            }));
            hasError = true;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAmount: false
            }));
        }

        if (!state.reasonCode && state.reasonCode.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAdjReasonCode: true
            }));
            hasError = true;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAdjReasonCode: false
            }));
        }
        var isExist = state.lstAdjustmentReasons.filter(code => code.reasonCode == state.reasonCode).length;
        if (isExist == 0) {
            if (!hasError) {
                let tAdjusted = 0.0;
                if (state.lstAdjustmentReasons != null && state.lstAdjustmentReasons.length > 0) {
                    state.lstAdjustmentReasons.map((t, i) => {
                        tAdjusted += parseFloat(t.adjAmount ? t.adjAmount : 0);
                    });
                }
                tAdjusted += parseFloat(state.adjAmount);
                if (tAdjusted > props.totalAllowAmount) {
                    showMessage("Error", "Total adjustment amount cannot be greater than " + formatCurrency(props.totalAllowAmount), "error", 3000);
                    return;
                }

                let newItem = {
                    adjustmentReasonId: 0,
                    eobPaymentId: 0,
                    adjAmount: parseFloat(state.adjAmount),
                    reasonCode: state.reasonCode,
                    reasonTitle: state.reasonTitle
                }
                let newItemsList = [...state.lstAdjustmentReasons];
                newItemsList.push(newItem);
                setState(prevState => ({
                    ...prevState,
                    ["lstAdjustmentReasons"]: newItemsList,
                    ["adjAmount"]: '',
                    ["reasonTitle"]: '',
                    ["reasonCode"]: ''
                }));
            }
        }
        else {
            showMessage("Error", "Adjustment reason(s) already added.", "error", 3000);
        }

    }

    const loadAdjustmentReasonCodeList = () => {
        var data = {
            code: "get_carc_codes",
            parameters: [""]
        }
        PostDataAPI("ddl/loadItems", data).then((result) => {
            if (result.success && result.data != null) {
                setReasonCodeOptions(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2, label: item.text2 };
                    }));
            }
        })
    }

    const onClose = () => {
        handleClose(false);
    }

    const Save = e => {
        let tAdjusted = 0.0;
        if (state.lstAdjustmentReasons != null && state.lstAdjustmentReasons.length > 0) {
            state.lstAdjustmentReasons.map((t, i) => {
                tAdjusted += parseFloat(t.adjAmount ? t.adjAmount : 0);
            });

        }
        handleSave(props.dataIndex, state.lstAdjustmentReasons, tAdjusted);
        onClose();
        //else {
        //    showMessage("Error", "Please add adjustment reason(s)", "error", 3000);
        //}

    }



    const initialization = () => {
        setState({ adjAmount: "", reasonCode: "", lstAdjustmentReasons: props.adjReasonList });

        console.log(props.adjReasonList);
        loadAdjustmentReasonCodeList();
    }
    const deleteItem = (index) => {

        const list = [...state.lstAdjustmentReasons];
        list.splice(index, 1);
        setState(prevState => ({
            ...prevState,
            ["lstAdjustmentReasons"]: list
        }))

    }

    useEffect(() => {
        initialization();

    }, []);

    return (
        <>
            <Dialog
                open={showHideDialog}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                maxWidth={"sm"}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Adj. & Reasons</FormGroupTitle>

                        </div>

                        <div className='classes.content'>
                            <Grid container direction="row" alignItems="baseline" justifyContent="flex-start" paddingRight="5px" className={classes.adjustmentReasonsFields}>

                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ paddingRight: "5px" }}>

                                    <InputBaseField
                                        id="adjAmount"
                                        name="adjAmount"
                                        MaxLength="12"
                                        type="number"
                                        onChange={e => { handleChangeDynamic(e, 12) }}
                                        value={state.adjAmount}
                                        placeholder="Enter Amount"
                                    /><br />
                                    {errorMessages.errorAmount && (!state.adjAmount || state.adjAmount.trim() == "" || state.adjAmount == "0") ? (<ErrorMessage >
                                        Please enter amount
                                    </ErrorMessage>) : ('')}

                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ padding: "5px" }}>
                                    <SelectField
                                        name="reasonTitle"
                                        value={state.reasonTitle}
                                        onChange={e => { handleChange(e) }}
                                        options={reasonCodeOptions}
                                        placeholder="Select Reason"
                                    />
                                    {errorMessages.errorAdjReasonCode && (!state.reasonCode || state.reasonCode.trim() == "") ? (<ErrorMessage >
                                        Please select adjustment reason
                                    </ErrorMessage>) : ('')}
                                </Grid>

                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2} style={{ padding: "3px" }}>

                                    <div styles={{ display: 'flex' }}>

                                        <a type='button' className={classes.AddButtonIcon} style={{

                                        }} onClick={addNewReason} >Add</a>

                                        {/* <img src={DeleteIcon} className={classes.deleteButtonIcon} /> */}

                                        {/* <img src={AddIcon} onClick={addNewReason} /> */}


                                    </div>
                                </Grid>

                            </Grid>





                            <Grid container direction="row" lg={12} xl={12}>
                                <Scrollbars style={{ minHeight: 250 }}>


                                    <table className={classes.adjustmentReasonsTable}>
                                        <thead className={classes.adjustmentReasonsTableHeader}>
                                            <th className={classes.amountTd}>Amount</th>
                                            <th className={classes.reasonCodeTd}>Reason Code</th>
                                            <th className={classes.actionTd}></th>
                                        </thead>
                                        <tbody className={classes.adjustmentReasonsTableBody}>

                                            {
                                                (state.lstAdjustmentReasons && state.lstAdjustmentReasons.length > 0) ? state.lstAdjustmentReasons.map((item, i) => {
                                                    return (
                                                        <tr>
                                                            <td><span>{numberFormat(item.adjAmount)} </span></td>
                                                            <td><span>{item.reasonTitle}</span></td>
                                                            <td><img src={DeleteIcon} onClick={() => { deleteItem(i) }} /></td>
                                                        </tr>
                                                    )
                                                }) : ''
                                            }

                                        </tbody>

                                    </table>

                                </Scrollbars>
                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <Grid container direction="row" alignItems="center" justifyContent="flex-start">

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.actionTextAlign}>
                                    {/* <div className={classes.footerRight}> */}
                                    {isSaving ?
                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                        :
                                        <FormBtn id="noIcon" onClick={Save}> Ok</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>


                                    {/* </div> */}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

            </Dialog >
        </>
    )
}

export default withSnackbar(AdjustmentReasonDialog)
