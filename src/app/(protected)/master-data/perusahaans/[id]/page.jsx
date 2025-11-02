import { Page, Section } from "admiral";
import { Space, Button, Descriptions, Flex, message, Tag, Modal } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";

import { formatDate } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { perusahaanDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(perusahaanDetail(params.id));

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Perusahaan",
      path: "/master-data/perusahaans",
    },
    {
      label: `Perusahaan Details: ${data?.data?.nama_perusahaan || ""}`,
      path: "#",
    },
  ];

  const items = [
    {
      key: "nama_perusahaan",
      label: "Nama Perusahaan",
      children: <Typography.Text strong>{data?.data?.nama_perusahaan ?? "-"}</Typography.Text>,
    },
    {
      key: "alamat_perusahaan",
      label: "Alamat Perusahaan",
      children: <Typography.Text strong>{data?.data?.alamat_perusahaan ?? "-"}</Typography.Text>,
      span: 2,
    },
    {
      key: "email",
      label: "Email",
      children: <Typography.Text strong>{data?.data?.email ?? "-"}</Typography.Text>,
    },
    {
      key: "no_telepon",
      label: "No. Telepon",
      children: <Typography.Text strong>{data?.data?.no_telepon ?? "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: (
        <Tag color={data?.data?.status === "Active" ? "green" : "red"} style={{ border: 'none' }}>
          {data?.data?.status ?? "-"}
        </Tag>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.created_at) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.updated_at) ?? "-"}</Typography.Text>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              Modal.confirm({
                title: 'Confirm Delete',
                content: `Are you sure you want to delete ${data?.data?.nama_perusahaan}?`,
                okText: 'Delete',
                cancelText: 'Cancel',
                okType: 'danger',
                onOk() {
                  message.success("Perusahaan successfully deleted");
                  navigate("/master-data/perusahaans");
                },
              });
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/master-data/perusahaans/:id/update", {
              id: params.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Perusahaan Details: ${data?.data?.nama_perusahaan || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/perusahaans")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Company Information">
          <Descriptions
            bordered
            layout="horizontal"
            items={items}
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
