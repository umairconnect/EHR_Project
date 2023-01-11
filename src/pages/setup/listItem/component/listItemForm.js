import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    Dialog
} from '@material-ui/core';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';

import { InputBaseField } from "../../../../components/InputField/InputField";
import { DraggableComponent, FormGroupTitle, ErrorMessage, Label, FormBtn } from "../../../../components/UiElements";

//import { AlertMessage, } from "../../../../components/Message/Message";
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import CloseIcon from "../../../../images/icons/math-plus.png"
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function ListItemForm({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState(props.dataId);
    const [isFormEditable] = useState(props.isFormEditable);
    //console.log("Provider form edit checking " + isFormEditable);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, setState] = useState({

        listTypeId: dataId, listType: "", name: "", code: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
    });

    const [errorMessages, setErrorMessages] = useState({ errorCode: false, errorname: false })

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        clear();
    }, [showHideDialog]);

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.dataId),
            area: "List item setup",
            activity: "List item form details",
            details: "User viewed List item form screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const setFormState = () => {

        if (props.dataId > 0 || props.dataId != "") {
            setState({
                listTypeId: props.dataId, listType: props.listType, name: "", code: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
            });
            loadData();
            saveAuditLogInfo(); 
        }
        else {

            setState({
                listTypeId: 0, listType: props.listType, name: "", code: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0
            });
        }
    }

    const loadData = () => {
        var params = {
            listTypeId: props.dataId
        }
        setIsLoaded(false);
        PostDataAPI("setup/listview/Get", params).then((result) => {
            if (result.success && result.data != null) {
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
            setIsLoaded(true);
        })

    }
    const clear = () => {
        setFormState();
        setErrorMessages({ errorcode: false, errorname: false });
    }

    const chancel = () => {
        handleClose();
    }
    const deleteRecord = () => {

        setIsDeleteLoading(true);
        PostDataAPI('setup/listview/DeleteListItem', state, true).then((result) => {
            setIsDeleteLoading(false);

            if (result.success == true) {
                setErrorMessages([]);

                showMessage("Success", "Record deleted successfully.", "success", 2000);
                setDataId(0);
                handleClose();

            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const save = () => {

        let hasError = false;
        if (!state.name || state.name.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorname: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorname: false
            }));
        }
        if (!state.code || state.name.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorcode: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorcode: false
            }));
        }
        if (hasError == false) {
            let method = "setup/listview/add";
            if (props.dataId > 0)
                method = "setup/listview/update";

            setIsSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Record saved successfully.", "success", 3000);
                    if (dataId < 1) {
                        handleClose();
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    };


    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                onClose={handleClose}
                open={showHideDialog}>
                <div className={classes.DialogContent}>
                    <Grid container >
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        {props.dataId <= 0 ? <FormGroupTitle>Add Item</FormGroupTitle> : <FormGroupTitle>Update List Item</FormGroupTitle>}

                        <Grid item lg={12} container direction="row">

                            <Label title="Code" size={4} mandatory={true} />

                            <Grid item xs={12} sm={12} md={7} lg={7} >
                                <InputBaseField
                                    placeholder="Enter Code"
                                    onChange={handleChange}
                                    name="code"
                                    IsDisabled={props.dataId > 0 ? true : false}
                                    value={state.code}
                                    MaxLength='50'
                                />
                                {errorMessages.errorcode && (!state.code || state.code.trim() == "") ? (<ErrorMessage >
                                    Please enter code
                                </ErrorMessage>) : ('')}
                            </Grid>

                        </Grid>
                        <Grid item lg={12} container direction="row">



                            <Label title="Name" size={4} mandatory={true} />
                            <Grid item xs={12} sm={12} md={7} lg={7} >
                                <InputBaseField

                                    placeholder="Enter Name"
                                    onChange={handleChange}
                                    name="name"
                                    value={state.name}
                                    MaxLength='50'
                                // inputProps={{ ref: input => specialityFormRef.nameRef = input }}
                                />
                                {errorMessages.errorname && (!state.name || state.name.trim() == "") ? (<ErrorMessage >
                                    Please enter name
                                </ErrorMessage>) : ('')}
                            </Grid>


                        </Grid>
                        <Grid item lg={12}
                            container
                            direction="row">
                            <Grid item xs={12} sm={4} md={4} lg={4}
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end">
                            </Grid>
                            <ActionDialog
                                title={actiondialogprops.actiondialogtitle}
                                message={actiondialogprops.actiondialogmessage}
                                type={actiondialogprops.actiondialogtype}
                                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                                onSubmit={deleteRecord}
                                onCancel={() => setActionDialogProps(prevState => ({
                                    ...prevState,
                                    actiondialogstate: false,
                                }))
                                }
                            />
                            {/* Press Ok to continue and Cancel to stay on the screen. */}
                            <Grid item lg={8} style={{ marginTop: "10px" }}>

                                {
                                    isSaveLoading ?
                                        <FormBtn id="loadingSave" size="medium">
                                            Save
                                        </FormBtn>
                                        : <FormBtn id="save" onClick={save} size="medium" disabled={!isFormEditable}>
                                            Save
                                        </FormBtn>
                                }

                                {
                                    props.dataId != 0 && props.isRestricted != "True" && !state.isSysGen && isLoaded?
                                        isDeleteLoading ?
                                            <FormBtn id="loadingDelete" size="medium">
                                                Delete
                                            </FormBtn> : <FormBtn id="delete" onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete the record? ", "confirm")} size="medium" disabled={!isFormEditable}>
                                                Delete
                                            </FormBtn>
                                        : null
                                }
                                <Button className={classes.resetBtn} onClick={chancel} size="medium" >Cancel </Button>
                                {/*<Button className={classes.resetBtn} onClick={clear} size="medium" >Reset </Button>*/}
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            </Dialog>
        </>
    );
}

export default withSnackbar(ListItemForm)
