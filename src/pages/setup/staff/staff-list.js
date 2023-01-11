import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Container,
    Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// styles
import useStyles from "./styles";

// components


import PageTitle from "../../../components/PageTitle";
import StaffForm from "./component/StaffForm";
// import Grid from "../../../components/SearchGrid/Grid";
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from "../../../context/StaticDropDowns";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
function StaffList(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;
    const [StaffPage, setStaffPage] = useState(false);
    const [title, setTitle] = useState('Staff');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    const [isDeleted, setIsDeleted] = useState(false);
    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "Staff" && objRights.permissionCode == UserRoleRights.Editable);
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
    // code for role rights access : end
    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    const addNew = () => {
        setStaffPage(true);
        setIsFormEditable(isEditable);
        setTitle("Add Staff");
    };
    const backButton = () => {
        setStaffPage(false);
        setIsFormEditable(isEditable);
        setTitle("Staff");
        setDataId('');
    }
    const getId = dataId => {
        setDataId(dataId);
        setIsFormEditable(isEditable);
        setStaffPage(true);
        setTitle("Edit Staff");
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
    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this staff?", "confirm", function () {
            var state = {
                userID: idToDelete
            }
            PostDataAPI('user/deleteStaff', state, true).then((result) => {
                ;

                if (result.success == true) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    setIsDeleted(true);

                    handleUpdate();
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
                StaffPage ? <Button
                    size="small"
                    id="btnBackToStaff"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Staff
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

            {StaffPage ?
                <Container maxWidth={false}>
                    <StaffForm dataId={dataId} isFormEditable={isFormEditable} />
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
                        dp={true}
                        isUpdate={isUpdate}
                        isSearchAble={false}
                        isCustomSearch={true}
                        isDeleted={isDeleted}
                        columnCode="Staff"
                        searchPanelParams="Staff"
                        isRowClickAble={false}
                        // rowClick={getId}
                        onEdit={getId}
                        hideAction={!isEditable}
                        onDelete={handleDelete}
                        apiUrl="user/loadStaffGrid"
                        filter={filterValues}
                    />

                    {/* <Grid code="Staff" dp="true" searchPanelParams="Staff" rowClick={getId} apiUrl="user/loadStaffGrid" /> */}
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
export default withSnackbar(StaffList)

