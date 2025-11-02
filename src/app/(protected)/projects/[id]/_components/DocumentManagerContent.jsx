import { useState, useMemo } from "react";
import { Space, Button, Modal, Avatar, Typography, Divider, Input, message, Form, Select, Flex, Upload, Row, Col, Descriptions } from "antd";
import { Section, DataTable } from "admiral";
import { MessageOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined, UploadOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { documentData } from "../_data/documents";
import { makeSource } from "@/utils/data-table";

const { Text } = Typography;
const { TextArea } = Input;

const DocumentManagerContent = ({ readOnly = false }) => {
  // State to manage view mode: 'list', 'create', 'detail', or 'edit'
  const [viewMode, setViewMode] = useState("list");
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  // Filter documents based on search text
  const filteredDocuments = useMemo(() => {
    if (!searchText.trim()) {
      return documentData;
    }
    
    const searchLower = searchText.toLowerCase();
    const filtered = {
      ...documentData,
      data: {
        ...documentData.data,
        items: documentData.data.items.filter(item => 
          item.stage?.toLowerCase().includes(searchLower) ||
          item.document?.toLowerCase().includes(searchLower) ||
          item.type?.toLowerCase().includes(searchLower) ||
          item.chapter?.toLowerCase().includes(searchLower)
        )
      }
    };
    
    return filtered;
  }, [searchText]);

  const handleCommentClick = (record) => {
    setSelectedDocument(record);
    setIsCommentModalVisible(true);
  };

  const handleDetailClick = (record) => {
    setSelectedDocument(record);
    setViewMode('detail');
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalVisible(false);
    setSelectedDocument(null);
    setNewComment("");
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      message.success("Comment submitted successfully");
      setNewComment("");
      handleCloseCommentModal();
    } else {
      message.warning("Please enter a comment");
    }
  };

  // Handle form submission for create/edit
  const handleFileUpload = () => {
    setUploadModalVisible(true);
  };

  const handleUploadModalOk = () => {
    message.success("File uploaded successfully");
    setUploadModalVisible(false);
  };

  const handleUploadModalCancel = () => {
    setUploadModalVisible(false);
  };

  const handleFileAction = (fileName) => {
    message.info(`View/Download ${fileName}`);
  };

  const handleFormSubmit = (values) => {
    if (viewMode === 'edit') {
      message.success("Document updated successfully");
    } else {
      message.success("Document created successfully");
    }
    form.resetFields();
    setViewMode('list');
    setSelectedDocument(null);
  };

  // Handle back button
  const handleBack = () => {
    form.resetFields();
    setViewMode('list');
    setSelectedDocument(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Konfirmasi Hapus',
      content: 'Apakah Anda yakin ingin menghapus document ini?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        message.success("Document successfully deleted");
      },
    });
  };

  const columns = [
    {
      dataIndex: "stage",
      key: "stage",
      title: "Stage",
      sorter: true,
      width: 180,
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleDetailClick(record)}
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
      dataIndex: "document",
      key: "document",
      title: "Document",
      sorter: true,
      ellipsis: true,
    },
    {
      dataIndex: "type",
      key: "type",
      title: "Type",
      sorter: true,
      width: 150,
    },
    {
      dataIndex: "chapter",
      key: "chapter",
      title: "Chapter",
      sorter: true,
      width: 180,
    },
    ...(!readOnly ? [{
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      width: 120,
      render: (_, record) => (
        <Flex>
          <Button
            type="link"
            icon={<MessageOutlined />}
            size="small"
            onClick={() => handleCommentClick(record)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setSelectedDocument(record);
              setViewMode('edit');
              form.setFieldsValue(record);
            }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            size="small"
            onClick={() => handleDeleteConfirm(record)}
          />
        </Flex>
      ),
    }] : []),
  ];

  // Render detail view
  if (viewMode === 'detail' && selectedDocument) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" justify="space-between" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Flex align="center" gap={12}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              type="text"
            />
            <Text strong style={{ fontSize: '18px' }}>Document Detail: {selectedDocument.stage || ""}</Text>
          </Flex>
          {!readOnly && (
            <Space>
              <Button 
                danger
                onClick={() => handleDeleteConfirm(selectedDocument)}
              >
                Delete
              </Button>
              <Button 
                type="primary"
                onClick={() => {
                  setViewMode('edit');
                  form.setFieldsValue(selectedDocument);
                }}
              >
                Edit
              </Button>
            </Space>
          )}
        </Flex>

        <Section title="Document Information">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Descriptions
              bordered
              layout="horizontal"
              labelStyle={{ width: '25%' }}
              contentStyle={{ width: '25%' }}
              column={2}
              items={[
                {
                  key: "stage",
                  label: "Stage",
                  children: <Text strong>{selectedDocument.stage}</Text>,
                },
                {
                  key: "type",
                  label: "Type",
                  children: <Text strong>{selectedDocument.type}</Text>,
                },
                {
                  key: "document",
                  label: "Document",
                  children: selectedDocument.document ? (
                    <a 
                      href={`/files/${selectedDocument.document}`}
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
                        handleFileAction(selectedDocument.document);
                      }}
                    >
                      <EyeOutlined />
                      <Text strong>{selectedDocument.document}</Text>
                    </a>
                  ) : (
                    <Text strong>-</Text>
                  ),
                },
                {
                  key: "chapter",
                  label: "Chapter",
                  children: <Text strong>{selectedDocument.chapter}</Text>,
                },
                {
                  key: "total_comments",
                  label: "Total Comments",
                  children: <Text strong>{selectedDocument.comments?.length || 0}</Text>,
                },
              ]}
            />
          </Space>
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
          <Text strong style={{ fontSize: '18px' }}>Create New Document</Text>
        </Flex>

        <Section title="Document Information">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Stage"
                  name="stage"
                  rules={[{ required: true, message: 'Please select stage' }]}
                >
                  <Select placeholder="Select stage">
                    <Select.Option value="FEL 2">FEL 2</Select.Option>
                    <Select.Option value="FEL 3">FEL 3</Select.Option>
                    <Select.Option value="FID">FID</Select.Option>
                    <Select.Option value="Detail Engineering">Detail Engineering</Select.Option>
                    <Select.Option value="Construction">Construction</Select.Option>
                    <Select.Option value="Commissioning">Commissioning</Select.Option>
                    <Select.Option value="Operate Optimize">Operate Optimize</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select type' }]}
                >
                  <Select placeholder="Select type">
                    <Select.Option value="Project Docs.">Project Docs.</Select.Option>
                    <Select.Option value="Contract">Contract</Select.Option>
                    <Select.Option value="Permit">Permit</Select.Option>
                    <Select.Option value="Commercial">Commercial</Select.Option>
                    <Select.Option value="Technical Manual">Technical Manual</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item 
                  label="Document"
                  name="document"
                  rules={[{ required: true, message: 'Please upload document' }]}
                >
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    flexWrap: "wrap"
                  }}>
                    {/* File Display Area */}
                    <div style={{ 
                      flex: 1,
                      minWidth: "200px",
                      padding: "8px 12px", 
                      border: "1px solid #d9d9d9", 
                      borderRadius: "6px",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      height: "32px"
                    }}>
                      {form.getFieldValue('document') ? (
                        <a 
                          href={`/files/${form.getFieldValue('document')}`}
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
                            handleFileAction(form.getFieldValue('document'));
                          }}
                        >
                          <EyeOutlined />
                          {form.getFieldValue('document')}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Upload Button */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={handleFileUpload}
                      style={{ height: "32px" }}
                    >
                      Upload
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Chapter"
                  name="chapter"
                  rules={[{ required: true, message: 'Please select chapter' }]}
                >
                  <Select placeholder="Select chapter">
                    <Select.Option value="Engineering">Engineering</Select.Option>
                    <Select.Option value="Quality Assurance">Quality Assurance</Select.Option>
                    <Select.Option value="Procurement">Procurement</Select.Option>
                    <Select.Option value="Installation">Installation</Select.Option>
                    <Select.Option value="Operations">Operations</Select.Option>
                    <Select.Option value="Project Management">Project Management</Select.Option>
                    <Select.Option value="Risk Management">Risk Management</Select.Option>
                    <Select.Option value="Testing">Testing</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="end" style={{ marginTop: "24px" }}>
              <Space>
                <Button onClick={handleBack}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Space>
            </Row>
          </Form>
        </Section>
      </Space>
    );
  }

  // Render edit form view
  if (viewMode === 'edit' && selectedDocument) {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Header with back button */}
        <Flex align="center" gap={12} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          />
          <Text strong style={{ fontSize: '18px' }}>Edit Document: {selectedDocument.stage || ""}</Text>
        </Flex>

        <Section title="Document Information">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={selectedDocument}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Stage"
                  name="stage"
                  rules={[{ required: true, message: 'Please select stage' }]}
                >
                  <Select placeholder="Select stage">
                    <Select.Option value="FEL 2">FEL 2</Select.Option>
                    <Select.Option value="FEL 3">FEL 3</Select.Option>
                    <Select.Option value="FID">FID</Select.Option>
                    <Select.Option value="Detail Engineering">Detail Engineering</Select.Option>
                    <Select.Option value="Construction">Construction</Select.Option>
                    <Select.Option value="Commissioning">Commissioning</Select.Option>
                    <Select.Option value="Operate Optimize">Operate Optimize</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select type' }]}
                >
                  <Select placeholder="Select type">
                    <Select.Option value="Project Docs.">Project Docs.</Select.Option>
                    <Select.Option value="Contract">Contract</Select.Option>
                    <Select.Option value="Permit">Permit</Select.Option>
                    <Select.Option value="Commercial">Commercial</Select.Option>
                    <Select.Option value="Technical Manual">Technical Manual</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item 
                  label="Document"
                  name="document"
                  rules={[{ required: true, message: 'Please upload document' }]}
                >
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    flexWrap: "wrap"
                  }}>
                    {/* File Display Area */}
                    <div style={{ 
                      flex: 1,
                      minWidth: "200px",
                      padding: "8px 12px", 
                      border: "1px solid #d9d9d9", 
                      borderRadius: "6px",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      height: "32px"
                    }}>
                      {selectedDocument.document ? (
                        <a 
                          href={`/files/${selectedDocument.document}`}
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
                            handleFileAction(selectedDocument.document);
                          }}
                        >
                          <EyeOutlined />
                          {selectedDocument.document}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Upload Button */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={handleFileUpload}
                      style={{ height: "32px" }}
                    >
                      Upload
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Chapter"
                  name="chapter"
                  rules={[{ required: true, message: 'Please select chapter' }]}
                >
                  <Select placeholder="Select chapter">
                    <Select.Option value="Engineering">Engineering</Select.Option>
                    <Select.Option value="Quality Assurance">Quality Assurance</Select.Option>
                    <Select.Option value="Procurement">Procurement</Select.Option>
                    <Select.Option value="Installation">Installation</Select.Option>
                    <Select.Option value="Operations">Operations</Select.Option>
                    <Select.Option value="Project Management">Project Management</Select.Option>
                    <Select.Option value="Risk Management">Risk Management</Select.Option>
                    <Select.Option value="Testing">Testing</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="end" style={{ marginTop: "24px" }}>
              <Space>
                <Button onClick={handleBack}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Space>
            </Row>
          </Form>
        </Section>
      </Space>
    );
  }

  // Render list view
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Document Management List with Create Button */}
      <Section bodyStyle={{ padding: 24 }}>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '16px' }}>Document Management</Text>
          {!readOnly && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setViewMode('create')}>
              Create New
            </Button>
          )}
        </Flex>
      </Section>
      
      <Section bodyStyle={{ padding: 16 }} bordered={false}>
        {/* Search Input */}
        <Input
          placeholder="Search by Stage, Document, Type, or Chapter..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
          allowClear
        />
        
        <DataTable
          rowKey="id"
          loading={false}
          source={makeSource(filteredDocuments)}
          columns={columns}
          search=""
          hideSearch
          showRowSelection={false}
          scroll={{ x: 830 }}
          pagination={{
            sticky: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Section>

      {/* Upload Modal */}
      <Modal
        title="Upload Document"
        open={uploadModalVisible}
        onOk={handleUploadModalOk}
        onCancel={handleUploadModalCancel}
        footer={[
          <Button key="cancel" onClick={handleUploadModalCancel}>
            Cancel
          </Button>,
          <Button key="upload" type="primary" onClick={handleUploadModalOk}>
            Upload
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>Upload document file</Text>
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

      {/* Comment Modal */}
      <Modal
        title={`Comment - ${selectedDocument?.document || "Document"}`}
        open={isCommentModalVisible}
        onCancel={handleCloseCommentModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmitComment}>
            Submit
          </Button>
        ]}
        width={600}
      >
        {selectedDocument && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Existing Comments */}
            <div>
              {selectedDocument.comments?.map((comment, index) => (
                <div key={comment.id}>
                  <Space align="start" style={{ width: "100%", marginBottom: 16 }}>
                    <Avatar
                      src={comment.avatar}
                      size={40}
                      style={{ backgroundColor: "#1890ff" }}
                    >
                      {comment.user?.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>{comment.user}</Text>
                        <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                          {comment.date}
                        </Text>
                      </div>
                      <div style={{ 
                        backgroundColor: "#f5f5f5", 
                        padding: 12, 
                        borderRadius: 8,
                        border: "1px solid #e8e8e8"
                      }}>
                        <Text>{comment.content}</Text>
                      </div>
                    </div>
                  </Space>
                  {index < selectedDocument.comments.length - 1 && <Divider />}
                </div>
              ))}
            </div>

            {/* New Comment Input */}
            <div>
              <Text strong style={{ display: "block", marginBottom: 8 }}>
                Add Comment:
              </Text>
              <TextArea
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment here..."
              />
            </div>
          </Space>
        )}
      </Modal>
    </Space>
  );
};

export default DocumentManagerContent;
