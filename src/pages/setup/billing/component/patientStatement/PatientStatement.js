//material ui
import {
    Button,
    Collapse, Grid
} from "@material-ui/core";
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import React, { useEffect, useRef, useState } from "react";
import { CheckboxField, InputBaseField, RadioboxField, SelectField } from "../../../../../components/InputField/InputField";
import { withSnackbar } from "../../../../../components/Message/Alert";
//custom
import PageTitle from "../../../../../components/PageTitle";
import EditAbleGrid from "../../../../../components/SearchGrid/component/EditAbleGrid";
import SearchList from "../../../../../components/SearchList/SearchList";
import { FormBtn, FormGroupTitle, Label } from "../../../../../components/UiElements/UiElements";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import "../../../../billing/components/payment/styles.css";
import useStyles from "./styles";
import { printReport } from '../../../../../components/Common/Extensions';



// import '../payment/styles.css';

function PatientStatement({ ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [selectedRowIds, setSelectedRowsIds] = useState([]);
    const [searchPatientOption,setSearchPatientOption] = useState(1);
    const getSelection = (keys) => {
        setSelectedRowsIds(keys);
    }
    const options = [
        {
            value: "AllPatients",
            label: "All Patients",
        },
        {
            value: "ActivePatients",
            label: "Active Patients",
        },
    ];
    const btnOptions = ['Print 1', 'Print 2'];
    const [isCollapse, setIsCollapse] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchParams, setSearchParams] = useState(["", "true", "", "", "", "", "", "0", "", "", "-1"]);


    const [state, setState] = useState({
        patientStatementOption: "ActivePatients", patientId: 0, patientName: '', patientGroup: "", patientFlags: '', selectedFlags: '',
        statementId: "", locationId: 0, locationName: '', providerId: "-1", providerName: '', lastPrintedStatement: "", DOSFrom: "", DOSTo: "",
        lastStatements: "", includePatientsWithZero: false, balanceFrom: '', balanceTo: ''
    });

    const [printState, setPrintState] = useState({
        statementDueDate: "", includeStatementsWithNotes: false, includeSummaryWithBalance: true, includeLineItemWithZeroBalance: true
    });
    //states for dropdown button


    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedButton, setSelectedButton] = useState("Print");

    function handleGeneratePatientStatement() {
        
        if (selectedRowIds.length > 0) {
            var params = {
                userId: userInfo.userID.toString(),
                patientIds: selectedRowIds.join(',')
            }
            setIsLoading(true);
            PostDataAPI("reports/generatePatientStatmentReports", params).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    showMessage("Success", "Statements generated successfully", "success", 3000);
                    reloadGrid();
                } else {
                    if (!result.message) {
                        showMessage("Error", result.message, "error", 3000);
                    } else {
                        showMessage("Error", "Unable to generate the statement, please contact administrator.", "error", 3000);
                    }
                    
                }
            });

        } else {
            showMessage("Error", "Please select at least one patient to generate statement.", "error", 3000);
        }
       
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedButton(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    //
    //Search Filter
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (name == 'patientStatementOption') {
            if (value == 'AllPatients') {
                setSearchPatientOption(4);
            } else {
                setSearchPatientOption(1);
            }
        }
    }
    const handleSearcdhListPatientChange = (name, item, elemCode) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [elemCode]: value,
            [name]: id
        }))
    }
    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))

        setState(prevState => ({
            ...prevState,
            'balanceFrom': ''
        }))
        setState(prevState => ({
            ...prevState,
            'balanceTo': ''
        }))
    }
    //Print Filter Handler
    const handlePrintFilterChange = (e) => {
        const { name, value } = e.target;

        setPrintState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePrintFilterCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const handleRowClick = (record) => {
        // setShowHideEraReviewDialog(true)
        // history.push('/app/batchinsurancepayment/id=' + record.eobId);
    }
    const update = () => setIsUpdate(!isUpdate);
    const reloadGrid = () => {
        setSearchParams([state.patientId.toString(),
        state.patientStatementOption == 'ActivePatients' ? 'true' : 'false',
        state.locationId.toString(), state.statementId, state.lastPrintedStatement,
            state.DOSFrom, state.DOSTo, state.includePatientsWithZero ? "1" : "0", state.balanceFrom, state.balanceTo, state.providerId, state.lastStatements
        ]);
        update();
    }
    const clearValues=()=>{
        setState({
                patientStatementOption: "ActivePatients", patientId: 0, patientName: '', patientGroup: "", patientFlags: '', selectedFlags: '',
                statementId: "", locationId: 0, locationName: '', providerId: 0, providerName: '', lastPrintedStatement: "", DOSFrom: "", DOSTo: "",
                lastStatements: "", includePatientsWithZero: false, balanceFrom: '', balanceTo: ''
            })
            setSearchParams(["", "true", "", "", "", "", "", "0", "", "", "-1"]);
            update();
    }
    const [patientGroupList, setPatientGroupList] = useState([{ value: "", label: "Select Patient Group" }]);
    const [patientFlagsList, setPatientFlagsList] = useState([{ value: "", label: "Select Patient Flags" }]);
    const [selectedFlagsList, setSelectedFlagsList] = useState([{ value: "", label: "Select Flags" }]);
    const [lastStatementsList, setLastStatementsList] = useState([{ value: "30 Days", label: "30 Days" }, { value: "60 Days", label: "60 Days" }, { value: "90 Days", label: "90 Days" }]);
    const [locationId, setLocationId] = useState(0);
    useEffect(() => {
        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        if (locationlist && locationlist.length > 0)
            setLocationId(parseInt(locationlist[0].id));
    });
    const previewPatientStatement = async (item) => {
        if (item.totalStatements > 0) {
            var reportUrl = "%2freports%2fbilling%2ffinancial_patient_statement&rs:Command=Render&rc:Parameters=false";
            var _patientId = "&patient_id=" + item.patientId
            var _parameters = _patientId;
            printReport(reportUrl, _parameters);

        } else {
            showMessage("Error", "Patient statement doesn't exist for this patient", "error", 3000);
        }
       

       //var _cred = 'administrator : rB#d5E@P1!T9o';
       //const _headers = {
       //    'Content-Type': 'application/json;charset=utf-8',
       //    'Authorization': 'Basic ' + encoded
       //}
       //
       //const requestOptions = {
       //    method: 'POST',
       //    headers: _headers,
       //    body: JSON.stringify({ patient_id: id })
       //};
       //const response = await fetch(_baseUrl, requestOptions);
       //const data = await response.json();
    }
    return (
        <>
            <PageTitle title="Patient Statements" />
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

                        <Grid container className={classes.customGrid} direction="row" >

                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <RadioboxField
                                    id="patientStatementOption"
                                    name="patientStatementOption"
                                    value={state.patientStatementOption}
                                    labelPlacement="end"
                                    options={options}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid item xs={7} sm={7} lg={7} xl={7} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row" >

                            <Label title="Patient" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="patientId"
                                    name="patientId"
                                    value={state.patientName}
                                    searchTerm={state.patientName}
                                    searchId={searchPatientOption}
                                    elemCode="patientName"
                                    code="active_Patient_Search"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item, elemCode) => handleSearcdhListPatientChange(name, item, elemCode)}
                                    placeholderTitle="Search Patient"
                                />
                            </Grid>

                            <Label title="Location" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SearchList
                                    id="locationId"
                                    name="locationId"
                                    value={state.locationId}
                                    elemCode="locationName"
                                    searchTerm={state.locationName}
                                    code="get_all_active_locations"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item, elemCode) => handleSearcdhListPatientChange(name, item, elemCode)}
                                    placeholderTitle="Search Location"
                                    isUser={true}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />

                            {/* <Label title="Patient Group" size={2} isDisabled={true} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SelectField
                                    Disabled={true}
                                    id="patientGroup"
                                    name="patientGroup"
                                    value={state.patientGroup}
                                    options={patientGroupList}
                                    onChange={handleChange}
                                    label="Select Patient Group"
                                />
                            </Grid> */}

                        </Grid>

                        {/* <Grid container className={classes.customGrid} direction="row">

                            <Label title="Patient Flags" size={2} isDisabled={true} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SelectField
                                    Disabled={true}
                                    id="patientFlags"
                                    name="patientFlags"
                                    value={state.patientFlags}
                                    options={patientFlagsList}
                                    onChange={handleChange}
                                    label="Select Patient Flags"
                                />
                            </Grid>

                            <Label title="Selected Flags" size={2} isDisabled={true} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <SelectField
                                    Disabled={true}
                                    id="selectedFlags"
                                    name="selectedFlags"
                                    value={state.selectedFlags}
                                    options={selectedFlagsList}
                                    onChange={handleChange}
                                    label="Select Selected Flags"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid> */}

                        <Grid container className={classes.customGrid} direction="row" >

                            <Label title="Provider" size={2} />
                            <Grid item xs={12} sm={3} lg={3} xl={3}>


                                <SearchList
                                    id="providerId"
                                    name="providerId"
                                    elemCode="providerName"
                                    value={state.providerId}
                                    searchTerm={state.providerName}
                                    searchId={locationId}
                                    code="providers_by_location"
                                    apiUrl="ddl/loadItems"
                                    onChangeValue={(name, item,elemCode) => handleSearcdhListPatientChange(name, item,elemCode)}
                                    placeholderTitle="Search Provider"
                                />
                            </Grid>


                            <Label title="Statement ID" size={2} />

                            <Grid item xs={12} sm={3} lg={3} xl={3}>
                                <InputBaseField
                                    id="statementId"
                                    name="statementId"
                                    value={state.statementId}
                                    onChange={handleChange}
                                    placeholder="Statement ID"
                                />

                            </Grid>

                            <Grid item xs={2} sm={2} lg={2} xl={2} />


                        </Grid>

                        <Grid container className={classes.customGrid} direction="row" >


                            <Label title="Last Printed On" size={2} />

                            <Grid item xs={12} sm={3} lg={3} xl={3}>

                                <InputBaseField
                                    type="date"
                                    id="lastPrintedStatement"
                                    name="lastPrintedStatement"
                                    value={state.lastPrintedStatement}
                                    onChange={handleChange}

                                />
                            </Grid>

                            <Label title="Last Statements" size={2} />

                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                <SelectField
                                    id="lastStatements"
                                    name="lastStatements"
                                    value={state.lastStatements}
                                    onChange={handleChange}
                                    options={lastStatementsList}
                                    placeholder="Select Last Statement"
                                />
                            </Grid>

                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">

                            <Grid item xs={2} sm={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={4} lg={4} xl={4}>

                                <CheckboxField
                                    color="primary"
                                    name="includePatientsWithZero"
                                    checked={state.includePatientsWithZero}
                                    onChange={handleCheckBoxChange}
                                    label="Include  patients with zero balance or balance between"
                                />
                            </Grid>


                            <Label title="DOS" size={1} />

                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                <Grid container direction="row">
                                    <Grid item xs={12} sm={5} md={5} lg={5}>
                                        <input
                                            type="date"
                                            id="DOSFrom"
                                            name="DOSFrom"
                                            value={state.DOSFrom}
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
                                            id="DOSTo"
                                            name="DOSTo"
                                            value={state.DOSTo}
                                            onChange={handleChange}
                                            className={classes.dateInput}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>






                        </Grid>

                        <Grid container className={classes.customGrid} direction="row">
                           <Grid item xs={2} sm={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                <Grid container direction="row">
                                    <Grid item xs={12} sm={5} md={5} lg={5}>
                                        <InputBaseField
                                            id="balanceFrom"
                                            name="balanceFrom"
                                            type="number"
                                            disabled={!state.includePatientsWithZero}
                                            value={state.balanceFrom}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2}>
                                        <Label title="To" size={12} />
                                    </Grid>
                                    <Grid item xs={12} sm={5} md={5} lg={5}>
                                        <InputBaseField
                                            id="balanceTo"
                                            name="balanceTo"
                                            value={state.balanceTo}
                                            type="number"
                                            disabled={!state.includePatientsWithZero}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid item xs={12} sm={5} lg={5} xl={5} >
                                <Grid container justify="flex-end">
                                    <FormBtn id="save" onClick={reloadGrid} btnType="search">Search</FormBtn>
                                    <FormBtn id="reset" onClick={clearValues} >Clear</FormBtn>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sm={2} lg={2} xl={2} />



                        </Grid>

                     
                    </Grid>

                </Collapse>
            </div >
            <div className={classes.gridArea}>
                <div className={classes.gridButtonsArea}>
                    <Grid container direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="right">
                            <Button onClick={handleGeneratePatientStatement} className={classes.gridButton}>Generate Statement</Button>
                        </Grid>
                    </Grid>
                    {/*<Grid container direction="row">*/}
                    {/*    <Grid item xs={6} sm={8} md={8} lg={8} xl={8}>*/}
                    {/*        <Grid container direction="row">*/}

                    {/*            <Label title="Statement Due Date" size={1} />*/}

                    {/*            <Grid item xs={3} sm={2} md={2} lg={2} xl={2}>*/}

                    {/*                <InputBaseField*/}
                    {/*                    IsDisabled={true}*/}
                    {/*                    type="date"*/}
                    {/*                    id="statementDueDate"*/}
                    {/*                    name="statementDueDate"*/}
                    {/*                    value={printState.statementDueDate}*/}
                    {/*                    onChange={handlePrintFilterChange}*/}
                    {/*                />*/}

                    {/*            </Grid>*/}

                    {/*            <Grid item xs={3} sm={4} md={4} lg={4} xl={4}>*/}

                    {/*                <CheckboxField*/}
                    {/*                    IsDisabled={true}*/}
                    {/*                    color="primary"*/}
                    {/*                    name="includeStatementsWithNotes"*/}
                    {/*                    checked={printState.includeStatementsWithNotes}*/}
                    {/*                    onChange={handlePrintFilterCheckBoxChange}*/}
                    {/*                    label="Include Statements with notes"*/}
                    {/*                />*/}

                    {/*            </Grid>*/}

                    {/*            <Grid item xs={3} sm={5} md={5} lg={5} xl={5}>*/}

                    {/*                <CheckboxField*/}
                    {/*                    IsDisabled={true}*/}
                    {/*                    color="primary"*/}
                    {/*                    name="includeSummaryWithBalance"*/}
                    {/*                    checked={printState.includeSummaryWithBalance}*/}
                    {/*                    onChange={handlePrintFilterCheckBoxChange}*/}
                    {/*                    label="Include a summary with balance with each Provider"*/}
                    {/*                />*/}

                    {/*            </Grid>*/}

                    {/*        </Grid>*/}

                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>*/}
                    {/*        <Grid container direction="row" >*/}
                    {/*            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>*/}

                    {/*                <CheckboxField*/}
                    {/*                    IsDisabled={true}*/}
                    {/*                    color="primary"*/}
                    {/*                    name="includeLineItemWithZeroBalance"*/}
                    {/*                    checked={printState.includeStatementsWithNotes}*/}
                    {/*                    onChange={handlePrintFilterCheckBoxChange}*/}
                    {/*                    label="Include line item with zero balance"*/}
                    {/*                />*/}

                    {/*            </Grid>*/}
                    {/*            <Grid item xs={12} sm={5} lg={5} xl={5} >*/}
                    {/*                <Grid container direction="row" justify="flex-end" alignItems="center" >*/}
                    {/*                    <Grid item xs={12} sm={12} lg={12} xl={12} >*/}

                    {/*                        <Button disabled={true} className={classes.gridButton}>Export</Button>*/}
                    {/*                        <ButtonGroup ref={anchorRef} aria-label="split button">*/}
                    {/*                            <Button disabled={true} onClick={handleClick} className={classes.gridButton}>Print</Button>*/}
                    {/*                            <Button*/}
                    {/*                                disabled={true}*/}
                    {/*                                size="small"*/}
                    {/*                                aria-controls={open ? 'split-button-menu' : undefined}*/}
                    {/*                                aria-expanded={open ? 'true' : undefined}*/}
                    {/*                                aria-label="select merge strategy"*/}
                    {/*                                aria-haspopup="menu"*/}
                    {/*                                onClick={handleToggle}*/}
                    {/*                                className={classes.gridArrowButton}*/}
                    {/*                            >*/}
                    {/*                                <ArrowDropDownIcon />*/}
                    {/*                            </Button>*/}
                    {/*                        </ButtonGroup>*/}
                    {/*                        <Popper style={{ zIndex: 900 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>*/}
                    {/*                            {({ TransitionProps, placement }) => (*/}
                    {/*                                <Grow*/}
                    {/*                                    {...TransitionProps}*/}
                    {/*                                    style={{*/}
                    {/*                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',*/}
                    {/*                                    }}*/}
                    {/*                                >*/}
                    {/*                                    <Paper >*/}
                    {/*                                        <ClickAwayListener onClickAway={handleClose}>*/}
                    {/*                                            <MenuList id="split-button-menu">*/}
                    {/*                                                {btnOptions.map((option, index) => (*/}
                    {/*                                                    <MenuItem*/}
                    {/*                                                        key={option}*/}
                    {/*                                                        selected={option === selectedButton}*/}
                    {/*                                                        onClick={(event) => handleMenuItemClick(event, option)}*/}
                    {/*                                                    >*/}
                    {/*                                                        {option}*/}
                    {/*                                                    </MenuItem>*/}
                    {/*                                                ))}*/}
                    {/*                                            </MenuList>*/}
                    {/*                                        </ClickAwayListener>*/}
                    {/*                                    </Paper>*/}
                    {/*                                </Grow>*/}
                    {/*                            )}*/}
                    {/*                        </Popper>*/}

                    {/*                    </Grid>*/}
                    {/*                </Grid>*/}
                    {/*            </Grid>*/}

                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </div>

                <EditAbleGrid
                    apiUrl="patientstatement/loadGrid"
                    dataId={searchParams}
                    isUpdate={isUpdate}
                    columnCode="PatientStatement"
                    pageSize={5}
                    ischeckboxes={true}
                    //onAddNew={handleAddNew}
                    onEdit={previewPatientStatement}
                    // onDelete={handleDelete}
                    isRowClickAble={false}
                    isSelection={true}
                    getSelectedRows={(keys) => getSelection(keys)}
                />
            </div>
        </>
    )
}
export default withSnackbar(PatientStatement)