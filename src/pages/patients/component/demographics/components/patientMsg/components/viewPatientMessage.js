import React, { useState, useEffect} from "react";
import useStyles from "../styles";

import {
    Dialog,
    Grid, Typography
} from "@material-ui/core";

import CloseIcon from "../../../../../../../images/icons/math-plus.png"

import { FormGroupTitle, LinkS, FormBtn, DraggableComponent } from "../../../../../../../components/UiElements/UiElements";
import { formatDateTime } from '../../../../../../../components/Common/Extensions';

function ViewPatientMessage({ closeMessagedialog, data }, ...props) {


    var classes = useStyles();

    const [state, setState] = useState(data);


    const openDialog = () => {

    }

    const fileNameGet = (fileName) => {
        let getFileName = fileName.replace(/^.*[\\\/]/, '')
        return getFileName
    }

    return (
        <>
            <Dialog
                onClose={closeMessagedialog}
                open={openDialog}
                classes={{ paper: classes.dialogPaperMsg }}
                maxWidth="md"
                PaperComponent={DraggableComponent}

            >

                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton}><img onClick={closeMessagedialog} src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Message View</FormGroupTitle>
                        </div>

                        <div className={classes.msgcontent}>

                            {/* <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Label title="Date / Time" size={2} />
                                <Grid size={6}>{formatDateTime(state.createDate)}</Grid>

                            </Grid> */}

                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>


                                <Grid item lg={3} md={3}>
                                    <h4>From:</h4>
                                </Grid>


                                <Grid item lg={5} md={5} sm={5}>
                                    {state.from}
                                </Grid>

                                <Grid item lg={3} md={3} sm={3} style={{ textAlign: "right" }}>
                                    {formatDateTime(state.createDate)}
                                </Grid>

                            </Grid>

                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>

                            <Grid item lg={3} md={3}>
                                    <h4>Subject/Title:</h4>
                                </Grid>



                                <Grid item lg={9} md={9} sm={9}>
                                    <b>{state.messageSubject} </b>
                                </Grid>

                            </Grid>
                            <hr style={{ opacity: "0.3" }}></hr>
                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item lg={3} md={3}>
                                    <h4>Message: </h4>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} style={{ textAlign: "justify" }}>
                                    {state.messageBody}
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "10px" }}>

                                {state.attachmentsLink.length > 0 ?
                                    <>
                                        <Grid item lg={3} md={3}>
                                            <h4>Attachments: </h4>
                                        </Grid>
                                        <ul className={classes.attachmentFiles}>
                                            {
                                                state.attachmentsLink.map((file, index) => (
                                                    <li className={classes.attachmentFileItem} key={index}>
                                                        <LinkS onClick={file} download={file} href={"." + file}>{fileNameGet(file)}</LinkS>
                                                    </li>
                                                ))}
                                        </ul>
                                    </>
                                    : null}
                            </Grid>

                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "10px", justifyContent: "right" }}>

                                <FormBtn id="reset" size="default" onClick={closeMessagedialog} style={{ marginRight: 0 }}>Close</FormBtn>
                                <Grid item lg={1} md={1} sm={1} />

                            </Grid>
                        </div>


                    </div>
                </div>

            </Dialog>

        </>
    )
}

export default ViewPatientMessage;