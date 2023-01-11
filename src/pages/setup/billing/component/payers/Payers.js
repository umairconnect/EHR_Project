import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Grid as MaterialGrid
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PageTitle from "../../../../../components/PageTitle";
// import Grid from "../../../../../components/SearchGrid/Grid";
import SearchGrid from "../../../../../components/SearchGrid/SearchGrid";
// styles
import useStyles from "./styles";
import { SelectField, CheckboxField } from "../../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../../../components/Message/Alert";
import AddPayer from "./component/addPayer/AddPayer";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { useHistory } from "react-router-dom";
import { IsEditable } from '../../../../../Services/GetUserRolesRights';

function Payers(props) {
    const history = useHistory();
    const StatusOptions = [
        {
            value: "active",
            label: "Active",
        },
        {
            value: "inactive",
            label: "In Active",
        },
    ];
    var classes = useStyles();
    const { showMessage } = props;

    const [title, setTitle] = useState('Payers');
    const [state, setState] = useState({ status: '' });
    const [changePage, setChangePage] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataId, setDataId] = useState('');
    const getId = dataId => {
        setDataId(dataId);
        setChangePage(true);
        setTitle("Edit Payer");
    }
    // code for role rights access : end
    const [restrictPatientInsurance, setRestrictPatientInsurance] = useState(false);
    const handleCheckedChange = e => {
        const { name, checked } = e.target;
        setRestrictPatientInsurance(checked);
        ShowActionDialog(true, "Update Setting", "Are you sure to change this setting?", "confirm", function () {
            PostDataAPI("payer/savePayerSetting", checked).then((result) => {
                if (result.success == true) {
                    if (result.success && result.data != null) {
                        setRestrictPatientInsurance(checked);
                        showMessage("Success", "Setting updated successfully.", "success", 2000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }
            });
        },
            function () {
                setRestrictPatientInsurance(!checked);
                setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
            });

    }
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
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
    const [isEditable, setIsEditable] = useState(IsEditable("Payers"));
    const [rowsCount, setRowsCount] = useState(0);
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const addNew = () => {
        setChangePage(true);
        setTitle("Add Payer");
    };
    const getChangePage = (isChangePage) => {
        setTimeout(() => { setChangePage(isChangePage); }, 2000);

    }
    const backButton = () => {
        setChangePage(false);
        setTitle("Payers");
        setDataId('');
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        handleUpdate();
    };
    useEffect(() => {
        //get Restrict Patient Inusrance flag from settings
        PostDataAPI("payer/getPayerSetting", dataId.dataId ? dataId.dataId : dataId).then((result) => {
            if (result.success && result.data != null) {

                setRestrictPatientInsurance(result.data);
            }
        })
    }, []);
    const handleDelete = (idToDelete) => {

        setChangePage(false);
        var data = {
            payerId: idToDelete
        }
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the payer?", "confirm", function () {

            PostDataAPI('payer/delete', data, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Payer deleted successfully.", "success", 2000);
                    handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        })
    }
    const getRowsCount = (count) => {
        setRowsCount(count);
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
                    Back to Payers
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
                <Container maxWidth={false}>
                    <AddPayer dataId={dataId} getChangePage={getChangePage} updateGrid={handleUpdate} isEditable={isEditable} />
                </Container>
                :
                <>
                    <Container maxWidth={false}>
                        <MaterialGrid container alignItems="flex-start">
                            <MaterialGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <MaterialGrid container justify="flex-start" className={classes.positionRelative}>
                                    {/* <span style={{ display: "flex", flexDirection: "column" }}> */}
                                    <Button
                                        size="small"
                                        className={classes.newAddBtn2}
                                        onClick={addNew}
                                        disabled={!isEditable}
                                    >+ Add New
                                    </Button>
                                    {/* </span> */}
                                    <div className={classes.restCheckBox}>
                                        <CheckboxField
                                            color="primary"
                                            id="restrictPatientInsurance"
                                            name="restrictPatientInsurance"
                                            checked={restrictPatientInsurance}
                                            onChange={handleCheckedChange}
                                            label="Restrict patient insurance to this list"
                                            IsDisabled={!isEditable || rowsCount == 0}
                                        />
                                    </div>
                                </MaterialGrid>

                            </MaterialGrid>
                        </MaterialGrid>
                    </Container>
                    <Container maxWidth={false} className={classes.positionRelative}>
                        <SearchGrid
                            isUpdate={isUpdate}
                            isSearchAble={true}
                            columnCode="PayersColumns"
                            searchPanelParams="PayersColumns"
                            isRowClickAble={false}
                            apiUrl="payer/loadGrid"
                            filter={state}
                            onEdit={getId}
                            onDelete={handleDelete}
                            hideAction={!isEditable}
                            rowsCount={(count) => { getRowsCount(count) }}
                        />
                    </Container>
                </>
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

export default withSnackbar(Payers)
