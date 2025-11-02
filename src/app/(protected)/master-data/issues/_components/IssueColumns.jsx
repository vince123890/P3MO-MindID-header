import { Link } from "react-router";
import { Button, Flex } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { urlParser } from "@/utils/url-parser";
import { Modal, message } from "antd";

export const getIssueColumns = (filters) => [
  {
    dataIndex: "kode_issue",
    key: "kode_issue",
    title: "Kode Issue",
    sorter: true,
    render: (_, record) => (
      <Link to={record.id}>
        <u>{record.kode_issue}</u>
      </Link>
    ),
  },
  {
    dataIndex: "tipe_issue",
    title: "Tipe Issue",
    key: "tipe_issue",
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
          to={urlParser("/master-data/issues/:id/update", {
            id: record.id,
          })}
        >
          <Button type="link" icon={<EditOutlined />} />
        </Link>
      );
    },
  },
];

export const getIssueActions = () => [
  {
    key: "delete",
    label: "Delete",
    onClick: (_values, cb) => {
      Modal.confirm({
        title: "Konfirmasi Hapus",
        content: "Apakah Anda yakin ingin menghapus Issue yang dipilih?",
        okText: "Delete",
        cancelText: "Cancel",
        okType: "danger",
        onOk: () => {
          message.success("Selected issues successfully deleted");
          cb.reset();
        },
      });
    },
    danger: true,
    icon: <DeleteOutlined />,
  },
];
