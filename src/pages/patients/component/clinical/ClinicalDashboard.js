import React, { useState, useEffect } from "react";
import Allergies from '../../../encounter/components/encounterDetail/components/allergies/Allergies';
import VitalSigns from './components/VitalSignClinical';
import History from '../../../encounter/components/encounterDetail/components/history/History';
import CarePlan from '../../../encounter/components/encounterDetail/components/carePlan/CarePlan';
import Immunizations from '../../../encounter/components/encounterDetail/components/immunizations/Immunizations';
import Diagnosis from '../../../encounter/components/encounterDetail/components/diagnosis/Diagnosis';
import ImplantableDevices from "./components/ImplantableDevices";
import PatientCDSrules from "./components/PatientCDSrules";
import AdvanceDirectives from "./components/AdvanceDirectives";
import HealthConcern from "./components/HealthConcern";
import MessageList from "./components/MessageList";
import EncounterClinical from "./components/EncounterClinical";
import MedicationClinical from "./components/MedicationClinical";
import AppointmentList from "./components/AppointmentList";
import LabImageOrder from "./components/LabImageOrder";
import { FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { IsEditable } from '../../../../Services/GetUserRolesRights';

import useStyles from "./styles";

function ClinicalDashboard({ dataId, ...props }) {
    var classes = useStyles();
    const [isEditable, setIsEditable] = useState(IsEditable("Patients"));
    let pId = props.pId != undefined ? props.pId : 0;
    const [patientId, setPatientId] = useState(pId);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [signed, setSigned] = useState(false);
    const [encComponents, setEncComponents] = useState([]);

    const initComponents = () => {
        setEncComponents([
            { name: "Allergies", id: "allergies", order: 1, alignment: "left", isActive: true },
        ])
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient clinical dashboard"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        saveAuditLogInfo();
    }, []);

    return (
        <>
            <FormGroupTitle greyBg={true}>Clinical Dashboard</FormGroupTitle>
            <div className={classes.cententArea}>
                <div className={classes.cententLeft}>
                    {signed ?
                        <div className={classes.disabledStyle}>
                            <VitalSigns disabled={signed} dataId={dataId} isEditable={isEditable} />
                        </div>
                        : <VitalSigns disabled={signed} dataId={dataId} isEditable={isEditable} />
                    }
                    <History patientId={dataId} isEditable={isEditable}/>
                    {/* <CarePlan patientId={dataId} /> */}
                    <Immunizations patientId={dataId} isEditable={isEditable} />
                    <AdvanceDirectives patientId={dataId} isEditable={isEditable}></AdvanceDirectives>
                    <HealthConcern patientId={dataId} isEditable={isEditable}></HealthConcern>

                </div>
                <div className={classes.cententLeft}>
                    <Allergies patientId={dataId} isEditable={isEditable} />
                    <Diagnosis patientId={dataId} isEditable={isEditable}/>

                    {signed ?
                        <div>
                            <MessageList patientId={dataId} isEditable={isEditable}/>
                        </div>
                        : <MessageList patientId={dataId} isEditable={isEditable}/>
                    }

                    {signed ?
                        <div >
                            <ImplantableDevices dataId={dataId} isEditable={isEditable}></ImplantableDevices>

                        </div>
                        : <ImplantableDevices dataId={dataId} isEditable={isEditable}></ImplantableDevices>
                    }
                    {signed ?
                        <div>
                            <PatientCDSrules patientId={dataId} isEditable={isEditable}></PatientCDSrules>
                        </div>
                        : <PatientCDSrules patientId={dataId} isEditable={isEditable}></PatientCDSrules>
                    }
                </div>
                <div className={classes.cententLeft}>
                    {signed ?
                        <div className={classes.disabledStyle}>
                            <EncounterClinical patientId={dataId} isEditable={isEditable}></EncounterClinical>
                        </div>
                        : <EncounterClinical patientId={dataId} isEditable={isEditable}></EncounterClinical>
                    }
                    {signed ?
                        <div className={classes.disabledStyle}>
                            <MedicationClinical patientId={dataId} disabled={signed} isEditable={isEditable}> </MedicationClinical>
                        </div>
                        : <MedicationClinical patientId={dataId} disabled={signed} isEditable={isEditable}></MedicationClinical>
                    }

                    <LabImageOrder patientId={dataId} isEditable={isEditable}></LabImageOrder>

                    <AppointmentList patientId={dataId} isEditable={isEditable}></AppointmentList>
                </div>
            </div>
        </>
    )
}

export default ClinicalDashboard;