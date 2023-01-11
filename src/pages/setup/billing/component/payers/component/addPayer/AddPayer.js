import React, { useState, useEffect } from "react";
import {
    Grid,
    InputBase,
    FormLabel,
    Button,
    CircularProgress
} from '@material-ui/core';
import useStyles from "./styles";
import { InputBaseField, InputPaymentField, TextareaField, SelectField } from "../../../../../../../components/InputField";
import SearchList from "../../../../../../../components/SearchList/SearchList";
import { FooterBtn, FormGroupTitle, FormBtn, Label, ShadowBoxMin, ErrorMessage } from "../../../../../../../components/UiElements";
import { CountryListOptions, } from "../../../../../../../context/StaticDropDowns";
import { USAStateListOptions, } from "../../../../../../../context/StaticDropDowns";
import { withSnackbar } from "../../../../../../../components/Message/Alert";
import { ActionDialog } from "../../../../../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../../Services/GetDataAPI';
import LogDialog from "../../../../../../../components/LogDialog/LogDialog";
import RefreshIcon from '@material-ui/icons/Refresh';

const StatusOptions = [
    {
        value: true,
        label: "Active",
    },
    {
        value: false,
        label: "In Active",
    },
];


function AddPayer({ callbackFn, updateGrid, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);

    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [pullRunning, setPullLoading] = useState(false);

    const defaultAttributes = {
        payerId: 0, payerName: "", payerCode: "", planName: "", planTypeCode: "", planOption: "",
        planCode: "", copayAmount: "0", address: "", country: "", city: "", state: "", zip: "",
        note: "", isActive: "", isDeleted: false
    }
    const [payer, setPayer] = useState(defaultAttributes);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const [errorMessages, setErrorMessages] = useState({ errorPayerName: false, errorPayerStatus: false, errorChartID: false, errorLastName: false, errorFirstName: false, errorDOB: false, errorEmail: false, DOBrange: false, errorPhoneLength: false, errorCellLength: false })
    const [planTypes, setPlanTypes] = useState([]);
    const getPlanTypeDataList = e => {
        var params = {
            code: "get_payer_plan_types",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPlanTypes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }

    useEffect(() => {
        getPlanTypeDataList();
        if (dataId > 0) {
            loadPayer();
        }
        else {
            setPayer(defaultAttributes)
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setPayer(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleCopayChange = e => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
        const { name, value } = e.target;
        setPayer(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleBoolChange = e => {
        const { name, value } = e.target;
        setPayer(prevState => ({
            ...prevState,
            [name]: value == 'true'
        }));

    };

    const handleZipChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

                        const { name, value } = e.target;
                        setPayer(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                setPayer(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };

    const Save = e => {
        let errorList = [];

        ValidatePayer(errorList);
        if (errorList.length < 1) {

            let method = "payer/add";
            if (dataId.dataId ? dataId.dataId : dataId > 0)
                method = "payer/update";

            payer.copayAmount = parseFloat(payer.copayAmount ? payer.copayAmount : 0);
            setSaveLoading(true);
            PostDataAPI(method, payer, true).then((result) => {
                setSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    if (dataId < 1) {
                        if (result.success && result.data != null) {

                            setPayer(result.data);
                            showMessage("Success", "Payer saved successfully.", "success", 2000);
                            setDataId({
                                dataId: result.data.payerId
                            });
                            props.getChangePage(false);
                        }
                    }
                    else if (dataId > 0 || dataId != "") {
                        if (result.success) {
                            showMessage("Success", "Payer updated successfully.", "success", 3000);
                            props.getChangePage(false);
                        }
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };

    function loadPayer() {
        PostDataAPI("payer/get", dataId.dataId ? dataId.dataId : dataId).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                setPayer(result.data);
            }
        })

    }

    const backButton = () => {
        document.getElementById("btnIdGetPayers").click();
    }
    const handleCheckedChange = e => {
        const { name, checked } = e.target;
        setPayer(prevState => ({
            ...prevState,
            [name]: !checked
        }));
    }
    const ClearFormValues = () => {
        if (dataId > 0 || dataId != "") {
            loadPayer();
        }
        else {
            setPayer(defaultAttributes);
        }
    }

    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }

    const handlePayerChange = (name, item, code) => {

        const { id, value } = item;
        setPayer(prevState => ({
            ...prevState,
            [code]: id,
            [name]: value,
            ['planCode']: '',
            ['planName']: ''
        }));

    }
    const handleSearchListChange = (name, item, code) => {

        const { id, value } = item;
        setPayer(prevState => ({
            ...prevState,
            [code]: id,
            [name]: value
        }));

    }
    function ValidatePayer(errorList) {
        if (!payer.payerName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerName: false
            }));
        }
        if (!payer.isActive || payer.isActive == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerStatus: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPayerStatus: false
            }));
        }

    }
    function DeletePayer() {

        let method = "payer/delete";
        setDeleteLoading(true);
        PostDataAPI(method, payer, true).then((result) => {
            setDeleteLoading(false);
            if (result.success == true) {
                showMessage("Success", "Payer deleted successfully.", "success", 3000);
                updateGrid();
                setTimeout(() => { BackToPayer(); }, 2000);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    function PullPayer() {

        let method = "payerpull/pull";
        setPullLoading(true);
        PostDataAPI(method, {}, true).then((result) => {
            setPullLoading(false);
            if (result.success == true) {
                showMessage("Success", "Payers list refreshed successfully.", "success", 3000);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    function BackToPayer() {
        document.getElementById("btnIdGetPayers").click();

    }
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    return (
        <>
            <ShadowBoxMin shadowSize={3}>
                <form id="payer-form" className={classes.formAlignment}>
                    <Grid container >
                        <FormGroupTitle>Insurance Info</FormGroupTitle>
                        <Grid item lg={12} container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Payer Name" mandatory={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SearchList
                                        id="payerName"
                                        name="payerName"
                                        elemCode="payerCode"
                                        value={payer.payerCode}
                                        searchTerm={payer.payerName}
                                        code="get_payers_from_staging"
                                        apiUrl="ddl/loadItems"
                                        isUser={false}
                                        isDisabled={payer.payerId > 0 ? true : false}
                                        onChangeValue={(name, item, elemCode) => handlePayerChange(name, item, elemCode)}
                                        placeholderTitle="Payer Name"
                                    />
                                    {errorMessages.errorPayerName && !payer.payerName ? (<ErrorMessage >
                                        Please select payer name
                                    </ErrorMessage>) : ('')}
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    {
                                        pullRunning == false ?
                                            <Button
                                                startIcon={<RefreshIcon />}
                                                className={classes.refBtn}
                                                onClick={() => {
                                                    PullPayer();
                                                }}>
                                                Refresh
                                            </Button>
                                            :
                                            <Button
                                                startIcon={<CircularProgress className={classes.circularProgressBar} size={20} />}
                                                className={classes.refBtn}
                                            >
                                                Refreshing
                                            </Button>
                                    }


                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Plan Name" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    {payer.payerCode != '' ?
                                        <SearchList
                                            id="planName"
                                            name="planName"
                                            elemCode="planCode"
                                            value={payer.planCode}
                                            searchTerm={payer.planName}
                                            searchId={payer.payerCode}
                                            code="get_plans_by_payer_from_staging"
                                            apiUrl="ddl/loadItems"
                                            onChangeValue={(name, item, elemCode) => handleSearchListChange(name, item, elemCode)}
                                            placeholderTitle="Plan Name"
                                        />
                                        :
                                        <InputBaseField
                                            id="planName"
                                            name="planName"
                                            IsDisabled={true}
                                            onChange={handleChange}
                                        />}
                                </Grid>
                                <Label title="Plan Code" size={2} />

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        id="planCode"
                                        name="planCode"
                                        value={payer.planCode}
                                        placeholder=""
                                        onChange={handleChange}
                                        IsDisabled={true}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Grid item lg={12}
                                container
                                direction="row"
                            >
                                <Label title="Plan Type" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <SelectField
                                        id="planTypeCode"
                                        name="planTypeCode"
                                        value={payer.planTypeCode}
                                        placeholder="Select Plan Type"
                                        onChange={handleChange}
                                        options={planTypes} />
                                </Grid>

                                <Label title="Copay Amount" size={2} />

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputPaymentField
                                        id="copayAmount"
                                        name="copayAmount"
                                        placeholder="$0.00"
                                        value={payer.copayAmount}
                                        onChange={handleCopayChange}
                                        MaxLength={15}

                                    />
                                </Grid>

                            </Grid>


                        </Grid>

                        <Grid item lg={12} container direction="row">
                            <Grid item lg={12}
                                container
                                direction="row">
                                <Label title="Plan Option" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    {/*<SelectField*/}
                                    {/*    id="planOption"*/}
                                    {/*    name="planOption"*/}
                                    {/*    value={payer.planOption}*/}
                                    {/*    placeholder="Select Plan Option"*/}
                                    {/*    onChange={handleChange}*/}
                                    {/*    options={planTypes} />*/}
                                    <InputBase
                                        className={classes.baseInput}
                                        placeholder="Plan Option"
                                        onChange={handleChange}
                                        name="planOption"
                                        value={payer.planOption ? payer.planOption : ''}
                                        inputProps={{ maxLength: 250 }}
                                    />

                                </Grid>

                                <Label title="City" size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBase
                                        className={classes.baseInput}
                                        placeholder="City"
                                        onChange={handleChange}
                                        name="city"
                                        value={payer.city ? payer.city : ''}
                                        inputProps={{ maxLength: 250 }}
                                    />

                                </Grid>
                            </Grid>


                        </Grid>

                        <Grid item lg={12} container direction="row">

                            <Grid item lg={12} container direction="row">
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                                    <Label title="Address" size={4} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <TextareaField
                                            // className={classes.baseInput}
                                            rowsMin={5}
                                            placeholder="Address"
                                            onChange={handleChange}
                                            name="address"
                                            value={payer.address}
                                            MaxLength="500"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                                    <Grid item xs={12} sm={2} md={2} lg={2} container direction="row" className={classes.labelAlign}>
                                        <FormLabel className={classes.stateLableInput}>State:</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <SelectField
                                            id="state"
                                            name="state"
                                            value={payer.state}
                                            onChange={handleChange}
                                            placeholder="Select State"
                                            options={USAStateListOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2} md={2} lg={4} ></Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2} container direction="row" className={classes.labelAlign}>
                                        <FormLabel className={classes.stateLableInput}>Country:</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <SelectField
                                            id="country"
                                            name="country"
                                            value={payer.country}
                                            onChange={handleChange}
                                            options={CountryListOptions}
                                        />
                                    </Grid>


                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Grid item lg={12}
                                    container
                                    direction="row"
                                >
                                    <Label title="Zip" size={2} />

                                    <Grid item xs={12} sm={4} md={4} lg={3} >

                                        <InputBaseField
                                            placeholder="12345"
                                            onChange={handleZipChange}
                                            name="zip"
                                            value={payer.zip}
                                            MaxLength="5"
                                        />
                                    </Grid>

                                    <Label title="Status" size={2} mandatory={true} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <SelectField
                                            id="isActive"
                                            name="isActive"
                                            value={payer.isActive}
                                            onChange={handleBoolChange}
                                            options={StatusOptions}
                                            placeholder="Select Status"
                                        />
                                        {errorMessages.errorPayerStatus && !payer.isActive ? (<ErrorMessage >
                                            Please select payer name
                                        </ErrorMessage>) : ('')}
                                    </Grid>

                                </Grid>


                            </Grid>

                            <Grid item lg={12} container direction="row"
                            >
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                                    <Label title="Notes" size={4} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={6} >
                                        <TextareaField
                                            // className={classes.baseInput}
                                            rowsMin={5}
                                            placeholder="Notes"
                                            onChange={handleChange}
                                            name="note"
                                            value={payer.note}
                                            MaxLength="3000"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>



                                </Grid>
                            </Grid>


                            <Grid item lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={10} md={10} lg={10} >

                                    <FooterBtn className={classes.footerBtn}>
                                        {saveLoading ?
                                            <FormBtn id={"loadingSave"} size="medium">Save</FormBtn> :
                                            <FormBtn id={"save"} onClick={Save} size="medium" disabled={!props.isEditable}>Save</FormBtn>
                                        }
                                        {
                                            //dataId > 0 ? console.log( classes.deleteBtn):"2"
                                            payer.payerId > 0 ?
                                                deleteLoading ?
                                                    <FormBtn id="delete" size="medium">Delete</FormBtn> :
                                                    <FormBtn id="delete" onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete the payer?", "confirm")} size="medium" disabled={!props.isEditable}>Delete</FormBtn>
                                                : null
                                        }
                                        <FormBtn id={"resetBtn"} onClick={ClearFormValues} size="medium" >Reset </FormBtn>
                                        {payer.payerId > 0 ?
                                            <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                            : null
                                        }
                                    </FooterBtn>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </form>
            </ShadowBoxMin>
            <LogDialog
                code="payer"
                id={payer.payerId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { DeletePayer() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    );
}
export default withSnackbar(AddPayer)
