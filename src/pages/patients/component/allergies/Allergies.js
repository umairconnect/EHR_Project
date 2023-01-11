import React, { useState, useEffect } from "react";
//import Profile from "../Profile/Profile";
import useStyles from "./styles";
//import { Container } from "@material-ui/core";
import PrintIcon from "../../../../images/icons/PrintIcon.png"
import {
    Button,
    Grid,
    Avatar
} from "@material-ui/core"
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import AllergyForm from "./component/AllergyForm";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

function Allergies(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dataId] = useState(props.dataId);
    const [update, setUpdate] = useState(false);
    const [allergyId, setAllergyId] = useState(0);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [reloadAllergyState, setReloadAllergyState] = useState(true);
    //
    // const [isOpenAllergyFormDialog, setIsOpenAllergyFormDialog] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleFeatureAddedSoon = () => { showMessage("Information", "Feature will be added soon.", "info", 3000); }

    const handleDelete = (idToDelete) => {

        // if (!window.confirm("Are you sure, you want to delete the allergy"))
        //     return;
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the allergy?", "confirm", function () {
            var data = {
                allergyId: idToDelete
            }
            PostDataAPI('patient/allergy/deleteAllergy', data, true).then((result) => {

                if (result.success == true) {
                    handleUpdate();
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        });
    }
    const handleEdit = (idToEdit) => {
        setAllergyId(idToEdit);
        setDialogOpenClose(true);
    }
    const handleAddNew = () => {
        setAllergyId(0);
        setDialogOpenClose(true);
    }
    const handleCloseMedicationForm = () => {
        handleUpdate();
        setDialogOpenClose(false);
    }

    const handleDialogSuccess = (message,_type) => {
        showMessage("Success", message, "success", 3000);
        handleUpdate();
        setDialogOpenClose(false);
    }

    //To Show Action Dialog
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
    //Rerender grid after data update 
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }

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
    useEffect(() => {
        saveAuditLogInfo();
    }, []);
    return (
        <>
            <div className={classes.positionRelative}>
                <>
                    {
                        dialogOpenClose ?
                            (<AllergyForm
                                patientId={dataId}
                                allergyId={allergyId}
                                dialogOpenClose={dialogOpenClose}
                                handleClose={() => handleCloseMedicationForm()}
                                handleSuccess={handleDialogSuccess}
                                isEditable={ isEditable} />)
                            : ('')
                    }

                    <Grid container item direction="row" >
                        <Grid container item direction="row" >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormGroupTitle>Allergies</FormGroupTitle>
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                    disabled={!isEditable}
                                >+ Add New
                                </Button>
                                {/*<Button startIcon={
                                    <Avatar
                                        classes={{ root: classes.btnIconRoot }} vairent="square"
                                        className={classes.BtnIcon} src={PrintIcon}
                                    />}
                                    onClick={handleFeatureAddedSoon}
                                    className={classes.faxButton} >Print
                                </Button>*/}
                                {/* <FormGroupTitle>Allergies</FormGroupTitle> */}
                            </Grid>
                        </Grid>
                        {/* <Grid container item justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>
                        </Grid>
                        <Grid container item justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
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
                    {
                        (reloadAllergyState) ?
                            (
                                <EditAbleGrid
                                    Title="Current Allergies"
                                    apiUrl="patient/allergy/loadActiveAllergyGrid"
                                    isUpdate={update}
                                    dataId={dataId}
                                    columnCode="AllergyColumns"
                                    onAddNew={handleAddNew}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    hideAction={!isEditable}
                                />
                            ) : ('')
                    }
                    {
                        (reloadAllergyState) ?
                            (
                                <EditAbleGrid
                                    Title="Past Allergies"
                                    apiUrl="patient/allergy/loadPastAllergyGrid"
                                    isUpdate={update}
                                    dataId={dataId}
                                    columnCode="AllergyColumns"
                                    onAddNew={handleAddNew}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    hideAction={!isEditable}
                                />
                            ) : ('')
                    }
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
    );
}
export default withSnackbar(Allergies)