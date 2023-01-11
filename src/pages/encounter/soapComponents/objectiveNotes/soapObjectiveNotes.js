import React, { useState, useEffect } from "react";
import { Grid, FormHelperText } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import FunctionalStatus from "./../../../encounter/components/encounterDetail/components/functionalStatus/FunctionalStatus";
import CognitiveStatus from './../../../encounter/components/encounterDetail/components/cognitiveStatus/CognitiveStatus';
import ScreeningInterventions from './../../../encounter/components/encounterDetail/components/screeningInterventions/ScreeningInterventions';

function ObjectiveNotes({ isExpand, patientId, patientAppointmentId, disabled, isUpdate, ...props }) {
    var classes = useStyles();
    const MAX_EDITOR_LENGTH = 2000;
    const [errorMessages, setErrorMessages] = useState({ errorEditorMaxValue: false })
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [isDataExist, setIsDataExist] = useState(false);
    const [subComponentVisbility, setSubComponentVisbility] = useState({ objectiveNotes: false, observation: false, assessment: false })
    const [objectiveState, setObjectiveState] = useState({
        encounterId: 0, objective: ""
    });
    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);
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
        
        setEDITOR_CHAR_LENGTH(editorDetail.length);

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
            let objectiveNotes = props.subComponent.some(item => item.componentCode == "objective_notes_soap" && item.isActive == true);
            let observations = props.subComponent.some(item => item.componentCode == "observations_soap" && item.isActive == true);
            let assessment = props.subComponent.some(item => item.componentCode == "objective_assessment_soap" && item.isActive == true);
            subComponentVisbility.objectiveNotes = objectiveNotes;
            subComponentVisbility.observation = observations;
            subComponentVisbility.assessment = assessment;
            initialization();
        }
    }, [props.encounterId, isUpdate]);

    const initialization = () => {

        loadData();
    }

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.objective) {
                    setObjectiveState({
                        objective: result.data.objective,
                        encounterId: result.data.encounterId
                    });
                    setEditorValue(RichTextEditor.createValueFromString(result.data.objective, 'html'));
                    setIsDataExist(true);
                }
                else {
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));
                    setIsDataExist(false);
                }
            }
        })
    }

    const saveEncounterObjectiveData = (e) => {
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
            let method = "encounter/updateEncounterSoapObjective";
            let editorSubjective = editorValue.toString('html');
            objectiveState.objective = editorSubjective;
            objectiveState.encounterID = encounterId;
            PostDataAPI(method, objectiveState, true).then((result) => {
                if (result.success == true) {
                }
            })
        }
        else {

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
                                <h3>Objective</h3>
                            </div>

                        </div>

                    </AccordionSummary>
                    {subComponentVisbility.objectiveNotes ? <AccordionDetails>
                        <div className={classes.listTitle}>
                            <h4>Objective Notes</h4>

                        </div>
                        <Grid row >
                            <RichTextEditor
                                className={classes.comlplaintrichTextEdit}
                                value={editorValue}
                                onChange={handleEditorChange}
                                toolbarConfig={toolbarConfig}
                                onBlur={saveEncounterObjectiveData}
                                disabled={disabled ? true : false}
                            />

                            {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH}
                            {errorMessages.errorEditorMaxValue ?
                                (<FormHelperText style={{ color: "red" }} >Maximum 2000 characters allowed</FormHelperText>)
                                : ('')
                            }

                        </Grid>
                    </AccordionDetails> : ""}
                    {subComponentVisbility.observation ? <> <AccordionDetails>
                        <div className={classes.functionalStatusContain}>
                            <FunctionalStatus disabled={disabled} encounterId={encounterId} inlineBlock={'inline-block'} textAlign={'right'}></FunctionalStatus>
                        </div>
                    </AccordionDetails>

                        <AccordionDetails>
                            <div className={classes.CognitiveStatusContain}>
                                <CognitiveStatus disabled={disabled} encounterId={encounterId}></CognitiveStatus>
                            </div>
                        </AccordionDetails></> : ''}

                    {subComponentVisbility.assessment ? <AccordionDetails>
                        <div className={classes.ObjContain}>
                            <ScreeningInterventions disabled={disabled} patientAppointmentId={patientAppointmentId} encounterId={encounterId}></ScreeningInterventions>
                        </div>
                    </AccordionDetails> : ''}
                </Accordion>

            </div>
        </>
    )
}

export default ObjectiveNotes;