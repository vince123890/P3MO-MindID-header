import React from "react";
import { Page, Section } from "admiral";
import { Button, Tag, Row, Col, Space, Typography, Descriptions } from "antd";
import { useNavigate, useParams } from "react-router";
import { CheckOutlined } from "@ant-design/icons";
import { useGetData } from "@/app/_hooks/use-get-data";
import { detailRole } from "../../_data";

const RoleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGetData(detailRole(id));

  const renderStatusTag = (status) => {
    if (!status || status === "-") {
      return <span>-</span>;
    }
    const color = status === "Active" ? "#52c41a" : "#ff4d4f";
    const backgroundColor = status === "Active" ? "#f6ffed" : "#fff2f0";
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{status}</Tag>;
  };

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management",
    },
    {
      label: "Daftar Role",
      path: "/user-management/roles",
    },
    {
      label: `Role Details: ${data?.data?.nama_role ?? "-"}`,
      path: `/user-management/roles/${id}`,
    },
  ];

  if (loading) {
    return (
      <Page
        title="Role Details"
        breadcrumbs={breadcrumbs}
        loading={true}
      />
    );
  }

  if (!data?.data) {
    return (
      <Page
        title="Role Details"
        breadcrumbs={breadcrumbs}
      >
        <Section>
          <p>Role tidak ditemukan</p>
        </Section>
      </Page>
    );
  }

  const role = data.data;

  // Sample menu data for permissions - matching the form structure
  const menuPermissions = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'user-management', label: 'User Management' },
    { key: 'master-data', label: 'Master Data' },
    { key: 'projects', label: 'Projects' },
    { key: 'messaging', label: 'Messaging' },
    { key: 'laporan', label: 'Laporan' },
  ];

  const items = [
    {
      key: "nama_role",
      label: "Nama Role",
      children: <Typography.Text strong>{role.nama_role || "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: role.status ? renderStatusTag(role.status) : "-",
    },
    {
      key: "created_at",
      label: "Created At",
      children: <Typography.Text strong>{role.created_at || "-"}</Typography.Text>,
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: <Typography.Text strong>{role.updated_at || "-"}</Typography.Text>,
    },
  ];

  return (
    <Page
      title={`Role Details: ${role.nama_role}`}
      breadcrumbs={breadcrumbs}
      noStyle
      goBack={() => navigate("/user-management/roles")}
      topActions={
        <Button 
          type="primary" 
          onClick={() => navigate(`/user-management/roles/${id}/update`)}
        >
          Edit
        </Button>
      }
    >
      <Section loading={loading}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section title="Role Information">
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

          <Section title="Permission">
            <Row gutter={[16, 16]}>
              {menuPermissions.map((menu) => (
                <Col span={24} key={menu.key}>
                  <div style={{ 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '6px', 
                    padding: '12px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      {menu.label}
                    </div>
                    <Row gutter={16}>
                      <Col span={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            border: '1.5px solid #d9d9d9', 
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: role.permissions?.[menu.key]?.create ? '#f5f5f5' : '#fff'
                          }}>
                            {role.permissions?.[menu.key]?.create && (
                              <CheckOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />
                            )}
                          </div>
                          <span style={{ color: '#8c8c8c' }}>Create</span>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            border: '1.5px solid #d9d9d9', 
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: role.permissions?.[menu.key]?.list ? '#f5f5f5' : '#fff'
                          }}>
                            {role.permissions?.[menu.key]?.list && (
                              <CheckOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />
                            )}
                          </div>
                          <span style={{ color: '#8c8c8c' }}>List</span>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            border: '1.5px solid #d9d9d9', 
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: role.permissions?.[menu.key]?.detail ? '#f5f5f5' : '#fff'
                          }}>
                            {role.permissions?.[menu.key]?.detail && (
                              <CheckOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />
                            )}
                          </div>
                          <span style={{ color: '#8c8c8c' }}>Detail</span>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            border: '1.5px solid #d9d9d9', 
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: role.permissions?.[menu.key]?.edit ? '#f5f5f5' : '#fff'
                          }}>
                            {role.permissions?.[menu.key]?.edit && (
                              <CheckOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />
                            )}
                          </div>
                          <span style={{ color: '#8c8c8c' }}>Edit</span>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            border: '1.5px solid #d9d9d9', 
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: role.permissions?.[menu.key]?.delete ? '#f5f5f5' : '#fff'
                          }}>
                            {role.permissions?.[menu.key]?.delete && (
                              <CheckOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />
                            )}
                          </div>
                          <span style={{ color: '#8c8c8c' }}>Delete</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default RoleDetailPage;
