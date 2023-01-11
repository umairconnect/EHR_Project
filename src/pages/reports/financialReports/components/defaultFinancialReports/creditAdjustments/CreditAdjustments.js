import React, { useState, useEffect } from "react";
import { Divider, Dialog } from "@material-ui/core";
// components
import { data as gridCnfg } from '../../../../../../components/SearchGrid/component/setupData';
// styles
import "../../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import '../../../../../../components/SearchGrid/style.css';
import '../../../../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import { LinkS, DraggableComponent, FormGroupTitle } from "../../../../../../components/UiElements/UiElements";
import { formatCurrency } from "../../../../../../components/Common/Extensions";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import Demographics from '../../../../../patients/component/demographics/Demographics';
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { IsEditable } from '../../../../../../Services/GetUserRolesRights';


function CreditAdjustments(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    let list = [{}]

    const [rowsData, setRowsData] = useState(list);

    const [patientId, setPatientId] = React.useState();
    const [demographicsDialogOpenClose, setDemographicsDialogOpenClose] = useState(false);
    const [insuranceTabId, setInsuranceTabId] = useState(0);

    const handleOpenDemographics = (id) => {
        setDemographicsDialogOpenClose(true);
        setPatientId(id)
        setInsuranceTabId(0)
    }

    const closeDemographics = () => {
        setDemographicsDialogOpenClose(false);
    }



    // const defualtLoadCreditAndAdjustmentReport = () => {
    //     setIsLoading(true);
    //     var params = {
    //         reportName: "Credit & Adjustments",
    //         Date_From: props.searchCridetia.dateFrom == undefined ? "" : props.searchCridetia.dateFrom,
    //         Date_To: props.searchCridetia.dateTo == undefined ? "" : props.searchCridetia.dateTo,
    //         Patient: props.searchCridetia.patientId == undefined ? "" : props.searchCridetia.patientId,
    //         Location: props.searchCridetia.locationId == undefined ? "" : props.searchCridetia.locationId,
    //         Room: props.searchCridetia.roomID == undefined ? "" : props.searchCridetia.roomID,
    //         Reason: props.searchCridetia.reasonCode == undefined ? "" : props.searchCridetia.reasonCode,
    //         Credits_By: props.searchCridetia.credits == undefined ? "" : props.searchCridetia.credits
    //     }
    //     PostDataAPI("reports/loadReportGrid", params).then((result) => {
    //         if (result.success && result.data != null) {
            
    //             setIsLoading(false);
    //             console.log(result.data);
    //             setRowsData(
    //                 result.data.map((item, i) => {
    //                     item.column2 = <span style={{ fontSize: "14px", fontWeight: 700, fontStyle: "normal" }}>{item.column2}</span>
    //                     item.column8 = <LinkS style={{ textDecoration: "underline", margin: "0px !important", align: "right !important" }}>{formatCurrency(item.column8)}</LinkS>
    //                     item.column9 = <LinkS style={{ textDecoration: "underline", margin: "0px !important", align: "right !important" }}>{formatCurrency(item.column9)}</LinkS>
    //                     item.children.map((child, c) => {
    //                         child.column1 = <LinkS onClick={() => openPatientDetails(child.column12)} style={{ textDecoration: "underline" }}>{child.column1}</LinkS>
    //                         child.column2 = <LinkS onClick={() => openAppoitmentDetails(child.column13)} style={{ textDecoration: "underline" }}>{child.column2}</LinkS>
    //                         child.column8 = <Typography className="grid-text">{formatCurrency(child.column8)}</Typography>;
    //                         child.column9 = <Typography className="grid-text">{formatCurrency(child.column9)}</Typography>;
    //                         return { ...child }
    //                     })
    //                     return { ...item }
    //                 }));
    //         }
    //     });
    // }
    const loadCreditAndAdjustmentReportGrid = () => {
        //setIsLoading(true);
        if (props.isUpdate === true) {
            if (props.data) {
                setTabRowsData(props.data);
            }
            console.log(props.data);
        }
        //if (props.isUpdate === true) {
        //
        //    PostDataAPI("reports/loadReportGrid", props.searchParamValue).then((result) => {
        //        if (result.success && result.data != null) {
        //        
        //            setIsLoading(false);
        //            console.log(result.data);
        //            setTabRowsData(result);
        //        }
        //    });
        //
        //} else {
        //    var params = {
        //        reportName: "Credit & Adjustments",
        //        Date_From: props.searchCridetia.dateFrom == undefined ? "" : props.searchCridetia.dateFrom,
        //        Date_To: props.searchCridetia.dateTo == undefined ? "" : props.searchCridetia.dateTo,
        //        Patient: props.searchCridetia.patientId == undefined ? "" : props.searchCridetia.patientId,
        //        Location: props.searchCridetia.locationId == undefined ? "" : props.searchCridetia.locationId,
        //        Room: props.searchCridetia.roomID == undefined ? "" : props.searchCridetia.roomID,
        //        Reason: props.searchCridetia.reasonCode == undefined ? "" : props.searchCridetia.reasonCode,
        //        Credits_By: props.searchCridetia.credits == undefined ? "" : props.searchCridetia.credits
        //    }
        //    PostDataAPI("reports/loadReportGrid", params).then((result) => {
        //        if (result.success && result.data != null) {
        //        
        //            setIsLoading(false);
        //            console.log(result.data);
        //            setTabRowsData(result);
        //        }
        //    });
        //}
 
    }

    const setTabRowsData = (result) => {
        
        setRowsData(
            result.data.map((item, i) => {
                item.column2 = <span style={{ fontSize: "12px", fontWeight: 700, fontStyle: "normal" }}>{item.column2}</span>
                item.column8 = formatCurrency(item.column8)
                item.column9 = formatCurrency(item.column9)
                item.children.map((child, c) => {
                    child.column1 = <LinkS onClick={() => handleOpenDemographics(child.column12)} style={{ textDecoration: "underline" }}>{child.column1}</LinkS>
                    child.column2 = child.column2
                    child.column8 = formatCurrency(child.column8);
                    child.column9 = formatCurrency(child.column9);
                    return { ...child }
                })
                return { ...item }
            }));
    }

    useEffect(() => {
        console.log(props);
        //dateFrom: "2022-08-04"
        //dateTo: "2022-08-22"
        //locationId: "10024"
        //locationName: "AMA Health"
        //patientId: "70031"
        //patientName: "Adam Willam"
        //room: "allRooms"
        loadCreditAndAdjustmentReportGrid();

    }, [props.isUpdate])
    return (
        <div className={classes.gridArea}>

            <div className="custom-grid">
                <Table
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: (e) => handleClick(e, record),
                    //     };
                    // }}
                    rowExpandable={true}
                    expandable={{
                        expandIcon: () => <></>,
                    }}
                    defaultExpandAllRows={true}
                    scroll={true}
                    // dataSource={list}
                    dataSource={rowsData}
                    checkStrictly={true}
                    // rowSelection={{
                    //     selectedRowKeys: selectedRows,
                    //     onChange: onSelectChange
                    // }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                    columns={gridCnfg["AdjustmentsFinancialReports"]}
                    // rowClassName={(record, index) => "claimRow"}
                    locale={{
                        emptyText: (
                            <Empty
                                image={isLoading && LoadingIcon}
                                description={isLoading ? "Loading..." : "No Record Found"}
                                imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                            />
                        )
                    }}

                />
            </div>

            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={demographicsDialogOpenClose}
                maxWidth="md"
            >
                <Divider />
                <div className={classes.dialogcontent} >
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={closeDemographics}><img src={CloseIcon} /></span>
                            <FormGroupTitle className={classes.lableTitleInput}>Demographics</FormGroupTitle>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={598} >
                            <div className={classes.content}>
                                <Demographics dataId={patientId} insuranceSelect={insuranceTabId} isEditable={isEditable} />
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <Divider />

                {/* </Scrollbars> */}
            </Dialog>

        </div>

        
    )
}

export default CreditAdjustments