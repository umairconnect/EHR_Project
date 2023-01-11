import React, { useState, useEffect } from "react";
//import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  InputBase,
  Grid,
  Typography
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { data as gridCnfg } from '../SearchGrid/Data/SetupData';
import { data as gridCnfg2 } from '../SearchGrid/component/setupData';
import { MDBDataTable } from 'mdbreact';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './style'
import { GetDataAPI } from '../../Services/APIService';
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import { DraggableComponent } from "../../components/UiElements";

import { SearchOutlined as SearchIcon } from '@material-ui/icons';


import { Table, Empty } from "antd";
import "../antd.css";
import "../SearchGrid/antStyle.css";


function LogDialog({ code, id, dialogOpenClose, onClose, ...props }) {
  var classes = useStyles();
  const theme = useTheme();

  const [rowsData, setRowsData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('');

  const handleClose = () => {
    setIsLoading(true);
    setRowsData([]);
    onClose(false);
  };
  useEffect(() => {
    if (dialogOpenClose) {
      GetDataAPI("log/getChangeLog", "code=" + code + "&id=" + id).then((result) => {

        if (result.success) {
          setIsLoading(false);
          setRowsData(result.data);
          setGridData(result.data);
        }
        else {
          console.log(result.message)
          setIsLoading(false);
        }
      })
    }
  }, [dialogOpenClose]);

  const handleSearch = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    if (currValue && currValue != undefined && currValue != null && currValue != "") {
      let filteredData = [...gridData];
      filteredData = filteredData.filter(entry => {
        var hasValue = false;
        for (var prop in entry) {
          if (Object.prototype.hasOwnProperty.call(entry, prop)) {
            hasValue = entry[prop]?.toString().toLowerCase().includes(currValue.toLowerCase());
            if (hasValue)
              break;
          }
        }
        return hasValue;
      }
      );
      setRowsData(filteredData);
    } else {
      const filteredData = [...gridData];
      setRowsData(filteredData);
    }
  }
  const tableData = {
    columns: gridCnfg['LogDetails'],
    rows: rowsData,

  };

  return (
    <>

      <Dialog
        PaperComponent={DraggableComponent}
        classes={{ paper: classes.dialogPaper }}
        disableBackdropClick
        disableEscapeKeyDown
        open={dialogOpenClose}
        {...props} >
        <DialogTitle className={classes.dialogtitle} id="draggable-dialog-title">Change Log</DialogTitle>
        <Divider />
        <DialogContent
          className={classes.dialogcontent}
        >
          <>
            <Grid container direction="row" justify="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9} />
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <InputBase
                      id="search"
                      name="search"
                      value={value}
                      placeholder="Search"
                      className="grid-search-input"
                      startAdornment={<SearchIcon />}
                      onChange={handleSearch}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={props.dp == 'true' ? 'dp-table' : ''}>
                  <div className="custom-grid">
                    <Table
                      // onRow={(record, rowIndex) => {
                      //     return {
                      //         onClick: (e) => handleRowClick(e, record.key),
                      //     };
                      // }}
                      locale={{
                        emptyText: (
                          <Empty
                            image={isLoading && LoadingIcon}
                            description={isLoading ? "Loading..." : "No Record Found"}
                            imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                          />
                        )
                      }}
                      checkStrictly={true}
                      rowClassName={(record, index) => "claimRow"}
                      scroll={true}
                      pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                      dataSource={rowsData}
                      columns={gridCnfg2['LogDetails']}
                    // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                    />
                  </div>
                </div>

              </Grid>
            </Grid>


            {/* {isLoading ?
              (
                <>
                  <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                  <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                    <div style={{ paddingTop: '27%' }} />
                  </Skeleton>
                </ >
              )
              :
              (
                <MDBDataTable
                  striped
                  small
                  btn
                  searching={props.searchShowHide}
                  data={tableData}
                />
              )
            } */}
          </>
        </DialogContent>
        <Divider />
        <DialogActions className={classes.dialogactions}>
          <Button onClick={handleClose} className={classes.okButton} >
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
// LogDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   dialogOpenClose: PropTypes.func.isRequired,
// };
export default LogDialog