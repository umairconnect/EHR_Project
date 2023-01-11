import React, { useState } from "react";

import {
    Container,
    Button
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// styles
import useStyles from "./styles";

// components


import PageTitle from "../../../components/PageTitle";
import Roles from "./component/RolesPermissionForm";
// import SearchPanel from "../../../components/FilterSearch";
// import Grid from "../../../components/SearchGrid/Grid";
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from "../../../context/StaticDropDowns";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
function ConsentForm(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;

    const [pageFormMode, setPageFormMode] = useState(false);
    const [title, setTitle] = useState('Roles');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "UserRoles" && objRights.permissionCode == UserRoleRights.Editable);
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
        setPageFormMode(true);
        setIsFormEditable(isEditable);
        setTitle("Add New Role");
    };
    const backButton = () => {
        setPageFormMode(false);
        setIsFormEditable(isEditable);
        setTitle("Roles");
        setDataId('');
    }
    const getId = dataId => {
        setDataId(dataId);
        setPageFormMode(true);
        setIsFormEditable(isEditable);
        setTitle("Edit Role");
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this role?", "confirm", function () {
            var role = {
                roleID: idToDelete
            }
            PostDataAPI('role/DeleteRole', role, true).then((result) => {

                if (result.success == true) {
                    if (result.data === 1) {
                        showMessage("success", "Record deleted successfully.", "success", 3000);

                        handleUpdate();
                    }
                    else if (result.data === 2)
                        showMessage("Error", "Selected role is in use cannot be deleted.", "error", 3000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }
    return (
        <>
            <PageTitle title={title} button={
                pageFormMode ? <Button
                    size="small"
                    id="btnSearchGrid"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Role List
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
            {pageFormMode ?
                <Container maxWidth={false}>
                    <Roles dataId={dataId} isFormEditable={isFormEditable} />

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
                        columnCode="UserRoles"
                        searchPanelParams="UserRoles"
                        isRowClickAble={false}
                        hideAction={!isEditable}
                        // rowClick={getId}
                        onEdit={getId}
                        onDelete={handleDelete}
                        apiUrl="role/loadRolesGrid"
                        filter={filterValues}
                    />
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

export default withSnackbar(ConsentForm)

