import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,

} from "@material-ui/core";


import CloseIcon from "../../../../images/icons/math-plus.png"
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { withSnackbar } from "../../../../components/Message/Alert";
import AddNewTemplate from './../../../setup/chartNotesTemplates/components/addNewTemplate/AddNewTemplate';




import useStyles from "./style";

function AddNewChartNotes({ dataTargetId, sectionCode, templateText, ...props }) {


    const { showMessage } = props;
    // handle styles
    const classes = useStyles();


    const handleClose = () => {
        props.hideAddTempDialog()
    }




    return (
        <>

            <Dialog open={props.addTempDialog} classes={{
                paper: classes.dialog
            }}
                {...props}
                draggable
                maxWidth="md"
            >
                <>
                    <DialogTitle>
                        <span className={classes.popupCrossButton} onClick={props.hideAddTempDialog}><img src={CloseIcon} /></span>
                        {/* <div className={classes.addRosTitle}>
                            Add New Chartnotes</div> */}

                    </DialogTitle>

                    <DialogContent>
                        <AddNewTemplate sectionCode={sectionCode} tabSelected={1} handleClose={handleClose} dataId={dataTargetId} />
                    </DialogContent>

                </>
            </Dialog>


        </>
    )
}
export default withSnackbar(AddNewChartNotes)