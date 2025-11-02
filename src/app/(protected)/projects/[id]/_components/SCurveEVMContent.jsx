import { Typography, Card, Row, Col, Space, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Line } from '@ant-design/plots';

const { Title, Text } = Typography;

const SCurveEVMContent = ({ project }) => {
  // S-Curve chart data for Ant Design Plots
  const chartData = [
    // Baseline data
    { month: 'Jan 2024', value: 2.8, type: 'Baseline' },
    { month: 'Feb 2024', value: 4.8, type: 'Baseline' },
    { month: 'Mar 2024', value: 8.7, type: 'Baseline' },
    { month: 'Apr 2024', value: 15.1, type: 'Baseline' },
    { month: 'May 2024', value: 22.8, type: 'Baseline' },
    { month: 'Jun 2024', value: 32.7, type: 'Baseline' },
    { month: 'Jul 2024', value: 44.3, type: 'Baseline' },
    { month: 'Aug 2024', value: 56.8, type: 'Baseline' },
    { month: 'Sep 2024', value: 68.6, type: 'Baseline' },
    { month: 'Oct 2024', value: 78.4, type: 'Baseline' },
    { month: 'Nov 2024', value: 86.2, type: 'Baseline' },
    { month: 'Dec 2024', value: 92.5, type: 'Baseline' },
    // Forecast data
    { month: 'Jan 2024', value: 0.8, type: 'Forecast' },
    { month: 'Feb 2024', value: 3.2, type: 'Forecast' },
    { month: 'Mar 2024', value: 6.8, type: 'Forecast' },
    { month: 'Apr 2024', value: 12.4, type: 'Forecast' },
    { month: 'May 2024', value: 19.7, type: 'Forecast' },
    { month: 'Jun 2024', value: 28.3, type: 'Forecast' },
    { month: 'Jul 2024', value: 38.1, type: 'Forecast' },
    { month: 'Aug 2024', value: 48.9, type: 'Forecast' },
    { month: 'Sep 2024', value: 59.2, type: 'Forecast' },
    { month: 'Oct 2024', value: 68.7, type: 'Forecast' },
    { month: 'Nov 2024', value: 77.1, type: 'Forecast' },
    { month: 'Dec 2024', value: 84.3, type: 'Forecast' }
  ];

  // EVM metrics data
  const evmMetrics = [
    { title: "Kontraktor", value: "PT Pembangunan Jaya" },
    { title: "Tipe Kontrak", value: "Lump Sum" },
    { title: "Kontraktor Labor", value: "350 Workers" },
    { title: "This Month Progress", value: "8.4%" },
    { title: "Last Month Progress", value: "7.2%" },
    { title: "CPI", value: "0.94" },
    { title: "SPI", value: "0.87" },
    { title: "Stagnancy Index", value: "2.1%" },
    { title: "Available Budget", value: "$2.4M" },
    { title: "Remaining Days", value: "127 Days" }
  ];

  // Monthly progress data
  const monthlyProgress = [
    { month: "Jan", progress: "0.8%", color: "#52c41a" },
    { month: "Feb", progress: "1.3%", color: "#52c41a" },
    { month: "Mar", progress: "2.2%", color: "#52c41a" },
    { month: "Apr", progress: "3%", color: "#52c41a" },
    { month: "May", progress: "5%", color: "#52c41a" },
    { month: "Jun", progress: "8.1%", color: "#52c41a" },
    { month: "Jul", progress: "12%", color: "#52c41a" },
    { month: "Aug", progress: "17%", color: "#52c41a" },
    { month: "Sep", progress: "23.3%", color: "#52c41a" },
    { month: "Oct", progress: "31%", color: "#52c41a" },
    { month: "Nov", progress: "37%", color: "#52c41a" },
    { month: "Dec", progress: "44%", color: "#52c41a" }
  ];

  // Chart configuration for Ant Design Plots
  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    height: 400,
    color: (datum) => {
      return datum.type === 'Baseline' ? '#19315a' : '#c41e3a';
    },
    point: {
      size: 5,
      shape: 'circle',
    },
    lineStyle: {
      lineWidth: 3,
    },
    smooth: true,
    label: {
      content: (item) => {
        return `${item.value}%`;
      },
      style: {
        fontSize: 10,
        fontWeight: 'bold',
        fill: '#000',
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 10,
        },
        rotate: -45,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      label: {
        formatter: (val) => `${val}%`,
        style: {
          fontSize: 11,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#e8e8e8',
            strokeOpacity: 0.7,
          },
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.type,
          value: `${datum.value}%`,
        };
      },
    },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Main S-Curve Chart */}
      <Card
        style={{ 
          borderRadius: "8px",
          minHeight: "400px"
        }}
        bodyStyle={{ padding: "24px" }}
      >
        {/* Header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <Title level={4} style={{ margin: 0, textAlign: "center", flex: 1 }}>
            Progress Basis SCurve
          </Title>
          <Button 
            type="text" 
            icon={<FilterOutlined />} 
            style={{ color: "#666" }}
            size="small"
          />
        </div>

        {/* S-Curve Chart with Integrated Progress Bars */}
        <div style={{ position: "relative" }}>
          <Line {...config} />
          
          {/* Custom Progress Bars Below Chart */}
          <div style={{ 
            marginTop: "20px",
            paddingTop: "10px",
            borderTop: "1px solid #e8e8e8"
          }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(12, 1fr)", 
              gap: "4px",
              alignItems: "center"
            }}>
              {[
                { month: 'Jan', actual: 0.8, plan: 2.8 },
                { month: 'Feb', actual: 1.3, plan: 4.8 },
                { month: 'Mar', actual: 2.2, plan: 8.7 },
                { month: 'Apr', actual: 3.0, plan: 15.1 },
                { month: 'May', actual: 5.0, plan: 22.8 },
                { month: 'Jun', actual: 8.1, plan: 32.7 },
                { month: 'Jul', actual: 12.0, plan: 44.3 },
                { month: 'Aug', actual: 17.0, plan: 56.8 },
                { month: 'Sep', actual: 23.3, plan: 68.6 },
                { month: 'Oct', actual: 31.0, plan: 78.4 },
                { month: 'Nov', actual: 37.0, plan: 86.2 },
                { month: 'Dec', actual: 44.0, plan: 92.5 }
              ].map((item, idx) => (
                <div key={item.month} style={{ 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {/* Month Label */}
                  <div style={{
                    fontSize: "10px",
                    color: "#666",
                    fontWeight: "500",
                    textAlign: "center"
                  }}>
                    {item.month}
                  </div>
                  
                  {/* Actual Progress Bar */}
                  <div style={{
                    width: "100%",
                    height: "28px",
                    backgroundColor: "#c41e3a",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "2px"
                  }}>
                    <div style={{ fontSize: "7px", opacity: 0.9 }}>Aktual</div>
                    <div>{item.actual}%</div>
                  </div>
                  
                  {/* Plan Progress Bar */}
                  <div style={{
                    width: "100%",
                    height: "28px",
                    backgroundColor: "#19315a",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "2px"
                  }}>
                    <div style={{ fontSize: "7px", opacity: 0.9 }}>Rencana</div>
                    <div>{item.plan}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* EVM Metrics Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {evmMetrics.map((metric, index) => (
          <Card
            key={index}
            size="small"
            style={{ 
              flex: "1 1 18%",
              minWidth: "180px",
              textAlign: "center",
              borderRadius: "8px"
            }}
            bodyStyle={{ padding: "20px 16px" }}
          >
            <div style={{ 
              fontSize: "14px", 
              fontWeight: "500", 
              marginBottom: "8px",
              color: "#666"
            }}>
              {metric.title}
            </div>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              color: "#333"
            }}>
              {metric.value}
            </div>
          </Card>
        ))}
      </div>

    </Space>
  );
};

export default SCurveEVMContent;
