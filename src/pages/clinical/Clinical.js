import React, { useState, useEffect } from "react";

//material ui
import { Grid, Button, Dialog, Collapse, DialogContent, Divider, DialogActions, FormLabel } from "@material-ui/core"
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
}
    from '@material-ui/icons';
//
// components
import PageTitle from "../../components/PageTitle";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../components/UiElements/UiElements"
import { CheckboxField, InputBaseField } from "../../components/InputField/InputField"
import { Typography } from "../../components/Wrappers";
import ClinicalGrid from '../../components/ClinicalGrid/ClinicalGrid';
import { data as gridCnfg } from '../../components/SearchGrid/Data/SetupData';
import SearchList from "../../components/SearchList/SearchList";
import { Add as AddIcon } from '@material-ui/icons';
// styles
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { GetUserInfo } from '../../Services/GetUserInfo';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { Scrollbars } from "rc-scrollbars";
import CloseIcon from "../../images/icons/math-plus.png"
import Demographics from '../patients/component/demographics/Demographics';
import BulLockDialog from "./components/bulkLock/BulkLock";
import { IsEditable } from '../../Services/GetUserRolesRights';

function Clinical(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [locationList, setLocationList] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [patientList, setPatientList] = useState([]);
    const [locationId, setLocationId] = useState(0);
    const [showPatientDemographicDialog, setShowPatientDemographicDialog] = useState(false);
    const [dataId, setDataId] = useState(0);
    const [updateState, setUpdateState] = useState(false);
    const [isEditable, setIsEditable] = useState(IsEditable("Clinical"));
    const [isEditablePatient, setIsEditablePatient] = useState(IsEditable("Patients"));
    const [reload, setReload] = useState(false);
    //
    const [showBulkLockDialog, setShowBulkLockDialog] = useState(false);
    //
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const [stateFilters, setStateFilters] = useState({
        locationId: "0", locationName: "", providerId: "0", providerName: "", patientId: "0", patientName: "",
        fromDate: addDays(new Date(), 0).toString(), toDate: addDays(new Date(), 7).toString(),
        needSupervising: false, needRendering: false, isexclude: true, isViewUnsignedOnly: false, isPendingSuperBills: false,
        patientIds: '', locationIds: '', providerIds: '', userId: userInfo.userID.toString()
    });

    const [showSearchFilter, setshowSearchFilter] = useState(true);

    useEffect(() => {
        if (props.location != undefined) {
            if (props.location.search != null && props.location.search != "") {
                if (props.location.search.split('?')[1].split('=')[0] == "pendingSuperBills") {
                    stateFilters.isPendingSuperBills = true;
                    stateFilters.isexclude = false;
                }
                else if (props.location.search.split('?')[1].split('=')[0] == "unsignedEncounters") {
                    stateFilters.isViewUnsignedOnly = true;
                }
                stateFilters.fromDate = '';
                stateFilters.toDate = '';
            }
        }
        if (stateFilters.isPendingSuperBills) {
            setUpdateState(!updateState);
        } else {
            setIntialValues();
        }


    }, []);


    function addDays(date, days) {

        date.addDays(days);
        return date.toISOString().split('T')[0];
    }

    const setIntialValues = () => {

        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);

        if (primaryLocation[0]) {
            locationList.push({ locationId: primaryLocation[0].id, locationName: primaryLocation[0].text1 });
            setLocationId(parseInt(primaryLocation[0].id));

            if (JSON.parse(user).user.isProvider === true) {
                var params = {
                    code: "",
                    parameters: [userInfo.userID.toString() ? userInfo.userID.toString() : ""]
                }
                PostDataAPI('user/getUserDecr', params, true).then((result) => {
                    if (result.success) {

                        providerList.push({ providerId: result.data, providerName: userInfo.firstName + ' ' + userInfo.lastName });

                        stateFilters.locationIds = primaryLocation[0].id;
                        stateFilters.providerIds = result.data.toString();
                        setUpdateState(!updateState);

                    }
                    else {
                        showMessage("Error", result.message, "error", 8000);
                    }

                })

            }
            else {
                stateFilters.locationIds = primaryLocation[0].id;
                setUpdateState(!updateState);
            }

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheckBoxChange = (e) => {

        const { name, checked } = e.target;
        setStateFilters(prevState => ({
            ...prevState,
            [name]: !stateFilters[name]
        }));
    }

    const handleMultiSelectChange = (name, selected) => {
        setStateFilters(prevState => ({
            ...prevState,
            [name]: selected
        }));
    }

    const handleSearcdhListChange = (name, item) => {

        const { id, value } = item;

        setStateFilters(prevState => ({
            ...prevState,
            locationId: id,
            locationName: value
        }));
        if (value && value != "") {
            setLocationId(0);
            var _locationList = [];

            if (locationList) {

                if (locationList.filter(tmprm => tmprm.locationId === id && tmprm.locationName === value) == "") {

                    locationList.map((itm, i) => {

                        _locationList.push({ locationId: itm.locationId, locationName: itm.locationName });
                    });

                }
                else {

                    showMessage("Error", "Location already selected", "error", 8000);

                    setTimeout(function () {
                        setStateFilters(prevState => ({
                            ...prevState,
                            locationId: 0,
                            locationName: ''
                        }));
                    }, 100);

                    return;
                }

            }

            var _locationIds = [];

            if (locationList) {

                locationList.map((item, i) => {
                    _locationIds = [..._locationIds, item.locationId];
                });

                _locationIds = [..._locationIds, id];

                setStateFilters(prevState => ({
                    ...prevState,
                    locationIds: _locationIds.join(', ')
                }));
            }

            setLocationId(parseInt(id));



            _locationList.push({ locationId: id, locationName: value });
            setProviderList([]);
            setLocationList(_locationList);
        }
        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                locationId: 0,
                locationName: ''
            }));
        }, 100);

    }

    const handleSearcdhListProviderChange = (name, item) => {


        const { id, value } = item;

        setStateFilters(prevState => ({
            ...prevState,
            providerId: id,
            providerName: value
        }));
        //setLocationId(0);
        if (value && value != "") {

            var _providerList = [];

            if (providerList) {

                if (providerList.filter(tmprm => tmprm.providerId === id && tmprm.providerName === value) == "") {

                    providerList.map((itm, i) => {

                        _providerList.push({ providerId: itm.providerId, providerName: itm.providerName });
                    });

                }
                else {

                    showMessage("Error", "Provider already selected", "error", 8000);

                    setTimeout(function () {
                        setStateFilters(prevState => ({
                            ...prevState,
                            providerId: 0,
                            providerName: ''
                        }));
                    }, 100);

                    return;
                }

            }

            // setLocationId(parseInt(id));



            var _providerIds = [];

            if (providerList) {

                providerList.map((item, i) => {
                    _providerIds = [..._providerIds, item.providerId];
                });

                _providerIds = [..._providerIds, id];

                setStateFilters(prevState => ({
                    ...prevState,
                    providerIds: _providerIds.join(', ')
                }));
            }

            _providerList.push({ providerId: id, providerName: value });

            setProviderList(_providerList);
        }
        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                providerId: 0,
                providerName: ''
            }));
        }, 100);
    }


    const handleSearcdhListPatientChange = (name, item) => {

        const { id, value } = item;

        setStateFilters(prevState => ({
            ...prevState,
            patientId: id,
            patientName: value
        }));
        if (value && value != "") {
            var _patientList = [];

            if (patientList) {

                if (patientList.filter(tmprm => tmprm.patientId === id && tmprm.patientName === value) == "") {

                    patientList.map((itm, i) => {

                        _patientList.push({ patientId: itm.patientId, patientName: itm.patientName });
                    });

                }
                else {

                    showMessage("Error", "Patient already selected", "error", 8000);

                    setTimeout(function () {
                        setStateFilters(prevState => ({
                            ...prevState,
                            patientId: 0,
                            patientName: ''
                        }));
                    }, 100);

                    return;
                }

            }

            var _patientIds = [];

            if (patientList) {

                patientList.map((item, i) => {
                    _patientIds = [..._patientIds, item.patientId];
                });

                _patientIds = [..._patientIds, id];

                setStateFilters(prevState => ({
                    ...prevState,
                    patientIds: _patientIds.join(', ')
                }));
            }

            _patientList.push({ patientId: id, patientName: value });

            setPatientList(_patientList);
        }
        setTimeout(function () {
            setStateFilters(prevState => ({
                ...prevState,
                patientId: 0,
                patientName: ''
            }));
        }, 100);
    }

    const getId = dataId => {

        if (dataId && dataId > 0 && dataId != "undefined") {
            setDataId(dataId);
            setShowPatientDemographicDialog(true);
        }
    }



    const deletePatientItem = (index) => {

        var _patientList = [];

        patientList.splice(index, 1);

        patientList.map((itm, k) => {
            _patientList.push({ patientId: itm.patientId, patientName: itm.patientName });
        });

        var _patientIds = [];

        if (_patientList) {

            _patientList.map((item, i) => {
                _patientIds = [..._patientIds, item.patientId];
            });

            setStateFilters(prevState => ({
                ...prevState,
                patientIds: _patientIds.join(', ')
            }));
        }

        setPatientList(_patientList);

    }

    const deleteLocationItem = (index) => {

        var _locationList = [];

        locationList.splice(index, 1);

        locationList.map((itm, k) => {
            _locationList.push({ locationId: itm.locationId, locationName: itm.locationName });
        });

        var _locationIds = [];

        if (_locationList) {

            _locationList.map((item, i) => {
                _locationIds = [..._locationIds, item.locationId];
            });

            setStateFilters(prevState => ({
                ...prevState,
                locationIds: _locationIds.join(', ')
            }));
        }

        setLocationList(_locationList);
    }

    const deleteProviderItem = (index) => {

        var _providerList = [];

        providerList.splice(index, 1);

        providerList.map((itm, k) => {
            _providerList.push({ providerId: itm.providerId, providerName: itm.providerName });
        });

        var _providerIds = [];

        if (_providerList) {

            _providerList.map((item, i) => {
                _providerIds = [..._providerIds, item.providerId];
            });

            setStateFilters(prevState => ({
                ...prevState,
                providerIds: _providerIds.join(', ')
            }));
        }


        setProviderList(_providerList);
    }


    function searchClinicalData() {

        handleFormatDate();
        stateFilters.isPendingSuperBills = false;
        stateFilters.isViewUnsignedOnly = false;

        setUpdateState(!updateState);
    }

    function handleFormatDate() {

        var _locationIds = [];
        var _providerIds = [];
        var _patientIds = [];

        if (locationList) {

            locationList.map((item, i) => {
                _locationIds = [..._locationIds, item.locationId];
            });
        }


        if (providerList) {

            providerList.map((itm, j) => {
                _providerIds = [..._providerIds, itm.providerId];
            });
        }


        if (patientList) {

            patientList.map((itmm, j) => {
                _patientIds = [..._patientIds, itmm.patientId];
            });
        }


        setStateFilters(prevState => ({
            ...prevState,
            locationIds: _locationIds.join(', '),
            providerIds: _providerIds.join(', '),
            patientIds: _patientIds.join(', '),
        }));
    }

    function handleClosePatientDemographicsForm() {
        setShowPatientDemographicDialog(false);
    }

    const clearValues = () => {

        setStateFilters({
            locationId: 0, locationName: "", providerId: 0, providerName: "", patientId: 0, patientName: "",
            fromDate: addDays(new Date(), 0).toString(), toDate: addDays(new Date(), 7).toString(),
            needSupervising: false, needRendering: false, isexclude: true, isViewUnsignedOnly: false, isPendingSuperBills: false,
            patientIds: '', locationIds: '', providerIds: '', userId: userInfo.userID.toString()
        });
        setReload(true);
        setProviderList([]);
        setLocationList([]);
        setPatientList([]);

    }
    return (
        // <>
        //   <PageTitle title="Billing" />
        //   <Typography variant="h2" weight="medium" className={classes.pageTitleContent}>
        //     Development in progress...
        //   </Typography>
        // </>
        <>
            <PageTitle title="Clinical Notes / Encounters" />
            <div className={classes.searchArea}>

                <Grid container direction="row" alignItems="flex-end" lg={12}>

                    <Grid item xs={12} sm={1} md={1} lg={1}>
                        {!showSearchFilter ?
                            <Grid container direction="row" justify="center" xs={12} sm={12} md={12} lg={12}>
                                <FormLabel className={classes.title}>Filters</FormLabel>
                            </Grid> : null
                        }
                    </Grid>

                    <Grid item xs={12} sm={7} md={7} lg={7} />

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Grid container direction="row" justify="flex-end" xs={12} sm={12} md={12} lg={12}>
                            <Button
                                size="small"
                                className={classes.collapseBtn}
                                onClick={() => setshowSearchFilter(!showSearchFilter)}
                            >
                                {showSearchFilter ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                            </Button>

                        </Grid>
                    </Grid>

                </Grid>

                <Collapse in={showSearchFilter} className={showSearchFilter ? classes.collapseOpen : classes.collapseClose} >

                    <Grid container lg={12}>

                        <Grid container alignItems="flex-start" alignContent="flex-start" xs={12} sm={5} md={5} lg={5} xl={5}>

                            <Typography variant="subtitle1" className={classes.clinicalFormTitle} gutterBottom>
                                <span className={classes.clinicalBaseTitle}>Locations</span>
                                <span className={classes.clinicalBaseLine}> </span>
                            </Typography>

                        </Grid>

                        <Grid container xs={1} sm={1} md={1} lg={1} xl={1} />

                        <Grid container alignItems="flex-start" alignContent="flex-start" xs={12} sm={6} md={6} lg={6} xl={6}>

                            <Typography variant="subtitle1" className={classes.clinicalFormTitle} gutterBottom>
                                <span className={classes.clinicalBaseTitle}>Providers</span>
                                <span className={classes.clinicalBaseLine}> </span>
                            </Typography>



                        </Grid>

                    </Grid>
                    <Grid container lg={12}>
                        <Label title="Select Location" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SearchList
                                id="locationId"
                                name="locationId"
                                value={stateFilters.locationId}
                                searchTerm={stateFilters.locationName}
                                code="login_provider_locations"
                                apiUrl="ddl/loadItems"
                                isUser={true}
                                onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                placeholderTitle="Search Location"
                                reload={reload}
                            />
                        </Grid>

                        <Label title="Select Provider" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SearchList
                                id="providerId"
                                name="providerId"
                                value={stateFilters.providerId}
                                searchTerm={stateFilters.providerName}
                                code="providers_by_location"
                                apiUrl="ddl/loadItems"
                                searchId={locationId}
                                onChangeValue={(name, item) => handleSearcdhListProviderChange(name, item)}
                                placeholderTitle="Search Provider"
                                reload={reload}
                            />
                        </Grid>

                    </Grid>

                    <Grid container lg={12}>

                        <Grid item xs={2} sm={2} md={2} lg={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <div className={classes.orderTestContent}>
                                <ul className={classes.orderList}>
                                    {
                                        locationList ?
                                            locationList.map((item, j) => (

                                                <li key={item.locationId}>
                                                    {item.locationName}
                                                    <span className={classes.deleteIcon} onClick={() => deleteLocationItem(j)}><AddIcon /></span>
                                                </li>

                                            ))
                                            : null
                                    }
                                </ul>
                            </div>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <div className={classes.orderTestContent}>
                                <ul className={classes.orderList}>
                                    {
                                        providerList ?
                                            providerList.map((itmm, m) => (

                                                <li key={itmm.providerId}>
                                                    {itmm.providerName}
                                                    <span className={classes.deleteIcon} onClick={() => deleteProviderItem(m)}><AddIcon /></span>
                                                </li>

                                            ))
                                            : null
                                    }
                                </ul>
                            </div>
                        </Grid>

                    </Grid>


                    <Typography variant="subtitle1" className={classes.clinicalFormTitle} gutterBottom>
                        <span className={classes.clinicalBaseTitle}>Locked Status</span>
                        <span className={classes.clinicalBaseLine}> </span>
                    </Typography>

                    <Grid container lg={12}>

                        <Grid item xs={2} sm={2} md={2} lg={2} />

                        <Grid item className={classes.checkBox} xs={12} sm={8} md={6} lg={5}>
                            <CheckboxField
                                color="primary"
                                name="isexclude"
                                checked={stateFilters.isexclude}
                                onChange={handleCheckBoxChange}
                                label="Exclude Cancelled Appointments"
                            />
                        </Grid>

                        <Grid item className={classes.checkBox} xs={12} sm={8} md={6} lg={5}>
                            <CheckboxField
                                color="primary"
                                name="isViewUnsignedOnly"
                                checked={stateFilters.isViewUnsignedOnly}
                                onChange={handleCheckBoxChange}
                                label="Show Unsigned Only"
                            />
                        </Grid>

                    </Grid>

                    <Typography variant="subtitle1" className={classes.clinicalFormTitle} gutterBottom>
                        <span className={classes.clinicalBaseTitle}></span>
                        <span className={classes.clinicalBaseLine}> </span>
                    </Typography>

                    <Grid container lg={12} className={classes.patientLable}>

                        <Label title="Patient Name" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <SearchList
                                id="patientId"
                                name="patientName"
                                value={stateFilters.patientId}
                                searchTerm={stateFilters.patientName}
                                code="patient_Search"
                                apiUrl="ddl/loadItems"
                                onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                placeholderTitle="Patient Name"
                                reload={reload}
                            />
                        </Grid>


                        <Grid alignItems="flex-start" alignContent="flex-start" item xs={12} sm={6} md={6} lg={6}>
                            <div className={classes.orderTestContent}>
                                <ul className={classes.orderList}>
                                    {
                                        patientList ?
                                            patientList.map((item, s) => (
                                                <li key={item.patientId}>
                                                    {item.patientName}
                                                    <span className={classes.deleteIcon} onClick={() => deletePatientItem(s)}><AddIcon /></span>
                                                </li>

                                            ))
                                            : null
                                    }
                                </ul>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container lg={12}>

                        <Label title="From Date" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                type="date"
                                id="fromDate"
                                name="fromDate"
                                value={stateFilters.fromDate}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Label title="To Date" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <InputBaseField
                                type="date"
                                id="toDate"
                                name="toDate"
                                value={stateFilters.toDate}
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

                    <Grid container lg={12}>
                        <Grid item xs={12} sm={7} md={7} lg={7} />

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <span style={{ float: "right" }}>
                                <FormBtn id={"save"} size="small" onClick={searchClinicalData} btnType="search">Search</FormBtn>
                                <FormBtn id="reset" onClick={clearValues} style={{ marginRight: 0 }}>Clear Filter</FormBtn>
                            </span>
                        </Grid>

                    </Grid>

                </Collapse>

            </div>

            <div className={classes.gridArea}>
                <div className={classes.gridButtonsArea}>
                    <Button className={classes.gridButton} disabled={true} >Export To Excel</Button>|
                    <Button className={classes.gridButton} disabled={true} >Export To PDF</Button>|
                    <Button className={classes.gridButton} disabled={true} onClick={() => setShowBulkLockDialog(true)}>Bulk Lock Notes</Button>
                </div>

                <ClinicalGrid
                    code="ClinicalNotes"
                    rowClick={getId}
                    apiUrl="encounter/loadClinicalNotesEncounterGrid"
                    searchShowHide={false}
                    filter={stateFilters}
                    updateState={updateState}
                    isEditable={isEditable}
                />
            </div>

            {
                showPatientDemographicDialog ?

                    <Dialog
                        classes={{ paper: classes.demographicDialogPaper }}
                        disableBackdropClick
                        disableEscapeKeyDown
                        PaperComponent={DraggableComponent}
                        open={showPatientDemographicDialog}
                        fullWidth={true}
                        maxWidth={"xl"}
                    >
                        {/* <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                            <Grid lg={12} container direction="row">

                                <Grid item xs={11} sm={11} md={11} lg={11}
                                    container
                                    direction="row"
                                >
                                    <FormGroupTitle>Demographics</FormGroupTitle>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1} >
                                    <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                        <span className={classes.crossButton} onClick={() => handleClosePatientDemographicsForm()}><img src={CloseIcon} /></span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogTitle> */}
                        {/* <Scrollbars style={{ minHeight: "98vh", maxHeight: "100% ", display: "flex", }}> */}
                        <Divider />
                        <DialogContent className={classes.demographicDialogcontent}>
                            <Grid item xs={12} sm={12} md={12} lg={12} container direction="row" style={{ cursor: "move" }} id="draggable-dialog-title" >
                                <span className={classes.crossButton} onClick={handleClosePatientDemographicsForm}><img src={CloseIcon} /></span>
                                <FormGroupTitle>Demographics</FormGroupTitle>

                            </Grid>
                            <Demographics dataId={dataId} isEditable={isEditablePatient} />
                        </DialogContent>
                        <Divider />
                        <DialogActions className={classes.demographicDialogactions}>
                            &nbsp;
                            <br />

                            {/* <FormBtn id="reset" onClick={closeDemographics} >Close</FormBtn> */}
                        </DialogActions>
                        {/* </Scrollbars> */}
                    </Dialog>

                    : ""
            }

            {
                showBulkLockDialog ?
                    <BulLockDialog dialogOpenClose={showBulkLockDialog} handleClose={() => setShowBulkLockDialog(false)} /> : ""
            }
        </>
    );
}
export default withSnackbar(Clinical)

