import React, { useState, useEffect } from "react"
import {
    Dialog,
    Popper,
    Paper,
    Grid,
    FormLabel,
    InputBase,
    FormHelperText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Icon,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles"
import CloseIcon from "../../../../images/icons/math-plus.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';
import { FormBtn, FormGroupTitle, Label, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { InputBaseField, CheckboxField } from "../../../../components/InputField/InputField";
import AddIcon from '../../../../images/icons/add-icon.png';
import DeleteIcon from "../../../../images/icons/trash.png";
import { withSnackbar } from "../../../../components/Message/Alert";
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import Delete from "../../../../images/icons/trash.png";
import { SelectField } from "../../../../components/InputField";
import SearchList from "../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from 'rc-scrollbars';

import { Empty, Table } from "antd";
import "../../../../components/antd.css"
import "../../../../components/SearchGrid/antStyle.css"
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });



function ProcedureDialog({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();

    const ProceduralsCodesOption = [
        {
            value: "CPT",
            label: "CPT",
        },
        {
            value: "HCPCS",
            label: "HCPCS",
        },
        {
            value: "HCPT",
            label: "HCPT",
        }
    ];

    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [rowsData, setRowsData] = useState([]);
    const [recentRowsData, setRecentRowsData] = useState([]);

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    // handle status of procedure.
    const [procedureState, setProcedureState] = useState({
        proceduralCodeId: 0, encounterId: props.encounterId, procedureType: "CPT", code: "CPT", name: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        errorCode: false, errorName: false
    });

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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

    useEffect(() => {

        if (showHideDialog) {

            getRecentProceduralCodes();
            loadData(props.encounterId);

            setProcedureState(prevState => ({
                ...prevState,
                name: ""
            }));

        }

    }, [showHideDialog]);

    const onDelete = (item) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the procedure?", "confirm", function () {

            PostDataAPI('proceduralCode/deleteProceduralCode', item, true).then((result) => {

                if (result.success == true) {
                    setErrorMessages([]);
                    showMessage("Success", "Procedure deleted successfully.", "success", 2000);
                    loadData(props.encounterId);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });

    }

    const loadData = (encounterId) => {

        let procData = {
            "encounterID": encounterId
        }
        setIsLoading(true);
        PostDataAPI("proceduralCode/loadProceduralCodeGrid", procData).then((result) => {
            setIsLoading(false);

            if (result.success && result.data != null) {

                setRowsData(
                    result.data.map((item, i) => {

                        item.action =
                            <div style={{ width: "48px" }}>
                                <Icon> <img src={Delete} onClick={() => onDelete(item)} className={classes.Icon} /> </Icon>
                            </div>
                        return {
                            ...item,
                            proceduralCodeId: item.proceduralCodeId,
                            code: item.code,
                            name: item.name
                        }
                    }));
            }
        })

    }

    const getRecentProceduralCodes = () => {

        GetDataAPI("proceduralCode/getRecentEncounterProceduralCodes").then((result) => {

            if (result.success && result.data != null) {

                setRecentRowsData(
                    result.data.map((item, i) => {
                        return {
                            proceduralCodeId: item.proceduralCodeId,
                            code: item.code,
                            name: item.name
                        }
                    })
                );
            }

        })
    }

    const handleSearchChange = (name, item) => {

        const { id, value } = item;

        setProcedureState(prevState => ({
            ...prevState,
            "name": value
        }));

        if (value != null) {

            let method = "proceduralCode/addProceduralCode";
            procedureState.code = id;
            procedureState.name = value;
            procedureState.encounterId = props.encounterId;

            PostDataAPI(method, procedureState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setProcedureState(prevState => ({
                        ...prevState,
                        "name": ''
                    }));

                    setErrorMessages([]);

                    if (result.message == "saved")
                        showMessage("Success", "Procedure added successfully.", "success", 2000);

                    else if (result.message == "alreadyexits")
                        showMessage("Success", result.data.name + " is already exits.", "success", 2000);


                    loadData(props.encounterId);
                    getRecentProceduralCodes();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setProcedureState(prevState => ({
                        ...prevState,
                        "name": ''
                    }));
                }
            })

        }

    }

    const tableData = {
        columns: [
            {
                label: '',
                field: 'proceduralCodeId',
                width: 270,
                hidden: true
            },
            {
                label: 'Description',
                field: 'name',
                width: 150
            },
            {
                label: 'Code',
                field: 'code',
                width: 150
            },
            {
                label: 'Action',
                field: 'action',
                width: 100
            }
        ],
        rows: rowsData,
    };
    const ProcedureDialogColumns = [
        {
            title: '',
            dataIndex: 'proceduralCodeId',
            className: "custom-grid-hide-col",
            hidden: true
        },
        {
            title: 'Description',
            dataIndex: 'name',
            className: "width150",
        },
        {
            title: 'Code',
            dataIndex: 'code',
            className: "width150",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        }
    ];

    const handleCodeChange = e => {

        const { name, value } = e.target;

        setProcedureState(prevState => ({
            ...prevState,
            [name]: value
        }));

        loadData(props.encounterId);
    }

    const handleChangeTemplateItem = (item) => {

        if (item != null) {

            let method = "proceduralCode/addProceduralCode";
            procedureState.code = item.code;
            procedureState.name = item.name;
            procedureState.encounterId = props.encounterId;

            PostDataAPI(method, procedureState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setProcedureState(prevState => ({
                        ...prevState,
                        "name": ''
                    }));

                    setErrorMessages([]);
                    if (result.message == "saved")
                        showMessage("Success", "Procedure added successfully.", "success", 2000);

                    else if (result.message == "alreadyexits")
                        showMessage("Warning", "Procedure '" + result.data.name + "' already exits.", "warning", 2000);

                    loadData(props.encounterId);
                    getRecentProceduralCodes();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setProcedureState(prevState => ({
                        ...prevState,
                        "name": ''
                    }));
                }
            })

        }
    }

    const saveProcedureCode = (e) => {

        e.preventDefault();

        let errorList = []

        if (!procedureState.name || procedureState.name.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: false
            }));
        }


        if (errorList.length < 1) {

            let method = "proceduralCode/addProceduralCode";

            PostDataAPI(method, procedureState, true).then((result) => {
                if (result.success == true && result.data != null) {

                    setErrorMessages([]);
                    handleClose();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    e.preventDefault();
                }
            })

        }
        else {
            e.preventDefault();
        }

    }

    return (
        <>

            <Dialog
                PaperComponent={DraggableComponent}
                disableBackdropClick
                disableEscapeKeyDown
                // TransitionComponent={Transition}
                open={showHideDialog}
                disableEnforceFocus
                classes={{ paper: classes.dialogPaper }}
                // maxWidth={'md'}
                {...props} >
                <Scrollbars autoHeight autoHeightMax="100%" style={{ maxHeight: "calc(100% - 64px)", display: "flex" }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.DialogContentLeftSide}>
                            <div className={classes.box}>
                                <div className={classes.leftInnerBox}>
                                    <div className={classes.header}>
                                        <div className={classes.leftSideHeader}>
                                            <div style={{ marginBottom: "5px" }}>Most Used</div>
                                            <div className={classes.listHeader}>
                                                <span className={classes.templatesCode}>Code</span>
                                                <span className={classes.templatesName}>Description</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.content}>
                                        <Scrollbars style={{ height: 400 }}>
                                            <div className={classes.quickPickHeader}>
                                                {
                                                    <ul className={classes.templatesList}>
                                                        {
                                                            recentRowsData.map((item, i) => (

                                                                <li key={i} onClick={() => handleChangeTemplateItem(item)}>
                                                                    <span className={classes.templatesCodeDetail}>{item.code}</span>
                                                                    <div className={classes.listItemName}>
                                                                        <span className={classes.templatesNameDetail}>{item.name}</span>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>

                                                }
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.DialogContentRightSide}>
                            <div className={classes.box}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle className={classes.lableInput}>Procedure</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                </div>
                                <div className={classes.content}>
                                    <Scrollbars style={{ height: 400 }}>
                                        <Grid className={classes.headerLabel} container direction="row" lg={12}>
                                            <Label title="Search" size={2} />
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                <SelectField
                                                    id="procedureType"
                                                    name="procedureType"
                                                    options={ProceduralsCodesOption}
                                                    onChange={handleCodeChange}
                                                    value={procedureState.procedureType}
                                                />
                                            </Grid>
                                            <Grid item direction="row" container justify="flex-end" xs={8} sm={8} md={8} lg={8} xl={8} >
                                                <Grid item xs={11} sm={11} md={11} lg={11} xl={11} >
                                                    <SearchList //name="name"
                                                        value={procedureState.name}
                                                        searchTerm={procedureState.name}
                                                        code={procedureState.procedureType}
                                                        name={procedureState.procedureType}
                                                        apiUrl="ddl/loadItems"
                                                        onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                        placeholderTitle="Search here"
                                                    />
                                                    {errorMessages.errorName ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select name
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12} style={{ marginTop: "10px" }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >

                                                <div className="custom-grid">
                                                    <Table
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
                                                        scroll={true}
                                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                        dataSource={rowsData}
                                                        columns={ProcedureDialogColumns}
                                                    />
                                                </div>
                                                {/* <MDBDataTable
                                                    striped
                                                    small
                                                    btn
                                                    searching={false}
                                                    data={tableData}
                                                /> */}

                                            </Grid>

                                        </Grid>
                                    </Scrollbars>
                                </div>

                                <div className={classes.footer}>
                                    <div className={classes.footerRight}>
                                        {/*<FormBtn id="save" onClick={saveProcedureCode} > Save</FormBtn>*/}
                                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Scrollbars>
            </Dialog>
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

export default withSnackbar(ProcedureDialog)
