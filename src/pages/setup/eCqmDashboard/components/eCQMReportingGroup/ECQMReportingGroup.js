import React, { useState, useEffect } from "react";
//material ui
import { Dialog, Grid } from "@material-ui/core";
//images
import CloseIcon from "../../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../../images/icons/trash.png"
//scrollbar
import { Scrollbars } from 'rc-scrollbars';
//custom components
import { withSnackbar } from '../../../../../components/Message/Alert';
import { InputBaseField, RadioboxField, SelectField } from "../../../../../components/InputField/InputField";
import { FormGroupTitle, FormBtn, DraggableComponent, Label, ErrorMessage } from "../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import SearchList from "../../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";

function ECQMReportingGroup({ dialogState, handleClose, handleSave, showMessage, ...props }) {
    const groupTypeOptions = [

        {
            value: "tin",
            label: "Tax ID Number (TIN)",
            className: 'adjustLabels',
        },
        {
            value: "location",
            label: "Site Level (Facility)",
            className: 'adjustLabels',
        },
        {
            value: "others",
            label: "Others",
            className: 'adjustLabels',
        },
    ];
    const options = [

        {
            value: "2022",
            label: "2022",
        },
        {
            value: "2021",
            label: "2021",
        },
        {
            value: "2020",
            label: "2020",
        },
    ];
    const [errorMessages, setErrorMessages] = useState({});
    // handle styles
    const classes = useStyles();
    const currentYear = new Date().getFullYear().toString();
    // stepper values
    const [state, setState] = useState({ groupName: '', reportingYear: currentYear, type: 'tin', typeValue: '', locationId: null, lstGroupProvider: [] });
    const [locationOptions, setLocationOptions] = useState([]);
    const [performanceYearsList, setPerformanceYearsList] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSearchListChange = (name, item) => {

        const { id, value, extraParam1, extraParam2 } = item;
        if (value == '') {
            return;
        }
        if (state.lstGroupProvider.some(t => t.providerId == id && t.isDeleted != true)) {
            showMessage("Error", "Provider already added.", "error", 3000);
            state.providerId = 0;
            state.providerName = " ";
        }
        else {
            let objGroupProvider = { providerId: parseInt(id), isDeleted: false, providerName: value, email: extraParam1, speciality: extraParam2 };
            setState(prevState => ({
                ...prevState,
                providerId: id,
                providerName: value,
                lstGroupProvider: [...prevState.lstGroupProvider, objGroupProvider]
            }));
        }
        setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                providerId: '',
                providerName: ''
            }));
        }, 200);
    }
    const loadPerformanceYearsList = () => {
        let _years = [];
        let currentYear = new Date().getFullYear();
        for (var i = 0; i < 10; i++) {
            _years.push({ value: currentYear - i, label: currentYear - i });
        }

        setPerformanceYearsList(_years);

    }
    const Save = e => {
        let errorList = [];

        ValidateSave(errorList);
        if (errorList.length < 1) {
            if (state.type == 'location')
                state.locationId = parseInt(state.locationId);
            else state.locationId = null;

            let method = "ecqm/saveReportingGroup";

            PostDataAPI(method, state, true).then((result) => {
                if (result.success == true) {
                    if (result.success && result.data != null) {

                        showMessage("Success", "eCQM reporting group saved successfully.", "success", 2000);
                        handleSave();
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };
    const ValidateSave = (errorList) => {
        if (!state.groupName || state.groupName.trim() == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGroupName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGroupName: false
            }));
        }
        if (!state.reportingYear || state.reportingYear.trim() == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorReportingYear: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorReportingYear: false
            }));
        }
        if (state.type == 'tin' && (!state.typeValue || state.typeValue.trim() == '')) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTypeValue: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTypeValue: false
            }));
        }
        if (state.type == 'location' && (!state.locationId || !state.locationId > 0)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: false
            }));
        }
        if (state.type == 'others' && (!state.lstGroupProvider || state.lstGroupProvider.filter(t => t.isDeleted != true).length == 0)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGroupProvider: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGroupProvider: false
            }));
        }
    }
    const loadAllLocations = () => {

        var params = {
            code: "get_all_active_locations",
            parameters: ['']
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setLocationOptions(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });

    }
    const handleDeleteProvider = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = state.lstGroupProvider.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setState(prevState => ({
                ...prevState,
                lstGroupProvider: updatedList
            }));
        });
    }
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
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
    useEffect(() => {
        loadPerformanceYearsList();
        loadAllLocations();
    }, [state.type])

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogState}
                disableEnforceFocus
                maxWidth={"md"}
                {...props}
            >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}>
                                <img src={CloseIcon} />
                            </span>
                            <FormGroupTitle>eCQM Reporting Group</FormGroupTitle>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: "330px" }}>
                                <Grid
                                    container
                                    direction="row"
                                    style={{ paddingRight: "17px" }}
                                >
                                    <Grid item lg={12}>
                                        <Grid container>
                                            <Label title="Group Name" size={4} mandatory={true} />
                                            <Grid item sm={8} md={8} lg={8} xl={8}>
                                                <InputBaseField
                                                    id="groupName"
                                                    name="groupName"
                                                    onChange={handleChange}
                                                    value={state.groupName}
                                                    placeholder="Group Name"
                                                    MaxLength={50}
                                                />
                                                {errorMessages.errorGroupName && (!state.groupName || state.groupName.trim() == "") ? (<ErrorMessage>
                                                    Please enter group name
                                                </ErrorMessage>) : ('')}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Label title="Reporting Year" size={4} mandatory={true} />
                                            <Grid item sm={8} md={8} lg={8} xl={8}>
                                                <SelectField
                                                    id="reportingYear"
                                                    name="reportingYear"
                                                    options={performanceYearsList}
                                                    onChange={handleChange}
                                                    value={state.reportingYear}
                                                    placeholder="Select Reporting Year"
                                                />
                                                {errorMessages.errorReportingYear && (!state.reportingYear || state.reportingYear.trim() == "") ? (<ErrorMessage>
                                                    Please select reporting year
                                                </ErrorMessage>) : ('')}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Label title="Group Type" size={4} isTextAreaInput={true} mandatory={true} />
                                            <Grid item sm={8} md={8} lg={8} xl={8}>
                                                <RadioboxField
                                                    id="type"
                                                    name="type"
                                                    labelPlacement="end"
                                                    onChange={handleChange}
                                                    options={groupTypeOptions}
                                                    value={state.type}
                                                />
                                            </Grid>
                                        </Grid>
                                        {
                                            state.type === "tin" &&
                                            <Grid container>
                                                <Grid item sm={4} md={4} lg={4} xl={4} />
                                                <Grid item sm={8} md={8} lg={8} xl={8}>
                                                    <InputBaseField
                                                        id="typeValue"
                                                        name="typeValue"
                                                        labelPlacement="end"
                                                        onChange={handleChange}
                                                        value={state.typeValue}
                                                        MaxLength={50}
                                                    />
                                                    {errorMessages.errorTypeValue && (state.type == 'tin' && (!state.typeValue || state.typeValue.trim() == "")) ? (<ErrorMessage>
                                                        Please enter TIN value
                                                    </ErrorMessage>) : ('')}
                                                </Grid>
                                            </Grid>
                                        }
                                        {
                                            state.type === "location" &&
                                            <Grid container>
                                                <Grid item sm={4} md={4} lg={4} xl={4} />
                                                <Grid item sm={8} md={8} lg={8} xl={8}>
                                                    <SelectField
                                                        id="locationId"
                                                        name="locationId"
                                                        value={state.locationId}
                                                        onChange={handleChange}
                                                        placeholder="Select Practice"
                                                        options={locationOptions}
                                                    />
                                                    {errorMessages.errorLocation && (state.type == 'location' && (!state.locationId || !state.locationId > 0)) ? (<ErrorMessage>
                                                        Please select practice
                                                    </ErrorMessage>) : ('')}
                                                </Grid>
                                            </Grid>
                                        }
                                        {
                                            (state.type === "tin" || state.type === "others") && <Grid container>
                                                <Label title="Provider" size={4} isTextAreaInput={true} />
                                                <Grid item sm={8} md={8} lg={8} xl={8}>
                                                    <SearchList
                                                        id="providerId"
                                                        name="providerId"
                                                        value={state.providerId}
                                                        searchTerm={state.providerName}
                                                        code="get_all_providers_query"
                                                        apiUrl="ddl/loadItems"
                                                        searchId={state.locationId}
                                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                        placeholderTitle="Search Provider"
                                                    />
                                                </Grid>
                                            </Grid>
                                        }
                                        {
                                            (state.type === "tin" || state.type === "others") && <Grid container>
                                                <Grid item lg={12}>
                                                    {errorMessages.errorGroupProvider && (state.type == 'others' && (!state.lstGroupProvider || state.lstGroupProvider.filter(t => t.isDeleted != true).length == 0)) ? (<ErrorMessage>
                                                        Adding at least one provider is required
                                                    </ErrorMessage>) : ('')}
                                                    <table className={classes.tablelayout}>
                                                        <thead>
                                                            <tr>
                                                                <th>Provider Name</th>
                                                                <th >Email</th>
                                                                <th >Speciality</th>
                                                                <th style={{ textAlign: "center" }}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                !state.lstGroupProvider || state.lstGroupProvider.filter(t => t.isDeleted != true).length == 0 ?
                                                                    <tr>
                                                                        <td colSpan={4}>No provider added</td>
                                                                    </tr> :
                                                                    state.lstGroupProvider && state.lstGroupProvider.map((item, index) => {
                                                                        if (item.isDeleted == true)
                                                                            return '';
                                                                        else {
                                                                            return <tr>
                                                                                <td>{item.providerName}</td>
                                                                                <td >{item.email}</td>
                                                                                <td>{item.speciality}</td>
                                                                                <td>
                                                                                    <span className={classes.tableActionBtns}>
                                                                                        {/* <span className={classes.editdeleteIcon} title={"Edit"}><img src={EraseIcon} alt="Edit" /></span> */}
                                                                                        <span className={classes.editdeleteIcon} title={"Delete"} onClick={() => { handleDeleteProvider(index) }}><img src={DeleteIcon} alt="Delete" /></span>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        }
                                                                    })
                                                            }

                                                        </tbody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <FormBtn id="save" btnType="save" onClick={Save}>Save</FormBtn>
                                <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    );
}

export default withSnackbar(ECQMReportingGroup)