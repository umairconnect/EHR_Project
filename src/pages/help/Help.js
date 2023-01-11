import React, { useState } from "react";



// styles
import useStyles from "./styles";

// components


import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";



export default function Help(props) {
  var classes = useStyles();
  return (
    <>
      <PageTitle title="Help" />
      <Typography variant="h2" weight="medium" className={classes.pageTitleContent}>
         Development in progress...
      </Typography>
      
    </>
  );
}

