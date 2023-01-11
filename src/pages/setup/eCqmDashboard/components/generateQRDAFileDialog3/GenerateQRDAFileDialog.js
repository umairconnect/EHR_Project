import React, { useState } from "react";
//material ui
import { Dialog, Grid, Typography } from "@material-ui/core";
//images
import CloseIcon from "../../../../../images/icons/math-plus.png"
//scrollbar
import { Scrollbars } from 'rc-scrollbars';
//custom components
import { withSnackbar } from '../../../../../components/Message/Alert';
import { LinkS, FormGroupTitle, FormBtn, DraggableComponent, Label } from "../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { InputBaseField, RadioboxField } from "../../../../../components/InputField/InputField";
function GenerateQRDAFileDialog3({ handleBack, handleNext, handleClose, showMessage, ...props }) {
    // handle styles
    const classes = useStyles();
    const [state, setState] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
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
                                Confirm the details below QRDA III files that will be submitted to CMS for the purposes of MIPS
                                reporting should include the Tax ID Number that is used for billing Medicare Part B.
                            </Typography>
                            <Grid container >
                                <Grid item lg={12}>
                                    <Grid container >
                                        <Label size={4} title="Tax ID #" />
                                        <Grid item lg={8}>
                                            <InputBaseField
                                                id="taxId"
                                                name="taxId"
                                                value={state.taxId}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12}>
                                    <Grid container >
                                        <Label size={4} title="Virtual  Group Identifier" />
                                        <Grid item lg={8}>
                                            <InputBaseField
                                                id="virtualGroupIdentifier"
                                                name="virtualGroupIdentifier"
                                                value={state.virtualGroupIdentifier}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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

export default withSnackbar(GenerateQRDAFileDialog3);