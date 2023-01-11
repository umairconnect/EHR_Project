import React, { useState, useEffect } from "react"
import {
    Dialog,
    Switch,
    Grid,
    Popper,
    Paper,
    FormLabel,
    InputBase,
    FormHelperText
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import RichTextEditor from 'react-rte';
import useStyles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from "../../../../images/icons/math-plus.png";
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { InputBaseField, CheckboxField } from "../../../../components/InputField/InputField";
import AddIcon from '../../../../images/icons/add-icon.png';
import DeleteIcon from "../../../../images/icons/trash.png";
import EditIcon from "../../../../images/icons/erase.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import AddNewChartNotes from '../common/AddNewChartNotes';


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

function PhysicalExamDialog({ showHideDialog, handleClose, ...props }) {

    // handle styles
    const classes = useStyles();
    const MAX_EDITOR_LENGTH = 2000;
    // let poscount=true,nevcount=true;

    //---------
    const { showMessage } = props;
    const [dataId, setDataId] = useState(props.dataId);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [phyExamRowsData, setPhyExamRowsData] = useState([]);
    const [phyExamTemplateId, setPhyExamTemplateId] = useState(0);
    const [phyExamSubTemplateId, setPhyExamSubTemplateId] = useState(0);
    const [isPhyExamTemplateEdited, setIsPhyExamTemplateEdited] = useState(false);
    const [subItemList, setSubItemList] = useState([{ positive: "", negative: "", subItemTitle: "", negativeSubItemTitle: "", sectionCode: 'Physical_Exam' }]);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [textSplitter, setTextSpliter] = useState(", ");

    const [phyExamItemCheckboxState, setPhyExamItemCheckboxState] = useState({});
    const [phyExamSubItemCheckboxState, setPhyExamSubItemCheckboxState] = useState({ positiveSubItemObj: {}, negativeSubItemObj: {} });

    let userID = JSON.parse(GetUserInfo()).user.loggedInUserID;

    // handle status of physical exam info.
    const [phyExamState, setPhyExamState] = useState({
        encounterID: 0, noPhysicalExamInfo: "", physicalExamInfo: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorPhysicalExamInfo: false, errorPhysicalExamLength: false
    });

    const [phyExamItemState, setPhyExamItemState] = useState({
        itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: [], templateText: "", temporaryComments: ""
    });

    const [phyExamSubItemState, setPhyExamSubItemState] = useState({
        itemTemplateId: 0, subItemTemplateId: 0, subItemCode: "", subItemTitle: "", negativeSubItemCode: "", negativeSubItemTitle: ""
    });

    const [errorMessagesPhyExamItem, setErrorMessagesPhyExamItem] = useState({
        errorItemTitle: false, errorSubItemTitle: false, errorNegSubItemTitle: false, errorDuplicateSubItems: false, errorDuplicateNegativeSubItems: false
    })

    const [checkBoxState, setCheckBoxState] = useState({
        rootCheckBox: true,
    });

    const [addTempDialog, setAddTempDialog] = useState(false);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const handleAddTemplateClose = () => {
        setAddTempDialog(false);

    }
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

    //-------------------------
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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
    //-----------------------------

    useEffect(() => {
        if (showHideDialog) {
            
            // getPhyExamItemTemplatesList();
            setPhyExamFormState();
            getTemplateSettings();

            setErrorMessages(prevState => ({
                ...prevState,
                errorPhysicalExamInfo: false
            }));

            setCheckBoxState({
                ...checkBoxState,
                ['rootCheckBox']: true
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

    const handleAllCBChange = (event) => {

        //const { name, value } = event.target;
        const checkBoxValue = event.target.checked;

        setCheckBoxState({
            ...checkBoxState,
            ['rootCheckBox']: checkBoxValue
        });
        
        setPhyExamRowsData(
            phyExamRowsData.map((item, i) => {
                return {
                    itemTemplateId: item.itemTemplateId,
                    sectionCode: 'Physical_Exam',
                    itemCode: item.itemCode,
                    itemTitle: item.itemTitle,
                    subItemDTOList: item.subItemDTOList,
                    isShow: checkBoxValue
                };
            })
        );

    };

    const updateCheckedValue = (templat) => {
        
        setPhyExamRowsData(
            phyExamRowsData.map((item, i) => {
                if (item.itemCode == templat.itemCode) {
                    return {
                        itemTemplateId: item.itemTemplateId,
                        sectionCode: 'Physical_Exam',
                        itemCode: item.itemCode,
                        itemTitle: item.itemTitle,
                        subItemDTOList: item.subItemDTOList,
                        isShow: !item.isShow
                    };
                }
                else {
                    return {
                        itemTemplateId: item.itemTemplateId,
                        sectionCode: 'Physical_Exam',
                        itemCode: item.itemCode,
                        itemTitle: item.itemTitle,
                        subItemDTOList: item.subItemDTOList,
                        isShow: item.isShow
                    };
                }

            })
        );


    };

    const btnEditRosTemplate = (item) => {

        const id = item;
        setPhyExamTemplateId(id);
        getPhyExamItemTemplateByID(id);
        setIsPhyExamTemplateEdited(true);

        setAddTempDialog(true);
    };

    const deleteTemplateItem = (item) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Physical Exam Template?", "confirm", function () {

            PostDataAPI('itemTemplate/deleteItemTemplate', item, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setPhyExamTemplateId(0);
                    setIsPhyExamTemplateEdited(false);
                    getPhyExamItemTemplatesList();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });

    }

    const getPhyExamItemTemplatesList = (notes) => {
        
        let encData = {
            "section": "Physical_Exam",
            "userID": userID,
            "patientId": props.patientId
        }

        if (!notes)
            notes = editorValue.toString('html');
        PostDataAPI("itemTemplate/loadItemTemplateGrid", encData).then((result) => {

            if (result.success && result.data != null) {
                //-------------------------------------------

                
                let itemObj = {};
                result.data.map((item, i) => {
                    let itmName = item.itemCode;
                    itemObj[itmName] = false
                });

                setPhyExamItemCheckboxState({ itemObj });
                //count = 0;
                let positiveSubItemObj = {};
                let negativeSubItemObj = {};
                result.data.map((item, i) => {
                    item.subItemDTOList.map((subItem, ii) => {
                        
                        let sbName = subItem.subItemTemplateId + '_' + subItem.subItemCode;
                        let nagSbItmName = subItem.subItemTemplateId + '_' + subItem.negativeSubItemCode;
                        if (phyExamState.nophysicalExamInfo)
                            phyExamState.nophysicalExamInfo = phyExamState.nophysicalExamInfo.trim(' ')
                        if (notes.includes(subItem.subItemTitle)) {
                            
                            let findsubitemposition = notes.indexOf(subItem.subItemTitle)
                            let subString = subItem.subItemTitle;
                            let substringlength = subString.length;
                            if (notes[findsubitemposition + substringlength] == '<' || notes[findsubitemposition + substringlength] == '.' || notes[findsubitemposition + substringlength] == ','|| notes[findsubitemposition + substringlength] == ' ') {
                                if (phyExamState.nophysicalExamInfo) {
                                    positiveSubItemObj[sbName] = false
                                }
                                else {
                                    positiveSubItemObj[sbName] = true
                                }
                            }
                            else {
                                positiveSubItemObj[sbName] = false
                            }
                        }
                        else {
                            positiveSubItemObj[sbName] = false
                        }

                        if (notes.includes(subItem.negativeSubItemTitle)) {
                            
                            let findsubitemposition = notes.indexOf(subItem.negativeSubItemTitle)
                            let subString = subItem.negativeSubItemTitle;
                            let substringlength = subString.length;
                            if (notes[findsubitemposition + substringlength] == '<' || notes[findsubitemposition + substringlength] == '.' || notes[findsubitemposition + substringlength] == ',' || notes[findsubitemposition + substringlength] == ' ') {
                                if (phyExamState.nophysicalExamInfo) {
                                    negativeSubItemObj[nagSbItmName] = false
                                } 
                                else
                                {
                                    negativeSubItemObj[nagSbItmName] = true
                                }
                            }
                            else {
                                negativeSubItemObj[nagSbItmName] = false
                            }

                        }
                        else {
                            negativeSubItemObj[nagSbItmName] = false
                        }

                        // positiveSubItemObj[sbName] = notes.indexOf(item.itemTitle.trim() + ":") >= 0 && notes.indexOf(subItem.subItemTitle.trim()) >= 0
                        //negativeSubItemObj[nagSbItmName] = notes.indexOf(item.itemTitle.trim() + ":") >= 0 && notes.indexOf(subItem.negativeSubItemTitle.trim()) >= 0

                    });
                });
                
               setPhyExamSubItemCheckboxState({ positiveSubItemObj, negativeSubItemObj });

                //-------------------------------------------

                setPhyExamRowsData(
                    result.data.map((item, i) => {
                        return {
                            itemTemplateId: item.itemTemplateId,
                            sectionCode: result.data.sectionCode,
                            itemCode: item.itemCode,
                            itemTitle: item.itemTitle,
                            subItemDTOList: item.subItemDTOList,
                            isShow: true
                        };
                    }));
            }

        })
    }

    const getPhyExamItemTemplateByID = (id) => {
        
        let itmId = (id == undefined || id == 'undefined') ? phyExamTemplateId : id;

        PostDataAPI("itemTemplate/getItemTemplateById", parseInt(itmId)).then((result) => {
            if (result.success && result.data != null) {
                setPhyExamItemState({
                    itemTemplateId: result.data.itemTemplateId,
                    sectionCode: result.data.sectionCode,
                    itemCode: result.data.itemCode,
                    itemTitle: result.data.itemTitle,
                    subItemDTOList: result.data.subItemDTOList
                });

                if (result.data.subItemDTOList != null)
                    setSubItemList(result.data.subItemDTOList);
                else
                    setSubItemList([{ positive: "", negative: "", subItemTitle: "", negativeSubItemTitle: "", sectionCode: "Physical_Exam" }]);
            }
            else {
                showMessage('Error', result.message, 'error');
            }
        })

    }

    const setPhyExamFormState = e => {
        
        if (props.encounterId == undefined || props.encounterId == "" || props.encounterId < 0) {

            setPhyExamState(prevState => ({
                ...prevState,
                encounterID: 0, physicalExamInfo: "", noPhysicalExamInfo: ""
            }
            ));

            setPhyExamItemState(prevState => ({
                ...prevState,
                itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: []
            }
            ));
        }
        else {
            getPhysicalExam(props.encounterId);
        }
    }

    const getPhysicalExam = (id) => {
        
        PostDataAPI("encounter/getPhysicalExamInfoById", parseInt(id)).then((result) => {
            
            if (result.success && result.data != null) {
                if (result.data.noPhysicalExamInfo != null || result.data.noPhysicalExamInfo != undefined) {
                    let res = result.data.noPhysicalExamInfo.split("Unable to review physical exam due to:")[1]
                    if (res)
                        res = res.trim(' ')
                    if (res == "undefined")
                        result.data.noPhysicalExamInfo = ""
                    else
                        result.data.noPhysicalExamInfo = result.data.noPhysicalExamInfo.split("Unable to review physical exam due to:")[1]
                }
                else {
                    result.data.noPhysicalExamInfo = ""
                }
                setPhyExamState({
                    encounterID: result.data.encounterID,
                    noPhysicalExamInfo: result.data.noPhysicalExamInfo,
                    physicalExamInfo: result.data.physicalExamInfo
                });
                if (result.data.physicalExamInfo != null)
                    setEditorValue(RichTextEditor.createValueFromString(result.data.physicalExamInfo, 'html'));
                else
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));
            }
            else {
                showMessage('Error', result.message, 'error');
            }
            getPhyExamItemTemplatesList(result.data ? result.data.physicalExamInfo : "");
        })

    }

    const getPreviousPhyExamInfo = (e) => {
        
        let encData = {
            "patientId": props.patientId
        }

        PostDataAPI("encounter/getPreviousPhysicalExamInfo", encData, true).then((result) => {

            if (result.success && result.data.noPhysicalExamInfo != null || result.data.noPhysicalExamInfo != undefined) {
                setPhyExamState(prevState => ({
                    ...prevState,
                    ['noPhysicalExamInfo']: result.data.noPhysicalExamInfo
                }));
            }
            else if (result.success && result.data.physicalExamInfo != null)
                setEditorValue(RichTextEditor.createValueFromString(result.data.physicalExamInfo, 'html'));
            else
                setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        })
    }

    const handleEditorChange = (editorValue) => {
        setEditorValue(editorValue);

    }

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setPhyExamState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const savePhysicalExamInfo = (e) => {

        
        e.preventDefault();

        let editorValueOfPhyExam = editorValue.toString('html');

        let errorList = []

        if (editorValueOfPhyExam && editorValueOfPhyExam.length > (MAX_EDITOR_LENGTH * 1.5)) {
            showMessage("Error", `Maximum ${MAX_EDITOR_LENGTH} characters allowed in physical exam details`, "error", 3000);
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhysicalExamLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhysicalExamLength: false
            }));
        }

        const testEmptyHtml = /(<([^>]+)>)/ig
        
        if (phyExamState.noPhysicalExamInfo != null)
            phyExamState.noPhysicalExamInfo = phyExamState.noPhysicalExamInfo.trim(' ');
        if (phyExamState.noPhysicalExamInfo == "")
            phyExamState.noPhysicalExamInfo = null
        if (!phyExamState.noPhysicalExamInfo) {
            if (!editorValueOfPhyExam || editorValueOfPhyExam == "" || !!editorValueOfPhyExam.replace(testEmptyHtml, "") == "" || editorValueOfPhyExam == "<p><br></p>" || editorValueOfPhyExam == "<p></p>") {
                // if (resultsRef.current) {
                //     window.scrollTo({
                //         behavior: "smooth",
                //         top: resultsRef.current.offsetTop
                //     });
                // }
                // resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhysicalExamInfo: true
                }));
                errorList.push(true);

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorPhysicalExamInfo: false
                }));
            }
        }


        if (errorList.length < 1) {
            setLoading(true);
            let method = "encounter/editEncounterForPhysicalExamInfo";
            let noPhysicalExamInfo = "";
            phyExamState.physicalExamInfo = editorValueOfPhyExam;

            if (phyExamState.noPhysicalExamInfo != null || phyExamState.noPhysicalExamInfo != undefined) {
                noPhysicalExamInfo = "Unable to review physical exam due to: " + phyExamState.noPhysicalExamInfo
            }

            if (phyExamState.noPhysicalExamInfo)
                phyExamState.physicalExamInfo = "";
            phyExamState.nophysicalExamInfo = noPhysicalExamInfo
            PostDataAPI(method, phyExamState, true).then((result) => {
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
                }
            })

        }
        else {
            e.preventDefault();
        }

    }

    //--------------------- physical templates

    const handleSubItemListInputChange = (e, index) => {
        
        const { name, value } = e.target;
        const list = [...subItemList];
        list[index][name] = value;
        setSubItemList(list);
    };

    const handleListAddClick = () => {
        
        setSubItemList([...subItemList, { positive: "", negative: "", subItemTitle: "", negativeSubItemTitle: "", sectionCode: "Physical_Exam" }]);
    };

    const handleListRemoveClick = index => {
        const list = [...subItemList];
        list.splice(index, 1);
        setSubItemList(list);

        setErrorMessagesPhyExamItem(prevState => ({
            ...prevState,
            ...prevState,
            errorDuplicateSubItems: false
        }));
    };

    const btnAddPhyExamTemplate = (event) => {
        
        setAddTempDialog(true);
        setEdit(false);
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setPhyExamTemplateId(0);
        setIsPhyExamTemplateEdited(false);

        setPhyExamItemState(prevState => ({
            ...prevState,
            itemTemplateId: 0, sectionCode: "", itemCode: "", itemTitle: "", subItemDTOList: [], templateText: "", temporaryComments: "", level: "user"
        }
        ));

        setPhyExamSubItemState(prevState => ({
            itemTemplateId: 0, subItemTemplateId: 0, subItemCode: "", subItemTitle: "", negativeSubItemCode: "", negativeSubItemTitle: ""
        }
        ));

        setSubItemList([{ positive: "", negative: "", subItemTitle: "", negativeSubItemTitle: "", sectionCode: "Physical_Exam" }]);

    };

    const handlePhyExamItemChange = (e) => {
        
        const { name, value } = e.target;

        setPhyExamItemState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const savePhyExamItemTemplate = e => {
        
        e.preventDefault();
        let errorList = []

        if (!phyExamItemState.itemTitle || phyExamItemState.itemTitle.trim() == "") {
            setErrorMessagesPhyExamItem(prevState => ({
                ...prevState,
                errorItemTitle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessagesPhyExamItem(prevState => ({
                ...prevState,
                errorItemTitle: false
            }));
        }

        phyExamItemState.subItemDTOList = subItemList;

        if (phyExamItemState.subItemDTOList.length > 0) {
            
            phyExamItemState.subItemDTOList.map((subItem) => {

                if (!subItem.subItemTitle || subItem.subItemTitle.trim() == "") {
                    setErrorMessagesPhyExamItem(prevState => ({
                        ...prevState,
                        errorSubItemTitle: true
                    }));
                    errorList.push(true);
                }
                else {
                    setErrorMessagesPhyExamItem(prevState => ({
                        ...prevState,
                        errorSubItemTitle: false
                    }));
                }

                if (!subItem.negativeSubItemTitle || subItem.negativeSubItemTitle.trim() == "") {
                    setErrorMessagesPhyExamItem(prevState => ({
                        ...prevState,
                        errorNegSubItemTitle: true
                    }));
                    errorList.push(true);
                }
                else {
                    setErrorMessagesPhyExamItem(prevState => ({
                        ...prevState,
                        errorNegSubItemTitle: false
                    }));
                }

            });
        }

        if (errorList.length < 1) {

            let method = "itemTemplate/addItemTemplate";
            if (isPhyExamTemplateEdited)
                method = "itemTemplate/updateItemTemplate";

            var fValue = phyExamItemState.itemTitle.replace("/", "_");
            phyExamItemState.itemCode = fValue.replace(" ", "_");
            phyExamItemState.sectionCode = "Physical_Exam";


            let tempsubitemlst = [];
            let isDuplicateName = false;

            phyExamItemState.subItemDTOList.map((rm, key) => {

                if (key > 0) {
                    let duplicateNameList = tempsubitemlst.filter(tmprm => tmprm.subItemTitle.trim() == rm.subItemTitle.trim());
                    tempsubitemlst.push({ subItemTitle: rm.subItemTitle.trim(), negativeSubItemTitle: rm.negativeSubItemTitle.trim() });
                    if (duplicateNameList.length > 0) {
                        isDuplicateName = true;
                        return;
                    }
                }
                else
                    tempsubitemlst.push({ subItemTitle: rm.subItemTitle.trim(), negativeSubItemTitle: rm.negativeSubItemTitle.trim() });
            });

            if (!isDuplicateName) {

                PostDataAPI(method, phyExamItemState, true).then((result) => {
                    if (result.success == true && result.data != null) {

                        setErrorMessagesPhyExamItem([]);

                        if (isPhyExamTemplateEdited)
                            showMessage("Success", result.data.itemTitle + "  updated successfully.", "success", 3000);
                        else
                            showMessage("Success", result.data.itemTitle + "  saved successfully.", "success", 3000);

                        getPhyExamItemTemplatesList();
                        btnAddPhyExamTemplate();

                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                        e.preventDefault();
                    }
                });

            }
            else {
                setErrorMessagesPhyExamItem(prevState => ({
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

    const handleItemAllNormal = (event) => {

        const { name, value } = event.target;
        const isChecked = event.target.checked;

        let itemObj = phyExamRowsData.filter(c => c.itemCode == name)[0];
        
        setPhyExamItemCheckboxState(prevState => ({
            ...prevState,
            itemObj: {
                ...prevState.itemObj,
                [itemObj.itemCode]: isChecked
            }
        }));

        itemObj.subItemDTOList.map((sbItm) => {

            setPhyExamSubItemCheckboxState(prevState => ({
                ...prevState,
                positiveSubItemObj: {
                    ...prevState.positiveSubItemObj,
                    [sbItm.subItemTemplateId + '_' + sbItm.subItemCode]: isChecked
                }
            }));

        });

        let existingText = editorValue.toString('html');
        existingText = existingText.replace('<br>', '');
        let customText = "<p><div>";

        if (isChecked) {

            if (existingText.indexOf(itemObj.itemTitle) >= 0) {
                itemObj.subItemDTOList.map((sbItm, ii) => {
                    if (existingText.indexOf(sbItm.subItemTitle) >= 0) {
                        existingText = existingText.replace('<strong>' + sbItm.subItemTitle + '</strong>', sbItm.subItemTitle);
                    }
                    else {
                        customText += sbItm.subItemTitle + textSplitter;
                    }
                });
            }
            else {
                customText += '<p><strong>' + itemObj.itemTitle.trim() + ':' + '</strong></p><p>';

                itemObj.subItemDTOList.map((sbItm, ii) => {
                    if (existingText.indexOf(sbItm.subItemTitle) >= 0) {
                        existingText = existingText.replace('<strong>' + sbItm.subItemTitle + '</strong>', sbItm.subItemTitle);
                    }
                    else {
                        customText += sbItm.subItemTitle + textSplitter;
                    }
                });

                customText = removeLastSpliter(customText);
                customText += "</p></div></p>"
                existingText += customText;
            }
        }
        else {

            itemObj.subItemDTOList.map((sbItm, ii) => {
                if (existingText.indexOf(sbItm.subItemTitle) >= 0) {
                    existingText = existingText.replace(sbItm.subItemTitle, '<strong>' + sbItm.subItemTitle + '</strong>');
                }
                else {
                    customText += '<strong>' + sbItm.subItemTitle + '</strong>';
                }
            });

            customText += "</p></div></p>"
            existingText += customText;

        }
        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));
    }

    const removeLastSpliter = (customText) => {
        var lastChar = customText.slice(textSplitter.length);
        if (lastChar == textSplitter) {
            customText = customText.slice(0, -(textSplitter.length));
        }
        return customText;
    }

    const handleSubItemPositiveCheckbox = (event, templateId) => {
        
        
        // poscount = false 
        const { name, value, id } = event.target;
        const isChecked = event.target.checked;
        //let templateId = event.currentTarget.id;

        if (templateId != null && templateId != "") {

            let itemObj = phyExamRowsData.filter(c => c.itemTemplateId == templateId)[0];
            let subItemObj = itemObj.subItemDTOList.filter(c => c.subItemCode == name && c.subItemTemplateId == id)[0];
            let ngtiveCode = subItemObj.negativeSubItemCode;

            setPhyExamSubItemCheckboxState(prevState => ({
                ...prevState,
                positiveSubItemObj: {
                    ...prevState.positiveSubItemObj,
                    [id + '_' + name]: isChecked
                }
            }));

            if (isChecked) {
                let existingText = editorValue.toString('html');

                if (existingText.indexOf(subItemObj.negativeSubItemTitle) >= 0) {

                    setPhyExamSubItemCheckboxState(prevState => ({
                        ...prevState,
                        negativeSubItemObj: {
                            ...prevState.negativeSubItemObj,
                            [subItemObj.subItemTemplateId + '_' + subItemObj.negativeSubItemCode]: !isChecked
                        }
                    }));
                }
            }

            //addingTextToEditorNew(itemObj.itemCode, itemObj.itemTitle, subItemObj, isChecked, true, itemObj);
            addTextToEditor(itemObj, id, name, isChecked);
        }

    };

    const handleSubItemNegativeCheckbox = (event, templateId) => {
        
        // nevcount = false
        const { name, value, id } = event.target;
        const isChecked = event.target.checked;


        setPhyExamSubItemCheckboxState(prevState => ({
            ...prevState,
            negativeSubItemObj: {
                ...prevState.negativeSubItemObj,
                [id + '_' + name]: isChecked
            }
        }));

        //let templateId = event.currentTarget.id;

        if (templateId != null && templateId != "") {

            let itemObj = phyExamRowsData.filter(c => c.itemTemplateId == templateId)[0];
            let subItemObj = itemObj.subItemDTOList.filter(c => c.negativeSubItemCode == name && c.subItemTemplateId == id)[0];

            if (isChecked) {
                let existingText = editorValue.toString('html');
                if (existingText.indexOf(subItemObj.subItemTitle) >= 0) {

                    setPhyExamSubItemCheckboxState(prevState => ({
                        ...prevState,
                        positiveSubItemObj: {
                            ...prevState.positiveSubItemObj,
                            [subItemObj.subItemTemplateId + '_' + subItemObj.subItemCode]: !isChecked
                        }
                    }));
                }
            }

            //addingTextToEditor(subItemObj.negativeSubItemTitle, itemObj.itemCode, itemObj.itemTitle, isChecked, false);
            //addingTextToEditorNew(itemObj.itemCode, itemObj.itemTitle, subItemObj, isChecked, false, itemObj);
            addTextToEditor(itemObj, id, name, isChecked);
        }

    };
    const addTextToEditor = (itemObj, subItemId, subItemCode, isChecked) => {
        if (editorValue.toString('html') == "") {
            setEditorValue(RichTextEditor.createValueFromString("", 'html'));
        }
        let existingText = editorValue.toString('html');
        existingText = existingText.indexOf('<p></p>') == 0 ? existingText.replace('<p></p>', '') : existingText;
        let editorText = "";
        var newCustomText3 = '';
        let test = existingText.indexOf(itemObj.itemTitle)
        if (existingText.indexOf(itemObj.itemTitle) >= 0) {
            let newCustomText0 = existingText.split(itemObj.itemTitle);
            let newCustomText1 = newCustomText0[1].split('</div>');
            var newCustomText2 = newCustomText1[0].split('<p>');
            if (newCustomText2.length > 1)
                newCustomText3 = newCustomText2[1].split('</p>')[0];
            if (true)
                newCustomText3 = newCustomText3 == '' ? '<p></p>' : newCustomText3;

        }
        else {
            editorText = '<p><div><p><strong>' + itemObj.itemTitle.trim() + ':</strong></p><p>';
        }
        //let removeCountFlag = 0;
        //let subItemCount=0
        itemObj.subItemDTOList.map(subItemObj => {
            

            const subItemFlag_Neg = phyExamSubItemCheckboxState.negativeSubItemObj[subItemObj.subItemTemplateId + '_' + subItemObj.negativeSubItemCode];
            const subItemFlag_Pos = phyExamSubItemCheckboxState.positiveSubItemObj[subItemObj.subItemTemplateId + '_' + subItemObj.subItemCode];
            //Flag value can only be used for previously selected checkboxes as state for current checkbox is not yet updated that's why using (OR) for current checkbox 
            if ((subItemFlag_Neg == true && subItemObj.subItemTemplateId != subItemId) ||
                (isChecked && subItemObj.subItemTemplateId == subItemId && subItemObj.negativeSubItemCode == subItemCode)) {
                if (editorText && !editorText.endsWith(":</strong></p><p>"))
                    editorText += textSplitter;
                editorText += subItemObj.negativeSubItemTitle;

            }
            else if ((subItemFlag_Pos == true && subItemObj.subItemTemplateId != subItemId) ||
                (isChecked && subItemObj.subItemTemplateId == subItemId && subItemObj.subItemCode == subItemCode)) {
                if (editorText && !editorText.endsWith(":</strong></p><p>"))
                    editorText += textSplitter;
                editorText += '<strong>' + subItemObj.subItemTitle + '</strong>';
            }


            //if (subItemFlag_Neg == false && subItemFlag_Pos==false) { removeCountFlag++ }
            //subItemCount = itemObj.subItemDTOList.length

        });

        if (existingText.indexOf(itemObj.itemTitle) < 0)
            editorText += "</p></div></p>"
        if (newCustomText3 == '<p></p>')
            editorText = '<p>' + editorText + '</p>';
        if (existingText.indexOf(itemObj.itemTitle) < 0)
            existingText = existingText + editorText;
        else
            existingText = existingText.replace(newCustomText3, editorText);

        if (editorText == "") {
            let title = "<p><strong>" + itemObj.itemTitle + ":" + "</strong></p>"
            let findposition = existingText.indexOf(title)
            let splitEndposition = findposition + (title.length)
            let existingTextnew = existingText;
            existingTextnew = existingTextnew.substring(0, findposition) + "" + existingTextnew.substring(splitEndposition, existingTextnew.length);
            existingText = existingTextnew

            // existingText = existingText.replace(title, "")
        }
        
        let itemcount = 0;
        phyExamRowsData.map((item, i) => {
            
            if (existingText.includes(item.itemTitle)) {
                itemcount++
            }

        });
        if (itemcount == 0) {
            existingText = " ";
        }
        //console.log('-----------Editor Text---------------');
        //console.log(existingText);
        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));
    }

    const onBlurCommentsNew = (e) => {

        const { name, value } = e.target;
        let templateId = e.currentTarget.id;

        let existingText = editorValue.toString('html');
        existingText = existingText.replace('<br>', '');
        let customText = "<p><div>";
        let newTextToAdd = "<p><strong>Comments:</strong> " + value + '</p>';

        if (templateId != null && templateId != "") {

            let itemObj = phyExamRowsData.filter(c => c.itemTemplateId == templateId)[0];

            // adding text to editor

            if (existingText.indexOf(itemObj.itemTitle) >= 0) {

                let newCustomText0 = existingText.split(itemObj.itemTitle);
                let newCustomText1 = newCustomText0[1].split('</div>');
                var newCustomText2 = newCustomText1[0].split('<p>')
                var newCustomText3 = newCustomText2[1].split('</p>');

                if (existingText.indexOf('<p><strong>Comments:</strong>') >= 0) {

                    let newCustomText00 = existingText.split('Comments:</strong>')
                    let newCustomText001 = newCustomText00[1].split('</p>')

                    let newText = existingText.replace(newCustomText001[0], value);
                    existingText = newText;
                }
                else {
                    let newTempText = newCustomText3[0] + ', ' + newTextToAdd
                    let newaddedads = existingText.replace(newCustomText3[0], newTempText);
                    existingText = newaddedads;
                }
            }
            else {
                customText += '<p><strong>' + itemObj.itemTitle + ':' + '</strong></p>';
                customText += newTextToAdd

                customText += "</div></p>"
                existingText += customText;
            }

        }

        setEditorValue(RichTextEditor.createValueFromString(existingText, 'html'));
    }


    const closeDialog = () => {
        
        setPhyExamRowsData([]);
        handleClose();
        setAnchorEl(null);
    }

    //// ---------------------

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
                {...props} className={classes.dialog}>
                <Scrollbars autoHeight autoHeightMax={620} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <div className={classes.leftSideHeader}>Templates</div>
                                </div>
                                <div className={`${classes.content} ${classes.whiteBg}`}>
                                    <Scrollbars style={{ height: 500 }}>
                                        <div className={classes.quickPickHeader}>
                                            <Grid component="label" container alignItems="center" justify="flex-end" direction="row" spacing={1}>
                                                <Grid item>
                                                    <AntSwitch
                                                        name="rootCheckBox"
                                                        checked={checkBoxState.rootCheckBox}
                                                        onChange={handleAllCBChange}
                                                    />
                                                </Grid>
                                                <Grid item>Add All</Grid>
                                            </Grid>
                                        </div>

                                        {loading ?
                                            <img className={classes.dataLoader} src={LoadingIcon} alt="Loading..." />
                                            :
                                            <ul className={classes.templateList}>
                                                {
                                                    phyExamRowsData.map((item, i) => (
                                                        <li onClick={() => { updateCheckedValue(item) }}> {item.itemTitle}
                                                            {!edit ?
                                                                item.isShow ?
                                                                    < CheckIcon className={classes.clockIconChecked} />
                                                                    : < CheckIcon className={classes.clockIcon} />
                                                                : <>
                                                                    <span className={classes.editIcon} title="Edit" onClick={(e) => btnEditRosTemplate(item)}><img src={EditIcon} alt="edit" /></span>
                                                                    <span className={classes.deleteItemIcon} title="Delete"><img src={DeleteIcon} alt="delete" onClick={() => deleteTemplateItem(item)} /></span>
                                                                </>}
                                                        </li>
                                                    ))
                                                }
                                            </ul>}
                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={btnAddPhyExamTemplate} btnType="previous">Physical Exam Add Item </FormBtn>

                                    {edit ? <FormBtn id="reset" onClick={() => { setEdit(false) }}>Cancel Edit</FormBtn>
                                        : <FormBtn id="reset" onClick={() => { setEdit(true) }}>Edit Item</FormBtn>}
                                </div>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <span className={classes.crossButton} onClick={closeDialog}><img src={CloseIcon} /></span>
                                    <FormGroupTitle>Physical Exam</FormGroupTitle>
                                    <div className={classes.headerInput}>
                                        <span className={classes.footerLabel}>Unable to Review Physical Exam Due to:</span>

                                        <InputBaseField
                                            className={classes.baseInput}
                                            name="noPhysicalExamInfo"
                                            value={phyExamState.noPhysicalExamInfo}
                                            onChange={handleChanges}
                                            type="text"
                                        />

                                    </div>
                                </div>
                                <div className={`${classes.content} ${classes.subContent}`}>
                                    <Scrollbars>
                                        <Grid container sm={12}>

                                            {
                                                phyExamRowsData.map((item, i) => (
                                                    <>
                                                        {item.isShow ?
                                                            <Grid item sm={6}>

                                                                <div className={classes.contentBox}>
                                                                    <div className={classes.contentBoxHeader}>
                                                                        <div className={classes.pBox}>
                                                                            <div className={classes.pTitle}>{item.itemTitle}</div>
                                                                            <div className={classes.pLine}></div>
                                                                            <div className={classes.pCheckBox}>
                                                                                <CheckboxField
                                                                                    color="primary"
                                                                                    label="All Normal"
                                                                                    value={item.itemTitle}
                                                                                    onChange={handleItemAllNormal}
                                                                                    name={item.itemCode}
                                                                                    checked={phyExamItemCheckboxState.itemObj[item.itemCode]}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={classes.contentBoxArea}>
                                                                        <div className={classes.contentPositive}>
                                                                            <span className={classes.subTitle}>Positive</span>
                                                                            {
                                                                                item.subItemDTOList.map((subItem, ind) => (
                                                                                    <div className={classes.pCheckBox2}>

                                                                                        <CheckboxField
                                                                                            color="primary"
                                                                                            label={subItem.subItemTitle}
                                                                                            value={subItem.subItemTitle}
                                                                                            id={subItem.subItemTemplateId}
                                                                                            name={subItem.subItemCode}
                                                                                            onChange={(e) => { handleSubItemPositiveCheckbox(e, subItem.itemTemplateId) }}
                                                                                            checked={phyExamSubItemCheckboxState.positiveSubItemObj[subItem.subItemTemplateId + '_' + subItem.subItemCode]}
                                                                                        />
                                                                                    </div>

                                                                                ))
                                                                            }
                                                                        </div>
                                                                        <div className={classes.contentNegative}>
                                                                            <span>Negative</span>
                                                                            {
                                                                                item.subItemDTOList.map((subItem, ind) => (
                                                                                    <div className={classes.pCheckBox2}>
                                                                                        {/*{ nevcount ?*/}
                                                                                        {/*    <>*/}
                                                                                        {/*        <CheckboxField*/}
                                                                                        {/*            color="primary"*/}
                                                                                        {/*            label={subItem.negativeSubItemTitle}*/}
                                                                                        {/*            value={subItem.negativeSubItemCode}*/}
                                                                                        {/*            id={subItem.subItemTemplateId}*/}
                                                                                        {/*            name={subItem.negativeSubItemCode}*/}
                                                                                        {/*            onChange={(e) => { handleSubItemNegativeCheckbox(e, subItem.itemTemplateId) }}*/}
                                                                                        {/*            checked={false}*/}
                                                                                        {/*        />*/}

                                                                                        {/*    </> : <>*/}
                                                                                        <CheckboxField
                                                                                            color="primary"
                                                                                            label={subItem.negativeSubItemTitle}
                                                                                            value={subItem.negativeSubItemCode}
                                                                                            id={subItem.subItemTemplateId}
                                                                                            name={subItem.negativeSubItemCode}
                                                                                            onChange={(e) => { handleSubItemNegativeCheckbox(e, subItem.itemTemplateId) }}
                                                                                            checked={phyExamSubItemCheckboxState.negativeSubItemObj[subItem.subItemTemplateId + '_' + subItem.negativeSubItemCode]}
                                                                                        />
                                                                                        {/*    </>*/}
                                                                                        {/*}*/}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className={classes.contentBoxFooter}>
                                                                        <span className={classes.footerLabel}>Comments:</span>
                                                                        <InputBase
                                                                            className={classes.baseInput}
                                                                            id={item.itemTemplateId}
                                                                            name="temporaryComments"
                                                                            placeholder={"comments"}
                                                                            value={item.temporaryComments}
                                                                            onBlur={onBlurCommentsNew}
                                                                        //onKeyDown={handleKeyPressComments}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </Grid>
                                                            : ""}
                                                    </>

                                                ))

                                            }
                                        </Grid>



                                    </Scrollbars>
                                </div>
                                <div className={`${classes.content} ${classes.subContent}`}>
                                    <Scrollbars style={{ height: 220 }}>
                                        <RichTextEditor
                                            className={classes.richTextEdit}
                                            value={editorValue}
                                            autoFocus={true}
                                            //value={RichTextEditor.createValueFromString(chiefComplaintState.hpiDetail, 'html')}
                                            onChange={handleEditorChange}
                                            toolbarConfig={toolbarConfig}
                                        />

                                        {
                                            // errorMessages.errorPhysicalExamLength ? (<FormHelperText style={{ color: "red" }} >
                                            //     Maximum {MAX_EDITOR_LENGTH} characters allowed in physical exam details
                                            // </FormHelperText>) :
                                            errorMessages.errorPhysicalExamInfo ? (<FormHelperText style={{ color: "red" }} >
                                                Please add Physical Exam details
                                            </FormHelperText>) : ('')}

                                    </Scrollbars>
                                </div>
                                <div className={classes.footer}>
                                    <FormBtn id="save" onClick={getPreviousPhyExamInfo} btnType="previous">Previous Physical Exam</FormBtn>
                                    <div className={classes.footerRight}>
                                        {loading ?
                                            <FormBtn id="loadingSave" > Save </FormBtn>
                                            :
                                            <FormBtn id="save" onClick={savePhysicalExamInfo} > Save </FormBtn>
                                        }
                                        <FormBtn id="reset" onClick={closeDialog}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Scrollbars>
            </Dialog>

            <AddNewChartNotes dataTargetId={phyExamTemplateId} edit={edit} sectionCode={"Physical_Exam"} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}></AddNewChartNotes>

            {/* <Popper className={classes.addRosBox} id={id} open={open} anchorEl={anchorEl} placement={'top-left'} transition>
                <Paper className={classes.paper} >
                    <span className={classes.crossButton} onClick={btnAddPhyExamTemplate} ><img src={CloseIcon} /></span>
                    <div className={classes.addRosTitle}> {edit ? "Edit " : "Add "} Physical Exam item</div>
                    <div className={classes.addRosContent}>
                        <Grid container >
                            <Grid item lg={12} container direction="row">
                                <Grid item xs={2} md={2} sm={3} lg={2}>
                                    <FormLabel className={classes.lableInput}>Item Name:</FormLabel>
                                </Grid>
                                <Grid item xs={8} md={8} sm={8} lg={8} >
                                    <InputBaseField
                                        placeholder="physical exam Name "
                                        onChange={handlePhyExamItemChange}
                                        name="itemTitle"
                                        value={phyExamItemState.itemTitle}
                                        MaxLength="255"
                                        type="text"
                                    />
                                    {errorMessagesPhyExamItem.errorItemTitle && (!phyExamItemState.itemTitle || phyExamItemState.itemTitle.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter item name
                                    </FormHelperText>) : ('')}
                                </Grid>
                                <Grid item xs={2} md={2} sm={2} lg={2}>
                                    &nbsp;
                                </Grid>
                            </Grid>
                        </Grid>
                        <FormGroupTitle >Sub Items</FormGroupTitle>
                        <Grid container className={classes.inputContainer}>
                            <Scrollbars autoHeight autoHeightMax={200} style={{ maxHeight: "100%" }}>
                                <Grid item lg={12} container direction="row">
                                    <Grid item xs={11} md={11} sm={11} lg={11} style={{ display: "flex" }} >
                                        <div className={classes.paperLeft}>
                                            <FormLabel className={classes.lableInput} style={{ textAlign: "center" }}>Positive</FormLabel>
                                        </div>
                                        <div className={classes.paperRight}>
                                            <FormLabel className={classes.lableInput} style={{ textAlign: "center" }}>Negative</FormLabel>
                                        </div>
                                    </Grid>
                                    <Grid item md={1}>

                                    </Grid>
                                </Grid>

                                {subItemList.map((x, i) => {
                                    return (
                                        <Grid item lg={12} container direction="row">
                                            <Grid item xs={11} md={11} sm={11} lg={11} style={{ display: "flex" }} >
                                                <div className={classes.paperLeft}>
                                                    <InputBase
                                                        className={classes.baseInput}
                                                        name="subItemTitle"
                                                        placeholder={"Positive Value"}
                                                        value={x.subItemTitle}
                                                        onChange={e => handleSubItemListInputChange(e, i)}
                                                    />
                                                    {errorMessagesPhyExamItem.errorSubItemTitle ?
                                                        (<FormHelperText style={{ color: "red" }} >
                                                            SubItem have duplicate item name.
                                                        </FormHelperText>)
                                                        : ('')}
                                                </div>
                                                &nbsp;&nbsp;
                                                <div className={classes.paperRight}>
                                                    <InputBase
                                                        className={classes.baseInput}
                                                        name="negativeSubItemTitle"
                                                        placeholder={"Negative Value"}
                                                        value={x.negativeSubItemTitle}
                                                        onChange={e => handleSubItemListInputChange(e, i)}
                                                    />
                                                    {errorMessagesPhyExamItem.errorNegSubItemTitle ?
                                                        (<FormHelperText style={{ color: "red" }} >
                                                            SubItem have duplicate negative name.
                                                        </FormHelperText>)
                                                        : ('')}
                                                </div>&nbsp;&nbsp;

                                            </Grid>

                                            <Grid item xs={1} md={1} sm={1} lg={1} justify="flex-end" alignItems="flex-end">
                                                {subItemList.length - 1 === i && <span className={classes.addNewIcon} title='Add New Item' onClick={handleListAddClick} ><img src={AddIcon} /></span>}
                                                {subItemList.length !== 1 && <span className={classes.deleteIcon} title='Delete Item' onClick={() => handleListRemoveClick(i)}><img src={DeleteIcon} /></span>}
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                                <Grid item lg={12} container direction="row">
                                    <Grid item xs={10} md={10} sm={10} lg={10}
                                        container
                                        direction="row"
                                        className={classes.labelAlign}
                                        alignItems="flex-end">

                                    </Grid>
                                    <Grid item xs={10} md={10} sm={10} lg={10} >

                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </Grid>
                    </div>
                    <div className={classes.addRosFooter}>
                        <FormBtn id="save" onClick={savePhyExamItemTemplate} >save</FormBtn>
                        <FormBtn id="reset" onClick={btnAddPhyExamTemplate}> Close </FormBtn>
                    </div>
                </Paper>
            </Popper> */}

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

export default withSnackbar(PhysicalExamDialog)

