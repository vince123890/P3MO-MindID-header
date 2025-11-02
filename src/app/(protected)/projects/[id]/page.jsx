import { useParams } from "react-router";
import { Button, Space, Row, Col, Typography, Card, Timeline, Tag, Divider, Modal, Input, message } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, CommentOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, Tabs } from "admiral";
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { projectDetail } from "../_data/index.js";
import { getProjectIssues } from "../_data/issues.js";
import { getProjectRisks } from "../_data/risks.js";
import { getProjectActivities } from "../_data/activities.js";

const { Title, Text } = Typography;
const { TextArea } = Input;


// Lazy load components to improve initial loading performance
const FeasibilityContent = lazy(() => import('./_components/FeasibilityContent.jsx'));
const ProjectProfileContent = lazy(() => import('./_components/ProjectProfileContent.jsx'));
const ProjectBaselineContent = lazy(() => import('./_components/ProjectBaselineContent.jsx'));
const ProjectPerformanceContent = lazy(() => import('./_components/ProjectPerformanceContent.jsx'));
const ProjectIssuesContent = lazy(() => import('./_components/ProjectIssuesContent.jsx'));
const ProjectRisksContent = lazy(() => import('./_components/ProjectRisksContent.jsx'));
const ProjectActivitiesContent = lazy(() => import('./_components/ProjectActivitiesContent.jsx'));
const ProjectChangeStatusContent = lazy(() => import('./_components/ProjectChangeStatusContent.jsx'));
const DocumentManagerContent = lazy(() => import('./_components/DocumentManagerContent.jsx'));

// Direct import for DataVisualizationContent to avoid dynamic import issues
import DataVisualizationContent from './_components/DataVisualizationContent.jsx';
import ProjectWizard from './_components/ProjectWizard.jsx';

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
  
  // Approval modal states
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [approvalAction, setApprovalAction] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showApprovalLog, setShowApprovalLog] = useState(false);
  
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
      path: "/projects",
    },
    {
      label: project?.project_code || "Project Detail",
      path: `/projects/${id}`,
    },
  ];

  // Approval log data
  const approvalLog = [
    {
      id: 1,
      role: "Creator (PM AH)",
      user: "Ahmad Hidayat",
      status: "created",
      date: "2025-01-15 10:30",
      notes: "Project baseline created and ready for review"
    },
    {
      id: 2,
      role: "Approver (PMO AH)",
      user: "Siti Nurhaliza",
      status: "approved",
      date: "2025-01-16 14:20",
      notes: "Technical review completed. All requirements met."
    },
    {
      id: 3,
      role: "Approver (PMO Mind ID)",
      user: "Budi Santoso",
      status: "pending",
      date: null,
      notes: "Approve Baseline 3"
    }
  ];

  // Handle approval actions
  const handleApproval = (action) => {
    setApprovalAction(action);
    setIsApprovalModalVisible(true);
  };

  const handleApprovalSubmit = () => {
    message.success(`Project ${approvalAction === 'approve' ? 'approved' : 'rejected'} successfully!`);
    setIsApprovalModalVisible(false);
    setApprovalNotes('');
  };

  const handleSubmit = () => {
    message.success('Project data submitted successfully!');
  };


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
          <ProjectProfileContent />
        </Suspense>
      ),
    },
    {
      key: "project-baseline",
      label: "Project Baseline",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectBaselineContent project={project} />
        </Suspense>
      ),
    },
    {
      key: "project-performance",
      label: "Project Performance",
      children: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectPerformanceContent />
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
          <DocumentManagerContent />
        </Suspense>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button 
            type="primary" 
            icon={<CheckOutlined />}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            onClick={() => handleApproval('approve')}
          >
            Approve
          </Button>
          <Button 
            danger 
            icon={<CloseOutlined />}
            onClick={() => handleApproval('reject')}
          >
            Reject
          </Button>
        </Space>
      }
      title={`Projects Detail: ${project?.project_code || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/projects")}
      noStyle
    >
      <div style={{ position: 'relative', width: '100%' }}>

        {/* Main Content - Full Width Wizard */}
        <ProjectWizard 
          project={project}
          existingTabItems={tabItems}
          handleSubmit={handleSubmit}
          handleApproval={handleApproval}
          hideWizardTabs={true}
        />

        {/* Floating Approval Log - WhatsApp Style */}
        {showApprovalLog && (
          <div
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              width: '350px',
              maxHeight: '500px',
              zIndex: 1000,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <Card 
              title="Approval Log" 
              size="small"
              style={{ borderRadius: '12px' }}
              extra={
                <Button
                  type="text"
                  icon={<EyeInvisibleOutlined />}
                  onClick={() => setShowApprovalLog(false)}
                  title="Hide approval log"
                />
              }
            >
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Timeline>
                  {approvalLog.map((log) => (
                    <Timeline.Item
                      key={log.id}
                      color={
                        log.status === 'approved' ? 'green' :
                        log.status === 'rejected' ? 'red' :
                        log.status === 'pending' ? 'blue' : 'gray'
                      }
                      dot={
                        log.status === 'approved' ? <CheckOutlined /> :
                        log.status === 'rejected' ? <CloseOutlined /> :
                        log.status === 'pending' ? <CommentOutlined /> : null
                      }
                    >
                      <div>
                        <Text strong style={{ fontSize: '12px' }}>{log.role}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>{log.user}</Text>
                        <br />
                        {log.date && (
                          <>
                            <Text type="secondary" style={{ fontSize: '10px' }}>
                              {log.date}
                            </Text>
                            <br />
                          </>
                        )}
                        <Tag 
                          size="small"
                          color={
                            log.status === 'approved' ? 'green' :
                            log.status === 'rejected' ? 'red' :
                            log.status === 'pending' ? 'blue' : 'default'
                          }
                        >
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </Tag>
                        <br />
                        <Text style={{ fontSize: '11px' }}>{log.notes}</Text>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </div>
        )}

        {/* Floating Approval Log Button - WhatsApp Style */}
        {!showApprovalLog && (
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => setShowApprovalLog(true)}
            size="large"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '56px',
              height: '56px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Show approval log"
          />
        )}

        {/* Approval Modal */}
        <Modal
          title={`${approvalAction === 'approve' ? 'Approve' : 'Reject'} Project`}
          open={isApprovalModalVisible}
          onOk={handleApprovalSubmit}
          onCancel={() => {
            setIsApprovalModalVisible(false);
            setApprovalNotes('');
          }}
          okText={approvalAction === 'approve' ? 'Approve' : 'Reject'}
          okButtonProps={{
            danger: approvalAction === 'reject'
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>
              Are you sure you want to {approvalAction} this project?
            </Text>
            <TextArea
              placeholder="Add notes (optional)"
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              rows={4}
            />
          </Space>
        </Modal>
      </div>
    </Page>
  );
};

export default Component;
