import { useState } from "react";
import { Space, Row, Col, Typography, Button } from "antd";
import { 
  TrophyOutlined, 
  ExclamationCircleOutlined, 
  BarChartOutlined, 
  DollarOutlined, 
  BugOutlined, 
  ProjectOutlined,
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { Tabs } from "admiral";

// Import all wizard content components
import HighlightProjectContent from './HighlightProjectContent.jsx';
import CriticalTaskContent from './CriticalTaskContent.jsx';
import SCurveEVMContent from './SCurveEVMContent.jsx';
import FinancialPerformanceContent from './FinancialPerformanceContent.jsx';
import RiskIssueContent from './RiskIssueContent.jsx';

const { Title, Text } = Typography;

const ProjectWizard = ({ project, existingTabItems, handleSubmit, handleApproval, hideWizardTabs = false }) => {
  const [currentStep, setCurrentStep] = useState(0); // Default to "Highlight Project" tab (index 0)

  const wizardSteps = [
    {
      title: 'Highlight Project',
      icon: <TrophyOutlined />,
      content: <HighlightProjectContent project={project} />
    },
    {
      title: 'Critical Task',
      icon: <ExclamationCircleOutlined />,
      content: <CriticalTaskContent project={project} />
    },
    {
      title: 'SCurve & EVM',
      icon: <BarChartOutlined />,
      content: <SCurveEVMContent project={project} />
    },
    {
      title: 'Financial Performance',
      icon: <DollarOutlined />,
      content: <FinancialPerformanceContent project={project} />
    },
    {
      title: 'Risk & Issue',
      icon: <BugOutlined />,
      content: <RiskIssueContent project={project} />
    }
  ];

  const wizardTabItems = wizardSteps.map((step, index) => ({
    key: index.toString(),
    label: (
      <Space>
        {step.icon}
        {step.title}
      </Space>
    ),
    children: (
      <div style={{ minHeight: '400px' }}>
        {step.content}
      </div>
    ),
  }));

  // If hideWizardTabs is true, render only the "Project" tab content without wizard tabs
  if (hideWizardTabs) {
    return (
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Project Header with Title and Description (No Buttons) */}
        <Row justify="space-between" align="middle" style={{ 
          padding: "16px 0", 
          borderBottom: "1px solid #f0f0f0" 
        }}>
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              {project?.business_initiative_name || "Project Detail"}
            </Title>
            <Text type="secondary">
              {project?.project_code} • {project?.company}
            </Text>
          </Col>
        </Row>

        {/* Project Content Tabs */}
        <Tabs
          type="bordered-card"
          defaultActiveKey="data-input"
          items={existingTabItems}
        />
      </Space>
    );
  }

  return (
    <div>
      <style>{`
        /* Base tab styling */
        .project-wizard-tabs .ant-tabs-tab {
          background-color: #e6f7ff !important;
          border: 1px solid #91d5ff !important;
          color: #1890ff !important;
          border-radius: 6px !important;
          margin-right: 4px !important;
          transition: all 0.3s ease !important;
        }
        
        .project-wizard-tabs .ant-tabs-tab:hover {
          background-color: #bae7ff !important;
          color: #096dd9 !important;
          border-color: #69c0ff !important;
        }
        
        /* Active tab styling - most specific selectors */
        .project-wizard-tabs .ant-tabs-tab.ant-tabs-tab-active,
        .project-wizard-tabs.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active,
        .project-wizard-tabs .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active,
        div.project-wizard-tabs div.ant-tabs-nav div.ant-tabs-nav-wrap div.ant-tabs-nav-list div.ant-tabs-tab.ant-tabs-tab-active {
          background-color: #1890ff !important;
          color: #ffffff !important;
          border-color: #1890ff !important;
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3) !important;
        }
        
        /* Active tab button styling */
        .project-wizard-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
        .project-wizard-tabs.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
        .project-wizard-tabs .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
        div.project-wizard-tabs div.ant-tabs-nav div.ant-tabs-nav-wrap div.ant-tabs-nav-list div.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #ffffff !important;
        }
        
        /* Active tab hover state */
        .project-wizard-tabs .ant-tabs-tab.ant-tabs-tab-active:hover,
        .project-wizard-tabs.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active:hover {
          background-color: #1890ff !important;
          color: #ffffff !important;
          border-color: #1890ff !important;
        }
        
        /* Container styling */
        .project-wizard-tabs .ant-tabs-nav {
          background-color: #e6f7ff !important;
          border-radius: 8px !important;
          padding: 8px !important;
          border: 1px solid #91d5ff !important;
          margin-bottom: 16px !important;
        }
        
        .project-wizard-tabs .ant-tabs-nav-wrap {
          background-color: #e6f7ff !important;
          border-radius: 8px !important;
        }
        
        .project-wizard-tabs .ant-tabs-content-holder {
          background-color: transparent !important;
        }
        
        .project-wizard-tabs .ant-tabs-ink-bar {
          display: none !important;
        }
        
        /* Override any default white background */
        .project-wizard-tabs .ant-tabs-tab[aria-selected="true"] {
          background-color: #1890ff !important;
          color: #ffffff !important;
          border-color: #1890ff !important;
        }
        
        .project-wizard-tabs .ant-tabs-tab[aria-selected="true"] .ant-tabs-tab-btn {
          color: #ffffff !important;
        }
      `}</style>
      <Tabs
        type="card"
        activeKey={currentStep.toString()}
        onChange={(key) => setCurrentStep(parseInt(key))}
        items={wizardTabItems}
        tabBarStyle={{ 
          marginBottom: '16px',
          backgroundColor: '#e6f7ff',
          borderRadius: '8px',
          padding: '8px',
          border: '1px solid #91d5ff'
        }}
        className="project-wizard-tabs"
      />
    </div>
  );
};

export default ProjectWizard;
