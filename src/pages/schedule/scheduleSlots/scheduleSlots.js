import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import {
    Container,
    Button,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    FormHelperText,
    Grid as MaterialGrid,
    // Chip,
    //Popover,
    //FormControl,
    //Checkbox,
    //FormControlLabel,
    //InputBase
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import {
//     Search as SearchIcon
// } from "@material-ui/icons";
import BtnIcon from '../../../images/BtnIcon.png';
import CloseIcon from "../../../images/icons/math-plus.png";
import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import { SelectField, InputBaseField } from '../../../components/InputField'
import { FormBtn, DraggableComponent, FormGroupTitle, Label } from '../../../components/UiElements/UiElements'
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle";
import ScheduleSlotsForm from "./component/scheduleSlotForm";
// import Grid from "../../../components/SearchGrid/Grid";
import { GetUserRolesRights } from '../../../Services/GetUserRolesRights';
import { UserRoleRights } from "../../../context/StaticDropDowns";

import { withSnackbar } from "../../../components/Message/Alert";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../Services/GetUserInfo';
// import { GetDataAPI } from '../../../Services/GetDataAPI';
//
import { data as gridCnfg } from '../../../components/SearchGrid/Data/SetupData';
// import { MDBInput, MDBDataTable } from 'mdbreact';
import Skeleton from '@material-ui/lab/Skeleton';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
//
// import { SearchPanelSetupData as SearchPanelData } from '../../../components/SearchPanel/Data/SetupData';
import SearchGridForm from "../../../components/SearchPanel/SearchGridForm";
//
import { data as gridCnfg1 } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";//Row
import '../../../components/SearchGrid/antStyle.css';
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
//
function ScheduleSlots(props) {
    const history = useHistory();
    var classes = useStyles();
    const [ScheduleSlotsPage, setScheduleSlotsPage] = useState(false);
    const [title, setTitle] = useState('Schedule Slots');
    const [isupdated, setIsUpdated] = useState({ update: false });
    const [dataId, setDataId] = useState('');

    const { showMessage } = props;

    const [open, setOpen] = React.useState();

    // code for role rights access : start
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isRoleRightChecked, setIsRoleRightChecked] = useState(false);
    //To default primary location and provider
    const [primaryLocationId, setPrimaryLocationId] = useState(0);
    const [primaryProviderId, setPrimaryProviderId] = useState(0);

    let user_role_rights_list = JSON.parse(GetUserRolesRights());

    if (user_role_rights_list != null && !isRoleRightChecked) {

        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == "ScheduleSlots" && objRights.permissionCode == UserRoleRights.Editable);
        if (isEditable != null && isEditable.length > 0) {
            setIsEditable(true);
            setIsRoleRightChecked(true);
        }
        else
            setIsRoleRightChecked(true);

    }

    // code for role rights access : end~

    const [formopen, setFormOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIds, setSelectedIds] = useState([]);
    // const [selectedIds,setSelectedIds] = useState([]);

    const [locations, setLocations] = useState([]);
    const [providers, setProviders] = useState([]);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    //
    const [state, setState] = useState({
        providerID: userInfo.isProvider ? userInfo.userID : 0, userLocationID: 0
    });


    const [errorMessages, setErrorMessages] = useState({
        errorProvider: false, errorLocation: false
    })
    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        dialogactiontype: null, actiondialogstate: false, actiondialogtitle: "Title",
        actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const getMonthDate = (value) => {
        let date = new Date();
        let y = date.getFullYear(); let m = date.getMonth()
        if (value == true) {
            let today = date.getDate();
            let newdate = "";
            if (m < 9) {
                if (today < 9) {
                    newdate = y + `-0${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-0${m + 1}` + `-${date.getDate()}`
                }
            } else {
                if (today < 9) {
                    newdate = y + `-${m + 1}` + `-0${date.getDate()}`
                } else {
                    newdate = y + `-${m + 1}` + `-${date.getDate()}`
                }
            }
            return newdate;
        }
        else {
            let date = new Date(y, m + 1, 0);
            let newdate = "";
            if (m < 9) {
                newdate = y + `-0${m + 1}` + `-${date.getDate()}`
            } else {
                newdate = y + `-${m + 1}` + `-${date.getDate()}`
            }
            return newdate;
        }
        return date;
    }

    const getEndMonthDate = () => {
        var date = new Date();
        date = new Date(date.setDate(date.getDate() + 30))
        return date.toISOString().split('T')[0];
    }
    const getCurrentDate = () => {
        var date = new Date();
        //date = new Date(date.setDate(date.getDate() + 30))
        return date.toISOString().split('T')[0];
    }

    const [values, setValues] = useState({
        "from_date": getCurrentDate(),
        "to_date": getEndMonthDate(),
        "from_time": "08:00",
        "to_time": "18:00",
    });


    const addNew = () => {
        setScheduleSlotsPage(true);
        setIsFormEditable(isEditable);
        setTitle("Create Schedule");
    };
    const handleRowClick = (id) => {
        setDataId(id);
        setScheduleSlotsPage(true);
        setIsFormEditable(true);
        setTitle("Edit Schedule");
    };
    const backButton = () => {
        setScheduleSlotsPage(false);
        setIsFormEditable(isEditable);
        setTitle("Schedule Slots");
        setDataId('');
        loadData();
    }
    const getId = dataId => {
        setDataId(dataId);
        setScheduleSlotsPage(true);
        setIsFormEditable(isEditable);
        setTitle("Edit Schedule Slot");
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleUnBlock = () => {
        update("unblock");
    };
    const handleSaveForm = () => {
        
        var success = true;
        if (!state.providerID || state.providerID == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: true
            }));
            success = false;
        }else{
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocation: false
            }));
        }
        if (!state.userLocationID || state.userLocationID == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProvider: true
            }));

            success = false;
        }else{
            setErrorMessages(prevState => ({
                ...prevState,
                errorProvider: false
            }));
        }
        if (success){
            update("userlocation");
            setFormOpen(false);
        }
    };
    const handleOpenForm = () => {
        if (selectedIds.length < 1) {
            showMessage('Error', "Please select at least one record to perform the action", 'error');
            return;
        }
        let isConfirmed = false;
        rowsData.map((item, i) => {
            if (item.isConfirmed == true) {
                for (var i = 0; i < selectedIds.length; i++) {
                    if (selectedIds[i] == item.providerSlotID)
                        isConfirmed = true;
                }
            }
        });
        if (isConfirmed == true) {
            showMessage('Error', "There are active appointment(s) against selected slot(s) , location/provider cannot be changed.", 'error');
            return;
        }
        setState({ providerID: userInfo.isProvider ? userInfo.userID : primaryProviderId, userLocationID: primaryLocationId });
        setFormOpen(true);
    };
    const handleCloseForm = e => {
        setFormOpen(false);
    }

    const update = (action) => {
        if (selectedIds.length < 1) {
            showMessage('Error', "Please select at least one record to perform the action", 'error');
            return;
        }


        if (action == "unblock") {
            let unblock = false
            let booked = false
          
            rowsData.map((item, i) => {
                /*if (item.statusCode != "Blocked") {
                    for (var i = 0; i < selectedIds.length; i++) {
                        if (selectedIds[i] == item.providerSlotID)
                            unblock = true;
                    }
                }*/
                if (item.statusCode == "Booked") {
                    for (var i = 0; i < selectedIds.length; i++) {
                        if (selectedIds[i] == item.providerSlotID)
                            booked = true;
                    }
                }
            });
            
            if (unblock == true) {
                showMessage('Error', "Selection contains unblocked slot(s), please unselect unblocked slot(s) first.", 'error');
                return;
            }
            if (booked == true) {
                showMessage('Error', "Selection contains booked slot(s), please unselect booked slot(s) first.", 'error');
                return;
            }
        }

        if (action == "userlocation") {
            let booked = false
            rowsData.map((item, i) => {
                if (item.statusCode == "Booked") {
                    for (var i = 0; i < selectedIds.length; i++) {
                        if (selectedIds[i] == item.providerSlotID)
                            booked = true;
                    }
                }
            });
            if (booked == true) {
                showMessage('Error', "Location cannot be changed on booked slot(s), please unselect booked slot(s) first.", 'error');
                return;
            }
        }
        const data = {
            action: action,
            SlotIDs: selectedIds
        }
        if (action == "userlocation") { data.userLocationID = parseInt(state.userLocationID); }

        PostDataAPI('scheduler/updateProviderSlot', data, true).then((result) => {
            
            if (result.success == true) {
                setErrorMessages({
                    errorLocation: false, errorProvider: false
                });
                if (action == "delete")
                    showMessage('Success', "Selected record(s) deleted successfully.", 'success');
                else
                    showMessage('Success', "Selected record(s) updated successfully.", 'success');
                //setSelectedIds([]);

                loadData();
            }
            else {
                showMessage('Error', result.message, 'error');
            }

        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleProviderChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        getUserLocations(value, false);

    };

    const handleSelection = e => {

        if (e.target.checked == true) {
            var arr = selectedIds;
            arr.push(parseInt(e.target.name));
            setSelectedIds(arr);
            setIsUpdated({ update: true });
        }
        else {
            const index = selectedIds.indexOf(parseInt(e.target.name));
            if (index > -1) {
                var arr = selectedIds;
                arr.splice(index, 1);
                setIsUpdated({ update: true });
                setSelectedIds(arr);
            }
        }
    }

    const getUserLocations = (userID, encUID) => {

        let data = {
            userID: userID
        }
        var method = "user/getUserLocations";
        if (encUID == false)
            method = "user/getProviderLocations";


        PostDataAPI(method, data).then((result) => {

            if (result.success && result.data != null) {
                var pLocationId = 0;
                setLocations(

                    result.data.map((item, i) => {

                        if (item.text2 == "True")
                            pLocationId = item.id;

                        return { value: item.id, label: item.text1 };
                    }));

                if (pLocationId > 0) {
                    setState(prevState => ({
                        ...prevState,
                        userLocationID: pLocationId
                    }));
                    setPrimaryLocationId(pLocationId);

                }
                else {
                    setPrimaryLocationId(0);
                }
            }

        })
    };
    const isChecked = (item) => {
        return selectedIds.includes(parseInt(item), 0);
    }
    const loadData = (filtervalues) => {
        let filter = {};
        if (filtervalues) {
            filter = filtervalues;
        } else { filter = values }
        filter.loggedinUserId = userInfo.userID;
        //Clear selections
        setSelectedIds([]);
        PostDataAPI("scheduler/loadProviderSlotGrid", filter).then((result) => {

            if (result.success) {
                setIsLoading(false);

                //console.log(result.data);
                //setRowsData(result.data);
                setRowsData(
                    result.data.map((item, i) => {
                        console.log(item.statusCode)
                        item.statusCode = item.isBreak == 1 ? "Break" : item.statusCode;
                        item.statusCode = <span className={
                            item.statusCode == "Open" ? classes.OpenStatus :
                                item.statusCode == "Booked" ? classes.BookedStatus :
                                    item.statusCode == "Blocked" ? classes.BlockedStatus :
                                        item.statusCode == "Break" ? classes.BreakStatus :
                                            ""} >
                            {item.statusCode}
                        </span >




                        item.key = item.providerSlotID
                        // name={item[gridCnfg["ScheduleSlots"][0].field]} - 
                        // item.check = <MDBInput type="checkbox" name={item[gridCnfg["ScheduleSlots"][0].field].toString()} onChange={handleSelection} color="primary" />
                        return { ...item, clickEvent: e => handleClick(e, item[gridCnfg["ScheduleSlots"][0].field]) }
                    }));
            }
            else {
                // console.log(result.message)
                setIsLoading(false);
            }
        })

    }
    useEffect(() => {
        let loginUser = JSON.parse(GetUserInfo()).user
        loadData();

        if (userInfo.isProvider == true) {

            getUserLocations(userInfo.userID, true);
        }
        if (userInfo.isProvider == false) {

            let data = {
                userID: userInfo.userID
            }

            PostDataAPI("user/getStaffProviders", data).then((result) => {

                if (result.success && result.data != null) {
                    var primProviderId = 0;
                    setProviders(
                        result.data.map((item, i) => {
                            if (item.p1 == "True")
                                primProviderId = item.id;

                            return { value: item.id, label: item.text1 + ' ' + item.text2 };
                        }));

                    if (userInfo.isProvider == false && primProviderId > 0) {
                        setState(prevState => ({
                            ...prevState,
                            providerID: primProviderId
                        }));
                        setPrimaryProviderId(primProviderId);
                        getUserLocations(primProviderId, false);
                    }
                    else {
                        setPrimaryProviderId(0);
                    }
                }
            })
        }
    }, []);
    const tableData = {
        columns: gridCnfg["ScheduleSlots"],
        rows: rowsData,
    };
    const handleClick = (dataId) => {
        if (props.rowClick)
            props.rowClick(dataId);
    };
    const ShowActionDialog = (actiontype, title, message, type,) => {
        if (selectedIds.length < 1) {
            showMessage('Error', "Please select at least one record to perform the action", 'error');
            return;
        }
        let isConfirmed = false;
        rowsData.map((item, i) => {
            if (item.isConfirmed == true) {
                for (var i = 0; i < selectedIds.length; i++) {
                    if (selectedIds[i] == item.providerSlotID)
                        isConfirmed = true;
                }
            }
        });
        if (isConfirmed == true) {
            showMessage('Error', "There are active appointment(s) against selected slot(s) , Slot(s) cannot be " + (title == "Block" ? "blocked." : "deleted."), 'error');
            return;
        }
        if (title == "Block") {
            let block = false
            rowsData.map((item, i) => {
                if (item.statusCode == "Blocked") {
                    for (var i = 0; i < selectedIds.length; i++) {
                        if (selectedIds[i] == item.providerSlotID)
                            block = true;
                    }
                }
            });
            if (block == true) {
                showMessage('Error', "Please unselect blocked slots and try again.", 'error');
                return;
            }

        }

        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type
        }));
    }
    const onSearchSubmit = (searchvalues) => {
        setValues(searchvalues);
        loadData(searchvalues);
    }
    ///////
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedIds(selectedRowKeys)
    }
    // const [isLoading, setIsLoading] = useState(false);
    ///////
    return (
        <>
            <PageTitle title={title} button={
                ScheduleSlotsPage ? <Button
                    size="small"
                    id='btnSearchGrid'
                    className={classes.newAddBtn}
                    onClick={backButton}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Schedule Slots
                </Button> : <Button
                    size="small"
                    id="btnIdGetPayers"
                    className={classes.newAddBtn}
                    startIcon={< ArrowBackIosIcon />}
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Back to Setup
                </Button>
            } />
            {ScheduleSlotsPage ?
                <Container maxWidth={false}>

                    <ScheduleSlotsForm dataId={dataId} isFormEditable={isFormEditable} />

                </Container>
                :
                <Container maxWidth={false} className={classes.positionRelative}>
                    <>
                        <>
                            <Button
                                size="small"
                                className={classes.newAddBtn2}
                                onClick={addNew}
                                disabled={!isEditable}>+ Add New
                            </Button>
                            <Button aria-label="delete" className={classes.menuBtn}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}>
                                <img src={BtnIcon} />
                            </Button>
                        </>


                        <Popper className={classes.poper} open={open} anchorEl={anchorRef.current} role={undefined} >
                            <Paper>
                                <ClickAwayListener onClickAway={handleToggle}>
                                    <MenuList disableAutoFocusItem className={classes.menu} id="menu-list-grow">
                                        <MenuItem className={classes.menuitem} disabled={ !isEditable} onClick={() => ShowActionDialog(true, "Block", "Are you sure, you want to block selected record(s). Please note, system will move selected slots appointments to orphan state.", "confirm")}>Block</MenuItem>
                                        <MenuItem className={classes.menuitem} disabled={!isEditable} onClick={handleUnBlock}>Unblock</MenuItem>
                                        <MenuItem className={classes.menuitem} disabled={ !isEditable} onClick={() => ShowActionDialog(false, "Delete", "Are you sure, you want to delete selected record(s).Please note, system will move selected slot's appointments to orphan state.", "confirm")}>Delete</MenuItem>
                                        <MenuItem className={classes.menuitem} disabled={!isEditable} onClick={handleOpenForm}> {userInfo.isProvider == true ? ('Change Location') : ('Change Location/Provider')}</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Popper>

                        <>
                            <Dialog
                                PaperComponent={DraggableComponent}
                                // maxWidth="xs" open={formopen}
                                // onClose={handleCloseForm}
                                // PaperComponent={DraggableComponent}
                                classes={{ paper: classes.dialogPaper }}
                                open={formopen}
                                disableBackdropClick
                                disableEscapeKeyDown
                                // open={showHideDialog}
                                {...props}
                                maxWidth={"lg"}>

                                <div className={classes.dialogContent}>

                                    <div className={classes.box}>
                                        <div className={classes.header} id="draggable-dialog-title">
                                            <FormGroupTitle>{userInfo.isProvider == true ? ('Change Location') : ('Change Location/Provider')}</FormGroupTitle>
                                            <span className={classes.crossButton} onClick={handleCloseForm}><img src={CloseIcon} /></span>
                                        </div>
                                        <div className={classes.content}>
                                            <MaterialGrid item lg={12} md={12} sm={12} xs={12} container direction="row">
                                                <MaterialGrid item lg={12} md={12} sm={12} xs={6} container direction="row">
                                                    {/* <MaterialGrid item lg={4} md={4} sm={4} xs={4}
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                    >
                                                        <FormLabel className={classes.Selectlabel} >Provider:</FormLabel>
                                                    </MaterialGrid> */}
                                                    <Label title="Provider" size={4} />
                                                    <MaterialGrid item lg={8} >
                                                        {
                                                            userInfo.isProvider ? (<InputBaseField
                                                                placeholder="Provider Name"
                                                                onChange={handleChange}
                                                                name="providerName"
                                                                value={`${userInfo.firstName.trim()} ${userInfo.lastName.trim()}`}
                                                                MaxLength='255'
                                                                disabled
                                                            />) : (
                                                                <SelectField
                                                                    placeholder="Select Provider"
                                                                    onChange={handleProviderChange}
                                                                    name="providerID"
                                                                    value={state.providerID}
                                                                    MaxLength='255'
                                                                    options={providers}
                                                                />
                                                            )
                                                        }
                                                        {
                                                            errorMessages.errorProvider && !state.providerID ? (<FormHelperText style={{ color: "red" }} >
                                                                Please select Provider
                                                            </FormHelperText>) : ('')}
                                                    </MaterialGrid>
                                                </MaterialGrid>

                                                <MaterialGrid item lg={12} container direction="row">
                                                    {/* <MaterialGrid item lg={4}
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                    >
                                                        <FormLabel className={classes.Selectlabel} >Location:</FormLabel>
                                                    </MaterialGrid> */}
                                                    <Label title="Location" size={4} />
                                                    <MaterialGrid item lg={8} >
                                                        <SelectField

                                                            placeholder="Select Location"
                                                            onChange={handleChange}
                                                            name="userLocationID"
                                                            value={state.userLocationID}
                                                            MaxLength='255'
                                                            options={locations}
                                                        />
                                                        {errorMessages.errorLocation && !state.userLocationID  ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select Location
                                                        </FormHelperText>) : ('')}
                                                    </MaterialGrid>
                                                </MaterialGrid>

                                            </MaterialGrid>

                                        </div>
                                        <div className={classes.footer}>
                                            <div className={classes.footerRight}>

                                                <FormBtn id={"save"} onClick={handleSaveForm} size={"medium"}>Save</FormBtn>

                                                <FormBtn id={"reset"} onClick={handleCloseForm} size={"medium"}>Cancel</FormBtn>

                                            </div>
                                        </div>

                                    </div>

                                </div>


                                {/* <DialogTitle className={classes.dialogHeader} >
                                    <div id="draggable-dialog-title">{userInfo.isProvider == true ? ('Change Location') : ('Change Location/Provider')}</div>
                                </DialogTitle>
                                <DialogContent>
                                    <MaterialGrid item lg={12} md={12} sm={12} xs={12} container direction="row">
                                        <MaterialGrid item lg={12} md={12} sm={12} xs={6} container direction="row">
                                            <MaterialGrid item lg={4} md={4} sm={4} xs={4}
                                                container
                                                direction="row"
                                                justify="flex-end"
                                            >
                                                <FormLabel className={classes.Selectlabel} >Provider:</FormLabel>
                                            </MaterialGrid>
                                            <MaterialGrid item lg={8} >
                                                {
                                                    userInfo.isProvider ? (<InputBaseField
                                                        placeholder="Provider Name"
                                                        onChange={handleChange}
                                                        name="providerName"
                                                        value={`${userInfo.firstName} ${userInfo.lastName}`}
                                                        MaxLength='255'
                                                        disabled
                                                    />) : (
                                                        <SelectField

                                                            placeholder="Select Provider"
                                                            onChange={handleProviderChange}
                                                            name="providerID"
                                                            value={state.providerID}
                                                            MaxLength='255'
                                                            options={providers}
                                                        />
                                                    )
                                                }
                                                {
                                                    errorMessages.errorProvider && !userInfo.isProvider && (parseInt(state.providerID) < 1) ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select Provider
                                                    </FormHelperText>) : ('')}
                                            </MaterialGrid>
                                        </MaterialGrid>

                                        <MaterialGrid item lg={12} container direction="row">
                                            <MaterialGrid item lg={4}
                                                container
                                                direction="row"
                                                justify="flex-end"
                                            >
                                                <FormLabel className={classes.Selectlabel} >Location:</FormLabel>
                                            </MaterialGrid>
                                            <MaterialGrid item lg={8} >
                                                <SelectField

                                                    placeholder="Select Location"
                                                    onChange={handleChange}
                                                    name="userLocationID"
                                                    value={state.userLocationID}
                                                    MaxLength='255'
                                                    options={locations}
                                                />
                                                {errorMessages.errorLocation && (!state.userLocationID || parseInt(state.userLocationID) < 1) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select Location
                                                </FormHelperText>) : ('')}
                                            </MaterialGrid>
                                        </MaterialGrid>

                                    </MaterialGrid>
                                </DialogContent>
                                <DialogActions className={classes.dialogactions}>

                                    <FormBtn id={"save"} onClick={handleSaveForm} size={"medium"}>Save</FormBtn>
                                    
                                    <FormBtn id={"reset"} onClick={handleCloseForm} size={"medium"}>Cancel</FormBtn>
                                    
                                </DialogActions> */}
                            </Dialog>
                            <ActionDialog
                                title={actiondialogprops.actiondialogtitle}
                                message={actiondialogprops.actiondialogmessage}
                                type={actiondialogprops.actiondialogtype}
                                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                                onSubmit={() => { actiondialogprops.dialogactiontype ? update("block") : update('delete'); }}
                                onCancel={() => setActionDialogProps(prevState => ({
                                    ...prevState,
                                    actiondialogstate: false,
                                }))
                                }
                            />
                        </>
                    </>
                    {isLoading ? (
                        <>
                            <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                            <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                                <div style={{ paddingTop: '27%' }} />
                            </Skeleton>
                        </>
                    ) : (
                        <>
                            <SearchGridForm defaultvalues={values} searchPanelParams="ScheduleSlot" Apply={onSearchSubmit} />
                            <div className="custom-grid">
                                <Table
                                    // onRow={(record, rowIndex) => {
                                    //     return {
                                    //         onClick: (e) => handleRowClick(record.key),
                                    //     };
                                    // }}
                                    scroll={true}
                                    dataSource={rowsData}
                                    checkStrictly={true}
                                    rowSelection={{
                                        selectedRowKeys: selectedIds,
                                        onChange: onSelectChange
                                    }}
                                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                    columns={gridCnfg1["ScheduleSlots"]}
                                    // rowClassName={(record, index) => "claimRow"}
                                    locale={{
                                        emptyText: (
                                            <Empty
                                                image={isLoading && LoadingIcon}
                                                description={isLoading ? "Loading..." : "No Record Found"}
                                                imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                            />
                                        )
                                    }}

                                />
                            </div>
                            {/* <MDBDataTable
                                striped
                                small
                                btn
                                // searching={props.searchShowHide}
                                searching={false}
                                data={tableData}
                            /> */}
                        </>
                    )
                    }
                    {/* <Grid code="ScheduleSlots" isUpdated={isupdated.update} selection="true" onChange={handleSelection} apiUrl="scheduler/loadProviderSlotGrid" /> */}
                </Container>
            }

        </>
    );
}
export default withSnackbar(ScheduleSlots)
