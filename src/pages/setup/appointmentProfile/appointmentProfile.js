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
import AppointmentProfileForm from "./component/AppointmentProfileForm";
// import Grid from "../../../components/SearchGrid/Grid";
import SearchGrid from "../../../components/SearchGrid/SearchGrid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from "../../../context/StaticDropDowns";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
function AppointmentProfile(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;


    const [appointmentProfilePage, setAppointmentProfilePage] = useState(false);
    const [title, setTitle] = useState('Appointment Profiles');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

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
    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "AppointmentProfiles" && objRights.permissionCode == UserRoleRights.Editable);
        if (isEditable != null && isEditable.length > 0) {
            setIsEditable(true);
            setIsRoleRightChecked(true);
        }
        else
            setIsRoleRightChecked(true);

    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    // code for role rights access : end

    const addNew = () => {
        setAppointmentProfilePage(true);
        setIsFormEditable(isEditable);
        setTitle("Add Appointment Profile");
    };
    const backButton = () => {
        setAppointmentProfilePage(false);
        setIsFormEditable(isEditable);
        setTitle("Appointment Profiles");
        setDataId('');
    }
    const getId = dataId => {
        setDataId(dataId);
        setIsFormEditable(isEditable);
        setAppointmentProfilePage(true);
        setTitle("Edit Appointment Profile");
    }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this appointment profile?", "confirm", function () {
            var state = {
                appointmentProfileID: idToDelete
            }
            PostDataAPI('setup/deleteAppointmentProfile', state, true).then((result) => {

                if (result.success == true) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();

                }
                else {
                    //alert(result.message);
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }
    return (
        <>
            <PageTitle title={title} button={
                appointmentProfilePage ? <Button
                    size="small"
                    id='btnSearchGrid'
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Appointment Profiles
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
            {appointmentProfilePage ?
                <Container maxWidth={false}>
                    <AppointmentProfileForm dataId={dataId} isFormEditable={isFormEditable} />

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
                        columnCode="AppointmentProfile"
                        searchPanelParams="AppointmentProfile"
                        isRowClickAble={false}
                        // rowClick={getId}
                        hideAction={ !isEditable}
                        onEdit={getId}
                        onDelete={handleDelete}
                        apiUrl="setup/loadAppointmentProfileGrid"
                        filter={filterValues}
                    />

                    {/* <Grid code="AppointmentProfile" rowClick={getId} apiUrl="setup/loadAppointmentProfileGrid" /> */}

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
export default withSnackbar(AppointmentProfile)
