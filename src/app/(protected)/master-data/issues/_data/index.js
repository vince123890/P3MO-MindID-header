export const allIssues = {
  status_code: 200,
  data: {
    items: [
      {
        id: "10",
        kode_issue: "IS010",
        tipe_issue: "Compliance Issue",
        status: "Active",
        created_at: "2025-01-06T00:00:00.000Z",
        updated_at: "2025-01-06T00:00:00.000Z",
      },
      {
        id: "9",
        kode_issue: "IS009",
        tipe_issue: "External Issue",
        status: "Inactive",
        created_at: "2025-01-07T00:00:00.000Z",
        updated_at: "2025-01-07T00:00:00.000Z",
      },
      {
        id: "8",
        kode_issue: "IS008",
        tipe_issue: "Stakeholder Issue",
        status: "Active",
        created_at: "2025-01-08T00:00:00.000Z",
        updated_at: "2025-01-08T00:00:00.000Z",
      },
      {
        id: "7",
        kode_issue: "IS007",
        tipe_issue: "Communication Issue",
        status: "Active",
        created_at: "2025-01-09T00:00:00.000Z",
        updated_at: "2025-01-09T00:00:00.000Z",
      },
      {
        id: "6",
        kode_issue: "IS006",
        tipe_issue: "Scope Issue",
        status: "Inactive",
        created_at: "2025-01-10T00:00:00.000Z",
        updated_at: "2025-01-10T00:00:00.000Z",
      },
      {
        id: "5",
        kode_issue: "IS005",
        tipe_issue: "Quality Issue",
        status: "Active",
        created_at: "2025-01-11T00:00:00.000Z",
        updated_at: "2025-01-11T00:00:00.000Z",
      },
      {
        id: "4",
        kode_issue: "IS004",
        tipe_issue: "Resource Issue",
        status: "Active",
        created_at: "2025-01-12T00:00:00.000Z",
        updated_at: "2025-01-12T00:00:00.000Z",
      },
      {
        id: "3",
        kode_issue: "IS003",
        tipe_issue: "Schedule Issue",
        status: "Inactive",
        created_at: "2025-01-13T00:00:00.000Z",
        updated_at: "2025-01-13T00:00:00.000Z",
      },
      {
        id: "2",
        kode_issue: "IS002",
        tipe_issue: "Budget Issue",
        status: "Active",
        created_at: "2025-01-14T00:00:00.000Z",
        updated_at: "2025-01-14T00:00:00.000Z",
      },
      {
        id: "1",
        kode_issue: "IS001",
        tipe_issue: "Technical Issue",
        status: "Active",
        created_at: "2025-01-15T00:00:00.000Z",
        updated_at: "2025-01-15T00:00:00.000Z",
      },
    ],
    meta: {
      total_page: 1,
      total: 10,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const issueDetail = (id) => {
  const issue = allIssues.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: issue || null,
    version: "1.0.0",
  };
};
