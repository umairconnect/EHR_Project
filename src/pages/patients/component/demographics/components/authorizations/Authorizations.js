import React, { useState,useEffect } from "react";
import useStyles from "./styles";
import {
    Button,
    Grid

} from "@material-ui/core"
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import NewAuthorizations from "./component/newAuthorizations/NewAuthorizations";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

function Authorizations(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [update, setUpdate] = useState(false);
    const [insAuthorizationId, setInsAuthorizationId] = useState(0);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    })

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
        setInsAuthorizationId(0);
        setDialogOpenClose(true);
    }
    const handleCloseInsuranceDialog = () => {
        handleUpdate();
        setDialogOpenClose(false);
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        handleUpdate();
        setDialogOpenClose(false);
    }
    const handleEdit = (idToEdit) => {
        setInsAuthorizationId(idToEdit);
        setDialogOpenClose(true);
    }

    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the insurance authorization?", "confirm", function () {

            var data = {
                insuranceAuthorizationId: idToDelete
            }

            PostDataAPI('patient/insurance/authorization/delete', data, true).then((result) => {
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

    const handleUpdate = () => setUpdate(!update);

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics authorization screen"
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
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <Button
                                size="small"
                                className={classes.newAddBtn2}
                                onClick={() => handleAddNew()}
                                disabled={!props.isEditable}
                            >+ Add New
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <span className={classes.title}>Active Authorization</span>
                        </Grid>
                    </Grid>

                    <EditAbleGrid
                        //Title="Immunization(s)"
                        apiUrl="patient/insurance/authorization/loadGrid"
                        columnCode="InsuranceAuthorization"
                        dataId={props.dataId}
                        isUpdate={update}
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <span className={`${classes.title} ${classes.subTitle}`}>Expired Authorization</span>
                        </Grid>
                    </Grid>

                    <EditAbleGrid
                        //Title="Immunization(s)"
                        apiUrl="patient/insurance/authorization/loadGridExpired"
                        columnCode="InsuranceAuthorization"
                        dataId={props.dataId}
                        isUpdate={update}
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </>
                {
                    dialogOpenClose ? (
                        <NewAuthorizations
                            dialogOpenClose={dialogOpenClose}
                            handleClose={handleCloseInsuranceDialog}
                            isEditable={props.isEditable}
                            patientId={props.dataId}
                            insAuthorizationId={insAuthorizationId}
                            handleSuccess={handleDialogSuccess}
                        />
                    ) : ('')
                }
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
export default withSnackbar(Authorizations)