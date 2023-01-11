import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { formatDateTime, getFormatedDate } from '../../../../../components/Common/Extensions';

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

function LabImageOrder({ patientId, ...props }) {
    const classes = useStyles();
    const [addHConcern, setAddHConcern] = useState(false);
    const [labOrderAndResults, setLabOrderAndResults] = useState([]);
    const [isCollapse, setIsCollapse] = useState(true);
    const [collapse, setCollapse] = useState({ active: true, inActive: true });
    const loadData = () => {
        var data = {
            patientId: parseInt(patientId)
        }
        PostDataAPI("patient/labOrder/getPatientLabOrderAndResult", data).then((result) => {
            if (result.success && result.data != null) {
                setLabOrderAndResults(result.data);
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
                <span>Labs/Imaging Orders</span>
            </div>
            <div className={classes.advContent}>


                {labOrderAndResults.length > 0 ? labOrderAndResults.map(item => (
                    <>

                        <ul className={classes.ListStyle}>
                            <li>

                                <div className={classes.activeTitleArea} style={{ fontSize: "12px" }}>
                                    <span>{getFormatedDate(item.createDate, "MM/DD/YYYY")} </span> - <span>{item.orderStatus}</span>
                                </div>

                            </li>
                            <div>
                                <div className={classes.treeLabel}>{item.labTest} </div>
                            </div>

                        </ul>

                    </>
                )) : <div className={classes.noRecord}>Patient has no lab order</div>}


            </div>
        </>
    )
}

export default LabImageOrder;