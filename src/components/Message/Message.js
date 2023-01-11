import React from "react";
import PropTypes from 'prop-types';
import {
  IconButton,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar

} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import classnames from "classnames";
import useStyles from "./styles";


function AlertMessage({children,backColor,alertOpenClose,clickClose,alertType,duration=3000, ...props}) {
  var classes = useStyles();
  const handleClose = () => {
    clickClose(false);
  };
  return (
    // <div className={classes.alertMessageBos}>
      <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}}  autoHideDuration={duration}  open={alertOpenClose} onClose={handleClose}>
        <Alert
        autoHideDuration={3000}
        severity={alertType}
        variant={backColor}
        {...props}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          >
          {children}
        </Alert>
      </Snackbar>
    // </div>
  );
}
AlertMessage.propTypes = {
  alertOpenClose: PropTypes.func.isRequired,
  clickClose: PropTypes.func.isRequired,
};
export const showAlert=({children,backColor,state,clickClose,type,duration=3000, ...props})=>{
  return (
    <AlertMessage children={children}  alertOpenClose={state} clickClose={ clickClose } backColor={backColor} alertType={type} duration={duration} />
  )
}
function SimpleDialog({children,dialogOpenClose,onClose,dialogSize,dialogTitle,cancelBtn,okBtn, ...props}){
  var classes = useStyles();
  const handleCancel = () => {
    onClose(false);
  };
  const handleOk = () => {
    onClose(true);
  };
  
  return (
    <>
     <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth={dialogSize}
      open={dialogOpenClose}
      {...props}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus  onClick={handleCancel} className={classes.cancelButton} >
          {cancelBtn}
        </Button>
        <Button onClick={handleOk} className={classes.okButton} >
        {okBtn}
        </Button>
      </DialogActions>

    </Dialog>
    </>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  dialogOpenClose: PropTypes.func.isRequired,
};


export { AlertMessage, SimpleDialog };

