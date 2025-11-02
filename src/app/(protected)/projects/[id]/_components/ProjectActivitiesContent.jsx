import { useState } from "react";
import { Space, Tag, Button, Flex, Typography, Descriptions, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Section, DataTable } from "admiral";
import { message } from "antd";
import { makeSource } from "@/utils/data-table";
import { ActivityForm } from "@/app/(protected)/projects/_components/activity-form.jsx";
import { projectActivities, getActivityById } from "@/app/(protected)/projects/_data/activities.js";
import { formatDate } from "@/utils/date-format";

const { Text } = Typography;

const ProjectActivitiesContent = ({ id, activitiesData, activitiesLoading, filters, readOnly = false }) => {
  // State to manage view mode: 'list', 'create', 'detail', or 'edit'
  const [viewMode, setViewMode] = useState("list");
  const [selectedActivity, setSelectedActivity] = useState(null);

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

  // Activities table columns
  const activityColumns = [
    {
      dataIndex: "task_id",
      key: "task_id",
      title: "Task ID",
      sorter: true,
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            const activityData = getActivityById(record.id);
            setSelectedActivity(activityData.data);
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
      dataIndex: "fase",
      key: "fase",
      title: "Fase",
      sorter: true,
      width: 140,
      fixed: 'left',
      render: (text) => {
        const colors = {
          "Perencanaan": "blue",
          "Pengembangan": "green",
          "In HPO": "orange",
          "FID": "purple",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "aktivitas_bulan_sebelumnya",
      key: "aktivitas_bulan_sebelumnya",
      title: "Aktivitas Bulan Berjalan",
      sorter: true,
      ellipsis: true,
      width: 300,
      className: 'aktivitas-bulan-berjalan-header',
      onHeaderCell: () => ({
        className: 'aktivitas-bulan-berjalan-header',
      }),
    },
    {
      dataIndex: "status_bulan_sebelumnya",
      key: "status_bulan_sebelumnya",
      title: "Status Berjalan",
      sorter: true,
      width: 140,
      className: 'status-berjalan-header',
      onHeaderCell: () => ({
        className: 'status-berjalan-header',
      }),
      render: (text) => {
        const colors = {
          "Not Started": "default",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "red",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "aktivitas_bulan_berjalan",
      key: "aktivitas_bulan_berjalan",
      title: "Aktivitas Bulan Selanjutnya",
      sorter: true,
      ellipsis: true,
      width: 300,
      className: 'aktivitas-bulan-selanjutnya-header',
      onHeaderCell: () => ({
        className: 'aktivitas-bulan-selanjutnya-header',
      }),
    },
    {
      dataIndex: "status_bulan_berjalan",
      key: "status_bulan_berjalan",
      title: "Status Selanjutnya",
      sorter: true,
      width: 140,
      className: 'status-selanjutnya-header',
      onHeaderCell: () => ({
        className: 'status-selanjutnya-header',
      }),
      render: (text) => {
        const colors = {
          "Not Started": "default",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "red",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "critical_task",
      key: "critical_task",
      title: "Critical Task",
      sorter: true,
      width: 120,
      render: (text) => {
        const isYes = text === "Yes" || text === true;
        return (
          <Tag color={isYes ? "green" : "red"}>
            {isYes ? "Yes" : "No"}
          </Tag>
        );
      },
    },
    ...(!readOnly ? [{
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      width: 120,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Flex>
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                const activityData = getActivityById(record.id);
                setSelectedActivity(activityData.data);
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
      // Update activity logic
      const activityIndex = projectActivities.data.items.findIndex(item => item.id === selectedActivity.id);
      if (activityIndex !== -1) {
        projectActivities.data.items[activityIndex] = {
          ...projectActivities.data.items[activityIndex],
          ...values,
          updated_at: new Date().toISOString(),
        };
        message.success("Activity updated successfully");
      }
    } else {
      // Create activity logic
      const newId = String(Math.max(...projectActivities.data.items.map(item => parseInt(item.id)), 0) + 1);
      const projectActivitiesFiltered = projectActivities.data.items
        .filter(item => item.project_id === id)
        .map(item => {
          const match = item.task_id.match(/TASK-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        });
      
      const lastTaskNumber = projectActivitiesFiltered.length > 0 ? Math.max(...projectActivitiesFiltered) : 0;
      const taskNumber = `TASK-${String(lastTaskNumber + 1).padStart(3, '0')}`;
      
      const newActivity = {
        id: newId,
        project_id: id,
        task_id: taskNumber,
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      projectActivities.data.items.push(newActivity);
      message.success("Activity created successfully");
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
      content: 'Apakah Anda yakin ingin menghapus activity ini?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        const activityIndex = projectActivities.data.items.findIndex(item => item.id === record.id);
        if (activityIndex !== -1) {
          projectActivities.data.items.splice(activityIndex, 1);
          message.success("Activity successfully deleted");
        }
      },
    });
  };

  // Render detail view
  if (viewMode === 'detail' && selectedActivity) {
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
              Activity Details: {selectedActivity.task_id || ""}
            </Text>
          </Flex>
          {!readOnly && (
            <Flex gap={10}>
              <Button
                htmlType="button"
                onClick={() => handleDeleteConfirm(selectedActivity)}
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

        {/* Activity Details */}
        <Section bodyStyle={{ padding: 0 }} bordered={false}>
          <Section title="Basic Information" bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "task_id",
                  label: "Task ID",
                  children: <Text strong>{selectedActivity.task_id ?? "-"}</Text>,
                },
                {
                  key: "fase",
                  label: "Fase",
                  children: (
                    <Tag color={
                      selectedActivity.fase === "Perencanaan" ? "blue" :
                      selectedActivity.fase === "Pengembangan" ? "green" :
                      selectedActivity.fase === "In HPO" ? "orange" :
                      selectedActivity.fase === "FID" ? "purple" : "default"
                    }>
                      {selectedActivity.fase ?? "-"}
                    </Tag>
                  ),
                },
                {
                  key: "bulan_pelaporan",
                  label: "Bulan Pelaporan",
                  children: (
                    <Text strong>{selectedActivity.bulan_pelaporan ? formatDate(selectedActivity.bulan_pelaporan, "MMMM YYYY") : "-"}</Text>
                  ),
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

          <Section title="Activity Progress" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "aktivitas_bulan_sebelumnya",
                  label: "Aktivitas Bulan Berjalan",
                  children: <Text strong>{selectedActivity.aktivitas_bulan_sebelumnya ?? "-"}</Text>,
                },
                {
                  key: "status_bulan_sebelumnya",
                  label: "Status Berjalan",
                  children: (
                    <Tag color={
                      selectedActivity.status_bulan_sebelumnya === "Not Started" ? "default" :
                      selectedActivity.status_bulan_sebelumnya === "In Progress" ? "blue" :
                      selectedActivity.status_bulan_sebelumnya === "Completed" ? "green" :
                      selectedActivity.status_bulan_sebelumnya === "On Hold" ? "orange" :
                      selectedActivity.status_bulan_sebelumnya === "Cancelled" ? "red" : "default"
                    }>
                      {selectedActivity.status_bulan_sebelumnya ?? "-"}
                    </Tag>
                  ),
                },
                {
                  key: "aktivitas_bulan_berjalan",
                  label: "Aktivitas Bulan Selanjutnya",
                  children: <Text strong>{selectedActivity.aktivitas_bulan_berjalan ?? "-"}</Text>,
                },
                {
                  key: "status_bulan_berjalan",
                  label: "Status Selanjutnya",
                  children: (
                    <Tag color={
                      selectedActivity.status_bulan_berjalan === "Not Started" ? "default" :
                      selectedActivity.status_bulan_berjalan === "In Progress" ? "blue" :
                      selectedActivity.status_bulan_berjalan === "Completed" ? "green" :
                      selectedActivity.status_bulan_berjalan === "On Hold" ? "orange" :
                      selectedActivity.status_bulan_berjalan === "Cancelled" ? "red" : "default"
                    }>
                      {selectedActivity.status_bulan_berjalan ?? "-"}
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

          <Section title="Activity Details" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "pic_aktivitas",
                  label: "PIC Aktivitas",
                  children: <Text strong>{selectedActivity.pic_aktivitas ?? "-"}</Text>,
                },
                {
                  key: "tanggal_aktivitas",
                  label: "Tanggal Aktivitas",
                  children: (
                    <Text strong>{selectedActivity.tanggal_aktivitas ? formatDate(selectedActivity.tanggal_aktivitas) : "-"}</Text>
                  ),
                },
                {
                  key: "aktivitas",
                  label: "Aktivitas",
                  children: <Text strong>{selectedActivity.aktivitas ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "critical_task",
                  label: "Critical Task",
                  children: (
                    <Tag color={selectedActivity.critical_task ? "green" : "red"}>
                      {selectedActivity.critical_task ? "Yes" : "No"}
                    </Tag>
                  ),
                },
                {
                  key: "latest_modified",
                  label: "Latest Modified",
                  children: (
                    <Text strong>{selectedActivity.latest_modified ? formatDate(selectedActivity.latest_modified) : "-"}</Text>
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

          <Section title="Documentation" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "keterangan_foto",
                  label: "Keterangan Foto",
                  children: <Text strong>{selectedActivity.keterangan_foto ?? "-"}</Text>,
                  span: 2,
                },
                {
                  key: "keterangan",
                  label: "Keterangan",
                  children: <Text strong>{selectedActivity.keterangan ?? "-"}</Text>,
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

          <Section title="System Information" style={{ marginTop: 24 }} bodyStyle={{ padding: 24 }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '200px' }}
              contentStyle={{ width: 'calc(50% - 200px)' }}
              items={[
                {
                  key: "created_at",
                  label: "Created At",
                  children: (
                    <Text strong>{selectedActivity.created_at ? formatDate(selectedActivity.created_at) : "-"}</Text>
                  ),
                },
                {
                  key: "updated_at",
                  label: "Updated At",
                  children: (
                    <Text strong>{selectedActivity.updated_at ? formatDate(selectedActivity.updated_at) : "-"}</Text>
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
          <Text strong style={{ fontSize: '18px' }}>Create New Activity</Text>
        </Flex>

        <ActivityForm
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
  if (viewMode === 'edit' && selectedActivity) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" gap={12} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          />
          <Text strong style={{ fontSize: '18px' }}>Edit Activity: {selectedActivity.task_id || ""}</Text>
        </Flex>

        <ActivityForm
          formProps={{}}
          error={null}
          loading={false}
          isEdit={true}
          isView={false}
          initialData={selectedActivity}
          onSubmit={handleFormSubmit}
        />
      </Space>
    );
  }

  // Render list view
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Activities List with Create Button */}
      <Section bodyStyle={{ padding: 24 }}>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '16px' }}>Current Activities</Text>
          {!readOnly && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setViewMode('create')}>
              Add New Activity
            </Button>
          )}
        </Flex>
      </Section>
      
      <Section bodyStyle={{ padding: 0 }} bordered={false}>
        <DataTable
          rowKey="id"
          loading={activitiesLoading || activitiesData.loading}
          source={makeSource(activitiesData.data)}
          columns={activityColumns}
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

export default ProjectActivitiesContent;
