import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
    Grid, 
    Icon,
    Tooltip,
    Dialog,
    Button
} from "@material-ui/core"
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

import { data as gridCnfg2 } from '../../../../../../components/SearchGrid/component/setupData';
import Delete from "../../../../../../images/icons/trash.png";
import Edit from "../../../../../../images/icons/erase.png";
import Add from "../../../../../../images/icons/add-icon.png";
import AddPatientContact from './components/AddPatientContact';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { Table } from 'antd';

function PatientContact(props) {
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics contacts screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    useEffect(() => {
        saveAuditLogInfo();
        loadGridData();
    }, []);


    var classes = useStyles();
    const { showMessage } = props;
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [update, setUpdate] = useState(false);
    const [patientId] = useState(props.dataId);
    const [dataId,setDataId] = useState(-1);
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    })

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

    const [patientContact, setPatientContact] = useState();

    const [addPatientDialog, setAddPatientDialog] = useState(false);


    const handleEdit = (item) => {
       
        setDataId(item.contactId);
        setAddPatientDialog(true);

    }

    const handleDelete = (idToDelete) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {

            var data = {
                contactId: idToDelete
            }

            PostDataAPI('patientcontact/delete', data, true).then((result) => {
                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    loadGridData();
                }
                else {
                    showMessage("Error", result.message, "error", 8000);
                }
            })
        });
    }

    const handleUpdate = () => setUpdate(!update);

    const openAddNew = () => {
        setDataId(-1);
        setAddPatientDialog(true);
    }

    const closeDialog = () => {
        setAddPatientDialog(false);
        setDataId(-1);
        loadGridData();
 
    }

    const closeAddNew = () => {
        setAddPatientDialog(false);
        setDataId(-1);
        loadGridData();
        showMessage("Success", "Record saved successfully.", "success", 2000);
    }

    const closeEdit = () => {
        setAddPatientDialog(false);
        setDataId(-1);
        loadGridData();
        showMessage("Success", "Record updated successfully.", "success", 2000);
    }

    const closeDelete = () => {
        setAddPatientDialog(false);
        setDataId(-1);
        loadGridData();
        showMessage("Success", "Record deleted successfully.", "success", 2000);
    }

    const loadGridData = () => {
      
        var params = {
            patientId: patientId+""
        };
        PostDataAPI("patientcontact/loadGrid", params).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);
                setPatientContact(
                    result.data.map((item, i) => {
                        item.pContactAction =
                            <div style={{ width: "100%" }}>

                            <Tooltip title="Edit">
                                <Icon> <img src={Edit} onClick={() => handleEdit(item)} className={classes.Icon} /> </Icon>
                                </Tooltip>

                            <Tooltip title="Delete">
                                <Icon> <img src={Delete} alt="delete" onClick={() => handleDelete(item.contactId)} className={classes.Icon} /> </Icon>
                                </Tooltip>
                            </div>
                        item.primaryPhone = item.primaryContactTypeCode == "Home Phone" ? item.homePhone :
                            item.primaryContactTypeCode == "Work Phone" ? item.officePhone :
                                item.primaryContactTypeCode == "Mobile Phone" ? item.cellPhone :
                                    ""
                        
                        item.isLegalGuardian = item.isLegalGuardian == true ? "Yes" : "No"
                        item.isGurantor = item.isGurantor == true ? "Yes" : "No"
                        return { ...item }
                    }));
            }
        })
        //let activeData = [
        //    {pContactName:"Umair", 
        //    pContactRelationship:"Cousin Brother", 
        //    pContactMobile:"03335137544",
        //    pContactHomePhone:"0515430306  ",
        //    pContactGuardian:"CDS",
        //    pContactGuarantor: "CDC",
        //    pContactPrimaryPhone: "May 2023",
        //    pContactLanguage: "English",
        //    pContactAction: "These are action"},
        //   
        //    
        //]
        //
        //setPatientContact(
        //    activeData.map((item, i) => {
        //            item.pContactAction = 
        //                  <div style={{ width: "100%"}}>
        //
        //                            <Tooltip title="Edit">
        //                                <Icon> <img src={Edit} className={classes.Icon} /> </Icon>
        //                            </Tooltip>
        //
        //                            <Tooltip title="Delete">
        //                                <Icon> <img src={Delete} className={classes.Icon} /> </Icon>
        //                            </Tooltip>
        //                    </div>
        //            return { ...item }
        //    }));
        


    }

    return (
        <>
            <div className={classes.positionRelative}>
                <>

                  <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <Button
                                size="small"
                                className={classes.newAddBtn2}
                                onClick={() => openAddNew()}
                                disabled={!props.isEditable}
                            >+ Add New
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <span className={classes.title}>Patient Contacts</span>
                        </Grid>
                    </Grid>

                    {/* <EditAbleGrid
                        apiUrl="patient/insurance/authorization/loadGrid"
                        columnCode="PatientContactCode"
                        dataId={props.dataId}
                        isUpdate={update}
                        onAddNew={handleAddNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    /> */}

              
                    <Grid container direction="row" >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                
                            
                                    <div className={'dp-table'}>
                                        <div className="custom-grid">

                                        <Table
                                            checkStrictly={true}
                                            rowClassName={(record, index) => "claimRow"}
                                            scroll={true}
                                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                            dataSource={patientContact}
                                            columns={gridCnfg2["PatientContactCode"]}
                                        />

                                        </div>
                                    </div>
                        
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


            
            </div>
         

           {addPatientDialog ? 
                <>
                    <AddPatientContact patientId={patientId} dataId={dataId} closeAddNew={closeAddNew} closeDialog={closeDialog} closeEdit={closeEdit} closeDelete={closeDelete}></AddPatientContact>
                </> : ''
            }

        </>
    );
}
export default withSnackbar(PatientContact)