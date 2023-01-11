import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
//material ui
import {
    Container,
    Button,
    Grid,
    Switch,
    Tooltip
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import { withSnackbar } from "../../../components/Message/Alert";
import PageTitle from '../../../components/PageTitle';
import { Table, Empty } from 'antd';
import { data as gridCnfg2 } from '../../../components/SearchGrid/component/setupData';
import AddNewAccess from "./component/AddNewAccess";
import { formatDate, formatDateTime2 } from '../../../components/Common/Extensions';
import EditIcon from '../../../images/icons/erase.png';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import Delete from "../../../images/icons/trash.png"
import LogOFF from "../../../images/icons/log-off.svg"
import LogON from "../../../images/icons/log-in.svg"
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { IsEditable } from '../../../Services/GetUserRolesRights';


function EmergencyAccess({ ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("EmergencyAccess"));
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [emergencyAccessList, setEmergencyAccessList] = useState(false);
    const [addListAccess, setAddListAccess] = useState(false);
    const [userPermissionGrid, setUserPermissionGrid] = useState([]);
    const [rowsData, setRowsData] = useState([]);
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

    const deleteAction = (item) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {

            setIsLoading(true);
            PostDataAPI("setup/emergencyaccess/delete", item, true).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    loadGridData();
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            });

        });
        
    }

    const cancelEmergencyAccess = (item) => {
        if (item.currentStatus) {
            item.currentStatus = false;
            setIsLoading(true);
            PostDataAPI("setup/emergencyaccess/update", item, true).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    showMessage("Success", "Emergency access deactivated successfully.", "success", 2000);
                    loadGridData();
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }

            });
        }
        
    }

    const handleSaveResponse = () => {
        showMessage("Success", "Providers/Staffs added in emergency access successfully.", "success", 2000);
        setAddListAccess(false);
        loadGridData();
    }

    useEffect(() => {
        loadGridData();
    }, []);


    const loadGridData = (type) => {
        setIsLoading(true);
        PostDataAPI("setup/emergencyaccess/loadGrid", null).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.emergencyAccessType = item.type
                        item.emergencyAccessName = item.name
                        item.emergencyAccessLocation = item.location
                        item.emergencyAccessEmail = item.email
                        item.emergencyAccessCell = item.cell
                        item.emergencyAccessStatus = item.logId ? (item.deactivationDateTime ? "Deactivated (" + formatDateTime2(item.deactivationDateTime) + " )" : "Activated (" + formatDateTime2(item.activationDateTime)+" )") : ''
                        item.Action = <div>
                            {isEditable ? <><Tooltip title="Deactivate Emergency Access">
                                <img src={item.currentStatus ? LogON : LogOFF} className={classes.logoffIcon} alt="Logoff" onClick={() => { cancelEmergencyAccess(item) }} />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <img src={Delete} className={classes.editIcon} alt="delete" onClick={() => { deleteAction(item) }} />
                            </Tooltip></>: ''}
                        </div>
                        return { ...item }
                    }))
            }
     
         });

    }

    const backToSetup = () => {
        history.push('/app/setup')
    }


    return (
        <>
            <PageTitle title="Emergency Access"  button={
                <Button
                size="small"
                id="btnIdGetPayers"
                className={classes.newAddBtn}
                startIcon={< ArrowBackIosIcon />}
                onClick={backToSetup}
            >
                Back to Setup
            </Button>
            }></PageTitle>


            <Container maxWidth={false}>

                <Grid direction="row" alignItems="baseline">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Button size="small" className={classes.newAddBtn2} disabled={!isEditable } onClick={() => setAddListAccess(true)}>+ Add New </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.textRight}>

                    </Grid>
                </Grid>

                <Grid direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

               
                        <div className="custom-grid">

                            <Table
                                checkStrictly={true}
                                rowClassName={(record, index) => "claimRow"}
                                scroll={true}
                                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                dataSource={rowsData}
                                columns={gridCnfg2["emergencyAccess"]}
                            />

                        </div>
      

                </Grid>

            </Container>

            {addListAccess ?
                <AddNewAccess showHideDialog={emergencyAccessList} handleClose={() => setAddListAccess(false)} handleSaveResponse={handleSaveResponse}></AddNewAccess> : ''}
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
    )
}

export default withSnackbar(EmergencyAccess);