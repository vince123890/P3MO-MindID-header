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
        upstream: { value: 4, count: 4, budget: 45000000000 },
        midstream: { value: 5, count: 5, budget: 30000000000 },
        downstream: { value: 3, count: 3, budget: 25000000000 },
      },
      summary: {
        total_projects: 12,
        spi: 0.95,
        cpi: 1.02,
        high_risk: 3,
      },
      company_distribution: [
        { name: "PTFI", value: 5, count: 5, budget: 18500000000 },
        { name: "PTBA", value: 3, count: 3, budget: 12200000000 },
        { name: "Inalum", value: 2, count: 2, budget: 8300000000 },
        { name: "Antam", value: 1, count: 1, budget: 4200000000 },
        { name: "Vale", value: 1, count: 1, budget: 6800000000 },
      ],
      project_objectives: [
        { name: "A", label: "Sasaran A: Orientasi peningkatan pendapatan dan laba", value: 3, count: 3, budget: 14500000000 },
        { name: "B", label: "Sasaran B: Orientasi penugasan tetapi tidak merugikan", value: 3, count: 3, budget: 11200000000 },
        { name: "C", label: "Sasaran C: Orientasi Peningkatan laba melalui usaha non core", value: 2, count: 2, budget: 8700000000 },
        { name: "D", label: "Sasaran D: Orientasi peningkatan kehandalan sistem dan efisiensi biaya", value: 2, count: 2, budget: 9300000000 },
        { name: "E", label: "Sasaran E: Orientasi saran penunjang kebutuhan operasional", value: 2, count: 2, budget: 6300000000 },
      ],
      project_phase: [
        { phase: "FEL 2", quantity: 3, budget: 15000000000 },
        { phase: "FEL 3", quantity: 2, budget: 12000000000 },
        { phase: "FID", quantity: 1, budget: 8000000000 },
        { phase: "Detail Engineering", quantity: 2, budget: 10000000000 },
        { phase: "Construction", quantity: 3, budget: 18000000000 },
        { phase: "Commissioning", quantity: 1, budget: 6000000000 },
        { phase: "Operate Optimize", quantity: 1, budget: 4000000000 },
      ],
      commodity_distribution: [
        { commodity: "Nickel", value: 4, count: 4, budget: 16800000000 },
        { commodity: "Alumunium", value: 3, count: 3, budget: 12100000000 },
        { commodity: "Gold", value: 2, count: 2, budget: 9500000000 },
        { commodity: "Tin", value: 2, count: 2, budget: 7200000000 },
        { commodity: "Copper", value: 1, count: 1, budget: 4400000000 },
      ],
      project_type: [
        { type: "New Facility", quantity: 4, budget: 20000000000 },
        { type: "Expansion", quantity: 3, budget: 15000000000 },
        { type: "Replacement", quantity: 2, budget: 12000000000 },
        { type: "Optimization", quantity: 2, budget: 8000000000 },
        { type: "Environmental", quantity: 1, budget: 5000000000 },
      ],
    },
  };
};
