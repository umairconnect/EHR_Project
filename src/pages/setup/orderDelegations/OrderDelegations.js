import React, { useState, useEffect } from "react"
import {
    Icon,
    Tooltip,
    Grid,
    FormLabel,
    Typography,
    Button,
    Container
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Scrollbars } from 'rc-scrollbars';
import { useHistory } from "react-router-dom";
//images
import ProfilePic from "../../../images/profile-pic.jpg";
import Delete from "../../../images/icons/trash.png";
import Edit from "../../../images/icons/erase.png";
//custom
import PageTitle from '../../../components/PageTitle';
import SearchList from '../../../components/SearchList/SearchList';
import { withSnackbar } from "../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { ShadowBoxMin } from "../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../Services/PostDataAPI';
import { GetUserInfo } from "../../../Services/GetUserInfo";
import { IsEditable } from '../../../Services/GetUserRolesRights';

import useStyles from './styles';
import AddOrderDelegationDialog from "./components/AddOrderDelegationDialog";
const OrderDelegations = (props) => {
    const history = useHistory();
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("OrderDelegations"));
    const { showMessage } = props;
    const filtersList = [
        { orderTypeId: 1, title: "Imaging" },
        { orderTypeId: 2, title: "Patient Info" },
        { orderTypeId: 3, title: "Lab" },
        { orderTypeId: 4, title: "Prior Authorization" },
        { orderTypeId: 5, title: "Procedure" },
        { orderTypeId: 6, title: "Vaccine" },
        { orderTypeId: 7, title: "Prescription" },
        { orderTypeId: 8, title: "EPCS" },
        { orderTypeId: 9, title: "Surgery" },
    ];
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isSaving, setIsSaving] = useState(false);
    const [orderDelegationDialogState, setOrderDelegationDialogState] = useState(false);
    const [state, setState] = useState({ userId: '0', userName: "" });

    const [userList, setUserList] = useState([]);
    const [titleText, SetTitleText] = useState("Add");
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            userId: value == '' ? '' : id,
            userName: value
        }));
    }
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
    const openAddOrderDelegation = (userOrder) => {
        setState(prevState => ({
            ...prevState,
            userId: userOrder.assignedUserId,
            userName: userOrder.assignedUserName
        }));
        if (userOrder) {
            SetTitleText("Edit");
        }

        setOrderDelegationDialogState(true)
    }
    const AddOrderDelegation = (userOrder) => {
        setState(prevState => ({
            ...prevState,
            userId: userOrder.assignedUserId,
            userName: userOrder.assignedUserName
        }));
        setOrderDelegationDialogState(true)
        SetTitleText("Add");
    }
    const deleteOrderDelegation = (item) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {

            PostDataAPI('userorderdelgation/delete', item, true).then((result) => {

                if (result.success == true) {
                    showMessage("Success", "Record deleted successfully.", "success", 2000);
                    loadOrderDelegation();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        });
    }

    const loadOrderDelegation = () => {
        PostDataAPI("userorderdelgation/getOrderDelegationInfo", parseInt(userInfo.loggedInUserID)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                setUserList(result.data);
            }
        })
    }

    const onCloseDialog = () => {
        setOrderDelegationDialogState(false)
        loadOrderDelegation();
    }

    useEffect(() => {
        loadOrderDelegation();
    }, []);
    return (
        // <Container maxWidth={false}>
        <>
            <PageTitle title="Order Delegations"
                button={<Button
                    size="small"
                    id="btnIdGetPayers"
                    className={classes.newAddBtn}
                    onClick={() => {
                        history.goBack();
                    }}
                    startIcon={< ArrowBackIosIcon />}
                >
                    Back to Setup
                </Button>} />
            <Container maxWidth={false} className={classes.positionRelative}>
                <Button
                    size="small"
                    className={classes.newAddBtn2}
                    onClick={AddOrderDelegation}
                    disabled={!isEditable}
                >+ Add New
                </Button>
                <ShadowBoxMin className={classes.container}>

                    <div className={classes.mainContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormLabel className={classes.sectionTitle}>Assigned Users</FormLabel>
                                {/* <FormGroupTitle>Assigned Users</FormGroupTitle> */}

                            </div>
                            <div className={classes.contentRight}>
                                <Scrollbars className={classes.contentRightScrollbar}>
                                    <Grid container className={classes.innerContentRight}>

                                        <Grid container>
                                            <ul className={classes.usersList}>
                                                {
                                                    userList.map((item, i) => {
                                                        return <li>
                                                            <span className={classes.userSpan}>
                                                                <img
                                                                    src={item != null && item.assignedUserPhoto != null ? "." + item.assignedUserPhoto : ProfilePic}
                                                                    alt="User Picture"
                                                                    className={classes.userPicture}
                                                                    onError={(e) => (e.target.onerror = null, e.target.src = ProfilePic)}
                                                                />
                                                                <div className={classes.userSpanContent}>
                                                                    <Typography className={classes.userName}>{item.assignedUserName}</Typography>
                                                                    <Typography className={classes.userType}>{item.userRoles}</Typography>
                                                                </div>
                                                            </span>
                                                            <span className={classes.actionSpan}>
                                                                <Tooltip title="Edit">
                                                                    <Icon> <img src={Edit} className={classes.deleteIcon} onClick={() => openAddOrderDelegation(item)} /> </Icon>
                                                                </Tooltip>
                                                                {isEditable ? <Tooltip title="Delete">
                                                                    <Icon> <img src={Delete} className={classes.deleteIcon} onClick={() => deleteOrderDelegation(item)} /> </Icon>
                                                                </Tooltip>:null}
                                                                
                                                            </span>

                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>

                </ShadowBoxMin>
            </Container>
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
            {orderDelegationDialogState ?
                <AddOrderDelegationDialog
                    dialogtitle={titleText}
                    showHideDialog={orderDelegationDialogState}
                    handleClose={() => onCloseDialog()}
                    assignedUserId={state.userId}
                    assignedUserName={state.userName}
                    isEditable={!isEditable}
                /> : null
            }
        </>
        //  </Container> 
    )
}

export default withSnackbar(OrderDelegations);

