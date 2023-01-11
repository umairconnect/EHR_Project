import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import AddScreeningIntervention from "./components/AddScreeningIntervention";
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

import useStyles from "./styles";

export default function ScreeningInterventions(props) {
    var classes = useStyles();
    const [disabled, setDisabled] = useState(false);
    const encounterId = props.encounterId;
    const patientAppointmentId = props.patientAppointmentId
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [screeningInterventionId, setScreeningInterventionId] = useState(0);

    const [interventionRowsData, setInterventionRowsData] = useState([]);

    const newScreeningIntervention = () => {
        setDialogOpenClose(true);
    }

    const handleCloseForm = () => {
        setDialogOpenClose(false);
        initialization();
        setScreeningInterventionId(0);
    }

    useEffect(() => {

        initialization();

    }, []);

    const editIntervention = (id) => {
        setScreeningInterventionId(id);
        setDialogOpenClose(true);
    }

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        var data = {
            EncounterId: encounterId,
            PatientAppointmentId: patientAppointmentId
        }

        PostDataAPI('patientscreeningintervention/GetAllIntervention', data).then((result) => {
            if (result.success && result.data != null) {

                setInterventionRowsData(
                    result.data.map((item, i) => {
                        return {
                            listTitle:item.description, //item.proc + "-" +
                            listId:item.screeningInterventionId


                        };
                    })
                );
            }


        })
    }



    return (
        <>
            <div className={classes.listTitle}>
                <span>Screenings/Interventions/Assessments</span>

                {!props.disabled ?
                    <span className={classes.addNew} title="Add New" onClick={() => newScreeningIntervention()}><img src={AddIcon} alt="Add New" /></span>
                    : ''
                }
            </div>
            {interventionRowsData.length < 1 ?
                (<div className={props.disabled ? classes.DisnoRecord:classes.noRecord}>No intervention recorded yet</div>
                ) :
                <ul className={classes.treeView}>
                    {interventionRowsData.map((item, i) => (
                        <li key={i} onClick={props.disabled ? '' : () => editIntervention(item.listId)}>
                            <div className={classes.treeContent}>
                                {!disabled ? <>
                                    <div className={props.disabled ? classes.DistreeIcon : classes.treeIcon}><ChevronRightIcon /></div>
                                    <div className={props.disabled ? classes.DistreeLabel : classes.treeLabel}>{item.listTitle}</div>
                                </> : <div className={classes.DistreeLabel}>{item.listTitle}</div>}
                            </div>
                        </li>
                    )
                    )}
                </ul>}


            {
                dialogOpenClose ?
                    (<AddScreeningIntervention InterventionId={screeningInterventionId} patientAppointmentId={patientAppointmentId} encounterId={encounterId} dialogOpenClose={newScreeningIntervention} handleClose={() => handleCloseForm()} />)
                    : ('')
            }
        </>
    )
}