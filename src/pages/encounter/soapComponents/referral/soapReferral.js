import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { PostDataAPI } from '../../../../Services/PostDataAPI';
import ReferralDialog from "./../../../patients/component/demographics/components/sendReferral/component/newReferral/NewReferralDialog";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { formatDate } from '../../../../components/Common/Extensions';
import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";



function SoapReferral({ isExpand, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isDataExist, setIsDataExist] = useState(false);
    const [referralRowsData, setReferralRowsData] = useState([]);
    const [referralDialogShowHide, setReferralDialogShowHide] = useState(false);

    const loadData = () => {
        PostDataAPI("patientrefferal/loadGrid", props.patientId).then((result) => {

            if (result.success && result.data) {
                setReferralRowsData(result.data.map((item, i) => {
                    return {
                        listTitle: item.refProviderName + " | " + formatDate(item.createDate),
                        refferalId: item.refferalId,
                        linkPath: item.linkPath,
                        link: item.link
                    };
                }));

            }
            else {
                setReferralRowsData([]);

            }
        })

    }

    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }

    }


    const handleClose = () => {
        loadData();
        setReferralDialogShowHide(false)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className={classes.soapBox}>
                <Accordion expanded={expendState}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <ListTitle title="Referrals" checkData={isDataExist} onClick={() => setReferralDialogShowHide(true)} disabled={props.disabled} />

                     
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid row>
                            {referralRowsData.length < 1 ?
                                (!props.disabled ?
                                    <div className={classes.noRecord}>No referral recorded yet</div>
                                    :
                                    <div className={classes.DisnoRecord}>No referral recorded yet</div>) :
                                <ul className={classes.treeView}>
                                    {referralRowsData.map((item, i) => (

                                        (<li key={i}>
                                            <div className={classes.treeContent}>
                                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                                <div className={classes.DistreeLabel}> {item.listTitle}
                                                    {/* {item.linkPath ?
                                                        <> | <a target={"_blank"} href={item.linkPath}> className={props.disabled ? classes.disLinkColor:classes.LinkColor} {item.link.length > 20 ? item.link.substring(0, 17) + '...' : item.link} </a>
                                                        </> : ''
                                                    } */}

                                                </div>

                                            </div>
                                        </li>)

                                    )
                                    )}
                                </ul>
                            }
                        </Grid>
                    </AccordionDetails>

                </Accordion>

            </div>

            <ReferralDialog dialogOpenClose={referralDialogShowHide}
                handleClose={handleClose}
                encounterId={props.encounterId}
                patientId={props.patientId}
                isEditable={props.isEditable} />
        </>
    )
}

export default SoapReferral;