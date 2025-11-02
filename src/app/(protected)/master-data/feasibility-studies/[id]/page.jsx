import { Page, Section } from "admiral";
import { Space, Button, Descriptions, Flex, message, Tag } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";
import { UserAddOutlined } from "@ant-design/icons";

import { formatDate } from "@/utils/date-format";
import { listFeasibilityStudies } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const feasibilityStudy = listFeasibilityStudies.data.items.find(
    (item) => item.id === parseInt(params.id)
  );

  if (!feasibilityStudy) {
    return (
      <Page title="Feasibility Study Not Found">
        <Section>
          <p>The requested feasibility study could not be found.</p>
        </Section>
      </Page>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Assign":
        return "green";
      case "Unassign":
        return "orange";
      default:
        return "default";
    }
  };

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Feasibility Studies",
      path: "/master-data/feasibility-studies",
    },
    {
      label: `Feasibility Study Details: ${feasibilityStudy?.investment_name || ""}`,
      path: "#",
    },
  ];

  const basicInfoItems = [
    {
      key: "investment_name",
      label: "Investment Name",
      children: <Typography.Text strong>{feasibilityStudy?.investment_name ?? "-"}</Typography.Text>,
    },
    {
      key: "company",
      label: "Company",
      children: <Typography.Text strong>{feasibilityStudy?.company ?? "-"}</Typography.Text>,
    },
    {
      key: "investment_code",
      label: "Investment Code",
      children: <Typography.Text strong>{feasibilityStudy?.investment_code ?? "-"}</Typography.Text>,
    },
    {
      key: "project_code",
      label: "Project Code",
      children: <Typography.Text strong>{feasibilityStudy?.project_code ?? "-"}</Typography.Text>,
    },
  ];

  const financialItems = [
    {
      key: "capex",
      label: "CAPEX",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.capex) ?? "-"}</Typography.Text>,
    },
    {
      key: "opex",
      label: "OPEX",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.opex) ?? "-"}</Typography.Text>,
    },
    {
      key: "npv",
      label: "NPV",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.npv) ?? "-"}</Typography.Text>,
    },
    {
      key: "irr",
      label: "IRR",
      children: <Typography.Text strong>{feasibilityStudy?.irr ? `${feasibilityStudy.irr}%` : "-"}</Typography.Text>,
    },
  ];

  const projectDetailsItems = [
    {
      key: "sasaran",
      label: "Sasaran",
      children: <Typography.Text>{feasibilityStudy?.sasaran ?? "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "teknologi_lisensor",
      label: "Teknologi Lisensor",
      children: <Typography.Text>{feasibilityStudy?.teknologi_lisensor ?? "-"}</Typography.Text>,
    },
    {
      key: "raw_material_supplier",
      label: "Raw Material Supplier",
      children: <Typography.Text>{feasibilityStudy?.raw_material_supplier ?? "-"}</Typography.Text>,
    },
    {
      key: "offtaker",
      label: "Offtaker",
      children: <Typography.Text>{feasibilityStudy?.offtaker ?? "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "dokumen_pendukung",
      label: "Dokumen Pendukung",
      children: <Typography.Text>{feasibilityStudy?.dokumen_pendukung ?? "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "keterangan",
      label: "Keterangan",
      children: <Typography.Text>{feasibilityStudy?.keterangan ?? "-"}</Typography.Text>,
      span: 2,
    },
  ];

  const statusItems = [
    {
      key: "status",
      label: "Status",
      children: <Tag color={getStatusColor(feasibilityStudy?.status)} style={{ border: 'none' }}>{feasibilityStudy?.status}</Tag>,
    },
    {
      key: "last_sync_date",
      label: "Last Sync Date",
      children: <Typography.Text>{formatDate(feasibilityStudy?.last_sync_date) ?? "-"}</Typography.Text>,
    },
    {
      key: "business_initiative_name",
      label: "Business Initiative Name",
      children: <Typography.Text>{feasibilityStudy?.business_initiative_name ?? "-"}</Typography.Text>,
    },
  ];

  const approverViewerItems = [
    {
      key: "perusahaan",
      label: "Perusahaan",
      children: <Typography.Text strong>{feasibilityStudy?.status === "Assign" ? (feasibilityStudy?.company ?? "-") : "-"}</Typography.Text>,
    },
    {
      key: "tim_project",
      label: "Tim Project",
      children: <Typography.Text strong>{feasibilityStudy?.status === "Assign" ? (feasibilityStudy?.tim_project ?? "-") : "-"}</Typography.Text>,
    },
    {
      key: "approver_pmo_ah",
      label: "Approver PMO AH",
      children: <Typography.Text>{feasibilityStudy?.status === "Assign" ? (feasibilityStudy?.approver_pmo_ah ? feasibilityStudy.approver_pmo_ah.join(", ") : "-") : "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "approver_pmo_mind_id",
      label: "Approver PMO Mind ID",
      children: <Typography.Text>{feasibilityStudy?.status === "Assign" ? (feasibilityStudy?.approver_pmo_mind_id ? feasibilityStudy.approver_pmo_mind_id.join(", ") : "-") : "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "viewer",
      label: "Viewer",
      children: <Typography.Text>{feasibilityStudy?.status === "Assign" ? (feasibilityStudy?.viewer ? feasibilityStudy.viewer.join(", ") : "-") : "-"}</Typography.Text>,
      span: 2,
    },
  ];

  return (
    <Page
      topActions={
        feasibilityStudy?.status !== "Assign" ? (
          <Flex gap={10}>
            <Link to={`/master-data/feasibility-studies/${params.id}/add-approver-viewer`}>
              <Button
                icon={<UserAddOutlined />}
                type="primary"
              >
                Tambah Approver & Viewer
              </Button>
            </Link>
          </Flex>
        ) : null
      }
      title={`Feasibility Study Details: ${feasibilityStudy?.investment_name || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/feasibility-studies")}
      noStyle
    >
      <Section loading={false}>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Section title="Approver & Viewer Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={approverViewerItems}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>
          
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
            />
          </Section>
          
          <Section title="Financial Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={financialItems}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>

          <Section title="Project Details">
            <Descriptions
              bordered
              layout="horizontal"
              items={projectDetailsItems}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>

          <Section title="Status Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={statusItems}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
