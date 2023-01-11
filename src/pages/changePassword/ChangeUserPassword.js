import React, { useState } from "react";

import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Fade,
    Card,
    InputBase,
    InputAdornment,
    Container

} from "@material-ui/core";

import { withRouter, Link, useHistory } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";
import AppImg from "../../images/app-image.png";

import SuccessIcon from "../../images/icons/successIcon.png";
import CloseIcon from "../../images/icons/close.png";



import PageTitle from "../../components/PageTitle";
import PasswordIcon from "../../images/icons/password-icon.png";

// context
import { useUserDispatch, changePassword } from "../../context/UserContext";
export default function ChangeUserPassword(props) {
    var classes = useStyles();
    const history = useHistory();
    // global
    var userDispatch = useUserDispatch();
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [oldPasswordValue, setOldPasswordValue] = useState("");
    var [newPasswordValue, setNewPasswordValue] = useState("");
    var [confirmPasswordValue, setConfirmPasswordValue] = useState("");

    var [passwordMatch, setPasswordMatch] = useState(true);
    var [isSuccess, setIsSuccess] = useState(false);
    var [returnMessage, setReturnMessage] = useState("");
    const [title, setTitle] = useState('Change Password');


    // New -------------

    var [isPasswordPatternMatch, setIsPasswordPatternMatch] = useState(false);
    var [passwordPatternMessage, setPasswordPatternMessage] = useState();
    const [passwordStrength, setPasswordStrength] = useState("strong");

    // New -------------

    const onBlurNewPassword = (event) => {

        // check numeric value also
        // if (newPasswordValue && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(newPasswordValue)) {
        // check without numeric number
        if (newPasswordValue && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.)(?=.*?[#?!@$%^&*-]).{8,}$/i.test(newPasswordValue)) {
            setIsPasswordPatternMatch(false);
            setPasswordPatternMessage("Password must contain at least 8 characters including upper/lower case and a special character.")
        }
        else
            setIsPasswordPatternMatch(true);

    };

    const onBlurConfPassword = (event) => {
        
        if (newPasswordValue != confirmPasswordValue) {
            setPasswordMatch(false);
        }
        else {
            setPasswordMatch(true);

        }
    };
    const goToDashboard = () => {
        setTimeout(() => { history.push('/app/dashboard') }, 3000);
        //setTimeout(() => { history.push('/app/setup') }, 3000);
    }
    if (isSuccess) {
        setTimeout(() => { console.log('returnMessage', returnMessage) }, 3000);
        goToDashboard();
    }

    const onFocusConfPassword = () => {

        setPasswordMatch(true);
    };

    return (
        <>
            <PageTitle title={title} />
            <Container maxWidth={false}>
                <Grid
                    container
                    direction="row"
                    item xs={12} sm={12} md={12} lg={12}
                >
                    <Grid item xs={12} sm={6} md={6} lg={4} className={classes.formContainer}
                        container
                        direction="row"
                        justify="flex-start"
                        align="flex-start">
                        <div className={classes.form}>

                            <React.Fragment>
                                <Grid className={classes.inBox}
                                    container
                                    direction="row"
                                    align="left"
                                >
                                    <Typography variant="h1" className={classes.loginTitle}>
                                        Change Password
                                    </Typography>

                                    <InputBase
                                        id="oldPassword"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={oldPasswordValue}
                                        className={classes.textField}
                                        onChange={e => setOldPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="Old Password"
                                        type="password"
                                        fullWidth
                                        required
                                    />
                                    <InputBase
                                        id="NewPassword"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={newPasswordValue}
                                        className={classes.textField}
                                        onChange={e => setNewPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="New Password"
                                        type="password"
                                        onFocus={() => setIsPasswordPatternMatch(false)}
                                        onBlur={onBlurNewPassword}
                                        fullWidth
                                        required
                                    />
                                    {
                                        // <>
                                        //     <Button disabled className={classes.weakPassword}
                                        //     classes={{root:classes.strengthPassword}} ></Button>
                                        // {
                                        //     passwordStrength==="moderate" || passwordStrength==="medium" || passwordStrength==="strong" ?
                                        //     <Button disabled className={classes.moderatePassword}
                                        //     classes={{root:classes.strengthPassword}}/>
                                        //     :
                                        //     <Button disabled classes={{root:classes.strengthPassword}} />                            
                                        // }
                                        // {
                                        //     passwordStrength==="medium" || passwordStrength==="strong" ?
                                        //     <Button disabled className={classes.mediumPassword}
                                        //     classes={{root:classes.strengthPassword}}/>
                                        //     :
                                        //     <Button disabled classes={{root:classes.strengthPassword}} />                            
                                        // }
                                        // {
                                        //     passwordStrength==="strong" ?
                                        //     <Button disabled className={classes.StrongPassword}
                                        //     classes={{root:classes.strengthPassword}}/>
                                        //     :
                                        //     <Button disabled classes={{root:classes.strengthPassword}} />                            
                                        // }
                                        // <Typography className={classes.strengthMessage}>
                                        //         Password Strength:{passwordStrength}
                                        // </Typography>
                                        // </>
                                    }
                                    {!isPasswordPatternMatch ? (
                                        <Fade in={!isPasswordPatternMatch}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                {passwordPatternMessage}
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <InputBase
                                        id="confirmPassword"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={confirmPasswordValue}
                                        className={classes.textField}
                                        onChange={e => setConfirmPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="Confirm Password"
                                        type="password"
                                        onBlur={onBlurConfPassword}
                                        onFocus={onFocusConfPassword}
                                        fullWidth
                                        required
                                    />
                                    {!passwordMatch && confirmPasswordValue != "" ? (
                                        <Fade in={!passwordMatch && confirmPasswordValue != ""}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                Password does not match
                                            </Typography>
                                        </Fade>)
                                        : ("")
                                    }

                                    {error ? (
                                        <Fade in={error}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                {returnMessage}
                                            </Typography>
                                        </Fade>) : ("")}

                                    {isSuccess ?
                                        <Fade in={isSuccess}>
                                            <Typography className={classes.successMessage}>
                                                {returnMessage}
                                            </Typography>
                                        </Fade>
                                        : ""}

                                    <div className={classes.formButtons}>

                                        {isLoading ? (
                                            <CircularProgress size={26} className={classes.loginLoader} />
                                        ) : (
                                            <Button
                                                disabled={
                                                    oldPasswordValue.length === 0 || newPasswordValue.length === 0 || confirmPasswordValue.length === 0
                                                }
                                                onClick={() =>
                                                    changePassword(
                                                        userDispatch,
                                                        oldPasswordValue,
                                                        newPasswordValue,
                                                        confirmPasswordValue,
                                                        props.history,
                                                        setIsLoading,
                                                        setError,
                                                        setIsSuccess,
                                                        setReturnMessage
                                                    )
                                                }

                                                className={classes.loginBtn}
                                                size="large"
                                            >
                                                Change Password
                                            </Button>
                                        )}

                                    </div>
                                </Grid>
                            </React.Fragment>

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={5} className={classes.formContainer}
                        container
                        direction="row"
                        justify="flex-start"
                        align="flex-end"
                    >

                        <div style={{ width: "100%", marginTop: 100, marginLeft: 25 }}>
                            <Grid container xs={12} sm={12} lg={12} xl={12} className={classes.pRelative}>
                                <Grid xs={3} sm={2} md={2} lg={1} xl={1}></Grid >
                                <div className={classes.pAbsolute}>
                                    {
                                        newPasswordValue.length >= 8 ?
                                            <img className={classes.messageImage} src={SuccessIcon} alt="icon" />
                                            :
                                            <img className={classes.messageImage} src={CloseIcon} alt="icon" />
                                    }
                                </div>
                                <Grid xs={9} sm={10} md={10} lg={11} xl={11}>
                                    <p className={classes.text}> Password must have 8 characters </p>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} sm={12} lg={12} xl={12} className={classes.pRelative}>
                                <Grid xs={3} sm={2} md={2} lg={1} xl={1}></Grid >
                                <div className={classes.pAbsolute}>
                                    {
                                        newPasswordValue.length > 0 && isPasswordPatternMatch ?
                                            <img className={classes.messageImage} src={SuccessIcon} alt="icon" />
                                            :
                                            <img className={classes.messageImage} src={CloseIcon} alt="icon" />
                                    }
                                </div>
                                <Grid xs={9} sm={10} md={10} lg={11} xl={11}>
                                    <p className={classes.text}> Password contain alfa numeric character </p>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} sm={12} lg={12} xl={12} className={classes.pRelative}>
                                <Grid xs={3} sm={2} md={2} lg={1} xl={1}></Grid >
                                <div className={classes.pAbsolute}>
                                    {
                                        newPasswordValue.length > 0 && isPasswordPatternMatch ?
                                            <img className={classes.messageImage} src={SuccessIcon} alt="icon" />
                                            :
                                            <img className={classes.messageImage} src={CloseIcon} alt="icon" />
                                    }
                                </div>
                                <Grid xs={9} sm={10} md={10} lg={11} xl={11}>
                                    <p className={classes.text}> Password have one or more special characters i.e @ # $ % etc </p>
                                </Grid>
                            </Grid>
                            {/* <p> Must not contain combination or name and places </p> */}
                        </div>

                    </Grid>

                </Grid>


            </Container>
        </>
    );


}

