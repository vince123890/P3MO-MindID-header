import React, { useState } from "react";
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Space, 
  Row, 
  Col, 
  Dropdown, 
  Typography,
  Upload,
  Modal,
  message,
  Descriptions
} from "antd";
import { 
  EditOutlined, 
  PlusOutlined, 
  DownOutlined, 
  UploadOutlined, 
  DownloadOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Section } from "admiral";

const { TextArea } = Input;
const { Text } = Typography;

const ProjectBaselineContent = ({ project, readOnly = false }) => {
  const [form] = Form.useForm();
  const [selectedBaseline, setSelectedBaseline] = useState("baseline-1");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [currentFileType, setCurrentFileType] = useState("");

  // Sample data for existing baselines
  const baselineData = {
    "baseline-1": {
      baseline_number: 1,
      tahun_mulai: "2025",
      tahun_target: "2026",
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "500",
      unit: "MW",
      produk: "Renewable Energy",
      lokasi_proyek: "Batam, Kepulauan Riau",
      success_criteria: "Project completion on time and within budget with 95% quality score",
      project_schedule_plan: "schedule_baseline_1.xlsx",
      project_cost_timeline: "cost_timeline_baseline_1.xlsx",
      reason_for_change: "Initial baseline version",
      latest_modified: "2025-01-01",
    },
    "baseline-2": {
      baseline_number: 2,
      tahun_mulai: "2025",
      tahun_target: "2026",
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "600",
      unit: "MW",
      produk: "Renewable Energy",
      lokasi_proyek: "Batam, Kepulauan Riau",
      success_criteria: "Project completion on time and within budget with 95% quality score and enhanced capacity",
      project_schedule_plan: "schedule_baseline_2.xlsx",
      project_cost_timeline: "cost_timeline_baseline_2.xlsx",
      reason_for_change: "Capacity increase due to market demand",
      latest_modified: "2025-01-15",
    },
    "baseline-3": {
      baseline_number: 3,
      tahun_mulai: "",
      tahun_target: "",
      main_contractor: "",
      capacity: "",
      unit: "",
      produk: "",
      lokasi_proyek: "",
      success_criteria: "",
      project_schedule_plan: "",
      project_cost_timeline: "",
      reason_for_change: "",
      latest_modified: new Date().toISOString().split('T')[0],
    }
  };

  const currentData = baselineData[selectedBaseline];

  // Initialize form with current data
  React.useEffect(() => {
    form.setFieldsValue(currentData);
  }, [selectedBaseline, form]);

  const handleBaselineChange = (key) => {
    setSelectedBaseline(key);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving baseline data:", values);
      message.success("Baseline data saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(currentData);
    setIsEditing(false);
  };

  const handleCreate = () => {
    setSelectedBaseline("baseline-3");
    setIsEditing(true);
    form.setFieldsValue({
      ...baselineData["baseline-3"],
      baseline_number: 3
    });
  };

  const handleFileAction = (action, fileType) => {
    if (action === "Upload") {
      setCurrentFileType(fileType);
      setUploadModalVisible(true);
    } else {
      message.info(`${action} ${fileType}`);
    }
  };

  const handleUploadModalOk = () => {
    message.success(`File uploaded successfully for ${currentFileType}`);
    setUploadModalVisible(false);
    setCurrentFileType("");
  };

  const handleUploadModalCancel = () => {
    setUploadModalVisible(false);
    setCurrentFileType("");
  };

  const handleDownloadTemplate = () => {
    message.info(`Downloading template for ${currentFileType}`);
  };

  const dropdownItems = [
    {
      key: 'baseline-1',
      label: 'Baseline 1',
    },
    {
      key: 'baseline-2', 
      label: 'Baseline 2',
    }
  ];

  return (
    <Section loading={false} bodyStyle={{ padding: 0 }} bordered={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header with Baseline Selection and Actions */}
        <Section>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ fontSize: "16px" }}>
                Current: {selectedBaseline === "baseline-1" ? "Baseline 1" : 
                         selectedBaseline === "baseline-2" ? "Baseline 2" : "Baseline 3"}
              </Text>
            </Col>
            <Col>
              <Space>
                {!readOnly && selectedBaseline === "baseline-2" && (
                  <Button
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    disabled={isEditing}
                  >
                    Edit
                  </Button>
                )}
                <Dropdown
                  menu={{
                    items: dropdownItems,
                    onClick: ({ key }) => handleBaselineChange(key)
                  }}
                  trigger={['click']}
                >
                  <Button>
                    Select Baseline <DownOutlined />
                  </Button>
                </Dropdown>
                
                {!readOnly && (
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Add Baseline 3
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Section>

        {/* Main Content */}
        {(isEditing || selectedBaseline === "baseline-3") ? (
          <Section>
            <Form
              form={form}
              layout="vertical"
              initialValues={currentData}
            >
              <Row gutter={[24, 16]}>
                {/* Baseline Number */}
                <Col xs={24}>
                  <Form.Item
                    label="Baseline Number"
                    name="baseline_number"
                    rules={[{ required: true, message: "Please input baseline number!" }]}
                  >
                    <InputNumber 
                      min={1} 
                      max={10} 
                      placeholder="3"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                {/* Project Schedule Plan */}
                <Col xs={24}>
                  <Form.Item label="Project Schedule Plan">
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px",
                      flexWrap: "wrap"
                    }}>
                      {/* File Link */}
                      <div style={{ 
                        flex: 1,
                        minWidth: "200px",
                        padding: "8px 12px", 
                        border: "1px solid #d9d9d9", 
                        borderRadius: "6px",
                        backgroundColor: "#fafafa",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        {currentData.project_schedule_plan ? (
                          <a 
                            href={`/files/${currentData.project_schedule_plan}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              color: "#1890ff", 
                              textDecoration: "underline",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleFileAction("View/Download", currentData.project_schedule_plan);
                            }}
                          >
                            <EyeOutlined />
                            {currentData.project_schedule_plan}
                          </a>
                        ) : (
                          <span style={{ color: "#999" }}>No file uploaded</span>
                        )}
                      </div>
                      
                      {/* Action Buttons - Inline */}
                      <Button
                        icon={<UploadOutlined />}
                        onClick={() => handleFileAction("Upload", "Project Schedule Plan")}
                        style={{ height: "40px" }}
                      >
                        Upload
                      </Button>
                    </div>
                  </Form.Item>
                </Col>

                {/* Project Cost Timeline Plan */}
                <Col xs={24}>
                  <Form.Item label="Project Cost Timeline Plan">
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px",
                      flexWrap: "wrap"
                    }}>
                      {/* File Link */}
                      <div style={{ 
                        flex: 1,
                        minWidth: "200px",
                        padding: "8px 12px", 
                        border: "1px solid #d9d9d9", 
                        borderRadius: "6px",
                        backgroundColor: "#fafafa",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        {currentData.project_cost_timeline ? (
                          <a 
                            href={`/files/${currentData.project_cost_timeline}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              color: "#1890ff", 
                              textDecoration: "underline",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleFileAction("View/Download", currentData.project_cost_timeline);
                            }}
                          >
                            <EyeOutlined />
                            {currentData.project_cost_timeline}
                          </a>
                        ) : (
                          <span style={{ color: "#999" }}>No file uploaded</span>
                        )}
                      </div>
                      
                      {/* Action Buttons - Inline */}
                      <Button
                        icon={<UploadOutlined />}
                        onClick={() => handleFileAction("Upload", "Project Cost Timeline Plan")}
                        style={{ height: "40px" }}
                      >
                        Upload
                      </Button>
                    </div>
                  </Form.Item>
                </Col>

                {/* Reason for Change */}
                <Col xs={24}>
                  <Form.Item
                    label="Reason for Change"
                    name="reason_for_change"
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="Enter reason for this baseline change"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Action Buttons */}
              <Row justify="end" style={{ marginTop: "24px" }}>
                <Space>
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Space>
              </Row>
            </Form>
          </Section>
        ) : (
          <Section title="Project Baseline Information">
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '25%' }}
              contentStyle={{ width: '25%' }}
              column={2}
              items={[
                {
                  key: "baseline_number",
                  label: "Baseline Number",
                  children: <Text strong>{currentData.baseline_number ?? "-"}</Text>,
                },
                {
                  key: "latest_modified",
                  label: "Latest Modified",
                  children: <Text strong>{currentData.latest_modified ?? "-"}</Text>,
                },
                {
                  key: "project_schedule_plan",
                  label: "Project Schedule Plan",
                  children: currentData.project_schedule_plan ? (
                    <a 
                      href={`/files/${currentData.project_schedule_plan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: "#1890ff", 
                        textDecoration: "underline",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFileAction("View/Download", currentData.project_schedule_plan);
                      }}
                    >
                      <EyeOutlined />
                      <Text strong>{currentData.project_schedule_plan}</Text>
                    </a>
                  ) : (
                    <Text strong>-</Text>
                  ),
                },
                {
                  key: "project_cost_timeline",
                  label: "Project Cost Timeline Plan",
                  children: currentData.project_cost_timeline ? (
                    <a 
                      href={`/files/${currentData.project_cost_timeline}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: "#1890ff", 
                        textDecoration: "underline",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFileAction("View/Download", currentData.project_cost_timeline);
                      }}
                    >
                      <EyeOutlined />
                      <Text strong>{currentData.project_cost_timeline}</Text>
                    </a>
                  ) : (
                    <Text strong>-</Text>
                  ),
                },
                {
                  key: "reason_for_change",
                  label: "Reason for Change",
                  children: <Text strong>{currentData.reason_for_change ?? "-"}</Text>,
                  span: 2,
                },
              ]}
            />
          </Section>
        )}

        {/* Upload Modal */}
        <Modal
          title={`Upload ${currentFileType}`}
          open={uploadModalVisible}
          onOk={handleUploadModalOk}
          onCancel={handleUploadModalCancel}
          footer={[
            <Button key="download-template" icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
              Download Template
            </Button>,
            <Button key="cancel" onClick={handleUploadModalCancel}>
              Cancel
            </Button>,
            <Button key="upload" type="primary" onClick={handleUploadModalOk}>
              Upload
            </Button>,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>Upload file for {currentFileType}</Text>
            <Upload.Dragger
              name="file"
              multiple={false}
              beforeUpload={() => false}
              onChange={(info) => {
                console.log('File info:', info);
              }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for single file upload.</p>
            </Upload.Dragger>
          </Space>
        </Modal>
      </Space>
    </Section>
  );
};

export default ProjectBaselineContent;
