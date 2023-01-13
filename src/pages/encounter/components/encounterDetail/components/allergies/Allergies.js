import React, { useState, useEffect } from "react";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AllergyForm from "../../../../../patients/component/allergies/component/AllergyForm";
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withSnackbar } from '../../../../../../components/Message/Alert'

import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import YesIcon from '../../../../../../images/icons/YesIcon.png';

// styles
import useStyles from "./styles";

function Medication(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [patientId] = useState(parseInt(props.patientId));
    const [isEditable] = useState(props.isEditable);
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    const [listRowsData, setListRowsData] = useState([]);
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [allergyId, setAllergyId] = useState(0);
    const [disabled, setDisabled] = useState(props.disabled);
    const [collapse, setCollapse] = useState({ active: true, inActive: true });

    useEffect(() => {
        initialization();
        console.log(props.encounterId);
        console.log("status" + listRowsData.includes({ status: "Active" }))
    }, []);
    const initialization = () => {

        loadData();

    }
    const handleCloseForm = () => {
        loadData();
        setDialogOpenClose(false);
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        loadData();
        setDialogOpenClose(false);
    }

    
    const newAllergy = () => {
        setAllergyId(0);
        setDialogOpenClose(true);
    }
    const editAllergy = (id) => {
        setAllergyId(id);
        setDialogOpenClose(true);
    }

    const loadData = () => {
        var params = {
            code: "patient_allergies",
            parameters: [patientId.toString()]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                            listTitle: item.text1,
                            listSeverity: item.text2 ? ": " + item.text2:'' + item.id1 == encounterId ? ' ✔️ ' : '' ,
                            itemId: item.id,
                            status: item.text3 == "True" ? "Active" : "In-active"
                        };
                    }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const CollapseActiveList = (collapsestate) => {
        setCollapse({ active: !collapsestate, inActive: collapse.inActive })
    }
    const CollapseInActiveList = (collapsestate) => {
        setCollapse({ inActive: !collapsestate, active: collapse.active })
    }
    return (
        <>
            <div className={classes.listTitle}>
                <span>Allergies</span>
                {!props.disabled ?
                    <span className={classes.addNew} title="Add New Allergies" onClick={() => newAllergy()}> {isEditable?<img src={AddIcon} alt="Add New" />:'' }</span>
                    : ""}
            </div>
            <div className={collapse.inActive ? classes.listSubChild : classes.listSubChildOpen}>
                <>
                    <div className={classes.activeTitleArea}>
                        <span title="Expand" className={classes.collapseIconSpan} onClick={() => CollapseActiveList(collapse.active)}>
                            {collapse.active ? <ArrowDownIcon /> : <ArrowRightIcon />}
                        </span>
                        <span>Active</span>
                    </div>
                    {/* <div className={classes.listSubTitle}>Active</div> */}
                    {
                        listRowsData.length > 0 && collapse.active && listRowsData.some((obj) => obj.status == "Active") ?
                            // (!props.disabled ? <div className={classes.noRecord}>No Allergies Recorded yet</div>:<div className={classes.DisnoRecord}>No Allergies Recorded yet</div>) :

                            <ul className={classes.treeView}>
                                {listRowsData.map((item, i) => (
                                    item.status === "Active" ?
                                        !props.disabled ?
                                            (<li key={i} onClick={() => editAllergy(item.itemId)}>
                                                <div className={classes.treeContent}>
                                                    <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                    <div className={classes.treeLabel}> {item.listTitle}
                                                        {(() => {
                                                            switch (item.listSeverity) {
                                                                case 'Mild':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Mild to Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate to severe':
                                                                    return (
                                                                        <span style={{ color: "#f45a1f" }}>  {`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Severe':
                                                                    return (
                                                                        <span style={{ color: "#e74347" }}>  {`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Fatal':
                                                                    return (
                                                                        <span style={{ color: "#dd3232" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                default:
                                                                    return (
                                                                        item.listSeverity != null ?
                                                                            `${item.listSeverity}` : ""
                                                                    );

                                                            }
                                                        })()}
                                                        {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#00B4E5"}}>{item.status}</span> */}
                                                    </div>
                                                </div>
                                            </li>)
                                            :
                                            (<li key={i} style={{ cursor: "default" }}>
                                                <div className={classes.treeContent}>
                                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                    <div className={classes.DistreeLabel}> {item.listTitle}
                                                        {(() => {
                                                            switch (item.listSeverity) {
                                                                case 'Mild':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Mild to Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate to severe':
                                                                    return (
                                                                        <span style={{ color: "#f45a1f" }}>{`: ${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Severe':
                                                                    return (
                                                                        <span style={{ color: "#e74347" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Fatal':
                                                                    return (
                                                                        <span style={{ color: "#dd3232" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                default:
                                                                    return (
                                                                        item.listSeverity != null ?
                                                                            `${item.listSeverity}` : ""
                                                                    );

                                                            }
                                                        })()}
                                                        {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#52575C"}}>{item.status}</span> */}
                                                    </div>
                                                </div>
                                            </li>)

                                        : ""
                                ),
                                )}
                            </ul>
                            : ""
                    }
                    {!listRowsData.some((obj) => obj.status == "Active") && collapse.active ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No active allergy recorded yet</div>
                            :
                            <div className={classes.noRecord}>No active allergy recorded yet</div>
                        : ""
                    }
                </>

                {/* /////////////// */}

                <>
                    {/* <div className={classes.listSubTitle}>In Active</div> */}
                    <div className={classes.inActiveTitleArea}>
                        <span title="Expand" className={classes.collapseIconSpan} onClick={() => CollapseInActiveList(collapse.inActive)}>
                            {/* <img src={collapse.active ? ArrowDownIcon : ArrowUpIcon } alt="Add New" /> */}
                            {collapse.inActive ? <ArrowDownIcon /> : <ArrowRightIcon />}
                        </span>
                        <span>In Active</span>
                    </div>
                    {
                        listRowsData.length > 0 && collapse.inActive && listRowsData.some((obj) => obj.status == "In-active") ?
                            // (!props.disabled ? <div className={classes.noRecord}>No Allergies Recorded yet</div>:<div className={classes.DisnoRecord}>No Allergies Recorded yet</div>) :

                            <ul className={classes.treeView}>
                                {listRowsData.map((item, i) => (
                                    item.status === "In-active" ?
                                        !props.disabled ?
                                            (<li key={i} onClick={() => editAllergy(item.itemId)}>
                                                <div className={classes.treeContent}>
                                                    <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                    <div className={classes.treeLabel}> {item.listTitle}
                                                        {(() => {
                                                            switch (item.listSeverity) {
                                                                case 'Mild':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Mild to Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate to severe':
                                                                    return (
                                                                        <span style={{ color: "#f45a1f" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Severe':
                                                                    return (
                                                                        <span style={{ color: "#e74347" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Fatal':
                                                                    return (
                                                                        <span style={{ color: "#dd3232" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                default:
                                                                    return (
                                                                        item.listSeverity != null ?
                                                                            `${item.listSeverity}` : ""
                                                                    );

                                                            }
                                                        })()}
                                                        {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#00B4E5"}}>{item.status}</span> */}
                                                    </div>
                                                </div>
                                            </li>)
                                            :
                                            (<li key={i} style={{ cursor: "default" }}>
                                                <div className={classes.treeContent}>
                                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                    <div className={classes.DistreeLabel}> {item.listTitle} :
                                                        {(() => {
                                                            switch (item.listSeverity) {
                                                                case 'Mild':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Mild to Moderate':
                                                                    return (
                                                                        <span style={{ color: "#F2994A" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Moderate to severe':
                                                                    return (
                                                                        <span style={{ color: "#f45a1f" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Severe':
                                                                    return (
                                                                        <span style={{ color: "#e74347" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                case 'Fatal':
                                                                    return (
                                                                        <span style={{ color: "#dd3232" }}>{`${item.listSeverity}`}</span>
                                                                    );
                                                                default:
                                                                    return (
                                                                        item.listSeverity != null ?
                                                                            `${item.listSeverity}` : ""
                                                                    );

                                                            }
                                                        })()}
                                                        {/* &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<span style={{color:"#52575C"}}>{item.status}</span> */}
                                                    </div>
                                                </div>
                                            </li>)

                                        : ""
                                ),
                                )}
                            </ul>
                            : ""
                    }
                    {!listRowsData.some((obj) => obj.status == "In-active") && collapse.inActive ?
                        props.disabled ?
                            <div className={classes.DisnoRecord}>No inactive allergy recorded yet</div>
                            :
                            <div className={classes.noRecord}>No inactive allergy recorded yet</div>
                        : ""
                    }
                </>
            </div>
            {
                dialogOpenClose ?
                    (<AllergyForm
                        patientId={patientId}
                        allergyId={allergyId}
                        encounterId={encounterId}
                        dialogOpenClose={dialogOpenClose}
                        handleClose={() => handleCloseForm()}
                        handleSuccess={handleDialogSuccess}
                        isEditable={isEditable}/>)
                    : ('')
            }
        </>

    );
}
export default withSnackbar(Medication)

