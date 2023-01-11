import React, { useState, useEffect } from "react";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import VitalSignForm from "../../../../../patients/component/vitalSigns/component/VitalSignForm"
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import EditIcon from '../../../../../../images/icons/editIcon.png';
import { withSnackbar } from '../../../../../../components/Message/Alert'
// styles
import useStyles from "./styles";

function VitalSigns(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [vitalFormDialog, setVitalFormDialog] = useState({ showHide: false });
    const [patientId, setPatientId] = useState(props.patientId);
    const [encounterId] = useState(props.encounterId);
    const [vitalId, setVitalId] = useState();
    const [listRowsData, setListRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        if (props.encounterId)
         initialization();

    }, [props.encounterId,props.patientId, vitalFormDialog]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {
        
        var params = {
            code: "patVitals",
            parameters: [props.encounterId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            setVitalId(0);
            if (result.success && result.data != null) {
                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                         
                            listTitle: item.text1,
                            listId: parseInt(item.id),
                            value: item.text2
                        };
                    }));
                if (result.data.length > 0)
                    setVitalId(result.data[0].id);
            }
            else {
                setListRowsData([]);
               
            }
        })
    }

    const loadPatientVitalsByDate = (id) =>
    {
        //setVitalId(id);
        setVitalFormDialog({ showHide: true });
    }

    const closepopup = () =>
    {
        setVitalFormDialog({ showHide: false });
        loadData();
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        setVitalFormDialog({ showHide: false });
        loadData();
    }


    return (
        <>
            <div className={classes.listTitle}>
                <span>Vital Signs</span>
                {!props.disabled ? <>
                    {listRowsData.length < 1 ?
                    (<span className={classes.addNew} title={"Add New Vital Signs"} onClick={() => loadPatientVitalsByDate(vitalId)}><img src={AddIcon} alt="Add New" /></span> )
                    :
                    (<span className={classes.editBtn} title={"Edit  Vital Signs"} onClick={() => loadPatientVitalsByDate(0)}><img src={EditIcon} alt="Edit New" /></span>)
                    }</>
                :null}
            </div>
            {listRowsData.length < 1 ?
               (!props.disabled ?<div className={classes.noRecord}>No vital recorded yet</div>:<div className={classes.DisnoRecord}>No vital recorded yet</div>):
                <ul className={classes.treeView}>
                    {listRowsData.map((item, i) => (
                        !props.disabled ?
                        (<li key={i} onClick={() => loadPatientVitalsByDate(item.listId)}>
                            <div className={classes.treeContent}>
                               
                                <div className={classes.DistreeLabel}> {item.listTitle} <span>{item.value}</span></div>
                            </div>
                        </li>)
                        :
                        (<li key={i} style={{cursor:"default"}}>
                            <div className={classes.treeContent}>
                                
                                <div className={classes.DistreeLabel}> {item.listTitle} <span>{item.value}</span></div>
                            </div>
                        </li>)
                    
                    )
                    )}
                </ul>}
            { vitalFormDialog.showHide ?
                <VitalSignForm dialogOpenClose={vitalFormDialog.showHide} handleClose={closepopup} encId={props.encounterId} patId={props.patientId} vitId={vitalId}
                handleSuccess={handleDialogSuccess}                />
                : null
            }
        </>

    );
}
export default withSnackbar(VitalSigns)
