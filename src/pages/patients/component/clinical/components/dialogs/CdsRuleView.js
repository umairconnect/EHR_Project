import React, { useEffect, useState } from "react";
import useStyles from "../styles";

import {
    Dialog,
    Grid,
    Button,
} from "@material-ui/core";

import CloseIcon from "./../../../../../../images/icons/math-plus.png";

import { FormGroupTitle, Label, FormBtn, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import { formatDateTime, formatTime } from '../../../../../../components/Common/Extensions';


function CdsRuleView({ closeMessageDialog, data }, ...props) {


    var classes = useStyles();

    const [state, setState] = useState(data);

    useEffect(() => {
        debugger
        console.log(data)
    }, [])

    const openDialog = () => {

    }

    return (
        <>
            <Dialog
                onClose={closeMessageDialog}
                open={openDialog}
                classes={{ paper: classes.dialogPaperCds }}
                maxWidth="md"
                PaperComponent={DraggableComponent}

            >

                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton}><img onClick={closeMessageDialog} src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>CDS Rule View</FormGroupTitle>
                        </div>

                        <div className={classes.msgcontent}>



                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Grid item lg={3} md={3}>
                                    <h4>Description:</h4>
                                </Grid>


                                <Grid item lg={9} md={9} sm={9}>
                                    {state[0].description}
                                </Grid>

                            </Grid>






                            <Grid container direction="row" alignItems="baseline" xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "10px", justifyContent: "right" }}>

                                <FormBtn id="reset" size="default" onClick={closeMessageDialog} style={{ marginRight: 0 }}>Close</FormBtn>

                            </Grid>
                        </div>


                    </div>
                </div>

            </Dialog>

        </>
    )
}

export default CdsRuleView;