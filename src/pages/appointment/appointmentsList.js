import React, { useState, useRef,useEffect } from "react";

import {
    Button,
    ButtonGroup,
    Grid as MUIGrid,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Dialog,
    Divider,
    Avatar
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// styles
import useStyles from "./styles";

//

import PrintIcon from '../../images/icons/printIconBig.png';
import CloseIcon from "../../images/icons/math-plus.png";

// components
import Demographics from '../patients/component/demographics/Demographics';
import { FormGroupTitle, DraggableComponent } from '../../components/UiElements/UiElements';

import Grid from "../../components/AppointmentGrid/Grid";
import Appointment from "../appointment/component/Appointment";
import AppointmentsList from "../appointment/component/Appointment";
import { Scrollbars } from "rc-scrollbars";

import Eligibility from '../patients/component/demographics/components/eligibility/Eligibility'
import ConfirmationDialog from './component/confirmationDialog/ConfirmationDialog'
import AddPatientPaymentDialog from "../billing/components/payment/components/patientPayments/components/addPatientPaymentDialog/AddPatientPaymentDialog";
import { IsEditable } from '../../Services/GetUserRolesRights';

export default function Patients(props) {
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [isScheduleEditable, setIsScheduleEditable] = useState(IsEditable("Schedule"));
    const [changePage, setChangePage] = new useState(false);
    const [changePageList, setChangePageList] = new useState(false);
    const [dataId, setDataId] = useState('');
    const [appPatientName, setAppPatientName] = useState();

    // Buttons Area
    const btnOptions = [{ value: "standardView", title: 'Standard View' }, { value: "confirmView", title: 'Confirm View' }];
    //states for dropdown button

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [filterStatus, setFilterStatus] = useState({ value: "standardView", title: 'Standard View' });
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [checkEligibilityDialogOpenClose, setCheckEligibilityDialogOpenClose] = useState(false);
    const [patentIdOf, setPatentIdOf] = React.useState();
    const [patientId, setPatientId] = React.useState(props.patientId);
    const [apptId, setApptId] = React.useState(0);
    const [batchId, setBatchId] = React.useState(0);
    const [apptDate, setApptDate] = React.useState(0);
    const [eligibilityIdOf, setEligibilityIdOf] = React.useState();
    const [confirmationDialogState, setConfirmationDialogState] = useState(false);
    const [paymentDialogState, setPaymentDialogState] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [isPrintClicked, setIsPrintClicked] = useState(false);
    //handler for dropdown buttons
    // const handleClick = () => {
    //     console.info(`You clicked ${selectedButton}`);
    // };



    const handleMenuItemClick = (event, option) => {
        setFilterStatus(option)
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const refreshAppointmentList = () => {

        setUpdateFlag(!updateFlag);
    }


    //
    //
    const backButton = () => {
        setChangePage(false);
        setDataId('');
    }
    const onAddNew = () => {
        setDataId('');
        setChangePage(true);
        setChangePageList(false);
        setAppPatientName('');
    }
    const getId = (record, patientName, patientID) => {
        // console.log(record, patientName, patientID)
        setDataId(record);
        setPatientId(patientID)
        setChangePage(true);
        setChangePageList(false);
        setAppPatientName(patientName);
    }
    const openDemographics = (id) => {
        setPatentIdOf(id)
        setDemographicsDialogOpenClose(true);
    }
    const openEligibility = (id) => {
        console.log(id)
        setEligibilityIdOf(id)
        setCheckEligibilityDialogOpenClose(true);
    }
    const closeEligibility = () => {
        setCheckEligibilityDialogOpenClose(false);
    }
    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }
    const openConfirmationDialog = (id) => {
        setApptId(id);
        setConfirmationDialogState(true);
    }
    const closeConfirmationDialog = () => {
        setConfirmationDialogState(false);
    }
    const openPaymentDialog = (patientId, appointmentId, appointmentDate, patientName, batchId) => {
        //setEligibilityIdOf(id);
        setApptDate(appointmentDate);
        setApptId(appointmentId);
        setPatientId(patientId);
        setAppPatientName(patientName);
        setBatchId(batchId);
        setPaymentDialogState(true);
    }
    const handleUnallocatedSave = (totalPaid, claimSuperbillId) => {

        //let totalPayment = 0;
        //if (claimSuperbillId === state.claimSuperBillId) {

        //    totalPayment = isNaN(state.ptPayment) ? 0 : parseFloat(state.ptPayment) + parseFloat(totalPaid);
        //    updatePatientPaid(totalPayment, claimSuperbillId);
        //}

    }
    const openReportPrintView = () => {
        setIsPrintClicked(true);
        setTimeout(function () {
            setIsPrintClicked(false);
        }, 100);
        
        
    };
    const handleAddPatientPaymentDialogClose = () => {
        setPaymentDialogState(false);
        refreshAppointmentList();
        //setUpdateFlag(true);
    }
    useEffect(() => {
        debugger;
        console.log(props);
        console.log("schedular screen appointment list");
    }, []);
    return (
        <>
            {changePage ?
                <>
                    <Button
                        size="small"
                        className={classes.newAddBtn}
                        onClick={backButton}
                        style={{ position: "absolute", right: 0, top: "62px", minWidth: 118, zIndex: 1 }}
                        startIcon={< ArrowBackIosIcon />}
                    >
                        Back to  Appt. List
                    </Button>
                    <Appointment dataId={dataId} appPatientName={appPatientName} patientId={patientId} isEditable={props.isEditable} />
                </>
                :
                changePageList ?

                    <AppointmentsList dataId={dataId} appPatientName={appPatientName} patientId={patientId} />

                    :
                    <>
                        <MUIGrid container direction="row" alignItems="center" className={classes.buttonSection}>
                            <MUIGrid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={onAddNew}
                                    disabled={!isScheduleEditable}
                                >+ Add New
                                </Button>

                                <Button startIcon={<Avatar classes={{ root: classes.btnIconRoot }} vairent="square"
                                     src={PrintIcon} />}
                                    onClick={openReportPrintView} className={classes.faxButton} >
                                    Print</Button>

                                {/* <Button startIcon={<img className={classes.BtnIcon} src={PrintIcon}/>} onClick={openReportPrintView}>Print</Button> */}
                                
                                {/* <ButtonGroup className={classes.headerGroupBtn} color="default" aria-label="contained button group"> */}

                                    {/* <Button
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                        className={classes.gridArrowButton}
                                        ref={anchorRef}
                                        disabled={true}
                                    >{filterStatus.title}
                                        <ExpandMoreIcon />
                                    </Button> */}
   
                                {/* </ButtonGroup> */}


                            </MUIGrid>
                        </MUIGrid>
                        <div className={classes.antTableArea}>
                            <Grid
                                selectedView={filterStatus.value}
                                searchPanelParams="Appointment"
                                code="PatientAppointments"
                                rowClick={getId}
                                apiUrl="appointment/loadPatientAppointmentGrid"
                                openDemographics={openDemographics}
                                openEligibility={openEligibility}
                                openConfirmation={openConfirmationDialog}
                                openPayment={openPaymentDialog}
                                IsUpdate={updateFlag}
                                IsPrintClicked={isPrintClicked}
                                isEditable={isScheduleEditable}
                            />
                        </div>
                    </>

            }
            <Popper style={{ zIndex: 900 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {btnOptions.map((option, index) => (
                                        <MenuItem
                                            key={option.value}
                                            selected={option.value === filterStatus.value}
                                            onClick={(event) => handleMenuItemClick(event, option)}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <ConfirmationDialog
                showHideDialog={confirmationDialogState}
                handleClose={() => {
                    setConfirmationDialogState(false);
                    refreshAppointmentList();
                }}
                handleSaveClose={refreshAppointmentList}
                appointmentId={apptId}
            />
            {
                paymentDialogState ?
                    <AddPatientPaymentDialog
                        showHideDialog={paymentDialogState}
                        handleClose={handleAddPatientPaymentDialogClose }
                        screenOrder="appointmentList"
                        claimId={0}
                        patientId={patientId}
                        appointmentId={apptId}
                        appointmentDate={apptDate}
                        patientName={appPatientName}
                        eobId={batchId}
                        handleUnallocated={(value, claimId) => handleUnallocatedSave(value, claimId)}
                    /> : ""
            }
            {/* <SearchPanel placeholderTitle="Search Patients" /> */}
            {demographicsDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={demographicsDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Demographics</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Demographics dataId={patentIdOf} patientId={patentIdOf} isEditable={isEditable} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
            {checkEligibilityDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={checkEligibilityDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontentTwo}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Check Eligibility</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeEligibility}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Eligibility dataId={eligibilityIdOf} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
        </>
    );
}
