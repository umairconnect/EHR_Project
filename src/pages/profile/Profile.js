import React, { useState, useEffect } from 'react'

import {
    Container,
    Grid,
    Button,
    Dialog
} from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import PageTitle from "../../components/PageTitle";
import { InputBaseField, SwitchBoxField, TextareaField } from "../../components/InputField";
import { ShadowBox, ShadowBoxMin, FormGroupTitle, FormBtn, ErrorMessage, Label } from "../../components/UiElements";
import { withSnackbar } from '../../components/Message/Alert';
import useStyles from './styles';
import { PostDataAPI } from '../../Services/PostDataAPI';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EmergencyAllowModal from '../setup/emergencyAccess/component/AllowEmergencyAccess';
import { useUserDispatch, signOut} from "../../context/UserContext";
import { useHistory } from "react-router-dom";

function Profile(props) {
    var classes = useStyles();
    const { showMessage } = props;
    let history = useHistory();
    var userDispatch = useUserDispatch();

    const [isSaveLoading, setIsSaveLoading] = useState(false)

    const [state, setState] = useState({
        userID: "", firstName: "", middleName: "", lastName: "", homePhone: "", cellPhone: "", currentStatus: true,
    });
    const [profileImage, setProfileImage] = useState({ file: null, userPhoto: null, userPhotoName: null });

    const [errorMessages, setErrorMessages] = useState({ errorFirstName: false, errorLastName: false });

    const [emergencyAllowModal, setEmergencyAllowModal] = useState(false);

    
    const [emergencyAllowModalOff, setEmergencyAllowModalOff] = useState(false);


    const handleChecked = e => {
        const { name, checked } = e.target;
        if (checked) {
            setState(prevState => ({
                ...prevState,
                ['currentStatus']: true
            }));
            //state["currentStatus"] = true;
            setEmergencyAllowModal(true)
            setEmergencyAllowModalOff(false)
        } else {
            //state["currentStatus"] = false;
            setState(prevState => ({
                ...prevState,
                ['currentStatus']: false
            }));
            setEmergencyAllowModal(true)
            setEmergencyAllowModalOff(true)
        }

        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    const showEmergencyAllow = () => {
        setEmergencyAllowModal(true);
    }
    const closeEmergencyAllow = () => {
        setEmergencyAllowModal(false);

        if (state["currentStatus"] == true) {
            //state["currentStatus"] = false
            setState(prevState => ({
                ...prevState,
                ['currentStatus']: false
            }));
        } else {
            //state["currentStatus"] = true
            setState(prevState => ({
                ...prevState,
                ['currentStatus']: true
            }));
        }
    }
    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function uploadSingleFile(e) {
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userPhotoName: e.target.files[0].name
        })
    }
    const handleHomePhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }
    const handleCellPhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {


                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorCellLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: number
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }

    const handleSave = e => {

        e.preventDefault();

        let errorList = [];

        if (!state.lastName || state.lastName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));

            errorList.push(true);
            //  staffFormRef.lastNameRef.focus();
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));

        }

        if (!state.firstName || state.firstName.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));

            errorList.push(true);
            //   staffFormRef.firstNameRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }


        if (state.homePhone != "" && state.homePhone != undefined && state.homePhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: false
            }));
        }

        if (state.cellPhone != "" && state.cellPhone != undefined && state.cellPhone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorCellLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCellLength: false
            }));
        }


        if (errorList.length < 1) {
            let method = "user/updateProfile";

            const formData = new FormData();
            for (var key in state) {
                if (key != 'userPhotoName')
                    formData.append(key, state[key]);
            }

            formData.append("userPhoto", profileImage.userPhoto);
            formData.append("userPhotoName", profileImage.userPhotoName);

            //--------------------
            setIsSaveLoading(true);

            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {

                    setErrorMessages([]);
                    if (!result.data.cellPhone || result.data.cellPhone == 'undefined')
                        result.data.cellPhone = '';
                    if (!result.data.homePhone || result.data.homePhone == 'undefined')
                        result.data.homePhone = '';

                    setState(result.data);
                    showMessage("Success", "Profile updated successfully.", "success", 3000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }
        else {
            e.preventDefault();
        }
    };
    const loadProfile = () => {
        //if (dataId > 0) {
        var userInfo = sessionStorage.getItem('user_info');
        var userId = JSON.parse(userInfo).user.userID;
        let data = {
            userID: userId
        }
        PostDataAPI("user/getUserById", data).then((result) => {
            if (result.success && result.data != null) {
                // Set data Here
                if (!result.data.cellPhone || result.data.cellPhone == 'undefined')
                    result.data.cellPhone = '';
                if (!result.data.homePhone || result.data.homePhone == 'undefined')
                    result.data.homePhone = '';
                setState(result.data);
            }
        })
    }

    const changeEmergencyStatus = () => {
        setEmergencyAllowModal(false);
        let data = {
            accessId: state.accessId,
            currentStatus: state.currentStatus
        }
        setIsSaveLoading(true);
        PostDataAPI("setup/emergencyaccess/update", data, true).then((result) => {
            setIsSaveLoading(false);
            if (result.success && result.data != null) {
                //logoutUser();
            }
        })
    }

    const logoutUser = () => {
        signOut(userDispatch, history)
    }

    useEffect(() => {
        loadProfile();
    }, []);
    return (
        <>
            <PageTitle title="Update Profile"
               //button={<Button
               //size="small"
               //id="btnIdGetPatientAppt"
               //className={classes.newAddBtn}
               //onClick={history.goBack}
               //    startIcon={< ArrowBackIosIcon />} >Back</Button>
               //}
            />

            <Container maxWidth={false}>

                <ShadowBoxMin shadowSize={3} >
                    <Grid container >
                        <FormGroupTitle>Profile</FormGroupTitle>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container direction="row" >
                                <Grid item xs={12} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <Grid container justify="center" justify-content='center'>
                                        <label htmlFor="fileUploadField" className={classes.uploadImageLabel}>
                                            {profileImage.file || state.photoPath ?
                                                <img id='profileImgSource' src={profileImage.file != null ? profileImage.file : "." + state.photoPath} alt='' className={classes.uploadImage} />
                                                : <div className={classes.uploadImageBox}></div>
                                            }
                                            <AddAPhotoIcon className={classes.uploadImageIcon} />
                                        </label>
                                        <form>

                                            <div>
                                                <input type="file" id="fileUploadField" className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" />
                                            </div>

                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                
                                <Label size={2} title="First Name" mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="firstName"
                                        value={state?.firstName}
                                        MaxLength="50"
                                    />
                                    {errorMessages.errorFirstName && (!state.firstName || state.firstName.trim() == "") ? (<ErrorMessage >
                                        Please enter first name
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label size={2} title="Middle Name" />

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField
                                        placeholder="Middle Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="middleName"
                                        value={state?.middleName}
                                        MaxLength="50"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label size={2} title="Last Name" mandatory={true} />

                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    <InputBaseField

                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="lastName"
                                        value={state?.lastName}
                                        MaxLength="50"
                                    />
                                    {errorMessages.errorLastName && (!state.lastName || state.lastName.trim() == "") ? (<ErrorMessage >
                                        Please enter last name
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label size={2} title="Home Phone" />

                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleHomePhoneChange}
                                        name="homePhone"
                                        value={state?.homePhone}
                                        MaxLength="14"
                                    />
                                    {errorMessages.errorPhoneLength && state.homePhone != "" ? (<ErrorMessage style={{ color: "red" }} >
                                        The phone number is invalid
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row">
                                <Label size={2} title="Cell #" />

                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleCellPhoneChange}
                                        name="cellPhone"
                                        value={state?.cellPhone}
                                        MaxLength="14"
                                    />
                                    {errorMessages.errorCellLength && state.cellPhone != "" ? (<ErrorMessage style={{ color: "red" }} >
                                        The phone number is invalid
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" style={{ margin: "15px 0" }}>
                                <Grid item xs={2} sm={2} md={2} lg={2} />
                                <Grid item xs={12} sm={4} md={4} lg={3} >
                                    {state.accessId ? <SwitchBoxField
                                        name="currentStatus"
                                        id="ActivateEmergencyAccess"
                                        onChange={handleChecked}
                                        checked={state.currentStatus}
                                        label={state.currentStatus ? "De-Activate Emergency Access" : "Activate Emergency Access"}
                                    />:null}
                                    
                                </Grid>
                            </Grid>

                            <Grid container direction="row">

                                <Grid item xs={12} sm={2} md={2} lg={2} />

                                <Grid item xs={12} sm={4} md={4} lg={3} >

                                    {
                                        isSaveLoading ?
                                            <FormBtn id="loadingSave" size="medium">Save</FormBtn>
                                            : <FormBtn id="save" onClick={handleSave} size="medium" >Save</FormBtn>
                                    }

                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>

                </ShadowBoxMin>
                {/* </ShadowBox> */}

            </Container>
            {emergencyAllowModal ?
                <EmergencyAllowModal showEmergencyAllow={showEmergencyAllow} handleClose={closeEmergencyAllow} changeEmergencyStatus={changeEmergencyStatus} logoutUser={logoutUser} emergencyAllowModalOff={emergencyAllowModalOff}></EmergencyAllowModal>
            :''
            }
         
     
        </>
    )
}

export default withSnackbar(Profile)