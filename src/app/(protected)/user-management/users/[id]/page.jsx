import React from "react";
import { Tag, Descriptions, Typography, Space, Button, Flex, message, Modal, Table } from "antd";
import { useParams, useNavigate, Link } from "react-router";
import { generatePath } from "react-router";
import { Page, Section } from "admiral";
import { detailUser, userLoginHistory } from "@protected/user-management/_data";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = String(id || "");
  const user = detailUser(userId)?.data || {};

  const renderStatusTag = (status) => {
    const color = status === "Active" ? "#52c41a" : "#ff4d4f";
    const backgroundColor = status === "Active" ? "#f6ffed" : "#fff2f0";
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{status}</Tag>;
  };

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management/users",
    },
    {
      label: "Daftar User",
      path: "/user-management/users",
    },
    {
      label: user.nama_user || "",
      path: "#",
    },
  ];

  const items = [
    {
      key: "nip",
      label: "NIP",
      children: <Typography.Text strong>{user.nip || "-"}</Typography.Text>,
    },
    {
      key: "nama_user",
      label: "Nama User",
      children: <Typography.Text strong>{user.nama_user || "-"}</Typography.Text>,
    },
    {
      key: "username",
      label: "Username",
      children: <Typography.Text strong>{user.username || "-"}</Typography.Text>,
    },
    {
      key: "email",
      label: "Email",
      children: <Typography.Text strong>{user.email || "-"}</Typography.Text>,
    },
    {
      key: "perusahaan",
      label: "Perusahaan",
      children: <Typography.Text strong>{user.perusahaan || "-"}</Typography.Text>,
    },
    {
      key: "role",
      label: "Role",
      children: <Typography.Text strong>{user.role || "-"}</Typography.Text>,
    },
    {
      key: "jabatan",
      label: "Jabatan",
      children: <Typography.Text strong>{user.jabatan || "-"}</Typography.Text>,
    },
    {
      key: "fungsi",
      label: "Fungsi",
      children: <Typography.Text strong>{user.fungsi || "-"}</Typography.Text>,
    },
    {
      key: "no_hp",
      label: "No HP",
      children: <Typography.Text strong>{user.no_hp || "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: user.status ? renderStatusTag(user.status) : "-",
    },
    {
      key: "created_at",
      label: "Created At",
      children: <Typography.Text strong>{user.created_at || "-"}</Typography.Text>,
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: <Typography.Text strong>{user.updated_at || "-"}</Typography.Text>,
    },
  ];

  const loginHistoryColumns = [
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      key: "updated_date",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
  ];

  const loginHistory = userLoginHistory(userId)?.data?.items || [];

  const handleDelete = () => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus data user ini?",
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        message.success("User successfully deleted");
        navigate("/user-management/users");
      },
    });
  };

  return (
    <Page
      title={`Detail User: ${user.nama_user || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/user-management/users")}
      noStyle
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
            to={generatePath("/user-management/users/:id/update", {
              id: id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
    >
      <Section>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Section title="User Information">
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
          <Section title="History Login">
            <Table
              columns={loginHistoryColumns}
              dataSource={loginHistory}
              rowKey="id"
              pagination={false}
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default UserDetailPage;
