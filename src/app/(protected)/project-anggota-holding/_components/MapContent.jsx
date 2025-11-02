import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker } from "react-leaflet";
import { Card, Tag, Typography, Space, Badge, Row, Col } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { projectsData } from "../_data";

const { Text, Title } = Typography;

// Fix untuk default marker icon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Komponen untuk mengatur bounds peta agar fokus ke Indonesia
const SetMapBounds = () => {
  const map = useMap();
  
  useEffect(() => {
    // Set bounds untuk Indonesia
    map.setView([-2.5, 118], 5);
  }, [map]);

  return null;
};

// Fungsi untuk menghitung radius berdasarkan budget
const calculateRadius = (budget) => {
  // Skalakan budget ke radius (dalam ribuan untuk proporsional)
  const minBudget = 45000000000; // 45 Miliar
  const maxBudget = 270000000000; // Update max budget untuk Jakarta
  const minRadius = 15;
  const maxRadius = 40;
  
  const normalized = Math.max(0, Math.min(1, (budget - minBudget) / (maxBudget - minBudget)));
  return minRadius + (normalized * (maxRadius - minRadius));
};

// Create custom marker with count badge
const createCountMarker = (count) => {
  return L.divIcon({
    html: `<div style="
      background-color: #1890ff;
      border: 3px solid white;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${count}</div>`,
    className: 'custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

// Komponen Legend (separate from map)
const MapLegend = ({ projects }) => {
  // Define fixed legend items for holding companies using actual map colors
  const legendItems = [
    { name: "PT Aneka Tambang Tbk", color: "#ff4d4f" },
    { name: "PT Bukit Asam Tbk", color: "#1890ff" },
    { name: "PT Freeport Indonesia", color: "#fadb14" },
    { name: "PT Indonesia Asahan Aluminium (Inalum)", color: "#52c41a" },
    { name: "PT Timah Tbk", color: "#fa541c" },
    { name: "PT Vale Indonesia", color: "#722ed1" },
  ];

  return (
    <Card
      title="Legend"
      size="small"
      style={{
        height: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {legendItems.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: item.color,
                border: "2px solid white",
                boxShadow: "0 0 4px rgba(0,0,0,0.3)",
              }}
            />
            <Text style={{ fontSize: "12px" }}>{item.name}</Text>
          </div>
        ))}
      </Space>
    </Card>
  );
};

const MapContent = () => {
  const [projects, setProjects] = useState([]);
  const [cityGroups, setCityGroups] = useState([]);

  useEffect(() => {
    const projectItems = projectsData.data.items;
    setProjects(projectItems);

    // Group projects by city
    const groupedByCity = projectItems.reduce((acc, project) => {
      if (!acc[project.location]) {
        acc[project.location] = [];
      }
      acc[project.location].push(project);
      return acc;
    }, {});

    // Convert to array format for easier mapping
    const cityGroupsArray = Object.entries(groupedByCity).map(([city, cityProjects]) => {
      // Use the first project's coordinates as the city center
      const centerCoordinates = cityProjects[0].coordinates;
      const totalBudget = cityProjects.reduce((sum, project) => sum + project.budget, 0);
      
      return {
        city,
        projects: cityProjects,
        coordinates: centerCoordinates,
        projectCount: cityProjects.length,
        totalBudget,
        // For single project cities, use the project's color, for multiple projects use a default color
        color: cityProjects.length === 1 ? cityProjects[0].color : "#1890ff"
      };
    });

    setCityGroups(cityGroupsArray);
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Row gutter={16} style={{ width: "100%", height: "600px" }}>
      {/* Map on the left */}
      <Col span={18} style={{ height: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <MapContainer
            center={[-2.5, 118]}
            zoom={5}
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            scrollWheelZoom={true}
          >
            <SetMapBounds />
            
            {/* Tile Layer - OpenStreetMap */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* City Groups - show count markers for cities with multiple projects */}
            {cityGroups.map((cityGroup) => {
              if (cityGroup.projectCount > 1) {
                // Show count marker for cities with multiple projects
                return (
                  <Marker
                    key={`city-${cityGroup.city}`}
                    position={cityGroup.coordinates}
                    icon={createCountMarker(cityGroup.projectCount)}
                  >
                    <Popup>
                      <div style={{ minWidth: "300px" }}>
                        <Title level={4} style={{ marginBottom: "12px", marginTop: 0, color: "#1890ff" }}>
                          {cityGroup.city} ({cityGroup.projectCount} Projects)
                        </Title>
                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div>
                            <Text strong>Total Budget: </Text>
                            <Text style={{ color: "#fa8c16", fontWeight: "bold" }}>
                              {formatCurrency(cityGroup.totalBudget)}
                            </Text>
                          </div>
                          <div>
                            <Text strong>Projects:</Text>
                            <div style={{ marginTop: "8px" }}>
                              {cityGroup.projects.map((project, index) => (
                                <div key={project.id} style={{ 
                                  marginBottom: "8px", 
                                  padding: "8px", 
                                  backgroundColor: "#f5f5f5", 
                                  borderRadius: "4px",
                                  borderLeft: `4px solid ${project.color}`
                                }}>
                                  <Text strong style={{ fontSize: "12px" }}>{project.name}</Text>
                                  <br />
                                  <Space size="small" style={{ marginTop: "4px" }}>
                                    <Text style={{ fontSize: "11px" }}>PIC: {project.pic}</Text>
                                    <Text style={{ fontSize: "11px" }}>Progress: {project.progress}%</Text>
                                    <Tag size="small" color={project.status === "In Progress" ? "blue" : "orange"}>
                                      {project.status}
                                    </Tag>
                                  </Space>
                                  <br />
                                  <Text style={{ fontSize: "11px", color: "#666" }}>
                                    Budget: {formatCurrency(project.budget)}
                                  </Text>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Space>
                      </div>
                    </Popup>
                  </Marker>
                );
              } else {
                // Show regular circle marker for single project cities
                const project = cityGroup.projects[0];
                return (
                  <CircleMarker
                    key={project.id}
                    center={project.coordinates}
                    radius={calculateRadius(project.budget)}
                    pathOptions={{
                      fillColor: project.color,
                      fillOpacity: 0.7,
                      color: "white",
                      weight: 3,
                      opacity: 1,
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: "250px" }}>
                        <Title level={5} style={{ marginBottom: "8px", marginTop: 0 }}>
                          {project.name}
                        </Title>
                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div>
                            <Text strong>Location: </Text>
                            <Text>{project.location}</Text>
                          </div>
                          <div>
                            <Text strong>PIC: </Text>
                            <Text>{project.pic}</Text>
                          </div>
                          <div>
                            <Text strong>Budget: </Text>
                            <Text>{formatCurrency(project.budget)}</Text>
                          </div>
                          <div>
                            <Text strong>Progress: </Text>
                            <Text>{project.progress}%</Text>
                          </div>
                          <div>
                            <Text strong>Status: </Text>
                            <Tag color={project.status === "In Progress" ? "blue" : "orange"}>
                              {project.status}
                            </Tag>
                          </div>
                        </Space>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              }
            })}
          </MapContainer>
        </div>
      </Col>

      {/* Legend on the right */}
      <Col span={6} style={{ height: "100%" }}>
        <MapLegend projects={projects} />
      </Col>
    </Row>
  );
};

export default MapContent;
