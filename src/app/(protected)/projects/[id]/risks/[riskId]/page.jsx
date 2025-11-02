import { useParams, useNavigate } from "react-router";
import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, Tag, message, Modal, Space } from "antd";
import { generatePath, Link } from "react-router";
import { Typography } from "antd";

import { RiskForm } from "@/app/(protected)/projects/_components/risk-form.jsx";
import { getRiskById } from "@/app/(protected)/projects/_data/risks";
import { formatDate } from "@/utils/date-format";
import dayjs from "dayjs";

export const Component = () => {
  const { id, riskId } = useParams();
  const navigate = useNavigate();

  const riskData = getRiskById(riskId);

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
      label: `Risk Details: ${riskData?.data?.nomor_resiko || riskId}`,
      path: `/projects/${id}/risks/${riskId}`,
    },
  ];

  if (!riskData.data) {
    return (
      <Page
        title="Risk Not Found"
        breadcrumbs={breadcrumbs}
      >
        <div>Risk not found</div>
      </Page>
    );
  }

  const handleDelete = () => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus data risk ini?",
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        message.success("Risk successfully deleted");
        navigate(`/projects/${id}`);
      },
    });
  };

  const items = [
    {
      key: "nomor_resiko",
      label: "Nomor Resiko",
      children: <Typography.Text strong>{riskData?.data?.nomor_resiko ?? "-"}</Typography.Text>,
    },
    {
      key: "kategori_resiko",
      label: "Kategori Resiko",
      children: (
        <Tag color={
          riskData?.data?.kategori_resiko === "Technical" ? "blue" :
          riskData?.data?.kategori_resiko === "Financial" ? "gold" :
          riskData?.data?.kategori_resiko === "Operational" ? "orange" :
          riskData?.data?.kategori_resiko === "Environmental" ? "green" :
          riskData?.data?.kategori_resiko === "Safety" ? "red" :
          riskData?.data?.kategori_resiko === "Regulatory" ? "cyan" :
          riskData?.data?.kategori_resiko === "Strategic" ? "purple" :
          "default"
        } style={{ border: 'none' }}>
          {riskData?.data?.kategori_resiko ?? "-"}
        </Tag>
      ),
    },
    {
      key: "tanggal_identifikasi_resiko",
      label: "Tanggal Identifikasi Resiko",
      children: (
        <Typography.Text strong>{formatDate(riskData?.data?.tanggal_identifikasi_resiko) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "probabilitas_resiko",
      label: "Probabilitas Resiko",
      children: <Typography.Text strong>{riskData?.data?.probabilitas_resiko ?? "-"}</Typography.Text>,
    },
    {
      key: "deskripsi_resiko",
      label: "Deskripsi Resiko",
      children: <Typography.Text strong>{riskData?.data?.deskripsi_resiko ?? "-"}</Typography.Text>,
    },
    {
      key: "dampak_resiko",
      label: "Dampak Resiko",
      children: <Typography.Text strong>{riskData?.data?.dampak_resiko ?? "-"}</Typography.Text>,
    },
    {
      key: "tingkat_dampak",
      label: "Tingkat Dampak",
      children: <Typography.Text strong>{riskData?.data?.tingkat_dampak ?? "-"}</Typography.Text>,
    },
    {
      key: "skor_resiko",
      label: "Skor Resiko",
      children: <Typography.Text strong>{riskData?.data?.skor_resiko ? `${riskData.data.skor_resiko}/10` : "-"}</Typography.Text>,
    },
    {
      key: "prioritas_resiko",
      label: "Prioritas Resiko",
      children: (
        <Tag color={
          riskData?.data?.prioritas_resiko === "Critical" ? "red" :
          riskData?.data?.prioritas_resiko === "High" ? "orange" :
          riskData?.data?.prioritas_resiko === "Medium" ? "gold" :
          riskData?.data?.prioritas_resiko === "Low" ? "green" :
          "default"
        } style={{ border: 'none' }}>
          {riskData?.data?.prioritas_resiko ?? "-"}
        </Tag>
      ),
    },
    {
      key: "rencana_mitigasi",
      label: "Rencana Mitigasi",
      children: <Typography.Text strong>{riskData?.data?.rencana_mitigasi ?? "-"}</Typography.Text>,
    },
    {
      key: "status_mitigasi",
      label: "Status Mitigasi",
      children: (
        <Tag color={
          riskData?.data?.status_mitigasi === "Open" ? "red" :
          riskData?.data?.status_mitigasi === "In Progress" ? "blue" :
          riskData?.data?.status_mitigasi === "Completed" ? "green" :
          riskData?.data?.status_mitigasi === "On Hold" ? "orange" :
          "default"
        } style={{ border: 'none' }}>
          {riskData?.data?.status_mitigasi ?? "-"}
        </Tag>
      ),
    },
    {
      key: "deadline_mitigasi",
      label: "Deadline Mitigasi",
      children: (
        <Typography.Text strong>{formatDate(riskData?.data?.deadline_mitigasi) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "update_mitigasi",
      label: "Update Mitigasi",
      children: <Typography.Text strong>{riskData?.data?.update_mitigasi ?? "-"}</Typography.Text>,
    },
    {
      key: "tanggal_update_terkini",
      label: "Tanggal Update Terkini",
      children: (
        <Typography.Text strong>{formatDate(riskData?.data?.tanggal_update_terkini) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "pic",
      label: "PIC",
      children: <Typography.Text strong>{riskData?.data?.pic ?? "-"}</Typography.Text>,
    },
    {
      key: "keterangan",
      label: "Keterangan",
      children: <Typography.Text strong>{riskData?.data?.keterangan ?? "-"}</Typography.Text>,
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>{formatDate(riskData?.data?.created_at) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>{formatDate(riskData?.data?.updated_at) ?? "-"}</Typography.Text>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={handleDelete}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/projects/:id/risks/:riskId/update", {
              id: id,
              riskId: riskId,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Risk Details: ${riskData?.data?.nomor_resiko || riskId}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate(`/projects/${id}`)}
      noStyle
    >
      <Section>
        {/* Risk Identification Section */}
        <Section title="Risk Identification">
          <Descriptions
            bordered
            layout="horizontal"
            items={items.filter(item => [
              "nomor_resiko", 
              "kategori_resiko", 
              "tanggal_identifikasi_resiko", 
              "probabilitas_resiko"
            ].includes(item.key))}
            column={{
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
          />
        </Section>

        {/* Risk Description Section */}
        <Section title="Risk Description">
          <Descriptions
            bordered
            layout="horizontal"
            items={items.filter(item => [
              "deskripsi_resiko", 
              "dampak_resiko", 
              "tingkat_dampak", 
              "skor_resiko", 
              "prioritas_resiko"
            ].includes(item.key))}
            column={{
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
          />
        </Section>

        {/* Mitigation & Update Summary Section */}
        <Section title="Mitigation & Update Summary">
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '6px', 
            padding: '16px',
            backgroundColor: '#fafafa'
          }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Mitigation Plan Information */}
              <div>
                <Typography.Text strong style={{ marginBottom: '8px', display: 'block' }}>
                  Mitigation Plan
                </Typography.Text>
                <Descriptions
                  bordered
                  layout="horizontal"
                  items={items.filter(item => [
                    "rencana_mitigasi", 
                    "status_mitigasi", 
                    "deadline_mitigasi"
                  ].includes(item.key))}
                  column={{
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                />
              </div>

              {/* Update Information */}
              <div>
                <Typography.Text strong style={{ marginBottom: '8px', display: 'block' }}>
                  Update Information
                </Typography.Text>
                <Descriptions
                  bordered
                  layout="horizontal"
                  items={items.filter(item => [
                    "update_mitigasi", 
                    "tanggal_update_terkini", 
                    "pic", 
                    "keterangan"
                  ].includes(item.key))}
                  column={{
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                />
              </div>
            </Space>
          </div>
        </Section>

        {/* System Information Section */}
        <Section title="System Information">
          <Descriptions
            bordered
            layout="horizontal"
            items={items.filter(item => [
              "created_at", 
              "updated_at"
            ].includes(item.key))}
            column={{
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
          />
        </Section>
      </Section>
    </Page>
  );
};

export default Component;
