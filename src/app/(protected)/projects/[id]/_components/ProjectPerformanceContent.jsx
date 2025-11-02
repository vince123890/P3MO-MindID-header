import React, { useState } from "react";
import {
  Form,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Card,
  message,
  Upload,
  Table,
  Modal,
  Input,
  DatePicker,
  Image,
  Popconfirm,
  Tag,
  Descriptions
} from "antd";
import {
  EditOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  CameraOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { Section } from "admiral";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

const ProjectPerformanceContent = ({ project, readOnly = false }) => {
  const [form] = Form.useForm();
  const [photoForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [isViewingPhoto, setIsViewingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [currentFileType, setCurrentFileType] = useState("");
  const [photos, setPhotos] = useState([
    {
      id: 1,
      foto_proyek: "project_photo_1.jpg",
      tanggal_proyek: "2025-01-15",
      keterangan_foto: <span style={{ color: "#0F1E3A" }}>Progress pembangunan pondasi utama gedung</span>,
      preview_url: "https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+1"
    },
    {
      id: 2,
      foto_proyek: "project_photo_2.jpg",
      tanggal_proyek: "2025-01-20",
      keterangan_foto: <span style={{ color: "#0F1E3A" }}>Instalasi struktur baja lantai 2</span>,
      preview_url: "https://via.placeholder.com/300x200/52c41a/ffffff?text=Project+Photo+2"
    }
  ]);

  // Sample performance data
  const [performanceData, setPerformanceData] = useState({
    project_schedule_actual: "schedule_actual_2025.xlsx",
    project_cost_actual: "cost_actual_2025.xlsx",
    total_labour: "250",
    last_updated: "2025-01-20"
  });

  React.useEffect(() => {
    form.setFieldsValue(performanceData);
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving performance data:", values);
      setPerformanceData(values);
      message.success("Performance data saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(performanceData);
    setIsEditing(false);
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

  // Photo Management Functions
  const handleAddPhoto = () => {
    setEditingPhoto(null);
    photoForm.resetFields();
    setIsAddingPhoto(true);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    photoForm.setFieldsValue({
      foto_proyek: photo.foto_proyek,
      tanggal_proyek: dayjs(photo.tanggal_proyek),
      keterangan_foto: photo.keterangan_foto
    });
    setIsAddingPhoto(true);
  };

  const handleViewPhoto = (photo) => {
    setViewingPhoto(photo);
    setIsViewingPhoto(true);
  };

  const handleClosePhotoDetail = () => {
    setViewingPhoto(null);
    setIsViewingPhoto(false);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
    message.success("Photo deleted successfully!");
  };

  const handlePhotoModalSave = async () => {
    try {
      const values = await photoForm.validateFields();
      
      if (editingPhoto) {
        // Handle multiple photos in edit mode
        const uploadedFiles = values.foto_proyek?.fileList || [];
        
        if (uploadedFiles.length > 0) {
          // Remove the original photo and add new ones
          const otherPhotos = photos.filter(photo => photo.id !== editingPhoto.id);
          const newPhotos = uploadedFiles.map((file, index) => ({
            id: Math.max(...photos.map(p => p.id), 0) + index + 1,
            foto_proyek: file.name,
            tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
            keterangan_foto: values.keterangan_foto,
            preview_url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : `https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+${Math.max(...photos.map(p => p.id), 0) + index + 1}`
          }));
          
          setPhotos([...otherPhotos, ...newPhotos]);
          message.success(`${newPhotos.length} photos updated successfully!`);
        } else {
          // Update existing photo with new details (no new files uploaded)
          setPhotos(photos.map(photo => 
            photo.id === editingPhoto.id 
              ? {
                  ...photo,
                  tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
                  keterangan_foto: values.keterangan_foto
                }
              : photo
          ));
          message.success("Photo updated successfully!");
        }
      } else {
        // Add multiple photos
        const uploadedFiles = values.foto_proyek?.fileList || [];
        
        if (uploadedFiles.length > 0) {
          const newPhotos = uploadedFiles.map((file, index) => ({
            id: Math.max(...photos.map(p => p.id), 0) + index + 1,
            foto_proyek: file.name,
            tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
            keterangan_foto: values.keterangan_foto,
            preview_url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : `https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+${Math.max(...photos.map(p => p.id), 0) + index + 1}`
          }));
          
          setPhotos([...photos, ...newPhotos]);
          message.success(`${newPhotos.length} photos added successfully!`);
        } else {
          // Fallback for single photo upload (if using input field)
          const newPhoto = {
            id: Math.max(...photos.map(p => p.id), 0) + 1,
            foto_proyek: values.foto_proyek || 'photo.jpg',
            tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
            keterangan_foto: values.keterangan_foto,
            preview_url: `https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+${Math.max(...photos.map(p => p.id), 0) + 1}`
          };
          setPhotos([...photos, newPhoto]);
          message.success("Photo added successfully!");
        }
      }
      
      setIsAddingPhoto(false);
      photoForm.resetFields();
      setEditingPhoto(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePhotoFormCancel = () => {
    setIsAddingPhoto(false);
    photoForm.resetFields();
    setEditingPhoto(null);
  };

  // Photo table columns
  const photoColumns = [
    {
      title: "Keterangan Foto",
      dataIndex: "keterangan_foto",
      key: "keterangan_foto",
      render: (text, record) => (
        <Text 
          ellipsis={{ tooltip: text }} 
          style={{ 
            maxWidth: 300,
            color: "#0958d9",
            textDecoration: "underline",
            cursor: "pointer"
          }}
          onClick={() => handleViewPhoto(record)}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Tanggal Proyek",
      dataIndex: "tanggal_proyek",
      key: "tanggal_proyek",
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    ...(!readOnly ? [{
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#0F1E3A" }} />}
            onClick={() => handleEditPhoto(record)}
            size="small"
            style={{ padding: "4px" }}
          />
          <Popconfirm
            title="Are you sure to delete this photo?"
            onConfirm={() => handleDeletePhoto(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
              size="small"
              style={{ padding: "4px" }}
            />
          </Popconfirm>
        </Space>
      ),
    }] : []),
  ];

  return (
    <Section loading={false} bodyStyle={{ padding: 0 }} bordered={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header */}
        <Section>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ fontSize: "16px" }}>
                Project Performance Tracking
              </Text>
            </Col>
          </Row>
        </Section>

        {/* Performance Data */}
        {isEditing ? (
          <Section>
          <Form
            form={form}
            layout="vertical"
            initialValues={performanceData}
            disabled={!isEditing}
          >
            <Row gutter={[24, 16]}>
              {/* Project Schedule Actual */}
              <Col xs={24} md={12}>
                <Form.Item label="Project Schedule Actual">
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
                      {performanceData.project_schedule_actual ? (
                        <a 
                          href={`/files/${performanceData.project_schedule_actual}`}
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
                            handleFileAction("View/Download", performanceData.project_schedule_actual);
                          }}
                        >
                          <EyeOutlined />
                          {performanceData.project_schedule_actual}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Schedule Actual")}
                      disabled={!isEditing}
                      style={{ height: "40px" }}
                    >
                      Upload
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              {/* Project Cost Actual */}
              <Col xs={24} md={12}>
                <Form.Item label="Project Cost Actual">
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
                      {performanceData.project_cost_actual ? (
                        <a 
                          href={`/files/${performanceData.project_cost_actual}`}
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
                            handleFileAction("View/Download", performanceData.project_cost_actual);
                          }}
                        >
                          <EyeOutlined />
                          {performanceData.project_cost_actual}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Cost Actual")}
                      disabled={!isEditing}
                      style={{ height: "40px" }}
                    >
                      Upload
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              {/* Total Labour */}
              <Col xs={24} md={12}>
                <Form.Item 
                  label="Total Labour"
                  name="total_labour"
                  rules={[{ required: false }]}
                >
                  <Input 
                    placeholder="Enter total labour count"
                    type="number"
                    min={0}
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
          <Section>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    Performance Data
                  </Text>
                </Col>
                {!readOnly && (
                  <Col>
                    <Button
                      icon={<EditOutlined />}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  </Col>
                )}
              </Row>
              
              <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '25%' }}
              contentStyle={{ width: '25%' }}
              column={2}
              items={[
                {
                  key: "project_schedule_actual",
                  label: "Project Schedule Actual",
                  children: performanceData.project_schedule_actual ? (
                    <a 
                      href={`/files/${performanceData.project_schedule_actual}`}
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
                        handleFileAction("View/Download", performanceData.project_schedule_actual);
                      }}
                    >
                      <EyeOutlined />
                      <Text strong>{performanceData.project_schedule_actual}</Text>
                    </a>
                  ) : (
                    <Text strong>-</Text>
                  ),
                },
                {
                  key: "project_cost_actual",
                  label: "Project Cost Actual",
                  children: performanceData.project_cost_actual ? (
                    <a 
                      href={`/files/${performanceData.project_cost_actual}`}
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
                        handleFileAction("View/Download", performanceData.project_cost_actual);
                      }}
                    >
                      <EyeOutlined />
                      <Text strong>{performanceData.project_cost_actual}</Text>
                    </a>
                  ) : (
                    <Text strong>-</Text>
                  ),
                },
                {
                  key: "total_labour",
                  label: "Total Labour",
                  children: <Text strong>{performanceData.total_labour ?? "-"}</Text>,
                },
                {
                  key: "last_updated",
                  label: "Last Updated",
                  children: <Text strong>{performanceData.last_updated ?? "-"}</Text>,
                },
              ]}
              />
            </Space>
          </Section>
        )}

        {/* Project Photos Section */}
        <Section>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {!isViewingPhoto && !isAddingPhoto && (
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    Project Photos
                  </Text>
                </Col>
                {!readOnly && (
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddPhoto}
                    >
                      Add Photo
                    </Button>
                  </Col>
                )}
              </Row>
            )}
            
            {isViewingPhoto ? (
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {/* Header with Back Button */}
                <Row align="middle" gutter={12}>
                  <Col>
                    <Button 
                      type="text" 
                      icon={<ArrowLeftOutlined />} 
                      onClick={handleClosePhotoDetail}
                      style={{ padding: "4px 8px" }}
                    />
                  </Col>
                  <Col>
                    <Text strong style={{ fontSize: "16px" }}>
                      Photo Details
                    </Text>
                  </Col>
                </Row>

                {/* Multiple Photos Grid */}
                <div>
                  <Text strong style={{ display: "block", marginBottom: "8px" }}>
                    Foto Proyek
                  </Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <div style={{ 
                        width: "104px",
                        height: "104px",
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "2px solid #1890ff"
                      }}>
                        <Image
                          src={viewingPhoto.preview_url}
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div style={{ 
                        width: "104px",
                        height: "104px",
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden"
                      }}>
                        <Image
                          src="https://via.placeholder.com/300x200/52c41a/ffffff?text=Additional+Photo+1"
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div style={{ 
                        width: "104px",
                        height: "104px",
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden"
                      }}>
                        <Image
                          src="https://via.placeholder.com/300x200/fa8c16/ffffff?text=Additional+Photo+2"
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                
                {/* Photo Details */}
                <Descriptions
                  bordered
                  layout="horizontal"
                  labelStyle={{ width: '25%' }}
                  contentStyle={{ width: '25%' }}
                  column={2}
                  items={[
                    {
                      key: "tanggal_proyek",
                      label: "Tanggal Proyek",
                      children: (
                        <Typography.Text strong>{dayjs(viewingPhoto.tanggal_proyek).format('DD/MM/YYYY')}</Typography.Text>
                      ),
                    },
                    {
                      key: "keterangan_foto",
                      label: "Keterangan Foto",
                      children: (
                        <Typography.Text strong>{viewingPhoto.keterangan_foto}</Typography.Text>
                      ),
                    },
                  ]}
                />
              </Space>
            ) : isAddingPhoto ? (
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {/* Header with Back Button */}
                <Row align="middle" gutter={12}>
                  <Col>
                    <Button 
                      type="text" 
                      icon={<ArrowLeftOutlined />} 
                      onClick={handlePhotoFormCancel}
                      style={{ padding: "4px 8px" }}
                    />
                  </Col>
                  <Col>
                    <Text strong style={{ fontSize: "16px" }}>
                      {editingPhoto ? "Edit Photo" : "Add New Photo"}
                    </Text>
                  </Col>
                </Row>

                <Form
                  form={photoForm}
                  layout="vertical"
                >
                  <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      label="Foto Proyek"
                      name="foto_proyek"
                      rules={[{ required: true, message: "Please upload at least one photo!" }]}
                    >
                      <Upload
                        multiple
                        listType="picture-card"
                        beforeUpload={() => false}
                        onChange={(info) => {
                          console.log('Photos info:', info);
                        }}
                        defaultFileList={editingPhoto ? [
                          {
                            uid: editingPhoto.id,
                            name: editingPhoto.foto_proyek,
                            status: 'done',
                            url: editingPhoto.preview_url,
                          },
                          {
                            uid: `dummy-1-${editingPhoto.id}`,
                            name: 'additional_photo_1.jpg',
                            status: 'done',
                            url: 'https://via.placeholder.com/300x200/52c41a/ffffff?text=Additional+Photo+1',
                          },
                          {
                            uid: `dummy-2-${editingPhoto.id}`,
                            name: 'additional_photo_2.jpg',
                            status: 'done',
                            url: 'https://via.placeholder.com/300x200/fa8c16/ffffff?text=Additional+Photo+2',
                          }
                        ] : []}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Tanggal Proyek"
                      name="tanggal_proyek"
                      rules={[{ required: true, message: "Please select project date!" }]}
                    >
                      <DatePicker 
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        placeholder="Select project date"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Keterangan Foto"
                      name="keterangan_foto"
                      rules={[{ required: true, message: "Please input photo description!" }]}
                    >
                      <TextArea 
                        rows={4}
                        placeholder="Enter photo description (will be applied to all uploaded photos)"
                      />
                    </Form.Item>
                  </Col>
                  </Row>

                  <Row justify="end" style={{ marginTop: "24px" }}>
                    <Space>
                      <Button onClick={handlePhotoFormCancel}>
                        Cancel
                      </Button>
                      <Button type="primary" onClick={handlePhotoModalSave}>
                        {editingPhoto ? "Save Changes" : "Save"}
                      </Button>
                    </Space>
                  </Row>
                </Form>
              </Space>
            ) : (
              <Table
                columns={photoColumns}
                dataSource={photos}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            )}
          </Space>
        </Section>

        {/* History Performance Section */}
        <Section>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong style={{ fontSize: "16px" }}>
                  History Performance
                </Text>
              </Col>
            </Row>
            
            <Table
              columns={[
                {
                  title: "Last Updated",
                  dataIndex: "last_updated",
                  key: "last_updated",
                  render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
                },
                {
                  title: "Project Schedule Actual",
                  dataIndex: "project_schedule_actual",
                  key: "project_schedule_actual",
                  render: (text) => text || "-",
                },
                {
                  title: "Project Cost Actual",
                  dataIndex: "project_cost_actual",
                  key: "project_cost_actual",
                  render: (text) => text || "-",
                },
                {
                  title: "Total Labour",
                  dataIndex: "total_labour",
                  key: "total_labour",
                  render: (text) => text || "-",
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  last_updated: "2025-01-20T14:30:00.000Z",
                  project_schedule_actual: "schedule_actual_2025_v1.xlsx",
                  project_cost_actual: "cost_actual_2025_v1.xlsx",
                  total_labour: "250"
                },
                {
                  key: "2",
                  last_updated: "2025-01-15T10:15:00.000Z",
                  project_schedule_actual: "schedule_actual_2025_v1.xlsx",
                  project_cost_actual: "cost_actual_2025_v1.xlsx",
                  total_labour: "235"
                },
                {
                  key: "3",
                  last_updated: "2025-01-10T09:45:00.000Z",
                  project_schedule_actual: "schedule_actual_2025_v1.xlsx",
                  project_cost_actual: "cost_actual_2025_v1.xlsx",
                  total_labour: "220"
                },
                {
                  key: "4",
                  last_updated: "2025-01-05T16:20:00.000Z",
                  project_schedule_actual: "schedule_actual_2025_v1.xlsx",
                  project_cost_actual: "cost_actual_2025_v1.xlsx",
                  total_labour: "200"
                }
              ]}
              rowKey="key"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Space>
        </Section>

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

export default ProjectPerformanceContent;
