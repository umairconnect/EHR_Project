import React, { lazy, Suspense, useState, useEffect } from "react";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";
import classnames from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Tasks from "../../pages/tasks/Tasks";
// import Dashboard from "../../pages/dashboard";
// import Schedule from "../../pages/schedule";
// import Clinical from "../../pages/clinical";
// import Billing from "../../pages/billing";
// import Patients from "../../pages/patients";
// import Setup from "../../pages/setup/setup";
// import Location from '../../pages/setup/location/location';
// import Help from "../../pages/help";
// import ProviderList from "../../pages/setup/provider/provider-list";
// import StaffList from "../../pages/setup/staff/staff-list";
// import ApptProfile from "../../pages/setup/appointmentProfile";
// import ConsentForm from "../../pages/setup/consentForm";
// import ChangeUserPassword from '../../pages/changePassword/ChangeUserPassword'
// import Speciality from "../../pages/setup/Speciality";
// import ScheduleSlots from "../../pages/schedule/scheduleSlots";
// import RolesPermission from "../../pages/setup/rolesPermissions";
// import Encounter from "../../pages/encounter/Encounter";
// import ChiefComplaintList from "../../pages/setup/chiefComplaintList/ChiefComplaintList";
// import EnablingEPrescription from "../../pages/setup/ePrescription/EnablingEPrescription";

// context
import { useLayoutState } from "../../context/LayoutContext";

const Tasks = lazy(() => import('../../pages/tasks/Tasks'));
const Dashboard = lazy(() => import('../../pages/dashboard'));
const Schedule = lazy(() => import('../../pages/schedule'));
const Clinical = lazy(() => import('../../pages/clinical'));
const Billing = lazy(() => import('../../pages/billing'));
const Patients = lazy(() => import('../../pages/patients'));
const Setup = lazy(() => import('../../pages/setup/setup'));
const Location = lazy(() => import('../../pages/setup/location/location'));
const CDSRules = lazy(() => import('../../pages/setup/cdsRules/CDSRules'))
const EmergencyAccess = lazy(() => import('../../pages/setup/emergencyAccess/EmergencyAccess'))
const Help = lazy(() => import('../../pages/help'));
const ProviderList = lazy(() => import('../../pages/setup/provider/provider-list'));
const StaffList = lazy(() => import('../../pages/setup/staff/staff-list'));
const ApptProfile = lazy(() => import('../../pages/setup/appointmentProfile'));
const ConsentForm = lazy(() => import('../../pages/setup/consentForm'));
const ChangeUserPassword = lazy(() => import('../../pages/changePassword/ChangeUserPassword'));
const Speciality = lazy(() => import('../../pages/setup/Speciality'));
const ScheduleSlots = lazy(() => import('../../pages/schedule/scheduleSlots'));
const RolesPermission = lazy(() => import('../../pages/setup/rolesPermissions'));
const RemindersSetting = lazy(() => import('../../pages/setup/remindersSetting/RemindersSetting'));
const Encounter = lazy(() => import('../../pages/encounter/Encounter'));
const ChiefComplaintList = lazy(() => import('../../pages/setup/chiefComplaintList/ChiefComplaintList'));
const EnablingEPrescription = lazy(() => import('../../pages/setup/ePrescription/EnablingEPrescription'));
const Payers = lazy(() => import('../../pages/setup/billing/component/payers/Payers'));
const BillingProfiles = lazy(() => import('../../pages/setup/billing/component/profiles/BillingProfiles'));
const AddNewClaim = lazy(() => import('../../pages/billing/components/claim/components/addNewClaim/AddNewClaim'));
const FeeSchedule = lazy(() => import('../../pages/billing/components/feeSchedule/FeeSchedule'));
const Payment = lazy(() => import('../../pages/billing/components/payment/Payment'));
const Claims = lazy(() => import("../../pages/billing/components/claim/Claims"));
const InsurancePayment = lazy(() => import("../../pages/billing/components/payment/components/insurancePayments/InsurancePayments"));
const PatientPayment = lazy(() => import("../../pages/billing/components/payment/components/patientPayments/PatientPayments"));
const IndividualInsurancePayment = lazy(() => import("../../pages/billing/components/payment/components/insurancePayments/components/individualInsurancePayment/IndividualInsurancePayment"));
const ElectronicRemittanceAdviceReview = lazy(() => import("../../pages/billing/components/payment/components/electronicRemittanceAdviceReview/ElectronicRemittanceAdviceReview"));
const ElectronicRemittanceAdviceResult = lazy(() => import("../../pages/billing/components/payment/components/electronicRemittanceAdviceReview/components/electronicRemittanceAdviceResult/ElectronicRemittanceAdviceResult"));
const PatientStatement = lazy(() => import('../../pages/setup/billing/component/patientStatement/PatientStatement'));
const PatientStatementSettings = lazy(() => import('../../pages/setup/billing/component/patientStatement/component/patientStatementSettings/PatientStatementSettings'));
const Messages = lazy(() => import('../../pages/communication/messages/Messages'));
const Profile = lazy(() => import('../../pages/profile/Profile'));
const ChartNotesTemplates = lazy(() => import('../../pages/setup/chartNotesTemplates/ChartNotesTemplates'));
const ListItem = lazy(() => import('../../pages/setup/listItem/ListItem'));
const OrderDelegations = lazy(() => import('../../pages/setup/orderDelegations/OrderDelegations'));
const BillingSummary = lazy(() => import('../../pages/reports/billingSummary/BillingSummary'));
const Procedures = lazy(() => import('../../pages/reports/procedures/Procedures'));
const ProcedureDetails = lazy(() => import('../../pages/reports/procedures/components/procedureDetails/ProcedureDetails'));
const RemittanceReports = lazy(() => import('../../pages/reports/remittanceReports/RemittanceReports'));
const RemittanceReportsDetails = lazy(() => import('../../pages/reports/remittanceReports/components/remittanceReportsDetails/RemittanceReportsDetails'));
const UnderpaidItemReports = lazy(() => import('../../pages/reports/underpaidItemReports/UnderpaidItemReports'));
const FinancialReports = lazy(() => import('../../pages/reports/financialReports/FinancialReports'));
const TransactionsByAppointmentReports = lazy(() => import('../../pages/reports/transactionsByAppointment/TransactionsByAppointment'));
const AccountReceivableReports = lazy(() => import('../../pages/reports/accountsReceivableReports/AccountsReceivable'));
const PatientInsuranceAuthorizationReport = lazy(() => import('../../pages/reports/patientInsuranceAuthorizationReport/PatientInsuranceAuthorizationReport'));
const MedicationReport = lazy(() => import('../../pages/reports/medicationReport/MedicationsReport'));
const DiagnosisReport = lazy(() => import('../../pages/reports/diagnosisReport/DiagnosisReport'));
const AllergyReport = lazy(() => import('../../pages/reports/allergyReport/AllergyReport'));
const DrugInterationReport = lazy(() => import('../../pages/reports/drugInteractionReport/DrugInteractionReport'));
const PatientReport = lazy(() => import('../../pages/reports/patientReport/PatientReport'));
const PatientLedger = lazy(() => import('../../pages/reports/patientLedger/PatientLedger'));
const PatientLedgerDetails = lazy(() => import('../../pages/reports/patientLedger/components/PatientLedgerDetails'));
const UnmatchedERAs = lazy(() => import('../../pages/reports/unmatchedEras/UnmatchedERAs'));
const DrugInteractionReport = lazy(() => import('../../pages/reports/drugInteractionReport/DrugInteractionReport'));
const AuditLogReport = lazy(() => import('../../pages/reports/auditLogReport/AuditLogReport'));
const BillingReports = lazy(() => import('../../pages/reports/billingReport/BillingReports'));
const ProductivityReport = lazy(() => import('../../pages/reports/productivityReport/ProductivityReport'));
const FormsList = lazy(() => import('../../pages/setup/formsList/FormsList'));
const ECQMDashboard = lazy(() => import('../../pages/setup/eCqmDashboard/ECQMDashboard'));
const ChartNotesType = lazy(() => import('../../pages/setup/chartNotesType/chartNotesType'));

function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();
    const [messageCount, setMessageCount] = useState(0);
    const updateMessaages = (count) => {
       
        setMessageCount(count);
        // setUpdateLayout(updateLayout === true ? false : true);
    }

    useEffect(() => {
    }, []);


    return (
        <div className={classes.root}>
            <>
                <Header history={props.history} />
                <Sidebar updatMessage={messageCount} />
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.Toolbar} />
                    <Suspense fallback={<Box style={{ display: 'block', width: '100%', textAlign: "center", paddingTop: "10%" }}><CircularProgress /></Box>}>
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/schedule" component={Schedule} />
                            <Route path="/app/clinical" component={Clinical} />
                            <Route path="/app/billingdashboard" component={Billing} />
                            <Route path="/app/patients" component={Patients} />
                            <Route path="/app/setup" component={Setup} />
                            <Route path="/app/locations" component={Location} />
                            <Route path="/app/cdsrules" component={CDSRules} />
                            <Route path="/app/emergencyaccess" component={EmergencyAccess} />
                            <Route path="/app/providers" component={ProviderList} />
                            <Route path="/app/help" component={Help} />
                            <Route path="/app/appointmentProfiles" component={ApptProfile} />
                            <Route path="/app/consentForms" component={ConsentForm} />
                            <Route path="/app/staff" component={StaffList} />
                            <Route path="/app/changePassword" component={ChangeUserPassword} />
                            <Route path="/app/specialization" component={Speciality} />
                            <Route path="/app/scheduleSlots" component={ScheduleSlots} />
                            <Route path="/app/userRoles" component={RolesPermission} />
                            <Route path="/app/encounter" component={Encounter} />
                            <Route path="/app/chiefcomplaintlist" component={ChiefComplaintList} />
                            <Route path="/app/enablingeprescription" render={(props) => <EnablingEPrescription type="erx" {...props} />} />
                            <Route path="/app/eprescriptioncontrolledsubstances" render={(props) => <EnablingEPrescription type="epcs" {...props} />} />
                            <Route path="/app/tasks" component={Tasks} />
                            <Route path="/app/payers" component={Payers} />
                            <Route path="/app/billingprofiles" component={BillingProfiles} />
                            <Route path="/app/addclaim" component={AddNewClaim} />
                            <Route path="/app/feeschedule" component={FeeSchedule} />
                            <Route path="/app/billing" component={Claims} />
                            <Route path="/app/payment" component={Payment} />
                            <Route path="/app/batchinsurancepayment" component={InsurancePayment} />
                            <Route path="/app/individualinsurancepayment" component={IndividualInsurancePayment} />
                            <Route path="/app/patientpayment" component={PatientPayment} />
                            <Route path="/app/erareview" component={ElectronicRemittanceAdviceReview} />
                            <Route path="/app/eraresult" component={ElectronicRemittanceAdviceResult} />
                            <Route path="/app/patientstatement" component={PatientStatement} />
                            <Route path="/app/patientstatementsettings" component={PatientStatementSettings} />
                            <Route path="/app/reminderssetting" component={RemindersSetting} />
                            <Route path="/app/messages" render={props => <Messages UpdateMessageCount={(count) => updateMessaages(count)} {...props} />} />
                            <Route path="/app/updateprofile" component={Profile} />
                            <Route path="/app/chartnotestemplates" component={ChartNotesTemplates} />
                            <Route path="/app/ListItem" component={ListItem} />
                            <Route path="/app/orderdelegations" component={OrderDelegations} />
                            <Route path="/app/billingsummary" component={BillingSummary} />
                            <Route path="/app/procedures" component={Procedures} />
                            <Route path="/app/proceduredetails" component={ProcedureDetails} />
                            <Route path="/app/remittancereports" component={RemittanceReports} />
                            <Route path="/app/remittancereportsdetails" component={RemittanceReportsDetails} />
                            <Route path="/app/underpaiditemreports" component={UnderpaidItemReports} />
                            <Route path="/app/financialreports" component={FinancialReports} />
                            <Route path="/app/transactionreports" component={TransactionsByAppointmentReports} />
                            <Route path="/app/accountreceivablereports" component={AccountReceivableReports} />
                            <Route path="/app/authorizationreport" component={PatientInsuranceAuthorizationReport} />
                            <Route path="/app/medicationreport" component={MedicationReport} />
                            <Route path="/app/diagnosisreport" component={DiagnosisReport} />
                            <Route path="/app/allergyreport" component={AllergyReport} />
                            <Route path="/app/druginterationreport" component={DrugInterationReport} />
                            <Route path="/app/patientreport" component={PatientReport} />
                            <Route path="/app/patientledgerreport" component={PatientLedger} />
                            <Route path="/app/patientledgerdetailsreport" component={PatientLedgerDetails} />
                            <Route path="/app/unmatchedEras" component={UnmatchedERAs} />
                            <Route path="/app/druginteractionreports" component={DrugInteractionReport} />
                            <Route path="/app/auditlogreport" component={AuditLogReport} />
                            <Route path="/app/billingreports" component={BillingReports} />
                            <Route path="/app/productivityreport" component={ProductivityReport} />
                            <Route path="/app/formslist" component={FormsList} />
                            <Route path="/app/ecqmdashboard" component={ECQMDashboard} />
                            <Route path="/app/chartnotestype" component={ChartNotesType} />
                        </Switch>
                    </Suspense>
                </div>
            </>
        </div>
    );

}

export default withRouter(Layout);
