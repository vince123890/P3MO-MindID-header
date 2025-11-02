export const projectIssues = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        project_id: "1",
        wbs_task_id: "1.1.1",
        aktivitas_master_schedule: "Site Preparation and Ground Clearing",
        kategori_issue: "Technical",
        tipe_issue: "Design Conflict",
        deskripsi_issue: "Conflict between structural design and existing site conditions identified during soil testing",
        pic: "John Doe",
        nomor_issue: "ISS-001",
        tanggal_issue: "2025-01-10T00:00:00.000Z",
        status_issue: "Open",
        created_at: "2025-01-10T00:00:00.000Z",
        updated_at: "2025-01-19T00:00:00.000Z",
        // Resolution & Update Summary entries
        resolution_entries: [
          {
            id: 1,
            dampak_issue: "Potential 2-week delay in project timeline if not resolved",
            pic: "John Doe",
            prioritas_issue: "High",
            resolution: "Pending engineering review",
            deadline_resolution: "2025-01-25T00:00:00.000Z",
            deadline: "2025-02-15T00:00:00.000Z",
            issue_update: "Weekly coordination meeting scheduled with structural engineer",
            tanggal_update_terkini: "2025-01-19T00:00:00.000Z",
            progress_update: "Engineering team reviewing alternative design solutions",
            keterangan: "Requires immediate attention to avoid cascading delays",
          },
          {
            id: 2,
            dampak_issue: "Additional soil testing required to confirm foundation requirements",
            pic: "Jane Smith",
            prioritas_issue: "Medium",
            resolution: "Soil testing team scheduled for next week",
            deadline_resolution: "2025-01-30T00:00:00.000Z",
            deadline: "2025-02-20T00:00:00.000Z",
            issue_update: "Testing equipment procurement in progress",
            tanggal_update_terkini: "2025-01-18T00:00:00.000Z",
            progress_update: "50% complete",
            keterangan: "Waiting for testing results before proceeding",
          }
        ],
      },
      {
        id: "2",
        project_id: "1",
        wbs_task_id: "1.2.3",
        aktivitas_master_schedule: "Equipment Procurement and Delivery",
        kategori_issue: "Logistical",
        tipe_issue: "Supplier Delay",
        deskripsi_issue: "Main equipment supplier informed of 3-week delay in delivery schedule",
        pic: "Jane Smith",
        nomor_issue: "ISS-002",
        tanggal_issue: "2025-01-12T00:00:00.000Z",
        status_issue: "In Progress",
        created_at: "2025-01-12T00:00:00.000Z",
        updated_at: "2025-01-18T00:00:00.000Z",
        // Resolution & Update Summary entries
        resolution_entries: [
          {
            id: 1,
            dampak_issue: "May affect installation schedule and project completion date",
            pic: "Jane Smith",
            prioritas_issue: "Medium",
            resolution: "Negotiating with alternative suppliers for faster delivery",
            deadline_resolution: "2025-01-30T00:00:00.000Z",
            deadline: "2025-03-01T00:00:00.000Z",
            issue_update: "Two potential suppliers identified, quotes being evaluated",
            tanggal_update_terkini: "2025-01-18T00:00:00.000Z",
            progress_update: "Procurement team exploring alternative suppliers",
            keterangan: "Critical path item requiring close monitoring",
          }
        ],
      },
      {
        id: "3",
        project_id: "1",
        wbs_task_id: "2.1.2",
        aktivitas_master_schedule: "Foundation Work",
        kategori_issue: "Environmental",
        tipe_issue: "Regulatory Compliance",
        deskripsi_issue: "Environmental agency requires additional documentation for foundation work permit",
        pic: "Mike Johnson",
        nomor_issue: "ISS-003",
        tanggal_issue: "2025-01-15T00:00:00.000Z",
        status_issue: "Open",
        created_at: "2025-01-15T00:00:00.000Z",
        updated_at: "2025-01-17T00:00:00.000Z",
        // Resolution & Update Summary entries
        resolution_entries: [
          {
            id: 1,
            dampak_issue: "Work cannot proceed until permit is obtained",
            pic: "Mike Johnson",
            prioritas_issue: "High",
            resolution: "Preparing comprehensive environmental impact report",
            deadline_resolution: "2025-02-01T00:00:00.000Z",
            deadline: "2025-02-28T00:00:00.000Z",
            issue_update: "Initial draft completed, undergoing internal review",
            tanggal_update_terkini: "2025-01-17T00:00:00.000Z",
            progress_update: "Documentation team preparing required environmental impact assessment",
            keterangan: "Permit application on hold pending documentation",
          }
        ],
      },
      {
        id: "4",
        project_id: "1",
        wbs_task_id: "3.2.1",
        aktivitas_master_schedule: "Electrical Installation",
        kategori_issue: "Resource",
        tipe_issue: "Manpower Shortage",
        deskripsi_issue: "Shortage of qualified electricians available for installation phase",
        pic: "Alice Brown",
        nomor_issue: "ISS-004",
        tanggal_issue: "2025-01-18T00:00:00.000Z",
        status_issue: "In Progress",
        created_at: "2025-01-18T00:00:00.000Z",
        updated_at: "2025-01-19T00:00:00.000Z",
        // Resolution & Update Summary entries
        resolution_entries: [
          {
            id: 1,
            dampak_issue: "Potential delay in electrical installation and subsequent testing phases",
            pic: "Alice Brown",
            prioritas_issue: "Medium",
            resolution: "Engaging with local electrical contractors for additional manpower",
            deadline_resolution: "2025-02-10T00:00:00.000Z",
            deadline: "2025-04-15T00:00:00.000Z",
            issue_update: "Three contractors contacted, proposals expected next week",
            tanggal_update_terkini: "2025-01-19T00:00:00.000Z",
            progress_update: "HR team recruiting additional electricians, considering subcontracting",
            keterangan: "Critical skill shortage requiring immediate action",
          }
        ],
      },
      {
        id: "5",
        project_id: "1",
        wbs_task_id: "1.3.5",
        aktivitas_master_schedule: "Safety Training and Certification",
        kategori_issue: "Safety",
        tipe_issue: "Training Delay",
        deskripsi_issue: "Scheduled safety training program delayed due to trainer availability",
        pic: "Bob Wilson",
        nomor_issue: "ISS-005",
        tanggal_issue: "2025-01-16T00:00:00.000Z",
        status_issue: "Resolved",
        created_at: "2025-01-16T00:00:00.000Z",
        updated_at: "2025-01-20T00:00:00.000Z",
        // Resolution & Update Summary entries
        resolution_entries: [
          {
            id: 1,
            dampak_issue: "Workforce cannot begin on-site activities without certification",
            pic: "Bob Wilson",
            prioritas_issue: "High",
            resolution: "Alternative training provider secured, training rescheduled for next week",
            deadline_resolution: "2025-01-25T00:00:00.000Z",
            deadline: "2025-02-10T00:00:00.000Z",
            issue_update: "Training completed successfully, all personnel certified",
            tanggal_update_terkini: "2025-01-20T00:00:00.000Z",
            progress_update: "Alternative training provider being sourced",
            keterangan: "All safety requirements now met, work can proceed",
          }
        ],
      },
    ],
    meta: {
      total_page: 1,
      total: 5,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const getProjectIssues = (projectId) => {
  console.log("Getting issues for project ID:", projectId);
  
  // For demo purposes, return issues regardless of project_id to ensure data is always shown
  // In a real application, this would filter by the actual project_id
  const issues = projectIssues.data.items;
  
  // Show all issues to display complete project issues list
  const allIssues = issues;
  
  // Always return proper structure to prevent undefined errors
  return {
    status_code: 200,
    data: {
      items: allIssues || [],
      meta: {
        total_page: 1,
        total: allIssues?.length || 0,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export const getIssueById = (issueId) => {
  console.log("Getting issue by ID:", issueId);
  
  const issue = projectIssues.data.items.find((item) => item.id === issueId);
  
  return {
    status_code: 200,
    data: issue || null,
    version: "1.0.0",
  };
};
