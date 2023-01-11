import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import EditIcon from '../../../../../../images/icons/editIcon.png';

import { PostDataAPI } from '../../../../../../Services/PostDataAPI';


import EncounterHistory from "../../../history/EncounterHistory"

// styles
import useStyles from "./styles";

export default function History(props) {
    var classes = useStyles();
    const [patientId] = useState(props.patientId);
    const [isEditable] = useState(props.isEditable);
    const [encounterId, setEncounterId] = useState(parseInt(props.encounterId));
    const [disabled] = useState(props.disabled);
    const [historyDialogState, setHistoryDialogState] = useState(false);
    const [listRowsData, setListRowsData] = useState([]);
    const [familyHistoryData, setFamilyHistoryData] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState("");


    useEffect(() => {
        var params = {
            code: "enc_medical_history",
            parameters: [patientId.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var medHistroy = "";
                result.data.map((item, i) => {
                    medHistroy += item.text1;
                    if ((i + 1) < result.data.length)
                        medHistroy += ", ";
                })
                setMedicalHistory(medHistroy);
            }

        });

        if (props.patientId)
            initialization();

    }, [historyDialogState]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        var params = {
            code: "social_history",
            parameters: [props.patientId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setListRowsData(
                    result.data.map((item, i) => {

                        return {
                            caffeineUsage: item.text1,
                            caffeineUsageFreq: item.text2,
                            noOfChild: item.id == 0 ?null:parseInt(item.id),
                            tobaccoStatusCode: item.text3
                        };
                    }));
            }
            else {
                setListRowsData([]);
            }
        })

        var params = {
            code: "family_history",
            parameters: [props.patientId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {

                setFamilyHistoryData(
                    result.data.map((item, i) => {
                        return {

                            relationshipCode: item.text1,
                            isAlive: item.text2,
                            isNoFamilyHistory: item.text3
                        };
                    }));
            }
            else {
                setFamilyHistoryData([]);
            }
        })

    }
    return (
        <>
            {historyDialogState ? <EncounterHistory patientId={patientId} showHideDialog={historyDialogState} handleClose={() => setHistoryDialogState(false)} isEditable={ isEditable} /> : ""}
            <div className={classes.listTitle} >
                <span>History</span>
                {!props.disabled ?
                    <span className={classes.editBtn} title="Edit History" onClick={() => setHistoryDialogState(true)}><img src={EditIcon} alt="Edit" /></span>
                    : ""}
            </div>
            <div className={classes.listSubChild}>
                {!props.disabled ? <>
                    <div className={classes.listSubTitle} >Medical History</div>
                    <p className={classes.listP}>
                        {
                            medicalHistory.length < 1 ?
                                <Typography className={classes.noRecord}> No medical history recorded yet <br /> </Typography>
                                : medicalHistory
                        }
                    </p>
                    <div className={classes.listSubTitle} >Family History</div>
                    <p className={classes.listP}>
                        {
                            familyHistoryData.length < 1 ?
                                <Typography className={classes.noRecord}>  No family history recorded yet <br /> </Typography> :
                                familyHistoryData.map((item, i) => (
                                    <>{item.isNoFamilyHistory == "True" ? "No known family history recorded yet" : item.relationshipCode + ":   " + item.isAlive}<br /></>
                                ))}
                    </p>
                    <div className={classes.listSubTitle} >Social History</div>
                    <p className={classes.listP}>
                        {
                            listRowsData.length < 1 ?
                                <Typography className={classes.noRecord}>  No social history recorded yet <br /> </Typography> :
                                listRowsData.map((itm, j) => (
                                    <> Tobacco Smoking: {itm.tobaccoStatusCode} {itm.noOfChild ?<><br />Children : {itm.noOfChild}</>: null}<br />Caffeine Use: {itm.caffeineUsageFreq}<br /></>

                                ))}
                    </p>
                </> : <>
                    <div className={classes.dislistSubTitle} >Past Medical History</div>
                    <p className={classes.dislistP}>Herpes zoster without complication, Pain in Joint involving shoulder resion, Moderate persistent asthma, uncomplicated 1.abnc 2.dfg</p>
                    <div className={classes.dislistSubTitle} >Family History</div>
                    <p className={classes.dislistP}>
                        {
                            familyHistoryData.length < 1 ?
                                <> No family history recorded yet <br /> </> :
                                familyHistoryData.map((item, i) => (
                                    <>{item.isNoFamilyHistory == "True" ? "No known family history recorded yet" : item.relationshipCode + ":" + item.isAlive}<br /></>
                                ))}
                    </p>
                    <div className={classes.dislistSubTitle} >Social History</div>
                    <p className={classes.dislistP}>
                        {
                            listRowsData.length < 1 ?
                                <> No social history recorded yet <br /> </> :
                                listRowsData.map((itm, j) => (
                                    <> Tobacco Smoking: {itm.tobaccoStatusCode} <br /> Children : {itm.noOfChild}<br />Caffeine Use: {itm.caffeineUsageFreq}<br /></>
                                ))
                        }
                    </p>
                </>
                }
            </div>

        </>

    );
}

