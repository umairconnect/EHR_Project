import React, { useState, useEffect } from "react";
import { CheckboxField } from "../../../../components/InputField/InputField";
import { Grid, FormHelperText } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MedicationEnc from './../../../encounter/components/encounterDetail/components/medication/Medication';
import OfficeTests from './../../../encounter/components/encounterDetail/components/officeTests/OfficeTests';
import Procedure from './../../../encounter/components/encounterDetail/components/procedure/Procedure';

import LabImageOrder from "./../imageOrder/soapImagingOrder";

function SoapPlan({ isExpand, patientId, patientAppointmentId, disabled, isUpdate, ...props }) {
    var classes = useStyles();
    const MAX_EDITOR_LENGTH = 2000;
    const [isEditable] = useState(props.isEditable)
    const [errorMessages, setErrorMessages] = useState({ errorEditorMaxValue: false })
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [isDataExist, setIsDataExist] = useState(false);
    const [subComponentVisbility, setSubComponentVisbility] = useState({ planNotes: false, planMedication: false, planLabOrder: false, planImagingOrder: false,planProcedure:false })
    const [planState, setPlanState] = useState({
        encounterId: 0, assessment: ""
    });
    const handleEditorChange = (editorValue) => {
        const regex = /(<([^>]+)>)/ig;
        let editorDetail = editorValue.toString('html').replace(regex, '');
        if (editorDetail && editorDetail.length > (MAX_EDITOR_LENGTH)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }
        setEditorValue(editorValue);
    }

    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'strikethrough', style: 'STRIKETHROUGH' },
            // { label: 'blockquote', style: 'BLOCKQUOTE' }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
            { label: 'Blockquote', style: 'blockquote' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Style', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ]

    };

    useEffect(() => {
        if (props.encounterId) {
            let planNotes = props.subComponent.some(item => item.componentCode == "plan_notes_soap" && item.isActive == true);
            let planMedication = props.subComponent.some(item => item.componentCode == "add_medication_plan_soap" && item.isActive == true);
            let planLabOrder = props.subComponent.some(item => item.componentCode == "lab_orders_soap" && item.isActive == true);
            let planImagingOrder = props.subComponent.some(item => item.componentCode == "imaging_orders_soap" && item.isActive == true);
            let planProcedure = props.subComponent.some(item => item.componentCode == "plan_procedure_soap" && item.isActive == true);
            subComponentVisbility.planNotes = planNotes;
            subComponentVisbility.planMedication = planMedication;
            subComponentVisbility.planLabOrder = planLabOrder;
            subComponentVisbility.planImagingOrder = planImagingOrder;
            subComponentVisbility.planProcedure = planProcedure;
            initialization();
        }

    }, [props.encounterId, isUpdate]);

    const initialization = () => {

        loadData();
    }

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.plan) {
                    setPlanState({
                        plan: result.data.plan,
                        encounterId: result.data.encounterId
                    });
                    setEditorValue(RichTextEditor.createValueFromString(result.data.plan, 'html'));
                    setIsDataExist(true);
                }
                else {
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));
                    setIsDataExist(false);
                }
            }
        })
    }

    const saveEncounterPlanData = (e) => {
        let errorList = []
        const regex = /(<([^>]+)>)/ig;
        let editorDetail = editorValue.toString('html').replace(regex, '');
        if (editorDetail && editorDetail.length > (MAX_EDITOR_LENGTH)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }
        if (errorList.length < 1) {
            let method = "encounter/updateEncounterSoapPlan";
            let editorSubjective = editorValue.toString('html');
            planState.plan = editorSubjective;
            planState.encounterID = encounterId;
            PostDataAPI(method, planState, true).then((result) => {
                if (result.success == true) {

                }
            })
        } else {

        }
        
    }

    return (
        <>
            <div className={classes.soapBox}>


                <Accordion expanded={expendState}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div>
                            <div className={classes.listTitle}>
                                <h3>Plan</h3>
                            </div>


                        </div>



                    </AccordionSummary>
                    {subComponentVisbility.planNotes ? <AccordionDetails>

                        <div className={classes.listTitle}>
                            <h4>Plan Note</h4>
                            {/* <span className={classes.addNew} style={{ marginLeft: "10px" }}>View Templates</span> */}
                        </div>
                        
                        <Grid row >
                            <RichTextEditor
                                className={classes.comlplaintrichTextEdit}
                                value={editorValue}
                                onChange={handleEditorChange}
                                toolbarConfig={toolbarConfig}
                                onBlur={saveEncounterPlanData}
                                disabled={disabled ? true: false}
                            />
                            {errorMessages.errorEditorMaxValue ?
                                (<FormHelperText style={{ color: "red" }} >Maximum 2000 characters allowed</FormHelperText>)
                                : ('')
                            }
                        </Grid>
                    </AccordionDetails> : ""}

                    {subComponentVisbility.planProcedure ? <AccordionDetails>
                        <div className={classes.mediContain}>
                            <Procedure disabled={disabled} encounterId={encounterId} patientId={patientId} isEditable={isEditable} />
                        </div>
                    </AccordionDetails> : ""}

                    

                    {subComponentVisbility.planMedication ? <AccordionDetails>
                        <div className={classes.mediContain}>
                            <MedicationEnc disabled={disabled} patientId={patientId} patientAppointmentId={patientAppointmentId} encounterId={encounterId} isEditable={isEditable} isEncounterSpecific={true} />
                        </div>
                    </AccordionDetails> : ""}
                    <AccordionDetails>
                        {subComponentVisbility.planLabOrder ? <div className={classes.mediContain}>
                            <OfficeTests disabled={disabled} encounterId={encounterId} patientId={patientId} />
                        </div> : ""}

                    </AccordionDetails>

                    <AccordionDetails>
                        {subComponentVisbility.planImagingOrder ? <div className={classes.imaginglab}>
                            <LabImageOrder disabled={disabled}  patientId={patientId} encounterId={encounterId}></LabImageOrder>
                        </div>
                            : ""}
                    </AccordionDetails>

                </Accordion>








            </div>
        </>
    )
}

export default SoapPlan;