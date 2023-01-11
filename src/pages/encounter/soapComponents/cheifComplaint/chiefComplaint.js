import React, { useState, useEffect } from "react";
import { TextareaField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import ChiefComplaintDialog from "./../../../encounter/components/chiefComplaint/ChiefComplaintDialog";
import useStyles from "./styles";
import { withSnackbar } from "../../../../components/Message/Alert";
import AddIcon from '../../../../images/icons/add-icon.png';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ListTitle, ListView } from "./../../../encounter/components/encounterDetail/components/subComponents/subComponents";

function ChiefComplaint({ isExpand, isUpdate, ...props}) {
    var classes = useStyles();
    const { showMessage } = props;
    const [chiefComplaintDialog, setChiefComplaintDialog] = useState({ showHide: false });
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [expendState, setExpendState] = useState(isExpand)

    const expendMore = () => {
        if (expendState === true) {
            setExpendState(false)
        } else {
            setExpendState(true)
        }
    }

    useEffect(() => {
        if (props.encounterId)
            initialization();
    }, [props.encounterId, chiefComplaintDialog, isUpdate]);

    const initialization = () => {
        loadData();
    }
    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        setChiefComplaintDialog({ showHide: false });
        props.updateChiefId(chiefComplaintDialog);
    }

    const [chiefComplaintRowsData, setChiefComplaintRowsData] = useState([]);
    const [isDataExist, setIsDataExist] = useState(false);

    const loadData = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.ccDetail) {
                    const strippedString = result.data.hpiDetail != null ? result.data.hpiDetail : "";
                    setChiefComplaintRowsData([{
                        listTitle: result.data.ccDetail, //result.data.chiefComplaintName,
                        hpiDetail: strippedString,
                    }]);
                    setIsDataExist(true);
                }
                else {
                    setChiefComplaintRowsData([]);
                    setIsDataExist(false);
                }


            }
            else if (!result.message && result.message != null) {

                showMessage("Error", result.message, "error", 3000);
            }
        })
    }



    const closeChiefComplaintDialog = () => {
        setChiefComplaintDialog({ showHide: false });
        props.updateChiefId(chiefComplaintDialog);
    }
    const addChiefComplient = () => {
        setChiefComplaintDialog({ showHide: true })
    }
    
    return (
        <>
            <div className={classes.soapBox}>
                    <div style={{ display: "block" }}>

                        <Accordion expanded={expendState}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon onClick={expendMore} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">

                                <ListTitle title="Chief Complaint" disabled={props.disabled}  checkData={isDataExist} onClick={() => setChiefComplaintDialog({ showHide: true })} />

                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid container direction="row" alignItems="center" >

                                    <ListView noRecordedtitle="No chief complaint recorded yet" disabled={props.disabled} listData={chiefComplaintRowsData} />
                                    
                                    <hr></hr>

                                    <div className={classes.myHPI}><ListTitle title="HPI" disabled={props.disabled} /></div>


                                    {chiefComplaintRowsData.length < 1 ? (
                                        !props.disabled ?
                                            <Grid container sm={12} lg={12} md={12} className={classes.mylist}> <div className={classes.noRecord}>No HPI recorded yet</div></Grid> : <Grid container sm={12} lg={12} md={12}> <div className={classes.DisnoRecord}>No HPI recorded yet</div></Grid>) : (
                                        <ul className={classes.treeView} >
                                            {chiefComplaintRowsData.map((item, i) => (
                                                <li className={classes.treeViewLi} key={i}>
                                                    <div className={classes.treeContent}>
                                                        {!props.disabled ? <>
                                                            <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.hpiDetail }}></div>
                                                        </> : <>
                                                            <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.hpiDetail }}></div></>}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                    }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>





                    </div>

             

                    {/* <TextareaField
                        rowsMin={5}
                        placeholder="Add Problem here"
                        name="notes"
                        MaxLength="2000"
                        disabled={true}
                    /> */}

            </div>

            {chiefComplaintDialog.showHide && <ChiefComplaintDialog
                showHideDialog={chiefComplaintDialog.showHide}
                handleClose={closeChiefComplaintDialog}
                encounterId={props.encounterId}
                patientId={props.patientId}
                handleSuccess={handleDialogSuccess}
            />}
        </>
    )
}

export default withSnackbar(ChiefComplaint);