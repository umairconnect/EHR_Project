import React, { useState, useEffect } from "react";
//import Profile from "../Profile/Profile";
import useStyles from "./styles";
//import { Container } from "@material-ui/core";
import PrintIcon from "../../../../images/icons/PrintIcon.png"
import {
    Button,
    //Typography,
    Grid,
    Avatar
} from "@material-ui/core"
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import ImmunizationForm from "./component/ImmunizationForm";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

function Immunizations(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dataId] = useState(props.dataId);
    const [update, setUpdate] = useState(false);
    const [imunizationId, setImunizationId] = useState(0);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient immunization details"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Immunization?", "confirm", function () {
            var data = {
                imunizationId: idToDelete
            }

            PostDataAPI('patient/imunization/delete', data, true).then((result) => {

                if (result.success == true) {
                    handleUpdate();
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        });
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
    const handleEdit = (idToEdit) => {
        setImunizationId(idToEdit);
        setDialogOpenClose(true);
    }
    const handleAddNew = () => {
        setImunizationId(0);
        setDialogOpenClose(true);
    }
    const handleCloseImmunizationForm = () => {
        handleUpdate();
        setDialogOpenClose(false);
    }
    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        handleUpdate();
        setDialogOpenClose(false);
    }
    //Rerender grid after data update 
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }
    const handleFeatureAddedSoon = () => { showMessage("Information", "Feature will be added soon.", "info", 3000); }
    useEffect(() => {
        console.log(props)
        saveAuditLogInfo();
    }, []);
    return (
        <>


            <div className={classes.positionRelative}>
                <>
                    {
                        dialogOpenClose ? (
                            <ImmunizationForm
                                patientId={dataId}
                                imunizationId={imunizationId}
                                dialogOpenClose={dialogOpenClose}
                                handleClose={handleCloseImmunizationForm}
                                handleSuccess={handleDialogSuccess}
                                isEditable={ isEditable}
                            />
                        ) : ('')
                    }
                    <Grid container direction="row" >
                        <Grid container direction="row" justifyContent="flex-start">
                            {/* <FormGroupTitle>Immunizations</FormGroupTitle> */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormGroupTitle>Immunization(s)</FormGroupTitle>
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                    disabled={!isEditable}
                                >+ Add New
                                </Button>
                                {/*<Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                    src={PrintIcon} />}
                                    onClick={handleFeatureAddedSoon} className={classes.faxButton} >
                                    Print</Button>*/}
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
                        // Title="Immunization(s)"
                        apiUrl="patient/imunization/getPatientImunizations"
                        isLink={true}
                        dataId={dataId}
                        columnCode="ImunizationColumns"
                        isUpdate={update}
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        hideAction={!isEditable}
                    />

                </>
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
export default withSnackbar(Immunizations)