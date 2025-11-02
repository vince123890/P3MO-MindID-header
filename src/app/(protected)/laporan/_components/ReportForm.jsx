import { useState } from "react";
import { Form, Select, Button, message, Space, Card, Typography, Row, Col, Flex } from "antd";
import { FileTextOutlined, DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Section } from "admiral";

import { allProjects } from "../../projects/_data";
import { generateReportPreview, getMonthName } from "../_data";
import { PDFViewer } from "@/app/_components/ui/pdf-viewer";

const { Title, Text } = Typography;

export default function ReportForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const projectOptions = allProjects.data.items.map(project => ({
    value: project.id,
    label: `${project.project_code} - ${project.business_initiative_name}`,
    project: project
  }));

  // Generate month-year options for dropdown
  const monthYearOptions = [];
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month();
  
  // Generate options for the last 12 months including current month
  for (let i = 0; i < 12; i++) {
    const date = currentDate.subtract(i, 'month');
    const monthName = date.format('MMMM');
    const year = date.year();
    const value = date.format('YYYY-MM');
    
    monthYearOptions.push({
      value: value,
      label: `${monthName} ${year}`
    });
  }

  const handleGenerateReport = async (values) => {
    setLoading(true);
    
    try {
      const { project_id, periode_laporan } = values;
      
      // Parse the selected month-year (format: YYYY-MM)
      const selectedDate = dayjs(periode_laporan);
      const startDate = selectedDate.startOf('month');
      const endDate = selectedDate.endOf('month');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportData = generateReportPreview(
        project_id,
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
      );
      
      setGeneratedReport(reportData.data);
      setShowPreview(true);
      
      message.success('Laporan berhasil di-generate!');
    } catch (error) {
      message.error('Gagal generate laporan');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (generatedReport) {
      const startDate = new Date(generatedReport.period_start);
      const endDate = new Date(generatedReport.period_end);
      const monthName = getMonthName(startDate.getMonth() + 1);
      const year = startDate.getFullYear();
      
      // Simulate print action
      message.success(`Laporan periode ${monthName} ${year} berhasil dicetak`);
      
      // In real implementation, this would trigger actual print
      if (generatedReport.file_path) {
        const printWindow = window.open(generatedReport.file_path);
        if (printWindow) {
          printWindow.addEventListener("load", () => {
            printWindow.print();
          });
        }
      }
    }
  };

  const handleDownload = () => {
    if (generatedReport && generatedReport.file_path) {
      const link = document.createElement("a");
      link.href = generatedReport.file_path;
      link.download = `${generatedReport.file_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('Laporan berhasil didownload!');
    }
  };

  const resetForm = () => {
    form.resetFields();
    setGeneratedReport(null);
    setShowPreview(false);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Section>
        <Section title="Report Information">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleGenerateReport}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Pilih Project"
                  name="project_id"
                  rules={[
                    { required: true, message: "Silakan pilih project!" }
                  ]}
                >
                  <Select
                    placeholder="Pilih project yang akan dilaporkan"
                    showSearch
                    optionFilterProp="label"
                    options={projectOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Periode Laporan"
                  name="periode_laporan"
                  rules={[
                    { required: true, message: "Silakan pilih periode laporan!" }
                  ]}
                >
                  <Select
                    placeholder="Pilih periode laporan"
                    options={monthYearOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16}>
        <Button
          onClick={resetForm}
          disabled={loading}
        >
          Reset
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          icon={<FileTextOutlined />}
          loading={loading}
          onClick={() => form.submit()}
        >
          {loading ? "Generating..." : "Generate Laporan"}
        </Button>
      </Flex>

      {showPreview && generatedReport && (
        <Section title="Preview Laporan" loading={false}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Card size="small">
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      {generatedReport.file_name}
                    </Title>
                    <Text type="secondary">
                      Periode: {dayjs(generatedReport.period_start).format('DD/MM/YYYY')} - {dayjs(generatedReport.period_end).format('DD/MM/YYYY')}
                    </Text>
                    <Text type="secondary" style={{ display: 'block' }}>
                      Generated: {dayjs(generatedReport.generated_at).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </div>
                  
                  <Space>
                    <Button
                      type="primary"
                      icon={<PrinterOutlined />}
                      onClick={handlePrint}
                    >
                      Print Laporan
                    </Button>
                    
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleDownload}
                    >
                      Download PDF
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>

            <PDFViewer
              filePath={generatedReport.file_path}
              fileName={generatedReport.file_name}
              height="700px"
              width="100%"
            />
          </Space>
        </Section>
      )}
    </Space>
  );
}
