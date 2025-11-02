import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { RiskForm } from "@/app/(protected)/projects/_components/risk-form.jsx";
import { projectRisks } from "@/app/(protected)/projects/_data/risks.js";

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Project Detail",
      path: `/projects/${id}`,
    },
    {
      label: "Risks",
      path: `/projects/${id}/risks`,
    },
    {
      label: "Create Risk",
      path: `/projects/${id}/risks/create`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Generate new risk ID
        const newId = String(Math.max(...projectRisks.data.items.map(item => parseInt(item.id)), 0) + 1);
        
        // Generate risk number - get the highest number for this project and increment
        const projectRisksFiltered = projectRisks.data.items
          .filter(item => item.project_id === id)
          .map(item => {
            const match = item.nomor_resiko.match(/RSK-(\d+)/);
            return match ? parseInt(match[1]) : 0;
          });
        
        const lastRiskNumber = projectRisksFiltered.length > 0 ? Math.max(...projectRisksFiltered) : 0;
        const riskNumber = `RSK-${String(lastRiskNumber + 1).padStart(3, '0')}`;
        
        // Create new risk object
        const newRisk = {
          id: newId,
          project_id: id,
          nomor_resiko: riskNumber,
          ...values,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Add to risks array (in real app, this would be an API call)
        projectRisks.data.items.push(newRisk);
        
        message.success("Risk created successfully");
        navigate(`/projects/${id}?tab=risks`);
      } catch (error) {
        message.error("Failed to create risk");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Page
      title="Create Risk"
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title="Create New Risk"
        open={true}
        onCancel={() => navigate(`/projects/${id}?tab=risks`)}
        footer={null}
        width={1200}
        centered
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto'
          }
        }}
      >
        <RiskForm
          formProps={{
            form,
            onFinish: handleFinish,
          }}
          loading={loading}
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
