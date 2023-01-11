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
    Container,

} from "@material-ui/core";

import { withRouter, Link, useHistory } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";
import AppImg from "../../images/app-image.png";

import PasswordIcon from "../../images/icons/password-icon.png";

// context
import { useUserDispatch, resetPassword, validateToken } from "../../context/UserContext";

function ResetPassword(props) {
    var classes = useStyles();

    let history = useHistory();

    let tokenValue = "";

    if (props.location.search != null) {
        tokenValue = props.location.search.split('=')[1];
    }
    // global
    var userDispatch = useUserDispatch();
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(false);
    var [isAuthToken, setIsAuthToken] = useState(false);
    var [token, setToken] = useState(tokenValue);
    var [newPasswordValue, setNewPasswordValue] = useState("");
    var [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    var [isSuccess, setIsSuccess] = useState(false);
    var [returnMessage, setReturnMessage] = useState("");

    // New -------------

    var [isPasswordPatternMatch, setIsPasswordPatternMatch] = useState(true);
    var [passwordMatch, setPasswordMatch] = useState(true);

    var [isValidToken, setIsValidToken] = useState(false);
    var [passwordPatternMessage, setPasswordPatternMessage] = useState("");


    const onBlurNewPassword = (event) => {

        //if (newPasswordValue && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(newPasswordValue)) {
        if (newPasswordValue && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.)(?=.*?[#?!@$%^&*-]).{8,}$/i.test(newPasswordValue)) {
            setIsPasswordPatternMatch(false);
            setPasswordPatternMessage("Password must contain at least 8 characters including upper/lower case and a special character.")
        }
        else
            setIsPasswordPatternMatch(true);

    };

    const onBlurConfPassword = (event) => {

        let confirmPass = event.target.value;
        
        if (newPasswordValue != confirmPass) {
            setPasswordMatch(false);
        }
        else
            setPasswordMatch(true);

    };

    const onChangeConfirmPassword = (event) => {

        let confirmPass = event.target.value;
        setConfirmPasswordValue(confirmPass);
        if (newPasswordValue != confirmPass) {
            setPasswordMatch(false);
        }
        else
            setPasswordMatch(true);
    };
    // New -------------

    const callValidate = () => {
        validateToken(token, setIsAuthToken, setError, setIsValidToken);

    }

    const goToLogin = () => {
        setTimeout(() => { history.push("/app/login") }, 2000)
    }
    if (isSuccess) {
        goToLogin();
    }
    if (!isAuthToken)
        callValidate();

    return (
        <Card className={classes.loginContainer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                xm={12} sm={12} md={7} lg={7} xl={7}
            >
                <Grid item xs={10} sm={10} md={9} lg={7} xl={7} className={classes.formContainer}
                    container
                    direction="row"
                    justify="center"
                    align="center">
                    <div className={classes.form}>
                        <img src={logo} alt="logo" className={classes.logotypeImage} />

                        <React.Fragment>
                            <Grid className={classes.inBox}
                                container
                                direction="row"
                                align="left"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    item xs={12} sm={12} md={12} lg={12}

                                >
                                    <Typography variant="h1" className={classes.loginTitle}>
                                        Reset Password
                                    </Typography>
                                </Grid>

                                {isValidToken ? (
                                    <InputBase
                                        id="NewPassword"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={newPasswordValue}
                                        className={classes.textField}
                                        onChange={e => setNewPasswordValue(e.target.value.trim())}
                                        margin="none"
                                        placeholder="New Password"
                                        type="password"
                                        fullWidth
                                        onBlur={onBlurNewPassword}
                                    />
                                ) : ("")
                                }
                                {!isPasswordPatternMatch ? (
                                    <Fade in={!isPasswordPatternMatch}>
                                        <Typography color="secondary" className={classes.errorMessage}>
                                            {passwordPatternMessage}
                                        </Typography>
                                    </Fade>) : ("")
                                }
                                {isValidToken ? (
                                    <InputBase
                                        id="confirmPassword"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={confirmPasswordValue}
                                        className={classes.textField}
                                        onChange={onChangeConfirmPassword}
                                        margin="none"
                                        placeholder="Confirm Password"
                                        type="password"
                                        fullWidth
                                        required
                                        onBlur={onBlurConfPassword}
                                    />
                                ) : ("")}
                                {!passwordMatch && confirmPasswordValue != "" ? (
                                    <Fade in={!passwordMatch && confirmPasswordValue != ""}>
                                        <Typography color="secondary" className={classes.errorMessage}>
                                            Password does not match
                                        </Typography>
                                    </Fade>) : ("")
                                }
                                {error || !isValidToken ? (
                                    <Fade in={error || !isValidToken}>
                                        <Typography color="secondary" className={classes.errorMessage}>
                                            Link has been expired
                                        </Typography>
                                    </Fade>) : ("")
                                }
                                {isSuccess ? (
                                    <Fade in={isSuccess}>
                                        <Typography className={classes.successMessage}>
                                            {returnMessage}
                                        </Typography>
                                    </Fade>) : ("")
                                }
                                {isValidToken ?
                                    <Grid xs={12} sm={12} lg={12} sm={12}>
                                        <p> Password must have at least 8 characters including one or more special characters i.e. @ # $ % etc </p>
                                    </Grid> : ""
                                }


                                <Grid container
                                    direction="row"
                                    justify="flex-end">
                                    <Button
                                        color="primary"
                                        className={classes.forgetButton}
                                    >
                                        <Link className={classes.forgetButton} to="/login">Go to login</Link>
                                    </Button>
                                </Grid>
                                <div className={classes.formButtons}>

                                    {isLoading ? (
                                        <CircularProgress size={26} className={classes.loginLoader} />
                                    ) : (
                                        isValidToken ?
                                            <Button
                                                disabled={
                                                    newPasswordValue.length === 0 || confirmPasswordValue.length === 0 || isPasswordPatternMatch == false || passwordMatch == false
                                                }
                                                onClick={() =>
                                                    resetPassword(
                                                        userDispatch,
                                                        token,
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
                                                Reset Password
                                            </Button> : null
                                    )
                                    }

                                </div>
                            </Grid>
                        </React.Fragment>
                    </div>
                    <Typography className={classes.footerContent}>Please note this application may only be accessed by authorized users. Each user can only view data associated with their specific account. By logging in, you are accepting our Terms of Services. To find out how we protect your and your information, view our privacy policy.
                        <br />
                        <span className={classes.copyright}>© 2023 MCR Health.</span>
                    </Typography>
                </Grid>


            </Grid>
        </Card>
    );
}

export default withRouter(ResetPassword);
