import React, { useState, useEffect } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../../../components/Message/Alert';
import { validateEmail } from '../../../../../../../../components/Common/Extensions';

import {
    Grid,
    Dialog,
    FormHelperText
} from "@material-ui/core";

import { InputBaseField, SelectField } from "../../../../../../../../components/InputField/InputField";
import { Scrollbars } from "rc-scrollbars";
import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../../../components/UiElements/UiElements";

function NewReferringProviderDialog({ dialogOpenClose, handleClose, handleAddNew, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isSaving, setIsSaving] = useState(false);
    const defaultAttr = { firstName: '', middleName: '', lastName: '', specliaty: '', email: '', contactNumber: '', address: '', typeCode: 'ref', fax: '' };
    const [state, setState] = useState(defaultAttr);

    const [specialityList, setSpecialityList] = useState([]);
    const [errorMessages, setErrorMessages] = useState();
    useEffect(() => {
        var params = {
            code: 'provider_specilizations',
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setSpecialityList(result.data.map((item, i) => {
                    return { label: item.text1, value: item.id };
                }))

            }
        });
    }, []);

    const Save = () => {
        let errorList = [];

        Validate(errorList);
        if (errorList.length < 1) {
            setIsSaving(true);
            let method = "refOrdProvider/addRefOrderProvider";

            PostDataAPI(method, state, true).then((result) => {
                if (result.success == true) {
                    setIsSaving(false);
                    showMessage("Success", "Referral saved successfully.", "success", 2000);
                    handleAddNew(result.data, state.firstName + ' ' + state.lastName);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    setIsSaving(false);
                }
            })
        }
    }

    const Reset = () => {
        setState(defaultAttr);
    }

    const Validate = (errorList) => {
        if (!state.firstName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }
        if (!state.lastName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }
        if (!state.specliaty > 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecliaty: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSpecliaty: false
            }));
        }
        if (!state.email.trim() || validateEmail(state.email.trim()) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));
        }

    }

    const closeDialog = () => {
        handleClose();

    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.trim() === "" && value !== "") {
            return;
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePhoneChange = e => {

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
    return (
        <>
            <Dialog
                open={dialogOpenClose}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
            >
                <Scrollbars autoHeight autoHeightMax={700} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                    <div className={classes.DialogContent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle className={classes.lableTitleInput}>New Referring Provider</FormGroupTitle>
                            </div>
                            <div className={classes.content}>
                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="First Name" size={3} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="First Name"
                                                id="firstName"
                                                name="firstName"
                                                value={state.firstName}
                                                onChange={handleChange}
                                                MaxLength={100}
                                            />
                                            {errorMessages?.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter first name
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Middle Name" size={3} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="Middle Name"
                                                id="middleName"
                                                name="middleName"
                                                value={state.middleName}
                                                onChange={handleChange}
                                                MaxLength={100}
                                            />

                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Last Name" size={3} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="Last Name"
                                                id="lastName"
                                                name="lastName"
                                                value={state.lastName}
                                                onChange={handleChange}
                                                MaxLength={100}
                                            />
                                            {errorMessages?.errorLastName && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter last name
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Specialty" size={3} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <SelectField
                                                placeholder="Select Specialty"
                                                onChange={handleChange}
                                                name="specliaty"
                                                id="specliaty"
                                                value={state?.specliaty}
                                                MaxLength="255"
                                                type="text"
                                                options={specialityList}
                                            />
                                            {errorMessages?.errorSpecliaty && !state.specliaty > 0 ? (<FormHelperText style={{ color: "red" }} >
                                                Please select specialty
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Email" size={3} mandatory={true} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="Email"
                                                id="email"
                                                name="email"
                                                value={state.email}
                                                onChange={handleChange}
                                                MaxLength={50}
                                            />
                                            {errorMessages?.errorEmail && !validateEmail(state.email) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid email
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Phone #" size={3} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="(125) 454-4578"
                                                id="contactNumber"
                                                name="contactNumber"
                                                value={state.contactNumber}
                                                onChange={handlePhoneChange}
                                                MaxLength={14}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Fax #" size={3} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="(125) 454-4578"
                                                id="fax"
                                                name="fax"
                                                value={state.fax}
                                                onChange={handlePhoneChange}
                                                MaxLength={14}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Label title="Direct Address" size={3} />
                                        <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <InputBaseField
                                                placeholder="Direct Address"
                                                id="address"
                                                name="address"
                                                value={state.address}
                                                onChange={handleChange}
                                                MaxLength={3000}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
                                <Grid item alignItems="flex-start" justify="flex-end" xs={9} sm={9} md={9} lg={9} xl={9}>
                                    {isSaving ?
                                        <FormBtn id="loadingSave" > Save</FormBtn>
                                        :
                                        <FormBtn id="save" onClick={Save}> Save</FormBtn>
                                    }
                                    <FormBtn id="resetBtn" onClick={Reset}> Reset </FormBtn>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </ Scrollbars>
            </Dialog>



        </>
    )

}
export default withSnackbar(NewReferringProviderDialog)