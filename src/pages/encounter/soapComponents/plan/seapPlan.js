import React, { useState, useEffect } from "react";
import { CheckboxField } from "../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import RichTextEditor from 'react-rte';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

function SoapPlan(props) {
    var classes = useStyles();
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [isDataExist, setIsDataExist] = useState(false);
    const [planState, setPlanState] = useState({
        encounterId: 0, assessment: ""
    });
    const handleEditorChange = (editorValue) => {
        setEditorValue(editorValue);
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
        if (props.encounterId)
            initialization();
    }, [props.encounterId]);

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
        let method = "encounter/updateEncounterSoapPlan";
        let editorSubjective = editorValue.toString('html');
        planState.plan = editorSubjective;
        planState.encounterID = encounterId;
        PostDataAPI(method, planState, true).then((result) => {
            if (result.success == true) {
            }
        })
    }

    return (
        <>
            <div className={classes.soapBox}>

                <div className={classes.listTitle}>
                    <h3>Plan</h3>

                </div>

                <div className={classes.listTitle}>
                    <h3>Plan Note</h3>
                    <span className={classes.addNew} style={{marginLeft: "10px"}}>View Templates</span>
                </div>


                <Grid row >
                    <RichTextEditor
                        className={classes.comlplaintrichTextEdit}
                        value={editorValue}
                        onChange={handleEditorChange}
                        toolbarConfig={toolbarConfig}
                        onBlur={saveEncounterPlanData}
                    />
                </Grid>

                <div className={classes.listTitle}>
                    <span className={classes.addNew}><img src={AddIcon} alt="Add New" /> Add Medication</span>
                    <span className={classes.addNew}><img src={AddIcon} alt="Add New" /> Add Lab Orders</span>
                    <span className={classes.addNew}><img src={AddIcon} alt="Add New" /> Add Imaging Orders</span>
                </div>

            </div>
        </>
    )
}

export default SoapPlan;