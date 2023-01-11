import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    FormHelperText,
    Dialog,
} from '@material-ui/core';
import CloseIcon from "../../../../../images/icons/math-plus.png"
import { DraggableComponent, FormGroupTitle, Label, FormBtn } from "../../../../../components/UiElements/UiElements";
import { InputBaseField } from "../../../../../components/InputField/InputField";
import { withSnackbar } from '../../../../../components/Message/Alert'
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";


function AddNewPhysicalExamDialog({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const [isEditable] = useState(props.isEditable)
    const { showMessage } = props;
    const [errorMessageStates, setErrorMessageStates] = useState({
        errorPostiveCode: false, errorNegativeCode: false
    })
    const [existingItems, setExistingItems] = useState([]);

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


    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({});


    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });



    const handleChange = e => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    }

    const onSave = () => {
   
        let errorList = []
        if (!state.subItemTitle || state.subItemTitle.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorPostiveCode: true
            }));
            errorList.push(true);
        } else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorPostiveCode: false
            }))
        }

        if (!state.negativeSubItemTitle || state.negativeSubItemTitle.trim() == "") {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorNegativeCode: true
            }));
            errorList.push(true);
        } else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorNegativeCode: false
            }))
        }
        let itemAlreadyExists = existingItems.some(item => (item.subItemTitle === state.subItemTitle || item.negativeSubItemTitle === state.negativeSubItemTitle && item.subItemTemplateId != state.subItemTemplateId));
        if (itemAlreadyExists) {
            showErrorMessage();
            errorList.push(true);
        }
        if (errorList.length < 1) {
            if (props.subDataItem.subItemTemplateId < 0) {
                props.subDataItem.subItemTemplateId = 0;
            }
            props.subDataItem.subItemTitle = state.subItemTitle;
            props.subDataItem.negativeSubItemTitle = state.negativeSubItemTitle;
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
        setExistingItems(props.existingItems);
        if (props.subDataItem != null && props.subDataItem.subItemTitle != null) {
            setState(prevState => ({
                ...prevState,
                subItemTemplateId: props.subDataItem.subItemTemplateId,
                subItemTitle: props.subDataItem.subItemTitle,
                negativeSubItemTitle: props.subDataItem.negativeSubItemTitle
            }));
        }
    }, []);

    return (
        <>
            <Dialog
                disableEscapeKeyDown
                open={showHideDialog}
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.physicalExamDailog }}
                onClose={onClose}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>{props.AddEditText} Physical Item</FormGroupTitle>
                            <span className={classes.crossButton} onClick={onClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.contentContainer}>

                            <>
                                <Grid container direction="row">
                                    <Label title="Positive" size={2} mandatory={true} />
                                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                        <InputBaseField
                                            id="subItemTitle"
                                            name="subItemTitle"
                                            value={state.subItemTitle}
                                            onChange={handleChange}
                                            placeholder="Positive"
                                        />

                                        {errorMessageStates.errorPostiveCode && (!state.subItemTitle || state.subItemTitle.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter positive value</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                    <Label title="Negative" size={2} mandatory={true} />
                                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>

                                        <InputBaseField
                                            id="negativeSubItemTitle"
                                            name="negativeSubItemTitle"
                                            placeholder="Negative"
                                            onChange={handleChange}
                                            value={state.negativeSubItemTitle}
                                        />
                                        {errorMessageStates.errorNegativeCode && (!state.negativeSubItemTitle || state.negativeSubItemTitle.trim() == "") ?
                                            (<FormHelperText style={{ color: "red" }} > Please enter negative value</FormHelperText>)
                                            : ('')
                                        }
                                    </Grid>
                                </Grid>


                            </>
                        </div>
                        <div className={classes.footer}>
                            <Grid container direction="row">

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    {
                                        isSaving ?
                                            <FormBtn id="loadingSave"> Add</FormBtn>
                                            :
                                            <FormBtn id="save" disabled={!isEditable} onClick={onSave}>Add</FormBtn>
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
export default withSnackbar(AddNewPhysicalExamDialog)