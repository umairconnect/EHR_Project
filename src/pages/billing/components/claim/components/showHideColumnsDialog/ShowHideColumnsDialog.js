import React, { useState, useEffect } from "react"
import useStyles from './styles'
import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    Typography,
} from "@material-ui/core"
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { FormGroupTitle, DraggableComponent, FormBtn } from "../../../../../../components/UiElements/UiElements";
import { CheckboxField } from "../../../../../../components/InputField/InputField";

import { Scrollbars } from "rc-scrollbars";

function ShowHideColumnsDialog({ showHideDialog, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;




    useEffect(() => {


    }, [showHideDialog]);


    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={showHideDialog}
                maxWidth={false}
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Selecting Columns</FormGroupTitle>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </div>
                        <div className={classes.content}>
                            <Scrollbars style={{ minHeight: 400 }}>
                                <Grid container direction="row" lg={12}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div className={classes.contentBoxArea}>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Patient Name"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Visit Date"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Location"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Provider"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Claim #"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Billed"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Allowed"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Adjustment"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Ins 1 Paid"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Ins 2 Paid"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Pt Paid"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Ins Bal"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Ins 1"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                            <div className={classes.pCheckBox}>
                                                <CheckboxField
                                                    color="primary"
                                                    label={"Ins 1 Status"}
                                                    value={""}
                                                    id={""}
                                                    name={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <FormBtn id="save" >Save</FormBtn>
                                <FormBtn id="reset" onClick={handleClose}>Cancel</FormBtn>
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog>

        </>
    )

}
export default withSnackbar(ShowHideColumnsDialog)