import React from "react";

// styles
import useStyles from "./styles";

import {
  Menu as MenuIcon,
  ArrowBackIosOutlined as ArrowBackIcon,
} from "@material-ui/icons";
import {
  IconButton
} from "@material-ui/core";
import classNames from "classnames";

// components
import { Typography } from "../Wrappers";
// import {
//   useLayoutState,
//   useLayoutDispatch,
//   toggleSidebar,
// } from "../../context/LayoutContext";

export default function PageTitle(props) {
  var classes = useStyles();
  // var layoutState = useLayoutState();
  // var layoutDispatch = useLayoutDispatch();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" weight="bold">
        {/* <IconButton
            color="inherit"
            size="small"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>  */}
        {props.title}
          </Typography>
          {props.button && props.button}
    </div>
  );
}
