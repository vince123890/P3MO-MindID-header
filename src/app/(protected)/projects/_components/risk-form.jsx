import { Button, Col, Form, Input, Row, DatePicker, Select, message, Space, Flex, Typography } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";
import { useState } from "react";
import dayjs from "dayjs";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const RiskForm = ({ 
  formProps, 
  error, 
  loading, 
  isEdit = false, 
  isView = false,
  initialData = null,
  onSubmit
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // State for dynamic sections
  const [combinedSections, setCombinedSections] = useState([{ id: 1 }]);

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Form field options
  const kategoriResikoOptions = [
    { label: "Technical", value: "Technical" },
    { label: "Financial", value: "Financial" },
    { label: "Operational", value: "Operational" },
    { label: "Environmental", value: "Environmental" },
    { label: "Safety", value: "Safety" },
    { label: "Regulatory", value: "Regulatory" },
    { label: "Strategic", value: "Strategic" },
    { label: "Reputational", value: "Reputational" },
  ];

  const probabilitasResikoOptions = [
    { label: "Very Low", value: "Very Low" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Very High", value: "Very High" },
  ];

  const tingkatDampakOptions = [
    { label: "Very Low", value: "Very Low" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  const prioritasResikoOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  const statusMitigasiOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" },
    { label: "On Hold", value: "On Hold" },
  ];

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      message.success(isEdit ? "Risk updated successfully" : "Risk created successfully");
      navigate(-1);
    }
  };

  // Calculate risk score based on probability and impact (1-10 scale)
  const calculateRiskScore = (probability, impact) => {
    const probabilityMap = {
      "Very Low": 1,
      "Low": 2,
      "Medium": 3,
      "High": 4,
      "Very High": 5,
    };
    
    const impactMap = {
      "Very Low": 1,
      "Low": 2,
      "Medium": 3,
      "High": 4,
      "Critical": 5,
    };
    
    const probScore = probabilityMap[probability] || 1;
    const impactScore = impactMap[impact] || 1;
    
    // Convert to 1-10 scale (average of probability and impact, scaled)
    const rawScore = (probScore + impactScore) / 2;
    const scaledScore = Math.round(rawScore * 2); // Scale to 1-10
    
    return Math.min(Math.max(scaledScore, 1), 10); // Ensure it's within 1-10
  };

  // Update risk score when probability or impact changes
  const handleFieldChange = (changedFields) => {
    const formValues = form.getFieldsValue();
    const updatedValues = { ...formValues, ...changedFields };
    
    if (changedFields.probabilitas_resiko || changedFields.tingkat_dampak) {
      const riskScore = calculateRiskScore(
        updatedValues.probabilitas_resiko,
        updatedValues.tingkat_dampak
      );
      
      // Determine priority based on risk score (1-10 scale)
      let priority = "Low";
      if (riskScore >= 8) priority = "Critical";
      else if (riskScore >= 6) priority = "High";
      else if (riskScore >= 4) priority = "Medium";
      
      form.setFieldsValue({
        skor_resiko: riskScore,
        prioritas_resiko: priority,
      });
    }
  };

  return (
    <Form 
      {...formProps} 
      form={form} 
      layout="vertical"
      onFinish={handleFinish}
      onFieldsChange={handleFieldChange}
      initialValues={{
        ...initialData,
        tanggal_identifikasi_resiko: initialData?.tanggal_identifikasi_resiko ? dayjs(initialData.tanggal_identifikasi_resiko) : dayjs(),
        deadline_mitigasi: initialData?.deadline_mitigasi ? dayjs(initialData.deadline_mitigasi) : null,
        tanggal_update_terkini: initialData?.tanggal_update_terkini ? dayjs(initialData.tanggal_update_terkini) : dayjs(),
        skor_resiko: initialData?.skor_resiko || 1,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Risk Identification Section */}
        <Section bodyStyle={{ padding: 0 }} bordered={false}>
          <Section title="Risk Identification">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nomor Resiko"
                  name="nomor_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk number is required",
                    },
                  ]}
                >
                  <Input 
                    placeholder="RSK-001"
                    disabled={isView || isEdit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tanggal Identifikasi Resiko"
                  name="tanggal_identifikasi_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk identification date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select identification date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kategori Resiko"
                  name="kategori_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk category is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk category"
                    options={kategoriResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Probabilitas Resiko"
                  name="probabilitas_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk probability is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk probability"
                    options={probabilitasResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Risk Description Section */}
        <Section bodyStyle={{ padding: 0 }} bordered={false}>
          <Section title="Risk Description">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Deskripsi Resiko"
                  name="deskripsi_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk description is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter detailed risk description"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Dampak Resiko"
                  name="dampak_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk impact is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter potential impact of the risk"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tingkat Dampak"
                  name="tingkat_dampak"
                  rules={[
                    {
                      required: true,
                      message: "Impact level is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select impact level"
                    options={tingkatDampakOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Skor Resiko"
                  name="skor_resiko"
                >
                  <Input 
                    placeholder="Risk score (calculated automatically)"
                    disabled={true}
                    addonAfter="/10"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Prioritas Resiko"
                  name="prioritas_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk priority is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk priority"
                    options={prioritasResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Combined Mitigation & Update Summary Section */}
        <Section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Typography.Text strong style={{ fontSize: "16px", margin: 0 }}>
              Mitigation & Update Summary
            </Typography.Text>
            {!isView && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  const newId = Math.max(...combinedSections.map(s => s.id)) + 1;
                  setCombinedSections([...combinedSections, { id: newId }]);
                }}
              >
                Add New
              </Button>
            )}
          </div>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {combinedSections.map((section, index) => (
              <div key={section.id} style={{ 
                border: '1px solid #d9d9d9', 
                borderRadius: '6px', 
                padding: '16px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e8e8e8'
                }}>
                  <Typography.Text strong style={{ fontSize: "14px" }}>
                    Entry {index + 1}
                  </Typography.Text>
                  {combinedSections.length > 1 && !isView && (
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        if (combinedSections.length > 1) {
                          setCombinedSections(combinedSections.filter(s => s.id !== section.id));
                        }
                      }}
                      danger
                      size="small"
                    />
                  )}
                </div>
                
                {/* Mitigation Plan Information */}
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                  <Col span={24}>
                    <Typography.Text strong style={{ marginBottom: '8px', display: 'block' }}>
                      Mitigation Plan
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Rencana Mitigasi"
                      name={`rencana_mitigasi_${section.id}`}
                      rules={index === 0 ? [
                        {
                          required: true,
                          message: "Mitigation plan is required",
                        },
                      ] : []}
                    >
                      <Input.TextArea 
                        placeholder="Enter detailed mitigation plan"
                        rows={4}
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Status Mitigasi"
                      name={`status_mitigasi_${section.id}`}
                      rules={index === 0 ? [
                        {
                          required: true,
                          message: "Mitigation status is required",
                        },
                      ] : []}
                    >
                      <Select 
                        placeholder="Select mitigation status"
                        options={statusMitigasiOptions}
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Deadline Mitigasi"
                      name={`deadline_mitigasi_${section.id}`}
                      rules={index === 0 ? [
                        {
                          required: true,
                          message: "Mitigation deadline is required",
                        },
                      ] : []}
                    >
                      <DatePicker 
                        style={{ width: "100%" }} 
                        placeholder="Select mitigation deadline"
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Update Information */}
                <Row gutter={16}>
                  <Col span={24}>
                    <Typography.Text strong style={{ marginBottom: '8px', display: 'block' }}>
                      Update Information
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Update Mitigasi"
                      name={`update_mitigasi_${section.id}`}
                      rules={index === 0 ? [
                        {
                          required: true,
                          message: "Mitigation update is required",
                        },
                      ] : []}
                    >
                      <Input.TextArea 
                        placeholder="Enter latest mitigation update"
                        rows={3}
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Tanggal Update Terkini"
                      name={`tanggal_update_terkini_${section.id}`}
                      rules={index === 0 ? [
                        {
                          required: true,
                          message: "Last update date is required",
                        },
                      ] : []}
                    >
                      <DatePicker 
                        style={{ width: "100%" }} 
                        placeholder="Select last update date"
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="PIC"
                      name={`pic_${section.id}`}
                    >
                      <Input 
                        placeholder="Enter person in charge"
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Keterangan"
                      name={`keterangan_${section.id}`}
                    >
                      <Input.TextArea 
                        placeholder="Enter additional remarks"
                        rows={2}
                        disabled={isView}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
          </Space>
        </Section>

        {/* Action Buttons */}
        {!isView && (
          <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
            <Button 
              type="text" 
              disabled={loading} 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
            >
              {isEdit ? "Save Changes" : "Create Risk"}
            </Button>
          </Flex>
        )}

        {/* View Mode Close Button */}
        {isView && (
          <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              onClick={() => navigate(-1)}
            >
              Close
            </Button>
          </Flex>
        )}
      </Space>
    </Form>
  );
};
