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

  // Format budget always in Miliar Rupiah for Value mode
  const formatBudget = (value) => {
    return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
  };

  // Format Y-axis labels for Value mode
  const formatYAxisValue = (value) => {
    if (displayMode === "Value") {
      return `${(value / 1000000000).toFixed(1)}`;
    }
    return value;
  };

  // Get Y-axis label
  const getYAxisLabel = () => {
    return displayMode === "Value" ? "Miliar Rupiah" : "Jumlah Project";
  };

  // Objective descriptions mapping
  const objectiveDescriptions = {
    'A': 'Sasaran A: Orientasi peningkatan pendapatan dan laba',
    'B': 'Sasaran B: Orientasi penugasan tetapi tidak merugikan',
    'C': 'Sasaran C: Orientasi Peningkatan laba melaui usaha non core',
    'D': 'Sasaran D: Orientasi peningkatan kehandalan sistem dan efisiensi biaya; dan',
    'E': 'Sasaran E: Orientasi saran penunjang kebutuhan operasional'
  };

  const getObjectiveDescription = (name) => {
    const key = name?.toString().toUpperCase();
    return objectiveDescriptions[key] || name;
  };

  const totalInvestmentData = data ? [
    { 
      name: "Upstream", 
      value: data.total_investment?.upstream?.value || 0,
      count: data.total_investment?.upstream?.count || 0,
      budget: data.total_investment?.upstream?.budget || 0
    },
    { 
      name: "Midstream", 
      value: data.total_investment?.midstream?.value || 0,
      count: data.total_investment?.midstream?.count || 0,
      budget: data.total_investment?.midstream?.budget || 0
    },
    { 
      name: "Downstream", 
      value: data.total_investment?.downstream?.value || 0,
      count: data.total_investment?.downstream?.count || 0,
      budget: data.total_investment?.downstream?.budget || 0
    },
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
              <Row gutter={[8, 8]} align="top" key="filters">
                <Col>
                  <div style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
                      Tipe Proyek
                    </Text>
                  </div>
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
                  <div style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
                      Company
                    </Text>
                  </div>
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
                  <div style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
                      Fase Proyek
                    </Text>
                  </div>
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
                  <div style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
                      Commodity
                    </Text>
                  </div>
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
                  <div style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
                      Timeseries
                    </Text>
                  </div>
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
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart margin={{ top: 10, right: 10, bottom: 50, left: 10 }}>
                        <Pie
                          data={totalInvestmentData}
                          cx="50%"
                          cy="45%"
                          innerRadius={55}
                          outerRadius={85}
                          dataKey="value"
                          label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                            if (percent < 0.05) return ''; // Hide labels for slices < 5%
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            
                            return (
                              <text 
                                x={x} 
                                y={y} 
                                fill="#333"
                                textAnchor={x > cx ? 'start' : 'end'} 
                                dominantBaseline="central"
                                fontSize="11"
                                fontWeight="500"
                              >
                                {`${name}`}
                              </text>
                            );
                          }}
                          labelLine={false}
                          stroke="#fff"
                          strokeWidth={2}
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
                          wrapperStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            padding: '10px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            maxWidth: '250px',
                            fontSize: '13px',
                            zIndex: 1000
                          }}
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, name];
                            } else {
                              return [formatBudget(props.payload.budget || value), name];
                            }
                          }}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{
                            border: 'none',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            backgroundColor: 'white'
                          }}
                          cursor={{ fill: 'transparent' }}
                        />
                        <Legend 
                          wrapperStyle={{ 
                            fontSize: '11px', 
                            paddingTop: '15px',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                          iconType="circle"
                        />
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
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart margin={{ top: 10, right: 10, bottom: 50, left: 10 }}>
                        <Pie
                          data={data?.company_distribution || []}
                          cx="50%"
                          cy="45%"
                          innerRadius={55}
                          outerRadius={85}
                          dataKey="value"
                          label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                            if (percent < 0.05) return ''; // Hide labels for slices < 5%
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            
                            return (
                              <text 
                                x={x} 
                                y={y} 
                                fill="#333"
                                textAnchor={x > cx ? 'start' : 'end'} 
                                dominantBaseline="central"
                                fontSize="11"
                                fontWeight="500"
                              >
                                {name.length > 8 ? `${name.substring(0, 8)}...` : name}
                              </text>
                            );
                          }}
                          labelLine={false}
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          {(data?.company_distribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          wrapperStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            padding: '10px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            maxWidth: '250px',
                            fontSize: '13px',
                            zIndex: 1000
                          }}
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, name];
                            } else {
                              return [formatBudget(props.payload.budget || value), name];
                            }
                          }}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{
                            border: 'none',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            backgroundColor: 'white'
                          }}
                          cursor={{ fill: 'transparent' }}
                        />
                        <Legend 
                          wrapperStyle={{ 
                            fontSize: '11px', 
                            paddingTop: '15px',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                {/* Project Objectives */}
                <Col xs={24} md={12} lg={6}>
                  <Card>
                    <Title level={5}>Project Objectives</Title>
                    <ResponsiveContainer width="100%" height={380}>
                      <BarChart 
                        data={data?.project_objectives || []}
                        margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          angle={0}
                          textAnchor="middle"
                          height={60}
                          interval={0}
                          fontSize={12}
                          tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <YAxis 
                          fontSize={10}
                          tick={{ fontSize: 10, fill: '#666' }}
                          tickFormatter={formatYAxisValue}
                          label={{ 
                            value: getYAxisLabel(), 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fontSize: '10px', fill: '#666' }
                          }}
                        />
                        <Tooltip 
                          wrapperStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            padding: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            maxWidth: '320px',
                            fontSize: '13px',
                            zIndex: 1000,
                            whiteSpace: 'normal',
                            wordWrap: 'break-word'
                          }}
                          formatter={(value, name, props) => {
                            if (displayMode === "Number") {
                              return [`${props.payload.count || value} Projects`, 'Count'];
                            } else {
                              return [formatBudget(props.payload.budget || value), 'Budget'];
                            }
                          }}
                          labelFormatter={(label) => {
                            const description = getObjectiveDescription(label);
                            return (
                              <div style={{ 
                                whiteSpace: 'normal', 
                                wordWrap: 'break-word',
                                maxWidth: '280px',
                                lineHeight: '1.4'
                              }}>
                                {description}
                              </div>
                            );
                          }}
                          contentStyle={{
                            border: 'none',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            backgroundColor: 'white',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word'
                          }}
                          cursor={{ fill: 'transparent' }}
                        />
                        <Bar 
                          dataKey={displayMode === "Value" ? "budget" : "value"}
                          fill="#19315a"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>

              {/* Additional Analysis Charts in Single Card */}
              <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col span={24}>
                  <Card 
                    title="Detail Analysis"
                    bordered={false}
                    style={{ padding: "16px" }}
                  >
                    <Row gutter={[24, 24]}>
                      {/* Project Phase Chart */}
                      <Col xs={24} md={12} lg={8}>
                        <div style={{ textAlign: "center", marginBottom: "16px" }}>
                          <Title level={4} style={{ margin: 0, fontSize: "16px" }}>
                            Project Phase
                          </Title>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart 
                            data={data?.project_phase || []}
                            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="phase" 
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              interval={0}
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={(value) => {
                                if (value.length > 12) {
                                  return `${value.substring(0, 12)}...`;
                                }
                                return value;
                              }}
                            />
                            <YAxis 
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={formatYAxisValue}
                              label={{ 
                                value: getYAxisLabel(), 
                                angle: -90, 
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fontSize: '9px', fill: '#666' }
                              }}
                            />
                            <Tooltip 
                              wrapperStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                padding: '10px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                maxWidth: '250px',
                                fontSize: '12px',
                                zIndex: 1000
                              }}
                              formatter={(value, name, props) => {
                                if (displayMode === "Number") {
                                  return [`${value} Projects`, 'Count'];
                                } else {
                                  return [formatBudget(props.payload.budget || value * 1000000000), 'Budget'];
                                }
                              }}
                              labelFormatter={(label) => `Phase: ${label}`}
                              contentStyle={{
                                border: 'none',
                                borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                backgroundColor: 'white'
                              }}
                              cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey={displayMode === "Value" ? "budget" : "quantity"} radius={[3, 3, 0, 0]}>
                              {(data?.project_phase || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={projectPhaseColors[index % projectPhaseColors.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </Col>

                      {/* Commodity Distribution Chart */}
                      <Col xs={24} md={12} lg={8}>
                        <div style={{ textAlign: "center", marginBottom: "16px" }}>
                          <Title level={4} style={{ margin: 0, fontSize: "16px" }}>
                            Commodity Distribution
                          </Title>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart 
                            data={data?.commodity_distribution || []}
                            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="commodity" 
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              interval={0}
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={(value) => {
                                if (value.length > 10) {
                                  return `${value.substring(0, 10)}...`;
                                }
                                return value;
                              }}
                            />
                            <YAxis 
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={formatYAxisValue}
                              label={{ 
                                value: getYAxisLabel(), 
                                angle: -90, 
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fontSize: '9px', fill: '#666' }
                              }}
                            />
                            <Tooltip 
                              wrapperStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                padding: '10px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                maxWidth: '250px',
                                fontSize: '12px',
                                zIndex: 1000
                              }}
                              formatter={(value, name, props) => {
                                if (displayMode === "Number") {
                                  return [`${value} Projects`, 'Count'];
                                } else {
                                  return [formatBudget(props.payload.budget || value * 1000000000), 'Budget'];
                                }
                              }}
                              labelFormatter={(label) => `Commodity: ${label}`}
                              contentStyle={{
                                border: 'none',
                                borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                backgroundColor: 'white'
                              }}
                              cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey={displayMode === "Value" ? "budget" : "value"} radius={[3, 3, 0, 0]}>
                              {(data?.commodity_distribution || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </Col>

                      {/* Project Type Chart */}
                      <Col xs={24} md={12} lg={8}>
                        <div style={{ textAlign: "center", marginBottom: "16px" }}>
                          <Title level={4} style={{ margin: 0, fontSize: "16px" }}>
                            Project Type
                          </Title>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart 
                            data={data?.project_type || []}
                            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="type" 
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              interval={0}
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={(value) => {
                                if (value.length > 12) {
                                  return `${value.substring(0, 12)}...`;
                                }
                                return value;
                              }}
                            />
                            <YAxis 
                              fontSize={9}
                              tick={{ fontSize: 9, fill: '#666' }}
                              tickFormatter={formatYAxisValue}
                              label={{ 
                                value: getYAxisLabel(), 
                                angle: -90, 
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fontSize: '9px', fill: '#666' }
                              }}
                            />
                            <Tooltip 
                              wrapperStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                padding: '10px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                maxWidth: '250px',
                                fontSize: '12px',
                                zIndex: 1000
                              }}
                              formatter={(value, name, props) => {
                                if (displayMode === "Number") {
                                  return [`${value} Projects`, 'Count'];
                                } else {
                                  return [formatBudget(props.payload.budget || value * 1000000000), 'Budget'];
                                }
                              }}
                              labelFormatter={(label) => `Type: ${label}`}
                              contentStyle={{
                                border: 'none',
                                borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                backgroundColor: 'white'
                              }}
                              cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey={displayMode === "Value" ? "budget" : "quantity"} radius={[3, 3, 0, 0]}>
                              {(data?.project_type || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={projectTypeColors[index % projectTypeColors.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </Col>
                    </Row>
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
