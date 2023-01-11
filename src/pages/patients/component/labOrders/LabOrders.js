import React, { useState, useEffect } from "react"
import { MDBDataTable } from 'mdbreact';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import useStyles from './styles'
import { Skeleton } from "@material-ui/lab";
import Erase from "../../../../images/icons/erase.png"
import Delete from "../../../../images/icons/trash.png"
import PrintIcon from "../../../../images/icons/PrintIcon.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withSnackbar } from '../../../../components/Message/Alert'
import {printReport } from '../../../../components/Common/Extensions';
import {
    // Icon,
    // Typography,
    Grid,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
    ButtonGroup,
    Avatar,
    Button,
    Tooltip
} from "@material-ui/core"
import "./style.css";
import { SelectField } from "../../../../components/InputField/InputField";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import NewLabOrderForm from "./components/newLabOrder/NewLabOrderForm"
import ManualResultForm from "./components/resultForm/ManualResultForm";
import { Table, Empty } from "antd";
import { IsEditable } from '../../../../Services/GetUserRolesRights';

import "../../../../components/antd.css";
import "../../../../components/SearchGrid/antStyle.css";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
function LabOrders(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const labOrderColumsData = [
        {
            title: '',
            dataIndex: 'labOrderId',
            className: "width270",
            className: "custom-grid-hide-col",
        },
        {
            title: 'Lab',
            dataIndex: 'lab',
            className: "width150",
            sorter: (a, b) => {
                a = a.lab != null ? a.lab.toString() : "";
                b = b.lab != null ? b.lab.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Test',
            dataIndex: 'labTest',
            className: "width270",
            sorter: (a, b) => {
                a = a.labTest != null ? a.labTest.toString() : "";
                b = b.labTest != null ? b.labTest.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Lab Ref #',
            dataIndex: 'labRefNumber',
            className: "width100",
            sorter: (a, b) => {
                a = a.labRefNumber != null ? a.labRefNumber.toString() : "";
                b = b.labRefNumber != null ? b.labRefNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ordered By',
            dataIndex: 'orderByProvider',
            className: "width150",
            sorter: (a, b) => {
                a = a.orderByProvider != null ? a.orderByProvider.toString() : "";
                b = b.orderByProvider != null ? b.orderByProvider.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            className: "width100",
            sorter: (a, b) => {
                a = a.orderDate != null ? a.orderDate.toString() : "";
                b = b.orderDate != null ? b.orderDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            className: "width100",
            sorter: (a, b) => {
                a = a.orderStatus != null ? a.orderStatus.toString() : "";
                b = b.orderStatus != null ? b.orderStatus.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Interpretation',
        //    dataIndex: 'interpretation',
        //    className:"width100",
        //},
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        },

    ];
    const imagingOrderColumsData = [
        {
            title: '',
            dataIndex: 'labOrderId',
            className: "width270",
            className: "custom-grid-hide-col",
        },
        {
            title: 'Lab',
            dataIndex: 'lab',
            className: "width150",
            sorter: (a, b) => {
                a = a.lab != null ? a.lab.toString() : "";
                b = b.lab != null ? b.lab.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Study',
            dataIndex: 'labTest',
            className: "width270",
            sorter: (a, b) => {
                a = a.labTest != null ? a.labTest.toString() : "";
                b = b.labTest != null ? b.labTest.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Order #',
            dataIndex: 'labRefNumber',
            className: "width100",
            sorter: (a, b) => {
                a = a.labRefNumber != null ? a.labRefNumber.toString() : "";
                b = b.labRefNumber != null ? b.labRefNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ordered By',
            dataIndex: 'orderByProvider',
            className: "width150",
            sorter: (a, b) => {
                a = a.orderByProvider != null ? a.orderByProvider.toString() : "";
                b = b.orderByProvider != null ? b.orderByProvider.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            className: "width100",
            sorter: (a, b) => {
                a = a.orderDate != null ? a.orderDate.toString() : "";
                b = b.orderDate != null ? b.orderDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            className: "width100",
            sorter: (a, b) => {
                a = a.orderStatus != null ? a.orderStatus.toString() : "";
                b = b.orderStatus != null ? b.orderStatus.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Interpretation',
        //    dataIndex: 'interpretation',
        //    className:"width100",
        //},
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        },

    ];
    //Grid//
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [rowsData, setRowsData] = useState([]);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [arrChecked] = useState([]);
    const [dataId] = useState(props.dataId);
    const [state, setState] = useState({});
    //const [labOrderStatus, setLabOrderStatus] = useState([]);
    //State For Sign Dialog
    const [labOrderId, setLabOrderId] = useState(0);
    const [labOrderTestId, setLabOrderTestId] = useState(0);
    const [update, setUpdate] = useState(false);
    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [labOrderDialog, setLabOrderDialog] = useState(false);
    const [showhidemanualResultDialog, setShowHideManualResultDialog] = useState(false);
    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;
    //const [isEditable] = useState(userdata.isProvider ? true : ());
    const [isEditable] = useState(props.isImaginOrder == true ? IsEditable("imaging") : IsEditable("lab"));
    const [isPatientEditable, setIsPatientEditable] = useState(IsEditable("Patients"));
    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleRowAction = (e) => {

        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };
    const handleAction = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        handleFeatureAddedSoon();
        //onActionclick(dropDownActionId, e.currentTarget.dataset.id);
    }
    const labOrderStatus = [
        { value: "Pending", label: "Pending" }
    ];
    const handleFeatureAddedSoon = () => { showMessage("Information", "Feature will be added soon.", "info", 3000); }

    const handleDelete = (idToDelete, isLabResultExists) => {

        if (isLabResultExists) {
            showMessage("Warning", "Cannot delete, Lab Order Result already added against it.", "warning", 3000);
            return;
        }

        let alertMsg = "";
        if (props.isImaginOrder === true)
            alertMsg = "Are you sure, you want to delete the Study Order?";
        else
            alertMsg = "Are you sure, you want to delete the Lab Order?";

        ShowActionDialog(true, "Delete", alertMsg, "confirm", function () {

            var data = {
                labOrderId: idToDelete
            }
            PostDataAPI("patient/labOrder/delete", data, true).then((result) => {

                if (result.success) {

                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }

            })

        });
    }

    const printLabOrder = (labOrderid) => {
        var reportUrl = "%2freports%2fclinical%2fclinical_lab_order&rs:Command=Render&rc:Parameters=false";
        var _labOrderId = "&lab_order=" + labOrderid;
        var _parameters = _labOrderId;
        printReport(reportUrl, _parameters);
    }

    const handleEdit = (idToEdit, labTestId) => {

        setLabOrderId(idToEdit);
        setLabOrderTestId(labTestId);
        setLabOrderDialog(true);

    }
    const handleAddNew = () => {
        setLabOrderId(0);
        setLabOrderTestId(0);
        setLabOrderDialog(true);
    }
    const handleCloseNewOrderLabForm = () => {
        handleUpdate();
        setLabOrderDialog(false);
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
    const loadData = () => {

        setIsLoading(true);
        var data = {
            patientId: dataId ? parseInt(dataId) : null,
            isElab: props.isImaginOrder,
            patientEncounterId: null //props.encounterId ? parseInt(props.encounterId) : null
        }

        PostDataAPI("patient/labOrder/getPatientLabOrderGrid", data).then((result) => {
            setIsLoading(false);
            if (result.success) {

                setRowsData(
                    result.data.map((item, i) => {

                        item.action = <div style={{ width: "50%" }}>
                                <Tooltip title="Print">
                                    <span><img src={PrintIcon} alt="print" className={classes.imgBtnIcon} onClick={() => printLabOrder(item.labOrderId)} /></span>
                                </Tooltip>
                                {isEditable ?
                                    <Tooltip title="Edit">
                                         <span><img src={Erase} alt="edit" className={classes.imgBtnIcon} onClick={() => handleEdit(item.labOrderId, item.labTestId)} /></span>  
                                    </Tooltip>
                                 : ''}
                                {isEditable ?
                                     <Tooltip title="Delete">
                                        <span><img src={Delete} alt="delete" className={classes.imgBtnIcon} onClick={() => handleDelete(item.labOrderId, item.isLabResultExists)} /></span>  
                                     </Tooltip>
                                    : ''}
                        </div>
                        return { ...item }
                    }));
            }

        });

    };

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient lab order details"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        let isEdit = props.isImaginOrder == true ? IsEditable("imaging") : IsEditable("lab");
        console.log(userInfo);
        debugger;
        saveAuditLogInfo();
        loadData();
    }, [update])

    const tableData = {
        columns: props.isImaginOrder === true ? imagingOrderColumsData : labOrderColumsData,
        rows: rowsData,
    };
    return (
        <>
            <ManualResultForm
                dialogOpenClose={showhidemanualResultDialog} handleClose={() => setShowHideManualResultDialog(false)}
                isEditable={ isEditable}            />
            <NewLabOrderForm
                imagingOrder={props.isImaginOrder}
                dataId={dataId}
                labOrderId={labOrderId}
                labOrderTestId={labOrderTestId}
                encounterId={props.encounterId}
                showHideDialog={labOrderDialog}
                handleClose={handleCloseNewOrderLabForm}
                isEditable={isEditable}            />
            {/*<Popper style={{ zIndex: 900 }} id={id} open={open} anchorEl={anchorEl} role={undefined}>
                <Paper>
                    <ClickAwayListener onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem data-id="manualResults" onClick={handleAction}>Manual Results</MenuItem>
                            <MenuItem data-id="signReports" onClick={handleAction}>Sign Reports</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>*/}
            <Grid container lg={12}>
                <Grid container direction="row" >
                    <FormGroupTitle>{props.isImaginOrder ? "Imaging Orders" : "Lab Orders"}</FormGroupTitle>
                </Grid>
                <Grid className={classes.customGrid} container direction="row" justifyContent="space-between" >
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <>
                            <Button
                                size="small"
                                className={classes.newAddBtn2}
                                onClick={() => handleAddNew()}
                                disabled={!isEditable}
                            >+ Add New
                            </Button>
                            {/* <Button
                                startIcon={
                                    <Avatar
                                        vairent="square"
                                        className={classes.BtnIcon}
                                        src={PrintIcon}
                                        classes={{ root: classes.btnIconRoot }}
                                    />
                                }
                                onClick={handleFeatureAddedSoon}
                                className={classes.faxButton}
                            >Print</Button> */}
                        </>
                    </Grid>

                    <Grid item xs={7} sm={7} md={7} lg={7} xl={7} />
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <SelectField
                            placeholder="Select Status"
                            name="status"
                            value={state.status}
                            onChange={handleChange}
                            options={labOrderStatus} />
                    </Grid>
                </Grid>
            </Grid>
            {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </>
            ) : (
                <div className={props.dp == 'true' ? 'dp-table' : ''}>
                    <div className="custom-grid">
                        <Table
                            // onRow={(record, rowIndex) => {
                            //     return {
                            //         onClick: (e) => handleRowClick(e, record.key),
                            //     };
                            // }}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={isLoading && LoadingIcon}
                                        description={isLoading ? "Loading..." : "No Record Found"}
                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                    />
                                )
                            }}
                            checkStrictly={true}
                            rowClassName={(record, index) => "claimRow"}
                            scroll={true}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                            // pagination={{ pageSize: pageCount ? pageCount : 10 }}
                            dataSource={rowsData}
                            columns={props.isImaginOrder === true ? imagingOrderColumsData : labOrderColumsData}

                        // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                        />
                    </div>
                </div>
                // <div className={props.dp == 'true' ? 'dp-table' : ''}>

                //     <MDBDataTable
                //         striped
                //         small
                //         btn
                //         searching={false}
                //         data={tableData}
                //     />
                // </div>
            )
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
export default withSnackbar(LabOrders)