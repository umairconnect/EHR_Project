
import React, { useState, useEffect } from "react";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../images/icons/add-icon.png';
import EditIcon from '../../../../../images/icons/editIcon.png';
import { formatDate } from '../../../../../components/Common/Extensions';
import {
    Button,
    Grid,
    Icon,
    FormLabel
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';

import unLockedEncounter from '../../../../../images/icons/unlocked-encounter.png';
import Addendum from '../../../../../images/icons/addendum.png';

import useStyles from "./styles";

function EncounterClinical({ patientId, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [filterDataList, setFilterDataList] = useState([]);

    const getEncounterList = e => {
        var params = {
            code: "patient_encounters",
            parameters: [patientId.toString(), "0"]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var dataArr = result.data.map((item, i) => {
                    return {
                        encounterID: item.id,
                        encounterDate: formatDate(item.d1.split('T')[0]), //new Date(item.d1).toLocaleDateString(undefined, options),
                        visitType: item.text1? item.text1.replace(/_/g, " "):'',
                        comments: item.text2,
                        ccDetail: item.text3 == null ? "" : item.text3,
                        signed: item.id1,
                        isAddendum: item.text4 == 'False' ? false : true,
                        providerId: item.text5,
                        appointmentId: item.text6,
                        encounterTypeId: item.id2
                    };
                });
                setFilterDataList(dataArr);

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    useEffect(() => {
        console.log(patientId);
        initialization();
    }, []);

    const initialization = () => {
        getEncounterList();
    }

    return (
        <>


            <div className={classes.listTitle}>
                <span>Encounters</span>
            </div>


            <Grid container md={12} sm={12} lg={12} className={classes.encounterTitle}>

                {filterDataList.length > 0 ?
                    <>
                        <ul className={classes.ListStyle}>
                            {filterDataList.slice(0,5).map(encData => (
                                <li>
                                    <div className={classes.impleadvContent} style={{ display: "flex", alignItems: "center" }}>
                                        <span className={classes.LockIcon}>
                                            {encData.isAddendum === true ?
                                                <img src={Addendum} alt="addendum" className={classes.addendumIcon} style={{ position: "relative", left: "5px" }} /> :
                                                encData.signed == 1 ?
                                                    <LockIcon />:
                                                    <Icon className={classes.unSignedEncounterIcon}><img style={{position: "relative", top:"4px"}}src={unLockedEncounter} /></Icon>
                                            }</span>
                                        <span style={{paddingLeft: "5px", fontZize: "14px"}}>{encData.encounterDate} | {encData.visitType}</span> <br></br>

                                    </div>
                                    <div className={classes.impleadvContent} style={{ display: "flex" }}>
                                        <p className={classes.fontWeight400}>{encData.ccDetail?'CC: ':''} {encData.ccDetail}</p>
                                    </div>

                                </li>

                            ))}
                        </ul>
                    </> : <div className={classes.noRecord}>Patient has no encounter</div>}


            </Grid>


        </>
    )

}

export default EncounterClinical;