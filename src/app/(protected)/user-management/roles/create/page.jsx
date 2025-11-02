import React, { useState } from "react";
import { message } from "antd";
import { Page, Section } from "admiral";
import { useNavigate } from "react-router";
import RoleForm from "../_components/Form";
import { listRoles } from "../../_data";

const CreateRolePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new role object
      const newRole = {
        id: listRoles.data.items.length + 1,
        nama_role: values.nama_role,
        status: values.status ? "Active" : "Inactive",
        created_at: new Date().toLocaleDateString('id-ID'),
        updated_at: new Date().toLocaleDateString('id-ID'),
      };
      
      // In a real application, this would be an API call
      listRoles.data.items.push(newRole);
      
      message.success("Role berhasil dibuat");
      navigate("/user-management/roles");
    } catch (error) {
      message.error("Gagal membuat role");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management/roles",
    },
    {
      label: "Daftar Role",
      path: "/user-management/roles",
    },
    {
      label: "Tambah Role",
      path: "/user-management/roles/create",
    },
  ];

  return (
    <Page
      title="Tambah Role"
      breadcrumbs={breadcrumbs}
      noStyle
      goBack={() => navigate("/user-management/roles")}
    >
      <RoleForm 
        onSubmit={handleSubmit} 
        loading={loading}
      />
    </Page>
  );
};

export default CreateRolePage;
