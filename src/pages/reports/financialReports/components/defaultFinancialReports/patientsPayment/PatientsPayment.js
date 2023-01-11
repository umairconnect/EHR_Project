import React, { useState, useEffect } from "react";
import { Typography, Divider, Dialog } from "@material-ui/core";

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

function PatientsPayment(props) {
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    let list = [{}]
    const [isLoading, setIsLoading] = useState(false);
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

    const loadPatientPaymentReportGrid = () => {
        if (props.isUpdate === true) {
            if (props.data) {
                setTabRowsData(props.data);
            }
            console.log(props.data);
        }
        //setIsLoading(true);
        //
        //if (props.isUpdate === true) {
        //    PostDataAPI("reports/loadReportGrid", props.searchParamValue).then((result) => {
        //        setIsLoading(false);
        //        if (result.success && result.data != null) {
        //            console.log(result.data);
        //            setTabRowsData(result);
        //        }
        //    });
        //} else {
        //    var params = {
        //        reportName: "Patient Payments",
        //        Date_From: props.searchCridetia.dateFrom == undefined ? "" : props.searchCridetia.dateFrom,
        //        Date_To: props.searchCridetia.dateTo == undefined ? "" : props.searchCridetia.dateTo,
        //        Patient: props.searchCridetia.patientId == undefined ? "" : props.searchCridetia.patientId,
        //        Location: props.searchCridetia.locationId == undefined ? "" : props.searchCridetia.locationId,
        //        Room: props.searchCridetia.roomID == undefined ? "" : props.searchCridetia.roomID,
        //        Reason: props.searchCridetia.reasonCode == undefined ? "" : props.searchCridetia.reasonCode
        //    }
        //
        //    PostDataAPI("reports/loadReportGrid", params).then((result) => {
        //        setIsLoading(false);
        //        if (result.success && result.data != null) {
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
                item.column9 = formatCurrency(item.column9)
                item.children.map((child, c) => {
                    child.column1 = <LinkS onClick={() => handleOpenDemographics(child.column11)} style={{ textDecoration: "underline" }}>{child.column1}</LinkS>
                    child.column2 = child.column2;
                    child.column9 = formatCurrency(child.column9);
                    return { ...item }
                })
                return { ...item }
            }));
    }

    useEffect(() => {
        loadPatientPaymentReportGrid();
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
                    columns={gridCnfg["PatientsPaymentFinancialReports"]}
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

export default PatientsPayment