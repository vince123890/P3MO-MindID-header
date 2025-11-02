import { Form, Input, Switch, Button, Select, Row, Col, Flex } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";

const { Option } = Select;

const riskTypeOptions = [
  "Technical Risk",
  "Budget Risk", 
  "Schedule Risk",
  "Resource Risk",
  "Quality Issue",
  "Scope Issue",
  "Communication Risk",
  "Stakeholder Risk",
  "External Risk",
  "Compliance Issue"
];

export const RiskForm = ({ initialValues, onSubmit, loading, onCancel }) => {
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
      navigate("/master-data/risks");
    }
  };

  const isUpdate = initialValues && (initialValues.kode_issue_risk || initialValues.tipe_issue_risk);

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
        <Section title="Resiko Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Kode Resiko"
                name="kode_issue_risk"
                rules={[{ required: true, message: "Please input kode resiko!" }]}
              >
                <Input placeholder="Enter kode resiko" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tipe Resiko"
                name="tipe_issue_risk"
                rules={[{ required: true, message: "Please select tipe resiko!" }]}
              >
                <Select placeholder="Select tipe resiko">
                  {riskTypeOptions.map((type) => (
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

export default RiskForm;
