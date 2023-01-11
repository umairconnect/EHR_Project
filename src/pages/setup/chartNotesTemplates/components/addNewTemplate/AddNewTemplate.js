import React, { useState, useEffect, useRef } from 'react'
//material ui
import {
    Grid,
    FormHelperText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Tooltip,
    Icon,
} from '@material-ui/core';
import { Add as AddIcon, ArrowRight, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

//custom
import Erase from "../../../../../images/icons/erase.png"
import Delete from "../../../../../images/icons/trash.png"
import SearchList from '../../../../../components/SearchList/SearchList';
import { withSnackbar } from '../../../../../components/Message/Alert';
import { FormGroupTitle, Label, ShadowBox, FormBtn } from '../../../../../components/UiElements/UiElements';
import { InputBaseField, SelectField } from '../../../../../components/InputField/InputField';

//styles
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import AddNewItemDialog from '../addNewItem/AddNewItemDialog';
import AddNewPhysicalExamDialog from '../addNewItem/AddNewPhysicalExamDialog';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../../Services/GetUserRolesRights';

function AddNewTemplate(props) {
    const [isEditable, setIsEditable] = useState(IsEditable("ChartNotesTemplates"));
    var classes = useStyles();
    //State For Action Dialog

    const [isSaving, setIsSaving] = useState(false);
    const { showMessage } = props;
    const options = [
        { value: 1, value: "Male", label: "Male" },
        { value: 2, value: "Female", label: "Female" },
        { value: 3, value: "Other", label: "Other" },
    ]


    const templateInfoList = [
        { id: 0, value: "Create new templates and use them in Encounters." },
        { id: 1, value: "To incorporate multiple choices in templates, use () and write the options with spaces and comma as shown in example: Follow up after (1, 2, 3, 4, 5) week." },
        { id: 2, value: "The options in () will be shown as selectable buttons while applying the templates.Use three underscore within text to create blank field e.g. The patient is ___ years old." },
        { id: 3, value: "Search and select the category. If no category is selected then the templates will be shown in “Miscellaneous”." },
        { id: 4, value: "Use tab button to switch between multiple “??” fields while applying templates." },
        { id: 5, value: "While recording encounters, quickly incorporate entire template item into the text area by simply typing in the SHORT CODE." }
    ]
    const [errorMessageStates, setErrorMessageStates] = useState({
        errorTemplateName: false, errorSpeciality: false, errorItemCode: false, errorAgeFrom: false, errorAgeTo: false, errorSex: false
    })

    const [state, setState] = useState({
        providerId: 0, providerName: "", specialityName: "", itemTemplateId: 0, sectionCode: "", itemCode: "", shortCode: "",
        itemTitle: "", specialityId: 0, sex: "", shortCode: "", level: "sys",
        subItemDTOList: []
    });

    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const [subItemDTOList, setSubItemDTOList] = useState([]);
    const [existingSubItems, setExisitingSubItems] = useState([]);
    const [subItemState, setSubtemState] = useState({
        subItemTemplateId: 0, itemTemplateId: 0, templateText: "",
        subItemCode: "", subItemTitle: "",
        negativeSubItemCode: "", negativeSubItemTitle: "",
        sectionCode: "", index: -1

    });

    const [specialityList, setSpecialityList] = useState([]);
    const [addItemDialogState, setAddItemDialogState] = useState(false);
    const [AddNewPhysicalExamDialogstate, setPhysicalExamDialogstate] = useState(false);
    //--//

    const handleChange = (e) => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleNumberChange = (e, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // const re = /^[0-9\b]+$/;
                // const re = /^\d*\.?\d*$/;
                const re = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;
                        setState(prevState => ({
                            ...prevState,
                            [name]: parseFloat(value)
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
                    [name]: value//parseFloat(value)
                }));
            }
        }
        else
            e.preventDefault();
    };

    const specialityRef = useRef();

    const handleSearcdhListSpecialityChange = (name, item) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,

            specialityId: id,
            specialityName: value
        }));
        //setLocationId(0);
        if (value && value != "") {

            var _specialityList = [];

            if (specialityList) {

                if (specialityList.filter(tmprm => tmprm.specialityId === id && tmprm.specialityName === value) == "") {

                    specialityList.map((itm, i) => {

                        _specialityList.push({ specialityId: itm.specialityId, specialityName: itm.specialityName });
                    });

                }
                else {

                    showMessage("Error", "Speciality already selected", "error", 8000);

                    setTimeout(function () {
                        setState(prevState => ({
                            ...prevState,
                            specialityName: "",
                            specialityId: 0

                        }));
                    }, 100);

                    return;
                }

            }

            var _specialityIds = [];

            if (specialityList) {

                specialityList.map((item, i) => {
                    _specialityIds = [..._specialityIds, item.specialityId];
                });

                _specialityIds = [..._specialityIds, id];

                setState(prevState => ({
                    ...prevState,
                    specialityIds: _specialityIds.join(', ')
                }));
            }

            _specialityList.push({ specialityId: id, specialityName: value });

            setSpecialityList(_specialityList);
        }
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                specialityName: "",
                specialityId: 0

            }));
        }, 100);
    }
    const deleteSpecialityItem = (index) => {
        var _specialityList = [];

        specialityList.splice(index, 1);

        /*specialityList.map((itm, k) => {
            _specialityList.push({ specialityId: itm.locationId, specialityName: itm.locationName });
        });*/

        var _specialityIds = [];

        if (specialityList) {

            specialityList.map((item, i) => {
                _specialityIds = [..._specialityIds, item.specialityId];
            });

            setState(prevState => ({
                ...prevState,
                specialityIds: _specialityIds.join(', ')
            }));
        }

        setSpecialityList(specialityList);
    }
    const addNewPhysicalExam = (category) => {
        setExisitingSubItems(subItemDTOList.filter(items => items.sectionCode == category))
        setSubtemState(prevState => ({
            ...prevState,
            subItemTemplateId: -1,
            sectionCode: category
        }));
        setPhysicalExamDialogstate(true);
        setEditText("Add")
    }
    const closeNewPhysicalExam = () => {
        resetTempSubItemState();
        setPhysicalExamDialogstate(false);
    }

    const resetTempSubItemState = () => {
        setExisitingSubItems([]);
        setSubtemState(prevState => ({
            ...prevState,
            subItemTemplateId: 0, itemTemplateId: 0, templateText: "",
            subItemCode: "", subItemTitle: "",
            negativeSubItemCode: "", negativeSubItemTitle: "",
            sectionCode: "", index: -1
        }));
    }

    const addNewItem = (category) => {
        setExisitingSubItems(subItemDTOList.filter(items => items.sectionCode == category))
        setSubtemState(prevState => ({
            ...prevState,
            subItemTemplateId: -1,
            sectionCode: category
        }));
        setAddItemDialogState(true);
        setEditText("Add")
    }
    const onDelete = (item) => {


        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this Item?", "confirm", function () {
            const list = [...subItemDTOList];
            if (item.subItemTemplateId === 0) {
                list.pop(item.item);
                setSubItemDTOList(list);
            } else {
                const filterList = list.filter(tmprm => tmprm.subItemTemplateId !== item.subItemTemplateId)
                setSubItemDTOList(filterList);
            }

        })

    }

    const [editText, setEditText] = useState("");

    const onEditPhysical = (item) => {
        setExisitingSubItems(subItemDTOList.filter(items => items.sectionCode == item.sectionCode))
        setSubtemState(item);
        setPhysicalExamDialogstate(true);
        setEditText("Edit")
    }

    const onEdit = (item) => {
        setExisitingSubItems(subItemDTOList.filter(items => items.sectionCode == item.sectionCode))
        setSubtemState(item);
        setAddItemDialogState(true);
        setEditText("Edit")
    }
    const closeAddNewItem = () => {
        resetTempSubItemState();
        setAddItemDialogState(false);
    }

    const responseFromAddDialog = (item) => {
        setExisitingSubItems([]);
        if (item.index < 0) {
            const list = [...subItemDTOList];
            item.index = list.length;
            list.push(item);
            setSubItemDTOList(list);
        } else {
            const list = [...subItemDTOList];
            list[item.index] = item;
            setSubItemDTOList(list);
        }
    }

    const onClose = () => {
        resetTempSubItemState();
        props.handleClose();
    }

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
    const onSave = () => {
        let errorList = []
        if (!state.itemTitle || state.itemTitle.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorTemplateName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorTemplateName: false
            }));
        }

        if (props.tabSelected == 1) {
            if (!state.specialityIds || state.specialityIds.trim() == "") {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorSpeciality: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorSpeciality: false
                }));
            }
        }

        if (!state.itemCode || state.itemCode.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorItemCode: true
            }));
            errorList.push(true);
        }


        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorItemCode: false
            }));
        }
        /*if (!state.age || state.age <=0) {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorAgeFrom: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorAgeFrom: false
            }));
        }

        if (!state.ageTo || state.ageTo <= 0) {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorAgeTo: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorAgeTo: false
            }));
        }
        if (state.age && state.ageTo && state.age > state.ageTo) {
            errorList.push(true);
            showMessage("Error", "Age From must be less than Age To", "error", 3000);
        }*/

        /*if (!state.sex || state.sex.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorSex: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorSex: false
            }));
        }*/
        console.log(state);
        console.log(subItemDTOList);


        if (errorList.length < 1) {
            state.subItemDTOList = [];
            subItemDTOList.map((itm, i) => {

                state.subItemDTOList.push(itm);
            });
            let method = "itemTemplate/addItemTemplate";
            if (state.itemTemplateId > 0)
                method = "itemTemplate/updateItemTemplate";
            setIsSaving(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaving(false);

                if (result.success == true && result.data != null) {
                    showMessage("Success", "Data saved successfully.", "success", 3000);
                    setErrorMessageStates([]);
                    setTimeout(function () {
                        props.handleClose();
                    }, 200);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        }

    }
    const initSubTempItems = () => {
        if (props.dataId.subItemDTOList != null) {
            setSubItemDTOList(props.dataId.subItemDTOList);
            /*props.dataId.subItemDTOList.map((itm, i) => {
                subItemDTOList.push(itm);
            });*/
        }
    }
    const loadItemTemplateSpecializationList = () => {

        var params = {
            code: "item_template_specializations",
            parameters: [props.dataId.itemTemplateId + ""]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setSpecialityList(
                    result.data.map((item, i) => {
                        return { specialityId: item.text1, specialityName: item.text2 };
                    }));
                var _specialityIds = [];
                result.data.map((item, i) => {
                    _specialityIds = [..._specialityIds, item.text1];
                });

                setState(prevState => ({
                    ...prevState,
                    specialityIds: _specialityIds.join(', ')
                }));
            }
        });
    }
    const loadItemTemplateDetails = (itemTemplateId) => {

        PostDataAPI("itemTemplate/getItemTemplateById", parseInt(itemTemplateId)).then((result) => {
            if (result.success && result.data != null) {

                setState(result.data);
                if (result.data.subItemDTOList != null) {
                    setSubItemDTOList(result.data.subItemDTOList);
                }
                loadItemTemplateSpecializationList();
            }
            else {
                showMessage('Error', result.message, 'error');
            }
        })
    }
    const [chartNotesExp, setchartNotesExp] = useState();

    const expendChartNotes = () => {

        if (props.sectionCode == "chart_notes") {
            setchartNotesExp(true)
        }

    }

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.dataId.itemTemplateId),
            area: "ChartNote Template form setup",
            activity: "Load speciality form details",
            details: "User viewed Chartnote template form screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }


    useEffect(() => {
        

        if (props.dataId !== 0) {
            loadItemTemplateDetails(props.dataId.itemTemplateId);
            saveAuditLogInfo();
        }
        if (props.tabSelected === 1) {
            state.level = "user";
        }

    }, []);
    return (
        <>
            <ShadowBox>
                <Grid container>
                    {props.dataId !== 0 ? <FormGroupTitle>Edit Template Info</FormGroupTitle> : <FormGroupTitle>New Template Info</FormGroupTitle>}

                    <Grid container >

                        <Grid container >
                            <ul className={classes.templateInfoList}>
                                {
                                    templateInfoList ?
                                        templateInfoList.map((itmm, i) => (

                                            <li key={itmm.id}>
                                                <ArrowRight />
                                                {itmm.value}
                                            </li>

                                        ))
                                        : null
                                }
                            </ul>
                        </Grid>

                        <Grid container >

                            <Label title="Name" size={2} mandatory={true} />

                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    placeholder="Template Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="itemTitle"
                                    value={state.itemTitle}
                                    MaxLength="100"
                                />
                                {errorMessageStates.errorTemplateName && (!state.itemTitle || state.itemTitle.trim() == "") ?
                                    (<FormHelperText style={{ color: "red" }} > Please enter template name</FormHelperText>)
                                    : ('')
                                }
                            </Grid>

                            <Label style={{ alignItems: "baseline", paddingTop: "12px" }} title="Short Code(s)" size={2} mandatory={true} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <InputBaseField
                                    placeholder="Short Codes"
                                    onChange={handleChange}
                                    type="text"
                                    name="itemCode"
                                    value={state.itemCode}
                                    MaxLength={32}
                                />
                                {errorMessageStates.errorItemCode && (!state.itemCode || state.itemCode.trim() == "") ?
                                    (<FormHelperText style={{ color: "red" }} > Please enter short code</FormHelperText>)
                                    : ('')
                                }
                            </Grid>



                            {/*{props.tabSelected == 0 ? <Grid item xs={12} sm={4} md={4} lg={3} >*/}
                            {/*    <SearchList*/}
                            {/*        id="specialityId"*/}
                            {/*        name="specialityId"*/}
                            {/*        value={state.specialityId}*/}
                            {/*        searchTerm={state.specialityName}*/}
                            {/*        code="load_specialization"*/}
                            {/*        apiUrl="ddl/loadItems"*/}
                            {/*        ref={specialityRef}*/}
                            {/*        onChangeValue={(name, item) => handleSearcdhListSpecialityChange(name, item)}*/}
                            {/*        placeholderTitle="Search Specializations"*/}
                            {/*    />*/}
                            {/*    {errorMessageStates.errorSpeciality && (!state.specialityIds || state.specialityIds.trim() == "") ?*/}
                            {/*        (<FormHelperText style={{ color: "red" }} > Please select at least 1 speciality</FormHelperText>)*/}
                            {/*        : ('')*/}
                            {/*    }*/}
                            {/*</Grid> : null}*/}

                        </Grid>

                        <Grid container>

                            <Label title="Age Range" size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <InputBaseField
                                            id="age"
                                            name="age"
                                            type="number"
                                            placeholder="From"
                                            value={state.age}
                                            onChange={(e) => { handleNumberChange(e, 2) }}
                                            restrictNegative={true}
                                        />
                                        {errorMessageStates.errorAgeFrom && (!state.age || state.age <= 0) ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter age from</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <InputBaseField
                                            id="ageTo"
                                            name="ageTo"
                                            type="number"
                                            placeholder="To"
                                            value={state.ageTo}
                                            onChange={(e) => { handleNumberChange(e, 3) }}
                                            restrictNegative={true}
                                        />
                                        {errorMessageStates.errorAgeTo && (!state.ageTo || state.ageTo <= 0) ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter age to</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>


                            {/*{props.tabSelected == 0 ? <Label title="Speciality" size={2} mandatory={true} /> : null}*/}
                            <Label title="Speciality" size={2} mandatory={true} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SearchList
                                    id="specialityId"
                                    name="specialityId"
                                    value={state.specialityId}
                                    searchTerm={state.specialityName}
                                    code="load_specialization"
                                    apiUrl="ddl/loadItems"
                                    ref={specialityRef}
                                    onChangeValue={(name, item) => handleSearcdhListSpecialityChange(name, item)}
                                    placeholderTitle="Search Speciality"
                                />
                                {errorMessageStates.errorSpeciality && (!state.specialityIds || state.specialityIds.trim() == "") ?
                                    (<FormHelperText style={{ color: "red" }} > Please select at least 1 speciality</FormHelperText>)
                                    : ('')
                                }
                            </Grid>


                        </Grid>

                        <Grid container style={{alignItems: "baseline"}}>

                            <Label title="Gender" size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <SelectField
                                    id="sex"
                                    name="sex"
                                    value={state.sex}
                                    options={options}
                                    placeholder="Select Gender"
                                    onChange={handleChange}
                                />
                                {errorMessageStates.errorSex && (!state.sex || state.sex.trim() == "") ?
                                    (<FormHelperText style={{ color: "red" }} > Please select gender</FormHelperText>)
                                    : ('')
                                }
                            </Grid>

                            <Grid item xs={2} sm={2} md={2} lg={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <ul className={classes.orderList}>
                                    {
                                        specialityList /*&& props.tabSelected == 0*/ ?
                                            specialityList.map((itmm, i) => (

                                                <li key={itmm.specialityId}>
                                                    {itmm.specialityName}
                                                    <span className={classes.deleteIcon} onClick={() => deleteSpecialityItem(i)}><AddIcon /></span>
                                                </li>

                                            ))
                                            : null
                                    }
                                </ul>
                            </Grid>

                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Chief Complaint / History of Presenting Illness</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewItem("cheif_complaint") }}
                                                disabled={ !isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>

                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Item Name</th>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Short Code</th>
                                                        <th style={{ minWidth: "35%", width: "35%" }}>Details</th>
                                                        <th style={{ minWidth: "15%", width: "15%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "cheif_complaint").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemCode}</td>
                                                            <td style={{ minWidth: "35%", width: "35%" }} dangerouslySetInnerHTML={{ __html: item.templateText }}></td>
                                                            <td style={{ minWidth: "15%", width: "15%" }}>

                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => { onEdit(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip> : ''}

                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Plan of Care (POC)</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewItem("plan_of_care") }}
                                                disabled={ !isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Item Name</th>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Short Code</th>
                                                        <th style={{ minWidth: "35%", width: "35%" }}>Details</th>
                                                        <th style={{ minWidth: "15%", width: "15%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "plan_of_care").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemCode}</td>
                                                            <td style={{ minWidth: "35%", width: "35%" }} dangerouslySetInnerHTML={{ __html: item.templateText }}></td>
                                                            <td style={{ minWidth: "15%", width: "15%" }}>

                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => { onEdit(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip> : ''}

                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion} expanded={chartNotesExp}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"

                                >
                                    <Typography className={classes.heading}>Chart Notes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewItem("chart_notes") }}
                                                disabled={ !isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>

                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Item Name</th>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Short Code</th>
                                                        <th style={{ minWidth: "35%", width: "35%" }}>Details</th>
                                                        <th style={{ minWidth: "15%", width: "15%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "chart_notes").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemCode}</td>
                                                            <td style={{ minWidth: "35%", width: "35%" }} dangerouslySetInnerHTML={{ __html: item.templateText }}></td>
                                                            <td style={{ minWidth: "15%", width: "15%" }}>

                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip> : ''}

                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Checkout Notes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewItem("checkout_notes") }}
                                                disabled={ !isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>

                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Item Name</th>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Short Code</th>
                                                        <th style={{ minWidth: "35%", width: "35%" }}>Details</th>
                                                        <th style={{ minWidth: "15%", width: "15%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "checkout_notes").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemCode}</td>
                                                            <td style={{ minWidth: "35%", width: "35%" }} dangerouslySetInnerHTML={{ __html: item.templateText }}></td>
                                                            <td style={{ minWidth: "15%", width: "15%" }}>

                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => { onEdit(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip> : ''}

                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>ROS</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewItem("ROS") }}
                                                disabled={ !isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Item Name</th>
                                                        <th style={{ minWidth: "25%", width: "25%" }}>Short Code</th>
                                                        <th style={{ minWidth: "35%", width: "35%" }}>Details</th>
                                                        <th style={{ minWidth: "15%", width: "15%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "ROS").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "25%", width: "25%" }}>{item.subItemCode}</td>
                                                            <td style={{ minWidth: "35%", width: "35%" }} dangerouslySetInnerHTML={{ __html: item.templateText }}></td>
                                                            <td style={{ minWidth: "15%", width: "15%" }}>
                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => { onEdit(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip> : ''}
                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid container>
                            <Accordion className={classes.customAccordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Physical Exam</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Grid container justifyContent="flex-start">
                                        <Grid item lg={12}>
                                            <Button
                                                size="small"
                                                className={classes.newAddBtn2}
                                                onClick={() => { addNewPhysicalExam("Physical_Exam") }}
                                                disabled={!isEditable}
                                            >+ Add New
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <table className={classes.accordionTable}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "40%", width: "40%" }}>Positive</th>
                                                        <th style={{ minWidth: "40%", width: "40%" }}>Negative</th>
                                                        <th style={{ minWidth: "20%", width: "20%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subItemDTOList.filter(tmprm => tmprm.sectionCode === "Physical_Exam").map((item, i) => {
                                                        return (<tr key={i}>
                                                            <td style={{ minWidth: "40%", width: "40%" }}>{item.subItemTitle}</td>
                                                            <td style={{ minWidth: "40%", width: "40%" }}>{item.negativeSubItemTitle}</td>
                                                            <td style={{ minWidth: "20%", width: "20%" }}>
                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Erase} onClick={() => { onEditPhysical(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} onClick={() => { onDelete(item) }} className={classes.Icon} /> </Icon>
                                                                </Tooltip>:''}
                                                                

                                                            </td>
                                                        </tr>)
                                                    })
                                                    }
                                                </tbody>
                                            </table>

                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                    </Grid >

                    <div className={classes.footer}>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: "flex" }}>
                                {
                                    isSaving ?
                                        <FormBtn id="loadingSave"> Save</FormBtn>
                                        :
                                        <FormBtn id="save" disabled={!isEditable} onClick={onSave}>Save</FormBtn>
                                }
                                <FormBtn id="reset" onClick={onClose}> Close </FormBtn>
                            </Grid>
                        </Grid>

                    </div>
                </Grid >
            </ShadowBox >

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

            {AddNewPhysicalExamDialogstate ? <AddNewPhysicalExamDialog
                showHideDialog={AddNewPhysicalExamDialogstate}
                handleClose={closeNewPhysicalExam}
                subDataItem={subItemState}
                existingItems={existingSubItems}
                onSaveResponse={responseFromAddDialog}
                isEditable={isEditable}
                AddEditText={editText} /> : null}
            {addItemDialogState ?
                <AddNewItemDialog
                    showHideDialog={addItemDialogState}
                    handleClose={closeAddNewItem}
                    subDataItem={subItemState}
                    existingItems={existingSubItems}
                    onSaveResponse={responseFromAddDialog}
                    AddEditText={editText}
                    isEditable={ isEditable}
                /> : null
            }

        </>
    )
}

export default withSnackbar(AddNewTemplate)