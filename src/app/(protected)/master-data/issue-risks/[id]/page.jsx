import { Page, Section } from "admiral";
import { Space, Button, Descriptions, Flex, message, Tag, Modal } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";

import { formatDate } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { issueRiskDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(issueRiskDetail(params.id));

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issue",
      path: "/master-data/issue-risks",
    },
    {
      label: `Issue Details: ${data?.data?.kode_issue_risk || ""} - ${data?.data?.tipe_issue_risk || ""}`,
      path: "#",
    },
  ];

  const items = [
    {
      key: "kode_issue_risk",
      label: "Kode Issue",
      children: <Typography.Text strong>{data?.data?.kode_issue_risk ?? "-"}</Typography.Text>,
    },
    {
      key: "tipe_issue_risk",
      label: "Tipe Issue",
      children: (
        <Typography.Text strong>{data?.data?.tipe_issue_risk ?? "-"}</Typography.Text>
      ),
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
                title: "Konfirmasi Hapus",
                content: "Apakah Anda yakin ingin menghapus Issue/Risk ini?",
                okText: "Delete",
                cancelText: "Cancel",
                okType: "danger",
                onOk: () => {
                  message.success("Issue/Risk successfully deleted");
                  navigate("/master-data/issue-risks");
                },
              });
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/master-data/issue-risks/:id/update", {
              id: params.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Issue Details: ${data?.data?.kode_issue_risk || ""} - ${data?.data?.tipe_issue_risk || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/issue-risks")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Issue Information">
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
