import React, { useState, useEffect } from "react";
import { Grid, InputBase, Tooltip, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import {
    Container,
    Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// styles
import useStyles from "./styles";
import AddUserIcon from "../../../images/icons/add-user.png";
import PenIcon from "../../../images/icons/pen.png"
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';

// components
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import PageTitle from "../../../components/PageTitle";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import NewFormDialog from './components/newFormDialog/NewFormDialog';
import AssignForm from './components/assignForm/AssignForm';
import { Table, Row, Empty } from "antd";
function FormsList({ showMessage, ...props }) {
    const history = useHistory();
    var classes = useStyles();
    const list = [
        {
        formsListId: 0,
        key: 0,
        type: "Admin",
        subType: "Consent",
        documentId: "MCRHS-256",
        title: "EMR- Photography Consent Form / Release",
        description: "patient const regarding usage",
        createDate: "07/22/2022",
        version: "English",
        status: "Active",
        action: "",
    },
        {
            formsListId: 1,
            key: 1,
            type: "Admin",
            subType: "Consent",
            documentId: "MCRHS-256",
            title: "EMR- Photography Consent Form / Release",
            description: "patient const regarding usage",
            createDate: "07/22/2022",
            version: "English",
            status: "Active",
            action: "",
        },
        {
            formsListId: 2,
            key: 2,
            type: "Admin",
            subType: "Consent",
            documentId: "MCRHS-256",
            title: "EMR- Photography Consent Form / Release",
            description: "patient const regarding usage",
            createDate: "07/22/2022",
            version: "English",
            status: "Active",
            action: "",
        },
        {
            formsListId: 3,
            key: 3,
            type: "Admin",
            subType: "Consent",
            documentId: "MCRHS-256",
            title: "EMR- Photography Consent Form / Release",
            description: "patient const regarding usage",
            createDate: "07/22/2022",
            version: "English",
            status: "Active",
            action: "",
        },
    ];
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');

    const [pageFormMode, setPageFormMode] = useState(false);
    const [title, setTitle] = useState('Patient Forms');
    const [dataId, setDataId] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    const [dialogState, setDialogState] = useState(false);
    const [assignFormDialogState, setAssignFormDialogState] = useState(false);

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    //Selection
    const [rowsData, setRowsData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys)
    }
    //Searching
    const handleSearch = (e) => {
        const currValue = e.target.value;
        setValue(currValue);
        if (currValue && currValue != undefined && currValue != null && currValue != "") {
            let filteredData = [...gridData];
            filteredData = filteredData.filter(entry => {
                var hasValue = false;
                for (var prop in entry) {
                    if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                        hasValue = entry[prop]?.toString().toLowerCase().includes(currValue.toLowerCase());
                        if (hasValue)
                            break;
                    }
                }
                return hasValue;
            }
            );
            setRowsData(filteredData);
        } else {
            const filteredData = [...gridData];
            setRowsData(filteredData);
        }
    }
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const openAssginForm = () => {
        setAssignFormDialogState(true)
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    const loadClaimsData = () => {

        setRowsData(
            list?.map((item, i) => {
                item.key = item.claimSuperbillId
                item.action =
                    <Row type="flex" justify="center" align="middle">
                        <img
                            onClick={(e) => { e.stopPropagation(); openAssginForm(); }}
                            className="custom-grid-cell-icon"
                            src={AddUserIcon}
                            alt="ins status"
                        />
                        <Tooltip title="Edit">
                            <img src={PenIcon}
                                className="custom-grid-cell-icon"
                            // onClick={() => handleEdit(item)}
                            />
                        </Tooltip>
                    </Row>
                return { ...item }
            }))
        setGridData(
            list?.map((item, i) => {
                item.key = item.claimSuperbillId
                item.action =
                    <Row type="flex" justify="center" align="middle">
                        <img
                            onClick={(e) => { e.stopPropagation(); openAssginForm(); }}
                            className="custom-grid-cell-icon"
                            src={AddUserIcon}
                            alt="ins status"
                        />
                        <Tooltip title="Edit" onClick={openAssginForm}>
                            <img src={PenIcon}
                                onClick={(e) => { e.stopPropagation(); openAssginForm(); }}
                                // onClick={() => handleEdit(item)}
                                className={classes.Icon} />
                        </Tooltip>
                    </Row>
                return { ...item }
            }))
    }
    useEffect(() => {
        loadClaimsData();
    }, [])

    const addNew = () => {
        setDialogState(true);
    };
    const backButton = () => {
        setDialogState(true);

    }
    const getId = dataId => {
        setDataId(dataId);
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
    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this consent form?", "confirm", function () {
            var state = {
                consentFormID: idToDelete
            }
            PostDataAPI('setup/deleteConsentForm', state, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    // showMessage('error', result.message);
                }
            })
        })
    }

    return (
        <>
            <PageTitle title="Forms List" />
            <Container maxWidth={false} className={classes.positionRelative}>
                <Button
                    size="small"
                    className={classes.newAddBtn2}
                    onClick={addNew}>+ Add New
                </Button>
                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container item justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5} />
                    <Grid container item justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <InputBase
                                id="search"
                                name="search"
                                value={value}
                                placeholder="Search"
                                className="grid-search-input"
                                startAdornment={<SearchIcon />}
                                onChange={handleSearch}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                    <div className={'dp-table'}>

                        <div className="custom-grid">
                            <Table
                                scroll={true}
                                dataSource={rowsData}
                                checkStrictly={true}
                                rowSelection={{
                                    selectedRowKeys: selectedRows,
                                    onChange: onSelectChange
                                }}
                                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                columns={gridCnfg["FormsListColumns"]}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            image={isLoading && LoadingIcon}
                                            description={isLoading ? "Loading..." : "No Record Found"}
                                            imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                        />
                                    )
                                }}

                            />
                            <div className={classes.filterContainer}>
                                <div className={classes.filter}>
                                    <div className={`${classes.icon} ${classes.mandatoryIcon}`}></div>
                                    <Typography className={classes.mandatoryText}>Mandatory</Typography>
                                </div>
                                <div className={classes.filter}>
                                    <div className={`${classes.icon} ${classes.defaultIcon}`}></div>
                                    <Typography className={classes.defaultText}>Assign by default on new patient appointment</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Grid>
            </Container>

            {dialogState && <NewFormDialog
                showHideDialog={dialogState}
                handleClose={() => setDialogState(!dialogState)}
            />}
            {assignFormDialogState && <AssignForm
                showHideDialog={assignFormDialogState}
                handleClose={() => setAssignFormDialogState(!assignFormDialogState)}
            />}

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
    );
}
export default withSnackbar(FormsList)
