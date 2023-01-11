
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import "../styles.css";
import { Grid, FormHelperText, Typography, Icon, Button } from '@material-ui/core';
import Erase from "../../../../../../images/icons/erase.png";
import Delete from "../../../../../../images/icons/trash.png";
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { FormBtn, FormGroupTitle, FooterBtn, Label } from "../../../../../../components/UiElements";
import AddIcon from '../../../../../../images/icons/add-icon.png';
import { InputBaseField, TextareaField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { Scrollbars } from 'rc-scrollbars';
// import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { Empty, Table } from "antd";
import "../../../../../../components/antd.css";
import "../../../../../../components/SearchGrid/antStyle.css";

function PastSurgicalHistory({ handleClose,handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable)
    // handle styles
    var classes = useStyles();
    const [showAddSurgicalHistory, setShowAddSurgicalHistory] = useState(false);
    const [state, setState] = useState({});
    const [dataId, setDataId] = useState(0);
    const [patientId] = useState(props.patientId);
    const [errorMessages, setErrorMessages] = useState({});
    const [rowsData, setRowsData] = useState([]);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    const pastSurgicalHistoryRef = useState({ dateRef: "", });
    const [isLoading, setIsLoading] = useState(false);


    const [columnData] = useState([
        {
            label: '',
            field: 'patientId',
            width: 270,
            hidden: true
        },
        {
            label: 'Date',
            field: 'surgeryDateString',
            width: 270,
            hidden: true
        },
        {
            label: 'Procedure',
            field: 'surgProcedureName',
            width: 270
        },
        {
            label: 'Place of Surgery',
            field: 'surgPlace',
            width: 270
        },
        {
            label: 'Complications',
            field: 'postSurgComplication',
            width: 270
        },
        {
            label: '',
            field: 'action',
            width: 270
        },
    ]);
    const pastHistoryDialogColumns = [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date',
            dataIndex: 'surgeryDateString',
            className: "width150",
        },
        {
            title: 'Procedure',
            dataIndex: 'surgProcedureName',
            className: "width150",
        },
        {
            title: 'Place of Surgery',
            dataIndex: 'surgPlace',
            className: "width150",
        },
        {
            title: 'Complications',
            dataIndex: 'postSurgComplication',
            className: "width150",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        }
    ];
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
    //

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProcedureChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "surgProcedureName": value
        }));
    }
    const init = () => {
        setState({
            pastSurgHistoryId: 0,
            patientId: parseInt(patientId),
            surgeryDate: "",// new Date().toISOString().split('T')[0],
            surgProcedureCode: "",
            surgProcedureName: "",
            surgPlace: "",
            postSurgComplication: "",
            notes: "",
            createDate: new Date()
        });
    }

    useEffect(() => {
        init();
        loadGridData();
    }, []);

    const loadData = (id) => {
        setIsLoading(true);
        init();
        GetDataAPI("encounter/history/surghistory/get", "surgHistoryId=" + id).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                if (result.data.surgeryDate)
                    result.data.surgeryDate = result.data.surgeryDate.split('T')[0];

                setState(result.data);
                setDataId(result.data.pastSurgHistoryId);
            }

        })
    }

    const loadGridData = () => {

        //filtervalues.loggedinUserId = userInfo.userID;
        GetDataAPI("encounter/history/surghistory/getList", "patientId=" + patientId).then((result) => {

            if (result.success) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.action =
                            <div style={{ width: "48px" }}>
                            <Icon> <img src={Erase} onClick={() => { loadData(item.pastSurgHistoryId) }} className={classes.Icon} /> </Icon>
                            {isEditable ? <Icon> <img src={Delete} onClick={() => { deleteRecord(item.pastSurgHistoryId) }} className={classes.Icon} /> </Icon> : ''}
                            </div>

                        return { ...item }
                    }));
            }
        })
    }

    const save = () => {
        var validated = true;

        if (!state.surgProcedureCode || state.surgProcedureCode.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                surgProcedureCode: true
            }));
            validated = false;
        }
        if (state.surgeryDate && new Date(state.surgeryDate) > new Date()) {
            setErrorMessages(prevState => ({
                ...prevState,
                surgeryDateInvalid: true
            }));
            validated = false;
            pastSurgicalHistoryRef.dateRef.focus();
        }
        if (!state.surgeryDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                surgeryDate: true
            }));
            validated = false;
            pastSurgicalHistoryRef.dateRef.focus();
        }

        if (validated == false)
            return;

        setLoading({ isSaving: true });
        var method = "encounter/history/surghistory/add";
        if (dataId > 0)
            method = "encounter/history/surghistory/update";

        PostDataAPI(method, state, true).then((result) => {

            setLoading({ isSaving: false });

            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.pastSurgHistoryId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "pastSurgHistoryId": result.data.pastSurgHistoryId
                    }));

                }
                loadGridData();
                setShowAddSurgicalHistory(false);
                showMessage("Success", "Surgical history saved successfully.", "success", 3000);
                handleSave();
            }
            else showMessage("Error", result.message, "error", 8000);
        })

    }

    const deleteRecord = (id) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the record?", "confirm", function () {

            setLoading({ isDeleting: true });

            var data = {
                pastSurgHistoryId: id
            }

            PostDataAPI('encounter/history/surghistory/delete', data, true).then((result) => {

                setLoading({ isDeleting: false });

                if (result.success == true) {
                    // setErrorMessages({});
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    clear();
                    loadGridData();
                    handleSave();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }
    const tableData = {
        columns: columnData,
        rows: rowsData,
    };
    const clear = () => {

        init();
        setErrorMessages({});
        setDataId(0);
        setShowAddSurgicalHistory(true)
    }
    const checkInvalidAdmissionDate = () => {
        return (state.surgeryDate && new Date(state.surgeryDate) > new Date())
    }
    return (
        <>
            <Grid container >
                <Scrollbars style={{ height: 575 }}>
                    <Grid item lg={12} container direction="row">
                        <div style={{ paddingRight: "20px" }}>
                            <Grid item lg={12} container direction="row">

                                {showAddSurgicalHistory || dataId > 0 ?
                                    <>
                                        <Grid container direction="row" lg={12}>
                                            <FormGroupTitle> Add/Edit Past Surgical History
                                            </FormGroupTitle>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Date" size={3} mandatory={true} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >
                                                <InputBaseField
                                                    id="surgeryDate"
                                                    name="surgeryDate"
                                                    type="date"
                                                    value={state.surgeryDate}
                                                    onChange={handleChange}
                                                    inputProps={{ ref: input => pastSurgicalHistoryRef.dateRef = input }}
                                                />
                                                {errorMessages.surgeryDateInvalid && checkInvalidAdmissionDate() ? (<FormHelperText style={{ color: "red" }} >
                                                    Surgery date cannot be in future.
                                                </FormHelperText>) : ('')}
                                                {errorMessages.surgeryDate && (!state.surgeryDate || state.surgeryDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select surgery date.
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Surgical Procedure" mandatory={true} size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >
                                                <SearchList name="surgProcedureCode" value={state.surgProcedureCode} searchTerm={state.surgProcedureName} code="history_procedure"
                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleProcedureChange(name, item)}
                                                    placeholderTitle="Search Surgical Procedure"
                                                />
                                                {errorMessages.surgProcedureCode && (!state.surgProcedureCode || state.surgProcedureCode.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select surgical procedure
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Place of Surgery" size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >
                                                <InputBaseField
                                                    id="surgPlace"
                                                    name="surgPlace"
                                                    value={state.surgPlace}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Post-Op Complications" size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                <InputBaseField
                                                    id="postSurgComplication"
                                                    name="postSurgComplication"
                                                    value={state.postSurgComplication}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Notes" isTextAreaInput={true} size={3} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <TextareaField
                                                    rowsMin={5}
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    name="notes"
                                                    value={state.notes}
                                                    MaxLength="2000"
                                                />
                                                <Grid container direction="row" justify="flex-end" lg={12}>

                                                    {loading.isSaving ?
                                                        <FormBtn id="loadingSave"  > Save</FormBtn>
                                                        :
                                                        <FormBtn id="save" disabled={ !isEditable} onClick={save}  > Save</FormBtn>
                                                    }
                                                    {
                                                        dataId > 0 ?

                                                            loading.isDeleting ?

                                                                <FormBtn id="loadingDelete"  > Delete</FormBtn>

                                                                :
                                                                <FormBtn id="delete" disabled={!isEditable} onClick={() => { deleteRecord(dataId) }}  > Delete</FormBtn>
                                                            : null

                                                    }
                                                    <FormBtn id="reset" onClick={clear} >Add another</FormBtn>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </> :
                                    <>
                                        <div className={classes.btnContainer}>

                                            <Typography className={classes.formBtnTitle}  > Add/Edit Past Surgical History
                                            </Typography>

                                        </div>
                                        <div className={classes.addNewBtn}>
                                            <Grid item xs={1} sm={1} md={1} lg={1} />
                                            <Grid item xs={4} sm={4} md={4} lg={4} >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.addNewButton}
                                                    startIcon={<img src={AddIcon} />}
                                                    onClick={() => setShowAddSurgicalHistory(true)}
                                                >
                                                    Add Past Surgical History
                                                </Button>
                                            </Grid>
                                        </div>
                                    </>}
                                <Grid container direction="row" lg={12}>
                                    <FormGroupTitle>Added Surgical History</FormGroupTitle>
                                    <div className={classes.historyDataTable}>
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
                                                columns={pastHistoryDialogColumns}
                                            />
                                        </div>
                                        {/* <MDBDataTable
                                            className="historyDataTable"
                                            striped
                                            small
                                            btn
                                            searching={false}
                                            data={tableData}
                                        /> */}
                                    </div>
                                </Grid>

                            </Grid>
                        </div>
                    </Grid>
                </Scrollbars>
                <Grid container direction="row" lg={12}>
                    <FooterBtn className={classes.footerBtn}>
                        {/* <FormBtn id="save" onClick={handleNext} btnType="next"> Next</FormBtn> */}
                        <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                    </FooterBtn>
                </Grid>
            </Grid>
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

export default withSnackbar(PastSurgicalHistory)