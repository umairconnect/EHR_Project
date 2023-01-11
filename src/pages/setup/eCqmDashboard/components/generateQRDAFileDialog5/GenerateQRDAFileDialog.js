import React, { useState } from "react";
//material ui
import { Button, Grid, Typography } from "@material-ui/core";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
//images
import CloseIcon from "../../../../../images/icons/math-plus.png"
//scrollbar
import { Scrollbars } from 'rc-scrollbars';
//custom components
import { withSnackbar } from '../../../../../components/Message/Alert';
import { LinkS, FormGroupTitle, FormBtn, DraggableComponent, Label, LinkItem } from "../../../../../components/UiElements/UiElements";
//styles
import useStyles from "./styles";
import { InputBaseField, RadioboxField } from "../../../../../components/InputField/InputField";
function GenerateQRDAFileDialog4({ handleBack, handleNext, handleClose, isLastStep, showMessage, ...props }) {
    // handle styles
    const classes = useStyles();
    const [state, setState] = useState({
        providerList: [
            { name: "Melvin B. Price" },
            { name: "Alex John" },
        ]
    });
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
        if (isLastStep) {
            handleNext();
            handleClose();
        }
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
                        style={{ paddingRight: "17px", textAlign: "center" }}
                    >
                        <Grid item lg={12} >
                            <Grid container alignItems="center" justifyContent="center" justify="center">
                                <CheckCircleOutlinedIcon color="#27AE60" htmlColor="#27AE60" width={50} height={50} />
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography className={classes.title}>QRDA file is generating in background</Typography>
                            <Typography className={classes.text}>Your file is being generated. Periodically check your<LinkS>documents</LinkS>for your QRDA file.</Typography>
                        </Grid>
                    </Grid>
                </Scrollbars>
            </div>
            <div className={classes.footer}>

                <div className={classes.footerRight}>
                    {/* <FormBtn id="reset" onClick={onBack}> Back </FormBtn> */}
                    <FormBtn id="save" btnType="none" onClick={onNext} >Done</FormBtn>
                </div>
            </div>
        </div>
    )
}

export default withSnackbar(GenerateQRDAFileDialog4);