import { Typography, Tag } from "antd";
import { formatDate } from "@/utils/date-format";

export const getRiskDetailItems = (data) => [
  {
    key: "kode_resiko",
    label: "Kode Resiko",
    children: <Typography.Text strong>{data?.data?.kode_issue_risk ?? "-"}</Typography.Text>,
  },
  {
    key: "tipe_resiko",
    label: "Tipe Resiko",
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
