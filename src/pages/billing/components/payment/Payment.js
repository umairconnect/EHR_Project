import React, { useState, useEffect } from "react";
//material ui
import {
    Collapse,
    Grid,
    Button,
    FormLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
//icons
import {
    AddCircleOutline as AddCircleOutlineIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Filter
}
    from '@material-ui/icons';
// components
import PageTitle from "../../../../components/PageTitle";
import { Label, FormBtn, ShadowBox, ShadowBoxMin, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { InputBaseField, SelectField } from "../../../../components/InputField/InputField";
import SearchList from "../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid"
//static List
import { AccountStatusOptions } from '../../../../context/StaticDropDowns';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert';
import { IsEditable } from '../../../../Services/GetUserRolesRights';
// styles
import useStyles from "./styles";
import "./styles.css";
import { useHistory } from "react-router-dom";
function Payment(props) {
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const classes = useStyles();
    const history = useHistory();
    const optBalance = [
        { value: "=", label: "=" },
        { value: ">=", label: ">=" },
        { value: "<=", label: "<=" },
        { value: ">", label: ">" },
        { value: "<", label: "<" },
    ]
    const optPaymentFrom = [
        { value: "all", label: "All" },
        { value: "insurance", label: "Insurance" },
        { value: "patient", label: "Patient" },
    ]
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }
    const defaultAttributes = {
        paymentFrom: 'all',
        payerName: '',
        payerCode: '',
        checkNo: '',
        locationName: '',
        locationId: '',
        postedByName: '',
        postedBy: '',
        facilityName: '',
        batchNo: '',
        batchName: '',
        patientName: '',
        patientId: '',
        paymentDateFrom: addDays(new Date(), -31).toString(),
        paymentDateTo: addDays(new Date(), 0).toString(),
        balance: '',
        paymentType: '',
        status: '',
        balDecision: ''
    };
    const [state, setState] = useState(defaultAttributes);

    const [showSearchFilter, setshowSearchFilter] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
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
    };

    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {
                        const { name, value } = e.target;
                        setState(prevState => ({
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
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };
    //functions
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;
        if (name == "locationId") {
            setState(prevState => ({
                ...prevState,
                locationId: value == '' ? '' : id,
                locationName: value
            }));
        }
        else if (name == "postedBy") {
            setState(prevState => ({
                ...prevState,
                postedBy: value == '' ? '' : id,
                postedByName: value
            }));
        }
        else if (name == "batchNo") {
            setState(prevState => ({
                ...prevState,
                batchNo: value == '' ? '' : id,
                batchName: value
            }));
        }
        else if (name == "patientId") {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));
        }
    }
    const update = () => setIsUpdate(!isUpdate);
    const handleEdit = (idToEdit) => {

    }
    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "All applied payment will be reversed. Are you sure, you want to delete the payment?", "confirm", function () {
            let method = "eob/delete";

            PostDataAPI(method, {
                eobId: idToDelete
            }, true).then((result) => {
                //setDeleteLoading(false);
                if (result.success == true) {
                    showMessage("Success", "Payment deleted successfully.", "success", 3000);
                    reloadGrid();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    //setDialogOpenClose(false);
                }

            })
        });
    }
    const [paymentMethods, setPaymentMethods] = useState([]);
    const getPaymentMethodsDataList = e => {
        var params = {
            code: "get_eob_payment_methods",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPaymentMethods(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }

    useEffect(() => {
        getPaymentMethodsDataList();
    }, []);
    const handleRowClick = (record) => {

        if (record.paymentCategoryCode == 'patient') {
            let data = `${record.eobId}/${record.patientId}`;
            history.push(`/app/patientpayment/id=${data}`);
        }
        else
            history.push('/app/batchinsurancepayment/id=' + record.eobId);
    }
    const [searchParams, setSearchParams] = useState(defaultAttributes);
    const handlePayerChange = (name, item, val) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: value == '' ? '' : id.toString(),
            [val]: value,

        }));
    }
    const reloadGrid = () => {

        setSearchParams(state);

        if (state.paymentDateFrom > state.paymentDateTo) {
            showMessage("Error", "Recieved From date cannot be greater than to date", "error", 3000);
            return;
        }
        update();
    }
    const clearFilters = () => {
        setSearchParams(defaultAttributes);
        setState(defaultAttributes);
        update();
        // reloadGrid();
    }
    return (
        <>
            <PageTitle title="Payment" />
            <div style={{ margin: "0px 10px" }}>
                <ShadowBox shadowSize={3} className={classes.shadowBox}>

                    <div className={classes.searchArea}>
                        <Grid container className={classes.customGrid} alignItems="center" alignContent="center" direction="row">

                            <span className={classes.searchSpan}>

                                <FormGroupTitle>Search Filters</FormGroupTitle>
                                <Button
                                    size="small"
                                    className={classes.collapseBtn}
                                    onClick={() => setshowSearchFilter(!showSearchFilter)}
                                >
                                    {showSearchFilter ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                                </Button>

                            </span>
                        </Grid>

                        <Collapse in={showSearchFilter}>

                            <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Payment From" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SelectField
                                        id="paymentFrom"
                                        name="paymentFrom"
                                        value={state.paymentFrom}
                                        onChange={handleChange}
                                        placeholder="Select Payment From"
                                        options={optPaymentFrom}
                                    />
                                </Grid>
                                <Label title="Insurance" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SearchList
                                        id="payerCode"
                                        name="payerCode"
                                        value={state.payerCode}
                                        elemCode="payerName"
                                        searchTerm={state.payerName}
                                        code="get_payer"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item, elemCode) => handlePayerChange(name, item, elemCode)}
                                        placeholderTitle="Search Insurance"
                                    />
                                </Grid>


                            </Grid>

                            <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Location" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SearchList
                                        id="locationId"
                                        name="locationId"
                                        value={state.locationId}
                                        searchTerm={state.locationName}
                                        code="get_all_active_locations"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        placeholderTitle="Search Location"
                                        isUser={true}
                                    />
                                </Grid>

                                <Label title="Patient" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SearchList
                                        id="patientId"
                                        name="patientId"
                                        value={state.patientId}
                                        searchTerm={state.patientName}
                                        code="patient_Search"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        placeholderTitle="Search Patient"
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Posted by" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SearchList
                                        id="postedBy"
                                        name="postedBy"
                                        value={state.postedBy}
                                        searchTerm={state.postedByName}
                                        code="get_staff_users"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        placeholderTitle="Posted by"
                                    />

                                </Grid>
                                <Label title="Batch #" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SearchList
                                        id="batchNo"
                                        name="batchNo"
                                        value={state.batchNo}
                                        searchTerm={state.batchName}
                                        code="get_payment_batches"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        placeholderTitle="Batch #"
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Received Date" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12}>
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <input
                                                type="date"
                                                name="paymentDateFrom"
                                                value={state.paymentDateFrom}
                                                id={state.paymentDateFrom}
                                                onChange={handleChange}
                                                className={classes.dateInput}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                            <Label title="To" size={12} />
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <input
                                                type="date"
                                                name="paymentDateTo"
                                                value={state.paymentDateTo}
                                                id={state.paymentDateTo}
                                                onChange={handleChange}
                                                className={classes.dateInput}
                                            />
                                        </Grid>

                                    </Grid>

                                </Grid>


                                <Label title="Check #" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <InputBaseField
                                        id="checkNo"
                                        name="checkNo"
                                        value={state.checkNo}
                                        placeholder="#####"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {/* <Label title="Balance" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12}>
                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                            <SelectField
                                                id="balDecision"
                                                name="balDecision"
                                                value={state.balDecision}
                                                options={optBalance}
                                                onChange={handleChange}
                                                placeholder="Select"
                                            />
                                        </Grid>
                                        <Grid item xs={1} sm={1} md={1} lg={1} />
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            <InputBaseField
                                                id="balance"
                                                name="balance"
                                                value={state.balance}
                                                onChange={(e) => { handleNumberChange(e, 8) }}
                                            />
                                        </Grid>

                                    </Grid>

                                </Grid> */}


                            </Grid>

                            <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Type" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SelectField
                                        id="paymentType"
                                        name="paymentType"
                                        value={state.paymentType}
                                        onChange={handleChange}
                                        placeholder="Select Payment Type"
                                        options={paymentMethods}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={3} md={3} lg={3} >
                                    <Grid container direction="row" justify="flex-end">

                                        <FormBtn id="save" onClick={reloadGrid} btnType="search">Search</FormBtn>
                                        <FormBtn id="reset" onClick={clearFilters} >Clear Filter</FormBtn>


                                    </Grid>
                                </Grid>
                                {/* <Label title="Status" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <SelectField
                                        id="status"
                                        name="status"
                                        value={state.status}
                                        onChange={handleChange}
                                        placeholder="Select Payment Status"
                                        options={AccountStatusOptions}
                                    />
                                </Grid> */}


                            </Grid>

                            {/* <Grid container item className={classes.customGrid} direction="row" lg={12}>

                                <Label title="Check #" size={2} />

                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <InputBaseField
                                        id="checkNo"
                                        name="checkNo"
                                        value={state.checkNo}
                                        placeholder="#####"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={3} md={3} lg={3} >
                                    <Grid container direction="row" justify="flex-end">
                                        <div className={classes.footerRight}>

                                            <FormBtn id="save" onClick={reloadGrid} btnType="search">Search</FormBtn>
                                            <FormBtn id="reset" onClick={clearFilters} >Clear Filter</FormBtn>

                                        </div>

                                    </Grid>
                                </Grid>

                            </Grid> */}

                        </Collapse>

                    </div>
                    <div className={classes.gridArea}>
                        <div className={classes.gridButtonsArea}>
                            {isEditable ? <Button className={classes.gridButton} ><Link to="/app/batchinsurancepayment">Add Insurance Payment</Link></Button> :
                                <Button className={classes.gridButton} disabled={!isEditable }>Add Insurance Payment</Button>}
                            |
                            {isEditable ? <Button className={classes.gridButton} >
                                <Link to="/app/patientpayment">
                                    Add Patient Payment
                                </Link>
                            </Button> :
                                <Button className={classes.gridButton} disabled={!isEditable}>Add Patient Payment</Button>}
                        </div>

                        <EditAbleGrid
                            apiUrl="eob/loadGrid"
                            dataId={searchParams}
                            isUpdate={isUpdate}
                            isSelection={false}
                            pageSize={5}
                            hideAction={!isEditable}
                            // dataId={dataId}
                            columnCode="PaymentsColumns"
                            //onAddNew={handleAddNew}
                            onEdit={(records) => handleRowClick(records)}
                            onDelete={handleDelete}
                        // isRowClickAble={true}
                        // onRowClick={(records) => handleRowClick(records)}
                        />
                    </div>

                </ShadowBox>
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
        </>
    )
}

export default withSnackbar(Payment)