import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import AddhealthConcern from './../../../patients/component/clinical/components/dialogs/AddHealthConcern'
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../components/Message/Alert";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";


function SoapHealthConcern({ patientId, isExpand, isUpdate, ...props }) {

    var classes = useStyles();
    const { showMessage } = props;

    const [addHConcern, setAddHConcern] = useState(false);
    const [healthConcernId, setHealthConcernId] = useState(0);
    const [isEdit, setIsEdit] = useState(false)

    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    const [listRowsData, setListRowsData] = useState([]);

    const closeDirectivesDialog = () => {
        loadData();
        setAddHConcern(false);
    }

    const addDialog = () => {
        setHealthConcernId(0);
        setAddHConcern(true);
        setIsEdit(false)
    }
    const editHealthConcern = (id) => {
        setHealthConcernId(id);
        setAddHConcern(true);
        setIsEdit(true)
    }
    const loadData = () => {
        var params = {
            code: "patient_health_concerns",
            parameters: [patientId]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);
                setListRowsData(
                    result.data.map((item, i) => {
                        return {

                            listTitle: `${item.text1} | ${item.text2}`,
                            listId: parseInt(item.id),
                            value: item.text3,
                            type: item.text1
                            //status: item.text3
                        };
                    }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    useEffect(() => {
        loadData();
    }, [isUpdate]);
    return (
        <>
            <div className={classes.soapBox}>

                <Accordion expanded={expendState}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <h3>Health Concerns </h3>
                        {!props.disabled ?
                            <span className={classes.addNew} onClick={addDialog}><img src={AddIcon} alt="Add New" /></span>
                            : ''}

                    </AccordionSummary>




                    <AccordionDetails>
                        {listRowsData.length > 0 ?
                            <ul className={classes.treeView}>
                                {listRowsData.map((item, i) => (


                                    (<li className={classes.treeViewLi} key={i} onClick={props.disabled ? '' : () => editHealthConcern(item.listId)}>
                                        <div className={classes.treeContent}>
                                            <div className={props.disabled ? classes.DistreeIcon: classes.treeIcon}><ChevronRightIcon /></div>
                                            <div className={props.disabled ? classes.DistreeLabel:classes.treeLabel}> {item.listTitle}</div>
                                        </div>
                                    </li>)

                                )
                                )}
                            </ul> : <Grid row >
                                <CheckboxField
                                    color="primary"
                                    name="allowOverlap"
                                    label="Patient has no health concerns"
                                />
                            </Grid>
                        }
                    </AccordionDetails>

                </Accordion>
            </div>

            {addHConcern ?
                <AddhealthConcern closeDirectivesDialog={closeDirectivesDialog}
                    patientId={patientId}
                    healthConcernId={healthConcernId}
                    healthConcernData={listRowsData}
                    isEditable={props.isEditable}
                    isEdit={isEdit}
                >
                </AddhealthConcern>
                : ''
            }
        </>
    )
}

export default withSnackbar(SoapHealthConcern);