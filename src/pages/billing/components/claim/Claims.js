import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
//material ui
import { Grid, Button, Collapse, Tooltip, Dialog, Divider } from "@material-ui/core"
//
// components
import PageTitle from "../../../../components/PageTitle";
import { Label, FormBtn, LinkS, FormGroupTitle, DraggableComponent } from "../../../../components/UiElements/UiElements"
import { InputBaseField, SelectField } from "../../../../components/InputField/InputField"
import { data as gridCnfg } from '../../../../components/SearchGrid/component/setupData';
import SearchList from "../../../../components/SearchList/SearchList";
import { Add as AddDeleteIcon } from '@material-ui/icons';
// styles
// import 'antd/dist/antd.css';
import "../../../../components/antd.css";
import '../payment/styles.css';
import useStyles from "./styles";
//
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { withSnackbar } from "../../../../components/Message/Alert";
import ClaimIcon from "../../../../images/icons/claim-status.png";
import Erase from "../../../../images/icons/erase.png"
import CloseIcon from "../../../../images/icons/math-plus.png";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import Demographics from '../../../patients/component/demographics/Demographics';
import { Scrollbars } from "rc-scrollbars";
import PatientSearchList from "../../../../components/PatientSearchList/PatientSearchList"

import {
    AddCircleOutline as AddCircleOutlineIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Update
}
    from '@material-ui/icons';
import AddNewClaimWithoutEncounterDialog from "./components/addClaimWithoutEncounterDialog/AddNewClaimWithoutEncounterDialog";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";

//import { AccountStatusOptions } from '../../../../../context/StaticDropDowns';
import '../../../../components/SearchGrid/style.css';
import '../../../../components/SearchGrid/antStyle.css';
import { Table, Row, Empty } from "antd";
import ClaimStatusDialog from "./components/claimStatusDialog/ClaimStatusDialog";
import ShowHideColumnsDialog from "./components/showHideColumnsDialog/ShowHideColumnsDialog";
import ClaimBulkStatusDialog from "./components/claimBulkStatusDialog/ClaimBulkStatusDialog";
import ReSubmitClaimDialog from "./components/reSubmitClaimDialog/ReSubmitClaimDialog";
import { AttachFile } from '@material-ui/icons';
import { IsEditable } from '../../../../Services/GetUserRolesRights';
import professionalIcon from "../../../../images/icons/professional.png";
import institutionalIcon from "../../../../images/icons/institutional.png";
import dentalIcon from "../../../../images/icons/dental.png";

function Claims(props) {

    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [locationId, setLocationId] = useState(0);
    const [showSearchFilter, setshowSearchFilter] = useState(true);
    const [rowsData, setRowsData] = useState([]);
    const [patients, setPatients] = useState([]);
    const [payers, setPayers] = useState([]);
    const [getPatientID, setGetPatientID] = useState([]);

    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [insuranceTabId, setInsuranceTabId] = useState(0);
    const [reRender, setReRender] = useState(0);



    const [isSubmitAvailable, setIsSubmitAvailbale] = useState(false);
    //Selection
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys)
    }
    //
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    const [showAddNewClaimDialog, setShowAddNewClaimDialog] = useState(false);
    const [showClaimStatusDialog, setShowClaimStatusDialog] = useState(false);
    const [showUpdateClaimStatusDialog, setShowUpdateClaimStatusDialog] = useState(false);
    const [showHideColumnsDialog, setShowHideColumnsDialog] = useState(false);
    const [showReSubmitClaimDialog, setShowReSubmitClaimDialog] = useState(false);
    const [selectedClaimId, setSelectedClaimId] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedBillingStatus, setSelectedBillingStatus] = useState([]);
    //

    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }

    const [state, setState] = useState({
        locationId: 0, locationName: '', providerId: 0, providerName: '', claimStatusId: '', claimStatusName: '',
        billingStatusId: '', billingStatusName: '', balDecision: '', balance: 0, patientId: 0, payerId: 0, payerName: '',
        claimTcnNo: '', dateCriteria: 'serviceDate', dateFrom: addDays(new Date(), -31).toString(), dateTo: addDays(new Date(), 0).toString(), clinicalNotes: '', patientName: '',
        isFollowup: false
    });

    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalBill: 0, totalAllowed: 0, totalAdjustments: 0, totalInsPaid: 0, totalInsSecondPaid: 0, totalPtPaid: 0,
        totalInsBal: 0, totalInsFirst: 0
    });

    const optDateCriteria = [
        { value: "serviceDate", label: "Date Of Service" },
        { value: "createdDate", label: "Date Created" },
        { value: "submittedDate", label: "Date Submitted" },
    ]
    const optClinicalNotes = [
        { value: "1", label: "Signed" },
        { value: "0", label: "Unsigned" },
    ]
    const optClaimCategory = [
        { value: "Dental", label: "Dental" },
        { value: "Institutional", label: "Institutional" },
        { value: "Professional", label: "Professional" },
    ]
    let history = useHistory();
    useEffect(() => {
        if (props.location != undefined) {
            if (props.location.search != undefined && props.location.search != null && props.location.search != "") {
                if (props.location.search.split('?')[1].split('=')[0] == "isRejectedClaims") {
                    selectedBillingStatus.push({ billingStatusId: 'CLEARING_HOUSE_REJECTION', billingStatusName: 'Clearing House Rejection', isDeleted: false });
                    selectedBillingStatus.push({ billingStatusId: 'DENIED', billingStatusName: 'Denied', isDeleted: false });
                    selectedBillingStatus.push({ billingStatusId: 'PAYER_REJECTION', billingStatusName: 'Payer Rejection', isDeleted: false });
                    state.dateFrom = '';
                    state.dateTo = '';
                    state.isFollowup = false;
                }
                else if (props.location.search.split('?')[1].split('=')[0] == "isFollowUps") {
                    state.dateFrom = '';
                    state.dateTo = '';
                    state.isFollowup = true;
                }
            }
        }
        Initilization();
        GetSearchGrid();

    }, [isUpdate]);

    const Initilization = () => {

        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);
        if (primaryLocation[0]) setLocationId(primaryLocation[0].id);

        var params = {
            code: "get_all_patients",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {



                setPatients(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })

        params = {
            code: "get_payer",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPayers(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text2 + ' ' + item.text1 };
                    }));
            }
        })
    }
    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setGetPatientID(id)
        setInsuranceTabId(0)
    }

    const handleEdit = record => {
        let data = `${record.encounterId}/${record.patientId}/${record.claimSuperbillId}/billing`;
        history.push(`/app/addclaim?id=${data}`);
    }

    const loadClaimsData = () => {
        setIsLoading(true);
        var dataId = [];
        selectedBillingStatus.filter(r => r.isDeleted == false).map((item) => {
            dataId.push(item.billingStatusId);
        });
        state.billingStatusId = dataId.join(',');

        PostDataAPI("claim/loadClaimSuperBillGrid", state).then((result) => {

            setIsLoading(false);
            if (result.success && result.data != null) {

                let _totalBill = 0;
                let _totalAllowedAmount = 0;
                let _totalAdjustmentAmount = 0;
                let _totalInsFirstAmount = 0;
                let _totalInsSecondAmount = 0;
                let _totalPtPaid = 0;
                let _totalInsBalance = 0;
                let _totalInsFirst = 0;
                setRowsData(
                    result.data.map((item, i) => {
                        item.key = item.claimSuperbillId;
                        item.category = <img style={{ marginTop: '2px' }} src={item.claimCategory == 'Professional' ? professionalIcon : item.claimCategory == 'Institutional' ? institutionalIcon : dentalIcon} />;
                        item.patientName = <LinkS onClick={() => handleOpenDemographics(item.patientId)} style={{ marginLeft: "0", fontSize: "12px" }}>{item.patientName}</LinkS>
                        item.action =
                            <Row type="flex" justify="center" align="middle">
                                <img
                                    onClick={(e) => { e.stopPropagation(); openClaimStatusDialog(item.claimSuperbillId); }}
                                    className="custom-grid-cell-icon"
                                    src={ClaimIcon}
                                    alt="ins status"
                                />
                                <Tooltip title="Edit">
                                    <img src={Erase} onClick={() => handleEdit(item)} className={classes.Icon} />
                                </Tooltip>
                            </Row>
                        if (i === 0) {

                            _totalBill = item.totalBilledAmount;
                            _totalAllowedAmount = item.totalAllowedAmount;
                            _totalAdjustmentAmount = item.totalAdjustmentAmount;
                            _totalInsFirstAmount = item.totalInsFirstAmount;
                            _totalInsSecondAmount = item.totalInsSecondAmount;
                            _totalPtPaid = item.totalPtPaid;
                            _totalInsBalance = item.totalInsBalance;

                        }
                        return { ...item }
                    }))
                setStateTotalAmount(prevState => ({
                    ...prevState,
                    totalBill: _totalBill.toFixed(2),
                    totalAllowed: _totalAllowedAmount.toFixed(2),
                    totalAdjustments: _totalAdjustmentAmount.toFixed(2),
                    totalInsPaid: _totalInsFirstAmount,
                    totalInsSecondPaid: _totalInsSecondAmount,
                    totalPtPaid: _totalPtPaid,
                    totalInsBal: _totalInsBalance,
                    totalInsFirst: _totalInsFirst
                }));
            }
        });
    }

    const handleSearchBtnClick = () => {
        state.isFollowup = false;
        GetSearchGrid();
    }

    const GetSearchGrid = () => {

        if (state.dateFrom > state.dateTo) {
            showMessage("Error", "From date cannot be greater than to date", "error", 3000);
            return;
        }

        state.locationId = state.locationId ? parseFloat(state.locationId) : 0;
        state.providerId = state.providerId ? parseFloat(state.providerId) : 0;
        state.balance = state.balance ? parseFloat(state.balance) : 0;
        state.patientId = state.patientId ? parseFloat(state.patientId) : 0;
        state.payerId = state.payerId ? parseFloat(state.payerId) : 0;
        // state.dateFrom = state.dateFrom ? new Date(state.dateFrom) : '';
        // state.dateTo = state.dateTo ? new Date(state.dateTo) : '';
        loadClaimsData();
    }

    const clearValues = () => {
        if (reRender == 1) {
            setReRender(0);
        } else {
            setReRender(1);
        }

        props.location.search = "";
        state.isFollowup = false;
        setState({
            locationId: 0, locationName: '', providerId: 0, providerName: '', claimStatusId: '', claimStatusName: '',
            billingStatusId: '', billingStatusName: '', balDecision: '', balance: 0, patientId: 0, patientName: '',
            payerId: 0, payerName: '', claimTcnNo: '', dateCriteria: 'serviceDate', dateFrom: addDays(new Date(), -31).toString(),
            dateTo: addDays(new Date(), 0).toString(), clinicalNotes: '', isFollowup: false, claimCategory: ''
        });
        setSelectedBillingStatus([]);
        setIsUpdate(!isUpdate);
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChangePatientId = (item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            patientId: value == '' ? '' : id,
            patientName: value
        }));
    }

    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name == 'locationId') {
            setState(prevState => ({
                ...prevState,
                locationId: value == '' ? '' : id,
                locationName: value
            }));

        }
        else if (name == 'providerId') {
            setState(prevState => ({
                ...prevState,
                providerId: value == '' ? '' : id,
                providerName: value
            }));
        }
        else if (name == 'claimStatusId') {
            if (value != "") {
                setState(prevState => ({
                    ...prevState,
                    claimStatusId: id,
                    claimStatusName: value
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    claimStatusId: "",
                    claimStatusName: value
                }));
            }

        }
        else if (name == 'billingStatusId') {
            if (value == '') {
                setState(prevState => ({
                    ...prevState,
                    billingStatusId: '',
                    billingStatusName: ''
                }));
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    billingStatusId: id,
                    billingStatusName: value
                }));
            }
        }
        else if (name == 'payerId') {
            setState(prevState => ({
                ...prevState,
                payerId: value == '' ? '' : id,
                payerName: value
            }));
        }
        else if (name == 'patientId') {
            setState(prevState => ({
                ...prevState,
                patientId: value == '' ? '' : id,
                patientName: value
            }));
        }

    }

    const deleteBillingStatusItem = (code) => {
        let updatedList = selectedBillingStatus.map((item, i) => item.billingStatusId == code ? { ...item, isDeleted: true } : item);
        setSelectedBillingStatus(updatedList);
    }

    const handleSearchBillingStatusChange = (name, item) => {
        const { id, value } = item;
        if (value === '') {
            return;
        }
        if (selectedBillingStatus.filter(r => r.isDeleted == false).some(t => t.billingStatusId == id)) {
            showMessage("Error", 'Record already selected', "error", 3000);
            return;
        }

        setState(prevState => ({
            ...prevState,
            billingStatusId: id,
            billingStatusName: value
        }));
        const obj = { billingStatusId: id, billingStatusName: value, isDeleted: false }
        setSelectedBillingStatus([...selectedBillingStatus, obj])
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                billingStatusId: 0,
                billingStatusName: ''
            }));
        }, 100);

    }


    const openBillingStatusDialog = () => {
        let decision = true;
        if (selectedRows.length < 1)
            showMessage("Error", "Please select at least one claim.", "error", 3000);
        else
            setShowUpdateClaimStatusDialog(true);
    }
    const claimStatusInquiry = () => {
        if (selectedRows.length < 1)
            showMessage("Error", "Please select at least one claim.", "error", 3000);
        else {
            var obj = {
                ids: selectedRows.join(", ")
            }
            PostDataAPI("claims/ClaimStatusInquiry", obj, true).then((result) => {
                if (result.success === true) {
                    //if (result.data) {
                    showMessage("Success", "Claims status requested successfully.", "success", 3000);
                    //window.open("." + result.data, '_blank');
                    //download(result.data);
                    //}
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }
    }

    const openResubmitClaimsDialog = () => {
        let decision = true;
        if (selectedRows.length < 1)
            showMessage("Error", "Please select at least one claim.", "error", 3000);
        else {
            for (let el of selectedRows) {
                let obj = search(el, rowsData);
                if (obj != undefined) {
                    if (obj.billingStatusCode == 'Submitted Claim') {
                        decision = false;
                        break;
                    }
                }
            }

            if (decision)
                setShowReSubmitClaimDialog(true);
            else
                showMessage("Error", "Please select those claims which are not already submitted.", "error", 3000);
        }
    }

    const openClaimStatusDialog = (id) => {
        setSelectedClaimId(id);
        setShowClaimStatusDialog(true);
    }

    const handleResubmitClose = () => {
        setShowReSubmitClaimDialog(false);
        setIsUpdate(!isUpdate);
    }
    const handleStatusDialogClose = () => {
        setSelectedRows([]);
        setShowUpdateClaimStatusDialog(false);
        setIsUpdate(!isUpdate);
    }
    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].claimSuperbillId === nameKey) {
                return myArray[i];
            }
        }
    }
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const getClaimStatusResponse = (userPhoto) => {
        let formData = new FormData();
        formData.append("formFile", userPhoto);
        PostDataAPI("claims/claimStatusResponse", formData, true, 'formData').then((result) => {
            if (result.success === true && result.data != null) {
                if (result.data) {
                    showMessage("Success", "Claims re-submit successfully.", "success", 3000);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const inputFile = useRef(null);
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    function handleFileUpload(e) {
        getClaimStatusResponse(e.target.files[0]);
    }
    return (
        <>
            <PageTitle title="Claims" />
            <Grid container direction="row" lg={12}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    </Grid>
                    {/* <Button
                        size="small"
                        className={classes.collapseBtn}
                        onClick={() => setshowSearchFilter(!showSearchFilter)}
                    >
                        {showSearchFilter ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                    </Button> */}
                    <Button
                        size="small"
                        disabled={!isEditable}
                        className={classes.newAddBtn2}
                        onClick={() => setShowAddNewClaimDialog(true)} >
                        <AddCircleOutlineIcon />Add New
                    </Button>
                </Grid>
            </Grid>
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
                    <Grid container className={classes.customGrid} direction="row" lg={12}>

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

                        <Label title="Provider" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="providerId"
                                name="providerId"
                                value={state.providerId}
                                searchTerm={state.providerName}
                                code="get_all_providers_query"
                                apiUrl="ddl/loadItems"
                                searchId={locationId}
                                onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                placeholderTitle="Search by Provider Name"
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Label title="Patient" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="patientId"
                                name="patientId"
                                value={state.billingStatusId}
                                searchTerm={state.patientName}
                                code="patient_Search"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                placeholderTitle="Search by Patient Name"
                            />
                        </Grid>
                        <Label title="Claim Type" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            {/*<SearchList*/}
                            {/*    id="claimStatusId"*/}
                            {/*    name="claimStatusId"*/}
                            {/*    value={state.claimStatusId}*/}
                            {/*    searchTerm={state.claimStatusName}*/}
                            {/*    code="get_claim_type"*/}
                            {/*    apiUrl="ddl/loadItems"*/}
                            {/*    onChangeValue={(name, item) => handleSearchListChange(name, item)}*/}
                            {/*    placeholderTitle="Search Claim Type"*/}
                            {/*/>*/}
                            <SelectField
                                id="claimCategory"
                                name="claimCategory"
                                value={state.claimCategory}
                                options={optClaimCategory}
                                onChange={handleChange}
                                placeholder="Select Claim Type"
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Label title="Clinical Notes" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="clinicalNotes"
                                name="clinicalNotes"
                                value={state.clinicalNotes}
                                options={optClinicalNotes}
                                onChange={handleChange}
                                placeholder="Select Notes"
                            />
                        </Grid>

                        <Label title="Payer" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="payerId"
                                name="payerId"
                                value={state.payerId}
                                elemCode="payerName"
                                searchTerm={state.payerName}
                                code="get_payer"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item, elemCode) => handleSearchListChange(name, item, elemCode)}
                                placeholderTitle="Search by Payer Name or Code"
                            />
                        </Grid>

                    </Grid>
                    <Grid container className={classes.customGrid} direction="row" lg={12}>

                        <Label title="Date Criteria" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SelectField
                                id="dateCriteria"
                                name="dateCriteria"
                                value={state.dateCriteria}
                                onChange={handleChange}
                                options={optDateCriteria}
                            //placeholder="Select Criteria"
                            />
                        </Grid>

                        <Label title="Date From" size={2} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <input
                                        type="date"
                                        id="dateFrom"
                                        name="dateFrom"
                                        value={state.dateFrom}
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
                                        id="dateTo"
                                        name="dateTo"
                                        value={state.dateTo}
                                        onChange={handleChange}
                                        className={classes.dateInput}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                        <Label title="Billing Status" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <SearchList
                                id="billingStatusId"
                                name="billingStatusId"
                                value={state.billingStatusId}
                                searchTerm={state.billingStatusName}
                                code="get_bill_type"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearchBillingStatusChange(name, item)}
                                placeholderTitle="Search Billing Status"
                            />
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <div className={classes.orderTestContent}>
                                    <ul className={classes.orderList}>
                                        {selectedBillingStatus ?

                                            selectedBillingStatus.map((item, i) => {
                                                if (item.isDeleted == true) { return '' }
                                                else {
                                                    return (
                                                        <>
                                                            <li>
                                                                {item.billingStatusName}
                                                                <span className={classes.deleteIcon} onClick={() => deleteBillingStatusItem(item.billingStatusId)}> <AddDeleteIcon /> </span>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            }
                                            ) : ''
                                        }
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>

                        <Label title="Claim /TCN #" size={2} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <InputBaseField
                                id="claimTcnNo"
                                name="claimTcnNo"
                                value={state.claimTcnNo}
                                onChange={handleChange}
                                placeholder="Search TCN"
                            />
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12}>
                        <Grid item xs={12} sm={7} md={7} lg={7} />
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <Grid container direction="row" justify="flex-end" >
                                <FormBtn id="save" onClick={handleSearchBtnClick} btnType="search" >Search</FormBtn>
                                <FormBtn id="reset" onClick={clearValues} >Clear Filter</FormBtn>

                            </Grid>
                            <Grid item xs={12} sm={2} md={2} lg={2} />

                        </Grid>

                    </Grid>

                </Collapse>
            </div>
            <div className={classes.gridArea}>
                <div className={classes.gridButtonsArea}>

                    <Button className={classes.gridButton} disabled={!isEditable} onClick={() => openBillingStatusDialog()}>Bulk Update Status</Button>|
                    <Button className={classes.gridButton} disabled={!isEditable} onClick={() => openResubmitClaimsDialog()}>Submit Claims</Button>
                    {/*<Button className={classes.gridButton} onClick={() => claimStatusInquiry()}>Status Inquiry</Button>|*/}
                    {/*<Button className={classes.gridButton} onClick={handleSelectFile}>Status Response</Button>|*/}
                    {/*<form>*/}
                    {/*    <div>*/}
                    {/*        <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".txt" />*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                    {/* <Button className={classes.gridButton} disabled>Set Fellow up Date</Button>|
                    <Button className={classes.gridButton} disabled onClick={() => setShowHideColumnsDialog(true)}>Display</Button>|
                    <Button className={classes.gridButton} disabled>Export to File</Button>|
                    <Button className={classes.gridButton} disabled>Custom Export</Button> */}
                </div>

                <div className="custom-grid">
                    <Table
                        scroll={true}
                        dataSource={rowsData}
                        checkStrictly={true}
                        rowSelection={{
                            selectedRowKeys: selectedRows,
                            onChange: onSelectChange
                        }}
                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                        columns={gridCnfg["AddClaimWithoutEncounterColumns"]}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={isLoading && LoadingIcon}
                                    description={isLoading ? "Loading..." : "No Record Found"}
                                    imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                />
                            )
                        }}

                        summary={() => (
                            rowsData && rowsData.length > 0 ?
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={5}>Total:</Table.Summary.Cell>
                                        <Table.Summary.Cell index={6}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={7}>

                                            {numberFormat(stateTotalAmount.totalBill)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={8}>

                                            {numberFormat(stateTotalAmount.totalAllowed)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={9}>

                                            {numberFormat(stateTotalAmount.totalAdjustments)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={10}>

                                            {numberFormat(stateTotalAmount.totalInsPaid)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={11}>

                                            {numberFormat(stateTotalAmount.totalInsSecondPaid)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={12}>

                                            {numberFormat(stateTotalAmount.totalPtPaid)}

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={13}>
                                            {numberFormat(stateTotalAmount.totalInsBal)}
                                        </Table.Summary.Cell>
                                        {/*<Table.Summary.Cell index={14}>$ {stateTotalAmount.totalInsFirst}</Table.Summary.Cell>*/}
                                    </Table.Summary.Row>
                                </Table.Summary>
                                : null
                        )}
                    />
                </div>

            </div>

            {
                showAddNewClaimDialog ?
                    <AddNewClaimWithoutEncounterDialog showHideDialog={showAddNewClaimDialog} handleClose={() => setShowAddNewClaimDialog(false)} /> : ""
            }
            {
                showClaimStatusDialog ?
                    <ClaimStatusDialog showHideDialog={showClaimStatusDialog} handleClose={() => setShowClaimStatusDialog(false)} dataId={selectedClaimId} /> : ""
            }
            {
                showUpdateClaimStatusDialog ?
                    <ClaimBulkStatusDialog showHideDialog={showUpdateClaimStatusDialog} handleClose={() => handleStatusDialogClose()} bulkSelectedRows={selectedRows} /> : ""
            }
            {
                showHideColumnsDialog ?
                    <ShowHideColumnsDialog showHideDialog={showHideColumnsDialog} handleClose={() => setShowHideColumnsDialog(false)} />
                    : null}
            {
                showReSubmitClaimDialog ?
                    <ReSubmitClaimDialog showHideDialog={showReSubmitClaimDialog} handleClose={() => handleResubmitClose()} bulkSelectedRows={selectedRows} />
                    : null}

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                maxWidth="md"
            >
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Demographics</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <div className={classes.content}>
                                <Demographics dataId={getPatientID} insuranceSelect={insuranceTabId} isEditable={isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <Divider />

                {/* </Scrollbars> */}
            </Dialog>

        </>
    );
}
export default withSnackbar(Claims)

