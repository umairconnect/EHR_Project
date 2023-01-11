import React, { useState, useEffect } from "react"
import { Button, Dialog } from "@material-ui/core";
import CloseIcon from "../../../../images/icons/math-plus.png";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { FormBtn, FormGroupTitle, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { withSnackbar } from "../../../../components/Message/Alert";
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';

//styles
import useStyles from "./styles"
function PrintReportDialog({ showMessage, title, showHideDialog, handleClose, children, ...props }) {
    const classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    var viewerStyle = { 'height': '700px', 'width': '100%' };
    var reportPath = 'AreaCharts.rdlc';
    var reportData = [{
        value: [
            { SalesPersonID: 281, FullName: 'Ito', Title: 'Sales Representative', SalesTerritory: 'South West', Y2002: 0, Y2003: 28000, Y2004: 3018725 },
            { SalesPersonID: 282, FullName: 'Saraiva', Title: 'Sales Representative', SalesTerritory: 'Canada', Y2002: 25000, Y2003: 14000, Y2004: 3189356 },
            { SalesPersonID: 283, FullName: 'Cambell', Title: 'Sales Representative', SalesTerritory: 'North West', Y2002: 12000, Y2003: 13000, Y2004: 1930885 }
        ],
        name: 'AdventureWorksXMLDataSet'
    }];

    const loadReport = () => {
        //var jsonData = new Object();
        //jsonData["Id"] = "abc";
        //var jsonResult = JSON.stringify(jsonData);
        //let params = {
        //    "loggedinUserId": userInfo.userID + "",
        //    "date": ''
        //}
        //PostDataAPI("reports/openReportPrint", jsonResult).then((result) => {
        //    if (result.success) {
        //        var _filename = result.data;
        //        var ws = window.open("", '_blank', "width=800,height=600,location=no,menubar=no,status=no,titilebar=no,resizable=no")
        //        //Adding script and CSS files
        //        ws.document.write('<!DOCTYPE html><html><head><title>PdfViewer</title><link href = "https://cdn.syncfusion.com/16.3.0.29/js/web/flat-azure/ej.web.all.min.css" rel = "stylesheet"><script src="https://cdn.syncfusion.com/js/assets/external/jquery-3.1.1.min.js"><\/script><script src="https://cdn.syncfusion.com/16.3.0.29/js/web/ej.web.all.min.js"><\/script><\/head><body>');
        //        //Div to render PDF Viewer
        //        ws.document.write('<div style="width:100%;min-height:570px"><div id="container"><\/div><\/div>')
        //        //Initializes the PDF Viewer
        //        ws.document.write("<script>$(function(){ $('#container').ejPdfViewer({ serviceUrl: '../api/PdfViewer', documentPath: '" + _filename + "', })})<\/script>")
        //        ws.document.write('<\/body><\/html>');
        //        ws.document.close();
        //    }
        //})
    }

    useEffect(() => {
        loadReport();
    }, []);

    return (
        <Dialog
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            // TransitionComponent={Transition}
            open={showHideDialog}
            disableEnforceFocus
            classes={{ paper: classes.dialogPaper }}
            // maxWidth={'md'}
            {...props} >
            {/* <Scrollbars autoHeight autoHeightMax="100%" style={{ maxHeight: "calc(100% - 64px)", display: "flex" }}> */}
            <div className={classes.DialogContent}>
                {/* <div className={classes.DialogContentRightSide}> */}
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <FormGroupTitle className={classes.lableInput}>{`Print ${title}`}</FormGroupTitle>
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span>
                    </div>
                    <Scrollbars style={{ height: 600 }}>
                        <div className={classes.content}>
                            <div className={classes.gridButtonsArea}>
                                <Button className={classes.gridButton} >Print</Button>
                            </div>
                            <div className="custom-grid">
                                {children}
                            </div>

                        </div>
                    </Scrollbars>
                    {/* <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <FormBtn id="reset" onClick={handleClose}> Print </FormBtn>
                        </div>
                    </div> */}
                </div>
                {/* </div> */}
            </div>
            {/* </Scrollbars> */}
        </Dialog>
    )
}

export default withSnackbar(PrintReportDialog)
