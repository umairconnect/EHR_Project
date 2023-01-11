import React, { useState, useEffect } from "react"
import {
    Dialog,
    FormHelperText,
    Grid,
    
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"


import { InputBaseField, SelectField, TextareaField } from "../../../../components/InputField/InputField";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { getFormatedTemplateDetails } from '../../../../components/Common/Extensions';

import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import TemplateAccordion from '../common/templateAccordion';
import AddTemplateDialog from '../common/addTemplateDialog';


function ChartNotesDialog({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();

    // handle const data
    const { showMessage } = props;
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
      
    const [dischargeDispositionList, setDischargeDispositionList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [reloadAccordian, setReloadAccordian] = useState(false);
    const [templateText, setTemplateText] = useState("");
    const [addTempDialog, setAddTempDialog] = useState(false);
    const [textSplitter, setTextSpliter] = useState(", ");
    const [patientDetailState, setPatientDetailState] = useState({});
    //
    const [anchorEl, setAnchorEl] = useState(null);
  
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

      //

    const [chartNotesState, setChartNotesState] = useState({
        encounterID: 0, dischargeDispositionCode: "", chartNotes: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorDischargeDispositionCode: false, errorChartNotes: false
    })

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'strikethrough', style: 'STRIKETHROUGH' },
            // { label: 'blockquote', style: 'BLOCKQUOTE' }
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

    //hanlde functions

    useEffect(() => {

        if (showHideDialog) {

            
            getTemplateSettings();
         
            getDropdoonListsData();

            setChartNotesFormState();

            getPatientDetails();

            setErrorMessages({
                errorDischargeDispositionCode: false, errorChartNotes: false
            });

            
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

    const getDropdoonListsData = e => {

        var params = {
            code: "discharge_disposition_code",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setDischargeDispositionList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));

                //setChartNotesState(prevState => ({
                //    ...prevState,
                //    ['dischargeDispositionCode']: result.data[0].text1
                //}));
            }
        });
    }

    const setChartNotesFormState = e => {

        setChartNotesState({
            encounterID: props.encounterId,
            chartNotes: setEditorValue(RichTextEditor.createValueFromString(props.chartNotes, 'html')),
            dischargeDispositionCode: props.dischargeDispositionCode
        });

    }

    const handleEditorChange = (editorValue) => {
        setEditorValue(editorValue);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setChartNotesState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const getPreviousChartNote = (e) => {

        let encData = {
            "patientId": props.patientId
        }

        PostDataAPI("encounter/getPreviousChartNote", encData, true).then((result) => {

            if (result.success && result.data != null)
                setEditorValue(RichTextEditor.createValueFromString(result.data, 'html'));
            else
                setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        })
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


    const SaveChartNotes = (e) => {
        
        e.preventDefault();

        let editorChartNotesValue = editorValue.toString('html');
        let errorList = [];
        let trimmedtext = editorChartNotesValue.trim()
        let inputText = editorChartNotesValue.replaceAll('&nbsp;', '')
        inputText = inputText.replaceAll(' ', '')
        inputText = inputText.replaceAll('<p>', '')
        inputText = inputText.replaceAll('</p>', '')
        if (editorChartNotesValue.trim() === "" && editorChartNotesValue !== "" || inputText.length == 0) {
            showMessage("Error", "Please Add Chart Notes", "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNotes: true
            }));
            errorList.push(true);
        }

        // errorList = []

        const testEmptyHtml = /(<([^>]+)>)/ig

        if (!editorChartNotesValue || editorChartNotesValue == "" || editorChartNotesValue == "<p><br></p>" || !!editorChartNotesValue.replace(testEmptyHtml, "") == "" || editorChartNotesValue == "<p></p>") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNotes: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorChartNotes: false
            }));
        }

        if (!chartNotesState.dischargeDispositionCode || chartNotesState.dischargeDispositionCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDischargeDispositionCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDischargeDispositionCode: false
            }));
        }

        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "encounter/editEncounterForChartNotes";

            chartNotesState.chartNotes = editorChartNotesValue;

            PostDataAPI(method, chartNotesState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);
                    setIsSaving(false);
                    closeDialog();
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

  
    const handleSelectedItem = (sbItem) => {

        // addingNewTextToEditor(sbItem.templateText);


        if (!sbItem.templateText)
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
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

    const closeDialog = (e) => {

        handleClose();
        setAnchorEl(null);

    }

    // -----------------------------------------------------------

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

                                <div className={classes.box}>
                                    <TemplateAccordion
                                        handleSelectedSubItem={handleSelectedItem}
                                        sectionCode="chart_notes"
                                        patientId={props.patientId}
                                        isUpdate={reloadAccordian}
                                        height={'calc(100% - 64px)'}
                                    >
                                    </TemplateAccordion>
                                </div>

                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle className={classes.lableTitleInput}>Chart Notes</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Label title="Discharge Disposition" mandatory={true} size={4} />
                                            <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={6} md={6} lg={6} xl={6}>

                                                <SelectField
                                                    id="dischargeDispositionCode"
                                                    name="dischargeDispositionCode"
                                                    value={chartNotesState.dischargeDispositionCode}
                                                    options={dischargeDispositionList}
                                                    onChange={handleChange}
                                                    placeholder="Please Select Discharge Disposition"
                                                />
                                                {errorMessages.errorDischargeDispositionCode && (!chartNotesState.dischargeDispositionCode || chartNotesState.dischargeDispositionCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select discharge disposition
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
                                                onChange={handleEditorChange}
                                                toolbarConfig={toolbarConfig}
                                            />
                                            {errorMessages.errorChartNotes ? (<FormHelperText style={{ color: "red", position: "relative" }} >
                                                Please add chart notes
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>
                                    
                                </div>
                                <br/>
                                <br/>
                                <div className={classes.footer}>
                                    <FormBtn id="reset" onClick={getPreviousChartNote}>Previous CN</FormBtn>
                                    <FormBtn id="save" onClick={saveAsTemplate}>Save as Template</FormBtn>
                                    <div className={classes.footerRight}>
                                        {isSaving ?
                                            <FormBtn id="loadingSave" > Save</FormBtn>
                                            :
                                            <FormBtn id="save" onClick={SaveChartNotes} > Save</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}>Close</FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ Scrollbars>
            </Dialog>

            {addTempDialog ?
                <AddTemplateDialog targetID={0} sectionCode={"chart_notes"} isUpdate={reloadAccordian} templateText={templateText} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
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

export default withSnackbar(ChartNotesDialog)
