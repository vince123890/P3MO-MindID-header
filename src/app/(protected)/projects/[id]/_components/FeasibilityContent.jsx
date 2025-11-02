import { Space, Table, Descriptions, Typography } from "antd";
import { FileOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Section } from "admiral";
import dayjs from "dayjs";

const FeasibilityContent = ({ project }) => {
  // Add null check for project
  if (!project) {
    return <div>Loading project data...</div>;
  }

  // Format currency for display
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Document table columns
  const documentColumns = [
    {
      title: "Document Name",
      dataIndex: "document_name",
      key: "document_name",
      render: (text) => (
        <Space>
          <FileOutlined style={{ color: "#1890ff" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Upload Date",
      dataIndex: "upload_date",
      key: "upload_date",
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />} 
          size="small"
        >
          Download
        </Button>
      ),
    },
  ];

  const basicInfoItems = [
    {
      key: "business_initiative_name",
      label: "Investment Name",
      children: <Typography.Text strong>{project?.business_initiative_name || "-"}</Typography.Text>,
    },
    {
      key: "company",
      label: "Company",
      children: <Typography.Text strong>{project?.company || "-"}</Typography.Text>,
    },
    {
      key: "project_code",
      label: "Investment Code",
      children: <Typography.Text strong>{project?.project_code || "-"}</Typography.Text>,
    },
  ];

  const financialEstimatesItems = [
    {
      key: "capex_estimate",
      label: "CAPEX (nominal)",
      children: <Typography.Text strong>{formatCurrency(project?.capex_estimate)}</Typography.Text>,
    },
    {
      key: "opex_estimate_yearly",
      label: "OPEX (Nominal)",
      children: <Typography.Text strong>{formatCurrency(project?.opex_estimate_yearly)}</Typography.Text>,
    },
    {
      key: "npv_estimate",
      label: "NPV",
      children: <Typography.Text strong>{formatCurrency(project?.npv_estimate)}</Typography.Text>,
    },
    {
      key: "irr_estimate",
      label: "IRR",
      children: <Typography.Text strong>{project?.irr_estimate || 0}%</Typography.Text>,
    },
    {
      key: "currency",
      label: "Currency",
      children: <Typography.Text strong>{project?.currency || "-"}</Typography.Text>,
    },
    {
      key: "discount_rate",
      label: "Discount Rate",
      children: <Typography.Text strong>{project?.discount_rate || 0}%</Typography.Text>,
    },
  ];

  const businessPartnersItems = [
    {
      key: "technology_licensor",
      label: "Teknologi Lisensor",
      children: <Typography.Text strong>{project?.technology_licensor || "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "raw_material_suppliers",
      label: "Raw Material Supplier",
      children: <Typography.Text strong>{project?.raw_material_suppliers || "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "offtaker",
      label: "Offtaker",
      children: <Typography.Text strong>{project?.offtaker || "-"}</Typography.Text>,
      span: 2,
    },
  ];

  const projectObjectivesItems = [
    {
      key: "sasaran_penjelasan",
      label: "Sasaran (penjelasan)",
      children: <Typography.Text strong>{project?.sasaran_penjelasan || "-"}</Typography.Text>,
      span: 2,
    },
  ];

  const remarksItems = [
    {
      key: "keterangan",
      label: "Keterangan",
      children: <Typography.Text strong>{project?.keterangan || "No remarks provided"}</Typography.Text>,
      span: 2,
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Basic Information Section */}
      <Section title="Basic Information">
        <Descriptions
          bordered
          layout="horizontal"
          items={basicInfoItems}
          column={{
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          contentStyle={{ padding: "16px" }}
          labelStyle={{ padding: "16px" }}
        />
      </Section>

      {/* Financial Estimates Section */}
      <Section title="Financial Estimates">
        <Descriptions
          bordered
          layout="horizontal"
          items={financialEstimatesItems}
          column={{
            md: 1,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          contentStyle={{ padding: "16px" }}
          labelStyle={{ padding: "16px" }}
        />
      </Section>

      {/* Business Partners Section */}
      <Section title="Business Partners">
        <Descriptions
          bordered
          layout="horizontal"
          items={businessPartnersItems}
          column={{
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          contentStyle={{ padding: "16px" }}
          labelStyle={{ padding: "16px" }}
        />
      </Section>

      {/* Project Objectives Section */}
      <Section title="Project Objectives">
        <Descriptions
          bordered
          layout="horizontal"
          items={projectObjectivesItems}
          column={{
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          contentStyle={{ padding: "16px" }}
          labelStyle={{ padding: "16px" }}
        />
      </Section>

      {/* Supporting Documents Section */}
      <Section title="Dokumen Pendukung">
        <Table
          columns={documentColumns}
          dataSource={project?.dokumen_pendukung || []}
          pagination={false}
          size="small"
          locale={{ emptyText: "No documents uploaded" }}
        />
      </Section>

      {/* Remarks Section */}
      <Section title="Keterangan">
        <Descriptions
          bordered
          layout="horizontal"
          items={remarksItems}
          column={{
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          contentStyle={{ padding: "16px" }}
          labelStyle={{ padding: "16px" }}
        />
      </Section>
    </Space>
  );
};

export default FeasibilityContent;
