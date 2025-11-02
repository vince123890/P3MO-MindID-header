import { Page, Section } from "admiral";
import { Suspense, useState, useEffect } from "react";
import { Space, Row, Col, Card, Statistic, Typography, Spin, Select, DatePicker } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import MapContent from "./_components/MapContent";
import CityDistributionContent from "./_components/CityDistributionContent";
import { getStrategicCapitalProjectData } from "../strategic-capital-project/_data/index";

const { Title, Text } = Typography;
const { MonthPicker } = DatePicker;

export const Component = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [displayMode, setDisplayMode] = useState("Number");
  const [filters, setFilters] = useState({
    project_type: ["All"],
    company: ["All"],
    phase: ["All"],
    commodity: ["All"],
    month: dayjs(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStrategicCapitalProjectData();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Format budget in Juta or Miliar
  const formatBudget = (value) => {
    if (value >= 1000000000) {
      // Billions (Miliar)
      return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
    } else if (value >= 1000000) {
      // Millions (Juta)
      return `Rp ${(value / 1000000).toFixed(1)} Juta`;
    } else {
      return `Rp ${value.toLocaleString('id-ID')}`;
    }
  };

  const totalInvestmentData = data ? [
    { name: "Upstream", value: data.total_investment?.upstream || 0 },
    { name: "Midstream", value: data.total_investment?.midstream || 0 },
    { name: "Downstream", value: data.total_investment?.downstream || 0 },
  ] : [];

  const COLORS = {
    upstream: "#19315a",
    midstream: "#c41e3a",
    downstream: "#2a4a7a",
  };

  const projectPhaseColors = [
    "#19315a",
    "#c41e3a",
    "#2a4a7a",
    "#21426e",
    "#d14458",
    "#0f1e3a",
  ];

  const projectTypeColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458"];

  const commodityColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458"];

  return (
    <Page
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Overview", path: "" },
      ]}
      title="Overview"
      noStyle
    >
      <Section loading={false}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Suspense fallback={<div>Loading summary...</div>}>
            <CityDistributionContent showOnlySummary={true} />
          </Suspense>

          <Section 
            title="Ringkasan Data"
            actions={[
              <Row gutter={[8, 8]} align="middle" key="filters">
                <Col>
                  <Select
                    mode="multiple"
                    placeholder="Tipe Proyek"
                    style={{ width: 150 }}
                    value={filters.project_type}
                    onChange={(value) => handleFilterChange('project_type', value)}
                    options={[
                      { label: "All", value: "All" },
                      { label: "New Facility", value: "New Facility" },
                      { label: "Expansion", value: "Expansion" },
                      { label: "Replacement", value: "Replacement" },
                      { label: "Optimization", value: "Optimization" },
                      { label: "Environmental", value: "Environmental" },
                    ]}
                  />
                </Col>
                <Col>
                  <Select
                    mode="multiple"
                    placeholder="Company"
                    style={{ width: 150 }}
                    value={filters.company}
                    onChange={(value) => handleFilterChange('company', value)}
                    options={[
                      { label: "All", value: "All" },
                      { label: "PTFI", value: "PTFI" },
                      { label: "PTBA", value: "PTBA" },
                      { label: "Inalum", value: "Inalum" },
                      { label: "Antam", value: "Antam" },
                      { label: "Vale", value: "Vale" },
                      { label: "Timah", value: "Timah" },
                    ]}
                  />
                </Col>
                <Col>
                  <Select
                    mode="multiple"
                    placeholder="Phases"
                    style={{ width: 150 }}
                    value={filters.phase}
                    onChange={(value) => handleFilterChange('phase', value)}
                    options={[
                      { label: "All", value: "All" },
                      { label: "FEL 2", value: "FEL 2" },
                      { label: "FEL 3", value: "FEL 3" },
                      { label: "Detail Engineering", value: "Detail Engineering" },
                      { label: "Construction", value: "Construction" },
                      { label: "Commissioning", value: "Commissioning" },
                      { label: "Operate Optimize", value: "Operate Optimize" },
                    ]}
                  />
                </Col>
                <Col>
                  <Select
                    mode="multiple"
                    placeholder="Commodity"
                    style={{ width: 150 }}
                    value={filters.commodity}
                    onChange={(value) => handleFilterChange('commodity', value)}
                    options={[
                      { label: "All", value: "All" },
                      { label: "Nickel", value: "Nickel" },
                      { label: "Alumunium", value: "Alumunium" },
                      { label: "Gold", value: "Gold" },
                      { label: "Tin", value: "Tin" },
                      { label: "Copper", value: "Copper" },
                    ]}
                  />
                </Col>
                <Col>
                  <DatePicker
                    picker="month"
                    style={{ width: 150 }}
                    value={filters.month}
                    onChange={(date) => handleFilterChange('month', date)}
                    placeholder="Select month"
                  />
                </Col>
              </Row>
            ]}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Section 
                title="Peta Sebaran Project"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "0",
                  border: "1px solid #e8e8e8",
                }}
              >
                <Suspense fallback={<div>Loading map...</div>}>
                  <MapContent />
                </Suspense>
              </Section>

              {/* Investment and Performance Overview with Filters */}
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <Section 
                  title="Investment and Performance Overview"
                  actions={[
                    <Select
                      key="display-mode"
                      value={displayMode}
                      onChange={setDisplayMode}
                      style={{ width: 120 }}
                      options={[
                        { label: "Number", value: "Number" },
                        { label: "Value", value: "Value" },
                      ]}
                    />
                  ]}
                >
              <Row gutter={[16, 16]}>
                {/* Total Investment Donut Chart */}
                <Col xs={24} md={12} lg={6}>
                  <Card>
                    <Title level={5}>Total Investment</Title>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={totalInvestmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          dataKey="value"
                          label
                        >
                          {totalInvestmentData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "Upstream"
                                  ? COLORS.upstream
                                  : entry.name === "Midstream"
                                    ? COLORS.midstream
                                    : COLORS.downstream
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, props.payload.name];
                            } else {
                              return [formatBudget(props.payload.budget || value), props.payload.name];
                            }
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                {/* Total Project Stats */}
                <Col xs={24} md={12} lg={6}>
                  <Card>
                    <Title level={5}>Total Project</Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 250,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "48px",
                          fontWeight: "bold",
                          color: "#19315a",
                          marginBottom: "20px",
                        }}
                      >
                        {data?.summary?.total_projects || 0}
                      </div>
                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px 16px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                          }}
                        >
                          <Text>SPI</Text>
                          <Text
                            style={{
                              color: data?.summary?.spi >= 1 ? "#19315a" : "#c41e3a",
                              fontWeight: "bold",
                            }}
                          >
                            {data?.summary?.spi || 0}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px 16px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                          }}
                        >
                          <Text>CPI</Text>
                          <Text
                            style={{
                              color: data?.summary?.cpi >= 1 ? "#19315a" : "#c41e3a",
                              fontWeight: "bold",
                            }}
                          >
                            {data?.summary?.cpi || 0}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px 16px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                          }}
                        >
                          <Text>High Risk</Text>
                          <Text style={{ color: "#c41e3a", fontWeight: "bold" }}>
                            {data?.summary?.high_risk || 0}
                          </Text>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Col>

                {/* Company Distribution */}
                <Col xs={24} md={12} lg={6}>
                  <Card>
                    <Title level={5}>Company</Title>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={data?.company_distribution || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {(data?.company_distribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, props.payload.name];
                            } else {
                              return [formatBudget(props.payload.budget || value), props.payload.name];
                            }
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                {/* Project Objectives */}
                <Col xs={24} md={12} lg={6}>
                  <Card>
                    <Title level={5}>Project Objectives</Title>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={data?.project_objectives || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, props.payload.label || props.payload.name];
                            } else {
                              return [formatBudget(props.payload.budget || value), props.payload.label || props.payload.name];
                            }
                          }}
                        />
                        <Bar dataKey="value" fill="#19315a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
                </Section>
              )}

              {/* Detailed Analysis */}
              {!loading && (
                <Section title="Detailed Analysis">
              <Row gutter={[16, 16]}>
                {/* Project Phase */}
                <Col xs={24} md={12} lg={8}>
                  <Card>
                    <Title level={5} style={{ marginBottom: "16px" }}>Project Phase</Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data?.project_phase || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="phase" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity">
                          {(data?.project_phase || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={projectPhaseColors[index % projectPhaseColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                {/* Commodity Distribution */}
                <Col xs={24} md={12} lg={8}>
                  <Card>
                    <Title level={5} style={{ marginBottom: "16px" }}>Commodity</Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data?.commodity_distribution || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="commodity" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                          {(data?.commodity_distribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                {/* Project Type */}
                <Col xs={24} md={12} lg={8}>
                  <Card>
                    <Title level={5} style={{ marginBottom: "16px" }}>Project Type</Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data?.project_type || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="type" 
                          angle={-45}
                          textAnchor="end"
                          height={120}
                          interval={0}
                          fontSize={10}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity">
                          {(data?.project_type || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={projectTypeColors[index % projectTypeColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
                </Section>
              )}
            </Space>
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
