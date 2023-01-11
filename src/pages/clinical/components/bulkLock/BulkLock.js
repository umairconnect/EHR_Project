import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
//material ui
import { Grid, Dialog, DialogTitle, DialogContent, Typography, FormLabel, Switch } from "@material-ui/core";
import { DragHandle } from "@material-ui/icons"
import CloseIcon from "../../../../images/icons/math-plus.png"
//components
import TaskGrid from "../../../../components/TaskGrid/TaskGrid";
import { FormGroupTitle, Label, FormBtn, FooterBtn, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { CheckboxField, SelectField } from '../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { Scrollbars } from "rc-scrollbars";
function BulLockDialog({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();
    const [dragId, setDragId] = useState();
    const [boxes, setBoxes] = useState([
        {
            patientName: "Alfreds Futterkiste",
            dos: "Maria Anders",
            locked: "No",
        },
        {
            patientName: "Centro comercial Moctezuma",
            dos: "Francisco Chang",
            locked: "No",
        },
        {
            patientName: "Ernst Handel",
            dos: "Roland Mendel",
            locked: "No",
        },
        {
            patientName: "Island Trading",
            dos: "Helen Bennett",
            locked: "No",
        },
        {
            patientName: "Laughing Bacchus Winecellars",
            dos: "Yoshi Tannamuri",
            locked: "No",
        },
        {
            patientName: "Magazzini Alimentari Riuniti",
            dos: "Giovanni Rovelli",
            locked: "No",
        },
        {
            patientName: "Alfreds Futterkiste",
            dos: "Maria Anders",
            locked: "No",
        },
        {
            patientName: "Centro comercial Moctezuma",
            dos: "Francisco Chang",
            locked: "No",
        },
        {
            patientName: "Ernst Handel",
            dos: "Roland Mendel",
            locked: "No",
        },
        {
            patientName: "Island Trading",
            dos: "Helen Bennett",
            locked: "No",
        },
        {
            patientName: "Laughing Bacchus Winecellars",
            dos: "Yoshi Tannamuri",
            locked: "No",
        },
        {
            patientName: "Magazzini Alimentari Riuniti",
            dos: "Giovanni Rovelli",
            locked: "No",
        }
    ]);

    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        // var data = {}
        // PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
        //     if (result) {
        //         setBoxes(result.data);
        //     }
        // })
    }

    const handleChange = (e) => {

        const { name, checked } = e.target;
    }

    return (
        <Dialog
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            disableEnforceFocus
            maxWidth={'lg'}
        >
            <div className={classes.DialogContent}>
                <div className={classes.DialogContentRightSide}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle className={classes.lableTitleInput}>Bulk Lock Clinical Notes</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ height: "550px" }} >
                                <table className={classes.bulkNotesTable}>
                                    <tr>
                                        <th colSpan={1}>Lock?</th>
                                        <th colSpan={2}>Patient</th>
                                        <th colSpan={3}>Date of Service</th>
                                        <th colSpan={2}>Provider</th>
                                        <th colSpan={2}>Locked (Rendering Signed )</th>
                                    </tr>
                                    {
                                        boxes.map((item, i) => {
                                            return <tr>
                                                <td colSpan={1}><CheckboxField color="primary" /></td>
                                                <td colSpan={2}>{item.patientName}</td>
                                                <td colSpan={3}>08/12/2021 04:00 PM</td>
                                                <td colSpan={2}>{item.dos}</td>
                                                <td colSpan={2}>{item.locked}</td>
                                            </tr>
                                        })
                                    }
                                </table>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {/* {isSaving ?
                                        <FormBtn id="loadingSave" > Save</FormBtn>
                                        : */}
                                <FormBtn id="save" onClick={handleClose} > Lock</FormBtn>
                                {/* } */}
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default BulLockDialog
