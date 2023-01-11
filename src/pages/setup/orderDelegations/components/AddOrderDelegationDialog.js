import React, { useState, useEffect } from "react"
import {
    Grid,
    Dialog,
    FormHelperText
} from "@material-ui/core"
import CloseIcon from "../../../../images/icons/math-plus.png"
import { FormGroupTitle, Label, ErrorMessage, FormBtn, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { SelectField, InputBaseField } from "../../../../components/InputField/InputField";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import SearchList from "../../../../components/SearchList/SearchList";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../components/Message/Alert";

import useStyles from './styles'
import { GetUserInfo } from "../../../../Services/GetUserInfo";
function AddOrderDelegationDialog({ showHideDialog, handleClose, ...props }) {

    var classes = useStyles();
    const { showMessage } = props;
    const { isEditable } = useState(props.isEditable);

    const userList = [];
    const [errorMessages, setErrorMessages] = useState({ errorCode: false, errorname: false })

    /*const filtersList = [
        { orderTypeId: 1, title: "Imaging" },
        { orderTypeId: 2, title: "Patient Info" },
        { orderTypeId: 3, title: "Lab" },
        { orderTypeId: 4, title: "Prior Authorization" },
        { orderTypeId: 5, title: "Procedure" },
        { orderTypeId: 6, title: "Vaccine" },
        { orderTypeId: 7, title: "Prescription" },
        { orderTypeId: 8, title: "EPCS" },
        { orderTypeId: 9, title: "Surgery" },
    ];*/

    const [filtersList, setFiltersList] = useState([]);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ selectedFilters: [] });
    const [selectedRoleCount, setSelectedRoleCount] = useState(0);
    const [filterValues, setFilterValue] = useState({ provider: "", providerName: "" });
    const [userOrderState, setUserOrderState] = useState({
        AssigneeUserId: 0,
        AssignedUserId: 0,
        OrderTypeId: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSearcdhListProviderStaffChange = (name, item) => {
        const { id, value } = item;

        setFilterValue(prevState => ({
            ...prevState,
            provider: id,
            providerName: value
        }))
        loadOrderDelegation(id);
    }

    const save = () => {
      
        let hasError = false;
        let filteredArr = [...state.selectedFilters];
        let _selectedRoleCount = selectedRoleCount;

        if (!filterValues.providerName || filterValues.providerName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderStaff: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProviderStaff: false
            }));
        }

        if (filteredArr == null || filteredArr.length <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorUserRoles: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorUserRoles: false
            }));
        }
        if (hasError == false) {
            var params = {
                AssigneeUserId: parseInt(userInfo.loggedInUserID),
                AssignedUserId: parseInt(filterValues.provider),
                OrderTypeIds: filteredArr.join(",")
            }

            PostDataAPI('userorderdelgation/add', params, true).then((result) => {
                if (result.success == true) {
                    if (result.success && result.data != null) {
                        console.log("");
                        showMessage("Success", "User delegation saved successfully.", "success", 3000);
                        onClose();
                    }
                }
                else {

                    showMessage("Error", result.message, "error", 3000);
                }
            });
        }
    }

    const loadOrderDelegation = (providerId) => {

        var params = {
            AssigneeUserId: parseInt(userInfo.loggedInUserID),
            AssignedUserId: parseInt(providerId)
        }
        
        PostDataAPI("userorderdelgation/getOrderDelegationTypes", params).then((result) => {
            console.log(filtersList);
            if (result.success && result.data != null) {
                console.log(result.data);
                let filteredArr = [];
                result.data.map((item, i) => {

                    if (filteredArr.includes(item.orderTypeId)) {
                        filteredArr.pop(item.orderTypeId);

                    }
                    else {
                        filteredArr.push(item.orderTypeId);
                    }
                });
                setState(prevState => ({
                    ...prevState,
                    ["selectedFilters"]: filteredArr
                }));
                setSelectedRoleCount(filteredArr.length);
            }
        })
    }
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.assignedUserId),
            area: "Order delegation form setup",
            activity: "Load order delegation form details",
            details: "User viewed order delegation form screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const loadOrderTypes = () => {
        var params = {
            code: "get_order_delegation_types",
            parameters: [""]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {
            
            if (result.success && result.data != null) {
                console.log(result.data);
                setFiltersList(result.data.map((item, i) => {
                    return { orderTypeId: item.id, title: item.text3 };
                }));
                if (props.assignedUserId != null) {
                    loadOrderDelegation(props.assignedUserId);
                    saveAuditLogInfo();
                }
                  
            }
        });
    }

    const applyFilters = (item, i, e) => {


        let filteredArr = [...state.selectedFilters];

        if (filteredArr.includes(item.orderTypeId)) {


            let filterIndex = filteredArr.indexOf(item.orderTypeId)

            console.log(filterIndex)

            filteredArr.splice(filterIndex, 1);



            setState(prevState => ({
                ...prevState,
                ["selectedFilters"]: filteredArr
            }));
        }
        else {
            filteredArr.push(item.orderTypeId);
            setState(prevState => ({
                ...prevState,
                ["selectedFilters"]: filteredArr
            }));
        }

        setSelectedRoleCount(filteredArr.length);
    }


    const onClose = () => {
        handleClose(false);
    }

    useEffect(() => {
        setFilterValue(prevState => ({
            ...prevState,
            provider: props.assignedUserId,
            providerName: props.assignedUserName
        }))
        loadOrderTypes();

    }, []);
    return (
        <Dialog
            PaperComponent={DraggableComponent}
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={showHideDialog}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <FormGroupTitle>{props.dialogtitle} Delegation</FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                    </div>
                    <div className={classes.content}>
                        <Grid container  >
                            <Label title="Staff" size={4} mandatory={true} />
                            <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                                <SearchList
                                    id="provider"
                                    name="provider"
                                    value={filterValues.provider}
                                    searchTerm={filterValues.providerName}
                                    searchId={userInfo.loggedInUserID}
                                    code="staff_Order_Delegation"
                                    apiUrl="ddl/loadItems"
                                    isUser={true}
                                    onChangeValue={(name, item) => handleSearcdhListProviderStaffChange(name, item)}
                                    placeholderTitle="Search Staff"
                                />
                                {errorMessages.errorProviderStaff && (!filterValues.providerName || filterValues.providerName.trim() == "") ? (<ErrorMessage >
                                    Please select staff
                                </ErrorMessage>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Label title="Role Assigned" size={4} />
                            <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                                <ul className={classes.filtersList}>
                                    {filtersList.map((item, i) => {
                                        let isSelected = state.selectedFilters.includes(item.orderTypeId);
                                        return <li id={i} onClick={(e) => applyFilters(item, i, e)} key={i} className={isSelected ? classes.selectedItem : ""}>{item.title}</li>
                                    })}
                                </ul>
                                {errorMessages.errorUserRoles && (selectedRoleCount == 0) ? (<ErrorMessage >
                                    Please select at least 1 role
                                </ErrorMessage>) : ('')}
                            </Grid>
                        </Grid>



                    </div>
                    <div className={classes.footer}>
                        <Grid container justifyContent="flex-start">
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} />
                            <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                                <FormBtn id="save" onClick={save} disabled={props.isEditable} > Save </FormBtn>
                                <FormBtn id="reset" onClick={handleClose}>Close </FormBtn>
                            </Grid>

                        </Grid>

                    </div>
                </div>
            </div>
            {/* <div className={classes.dialogContentLeftSide}>
                <div className={classes.box}>
                    <div className={classes.header}>
                        <FormLabel className={classes.sectionTitle}>Select Order Type</FormLabel>
                    </div>
                    <div className={classes.content}>
                        <ul className={classes.filtersList}>
                            {filtersList.map((item, i) => {
                                let isSelected = state.selectedFilters.includes(item.id);
                                return <li onClick={() => applyFilters(item)} key={i} className={isSelected ? classes.selectedItem : ""}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                    <div className={classes.footer} />
                </div>
            </div> */}
        </Dialog>
    )
}

export default withSnackbar(AddOrderDelegationDialog)