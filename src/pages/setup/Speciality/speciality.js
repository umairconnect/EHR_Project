import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    Container,
    Button
} from '@material-ui/core';

// styles
import useStyles from "./styles";

// components


import PageTitle from "../../../components/PageTitle";
import SpecialityForm from "./component/specialityForm";
// import Grid from "../../../components/SearchGrid/Grid";
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from "../../../context/StaticDropDowns";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
function Speciality(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;

    const [SpecializationPage, setSpecializationPage] = useState(false);
    const [title, setTitle] = useState('Specialization(s)');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {
        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "Specialization" && objRights.permissionCode == UserRoleRights.Editable);
        if (isEditable != null && isEditable.length > 0) {
            setIsEditable(true);
            setIsRoleRightChecked(true);
        }
        else
            setIsRoleRightChecked(true);

    }
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
    // code for role rights access : end

    const addNew = () => {
        setSpecializationPage(true);
        setIsFormEditable(isEditable);
        setTitle("Add Specialization");
    };

    const backButton = () => {
        setSpecializationPage(false);
        setIsFormEditable(isEditable);
        setTitle("Specialization(s)");
        setDataId('');
    }

    const getId = dataId => {
        setDataId(dataId);
        setIsFormEditable(isEditable);
        setSpecializationPage(true);
        setTitle("Edit Specialization");
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this speciality?", "confirm", function () {
            var state = {
                specializationID: idToDelete
            }
            PostDataAPI('setup/deleteSpecialization', state, true).then((result) => {

                if (result.success == true) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);

                    handleUpdate();

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    // showMessage('error', result.message);
                }
            })
        })
    }
    return (
        <>
            <PageTitle title={title} button={
                SpecializationPage ? <Button
                    size="small"
                    id='btnSearchGrid'
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Specializations(s)
                </Button> : <Button
                    size="small"
                    id="btnIdGetPayers"
                    className={classes.newAddBtn}
                    onClick={() => {
                        history.goBack();
                    }}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Setup
                </Button>
            } />
            {SpecializationPage ?
                <Container maxWidth={false}>
                    <SpecialityForm dataId={dataId} isFormEditable={isFormEditable} />

                </Container>
                :
                <Container maxWidth={false} className={classes.positionRelative}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                        disabled={!isEditable}>+ Add New
                    </Button>
                    <SearchGrid
                        isUpdate={isUpdate}
                        isSearchAble={true}
                        columnCode="Specialization"
                        searchPanelParams="Specialization"
                        isRowClickAble={false}
                        hideAction={!isEditable}
                        // rowClick={getId}
                        onEdit={getId}
                        onDelete={handleDelete}
                        apiUrl="setup/loadSpecializationGrid"
                        filter={filterValues}
                    />
                    {/* <Grid code="Specialization" rowClick={getId} apiUrl="setup/loadSpecializationGrid" /> */}

                </Container>
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
export default withSnackbar(Speciality)

