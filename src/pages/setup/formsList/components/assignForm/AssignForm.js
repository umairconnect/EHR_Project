import React, { useState, useEffect } from "react";
import {
    Dialog,
    FormLabel,
    Grid,
    Typography,
    FormHelperText,
} from "@material-ui/core";
import CloseIcon from "../../../../../images/icons/math-plus.png";
import DeleteIcon from "../../../../../images/icons/trash.png";
import { SelectField } from "../../../../../components/InputField/InputField";
import { DraggableComponent, FormGroupTitle, Label, FormBtn, } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
// import { GetUserInfo } from '../../../../../Services/GetUserInfo';


function AssignForm({ showHideDialog, handleClose, showMessage, stateProcedures, bulkSelectedRows, ...props }) {
    const list = [
        {
            id: 0,
            chartId: "5465465",
            patientName: "John Doe",
            email: "johndoe@gmail.com",
        },
        {
            id: 1,
            chartId: "5465465",
            patientName: "John Doe",
            email: "johndoe@gmail.com",
        },
    ];
    const classes = useStyles();
    const [state, setState] = useState({ patientId: 0, patientName: "" });
    const [rowsData, setRowsData] = useState([]);

    const handleSearcdhListPatientChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            patientId: id,
            patientName: value
        }));
    }
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const loadData = () => {

        setRowsData(
            list?.map((item, i) => {
                item.key = item.claimSuperbillId
                return { ...item }
            }))
    }
    useEffect(() => {
        loadData();
    }, [showHideDialog]);

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

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                disableEnforceFocus
                maxWidth={'lg'}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Assign Forms</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 200 }}>
                                <Grid container direction="row" lg={12}>

                                    <Grid container lg={12}>
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10}>

                                            <SearchList
                                                id="patientId"
                                                name="patientId"
                                                value={state.patientId}
                                                searchTerm={state.patientName}
                                                code="patient_Search"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleSearcdhListPatientChange(name, item)}
                                                placeholderTitle="Search Patient"
                                            />

                                        </Grid>
                                    </Grid>


                                    <Grid container direction="row" lg={12}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <table className={classes.claimStatusTable}>
                                                <thead>
                                                    <tr>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Claim #</td>
                                                        <td colSpan="2" className={classes.claimStatusTd}>Patient</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Date of Service</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Action</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rowsData?.map((item, i) => {
                                                        return <tr>
                                                            <td colSpan="1">{item.chartId}</td>
                                                            <td colSpan="2">{item.patientName}</td>
                                                            <td colSpan="1">{item.email}</td>
                                                            <td colSpan="1"><img src={DeleteIcon} alt='delete' /></td>
                                                        </tr>
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <Grid container justify="center" >
                                <FormBtn id="save" btnType="assign" >Assign</FormBtn>
                                <FormBtn id="reset" onClick={handleClose}> Cancel </FormBtn>
                            </Grid>
                        </div>
                    </div>

                </div>
            </Dialog >
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
    )
}
export default withSnackbar(AssignForm)