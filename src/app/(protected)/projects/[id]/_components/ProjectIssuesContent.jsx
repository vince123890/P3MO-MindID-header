import { useState } from "react";
import { Space, Tag, Button, Flex, Typography, Descriptions, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { message } from "antd";
import { makeSource } from "@/utils/data-table";
import { IssueForm } from "../../_components/issue-form.jsx";
import { getIssueById } from "@/app/(protected)/projects/_data/issues.js";
import { formatDate } from "@/utils/date-format.js";

const { Text } = Typography;

const ProjectIssuesContent = ({ id, issuesData, issuesLoading, filters, readOnly = false }) => {
  // State to manage view mode: 'list', 'create', 'detail', or 'edit'
  const [viewMode, setViewMode] = useState('list');
  const [selectedIssue, setSelectedIssue] = useState(null);
  
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

  // Issues table columns
  const issueColumns = [
    {
      dataIndex: "wbs_task_id",
      key: "wbs_task_id",
      title: "WBS/Task ID",
      sorter: true,
      width: 150,
      fixed: "left",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            const issueData = getIssueById(record.id);
            setSelectedIssue(issueData.data);
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
      dataIndex: "aktivitas_master_schedule",
      key: "aktivitas_master_schedule",
      title: "Aktivitas di Master Schedule",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "kategori_issue",
      key: "kategori_issue",
      title: "Kategori Issue",
      sorter: true,
      width: 160,
      render: (text) => {
        const colors = {
          "Technical": "blue",
          "Logistical": "orange", 
          "Environmental": "green",
          "Resource": "purple",
          "Safety": "red",
          "Financial": "gold",
          "Regulatory": "cyan",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "tipe_issue",
      key: "tipe_issue",
      title: "Tipe Issue",
      sorter: true,
      width: 160,
    },
    {
      dataIndex: "deskripsi_issue",
      key: "deskripsi_issue",
      title: "Deskripsi Issue",
      sorter: true,
      ellipsis: true,
      width: 300,
    },
    {
      dataIndex: "progress_update",
      key: "progress_update",
      title: "Progress Update",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "deadline",
      key: "deadline",
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
      dataIndex: "status_issue",
      key: "status_issue",
      title: "Status",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "Open": "red",
          "In Progress": "blue",
          "Resolved": "green",
          "Closed": "default",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "prioritas_issue",
      key: "prioritas_issue",
      title: "Priority",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "High": "red",
          "Medium": "orange",
          "Low": "green",
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
                const issueData = getIssueById(record.id);
                setSelectedIssue(issueData.data);
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
      message.success("Issue updated successfully");
    } else {
      message.success("Issue created successfully");
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
      content: 'Apakah Anda yakin ingin menghapus issue ini?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        message.success("Issue successfully deleted");
      },
    });
  };

  // Render detail view
  if (viewMode === 'detail' && selectedIssue) {
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
              Issue Details: {selectedIssue.nomor_issue || selectedIssue.wbs_task_id || ""}
            </Text>
          </Flex>
          {!readOnly && (
            <Flex gap={10}>
              <Button
                htmlType="button"
                onClick={() => handleDeleteConfirm(selectedIssue)}
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

        {/* Issue Details */}
        <Section bodyStyle={{ padding: 0 }} bordered={false}>
          <Section title="Issue Information" bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "wbs_task_id",
                  label: "Nomor Issue/Task ID",
                  children: <Text strong>{selectedIssue.wbs_task_id ?? "-"}</Text>,
                },
                {
                  key: "aktivitas_master_schedule",
                  label: "Aktivitas di Master Schedule",
                  children: <Text strong>{selectedIssue.aktivitas_master_schedule ?? "-"}</Text>,
                },
                {
                  key: "tanggal_issue",
                  label: "Tanggal Issue",
                  children: (
                    <Text strong>{selectedIssue.tanggal_issue ? formatDate(selectedIssue.tanggal_issue) : "-"}</Text>
                  ),
                },
                {
                  key: "kategori_issue",
                  label: "Kategori Issue",
                  children: (
                    <Tag color={
                      selectedIssue.kategori_issue === "Technical" ? "blue" :
                      selectedIssue.kategori_issue === "Logistical" ? "orange" :
                      selectedIssue.kategori_issue === "Environmental" ? "green" :
                      selectedIssue.kategori_issue === "Resource" ? "purple" :
                      selectedIssue.kategori_issue === "Safety" ? "red" :
                      selectedIssue.kategori_issue === "Financial" ? "gold" :
                      selectedIssue.kategori_issue === "Regulatory" ? "cyan" : "default"
                    }>
                      {selectedIssue.kategori_issue ?? "-"}
                    </Tag>
                  ),
                },
                {
                  key: "status_issue",
                  label: "Status Issue",
                  children: (
                    <Tag color={
                      selectedIssue.status_issue === "Open" ? "red" :
                      selectedIssue.status_issue === "In Progress" ? "blue" :
                      selectedIssue.status_issue === "Resolved" ? "green" :
                      "default"
                    }>
                      {selectedIssue.status_issue ?? "-"}
                    </Tag>
                  ),
                },
                {
                  key: "tipe_issue",
                  label: "Tipe Issue",
                  children: <Text strong>{selectedIssue.tipe_issue ?? "-"}</Text>,
                },
                {
                  key: "deskripsi_issue",
                  label: "Deskripsi Issue",
                  children: <Text strong>{selectedIssue.deskripsi_issue ?? "-"}</Text>,
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
          </Section>
          
          <Section title="Resolution & Update Summary" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
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
                
                {/* Issue Detail Section - Moved here and using same component style as Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Issue Detail
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "dampak_issue",
                        label: "Dampak Issue",
                        children: <Text strong>{selectedIssue.dampak_issue ?? "-"}</Text>,
                        span: 2,
                      },
                      {
                        key: "pic",
                        label: "PIC",
                        children: <Text strong>{selectedIssue.pic ?? "-"}</Text>,
                      },
                      {
                        key: "prioritas_issue",
                        label: "Prioritas Issue",
                        children: (
                          <Tag color={
                            selectedIssue.prioritas_issue === "High" ? "red" :
                            selectedIssue.prioritas_issue === "Medium" ? "orange" :
                            selectedIssue.prioritas_issue === "Low" ? "green" : "default"
                          }>
                            {selectedIssue.prioritas_issue ?? "-"}
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

                {/* Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Resolution Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "resolution",
                        label: "Resolution",
                        children: <Text strong>{selectedIssue.resolution ?? "-"}</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_resolution",
                        label: "Deadline Resolution",
                        children: (
                          <Text strong>{selectedIssue.deadline_resolution ? formatDate(selectedIssue.deadline_resolution) : "-"}</Text>
                        ),
                      },
                      {
                        key: "deadline",
                        label: "Deadline",
                        children: (
                          <Text strong>{selectedIssue.deadline ? formatDate(selectedIssue.deadline) : "-"}</Text>
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
                        key: "issue_update",
                        label: "Issue Update",
                        children: <Text strong>{selectedIssue.issue_update ?? "-"}</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini",
                        label: "Tanggal Update Terkini",
                        children: (
                          <Text strong>{selectedIssue.tanggal_update_terkini ? formatDate(selectedIssue.tanggal_update_terkini) : "-"}</Text>
                        ),
                      },
                      {
                        key: "progress_update",
                        label: "Progress Update",
                        children: <Text strong>{selectedIssue.progress_update ?? "-"}</Text>,
                      },
                      {
                        key: "keterangan",
                        label: "Keterangan",
                        children: <Text strong>{selectedIssue.keterangan ?? "-"}</Text>,
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
                
                {/* Issue Detail Section - Using same component style as Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Issue Detail
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "dampak_issue_2",
                        label: "Dampak Issue",
                        children: <Text strong>Equipment delay affecting project timeline by 2 weeks</Text>,
                        span: 2,
                      },
                      {
                        key: "pic_2",
                        label: "PIC",
                        children: <Text strong>Jane Smith</Text>,
                      },
                      {
                        key: "prioritas_issue_2",
                        label: "Prioritas Issue",
                        children: (
                          <Tag color="orange">
                            Medium
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

                {/* Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Resolution Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "resolution_2",
                        label: "Resolution",
                        children: <Text strong>Follow up with vendor for expedited delivery</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_resolution_2",
                        label: "Deadline Resolution",
                        children: <Text strong>15/01/2025</Text>,
                      },
                      {
                        key: "deadline_2",
                        label: "Deadline",
                        children: <Text strong>20/01/2025</Text>,
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
                        key: "issue_update_2",
                        label: "Issue Update",
                        children: <Text strong>Vendor confirmed they will prioritize our order</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini_2",
                        label: "Tanggal Update Terkini",
                        children: <Text strong>10/01/2025</Text>,
                      },
                      {
                        key: "progress_update_2",
                        label: "Progress Update",
                        children: <Text strong>60% Complete</Text>,
                      },
                      {
                        key: "keterangan_2",
                        label: "Keterangan",
                        children: <Text strong>Payment processed, awaiting shipment confirmation</Text>,
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
                
                {/* Issue Detail Section - Using same component style as Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Issue Detail
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "dampak_issue_3",
                        label: "Dampak Issue",
                        children: <Text strong>Resource allocation conflict between two project teams</Text>,
                        span: 2,
                      },
                      {
                        key: "pic_3",
                        label: "PIC",
                        children: <Text strong>Mike Johnson</Text>,
                      },
                      {
                        key: "prioritas_issue_3",
                        label: "Prioritas Issue",
                        children: (
                          <Tag color="red">
                            High
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

                {/* Resolution Plan */}
                <div style={{ marginBottom: '16px' }}>
                  <Typography.Text strong style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                    Resolution Plan
                  </Typography.Text>
                  <Descriptions
                    bordered
                    layout="horizontal"
                    labelStyle={{ width: '200px' }}
                    contentStyle={{ width: 'calc(50% - 200px)' }}
                    items={[
                      {
                        key: "resolution_3",
                        label: "Resolution",
                        children: <Text strong>Schedule team meeting to review progress and adjust timeline</Text>,
                        span: 2,
                      },
                      {
                        key: "deadline_resolution_3",
                        label: "Deadline Resolution",
                        children: <Text strong>25/01/2025</Text>,
                      },
                      {
                        key: "deadline_3",
                        label: "Deadline",
                        children: <Text strong>30/01/2025</Text>,
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
                        key: "issue_update_3",
                        label: "Issue Update",
                        children: <Text strong>Team meeting scheduled for next week</Text>,
                        span: 2,
                      },
                      {
                        key: "tanggal_update_terkini_3",
                        label: "Tanggal Update Terkini",
                        children: <Text strong>12/01/2025</Text>,
                      },
                      {
                        key: "progress_update_3",
                        label: "Progress Update",
                        children: <Text strong>30% Complete</Text>,
                      },
                      {
                        key: "keterangan_3",
                        label: "Keterangan",
                        children: <Text strong>Preparing detailed timeline analysis for review</Text>,
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
          <Text strong style={{ fontSize: '18px' }}>Create New Issue</Text>
        </Flex>

        <IssueForm
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
  if (viewMode === 'edit' && selectedIssue) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" gap={12} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          />
          <Text strong style={{ fontSize: '18px' }}>Edit Issue: {selectedIssue.nomor_issue || selectedIssue.wbs_task_id || ""}</Text>
        </Flex>

        <IssueForm
          formProps={{}}
          error={null}
          loading={false}
          isEdit={true}
          isView={false}
          initialData={selectedIssue}
          onSubmit={handleFormSubmit}
        />
      </Space>
    );
  }

  // Render list view
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Issues List with Create Button */}
      <Section bodyStyle={{ padding: 24 }}>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '16px' }}>Project Issues</Text>
          {!readOnly && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setViewMode('create')}>
              Create Issue
            </Button>
          )}
        </Flex>
      </Section>
      
      <Section bodyStyle={{ padding: 0 }} bordered={false}>
        <DataTable
          rowKey="id"
          loading={issuesLoading || issuesData.loading}
          source={makeSource(issuesData.data)}
          columns={issueColumns}
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

export default ProjectIssuesContent;
