import React, { useState, useEffect } from 'react';
import { Grid, FormLabel, Button, } from "@material-ui/core";
import { CheckboxField } from "../../../../components/InputField";
import { FormGroupTitle, FormBtn } from "../../../../components/UiElements";
import makeStyles from "./styles";
import { MDBInput, MDBDataTable } from 'mdbreact';
import { CheckCircle as CheckIcon } from '@material-ui/icons';
import { data as gridCnfg } from '../../../../components/SearchGrid/Data/SetupData';
import { data as gridCnfg2 } from '../../../../components/SearchGrid/component/setupData';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../Services/GetUserInfo';

import LoadingIcon from "../../../../images/icons/loaderIcon.gif";

import { Table, Empty } from "antd";
import "../../../../components/antd.css";
import "../../../../components/SearchGrid/antStyle.css";
function ControlledSubstancesTasks({ ...props }) {
    var classes = makeStyles();
    const { showMessage } = props;
    const [isShowInactiveUsers, setIsShowInActiveUsers] = useState();
    const [verifiedRequests, setVerifiedRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);

    //loading
    const [isEligibleLoading, setIsEligibleLoading] = useState(false);
    const [isNotEligibleLoading, setIsNotEligibleLoading] = useState(false);


    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }

    useEffect(() => {
        loadGridData();
    }, []);
    const handleClick = (id) => {
        // if (!window.confirm("Are you sure, you want to activate EPCS"))
        //     return;
        ShowActionDialog(true, "Sign", "Are you sure, you want to activate EPCS", "confirm", function () {

            var data = {
                EprescriptionRequestId: parseInt(id)
            }
            PostDataAPI("setup/epresciption/request/activateEPCS", data, true).then((result) => {

                if (result.success) {
                    loadGridData();
                }
                else {
                    // alert(result.message);
                    showMessage("Error", result.message, "error", 3000);

                }

            })
        });
    }
    const loadGridData = (filtervalues) => {
        var data = {
            userid: userInfo.userID
        }

        PostDataAPI("setup/epresciption/request/loadVerifiedRequestGrid", data).then((result) => {
            setIsEligibleLoading(false);

            if (result.success && result.data != null) {
                setVerifiedRequests(
                    result.data.map((item, i) => {
                        if (item.status != 'Active')
                            item.action = <Button className={classes.actionBtn} onClick={() => handleClick(item.requestId)} >Activate EPCS</Button>
                        return { ...item }
                    }));
            }

        });
        setIsNotEligibleLoading(true);
        PostDataAPI("setup/epresciption/request/loadPendingRequestGrid", data).then((result) => {
            setIsNotEligibleLoading(false);

            if (result.success && result.data != null) {
                setPendingRequests(
                    result.data.map((item, i) => {

                        //item.action = <Button className={classes.actionBtn}>Activate EPCS</Button>
                        return { ...item }
                    }));
            }

        })
    }

    const tableVerifiedData = {
        columns: gridCnfg["EPrescription"],
        rows: verifiedRequests,

    };

    const tablePendingData = {
        columns: gridCnfg["EPendingPrescription"],
        rows: pendingRequests,

    };
    const handleRadioBoxChange = (e) => {
        setIsShowInActiveUsers(!isShowInactiveUsers)
    }
    return (
        <>
            <div className={classes.allTasksCard}>
                <div className={classes.allTasksInnerCard}>
                    <Grid container lg={12} direction="row">

                        {/* <FormGroupTitle>Eligible for EPCS</FormGroupTitle> */}

                        {/*<CheckboxField*/}
                        {/*    id="showInactiveUsers"*/}
                        {/*    name="showInactiveUsers"*/}
                        {/*    checked={isShowInactiveUsers ? true : false}*/}
                        {/*    label="Show inactive users"*/}
                        {/*    color="primary"*/}
                        {/*    onChange={handleRadioBoxChange} />*/}

                        <div className={classes.tableArea}>
                            {/* <div className={classes.tableHeading}> */}
                            {/* <FormLabel className={classes.tableHeader}>Eligible for EPCS</FormLabel> */}
                            <FormGroupTitle>Eligible for EPCS</FormGroupTitle>
                            {/* </div> */}
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
                                                    image={isEligibleLoading && LoadingIcon}
                                                    description={isEligibleLoading ? "Loading..." : "No Record Found"}
                                                    imageStyle={{ height: 30, display: !isEligibleLoading ? "none" : "" }}
                                                />
                                            )
                                        }}
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={verifiedRequests}
                                        columns={gridCnfg2["EPrescription"]}
                                    />
                                </div>
                            </div>
                            {/* <MDBDataTable
                                striped
                                small
                                btn
                                searching={false}
                                data={tableVerifiedData}
                            /> */}
                            {/* <div style={{ marginTop: "5%" }}> */}
                            {/* <div className={classes.tableHeading}> */}
                            <FormGroupTitle >Not eligible for EPCS - Identity verification in-complete/pending</FormGroupTitle>
                            {/* </div> */}
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
                                                    image={isNotEligibleLoading && isNotEligibleLoading}
                                                    description={isNotEligibleLoading ? "Loading..." : "No Record Found"}
                                                    imageStyle={{ height: 30, display: !isNotEligibleLoading ? "none" : "" }}
                                                />
                                            )
                                        }}
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={pendingRequests}
                                        columns={gridCnfg2["EPendingPrescription"]}
                                    />
                                </div>
                            </div>
                            {/* <MDBDataTable
                                    striped
                                    small
                                    btn
                                    searching={false}
                                    data={tablePendingData}
                                /> */}
                            {/* </div> */}
                        </div>

                    </Grid>
                </div>
            </div>
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )
}

export default ControlledSubstancesTasks
