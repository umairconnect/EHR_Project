import React, { useState, useEffect } from "react";
import {
    Slide,
    Dialog,
    FormHelperText,
    FormLabel,
    Popper,
    Grid,
    Tab,
    Tabs,
    Paper,
} from "@material-ui/core";
import useStyles from "./styles"
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { InputBaseField, TextareaField, SelectField, RadioboxField } from "../../../../../../components/InputField/InputField";
import { FormBtn, FormGroupTitle, Label } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from "../../../../../../Services/PostDataAPI"



function ObservationDetailsDialog({ showHideDialog, handleClose, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const [state, setState] = useState({});
    const [encounterId, setEncounterId] = useState(props.encounterId);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown>
            <Scrollbars autoHeight autoHeightMax={450} style={{ maxHeight: "calc(100% - 64px)", display: "flex", }}>
                <div className={classes.DialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header}>
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Vendor Note</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextareaField
                                        rowsMin={5}
                                        id="observationDetails"
                                        name="observationDetails"
                                        onChange={handleChange}
                                        value={state.observationDetails}
                                        placeholderTitle="Observation Details"
                                    />
                                </Grid>

                            </Grid>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {isSaving ?
                                    <FormBtn id="loadingSave" > Save</FormBtn>
                                    :
                                    <FormBtn id="save"  > Save</FormBtn>
                                }
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </Dialog >
    )

}
export default withSnackbar(ObservationDetailsDialog)
