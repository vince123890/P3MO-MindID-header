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
                    }}
                    onClick={() => handleCardClick(project.id)}
                  >
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <Text type="secondary" style={{ fontSize: "12px" }}>Project Code</Text>
                          <br />
                          <Text 
                            style={{ 
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: "#000"
                            }}
                          >
                            {project.project_code}
                          </Text>
                        </div>
                        {isAffiliate && (
                          <Tag color="blue" style={{ fontSize: "10px", marginTop: "16px" }}>
                            Affiliate
                          </Tag>
                        )}
                      </div>

                      <div>
                        <Text type="secondary" style={{ fontSize: "12px" }}>Project Name</Text>
                        <br />
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                          <Text 
                            style={{ 
                              fontSize: "13px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "1.4",
                              flex: 1
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
                                fontSize: "12px",
                                marginTop: "2px",
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

                      <div>
                        <Text type="secondary" style={{ fontSize: "12px" }}>Company</Text>
                        <br />
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Text strong style={{ fontSize: "13px", flex: 1 }}>
                            {project.company}
                          </Text>
                          <Tooltip title="Copy Company">
                            <CopyOutlined 
                              style={{ 
                                color: "#999", 
                                cursor: "pointer", 
                                fontSize: "12px",
                                flexShrink: 0
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(project.company, "Company");
                              }}
                            />
                          </Tooltip>
                        </div>
                      </div>

                      <div style={{ textAlign: "center", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f0f0f0" }}>
                        <InfoCircleOutlined style={{ color: "#999" }} />
                        <Text style={{ fontSize: "11px", color: "#999", marginLeft: "4px" }}>
                          Click card for details
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
    </Space>
  );
};

export default CompanyDistributionContent;
