import React, { useRef, useState } from "react";
//material ui 
import { Grid, Button, Collapse } from "@material-ui/core";
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
//custom components
import { Label, FormGroupTitle, FormBtn } from "../../../../../../components/UiElements/UiElements";
import { InputBaseField, InputBaseAdornmentField, CheckboxField } from "../../../../../../components/InputField/InputField";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import SearchList from "../../../../../../components/SearchList/SearchList";
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
//styles
import useStyles from "./styles";
import EraReviewDialog from "./components/eraReviewDialog/EraReviewDialog";
import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { printReport } from '../../../../../../components/Common/Extensions';
import { IsEditable } from "../../../../../../Services/GetUserRolesRights";

function ElectronicRemittanceAdviceReview(props) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    let history = useHistory();

    const [isCollapse, setIsCollapse] = useState(true);

    const [isUpdate, setIsUpdate] = useState(false);

    const [showHideEraReviewDialog, setShowHideEraReviewDialog] = useState(false);

    const [state, setState] = useState({});

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    //To Show Action Dialog
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSearcdhListPatientChange = (name, item) => {
        const { id, value } = item;
        if (name == 'patientId') {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));

        }
        else if (name == 'payerCode') {
            setState(prevState => ({
                ...prevState,
                payerCode: value == '' ? '' : id,
                payerName: value
            }));
        }
        else if (name == 'payerTraceNo') {
            setState(prevState => ({
                ...prevState,
                payerTraceNo: value == '' ? '' : id,
                // providerName: value
            }));
        }
        // setState(prevState => ({
        //     ...prevState,
        //     [name]: value == '' ? '' : id
        // }))
    }
    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const update = () => setIsUpdate(!isUpdate);
    const handleEraReviewDialogClose = () => {
        setShowHideEraReviewDialog(false);
        update();
    }

    const handleEdit = (idToEdit) => {

    }
    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the payment?", "confirm", function () {
        })
    }
    const handlePrint = (item) => {
        var reportUrl = "%2freports%2fbilling%2ffinancial_era_print&rs:Command=Render&rc:Parameters=false";
        var _batchId = "&batch_id=" + item.batchId;
        var _parameters = _batchId;
        printReport(reportUrl, _parameters);
    }

    const [searchParams, setSearchParams] = useState(["", "", "", "", "", "", "", ""]);
    const reloadGrid = () => {

        setSearchParams([state.payerCode,
        state.payerTraceNo,
        state.eraFrom,
        state.eraTo,
        state.checkAmount,
        state.checkDate,
        '' + (state.includeAppliedChecks ? state.includeAppliedChecks : false),
        state.tcnCode]);
        update();
    }
    const clearValues = () => {
        setState({
            eraFrom: '', eraTo: '', patientId: 0, patientName: '', payerCode: 0, payerName: '', payerTraceNo: 0, checkDate: '', checkAmount: '', includeAppliedChecks: false
        })
        reloadGrid();
    }
    const [selectedRowData, setSelectedRowData] = useState({});
    const handleRowClick = (record) => {
        if (record.isApplied) {
            history.push(`/app/eraresult/id=` + record.batchId);
        }
        else {
            setSelectedRowData(record);
            setShowHideEraReviewDialog(true);
        }
        // history.push('/app/batchinsurancepayment/id=' + record.eobId);
    }
    const fetchERA = (userPhoto) => {
        let formData = new FormData();
        formData.append("formFile", userPhoto);
        //formData.append("scannedEobPath", attachment.file);
        PostDataAPI("claims/fetchERA", formData, true, 'formData').then((result) => {
            if (result.success === true) {
                //if (result.data) {
                showMessage("Success", "ERA fetched successfully.", "success", 3000);
                update();
                //window.open("." + result.data, '_blank');
                //download(result.data);
                //}
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        });
    }
    const inputFile = useRef(null);
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    function handleFileUpload(e) {
        fetchERA(e.target.files[0]);
    }
    return (
        <>
            <PageTitle title="ERA Review" />

            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} alignItems="center" alignContent="center" direction="row">

                    <span className={classes.searchSpan}>

                        <FormGroupTitle>Search</FormGroupTitle>
                        <Button
                            size="small"
                            className={classes.collapseBtn}
                            onClick={() => setIsCollapse(!isCollapse)}
                        >
                            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                        </Button>

                    </span>
                </Grid>

                <Collapse in={isCollapse}>

                    <Grid container direction="row">

                        <Grid container className={classes.customGrid} direction="row">

                            <Label title="ERA From" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <InputBaseField
                                    type="date"
                                    id="eraFrom"
                                    name="eraFrom"
                                    value={state.eraFrom}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Label title="ERA To" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <InputBaseField
                                    type="date"
                                    id="eraTo"
                                    name="eraTo"
                                    value={state.eraTo}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">

                            <Label title="Patient" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="patientId"
                                    name="patientId"
                                    value={state.patientId}
                                    searchTerm={state.patientName}
                                    code="patient_Search"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                    placeholderTitle="Patient Name"
                                />
                            </Grid>

                            <Label title="Payer" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="payerCode"
                                    name="payerCode"
                                    value={state.payerCode}
                                    searchTerm={state.payerName}
                                    code="get_payer"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                    placeholderTitle="Payer Name"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">

                            <Label title="Trace #" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="payerTraceNo"
                                    name="payerTraceNo"
                                    value={state.payerTraceNo}
                                    searchTerm={state.payerTraceNo}
                                    code="get_payment_trace_nos"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                    placeholderTitle="########"
                                />
                            </Grid>

                            <Label title="TCN #" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="tcnCode"
                                    name="tcnCode"
                                    value={state.tcnCode}
                                    searchTerm={state.tcnCode}
                                    code="get_tcn"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                    placeholderTitle="#######"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">

                            <Label title="Check Date" size={2} />

                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <InputBaseField
                                    type="date"
                                    id="checkDate"
                                    name="checkDate"
                                    value={state.checkDate}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Label title="Check Amount" size={2} />

                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <InputBaseAdornmentField
                                    id="checkAmount"
                                    name="checkAmount"
                                    value={state.checkAmount}
                                    onChange={handleChange}
                                    startadornment={<>$</>}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">

                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <CheckboxField
                                    color="primary"
                                    name="includeAppliedChecks"
                                    checked={state.includeAppliedChecks}
                                    onChange={handleCheckBoxChange}
                                    label="Include Applied Checks"
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} lg={5} xl={5} >
                                <Grid container justify="flex-end">
                                    <FormBtn id="save" onClick={reloadGrid} btnType="search">Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearValues} btnType="search">Clear</FormBtn>
                                    <form>
                                        <div>
                                            <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".txt" />
                                        </div>
                                    </form>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                    </Grid>

                </Collapse>
            </div >
            <div className={classes.gridArea}>
                <div className={classes.gridButtonsArea}>
                    <Button className={classes.gridButton} onClick={handleSelectFile} style={{ marginRight: '20px' }} disabled={!isEditable}>
                        Import ERA</Button>

                </div>

                <EditAbleGrid
                    apiUrl="billingbatchint/loadGrid"
                    dataId={searchParams}
                    isUpdate={isUpdate}
                    pageSize={5}
                    // isSelection={true}
                    // dataId={searchParams}
                    columnCode="ERAReviewColumns"
                    //onAddNew={handleAddNew}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPrint={handlePrint}
                    onView={(records) => handleRowClick(records)}

                // apiUrl="billingbatchint/loadGrid"
                />

            </div>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            {showHideEraReviewDialog ?
                <EraReviewDialog showHideDialog={showHideEraReviewDialog} handleClose={handleEraReviewDialogClose} eraData={selectedRowData} />
                : null}
        </>
    )
}

export default withSnackbar(ElectronicRemittanceAdviceReview)
