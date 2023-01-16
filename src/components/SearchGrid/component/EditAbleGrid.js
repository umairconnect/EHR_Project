import React, { useState, useEffect } from "react"
import { InputBase } from "@material-ui/core"
import { MDBInput, MDBDataTable } from 'mdbreact';
import { PostDataAPI } from '../../../Services/PostDataAPI';
import useStyles from './styles'
import { data as gridCnfg } from './setupData';
import { Skeleton } from "@material-ui/lab";
import Erase from "../../../images/icons/erase.png"
import Delete from "../../../images/icons/trash.png"
import Share from "../../../images/icons/share.png";
// import Copy from "../../../images/icons/copy.png";
import EyeIcon from "../../../images/icons/view.png";
import PrintIcon from "../../../images/icons/PrintIcon.png";
// import EraIcon from "../../../images/icons/eraIcon.png";
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import FavoriteIcon from '@material-ui/icons/StarBorder';
import FavoriteTrueIcon from '@material-ui/icons/Star';

import {
    Icon,
    Typography,
    Grid,
    Tooltip
} from "@material-ui/core";
import { SearchOutlined as SearchIcon, AttachFile as AttachFileIcon } from '@material-ui/icons';
import { LinkS } from "../../UiElements/UiElements";
import "../style.css";
import { Table, Empty } from 'antd';
// import 'antd/dist/antd.css';
import "../../antd.css";
import "../antStyle.css";

export default function EditAbleGrid({ code, apiurl, onEdit, onDelete, onPrint, onAddNew, isSearchAble, ischeckboxes, isLink, Title, onChange, isUpdate, isSendRx,
    isSelection, isRowClickAble, onRowClick, getSelectedRows, pageSize, hideAction, onView, ...props }) {
    var classes = useStyles();

    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
    const loadData = () => {
        if (props.apiUrl != "patient/medication/loadMedicationSurescripts") {
            setIsLoading(true)
            PostDataAPI(props.apiUrl, props.dataId).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    setRowsData(
                        result.data.map((item, i) => {
                            item.key = item[gridCnfg[props.columnCode]?.[0]?.dataIndex];
                            if (ischeckboxes) {
                                item.check = <><MDBInput type="checkbox" name={item[gridCnfg[props.columnCode][0].dataIndex]} onChange={handleCheckBox} color="primary" /></>
                            };
                            if (isLink && item.link) {
                                debugger;
                                var splitedLinks = item.link.split(',')
                                var splitedLinkPaths = item.linkPath.split(',')
                                item.link = splitedLinks.map((item, i) => {
                                    if (splitedLinkPaths[i] && !splitedLinkPaths[i].startsWith('.')) {
                                        splitedLinkPaths[i] = '.' + splitedLinkPaths[i];
                                    }
                                    return <a target={"_blank"} href={splitedLinkPaths[i]}>{item.length > 5 ? item.substring(0, 8) + '...' : item}</a>
                                })
                                //if (item.linkPath && !item.linkPath.startsWith('.'))
                                //    item.linkPath = '.' + item.linkPath;
                                //item.link = <a target={"_blank"} href={item.linkPath}>{item.link.length > 5 ? item.link.substring(0, 8) + '...' : item.link}</a>
                            }

                            item.feeAction = <>
                                <Tooltip title="Edit">
                                    <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                {hideAction == true ? null :
                                    <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>}
                            </>
                            /*if (!hideAction) {*/
                            item.action =
                                <div style={{ width: "100%", textAlign: props.ActionAlign? props.ActionAlign: "center" }}>
                                    {props.isChartNoteTemplate ?
                                        <>
                                            <Tooltip title="Share">
                                                <Icon> <img src={Share} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                            </Tooltip>
                                            {
                                                item.isFavorite ?
                                                    <Tooltip title="Favorite">
                                                        <Icon> <FavoriteTrueIcon onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.svgIcon} /> </Icon>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title="Favorite">
                                                        <Icon> <FavoriteIcon onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.svgIcon} /> </Icon>
                                                    </Tooltip>
                                            }
                                        </> : null
                                    }
                                    {onView ? <Tooltip title="View">
                                        <Icon> <img src={EyeIcon} onClick={() => onView(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.IconNoHeight} /> </Icon>
                                    </Tooltip>
                                        : ''}

                                    {isSendRx == true ? null :
                                        <Tooltip title="Edit">
                                            <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>
                                    }
                                    {hideAction == true ? null :
                                        <Tooltip title="Delete">
                                            <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>}


                                </div>

                            item.dispenseQuantity = item.dispenseQuantity === 0 ? '' : item.dispenseQuantity
                            item.refillNumber = item.refillNumber === 0 ? '' : item.refillNumber
                            item.ERAaction =

                                <>
                                    <Tooltip title="Print">
                                        <Icon> <img className={classes.printIcon} src={PrintIcon} onClick={(e) => { e.stopPropagation(); onPrint(item) }} alt="View" width="20px" /> </Icon>
                                    </Tooltip>

                                    <Tooltip title="View">
                                        <Icon> <img src={EyeIcon} onClick={() => onView(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.IconNoHeight} /> </Icon>
                                    </Tooltip>
                                </>

                            item.medicationAction =
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    {props.isChartNoteTemplate ?
                                        <>
                                            <Tooltip title="Share">
                                                <Icon> <img src={Share} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                            </Tooltip>
                                            {
                                                item.isFavorite ?
                                                    <Tooltip title="Favorite">
                                                        <Icon> <FavoriteTrueIcon onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.svgIcon} /> </Icon>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title="Favorite">
                                                        <Icon> <FavoriteIcon onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.svgIcon} /> </Icon>
                                                    </Tooltip>
                                            }
                                        </> : null
                                    }
                                    {item.medPresType != 'Historic' ?
                                        <Tooltip title="View">
                                            <Icon> <img src={EyeIcon} onClick={() => onView(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.IconNoHeight} /> </Icon>
                                        </Tooltip> : ''}




                                    {item.medPresType == 'Historic' ?
                                        <Tooltip title="Edit">
                                            <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip> : ''
                                    }

                                    {hideAction == true ? null :
                                        <Tooltip title="Delete">
                                            <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>}


                                </div>
                            /*}*/
                            item.CCAction =
                                <>
                                    {isSendRx == true ? null :
                                        <Tooltip title="Edit">
                                            <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>
                                    }
                                    {hideAction == true ? null :
                                        <Tooltip title="Delete">
                                            <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>}
                                </>
                            item.paymentAction =
                                <div style={{ width: "100%", textAlign: "center", }}>
                                    {hideAction == true ? null :
                                        <>
                                            <Tooltip title="Edit">
                                                <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} /> </Icon>
                                            </Tooltip><Tooltip title="Delete">
                                                <Icon> <img src={Delete} onClick={(e) => { e.stopPropagation(); onDelete(item[gridCnfg[props.columnCode][0].dataIndex]) }} className={classes.paymentIcon} /> </Icon>
                                            </Tooltip>
                                        </>
                                    }
                                </div>
                            item.statementAction =
                                // <Tooltip title="View">
                                <Tooltip title="Print">
                                    <Icon> <img className={classes.printIcon} src={PrintIcon} onClick={(e) => { e.stopPropagation(); onEdit(item) }} alt="View" width="20px" /> </Icon>
                                </Tooltip>
                            item.templateAction =
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    {hideAction ? null : <Tooltip title="Share">
                                        <Icon> <img src={Share} onClick={() => onDelete(item, "share")} className={classes.Icon} /> </Icon>
                                    </Tooltip>}
                                    {hideAction ? null :
                                        item.isFavorite ?
                                            <Tooltip title="Favorite">
                                                <Icon> <FavoriteTrueIcon onClick={() => onDelete(item, "fav")} className={classes.svgIcon} /> </Icon>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Favorite">
                                                <Icon> <FavoriteIcon onClick={() => onDelete(item, "fav")} className={classes.svgIcon} /> </Icon>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Edit">
                                        <Icon> <img src={Erase} onClick={() => onDelete(item, "edit")} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                    {hideAction ? '' : <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item, "delete")} className={classes.paymentIcon} /> </Icon>
                                    </Tooltip>}

                                </div>
                            // </Tooltip>

                            // item.paymentCategoryCode = item.paymentCategoryCode && item.paymentCategoryCode.toString().toLowerCase() == "era" ?
                            //     < Icon > <img
                            //         src={EraIcon}
                            //         onClick={(e) => {
                            //             e.stopPropagation();
                            //             onEdit(item[gridCnfg[props.columnCode][0].dataIndex])
                            //         }}
                            //         className={classes.eraIcon}
                            //         alt="View" />
                            //     </Icon > : ""

                            //item.scannedEobPath = <LinkS target={"_blank"} href={"." + item.scannedEobPath}><AttachFileIcon onClick={(e) => e.stopPropagation()} /></LinkS>
                            return { ...item }
                        }));
                    setGridData(
                        result.data.map((item, i) => {
                            item.key = item[gridCnfg[props.columnCode]?.[0]?.dataIndex];
                            if (ischeckboxes) {
                                item.check = <><MDBInput type="checkbox" name={item[gridCnfg[props.columnCode][0].dataIndex]} onChange={handleCheckBox} color="primary" /></>
                            };
                            if (isLink && item.link) {
                                item.link = <a target={"_blank"} href={item.linkPath}>{item.link}</a>
                            }
                            item.feeAction = <>
                                <Tooltip title="Edit">
                                    <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                            </>
                            item.action =
                                <div style={{ width: "100%", textAlign: "center", }}>
                                    {isSendRx == true ? null :
                                        <Tooltip title="Edit">
                                            <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>
                                    }
                                    <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                </div>
                            item.CCAction =
                                <>
                                    {isSendRx == true ? null :
                                        <Tooltip title="Edit">
                                            <Icon> <img src={Erase} onClick={() => onEdit(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>
                                    }
                                    {hideAction == true ? null :
                                        <Tooltip title="Delete">
                                            <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                        </Tooltip>}
                                </>
                            item.paymentAction =
                                <div style={{ width: "100%", textAlign: "center", }}>
                                    {/* {isSendRx == true ? null : 
                                    <Tooltip title="Edit">
                                        <Icon> <img src={Copy} onClick={(e) => { e.stopPropagation(); onEdit(item[gridCnfg[props.columnCode][0].dataIndex]) }} className={classes.paymentIcon} /> </Icon>
                                    <Tooltip title="Edit">
                                    }
                                */}
                                    <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={(e) => { e.stopPropagation(); onDelete(item[gridCnfg[props.columnCode][0].dataIndex]) }} className={classes.paymentIcon} /> </Icon>
                                    </Tooltip>
                                </div>
                            item.statementAction =
                                // <Tooltip title="View">
                                <Icon > <img onClick={(e) => { e.stopPropagation(); onEdit(item[gridCnfg[props.columnCode][0].dataIndex]) }} src={PrintIcon} width="20px" alt="View" /> </Icon>

                            item.templateAction =
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    {hideAction ? null : <Tooltip title="Share">
                                        <Icon> <img src={Share} onClick={() => onDelete(item, "share")} className={classes.Icon} /> </Icon>
                                    </Tooltip>}
                                    {hideAction ? null :
                                        item.isFavorite ?
                                            <Tooltip title="Favorite">
                                                <Icon> <FavoriteTrueIcon onClick={() => onDelete(item, "fav")} className={classes.svgIcon} /> </Icon>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Favorite">
                                                <Icon> <FavoriteIcon onClick={() => onDelete(item, "fav")} className={classes.svgIcon} /> </Icon>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Edit">
                                        <Icon> <img src={Erase} onClick={() => onDelete(item, "edit")} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                    {hideAction ? '' : <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item, "delete")} className={classes.paymentIcon} /> </Icon>
                                    </Tooltip>}

                                </div>
                            // </Tooltip>
                            // item.paymentCategoryCode = item.paymentCategoryCode && item.paymentCategoryCode.toString().toLowerCase() == "era" ?
                            //     < Icon > <img
                            //         src={EraIcon}
                            //         onClick={(e) => {
                            //             e.stopPropagation();
                            //             onEdit(item[gridCnfg[props.columnCode][0].dataIndex])
                            //         }}
                            //         className={classes.eraIcon}
                            //         alt="View" />
                            //     </Icon > : ""
                            //item.scannedEobPath = <LinkS target={"_blank"} href={"." + item.scannedEobPath}><AttachFileIcon onClick={(e) => e.stopPropagation()} /></LinkS>
                            return { ...item }
                        }));
                }

            });
        }
    }
    useEffect(() => {
        loadData();
    }, [isUpdate])
    const tableData = {
        columns: gridCnfg[props.columnCode],
        rows: rowsData,
    };
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
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
        if (!!getSelectedRows) {
            getSelectedRows(selectedRowKeys);
        }
    }
    const handleRowClick = (e, record) => {

        if (!!onRowClick) {
            onRowClick(record);
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
                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container item justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>

                        {Title ? <Typography className={classes.title}>{Title}</Typography> : ""}

                    </Grid>
                    <Grid container item justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                        {isSearchAble ?
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={props.searchbarClass}>
                                <InputBase
                                    id="search"
                                    name="search"
                                    value={value}
                                    placeholder="Search"
                                    className="grid-search-input"
                                    startAdornment={<SearchIcon />}
                                    onChange={handleSearch}
                                    style={{ fontSize: "14px" }}
                                />
                            </Grid>
                            : ""}
                    </Grid>
                </Grid>
                <>
                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                        <div className="custom-grid">
                            <Table
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (e) => handleRowClick(e, record),
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
                                pagination={{ defaultPageSize: !!pageSize ? pageSize : 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                // pagination={{ pageSize: pageCount ? pageCount : 10 }}
                                dataSource={rowsData}
                                columns={gridCnfg[props.columnCode]}
                                rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                            />
                        </div>
                    </div>
                </>
            </>
            {/* )
            } */}
        </>
    )

}