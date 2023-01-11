export const data = {
    PatientColumns: [
        {
            label: '',
            field: 'patientId',
            width: 270,
            hidden: true
        },
        {
            label: '',
            field: 'dp',
            width: 270
        },
        {
            label: 'Chart ID',
            field: 'chartNumber',
            width: 150
        },
        {
            label: 'Name',
            field: 'name',
            width: 270
        },

        {
            label: 'Email',
            field: 'emailAddress',
            width: 100
        },
        {
            label: 'Last Appointment',
            field: 'lastAppointment',
            width: 150
        },
        {
            label: 'Next Appointment',
            field: 'nextAppointment',
            width: 100
        },
        {
            label: 'Cell #',
            field: 'cellPhone',
            width: 100
        },
        {
            label: 'Status',
            field: 'statusCode',
            width: 100
        }
    ],
    DoctorColumns: [{
        label: '',

        field: 'dp',
        width: 270
    }, {
        label: 'Doctor ID',
        field: 'id',
        width: 150
    },
    {
        label: 'Doctor Name',
        field: 'LastName',
        width: 270
    },
    {
        label: 'Doctor Last Name',
        field: 'FirstName',
        width: 200
    },
    {
        label: 'Doctor Email',
        field: 'Email',
        width: 100
    },
    {
        label: 'Last Appointment',
        field: 'LastAppointment',
        width: 150
    },
    {
        label: 'Next Appointment',
        field: 'NextAppointment',
        width: 100
    },
    {
        label: 'Status',
        field: 'Status',
        width: 100
    }
    ],
    Location: [
        {
            label: '',
            field: 'location_id',
            width: 270,
            hidden: true
        },
        {
            label: 'Location Name',
            field: 'name',
            width: 270
        },
        {
            label: 'Address',
            field: 'address',
            width: 270
        },
        {
            label: 'Cell #',
            field: 'phone',
            width: 270
        },
        {
            label: 'Start Time',
            field: 'office_start_hours',
            width: 200
        },
        {
            label: 'Close Time',
            field: 'office_closing_hours',
            width: 100
        }
    ],
    AppointmentProfile: [
        {
            label: '',
            field: 'appointmentProfileID',
            width: 270,
            hidden: true
        },
        {
            label: 'Name',
            field: 'profileName',
            width: 270
        },
        {
            label: 'Duration',
            field: 'durationString',
            width: 270
        },
        {
            label: 'Visit Reason',
            field: 'visitReason',
            width: 270
        },
        {
            label: 'Consent Form',
            field: 'noOfConsentForm',
            width: 150
        }
    ],
    ConsentForm: [
        {
            label: '',
            field: 'consentFormID',
            width: 270,
            hidden: true
        },
        {
            label: 'Name',
            field: 'name',
            width: 270
        },
        {
            label: 'Mandatory',
            field: 'mandatory',
            width: 270
        },
        {
            label: 'Assigned By Default',
            field: 'default',
            width: 270
        }
    ],
    Provider: [
        {
            label: '',
            field: 'userID',
            width: 270,
            hidden: true
        },
        {
            label: '',
            field: 'dp',
            width: 70,
            hidden: true
        },
        {
            label: 'Name',
            field: 'fullName',
            width: 270
        },
        {
            label: 'Primary Location',
            field: 'primaryLocation',
            width: 270
        },
        {
            label: 'Personal NPI',
            field: 'personalNpi',
            width: 270
        },
        {
            label: 'Speciality',
            field: 'specializationName',
            width: 270
        },
        {
            label: 'Email',
            field: 'emailAddress',
            width: 270
        },
        {
            label: 'Cell #',
            field: 'cellPhone',
            width: 270
        }
    ],
    Staff: [
        {
            label: '',
            field: 'userID',
            width: 270,
            hidden: true
        },
        {
            label: '',
            field: 'dp',
            width: 70,
            hidden: true
        },
        {
            label: 'Name',
            field: 'fullName',
            width: 270
        },
        {
            label: 'Primary Location',
            field: 'primaryLocation',
            width: 270
        },
        {
            label: 'Primary Provider',
            field: 'primaryProviderName',
            width: 270
        },
        {
            label: 'Email',
            field: 'emailAddress',
            width: 270
        },
        {
            label: 'Cell #',
            field: 'cellPhone',
            width: 270
        }
    ],
    Specialization: [
        {
            label: '',
            field: 'specializationID',
            width: 270,
            hidden: true
        },
        {
            label: 'Name',
            field: 'name',
            width: 270
        },
        {
            label: 'Description',
            field: 'description',
            width: 270
        }
    ],
    ScheduleSlots: [
        {
            label: '',
            field: 'providerSlotID',
            width: 270,
            hidden: true
        },
        {
            label: '',
            field: 'check',
            width: 270
        },
        {
            label: 'Date',
            field: 'scheduleDate',
            width: 270
        },
        {
            label: 'Time',
            field: 'scheduleTime',
            width: 270
        },
        {
            label: 'Location',
            field: 'locationName',
            width: 270
        },
        {
            label: 'Provider',
            field: 'providerName',
            width: 270
        },
        {
            label: 'Patient',
            field: 'patientName',
            width: 270
        },
        {
            label: 'Reason',
            field: 'patientApptReason',
            width: 270
        },
        {
            label: 'Status',
            field: 'statusCode',
            width: 270
        }
    ],
    UserRoles: [
        {
            label: '',
            field: 'role_id',
            width: 270,
            hidden: true
        },
        {
            label: 'Role Name',
            field: 'role_name',
            width: 270
        },
        {
            label: 'Description',
            field: 'role_description',
            width: 270
        },
    ],
    LogDetails: [
        {
            label: '',
            field: 'id',
            width: 270,
        },
        {
            label: 'Action',
            field: 'action_type',
            width: 150
        },
        {
            label: 'By',
            field: 'updated_by_name',
            width: 270,
        },
        {
            label: 'Date',
            field: 'update_date_str',
            width: 150
        },

        {
            label: 'Field',
            field: 'column_display_val',
            width: 270,
        },
        {
            label: 'New Value',
            field: 'new_value',
            width: 150
        },
        {
            label: 'Old Value',
            field: 'old_value',
            width: 150
        },
    ],
    ClinicalNotes: [
        {
            label: '',
            field: 'id',
            width: 270,
        },
        {
            label: 'Patient',
            field: 'patientName',
            width: 150,
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Date of Service',
            field: 'dateOfService',
            width: 270,
            sorter: (a, b) => {
                a = a.dateOfService != null ? a.dateOfService.toString() : "";
                b = b.dateOfService != null ? b.dateOfService.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Rendering Provider',
            field: 'renderingProvider',
            width: 150,
            sorter: (a, b) => {
                a = a.renderingProvider != null ? a.renderingProvider.toString() : "";
                b = b.renderingProvider != null ? b.renderingProvider.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            label: 'Locked (Rendering Signed)',
            field: 'locked',
            width: 270,
            sorter: (a, b) => {
                a = a.locked != null ? a.locked.toString() : "";
                b = b.locked != null ? b.locked.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Supervising Signed Off',
            field: 'supervisingSignedOff',
            width: 150,
            sorter: (a, b) => {
                a = a.supervisingSignedOff != null ? a.supervisingSignedOff.toString() : "";
                b = b.supervisingSignedOff != null ? b.supervisingSignedOff.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Action',
            field: 'action',
            width: 150
        },
    ],
    AllTaskColumns: [
        {
            label: '',
            field: 'id',
            width: 270,
        },
        {
            label: 'Date',
            field: 'strDate',
            width: 150
        },
        {
            label: 'Date of Service',
            field: 'dateOfService',
            width: 270,
        },
        {
            label: 'Rendering Provider',
            field: 'renderingProvider',
            width: 150
        },

        {
            label: 'Locked (Rendering Signed)',
            field: 'locked',
            width: 270,
        },
        {
            label: 'Supervising Signed Off',
            field: 'supervisingSignedOff',
            width: 150
        },
        {
            label: 'Action',
            field: 'action',
            width: 150
        },
    ],
    EPrescription: [
        {
            label: '',
            field: 'requestId',
            width: 270,
        },
        {
            label: 'Provider',
            field: 'fullName',
            width: 150
        },
        {
            label: 'User Role',
            field: 'role',
            width: 270,
        },
        {
            label: 'Status',
            field: 'status',
            width: 150
        },
        {
            label: 'Can mark as ready to sign',
            field: 'canMarkasReadyToSign',
            width: 150
        },
        {
            label: 'Can Sign',
            field: 'canSign',
            width: 270,
        },
        {
            label: 'Actions',
            field: 'action',
            width: 150
        },
    ],
    EPendingPrescription: [
        {
            label: '',
            field: 'requestId',
            width: 270,
        },
        {
            label: 'Provider',
            field: 'fullName',
            width: 150
        },
        {
            label: 'User Role',
            field: 'role',
            width: 270,
        },
        {
            label: 'Status',
            field: 'status',
            width: 150
        },
        {
            label: 'Can mark as ready to sign',
            field: 'canMarkasReadyToSign',
            width: 150
        },
        {
            label: 'Can Sign',
            field: 'canSign',
            width: 270,
        },
    ],
    PayersColumns: [
        {
            label: '',
            field: 'payerId',
            width: 270,
        },
        {
            label: 'Payer / Plan',
            field: 'payer',
            width: 150
        },
        {
            label: 'Type',
            field: 'planTypeCode',
            width: 270,
        },
        {
            label: 'Address',
            field: 'address',
            width: 150
        },
        {
            label: 'Status',
            field: 'status',
            width: 150
        },
    ],
};
