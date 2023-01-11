import React, { useState, useEffect } from "react"
import {

    Dialog,
    FormHelperText,

    Grid,

} from "@material-ui/core";
import PropTypes from 'prop-types';
import useStyles from "./styles"

import CloseIcon from "../../../../images/icons/math-plus.png"

import { InputBaseField, SelectField, TextareaField } from "../../../../components/InputField/InputField";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";

import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import TemplateAccordionComplaint from '../common/templateAccordionComplaint';
import AddTemplateDialog from '../common/addTemplateDialog';
import { getFormatedTemplateDetailChiefComplaint } from '../../../../components/Common/Extensions';


function CheifComplaint({ showHideDialog, handleClose,handleSuccess, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;

    const [cheifComplaintList, setCheifComplaintList] = useState([
    ]);
    const [addTempDialog, setAddTempDialog] = useState(false);

    const [templateSettings, setTemplateSettings] = useState({
        punctuationAndSpacing: "predefinedPunctuationAndSpacing",
        customPunctuationAndSpacing: "",
        predefinedPunctuationAndSpacing: "",
        newLine: "doNotAddNewLine"
    });

    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);
    const [visitTypeList, setVisitTypeList] = useState([]);
    const [historyPresentedByList, setHistoryPresentedByList] = useState([]);
    // const [open, setOopenpen] = useState(false);
    //const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("Please type on ...", 'html'));
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const [encounterId, setEncounterId] = useState(props.encounterId);

    const [loading, setLoading] = useState(false);
    const [reloadAccordian, setReloadAccordian] = useState(false);
    const [templateText, setTemplateText] = useState("");
    const [textSplitter, setTextSpliter] = useState(", ");

    const [isSaving, setIsSaving] = useState(false);
    const MAX_EDITOR_LENGTH = 2000;

    //Ref
    const cheifComplaintRef = useState({ complaintRef: "", visitReasonRef: "", historyPresentedByRef: "" });
    //
    const [anchorEl, setAnchorEl] = useState(null);
    // const openAddNew = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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
    //

    const [chiefComplaintState, setChiefComplaintState] = useState({
        encounterID: 0, ccDetail: "", chiefComplaintId: 0, hpiDetail: "", ccVisitReasonCode: "", historyPresentedBy: "", cheifComplaintDetails: ""
    });

    const [patientDetailState, setPatientDetailState] = useState({});

    const [errorMessages, setErrorMessages] = useState({
        errorCCDetail: false, errorHPIDetail: false, errorEditorMaxValue:false, errorCCVisitReasonCode: false, errorHistoryPresentedBy: false, errorHPILength: false
    })

    //hanlde functions

    useEffect(() => {

        if (showHideDialog) {
            
            setLoading(true);
            getTemplateSettings();
            setChiefComplaintFormState();
            getPatientDetails();
            setChiefComplaintState({
                encounterID: 0, ccDetail: "", chiefComplaintId: 0, hpiDetail: "", ccVisitReasonCode: "", historyPresentedBy: "", cheifComplaintDetails: ""
            });
            setErrorMessages({
                errorCCDetail: false, errorHPIDetail: false, errorEditorMaxValue:false, errorCCVisitReasonCode: false, errorHistoryPresentedBy: false, errorHPILength: false
            });
            setErrorMessages(prevState => ({
                ...prevState,
                errorHPIDetail: false,
                errorEditorMaxValue:false
            }));
            setLoading(false);
        }

    }, [showHideDialog]);

    const getTemplateSettings = e => {
        let method = "userchartnotetempsetting/loadGrid";
        PostDataAPI(method, true).then((result) => {
            setIsSaving(false);

            if (result.success == true && result.data != null && result.data.length > 0) {

                let data = result.data[0];
                var strSplitter = ", ";
                if (data.isCustomSetting == false) {
                    switch (data.predefinedSettingCode) {
                        case "comma_space": strSplitter = ", "; break;
                        case "period": strSplitter = "."; break;
                        case "period_space": strSplitter = ". "; break;
                        case "space": strSplitter = " "; break;
                        case "no": strSplitter = ""; break;
                    }
                }
                else {
                    strSplitter = data.customSettingString;
                }

                if (data.addNewLineCode == "oneline")
                    strSplitter += "<br\>";
                else if (data.addNewLineCode == "twoline")
                    strSplitter += "<br\><br\>";

                setTextSpliter(strSplitter);
            }
        });
    }

    const getDropdownsList = e => {
        
        var params = {
            code: "DDL_List_Item",
            parameters: ['visit_type_code', 'history_presented_by']
        };
        //cheifComplaintList
        //'chief_complaints'

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                var _visitTypeList = [];
                var _historyPreList = [];

                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'visit_type_code':
                            _visitTypeList.push({ value: item.text1, label: item.text2 });
                            break;
                        case 'history_presented_by':
                            _historyPreList.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                });

                setVisitTypeList(_visitTypeList);
                //Move Other option to the last of list.
                var objOther = _historyPreList.filter(t => t.value == 'Other').pop();
                let updatedList = _historyPreList.filter(t => t.value != 'Other');
                updatedList.push(objOther);
                setHistoryPresentedByList(updatedList);

            }
        });

        params = {
            code: "chief_complaints",
            parameters: [encounterId.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setCheifComplaintList(result.data.map((item, i) => {
                    return { value: item.id, label: item.text1 }
                }));

            }
        });
    }

    const saveAsTemplate = (event) => {
        let editorHpiDetail = editorValue.toString('html');
        const strippedString = editorHpiDetail.replace(/(<([^>]+)>)/gi, "");
        setTemplateText(strippedString.toString());
        setAddTempDialog(true);

    };
    const handleAddTemplateClose = () => {
        setAddTempDialog(false);
        //setReloadAccordian(reloadAccordian);
    }


    const setChiefComplaintFormState = e => {
        getDropdownsList();
        if (props.encounterId == undefined || props.encounterId == "" || props.encounterId < 0) {

            setChiefComplaintState(prevState => ({
                ...prevState,

                encounterID: 0, ccDetail: "", chiefComplaintId: 0, hpiDetail: "", ccVisitReasonCode: "", historyPresentedBy: "", cheifComplaintDetails: ""
            }
            ));
        }
        else {
            getChiefComplaintDetail(props.encounterId);
        }
    }

    const getChiefComplaintDetail = (encounterId) => {
        
        PostDataAPI("encounter/getChiefComplaintById", parseInt(encounterId)).then((result) => {

            if (result.success && result.data != null) {
                setChiefComplaintState({
                    ccDetail: result.data.ccDetail,
                    hpiDetail: RichTextEditor.createValueFromString(result.data.hpiDetail, 'html'),
                    ccVisitReasonCode: result.data.ccVisitReasonCode,
                    historyPresentedBy: result.data.historyPresentedBy,
                    encounterID: result.data.encounterID,
                    cheifComplaintDetails: result.data.cheifComplaintDetails,
                    chiefComplaintId: result.data.chiefComplaintId
                });

                if (result.data.hpiDetail != null)
                    setEditorValue(RichTextEditor.createValueFromString(result.data.hpiDetail, 'html'));
                else
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    const handleCCChange = (e) => {
        const { name, value, id } = e.target;
        const selectedText = e.target.options[e.target.selectedIndex].text;
        setChiefComplaintState(prevState => ({
            ...prevState,
            [name]: selectedText,
            [id]: value
        }));
    }
    const handleChange = (e) => {
       const { name, value } = e.target;

        setChiefComplaintState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }



    const handleEditorChange = (editorValue) => {
      const regex = /(<([^>]+)>)/ig;
      const editorHpiDetail = editorValue.toString('html').replace(regex, '');

      if (editorHpiDetail && editorHpiDetail.length > (MAX_EDITOR_LENGTH)) {
        setErrorMessages(prevState => ({
            ...prevState,
            errorEditorMaxValue: true
        }));
    }
    else {
        setErrorMessages(prevState => ({
            ...prevState,
            errorEditorMaxValue: false
        }));
    }
      
         setEDITOR_CHAR_LENGTH(editorHpiDetail.length);

        if (editorHpiDetail && editorHpiDetail != "" && editorHpiDetail != "<p><br></p>" && editorHpiDetail != "<p></p>")
            errorMessages.errorHPIDetail = false;
         setEditorValue(editorValue);
    }


    const handleSelectedSubItem = (sbItem) => {
       if (!sbItem.templateText)
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        else {
            addingNewTextToEditor(sbItem.templateText);

        }
    }

    const addingNewTextToEditor = (txtToAdd) => {
        txtToAdd = getFormatedTemplateDetailChiefComplaint(txtToAdd, patientDetailState);
        txtToAdd = txtToAdd.replaceAll("&nbsp;", '').replaceAll("<p>", '').replaceAll("</p>", '');
        //txtToAdd = txtToAdd.substring(0, txtToAdd.length - 4);
        //txtToAdd = txtToAdd.slice(3);
        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }

        var existingText = editorValue.toString('html');
        
        existingText = existingText.substring(0, existingText.length - 4);
        existingText = existingText.slice(3);

        //existingText = existingText.replaceAll('<p>', '').replaceAll('</p>', '');
        if (!existingText || existingText.replaceAll("<br>", '').replaceAll("</br>", '').replaceAll("&nbsp;", '').trim() == "")
            existingText = txtToAdd;
        else
            existingText += textSplitter + txtToAdd;
        existingText = "<p>" + existingText + "</p>";
        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));
    }

    const getPatientDetails = e => {
         PostDataAPI("patient/getPatient", parseInt(props.patientId)).then((result) => {
            if (result.success && result.data != null) {
                setPatientDetailState(result.data);
            }
        })
    }

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'strikethrough', style: 'STRIKETHROUGH' },
            //{ label: 'blockquote', style: 'BLOCKQUOTE' }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
            { label: 'Blockquote', style: 'blockquote' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Style', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ]

    };

    const getPreviousHPI = (e) => {
        
        let encData = {
            "patientId": props.patientId
        }

        PostDataAPI("encounter/getPreviousHPI", encData, true).then((result) => {

            if (result.success && result.data != null)
                setEditorValue(RichTextEditor.createValueFromString(result.data, 'html'));
            else
                setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        })
    }

    const SaveChiefCompaint = (e) => {
        
        e.preventDefault();
        let errorList = []

        let editorHpiDetail = editorValue.toString('html');
        if (editorHpiDetail && editorHpiDetail.length > (MAX_EDITOR_LENGTH * 1.5)) {
            showMessage("Error", `Maximum ${MAX_EDITOR_LENGTH} characters allowed in HPI detail`, "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorHPILength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHPILength: false
            }));
        }

        if (!chiefComplaintState.historyPresentedBy || chiefComplaintState.historyPresentedBy.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHistoryPresentedBy: true
            }));
            errorList.push(true);
            cheifComplaintRef.historyPresentedByRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHistoryPresentedBy: false
            }));
        }
        if (!chiefComplaintState.ccVisitReasonCode || chiefComplaintState.ccVisitReasonCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCCVisitReasonCode: true
            }));
            errorList.push(true);
            cheifComplaintRef.visitReasonRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCCVisitReasonCode: false
            }));
        }

        if (!chiefComplaintState.chiefComplaintId || chiefComplaintState.chiefComplaintId == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCCDetail: true
            }));
            errorList.push(true);
            cheifComplaintRef.complaintRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCCDetail: false
            }));

        }

        const testEmptyHtml = /(<([^>]+)>)/ig
        if (!editorHpiDetail || editorHpiDetail == "" || editorHpiDetail == "<p><br></p>" || !!editorHpiDetail.replace(testEmptyHtml, "") == "" || editorHpiDetail == "<p></p>") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHPIDetail: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHPIDetail: false
            }));
        }

        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "encounter/editEncounterForChiefComplaint";

            chiefComplaintState.hpiDetail = editorHpiDetail;

            chiefComplaintState.encounterID = encounterId;
            chiefComplaintState.chiefComplaintId = parseInt(chiefComplaintState.chiefComplaintId);
            PostDataAPI(method, chiefComplaintState, true).then((result) => {
                if (result.success == true) {
                    setIsSaving(false);
                    setErrorMessages([]);
                    handleSuccess("Data saved successfully.");
                 
                    //showMessage("Success", "Data saved successfully.", "success", 3000);
                    //handleClose();
                    //setEncounterId(result.data.encounterID);
               
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setIsSaving(false);
                    e.preventDefault();
                }
            })

        }
        else {
            e.preventDefault();
        }

    }


    const closeDialog = () => {

        setChiefComplaintState(prevState => ({
            ...prevState,
            ccDetail: ""
        }));

        setChiefComplaintState(prevState => ({
            ...prevState,
            cheifComplaintDetails: ""
        }));


        handleClose();
        setAnchorEl(null);

    }

    return (
        <>


            <Dialog
                PaperComponent={DraggableComponent}
                // classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                // TransitionComponent={Transition}
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'md'}
                {...props} >
                <Scrollbars autoHeight autoHeightMax={610} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <TemplateAccordionComplaint
                                    handleSelectedSubItem={handleSelectedSubItem}
                                    sectionCode="cheif_complaint"
                                    isUpdate={reloadAccordian}
                                    patientId={props.patientId}
                                    height={'calc(100% - 64px)'}
                                >
                                </TemplateAccordionComplaint>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>Chief Complaint</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>

                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 495 }}>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Chief Complaint" size={4} mandatory={true} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    <SelectField
                                                        placeholder="Select Chief Complaint"
                                                        onChange={handleCCChange}
                                                        name="ccDetail"
                                                        id="chiefComplaintId"
                                                        value={chiefComplaintState.chiefComplaintId}
                                                        MaxLength="255"
                                                        type="text"
                                                        options={cheifComplaintList}
                                                        inputProps={{ ref: input => cheifComplaintRef.complaintRef = input }}
                                                    />
                                                    {errorMessages.errorCCDetail && (!chiefComplaintState.chiefComplaintId || chiefComplaintState.chiefComplaintId.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                        Please add chief complaint
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            <Grid container alignItems="center" justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <FormGroupTitle>HPI</FormGroupTitle>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <RichTextEditor
                                                    className={classes.comlplaintrichTextEdit}
                                                    value={editorValue}
                                                    onChange={handleEditorChange}
                                                    toolbarConfig={toolbarConfig}
                                                    autoHeightMax={2}
                                                />
                                                 {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH}
                                                {errorMessages.errorHPIDetail ? (<FormHelperText style={{ color: "red" }} >
                                                        Please add HPI detail
                                                    </FormHelperText>) : ('')}
                                                {errorMessages.errorEditorMaxValue ?
                                                    (<FormHelperText style={{ color: "red" }} >Maximum 2000 characters allowed</FormHelperText>)
                                                    : ('')
                                                }

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                                <Label title="Visit Reason" size={4} mandatory={true} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    {/*<SelectField*/}
                                                    {/*    id="ccVisitReasonCode"*/}
                                                    {/*    name="ccVisitReasonCode"*/}
                                                    {/*    value={chiefComplaintState.ccVisitReasonCode}*/}
                                                    {/*    placeholder=" Select visit reason"*/}
                                                    {/*    options={visitTypeList}*/}
                                                    {/*    onChange={handleChange}*/}
                                                    {/*/>*/}

                                                    <InputBaseField
                                                        placeholder="Visit Reason"
                                                        onChange={handleChange}
                                                        name="ccVisitReasonCode"
                                                        value={chiefComplaintState.ccVisitReasonCode}
                                                        MaxLength="50"
                                                        type="text"
                                                        inputProps={{ ref: input => cheifComplaintRef.visitReasonRef = input }}
                                                    />

                                                    {errorMessages.errorCCVisitReasonCode && (!chiefComplaintState.ccVisitReasonCode || chiefComplaintState.ccVisitReasonCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select visit reason
                                                    </FormHelperText>) : ('')}


                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="History Provided by" size={4} mandatory={true} />
                                                <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                    <SelectField
                                                        id="historyPresentedBy"
                                                        name="historyPresentedBy"
                                                        value={chiefComplaintState.historyPresentedBy}
                                                        placeholder=" Select history presented by"
                                                        options={historyPresentedByList}
                                                        onChange={handleChange}
                                                        inputProps={{ ref: input => cheifComplaintRef.historyPresentedByRef = input }}
                                                    />
                                                    {errorMessages.errorHistoryPresentedBy && (!chiefComplaintState.historyPresentedBy || chiefComplaintState.historyPresentedBy.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select history presented by
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            {chiefComplaintState.historyPresentedBy === "Other" ?
                                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Label title="Details" size={4} mandatory={false} />
                                                    <Grid container alignItems="flex-start" justify="flex-start" xs={12} sm={7} md={7} lg={7} xl={7}>

                                                        <InputBaseField
                                                            id="cheifComplaintDetails"
                                                            name="cheifComplaintDetails"
                                                            value={chiefComplaintState.cheifComplaintDetails}
                                                            placeholder="Details"
                                                            onChange={handleChange}
                                                            MaxLength="100"
                                                        />
                                                        {/* {errorMessages.errorHistoryPresentedBy && (!chiefComplaintState.historyPresentedBy || chiefComplaintState.historyPresentedBy.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select history presented by
                                                    </FormHelperText>) : ('')} */}
                                                    </Grid>
                                                </Grid> : ""}
                                        </Grid>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={getPreviousHPI} btnType="temp">Previous HPI</FormBtn>
                                    {/*<FormBtn id="save" onClick={saveAsTemplate}>Save as Template</FormBtn>*/}
                                    <div className={classes.footerRight}>
                                        {isSaving ?
                                            <FormBtn id="loadingSave" > Save</FormBtn>
                                            :
                                            <FormBtn id="save" onClick={SaveChiefCompaint} > Save</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>

                {addTempDialog ?
                    <AddTemplateDialog targetID={0} sectionCode={"cheif_complaint"} isUpdate={reloadAccordian} templateText={templateText} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
                    : null
                }

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

export default withSnackbar(CheifComplaint)
