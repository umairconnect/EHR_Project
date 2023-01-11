/// 
import React, { useState, useEffect } from "react";
import {
    Grid,
    FormLabel,

} from '@material-ui/core';


import useStyles from "./styles";

import { InputBaseField, TextareaField } from "../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, FooterBtn, ErrorMessage } from "../../../../components/UiElements";

import { MDBInput } from 'mdbreact';

import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../Services/GetDataAPI';

import { withSnackbar } from "../../../../components/Message/Alert";
import LogDialog from "../../../../components/LogDialog/LogDialog";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function FormComponent(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [logdialogstate, setLogDialogState] = useState(false);

    const [dataId, setDataId] = useState(props.dataId);
    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);
    //console.log("Provider form edit checking " + isFormEditable);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [roleRightsList, setRoleRightsList] = useState([]);

    const [role, setRole] = useState({

        roleID: 0, roleName: "", parentRightID: 0, roleDescription: "", createdBy: 0, createDate: new Date().toISOString(), updatedBy: 0,
        userRights: []
    });
    const [errorMessages, setErrorMessages] = useState({ errorRoleName: false, errorDescription: false })

    const [isSaveCall, setIsSaveCall] = useState(false);

    const [rolePermission, setRolePermission] = useState([]);

    const [saveRolePermission, setSaveRolePermission] = useState([]);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setRole(prevrole => ({
            ...prevrole,
            [name]: value
        }));
    };

    const handleChangeRight = e => {

        const { name, value } = e.target;
        let permissionList;

        var _index = name.split('_');


        if (_index[2] == "0") {
            //if (rolePermission[_index[1]].isHidden) {
            //    rolePermission[_index[1]].isHidden = true;
            //    rolePermission[_index[1]].isReadOnly = false;
            //    rolePermission[_index[1]].isEditable = false;
            //} else {
            //    rolePermission[_index[1]].isHidden = true;
            //    rolePermission[_index[1]].isReadOnly = false;
            //    rolePermission[_index[1]].isEditable = false;
            //}
            // rolePermission[_index[1]].isHidden = !rolePermission[_index[1]].isHidden;
            rolePermission[_index[1]].isHidden = true;
            rolePermission[_index[1]].isReadOnly = false;
            rolePermission[_index[1]].isEditable = false;
            if (rolePermission[_index[1]].parentRightId != null && rolePermission[_index[1]].parentRightId <= 0) {
                rolePermission.map((item) => {
                    if (item.parentRightId == rolePermission[_index[1]].rightId) {
                        item.isHidden = true;
                        item.isReadOnly = false;
                        item.isEditable = false;
                    }
                })
            }
            permissionList = rolePermission;

        }
        else if (_index[2] == "1") {

            //if (rolePermission[_index[1]].isReadOnly) {
            //    rolePermission[_index[1]].isHidden = false;
            //    rolePermission[_index[1]].isReadOnly = true;
            //    rolePermission[_index[1]].isEditable = false;
            //} else {
            //    rolePermission[_index[1]].isHidden = false;
            //    rolePermission[_index[1]].isReadOnly = true;
            //    rolePermission[_index[1]].isEditable = false;
            //}

            // rolePermission[_index[1]].isReadOnly = !rolePermission[_index[1]].isReadOnly;
            rolePermission[_index[1]].isHidden = false;
            rolePermission[_index[1]].isReadOnly = true;
            rolePermission[_index[1]].isEditable = false;
            if (rolePermission[_index[1]].parentRightId != null && rolePermission[_index[1]].parentRightId <= 0) {
                rolePermission.map((item) => {
                    if (item.parentRightId == rolePermission[_index[1]].rightId) {
                        item.isHidden = false;
                        item.isReadOnly = true;
                        item.isEditable = false;
                    }
                })
            }
            permissionList = rolePermission;

        }

        else if (_index[2] == "2") {

            //if (rolePermission[_index[1]].isEditable) {
            //    rolePermission[_index[1]].isHidden = false;
            //    rolePermission[_index[1]].isReadOnly = false;
            //    rolePermission[_index[1]].isEditable = true;
            //} else {
            //    rolePermission[_index[1]].isHidden = false;
            //    rolePermission[_index[1]].isReadOnly = false;
            //    rolePermission[_index[1]].isEditable = true;
            //}

            // rolePermission[_index[1]].isEditable = !rolePermission[_index[1]].isEditable;
            rolePermission[_index[1]].isHidden = false;
            rolePermission[_index[1]].isReadOnly = false;
            rolePermission[_index[1]].isEditable = true;
            if (rolePermission[_index[1]].parentRightId != null && rolePermission[_index[1]].parentRightId <= 0) {
                rolePermission.map((item) => {
                    if (item.parentRightId == rolePermission[_index[1]].rightId) {
                        item.isHidden = false;
                        item.isReadOnly = false;
                        item.isEditable = true;
                    }
                })
            }
            permissionList = rolePermission;
        }

        setSaveRolePermission(prevrole => ({
            ...prevrole,
            saveRolePermission: permissionList
        }));

        setRole(prevState => ({
            ...prevState,
            userRights: permissionList
        }));

    };

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }

    useEffect(() => {

        setFormrole();

    }, []);

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "User Role",
            activity: "Load user role details",
            details: "User viewed user role screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function setFormrole() {
        if (dataId > 0 || dataId != "") {
            role.roleID = dataId;
            role.roleName = "";
            role.parentRightID = 0;
            role.roleDescription = "";
            loadData();
            saveAuditLogInfo();
        }
        else {

            setRole({
                roleID: 0, roleName: "", parentRightID: 0, roleDescription: "", createdBy: 0,
                createDate: new Date().toISOString(), updatedBy: 0, userRights: []
            });

            GetDataAPI("role/getRightsPermissions", "").then((result) => {

                if (result.success && result.data != null) {
                    // console.log(result.data);

                    setRolePermission(
                        result.data.map((item, i) => {
                            return {
                                rightId: item.rightId,
                                right_name: item.right_name,
                                rightLabel: item.rightLabel,
                                isHidden: item.isHidden,
                                isReadOnly: item.isReadOnly,
                                isEditable: item.isEditable,
                                parentRightId: item.parentRightId
                            };
                        }));
                    setRole(prevState => ({
                        ...prevState,
                        userRights: result.data.map((item, i) => {
                            return {
                                rightId: item.rightId,
                                right_name: item.right_name,
                                rightLabel: item.rightLabel,
                                isHidden: item.isHidden,
                                isReadOnly: item.isReadOnly,
                                isEditable: item.isEditable,
                                parentRightId: item.parentRightId
                            };
                        })
                    }));
                }

            });




        }
    }

    function loadData(roleId) {
        let _roleId = roleId && roleId > 0 ? roleId : parseInt(dataId);
        GetDataAPI("role/getRoleRightsPermissionsByID", 'id=' + parseInt(_roleId)).then((result) => {

            if (result.success && result.data != null) {

                setRole(prevState => ({
                    ...prevState,
                    roleID: result.data.roleId,
                    roleName: result.data.roleName,
                    parentRightID: result.data.parentRightID,
                    roleDescription: result.data.roleDescription
                }));

                setRolePermission(
                    result.data.userRights.map((item, i) => {
                        return {
                            rightId: item.rightId,
                            right_name: item.right_name,
                            rightLabel: item.rightLabel,
                            isHidden: item.isHidden,
                            isReadOnly: item.isReadOnly,
                            isEditable: item.isEditable,
                            roleAccessRightId: item.roleAccessRightId,
                            roleId: result.data.roleID,
                            createDate: item.createDate,
                            parentRightId: item.parentRightId
                        };
                    }));


            }
            else if (result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }
    function clear() {
        setFormrole();
        setErrorMessages({ errorRoleName: false, errorDescription: false });
    }
    function deleteRecord() {

        setIsDeleteLoading(true);
        role.roleID = parseInt(dataId);
        PostDataAPI('role/DeleteRole', role, true).then((result) => {
            setIsDeleteLoading(false);

            if (result.success == true) {
                setErrorMessages([]);
                if (result.data === 1) {
                    showMessage("success", "Record deleted successfully.", "success", 3000);
                    setDataId(0);

                    setTimeout(() => { BackToSearch(); }, 1000);
                }
                else if (result.data === 2)
                    showMessage("Error", "Selected role is in use cannot be deleted.", "error", 3000);

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                // showMessage('error', result.message);
            }
        })
    }



    function save() {

        let success = true;
        if (!role.roleName || role.roleName.trim() == "") {
            setErrorMessages(prevrole => ({
                ...prevrole,
                errorRoleName: true
            }));
            success = false;
        }

        if (!role.roleDescription || role.roleDescription.trim() == "") {
            setErrorMessages(prevrole => ({
                ...prevrole,
                errorDescription: true
            }));
            success = false;
        }


        if (success == true) {

            setErrorMessages({ errorRoleName: false, errorDescription: false });


            let method = "role/addRole";
            if (dataId > 0) { role.roleID = parseInt(dataId); method = "role/updateRole"; }


            setIsSaveLoading(true);

            PostDataAPI(method, role, true, '').then((result) => {
                setIsSaveLoading(false);

                if (result.success == true) {

                    setErrorMessages([]);
                    if (result.data.isRoleNameExists) {
                        showMessage("Error", "New role name is not unique.", "error", 3000);

                    }
                    else if (result.data == false) {
                        showMessage("Error", "Something went wrong, please check role name is not unique.!", "error", 3000);
                    } else {
                        showMessage("success", "Record saved successfully.", "success", 3000);
                        role.userRights = [];
                        role.roleID = result.data.roleID
                        setDataId(result.data.roleID);
                        loadData(result.data.roleID);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    //showMessage('error', result.message);
                }
            })
        }

    };

    function BackToSearch() {
        document.getElementById("btnSearchGrid").click();

    }
    const ShowActionDialog = (title, message, type,) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            actiondialogstate: true, actiondialogtitle: title, actiondialogmessage: message, actiondialogtype: type
        }));
    }

    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <div></div>
                <Grid container >
                    <FormGroupTitle>Role</FormGroupTitle>

                    <Grid item lg={12} container direction="row">

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            justify="flex-end"
                        >
                            <FormLabel className={classes.lableInput}>Role Name<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                className={classes.baseInput}
                                placeholder="Role Name"
                                name="roleName"
                                value={role.roleName}
                                onChange={handleChange}
                                MaxLength='100'
                            />
                            {errorMessages.errorRoleName && (!role.roleName || role.roleName.trim() == "") ? (<ErrorMessage >
                                Please enter role name
                            </ErrorMessage>) : ('')}
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            justify="flex-end">
                            <FormLabel className={classes.lableInput}>Description<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <TextareaField
                                rowsMin={5}
                                placeholder="Description"
                                onChange={handleChange}
                                name="roleDescription"
                                value={role.roleDescription}
                                MaxLength='500'
                            />
                            {errorMessages.errorDescription && (!role.roleDescription || role.roleDescription.trim() == "") ? (<ErrorMessage textArea={true} >
                                Please enter description
                            </ErrorMessage>) : ('')}
                        </Grid>

                    </Grid>


                    <FormGroupTitle>Permissions</FormGroupTitle>

                    <Grid item xs={12} sm={12} md={12} lg={12} container direction="row" justify="center">

                        <Grid id="header" item container xs={12} lg={10} direction="row">

                            <Grid className={classes.trHeader} item xs={4} sm={4} md={4} lg={4}>
                                <FormLabel></FormLabel>
                            </Grid>
                            <Grid className={classes.trHeader} item xs={2} sm={2} md={2} lg={2}>
                                <FormLabel className={classes.trHeaderLabel}>Hidden</FormLabel>
                            </Grid>
                            <Grid className={classes.trHeader} item xs={2} sm={2} md={2} lg={2}>
                                <FormLabel className={classes.trHeaderLabel}>Read only</FormLabel>
                            </Grid>
                            <Grid className={classes.trHeader} item xs={2} sm={2} md={2} lg={2}>
                                <FormLabel className={classes.trHeaderLabel}>Editable</FormLabel>
                            </Grid>

                        </Grid>

                        {
                            rolePermission ?
                                rolePermission.map((item, i) => (
                                    <Grid item xs={12} lg={10} container direction="row" key={i}>

                                        <Grid item container xs={4} sm={4} md={4} lg={4} alignItems="center" className={classes.gridRowBottomLeft}>
                                            {item.parentRightId > 0 ?
                                                <FormLabel className={classes.griLabelChild}>{item.rightLabel}</FormLabel>
                                                : <FormLabel className={classes.griLabel}>{item.rightLabel}</FormLabel>
                                            }

                                        </Grid>

                                        <Grid item xs={2} sm={2} md={2} lg={2} className={classes.gridRowBottom}>
                                            <MDBInput type="checkbox" className={classes.griLabel}
                                                color="primary"
                                                onChange={handleChangeRight}
                                                name={item.right_name + "_" + i + "_0"}
                                                checked={rolePermission[i].isHidden}

                                            />
                                        </Grid>

                                        <Grid item xs={2} sm={2} md={2} lg={2} className={classes.gridRowBottom}>
                                            <MDBInput type="checkbox" className={classes.griLabel}
                                                color="primary"
                                                onChange={handleChangeRight}
                                                name={item.right_name + "_" + i + "_1"}
                                                checked={rolePermission[i].isReadOnly}

                                            />
                                        </Grid>

                                        <Grid item xs={2} sm={2} md={2} lg={2} className={classes.gridRowBottomRight} >
                                            <MDBInput type="checkbox" className={classes.griLabel}
                                                color="primary"
                                                onChange={handleChangeRight}
                                                name={item.right_name + "_" + i + "_2"}
                                                checked={rolePermission[i].isEditable}

                                            />
                                        </Grid>

                                    </Grid>

                                ))
                                : null
                        }

                    </Grid>

                    <Grid item lg={10} container direction="row">
                        {/* <Grid item lg={3}
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end">

                        </Grid> */}
                        {/* Press Ok to continue and Cancel to stay on the screen. */}
                        <Grid item xs={1} sm={1} md={1} lg={1} />
                        <Grid item xs={4} sm={4} md={4} lg={4} >
                            <div className={classes.footer}>

                                {isSaveLoading ?
                                    <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>
                                    : <FormBtn id={"save"} onClick={save} size="medium" disabled={!isFormEditable}>Save</FormBtn>
                                }
                                {dataId != 0 ?
                                    isDeleteLoading ?
                                        <FormBtn id={"loadingDelete"} size="medium">Delete</FormBtn> :
                                        <FormBtn id={"delete"} onClick={() => ShowActionDialog("Delete", "Are you sure, you want to delete role? ", "confirm")}
                                            size="medium" disabled={!isFormEditable}>Delete</FormBtn>
                                    : null
                                }
                                <FormBtn id={"resetBtn"} onClick={clear} size="medium" >Reset </FormBtn>

                                {dataId != 0 ?
                                    <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                    : null
                                }
                            </div>

                        </Grid>
                    </Grid>


                </Grid>
            </ShadowBoxMin>

            <LogDialog
                code="role"
                id={dataId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => setLogDialogState(dialogstate)}
            />

            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={deleteRecord}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    );
}

export default withSnackbar(FormComponent)
