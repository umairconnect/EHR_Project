import React, { useState } from "react";
import {
    Container,
    //FormHelperText,
    Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PageTitle from "../../../../../components/PageTitle";
import EditAbleGrid from "../../../../../components/SearchGrid/component/EditAbleGrid";
// styles
import useStyles from "./styles";
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../../../components/Message/Alert";
import { PostDataAPI } from '../../../../../Services/APIService';//PutDataAPI
import NewBillingProfile from "./component/addBillingProfile/NewBillingProfile";
import { useHistory } from "react-router-dom";
import { IsEditable } from '../../../../../Services/GetUserRolesRights';
function BillingProfiles(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;

    const [isEditable, setIsEditable] = useState(IsEditable("BillingProfiles"));
    const [dataId, setDataId] = useState('');
    const [pageTitle, setPageTitle] = useState('Custom Billing Profiles');
    const [billingProfilePage, setBillingProfilePage] = useState(false);
    const [update, setUpdate] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
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
    const getId = dataId => {
        setDataId(dataId);
    }

    const handleEdit = (idToEdit) => {
        setDataId(idToEdit);
        setPageTitle("Edit Billing Profile");
        setBillingProfilePage(true);
    }
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }
    const handleDelete = (idToDelete) => {
        const data = { billingProfileId: idToDelete };
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete billing profile?", "confirm", function () {
            setIsDeleting(true);
            PostDataAPI('billing/profile/delete', data, true).then((result) => {
                setIsDeleting(false);
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();
                    if (document.getElementById('btnSearchGrid'))
                        setTimeout(() => { document.getElementById('btnSearchGrid').click(); }, 1000);
                }
                else {
                    showMessage("Error", "Selected billing profile is in use and cannot be deleted.", "error", 3000);
                }
            });
        });
    }
    const addNew = () => {
        setBillingProfilePage(true);
        // setIsFormEditable(isEditable);
        setPageTitle("Add Billing Profile");
    };
    const backButton = () => {
        setDataId(0);
        handleUpdate();
        setBillingProfilePage(false);
        // setIsFormEditable(isEditable);
        setPageTitle("Custom Billing Profiles");
    }

    return (
        <>
            <PageTitle title={pageTitle} button={
                billingProfilePage ? <Button
                    size="small"
                    id='btnSearchGrid'
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Billing Profiles
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

            {billingProfilePage ? <Container maxWidth={false}>

                <NewBillingProfile
                    dataId={dataId}
                    handleDelete={handleDelete}
                    isDeleting={isDeleting}
                    isEditable={isEditable}
                />

            </Container>
                :
                <Container maxWidth={false} className={classes.positionRelative}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                        disabled={ !isEditable}
                    >+ Add New
                    </Button>
                    <EditAbleGrid
                        code="CustomBillingProfilesColumns"
                        isUpdate={update}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isSearchAble={true}
                        columnCode="CustomBillingProfilesColumns"
                        searchPanelParams="CustomBillingProfilesColumns"
                        rowClick={getId}
                        apiUrl="billing/profile/loadGrid"
                        hideAction={ !isEditable}
                        ActionAlign={'right'}
                    />

                </Container>
            }
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

export default withSnackbar(BillingProfiles)
