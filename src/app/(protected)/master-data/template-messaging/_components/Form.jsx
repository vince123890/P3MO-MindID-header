import { Button, Col, Form, Input, Row, Select, Space, Typography, Tabs, Switch } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { allPerusahaans } from "../../perusahaans/_data";

// Category and Trigger options
const categoryOptions = [
  {
    label: "Communication & Announcements",
    value: "Communication & Announcements",
  },
  {
    label: "Notifications & Reminders",
    value: "Notifications & Reminders",
  },
  {
    label: "System & Security Alerts",
    value: "System & Security Alerts",
  },
];

const triggerOptions = {
  "Communication & Announcements": [
    { label: "Registration Completed", value: "Registration Completed" },
    { label: "Event Created", value: "Event Created" },
  ],
  "Notifications & Reminders": [
    { label: "Project Status", value: "Project Status" },
    { label: "Meeting Scheduled (X hours before start)", value: "Meeting Scheduled (X hours before start)" },
    { label: "Due Date Approaching", value: "Due Date Approaching" },
    { label: "Significant Decline Curve", value: "Significant Decline Curve" },
  ],
  "System & Security Alerts": [
    { label: "Scheduled System Maintenance", value: "Scheduled System Maintenance" },
    { label: "Login from New Device", value: "Login from New Device" },
  ],
};

const { TextArea } = Input;

export const FormTemplateMessaging = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [bodyContent, setBodyContent] = useState("");
  const [activePreviewTab, setActivePreviewTab] = useState("edit");
  const [selectedCategory, setSelectedCategory] = useState("");

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Get perusahaan options from existing data
  const perusahaanOptions = allPerusahaans.data.items.map((item) => ({
    label: item.nama_perusahaan,
    value: item.nama_perusahaan,
  }));

  // Handle category change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ trigger: undefined }); // Reset trigger when category changes
  };

  // Handle body content changes
  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBodyContent(value);
    form.setFieldsValue({ body: value });
  };

  // Process placeholders for preview
  const processPlaceholders = (content) => {
    if (!content) return '<p style="color: #999;">No content available</p>';
    
    const sampleData = {
      '[Name]': 'John Doe',
      '[Date]': new Date().toLocaleDateString(),
      '[Project Name]': 'Sample Project',
      '[Status]': 'Active',
      '[Contact]': 'contact@example.com'
    };

    let processedContent = content;
    Object.keys(sampleData).forEach(placeholder => {
      const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
      processedContent = processedContent.replace(regex, sampleData[placeholder]);
    });

    return processedContent;
  };

  const previewTabs = [
    {
      key: 'edit',
      label: (
        <span>
          <EditOutlined />
          Edit Content
        </span>
      ),
      children: (
        <TextArea
          value={bodyContent}
          onChange={handleBodyChange}
          rows={12}
          placeholder="Enter message body content (HTML supported)&#10;&#10;Available placeholders:&#10;- [Name] - Recipient name&#10;- [Date] - Current date&#10;- [Project Name] - Project name&#10;- [Status] - Status value&#10;- [Contact] - Contact information&#10;&#10;Example:&#10;&lt;h2&gt;Message Title&lt;/h2&gt;&#10;&lt;p&gt;Hello &lt;strong&gt;[Name]&lt;/strong&gt;,&lt;/p&gt;&#10;&lt;p&gt;Your message content here...&lt;/p&gt;"
          style={{ fontFamily: "monospace" }}
        />
      )
    },
    {
      key: 'preview',
      label: (
        <span>
          <EyeOutlined />
          HTML Preview
        </span>
      ),
      children: (
        <div style={{ 
          border: '1px solid #d9d9d9', 
          borderRadius: '6px', 
          padding: '16px',
          backgroundColor: '#fafafa',
          minHeight: '300px'
        }}>
          <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
            HTML Preview (with sample placeholder values):
          </Typography.Text>
          <div 
            style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: '4px',
              border: '1px solid #e8e8e8',
              minHeight: '150px'
            }}
            dangerouslySetInnerHTML={{ 
              __html: processPlaceholders(bodyContent)
            }}
          />
          
          <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '16px', marginBottom: '8px' }}>
            Raw HTML Code:
          </Typography.Text>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxHeight: '150px',
            overflow: 'auto',
            border: '1px solid #e8e8e8'
          }}>
            {bodyContent || 'No content available'}
          </div>
        </div>
      )
    }
  ];

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section title="Template Information">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nama Template"
                  name="nama_template"
                  rules={[
                    {
                      required: true,
                      message: "Nama Template is required",
                    },
                    {
                      min: 1,
                      message: "Nama Template must be at least 1 character",
                    },
                  ]}
                >
                  <Input placeholder="Enter template name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Category is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select category" 
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trigger"
                  name="trigger"
                  rules={[
                    {
                      required: true,
                      message: "Trigger is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select trigger" 
                    disabled={!selectedCategory}
                    options={selectedCategory ? triggerOptions[selectedCategory] : []}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  valuePropName="checked"
                  getValueFromEvent={(checked) => checked ? "Active" : "Inactive"}
                  getValueProps={(value) => ({ checked: value === "Active" })}
                >
                  <Switch 
                    checkedChildren="Active" 
                    unCheckedChildren="Inactive"
                    defaultChecked={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>

          <Section title="Message Content">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Body"
                  name="body"
                  rules={[
                    {
                      required: true,
                      message: "Body is required",
                    },
                    {
                      min: 10,
                      message: "Body must be at least 10 characters",
                    },
                  ]}
                >
                  <Tabs
                    activeKey={activePreviewTab}
                    onChange={setActivePreviewTab}
                    items={previewTabs}
                    size="small"
                  />
                </Form.Item>
                <div style={{ marginTop: 8, fontSize: "12px", color: "#666" }}>
                  <strong>Note:</strong> This field supports HTML formatting. Use placeholders like [Name], [Date], [Project Name] for dynamic content.
                  <br />
                  <strong>Preview:</strong> Switch to the "HTML Preview" tab to see how your content will look when rendered.
                  <br />
                  <strong>Future Enhancement:</strong> This will be replaced with a TinyMCE WYSIWYG editor for better content editing experience.
                </div>
              </Col>
            </Row>
          </Section>
        </Space>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/master-data/template-messaging")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
