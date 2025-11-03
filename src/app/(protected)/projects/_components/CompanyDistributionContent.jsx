import { Card, Row, Col, Typography, Space, Tooltip, Select, Tag, message } from "antd";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { allProjects } from "../_data";
import { useGetData } from "@/app/_hooks/use-get-data";
import { useState, useMemo } from "react";

const { Text } = Typography;

const CompanyDistributionContent = ({ linkPrefix = "/projects" }) => {
  const allProjectsData = useGetData(allProjects);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const navigate = useNavigate();

  const allItems = allProjectsData.data?.data?.items || [];
  
  // Get unique companies
  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(allItems.map(p => p.company))].filter(Boolean);
    return [
      { label: "All Company", value: "All" },
      ...uniqueCompanies.map(company => ({ label: company, value: company }))
    ];
  }, [allItems]);

  // Filter projects based on selected company
  const projects = useMemo(() => {
    if (selectedCompany === "All") {
      return allItems;
    }
    return allItems.filter(project => project.company === selectedCompany);
  }, [allItems, selectedCompany]);
  
  // Copy to clipboard function
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`${field} copied to clipboard!`);
    }).catch(() => {
      message.error(`Failed to copy ${field}`);
    });
  };
  
  // Handle card click - navigate to project detail with breadcrumb
  const handleCardClick = (projectId) => {
    navigate(`${linkPrefix}/${projectId}`);
  };
  
  console.log("CompanyDistributionContent rendering, projects:", projects.length);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card 
        headStyle={{ borderBottom: "none" }}
        bodyStyle={{ paddingTop: 0 }}
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Sebaran Project per Company</span>
            <Select
              value={selectedCompany}
              onChange={setSelectedCompany}
              options={companies}
              style={{ width: 200 }}
              placeholder="Select Company"
            />
          </div>
        }
        loading={allProjectsData.loading}
      >
        <Row gutter={[16, 16]}>
          {projects.map((project) => {
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

            // Check if project is affiliate (add to some projects for demo)
            const isAffiliate = ["1", "3", "5"].includes(project.id);

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
                      overflow: "hidden",
                    }}
                    bodyStyle={{ padding: 0 }}
                    onClick={() => handleCardClick(project.id)}
                  >
                    {/* Project Image */}
                    <div style={{ 
                      position: "relative", 
                      height: "120px", 
                      backgroundImage: "url(/img/991694779p.webp)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}>
                      {/* Inalum Logo for Affiliate Projects */}
                      {isAffiliate && (
                        <div style={{ 
                          position: "absolute", 
                          top: "8px", 
                          right: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "4px",
                          padding: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <img 
                            src="/img/logo-inalum.png" 
                            alt="Inalum Logo" 
                            style={{ 
                              height: "16px", 
                              width: "auto"
                            }} 
                          />
                          <Text style={{ fontSize: "10px", fontWeight: "bold" }}>Affiliate</Text>
                        </div>
                      )}
                      
                      {/* Overlay for better text readability */}
                      <div style={{ 
                        position: "absolute", 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                        height: "40px"
                      }} />
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: "12px" }}>
                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        {/* Project Name */}
                        <div>
                          <Text type="secondary" style={{ fontSize: "11px", fontWeight: "500" }}>Project Name</Text>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", marginTop: "2px" }}>
                            <Text 
                              style={{ 
                                fontSize: "12px",
                                fontWeight: "600",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: "1.3",
                                flex: 1,
                                color: "#000"
                              }}
                              title={project.business_initiative_name}
                            >
                              {project.business_initiative_name}
                            </Text>
                            <Tooltip title="Copy Project Name">
                              <CopyOutlined 
                                style={{ 
                                  color: "#999", 
                                  cursor: "pointer", 
                                  fontSize: "11px",
                                  marginTop: "1px",
                                  flexShrink: 0
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(project.business_initiative_name, "Project Name");
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>

                        {/* COD Target */}
                        <div>
                          <Text type="secondary" style={{ fontSize: "11px", fontWeight: "500" }}>COD Target</Text>
                          <div style={{ marginTop: "2px" }}>
                            <Text strong style={{ fontSize: "12px", color: "#000" }}>
                              {project.days_remaining_till_cod !== null && project.days_remaining_till_cod !== undefined 
                                ? `${project.days_remaining_till_cod} days remaining` 
                                : "-"}
                            </Text>
                          </div>
                        </div>

                        {/* CAPEX */}
                        <div>
                          <Text type="secondary" style={{ fontSize: "11px", fontWeight: "500" }}>CAPEX</Text>
                          <div style={{ marginTop: "2px" }}>
                            <Text strong style={{ fontSize: "12px", color: "#000" }}>
                              {project.capex_estimate 
                                ? `IDR ${(project.capex_estimate / 1000000000).toFixed(1)}B`
                                : "-"}
                            </Text>
                          </div>
                        </div>

                        {/* Commodity */}
                        <div>
                          <Text type="secondary" style={{ fontSize: "11px", fontWeight: "500" }}>Commodity</Text>
                          <div style={{ marginTop: "2px" }}>
                            <Tag 
                              color="blue" 
                              style={{ 
                                fontSize: "11px", 
                                margin: 0,
                                borderRadius: "4px"
                              }}
                            >
                              {project.commodity || "General"}
                            </Tag>
                          </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f0f0f0" }}>
                          <InfoCircleOutlined style={{ color: "#999" }} />
                          <Text style={{ fontSize: "10px", color: "#999", marginLeft: "4px" }}>
                            Click card for details
                          </Text>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Tooltip>
              </Col>
            );
          })}
        </Row>
      </Card>
    </Space>
  );
};

export default CompanyDistributionContent;
