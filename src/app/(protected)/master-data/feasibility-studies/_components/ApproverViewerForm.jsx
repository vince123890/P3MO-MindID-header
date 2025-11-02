import { Button, Col, Form, Row, Select, Modal, Space, Descriptions, Typography } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { listFeasibilityStudies } from "../_data";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const ApproverViewerForm = ({ formProps, error, loading, isEdit, feasibilityStudyId }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Dummy data for companies (MindID Group)
  const companyOptions = [
    { label: "PT Aneka Tambang Tbk", value: "PT Aneka Tambang Tbk" },
    { label: "PT Bukit Asam Tbk", value: "PT Bukit Asam Tbk" },
    { label: "PT Freeport Indonesia", value: "PT Freeport Indonesia" },
    { label: "PT Indonesia Asahan Aluminium (Inalum)", value: "PT Indonesia Asahan Aluminium (Inalum)" },
    { label: "PT Timah Tbk", value: "PT Timah Tbk" },
    { label: "PT Vale Indonesia", value: "PT Vale Indonesia" },
  ];

  // Dummy data for Tim Project
  const timProjectOptions = [
    { label: "Tim Engineering", value: "tim_engineering" },
    { label: "Tim Construction", value: "tim_construction" },
    { label: "Tim Operations", value: "tim_operations" },
    { label: "Tim Finance", value: "tim_finance" },
    { label: "Tim IT & Digital", value: "tim_it_digital" },
    { label: "Tim HSE (Health Safety Environment)", value: "tim_hse" },
    { label: "Tim Procurement", value: "tim_procurement" },
    { label: "Tim Legal & Compliance", value: "tim_legal" },
  ];

  // Dummy data for PMO AH users
  const pmoAhUsers = [
    { label: "Ahmad Rizky (PMO AH)", value: "ahmad_rizky_pmo_ah" },
    { label: "Siti Nurhaliza (PMO AH)", value: "siti_nurhaliza_pmo_ah" },
    { label: "Budi Santoso (PMO AH)", value: "budi_santoso_pmo_ah" },
    { label: "Dewi Sartika (PMO AH)", value: "dewi_sartika_pmo_ah" },
    { label: "Eko Prasetyo (PMO AH)", value: "eko_prasetyo_pmo_ah" },
  ];

  // Dummy data for PMO Mind ID users
  const pmoMindIdUsers = [
    { label: "Agus Setiawan (PMO Mind ID)", value: "agus_setiawan_pmo_mind" },
    { label: "Rina Kartika (PMO Mind ID)", value: "rina_kartika_pmo_mind" },
    { label: "Dani Kurniawan (PMO Mind ID)", value: "dani_kurniawan_pmo_mind" },
    { label: "Lina Marlina (PMO Mind ID)", value: "lina_marlina_pmo_mind" },
    { label: "Hendra Wijaya (PMO Mind ID)", value: "hendra_wijaya_pmo_mind" },
  ];

  // Dummy data for viewers
  const viewerUsers = [
    { label: "Fajar Nugroho", value: "fajar_nugroho" },
    { label: "Maya Sari", value: "maya_sari" },
    { label: "Riko Pratama", value: "riko_pratama" },
    { label: "Nina Anggraini", value: "nina_anggraini" },
    { label: "Yoga Permana", value: "yoga_permana" },
    { label: "Tika Rahayu", value: "tika_rahayu" },
    { label: "Indra Gunawan", value: "indra_gunawan" },
    { label: "Sari Wulandari", value: "sari_wulandari" },
  ];

  const feasibilityStudy = feasibilityStudyId ? listFeasibilityStudies.data.items.find(
    (item) => item.id === parseInt(feasibilityStudyId)
  ) : null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const basicInfoItems = feasibilityStudy ? [
    {
      key: "investment_name",
      label: "Investment Name",
      children: <Typography.Text strong>{feasibilityStudy?.investment_name ?? "-"}</Typography.Text>,
    },
    {
      key: "company",
      label: "Company",
      children: <Typography.Text strong>{feasibilityStudy?.company ?? "-"}</Typography.Text>,
    },
    {
      key: "investment_code",
      label: "Investment Code",
      children: <Typography.Text strong>{feasibilityStudy?.investment_code ?? "-"}</Typography.Text>,
    },
    {
      key: "project_code",
      label: "Project Code",
      children: <Typography.Text strong>{feasibilityStudy?.project_code ?? "-"}</Typography.Text>,
    },
  ] : [];

  const financialItems = feasibilityStudy ? [
    {
      key: "capex",
      label: "CAPEX",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.capex) ?? "-"}</Typography.Text>,
    },
    {
      key: "opex",
      label: "OPEX",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.opex) ?? "-"}</Typography.Text>,
    },
    {
      key: "npv",
      label: "NPV",
      children: <Typography.Text strong>{formatCurrency(feasibilityStudy?.npv) ?? "-"}</Typography.Text>,
    },
    {
      key: "irr",
      label: "IRR",
      children: <Typography.Text strong>{feasibilityStudy?.irr ? `${feasibilityStudy.irr}%` : "-"}</Typography.Text>,
    },
  ] : [];

  const handleCancel = () => {
    if (feasibilityStudyId) {
      navigate(`/master-data/feasibility-studies/${feasibilityStudyId}`);
    } else {
      navigate("/master-data/feasibility-studies");
    }
  };

  const handleSubmitWithConfirmation = () => {
    form.validateFields().then((values) => {
      Modal.confirm({
        title: 'Konfirmasi Tambah Approver & Viewer',
        width: 800,
        content: (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Typography.Text strong>
                {feasibilityStudy 
                  ? "Apakah Anda yakin ingin menambahkan Approver & Viewer untuk feasibility study ini?"
                  : "Apakah Anda yakin ingin menambahkan Approver & Viewer baru?"
                }
              </Typography.Text>
            </div>
            
            {feasibilityStudy ? (
              <>
                <Section title="Basic Information">
                  <Descriptions
                    bordered
                    layout="horizontal"
                    items={basicInfoItems}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </Section>
                
                <Section title="Financial Information">
                  <Descriptions
                    bordered
                    layout="horizontal"
                    items={financialItems}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </Section>
              </>
            ) : (
              <>
                <Section title="Basic Information">
                  <Descriptions
                    bordered
                    layout="horizontal"
                    items={[
                      {
                        key: "investment_name",
                        label: "Investment Name",
                        children: <Typography.Text strong>Digital Transformation Platform</Typography.Text>,
                      },
                      {
                        key: "company",
                        label: "Company",
                        children: <Typography.Text strong>PT Mind ID Indonesia</Typography.Text>,
                      },
                      {
                        key: "investment_code",
                        label: "Investment Code",
                        children: <Typography.Text strong>DTP-2024-001</Typography.Text>,
                      },
                      {
                        key: "project_code",
                        label: "Project Code",
                        children: <Typography.Text strong>PRJ-DTP-001</Typography.Text>,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </Section>
                
                <Section title="Financial Information">
                  <Descriptions
                    bordered
                    layout="horizontal"
                    items={[
                      {
                        key: "capex",
                        label: "CAPEX",
                        children: <Typography.Text strong>{formatCurrency(50000000000)}</Typography.Text>,
                      },
                      {
                        key: "opex",
                        label: "OPEX",
                        children: <Typography.Text strong>{formatCurrency(8000000000)}</Typography.Text>,
                      },
                      {
                        key: "npv",
                        label: "NPV",
                        children: <Typography.Text strong>{formatCurrency(12000000000)}</Typography.Text>,
                      },
                      {
                        key: "irr",
                        label: "IRR",
                        children: <Typography.Text strong>22.5%</Typography.Text>,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </Section>
              </>
            )}
          </Space>
        ),
        okText: 'Lanjutkan',
        cancelText: 'Batal',
        onOk() {
          if (formProps.onFinish) {
            formProps.onFinish(values);
          }
        },
      });
    }).catch((error) => {
      // Validation failed - form will show errors automatically
    });
  };

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Approver & Viewer Information">
          <Row gutter={16}>
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
                <Select 
                  placeholder="Pilih Perusahaan"
                  options={companyOptions}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tim Project"
                name="tim_project"
                rules={[
                  {
                    required: true,
                    message: "Tim Project is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Pilih Tim Project"
                  options={timProjectOptions}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="Approver PMO AH" required>
                <Form.List
                  name="approver_pmo_ah"
                  rules={[
                    {
                      validator: async (_, approvers) => {
                        if (!approvers || approvers.length < 1) {
                          return Promise.reject(new Error('At least one Approver PMO AH is required'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          required={false}
                          key={field.key}
                          style={{ marginBottom: 8 }}
                        >
                          <Flex gap={8}>
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  message: "Approver PMO AH is required",
                                },
                              ]}
                              noStyle
                            >
                              <Select 
                                placeholder="Pilih Approver PMO AH"
                                options={pmoAhUsers}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                              />
                            </Form.Item>
                            {fields.length > 1 && (
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => remove(field.name)}
                              />
                            )}
                          </Flex>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Tambah Approver PMO AH
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Approver PMO Mind ID" required>
                <Form.List
                  name="approver_pmo_mind_id"
                  rules={[
                    {
                      validator: async (_, approvers) => {
                        if (!approvers || approvers.length < 1) {
                          return Promise.reject(new Error('At least one Approver PMO Mind ID is required'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          required={false}
                          key={field.key}
                          style={{ marginBottom: 8 }}
                        >
                          <Flex gap={8}>
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  message: "Approver PMO Mind ID is required",
                                },
                              ]}
                              noStyle
                            >
                              <Select 
                                placeholder="Pilih Approver PMO Mind ID"
                                options={pmoMindIdUsers}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                              />
                            </Form.Item>
                            {fields.length > 1 && (
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => remove(field.name)}
                              />
                            )}
                          </Flex>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Tambah Approver PMO Mind ID
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Viewer" required>
                <Form.List
                  name="viewer"
                  rules={[
                    {
                      validator: async (_, viewers) => {
                        if (!viewers || viewers.length < 1) {
                          return Promise.reject(new Error('At least one Viewer is required'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          required={false}
                          key={field.key}
                          style={{ marginBottom: 8 }}
                        >
                          <Flex gap={8}>
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  message: "Viewer is required",
                                },
                              ]}
                              noStyle
                            >
                              <Select 
                                placeholder="Pilih Viewer"
                                options={viewerUsers}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                              />
                            </Form.Item>
                            {fields.length > 1 && (
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => remove(field.name)}
                              />
                            )}
                          </Flex>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Tambah Viewer
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          type="primary" 
          onClick={handleSubmitWithConfirmation} 
          loading={loading}
        >
          {isEdit ? "Update Approver & Viewer" : "Add Approver & Viewer"}
        </Button>
      </Flex>
    </Form>
  );
};
