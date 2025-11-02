const listUsers = {
  status_code: 200,
  data: {
    items: [
      {
        id: 1,
        nip: "19850101201001001",
        nama_user: "Ahmad Wijaya",
        username: "ahmad.wijaya",
        role: "Administrator",
        email: "ahmad.wijaya@antam.com",
        perusahaan: "PT Aneka Tambang Tbk",
        jabatan: "Kepala Divisi IT",
        fungsi: "Information Technology",
        no_hp: "081234567890",
        status: "Active",
        created_at: "15/01/2023",
        updated_at: "20/06/2023"
      },
      {
        id: 2,
        nip: "19870523201002002",
        nama_user: "Siti Rahayu",
        username: "siti.rahayu",
        role: "PMO Admin",
        email: "siti.rahayu@bukitasam.co.id",
        perusahaan: "PT Bukit Asam Tbk",
        jabatan: "Manager PMO",
        fungsi: "Project Management",
        no_hp: "081234567891",
        status: "Active",
        created_at: "10/02/2023",
        updated_at: "15/06/2023"
      },
      {
        id: 3,
        nip: "19820715201003003",
        nama_user: "Budi Santoso",
        username: "budi.santoso",
        role: "Direktur MIND ID",
        email: "budi.santoso@freeport.com",
        perusahaan: "PT Freeport Indonesia",
        jabatan: "Direktur Utama",
        fungsi: "Executive Management",
        no_hp: "081234567892",
        status: "Inactive",
        created_at: "05/03/2023",
        updated_at: "10/07/2023"
      },
      {
        id: 4,
        nip: "19900328201004004",
        nama_user: "Diana Kusuma",
        username: "diana.kusuma",
        role: "PMO MIND ID",
        email: "diana.kusuma@inalum.id",
        perusahaan: "PT Indonesia Asahan Aluminium",
        jabatan: "PMO Specialist",
        fungsi: "Project Management",
        no_hp: "081234567893",
        status: "Active",
        created_at: "12/04/2023",
        updated_at: "22/07/2023"
      },
      {
        id: 5,
        nip: "19881104201005005",
        nama_user: "Eko Prasetyo",
        username: "eko.prasetyo",
        role: "Tim Proyek",
        email: "eko.prasetyo@timah.com",
        perusahaan: "PT Timah Tbk",
        jabatan: "Project Coordinator",
        fungsi: "Project Execution",
        no_hp: "081234567894",
        status: "Active",
        created_at: "20/05/2023", 
        updated_at: "25/07/2023"
      },
      {
        id: 6,
        nip: "19920515202006006",
        nama_user: "Rina Susanti",
        username: "rina.susanti",
        role: "PMO MIND ID",
        email: "rina.susanti@mindid.co.id",
        perusahaan: "PT MIND ID",
        jabatan: "Senior PMO",
        fungsi: "Project Management",
        no_hp: "081234567895",
        status: "-",
        created_at: "01/08/2023", 
        updated_at: "01/08/2023"
      },
      {
        id: 7,
        nip: "19900820202007007",
        nama_user: "Andi Wijaya",
        username: "andi.wijaya",
        role: "Tim Proyek",
        email: "andi.wijaya@ptba.co.id",
        perusahaan: "PT Bukit Asam Tbk",
        jabatan: "Project Member",
        fungsi: "Project Execution",
        no_hp: "081234567896",
        status: "-",
        created_at: "15/08/2023", 
        updated_at: "15/08/2023"
      },
      {
        id: 8,
        nip: "19910612201008008",
        nama_user: "Fitri Handayani",
        username: "fitri.handayani",
        role: "PMO Admin",
        email: "fitri.handayani@antam.com",
        perusahaan: "PT Aneka Tambang Tbk",
        jabatan: "PMO Officer",
        fungsi: "Project Management",
        no_hp: "081234567897",
        status: "Active",
        created_at: "22/08/2023",
        updated_at: "05/09/2023"
      },
      {
        id: 9,
        nip: "19840925201009009",
        nama_user: "Hendra Gunawan",
        username: "hendra.gunawan",
        role: "Tim Proyek",
        email: "hendra.gunawan@freeport.com",
        perusahaan: "PT Freeport Indonesia",
        jabatan: "Technical Lead",
        fungsi: "Project Execution",
        no_hp: "081234567898",
        status: "Active",
        created_at: "10/09/2023",
        updated_at: "18/09/2023"
      },
      {
        id: 10,
        nip: "19930417201010010",
        nama_user: "Indah Permata",
        username: "indah.permata",
        role: "PMO MIND ID",
        email: "indah.permata@mindid.co.id",
        perusahaan: "PT MIND ID",
        jabatan: "PMO Analyst",
        fungsi: "Project Management",
        no_hp: "081234567899",
        status: "Active",
        created_at: "25/09/2023",
        updated_at: "03/10/2023"
      },
      {
        id: 11,
        nip: "19860308201011011",
        nama_user: "Joko Susilo",
        username: "joko.susilo",
        role: "Tim Proyek",
        email: "joko.susilo@inalum.id",
        perusahaan: "PT Indonesia Asahan Aluminium",
        jabatan: "Project Engineer",
        fungsi: "Project Execution",
        no_hp: "081234567900",
        status: "Active",
        created_at: "12/10/2023",
        updated_at: "20/10/2023"
      },
      {
        id: 12,
        nip: "19940710201012012",
        nama_user: "Kartika Sari",
        username: "kartika.sari",
        role: "Administrator",
        email: "kartika.sari@bukitasam.co.id",
        perusahaan: "PT Bukit Asam Tbk",
        jabatan: "System Administrator",
        fungsi: "Information Technology",
        no_hp: "081234567901",
        status: "Active",
        created_at: "28/10/2023",
        updated_at: "05/11/2023"
      },
      {
        id: 13,
        nip: "19880522201013013",
        nama_user: "Lukman Hakim",
        username: "lukman.hakim",
        role: "Direktur MIND ID",
        email: "lukman.hakim@mindid.co.id",
        perusahaan: "PT MIND ID",
        jabatan: "Direktur Operasional",
        fungsi: "Executive Management",
        no_hp: "081234567902",
        status: "Active",
        created_at: "15/11/2023",
        updated_at: "22/11/2023"
      },
      {
        id: 14,
        nip: "19920915201014014",
        nama_user: "Maya Anggraini",
        username: "maya.anggraini",
        role: "PMO Admin",
        email: "maya.anggraini@timah.com",
        perusahaan: "PT Timah Tbk",
        jabatan: "Senior PMO",
        fungsi: "Project Management",
        no_hp: "081234567903",
        status: "Active",
        created_at: "01/12/2023",
        updated_at: "10/12/2023"
      },
      {
        id: 15,
        nip: "19850203201015015",
        nama_user: "Nugroho Wibowo",
        username: "nugroho.wibowo",
        role: "Tim Proyek",
        email: "nugroho.wibowo@antam.com",
        perusahaan: "PT Aneka Tambang Tbk",
        jabatan: "Project Analyst",
        fungsi: "Project Execution",
        no_hp: "081234567904",
        status: "Active",
        created_at: "18/12/2023",
        updated_at: "27/12/2023"
      },
      {
        id: 16,
        nip: "19910428201016016",
        nama_user: "Olivia Putri",
        username: "olivia.putri",
        role: "PMO MIND ID",
        email: "olivia.putri@freeport.com",
        perusahaan: "PT Freeport Indonesia",
        jabatan: "PMO Coordinator",
        fungsi: "Project Management",
        no_hp: "081234567905",
        status: "-",
        created_at: "05/01/2024",
        updated_at: "15/01/2024"
      },
      {
        id: 17,
        nip: "19870816201017017",
        nama_user: "Prasetyo Adi",
        username: "prasetyo.adi",
        role: "Tim Proyek",
        email: "prasetyo.adi@bukitasam.co.id",
        perusahaan: "PT Bukit Asam Tbk",
        jabatan: "Project Supervisor",
        fungsi: "Project Execution",
        no_hp: "081234567906",
        status: "Inactive",
        created_at: "22/01/2024",
        updated_at: "30/01/2024"
      },
      {
        id: 18,
        nip: "19931107201018018",
        nama_user: "Qori Amalia",
        username: "qori.amalia",
        role: "PMO Admin",
        email: "qori.amalia@inalum.id",
        perusahaan: "PT Indonesia Asahan Aluminium",
        jabatan: "PMO Assistant",
        fungsi: "Project Management",
        no_hp: "081234567907",
        status: "-",
        created_at: "08/02/2024",
        updated_at: "18/02/2024"
      },
      {
        id: 19,
        nip: "19890320201019019",
        nama_user: "Rudi Hermawan",
        username: "rudi.hermawan",
        role: "Administrator",
        email: "rudi.hermawan@mindid.co.id",
        perusahaan: "PT MIND ID",
        jabatan: "IT Manager",
        fungsi: "Information Technology",
        no_hp: "081234567908",
        status: "Active",
        created_at: "25/02/2024",
        updated_at: "05/03/2024"
      },
      {
        id: 20,
        nip: "19950612201020020",
        nama_user: "Sinta Dewi",
        username: "sinta.dewi",
        role: "Tim Proyek",
        email: "sinta.dewi@timah.com",
        perusahaan: "PT Timah Tbk",
        jabatan: "Junior Project Officer",
        fungsi: "Project Execution",
        no_hp: "081234567909",
        status: "-",
        created_at: "12/03/2024",
        updated_at: "20/03/2024"
      }
    ],
    meta: {
      total_page: 1,
      total: 20,
      page: 1,
      per_page: 20,
    },
    version: "1.0.0",
  },
};

const detailUser = (id) => {
  const user = listUsers.data.items.find((item) => item.id === Number(id));
  
  if (user) {
    return {
      status_code: 200,
      data: user,
      version: "1.0.0",
    };
  }

  return {
    status_code: 404,
    message: "User not found",
    version: "1.0.0",
  };
};

const listRoles = {
  status_code: 200,
  data: {
    items: [
      {
        id: 1,
        nama_role: "Administrator",
        status: "Active",
        created_at: "15/01/2023",
        updated_at: "20/06/2023",
        permissions: {
          dashboard: { create: true, list: true, detail: true, edit: true, delete: true },
          "user-management": { create: true, list: true, detail: true, edit: true, delete: true },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: true },
          projects: { create: true, list: true, detail: true, edit: true, delete: true },
          messaging: { create: true, list: true, detail: true, edit: true, delete: true },
          laporan: { create: true, list: true, detail: true, edit: true, delete: true }
        }
      },
      {
        id: 2,
        nama_role: "PMO Admin",
        status: "Active",
        created_at: "10/02/2023",
        updated_at: "15/06/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: true, list: true, detail: true, edit: true, delete: false },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: true },
          projects: { create: true, list: true, detail: true, edit: true, delete: true },
          messaging: { create: true, list: true, detail: true, edit: true, delete: true },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 3,
        nama_role: "PMO Mind ID",
        status: "Active",
        created_at: "05/03/2023",
        updated_at: "10/07/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: true, detail: true, edit: false, delete: false },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: false },
          projects: { create: true, list: true, detail: true, edit: true, delete: true },
          messaging: { create: true, list: true, detail: true, edit: true, delete: true },
          laporan: { create: true, list: true, detail: true, edit: true, delete: false }
        }
      },
      {
        id: 4,
        nama_role: "Direktur Mind ID",
        status: "Inactive",
        created_at: "12/04/2023",
        updated_at: "22/07/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: true, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: false, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: false, edit: false, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 5,
        nama_role: "Tim Proyek",
        status: "Active",
        created_at: "20/05/2023",
        updated_at: "25/07/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: true, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: false, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 6,
        nama_role: "Viewer",
        status: "Active",
        created_at: "01/08/2023",
        updated_at: "01/08/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: false, edit: false, delete: false },
          laporan: { create: false, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 7,
        nama_role: "Project Manager",
        status: "Active",
        created_at: "15/08/2023",
        updated_at: "20/08/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: true, detail: true, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: true, list: true, detail: true, edit: true, delete: true },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 8,
        nama_role: "Finance Admin",
        status: "Active",
        created_at: "22/08/2023",
        updated_at: "05/09/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: true, edit: false, delete: false },
          laporan: { create: true, list: true, detail: true, edit: true, delete: false }
        }
      },
      {
        id: 9,
        nama_role: "Technical Lead",
        status: "Active",
        created_at: "10/09/2023",
        updated_at: "18/09/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: true, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: false, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 10,
        nama_role: "Data Analyst",
        status: "Active",
        created_at: "25/09/2023",
        updated_at: "03/10/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: false, edit: false, delete: false },
          laporan: { create: true, list: true, detail: true, edit: true, delete: false }
        }
      },
      {
        id: 11,
        nama_role: "Quality Assurance",
        status: "Active",
        created_at: "12/10/2023",
        updated_at: "20/10/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 12,
        nama_role: "Business Analyst",
        status: "Active",
        created_at: "28/10/2023",
        updated_at: "05/11/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: true, delete: false }
        }
      },
      {
        id: 13,
        nama_role: "HR Manager",
        status: "Active",
        created_at: "15/11/2023",
        updated_at: "22/11/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: true, list: true, detail: true, edit: true, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 14,
        nama_role: "Risk Manager",
        status: "Active",
        created_at: "01/12/2023",
        updated_at: "10/12/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: false },
          projects: { create: false, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: true, delete: false }
        }
      },
      {
        id: 15,
        nama_role: "Procurement Officer",
        status: "Active",
        created_at: "18/12/2023",
        updated_at: "27/12/2023",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: true, list: true, detail: true, edit: true, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 16,
        nama_role: "Legal Officer",
        status: "Active",
        created_at: "05/01/2024",
        updated_at: "15/01/2024",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 17,
        nama_role: "IT Support",
        status: "Active",
        created_at: "22/01/2024",
        updated_at: "30/01/2024",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: true, detail: true, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: false, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 18,
        nama_role: "Auditor",
        status: "Active",
        created_at: "08/02/2024",
        updated_at: "18/02/2024",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: true, detail: true, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: true, edit: false, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 19,
        nama_role: "Stakeholder",
        status: "Inactive",
        created_at: "25/02/2024",
        updated_at: "05/03/2024",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: false, delete: false },
          messaging: { create: false, list: true, detail: false, edit: false, delete: false },
          laporan: { create: false, list: true, detail: true, edit: false, delete: false }
        }
      },
      {
        id: 20,
        nama_role: "Consultant",
        status: "Active",
        created_at: "12/03/2024",
        updated_at: "20/03/2024",
        permissions: {
          dashboard: { create: false, list: true, detail: true, edit: false, delete: false },
          "user-management": { create: false, list: false, detail: false, edit: false, delete: false },
          "master-data": { create: false, list: true, detail: true, edit: false, delete: false },
          projects: { create: false, list: true, detail: true, edit: true, delete: false },
          messaging: { create: true, list: true, detail: true, edit: true, delete: false },
          laporan: { create: true, list: true, detail: true, edit: false, delete: false }
        }
      }
    ],
    meta: {
      total_page: 1,
      total: 20,
      page: 1,
      per_page: 20,
    },
    version: "1.0.0",
  },
};

const detailRole = (id) => {
  const role = listRoles.data.items.find((item) => item.id === Number(id));
  
  if (role) {
    return {
      status_code: 200,
      data: role,
      version: "1.0.0",
    };
  }

  return {
    status_code: 404,
    message: "Role not found",
    version: "1.0.0",
  };
};

const userLoginHistory = (userId) => {
  const loginHistories = {
    1: [
      { id: 1, updated_date: "27/10/2025 08:30:15", activity: "Login" },
      { id: 2, updated_date: "27/10/2025 17:45:22", activity: "Logout" },
      { id: 3, updated_date: "26/10/2025 09:15:30", activity: "Login" },
      { id: 4, updated_date: "26/10/2025 18:20:45", activity: "Logout" },
      { id: 5, updated_date: "25/10/2025 08:00:10", activity: "Login" },
      { id: 6, updated_date: "25/10/2025 17:30:55", activity: "Logout" },
    ],
    2: [
      { id: 1, updated_date: "27/10/2025 07:45:20", activity: "Login" },
      { id: 2, updated_date: "27/10/2025 16:30:40", activity: "Logout" },
      { id: 3, updated_date: "26/10/2025 08:20:15", activity: "Login" },
      { id: 4, updated_date: "26/10/2025 17:15:30", activity: "Logout" },
    ],
    3: [
      { id: 1, updated_date: "20/10/2025 10:00:00", activity: "Login" },
      { id: 2, updated_date: "20/10/2025 15:30:00", activity: "Logout" },
    ],
    4: [
      { id: 1, updated_date: "27/10/2025 09:00:00", activity: "Login" },
      { id: 2, updated_date: "27/10/2025 18:00:00", activity: "Logout" },
      { id: 3, updated_date: "26/10/2025 09:30:00", activity: "Login" },
      { id: 4, updated_date: "26/10/2025 17:45:00", activity: "Logout" },
    ],
    5: [
      { id: 1, updated_date: "27/10/2025 08:15:00", activity: "Login" },
      { id: 2, updated_date: "27/10/2025 17:00:00", activity: "Logout" },
    ],
    6: [],
    7: [],
  };

  const history = loginHistories[Number(userId)] || [];

  return {
    status_code: 200,
    data: {
      items: history,
      meta: {
        total_page: 1,
        total: history.length,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export { listUsers, detailUser, listRoles, detailRole, userLoginHistory };
