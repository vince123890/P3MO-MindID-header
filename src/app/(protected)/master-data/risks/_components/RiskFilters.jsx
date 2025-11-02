export const getRiskFilters = (filters) => [
  {
    label: "Status",
    name: "status",
    type: "Select",
    placeholder: "Select Status",
    width: 140,
    defaultValue: filters.status,
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    label: "Tipe",
    name: "tipe_issue_risk",
    type: "Select",
    placeholder: "Select Type",
    width: 180,
    defaultValue: filters.tipe_issue_risk,
    options: [
      { label: "Technical Risk", value: "Technical Risk" },
      { label: "Budget Risk", value: "Budget Risk" },
      { label: "Schedule Risk", value: "Schedule Risk" },
      { label: "Resource Risk", value: "Resource Risk" },
      { label: "Quality Risk", value: "Quality Risk" },
      { label: "Scope Risk", value: "Scope Risk" },
      { label: "Communication Risk", value: "Communication Risk" },
      { label: "Stakeholder Risk", value: "Stakeholder Risk" },
      { label: "External Risk", value: "External Risk" },
      { label: "Compliance Risk", value: "Compliance Risk" },
    ],
  },
];
