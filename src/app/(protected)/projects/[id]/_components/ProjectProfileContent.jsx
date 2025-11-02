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
  Select,
  message,
  Descriptions
} from "antd";
import { 
  EditOutlined, 
  PlusOutlined, 
  DownOutlined 
} from "@ant-design/icons";
import { Section } from "admiral";
import { allKurs } from "@/app/(protected)/master-data/kurs/_data/index.js";
import { allPerusahaans } from "@/app/(protected)/master-data/perusahaans/_data/index.js";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const ProjectProfileContent = ({ project, readOnly = false }) => {
  const [form] = Form.useForm();
  const [selectedAmendment, setSelectedAmendment] = useState("amendment-1");
  const [isEditing, setIsEditing] = useState(false);

  // Sample data for existing amendments
  const amendmentData = {
    "amendment-1": {
      amendment_number: 1,
      company: "PT. Antam",
      others: "",
      project_name: "Nickel Processing Plant",
      pmo_in_charge: "Ahmad Supardi",
      project_manager: "Budi Santoso",
      project_sponsor: "Direktur Operasi",
      fase_proyek: "Construction",
      kode_inisiatif_proyek: "NIC-2025-001",
      steering_komite: "Komite Antam",
      tipe_proyek: "Infrastructure Development",
      tahun_mulai_proyek: 2025,
      tahun_target_selesai: 2027,
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "100000",
      unit: "Ton/Year",
      product: "Nickel Matte",
      lokasi_proyek: "Sulawesi Tenggara",
      longitudinal: "122.5000",
      latitude: "-4.0000",
      kurs: "10",
      success_criteria: "Complete project on time with 95% quality standard and within budget allocation",
      latest_modified: "2025-01-15",
    },
    "amendment-2": {
      amendment_number: 2,
      company: "PT. Antam",
      others: "",
      project_name: "Nickel Processing Plant",
      pmo_in_charge: "Ahmad Supardi",
      project_manager: "Budi Santoso", 
      project_sponsor: "Direktur Operasi",
      fase_proyek: "Construction",
      kode_inisiatif_proyek: "NIC-2025-001",
      steering_komite: "Komite Antam",
      tipe_proyek: "Infrastructure Development",
      tahun_mulai_proyek: 2025,
      tahun_target_selesai: 2027,
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "120000",
      unit: "Ton/Year",
      product: "Nickel Matte",
      lokasi_proyek: "Sulawesi Tenggara",
      longitudinal: "122.5000",
      latitude: "-4.0000",
      kurs: "USD 1 = IDR 15320 (2023-09-20)",
      success_criteria: "Complete project on time with 95% quality standard and within budget allocation with increased capacity",
      latest_modified: "2025-02-01",
    },
    "amendment-3": {
      amendment_number: 3,
      company: "",
      others: "",
      project_name: "",
      pmo_in_charge: "",
      project_manager: "",
      project_sponsor: "",
      fase_proyek: "",
      kode_inisiatif_proyek: "",
      steering_komite: "",
      tipe_proyek: "",
      tahun_mulai_proyek: "",
      tahun_target_selesai: "",
      main_contractor: "",
      capacity: "",
      unit: "",
      product: "",
      lokasi_proyek: "",
      longitudinal: "",
      latitude: "",
      kurs: "",
      success_criteria: "",
      latest_modified: new Date().toISOString().split('T')[0],
    }
  };

  const currentData = amendmentData[selectedAmendment];

  // Initialize form with current data
  React.useEffect(() => {
    form.setFieldsValue(currentData);
  }, [selectedAmendment, form]);

  const handleAmendmentChange = (key) => {
    setSelectedAmendment(key);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving project profile data:", values);
      message.success("Project profile data saved successfully!");
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
    setSelectedAmendment("amendment-3");
    setIsEditing(true);
    // Auto-fill Company, Project Name, Kurs, and Fase Proyek with specific values
    form.setFieldsValue({
      ...amendmentData["amendment-3"],
      amendment_number: 3,
      company: "PT. Antam",
      project_name: "Nickel Processing Plant",
      fase_proyek: "FEL 2",
      kurs: "USD 1 = IDR 15320 (2023-09-20)"
    });
  };

  const dropdownItems = [
    {
      key: 'amendment-1',
      label: 'Amendment 1',
    },
    {
      key: 'amendment-2', 
      label: 'Amendment 2',
    }
  ];

  const createDropdownItems = [
    {
      key: 'amendment-3',
      label: 'Amendment 3',
    }
  ];

  return (
    <Section loading={false} bodyStyle={{ padding: 0 }} bordered={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header with Amendment Selection and Actions */}
        <Section>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ fontSize: "16px" }}>
                Current: {selectedAmendment === "amendment-1" ? "Amendment 1" : 
                         selectedAmendment === "amendment-2" ? "Amendment 2" : "Amendment 3"}
              </Text>
            </Col>
            <Col>
              <Space>
                {!readOnly && selectedAmendment === "amendment-2" && (
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
                    onClick: ({ key }) => handleAmendmentChange(key)
                  }}
                  trigger={['click']}
                >
                  <Button>
                    Select Amendment <DownOutlined />
                  </Button>
                </Dropdown>
                
                {!readOnly && (
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Add Amendment 3
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Section>

        {/* Main Content */}
        {(isEditing || selectedAmendment === "amendment-3") ? (
          <Section>
            <Form
              form={form}
              layout="vertical"
              initialValues={currentData}
            >
              <Row gutter={[24, 16]}>
              {/* Amendment Number */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Amendment Number"
                  name="amendment_number"
                  rules={[{ required: true, message: "Please input amendment number!" }]}
                >
                  <InputNumber 
                    min={1} 
                    max={10} 
                    placeholder="3"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Others */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Others"
                  name="others"
                >
                  <Input placeholder="Enter other information" />
                </Form.Item>
              </Col>

              {/* Company */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Company"
                  name="company"
                >
                  <Input 
                    placeholder="Enter company"
                    disabled={true}
                  />
                </Form.Item>
              </Col>

              {/* PMO In Charge */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="PMO In Charge"
                  name="pmo_in_charge"
                  rules={[{ required: true, message: "Please select PMO in charge!" }]}
                >
                  <Select placeholder="Select PMO in charge">
                    {allPerusahaans.data.items.map((company) => (
                      <Option key={company.id} value={company.nama_perusahaan}>
                        {company.nama_perusahaan}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Project Name */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Name"
                  name="project_name"
                  rules={[{ required: true, message: "Please input project name!" }]}
                >
                  <Input placeholder="Enter project name" />
                </Form.Item>
              </Col>

              {/* Project Manager */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Manager"
                  name="project_manager"
                  rules={[{ required: true, message: "Please select project manager!" }]}
                >
                  <Select placeholder="Select project manager">
                    <Option value="Budi Santoso">Budi Santoso</Option>
                    <Option value="Dewi Kusuma">Dewi Kusuma</Option>
                    <Option value="Rudi Wijaya">Rudi Wijaya</Option>
                    <Option value="Maya Sari">Maya Sari</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Project Sponsor */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Sponsor"
                  name="project_sponsor"
                  rules={[{ required: true, message: "Please input project sponsor!" }]}
                >
                  <Input placeholder="Enter project sponsor" />
                </Form.Item>
              </Col>

              {/* Fase Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Fase Proyek"
                  name="fase_proyek"
                >
                  <Select placeholder="Select project phase" disabled={true}>
                    <Option value="FEL 2">FEL 2</Option>
                    <Option value="FEL 3">FEL 3</Option>
                    <Option value="FID">FID</Option>
                    <Option value="Detail Engineering">Detail Engineering</Option>
                    <Option value="Construction">Construction</Option>
                    <Option value="Commissioning">Commissioning</Option>
                    <Option value="Operate Optimize">Operate Optimize</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Kode Inisiatif Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Kode Inisiatif Proyek"
                  name="kode_inisiatif_proyek"
                  rules={[{ required: true, message: "Please select project initiative code!" }]}
                >
                  <Select placeholder="Select project initiative code">
                    <Option value="NIC-2025-001">NIC-2025-001</Option>
                    <Option value="COAL-2025-002">COAL-2025-002</Option>
                    <Option value="ALU-2025-003">ALU-2025-003</Option>
                    <Option value="GREEN-2025-004">GREEN-2025-004</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Steering Komite */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Steering Komite"
                  name="steering_komite"
                  rules={[{ required: true, message: "Please select steering committee!" }]}
                >
                  <Select placeholder="Select steering committee">
                    <Option value="Komite Antam">Komite Antam</Option>
                    <Option value="Komite Bukit Asam">Komite Bukit Asam</Option>
                    <Option value="Komite Inalum">Komite Inalum</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Tipe Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tipe Proyek"
                  name="tipe_proyek"
                  rules={[{ required: true, message: "Please input project type!" }]}
                >
                  <Input placeholder="Enter project type" />
                </Form.Item>
              </Col>

              {/* Tahun Mulai Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tahun Mulai Proyek"
                  name="tahun_mulai_proyek"
                  rules={[{ required: true, message: "Please input project start year!" }]}
                >
                  <InputNumber 
                    min={2020} 
                    max={2050} 
                    placeholder="2025"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Tahun Target Selesai */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tahun Target Selesai"
                  name="tahun_target_selesai"
                  rules={[{ required: true, message: "Please input project target completion year!" }]}
                >
                  <InputNumber 
                    min={2020} 
                    max={2050} 
                    placeholder="2027"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Main Kontraktor */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Main Kontraktor"
                  name="main_contractor"
                  rules={[{ required: true, message: "Please input main contractor!" }]}
                >
                  <Input placeholder="Enter main contractor" />
                </Form.Item>
              </Col>

              {/* Capacity */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Capacity"
                  name="capacity"
                  rules={[{ required: true, message: "Please input capacity!" }]}
                >
                  <Input placeholder="Enter capacity" />
                </Form.Item>
              </Col>

              {/* Unit */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[{ required: true, message: "Please input unit!" }]}
                >
                  <Input placeholder="Enter unit" />
                </Form.Item>
              </Col>

              {/* Lokasi Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Lokasi Proyek"
                  name="lokasi_proyek"
                  rules={[{ required: true, message: "Please input project location!" }]}
                >
                  <Input placeholder="Enter project location" />
                </Form.Item>
              </Col>

              {/* Product */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Product"
                  name="product"
                  rules={[{ required: true, message: "Please input product!" }]}
                >
                  <Input placeholder="Enter product" />
                </Form.Item>
              </Col>

              {/* Longitudinal */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Longitudinal"
                  name="longitudinal"
                  rules={[{ required: true, message: "Please input longitude!" }]}
                >
                  <Input placeholder="Enter longitude coordinate" />
                </Form.Item>
              </Col>

              {/* Latitude */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Latitude"
                  name="latitude"
                  rules={[{ required: true, message: "Please input latitude!" }]}
                >
                  <Input placeholder="Enter latitude coordinate" />
                </Form.Item>
              </Col>

              {/* Kurs */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Kurs"
                  name="kurs"
                >
                  <Input 
                    placeholder="Enter kurs"
                    disabled={true}
                  />
                </Form.Item>
              </Col>

              {/* Latest Modified */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Latest Modified"
                  name="latest_modified"
                >
                  <Input 
                    placeholder="YYYY-MM-DD"
                    disabled
                  />
                </Form.Item>
              </Col>

              {/* Success Criteria */}
              <Col xs={24}>
                <Form.Item
                  label="Success Criteria"
                  name="success_criteria"
                  rules={[{ required: true, message: "Please input success criteria!" }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter project success criteria"
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
          <Section title="Project Profile Information">
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '25%' }}
              contentStyle={{ width: '25%' }}
              column={2}
              items={[
                {
                  key: "amendment_number",
                  label: "Amendment Number",
                  children: <Text strong>{currentData.amendment_number ?? "-"}</Text>,
                },
                {
                  key: "others",
                  label: "Others",
                  children: <Text strong>{currentData.others || "-"}</Text>,
                },
                {
                  key: "company",
                  label: "Company",
                  children: <Text strong>{currentData.company ?? "-"}</Text>,
                },
                {
                  key: "pmo_in_charge",
                  label: "PMO In Charge",
                  children: <Text strong>{currentData.pmo_in_charge ?? "-"}</Text>,
                },
                {
                  key: "project_name",
                  label: "Project Name",
                  children: <Text strong>{currentData.project_name ?? "-"}</Text>,
                },
                {
                  key: "project_manager",
                  label: "Project Manager",
                  children: <Text strong>{currentData.project_manager ?? "-"}</Text>,
                },
                {
                  key: "project_sponsor",
                  label: "Project Sponsor",
                  children: <Text strong>{currentData.project_sponsor ?? "-"}</Text>,
                },
                {
                  key: "fase_proyek",
                  label: "Fase Proyek",
                  children: <Text strong>{currentData.fase_proyek ?? "-"}</Text>,
                },
                {
                  key: "kode_inisiatif_proyek",
                  label: "Kode Inisiatif Proyek",
                  children: <Text strong>{currentData.kode_inisiatif_proyek ?? "-"}</Text>,
                },
                {
                  key: "steering_komite",
                  label: "Steering Komite",
                  children: <Text strong>{currentData.steering_komite ?? "-"}</Text>,
                },
                {
                  key: "tipe_proyek",
                  label: "Tipe Proyek",
                  children: <Text strong>{currentData.tipe_proyek ?? "-"}</Text>,
                },
                {
                  key: "tahun_mulai_proyek",
                  label: "Tahun Mulai Proyek",
                  children: <Text strong>{currentData.tahun_mulai_proyek ?? "-"}</Text>,
                },
                {
                  key: "tahun_target_selesai",
                  label: "Tahun Target Selesai",
                  children: <Text strong>{currentData.tahun_target_selesai ?? "-"}</Text>,
                },
                {
                  key: "main_contractor",
                  label: "Main Kontraktor",
                  children: <Text strong>{currentData.main_contractor ?? "-"}</Text>,
                },
                {
                  key: "capacity",
                  label: "Capacity",
                  children: <Text strong>{currentData.capacity ?? "-"}</Text>,
                },
                {
                  key: "unit",
                  label: "Unit",
                  children: <Text strong>{currentData.unit ?? "-"}</Text>,
                },
                {
                  key: "product",
                  label: "Product",
                  children: <Text strong>{currentData.product ?? "-"}</Text>,
                },
                {
                  key: "lokasi_proyek",
                  label: "Lokasi Proyek",
                  children: <Text strong>{currentData.lokasi_proyek ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "longitudinal",
                  label: "Longitudinal",
                  children: <Text strong>{currentData.longitudinal ?? "-"}</Text>,
                },
                {
                  key: "latitude",
                  label: "Latitude",
                  children: <Text strong>{currentData.latitude ?? "-"}</Text>,
                },
                {
                  key: "kurs",
                  label: "Kurs",
                  children: <Text strong>
                    {currentData.kurs ? 
                      (() => {
                        const kursItem = allKurs.data.items.find(k => k.id === currentData.kurs);
                        return kursItem ? `USD 1 = IDR ${kursItem.nilai_kurs} (${kursItem.tanggal})` : "-";
                      })()
                      : "-"
                    }
                  </Text>,
                },
                {
                  key: "success_criteria",
                  label: "Success Criteria",
                  children: <Text strong>{currentData.success_criteria ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "latest_modified",
                  label: "Latest Modified",
                  children: <Text strong>{currentData.latest_modified ?? "-"}</Text>,
                },
              ]}
            />
          </Section>
        )}
      </Space>
    </Section>
  );
};

export default ProjectProfileContent;
