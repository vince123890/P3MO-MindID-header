import React, { useState } from "react";
import {
  Button,
  Modal,
  message,
  Tag,
} from "antd";
import { Link } from "react-router";
import { SearchOutlined, PlusOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined, StopOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Page, DataTable } from "admiral";
import { listUsers } from "@protected/user-management/_data";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { makeSource } from "@/utils/data-table";
import { useGetData } from "@/app/_hooks/use-get-data";

const UsersPage = () => {
  const { handleChange, filters } = useFilter();
  const usersData = useGetData(listUsers);
  const [users, setUsers] = useState(listUsers.data.items);

  const renderStatusTag = (status) => {
    if (!status || status === "-") {
      return <span>-</span>;
    }
    const color = status === "Active" ? "#52c41a" : "#ff4d4f";
    const backgroundColor = status === "Active" ? "#f6ffed" : "#fff2f0";
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{status}</Tag>;
  };

  const handleApprove = (record) => {
    Modal.confirm({
      title: "Approve User",
      content: "Are you sure you want to approve this user?",
      okText: "Approve",
      cancelText: "Cancel",
      onOk: () => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === record.id 
              ? { ...user, status: "Active" }
              : user
          )
        );
        message.success("User approved successfully");
      },
    });
  };

  const handleReject = (record) => {
    Modal.confirm({
      title: "Reject User",
      content: "Are you sure you want to reject this user? This action cannot be undone.",
      okText: "Reject",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== record.id));
        message.success("User rejected successfully");
      },
    });
  };

  const handleToggleStatus = (record) => {
    const newStatus = record.status === "Active" ? "Inactive" : "Active";
    const actionText = newStatus === "Active" ? "activate" : "set to inactive";
    const actionTitle = newStatus === "Active" ? "Activate" : "Set to Inactive";
    
    Modal.confirm({
      title: `${actionTitle} User`,
      content: `Are you sure you want to ${actionText} this user?`,
      okText: actionTitle,
      cancelText: "Cancel",
      okType: newStatus === "Inactive" ? "danger" : "primary",
      onOk: () => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === record.id 
              ? { ...user, status: newStatus }
              : user
          )
        );
        message.success(`User ${newStatus === "Active" ? "activated" : "set to inactive"} successfully`);
      },
    });
  };

  const renderActionButtons = (record) => {
    if (!record.status || record.status === "-") {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="text" 
            icon={<CheckCircleOutlined />} 
            onClick={() => handleApprove(record)}
            style={{ color: '#52c41a' }}
          />
          <Button 
            type="text" 
            icon={<CloseCircleOutlined />} 
            onClick={() => handleReject(record)}
            style={{ color: '#ff4d4f' }}
          />
        </div>
      );
    }
    
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to={`/user-management/users/${record.id}/update`}>
          <Button 
            type="text" 
            icon={<EditOutlined />}
          />
        </Link>
        <Button 
          type="text" 
          icon={record.status === "Active" ? <StopOutlined /> : <PlayCircleOutlined />}
          onClick={() => handleToggleStatus(record)}
          style={{ 
            color: record.status === "Active" ? '#ff4d4f' : '#52c41a'
          }}
          title={record.status === "Active" ? "Set to Inactive" : "Activate User"}
        />
      </div>
    );
  };

  const filterComponents = [
    {
      label: "Status",
      name: "status",
      type: "Select",
      placeholder: "Select status",
      defaultValue: filters.status,
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
    },
  ];

  const columns = [
    {
      title: "Nama User",
      dataIndex: "nama_user",
      key: "nama_user",
      sorter: true,
      render: (text, record) => (
        <Link to={`/user-management/users/${record.id}`} style={{ color: '#1677ff' }}>
          <u>{text}</u>
        </Link>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => renderStatusTag(text),
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => renderActionButtons(record),
    },
  ];

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management/users",
    },
    {
      label: "Daftar User",
      path: "/user-management/users",
    },
  ];

  return (
    <Page
      title="Daftar User"
      breadcrumbs={breadcrumbs}
      noStyle
      topActions={
        <Link to="/user-management/users/create">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
          >
            Tambah User
          </Button>
        </Link>
      }
    >
      <DataTable
        search={filters.search}
        searchPlaceholder="Search..."
        searchIcon={<SearchOutlined />}
        rowKey="id"
        columns={columns}
        source={makeSource({ data: { items: users } })}
        onChange={handleChange}
        loading={usersData.loading}
        filterComponents={filterComponents}
        showRowSelection={false}
        pageSize={20}
      />
    </Page>
  );
};

export default UsersPage;
