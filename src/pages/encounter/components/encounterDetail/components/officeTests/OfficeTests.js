import React, { useState, useEffect } from "react";
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import LabOrders from '../../../../../patients/component/labOrders/components/newLabOrder/NewLabOrderForm';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


// styles
import useStyles from "./styles";

export default function OfficeTests(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [patientId, setPatientId] = useState(props.patientId);
    const [listRowsData, setListRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [showHideLabOrderDialog, setshowHideLabOrderDialog] = useState(false);
    const [labOrderId, setLabOrderId] = useState(0);
    const [labOrderTestId, setLabOrderTestId] = useState(0);
    const [labOrderDialog, setLabOrderDialog] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);

    useEffect(() => {
        initialization();
    }, [showHideLabOrderDialog]);

    const initialization = () => {
        setLabOrderId(0);
        loadData();
    }

    const loadData = () => {

        var data = {
            patientId: patientId ? parseInt(patientId) : null,
            isElab: props.isImaginOrder,
            patientEncounterId: props.encounterId ? parseInt(props.encounterId) : null
        }

        PostDataAPI("patient/labOrder/getPatientLabOrderGrid", data).then((result) => {
            
            if (result.success && result.data.length > 0) {

                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                            labOrderId: item.labOrderId,
                            lab: item.lab,
                            labTest: item.labTest,
                            labTestId: item.labTestId
                        };
                    }));

            }
            else {
                setListRowsData([]);
            }

        });
    }

    const handleEdit = (idToEdit, labTestId) => {
        setLabOrderId(idToEdit);
        setLabOrderTestId(labTestId);
        //setLabOrderDialog(true);
        setshowHideLabOrderDialog(true);
    }

    return (
        <>
            <ListTitle title="Lab Orders" disabled={props.disabled} checkData={isDataExist} onClick={() => setshowHideLabOrderDialog(true)} />
            {listRowsData.length < 1 ? (

                !props.disabled ? <div className={classes.noRecord}>No lab order recorded yet</div> : <div className={classes.DisnoRecord}>No lab order recorded yet</div>) :
                <ul className={classes.treeView}>
                    {listRowsData.map((item, i) => (
                        !props.disabled ?
                            (<li key={i} >
                                <div className={classes.treeContent}>
                                    <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.treeLabel} onClick={props.disabled ? '' : () => handleEdit(item.labOrderId, item.labTestId)}>
                                        {
                                            item.labTest
                                        }
                                    </div>
                                </div>
                            </li>)
                            :
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.DistreeLabel} onClick={props.disabled ? '' : () => handleEdit(item.labOrderId, item.labTestId)}> {item.labTest}</div>
                                </div>
                            </li>)

                    )
                    )}
                </ul>}


            <LabOrders showHideDialog={showHideLabOrderDialog} handleClose={() => setshowHideLabOrderDialog(false)} encounterId={props.encounterId} dataId={props.patientId} labOrderId={labOrderId} />

        </>

    );
}
