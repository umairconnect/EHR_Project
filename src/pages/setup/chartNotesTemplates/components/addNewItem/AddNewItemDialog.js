
import React, { useState, useEffect, useRef } from "react";
import RichTextEditor, { EditorValue } from 'react-rte';

// styles
import useStyles from "./styles";
import {
    Grid,
    FormHelperText,
    Dialog,
} from '@material-ui/core';
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { DraggableComponent, FormGroupTitle, Label, FormBtn } from "../../../../../components/UiElements";
import { InputBaseField, SelectField } from "../../../../../components/InputField";
import { withSnackbar } from '../../../../../components/Message/Alert'
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';

function AddNewItemDialog({ showHideDialog, handleClose, ...props }) {
    // handle styles
    var classes = useStyles();
    const [isEditable] = useState(props.isEditable)
    const myTextInput = useRef();

    const { showMessage } = props;
    const [existingItems, setExistingItems] = useState([]);
    const [errorMessageStates, setErrorMessageStates] = useState({
        errorShortCode: false, errorEditorValue: false, errorEditorMaxValue: false
    })

    const MAX_EDITOR_LENGTH = 2000;

    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);

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
    const [patientDetailsOption, setPatientDetailsOption] = useState([
        { value: "Patient Name", label: "Patient Name" },
        { value: "Address", label: "Address" },
        { value: "Age", label: "Age" },
        { value: "Date of birth", label: "Date of Birth" },
        { value: "Phone", label: "Phone" },
    ]
    );



    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({});
    const [editorValue, setEditorValue] = useState();

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });


    const handleChange = e => {

        const { name, value } = e.target;


        if (value.trim() === "" && value !== "") {
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handlePatientOption = e => {

        const { name, value } = e.target;

        let editorChartNotesValue = editorValue.toString('html');
        let editorValueTotal = editorChartNotesValue + '<p>[' + value + ']</p>'

        console.info(editorValueTotal)

        setEditorValue(RichTextEditor.createValueFromString(editorValueTotal, 'html'));

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleEditorChange = (editorValue) => {

        // let editorChartNotesValue = editorValue.toString('markdown');

        // let StringWithoutHtml = editorChartNotesValue.replace(/(<p[^<>]*>[\w\s]{5})/, '$1<br>')

        // console.log('Caret at: ', StringWithoutHtml.length)
        //var editor = EditorValue.length;
        //debugger

        const regex = /(<([^>]+)>)/ig;

           let editorChartNotesValue = editorValue.toString('html').replace(regex, '');

            if (editorChartNotesValue && editorChartNotesValue.length > (MAX_EDITOR_LENGTH)) {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorEditorMaxValue: true
                }));
            }
            else {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorEditorMaxValue: false
                }));
            }

            setEDITOR_CHAR_LENGTH(editorChartNotesValue.length);
            
            setEditorValue(editorValue);

        }
        const onClose = (event, reason) => {
            if (reason !== 'backdropClick') {
                handleClose();
            }
        }

        const checkIfsubItemAlreadyExist = () => {
            setIsSaving(true);
            let method = "itemTemplate/checkSubItemAlreadyExist";
            PostDataAPI(method, state, true).then((result) => {

                setIsSaving(false);
                if (result.success == true && result.data != null) {
                    showMessage("Error", "Item Name or Code already exists, please try another", "error", 3000);
                }
                else {
                    let editorChartNotesValue = editorValue.toString('html');
                    console.log(editorChartNotesValue);
                    props.subDataItem.templateText = editorChartNotesValue;
                    props.subDataItem.subItemCode = state.subItemCode;
                    props.subDataItem.subItemTitle = state.subItemTitle;
                    props.onSaveResponse(props.subDataItem);
                    handleClose();

                }
            });

        }

        const onSave = () => {

            let errorList = []

            if (!state.subItemCode || state.subItemCode.trim() == "") {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorShortCode: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorShortCode: false
                }));
            }

            if (!state.subItemTitle || state.subItemTitle.trim() == "") {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorItemTitle: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorItemTitle: false
                }));
            }

            const testEmptyHtml = /(<([^>]+)>)/ig
            let editorChartNotesValue = editorValue.toString('html');
            if (!editorChartNotesValue || editorChartNotesValue == "" || editorChartNotesValue == "<p><br></p>" || !!editorChartNotesValue.replace(testEmptyHtml, "") == "" || editorChartNotesValue == "<p></p>") {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorEditorValue: true
                }));
                errorList.push(true);
            }

            if (editorChartNotesValue.length > 300) {

                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorEditorMaxValue: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessageStates(prevState => ({
                    ...prevState,
                    errorEditorMaxValue: false
                }));
            }
            const itemAlreadyExists = existingItems.some(item => {
                return (item.subItemTitle === state.subItemTitle || item.subItemCode === state.subItemCode) && (item.subItemTemplateId !== state.subItemTemplateId);
            });
            if (itemAlreadyExists) {
                showErrorMessage();
                errorList.push(true);
            }
            if (errorList.length < 1) {
                //checkIfsubItemAlreadyExist();
                if (props.subDataItem.subItemTemplateId < 0) {
                    props.subDataItem.subItemTemplateId = 0;
                }
                console.log(editorChartNotesValue);
                props.subDataItem.templateText = editorChartNotesValue;
                props.subDataItem.subItemCode = state.subItemCode;
                props.subDataItem.subItemTitle = state.subItemTitle;
                props.onSaveResponse(props.subDataItem);
                handleClose();
            }


        }
        function showErrorMessage() {
            let sectionCode = props.subDataItem.sectionCode;
            let errorMessage = '';
            if (sectionCode == "cheif_complaint") {
                errorMessage = "History of Present Illness, Item Name or Code already exists, please try another";
            }
            else if (sectionCode == "ROS") {
                errorMessage = "ROS, Item Name or Code already exists, please try another";
            }
            else if (sectionCode == "checkout_notes") {
                errorMessage = "Checkout notes, Item Name or Code already exists, please try another";
            }
            else if (sectionCode == "plan_of_care") {
                errorMessage = "Plan of Care (POC), Item Name or Code already exists, please try another";
            }
            else if (sectionCode == "chart_notes") {
                errorMessage = "Chart Notes, Item Name or Code already exists, please try another";
            }
            else if (sectionCode == "Physical_Exam") {
                errorMessage = "Physical Exam, Postive or Negative already exists, please try another";
            }
            showMessage("Error", errorMessage, "error", 3000);
        }
        useEffect(() => {

            console.log(props.subDataItem.sectionCode)
            setExistingItems(props.existingItems);
            if (props.subDataItem != null && props.subDataItem.subItemTitle != null) {
                setState(prevState => ({
                    ...prevState,
                    subItemTemplateId: props.subDataItem.subItemTemplateId,
                    subItemCode: props.subDataItem.subItemCode,
                    subItemTitle: props.subDataItem.subItemTitle
                }));
                if (props.subDataItem != null && props.subDataItem.templateText != null) {
                    setEditorValue(RichTextEditor.createValueFromString(props.subDataItem.templateText, 'html'));
                }

            }
        }, []);
        return (
            <>
                <Dialog
                    disableEscapeKeyDown
                    open={showHideDialog}
                    PaperComponent={DraggableComponent}
                    classes={{ paper: classes.dialogPaper }}
                    onClose={onClose}
                    {...props} >
                    <div className={classes.dialogContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>
                                    {props.subDataItem.sectionCode == 'cheif_complaint' ? props.AddEditText + " Chief Complaint" :
                                        props.subDataItem.sectionCode == 'plan_of_care' ? props.AddEditText + " POC" :
                                            props.subDataItem.sectionCode == 'chart_notes' ? props.AddEditText + " Chart Notes" :
                                                props.subDataItem.sectionCode == 'checkout_notes' ? props.AddEditText + " Checkout Notes" :
                                                    props.subDataItem.sectionCode == 'ROS' ? props.AddEditText + " ROS" :
                                                        props.subDataItem.sectionCode == 'ROS' ? props.AddEditText + " ROS" : ''
                                    }

                                </FormGroupTitle>

                                <span className={classes.crossButton} onClick={onClose}><img src={CloseIcon} /></span>
                            </div>
                            <div className={classes.content}>

                                <>
                                    <Grid container direction="row">
                                        <Label title="Item Name" size={2} mandatory={true} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <InputBaseField
                                                id="subItemTitle"
                                                name="subItemTitle"
                                                value={state.subItemTitle}
                                                onChange={handleChange}
                                                placeholder="Item Name"
                                                MaxLength={50}
                                            />
                                            {errorMessageStates.errorItemTitle && (!state.subItemTitle || state.subItemTitle.trim() == "") ?
                                                (<FormHelperText style={{ color: "red" }} > Please enter item name</FormHelperText>)
                                                : ('')
                                            }
                                        </Grid>
                                        <Label title="Short Code" size={2} mandatory={true} />
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

                                            <InputBaseField
                                                id="subItemCode"
                                                name="subItemCode"
                                                placeholder="Short Code"
                                                MaxLength={32}
                                                onChange={handleChange}
                                                value={state.subItemCode}
                                            />
                                            {errorMessageStates.errorShortCode && (!state.subItemCode || state.subItemCode.trim() == "") ?
                                                (<FormHelperText style={{ color: "red" }} > Please enter short code</FormHelperText>)
                                                : ('')
                                            }
                                        </Grid>


                                        <Grid item lg={12} md={12} style={{ position: 'relative' }}>

                                            <SelectField
                                                options={patientDetailsOption}
                                                onChange={(e) => handlePatientOption(e)}
                                                name="patientDetailsOption"
                                                value={state.patientDetailsOption}
                                                className={classes.CustomSelectEditor}
                                                placeholder="Select"

                                            ></SelectField>

                                            <RichTextEditor
                                                className={classes.comlplaintrichTextEdit}
                                                value={editorValue}
                                                onChange={handleEditorChange}
                                                onFocus={handleEditorChange}
                                                toolbarConfig={toolbarConfig}
                                                ref={myTextInput}
                                                maxLength={300}
                                            />

                                            {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH}

                                            {errorMessageStates.errorEditorValue ?
                                                (<FormHelperText style={{ color: "red" }} > Please enter details</FormHelperText>)
                                                : ('')
                                            }
                                            {errorMessageStates.errorEditorMaxValue ?
                                                (<FormHelperText style={{ color: "red" }} >Maximum 300 characters allowed</FormHelperText>)
                                                : ('')
                                            }
                                        </Grid>
                                    </Grid>
                                </>
                            </div>
                            <div className={classes.footer}>
                                <Grid container direction="row">
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        {
                                            <FormBtn id="save" disabled={!isEditable} onClick={onSave} >Add</FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={onClose}> Cancel </FormBtn>
                                    </Grid>
                                </Grid>

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
        )
    }
    export default withSnackbar(AddNewItemDialog)