// Re-export all project data from PIMS
export {
  allProjects,
  feasibilityProjects,
  activeProjects,
  pendingProjects,
  projectDetail
} from "../../projects/_data";

// Keep the strategic capital project dashboard data
export const getStrategicCapitalProjectData = async () => {
  return {
    status_code: 200,
    data: {
      total_investment: {
        upstream: 45000000000,
        midstream: 30000000000,
        downstream: 25000000000,
      },
      summary: {
        total_projects: 12,
        spi: 0.95,
        cpi: 1.02,
        high_risk: 3,
      },
      company_distribution: [
        { name: "PTFI", value: 5 },
        { name: "PTBA", value: 3 },
        { name: "Inalum", value: 2 },
        { name: "Antam", value: 1 },
        { name: "Vale", value: 1 },
      ],
      project_objectives: [
        { name: "A", label: "Sasaran A: Orientasi peningkatan pendapatan dan laba", value: 3 },
        { name: "B", label: "Sasaran B: Orientasi penugasan tetapi tidak merugikan", value: 3 },
        { name: "C", label: "Sasaran C: Orientasi Peningkatan laba melalui usaha non core", value: 2 },
        { name: "D", label: "Sasaran D: Orientasi peningkatan kehandalan sistem dan efisiensi biaya", value: 2 },
        { name: "E", label: "Sasaran E: Orientasi saran penunjang kebutuhan operasional", value: 2 },
      ],
      project_phase: [
        { phase: "FEL 2", quantity: 3 },
        { phase: "FEL 3", quantity: 2 },
        { phase: "FID", quantity: 1 },
        { phase: "Detail Engineering", quantity: 2 },
        { phase: "Construction", quantity: 3 },
        { phase: "Commissioning", quantity: 1 },
        { phase: "Operate Optimize", quantity: 1 },
      ],
      commodity_distribution: [
        { commodity: "Nickel", value: 35000000000 },
        { commodity: "Alumunium", value: 25000000000 },
        { commodity: "Gold", value: 20000000000 },
        { commodity: "Tin", value: 12000000000 },
        { commodity: "Copper", value: 8000000000 },
      ],
      project_type: [
        { type: "New Facility", quantity: 4 },
        { type: "Expansion", quantity: 3 },
        { type: "Replacement", quantity: 2 },
        { type: "Optimization", quantity: 2 },
        { type: "Environmental", quantity: 1 },
      ],
    },
  };
};
