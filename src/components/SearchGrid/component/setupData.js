import React from "react";
import { Tag } from "antd";
import { LinkS } from "../../UiElements/UiElements";
import { Icon, Typography } from "@material-ui/core";
import { AttachFile as AttachFileIcon, Check as CheckIcon } from '@material-ui/icons';
import { formatDate, formatCurrency, formatDateTime } from '../../../components/Common/Extensions';
import EraIcon from "../../../images/icons/eraIcon.png"
import moment from "moment";
import { Tooltip } from 'antd';
export const data = {
    MedicationColumns: [
        {
            title: '',
            dataIndex: 'medicationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Medication',
            dataIndex: 'drugName',
            className: "max350",
            sorter: (a, b) => {
                a = a.drugName != null ? a.drugName.toString() : "";
                b = b.drugName != null ? b.drugName.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Rxnorm',
            dataIndex: 'rxnorm',
            sorter: (a, b) => {
                a = a.rxnorm != null ? a.rxnorm.toString() : "";
                b = b.rxnorm != null ? b.rxnorm.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Type',
            dataIndex: 'medPresType',
            sorter: (a, b) => {
                a = a.medPresType != null ? a.medPresType.toString() : "";
                b = b.medPresType != null ? b.medPresType.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Dispense Quantity',
            dataIndex: 'dispenseQuantity',
             sorter: (a, b) => {
                a = a.dispenseQuantity != null ? a.dispenseQuantity.toString() : "";
                b = b.dispenseQuantity != null ? b.dispenseQuantity.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Refills',
            dataIndex: 'refillNumber',
            sorter: (a, b) => {
                a = a.refillNumber != null ? a.refillNumber.toString() : "";
                b = b.refillNumber != null ? b.refillNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'SIG',
        //    dataIndex: 'sigNotes',
        //    width: 100
        //},
        {
            title: 'Order Status',
            dataIndex: 'medicationOrderStatusCode',
            sorter: (a, b) => {
                a = a.medicationOrderStatusCode != null ? a.medicationOrderStatusCode.toString() : "";
                b = b.medicationOrderStatusCode != null ? b.medicationOrderStatusCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'prescribedDatetime',
            sorter: (a, b) => {
                a = a.prescribedDatetime != null ? a.prescribedDatetime.toString() : "";
                b = b.prescribedDatetime != null ? b.prescribedDatetime.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Updated',
            dataIndex: 'updatedDate',
            sorter: (a, b) => {
                a = a.updatedDate != null ? a.updatedDate.toString() : "";
                b = b.updatedDate != null ? b.updatedDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'medicationAction',
            align: "center",
            className: "action"
        }
    ],
    MedicareHistorySurescripts: [
        {
            title: 'No.',
            dataIndex: 'medicationId',
            className: "width120",
            sorter: (a, b) => {
                a = a.medicationId != null ? a.medicationId.toString() : "";
                b = b.medicationId != null ? b.medicationId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Drug Description',
            dataIndex: 'description',
            className: "width180",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Diagnosis',
            dataIndex: 'diagnosis',
            className: "width180",
            sorter: (a, b) => {
                a = a.diagnosis != null ? a.diagnosis.toString() : "";
                b = b.diagnosis != null ? b.diagnosis.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Flags',
            dataIndex: 'flags',
            className: "width180",
            sorter: (a, b) => {
                a = a.flags != null ? a.flags.toString() : "";
                b = b.flags != null ? b.flags.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Fill date',
            dataIndex: 'lastFillDate',
            sorter: (a, b) => {
                a = a.lastFillDate != null ? a.lastFillDate.toString() : "";
                b = b.lastFillDate != null ? b.lastFillDate.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',

        }
    ],
    CDSRules: [
        {
            title: 'ID',
            dataIndex: 'ruleId',
            sorter: (a, b) => {
                a = a.ruleId != null ? a.ruleId.toString() : "";
                b = b.ruleId != null ? b.ruleId.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Description',
            dataIndex: 'description',
            className: "width250",
            render: text => {
                return <Tooltip title={text}>{text.length > 30 ? text.substring(0, 30) + '...' : text}</Tooltip>;
            },
            sorter: (a, b) => {
                a = a.description != null ? a.description : "";
                b = b.description != null ? b.description : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Funding',
            dataIndex: 'fundingSource',
            sorter: (a, b) => {
                a = a.fundingSource != null ? a.fundingSource : "";
                b = b.fundingSource != null ? b.fundingSource : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Bibliography',
            dataIndex: 'bibliography',
            sorter: (a, b) => {
                a = a.bibliography != null ? a.bibliography : "";
                b = b.bibliography != null ? b.bibliography : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            sorter: (a, b) => {
                a = a.releaseDate != null ? a.releaseDate : "";
                b = b.releaseDate != null ? b.releaseDate : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Active',
            dataIndex: 'active',
            className: "width50"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width50"
        },

    ],
    emergencyAccess: [
        {
            title: 'Type',
            dataIndex: 'emergencyAccessType',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessType != null ? a.emergencyAccessType : "";
                b = b.emergencyAccessType != null ? b.emergencyAccessType : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'emergencyAccessName',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessName != null ? a.emergencyAccessName : "";
                b = b.emergencyAccessName != null ? b.emergencyAccessName : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Location',
            dataIndex: 'emergencyAccessLocation',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessLocation != null ? a.emergencyAccessLocation : "";
                b = b.emergencyAccessLocation != null ? b.emergencyAccessLocation : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'emergencyAccessEmail',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessEmail != null ? a.emergencyAccessEmail : "";
                b = b.emergencyAccessEmail != null ? b.emergencyAccessEmail : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Cell',
            dataIndex: 'emergencyAccessCell',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessCell != null ? a.emergencyAccessCell : "";
                b = b.emergencyAccessCell != null ? b.emergencyAccessCell : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'emergencyAccessStatus',
            className: "width50",
            sorter: (a, b) => {
                a = a.emergencyAccessStatus != null ? a.emergencyAccessStatus : "";
                b = b.emergencyAccessStatus != null ? b.emergencyAccessStatus : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            className: "width50"
        },

    ],
    SystemWideCDSRuls: [
        {
            title: 'ID',
            dataIndex: 'ruleId',
            sorter: (a, b) => {
                a = a.ruleId != null ? a.ruleId.toString() : "";
                b = b.ruleId != null ? b.ruleId.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Description',
            dataIndex: 'description',
            render: text => {
                return <Tooltip title={text}>{text.length > 30 ? text.substring(0, 30) + '...' : text}</Tooltip>;
            },
            sorter: (a, b) => {
                a = a.description != null ? a.description : "";
                b = b.description != null ? b.description : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Funding',
            dataIndex: 'fundingSource',
            sorter: (a, b) => {
                a = a.fundingSource != null ? a.fundingSource : "";
                b = b.fundingSource != null ? b.fundingSource : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Bibliography',
            dataIndex: 'bibliography',
            sorter: (a, b) => {
                a = a.bibliography != null ? a.bibliography : "";
                b = b.bibliography != null ? b.bibliography : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            sorter: (a, b) => {
                a = a.releaseDate != null ? a.releaseDate : "";
                b = b.releaseDate != null ? b.releaseDate : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Active',
            dataIndex: 'active',
        },


    ],
    PatientContactCode: [
        {
            title: 'Name',
            dataIndex: 'contactName',
            sorter: (a, b) => {
                a = a.contactName != null ? a.contactName.toString() : "";
                b = b.contactName != null ? b.contactName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Relationship',
            dataIndex: 'relationshipCode',
            sorter: (a, b) => {
                a = a.relationshipCode != null ? a.relationshipCode.toString() : "";
                b = b.relationshipCode != null ? b.relationshipCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Mobile Phone',
            dataIndex: 'cellPhone',
              sorter: (a, b) => {
                a = a.cellPhone != null ? a.cellPhone.toString() : "";
                b = b.cellPhone != null ? b.cellPhone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Primary Phone',
            dataIndex: 'primaryPhone',
            sorter: (a, b) => {
                a = a.primaryPhone != null ? a.primaryPhone.toString() : "";
                b = b.primaryPhone != null ? b.primaryPhone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Guardian',
            dataIndex: 'isLegalGuardian',
            sorter: (a, b) => {
                a = a.isLegalGuardian != null ? a.isLegalGuardian.toString() : "";
                b = b.isLegalGuardian != null ? b.isLegalGuardian.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Guarantor',
            dataIndex: 'isGurantor',
            sorter: (a, b) => {
                a = a.isGurantor != null ? a.isGurantor.toString() : "";
                b = b.isGurantor != null ? b.isGurantor.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Primary Phone',
        //    dataIndex: 'primaryContactTypeCode',
        //},
        {
            title: 'Language',
            dataIndex: 'prefferedLanguageId',
            sorter: (a, b) => {
                a = a.prefferedLanguageId != null ? a.prefferedLanguageId.toString() : "";
                b = b.prefferedLanguageId != null ? b.prefferedLanguageId.toString() : "";
                return a.localeCompare(b);
            },
            
            
        },
        {
            title: 'Action',
            dataIndex: 'pContactAction',
        },
    ],
    PatientMessage: [
        {
            title: 'Date / Time',
            dataIndex: 'messageDate',
            className: "width100"
        },
        {
            title: 'From',
            dataIndex: 'from',
            className: "width100",
            sorter: (a, b) => {
                a = a.from != null ? a.from.toString() : "";
                b = b.from != null ? b.from.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Title',
            dataIndex: 'messageSubject',
            className: "width165",
            sorter: (a, b) => {
                a = a.messageSubject != null ? a.messageSubject.toString() : "";
                b = b.messageSubject != null ? b.messageSubject.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Message',
            dataIndex: 'messageBody',
            className: "MessageGridTruncate",
            sorter: (a, b) => {
                a = a.messageBody != null ? a.messageBody.toString() : "";
                b = b.messageBody != null ? b.messageBody.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'messageAction',
            className: "width50"
        },
    ],
    AllergyColumns: [
        {
            title: '',
            dataIndex: 'allergyId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Allergy',
            dataIndex: 'specificDrugAllergy',
            sorter: (a, b) => {
                a = a.specificDrugAllergy != null ? a.specificDrugAllergy.toString() : "";
                b = b.specificDrugAllergy != null ? b.specificDrugAllergy.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Reaction',
            dataIndex: 'reactionCode',
            sorter: (a, b) => {
                a = a.reactionCode != null ? a.reactionCode.toString() : "";
                b = b.reactionCode != null ? b.reactionCode.toString() : "";
                return a.localeCompare(b);
            },


        },

        {
            title: 'Rxnorm',
            dataIndex: 'rxnorm',
            sorter: (a, b) => {
                a = a.rxnorm != null ? a.rxnorm.toString() : "";
                b = b.rxnorm != null ? b.rxnorm.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Status',
            dataIndex: 'allergyStatusCode',
               sorter: (a, b) => {
                a = a.allergyStatusCode != null ? a.allergyStatusCode.toString() : "";
                b = b.allergyStatusCode != null ? b.allergyStatusCode.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Updated',
            dataIndex: 'updateDate',
            sorter: (a, b) => {
                a = a.updateDate != null ? a.updateDate.toString() : "";
                b = b.updateDate != null ? b.updateDate.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    ImunizationColumns: [
        {
            title: '',
            dataIndex: 'imunizationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Vaccine',
            dataIndex: 'vaccine',
            sorter: (a, b) => {
                a = a.vaccine != null ? a.vaccine.toString() : "";
                b = b.vaccine != null ? b.vaccine.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Consent Form',
            dataIndex: 'link',
            sorter: (a, b) => {
                a = a.link != null ? a.link.toString() : "";
                b = b.link != null ? b.link.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Ordered By',
            dataIndex: 'orderedBy',
            sorter: (a, b) => {
                a = a.orderedBy != null ? a.orderedBy.toString() : "";
                b = b.orderedBy != null ? b.orderedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Administrated By',
            dataIndex: 'adminBy',
            sorter: (a, b) => {
                a = a.adminBy != null ? a.adminBy.toString() : "";
                b = b.adminBy != null ? b.adminBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'immStatusCode',
            className: "width100",
            sorter: (a, b) => {
                a = a.immStatusCode != null ? a.immStatusCode.toString() : "";
                b = b.immStatusCode != null ? b.immStatusCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    DiagnosisColumns: [
        {
            title: '',
            dataIndex: 'diagnosisId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Diagnosis',
            dataIndex: 'icdName',
            className: "MinMaxwidth300",
            sorter: (a, b) => {
                a = a.MinMaxwidth300 != null ? a.MinMaxwidth300.toString() : "";
                b = b.MinMaxwidth300 != null ? b.MinMaxwidth300.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'ICD-CM Code',
            dataIndex: 'icdCode',
            className: "width130",
             sorter: (a, b) => {
                a = a.icdCode != null ? a.icdCode.toString() : "";
                b = b.icdCode != null ? b.icdCode.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'SNOMED',
            dataIndex: 'snomedCtCode',
            className: "width130",
            sorter: (a, b) => {
                a = a.snomedCtCode != null ? a.snomedCtCode.toString() : "";
                b = b.snomedCtCode != null ? b.snomedCtCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date Diagnosed',
            dataIndex: 'diagnosisDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.diagnosisDate != null ? a.diagnosisDate.toString() : "";
                b = b.diagnosisDate != null ? b.diagnosisDate.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Date Resolved',
            dataIndex: 'onsetDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.onsetDate != null ? a.onsetDate.toString() : "";
                b = b.onsetDate != null ? b.onsetDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'statusCode',
             sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode.toString() : "";
                b = b.statusCode != null ? b.statusCode.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Updated',
            dataIndex: 'updateDate',
            sorter: (a, b) => {
                a = a.updateDate != null ? a.updateDate.toString() : "";
                b = b.updateDate != null ? b.updateDate.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"

        }
    ],
    ChiefComplaintListColumns: [
        {
            title: '',
            dataIndex: 'chiefComplaintId',
            className: "custom-grid-hide-col",
            key: 'chiefComplaintId',
        },
        {
            title: 'Chief Complaint',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'CCAction',
            key: 'CCAction',
            className: "action-align-right",
        }
    ],
    TasksListColumns: [
        {
            title: '',
            dataIndex: 'taskId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date',
            dataIndex: 'remiderDateTime',
            sorter: (a, b) => {
                a = a.remiderDateTime != null ? a.remiderDateTime : "";
                b = b.remiderDateTime != null ? b.remiderDateTime : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName : "";
                b = b.patientName != null ? b.patientName : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    InsuranceColumns: [
        {
            title: '',
            dataIndex: 'patientInsuranceId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Payer',
            dataIndex: 'payerNameOrder',
            sorter: (a, b) => {
                a = a.payerNameOrder != null ? a.payerNameOrder.toString() : "";
                b = b.payerNameOrder != null ? b.payerNameOrder.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Plan Type',
            dataIndex: 'planTypeName',
            sorter: (a, b) => {
                a = a.planTypeName != null ? a.planTypeName.toString() : "";
                b = b.planTypeName != null ? b.planTypeName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Effective From',
            dataIndex: 'effectiveFromDate',
            className: "width130",
            sorter: (a, b) => {
                a = a.effectiveFromDate != null ? a.effectiveFromDate.toString() : "";
                b = b.effectiveFromDate != null ? b.effectiveFromDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Effective To',
            dataIndex: 'effectiveToDate',
            className: "width130",
            sorter: (a, b) => {
                a = a.effectiveToDate != null ? a.effectiveToDate.toString() : "";
                b = b.effectiveToDate != null ? b.effectiveToDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Copay',
            dataIndex: 'copay',
            render: text => {
                let numberOfFormate = parseFloat(text).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return <span style={{ float: "right" }}>{numberOfFormate}</span>
            },
            sorter: (a, b) => {
                a = a.copay != null ? a.copay.toString() : "";
                b = b.copay != null ? b.copay.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Eligibility',
            dataIndex: 'eligibility',
            render: text => {
                return !text ? "Not available" : text;
            },
            sorter: (a, b) => {
                a = a.eligibility != null ? a.eligibility.toString() : "";
                b = b.eligibility != null ? b.eligibility.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Checked on',
            dataIndex: 'eligibilityCheckDate',
            className: "width150",
            render: (text, o) => {
                return !o.eligibility ? "" : text == "" ? "" : formatDate(text);
            },
            sorter: (a, b) => {
                a = a.eligibilityCheckDate != null ? a.eligibilityCheckDate.toString() : "";
                b = b.eligibilityCheckDate != null ? b.eligibilityCheckDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    CustomBillingProfilesColumns: [
        {
            title: '',
            dataIndex: 'billingProfileId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Profile',
            dataIndex: 'profileName',
            className: "width180",
            sorter: (a, b) => {
                a = a.profileName != null ? a.profileName.toString() : "";
                b = b.profileName != null ? b.profileName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Diagnosis',
            dataIndex: 'icdCodes',
            className: "width150",
            sorter: (a, b) => {
                a = a.icdCodes != null ? a.icdCodes.toString() : "";
                b = b.icdCodes != null ? b.icdCodes.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                if (!!text) {
                    let newIcdCodes = text.replaceAll(',', ', ');
                    // let icdCodeNodes = newIcdCodes.map((item, i) => {
                    //     return <Tag color="blue" style={{ margin: "0px 2px", padding: "2px 4px", borderRadius: "2px" }} key={i}>{item}</Tag>
                    // })
                    return newIcdCodes;
                } else {
                    return text
                }
            }
        },
        {
            title: 'Procedures',
            dataIndex: 'cptCodes',
            className: "width150",
             sorter: (a, b) => {
                a = a.cptCodes != null ? a.cptCodes.toString() : "";
                b = b.cptCodes != null ? b.cptCodes.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                if (!!text) {
                    let newcptCodes = text.replaceAll(',', ', ');
                    // let cptCodeNodes = newcptCodes.map((item, i) => {
                    //     return <Tag color="orange" style={{ margin: "0px 2px", padding: "2px 4px", borderRadius: "2px" }} key={i}>{item}</Tag>
                    // })
                    return newcptCodes;
                } else {
                    return text
                }
            }
        },
        {
            title: 'NDC',
            dataIndex: 'ndcCodes',
            className: "width150",
            sorter: (a, b) => {
                a = a.ndcCodes != null ? a.ndcCodes.toString() : "";
                b = b.ndcCodes != null ? b.ndcCodes.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                if (!!text) {
                    let newCodes = text.replaceAll(',', ', ');
                    // let codeNodes = newCodes.map((item, i) => {
                    //     return <Tag color="geekblue" style={{ margin: "0px 2px", padding: "2px 4px", borderRadius: "2px" }} key={i}>{item}</Tag>
                    // })
                    return newCodes;
                } else {
                    return text
                }
            }
        },
        //{
        //    title: 'Custom',
        //    dataIndex: 'customCode',
        //    className: "width150",
        //},

        {
            title: 'Updated',
            dataIndex: 'strUpdateDate',
            className: "width150",
            sorter: (a, b) => {
                a = a.strUpdateDate != null ? a.strUpdateDate.toString() : "";
                b = b.strUpdateDate != null ? b.strUpdateDate.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) { return formatDate(text) }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "action-align-right"
        }
    ],
    FeeScheduleColumns: [
        {
            title: '',
            dataIndex: 'feeScheduleId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Name',
            dataIndex: 'feeScheduleName',
            sorter: (a, b) => {
                a = a.feeScheduleName != null ? a.feeScheduleName : "";
                b = b.feeScheduleName != null ? b.feeScheduleName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Effective Date',
            dataIndex: 'strEffectiveDate',
            sorter: (a, b) => {
                a = a.strEffectiveDate != null ? a.strEffectiveDate : "";
                b = b.strEffectiveDate != null ? b.strEffectiveDate : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Payer',
            dataIndex: 'payerName',
            sorter: (a, b) => {
                a = a.payerName != null ? a.payerName : "";
                b = b.payerName != null ? b.payerName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Fee Source',
            dataIndex: 'feeSourceCode',
            sorter: (a, b) => {
                a = a.feeSourceCode != null ? a.feeSourceCode : "";
                b = b.feeSourceCode != null ? b.feeSourceCode : "";
                return a.localeCompare(b);
            }
        },
        //{
        //    title: 'Type',
        //    dataIndex: 'type',
        //},
        {
            title: 'Status',
            dataIndex: 'status',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Action',
            dataIndex: 'feeAction',
            className: "action",
            align: "right"
        }
    ],
    AddFeeScheduleColumns: [
        {
            title: '',
            dataIndex: 'feeScheduleId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Code',
            dataIndex: 'code',
            className: "width100",
            sorter: (a, b) => {
                a = a.code != null ? a.code.toString() : "";
                b = b.code != null ? b.code.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width350",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Modifier',
            dataIndex: 'modifier',
            className: "width100",
            sorter: (a, b) => {
                a = a.modifier != null ? a.modifier.toString() : "";
                b = b.modifier != null ? b.modifier.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Your Fee',
            dataIndex: 'yourFee',
            className: "width100",
            sorter: (a, b) => {
                a = a.yourFee != null ? a.yourFee.toString() : "";
                b = b.yourFee != null ? b.yourFee.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Medicare',
            dataIndex: 'medicare',
            className: "width100",
            sorter: (a, b) => {
                a = a.medicare != null ? a.medicare.toString() : "";
                b = b.medicare != null ? b.medicare.toString() : "";
                return a.localeCompare(b);
            },
        }
    ],
    AddClaimWithoutEncounterColumns: [
        {
            title: '',
            dataIndex: 'claimSuperbillId',
            className: "custom-grid-hide-col",
        },
        {
            title: '',
            dataIndex: 'category',
            className: "width35",
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            className: "width110",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'patientName',
            //     },
            // ]
        },
        {
            title: 'Visit Date',
            dataIndex: 'visitDate',
            className: "width90",
            sorter: (a, b) => {
                a = a.visitDate != null ? a.visitDate.toString() : "";
                b = b.visitDate != null ? b.visitDate.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'visitDate',
            //     },
            // ]
        },
        {
            title: 'Location',
            dataIndex: 'locationName',
            className: "width150",
            sorter: (a, b) => {
                a = a.locationName != null ? a.locationName.toString() : "";
                b = b.locationName != null ? b.locationName.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'locationName',
            //     },
            // ]
        },
        {
            title: 'Provider',
            dataIndex: 'userName',
            className: "width110",
            sorter: (a, b) => {
                a = a.userName != null ? a.userName.toString() : "";
                b = b.userName != null ? b.userName.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: 'Total:',
            //         dataIndex: 'userName',
            //     },
            // ]
        },
        {
            title: 'Claim #',
            dataIndex: 'claimSuperbillId',
            className: "width65",
            align: 'right',
            sorter: (a, b) => {
                a = a.claimSuperbillId != null ? a.claimSuperbillId.toString() : "";
                b = b.claimSuperbillId != null ? b.claimSuperbillId.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'insuranceClaimNumber',
            //     },
            // ]
        },
        {
            title: 'Billed',
            dataIndex: 'billed',
            className: "width65",
            align: 'right',
            render: function (text) {

                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.billed != null ? a.billed.toString() : "";
                b = b.billed != null ? b.billed.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'billed',
            //         className: "width100",
            //         // render: function (text, record, index) {
            //         //     if (!!text) {
            //         //         let totalBilled = 500;
            //         //         return totalBilled;
            //         //     } else {
            //         //         return text
            //         //     }
            //         // }
            //     },
            // ]
        },
        {
            title: 'Allowed',
            dataIndex: 'allowedAmount',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.allowedAmount != null ? a.allowedAmount.toString() : "";
                b = b.allowedAmount != null ? b.allowedAmount.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'allowedAmount',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Adjustment',
            dataIndex: 'adjustment',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.adjustment != null ? a.adjustment.toString() : "";
                b = b.adjustment != null ? b.adjustment.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalAdjustmentAmount',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Ins 1 Paid',
            dataIndex: 'insFirstPaid',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.insFirstPaid != null ? a.insFirstPaid.toString() : "";
                b = b.insFirstPaid != null ? b.insFirstPaid.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalInsFirstAmount',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Ins 2 Paid',
            dataIndex: 'insSecondPaid',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.insSecondPaid != null ? a.insSecondPaid.toString() : "";
                b = b.insSecondPaid != null ? b.insSecondPaid.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalInsSecondAmount',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Pt Paid',
            dataIndex: 'patientPaid',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.patientPaid != null ? a.patientPaid.toString() : "";
                b = b.patientPaid != null ? b.patientPaid.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalPtPaid',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Balance',
            dataIndex: 'insBalance',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.insBalance != null ? a.insBalance.toString() : "";
                b = b.insBalance != null ? b.insBalance.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalInsBalance',
            //         className: "width100",
            //     },
            // ]
        },
        {
            title: 'Ins 1',
            dataIndex: 'payerNamePrimary',
            className: "width65",
            align: 'right',
            sorter: (a, b) => {
                a = a.payerNamePrimary != null ? a.payerNamePrimary.toString() : "";
                b = b.payerNamePrimary != null ? b.payerNamePrimary.toString() : "";
                return a.localeCompare(b);
            },
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'totalInsFirstAmount',
            //     },
            // ]
        },
        {
            title: 'Ins 1 Status',
            dataIndex: 'billingStatusCode',
            className: "width120",
            sorter: (a, b) => {
                a = a.billingStatusCode != null ? a.billingStatusCode.toString() : "";
                b = b.billingStatusCode != null ? b.billingStatusCode.toString() : "";
                return a.localeCompare(b);
            },
            // align: 'right',
            // children: [
            //     {
            //         title: '',
            //         dataIndex: 'insFirstStatus',
            //     },
            // ]
        },
        // {
        //     title: "",
        //     dataIndex: "billingStatus",
        //     className: "width50",
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width100",
        },
    ],
    PaymentsColumns: [
        {
            title: '',
            dataIndex: 'eobId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Attachment',
            dataIndex: 'scannedEobPath',
            className: "width50",
            render: function (text) {
                return text && text != 'null' ?
                    <LinkS target={"_blank"} href={"." + text}><AttachFileIcon onClick={(e) => e.stopPropagation()} /></LinkS>

                    : "";
            },
            sorter: (a, b) => {
                a = a.scannedEobPath != null ? a.scannedEobPath.toString() : "";
                b = b.scannedEobPath != null ? b.scannedEobPath.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'ERA',
            dataIndex: 'paymentCategoryCode',
            className: "width50",
            render: function (text) {
                return text != 'null' && text.toLowerCase() == 'era' ?
                    < Icon style={{ width: "18px" }}> <img
                        style={{ width: "18", height: "18px", cursor: "18px" }}
                        src={EraIcon}
                        alt="View" />
                    </Icon > : ""
            },
            sorter: (a, b) => {
                a = a.paymentCategoryCode != null ? a.paymentCategoryCode.toString() : "";
                b = b.paymentCategoryCode != null ? b.paymentCategoryCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Provider',
        //    dataIndex: 'payerName',
        //    className: "width150",
        //},
        {
            title: 'Batch ID',
            dataIndex: 'batchNo',
            className: "width65",
            sorter: (a, b) => {
                a = a.batchNo != null ? a.batchNo.toString() : "";
                b = b.batchNo != null ? b.batchNo.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Payment ID',
        //    dataIndex: 'paymentId',
        //    className: "width120",
        //},
        {
            title: 'Posted By',
            dataIndex: 'postedBy',
            className: "width100",
            sorter: (a, b) => {
                a = a.postedBy != null ? a.postedBy.toString() : "";
                b = b.postedBy != null ? b.postedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'strCreateDate',
            className: "width65",
            sorter: (a, b) => {
                a = a.strCreateDate != null ? a.strCreateDate.toString() : "";
                b = b.strCreateDate != null ? b.strCreateDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payment From',
            dataIndex: 'paymentFrom',
            className: "width180",
            sorter: (a, b) => {
                a = a.paymentFrom != null ? a.paymentFrom.toString() : "";
                b = b.paymentFrom != null ? b.paymentFrom.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentMethodName',
            className: "width100",
            sorter: (a, b) => {
                a = a.paymentMethodName != null ? a.paymentMethodName.toString() : "";
                b = b.paymentMethodName != null ? b.paymentMethodName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Check #',
            dataIndex: 'payerTraceNo',
            className: "width65",
            sorter: (a, b) => {
                a = a.payerTraceNo != null ? a.payerTraceNo.toString() : "";
                b = b.payerTraceNo != null ? b.payerTraceNo.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Ins Bal',
        //    dataIndex: 'insBalance',
        //    className: "width100",
        //},
        {
            title: 'Check Date',
            dataIndex: 'strCheckDate',
            className: "width65",
            sorter: (a, b) => {
                a = a.strCheckDate != null ? a.strCheckDate.toString() : "";
                b = b.strCheckDate != null ? b.strCheckDate.toString() : "";
                return a.localeCompare(b);
            },
            
        },
        {
            title: 'Deposit Date',
            dataIndex: 'strDepositDate',
            className: "width90",
            sorter: (a, b) => {
                a = a.strDepositDate != null ? a.strDepositDate.toString() : "";
                b = b.strDepositDate != null ? b.strDepositDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Amount',
            dataIndex: 'totalPaid',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.totalPaid != null ? a.totalPaid.toString() : "";
                b = b.totalPaid != null ? b.totalPaid.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: 'Posted',
            dataIndex: 'postedAmount',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.postedAmount != null ? a.postedAmount.toString() : "";
                b = b.postedAmount != null ? b.postedAmount.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Unposted',
            dataIndex: 'unPostedAmount',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.unPostedAmount != null ? a.unPostedAmount.toString() : "";
                b = b.unPostedAmount != null ? b.unPostedAmount.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Action',
            dataIndex: 'paymentAction',
            className: "action",
            align: "center"
        },
    ],
    InsurancePaymentColumns: [
        {
            title: '',
            dataIndex: 'eobClaimId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width180",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Chart ID',
            dataIndex: 'chartNumber',
            className: "width120",
             sorter: (a, b) => {
                a = a.chartNumber != null ? a.chartNumber.toString() : "";
                b = b.chartNumber != null ? b.chartNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim #',
            dataIndex: 'claimSuperbillId',
            className: "width90",
            sorter: (a, b) => {
                a = a.claimSuperbillId != null ? a.claimSuperbillId.toString() : "";
                b = b.claimSuperbillId != null ? b.claimSuperbillId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'TCN',
            dataIndex: 'tcnCode',
            className: "width90",
            sorter: (a, b) => {
                a = a.tcnCode != null ? a.tcnCode.toString() : "";
                b = b.tcnCode != null ? b.tcnCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOS',
            dataIndex: 'visitDate',
            className: "width90",
            sorter: (a, b) => {
                a = a.visitDate != null ? a.visitDate.toString() : "";
                b = b.visitDate != null ? b.visitDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billed',
            dataIndex: 'billed',
            className: "width65",
            sorter: (a, b) => {
                a = a.billed != null ? a.billed.toString() : "";
                b = b.billed != null ? b.billed.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Allowed',
            dataIndex: 'allowedAmount',
            sorter: (a, b) => {
                a = a.allowedAmount != null ? a.allowedAmount.toString() : "";
                b = b.allowedAmount != null ? b.allowedAmount.toString() : "";
                return a.localeCompare(b);
            },
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Paid',
            dataIndex: 'paidAmount',
            sorter: (a, b) => {
                a = a.paidAmount != null ? a.paidAmount.toString() : "";
                b = b.paidAmount != null ? b.paidAmount.toString() : "";
                return a.localeCompare(b);
            },
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Adjusted',
            dataIndex: 'adjustedAmount',
            className: "width65",
            sorter: (a, b) => {
                a = a.adjustedAmount != null ? a.adjustedAmount.toString() : "";
                b = b.adjustedAmount != null ? b.adjustedAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        // {
        //     title: 'Unpaid',
        //     dataIndex: 'unpaidAmount',
        //     className: "width65",
        //     align: "right",
        //     render: function (text) {
        //         return formatCurrency(text);
        //     }
        // },
        // {
        //     title: 'Additional Actions',
        //     dataIndex: 'additionalActions',
        //     className: "width90"
        // },
        {
            title: 'Balance',
            dataIndex: 'balance',
            className: "width65",
            sorter: (a, b) => {
                a = a.balance != null ? a.balance.toString() : "";
                b = b.balance != null ? b.balance.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "action",
            align: "center"
        }
    ],
    ClaimSearchColumns: [
        {
            title: '',
            dataIndex: 'claimSuperbillId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim #',
            dataIndex: 'claimSuperbillId',
            className: "width90",
            sorter: (a, b) => {
                a = a.claimSuperbillId != null ? a.claimSuperbillId.toString() : "";
                b = b.claimSuperbillId != null ? b.claimSuperbillId.toString() : "";
                return a.localeCompare(b);
            },
  
        },
        {
            title: 'DOS',
            dataIndex: 'visitDate',
            sorter: (a, b) => {
                a = a.visitDate != null ? a.visitDate.toString() : "";
                b = b.visitDate != null ? b.visitDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charges',
            dataIndex: 'billed',
            align: "right",
            sorter: (a, b) => {
                a = a.billed != null ? a.billed.toString() : "";
                b = b.billed != null ? b.billed.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return formatCurrency(text);

            }
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            align: "right",
            sorter: (a, b) => {
                a = a.balance != null ? a.balance.toString() : "";
                b = b.balance != null ? b.balance.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Status',
            dataIndex: 'billingStatus',
            sorter: (a, b) => {
                a = a.billingStatus != null ? a.billingStatus.toString() : "";
                b = b.billingStatus != null ? b.billingStatus.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Type',
            dataIndex: 'claimType',
               sorter: (a, b) => {
                a = a.claimType != null ? a.claimType.toString() : "";
                b = b.claimType != null ? b.claimType.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    ERAReviewColumns: [
        {
            title: '',
            dataIndex: 'batchId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Applied',
            dataIndex: 'isApplied',
            className: "width50",
            render: function (text) {
                return text ? <CheckIcon style={{ color: 'green' }} /> : "";
                //return <CheckIcon /> ;
            },
            sorter: (a, b) => {
                a = a.isApplied != null ? a.isApplied.toString() : "";
                b = b.isApplied != null ? b.isApplied.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payer',
            dataIndex: 'payerName',
            className: "width220",
            sorter: (a, b) => {
                a = a.payerName != null ? a.payerName.toString() : "";
                b = b.payerName != null ? b.payerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Rpt Date',
            dataIndex: 'strCreateDate',
            className: "width120",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.strCreateDate != null ? a.strCreateDate.toString() : "";
                b = b.strCreateDate != null ? b.strCreateDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Method',
            dataIndex: 'paymentMethodCode',
            className: "width120",
            sorter: (a, b) => {
                a = a.paymentMethodCode != null ? a.paymentMethodCode.toString() : "";
                b = b.paymentMethodCode != null ? b.paymentMethodCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'File Name',
            dataIndex: 'scannedEobPath',
            className: "width180",
            render: function (text) {
                return text && text != 'null' ? text : '';
            },
            sorter: (a, b) => {
                a = a.scannedEobPath != null ? a.scannedEobPath.toString() : "";
                b = b.scannedEobPath != null ? b.scannedEobPath.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Trace #',
            dataIndex: 'payerTraceNo',
            className: "width120",
            sorter: (a, b) => {
                a = a.payerTraceNo != null ? a.payerTraceNo.toString() : "";
                b = b.payerTraceNo != null ? b.payerTraceNo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Amount',
            dataIndex: 'totalPaid',
            className: "width120",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.totalPaid != null ? a.totalPaid.toString() : "";
                b = b.totalPaid != null ? b.totalPaid.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payments',
            dataIndex: 'payments',
            className: "width120",
            sorter: (a, b) => {
                a = a.payments != null ? a.payments.toString() : "";
                b = b.payments != null ? b.payments.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Check Date',
            dataIndex: 'strCheckDate',
            className: "width120",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.strCheckDate != null ? a.strCheckDate.toString() : "";
                b = b.strCheckDate != null ? b.strCheckDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'ERAaction',
            className: "width80"

        },

        //{
        //    title: 'Amount',
        //    dataIndex: 'amount',
        //    className: "width120",
        //    render: function (text) {
        //        return formatCurrency(text);
        //    }
        //},

    ],
    ERAResultColumns: [
        {
            title: '',
            dataIndex: 'batchClaimId',
            className: "custom-grid-hide-col",
        },
        //{
        //    title: 'Check #',
        //    dataIndex: 'checkNumber',
        //    className: "width90"
        //},
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width80",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim #',
            dataIndex: 'claimSuperbillId',
            className: "width65",
            sorter: (a, b) => {
                a = a.claimSuperbillId != null ? a.claimSuperbillId.toString() : "";
                b = b.claimSuperbillId != null ? b.claimSuperbillId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Account',
            dataIndex: 'account',
            className: "width65",
            sorter: (a, b) => {
                a = a.account != null ? a.account.toString() : "";
                b = b.account != null ? b.account.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'TCN',
            dataIndex: 'tcnCode',
            className: "width65",
            sorter: (a, b) => {
                a = a.tcnCode != null ? a.tcnCode.toString() : "";
                b = b.tcnCode != null ? b.tcnCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOS',
            dataIndex: 'visitDate',
            className: "width90",
            sorter: (a, b) => {
                a = a.visitDate != null ? a.visitDate.toString() : "";
                b = b.visitDate != null ? b.visitDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billed',
            dataIndex: 'billed',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.billed != null ? a.billed.toString() : "";
                b = b.billed != null ? b.billed.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Allowed',
            dataIndex: 'allowedAmount',
            className: "width65",
             sorter: (a, b) => {
                a = a.allowedAmount != null ? a.allowedAmount.toString() : "";
                b = b.allowedAmount != null ? b.allowedAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Paid',
            dataIndex: 'paidAmount',
            className: "width65",
            sorter: (a, b) => {
                a = a.paidAmount != null ? a.paidAmount.toString() : "";
                b = b.paidAmount != null ? b.paidAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Unapplied ',
            dataIndex: 'unappliedAmount',
            className: "width65",
            sorter: (a, b) => {
                a = a.unappliedAmount != null ? a.unappliedAmount.toString() : "";
                b = b.unappliedAmount != null ? b.unappliedAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Adjusted',
            dataIndex: 'adjustedAmount',
            className: "width65",
            sorter: (a, b) => {
                a = a.adjustedAmount != null ? a.adjustedAmount.toString() : "";
                b = b.adjustedAmount != null ? b.adjustedAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Unpaid',
            dataIndex: 'unpaidAmount',
            className: "width80",
            sorter: (a, b) => {
                a = a.unpaidAmount != null ? a.unpaidAmount.toString() : "";
                b = b.unpaidAmount != null ? b.unpaidAmount.toString() : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            }
        },
        // {
        //     title: 'Additional Actions ',
        //     dataIndex: 'additionalActions ',
        //     className: "width80"
        // },
        {
            title: 'Balance',
            dataIndex: 'balance',
            className: "width80",
            align: "right",
            sorter: (a, b) => {
                a = a.balance != null ? a.balance.toString() : "";
                b = b.balance != null ? b.balance.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        },
    ],
    AddFeeSchedule: [
        {
            title: 'Code',
            dataIndex: 'procedureCode',
        },
        {
            title: 'Description',
            dataIndex: 'procedureDescription',
            className: "width250",
            sorter: (a, b) => {
                a = a.procedureDescription != null ? a.procedureDescription.toString() : "";
                b = b.procedureDescription != null ? b.procedureDescription.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Modifier',
            dataIndex: 'strM1',
            className: "width120",
              sorter: (a, b) => {
                a = a.strM1 != null ? a.strM1.toString() : "";
                b = b.strM1 != null ? b.strM1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Fee',
            dataIndex: 'strFacilityPrice',
            className: "width120",
            sorter: (a, b) => {
                a = a.strFacilityPrice != null ? a.strFacilityPrice.toString() : "";
                b = b.strFacilityPrice != null ? b.strFacilityPrice.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Medicare',
            dataIndex: 'strMedicareFee',
            className: "width120 textRight",
           
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "action",
            align: "center"
        }
    ],
    AddMasterFeeSchedule: [
        {
            title: 'Code',
            dataIndex: 'procedureCode',
        },
        {
            title: 'Description',
            dataIndex: 'procedureDescription',
            className: "width250"
        },
        {
            title: 'Modifier',
            dataIndex: 'strM1',
            className: "width120"
        },
        {
            title: 'Fee',
            dataIndex: 'strFacilityPrice',
            className: "width120"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "action",
            align: "center"
        }
    ],
    AddCash: [
        {
            title: 'Code',
            dataIndex: 'proc',
            className: "width65"
        },
        {
            title: 'Applied',
            dataIndex: 'strPaidAmount',
            width: 150,
            // className: "width100"
        },
        {
            title: 'Balance',
            dataIndex: 'startBalance',
            className: "width100"
        },
        {
            title: 'Status Type',
            dataIndex: 'strStatusCode',
            className: "width180"
        },
    ],
    PatientStatement: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width65",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Chart ID',
            dataIndex: 'chartNumber',
            className: "width65",
            sorter: (a, b) => {
                a = a.chartNumber != null ? a.chartNumber.toString() : "";
                b = b.chartNumber != null ? b.chartNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Appt',
            dataIndex: 'lastAppointment',
            className: "width65",
            render: function (text) {
                return formatDate(text);
            },
           sorter: (a, b) => {
                a = a.lastAppointment != null ? a.lastAppointment.toString() : "";
                b = b.lastAppointment != null ? b.lastAppointment.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Next Appt',
            dataIndex: 'nextAppointment',
            className: "width80",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.nextAppointment != null ? a.nextAppointment.toString() : "";
                b = b.nextAppointment != null ? b.nextAppointment.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total Stmts',
            dataIndex: 'totalStatements',
            className: "width65",
            sorter: (a, b) => {
                a = a.totalStatements != null ? a.totalStatements.toString() : "";
                b = b.totalStatements != null ? b.totalStatements.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Statement',
            dataIndex: 'lastStatement',
            className: "width65",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.lastStatement != null ? a.lastStatement.toString() : "";
                b = b.lastStatement != null ? b.lastStatement.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Payment Amount',
            dataIndex: 'lastPaymentAmount',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.lastPaymentAmount != null ? a.lastPaymentAmount.toString() : "";
                b = b.lastPaymentAmount != null ? b.lastPaymentAmount.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Payment Posted',
            dataIndex: 'lastPaymentPosted',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.lastPaymentPosted != null ? a.lastPaymentPosted.toString() : "";
                b = b.lastPaymentPosted != null ? b.lastPaymentPosted.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Unallocated',
            dataIndex: 'unallocated',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.unallocated != null ? a.unallocated.toString() : "";
                b = b.unallocated != null ? b.unallocated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Statement Bal',
            dataIndex: 'statementBalance',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.statementBalance != null ? a.statementBalance.toString() : "";
                b = b.statementBalance != null ? b.statementBalance.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastUpdated',
            className: "width65",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.lastUpdated != null ? a.lastUpdated.toString() : "";
                b = b.lastUpdated != null ? b.lastUpdated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'statementAction',
            align: "center",
            className: "action"
        },
    ],
    PayersColumns: [
        {
            title: '',
            dataIndex: 'payerId',
            className: "width270",
            className: "custom-grid-hide-col",
        },
        {
            title: 'Payer / Plan',
            dataIndex: 'payer',
            className: "width150",
            sorter: (a, b) => {
                a = a.payer != null ? a.payer : "";
                b = b.payer != null ? b.payer : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Type',
            dataIndex: 'planTypeCode',
            className: "width270",
            sorter: (a, b) => {
                a = a.planTypeCode != null ? a.planTypeCode : "";
                b = b.planTypeCode != null ? b.planTypeCode : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: "width150",
            sorter: (a, b) => {
                a = a.address != null ? a.address : "";
                b = b.address != null ? b.address : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width150",
            sorter: (a, b) => {
                a = a.status != null ? a.status : "";
                b = b.status != null ? b.status : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    Provider: [
        {
            title: '',
            dataIndex: 'userID',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'dp',
            // className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            className: "width150",
            sorter: (a, b) => {
                a = a.fullName != null ? a.fullName : "";
                b = b.fullName != null ? b.fullName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Primary Location',
            dataIndex: 'primaryLocation',
            className: "width150",
            sorter: (a, b) => {
                a = a.primaryLocation != null ? a.primaryLocation : "";
                b = b.primaryLocation != null ? b.primaryLocation : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Personal NPI',
            dataIndex: 'personalNpi',
            className: "width150",
            sorter: (a, b) => {
                a = a.personalNpi != null ? a.personalNpi + '' : "";
                b = b.personalNpi != null ? b.personalNpi + '' : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Speciality',
            dataIndex: 'specializationName',
            className: "width150",
            sorter: (a, b) => {
                a = a.specializationName != null ? a.specializationName : "";
                b = b.specializationName != null ? b.specializationName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width150",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress : "";
                b = b.emailAddress != null ? b.emailAddress : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Cell #',
            dataIndex: 'cellPhone',
            className: "width150",
            sorter: (a, b) => {
                a = a.cellPhone != null ? a.cellPhone : "";
                b = b.cellPhone != null ? b.cellPhone : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    Location: [
        {
            title: '',
            dataIndex: 'location_id',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Location Name',
            dataIndex: 'name',
            className: "width270",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: "width270",
            sorter: (a, b) => {
                a = a.address != null ? a.address : "";
                b = b.address != null ? b.address : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Cell #',
            dataIndex: 'phone',
            className: "width270",
            sorter: (a, b) => {
                a = a.phone != null ? a.phone : "";
                b = b.phone != null ? b.phone : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Start Time',
            dataIndex: 'office_start_hours',
            className: "width150",
            sorter: (a, b) => {
                a = a.office_start_hours != null ? a.office_start_hours : "";
                b = b.office_start_hours != null ? b.office_start_hours : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Close Time',
            dataIndex: 'office_closing_hours',
            className: "width150",
            sorter: (a, b) => {
                a = a.office_closing_hours != null ? a.office_closing_hours : "";
                b = b.office_closing_hours != null ? b.office_closing_hours : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    // Staff: [
    //     {
    //         title: '',
    //         dataIndex: 'userID',
    //         className: "custom-grid-hide-col"
    //     },
    //     {
    //         title: '',
    //         dataIndex: 'dp',
    //         //className: "custom-grid-hide-col"
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'fullName',
    //         className: "width100",
    //         sorter: (a, b) => {
    //             a = a.fullName != null ? a.fullName : "";
    //             b = b.fullName != null ? b.fullName : "";
    //             return a.localeCompare(b);
    //         }
    //     },
    //     {
    //         title: 'Primary Location',
    //         dataIndex: 'primaryLocation',
    //         className: "width150",
    //         sorter: (a, b) => {
    //             a = a.primaryLocation != null ? a.primaryLocation : "";
    //             b = b.primaryLocation != null ? b.primaryLocation : "";
    //             return a.localeCompare(b);
    //         }
    //     },
    //     {
    //         title: 'Primary Provider',
    //         dataIndex: 'primaryProviderName',
    //         className: "width150",
    //         sorter: (a, b) => {
    //             a = a.primaryProviderName != null ? a.primaryProviderName : "";
    //             b = b.primaryProviderName != null ? b.primaryProviderName : "";
    //             return a.localeCompare(b);
    //         }
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'emailAddress',
    //         className: "width150",
    //         sorter: (a, b) => {
    //             a = a.emailAddress != null ? a.emailAddress : "";
    //             b = b.emailAddress != null ? b.emailAddress : "";
    //             return a.localeCompare(b);
    //         }
    //     },
    //     {
    //         title: 'Cell #',
    //         dataIndex: 'cellPhone',
    //         className: "width150",
    //         sorter: (a, b) => {
    //             a = a.cellPhone != null ? a.cellPhone : "";
    //             b = b.cellPhone != null ? b.cellPhone : "";
    //             return a.localeCompare(b);
    //         }
    //     }
    // ],
    Staff: [
        {
            title: '',
            dataIndex: 'userID',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'dp',
            //  className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            className: "width150",
            sorter: (a, b) => {
                a = a.fullName != null ? a.fullName : "";
                b = b.fullName != null ? b.fullName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Primary Location',
            dataIndex: 'primaryLocation',
            className: "width150",
            sorter: (a, b) => {
                a = a.primaryLocation != null ? a.primaryLocation : "";
                b = b.primaryLocation != null ? b.primaryLocation : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Primary Provider',
            dataIndex: 'primaryProviderName',
            className: "width150",
            sorter: (a, b) => {
                a = a.primaryProviderName != null ? a.primaryProviderName : "";
                b = b.primaryProviderName != null ? b.primaryProviderName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width150",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress : "";
                b = b.emailAddress != null ? b.emailAddress : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Cell #',
            dataIndex: 'cellPhone',
            className: "width150",
            sorter: (a, b) => {
                a = a.cellPhone != null ? a.cellPhone : "";
                b = b.cellPhone != null ? b.cellPhone : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    ConsentForm: [
        {
            title: '',
            dataIndex: 'consentFormID',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Type',
            dataIndex: 'formType',
            className: "width65",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'SubType',
            dataIndex: 'formSubType',
            className: "width65",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Document ID',
            dataIndex: 'documentId',
            className: "width65",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        
        {
            title: 'Title',
            dataIndex: 'name',
            className: "width150",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width270",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Version',
            dataIndex: 'formVersionCode',
            className: "width65",
            sorter: (a, b) => {
                a = a.default != null ? a.default : "";
                b = b.default != null ? b.default : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Mandatory',
            dataIndex: 'mandatory',
            className: "width65",
            sorter: (a, b) => {
                a = a.mandatory != null ? a.mandatory.toString() : "";
                b = b.mandatory != null ? b.mandatory.toString() : "";
                return a.localeCompare(b);
            },

           
            
        },
        {
            title: 'Default',
            dataIndex: 'default',
            className: "width65",
            sorter: (a, b) => {
                a = a.default != null ? a.default.toString() : "";
                b = b.default != null ? b.default.toString() : "";
                return a.localeCompare(b);
            },
           
            
        },
     
        {
            title: 'Status',
            dataIndex: 'formStatus',
            className: "width65",
            sorter: (a, b) => {
                a = a.default != null ? a.default : "";
                b = b.default != null ? b.default : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "action"
        }
    ],
    Specialization: [
        {
            title: '',
            dataIndex: 'specializationID',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width270",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width270",
            sorter: (a, b) => {
                a = a.description != null ? a.description : "";
                b = b.description != null ? b.description : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    ScheduleSlots: [
        {
            title: '',
            dataIndex: 'providerSlotID',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'check',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Date',
            dataIndex: 'scheduleDate',
            className: "width65",
            sorter: (a, b) => {
                a = a.scheduleDate != null ? a.scheduleDate : "";
                b = b.scheduleDate != null ? b.scheduleDate : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Time',
            dataIndex: 'scheduleTime',
            className: "width65",
            sorter: (a, b) => {
                a = a.scheduleTime != null ? a.scheduleTime : "";
                b = b.scheduleTime != null ? b.scheduleTime : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Location',
            dataIndex: 'locationName',
            className: "width270",
            sorter: (a, b) => {
                a = a.locationName != null ? a.locationName : "";
                b = b.locationName != null ? b.locationName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Provider',
            dataIndex: 'providerName',
            className: "width100",
            sorter: (a, b) => {
                a = a.providerName != null ? a.providerName : "";
                b = b.providerName != null ? b.providerName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width150",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName : "";
                b = b.patientName != null ? b.patientName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Reason',
            dataIndex: 'patientApptReason',
            className: "width150",
            sorter: (a, b) => {
                a = a.patientApptReason != null ? a.patientApptReason : "";
                b = b.patientApptReason != null ? b.patientApptReason : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Status',
            dataIndex: 'statusCode',
            className: "width100",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode : "";
                b = b.statusCode != null ? b.statusCode : "";
                return a.localeCompare(b);
            }
        }
    ],
    UserRoles: [
        {
            title: '',
            dataIndex: 'role_id',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Role Name',
            dataIndex: 'role_name',
            className: "width270",
            sorter: (a, b) => {
                a = a.role_name != null ? a.role_name : "";
                b = b.role_name != null ? b.role_name : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Description',
            dataIndex: 'role_description',
            className: "width270",
            sorter: (a, b) => {
                a = a.role_description != null ? a.role_description : "";
                b = b.role_description != null ? b.role_description : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action"
        }
    ],
    AppointmentProfile: [
        {
            title: '',
            dataIndex: 'appointmentProfileID',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'profileName',
            className: "width270",
            sorter: (a, b) => {
                a = a.profileName != null ? a.profileName : "";
                b = b.profileName != null ? b.profileName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Duration',
            dataIndex: 'durationString',
            className: "width270",
            sorter: (a, b) => {
                a = a.durationString != null ? a.durationString : "";
                b = b.durationString != null ? b.durationString : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Visit Reason',
            dataIndex: 'visitReason',
            className: "width270",
            sorter: (a, b) => {
                a = a.visitReason != null ? a.visitReason : "";
                b = b.visitReason != null ? b.visitReason : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Patient Form(s)',
            dataIndex: 'noOfConsentForm',
            className: "width270",
            sorter: (a, b) => {
                a = a.noOfConsentForm != null ? a.noOfConsentForm + '' : "";
                b = b.noOfConsentForm != null ? b.noOfConsentForm + '' : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width150"
        }
    ],
    PatientColumns: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'dp',
        },
        {
            title: 'Chart ID',
            dataIndex: 'chartNumber',
            className: "width130",
            sorter: (a, b) => {
                a = a.chartNumber != null ? a.chartNumber + '' : "";
                b = b.chartNumber != null ? b.chartNumber + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width150",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress + '' : "";
                b = b.emailAddress != null ? b.emailAddress + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Appointment',
            dataIndex: 'lastAppointment',
            className: "width180",
            sorter: (a, b) => {
                a = a.lastAppointment != null ? a.lastAppointment + '' : "";
                b = b.lastAppointment != null ? b.lastAppointment + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Next Appointment',
            dataIndex: 'nextAppointment',
            className: "width180",
            sorter: (a, b) => {
                a = a.nextAppointment != null ? a.nextAppointment + '' : "";
                b = b.nextAppointment != null ? b.nextAppointment + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Cell #',
            dataIndex: 'cellPhone',
            className: "width150",
            sorter: (a, b) => {
                a = a.cellPhone != null ? a.cellPhone + '' : "";
                b = b.cellPhone != null ? b.cellPhone + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'statusCode',
            className: "width50",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode + '' : "";
                b = b.statusCode != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width100"
        }
    ],
    DocumentColumns: [
        {
            title: '',
            dataIndex: 'documentId',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Title',
            dataIndex: 'documentTitle',
            className: "width100",
            sorter: (a, b) => {
                a = a.documentTitle != null ? a.documentTitle + '' : "";
                b = b.documentTitle != null ? b.documentTitle + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Document ID',
            dataIndex: 'documentControlId',
            className: "width100",
            sorter: (a, b) => {
                a = a.documentControlId != null ? a.documentControlId + '' : "";
                b = b.documentControlId != null ? b.documentControlId + '' : "";
                return a.localeCompare(b);
            },
        },
        // {
        //     title: 'Subtype',
        //     dataIndex: 'documentSubType',
        //     className: "width120",
        //     sorter: (a, b) => {
        //         a = a.documentSubType != null ? a.documentSubType + '' : "";
        //         b = b.documentSubType != null ? b.documentSubType + '' : "";
        //         return a.localeCompare(b);
        //     },
        // },
        {
            title: 'Type',
            dataIndex: 'documentTypeCode',
            className: "width100",
            sorter: (a, b) => {
                a = a.documentTypeCode != null ? a.documentTypeCode + '' : "";
                b = b.documentTypeCode != null ? b.documentTypeCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            className: "width100",
            sorter: (a, b) => {
                a = a.comments != null ? a.comments + '' : "";
                b = b.comments != null ? b.comments + '' : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <span style={{ textOverflow: "ellipsis" }}>{text}</span>
            }
        },

        {
            title: 'Patient',
            dataIndex: 'patientName',
            // className: "width100",
            className: "custom-grid-hide-col",
            sorter: (a, b) => {
                a = a.patientName != null ? a.statusCode + '' : "";
                b = b.patientName != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Provider',
            dataIndex: 'providerName',
            className: "width100",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode + '' : "";
                b = b.statusCode != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'strDocumentDate',
            className: "width100",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode + '' : "";
                b = b.statusCode != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action",
        },
    ],
    ProviderDocumentColumns: [
        {
            title: '',
            dataIndex: 'documentId',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120",
            sorter: (a, b) => {
                a = a.patientName != null ? a.statusCode + '' : "";
                b = b.patientName != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Title',
            dataIndex: 'documentTitle',
            className: "width120",
            sorter: (a, b) => {
                a = a.documentTitle != null ? a.documentTitle + '' : "";
                b = b.documentTitle != null ? b.documentTitle + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Document ID',
            dataIndex: 'documentControlId',
            className: "width120",
            sorter: (a, b) => {
                a = a.documentControlId != null ? a.documentControlId + '' : "";
                b = b.documentControlId != null ? b.documentControlId + '' : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Subtype',
        //    dataIndex: 'documentSubType',
        //    className: "width120",
        //    sorter: (a, b) => {
        //        a = a.documentSubType != null ? a.documentSubType + '' : "";
        //        b = b.documentSubType != null ? b.documentSubType + '' : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Type',
            dataIndex: 'documentTypeCode',
            className: "width120",
            sorter: (a, b) => {
                a = a.documentTypeCode != null ? a.documentTypeCode + '' : "";
                b = b.documentTypeCode != null ? b.documentTypeCode + '' : "";
                return a.localeCompare(b);
            },
        },
        
        {
            title: 'Date',
            dataIndex: 'strDocumentDate',
            className: "width120",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode + '' : "";
                b = b.statusCode != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action",
        },
    ],
    LogDetails: [
        {
            title: '',
            dataIndex: 'id',
            className: "custom-grid-hide-col"
            // width: 270,
        },
        {
            title: 'Action',
            dataIndex: 'action_type',
            align: "center",
            className: "action",
            sorter: (a, b) => {
                a = a.action_type != null ? a.action_type.toString() : "";
                b = b.action_type != null ? b.action_type.toString() : "";
                return a.localeCompare(b);
            },
            // width: 150
        },
        {
            title: 'By',
            dataIndex: 'updated_by_name',
            className: "width150",
            sorter: (a, b) => {
                a = a.updated_by_name != null ? a.updated_by_name.toString() : "";
                b = b.updated_by_name != null ? b.updated_by_name.toString() : "";
                return a.localeCompare(b);
            },
            // width: 270,
        },
        {
            title: 'Date',
            dataIndex: 'update_date_str',
            className: "width220",
            sorter: (a, b) => {
                a = a.update_date_str != null ? a.update_date_str.toString() : "";
                b = b.update_date_str != null ? b.update_date_str.toString() : "";
                return a.localeCompare(b);
            },
            // width: 150
        },

        {
            title: 'Field',
            dataIndex: 'column_display_val',
            className: "width150",
            sorter: (a, b) => {
                a = a.column_display_val != null ? a.column_display_val.toString() : "";
                b = b.column_display_val != null ? b.column_display_val.toString() : "";
                return a.localeCompare(b);
            },
            // width: 270,
        },
        {
            title: 'New Value',
            dataIndex: 'new_value',
            className: "width150",
            sorter: (a, b) => {
                a = a.new_value != null ? a.new_value.toString() : "";
                b = b.new_value != null ? b.new_value.toString() : "";
                return a.localeCompare(b);
            },
            // width: 150
        },
        {
            title: 'Old Value',
            dataIndex: 'old_value',
            className: "width150",
            sorter: (a, b) => {
                a = a.old_value != null ? a.old_value.toString() : "";
                b = b.old_value != null ? b.old_value.toString() : "";
                return a.localeCompare(b);
            },
            // width: 150
        },
    ],
    EPrescription: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Provider',
            dataIndex: 'fullName',
            className: "width220",
            sorter: (a, b) => {
                a = a.fullName != null ? a.fullName.toString() : "";
                b = b.fullName != null ? b.fullName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'User Role',
            dataIndex: 'role',
            className: "width150",
            sorter: (a, b) => {
                a = a.role != null ? a.role.toString() : "";
                b = b.role != null ? b.role.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width150",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        // {
        //     title: 'Can mark as ready to sign',
        //     dataIndex: 'canMarkasReadyToSign',
        //     className: "width200",
        // },
        // {
        //     title: 'Can Sign',
        //     dataIndex: 'canSign',
        //     className: "width150",
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action",
        },
    ],
    EPendingPrescription: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Provider',
            dataIndex: 'fullName',
            className: "width220",
        },
        {
            title: 'User Role',
            dataIndex: 'role',
            className: "width150",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width150",
        },
        // {
        //     title: 'Can mark as ready to sign',
        //     dataIndex: 'canMarkasReadyToSign',
        //     className: "width200",
        // },
        // {
        //     title: 'Can Sign',
        //     dataIndex: 'canSign',
        //     className: "width1500",
        // },
    ], ImplantableDevices: [
        {
            title: '',
            dataIndex: 'patientMedicalEquipmentId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Device Identifier',
            dataIndex: 'deviceUdi',
            className: "width220",
        },
        {
            title: 'Name',
            dataIndex: 'brandName',
            className: "width150",
            sorter: (a, b) => {
                a = a.brandName != null ? a.brandName.toString() : "";
                b = b.brandName != null ? b.brandName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Implant Date',
            dataIndex: 'strImplantDate',
            className: "width150",
             sorter: (a, b) => {
                a = a.strImplantDate != null ? a.strImplantDate.toString() : "";
                b = b.strImplantDate != null ? b.strImplantDate.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Removal Date',
            dataIndex: 'strRemovalDate',
            className: "width150",
            sorter: (a, b) => {
                a = a.strRemovalDate != null ? a.strRemovalDate.toString() : "";
                b = b.strRemovalDate != null ? b.strRemovalDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'strDeviceStatusCode',
            className: "width150",
            sorter: (a, b) => {
                a = a.strDeviceStatusCode != null ? a.strDeviceStatusCode.toString() : "";
                b = b.strDeviceStatusCode != null ? b.strDeviceStatusCode.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action",
        },
    ], SendRefferral: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Referral to',
            dataIndex: 'refProviderName',
            className: "width220",
            sorter: (a, b) => {
                a = a.refProviderName != null ? a.refProviderName.toString() : "";
                b = b.refProviderName != null ? b.refProviderName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ordering Provider',
            dataIndex: 'orderingProviderName',
            className: "width220",
            sorter: (a, b) => {
                a = a.orderingProviderName != null ? a.orderingProviderName.toString() : "";
                b = b.orderingProviderName != null ? b.orderingProviderName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Referral For',
            dataIndex: 'refferalFor',
            className: "width220",
            sorter: (a, b) => {
                a = a.refferalFor != null ? a.refferalFor.toString() : "";
                b = b.refferalFor != null ? b.refferalFor.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Date / Time',
            dataIndex: 'createDate',
            className: "width150",
            render: function (text) { return formatDateTime(text) },
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Attachment',
            dataIndex: 'link',
            align: "center",
            className: "width150 action",
            sorter: (a, b) => {
                a = a.link != null ? a.link.toString() : "";
                b = b.link != null ? b.link.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'referralStatusCode',
             sorter: (a, b) => {
                a = a.referralStatusCode != null ? a.referralStatusCode.toString() : "";
                b = b.referralStatusCode != null ? b.referralStatusCode.toString() : "";
                return a.localeCompare(b);
            },

        },
    ],
    Messages: [
        {
            title: '',
            dataIndex: 'typeColor',
            className: "width5"
        },
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'infoIcon',
            className: "width18",
            sorter: (a, b) => {
                a = a.infoIcon != null ? a.infoIcon.toString() : "";
                b = b.infoIcon != null ? b.infoIcon.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'From',
            dataIndex: 'from',
            className: "width150PR",
            sorter: (a, b) => {
                a = a.from != null ? a.from.toString() : "";
                b = b.from != null ? b.from.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120PR",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        ,
        {
            title: 'Received',
            dataIndex: 'recievedDate',
            className: "width100PR",
            sorter: (a, b) => {
                a = a.recievedDate != null ? a.recievedDate.toString() : "";
                b = b.recievedDate != null ? b.recievedDate.toString() : "";
                return a.localeCompare(b);
            },
        }
        ,
        {
            title: '',
            dataIndex: 'action'
        }
    ],

    Sent: [

        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'To',
            dataIndex: 'to',
            className: "width120",
            sorter: (a, b) => {
                a = a.to != null ? a.to.toString() : "";
                b = b.to != null ? b.to.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        ,
        {
            title: 'Sent',
            dataIndex: 'recievedDate',
            className: "width120",
            sorter: (a, b) => {
                a = a.recievedDate != null ? a.recievedDate.toString() : "";
                b = b.recievedDate != null ? b.recievedDate.toString() : "";
                return a.localeCompare(b);
            },
        }
        ,
        {
            title: '',
            dataIndex: 'action'
        }
    ],
    Archieved: [

        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'To',
            dataIndex: 'from',
            className: "width120",
            sorter: (a, b) => {
                a = a.from != null ? a.from.toString() : "";
                b = b.from != null ? b.from.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Sent',
            dataIndex: 'recievedDate',
            className: "width120",
            sorter: (a, b) => {
                a = a.recievedDate != null ? a.recievedDate.toString() : "";
                b = b.recievedDate != null ? b.recievedDate.toString() : "";
                return a.localeCompare(b);
            },
        }
        ,
        {
            title: '',
            dataIndex: 'action'
        }
    ],
    InsuranceAuthorization: [
        {
            title: '',
            dataIndex: 'insuranceAuthorizationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Authorization #',
            dataIndex: 'authorizationNo',
            className: "width220",
            sorter: (a, b) => {
                a = a.authorizationNo != null ? a.authorizationNo.toString() : "";
                b = b.authorizationNo != null ? b.authorizationNo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Start Date',
            dataIndex: 'strStartDate',
            className: "width150",
            sorter: (a, b) => {
                a = a.strStartDate != null ? a.strStartDate.toString() : "";
                b = b.strStartDate != null ? b.strStartDate.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'End Date',
            dataIndex: 'strEndDate',
            className: "width150",
            sorter: (a, b) => {
                a = a.strEndDate != null ? a.strEndDate.toString() : "";
                b = b.strEndDate != null ? b.strEndDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Speciality',
            dataIndex: 'specilitiyName',
            className: "width150",
            sorter: (a, b) => {
                a = a.specilitiyName != null ? a.specilitiyName.toString() : "";
                b = b.specilitiyName != null ? b.specilitiyName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Approved Visits',
            dataIndex: 'approvedVisits',
            className: "width150",
            sorter: (a, b) => {
                a = a.approvedVisits != null ? a.approvedVisits.toString() : "";
                b = b.approvedVisits != null ? b.approvedVisits.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Remaining Visits',
            dataIndex: 'remaningVisit',
            className: "width150",
            sorter: (a, b) => {
                a = a.remaningVisit != null ? a.remaningVisit.toString() : "";
                b = b.remaningVisit != null ? b.remaningVisit.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "action",
        }

    ],

    HealthCareFacility: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Info',
            dataIndex: 'info'
        },
    ],

    ActiveCoverage: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },

        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            }
        },
        {
            title: 'Insurance Type',
            dataIndex: 'insuranceType',
            sorter: (a, b) => {
                a = a.insuranceType != null ? a.insuranceType.toString() : "";
                b = b.insuranceType != null ? b.insuranceType.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Plan Coverage Description',
            dataIndex: 'planCoverageDescription',
            sorter: (a, b) => {
                a = a.planCoverageDescription != null ? a.planCoverageDescription.toString() : "";
                b = b.planCoverageDescription != null ? b.planCoverageDescription.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Date Qualifier',
            dataIndex: 'dateQualifier',
            sorter: (a, b) => {
                a = a.dateQualifier != null ? a.dateQualifier.toString() : "";
                b = b.dateQualifier != null ? b.dateQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Date of Service',
            dataIndex: 'dateOfService',
            render: function (text, o) {
                if (text) {
                    try {
                        return formatDate(moment(text, "YYYYMMDD"));
                    } catch (e) { }
                }
                return "";
            },
            sorter: (a, b) => {
                a = a.dateOfService != null ? a.dateOfService.toString() : "";
                b = b.dateOfService != null ? b.dateOfService.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
            sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
            sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],

    CoInsurance: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Coverage Level',
            dataIndex: 'coverageLevel',
            sorter: (a, b) => {
                a = a.coverageLevel != null ? a.coverageLevel.toString() : "";
                b = b.coverageLevel != null ? b.coverageLevel.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            },
            sorter: (a, b) => {
                a = a.serviceType != null ? a.serviceType.toString() : "";
                b = b.serviceType != null ? b.serviceType.toString() : "";
                return a.localeCompare(b);
            },
            
        },

        {
            title: 'Time Period',
            dataIndex: 'timePeriodQualifier',
            sorter: (a, b) => {
                a = a.timePeriodQualifier != null ? a.timePeriodQualifier.toString() : "";
                b = b.timePeriodQualifier != null ? b.timePeriodQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Amount',
            dataIndex: 'benefitAmount',
            align: 'right',
            render: function (text) {

                return text ? formatCurrency(text) : "";

            },
            sorter: (a, b) => {
                a = a.benefitAmount != null ? a.benefitAmount.toString() : "";
                b = b.benefitAmount != null ? b.benefitAmount.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '%',
            dataIndex: 'percent',
            align: 'right',
            sorter: (a, b) => {
                a = a.percent != null ? a.percent.toString() : "";
                b = b.percent != null ? b.percent.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Qty',
        //    dataIndex: 'quantity',
        //    align: 'right'
        //},
        //{
        //    title: 'Quantity Type',
        //    dataIndex: 'quantityQualifier',
        //},
        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
            sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
            sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],

    CoPayment: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Coverage Level',
            dataIndex: 'coverageLevel',
            sorter: (a, b) => {
                a = a.coverageLevel != null ? a.coverageLevel.toString() : "";
                b = b.coverageLevel != null ? b.coverageLevel.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            },
            sorter: (a, b) => {
                a = a.serviceType != null ? a.serviceType.toString() : "";
                b = b.serviceType != null ? b.serviceType.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Insurance Type',
        //    dataIndex: 'insuranceType'

        //},
        //{
        //    title: 'Plan Coverage Description',
        //    dataIndex: 'planCoverageDescription',

        //},
        //{
        //    title: 'Date Qualifier',
        //    dataIndex: 'dateQualifier',

        //},
        //{
        //    title: 'Date of Service',
        //    dataIndex: 'dateOfService',

        //},
        {
            title: 'Time Period',
            dataIndex: 'timePeriodQualifier',
            sorter: (a, b) => {
                a = a.timePeriodQualifier != null ? a.timePeriodQualifier.toString() : "";
                b = b.timePeriodQualifier != null ? b.timePeriodQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Amount',
            dataIndex: 'benefitAmount',
            align: 'right',
            render: function (text) {

                return text ? formatCurrency(text) : "";

            },
            sorter: (a, b) => {
                a = a.benefitAmount != null ? a.benefitAmount.toString() : "";
                b = b.benefitAmount != null ? b.benefitAmount.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '%',
            dataIndex: 'percent',
            align: 'right',
            sorter: (a, b) => {
                a = a.percent != null ? a.percent.toString() : "";
                b = b.percent != null ? b.percent.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Qty',
        //    dataIndex: 'quantity',
        //    align: 'right'
        //},
        //{
        //    title: 'Quantity Type',
        //    dataIndex: 'quantityQualifier',
        //},
        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
            sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
            sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],

    Limitations: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Coverage Level',
            dataIndex: 'coverageLevel',
            sorter: (a, b) => {
                a = a.coverageLevel != null ? a.coverageLevel.toString() : "";
                b = b.coverageLevel != null ? b.coverageLevel.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            },
            sorter: (a, b) => {
                a = a.serviceType != null ? a.serviceType.toString() : "";
                b = b.serviceType != null ? b.serviceType.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Insurance Type',
        //    dataIndex: 'insuranceType'

        //},
        //{
        //    title: 'Plan Coverage Description',
        //    dataIndex: 'planCoverageDescription',

        //},
        //{
        //    title: 'Date Qualifier',
        //    dataIndex: 'dateQualifier',

        //},
        //{
        //    title: 'Date of Service',
        //    dataIndex: 'dateOfService',

        //},
        {
            title: 'Time Period',
            dataIndex: 'timePeriodQualifier',
            sorter: (a, b) => {
                a = a.timePeriodQualifier != null ? a.timePeriodQualifier.toString() : "";
                b = b.timePeriodQualifier != null ? b.timePeriodQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Amount',
            dataIndex: 'benefitAmount',
            align: 'right',
            sorter: (a, b) => {
                a = a.benefitAmount != null ? a.benefitAmount.toString() : "";
                b = b.benefitAmount != null ? b.benefitAmount.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return text ? formatCurrency(text) : "";

            }
        },
        //{
        //    title: '%',
        //    dataIndex: 'percent',
        //    align: 'right'
        //},
        {
            title: 'Qty',
            dataIndex: 'quantity',
            align: 'right',
            sorter: (a, b) => {
                a = a.quantity != null ? a.quantity.toString() : "";
                b = b.quantity != null ? b.quantity.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Quantity Type',
            dataIndex: 'quantityQualifier',
            sorter: (a, b) => {
                a = a.quantityQualifier != null ? a.quantityQualifier.toString() : "";
                b = b.quantityQualifier != null ? b.quantityQualifier.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
            sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
              sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],


    Deductible: [
        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Coverage Level',
            dataIndex: 'coverageLevel',
            sorter: (a, b) => {
                a = a.coverageLevel != null ? a.coverageLevel.toString() : "";
                b = b.coverageLevel != null ? b.coverageLevel.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            },
              sorter: (a, b) => {
                a = a.serviceType != null ? a.serviceType.toString() : "";
                b = b.serviceType != null ? b.serviceType.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Insurance Type',
        //    dataIndex: 'insuranceType'

        //},
        //{
        //    title: 'Plan Coverage Description',
        //    dataIndex: 'planCoverageDescription',

        //},
        //{
        //    title: 'Date Qualifier',
        //    dataIndex: 'dateQualifier',

        //},
        //{
        //    title: 'Date of Service',
        //    dataIndex: 'dateOfService',

        //},
        {
            title: 'Time Period',
            dataIndex: 'timePeriodQualifier',
            sorter: (a, b) => {
                a = a.timePeriodQualifier != null ? a.timePeriodQualifier.toString() : "";
                b = b.timePeriodQualifier != null ? b.timePeriodQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Amount',
            dataIndex: 'benefitAmount',
            align: 'right',
            sorter: (a, b) => {
                a = a.benefitAmount != null ? a.benefitAmount.toString() : "";
                b = b.benefitAmount != null ? b.benefitAmount.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return text ? formatCurrency(text) : "";

            }
        },
        //{
        //    title: '%',
        //    dataIndex: 'percent',
        //    align: 'right'
        //},
        //{
        //    title: 'Qty',
        //    dataIndex: 'quantity',
        //    align: 'right'
        //},
        //{
        //    title: 'Quantity Type',
        //    dataIndex: 'quantityQualifier',
        //},
        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
            sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
            sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],
    ActiveCoverageDetails: [

        {
            title: '',
            dataIndex: 'requestId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Coverage Level',
            dataIndex: 'coverageLevel',
            sorter: (a, b) => {
                a = a.coverageLevel != null ? a.coverageLevel.toString() : "";
                b = b.coverageLevel != null ? b.coverageLevel.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            render: function (text, o) {
                return text ? o.serviceTypeCode + " - " + text : o.serviceTypeCode;
            },
            sorter: (a, b) => {
                a = a.serviceType != null ? a.serviceType.toString() : "";
                b = b.serviceType != null ? b.serviceType.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Insurance Type',
            dataIndex: 'insuranceType',
            sorter: (a, b) => {
                a = a.insuranceType != null ? a.insuranceType.toString() : "";
                b = b.insuranceType != null ? b.insuranceType.toString() : "";
                return a.localeCompare(b);
            },

        },

        {
            title: 'Time Period',
            dataIndex: 'timePeriodQualifier',
            sorter: (a, b) => {
                a = a.timePeriodQualifier != null ? a.timePeriodQualifier.toString() : "";
                b = b.timePeriodQualifier != null ? b.timePeriodQualifier.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Amount',
            dataIndex: 'benefitAmount',
            align: 'right',
            render: function (text) {

                return text ? formatCurrency(text) : "";

            },
            sorter: (a, b) => {
                a = a.benefitAmount != null ? a.benefitAmount.toString() : "";
                b = b.benefitAmount != null ? b.benefitAmount.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Plan Network',
            dataIndex: 'planNetworkIndicator',
             sorter: (a, b) => {
                a = a.planNetworkIndicator != null ? a.planNetworkIndicator.toString() : "";
                b = b.planNetworkIndicator != null ? b.planNetworkIndicator.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'message',
            sorter: (a, b) => {
                a = a.message != null ? a.message.toString() : "";
                b = b.message != null ? b.message.toString() : "";
                return a.localeCompare(b);
            },
        }

    ],

    ListItem: [
        {
            title: '',
            dataIndex: 'listItemIndex',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Code',
            dataIndex: 'code',
            sorter: (a, b) => {
                a = a.code != null ? a.code.toString() : "";
                b = b.code != null ? b.code.toString() : "";
                return a.localeCompare(b);
            },
            //className: "MinMaxwidth130"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => {
                a = a.name != null ? a.name.toString() : "";
                b = b.name != null ? b.name.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            //align: 'left',
            // width: 100,
            className: "action"
        },
    ],
    Procedures: [
        {
            title: '',
            dataIndex: 'reportCode',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Code',
            dataIndex: 'column1',
            className: "width150",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 'column2',
            className: "width270",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Units',
            dataIndex: 'column3',
            className: "width150",
            align: 'right',
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charges',
            dataIndex: 'column4',
            className: "width150",
            align: 'right',
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Insurance Payments',
            dataIndex: 'column5',
            className: "width150",
            align: 'right',
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient Payment ',
            dataIndex: 'column6',
            className: "width150",
            align: 'right',
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustments',
            dataIndex: 'column7',
            className: "width150",
            align: 'right',
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
    ],
    ProcedureDetails: [
        {
            title: '',
            dataIndex: 'procedureDetailId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Appointment date',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient(s)',
            dataIndex: 'column2',
            className: "width200",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payer(s)',
            dataIndex: 'column3',
            className: "width200",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Units',
            dataIndex: 'column4',
            className: "width80 textRight",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charges',
            dataIndex: 'column5',
            className: "width150 textRight",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Insurance Payment(s)',
            dataIndex: 'column6',
            className: "width150 textRight",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient Payment(s) ',
            dataIndex: 'column7',
            className: "width150 textRight",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustment(s)',
            dataIndex: 'column8',
            className: "width150 textRight",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
    ],
    RemittanceReports: [
        {
            title: '',
            dataIndex: 'remittanceReportsId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Check Date',
            dataIndex: 'checkDate',
            className: "width80",
            sorter: (a, b) => {
                a = a.checkDate != null ? a.checkDate : "";
                b = b.checkDate != null ? b.checkDate : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Posted Date',
            dataIndex: 'postedDate',
            className: "width80",
            sorter: (a, b) => {
                a = a.postedDate != null ? a.postedDate : "";
                b = b.postedDate != null ? b.postedDate : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Deposit Date',
            dataIndex: 'depositDate',
            className: "width80",
            sorter: (a, b) => {
                a = a.depositDate != null ? a.depositDate : "";
                b = b.depositDate != null ? b.depositDate : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Check/Trace #',
            dataIndex: 'traceNumber',
            className: "width150",
            sorter: (a, b) => {
                a = a.traceNumber != null ? a.traceNumber.toString() : "";
                b = b.traceNumber != null ? b.traceNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Insurance',
            dataIndex: 'insurance',
            className: "width100",
            sorter: (a, b) => {
                a = a.insurance != null ? a.insurance : "";
                b = b.insurance != null ? b.insurance : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '# of Claims',
            dataIndex: 'numberOfClaims',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.numberOfClaims != null ? a.numberOfClaims : "";
                b = b.numberOfClaims != null ? b.numberOfClaims : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'ERA paid',
            dataIndex: 'eraPaid',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.eraPaid != null ? a.eraPaid.toString() : "";
                b = b.eraPaid != null ? b.eraPaid.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: 'Global Adj',
            dataIndex: 'globalAdjustment',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.globalAdjustment != null ? a.globalAdjustment.toString() : "";
                b = b.globalAdjustment != null ? b.globalAdjustment.toString() : "";
                return a.localeCompare(b);
            },
            render: function (text) {
                return formatCurrency(text);
            }
        },
        {
            title: 'Actual Paid',
            dataIndex: 'actualPaid',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.actualPaid != null ? a.actualPaid.toString() : "";
                b = b.actualPaid != null ? b.actualPaid.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustment',
            dataIndex: 'adjustment',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.adjustment != null ? a.adjustment.toString() : "";
                b = b.adjustment != null ? b.adjustment.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient Resp',
            dataIndex: 'patientResponsibility',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.patientResponsibility != null ? a.patientResponsibility.toString() : "";
                b = b.patientResponsibility != null ? b.patientResponsibility.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            className: "width150",
            sorter: (a, b) => {
                a = a.paymentMethod != null ? a.paymentMethod.toString() : "";
                b = b.paymentMethod != null ? b.paymentMethod.toString() : "";
                return a.localeCompare(b);
            },
            
        },
    ],
    RemittanceReportsDetails: [
        {
            title: '',
            dataIndex: 'remittanceReportsDetailsId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'No.',
            dataIndex: 'number',
            className: "width65",
            sorter: (a, b) => {
                a = a.number != null ? a.number.toString() : "";
                b = b.number != null ? b.number.toString() : "";
                return a.localeCompare(b);
            },
            
        },
        {
            title: 'Patient',
            dataIndex: 'patient',
            className: "width65",
            sorter: (a, b) => {
                a = a.patient != null ? a.patient.toString() : "";
                b = b.patient != null ? b.patient.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Appointment',
            dataIndex: 'appointment',
            className: "width65",
            sorter: (a, b) => {
                a = a.appointment != null ? a.appointment.toString() : "";
                b = b.appointment != null ? b.appointment.toString() : "";
                return a.localeCompare(b);
            },
            
        },
        {
            title: 'Ins ID #',
            dataIndex: 'insuranceId',
            className: "width65",
            sorter: (a, b) => {
                a = a.insuranceId != null ? a.insuranceId.toString() : "";
                b = b.insuranceId != null ? b.insuranceId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Check Date',
            dataIndex: 'checkDate',
            className: "width65",
            sorter: (a, b) => {
                a = a.checkDate != null ? a.checkDate.toString() : "";
                b = b.checkDate != null ? b.checkDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Rejected',
            dataIndex: 'rejected',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.rejected != null ? a.rejected.toString() : "";
                b = b.rejected != null ? b.rejected.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billed',
            dataIndex: 'billed',
            className: "width65",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.billed != null ? a.billed.toString() : "";
                b = b.billed != null ? b.billed.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjusted',
            dataIndex: 'adjusted',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.adjusted != null ? a.adjusted.toString() : "";
                b = b.adjusted != null ? b.adjusted.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Co-ins',
            dataIndex: 'coInsurance',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.coInsurance != null ? a.coInsurance.toString() : "";
                b = b.coInsurance != null ? b.coInsurance.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Pr Resp',
            dataIndex: 'patientResponsibility',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.patientResponsibility != null ? a.patientResponsibility.toString() : "";
                b = b.patientResponsibility != null ? b.patientResponsibility.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            className: "width65",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.paid != null ? a.paid.toString() : "";
                b = b.paid != null ? b.paid.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            className: "width65",
            sorter: (a, b) => {
                a = a.notes != null ? a.notes.toString() : "";
                b = b.notes != null ? b.notes.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width65",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    BillingReports: [
        {
            title: 'Claim ID',
            dataIndex: 'column1',
            className: "width120",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Type',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient Full Name',
            dataIndex: 'column3',
            className: "width120",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Provider Name/ID',
            dataIndex: 'column4',
            className: "width120",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4.toString() : "";
                b = b.column4 != null ? b.column4.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Facility ID',
            dataIndex: 'column5',
            className: "width120",
               sorter: (a, b) => {
                a = a.column5 != null ? a.column5.toString() : "";
                b = b.column5 != null ? b.column5.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge From Date',
            dataIndex: 'column6',
            className: "width120",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6.toString() : "";
                b = b.column6 != null ? b.column6.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim ICD 1',
            dataIndex: 'column7',
            className: "width120",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7.toString() : "";
                b = b.column7 != null ? b.column7.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Principal Diag',
            dataIndex: 'column8',
            className: "width120",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8.toString() : "";
                b = b.column8 != null ? b.column8.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Principal Diag Description',
            dataIndex: 'column9',
            className: "width120",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9.toString() : "";
                b = b.column9 != null ? b.column9.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'CPT Code',
            dataIndex: 'column10',
            className: "width120",
            sorter: (a, b) => {
                a = a.column10 != null ? a.column10.toString() : "";
                b = b.column10 != null ? b.column10.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Modifier 1',
            dataIndex: 'column11',
            className: "width120",
            sorter: (a, b) => {
                a = a.column11 != null ? a.column11.toString() : "";
                b = b.column11 != null ? b.column11.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Modifier 2',
            dataIndex: 'column12',
            className: "width120",
               sorter: (a, b) => {
                a = a.column12 != null ? a.column12.toString() : "";
                b = b.column12 != null ? b.column12.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Modifier 3',
            dataIndex: 'column13',
            className: "width120",
                sorter: (a, b) => {
                a = a.column13 != null ? a.column13.toString() : "";
                b = b.column13 != null ? b.column13.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Modifier 4',
            dataIndex: 'column14',
            className: "width120",
            sorter: (a, b) => {
                a = a.column14 != null ? a.column14.toString() : "";
                b = b.column14 != null ? b.column14.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge POS Code',
            dataIndex: 'column15',
            className: "width120",
            sorter: (a, b) => {
                a = a.column15 != null ? a.column15.toString() : "";
                b = b.column15 != null ? b.column15.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Total Amount',
            dataIndex: 'column16',
            className: "width120",
            sorter: (a, b) => {
                a = a.column16 != null ? a.column16.toString() : "";
                b = b.column16 != null ? b.column16.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Amount',
            dataIndex: 'column17',
            className: "width120",
            sorter: (a, b) => {
                a = a.column17 != null ? a.column17.toString() : "";
                b = b.column17 != null ? b.column17.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Total Payments',
            dataIndex: 'column18',
            className: "width120",
            sorter: (a, b) => {
                a = a.column18 != null ? a.column18.toString() : "";
                b = b.column18 != null ? b.column18.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Total Adjustments',
            dataIndex: 'column19',
            className: "width120",
            sorter: (a, b) => {
                a = a.column19 != null ? a.column19.toString() : "";
                b = b.column19 != null ? b.column19.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Amount Paid',
            dataIndex: 'column20',
            className: "width120",
            sorter: (a, b) => {
                a = a.column20 != null ? a.column20.toString() : "";
                b = b.column20 != null ? b.column20.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Balance',
            dataIndex: 'column21',
            className: "width120",
            sorter: (a, b) => {
                a = a.column21 != null ? a.column21.toString() : "";
                b = b.column21 != null ? b.column21.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Primary Payer Name',
            dataIndex: 'column22',
            className: "width120",
            sorter: (a, b) => {
                a = a.column22 != null ? a.column22.toString() : "";
                b = b.column22 != null ? b.column22.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Charge Current Payer Name',
            dataIndex: 'column23',
            className: "width120",
            sorter: (a, b) => {
                a = a.column23 != null ? a.column23.toString() : "";
                b = b.column23 != null ? b.column23.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim Status',
            dataIndex: 'column24',
            className: "width120",
            sorter: (a, b) => {
                a = a.column24 != null ? a.column24.toString() : "";
                b = b.column24 != null ? b.column24.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    UnmatchedEra: [
        {
            title: 'Date',
            dataIndex: 'column1',
            className: "width100",
            render: function (text) {
                return formatDate(text);
            }
        },
        {
            title: 'Check/Trace',
            dataIndex: 'column2',
            className: "width100",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOS',
            dataIndex: 'column3',
            className: "width100",
            render: function (text) {
                return formatDate(text);
            },
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Insurance',
            dataIndex: 'column4',
            className: "width100",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payment',
            dataIndex: 'column5',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustment',
            dataIndex: 'column6',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustment Reason',
            dataIndex: 'column7',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },

    ],
    UnderpaidItemReports: [
        {
            title: '',
            dataIndex: 'underPaidItemReportsId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date of Service',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Posted',
            dataIndex: 'column2',
            className: "width100",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Code',
            dataIndex: 'column3',
            className: "width150",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payer ID',
            dataIndex: 'column4',
            className: "width150",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4.toString() : "";
                b = b.column4 != null ? b.column4.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payer Name',
            dataIndex: 'column5',
            className: "width220",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5.toString() : "";
                b = b.column5 != null ? b.column5.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billed',
            dataIndex: 'column6',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6.toString() : "";
                b = b.column6 != null ? b.column6.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Allowed',
            dataIndex: 'column7',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7.toString() : "";
                b = b.column7 != null ? b.column7.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Paid',
            dataIndex: 'column8',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8.toString() : "";
                b = b.column8 != null ? b.column8.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Expacted',
            dataIndex: 'column9',
            className: "width100",
            align: "right",
            render: function (text) {
                return formatCurrency(text);
            },
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9.toString() : "";
                b = b.column9 != null ? b.column9.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    AdjustmentsFinancialReports: [
        {
            title: '',
            dataIndex: 'column13',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'column1',
            className: "width130",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOS',
            dataIndex: 'column2',
            className: "width200",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Claim ID',
            dataIndex: 'column3',
            className: "width80",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Provider',
            dataIndex: 'column4',
            className: "width100",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Location',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payer',
            dataIndex: 'column6',
            className: "width80",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
            // render: text => {
            //     return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            // }
        },
        {
            title: 'Check #',
            dataIndex: 'column7',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
            // render: text => {
            //     return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            // }
        },
        {
            title: 'Credits',
            dataIndex: 'column8',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustments',
            dataIndex: 'column9',
            className: "width65",
            align: "right",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'column10',
            className: "width100",
            sorter: (a, b) => {
                a = a.column10 != null ? a.column10 : "";
                b = b.column10 != null ? b.column10 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adj. Reason',
            dataIndex: 'column11',
            className: "width100",
            sorter: (a, b) => {
                a = a.column11 != null ? a.column11 : "";
                b = b.column11 != null ? b.column11 : "";
                return a.localeCompare(b);
            },
        },
    ],
    PatientsPaymentFinancialReports: [
        {
            title: '',
            dataIndex: 'patientsPaymentId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'column1',
            className: "width130",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOS',
            dataIndex: 'column2',
            className: "width200",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Claim ID',
            dataIndex: 'column3',
            className: "width80",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Provider',
            dataIndex: 'column4',
            className: "width120",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Location',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Method',
            dataIndex: 'column6',
            className: "width80",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Trace #',
            dataIndex: 'column7',
            className: "width100",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Created By',
            dataIndex: 'column8',
            className: "width100",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient Payment',
            dataIndex: 'column9',
            className: "width80",
            align: "right",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'column10',
            className: "width100",
             sorter: (a, b) => {
                a = a.column10 != null ? a.column10 : "";
                b = b.column10 != null ? b.column10 : "";
                return a.localeCompare(b);
            },
        },
    ],
    ChargesFinancialReports: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Posted Date',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width150",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Appointment Date',
            dataIndex: 'column3',
            className: "width100",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Provider',
            dataIndex: 'column4',
            className: "width120",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Debit',
            dataIndex: 'column5',
            className: "width120",
            align: "right",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Credit',
            dataIndex: 'column6',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustments',
            dataIndex: 'column7',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Copay/Cash',
            dataIndex: 'column8',
            className: "width100",
            align: "right",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'column9',
            className: "width150",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
    ],
    TransactionsByAppointmentColumns: [
        {
            title: '',
            dataIndex: 'key',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Appointment',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width150",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Provider',
            dataIndex: 'column3',
            className: "width180",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billed',
            dataIndex: 'column4',
            className: "width120",
            align: "right",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Adjustments',
            dataIndex: 'column5',
            className: "width80",
            align: "right",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ins Paid',
            dataIndex: 'column6',
            className: "width80",
            align: "right",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Pt Paid',
            dataIndex: 'column7',
            className: "width80",
            align: "right",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Posted Date',
            dataIndex: 'column8',
            className: "width100",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'column9',
            className: "width150",
              sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
    ],
    AccountReceivableInsuranceReportColumns: [
        {
            title: '',
            dataIndex: 'insuranceId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Payer',
            dataIndex: 'payer',
            className: "width180",
             sorter: (a, b) => {
                a = a.payer != null ? a.payer.toString() : "";
                b = b.payer != null ? b.payer.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '0-30 Days',
            dataIndex: 'zeroToThirtyDays',
            className: "width150",
            sorter: (a, b) => {
                a = a.zeroToThirtyDays != null ? a.zeroToThirtyDays.toString() : "";
                b = b.zeroToThirtyDays != null ? b.zeroToThirtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '31-60 Days',
            dataIndex: 'thirtyOneToSixtyDays',
            className: "width150",
            sorter: (a, b) => {
                a = a.thirtyOneToSixtyDays != null ? a.thirtyOneToSixtyDays.toString() : "";
                b = b.thirtyOneToSixtyDays != null ? b.thirtyOneToSixtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '61-90 Days',
            dataIndex: 'sixtyOneToNinetyDays',
            className: "width150",
            sorter: (a, b) => {
                a = a.sixtyOneToNinetyDays != null ? a.sixtyOneToNinetyDays.toString() : "";
                b = b.sixtyOneToNinetyDays != null ? b.sixtyOneToNinetyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '91-120 Days',
            dataIndex: 'ninetyOneToOneTwentyDays',
            className: "width150",
            sorter: (a, b) => {
                a = a.ninetyOneToOneTwentyDays != null ? a.ninetyOneToOneTwentyDays.toString() : "";
                b = b.ninetyOneToOneTwentyDays != null ? b.ninetyOneToOneTwentyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '121+ Days',
            dataIndex: 'oneTwentyToPlusDays',
            className: "width150",
            sorter: (a, b) => {
                a = a.oneTwentyToPlusDays != null ? a.oneTwentyToPlusDays.toString() : "";
                b = b.oneTwentyToPlusDays != null ? b.oneTwentyToPlusDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            className: "width150",
            sorter: (a, b) => {
                a = a.total != null ? a.total.toString() : "";
                b = b.total != null ? b.total.toString() : "";
                return a.localeCompare(b);
            },
        
        },
    ],
    AccountReceivablePatientsReportColumns: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            className: "width12 0",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date of Birth',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
            
        },
        {
            title: 'Phone',
            dataIndex: 'column3',
            className: "width150",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '0-30 Days',
            dataIndex: 'zeroToThirtyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.zeroToThirtyDays != null ? a.zeroToThirtyDays.toString() : "";
                b = b.zeroToThirtyDays != null ? b.zeroToThirtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '31-60 Days',
            dataIndex: 'thirtyOneToSixtyDays',
            className: "width120",
             sorter: (a, b) => {
                a = a.thirtyOneToSixtyDays != null ? a.thirtyOneToSixtyDays.toString() : "";
                b = b.thirtyOneToSixtyDays != null ? b.thirtyOneToSixtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '61-90 Days',
            dataIndex: 'sixtyOneToNinetyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.sixtyOneToNinetyDays != null ? a.sixtyOneToNinetyDays.toString() : "";
                b = b.sixtyOneToNinetyDays != null ? b.sixtyOneToNinetyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '91-120 Days',
            dataIndex: 'ninetyOneToOneTwentyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.ninetyOneToOneTwentyDays != null ? a.ninetyOneToOneTwentyDays.toString() : "";
                b = b.ninetyOneToOneTwentyDays != null ? b.ninetyOneToOneTwentyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '121+ Days',
            dataIndex: 'oneTwentyToPlusDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.oneTwentyToPlusDays != null ? a.oneTwentyToPlusDays.toString() : "";
                b = b.oneTwentyToPlusDays != null ? b.oneTwentyToPlusDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            className: "width120",

        },
    ],
    AccountReceivableInsuranceDetailsReportColumns: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Payer',
            dataIndex: 'payer',
            className: "width150",
            sorter: (a, b) => {
                a = a.payer != null ? a.payer.toString() : "";
                b = b.payer != null ? b.payer.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '0-30 Days',
            dataIndex: 'zeroToThirtyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.zeroToThirtyDays != null ? a.zeroToThirtyDays.toString() : "";
                b = b.zeroToThirtyDays != null ? b.zeroToThirtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '31-60 Days',
            dataIndex: 'thirtyOneToSixtyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.thirtyOneToSixtyDays != null ? a.thirtyOneToSixtyDays.toString() : "";
                b = b.thirtyOneToSixtyDays != null ? b.thirtyOneToSixtyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '61-90 Days',
            dataIndex: 'sixtyOneToNinetyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.sixtyOneToNinetyDays != null ? a.sixtyOneToNinetyDays.toString() : "";
                b = b.sixtyOneToNinetyDays != null ? b.sixtyOneToNinetyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '91-120 Days',
            dataIndex: 'ninetyOneToOneTwentyDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.ninetyOneToOneTwentyDays != null ? a.ninetyOneToOneTwentyDays.toString() : "";
                b = b.ninetyOneToOneTwentyDays != null ? b.ninetyOneToOneTwentyDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: '121+ Days',
            dataIndex: 'oneTwentyToPlusDays',
            className: "width120",
            sorter: (a, b) => {
                a = a.oneTwentyToPlusDays != null ? a.oneTwentyToPlusDays.toString() : "";
                b = b.oneTwentyToPlusDays != null ? b.oneTwentyToPlusDays.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            className: "width120",

        },
    ],
    AccountReceivableSpecialityReportColumns: [
        {
            title: '',
            dataIndex: 'specialityId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Service Department',
            dataIndex: 'serviceDepartment',
            className: "width150",
            sorter: (a, b) => {
                a = a.serviceDepartment != null ? a.serviceDepartment.toString() : "";
                b = b.serviceDepartment != null ? b.serviceDepartment.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of <30',
            dataIndex: 'lessThanThirty',
            className: "width120",
            render: text => {
                return text <= 0 ? <span>{text}</span> : <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.lessThanThirty != null ? a.lessThanThirty.toString() : "";
                b = b.lessThanThirty != null ? b.lessThanThirty.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of 31 - 60',
            dataIndex: 'sumOfThirtyOneToSixty',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfThirtyOneToSixty != null ? a.sumOfThirtyOneToSixty.toString() : "";
                b = b.sumOfThirtyOneToSixty != null ? b.sumOfThirtyOneToSixty.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of 61 - 90',
            dataIndex: 'sumOfSixtyOneToNinety',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfSixtyOneToNinety != null ? a.sumOfSixtyOneToNinety.toString() : "";
                b = b.sumOfSixtyOneToNinety != null ? b.sumOfSixtyOneToNinety.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of 91 - 120',
            dataIndex: 'sumOfNinetyOneToOneTwenty',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfNinetyOneToOneTwenty != null ? a.sumOfNinetyOneToOneTwenty.toString() : "";
                b = b.sumOfNinetyOneToOneTwenty != null ? b.sumOfNinetyOneToOneTwenty.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of 121 - 180',
            dataIndex: 'sumOfOneTwentyToOneEighty',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfOneTwentyToOneEighty != null ? a.sumOfOneTwentyToOneEighty.toString() : "";
                b = b.sumOfOneTwentyToOneEighty != null ? b.sumOfOneTwentyToOneEighty.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of 181 - 365',
            dataIndex: 'sumOfOneTwentyOneToThreeSixtyFive',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfOneTwentyOneToThreeSixtyFive != null ? a.sumOfOneTwentyOneToThreeSixtyFive.toString() : "";
                b = b.sumOfOneTwentyOneToThreeSixtyFive != null ? b.sumOfOneTwentyOneToThreeSixtyFive.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of > 365',
            dataIndex: 'sumGreaterThanThreeSixtyFive',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumGreaterThanThreeSixtyFive != null ? a.sumGreaterThanThreeSixtyFive.toString() : "";
                b = b.sumGreaterThanThreeSixtyFive != null ? b.sumGreaterThanThreeSixtyFive.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sum of AR',
            dataIndex: 'sumOfAR',
            className: "width120",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.sumOfAR != null ? a.sumOfAR.toString() : "";
                b = b.sumOfAR != null ? b.sumOfAR.toString() : "";
                return a.localeCompare(b);
            },

        },
    ],
    PatientInsuranceAuthorizationReportsColumns: [
        {
            title: '',
            dataIndex: 'authorizationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Auth Number',
            dataIndex: 'column1',
            className: "width65",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Start Date',
            dataIndex: 'column3',
            className: "width100",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'End Date',
            dataIndex: 'column4',
            className: "width100",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Specialty',
            dataIndex: 'column5',
            className: "width100",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total Visits',
            dataIndex: 'column6',
            className: "width100 textRight",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Visits',
            dataIndex: 'column7',
            className: "width100 textRight",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Visits Remaining',
            dataIndex: 'column8',
            className: "width100 textRight",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notes',
            dataIndex: 'column9',
            className: "width100",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'column10',
            className: "width100",
            sorter: (a, b) => {
                a = a.column10 != null ? a.column10 : "";
                b = b.column10 != null ? b.column10 : "";
                return a.localeCompare(b);
            },
        },
    ],
    MedicationReportsColumns: [
        {
            title: '',
            dataIndex: 'medicationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Chart ID',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width100 HyperLink",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOB',
            dataIndex: 'column3',
            className: "width100",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Medication',
            dataIndex: 'column4',
            className: "maxWidth130",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'column5',
            className: "width100",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Prescribed Date',
            dataIndex: 'column6',
            className: "width100",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Start Taking Date',
            dataIndex: 'column7',
            className: "width100",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Stop Taking Date',
            dataIndex: 'column8',
            className: "width100",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
    ],
    DiagnosisReportsColumns: [
        {
            title: '',
            dataIndex: 'diagnosisId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Chart ID',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width100 HyperLink",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOB',
            dataIndex: 'column3',
            className: "width100",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Provider/Staff',
            dataIndex: 'column4',
            className: "width100",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Diagnosis',
            dataIndex: 'column5',
            className: "width100",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'ICD-10',
            dataIndex: 'column6',
            className: "width100",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'SNOMED',
            dataIndex: 'column7',
            className: "width100",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Diagnosed Date',
            dataIndex: 'column8',
            className: "width100",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'column9',
            className: "width100",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Changed',
            dataIndex: 'column10',
            className: "width100",
            sorter: (a, b) => {
                a = a.column10 != null ? a.column10 : "";
                b = b.column10 != null ? b.column10 : "";
                return a.localeCompare(b);
            },
        },
    ],
    AllergyReportsColumns: [
        {
            title: 'Chart ID',
            dataIndex: 'column1',
            className: "width120",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient(s)',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOB',
            dataIndex: 'column3',
            className: "width100",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Allergies',
            dataIndex: 'column4',
            className: "width180",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Reaction',
            dataIndex: 'column5',
            className: "width150",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Onset',
            dataIndex: 'column6',
            className: "width100",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Diagnosed',
        //    dataIndex: 'column7',
        //    className: "width100",
        //},
        {
            title: 'Status',
            dataIndex: 'column7',
            className: "width100",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
    ],
    DrugInterationReportColumns: [
        {
            title: '',
            dataIndex: 'drugInterationId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Chart ID',
            dataIndex: 'chartId',
            className: "width120",
            sorter: (a, b) => {
                a = a.chartId != null ? a.chartId : "";
                b = b.chartId != null ? b.chartId : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width120",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName : "";
                b = b.patientName != null ? b.patientName : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            className: "width100",
            sorter: (a, b) => {
                a = a.dob != null ? a.dob : "";
                b = b.dob != null ? b.dob : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Interation',
            dataIndex: 'interation',
            className: "width180",
            sorter: (a, b) => {
                a = a.interation != null ? a.interation : "";
                b = b.interation != null ? b.interation : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            className: "width150",
            sorter: (a, b) => {
                a = a.severity != null ? a.severity : "";
                b = b.severity != null ? b.severity : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Alert',
            dataIndex: 'alert',
            className: "width150",
            sorter: (a, b) => {
                a = a.alert != null ? a.alert : "";
                b = b.alert != null ? b.alert : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Response',
            dataIndex: 'response',
            className: "width100",
            sorter: (a, b) => {
                a = a.response != null ? a.response : "";
                b = b.response != null ? b.response : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            className: "width100",
            sorter: (a, b) => {
                a = a.date != null ? a.date : "";
                b = b.date != null ? b.date : "";
                return a.localeCompare(b);
            },
        },
    ],
    PatientReportsColumns: [
        {
            title: '',
            dataIndex: 'patientReportId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Chart ID',
            dataIndex: 'column1',
            className: "width100",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Patient',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Age',
            dataIndex: 'column3',
            className: "width65",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sex',
            dataIndex: 'column4',
            className: "width80",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Race',
            dataIndex: 'column5',
            className: "width100",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ethnicity',
            dataIndex: 'column6',
            className: "width100",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Pref. Lang',
            dataIndex: 'column7',
            className: "width100",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Recorded',
            dataIndex: 'column8',
            className: "width100",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Pref.Comms',
            dataIndex: 'column9',
            className: "width100",
            sorter: (a, b) => {
                a = a.column9 != null ? a.column9 : "";
                b = b.column9 != null ? b.column9 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: ' Pref.Comms.Updated',
            dataIndex: 'column10',
            className: "width100",
            sorter: (a, b) => {
                a = a.column10 != null ? a.column10 : "";
                b = b.column10 != null ? b.column10 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Smoking Status',
            dataIndex: 'column11',
            className: "width100",
            sorter: (a, b) => {
                a = a.column11 != null ? a.column11 : "";
                b = b.column11 != null ? b.column11 : "";
                return a.localeCompare(b);
            },
        },
    ],
    ChartNotesTemplate: [
        {
            title: '',
            dataIndex: 'listItemIndex',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'itemTitle',
            sorter: (a, b) => {
                a = a.itemTitle != null ? a.itemTitle : "";
                b = b.itemTitle != null ? b.itemTitle : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Short Code',
            dataIndex: 'itemCode',
            sorter: (a, b) => {
                a = a.itemCode != null ? a.itemCode : "";
                b = b.itemCode != null ? b.itemCode : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Speciality',
            dataIndex: 'specializations',
            sorter: (a, b) => {
                a = a.specializations != null ? a.specializations : "";
                b = b.specializations != null ? b.specializations : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Encounter Section',
            dataIndex: 'sectionCodes',
            sorter: (a, b) => {
                a = a.sectionCodes != null ? a.sectionCodes : "";
                b = b.sectionCodes != null ? b.sectionCodes : "";
                return a.localeCompare(b);
            },
            render: text => {
                if (text)
                    return text.replace('cheif_complaint', 'Chief Complaint').replace('chart_notes', 'Chart Notes').replace('checkout_notes', 'Checkout Notes')
                        .replace('Physical_Exam', 'Physical Exam').replace('plan_of_care', 'Plan of Care');
            }

        },
        {
            title: 'Created By',
            dataIndex: 'createByName',
            sorter: (a, b) => {
                a = a.createByName != null ? a.createByName : "";
                b = b.createByName != null ? b.createByName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Action',
            dataIndex: 'templateAction',
            align: "center",
            className: "templateAction",
            className: "width130"

        }
    ],
    PatientLedgerReportColumns: [
        {
            title: '',
            dataIndex: 'insuranceId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'ID',
            dataIndex: 'column1',
            className: "width180",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Patient/Payer Name',
            dataIndex: 'column2',
            className: "width180",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: '0-30 Days',
            dataIndex: 'column3',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: '31-60 Days',
            dataIndex: 'column4',
            className: "width150",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: '61-90 Days',
            dataIndex: 'column5',
            className: "width150",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: '91-120 Days',
            dataIndex: 'column6',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: '121+ Days',
            dataIndex: 'column7',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
            render: function (text) {

                return formatCurrency(text);
            }
        },
        {
            title: 'Total',
            dataIndex: 'column8',
            className: "width150",
            sorter: (a, b) => {
                a = a.column8 != null ? a.column8 : "";
                b = b.column8 != null ? b.column8 : "";
                return a.localeCompare(b);
            },
            align: "right",
            render: function (text) {

                return formatCurrency(text);
            }
        },
    ],
    PatientLedgerDetailsReportColumns: [
        {
            title: '',
            dataIndex: 'insuranceId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'ID',
            dataIndex: 'payerId',
            className: "width180",
            sorter: (a, b) => {
                a = a.payerId != null ? a.payerId : "";
                b = b.payerId != null ? b.payerId : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Payer Name',
            dataIndex: 'payerName',
            className: "width180",
            sorter: (a, b) => {
                a = a.payerName != null ? a.payerName : "";
                b = b.payerName != null ? b.payerName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: '0-30 Days',
            dataIndex: 'zeroToThirtyDays',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.zeroToThirtyDays != null ? a.zeroToThirtyDays : "";
                b = b.zeroToThirtyDays != null ? b.zeroToThirtyDays : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: '31-60 Days',
            dataIndex: 'thirtyOneToSixtyDays',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.thirtyOneToSixtyDays != null ? a.thirtyOneToSixtyDays : "";
                b = b.thirtyOneToSixtyDays != null ? b.thirtyOneToSixtyDays : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: '61-90 Days',
            dataIndex: 'sixtyOneToNinetyDays',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.sixtyOneToNinetyDays != null ? a.sixtyOneToNinetyDays : "";
                b = b.sixtyOneToNinetyDays != null ? b.sixtyOneToNinetyDays : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: '91-120 Days',
            dataIndex: 'ninetyOneToOneTwentyDays',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.ninetyOneToOneTwentyDays != null ? a.ninetyOneToOneTwentyDays : "";
                b = b.ninetyOneToOneTwentyDays != null ? b.ninetyOneToOneTwentyDays : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: '121+ Days',
            dataIndex: 'oneTwentyToPlusDays',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.oneTwentyToPlusDays != null ? a.oneTwentyToPlusDays : "";
                b = b.oneTwentyToPlusDays != null ? b.oneTwentyToPlusDays : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
        {
            title: 'Total',
            dataIndex: 'total',
            className: "width150",
            align: "right",
            sorter: (a, b) => {
                a = a.total != null ? a.total : "";
                b = b.total != null ? b.total : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{formatCurrency(text)}</Typography>;
            }
        },
    ],
    DrugInteractionReportColumns: [
        {
            title: '',
            dataIndex: 'drugInteractionId',
            className: "custom-grid-hide-col",
        },
        {
            title: ' Chart ID',
            dataIndex: 'chartId',
            className: "width180",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.chartId != null ? a.chartId : "";
                b = b.chartId != null ? b.chartId : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width180",
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            },
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName : "";
                b = b.patientName != null ? b.patientName : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            className: "width120",
            sorter: (a, b) => {
                a = a.dob != null ? a.dob : "";
                b = b.dob != null ? b.dob : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            className: "width120",
            sorter: (a, b) => {
                a = a.date != null ? a.date : "";
                b = b.date != null ? b.date : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Interaction',
            dataIndex: 'interaction',
            className: "width180",
            sorter: (a, b) => {
                a = a.interaction != null ? a.interaction : "";
                b = b.interaction != null ? b.interaction : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            className: "width150",
            sorter: (a, b) => {
                a = a.severity != null ? a.severity : "";
                b = b.severity != null ? b.severity : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Alert',
            dataIndex: 'alert',
            className: "width150",
            sorter: (a, b) => {
                a = a.alert != null ? a.alert : "";
                b = b.alert != null ? b.alert : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width150",
            sorter: (a, b) => {
                a = a.status != null ? a.status : "";
                b = b.status != null ? b.status : "";
                return a.localeCompare(b);
            }
        },
    ],
    AuditLogReportColumns: [
        {
            title: '',
            dataIndex: 'auditlogId',
            className: "custom-grid-hide-col",
        },
        {
            title: ' Session ID',
            dataIndex: 'column1',
            className: "width80",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Date/Time',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Patient',
            dataIndex: 'column3',
            className: "width180",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Typography className="grid-text">{text}</Typography>;
            }
        },
        {
            title: 'User',
            dataIndex: 'column4',
            className: "width120",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Area',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Activity',
            dataIndex: 'column6',
            className: "width120",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Details',
            dataIndex: 'column7',
            className: "width250",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7 : "";
                b = b.column7 != null ? b.column7 : "";
                return a.localeCompare(b);
            },
        },
    ],
    FormsListColumns: [
        {
            title: '',
            dataIndex: 'formsListId',
            className: "custom-grid-hide-col",
        },
        {
            title: ' Type',
            dataIndex: 'type',
            className: "width80",
            sorter: (a, b) => {
                a = a.type != null ? a.type.toString() : "";
                b = b.type != null ? b.type.toString() : "";
                return a.localeCompare(b);
            },
            
        },
        {
            title: 'Subtype',
            dataIndex: 'subType',
            className: "width120",
            sorter: (a, b) => {
                a = a.subType != null ? a.subType.toString() : "";
                b = b.subType != null ? b.subType.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Document ID',
            dataIndex: 'documentId',
            className: "width180",
            sorter: (a, b) => {
                a = a.documentId != null ? a.documentId.toString() : "";
                b = b.documentId != null ? b.documentId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            className: "width180",
            sorter: (a, b) => {
                a = a.title != null ? a.title.toString() : "";
                b = b.title != null ? b.title.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width180",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
            className: "width120",
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Version',
            dataIndex: 'version',
            className: "width120",
            sorter: (a, b) => {
                a = a.version != null ? a.version.toString() : "";
                b = b.version != null ? b.version.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width120",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width120 justifyRight",
        },
    ],
    ProductivityReport: [
        {
            title: '',
            dataIndex: 'column1',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Location',
            dataIndex: 'column1',
            className: "width220",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1 : "";
                b = b.column1 != null ? b.column1 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Provider',
            dataIndex: 'column2',
            className: "width150",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2 : "";
                b = b.column2 != null ? b.column2 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Appointments',
            dataIndex: 'column3',
            className: "width80",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3 : "";
                b = b.column3 != null ? b.column3 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: ' Appointment Duration',
            dataIndex: 'column4',
            className: "width180",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4 : "";
                b = b.column4 != null ? b.column4 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Breaks',
            dataIndex: 'column5',
            className: "width150",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5 : "";
                b = b.column5 != null ? b.column5 : "";
                return a.localeCompare(b);
            }
        },
        {
            title: 'Breaks Duration',
            dataIndex: 'column6',
            className: "width80",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6 : "";
                b = b.column6 != null ? b.column6 : "";
                return a.localeCompare(b);
            }
        },
        
    ],
    ECQMDashbaord: [
        {
            title: '',
            dataIndex: 'ecqmId',
            className: "custom-grid-hide-col",
        },
        {
            title: ' eCQM',
            dataIndex: 'description',
            className: "width220",
            render: text => {
                return <Typography className="grid-text" title={text}>{text.length > 100 ? text.substring(0, 99)+'...' : text}</Typography>;
            }
        },
        {
            title: 'Score',
            dataIndex: 'score',
            className: "width150",
            // render: text => {
            //     return <Typography className="grid-text">{text}</Typography>;
            // }
        },
        {
            title: 'NMT/ DNMT',
            dataIndex: 'nmt',
            align: 'left',
            className: "width100",
        },
        {
            title: ' Excl/Exc',
            dataIndex: 'exc',
            align: 'left',
            className: "width100",
        },
    ],
    ChartNotesType: [
        {
            title: 'Default',
            dataIndex: 'isDefault',
            className: "width100",
            sorter: (a, b) => {
                a = a.isDefault != null ? a.isDefault.toString() : "";
                b = b.isDefault != null ? b.isDefault.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Name',
            dataIndex: 'chartNoteType',
            className: "width150",
            sorter: (a, b) => {
                a = a.chartNoteType != null ? a.chartNoteType : "";
                b = b.chartNoteType != null ? b.chartNoteType : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Format',
            dataIndex: 'chartNoteformat',
            className: "width100",
            sorter: (a, b) => {
                a = a.chartNoteformat != null ? a.chartNoteformat : "";
                b = b.chartNoteformat != null ? b.chartNoteformat : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            className: "width100",
              sorter: (a, b) => {
                a = a.isActive != null ? a.isActive : "";
                b = b.isActive != null ? b.isActive : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width120",
            align: "center",
        }
    ]
};
