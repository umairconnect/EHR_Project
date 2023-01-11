import React, { useState, useEffect } from "react"
import {
    Dialog,
    Slide,
    Popper,
    Switch,
    Paper,
    Grid,
    FormLabel,
    InputBase,
    FormHelperText,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@material-ui/core";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from '@material-ui/core/styles';
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png"
import EditIcon from "../../../../images/icons/erase.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { InputBaseField, CheckboxField } from "../../../../components/InputField";
import AddIcon from '../../../../images/icons/add-icon.png';
import DeleteIcon from "../../../../images/icons/trash.png";
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import AddTemplateDialog from '../common/addTemplateDialog';

import AddNewChartNotes from '../common/AddNewChartNotes';
import { getFormatedTemplateDetails } from '../../../../components/Common/Extensions';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        left: "-9px",
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(10px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: "#00B2E3",
                borderColor: "#00B2E3",
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function ReviewOfSystemDialog({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const MAX_EDITOR_LENGTH = 2000;

    let schemacounter = 0;

    const [dataId, setDataId] = useState(props.dataId);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [expandchecked, setExpandchecked] = useState(false);
    const [rosRowsData, setROSRowsData] = useState([]);
    const [rosTemplateId, setRosTemplateId] = useState(0);
    const [textSplitter, setTextSpliter] = useState("");
    const [rosSubTemplateId, setRosSubTemplateId] = useState(0);
    const [isRosTemplateEdited, setIsRosTemplateEdited] = useState(false);
    const [subItemList, setSubItemList] = useState([{ templateText: "" }]);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    let userID = JSON.parse(GetUserInfo()).user.loggedInUserID;

    const [templateText, setTemplateText] = useState("");
    const [addTempDialog, setAddTempDialog] = useState(false);

    // handle status of review of system.
    const [reviewOfSystemState, setReviewOfSystemState] = useState({
        encounterID: 0, reviewOfSystem: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorReviewOfSystem: false, errorReviewOfSystemLength: false
    });

    const [rosItemState, setROSItemState] = useState({
        itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: []
    });

    const [rosSubItemState, setROSSubItemState] = useState({
        itemTemplateId: 0, subItemTemplateId: 0, subItemCode: "", templateText: ""
    });

    const [errorMessagesROSItem, setErrorMessagesROSItem] = useState({
        errorItemTitle: false, errorDuplicateSubItems: false
    })
    const [patientDetailState, setPatientDetailState] = useState({});
    //--------------

    const [rosItemCBState, setRosItemCBState] = useState({});
    const [rosSubItemCBState, setRosSubItemCBState] = useState({ subItemObj: {} });

    const [TextSchemaOrder, setTextSchemaOrder] = useState({ ItemObj: {} });

    const [SubItemCBState, setSubItemCBState] = useState({ subItemObj: {} });
    //--------------

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

    //--------------

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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

            //getROSItemTemplatesList();

            setReviewOfSystemFormState();
            getPatientDetails();


            setErrorMessages(prevState => ({
                ...prevState,
                errorReviewOfSystem: false
            }));

            getTemplateSettings();
        }

    }, [showHideDialog]);


    const handleAddTemplateClose = () => {
        setAddTempDialog(false);
        getROSItemTemplatesList();
    }

    const getROSItemTemplatesList = (notes) => {
        
        let encData = {
            "section": "ROS",
            "userID": userID,
            "patientId": props.patientId
        }
        if (!notes)
            notes = editorValue.toString('html');
        //get original text
        //notes = notes.replaceAll("<b>", "").replaceAll("</b>", "").replaceAll("<strong>", "").replaceAll("</strong>", "").replaceAll("<div>", "").replaceAll("</div>", "").replaceAll("<em>", "");
        //notes = notes.replaceAll("</em>", "").replaceAll("<del>", "").replaceAll("</del>", "").replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("\n", "");

        PostDataAPI("itemTemplate/loadItemTemplateGrid", encData).then((result) => {


            if (result.success && result.data != null) {

                //-------------------------------------------
                let itemObj = {};
                result.data.map((item, i) => {

                    let itmName = item.itemCode;
                    let subitemcheck = 0
                    itemObj[itmName] = getParentNodeSelections(notes, item);//notes.indexOf(item.itemTitle.trim()+":") > 0; //
                    item.subItemDTOList.map((subItem, ii) => {
                        let customtextone = subItem.templateText.split('<p>')[1];
                        let templatetext = customtextone.split('</p>')[0];

                        if (notes.includes(templatetext)) {
                            let findsubitemposition = notes.indexOf(templatetext)
                            //let findsubitemposition = [...notes.matchAll(new RegExp(templatetext, 'gi'))].map(a => a.index)
                            let boldidentifier = "<!--pos-->"
                            let countbackindex = (findsubitemposition - boldidentifier.length) //shift 5 index back letter back
                            let boldkeyword = notes.substring(countbackindex, findsubitemposition)
                            if (boldkeyword != boldidentifier) {

                                subitemcheck++;
                            }


                        }


                    })
                    if (subitemcheck == item.subItemDTOList.length) {
                        itemObj[itmName] = true
                    }
                    else {
                        itemObj[itmName] = false

                    }


                });

                setRosItemCBState({ itemObj });


                let itemObject = {};
                let subItemObj = {};
                let isTitle;

                let count = result.data.length;

                let splittext = notes.split('<strong>');

                splittext.map((subitem, i) => {


                    result.data.map((item, i) => {
                        if (subitem.includes(item.itemTitle)) {
                            if (count > 0) {
                                itemObject[item.itemTitle] = count
                                count--;
                            }
                        }

                    })



                })
                setTextSchemaOrder({ itemObject })



                result.data.map((item, i) => {


                    isTitle = (notes.indexOf(item.itemTitle.trim() + ":") > 0);
                    if (itemObject[item.itemTitle] == undefined)
                        itemObject[item.itemTitle] = 0

                    item.subItemDTOList.map((subItem, ii) => {

                        let customtextone = subItem.templateText.split('<p>')[1];
                        let templatetext = customtextone.split('</p>')[0];
                        let sbName = subItem.subItemCode;
                        let selection = 0
                        if (isTitle) {
                            if (notes.indexOf(templatetext.trim() + '</strong>') >= 0) {
                                selection = 1;

                            }
                            else if (notes.indexOf(templatetext.trim()) >= 0)
                                selection = -1;
                            //Case for sub item
                            //let findsubitemposition = [...notes.matchAll(new RegExp(sumplateText, 'gi'))].map(a => a.index)
                            let findsubitemposition = notes.indexOf(templatetext)
                            let boldidentifier = "<!--pos-->"
                            let countbackindex = findsubitemposition - boldidentifier.length//shift 5 index back letter back
                            let boldkeyword = notes.substring(countbackindex, findsubitemposition)
                            if (boldkeyword == boldidentifier) {
                                selection = 1

                            }
                        }
                        subItemObj[sbName] = selection; //getChildNodeSelections(notes, item, subItem.subItemTitle);
                    });
                });

                setRosSubItemCBState({ subItemObj });

                setTextSchemaOrder({ itemObject })

                //-------------------------------------------

                setROSRowsData(
                    result.data.map((item, i) => {
                        return {
                            itemTemplateId: item.itemTemplateId,
                            sectionCode: result.data.sectionCode,
                            itemCode: item.itemCode,
                            itemTitle: item.itemTitle.trim(),
                            subItemDTOList: item.subItemDTOList,
                            //definedvalue: item.definedvalue,
                            //iscustomsetting: item.iscustomsetting,
                            //AddNewLineCode: item.AddNewLineCode,
                            //CustomSettingString: item.CustomSettingString

                        };
                    }));


            }
        })
    }

    const setReviewOfSystemFormState = e => {

        if (props.encounterId == undefined || props.encounterId == "" || props.encounterId < 0) {

            setReviewOfSystemState(prevState => ({
                ...prevState,
                encounterID: 0, reviewOfSystem: ""
            }
            ));

            setROSItemState(prevState => ({
                ...prevState,
                itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: []
            }
            ));
        }
        else {
            getReviewOfSystem(props.encounterId);
        }
    }

    const checkEditor = (e) => {
        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }
    }

    const getParentNodeSelections = (notes, itemObj) => {
        if (!notes)
            return false;
        if (notes.indexOf(itemObj.itemTitle.trim() + ":") < 0)
            return false
        let selected = true;

        itemObj.subItemDTOList.map((subItem, ii) => {
            if (notes.indexOf(subItem.templateText.trim()) < 0 || notes.indexOf('<strong>' + subItem.templateText.trim() + '</strong>') >= 0)
                selected = false;
        });

        return selected;
    }
    const getChildNodeSelections = (notes, itemObj, childTitle) => {
        if (!notes)
            return false;
        let nodes = notes.split("<bold>");
        let selected = false;

        for (var i = 0; i < nodes.length; i++) {

            let title = nodes[i].split(":")[0];
            if (itemObj.itemTitle.trim() == title.trim()) {
                //find sub items selection.
                let subItems = nodes[i].split(":")[1].split(",");
                selected = false;
                if (subItems.filter(s => s.trim() == childTitle.trim()).length > 0)
                    selected = true;
            }
        }
        return selected;
    }

    const getReviewOfSystem = (id) => {
        PostDataAPI("encounter/getReviewOfSystemById", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {
                setReviewOfSystemState({
                    encounterID: result.data.encounterID
                });
                //setEditorValue(result.data.hpiDetail);
                if (result.data.reviewOfSystem != null)
                    setEditorValue(RichTextEditor.createValueFromString(result.data.reviewOfSystem, 'html'));
                else
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));

            }
            else {
                showMessage('Error', result.message, 'error');
            }
            getROSItemTemplatesList(result.data ? result.data.reviewOfSystem : "");
        })

    }

    const handleEditorChange = (editorValue) => {
        setEditorValue(editorValue);
        //let hpidetail = editorValue.toString('html');
    }

    const getPreviousROS = (e) => {

        let encData = {
            "patientId": props.patientId
        }

        PostDataAPI("encounter/getPreviousROS", encData, true).then((result) => {

            if (result.success && result.data != null)
                setEditorValue(RichTextEditor.createValueFromString(result.data, 'html'));
            else
                setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        })
    }

    const saveReviewOfSystem = (e) => {

        e.preventDefault();

        let editorValueOfROS = editorValue.toString('html');

        let errorList = []

        if (editorValueOfROS && editorValueOfROS.length > (MAX_EDITOR_LENGTH * 1.5)) {
            showMessage("Error", `Maximum ${MAX_EDITOR_LENGTH} characters allowed in review of system detail`, "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorReviewOfSystemLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorReviewOfSystemLength: false
            }));
        }


        //if (!editorValueOfROS || editorValueOfROS == "" || editorValueOfROS == "<p><br></p>" || editorValueOfROS == "<p></p>") {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorReviewOfSystem: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorReviewOfSystem: false
        //    }));
        //}


        if (errorList.length < 1) {
            setLoading(true);
            let method = "encounter/editEncounterForReviewOfSystem";

            reviewOfSystemState.reviewOfSystem = editorValueOfROS;

            PostDataAPI(method, reviewOfSystemState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    showMessage("Success", "Data saved successfully.", "success", 3000);
                    setLoading(false);
                    closeDialog();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setLoading(false);
                    e.preventDefault();
                    //setDialogValues(true);
                }
            })

        }
        else {
            e.preventDefault();
        }

    }

    const getROSItemTemplateByID = (id) => {

        let itmId = (id == undefined || id == 'undefined') ? rosTemplateId : id;

        PostDataAPI("itemTemplate/getItemTemplateById", parseInt(itmId)).then((result) => {
            if (result.success && result.data != null) {

                setROSItemState({
                    itemTemplateId: result.data.itemTemplateId,
                    sectionCode: result.data.sectionCode,
                    itemCode: result.data.itemCode,
                    itemTitle: result.data.itemTitle,
                    isPositive: 0,
                    subItemDTOList: result.data.subItemDTOList
                });

                if (result.data.subItemDTOList != null)
                    setSubItemList(result.data.subItemDTOList);
                else
                    setSubItemList([{ templateText: "" }]);
            }
            else {
                showMessage('Error', result.message, 'error');
            }
        })


    }

    const getROSSubItemTemplateByID = () => {
        PostDataAPI("itemTemplate/getSubItemTemplateByID", parseInt(rosSubTemplateId)).then((result) => {

            if (result.success && result.data != null) {
                setROSSubItemState({
                    itemTemplateId: result.data.itemTemplateId,
                    subItemTemplateId: result.data.subItemTemplateId,
                    subItemCode: result.data.subItemCode,
                    templateText: result.data.templateText
                });


            }
            else {
                showMessage('Error', result.message, 'error');
            }
        })

    }

    const handleROSItemChange = (e) => {
        const { name, value } = e.target;

        setROSItemState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // handle input change
    const handleListInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...subItemList];
        list[index][name] = value;
        setSubItemList(list);
    };

    // handle click event of the Remove button
    const handleListRemoveClick = index => {
        const list = [...subItemList];
        list.splice(index, 1);
        setSubItemList(list);

        setErrorMessagesROSItem(prevState => ({
            ...prevState,
            errorDuplicateSubItems: false
        }));
    };

    // handle click event of the Add button
    const handleListAddClick = () => {
        setSubItemList([...subItemList, { templateText: "" }]);
    };

    const expandAllChange = (e) => {
        //console.log(e.target.checked);
        setExpandchecked(e.target.checked);
    }

    const saveROSItem = e => {

        e.preventDefault();
        let errorList = []


        if (!rosItemState.itemTitle || rosItemState.itemTitle.trim() == "") {
            setErrorMessagesROSItem(prevState => ({
                ...prevState,
                errorItemTitle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesROSItem(prevState => ({
                ...prevState,
                errorItemTitle: false
            }));
        }

        if (errorList.length < 1) {

            let method = "itemTemplate/addItemTemplate";
            if (isRosTemplateEdited)
                method = "itemTemplate/updateItemTemplate";

            var fValue = rosItemState.itemTitle.replace("/", "_");
            rosItemState.itemCode = fValue.replace(" ", "_");
            rosItemState.sectionCode = "ROS";
            rosItemState.subItemDTOList = subItemList;

            let tempsubitemlst = [];
            let isDuplicateName = false;

            rosItemState.subItemDTOList.map((rm, key) => {

                if (key > 0) {
                    let duplicateNameList = tempsubitemlst.filter(tmprm => tmprm.templateText.trim() == rm.templateText.trim());
                    tempsubitemlst.push({ templateText: rm.templateText.trim() });
                    if (duplicateNameList.length > 0) {
                        isDuplicateName = true;
                        return;
                    }
                }
                else
                    tempsubitemlst.push({ templateText: rm.templateText.trim() });
            });

            if (!isDuplicateName) {

                PostDataAPI(method, rosItemState, true).then((result) => {
                    if (result.success == true && result.data != null) {

                        setErrorMessagesROSItem([]);

                        if (isRosTemplateEdited)
                            showMessage("Success", result.data.name + "  updated successfully.", "success", 3000);
                        else
                            showMessage("Success", result.data.name + "  saved successfully.", "success", 3000);

                        getROSItemTemplatesList();
                        btnAddRosTemplate();
                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                        e.preventDefault();
                    }
                });

            }
            else {
                setErrorMessagesROSItem(prevState => ({
                    ...prevState,
                    errorDuplicateSubItems: true
                }));

                e.preventDefault();
            }


        }
        else {
            e.preventDefault();
        }

    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------

    const btnAddRosTemplate = (event) => {

        setEdit(false);
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setRosTemplateId(0);

        setROSItemState(prevState => ({
            ...prevState,
            itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: []
        }
        ));

        setROSSubItemState(prevState => ({
            itemTemplateId: 0, subItemTemplateId: 0, subItemCode: "", templateText: ""
        }
        ));

        setSubItemList([{ templateText: "" }]);

        setAddTempDialog(true);
    };

    const getTemplateSettings = e => {

        setLoading(true);
        let method = "userchartnotetempsetting/loadGrid";
        PostDataAPI(method, true).then((result) => {
            setLoading(false);

            if (result.success == true && result.data != null && result.data.length > 0) {

                let data = result.data[0];
                //
                //let isCustomSetting = rosRowsData[0].iscustomsetting;
                //let predefinedSettingCode = rosRowsData[0].definedvalue;
                //let AddNewLineCode = rosRowsData[0].AddNewLineCode;
                //let customSettingString = rosRowsData[0].customSettingString;


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

                if (data.AddNewLineCode == "oneline")
                    strSplitter += "<br\>";
                else if (data.AddNewLineCode == "twoline")
                    strSplitter += "<br\><br\>";

                setTextSpliter(strSplitter);

            }
        });
    }

    const btnEditRosTemplate = (item) => {


        const id = item;
        setRosTemplateId(id);
        getROSItemTemplateByID(id);
        setIsRosTemplateEdited(true);

        setAddTempDialog(true);

        console.warn(id)

    };
    const InitializeSchemCounter = () => {

        let schemacounter = 0;
        let itemObj = {};
        //getTemplateSettings();
        //textSplitter=ROSItemState.textSplitter

        if (schemacounter == 0) {
            rosRowsData.map((item) => {
                //setTextSchemaOrder(prevState => ({
                //    ...prevState,
                //    itemObj: {
                //        ...prevState.itemObj,
                //        [item.itemTitle]: schemacounter
                //    }
                //}));
                itemObj[item.itemTitle] = schemacounter;
            });
            setTextSchemaOrder({ itemObj })
        }
    }

    const deleteTemplateItem = (item) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the ROS Template?", "confirm", function () {

            PostDataAPI('itemTemplate/deleteItemTemplate', item, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setRosTemplateId(0);
                    setIsRosTemplateEdited(false);
                    getROSItemTemplatesList();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });

    }

    const handleSelectedItem = (e) => {
        setRosTemplateId(e);
    }
    // For all group and sub items
    const handleAllCBChange = (event) => {

        const { name, value } = event.target;
        const checkBoxValue = event.target.checked;
        let itemObject = {};

        rosRowsData.map((item, i) => {

            setRosItemCBState(prevState => ({
                ...prevState,
                itemObj: {
                    ...prevState.itemObj,
                    [item.itemCode]: checkBoxValue
                }
            }));

            if (itemObject[item.itemTitle] == undefined)
                itemObject[item.itemTitle] = i + 1

            item.subItemDTOList.map((sbItm) => {

                setRosSubItemCBState(prevState => ({
                    ...prevState,
                    subItemObj: {
                        ...prevState.subItemObj,
                        [sbItm.subItemCode]: checkBoxValue ? -1 : 0
                    }
                }));

            });

        });
        setTextSchemaOrder({ itemObject })

        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }

        let existingText = "";
        if (checkBoxValue) {
            //Add all text
            rosRowsData.map((itemObj, i) => {
                let customText = "<p><div>";

                customText = '<p><strong>' + itemObj.itemTitle.trim() + ':' + '</strong></p><p>Patient denies ';
                itemObj.subItemDTOList.map((subItm, ind) => {
                    let customtextone = subItm.templateText.split('<p>')[1];
                    let templatetext = customtextone.split('</p>')[0];
                    customText += (customText.endsWith(textSplitter) || ind == 0) ? templatetext.trim() : ', ' + templatetext.trim();
                });

                customText += "</p></div></p>"
                existingText += customText;
            });
        }

        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));
    };

    //All (-ve) sub items on a group
    const handleItemCBChange = (event) => {

        const { name, value } = event.target;

        const checkBoxValue = event.target.checked;

        let itemObj = rosRowsData.filter(c => c.itemCode == name)[0];

        setRosItemCBState(prevState => ({
            ...prevState,
            itemObj: {
                ...prevState.itemObj,
                [itemObj.itemCode]: checkBoxValue
            }
        }));

        itemObj.subItemDTOList.map((sbItm) => {

            setRosSubItemCBState(prevState => ({
                ...prevState,
                subItemObj: {
                    ...prevState.subItemObj,
                    [sbItm.subItemCode]: checkBoxValue ? -1 : 0
                }
            }));

        });
        //
        //itemObj.subItemDTOList.map((sbItm) => {

        //    setSubItemCBState(prevState => ({
        //        ...prevState,
        //        subItemObj: {
        //            ...prevState.subItemObj,
        //            [sbItm.subitemTemplateId]: checkBoxValue ? -1 : 0
        //        }
        //    }));

        //});

        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }

        let existingText = editorValue.toString('html');
        existingText = existingText.replace('<br>', '');
        let customText = "<p><div>";

        if (existingText.indexOf(itemObj.itemTitle + ':') >= 0) {
            let newCustomText0 = existingText.split(itemObj.itemTitle + ':');
            let newCustomText1 = newCustomText0[1].split('</div>');
            var newCustomText2 = newCustomText1[0].split('<p>')
            var newCustomText3 = newCustomText2[0].split('</strong></p>');


            if (checkBoxValue) {
                let newText = '</strong><p/>Patient denies ';
                itemObj.subItemDTOList.map((subItm, ind) => {
                    let customtextone = subItm.templateText.split('<p>')[1];
                    let templatetext = customtextone.split('</p>')[0];
                    newText += (newText.endsWith(textSplitter) || ind == 0) ? templatetext : textSplitter + templatetext;
                });
                existingText = existingText.replace(newCustomText3[0], newText);
            }
            else {
                if (newCustomText2[1] != null) {
                    let findCharacter = [...newCustomText2[1].matchAll(new RegExp("</p>", 'gi'))].map(a => a.index)
                    if (findCharacter != null) {
                        // let newtext = newCustomText2[1].split('</strong></p>')[0];

                        //existingText = existingText.replace(newtext, '');
                        existingText = existingText.replace(newCustomText2[0], '');
                        existingText = existingText.replace(newCustomText2[1], '');
                        let endToken = "</strong>"
                        let addFlag = false
                        let joindata = [...existingText.matchAll(new RegExp(':', 'gi'))].map(a => a.index);
                        joindata.map((index, i) => {

                            if (i == 0) {
                                let endtag = "</strong>"
                                let endindexNum = index + 1 + endToken.length;

                                let boldendkeyword = existingText.substring(index + 1, endindexNum)
                                if (boldendkeyword != endtag) {

                                    existingText = existingText.substring(0, index + 1) + endToken + existingText.substring(index + 1, existingText.length);
                                    addFlag = true;

                                }
                            }
                            else {
                                if (addFlag) { index = index + (endToken.length); }
                                let endtag = "</strong>"
                                let endindexNum = index + 1 + endToken.length;

                                let boldendkeyword = existingText.substring(index + 1, endindexNum)
                                if (boldendkeyword != endtag) {

                                    existingText = existingText.substring(0, index + 1) + endToken + existingText.substring(index + 1, existingText.length);
                                    addFlag = true;
                                }
                            }

                        });

                        let titlestring = '<p><strong>' + itemObj.itemTitle.trim() + ':' + '</strong></p><p></div></p>'
                        let findtitle = [...existingText.matchAll(new RegExp(titlestring, 'gi'))].map(a => a.index);
                        if (findtitle.length != 0) {
                            existingText = existingText.replace(titlestring, '');
                        }
                        else {
                            titlestring = '<p><strong>' + itemObj.itemTitle.trim() + ':' + '</strong><p></div></p>'
                            let findtitle = [...existingText.matchAll(new RegExp(titlestring, 'gi'))].map(a => a.index);
                            if (findtitle.length != 0) {
                                existingText = existingText.replace(titlestring, '');
                            }
                            else {
                                titlestring = '<p><strong>' + itemObj.itemTitle.trim() + ':' + '</strong>'
                                let findtitle = [...existingText.matchAll(new RegExp(titlestring, 'gi'))].map(a => a.index);
                                if (findtitle.length != 0) {
                                    existingText = existingText.replace(titlestring, '');
                                }


                            }


                        }

                    }
                }
                else {
                    existingText = existingText.replace(newCustomText2[0], '');
                    existingText = existingText.replace('<p><strong>' + itemObj.itemTitle.trim() + ':', '');
                }
            }

        }
        else {

            if (!checkBoxValue)
                return;
            customText += "<p><strong>" + itemObj.itemTitle + ":" + "</strong><p/>Patient denies ";
            itemObj.subItemDTOList.map((subItm, ind) => {
                let customtextone = subItm.templateText.split('<p>')[1];
                let templatetext = customtextone.split('</p>')[0];

                customText += (customText.endsWith(",") || ind == 0) ? templatetext : textSplitter + templatetext;
            });

            customText += "</div></p>"
            existingText += customText;
        }

        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));

    };




    const handleSubItemCheckbox = (item, subItem, isPositive) => {

        //setEditorValue(RichTextEditor.createValueFromString("", 'html'));



        //pos = 1, neg = -1, none = 0

        setRosSubItemCBState(prevState => ({
            ...prevState,
            subItemObj: {
                ...prevState.subItemObj,
                [subItem.subItemCode]: isPositive ? rosSubItemCBState.subItemObj[subItem.subItemCode] != 1 ? 1 : 0 : rosSubItemCBState.subItemObj[subItem.subItemCode] != -1 ? -1 : 0
                // [subItem.subItemCode]: 0

            }
        }));






        console.info(rosSubItemCBState.subItemObj[subItem.subItemCode]);
        let itemObj = rosRowsData.filter(c => c.itemTemplateId == subItem.itemTemplateId)[0];
        if (isPositive == true) {
            setRosItemCBState(prevState => ({
                ...prevState,
                itemObj: {
                    ...prevState.itemObj,
                    [itemObj.itemCode]: false
                }
            }));
        }
        //
        //let itemObject = {};
        //rosRowsData.map((item, i) => {
        //    

        //    if (schemacounter == 0) {
        //        itemObject[item.itemTitle] = schemacounter
        //    }

        //})
        //setTextSchemaOrder({ itemObject })

        //getTemplateSettings();

        //rosRowsData.map((item) => {
        //    
        // TextSchemaOrder.itemObj[item.itemTitle] = 0;

        //});
        //let itemObject = {};
        //if (schemacounter == 0) {
        //    rosRowsData.map((item) => {

        //        itemObject[item.itemTitle] = schemacounter;
        //    });
        //}
        //    setTextSchemaOrder({ itemObject })
        //     setTextSchemaOrder(prevState => ({
        //         ...prevState,itemobj: {
        //               ...prevState.itemobj,
        //              itemObject
        //           }
        //       }));
        //}

        addingFixedTextToEditor(subItem, isPositive)


        // adding text to editor
        // addingTextToEditor(subItem.subItemTitle.trim(), itemObj.itemCode, itemObj.itemTitle, isPositive);

    };


    const addingFixedTextToEditor = (sbitem, isPositive) => {




        //let itemObject = {};
        //rosRowsData.map((item, i) => {
        //    

        //    if (schemacounter == 0) {
        //        itemObject[item.itemTitle] = schemacounter
        //    }

        //})

        let datatext = "";

        if (isPositive == true) {
            if ((rosSubItemCBState.subItemObj[sbitem.subItemCode]) != 1) { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 1 }
            else { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 0 }
        }
        else {

            if ((rosSubItemCBState.subItemObj[sbitem.subItemCode]) != -1) { rosSubItemCBState.subItemObj[sbitem.subItemCode] = -1 }

            else { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 0 }
        }
        

        rosRowsData.map((item) => {

            console.info(SubItemCBState)
            let selection = 0;

            item.subItemDTOList.map((subitem, i) => {
                
                const itemdata = subitem.subItemCode;
                selection = rosSubItemCBState.subItemObj[subitem.subItemCode];
                let customtextone = subitem.templateText.split('<p>')[1];
                let templatetext = customtextone.split('</p>')[0];
                if (selection == 1) {
                    
                    if (datatext.includes(item.itemTitle)) {
                        
                        let itemheader = "" + item.itemTitle + ":" + "</strong><p/>";
                        if (datatext.includes(itemheader)) {
                            let datatextnew = datatext.split(itemheader)[1];
                            let searchToken = "Patient complains";
                            let findposition = [...datatextnew.matchAll(new RegExp(searchToken, 'gi'))].map(a => a.index);
                            if (datatextnew.includes("Patient complains")) {
                                
                                let value = " <!--pos-->" + templatetext + textSplitter;// <!--pos--> space for positve button
                                let updatedDatatext = "";

                                findposition.map((itemposition) => {
                                    

                                    if (datatextnew[itemposition + searchToken.length] == " ") {
                                        datatextnew = datatextnew.slice(0, (itemposition + searchToken.length)) + datatextnew.slice(itemposition + searchToken.length + 1)
                                    }
                                    updatedDatatext = datatextnew.substring(0, (itemposition + searchToken.length)) + value + datatextnew.substring((itemposition + searchToken.length), datatextnew.length);

                                })
                                let splitPosition = [...datatext.matchAll(new RegExp((datatext.split(itemheader)[1]), 'gi'))].map(a => a.index);

                                datatext = datatext.substring(0, (splitPosition)) + updatedDatatext;



                            }
                            else {

                                
                                let Token = "" + item.itemTitle + ":</strong><p/>";
                                let findTitlePosition = [...datatext.matchAll(new RegExp(Token, 'gi'))].map(a => a.index);
                                let newindex = findTitlePosition[0]
                                newindex += Token.length
                                let subString = "<strong>Patient complains" + "<!--pos--> " + templatetext + "</strong>" + textSplitter;
                                datatext = datatext.substring(0, newindex) + subString + datatext.substring((newindex), datatext.length);

                                // datatext = datatext + textSplitter + "<strong>Patient complains" + "<!--pos--> " + templatetext + "</strong>"
                            }


                        }

                    }
                    else {


                        if (datatext != "") {

                            datatext = datatext + "<p><strong>" + item.itemTitle + ":" + "</strong><p/>" + "<strong>Patient complains" + " <!--pos-->" + templatetext + "</strong>";

                        }
                        else {

                            datatext = datatext + "<p><strong>" + item.itemTitle + ":" + "</strong><p/>" + "<strong>Patient complains" + " <!--pos-->" + templatetext + "</strong>";

                        }

                    }

                }
                else if (selection == -1) {

                    if (datatext.includes(item.itemTitle)) {

                        let itemheader = "" + item.itemTitle + ":" + "</strong><p/>";
                        if (datatext.includes(itemheader)) {
                            let datatextnew = datatext.split(itemheader)[1];
                            let searchToken = "Patient denies";
                            let findposition = [...datatextnew.matchAll(new RegExp(searchToken, 'gi'))].map(a => a.index);

                            if (datatextnew.includes(searchToken)) {
                                let value = " " + templatetext + textSplitter; // simple space for negative button
                                let updatedDatatext = "";


                                findposition.map((itemposition) => {


                                    if (datatextnew[itemposition + searchToken.length] == " ") {
                                        datatextnew = datatextnew.slice(0, (itemposition + searchToken.length)) + datatextnew.slice(itemposition + searchToken.length + 1)
                                    }
                                    updatedDatatext = datatextnew.substring(0, (itemposition + searchToken.length)) + value + datatextnew.substring((itemposition + searchToken.length), datatextnew.length);

                                })
                                let splitPosition = [...datatext.matchAll(new RegExp((datatext.split(itemheader)[1]), 'gi'))].map(a => a.index);

                                datatext = datatext.substring(0, (splitPosition)) + updatedDatatext;



                            }
                            else {
                                datatext = datatext + textSplitter + "Patient denies " + templatetext
                            }


                        }
                    }
                    else {

                        if (datatext != "") {
                            datatext = datatext + "<p><strong>" + item.itemTitle + ":" + "</strong><p/>" + "Patient denies " + templatetext;

                        }
                        else {
                            datatext = datatext + "<p><strong>" + item.itemTitle + ":" + "</strong><p/>" + "Patient denies " + templatetext;

                        }
                    }
                }

            })

        })


        if (isPositive == true) {
            if ((rosSubItemCBState.subItemObj[sbitem.subItemCode]) != 1) { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 1 }
            else { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 0 }
        }
        else {

            if ((rosSubItemCBState.subItemObj[sbitem.subItemCode]) != -1) { rosSubItemCBState.subItemObj[sbitem.subItemCode] = -1 }

            else { rosSubItemCBState.subItemObj[sbitem.subItemCode] = 0 }
        }
        let schemastate = [{}]
        let count = rosRowsData.length
        rosRowsData.map((item) => {
            

            if (datatext.includes([item.itemTitle])) {

                let counter = TextSchemaOrder.itemObject[item.itemTitle];
                if (counter == 0 && schemacounter == 0) {
                    counter++
                    //schemacounter = counter
                    TextSchemaOrder.itemObject[item.itemTitle] = counter;
                }
                else {
                    schemacounter = counter
                    schemacounter++
                    TextSchemaOrder.itemObject[item.itemTitle] = schemacounter;
                }

                schemastate = TextSchemaOrder
            } else {
                TextSchemaOrder.itemObject[item.itemTitle] = 0;
            }

        });

        let dataTextUnarranged = datatext;
        let arrangedtext = ""


        let maxPriority = 0
        let itemtitle = ""
        rosRowsData.map((item, i) => {
            

            let itemvalue = TextSchemaOrder.itemObject[item.itemTitle]
            if (maxPriority == 0) {
                if (itemvalue != 0) {
                    maxPriority = itemvalue
                    itemtitle = item.itemTitle
                }

            }
            else {
                let itemPriority = itemvalue;
                if (maxPriority < itemPriority) {
                    maxPriority = itemPriority;

                    itemtitle = item.itemTitle
                }
            }


        });
        if (dataTextUnarranged != "") {
            let splitText = dataTextUnarranged.split('<strong>');
            
            if (maxPriority == 1) {
                //nochange in datatext
            }
            else {
                splitText.map((item, count, value) => {
                    
                    if (item.includes(itemtitle)) {
                        if (!(arrangedtext.includes(splitText[count]))) {
                            arrangedtext = "<p><strong>" + splitText[count]
                        }

                        if (splitText[count + 1] != undefined) {
                            let text = (splitText[count + 1].includes('</strong>'));
                            if (splitText[count + 1].includes('</strong>')) {

                                if (!(arrangedtext.includes(splitText[count + 1]))) {
                                    arrangedtext = arrangedtext + "<strong>" + splitText[count + 1];
                                }
                            }
                            else {
                                if (!(arrangedtext.includes(splitText[count + 1]))) {
                                    arrangedtext = arrangedtext + splitText[count + 1];
                                }
                            }
                            for (let i = maxPriority - 1; i > 0; i--) {

                                rosRowsData.map((itm, index) => {
                                    
                                    if (TextSchemaOrder.itemObject[itm.itemTitle] == i) {
                                        itemtitle = itm.itemTitle

                                        splitText.map((subitem, subcount) => {
                                            
                                            if (subitem.includes(itemtitle)) {
                                                if (!(arrangedtext.includes(splitText[subcount]))) {

                                                    arrangedtext = arrangedtext + "<p><strong>" + splitText[subcount];
                                                }

                                                if (!(arrangedtext.endsWith('<p>'))) {
                                                    if (splitText[subcount + 1] != undefined) {
                                                        if ((splitText[subcount + 1].includes('</strong>'))) {
                                                            if (!(arrangedtext.includes(splitText[subcount + 1]))) {
                                                                arrangedtext = arrangedtext + "<strong>" + splitText[subcount + 1];
                                                            }


                                                        }
                                                        else {
                                                            if (!(arrangedtext.includes(splitText[subcount + 1]))) {
                                                                arrangedtext = arrangedtext + splitText[subcount + 1];
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (!(arrangedtext.includes(splitText[subcount]))) {
                                                            arrangedtext = arrangedtext + splitText[subcount];
                                                        }
                                                    }
                                                }
                                                else {
                                                    arrangedtext = arrangedtext.substring(0, (arrangedtext.length - 3));

                                                }
                                            }

                                        });
                                    }
                                });


                            }
                        }
                        else {

                            for (let i = maxPriority - 1; i > 0; i--) {

                                rosRowsData.map((itm, index) => {
                                    
                                    if (TextSchemaOrder.itemObject[itm.itemTitle] == i) {
                                        itemtitle = itm.itemTitle

                                        splitText.map((subitem, subcount) => {
                                            
                                            if (subitem.includes(itemtitle)) {
                                                if (!(arrangedtext.includes(splitText[subcount]))) {

                                                    arrangedtext = arrangedtext + "<p><strong>" + splitText[subcount];
                                                }

                                                if (!(arrangedtext.endsWith('<p>'))) {
                                                    if (splitText[subcount + 1] != undefined) {
                                                        if ((splitText[subcount + 1].includes('</strong>'))) {
                                                            if (!(arrangedtext.includes(splitText[subcount + 1]))) {
                                                                arrangedtext = arrangedtext + "<strong>" + splitText[subcount + 1];
                                                            }


                                                        }
                                                        else {
                                                            if (!(arrangedtext.includes(splitText[subcount + 1]))) {
                                                                arrangedtext = arrangedtext + splitText[subcount + 1];
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (!(arrangedtext.includes(splitText[subcount]))) {
                                                            arrangedtext = arrangedtext + splitText[subcount];
                                                        }
                                                    }
                                                }
                                                else {
                                                    arrangedtext = arrangedtext.substring(0, (arrangedtext.length - 3));

                                                }
                                            }

                                        });
                                    }
                                });


                            }


                        }
                    }

                });

                datatext = arrangedtext
            }

        }



        setEditorValue(RichTextEditor.createValueFromString(datatext, 'html'))

    }




    const addingTextToEditor = (newTextToAdd, parentItemCode, parentItemName, pos) => {

        //let itemObj = rosRowsData.filter(c => c.itemCode == parentItemCode)[0];

        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }


        let existingText = editorValue.toString('html');
        existingText = existingText.replace('<br>', '');
        let customText = "<p><div>";

        if (existingText.indexOf(parentItemName.trim() + ':') >= 0) {
            let newCustomText0 = existingText.split(parentItemName + ':');
            let newCustomText1 = newCustomText0[1].split('</div>');
            var newCustomText2 = newCustomText1[0].split('<p>')
            var newCustomText3 = newCustomText2[1].split('</p>');
            //;
            if (newCustomText3[0]) {
                if (pos) {
                    let posText = '<strong>' + newTextToAdd + '</strong>';
                    let newCustomText = newCustomText3[0];
                    if (newCustomText3[0].indexOf(posText) >= 0) {// already exist
                        posText = existingText.indexOf(posText + ",") >= 0 ? posText + ',' : posText;

                        //clear patient denies or complain text
                        let itemText = newCustomText3[0].split('Patient complains')[1].replaceAll('<strong>', '').replaceAll('</strong>', '');//replace("Patient denies", "").replace(",", "").replace("Patient complains", "").replace("<strong>", "").replace("</strong>", "");
                        let textTobeRemoved = '<strong>Patient complains</strong> ';
                        if (!itemText.split('Patient denies')[0].replace(newTextToAdd, '').replaceAll(',', '').trim()) {
                            //existingText = (newCustomText3[0].indexOf(textTobeRemoved + ',') >= 0) ? existingText.replace(textTobeRemoved + ',', "") : existingText.replace(textTobeRemoved, "");
                            if (!newCustomText3[0].replace(posText, '').replace(textTobeRemoved, '').replaceAll(',', '').replaceAll("<strong>", "").replaceAll("</strong>", "").trim())
                                existingText = existingText.replace(newCustomText3[0], "").replace('<p><strong>' + parentItemName + ':' + '</strong></p>', '');
                            else {
                                existingText = existingText.replace(newCustomText3[0], newCustomText3[0].replace(posText, "").replace(textTobeRemoved, ""));
                            }
                        }
                        else
                            existingText = existingText.replace(posText, "");
                    }
                    else {
                        if (newCustomText3[0].indexOf(newTextToAdd) >= 0) {
                            newCustomText = newCustomText3[0].indexOf(newTextToAdd + textSplitter) >= 0 ? newCustomText3[0].replace(newTextToAdd + textSplitter, '') : newCustomText3[0].replace(newTextToAdd, '');
                        }

                        if (newCustomText3[0].indexOf("Patient complains") < 0) {
                            newCustomText += newCustomText.trim().endsWith(textSplitter) ? " <strong>Patient complains</strong> <strong>" + newTextToAdd : + textSplitter + "<strong>Patient complains</strong> <strong>" + newTextToAdd;
                            newCustomText += "</strong>";
                        }
                        else if (newCustomText3[0].indexOf("Patient denies") > newCustomText3[0].indexOf("Patient complains")) {
                            let arr = newCustomText3[0].split("Patient denies");
                            newCustomText = arr[0] + '<strong>' + newTextToAdd + '</strong>, Patient denies ' + arr[1];
                        }
                        else {
                            newCustomText = newCustomText.trim().endsWith(textSplitter) ? newCustomText + '<strong>' + newTextToAdd + '</strong>' : newCustomText + textSplitter + '<strong>' + newTextToAdd + '</strong>';
                        }

                        //remove patient denies
                        newCustomText = removePreTags(newCustomText);

                        existingText = existingText.replace(newCustomText3[0], newCustomText);
                    }

                }
                else {
                    let posText = '<strong>' + newTextToAdd + '</strong>';
                    let newCustomText = newCustomText3[0];
                    if (newCustomText.indexOf(posText) >= 0) {// already exist
                        newCustomText = newCustomText3[0].replace('<strong>' + newTextToAdd + '</strong>', "");
                    }

                    if (newCustomText.indexOf(newTextToAdd) >= 0) {
                        newTextToAdd = existingText.indexOf(newTextToAdd + textSplitter) >= 0 ? newTextToAdd + textSplitter : newTextToAdd;

                        //clear patient denies or complain text
                        let itemText = newCustomText3[0].split('Patient denies')[1].replaceAll('<strong>', '').replaceAll('</strong>', '');//replace("Patient denies", "").replace(textSplitter, "").replace("Patient complains", "").replace("<strong>", "").replace("</strong>", "");
                        let textTobeRemoved = 'Patient denies ';
                        if (!itemText.split('Patient complains')[0].replace(newTextToAdd, '').replaceAll(textSplitter, '').trim()) {
                            //existingText = (newCustomText3[0].indexOf(textTobeRemoved + textSplitter) >= 0) ? existingText.replace(textTobeRemoved + textSplitter, "") : existingText.replace(textTobeRemoved, "");
                            if (!newCustomText3[0].replace(posText, '').replaceAll(textTobeRemoved, '').replaceAll(textSplitter, '').replaceAll('<strong>', '').replaceAll('</strong>', '').trim())
                                existingText = existingText.replace(newCustomText3[0], "").replace('<p><strong>' + parentItemName + ':' + '</strong></p>', '');
                            else {
                                existingText = existingText.replace(newCustomText3[0], newCustomText3[0].replace(newTextToAdd, "").replace(textTobeRemoved, ""));
                            }
                        }
                        else
                            existingText = existingText.replace(newTextToAdd, "");
                    }
                    else {
                        if (newCustomText.indexOf("Patient denies") < 0) {
                            newTextToAdd = "Patient denies " + newTextToAdd;
                        }
                        else if (newCustomText.indexOf("Patient complains") > newCustomText.indexOf("Patient denies")) {
                            let arr = newCustomText.split("Patient complains");
                            newCustomText = arr[0].replace('<strong>', '') + newTextToAdd + ', <strong>Patient complains' + arr[1];
                            newTextToAdd = '';
                        }

                        if (newTextToAdd != '')
                            newCustomText = newCustomText.trim().endsWith(",") ? newCustomText + newTextToAdd : newCustomText + textSplitter + newTextToAdd

                        //remove patient denies
                        newCustomText = removePreTags(newCustomText);
                        //set text
                        existingText = existingText.replace(newCustomText3[0], newCustomText);

                    }

                }
            }
            else {
                existingText = existingText.replace('<p><strong>' + parentItemName + ':' + '</strong></p>', '');
                customText += '<p><strong>' + parentItemName + ':' + '</strong></p><p>';

                if (pos) {
                    customText += "<strong>Patient complains</strong> <strong>" + newTextToAdd + '</strong>';
                }
                else {
                    customText += "Patient denies " + newTextToAdd;
                }
                customText += "</p></div></p>"
                existingText += customText;
            }
        }
        else {
            customText += '<p><strong>' + parentItemName + ':' + '</strong></p><p>';

            if (pos) {
                customText += "<strong>Patient complains</strong> <strong>" + newTextToAdd + '</strong>';
            }
            else {
                customText += "Patient denies " + newTextToAdd;
            }
            customText += "</p></div></p>"
            existingText += customText;
        }

        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));

    }


    const getPatientDetails = e => {
        PostDataAPI("patient/getPatient", parseInt(props.patientId)).then((result) => {
            if (result.success && result.data != null) {
                setPatientDetailState(result.data);
            }
        })
    }

    const removePreTags = (newCustomText, neg) => {

        var exTextArr = newCustomText.split("Patient denies");
        if (exTextArr.length > 1) {
            var deniesText = exTextArr[1].replaceAll(" ", "").replaceAll(textSplitter, "").replaceAll("<strong>", "").replaceAll("</strong>", "");
            if (deniesText == "" || deniesText.startsWith("Patientcomplains")) {
                newCustomText = newCustomText.indexOf("Patient denies ,") >= 0 ? newCustomText.replace("Patient denies ,", "") : newCustomText.replace("Patient denies", "");
            }
        }
        exTextArr = newCustomText.split("Patient complains");
        if (exTextArr.length > 1) {
            var deniesText = exTextArr[1].replaceAll(" ", "").replaceAll(textSplitter, "").replaceAll("<strong>", "").replaceAll("</strong>", "");
            if (deniesText == "" || deniesText.startsWith("Patientdenies")) {
                newCustomText = newCustomText.indexOf("<strong>Patient complains</strong>" + textSplitter) >= 0 ? newCustomText.replace("<strong>Patient complains</strong>" + textSplitter, "") : newCustomText.replace("<strong>Patient denies</strong>", "");
            }
        }

        return newCustomText;
    }


    const closeDialog = () => {
        setROSRowsData([]);
        setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        handleClose();
        setEdit(false);
        setAnchorEl(null);
    }

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
                <Scrollbars autoHeight autoHeightMax={564} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>Quick Pick</div>
                                </div>

                                <div className={`${classes.content} ${classes.whiteBg}`}>
                                    <Scrollbars style={{ height: 450 }}>
                                        <div className={classes.quickPickHeader}>
                                            <div>
                                                {/* <CheckboxField
                                            color="primary"
                                            name="ExpandAll"
                                            checked={expandchecked}
                                            onChange={expandAllChange}
                                            label="Expand All" /> */}
                                                <div className={classes.antSwitchBox}>
                                                    <Grid component="label" container alignItems="center" justify="flex-end" direction="row" spacing={1}>
                                                        <Grid item>
                                                            {/*<AntSwitch name="checkedC" />*/}
                                                            <AntSwitch onChange={handleAllCBChange} name="rootCB" />
                                                        </Grid>
                                                        <Grid item>All -ve</Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </div>
                                        {/* onChange={()=>{expandchecked ? setExpandchecked(false):setExpandchecked(true)}} expanded={expandchecked} */}

                                        {
                                            loading ?
                                                <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                                :
                                                rosRowsData.map((item, i) => (
                                                    <div className={classes.accordinBox}>

                                                        <div>
                                                            {!edit ?
                                                                <Grid className={classes.switchBox} component="label" container alignItems="center" justify="flex-end" direction="row" spacing={1}>
                                                                    <Grid item>
                                                                        <AntSwitch checked={rosItemCBState.itemObj[item.itemCode]} onChange={handleItemCBChange} name={item.itemCode} id={item.itemTemplateId} />
                                                                    </Grid>
                                                                    <Grid item>All -ve</Grid>
                                                                </Grid>
                                                                : <>

                                                                    <span className={classes.editIcon} title="Edit" onClick={(e) => btnEditRosTemplate(item)}><img src={EditIcon} alt="edit" /></span>
                                                                    <span className={classes.deleteItemIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteTemplateItem(item)} /></span>
                                                                </>}
                                                        </div>
                                                        <Accordion>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleSelectedItem(item.itemTemplateId)} >
                                                                {item.itemTitle}
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {
                                                                    item.subItemDTOList.map((subItem, ind) => (
                                                                        <>
                                                                            <span className={classes.accordionDetails} >
                                                                                {/*<span onClick={() => handleSelectedSubItem(subItem)} > {subItem.subItemTitle}</span>*/}
                                                                                <span > {subItem.subItemTitle}</span>

                                                                                <Grid className={classes.switchList} component="label" container alignItems="center" justify="flex-end" direction="row" spacing={1}>

                                                                                    <Grid item
                                                                                        // onClick={() => handleSubItemCheckbox(subItem, true)}
                                                                                        onClick={() => handleSubItemCheckbox(rosRowsData, subItem, true)}
                                                                                        title="Positive"
                                                                                    >

                                                                                        {
                                                                                            rosSubItemCBState.subItemObj[subItem.subItemCode] == 1 ?
                                                                                                <><AddCircleIcon className={classes.pos} />

                                                                                                    {rosSubItemCBState.subItemObj[subItem.subItemCode] == 1}
                                                                                                </> :
                                                                                                <>
                                                                                                    <AddCircleIcon className={classes.nonSelect} />
                                                                                                    {rosSubItemCBState.subItemObj[subItem.subItemCode] == 0}
                                                                                                </>
                                                                                        }
                                                                                    </Grid>
                                                                                    {/* <Grid item>
                                                                                        <AntSwitch checked={rosSubItemCBState.subItemObj[subItem.subItemCode]}

                                                                                            name={subItem.subItemCode}
                                                                                            id={subItem.itemTemplateId}


                                                                                        />
                                                                                        onChange={() => handleSubItemCheckbox(subItem, !rosSubItemCBState.subItemObj[subItem.subItemCode])}
                                                                                    </Grid> */}


                                                                                    <Grid item
                                                                                        //onClick={() => handleSubItemCheckbox(subItem, false)}
                                                                                        onClick={() => handleSubItemCheckbox(rosRowsData, subItem, false)}
                                                                                        title="Negative "
                                                                                    >

                                                                                        {rosSubItemCBState.subItemObj[subItem.subItemCode] == -1 ?
                                                                                            <>
                                                                                                <RemoveCircleIcon className={classes.nev} />
                                                                                                {rosSubItemCBState.subItemObj[subItem.subItemCode] == -1}

                                                                                            </> :
                                                                                            <>
                                                                                                <RemoveCircleIcon className={classes.nonSelect} />
                                                                                                {rosSubItemCBState.subItemObj[subItem.subItemCode] == 0}
                                                                                            </>
                                                                                        }
                                                                                        {/*{rosSubItemCBState.subItemObj[subItem.subItemCode] == -1 ?*/}
                                                                                        {/*    <RemoveCircleIcon className={classes.nev} /> : <RemoveCircleIcon className={classes.nonSelect} />}*/
                                                                                        }
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </span>

                                                                        </>
                                                                    ))
                                                                }
                                                            </AccordionDetails>
                                                        </Accordion>

                                                    </div>
                                                ))
                                        }

                                    </Scrollbars>
                                </div>

                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={btnAddRosTemplate} btnType="previous" > Add Template </FormBtn>
                                    {/* <FormBtn id="reset" onClick={btnEditRosTemplate}> Edit Item </FormBtn> */}
                                    {edit ? <FormBtn id="reset" onClick={() => { setEdit(false) }}>Cancel Edit</FormBtn>
                                        : <FormBtn id="reset" onClick={() => { setEdit(true) }}>Edit Template</FormBtn>}
                                </div>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>Review of  System</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 430 }}>
                                        <RichTextEditor
                                            className={classes.richTextEdit}
                                            value={editorValue}
                                            //value={RichTextEditor.createValueFromString(chiefComplaintState.hpiDetail, 'html')}
                                            onChange={handleEditorChange}
                                            toolbarConfig={toolbarConfig}
                                        />
                                        {
                                            // errorMessages.errorReviewOfSystemLength ? (<FormHelperText style={{ color: "red" }} >
                                            //     Maximum {MAX_EDITOR_LENGTH} characters allowed in review of system detail
                                            // </FormHelperText>) :
                                            errorMessages.errorReviewOfSystem ? (<FormHelperText style={{ color: "red" }} >
                                                Please add review of system detail
                                            </FormHelperText>) : ('')}
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={getPreviousROS} btnType="previous">Previous ROS</FormBtn>
                                    <div className={classes.footerRight}>
                                        {loading ? <FormBtn id="loadingSave" > Save </FormBtn>
                                            : <FormBtn id="save" onClick={saveReviewOfSystem} > Save </FormBtn>}
                                        <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Scrollbars>
            </Dialog >


            {
                addTempDialog ?
                    <AddNewChartNotes dataTargetId={rosTemplateId} edit={edit} sectionCode={"ROS"} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}></AddNewChartNotes>
                    // <AddTemplateDialog targetID={rosTemplateId} sectionCode={"ROS"} templateText={templateText} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
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

export default withSnackbar(ReviewOfSystemDialog)
