import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { data as gridCnfg } from '../SearchGrid/Data/SetupData';
import { MDBDataTable } from 'mdbreact';
import useStyles from "./styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { GetDataAPI } from '../../Services/APIService';

function LogDialog({ code, id, dialogOpenClose, onClose, ...props }) {
  var classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    onClose(false);
  };
  useEffect(() => {
    if (true) {

      GetDataAPI("log/getChangeLog", "code=" + code + "&id=" + id).then((result) => {

        if (result.success) {
          setIsLoading(false);
          setRowsData(result.data);
        }
        else {
          console.log(result.message)
          setIsLoading(false);
        }
      })
    }
  }, []);
  const tableData = {
    columns: gridCnfg['LogDetails'],
    rows: rowsData,

  };

  return (
    <>
      {
        <Dialog
          // maxWidth='lg'
          fullScreen={fullScreen}
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="md"
          open={dialogOpenClose}
          {...props}>
          <DialogTitle>Log Details</DialogTitle>
          <DialogContent dividers>
            <MDBDataTable
              striped
              small
              btn
              searching={props.searchShowHide}
              data={tableData}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.okButton} >
              Close
            </Button>
          </DialogActions>
        </Dialog>

      }
    </>
  );
}
LogDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  dialogOpenClose: PropTypes.func.isRequired,
};
export default LogDialog