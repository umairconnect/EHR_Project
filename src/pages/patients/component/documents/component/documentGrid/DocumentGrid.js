import React, { useState, useEffect } from "react";
import { MDBInput, MDBDataTable } from "mdbreact";
import { PostDataAPI } from "../../../../../../Services/PostDataAPI";
import useStyles from "./styles";
import { Skeleton } from "@material-ui/lab";

import Erase from "../../../../../../images/icons/erase.png";
import Delete from "../../../../../../images/icons/trash.png";
import PrintIcon from "../../../../../../images/icons/PrintIcon.png";
import EyeIcon from "../../../../../../images/icons/view.png";


import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
    Icon,
    Typography,
    Grid,
    Tooltip,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
    ButtonGroup,
    Button
} from "@material-ui/core";

import "./style.css";
import {
    LinkS,
    FormBtn,
} from "../../../../../../components/UiElements/UiElements";
import { SignForm } from "../documentSignForm/SignForm";
import { data as gridCnfg } from "../../../../../../components/SearchGrid/component/setupData";
import { Table, Empty } from "antd";
import "../../../../../../components/antd.css";
import "../../../../../../components/SearchGrid/antStyle.css";
export default function DocumentGrid({
    code,
    apiurl,
    onEdit,
    onDelete,
    onAddNew,
    isSearchAble,
    ischeckboxes,
    isLink,
    Title,
    onChange,
    isUpdate,
    onActionclick,
    filterBy,
    isEditable,
    ...props
}) {
    var classes = useStyles();
    const columsData = [
        {
            label: "",
            field: "documentId",
            width: 270,
            hidden: true,
        },
        {
            label: "Title",
            field: "documentTitle",
            width: 270,
        },
        {
            label: "Type",
            field: "documentTypeCode",
            width: 150,
        },
        {
            label: "Comments",
            field: "comments",
            width: 270,
        },

        {
            label: "Patient",
            field: "patientName",
            width: 100,
        },
        {
            label: "Provider",
            field: "providerName",
            width: 150,
        },
        {
            label: "Date",
            field: "strDocumentDate",
            width: 100,
        },
        {
            label: "",
            field: "action",
            width: 100,
        },
    ];
    const providerColumsData = [
        {
            label: "",
            field: "documentId",
            width: 270,
            hidden: true,
        },
        {
            label: "Title",
            field: "documentTitle",
            width: 270,
        },
        {
            label: "Type",
            field: "documentTypeCode",
            width: 150,
        },
        {
            label: "Comments",
            field: "comments",
            width: 270,
        },

        {
            label: "Patient",
            field: "patientName",
            width: 100,
        },
        {
            label: "Patient",
            field: "patientName",
            width: 150,
        },
        {
            label: "Date",
            field: "strDocumentDate",
            width: 100,
        },
        {
            label: "",
            field: "action",
            width: 100,
        },
    ];

    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [dataId] = useState(props.dataId);
    const [dropDownActionId, setDropDownActionId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [docId, setDocId] = useState(0);
    const [docType] = useState("");
    const [signFormData, setSignFormData] = useState({});
    const [docLink, setDocLink] = useState("");
    const [signed, setSigned] = useState(false);

    const [arrChecked] = useState([]);
    //State For Sign Dialog
    const [signDialogOpenClose, setSignDialogOpenClose] = useState(false);
    const [isDocumentSigned, setIsDocumentSigned] = useState(false);
    //For DropDownAction
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;
    const handleRowAction = (e) => {
        setDropDownActionId(e.currentTarget.dataset.id);
        setAnchorEl(anchorEl ? null : e.currentTarget);
        setDocLink(e.currentTarget.dataset.link);
        setSigned(e.currentTarget.dataset.label == "View");
    };
    const handleAction = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        onActionclick(dropDownActionId, e.currentTarget.dataset.id, docLink);
    };
    const handleCheckBox = (e) => {
        if (e.target.checked == true) {
            arrChecked.push(e.target.name);
        } else {
            const index = arrChecked.indexOf(e.target.name);
            if (index > -1) {
                arrChecked.splice(index, 1);
            }
        }

        if (onChange) onChange(e);
    };

    const onSignDocument = (id) => {
        setDocId(id);
        loadSignFormData(id);
        setSignDialogOpenClose(true);
    };
    const actionClick = (id, action) => {
        if (action == "View") {
            onActionclick(id, "view", "");
        } else {
            onSignDocument(id);
        }
    };
    const loadData = () => {
        setIsLoading(true);
        const filterById = filterBy == 'provider' ? 'providerId' : 'patientId';
        var data = {
            [filterById]: dataId,
            documentStatusCode: props.type,
        };
        PostDataAPI(props.apiUrl, data).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setRowsData(
                    result.data.map((item, i) => {
                        if (ischeckboxes) {
                            item.check = (
                                <>
                                    <MDBInput
                                        type="checkbox"
                                        name={item[columsData[0].field]}
                                        onChange={handleCheckBox}
                                        color="primary"
                                    />
                                </>
                            );
                        }
                        if (item.documentTitle) {
                            item.documentTitle = (
                                <LinkS target={"_blank"} href={"." + item.documentPath}>
                                    {item.documentTitle}
                                </LinkS>
                            );
                        }
                        item.action = (
                            <div style={{ width: "50%" }}>

                                <Tooltip title="Delete">
                                    <Icon> <img src={Delete} className={classes.Icon} /> </Icon>
                                </Tooltip>

                                <Tooltip title="Edit">
                                    <Icon> <img src={Erase} className={classes.Icon} /> </Icon>
                                </Tooltip>

                                <Tooltip title="View">
                                    <Icon> <img src={EyeIcon} className={classes.Icon} /> </Icon>
                                </Tooltip>

                                



                                <ButtonGroup>
                                    <FormBtn
                                        id="save"
                                        size="medium"
                                        btnType="view"
                                        className={!isEditable ? classes.btnDisable:classes.signBtn}
                                        disabled={ !isEditable}
                                        onClick={() =>
                                            actionClick(item.documentId, item.documentStatusCode)
                                        } >
                                        {item.documentStatusCode}
                                    </FormBtn>
                                    <Button
                                        className={classes.menuBtn}
                                        data-id={item.documentId}
                                        data-link={item.documentPath}
                                        data-label={item.documentStatusCode}
                                        size="small"
                                        aria-controls={open ? "menu-list-grow" : undefined}
                                        aria-haspopup="true"
                                        onClick={handleRowAction}
                                        endIcon={<ExpandMoreIcon />}
                                    ></Button>
                                </ButtonGroup>


                            </div>
                        );
                        return { ...item };
                    })
                );
            }
        });
    };

    const loadSignFormData = (id) => {
        var params = {
            code: "patientDocument_Info",
            parameters: [id ? id.toString() : ""],
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setSignFormData(
                    result.data.map((item, i) => {
                        if (item.text4) item.text4 = item.text4.split("\\")[4];
                        return {
                            patientName: item.text1,
                            dob: item.text2,
                            gender: item.text3,
                            ageYears: item.id,
                            docName: item.text4,
                        };
                    })
                );
            }
        });
    };

    useEffect(() => {
        loadData();
    }, [isUpdate, isDocumentSigned]);

    const handleUpdateGrid = () => {
        setIsDocumentSigned(true);
        loadData();
    };

    return (
        <>
            <SignForm
                dataId={dataId}
                docId={docId}
                docType={docType}
                signFormData={signFormData}
                handleUpdateGrid={handleUpdateGrid}
                message="Do you want to sign this document"
                actiondialogOpenClose={signDialogOpenClose}
                onCancel={() => setSignDialogOpenClose(false)} />

            <Popper
                style={{ zIndex: 900 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                role={undefined}
            >
                <Paper>
                    <ClickAwayListener
                        onClickAway={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                    >
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                            {signed == false ? (
                                <>
                                    <MenuItem data-id="view" onClick={handleAction}>
                                        View
                                    </MenuItem>
                                    <MenuItem disabled={!isEditable} data-id="ammendment" onClick={handleAction}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem disabled={!isEditable} data-id="delete" onClick={handleAction}>
                                        Delete
                                    </MenuItem>
                                </>
                            ) : null}

                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>

            {isLoading ? (
                <>
                    <Skeleton
                        className={classes.bgColor}
                        animation="wave"
                        variant="rect"
                        height={41}
                        width="100%"
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton
                        className={classes.bgColor}
                        animation="wave"
                        variant="rect"
                        width="100%"
                    >
                        <div style={{ paddingTop: "27%" }} />
                    </Skeleton>
                </>
            ) : (
                <>
                    <Grid
                        container
                        item
                        direction="row"
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >
                        <Grid
                            container
                            item
                            justify="flex-start"
                            direction="column"
                            xs={5}
                            sm={5}
                            md={5}
                            lg={5}
                            xl={5}
                        >
                            {Title ? (
                                <Typography className={classes.title}>{Title}</Typography>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid
                            container
                            item
                            justify="flex-end"
                            direction="row"
                            xs={7}
                            sm={7}
                            md={7}
                            lg={7}
                            xl={7}
                        ></Grid>
                    </Grid>

                    <div className={props.dp == "true" ? "dp-table" : ""}>
                        <div className="custom-grid">
                            <div className="document-table">
                                <Table
                                    locale={{
                                        emptyText: (
                                            <Empty
                                                image={isLoading && LoadingIcon}
                                                description={
                                                    isLoading ? "Loading..." : "No Record Found"
                                                }
                                                imageStyle={{
                                                    height: 30,
                                                    display: !isLoading ? "none" : "",
                                                }}
                                            />
                                        ),
                                    }}
                                    checkStrictly={true}
                                    rowClassName={(record, index) => "claimRow"}
                                    scroll={true}
                                    pagination={{
                                        defaultPageSize: 5,
                                        showSizeChanger: true,
                                        pageSizeOptions: [5, 10, 20, 30],
                                    }}
                                    dataSource={rowsData}
                                    columns={filterBy == 'provider' ? gridCnfg["ProviderDocumentColumns"] : gridCnfg["DocumentColumns"]}
                                />
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    );
}
