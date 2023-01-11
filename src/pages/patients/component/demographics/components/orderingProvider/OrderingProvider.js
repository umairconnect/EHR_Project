import React, { useState, useEffect } from "react";
import {
    Grid,
    FormHelperText,
    FormLabel,
    Button
} from '@material-ui/core';
import useStyles from "./styles";
import { PostDataAPI, PutDataAPI } from '../../../../../../Services/APIService';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { InputBaseField, InputBaseFieldNumber, TextareaField, SelectField } from "../../../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, FooterBtn, Label } from "../../../../../../components/UiElements";
import { USAStateListOptions, CountryListOptions } from "../../../../../../context/StaticDropDowns";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import SearchList from "../../../../../../components/SearchList/SearchList";
import PrintIcon from '../../../../../../images/icons/printIconBig.png';
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

function OrderingProvider(props) {
    var classes = useStyles();

    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dataId, setDataId] = useState(props.dataId);
    const [state, setState] = useState({

        providerRefOrdID: 0, ordProviderId: "", PatientId: dataId, primaryProviderId: 0, firstName: "", middleName: "", lastName: "",
        suffix: "", npiNumber: "", qualifierCode: "", qaulifierNumber: "", specliaty: "", address: "",
        city: "", zipCode: "", state: "", country: "", typeCode: "ord", createDate: "", createdBy: 0,
        updatedBy: 0, isDeleted: false
    });

    const orderingProviderRef = useState({ lastNameRef: "", firstNameRef: "", specialityRef: "", npiRef: "", });

    const [errorMessages, setErrorMessages] = useState({
        errorFirstName: false, errorLastName: false, errorSpecialty: false, errorNPI: false, errorNPILength: false
    })

    const [isSaveCall, setIsSaveCall] = useState(false);
    const [providerFormSpeciality, setProviderFormSpeciality] = useState([]);
    const [suffixCodes, setSuffixCodes] = useState([]);
    const [orderingProvider, setOrderingProvider] = useState([]);
    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    let objOrderingProvider;

    useEffect(() => {

        initialization();
        cleanValuesFields();
        loadOrderingProvider();

    }, []);

    const QualifierOptions = [
        {

            value: "State License #",
            label: "State License #",
        },
        {
            value: "Provider UPIN #",
            label: "Provider UPIN #",
        },
        {
            value: "Provider Commercial #",
            label: "Provider Commercial #",
        },
    ];
    const [pageLoading, setPageLoading] = useState(false);
    function initialization() {
        setPageLoading(true)
        GetDataAPI("user/getAllSpecialities", '').then((result) => {
            setPageLoading(false)
            if (result.success && result.data != null) {
                setProviderFormSpeciality(
                    result.data.map((item, i) => {
                        return { value: item.specializationID, label: item.name };
                    }));
            }

        })

        var params = {
            code: "DDL_List_Item",
            parameters: ['suffix_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {


                result.data.map((item, i) => {

                    if (item.text3 == 'suffix_code')
                        suffixCodes.push({ value: item.text1, label: item.text2 });

                })
            }
        })
    }

    objOrderingProvider = [...new Map(orderingProvider.map(o => [o["label"], o])).values()]; // Removed Repeted Data

    const handleChange = e => {

        const { name, value } = e.target;

        if (value.trim() === "" && value !== "") {
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


    };

    const handleOrdProviderChange = (name, item) => {

        // const { name, value } = e.target;
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        GetSelectedRefOrdProvider(parseInt(id));
    };

    function GetSelectedRefOrdProvider(id) {

        PostDataAPI("refOrdProvider/getSelectedRefOrdProvider", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {
                result.data.providerRefOrdID = state.providerRefOrdID;
                result.data.createDate = state.createDate;
                result.data.createdBy = state.createdBy;
                result.data.ordProviderId = result.data.firstName + ' ' + result.data.lastName;
                setState(result.data);

            }
        })
    }

    const SaveOrderingProvider = () => {

        let errorList = [];
        validateOrderingProvider(errorList);

        if (errorList.length < 1) {
            setIsSaveCall(true);

            state.primaryProviderId = isNaN(parseInt(state.primaryProviderId)) ? 0 : parseInt(state.primaryProviderId);
            state.patientID = parseInt(dataId);
            state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;

            let method = "refOrdProvider/addRefOrderProvider";

            if (state.providerRefOrdID > 0) {

                method = "refOrdProvider/updateRefOrdProvider";

            }

            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);


                    if (state.providerRefOrdID < 1) {

                        if (result.success === true && result.data != null) {

                            showMessage("Success", "Ordering provider saved successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.ordProviderId = result.data.firstName + ' ' + result.data.lastName + ' ( ' + result.data.specialtyName + ' )';
                            // setState(result.data);


                        }
                    }
                    else if (state.providerRefOrdID > 0) {

                        if (result.success) {

                            showMessage("Success", "Ordering provider updated successfully.", "success", 3000);
                            setIsSaveCall(false);
                            result.data.ordProviderId = result.data.firstName + ' ' + result.data.lastName + ' ( ' + result.data.specialtyName + ' )';
                            setState(result.data);


                        }
                    }

                }
                else {

                    setIsSaveCall(false);
                    showMessage("Error", result.message, "error", 3000);

                }
            })

            setIsSaveCall(false);
        }

    }

    function validateOrderingProvider(errorList) {

        if (state.patientID < 1) {
            showMessage("Error", "Please select a patient", "error", 3000);
            errorList.push(true);
        }
        if (state.npiNumber === null || state.npiNumber == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPI: true
            }));
            errorList.push(true);
            //orderingProviderRef.npiRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPI: false
            }));
        }
        if (state.npiNumber != null && state.npiNumber != "" && state.npiNumber.length < 10) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPILength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNPILength: false
            }));
        }

        if (state.specliaty === null || state.specliaty == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecialty: true
            }));
            errorList.push(true);
            //orderingProviderRef.specialityRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecialty: false
            }));
        }

        if (state.lastName === null || state.lastName == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
            //orderingProviderRef.lastNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }

        if (state.firstName === null || state.firstName == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            errorList.push(true);
            // orderingProviderRef.firstNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }

    }

    const handleNPIChange = e => {

        if (parseInt(e.target.value.length) >= 0 && e.target.value != "-0") {
            if (e.target.value.length == 0 || e.target.value.length <= 10) {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleZipChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

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

    function cleanValuesFields() {

        setErrorMessages({

            errorFirstName: false, errorLastName: false, errorSpecialty: false, errorNPI: false
        });

        if (state.providerRefOrdID > 0) {
            loadOrderingProvider();
        }
        else {
            setState({

                providerRefOrdID: 0, ordProviderId: "", PatientId: dataId, primaryProviderId: 0, firstName: "", middleName: "",
                lastName: "", suffix: "", npiNumber: "", qualifierCode: "", qaulifierNumber: "", specliaty: "", address: "",
                city: "", zipCode: "", state: "", country: "", typeCode: "ord", createDate: "", createdBy: 0,
                updatedBy: 0, isDeleted: false

            });

        }

    }

    function loadOrderingProvider() {

        let data = {

            providerRefOrdID: dataId.dataId ? parseInt(dataId.dataId) : parseInt(dataId),
            typeCode: "ord"
        };

        PostDataAPI("refOrdProvider/getRefOrdProvider", data).then((result) => {

            if (result.success && result.data != null) {
                setState(result.data);
            }
        })
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient ordering provider screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    useEffect(() => {
        saveAuditLogInfo()
    }, []);
    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                {pageLoading ? <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> :
                    <form id="ordering-form" className={classes.formAlignment}>
                        <Grid container >
                            <Grid item lg={12} container direction="row">
                                <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}
                                >
                                    <FormLabel className={classes.lableInput}>Search Provider:</FormLabel>
                                </Grid>
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SearchList name="ordProviderId" value={state.ordProviderId} searchTerm={state.ordProviderId} code="orderingProvider"
                                        apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleOrdProviderChange(name, item)}
                                        placeholderTitle="Search Provider" />

                                </Grid>
                                {/*<Button className={classes.printBtnIcon} startIcon={<img src={PrintIcon} />}
                                    onClick={() => {
                                        showMessage("Information", "Feature will be added soon.", "info", 2000);
                                    }}
                                >Print</Button>*/}
                            </Grid>
                            <FormGroupTitle>Ordering Provider Info</FormGroupTitle>

                            <Grid item lg={12} container direction="row">
                                <Label title="First Name" size={2} mandatory={true} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        name="firstName"
                                        value={state.firstName}
                                        MaxLength='100'
                                    //inputProps={{ ref: input => orderingProviderRef.firstNameRef = input }}
                                    />
                                    {errorMessages.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter first name
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Middle Name" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Middle Name"
                                        onChange={handleChange}
                                        name="middleName"
                                        value={state.middleName}
                                        MaxLength='100'
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Last Name" size={2} mandatory={true} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        name="lastName"
                                        value={state.lastName}
                                        MaxLength='100'
                                    //inputProps={{ ref: input => orderingProviderRef.lastNameRef = input }}
                                    />
                                    {errorMessages.errorLastName && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter last name
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Label title="Suffix" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Suffix"
                                        onChange={handleChange}
                                        name="suffix"
                                        value={state.suffix}
                                        options={suffixCodes}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Specialty" size={2} mandatory={true} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Specialty"
                                        onChange={handleChange}
                                        name="specliaty"
                                        value={state.specliaty}
                                        options={providerFormSpeciality}
                                    //inputProps={{ ref: input => orderingProviderRef.specialityRef = input }}
                                    />
                                    {errorMessages.errorSpecialty && !state.specliaty ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter specialty
                                    </FormHelperText>) : ('')}

                                </Grid>
                                <Label title="NPI #" size={2} mandatory={true} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseFieldNumber
                                        placeholder="NPI"
                                        onChange={handleNPIChange}
                                        name="npiNumber"
                                        type="Number"
                                        value={state.npiNumber}
                                        MaxLength='10'
                                        MinValue="10"
                                    //inputProps={{ ref: input => orderingProviderRef.npiRef = input }} errorNPILength
                                    />
                                    {errorMessages.errorNPI && !state.npiNumber ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter NPI
                                    </FormHelperText>) : ('')}
                                    {errorMessages.errorNPILength ? (<FormHelperText style={{ color: "red" }} >
                                        NPI must be 10 digits
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Qualifier" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select Qualifier"
                                        onChange={handleChange}
                                        name="qualifierCode"
                                        value={state.qualifierCode}
                                        options={QualifierOptions}
                                    />
                                </Grid>
                                <Label title="Number" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Number"
                                        onChange={handleChange}
                                        name="qaulifierNumber"
                                        value={state.qaulifierNumber}
                                        MaxLength='50'
                                    />
                                </Grid>

                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Address" isTextAreaInput={true} size={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3}>
                                    <TextareaField
                                        rowsMin={5}
                                        placeholder="Address"
                                        onChange={handleChange}
                                        name="address"
                                        value={state.address}
                                        MaxLength="4000"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="City" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="City"
                                        onChange={handleChange}
                                        name="city"
                                        value={state.city}
                                        MaxLength='255'
                                    />
                                </Grid>
                                <Label title="State" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Select State"
                                        onChange={handleChange}
                                        name="state"
                                        value={state.state}
                                        options={USAStateListOptions}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12} container direction="row">
                                <Label title="Zip Code" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Zip Code"
                                        onChange={handleZipChange}
                                        name="zipCode"
                                        value={state.zipCode}
                                        MaxLength='50'
                                    />
                                </Grid>
                                <Label title="Country" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        onChange={handleChange}
                                        name="country"
                                        value={state.country}
                                        options={CountryListOptions}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item lg={12}
                                container
                                direction="row">
                                <Grid item lg={3}
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end">

                                </Grid>
                            </Grid>
                            <Grid item lg={12}
                                container
                                direction="row">
                                <Grid item lg={3}
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end">
                                    <br />
                                </Grid>

                                <LogDialog
                                    code="ordrefprovider"
                                    id={state.providerRefOrdID}
                                    dialogOpenClose={logdialogstate}
                                    onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
                                />
                                <Grid container direction="row">
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                        <FooterBtn className={classes.footerBtn}>
                                            <FormBtn id={"save"} size="medium" disabled={isSaveCall || !props.isEditable} onClick={SaveOrderingProvider}>Save</FormBtn>
                                            <FormBtn id={"reset"} size="medium" onClick={cleanValuesFields}>resetBtn </FormBtn>
                                            {dataId != 0 ?
                                                <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                                : null
                                            }
                                        </FooterBtn>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </form>}
            </ShadowBoxMin>
        </>
    );
}
export default withSnackbar(OrderingProvider)
