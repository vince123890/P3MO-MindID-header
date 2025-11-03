import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography, Space, Progress, Tag, Select, Tooltip } from "antd";
import { ProjectOutlined, DollarOutlined, EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { projectsData } from "../_data";
import { allProjects } from "../../strategic-capital-project/_data";

const { Title, Text } = Typography;

const CityDistributionContent = ({ showOnlySummary = false, showOnlyCities = false, showProjectCards = false, showProjectsInCards = false, customTitle = null }) => {
  const [cityStats, setCityStats] = useState([]);
  const [totalStats, setTotalStats] = useState({});
  const [filteredCityStats, setFilteredCityStats] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("all");

  useEffect(() => {
    const projects = projectsData.data.items;
    
    // Group projects by city
    const cityGroups = projects.reduce((acc, project) => {
      if (!acc[project.location]) {
        acc[project.location] = [];
      }
      acc[project.location].push(project);
      return acc;
    }, {});

    // Calculate statistics for each city
    const cityStatistics = Object.entries(cityGroups).map(([city, cityProjects]) => {
      const totalBudget = cityProjects.reduce((sum, project) => sum + project.budget, 0);
      const averageProgress = cityProjects.reduce((sum, project) => sum + project.progress, 0) / cityProjects.length;
      const activeProjects = cityProjects.filter(project => project.status === "In Progress").length;
      const planningProjects = cityProjects.filter(project => project.status === "Planning").length;

      return {
        city,
        projectCount: cityProjects.length,
        totalBudget,
        averageProgress: Math.round(averageProgress),
        activeProjects,
        planningProjects,
        projects: cityProjects
      };
    });

    // Sort by total budget (descending)
    cityStatistics.sort((a, b) => b.totalBudget - a.totalBudget);

    // Calculate overall totals
    const totals = {
      totalProjects: projects.length,
      totalBudget: projects.reduce((sum, project) => sum + project.budget, 0),
      totalCities: Object.keys(cityGroups).length,
      overallProgress: Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)
    };

    setCityStats(cityStatistics);
    setFilteredCityStats(cityStatistics);
    setTotalStats(totals);
  }, []);

  // Filter cities by province
  useEffect(() => {
    if (selectedProvince === "all") {
      setFilteredCityStats(cityStats);
    } else {
      // Map cities to provinces (simplified mapping for Indonesian cities)
      const provinceMapping = {
        "Jakarta": "DKI Jakarta",
        "Surabaya": "Jawa Timur",
        "Balikpapan": "Kalimantan Timur",
        "Jayapura": "Papua",
        "Medan": "Sumatera Utara",
        "Denpasar": "Bali"
      };
      
      const filtered = cityStats.filter(city => provinceMapping[city.city] === selectedProvince);
      setFilteredCityStats(filtered);
    }
  }, [selectedProvince, cityStats]);

  // Get unique provinces
  const getProvinces = () => {
    const provinceMapping = {
      "Jakarta": "DKI Jakarta",
      "Surabaya": "Jawa Timur",
      "Balikpapan": "Kalimantan Timur",
      "Jayapura": "Papua",
      "Medan": "Sumatera Utara",
      "Denpasar": "Bali"
    };
    
    const provinces = [...new Set(Object.values(provinceMapping))];
    return [
      { label: "Semua Provinsi", value: "all" },
      ...provinces.map(province => ({ label: province, value: province }))
    ];
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format currency in billions
  const formatBillions = (value) => {
    const billions = value / 1000000000;
    return `${billions.toFixed(1)}`;
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Overall Summary - only show if not showOnlyCities and not showProjectsInCards */}
      {!showOnlyCities && !showProjectsInCards && (
        <Card 
          title="Ringkasan Total Sebaran Project"
          bordered={true} 
          style={{ borderBottom: "1px solid #f0f0f0" }}
          headStyle={{ borderBottom: "none" }}
          bodyStyle={{ paddingTop: 0 }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <Statistic
                title="Total Project"
                value={totalStats.totalProjects}
                prefix={<ProjectOutlined />}
                valueStyle={{ color: "#1890ff", fontSize: "24px" }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <Text strong style={{ fontSize: "14px", color: "#666" }}>
                  Budget Akumulatif vs Target Budget
                </Text>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "8px" }}>
                  <span style={{ color: "#fa8c16" }}>
                    {formatBillions(totalStats.totalBudget)}
                  </span>
                  <span style={{ color: "#999", margin: "0 8px" }}>|</span>
                  <span style={{ color: "#52c41a" }}>
                    {formatBillions(totalStats.totalBudget * 1.2)}
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <Text strong style={{ fontSize: "14px", color: "#666" }}>
                  Progress Akumulatif vs Target Progress
                </Text>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "8px" }}>
                  <span style={{ color: "#722ed1" }}>
                    {totalStats.overallProgress}%
                  </span>
                  <span style={{ color: "#999", margin: "0 8px" }}>|</span>
                  <span style={{ color: "#52c41a" }}>
                    85%
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Project Cards - only show if showProjectCards */}
      {showProjectCards && allProjects?.data?.data?.items && (
        <Card 
          headStyle={{ borderBottom: "none" }}
          bodyStyle={{ paddingTop: 0 }}
          title={customTitle || "Sebaran Project per Kota"}
        >
          <Row gutter={[16, 16]}>
            {allProjects.data.data.items.map((project) => {
              // Get status indicator color
              const getStatusIndicatorColor = (status) => {
                switch (status) {
                  case "On Track":
                    return "green";
                  case "At Risk":
                    return "orange";
                  case "Off Track":
                    return "red";
                  default:
                    return "default";
                }
              };

              // Get workflow status color
              const getWorkflowStatusColor = (status) => {
                switch (status) {
                  case "Active":
                    return "green";
                  case "Pending":
                    return "orange";
                  case "Completed":
                    return "blue";
                  case "Cancelled":
                    return "red";
                  default:
                    return "default";
                }
              };

              // Get days remaining color
              const getDaysRemainingColor = (days) => {
                if (days === null || days === undefined) return "default";
                if (days > 90) return "green";
                if (days > 30) return "orange";
                return "red";
              };

              return (
                <Col xs={24} sm={12} lg={6} key={project.id}>
                  <Tooltip
                    title={
                      <div>
                        <div><strong>Status Indicator:</strong> {project.status_indicator || "Unknown"}</div>
                        <div><strong>Workflow Status:</strong> {project.status || "Unknown"}</div>
                        <div><strong>Days Remaining till COD:</strong> {project.days_remaining_till_cod !== null && project.days_remaining_till_cod !== undefined ? `${project.days_remaining_till_cod} days` : "-"}</div>
                      </div>
                    }
                    placement="top"
                  >
                    <Card
                      size="small"
                      hoverable
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>Project Code</Text>
                          <br />
                          <Link 
                            to={`/strategic-capital-project/${project.id}`}
                            style={{ 
                              color: "#1890ff", 
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            {project.project_code}
                          </Link>
                        </div>

                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>Project Name</Text>
                          <br />
                          <Text 
                            style={{ 
                              fontSize: "13px",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}
                            title={project.business_initiative_name}
                          >
                            {project.business_initiative_name}
                          </Text>
                        </div>

                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>Company</Text>
                          <br />
                          <Text strong style={{ fontSize: "13px" }}>
                            {project.company}
                          </Text>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f0f0f0" }}>
                          <InfoCircleOutlined style={{ color: "#999" }} />
                          <Text style={{ fontSize: "11px", color: "#999", marginLeft: "4px" }}>
                            Hover untuk detail status
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Tooltip>
                </Col>
              );
            })}
          </Row>
        </Card>
      )}

      {/* City Distribution with Project Cards for showProjectsInCards */}
      {showProjectsInCards && allProjects?.data?.data?.items && (
        <Card 
          headStyle={{ borderBottom: "none" }}
          bodyStyle={{ paddingTop: 0 }}
          title={customTitle || "Sebaran Project per Kota"}
        >
          <Row gutter={[16, 16]}>
            {allProjects.data.data.items.map((project) => (
              <Col xs={24} sm={12} lg={6} key={project.id}>
                <Tooltip
                  title={
                    <div>
                      <div><strong>Status Indicator:</strong> {project.status_indicator || "Unknown"}</div>
                      <div><strong>Workflow Status:</strong> {project.status || "Unknown"}</div>
                      <div><strong>Days Remaining till COD:</strong> {project.days_remaining_till_cod !== null && project.days_remaining_till_cod !== undefined ? `${project.days_remaining_till_cod} days` : "-"}</div>
                    </div>
                  }
                  placement="top"
                >
                  <Card
                    size="small"
                    hoverable
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      cursor: "pointer",
                    }}
                  >
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Text type="secondary" style={{ fontSize: "12px" }}>Project Code</Text>
                      </div>
                      <Link 
                        to={`/strategic-capital-project/${project.id}`}
                        style={{ 
                          color: "#1890ff", 
                          fontWeight: "bold",
                          fontSize: "16px",
                          display: "block"
                        }}
                      >
                        {project.project_code}
                      </Link>

                      <div>
                        <Text strong>Project Name:</Text>
                        <br />
                        <Text 
                          style={{ 
                            fontSize: "13px",
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}
                          title={project.business_initiative_name}
                        >
                          {project.business_initiative_name}
                        </Text>
                      </div>

                      <div>
                        <Text strong>Company:</Text>
                        <br />
                        <Text style={{ fontSize: "13px" }}>
                          {project.company}
                        </Text>
                      </div>

                      <div style={{ textAlign: "center", marginTop: "8px" }}>
                        <InfoCircleOutlined style={{ color: "#999" }} />
                        <Text style={{ fontSize: "12px", color: "#999", marginLeft: "4px" }}>
                          Hover untuk detail
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </Card>
      )}

      {/* City Distribution - only show if not showOnlySummary and not showProjectCards and not showProjectsInCards */}
      {!showOnlySummary && !showProjectCards && !showProjectsInCards && (
        <Card 
          headStyle={{ borderBottom: "none" }}
          bodyStyle={{ paddingTop: 0 }}
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Sebaran Project per Kota</span>
              <Select
                value={selectedProvince}
                onChange={setSelectedProvince}
                options={getProvinces()}
                style={{ width: 200 }}
                placeholder="Pilih Provinsi"
              />
            </div>
          }
        >
          <Row gutter={[16, 16]}>
            {filteredCityStats.map((city) => (
              <Col xs={24} sm={12} lg={6} key={city.city}>
                  <Tooltip
                    title={
                      <div>
                        <div><strong>{city.city}</strong></div>
                        <div>Total Budget: {formatCurrency(city.totalBudget)}</div>
                        <div>Progress Rata-rata: {city.averageProgress}%</div>
                        <div>Status Project:</div>
                        <div>• In Progress: {city.activeProjects}</div>
                        <div>• Planning: {city.planningProjects}</div>
                        <div style={{ marginTop: "8px" }}><strong>Daftar Project:</strong></div>
                        {city.projects.map((project) => (
                          <div key={project.id} style={{ marginLeft: "8px" }}>
                            • {project.name} ({project.progress}%)
                          </div>
                        ))}
                      </div>
                    }
                    placement="topLeft"
                  >
                    <Card
                      size="small"
                      hoverable
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                          <Title level={5} style={{ margin: 0, color: "#1890ff", fontSize: "16px" }}>
                            {city.city}
                          </Title>
                          <Text style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
                            {city.projectCount}
                          </Text>
                        </div>

                        <div>
                          <Text strong>Total Budget:</Text>
                          <br />
                          <Text style={{ color: "#fa8c16", fontWeight: "bold" }}>
                            {formatCurrency(city.totalBudget)}
                          </Text>
                        </div>

                        <div>
                          <Text strong>Progress Rata-rata:</Text>
                          <Progress 
                            percent={city.averageProgress} 
                            size="small" 
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                          />
                        </div>

                        <div style={{ textAlign: "center", marginTop: "8px" }}>
                          <InfoCircleOutlined style={{ color: "#999" }} />
                          <Text style={{ fontSize: "12px", color: "#999", marginLeft: "4px" }}>
                            Hover untuk detail
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Tooltip>
              </Col>
            ))}
          </Row>
        </Card>
      )}
    </Space>
  );
};

export default CityDistributionContent;
