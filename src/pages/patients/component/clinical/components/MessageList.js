import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../components/Message/Alert';
import ViewMessage from './dialogs/MessageView'
import { formatDate, formatTime } from '../../../../../components/Common/Extensions';
import {
    Grid,
} from "@material-ui/core"

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function MessagesList({ patientId, ...props }) {
    const { showMessage } = props;
    const [listRowsData, setListRowsData] = useState([]);

    useEffect(() => {
        console.log(patientId);
        initialization();
    }, []);

    const initialization = () => {
        loadPatientMsg();
    }

    const classes = useStyles();

    const [messageList, getMessageList] = useState();

    const [viewMessageDialog, setViewMessageDialog] = useState(false);

    const [messageData, setMessageData] = useState([{ messageDate: "", messageBody: "" }]);

    const showMessageDialog = (messageDate, messageBody, messageFrom, messageSubject, messageTime, createDate) => {

        setViewMessageDialog(true);
        
        setMessageData([{messageDate: messageDate, messageBody: messageBody, messageFrom: messageFrom, messageSubject: messageSubject, messageTime: messageTime, createDate: createDate }])
    }

    const closeMessageDialog = () => {
        setViewMessageDialog(false)
    }



    const loadPatientMsg = () => {
        PostDataAPI('com/emailmessage/getPatientMessagesForClinicalDashboard', parseInt(patientId)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data)
                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                            messageDate: formatDate(item.createDate.split('T')[0]),
                            messageDetail: item.from + " | " + item.messageBody,
                            messageId: item.messageId,
                            messageTime: formatTime(item.createDate),
                            messageBody: item.messageBody,
                            messageSubject: item.messageSubject,
                            messageFrom: item.from,
                            createDate: item.createDate,
                        };
                    }));
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);
        })
    }

    return (
        <>
            <div className={classes.listTitle}>
                <span>Messages</span>
            </div>

            <div className={classes.advContent}>
                {listRowsData.length > 0 ?
                    <>{
                        listRowsData.map((item, i) => (
                            <>

                                <ul className={classes.treeView}>
                                    <li>
                                        <div className={classes.treeContent}>
                                            <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                            <p className={classes.treeLabel} style={{ margin: "0" }} onClick={() => showMessageDialog(item.messageDate, item.messageBody, item.messageFrom, item.messageSubject, item.messageDate, item.messageTime, item.createDate)}> {item.messageDate} {item.messageTime}</p>
                                        </div>
                                    </li>
                                </ul>

                                <div style={{ paddingLeft: "30px" }}>
                                    <p style={{
                                        width: "251px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis"
                                    }} class={classes.messageDetails}>From: {item.messageDetail}</p>
                                </div>




                            </>
                        ))
                    }</>
                    : <div className={classes.noRecord}>Patient has no messages</div>
                }

                {viewMessageDialog ?
                    <ViewMessage closeMessageDialog={closeMessageDialog} data={messageData}></ViewMessage>
                    : ''
                }




            </div>

        </>
    )

}

export default withSnackbar(MessagesList);