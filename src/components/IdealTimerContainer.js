import React, { useState, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';
import { GetUserInfo } from "../Services/GetUserInfo";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    makeStyles,
    DialogContentText,
    Grid,
} from "@material-ui/core";
import {
    ErrorOutlineSharp as ErrorOutlineSharpIcon,
    ErrorOutline as ErrorOutlineIcon
} from "@material-ui/icons";
import { FormBtn } from "./UiElements/UiElements";
import { PostDataAPI } from '../Services/APIService';

const useIdealStyle = makeStyles(theme => ({

    dialogPaper: {
        padding: "15px 24px 7px",
    },
    dialogTitle: {
        textAlign: 'center',
        background: '#FFF',
        borderRadius: '8px 8px 0px 0px',
        // padding: "7px 24px 0px 24px",
    },
    UpdateIcon: {
        color: "#BF710F",
        width: "80px",
        height: "80px",
    },
    dialogContent: {
        textAlign: "center",
        minWidth: "450px",
        padding: "0 !important",
    },
    dialogMessage: {
        fontFamily: "Lato",
        textAlign: "center",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "20px",
        color: "#000000",
        padding: "15px 0px"

    },
}));

function IdealTimerContainer() {

    const classes = useIdealStyle();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const idealTimerRef = useRef(null);
    const sessionTimeoutRef = useRef(null);

    const onIdle = () => {
        let user_info = JSON.parse(GetUserInfo());
        if (user_info != null) {
            setModalIsOpen(true);
            sessionTimeoutRef.current = setTimeout(loggedMeOut, 10 * 1000)
        }
    }

    const loggedMeOut = () => {
        setModalIsOpen(true)
        clearTimeout(sessionTimeoutRef.current);
        updateLogoutSessionLog();
        console.log("User is ideal");
        sessionStorage.clear();
        window.location.reload(false);
    }

    const stayActive = () => {
        setModalIsOpen(false)
        clearTimeout(sessionTimeoutRef.current);
    }
    function updateLogoutSessionLog() {
        let user_info = JSON.parse(GetUserInfo());
        let data = {
            userID: user_info.user.userID
        }
        PostDataAPI("auth/logoutUserSessionLog", data).then((result) => {
            if (result.success) {

            }
        });
    }
    return (
        <>
            <Dialog
                // disableBackdropClick
                disableEscapeKeyDown
                open={modalIsOpen}
                classes={{ paper: classes.dialogPaper }}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        setModalIsOpen(false);
                    }
                }}
            >
                <DialogContent className={classes.dialogContent}>

                    <ErrorOutlineSharpIcon className={classes.UpdateIcon} />

                    <DialogContentText className={classes.dialogMessage}>
                        Your session is about to expire due to inactivity
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Grid container justify="center">
                        <FormBtn id="save" onClick={stayActive}>Stay Logged In</FormBtn>
                        <FormBtn id="reset" onClick={loggedMeOut}>Log Out Now</FormBtn>
                    </Grid>
                </DialogActions>

            </Dialog>

            <IdleTimer
                ref={idealTimerRef}
                timeout={60 * 1000 * 15 }
                onIdle={onIdle}>
            </IdleTimer>
        </>
    )
}

export default IdealTimerContainer

