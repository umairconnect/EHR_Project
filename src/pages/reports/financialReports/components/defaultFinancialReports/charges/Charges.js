import React, { useState, useEffect } from "react";
import { Typography, Divider, Dialog } from "@material-ui/core";
// components
import { data as gridCnfg } from '../../../../../../components/SearchGrid/component/setupData';
import { formatCurrency } from '../../../../../../components/Common/Extensions';
// styles
import "../../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import '../../../../../../components/SearchGrid/style.css';
import '../../../../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import { LinkS, DraggableComponent, FormGroupTitle } from "../../../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';

import Demographics from '../../../../../patients/component/demographics/Demographics';
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import { Scrollbars } from "rc-scrollbars";
import { IsEditable } from '../../../../../../Services/GetUserRolesRights';

function Charges(props) {
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    const [isLoading, setIsLoading] = useState(false);
    let list = [{}]
    const [rowsData, setRowsData] = useState(list);
    const openPatientDetails = (id) => {

    }

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
    const loadFinanceChargesReportGrid = () => {
        if (props.isUpdate === true) {
            if (props.data) {
                setTabRowsData(props.data);
            }
            console.log(props.data);
        }
        //setIsLoading(true);
        //
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
        //        reportName: "Financial Charges",
        //        Date_From: props.searchCridetia.dateFrom == undefined ? "" : props.searchCridetia.dateFrom,
        //        Date_To: props.searchCridetia.dateTo == undefined ? "" : props.searchCridetia.dateTo,
        //        Patient: props.searchCridetia.patientId == undefined ? "" : props.searchCridetia.patientId,
        //        Location: props.searchCridetia.locationId == undefined ? "" : props.searchCridetia.locationId,
        //        Room: props.searchCridetia.roomID == undefined ? "" : props.searchCridetia.roomID,
        //        Reason: props.searchCridetia.reasonCode == undefined ? "" : props.searchCridetia.reasonCode,
        //        Charges_By: props.searchCridetia.chargesBy == undefined ? "" : props.searchCridetia.chargesBy,
        //    }
        //    PostDataAPI("reports/loadReportGrid", params).then((result) => {
        //        if (result.success && result.data != null) {
        //            setIsLoading(false);
        //            console.log(result.data);
        //            setTabRowsData(result);
        //            
        //        }
        //    });
        //}

    }
    const setTabRowsData = (result) => {
        setRowsData(
            result.data.map((item, i) => {
                item.column1 = <span style={{ fontSize: "12px", fontWeight: 700, fontStyle: "normal" }}>{`Posted Date: ${item.column1}`}</span>
                item.column5 = formatCurrency(item.column5)
                item.column6 = formatCurrency(item.column6)
                item.column7 = formatCurrency(item.column7)
                item.column8 = formatCurrency(item.column8)
                item.children.map((child, c) => {
                    child.column2 = <LinkS onClick={() => handleOpenDemographics(child.column10)} style={{ textDecoration: "underline" }}>{child.column2}</LinkS>
                    child.column3 = child.column3
                    child.column5 = formatCurrency(child.column5);
                    child.column6 = formatCurrency(child.column6);
                    child.column7 = formatCurrency(child.column7);
                    child.column8 = formatCurrency(child.column8);
                    return { ...child }
                })
                return { ...item }
            }));
    }

    useEffect(() => {
        loadFinanceChargesReportGrid();
    }, [props.isUpdate])
    return (
        <div className={classes.gridArea}>

            <div className="custom-grid">
                <Table
                    rowExpandable={true}
                    expandable={{
                        expandIcon: () => <></>,
                    }}
                    defaultExpandAllRows={true}
                    scroll={true}
                    dataSource={rowsData}
                    checkStrictly={true}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                    columns={gridCnfg["ChargesFinancialReports"]}
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

export default Charges