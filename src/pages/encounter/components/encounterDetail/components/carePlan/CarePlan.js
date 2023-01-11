import React, { useState, useEffect } from "react";
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import CarePlanDialog from "../../../carePlan/CarePlanDialog";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// styles
import useStyles from "./styles";
import { formatDate } from '../../../../../../components/Common/Extensions';


export default function CarePlan(props) {
    var classes = useStyles();

    const [carePlanRowsData, setCarePlanRowsData] = useState([]);
    const [showHideCarePlanDialog, setShowHideCarePlanDialog] = useState(false);
    const [carePlanId, setCarePlanId] = useState(0);


    useEffect(() => {
        if (props.encounterId)
            loadData();

    }, [props.encounterId, showHideCarePlanDialog]);

    const loadData = () => {

        let procData = {
            "encounterID": props.encounterId
        }
        PostDataAPI("CarePlan/loadCarePlanForEncounter", procData).then((result) => {

            if (result.success && result.data) {
                setCarePlanRowsData(result.data.map((item, i) => {
                    return {
                        listTitle: item.goal + ": " + formatDate(item.startDate) + " | " + item.status,
                        carePlanId: item.carePlanId
                    };
                }));

            }
            else {
                setCarePlanRowsData([]);

            }
        })

    }
    const editCarePlan = (id) => {

        setCarePlanId(id);
        setShowHideCarePlanDialog(true);
    }
    const addNewCarePlan = () => {

        setCarePlanId(0);
        setShowHideCarePlanDialog(true);
    }

    return (
        <>
            <ListTitle title="Care Plan" disabled={props.disabled} checkData={false} onClick={() => addNewCarePlan()} />

            {
                carePlanRowsData.length < 1 ? (
                    !props.disabled ? <div className={classes.noRecord}>No care plan recorded yet</div> : <div className={classes.DisnoRecord}>No Patient  Instructions (plan of care)  added yet</div>) : (
                    <ul className={classes.treeView} >
                        {carePlanRowsData.map((item, i) => (
                            <li className={classes.treeViewLi} key={i} onClick={() => editCarePlan(item.carePlanId)}>
                                <div className={classes.treeContent}>
                                    {!props.disabled ?
                                        <>
                                            <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                            <div className={classes.treeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                        </> :
                                        <>
                                            <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                            <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                        </>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }

            <CarePlanDialog showHideDialog={showHideCarePlanDialog} handleClose={() => { setShowHideCarePlanDialog(false); }}
                encounterId={props.encounterId} carePlanId={carePlanId} patientId={props.patientId} userLocationId={props.userLocationId} />





        </>

    );
}


