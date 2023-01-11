import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import CarePlanDialog from "../../components/carePlan/CarePlanDialog";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { formatDate } from './../../../../components/Common/Extensions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function SoapCarePlan({ isExpand, isUpdate, ...props}) {
    var classes = useStyles();
    const [carePlanRowsData, setCarePlanRowsData] = useState([]);
    const [showHideCarePlanDialog, setShowHideCarePlanDialog] = useState(false);
    const [carePlanId, setCarePlanId] = useState(0);

    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    useEffect(() => {
        if (props.encounterId)
            loadData();

    }, [props.encounterId, showHideCarePlanDialog, isUpdate]);


    const loadData = () => {

        let procData = {
            "encounterID": props.encounterId
        }
        PostDataAPI("CarePlan/loadCarePlanForEncounter", procData).then((result) => {

            if (result.success && result.data) {
                setCarePlanRowsData(result.data.map((item, i) => {
                    return {
                        listGoal: item.goal,
                        listDate: formatDate(item.startDate),
                        listState: item.status,
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
            <div className={classes.soapBox}>


                <Accordion expanded={expendState}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <div className={classes.soapCareTitle}>
                            <ListTitle title="Care Plan" disabled={props.disabled} checkData={false} onClick={() => addNewCarePlan()} />
                            {/* <div className={classes.printBtn}>
                                <span className={classes.addNew}>Print Visit History</span>
                            </div> */}
                        </div>

                    </AccordionSummary>
                    <AccordionDetails>
                        <table className={classes.tablelayout}>
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Start Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    carePlanRowsData.length < 1 ? (
                                        !props.disabled ? <div className={classes.noRecPadd}>No care plan recorded yet</div> : <div className={classes.noRecPadd}>No Patient  Instructions (plan of care)  added yet</div>) : (
                                        <>
                                            {carePlanRowsData.map((item, i) => (
                                                <>
                                                    {!props.disabled ? <>
                                                        <tr onClick={() => editCarePlan(item.carePlanId)} key={i}>
                                                            <td><div dangerouslySetInnerHTML={{ __html: item.listGoal }}></div></td>
                                                            <td><div dangerouslySetInnerHTML={{ __html: item.listDate }}></div></td>
                                                            <td><div dangerouslySetInnerHTML={{ __html: item.listState }}></div></td>
                                                        </tr>
                                                    </> : ''}
                                                </>

                                            ))}
                                        </>
                                    )
                                }



                            </tbody>

                        </table>
                    </AccordionDetails>
                </Accordion>




            </div>

            <CarePlanDialog showHideDialog={showHideCarePlanDialog} handleClose={() => { setShowHideCarePlanDialog(false); }}
                encounterId={props.encounterId} carePlanId={carePlanId} patientId={props.patientId} userLocationId={props.userLocationId} />
        </>
    )
}

export default SoapCarePlan;