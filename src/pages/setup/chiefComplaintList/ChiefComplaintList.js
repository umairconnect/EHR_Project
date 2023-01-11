import React, { useState } from "react";
import {
    Container,
    FormHelperText,
    Button,
    CircularProgress,
    Grid as MaterialGrid
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PageTitle from "../../../components/PageTitle";
import EditAbleGrid from "../../../components/SearchGrid/component/EditAbleGrid";
// styles
import useStyles from "./styles";
import { InputBaseField } from "../../../components/InputField/InputField";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../components/Message/Alert";
import { PostDataAPI, PutDataAPI } from '../../../Services/APIService';
import { useHistory } from "react-router-dom";
import { FormBtn } from "../../../components/UiElements/UiElements";
import { IsEditable } from '../../../Services/GetUserRolesRights';

function ChiefComplaintList(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;


    const [dataId, setDataId] = useState('');
    const [update, setUpdate] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [state, setState] = useState({ chiefComplaintId: 0, name: "", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0 });
    const [chiefComplaintList, setChiefComplaintList] = useState("");
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [functionCall, setFunctionCall] = useState("Add");

    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const [isEditable, setIsEditable] = useState(IsEditable("ChiefComplaintList"));
   
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        //setChiefComplaintList(value);
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

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
    const getId = dataId => {
        setDataId(dataId);
    }

    const onAddNewClick = () => {
        setShowInput("");
        setShowInput(false);
    }
    const handleEdit = (idToEdit) => {

        setFunctionCall("Update");
        getCheifComplaints(idToEdit, 1);
        setShowInput(true);
    }
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }
    const handleDelete = (idToDelete) => {

        getCheifComplaints(idToDelete, 2);
    }

    const clearValues = () => {

        setState({

            chiefComplaintId: 0, name: "", createDate: "", isDeleted: false, createdBy: 0, updatedBy: 0

        });

    }

    const saveMangeChiefComplaint = () => {

        if (state.name === null || state.name == "" || state.name.trim().length === 0) {

            showMessage("Error", "Please enter chief complaint.", "error", 3000);
            return;
        }

        setIsSaveCall(true);

        state.createDate = state.createDate == "" ? new Date().toISOString() : state.createDate;

        let method = "setup/addChiefComplaints";

        if (state.chiefComplaintId > 0) {

            method = "setup/updateChiefComplaints";

        }
        setIsSaveLoading(true);
        PostDataAPI(method, state, true).then((result) => {
            setIsSaveLoading(false);

            if (result.success == true) {


                if (state.chiefComplaintId < 1) {

                    if (result.success === true && result.data != null) {

                        showMessage("Success", "Chief complaint saved successfully.", "success", 3000);
                        setShowInput(false);
                        clearValues();
                        onAddNewClick();
                        handleUpdate();
                        setFunctionCall("Add");


                    }
                }
                else if (state.chiefComplaintId > 0) {

                    if (result.success) {

                        showMessage("Success", "Chief complaint updated successfully.", "success", 3000);
                        clearValues();
                        onAddNewClick();
                        handleUpdate();
                        setFunctionCall("Add");


                    }
                }

            }
            else {

                setIsSaveCall(false);
                showMessage("Error", result.message, "error", 3000);

            }
        })

        setIsSaveCall(false);


    }

    function getCheifComplaints(id, callOrder) {

        PostDataAPI("setup/getChiefComplaints", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {

                if (callOrder === 2) {
                    if (result.data.encounterId > 0)
                        showMessage("Error", "Chief complaint is used in encounter and can not be deleted.", "error", 3000);
                    else
                        deleteCheifComplaints(result.data);

                }
                else
                    setState(result.data);

            }
        })

    }

    function deleteCheifComplaints(dataSet) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete chief complaint?", "confirm", function () {

            dataSet.createDate = dataSet.createDate == "" ? new Date().toISOString() : dataSet.createDate;

            PostDataAPI('setup/deleteChiefComplaints', dataSet, true).then((result) => {

                if (result.success == true) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();
                    setShowInput(false);
                    clearValues();
                    setFunctionCall("Add");
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });
    }
    const handleCancel = () => {
        setShowInput(false);
        clearValues();
    }
    return (
        <>
            <PageTitle title="Chief Complaint List"
                button={
                    <Button
                        size="small"
                        id="btnIdGetPayers"
                        className={classes.newAddBtn}
                        onClick={() => {
                            history.goBack();
                        }}
                        startIcon={< ArrowBackIosIcon />}
                    >
                        Back to Setup
                    </Button>}
            />

            <Container maxWidth={false} className={classes.positionRelative}>
                <MaterialGrid container direction="row" justify="flex-start" alignItems="center">
                    <MaterialGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {
                            //isEditable &&
                            showInput ?
                                <div className={classes.inputSpan}>
                                    <InputBaseField
                                        name="name"
                                        value={state.name}
                                        placeholder="Chief Complaint"
                                        onChange={handleChange}
                                        MaxLength="250"
                                        disabled={!isEditable}
                                    />
                                    {isSaveLoading ?
                                        <FormBtn
                                            btnType="loadingSave"
                                            id="loadingSave"
                                            size={"medium"}
                                        >{functionCall}
                                        </FormBtn> :
                                        <FormBtn
                                            btnType="loadingSave"
                                            id="save"
                                            size={"medium"}
                                            onClick={saveMangeChiefComplaint}
                                            disabled={!isEditable}
                                        >{functionCall}
                                        </FormBtn>
                                    }
                                    <FormBtn
                                        id="reset"
                                        size={"medium"}
                                        onClick={handleCancel}
                                    >Cancel
                                    </FormBtn>
                                </div>
                                :
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => setShowInput(true)}
                                    disabled={!isEditable}
                                >+ Add New
                                </Button>
                        }
                    </MaterialGrid>
                </MaterialGrid>
                <EditAbleGrid
                    code="ChiefComplaintListColumns"
                    dp="true"
                    isUpdate={update}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isSearchAble={true}
                    hideAction={!isEditable}
                    columnCode="ChiefComplaintListColumns"
                    searchPanelParams="ChiefComplaintListColumns"
                    rowClick={getId}
                    apiUrl="setup/loadChiefComplaintsGrid"
                />
                
            </Container>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )
}

export default withSnackbar(ChiefComplaintList)
