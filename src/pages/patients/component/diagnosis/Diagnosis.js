import React, { useState, useEffect } from "react";
import useStyles from "./styles";
//import PrintIcon from "../../../../images/icons/PrintIcon.png"
import {
    Button,
    Typography,
    Grid,

} from "@material-ui/core"
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid"
import DiagnosisForm from './components/DiagnosisForm'
import { withSnackbar } from '../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { GetMaxFileSize } from "../../../../Services/GetConfiguration";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

function Diagnosis(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [patientId] = useState(props.dataId);
    const [diagnosisId, setDiagnosisId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);



    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });


    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm", function () {
            var data = {
                diagnosisId: idToDelete
            }
            PostDataAPI('patient/diagnosis/delete', data, true).then((result) => {

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
        setDiagnosisId(idToEdit);
        setDialogOpenClose(true);
    }
    const handleAddNew = (idToAdd) => {
        setDiagnosisId(idToAdd);
        setDialogOpenClose(true);
    }
    const handleCloseDiagnossisForm = () => {
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

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: patientId,
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
                        dialogOpenClose ? (<DiagnosisForm patientId={patientId} diagnosisId={diagnosisId} updatedData={handleUpdate} dialogOpenClose={dialogOpenClose}
                            handleClose={handleCloseDiagnossisForm} handleSuccess={handleDialogSuccess} isEditable={isEditable} />)
                            : ('')
                    }
                    <Grid container direction="row" >
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                {/* <FormGroupTitle>Diagnosis</FormGroupTitle> */}
                                <FormGroupTitle>Diagnosis</FormGroupTitle>
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                    disabled={!isEditable}
                                >+ Add New
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <Grid container item justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>

                            <Typography className={classes.title}></Typography>

                        </Grid>
                        <Grid container item justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                            <> */}
                        {/* <Button startIcon={<Avatar classes={{root:classes.btnIconRoot}} vairent="square"
                                    className={classes.BtnIcon} src={PrintIcon}/>} onClick={() => handleEdit(1)} className={classes.faxButton}/> */}
                        {/* <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={() => handleAddNew()}
                                >+ Add New
                                </Button>
                            </>

                        </Grid> */}
                    </Grid>

                    <EditAbleGrid
                        Title="Active Diagnosis"
                        apiUrl="patient/diagnosis/getActiveDiagnosis"
                        isUpdate={update}
                        dataId={patientId}
                        columnCode="DiagnosisColumns"
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        hideAction={ !isEditable}
                    />

                    <EditAbleGrid
                        Title="Past Diagnosis"
                        apiUrl="patient/diagnosis/getPastDiagnosis"
                        isUpdate={update} dataId={patientId}
                        columnCode="DiagnosisColumns"
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
    );
}
export default withSnackbar(Diagnosis)