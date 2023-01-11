import React, { useState, useEffect } from "react";
import AddIcon from '../../../../../../images/icons/add-icon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import ImmunizationForm from "../../../../../patients/component/immunizations/component/ImmunizationForm";
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withSnackbar } from '../../../../../../components/Message/Alert'

// styles
import useStyles from "./styles";

function Immunizations(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [patientId] = useState(props.patientId);
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    const [listRowsData, setListRowsData] = useState([]);
    const [disabled] = useState(props.disabled);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [imunizationId, setImunizationId] = useState(0);
    const [collapse,setCollapse] = useState({Administrated:true,Historical:true,Refused:true})

    useEffect(() => {
        console.log(props.isEditable)
        debugger;
        console.log(props.encounterId);
        initialization();

    }, []);

    const initialization = () => {

        loadData();
         
    }
    const loadData = () => {
        PostDataAPI("patient/imunization/getPatientImunizations", patientId).then((result) => {

            if (result.success && result.data != null) {
                
               console.log(`result.data ${result.data}`);
                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                            imunizationId: item.imunizationId,
                            isEncounterSpecific:  item.encounterId == encounterId ? ' ✔️ ' : '',
                            immStatusCode: item.immStatusCode,
                            vaccine: item.vaccine 
                        };
                    }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const handleCloseImmunizationForm = () => {
        loadData();
        setDialogOpenClose(false);
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        loadData();
        setDialogOpenClose(false);
    }

    const newImmunization = () => {
        setImunizationId(0);
        setDialogOpenClose(true);
    }
    const editImmunization = (id) => {
        setImunizationId(id);
        setDialogOpenClose(true);
    }
    const collapseAdministratedList=(collapsestate)=>{
        setCollapse({Administrated:!collapsestate,Historical:collapse.Historical,Refused:collapse.Refused});
    }
    const collapseInHistoricalList=(collapsestate)=>{
        setCollapse({Administrated:collapse.Administrated,Historical:!collapsestate,Refused:collapse.Refused});
    }
    const collapseInRefusedList=(collapsestate)=>{
        setCollapse({Administrated:collapse.Administrated,Historical:collapse.Historical,Refused:!collapsestate});
    }
    return (
        <>
            <div className={classes.listTitle} >
                <span>Immunization</span>

                {!props.disabled ?
                    <span className={classes.addNew} title="Add New Immunization" onClick={() => newImmunization()}>{props.isEditable ? <img src={AddIcon} alt="Add New" />:''}</span>
                    : ""} 

            </div>
            <div className={classes.listSubChild}>
                <>
                    <div className={classes.administratedTitleArea}>                    
                        <span title="Expand" className={classes.collapseIconSpan} onClick={()=>collapseAdministratedList(collapse.Administrated)}>
                            { collapse.Administrated ? <ArrowDownIcon /> :<ArrowRightIcon /> }
                        </span>
                        <span>Administrated</span>
                    </div>
                        {listRowsData.length > 0 && collapse.Administrated && listRowsData.some((obj) => obj.immStatusCode == "Administrated") ? 
                            <ul className={classes.treeView}>
                                {listRowsData.map((item, i) => (
                                    item.immStatusCode==="Administrated" ?
                                    !props.disabled ?
                                    <li key={i} onClick={()=>editImmunization(item.imunizationId)}>
                                        <div className={classes.treeContent}>
                                            <>
                                                <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                        <div className={classes.treeLabel}> {item.vaccine} {item.isEncounterSpecific}</div>
                                            </>                         
                                        </div>
                                    </li>:
                                    <li key={i}>
                                        <div className={classes.treeContent}> 
                                            <>
                                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                        <div className={classes.DistreeLabel}>{item.vaccine} {item.isEncounterSpecific}</div>
                                            </>                    
                                        </div>
                                    </li>
                                    :""
                                )
                                )}
                            </ul>:""                    
                        }
                        {!listRowsData.some((obj) => obj.immStatusCode == "Administrated") && collapse.Administrated ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No administered immunization recorded yet</div>                         
                        :
                            <div className={classes.noRecord}>No administered immunization recorded yet</div>
                        :""
                        }
                </>
                <>
                    <div className={classes.administratedTitleArea}>                    
                            <span title="Expand" className={classes.collapseIconSpan} onClick={()=>collapseInHistoricalList(collapse.Historical)}>
                                { collapse.Historical ? <ArrowDownIcon /> :<ArrowRightIcon /> }
                            </span>
                        <span className={classes.listSubTitle}>Historical</span>
                    </div>    
                        {listRowsData.length > 0 && collapse.Historical && listRowsData.some((obj) => obj.immStatusCode == "Historical") ?
                            <ul className={classes.treeView}>
                                {listRowsData.map((item, i) => (
                                    item.immStatusCode==="Historical" ?
                                    !props.disabled ?
                                        <li key={i} onClick={()=>editImmunization(item.imunizationId)}>
                                            <div className={classes.treeContent}>
                                                <>
                                                    <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                        <div className={classes.treeLabel}> {item.vaccine} {item.isEncounterSpecific}</div>
                                                </>
                                                
                                            </div>
                                        </li>:
                                        <li key={i}>
                                            <div className={classes.treeContent}>
                                                <>
                                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                        <div className={classes.DistreeLabel}> {item.vaccine} {item.isEncounterSpecific}</div>
                                                </>
                                                
                                            </div>
                                    </li>
                                :""
                                )
                                )}
                            </ul>:""
                        }
                        {!listRowsData.some((obj) => obj.immStatusCode == "Historical") && collapse.Historical ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No historical immunization recorded yet</div>                         
                        :
                            (<div className={classes.noRecord}>No historical immunization recorded yet</div>) 
                        :""
                        }
                </>
                <>
                    <div className={classes.administratedTitleArea}>                    
                        <span title="Expand" className={classes.collapseIconSpan} onClick={()=>collapseInRefusedList(collapse.Refused)}>
                            { collapse.Refused ? <ArrowDownIcon /> :<ArrowRightIcon /> }
                        </span>
                        <span className={classes.listSubTitle}>Refused</span>
                    </div>
                        {listRowsData.length > 0 && collapse.Refused && listRowsData.some((obj) => obj.immStatusCode == "Refused") ?
                            <ul className={classes.treeView}>
                                    {listRowsData.map((item, i) => (
                                        item.immStatusCode==="Refused" ?
                                        !props.disabled ?
                                            <li key={i} onClick={()=>editImmunization(item.imunizationId)}>
                                                <div className={classes.treeContent}>
                                                    <>
                                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                            <div className={classes.treeLabel}> {item.vaccine} {item.isEncounterSpecific}</div>
                                                    </> 
                                                </div>
                                            </li>:
                                            <li key={i}>
                                                <div className={classes.treeContent}>
                                                    <>
                                                        <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                            <div className={classes.DistreeLabel}> {item.vaccine} {item.isEncounterSpecific}</div>
                                                    </> 
                                                </div>
                                            </li>
                                        :""
                                    )
                                    )}
                                </ul>:""
                        }
                        {!listRowsData.some((obj) => obj.immStatusCode == "Refused") && collapse.Refused ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No refused immunization recorded yet</div>                         
                        :
                            (<div className={classes.noRecord}>No refused immunization recorded yet</div>) 
                        :""
                        }
                </>
            </div>
            {
                dialogOpenClose ? (
                    <ImmunizationForm patientId={patientId}
                        encounterId={encounterId}
                        imunizationId={imunizationId}
                        dialogOpenClose={dialogOpenClose}
                        handleClose={handleCloseImmunizationForm}
                        handleSuccess={handleDialogSuccess}
                        isEditable={props.isEditable} />
                ) : ('')
            }
        </>

    );
}
export default withSnackbar(Immunizations)
