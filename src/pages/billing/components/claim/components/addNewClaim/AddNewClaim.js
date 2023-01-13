import React, { useState, useEffect, useRef, createRef } from "react";
import {
    Grid,
    FormLabel,
    Dialog,
    Divider,
    Typography,
    FormHelperText,
    Button,
    Tooltip,
    Tab,
    Tabs,
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactToPrint from "react-to-print";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from "react-router-dom";
import PrintIcon from '../../../../../../images/icons/print-icon.png';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import EditIcon from '../../../../../../images/icons/editIcon.png';
import DeleteIcon from '../../../../../../images/icons/trash.png';
//import CloseIcon from "../../../../../../images/icons/math-plus.png"
import { withSnackbar } from "../../../../../../components/Message/Alert";
//import PatientProfile from "../../../../patients/component/Profile/Profile";
import ClaimPatientProfile from "./components/claimPatientProfile/ClaimPatientProfile";
import { FormGroupTitle, Label, FormBtn, FooterBtn, DraggableComponent, LinkS } from "../../../../../../components/UiElements/UiElements";
//import { Scrollbars } from "rc-scrollbars";
import { InputBaseField, SelectField, CheckboxField, TextareaField, RadioboxField, InputBaseFieldNumber } from "../../../../../../components/InputField/InputField";
//import { check } from "prettier";
import SearchList from "../../../../../../components/SearchList/SearchList";
//import { data as gridCnfg } from '../../../../../../components/SearchGrid/Data/SetupData';
import { Table } from "antd";
import AddNote from './components/addNote/AddNote';

import "../../../../../../components/TaskGrid/styles.css";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
//import DiagnosisForm from "../../../../patients/component/diagnosis/components/DiagnosisForm";
import AddDiagnosisDialog from "./components/addDiagnosis/AddDiagnosisDialog";
import AddProcedureDialog from "./components/addProcedures/AddProcedureDialog";
import AddPatientPaymentDialog from "../../../payment/components/patientPayments/components/addPatientPaymentDialog/AddPatientPaymentDialog";
//import ProcedureDialog from "../../../../encounter/components/procedure/ProcedureDialog";
import AddNdcCode from "./components/addNdcCode/AddNdcCode";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
//import { Link } from "react-router-dom";
import CloneClaimDialog from "./components/cloneClaim/CloneClaimDialog";
import SearchListField from "../../../../../../components/SearchListField/SearchListField";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";
import AddEobDialog from "../../../payment/components/insurancePayments/components/addEOBDialog/AddEobDialog";
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import Appointment from '../../../../../appointment/component/Appointment';
import Encounter from '../../../../../encounter/Encounter';
import InformationCode from './components/addNewInfoCode'
import { Scrollbars } from "rc-scrollbars";
// import 'antd/dist/antd.css';
import "../../../../../../components/antd.css"
import "./antStyle.css";
import useStyles from './styles';
import { USAStateListOptions } from "../../../../../../context/StaticDropDowns";
import { todayDate, printReport } from '../../../../../../components/Common/Extensions';
import { IsEditable } from '../../../../../../Services/GetUserRolesRights';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "330px", height: "448px", margin: "0px", backgroundColor: "#FFFFFF",
                borderRadius: "0px", overflow: "auto"
            }}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AddNewClaim({ handleClose, ...props }) {
    const formPrint = React.useRef(null);
    const { Column, ColumnGroup } = Table;
    const [isEditable, setIsEditable] = useState(IsEditable("Billing"));
    const [isClinicalNoteEditable, setIsClinicalNoteEditable] = useState(IsEditable("Clinical"));
    const billingStatusRef = createRef();
    const claimTypeRef = createRef();
    const icnNoRef = createRef();
    const icdVersionRef = createRef();
    const feeScheduleRef = createRef();
    const posRef = createRef();
    const tosRef = createRef();
    const tocRef = createRef();
    const isEmploymentRef = createRef();
    const isAutoAccidentRef = createRef();
    const otherAccidentRef = createRef();
    const orderingProviderRef = createRef();
    const referringProviderRef = createRef();
    const billingProfileRef = createRef();
    const billingProcedureLengthRef = createRef();
    const billingDiagnosisLengthRef = createRef();
    const optionsYesNo = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const options = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
    ]

    const optionsIcdversionCode = [
        { value: "9", label: "ICD-9" },
        { value: "10", label: "ICD-10" }
    ]

    var classes = useStyles();
    const { showMessage } = props;
    let propsData = [];
    let isNull = false;

    if (props.location.search != null && props.location.search != "") {
        propsData = props.location.search.split('=')[1].split('/');
    }
    else
        isNull = true;

    let encounterId = isNull ? 0 : propsData[0];
    let patientId = isNull ? 0 : propsData[1];
    let claimId = isNull ? 0 : propsData[2];
    let callMethod = isNull ? 0 : propsData[3];

    const [patID, setPatID] = useState(patientId);
    const [encID, setEncID] = useState(encounterId);
    const [claimID, setClaimID] = useState(claimId);
    const [tabvalue, setTabValue] = useState(0);



    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        //if (/*newValue == '1' && */claimID > 0 && isInsLoaded == false) {
        //    setIsInsLoaded(true);
        //    //loadInstClaimData(claimID);
        //}

    };
    const updateInstLoaded = () => {
        setIsInsLoaded(true);
    }
    const [addNoteDialog, setAddNoteDialog] = useState(false);
    const [showHideNdcCodeDialog, setShowHideNdcCodeDialog] = useState(false);
    const [showHideCloneClaimDialog, setShowHideCloneClaimDialog] = useState(false);
    const [showHideDiagnosis, setShowHideDiagnosis] = useState(false);
    const [showHideProceduresDialog, setShowHideProceduresDialog] = useState(false);
    const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
    const [state, setState] = useState({
        claimSuperBillId: 0, billingProfileId: null, encounterId: encID, referringProviderId: null, orderingProviderId: null, operatingProviderId: null, otherProviderId: null,
        billingStatusCode: "INTERNAL_REVIEW", claimTypeCode: "DEFAULT", icdVersionCode: "10", isEmergencyService: "false", pos: "11", posName: "", tos: "01", tosName: "", ptPayment: '0.00',
        delayReasonCode: "", acuteManifestDate: null, onsetDate: null, otherDate: null, paymentProfileCode: "",
        isTransmitAuthorizNoToPayer: false, feeScheduleCode: "", authorizationNumber: "", authorizationName: "", referralNumber: "",
        isEmployment: "false", isAutoAccident: "false", isOtherAccident: "false", ediBillingNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, appontmentDate: '',
        createDate: new Date().toISOString(), onsetDateCode: "ONSET_CURRENT_SYMP", OtherDateCode: "", lstsuperBillDiagnosis: [], lstsuperBillProcedures: [],
        lstsuperbillProcedureNdc: [], claimCategory: 'Professional', useDescriptionFrom: 'HCPCSCodes', icnNo: '', lstMissingTeath: [],
        isOrthodontics: false, orthoApplianceDate: null, orthoMonthsTreatment: null, isProthesisPlacement: false, prothesisPlacementDate: null,
        providerSpecialityCode: ''
    });

    const [missingTeethPermenant, setMissingTeethPermenant] = useState([
        { value: false, toothNumber: "1", name: "1", toothType: 1 },
        { value: false, toothNumber: "2", name: "2", toothType: 1 },
        { value: false, toothNumber: "3", name: "3", toothType: 1 },
        { value: false, toothNumber: "4", name: "4", toothType: 1 },
        { value: false, toothNumber: "5", name: "5", toothType: 1 },
        { value: false, toothNumber: "6", name: "6", toothType: 1 },
        { value: false, toothNumber: "7", name: "7", toothType: 1 },
        { value: false, toothNumber: "8", name: "8", toothType: 1 },
        { value: false, toothNumber: "9", name: "9", toothType: 1 },
        { value: false, toothNumber: "10", name: "10", toothType: 1 },
        { value: false, toothNumber: "11", name: "11", toothType: 1 },
        { value: false, toothNumber: "12", name: "12", toothType: 1 },
        { value: false, toothNumber: "13", name: "13", toothType: 1 },
        { value: false, toothNumber: "14", name: "14", toothType: 1 },
        { value: false, toothNumber: "15", name: "15", toothType: 1 },
        { value: false, toothNumber: "16", name: "16", toothType: 1 },

        { value: false, toothNumber: "17", name: "17", toothType: 1 },
        { value: false, toothNumber: "18", name: "18", toothType: 1 },
        { value: false, toothNumber: "19", name: "19", toothType: 1 },
        { value: false, toothNumber: "20", name: "20", toothType: 1 },
        { value: false, toothNumber: "21", name: "21", toothType: 1 },
        { value: false, toothNumber: "22", name: "22", toothType: 1 },
        { value: false, toothNumber: "23", name: "23", toothType: 1 },
        { value: false, toothNumber: "24", name: "24", toothType: 1 },
        { value: false, toothNumber: "25", name: "25", toothType: 1 },
        { value: false, toothNumber: "26", name: "26", toothType: 1 },
        { value: false, toothNumber: "27", name: "27", toothType: 1 },
        { value: false, toothNumber: "28", name: "28", toothType: 1 },
        { value: false, toothNumber: "29", name: "29", toothType: 1 },
        { value: false, toothNumber: "30", name: "30", toothType: 1 },
        { value: false, toothNumber: "31", name: "31", toothType: 1 },
        { value: false, toothNumber: "32", name: "32", toothType: 1 },

    ])
    const [missingTeethPrimary, setMissingTeethPrimary] = useState([
        { value: false, toothNumber: "A", name: "A", toothType: 2 },
        { value: false, toothNumber: "B", name: "B", toothType: 2 },
        { value: false, toothNumber: "C", name: "C", toothType: 2 },
        { value: false, toothNumber: "D", name: "D", toothType: 2 },
        { value: false, toothNumber: "E", name: "E", toothType: 2 },
        { value: false, toothNumber: "F", name: "F", toothType: 2 },
        { value: false, toothNumber: "G", name: "G", toothType: 2 },
        { value: false, toothNumber: "H", name: "H", toothType: 2 },
        { value: false, toothNumber: "I", name: "I", toothType: 2 },
        { value: false, toothNumber: "J", name: "J", toothType: 2 },
        { value: false, toothNumber: "K", name: "K", toothType: 2 },
        { value: false, toothNumber: "L", name: "L", toothType: 2 },
        { value: false, toothNumber: "M", name: "M", toothType: 2 },
        { value: false, toothNumber: "N", name: "N", toothType: 2 },
        { value: false, toothNumber: "O", name: "O", toothType: 2 },
        { value: false, toothNumber: "P", name: "P", toothType: 2 },
        { value: false, toothNumber: "Q", name: "Q", toothType: 2 },
        { value: false, toothNumber: "R", name: "R", toothType: 2 },
        { value: false, toothNumber: "S", name: "S", toothType: 2 },
        { value: false, toothNumber: "T", name: "T", toothType: 2 },
    ])

    const defaultInstAttributes = {
        ClaimSuperbillInstId: 0,
        ClaimSuperbillId: props.claimId,
        StatementCoverFromDate: '',
        StatementCoverToDate: '',
        AdmissionDate: '',
        AdmissionTime: '',
        AdmissionType: '',
        AdmissionSource: '',
        DischargeHour: '',
        PatientStatusCode: '',
        DelayReasonCode: '',
        PpsDiagnosisGroup: '',
        ReleaseOfInformation: '',
        AssignmentOfBenefits: '',
        ProviderAcceptAssignment: '',
        EpsdtCertification: '',
        PrincipalDiagnosis: '',
        AdmittingDiagnosis: '',
        Poa: '',
        Remarks: '',
    };
    const [instState, setInstState] = useState(defaultInstAttributes);
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isLoading, setIsLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [errorMessages, setErrorMessages] = useState({
        errorBillingStatus: false, errorClaimType: false, errorIcdCode: false, errorFeeSchedule: false,
        errorPos: false, errorTos: false, errorToc: false, errorIsEmployment: false, errorisAutoAccident: false, errorOtherAccident: false, errorOrderingProvider: false,
        errorReferringProvider: false, errorBillingProfile: false, errorBillingProcedureLength: false, errorBillingDiagnosisLength: false, moveToElementId: ''
    });

    const [ndcCode, setNdcCode] = useState("");
    const [ndclistPopUp, setNdcListPopUp] = useState({
        superbillProcedureNdcId: 0, superbillProcedureId: 0, code: '', ndcCode: '', unitCode: '', quantity: '1',
        isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), ndcCodeName: ''
    });

    const procedureOptions = [

        {
            value: "RevenueCodes",
            label: "Revenue Codes",
            className: 'adjustLabels',
        },
        {
            value: "HCPCSCodes",
            label: "HCPCS Codes",
            className: 'adjustLabels',
        },
    ];

    const [claimTypesCode, setClaimTypesCode] = useState([]);
    const [billStatusCode, setBillStatusCode] = useState([]);
    const [delayReasonssCode, setDelayReasonssCode] = useState([]);
    const [onsetDateTypeCode, setOnsetDateTypeCode] = useState([]);
    const [onsetDateOtherCode, setOnsetDateOtherCode] = useState([]);
    const [providers, setProviders] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const [billingProfiles, setBillingProfiles] = useState([]);
    let totalPrice = 0.0, totalBilled = 0.0, totalPtPaid = 0.0, totalInsBalance = 0.0;
    const [proCodeForNdc, setProCodeForNdc] = useState(0);
    const [procedureIndex, setProcedureIndex] = useState(-1);
    const [arrayDiagnosisSerial, setArrayDiagnosisSerial] = useState([]);
    //
    const [isInsLoaded, setIsInsLoaded] = useState(false);

    const [externalModulesCall, setExternalModulesCall] = useState({ patientAppointmentId: 0, userLocationId: 0, patientName: "" });

    //State For Log Dialog
    const [logdialogstate, setLogDialogState] = useState(false);
    // to be removed

    // 
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const [encounterDetails, setEncounterDetails] = useState({
        patientId: 0, patientAppointmentId: 0, userLocationId: 0
    });
    const [addEobDialogOpenClose, setAddEobDialogOpenClose] = useState(false);
    const [appointmentDialogOpenClose, setAppointmentDialogOpenClose] = useState(false);
    const [encounterDialogOpenClose, setEncounterDialogOpenClose] = useState(false);
    const [claimCategoryDialogOpenClose, setClaimCategoryDialogOpenClose] = useState(false);
    const [feeScheduler, setFeeScheduler] = useState([]);
    const [arrfeeScheduler, setArrfeeScheduler] = useState([]);
    const [isAutoCreatedAppt, setIsAutoCreatedAppt] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [claimCategoryOptions] = useState([
        { value: "Professional", label: "Professional" },
        { value: "Institutional", label: "Institutional" },
        { value: "Dental", label: "Dental" },
    ]);
    const [patientAuthList, setPatientAuthList] = useState([]);

    const [selectedClaimCategory, setSelectedClaimCategory] = useState("");

    const [orthodonticsOptions] = useState([
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ])
    const [prothesisPlacementOptions] = useState([
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ])

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(claimID),
            area: "Claim",
            activity: "Load claim details",
            details: "User viewed claim details screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {

        setIsLoading(true);
        saveAuditLogInfo();
        initialization();
        loadPatientAuthorization();
        //loadPaymentDetailByAppointment();
        /*cleanValuesFields();*/
        if (/*callMethod != 'billing' && */claimID == 0) {
            setClaimCategoryDialogOpenClose(true);
        }

    }, []);

    const handleSelectFocus = (event) => event.target.select();

    const loadAppointmentDateAndNotes = () => {

        var params = {
            code: "get_appt_notes_date",
            parameters: [encID.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.length > 0) {
                    setState(prevState => ({
                        ...prevState,
                        appointmentNotes: result.data[0].text1,
                        appontmentDate: result.data[0].d1 != '0001-01-01T00:00:00' ? result.data[0].d1.split('T')[0] : null
                    }))
                }
            }
        })
    }
    const initialization = () => {

        let locationId = 0;
        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);
        if (primaryLocation[0]) locationId = primaryLocation[0].id;

        var params = {
            code: "providers_by_location",
            parameters: [locationId.toString(), ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setProviders(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })

        var params = {
            code: "get_billing_profiles",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setBillingProfiles(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        })

        params = {
            code: "get_encounter_items",
            parameters: [encID.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setEncounterDetails({
                    patientId: parseInt(result.data[0].text1),
                    patientAppointmentId: parseInt(result.data[0].text2),
                    userLocationId: parseInt(result.data[0].text3)
                });

                setIsAutoCreatedAppt(result.data[0].flag);
                loadPaymentDDL(parseInt(result.data[0].text2));
            }
        })

        var params = {
            code: "DDL_List_Item_Order",
            parameters: ['CLAIM_TYPES', 'BILL_STATUS', 'DELAY_REASON', 'ONSET_DATE_TYPE', 'OTHER_DATE']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                var _claimTypesCodes = [];
                var _BillStatusCodes = [];
                var _DelayReasonssCodes = [];
                var _ClaimTypesDefaultCodes = [];
                var _OnsetDateTypeCodes = [];
                var _OnsetDateOtherCodes = [];
                let _claimStatusType = "";

                result.data.map((item, i) => {

                    if (item.text3.trim() == 'CLAIM_TYPES')
                        _claimTypesCodes.push({ value: item.text1, label: item.text2 });
                    if (item.text3.trim() == 'BILL_STATUS')
                        _BillStatusCodes.push({ value: item.text1, label: item.text2 });
                    if (item.text3.trim() == 'DELAY_REASON')
                        _DelayReasonssCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3.trim() == 'ONSET_DATE_TYPE')
                        _OnsetDateTypeCodes.push({ value: item.text1, label: item.text2 });

                    if (item.text3.trim() == 'OTHER_DATE')
                        _OnsetDateTypeCodes.push({ value: item.text1, label: item.text2 });


                });

                setClaimTypesCode(_claimTypesCodes);
                setBillStatusCode(_BillStatusCodes);
                setDelayReasonssCode(_DelayReasonssCodes);
                setOnsetDateTypeCode(_OnsetDateTypeCodes);
                setOnsetDateOtherCode(_OnsetDateTypeCodes);

            }
        })

        params = {
            code: "get_active_fee_schedules",
            parameters: [encID.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setFeeScheduler(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1, feeSourceCode: item.text2 };
                    }));
            }
        })

        var params = {
            code: "load_specialization",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setSpecialityList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })

        if (!claimID || claimID == '0')
            loadDiagnosisByEncounter();
    }
    const loadDiagnosisByEncounter = () => {

        PostDataAPI('claim/getDiagnosisByEncounter', encID).then((result) => {
            if (result.success && result.data != null) {
                setState(prevState => ({
                    ...prevState,
                    lstsuperBillDiagnosis: result.data
                }));
                var dxSerial = [];
                if (result.data) {
                    result.data.map((itm, i) => {
                        dxSerial.push(i + 1);
                    })
                }

                setArrayDiagnosisSerial(dxSerial);
                //SH>We need to update dx pointer in procedures, so calling loadprocedure in load Diagnosis success.
                //setTimeout(() => {

                state.lstsuperBillDiagnosis = result.data;
                loadProceduresByEncounter(dxSerial.length, result.data);
                //}, 500);

            }
        })

    }
    const loadProceduresByEncounter = (diagnosisCount, lstsuperBillDiagnosis) => {

        PostDataAPI('claim/getProceduresByEncounter', encID).then((result) => {
            if (result.success && result.data != null) {
                //update procedure dx pointerde
                let lstProc = result.data;
                lstProc = lstProc.map(item => {
                    updateProcedureDXPointer(item, diagnosisCount);
                    item.serviceDateFrom = todayDate();
                    item.serviceDateTo = todayDate();
                    item.unit = 1;
                    return { ...item };
                });

                state.lstsuperBillProcedures = lstProc;

                setState(prevState => ({
                    ...prevState,
                    lstsuperBillDiagnosis: lstsuperBillDiagnosis,
                    lstsuperBillProcedures: lstProc
                }));
            }
        })

    }
    const loadPaymentDDL = (apptId) => {
        var appointmentId = encounterDetails.patientAppointmentId > 0 ? encounterDetails.patientAppointmentId : apptId;
        if (appointmentId > 0) {
            var params = {
                code: "get_payment_details_by_appointment",
                parameters: [appointmentId.toString()]
            };

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {

                    setPaymentOptions(
                        result.data.map((item, i) => {

                            if (item.amount == '0')
                                return { value: item.id2, label: item.text1 + ' ($0.00) ', claimId: item.id, paymentAppointmentId: appointmentId };
                            else
                                return { value: item.id, label: item.amount ? item.text1 + ' ($' + numberFormat(item.amount) + ' ) ' : item.text1, claimId: item.id, paymentAppointmentId: appointmentId };
                        }));
                }
            })
        }
    }
    const loadPatientAuthorization = () => {
        //var response = await APICall('POST', 'patient/insurance/authorization/loadAuthorizationByPatient', data);
        PostDataAPI("patient/insurance/authorization/loadAuthorizationByPatient", patID).then((result) => {
            if (result.success && result.data != null) {
                setPatientAuthList(result.data);
                cleanValuesFields(false, result.data);
            }
            setIsLoading(false);
        })
    }

    const loadClaimSuper = (claimSuperbillId, isFromResetBtn) => {

        PostDataAPI('claim/getClaimSuperBillById', claimSuperbillId).then((result) => {
            if (result.success && result.data != null) {

                setSelectedClaimCategory(result.data.claimCategory ? result.data.claimCategory : "Professional");
                result.data = handleFormat(result.data);
                result.data.useDescriptionFrom = "HCPCSCodes";
                if (result.data.claimCategory == 'Dental' && result.data.lstMissingTeath) {
                    //Permanent
                    var lstTempMissingTeethPermenant = missingTeethPermenant;
                    result.data.lstMissingTeath.map(m => {
                        lstTempMissingTeethPermenant = lstTempMissingTeethPermenant.map(item => m.toothType == 1 && m.toothNumber == item.toothNumber ? { ...item, value: true } : item);
                    });
                    setMissingTeethPermenant(lstTempMissingTeethPermenant);
                    //Primary
                    var lstTempMissingTeethPrimary = missingTeethPrimary;
                    result.data.lstMissingTeath.map(m => {
                        lstTempMissingTeethPrimary = lstTempMissingTeethPrimary.map(item => m.toothType == 2 && m.toothNumber == item.toothNumber ? { ...item, value: true } : item);
                    });
                    setMissingTeethPrimary(lstTempMissingTeethPrimary);
                }
                setState(result.data);
                loadPaymentDDL();
                if (result.data.feeScheduleCode) {
                    setTimeout(() => {
                        handleFeeScheduleSelection(result.data.feeScheduleCode)
                    }, 500)
                }
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);
        })

    }

    const loadInstClaimData = (encID) => {

        PostDataAPI('claim/getClaimSuperBillInst', encID).then((result) => {
            if (result.success && result.data != null) {
                //result.data = handleFormat(result.data);
                setInstState(result.data);
                setIsInsLoaded(true);
                setTimeout(() => {
                    setTabValue(1);
                }, 500);
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);

        })

    }

    const handleFormat = (dataSet) => {

        dataSet.acuteManifestDate = dataSet.acuteManifestDate ? dataSet.acuteManifestDate.split("T")[0] : '';
        dataSet.onsetDate = dataSet.onsetDate ? dataSet.onsetDate.split("T")[0] : '';
        dataSet.otherDate = dataSet.otherDate ? dataSet.otherDate.split("T")[0] : '';
        dataSet.orthoApplianceDate = dataSet.orthoApplianceDate ? dataSet.orthoApplianceDate.split("T")[0] : null;
        dataSet.prothesisPlacementDate = dataSet.prothesisPlacementDate ? dataSet.prothesisPlacementDate.split("T")[0] : null;
        dataSet.patientPaid = dataSet.otherDate

        if (dataSet.lstsuperBillProcedures) {

            if (dataSet.lstsuperBillProcedures.length > 0) {

                dataSet.lstsuperBillProcedures.map((item, i) => {

                    item.serviceDateFrom = item.serviceDateFrom == null ? dataSet.appointmentDate.split("T")[0] : item.serviceDateFrom.split("T")[0];
                    item.serviceDateTo = item.serviceDateTo == null ? dataSet.appointmentDate.split("T")[0] : item.serviceDateTo.split("T")[0];

                });
            }
        }

        var dxSerial = [];
        if (dataSet.lstsuperBillDiagnosis) {
            dataSet.lstsuperBillDiagnosis.filter(tmprm => tmprm.isDeleted != true).map((itm, i) => {
                dxSerial.push(i + 1);
            })
        }
        setArrayDiagnosisSerial(dxSerial);

        return dataSet;
    }

    const handleChangeNumber = (e) => {
        const { name, value } = e.target;

        if (value.length === 3) {
            return
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'billingProfileId' && value != '') {
            if (state.lstsuperBillDiagnosis && state.lstsuperBillDiagnosis.length > 0 ||
                state.lstsuperBillProcedures && state.lstsuperBillProcedures.length > 0) {
                ShowActionDialog(true, "Delete", "This action will replace already selected Procedure/Diagnosis, Are you sure you want to continue ?", "confirm", function () {
                    loadBillingProfile(value);
                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                });
            }
            else {
                loadBillingProfile(value);
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }))
            }
        }
        else if (name == 'feeScheduleCode') {
            handleFeeScheduleSelection(value);
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
        else if (name == 'paymentOption') {
            var _selectedRow = paymentOptions.filter(optsPayments => optsPayments.value == value);
            if (_selectedRow && _selectedRow.length > 0) {
                var _selectedBatchId = _selectedRow[0].value;
                var _paymentAppointmentId = _selectedRow[0].paymentAppointmentId;
                setState(prevState => ({
                    ...prevState,
                    [name]: _selectedBatchId,
                    ['paymentAppointmentId']: _paymentAppointmentId
                }));
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    [name]: 0,
                    ['paymentAppointmentId']: 0
                }));
            }

        }
        else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
        if (name == 'claimTypeCode' && value != 'RE_SUBMISSION' && value != 'VOID_CLAIM') {
            setState(prevState => ({
                ...prevState,
                icnNo: ''
            }))
        }
    }

    const handleFeeScheduleSelection = (id) => {
        var params = {
            code: "get_selected_fee_schedule",
            parameters: [id.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                var lstFeeSch = [];
                result.data.map((item, i) => {
                    lstFeeSch.push({
                        facilityPrice: item.amount, procedureCode: item.text1,
                        procedureDescription: item.text2, feeSourceCode: item.text4, m1: item.text5
                    });
                })
                setArrfeeScheduler(lstFeeSch);
                updatePricesByFeeSCheduler(lstFeeSch);
            }
        })

    }

    const updatePricesByFeeSCheduler = (updatedFeeSchedule) => {
        var _proceduresArray = [];
        if (state.lstsuperBillProcedures && state.lstsuperBillProcedures.length > 0) {
            state.lstsuperBillProcedures.map((item, i) => {

                let procObj = searchFeeScheduleCode(item.code, item.m1, updatedFeeSchedule ? updatedFeeSchedule : arrfeeScheduler);
                let _billedAmount = 0.0;
                let _price = 0;
                if (procObj != undefined) {
                    _billedAmount = parseFloat(isNaN(item.unit) ? 0 : item.unit) * parseFloat(isNaN(procObj.facilityPrice) ? 0 : procObj.facilityPrice);
                    _price = procObj.facilityPrice;
                }
                _proceduresArray.push({
                    superbillProcedureId: item.superbillProcedureId, claimSuperbillId: item.claimSuperbillId, code: item.code, revCode: item.revCode, revCodeName: item.revCodeName,
                    description: item.description, m1: item.m1, m2: item.m2, m3: item.m3, m4: item.m4, serviceDateFrom: item.serviceDateFrom,
                    serviceDateTo: item.serviceDateTo, ndcCode: item.ndcCode, dxPointer1: item.dxPointer1, dxPointer2: item.dxPointer2,
                    dxPointer3: item.dxPointer3, dxPointer4: item.dxPointer4, unit: isNaN(item.unit) ? 0 : item.unit, price: _price, billed: _billedAmount,
                    patientPaid: item.patientPaid, insBalance: item.insBalance, statusCode: item.statusCode, isDeleted: item.isDeleted,
                    createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate
                });

            });

            setState(prevState => ({
                ...prevState,
                lstsuperBillProcedures: _proceduresArray
            }));
        }

    }
    function searchFeeScheduleCode(code, m1, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            var feeSchM1 = myArray[i].m1 ? myArray[i].m1 : "";
            if (myArray[i].procedureCode === code && feeSchM1 === m1) {
                return myArray[i];
            }
        }
    }
    const loadBillingProfile = (dataId) => {

        PostDataAPI("billing/profile/get", dataId).then((result) => {

            if (result.success && result.data != null) {

                var _diagnosisArray = [];
                var _proceduresArray = [];
                var _ndcStateArray = [];
                var dxSerial = [];


                if (parseInt(claimID) > 0)
                    removeExistingRecord(result.data.icdList, result.data.cptList);
                else {
                    state.lstsuperBillDiagnosis = [];
                    state.lstsuperBillProcedures = [];
                    state.lstsuperbillProcedureNdc = [];

                    if (result.data.icdList) {
                        result.data.icdList.map((item, i) => {

                            _diagnosisArray.push({
                                superbillDiagnosisId: 0, claimSuperbillId: 0, icdCode: item.icdCode, description: item.description,
                                ndcCode: item.ndcCode, isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), serialNumber: i + 1
                            });

                            dxSerial.push(i + 1);

                        });

                        setArrayDiagnosisSerial(dxSerial);
                    }

                    if (result.data.cptList) {
                        result.data.cptList.map((itm, i) => {

                            _proceduresArray.push({
                                superbillProcedureId: 0, claimSuperbillId: 0, code: itm.cptCode, description: itm.cptName,
                                m1: itm.modifier1, m2: itm.modifier2, m3: itm.modifier3, m4: itm.modifier4, serviceDateFrom: state.appontmentDate,
                                serviceDateTo: state.appontmentDate, ndcCode: itm.ndcList[0] ? itm.ndcList[0].ndcCode : itm.ndcCode, dxPointer1: itm.icdPtrs1, dxPointer2: itm.icdPtrs2,
                                dxPointer3: itm.icdPtrs3, dxPointer4: itm.icdPtrs4, unit: itm.quantity, price: itm.price, eobClaimId: 0,
                                billed: parseFloat(isNaN(itm.quantity) ? 0 : itm.quantity) * parseFloat(isNaN(itm.price) ? 0 : itm.price),
                                patientPaid: 0, insBalance: 0, statusCode: '', isDeleted: false, createdBy: 0,
                                updatedBy: 0, createDate: new Date()
                            });

                            if (itm.ndcList.length > 0) {
                                var ndcObj = itm.ndcList[0];

                                _ndcStateArray.push({
                                    superbillProcedureNdcId: 0, superbillProcedureId: ndcObj.billingProfileCptNdcId ? ndcObj.billingProfileCptNdcId : 0, ndcCode: ndcObj.ndcCode, code: itm.cptCode,
                                    unitCode: ndcObj.unitCode, quantity: ndcObj.quantity, isDeleted: ndcObj.isDeleted, createdBy: ndcObj.createdBy, updatedBy: ndcObj.updatedBy,
                                    createDate: ndcObj.createDate ? ndcObj.createDate : new Date(), updateDate: ndcObj.updateDate, ndcCodeName: ndcObj.ndcCodeName
                                });

                            }

                        });
                    }


                    setState(prevState => ({
                        ...prevState,
                        lstsuperBillDiagnosis: _diagnosisArray,
                        lstsuperBillProcedures: _proceduresArray,
                        lstsuperbillProcedureNdc: _ndcStateArray

                    }));
                }
            }
        })
    }

    const removeExistingRecord = (icdList, cptList) => {

        var _diagArray = [];
        var _procArray = [];
        var _ndcArray = [];
        var dxSerial = [];

        if (state.lstsuperBillDiagnosis) {
            state.lstsuperBillDiagnosis.map((diagItem, i) => {
                if (diagItem.superbillDiagnosisId > 0) {
                    _diagArray.push({
                        superbillDiagnosisId: diagItem.superbillDiagnosisId, claimSuperbillId: diagItem.claimSuperbillId, icdCode: diagItem.icdCode,
                        description: diagItem.description, isDeleted: true, createdBy: diagItem.createdBy, updatedBy: diagItem.updatedBy,
                        createDate: diagItem.createDate ? diagItem.createDate : new Date(), updateDate: diagItem.updateDate, serialNumber: diagItem.serialNumber
                    });
                }
                else
                    state.lstsuperBillDiagnosis.splice(i, 1);
            })
        }

        if (state.lstsuperBillProcedures) {
            state.lstsuperBillProcedures.map((procItem, k) => {
                if (procItem.superbillProcedureId > 0) {
                    _procArray.push({
                        superbillProcedureId: procItem.superbillProcedureId, claimSuperbillId: procItem.claimSuperbillId, code: procItem.code,
                        description: procItem.description, m1: procItem.m1, m2: procItem.m2, m3: procItem.m3, m4: procItem.m4, serviceDateFrom: procItem.serviceDateFrom,
                        serviceDateTo: procItem.serviceDateTo, ndcCode: procItem.ndcCode, dxPointer1: procItem.dxPointer1, dxPointer2: procItem.dxPointer2,
                        dxPointer3: procItem.dxPointer3, dxPointer4: procItem.dxPointer4, unit: isNaN(procItem.unit) ? 0 : procItem.unit, price: procItem.price, billed: procItem.billed,
                        patientPaid: procItem.patientPaid, insBalance: procItem.insBalance, statusCode: procItem.statusCode, isDeleted: true, eobClaimId: procItem.eobClaimId ? procItem.eobClaimId : 0,
                        createdBy: procItem.createdBy, updatedBy: procItem.updatedBy, createDate: procItem.createDate ? procItem.createDate : new Date(), updateDate: procItem.updateDate
                    });
                }
                else
                    state.lstsuperBillProcedures.splice(k, 1);
            })
        }

        if (state.lstsuperbillProcedureNdc) {
            state.lstsuperbillProcedureNdc.map((ndcItem, j) => {
                if (ndcItem.superbillProcedureId > 0) {
                    _ndcArray.push({
                        superbillProcedureNdcId: ndcItem.superbillProcedureNdcId, superbillProcedureId: ndcItem.superbillProcedureId, ndcCode: ndcItem.ndcCode,
                        code: ndcItem.code, unitCode: ndcItem.unitCode, quantity: ndcItem.quantity, isDeleted: true, createdBy: ndcItem.createdBy,
                        createDate: ndcItem.createDate ? ndcItem.createDate : new Date(), updatedBy: ndcItem.updatedBy, ndcCodeName: ndcItem.ndcCodeName
                    });
                }
                else
                    state.lstsuperbillProcedureNdc.splice(j, 1);
            })
        }

        if (icdList) {
            icdList.map((item, i) => {

                _diagArray.push({
                    superbillDiagnosisId: 0, claimSuperbillId: 0, icdCode: item.icdCode, description: item.description,
                    ndcCode: item.ndcCode, isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), serialNumber: i + 1
                });

                dxSerial.push(i + 1);

            });

            setArrayDiagnosisSerial(dxSerial);
        }

        if (cptList) {
            cptList.map((itm, i) => {
                var apptDate = state.appointmentDate ? state.appointmentDate.split('T')[0] : null;
                _procArray.push({
                    superbillProcedureId: 0, claimSuperbillId: 0, code: itm.cptCode, description: itm.cptName,
                    m1: itm.modifier1, m2: itm.modifier2, m3: itm.modifier3, m4: itm.modifier4, serviceDateFrom: apptDate,
                    serviceDateTo: apptDate, ndcCode: itm.ndcList[0] ? itm.ndcList[0].ndcCode : itm.ndcCode, dxPointer1: itm.icdPtrs1, dxPointer2: itm.icdPtrs2,
                    dxPointer3: itm.icdPtrs3, dxPointer4: itm.icdPtrs4, unit: itm.quantity, price: itm.price, eobClaimId: itm.eobClaimId ? itm.eobClaimId : 0,
                    billed: parseFloat(isNaN(itm.quantity) ? 0 : itm.quantity) * parseFloat(isNaN(itm.price) ? 0 : itm.price),
                    patientPaid: 0, insBalance: 0, statusCode: '', isDeleted: false, createdBy: 0,
                    updatedBy: 0, createDate: new Date()
                });

                if (itm.ndcList.length > 0) {
                    var ndcObj = itm.ndcList[0];

                    _ndcArray.push({
                        superbillProcedureNdcId: 0, superbillProcedureId: ndcObj.superbillProcedureNdcId, ndcCode: ndcObj.ndcCode, code: itm.cptCode,
                        unitCode: ndcObj.unitCode, quantity: ndcObj.quantity, isDeleted: ndcObj.isDeleted, createdBy: ndcObj.createdBy, updatedBy: ndcObj.updatedBy,
                        createDate: ndcObj.createDate ? ndcObj.createDate : new Date(), updateDate: ndcObj.updateDate, ndcCodeName: ndcObj.ndcCodeName
                    });

                }

            });
        }

        setState(prevState => ({
            ...prevState,
            lstsuperBillDiagnosis: _diagArray,
            lstsuperBillProcedures: _procArray,
            lstsuperbillProcedureNdc: _ndcArray

        }));

    }
    const validateToothSurface = (value) => {
        let isValid = true;
        if (value) {
            const tSArr = value.split(',').filter(elem => elem);//filter to remove empty entries
            const validToothSurface = ['B', 'D', 'F', 'I', 'L', 'M', 'O'];
            if (!tSArr.every(t => validToothSurface.includes(t))) {
                isValid = false;
            }

        }
        return isValid;
    }
    const handleChangeDynamic = (e) => {

        const { id, name, value } = e.target;
        if (name == 'toothSurfaceCode' && !validateToothSurface(value)) {
            showMessage("Error", "Tooth surface may contain only B,D,F,I,L,M,O values.", "error", 8000);
            return;
        }

        if (name === 'unit' || name === 'price') {
            if (value.length <= 12) {
                state.lstsuperBillProcedures[id][name] = value;
                // state.lstsuperBillProcedures[id][name] = parseFloat(value);
                state.lstsuperBillProcedures[id]["billed"] = parseFloat(parseFloat(isNaN(state.lstsuperBillProcedures[id]["price"]) ? 0 : state.lstsuperBillProcedures[id]["price"]) * parseFloat(isNaN(value) ? 0 : value)).toFixed(2);

                if (state.lstsuperBillProcedures) {

                    state.lstsuperBillProcedures.filter(tmprm => tmprm.isDeleted != true).map((item, i) => {

                        item.billed = parseFloat(isNaN(item.price) ? 0 : item.price) * parseFloat(isNaN(item.unit) ? 0 : item.unit).toFixed(2);
                        item.billed = parseFloat(isNaN(item.billed) ? 0 : item.billed.toFixed(2));
                    });
                }
            } else {
                e.preventDefault();
            }

        }
        else if (name === 'dxPointer1' || name === 'dxPointer2' || name === 'dxPointer3' || name === 'dxPointer4') {

            if (value != '') {

                if (search(parseInt(value), arrayDiagnosisSerial) != undefined) {
                    let dx1 = parseInt(state.lstsuperBillProcedures[id]['dxPointer1'] == null ? 0 : state.lstsuperBillProcedures[id]['dxPointer1'])
                    let dx2 = parseInt(state.lstsuperBillProcedures[id]['dxPointer2'] == null ? 0 : state.lstsuperBillProcedures[id]['dxPointer2'])
                    let dx3 = parseInt(state.lstsuperBillProcedures[id]['dxPointer3'] == null ? 0 : state.lstsuperBillProcedures[id]['dxPointer3'])
                    let dx4 = parseInt(state.lstsuperBillProcedures[id]['dxPointer4'] == null ? 0 : state.lstsuperBillProcedures[id]['dxPointer4'])
                    dx1 = isNaN(dx1) ? 0 : dx1;
                    dx2 = isNaN(dx2) ? 0 : dx2;
                    dx3 = isNaN(dx3) ? 0 : dx3;
                    dx4 = isNaN(dx4) ? 0 : dx4;
                    let decision = parseInt(value);

                    switch (name) {
                        case 'dxPointer1':
                            if (dx2 === decision || dx3 === decision || dx4 === decision) {
                                state.lstsuperBillProcedures[id][name] = '';
                                showMessage("Error", "Serial# already used.", "error", 8000);
                            }
                            else
                                state.lstsuperBillProcedures[id][name] = value;
                            break;
                        case 'dxPointer2':
                            if (dx1 === '' || dx1 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                state.lstsuperBillProcedures[id][name] = '';
                                break;
                            }
                            if (dx1 === decision || dx3 === decision || dx4 === decision) {
                                state.lstsuperBillProcedures[id][name] = '';
                                showMessage("Error", "Serial# already used.", "error", 8000);
                            }
                            else
                                state.lstsuperBillProcedures[id][name] = value;
                            break;
                        case 'dxPointer3':
                            if (dx1 === '' || dx1 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                state.lstsuperBillProcedures[id][name] = '';
                                break;
                            }
                            else if (dx2 === '' || dx2 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                break;
                            }
                            if (dx1 === decision || dx2 === decision || dx4 === decision) {
                                state.lstsuperBillProcedures[id][name] = '';
                                showMessage("Error", "Serial# already used.", "error", 8000);
                            }
                            else
                                state.lstsuperBillProcedures[id][name] = value;
                            break;
                        case 'dxPointer4':
                            if (dx1 === '' || dx1 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                break;
                            }
                            else if (dx2 === '' || dx2 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                break;
                            }
                            else if (dx3 === '' || dx3 === 0) {
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                                break;
                            }
                            if (dx1 === decision || dx2 === decision || dx3 === decision) {
                                state.lstsuperBillProcedures[id][name] = '';
                                showMessage("Error", "Fill ICD-10 Dx Ptrs left to right.", "error", 8000);
                            }
                            else
                                state.lstsuperBillProcedures[id][name] = value;
                            break;
                        default:
                            state.lstsuperBillProcedures[id][name] = value;
                    }

                }
                else {
                    state.lstsuperBillProcedures[id][name] = '';
                    showMessage("Error", "Serial# does not exist.", "error", 8000);
                }
            }
            else
                state.lstsuperBillProcedures[id][name] = value

        }
        else
            state.lstsuperBillProcedures[id][name] = value


        setTimeout(() => {

            setState(prevState => ({
                ...prevState,
                lstsuperBillProcedures: state.lstsuperBillProcedures
            }))

        }, 100)


    }

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i] === nameKey) {
                return myArray[i];
            }
        }
    }

    const handleCheckedChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }
    const handleSearcdhListChange = (name, item) => {
        let { id, value } = item;

        if (value.indexOf('-') > 0 && value.split('- ').length > 1) {
            value = value.split('- ')[1];
        }
        setState(prevState => ({
            ...prevState,
            pos: id,
            posName: value
        }));

    }
    const handleProviderSpecialityChange = (name, item) => {
        let { id, value } = item;
        //if (value.indexOf('-') > 0 && value.split('- ').length > 1) {
        //    value = value.split('- ')[1];
        //}
        setState(prevState => ({
            ...prevState,
            providerSpecialityCode: id,
            providerSpecialityName: value
        }));

    }
    const handleTOSListChange = (name, item) => {
        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            tos: id,
            tosName: value
        }));

    }
    const handleTOC1ListChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            tocCode1: id,
            tocName1: value,
            tocCode2: '',
            tocName2: '',
        }));

    }
    const handleTOC2ListChange = (name, item) => {
        const { id, value } = item;
        setState(prevState => ({
            ...prevState,
            tocCode2: id,
            tocName2: value
        }));

    }
    const handleModifiersChange = (name, item, row) => {

        const { id, value } = item;
        let selectedId = id;
        if (name == 'revCode' && id === 0) {
            selectedId = '';
        }

        state.lstsuperBillProcedures[row][name] = selectedId
        // state.lstsuperBillProcedures[row]["m1Name"] = value
        state.lstsuperBillProcedures[row][name.trim() + "Name"] = value

        setState(prevState => ({
            ...prevState,
            lstsuperBillProcedures: state.lstsuperBillProcedures
        }))
        setTimeout(() => { updatePricesByFeeSCheduler(); }, 500);
    }

    const handleSearchDiagnosisChange = (name, item) => {

        const { id, value } = item;
        ;
        setState(prevState => ({
            ...prevState,
            icdCode: id,
            icdName: value
        }));

        var _diagnosisArray = [];

        if (state.lstsuperBillDiagnosis.filter(tmprm => tmprm.icdCode === id) == "") {

            if (state.lstsuperBillDiagnosis) {
                if (state.lstsuperBillDiagnosis.length > 0) {

                    state.lstsuperBillDiagnosis.map((item, i) => {

                        _diagnosisArray.push({
                            superbillDiagnosisId: item.superbillDiagnosisId, claimSuperbillId: item.claimSuperbillId, icdCode: item.icdCode,
                            description: item.description, isDeleted: item.isDeleted, createdBy: item.createdBy, updatedBy: item.updatedBy,
                            createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate, serialNumber: item.serialNumber
                        });
                    });
                }
            }

            _diagnosisArray.push({
                superbillDiagnosisId: 0, claimSuperbillId: 0, icdCode: id, description: value,
                isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date(), serialNumber: _diagnosisArray.length + 1
            });

            setTimeout(() => {

                setState(prevState => ({
                    ...prevState,
                    lstsuperBillDiagnosis: _diagnosisArray,
                    icdCode: '',
                    icdName: ''
                }));

            }, 100)

        }
        else {

            showMessage("Error", "Diagnose already exists.", "error", 8000);
            setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    icdCode: '',
                    icdName: ''
                }));

            }, 100)
        }
    }

    const deleteRowDiagnosis = (diagnoseCode, description) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the diagnosis?", "confirm", function () {
            var _proceduresArray = [];
            var _diagnosisArray = [];
            state.lstsuperBillDiagnosis.map((item, i) => {

                if (item.icdCode === diagnoseCode && item.description === description) {
                    item.isDeleted = true;
                }
                _diagnosisArray.push(item);
            });

            var dxSerial = [];
            _diagnosisArray.filter(tmprm => tmprm.isDeleted != true).map((itm, i) => {
                if (itm.isDeleted != true)
                    if (itm.serialNumber > 0)
                        itm.serialNumber = i + 1;
                dxSerial.push(i + 1);
            })
            setArrayDiagnosisSerial(dxSerial);

            setState(prevState => ({
                ...prevState,
                lstsuperBillDiagnosis: _diagnosisArray

            }));
            //update procedure dx pointer
            let lstProc = state.lstsuperBillProcedures;
            lstProc = lstProc.map(item => {
                //if (!item.superbillProcedureId > 0) {
                updateProcedureDXPointer(item, dxSerial.length);
                //}
                return { ...item };
            });
            setState(prevState => ({
                ...prevState,
                lstsuperBillProcedures: lstProc
            }));
        })
    }

    const deleteRowProcedure = (_code, _description, _paymentId, _superbillProcedureId) => {

        if (_superbillProcedureId > 0) {
            var params = {
                code: "get_payment_proc",
                parameters: [_code.toString(), state.claimSuperBillId.toString()]
            };

            PostDataAPI("ddl/loadItems", params).then((result) => {

                if (result.success && result.data != null) {

                    if (result.data.length > 0)
                        showMessage("Error", "This procedure cannot deleted, payment is already added aginst it.", "error", 3000);
                    else {
                        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Procedure?", "confirm", function () {

                            let procCode = '';
                            let procDesc = '';

                            procCode = _code;
                            procDesc = _description;
                            let decision = true;
                            state.lstsuperBillProcedures.filter(tmprm => tmprm.isDeleted != true).map((item, i) => {

                                if (item.code === procCode && item.description === procDesc) {
                                    if (decision) {
                                        /* if (item.superbillProcedureId > 0)*/
                                        item.isDeleted = true;
                                        //else
                                        //    state.lstsuperBillProcedures.splice(i, 1);
                                        decision = false;

                                    }

                                }
                            });

                            setState(prevState => ({
                                ...prevState,
                                lstsuperBillProcedures: state.lstsuperBillProcedures
                            }));

                        });
                    }
                }
            })
        }

        else if (_paymentId == 0 || _superbillProcedureId == 0) {
            ShowActionDialog(true, "Delete", "Are you sure, you want to delete the Procedure?", "confirm", function () {

                let procCode = '';
                let procDesc = '';

                procCode = _code;
                procDesc = _description;
                let decision = true;
                state.lstsuperBillProcedures.map((item, j) => {

                    if (item.code === procCode && item.description === procDesc) {
                        if (item.isDeleted != true)
                            state.lstsuperBillProcedures.splice(j, 1);
                    }
                });

                setState(prevState => ({
                    ...prevState,
                    lstsuperBillProcedures: state.lstsuperBillProcedures
                }));

            });
        }
        //else
        //    showMessage("Error", "This procedure cannot deleted, payment is already added aginst it.", "error", 3000);
    }

    const addNoteDialogClose = () => {
        setAddNoteDialog(false)
    }
    const addNdcCodeDialogClose = () => {
        setShowHideNdcCodeDialog(false)
    }

    const addShowAddPaymentDialogClose = () => {
        setShowAddPaymentDialog(false);
        loadPaymentDDL();
    }
    const saveBothTabs = (infoTabData) => {
        setTabValue(0);
        setInstState(infoTabData);
        Save(null, infoTabData);
    }

    const ValidateClaim = (errorList) => {

        if (state.billingStatusCode == "" || state.billingStatusCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingStatus: true
            }));
            //if (billingStatusRef && billingStatusRef.current)
            //    billingStatusRef.current.focus();
            setMoveToElementId('billingStatusCode');
            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingStatus: false
            }));
        }

        if (state.claimTypeCode == "" || state.claimTypeCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorClaimType: true
            }));
            //if (claimTypeRef && claimTypeRef.current)
            //    claimTypeRef.current.focus()
            errorList.push(true);
            setMoveToElementId('claimTypeCode');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorClaimType: false
            }));
        }

        if ((state.claimTypeCode == "RE_SUBMISSION" || state.claimTypeCode == "VOID_CLAIM") && (!state.icnNo || state.icnNo == '')) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorICN: true
            }));
            //if (icnNoRef && icnNoRef.current)
            //    icnNoRef.current.focus();

            errorList.push(true);
            setMoveToElementId('icnNo');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorICN: false
            }));
        }

        if (state.icdVersionCode == "" || state.icdVersionCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorIcdCode: true
            }));
            //if (icdVersionRef && icdVersionRef.current)
            //   icdVersionRef.current.focus();
            errorList.push(true);
            setMoveToElementId('icdVersionCode');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIcdCode: false
            }));
        }

        if (state.claimCategory != 'Institutional' && (!state.pos || state.pos == "")) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPos: true
            }));
            //posRef.current.focus();
            errorList.push(true);
            setMoveToElementId('posError');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPos: false
            }));
            //window.scrollTo(0, 0);
        }

        if (state.claimCategory == 'Professional' && (state.tos == "" || state.tos == undefined)) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorTos: true
            }));
            // tosRef.current.focus();
            errorList.push(true);
            setMoveToElementId('tosError');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTos: false
            }));
        }

        if (state.feeScheduleCode == "" || state.feeScheduleCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSchedule: true
            }));
            //if (feeScheduleRef && feeScheduleRef.current)
            //    feeScheduleRef.current.focus();
            errorList.push(true);
            setMoveToElementId('feeScheduleCode');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSchedule: false
            }));
        }

        if (state.orderingProviderId == "" || state.orderingProviderId == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorOrderingProvider: true
            }));
            //if (orderingProviderRef && orderingProviderRef.current)
            //   orderingProviderRef.current.focus();
            errorList.push(true);
            setMoveToElementId('orderingProviderId');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOrderingProvider: false
            }));
        }

        if (state.lstsuperBillDiagnosis) {

            if (state.lstsuperBillDiagnosis == null || state.lstsuperBillDiagnosis.filter(tmprm => tmprm.isDeleted != true).length === 0) {

                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingDiagnosisLength: true
                }));
                // window.scrollTo(0, document.body.scrollHeight);
                errorList.push(true);
                setMoveToElementId('addDiagnosis');

            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingDiagnosisLength: false
                }));
            }
        }
        else {
            state.lstsuperBillDiagnosis = [];
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingDiagnosisLength: true
            }));
            //window.scrollTo(0, document.body.scrollHeight);
            errorList.push(true);
            setMoveToElementId('addDiagnosis');
        }

        if (state.lstsuperBillProcedures == null || state.lstsuperBillProcedures.filter(tmprm => tmprm.isDeleted != true).length === 0) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingProcedureLength: true
            }));
            //window.scrollTo(0, document.body.scrollHeight);
            errorList.push(true);
            setMoveToElementId('addProcedures');

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingProcedureLength: false
            }));
        }



        if (state.claimCategory == 'Institutional' && (state.tocCode1 == "" || !state.tocCode1 || state.tocCode2 == "" || !state.tocCode2)) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorToc: true
            }));
            // tocRef.current.focus();
            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorToc: false
            }));
        }



    }

    const Save = (e, infoTabData) => {
        let errorList = [];
        ValidateClaim(errorList);
        const element = document.getElementById(errorMessages.moveToElementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            element.focus();
        }
        if (errorList.length < 1) {
            if (infoTabData && infoTabData.admissionType)
                state.infoTabData = infoTabData;
            else if (instState && instState.admissionType)
                state.infoTabData = instState;
            let method = "claim/addClaimSuperBill";
            if (claimID > 0) {
                method = "claim/updateClaimSuperBill";
            }
            var objPatientAuth = patientAuthList.filter(t => new Date() >= new Date(t.startDate) &&
                new Date() <= new Date(t.endDate));
            if (claimID == 0 && objPatientAuth && objPatientAuth.length > 0 && state.authorizationNumber == objPatientAuth[0].authorizationNo && objPatientAuth[0].encounterCount >= objPatientAuth[0].approvedVisits) {
                showMessage("Error", "Authorization number has been reached to its max limit, please try another.", "error", 3000);
                return;
            }

            if (state.authorizationNumber != '' &&
                ((!objPatientAuth || objPatientAuth.length == 0) ||
                    (objPatientAuth && objPatientAuth.length > 0 && state.authorizationNumber != objPatientAuth[0].authorizationNo))) {
                ShowActionDialog(true, "Patient Authorization", "Authorization number does not match with patient authorization, Are you sure you want to continue?", "confirm", function () {
                    postAuthCall(claimID, method);
                });
            }
            else {
                postAuthCall(claimID, method);
            }
        }

    };
    const postAuthCall = (claimID, method) => {
        handleFormatting();
        setSaveLoading(true);
        //instState.claimSuperbillId = claimID;
        //state.objClaimSuperBillInst = instState;
        state.isOrthodontics = state.isOrthodontics == "true" ? true : false;
        state.isProthesisPlacement = state.isProthesisPlacement == "true" ? true : false;
        state.orthoMonthsTreatment = state.orthoMonthsTreatment ? parseInt(state.orthoMonthsTreatment) : null;
        PostDataAPI(method, state, true).then((result) => {
            setSaveLoading(false);

            if (result.success == true) {
                setErrorMessages([]);

                if (claimID < 1) {

                    if (result.success && result.data != null) {
                        showMessage("Success", "Claim saved successfully.", "success", 3000);

                        setClaimID(result.data.claimSuperBillId);
                        result.data = handleFormat(result.data);
                        result.data.useDescriptionFrom = state.useDescriptionFrom;
                        setState(result.data);
                        upDateQueryStringValues(result.data.claimSuperBillId);
                        loadPaymentDDL();
                    }
                }
                else if (claimID > 0) {
                    if (result.success) {
                        result.data = handleFormat(result.data);
                        result.data.useDescriptionFrom = state.useDescriptionFrom;
                        setState(result.data);
                        showMessage("Success", "Claim updated successfully.", "success", 3000);
                        loadPaymentDDL();
                    }
                }

            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const handleFormatting = () => {

        state.referringProviderId = state.referringProviderId ? parseInt(state.referringProviderId) : null;
        state.orderingProviderId = state.orderingProviderId ? parseInt(state.orderingProviderId) : null;
        state.operatingProviderId = state.operatingProviderId ? parseInt(state.operatingProviderId) : null;
        state.otherProviderId = state.otherProviderId ? parseInt(state.otherProviderId) : null;
        state.encounterId = state.encounterId ? parseInt(state.encounterId) : 0;
        state.ptPayment = state.ptPayment ? parseInt(state.ptPayment) : '';
        state.billingProfileId = state.billingProfileId ? parseInt(state.billingProfileId) : null;
        state.isEmployment = state.isEmployment == 'true' || state.isEmployment == true ? true : false;
        state.isAutoAccident = state.isAutoAccident == 'true' || state.isAutoAccident == true ? true : false;
        state.isOtherAccident = state.isOtherAccident == 'true' || state.isOtherAccident == true ? true : false;
        state.isEmergencyService = state.isEmergencyService == 'true' || state.isEmergencyService == true ? true : false;
        state.acuteManifestDate = state.acuteManifestDate ? state.acuteManifestDate : null;
        state.onsetDate = state.onsetDate ? state.onsetDate : null;
        state.otherDate = state.otherDate ? state.otherDate : null;
        state.claimSuperBillId = claimID ? parseFloat(claimID) : 0;
        state.ptPayment = state.ptPayment ? parseFloat(state.ptPayment) : 0.00;

        if (state.lstsuperBillProcedures) {
            state.lstsuperBillProcedures.map((item, i) => {

                item.superbillDiagnosisId = item.superbillDiagnosisId ? parseInt(item.superbillDiagnosisId) : null;
                item.serviceDateFrom = item.serviceDateFrom ? item.serviceDateFrom.split("T")[0] : '';
                item.serviceDateTo = item.serviceDateTo ? item.serviceDateTo.split("T")[0] : '';
                item.billed = item.billed ? parseFloat(item.billed) : 0;
                item.unit = item.unit ? parseFloat(item.unit) : 0;
                item.price = item.price ? parseFloat(item.price) : 0;
            });
        }
        if (state.lstsuperbillProcedureNdc) {
            state.lstsuperbillProcedureNdc.map((im, k) => {
                im.quantity = im.quantity ? parseInt(im.quantity) : null;
                im.lstsuperbillProcedureNdc = im.lstsuperbillProcedureNdc ? parseInt(im.lstsuperbillProcedureNdc) : 0;
                im.superbillProcedureNdcId = im.superbillProcedureNdcId ? parseInt(im.superbillProcedureNdcId) : 0;

            });

        }

        if (state.lstsuperBillDiagnosis) {
            var dxSerial = [];
            state.lstsuperBillDiagnosis.map((itm, i) => {
                dxSerial.push(i + 1);
            })
            setArrayDiagnosisSerial(dxSerial);
        }
        state.lstMissingTeath = [].concat(missingTeethPermenant.filter(t => t.value == true), missingTeethPrimary.filter(t => t.value == true));

    }
    const upDateQueryStringValues = (claimSuperBillId) => {

        let winLocation = window.location.href.replace(encID + '/' + patID + '/' + 0, encID + '/' + patID + '/' + claimSuperBillId.toString());
        window.location.href = winLocation;

    }
    function setMoveToElementId(elementId) {
        if (!errorMessages.moveToElementId) {
            setErrorMessages(prevState => ({
                ...prevState,
                moveToElementId: ''
            }));
        }
        if (errorMessages.moveToElementId.length <= 0) {
            errorMessages.moveToElementId = elementId;
        }
    }


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

    const AddNdcCodes = (proCode, index, ndcCode) => {

        cleanNdcPopUpFields();
        setProcedureIndex(index);
        setProCodeForNdc(proCode);
        setNdcCode(ndcCode);
        setShowHideNdcCodeDialog(true);

        if (state.lstsuperbillProcedureNdc) {
            state.lstsuperbillProcedureNdc.filter(tmprm => tmprm.code === proCode && tmprm.ndcCode === ndcCode).map((item, i) => {
                setNdcListPopUp(item);
            });
        }
    }
    const handleNdcSave = (resultState) => {

        var _ndcStateArray = [];
        var _proceduresArray = [];



        if (state.lstsuperBillProcedures[procedureIndex])
            state.lstsuperBillProcedures[procedureIndex].ndcCode = resultState.ndcCode;

        if (state.lstsuperBillProcedures) {
            if (state.lstsuperBillProcedures.length > 0) {

                state.lstsuperBillProcedures.map((itm, k) => {

                    _proceduresArray.push({
                        //proceduralCodeID: itm.proceduralCodeID,
                        superbillProcedureId: itm.superbillProcedureId, claimSuperbillId: itm.claimSuperbillId, code: itm.code,
                        description: itm.description, m1: itm.m1, m2: itm.m2, m3: itm.m3, m4: itm.m4, serviceDateFrom: itm.serviceDateFrom,
                        serviceDateTo: itm.serviceDateTo, ndcCode: itm.ndcCode, dxPointer1: itm.dxPointer1, dxPointer2: itm.dxPointer2,
                        dxPointer3: itm.dxPointer3, dxPointer4: itm.dxPointer4, unit: isNaN(itm.unit) ? 0 : itm.unit, price: itm.price, billed: itm.billed,
                        patientPaid: itm.patientPaid, insBalance: itm.insBalance, statusCode: itm.statusCode, isDeleted: itm.isDeleted,
                        createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(), updateDate: itm.updateDate
                    });
                })

            }
        }

        if (_ndcStateArray.filter(tmprm => tmprm.code == resultState.code) == "") {
            _ndcStateArray.push({
                superbillProcedureNdcId: resultState.superbillProcedureNdcId, superbillProcedureId: resultState.superbillProcedureId, ndcCode: resultState.ndcCode,
                code: resultState.code, unitCode: resultState.unitCode, quantity: resultState.quantity, isDeleted: resultState.isDeleted, createdBy: resultState.createdBy,
                updatedBy: resultState.updatedBy, createDate: new Date(), ndcCodeName: resultState.ndcCodeName
            });
        }
        if (state.lstsuperbillProcedureNdc) {
            if (state.lstsuperbillProcedureNdc.length > 0) {
                state.lstsuperbillProcedureNdc.map((item, i) => {

                    if (item.code === resultState.code) {
                        _ndcStateArray.push({
                            superbillProcedureNdcId: item.superbillProcedureNdcId, superbillProcedureId: item.superbillProcedureId, ndcCode: resultState.ndcCode,
                            code: item.code, unitCode: resultState.unitCode, quantity: resultState.quantity, isDeleted: item.isDeleted, createdBy: item.createdBy,
                            createDate: item.createDate ? item.createDate : new Date(), updatedBy: item.updatedBy, ndcCodeName: resultState.ndcCodeName
                        });

                    }
                    else {
                        _ndcStateArray.push({
                            superbillProcedureNdcId: item.superbillProcedureNdcId, superbillProcedureId: item.superbillProcedureId, code: item.code,
                            ndcCode: item.ndcCode, unitCode: item.unitCode, quantity: item.quantity, isDeleted: item.isDeleted, createdBy: item.createdBy,
                            updatedBy: item.updatedBy, createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate, ndcCodeName: item.ndcCodeName
                        });

                    }
                })
            }
        }

        setState(prevState => ({
            ...prevState,
            lstsuperbillProcedureNdc: _ndcStateArray,
            lstsuperBillProcedures: _proceduresArray
        }));

        setShowHideNdcCodeDialog(false);
        setProcedureIndex(-1);
    }

    const handleDiagnosisSave = (resultDiagState) => {

        var _diagnosisArray = [];

        if (state.lstsuperBillDiagnosis) {
            if (state.lstsuperBillDiagnosis.length > 0) {
                state.lstsuperBillDiagnosis.map((item, i) => {

                    if (state.lstsuperBillDiagnosis.filter(tmprm => tmprm.icdCode === item.icdCode && tmprm.description === item.description) == "") {

                        _diagnosisArray.push({
                            superbillDiagnosisId: item.superbillDiagnosisId, claimSuperbillId: item.claimSuperbillId, icdCode: item.icdCode,
                            description: item.description, isDeleted: item.isDeleted, createdBy: item.createdBy, updatedBy: item.updatedBy,
                            createDate: item.createDate ? item.createDate : new Date(), updateDate: item.updateDate, serialNumber: item.serialNumber
                        });
                    }
                });
            }
        }

        if (resultDiagState) {

            resultDiagState.map((itm, i) => {

                _diagnosisArray.push({
                    superbillDiagnosisId: itm.superbillDiagnosisId, claimSuperbillId: itm.claimSuperbillId, icdCode: itm.icdCode,
                    description: itm.description, isDeleted: itm.isDeleted, createdBy: itm.createdBy, updatedBy: itm.updatedBy,
                    createDate: itm.createDate ? itm.createDate : new Date(), updateDate: itm.updateDate, serialNumber: itm.serialNumber ? itm.serialNumber : i + 1
                });
            })
        }

        var dxSerial = [];
        _diagnosisArray.filter(tmprm => tmprm.isDeleted != true).map((itm, i) => {

            if (itm.serialNumber > 0)
                itm.serialNumber = i + 1;
            dxSerial.push(i + 1);

        })

        setArrayDiagnosisSerial(dxSerial);

        setState(prevState => ({
            ...prevState,
            lstsuperBillDiagnosis: _diagnosisArray
        }));
        let lstProc = state.lstsuperBillProcedures;
        lstProc = lstProc.map(item => {
            //if (!item.superbillProcedureId > 0) {
            updateProcedureDXPointer(item, dxSerial.length);
            //}
            return { ...item };
        });
        setState(prevState => ({
            ...prevState,
            lstsuperBillProcedures: lstProc
        }));
        setShowHideDiagnosis(false);
    }

    const handleProceduresSave = (resultProcedureLst, ndcList) => {

        var _proceduresArray = [];
        var _ndcStateArray = [];

        if (resultProcedureLst) {

            resultProcedureLst.map((itm, i) => {
                if (!itm.superbillProcedureId > 0 && arrayDiagnosisSerial.length > 0) {
                    updateProcedureDXPointer(itm, arrayDiagnosisSerial.length);
                }
                let resultState = [];
                if (ndcList) {
                    resultState = ndcList.filter(t => t.code == itm.code);
                    if (resultState) {
                        resultState = resultState[0];
                    }
                }

                _proceduresArray.push({
                    //proceduralCodeID: itm.proceduralCodeID,
                    superbillProcedureId: itm.superbillProcedureId, claimSuperbillId: itm.claimSuperbillId, code: itm.code, revCode: itm.revCode, revCodeName: itm.revCodeName,
                    description: itm.description, m1: itm.m1, m2: itm.m2, m3: itm.m3, m4: itm.m4, serviceDateFrom: itm.serviceDateFrom ? itm.serviceDateFrom : state.appointmentDate ? state.appointmentDate : state.appointmentDate.split('T')[0],
                    serviceDateTo: itm.serviceDateTo ? itm.serviceDateTo : state.appointmentDate ? state.appointmentDate : state.appointmentDate.split('T')[0],
                    ndcCode: (resultState && !itm.superbillProcedureId > 0) ? resultState.ndcCode : itm.ndcCode, dxPointer1: itm.dxPointer1, dxPointer2: itm.dxPointer2,
                    dxPointer3: itm.dxPointer3, dxPointer4: itm.dxPointer4, unit: isNaN(itm.unit) ? 1 : itm.unit, price: itm.price, billed: itm.billed,
                    patientPaid: itm.patientPaid, insBalance: itm.insBalance, statusCode: itm.statusCode, isDeleted: itm.isDeleted, eobClaimId: itm.eobClaimId,
                    createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate ? itm.createDate : new Date(), updateDate: itm.updateDate
                });
                if (!itm.superbillProcedureId > 0) {
                    _ndcStateArray = [...state.lstsuperbillProcedureNdc];
                    //if (_ndcStateArray.filter(tmprm => tmprm.code == resultState.code) == "") {
                    let resultState = ndcList.filter(t => t.code == itm.code);
                    if (resultState && resultState.length > 0) {
                        resultState = resultState[0];
                        _ndcStateArray.push({
                            superbillProcedureNdcId: resultState.superbillProcedureNdcId, superbillProcedureId: resultState.superbillProcedureId, ndcCode: resultState.ndcCode,
                            code: resultState.code, unitCode: resultState.unitCode, quantity: resultState.quantity, isDeleted: resultState.isDeleted, createdBy: resultState.createdBy,
                            updatedBy: resultState.updatedBy, createDate: new Date(), ndcCodeName: resultState.ndcCodeName
                        });
                    }

                }
            })
        }

        setState(prevState => ({
            ...prevState,
            lstsuperBillProcedures: _proceduresArray,
            lstsuperbillProcedureNdc: _ndcStateArray,
        }));

        setShowHideProceduresDialog(false);

    }

    const handleCloneClaimSave = (claimClonelst) => {

        var data = claimClonelst ? claimClonelst[0] : null;

        if (data != null) {
            setState(prevState => ({
                ...prevState,
                claimSuperBillId: data.claimSuperbillId
            }));
            loadClaimSuper(data.claimSuperbillId);
            showMessage("Success", "Claim Clone created successfully.", "success", 3000);
            setShowHideCloneClaimDialog(false);

            let winLocation = window.location.href.replace(claimID, data.claimSuperbillId.toString());
            winLocation = winLocation.replace(encID, data.encounterId.toString());
            window.location.href = winLocation;

            setClaimID(data.claimSuperbillId);
        }
    }
    const updateProcedureDXPointer = (objProc, serialCount) => {
        //if (!objProc.superbillProcedureId > 0) {
        objProc.dxPointer1 = serialCount > 0 ? "1" : "";
        objProc.dxPointer2 = serialCount > 1 ? "2" : "";
        objProc.dxPointer3 = serialCount > 2 ? "3" : "";
        objProc.dxPointer4 = serialCount > 3 ? "4" : "";
        //}

    }

    const handleUnallocatedSave = (totalPaid, claimSuperbillId) => {

        let totalPayment = 0;
        if (claimSuperbillId === state.claimSuperBillId) {

            totalPayment = isNaN(state.ptPayment) ? 0 : parseFloat(state.ptPayment) + parseFloat(totalPaid);
            updatePatientPaid(totalPayment, claimSuperbillId);
        }

    }
    const updatePatientPaid = (totalPayment, claimSuperbillId) => {

        PostDataAPI('claim/getClaimSuperBillById', claimSuperbillId).then((result) => {
            if (result.success && result.data != null) {

                result.data = handleFormat(result.data);
                if (result.data.claimCategory == 'Dental' && result.data.lstMissingTeath) {
                    result.data.lstMissingTeath.map(m => {
                        setMissingTeethPermenant(missingTeethPermenant.map(item => m.toothNumber == item.toothNumber ? { ...item, value: true } : item));
                    });
                }
                setState(result.data);
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 8000);
        })
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    const cleanValuesFields = (isFromResetBtn, lstPatientAuth) => {

        setErrorMessages({
            errorBillingStatus: false, errorClaimType: false, errorIcdCode: false, errorFeeSchedule: false,
            errorPos: false, errorTos: false, errorIsEmployment: false, errorisAutoAccident: false, errorOtherAccident: false, errorOrderingProvider: false,
            errorReferringProvider: false, errorBillingProfile: false, moveToElementId: ''
        });

        setState({
            claimSuperBillId: 0, billingProfileId: null, encounterId: encID, referringProviderId: null, orderingProviderId: null,
            billingStatusCode: "INTERNAL_REVIEW", claimTypeCode: "DEFAULT", icdVersionCode: "10", isEmergencyService: "false", pos: "11", posName: "",
            tos: "01", tosName: "", ptPayment: '0.00', delayReasonCode: "", acuteManifestDate: "", onsetDate: "", otherDate: "", paymentProfileCode: "",
            isTransmitAuthorizNoToPayer: false, feeScheduleCode: "", authorizationNumber: "", authorizationName: "", referralNumber: "",
            isEmployment: "false", isAutoAccident: "false", isOtherAccident: "false", ediBillingNote: "", isDeleted: false, createdBy: 0, updatedBy: 0, appontmentDate: '',
            createDate: new Date().toISOString(), onsetDateCode: "ONSET_CURRENT_SYMP", OtherDateCode: "", lstsuperBillDiagnosis: [], lstsuperBillProcedures: [],
            lstsuperbillProcedureNdc: [], useDescriptionFrom: "HCPCSCodes", claimCategory: 'Professional', icnNo: '', lstMissingTeath: []

        });

        if (claimID > 0)
            loadClaimSuper(claimID, isFromResetBtn);
        else {
            loadAppointmentDateAndNotes();
            setClaimCategoryDialogOpenClose(true);
            if (lstPatientAuth && lstPatientAuth.length > 0) {
                var objPatientAuth = lstPatientAuth.filter(t => new Date() >= new Date(t.startDate) &&
                    new Date() <= new Date(t.endDate));
                setState(prevState => ({
                    ...prevState,
                    authorizationNumber: objPatientAuth && objPatientAuth.length > 0 && objPatientAuth[0].encounterCount < objPatientAuth[0].approvedVisits ? objPatientAuth[0].authorizationNo : ""
                }));
            }

        }
    }

    const cleanNdcPopUpFields = () => {
        setNdcListPopUp({
            superbillProcedureNdcId: 0, superbillProcedureId: 0, code: '', ndcCode: '', unitCode: '', quantity: '1',
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), ndcCodeName: ''
        });
    }

    const closeAppointment = () => {
        setAppointmentDialogOpenClose(false);
    }
    const closeEncounter = () => {
        setEncounterDialogOpenClose(false)
    }

    const handlePrintPayment = () => {
        if (state.paymentOption) {
            var reportUrl = "%2freports%2fbilling%2ffinancial_patient_payment_receipt_print&rs:Command=Render&rc:Parameters=false";
            var _appointment_id = "&appointment_id=" + state.paymentAppointmentId;
            var _batch_id = "&bath_id=" + state.paymentOption;
            var _parameters = _appointment_id + _batch_id;
            printReport(reportUrl, _parameters);
        } else {
            showMessage("Error", "Please select payment option", "error", 3000);
        }

    }
    const handleClaimCategorySelection = () => {
        setSelectedClaimCategory(state.claimCategory);
        setClaimCategoryDialogOpenClose(false);
    }
    function numberFormat(x) {
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    const handleDentalPermanentCheckedChange = (e) => {
        const { name, checked } = e.target;
        var lst = [...missingTeethPermenant];
        lst = lst.map(t => t.name == name ? { ...t, value: checked } : t);
        setMissingTeethPermenant(lst);
    }
    const handleDentalPrimaryCheckedChange = (e) => {
        const { name, checked } = e.target;
        var lst = [...missingTeethPrimary];
        lst = lst.map(t => t.name == name ? { ...t, value: checked } : t);
        setMissingTeethPrimary(lst);
    }

    const openPatientPaymentPrint = () => {
        var reportUrl = "%2freports%2fbilling%2ffinancial_patient_payment_receipt&rs:Command=Render&rc:Parameters=false";
        var _claimId = "&claim=" + claimID;
        var _parameters = _claimId;
        printReport(reportUrl, _parameters);
    };

    const openHcfa1500Print = (_type) => {
        var reportUrl = "";
        if (selectedClaimCategory == 'Dental') {
            reportUrl = "%2freports%2fbilling%2fdental_claim_print&rs:Command=Render&rc:Parameters=false";
        } else if (selectedClaimCategory == 'Institutional') {
            reportUrl = "%2freports%2fbilling%2finstitutional_claim_UB-04_print&rs:Command=Render&rc:Parameters=false";
        } else {
            reportUrl = "%2freports%2fbilling%2fbilling_HECFA1500&rs:Command=Render&rc:Parameters=false";
        }
        var _claimID = "&calim_superbill_id=" + claimID;
        var _printType = "&is_text_only=" + _type;
        var _parameters = _claimID + _printType;
        printReport(reportUrl, _parameters);
    };

    const createClaimStatusRequest = () => {
        var obj = {
            claimSuperbillId: parseInt(claimID)
        };
        PostDataAPI("claims/ClaimStatusInquiry", obj, true).then((result) => {
            if (result.success === true) {
                //if (result.data) {
                showMessage("Success", "Claims status requested successfully.", "success", 3000);
                //window.open("." + result.data, '_blank');
                //download(result.data);
                //}
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    return (
        <>
            <PageTitle title={(selectedClaimCategory ? selectedClaimCategory : "") + " Claim/Superbill Details"} button={
                <Button
                    size="small"
                    className={classes.newAddBtn}
                    startIcon={< ArrowBackIosIcon />}
                >
                    {
                        callMethod != undefined && callMethod == "billing" ?
                            <Link
                                className={classes.btnLink}
                                to={{
                                    pathname: '/app/billing',
                                    search: '',
                                    state: "",
                                }}>Back to Claim</Link>
                            :
                            <Link
                                className={classes.btnLink}
                                to={{
                                    pathname: '/app/encounter',
                                    search: '?id=' + encounterDetails.userLocationId + '/' + encounterDetails.patientId + '/' + encounterDetails.patientAppointmentId,
                                    state: JSON.stringify({
                                        patientId: encounterDetails.patientId,
                                        appoitmentId: encounterDetails.patientAppointmentId,
                                        userLocationID: encounterDetails.userLocationId
                                    })
                                }}>Back to Encounter</Link>
                    }
                </Button>
            }
            />
            <div className={classes.claimContainer}>

                <ClaimPatientProfile
                    patientId={patID}
                    dataId={patID}
                    encouID={encID}
                    getExternalModulesCall={(value) => setExternalModulesCall(value)}
                />

                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        {/* <Label title="Claim #" size={2} />{claimID > 0 ? claimID : ''}*/}
                        <Grid container direction="row">
                            {
                                claimID > 0 ?
                                    <>
                                        <Label title="Claim #" size={2} />
                                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                            <Typography>{claimID > 0 ? claimID : ''}</Typography>
                                        </Grid>
                                    </> :
                                    <Grid item xs={12} sm={6} md={6} lg={5} xl={5} />
                            }
                            <Grid item xs={12} sm={6} md={6} lg={7} xl={7}>

                                <Button className={classes.gridButton} onClick={() => setAppointmentDialogOpenClose(true)} disabled={isAutoCreatedAppt} >Appointment</Button>|
                                <Button className={classes.gridButton}><Link to={"/app/batchinsurancepayment?cid=" + claimID} disabled={!state.claimSuperBillId > 0 || !isEditable}>Add EOB</Link></Button>|

                                <Button className={classes.gridButton} onClick={() => setEncounterDialogOpenClose(true)} disabled={isAutoCreatedAppt || !isClinicalNoteEditable} >Clinical Notes</Button>|
                                {claimID > 0 ?
                                    <Button className={classes.gridButton} onClick={() => setShowHideCloneClaimDialog(true)} disabled={!isEditable} >Clone</Button> :
                                    <Button className={classes.gridButton} disabled={!isEditable}>Clone</Button>}|
                                {/* <Button className={classes.gridButton} disabled={true} >Print Forms</Button>| */}
                                {/*<Button className={classes.gridButton} onClick={() => openPatientPaymentPrint()} >Print Super Bill</Button>| */}

                                <Button className={classes.gridButton} onClick={() => openHcfa1500Print("False")} disabled={!state.claimSuperBillId > 0}>Print PDF</Button>|
                                <Button className={classes.gridButton} onClick={() => openHcfa1500Print("True")} disabled={!state.claimSuperBillId > 0}>Print</Button>
                                {/*<ReactToPrint
                                    trigger={() => <Button className={classes.gridButton}>
                                        Print Screen</Button>}
                                    content={() => formPrint.current}
                                />|*/}
                                {/*<Button className={classes.gridButton} onClick={createClaimStatusRequest}>Request Status</Button>*/}
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div class="tab">

                    <Tabs
                        value={tabvalue}
                        onChange={onTabChange}
                        aria-label="icon tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Claim" aria-label="claim" {...a11yProps(0)} />

                        {selectedClaimCategory == 'Institutional' ?
                            <Tab label="Information Code" aria-label="infocode" {...a11yProps(1)} />
                            : ''}
                    </Tabs>



                    <TabPanel value={tabvalue} index={0} className={classes.claimTabPanel}>
                        {
                            tabvalue == 0 ? (
                                <>
                                    <Grid container direction="row" lg={12} ref={formPrint} className={classes.formPrintContainer} >
                                        <Grid container direction="row" lg={12}>
                                            <Label title="Billing Status" size={2} mandatory={true} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    InputRef={billingStatusRef}
                                                    id="billingStatusCode"
                                                    name="billingStatusCode"
                                                    options={billStatusCode}
                                                    value={state.billingStatusCode}
                                                    onChange={handleChange}
                                                    placeholder="Select Billing Status"
                                                />
                                                {errorMessages.errorBillingStatus && !state.billingStatusCode ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select billing status
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                            <Label title="Submission Type" size={2} mandatory={true} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <Grid container direction="row" lg={12}>
                                                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                        <SelectField
                                                            InputRef={claimTypeRef}
                                                            id="claimTypeCode"
                                                            name="claimTypeCode"
                                                            options={claimTypesCode}
                                                            value={state.claimTypeCode}
                                                            onChange={handleChange}
                                                            placeholder="Select Submission Type"
                                                        />
                                                        {errorMessages.errorClaimType && !state.claimTypeCode ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select claim type
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                                        <Grid container>
                                                            {state.claimTypeCode == 'RE_SUBMISSION' || state.claimTypeCode == 'VOID_CLAIM' ?
                                                                <>
                                                                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.labelAlign}>
                                                                        <FormLabel className={classes.claimLableInput} > ICN #
                                                                            <span className={classes.mandatorColor}>*</span>:
                                                                        </FormLabel>
                                                                    </Grid>
                                                                    <Grid item xs={2} sm={6} md={6} lg={6} xl={6}>
                                                                        <InputBaseField
                                                                            InputRef={icnNoRef}
                                                                            id="icnNo"
                                                                            name="icnNo"
                                                                            value={state.icnNo}
                                                                            onChange={handleChange}
                                                                            MaxLength="50"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={2} sm={5} md={5} lg={5} xl={5} />

                                                                    <Grid item xs={2} sm={7} md={7} lg={7} xl={7}>
                                                                        {errorMessages.errorICN && !state.icnNo ? (<FormHelperText style={{ color: "red" }} >
                                                                            Please enter ICN #
                                                                        </FormHelperText>) : ('')}
                                                                    </Grid>
                                                                </>
                                                                : ''}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="ICD Version" size={2} mandatory={true} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    InputRef={icdVersionRef}
                                                    id="icdVersionCode"
                                                    name="icdVersionCode"
                                                    options={optionsIcdversionCode}
                                                    value={state.icdVersionCode}
                                                    onChange={handleChange}
                                                    placeholder="Select ICD"
                                                />
                                                {errorMessages.errorIcdCode && !state.icdVersionCode ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select icd version code
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                            <Label title="Emergency Service" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <Grid container direction="row" lg={12}>
                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <span className={classes.posSpan}>
                                                            <SelectField
                                                                id="isEmergencyService"
                                                                name="isEmergencyService"
                                                                options={optionsYesNo}
                                                                value={state.isEmergencyService}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </span>
                                                    </Grid>
                                                    {selectedClaimCategory == 'Professional' ?
                                                        <>
                                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.labelAlign}>
                                                                        <FormLabel className={classes.claimLableInput} > POS
                                                                            <span className={classes.mandatorColor}>*</span>:
                                                                        </FormLabel>
                                                                    </Grid>

                                                                    <Grid item xs={2} sm={6} md={6} lg={6} xl={6}>
                                                                        <span className={classes.posSpan}>
                                                                            <SearchListField
                                                                                // InputRef={posRef}
                                                                                id="pos"
                                                                                name="pos"
                                                                                value={state.pos}
                                                                                searchTerm={state.posName}
                                                                                code="get_pos"
                                                                                apiUrl="ddl/loadItems"
                                                                                onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                                                                // placeholderTitle="Pos"
                                                                                MaxLength="2"
                                                                                popperWidth={true}
                                                                            />
                                                                        </span>
                                                                    </Grid>
                                                                    {errorMessages.errorPos && !state.pos ? (<FormHelperText id="posError" style={{ color: "red" }} >
                                                                        Please enter POS
                                                                    </FormHelperText>) : ('')}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.labelAlign}>
                                                                        <FormLabel className={classes.claimLableInput} mandatory={true} >
                                                                            TOS<span className={classes.mandatorColor}>*</span>:
                                                                        </FormLabel>
                                                                    </Grid>

                                                                    <Grid item xs={2} sm={6} md={6} lg={6} xl={6}>
                                                                        <span className={classes.posSpan}>
                                                                            <SearchListField
                                                                                // InputRef={tosRef}
                                                                                id="tos"
                                                                                name="tos"
                                                                                value={state.tos}
                                                                                searchTerm={state.tosName}
                                                                                code="get_tos"
                                                                                apiUrl="ddl/loadItems"
                                                                                onChangeValue={(name, item) => handleTOSListChange(name, item)}
                                                                                // placeholderTitle="Pos"
                                                                                MaxLength="2"
                                                                                popperWidth={true}
                                                                            />
                                                                        </span>
                                                                    </Grid>

                                                                    {errorMessages.errorTos && !state.tos ? (<FormHelperText id="tosError" style={{ color: "red" }} >
                                                                        Please enter TOS
                                                                    </FormHelperText>) : ('')}

                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                        : selectedClaimCategory == 'Institutional' ?
                                                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                                                <Grid container spacing={1}>
                                                                    <Grid item xs={4} sm={4} md={4} lg={4} className={classes.labelAlign}>
                                                                        <FormLabel className={classes.claimLableInput} > TOC
                                                                            <span className={classes.mandatorColor}>*</span>:
                                                                        </FormLabel>
                                                                    </Grid>

                                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                        <span className={classes.posSpan}>
                                                                            <SearchListField
                                                                                // InputRef={tocRef}
                                                                                id="tocCode1"
                                                                                name="tocCode1"
                                                                                value={state.tocCode1}
                                                                                searchTerm={state.tocName1}
                                                                                code="get_facility_type"
                                                                                apiUrl="ddl/loadItems"
                                                                                onChangeValue={(name, item) => handleTOC1ListChange(name, item)}
                                                                                // placeholderTitle="Pos"
                                                                                MaxLength="2"
                                                                                popperWidth={true}
                                                                            />
                                                                        </span>
                                                                    </Grid>

                                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                        <span className={classes.posSpan}>
                                                                            <SearchListField
                                                                                // InputRef={tocRef}
                                                                                id="tocCode2"
                                                                                name="tocCode2"
                                                                                value={state.tocCode2}
                                                                                searchTerm={state.tocName2}
                                                                                searchId={state.tocCode1}
                                                                                code="get_facility_bill_type"
                                                                                apiUrl="ddl/loadItems"
                                                                                onChangeValue={(name, item) => handleTOC2ListChange(name, item)}
                                                                                // placeholderTitle="Pos"
                                                                                MaxLength="2"
                                                                                popperWidth={true}
                                                                            />
                                                                        </span>
                                                                    </Grid>

                                                                </Grid>

                                                                <Grid container>
                                                                    <Grid item xs={4} sm={4} md={4} />
                                                                    <Grid item xs={8} sm={8} md={8}>
                                                                        {errorMessages.errorToc && (state.tocCode1 == "" || !state.tocCode1 || state.tocCode2 == "" || !state.tocCode2) ? (<FormHelperText style={{ color: "red" }} >
                                                                            Please enter TOC values
                                                                        </FormHelperText>) : ('')}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            : selectedClaimCategory == 'Dental' ?
                                                                <>
                                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                        <Grid container>
                                                                            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.labelAlign}>
                                                                                <FormLabel className={classes.claimLableInput} > POS
                                                                                    <span className={classes.mandatorColor}>*</span>:
                                                                                </FormLabel>
                                                                            </Grid>

                                                                            <Grid item xs={2} sm={6} md={6} lg={6} xl={6}>
                                                                                <span className={classes.posSpan}>
                                                                                    <SearchListField
                                                                                        ref={posRef}
                                                                                        id="pos"
                                                                                        name="pos"
                                                                                        value={state.pos}
                                                                                        searchTerm={state.posName}
                                                                                        code="get_pos"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                                                                        // placeholderTitle="Pos"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    />
                                                                                </span>
                                                                            </Grid>
                                                                            {errorMessages.errorPos && !state.pos ? (<FormHelperText style={{ color: "red" }} >
                                                                                Please enter POS
                                                                            </FormHelperText>) : ('')}
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                                : ""
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row">
                                            <Label title="Patient Payment" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <Grid container direction="row" >
                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                        <InputBaseField
                                                            id="ptPayment"
                                                            name="ptPayment"
                                                            value={isNaN(state.ptPayment) || state.ptPayment == null ? numberFormat(0) : numberFormat(state.ptPayment)}
                                                            onChange={handleChange}
                                                            IsDisabled={true}
                                                            MaxLength="5"
                                                        />
                                                    </Grid>

                                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <span className={classes.addNew} title={"Add New "}>
                                                            <img src={AddIcon} alt="Add New" onClick={() => setShowAddPaymentDialog(true)} />
                                                        </span>
                                                    </Grid>

                                                    <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                                                        <Grid container >
                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                <SelectField
                                                                    id="paymentOption"
                                                                    name="paymentOption"
                                                                    options={paymentOptions}
                                                                    value={state.paymentOption}
                                                                    onChange={handleChange}
                                                                    placeholder="Select Payment"
                                                                // disabled={true}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <span className={classes.printPayment} title={"Print Payment"}>
                                                            <img onClick={handlePrintPayment} src={PrintIcon} alt="Add New" />
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Label title="Delay Reason" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    id="delayReasonCode"
                                                    name="delayReasonCode"
                                                    options={delayReasonssCode}
                                                    value={state.delayReasonCode}
                                                    onChange={handleChange}
                                                    placeholder="Select Delay Reason"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Billing Profile" size={2} />
                                            <Grid container xs={12} sm={4} md={4} lg={3} xl={3}>
                                                {/* <Grid item xs={11} sm={11} md={11} lg={11} xl={11}> */}
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <SelectField
                                                        id="billingProfileId"
                                                        name="billingProfileId"
                                                        options={billingProfiles}
                                                        value={state.billingProfileId}
                                                        onChange={handleChange}
                                                        placeholder="Select Billing Profile"
                                                    />
                                                </Grid>
                                            </Grid>
                                            {selectedClaimCategory == 'Dental' ?
                                                <>
                                                    <Label title="Fee Schedule" size={2} mandatory={true} />
                                                    <Grid container xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <SelectField
                                                                InputRef={feeScheduleRef}
                                                                id="feeScheduleCode"
                                                                name="feeScheduleCode"
                                                                options={feeScheduler}
                                                                value={state.feeScheduleCode}
                                                                onChange={handleChange}
                                                                placeholder="Select Fee Schedule"
                                                            />
                                                        </Grid>
                                                        {errorMessages.errorFeeSchedule && !state.feeScheduleCode ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select fee scheduler
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </> :
                                                <>
                                                    <Label title="Acute Manifestation Date" size={2} />
                                                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <InputBaseField
                                                            type="date"
                                                            id="acuteManifestDate"
                                                            name="acuteManifestDate"
                                                            value={state.acuteManifestDate}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                </>
                                            }


                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Authorization #" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <InputBaseField
                                                    id="authorizationNumber"
                                                    name="authorizationNumber"
                                                    value={state.authorizationNumber}
                                                    onChange={handleChange}
                                                    MaxLength="20"
                                                />
                                            </Grid>
                                            {selectedClaimCategory == 'Dental' ?
                                                <>
                                                    <Label title="Orthodontics" size={2} />
                                                    <Grid container xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                            <SelectField
                                                                id="isOrthodontics"
                                                                name="isOrthodontics"
                                                                value={state.isOrthodontics}
                                                                options={orthodonticsOptions}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </Grid>
                                                        <div className={classes.customLabel}>
                                                            <p>Applience Date: </p>
                                                        </div>
                                                        <div className={classes.customField}>
                                                            <InputBaseField
                                                                type="date"
                                                                id="orthoApplianceDate"
                                                                name="orthoApplianceDate"
                                                                value={state.orthoApplianceDate}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                    </Grid>

                                                </> :
                                                <>
                                                    <Label title="Onset Date" size={2} />
                                                    <Grid container spacing={1} xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                                            <SelectField
                                                                id="onsetDateCode"
                                                                name="onsetDateCode"
                                                                options={onsetDateTypeCode}
                                                                value={state.onsetDateCode}
                                                                onChange={handleChange}
                                                                placeholder="Select Onset Date"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={4} lg={5} xl={5}>
                                                            <InputBaseField
                                                                type="date"
                                                                id="onsetDate"
                                                                name="onsetDate"
                                                                value={state.onsetDate}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                            <Typography className={classes.noteText}>(HCFA box 14)</Typography>
                                                        </Grid>
                                                    </Grid>

                                                </>
                                            }

                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <CheckboxField
                                                    color="primary"
                                                    id="isTransmitAuthorizNoToPayer"
                                                    name="isTransmitAuthorizNoToPayer"
                                                    options={options}
                                                    value={state.isTransmitAuthorizNoToPayer}
                                                    checked={state.isTransmitAuthorizNoToPayer}
                                                    onChange={handleCheckedChange}
                                                    label="Do not transmit authorization # to payer"
                                                />
                                            </Grid>
                                            {selectedClaimCategory == 'Dental' ?
                                                <>
                                                    <Label title="Months of Treatment" size={2} />
                                                    <Grid container xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                            <InputBaseField
                                                                id="orthoMonthsTreatment"
                                                                name="orthoMonthsTreatment"
                                                                value={state.orthoMonthsTreatment}
                                                                onChange={handleChangeNumber}
                                                                placeholder="No(s)"
                                                                type="number"
                                                                MaxLength={2}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </> : <>
                                                    <Label title="Other Date" size={2} />
                                                    <Grid container spacing={1} xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                                            <SelectField
                                                                id="otherDateCode"
                                                                name="otherDateCode"
                                                                options={onsetDateOtherCode}
                                                                value={state.otherDateCode}
                                                                onChange={handleChange}
                                                                placeholder="Select Other Date"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={4} lg={5} xl={5}>
                                                            <InputBaseField
                                                                type="date"
                                                                id="otherDate"
                                                                name="otherDate"
                                                                value={state.otherDate}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                            <Typography className={classes.noteText}>(HCFA box 15 and 19)</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </>}

                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Referral #" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <InputBaseField
                                                    id="referralNumber"
                                                    name="referralNumber"
                                                    value={state.referralNumber}
                                                    onChange={handleChange}
                                                    placeholder="####"
                                                    MaxLength="20"
                                                />
                                            </Grid>
                                            {selectedClaimCategory == 'Dental' ?
                                                <>
                                                    <Label title="Replacement of Prosthesis" size={2} />

                                                    <Grid container xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                            <SelectField
                                                                id="isProthesisPlacement"
                                                                name="isProthesisPlacement"
                                                                value={state.isProthesisPlacement}
                                                                options={prothesisPlacementOptions}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </Grid>
                                                        <div className={classes.customLabel}>
                                                            <p>Placement Date: </p>
                                                        </div>

                                                        <div className={classes.customField}>
                                                            <InputBaseField
                                                                type="date"
                                                                id="prothesisPlacementDate"
                                                                name="prothesisPlacementDate"
                                                                value={state.prothesisPlacementDate}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </> :
                                                <>

                                                    <Label title="Fee Schedule" size={2} mandatory={true} />
                                                    <Grid container direction="column" xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                                            <SelectField
                                                                InputRef={feeScheduleRef}
                                                                id="feeScheduleCode"
                                                                name="feeScheduleCode"
                                                                options={feeScheduler}
                                                                value={state.feeScheduleCode}
                                                                onChange={handleChange}
                                                                placeholder="Select Fee Schedule"
                                                            />
                                                        </Grid>
                                                        {errorMessages.errorFeeSchedule && !state.feeScheduleCode ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select fee scheduler
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </>
                                            }

                                        </Grid>


                                        <Grid container direction="row" lg={12}>
                                            {/*{selectedClaimCategory == 'Dental' ?*/}
                                            {/*    <>*/}
                                            {/*        <Label title="Primary Ins" size={2} />*/}
                                            {/*        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>*/}
                                            {/*            <SelectField*/}
                                            {/*                id="primaryIns"*/}
                                            {/*                name="primaryIns"*/}
                                            {/*                options={primaryIns}*/}
                                            {/*                onChange={handleChange}*/}
                                            {/*                placeholder="Select"*/}
                                            {/*            />*/}
                                            {/*        </Grid>*/}
                                            {/*    </>*/}
                                            {/*    :*/}
                                            <>
                                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} />
                                            </>
                                            {/*}*/}
                                            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                <Typography className={classes.subTitle}>Patient's Condition related to:</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid container item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.textAreaLabel}>
                                                <Label title="Appointment Notes" isTextAreaInput={true} size={4} />
                                                <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                                    <TextareaField
                                                        id="appointmentNotes"
                                                        name="appointmentNotes"
                                                        value={state.appointmentNotes}
                                                        onChange={handleChange}
                                                        rowsMin={5}
                                                        MaxLength="4000"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container xs={12} sm={6} md={6} lg={6} xl={6} direction="column">
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} direction="column">

                                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                                                        <Label title="Employment" size={2} />
                                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>

                                                            <SelectField
                                                                id="isEmployment"
                                                                name="isEmployment"
                                                                options={optionsYesNo}
                                                                value={state.isEmployment}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />

                                                            {/*{errorMessages.errorIsEmployment && !state.isEmployment ? (<FormHelperText style={{ color: "red" }} >*/}
                                                            {/*    Please select employment*/}
                                                            {/*</FormHelperText>) : ('')}*/}
                                                        </Grid>
                                                        <Label title="Auto Accident" size={2} style={{ paddingLeft: "5px" }} />
                                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                                            <SelectField
                                                                id="isAutoAccident"
                                                                name="isAutoAccident"
                                                                options={optionsYesNo}
                                                                value={state.isAutoAccident}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </Grid>

                                                    </Grid>
                                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                                                        <Label title="Other Accident" size={2} />
                                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                                            <SelectField
                                                                id="isOtherAccident"
                                                                name="isOtherAccident"
                                                                options={optionsYesNo}
                                                                value={state.isOtherAccident}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </Grid>
                                                        {/*{selectedClaimCategory == 'Dental' ?*/}
                                                        {/* Bug 2087   <>*/}
                                                        <Label title="State" size={2} style={{ paddingLeft: "5px" }} />
                                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                                            <SelectField
                                                                id="conditionStateCode"
                                                                name="conditionStateCode"
                                                                value={state.conditionStateCode}
                                                                options={USAStateListOptions}
                                                                onChange={handleChange}
                                                                placeholder="Select"
                                                            />
                                                        </Grid>
                                                        {/*</> : ''
                                                        }*/}


                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12} >
                                            {selectedClaimCategory == 'Dental' ? '' : <>

                                                <Grid container xs={12} sm={6} md={6} lg={6} xl={6}>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className={classes.textAreaLabel}>
                                                        <Label title="EDI Billing Note" isTextAreaInput={true} size={12} />
                                                        <Typography className={classes.billingNotesText}>(HCFA/CMS 1500 Line 19)</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                                        <TextareaField
                                                            id="ediBillingNote"
                                                            name="ediBillingNote"
                                                            value={state.ediBillingNote}
                                                            onChange={handleChange}
                                                            rowsMin={5}
                                                            MaxLength="4000"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </>}

                                        </Grid>


                                        <Grid container direction="row" lg={12} >
                                            {claimId > 0 ? <Grid container xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <Label title="Billing Notes" size={4} />
                                                <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                                    {claimId > 0 && isEditable ?
                                                        <span className={classes.editNote} title={"Edit Note(s)"} onClick={() => setAddNoteDialog(true)}>
                                                            <img src={EditIcon} alt="Edit Note (s)" /> Edit Note (s)
                                                        </span>
                                                        : null}
                                                    {claimId == 0 && isEditable ?
                                                        <span className={classes.addNote} title={"Add Note(s)"} onClick={() => setAddNoteDialog(true)}>
                                                            <img src={AddIcon} alt="Add Note (s)" /> Add Note (s)
                                                        </span>
                                                        : null
                                                    }

                                                </Grid>
                                            </Grid> :
                                                <Grid container xs={12} sm={6} md={6} lg={6} xl={6}>
                                                    <Label title="Billing Notes" size={4} />
                                                    <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                                                        {claimId > 0 ?
                                                            <span className={classes.editNote} title={"Edit Note(s)"} onClick={() => setAddNoteDialog(true)}>
                                                                <img src={EditIcon} alt="Edit Note (s)" /> Edit Note (s)
                                                            </span>
                                                            : null}
                                                        {claimId == 0 ?
                                                            <span className={classes.addNote} title={"Add Note(s)"} onClick={() => setAddNoteDialog(true)}>
                                                                <img src={AddIcon} alt="Add Note (s)" /> Add Note (s)
                                                            </span>
                                                            : null
                                                        }

                                                    </Grid>
                                                </Grid>
                                            }
                                            <Grid container xs={12} sm={6} md={6} lg={6} xl={6} direction="column">
                                                <Grid container xs={12} sm={6} md={6} lg={6} xl={6} direction="row">

                                                </Grid>
                                                <Grid container xs={12} sm={6} md={6} lg={6} xl={6} direction="row">
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Label title="Referring Provider" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    id="referringProviderId"
                                                    name="referringProviderId"
                                                    options={providers}
                                                    value={state.referringProviderId}
                                                    onChange={handleChange}
                                                    placeholder="Select Referring Provider"
                                                />
                                                {/*{errorMessages.errorReferringProvider && !state.referringProviderId ? (<FormHelperText style={{ color: "red" }} >*/}
                                                {/*    Please select referring provider*/}
                                                {/*</FormHelperText>) : ('')}*/}
                                            </Grid>
                                            {selectedClaimCategory == 'Dental' ?

                                                <>
                                                    <Label title="Ordering Provider" mandatory={true} size={2} />
                                                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <SelectField
                                                            InputRef={orderingProviderRef}
                                                            id="orderingProviderId"
                                                            name="orderingProviderId"
                                                            options={providers}
                                                            value={state.orderingProviderId}
                                                            onChange={handleChange}
                                                            placeholder="Select Ordering Provider"
                                                        />
                                                        {errorMessages.errorOrderingProvider && !state.orderingProviderId ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select ordering provider
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </> :
                                                <>
                                                    <Label title="Rendering Provider" mandatory={true} size={2} />
                                                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <SelectField
                                                            InputRef={orderingProviderRef}
                                                            id="orderingProviderId"
                                                            name="orderingProviderId"
                                                            options={providers}
                                                            value={state.orderingProviderId}
                                                            onChange={handleChange}
                                                            placeholder="Select Rendering Provider"
                                                        />
                                                        {errorMessages.errorOrderingProvider && !state.orderingProviderId ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select rendering provider
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </>
                                            }




                                        </Grid>
                                        <Grid container direction="row" lg={12}>
                                            <Label title="Operating Provider" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    id="operatingProviderId"
                                                    name="operatingProviderId"
                                                    options={providers}
                                                    value={state.operatingProviderId}
                                                    onChange={handleChange}
                                                    placeholder="Select Operating Provider"
                                                />
                                                {/*{errorMessages.errorReferringProvider && !state.referringProviderId ? (<FormHelperText style={{ color: "red" }} >*/}
                                                {/*    Please select referring provider*/}
                                                {/*</FormHelperText>) : ('')}*/}
                                            </Grid>
                                            <Label title="Other Provider" size={2} />
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <SelectField
                                                    id="otherProviderId"
                                                    name="otherProviderId"
                                                    options={providers}
                                                    value={state.otherProviderId}
                                                    onChange={handleChange}
                                                    placeholder="Select Other Provider"
                                                />
                                                {/*{errorMessages.errorOrderingProvider && !state.orderingProviderId ? (<FormHelperText style={{ color: "red" }} >*/}
                                                {/*    Please select referring provider*/}
                                                {/*</FormHelperText>) : ('')}*/}
                                            </Grid>
                                        </Grid>

                                        {selectedClaimCategory == 'Dental' ?
                                            <>

                                                <Grid container direction="row" lg={12}>
                                                    <Label title="Speciality Code" size={2} />
                                                    <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                        <SearchList
                                                            id="providerSpecialityName"
                                                            name="providerSpecialityName"
                                                            value={state.providerSpecialityName}
                                                            searchTerm={state.providerSpecialityName}
                                                            elemCode="providerSpecialityCode"
                                                            code="get_dental_speciality_code"
                                                            apiUrl="ddl/loadItems"
                                                            onChangeValue={(name, item, elemCode) => handleProviderSpecialityChange(name, item, elemCode)}
                                                            MaxLength="50"
                                                            popperWidth={true}
                                                            placeholderTitle="Select Speciality"
                                                        />

                                                    </Grid>

                                                </Grid>
                                            </> : ''}

                                        <Grid container direction="row" lg={12} >
                                            {selectedClaimCategory == 'Dental' ? '' :
                                                <FormGroupTitle>Diagnosis</FormGroupTitle>
                                            }
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                {selectedClaimCategory == 'Dental' ?
                                                    <FormGroupTitle>Diagnosis</FormGroupTitle> : ''
                                                }

                                                <table className={classes.icdCodeTable}>

                                                    {state.lstsuperBillDiagnosis && state.lstsuperBillDiagnosis.length == 0 && selectedClaimCategory == 'Dental' ?

                                                        <h1 style={{
                                                            textAlign: "center",
                                                            fontSize: "17px",
                                                            display: "list-item",
                                                            padding: "37px",
                                                        }}>
                                                            No diagnosis selected yet
                                                        </h1> : null
                                                    }

                                                    {state.lstsuperBillDiagnosis && state.lstsuperBillDiagnosis.length > 0 ?
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="1">#</th>
                                                                <th colSpan="1">ICD-10</th>
                                                                <th colSpan="2">Description</th>
                                                                <th colSpan="1">Action</th>
                                                            </tr>
                                                        </thead>
                                                        : null
                                                    }
                                                    {
                                                        state.lstsuperBillDiagnosis ?
                                                            state.lstsuperBillDiagnosis.filter(tmprm => tmprm.isDeleted != true).map((item, i) => {

                                                                return <tr>
                                                                    <td colSpan="1">{item.serialNumber}</td>
                                                                    <td colSpan="1">{item.icdCode}</td>
                                                                    <td colSpan="2">{item.description}</td>
                                                                    <td colSpan="1">
                                                                        {isEditable ?
                                                                            <Tooltip title="Delete">
                                                                                <img src={DeleteIcon} alt="delete" onClick={() => deleteRowDiagnosis(item.icdCode, item.description)} />
                                                                            </Tooltip>
                                                                            : ''}
                                                                    </td>
                                                                </tr>
                                                            })
                                                            : null
                                                    }
                                                </table>
                                            </Grid>

                                            {selectedClaimCategory == 'Dental' ?
                                                <>
                                                    <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "0px 0px 0px 15px" }}>
                                                        <FormGroupTitle>Missing Teeth</FormGroupTitle>
                                                        <Grid container direction="row" lg={12}>
                                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                                <table className={classes.icdCodeTable}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan="16">Permanent</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <div className={classes.smallCheckboxtwo}>
                                                                                {missingTeethPermenant.map((item, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div>
                                                                                                <CheckboxField
                                                                                                    color="primary"
                                                                                                    id="missingTeethPermenant"
                                                                                                    name={item.name}
                                                                                                    value={item.value}
                                                                                                    //options={missingTeethPermenant}
                                                                                                    label={item.toothNumber}
                                                                                                    labelPlacement="top"
                                                                                                    checked={item.value}
                                                                                                    onChange={handleDentalPermanentCheckedChange}
                                                                                                />
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                }
                                                                            </div>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={6} lg={6} style={{ paddingLeft: "20px" }}>
                                                                <table className={classes.icdCodeTable}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan="16">Primary</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <div className={classes.smallCheckbox} style={{ width: "205px" }}>
                                                                                {missingTeethPrimary.map((item, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div>
                                                                                                <CheckboxField
                                                                                                    color="primary"
                                                                                                    id="missingTeethPrimary"
                                                                                                    name={item.name}
                                                                                                    value={item.value}
                                                                                                    checked={item.value}
                                                                                                    label={item.toothNumber}
                                                                                                    labelPlacement="top"
                                                                                                    onChange={handleDentalPrimaryCheckedChange}
                                                                                                />
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                }
                                                                            </div>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </> : ''
                                            }

                                        </Grid>

                                        <Grid container direction="row" lg={12}>
                                            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                                                {isEditable ? state.lstsuperBillDiagnosis == null || state.lstsuperBillDiagnosis.filter(tmprm => tmprm.isDeleted != true).length === 0 ?
                                                    <span className={classes.addDiagnosis} title="Add Diagnosis(s)" onClick={() => setShowHideDiagnosis(!showHideDiagnosis)} >
                                                        <img src={AddIcon} alt="Add Diagnosis(s)" />
                                                        Add Diagnosis (s)
                                                    </span> :
                                                    <span className={classes.editDiagnosis} title="Edit Diagnosis(s)" onClick={() => setShowHideDiagnosis(!showHideDiagnosis)} >
                                                        <img src={EditIcon} alt="Edit Diagnosis(s)" style={{ width: "17px", height: "17px", marginBottom: "-3px" }} />
                                                        Edit Diagnosis (s)
                                                    </span> : ''
                                                }
                                                {errorMessages.errorBillingDiagnosisLength && state.lstsuperBillDiagnosis.filter(tmprm => tmprm.isDeleted != true).length === 0 ? <FormHelperText id='addDiagnosis' style={{ color: "red" }} >
                                                    Please select at least one diagnose
                                                </FormHelperText> : ('')}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                                                {showHideDiagnosis ?
                                                    <SearchList
                                                        name="icdCode"
                                                        value={state.icdCode}
                                                        searchTerm={state.icdName}
                                                        code="diagnosis"
                                                        apiUrl="ddl/loadItems"
                                                        onChangeValue={(name, item) => handleSearchDiagnosisChange(name, item)}
                                                        placeholderTitle="Search Diagnosis"
                                                    /> : ""
                                                }
                                            </Grid>
                                        </Grid>

                                        <FormGroupTitle>Procedures</FormGroupTitle>
                                        {state.claimCategory == 'Institutional' ?


                                            <Grid container direction="row">
                                                <Label size={2} title="Use Description from"></Label>
                                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10} style={{ marginBottom: "10px" }}>
                                                    <RadioboxField
                                                        id="useDescriptionFrom"
                                                        name="useDescriptionFrom"
                                                        labelPlacement="end"
                                                        onChange={handleChange}
                                                        options={procedureOptions}
                                                        value={state.useDescriptionFrom}
                                                    />

                                                </Grid>
                                            </Grid>
                                            : ''}

                                        <Grid container direction="row" >
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <table className={classes.proceduresTable}>
                                                    {state.lstsuperBillProcedures && state.lstsuperBillProcedures.length > 0 ?
                                                        <thead>
                                                            <tr align="center">
                                                                <th colSpan={state.claimCategory == 'Institutional' ? "3" : "2"}></th>

                                                                {state.claimCategory == 'Dental' ?
                                                                    ''
                                                                    : <th colSpan="1" align="center">Modifiers</th>
                                                                }
                                                                {state.claimCategory == 'Dental' ?
                                                                    <th colSpan="5"></th> : <th colSpan="2"></th>
                                                                }
                                                                <th colSpan="1" align="center">Dx Pointers</th>
                                                                <th colSpan="7"></th>
                                                            </tr>
                                                            <tr>
                                                                {state.claimCategory == 'Institutional' ?
                                                                    <th style={{ width: '190px' }}>Rev Code</th> : ''}
                                                                <th style={{ width: '100px' }}>HCPCS Code</th>
                                                                <th style={{ width: '270' }}>Description</th>

                                                                {/*{state.claimCategory == 'Dental' ?*/}
                                                                {/*    ''*/}
                                                                {/*    :*/}
                                                                <th>
                                                                    <span className={classes.subTh}>M1</span>
                                                                    <span className={classes.subTh}>M2</span>
                                                                    <span className={classes.subTh}>M3</span>
                                                                    <span className={classes.subTh}>M4</span>
                                                                </th>
                                                                {/*}*/}

                                                                <th>Service Date</th>
                                                                <th>NDC Codes</th>

                                                                {state.claimCategory == 'Dental' ?
                                                                    <> <th>Area of Oral Cavity</th>
                                                                        <th>Tooth Surface</th>
                                                                        <th>Teeth Num(s)</th>
                                                                    </>
                                                                    : ''
                                                                }

                                                                <th>
                                                                    <span className={classes.subTh}>1</span>
                                                                    <span className={classes.subTh}>2</span>
                                                                    <span className={classes.subTh}>3</span>
                                                                    <span className={classes.subTh}>4</span>
                                                                </th>
                                                                <th>Unit</th>
                                                                <th className={classes.numberCenter}>Price</th>
                                                                <th className={classes.numberRight}>Billed</th>

                                                                {state.claimCategory == 'Dental' ?
                                                                    ''
                                                                    :
                                                                    <>
                                                                        <th className={classes.numberRight}>Pt Paid</th>
                                                                        <th className={classes.numberRight}>Ins Bal</th>
                                                                    </>
                                                                }


                                                                {/*<th>Status</th>*/}
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        : null}
                                                    <tbody>
                                                        {state.lstsuperBillProcedures && state.lstsuperBillProcedures.length > 0 ?
                                                            state.lstsuperBillProcedures.map((item, i) => {
                                                                if (item.isDeleted == true) {
                                                                    return '';
                                                                }
                                                                else {
                                                                    totalPrice = totalPrice + (isNaN(item.price) || !item.price ? 0 : parseFloat(item.price));
                                                                    totalBilled = totalBilled + (isNaN(item.billed) || !item.billed ? 0 : parseFloat(item.billed));
                                                                    totalPtPaid = totalPtPaid + (isNaN(item.patientPaid) || item.patientPaid == null ? 0 : parseFloat(item.patientPaid));
                                                                    totalInsBalance = totalInsBalance + (isNaN(item.insBalance) || item.insBalance == null ? 0 : parseFloat(item.insBalance));


                                                                    return <>
                                                                        <tr>
                                                                            {state.claimCategory == 'Institutional' ?
                                                                                <td>
                                                                                    <SearchListField
                                                                                        id={i}
                                                                                        name="revCode"
                                                                                        value={item.revCode}
                                                                                        searchTerm={item.revCode}
                                                                                        className={classes.revCodeList}
                                                                                        code="get_revenue_code"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                        placeholderTitle="Search"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    /></td> : ''}
                                                                            <td>{item.code}</td>
                                                                            <td style={{ width: "300px" }}>{state.useDescriptionFrom == 'RevenueCodes' ? item.revCodeName : item.description}</td>
                                                                            {/*{state.claimCategory == 'Dental' ?*/}
                                                                            {/*    ''*/}
                                                                            {/*    :*/}
                                                                            <td className={classes.modifierTd}>
                                                                                <span className={classes.subTd}>
                                                                                    {/* <input type="text" name="m1" value={item.m1} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /> */}
                                                                                    <SearchListField
                                                                                        id={i}
                                                                                        name="m1"
                                                                                        value={item.m1}
                                                                                        searchTerm={item.m1Name}
                                                                                        code="get_modifiers_codes"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                        placeholderTitle="M1"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    />
                                                                                </span>
                                                                                <span className={classes.subTd}>
                                                                                    {/* <input type="text" name="m2" value={item.m2} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /> */}
                                                                                    <SearchListField
                                                                                        id={i}
                                                                                        name="m2"
                                                                                        value={item.m2}
                                                                                        searchTerm={item.m2Name}
                                                                                        code="get_modifiers_codes"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                        placeholderTitle="M2"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    />
                                                                                </span>
                                                                                <span className={classes.subTd}>
                                                                                    {/* <input type="text" name="m3" value={item.m3} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /> */}
                                                                                    <SearchListField
                                                                                        id={i}
                                                                                        name="m3"
                                                                                        value={item.m3}
                                                                                        searchTerm={item.m3Name}
                                                                                        code="get_modifiers_codes"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                        placeholderTitle="M3"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    />
                                                                                </span>
                                                                                <span className={classes.subTd}>
                                                                                    {/* <input type="text" name="m4" value={item.m4} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /> */}
                                                                                    <SearchListField
                                                                                        id={i}
                                                                                        name="m4"
                                                                                        value={item.m4}
                                                                                        searchTerm={item.m4Name}
                                                                                        code="get_modifiers_codes"
                                                                                        apiUrl="ddl/loadItems"
                                                                                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                        placeholderTitle="M4"
                                                                                        MaxLength="2"
                                                                                        popperWidth={true}
                                                                                    />
                                                                                </span>
                                                                            </td>
                                                                            {/*}*/}

                                                                            <td className={classes.serviceDateTd}>
                                                                                <span className={classes.dateTd}><input type="date" name="serviceDateFrom" value={item.serviceDateFrom} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /></span>
                                                                                <span className={classes.dateTd}><input type="date" name="serviceDateTo" value={item.serviceDateTo} id={i} onChange={handleChangeDynamic} className={classes.tableInput} /></span>
                                                                            </td>
                                                                            <td>
                                                                                <div className={classes.NdcTd}>
                                                                                    <span className={classes.NDCCodeTd}>{item.ndcCode}</span>
                                                                                    {
                                                                                        isEditable ?
                                                                                            !!item.ndcCode ?
                                                                                                <Tooltip title="Edit NDC Codes">
                                                                                                    <span className={classes.editNDC}>
                                                                                                        <img src={EditIcon} onClick={() => AddNdcCodes(item.code, i, item.ndcCode)} alt="Edit Codes" />
                                                                                                    </span>
                                                                                                </Tooltip> :
                                                                                                <Tooltip title="Add NDC Codes">
                                                                                                    <span className={classes.addNDC}>
                                                                                                        <img src={AddIcon} onClick={() => AddNdcCodes(item.code, i, item.ndcCode)} alt="Add Codes" />
                                                                                                    </span>
                                                                                                </Tooltip> : ""
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                            {state.claimCategory == 'Dental' ?
                                                                                <>
                                                                                    <td>
                                                                                        <SearchListField
                                                                                            id={i}
                                                                                            name="areaofCavityCode"
                                                                                            value={item.areaofCavityCode}
                                                                                            searchTerm={item.areaofCavityCode}
                                                                                            className={classes.cavityCode}
                                                                                            code="get_oral_cavity_area"
                                                                                            apiUrl="ddl/loadItems"
                                                                                            onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                                                                                            placeholderTitle="Search"
                                                                                            MaxLength="2"
                                                                                            popperWidth={true}
                                                                                            onFocus={handleSelectFocus}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="text"
                                                                                            onFocus={handleSelectFocus}
                                                                                            className={classes.tableInput}
                                                                                            style={{ textAlign: 'left' }}
                                                                                            name="toothSurfaceCode"
                                                                                            id={i}
                                                                                            value={item.toothSurfaceCode}
                                                                                            onChange={handleChangeDynamic}
                                                                                            maxLength="50"
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="text"
                                                                                            onFocus={handleSelectFocus}
                                                                                            className={classes.tableInput}
                                                                                            style={{ textAlign: 'left' }}
                                                                                            name="toothNumbers"
                                                                                            id={i}
                                                                                            value={item.toothNumbers}
                                                                                            onChange={handleChangeDynamic}
                                                                                            maxLength="2"
                                                                                        />
                                                                                    </td>
                                                                                </> : ''
                                                                            }

                                                                            <td className={classes.dxCodeTd}>
                                                                                <span className={classes.subTd}><input onFocus={handleSelectFocus} type="text" name="dxPointer1" value={item.dxPointer1} id={i} onChange={handleChangeDynamic} className={classes.tableInput} autocomplete="off" /></span>
                                                                                <span className={classes.subTd}><input onFocus={handleSelectFocus} type="text" name="dxPointer2" value={item.dxPointer2} id={i} onChange={handleChangeDynamic} className={classes.tableInput} autocomplete="off" /></span>
                                                                                <span className={classes.subTd}><input onFocus={handleSelectFocus} type="text" name="dxPointer3" value={item.dxPointer3} id={i} onChange={handleChangeDynamic} className={classes.tableInput} autocomplete="off" /></span>
                                                                                <span className={classes.subTd}><input onFocus={handleSelectFocus} type="text" name="dxPointer4" value={item.dxPointer4} id={i} onChange={handleChangeDynamic} className={classes.tableInput} autocomplete="off" /></span>
                                                                            </td>
                                                                            <td className={classes.numberRight}>
                                                                                <span className={classes.unitTd}><input onFocus={handleSelectFocus} name="unit" value={isNaN(item.unit) ? 1 : item.unit} id={i} onChange={handleChangeDynamic} type="number" step="0.1" className={classes.tableInput} maxLength="5" /></span>

                                                                            </td>

                                                                            <td className={classes.numberRight}>
                                                                                <input onFocus={handleSelectFocus} name="price" value={isNaN(item.price) ? 0 : item.price} id={i} onChange={handleChangeDynamic} type="number" step="0.1" className={classes.tableInput} maxLength="5" />
                                                                            </td>
                                                                            <td className={classes.numberRight}>{isNaN(item.billed) || !item.billed ? numberFormat(0) : numberFormat(parseFloat(item.billed))}</td>
                                                                            {state.claimCategory == 'Dental' ? '' :
                                                                                <>
                                                                                    <td className={classes.numberRight}>{isNaN(item.patientPaid) || item.patientPaid == null ? numberFormat(0) : numberFormat(parseFloat(item.patientPaid))}</td>
                                                                                    <td className={classes.numberRight}>{isNaN(item.insBalance) || item.insBalance == null ? numberFormat(0) : numberFormat(parseFloat(item.insBalance))}</td>
                                                                                </>
                                                                            }
                                                                            {isEditable ? <td style={{ textAlign: "center" }}>
                                                                                {/*//<span className={classes.dollarTd}>$</span>*/}
                                                                                <Tooltip title="Delete">
                                                                                    < img className={classes.deleteTd} src={DeleteIcon} alt="delete" onClick={() => deleteRowProcedure(item.code, item.description, item.eobClaimId, item.superbillProcedureId)} />
                                                                                </Tooltip>
                                                                            </td> : ""}

                                                                        </tr>
                                                                    </>
                                                                }
                                                            })
                                                            : null}

                                                        <tr>
                                                            <td colSpan="13">
                                                                <div style={{ display: "flex", width: "50%" }}>
                                                                    {isEditable ? state.lstsuperBillProcedures == null || state.lstsuperBillProcedures.filter(tmprm => tmprm.isDeleted != true).length === 0 ?
                                                                        <span className={classes.addProcedures} title="Add Procedure(s)" onClick={() => setShowHideProceduresDialog(!showHideProceduresDialog)} >
                                                                            <img id='addProcedures' src={AddIcon} alt="Add Procedure(s)" />
                                                                            Add Procedure (s)
                                                                        </span> :
                                                                        <span className={classes.editProcedures} title="Edit Procedure(s)" onClick={() => setShowHideProceduresDialog(!showHideProceduresDialog)} >
                                                                            <img src={EditIcon} alt="Edit Procedure(s)" style={{ width: "17px", height: "17px", marginBottom: "-3px" }} />
                                                                            Edit Procedure (s)
                                                                        </span> : ""
                                                                    }

                                                                </div>
                                                                <div>
                                                                    {errorMessages.errorBillingProcedureLength && state.lstsuperBillProcedures.filter(tmprm => tmprm.isDeleted != true).length === 0 ? <FormHelperText id='addProcedures' style={{ color: "red" }} >
                                                                        Please select at least one procedure
                                                                    </FormHelperText> : ('')}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {state.lstsuperBillProcedures && state.lstsuperBillProcedures.length > 0 ?
                                                            <tr>
                                                                <td className={classes.tdBold} colSpan={state.claimCategory == 'Dental' ? '10' : state.claimCategory == 'Professional' ? '7' : '8'} style={{ textAlign: "right" }}>
                                                                    Totals:
                                                                </td>
                                                                <td className={classes.tdBold}>
                                                                    {isNaN(totalPrice) || !totalPrice ? numberFormat(0) : numberFormat(parseFloat(totalPrice))}
                                                                </td>
                                                                <td className={classes.tdBold}>
                                                                    {isNaN(totalBilled) || !totalBilled ? numberFormat(0) : numberFormat(parseFloat(totalBilled))}
                                                                </td>
                                                                {state.claimCategory == 'Dental' ? '' :
                                                                    <>
                                                                        <td className={classes.tdBold}>
                                                                            {isNaN(totalPtPaid) || totalPtPaid == null ? numberFormat(0) : numberFormat(parseFloat(totalPtPaid))}
                                                                        </td>
                                                                        <td className={classes.tdBold}>
                                                                            {isNaN(totalInsBalance) || totalInsBalance == null ? numberFormat(0) : numberFormat(parseFloat(totalInsBalance))}
                                                                        </td>
                                                                    </>
                                                                }
                                                                <td colSpan="1">

                                                                </td>
                                                            </tr>
                                                            : null}
                                                    </tbody>

                                                </table>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <div className={classes.footer}>

                                        {/* <div className={classes.footerRight}> */}
                                        {/* <Grid lg={12} container justify="center" alignContent="center" > */}
                                        <FooterBtn className={classes.footerBtn}>
                                            {
                                                saveLoading ?
                                                    <FormBtn id="loadingSave" >Save </FormBtn> :
                                                    <FormBtn id="save" disabled={!isEditable} onClick={Save} >Save </FormBtn>
                                            }
                                            {
                                                claimID > 0 ?
                                                    deleteLoading ?
                                                        <FormBtn id={"loadingDelete"} size="medium">Delete</FormBtn> : null
                                                    /* <FormBtn id={"delete"} onClick={deleteRecord} size="medium">Delete</FormBtn> */
                                                    : null
                                            }
                                            <FormBtn id={"resetBtn"} size="medium" disabled={!isEditable} onClick={() => { cleanValuesFields(true) }}>Reset </FormBtn>
                                            {claimID > 0 ? <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn> : null}

                                        </FooterBtn>
                                        {/* </Grid> */}
                                        {/* </div> */}
                                    </div>
                                </>
                            ) : ''
                        }
                    </TabPanel>

                    <TabPanel value={tabvalue} index={1} className={classes.claimTabPanel}>

                        {
                            tabvalue == 1 ? (
                                <>
                                    <InformationCode
                                        claimSuperBillId={claimID}
                                        saveBothTabs={(infoData) => { saveBothTabs(infoData) }}
                                    ></InformationCode>
                                </>
                            ) : ''
                        }

                    </TabPanel>

                </div>


                {/* </Scrollbars> */}
                {/* </div> */}

            </div>
            {addNoteDialog ? <AddNote showHideDialog={addNoteDialog} handleClose={addNoteDialogClose} claimSuperBillID={claimID} /> : ""}
            {showHideCloneClaimDialog ? <CloneClaimDialog claimSuperBillId={claimID} showHideDialog={showHideCloneClaimDialog} handleClose={() => setShowHideCloneClaimDialog(false)} handleClaimCloneSave={(value) => handleCloneClaimSave(value)} /> : ""}
            {showHideNdcCodeDialog ? <AddNdcCode showHideDialog={showHideNdcCodeDialog} handleClose={addNdcCodeDialogClose} proCodeForNdc={proCodeForNdc} ndcCode={ndcCode}
                stateNdcCode={ndclistPopUp} handleSave={(value) => handleNdcSave(value)} /> : ""}
            {showHideDiagnosis ? <AddDiagnosisDialog patientId={patID} encounterId={encID} dialogOpenClose={showHideDiagnosis} handleClose={() => setShowHideDiagnosis(false)} handleSaveDiagnosis={(value) => handleDiagnosisSave(value)} stateDiagnosis={state.lstsuperBillDiagnosis} /> : ""}
            {showHideProceduresDialog ?
                <AddProcedureDialog
                    dialogOpenClose={showHideProceduresDialog}
                    handleClose={() => setShowHideProceduresDialog(false)}
                    encounterId={encID}
                    patientId={patID}
                    handleSaveProcedures={(value, ndcList) => handleProceduresSave(value, ndcList)}
                    stateProcedures={state.lstsuperBillProcedures}
                    propAppontmentDate={state.appontmentDate}
                    feeSchedulerProcedures={arrfeeScheduler}
                    billingPrfileId={state.billingProfileId}
                />
                : ""}
            {
                showAddPaymentDialog ?
                    <AddPatientPaymentDialog
                        showHideDialog={showAddPaymentDialog}
                        handleClose={addShowAddPaymentDialogClose} screenOrder="claimScreen" claimId={claimID} patientId={patID} handleUnallocated={(value, claimId) => handleUnallocatedSave(value, claimId)} /> : ""
            }
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

            <LogDialog
                code="claimsuperbill"
                id={claimID}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            {addEobDialogOpenClose ?
                <AddEobDialog showHideDialog={addEobDialogOpenClose} handleClose={() => setAddEobDialogOpenClose(false)} claimId={claimID} />
                : null}
            {appointmentDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={appointmentDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Appointments</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeAppointment}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Appointment claim={true} dataId={externalModulesCall.patientAppointmentId} appPatientName={externalModulesCall.patientName} />
                                    {/* dataId={dataId} patientId={patientId} newAppDate={newAppDate} newAppDateTime={newAppDateTime} newAppSlotTime={newAppSlotTime} appPatientName={appPatientName} */}
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
            {encounterDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={encounterDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    fullWidth={true}
                >
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.header} id="draggable-dialog-title">
                                <FormGroupTitle>Encounter</FormGroupTitle>
                                <span className={classes.crossButton} onClick={closeEncounter}><img src={CloseIcon} /></span>

                            </div>
                            <div className={classes.content}>
                                <Scrollbars style={{ minHeight: 550 }} >
                                    <Encounter ulId={externalModulesCall.userLocationId} pId={patID} appId={externalModulesCall.patientAppointmentId} claim={true} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
            {claimCategoryDialogOpenClose ?
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={claimCategoryDialogOpenClose}
                    PaperComponent={DraggableComponent}
                    maxWidth={"lg"}>
                    <Divider />
                    <div className={classes.dialogcontent}>
                        <div className={classes.box}>
                            <div className={classes.claimTypeBody}>
                                <div className={classes.header} id="draggable-dialog-title">
                                    <FormGroupTitle>Claim Type</FormGroupTitle>
                                    <span className={classes.crossButton} onClick={handleClaimCategorySelection}><img src={CloseIcon} /></span>

                                </div>
                                <div>
                                    <Grid container direction="row" lg={12}>
                                        <Label title="Claim Type" size={3} mandatory={true} />
                                        <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>

                                            <RadioboxField
                                                id="claimCategory"
                                                name="claimCategory"
                                                value={state.claimCategory}
                                                options={claimCategoryOptions}
                                                onChange={handleChange}
                                            />

                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.footer}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }}>
                                        <FormBtn id="noIcon" onClick={handleClaimCategorySelection} disabled={isLoading}>Ok </FormBtn>
                                    </Grid>

                                </div>

                            </div>
                        </div>
                    </div>
                </Dialog >
                : null}
        </>
    )
}

export default withSnackbar(AddNewClaim)