import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import Info from "../../../../../../images/icons/info.png"
import Settings from "../../../../../../images/icons/settings.png"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Button,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    InputBase,
    InputAdornment,
    FormHelperText,
    DialogTitle,
    Divider,
    Chip,
    Radio,
    RadioGroup,
} from "@material-ui/core"
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { InputBaseField, InputBaseFieldNumber, RadioboxField, TextareaField, SelectField } from "../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import Scrollbars from "rc-scrollbars";
import SigBuilder from "../sigBuilder/SigBuilder";
import { Alert, AlertTitle } from "@material-ui/lab";

function PharmacySearch({ handleClose, handleBack, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [statePharmacy, setStatePharmacy] = useState({ pharmacyType: "All", searchNear: "", searchName: "", searchZip: "" });
    const [pharmaciesList, setPharmaciesList] = useState([]);
    const [searchingPharmaciesList, setSearchingPharmaciesList] = useState([]);
    const [state, setState] = useState(props.pharmacyInformationState);
    const pharmacyTypeList = [
        {
            value: "Retail",
            label: "Retail",
            className: 'adjustLabels',
        },
        {
            value: "Mail Order",
            label: "Mail Order",
            className: 'adjustLabels',
        },
        {
            value: "All",
            label: "All",
            className: 'adjustLabels',
        },
    ];
    const nearPlacesList = [
        { label: "Patient", value: 1, },
        { label: "Facility", value: 2, }
    ]

    const [pharmacystate, setPharmacyState] = useState({ optSelectPharmacy: false });
    //const pharmaciesList = [
    //    {
    //        name: "ScriptDash Pharmacy",
    //        address: "1400 Tennessee St. San Franscisco, CA(415) 214-8611    Fax (415) 484-7058",
    //        info: "Retals  | Controled Substances"
    //    }
    //]
    const handleChange = (e) => {

        const { name, value } = e.target;

        setStatePharmacy(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleChangeRadio = (id, name) => {

        pharmaciesList.filter(tmprm => tmprm.id === id).map((item, i) => {

            setState(prevState => ({
                ...prevState,
                selectedPharmacy: item
            }));

            //setSelectedPharmaciesList(item);
        })

        setStatePharmacy(prevState => ({
            ...prevState,
            [name]: true
        }))
    }


    const addRecentPharmacy = (obj) => {

        var _pharmaciesList = [];

        if (pharmaciesList) {
            if (pharmaciesList.filter(tmprm => tmprm.id === obj.id && tmprm.name === obj.name) == "") {

                pharmaciesList.map((item, i) => {
                    _pharmaciesList.push({ id: item.id, name: item.name, address: item.address, info: item.info });
                });



            }
            else {

                showMessage("Error", "Pharmacy already exists", "error", 8000);

                return;
            }

        }

        _pharmaciesList.push({ id: obj.id, name: obj.name, address: obj.address, info: obj.info });

        setState(prevState => ({
            ...prevState,
            pharmaciesList: _pharmaciesList
        }));
    }

    function searchPharmacyByParameters(pharmacyType, searchName, searchZip, isLoad) {

        var params = {
            code: "medication_pharmacy_search",
            parameters: [pharmacyType, searchName, searchZip]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                if (isLoad === true) {

                    setPharmaciesList(
                        result.data.map((item, i) => {
                            return { id: item.id, name: item.text1, address: item.text2 ? item.text2 : null + '' + item.text3 ? item.text3 : null, info: item.text4 ? item.text4 : null + " | Controled Substances" };
                        }));
                }

                setSearchingPharmaciesList(
                    result.data.map((item, i) => {
                        return { id: item.id, name: item.text1, address: item.text2 ? item.text2 : null + '' + item.text3 ? item.text3 : null, info: item.text4 ? item.text4 : null + " | Controled Substances" };
                    }));

            }

        })

    }

    useEffect(() => {

        //console.log(state);
        searchPharmacyByParameters(statePharmacy.pharmacyType.toString(), statePharmacy.searchName.toString(), statePharmacy.searchZip.toString(), true);

    }, []);



    function clear() {

        setStatePharmacy({ pharmacyType: "All", searchNear: "", searchName: "", searchZip: "" });
        searchPharmacyByParameters("", "", "", false);

    }

    function addPharmacy() {
        if (state.selectedPharmacy) {
            if (state.selectedPharmacy.name === "" || state.selectedPharmacy.name === null || state.selectedPharmacy.name === undefined) {
                showMessage("Error", "Please select pharmacy", "error", 8000);
                return;
            }
        }

        //console.log(state);
        // state.selectedPharmaciesList = selectedPharmaciesList;
        //handleBack(selectedPharmaciesList);

        handleBack(state);

    }

    const handleDrugChange = (name, item) => {


        const { id, value } = item;

        var _medicationList = [];

        // To empty Search List

        setState(prevState => ({
            ...prevState,
            rxnorm: id,
            drugName: value
        }));

        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                rxnorm: '',
                drugName: ''
            }));
        }, 100);

        // To empty Search List

        if (state.medicationList) {
            if (state.medicationList.filter(tmprm => tmprm.rxNorm === id && tmprm.drugName === value) == "") {
                state.medicationList.map((itm, i) => {

                    _medicationList.push({ rxNorm: itm.rxNorm, drugName: itm.drugName, alert: itm.alert, warning: itm.warning });
                });

            }
            else {

                showMessage("Error", "Medicine already exists", "error", 8000);

                return;
            }

        }

        _medicationList.push({ rxNorm: id, drugName: value, alert: 'No drug and allergy alerts triggered for this medication.', warning: 'No active or valid coverage found.' });

        setState(prevState => ({
            ...prevState,
            medicationList: _medicationList
        }));


    }


    return (
        <>
            <div className={classes.DialogContentLeftSide}>
                <div className={classes.box}>
                    <div className={classes.leftHeader}>
                        <FormLabel className={classes.leftHeaderTitle}>Recent Prescriptions</FormLabel>
                    </div>
                    <div className={classes.content}>
                        <ul className={classes.pharmaciesList}>
                            {
                                pharmaciesList.map((item) => {
                                    return (
                                        <li onClick={() => addRecentPharmacy(item)}>
                                            <FormLabel className={classes.pharmacyName}>{item.name}</FormLabel>
                                            <Typography className={classes.pharmacyAddress}>{item.address}</Typography>
                                            <Typography className={classes.pharmacyInfo}>{item.info}</Typography>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={classes.footer}>
                    </div>
                </div>
            </div>
            <div className={classes.DialogContentRightSide}>
                <div className={classes.box}>
                    <div className={classes.header}>
                        <FormGroupTitle>Pharmacy Search</FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>

                        <Grid lg={12} container direction="row">

                            <Label title="Type" size={2} />

                            <Grid item xs={12} sm={9} md={9} lg={8} >
                                <RadioboxField
                                    id="pharmacyType"
                                    name="pharmacyType"
                                    value={statePharmacy.pharmacyType}
                                    labelPlacement="end"
                                    onChange={handleChange}
                                    options={pharmacyTypeList}
                                />
                            </Grid>

                        </Grid>

                        <Grid lg={12} container direction="row">
                            <Label title="Search Near" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField
                                    placeholder="Select search near"
                                    id="searchNear"
                                    name="searchNear"
                                    onChange={handleChange}
                                    value={statePharmacy.searchNear}
                                    options={nearPlacesList}
                                />
                            </Grid>
                        </Grid>

                        <Grid lg={12} container direction="row">
                            <Label title="Search by Name" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                <InputBaseField
                                    id="searchName"
                                    name="searchName"
                                    value={statePharmacy.searchName}
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Label title="Search by Zip" size={2} />
                            <Grid item xs={12} sm={3} md={3} lg={3} >
                                <InputBaseField
                                    id="searchZip"
                                    name="searchZip"
                                    value={statePharmacy.searchZip}
                                    placeholder="ZIP"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <div className={classes.footer}>
                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={11} md={11} lg={11} >
                                    <div className={classes.footerRight}>
                                        <FormBtn id={"reset"} size="medium" onClick={clear}>Clear</FormBtn>
                                        <FormBtn id={"save"} size="medium" onClick={() => searchPharmacyByParameters(statePharmacy.pharmacyType, statePharmacy.searchName, statePharmacy.searchZip, false)} btnType="search">Search</FormBtn>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ margin: "20px 0px" }}>

                            <Grid lg={12} container direction="row">

                                <Grid item xs={12} sm={11} md={11} lg={11} >
                                    <FormLabel className={classes.patientTitle}>Selected Pharmacy:</FormLabel>
                                    <div className={classes.selectedPharmacy}>
                                        {state.selectedPharmacy.name != "" ?
                                            <>
                                                <FormLabel className={classes.selectedPharmacyName}>{state.selectedPharmacy ? state.selectedPharmacy.name : ""}</FormLabel>
                                                <Typography className={classes.pharmacyAddress}>
                                                    {state.selectedPharmacy ? state.selectedPharmacy.address : ""}
                                                </Typography>
                                                <Typography className={classes.pharmacyInfo}>{state.selectedPharmacy ? state.selectedPharmacy.info : ""}</Typography>
                                            </> :
                                            <>
                                                <FormLabel className={classes.selectedPharmacyName}></FormLabel>
                                                <Typography className={classes.pharmacyAddress}>
                                                    No Selected Pharmacy
                                                </Typography>
                                                <Typography className={classes.pharmacyInfo}></Typography>
                                            </>
                                        }
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid lg={12} container direction="row">
                                <Grid item xs={12} sm={11} md={11} lg={11} >
                                    <FormLabel className={classes.selectedPharmacyTitle}>Recent Search Results:</FormLabel>
                                    <ul className={classes.searchedPharmacy}>
                                        {
                                            searchingPharmaciesList.map((item, i) => {
                                                return <li>
                                                    <FormLabel className={classes.selectedPharmacyName}>{item.name}</FormLabel>
                                                    <Radio
                                                        color="primary"
                                                        name="selectedPharmacyName"
                                                        onChange={() => handleChangeRadio(item.id, "optSelectPharmacy_" + i)}
                                                        value={item.name}
                                                        checked={state.selectedPharmacy.name && state.selectedPharmacy.name != undefined ?
                                                            state.selectedPharmacy.name == item.name : false}
                                                        classes={{ root: classes.radioRoot }}
                                                    />
                                                    <Typography className={classes.pharmacyAddress}>
                                                        {item.address}
                                                    </Typography>
                                                    <Typography className={classes.pharmacyInfo}>{item.info} | Controled Substances</Typography>
                                                </li>
                                            })
                                        }

                                    </ul>
                                </Grid>
                            </Grid>

                        </div>

                    </div>
                    <div className={classes.footer}>
                        <Grid lg={12} container direction="row">
                            <Grid item xs={12} sm={11} md={11} lg={11} >
                                <div className={classes.footerRight}>
                                    <FormBtn id={"reset"} onClick={handleBack} size="medium" >Cancel</FormBtn>
                                    {/*<FormBtn id={"delete"} size="medium">Delete</FormBtn>*/}
                                    <FormBtn id={"save"} onClick={addPharmacy} size="medium" btnType="next">Next</FormBtn>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withSnackbar(PharmacySearch)
