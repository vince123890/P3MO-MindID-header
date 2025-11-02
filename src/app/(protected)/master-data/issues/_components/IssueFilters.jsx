export const getIssueFilters = (filters) => [
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
    label: "Tipe Issue",
    name: "tipe_issue",
    type: "Select",
    placeholder: "Select Type",
    width: 180,
    defaultValue: filters.tipe_issue,
    options: [
      { label: "Technical Issue", value: "Technical Issue" },
      { label: "Budget Issue", value: "Budget Issue" },
      { label: "Schedule Issue", value: "Schedule Issue" },
      { label: "Resource Issue", value: "Resource Issue" },
      { label: "Quality Issue", value: "Quality Issue" },
      { label: "Scope Issue", value: "Scope Issue" },
      { label: "Communication Issue", value: "Communication Issue" },
      { label: "Stakeholder Issue", value: "Stakeholder Issue" },
      { label: "External Issue", value: "External Issue" },
      { label: "Compliance Issue", value: "Compliance Issue" },
    ],
  },
];
