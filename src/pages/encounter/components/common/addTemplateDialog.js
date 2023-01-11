import React, { useState, useEffect } from "react"
import RichTextEditor from 'react-rte';
import {
    Dialog,
    FormHelperText,
    FormLabel,
    Grid,
    DialogContent,
    DialogTitle,
    InputBase,

} from "@material-ui/core";


import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from '../../../../images/icons/add-icon.png';
import CloseIcon from "../../../../images/icons/math-plus.png"
import DeleteIcon from "../../../../images/icons/trash.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { InputBaseField, SelectField, TextareaField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { Scrollbars } from 'rc-scrollbars';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../Services/GetUserInfo';


import useStyles from "./style";


function AddTemplateDialog({ targetID, sectionCode, templateText, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("asdfasdfasdf", 'html'));

    const [ccTemplateId, setCCTemplateId] = useState(targetID);

    const [subItemList, setSubItemList] = useState([{ templateText: "", subItemCode: "", sectionCode: sectionCode }]);
    const [loading, setLoading] = useState(false);

    const [ccItemState, setCCItemState] = useState({
        itemTemplateId: 0, sectionCode: sectionCode, level: 'user', itemCode: "", itemTitle: "", isFavorite: false, subItemDTOList: []

    });

    const [errorMessages, setErrorMessages] = useState({
        errorCCDetail: false, errorHPIDetail: false, errorCCVisitReasonCode: false, errorHistoryPresentedBy: false, errorHPILength: false
    })

    const [errorMessagesCCItem, setErrorMessagesCCItem] = useState({
        errorItemCode: false, errorItemTitle: false, errorTemplateText: false /*, errorSectionCode: false*/
    });

    const [anchorEl, setAnchorEl] = useState(null);


    const handleListAddClick = () => {
        setSubItemList([...subItemList, { templateText: "", sectionCode: sectionCode, subItemCode: "", subItemTitle: "" }]);
    };

    useEffect(() => {
        if (targetID > 0)
            getItemTemplateById(targetID);
        else if (templateText)
            setSubItemList([{ templateText: templateText, sectionCode: sectionCode, subItemCode: "", subItemTitle: templateText }]);
    }, []);

   
    const handleListRemoveClick = index => {
        const list = [...subItemList];
        list.splice(index, 1);
        setSubItemList(list);

        setErrorMessagesCCItem(prevState => ({
            ...prevState,
            errorDuplicateSubItems: false
        }));
    };

    // handle input change
    const handleListInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...subItemList];
        list[index][name] = value;
        if (name == "templateText")
            list[index]["subItemTitle"] = value;

        setSubItemList(list);
    };
    const getItemTemplateById = (itemTId) => {

        PostDataAPI("itemTemplate/getItemTemplateById", parseInt(itemTId)).then((result) => {

            if (result.success && result.data != null) {
                setCCItemState({
                    itemTemplateId: result.data.itemTemplateId,
                    sectionCode: result.data.sectionCode,
                    itemCode: result.data.itemCode,
                    itemTitle: result.data.itemTitle,
                    isFavorite: result.data.isFavorite,
                    subItemDTOList: result.data.subItemDTOList,
                    createdBy: result.data.createdBy,
                    createDate: result.data.createDate
                });

                if (result.data.subItemDTOList != null)
                    setSubItemList(result.data.subItemDTOList);
                else
                    setSubItemList([{ templateText: "", sectionCode: sectionCode, subItemCode: "", subItemTitle: "" }]);

                setLoading(false);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setLoading(false);
            }
        })

    }

    const SaveCCItem = (e) => {

        let errorList = []

        if (!ccItemState.itemCode || ccItemState.itemCode.trim() == "") {

            setErrorMessagesCCItem(prevState => ({
                ...prevState,
                errorItemCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesCCItem(prevState => ({
                ...prevState,
                errorItemCode: false
            }));
        }
        if (!ccItemState.itemTitle || ccItemState.itemTitle.trim() == "") {
            setErrorMessagesCCItem(prevState => ({
                ...prevState,
                errorItemTitle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesCCItem(prevState => ({
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
            if (ccTemplateId > 0) {
                setCCTemplateId(ccItemState.itemTemplateId);
                method = "itemTemplate/updateItemTemplate";
                if (ccItemState.subItemDTOList == null)
                    ccItemState.subItemDTOList = subItemText;
                else
                    ccItemState.subItemDTOList = subItemText;
            }
            else
                ccItemState.subItemDTOList = subItemText;

            //find duplication
            let duplicate = false
            ccItemState.subItemDTOList.map((item, index) => {
                if (ccItemState.subItemDTOList.filter(c => c.templateText.trim() == item.templateText.trim()).length > 1) {
                    duplicate = true;
                }
            });
            if (duplicate) {
                showMessage("Error", "Duplicate sub items exist.", "error", 3000);
                return;
            }


            ccItemState.sectionCode = sectionCode;
            ccItemState.level = 'user';

            // ccItemState.sectionCode = "cheif_complaint";

            PostDataAPI(method, ccItemState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    setErrorMessagesCCItem([]);

                    if (ccTemplateId < 1) {
                        showMessage("Success", "Item template saved successfully.", "success", 3000);
                    }
                    else if (ccTemplateId > 0) {
                        showMessage("Success", " Item template updated successfully.", "success", 3000);
                    }
                    setAnchorEl(anchorEl ? null : false);
                    setCCTemplateId(0);


                    props.hideAddTempDialog();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    // e.preventDefault();
                }
            })

        }
        else {
            e.preventDefault();
        }

    }


    const handleTemplateChange = (e) => {
        const { name, value } = e.target;

        setCCItemState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // const closeTemplate = () => {
    //     props.addTempDialog = false
    // }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <>

            <Dialog open={props.addTempDialog} classes={{
                paper: classes.dialog
            }}
                {...props}
                draggable
            >
                <>
                    <DialogTitle>
                        <span className={classes.popupCrossButton} onClick={props.hideAddTempDialog}><img src={CloseIcon} /></span>
                        <div className={classes.addRosTitle}>
                            {!props.edit ? "Add Template" : "Edit Template"}</div>

                    </DialogTitle>

                    <DialogContent>
                        {loading ?
                            <div className={classes.loaderDiv}> <img className={classes.loader} src={LoadingIcon} alt="Loading..." /></div> : (<>
                                <div className={classes.addRosContent}>
                                    <Grid container >
                                        <Grid item lg={12} container direction="row">
                                            <Grid item xs={3} md={3} sm={3} lg={3}>
                                                <FormLabel className={classes.lableInput}>Template Name<span className={classes.mandatorColor}>*</span>:</FormLabel>
                                            </Grid>
                                            <Grid item xs={7} md={7} sm={7} lg={7} >



                                                <InputBaseField
                                                    fullWidth
                                                    placeholder="Template name"
                                                    onChange={handleTemplateChange}
                                                    name="itemTitle"
                                                    value={ccItemState.itemTitle}
                                                    MaxLength="280"
                                                    type="text"

                                                />
                                                {errorMessagesCCItem.errorItemTitle && (!ccItemState.itemTitle || ccItemState.itemTitle.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please add template name
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                            <Grid item md={2}>
                                                &nbsp;
                                            </Grid>

                                        </Grid>
                                        <Grid item lg={12} container direction="row">
                                            <Grid item xs={3} md={3} sm={3} lg={3}>
                                                <FormLabel className={classes.lableInput}>Short Code<span className={classes.mandatorColor}>*</span>:</FormLabel>
                                            </Grid>
                                            <Grid item xs={7} md={7} sm={7} lg={7} >

                                                <InputBaseField
                                                    fullWidth
                                                    placeholder="Short Code"
                                                    onChange={handleTemplateChange}
                                                    name="itemCode"
                                                    value={ccItemState.itemCode}
                                                    MaxLength="4"
                                                    type="text"

                                                />
                                                {errorMessagesCCItem.errorItemCode && (!ccItemState.itemCode || ccItemState.itemCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please add template code
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                            <Grid item md={2}>
                                                &nbsp;
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    <FormGroupTitle >Items</FormGroupTitle>
                                    <Grid container className={classes.inputContainer}>
                                        <Scrollbars autoHeight autoHeightMax={200} style={{ maxHeight: "100%" }}>
                                            {subItemList.map((x, i) => {

                                                return (
                                                    x.sectionCode == sectionCode ?
                                                        <Grid item lg={12} container direction="row">
                                                            <Grid item xs={10} md={10} sm={10} lg={10}>
                                                                <InputBaseField
                                                                    type="text"
                                                                    placeholder="Enter Short Code"
                                                                    name="subItemCode"
                                                                    value={x.subItemCode}
                                                                    onChange={e => handleListInputChange(e, i)}
                                                                >
                                                                </InputBaseField>

                                                                {/* <RichTextEditor
                                                                    className={classes.comlplaintrichTextEdit}
                                                                    value={editorValue} /> */}


                                                                <TextareaField
                                                                    rowsMin={5}
                                                                    name="templateText"
                                                                    placeholder={"Description no " + (i + 1)}
                                                                    value={x.templateText}
                                                                    onChange={e => handleListInputChange(e, i)}
                                                                />&nbsp;&nbsp;
                                                            </Grid>

                                                            <Grid item xs={2} md={2} sm={2} lg={2} className={classes.actionAlignment}>
                                                                {subItemList.length !== 1 && <span className={classes.deleteIcon} title='Delete Item' onClick={() => handleListRemoveClick(i)}><img src={DeleteIcon} /></span>}
                                                                {subItemList.length - 1 === i && <span className={classes.addNewIcon} title='Add New Item' onClick={handleListAddClick} ><img src={AddIcon} /></span>}
                                                            </Grid>



                                                            {/* <Grid item xs={2} md={2} sm={2} lg={2} justify="center">
                                                       
                                                    </Grid> */}
                                                        </Grid>
                                                        : null
                                                );
                                            })}
                                        </Scrollbars>
                                    </Grid>
                                </div>
                                <div className={classes.addRosFooter}><FormBtn id="save" onClick={SaveCCItem}>Save</FormBtn></div>
                            </>)}
                    </DialogContent>

                </>
            </Dialog>


        </>
    )
}
export default withSnackbar(AddTemplateDialog)