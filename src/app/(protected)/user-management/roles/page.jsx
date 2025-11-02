import React, { useState } from "react";
import {
  Tag,
  Button,
  message,
} from "antd";
import { Link, useNavigate } from "react-router";
import { SearchOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Page, DataTable } from "admiral";
import { listRoles } from "../_data";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { makeSource } from "@/utils/data-table";
import { useGetData } from "@/app/_hooks/use-get-data";

const RolesPage = () => {
  const { handleChange, filters } = useFilter();
  const rolesData = useGetData(listRoles);
  const [roles, setRoles] = useState(listRoles.data.items);
  const navigate = useNavigate();

  const renderStatusTag = (status) => {
    if (!status || status === "-") {
      return <span>-</span>;
    }
    const color = status === "Active" ? "#52c41a" : "#ff4d4f";
    const backgroundColor = status === "Active" ? "#f6ffed" : "#fff2f0";
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{status}</Tag>;
  };

  const renderActionButtons = (record) => {
    return (
      <Button 
        type="text" 
        icon={<EditOutlined />} 
        onClick={() => {
          // Navigate to edit page
          navigate(`/user-management/roles/${record.id}/update`);
        }}
      />
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
      title: "Nama Role",
      dataIndex: "nama_role",
      key: "nama_role",
      sorter: true,
      render: (text, record) => (
        <Link to={`/user-management/roles/${record.id}`} style={{ color: '#1677ff' }}>
          <u>{text}</u>
        </Link>
      ),
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
      path: "/user-management/roles",
    },
    {
      label: "Daftar Role",
      path: "/user-management/roles",
    },
  ];

  return (
    <Page
      title="Daftar Role"
      breadcrumbs={breadcrumbs}
      noStyle
      topActions={
        <Link to="/user-management/roles/create">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
          >
            Tambah Role
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
        source={makeSource({ data: { items: roles } })}
        onChange={handleChange}
        loading={rolesData.loading}
        filterComponents={filterComponents}
        showRowSelection={false}
      />
    </Page>
  );
};

export default RolesPage;
