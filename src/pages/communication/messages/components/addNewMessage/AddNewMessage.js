import React, { useState, useRef, useEffect } from "react";
import {
    Dialog,
    Grid,
    IconButton,
    Button
} from "@material-ui/core";
import useStyles from "./styles";
import { AttachFile, Add as AddIcon } from '@material-ui/icons';
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { InputBaseField, TextareaField, SelectField, CheckboxField } from "../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, ErrorMessage, FormGroupTitle, Label } from "../../../../../components/UiElements/UiElements";
// import SearchList from "../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../../../components/Message/Alert";
import PatientSearchList from "../../../../../components/PatientSearchList/PatientSearchList"
import { GetUserInfo } from '../../../../../Services/GetUserInfo';

import './styles';
import "antd/dist/antd.css";
import { Select } from 'antd';
// import "antd/lib/select/style/index.css";

function AddNewMessage({ showHideDialog, handleClose, message, type, ...props }) {

    const abilityList = [
        { label: 'In Practice', value: 'practice' },
        { label: 'Patient', value: 'patient' }
    ];

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({
        emailMessageId: 0,
        messageTypeCode: "practice",
        patientId: 0,
        addToChart: false,
        patientName: "",
        messageSubject: "",
        messageBody: '',
        isUrgent: false,
        messageStatusCode: "",
        attachments: [],
        sendTo: [],
        replyOnMessageId: 0
    });
    const [errorMessages, setErrorMessages] = useState({

        errMessageSubject: false,
        errMessageBody: false,
        errSendTo: false,
        errMessageTypeCode: false
    });
    const [patientList, setPatientList] = useState([]);
    //
    const [allProviders, setAllProviders] = useState([]);
    const inputFile = useRef(null);
    const [attachment, setAttachment] = useState({ files: null, fileName: null });
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false)
    const { Option } = Select;

    function clearAllFields() {


    }

    const init = () => {

        if (message && message.length > 0 && message[0].emailMessageId > 0) {
            setState({
                emailMessageId: 0,
                messageTypeCode: message[0].messageTypeCode,
                patientId: message[0].patientId,
                addToChart: false,
                patientName: message[0].patientName,
                messageSubject: message[0].messageSubject.startsWith(type + ": ") ? message[0].messageSubject : type + ": " + message[0].messageSubject,
                messageBody: type == "RE" || type == "FW" ?'':message[0].messageBody,
                isUrgent: message[0].isUrgent,
                messageStatusCode: "",
                attachments: message[0].attachments,
                sendTo: type == "RE" ? [parseInt(message[0].createdBy)] : [],
                replyOnMessageId: type == "RE" ? message[0].emailMessageId : null,
                fwOnMessageId: type == "FW" ? message[0].emailMessageId : null
            })
            

            var path = "";

            message[0].attachments.forEach((item) => {
                path += item.replace(/^.*(\\|\/|\:)/, '');
            })

            attachment.fileName = path;

    }
        else {
        setState({
            emailMessageId: 0,
            messageTypeCode: "practice",
            patientId: 0,
            addToChart: false,
            patientName: "",
            messageSubject: "",
            messageBody: '',
            isUrgent: false,
            messageStatusCode: "",
            attachments: [],
            sendTo: [],
            replyOnMessageId: 0
        })
    }
}

const multiSelectHandleChange = (value) => {
    // console.log(`selected ${value}`);

    setState(prevState => ({
        ...prevState,
        sendTo: value
    }))
    setOpen(false)
}
let userID = JSON.parse(GetUserInfo()).user.userID;
useEffect(() => {
    init();
    loadToSearchList(state.messageTypeCode);
}, []);

const loadToSearchList = (messageCodeType) => {
    //Do the search on server for this select
    var params = {
        code: messageCodeType != "patient" ? "providers_staff_search" : "patient_list",
        parameters: [userID.toString(), ""]
    }
    PostDataAPI("ddl/loadItems", params).then((result) => {
        if (result.success && result.data != null) {

            // console.log(result.data)
            setSearchResults(
                result.data.map((item, i) => {
                    return { value: parseInt(item.text1), label: item.text2 };
                }));
        }
        else {
            setSearchResults([]);
        }

    });
}

const handleFileInput = (e) => {

    const { name, value } = e.target;

    return;
}
const handleSelectFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
};
function handleFileUpload(e) {

    setAttachment({ files: null, fileName: null });
    const newFiles = []
    for (let i = 0; i < e.target.files.length; i++) {
        newFiles.push(e.target.files[i].name)
    }
    console.log(newFiles)
    setAttachment({
        files: e.target.files,
        fileName: newFiles ///e.target.files[0].name//.map(p => p.name).join(',')
    })

    // setAttachment({ file: null, fileToSend: null, fileName: null });
}

const onChangeType = (e) => {

    const { name, value } = e.target;

    setState(prevState => ({
        ...prevState,
        [name]: value
    }))

    inputFile.current.value = '';

    setAttachment({ files: '', fileName: '' });



    setState({
        emailMessageId: 0,
        messageTypeCode: e.target.value,
        patientId: "",
        addToChart: false,
        patientName: "",
        messageSubject: "",
        messageBody: '',
        isUrgent: false,
        messageStatusCode: "",
        attachments: [],
        sendTo: [],
        replyOnMessageId: 0
    })


    if (name == "messageTypeCode")
        loadToSearchList(value);



}
const handleChange = (e) => {
    const { name, value } = e.target;

    setState(prevState => ({
        ...prevState,
        [name]: value
    }))
    if (name == "messageTypeCode")
        loadToSearchList(value);
}
const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: checked
    }))
}
const handleSearcdhListPatientChange = (name, item) => {

    const { id, value } = item;

    setState(prevState => ({
        ...prevState,
        patientId: id,
        patientName: value
    }));
}

const handleToChange = (name, item) => {

    const { id, value } = item;
    setState(prevState => ({
        ...prevState,
        provider: id,
        providerName: value
    }))
    setState(prevState => ({
        ...prevState,
        sendTo: state.sendTo.concat(id)
    }))
}

const handleChangePatientId = (item) => {
    // console.log(value)
    const { id, value } = item;
    setState(prevState => ({
        ...prevState,
        patientId: value == '' ? '' : id,
        patientName: value
    }));
}

const save = () => {

    var validated = true;
    if (!state.messageBody || state.messageBody.trim() == '') {
        setErrorMessages(prevState => ({
            ...prevState,
            'errMessageBody': true
        }))
        validated = false;
    }
    else {
        setErrorMessages(prevState => ({
            ...prevState,
            'errMessageBody': false
        }))
    }
    if (!state.messageSubject || state.messageSubject.trim() == '') {
        setErrorMessages(prevState => ({
            ...prevState,
            'errMessageSubject': true
        }))
        validated = false;
    }
    else {
        setErrorMessages(prevState => ({
            ...prevState,
            'errMessageSubject': false
        }))
    }
    if (!state.sendTo || state.sendTo.length == 0) {
        setErrorMessages(prevState => ({
            ...prevState,
            'errSendTo': true
        }))
        validated = false;
    }
    else {
        setErrorMessages(prevState => ({
            ...prevState,
            'errSendTo': false
        }))
    }

    if (validated == false)
        return true;

    setIsSaving(true);
    var method = "com/emailmessage/add";
    const formData = new FormData();
    for (var key in state) {
        if (key == 'sendTo') {
            for (var i = 0; i < state.sendTo.length; i++) {
                formData.append('sendTo' + '[' + i + ']', state.sendTo[i]);
            }
        }
        else if (state[key] && key != "attachment" && key != "encUserID")
            formData.append(key, state[key]);
    }

    if (attachment != null && attachment.files != null) {
        for (var i = 0; i < attachment.files.length; i++) {
            //formData.append("attachments" + '[' + i + ']', attachment.files[0]);
            formData.append("attachments", attachment.files[i]);
        }
    }

    PostDataAPI(method, formData, true, "formData").then((result) => {

        setIsSaving(false);

        if (result.success && result.data != null) {

            showMessage("Success", "Message sent successfully.", "success", 2000);
            setTimeout(() => {
                handleClose();
            }, 2000);
        }
        else showMessage("Error", result.message, "error", 8000);
    })
}

//State For Action Dialog
const [actiondialogprops, setActionDialogProps] = useState({
    actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
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
    <>

        <Dialog
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown>
            <Scrollbars autoHeight autoHeightMax={700} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>{type == "RE" ? "Reply" : type == "FW" ? "Forward" : "New"} Message</FormGroupTitle>

                        </div>
                        <Scrollbars autoHeight autoHeightMax={620}
                            style={{ maxHeight: 580, display: "flex", }}>
                            <div className={classes.content}>
                                <Grid container direction="row">

                                    <Grid container direction="row">
                                        {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} /> */}
                                        <Label title="Type" size={3} mandatory={true} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} >

                                            <SelectField
                                                id="messageTypeCode"
                                                name="messageTypeCode"
                                                options={abilityList}
                                                value={state.messageTypeCode}
                                                onChange={onChangeType}
                                            />


                                            {errorMessages.errMessageTypeCode && !state.messageTypeCode ? (<ErrorMessage >
                                                Please select message type
                                            </ErrorMessage>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" >
                                        <Label title="To" mandatory={true} size={3} />
                                        <Grid item xs={9} sm={8} md={8} lg={8} xl={8}>
                                            {/* <SearchList
                                                    id="provider"
                                                    name="provider"
                                                    value={state.provider}
                                                    searchTerm={state.providerName}
                                                    code="providers_Staff_by_location"
                                                    apiUrl="ddl/loadItems"
                                                    isUser={true}
                                                    onChangeValue={(name, item) => handleToChange(name, item)}
                                                    placeholderTitle="Search Provider / Staff"

                                                />
                                                {state.sendTo} */}
                                            <Select
                                                showArrow={true}
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder={state.messageTypeCode == "patient" ? "Search Patient" : "Search Provider / Staff"}
                                                defaultValue={state.sendTo}
                                                value={state.sendTo}
                                                optionLabelProp="label"
                                                filterOption={(inputValue, Option) =>
                                                    Option.children
                                                        .toString()
                                                        .toLowerCase()
                                                        .includes(inputValue.toLowerCase())
                                                }
                                                // open={open}
                                                onChange={value => {
                                                    multiSelectHandleChange(value)
                                                    //setState(false)
                                                }}
                                            // onFocus={() => setOpen(true)}
                                            // onBlur={() => setOpen(false)}
                                            // onSearch={() => setOpen(true)}
                                            >
                                                {
                                                    searchResults.map((item, i) => (
                                                        <Option key={i} value={item.value} label={item.label}>{item.label}</Option>
                                                    ))
                                                }
                                            </Select>
                                            {errorMessages.errSendTo && state.sendTo.length == 0 ? (<ErrorMessage >
                                                Please select patient name
                                            </ErrorMessage>) : ('')}
                                        </Grid>
                                    </Grid>

                                    {state.messageTypeCode == "patient" ? null :
                                        <Grid container direction="row" >
                                            <Label title="Regarding Patient" size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                <PatientSearchList
                                                    name={state.patientName}
                                                    value={state.patientId}
                                                    onChangeValue={(item) => handleChangePatientId(item)}
                                                    placeholderTitle="Search Patient"
                                                />

                                            </Grid>

                                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ paddingLeft: "5%" }}>
                                                <CheckboxField
                                                    color="primary"
                                                    id="addToChart"
                                                    name="addToChart"
                                                    checked={state.addToChart}
                                                    onChange={handleCheckBoxChange}
                                                    label="Add to Chart"
                                                />

                                            </Grid>
                                        </Grid>
                                    }
                                    <Grid container direction="row" >
                                        <Label title="Subject" mandatory={true} size={3} />
                                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <InputBaseField
                                                id="messageSubject"
                                                name="messageSubject"
                                                value={state.messageSubject}
                                                onChange={handleChange}
                                                placeholder={"Subject"}
                                                MaxLength="500"
                                            />


                                            {errorMessages.errMessageSubject && (!state.messageSubject || state.messageSubject.trim() == '') ? (<ErrorMessage >
                                                Please enter subject
                                            </ErrorMessage>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" >
                                        <Label title="Message" isTextAreaInput={true} mandatory={true} size={3} />
                                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <TextareaField
                                                rowsMin={8}
                                                MaxLength="4000"
                                                id="messageBody"
                                                name="messageBody"
                                                value={state.messageBody}
                                                onChange={handleChange}
                                                placeholder={"Type your message here"}
                                            />

                                            {errorMessages.errMessageBody && (!state.messageBody || state.messageBody.trim() == '') ? (<ErrorMessage >
                                                Please enter message
                                            </ErrorMessage>) : ('')}
                                        </Grid>
                                    </Grid>


                                    <Grid container direction="row" >
                                        <Label title="Attachment" size={3} />
                                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span className={classes.btnSpan}>

                                                <InputBaseField
                                                    name="uploadFile"
                                                    placeholder="Upload Files"
                                                    value={attachment.fileName}
                                                    onChange={handleFileInput}
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
                                                    <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} multiple accept=".png, .jpg, .jpeg, .xlsx, .pdf, .xml" />
                                                </div>
                                            </form>
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9} style={{ margin: "-10px 0 6px 0", paddingLeft: "2px" }}>
                                            <CheckboxField
                                                color='primary'
                                                id='isUrgent'
                                                name='isUrgent'
                                                checked={state.isUrgent}
                                                onChange={handleCheckBoxChange}
                                                label='Urgent'
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>
                        </Scrollbars>
                    </div>

                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            {isSaving ?
                                <FormBtn id="loadingSave" btnType="send"> Send</FormBtn>
                                :
                                <FormBtn id="save" btnType="send" onClick={save}> Send</FormBtn>
                            }
                            <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                        </Grid>
                    </Grid>
                </div>
            </Scrollbars >
        </Dialog >

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

export default withSnackbar(AddNewMessage)