export const data = {
    // AllTasks: [
    //     {
    //         label: '',
    //         field: 'taskId',
    //         width: 270,
    //     },
    //     {
    //         label: 'Date',
    //         field: 'strDate',
    //         width: 150
    //     },
    //     {
    //         label: 'Tasks',
    //         field: 'task',
    //         sort: 'disabled',
    //         width: 150
    //     },
    //     {
    //         label: 'Patient',
    //         field: 'patientName',
    //         width: 270,
    //     },
    //     {
    //         label: 'Details',
    //         field: 'taskDetail',
    //         width: 150
    //     },
    //     {
    //         label: 'Action',
    //         field: 'action',
    //         sort: 'disabled',
    //         width: 270,
    //     },
    // ],
    AllTasks: [
        {
            title: '',
            dataIndex: 'taskId',
            className: 'display-none',

        },
        {
            title: 'Date',
            dataIndex: 'strDate',
            className: "width120",
            sorter: (a, b) => {
                a = a.strDate != null ? a.strDate.toString() : "";
                b = b.strDate != null ? b.strDate.toString() : "";
                return a.localeCompare(b);
            },
            

        },
        {
            title: 'Tasks',
            dataIndex: 'task',
              sorter: (a, b) => {
                a = a.task != null ? a.task.toString() : "";
                b = b.task != null ? b.task.toString() : "";
                return a.localeCompare(b);
            },

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
            title: 'Details',
            dataIndex: 'taskDetail',
            sorter: (a, b) => {
                a = a.taskDetail != null ? a.taskDetail.toString() : "";
                b = b.taskDetail != null ? b.taskDetail.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: 'action-th',

        },
    ],
    LabResult: [
        {
            title: '',
            dataIndex: 'taskId',
            className: 'display-none',

        },
        {
            title: 'Date',
            dataIndex: 'strDate',
            sorter: (a, b) => {
                a = a.strDate != null ? a.strDate.toString() : "";
                b = b.strDate != null ? b.strDate.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Tasks',
            dataIndex: 'task',
            sorter: (a, b) => {
                a = a.task != null ? a.task.toString() : "";
                b = b.task != null ? b.task.toString() : "";
                return a.localeCompare(b);
            },

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
            title: 'Details',
            dataIndex: 'taskDetail',
            sorter: (a, b) => {
                a = a.taskDetail != null ? a.taskDetail.toString() : "";
                b = b.taskDetail != null ? b.taskDetail.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: 'action-th',

        },
    ],
    RefillRequests: [
        {
            title: '',
            dataIndex: 'sendRxId',
            className: 'display-none',

        },
        {
            title: 'Date',
            dataIndex: 'strDate',
            sorter: (a, b) => {
                a = a.strDate != null ? a.strDate.toString() : "";
                b = b.strDate != null ? b.strDate.toString() : "";
                return a.localeCompare(b);
            },


        },
        {
            title: 'Request',
            dataIndex: 'task',
            sorter: (a, b) => {
                a = a.task != null ? a.task.toString() : "";
                b = b.task != null ? b.task.toString() : "";
                return a.localeCompare(b);
            },

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
            title: 'Details',
            dataIndex: 'taskDetail',
            sorter: (a, b) => {
                a = a.taskDetail != null ? a.taskDetail.toString() : "";
                b = b.taskDetail != null ? b.taskDetail.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: 'action-th',
        },
    ],

    //LabResult: [
    //    {
    //        label: '',
    //        field: 'taskId',
    //        width: 270,
    //    },
    //    {
    //        label: 'Date',
    //        field: 'strDate',
    //        width: 150
    //    },
    //    {
    //        label: 'Tasks',
    //        field: 'task',
    //        width: 150
    //    },
    //    {
    //        label: 'Patient',
    //        field: 'patientName',
    //        width: 270,
    //    },
    //    {
    //        label: 'Details',
    //        field: 'taskDetail',
    //        width: 150
    //    },
    //    {
    //        label: 'Action',
    //        field: 'action',
    //        width: 270,
    //    },
    //],
    //RefillRequests: [
    //    {
    //        label: '',
    //        field: 'sendRxId',
    //        width: 270,
    //    },
    //    {
    //        label: 'Date',
    //        field: 'strDate',
    //        width: 150
    //    },
    //    {
    //        label: 'Request',
    //        field: 'task',
    //        width: 150
    //    },
    //    {
    //        label: 'Patient',
    //        field: 'patientName',
    //        width: 270,
    //    },
    //    {
    //        label: 'Details',
    //        field: 'taskDetail',
    //        width: 150
    //    },
    //    {
    //        label: 'Action',
    //        field: 'action',
    //        width: 270,
    //    },
    //    //{
    //    //    label: '',
    //    //    field: 'id',
    //    //    width: 270,
    //    //},
    //    //{
    //    //    label: 'Date',
    //    //    field: 'date',
    //    //    width: 150
    //    //},
    //    //{
    //    //    label: 'Request',
    //    //    field: 'request',
    //    //    width: 270,
    //    //},
    //    //{
    //    //    label: 'Patient',
    //    //    field: 'patient',
    //    //    width: 270,
    //    //},
    //    //{
    //    //    label: 'Details',
    //    //    field: 'details',
    //    //    width: 150
    //    //},

    //    //{
    //    //    label: 'Action',
    //    //    field: 'action',
    //    //    width: 270,
    //    //},
    //]
};
