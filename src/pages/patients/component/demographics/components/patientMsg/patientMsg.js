import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
    Grid,
    Icon,
    Tooltip,
    Button
} from "@material-ui/core"
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { data as gridCnfg2 } from '../../../../../../components/SearchGrid/component/setupData';
import ViewPatientMessage from './components/viewPatientMessage';
import View from "../../../../../../images/icons/view.png";
import { Table } from 'antd';
import { formatDateTime } from '../../../../../../components/Common/Extensions';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

function PatientMsg(props) {
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics messages screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        saveAuditLogInfo();
        loadGridData();
    }, []);

    var classes = useStyles();
    const { showMessage } = props;
    const [update, setUpdate] = useState(false);
    const [patientMessage, setPatientMessage] = useState();

    const handleUpdate = () => setUpdate(!update);

    const [viewMessage, setViewMessage] = useState(false);

    const viewMessageDialog = () => {
        setViewMessage(true)
    }

    const closeMessagedialog = () => {
        setViewMessage(false)
    }


    const loadGridData = () => {
        PostDataAPI('com/emailmessage/getPatientMessages', props.dataId).then((result) => {
            console.warn(result.data)
            if (result.success && result.data != null) {
                setPatientMessage(
                    result.data.map((item, i) => {
                        item.messageDate = formatDateTime(item.createDate);
                        item.messageSubject = item.messageSubject;
                        item.messageBody = item.messageBody;
                        item.from = item.from;
                        item.attachments = item.attachments;
                        item.messageAction =
                            <div style={{ width: "100%" }}>

                                <Tooltip title="View Message">
                                    <Icon> <Button onClick={viewMessageDialog}><img src={View} className={classes.Icon} /> </Button> </Icon>
                                </Tooltip>

                            </div>
                        return { ...item }
                    }));
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);
        })


    }
    const [selectedRowData, setSelectedRowData] = useState({});
    const handleClick = (e, record) => {
        setSelectedRowData(record);
        ////if (!state.isApplied)
        //history.push(`/app/individualinsurancepayment/id=` + record.batchId + '/' + record.claimSuperbillId + '/era');
    };
    return (
        <>
            <div className={classes.positionRelative}>
                <>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="flex-end" justify="flex-start">
                            <span className={classes.title}>Patient Messages</span>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                            <div className={'dp-table'}>
                                <div className="custom-grid">

                                    <Table
                                        checkStrictly={true}
                                        rowClassName={(record, index) => "claimRow"}
                                        scroll={true}
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                        dataSource={patientMessage}
                                        columns={gridCnfg2["PatientMessage"]}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: (e) => handleClick(e, record),
                                            };
                                        }}
                                    />

                                </div>
                            </div>

                        </Grid>
                    </Grid>


                </>
                {viewMessage ?
                    <ViewPatientMessage closeMessagedialog={closeMessagedialog} data={selectedRowData}></ViewPatientMessage>
                    : ''
                }


            </div>
        </>
    )

}
export default withSnackbar(PatientMsg);