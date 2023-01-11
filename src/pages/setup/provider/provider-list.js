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
import ProviderForm from "./component/ProviderForm";
//import SearchPanel from "../../../components/FilterSearch";
// import Grid from "../../../components/SearchGrid/Grid";
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { UserRoleRights } from "../../../context/StaticDropDowns";
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";

function ProviderList(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;
    const [providerPage, setProviderPage] = useState(false);
    const [title, setTitle] = useState('Providers');
    const [dataId, setDataId] = useState('');

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "Providers" && objRights.permissionCode == UserRoleRights.Editable);
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

    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    // code for role rights access : end
    const addNew = () => {
        setProviderPage(true);
        setIsFormEditable(isEditable);
        setTitle("Add Provider");
    };
    const backButton = () => {
        setProviderPage(false);
        setIsFormEditable(isEditable);
        setTitle("Providers");
        setDataId('');
    }
    const getId = dataId => {

        setDataId(dataId);
        setIsFormEditable(isEditable);
        setProviderPage(true);
        setTitle("Edit Provider");
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
        ShowActionDialog(false, "Delete", "Are you sure, you want to delete this provider?", "confirm", function () {
            var data = {
                userID: idToDelete
            };
            PostDataAPI('user/deleteProvider', data, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Provider deleted successfully.", "success", 2000);
                    setIsDeleted(true);

                    handleUpdate();
                    // setDataId(0);

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
                providerPage ? <Button
                    size="small"
                    id="btnBackToProvider"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Provider
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
            {providerPage ?
                <Container maxWidth={false}>
                    <ProviderForm dataId={dataId} isFormEditable={isFormEditable} />
                </Container>
                :
                <Container maxWidth={false} className={classes.positionRelative}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                        disabled={!isEditable}
                    >+ Add New
                    </Button>
                    <SearchGrid
                        dp={true}
                        isUpdate={isUpdate}
                        isSearchAble={false}
                        isCustomSearch={true}
                        isDeleted={isDeleted}
                        columnCode="Provider"
                        searchPanelParams="Provider"
                        isRowClickAble={false}
                        // rowClick={getId} 
                        hideAction={!isEditable}
                        onEdit={getId}
                        onDelete={handleDelete}
                        apiUrl="user/loadProviderGrid"
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
export default withSnackbar(ProviderList)
