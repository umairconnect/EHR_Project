import React, { useState } from "react";

import { Container, Button } from '@material-ui/core';
// styles
import useStyles from "./styles";
import PageTitle from "../../components/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import PatientDetails from './component/patientDetails';
import PatientInfo from './component/patientInfo/PatientInfo';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IsEditable } from '../../Services/GetUserRolesRights';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import ImportPatientReferral from "./component/importPatientReferral/ImportPatientReferral";

function Patients(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [patientRefferalDialogState, setPatientRefferalDialogState] = new useState(false);

    const [changePage, setChangePage] = new useState(false);
    const [title, setTitle] = useState('Patients');
    const [dataId, setDataId] = useState('');
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    //State For Action Dialog
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
    const addNew = () => {
        setChangePage(true);
        setTitle("Add Patient");
    };
    const backButton = () => {
        setChangePage(false);
        setTitle("Patients");
        setDataId('');
    }
    const getId = dataId => {
        setDataId(dataId);
        setChangePage(true);
        setTitle("Edit Patient");
    }
    const reloadPatient = dataId => {
        setDataId(dataId);
        setChangePage(false);
        setTimeout(function () {
            setChangePage(true)
        }, 50);
        setTitle("Edit Patient");
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this patient?", "confirm", function () {
            var patient = {
                patientId: idToDelete
            }
            PostDataAPI('patient/deletePatient', patient, true).then((result) => {
                if (result.success == true) {

                    showMessage("Success", "Record deleted successfully.", "success", 3000);
                    setIsDeleted(true);
                    handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }

    return (
        <>
            <PageTitle title={title} button={
                changePage ?
                    <Button
                        size="small"
                        id="btnIdGetPatients"
                        className={classes.newAddBtn}
                        onClick={backButton}
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Back to Patient
                    </Button> : ""} />

            {changePage ?
                dataId > 0 ?
                    <PatientDetails dataId={dataId} isEditable={isEditable} />
                    : <PatientInfo dataId={dataId} callbackFn={reloadPatient} />
                : <><Container maxWidth={false} className={classes.positionRelative}>
                    <Button size="small" className={classes.newAddBtn2} onClick={addNew} disabled={!isEditable}>+ Add New </Button>
                    <Button size="small" className={classes.newAddBtn3} onClick={() => setPatientRefferalDialogState(true)} disabled={!isEditable}>Import C-CDA</Button>


                    <SearchGrid
                        dp={true}
                        isUpdate={isUpdate}
                        update={handleUpdate}
                        isSearchAble={false}
                        isCustomSearch={true}
                        isDeleted={isDeleted}
                        columnCode="PatientColumns"
                        searchPanelParams="Patient"
                        // isRowClickAble={true}
                        // rowClick={getId}
                        onEdit={getId}
                        onDelete={handleDelete}
                        apiUrl="patient/loadPatientGrid"
                        filter={filterValues}
                        hideAction={!isEditable}
                     
                    />
                </Container>
                </>
            }
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
            <ImportPatientReferral
                showHideDialog={patientRefferalDialogState}
                handleClose={() => setPatientRefferalDialogState(false)} />
        </>
    );
}
export default withSnackbar(Patients)
