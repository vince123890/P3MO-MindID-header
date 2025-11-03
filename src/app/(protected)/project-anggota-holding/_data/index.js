// Consistent company color mapping
export const COMPANY_COLORS = {
  "1": "#E53E3E", // PT Aneka Tambang Tbk - Red
  "2": "#3182CE", // PT Bukit Asam Tbk - Blue  
  "3": "#D69E2E", // PT Freeport Indonesia - Gold/Yellow
  "4": "#38A169", // PT Indonesia Asahan Aluminium (Inalum) - Green
  "5": "#805AD5", // PT Timah Tbk - Purple
  "6": "#DD6B20", // PT Vale Indonesia - Orange
};

// Data dummy untuk Project Anggota Holding dengan koordinat Indonesia
export const projectsData = {
  status_code: 200,
  data: {
    items: [
      {
        id: 1,
        name: "Proyek Pembangunan Infrastruktur Jakarta",
        location: "Jakarta",
        coordinates: [-6.2088, 106.8456], // Jakarta
        budget: 150000000000, // 150 Miliar
        pic: "Ahmad Setiawan",
        status: "In Progress",
        progress: 65,
        target: "Q4 2024",
        company_id: "1", // PT Aneka Tambang Tbk
        company_name: "PT Aneka Tambang Tbk",
      },
      {
        id: 2,
        name: "Proyek Smart City Jakarta",
        location: "Jakarta",
        coordinates: [-6.1944, 106.8229], // Jakarta Selatan
        budget: 120000000000, // 120 Miliar
        pic: "Dewi Kartika",
        status: "In Progress",
        progress: 80,
        target: "Q1 2025",
        company_id: "1", // PT Aneka Tambang Tbk
        company_name: "PT Aneka Tambang Tbk",
      },
      {
        id: 3,
        name: "Proyek Modernisasi Pelabuhan Surabaya",
        location: "Surabaya",
        coordinates: [-7.2575, 112.7521], // Surabaya
        budget: 85000000000, // 85 Miliar
        pic: "Siti Nurhaliza",
        status: "In Progress",
        progress: 45,
        target: "Q3 2024",
        company_id: "2", // PT Bukit Asam Tbk
        company_name: "PT Bukit Asam Tbk",
      },
      {
        id: 4,
        name: "Proyek Kawasan Ekonomi Khusus Surabaya",
        location: "Surabaya",
        coordinates: [-7.3064, 112.7378], // Surabaya Barat
        budget: 95000000000, // 95 Miliar
        pic: "Eko Prasetyo",
        status: "Planning",
        progress: 30,
        target: "Q2 2025",
        company_id: "3", // PT Freeport Indonesia
        company_name: "PT Freeport Indonesia",
      },
      {
        id: 5,
        name: "Proyek Pengembangan Kawasan Industri Balikpapan",
        location: "Balikpapan",
        coordinates: [-1.2379, 116.8529], // Balikpapan
        budget: 65000000000, // 65 Miliar
        pic: "Budi Hartono",
        status: "Planning",
        progress: 25,
        target: "Q4 2025",
        company_id: "4", // PT Indonesia Asahan Aluminium (Inalum)
        company_name: "PT Indonesia Asahan Aluminium (Inalum)",
      },
      {
        id: 6,
        name: "Proyek Energi Terbarukan Jayapura",
        location: "Jayapura",
        coordinates: [-2.5920, 140.6682], // Jayapura
        budget: 45000000000, // 45 Miliar
        pic: "Maria Santoso",
        status: "Planning",
        progress: 15,
        target: "Q1 2026",
        company_id: "5", // PT Timah Tbk
        company_name: "PT Timah Tbk",
      },
      {
        id: 7,
        name: "Proyek Pembangunan Bandara Medan",
        location: "Medan",
        coordinates: [3.5952, 98.6722], // Medan
        budget: 110000000000, // 110 Miliar
        pic: "Rahman Hidayat",
        status: "In Progress",
        progress: 55,
        target: "Q3 2024",
        company_id: "6", // PT Vale Indonesia
        company_name: "PT Vale Indonesia",
      },
      {
        id: 8,
        name: "Proyek Pengembangan Pariwisata Denpasar",
        location: "Denpasar",
        coordinates: [-8.6705, 115.2126], // Denpasar
        budget: 75000000000, // 75 Miliar
        pic: "I Nyoman Wiratha",
        status: "In Progress",
        progress: 70,
        target: "Q2 2024",
        company_id: "2", // PT Bukit Asam Tbk
        company_name: "PT Bukit Asam Tbk",
      },
    ],
    version: "1.0.0",
  },
};
