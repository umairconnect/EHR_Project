import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Alert, AlertTitle } from "@material-ui/lab";
// import "./alert.css";
// import ErrorAlertIcon from '../../images/icons/errorAlertIcon.png'
// import WarningAlertIcon from '../../images/icons/warningAlertIcon.png'
// import SuccessAlertIcon from '../../images/icons/successAlertIcon.png'

export const withSnackbar = WrappedComponent => {
  //  var classes = useStyles(); className={`${classes.root} ${statusClass}`}
  return props => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Alert Title");
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(3000);
    const [severity, setSeverity] = useState(
      "success"
    ); /** error | warning | info */

    const showMessage = (title, message, severity = "success", duration = 3000) => {
      setTitle(title);
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    // let className = severity;

    return (
      <>
        <WrappedComponent {...props} showMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          {/* icon={<img src={severity == 'error' ? ErrorAlertIcon : severity == 'success' ? SuccessAlertIcon : severity == 'warning' ? WarningAlertIcon : null}
            alt="icon" />} className={className} */}
          <Alert variant="filled" onClose={handleClose} severity={severity}>
            <AlertTitle>{title == "success" ? "Success" : title == "error" ? "Error" : title}</AlertTitle>
            {/* {message} */}
            {
              message ? (
                message.split('<br>').map((item, key) => {
                  return <span key={key}>{item}<br /></span>
                }))
                : ('')
            }
          </Alert>
        </Snackbar>
      </>
    );
  };
};
