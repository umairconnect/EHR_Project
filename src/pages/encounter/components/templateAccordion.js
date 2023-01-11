import React, { useState, useEffect } from "react"
import {
    Grid,
    Tab,
    Tabs,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
import useStyles from "./style"

const classes = useStyles();

export default function templateAccordion(props) {


    const checkData = () => console.log(props.AccordionData)

    return (
        <Accordion>
            <AccordionSummary>
                {props.AccordionData.map((item, i) => (
                    <li>      <span >  {item.itemTitle} </span></li>
                ))}
            </AccordionSummary>


            <AccordionDetails>

                {checkData}

                {props.AccordionData.map((item, i) => (

                    <li>      <span >  {item.itemTitle} </span></li>
                ))}

            </AccordionDetails>

        </Accordion>
    )

}
