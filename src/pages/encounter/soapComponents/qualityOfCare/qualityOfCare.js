import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function QualityOfCare({ isExpand, ...props }) {
    var classes = useStyles();
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [isDataExist, setIsDataExist] = useState(false);
    const [QOCState, setQOCState] = useState({
        encounterId: 0, isQcMedicationRecon: false, isQcCurrentMedDocumentation: false, isQcTransferOfCareIn: false, isQcTransferOfCareOut: false,
        isQcDecisionsAids: false, isQcClinicalSummaryDeclined: false
    });

    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    const handleCheckBoxChange = e => {

        const { name, value } = e.target;
        setQOCState(prevState => ({
            ...prevState,
            [name]: value == 'false' ? true : false
        }));
        QOCState[name] = value == 'false' ? true : false;
        saveEncounterPlanData();

    }

    useEffect(() => {
        if (props.encounterId)
            initialization();
    }, [props.encounterId]);

    const initialization = () => {

        loadData();
    }

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {
            if (result.success && result.data != null) {
                setQOCState({
                    isQcMedicationRecon: result.data.isQcMedicationRecon,
                    isQcCurrentMedDocumentation: result.data.isQcCurrentMedDocumentation,
                    isQcTransferOfCareIn: result.data.isQcTransferOfCareIn,
                    isQcTransferOfCareOut: result.data.isQcTransferOfCareOut,
                    isQcDecisionsAids: result.data.isQcDecisionsAids,
                    isQcClinicalSummaryDeclined: result.data.isQcClinicalSummaryDeclined
                });
                setIsDataExist(true);
            }
        })
    }

    const saveEncounterPlanData = (e) => {
        let method = "encounter/updateEncounterSoapQOC";
        QOCState.encounterID = encounterId;
        PostDataAPI(method, QOCState, true).then((result) => {
            if (result.success == true) {
            }
        })
    }
    return (
        <>
            <div className={classes.soapBox}>

                <Accordion expanded={expendState}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <h3>Quality of Care</h3>
                    </AccordionSummary>

                    <AccordionDetails>

                        <Grid row container md={12} lg={12} sm={12}>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcMedicationRecon"
                                    label="Medication Reconciliation"
                                    checked={QOCState.isQcMedicationRecon}
                                    value={QOCState.isQcMedicationRecon}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcCurrentMedDocumentation"
                                    label="Documentation for current medications"
                                    value={QOCState.isQcCurrentMedDocumentation}
                                    checked={QOCState.isQcCurrentMedDocumentation}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Grid row container md={12} lg={12} sm={12}>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcTransferOfCareIn"
                                    label="Transfer of care - Incoming"
                                    checked={QOCState.isQcTransferOfCareIn}
                                    value={QOCState.isQcTransferOfCareIn}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcTransferOfCareOut"
                                    label="Transfer of care - Outgoing"
                                    checked={QOCState.isQcTransferOfCareOut}
                                    value={QOCState.isQcTransferOfCareOut}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Grid row container md={12} lg={12} sm={12}>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcDecisionsAids"
                                    label="Patient decisions aids/ Education material  given"
                                    checked={QOCState.isQcDecisionsAids}
                                    value={QOCState.isQcDecisionsAids}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                            <Grid item md={6} lg={6} sm={6}>
                                <CheckboxField
                                    color="primary"
                                    name="isQcClinicalSummaryDeclined"
                                    label="Patient declined to receive clinical summary"
                                    checked={QOCState.isQcClinicalSummaryDeclined}
                                    value={QOCState.isQcClinicalSummaryDeclined}
                                    onChange={handleCheckBoxChange}
                                    IsDisabled={props.disabled ? true: false}
                                />
                            </Grid>
                        </Grid>

                    </AccordionDetails>

                </Accordion>


            </div>
        </>
    )
}

export default QualityOfCare;