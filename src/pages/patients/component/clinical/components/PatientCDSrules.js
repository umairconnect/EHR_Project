import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import {
    Grid,
    Button,
    Collapse,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList
} from "@material-ui/core";

import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import ViewCdsRule from './dialogs/CdsRuleView'

import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    ArrowDropDown as ArrowDropDownIcon
}
    from '@material-ui/icons';

function PatientCDSrules({ patientId, ...props }) {
    const classes = useStyles();
    const [addHConcern, setAddHConcern] = useState(false);
    const [cdsRules, setCdsRules] = useState([]);
    const [isCollapse, setIsCollapse] = useState(true);

    const [viewCdsRuleDialog, setViewCdsRuleDialog] = useState(false);

    const [ruleData, setRuleData] = useState([]);

    const [collapse, setCollapse] = useState({ active: true, inActive: true });
    const loadData = () => {
        PostDataAPI("patient/getPatientCDSRule", patientId).then((result) => {
            console.info(result.data)
            setCdsRules(result.data);
        });

    }
    useEffect(() => {
        loadData();
    }, []);
    const CollapseActiveList = (collapsestate) => {
        setCollapse({ active: !collapsestate, inActive: collapse.inActive })
    }
    const CollapseInActiveList = (collapsestate) => {
        setCollapse({ inActive: !collapsestate, active: collapse.active })
    }

    const openCdsRuleDialog = (description) => {
        setViewCdsRuleDialog(true)
        setRuleData([{description: description}])
    }
    const closeCdsRuleDialog = () => {
        setViewCdsRuleDialog(false)
    }
    return (
        <>
            <div className={classes.listTitle}>
                <span>CDS Rules</span>
            </div>
            <div className={classes.advContent}>

                <ul className={classes.ListStyle}>
                    {cdsRules.length > 0 ? cdsRules.map(item => (
                        <>

                            <ul className={classes.ListStyle}>
                                <li>
                                    <div className={classes.treeContentHover} onClick={()=> openCdsRuleDialog(item.description)}>
                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                        <div className={classes.treeLabel}>{item.description} </div>
                                    </div>


                                </li>

                            </ul>
                            {/* <ul className={classes.treeView}>
                                <li className={classes.treeViewLi}>
                                    <div className={classes.treeContent}>
                                        <div className={classes.treeLabel}>{item.description}</div>
                                    </div>
                                </li>
                            </ul> */}
                        </>

                    )) : <div className={classes.noRecord}>Patient has no CDS rule</div>}

                    {viewCdsRuleDialog ?
                        <ViewCdsRule closeMessageDialog={closeCdsRuleDialog} data={ruleData}></ViewCdsRule>
                        : ''
                    }

                </ul>

            </div>
        </>
    )
}

export default PatientCDSrules;