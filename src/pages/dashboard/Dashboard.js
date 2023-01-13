import React, { useState, useEffect } from "react"; //, { useState }
import Grid from '@material-ui/core/Grid';


// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import TodayAppointments from './component/todayAppointments/TodayAppointments';
import DashboardUpdateBox from './component/dashboardUpdateBox/DashboardUpdateBox';
import PatientsAppointments from './component/patientsAppointments/PatientsAppointments';
import DateRefillBox from './component/dateRefillBox/DateRefillBox';
import BillsSignFaxBox from './component/billsSignFaxBox/BillsSignFaxBox';
import { GetUserInfo } from '../../Services/GetUserInfo';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { IsEditable } from '../../Services/GetUserRolesRights';
export default function Dashboard(props) {
    var classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [upcommingAppointment, setUpcommingAppointment] = useState([]);
    const [state, setState] = useState({ patientMessageCount: 0, providerMessageCount: 0, labResultCount: 0, unsignedEncounterCount: 0, refillRequestCount:0 });
    const [appointmentAgingData, setAppointmentAgingData] = useState();
    const [appointmentsWeeklyMonthlyQuarterlyData, setAppointmentsWeeklyMonthlyQuarterlyData] = useState();
    const [pendingSuperBills, setPendingSuperBills] = useState();
    const [unsignedDocuments, setUnsignedDocuments] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [moduleAccess, setModuleAccess] = useState({
        isLabResult: false,
        isRefillRequest: false,
        isDocumentToSign: false,
        isMessages: IsEditable("Messages"),
        isClinical: IsEditable("Clinical")
    })
   
    const loadTodayAppointments = () => {
        let params = {
            "loggedinUserId": userInfo.userID + "",
            "date": new Date()
        }
        PostDataAPI("appointment/loadPatientTodayAppointments", params).then((result) => {
            debugger;
            if (result.success) {
                setTodayAppointments(result.data);
                setIsUpdate(true)
                setTimeout(() => {
                    setIsUpdate(false);
                }, 1000);
            }
        })
    }

    const loadUpcommingAppointment = () => {
        let params = {
            "loggedinUserId": userInfo.userID + "",
            "date": new Date()
        }
        PostDataAPI("appointment/loadPatientUpcommingAppointment", params).then((result) => {
            if (result.success && result.data != null) {
                setUpcommingAppointment(result.data);
                setIsUpdate(true)
                setTimeout(() => {
                    setIsUpdate(false);
                }, 1000);
            }

        })
    }

    const loadWidgetCount = () => {
        var params = {
            SPName: "SP_DASHBOARD_WIDGET_COUNT",
            providerId: [userInfo.userID] + ""
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.map((item, i) => {
                    setState(prevState => ({
                        ...prevState,
                        patientMessageCount: item.text1,
                        providerMessageCount: item.text2,
                        totalMessages: parseInt(item.text1) + parseInt(item.text2),
                        labResultCount: item.text3,
                        unsignedEncounterCount: item.text4,
                        refillRequestCount: item.text5
                    }))
                })
                setIsUpdate(true)
                setTimeout(() => {
                    setIsUpdate(false);
                }, 1000);
            }
        })
    }

    const loadAppointmentAgingData = () => {
        var params = {
            SPName: "SP_PATIENT_AGING",
            providerId: [userInfo.userID] + ""
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                setAppointmentAgingData(result.data);
            }
            setIsUpdate(true)
            setTimeout(() => {
                setIsUpdate(false);
            }, 1000);
        })
    }

    const loadAppointmentGudgetData = () => {
        var params = {
            SPName: "SP_APPOINTMENTS_COUNT",
            providerId: [userInfo.userID] + ""
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                setAppointmentsWeeklyMonthlyQuarterlyData(result.data);
            }
            setIsUpdate(true)
            setTimeout(() => {
                setIsUpdate(false);
            }, 1000);
        })
    }

    const loadPendingSuperBills = () => {
        var params = {
            SPName: "SP_PENDING_SUPERBILLS",
            providerId: [userInfo.userID] + ""
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                setPendingSuperBills(result.data);
            }
            setIsUpdate(true)
            setTimeout(() => {
                setIsUpdate(false);
            }, 1000);
        })
    }

    const loadDocumentsToSign = () => {
        var params = {
            SPName: "SP_DOCUMENTS_TO_SIGN",
            providerId: [userInfo.userID] + ""
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                setUnsignedDocuments(result.data);
            }
            setIsUpdate(true)
            setTimeout(() => {
                setIsUpdate(false);
            }, 1000);
        })
    }
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(userInfo.loggedInUserID +""),
            area: "Provider Dashboard",
            activity: "Load provider dashboard details",
            details: "User viewed provider dashboard screen"
        };
        
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    function loadModuleAccess() {
        var data = {}
        PostDataAPI("task/settings/loadUserSettings", data, true).then((result) => {
            if (result && result.data != null) {
                let isLabResult = result.data.some(item => item.taskTypeCode == 'labResults' && item.isActive)
                let isRefillRequest = result.data.some(item => item.taskTypeCode == 'refillRequests' && item.isActive)
                let isDocumentToSign = result.data.some(item => item.taskTypeCode == 'documentToSign' && item.isActive)
                setModuleAccess(prevState => ({
                    ...prevState,
                    ['isLabResult']: isLabResult,
                    ['isRefillRequest']: isRefillRequest,
                    ['isDocumentToSign']: isDocumentToSign,
                }));
            }
            setModuleAccess(prevState => ({
                ...prevState,
                ['isMessages']: IsEditable("Messages"),
                ['isClinical']: IsEditable("Clinical"),
            }));
            setIsUpdate(true)
            setTimeout(() => {
                setIsUpdate(false);
            }, 1000);
        })
       
    }

    useEffect(() => {
        loadModuleAccess();
        loadTodayAppointments();
        loadUpcommingAppointment();
        loadWidgetCount();
        loadAppointmentAgingData();
        loadAppointmentGudgetData();
        loadPendingSuperBills();
        loadDocumentsToSign();
        saveAuditLogInfo();
    }, []);
  return (
    <>
      <PageTitle title="Dashboard" />

      <Grid container spacing={1} className={classes.container}>
        {/* Today’s Appointments component  */}
              <TodayAppointments data={todayAppointments} isUpdate={isUpdate}/>

              {/* Messages, Next Appointment, Lab Results, Unsigned Encounters  components  */}
              <DashboardUpdateBox upcommingAppointments={upcommingAppointment} isLabResult={moduleAccess.isLabResult} isRefillRequest={moduleAccess.isRefillRequest} data={state} isUpdate={isUpdate} />

        {/* Patient Appointments component  */}
              <PatientsAppointments data={appointmentAgingData} isUpdate={isUpdate}/>

              {/* Weekly, Monthly, Quarterly  components  */}
              <DateRefillBox isUpdate={isUpdate} data={state} data2={appointmentsWeeklyMonthlyQuarterlyData} isRefillRequest={moduleAccess.isRefillRequest} />

              {/* Pending Super Bills, Documents to sign, Fax referrals  components  */}
              <BillsSignFaxBox pendingBills={pendingSuperBills} unsignDoc={unsignedDocuments} isDocumentToSign={moduleAccess.isDocumentToSign}
                  isClinical={moduleAccess.isClinical} isUpdate={isUpdate} />
        {/* <div className={classes.opacityContainer}>
          <span>Coming soon</span>
        </div> */}
      </Grid>

    </>
  );
}

