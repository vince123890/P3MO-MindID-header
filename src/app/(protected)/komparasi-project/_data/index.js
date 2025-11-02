// Dummy data for project comparison dashboard

const projectComparisonData = {
  status_code: 200,
  data: {
    // Total CAPEX comparison data
    total_capex: {
      title: "Total CAPEX",
      description: "Total Capital Expenditure allocated for each project initiative across different companies",
      unit: "M",
      currency: "$",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 6.8, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 7.8, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 6.9, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 5.5, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 6.2, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 6.8, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 6.9, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 7.5, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 8.8, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 9.6, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 8.9, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 8.2, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 7.8, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 8.4, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 9.6, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 8.8, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 7.2, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 6.5, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Duration comparison data
    duration: {
      title: "Duration",
      description: "Project execution timeline from initiation to completion measured in months",
      unit: "Months",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 18, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 24, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 16, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 12, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 20, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 15, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 22, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 19, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 26, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 30, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 28, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 21, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 17, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 25, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 32, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 29, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 14, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 11, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Progress Fisik comparison data (Rencana vs Aktual)
    progress_fisik_r: {
      title: "% Progress Fisik",
      description: "Physical completion percentage - Planned (Rencana) vs Actual (Aktual)",
      unit: "%",
      currency: "",
      projects: [
        { id: 1, name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", rencana: 85, aktual: 82, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 2, name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", rencana: 92, aktual: 89, company: "PT Bukit Asam Tbk" },
        { id: 3, name: "PT Freeport Indonesia - Underground Mining Development", rencana: 78, aktual: 75, company: "PT Freeport Indonesia" },
        { id: 4, name: "PT Indonesia Asahan Aluminium - Smelter Modernization", rencana: 65, aktual: 62, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 5, name: "PT Timah Tbk - Tin Smelting Facility Upgrade", rencana: 88, aktual: 85, company: "PT Timah Tbk" },
        { id: 6, name: "PT Vale Indonesia Tbk - Nickel Processing Complex", rencana: 95, aktual: 92, company: "PT Vale Indonesia Tbk" },
        { id: 7, name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", rencana: 82, aktual: 79, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 8, name: "PT Bukit Asam Tbk - Steam Power Plant Development", rencana: 90, aktual: 87, company: "PT Bukit Asam Tbk" },
        { id: 9, name: "PT Freeport Indonesia - Copper Concentrate Plant", rencana: 87, aktual: 84, company: "PT Freeport Indonesia" },
        { id: 10, name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", rencana: 93, aktual: 90, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 11, name: "PT Timah Tbk - Offshore Mining Expansion", rencana: 89, aktual: 86, company: "PT Timah Tbk" },
        { id: 12, name: "PT Vale Indonesia Tbk - Nickel Matte Production", rencana: 76, aktual: 73, company: "PT Vale Indonesia Tbk" },
        { id: 13, name: "PT Aneka Tambang Tbk - Gold Processing Facility", rencana: 84, aktual: 81, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 14, name: "PT Bukit Asam Tbk - Coal Gasification Project", rencana: 91, aktual: 88, company: "PT Bukit Asam Tbk" },
        { id: 15, name: "PT Freeport Indonesia - Tailings Management System", rencana: 96, aktual: 93, company: "PT Freeport Indonesia" },
        { id: 16, name: "PT Indonesia Asahan Aluminium - Alumina Refinery", rencana: 88, aktual: 85, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 17, name: "PT Timah Tbk - Tin Chemicals Production", rencana: 72, aktual: 69, company: "PT Timah Tbk" },
        { id: 18, name: "PT Vale Indonesia Tbk - Ferronickel Smelter", rencana: 68, aktual: 65, company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Progress Fisik A comparison data
    progress_fisik_a: {
      title: "%Progress Fisik A",
      description: "Actual physical completion percentage achieved to date (Aktual/Actual)",
      unit: "%",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 82, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 89, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 75, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 62, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 85, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 92, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 79, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 87, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 84, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 90, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 86, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 73, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 81, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 88, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 93, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 85, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 69, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 65, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Anggaran Terserap comparison data (Rencana vs Aktual)
    anggaran_terserap_r: {
      title: "Anggaran Terserap",
      description: "Budget absorption - Planned (Rencana) vs Actual (Aktual)",
      unit: "M",
      currency: "$",
      projects: [
        { id: 1, name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", rencana: 5.8, aktual: 5.6, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 2, name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", rencana: 7.2, aktual: 6.9, company: "PT Bukit Asam Tbk" },
        { id: 3, name: "PT Freeport Indonesia - Underground Mining Development", rencana: 5.4, aktual: 5.2, company: "PT Freeport Indonesia" },
        { id: 4, name: "PT Indonesia Asahan Aluminium - Smelter Modernization", rencana: 3.6, aktual: 3.4, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 5, name: "PT Timah Tbk - Tin Smelting Facility Upgrade", rencana: 5.5, aktual: 5.3, company: "PT Timah Tbk" },
        { id: 6, name: "PT Vale Indonesia Tbk - Nickel Processing Complex", rencana: 6.5, aktual: 6.3, company: "PT Vale Indonesia Tbk" },
        { id: 7, name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", rencana: 5.7, aktual: 5.5, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 8, name: "PT Bukit Asam Tbk - Steam Power Plant Development", rencana: 6.8, aktual: 6.5, company: "PT Bukit Asam Tbk" },
        { id: 9, name: "PT Freeport Indonesia - Copper Concentrate Plant", rencana: 7.7, aktual: 7.4, company: "PT Freeport Indonesia" },
        { id: 10, name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", rencana: 8.9, aktual: 8.6, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 11, name: "PT Timah Tbk - Offshore Mining Expansion", rencana: 7.9, aktual: 7.6, company: "PT Timah Tbk" },
        { id: 12, name: "PT Vale Indonesia Tbk - Nickel Matte Production", rencana: 6.2, aktual: 6.0, company: "PT Vale Indonesia Tbk" },
        { id: 13, name: "PT Aneka Tambang Tbk - Gold Processing Facility", rencana: 6.5, aktual: 6.3, company: "PT Aneka Tambang Tbk (ANTAM)" },
        { id: 14, name: "PT Bukit Asam Tbk - Coal Gasification Project", rencana: 7.6, aktual: 7.4, company: "PT Bukit Asam Tbk" },
        { id: 15, name: "PT Freeport Indonesia - Tailings Management System", rencana: 9.2, aktual: 8.9, company: "PT Freeport Indonesia" },
        { id: 16, name: "PT Indonesia Asahan Aluminium - Alumina Refinery", rencana: 7.5, aktual: 7.2, company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { id: 17, name: "PT Timah Tbk - Tin Chemicals Production", rencana: 5.0, aktual: 4.8, company: "PT Timah Tbk" },
        { id: 18, name: "PT Vale Indonesia Tbk - Ferronickel Smelter", rencana: 4.2, aktual: 4.0, company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Anggaran Terserap A comparison data
    anggaran_terserap_a: {
      title: "Anggaran Terserap A",
      description: "Actual budget absorbed and spent on project activities to date (Aktual/Actual)",
      unit: "M",
      currency: "$",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 5.6, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 6.9, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 5.2, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 3.4, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 5.3, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 6.3, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 5.5, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 6.5, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 7.4, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 8.6, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 7.6, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 6.0, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 6.3, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 7.4, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 8.9, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 7.2, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 4.8, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 4.0, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // SPI comparison data
    spi: {
      title: "SPI (Schedule Performance Index)",
      description: "Schedule Performance Index - ratio of earned value to planned value (>1.0 = ahead of schedule, <1.0 = behind schedule)",
      unit: "",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 0.95, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 1.08, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 0.89, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 0.78, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 0.92, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 1.12, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 0.87, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 1.05, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 0.98, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 1.15, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 1.02, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 0.85, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 0.93, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 1.07, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 1.18, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 1.01, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 0.82, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 0.75, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // CPI comparison data
    cpi: {
      title: "CPI (Cost Performance Index)",
      description: "Cost Performance Index - ratio of earned value to actual cost (>1.0 = under budget, <1.0 = over budget)",
      unit: "",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 0.97, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 1.04, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 0.96, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 0.95, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 0.96, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 0.97, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 0.96, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 0.96, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 0.96, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 0.97, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 0.96, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 0.97, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 0.97, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 0.97, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 0.97, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 0.96, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 0.96, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 0.95, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Pipeline stages data (for Mining Project Pipeline Stages section)
    pipeline: {
      stages: [
        {
          id: "in_hpo",
          name: "In HPO",
          projects: [
            { 
              id: 1, 
              priority: "In HPO", 
              color: "#FFD700", 
              size: "large",
              name: "Gold Mining Expansion",
              company: "PT Aneka Tambang Tbk",
              budget: 580,
              type: "Gold",
              progress: 25
            },
            { 
              id: 2, 
              priority: "In HPO", 
              color: "#c41e3a", 
              size: "large",
              name: "Nickel Processing Plant",
              company: "PT Vale Indonesia",
              budget: 720,
              type: "Nickel",
              progress: 30
            },
            { 
              id: 3, 
              priority: "In HPO", 
              color: "#2a4a7a", 
              size: "small",
              name: "Coal Gasification",
              company: "PT Bukit Asam",
              budget: 180,
              type: "Coal",
              progress: 15
            }
          ]
        },
        {
          id: "fid", 
          name: "FID",
          projects: [
            { 
              id: 4, 
              priority: "FID", 
              color: "#2a4a7a", 
              size: "medium",
              name: "Steam Power Plant",
              company: "PT Bukit Asam",
              budget: 450,
              type: "Coal",
              progress: 40
            },
            { 
              id: 5, 
              priority: "FID", 
              color: "#d14458", 
              size: "medium",
              name: "Bauxite Mining",
              company: "PT Aneka Tambang Tbk",
              budget: 380,
              type: "Bauxite",
              progress: 35
            },
            { 
              id: 6, 
              priority: "FID", 
              color: "#c41e3a", 
              size: "medium",
              name: "Ferronickel Smelter",
              company: "PT Vale Indonesia",
              budget: 520,
              type: "Nickel",
              progress: 45
            },
            { 
              id: 7, 
              priority: "FID", 
              color: "#21426e", 
              size: "small",
              name: "Tin Processing",
              company: "PT Timah Tbk",
              budget: 220,
              type: "Tin",
              progress: 20
            },
            { 
              id: 8, 
              priority: "FID", 
              color: "#FFD700", 
              size: "small",
              name: "Gold Refinery",
              company: "PT Aneka Tambang Tbk",
              budget: 290,
              type: "Gold",
              progress: 55
            }
          ]
        },
        {
          id: "detail_engineering",
          name: "Detail Engineering", 
          projects: [
            { 
              id: 9, 
              priority: 4, 
              color: "#FFD700", 
              size: "medium",
              name: "Gold Processing Facility",
              company: "PT Aneka Tambang Tbk",
              budget: 420,
              type: "Gold",
              progress: 65
            },
            { 
              id: 10, 
              priority: 2, 
              color: "#21426e", 
              size: "large",
              name: "Offshore Mining Platform",
              company: "PT Timah Tbk",
              budget: 850,
              type: "Tin",
              progress: 70
            },
            { 
              id: 11, 
              priority: 3, 
              color: "#c41e3a", 
              size: "small",
              name: "Nickel Matte Production",
              company: "PT Vale Indonesia",
              budget: 320,
              type: "Nickel",
              progress: 60
            }
          ]
        },
        {
          id: "construction",
          name: "Construction",
          projects: [
            { 
              id: 12, 
              priority: 4, 
              color: "#CD7F32", 
              size: "medium",
              name: "Underground Mining",
              company: "PT Freeport Indonesia",
              budget: 680,
              type: "Copper",
              progress: 75
            },
            { 
              id: 13, 
              priority: 3, 
              color: "#2a4a7a", 
              size: "medium",
              name: "Coal Mine Expansion",
              company: "PT Bukit Asam",
              budget: 490,
              type: "Coal",
              progress: 80
            }
          ]
        },
        {
          id: "commissioning", 
          name: "Commissioning",
          projects: [
            { 
              id: 14, 
              priority: 2, 
              color: "#CD7F32", 
              size: "medium",
              name: "Copper Concentrate Plant",
              company: "PT Freeport Indonesia",
              budget: 560,
              type: "Copper",
              progress: 85
            },
            { 
              id: 15, 
              priority: 4, 
              color: "#21426e", 
              size: "small",
              name: "Tin Smelting Facility",
              company: "PT Timah Tbk",
              budget: 280,
              type: "Tin",
              progress: 90
            }
          ]
        },
        {
          id: "operate_optimize",
          name: "Operate Optimize", 
          projects: [
            { 
              id: 16, 
              priority: 4, 
              color: "#0f1e3a", 
              size: "small",
              name: "Alumina Refinery",
              company: "PT Indonesia Asahan Aluminium",
              budget: 240,
              type: "Aluminum",
              progress: 95
            }
          ]
        },
        {
          id: "ore_processing",
          name: "Ore Processing",
          projects: [
            { 
              id: 17, 
              priority: 5, 
              color: "#FFD700", 
              size: "small",
              name: "Gold Ore Processing",
              company: "PT Aneka Tambang Tbk",
              budget: 190,
              type: "Gold",
              progress: 98
            },
            { 
              id: 18, 
              priority: 2, 
              color: "#CD7F32", 
              size: "small",
              name: "Copper Extraction",
              company: "PT Freeport Indonesia",
              budget: 340,
              type: "Copper",
              progress: 92
            },
            { 
              id: 19, 
              priority: 3, 
              color: "#CD7F32", 
              size: "small",
              name: "Tailings Management",
              company: "PT Freeport Indonesia",
              budget: 450,
              type: "Copper",
              progress: 88
            },
            { 
              id: 20, 
              priority: 2, 
              color: "#0f1e3a", 
              size: "small",
              name: "Smelter Modernization",
              company: "PT Indonesia Asahan Aluminium",
              budget: 380,
              type: "Aluminum",
              progress: 94
            },
            { 
              id: 21, 
              priority: 1, 
              color: "#0f1e3a", 
              size: "small",
              name: "Aluminum Rod Plant",
              company: "PT Indonesia Asahan Aluminium",
              budget: 290,
              type: "Aluminum",
              progress: 96
            },
            { 
              id: 22, 
              priority: 4, 
              color: "#c41e3a", 
              size: "small",
              name: "Nickel Laterite Processing",
              company: "PT Vale Indonesia",
              budget: 410,
              type: "Nickel",
              progress: 90
            }
          ]
        }
      ]
    },

    // Phases data (for Mining Project Development Phases section)
    phases: {
      initiation: {
        title: "Initiation Phase",
        projects: [
          {
            id: 1,
            name: "Gold Mining Expansion",
            type: "Gold",
            priority: 1,
            color: "#FFD700"
          },
          {
            id: 2,
            name: "Nickel Processing Plant",
            type: "Nickel",
            priority: 2,
            color: "#c41e3a"
          }
        ]
      },
      planning: {
        title: "Planning Phase",
        projects: [
          {
            id: 3,
            name: "Coal Gasification",
            type: "Coal",
            priority: 3,
            color: "#2a4a7a"
          },
          {
            id: 4,
            name: "Bauxite Mining",
            type: "Bauxite",
            priority: 1,
            color: "#d14458"
          }
        ]
      },
      execution: {
        title: "Execution Phase",
        projects: [
          {
            id: 5,
            name: "Gold Processing Facility",
            type: "Gold",
            priority: 4,
            color: "#FFD700"
          },
          {
            id: 6,
            name: "Offshore Mining Platform",
            type: "Tin",
            priority: 5,
            color: "#21426e"
          },
          {
            id: 7,
            name: "Underground Mining",
            type: "Copper",
            priority: 1,
            color: "#CD7F32"
          },
          {
            id: 8,
            name: "Copper Concentrate Plant",
            type: "Copper",
            priority: 2,
            color: "#CD7F32"
          },
          {
            id: 9,
            name: "Alumina Refinery",
            type: "Aluminum",
            priority: 3,
            color: "#0f1e3a"
          }
        ]
      }
    }
  },
  version: "1.0.0",
};

export default projectComparisonData;
