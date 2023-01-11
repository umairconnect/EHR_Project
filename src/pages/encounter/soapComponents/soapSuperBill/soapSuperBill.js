import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";
import { Link } from "react-router-dom";

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function SoapSuperBill({ isExpand, ...props }) {
    var classes = useStyles();
    const [superBillRowsData, setSuperBillRowsData] = useState([]);
    const [superBillDialogShowHide, setSuperBillDialogShowHide] = useState(true);
    const [isDataId, setIsDataId] = useState(0);


    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }

    useEffect(() => {

        setIsDataId(0);
        if (props.encounterId || !superBillDialogShowHide)
            initialization();

    }, [props.encounterId, superBillDialogShowHide]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        var params = {
            code: "get_claim_super_bill_by_id",
            parameters: [props.encounterId ? props.encounterId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setSuperBillRowsData(
                    result.data.map((item, i) => {
                        if (item.id > 0 && isDataId == 0) { setIsDataId(item.id); }
                        return {
                            claimSuperbillId: item.id,
                            billingType: item.text1
                        };
                    }));
            }
        })
    }

    const setClaimId = (id) => {

        setIsDataId(id);
    }

    return (
        <>
            <div className={classes.soapBox}>

                <>
                    <Accordion expanded={expendState}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">

                            {
                                props.disabled == false || isDataId > 0 ?
                                    <Link to={{
                                        pathname: '/app/addclaim',
                                        search: '?id=' + props.encounterId + '/' + props.patientId + '/' + isDataId,
                                        state: JSON.stringify({
                                            encounterId: props.encounterId,
                                            patientId: props.patientId,
                                            claimId: isDataId
                                        })

                                    }}>

                                        {isDataId < 1 ?
                                            <ListTitle
                                                title="Super Bill"
                                                disabled={props.disabled}
                                                checkData={false}
                                            />
                                            :
                                            <ListTitle
                                                title="View Super Bill"
                                                disabled={props.disabled}
                                                checkData={true}
                                            />
                                        }
                                    </Link>
                                    : <>
                                        {isDataId < 1 ?
                                            <ListTitle
                                                title="Super Bill"
                                                disabled={props.disabled}
                                                checkData={false}
                                            />
                                            :
                                            <ListTitle
                                                title="View Super Bill"
                                                disabled={props.disabled}
                                                checkData={true}
                                            />
                                        }
                                    </>
                            }



                        </AccordionSummary>

                        <AccordionDetails>
                            {superBillRowsData.length < 1 ?
                                (!props.disabled ? <div className={classes.noRecord}>No super bill recorded yet</div> : <div className={classes.noRecord}>No super bill recorded yet</div>) :
                                <ul className={classes.treeView}>
                                    {superBillRowsData.map((item, i) => (
                                        !props.disabled ?
                                            (<li key={i}>
                                                <Link to={{
                                                    pathname: '/app/addclaim',
                                                    search: '?id=' + props.encounterId + '/' + props.patientId + '/' + item.claimSuperbillId,
                                                    state: JSON.stringify({
                                                        encounterId: props.encounterId,
                                                        patientId: props.patientId,
                                                        claimId: isDataId
                                                    })

                                                }}>
                                                    <div className={classes.treeContent}>
                                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                                        <div className={classes.treeLabel}>{item.claimSuperbillId} - {item.billingType}</div>
                                                    </div>
                                                </Link>
                                            </li>)
                                            :
                                            (<li key={i}>
                                                <div className={classes.treeContent}>
                                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                    <div className={classes.DistreeLabel}>{item.claimSuperbillId} - {item.billingType}</div>
                                                </div>
                                            </li>)

                                    )
                                    )}
                                </ul>
                            }
                        </AccordionDetails>

                    </Accordion>




                    {/* <SuperBillDialog showHideDialog={superBillDialogShowHide} handleClose={() => setSuperBillDialogShowHide(false)} encounterId={props.encounterId} patientId={props.patientId} claimId={isDataId} /> */}

                </>


            </div>
        </>
    )
}

export default SoapSuperBill;