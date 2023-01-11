import React, { useState } from "react";
//material ui
import { Button, Grid, Typography } from "@material-ui/core";
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
function GenerateQRDAFileDialog4({ handleBack, handleNext, handleClose, showMessage, ...props }) {
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
                            <Typography className={classes.title}>Confirm providers in the group</Typography>
                            <Grid container >
                                <Grid item lg={12}>
                                    <Grid container >
                                        <Label size={3} title="Group Name" />
                                        <Grid item sm={6} md={6} lg={3} xl={3} display="flex" alignItems='center'>
                                            <Typography className={classes.text}>Facility Group </Typography>
                                        </Grid>
                                        <Grid item sm={3} md={3} lg={3} xl={3}>
                                            <Button className={classes.gridButton} >Edit</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12}>
                                    <table className={classes.tablelayout}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                state.providerList.map((item, index) => {
                                                    return <tr>
                                                        <td >{item.name}</td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
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

export default withSnackbar(GenerateQRDAFileDialog4);