import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

const roleOptions = [
  {
    label: "Administrator",
    value: "Administrator",
  },
  {
    label: "PMO Admin",
    value: "PMO Admin",
  },
  {
    label: "PMO MIND ID",
    value: "PMO MIND ID",
  },
  {
    label: "Direktur MIND ID",
    value: "Direktur MIND ID",
  },
  {
    label: "Tim Proyek",
    value: "Tim Proyek",
  },
];

const perusahaanOptions = [
  {
    label: "PT Aneka Tambang Tbk",
    value: "PT Aneka Tambang Tbk",
  },
  {
    label: "PT Bukit Asam Tbk",
    value: "PT Bukit Asam Tbk",
  },
  {
    label: "PT Freeport Indonesia",
    value: "PT Freeport Indonesia",
  },
  {
    label: "PT Indonesia Asahan Aluminium",
    value: "PT Indonesia Asahan Aluminium",
  },
  {
    label: "PT Timah Tbk",
    value: "PT Timah Tbk",
  },
  {
    label: "PT MIND ID",
    value: "PT MIND ID",
  },
];

export const FormUser = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Set form values when initialValues are provided
  useEffect(() => {
    if (formProps?.initialValues) {
      form.setFieldsValue(formProps.initialValues);
    }
  }, [formProps?.initialValues, form]);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="User Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="NIP"
                name="nip"
                rules={[
                  {
                    required: true,
                    message: "NIP is required",
                  },
                ]}
              >
                <Input placeholder="Enter NIP" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nama User"
                name="nama_user"
                rules={[
                  {
                    required: true,
                    message: "Nama User is required",
                  },
                ]}
              >
                <Input placeholder="Enter nama user" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Username is required",
                  },
                ]}
              >
                <Input placeholder="Enter username" />
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
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Perusahaan"
                name="perusahaan"
                rules={[
                  {
                    required: true,
                    message: "Perusahaan is required",
                  },
                ]}
              >
                <Select placeholder="Select perusahaan" options={perusahaanOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Role is required",
                  },
                ]}
              >
                <Select placeholder="Select role" options={roleOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Jabatan"
                name="jabatan"
                rules={[
                  {
                    required: true,
                    message: "Jabatan is required",
                  },
                ]}
              >
                <Input placeholder="Enter jabatan" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fungsi"
                name="fungsi"
                rules={[
                  {
                    required: true,
                    message: "Fungsi is required",
                  },
                ]}
              >
                <Input placeholder="Enter fungsi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="No HP"
                name="no_hp"
                rules={[
                  {
                    required: true,
                    message: "No HP is required",
                  },
                ]}
              >
                <Input placeholder="Enter no HP" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/user-management/users")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
