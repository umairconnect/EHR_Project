import React, { useState, useEffect } from "react"

import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import AddIcon from '../../../../../../images/icons/add-icon.png';
//import CheckIcon from '../../../../../../images/icons/check.png';
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    DialogTitle,
    Chip
} from "@material-ui/core"
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { InputBaseField, TextareaField, SelectField } from "../../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";

function ManualResultForm({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const dropDownOptions = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" }
    ]
    const [state, setState] = useState({});
    const [testchip, setTestChip] = useState([
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" }]
    );
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleDelete = (chiptoDelete) => () => {
        //Update Chipdata by removing items
        const updatedchipvalues = testchip.filter((item) => item.value !== chiptoDelete);
        setTestChip(updatedchipvalues);
    };

    useEffect(() => {

        if (dialogOpenClose) {

        }
    }, [dialogOpenClose]);

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
                open={dialogOpenClose}
                {...props} >
                <DialogTitle id="draggable-dialog-title">
                    <Grid lg={12} container direction="row">

                        <Grid item xs={11} sm={11} md={11} lg={11}
                            container
                            direction="row"
                        >
                            <FormGroupTitle>Result</FormGroupTitle>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} >
                            <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogcontent}
                >
                    <Grid container >

                        <Grid lg={12} container direction="row">

                            <Label title="Lab" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField
                                    placeholder="Select Lab"
                                    disableUnderline
                                    value={state.lab}
                                    onChange={handleChange}
                                    name="lab"
                                    options={dropDownOptions}
                                />
                            </Grid>

                            <Label title="Assigned Provider" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField
                                    placeholder="Select Assigned Provider"
                                    disableUnderline
                                    value={state.assignedProvider}
                                    onChange={handleChange}
                                    name="assignedProvider"
                                    options={dropDownOptions}
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Order" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="number"
                                    value={state.orderNumber}
                                    onChange={handleChange}
                                    name="orderNumber"
                                    IsDisabled={true}
                                />
                            </Grid>

                            <Label title="Accession" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="number"
                                    value={state.accessionNumber}
                                    onChange={handleChange}
                                    name="accessionNumber"
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Collected date" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="datetime-local"
                                    value={state.collectedDate}
                                    onChange={handleChange}
                                    name="collectedDate"
                                />
                            </Grid>

                            <Label title="Report date" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="datetime-local"
                                    value={state.reportDate}
                                    onChange={handleChange}
                                    name="reportDate"
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Result date" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="datetime-local"
                                    value={state.resultDate}
                                    onChange={handleChange}
                                    name="resultDate"
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Comments" size={2} isTextAreaInput={true} />
                            <Grid item xs={12} sm={10} md={10} lg={8} >
                                <TextareaField
                                    rowsMin={5}
                                    placeholder="Comments"
                                    onChange={handleChange}
                                    name="comments"
                                    value={state.comments}
                                    MaxLength="2000"
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Upload Documents" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    type="file"
                                    onChange={handleChange}
                                    name="uploadDocuments"
                                    value={state.uploadDocuments}
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <FormGroupTitle>Tests</FormGroupTitle>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Label title="Add a Test" size={2} />
                            <Grid item xs={12} sm={8} md={8} lg={6} >

                                <SearchList name="rxnorm" value={state.rxnorm} searchTerm={state.drugName} code="drugs"
                                    apiUrl="ddl/loadItems" placeholderTitle="Search Drug" />

                            </Grid>
                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Grid container xs={12} sm={2} md={2} lg={2} direction="row">
                                <FormLabel className={classes.lableInput}></FormLabel>
                            </Grid>
                            <Grid container alignItems="flex-start" xs={12} sm={4} md={4} lg={3} >
                                {
                                    testchip.map((item, i) => {
                                        return (
                                            <Chip
                                                size="small"
                                                key={item.value}
                                                label={item.label}
                                                onDelete={handleDelete(item.value)}
                                                className={classes.chip}
                                            />
                                        )
                                    })
                                }
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <FormGroupTitle>Observation</FormGroupTitle>

                        </Grid>

                        <Grid lg={12} container direction="row">

                            <table className={classes.observationTable} >
                                <thead className={classes.observationTableHead}>
                                    <tr>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Observation</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Result</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Unit</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Flag</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Result date</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Status</td>
                                        <td colspan="1" className={classes.observationTableHeadLabel}>Signed</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >
                                            <InputBaseField
                                                name="observation"
                                                placeholder="Observation"
                                                value={state.observation}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td >
                                            <InputBaseField
                                                name="result"
                                                placeholder="Result"
                                                value={state.result}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td >
                                            <InputBaseField
                                                type="number"
                                                name="unit"
                                                placeholder="Unit"
                                                value={state.unit}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td >
                                            <InputBaseField
                                                name="flag"
                                                placeholder="Flag"
                                                value={state.flag}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td >
                                            <InputBaseField
                                                type="datetime-local"
                                                name="resultDate"
                                                value={state.resultDate}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td >
                                            <SelectField
                                                placeholder="Status"
                                                disableUnderline
                                                value={state.status}
                                                onChange={handleChange}
                                                name="status"
                                                options={dropDownOptions}
                                            />
                                        </td>
                                        <td >
                                            <img className={classes.checkIcon} src={CloseIcon} alt="add" />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="7">
                                            <Grid lg={12} container direction="row">

                                                <Label title="Comments" size={2} isTextAreaInput={true} />
                                                <Grid item xs={12} sm={10} md={10} lg={8} >
                                                    <TextareaField
                                                        rowsMin={5}
                                                        placeholder="Comments"
                                                        onChange={handleChange}
                                                        name="comments"
                                                        value={state.comments}
                                                        MaxLength="2000"
                                                    />
                                                </Grid>

                                            </Grid>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="7">
                                            <Grid lg={12} container direction="row">

                                                <Label title="Provider Comments" size={2} isTextAreaInput={true} />
                                                <Grid item xs={12} sm={10} md={10} lg={8} >
                                                    <TextareaField
                                                        rowsMin={5}
                                                        placeholder="Provider Comments"
                                                        onChange={handleChange}
                                                        name="providerComments"
                                                        value={state.providerComments}
                                                        MaxLength="2000"
                                                    />
                                                </Grid>

                                            </Grid>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="1"></td>
                                        <td colSpan="6">
                                            <FormLabel className={classes.diagnosesRecordLabel}>Diagnoses Record</FormLabel>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </Grid>

                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <span className={classes.addIconSpan} >Add New Observation</span>
                            <span title="Add"><img className={classes.addIcon} src={AddIcon} alt="add" /></span>
                        </Grid>

                        <Grid lg={12} container direction="row">

                            <Grid container alignItems="flex-start" justify="flex-end" xs={12} sm={2} md={2} lg={2}
                                direction="row"
                                className={classes.labelAlignBtn}
                            >
                                <FormLabel className={classes.lableInput}></FormLabel>
                            </Grid>

                            <Grid container alignItems="flex-end" justify="flex-end" xs={12} sm={10} md={10} lg={10} >
                                <FormBtn id={"save"} size="medium">Save</FormBtn>
                            </Grid>

                        </Grid>

                    </Grid>

                </DialogContent>
            </Dialog>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                //onSubmit={deleteRecord}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}
export default withSnackbar(ManualResultForm)