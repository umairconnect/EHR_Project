import React, { useState, useEffect, useRef } from "react";
import {
    Tooltip,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
    IconButton,
} from "@material-ui/core";
import useStyles from "./styles"
import { AttachFile, Add } from '@material-ui/icons';
import CloseIcon from "../../../../../images/icons/math-plus.png";
import { withSnackbar } from "../../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField, CheckboxField } from "../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import EditIcon from '../../../../../images/icons/erase.png';
import DeleteIcon from '../../../../../images/icons/trash.png';
import AddIcon from '../../../../../images/icons/add-icon.png';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
function NewFormDialog({ showHideDialog, handleClose, showMessage, ...props }) {
    // handle styles
    const classes = useStyles();
    const options = [
        { value: 0, label: "Option" },
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
    ]
    const inputFile = useRef(null);
    const [state, setState] = useState({});
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    function handleFileUpload(e) {

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })

    }

    const [isSaving, setIsSaving] = useState(false);
    const scrollbars = useRef(null);
    const [carePlanStatusList, setCarePlanStatusList] = useState([]);

    const carePlanRef = useState({ carePlanGoalRef: "", carePlanStartDateRef: "", });

    const [defaultAttributes] = useState({
        carePlanId: 0, encounterId: props.encounterId, goal: "", healthConcernType: "Diagnosis",
        startDate: new Date().toISOString().split('T')[0], endDate: null,
        evaluationOutcome: "", patientPriorityCode: "", carePlanTeam: "", status: "",
        careTeamList: [], carePlanInterventionList: [], healthConcernsList: [], patientId: 0,
        careTeamOption: "Provider"
    });

    const [carePlanState, setCarePlanState] = useState(defaultAttributes);

    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });

    const [healthConcernOption, setHealthConcernOption] = useState(
        [
            { value: "Diagnosis", label: "Diagnosis" },
            { value: "Health_Concerns", label: "Health Concerns" },
            { value: "Vitals", label: "Vitals" }
        ]
    );
    const [healthConcernsList, setHealthConcernsList] = useState([]);
    const [healthConcernDDLOptions] = useState([
        { value: "Allergy", label: "Allergy" },
        { value: "Diagnosis", label: "Diagnosis" },
        { value: "Vitals", label: "Vitals" }
    ]);
    const [carePlanInterventionList, setCarePlanInterventionList] = useState([]);
    const [careTeamList, setCareTeamList] = useState([]);
    const [careTeamOption, setCareTeamOption] = useState([
        { value: "Provider", label: "Provider" },
        { value: "Relative", label: "Relative" }

    ])
    const [addIntervationList, setAddIntervationList] = useState([{ intervationValue: "" }]);

    const init = () => {
        setCarePlanState(defaultAttributes)
        setHealthConcernsList([]);
        setCarePlanInterventionList([]);
        setCareTeamList([]);
    }

    useEffect(() => {
        init();
        if (showHideDialog) {
            //getDiagnosisList();
            getDropdownsDataList();

            if (props.carePlanId > 0)
                setCarePlanFormData();

            setErrorMessages({
                errorCarePlanType: false, errorStatrDate: false, errorInstructions: false
            });


        }

    }, [showHideDialog]);


    const getDropdownsDataList = e => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['care_plan_status']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _statusList = [];
                result.data.map((item, i) => {
                    _statusList.push({ value: item.text1, label: item.text2 });
                });
                setCarePlanStatusList(_statusList);
                setCarePlanState(prevState => ({
                    ...prevState,
                    'status': 'InProgress'//_statusList[0].value
                }));

            }
        });
    }
    const setCarePlanFormData = e => {

        let procData = {
            carePlanId: props.carePlanId
        }

        PostDataAPI("CarePlan/getCarePlanByID", procData).then((result) => {

            if (result.success && result.data) {
                //result.data.status = result.data.status == true ? 'Active' : 'In-Active';
                result.data.startDate = result.data.startDate ? result.data.startDate.split("T")[0] : null;
                result.data.endDate = result.data.endDate ? result.data.endDate.split("T")[0] : null;
                result.data.careTeamOption = "Provider";
                setCarePlanState(result.data);
                setHealthConcernsList(result.data.healthConcernsList);
                setCareTeamList(result.data.careTeamList);
                setCarePlanInterventionList(result.data.carePlanInterventionList);

            }
            else {
                //setCarePlanState({
                //    carePlanId: 0, encounterID: props.encounterId, carePlanType: "", isIntervention: false,
                //    startDate: new Date().toISOString().split('T')[0],
                //    healthStatus: false, patientPriorityCode: "", providerPriorityCode: "", status: "", value: "", instructions: "",
                //    carePlanDiagnosisList: []
                //});

                //setCarePlaneDiagnosisState({
                //    carePlanDiagnosisID: 0, carePlanID: 0, codeType: "SNOMED", code: "", name: ""
                //});
            }
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarePlanState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (true) {

        }
    }

    const handleChangeCode = (e) => {

        const { name, value } = e.target;
        if (healthConcernsList.some(obj => obj.healthConcernType == carePlanState.healthConcernType && obj.code == value)) {
            showMessage("Error", 'Health concern already selected.', "error", 3000);
            return;
        }
        const selectedText = e.target.options[e.target.selectedIndex].text;
        let _healthConcernsList = [...healthConcernsList];
        _healthConcernsList.push({ 'code': value, 'name': selectedText, 'healthConcernType': carePlanState.healthConcernType, isDeleted: false });
        setHealthConcernsList(_healthConcernsList);
    }
    const handleSearchChangeCode = (name, item) => {

        const { id, value } = item;
        if (!value || value == '') {
            return;
        }
        if (healthConcernsList.some(obj => obj.healthConcernType == carePlanState.healthConcernType && obj.code == id)) {
            setCarePlanState(prevState => ({
                ...prevState,
                healthConcernTypeCode: id,
                healthConcernTypeName: value
            }));
            showMessage("Error", 'Health concern already selected.', "error", 3000);
            setTimeout(function () {
                setCarePlanState(prevState => ({
                    ...prevState,
                    healthConcernTypeCode: '',
                    healthConcernTypeName: ''
                }));
            }, 100);
            return;
        }
        setCarePlanState(prevState => ({
            ...prevState,
            healthConcernTypeCode: id,
            healthConcernTypeName: value
        }));
        let _healthConcernsList = [...healthConcernsList];
        _healthConcernsList.push({ 'code': id, 'name': value, 'healthConcernType': carePlanState.healthConcernType, isDeleted: false });
        setHealthConcernsList(_healthConcernsList);
        setTimeout(function () {
            setCarePlanState(prevState => ({
                ...prevState,
                healthConcernTypeCode: '',
                healthConcernTypeName: ''
            }));
        }, 100);
    }

    const handleSearchChange = (name, item) => {
        const { id, value } = item;
        if (!value || value == '') {
            return;
        }
        if (careTeamList.some(obj => obj.typeCode == carePlanState.careTeamOption && obj.careTeamName == value)) {
            setCarePlanState(prevState => ({
                ...prevState,
                careTeamName: value
            }));
            showMessage("Error", 'Care Team already selected.', "error", 3000);
            setTimeout(function () {
                setCarePlanState(prevState => ({
                    ...prevState,
                    careTeamName: ''
                }));
            }, 100);
            return;
        }
        setCarePlanState(prevState => ({
            ...prevState,
            careTeamName: value
        }));

        let obj = {
            typeCode: carePlanState.careTeamOption,
            userId: parseInt(id),
            careTeamName: value,
            isDeleted: false
            //typeCode : value
        }
        let _careTeamList = [...careTeamList];
        _careTeamList.push(obj);
        setCareTeamList(_careTeamList);

        setTimeout(function () {
            setCarePlanState(prevState => ({
                ...prevState,
                careTeamName: ''
            }));
        }, 100);

    }

    const handleAddIntervention = () => {
        if (carePlanState.intDescription && carePlanState.intDescription.trim().length > 0) {
            if (carePlanInterventionList.some(t => t.description == carePlanState.intDescription)) {
                showMessage("Error", 'Care plan intervention already added.', "error", 3000);
                return;
            }
            let _carePlanInterventionList = [...carePlanInterventionList];
            _carePlanInterventionList.push({ 'description': carePlanState.intDescription, isDeleted: false });
            setCarePlanInterventionList(_carePlanInterventionList);
            //carePlanState.carePlanInterventionList.push({ 'description': carePlanState.intDescription });
            setCarePlanState(prevState => ({
                ...prevState,
                ['intDescription']: ''
            }));
        }
    }
    const saveCarePlan = (e) => {

        e.preventDefault();

        let errorList = []

        if (!carePlanState.goal || carePlanState.goal.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGoal: true
            }));
            errorList.push(true);
            carePlanRef.carePlanGoalRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGoal: false
            }));
        }
        if (!carePlanState.startDate || carePlanState.startDate.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatrDate: true
            }));
            errorList.push(true);
            carePlanRef.carePlanStartDateRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStatrDate: false
            }));
        }

        if (!healthConcernsList || healthConcernsList.filter(o => o.isDeleted == false).length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernList: true
            }));
            errorList.push(true);
            //carePlanRef.carePlanTypeRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHealthConcernList: false
            }));
        }

        if (!carePlanInterventionList || carePlanInterventionList.filter(o => o.isDeleted == false).length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInterventionList: true
            }));
            //const scrollHeight = scrollbars.current.getScrollHeight();
            //scrollbars.current.scrollTop(scrollHeight + 10);
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInterventionList: false
            }));
        }

        if (errorList.length < 1) {
            let method = "carePlan/addUpdateCarePlan";

            //carePlanState.carePlanDiagnosisList.push(carePlaneDiagnosisState)
            carePlanState.careTeamList = careTeamList;
            carePlanState.carePlanInterventionList = carePlanInterventionList;
            carePlanState.healthConcernsList = healthConcernsList;

            //carePlanState.status = carePlanState.status == 'Active' ? true : false;
            carePlanState.patientId = parseInt(carePlanState.patientId);

            PostDataAPI(method, carePlanState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);

                    //getEncounterList();
                    handleClose();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    //setIsOpenEncounterDialog(true);
                }
            })

        }
        else {
            e.preventDefault();
        }
    }
    const handleDeleteIntervention = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = carePlanInterventionList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setCarePlanInterventionList(updatedList);
        });
    }
    const handleDeleteHealthConcern = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = healthConcernsList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setHealthConcernsList(updatedList);
        });
    }
    const handleDeleteCareTeam = (index) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = careTeamList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);
            setCareTeamList(updatedList);
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

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            PaperComponent={DraggableComponent}>

            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>Add New Form</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container >
                            <Scrollbars style={{ minHeight: "450px", height: "85%" }} ref={scrollbars} className={classes.CareplanScroll}>
                                <Grid container >
                                    <Label title="Type" size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <SelectField
                                            id="type"
                                            name="type"
                                            value={state.type}
                                            onChange={handleChange}
                                            placeholder="Select Type"
                                            options={options}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    <Label title="Subtype" size={3} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <SelectField
                                            id="subType"
                                            name="subType"
                                            value={state.subType}
                                            onChange={handleChange}
                                            placeholder="Select Subtype"
                                            options={options}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container >

                                    <Label title="Document ID" size={3} />

                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <Grid container>

                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                <InputBaseField
                                                    id="intDescription"
                                                    name="intDescription"
                                                    value={carePlanState.intDescription}
                                                    onChange={handleChange}
                                                    placeholder="Document ID"
                                                    MaxLength="500"
                                                />
                                            </Grid>
                                            <Label title="Status" size={2} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                <SelectField
                                                    id="subType"
                                                    name="subType"
                                                    value={state.subType}
                                                    onChange={handleChange}
                                                    placeholder="Select Subtype"
                                                    options={options}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                <Grid container >
                                    <Label title="Title" size={3} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <InputBaseField
                                            id="title"
                                            name="title"
                                            value={state.title}
                                            onChange={handleChange}
                                            placeholder="Document Title"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    <Label title="Description" size={3} mandatory={true} />
                                    <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <TextareaField
                                            rowsMin={5}
                                            MaxLength="2000"
                                            placeholder="Document Description"
                                            onChange={handleChange}
                                            name="documentDescription"
                                            value={carePlanState.documentDescription}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <CheckboxField
                                            color="default"
                                            name="default"
                                            checked={state.default}
                                            onChange={handleChange}
                                            label="Assign by default on new patient appointment"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <CheckboxField
                                            color="mandatory"
                                            name="mandatory"
                                            checked={state.mandatory}
                                            onChange={handleChange}
                                            label="Mandatory"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                        <span className={classes.btnSpan}>
                                            <InputBaseField
                                                name="uploadFile"
                                                placeholder="Upload Files"
                                                value={attachment.userFileName}
                                                IsDisabled={true}
                                            />
                                            <IconButton
                                                className={classes.attachmentBtn}
                                                color="primary"
                                                onClick={handleSelectFile}>
                                                <AttachFile />
                                            </IconButton>

                                        </span>
                                        <form>
                                            <div>
                                                <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                            </div>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                            <Grid container >
                                <Grid container direction="row" xs={12} sm={3} md={3} lg={3} xl={3} />
                                <Grid container direction="row" alignItems="flex-start" justify="flex-start" xs={12} sm={9} md={9} lg={9} xl={9}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={saveCarePlan}> Save</FormBtn>
                                    }
                                    <FormBtn id="reset" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>

                </div>
            </div >
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
        </Dialog >
    )

}
export default withSnackbar(NewFormDialog)
