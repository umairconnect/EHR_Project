import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import DiagnosisForm from "../../../../../patients/component/diagnosis/components/DiagnosisForm";
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";
function Diagnosis(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable)
    const [patientId, setPatientId] = useState(parseInt(props.patientId));
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    const [isEncounterSpecific, setIsEncounterSpecific] = useState(props.isEncounterSpecific?true:false);
    const [listRowsData, setListRowsData] = useState([]);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [diagnosisId, setDiagnosisId] = useState(0);
    const [disabled] = useState(props.disabled);
    const [collapse, setCollapse] = useState({ active: true, resolved: true });

    useEffect(() => {

        initialization();

    }, []);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {
        var params = '';
        if (isEncounterSpecific) {
           params = {
                code: "patient_diagnosis_by_encounter_id",
                parameters: [encounterId ? encounterId.toString() : ""]
            }
        } else {
            params = {
                code: "patient_diagnosis",
                parameters: [patientId ? patientId.toString() : ""]
            }
        }
        
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                setListRowsData(
                    result.data.map((item, i) => {
                        return {

                            listTitle: item.text1 == "" ? `${item.text2}` : `${item.text1},${item.text2}`,
                            listId: parseInt(item.id),
                            isEncounterSpecific: item.id1 == encounterId ? ' ✔️ ' : '',
                            value: item.text2 ,
                            status: item.text3
                        };
                    }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const handleCloseDiagnossisForm = () => {
        loadData();
        setDialogOpenClose(false);
    }
    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        loadData();
        setDialogOpenClose(false);
    }
    
    const newDiagnosis = () => {
        if (listRowsData.map((item, i) => item.status == "Active").length < 12) {
            setDiagnosisId(0);
            setDialogOpenClose(true);
        }
        else {
            showMessage("Error", "A maximum of 12 diagnosis can be added.", "error", 3000);
        }
        
    }
    const editDiagnosis = (id) => {
        setDiagnosisId(id);
        setDialogOpenClose(true);
    }
    const collapseActiveList = (collapsestate) => {
        setCollapse({ active: !collapsestate, resolved: collapse.resolved })
    }
    const collapseResolvedList = (collapsestate) => {
        setCollapse({ resolved: !collapsestate, active: collapse.active })
    }
    return (
        <>

            <div className={classes.listTitle}>
                <span>Diagnosis</span>
                {!props.disabled ?
                    <span className={classes.addNew} title="Add New Diagnosis" onClick={() => newDiagnosis()}>{isEditable ? <img src={AddIcon} alt="Add New" />:''}</span>
                    : ""}
            </div>
            {isEncounterSpecific ?
                <>
                    {listRowsData.length > 0 ?
                        <ul className={classes.treeView}>
                            {listRowsData.map((item, i) => (
                                !props.disabled ?
                                    (<li key={i} onClick={() => editDiagnosis(item.listId)}>
                                        <div className={classes.treeContent}>
                                            <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                            <div className={classes.treeLabel}> {item.listTitle}</div>
                                        </div>
                                    </li>)
                                    :
                                    (<li key={i} style={{ cursor: "default" }}>
                                        <div className={classes.treeContent}>
                                            <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                            <div className={classes.DistreeLabel}> {item.listTitle}</div>
                                        </div>
                                    </li>)
                            ))}
                        </ul> : ""
                    }
                    {!listRowsData || listRowsData.length <= 0 ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No active diagnosis recorded yet</div>
                            :
                            <div className={classes.noRecord}>No active diagnosis recorded yet</div>
                        : ""
                    }
                </>
                :
                <div className={collapse.resolved ? classes.listSubChild : classes.listSubChildOpen}>
                    <>
                    <div className={classes.activeTitleArea}>
                        <span title="Expand" className={classes.collapseIconSpan} onClick={() => collapseActiveList(collapse.active)}>
                            {collapse.active ? <ArrowDownIcon /> : <ArrowRightIcon />}
                        </span>
                        <span>Active</span>
                    </div>
                    {listRowsData.length > 0 && collapse.active ?
                        <ul className={classes.treeView}>
                            {listRowsData.map((item, i) => (
                                item.status == "Active" ?
                                    !props.disabled ?
                                        (<li key={i} onClick={() => editDiagnosis(item.listId)}>
                                            <div className={classes.treeContent}>
                                                <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                <div className={classes.treeLabel}> {item.listTitle}{item.isEncounterSpecific}</div>
                                            </div>
                                        </li>)
                                        :
                                        (<li key={i} style={{cursor:"default"}}>
                                        <div className={classes.treeContent}>
                                            <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                <div className={classes.DistreeLabel}> {item.listTitle}{item.isEncounterSpecific}</div>
                                            {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#52575C"}}>{item.status}</span></div> */}
                                        </div>
                                    </li>)
                                    :""
                                    )
                                )}
                            </ul>:""
                        }
                        { !listRowsData.some((obj) => obj.status == "Active") && collapse.active ?
                                props.disabled ?
                                    <div className={classes.DisnoRecord}>No active diagnosis recorded yet</div>                         
                                :
                                    <div className={classes.noRecord}>No active diagnosis recorded yet</div> 
                                :""
                        }
                </>
                <>
                    <div className={classes.resolvedTitleArea}>
                        <span title="Expand" className={classes.collapseIconSpan} onClick={() => collapseResolvedList(collapse.resolved)}>
                            {collapse.resolved ? <ArrowDownIcon /> : <ArrowRightIcon />}
                        </span>
                        <span>Resolved</span>
                    </div>
                    {listRowsData.length > 0 && collapse.resolved && listRowsData.some((obj) => obj.status == "Resolved") ?
                        <ul className={classes.treeView}>
                            {listRowsData.map((item, i) => (
                                item.status == "Resolved" ?
                                    !props.disabled ?
                                        (<li key={i} onClick={() => editDiagnosis(item.listId)}>
                                            <div className={classes.treeContent}>
                                                <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                <div className={classes.treeLabel}> {item.listTitle}{item.isEncounterSpecific}</div>
                                                {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#00B4E5"}}>{item.status}</span> */}
                                            </div>
                                        </li>)
                                        :
                                        (<li key={i} style={{cursor:"default"}}>
                                        <div className={classes.treeContent}>
                                            <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                <div className={classes.DistreeLabel}> {item.listTitle}{item.isEncounterSpecific}</div>
                                        </div>
                                    </li>)
                                    :""
                                    )
                                )}
                            </ul>:""
                        }
                        { !listRowsData.some((obj) => obj.status == "Resolved") && collapse.resolved ?
                                props.disabled ?
                                    <div className={classes.DisnoRecord}>No resolved diagnosis recorded yet</div>                         
                                :
                                    <div className={classes.noRecord}>No resolved diagnosis recorded yet</div> 
                                :""
                        }
                </>
            </div>}
            

            {
                dialogOpenClose ? (<DiagnosisForm patientId={patientId}
                    diagnosisId={diagnosisId}
                    encounterId={encounterId}
                    dialogOpenClose={dialogOpenClose}
                    handleClose={handleCloseDiagnossisForm}
                    handleSuccess={handleDialogSuccess}
                    isEditable={ isEditable}                />)
                    : ('')
            }
        </>

    );
}
export default withSnackbar(Diagnosis)