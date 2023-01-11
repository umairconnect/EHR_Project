import React, { useState } from "react";
//material ui
import { Dialog, Grid, Typography } from "@material-ui/core";
//images
import CloseIcon from "../../../../../images/icons/math-plus.png"
//scrollbar
import { Scrollbars } from 'rc-scrollbars';
//custom components
import { withSnackbar } from '../../../../../components/Message/Alert';
import { LinkS, FormGroupTitle, FormBtn, DraggableComponent } from "../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { RadioboxField } from "../../../../../components/InputField/InputField";
function GenerateQRDAFileDialog2({ handleBack, handleNext, handleClose, showMessage, ...props }) {
    // handle styles
    const classes = useStyles();
    const [state, setState] = useState({});
    const onBack = (newState) => {
        handleBack();
    };
    const onNext = (newState) => {
        handleNext();
    }
    return (
        <div className={classes.box}>
            <div className={classes.header} id="draggable-dialog-title">
                <span className={classes.crossButton} onClick={handleClose}>
                    <img src={CloseIcon} />
                </span>
                <FormGroupTitle>Generate QRDA File</FormGroupTitle>
            </div>
            <div className={classes.content}>
                <Scrollbars style={{ minHeight: "270px" }}>
                    <Grid
                        container
                        direction="row"
                        style={{ paddingRight: "17px" }}
                    >
                        <Grid item lg={12}>
                            <Typography className={classes.title}>
                                Confirm that the measures you want to Include are listed below
                            </Typography>
                            <ul className={classes.measureList}>
                                <li>
                                    <div />
                                    <Typography>Preventive Care and Screening: Screening for Depression and Follow-Up Plan CMS2v10, NQF-0418e </Typography>
                                </li>
                                <li>
                                    <div />
                                    <Typography>Documentation of Current Medications in the Medical Record CMS68v10,
                                        NQF-0419e</Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Scrollbars>
            </div>
            <div className={classes.footer}>

                <div className={classes.footerRight}>
                    <FormBtn id="reset" onClick={onBack}> Back </FormBtn>
                    <FormBtn id="save" btnType="next" onClick={onNext} >Next</FormBtn>
                </div>
            </div>
        </div>
    )
}

export default withSnackbar(GenerateQRDAFileDialog2);