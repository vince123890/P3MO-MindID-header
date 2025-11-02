import { Button, Col, Form, Input, Row, Switch } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const FormPerusahaan = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Company Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nama Perusahaan"
                name="nama_perusahaan"
                rules={[
                  {
                    required: true,
                    message: "Nama perusahaan is required",
                  },
                ]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="No. Telepon"
                name="no_telepon"
                rules={[
                  {
                    required: true,
                    message: "No. telepon is required",
                  },
                  {
                    pattern: /^[0-9\-\+\s\(\)]+$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Status is required",
                  },
                ]}
                valuePropName="checked"
                normalize={(value) => value ? "Active" : "Inactive"}
                getValueProps={(value) => ({ checked: value === "Active" })}
              >
                <Switch 
                  checkedChildren="Active" 
                  unCheckedChildren="Inactive"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Alamat Perusahaan"
                name="alamat_perusahaan"
                rules={[
                  {
                    required: true,
                    message: "Alamat perusahaan is required",
                  },
                ]}
              >
                <Input.TextArea 
                  placeholder="Enter company address" 
                  rows={3}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/master-data/perusahaans")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
