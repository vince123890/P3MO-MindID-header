import { Button, Col, Form, Input, Row, DatePicker, Select, message, Space, Flex, Upload, Checkbox } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { PlusOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const ActivityForm = ({ 
  formProps, 
  error, 
  loading, 
  isEdit = false, 
  isView = false,
  initialData = null,
  onSubmit,
  onCancel 
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Form field options
  const taskIdOptions = [
    { label: "TASK-001", value: "TASK-001" },
    { label: "TASK-002", value: "TASK-002" },
    { label: "TASK-003", value: "TASK-003" },
    { label: "TASK-004", value: "TASK-004" },
    { label: "TASK-005", value: "TASK-005" },
    { label: "TASK-006", value: "TASK-006" },
    { label: "TASK-007", value: "TASK-007" },
    { label: "TASK-008", value: "TASK-008" },
    { label: "TASK-009", value: "TASK-009" },
    { label: "TASK-010", value: "TASK-010" },
  ];

  const stageOptions = [
    { label: "FEL 2", value: "FEL 2" },
    { label: "FEL 3", value: "FEL 3" },
    { label: "FID", value: "FID" },
    { label: "Detail Engineering", value: "Detail Engineering" },
    { label: "Construction", value: "Construction" },
    { label: "Commissioning", value: "Commissioning" },
    { label: "Operate Optimize", value: "Operate Optimize" },
  ];

  const statusOptions = [
    { label: "Not Started", value: "Not Started" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "On Hold", value: "On Hold" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const picOptions = [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "Mike Johnson", value: "Mike Johnson" },
    { label: "Alice Brown", value: "Alice Brown" },
    { label: "Bob Wilson", value: "Bob Wilson" },
    { label: "Carol Davis", value: "Carol Davis" },
  ];

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      message.success(isEdit ? "Activity updated successfully" : "Activity created successfully");
      navigate(-1);
    }
  };

  // Handle file upload for photos
  const handlePhotoUpload = (file) => {
    return false; // Prevent auto upload
  };

  // Handle photo list change
  const handlePhotoListChange = ({ fileList }) => {
    form.setFieldsValue({ foto: fileList });
  };

  return (
    <Form 
      {...formProps} 
      form={form} 
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...initialData,
        bulan_pelaporan: initialData?.bulan_pelaporan ? dayjs(initialData.bulan_pelaporan) : null,
        tanggal_aktivitas: initialData?.tanggal_aktivitas ? dayjs(initialData.tanggal_aktivitas) : dayjs(),
        latest_modified: initialData?.latest_modified ? dayjs(initialData.latest_modified) : dayjs(),
        critical_task: initialData?.critical_task || false,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Basic Information Section */}
        <Section title="Basic Information" shadow={false} style={{ padding: 0 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Task ID"
                name="task_id"
                rules={[
                  {
                    required: true,
                    message: "Task ID is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Select Task ID"
                  options={taskIdOptions}
                  disabled={isView || isEdit}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stage"
                name="stage"
                rules={[
                  {
                    required: true,
                    message: "Stage is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Select stage"
                  options={stageOptions}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Bulan Pelaporan"
                name="bulan_pelaporan"
                rules={[
                  {
                    required: true,
                    message: "Bulan Pelaporan is required",
                  },
                ]}
              >
                <DatePicker 
                  picker="month"
                  style={{ width: "100%" }} 
                  placeholder="Select month and year"
                  format="MMMM YYYY"
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        {/* Activity Progress Section */}
        <Section title="Activity Progress" shadow={false} style={{ padding: 0 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Aktivitas Bulan Berjalan"
                name="aktivitas_bulan_sebelumnya"
                rules={[
                  {
                    required: true,
                    message: "Current month activity is required",
                  },
                ]}
              >
                <Input.TextArea 
                  placeholder="Enter current month activity description"
                  rows={3}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status Berjalan"
                name="status_bulan_sebelumnya"
                rules={[
                  {
                    required: true,
                    message: "Current status is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Select status"
                  options={statusOptions}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Aktivitas Bulan Selanjutnya"
                name="aktivitas_bulan_berjalan"
                rules={[
                  {
                    required: true,
                    message: "Next month activity is required",
                  },
                ]}
              >
                <Input.TextArea 
                  placeholder="Enter next month activity description"
                  rows={3}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status Selanjutnya"
                name="status_bulan_berjalan"
                rules={[
                  {
                    required: true,
                    message: "Next status is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Select status"
                  options={statusOptions}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        {/* Activity Details Section */}
        <Section title="Activity Details" shadow={false} style={{ padding: 0 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="PIC Aktivitas"
                name="pic_aktivitas"
                rules={[
                  {
                    required: true,
                    message: "PIC is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Select PIC"
                  options={picOptions}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tanggal Aktivitas"
                name="tanggal_aktivitas"
                rules={[
                  {
                    required: true,
                    message: "Activity date is required",
                  },
                ]}
              >
                <DatePicker 
                  style={{ width: "100%" }} 
                  placeholder="Select activity date"
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Aktivitas"
                name="aktivitas"
                rules={[
                  {
                    required: true,
                    message: "Activity description is required",
                  },
                ]}
              >
                <Input.TextArea 
                  placeholder="Enter detailed activity description"
                  rows={4}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Critical Task"
                name="critical_task"
                valuePropName="checked"
              >
                <Checkbox disabled={isView}>
                  Mark as critical task
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Latest Modified"
                name="latest_modified"
                rules={[
                  {
                    required: true,
                    message: "Latest modified date is required",
                  },
                ]}
              >
                <DatePicker 
                  style={{ width: "100%" }} 
                  placeholder="Select modified date"
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        {/* Photo Documentation Section */}
        <Section title="Photo Documentation" shadow={false} style={{ padding: 0 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Foto"
                name="foto"
              >
                <Upload
                  multiple
                  accept="image/*"
                  beforeUpload={handlePhotoUpload}
                  onChange={handlePhotoListChange}
                  disabled={isView}
                  fileList={form.getFieldValue('foto') || []}
                >
                  <Button 
                    icon={<UploadOutlined />} 
                    disabled={isView}
                  >
                    Upload Photos
                  </Button>
                </Upload>
                <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                  Multiple photos can be uploaded
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Keterangan Foto"
                name="keterangan_foto"
              >
                <Input.TextArea 
                  placeholder="Enter photo description"
                  rows={3}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        {/* Remarks Section */}
        <Section title="Remarks" shadow={false} style={{ padding: 0 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Keterangan"
                name="keterangan"
              >
                <Input.TextArea 
                  placeholder="Enter additional remarks"
                  rows={4}
                  disabled={isView}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        {/* Action Buttons */}
        {!isView && (
          <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
            <Button 
              type="text" 
              disabled={loading} 
              onClick={onCancel ? onCancel : () => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
            >
              {isEdit ? "Save Changes" : "Create Activity"}
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
