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


import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    ArrowDropDown as ArrowDropDownIcon
}
    from '@material-ui/icons';

function AppointmentList({ patientId, ...props }) {
    const classes = useStyles();
    const [addHConcern, setAddHConcern] = useState(false);
    const [pateintAppointments, setPateintAppointments] = useState([]);
    const [isCollapse, setIsCollapse] = useState(true);
    const [collapse, setCollapse] = useState({ active: true, inActive: true });
    const loadData = () => {
        var params = {
            code: "get_patient_appointment_details",
            parameters: [patientId.toString()]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setPateintAppointments(
                    result.data.map((item, i) => {
                        return { appointmentData: item.text1, reasonOfVisit: item.text2,providerName:item.text3,appointmentStatus:item.text4 };
                    })
                );
            }
        })

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
    return (
        <>
            <div className={classes.listTitle}>
                <span>Appointment</span>
            </div>
            <div className={classes.advContent}>

                <ul className={classes.ListStyle} >
                    {pateintAppointments.length > 0 ? pateintAppointments.map(item => (
                        <>

                            <ul className={classes.ListStyle}>
                                <li>
                                    <div className={classes.treeContent}>
                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                        <div className={classes.treeLabel}>{item.appointmentData} | {item.reasonOfVisit} </div>
                                    </div>  
                                </li>
                            </ul>

                            <div style={{ fontSize: "12px", paddingLeft: "24px" }}>
                                   <span>{item.providerName} </span><span>{item.appointmentStatus ? ' - ' : ''}{item.appointmentStatus }</span>
                            </div>

                        </>
                    )) : <div className={classes.noRecord}>Patient has no appointment</div>}
                </ul>

            </div>
        </>
    )
}

export default AppointmentList;