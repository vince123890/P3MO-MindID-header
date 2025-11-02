import { Button, Col, Form, Input, Row, Select, DatePicker, InputNumber, Upload, Table, Space, Tag } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { UploadOutlined, FileOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

const { TextArea } = Input;
const { Option } = Select;

export const FormProject = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Document upload columns
  const documentColumns = [
    {
      title: "Document Name",
      dataIndex: "document_name",
      key: "document_name",
      render: (text) => (
        <Space>
          <FileOutlined style={{ color: "#1890ff" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Upload Date",
      dataIndex: "upload_date",
      key: "upload_date",
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<DownloadOutlined />} 
            size="small"
          >
            Download
          </Button>
          <Button 
            type="link" 
            icon={<DeleteOutlined />} 
            size="small"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Basic Information Section */}
        <Section>
          <Section title="Basic Information">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Project Code"
                  name="project_code"
                  rules={[
                    {
                      required: true,
                      message: "Project code is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter project code" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Company"
                  name="company"
                  rules={[
                    {
                      required: true,
                      message: "Company is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter company name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Business Initiative Name"
                  name="business_initiative_name"
                  rules={[
                    {
                      required: true,
                      message: "Business initiative name is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter business initiative name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Division"
                  name="division"
                  rules={[
                    {
                      required: true,
                      message: "Division is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter division" />
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
                >
                  <Select placeholder="Select status">
                    <Option value="Active">Active</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Sync Status"
                  name="sync_status"
                >
                  <Select placeholder="Select sync status" disabled>
                    <Option value="Synced">Synced</Option>
                    <Option value="Not Synced">Not Synced</Option>
                    <Option value="Syncing">Syncing</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Sync Date"
                  name="last_sync_date"
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select last sync date"
                    showTime
                    format="DD/MM/YYYY HH:mm"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Financial Estimates Section */}
        <Section>
          <Section title="Financial Estimates">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Currency"
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: "Currency is required",
                    },
                  ]}
                >
                  <Select placeholder="Select currency">
                    <Option value="IDR">IDR</Option>
                    <Option value="USD">USD</Option>
                    <Option value="EUR">EUR</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="CAPEX Estimate"
                  name="capex_estimate"
                  rules={[
                    {
                      required: true,
                      message: "CAPEX estimate is required",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "CAPEX must be a positive number",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter CAPEX estimate"
                    formatter={(value) => formatCurrency(value)}
                    parser={(value) => value.replace(/[^\d]/g, "")}
                    addonBefore="Rp"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="OPEX Estimate (Yearly)"
                  name="opex_estimate_yearly"
                  rules={[
                    {
                      required: true,
                      message: "OPEX estimate is required",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "OPEX must be a positive number",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter OPEX estimate"
                    formatter={(value) => formatCurrency(value)}
                    parser={(value) => value.replace(/[^\d]/g, "")}
                    addonBefore="Rp"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="IRR Estimate (%)"
                  name="irr_estimate"
                  rules={[
                    {
                      required: true,
                      message: "IRR estimate is required",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter IRR estimate"
                    min={0}
                    max={100}
                    step={0.1}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="NPV Estimate"
                  name="npv_estimate"
                  rules={[
                    {
                      required: true,
                      message: "NPV estimate is required",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter NPV estimate"
                    formatter={(value) => formatCurrency(value)}
                    parser={(value) => value.replace(/[^\d]/g, "")}
                    addonBefore="Rp"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Discount Rate (%)"
                  name="discount_rate"
                  rules={[
                    {
                      required: true,
                      message: "Discount rate is required",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter discount rate"
                    min={0}
                    max={100}
                    step={0.1}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Business Partners Section */}
        <Section>
          <Section title="Business Partners">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Technology Licensor"
                  name="technology_licensor"
                  rules={[
                    {
                      required: true,
                      message: "Technology licensor is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter technology licensor" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Raw Material Suppliers"
                  name="raw_material_suppliers"
                  rules={[
                    {
                      required: true,
                      message: "Raw material suppliers are required",
                    },
                  ]}
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Enter raw material suppliers (separated by comma)"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Offtaker"
                  name="offtaker"
                  rules={[
                    {
                      required: true,
                      message: "Offtaker is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter offtaker" />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Sasaran Penjelasan Section */}
        <Section>
          <Section title="Project Objectives">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Sasaran"
                  name="sasaran"
                  rules={[
                    {
                      required: true,
                      message: "Please select project objective",
                    },
                  ]}
                >
                  <Select placeholder="Select project objective">
                    <Option value="A">Sasaran A: Orientasi peningkatan pendapatan dan laba</Option>
                    <Option value="B">Sasaran B: Orientasi penugasan tetapi tidak merugikan</Option>
                    <Option value="C">Sasaran C: Orientasi Peningkatan laba melalui usaha non core</Option>
                    <Option value="D">Sasaran D: Orientasi peningkatan kehandalan sistem dan efisiensi biaya</Option>
                    <Option value="E">Sasaran E: Orientasi saran penunjang kebutuhan operasional</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Sasaran (Penjelasan)"
                  name="sasaran_penjelasan"
                  rules={[
                    {
                      required: true,
                      message: "Project objectives description is required",
                    },
                  ]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter project objectives and description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Supporting Documents Section */}
        <Section>
          <Section 
            title="Supporting Documents"
            extra={
              <Upload>
                <Button icon={<UploadOutlined />}>Upload Document</Button>
              </Upload>
            }
          >
            <Table
              columns={documentColumns}
              dataSource={form.getFieldValue("dokumen_pendukung") || []}
              pagination={false}
              size="small"
              locale={{ emptyText: "No documents uploaded" }}
            />
          </Section>
        </Section>

        {/* Remarks Section */}
        <Section>
          <Section title="Remarks">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Keterangan"
                  name="keterangan"
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter additional remarks or notes"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>
      </Space>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/projects")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
