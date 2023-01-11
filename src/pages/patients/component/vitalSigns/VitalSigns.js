import React, { useState, useEffect } from "react"
import { MDBDataTable } from 'mdbreact';
import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import {
    FormLabel,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
} from "@material-ui/core"

// import DiagnosisForm from './components/DiagnosisForm'
import CloseIcon from "../../../../images/icons/math-plus.png"
import { showAlert, withSnackbar } from '../../../../components/Message/Alert'
import Skeleton from '@material-ui/lab/Skeleton';
import "./style.css"
import { FormBtn, FormGroupTitle, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { Scrollbars } from "rc-scrollbars"

function VitalSigns({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();

    const [dataId] = useState(props.dataId);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [columns, setColumns] = useState([]);


    useEffect(() => {
        loadData();
    }, [])

    const tableData = {
        columns: columns,
        rows: rowsData,
    };
    const loadData = () => {
        setIsLoading(true);
        PostDataAPI("patient/vital/getPatientVitalsGrid", dataId).then((result) => {

            if (result.success) {
                setColumns(result.data.columns);
                setRowsData(result.data.items);
                //setRowsData(
                //    result.data.items.map((item, i) => {
                //        return { ...item }
                //    }));
            }
            setIsLoading(false);
        });
    }

    return (
        <>
            <div className={classes.positionRelative}>


                <Dialog
                    // classes={{ paper: classes.dialogPaper }}
                    PaperComponent={DraggableComponent}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={dialogOpenClose}
                    maxWidth={"lg"}
                    {...props} >
                    {/*<DialogTitle className={classes.dialogtitle}>Change Log</DialogTitle>*/}
                    <Divider />
                    <div className={classes.dialogcontent} >
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title" style={{ cursor: "move" }}>
                                <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                <FormGroupTitle className={classes.lableTitleInput}>Vital Sign(s)</FormGroupTitle>
                            </div>
                            <div className={classes.content}>
                                <Scrollbars autoHeight autoHeightMax={620}>
                                    {isLoading ?
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
                                            <>
                                                {/* <Grid item xs={11} sm={11} md={11} lg={11} container direction="row">
                                        <span className={classes.crossButton} onClick={handleClose} ><img src={CloseIcon} /></span>
                                        <FormGroupTitle id="draggable-dialog-title" style={{ cursor: "move" }}>Vital Sign(s)</FormGroupTitle>
                                    </Grid> */}

                                                {/*<div className={classes.titleArea}>*/}
                                                {/*rowsData.length > 0 ?*/}
                                                    {/*     <div className={classes.labelTitle}>*/}
                                                      {/*    <FormLabel disabled className={classes.labeladdfavorite}>*/}
                                                {/*         PDF - Full Vital History*/}
                                                {/*      </FormLabel>*/}
                                                {/*     <FormLabel disabled className={classes.labeladdfavorite}>*/}
                                                {/*          CSV - Full Vital History*/}
                                                    {/*      </FormLabel>*/}
                                                {/*    </div>*/}
                                                {/*    : ""}*/}
                                                
                                                {/*</div>*/}

                                                {rowsData.length > 0 ?
                                                    <div className="vitalsignsdt">
                                                        <MDBDataTable
                                                            striped
                                                            small
                                                            btn
                                                            searching={false}
                                                            paging={false}
                                                            data={tableData}
                                                        />
                                                    </div> :
                                                    <h1 className={classes.NoVitalMsg}>No vital sign recorded yet</h1>}
                                            </>
                                        )
                                    }
                                </Scrollbars>
                            </div>
                            <div className={classes.footer}>
                                <div className={classes.footerRight}>
                                    <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Divider />
                    <DialogActions className={classes.dialogactions}>
                        <FormBtn id="reset" onClick={handleClose} >Close</FormBtn>
                    </DialogActions> */}
                </Dialog>
            </div>


        </>
    )
}
export default withSnackbar(VitalSigns)