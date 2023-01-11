import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
//material ui
import {
    FormLabel,
    Button,
    Dialog,
    Grid,
    Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import { withSnackbar } from '../../../../components/Message/Alert'
import { Table, Empty } from 'antd';
import { FormGroupTitle, FormBtn, DraggableComponent, Label } from "../../../../components/UiElements/UiElements";
import { RadioboxField } from "../../../../components/InputField/InputField";
import CloseIcon from "../../../../images/icons/math-plus.png"
import SearchList from "../../../../components/SearchList/SearchList";
import { Add as AddDeleteIcon } from '@material-ui/icons';
import { PostDataAPI } from '../../../../Services/PostDataAPI';


function AddNewAccess({ showHideDialog, handleClose,handleSaveResponse, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({ errorListEmpty: false })
    const [reRender, setReRender] = useState(0);
    const [state, setState] = useState({ userType: 'Provider', userName: '' });

    const [selectedEmergencyUser, setSelectedEmergencyUsers] = useState({ ids: '' });

    const onSave = () => {
        var _emergencyIdsList = [];
        let errorList = []
        var _users = emergencyUsers.filter(_user => _user.isDeleted == false).map((item, index) => {
            _emergencyIdsList.push(parseInt(item.userId));
        })
        if (_emergencyIdsList.length <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorListEmpty: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorListEmpty: false
            }));
        }
       
        if (errorList.length < 1) {
            setIsLoading(true);
            selectedEmergencyUser.ids = _emergencyIdsList.join(", ");
            PostDataAPI("setup/emergencyaccess/add", selectedEmergencyUser, true).then((result) => {
                setIsLoading(false);
                
                if (result.success) {
                    handleSaveResponse();
                }
            });
        } else {
            showMessage("Error", 'Please select at least one Provider/Staff.', "error", 2000);
        }
        
    }

    const onClose = () => {
        handleClose()
    }
    const [emergencyUsers, setEmergencyUsers] = useState([]);

    const handleSearchListChange = (name, item) => {
        
        const { id, value } = item;
        if (id == 0 || value == null || value == '') {
            return;
        }
        var alreadyExist = emergencyUsers.filter(_user => _user.userId == id)
        if (alreadyExist <= 0) {
            const obj = { userId: id, userName: value,isDeleted:false }
            setEmergencyUsers([...emergencyUsers, obj])
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    userName: ''
                }));
                if (reRender == 1) {
                    setReRender(0);
                } else {
                    setReRender(1);
                }
            }, 100);
        } else {
            if (alreadyExist[0].isDeleted == true) {
                let updatedList = emergencyUsers.map((item, i) => item.userId == alreadyExist[0].userId ? { ...item, isDeleted: false } : item);
                setEmergencyUsers(updatedList);
            } else {
                console.log("user already selected");
            }
        }
       
    }
    const deleteUserItem = (code) => {

        let updatedList = emergencyUsers.map((item, i) => item.userId == code ? { ...item, isDeleted: true } : item);
        setEmergencyUsers(updatedList);
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                userName: ''
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);

    }
    const AccessOption = [
        {
            value: "Provider",
            label: "Provider",
            className: 'adjustLabels',
        },
        {
            value: "Staff",
            label: "Staff",
            className: 'adjustLabels',
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                userName: ''
            }));
            if (reRender == 1) {
                setReRender(0);
            } else {
                setReRender(1);
            }
        }, 100);
    }

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={true}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Allow Emergency Access</FormGroupTitle>
                            <span className={classes.crossButton} onClick={onClose}><img src={CloseIcon} /></span>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" lg={12} style={{ margin: "8px 0px" }}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                                <RadioboxField
                                    id="userType"
                                    name="userType"
                                    labelPlacement="end"
                                    onChange={handleChange}
                                    options={AccessOption}
                                    value={state.userType}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12} alignItems="baseline">

                            <Label title="User Name" size={3} />
                            <Grid item xs={9} sm={9} md={9} lg={9} xl={9} style={{ paddingRight: "8px" }}>
                                {state.userType == 'Provider' ?
                                    <SearchList
                                        id="userId"
                                        name="userName"
                                        value={state.userName}
                                        searchTerm={state.userName}
                                        code="get_provider_for_emergency"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search Provider"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        reRender={reRender}/> :
                                    <SearchList
                                        id="userId"
                                        name="userName"
                                        value={state.userName}
                                        searchTerm={state.userName}
                                        code="get_staff_for_emergency"
                                        apiUrl="ddl/loadItems"
                                        placeholderTitle="Search Staff"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        reRender={reRender}                                    />
                                }
                               
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <div className={classes.orderTestContent}>
                                        <ul className={classes.orderList}>
                                            {emergencyUsers ?

                                                emergencyUsers.map((item, i) => {
                                                    if (item.isDeleted == true) { return '' }
                                                    else {
                                                        return (
                                                            <>
                                                                <li>
                                                                    {item.userName}
                                                                    <span className={classes.deleteIcon} onClick={() => deleteUserItem(item.userId)}> <AddDeleteIcon /> </span>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                }
                                                ) : ''
                                            }
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" lg={12}>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "right" }}>
                                <FormBtn id="noIcon" onClick={onSave}>Save </FormBtn>
                                <FormBtn id="reset" onClick={onClose}>Cancel </FormBtn>
                            </Grid>



                        </Grid>

                    </div>
                </div>
            </Dialog>

        </>
    )

}
export default withSnackbar(AddNewAccess)