import { Tag } from "antd";
import { formatDate } from "@/utils/date-format";

export const getIssueDetailItems = (data) => [
  {
    label: "Kode Issue",
    children: data?.kode_issue || "-",
  },
  {
    label: "Tipe Issue",
    children: data?.tipe_issue || "-",
  },
  {
    label: "Status",
    children: (
      <Tag color={data?.status === "Active" ? "green" : "red"} style={{ border: 'none' }}>
        {data?.status || "-"}
      </Tag>
    ),
  },
  {
    label: "Created At",
    children: formatDate(data?.created_at) || "-",
  },
  {
    label: "Updated At",
    children: formatDate(data?.updated_at) || "-",
  },
];
