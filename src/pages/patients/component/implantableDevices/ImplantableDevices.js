import React, { useState, useEffect } from 'react';

import {
    Grid,
    Button
} from "@material-ui/core";

//custom imports
import { withSnackbar } from "../../../../components/Message/Alert";
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";

import AddImplantableDevice from "./components/addImplantableDevice/AddImplantableDevice";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

import useStyles from "./styles";
function ImplantableDevices(props) {

    const classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    //states
    const { showMessage } = props;
    const [dataId] = useState(props.dataId);
    const [update, setUpdate] = useState(false);
    const [patEquipId, setPatEquipId] = useState(0);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    //functions

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

    const handleAddNew = () => {
        setPatEquipId(0);
        setDialogOpenClose(true);
    }

    const handleEdit = (idToEdit) => {
        setPatEquipId(idToEdit);
        setDialogOpenClose(true);
    }

    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the implanted device?", "confirm", function () {

            var data = {
                patientMedicalEquipmentId: idToDelete
            }

            PostDataAPI('patient/medicalEquipment/delete', data, true).then((result) => {
                setDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        });
    }

    const handleCloseImplantableForm = () => {
        handleUpdate();
        setDialogOpenClose(false);
    }
    //Rerender grid after data update 
    const handleUpdate = () => setUpdate(!update);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient medical equipment screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    useEffect(() => {
        saveAuditLogInfo()
    }, []);
    return (
        <>
            <div className={classes.positionRelative}>

                {
                    dialogOpenClose ?
                        <AddImplantableDevice
                            showHideDialog={dialogOpenClose}
                            handleClose={handleCloseImplantableForm}
                            patientId={dataId}
                            dataId={patEquipId}
                        />
                        : ""
                }
                <Grid container direction="row" >
                    <Grid container direction="row" justifyContent="flex-start">
                        <FormGroupTitle>Implantable Devices</FormGroupTitle>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {/* <FormGroupTitle>Implantable Devices</FormGroupTitle> */}
                            <Button
                                size="small"
                                className={classes.newAddBtn2}
                                onClick={() => handleAddNew()}
                                disabled={!isEditable}
                            >+ Add New
                            </Button>
                            {/* <Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                    className={classes.BtnIcon} src={PrintIcon} />}
                                    onClick={handleFeatureAddedSoon} className={classes.faxButton} >
                                    Print</Button> */}
                        </Grid>
                    </Grid>
                    {/* <Grid container justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}></Grid>
                        <Grid container justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                            <>
                                <Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                    className={classes.BtnIcon} src={PrintIcon} />}
                                    onClick={handleFeatureAddedSoon} className={classes.faxButton} />
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                >+ Add New
                                </Button>
                            </>

                        </Grid> */}
                </Grid>

                <EditAbleGrid
                    Title="Implanted Devices"
                    apiUrl="patient/medicalEquipment/loadGrid"
                    dataId={dataId}
                    columnCode="ImplantableDevices"
                    isUpdate={update}
                    onAddNew={handleAddNew}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    hideAction={!isEditable}
                />

            </div>
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

export default withSnackbar(ImplantableDevices)