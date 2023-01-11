
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import "../styles.css";
import { Grid, FormHelperText, Typography, Icon, Button } from '@material-ui/core';
import Erase from "../../../../../../images/icons/erase.png";
import Delete from "../../../../../../images/icons/trash.png";
import AddIcon from '../../../../../../images/icons/add-icon.png';
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
// import { Search as SearchIcon } from "@material-ui/icons";
// import LockIcon from '@material-ui/icons/Lock';
import SearchList from "../../../../../../components/SearchList/SearchList";
import { FormBtn, FormGroupTitle, FooterBtn, Label } from "../../../../../../components/UiElements";
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { InputBaseField, InputBaseFieldNumber, TextareaField, RadioboxField } from "../../../../../../components/InputField";
//import { SelectField } from "../../../../../../components/InputField";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { Scrollbars } from 'rc-scrollbars';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { Empty, Table } from "antd";
import "../../../../../../components/antd.css";
import "../../../../../../components/SearchGrid/antStyle.css";

function PastHospitalization({ handleClose,handleSave, handleNext, ...props }) {

    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable)
    // handle styles
    var classes = useStyles();
    const [showAddHospitalization, setShowAddHospitalization] = useState(false);
    const [state, setState] = useState({ hospTypeCode: "Hospitalization" });
    const [dataId, setDataId] = useState(0);
    const [patientId] = useState(props.patientId);
    const [errorMessages, setErrorMessages] = useState({});
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });

    const pastHospitalizationRef = useState({ admissionDateRef: "", stayLengthRef: "", });

    //drop down list.
    const [lstStatus, setLstStatus] = useState([]);
    //end drop down lists
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
    const [isLoading, setIsLoading] = useState(false);
    //
    const [columnData] = useState([
        {
            label: '',
            field: 'patientId',
            width: 270,
            hidden: true
        },
        {
            label: 'Date',
            field: 'admissionDateString',
            width: 270,
            hidden: true
        },
        {
            label: 'Related',
            field: 'relatedToName',
            width: 270
        },
        {
            label: 'Length of stay',
            field: 'stayLength',
            width: 270
        },
        {
            label: 'Procedure',
            field: 'procedureName',
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
            dataIndex: 'admissionDateString',
            className: "width150",
        },
        {
            title: 'Related',
            dataIndex: 'relatedToName',
            className: "width150",
        },
        {
            title: 'Length of stay',
            dataIndex: 'stayLength',
            className: "width150",
        },
        {
            title: 'Procedure',
            dataIndex: 'procedureName',
            className: "width150",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width100",
        }
    ];
    const [rowsData, setRowsData] = useState([]);

    const optionsList = [
        { value: 0, label: "Option 1" },
        { value: 1, label: "Option 2" },
        { value: 2, label: "Option 3" },
    ];
    const radioBoxList = [
        { value: "Hospitalization", label: "Hospitalization" },
        { value: "LongTermcare", label: "Long Term care" },
        { value: "Hospice", label: "Hospice" },
    ];
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProblemChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "relatedToName": value
        }));
    }

    const handleProcedureChange = (name, item) => {

        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            [name]: id
        }));
        setState(prevState => ({
            ...prevState,
            "procedureName": value
        }));
    }

    const tableData = {
        columns: columnData,
        rows: rowsData,
    };
    const init = () => {
        setState({
            pastHospHistoryId: 0,
            patientId: parseInt(patientId),
            hospTypeCode: "Hospitalization",
            admissionDate: "",
            relatedToCode: "",
            stayLength: "",
            procedureCode: "",
            procedureName: "",
            statusCode: "",
            notes: "",
            createDate: new Date()
        });
    }

    useEffect(() => {
        init();
        loadGridData();

        var params = {
            code: "DDL_List_Item",
            parameters: ['HOSPITALIZATION_STATUS_CODE']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var _status = [];

                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'HOSPITALIZATION_STATUS_CODE':
                            _status.push({ value: item.text1, label: item.text2 });
                            break;
                    }
                })
                setLstStatus(_status);
            }

        });
    }, []);

    const loadGridData = () => {
        //filtervalues.loggedinUserId = userInfo.userID;
        GetDataAPI("encounter/history/hosphistory/getList", "patientId=" + patientId).then((result) => {

            if (result.success) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.action =
                            <div style={{ width: "48px" }}>
                                <Icon> <img src={Erase} onClick={() => { loadData(item.pastHospHistoryId) }} className={classes.Icon} /> </Icon>
                            {isEditable ? <Icon> <img src={Delete} onClick={() => { deleteRecord(item.pastHospHistoryId) }} className={classes.Icon} /> </Icon>:''}
                            </div>
                        return { ...item }
                    }));
            }
        })
    }

    const loadData = (id) => {
        setIsLoading(true);
        init();
        GetDataAPI("encounter/history/hosphistory/get", "hospHistoryId=" + id).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                if (result.data.surgeryDate)
                    result.data.surgeryDate = result.data.surgeryDate.split('T')[0];

                if (result.data.admissionDate)
                    result.data.admissionDate = result.data.admissionDate.split('T')[0];

                setState(result.data);
                setDataId(result.data.pastHospHistoryId);
            }

        })
    }
    const save = () => {
        var validated = true;
        if (state.stayLength)
            state.stayLength = parseFloat(state.stayLength);

        if (!state.stayLength || state.stayLength < 1) {
            setErrorMessages(prevState => ({
                ...prevState,
                stayLength: true
            }));
            validated = false;
            pastHospitalizationRef.stayLengthRef.focus();
        }
        if (state.admissionDate && new Date(state.admissionDate) > new Date()) {
            setErrorMessages(prevState => ({
                ...prevState,
                admissionDateInvalid: true
            }));
            validated = false;
            pastHospitalizationRef.admissionDateRef.focus();
        }
        if (!state.admissionDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                admissionDate: true
            }));
            validated = false;
        }


        if (validated == false)
            return;

        setLoading({ isSaving: true });

        var method = "encounter/history/hosphistory/add";
        if (dataId > 0)
            method = "encounter/history/hosphistory/update";

        PostDataAPI(method, state, true).then((result) => {

            setLoading({ isSaving: false });
            if (result.success && result.data != null) {

                if (dataId < 1) {
                    setDataId(result.data.pastHospHistoryId);

                    setState(prevState => ({
                        ...prevState,
                        "createdBy": result.data.createdBy
                    }));
                    setState(prevState => ({
                        ...prevState,
                        "pastHospHistoryId": result.data.pastHospHistoryId
                    }));

                }
                setShowAddHospitalization(false);
                showMessage("Success", "Hospitalization history saved successfully.", "success", 3000);
                loadGridData();
                handleSave();
            }
            else showMessage("Error", result.message, "error", 8000);
        })

    }

    const deleteRecord = (id) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the record?", "confirm", function () {

            setLoading({ isDeleting: true });
            var data = {
                pastHospHistoryId: id
            }

            PostDataAPI('encounter/history/hosphistory/delete', data, true).then((result) => {

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
    const clear = () => {
        init();
        setErrorMessages({});
        setDataId(0);
        setShowAddHospitalization(true);
    }
    const checkInvalidAdmissionDate = () => {
        return (state.admissionDate && new Date(state.admissionDate) > new Date())
    }
    return (
        <>
            <Grid container >
                <Scrollbars style={{ height: 575 }}>
                    <Grid item lg={12} container direction="row">
                        <div style={{ paddingRight: "20px" }}>
                            <Grid item lg={12} container direction="row">

                                {showAddHospitalization || dataId > 0 ?
                                    <>
                                        <Grid container direction="row" lg={12}>
                                            <FormGroupTitle>Add/Edit Hospitalization</FormGroupTitle>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={1} sm={1} md={1} lg={1} />
                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <RadioboxField
                                                    id="hospTypeCode"
                                                    name="hospTypeCode"
                                                    value={state.hospTypeCode}
                                                    options={radioBoxList}
                                                    labelPlacement="end"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Admission Date" mandatory={true} size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >
                                                <InputBaseField
                                                    id="admissionDate"
                                                    name="admissionDate"
                                                    type="date"
                                                    value={state.admissionDate}
                                                    onChange={handleChange}
                                                    inputProps={{ ref: input => pastHospitalizationRef.admissionDateRef = input }}

                                                />
                                                {errorMessages.admissionDateInvalid && checkInvalidAdmissionDate() ? (<FormHelperText style={{ color: "red" }} >
                                                    Admission date cannot be in future.
                                                </FormHelperText>) : ('')}
                                                {errorMessages.admissionDate && (!state.admissionDate || state.admissionDate.trim() == "") ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select admission date.
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Related to" size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >

                                                <SearchList name="relatedToCode" value={state.relatedToCode} searchTerm={state.relatedToName} code="diagnosis"
                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleProblemChange(name, item)}
                                                    placeholderTitle="Search Diagnosis"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Length of stay" mandatory={true} size={3} />
                                            <Grid item xs={11} sm={4} md={4} lg={4} >
                                                <InputBaseFieldNumber
                                                    type="number"
                                                    id="stayLength"
                                                    name="stayLength"
                                                    placeholder="Length of stay"
                                                    value={state.stayLength}
                                                    onChange={handleChange}
                                                    inputProps={{ ref: input => pastHospitalizationRef.stayLengthRef = input }}

                                                />
                                                {errorMessages.stayLength && (!state.stayLength || parseInt(state.stayLength) < 0) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter length of stay.
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                            <Grid item xs={1} sm={1} md={1} lg={1} >
                                                <Typography className={classes.daysLabel}>Day(s)</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Procedure" size={3} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} >


                                                <SearchList name="procedureCode" value={state.procedureCode}
                                                    searchTerm={state.procedureName} code="history_procedure"
                                                    apiUrl="ddl/loadItems" onChangeValue={(name, item) => handleProcedureChange(name, item)}
                                                    placeholderTitle="Search Procedure"
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

                                                    <FormBtn id="save" disabled={!isEditable } onClick={save}  > Save</FormBtn>
                                                    {
                                                        dataId > 0 ?
                                                            loading.isDeleting ?
                                                                <FormBtn id="loadingDelete" > Delete</FormBtn>
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
                                            <Typography className={classes.formBtnTitle} > Add/Edit Hospitalization</Typography>
                                        </div>
                                        <div className={classes.addNewBtn}>
                                            {/* <Grid container direction="row" lg={12}>
                                                <Grid item xs={1} sm={1} md={1} lg={1} />
                                                <Grid item xs={12} sm={8} md={8} lg={8} >
                                                    <RadioboxField
                                                        id="hospTypeCode"
                                                        name="hospTypeCode"
                                                        value={state.hospTypeCode}
                                                        options={radioBoxList}
                                                        labelPlacement="end"
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <CustomDivider Orientation="horizontal" isLight={true} Varient="middle" /> */}

                                            <Grid container direction="row" lg={12}>
                                                <Grid item xs={1} sm={1} md={1} lg={1} />
                                                <Grid item xs={4} sm={4} md={4} lg={4} >
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.addNewButton}
                                                        startIcon={<img src={AddIcon} />}
                                                        onClick={() => setShowAddHospitalization(true)}
                                                    >
                                                        Add Hospitalization
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </>
                                }

                                {/* <Grid container direction="row" lg={12}>
                                    <FormGroupTitle></FormGroupTitle>
                                </Grid> */}

                                <Grid container direction="row" lg={12}>

                                    <FormGroupTitle>Added Hospitalization History</FormGroupTitle>
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
                        {/* {loading.isSaving ?
                            <FormBtn id="loadingSave" > Next</FormBtn>
                            :
                            <FormBtn id="save" onClick={handleNext} btnType="next" > Next</FormBtn>
                        } */}
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

export default withSnackbar(PastHospitalization)