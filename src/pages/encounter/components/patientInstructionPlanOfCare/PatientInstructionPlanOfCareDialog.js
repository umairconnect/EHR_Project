import React, { useState, useEffect, useRef, createRef } from "react"
import {
    Dialog,
    FormHelperText,
    Grid,

} from "@material-ui/core";

import useStyles from "./styles"

import CloseIcon from "../../../../images/icons/math-plus.png"

import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";

import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';

import TemplateAccordion from '../common/templateAccordion';
import AddTemplateDialog from '../common/addTemplateDialog';
import { getFormatedTemplateDetails } from '../../../../components/Common/Extensions';




function PatientInstructionPlanOfCareDialog({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    const scrollbars = useRef(null);

    const richTextRef=createRef();

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const [loading, setLoading] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const [reloadAccordian, setReloadAccordian] = useState(false);
    const [templateText, setTemplateText] = useState("");
    const [addTempDialog, setAddTempDialog] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [textSplitter, setTextSpliter] = useState(", ");
     
    //------------------
    const MAX_EDITOR_LENGTH = 2000;

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
   
    const [planOfCareState, setPlanOfCareState] = useState({
        patientInstruction: "",
        encounterID: 0
    });

    const [patientDetailState, setPatientDetailState] = useState({});
    const [errorMessages, setErrorMessages] = useState({
        errorPatientInstruction: false, errorCareNotesLength: false
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

            setPlanOfCareFormState();
            getPatientDetails();
            setErrorMessages({
                errorPatientInstruction: false
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



    const setPlanOfCareFormState = e => {

        setPlanOfCareState({
            encounterID: props.encounterId,
            patientInstruction: setEditorValue(RichTextEditor.createValueFromString(props.patientInstructionPlaneOfCare, 'html'))
        });

    }

    const handleEditorChange = (editorValue) => {
        setEditorValue(editorValue);
        // let editorPlanOfCareDetail = editorValue.toString('html');
        // let cheLen = editorPlanOfCareDetail.length;
        // console.log(cheLen)
    }


    const getPreviousPlanOfCare = (e) => {

        let encData = {
            "patientId": props.patientId
        }

        PostDataAPI("encounter/getPreviousPlanOfCare", encData, true).then((result) => {

            if (result.success && result.data != null)
                setEditorValue(RichTextEditor.createValueFromString(result.data, 'html'));
            else
                setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        })
    }


    const SavePalnOfCareNotes = (e) => {

        e.preventDefault();

        let editorPlanOfCareDetail = editorValue.toString('html');

        let errorList = []

        if (editorPlanOfCareDetail && editorPlanOfCareDetail.length > (MAX_EDITOR_LENGTH * 1.5)) {
            showMessage("Error", `Maximum ${MAX_EDITOR_LENGTH} characters allowed in care notes`, "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorCareNotesLength: true
            }));
            errorList.push(true);
            richTextRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCareNotesLength: false
            }));
        }

        if (!editorPlanOfCareDetail || editorPlanOfCareDetail == "" || editorPlanOfCareDetail == "<p><br></p>" || editorPlanOfCareDetail == "<p></p>") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientInstruction: true
            }));
           // const scrollHeight = scrollbars.current.getScrollHeight();
            //scrollbars.current.scrollTop(scrollHeight + 10);
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientInstruction: false
            }));
        }

        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "encounter/editEncounterForPlanOfCare";

            planOfCareState.patientInstruction = editorPlanOfCareDetail;

            PostDataAPI(method, planOfCareState, true).then((result) => {
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

    // ------------ handle input change ------------------------



    const closeDialog = (e) => {
        handleClose();
        setAnchorEl(null);
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
    // -----------------------------------------------------------


    return (
        <   >
            <Dialog
                PaperComponent={DraggableComponent}
                disableBackdropClick
                disableEscapeKeyDown
                // TransitionComponent={Transition}
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'md'}
                {...props} >
                <Scrollbars autoHeight autoHeightMax={564} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>

                                <TemplateAccordion
                                    handleSelectedSubItem={handleSelectedItem}
                                    sectionCode="plan_of_care"
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
                                    <FormGroupTitle className={classes.lableTitleInput}>Patient Instruction (Plan of care)</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 435 }}>
                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

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
                                                    ref={richTextRef}
                                                // handleBeforeInput={handleBeforeInput}
                                                // handlePastedText={handlePastedText}
                                                />
                                                {
                                                    // errorMessages.errorCareNotesLength ? (<FormHelperText style={{ color: "red" }} >
                                                    //     Maximum {MAX_EDITOR_LENGTH} characters allowed in care notes
                                                    // </FormHelperText>) :
                                                    errorMessages.errorPatientInstruction ? (<FormHelperText style={{ color: "red" }} >
                                                        Please add plan of care notes
                                                    </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={getPreviousPlanOfCare} btnType="temp">Previous POC</FormBtn>
                                    <FormBtn id="save" onClick={saveAsTemplate} >Save as Template</FormBtn>
                                    <div className={classes.footerRight}>
                                        {isSaving ?
                                            <FormBtn id="loadingSave" > Save</FormBtn>
                                            :
                                            <FormBtn id="save" onClick={SavePalnOfCareNotes} > Save</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>
            </Dialog>

            {addTempDialog ?
                <AddTemplateDialog targetID={0} sectionCode={"plan_of_care"} isUpdate={reloadAccordian} templateText={templateText} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
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

export default withSnackbar(PatientInstructionPlanOfCareDialog)
