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

import Diagnosis from "./../../../encounter/components/encounterDetail/components/diagnosis/Diagnosis";


function SoapAssessment({ isExpand, patientId, disabled, isUpdate, ...props }) {
    var classes = useStyles();
    const MAX_EDITOR_LENGTH = 2000;
    const [errorMessages, setErrorMessages] = useState({ errorEditorMaxValue: false })
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [isDataExist, setIsDataExist] = useState(false);
    const [subComponentVisbility, setSubComponentVisbility] = useState({ assessmentNotes: false, diagnosisAttached: false })
    const [assessmentState, setAssessmentState] = useState({
        encounterId: 0, assessment: ""
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
            let assessmentNotes = props.subComponent.some(item => item.componentCode == "assessment_notes_soap" && item.isActive == true);
            let diagnosisAttached = props.subComponent.some(item => item.componentCode == "diagnosis_attached_to_encounter_soap" && item.isActive == true);

            subComponentVisbility.assessmentNotes = assessmentNotes;
            subComponentVisbility.diagnosisAttached = diagnosisAttached;
            initialization();
        }

    }, [props.encounterId,isUpdate]);

    const initialization = () => {
        loadData();
    }

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {
            if (result.success && result.data != null) {
                if (result.data.assessment) {
                    setAssessmentState({
                        assessment: result.data.assessment,
                        encounterId: result.data.encounterId
                    });
                    setEditorValue(RichTextEditor.createValueFromString(result.data.assessment, 'html'));
                    setIsDataExist(true);
                }
                else {
                    setEditorValue(RichTextEditor.createValueFromString("", 'html'));
                    setIsDataExist(false);
                }
            }
        })
    }

    const saveEncounterAssessmentData = (e) => {
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
            let method = "encounter/updateEncounterSoapAssessment";
            let editorSubjective = editorValue.toString('html');
            assessmentState.assessment = editorSubjective;
            assessmentState.encounterID = encounterId;
            PostDataAPI(method, assessmentState, true).then((result) => {
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

                        <div className={classes.listTitle}>
                            <h3>Assessment</h3>
                            {/* <span className={classes.addNew}>View Templates</span> */}
                        </div>

                    </AccordionSummary>
                    {subComponentVisbility.assessmentNotes ? <AccordionDetails>
                        <Grid row >
                            <RichTextEditor
                                className={classes.comlplaintrichTextEdit}
                                value={editorValue}
                                onChange={handleEditorChange}
                                toolbarConfig={toolbarConfig}
                                onBlur={saveEncounterAssessmentData}
                                disabled={disabled ? true : false}
                            />
                                 {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH}
                                 
                            {errorMessages.errorEditorMaxValue ?
                                (<FormHelperText style={{ color: "red" }} >Maximum 2000 characters allowed</FormHelperText>)
                                : ('')
                            }
                        </Grid>
                    </AccordionDetails> : ""}

                    {subComponentVisbility.diagnosisAttached ? <AccordionDetails>
                        <div className={classes.dignosisContain}>
                           <div>
                                <Diagnosis disabled={disabled} patientId={patientId} encounterId={encounterId} />
                           </div>
                    
                        </div>
                    </AccordionDetails> : ""}
                </Accordion>


            </div>
        </>
    )
}

export default SoapAssessment;