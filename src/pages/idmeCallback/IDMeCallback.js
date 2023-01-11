import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Fade,
    Card,

} from "@material-ui/core";

import { withRouter, Link } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../images/logo.png";
import { PostDataAPI } from '../../Services/PostDataAPI'


function IDMeCallback(props) {
    var classes = useStyles();
    const { showMessage } = props;

    var [isLoading, setIsLoading] = useState(true);
    var [EPCSStatus, setEPCSStatus] = useState(0);
    var [epcsMessage, setEPCSMessage] = useState({ successMessage: "", errorMessage: "", tokenMissing: "ID.Me token is missing in callback url." });

    const [data, setData] = useState([]);
    const [isValidToken, setIsValidToken] = useState(false);

    let _client_id = '';
    let _client_secret_id = '';
    let _redirect_url = '';
    let _scope = '';
    let _response = 'code';
    let _tokenURL = '';
    let _dataURL = '';
    let _tokenValue = "";


    useEffect(() => {
        let uid = "";
        if (props.location.search) {
            _tokenValue = props.location.search.split("&")[1].match(/[^#access_token=]\w+/)[0];
            uid = props.location.search.split("&")[0].match(/[^#state=]\w+/)[0];
        }
        else if (props.location.hash) {
            _tokenValue = props.location.hash.split("&")[1].match(/[^#access_token=]\w+/)[0];
            uid = props.location.hash.split("&")[0].split('=')[1]
        }
        if (!_tokenValue || _tokenValue.trim() == "") {
            // alert("ID.Me token is missing in callback url.");
            // showMessage("Error", "ID.Me token is missing in callback url.", "error", 3000);
            setEPCSMessage({ tokenMissingMessage: "ID.Me token is missing in callback url." });
            setEPCSStatus(3);
            return;
        }

        PostDataAPI("auth/verifiedByIdMe", { idMeToken: _tokenValue, UIDToken: uid }).then((result) => {

            if (result.success) {
                setEPCSStatus(1);
                setEPCSMessage({ successMessage: "Thank you for indentifying yourself on ID.Me" })
                // alert("Thank you for indentifying yourself on ID.Me, eRX has been enabled for you.");
            }
            else {
                setEPCSStatus(2);
                setEPCSMessage({ errorMessage: result.message })
                // alert(result.message);
            }
        });
    }, []);



    return (
        <Card className={classes.loginContainer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
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
                                    {
                                        EPCSStatus == 0 ?
                                            <CircularProgress size={26} className={classes.loginLoader} />
                                            :
                                            EPCSStatus == 1 ?

                                                <Typography variant="h3" color="primary" className={classes.successfullyVerified} >
                                                    {epcsMessage.successMessage}
                                                </Typography>
                                                :
                                                EPCSStatus == 2 ?
                                                    <Typography variant="h3" color="secondary" >
                                                        {epcsMessage.errorMessage}
                                                    </Typography>
                                                    :
                                                    EPCSStatus == 3 ?
                                                        <Typography variant="h3" color="secondary" >
                                                            {epcsMessage.tokenMissing}
                                                        </Typography> : ""
                                    }

                                </Grid>

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
                                {/* <div className={classes.formButtons}>

                                    {isLoading ? (
                                        <CircularProgress size={26} className={classes.loginLoader} />
                                    ) : (
                                        "")
                                    }

                                </div> */}
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

export default withRouter(IDMeCallback);
