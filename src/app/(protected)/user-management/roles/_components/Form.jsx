import React from "react";
import { Form, Input, Switch, Button, Checkbox, Row, Col, Flex } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";

const RoleForm = ({ initialValues, onSubmit, loading, isEdit }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Sample menu data for permissions
  const menuPermissions = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'user-management', label: 'User Management' },
    { key: 'master-data', label: 'Master Data' },
    { key: 'projects', label: 'Projects' },
    { key: 'messaging', label: 'Messaging' },
    { key: 'laporan', label: 'Laporan' },
  ];

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    navigate("/user-management/roles");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Section>
        <Section title="Role Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nama Role"
                name="nama_role"
                rules={[
                  { required: true, message: "Nama role harus diisi!" },
                  { whitespace: true, message: "Nama role tidak boleh kosong!" },
                ]}
              >
                <Input placeholder="Masukkan nama role" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        <Section title="Permission" style={{ marginTop: 24 }}>
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
                      <Form.Item 
                        name={['permissions', menu.key, 'create']} 
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Create</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item 
                        name={['permissions', menu.key, 'list']} 
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>List</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item 
                        name={['permissions', menu.key, 'detail']} 
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Detail</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item 
                        name={['permissions', menu.key, 'edit']} 
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Edit</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item 
                        name={['permissions', menu.key, 'delete']} 
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Delete</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};

export default RoleForm;
