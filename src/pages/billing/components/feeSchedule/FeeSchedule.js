import React, { useState } from "react";

//material ui
// import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Button } from "@material-ui/core"
// components
import PageTitle from "../../../../components/PageTitle";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// styles
import useStyles from "./styles";
import AddFeeSchedule from "./components/addFeeSchedule/AddFeeSchedule";
import EditAbleGrid from "../../../../components/SearchGrid/component/EditAbleGrid";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import { withSnackbar } from "../../../../components/Message/Alert";
import { useHistory } from "react-router-dom";
import { IsEditable } from '../../../../Services/GetUserRolesRights';
function FeeSchedule(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;
    const [dataId, setDataId] = useState(0);
    const [isMasterFee, setIsMasterFee] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [feeSchedule, setFeeSchedule] = useState("Add Fee Schedule");
    const [isEditable, setIsEditable] = useState(IsEditable("FeeSchedule"));
    const [title, setTitle] = useState('Contracts and Fees');
    const [changePage, setChangePage] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const handleDelete = (id) => {

        var data = {
            feeScheduleId: id ? parseInt(id) : 0
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the fee schedule?", "confirm", function () {
            setDeleteLoading(true);
            PostDataAPI('feeschedule/delete', data, true).then((result) => {
                setDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    gridUpdate();
                    //cleanValuesFields();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })


    }
    const handleEdit = (idToEdit) => {
        setDataId(idToEdit);
        setFeeSchedule('Edit Fee Schedule');
        setChangePage(true)
    }
    const handleAddNew = () => {
        CheckMasterFeeScheduleExists();
        //setFeeSchedule('Add Fee Schedule');
        //setChangePage(true);
        //setDataId(0);
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
    const gridUpdate = () => setUpdate(!update);

    const backButton = () => {
        setChangePage(false);
        setTitle("Contracts and Fees");
        setDataId('');
    }
    const CheckMasterFeeScheduleExists = () => {
        PostDataAPI('feeschedule/checkMasterFeeScheduleExists').then((result) => {
            if (result.success && result.data != null) {
                if (result.data == true) {
                    setFeeSchedule('Add Fee Schedule');
                    setIsMasterFee(false);
                    setChangePage(true);
                    setDataId(0);

                }
                else {
                    //showMessage("Warning", "Please add master fee schedule first", "warning", 2000);
                    ShowActionDialog(true, "Master Fee Schedule", "Please add master fee schedule for the year " + new Date().getFullYear(), "confirm", function () {
                        setFeeSchedule('Add Master Fee Schedule');
                        setIsMasterFee(true);
                        setChangePage(true);
                        setDataId(0);
                    });
                }
            }
            else
                showMessage("Error", result.message, "error", 3000);
        })
    }

    return (
        <>
            <PageTitle title={title} button={
                changePage ? <Button
                    size="small"
                    id="btnIdGetPayers"
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Contracts and Fees
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
                </Button>} />

            {changePage ?
                <AddFeeSchedule
                    handleClose={backButton}
                    showHideDialog={changePage}
                    feeScheduleLabel={feeSchedule}
                    dataId={dataId}
                    updateGrid={gridUpdate}
                    isEditable={isEditable}
                    isMasterFeeSchedule={isMasterFee}
                />
                :
                <Container maxWidth={false} className={classes.positionRelative}>

                    <div style={{ minHeight: "45px" }}>
                        <Button
                            size="small"
                            className={classes.newAddBtn2}
                            onClick={() => handleAddNew()}
                            disabled={!isEditable}
                        >+ Add New
                        </Button>
                    </div>
                    <EditAbleGrid
                        apiUrl="feeschedule/loadGrid"
                        isUpdate={update}
                        dataId={dataId}
                        columnCode="FeeScheduleColumns"
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        hideAction={!isEditable}
                        isSearchAble={true}
                    />

                </Container>
            }
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
export default withSnackbar(FeeSchedule)