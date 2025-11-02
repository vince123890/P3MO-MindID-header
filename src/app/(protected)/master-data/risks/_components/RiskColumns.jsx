import { Button, Flex, Modal, message, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { urlParser } from "@/utils/url-parser";

export const getRiskColumns = (onDelete) => [
  {
    dataIndex: "kode_issue_risk",
    key: "kode_issue_risk",
    title: "Kode Resiko",
    sorter: true,
    render: (_, record) => (
      <Link to={record.id}>
        <u>{record.kode_issue_risk}</u>
      </Link>
    ),
  },
  {
    dataIndex: "tipe_issue_risk",
    title: "Tipe Resiko",
    key: "tipe_issue_risk",
    sorter: true,
  },
  {
    dataIndex: "status",
    title: "Status",
    key: "status",
    sorter: true,
    render: (_, record) => {
      const color = record.status === "Active" ? "green" : "red";
      return <Tag color={color} style={{ border: 'none' }}>{record.status}</Tag>;
    },
  },
  {
    dataIndex: "Action",
    title: "Action",
    key: "Action",
    render: (_, record) => {
      return (
        <Link
          to={urlParser("/master-data/risks/:id/update", {
            id: record.id,
          })}
        >
          <Button type="link" icon={<EditOutlined />} />
        </Link>
      );
    },
  },
];
