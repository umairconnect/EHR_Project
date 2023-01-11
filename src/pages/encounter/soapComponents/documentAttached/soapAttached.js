import React, { useState, useEffect } from "react";
import { CheckboxField } from "./../../../../components/InputField/InputField";
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
import AddIcon from '../../../../images/icons/add-icon.png';
import PrintIconBlue from "../../../../images/icons/PrintIconBlue.png";

function SoapAttached() {
    var classes = useStyles();
    return (
        <>
            <div className={classes.soapBox}>
                <div className={classes.listTitle}>
                    <h3>Document Attached to this encounter</h3>
                    <span className={classes.addNew}><img src={AddIcon} alt="Add New" />Add Documents</span>
                </div>
                
                <Grid row>
                    <p>No documents attached</p>
                </Grid>

             
            </div>
        </>
    )
}

export default SoapAttached;