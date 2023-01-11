import React, { useState, useEffect } from "react";
//material ui
import {
    Container,
    Button,
    Tab,
    FormHelperText,
    Tabs,
    FormLabel,
    Typography,
    Grid
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

//custom components
import PageTitle from '../../../components/PageTitle';
import { InputBaseField, RadioboxField, SelectField } from '../../../components/InputField/InputField';
import { FormGroupTitle, Label, ShadowBox, FormBtn } from '../../../components/UiElements/UiElements';
import EditAbleGrid from '../../../components/SearchGrid/component/EditAbleGrid';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import AddNewTemplates from './components/addNewTemplate/AddNewTemplate';
import { GetUserInfo } from '../../../Services/GetUserInfo';
//styles
import useStyles from "./styles";
import { withSnackbar } from "../../../components/Message/Alert";
import { IsEditable } from '../../../Services/GetUserRolesRights';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            // style={{
            //     width: "330px", height: "440px", margin: "0px", backgroundColor: "#FFFFFF",
            //     borderRadius: "0px", overflow: "auto"
            // }}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
//
function ChartNotesTemplates(props) {

    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("ChartNotesTemplates"));
    const history = useHistory();
    var classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const [isAddNewBtnDisabled, setIsAddNewBtnDisabled] = useState(false);
    const [errorMessageStates, setErrorMessageStates] = useState({
        errorPredefinedPunctuationAndSpacing: false
    })

    let userID = JSON.parse(GetUserInfo()).user.loggedInUserID;
    const punctuationAndApacingOptions = [
        { label: 'Predefined punctuation and spacing:', value: "predefinedPunctuationAndSpacing" },
        { label: 'Custom:', value: "customPunctuationAndSpacing" },
    ];

    const newLineOptions = [
        { label: 'Do not add a new line', value: "noline" },
        { label: 'Add a new line', value: "oneline" },
        { label: 'Add a double new line', value: "twoline" },
    ];

    const options = [
        { label: 'Comma and space', value: "comma_space" },
        { label: 'Period', value: "period" },
        { label: 'Period and space', value: "period_space" },
        { label: 'Space', value: "space" },
        { label: 'Nothing', value: "no" },
    ];
    //
    const [tabvalue, setTabValue] = useState(0);

    const [title, setTitle] = useState("Chart Notes Templates");
    const [isUpdate, setIsUpdate] = useState(false);
    const [changePage, setChangePage] = useState(false);
    const [dataId, setDataId] = useState(0);
    const [state, setState] = useState({
        punctuationAndSpacing: "predefinedPunctuationAndSpacing",
        customPunctuationAndSpacing: "",
        predefinedPunctuationAndSpacing: "",
        newLine: "doNotAddNewLine"
    });


    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue == 1) {
            setIsAddNewBtnDisabled(true);
        } else {
            setIsAddNewBtnDisabled(false);
        }

    };

    const radioChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
             predefinedPunctuationAndSpacing: "",
             customPunctuationAndSpacing: "",
             [name]: value,
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    };


    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    const addNew = () => {
        setChangePage(true);
    };
    const backButton = () => {
        setChangePage(false);
        setDataId(0);
        setTitle("Chart Notes Templates");
    }
    const getId = dataId => {

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
    function handleDelete(item, action) {

        if (action != null && action === "fav") {
            addToFavorite(item);
        } else if (action === "edit") {
            setDataId(item);
            setChangePage(true);
        }
        else if (action === "share") {
            PostDataAPI("itemTemplate/shareItemTemplate", item, true).then((result) => {
                if (result.success && result.data != null) {
                    showMessage("Success", "Template shared successfully.", "success", 2000);
                    handleUpdate();
                }
                else {
                    if (result.message == "Item template already exist") {
                        var template1 = item;
                        var template2 = result.data;
                        let params = {
                            "template1": template1.itemTemplateId+"",
                            "template2": template2.itemTemplateId+"",
                        }
                        ShowActionDialog(true, "Share", "Template with name [" + template2.itemTitle + "] already exist, Are you sure you want to update it?", "confirm", function () {
                            PostDataAPI("itemTemplate/shareUpdateItemTemplate", params, true).then((result) =>
                            {
                                showMessage("Success", "Template updated successfully.", "success", 2000);
                                handleUpdate();
                            })
                        });

                    } else {
                        showMessage("Error", result.message, "error", 3000);
                    }
                    
                }
            })
            console.log(item);
        }
        else {
            ShowActionDialog(true, "Delete", "Are you sure, you want to delete the chart notes template?", "confirm", function () {

                PostDataAPI('itemTemplate/deleteItemTemplate', item, true).then((result) => {

                    if (result.success == true) {
                        showMessage("Success", "Record deleted successfully.", "success", 2000);
                        handleUpdate();
                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                    }
                })

            });
        }

    }

    const addToFavorite = (item) => {

        let encData = {
            ProviderTemplateId: 0,
            ItemTemplateId: item.itemTemplateId,
        }

        PostDataAPI("itemTemplate/addEditProviderTemplate", encData, true).then((result) => {
            if (result.success && result.data != null) {
                handleUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const closeAddNewTemplageComponent = () => {
        setDataId(0);
        setChangePage(false);

    }

    const onSaveTemplateSetting = () => {
        
        let errorList = []
        console.log(state);
        var _isCustomSetting = true;
        if (state.punctuationAndSpacing != null && state.punctuationAndSpacing === "predefinedPunctuationAndSpacing")
            _isCustomSetting = false;

        if (!_isCustomSetting && (state.predefinedPunctuationAndSpacing === undefined || state.predefinedPunctuationAndSpacing === "")) {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorPredefinedPunctuationAndSpacing: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorPredefinedPunctuationAndSpacing: false
            }));
        }

        if (_isCustomSetting && (state.customPunctuationAndSpacing === undefined || state.customPunctuationAndSpacing === "")) {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorCustomPunctuationAndSpacing: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessageStates(prevState => ({
                ...prevState,
                errorCustomPunctuationAndSpacing: false
            }));
        }

        if (errorList.length < 1) {
            let method = "userchartnotetempsetting/add";
            var params = {
                userId: parseInt(userID),
                isCustomSetting: _isCustomSetting,
                customSettingString: state.customPunctuationAndSpacing,
                predefinedSettingCode: state.predefinedPunctuationAndSpacing,
                addNewLineCode: state.newLine

            }
            setIsSaving(true);
            PostDataAPI(method, params, true).then((result) => {
                setIsSaving(false);
                if (result.success == true && result.data != null) {
                    showMessage("Success", "Data saved successfully.", "success", 3000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });
        }


    }
    const loadTemplateSettings = () => {
        let method = "userchartnotetempsetting/loadGrid";
        PostDataAPI(method, true).then((result) => {
            setIsSaving(false);
            if (result.success == true && result.data != null) {

                if (result.data != null && result.data.length > 0) {
                    setState(prevState => ({
                        ...prevState,
                        newLine: result.data[0].addNewLineCode,
                        punctuationAndSpacing: result.data[0].isCustomSetting ? "customPunctuationAndSpacing" : "predefinedPunctuationAndSpacing",
                        customPunctuationAndSpacing: result.data[0].customSettingString,
                        predefinedPunctuationAndSpacing: result.data[0].predefinedSettingCode
                    }))
                }
            }
        });
    }
    useEffect(() => {
      
        setDataId(0);
        loadTemplateSettings();
    }, []);

    return (
        <>
            <PageTitle title={title} button={
                changePage ?
                    <Button
                        size="small"
                        id="btnBackToProvider"
                        className={classes.newAddBtn}
                        onClick={backButton}
                        startIcon={< ArrowBackIosIcon />}> Back to Chart Notes </Button>
                    :
                    <Button
                        size="small"
                        id="btnIdGetPayers"
                        className={classes.newAddBtn}
                        onClick={() => { history.goBack(); }}
                        startIcon={< ArrowBackIosIcon />}>Back to Setup</Button>} />
            {changePage ?
                <Container maxWidth={false}>
                    <AddNewTemplates tabSelected={tabvalue} handleClose={closeAddNewTemplageComponent} dataId={dataId} isEditable={ isEditable} />
                </Container>
                :
                <Container maxWidth={false} className={classes.positionRelative}>
                    {isAddNewBtnDisabled ? <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                        disabled={!isEditable}
                    >+ Add New
                    </Button>:'' }
                    

                    <Tabs
                        classes={{ root: classes.tabRoot }}
                        value={tabvalue}
                        onChange={onTabChange}
                        aria-label="icon tabs example"
                        className={classes.Htabs}
                    >
                        <Tab label="Templates Library" aria-label="templatesLibrary" {...a11yProps(0)} />
                        <Tab label="My Templates" aria-label="myTemplates" {...a11yProps(1)} />
                        <Tab label="Templates Setting" aria-label="templatesSettings" {...a11yProps(2)} />
                    </Tabs>
                    <div className={classes.tabPanel}>
                        <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                            {tabvalue == 0 ?
                                <EditAbleGrid
                                    pageCount={10}
                                    isUpdate={isUpdate}
                                    isSearchAble={true}
                                    isChartNoteTemplate={true}
                                    columnCode="ChartNotesTemplate"
                                    apiUrl="itemTemplate/loadChartNotesTemplateGrid"
                                    code="ChartNotesTemplate"
                                    dataId={'0'}
                                    onEdit={getId}
                                    onDelete={handleDelete}
                                    searchPanelParams="ChartNotesTemplateColumns"
                                    getSelectedRows={(keys) => getSelection(keys)}
                                    rowClick={getId}
                                    hideAction={!isEditable}
                                /> : null}
                        </TabPanel>
                        <TabPanel value={tabvalue} index={1}>
                            {tabvalue == 1 ?
                                <EditAbleGrid
                                    pageCount={10}
                                    // isSelection={true}
                                    isUpdate={isUpdate}
                                    isSearchAble={true}
                                    isChartNoteTemplate={true}
                                    columnCode="ChartNotesTemplate"
                                    apiUrl="itemTemplate/loadChartNotesTemplateGrid"
                                    code="ChartNotesTemplate"
                                    dataId={userID}
                                    onEdit={getId}
                                    onDelete={handleDelete}
                                    searchPanelParams="ChartNotesTemplateColumns"
                                    getSelectedRows={(keys) => getSelection(keys)}
                                    rowClick={getId}
                                    hideAction={!isEditable}
                                /> : null}
                        </TabPanel>
                        <TabPanel value={tabvalue} index={2}>
                            {tabvalue == 2 ?
                                <div>
                                    <div className={classes.innerContainer}>

                                        <FormGroupTitle>Templates Setting</FormGroupTitle>

                                        <div className={classes.content}>
                                            <FormLabel className={classes.subTitle}>Template item formatting:</FormLabel>

                                            <Typography className={classes.noteText}> After selecting a template item when writing your note. select the <strong>punctuation and spacing</strong> to be added:</Typography>

                                            <Grid container direction="row">

                                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                                    <RadioboxField
                                                        id="punctuationAndSpacing"
                                                        name="punctuationAndSpacing"
                                                        value={state.punctuationAndSpacing}
                                                        labelPlacement="end"
                                                        onChange={radioChange}
                                                        options={punctuationAndApacingOptions}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                                    <Grid container direction="column">
                                                        <Grid item xs={12} md={12} sm={12} lg={12} >
                                                            <SelectField
                                                                id="predefinedPunctuationAndSpacing"
                                                                name="predefinedPunctuationAndSpacing"
                                                                placeholder="Select"
                                                                value={state.predefinedPunctuationAndSpacing}
                                                                onChange={handleChange}
                                                                Disabled={state.punctuationAndSpacing != 'predefinedPunctuationAndSpacing'}
                                                                options={options}
                                                            />
                                                            {state.punctuationAndSpacing == 'predefinedPunctuationAndSpacing' && errorMessageStates.errorPredefinedPunctuationAndSpacing && (!state.predefinedPunctuationAndSpacing || state.predefinedPunctuationAndSpacing.trim() == "") ?
                                                                (<FormHelperText style={{ color: "red" }} > Please select Predefined punctuation and spacing</FormHelperText>)
                                                                : ('')
                                                            }
                                                        </Grid>

                                                        <Grid item xs={12} md={12} sm={12} lg={12} >

                                                            <InputBaseField
                                                                id="customPunctuationAndSpacing"
                                                                name="customPunctuationAndSpacing"
                                                                value={state.punctuationAndSpacing != 'customPunctuationAndSpacing'? '': state.customPunctuationAndSpacing}
                                                                onChange={handleChange}
                                                                placeholder="Enter custom punctuation and spacing"
                                                                IsDisabled={state.punctuationAndSpacing != 'customPunctuationAndSpacing'}
                                                            />
                                                            {state.punctuationAndSpacing == 'customPunctuationAndSpacing' && errorMessageStates.errorCustomPunctuationAndSpacing &&
                                                                (!state.customPunctuationAndSpacing || state.customPunctuationAndSpacing.trim() == "") ?
                                                                (<FormHelperText style={{ color: "red" }} > Please enter Custom punctuation and spacing</FormHelperText>)
                                                                : ('')
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                            <Typography className={classes.noteText}> After the punctuation is added. select if there should be a <strong>new line</strong> added:</Typography>

                                            <Grid container direction="row">

                                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                                    <RadioboxField
                                                        id="newLine"
                                                        name="newLine"
                                                        value={state.newLine}
                                                        labelPlacement="end"
                                                        onChange={handleChange}
                                                        options={newLineOptions}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <FormLabel className={classes.subTitle}>Example template items with formatting:</FormLabel>

                                            <div style={{ display: state.newLine == 'noline' ? 'flex' : 'block' }}>
                                                <Typography style={{ lineHeight: state.newLine == 'oneline' ? '5px' : '20px' }} className={classes.noteText}>This is template item one.</Typography>
                                                <Typography style={{ lineHeight: state.newLine == 'oneline' ? '0px' : '20px' }} className={classes.noteText}>This is template item two. </Typography>
                                            </div>


                                        </div>

                                    </div>
                                    <div className={classes.footer}>
                                        <Grid container direction="row">
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                                {
                                                    isSaving ?
                                                        <FormBtn id="loadingSave"> Save</FormBtn>
                                                        :
                                                        <FormBtn id="save" disabled={!isEditable} onClick={onSaveTemplateSetting}>Save</FormBtn>
                                                }
                                            </Grid>
                                        </Grid>

                                    </div>

                                </div> : null}
                        </TabPanel>
                    </div>
                </Container >
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
    )
}

export default withSnackbar(ChartNotesTemplates)