import React, { useState } from 'react';
import { Link } from 'react-router';
import { Tabs, Space, Tooltip as AntTooltip, Card, Row, Col, Typography, Tag, Button, Select, DatePicker, Alert, Divider, Tooltip, Popover } from 'antd';
import dayjs from 'dayjs';
import { InfoCircleOutlined, ExpandOutlined, EyeOutlined } from '@ant-design/icons';
import { Page, Section } from 'admiral';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import projectComparisonData from './_data';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Pipeline Stage Component (from Initiative Project Pipeline)
const PipelineStage = ({ stage, stageInfo }) => {
  const getProjectSize = (size) => {
    switch (size) {
      case "small":
        return { width: 35, height: 35 };
      case "medium":
        return { width: 50, height: 50 };
      case "large":
        return { width: 65, height: 65 };
      default:
        return { width: 45, height: 45 };
    }
  };

  const getStageWidth = () => {
    return "13.5%";
  };

  const stageHeight = Math.max(160, stage.projects.length * 20 + 120);

  // Strategic Capital Project color scheme
  const strategicColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458", "#0f1e3a"];

  // Mining commodity colors
  const commodityColors = {
    "Gold": "#FFD700",
    "Copper": "#CD7F32",
    "Nickel": "#c41e3a",
    "Coal": "#2a4a7a",
    "Tin": "#21426e",
    "Bauxite": "#d14458",
    "Aluminum": "#0f1e3a"
  };

  // Get stage color from brand colors based on stage index
  const getStageColor = (stageId) => {
    const stageIndex = ["in_hpo", "fid", "detail_engineering", "construction", "commissioning", "operate_optimize", "ore_processing"].indexOf(stageId);
    return strategicColors[stageIndex % strategicColors.length];
  };

  const stageColor = getStageColor(stage.id);

  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${stageColor} 0%, ${stageColor}cc 100%)`,
        borderRadius: "12px",
        padding: "16px",
        minHeight: stageHeight,
        width: getStageWidth(),
        minWidth: "140px",
        margin: "0 4px",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        border: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Stage Header */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "12px",
          padding: "8px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "8px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: "13px", display: "block" }}>
          {stage.name}
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", display: "block", marginTop: "2px" }}>
          {stage.projects.length} project{stage.projects.length !== 1 ? 's' : ''}
        </Text>
      </div>

      {/* Projects */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          flex: 1,
        }}
      >
        {stage.projects.map((project, index) => {
          const size = getProjectSize(project.size);
          const projectColor = commodityColors[project.type] || strategicColors[index % strategicColors.length];
          
          return (
            <Tooltip
              key={project.id}
              title={
                <div style={{ 
                  background: 'white', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  maxWidth: '320px'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ 
                      color: projectColor, 
                      fontWeight: 'bold', 
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {project.company}
                    </div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '16px',
                      color: '#333'
                    }}>
                      {project.name}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Budget:</div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        color: projectColor, 
                        fontSize: '14px' 
                      }}>
                        ${project.budget}M USD
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Commodity:</div>
                      <div style={{ 
                        background: projectColor,
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        marginTop: '2px'
                      }}>
                        {project.type}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Progress:</div>
                    <div style={{ 
                      width: '100%', 
                      height: '6px', 
                      background: '#f0f0f0', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: projectColor,
                        borderRadius: '3px'
                      }} />
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: projectColor, 
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>
                      {project.progress}%
                    </div>
                  </div>
                  <div style={{ 
                    borderTop: '1px solid #f0f0f0', 
                    paddingTop: '8px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ 
                      background: 'rgba(0,0,0,0.05)', 
                      border: 'none', 
                      color: '#666',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      Stage: {stage.name}
                    </span>
                    <span style={{ 
                      background: stageColor, 
                      color: 'white', 
                      border: 'none',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {typeof project.priority === 'string' ? project.priority : `Priority ${project.priority}`}
                    </span>
                  </div>
                </div>
              }
              placement="top"
              overlayStyle={{ zIndex: 1000 }}
              mouseEnterDelay={0.3}
              mouseLeaveDelay={0.1}
            >
              <div
                style={{
                  width: size.width,
                  height: size.height,
                  backgroundColor: projectColor,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: typeof project.priority === "string" ? "9px" : "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: "3px solid rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  padding: "2px",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.15)";
                  e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                {typeof project.priority === "string" ? (
                  <span style={{ fontSize: "8px", lineHeight: "1", wordBreak: "break-word" }}>
                    {project.priority.replace(/\s+/g, '\n')}
                  </span>
                ) : (
                  project.priority
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Stage Description Info Icon */}
      <Tooltip 
        title={stageInfo?.description} 
        placement="bottom"
        overlayStyle={{ zIndex: 999, maxWidth: '300px' }}
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.1}
      >
        <InfoCircleOutlined 
          style={{ 
            position: "absolute", 
            top: "8px", 
            right: "8px", 
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            padding: "4px",
            backdropFilter: "blur(5px)"
          }} 
        />
      </Tooltip>
    </div>
  );
};

// Phase Card Component (from Initiative Project Pipeline)
const PhaseCard = ({ phase, phaseKey }) => {
  const strategicColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458", "#0f1e3a"];
  
  const commodityColors = {
    "Gold": "#FFD700",
    "Copper": "#CD7F32",
    "Nickel": "#c41e3a",
    "Coal": "#2a4a7a",
    "Tin": "#21426e",
    "Bauxite": "#d14458",
    "Aluminum": "#0f1e3a"
  };

  const getTypeColor = (type) => {
    return commodityColors[type] || strategicColors[0];
  };

  const getPhaseGradient = (phaseKey) => {
    switch (phaseKey) {
      case "initiation":
        return `linear-gradient(135deg, ${strategicColors[0]} 0%, ${strategicColors[1]} 100%)`;
      case "planning":
        return `linear-gradient(135deg, ${strategicColors[1]} 0%, ${strategicColors[2]} 100%)`;
      case "execution":
        return `linear-gradient(135deg, ${strategicColors[2]} 0%, ${strategicColors[3]} 100%)`;
      default:
        return `linear-gradient(135deg, ${strategicColors[0]} 0%, ${strategicColors[1]} 100%)`;
    }
  };

  return (
    <div
      style={{
        background: getPhaseGradient(phaseKey),
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        minHeight: "240px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          transform: "translate(40px, -40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "90px",
          height: "90px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          transform: "translate(-25px, 25px)",
        }}
      />

      {/* Phase Title */}
      <Title level={4} style={{ color: "white", marginBottom: "16px", fontWeight: "600", position: "relative", zIndex: 1 }}>
        {phase.title}
      </Title>

      {/* Projects by Type */}
      <Space direction="vertical" size="middle" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        {Object.entries(
          phase.projects.reduce((acc, project) => {
            if (!acc[project.type]) acc[project.type] = [];
            acc[project.type].push(project);
            return acc;
          }, {})
        ).map(([type, projects]) => (
          <div key={type}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.18)",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: getTypeColor(type),
                  borderRadius: "50%",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
              />
              <Text strong style={{ color: "white", fontSize: "15px" }}>
                {type} Mining
              </Text>
              <Tag
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  fontWeight: "500",
                }}
              >
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </Tag>
            </div>
            <div style={{ paddingLeft: "20px" }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px", fontWeight: "500" }}>
                    {project.name}
                  </Text>
                  <Tag
                    style={{
                      background: getTypeColor(project.type),
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "12px",
                      padding: "4px 8px",
                      fontWeight: "600",
                    }}
                  >
                    #{project.priority}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
};

// Mining Pipeline Stage Information
const pipelineStageInfo = {
  "in_hpo": {
    description: "High Priority Opportunities - Early concept stage where mining opportunities are identified and prioritized based on geological potential, market conditions, and strategic fit."
  },
  "fid": {
    description: "Final Investment Decision - Detailed feasibility studies completed. Management approves capital allocation for mine development with confirmed reserves and economics."
  },
  "detail_engineering": {
    description: "Detailed Engineering - Comprehensive design phase including mine planning, processing facilities, infrastructure, and environmental impact assessments."
  },
  "construction": {
    description: "Construction - Physical development of mining infrastructure, processing plants, access roads, and supporting facilities."
  },
  "commissioning": {
    description: "Commissioning - Testing and optimization of all mining equipment, processing systems, and safety protocols before full production begins."
  },
  "operate_optimize": {
    description: "Operate & Optimize - Full production phase with continuous improvement in mining efficiency, cost optimization, and environmental compliance."
  },
  "ore_processing": {
    description: "Ore Processing - Advanced mineral processing to extract valuable commodities from raw ore, including concentration, smelting, and refining operations."
  }
};

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('total_capex');
  const [showChartGuide, setShowChartGuide] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [filters, setFilters] = useState({
    company: ["All"],
    phase: ["All"],
    commodity: ["All"],
    dateRange: [dayjs().subtract(6, 'month'), dayjs()],
  });
  const data = projectComparisonData.data;

  // Strategic Capital Project color scheme
  const strategicColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458", "#0f1e3a"];

  // Mining commodity colors
  const commodityColors = {
    "Gold": "#FFD700",
    "Copper": "#CD7F32",
    "Nickel": "#c41e3a",
    "Coal": "#2a4a7a",
    "Tin": "#21426e",
    "Bauxite": "#d14458",
    "Aluminum": "#0f1e3a"
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Prepare chart data for the selected tab with Strategic Capital Project colors
  const getChartData = (tabKey) => {
    const tabData = data[tabKey];
    
    // Special handling for stacked charts (progress_fisik_r and anggaran_terserap_r)
    if (tabKey === 'progress_fisik_r' || tabKey === 'anggaran_terserap_r') {
      return tabData.projects.map((project) => ({
        name: project.name,
        rencana: project.rencana,
        aktual: project.aktual,
        company: project.company
      }));
    }
    
    // Regular chart data
    return tabData.projects.map((project, index) => ({
      name: project.name,
      value: project.value,
      fill: strategicColors[index % strategicColors.length],
      company: project.company
    }));
  };

  // Get current tab info
  const getCurrentTabInfo = () => {
    return data[activeTab];
  };

  // Tab items configuration
  const tabItems = [
    {
      key: 'total_capex',
      label: 'Total CAPEX',
    },
    {
      key: 'duration',
      label: 'Duration',
    },
    {
      key: 'progress_fisik_r',
      label: '% Progress Fisik',
    },
    {
      key: 'anggaran_terserap_r',
      label: 'Anggaran Terserap',
    },
    {
      key: 'spi',
      label: 'SPI',
    },
    {
      key: 'cpi',
      label: 'CPI',
    },
  ];

  // Calculate statistics for current data
  const getCurrentStatistics = () => {
    const currentInfo = getCurrentTabInfo();
    
    // Special handling for stacked charts (progress_fisik_r and anggaran_terserap_r)
    if (activeTab === 'progress_fisik_r' || activeTab === 'anggaran_terserap_r') {
      const rencanaValues = currentInfo.projects.map(p => p.rencana);
      const aktualValues = currentInfo.projects.map(p => p.aktual);
      const maxRencana = Math.max(...rencanaValues);
      const maxAktual = Math.max(...aktualValues);
      const minRencana = Math.min(...rencanaValues);
      const minAktual = Math.min(...aktualValues);
      const avgRencana = rencanaValues.reduce((a, b) => a + b, 0) / rencanaValues.length;
      const avgAktual = aktualValues.reduce((a, b) => a + b, 0) / aktualValues.length;
      
      return { 
        max: Math.max(maxRencana, maxAktual), 
        min: Math.min(minRencana, minAktual), 
        avg: ((avgRencana + avgAktual) / 2).toFixed(2) 
      };
    }
    
    const values = currentInfo.projects.map(p => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    return { max, min, avg: avg.toFixed(2) };
  };

  // Get performance indicator based on metric type
  const getPerformanceIndicator = (value, metric) => {
    if (metric === 'spi') {
      if (value >= 1.1) return { status: 'success', text: 'Ahead of Schedule' };
      if (value >= 0.9) return { status: 'warning', text: 'On Track' };
      return { status: 'error', text: 'Behind Schedule' };
    }
    if (metric === 'cpi') {
      if (value >= 1.1) return { status: 'success', text: 'Under Budget' };
      if (value >= 0.9) return { status: 'warning', text: 'On Budget' };
      return { status: 'error', text: 'Over Budget' };
    }
    return null;
  };

  // Custom bar component with Popover for stacked charts
  const CustomBarWithPopover = (props) => {
    const { x, y, width, height, fill, payload } = props;
    
    if (activeTab !== 'progress_fisik_r' && activeTab !== 'anggaran_terserap_r') {
      return <Rectangle {...props} />;
    }

    const currentInfo = getCurrentTabInfo();
    const project = currentInfo.projects.find(p => p.name === payload.name);
    
    if (!project) {
      return <Rectangle {...props} />;
    }

    const isPercentage = currentInfo.unit === '%';
    const currencySymbol = currentInfo.currency || '';
    const unit = currentInfo.unit || '';

    const popoverContent = (
      <div style={{ minWidth: '300px', padding: '16px' }}>
        <Title level={5} style={{ margin: '0 0 8px 0', color: '#19315a' }}>
          {project.company}
        </Title>
        <Text strong>{payload.name}</Text>
        <div style={{ margin: '12px 0' }}>
          <div style={{ marginBottom: '8px' }}>
            <Text type="secondary">Rencana (Plan): </Text>
            <Text strong style={{ color: '#19315a' }}>
              {isPercentage ? `${payload.rencana}%` : `${currencySymbol}${payload.rencana}${unit}`}
            </Text>
          </div>
          <div>
            <Text type="secondary">Aktual (Actual): </Text>
            <Text strong style={{ color: '#c41e3a' }}>
              {isPercentage ? `${payload.aktual}%` : `${currencySymbol}${payload.aktual}${unit}`}
            </Text>
          </div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
            <Text type="secondary">Deviation: </Text>
            <Text strong style={{ color: (payload.aktual - payload.rencana) >= 0 ? '#52c41a' : '#c41e3a' }}>
              {(payload.aktual - payload.rencana) > 0 ? '+' : ''}{(payload.aktual - payload.rencana).toFixed(1)}{isPercentage ? '%' : unit}
            </Text>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: '8px' }}>
          <Link to={`/projects/${project.id}`}>
            <Button 
              type="primary" 
              icon={<EyeOutlined />} 
              size="small"
              block
              style={{ backgroundColor: '#19315a', borderColor: '#19315a' }}
            >
              View Detail
            </Button>
          </Link>
        </div>
      </div>
    );

    return (
      <Popover
        content={popoverContent}
        trigger="hover"
        placement="top"
        overlayStyle={{ zIndex: 1000 }}
        overlayInnerStyle={{ padding: 0 }}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.5}
        fresh
      >
        <g>
          <Rectangle
            {...props}
            style={{ cursor: 'pointer' }}
          />
        </g>
      </Popover>
    );
  };

  return (
    <Page
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Portfolio", path: "" },
      ]}
      title="Portfolio"
      noStyle
    >
      <Section loading={false}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>

          {/* Comparative Analysis */}
          <Section 
            title="Comparative Analysis"
            actions={[
              <Row gutter={[8, 8]} align="middle" key="filters">
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
                    value={filters.dateRange?.[0] || filters.month}
                    onChange={(date) => handleFilterChange('month', date)}
                    placeholder="Select month"
                  />
                </Col>
              </Row>
            ]}
          >
            {/* Tab Navigation and Chart */}
            <div style={{ 
              outline: 'none',
              '& *': { outline: 'none !important' },
              '& *:focus': { outline: 'none !important' },
              '& *:focus-visible': { outline: 'none !important' }
            }}>
              <style>
                {`
                  .comparative-analysis-tabs,
                  .comparative-analysis-tabs .ant-card,
                  .comparative-analysis-tabs.ant-card,
                  .comparative-analysis-tabs .ant-tabs,
                  .comparative-analysis-tabs .ant-tabs-nav,
                  .comparative-analysis-tabs .ant-tabs-tab,
                  .comparative-analysis-tabs .ant-tabs-tab:focus,
                  .comparative-analysis-tabs .ant-tabs-tab:active,
                  .comparative-analysis-tabs .ant-tabs-tab-active,
                  .comparative-analysis-tabs *:focus,
                  .comparative-analysis-tabs *:focus-visible {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                `}
              </style>
              <Card bodyStyle={{ padding: 0 }} className="comparative-analysis-tabs" style={{ outline: 'none' }}>
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  type="card"
                  size="large"
                  items={tabItems.map(item => ({
                    ...item,
                    label: (
                      <AntTooltip title={data[item.key]?.description}>
                        {item.label}
                      </AntTooltip>
                    )
                  }))}
                />

              {/* Statistics Cards */}
              <div style={{ padding: '0 24px' }}>
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                  <Col xs={24} sm={6}>
                    <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f0f5ff', border: '1px solid #19315a' }}>
                      <Text type="secondary">Total Projects</Text>
                      <Title level={3} style={{ margin: 0, color: '#19315a' }}>
                        {getCurrentTabInfo().projects.length}
                      </Title>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff2f0', border: '1px solid #c41e3a' }}>
                      <Text type="secondary">Highest Value</Text>
                      <Title level={3} style={{ margin: 0, color: '#c41e3a' }}>
                        {(() => {
                          const stats = getCurrentStatistics();
                          const info = getCurrentTabInfo();
                          return info.unit === '%' || info.unit === '' 
                            ? `${stats.max}${info.unit}`
                            : `${info.currency}${stats.max}${info.unit}`;
                        })()}
                      </Title>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f0f5ff', border: '1px solid #2a4a7a' }}>
                      <Text type="secondary">Average Value</Text>
                      <Title level={3} style={{ margin: 0, color: '#2a4a7a' }}>
                        {(() => {
                          const stats = getCurrentStatistics();
                          const info = getCurrentTabInfo();
                          return info.unit === '%' || info.unit === '' 
                            ? `${stats.avg}${info.unit}`
                            : `${info.currency}${stats.avg}${info.unit}`;
                        })()}
                      </Title>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f9f0ff', border: '1px solid #21426e' }}>
                      <Text type="secondary">Lowest Value</Text>
                      <Title level={3} style={{ margin: 0, color: '#21426e' }}>
                        {(() => {
                          const stats = getCurrentStatistics();
                          const info = getCurrentTabInfo();
                          return info.unit === '%' || info.unit === '' 
                            ? `${stats.min}${info.unit}`
                            : `${info.currency}${stats.min}${info.unit}`;
                        })()}
                      </Title>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* Chart Section */}
              <div style={{ padding: '0 24px 24px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <Title level={4} style={{ margin: 0, color: '#19315a' }}>
                      {getCurrentTabInfo().title} Comparison
                    </Title>
                    <Text type="secondary">
                      Comparative analysis across {getCurrentTabInfo().projects.length} project initiatives
                    </Text>
                  </div>
                  {(activeTab === 'spi' || activeTab === 'cpi') && (
                    <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Tag color="green">≥1.1 {activeTab === 'spi' ? 'Ahead' : 'Under Budget'}</Tag>
                      <Tag color="orange">0.9-1.1 On Track</Tag>
                      <Tag color="red">{"< 0.9 Behind"}</Tag>
                    </div>
                  )}
                </div>
                
                <div style={{ width: '100%', height: '600px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getChartData(activeTab)}
                      margin={{ top: 20, right: 30, left: 40, bottom: 120 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        interval={0}
                        tick={{ fontSize: 11 }}
                        stroke="#666"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                        label={{ 
                          value: (() => {
                            const info = getCurrentTabInfo();
                            return info.unit === '%' || info.unit === '' 
                              ? `${info.title} ${info.unit}`
                              : `${info.title} (${info.currency}${info.unit})`;
                          })(), 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      {activeTab !== 'progress_fisik_r' && activeTab !== 'anggaran_terserap_r' && (
                        <RechartsTooltip
                          cursor={{ fill: 'rgba(25, 49, 90, 0.1)' }}
                          wrapperStyle={{ pointerEvents: 'auto', zIndex: 1000 }}
                          allowEscapeViewBox={{ x: true, y: true }}
                          content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const currentInfo = getCurrentTabInfo();
                            const project = currentInfo.projects.find(p => p.name === label);
                            
                            // Special tooltip for stacked charts (shouldn't reach here for these tabs)
                            if (activeTab === 'progress_fisik_r' || activeTab === 'anggaran_terserap_r') {
                              const rencanaData = payload.find(p => p.dataKey === 'rencana');
                              const aktualData = payload.find(p => p.dataKey === 'aktual');
                              
                              return (
                                <Card size="small" style={{ minWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                  <Title level={5} style={{ margin: '0 0 8px 0', color: '#19315a' }}>
                                    {project?.company}
                                  </Title>
                                  <Text strong>{label}</Text>
                                  <div style={{ margin: '12px 0' }}>
                                    <div style={{ marginBottom: '8px' }}>
                                      <Text type="secondary">Rencana (Plan): </Text>
                                      <Text strong style={{ color: '#19315a' }}>
                                        {rencanaData?.value}%
                                      </Text>
                                    </div>
                                    <div>
                                      <Text type="secondary">Aktual (Actual): </Text>
                                      <Text strong style={{ color: '#c41e3a' }}>
                                        {aktualData?.value}%
                                      </Text>
                                    </div>
                                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                                      <Text type="secondary">Deviation: </Text>
                                      <Text strong style={{ color: (aktualData?.value - rencanaData?.value) >= 0 ? '#52c41a' : '#c41e3a' }}>
                                        {(aktualData?.value - rencanaData?.value) > 0 ? '+' : ''}{(aktualData?.value - rencanaData?.value).toFixed(1)}%
                                      </Text>
                                    </div>
                                  </div>
                                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: '8px' }}>
                                    <Link to={`/projects/${project?.id}`}>
                                      <Button 
                                        type="primary" 
                                        icon={<EyeOutlined />} 
                                        size="small"
                                        block
                                        style={{ backgroundColor: '#19315a', borderColor: '#19315a' }}
                                      >
                                        View Detail
                                      </Button>
                                    </Link>
                                  </div>
                                </Card>
                              );
                            }
                            
                            // Regular tooltip for other tabs
                            const value = payload[0].value;
                            const formattedValue = currentInfo.unit === '%' || currentInfo.unit === '' 
                              ? `${value}${currentInfo.unit}`
                              : `${currentInfo.currency}${value}${currentInfo.unit}`;
                            
                            const indicator = getPerformanceIndicator(value, activeTab);
                            
                            return (
                              <Card size="small" style={{ minWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                <Title level={5} style={{ margin: '0 0 8px 0', color: payload[0].color }}>
                                  {project?.company}
                                </Title>
                                <Text strong>{label}</Text>
                                <div style={{ margin: '8px 0' }}>
                                  <Text type="secondary">{currentInfo.title}: </Text>
                                  <Text strong style={{ color: payload[0].color }}>
                                    {formattedValue}
                                  </Text>
                                </div>
                                {indicator && (
                                  <Tag color={indicator.status}>{indicator.text}</Tag>
                                )}
                              </Card>
                            );
                          }
                          return null;
                        }} 
                        />
                      )}
                      {activeTab === 'progress_fisik_r' || activeTab === 'anggaran_terserap_r' ? (
                        <>
                          <Bar 
                            dataKey="rencana" 
                            stackId="progress"
                            fill="#19315a" 
                            name="Rencana"
                            radius={[6, 6, 0, 0]}
                            shape={<CustomBarWithPopover />}
                          />
                          <Bar 
                            dataKey="aktual" 
                            stackId="progress"
                            fill="#c41e3a" 
                            name="Aktual"
                            radius={[6, 6, 0, 0]}
                            shape={<CustomBarWithPopover />}
                          />
                        </>
                      ) : (
                        <Bar 
                          dataKey="value" 
                          radius={[6, 6, 0, 0]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              </Card>
            </div>
          </Section>

          {/* Mining Industry Insights */}
          <Section title="Mining Industry Insights" loading={false}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card>
                  <div style={{ textAlign: "center" }}>
                    <Title level={2} style={{ margin: 0, color: strategicColors[0] }}>
                      {data?.pipeline?.stages?.reduce((total, stage) => total + stage.projects.length, 0)}
                    </Title>
                    <Text type="secondary">Total Active Mining Projects</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <div style={{ textAlign: "center" }}>
                    <Title level={2} style={{ margin: 0, color: strategicColors[1] }}>
                      ${data?.pipeline?.stages?.reduce((total, stage) => 
                        total + stage.projects.reduce((stageTotal, project) => stageTotal + project.budget, 0), 0
                      )}M
                    </Title>
                    <Text type="secondary">Total Investment Pipeline</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <div style={{ textAlign: "center" }}>
                    <Title level={2} style={{ margin: 0, color: strategicColors[2] }}>
                      {Object.keys(commodityColors).length}
                    </Title>
                    <Text type="secondary">Mining Commodity Types</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </Section>

          {/* Chart Reading Guide */}
          <Section 
            title="Panduan Membaca Chart" 
            loading={false}
            style={{ paddingBottom: 0 }}
            actions={[
              <Button 
                key="toggle-guide"
                type="text" 
                onClick={() => setShowChartGuide(!showChartGuide)}
                icon={showChartGuide ? <InfoCircleOutlined /> : <ExpandOutlined />}
              >
                {showChartGuide ? 'Hide' : 'Show'}
              </Button>
            ]}
          >
            {showChartGuide && (
              <Alert
                message="Cara Membaca Mining Project Comparison"
                description={
                  <div>
                    <Title level={5} style={{ marginTop: "12px", color: strategicColors[0] }}>
                      Metric Comparison Types:
                    </Title>
                    <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                      <li><strong>Total CAPEX:</strong> Total capital expenditure allocated for each project</li>
                      <li><strong>Duration:</strong> Project timeline measured in months from start to completion</li>
                      <li><strong>Progress Fisik R/A:</strong> Physical progress percentage (Rencana/Plan vs Aktual/Actual)</li>
                      <li><strong>Anggaran Terserap R/A:</strong> Budget absorption (Rencana/Plan vs Aktual/Actual)</li>
                      <li><strong>SPI:</strong> Schedule Performance Index (≥1.1 = ahead, 0.9-1.1 = on track, &lt;0.9 = behind)</li>
                      <li><strong>CPI:</strong> Cost Performance Index (≥1.1 = under budget, 0.9-1.1 = on budget, &lt;0.9 = over budget)</li>
                    </ul>
                    
                    <Title level={5} style={{ color: strategicColors[0] }}>
                      Color Scheme:
                    </Title>
                    <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                      <li>Each project is represented with Strategic Capital Project colors</li>
                      <li>Hover over bars to see detailed project information including company and exact values</li>
                    </ul>
                  </div>
                }
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
              />
            )}
          </Section>

          {/* Legend & Context */}
          <Section 
            title="Legend & Mining Business Context" 
            loading={false}
            style={{ paddingBottom: 0 }}
            actions={[
              <Button 
                key="toggle-legend"
                type="text" 
                onClick={() => setShowLegend(!showLegend)}
                icon={showLegend ? <InfoCircleOutlined /> : <ExpandOutlined />}
              >
                {showLegend ? 'Hide' : 'Show'}
              </Button>
            ]}
          >
            {showLegend && (
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Mining Commodity Types" style={{ height: "100%" }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      {Object.entries(commodityColors).map(([commodity, color]) => (
                        <div key={commodity} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              backgroundColor: color,
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.5)",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                          />
                          <Text strong>{commodity}</Text>
                          <Text type="secondary">
                            {commodity === "Gold" && "Precious Metal Mining"}
                            {commodity === "Copper" && "Base Metal & Infrastructure"}
                            {commodity === "Nickel" && "Stainless Steel & EV Battery"}
                            {commodity === "Coal" && "Energy & Steel Production"}
                            {commodity === "Tin" && "Electronics & Packaging"}
                            {commodity === "Bauxite" && "Aluminum Production"}
                            {commodity === "Aluminum" && "Transportation & Construction"}
                          </Text>
                        </div>
                      ))}
                    </Space>
                  </Card>
                </Col>
                
                <Col xs={24} md={12}>
                  <Card title="Project Investment Scale" style={{ height: "100%" }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <div>
                        <Text strong>Mining Project Investment Categories:</Text>
                        <div style={{ marginTop: "12px" }}>
                          <Space direction="vertical" size="small">
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  backgroundColor: strategicColors[2],
                                  borderRadius: "50%",
                                  border: "2px solid rgba(255,255,255,0.5)",
                                }}
                              />
                              <div>
                                <Text strong>Small Projects (&lt; $300M)</Text>
                                <br />
                                <Text type="secondary">Regional mining operations, processing upgrades</Text>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: strategicColors[2],
                                  borderRadius: "50%",
                                  border: "2px solid rgba(255,255,255,0.5)",
                                }}
                              />
                              <div>
                                <Text strong>Medium Projects ($300M - $600M)</Text>
                                <br />
                                <Text type="secondary">Significant mine expansions, new processing facilities</Text>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  backgroundColor: strategicColors[2],
                                  borderRadius: "50%",
                                  border: "2px solid rgba(255,255,255,0.5)",
                                }}
                              />
                              <div>
                                <Text strong>Large Projects (&gt; $600M)</Text>
                                <br />
                                <Text type="secondary">Major greenfield developments, integrated mining complexes</Text>
                              </div>
                            </div>
                          </Space>
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            )}
          </Section>

          {/* Mining Project Pipeline Stages */}
          <Section title="Mining Project Pipeline Stages" loading={false}>
            <Card bodyStyle={{ padding: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  padding: "24px",
                  minHeight: "320px",
                  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "12px",
                  width: "100%",
                  gap: "6px",
                  overflowX: "auto",
                  border: `2px solid ${strategicColors[0]}20`,
                }}
              >
                {data?.pipeline?.stages?.map((stage) => (
                  <PipelineStage 
                    key={stage.id} 
                    stage={stage} 
                    stageInfo={pipelineStageInfo[stage.id]}
                  />
                ))}
              </div>
            </Card>
          </Section>

          {/* Mining Development Phases */}
          <Section title="Mining Project Development Phases" loading={false}>
            <Row gutter={[16, 16]}>
              {data?.phases && Object.entries(data.phases).map(([key, phase]) => (
                <Col xs={24} md={8} key={key}>
                  <PhaseCard phase={phase} phaseKey={key} />
                </Col>
              ))}
            </Row>
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default PortfolioPage;
