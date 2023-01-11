import React, { useState } from "react";
//import Profile from "../Profile/Profile";
import useStyles from "./styles";
//import { Container } from "@material-ui/core";
import PrintIcon from "../../../../images/icons/PrintIcon.png"
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Button,
    Typography,
    Grid,
    Avatar
} from "@material-ui/core"
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid"
import MedicationForm from "./component/MedicationForm"
import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import MedicationViewModal from './component/MedicationViewDialog'
import { IsEditable } from '../../../../Services/GetUserRolesRights';

function Medication(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dataId, setDataId] = useState(props.dataId);
    const [medicationId, setMedicationId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [reloadMedicationState, setReloadMedicationState] = useState(true);
    const [reloadMedicationSurescripsts, setReloadMedicationSurescripsts] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [viewMedicationDialog, setViewMedicationDialog] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleFeatureAddedSoon = () => { showMessage("Information", "Feature will be added soon.", "info", 3000); }

    const printPatientMedPrescriptions = () => {
        var reportUrl = "%2freports%2fclinical%2fclinical_patient_prescription&rs:Command=Render&rc:Parameters=false";
        var _patientId = "&patient_id=" + props.dataId;
        var _parameters = _patientId;
        //printReport(reportUrl, _parameters);
    }

    const openViewMedication = () => {
        setViewMedicationDialog(true);
    }

    const closeViewMedication = () => {
        setViewMedicationDialog(false);
    }

    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the medication?", "confirm", function () {
            var data = {
                medicationId: idToDelete
            }
            PostDataAPI('patient/medication/deleteMedication', data, true).then((result) => {

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
        setIsEdit(true);
        setMedicationId(idToEdit);
        setDialogOpenClose(true);
    }
    const ViewModal = (idToView) => {
        setMedicationId(idToView);
        setViewMedicationDialog(true)
    }
    const handleAddNew = () => {
        setMedicationId(0);
        setDialogOpenClose(true);
        setIsEdit(false)
    }
    const handleCloseMedicationForm = () => {
        handleUpdate();
        setDialogOpenClose(false);
    }
    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        handleUpdate();
        setDialogOpenClose(false);
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
    //Rerender grid after data update 
    const handleUpdate = () => {
        setUpdate(update ? false : true);
    }
    return (
        <>
            <div className={classes.positionRelative}>
                <>
                    {
                        dialogOpenClose ? (<MedicationForm
                            patientId={dataId}
                            medicationId={medicationId}
                            dialogOpenClose={dialogOpenClose}
                            handleClose={handleCloseMedicationForm}
                            isEdit={isEdit} handleSuccess={handleDialogSuccess}
                            isEditable={ isEditable}                        />)
                            : ('')
                    }

                    {viewMedicationDialog ?
                        <MedicationViewModal
                            patientId={dataId}
                            medicationId={medicationId}
                            openViewMedication={openViewMedication}
                            closeViewMedication={closeViewMedication}
                            isEditable={isEditable}
                        />
                        : ''}

                    <Grid container direction="row" >
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormGroupTitle>Medication</FormGroupTitle>
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                    disabled={!isEditable}
                                >+ Add New
                                </Button>

                                {/* <Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                    className={classes.BtnIcon} src={PrintIcon} />}
                                    onClick={printPatientMedPrescriptions} className={classes.faxButton} >Print
                                </Button> */}
                                
                            </Grid>
                            {/* <FormGroupTitle>Medication</FormGroupTitle> */}
                        </Grid>
                        {/* <Grid container justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>
                        </Grid>
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
                    {
                        (reloadMedicationState) ?
                            (
                                <EditAbleGrid
                                    Title="Active Medication Orders"
                                    apiUrl="patient/medication/loadActiveMedicationGrid"
                                    isUpdate={update} dataId={dataId}
                                    columnCode="MedicationColumns"
                                    onAddNew={handleAddNew}
                                    onEdit={handleEdit}
                                    medicationId={dataId}
                                    onDelete={handleDelete}
                                    onView={ViewModal}
                                    hideAction={!isEditable} />
                            ) : (<>
                                <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                                <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                                    <div style={{ paddingTop: '27%' }} />
                                </Skeleton>
                            </ >)
                    }
                    {
                        (reloadMedicationState) ?
                            (
                                <EditAbleGrid
                                    Title="Past Medication Orders"
                                    apiUrl="patient/medication/loadPastMedicationGrid"
                                    isUpdate={update}
                                    dataId={dataId}
                                    columnCode="MedicationColumns"
                                    onAddNew={handleAddNew}
                                    onEdit={handleEdit} onDelete={handleDelete} onView={ViewModal}
                                    hideAction={ !isEditable}
                                />
                            ) : ('')
                    }

                    {
                        (reloadMedicationSurescripsts) ?
                            (
                                <EditAbleGrid
                                    Title="Medication History via Surescripts"
                                    dataId={dataId}
                                    apiUrl="patient/medication/loadMedicationSurescripts"
                                    columnCode="MedicareHistorySurescripts"
                                    onDelete={handleDelete}
                                    hideAction={!isEditable} />
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
export default withSnackbar(Medication)