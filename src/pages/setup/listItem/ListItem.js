import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Grid,
    Button,
    Container,
    Typography,
    Tooltip,
    Icon,

} from '@material-ui/core';
//Images
import LoadingIcon from "../../../images/icons/loaderIcon.gif";

import Erase from "../../../images/icons/erase.png"
import Delete from "../../../images/icons/trash.png"
import AddIcon from '../../../images/icons/add-icon.png';

//
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PageTitle from "../../../components/PageTitle";
import SearchList from "../../../components/SearchList/SearchList";

import { PostDataAPI } from '../../../Services/PostDataAPI';
import { withSnackbar } from "../../../components/Message/Alert";
import { Label, FormBtn } from '../../../components/UiElements/UiElements';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import useStyles from "./styles";
import { Table, Empty, Input } from 'antd';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
import '../../../components/SearchGrid/style.css';
import { IsEditable } from '../../../Services/GetUserRolesRights';
import ListItemForm from "./component/listItemForm";

function ListItem(props) {
    const history = useHistory();
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable, setIsEditable] = useState(IsEditable("ListItem"));
    const [state, setState] = useState({ listItemId: '', listItemCode: '', isRestricted: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showItemForm, setShowItemForm] = useState(false);
    const [dataId, setDataId] = useState(0);

    const handleSearchListChange = (name, item) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            ['listItemId']: id,
            ['listItemCode']: value,
            ['isRestricted']: item.extraParam1
        }));
        

        if(value == '') {
            setIsLoading(false);
            setRowsData([]);

            setState(prevState => ({
                ...prevState,
                ['listItemId']: '',
                ['listItemCode']: '',
                ['isRestricted']: 0,
            }));
     
        } else {
            loadData(id, item.extraParam1);
        }
    }

    const addNewListItem = () => {
        setDataId(0);
        setShowItemForm(true);

    }

    const editListItem = (item) => {
        setDataId(item.listTypeId);
        setShowItemForm(true);
    }

    const deleteListItem = (item) => {
        if (item.isSysGen) {
            showMessage("Error", "Can't delete a system generated item", "error", 3000);
        } else {
            ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {

                PostDataAPI('setup/listview/DeleteListItem', item, true).then((result) => {
                    if (result.success == true) {
                        showMessage("Success", "Record deleted successfully.", "success", 2000);
                        loadData(item.listType, state.isRestricted);
                    }
                    else {
                        showMessage("Error", result.message, "error", 3000);
                    }
                })

            });
        }

    }
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
    const loadData = (filterValues, isRestricted) => {

        setIsLoading(true);
        let method = "setup/listview/LoadGrid";
        let data = {
            ListType: filterValues
        }
        //setRowsData([]);
        PostDataAPI(method, data).then((result) => {

            setIsLoading(false);
            if (result.success) {
                setDataId(0);
                setRowsData(result.data.map((item, i) => {
                    let isSysGen = item.isSysGen ? "True" : "False";
                    item.action =
                        <div style={{ width: "50px", textAlign: "center" }}>

                            <Tooltip title="Edit">
                                <Icon> <img src={Erase} onClick={() => editListItem(item)} className={classes.Icon} /> </Icon>
                            </Tooltip>
                            {(isRestricted != "True" && isEditable) ?
                                (isSysGen != "True") ? <Tooltip title="Delete">
                                    <Icon> <img src={Delete} onClick={() => deleteListItem(item)} className={classes.Icon} /> </Icon>
                                </Tooltip> : null
                                : null
                            }
                        </div>
                    return { ...item }

                }));
            }
        });
    }
    useEffect(() => {
        //loadData();
    }, [])


    const handleClose = () => {
        setShowItemForm(false)
        loadData(state.listItemId, state.isRestricted);
    }
    return (
        <>
            <PageTitle title="List Item" button={<Button
                size="small"
                id="btnIdGetPayers"
                className={classes.newAddBtn}
                onClick={() => {
                    history.goBack();
                }}
                startIcon={< ArrowBackIosIcon />}
            >
                Back to Setup
            </Button>
            } />


            <Container maxWidth={false} className={classes.positionRelative}>
                <Grid container direction="row">

                    <Grid item className={classes.listLabelStyle} sm={1}>
                        <Label title="List" />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <SearchList
                            id="listItemId"
                            name="listItemCode"
                            value={state.listItemId}
                            searchTerm={state.listItemCode}
                            code="get_all_list_items"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) => handleSearchListChange(name, item)}
                            placeholderTitle="Search List"
                        />
                    </Grid>
                </Grid>
                {
                    state.listItemId && state.isRestricted != 'True' && isEditable ?
                        <Grid container direction="row" style={{ marginTop: '40px' }} >

                            <span className={classes.addListItem} title="Add New Line Item" onClick={() => addNewListItem()} >
                                <img src={AddIcon} alt="Add New Line Item" />
                                Add New Line Item
                            </span>

                        </Grid>
                        : null
                }
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={props.dp == true ? 'dp-table' : ''}>
                        <div className="custom-grid">
                            <Table
                                scroll={true}
                                checkStrictly={true}
                                dataSource={rowsData}
                                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                columns={gridCnfg["ListItem"]}
                                // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
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

                        </div>
                    </div>
                </Grid>

            </Container>
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
            <ListItemForm isEditable={ isEditable}  showHideDialog={showItemForm} handleClose={handleClose} dataId={dataId} listType={state.listItemId} isFormEditable={isEditable} isRestricted={state.isRestricted} />

        </>
    )
}

export default withSnackbar(ListItem)
