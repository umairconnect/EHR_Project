import React, { useState, useRef, useEffect } from 'react';
import {
    Grid,
    InputBase,
    FormLabel,
    FormHelperText,
    IconButton,
    Dialog,
    Divider
} from '@material-ui/core';
import useStyles from './styles'
import { ShadowBox, FooterBtn, FormGroupTitle, FormBtn, LinkS, Label, DraggableComponent } from "../../../../../components/UiElements/UiElements";
import CloseIcon from "../../../../../images/icons/math-plus.png";
import DangerIcon from "../../../../../images/icons/danger.svg";
import { withSnackbar } from '../../../../../components/Message/Alert';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import { Alert } from "@material-ui/lab"; //AlertTitle
import { Scrollbars } from "rc-scrollbars";


function MedicationViewDialog({ openViewMedication, closeViewMedication, ...props }) {

    const classes = useStyles();

    const { showMessage } = props;
    
    const [locationInformation, setLocationInformation] = useState([]);
    const [state, setState] = useState({
        rxnorm: "", drug_name: "", create_date: '', dispense_quantity: "", unit_code: "", refill_number: "", patient_fullname: "", patient_address: "", patient_home_phone: "",
        patient_office_phone: "", pharmacy_id: 0, pharmacy_name: "", pharmacy_address: "", patient_gender: "", patient_state: "", patient_birth_date: "", pharmacy_state: "", pharmacy_phone: "", pharmacy_fax: "",
        prescribing_providerid: "", prescribing_provider_name: "", supervising_provider_name: ""

    });
    const [medicationId, setMedicationId] = useState(props.medicationId);
    useEffect(() => {

        console.log(props)
        loaddata();
    }, [])
    const formatDate = (date) => {
        // Reformat date in MM/dd/yy

        if (date.split('-').length > 1) {

            var day = date.split('-')[2];
            var month = date.split('-')[1];
            var year = date.split('-')[0];
            return month + "/" + day + "/" + year;
        }
        else if (date.split('/').length > 0) {
            var datenew = date.split(' ')[0];
            var day = datenew.split('/')[1];
            var month = datenew.split('/')[0];
            var year = datenew.split('/')[2];
            return month + "/" + day + "/" + year;
        }
    }

    const openCloseModal = () => {
        openViewMedication();
    }
    const loadprescribelocation = (medicineproviderid) => {
        var params = {
            code: "medication_provider_By_location_Info",
            parameters: ["" + medicineproviderid + "", ""]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setLocationInformation(
                    result.data.map((item, i) => {
                        return { text1: item.text1, text2: item.text2, text3: item.text3, text4: item.text4 };
                    }));
            }

        })
    }

    const cancelRx = () => {
             showMessage("Information", "Feature will be added soon.", "info", 3000);
    }
    const loaddata = () => {
        console.info(medicationId);
        PostDataAPI("patient/medication/getMedicationViewRecord", medicationId).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);

                setState(result.data[0]);
                if (result.data[0].create_date) {
                    result.data[0].create_date = formatDate(result.data[0].create_date.split('T')[0]);

                }
                if (result.data[0].patient_birth_date) {

                    result.data[0].patient_birth_date = formatDate(result.data[0].patient_birth_date.split('T')[0]);
                }
                loadprescribelocation(result.data[0].prescribing_providerid)
                console.info(state)
                console.info(locationInformation)

            }
            else if (!result.message) {
                //showMessage("Error", result.message, "error", 3000);
            }
        })

    }

    return (
        <>

            <Dialog
                classes={{ paper: classes.viewMedicationPaper }}
                open={openCloseModal}
                onClose={closeViewMedication}
                PaperComponent={DraggableComponent}
            >
                <Divider />
                <div className={classes.dialogcontent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Medication View</FormGroupTitle>
                            <span className={classes.crossButton} onClick={closeViewMedication}><img src={CloseIcon} /></span>

                        </div>
                        <div className={classes.content}>

                            <Grid container lg={12} md={12}>
                                <table className={classes.tablelayout}>
                                    <thead>
                                        <tr>
                                            <th><p className={classes.themBlack}>{state.drug_name}</p></th>
                                            <th style={{ textAlign: "right" }}>Script Date: <span style={{ fontWeight: 400 }}>{state.create_date}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </Grid>
                            <Scrollbars style={{ minHeight: 495 }} >
                                <Grid container lg={12} md={12}>
                                    <Grid item lg={2} md={2} className={classes.colHeading}>
                                        <b>Despense :</b>
                                    </Grid>
                                    <Grid item lg="2" md={2}>
                                        {state.dispense_quantity} {state.unit_code}
                                    </Grid>
                                    <Grid item lg={2} md={2} className={classes.colHeading}>
                                        <b> Refills :</b>
                                    </Grid>
                                    <Grid item lg={2} md={2}>
                                        {state.refill_number}
                                    </Grid>
                                </Grid>

                                <Grid container lg={12} md={12}>
                                    <Grid item lg={2} md={2} />
                                    <Grid item lg={9} md={9} className={classes.statusPoints}>

                                        <Alert
                                            severity="error"
                                            classes={{ root: classes.alertRoot }} >
                                            Alert : No drug or allergy alerts triggered for this Medication.
                                        </Alert>
                                        <Alert
                                            severity="warning"
                                            classes={{ root: classes.alertRoot }} >
                                            Unknown - : No active or valid coverage found.
                                        </Alert>


                                    </Grid>
                                </Grid>

                                <Grid container lg={12} md={12} className={classes.sectionMargin} alignItems="baseline">
                                    <Grid item lg={2} md={2} className={classes.colHeading}>
                                        <b>  Pharmacy:</b>
                                    </Grid>
                                    <Grid item lg={9} md={9}>
                                        <div className={classes.greyBox}>
                                            <b>{state.pharmacy_name}</b>
                                            <p>{state.pharmacy_address}{state.pharmacy_state ? ',' + state.pharmacy_state : ''}<br />
                                                {state.pharmacy_phone} {state.pharmacy_fax ? 'Fax ' + state.pharmacy_fax : ''}</p>
                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid container lg={12} md={12} className={classes.sectionMargin}>
                                    <Grid item lg={2} md={2} className={classes.colHeading}>
                                        <b>Prescribing Provider:</b>
                                    </Grid>
                                    <Grid item lg="3" md={3}>
                                        {state.prescribing_provider_name}
                                    </Grid>
                                    <Grid item lg={3} md={3} className={classes.colHeading}>
                                        <b> Supervising Provider:</b>
                                    </Grid>
                                    <Grid item lg={2} md={2}>
                                        {state.supervising_provider_name}
                                    </Grid>
                                </Grid>

                                <Grid container lg={12} md={12} className={classes.sectionMargin} alignItems="baseline">
                                    <Grid item lg={2} md={2} className={classes.colHeading}>
                                        <b> Prescribing Location:</b>
                                    </Grid>
                                    <Grid item lg={9} md={9}>
                                        <div className={classes.greyBox}>

                                            <b>{locationInformation[0] ? locationInformation[0].text1 : ""}</b>
                                            <p>{locationInformation[0] ? locationInformation[0].text2 ? locationInformation[0].text2 : '' : ""}  <br />
                                                {locationInformation[0] ? locationInformation[0].text4 ? "Phone #" + locationInformation[0].text4 : "" : ""}  {locationInformation[0] ? locationInformation[0].text3 ? "Fax #" + locationInformation[0].text3 : "" : ""}</p>
                                        </div>
                                    </Grid>

                                </Grid>

                            <Grid container lg={12} md={12} className={classes.sectionMargin} alignItems="baseline">
                                <Grid item lg={2} md={2} className={classes.colHeading}>
                                <b> Patient:</b>
                                </Grid>
                                <Grid item lg={9} md={9}>
                                    <div className={classes.greyBox}>
                                        <b>{state.patient_fullname}{state.patient_gender?', ' + state.patient_gender : ''}{state.patient_birth_date?', ' + state.patient_birth_date : ''} </b>
                                        <p>{state.patient_home_phone ? "Phone # " + state.patient_home_phone:""} {state.patient_office_phone?"Fax #"+ state.patient_office_phone:""} </p>
                                    </div>
                                </Grid>

                                </Grid>

                                <Grid container lg={12} md={12} className={classes.sectionMargin}>
                                    <h3 className={classes.tableHeading}>Pharmacy Communication History</h3>
                                    <table className={classes.tablelayout}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "120px" }}>Date</th>
                                                <th>Action</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>04/16/2021</td>
                                            <td>Order Sent</td>
                                            <td>Verified</td>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Scrollbars>

                            <Grid container lg={12} md={12} className={classes.actionButton}>
                                <FormBtn id="noIcon" style={{ background: "#dd3232" }} onClick={cancelRx}> Cancel Rx</FormBtn> 
                                <FormBtn id="noIcon" onClick={closeViewMedication}>Close</FormBtn>
                            </Grid>

                        </div>
                    </div>
                </div>
            </Dialog >

        </>
    )
}
export default withSnackbar(MedicationViewDialog)