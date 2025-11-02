import { useParams } from "react-router";
import { Page, Tabs } from "admiral";
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { projectDetail } from "../_data/index.js";
import { getProjectIssues } from "../../projects/_data/issues.js";
import { getProjectRisks } from "../../projects/_data/risks.js";
import { getProjectActivities } from "../../projects/_data/activities.js";

// Lazy load components to improve initial loading performance - reuse from PIMS
const FeasibilityContent = lazy(() => import('../../projects/[id]/_components/FeasibilityContent.jsx'));
const ProjectProfileContent = lazy(() => import('../../projects/[id]/_components/ProjectProfileContent.jsx'));
const ProjectBaselineContent = lazy(() => import('../../projects/[id]/_components/ProjectBaselineContent.jsx'));
const ProjectPerformanceContent = lazy(() => import('../../projects/[id]/_components/ProjectPerformanceContent.jsx'));
const ProjectIssuesContent = lazy(() => import('../../projects/[id]/_components/ProjectIssuesContent.jsx'));
const ProjectRisksContent = lazy(() => import('../../projects/[id]/_components/ProjectRisksContent.jsx'));
const ProjectActivitiesContent = lazy(() => import('../../projects/[id]/_components/ProjectActivitiesContent.jsx'));
const ProjectChangeStatusContent = lazy(() => import('../../projects/[id]/_components/ProjectChangeStatusContent.jsx'));
const DocumentManagerContent = lazy(() => import('../../projects/[id]/_components/DocumentManagerContent.jsx'));

// Direct import for DataVisualizationContent to avoid dynamic import issues
import DataVisualizationContent from '../../projects/[id]/_components/DataVisualizationContent.jsx';
import ProjectWizard from '../../projects/[id]/_components/ProjectWizard.jsx';

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px' 
  }}>
    <div>Loading...</div>
  </div>
);

const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Handle issues, risks, activities loading state
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [risksLoading, setRisksLoading] = useState(false);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  
  // Data fetching with safe error handling
  const issuesData = useGetData(getProjectIssues(id));
  const risksData = useGetData(getProjectRisks(id));
  const activitiesData = useGetData(getProjectActivities(id));
  
  // Create completely safe filter props object (no useFilter hook to avoid conversion errors)
  const filterProps = {
    search: "",
    page: "1", 
    limit: "10"
  };
  
  // Debug logging
  console.log("Project ID from URL:", String(id));
  console.log("Data loading states:", {
    issues: issuesData.loading,
    risks: risksData.loading,
    activities: activitiesData.loading
  });
  
  // Static test data untuk memastikan routing berfungsi
  const staticProject = {
    id: String(id),
    project_code: "PROJ-ANTAM-2025-001",
    business_initiative_name: "Renewable Energy Plant Development Initiative for Sustainable Mining Operations",
    company: "PT Aneka Tambang Tbk",
    division: "Engineering",
    status: "Active",
    sync_status: "Synced",
    last_sync_date: "2025-01-09T15:30:00.000Z",
    currency: "IDR",
    capex_estimate: 50000000000,
    opex_estimate_yearly: 5000000000,
    irr_estimate: 18.5,
    npv_estimate: 15000000000,
    discount_rate: 12.5,
    technology_licensor: "Green Energy Solutions Ltd",
    raw_material_suppliers: "PT Solar Panel Indonesia, PT Wind Turbine Components, PT Battery Technology",
    offtaker: "PT National Energy Grid",
    sasaran_penjelasan: "Develop renewable energy plant to support sustainable mining operations with focus on reducing carbon footprint and energy costs.",
    keterangan: "Project has received preliminary approval from board. Waiting for final environmental clearance. Target implementation start: Q2 2025.",
    dokumen_pendukung: [
      {
        key: "1",
        document_name: "Technical Feasibility Report.pdf",
        size: "2.5 MB",
        upload_date: "2025-01-05T17:00:00.000Z"
      }
    ],
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-09T15:30:00.000Z",
  };
  
  const project = staticProject;

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Projects",
      path: "/strategic-capital-project",
    },
    {
      label: project?.project_code || "Project Detail",
      path: `/strategic-capital-project/${id}`,
    },
  ];


  // Data Input Sub-tabs (7 tabs)
  const dataInputSubTabs = [
    {
      key: "feasibility",
      label: "Feasibility Study",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <FeasibilityContent project={project} />
        </Suspense>
      ),
    },
    {
      key: "project-profile",
      label: "Project Profile",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectProfileContent readOnly={true} />
        </Suspense>
      ),
    },
    {
      key: "project-baseline",
      label: "Project Baseline",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectBaselineContent project={project} readOnly={true} />
        </Suspense>
      ),
    },
    {
      key: "project-performance",
      label: "Project Performance",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectPerformanceContent readOnly={true} />
        </Suspense>
      ),
    },
    {
      key: "project-issues",
      label: "Project Issues",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectIssuesContent 
            id={String(id)}
            issuesData={issuesData}
            issuesLoading={issuesLoading}
            filters={filterProps}
            readOnly={true}
          />
        </Suspense>
      ),
    },
    {
      key: "project-risks",
      label: "Project Risks",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectRisksContent 
            id={String(id)}
            risksData={risksData}
            risksLoading={risksLoading}
            filters={filterProps}
            readOnly={true}
          />
        </Suspense>
      ),
    },
    {
      key: "project-activities",
      label: "Current Activity",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectActivitiesContent 
            id={String(id)}
            activitiesData={activitiesData}
            activitiesLoading={activitiesLoading}
            filters={filterProps}
            readOnly={true}
          />
        </Suspense>
      ),
    },
    {
      key: "change-status",
      label: "Change Status",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectChangeStatusContent 
            id={String(id)}
            filters={filterProps}
          />
        </Suspense>
      ),
    },
  ];

  // Main tab items for the detail page (3 parent tabs)
  const tabItems = [
    {
      key: "data-input",
      label: "Data Input",
      children: (
        <Tabs
          type="bordered-card"
          defaultActiveKey="feasibility"
          items={dataInputSubTabs}
        />
      ),
    },
    {
      key: "data-visualisasi",
      label: "Data Visualisasi",
      children: <DataVisualizationContent />,
    },
    {
      key: "document-manager",
      label: "Document Management",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <DocumentManagerContent readOnly={true} />
        </Suspense>
      ),
    },
  ];

  return (
    <Page
      title={`Projects Detail: ${project?.project_code || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/strategic-capital-project")}
      noStyle
    >
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Main Content - Full Width Wizard */}
        <ProjectWizard 
          project={project}
          existingTabItems={tabItems}
        />
      </div>
    </Page>
  );
};

export default Component;
