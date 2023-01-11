export const SearchPanelSetupData = {
	Patient: [

		{
			label: "Chart ID",
			id: "sf_field_2",
			name: "chartid",
			type: "text",
			limit: 128
		},
		{
			label: "First Name",
			id: "sf_field_1",
			name: "firstName",
			type: "text",
			limit: 128
		},
		{
			label: "Last Name",
			id: "sf_field_2",
			name: "lastName",
			type: "text",
			limit: 128
		},
		{
			label: "Email",
			id: "sf_field_3",
			name: "email",
			type: "text",
			limit: 128
		},

		{
			label: "Cell #",
			id: "sf_field_4",
			name: "cellnumber",
			type: "number",
			limit: 128
		},
		{
			label: "Status",
			id: "patient_type",
			name: "status",
			type: "select",
			selectoptions: [
				{ value: "Active", label: 'Active' },
				{ value: "In-Active", label: 'In-Active' },
				{ value: "Deceased", label: 'In-Active - Deceased' }
			]
		},

	],
	Provider: [
		{
			label: "First Name",
			id: "sf_field_1",
			name: "firstname",
			type: "text",
			limit: 128
		},
		{
			label: "Last Name",
			id: "sf_field_1",
			name: "lastname",
			type: "text",
			limit: 128
		},
		{
			label: "Email",
			name: "email",
			type: "text",
			limit: 128
		},
		{
			label: "Cell #",
			name: "cellnumber",
			type: "number",
			limit: 128
		},
		{
			label: "Location",
			name: "location",
			type: "text",
			limit: 128
		},
		{
			label: "Speciallity",
			id: "sf_field_3",
			name: "speciallity",
			type: "text",
			limit: 128
		},
		{
			label: "NPI #",
			name: "npi",
			type: "text",
			limit: 128
		}

	],
	Staff: [
		{
			label: "First Name",
			id: "sf_field_1",
			name: "firstname",
			type: "text",
			limit: 128
		},
		{
			label: "Last Name",
			id: "sf_field_1",
			name: "lastname",
			type: "text",
			limit: 128
		},
		{
			label: "Cell #",
			id: "cell_number",
			name: "cellnumber",
			type: "number",
			limit: 128
		},
		{
			label: "Email",
			id: "sf_field_2",
			name: "email",
			type: "text",
			limit: 128
		},
		{
			label: "Location",
			name: "location",
			type: "text",
			limit: 128
		},
		{
			label: "Primary Provider",
			name: "primaryprovider",
			type: "text",
			limit: 128
		}

	],
	Appointment: [
		{
			label: "From",
			id: "from_date",
			name: "from_date",
			defaultValue: "",
			title: "Day",
			column: 2,
			type: "date",
		},
		{
			label: "To",
			id: "to_date",
			defaultValue: "",
			name: "to_date",
			// title:"Appointment To",
			column: 2,
			type: "date",
		},
		{
			label: "From",
			id: "from_time",
			name: "from_time",
			title: "Time",
			defaultValue: "08:00",
			column: 2,
			type: "time",
		},

		{
			label: "To",
			id: "to_time",
			name: "to_time",
			defaultValue: "18:00",
			column: 2,
			type: "time",
		},
		{
			label: "Patient Name",
			id: "patient_name",
			name: "patientName",
			type: "text",
			limit: 128
		},
		{
			label: "Cell #",
			id: "cell",
			name: "cellnumber",
			type: "number",
			limit: 128
		},
		{
			label: "Status",
			id: "status",
			name: "status",
			type: "select",
			selectoptions: [
				{ value: 'Arrived', label: 'Arrived' },
				{ value: 'Cancelled', label: 'Cancelled' },
				{ value: 'Checked-in', label: 'Checked-in' },
				{ value: 'Checked-in Online', label: 'Checked-in Online' },
				{ value: 'Completed', label: 'Completed' },
				{ value: 'Confirmed', label: 'Confimed' },
				{ value: 'In-Room', label: 'In Room' },
				{ value: 'In-Session', label: 'In Session' },
				{ value: 'Not-Confirmed', label: 'Not Confirmed' },
				{ value: 'No-Show', label: 'No Show' },
				{ value: 'Orphan', label: 'Orphan' },
				{ value: 'Re-Scheduled', label: 'Rescheduled' }
			]
		},
	],

	ScheduleSlot: [
		{
			label: "From",
			id: "from_date",
			name: "from_date",
			defaultValue: "",
			title: "Day",
			column: 2,
			type: "date",
		},
		{
			label: "To",
			id: "to_date",
			defaultValue: "",
			name: "to_date",
			// title:"Appointment To",
			column: 2,
			type: "date",
		},
		{
			label: "From",
			id: "from_time",
			name: "from_time",
			title: "Time",
			defaultValue: "08:00",
			column: 2,
			type: "time",
		},

		{
			label: "To",
			id: "to_time",
			name: "to_time",
			defaultValue: "18:00",
			column: 2,
			type: "time",
		},
		{
			label: "Location Name",
			id: "location",
			name: "location",
			type: "text",
			limit: 128
		},
		{
			label: "Provider Name",
			id: "provider_name",
			name: "provider_name",
			type: "text",
			limit: 128
		},
		// {
		// 	label: "Provider Cell #",
		// 	id: "cell",
		// 	name: "cellnumber",
		// 	type: "number",
		// 	limit: 128
		// },
		{
			label: "Slot Status",
			id: "status",
			name: "status",
			type: "select",
			selectoptions: [
				{ value: 'open', label: 'Open' },
				{ value: 'booked', label: 'Booked' },
				{ value: 'blocked', label: 'Blocked' },
				{ value: 'break', label: 'Break' },
			]
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
	]
}