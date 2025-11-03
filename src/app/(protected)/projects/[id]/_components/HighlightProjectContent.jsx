import { Row, Col, Typography, Card, Space, Button, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

const HighlightProjectContent = ({ project }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Project photos data with real image
  const projectPhotos = [
    {
      id: 1,
      url: "/img/991694779p.webp",
      date: "January 25, 2025",
      description: "Panoramic view of the mining site showcasing the comprehensive infrastructure development. This aerial perspective displays the main processing facility, administrative buildings, and transportation corridors. Current workforce: 200+ personnel including engineers, operators, and support staff. Site capacity: 750 workers across three operational shifts. Total project coverage: 35 hectares with advanced environmental monitoring systems."
    },
    {
      id: 2,
      url: "/img/991694779p.webp",
      date: "January 20, 2025",
      description: "Detailed view of the main processing plant construction progress. Advanced metallurgical equipment installation is underway with state-of-the-art ore processing technology. Equipment status: 18 major processing units installed. Installation crew: 60+ certified specialists. Operational capacity: Continuous 24/7 processing capability. Processing area: 12 hectares dedicated to ore extraction and refinement."
    },
    {
      id: 3,
      url: "/img/991694779p.webp",
      date: "January 15, 2025",
      description: "Environmental compliance and safety monitoring systems in full operation. The image shows comprehensive waste management facilities and environmental protection measures. Safety performance: Zero incident record maintained for 180+ consecutive days. Compliance rate: 100% environmental standards. Monitored area: Complete site coverage including 25 hectares of active operations and 10 hectares of environmental buffer zones."
    }
  ];

  // Project data
  const projectData = {
    name: "Integrated Mining Complex Development Project",
    description: "An ambitious and comprehensive mining infrastructure development project aimed at establishing a world-class integrated mining complex. The project encompasses advanced ore processing facilities, sustainable mining operations, comprehensive environmental management systems, and extensive community development initiatives. This strategic investment will generate significant economic value while maintaining the highest standards of environmental stewardship and social responsibility, creating over 1,000 direct employment opportunities and supporting local economic growth.",
    projectProgress: "75%",
    plannedProgress: "78%",
    milestones: [
      { text: "Environmental Impact Assessment Approved", completed: true },
      { text: "Construction & Infrastructure Development", completed: true },
      { text: "Processing Plant Commissioning", completed: true },
      { text: "Commercial Production Launch", completed: false },
      { text: "Full Operational Capacity", completed: false }
    ]
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? projectPhotos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === projectPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const currentPhoto = projectPhotos[currentPhotoIndex];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0 8px" }}>
      <Row gutter={24} style={{ width: "100%" }}>
        {/* Left Column */}
        <Col span={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Project Name */}
            <Card 
              size="small" 
              style={{ 
                textAlign: "center", 
                minHeight: 60,
                border: "2px solid #52c41a",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f6ffed, #fcffe6)",
                boxShadow: "0 2px 8px rgba(82, 196, 26, 0.15)"
              }}
            >
              <Title level={4} style={{ margin: 0, color: "#389e0d", fontWeight: 600 }}>
                {projectData.name}
              </Title>
            </Card>

            {/* Project Description */}
            <Card 
              size="small" 
              style={{ 
                minHeight: 140,
                border: "2px solid #722ed1",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f9f0ff, #efdbff)",
                boxShadow: "0 2px 8px rgba(114, 46, 209, 0.15)"
              }}
            >
              <div style={{ padding: "8px 0" }}>
                <Title level={5} style={{ textAlign: "center", marginBottom: 16, color: "#531dab", fontWeight: 600 }}>
                  Project Description
                </Title>
                <Paragraph style={{ margin: 0, textAlign: "justify", lineHeight: 1.6, color: "#262626" }}>
                  {projectData.description}
                </Paragraph>
              </div>
            </Card>

            {/* Progress Row */}
            <Row gutter={16}>
              <Col span={12}>
                <Card 
                  size="small" 
                  style={{ 
                    textAlign: "center", 
                    minHeight: 80,
                    border: "2px solid #1890ff",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #e6f7ff, #bae7ff)",
                    boxShadow: "0 2px 8px rgba(24, 144, 255, 0.15)",
                    width: "100%"
                  }}
                >
                  <Title level={5} style={{ margin: 0, color: "#0050b3", fontWeight: 600 }}>
                    Project Progress
                  </Title>
                  <Title level={3} style={{ margin: "8px 0 0 0", color: "#1890ff", fontWeight: 700 }}>
                    {projectData.projectProgress}
                  </Title>
                </Card>
              </Col>
              <Col span={12}>
                <Card 
                  size="small" 
                  style={{ 
                    textAlign: "center", 
                    minHeight: 80,
                    border: "2px solid #52c41a",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #f6ffed, #d9f7be)",
                    boxShadow: "0 2px 8px rgba(82, 196, 26, 0.15)",
                    width: "100%"
                  }}
                >
                  <Title level={5} style={{ margin: 0, color: "#389e0d", fontWeight: 600 }}>
                    Planned Progress
                  </Title>
                  <Title level={3} style={{ margin: "8px 0 0 0", color: "#52c41a", fontWeight: 700 }}>
                    {projectData.plannedProgress}
                  </Title>
                </Card>
              </Col>
            </Row>

            {/* Milestone */}
            <Card 
              size="small" 
              style={{ 
                minHeight: 160,
                border: "2px solid #fa8c16",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #fff7e6, #ffd591)",
                boxShadow: "0 2px 8px rgba(250, 140, 22, 0.15)"
              }}
            >
              <Title level={5} style={{ marginBottom: 16, color: "#d4380d", fontWeight: 600 }}>
                Milestone
              </Title>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {projectData.milestones.map((milestone, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div 
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: milestone.completed ? "#52c41a" : "#d9d9d9",
                        border: milestone.completed ? "2px solid #389e0d" : "2px solid #bfbfbf",
                        flexShrink: 0
                      }}
                    />
                    <Text style={{ 
                      color: milestone.completed ? "#000" : "#8c8c8c",
                      fontWeight: milestone.completed ? 600 : 400
                    }}>
                      {milestone.text}
                    </Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Space>
        </Col>

        {/* Right Column */}
        <Col span={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Photo Section with Carousel */}
            <Card 
              size="small" 
              style={{ 
                minHeight: 420, 
                position: "relative",
                border: "2px solid #1890ff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.15)"
              }}
              bodyStyle={{ padding: 0, position: "relative", height: "100%" }}
            >
              <div style={{ 
                textAlign: "center", 
                padding: "16px", 
                fontSize: "18px", 
                fontWeight: 600, 
                color: "#ffffff",
                background: "linear-gradient(135deg, #1890ff, #40a9ff)",
                borderBottom: "none"
              }}>
                Project Photo
              </div>
              
              <div style={{ position: "relative", height: "calc(100% - 64px)", minHeight: 320 }}>
                <Image
                  src={currentPhoto.url}
                  alt="Project Photo"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    display: "block"
                  }}
                  preview={false}
                />
                
                {/* Date overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: "12px"
                }}>
                  Date of Photo: {currentPhoto.date}
                </div>

                {/* Navigation Arrows */}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<LeftOutlined />}
                  size="large"
                  onClick={handlePrevPhoto}
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderColor: "transparent",
                    zIndex: 10
                  }}
                />
                
                <Button
                  type="primary"
                  shape="circle"
                  icon={<RightOutlined />}
                  size="large"
                  onClick={handleNextPhoto}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderColor: "transparent",
                    zIndex: 10
                  }}
                />
              </div>
            </Card>

            {/* Photo Description */}
            <Card 
              size="small" 
              style={{ 
                minHeight: 140,
                border: "2px solid #eb2f96",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #fff0f6, #ffd6e7)",
                boxShadow: "0 2px 8px rgba(235, 47, 150, 0.15)"
              }}
            >
              <div style={{ padding: "8px 0" }}>
                <Title level={5} style={{ marginBottom: 12, color: "#c41d7f", fontWeight: 600 }}>
                  Photo Description + Information about the project (Labor, Capacity, Area, etc.)
                </Title>
                <Paragraph style={{ margin: 0, textAlign: "justify", lineHeight: 1.6, color: "#262626" }}>
                  {currentPhoto.description}
                </Paragraph>
              </div>
            </Card>

            {/* Photo indicator dots */}
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <Space size="small">
                {projectPhotos.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: index === currentPhotoIndex ? "#1890ff" : "#d9d9d9",
                      cursor: "pointer",
                      transition: "background-color 0.3s"
                    }}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </Space>
            </div>
          </Space>
        </Col>
      </Row>

      {/* Latest Update Footer */}
      <div style={{ textAlign: "right", color: "#8c8c8c", fontSize: "12px" }}>
        Latest Update: {currentPhoto.date}
      </div>
    </Space>
  );
};

export default HighlightProjectContent;
