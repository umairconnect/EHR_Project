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


import PageTitle from '../../../components/PageTitle';
import LocationForm from "./component/LocationForm";
import Grid from '../../../components/SearchGrid/Grid';
import SearchGrid from '../../../components/SearchGrid/SearchGrid';
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from '../../../context/StaticDropDowns';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
function Location(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;
    const [locationPage, setLocationPage] = useState(false);
    const [title, setTitle] = useState('Locations');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "Locations" && objRights.permissionCode == UserRoleRights.Editable);
        if (isEditable != null && isEditable.length > 0) {
            setIsEditable(true);
            setIsRoleRightChecked(true);
        }
        else
            setIsRoleRightChecked(true);

    }

    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    // code for role rights access : end

    const addNew = () => {
        setLocationPage(true);
        setIsFormEditable(isEditable);
        setTitle("Add Location");
    };
    const backButton = () => {
        setLocationPage(false);
        setIsFormEditable(isEditable);
        setTitle("Locations");
        setDataId('');
    }
    const getId = dataId => {
        setDataId(dataId);
        setIsFormEditable(isEditable);
        setLocationPage(true);
        setTitle("Edit Location");
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
    function handleDelete(idToDelete) {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this location?", "confirm", function () {
            var state = {
                locationID: idToDelete
            }
            let method = "location/deleteLocation";
            PostDataAPI(method, state, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Location deleted successfully.", "success", 3000);
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
                locationPage ? <Button
                    size="small"
                    id="btnIdGetLocations"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Locations
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
            {locationPage ?
                <Container maxWidth={false}>
                    <LocationForm dataId={dataId} isFormEditable={isFormEditable} />
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
                        columnCode="Location"
                        isRowClickAble={false}
                        // rowClick={getId}
                        hideAction={ !isEditable}
                        onEdit={getId}
                        onDelete={handleDelete}
                        searchPanelParams="Location"
                        apiUrl="location/loadLocationGrid"
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
export default withSnackbar(Location)