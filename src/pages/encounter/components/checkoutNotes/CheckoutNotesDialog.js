import React, { useState, useEffect } from "react"
import {
    Dialog,
    FormHelperText,

    Grid,

} from "@material-ui/core";

import useStyles from "./styles"

import CloseIcon from "../../../../images/icons/math-plus.png"

import { InputBaseField, TextareaField } from "../../../../components/InputField/InputField";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import TemplateAccordion from '../common/templateAccordion';
import AddTemplateDialog from '../common/addTemplateDialog';
import { getFormatedTemplateDetails } from '../../../../components/Common/Extensions';


function CheckoutNotes({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [reloadAccordian, setReloadAccordian] = useState(false);
    const [templateText, setTemplateText] = useState("");
    const [addTempDialog, setAddTempDialog] = useState(false);
    const [textSplitter, setTextSpliter] = useState(", ");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [patientDetailState, setPatientDetailState] = useState({});
    //------------------
    const MAX_EDITOR_LENGTH = 2000;

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    //------------------

    const [conState, setCONState] = useState({
        checkoutNote: "",
        checkoutDatetime: "",
        encounterID: 0,
        appointmentId: 0
    });


    const [errorMessages, setErrorMessages] = useState({
        errorCheckoutDatetime: false, errorCheckoutNote: false, errorCheckoutNoteLength: false
    })

    //hanlde functions

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

    useEffect(() => {

        if (showHideDialog) {

            setLoading(true);

            getTemplateSettings();

            setCONFormState();

            getPatientDetails();

            setErrorMessages({
                errorCheckoutDatetime: false, errorCheckoutNote: false
            })

            setLoading(false);
        }

    }, [showHideDialog]);

    const getTemplateSettings = e => {
        setLoading(true);
        let method = "userchartnotetempsetting/loadGrid";
        PostDataAPI(method, true).then((result) => {
            setLoading(false);

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


    const saveAsTemplate = (event) => {

        let editorHpiDetail = editorValue.toString('html');
      
        const strippedString = editorHpiDetail.replace(/(<([^>]+)>)/gi, "");
        setTemplateText(strippedString.toString());
        setAddTempDialog(true);

    };
    const handleAddTemplateClose = () => {
        setAddTempDialog(false);
        setReloadAccordian(reloadAccordian);
    }

    const setCONFormState = e => {

        setCONState({
            encounterID: props.encounterId,
            checkoutDatetime: props.coTime,
            checkoutNote: setEditorValue(RichTextEditor.createValueFromString(props.coNote, 'html')),
            appointmentId: parseInt(props.patientAppointmentId)
        });

    }

    const handleCONStateChange = (e) => {
        const { name, value } = e.target;

        setCONState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleEditorChange = (editorValue) => {
        const editorHpiDetail = editorValue.toString('html');
        if (editorHpiDetail && editorHpiDetail != "" && editorHpiDetail != "<p><br></p>" && editorHpiDetail != "<p></p>")
            errorMessages.errorCheckoutNote = false;
        setEditorValue(editorValue);
    }


    const SaveCheckoutNotes = (e) => {
      
        e.preventDefault();
       
        let editorCONDetail = editorValue.toString('html');
        let errorList = [];
        let trimmedtext = editorCONDetail.trim()
        let inputText = editorCONDetail.replaceAll('&nbsp;', '')
        inputText = inputText.replaceAll(' ', '')
        inputText = inputText.replaceAll('<p>', '')
        inputText = inputText.replaceAll('</p>', '')
        if (editorCONDetail.trim() === "" && editorCONDetail !== "" || inputText.length==0)
        {
            showMessage("Error", "Please Add Checkout Notes", "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutNoteLength: true
            }));
            errorList.push(true);
        }
        
     

        if (editorCONDetail && editorCONDetail.length > (MAX_EDITOR_LENGTH * 1.5)) {
            showMessage("Error", `Maximum ${MAX_EDITOR_LENGTH} characters allowed in checkout note`, "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutNoteLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutNoteLength: false
            }));
        }

        if (!conState.checkoutDatetime || conState.checkoutDatetime == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutDatetime: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutDatetime: false
            }));
        }

        const testEmptyHtml = /(<([^>]+)>)/ig

        if (!editorCONDetail || editorCONDetail == "" || editorCONDetail == "<p><br></p>" || !!editorCONDetail.replace(testEmptyHtml, "") == "" || editorCONDetail == "<p></p>") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutNote: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCheckoutNote: false
            }));
        }

        if (errorList.length < 1) {

            setIsSaving(true);
            let method = "encounter/editEncounterForCheckoutNotes";

            conState.checkoutNote = editorCONDetail;

            PostDataAPI(method, conState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);
                    setIsSaving(false);
                    handleClose();
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

    const handleSelectedItem = (sbItem) => {
        if (!sbItem.templateText) { }
        else {
            addingNewTextToEditor(sbItem.templateText);
        }
    }

    const addingNewTextToEditor = (txtToAdd) => {
        txtToAdd = getFormatedTemplateDetails(txtToAdd, patientDetailState);
        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }

        var existingText = editorValue.toString('html');

        existingText = existingText.replaceAll('<p>', '').replaceAll('</p>', '');
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
    const closeDialog = () => {
        handleClose();
        setAnchorEl(null);
    }

    // -----------------------------------------------------------

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
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
                                <TemplateAccordion
                                    handleSelectedSubItem={handleSelectedItem}
                                    sectionCode="checkout_notes"
                                    patientId={props.patientId}
                                    isUpdate={reloadAccordian}
                                    height={'calc(100% - 64px)'}
                                >
                                </TemplateAccordion>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle className={classes.lableTitleInput}>Checkout Notes</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 450 }}>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Label title="Checkout Time" size={3} />
                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={5} md={5} lg={5} xl={5}>

                                                    <InputBaseField
                                                        onChange={handleCONStateChange}
                                                        name="checkoutDatetime"
                                                        value={conState.checkoutDatetime}
                                                        MaxLength="255"
                                                        type="time"
                                                    />

                                                    {errorMessages.errorCheckoutDatetime && (!conState.checkoutDatetime || conState.checkoutDatetime.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter checkout time
                                                    </FormHelperText>) : ('')}

                                                </Grid>
                                            </Grid>

                                            <Grid container alignItems="center" justify="flex-start" direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <FormGroupTitle>Notes</FormGroupTitle>

                                            </Grid>

                                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <RichTextEditor
                                                    className={classes.comlplaintrichTextEdit}
                                                    value={editorValue}
                                                    autoFocus={true}
                                                    onChange={handleEditorChange}
                                                    toolbarConfig={toolbarConfig}
                                                />
                                                {
                                                    // errorMessages.errorCheckoutNoteLength ? (<FormHelperText style={{ color: "red" }} >
                                                    //     Maximum {MAX_EDITOR_LENGTH} characters allowed in checkout note
                                                    // </FormHelperText>) :
                                                    errorMessages.errorCheckoutNote ? (<FormHelperText style={{ color: "red" }} >
                                                        Please add checkout note
                                                    </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={saveAsTemplate} >Save as Template</FormBtn>
                                    <div className={classes.footerRight}>
                                        {isSaving ?
                                            <FormBtn id="loadingSave" > Save</FormBtn>
                                            :
                                            <FormBtn id="save" onClick={SaveCheckoutNotes} > Save</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>
            </Dialog>
            {
                addTempDialog ?
                    <AddTemplateDialog targetID={0} sectionCode={"checkout_notes"} isUpdate={reloadAccordian} templateText={templateText} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
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
    );
}

export default withSnackbar(CheckoutNotes)
