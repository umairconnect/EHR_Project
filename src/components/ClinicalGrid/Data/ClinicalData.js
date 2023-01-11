export const data = {
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
            field: 'serviceDate',
            width: 270,
            sorter: (a, b) => {
                a = a.serviceDate != null ? a.serviceDate.toString() : "";
                b = b.serviceDate != null ? b.serviceDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Rendering Provider',
            field: 'refProviderName',
            width: 150,
            sorter: (a, b) => {
                a = a.refProviderName != null ? a.refProviderName.toString() : "";
                b = b.refProviderName != null ? b.refProviderName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            label: 'Locked (Rendering Signed)',
            field: 'strSignedBy',
            width: 270,
            sorter: (a, b) => {
                a = a.strSignedBy != null ? a.strSignedBy.toString() : "";
                b = b.strSignedBy != null ? b.strSignedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Supervising Signed Off',
            field: 'superviserSignedBy',
            width: 150,
            sorter: (a, b) => {
                a = a.superviserSignedBy != null ? a.superviserSignedBy.toString() : "";
                b = b.superviserSignedBy != null ? b.superviserSignedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            label: 'Action',
            field: 'action',
            width: 150
        },
    ],
    ClinicalNotes2: [
        {
            title: '',
            dataIndex: 'id',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
            className: "width150",
            sorter: (a, b) => {
                a = a.patientName != null ? a.patientName.toString() : "";
                b = b.patientName != null ? b.patientName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date of Service',
            dataIndex: 'serviceDate',
            className: "width270",
             sorter: (a, b) => {
                a = a.serviceDate != null ? a.serviceDate.toString() : "";
                b = b.serviceDate != null ? b.serviceDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Rendering Provider',
            dataIndex: 'refProviderName',
            className: "width150",
            sorter: (a, b) => {
                a = a.refProviderName != null ? a.refProviderName.toString() : "";
                b = b.refProviderName != null ? b.refProviderName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Locked (Rendering Signed)',
            dataIndex: 'strSignedBy',
            className: "width270",
            sorter: (a, b) => {
                a = a.strSignedBy != null ? a.strSignedBy.toString() : "";
                b = b.strSignedBy != null ? b.strSignedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Supervising Signed Off',
            dataIndex: 'superviserSignedBy',
            className: "width150",
            sorter: (a, b) => {
                a = a.superviserSignedBy != null ? a.superviserSignedBy.toString() : "";
                b = b.superviserSignedBy != null ? b.superviserSignedBy.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: ""
        },
    ]
};
