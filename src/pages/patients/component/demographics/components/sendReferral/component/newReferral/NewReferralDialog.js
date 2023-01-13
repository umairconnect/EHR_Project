import React, { useState, useEffect, useRef } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
// import EditIcon from "../../../../../../../../images/icons/erase.png";
import PasswordIcon from "../../../../../../../../images/icons/password-icon.png";
import {
    Grid,
    Dialog,
    Typography,
    Tab,
    Tabs,
    Paper,
    Popper,
    IconButton,
    FormHelperText,
    InputBase,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormLabel,
    Tooltip
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AttachFile } from '@material-ui/icons';


import { InputBaseField, SelectField, TextareaField, CheckboxField } from "../../../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";
// import LogDialog from "../../../../../../../../components/LogDialog/LogDialog";
import SearchList from '../../../../../../../../components/SearchList/SearchList';
import { GetUserInfo } from '../../../../../../../../Services/GetUserInfo';
import { withSnackbar } from '../../../../../../../../components/Message/Alert'

import EditIcon from "../../../../../../../../images/icons/erase.png";

import DeleteIcon from "../../../../../../../../images/icons/trash.png";
import NewReferringProvider from "../newReferringProvider/NewReferringProvider";
import SelectClinical from "../selectClinical/SelectClinical";
import LoadingIcon from "../../../../../../../../images/icons/loaderIcon.gif";
import { formatDate } from '../../../../../../../../components/Common/Extensions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "330px", height: "440px", margin: "0px", backgroundColor: "#FFFFFF",
                borderRadius: "0px", overflow: "auto"
            }}
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


function NewReferralDialog({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [tabvalue, setTabValue] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [providerDialogOpenClose, setProviderDialogOpenClose] = useState(false);
    const [selectClinicalDialogOpenClose, setSelectClinicalDialogOpenClose] = useState(false);
    const [allAttachmentsList, setAllAttachmentsList] = useState([])
    const [providersRowsData, setProvidersRowsData] = useState([]);
    const [templatesRowsData, setTemplatesRowsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [attachmentRowsData, setAttachmentRowsData] = useState([]);
    const inputFile = useRef(null);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    //const [attachment, setAttachment] = useState({ file: null, userPhoto: null, userFileName: null });
    const [edit, setEdit] = useState(false);
    const [attachment, setAttachment] = useState([]);
    const [currentAttachment, setCurrentAttachment] = useState({});
    //{ file: null, userPhoto: null, userFileName: null }

    const [CollapsePanel, setCollapsePanel] = useState(true);
    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const CollapsePanelSet = () => {
        if (CollapsePanel == true) {
            setCollapsePanel(false)
        } else {
            setCollapsePanel(true)
        }
    }
    const btnEditTemplate = (item, event) => {


        referralItemState.itemTemplateId = item.referralId;
        referralItemState.itemCode = item.referralCode;
        referralItemState.templateText = item.refferalDescription;
        referralItemState.itemTitle = item.refferalFor;

        setAnchorEl(anchorEl ? null : event.currentTarget);
        //setReferralItemState({
        //    itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", isFavorite: false, subItemDTOList: []
        //});

        //const id = item;
        //setRosTemplateId(id);
        //getROSItemTemplateByID(id);
        //setIsRosTemplateEdited(true);

        //setAddTempDialog(true);

        //console.warn(id)

    };
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
    const deleteTemplateItem = (item) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this Referral Template?", "confirm", function () {


            referralItemState.itemTemplateId = item.referralId;
            referralItemState.itemCode = item.referralCode;
            referralItemState.templateText = item.refferalDescription;
            referralItemState.itemTitle = item.refferalFor;
            var method = 'itemTemplate/deleteItemTemplate';
            PostDataAPI(method, referralItemState, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    getTemplateList()
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });

    }
    const defaultAttr = {
        refferalId: 0, providerRefOrdId: 0, refProviderName: '', patientId: props.patientId,
        specializationId: 0, providerId: 0, refferalFor: '', includeClinicalSummary: true,
        userId: parseInt(userInfo.loggedInUserID), refferalAttachementId: 0,
        userName: userInfo.firstName + ' ' + userInfo.lastName,
        objSelectedDocs: {
            socialHistory: true, vitalSigns: true, diagnosisHistory: true, assessmentPlan: true,
            medications: true, procedures: true, allergies: true, encounters: true, immunizations: true,
            chiefComplaint: true, laboratoryTest: true, implantableDevices: true, functionalStatus: true,
            congnitiveStatus: true, carePlan: true, healthConcerns: true
        }
    };
    const [defaulSelectClinicalAttributes] = useState({
        socialHistory: true, vitalSigns: true, diagnosisHistory: true, assessmentPlan: true,
        medications: true, procedures: true, allergies: true, encounters: true, immunizations: true,
        chiefComplaint: true, laboratoryTest: true, implantableDevices: true, functionalStatus: true,
        congnitiveStatus: true, carePlan: true, healthConcerns: true
    });
    const [selectClinicalstate, setSelectClinicalstate] = useState(defaulSelectClinicalAttributes);
    const handleIncludeClinicalChange = (e) => {
        const { checked, name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));

        setClinicalDocuments({
            socialHistory: checked,
            vitalSigns: checked,
            diagnosisHistory: checked,
            assessmentPlan: checked,
            medications: checked,
            procedures: checked,
            allergies: checked,
            encounters: checked,
            immunizations: checked,
            chiefComplaint: checked,
            laboratoryTest: checked,
            implantableDevices: checked,
            functionalStatus: checked,
            congnitiveStatus: checked,
            carePlan: checked,
            healthConcerns: checked
        });
    }
    const [state, setState] = useState(defaultAttr);
    const [clickSearchLoading, setClickSearchLoading] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    // const openAddNew = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const [referralItemState, setReferralItemState] = useState({
        itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", isFavorite: false, subItemDTOList: []

    });
    const btnAddTemplate = (event) => {
        //showMessage("Information", "Feature will be added soon.", "info", 2000);
        //return;
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setReferralItemState({
            itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", isFavorite: false, subItemDTOList: []
        });
    }

    useEffect(() => {
        initialization();
    }, [providerDialogOpenClose]);


    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue == 1) {
        }
    };
    const [errorMessages, setErrorMessages] = useState();
    const closeDialog = () => {
        setEdit(false);
        handleClose();

    }
    function handleFileUpload(e) {
        setCurrentAttachment({ file: null, userPhoto: null, userFileName: null });
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        chosenFiles.map(item => {
            let attachDoc = {
                refferalAttachementId: 0,
                file: URL.createObjectURL(item),
                userPhoto: item,
                userFileName: item.name
            }
            attachment.push(attachDoc)
        });

        setState(prevState => ({
            ...prevState,
            refferalAttachementId: 0
        }))

        //setAttachment({ file: null, fileToSend: null, fileName: null });
    }
    const handleReferringProviderChange = (name, item, val) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            ["providerRefOrdId"]: parseInt(id),
            ["refProviderName"]: value,
            ['email']: item.extraParam1
        }));
    }
    const handleSearchListChange = (name, item, val) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            ["providerId"]: parseInt(id),
            ["providerName"]: value
        }));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleTemplateClick = (text) => {
        setState(prevState => ({
            ...prevState,
            ['refferalFor']: text ? text : ''
        }))
    }
    const handleAttachmentClick = (i) => {

        var objAttachment = attachmentRowsData[i];
        let attachDoc = {
            refferalAttachementId: objAttachment.refferalAttachementId,
            userPhoto: objAttachment.filePath,
            userFileName: objAttachment.fileName,
            isReferralDocument: objAttachment.isReferralDocument
        }
        attachment.push(attachDoc);
        setCurrentAttachment({
            //file: URL.createObjectURL(objAttachment.filePath),
            userPhoto: objAttachment.filePath,
            userFileName: objAttachment.fileName
        });
        //inputFileRef.current.click();
        setState(prevState => ({
            ...prevState,
            refferalAttachementId: objAttachment.refferalAttachementId,
            isReferralDocument: objAttachment.isReferralDocument
        }))
    }

    const handleDeleteAttachment = (index) => {

        console.log(index)
        const _attachment = attachment.filter((item) => attachment.indexOf(item) !== index);
        setAttachment(_attachment);

    }

    const handleRefProviderSearchChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const [specialityList, setSpecialityList] = useState([]);
    //const inputFileRef = useRef(null);
    const initialization = () => {
        getRefProviderList();
        getTemplateList();
        getAttachmentsList();
        var params = {
            code: 'provider_specilizations',
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setSpecialityList(result.data.map((item, i) => {
                    return { label: item.text1, value: item.id };
                }));

            }
        });
    }
    const getRefProviderList = () => {
        var params = [userInfo.loggedInUserID];
        PostDataAPI("patientrefferal/getRefProviderList", params).then((result) => {
            if (result.success && result.data != null) {

                setProvidersRowsData(result.data.map((item, i) => {
                    return {
                        providerRefOrdId: item.providerRefOrdId, refProviderName: item.refProviderName,
                        providerSpeciality: item.specialtyName, providerType: 'Email',
                        email: item.email, specializationId: item.specializationId
                    };
                }))
                //setProvidersRowsData(result.data);
            }
        });
    };
    const getTemplateList = () => {
        var params = [state.refProviderName];
        PostDataAPI("patientrefferal/getRefProviderTemplates", params).then((result) => {
            if (result.success && result.data != null) {

                setTemplatesRowsData(result.data.map((item, i) => {
                    return {
                        referralId: item.refferalId,
                        referralCode: item.refferalCode,
                        refferalFor: item.refferalFor,
                        refferalDescription: item.refferalDescription

                    };
                }))
            }
        });
    };
    const getAttachmentsList = () => {
        var params = [props.patientId.toString()];
        PostDataAPI("patientrefferal/getRefferalAttachments", params).then((result) => {
            if (result.success && result.data != null) {

                setAttachmentRowsData(result.data.map((item, i) => {
                    return {
                        refferalAttachementId: item.refferalAttachementId,
                        attachmentSign: true,
                        //attachmentFileName: item.fileName.length > 30 ? item.fileName.substring(0, 30) + '...' : item.fileName,
                        attachmentFileName: item.fileName,
                        fileName: item.fileName,
                        filePath: item.filePath,
                        attachmentReferral: item.isReferralDocument ? "Referrals" : "Documents",
                        attachmentDate: formatDate(item.createDate),
                        isReferralDocument: item.isReferralDocument

                    };
                }))
            }
        });
    };
    const setClinicalDocuments = (objSelectedDocs) => {
        setState(prevState => ({
            ...prevState,
            ['objSelectedDocs']: objSelectedDocs
        }));
        setSelectClinicalstate(objSelectedDocs);
    }
    const EmailReferral = () => {
        let errorList = [];

        Validate(errorList);
        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "patientrefferal/add";
            //if (dataId.dataId ? dataId.dataId : dataId > 0)
            //    method = "patientrefferal/update";

            state.specializationId = parseInt(state.specializationId);

            let formData = new FormData();
            for (var key in state) {
                if (key == 'objSelectedDocs') {
                    for (let docsKey in state[key]) {
                        formData.append(`objSelectedDocs[${docsKey}]`, state[key][docsKey]);
                    }
                }
                else if (state[key] && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);

            }
            var refferalDocuments = "";
            var isReferralDocuments = "";
            for (var i = 0; i < attachment.length; i++) {
                if (attachment[i].refferalAttachementId <= 0) {
                    formData.append("formFile", attachment[i].userPhoto);
                } else {
                    let refObj = { refferalAttachementId: attachment[i].refferalAttachementId, isReferralDocument: attachment[i].isReferralDocument }
                    refferalDocuments = refferalDocuments + attachment[i].refferalAttachementId + ",";
                    isReferralDocuments = isReferralDocuments + attachment[i].isReferralDocument + ",";
                    formData.append("attachedFiles", refObj);
                }

            }
            var options = { content: formData }
            formData.append("refferalDocuments", refferalDocuments);
            formData.append("isReferralDocuments", isReferralDocuments);
            console.log(options);

            //formData.append("formFile", attachment.userPhoto);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                //setSaveLoading(false);
                setIsSaving(false);
                if (result.success == true) {
                    if (result.success && result.data != null) {

                        setState(result.data);
                        showMessage("Success", "Referral saved successfully.", "success", 2000);
                        setTimeout(() => {
                            closeDialog();
                            setState(defaultAttr);
                        }, 2000);

                    }

                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                    setIsSaving(false);
                }
            })
        }
    }
    const FaxReferral = () => {
        let errorList = [];

        Validate(errorList);
        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "patientrefferal/fax";
            //if (dataId.dataId ? dataId.dataId : dataId > 0)
            //    method = "patientrefferal/update";

            state.specializationId = parseInt(state.specializationId);

            let formData = new FormData();
            for (var key in state) {
                if (key == 'objSelectedDocs') {
                    for (let docsKey in state[key]) {
                        formData.append(`objSelectedDocs[${docsKey}]`, state[key][docsKey]);
                    }
                }
                else if (state[key] && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);

            }
            //formData.append("formFile", attachment.userPhoto);
            for (var i = 0; i < attachment.length; i++) {
                formData.append("formFile", attachment[i].userPhoto);
            }
            //formData.append("scannedEobPath", attachment.file);

            PostDataAPI(method, formData, true, 'formData').then((result) => {
                //setSaveLoading(false);
                setIsSaving(false);
                if (result.success == true) {
                    //setErrorMessages([]);
                    //if (dataId < 1) {
                    if (result.success && result.data != null) {

                        setState(result.data);

                        // showMessage("Success", "Insurance saved successfully.", "success", 2000);
                        showMessage("Success", "Referral saved successfully.", "success", 2000);

                        //setDataId({
                        //    dataId: result.data.insuranceId
                        //});
                        setTimeout(() => { closeDialog(); }, 2000);

                    }
                    //}
                    //else if (dataId > 0 || dataId != "") {
                    //    if (result.success) {
                    //        setIsSaving(false);
                    //        // showMessage("Success", "Insurance updated successfully.", "success", 3000);
                    //        ShowMessageDialog(true, "Success", "Insurance updated successfully.", "success", 3000)
                    //        setTimeout(() => { handleClose(); }, 2000);
                    //    }
                    //}
                }
                else {
                    // showMessage("Error", result.message, "error", 15000);
                    showMessage("Error", result.message, "error", 3000);

                    setIsSaving(false);
                }
            })
        }
    }
    const Validate = (errorList) => {
        if (!state.providerRefOrdId > 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderRef: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderRef: false
            }));
        }
        //if (!state.specializationId > 0) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorSpecialization: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorSpecialization: false
        //    }));
        //}
        if (!state.providerId > 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderIdId: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderIdId: false
            }));
        }

    }
    const handleAddNewProvider = () => {
        setProviderDialogOpenClose(true);
    }
    const handleCloseProviderDialog = () => {
        setProviderDialogOpenClose(false);
    }
    const handleNewReferralProvider = (id, name) => {
        setProviderDialogOpenClose(false);
        setState(prevState => ({
            ...prevState,
            ['providerRefOrdId']: id
        }));
        handleCloseSelectClinicalDialog();
    }
    const handleSelectClinical = () => {
        setSelectClinicalDialogOpenClose(true);
    }
    const handleCloseSelectClinicalDialog = () => {
        setSelectClinicalDialogOpenClose(false);
    }

    const ProvidersRowClick = (index) => {
        setClickSearchLoading(false)
        const objRefProvider = providersRowsData[index];
        setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                ['providerRefOrdId']: objRefProvider.providerRefOrdId,
                ['email']: objRefProvider.email,
                ['specializationId']: objRefProvider.specializationId,
                ['refProviderName']: objRefProvider.refProviderName
            }));
            setClickSearchLoading(true)
        }, 200);

    }
    const [errorMessagesTemplateItem, setErrorMessagesTemplateItem] = useState({
        errorItemCode: false, errorItemTitle: false, errorTemplateText: false /*, errorSectionCode: false*/
    });

    const handleTemplateChange = (e) => {
        const { name, value } = e.target;

        setReferralItemState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleListInputChange = (e, index) => {


        const { name, value } = e.target;
        const list = [...subItemList];
        list[index][name] = value;
        setSubItemList(list);
        referralItemState.templateText = value;
    };
    const [templateId, setTemplateId] = useState(0);
    const [subItemList, setSubItemList] = useState([{ templateText: ""/*, sectionCode:"referral"*/ }]);
    const [encRowsData, setEncRowsData] = useState([]);
    const getTemplatesList = e => {

        let encData = {
            "section": "referral",
            "userID": userInfo.loggedInUserID,
        }

        PostDataAPI("itemTemplate/loadItemTemplateGrid", encData).then((result) => {

            if (result.success && result.data != null) {

                setEncRowsData(
                    result.data.map((item, i) => {
                        return {
                            itemTemplateId: item.itemTemplateId,
                            itemCode: item.itemCode,
                            itemTitle: item.itemTitle,
                            isFavorite: item.isFavorite,
                            subItemDTOList: item.subItemDTOList
                        };
                    }));

            }

        })
    }
    const SaveTemplate = (e) => {

        e.preventDefault();
        let errorList = []

        if (!referralItemState.itemCode || referralItemState.itemCode.trim() == "") {
            
            setErrorMessagesTemplateItem(prevState => ({
                ...prevState,
                errorItemCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesTemplateItem(prevState => ({
                ...prevState,
                errorItemCode: false
            }));
        }
        if (!referralItemState.itemTitle || referralItemState.itemTitle.trim() == "") {
            
            setErrorMessagesTemplateItem(prevState => ({
                ...prevState,
                errorItemTitle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesTemplateItem(prevState => ({
                ...prevState,
                errorItemTitle: false
            }));
        }
        if (errorList.length < 1) {

            let subItemText = [];
            if (subItemList.length == 1)
                subItemText = subItemList;
            else
                subItemText = subItemList.filter(c => c.templateText != "");

            let method = "itemTemplate/addItemTemplate";
            if (referralItemState.itemTemplateId > 0) {
                setTemplateId(referralItemState.itemTemplateId);
                method = "itemTemplate/updateReferralItemTemplate";
                if (referralItemState.subItemDTOList == null) {
                    referralItemState.subItemDTOList = subItemText;
                    referralItemState.subItemDTOList.sectionCode = "referral";
                }
                else {
                    referralItemState.subItemDTOList = subItemText;
                    referralItemState.subItemDTOList.sectionCode = "referral";
                }
            }
            else
                referralItemState.subItemDTOList = subItemText;
            referralItemState.subItemDTOList.sectionCode = "referral";

            //find duplication
            let duplicate = false
            referralItemState.subItemDTOList.map((item, index) => {
                if (referralItemState.subItemDTOList.filter(c => c.templateText.trim() == item.templateText.trim()).length > 1) {
                    duplicate = true;
                }
            });
            if (duplicate) {
                showMessage("Error", "Duplicate sub items exist.", "error", 3000);
                return;
            }


            referralItemState.sectionCode = "referral";

            PostDataAPI(method, referralItemState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    setErrorMessagesTemplateItem([]);

                    if (referralItemState.itemTemplateId < 1) {
                        showMessage("Success", "Item template saved successfully.", "success", 3000);
                    }
                    else if (referralItemState.itemTemplateId > 0) {
                        showMessage("Success", " Item template updated successfully.", "success", 3000);
                    }
                    setAnchorEl(anchorEl ? null : false);
                    setTemplateId(0);
                    setReferralItemState(prevState => ({
                        ...prevState,
                        subItemDTOList: []
                    }));
                    //setIsCCTemplateEdited(false);
                    getTemplateList();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    e.preventDefault();
                }
            })

        }
        else {
            e.preventDefault();
        }

    }
    return (
        <>
            <Dialog
                open={dialogOpenClose}
                onClose={handleClose}
                disableBackdropClick

                disableEnforceFocus
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                maxWidth={'md'}>
                <Scrollbars autoHeight autoHeightMax={610} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>
                                        <Paper square classes={{ root: classes.muiPaper }}>
                                            <Tabs
                                                classes={{ root: classes.tabRoot }}
                                                value={tabvalue}
                                                onChange={onTabChange}
                                                aria-label="icon tabs example"
                                                className={classes.Htabs}
                                            >
                                                <Tab label="Providers" aria-label="providers" {...a11yProps(0)} />
                                                <Tab label="Templates" aria-label="templates" {...a11yProps(1)} />
                                                <Tab label="Attachments" aria-label="attachments" {...a11yProps(2)} />
                                            </Tabs>
                                        </Paper>
                                    </div>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 495 }}>
                                        <div className={classes.quickPickHeader}>
                                            <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                                                {tabvalue == 0 ? (
                                                    <>
                                                        <ul className={classes.templatesList} >
                                                            {providersRowsData.map((item, i) => (
                                                                <li key={i} onClick={() => { ProvidersRowClick(i) }}>
                                                                    <span className={classes.providerName}>{item.refProviderName} </span>
                                                                    <span className={classes.providerSpeciality}>{item.providerSpeciality}</span>
                                                                    <span className={classes.providerType}>{item.providerType}</span>
                                                                    {/*<span className={classes.editIcon} title="Edit" ><img src={EditIcon} alt="edit" /></span>*/}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>) : ""}
                                            </TabPanel>
                                            <TabPanel value={tabvalue} index={1}>
                                                {tabvalue == 1 ? (
                                                    <>
                                                        <Accordion expanded={CollapsePanel} onChange={() => CollapsePanelSet()}>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.templateHeader} >
                                                                General Referral
                                                            </AccordionSummary>
                                                            {templatesRowsData.map((item, i) => (<AccordionDetails className={classes.templateDetail}>
                                                                <div className={classes.templateList}>

                                                                    <span className={classes.referralDetail} onClick={() => { handleTemplateClick(item.refferalDescription) }}> {item.refferalFor}
                                                                    </span>

                                                                    {edit ?
                                                                        <>

                                                                            <span className={classes.editIcon} title="Edit" onClick={(event) => btnEditTemplate(item, event, i)}><img src={EditIcon} alt="edit" /></span>
                                                                            <span className={classes.deleteItemIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteTemplateItem(item)} /></span>
                                                                        </>
                                                                        : <></>
                                                                    }
                                                                </div>


                                                            </AccordionDetails>))}
                                                        </Accordion>
                                                    </>)
                                                    : ""}
                                            </TabPanel>
                                            <TabPanel value={tabvalue} index={2}>
                                                {tabvalue == 2 ? (
                                                    <>
                                                        {/* <div className={classes.recentSearch}>
                                                            <SelectField
                                                                placeholder="All Attachments"
                                                                // onChange={handleChange}
                                                                name="allAttachments"
                                                                id="allAttachments"
                                                                value={''}
                                                                MaxLength="255"
                                                                type="text"
                                                                options={allAttachmentsList}
                                                            />
                                                        </div> */}
                                                        <ul className={classes.templatesList} >


                                                            {attachmentRowsData.length > 0 ?

                                                                <>
                                                                    {attachmentRowsData.map((item, i) => (
                                                                        <li key={i} className={classes.attachmentLi} onClick={() => { handleAttachmentClick(i) }}>
                                                                            <span className={classes.signIcon}>{item.attachmentSign ?
                                                                                <img src={PasswordIcon} alt="Sign" />
                                                                                : null}</span>

                                                                            <Tooltip title={item.attachmentFileName}>
                                                                                <span className={classes.refProviderName}>
                                                                                    {item.attachmentFileName}
                                                                                </span>
                                                                            </Tooltip>

                                                                            <span className={classes.attachmentReferral}>{item.attachmentReferral}</span>
                                                                            <span className={`${classes.providerType} ${classes.attachmentDate}`}>{item.attachmentDate}</span>
                                                                            <span className={classes.attachmentIcon} title="Attachment" ><AttachFile style={{ color: "#00B4E5" }} /></span>
                                                                        </li>
                                                                    ))}
                                                                </> : <div className={classes.NoAttachment}> No attachment Found</div>
                                                            }

                                                        </ul>
                                                    </>)
                                                    : ""}
                                            </TabPanel>
                                        </div>
                                    </Scrollbars>
                                </div>
                                {tabvalue == 1 ? (
                                    <div className={classes.footer}>
                                        <FormBtn id="save" btnType="temp" onClick={btnAddTemplate}>Add Template</FormBtn>
                                        {edit ? <FormBtn id="reset" onClick={() => { setEdit(false) }}>Cancel Edit</FormBtn>
                                            : <FormBtn id="reset" onClick={() => { setEdit(true) }}>Edit Template</FormBtn>}
                                    </div>)

                                    : null}
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>New Referral</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 495 }}>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Referral to" size={3} mandatory={true} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7} className={classes.positionR}>
                                                    {clickSearchLoading ?
                                                        <SearchList
                                                            id="providerRefOrdId"
                                                            name="providerRefOrdId"
                                                            value={state.providerRefOrdId}
                                                            searchTerm={state.refProviderName}
                                                            code="refferingProvider"
                                                            apiUrl="ddl/loadItems"
                                                            isUser={false}
                                                            placeholderTitle="Search Provider"
                                                            onChangeValue={(name, item) => handleReferringProviderChange(name, item)}
                                                        /> : <img className={classes.loader} src={LoadingIcon} alt="Loading..." />}
                                                    <IconButton color="primary" title="Add New Referral Provider" onClick={() => handleAddNewProvider()} className={classes.patientAddBtn} aria-label="Add new Referral to" component="span"  >
                                                        <AddCircleOutlineIcon style={{ color: "#00B4E5" }} />
                                                    </IconButton>
                                                    {errorMessages?.errorProviderRef && !state.providerRefOrdId > 0 ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select referral to provider
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>
                                            {/*<Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>*/}
                                            {/*    <Label title="Referral Speciality" size={3} mandatory={true} />*/}
                                            {/*    <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>*/}
                                            {/*        <SelectField*/}
                                            {/*            placeholder="Select"*/}
                                            {/*            onChange={handleChange}*/}
                                            {/*            name="specializationId"*/}
                                            {/*            id="specializationId"*/}
                                            {/*            value={state.specializationId}*/}
                                            {/*            MaxLength="255"*/}
                                            {/*            type="text"*/}
                                            {/*            options={specialityList}*/}
                                            {/*        />*/}
                                            {/*        {errorMessages?.errorSpecialization && !state.specializationId > 0 ? (<FormHelperText style={{ color: "red" }} >*/}
                                            {/*            Please select specialization*/}
                                            {/*        </FormHelperText>) : ('')}*/}
                                            {/*    </Grid>*/}
                                            {/*</Grid>*/}

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="On Behalf of" size={3} mandatory={true} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                                    <SearchList
                                                        id="providerId"
                                                        name="providerId"
                                                        value={state.providerId}
                                                        searchTerm={state.providerName}
                                                        code="get_all_providers_query"
                                                        apiUrl="ddl/loadItems"
                                                        isUser={false}
                                                        placeholderTitle="Search Provide"
                                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                    />
                                                    {errorMessages?.errorProviderIdId && !state.providerId > 0 ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select provider
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.textAreaLabel}>
                                                <Label title="Referral For" size={3} isTextAreaInput={true} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                                    <TextareaField
                                                        rowsMin={5}
                                                        placeholder="Referral For"
                                                        onChange={handleChange}
                                                        name="refferalFor"
                                                        value={state.refferalFor}
                                                        MaxLength="2000"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Sincerely" size={3} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                                    <InputBaseField
                                                        id="userId"
                                                        name="userId"
                                                        value={state.userName}
                                                        placeholder="Sincerely"
                                                        onChange={handleChange}
                                                        MaxLength="100"
                                                        IsDisabled={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.textAreaLabel}>
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={3} sm={3} md={3} lg={3} xl={3} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                                    <CheckboxField
                                                        color="primary"
                                                        name="includeClinicalSummary"
                                                        checked={state.includeClinicalSummary}
                                                        onChange={handleIncludeClinicalChange}
                                                        label=""
                                                    />
                                                    <span title="Select Clinical Document for Patient" className={classes.includLink} onClick={() => handleSelectClinical()}>Include Clinical Summary</span>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12} alignItems="baseline">
                                                <Label title="Attachment" size={3} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>
                                                    <div className={classes.btnSpan}>
                                                        <InputBaseField
                                                            name="uploadFile"
                                                            placeholder="Upload File"
                                                            value={currentAttachment.userFileName}
                                                            IsDisabled={true}
                                                        />
                                                        <IconButton
                                                            className={classes.attachmentBtn}
                                                            color="primary"
                                                            onClick={handleSelectFile}
                                                        >
                                                            <AttachFile style={{ color: "#00B4E5" }} />
                                                        </IconButton>
                                                    </div>
                                                    <form>
                                                        <div>
                                                            <input ref={inputFile} style={{ display: "none" }} multiple type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                                        </div>
                                                    </form>

                                                    <ul className={classes.attachmentTemplateList} >
                                                        {attachment.length > 0 ?
                                                            <>
                                                                {attachment.map((item, i) => (
                                                                    <li key={i}>
                                                                        <span className={classes.attachmentReferral}>{item.userFileName}</span>
                                                                        <span className={classes.deleteItemIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => handleDeleteAttachment(i)} /></span>
                                                                    </li>
                                                                ))}
                                                            </> : ''
                                                        }

                                                    </ul>
                                                </Grid>

                                            </Grid>
                                            <Grid container alignItems="center" justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Grid container alignItems="flex-start" justify="flex-start" xs={1} sm={1} md={1} lg={1} xl={1}>
                                                </Grid>
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={9} sm={9} md={9} lg={9} xl={9}>
                                                    <Typography variant="h6" className={classes.note}>Note:</Typography>
                                                    <Typography variant="caption" className={classes.caption}>Some document types labeled, such as clinical summary can only be sent electronically. Also fax size is limited to 500kb.</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="reset" onClick={closeDialog} >Cancel</FormBtn>
                                    <div className={classes.footerRight}>
                                        {/*<FormBtn id="lightBlue" disabled={!props.isEditable} onClick={FaxReferral}> Fax </FormBtn>*/}
                                        {isSaving ?
                                            <FormBtn id="loadingSave" btnType="email" > Email </FormBtn>
                                            :
                                            <FormBtn id="save" btnType="email" onClick={EmailReferral} disabled={!props.isEditable}> Email </FormBtn>
                                        }
                                        {/*<FormBtn id="reset" disabled={!props.isEditable} onClick={() => { showMessage("Information", "Feature will be added soon.", "info", 2000); }}> Preview </FormBtn>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>
            </Dialog>
            <Popper className={classes.addRosBox} id={id} open={open} anchorEl={anchorEl} placement={'top-left'} transition>
                <Paper className={classes.paper} >
                    <span className={classes.popupCrossButton} onClick={btnAddTemplate}><img src={CloseIcon} /></span>
                    {referralItemState.itemTemplateId <1 ? <div className={classes.addRosTitle}>Add Template</div> : <div className={classes.addRosTitle}>Edit Template</div>}
                    {loading ?
                        <div className={classes.loaderDiv}> <img className={classes.loader} src={LoadingIcon} alt="Loading..." /></div> : (<>
                            <div className={classes.addRosContent}>
                                <Grid container >
                                    <Grid item lg={12} container direction="row">
                                        <Grid item xs={4} md={4} sm={4} lg={4}>
                                            <FormLabel className={classes.lableInput}>Template Name<span className={classes.mandatorColor}>*</span>:</FormLabel>
                                        </Grid>
                                        <Grid item xs={8} md={8} sm={8} lg={8} >
                                            <InputBaseField
                                                fullWidth
                                                placeholder="Template name"
                                                onChange={handleTemplateChange}
                                                name="itemTitle"
                                                value={referralItemState.itemTitle}
                                                MaxLength="280"
                                            />
                                            {errorMessagesTemplateItem?.errorItemTitle? (<FormHelperText style={{ color: "red" }} >
                                                Please enter title
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={12} container direction="row">
                                        <Grid item xs={4} md={4} sm={4} lg={4}>
                                            <FormLabel className={classes.lableInput}>Short Code<span className={classes.mandatorColor}>*</span>:</FormLabel>
                                        </Grid>
                                        <Grid item xs={8} md={8} sm={8} lg={8} >
                                            <InputBaseField
                                                fullWidth
                                                placeholder="Short Code"
                                                onChange={handleTemplateChange}
                                                name="itemCode"
                                                value={referralItemState.itemCode}
                                                MaxLength="4"
                                                type="text"
                                            />
                                            {errorMessagesTemplateItem?.errorItemCode ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter code
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <FormGroupTitle >Items</FormGroupTitle>
                                <Grid container className={classes.inputContainer}>
                                    <Scrollbars autoHeight autoHeightMax={200} style={{ maxHeight: "100%" }}>
                                        <Grid item lg={12} container direction="row">
                                            <Grid item xs={12} md={12} sm={12} lg={12} style={{ display: "flex" }}>
                                                <TextareaField
                                                    rowsMin={5}
                                                    name="templateText"
                                                    placeholder={"Description"}
                                                    value={referralItemState.templateText}
                                                    onChange={e => handleListInputChange(e, 0)}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Scrollbars>
                                </Grid>
                            </div>
                            <div className={classes.addRosFooter}><FormBtn id="save" onClick={SaveTemplate}>Save</FormBtn></div>
                        </>)}
                </Paper>
            </Popper>
            {
                providerDialogOpenClose ?
                    <NewReferringProvider
                        dialogOpenClose={providerDialogOpenClose}
                        handleClose={handleCloseProviderDialog}
                        handleAddNew={(id, name) => { handleNewReferralProvider(id, name); }}
                    />
                    : null
            }
            {
                selectClinicalDialogOpenClose ?
                    <SelectClinical
                        dialogOpenClose={selectClinicalDialogOpenClose}
                        handleClose={handleCloseSelectClinicalDialog}
                        getClinicalDocuments={(objSelectedDocs) => { setClinicalDocuments(objSelectedDocs) }}
                        selectClinicalstate={selectClinicalstate}
                    />
                    : null
            }

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
    )

}
export default withSnackbar(NewReferralDialog)