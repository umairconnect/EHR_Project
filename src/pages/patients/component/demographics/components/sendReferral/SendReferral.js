import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
    Button,
    Grid

} from "@material-ui/core"
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../../../components/Message/Alert'
// import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
// import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import NewReferralDialog from "./component/newReferral/NewReferralDialog";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

function SendReferral(props) {
    var classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const handleAddNew = () => {
        setDialogOpenClose(true);
    }
    const [isUpdate, setIsUpdate] = useState(false);
    const handleCloseInsuranceDialog = () => {
        setIsUpdate(!isUpdate)
        setDialogOpenClose(false);
    }
    const [patientId] = useState(props.dataId);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics refferal screen"
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
                        apiUrl="patientrefferal/LoadGrid"
                        dataId={props.dataId}
                        columnCode="SendRefferral"
                        isUpdate={isUpdate}
                        isLink={true}
                    />
                </>
                {
                    dialogOpenClose ? (
                        <NewReferralDialog
                            dialogOpenClose={dialogOpenClose}
                            handleClose={handleCloseInsuranceDialog}
                            isEditable={props.isEditable}
                            patientId={patientId}
                        />
                    ) : ('')
                }
            </div>

        </>
    );
}
export default withSnackbar(SendReferral)