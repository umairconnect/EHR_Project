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

import PatientSearchList from "../../../../../components/PatientSearchList/PatientSearchList"
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';


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
    const [patientList, setPatientList] = useState([]);
    const classes = useStyles();
    const [state, setState] = useState({ ConsentFormId:0, patientId: 0, patientName: "" });
    const [reRender, setReRender] = useState(0);
    const [rowsData, setRowsData] = useState([]);
    const [formId, setFormId] = useState(props.formId);
    const [formData, setFormData] = useState();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [errorMessages, setErrorMessages] = useState({
        errorPatientID: false
      

    })


    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const loadData = () => {

        
        PostDataAPI("setup/getConsentForm", parseInt(formId)).then((result) => {
            if (result.success && result.data != null) {
               // debugger
                setFormData(result.data);

            }
        })
        PostDataAPI("consentformassignment/getlist", parseInt(formId)).then((result) => {
            if (result.success && result.data != null) {
               // debugger
               
                setPatientList(
                    result.data.map((item, i) => {
                        //debugger
                        return {
                            formAssignmentId: item.formAssignmentId,
                            patientId: item.patientId,
                            chartId: item.chartId,
                            patientName: item.patientName,
                            email: item.email,
                            formVersionCode: item.formVersionCode,
                            consentFormId: item.consentFormId,
                            EncUserID: userInfo.userID
 };
                    }));

            }
        })

    }
 
    const handleSearchPatientList = (name, item, isNegative) => {
        const { id, value } = item;
        if (value === '') {
            return;
        }
       // debugger
        if (patientList.length>0) {
            if (patientList.some(t => t.patientId == id)) {
                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        patientId: '',
                        patientName: '',
                    }));
                    if (reRender == 1) {
                        setReRender(0);
                    } else {
                        setReRender(1);
                    }
                }, 100);

                showMessage("Error", 'Record already selected', "error", 3000);
                return;
            }
        }
        PostDataAPI("patient/getPatient", parseInt(id)).then((result) => {
            if (result.success && result.data != null) {
                //debugger
                var patientName = result.data.firstName + " " + result.data.lastName
                var _patientList = {
                    formAsssignmentId:0,
                    patientId: result.data.patientId,
                    chartId: result.data.chartNumber,
                    patientName: patientName,
                    email: result.data.emailAddress,
                    formVersionCode: formData.formVersionCode,
                    consentFormId: formId,
                    EncUserID: userInfo.userID

                }
                setPatientList([...patientList, _patientList])
            }
        })
        
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                patientId: '',
                patientName: '',
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }
    useEffect(() => {
       // debugger
        loadData();
    }, [showHideDialog]);

    const deleteItem = (item) => {
       // debugger
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this form assignment?", "confirm", function () {
            if (item.formAssignmentId > 0) {
                item.EncUserID = userInfo.userID;
                PostDataAPI("consentformassignment/delete", item).then((result) => {
                    if (result.success && result.data != null) {
                        //debugger
                        setPatientList((current) =>
                            current.filter((itm) => itm.patientId != item.patientId)
                        );

                        showMessage("Success", "Record deleted successfully.", "success", 2000);

                    }
                })
            }
            else {
                setPatientList((current) =>
                    current.filter((itm) => itm.patientId != item.patientId)
                );
                showMessage("Success", "Record deleted successfully.", "success", 2000);
            }
        })
    }
    const save = () => {
       
        if (patientList.length<1)
        {
            
            setErrorMessages(prevState => ({
                ...prevState,
                errorPatientID: true
            }));
           // errorList.push(true);
            return;
        }
        //debugger
        patientList.EncUserID = userInfo.userID;
        PostDataAPI("consentformassignment/add", patientList).then((result) => {
            if (result.success && result.data != null) {
               // debugger
                showMessage("Success", "Record Saved successfully.", "success", 10000);
                setTimeout(function () { handleClose(); }, 500);
            }
        })
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

                                            <Grid item xs={12} sm={8} md={8} lg={7} className={classes.positionR} >

                                                <PatientSearchList
                                                    id="patientId"
                                                    name={state.patientName}
                                                    value={state.patientId}
                                                    onChangeValue={(name, item) => handleSearchPatientList(name, item)}
                                                    placeholderTitle="Search Patient"
                                                    reRender={reRender}
                                                />

                                                {errorMessages.errorPatientID && patientList.length<1 ? (<FormHelperText style={{ color: "red" }}  >
                                                    Please select patient
                                                </FormHelperText>) : ('')}

                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    <Grid container direction="row" lg={12}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <table className={classes.claimStatusTable}>
                                                <thead>
                                                    <tr>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Chart ID</td>
                                                        <td colSpan="2" className={classes.claimStatusTd}>Patient</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Email</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Language</td>
                                                        <td colSpan="1" className={classes.claimStatusTd}>Action</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {patientList?.map((item, i) => {
                                                        return <tr>
                                                            <td colSpan="1">{item.chartId}</td>
                                                            <td colSpan="2">{item.patientName}</td>
                                                            <td colSpan="1">{item.email}</td>
                                                            <td colSpan="1">{item.formVersionCode}</td>
                                                            <td colSpan="1" style={{textAlign: "center"}}><img src={DeleteIcon} onClick={(e) => deleteItem(item)} alt='delete' /></td>
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
                                <FormBtn id="save" onClick={save} btnType="assign" >Assign</FormBtn>
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