
import React, { useState, useEffect, useRef } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    FormHelperText,
    Dialog,
    Tab,
    Tabs,
    Paper,
    InputBase,
    InputAdornment,
    Icon,
    IconButton,
    Button,
    Tooltip,
} from '@material-ui/core';
import {
    Search as SearchIcon,
    AttachFile
} from "@material-ui/icons";

import PropTypes from 'prop-types';

import LockIcon from '@material-ui/icons/Lock';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { DraggableComponent, LinkS, FormBtn, FormGroupTitle, Label, ErrorMessage } from "../../../../components/UiElements";
import { InputBaseField, TextareaField } from "../../../../components/InputField";
import { SelectField } from "../../../../components/InputField";
import { formatDate } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import AddIcon from '../../../../images/icons/add-icon.png';
// import ViewIcon from "../../../../images/icons/view.png";
import DeleteIcon from "../../../../images/icons/trash.png";
import CloseIcon from '../../../../images/icons/math-plus.png';
import Addendum from '../../../../images/icons/addendum.png';
import unLockedEncounter from "../../../../images/icons/unlocked-encounter.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { withSnackbar } from "../../../../components/Message/Alert";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronLeft from "@material-ui/icons/ChevronLeft";

import { Empty, Table } from "antd";
import "../../../../components/antd.css";
import "../../../../components/SearchGrid/antStyle.css";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            // style={{
            //     height: "440px", margin: "0px", backgroundColor: "#FFFFFF",
            //     borderRadius: "0px", overflow: "auto"
            // }}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function EncountersList({encId, ...props}) {

    const { showMessage } = props;
    // handle styles
    var classes = useStyles();

    // grid

    const ConsentFormsColumns = [
        {
            title: '',
            dataIndex: 'consentFormId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Title',
            dataIndex: 'fileName',
            className: "width250",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            className: "width100",
        }
    ];

    const [consentFormState, setConsentFormState] = useState({ fileName: "", encounterId: encId });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);

    const inputFile = useRef(null);
    // const [isSaving, setIsSaving] = useState(false);
    const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    function handleFileUpload(e) {

        setAttachment({ file: null, userPhoto: null, userFileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userFileName: e.target.files[0].name
        })

        // setAttachment({ file: null, fileToSend: null, fileName: null });
    }

    function loadConsentForm() {
        PostDataAPI("patientencounterconsent/loadGrid", encId).then((result) => {
            if (result.success && result.data != null) {

                result.data.map((item, i) => {
                    item.fileName = <LinkS onClick={item.filePath} download={item.fileName} href={"." + item.filePath}> {item.fileName}</LinkS>
                    item.action = <div style={{ width: "100%", textAlign: "center" }}>
                        {/* <Tooltip title="View">
                            <Icon> <img src={ViewIcon} className={classes.Icon} /> </Icon>
                        </Tooltip> */}
                        <Tooltip title="Delete">
                            <Icon> <img src={DeleteIcon} className={classes.Icon} onClick={() => { handleConsentFormDelete(item.encounterConsentId) }} /> </Icon>
                        </Tooltip>
                    </div>

                    return { ...item }

                });

                setRowsData(result.data);
            }
        })




    }
    // handle const data

    const [dataId, setDataId] = useState(props.encId);

    const [visitTypeList, setVisitTypeList] = useState([]);

    const [userLocationId, setUserLocationId] = useState(props.userLocationId);
    const [patientId, setPatientId] = useState(props.patientId);
    const [patientAppointmentId, setPatientAppointmentId] = useState(props.patientAppointmentId);

    const [encRowsData, setEncRowsData] = useState([]);
    const [isOpenEncounterDialog, setIsOpenEncounterDialog] = useState(props.isOpenEncounterDialog);
    const [userLocations, setUserLocations] = useState([]);
    const [providers, setProviders] = useState([]);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    //To default primary location and provider
    const [primaryLocationId, setPrimaryLocationId] = useState(0);
    const [primaryProviderId, setPrimaryProviderId] = useState(0);
    //
    const [isCloseView, setIsCloseView] = useState(false);
    const [updateList, setUpdateList] = useState(false);
    //
    const [selectedEncounterId, setSelectedEncounterId] = useState(0);

    const [encounterState, setEncounterState] = useState({
        encounterID: 0, visitTypeCode: "", providerId: null, comments: "", userId: 0, encDateTime: null,
        patientId: patientId, patientAppointmentId: patientAppointmentId, userLocationId: userLocationId,
        encDate: new Date().toISOString().split('T')[0], chartNoteTypeId: 0, encounterTypeId: 0,
        encTime: (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()
    });

    const [errorMessages, setErrorMessages] = useState({
        errorVisitTypeCode: false, errorEncDate: false, errorEncTime: false, errorproviderId: false, erroruserLocationId: false, errorEncounterType: false, errorChartNoteType: false
    })

    const [searchList, setSearchList] = useState("");
    const [filterDataList, setFilterDataList] = useState([]);

    //consent form
    const [tabvalue, setTabValue] = useState(0);
    const [encounterTypeList, setEncounterTypeList] = useState([]);
    const [isSoapTypeNote, setIsSoapTypeNote] = useState(false);
    const [chartNoteTypeList, setChartNoteTypeList] = useState([]);
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };
    //
    //hanlde functions
    const searchOnChange = value => {
        setSearchList(value);
        filterData(value);
    }

    const excludeColumns = ["encounterID"];
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setFilterDataList(encRowsData);
        else {
            const filteredData = encRowsData.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setFilterDataList(filteredData);
        }
    }
    function Validate(errorList) {
        if (consentFormState?.fileName?.replace(/\s+/g, "") === "" || consentFormState.fileName == undefined) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFileName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFileName: false
            }));
        }
        if (!attachment.file) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttachment: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttachment: false
            }));
        }

    }
    const SaveConsentForm = () => {
        let errorList = [];
        consentFormState.encounterId = encId;
        Validate(errorList);
        if (errorList.length < 1) {
            //setIsSaving(true);
            let method = "patientencounterconsent/add";

            let formData = new FormData();
            for (var key in consentFormState) {
                if (consentFormState[key] && key != "formFile" && key != "encUserID")
                    formData.append(key, consentFormState[key]);

            }
            formData.append("formFile", attachment.userPhoto);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                //setSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    //handleShowConsentForm(false);
                    if (result.success && result.data != null) {

                        setConsentFormState(result.data);
                        loadConsentForm();
                        showMessage("Success", "Consent form saved successfully.", "success", 2000);
                        handleShowConsentForm(false);
                    }

                }
                else {

                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    }
    const handleConsentFormDelete = (idToDelete) => {

        //setChangePage(false);
        var data = {
            encounterConsentId: idToDelete
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {

            PostDataAPI('patientencounterconsent/delete', data, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    loadConsentForm();
                    //handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })
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
        if (encId > 0)
            loadConsentForm();
        if (props.patientAppointmentId || isOpenEncounterDialog)
            initialization();
        if (props.isOpenEncounterDialog == true) {
            setIsOpenEncounterDialog(true);
        }
    }, [props.patientAppointmentId, props.userUpdate, props.updateSigned, updateList, props.update, props.isOpenEncounterDialog]);

    const initialization = () => {

        if (userInfo.isProvider == true) {
            getUserLocations(userInfo.userID);
        }

        if (userInfo.isProvider == false) {

            let data = {
                userID: userInfo.userID
            }

            PostDataAPI("user/getStaffProviders", data).then((result) => {

                if (result.success && result.data != null) {

                    var primProviderId = 0;

                    setProviders(
                        result.data.map((item, i) => {
                            if (item.p1 == "True")
                                primProviderId = item.id;

                            return { value: item.id, label: item.text1 + ' ' + item.text2 };
                        }));

                    if (userInfo.isProvider == false && primProviderId > 0) {
                        setEncounterState(prevState => ({
                            ...prevState,
                            providerId: primProviderId
                        }));
                        setPrimaryProviderId(primProviderId);
                        getUserLocations(primProviderId);
                    }
                    else {
                        setPrimaryProviderId(0);
                    }
                }
            })
        }

        getVisitTypeList();
        getEncounterList();
        getEncounterTypeList();
        setEncounterFormState();

        if (filterDataList && filterDataList.length > 0) {
            setSelectedEncounterId(filterDataList[0].encounterID);
        }
    }

    const getEncounterList = e => {

        var params = {
            code: "patient_encounters",
            parameters: [patientId.toString(), patientAppointmentId.toString()]
        };

        let apptEncounterId = 0;
        let appProviderId = 0;
        let signed;
        let encTypeId = 0;
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var dataArr = result.data.map((item, i) => {
                    if (encId > 0 && encId == item.id || encId < 1 && item.text6 == patientAppointmentId) {
                        apptEncounterId = item.id;
                        appProviderId = item.text5;
                        signed = item.id1;
                        encTypeId = item.id2;
                    }
                    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    return {
                        encounterID: item.id,
                        encounterDate: formatDate(item.d1.split('T')[0]), //new Date(item.d1).toLocaleDateString(undefined, options),
                        visitType: item.text1 ? item.text1.replace(/_/g, " ") : '',
                        comments: item.text2,
                        ccDetail: item.text3 == null ? "" : item.text3,
                        signed: item.id1,
                        isAddendum: item.text4 == 'False' ? false : true,
                        providerId: item.text5,
                        appointmentId: item.text6,
                        encounterTypeId: item.id2
                    };
                })

                setEncRowsData(dataArr);
                setFilterDataList(dataArr);
                if (apptEncounterId > 0) {
                    //setSelectedEncounterId(dataArr[0].encounterID);
                    setSelectedEncounterId(apptEncounterId);
                    // I have to start from here 
                    props.onClickList(apptEncounterId, signed, appProviderId, encTypeId);
                }
                else {
                    getDefaultApptType();
                    setIsOpenEncounterDialog(true);
                    props.openProfile();
                    props.onClickList(0, 0, 0, 0);
                }

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const getVisitTypeList = e => {

        var params = {
            code: "DDL_List_Item",
            parameters: ['visit_type_code']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null && result.data.length > 0) {
                setVisitTypeList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

            }
        });
    }

    const getEncounterTypeList = e => {
      
        var params = {
            code: "get_encounter_types",
            parameters: ['']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null && result.data.length > 0) {
                setEncounterTypeList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
                let defaultNoteType = result.data.filter(item => item.text3 == "True");
                if (defaultNoteType.length > 0 && encId <= 0) {
                    setEncounterState(prevState => ({
                        ...prevState,
                        ['encounterTypeId']: defaultNoteType[0].id
                    }));
                }
            }
            
           
        });
    }


    const getUserLocations = userID => {

        let data = {
            userID: userInfo.userID
        }

        PostDataAPI("user/getUserLocations", data).then((result) => {

            if (result.success && result.data != null) {

                setUserLocations(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }

        })
    };

    const addEncounter = e => {
        setDataId(0);
        setEncounterFormState();
        setIsOpenEncounterDialog(true)
    }

    const selectedEncounterDetail = (eId, signed, providerId, encTypeId) => {
        setDataId(eId);
        setSelectedEncounterId(eId);
        props.onClickList(eId, signed, providerId, encTypeId);
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.patientAppointmentId),
            area: "Appointment details",
            activity: "Load appointment details",
            details: "User viewed appointment details screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const setEncounterFormState = e => {
        if (dataId == undefined || dataId == "" || dataId < 0) {
            PostDataAPI("appointment/getAppointmentDetailOnlyByID", props.patientAppointmentId).then((result) => {
                if (result.success && result.data != null) {
                    setEncounterState(prevState => ({
                        ...prevState,

                        encounterID: 0,
                        patientId: patientId,
                        patientAppointmentId: patientAppointmentId,
                        userLocationId: result.data.userLocationID.toString(),
                        visitTypeCode: result.data.appointmentTypeCode,
                        encDateTime: null,
                        providerId: result.data.providerId.toString(),
                        comments: "",
                        encDate: new Date().toISOString().split('T')[0],
                        encTime: (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes(),
                        createdBy: 0,
                        createDate:
                            new Date().toISOString(),
                        updatedBy: 0,
                        //encounterTypeId: result.data.encounterTypeId
                    }
                    ));
                }
            })
            saveAuditLogInfo();
        }
        else {
            encounterState.encounterID = dataId;
            getEncounterDetail(dataId);
        }
    }

    const handleProviderChange = e => {

        const { name, value } = e.target;
        setEncounterState(prevState => ({
            ...prevState,
            [name]: value
        }));
        getUserLocations(value);

    };

    const handleChange = e => {
        const { name, value } = e.target;
        setEncounterState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChartNoteTypeChange = e => {
        const { name, value } = e.target;
        setEncounterState(prevState => ({
            ...prevState,
            [name]: value
        }));
        let soapNote = chartNoteTypeList.some((item) => item.value == value && item.formatCode == "SOAP");

        if (soapNote) {
            setIsSoapTypeNote(true)
        } else {
            setIsSoapTypeNote(false)
        }

    };
    const handleConsentChange = e => {

        const { name, value } = e.target;
        setConsentFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        handleShowConsentForm(false);
        setIsOpenEncounterDialog(false);
        if (props.closeEncounterDialog != undefined)
            props.closeEncounterDialog(false)
    };

    const getEncounterDetail = (encounterId) => {
        PostDataAPI("encounter/getEncounterById", parseInt(encounterId)).then((result) => {
            if (result.success && result.data != null) {
                setEncounterState(prevState => ({
                    ...prevState,
                    encounterID: result.data.encounterID,
                    patientId: result.data.patientId,
                    patientAppointmentId: result.data.patientAppointmentId,
                    userLocationId: result.data.userLocationId.toString(),
                    visitTypeCode: result.data.visitTypeCode,
                    encDateTime: result.data.encDatetime,
                    providerId: result.data.providerID.toString(),
                    comments: result.data.comments,
                    encDate: new Date().toISOString().split('T')[0],
                    encTime: (new Date().getHours() < 10 ? '0' : '') + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes(),
                    createdBy: result.data.createdBy,
                    createDate: result.data.createDate,
                    updatedBy: result.data.updatedBy,
                    encounterTypeId: result.data.encounterTypeId,
                    chartNoteTypeId: result.data.chartNoteTypeId,
                    isSigned: result.data.isSigned
                }
                ));
            }
            else if (!result.message && result.message != null) {

                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    const saveEncounter = (e) => {

        e.preventDefault();

        let errorList = []
        if (!encounterState.visitTypeCode || encounterState.visitTypeCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVisitTypeCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVisitTypeCode: false
            }));
        }

        if (!encounterState.encDate || encounterState.encDate.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncDate: false
            }));
        }

        if (!encounterState.encTime || encounterState.encTime.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncTime: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncTime: false
            }));
        }

        if (!encounterState.userLocationId || encounterState.userLocationId.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                erroruserLocationId: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                erroruserLocationId: false
            }));
        }

        if (!encounterState.encounterTypeId > 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncounterType: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEncounterType: false
            }));
        }

        if (!userInfo.isProvider) {
            if (!encounterState.providerId || encounterState.providerId < 1 || isNaN(encounterState.providerId) && encounterState.providerId.trim() == "") {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorproviderId: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorproviderId: false
                }));
            }
        }

        if (errorList.length < 1) {
            let method = "encounter/addEncounter";

            if (encId > 0)
            {
                method = "encounter/updateEncounter";
                encounterState.encounterID=encId;
            }
            encounterState.patientAppointmentId = encounterState.patientAppointmentId.toString();
            encounterState.providerId = encounterState.providerId != null ? parseInt(encounterState.providerId) : null;
            encounterState.encounterTypeId = encounterState.encounterTypeId != null ? parseInt(encounterState.encounterTypeId) : 0;
            encounterState.chartNoteTypeId = encounterState.chartNoteTypeId != null ? parseInt(encounterState.chartNoteTypeId) : 0;
            PostDataAPI(method, encounterState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);

                    if (!encId || encId < 1) {

                        showMessage("Success", "Encounter saved successfully.", "success", 3000);
                        setSelectedEncounterId(result.data.encounterID);
                        setTabValue(1);
                        setShowConsentForm(true)
                    }
                    else if (encId > 0) {
                        showMessage("Success", "Encounter updated successfully.", "success", 3000);
                        setTabValue(1);
                        setShowConsentForm(true)
                    }

                    setDataId(result.data.encounterID);
                    setEncounterState(prevState => ({
                        ...prevState,
                        ['encounterID']: result.data.encounterID
                    }));
                    //encounterState.encounterID = result.data.encounterID;
                    getEncounterList();
                    //setUpdateList(!updateList);
                    //setIsOpenEncounterDialog(false);
                }
                else {

                    showMessage("Error", result.message, "error", 3000);
                    // setIsOpenEncounterDialog(true);
                }
            })

        }
        else {
            e.preventDefault();
        }
    };
    const [showConsentForm, setShowConsentForm] = useState(false);
    const handleShowConsentForm = (show) => {
        consentFormState.fileName = '';
        attachment.userFileName = '';
        setShowConsentForm(show)
    }

    const getDefaultApptType = () => {
        var params = {
            code: "get_dafault_appt_type",
            parameters: [patientAppointmentId.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null && result.data.length > 0) {
                setEncounterState(prevState => ({
                    ...prevState,
                    visitTypeCode: result.data[0].text1
                }));
            }
        })
    }

    return (
        <>
            <div className={isCloseView ? classes.shrinkedRecentBox : classes.recentBox}>
                {isCloseView ?
                    <>
                        {/* <ChevronRightIcon className={classes.shrinkIcon} onClick={()=>setIsCloseView(false)}/> */}
                        <div className={classes.smartRecentHeader}>
                            <ChevronRightIcon className={classes.smartShrinkIcon} onClick={() => setIsCloseView(false)} />
                            {encId == 0 ? <span className={classes.smartAddEnBtn} onClick={() => addEncounter()}><img src={AddIcon} alt="Create Encounter" /></span> : null}
                        </div>
                    </> :
                    <ChevronLeft className={classes.shrinkIcon} onClick={() => setIsCloseView(true)} />}
                {!isCloseView ?
                    <>
                        <div className={classes.recentHeader}>
                            <span style={{ height: "25px" }}>{`Encounter(s) - ${props.patientName}`}</span>
                            {encId == 0 ?
                                <span className={classes.addEnBtn} onClick={() => addEncounter()}><img src={AddIcon} alt="Create Encounter" /> Start Encounter</span>
                                : null}
                        </div>
                        <div className={classes.recentSearch}>
                            <InputBase
                                fullWidth
                                maxLength="20"
                                name="searchlist"
                                placeholder="Search"
                                className={classes.baseInput}
                                value={searchList}
                                onChange={e => searchOnChange(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                } />
                        </div>
                    </> : ""
                }
                <ul className={classes.recentList}>
                    {filterDataList.map(encData => (
                        <div className={encData.encounterID == selectedEncounterId ? classes.selectedEncounter : ""}>
                            <li onClick={() => selectedEncounterDetail(encData.encounterID, encData.signed, encData.providerId, encData.encounterTypeId)}>
                                <div className={isCloseView ? classes.shrinkedListIcon : classes.listIcon}>
                                    {/*{encData.providerId}*/}
                                    {encData.isAddendum === true ? <img src={Addendum} alt="addendum" className={classes.addendumIcon} /> :
                                        encData.signed == 1 ? <LockIcon /> :
                                            // <LockOpenIcon />
                                            <Icon className={classes.unSignedEncounterIcon}><img src={unLockedEncounter} /></Icon>
                                    }
                                    {/* {encData.isAddendum === true ? <img src={Addendum} alt="addendum" className={classes.addendumIcon} /> : null} */}
                                </div>
                                {!isCloseView ? <div className={classes.listContent}>
                                    <span className={classes.listContentTitle}> {encData.encounterDate}
                                        <span className={classes.listOfficeVisit}>{encData.visitType}</span></span>
                                    <span className={classes.listContentCC}>CC: {encData.ccDetail}</span>
                                </div>
                                    : ""}
                            </li>
                        </div>
                    ))}
                    {filterDataList.length === 0 && searchList != 0 ? <span className={classes.noRecordFound}><span><SearchIcon /></span>No records found </span> : ""}
                </ul>
            </div>
            <Dialog
                PaperComponent={DraggableComponent}
                open={isOpenEncounterDialog || filterData.length <= 0}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                classes={{ paper: classes.dialogPaper }}
            >

                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Paper square classes={{ root: classes.muiPaper }}>
                                <Tabs
                                    classes={{ root: classes.tabRoot }}
                                    value={tabvalue}
                                    onChange={onTabChange}
                                    aria-label="icon tabs example"
                                    className={classes.Htabs}
                                >
                                    <Tab label={encId > 0 ? "Edit Encounter" : "Create Encounter"} aria-label="phone" {...a11yProps(0)} />
                                    <Tab label="Patient Forms" aria-label="favorite" {...a11yProps(1)} disabled={!encId > 0} />
                                </Tabs>
                            </Paper>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>

                            <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                                {tabvalue == 0 ?
                                    <Grid container >
                                        <Grid item lg={12} container direction="row">
                                            <Label title="Visit Type" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                <SelectField
                                                    id="visitTypeCode"
                                                    name="visitTypeCode"
                                                    value={encounterState.visitTypeCode}
                                                    placeholder="Select Visit Type"
                                                    options={visitTypeList}
                                                    onChange={handleChange}
                                                />

                                                {errorMessages.errorVisitTypeCode && (!encounterState.visitTypeCode || encounterState.visitTypeCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select visit type
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                            <Label title="Visit Date" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                <InputBaseField
                                                    IsDisabled={true}
                                                    placeholder="Select Date"
                                                    onChange={handleChange}
                                                    name="encDate"
                                                    value={encounterState.encDate}
                                                    MaxLength="255"
                                                    type="date"

                                                />
                                                {errorMessages.errorEncDate && (!encounterState.encData || encounterState.encData.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select visit date
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                            <Label title="Check In Time" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8}>

                                                <InputBaseField
                                                    IsDisabled={true}
                                                    placeholder="09:00 am"
                                                    onChange={handleChange}
                                                    type="time"
                                                    name="encTime"
                                                    value={encounterState.encTime}
                                                    MaxLength="10"

                                                />

                                                {errorMessages.errorEncTime && (!encounterState.encTime || encounterState.encTime.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select visit time
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                            <Label title="Provider" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                {
                                                    userInfo.isProvider ? (
                                                        <InputBaseField
                                                            placeholder="Provider Name"
                                                            onChange={handleChange}
                                                            name="providerName"
                                                            value={`${userInfo.firstName} ${userInfo.lastName}`}
                                                            MaxLength='255'
                                                            disabled
                                                        />
                                                    ) : (
                                                        <>
                                                            <SelectField
                                                                id="providerId"
                                                                name="providerId"
                                                                placeholder="Select Provider"
                                                                value={encounterState.providerId}
                                                                MaxLength='255'
                                                                options={providers}
                                                                onChange={handleProviderChange}
                                                            />
                                                            {errorMessages.errorproviderId && !encounterState.providerId ? (<FormHelperText style={{ color: "red" }} >
                                                                Please select provider
                                                            </FormHelperText>) : ('')}
                                                        </>
                                                    )
                                                }

                                            </Grid>

                                            <Label title="Location" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                <SelectField
                                                    id="userLocationId"
                                                    name="userLocationId"
                                                    value={encounterState.userLocationId}
                                                    placeholder=" Select Location"
                                                    options={userLocations}
                                                    onChange={handleChange}
                                                />

                                                {errorMessages.erroruserLocationId && !encounterState.userLocationId ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select location
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                            <Label title="Chart Note Type" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                <SelectField
                                                    id="encounterTypeId"
                                                    name="encounterTypeId"
                                                    value={encounterState.encounterTypeId}
                                                    placeholder="Select Chart Note Type"
                                                    options={encounterTypeList}
                                                    onChange={handleChange}
                                                />

                                                {errorMessages.errorEncounterType && (!encounterState.encounterTypeId > 0) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select chart note type
                                                </FormHelperText>) : ('')}

                                            </Grid>

                                            <Label title="Comments" isTextAreaInput={true} size={3} mandatory={false} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <TextareaField
                                                    rowsMin={5}
                                                    placeholder="Comments"
                                                    onChange={handleChange}
                                                    name="comments"
                                                    value={encounterState.comments}
                                                    MaxLength="2000"
                                                />
                                            </Grid>

                                        </Grid>
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                            <Grid item xs={3} sm={3} md={3} lg={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8}>
                                                {/* <FooterBtn className={classes.footerBtn}> */}
                                                {encounterState.isSigned ? <FormBtn id="save" disabled={true} onClick={saveEncounter}>Save </FormBtn> : <FormBtn id="save" onClick={saveEncounter}>Save </FormBtn>}

                                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>

                                                {/* </FooterBtn> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    : ""}
                            </TabPanel>

                            <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                                {tabvalue == 1 ?
                                    <Grid container>

                                        <Grid container className={classes.customTableGrid}>

                                            <div className={classes.consentFormDataTable}>
                                                <div className="custom-grid">
                                                    <Table
                                                        locale={{
                                                            emptyText: (
                                                                <Empty
                                                                    image={isLoading && LoadingIcon}
                                                                    description={isLoading ? "Loading..." : "No Record Found"}
                                                                    imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                                />
                                                            )
                                                        }}
                                                        checkStrictly={true}
                                                        scroll={true}
                                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                        dataSource={rowsData}
                                                        columns={ConsentFormsColumns}
                                                    />
                                                </div>
                                            </div>
                                            {showConsentForm ?
                                                <Grid container direction="row" className={classes.inputGrid}>
                                                    <Label title="Consent form Title" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={9} md={9} lg={9} >

                                                        <InputBaseField
                                                            id="fileName"
                                                            name="fileName"
                                                            placeholder="Consent form Title"
                                                            onChange={handleConsentChange}
                                                            value={consentFormState.fileName}
                                                            MaxLength="150"
                                                        />
                                                        {errorMessages.errorFileName ? (<ErrorMessage >
                                                            Please enter file name
                                                        </ErrorMessage>) : ('')}
                                                    </Grid>

                                                    <Label title="Upload Consent Form" size={3} mandatory={true} />
                                                    <Grid item xs={12} sm={9} md={9} lg={9} >

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
                                                            {errorMessages.errorAttachment && !attachment.file ? (<ErrorMessage >
                                                                Please select a file
                                                            </ErrorMessage>) : ('')}
                                                        </form>

                                                    </Grid>
                                                </Grid>
                                                :
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.addNewButton}
                                                    startIcon={<img src={AddIcon} />}
                                                    onClick={() => handleShowConsentForm(true)}
                                                >
                                                    Add New Consent Form
                                                </Button>
                                            }
                                        </Grid>
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.inputGrid}>
                                            {showConsentForm ?
                                                <>
                                                    <Grid item xs={3} sm={3} md={3} lg={3} />
                                                    <Grid item xs={12} sm={8} md={8} lg={8}>

                                                        <FormBtn id="save" btnType="add" onClick={SaveConsentForm}>Add </FormBtn>
                                                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>

                                                    </Grid>

                                                    <FormGroupTitle /></>
                                                : ''}
                                        </Grid>
                                    </Grid>
                                    : ""}
                            </TabPanel>
                        </div>
                    </div>
                </div>

            </Dialog>
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

    );
}

export default withSnackbar(EncountersList)