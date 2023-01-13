import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';

import { PostDataAPI } from '../../../../Services/PostDataAPI';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { formatDateTime, getFormatedDate } from './../../../../components/Common/Extensions';

import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";

import LabOrders from '../../../../pages/patients/component/labOrders/components/newLabOrder/NewLabOrderForm';

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

function LabImageOrder({ disabled, patientId, ...props }) {
    const classes = useStyles();
    const [addHConcern, setAddHConcern] = useState(false);
    const [labOrderAndResults, setLabOrderAndResults] = useState([]);
    const [showHideLabOrderDialog, setshowHideLabOrderDialog] = useState(false);
    const [isCollapse, setIsCollapse] = useState(true);
    const [collapse, setCollapse] = useState({ active: true, inActive: true });
    const loadData = () => {
        var data = {
            patientId: parseInt(patientId),
            isElab: true,
            patientEncounterId: props.encounterId ? parseInt(props.encounterId) : null
        }
        PostDataAPI("patient/labOrder/getPatientLabOrderGrid", data).then((result) => {
            if (result.success && result.data != null) {
                setLabOrderAndResults(result.data);
            }
        })

    }

    const handleCloseForm = () => {
        loadData();
        setshowHideLabOrderDialog(false);
    }

    useEffect(() => {
        loadData();
    }, [showHideLabOrderDialog]);
    const CollapseActiveList = (collapsestate) => {
        setCollapse({ active: !collapsestate, inActive: collapse.inActive })
    }
    const CollapseInActiveList = (collapsestate) => {
        setCollapse({ inActive: !collapsestate, active: collapse.active })
    }
    return (
        <>
            {/* <div className={classes.listTitle}>
                <span>Imaging Orders</span>
            </div> */}

            <ListTitle title="Imaging Orders" disabled={disabled} onClick={() => setshowHideLabOrderDialog(true)} />

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
                                <div className={disabled ? classes.DistreeLabel:classes.treeLabel}>{item.labTest} </div>
                            </div>

                        </ul>

                    </>
                )) : <div className={disabled ?classes.DisnoRecord : classes.noRecord}>Patient has no imaging order</div>}


            </div>

            <LabOrders showHideDialog={showHideLabOrderDialog} handleClose={() => handleCloseForm()}  encounterId={props.encounterId} dataId={patientId} imagingOrder={true} />

        </>
    )
}

export default LabImageOrder;