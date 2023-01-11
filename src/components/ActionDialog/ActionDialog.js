import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { FormBtn } from "../UiElements"
import useStyles from './style'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BlockIcon from '@material-ui/icons/Block';
export const ActionDialog = ({ title, message, type, actiondialogOpenClose, onClose, onSubmit, onCancel, ...props }) => {
  var classes = useStyles();
  const handleSubmit = () => {
    onSubmit();
    onCancel(false);
  };
  const handleClose = () => {
    onCancel(false);
  };

  return (
    <>
      <Dialog open={actiondialogOpenClose}
        // classes={{ paper: classes.dialogPaper }}
        // onClose={handleClose}
        // disableBackdropClick
        disableEscapeKeyDown  {...props}
        classes={{ paper: classes.paper }}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}>
        <DialogTitle className={classes.dialogTitle}>
          {type === "warning" ?
            <BlockIcon className={classes.WarningIcon} />
            : type === "success" ?
              <CheckCircleOutlineIcon className={classes.SuccessIcon} />
              : type === "update" ?
                <ErrorOutlineIcon className={classes.UpdateIcon} />
                : type === "confirm" ?
                  <HelpOutlineIcon className={classes.UpdateIcon} />
                  : ''
          }
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText className={classes.dialogMessage}>
            {
              message ? (
                message.split('<br>').map((item, key) => {
                  return <span key={key}>{item}<br /></span>
                })) : ""
            }
            {/* {message} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogactions}>
          {type === "update" || type === "confirm" ?
            <FormBtn id="save" btnType={"confirm"} onClick={handleSubmit}>
              OK
            </FormBtn> : ""}
          <FormBtn id="reset" onClick={handleClose}>
            Cancel
          </FormBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}
