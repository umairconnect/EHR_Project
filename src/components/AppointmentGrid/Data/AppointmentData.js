export const data = {

    PatientAppointments: [
        {
            title: '',
            dataIndex: 'patientAppointmentID',
            className: "custom-grid-hide-col",
        },
        {
            title: '',
            dataIndex: 'eligibility',
            align: "center",
        },
        {
            title: '',
            dataIndex: 'isEncounterSign',
            align: "center",
        },
        {
            title: 'Appointment Status',
            dataIndex: 'statusCode',
            className: "width140",
        },
        {
            title: 'Appt. Time',
            dataIndex: 'patientAppointmentDateTime',
            className: "width80",
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width140",
        },
        //{
        //    title: 'Gender',
        //    dataIndex: 'gender_code',
        //},
        {
            title: 'Cell #',
            dataIndex: 'cellPhone',
            className: "width120",
        },
        {
            title: 'Location',
            dataIndex: 'locationName',
            className: "width120",
        },
        {
            title: "Provider",
            dataIndex: "providerName",
            className: "width130",
        },
        {
            title: 'Reason',
            dataIndex: 'reasonOfVisit',
            className: "width150",
        },
        // {
        //     title: 'Balance',
        //     dataIndex: 'balance',
        //     className: "width65",
        // },
        {
            title: 'Copay',
            dataIndex: 'copay',
            className: "width80",
        },
        {
            title: 'Confirmation',
            dataIndex: 'confirmation',
            className: "width130",
        },
        // {
        //     title: 'Deductables',
        //     dataIndex: 'deductables',
        //     className: "width80",
        // },
        //{
        //    title: 'Notes',
        //    dataIndex: 'notes',
        //    width: 270
        //},
        {
            title: 'Actions',
            dataIndex: 'action',
            fixed: "right",
            className: "width140",
        },

    ],
    PatientAppointmentIndividual: [
        {
            title: '',
            dataIndex: 'patientAppointmentID',
            // width: 100,
            className: "custom-grid-hide-col",
            // hidden: true
        },

        {
            title: 'Appt. Time',
            dataIndex: 'patientAppointmentDateTime',
            className: "width100",
            // width: 100
        },
        {
            title: "Provider",
            dataIndex: "providerName",
            className: "width180",
        },
        {
            title: 'Appointment Reason',
            dataIndex: 'reasonOfVisit',
            className: "width200",
            // width: 270
        },
        {
            title: 'Location',
            dataIndex: 'locationName',
            className: "width200",
            // width: 100
        },
        {
            title: 'Room',
            dataIndex: 'examRoom',
            className: "width150",
            // width: 100
        },
        {
            title: 'Status',
            dataIndex: 'statusCode',
            className: "width100",
            // width: 320
        },
        {
            title: 'Confirmation',
            dataIndex: 'confirmation',
            className: "width180",
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            fixed: "right",
            className: "width180",
            // width: 250
        },
    ],

};
