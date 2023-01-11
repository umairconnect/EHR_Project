import React, { useState, useEffect } from 'react'

import IDmeLogo from "../../../../../images/IDme-logo.png"
import { FormLabel, Grid, Typography } from '@material-ui/core';
import { FormGroupTitle, FormBtn } from '../../../../../components/UiElements/UiElements';

import useStyles from "./styles";
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../../Services/PostDataAPI'
import { ActionDialog } from "../../../../../components/ActionDialog/ActionDialog";


function PrescriptionAuthentication({ handleNext, handleBack, pstate, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(pstate);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    let _client_id = '';
    let _redirect_url = '';

    let _erx_scope = '';
    let _epec_scope = '';
    let _response = 'token';
    let _authURL = '';
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
    useEffect(() => {

        var params = {
            code: "sys_config",
            parameters: ['Id.me']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                result.data.map((item, i) => {
                    switch (item.text1) {

                        case "client_id": _client_id = item.text2; break;
                        case "client_secret_id": break;
                        case "redirect_url": _redirect_url = item.text2; break;
                        case "erx_scope": _erx_scope = item.text2; break;
                        case "epec_scope": _epec_scope = item.text2; break;
                        case "auth_url": _authURL = item.text2; break;
                    }
                });

            }
        });
    }, []);

    const idMe = () => {

        if (_client_id == "" || _authURL == "") {
            showMessage("Error", "ID.Me configurations are missing, please contact to administrator.", "error", 5000);
            // alert("ID.Me configurations are missing, please contact to administrator.");
            return;
        }
        //ShowActionDialog(true, "Sign", "ID.Me configurations are missing, please contact to administrator.", "confirm", function () {
        let uidToken = "";
        var data = {};
        PostDataAPI("setup/epresciption/request/getIdMeToken", state, true).then((result) => {
            if (result.success && result.data != null) {

                uidToken = result.data;
                let url = _authURL + "?client_id=" + _client_id + "&redirect_uri=" + _redirect_url + "&response_type=" + _response + "&type=button&state=" + uidToken;

                if (state.requestTypeCode == 'erx')
                    url = url + "&scope=" + _erx_scope
                else
                    url = url + "&scope=" + _epec_scope


                window.open(url, "_blank");
            }
        });
        // });
    }

    const back = () => {
        handleBack(state);
    }
    return (
        <>
            <Grid container lg={12}>

                <FormGroupTitle>Setup authentication and verify your identity with ID.me</FormGroupTitle>
                <div className={classes.innerArea}>
                    <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                        <FormLabel className={classes.noteText}>When you click the Launch ID.me button, you will be
                            directed to ID.me website to complete the steps below.
                        </FormLabel>

                        <FormLabel className={classes.setpTitle}>
                            Step A. Confirm your email address with ID.me
                        </FormLabel>

                        <span style={{ marginLeft: "15px", padding: "10px 0px" }}>
                            <Typography className={classes.stepText}>
                                You will be prompted to connect your login email address to ID.me.
                                You will then need to check your inbox for an email from
                            </Typography>
                            <Typography className={classes.stepText}>
                                ID.me to confirm your email address. If you need to change your email address,
                                you will have the option to do this with ID.me.
                            </Typography>
                        </span>

                        <FormLabel className={classes.setpTitle}>
                            Step B.     Set up your required multi-factor authentication with either your
                            phone or the ID.me Authenticator app
                        </FormLabel>

                        <span style={{ marginLeft: "15px", padding: "10px 0px" }}>
                            <Typography className={classes.stepText}>
                                You will have the choice of authenticating using a phone or the ID.me Authentication
                                smartphone app. ID.me will either send you a security
                            </Typography>
                            <Typography className={classes.stepText}>
                                ID.me to confirm your email address. If you need to change your email address,
                                you will have the option to do this with ID.me.
                            </Typography>
                        </span>

                        <FormLabel className={classes.setpTitle}>
                            Step C.     Verify your personal details
                        </FormLabel>

                        <span style={{ marginLeft: "15px", padding: "10px 0px" }}>
                            <Typography className={classes.stepText}>
                                Enter your address, phone number, and social security number as it appears on your credit report.
                            </Typography>
                        </span>

                        <FormLabel className={classes.setpTitle}>
                            Step D.     Verify your identity
                        </FormLabel>

                        <span style={{ marginLeft: "15px", padding: "10px 0px" }}>
                            <Typography className={classes.stepText}>
                                Answer security questions based on your credit history OR upload a photo of a government ID along with a photo of yourself to verify your
                                identity.

                            </Typography>
                        </span>

                        <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormBtn id="save" size="large" onClick={back} btnType="back">Back</FormBtn>
                            <FormBtn id="save" size="large" onClick={idMe}>Launch ID.me</FormBtn>
                        </Grid>

                        <Grid item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <img alt="ID.me" src={IDmeLogo} className={classes.iDmeLogo} />
                            <FormLabel className={classes.noteText}>Having trouble getting through identity
                                verification? visit the <a>troubleshooting page on ID.me</a>
                            </FormLabel>
                        </Grid>

                    </Grid>

                </div>

            </Grid>
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
        </>
    )
}

export default PrescriptionAuthentication
