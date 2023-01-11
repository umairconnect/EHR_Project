import React, { useState, useEffect } from "react"
import { InputBase } from "@material-ui/core"
import { MDBInput, MDBDataTable } from 'mdbreact';
import { PostDataAPI } from '../../Services/PostDataAPI';
import useStyles from './styles'
import { data as gridCnfg } from './component/setupData';
import { Skeleton } from "@material-ui/lab";
import Erase from "../../images/icons/erase.png"
import Delete from "../../images/icons/trash.png"
import Copy from "../../images/icons/copy.png";
import EyeIcon from "../../images/icons/view.png";
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import AddUserIcon from "../../images/icons/add-user.png";

import AssignForm from '../../pages/setup/consentForm/component/assignForm/AssignForm';


import {
    Icon,
    Typography,
    Grid,
    Tooltip
} from "@material-ui/core";
import { SearchOutlined as SearchIcon, AttachFile as AttachFileIcon } from '@material-ui/icons';
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import SearchGridForm from "../SearchPanel/SearchGridForm";
import { LinkS } from "../UiElements/UiElements";
import "./style.css";
import { Table, Empty } from 'antd';
// import 'antd/dist/antd.css';
import "../antd.css";
import "./antStyle.css";

export default function SearchGrid({ isDeleted, code, apiurl, Assignnew, onEdit, onDelete, onAddNew, isSearchAble, ischeckboxes, isLink, Title, onChange, isUpdate, isSendRx, isSelection, isRowClickAble, rowClick, getSelectedRows, pageCount, isCustomSearch, hideAction, update, ...props }) {
    var classes = useStyles();

    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});

    const [assignFormDialogState, setAssignFormDialogState] = useState(false);
    const [formId, setFormId] = useState(0);
    const [arrChecked] = useState([]);
    const [value, setValue] = useState('');
    const handleCheckBox = (e) => {
        if (e.target.checked == true) {
            arrChecked.push(e.target.name)
        }
        else {
            const index = arrChecked.indexOf(e.target.name);
            if (index > -1) {
                arrChecked.splice(index, 1);
            }
        }

        if (onChange)
            onChange(e);
    };
    const handleEdit = (e, id) => {
        e.stopPropagation();
        onEdit(id);
    }
    const handleDelete = (e, id) => {
        e.stopPropagation();
        setValues({})
        onDelete(id);
    }
    const OpenAssignForm = (id) => {

        setAssignFormDialogState(true);
        setFormId(id)
    }
    const loadData = (filterValues) => {
        setIsLoading(true)
        PostDataAPI(props.apiUrl, filterValues).then((result) => {
            setIsLoading(false);
            if (props.isRecordExist) {
                if (result.data.length > 0) {
                    props.isRecordExist(false)
                }
                else { props.isRecordExist(true) }
            }
            if (result.success) {
                if (typeof props.rowsCount == 'function') {
                    props.rowsCount(result.data.length);
                }
                setRowsData(
                    result.data.map((item, i) => {

                        item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                        if (props.dp == true)
                            item.dp = <img src={item['photoPath'] ? "." + item['photoPath'] : "./static/media/profile-pic.7e2ec63d.jpg"} alt="" className={classes.userDp} />
                        /*if (!hideAction) {*/
                        item.action =
                            <div style={{ width: "100%", textAlign: item.isReport === true || item.isReport === false ? "right": "center" }}>

                                {isSendRx == true || item.isReport === true ? null :
                                    <Tooltip title="Edit">
                                        <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} disabled={true} /> </Icon>
                                    </Tooltip>
                                }

                                {Assignnew ? <Tooltip title="add new">
                                    <Icon> <img src={AddUserIcon} onClick={() => OpenAssignForm(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                    : ''}


                            {hideAction == true || item.isReport === true ? null :
                                    <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={(e) => handleDelete(e, item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>}
                            </div>
                        /*}*/
                        //item.scannedEobPath = <LinkS target={"_blank"} href={"." + item.scannedEobPath}><AttachFileIcon onClick={(e) => e.stopPropagation()} /></LinkS>
                        return { ...item }
                    }));
                setGridData(
                    result.data.map((item, i) => {
                        item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                        if (props.dp == true)
                            item.dp = <img src={item['photoPath'] ? "." + item['photoPath'] : "./static/media/profile-pic.7e2ec63d.jpg"} alt="" className={classes.userDp} />

                        item.action =
                            <div style={{ width: "100%", textAlign: "center" }}>
                                {isSendRx == true ? null :
                                    <Tooltip title="Edit">
                                        <Icon> <img src={Erase} onClick={(e) => handleEdit(e, item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                }
                                <Tooltip title="Delete">
                                    <Icon> <img src={Delete} className={classes.Icon} onClick={(e) => handleDelete(e, item[gridCnfg[props.columnCode][0].dataIndex])} /> </Icon>
                                </Tooltip>
                            </div>
                        return { ...item }
                    }));
            }
        });
    }
    useEffect(() => {
        if (true) {
            if (props.filter !== undefined) {
                loadData(props.filter);
            }
            else {
                loadData(values);
            }
        };
    }, [isUpdate])
    const tableData = {
        columns: gridCnfg[props.columnCode],
        rows: rowsData,
    };
    const handleSearch = (e) => {

        const currValue = e.target.value;
        setValue(currValue);
        if (currValue && currValue != undefined && currValue != null && currValue != "") {
            let filteredData = [];
            
                filteredData=[...gridData];
            filteredData = filteredData.filter(entry => {
                var hasValue = false;
                if (props.columnCode == 'AppointmentProfile') {
                    var appProfileColumns = gridCnfg['AppointmentProfile'];
                    for (var i = 1; i < appProfileColumns.length; i++)
                    {
                        var prop = appProfileColumns[i];
                        if (Object.prototype.hasOwnProperty.call(entry, prop.dataIndex)) {
                            hasValue = entry[prop.dataIndex]?.toString().toLowerCase().includes(currValue.toLowerCase());
                            if (hasValue)
                                break;
                        }
                    }
                }
                else {
                    for (var prop in entry) {
                        if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                            hasValue = entry[prop]?.toString().toLowerCase().includes(currValue.toLowerCase());
                            if (hasValue)
                                break;
                        }
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
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
        if (!!getSelectedRows) {
            getSelectedRows(selectedRowKeys);
        }
    }
    const onSearchSubmit = (searchvalues) => {
        loadData(searchvalues);
    }
    const handleRowClick = (e, key) => {
        if (!!rowClick) {
            rowClick(key);
        }
    };
    return (
        <>
            {/* {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </>
            ) : ( */}
            <>
                {isCustomSearch && <SearchGridForm isDeleted={isDeleted} defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit} />}
                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container item justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>

                        {Title ? <Typography className={classes.title}>{Title}</Typography> : ""}

                    </Grid>
                    <Grid container item justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                        {isSearchAble ?
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent={props.searchAlignment}>
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
                            : ""}
                    </Grid>
                </Grid>

                <>
                    <div className={props.dp == true ? 'dp-table' : ''}>
                        <div className="custom-grid">
                            <Table
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (e) => handleRowClick(e, record.key),
                                    };
                                }}
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
                                rowClassName={(record, index) => isRowClickAble ? "claimRow" : ""}
                                scroll={true}
                                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                // pagination={{ pageSize: pageCount ? pageCount : 10 }}
                                dataSource={rowsData}
                                columns={gridCnfg[props.columnCode]}
                                rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                            />
                        </div>
                    </div>
                </>
                {assignFormDialogState && <AssignForm
                    showHideDialog={assignFormDialogState}
                    formId={formId}
                    handleClose={() => setAssignFormDialogState(!assignFormDialogState)}
                />}
            </>
            {/* )
            } */}
        </>
    )

}