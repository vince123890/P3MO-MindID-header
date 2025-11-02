import { Form, Input, Switch, Button, Select, Row, Col, Flex } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";

const { Option } = Select;

const issueTypeOptions = [
  "Technical Issue",
  "Budget Issue", 
  "Schedule Issue",
  "Resource Issue",
  "Quality Issue",
  "Scope Issue",
  "Communication Issue",
  "Stakeholder Issue",
  "External Issue",
  "Compliance Issue"
];

export const IssueForm = ({ initialValues, onSubmit, loading, onCancel }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      status: values.status ? "Active" : "Inactive",
    };
    onSubmit(formattedValues);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/master-data/issues");
    }
  };

  const isUpdate = initialValues && (initialValues.kode_issue || initialValues.tipe_issue) && !initialValues.statusOnly;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialValues,
        status: initialValues?.status === "Active",
      }}
    >
      <Section>
        <Section title="Issue Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Kode Issue"
                name="kode_issue"
                rules={[{ required: true, message: "Please input kode issue!" }]}
              >
                <Input placeholder="Enter kode issue" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tipe Issue"
                name="tipe_issue"
                rules={[{ required: true, message: "Please select tipe issue!" }]}
              >
                <Select placeholder="Select tipe issue">
                  {issueTypeOptions.map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isUpdate ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};

export default IssueForm;
