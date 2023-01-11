import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Container } from "@material-ui/core";
import PrintIcon from "../../../../../../images/icons/PrintIcon.png"
import {
    Button,
    Typography,
    Grid,
    Avatar
} from "@material-ui/core"
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import NewInsuranceDialog from "./component/newInsurance/NewInsuranceDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

function Insurance(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [patientId] = useState(props.dataId);
    const [update, setUpdate] = useState(false);
    const [insuranceId, setInsuranceId] = useState(0);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const getId = insuranceId => {
        setInsuranceId(insuranceId);
    }
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let method = "insurance/delete";
            setDeleteLoading(true);
            PostDataAPI(method, {
                patientInsuranceId: idToDelete,
                patientId: patientId
            }, true).then((result) => {
                setDeleteLoading(false);
                if (result.success == true) {

                    showMessage("Success", "Insurance deleted successfully.", "success", 3000);
                    setTimeout(() => { handleCloseInsuranceDialog(); }, 200);
                    //handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setDialogOpenClose(false);
                }

            })
        });
    }
    const handleEdit = (idToEdit) => {
        setInsuranceId(idToEdit);
        setDialogOpenClose(true);
    }
    const handleAddNew = () => {
        setInsuranceId(0);
        setDialogOpenClose(true);
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
    const handleCloseInsuranceDialog = () => {
        setDialogOpenClose(false);
        handleUpdate();
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: patientId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics insurance screen"
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
                    <EditAbleGrid
                        apiUrl="insurance/loadGrid"
                        isUpdate={update}
                        dataId={patientId}
                        columnCode="InsuranceColumns"
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        rowClick={getId}
                        isLink={true}
                    />
                </>
                {
                    dialogOpenClose ? (
                        <NewInsuranceDialog
                            patientId={patientId}
                            dataId={insuranceId}
                            dialogOpenClose={dialogOpenClose}
                            handleClose={handleCloseInsuranceDialog}
                            handleDelete={handleDelete}
                            deleteLoading={deleteLoading}
                            isEditable={props.isEditable}
                            openEligibilityId={props.dataId}
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
export default withSnackbar(Insurance)