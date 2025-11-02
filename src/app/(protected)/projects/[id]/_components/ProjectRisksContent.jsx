import { useState } from "react";
import { Space, Tag, Button, Flex, Typography, Descriptions, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { message } from "antd";
import { makeSource } from "@/utils/data-table";
import { RiskForm } from "../../_components/risk-form.jsx";
import { formatDate } from "@/utils/date-format.js";

const { Text } = Typography;

const ProjectRisksContent = ({ id, risksData, risksLoading, filters, readOnly = false }) => {
  // State to manage view mode: 'list', 'create', 'detail', or 'edit'
  const [viewMode, setViewMode] = useState('list');
  const [selectedRisk, setSelectedRisk] = useState(null);
  
  // Safe filter value extraction with error handling
  const getSearchValue = () => {
    try {
      if (!filters) return "";
      if (typeof filters.search === 'string') return filters.search;
      if (filters.search && typeof filters.search.toString === 'function') {
        return filters.search.toString();
      }
      return "";
    } catch (error) {
      console.warn("Error extracting search value:", error);
      return "";
    }
  };

  // Risks table columns
  const riskColumns = [
    {
      dataIndex: "nomor_resiko",
      key: "nomor_resiko",
      title: "Taksonomi Resiko",
      sorter: true,
      width: 150,
      fixed: "left",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedRisk(record);
            setViewMode('detail');
          }}
          style={{ 
            color: '#0F1E3A', 
            textDecoration: 'underline',
            textDecorationColor: '#0F1E3A',
            padding: 0,
            height: 'auto',
            textAlign: 'left'
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      dataIndex: "deskripsi_resiko",
      key: "deskripsi_resiko",
      title: "Deskripsi Resiko",
      sorter: true,
      ellipsis: true,
      width: 300,
    },
    {
      dataIndex: "dampak_resiko",
      key: "dampak_resiko",
      title: "Dampak Resiko",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "level_resiko",
      key: "level_resiko",
      title: "Level Resiko",
      sorter: true,
      width: 140,
      render: (_, record) => {
        const level = `${record.prioritas_resiko} (${record.skor_resiko}/10)`;
        const colors = {
          "Critical": "red",
          "High": "orange",
          "Medium": "gold",
          "Low": "green",
        };
        return <Tag color={colors[record.prioritas_resiko] || "default"}>{level}</Tag>;
      },
    },
    {
      dataIndex: "rencana_mitigasi",
      key: "rencana_mitigasi",
      title: "Mitigasi Resiko",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "deadline_mitigasi",
      key: "deadline_mitigasi",
      title: "Deadline",
      sorter: true,
      width: 140,
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY") : "-",
    },
    {
      dataIndex: "pic",
      key: "pic",
      title: "PIC",
      sorter: true,
      width: 140,
    },
    {
      dataIndex: "status_mitigasi",
      key: "status_mitigasi",
      title: "Status",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "Open": "red",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "default",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    ...(!readOnly ? [{
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <Flex>
            <Button 
              type="link" 
              icon={<EditOutlined />} 
              size="small" 
              onClick={() => {
                setSelectedRisk(record);
                setViewMode('edit');
              }}
            />
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              size="small"
              onClick={() => handleDeleteConfirm(record)}
            />
          </Flex>
        );
      },
    }] : []),
  ];

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Check if this is a cancel action
    if (values && values.__cancel) {
      setViewMode('list');
      return;
    }
    
    if (viewMode === 'edit') {
      message.success("Risk updated successfully");
    } else {
      message.success("Risk created successfully");
    }
    setViewMode('list');
  };

  // Handle back button
  const handleBack = () => {
    setViewMode('list');
  };

  // Handle edit button from detail view
  const handleEditFromDetail = () => {
    setViewMode('edit');
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Konfirmasi Hapus',
      content: 'Apakah Anda yakin ingin menghapus resiko ini?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        message.success("Risk successfully deleted");
      },
    });
  };

  // Render detail view
  if (viewMode === 'detail' && selectedRisk) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button and actions */}
        <Flex align="center" justify="space-between" style={{ width: '100%', paddingTop: '16px', paddingBottom: '16px' }}>
          <Flex align="center" gap={12}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              type="text"
            />
            <Text strong style={{ fontSize: '18px' }}>
              Risk Details: {selectedRisk.nomor_resiko || ""}
            </Text>
          </Flex>
          {!readOnly && (
            <Flex gap={10}>
              <Button
                htmlType="button"
                onClick={() => handleDeleteConfirm(selectedRisk)}
                danger
              >
                Delete
              </Button>
              <Button
                htmlType="button"
                type="primary"
                onClick={handleEditFromDetail}
              >
                Edit
              </Button>
            </Flex>
          )}
        </Flex>

        {/* Risk Details */}
        <Section bodyStyle={{ padding: 0 }} bordered={false}>
          <Section title="Risk Identification" bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "nomor_resiko",
                  label: "Nomor Resiko",
                  children: <Text strong>{selectedRisk.nomor_resiko ?? "-"}</Text>,
                },
                {
                  key: "tanggal_identifikasi_resiko",
                  label: "Tanggal Identifikasi Resiko",
                  children: (
                    <Text strong>{selectedRisk.tanggal_identifikasi_resiko ? formatDate(selectedRisk.tanggal_identifikasi_resiko) : "-"}</Text>
                  ),
                },
                {
                  key: "kategori_resiko",
                  label: "Kategori Resiko",
                  children: <Text strong>{selectedRisk.kategori_resiko ?? "-"}</Text>,
                },
                {
                  key: "probabilitas_resiko",
                  label: "Probabilitas Resiko",
                  children: <Text strong>{selectedRisk.probabilitas_resiko ?? "-"}</Text>,
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
          
          <Section title="Risk Description" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "deskripsi_resiko",
                  label: "Deskripsi Resiko",
                  children: <Text strong>{selectedRisk.deskripsi_resiko ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "dampak_resiko",
                  label: "Dampak Resiko",
                  children: <Text strong>{selectedRisk.dampak_resiko ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "tingkat_dampak",
                  label: "Tingkat Dampak",
                  children: <Text strong>{selectedRisk.tingkat_dampak ?? "-"}</Text>,
                },
                {
                  key: "skor_resiko",
                  label: "Skor Resiko",
                  children: <Text strong>{selectedRisk.skor_resiko ?? "-"}/10</Text>,
                },
                {
                  key: "prioritas_resiko",
                  label: "Prioritas Resiko",
                  children: (
                    <Tag color={
                      selectedRisk.prioritas_resiko === "Critical" ? "red" :
                      selectedRisk.prioritas_resiko === "High" ? "orange" :
                      selectedRisk.prioritas_resiko === "Medium" ? "gold" :
                      selectedRisk.prioritas_resiko === "Low" ? "green" : "default"
                    }>
                      {selectedRisk.prioritas_resiko ?? "-"}
                    </Tag>
                  ),
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
          
          <Section title="Mitigation Plan" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "rencana_mitigasi",
                  label: "Rencana Mitigasi",
                  children: <Text strong>{selectedRisk.rencana_mitigasi ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "status_mitigasi",
                  label: "Status Mitigasi",
                  children: (
                    <Tag color={
                      selectedRisk.status_mitigasi === "Open" ? "red" :
                      selectedRisk.status_mitigasi === "In Progress" ? "blue" :
                      selectedRisk.status_mitigasi === "Completed" ? "green" :
                      selectedRisk.status_mitigasi === "On Hold" ? "orange" : "default"
                    }>
                      {selectedRisk.status_mitigasi ?? "-"}
                    </Tag>
                  ),
                },
                {
                  key: "deadline_mitigasi",
                  label: "Deadline Mitigasi",
                  children: (
                    <Text strong>{selectedRisk.deadline_mitigasi ? formatDate(selectedRisk.deadline_mitigasi) : "-"}</Text>
                  ),
                },
                {
                  key: "pic",
                  label: "PIC",
                  children: <Text strong>{selectedRisk.pic ?? "-"}</Text>,
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
          
          <Section title="Mitigation & Update Summary" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Entry 1 */}
              <div style={{ 
                border: '1px solid #d9d9d9', 
                borderRadius: '6px', 
                padding: '16px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e8e8e8'
                }}>
                  <Typography.Text strong style={{ fontSize: "14px" }}>
                    Entry 1
                  </Typography.Text>
                </div>
                
                {/* Mitigation Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Mitigation Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "rencana_mitigasi",
                        label: "Rencana Mitigasi",
                        children: <Text strong>{selectedRisk.rencana_mitigasi ?? "-"}</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_mitigasi",
                        label: "Deadline Mitigasi",
                        children: (
                          <Text strong>{selectedRisk.deadline_mitigasi ? formatDate(selectedRisk.deadline_mitigasi) : "-"}</Text>
                        ),
                      },
                      {
                        key: "status_mitigasi",
                        label: "Status Mitigasi",
                        children: (
                          <Tag color={
                            selectedRisk.status_mitigasi === "Open" ? "red" :
                            selectedRisk.status_mitigasi === "In Progress" ? "blue" :
                            selectedRisk.status_mitigasi === "Completed" ? "green" :
                            selectedRisk.status_mitigasi === "On Hold" ? "orange" : "default"
                          }>
                            {selectedRisk.status_mitigasi ?? "-"}
                          </Tag>
                        ),
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>

                {/* Update Information */}
                <div>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Update Information
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "update_mitigasi",
                        label: "Update Mitigasi",
                        children: <Text strong>{selectedRisk.update_mitigasi ?? "-"}</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini",
                        label: "Tanggal Update Terkini",
                        children: (
                          <Text strong>{selectedRisk.tanggal_update_terkini ? formatDate(selectedRisk.tanggal_update_terkini) : "-"}</Text>
                        ),
                      },
                      {
                        key: "pic",
                        label: "PIC",
                        children: <Text strong>{selectedRisk.pic ?? "-"}</Text>,
                      },
                      {
                        key: "keterangan",
                        label: "Keterangan",
                        children: <Text strong>{selectedRisk.keterangan ?? "-"}</Text>,
                        span: 2,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>
              </div>

              {/* Entry 2 */}
              <div style={{ 
                border: '1px solid #d9d9d9', 
                borderRadius: '6px', 
                padding: '16px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e8e8e8'
                }}>
                  <Typography.Text strong style={{ fontSize: "14px" }}>
                    Entry 2
                  </Typography.Text>
                </div>
                
                {/* Mitigation Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Mitigation Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "rencana_mitigasi_2",
                        label: "Rencana Mitigasi",
                        children: <Text strong>Implement backup power system and conduct regular testing</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_mitigasi_2",
                        label: "Deadline Mitigasi",
                        children: <Text strong>15/02/2025</Text>,
                      },
                      {
                        key: "status_mitigasi_2",
                        label: "Status Mitigasi",
                        children: <Tag color="blue">In Progress</Tag>,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>

                {/* Update Information */}
                <div>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Update Information
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "update_mitigasi_2",
                        label: "Update Mitigasi",
                        children: <Text strong>Backup system procurement completed, installation scheduled</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini_2",
                        label: "Tanggal Update Terkini",
                        children: <Text strong>05/02/2025</Text>,
                      },
                      {
                        key: "pic_2",
                        label: "PIC",
                        children: <Text strong>Technical Team Lead</Text>,
                      },
                      {
                        key: "keterangan_2",
                        label: "Keterangan",
                        children: <Text strong>Installation crew booked for next week</Text>,
                        span: 2,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>
              </div>

              {/* Entry 3 */}
              <div style={{ 
                border: '1px solid #d9d9d9', 
                borderRadius: '6px', 
                padding: '16px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e8e8e8'
                }}>
                  <Typography.Text strong style={{ fontSize: "14px" }}>
                    Entry 3
                  </Typography.Text>
                </div>
                
                {/* Mitigation Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Mitigation Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "rencana_mitigasi_3",
                        label: "Rencana Mitigasi",
                        children: <Text strong>Review and update risk assessment quarterly</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_mitigasi_3",
                        label: "Deadline Mitigasi",
                        children: <Text strong>28/02/2025</Text>,
                      },
                      {
                        key: "status_mitigasi_3",
                        label: "Status Mitigasi",
                        children: <Tag color="red">Open</Tag>,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>

                {/* Update Information */}
                <div>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Update Information
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "update_mitigasi_3",
                        label: "Update Mitigasi",
                        children: <Text strong>Awaiting stakeholder review meeting</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini_3",
                        label: "Tanggal Update Terkini",
                        children: <Text strong>01/02/2025</Text>,
                      },
                      {
                        key: "pic_3",
                        label: "PIC",
                        children: <Text strong>Risk Manager</Text>,
                      },
                      {
                        key: "keterangan_3",
                        label: "Keterangan",
                        children: <Text strong>Meeting invitation sent to all stakeholders</Text>,
                        span: 2,
                      },
                    ]}
                    column={{
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                  />
                </div>
              </div>
            </Space>
          </Section>
        </Section>
      </Space>
    );
  }

  // Render create form view
  if (viewMode === 'create') {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" gap={12} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          />
          <Text strong style={{ fontSize: '18px' }}>Create New Risk</Text>
        </Flex>

        <RiskForm
          formProps={{}}
          error={null}
          loading={false}
          isEdit={false}
          isView={false}
          initialData={null}
          onSubmit={handleFormSubmit}
        />
      </Space>
    );
  }

  // Render edit form view
  if (viewMode === 'edit' && selectedRisk) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" gap={12} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          />
          <Text strong style={{ fontSize: '18px' }}>Edit Risk: {selectedRisk.nomor_resiko || ""}</Text>
        </Flex>

        <RiskForm
          formProps={{}}
          error={null}
          loading={false}
          isEdit={true}
          isView={false}
          initialData={selectedRisk}
          onSubmit={handleFormSubmit}
        />
      </Space>
    );
  }

  // Render list view
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Risks List with Create Button */}
      <Section bodyStyle={{ padding: 24 }}>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '16px' }}>Project Risks</Text>
          {!readOnly && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setViewMode('create')}>
              Create Risk
            </Button>
          )}
        </Flex>
      </Section>
      
      <Section bodyStyle={{ padding: 0 }} bordered={false}>
        <DataTable
          rowKey="id"
          loading={risksLoading || risksData.loading}
          source={makeSource(risksData.data)}
          columns={riskColumns}
          search={getSearchValue()}
          hideSearch
          showRowSelection={false}
          scroll={{ x: 1200 }}
          pagination={{
            sticky: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Section>
    </Space>
  );
};

export default ProjectRisksContent;
